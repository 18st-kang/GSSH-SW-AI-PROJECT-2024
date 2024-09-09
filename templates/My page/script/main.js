const statsData = {
    labels: ['2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05'],
    datasets: [{
        label: '점수',
        data: [70, 75, 80, 85, 90],
        fill: false,
        borderColor: '#8F5AFF',
        tension: 0.1
    },
    {
        label: '맞춘 문제 수',
        data: [30, 32, 35, 37, 40],
        fill: false,
        borderColor: '#5F6C75',
        tension: 0.1
    },
    {
        label: '정답률 (%)',
        data: [65, 68, 70, 72, 75],
        fill: false,
        borderColor: '#CBD0D8',
        tension: 0.1
    }]
};

const ctx = document.getElementById('statsChart').getContext('2d');
let statsChart = new Chart(ctx, {
    type: 'line',
    data: statsData,
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '날짜'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '통계 수치'
                }
            }
        }
    }
});

function toggleStatsView() {
    const numericStats = document.querySelectorAll('.stats-numeric');
    const chart = document.getElementById('statsChart');
    
    if (numericStats[0].style.display === 'none') {
        numericStats.forEach(stat => stat.style.display = 'block');
        chart.style.display = 'none';
    } else {
        numericStats.forEach(stat => stat.style.display = 'none');
        chart.style.display = 'block';
        statsChart.update();
    }
}

$(function() {
    $('.tabcontent > div').hide();
    $('.tabnav a').click(function () {
        $('.tabcontent > div').hide().filter(this.hash).fadeIn();
        $('.tabnav a').removeClass('active');
        $(this).addClass('active');
        return false;
    }).filter(':eq(0)').click();
});
