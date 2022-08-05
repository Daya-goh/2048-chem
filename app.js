import $ from "jquery";
console.log($);
import "./main.css";
/* -------------------------------------------------------------------------- */

/* ------------------------------ game content ------------------------------ */
const game = {
  page: "#start-page",
};

/* ------------------------------- game logic ------------------------------- */
const render = () => {
  $(".page").hide();
  $(game.page).show();
};

/* ----------------------------- page transition ---------------------------- */

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
