import { PositionsContext } from "@/contexts/PositionsContext";
import { useContext } from "react";

export function usePositions() {
  const context = useContext(PositionsContext);
  if (context === undefined) {
    throw new Error("usePositions must be used within a PositionsProvider");
  }
  return context;
}
