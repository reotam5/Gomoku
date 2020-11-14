class AI {
  constructor (){

  }

  static move(board,AIID){
    var boardStatus = JSON.parse(JSON.stringify(board.getBoardStatus()));
    var clone = JSON.parse(JSON.stringify(boardStatus));
    clone[0][0] = 30;
    console.log(clone);
    console.log(boardStatus);
    return ;
  }
}