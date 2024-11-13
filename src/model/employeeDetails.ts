import { Department } from "./department";
import { EmployeePosition } from "./employeePosition";
import { EmployeeSenioirity } from "./employeeSeniority";
import { EmployeeStatus } from "./employeeStatus";

export interface EmployeeDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: EmployeeStatus;
  position: EmployeePosition;
  seniority: EmployeeSenioirity;
  department?: Department;
}
