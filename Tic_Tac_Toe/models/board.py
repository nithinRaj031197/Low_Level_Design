class Board:
    def __init__(self, size):
        self.size = size
        self.board = [[None] * size for _ in range(size)]

    def get_free_cells(self):
        free_cells = False

        for i in range(self.size):
            for j in range(self.size):
                if self.board[i][j] is None:
                    free_cells = True
        return free_cells

    def add_piece(self, row, col, playing_piece):
        if row < 0 or col < 0 or row >= self.size or col >= self.size:
            print(f"Cant place at {row}, {col}")
            return False
        if not self.board[row][col]:
            self.board[row][col] = playing_piece
            return True
        return False

    def print_board(self):
        for i in range(self.size):
            for j in range(self.size):
                if self.board[i][j]:
                    print(self.board[i][j].piece_type, end="  ")
                else:
                    print("  ", end="")
                print(" | ", end="")
            print()