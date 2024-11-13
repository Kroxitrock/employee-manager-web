export interface EmployeeState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}
