from ai import possIndex,act
from board import Board
import copy
import os

currentWFile = 1
currentBFile = 1
iteration = 10000

for i in range(iteration):
  print(str(i) + " / " + str(iteration))
  board = Board(4,4)
  currentID = -1
  noRecord = False
  winner = 0
  record = []

  while(not board.end):
    if(len(possIndex(board.state)) == 0):
      noRecord = True
      break
    move = act(board,currentID)
    record.append(move)
    board.input(move,currentID)
    winner = board.isEnd()
    currentID = currentID * -1
  board.drawBoard()
  if not noRecord:
    if winner == -1:
      #write to -1
      print("WINNER: ○")
      size = os.stat("C:\\Users\\reota\\Desktop\\myProjects\\Gomoku\\python\\white_"+str(currentWFile)+".txt").st_size / (1024 * 1024)
      if(size > 10):
        currentWFile += 1
      w = open("white_"+str(currentWFile)+".txt", "a")
      w.write(str(record)+"\n")
      w.close()
    else:
      #write to 1
      print("WINNER: ⬤")
      size = os.stat("C:\\Users\\reota\\Desktop\\myProjects\\Gomoku\\python\\black_"+str(currentBFile)+".txt").st_size / (1024 * 1024)
      if(size > 10):
        currentBFile += 1
      b = open("black_"+str(currentBFile)+".txt", "a")
      b.write(str(record)+"\n")
      b.close()
  
