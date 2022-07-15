from sqlalchemy import create_engine


class ConnectDB:
    def __init__(self, config, logger):
        self._config = config
        self.logger = logger


