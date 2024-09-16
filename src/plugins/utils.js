export function convertToLocalTime(time) {
  // Define the UTC date string
  const utcDateString = time;

  // Create a Date object from the UTC date string
  const date = new Date(utcDateString);

  // Extract hours, minutes, day, month, and year
  const hours = String(date.getHours()).padStart(2, "0"); // Format to 2 digits
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Format to 2 digits
  const day = String(date.getDate()).padStart(2, "0"); // Format to 2 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  // Format the date into the desired string format
  const formattedDate = `${hours}:${minutes}, ${day}-${month}-${year}`;

  // Output the formatted date
  return formattedDate;
}
