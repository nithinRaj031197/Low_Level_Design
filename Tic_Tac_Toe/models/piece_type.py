from enum import Enum


class PieceType(Enum):
    X = 'X'
    O = 'O'


class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

class Status(Enum):
    SUCCESS = "Success"
    ERROR = "Error"
    PENDING = "Pending"
