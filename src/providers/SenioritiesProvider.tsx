import { SenioritiesContext } from "@/contexts/SenioritiesContext";
import { useGetSeniorities } from "@/hooks/useGetSeniorities";

interface Props {
  children: React.ReactNode;
}

export function SenioritiesProvider({ children }: Props) {
  const { data, isPending, error } = useGetSeniorities();

  return (
    <SenioritiesContext.Provider value={{ data, isPending, error }}>
      {children}
    </SenioritiesContext.Provider>
  );
}
