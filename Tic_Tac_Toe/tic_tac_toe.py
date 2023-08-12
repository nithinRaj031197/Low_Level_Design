from collections import deque
from models.player import Player
from models.playing_piece_x import PlayingPieceX
from models.playing_piece_o import PlayingPieceO
from models.board import Board


class TicTacToeGame:
    def __init__(self):
        self.game_board = None
        self.players = None

    def initializeGame(self):
        self.players = deque()

        cross_piece = PlayingPieceX()
        player1 = Player("Player1", cross_piece)

        noughts_piece = PlayingPieceO()
        player2 = Player("Player2", noughts_piece)

        self.players.append(player1)
        self.players.append(player2)

        self.game_board = Board(3)

    def start_game(self):
        winner = False

        while not winner:
            player_turn = self.players.popleft()

            self.game_board.print_board()

            is_free_cell = self.game_board.get_free_cells()

            if not is_free_cell:
                winner = True
                continue

            user_input = input(f"Player: {player_turn.name} Enter row, column: ")
            row, col = map(int, user_input.split(","))
            if row is None or col is None:
                self.try_agin(player_turn)
                continue

            is_placed = self.game_board.add_piece(row, col, player_turn.piece_type)
            if not is_placed:
                self.try_agin(player_turn)
                continue

            self.players.append(player_turn)

            if self.is_there_winner(row, col, player_turn.piece_type):
                return player_turn.name

        return "tie"

    def is_there_winner(self, row, col, piece_type):
        row_match = all(self.game_board.board[row][i] == piece_type for i in range(self.game_board.size))
        col_match = all(self.game_board.board[i][col] == piece_type for i in range(self.game_board.size))
        diagonal_match = all(self.game_board.board[i][i] == piece_type for i in range(self.game_board.size))
        anti_diagonal_match = all(self.game_board.board[i][self.game_board.size - 1] == piece_type for i in range(self.game_board.size))
        return row_match or col_match or diagonal_match or anti_diagonal_match

    def try_agin(self, player_turn):
        print("Incorrect position choosen, try again!")
        self.players.appendleft(player_turn)