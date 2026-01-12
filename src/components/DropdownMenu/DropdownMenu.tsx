import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DropdownMenu({ children, className, ...containerProps }: Props) {
  return (
    <div
      {...containerProps}
      className={twMerge(
        "px-2 py-1.5 bg-ui rounded-ui-container border border-ui-border w-full flex flex-col shadow-[0_8px_16px_#02012C52]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default DropdownMenu;
