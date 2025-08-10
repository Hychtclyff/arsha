import { z } from "zod";

// Validation schema for the user form
export const userSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter."),
  username: z.string().min(4, "Username minimal 4 karakter."),
  role: z.enum(["Admin", "Guru"], { required_error: "Peran harus dipilih." }),
  // Password is optional when editing, but required when creating
  password: z.string().min(6, "Password minimal 6 karakter.").optional().or(z.literal('')),
});

// The main User type, extending the schema with an ID
export type User = z.infer<typeof userSchema> & {
  id: number;
};