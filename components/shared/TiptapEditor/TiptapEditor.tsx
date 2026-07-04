"use client";

import { type ReactNode, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Pilcrow,
} from "lucide-react";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function ToolButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`p-1.5 rounded-md transition-colors ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function TiptapEditor({
  value,
  onChange,
  placeholder,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({ placeholder: placeholder || "" }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] px-3 py-2 focus:outline-none text-sm leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-1.5 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_li]:text-sm [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:text-sm [&_pre]:overflow-x-auto [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_hr]:my-4 [&_hr]:border-border/80",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-border/80 overflow-hidden bg-background">
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border/80 bg-muted/10 flex-wrap">
        <ToolButton
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
          label="Paragraph"
        >
          <Pilcrow className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolButton>
        <span className="w-px h-5 bg-border/80 mx-1" />
        <ToolButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolButton>
        <span className="w-px h-5 bg-border/80 mx-1" />
        <ToolButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
