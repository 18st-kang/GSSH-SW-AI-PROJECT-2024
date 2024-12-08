from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime, timezone
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# 데이터베이스 모델 정의
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    join_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    role = db.Column(db.String(20), default='user')
    progress = db.relationship('Progress', backref='user', lazy=True)  # 관계 선언

class Problem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    posted_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

class Solution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    problem_id = db.Column(db.Integer, db.ForeignKey('problem.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    solution_id = db.Column(db.Integer, db.ForeignKey('solution.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    problem_id = db.Column(db.Integer, db.ForeignKey('problem.id'), nullable=False)
    solved_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    score = db.Column(db.Integer, nullable=False)
'''
# 라우팅
@app.route('/')
def mainPage():
    return render_template('myPage_index.html')
'''

@app.route('/')
def myPage():
    # 사용자 데이터를 데이터베이스에서 가져오기 (예: ID 1번 사용자)
    user = User.query.get(1)  # 임시로 ID 1번 사용자의 데이터를 가져옴
    progress = user.progress  # 사용자 풀이 기록

    # 통계 데이터 계산 (예: 점수, 맞춘 문제 수, 정답률)
    total_score = sum(p.score for p in progress)
    solved_count = len(progress)
    accuracy = (solved_count / 50) * 100 if solved_count > 0 else 0  # 예: 총 문제 수 50

    return render_template(
        'myPage_index.html',
        user=user,
        progress=progress,
        total_score=total_score,
        solved_count=solved_count,
        accuracy=accuracy
    )

@app.route('/problems', methods=['GET', 'POST'])
def selectProblems():
    if request.method == 'POST':
        # 문제 추가
        title = request.form['title']
        content = request.form['content']
        category = request.form['category']
        difficulty = request.form['difficulty']
        posted_by = request.form['posted_by']
        new_problem = Problem(
            title=title, content=content, category=category,
            difficulty=difficulty, posted_by=posted_by
        )
        db.session.add(new_problem)
        db.session.commit()
        return jsonify({'message': '문제가 성공적으로 추가되었습니다!'})
    else:
        # 문제 목록 조회
        problems = Problem.query.all()
        return render_template('selectProblems_index.html', problems=problems)

@app.route('/subjects')
def selectSubjects():
    return render_template('selectSubjects_index.html')

# 데이터베이스 초기화
@app.before_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
