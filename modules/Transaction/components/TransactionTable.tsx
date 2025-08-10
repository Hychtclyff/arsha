"use client";
import { cn } from "@/lib/utils";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { Transaction } from "../types"; // <-- Import tipe Transaction
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";


// Definisikan tipe untuk props StatusBadge
type StatusBadgeProps = {
  status: Transaction["status"]; // <-- Menggunakan tipe status dari Transaction
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={cn("rounded-full px-2 py-1 text-xs font-semibold text-white", {
        "bg-green-500": status === "Disetujui",
        "bg-yellow-500": status === "Menunggu Persetujuan",
        "bg-red-500": status === "Ditolak",
      })}
    >
      {status}
    </span>
  );
};

// Definisikan tipe untuk props TransactionTable
type TransactionTableProps = {
  transactions: Transaction[];
  isAdmin?: boolean;
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  isAdmin = false,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
      <Table className="min-w-full divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
        <TableHeader className="bg-gray-50 dark:bg-neutral-800">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-300">
              Tanggal
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-300">
              Deskripsi
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-300">
              Jumlah
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-300">
              Status
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-300">
              Oleh
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-300">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {transactions.map((trx) => (
            <TableRow key={trx.id}>
              <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-neutral-800 dark:text-neutral-200">
                {trx.tanggal}
              </TableCell>
              <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-neutral-800 dark:text-neutral-200">
                <div className="font-medium">{trx.deskripsi}</div>
                <div className="text-xs text-neutral-500">{trx.sumberDana}</div>
              </TableCell>
              <TableCell
                className={`whitespace-nowrap px-6 py-4 text-sm font-semibold ${
                  trx.tipe === "Pemasukan"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {trx.tipe === "Pemasukan" ? "+" : "-"}{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(trx.jumlah)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-6 py-4 text-sm">
                <StatusBadge status={trx.status} />
              </TableCell>
              <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                {trx.oleh}
              </TableCell>
              <TableCell className="whitespace-nowrap px-6 py-4 text-sm">
                <div className="flex items-center gap-2">
                  {isAdmin && trx.status === "Menunggu Persetujuan" && (
                    <>
                      <Button className="text-green-500 hover:text-green-700">
                        <IconCheck size={20} />
                      </Button>
                      <Button className="text-red-500 hover:text-red-700">
                        <IconX size={20} />
                      </Button>
                    </>
                  )}
                  <Button className="text-blue-500 hover:text-blue-700">
                    <IconPencil size={20} />
                  </Button>
                  <Button className="text-neutral-500 hover:text-neutral-700">
                    <IconTrash size={20} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
