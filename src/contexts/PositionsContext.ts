import { EmployeePosition } from "@/model/employeePosition";
import { createContext } from "react";

interface Props {
  data: EmployeePosition[] | undefined;
  isPending: boolean;
  error: Error | null;
}

export const PositionsContext = createContext<Props | undefined>(undefined);
