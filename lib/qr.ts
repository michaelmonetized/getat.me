// Minimal QR Code generator (Version 1-6, Error Correction Level L)
// Supports byte mode encoding — sufficient for URLs up to ~134 chars

// ── GF(256) Arithmetic ──────────────────────────────────────────────────

const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);

(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x = (x << 1) ^ (x >= 128 ? 0x11d : 0);
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP[LOG[a] + LOG[b]];
}

function polyMul(a: number[], b: number[]): number[] {
  const result = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      result[i + j] ^= gfMul(a[i], b[j]);
    }
  }
  return result;
}

function polyMod(dividend: number[], divisor: number[]): number[] {
  const result = [...dividend];
  for (let i = 0; i < dividend.length - divisor.length + 1; i++) {
    if (result[i] === 0) continue;
    for (let j = 1; j < divisor.length; j++) {
      result[i + j] ^= gfMul(divisor[j], result[i]);
    }
  }
  return result.slice(dividend.length - divisor.length + 1);
}

function generatorPoly(n: number): number[] {
  let g = [1];
  for (let i = 0; i < n; i++) {
    g = polyMul(g, [1, EXP[i]]);
  }
  return g;
}

// ── QR Parameters ───────────────────────────────────────────────────────

// Version info: [totalCodewords, ecCodewordsPerBlock, numBlocks, dataCodewords]
// Error correction level L
const VERSION_INFO: [number, number, number, number][] = [
  [0, 0, 0, 0], // placeholder v0
  [26, 7, 1, 19],    // v1
  [44, 10, 1, 34],   // v2
  [70, 15, 1, 55],   // v3
  [100, 20, 1, 80],  // v4
  [134, 26, 1, 108], // v5
  [172, 18, 2, 68],  // v6
  [196, 20, 2, 78],  // v7
  [242, 24, 2, 97],  // v8
  [292, 30, 2, 116], // v9
  [346, 18, 4, 68],  // v10
];

function selectVersion(dataLen: number): number {
  for (let v = 1; v < VERSION_INFO.length; v++) {
    const [, , , dataCodewords] = VERSION_INFO[v];
    // byte mode: 4 bits mode + 8/16 bits count + 8*dataLen bits + 4 bits terminator
    const bitsNeeded = 4 + (v >= 10 ? 16 : 8) + dataLen * 8;
    const capacity = dataCodewords * 8;
    if (bitsNeeded <= capacity) return v;
  }
  throw new Error("Data too long for QR code (max ~116 bytes with this implementation)");
}

// ── Bit Buffer ──────────────────────────────────────────────────────────

class BitBuffer {
  buffer: number[] = [];
  length = 0;

  put(num: number, bitLen: number) {
    for (let i = bitLen - 1; i >= 0; i--) {
      this.buffer.push((num >> i) & 1);
      this.length++;
    }
  }

  getByte(index: number): number {
    let val = 0;
    for (let i = 0; i < 8; i++) {
      val = (val << 1) | (this.buffer[index * 8 + i] || 0);
    }
    return val;
  }
}

// ── Module Placement ────────────────────────────────────────────────────

function createMatrix(version: number): { modules: (boolean | null)[][]; size: number } {
  const size = version * 4 + 17;
  const modules: (boolean | null)[][] = Array.from({ length: size }, () =>
    Array(size).fill(null)
  );
  return { modules, size };
}

function setModule(modules: (boolean | null)[][], row: number, col: number, value: boolean) {
  if (row >= 0 && row < modules.length && col >= 0 && col < modules.length) {
    modules[row][col] = value;
  }
}

function placeFinderPattern(modules: (boolean | null)[][], row: number, col: number) {
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const inOuter = r === -1 || r === 7 || c === -1 || c === 7;
      const inMiddle = r >= 0 && r <= 6 && c >= 0 && c <= 6;
      const inInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      const inBorder = r === 0 || r === 6 || c === 0 || c === 6;

      let val = false;
      if (inOuter) val = false; // separator
      else if (inBorder) val = true;
      else if (inInner) val = true;
      else if (inMiddle) val = false;

      setModule(modules, row + r, col + c, val);
    }
  }
}

function placeAlignmentPattern(modules: (boolean | null)[][], row: number, col: number) {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const val =
        Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0);
      setModule(modules, row + r, col + c, val);
    }
  }
}

const ALIGNMENT_POSITIONS: number[][] = [
  [], // v0
  [], // v1
  [6, 18], // v2
  [6, 22], // v3
  [6, 26], // v4
  [6, 30], // v5
  [6, 34], // v6
  [6, 22, 38], // v7
  [6, 24, 42], // v8
  [6, 26, 46], // v9
  [6, 28, 50], // v10
];

function placeFixedPatterns(modules: (boolean | null)[][], version: number, size: number) {
  // Finder patterns
  placeFinderPattern(modules, 0, 0);
  placeFinderPattern(modules, 0, size - 7);
  placeFinderPattern(modules, size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (modules[6][i] === null) modules[6][i] = i % 2 === 0;
    if (modules[i][6] === null) modules[i][6] = i % 2 === 0;
  }

  // Alignment patterns
  const positions = ALIGNMENT_POSITIONS[version] || [];
  for (const r of positions) {
    for (const c of positions) {
      if (modules[r][c] !== null) continue; // skip if overlapping finder
      placeAlignmentPattern(modules, r, c);
    }
  }

  // Dark module
  modules[size - 8][8] = true;
}

function reserveFormatBits(modules: (boolean | null)[][], size: number) {
  // Reserve format info areas
  for (let i = 0; i < 8; i++) {
    if (modules[8][i] === null) modules[8][i] = false;
    if (modules[i][8] === null) modules[i][8] = false;
    if (modules[8][size - 1 - i] === null) modules[8][size - 1 - i] = false;
    if (modules[size - 1 - i][8] === null) modules[size - 1 - i][8] = false;
  }
  if (modules[8][8] === null) modules[8][8] = false;
}

// ── Data Encoding ───────────────────────────────────────────────────────

function encodeData(data: string, version: number): number[] {
  const [, ecPerBlock, numBlocks, totalDataCodewords] = VERSION_INFO[version];
  const buf = new BitBuffer();

  // Mode: byte (0100)
  buf.put(0b0100, 4);

  // Character count
  const countBits = version >= 10 ? 16 : 8;
  buf.put(data.length, countBits);

  // Data
  for (let i = 0; i < data.length; i++) {
    buf.put(data.charCodeAt(i), 8);
  }

  // Terminator
  const remaining = totalDataCodewords * 8 - buf.length;
  buf.put(0, Math.min(4, remaining));

  // Pad to byte boundary
  while (buf.length % 8 !== 0) buf.put(0, 1);

  // Pad codewords
  const padPatterns = [0xec, 0x11];
  let padIdx = 0;
  while (buf.length < totalDataCodewords * 8) {
    buf.put(padPatterns[padIdx % 2], 8);
    padIdx++;
  }

  // Extract data codewords
  const dataCodewords: number[] = [];
  for (let i = 0; i < totalDataCodewords; i++) {
    dataCodewords.push(buf.getByte(i));
  }

  // Split into blocks and generate EC
  const dataPerBlock = Math.floor(totalDataCodewords / numBlocks);
  const extraBlocks = totalDataCodewords - dataPerBlock * numBlocks;
  const gen = generatorPoly(ecPerBlock);
  const blocks: number[][] = [];
  const ecBlocks: number[][] = [];
  let offset = 0;

  for (let b = 0; b < numBlocks; b++) {
    const blockSize = dataPerBlock + (b >= numBlocks - extraBlocks ? 1 : 0);
    const block = dataCodewords.slice(offset, offset + blockSize);
    blocks.push(block);
    offset += blockSize;

    // RS error correction
    const padded = [...block, ...new Array(ecPerBlock).fill(0)];
    const ec = polyMod(padded, gen);
    ecBlocks.push(ec);
  }

  // Interleave
  const result: number[] = [];
  const maxDataLen = Math.max(...blocks.map((b) => b.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of blocks) {
      if (i < block.length) result.push(block[i]);
    }
  }
  for (let i = 0; i < ecPerBlock; i++) {
    for (const ec of ecBlocks) {
      if (i < ec.length) result.push(ec[i]);
    }
  }

  return result;
}

// ── Data Placement ──────────────────────────────────────────────────────

function placeData(modules: (boolean | null)[][], size: number, data: number[]) {
  let bitIndex = 0;
  const totalBits = data.length * 8;
  let direction = -1; // -1 = upward, 1 = downward
  let col = size - 1;

  while (col > 0) {
    if (col === 6) col--; // skip timing pattern column

    let row = direction === -1 ? size - 1 : 0;
    while (row >= 0 && row < size) {
      for (let c = 0; c < 2; c++) {
        const actualCol = col - c;
        if (modules[row][actualCol] === null) {
          const bit =
            bitIndex < totalBits
              ? (data[Math.floor(bitIndex / 8)] >> (7 - (bitIndex % 8))) & 1
              : 0;
          modules[row][actualCol] = bit === 1;
          bitIndex++;
        }
      }
      row += direction;
    }
    direction = -direction;
    col -= 2;
  }
}

// ── Masking ─────────────────────────────────────────────────────────────

type MaskFn = (row: number, col: number) => boolean;

const MASK_FUNCTIONS: MaskFn[] = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (_, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
];

function isDataModule(
  row: number,
  col: number,
  size: number,
  version: number
): boolean {
  // Finder + separator
  if (row < 9 && col < 9) return false;
  if (row < 9 && col >= size - 8) return false;
  if (row >= size - 8 && col < 9) return false;

  // Timing
  if (row === 6 || col === 6) return false;

  // Alignment
  const positions = ALIGNMENT_POSITIONS[version] || [];
  for (const r of positions) {
    for (const c of positions) {
      if (
        row >= r - 2 &&
        row <= r + 2 &&
        col >= c - 2 &&
        col <= c + 2
      ) {
        // Skip if it overlaps finder
        if (r < 9 && c < 9) continue;
        if (r < 9 && c >= size - 8) continue;
        if (r >= size - 8 && c < 9) continue;
        return false;
      }
    }
  }

  // Format info
  if (row === 8 && (col < 9 || col >= size - 8)) return false;
  if (col === 8 && (row < 9 || row >= size - 8)) return false;

  // Dark module
  if (row === size - 8 && col === 8) return false;

  return true;
}

function applyMask(
  modules: boolean[][],
  size: number,
  version: number,
  maskIndex: number
): boolean[][] {
  const result = modules.map((r) => [...r]);
  const maskFn = MASK_FUNCTIONS[maskIndex];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isDataModule(r, c, size, version) && maskFn(r, c)) {
        result[r][c] = !result[r][c];
      }
    }
  }
  return result;
}

// ── Format Info ─────────────────────────────────────────────────────────

// Precomputed format info strings for EC level L (01) with mask patterns 0-7
const FORMAT_INFO = [
  0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
];

function placeFormatInfo(modules: boolean[][], size: number, maskIndex: number) {
  const bits = FORMAT_INFO[maskIndex];

  for (let i = 0; i < 15; i++) {
    const bit = ((bits >> (14 - i)) & 1) === 1;

    // Around top-left finder
    if (i < 6) modules[8][i] = bit;
    else if (i === 6) modules[8][7] = bit;
    else if (i === 7) modules[8][8] = bit;
    else if (i === 8) modules[7][8] = bit;
    else modules[14 - i][8] = bit;

    // Around other finders
    if (i < 8) modules[size - 1 - i][8] = bit;
    else modules[8][size - 15 + i] = bit;
  }
}

// ── Penalty Score ───────────────────────────────────────────────────────

function penaltyScore(modules: boolean[][], size: number): number {
  let score = 0;

  // Rule 1: consecutive same-color modules in rows/cols
  for (let r = 0; r < size; r++) {
    let count = 1;
    for (let c = 1; c < size; c++) {
      if (modules[r][c] === modules[r][c - 1]) {
        count++;
        if (count === 5) score += 3;
        else if (count > 5) score += 1;
      } else {
        count = 1;
      }
    }
  }
  for (let c = 0; c < size; c++) {
    let count = 1;
    for (let r = 1; r < size; r++) {
      if (modules[r][c] === modules[r - 1][c]) {
        count++;
        if (count === 5) score += 3;
        else if (count > 5) score += 1;
      } else {
        count = 1;
      }
    }
  }

  // Rule 4: proportion of dark modules
  let dark = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (modules[r][c]) dark++;
    }
  }
  const percent = (dark * 100) / (size * size);
  const prev5 = Math.floor(percent / 5) * 5;
  const next5 = prev5 + 5;
  score +=
    Math.min(Math.abs(prev5 - 50) / 5, Math.abs(next5 - 50) / 5) * 10;

  return score;
}

// ── Public API ──────────────────────────────────────────────────────────

export function generateQR(data: string): boolean[][] {
  const version = selectVersion(data.length);
  const { modules, size } = createMatrix(version);

  // Place fixed patterns
  placeFixedPatterns(modules, version, size);
  reserveFormatBits(modules, size);

  // Encode and place data
  const encoded = encodeData(data, version);
  placeData(modules, size, encoded);

  // Convert nulls to false
  const base: boolean[][] = modules.map((row) =>
    row.map((cell) => cell === true)
  );

  // Try all masks, pick best
  let bestMask = 0;
  let bestScore = Infinity;

  for (let m = 0; m < 8; m++) {
    const masked = applyMask(base, size, version, m);
    placeFormatInfo(masked, size, m);
    const score = penaltyScore(masked, size);
    if (score < bestScore) {
      bestScore = score;
      bestMask = m;
    }
  }

  const result = applyMask(base, size, version, bestMask);
  placeFormatInfo(result, size, bestMask);

  return result;
}
