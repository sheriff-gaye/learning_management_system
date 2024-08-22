"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TEMPLATE } from "../../_components/template-section";
import { Loader } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput:any
  loading:boolean
}

const generateSchema = (template?: TEMPLATE) => {
  const fields = template?.form?.reduce((acc, item) => {
    acc[item.name] = item.required ? z.string().min(1, `${item.label || item.name} is required`) : z.string().optional();
    return acc;
  }, {} as { [key: string]: any });

  return z.object(fields || {});
};

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = generateSchema(selectedTemplate);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: selectedTemplate?.form?.reduce((acc, item) => {
      acc[item.name] = "";
      return acc;
    }, {} as { [key: string]: string }),
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof schema>) => {

    userFormInput(values);
  };

  return (
    <div className="p-5 shadow-lg border rounded-lg">
        {/* @ts-ignore */}
      <Image src={selectedTemplate?.icon} alt="icon" width={70} height={70} />
      <h2 className="font-bold text-2xl mb-2">{selectedTemplate?.name}</h2>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
          {selectedTemplate?.form?.map((item, index) => (
            <FormField
              key={index}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <label>{item.label}</label>
                  <FormControl>
                    {item.field === "input" ? (
                      <Input
                        {...field}
                        placeholder={`Enter ${item.label || item.name}`}
                        disabled={isSubmitting}
                      />
                    ) : item.field === "textarea" ? (
                      <Textarea {...field} disabled={isSubmitting} />
                    ) : null}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="w-full py-6 mt-3"
            variant="success"
            disabled={!isValid || isSubmitting || loading}
          >
            {
                loading&& <Loader className="animate-spin"/>
            }
            Generate Content
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormSection;