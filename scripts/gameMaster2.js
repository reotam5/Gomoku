$(document).ready(function(){
  drawBoard($("#gameboard"),"images/gameAssets/unselected.png");
  listenClick();
});


var size = 3;
var numPlayers = 2;
var aiMode = true;
var aiID = 1;
var map = createMap();
var currentP = 0;
var board = [];
for(var i = 0; i<size*size;i++){
  board.push(null);
}

var playerList = {};
for(var i = 0; i < numPlayers; i++){
  playerList[i] = {
    img: "images/gameAssets/player"+i+".png",
    name: "Player"+(i+1)
  }
}

//create board
function drawBoard(parent,initImg){
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

function listenClick(){

  $(".cells").on('click',function(event){
    var targetElement = $(event.currentTarget);
    //extracting x and y to get clicked index
    var targetID = targetElement.attr("id");
    var division = targetID.indexOf("-");
    var x = parseInt(targetID.substring(0,division));
    var y = parseInt(targetID.substring(division+1));
    var clickedIndex = x + (y * size);
    input(clickedIndex);

    if(aiMode && currentP ==  aiID){
      exit();
      var aiMove = parseInt(act(aiID,board));
      input(aiMove);
      restart();
    }else{
      return;
    }
  });
}

function input(clickedIndex){
  var unselectedCellType = "unselected";
  var playerImg = playerList[currentP]["img"];

  var x = Math.trunc(clickedIndex%size);
  var y = Math.trunc(clickedIndex/size);
  var targetElement = $("#"+x+"-"+y);
  if(targetElement.hasClass(unselectedCellType)){
    targetElement.removeClass(unselectedCellType).addClass("selected").attr("player",currentP);
    targetElement.children().filter("img").attr("src",playerImg);

    board[clickedIndex] = currentP;
    var isWin = checkWin(board,clickedIndex);
    if(isWin > -1){
      exit();
      console.log(currentP+" won");
    }
    currentP = getNextPlayer(currentP);
  }else{
    console.log("not allowed");
  }
  return board;
}

function getOpposite(direction){
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

//check every direction. status is in array
function checkWin(status,startInd){
  var targetP = status[startInd];
  for(var i = 0; i < 8; i++){
    var edgeIndex = getEdgeIndex(status,startInd,i,targetP,startInd);
    var count = checkDirection(status,edgeIndex,getOpposite(i),targetP,0);
    if(count >= size){
      return targetP;
    }
  }
  return -1;
}

function getEdgeIndex(status,index,direction,currentP,preInd){
  var indexP = status[index];
  if(indexP == currentP){
    var nextIndex = getIndexWDirection(index,direction);
    return getEdgeIndex(status,nextIndex,direction,indexP,index);
  }else{
    return preInd;
  }
}

//recursively count(helper function for checkWin)
function checkDirection(status,index,direction,currentP,count){
  var indexP = status[index];
  if(indexP == currentP){
    var nextIndex = getIndexWDirection(index,direction);
    return checkDirection(status,nextIndex,direction,indexP,count+1);
  }else{
    return count;
  }
}

function getNextPlayer(currentP){
  if(currentP < (numPlayers - 1)){
    return currentP + 1;
  }else{
    return 0;
  }
}

function exit(){
  var hide = $("<div id='hide' style='background-color:rgba(255,255,255,0.8);'></div>")
  $("body").prepend(hide.css("position","fixed").css("height","100%").css("width","100%"));
}
function restart(){
  $("#hide").remove();
}

function createMap(){
  //directions are 8 directions (0-7) from up clockwise.
  var index = 0;
  var mapping = {};
  for(var y = 0; y < size; y++){
    for(var x = 0; x < size; x++){
      //bottom edge
      if((y + 1) % size == 0){
        //right edge
        if((x + 1) % size == 0){
          mapping[index] = {
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
          mapping[index] = {
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
          mapping[index] = {
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
          mapping[index] = {
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
          mapping[index] = {
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
          mapping[index] = {
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
          mapping[index] = {
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
          mapping[index] = {
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
          mapping[index] = {
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
  return mapping;
}

//return index of cell next to current index to specified direction
function getIndexWDirection(index,direction){
  return map[index][direction] + index;
}