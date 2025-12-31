interface Props {
  message: string;
}

function DropdownMenuLoadingMessage({ message }: Props) {
  return (
    <div className="py-2.5 px-2 flex gap-2.5 items-center">
      <img
        src="/images/icon-loading.svg"
        className="animate-spin"
        width={16}
        height={16}
        alt=""
      />
      <p className="font-medium text-text">{message}</p>
    </div>
  );
}

export default DropdownMenuLoadingMessage;
