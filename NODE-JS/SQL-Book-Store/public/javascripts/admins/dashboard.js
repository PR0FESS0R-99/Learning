$(document).ready(function () {
    $('#example').DataTable({
        "lengthChange": false, // Hide entries option
        "searching": false, // Hide search box
        "paging": true // Show pagination
    });
});

// Sample data for the chart
const labels = chartLabels;
const data = {
    labels: labels,
    datasets: [{
        label: 'Order Total',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: chartData
    }]
};

// Configuration for the chart
const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

// Create the chart
var myChart = new Chart(
    document.getElementById('myChart'),
    config
);
