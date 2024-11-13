import { EmployeesContext } from "@/contexts/EmployeesContext";
import { useGetEmployees } from "@/hooks/useGetEmployees";
import { EmployeeFilter } from "@/model/employeeFilter";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function EmployeesProvider({ children }: Props) {
  const [filter, setFilter] = useState<EmployeeFilter>({ page: 0, size: 1 });
  const { data, isPending, error, refetch } = useGetEmployees(filter);

  return (
    <EmployeesContext.Provider
      value={{ data, isPending, error, filter, setFilter, refetch }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}
