import EmployeeTable from "./EmployeeTable";
import { useEmployees } from "@/hooks/useEmployees";

export default function Home() {
  const { isPending, error } = useEmployees();

  if (isPending) {
    return "Loading...";
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="max-w-screen-lg mx-auto flex justify-center flex-wrap">
      <EmployeeTable></EmployeeTable>
    </div>
  );
}
