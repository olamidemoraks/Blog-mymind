"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type QuillEditorProps = {
  setContent: (value: string) => void;
  content: string;
};

const QuillEditor: React.FC<QuillEditorProps> = ({ setContent, content }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];
  return (
    <>
      <ReactQuill
        modules={modules}
        onChange={setContent}
        value={content}
        theme="snow"
        formats={formats}
        className="md:min-h-[40vh] h-[400px] flex-1 mb-4 border-none"
        placeholder="What is on your mind"
      />
    </>
  );
};
export default QuillEditor;
