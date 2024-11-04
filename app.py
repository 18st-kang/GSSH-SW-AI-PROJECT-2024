from flask import Flask

def create_app():
    app = Flask(__name__)
    
    from views.main_views import bp as main_bp
    app.register_blueprint(main_bp)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug = True)