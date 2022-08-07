from data_access.db_connect.mysqlDB import mysqlDB


class product_query:
    def __init__(self, config, logger):
        self._db_handler = mysqlDB(config, logger)
        self._config = config
        self.logger = logger

    def execute(self, sql_stmt):
        self._db_handler.execute(sql_stmt)

    def Get_product(self, user=''):
        try:
            table = f'{user}_product'
            sql = f'''
                            SELECT * FROM {table}
                            '''
            pd_data = self._db_handler.execute(sql)
            result = []
            for data in pd_data:
                d = {
                    'id': data['ID'],
                    'product': data['Product'],
                    'type': data['Type'],
                    'price': data['Price'],
                    'description': data['Description']
                }
                result.append(d)
            return result
        except Exception as e:
            raise Exception(e)

    def Insert_product(self, user='', ID='', product='', Type='', price='', des=''):
        try:
            table = f'{user}_product'
            sql = f'''
                    INSERT INTO {table} (ID, Product, Type, Price, Description)
                    VALUES ("{ID}", "{product}", "{Type}", {price}, "{des}");
                    '''
            self._db_handler.execute(sql)
        except Exception as e:
            raise Exception(e)

    def Delete_product(self, user='', ID=''):
        try:
            table = f'{user}_product'
            sql = f'''
                    DELETE FROM {table} WHERE ID = '{ID}'
                    '''
            self._db_handler.execute(sql)
        except Exception as e:
            raise Exception(e)
