const statsData = {
    score: {
        label: '점수',
        data: [70, 75, 80, 85, 90],
        borderColor: '#8F5AFF',
        yAxisLabel: '점수'
    },
    solved: {
        label: '맞춘 문제 수',
        data: [30, 32, 35, 37, 40],
        borderColor: '#5F6C75',
        yAxisLabel: '맞춘 문제 수'
    },
    accuracy: {
        label: '정답률 (%)',
        data: [65, 68, 70, 72, 75],
        borderColor: '#CBD0D8',
        yAxisLabel: '정답률 (%)'
    }
};

const ctx = document.getElementById('statsChart').getContext('2d');
let statsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05'],
        datasets: [{
            label: statsData.score.label,
            data: statsData.score.data,
            fill: false,
            borderColor: statsData.score.borderColor,
            tension: 0.1
        }]
    },
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
                    text: statsData.score.yAxisLabel // 초기 Y축 레이블 설정
                }
            }
        }
    }
});

function updateChart(mode) {
    // 그래프 데이터 및 Y축 레이블 업데이트
    statsChart.data.datasets[0].label = statsData[mode].label;
    statsChart.data.datasets[0].data = statsData[mode].data;
    statsChart.data.datasets[0].borderColor = statsData[mode].borderColor;
    statsChart.options.scales.y.title.text = statsData[mode].yAxisLabel;
    statsChart.update();

    // 버튼 활성화 상태 업데이트
    document.querySelectorAll('.graph-tabs button').forEach(button => button.classList.remove('active'));
    document.querySelector(`.graph-tabs button[onclick="updateChart('${mode}')"]`).classList.add('active');
}

// 탭 전환 기능
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tabnav a');
    const tabContents = document.querySelectorAll('.tabcontent > div');

    tabLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // 모든 탭 내용 숨기기
            tabContents.forEach(content => content.style.display = 'none');

            // 모든 탭 링크 비활성화
            tabLinks.forEach(link => link.classList.remove('active'));

            // 클릭한 탭 활성화 및 해당 내용 표시
            link.classList.add('active');
            tabContents[index].style.display = 'block';
        });
    });

    // 페이지 로드 시 첫 번째 탭만 표시되도록 설정
    tabContents.forEach((content, index) => {
        content.style.display = index === 0 ? 'block' : 'none';
    });
});