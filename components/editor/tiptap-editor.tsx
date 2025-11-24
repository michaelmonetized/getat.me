"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import "./tiptap-editor.css";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCallback, useState, useEffect, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  editable = true,
}: TiptapEditorProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [uploadedStorageId, setUploadedStorageId] =
    useState<Id<"_storage"> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileUrl = useQuery(
    api.files.getFileUrl,
    uploadedStorageId ? { fileId: uploadedStorageId } : "skip"
  );
  const pendingUploads = useRef<
    Map<
      Id<"_storage">,
      { resolve: (url: string) => void; reject: (error: Error) => void }
    >
  >(new Map());

  // Handle completed uploads
  useEffect(() => {
    if (uploadedStorageId && fileUrl) {
      const pending = pendingUploads.current.get(uploadedStorageId);
      if (pending) {
        pending.resolve(fileUrl);
        pendingUploads.current.delete(uploadedStorageId);
        setUploadedStorageId(null);
        setIsUploading(false);
      }
    }
  }, [uploadedStorageId, fileUrl]);

  const handleImageUpload = useCallback(
    async (file: File): Promise<string> => {
      setIsUploading(true);
      try {
        // Get upload URL from Convex
        const { url } = await generateUploadUrl();

        // Upload file to Convex storage
        const upload = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!upload.ok) {
          throw new Error(
            `Failed to upload image: ${upload.status} ${upload.statusText}`
          );
        }

        const response = await upload.json();
        if (!response.storageId) {
          throw new Error("Upload response missing storageId");
        }

        const storageId = response.storageId as Id<"_storage">;

        // Create a promise that will resolve when the query returns the URL
        return new Promise<string>((resolve, reject) => {
          // Store the promise callbacks
          pendingUploads.current.set(storageId, { resolve, reject });

          // Set the storage ID to trigger the query
          setUploadedStorageId(storageId);

          // Timeout after 10 seconds
          setTimeout(() => {
            if (pendingUploads.current.has(storageId)) {
              pendingUploads.current.delete(storageId);
              setUploadedStorageId(null);
              setIsUploading(false);
              reject(new Error("Timeout waiting for file URL"));
            }
          }, 10000);
        });
      } catch (error) {
        console.error("Image upload error:", error);
        setIsUploading(false);
        // Fallback: return a data URL for immediate preview
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      }
    },
    [generateUploadUrl]
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          const file = event.dataTransfer.files[0];

          // Check if it's an image
          if (file.type.startsWith("image/")) {
            event.preventDefault();

            // Upload the image
            handleImageUpload(file)
              .then((url) => {
                if (url) {
                  const { schema } = view.state;
                  const coordinates = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                  });

                  if (coordinates) {
                    const node = schema.nodes.image.create({ src: url });
                    const transaction = view.state.tr.insert(
                      coordinates.pos,
                      node
                    );
                    view.dispatch(transaction);
                  }
                }
              })
              .catch((error) => {
                console.error("Failed to upload image:", error);
              });

            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);

        for (const item of items) {
          if (item.type.startsWith("image/")) {
            event.preventDefault();
            const file = item.getAsFile();

            if (file) {
              handleImageUpload(file)
                .then((url) => {
                  if (url) {
                    const { schema } = view.state;
                    const node = schema.nodes.image.create({ src: url });
                    const transaction =
                      view.state.tr.replaceSelectionWith(node);
                    view.dispatch(transaction);
                  }
                })
                .catch((error) => {
                  console.error("Failed to upload image:", error);
                });
            }

            return true;
          }
        }
        return false;
      },
    },
  });

  // Update editor content when prop changes
  if (editor && content !== editor.getHTML()) {
    editor.commands.setContent(content, { emitUpdate: false });
  }

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && editor) {
        try {
          const url = await handleImageUpload(file);
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        } catch (error) {
          console.error("Failed to upload image:", error);
        }
      }
    };
    input.click();
  }, [editor, handleImageUpload]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg overflow-hidden relative">
      {isUploading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Spinner size="lg" className="text-primary" />
            <p className="text-sm text-muted-foreground">Uploading image...</p>
          </div>
        </div>
      )}
      {editable && (
        <div className="border-b p-2 flex gap-2 flex-wrap bg-muted/50">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("bold")
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("italic")
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            Italic
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("heading", { level: 1 })
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            H1
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("heading", { level: 2 })
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("bulletList")
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("blockquote")
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            Quote
          </button>
          <button
            type="button"
            onClick={addImage}
            className="px-3 py-1 rounded text-sm font-medium bg-background hover:bg-muted"
          >
            Image
          </button>
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("Enter URL:");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`px-3 py-1 rounded text-sm font-medium ${
              editor.isActive("link")
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            Link
          </button>
        </div>
      )}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-[400px] focus:outline-none"
      />
    </div>
  );
}
