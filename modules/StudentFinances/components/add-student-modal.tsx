"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Skema validasi untuk form tambah siswa
export const studentFormSchema = z.object({
  nis: z.string().min(3, { message: "NIS minimal 3 karakter." }),
  name: z.string().min(3, { message: "Nama minimal 3 karakter." }),
  class: z.string().min(1, { message: "Kelas wajib diisi." }),
});

export type StudentFormData = z.infer<typeof studentFormSchema>;

type AddStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: StudentFormData) => void;
};

export function AddStudentModal({ isOpen, onClose, onSubmit }: AddStudentModalProps) {
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      nis: "",
      name: "",
      class: "",
    },
  });

  // Fungsi untuk menangani submit dan mereset form
  const handleFormSubmit = (values: StudentFormData) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Siswa Baru</DialogTitle>
          <DialogDescription>
            Masukkan data siswa baru. Saldo awal akan diatur ke Rp 0.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="nis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Induk Siswa (NIS)</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: 1006" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap Siswa</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Dini Putri" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Kelas A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>Batal</Button>
              <Button type="submit">Simpan Siswa</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}