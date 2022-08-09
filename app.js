import $ from "jquery";
console.log($);
import "./main.css";

/* ------------------------------------------------------ */

/* ------------------------------------------------------ */
/*                      game content                      */
/* ------------------------------------------------------ */
const game = {
  page: "#game-page",
  rows: 4,
  columns: 4,
  // gameBoard: [
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  // ],
  gameBoard: [
    [2, 2, 2, 2],
    [4, 4, 8, 4],
    [4, 4, 2, 2],
    [0, 0, 16, 16],
  ],
};

/* ------------------------------------------------------ */
/*                        game play                       */
/* ------------------------------------------------------ */
const renderGameBoard = () => {
  startTile();
  startTile();
  createBoard();
};

const createBoard = () => {
  for (let r = 0; r < game.rows; r++) {
    for (let c = 0; c < game.columns; c++) {
      const $tile = $("<div>").attr("id", r.toString() + "-" + c.toString());
      $tile.addClass("tile");
      let num = game.gameBoard[r][c]; //adding numbers from gameBoard to tiles
      $tile.addClass("x" + num);
      if (num !== 0) {
        $tile.text(num);
      }
      //$tile.text(num);
      $(".grid-container").append($tile);
    }
  }
};

const startTile = () => {
  while (true) {
    let r = Math.round(Math.random() * 3);
    let c = Math.round(Math.random() * 3);
    if (game.gameBoard[r][c] === 0) {
      game.gameBoard[r][c] = 2;
      return;
    } else {
      r = Math.round(Math.random() * 3);
      c = Math.round(Math.random() * 3);
    }
  }
};

const mergeTile = () => {};

//move left
// clear zero for 1 row
const clearZeroTiles = (rowArray) => {
  return rowArray.filter((num) => num !== 0); //return array
};

// put zero back
const putZeroBack = (rowArray) => {
  for (let i = 0; i < game.columns; i++) {
    if (rowArray.length < game.columns) {
      console.log("test");
      rowArray.push(0);
    }
  }
  return rowArray;
};
// console.log(putZeroBack([2, 4]));
// reference source https://www.youtube.com/watch?v=XM2n1gu4530&t=1031s -> slide code idea/concept
// for every row
// clear zero for each row
// merge
// clear zero
// put zero back
const move = (rowArray) => {
  rowArray = clearZeroTiles(rowArray);
  for (let i = 0; i < rowArray.length - 1; i++) {
    if (rowArray[i] === rowArray[i + 1]) {
      rowArray[i] = rowArray[i] * 2;
      rowArray[i + 1] = 0;
    }
  }
  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray);
  return rowArray;
};

console.log(move([2, 4, 2, 2]));

//button click
//  $(".right").on("click", () => {
//  //move right

// /*--for each row--*/
//   for (let r = 0; r < game.rows; r++) {
//      let row = game.gameBoard[r];
//      row = move(row); //move current row and set it back to current row
//      game.gameBoard[r] = row; //put it back into the grid
//    }
//  });

/* ------------------- page transition ------------------ */
const render = () => {
  $(".page").hide();
  $(game.page).show();
};
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
renderGameBoard();
