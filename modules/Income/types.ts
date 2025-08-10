import { z } from "zod";

// Skema validasi untuk form
export const fundSourceSchema = z.object({
  name: z.string().min(3, { message: "Nama minimal 3 karakter." }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

// Tipe data untuk objek Sumber Dana, termasuk ID
export type FundSource = z.infer<typeof fundSourceSchema> & {
  id: number;
};