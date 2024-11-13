import { EmployeesContext } from "@/contexts/EmployeesContext";
import { useContext } from "react";

export function useEmployees() {
  const context = useContext(EmployeesContext);
  if (context === undefined) {
    throw new Error("useEmployees must be used within a EmployeesProvider");
  }
  return context;
}
