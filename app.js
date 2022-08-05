import $ from "jquery";
console.log($);
import "./main.css";
/* -------------------------------------------------------------------------- */

/* ------------------------------ game content ------------------------------ */
const game = {
  page: "#game-page",
};

/* ------------------------------- game logic ------------------------------- */
//update screen
const render = () => {
  $(".page").hide();
  $(game.page).show();
};

/* ----------- generate random tile ----------- */
/* ---------- pick a random grid cell container --------- */

const randomContainer = Math.ceil(Math.random() * 9);
console.log(randomContainer);
//creating a tile
class tile {
  constructor(atomicNum, element) {
    this.atomicNum = atomicNum;
    this.element = element;

    //creating a tile div
    const $tile = $("<div>").addClass("tile");
    $(".grid-cell").eq(randomContainer).append($tile);

    const $atomicNum = $("<div>").addClass("atomicNum").text(this.atomicNum);
    $tile.append($atomicNum);
    const $element = $("<div>").addClass("element").text(this.element);
    $atomicNum.append($element);
  }
}
const hydrogen = new tile(1, "H");
//const helium = new tile(2, "He");

// //creating a tile div
// const $tile = $("<div>").addClass("tile");
// $(".cell-1").append($tile);

// const $atomicNum = $("<div>").addClass("atomicNum").text(hydrogen.atomicNum);
// $tile.append($atomicNum);
// const $element = $("<div>").addClass("element").text(hydrogen.element);
// $atomicNum.append($element);

// console.log(hydrogen);


/* -------------------------------- game play ------------------------------- */

/* ------------- page transition ------------- */
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
