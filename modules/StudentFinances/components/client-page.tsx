"use client";

import React, { useState, useMemo } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./data-table-toolbar"; // Kita akan reuse toolbar sebelumnya
import { createColumns } from "./columns";
import { SavingsTransaction, Student } from "../types";
import { printSavingsStatement } from "../lib/action";
import { HistoryDrawer } from "./history-drawer";
import { TransactionFormData, TransactionModal } from "./transaction-modal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AddStudentModal, StudentFormData } from "./add-student-modal";
// import { TransactionModal } from './transaction-modal'; // Placeholder

type ClientPageProps = {
  initialData: Student[];
};

export function StudentSavingsClientPage({ initialData }: ClientPageProps) {
  // const { toast } = useToast();
  const [data, setData] = useState<Student[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // --- Handlers untuk membuka modal/drawer ---
  const handleViewHistory = (student: Student) => {
    setSelectedStudent(student);
    setIsHistoryDrawerOpen(true);
  };

  const handleAddTransaction = (student: Student) => {
    setSelectedStudent(student);
    setIsTransactionModalOpen(true);
  };

  const handleStudentSubmit = (values: StudentFormData) => {
    const newStudent: Student = {
      id: Math.random(), // ID unik sementara
      nis: values.nis,
      name: values.name,
      class: values.class,
      balance: 0, // Saldo awal adalah 0
      history: [], // Riwayat transaksi kosong
    };

    setData((prev) => [...prev, newStudent]);
    toast("Siswa Ditambahkan! 🧑‍🎓", {
      description: `Siswa baru bernama ${values.name} telah berhasil ditambahkan.`,
    });
    setIsAddStudentModalOpen(false); // Tutup modal
  };

  // --- Handler untuk submit form transaksi ---
  const handleTransactionSubmit = (values: TransactionFormData) => {
    if (!selectedStudent) return;

    const newTransaction: SavingsTransaction = {
      id: Math.random(), // ID unik sementara
      date: new Date().toISOString().split("T")[0], // Tanggal hari ini
      type: values.type,
      amount: values.amount,
    };

    // Update data siswa di state
    const updatedData = data.map((student) => {
      if (student.id === selectedStudent.id) {
        const newBalance =
          values.type === "Setoran"
            ? student.balance + values.amount
            : student.balance - values.amount;

        // Validasi saldo cukup untuk penarikan
        if (newBalance < 0) {
          toast("Gagal!", {
            description: "Saldo siswa tidak mencukupi untuk penarikan.",
          });
          return student; // Kembalikan data tanpa perubahan
        }

        return {
          ...student,
          balance: newBalance,
          history: [...student.history, newTransaction],
        };
      }
      return student;
    });

    setData(updatedData);
    toast("Transaksi Berhasil! 🏦", {
      description: `${values.type} sebesar Rp${values.amount.toLocaleString(
        "id-ID"
      )} untuk ${selectedStudent.name} telah dicatat.`,
    });

    setIsTransactionModalOpen(false); // Tutup modal
  };

  const columns = useMemo(
    () =>
      createColumns({
        onViewHistory: handleViewHistory,
        onAddTransaction: handleAddTransaction,
        onPrint: printSavingsStatement,
      }),
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  });

  const uniqueClasses = [...new Set(initialData.map((item) => item.class))];

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border bg-white p-4 md:p-8 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Tabungan Siswa</h1>
          <p className="text-sm text-muted-foreground">
            Kelola data tabungan seluruh siswa.
          </p>
        </div>
        <Button onClick={() => setIsAddStudentModalOpen(true)}>
          Tambah Siswa
        </Button>
      </div>

      <DataTableToolbar table={table} classes={uniqueClasses} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Berikutnya
        </Button>
      </div>

      {/* Render Drawer & Modal di sini */}

      {/* Render Drawer & Modal di sini */}
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        student={selectedStudent}
      />
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        student={selectedStudent}
        onSubmit={handleTransactionSubmit}
      />
      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        onSubmit={handleStudentSubmit}
      />
    </div>
  );
}
