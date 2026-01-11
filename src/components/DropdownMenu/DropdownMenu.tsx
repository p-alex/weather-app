import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DropdownMenu({ children, className, ...containerProps }: Props) {
  return (
    <div
      {...containerProps}
      className={twMerge(
        "px-2 py-1.5 bg-ui rounded-ui-container border border-ui-border w-full flex flex-col",
        className
      )}
    >
      {children}
    </div>
  );
}

export default DropdownMenu;
