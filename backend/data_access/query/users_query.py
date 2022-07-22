from data_access.db_connect.mysqlDB import mysqlDB


class users_query:
    def __init__(self, config, logger):
        self._db_handler = mysqlDB(config, logger)
        self._config = config
        self.logger = logger

    def execute(self, sql_stmt):
        self._db_handler.execute(sql_stmt)

    def Insert_Users_data(self, acc='', pws='', name='', salt='', date=''):
        try:
            self.logger.debug('insert user data')
            sql = f'''
                    INSERT INTO users (Account, Password, Name, salt, Add_Date)
                    VALUES ("{acc}", "{pws}", "{name}", "{salt}", "{date}");
                    '''
            self._db_handler.execute(sql)
            self.logger.debug('insert user data complete')
        except Exception as e:
            raise Exception(e)

    def Get_salted_password(self, acc=''):
        try:
            self.logger.debug('getting password auth')
            sql = f'''
                    SELECT Password, salt FROM users
                    WHERE Account = '{acc}'
                    '''
            pd_data = self._db_handler.execute(sql)
            result = []
            for data in pd_data:
                d = {
                    'pws': data[0],
                    'salt': data[1]
                }
                result.append(d)
            return result
        except Exception as e:
            raise Exception(e)
