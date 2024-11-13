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
import UpdateEmployeeStatusForm from "./UpdateEmployeeStatusForm";

interface Props {
  employeeId: number;
  statusName: string;
}

export default function UpdateEmployeeStatusDialog({
  employeeId,
  statusName,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onSubmitResolved = (success: boolean) => {
    if (success) {
      setOpen(false);
    }

    toast({
      description: success
        ? "Sucessfully updated the status!"
        : "Failed to update status, please try again.",
      duration: 2000,
      style: {
        color: success ? "green" : "red",
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Update Status</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Employee Status</DialogTitle>
        </DialogHeader>
        <UpdateEmployeeStatusForm
          employeeId={employeeId}
          statusName={statusName}
          submitCallback={onSubmitResolved}
          ref={formRef}
        ></UpdateEmployeeStatusForm>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
