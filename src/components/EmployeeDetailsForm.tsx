import { forwardRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import SelectFormItem from "./SelectFormItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createEmployee,
  fetchEmployeeById,
  updateEmployee,
} from "@/api/employeeApi";
import { SaveEmployeeDto } from "@/model/saveEmployee";
import { useDepartments } from "@/hooks/useDepartments";
import { useStatuses } from "@/hooks/useStatuses";
import { useSeniorities } from "@/hooks/useSeniorities";
import { usePositions } from "@/hooks/usePositions";
import { useEmployees } from "@/hooks/useEmployees";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  statusId: z.coerce.number().min(1, { message: "Status is required" }),
  positionId: z.coerce.number().min(1, { message: "Position is required" }),
  seniorityId: z.coerce.number().min(1, { message: "Seniority is required" }),
  departmentId: z.coerce.number().optional(),
});

interface Props {
  employeeId?: number;
  submitCallback: (success: boolean) => void;
}

const EmployeeDetailsForm = forwardRef<HTMLFormElement, Props>(
  ({ submitCallback, employeeId }, ref) => {
    const { data: statuses } = useStatuses();
    const { data: positions } = usePositions();
    const { data: seniorities } = useSeniorities();
    const { data: departments } = useDepartments();
    const { refetch } = useEmployees();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        statusId: -1,
        positionId: -1,
        seniorityId: -1,
        departmentId: -1,
      },
    });

    useQuery({
      queryKey: ["employee", employeeId],
      queryFn: () =>
        fetchEmployeeById(employeeId!).then((employeeData) =>
          form.reset({
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            statusId: employeeData.status.id,
            positionId: employeeData.position.id,
            seniorityId: employeeData.seniority.id,
            departmentId: employeeData.department?.id || -1,
          })
        ),
      enabled: employeeId !== null && employeeId !== undefined,
    });

    const mutation = useMutation({
      mutationFn: (employee: SaveEmployeeDto) => {
        if (employeeId) {
          return updateEmployee(employeeId, employee);
        }
        return createEmployee(employee);
      },
      onSuccess: () => {
        refetch();
        submitCallback(true);
      },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
      mutation.mutate(values);
    }

    return (
      <FormProvider {...form}>
        <Form {...form}>
          <form ref={ref} noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SelectFormItem
              name="statusId"
              label="Status"
              placeholder="Select Status"
              options={statuses?.map((status) => ({
                value: status.id.toString(),
                label: status.name,
              }))}
            />

            <SelectFormItem
              name="positionId"
              label="Position"
              placeholder="Select Position"
              options={positions?.map((position) => ({
                value: position.id.toString(),
                label: position.name,
              }))}
            />

            <SelectFormItem
              name="seniorityId"
              label="Seniority"
              placeholder="Select Seniority"
              options={seniorities?.map((seniority) => ({
                value: seniority.id.toString(),
                label: seniority.name,
              }))}
            />

            <SelectFormItem
              name="departmentId"
              label="Department"
              placeholder="Select Department"
              options={departments?.map((department) => ({
                value: department.id.toString(),
                label: department.name,
              }))}
            />
          </form>
        </Form>
      </FormProvider>
    );
  }
);

export default EmployeeDetailsForm;
