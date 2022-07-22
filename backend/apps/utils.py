class ApiResponse:
    def __init__(self, _result=None, _msg='success', _status=True):
        self.msg = _msg
        self.result = _result
        self.status = _status

    def to_dict(self):
        data = {
            'msg': self.msg,
            'result': self.result,
            'status': self.status
        }
        return data
