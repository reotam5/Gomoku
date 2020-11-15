class Game{
  constructor(size,numPlayers,startinP,aiID){
    this.size = size;
    this.numPlayers = numPlayers;
    this.listPlayers = this.setUpPlayers();
    this.currentP = startinP;
    if(aiID != null){
      this.AIID = aiID;
      this.ai = new AI(size);
    }
  }
  setUpPlayers(){
    var numPlayers = this.numPlayers;

    var listPlayers = {};
    for(var i = 0; i < numPlayers; i++){
      listPlayers[i] = new Player(i);
    }
    return listPlayers;
  }

  getNextPlayer(board){
    if(this.currentP < (this.numPlayers - 1)){
      this.currentP += 1;
    }else{
      this.currentP = 0;
    }
    //AI turn
    if(this.currentP == this.AIID){
      var input = this.ai.win_or_rnd(this.board,this.AIID);
      var x = Math.trunc(input%this.size);
      var y = Math.trunc(input/this.size);
      board.input($("#"+x+"-"+y));
    }
  }

  getOpposite(direction){
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

  getEdgeIndex(status,index,direction,currentP,preInd){
    var indexP = status[index];
    console.log("indexP: "+indexP);
    console.log("currentP: "+currentP);
    if(indexP == currentP){
      var nextIndex = this.ai.getIndexWDirection(index,direction);
      return this.getEdgeIndex(status,nextIndex,direction,indexP,index);
    }else{
      return preInd;
    }
  }

  //check every direction
  checkWin(board,clickedIndex){
    var status = board.convertTArr(board.getBoardStatus());

    var targetP = board.checkWhoes(clickedIndex);
    for(var i = 0; i < 1; i++){
      var edgeIndex = this.getEdgeIndex(status,clickedIndex,i,targetP);
      console.log("direction: "+i);
      console.log("index: "+clickedIndex);
      console.log("edge: "+edgeIndex);
      console.log("");
      var count = this.checkDirection(board,edgeIndex,this.getOpposite(i),targetP,0);
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
    var hide = $("<div id='hide' style='background-color:rgba(255,255,255,0.8);'></div>")
    $("body").prepend(hide.css("position","fixed").css("height","100%").css("width","100%"));
  }
  restart(){
    $("#hide").remove();
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