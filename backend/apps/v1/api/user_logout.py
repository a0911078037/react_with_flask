# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from . import Resource


class UserLogout(Resource):

    def get(self):

        return {}, 200, None