import { fetchEmployeeSeniorities } from "@/api/employeeApi";
import { useQuery } from "@tanstack/react-query";

export function useGetSeniorities() {
  return useQuery({
    queryKey: ["seniorities"],
    queryFn: fetchEmployeeSeniorities,
  });
}
