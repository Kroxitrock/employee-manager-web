import { EmployeeStatus } from "@/model/employeeStatus";
import { createContext } from "react";

interface Props {
  data: EmployeeStatus[] | undefined;
  isPending: boolean;
  error: Error | null;
}

export const StatusesContext = createContext<Props | undefined>(undefined);
