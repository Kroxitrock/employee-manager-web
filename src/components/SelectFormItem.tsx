import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import CustomSelect from "./CustomSelect";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  options?: { value: string; label: string }[];
  exclude?: string;
}

export default function SelectFormItem({
  name,
  label,
  placeholder,
  options,
  exclude,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <CustomSelect
              value={field.value}
              onChange={field.onChange}
              options={options}
              placeholder={placeholder}
              exclude={exclude}
            />
          )}
        />
      </FormControl>
      <FormDescription />
      <FormMessage>{errors[name]?.message as string}</FormMessage>
    </FormItem>
  );
}
