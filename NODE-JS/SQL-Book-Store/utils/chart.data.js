
const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function aggregateDataByMonth(data) {
    const monthlyTotals = {};

    allMonths.forEach(month => {
        monthlyTotals[month] = 0;
    });

    data.forEach(item => {
        const date = new Date(item.date);
        const month = date.toLocaleString('default', { month: 'short' });

        if (monthlyTotals[month] !== undefined) {
            monthlyTotals[month] += parseFloat(item.total);
        }
    });

    return monthlyTotals;
}

module.exports = (data) => {
    const monthlyData = aggregateDataByMonth(data);

    return {
        labels: allMonths,
        datas: allMonths.map(month => monthlyData[month])
    };
}