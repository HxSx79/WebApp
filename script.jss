document.getElementById('reportForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const partName = document.getElementById('partName').value;
    const quantity = document.getElementById('quantity').value;
    const date = document.getElementById('date').value;

    await fetch('/api/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partName, quantity, date })
    });

    loadReports();
});

async function loadReports() {
    const response = await fetch('/api/reports');
    const reports = await response.json();
    const labels = reports.map(report => report.date);
    const data = reports.map(report => report.quantity);

    const ctx = document.getElementById('reportChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantity',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

loadReports();
