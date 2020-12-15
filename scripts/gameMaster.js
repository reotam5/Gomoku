var size = 3;
var connect = 3;
var numPlayers = 2;
var aiMode = true;
var aiID = -1;
var currentP = -1;
board = new Board(size,connect);

$(document).ready(function(){
  $("#loading").hide();
  board.drawBoard($("#gameboard"),"images/gameAssets/unselected.png");
  listenClick();
});

function listenClick(){

  if(aiMode && currentP ==  aiID){
    console.log("Started thinking");
    $("#loading").show();
    setTimeout(() => { 
      var aiMove = parseInt(act(board,aiID)); 
      console.log("Finished thinking");
      $("#loading").hide();
      input(aiMove);
    }, 2000);
    
  }

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
      console.log("Started thinking");
      $("#loading").show();
      setTimeout(() => { 
        var aiMove = parseInt(act(board,aiID)); 
        console.log("Finished thinking");
        $("#loading").hide();
        input(aiMove);
      }, 2000);
      
    }else{
      return;
    }
  });
}

function input(clickedIndex){
  var unselectedCellType = "unselected";
  var playerImg = (currentP == -1)?"images/gameAssets/player0.png":"images/gameAssets/player1.png";

  var x = Math.trunc(clickedIndex%size);
  var y = Math.trunc(clickedIndex/size);
  var targetElement = $("#"+x+"-"+y);
  if(targetElement.hasClass(unselectedCellType)){
    targetElement.removeClass(unselectedCellType).addClass("selected").attr("player",currentP);
    targetElement.children().filter("img").attr("src",playerImg);

    board.input(clickedIndex,currentP);
    let winner = board.isEnd();
    if(board.end){
      exit();
      console.log(winner+" won");
    }
    currentP *= -1;
  }else{
    console.log("not allowed");
  }
  return board;
}

function exit(){
  var hide = $("<div id='hide' style='background-color:rgba(255,255,255,0.8);'></div>")
  $("body").prepend(hide.css("position","fixed").css("height","100%").css("width","100%"));
}
function restart(){
  $("#hide").remove();
}