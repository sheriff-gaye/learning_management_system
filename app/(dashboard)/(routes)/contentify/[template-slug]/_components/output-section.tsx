"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface PROPS {
  output: string;
}

const OutputSection = ({ output }: PROPS) => {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(output);
  }, [output]);

  const onCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success("Text Copied");
    } else {
      toast.error("Generate Content First");
    }
  };

  return (
    <div className="bg-white shadow-lg border rounded-lg ">
      <div className="flex justify-between items-center p-5 ">
        <h2 className="text-medium text-lg">Your Result</h2>
        <Button variant="ghost" className="flex gap-2" onClick={onCopy}>
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>
      <Editor
      theme={'dark'}
        ref={editorRef}
        initialValue="Your Result will appear here"
        height="400px"
        initialEditType="wysiwyg"
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkDown)
        }
        useCommandShortcut={true}
      />
    </div>
  );
};

export default OutputSection;
