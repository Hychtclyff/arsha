"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { User, userSchema } from "../types";
import { dummyUsers } from "../data";
import { createColumns } from "./columns";
import { UserForm } from "./user-form";
import { z } from "zod";
import { toast } from "sonner";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Handlers
  const handleOpenForm = (user: User | null) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleOpenAlert = (user: User) => {
    setSelectedUser(user);
    setIsAlertOpen(true);
  };

  const handleFormSubmit = (data: z.infer<typeof userSchema>) => {
    // Logic for Add vs Edit
    if (selectedUser) {
      // Editing
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, ...data, password: u.password } : u
        )
      );
      toast("Berhasil ✅", {
        description: "Data pengguna telah diperbarui.",
      });
    } else {
      // Adding
      const newUser: User = { id: Math.random(), ...data };
      setUsers([...users, newUser]);
      toast("Berhasil ✅", {
        description: "Pengguna baru telah ditambahkan.",
      });
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    toast("Terhapus 🗑️", { description: "Pengguna telah dihapus." });
    setIsAlertOpen(false);
    setSelectedUser(null);
  };

  const columns = useMemo(
    () =>
      createColumns({
        onEdit: (user) => handleOpenForm(user),
        onDelete: (user) => handleOpenAlert(user),
      }),
    [users]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border bg-white p-4 md:p-8 dark:border-neutral-700 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
          <p className="text-sm text-muted-foreground">
            Kelola akun admin dan guru di sini.
          </p>
        </div>
        <Button onClick={() => handleOpenForm(null)}>Tambah Pengguna</Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleFormSubmit}
        defaultValues={
          selectedUser
            ? {
                name: selectedUser.name,
                username: selectedUser.username,
                role: selectedUser.role,
                password: "",
              }
            : undefined
        }
      />
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda Yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini tidak dapat dibatalkan. Ini akan menghapus pengguna
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
