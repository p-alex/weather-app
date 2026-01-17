interface Props {
  title: string;
  value: string | number;
}

function CurrentWeatherCell({ title, value }: Props) {
  return (
    <div className="w-full bg-ui border border-ui-border rounded-ui-container p-5 flex flex-col gap-6">
      <p className="text-lg font-medium text-text-muted leading-[120%]">{title}</p>
      <p className="text-text text-[2rem] font-light leading-[100%]">{value}</p>
    </div>
  );
}

export default CurrentWeatherCell;
