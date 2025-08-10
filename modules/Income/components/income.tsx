"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Import data, kolom, dan tipe yang sudah kita buat sebelumnya
import { dummyFundSources } from "../data";
import { columns } from "./columns";
import { fundSourceSchema, FundSource } from "../types";

// Import komponen UI yang kita butuhkan
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SumberDanaPage() {
  const [fundSources, setFundSources] =
    useState<FundSource[]>(dummyFundSources);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Setup form menggunakan react-hook-form dan zod
  const form = useForm<z.infer<typeof fundSourceSchema>>({
    resolver: zodResolver(fundSourceSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  // Fungsi yang dijalankan saat form disubmit
  function onSubmit(values: z.infer<typeof fundSourceSchema>) {
    // Simulasi penambahan data ke state
    const newFund: FundSource = {
      id: Math.max(...fundSources.map((f) => f.id), 0) + 1,
      ...values,
    };
    setFundSources((prev) => [...prev, newFund]);

    toast("Berhasil! 🎉", {
      description: `Sumber dana "${values.name}" telah ditambahkan.`,
    });

    setIsDialogOpen(false);
    form.reset();
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border bg-white p-4 md:p-8 dark:border-neutral-700 dark:bg-neutral-900">
      {/* Header Halaman */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            Sumber Dana
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola semua sumber pendanaan sekolah di sini.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Tambah Sumber Dana</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Sumber Dana Baru</DialogTitle>
              <DialogDescription>
                Masukkan detail sumber dana. Klik simpan jika sudah selesai.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Sumber Dana</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: SPP Bulanan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Jelaskan secara singkat..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Status Aktif</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Menggunakan komponen DataTable yang sudah reusable */}
      <DataTable columns={columns} data={fundSources} />
    </div>
  );
}
