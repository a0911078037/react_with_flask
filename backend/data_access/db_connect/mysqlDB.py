import sqlalchemy
from sqlalchemy import create_engine


class mysqlDB:
    def __init__(self, config, logger):
        self._config = config
        self.logger = logger
        host = self._config['STORGE']['DATABASE']['IP']
        port = self._config['STORGE']['DATABASE']['PORT']
        user = self._config['STORGE']['DATABASE']['USER']
        password = self._config['STORGE']['DATABASE']['PASSWORD']
        database = self._config['STORGE']['DATABASE']['DB']
        con = create_engine(f'mysql://{user}:{password}@{host}:{port}/{database}')
        self.logger.debug('connect to database')
        self._db_handler = con.connect()
        self.logger.debug('database connected')

    def get_connection(self):
        return self._db_handler.connect()

    def execute(self, sql_statement):
        self.logger.debug('execute sql statement')
        success = True
        msg = ''
        con = self._db_handler.connect()
        try:
            result = con.execute(sql_statement)
            return result
        except Exception as e:
            self.logger.error(f'database error: {e}')
            msg = e
            success = False
        finally:
            con.close()
            if not success:
                raise Exception(msg)
