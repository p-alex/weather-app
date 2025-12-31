import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

function PrimaryButton({ children, className, ...buttonProps }: Props) {
  return (
    <button
      className={twMerge(
        "py-4 px-6 bg-secondary hover:bg-secondary-dark text-xl font-medium rounded-input cursor-pointer transition-colors h-14 disabled:cursor-not-allowed",
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
