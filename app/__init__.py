from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

# Flask 애플리케이션 초기화
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # 데이터베이스 경로 설정
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # 세션 관리용 비밀 키

# 데이터베이스 설정
db = SQLAlchemy(app)
migrate = Migrate(app, db)
    
# 로그인 관리 설정
login_manager = LoginManager(app)

login_manager.login_view = 'login'

from app import routes, models