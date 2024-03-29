# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
from apps.utils import ApiResponse
from apps import config
from logger.system_logger import Logger
from data_access.query.users_query import users_query
from flask_jwt_extended import jwt_required
from flask import request
from . import Resource
import hashlib
import uuid

logger = Logger().create('user_username')


class UserUsername(Resource):

    @jwt_required()
    def get(self, username):
        try:
            result = users_query(config, logger).Get_user_data(username)
            return ApiResponse(result[0]).to_dict(), 200, None
        except Exception as e:
            logger.error(repr(e))
            return ApiResponse(None, str(e), False).to_dict(), 200

    @jwt_required()
    def put(self, username):
        try:
            pws = request.json['pws']
            salt = uuid.uuid4().hex[0:10]
            pws = hashlib.sha256((salt + pws).encode('utf-8')).hexdigest()
            users_query(config, logger).update_user_pass(username, pws, salt)
            return ApiResponse().to_dict(), 200
        except Exception as e:
            logger.error(repr(e))
            return ApiResponse(None, str(e), False).to_dict(), 200

    @jwt_required()
    def delete(self, username):
        try:
            user = request.json['user']
            if username != user:
                raise Exception('非法刪除!')
            con = users_query(config, logger)
            con.Delete_user(user)
            con.Delete_user_table(user)
            return ApiResponse().to_dict(), 200, None
        except Exception as e:
            logger.error(repr(e))
            return ApiResponse(None, str(e), False).to_dict(), 200
