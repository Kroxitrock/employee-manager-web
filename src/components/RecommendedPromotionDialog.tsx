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
import { fetchEmployeeRecommendedPromotion } from "@/api/employeeApi";
import CustomSelect from "./CustomSelect";

interface Props {
  employeeId: number;
  employeeName: string;
}

export default function RecommendedPromotionDialog({
  employeeId,
  employeeName,
}: Props) {
  const [recommendedPromotion, setRecommendedPromotion] = useState<number>();
  const [performance, setPerformance] = useState<number>();
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: (performance: number) =>
      fetchEmployeeRecommendedPromotion({ employeeId, performance }),
    onSuccess: (result) => {
      setRecommendedPromotion(result);
    },
    onError: () =>
      toast({
        description:
          "Calculating recommended employee promotion failed! Please try again.",
        duration: 2000,
        style: { color: "red" },
      }),
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Promotion</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Calculate recommended promotion for {employeeName}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Select a performance rating between 1 and 5 and the you will receive
          the recommended promotion.
        </DialogDescription>

        <CustomSelect
          value={performance?.toString()}
          options={Array.from({ length: 5 }, (_x, i) => {
            const value = (i + 1).toString();
            return { value, label: value };
          })}
          onChange={(newPerformance) => {
            const performanceInt = parseInt(newPerformance);
            setPerformance(performanceInt);
            mutate(performanceInt);
          }}
          placeholder="Performance"
        ></CustomSelect>

        {recommendedPromotion && (
          <DialogFooter className="sm:justify-center">
            Recommended promotion: {recommendedPromotion}%
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
