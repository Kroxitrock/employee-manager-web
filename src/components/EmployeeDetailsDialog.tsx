import { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import EmployeeDetailsForm from "./EmployeeDetailsForm";

interface Props {
  employeeId?: number;
}

function getToastMessage(success: boolean, employeeId?: number): string {
  if (employeeId) {
    return success
      ? "Successfully updated your employee!"
      : "Error updating employee. Please try again.";
  }

  return success
    ? "Successfully created a new employee!"
    : "Error creating a new employee. Please try again.";
}

export default function EmployeeDetailsDialog({ employeeId }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onSubmitResolved = (success: boolean) => {
    if (success) {
      setOpen(false);
    }

    toast({
      description: getToastMessage(success, employeeId),
      duration: 2000,
      style: {
        color: success ? "green" : "red",
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{employeeId ? "Details" : "Create"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {employeeId ? "Employee Details" : "Create a New Employee"}
          </DialogTitle>
        </DialogHeader>

        <EmployeeDetailsForm
          employeeId={employeeId}
          submitCallback={onSubmitResolved}
          ref={formRef}
        ></EmployeeDetailsForm>

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
          >
            {employeeId ? "Edit" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
