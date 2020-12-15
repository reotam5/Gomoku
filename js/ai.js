function win_or_rnd(board,AIID){
  possible_index = possIndex(board.state);
  for(let i = 0; i < possible_index.length; i++){
    targetCell = possible_index[i];
    tempBoard = new Board(board.size);
    tempBoard.initiateState(board.state);
    console.log(tempBoard.status)
    tempBoard.input(targetCell,AIID);
    if(tempBoard.isEnd() == AIID && tempBoard.end){
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
  tempBoard = new Board(board.size);
  tempBoard.initiateState(board.state);
  currentID = AIID;
  tied = false;
  counter = 0;
  winner = 0;
  while(!tempBoard.end){
    counter += 1;
    tempBoard.input(move,currentID);
    winner = tempBoard.isEnd();
    if(possIndex(tempBoard.state).length == 0){
      tied = true;
      break;
    }
    currentID = currentID * -1;
    move = win_or_rnd(tempBoard,currentID);
  }
  if(score[initialMove] == NaN){
    score[initialMove] = 0;
  }
  if(tied){
    score[initialMove] += 0;
  }else if(winner == AIID){
    score[initialMove] += 1;
  }else {
    score[initialMove] -= 1;
  }
}


function act(board,AIID){
  moves = possIndex(board.state);
  
  iteration = 1;

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

  console.log(scores);
  max = -9999999;
  index = -1;
  for(let i = 0; i < scores.length; i++){
    if(!(scores[i] == NaN) && scores[i] > max){
      max = scores[i];
      index = i;
    }
  }

  return index;
}
