$(document).ready(function(){

  var size = 3;
  //number of player and starting player ID (third option-> ai id)
  var game = new  Game(size,2,0,1);

  var board = new Board(size,game);
  board.drawBoard($("#gameboard"),"images/gameAssets/unselected.png");

  game.start(board);
});