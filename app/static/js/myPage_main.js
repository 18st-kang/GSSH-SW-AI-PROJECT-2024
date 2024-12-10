// 그래프 데이터 정의
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

// Chart.js 초기화
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
                    text: statsData.score.yAxisLabel // 초기 Y축 레이블
                }
            }
        }
    }
});

// 그래프 데이터 변경 함수
function updateChart(mode) {
    statsChart.data.datasets[0].label = statsData[mode].label;
    statsChart.data.datasets[0].data = statsData[mode].data;
    statsChart.data.datasets[0].borderColor = statsData[mode].borderColor;
    statsChart.options.scales.y.title.text = statsData[mode].yAxisLabel;
    statsChart.update();

    // 활성화된 버튼 업데이트
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
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.stats-toggle-btn');
    const toggleIcon = toggleButton.querySelector('i'); // 버튼 안의 아이콘 선택
    const statsChart = document.getElementById('statsChart');
    const numericStats = document.querySelector('.stats-numeric');
    const graphTabs = document.querySelector('.graph-tabs'); // 그래프 탭 UI 선택

    // 초기 상태 동기화
    statsChart.style.display = 'block'; // 그래프 모드가 기본값
    numericStats.style.display = 'none';
    graphTabs.style.display = 'flex';
    toggleIcon.className = 'ri-bar-chart-horizontal-line'; // 초기 아이콘 설정

    toggleButton.addEventListener('click', function() {
        if (statsChart.style.display === 'none') {
            // 그래프 모드로 전환
            statsChart.style.display = 'block'; // 그래프 보이기
            numericStats.style.display = 'none'; // 수치 숨기기
            graphTabs.style.display = 'flex'; // 그래프 탭 보이기
            toggleIcon.className = 'ri-bar-chart-horizontal-line'; // 아이콘 변경 (그래프 아이콘)
        } else {
            // 수치 모드로 전환
            statsChart.style.display = 'none'; // 그래프 숨기기
            numericStats.style.display = 'block'; // 수치 보이기
            graphTabs.style.display = 'none'; // 그래프 탭 숨기기
            toggleIcon.className = 'ri-line-chart-line'; // 아이콘 변경 (수치 아이콘)
        }
    });
});
