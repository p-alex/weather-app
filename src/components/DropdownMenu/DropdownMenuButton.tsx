interface Props extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children: string;
  isSelected?: boolean;
}

function DropdownMenuButton({ children, isSelected, ...btnProps }: Props) {
  return (
    <button
      {...btnProps}
      className={`flex items-center justify-between w-full hover:cursor-pointer text-text py-2.5 px-2 rounded-input hover:bg-ui-hover font-medium transition-colors ${
        isSelected ? "bg-neutral-700" : ""
      }`}
    >
      {children}
      {isSelected && <img src="images/icon-checkmark.svg" width={14} height={11} />}
    </button>
  );
}

export default DropdownMenuButton;
