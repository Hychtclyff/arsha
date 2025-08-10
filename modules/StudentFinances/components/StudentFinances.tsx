import { dummyStudents } from "../data";
import { StudentSavingsClientPage } from "./client-page";

// Fungsi ini bisa diganti dengan pengambilan data dari database
async function getStudentData() {
  // Simulasi pengambilan data
  return dummyStudents;
}

export default async function StudentFinances() {
  const students = await getStudentData();

  return <StudentSavingsClientPage initialData={students} />;
}