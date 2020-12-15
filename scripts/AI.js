function win_or_rnd(status,AIID){
  var possible_index = possIndex(status);
  for(var i = 0; i < possible_index.length; i++){
    var targetCell = possible_index[i];
    var copy = Array.from(status);
    copy[targetCell] = AIID;
    var newStatus = copy;
    if(checkWin(newStatus,targetCell) > -1){
      return targetCell;
    }
  }
  var rnd_int =  Math.floor(Math.random() * possible_index.length);
  return possible_index[rnd_int];
}

//allowed input. status is array format. [0,1,2,3,4,5,...]
function possIndex(status){
  var indexes = [];
  for(var i = 0; i < status.length; i++){
    if(status[i] == null){
      indexes.push(i);
    }
  }
  return indexes;
}

function trial(AIID,score,status,move){
  var copy = Array.from(status);
  copy[move] = AIID;
  var currentID = AIID;
  var tied = false;
  while(checkWin(copy,move) == -1){
    if(!copy.includes(null)){
      tied = true;
      break;
    }
    currentID = getNextPlayer(currentID);
    copy[win_or_rnd(copy,currentID)] = currentID;
  }

  if(tied){
    score[move] += 0;
  }else if(currentID == AIID){
    score[move] += 1;
  }else{
    score -= 1;
  }
}

function act(AIID,status){
  var moves = possIndex(status);
  var iteration = 500;

  scores = {};
  for(var i = 0; i < moves.length; i++){
    scores[moves[i]] = 0;

    for(var n = 0; n < iteration; n++){
      trial(AIID,scores,status,moves[i]);
    }
    scores[moves[i]] /= iteration;
  }
  console.log(scores);
  var max = Number.MIN_SAFE_INTEGER;
  var index = -1;
  for(key in scores){
    if(scores[key] > max){
      max = scores[key];
      index = key;
    }
  }
  return index;
}
