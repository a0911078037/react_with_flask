import logging
import os
from datetime import datetime
from logging.handlers import RotatingFileHandler
log_format = '[%(asctime)s] - [%levelno]s'


class Logger:
    def __init__(self):
        pass

    def create(self, name='System', level=logging.INFO, log_path=''):
        logger = logging.getLogger(name)
        time = datetime.now()

        if logger.hasHandlers():
            logger.handlers.clear()

        if not os.path.isdir(log_path):
            os.mkdir(log_path)

        handler = RotatingFileHandler(filename=os.path.join(log_path, f'{time:%Y-M-D_h}.log')
                                      , maxBytes=100000, backupCount=5)
        formatter = logging.Formatter(log_format)
        logger.setLevel(level)
        handler.setLevel(level)
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        return logger


