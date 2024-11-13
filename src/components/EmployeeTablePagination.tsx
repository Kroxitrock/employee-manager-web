import { EmployeeFilter } from "@/model/employeeFilter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface Props {
  first: boolean;
  last: boolean;
  number: number;
  totalPages: number;
  filter: EmployeeFilter;
  setFilter: (value: EmployeeFilter) => void;
  invalidateEmployees: () => void;
}

export default function EmployeeTablePagination({
  first,
  last,
  number,
  totalPages,
  filter,
  setFilter,
  invalidateEmployees,
}: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={first ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        >
          <PaginationPrevious
            onClick={() => {
              if (first) {
                return;
              }
              setFilter({ ...filter, page: filter.page! - 1 });
              invalidateEmployees();
            }}
          />
        </PaginationItem>
        <PaginationItem>
          Page {number + 1}/{totalPages}
        </PaginationItem>
        <PaginationItem
          className={last ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        >
          <PaginationNext
            onClick={() => {
              if (last) {
                return;
              }
              setFilter({ ...filter, page: filter.page! + 1 });
              invalidateEmployees();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
