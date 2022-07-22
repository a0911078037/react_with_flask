# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import g

from . import Resource


class UserUsername(Resource):

    def get(self, username):

        return {}, 200, None

    def put(self, username):
        print(g.json)

        return {}, 200, None

    def delete(self, username):

        return {}, 200, None