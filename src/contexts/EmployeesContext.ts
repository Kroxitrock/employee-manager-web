import { Employee } from "@/model/employee";
import { EmployeeFilter } from "@/model/employeeFilter";
import { Page } from "@/model/page";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { createContext } from "react";

interface Props {
  data: Page<Employee> | undefined;
  isPending: boolean;
  error: Error | null;
  filter: EmployeeFilter;
  setFilter: (filter: EmployeeFilter) => void;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
}

export const EmployeesContext = createContext<Props | undefined>(undefined);
