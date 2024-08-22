"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";


interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Edior = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill theme="snow" className="dark:bg-black" value={value} onChange={onChange}/>
    </div>
  );
};
