import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  placeholder: string;
  exclude?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  exclude,
}: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => {
          if (exclude && exclude === option.label) {
            return null;
          }
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
