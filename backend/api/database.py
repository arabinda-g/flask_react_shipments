from .models import db


class Database:
    @staticmethod
    def init_app(app):
        db.init_app(app)

    @staticmethod
    def create_all(app):
        with app.app_context():
            db.create_all()
