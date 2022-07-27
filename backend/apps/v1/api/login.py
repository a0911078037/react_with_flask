# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
from flask import request
from . import Resource
from apps.utils import ApiResponse
from apps import config, logger
from data_access.query.users_query import users_query
from flask_jwt_extended import create_access_token
import hashlib


class Login(Resource):
    def post(self):
        try:
            acc = request.json['acc']
            pws = request.json['pws']
            result = users_query(config, logger).Get_salted_password(acc)
            if not result:
                raise Exception('帳號不存在')
            pws = (result[0]['salt'] + pws).encode('utf-8')
            pws = hashlib.sha256(pws).hexdigest()
            identity = {
                'users': result[0]['name']
            }
            data = {
                'user': result[0]['name'],
                'token': create_access_token(identity)
            }

            if pws != result[0]['pws']:
                raise Exception('登入失敗')
            return ApiResponse(data).to_dict(), 200
        except Exception as e:
            return ApiResponse(None, str(e), False).to_dict(), 200

