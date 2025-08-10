"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconCash,
  IconChartBar,
  IconCoin,
  IconHome,
  IconReceipt2,
  IconSettings,
  IconUsersGroup,
  IconWallet,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils"; // Pastikan path import ini benar
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Image from "next/image";
import { LogoArsha, LogoIconSarah } from "./logo";

export const SidebarComponent = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Transaksi",
      href: "/transaksi",
      icon: (
        <IconReceipt2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Sumber Dana",
      href: "/sumber-dana",
      icon: (
        <IconWallet className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Tabungan Siswa",
      href: "/tabungan-siswa",
      icon: (
        <IconCoin className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Laporan",
      href: "/laporan",
      icon: (
        <IconChartBar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Manajemen Pengguna",
      href: "/pengguna",
      icon: (
        <IconUsersGroup className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Pengaturan",
      href: "/pengaturan",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {/* LANGKAH 2: MENGGANTI LOGO */}
          {open ? <LogoArsha /> : <LogoIconSarah />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          {/* Bagian ini nantinya akan dinamis sesuai user yang login */}
          <SidebarLink
            link={{
              label: "Nama Pengguna", // Contoh: "Admin Bendahara"
              href: "/profil",
              icon: (
                <Image
                  src="/avatar-placeholder.png" // Ganti dengan path avatar default
                  className="h-7 w-7 shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
          <SidebarLink
            link={{
              label: "Logout",
              href: "/logout",
              icon: (
                <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};
