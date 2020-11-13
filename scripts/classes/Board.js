class Board{
  constructor(size,game){
    this.size = size;
    this.game = game;
    this.map = this.createMap();
  }

  //create board
  drawBoard(parent,initImg){
    const size = this.size;
    var rowElement;
    //goes through y axis
    for(var y = 0; y < size; y++){
      rowElement = $("<div class='board-row'></div>");
      //goes through x axis
      for(var x = 0; x < size; x++){
        var cellElement = $("<div type='button' id='"+x+"-"+y+"' class='cells unselected'><img src='"+initImg+"'></div>");
        rowElement = rowElement.append(cellElement);
      }
      parent.append(rowElement);
    }
  }

  listenClick(){
    var that = this;
    $(".cells").on('click',function(event){
      var targetElement = $(event.currentTarget);
      
      that.input(targetElement);
    });
  }

  input(targetElement){
    var unselectedCellType = "unselected";
    var currentP = this.game.currentP;
    var playerImg = this.game.listPlayers[currentP]["img"];

    if(targetElement.hasClass(unselectedCellType)){
      targetElement.removeClass(unselectedCellType).addClass("selected").attr("player",currentP);
      targetElement.children().filter("img").attr("src",playerImg);

      //extracting x and y to get clicked index
      var targetID = targetElement.attr("id");
      var division = targetID.indexOf("-");
      var x = parseInt(targetID.substring(0,division));
      var y = parseInt(targetID.substring(division+1));
      var clickedIndex = x + (y * this.size);


      this.game.checkWin(this,this.getBoardStatus(),clickedIndex);
      this.game.getNextPlayer();
    }else{
      console.log("not allowed");
    }
  }

  getBoardStatus(){
    var size = this.size;
    var status = [];
    //goes through y axis
    for(var y = 0; y < size; y++){
      var row = [];
      //goes through x axis
      for(var x = 0; x < size; x++){
        row.push(parseInt($("#"+x+"-"+y).attr("player")));
      }
      status.push(row);
    }
    //array of rows
    //each array has selected player ID
    //if cell is unselected, NaN
    return status;
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

}