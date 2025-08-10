"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Skema validasi untuk form login
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username tidak boleh kosong." }),
  password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Komponen logo sederhana untuk ditampilkan di halaman login
const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="h-8 w-8 shrink-0 rounded-md bg-green-500" />
    <span className="text-2xl font-bold text-black dark:text-white">ARSHA</span>
  </div>
);

export default function AuthPage() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  // Fungsi yang akan dijalankan saat form disubmit
  function onSubmit(data: LoginFormValues) {
    // --- TODO: Ganti dengan logika autentikasi API sesungguhnya ---
    console.log("Login data:", data);

    // Simulasi login berhasil
    if (data.username === "admin" && data.password === "password") {
      toast("Login Berhasil! 🎉", {
        description:
          "Selamat datang kembali. Anda akan diarahkan ke dashboard.",
      });
      // Arahkan ke dashboard setelah 2 detik
      setTimeout(() => {
        router.push("/dashboard"); // Ganti dengan path dashboard Anda
      }, 2000);
    } else {
      toast("Login Gagal!", {
        description: "Username atau password salah. Silakan coba lagi.",
      });
    }
  }

  return (
    <div className="grid h-screen w-full lg:grid-cols-1 lg:grid-rows-1">
      {/* Panel Kiri: Form Login */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <Logo />
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Selamat Datang Kembali</CardTitle>
              <CardDescription>
                Silakan masukkan username dan password Anda untuk masuk ke
                sistem.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan username Anda"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Masukkan password Anda"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="text-center text-sm">
            <a href="#" className="underline">
              Lupa password?
            </a>
          </div>
        </div>
      </div>

      {/* Panel Kanan: Gambar Visual (disembunyikan di mobile) */}
      <div className="hidden bg-muted lg:block"></div>
    </div>
  );
}
