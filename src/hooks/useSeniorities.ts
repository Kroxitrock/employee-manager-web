import { SenioritiesContext } from "@/contexts/SenioritiesContext";
import { useContext } from "react";

export function useSeniorities() {
  const context = useContext(SenioritiesContext);
  if (context === undefined) {
    throw new Error("useSeniorities must be used within a SenioritiesProvider");
  }
  return context;
}
