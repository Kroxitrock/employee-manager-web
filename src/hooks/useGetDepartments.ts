import { fetchDepartments } from "@/api/departmentApi";
import { useQuery } from "@tanstack/react-query";

export function useGetDepartments() {
  return useQuery({ queryKey: ["departments"], queryFn: fetchDepartments });
}
