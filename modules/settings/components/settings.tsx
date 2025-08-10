"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "./profile-form";
import { SecurityForm } from "./security-form";
// import { SchoolInfoForm } from "./components/school-info-form"; // Placeholder

// Definisikan tipe untuk navigasi
type NavItem = "Profil" | "Keamanan" | "Info Sekolah";

export default function SettingsPage() {
    // State untuk mengontrol tab mana yang sedang aktif
    const [activeNav, setActiveNav] = useState<NavItem>("Profil");

    const sidebarNavItems = [
        { title: "Profil", id: "Profil" },
        { title: "Keamanan", id: "Keamanan" },
        // { title: "Info Sekolah", id: "Info Sekolah" }, // Hanya untuk admin
    ] as const;

    return (
        <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border bg-gray-50 p-4 md:p-8 dark:border-neutral-700 dark:bg-neutral-950">
            <div className="space-y-0.5">
                <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
                <p className="text-muted-foreground">
                    Kelola pengaturan akun dan informasi sekolah Anda.
                </p>
            </div>
            
            <div className="grid w-full grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-4">
                {/* Sidebar Navigasi */}
                <nav className="flex flex-col space-y-1">
                    {sidebarNavItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={cn(
                                "justify-start text-left",
                                activeNav === item.id && "bg-muted hover:bg-muted"
                            )}
                            onClick={() => setActiveNav(item.id)}
                        >
                            {item.title}
                        </Button>
                    ))}
                </nav>

                {/* Konten Utama */}
                <div className="md:col-span-3">
                    {activeNav === "Profil" && <ProfileForm />}
                    {activeNav === "Keamanan" && <SecurityForm />}
                    {/* {activeNav === "Info Sekolah" && <SchoolInfoForm />} */}
                </div>
            </div>
        </div>
    );
}