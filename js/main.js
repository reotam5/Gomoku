size = 4;
board = new Board(size);
board.drawBoard();
currentID = -1;
players = [new Player(false), new Player(false)];
console.log(board.state)
board.drawBoard();
while(!board.end){

  let player = (currentID == -1)?players[0]:players[1];
  let target = player.getMove(board,currentID);
  console.log("Choosen Move: " + target);
  target = player.getMove(board,currentID);
  board.input(target,currentID) == NaN
  console.log("");
  board.drawBoard();
  winner = board.isEnd();
  currentID *= -1;
}
console.log("winner is " + winner);