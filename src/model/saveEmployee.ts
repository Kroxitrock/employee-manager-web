export interface SaveEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  statusId: number;
  positionId: number;
  seniorityId: number;
  departmentId?: number;
}
