/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

const StoreModal = () => {
  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      toast.success("Store Created");
      // using window.loaction instead of router.push as window.assign refreshes the page
      // to make sure that the entire store is created then it is fetched fetched
      window.location.assign(`/${response.data.id}`); // (dashboard)/[storeId]--> layout.tsx
    } catch (e) {
      toast.error("Something Went Worng!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="e.g. Shoes Store"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full pt-6 space-x-2 flex items-center justify-end">
                <Button
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
