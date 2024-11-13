import { createContext } from "react";
import { Department } from "@/model/department";

interface DepartmentContextProps {
  data: Department[] | undefined;
  isPending: boolean;
  error: Error | null;
}

export const DepartmentsContext = createContext<
  DepartmentContextProps | undefined
>(undefined);
