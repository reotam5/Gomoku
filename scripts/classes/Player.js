class Player{
  constructor(id,name){
    var playerID = "player"+id;
    return {
      playerID: playerID,
      img: "images/gameAssets/"+playerID+".png",
      name: name
    }
  }
}