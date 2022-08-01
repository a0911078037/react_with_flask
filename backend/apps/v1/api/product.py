# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
from flask_jwt_extended import jwt_required
from apps import config
from apps.utils import ApiResponse
from logger.system_logger import Logger
from flask import request
from data_access.query.product_query import product_query
from . import Resource
from .. import schemas

logger = Logger().create('product')


class Product(Resource):

    @jwt_required()
    def post(self):
        try:
            ID = request.json['ID']
            product = request.json['product']
            Type = request.json['type']
            price = request.json['price']
            des = request.json['description']
            user = request.json['user']
            product_query(config, logger).Insert_product(user, ID, product, Type, price, des)
            return ApiResponse().to_dict(), 200
        except Exception as e:
            return ApiResponse(_msg=str(e), _status=False).to_dict(), 200

    @jwt_required()
    def put(self):
        return ApiResponse().to_dict(), 200

    @jwt_required()
    def delete(self):
        ID_list = request.json['ID_list']
        user = request.json['user']
        for ID in ID_list:
            product_query(config, logger).Delete_product(user, ID)
        return ApiResponse().to_dict(), 200