"use client"; // Halaman ini interaktif karena ada filter

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyOverviewChart } from "./monthly-overview-chart";
import { ExpenseCategoryChart } from "./expense-category-chart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// --- DATA SIMULASI (Nantinya diambil dari API) ---
const monthlyData = [
  { month: "Mei", pemasukan: 4000000, pengeluaran: 2400000 },
  { month: "Juni", pemasukan: 3000000, pengeluaran: 1398000 },
  { month: "Juli", pemasukan: 5000000, pengeluaran: 4800000 },
  { month: "Agustus", pemasukan: 2780000, pengeluaran: 3908000 },
];

const expenseData = [
  { name: "Gaji Guru", value: 4800000 },
  { name: "ATK & Operasional", value: 2400000 },
  { name: "Listrik & Air", value: 1398000 },
  { name: "Kegiatan Siswa", value: 3908000 },
];

const formatCurrency = (value: number) =>
  `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
// --- AKHIR DATA SIMULASI ---

export default function ReportPage() {
  // Kalkulasi Total
  const totalPemasukan = monthlyData.reduce(
    (acc, cur) => acc + cur.pemasukan,
    0
  );
  const totalPengeluaran = monthlyData.reduce(
    (acc, cur) => acc + cur.pengeluaran,
    0
  );
  const labaRugi = totalPemasukan - totalPengeluaran;

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 rounded-tl-2xl border bg-gray-50 p-4 md:p-8 dark:border-neutral-700 dark:bg-neutral-950 overflow-auto">
      {/* Header Halaman */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            Laporan Keuangan
          </h1>
          <p className="text-sm text-muted-foreground">
            Analisis dan visualisasi data keuangan sekolah.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Unduh Laporan
        </Button>
      </div>

      {/* Kartu Statistik KPI */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pemasukan
            </CardTitle>
            <span className="text-green-500">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalPemasukan)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pengeluaran
            </CardTitle>
            <span className="text-red-500">💸</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalPengeluaran)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laba / Rugi</CardTitle>
            <span
              className={labaRugi >= 0 ? "text-blue-500" : "text-yellow-500"}
            >
              📈
            </span>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${labaRugi < 0 && "text-red-500"}`}
            >
              {formatCurrency(labaRugi)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Area Diagram */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Ringkasan Pemasukan vs Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyOverviewChart data={monthlyData} />
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Rincian Kategori Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseCategoryChart data={expenseData} />
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Analisis Tambahan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[350px] items-center justify-center">
              <p className="text-muted-foreground">
                Area untuk diagram lainnya...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
