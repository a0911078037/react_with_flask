import logging
from datetime import timedelta
from flask import Flask
from data_access.config_loader import ConfigLoader
from logger.system_logger import Logger
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import v1 as api

logger = Logger().create(level=logging.DEBUG)
config = ConfigLoader('./env/api_config.yml').get_config()


if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(api.bp, url_prefix='/api')
    app.config['JWT_SECRET_KEY'] = config['API']['SECRET_KEY']
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_COOKIE_SECURE'] = True
    app.config['JSON_AS_ASCII'] = False
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

    jwt = JWTManager()
    jwt.init_app(app)
    CORS(app, resources={r"/.*": {"origins": ["http://127.0.0.1:3000", 'http://localhost:3000']}})
    app.run(
        host=config['API']['IP'],
        port=config['API']['PORT'],
        debug=True
    )


