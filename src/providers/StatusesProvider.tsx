import { StatusesContext } from "@/contexts/StatusesContext";
import { useGetStatuses } from "@/hooks/useGetStatuses";

interface Props {
  children: React.ReactNode;
}

export function StatusesProvider({ children }: Props) {
  const { data, isPending, error } = useGetStatuses();

  return (
    <StatusesContext.Provider value={{ data, isPending, error }}>
      {children}
    </StatusesContext.Provider>
  );
}
