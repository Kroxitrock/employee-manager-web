import { DepartmentsContext } from "@/contexts/DepartmentsContext";
import { useGetDepartments } from "@/hooks/useGetDepartments";

interface Props {
  children: React.ReactNode;
}

export function DepartmentsProvider({ children }: Props) {
  const { data, isPending, error } = useGetDepartments();

  return (
    <DepartmentsContext.Provider value={{ data, isPending, error }}>
      {children}
    </DepartmentsContext.Provider>
  );
}
