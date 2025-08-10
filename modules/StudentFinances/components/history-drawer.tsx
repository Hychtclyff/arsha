import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Student } from "../types";

type HistoryDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    student: Student | null;
}
const formatCurrency = (amount: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

export const HistoryDrawer = ({ isOpen, onClose, student }: HistoryDrawerProps) => {
    if (!student) return null;

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Riwayat Tabungan: {student.name}</DrawerTitle>
                    <DrawerDescription>Total Saldo: {formatCurrency(student.balance)}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                    {/* Di sini kita bisa render tabel riwayat transaksi */}
                    <ul className="space-y-2">
                        {student.history.map(trx => (
                            <li key={trx.id} className="flex justify-between border-b pb-1">
                                <div>
                                    <p className="font-medium">{trx.type}</p>
                                    <p className="text-xs text-muted-foreground">{trx.date}</p>
                                </div>
                                <p className={`font-semibold ${trx.type === 'Setoran' ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(trx.amount)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <DrawerFooter>
                    <Button variant="outline" onClick={onClose}>Tutup</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}