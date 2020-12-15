from board import Board
import random

def win_or_rnd(board,AIID):
  possible_index = possIndex(board.state)
  for i in range(len(possible_index)):
    targetCell = possible_index[i]
    tempBoard = Board(board.size,board.connect)
    tempBoard.initiateState(board.state)
    tempBoard.input(targetCell,AIID)
    if(tempBoard.isEnd() == AIID and tempBoard.end):
      return targetCell

  rnd_int =  random.randint(0, len(possible_index) - 1)
  return possible_index[rnd_int]



def possIndex(status):
  indexes = []
  for i in range(len(status)):
    if(status[i] == 0):
      indexes.append(i)
  return indexes


def trial(board,AIID,score,move):
  initialMove = move
  tempBoard = Board(board.size,board.connect)
  tempBoard.initiateState(board.state)
  currentID = AIID
  tied = False
  counter = 0
  winner = 0
  while(not tempBoard.end):
    counter += 1
    
    tempBoard.input(move,currentID)
    winner = tempBoard.isEnd()
    if(len(possIndex(tempBoard.state)) == 0):
      tied = True
      break
    currentID = currentID * -1
    move = win_or_rnd(tempBoard,currentID)
  if(score[initialMove] == None):
    score[initialMove] = 0
  if(tied and (not tempBoard.end)):
    score[initialMove] += 0
  elif(winner == AIID):
    score[initialMove] += 1/counter
  else:
    score[initialMove] -= 1/counter


def act(board,AIID):
  moves = possIndex(board.state)
  
  iteration = 10

  scores = []
  for i in range(len(board.state)):
    scores.append(None)

  for i in range(len(moves)):
    for n in range(iteration):
      trial(board,AIID,scores,moves[i])
    scores[moves[i]] /= iteration

  print(scores)
  max = -9999999
  index = -1
  for i in range(len(scores)):
    if(not(scores[i] == None) and scores[i] > max):
      max = scores[i]
      index = i

  return index