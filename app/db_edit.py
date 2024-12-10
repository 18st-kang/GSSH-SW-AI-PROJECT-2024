from app import db, app
from app.models import Problem

with app.app_context():
    db.create_all()
    content = "어떤 하나의 닫힌 3차원 공간에서 모든 폐곡선이 수축되어서 하나의 점이 될 수 있다면, 이 공간이 반드시 원구로 변형될 수 있다는 것을 증명하시오."
    problem = Problem(title='푸앵카레 추측', content=content, category='밀레니엄 난제', difficulty='고난이도', posted_by=1, likes=0)
    db.session.add(problem)

    content = "경산과학고등학교 첨단기기실은 다양한 기기들이 존재한다. 미지의 물질을 정량 및 정성 분석하는데 유용한 기기들이 많은데, 고성능 액체 크로마토그래피(HPLC), 기체크로마토그래피-질량분석기(GC-MS), 유도결합플라즈마분광분석기(ICP), 핵자기 공명 분광기(NMR), 자외선-가시광선 분광기(UV-Vis), 형광분석기(RF), 퓨리에 변환 적외선 분광기(FT-IR) 등 용도에 따라 무한한 연구를 펼칠 수 있는 기기들이 존재한다. 겻곽이는 미지의 순물질 A를 분석하게 되었다. NMR, FT-IR, MS 분석 결과는 다음과 같을 때, 겻곽이가 분석한 물질 A는 무엇일지 구조를 그리고 분석 과정을 상세히 서술하시오."
    problem = Problem(title='경산과고 화학 문제', content=content, category='화학', difficulty='고난이도', posted_by=1, likes=0)
    db.session.add(problem)

    content = "다음과 같은 4 × 4의 방진을 1부터 4까지의 자연수를 사용하여 채워 넣을 때, 다음의 3가지 조건을 만족하도록 한다. (1) 각 행에는 1,2,3,4가 한 번씩 들어간다.(2) 각 열에는 1,2,3,4가 한 번씩 들어간다.(3) 전체를 굵은 선을 기준으로 4개 구역으로 나눌 때, 각 구역에 1,2,3,4가 한 번씩 들어간다.방진을 채울 수 있는 방법은 총 몇 가지인지 구하시오."
    problem = Problem(title='경산과고 물리 문제', content=content, category='물리', difficulty='고난이도', posted_by=1, likes=0)
    db.session.add(problem)

    db.session.commit()

    print("tprtm")