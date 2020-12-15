from board import Board
from ai import possIndex
from player import Player

size = 3
connect = 3
board = Board(size,connect)
board.drawBoard()
currentID = -1
players = [Player(False),Player(True)]

while(not board.end):

  player = players[0] if (currentID == -1) else players[1]
  target = player.getMove(board,currentID)
  print("Choosen Move: " + str(target))
  while(board.input(target,currentID) == None):
    target = player.getMove(board,currentID)
  print("")
  board.drawBoard()
  winner = board.isEnd()
  currentID *= -1

print("winner is " + str(winner))



