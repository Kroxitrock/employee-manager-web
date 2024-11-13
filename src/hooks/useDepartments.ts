import { DepartmentsContext } from "@/contexts/DepartmentsContext";
import { useContext } from "react";

export function useDepartments() {
  const context = useContext(DepartmentsContext);
  if (context === undefined) {
    throw new Error("useDepartments must be used within a DepartmentProvider");
  }
  return context;
}
