$(document).ready(function(){

  //number of player and starting player ID (third option-> ai id)
  var game = new  Game(2,0,1);

  var board = new Board(3,game);
  board.drawBoard($("#gameboard"),"images/gameAssets/unselected.png");

  game.start(board);
});