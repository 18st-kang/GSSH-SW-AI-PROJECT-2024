from flask import render_template, redirect, url_for, flash, request, jsonify
from sqlalchemy import func
from flask_login import login_user, login_required, logout_user, current_user
from app import app, db, login_manager
from app.models import User, Problem  # models에서 정의된 모델을 가져옴
from app.forms import LoginForm, RegisterForm
from flask_bcrypt import check_password_hash, generate_password_hash

with app.app_context():
    db.create_all()

# user_loader 함수 설정
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))  # ID를 이용해 사용자 객체를 가져옵니다.   

# 로그인 라우트
@app.route('/')
@app.route('/home')
def home():
    if current_user.is_authenticated:
        user = current_user
        return render_template('myPage_index.html', user=user)
    else:
        return redirect((url_for('login')))

@app.route('/problem')
def problem():
    if current_user.is_authenticated:
        user = current_user
        problem = Problem.query.order_by(func.random()).first()
        post_user = User.query.filter_by(id=problem.posted_by).first()
        if problem.category == "밀레니엄 난제":
            return render_template('problems_mill.html', user=user, problem=problem, post_user=post_user)
        else:
            return render_template('problems_bj.html', user=user, problem=problem, post_user=post_user)
    else:
        return redirect((url_for('login')))

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            if check_password_hash(user.password, form.password.data):
                login_user(user)
                flash('로그인 성공!', 'success')
                return redirect(url_for('home'))
            else:
                flash('이메일 또는 비밀번호가 잘못되었습니다.', 'danger')
        else:
            flash('가입되지 않은 이메일입니다. 회원가입해주세요.', 'danger')
    return render_template('login.html', form=form)

# 로그아웃 라우트
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('로그아웃 성공!', 'info')
    return redirect(url_for('home'))

# 회원가입 라우트
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(username=form.nickname.data, email=form.email.data, password=generate_password_hash(form.password.data))
        
            # 이메일 중복 확인
            
        existing_user = User.query.filter_by(email=form.email.data).first()
        
        if existing_user:
            # 이메일이 이미 존재하면 중복 메시지 출력
            flash('이미 가입된 이메일입니다. 다른 이메일로 가입해주세요.', 'danger')
        else:        
            db.session.add(user)
            db.session.commit()
            login_user(user)
            flash('회원가입이 완료되었습니다.', 'success')
            return redirect(url_for('home'))
    return render_template('register.html', form=form)