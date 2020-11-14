class Game{
  constructor(numPlayers,startinP){
    this.numPlayers = numPlayers;
    this.listPlayers = this.setUpPlayers();
    this.currentP = startinP;
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
  }

  //check every direction
  checkWin(board,status,clickedIndex){
    var targetP = board.checkWhoes(clickedIndex);
    for(var i = 0; i < 8; i++){
      var count = this.checkDirection(board,status,clickedIndex,i,targetP,0);
      if(count >= board.size){
        return true;
      }
    }
    return false;
  }

  //recursively count(helper function for checkWin)
  checkDirection(board,status,index,direction,currentP,count){
    var indexP = board.checkWhoes(index);
    if(indexP == currentP){
      var nextIndex = board.getIndexWDirection(index,direction);
      return this.checkDirection(board,status,nextIndex,direction,indexP,count+1);
    }else{
      return count;
    }
  }

  exit(){
    var hide = $("<div style='background-color:rgba(255,255,255,0.8);'></div>")
    $("body").prepend(hide.css("position","fixed").css("height","100%").css("width","100%"));
  }
}