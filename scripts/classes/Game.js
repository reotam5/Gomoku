class Game{
  constructor(numPlayers,startinP,aiID){
    this.numPlayers = numPlayers;
    this.listPlayers = this.setUpPlayers();
    this.currentP = startinP;
    this.AIID = aiID;
  }
  setUpPlayers(){
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
    //AI turn
    if(this.currentP == this.AIID){
      AI.move(this.board,this.AIID);
    }
  }

  //check every direction
  checkWin(board,clickedIndex){
    var targetP = board.checkWhoes(clickedIndex);
    for(var i = 0; i < 8; i++){
      var count = this.checkDirection(board,clickedIndex,i,targetP,0);
      if(count >= board.size){
        return true;
      }
    }
    return false;
  }

  //recursively count(helper function for checkWin)
  checkDirection(board,index,direction,currentP,count){
    var indexP = board.checkWhoes(index);
    if(indexP == currentP){
      var nextIndex = board.getIndexWDirection(index,direction);
      return this.checkDirection(board,nextIndex,direction,indexP,count+1);
    }else{
      return count;
    }
  }

  exit(){
    var hide = $("<div style='background-color:rgba(255,255,255,0.8);'></div>")
    $("body").prepend(hide.css("position","fixed").css("height","100%").css("width","100%"));
  }

  start(board){
    this.board = board;
    board.listenClick();
    // if AI starts first
    if(this.currentP == this.AIID){
      console.log("ai");
    }
  }
}