import { Employee } from "@/model/employee";
import { EmployeeDetails } from "@/model/employeeDetails";
import { EmployeeFilter } from "@/model/employeeFilter";
import { EmployeePosition } from "@/model/employeePosition";
import { EmployeeSenioirity } from "@/model/employeeSeniority";
import { EmployeeStatus } from "@/model/employeeStatus";
import { Page } from "@/model/page";
import { PromotionRequest } from "@/model/promotion";
import { SaveEmployeeDto } from "@/model/saveEmployee";
import { StatusChangeRequest } from "@/model/statusChangeRequest";
import axios from "axios";

const host = "http://localhost:8080";
const path = "/employees";

export function fetchEmployees(
  filter?: EmployeeFilter
): Promise<Page<Employee>> {
  return axios
    .get(host + path, { params: { ...filter } })
    .then((response) => response.data as Page<Employee>);
}

export function fetchEmployeeById(id: number): Promise<EmployeeDetails> {
  return axios
    .get(`${host}${path}/${id}`)
    .then((response) => response.data as EmployeeDetails);
}

export function fetchEmployeeStatuses(): Promise<EmployeeStatus[]> {
  return axios
    .get(`${host}${path}/statuses`)
    .then((response) => response.data as EmployeeStatus[]);
}

export function fetchEmployeeSeniorities(): Promise<EmployeeSenioirity[]> {
  return axios
    .get(`${host}${path}/seniorities`)
    .then((response) => response.data as EmployeeSenioirity[]);
}

export function fetchEmployeePositions(): Promise<EmployeePosition[]> {
  return axios
    .get(`${host}${path}/positions`)
    .then((response) => response.data as EmployeePosition[]);
}

export function fetchEmployeeRecommendedPromotion(
  promotionRequest: PromotionRequest
): Promise<number> {
  return axios
    .get(`${host}${path}/${promotionRequest.employeeId}/promotion`, {
      params: { performance: promotionRequest.performance },
    })
    .then((response) => response.data as number);
}

export function createEmployee(employee: SaveEmployeeDto) {
  return axios.post(host + path, employee);
}

export function updateEmployee(employeeId: number, employee: SaveEmployeeDto) {
  return axios.put(`${host}${path}/${employeeId}`, employee);
}

export function updateEmployeeStatus(
  employeeId: number,
  statusChangeRequest: StatusChangeRequest
) {
  return axios.patch(
    `${host}${path}/${employeeId}/status`,
    statusChangeRequest
  );
}

export function deleteEmployee(id: number) {
  return axios.delete(`${host}${path}/${id}`);
}
