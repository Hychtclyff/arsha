import { Student } from "./types";

export const dummyStudents: Student[] = [
  {
    id: 1,
    nis: "1001",
    name: "Ahmad Fatih",
    class: "Kelas A",
    balance: 150000,
    history: [
      { id: 1, date: "2025-08-01", type: "Setoran", amount: 100000 },
      { id: 2, date: "2025-08-05", type: "Setoran", amount: 50000 },
    ],
  },
  {
    id: 2,
    nis: "1002",
    name: "Zahra Humaira",
    class: "Kelas B",
    balance: 200000,
    history: [{ id: 1, date: "2025-08-02", type: "Setoran", amount: 200000 }],
  },
  {
    id: 3,
    nis: "1003",
    name: "Budi Santoso",
    class: "Kelas A",
    balance: 75000,
    history: [
      { id: 1, date: "2025-08-01", type: "Setoran", amount: 100000 },
      { id: 2, date: "2025-08-08", type: "Penarikan", amount: 25000 },
    ],
  },
  {
    id: 4,
    nis: "1004",
    name: "Citra Lestari",
    class: "Kelas C",
    balance: 300000,
    history: [{ id: 1, date: "2025-08-04", type: "Setoran", amount: 300000 }],
  },
  {
    id: 5,
    nis: "1005",
    name: "Bayu Perkasa",
    class: "Kelas B",
    balance: 125000,
    history: [{ id: 1, date: "2025-08-05", type: "Setoran", amount: 125000 }],
  },
];
