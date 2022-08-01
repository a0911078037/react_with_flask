# -*- coding: utf-8 -*-

###
### DO NOT CHANGE THIS FILE
### 
### The code is auto generated, your change will be overwritten by 
### code generating.
###
from __future__ import absolute_import

from .api.user import User
from .api.login import Login
from .api.user_logout import UserLogout
from .api.user_username import UserUsername
from .api.product_username import ProductUsername
from .api.product import Product


routes = [
    dict(resource=User, urls=['/user'], endpoint='user'),
    dict(resource=Login, urls=['/login'], endpoint='login'),
    dict(resource=UserLogout, urls=['/user/logout'], endpoint='user_logout'),
    dict(resource=UserUsername, urls=['/user/<username>'], endpoint='user_username'),
    dict(resource=ProductUsername, urls=['/product/<username>'], endpoint='product_username'),
    dict(resource=Product, urls=['/product'], endpoint='product'),
]