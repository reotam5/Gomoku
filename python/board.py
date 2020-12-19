import copy

class Board:
  def __init__(self, size,connect):
    self.size = size
    self.connect = connect
    self.end = False
    self.map = self.createMap()
    self.state = []
    for i in range(size * size):
      self.state.append(0)
  
  def initiateState(self,state):
    self.state = copy.deepcopy(state)
  
  def input(self,pos,ID):
    if pos >= 0 and pos < (self.size * self.size):
      if(self.state[pos] == 0):
        self.state[pos] = ID
        return self.state
      else:
        print("ID: " + str(ID) +"   "+ str(pos) + " is already taken.")
        return None
    elif pos == -1:
      print("Passed")
      return self.state
    else:
      print("invalid position")
      return None

  def drawBoard(self):
    toPrint = ""
    for i in range(self.size):
      toPrint += "   " + str(i + 1)
    toPrint += "\n"
    for i in range(self.size):
      toPrint += "-----"
    for y in range(self.size):
      toPrint += "\n"
      toPrint += str(y + 1) + "|  "
      for x in range(self.size):
        target = self.getID(y * self.size + x)
        drawing = "-"
        if target == -1:
          drawing = "○"
        elif target == 1:
          drawing = "⬤"
        toPrint += drawing + " | "
    print(toPrint)
  
  def isEnd(self):
    max = 0
    leadID = 0
    

    for i in range(self.size*self.size):

      targetID = self.state[i]

      #not owned by anyone
      if targetID == 0:
        continue

      #0-7 direction (up, upright, right ....)
      for d in range(8):
        counter = 1
        currentPos = i
        while (targetID == self.getID(self.getNextPos(currentPos,d))):
          counter += 1
          currentPos = self.getNextPos(currentPos,d)
        
        if counter > max:
          max = counter
          leadID = targetID

          if counter >= self.connect:
            self.end = True
            return leadID
    return leadID

  def getID(self,pos):
    if pos >= 0 and pos < (self.size * self.size):
      return self.state[pos]
    return 0
  
  def getNextPos(self,pos,direction):
    return (self.map[pos][direction] + pos) if (not self.map[pos][direction] == None) else -1


  def createMap(self):
    index = 0
    size = self.size
    mapping = []
    for n in range(size*size):
      mapping.append([])
    for y in range(size):
      for x in range(size):
        #bottom edge
        if((y + 1) % size == 0):
          #right edge
          if((x + 1) % size == 0):
            mapping[index] = [-size, None, None, None, None, None, -1, -(size+1)]

            #left edge
          elif(x == 0):
            mapping[index] = [-size,-(size-1),+1,None,None,None,None,None ]

            #other safe places
          else:
            mapping[index] = [-size,-(size-1),+1,None,None,None,-1,-(size+1)]

          #top edge
        elif(y == 0):
          #right edge
          if((x + 1) % size == 0):
            mapping[index] = [None,None,None,None,size,size-1,-1,None]

            #left edge
          elif(x == 0):
            mapping[index] = [None,None,+1,size+1,size,None,None,None]

            #other safe places
          else:
            mapping[index] = [None,None,+1,size+1,size,size-1,-1,None]

          #other safe places
        else:
          #right edge
          if((x + 1) % size == 0):
            mapping[index] = [-size,None,None,None,size,size-1,-1,-(size+1)]

            #left edge
          elif(x == 0):
            mapping[index] = [-size,-(size-1),+1,size+1,size,None,None,None]

            #other safe places
          else:
            mapping[index] = [-size,-(size-1),+1,size+1,size,size-1,-1,-(size+1)]

        index += 1
    return mapping

  

