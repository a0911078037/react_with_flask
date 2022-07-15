from sqlalchemy import create_engine


class mysqlDB:
    def __init__(self, config, logger):
        self._config = config
        self.logger = logger
        host = self._config['storge']['database']['ip']
        port = self._config['storge']['database']['port']
        user = self._config['storge']['database']['user']
        password = self._config['storge']['database']['password']
        database = self._config['storge']['database']['db']
        con = create_engine(f'mysql://{user}:{password}@{host}:{port}/{database}')
        self.db_handler = con.connect()

    def get_connection(self):
        return self.db_handler.connect()

    def execute(self, sql_statement):
        pass


