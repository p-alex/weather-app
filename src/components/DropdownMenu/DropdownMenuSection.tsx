interface Props {
  title: string;
  children: React.ReactNode;
}

function DropdownMenuSection({ title, children }: Props) {
  return (
    <div className="last-of-type:border-0 border-b border-b-neutral-600 flex flex-col gap-2 pb-1 mb-1 last-of-type:mb-0">
      <p className="pt-1.5 px-2 text-sm font-medium text-text-muted">{title}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

export default DropdownMenuSection;
