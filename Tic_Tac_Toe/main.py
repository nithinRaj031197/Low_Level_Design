from tic_tac_toe import TicTacToeGame


class Main:
    @staticmethod
    def solve():
        game = TicTacToeGame()
        game.initializeGame()
        print("Game Winner is: ", game.start_game())


Main.solve()
