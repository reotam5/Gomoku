function win_or_rnd(board,AIID){
  possible_index = possIndex(board.state);
  for(let i = 0; i < possible_index.length; i++){
    targetCell = possible_index[i];
    temp = new Board(board.size,board.connect);
    temp.initiateState(board.state);
    temp.input(targetCell,AIID);
    if(temp.isEnd() == AIID && temp.end){
      return targetCell;
    }
  }
  rnd_int = Math.floor(Math.random() * possible_index.length);
  return possible_index[rnd_int];
}



function possIndex(status){
  indexes = [];
  for(let i = 0; i < status.length; i++){
    if(status[i] == 0){
      indexes.push(i);
    }
  }
  return indexes;
}


function trial(board,AIID,score,move){
  initialMove = move;
  tempBoard = new Board(board.size,board.connect);
  tempBoard.initiateState(board.state);
  currentID = AIID;
  winner = 0;
  let counter = 1;
  while(!tempBoard.end && !tempBoard.tied){
    counter += 1;
    tempBoard.input(move,currentID);
    winner = tempBoard.isEnd();
    currentID = currentID * -1;
    move = win_or_rnd(tempBoard,currentID);
  }

  if(Number.isNaN(score[initialMove])){
    score[initialMove] = 0;
  }
  if(tempBoard.tied){
    score[initialMove] += 0;
  }else if(tempBoard.end && winner == AIID){
    score[initialMove] += 1/counter;
  }else if(tempBoard.end && winner != AIID){
    score[initialMove] -= 1/counter;
  }
}


function act(board,AIID, iteration){
  moves = possIndex(board.state);

  scores = [];
  for (let i = 0; i < board.state.length; i++){
    scores.push(NaN);
  }
  for(let i = 0; i < moves.length; i++){
    for(let n = 0; n < iteration; n++){
      trial(board,AIID,scores,moves[i]);
    }
    scores[moves[i]] /= iteration;
  }
  max = -9999999;
  index = -1;
  for(let i = 0; i < scores.length; i++){
    if(!(Number.isNaN(scores[i])) && scores[i] > max){
      max = scores[i];
      index = i;
    }
  }

  return index;
}
