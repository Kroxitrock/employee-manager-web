import { fetchEmployeeStatuses } from "@/api/employeeApi";
import { useQuery } from "@tanstack/react-query";

export function useGetStatuses() {
  return useQuery({ queryKey: ["statuses"], queryFn: fetchEmployeeStatuses });
}
