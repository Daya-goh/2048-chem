import $ from "jquery";
console.log($);
import "./main.css";

/* ------------------------------------------------------ */

/* ------------------------------------------------------ */
/*                      game content                      */
/* ------------------------------------------------------ */
const game = {
  page: "#game-page",
  // index correspond to position of grid-cells
  positionArray: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
};
/* ----------------- generate random tile ----------------- */

/* ---- pick a random grid cell container --- */

//creating a tile
class tile {
  constructor(atomicNum, elementName, position) {
    this.atomicNum = atomicNum;
    this.elementName = elementName;
    this.position = -1;
  }
  newTile = () => {
    //creating a tile div
    let randomContainer = Math.floor(Math.random() * game.positionArray.length);
    this.position = randomContainer;
    console.log(randomContainer);
    while (true) {
      if (game.positionArray[randomContainer] === false) {
        const $tile = $("<div>").addClass("tile");
        $(".grid-cell").eq(randomContainer).append($tile);
        const $atomicNum = $("<div>")
          .addClass("atomicNum")
          .text(this.atomicNum);
        $tile.append($atomicNum);
        const $elementName = $("<div>")
          .addClass("element")
          .text(this.elementName);
        $atomicNum.append($elementName);

        //set condition to true
        game.positionArray[randomContainer] = true;
        console.log(game.positionArray);
        return;
      } else {
        randomContainer = Math.floor(Math.random() * game.positionArray.length);
      }
    }
  };
} //if all 9 containers are filled, the loop will not exit. must
//account for it later.

const hydrogen = new tile(1, "H");

const onStart = () => {
  hydrogen.newTile();
  //hydrogen.newTile();
};
onStart();

console.log(hydrogen.position);
const helium = new tile(2, "He");
//helium.newTile();
/* ------------------------------------------------------ */
/*                       game logic                       */
/* ------------------------------------------------------ */
//update screen
const render = () => {
  $(".page").hide();
  $(game.page).show();
};

/* ------------------------------------------------------ */
/*                        game play                       */
/* ------------------------------------------------------ */

/* ------------------- page transition ------------------ */
const pageTransition = () => {
  $(".start-button").on("click", () => {
    game.page = "#game-page";
    render();
  });

  $(".score-button").on("click", () => {
    console.log("score-board click");
    game.page = "#score-page";
    render();
  });

  $(".retry-button").on("click", () => {
    game.page = "#score-page";
    render();
  });

  $(".home-button").on("click", () => {
    console.log("click home");
    game.page = "#start-page";
    render();
  });
  render();
};
console.log();
pageTransition();

const moveDown = () => {
  $(".down").on("click", () => {
    console.log("click");
    if (
      game.positionArray[6] === true ||
      game.positionArray[7] === true ||
      game.positionArray[8] === true
    ) {
      $(".tile").appendTo($(".grid-cell").eq(hydrogen.position));
      console.log("I cannot move");
    } else {
      $(".tile").appendTo($(".grid-cell").eq(hydrogen.position + 3));
      game.positionArray[hydrogen.position] = false;
      hydrogen.position = hydrogen.position + 3;
      game.positionArray[hydrogen.position] = true;
      console.log(hydrogen);
      console.log(game.positionArray);
    }
  });
};

moveDown();

const moveUp = () => {
  $(".up").on("click", () => {
    console.log("click");
    if (
      game.positionArray[0] === true ||
      game.positionArray[1] === true ||
      game.positionArray[2] === true
    ) {
      $(".tile").appendTo($(".grid-cell").eq(hydrogen.position));
      console.log("I cannot move");
    } else {
      $(".tile").appendTo($(".grid-cell").eq(hydrogen.position - 3));
      game.positionArray[hydrogen.position] = false;
      hydrogen.position = hydrogen.position - 3;
      game.positionArray[hydrogen.position] = true;
      console.log(hydrogen);
      console.log(game.positionArray);
    }
  });
};

moveUp();

const moveRight = () => {
  $(".right").on("click", () => {
    console.log("click");
    if (
      game.positionArray[2] === true ||
      game.positionArray[5] === true ||
      game.positionArray[8] === true
    ) {
      $(".tile").appendTo($(".grid-cell").eq(hydrogen.position));
      console.log("I cannot move");
    } else {
      $(".tile").appendTo($(".grid-cell").eq(hydrogen.position + 1));
      game.positionArray[hydrogen.position] = false;
      hydrogen.position = hydrogen.position + 1;
      game.positionArray[hydrogen.position] = true;
      console.log(hydrogen);
      console.log(game.positionArray);
    }
  });
};

moveRight();

const moveLeft = () => {
  $(".left").on("click", () => {
    console.log("click");
    if (
      game.positionArray[0] === true ||
      game.positionArray[3] === true ||
      game.positionArray[6] === true
    ) {
      $(".tile").appendTo($(".grid-cell").eq(hydrogen.position));
      console.log("I cannot move");
    } else {
      $(".tile").appendTo($(".grid-cell").eq(hydrogen.position - 1));
      game.positionArray[hydrogen.position] = false;
      hydrogen.position = hydrogen.position - 1;
      game.positionArray[hydrogen.position] = true;
      console.log(hydrogen);
      console.log(game.positionArray);
    }
  });
};

moveLeft();
