const utcDate = new Date();  // Fetched from DB in UTC

console.log("utcDate", utcDate);

// Using Intl.DateTimeFormat to format for a specific time zone
const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
    year: "numeric"
});

console.log(formatter.format(utcDate));  // Display the date in New York time zone
