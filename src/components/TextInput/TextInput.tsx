import { twMerge } from "tailwind-merge";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

function TextInput({ icon, className, ...inputProps }: Props) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-4 rounded-input bg-ui focus-within:outline px-6 font-medium text-xl w-full h-14",
        className
      )}
    >
      {icon && icon}
      <input {...inputProps} className="py-4 outline-none w-full h-full" type="text" />
    </div>
  );
}

export default TextInput;
