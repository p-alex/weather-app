import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DropdownMenu({ children, className, ...containerProps }: Props) {
  return (
    <div
      {...containerProps}
      className={twMerge(
        "px-2 py-1.5 bg-neutral-800 rounded-ui-container border border-neutral-600 min-w-53.5 flex flex-col ",
        className
      )}
    >
      {children}
    </div>
  );
}

export default DropdownMenu;
