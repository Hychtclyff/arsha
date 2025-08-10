// Mendefinisikan struktur objek untuk sebuah transaksi
export type Transaction = {
  id: number;
  tanggal: string;
  deskripsi: string;
  sumberDana: string;
  // Menggunakan string literal untuk tipe agar lebih aman
  tipe: "Pemasukan" | "Pengeluaran";
  jumlah: number;
  // Status juga menggunakan string literal
  status: "Disetujui" | "Menunggu Persetujuan" | "Ditolak";
  oleh: string;
};