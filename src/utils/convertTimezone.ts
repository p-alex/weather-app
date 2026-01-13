function convertTimezone({
  date,
  fromTimezone,
  toTimezone,
}: {
  date: Date;
  fromTimezone: string;
  toTimezone: string;
}) {
  const fromDateString = date.toLocaleString("en-US", {
    timeZone: fromTimezone,
  });

  const fromDate = new Date(fromDateString);

  const toDateString = fromDate.toLocaleString("en-US", {
    timeZone: toTimezone,
  });

  return new Date(toDateString);
}

export default convertTimezone;
