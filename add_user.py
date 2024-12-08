from app import db, User, Progress, app
from datetime import datetime, timezone

# 1번 사용자 및 진행 데이터 추가 함수
def add_test_user():
    db.create_all()
    # 기존 사용자 확인
    existing_user = User.query.get(1)
    if existing_user:
        print("1번 사용자가 이미 존재합니다.")
        return

    # 1번 사용자 데이터 생성
    user = User(
        id=1,
        username="test_user",
        email="test_user@example.com",
        password="hashed_password",  # 실제 앱에서는 bcrypt로 해싱해야 함
        role="user",
        join_date=datetime.now(timezone.utc)
    )

    # 1번 사용자의 진행 데이터 생성
    progress = Progress(
        user_id=1,
        problem_id=1,  # 예시 문제 ID
        solved_date=datetime.now(timezone.utc),
        score=85  # 예시 점수
    )

    # 데이터베이스에 추가
    db.session.add(user)
    db.session.add(progress)
    try:
        db.session.commit()
        print("1번 사용자와 진행 데이터가 성공적으로 추가되었습니다.")
    except Exception as e:
        db.session.rollback()
        print("데이터 추가 중 오류가 발생했습니다:", e)

# 모든 데이터 출력 함수
def print_all_data():
    print("=== 모든 사용자 데이터 ===")
    users = User.query.all()
    for user in users:
        print(f"ID: {user.id}, 닉네임: {user.username}, 이메일: {user.email}, 역할: {user.role}")

    print("\n=== 모든 진행 데이터 ===")
    progress_data = Progress.query.all()
    for progress in progress_data:
        print(f"User ID: {progress.user_id}, 문제 ID: {progress.problem_id}, 점수: {progress.score}, 풀이 날짜: {progress.solved_date}")

if __name__ == "__main__":
    # Flask 앱 컨텍스트 내에서 실행
    with app.app_context():
        add_test_user()  # 1번 사용자 추가
        print_all_data()  # 모든 데이터 출력
