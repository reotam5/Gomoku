class Board {
  constructor(size) {
    this.size = size;
    this.end = false;
    this.map = this.createMap();
    this.state = [];
    for (let i = 0; i < (size * size); i++) {
      this.state.push(0);
    }
  }

  initiateState(state) {
    this.state = JSON.parse(JSON.stringify(state));
  }

  input(pos, ID) {
    if (pos >= 0 && pos < (this.size * this.size)) {
      if (this.state[pos] == 0) {
        this.state[pos] = ID;
        return this.state;
      } else {
        console.log("ID: " + ID + "   " + pos + " is already taken.");
        return NaN;
      }
    } else if (pos == -1) {
      console.log("Passed");
      return this.state;
    } else {
      console.log("invalid position");
      return NaN;
    }
  }

  drawBoard() {
    var rowElement;
    //goes through y axis
    for (var y = 0; y < size; y++) {
      rowElement = $("<div class='board-row'></div>");
      //goes through x axis
      for (var x = 0; x < size; x++) {
        var cellElement = $("<div type='button' id='" + x + "-" + y + "' class='cells unselected'><img src='images/gameAssets/unselected.png'></div>");
        rowElement = rowElement.append(cellElement);
      }
      $("#gameboard").append(rowElement);
    }
  }

  isEnd() {
    let max = 0;
    let leadID = 0;
    for (let i = 0; i < this.size * this.size; i++) {
      let targetID = this.state[i];
      if (targetID == 0) {
        continue;
      }

      for (let d = 0; d < 8; d++) {
        let counter = 1;
        let currentPos = i;
        while (targetID == this.getID(this.getNextPos(currentPos, d))) {
          counter += 1;
          currentPos = this.getNextPos(currentPos, d);
        }

        if (counter > max) {
          max = counter;
          leadID = targetID;
          if (counter >= this.size) {
            this.end = true;
            return leadID;
          }
        }
      }
    }
    return leadID;
  }


  getID(pos) {
    if (pos >= 0 && pos < (this.size * this.size)) {
      return this.state[pos];
    }
    return 0;
  }


  getNextPos(pos, direction) {
    let toReturn = (this.map[pos][direction] != NaN) ? (this.map[pos][direction] + pos) : -1;
    return toReturn;
  }



  createMap() {
    //directions are 8 directions (0-7) from up clockwise.
    var index = 0;
    var mapping = [];
    for (let i = 0; i < this.size * this.size; i++) {
      mapping.push([]);
    }
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        //bottom edge
        if ((y + 1) % size == 0) {
          //right edge
          if ((x + 1) % size == 0) {
            mapping[index] = [-size, NaN, NaN, NaN, NaN, NaN, -1, -(size + 1)]

            //left edge
          } else if (x == 0) {
            mapping[index] = [-size, -(size - 1), +1, NaN, NaN, NaN, NaN, NaN]

            //other safe places
          } else {
            mapping[index] = [-size, -(size - 1), +1, NaN, NaN, NaN, -1, -(size + 1)]
          }

          //top edge
        } else if (y == 0) {
          //right edge
          if ((x + 1) % size == 0) {
            mapping[index] = [NaN, NaN, NaN, NaN, size, size - 1, -1, NaN]

            //left edge
          } else if (x == 0) {
            mapping[index] = [NaN, NaN, +1, size + 1, size, NaN, NaN, NaN]

            //other safe places
          } else {
            mapping[index] = [NaN, NaN, +1, size + 1, size, size - 1, -1, NaN]
          }

          //other safe places
        } else {
          //right edge
          if ((x + 1) % size == 0) {
            mapping[index] = [-size, NaN, NaN, NaN, size, size - 1, -1, -(size + 1)]

            //left edge
          } else if (x == 0) {
            mapping[index] = [-size, -(size - 1), +1, size + 1, size, NaN, NaN, NaN]

            //other safe places
          } else {
            mapping[index] = [-size, -(size - 1), +1, size + 1, size, size - 1, -1, -(size + 1)]
          }
        }
        index++;
      }
    }
    return mapping;
  }

}