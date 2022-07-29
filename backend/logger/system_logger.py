import logging
import os
from datetime import datetime
from logging.handlers import RotatingFileHandler
log_format = '[%(asctime)s] - %(name)s - %(levelname)s - %(message)s'


class Logger:
    def __init__(self):
        pass

    def create(self, name='System', level=logging.INFO, log_path='./logs'):
        logger = logging.getLogger(name)
        time = datetime.now()

        if logger.hasHandlers():
            logger.handlers.clear()

        if not os.path.isdir(log_path):
            os.mkdir(log_path)
        handler = RotatingFileHandler(filename=log_path + f'{time:/%Y-%m-%d_%H}.log'
                                      , maxBytes=100000, backupCount=5)
        logger.setLevel(level)
        formatter = logging.Formatter(log_format)
        handler.setLevel(level)
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        return logger


