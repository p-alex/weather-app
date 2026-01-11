export const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function extractDataFromDate(date: string | Date) {
  const currentDate = typeof date === "string" ? new Date(date) : date;

  return {
    meridiem: {
      get: () => {
        const hours = currentDate.getHours();
        return hours >= 12 ? "PM" : "AM";
      },
    },
    hour: {
      getHour: ({ type }: { type: "12Hr" | "24Hr" }) => {
        const hours = currentDate.getHours();

        if (type === "24Hr") return hours;

        if (hours === 0) return 12;
        if (hours > 12) return hours - 12;
        return hours;
      },
    },
    day: {
      fullText: daysOfTheWeek[currentDate.getDay()],
      partialText: daysOfTheWeek[currentDate.getDay()].slice(0, 3),
      getDay: ({ leadingZero }: { leadingZero: boolean }) => {
        if (leadingZero) return addLeadingZero(currentDate.getDate());
        return addLeadingZero(currentDate.getDate());
      },
    },
    month: {
      fullText: months[currentDate.getMonth()],
      partialText: months[currentDate.getMonth()].slice(0, 3),
      getMonth: ({ leadingZero }: { leadingZero: boolean }) => {
        if (leadingZero) return addLeadingZero(currentDate.getMonth() + 1);
        return currentDate.getMonth() + 1;
      },
    },
    year: {
      getYear: () => {
        return currentDate.getFullYear();
      },
    },
  };
}

function addLeadingZero(value: number) {
  return "0" + value;
}

export default extractDataFromDate;
