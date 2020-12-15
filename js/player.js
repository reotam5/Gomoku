class Player{
  constructor(AI){
    this.isAI = AI;
  }
  
  getMove(board,ID){
    let index = -1;
    if (this.isAI){
      index = act(board,ID);
    }else{
      index = this.listenOneClick();
    }
    return index;
  }

  listenOneClick(){
    $(".cells").one('click',function(event){
      var targetElement = $(event.currentTarget);
      //extracting x and y to get clicked index
      var targetID = targetElement.attr("id");
      var division = targetID.indexOf("-");
      var x = parseInt(targetID.substring(0,division));
      var y = parseInt(targetID.substring(division+1));
      var clickedIndex = x + (y * size);
      return clickedIndex;
    });
  }
}
  