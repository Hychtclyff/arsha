"use client";
import { IconCash, IconReceipt2, IconWallet } from "@tabler/icons-react";
import {DashboardCard} from "./DashboardCard";

export const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-8 dark:border-neutral-700 dark:bg-neutral-900">
        {/* Header Dashboard */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sabtu, 26 Juli 2025
          </p>
        </div>

        {/* Kartu Ringkasan Keuangan */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DashboardCard
            title="Pemasukan Bulan Ini"
            value="Rp 0"
            icon={<IconCash className="text-green-500" />}
          />
          <DashboardCard
            title="Pengeluaran Bulan Ini"
            value="Rp 0"
            icon={<IconReceipt2 className="text-red-500" />}
          />
          <DashboardCard
            title="Total Saldo Kas"
            value="Rp 0"
            icon={<IconWallet className="text-blue-500" />}
          />
        </div>

        {/* Area Grafik dan Transaksi Terbaru */}
        <div className="flex flex-1 flex-col gap-4 lg:flex-row">
          <div className="h-80 w-full flex-[2] rounded-lg bg-gray-50 p-4 dark:bg-neutral-800">
            <h3 className="font-semibold">
              Grafik Arus Kas (30 Hari Terakhir)
            </h3>
            {/* Tempat untuk komponen grafik */}
            <div className="h-full w-full animate-pulse rounded-md bg-gray-200 dark:bg-neutral-700 mt-2"></div>
          </div>
          <div className="w-full flex-1 rounded-lg bg-gray-50 p-4 dark:bg-neutral-800">
            <h3 className="font-semibold">Transaksi Terbaru</h3>
            {/* Tempat untuk daftar transaksi */}
            <div className="flex flex-col gap-2 mt-2">
              {[...new Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-neutral-700"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
