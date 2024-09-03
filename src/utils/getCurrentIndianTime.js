const getCurrentIndianTime = () => {
    const istTimeUTC = new Date(); // Assuming istTime is already obtained in UTC
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset is UTC+5:30
    const istTime = new Date(istTimeUTC.getTime() + istOffset);

    // Get hours and minutes
    const currentHours = istTime.getUTCHours();
    const currentMinutes = istTime.getUTCMinutes();
    const year = istTime.getFullYear();
    const month = istTime.getMonth() + 1; // Month is zero-based, so add 1
    const day = istTime.getDate();

    // Format hours and minutes with leading zeros if needed
    const formattedHours = currentHours < 10 ? `0${currentHours}` : currentHours;
    const formattedMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    const formatedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;

    // console.log({
    //     currentHours: formattedHours,
    //     currentMinutes: formattedMinutes,
    //     currentTime: istTime,
    //     formatedDate: formatedDate,
    //     timeHHMM: `${formattedHours}:${formattedMinutes}`
    // });

    return {
        currentHours: formattedHours,
        currentMinutes: formattedMinutes,
        currentTime: istTime,
        formatedDate: formatedDate,
        timeHHMM: `${formattedHours}:${formattedMinutes}`
    };
};

module.exports = getCurrentIndianTime;