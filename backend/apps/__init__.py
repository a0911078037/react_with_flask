from flask import Flask, request
import os
from data_access.db_connect.mysqlDB import mysqlDB
from data_access.config_loader import ConfigLoader
from logger.system_logger import Logger
from flask_cors import CORS


if __name__ == "__main__":
    app = Flask(__name__)
    CORS(app)
    config = ConfigLoader('./env/api_config.yml').get_config()
    logger = Logger()
    
    # @app.route('/api/tests', methods=['POST'])
    # def api_testing():
    #     try:
    #         print(request.json['msg'])
    #         print(request.json['changed'])
    #         res = {
    #             'msg': 'success'
    #         }
    #         return res
    #     except Exception as e:
    #         print(e)

    app.run(
        host='127.0.0.1',
        port=8000,
        debug=True
    )


