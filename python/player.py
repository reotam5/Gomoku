from ai import act

class Player:
  def __init__(self,AI):
    self.isAI = AI

  def getMove(self,board,ID):
    index = -1
    if self.isAI:
      index = act(board,ID)
    else:
      index = int(input())
    return index