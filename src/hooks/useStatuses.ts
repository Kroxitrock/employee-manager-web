import { StatusesContext } from "@/contexts/StatusesContext";
import { useContext } from "react";

export function useStatuses() {
  const context = useContext(StatusesContext);
  if (context === undefined) {
    throw new Error("useStatuses must be used within a StatusesProvider");
  }
  return context;
}
