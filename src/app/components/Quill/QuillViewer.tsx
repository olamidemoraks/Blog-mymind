import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

type QuillViewerProps = {
  content: string;
};

const QuillViewer: React.FC<QuillViewerProps> = ({ content }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <>
      <ReactQuill
        readOnly={true}
        value={content}
        theme="bubble"
        className=" mb-4 border-none text-[1.3rem] ql-editor w-full "
      />
    </>
  );
};
export default QuillViewer;
