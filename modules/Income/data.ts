import { FundSource } from "./types";

export const dummyFundSources: FundSource[] = [
  {
    id: 1,
    name: "BOP Tahap 2 2025",
    description: "Bantuan Operasional Pendidikan dari pemerintah tahap 2.",
    isActive: true,
  },
  {
    id: 2,
    name: "SPP",
    description: "Sumbangan Pembinaan Pendidikan bulanan dari siswa.",
    isActive: true,
  },
  {
    id: 3,
    name: "Dana Hibah Yayasan Al-Ikhlas",
    description: "Dana hibah untuk pembangunan taman bermain.",
    isActive: false,
  },
  {
    id: 4,
    name: "Iuran Kegiatan 17 Agustus",
    description: "Dana sukarela dari orang tua untuk perayaan kemerdekaan.",
    isActive: true,
  },
];