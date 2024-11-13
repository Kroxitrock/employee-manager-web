import { PositionsContext } from "@/contexts/PositionsContext";
import { useGetPositions } from "@/hooks/useGetPositions";

interface Props {
  children: React.ReactNode;
}

export function PositionsProvider({ children }: Props) {
  const { data, isPending, error } = useGetPositions();

  return (
    <PositionsContext.Provider value={{ data, isPending, error }}>
      {children}
    </PositionsContext.Provider>
  );
}
