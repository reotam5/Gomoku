class Player{
  constructor(isAI,id,name,iteration){
    this.isAI = isAI;
    this.id = id;
    this.name = name;
    this.iteration = iteration;
  }

  getMove(board){
    let d = new $.Deferred();
    if(this.isAI){
      $("#loading").show();
      setTimeout(() => {  
        d.resolve(parseInt(act(board,this.id,this.iteration))); 
      }, 200);

    }else{
      $(".cells").on('click',function(event){
        var targetElement = $(event.currentTarget);
        //extracting x and y to get clicked index
        var targetID = targetElement.attr("id");
        var division = targetID.indexOf("-");
        var x = parseInt(targetID.substring(0,division));
        var y = parseInt(targetID.substring(division+1));
        var clickedIndex = x + (y * size);
        if(possIndex(board.state).includes(clickedIndex)){
          d.resolve(clickedIndex);
        }
      });
    }
    return d.promise();
  }
}