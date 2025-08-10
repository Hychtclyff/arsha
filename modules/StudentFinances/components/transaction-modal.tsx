"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Student } from "../types";

// 1. Definisikan skema validasi form
const transactionFormSchema = z.object({
  type: z.enum(["Setoran", "Penarikan"], {
    required_error: "Anda harus memilih tipe transaksi.",
  }),
  amount: z.coerce.number().positive({ message: "Jumlah harus lebih dari 0." }),
});

export type TransactionFormData = z.infer<typeof transactionFormSchema>;

// 2. Definisikan props untuk komponen modal
type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onSubmit: (values: TransactionFormData) => void;
};

export function TransactionModal({ isOpen, onClose, student, onSubmit }: TransactionModalProps) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: "Setoran",
      amount: 0,
    },
  });

  // 3. Reset form setiap kali modal dibuka atau siswa berubah
  useEffect(() => {
    if (isOpen) {
      form.reset({ type: "Setoran", amount: 0 });
    }
  }, [isOpen, form]);

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Transaksi</DialogTitle>
          <DialogDescription>
            Catat setoran atau penarikan untuk siswa:{" "}
            <span className="font-semibold">{student.name}</span>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Pilih Jenis Transaksi</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Setoran" />
                        </FormControl>
                        <FormLabel className="font-normal">Setoran</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Penarikan" />
                        </FormControl>
                        <FormLabel className="font-normal">Penarikan</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah (Rp)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>Batal</Button>
              <Button type="submit">Simpan Transaksi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}