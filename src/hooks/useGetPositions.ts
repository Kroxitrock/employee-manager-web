import { fetchEmployeePositions } from "@/api/employeeApi";
import { useQuery } from "@tanstack/react-query";

export function useGetPositions() {
  return useQuery({ queryKey: ["positions"], queryFn: fetchEmployeePositions });
}
