import { updateEmployeeStatus } from "@/api/employeeApi";
import { useMutation } from "@tanstack/react-query";
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
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { forwardRef } from "react";
import { StatusChangeRequest } from "@/model/statusChangeRequest";
import SelectFormItem from "./SelectFormItem";
import { useStatuses } from "@/hooks/useStatuses";
import { useEmployees } from "@/hooks/useEmployees";

const formSchema = z.object({
  newStatusId: z.coerce
    .number()
    .gte(1, { message: "A new status is requred!" }),
  reason: z.string().max(250).optional(),
});

interface Props {
  employeeId: number;
  statusName: string;
  submitCallback: (success: boolean) => void;
}

const UpdateEmployeeStatusForm = forwardRef<HTMLFormElement, Props>(
  ({ statusName, employeeId, submitCallback }: Props, ref) => {
    const { data: statuses } = useStatuses();
    const { refetch } = useEmployees();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        newStatusId: -1,
        reason: "",
      },
    });

    const { mutate } = useMutation({
      mutationFn: (changeRequest: StatusChangeRequest) =>
        updateEmployeeStatus(employeeId, changeRequest),
      onSuccess: () => {
        refetch();
        submitCallback(true);
      },
      onError: () => submitCallback(false),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
      mutate(values);
    }

    return (
      <Form {...form}>
        <form ref={ref} noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <SelectFormItem
            name="newStatusId"
            label="Status"
            placeholder="Select Status"
            options={statuses?.map((status) => ({
              value: status.id.toString(),
              label: status.name,
            }))}
            exclude={statusName}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }
);

export default UpdateEmployeeStatusForm;
