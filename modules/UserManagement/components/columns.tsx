"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { User } from "../types";

// Props to pass action handlers from the parent page
interface ColumnsActions {
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export const createColumns = ({ onEdit, onDelete }: ColumnsActions): ColumnDef<User>[] => [
    {
        accessorKey: "name",
        header: "Nama Pengguna",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="font-medium">{user.name}</div>
            )
        }
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "role",
        header: "Peran",
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            return <Badge variant={role === 'Admin' ? 'default' : 'secondary'}>{role}</Badge>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onEdit(user)}>Ubah Data</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(user)} className="text-red-600">Hapus Pengguna</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
];