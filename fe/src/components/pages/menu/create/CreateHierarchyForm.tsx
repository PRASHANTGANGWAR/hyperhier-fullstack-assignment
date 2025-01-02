/* eslint-disable space-before-function-paren */
"use client";

import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/apiClient";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  parentDataName: z.string().min(2, { message: "Parent Data Name Cannot be Null" }).optional(),
  menuId: z.string().min(2, { message: "Parent Id Cannot be Null" }),
  depth: z.number({ message: "Depth Cannot be Null" }).optional(),
});

export default function CreateHierarchyForm({
  menuId,
  parentDataName,
  superParentId,
  depth,
  closeCard,
  type,
}: {
  menuId: string;
  name?: string;
  parentDataName: string;
  superParentId: string;
  depth: number;
  closeCard: () => void;
  type?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      menuId: "",
      depth: 0,
      parentDataName: "",
    },
  });

  useEffect(() => {
    if (type == "add") {
      form.reset({
        name: "",
        menuId: menuId,
        depth: depth,
        parentDataName: parentDataName,
      });
    } else {
      form.reset({
        name: parentDataName,
        menuId: menuId,
        depth: depth,
      });
    }
  }, [menuId, parentDataName, depth, superParentId, form, type]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let payload = {};
    let message = "";
    if (type == "add") {
      payload = { name: data.name, depth: data.depth, parentId: data.menuId, superParentId };
      message = "Sub Menu Created Successfully";
    } else {
      payload = { name: data.name };
      message = "Sub Menu Updated Successfully";
    }
    setIsLoading(true);

    const response = await apiClient<{ data: { data: object; status: number; success: string }; error?: string }>(
      type == "add"
        ? `${process.env.NEXT_PUBLIC_API_URL}/menu-hierarchy`
        : `${process.env.NEXT_PUBLIC_API_URL}/menu-hierarchy/${menuId}`,
      type == "add" ? "POST" : "PATCH",
      payload,
    );

    if (response.error) {
      setIsLoading(false);
      return toast.error("Error while creating hierarchy");
    }

    setIsLoading(false);
    toast.success(message);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Card className="p-4">
      <CardContent className="relative">
        <X className="absolute right-0 cursor-pointer text-red-500" onClick={closeCard} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="menuId"
              disabled
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Menu Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Menu Id" {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depth"
              disabled
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Depth</FormLabel>
                  <FormControl>
                    <Input placeholder="menuId" {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            {type == "add" && (
              <FormField
                control={form.control}
                name="parentDataName"
                disabled
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Parent Data</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="w-full text-white hover:text-black">
              {isLoading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
              {type == "add" ? "Create" : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
