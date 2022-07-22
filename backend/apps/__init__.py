from flask import Flask
from data_access.config_loader import ConfigLoader
from logger.system_logger import Logger
from flask_cors import CORS
import v1 as api

logger = Logger().create()
config = ConfigLoader('./env/api_config.yml').get_config()

if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(api.bp, url_prefix='/api')
    CORS(app)

    app.run(
        host='127.0.0.1',
        port=8000,
        debug=True
    )


