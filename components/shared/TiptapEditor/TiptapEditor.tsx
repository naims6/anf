"use client";

import { type ReactNode, useEffect, useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Unlink,
  Image,
  Code,
  Quote,
  Minus,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Highlighter,
  Palette,
  Undo2,
  Redo2,
  RemoveFormatting,
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

const colors = [
  "#000000", "#ffffff", "#dc2626", "#ea580c", "#d97706",
  "#65a30d", "#16a34a", "#0891b2", "#2563eb", "#7c3aed",
  "#db2777", "#78716c", "#737373", "#a3a3a3", "#d4d4d4",
  "#fef2f2", "#fff7ed", "#fffbeb", "#f7fee7", "#f0fdf4",
  "#ecfeff", "#eff6ff", "#f5f3ff", "#fdf2f8", "#fafaf9",
];

const highlights = [
  "#fef08a", "#fde68a", "#fecaca", "#bbf7d0", "#bfdbfe",
  "#c4b5fd", "#fbcfe8", "#e2e8f0",
];

export function TiptapEditor({
  value,
  onChange,
  placeholder,
}: TiptapEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary underline underline-offset-2" },
      }),
      ImageExtension.configure({
        HTMLAttributes: { class: "max-w-full h-auto rounded-lg" },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      Placeholder.configure({ placeholder: placeholder || "" }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] px-3 py-2 focus:outline-none text-sm leading-relaxed [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-1.5 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_li]:text-sm [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:text-sm [&_pre]:overflow-x-auto [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_hr]:my-4 [&_hr]:border-border/80",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setShowLinkInput(false);
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();
    setShowLinkInput(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-border/80 overflow-hidden bg-background">
      {/* Row 1: Text style, headings, formatting */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border/80 bg-muted/10 flex-wrap">
        <ToolButton
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
          label="Paragraph"
        >
          <Pilcrow className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          label="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
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

        <span className="w-px h-5 bg-border/60 mx-1" />

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
        <ToolButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          label="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          label="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive("subscript")}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          label="Subscript"
        >
          <SubscriptIcon className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive("superscript")}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          label="Superscript"
        >
          <SuperscriptIcon className="h-4 w-4" />
        </ToolButton>

        <span className="w-px h-5 bg-border/60 mx-1" />

        <div className="relative">
          <ToolButton
            active={editor.isActive("textStyle")}
            onClick={() => setShowColorPicker(!showColorPicker)}
            label="Text Color"
          >
            <Palette className="h-4 w-4" />
          </ToolButton>
          {showColorPicker && (
            <div
              className="absolute top-full left-0 mt-1 z-50 bg-card border border-border/80 rounded-xl shadow-lg p-2 grid grid-cols-5 gap-1 w-[180px]"
              onMouseLeave={() => setShowColorPicker(false)}
            >
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                    setShowColorPicker(false);
                  }}
                  className="h-6 w-6 rounded-md border border-border/40 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setShowColorPicker(false);
                }}
                className="col-span-5 mt-1 text-[10px] font-medium text-muted-foreground hover:text-foreground py-1 border-t border-border/60"
              >
                Reset color
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <ToolButton
            active={editor.isActive("highlight")}
            onClick={() => setShowHighlightPicker(!showHighlightPicker)}
            label="Highlight"
          >
            <Highlighter className="h-4 w-4" />
          </ToolButton>
          {showHighlightPicker && (
            <div
              className="absolute top-full left-0 mt-1 z-50 bg-card border border-border/80 rounded-xl shadow-lg p-2 grid grid-cols-4 gap-1 w-[150px]"
              onMouseLeave={() => setShowHighlightPicker(false)}
            >
              {highlights.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().toggleHighlight({ color }).run();
                    setShowHighlightPicker(false);
                  }}
                  className="h-6 w-6 rounded-md border border-border/40 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  setShowHighlightPicker(false);
                }}
                className="col-span-4 mt-1 text-[10px] font-medium text-muted-foreground hover:text-foreground py-1 border-t border-border/60"
              >
                Remove highlight
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Lists, alignment, media, utilities */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border/80 bg-muted/10 flex-wrap">
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
        <ToolButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          label="Code Block"
        >
          <Code className="h-4 w-4" />
        </ToolButton>

        <span className="w-px h-5 bg-border/60 mx-1" />

        <ToolButton
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          label="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          label="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          label="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          label="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </ToolButton>

        <span className="w-px h-5 bg-border/60 mx-1" />

        <div className="relative">
          <ToolButton
            active={editor.isActive("link")}
            onClick={() => {
              if (editor.isActive("link")) {
                editor.chain().focus().unsetLink().run();
              } else {
                setShowLinkInput(true);
                const previous = editor.getAttributes("link").href;
                setLinkUrl(previous || "");
              }
            }}
            label="Link"
          >
            {editor.isActive("link") ? (
              <Unlink className="h-4 w-4" />
            ) : (
              <Link className="h-4 w-4" />
            )}
          </ToolButton>
          {showLinkInput && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-card border border-border/80 rounded-xl shadow-lg p-2 flex items-center gap-1.5 w-[240px]">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 h-7 px-2 text-xs border border-border/60 rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") setLink();
                  if (e.key === "Escape") setShowLinkInput(false);
                }}
                autoFocus
              />
              <button
                type="button"
                onClick={setLink}
                className="h-7 px-2 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowLinkInput(false)}
                className="h-7 px-2 text-xs font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Esc
              </button>
            </div>
          )}
        </div>

        <ToolButton
          active={false}
          onClick={addImage}
          label="Image"
        >
          <Image className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          active={false}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolButton>

        <span className="w-px h-5 bg-border/60 mx-1" />

        <ToolButton
          active={false}
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          label="Clear Formatting"
        >
          <RemoveFormatting className="h-4 w-4" />
        </ToolButton>

        <div className="ml-auto flex items-center gap-0.5">
          <ToolButton
            active={false}
            onClick={() => editor.chain().focus().undo().run()}
            label="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={false}
            onClick={() => editor.chain().focus().redo().run()}
            label="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </ToolButton>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
