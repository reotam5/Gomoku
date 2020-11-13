class Game{
  constructor(numPlayers,startinP){
    this.numPlayers = numPlayers;
    this.listPlayers = this.setUpPlayers();
    this.currentP = startinP;
  }
  setUpPlayers(){
    var pathToCellImg = "images/gameAssets/";
    var numPlayers = this.numPlayers;

    var listPlayers = {};
    for(var i = 0; i < numPlayers; i++){
      listPlayers[i] = new Player(i);
    }
    return listPlayers;
  }

  getNextPlayer(){
    if(this.currentP < (this.numPlayers - 1)){
      this.currentP += 1;
    }else{
      this.currentP = 0;
    }
  }

  checkWin(board,status,clickedIndex){
    console.log(board.getIndexWDirection(clickedIndex,7));
  }
}