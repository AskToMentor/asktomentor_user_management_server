const convertTo12HourFormat = (time) => {
    // Split the time into hours and minutes
    const splitTime = time.split(":");
    let hours = parseInt(splitTime[0]);
    let minutes = parseInt(splitTime[1]);

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' should be converted to '12'

    // Pad single digit hours and minutes with leading zeros
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the 12-hour time format string
    const twelveHourFormat = hours + ":" + minutes + " " + period;

    return twelveHourFormat;
};

module.exports = convertTo12HourFormat;
// Example usage
// const time24hr = "23:01";
// const time12hr = convertTo12HourFormat(time24hr);

// console.log(time12hr); // Output: 02:30 PM
