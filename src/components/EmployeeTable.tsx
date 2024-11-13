import { Employee } from "@/model/employee";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import UpdateEmployeeStatusDialog from "./UpdateEmployeeStatusDialog";
import EmployeeDetailsDialog from "./EmployeeDetailsDialog";
import DeleteEmployeeDialog from "./DeleteEmployeeDialog";
import EmployeeTablePagination from "./EmployeeTablePagination";
import CustomSelect from "./CustomSelect";
import { Button } from "./ui/button";
import RecommendedPromotionDialog from "./RecommendedPromotionDialog";
import { useStatuses } from "@/hooks/useStatuses";
import { usePositions } from "@/hooks/usePositions";
import { useSeniorities } from "@/hooks/useSeniorities";
import { useEmployees } from "@/hooks/useEmployees";

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "statusName",
    header: "Status",
  },
  {
    accessorKey: "positionName",
    header: "Position",
  },
  {
    accessorKey: "seniorityName",
    header: "Seniority",
  },
  {
    accessorKey: "departmentName",
    header: "Department",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-4">
          <EmployeeDetailsDialog
            employeeId={row.original.id}
          ></EmployeeDetailsDialog>
          <UpdateEmployeeStatusDialog
            employeeId={row.original.id}
            statusName={row.original.statusName}
          ></UpdateEmployeeStatusDialog>
          <RecommendedPromotionDialog
            employeeId={row.original.id}
            employeeName={row.original.fullName}
          ></RecommendedPromotionDialog>
          <DeleteEmployeeDialog
            employeeId={row.original.id}
            employeeName={row.original.fullName}
          ></DeleteEmployeeDialog>
        </div>
      );
    },
  },
];

export default function EmployeeTable() {
  const { data: statuses } = useStatuses();
  const { data: positions } = usePositions();
  const { data: seniorities } = useSeniorities();
  const { data, filter, setFilter, refetch } = useEmployees();

  const { getRowModel, getHeaderGroups } = useReactTable({
    data: data!.content,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function invalidateEmployees() {
    setTimeout(() => refetch());
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-start space-x-4">
        <EmployeeDetailsDialog></EmployeeDetailsDialog>
        <Button
          onClick={() => {
            setFilter({
              ...filter,
              statusId: undefined,
              positionId: undefined,
              seniorityId: undefined,
            });
            invalidateEmployees();
          }}
        >
          Clear Filters
        </Button>
        <CustomSelect
          value={filter.statusId?.toString()}
          onChange={(newId) => {
            setFilter({ ...filter, statusId: parseInt(newId) });
            invalidateEmployees();
          }}
          options={statuses?.map((status) => {
            return { value: status.id.toString(), label: status.name };
          })}
          placeholder="Filter by status"
        ></CustomSelect>
        <CustomSelect
          value={filter.positionId?.toString()}
          onChange={(newId) => {
            setFilter({ ...filter, positionId: parseInt(newId) });
            invalidateEmployees();
          }}
          options={positions?.map((position) => {
            return {
              value: position.id.toString(),
              label: position.name,
            };
          })}
          placeholder="Filter by position"
        ></CustomSelect>
        <CustomSelect
          value={filter.seniorityId?.toString()}
          onChange={(newId) => {
            setFilter({ ...filter, seniorityId: parseInt(newId) });
            invalidateEmployees();
          }}
          options={seniorities?.map((seniority) => {
            return {
              value: seniority.id.toString(),
              label: seniority.name,
            };
          })}
          placeholder="Filter by seniority"
        ></CustomSelect>
      </div>

      <Table>
        <TableHeader>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="font-bold border-b border-b-2 border-b-gray-500"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {data!.empty ? (
            <TableRow>
              <TableCell colSpan={columns.length}>No employees!</TableCell>
            </TableRow>
          ) : (
            getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="flex-shrink-0 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableCell colSpan={columns.length}>
            <EmployeeTablePagination
              first={data!.first}
              last={data!.last}
              number={data!.number}
              totalPages={data!.totalPages}
              filter={filter}
              setFilter={setFilter}
              invalidateEmployees={invalidateEmployees}
            />
          </TableCell>
        </TableFooter>
      </Table>
    </div>
  );
}
