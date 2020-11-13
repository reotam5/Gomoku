class Player{
  constructor(id){
    var playerID = "player"+id;
    return {
      playerID: playerID,
      img: "images/gameAssets/"+playerID+".png"
    }
  }
}