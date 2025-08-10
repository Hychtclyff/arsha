import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Student } from "../types";

const formatCurrency = (amount: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

/**
 * Membuat dan mengunduh PDF struk tabungan untuk siswa.
 * @param student - Objek siswa yang akan dicetak struknya.
 */
export const printSavingsStatement = (student: Student) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text("Struk Tabungan Siswa SARAH", 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);

  doc.text(`Nama Siswa: ${student.name}`, 14, 35);
  doc.text(`NIS: ${student.nis}`, 14, 42);
  doc.text(`Kelas: ${student.class}`, 14, 49);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Saldo Akhir: ${formatCurrency(student.balance)}`, 14, 60);
  doc.setFont("helvetica", "normal");

  const tableData = student.history.map(trx => [
    trx.date,
    trx.type,
    trx.type === "Setoran" ? `+ ${formatCurrency(trx.amount)}` : `- ${formatCurrency(trx.amount)}`,
  ]);

  autoTable(doc, {
    startY: 70,
    head: [['Tanggal', 'Jenis Transaksi', 'Jumlah']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [22, 163, 74] },
  });

  doc.save(`Tabungan_${student.name.replace(/ /g, '_')}.pdf`);
};