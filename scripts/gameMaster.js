let size = 3;
let connect = 3;
let aiMode = true;
let aiID = 1;
let currentP = -1;
let iteration = 100;
let players = []

$(document).ready(function(){
  $("#loading").hide();
  $("#endScreen").hide();
  changeSetting();
  $("#playButton").on("click", function(){
    setUp();
    startGame();
  });


});

function changeSetting(){
  $("#endScreen").hide();
  $('#setting').modal('toggle');
}

async function startGame(){
  $("#hide").remove();
  $("#endScreen").hide();
  $('#setting').modal('hide');
    
    board = new Board(size,connect);
    board.drawBoard($("#gameboard"),"images/gameAssets/unselected.png");

    let winner = 0;
    let index = 0;
    while(!board.end && !board.tied){
      await players[index].getMove(board)
      .done(data=>{
        $("#loading").hide();
        input(data);
        winner = board.isEnd();
      });
      index = (index == 0) ? 1:0;
    }
    
    if(board.end){
      exit();
      let name = players[(winner == -1)?0:1].name;
      $("#endMessage").html(name + " Won!!");
    }else if(board.tied){
      exit();
      $("#endMessage").html("Draw");
    }
}

function setUp(){
  size = parseInt(document.getElementById("boardSize").value);
  connect = parseInt(document.getElementById("winCond").value);
  iteration = parseInt(document.getElementById("iteration").value);
  players = []
  players.push(new Player($("#player1AI").is(":checked"), -1, document.getElementById("player1Name").value,iteration));
  players.push(new Player($("#player2AI").is(":checked"), 1,document.getElementById("player2Name").value,iteration));
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
    currentP *= -1;
  }else{
    console.log("not allowed");
  }
  return board;
}

function exit(){
  $("#endScreen").show();
  var hide = $("<div id='hide' style='background-color:rgba(255,255,255,0.8);'></div>")
  $("body").prepend(hide.css("position","fixed").css("height","100%").css("width","100%"));
}
function restart(){
  $("#endScreen").hide();
  $("#hide").remove();
}