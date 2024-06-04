"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
    email: z.string().min(7, {
      message: "email is required"
    })
  });

const NewsLetterPage = () => {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });   
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const onSubmit= async (values: z.infer<typeof formSchema>)=>{
    try {

        await axios.post("/api/newsletter", values);
        router.refresh();
        toast.success("You have successfully Subscibed")
        
    } catch (error) {
        toast.error("something when wrong");   
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl font-bold">Our Newsletter</h1>
        <p className="text-sm text-slate-600">
          Subscribe to our newsletter to receive notification when we upload new courses and new features
        </p>
        <Form {...form}>
          <form className="space-y-8 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
             control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field}  disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
             
              <Button type="submit" disabled={!isValid || isSubmitting}>Subscribe</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewsLetterPage;
