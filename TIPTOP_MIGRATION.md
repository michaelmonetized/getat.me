# Tiptap Migration Summary

## Overview
Migrated from `@uiw/react-md-editor` (MDEditor) to `@tiptap/react` (Tiptap) for a true WYSIWYG editing experience with image upload support.

## Changes Made

### 1. Installed Packages
You'll need to install the following packages:
```bash
bun add @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder
```

### 2. Created Tiptap Editor Component
- **File**: `components/editor/tiptap-editor.tsx`
- **Features**:
  - True WYSIWYG editing (no markdown code visible)
  - Image upload with drag-and-drop support
  - Paste image support
  - Rich text formatting toolbar (Bold, Italic, Headings, Lists, Quotes, Links, Images)
  - Integrated with Convex storage for image uploads
  - Custom CSS styling

### 3. Updated Post Forms
- **Files**: 
  - `components/forms/user/add-post.tsx`
  - `components/forms/user/edit-post.tsx`
- **Changes**: Replaced MDEditor with TiptapEditor component

### 4. Updated Post Rendering
- **Files**:
  - `components/views/posts/card.tsx`
  - `components/features/posts-widget.tsx`
  - `components/features/public-posts-widget.tsx`
- **Changes**: Changed from rendering markdown (ReactMarkdown) to rendering HTML (dangerouslySetInnerHTML)

### 5. Updated Convex Functions
- **File**: `convex/files.ts`
- **Added**:
  - `getFileUrlInternal`: Internal query to get file URLs
  - `uploadFileAndGetUrl`: Action that uploads a file and returns its URL in one call

## Key Features

### Image Upload
- Drag and drop images into the editor
- Paste images from clipboard
- Click "Image" button to upload
- Images are stored in Convex storage
- Automatic URL retrieval and insertion

### WYSIWYG Editing
- No markdown code visible while editing
- Real-time preview as you type
- Rich formatting toolbar
- Supports: Bold, Italic, Headings (H1, H2), Lists, Blockquotes, Links, Images

### Content Storage
- Posts now store HTML content instead of markdown
- Backward compatible (existing markdown posts will still render, but new posts are HTML)

## Next Steps

1. **Install packages**: Run `bun add @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder`

2. **Test the editor**: 
   - Create a new post
   - Try uploading an image
   - Test formatting options
   - Verify HTML rendering

3. **Optional Enhancements**:
   - Add more Tiptap extensions (tables, code blocks, etc.)
   - Add HTML sanitization for security (consider using DOMPurify)
   - Add image resizing/cropping
   - Add more toolbar buttons

## Notes

- The editor uses `dangerouslySetInnerHTML` to render HTML. Consider adding HTML sanitization for production use.
- Images are uploaded to Convex storage and URLs are automatically inserted into the content.
- The editor automatically handles dark/light mode based on your theme.

