"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { CalendarIcon } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";

// Definisikan tipe untuk props AddTransactionModal

export const AddTransactionModal = () => {
  const [date, setDate] = React.useState<Date>();
  const [files, setFiles] = React.useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Tambah Transaksi Baru</h2>
      </div>
      <form>
        <div className="space-y-4">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="data-[empty=true]:text-muted-foreground  justify-start text-left font-normal w-full"
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label
              htmlFor="deskripsi"
              className="mb-1 block text-sm font-medium"
            >
              Deskripsi
            </Label>
            <Input
              type="text"
              id="deskripsi"
              name="deskripsi"
              placeholder="Contoh: Pembelian spidol"
              className="w-full rounded-md border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
              required
            />
          </div>
          <div>
            <Label htmlFor="jumlah" className="mb-1 block text-sm font-medium">
              Jumlah (Rp)
            </Label>
            <Input
              type="number"
              id="jumlah"
              name="jumlah"
              placeholder="50000"
              className="w-full rounded-md border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
              required
            />
          </div>
          <div>
            <Label className="mb-1 block text-sm font-medium">
              Tipe Transaksi
            </Label>
            <RadioGroup className="flex gap-4">
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="Pemasukan"
                  className="mr-1"
                  defaultChecked
                />{" "}
                <Label>Pemasukan</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="pengeluaran"
                  className="mr-1"
                  defaultChecked
                />{" "}
                <Label>Pengeluaran</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label
              htmlFor="sumberDana"
              className="mb-1 block text-sm font-medium"
            >
              Sumber Dana
            </Label>
            <Select>
              <SelectTrigger
                id="sumberDana"
                name="sumberDana"
                className="w-full rounded-md border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
              >
                <SelectContent>
                  <SelectItem value="bop_tahap_2">BOP Tahap 2</SelectItem>
                  <SelectItem value="spp">SPP</SelectItem>
                  <SelectItem value="kas">Kas Sekolah</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button className="rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600">
              Batal
            </Button>
            <Button
              type="submit"
              className="rounded-md bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
            >
              Simpan
            </Button>
          </div>
        </div>
      </form>
    </>
    // </div>
  );
};
