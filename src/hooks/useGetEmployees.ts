import { fetchEmployees } from "@/api/employeeApi";
import { EmployeeFilter } from "@/model/employeeFilter";
import { useQuery } from "@tanstack/react-query";

export function useGetEmployees(filter?: EmployeeFilter) {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(filter),
  });
}
