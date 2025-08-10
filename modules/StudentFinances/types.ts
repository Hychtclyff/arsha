export type SavingsTransaction = {
  id: number;
  date: string;
  type: "Setoran" | "Penarikan";
  amount: number;
};

export type Student = {
  id: number;
  nis: string;
  name: string;
  class: string;
  balance: number;
  history: SavingsTransaction[];
};
