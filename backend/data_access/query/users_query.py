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
                    SELECT Password, salt, Name FROM users
                    WHERE Account = '{acc}'
                    '''
            pd_data = self._db_handler.execute(sql)
            result = []
            for data in pd_data:
                d = {
                    'pws': data[0],
                    'salt': data[1],
                    'name': data[2]
                }
                result.append(d)
            return result
        except Exception as e:
            raise Exception(e)

    def Delete_user_table(self, user=''):
        try:
            table_name = f'{user}_product'
            self.logger.debug(f'deleting user table:{table_name}')
            sql = f'''
                    DROP TABLE {table_name};
                    '''
            self._db_handler.execute(sql)
        except Exception as e:
            raise Exception(e)

    def Delete_user(self, user=''):
        try:
            self.logger.debug(f'deleting user:{user}')
            sql = f'''
                DELETE FROM users WHERE Name = '{user}'
                '''
            self._db_handler.execute(sql)
        except Exception as e:
            raise Exception(e)

    def Get_user_data(self, user=''):
        try:
            self.logger.debug(f'getting user={user} count')
            sql = f'''
                    SELECT Name, Account FROM Users WHERE Name = '{user}'
                   '''
            pd_data = self._db_handler.execute(sql)
            result = []
            for data in pd_data:
                d = {
                    'Name': data['Name'],
                    'Account': data['Account']
                }
                result.append(d)
            return result
        except Exception as e:
            raise Exception(e)

    def Create_user_product_table(self, user=''):
        try:
            self.logger.debug(f'creating product table for user:{user}')
            table_name = f'{user}_product'
            sql = f'''
                CREATE TABLE {table_name}(
                    ID varchar(32),
                    Product varchar(32),
                    Type varchar(32),
                    Price int,
                    Description varchar(64)
                );
                '''
            self._db_handler.execute(sql)
        except Exception as e:
            raise Exception(e)

    def update_user_pass(self, user='', pws='', salt=''):
        try:
            self.logger.debug(f'update user password user:{user}')
            sql = f'''
                    UPDATE users SET Password='{pws}', salt='{salt}'
                    WHERE Name='{user}'; 
                    '''
            self._db_handler.execute(sql)
        except Exception as e:
            raise Exception(e)
