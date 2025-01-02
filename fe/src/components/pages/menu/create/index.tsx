/* eslint-disable space-before-function-paren */
"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import DefaultLayout from "@/components/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/apiClient";

type MenuInterface = {
  success: boolean;
  code: number;
  message: string;
  data: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

type Response = {
  data: MenuInterface;
  error?: string;
};

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
});

const CreateMenu = () => {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {
      const response = (await apiClient(`${process.env.NEXT_PUBLIC_API_URL}/menu`, "POST", data)) as Response;

      if (response.error) {
        return toast.error(response.error);
      }

      toast.success(`Menu "${response.data.data.name}" created successfully!`);

      setTimeout(() => {
        navigate.push("/menu");
      }, 2000);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout breadcrumbItems={[{ name: "Create Menu", href: "/menu/create" }]}>
      <div className="flex w-full flex-col items-start justify-start gap-6">
        {/* Header */}
        <div className="flex w-full flex-row justify-between">
          <span className="text-xl font-semibold">Create Menu</span>
          <Button className="text-white hover:text-black" onClick={() => navigate.push("/menu")}>
            Back
          </Button>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu name" {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full text-white hover:text-black">
              {isLoading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </DefaultLayout>
  );
};

export default CreateMenu;
