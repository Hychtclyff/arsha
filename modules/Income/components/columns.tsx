"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { FundSource } from "../types"

// File ini mendefinisikan bagaimana setiap kolom akan ditampilkan
export const columns: ColumnDef<FundSource>[] = [
  {
    accessorKey: "name",
    header: "Nama Sumber Dana",
    cell: ({ row }) => {
        const fund = row.original
        return (
            <div className="font-medium">
                {fund.name}
                <div className="text-xs text-muted-foreground line-clamp-1">{fund.description}</div>
            </div>
        )
    }
  },
  {
    accessorKey: "isActive",
    header: "Status Aktif",
    cell: ({ row }) => {
        const fund = row.original
        return <Switch checked={fund.isActive} disabled />
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const fund = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(fund.id.toString())}
            >
              Ubah Data
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-600 focus:bg-red-50">Hapus Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]