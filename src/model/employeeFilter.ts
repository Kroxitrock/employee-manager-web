import { PageRequest } from "./pageRequest";

export interface EmployeeFilter extends PageRequest {
  seniorityId?: number;
  statusId?: number;
  positionId?: number;
}
