interface Props {
  title: string;
  value: string | number;
}

function CurrentWeatherCell({ title, value }: Props) {
  return (
    <div className="w-full bg-ui border border-ui-border rounded-ui-container p-5 flex flex-col gap-6">
      <p className="font-lg font-medium text-text-muted">{title}</p>
      <p className="text-text text-[2rem] font-light">{value}</p>
    </div>
  );
}

export default CurrentWeatherCell;
