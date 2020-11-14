$(document).ready(function(){

  //number of player and starting player ID
  var game = new  Game(2,0);

  var board = new Board(3,game);
  board.drawBoard($("#gameboard"),"images/gameAssets/unselected.png");
  board.listenClick();
});