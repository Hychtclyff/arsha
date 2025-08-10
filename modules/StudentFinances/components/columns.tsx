"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Student } from "../types";

const formatCurrency = (amount: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

// Tipe untuk props handler yang akan kita teruskan
type ColumnActionHandlers = {
  onViewHistory: (student: Student) => void;
  onAddTransaction: (student: Student) => void;
  onPrint: (student: Student) => void;
}

// Kolom didefinisikan sebagai fungsi yang mengembalikan array ColumnDef
export const createColumns = ({ onViewHistory, onAddTransaction, onPrint }: ColumnActionHandlers): ColumnDef<Student>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nama Siswa
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "class",
    header: "Kelas",
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
       <div className="text-right">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Saldo
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
       </div>
    ),
    cell: ({ row }) => <div className="text-right font-semibold">{formatCurrency(row.original.balance)}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="text-center">
            <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onAddTransaction(student)}>Tambah Transaksi</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewHistory(student)}>Lihat Riwayat</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPrint(student)}>Cetak Struk</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      );
    },
  },
];