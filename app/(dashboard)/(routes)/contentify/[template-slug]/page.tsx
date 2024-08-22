"use client";

import Link from "next/link";
import { TEMPLATE } from "../_components/template-section";
import templates from "../_components/Templates";
import FormSection from "./_components/form-section";
import OutputSection from "./_components/output-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { chatSession } from "@/lib/AIModel";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { db } from "@/lib/db";

interface PROPS {
  params: {
    "template-slug": string;
  };
}
const CreateContent = (props: PROPS) => {
  const selectedTemplate: TEMPLATE | undefined = templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );

  const [loading, setIsLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");


  const GenerateAIContent = async (formData: any) => {
    setIsLoading(true);

      const selectedPrompt = selectedTemplate?.aiPrompt;
      const finalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

      const result = await chatSession.sendMessage(finalAiPrompt);
      const aiOutput = result.response.text(); // Store the response in a local variable

      setAiOutput(aiOutput);
  };

  const saveInDB= async()=>{
    // const result = await db.
  }

  return (
    <div className="p-10">
      <Link href="/contentify">
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid col-span-1 md:grid-cols-2 gap-10  py-5">
        <div>
          <FormSection
            selectedTemplate={selectedTemplate}
            userFormInput={(v: any) => GenerateAIContent(v)}
            loading={loading}
          />
        </div>
        <div>
          <OutputSection output={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default CreateContent;
