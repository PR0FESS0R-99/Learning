const momentTimeZone = require('moment-timezone');

function TimeStamp() {
    try {
        const timestamp = momentTimeZone(new Date()).tz(process.env.TIME_ZONE).format();

        const stamp = {
            date: timestamp.split('T')[0],
            time: timestamp.split('T')[1].split('+')[0],
            day: new Date(timestamp.split('T')[0]).toLocaleString('en-US', { weekday: 'long' }),
            zone: process.env.TIME_ZONE,
        };
        return stamp;
    } catch (error) {
        return { error: "Invalid TimeZone" }
    }
}

module.exports = TimeStamp;