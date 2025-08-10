import { Transaction } from "./types";

// Sekarang data kita memiliki tipe yang jelas, yaitu array dari Transaction
export const dummyTransactions: Transaction[] = [
  {
    id: 1,
    tanggal: "2025-08-04",
    deskripsi: "Pembelian ATK untuk kegiatan belajar",
    sumberDana: "BOP Tahap 2",
    tipe: "Pengeluaran",
    jumlah: 150000,
    status: "Disetujui",
    oleh: "Admin Bendahara",
  },
  {
    id: 2,
    tanggal: "2025-08-03",
    deskripsi: "Pembayaran SPP bulan Agustus - Ananda Fatih",
    sumberDana: "SPP",
    tipe: "Pemasukan",
    jumlah: 250000,
    status: "Disetujui",
    oleh: "Guru Kelas A",
  },
  {
    id: 3,
    tanggal: "2025-08-02",
    deskripsi: "Iuran kegiatan 17 Agustus",
    sumberDana: "Iuran Kegiatan",
    tipe: "Pemasukan",
    jumlah: 50000,
    status: "Menunggu Persetujuan",
    oleh: "Guru Kelas B",
  },
  {
    id: 4,
    tanggal: "2025-08-01",
    deskripsi: "Pembelian snack untuk rapat guru",
    sumberDana: "Kas Sekolah",
    tipe: "Pengeluaran",
    jumlah: 75000,
    status: "Ditolak",
    oleh: "Guru Kelas A",
  },
];
