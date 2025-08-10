"use client";
import { useState } from "react";
import { dummyTransactions } from "../data";
import { TransactionTable } from "./TransactionTable";
import { AddTransactionModal } from "./AddTransactionModal";
import { IconPlus } from "@tabler/icons-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function TransaksiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Nanti, data ini akan diambil dari API
  const transactions = dummyTransactions;

  // Simulasi peran pengguna, ganti menjadi `true` untuk melihat tampilan Admin
  const isUserAdmin = true;

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-8 dark:border-neutral-700 dark:bg-neutral-900">
      {/* Header Halaman */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          Daftar Transaksi
        </h1>

        <Dialog>
          <DialogTrigger>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
            >
              <IconPlus size={20} />
              Tambah Transaksi
            </button>
          </DialogTrigger>
          <DialogContent>
            <AddTransactionModal />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter dan Search (Placeholder) */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Cari deskripsi..."
          className="w-full max-w-xs rounded-md border-neutral-300 p-2 text-sm dark:border-neutral-600 dark:bg-neutral-800"
        />
        <input
          type="date"
          className="rounded-md border-neutral-300 p-2 text-sm dark:border-neutral-600 dark:bg-neutral-800"
        />
      </div>

      {/* Tabel Transaksi */}
      <div className="flex-grow">
        <TransactionTable transactions={transactions} isAdmin={isUserAdmin} />
      </div>

      {/* Modal Tambah Transaksi */}
    </div>
  );
}
