from flask import Flask
from flask_cors import CORS
from api.models import db
from api.routes import api
from api.database import Database
from api.config import Config


def create_app():
    app = Flask(__name__)
    app.config["UPLOAD_FOLDER"] = "uploads"
    CORS(app)
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"postgresql://{Config.USER}:{Config.PASSWORD}@{Config.HOST}:{Config.PORT}/{Config.DATABASE}"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    app.register_blueprint(api, url_prefix="/api")
    Database.create_all(app)
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
