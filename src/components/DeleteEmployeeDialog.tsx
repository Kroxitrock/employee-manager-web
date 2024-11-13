import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteEmployee } from "@/api/employeeApi";
import { useEmployees } from "@/hooks/useEmployees";

interface Props {
  employeeId: number;
  employeeName: string;
}

export default function DeleteEmployeeDialog({
  employeeId,
  employeeName,
}: Props) {
  const [open, setOpen] = useState(false);
  const { refetch } = useEmployees();

  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      refetch();
      setOpen(false);
      toast({
        description: "Successfully deleted employee!",
        duration: 2000,
        style: { color: "green" },
      });
    },
    onError: () =>
      toast({
        description: "Deleting employee failed! Please try again.",
        duration: 2000,
        style: { color: "red" },
      }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Delete {employeeName} </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          By clicking on "Continue" you will permanently delete employee{" "}
          {employeeName}!
        </DialogDescription>
        <DialogFooter className="sm:justify-center">
          <Button onClick={() => mutate(employeeId)}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
