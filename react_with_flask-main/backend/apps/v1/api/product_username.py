# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
from flask_jwt_extended import jwt_required
from apps import config
from apps.utils import ApiResponse
from logger.system_logger import Logger
from data_access.query.product_query import product_query
from flask import request
from . import Resource
from .. import schemas

logger = Logger().create('product_get')


class ProductUsername(Resource):

    @jwt_required()
    def get(self, username):
        result = product_query(config, logger).Get_product(username)
        return ApiResponse(_result=result).to_dict(), 200
