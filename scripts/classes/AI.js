class AI {
  constructor (size){
    this.size = size;
    this.map = this.createMap();
  }

  win_or_rnd(board,AIID){
    var boardStatus = JSON.parse(JSON.stringify(board.getBoardStatus()));
    boardStatus = board.convertTArr(boardStatus);
    var possible_index = this.possIndex(boardStatus);
    for(var i = 0; i < possible_index.length; i++){
      var targetCell = possible_index[i];
      var copy = JSON.parse(JSON.stringify(boardStatus));
      var newStatus = this.virtualInpupt(copy,AIID,targetCell);
      if(this.checkWin(newStatus,possible_index[i]) != false){
        console.log("winable");
        return possible_index[i];
      }
    }
    var rnd_int =  Math.floor(Math.random() * possible_index.length);
    return possible_index[rnd_int];
  }

  //status has to be in [0,1,2,3...] format
  virtualInpupt(status,id,index){
    if(status[index] == null){
      status[index] = id;
    } else{
      console.log("Input not allowed");
      return null;
    }
    return status;
  }
  getOpposite(direction){
    switch(direction){
      case 0:
        return 4;
      case 1:
        return 5;
      case 2:
        return 6;
      case 3:
        return 7;
      case 4:
        return 0;
      case 5:
        return 1;
      case 6:
        return 2;
      case 7:
        return 3;
    }
  }

  //check every direction
  checkWin(status,clickedIndex){
    var targetP = status[clickedIndex];
    for(var i = 0; i < 8; i++){
      var edgeIndex = this.getEdgeIndex(status,clickedIndex,i);
      var count = this.checkDirection(status,clickedIndex,this.getOpposite(i),targetP,0);
      if(count >= this.size){
        return targetP;
      }
    }
    return false;
  }

  getEdgeIndex(status,index,direction,currentP){
    var indexP = status[index];
    if(indexP == currentP){
      var nextIndex = this.getIndexWDirection(index,direction);
      return this.getEdgeIndex(status,nextIndex,direction,indexP);
    }else{
      return index;
    }
  }

  //recursively count(helper function for checkWin)
  checkDirection(status,index,direction,currentP,count){
    var indexP = status[index];
    if(indexP == currentP){
      var nextIndex = this.getIndexWDirection(index,direction);
      return this.checkDirection(status,nextIndex,direction,indexP,count+1);
    }else{
      return count;
    }
  }

  createMap(){
    //directions are 8 directions (0-7) from up clockwise.
    var index = 0;
    var map = {};
    var size = this.size;
    for(var y = 0; y < size; y++){
      for(var x = 0; x < size; x++){
        //bottom edge
        if((y + 1) % size == 0){
          //right edge
          if((x + 1) % size == 0){
            map[index] = {
              0: -size,
              1: NaN,
              2: NaN,
              3: NaN,
              4: NaN,
              5: NaN,
              6: -1,
              7: -(size+1) 
            }

            //left edge
          }else if(x == 0){
            map[index] = {
              0: -size,
              1: -(size-1),
              2: +1,
              3: NaN,
              4: NaN,
              5: NaN,
              6: NaN,
              7: NaN 
            }

            //other safe places
          }else{
            map[index] = {
              0: -size,
              1: -(size-1),
              2: +1,
              3: NaN,
              4: NaN,
              5: NaN,
              6: -1,
              7: -(size+1) 
            }
          }

          //top edge
        }else if(y == 0){
          //right edge
          if((x + 1) % size == 0){
            map[index] = {
              0: NaN,
              1: NaN,
              2: NaN,
              3: NaN,
              4: size,
              5: size-1,
              6: -1,
              7: NaN 
            }

            //left edge
          }else if(x == 0){
            map[index] = {
              0: NaN,
              1: NaN,
              2: +1,
              3: size+1,
              4: size,
              5: NaN,
              6: NaN,
              7: NaN 
            }

            //other safe places
          }else{
            map[index] = {
              0: NaN,
              1: NaN,
              2: +1,
              3: size+1,
              4: size,
              5: size-1,
              6: -1,
              7: NaN 
            }
          }

          //other safe places
        }else{
          //right edge
          if((x + 1) % size == 0){
            map[index] = {
              0: -size,
              1: NaN,
              2: NaN,
              3: NaN,
              4: size,
              5: size-1,
              6: -1,
              7: -(size+1) 
            }

            //left edge
          }else if(x == 0){
            map[index] = {
              0: -size,
              1: -(size-1),
              2: +1,
              3: size+1,
              4: size,
              5: NaN,
              6: NaN,
              7: NaN 
            }

            //other safe places
          }else{
            map[index] = {
              0: -size,
              1: -(size-1),
              2: +1,
              3: size+1,
              4: size,
              5: size-1,
              6: -1,
              7: -(size+1) 
            }
          }
        }
        index++;
      }
    }
    return map;
  }

  //return index of cell next to current index to specified direction
  getIndexWDirection(index,direction){
    return this.map[index][direction] + index;
  }

  possIndex(status){
    var indexes = [];
    for(var i = 0; i < status.length; i++){
      if(status[i] == null){
        indexes.push(i);
      }
    }
    return indexes;
  }


}