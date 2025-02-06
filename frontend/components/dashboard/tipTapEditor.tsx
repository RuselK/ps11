"use client"

import { useCallback, useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Heading4, ImageIcon } from "lucide-react"
import { uploadImage as serviceUploadImage } from "@/services/imagesService"
import { Skeleton } from "@/components/ui/skeleton"

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  // 1. Initialize the editor
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // 2. Single function to handle file -> imagesService.uploadImage
  const handleUploadImage = useCallback(async (file: File) => {
    try {
      const response = await serviceUploadImage(file)
      return response.data.url
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error)
      return null
    }
  }, [])

  // 3. Prompt for file -> upload -> insert into editor
  const addImage = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0]
        const imageUrl = await handleUploadImage(file)
        if (imageUrl) {
          editor?.chain().focus().setImage({ src: imageUrl }).run()
        }
      }
    }
    input.click()
  }, [editor, handleUploadImage])

  // 4. Handle paste events (for images)
  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            event.preventDefault()

            const file = items[i].getAsFile()
            if (file) {
              handleUploadImage(file).then((imageUrl) => {
                if (imageUrl) {
                  editor?.chain().focus().setImage({ src: imageUrl }).run()
                }
              })
            }
            break
          }
        }
      }
    },
    [editor, handleUploadImage]
  )

  // 5. Add paste event listener once
  useEffect(() => {
    if (!editor) return

    const view = editor.view
    const dom = view.dom

    dom.addEventListener("paste", handlePaste)
    return () => {
      dom.removeEventListener("paste", handlePaste)
    }
  }, [editor, handlePaste])

  // 6. Render nothing if editor is not ready
  if (!editor) {
    return <Skeleton className="w-full h-[252px]" />
  }

  // 7. Render editor + toolbar
  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-2 p-2 border-b">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive("heading", { level: 4 }) ? "bg-muted" : ""}
        >
          <Heading4 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addImage}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[200px]" />
    </div>
  )
}
