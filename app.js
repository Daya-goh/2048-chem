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
  constructor(atomicNum, elementName) {
    this.atomicNum = atomicNum;
    this.elementName = elementName;
  }
  newTile = () => {
    //creating a tile div
    let randomContainer = Math.floor(Math.random() * game.positionArray.length);
  
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
  hydrogen.newTile();
};
onStart();
//const helium = new tile(2, "He");

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

pageTransition();
