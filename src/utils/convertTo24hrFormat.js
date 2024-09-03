// Function to convert 12-hour time format to 24-hour time format
function convertTo24Hour(time12Hour) {
    // Parse the time string
    const [ time,
        period ] = time12Hour.split(" ");

    // Split time into hours, minutes, and optionally seconds
    const [ hours,
        minutes,
        seconds ] = time.split(":").map(Number);

    // Convert hours to 24-hour format
    let hours24 = hours;

    if (period === "PM" && hours !== 12) 
        hours24 += 12; // Convert PM hours
    else if (period === "AM" && hours === 12) 
        hours24 = 0; // Handle midnight (12 AM)

    // Format hours, minutes, and seconds to ensure two digits
    const formattedHours = hours24.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = (seconds || 0).toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
module.exports = convertTo24Hour;
