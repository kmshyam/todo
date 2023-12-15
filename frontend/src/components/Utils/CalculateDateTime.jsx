export const calculateDateTime = (date) => {
  const dateStr = new Date(`${date}`);
  const optionsDate = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const optionsTime = {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = dateStr.toLocaleString("en-US", optionsDate);
  const formattedTime = dateStr.toLocaleString("en-US", optionsTime);
  return { formattedDate, formattedTime };
};
