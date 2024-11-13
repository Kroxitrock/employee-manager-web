import { EmployeeSenioirity } from "@/model/employeeSeniority";
import { createContext } from "react";

interface Props {
  data: EmployeeSenioirity[] | undefined;
  isPending: boolean;
  error: Error | null;
}

export const SenioritiesContext = createContext<Props | undefined>(undefined);
