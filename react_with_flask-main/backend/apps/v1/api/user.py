# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
from flask import request
from . import Resource
from apps.utils import ApiResponse
from apps import config
from logger.system_logger import Logger
from data_access.query.users_query import users_query
from flask_jwt_extended import jwt_required
import datetime
import hashlib
import uuid


class User(Resource):
    def post(self):
        try:
            logger = Logger().create('User')
            acc = request.json['acc']
            name = request.json['name']
            pws = request.json['pws']
            salt = uuid.uuid4().hex[0:10]
            date = str(datetime.datetime.now())
            pws = hashlib.sha256((salt + pws).encode('utf-8')).hexdigest()
            con = users_query(config, logger)
            con.Insert_Users_data(acc, pws, name, salt, date)
            con.Create_user_product_table(name)
            return ApiResponse().to_dict(), 200, None
        except Exception as e:
            msg = str(e)
            if 'MySQLdb.IntegrityError' in str(e):
                msg = '此帳號已存在'
            else:
                msg = '新增會員失敗'
            return ApiResponse(None, msg, False).to_dict(), 200, None

    @jwt_required()
    def get(self):
        return ApiResponse().to_dict(), 200

