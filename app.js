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
  newTile();
  newTile();
  createBoard();
};

const createBoard = () => {
  for (let r = 0; r < game.rows; r++) {
    for (let c = 0; c < game.columns; c++) {
      let $tile = $("<div>").attr("id", r.toString() + "-" + c.toString());
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

const updateGameBoard = () => {
  $(".tile").empty();
  $(".tile").attr("class", "tile");

  for (let r = 0; r < game.rows; r++) {
    for (let c = 0; c < game.columns; c++) {
      if (game.gameBoard[r][c] > 0) {
        $("#" + r.toString() + "-" + c.toString()).text(game.gameBoard[r][c]);

        $("#" + r.toString() + "-" + c.toString()).addClass(
          "x" + game.gameBoard[r][c].toString()
        );
      }
    }
  }
};

const newTile = () => {
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

//move left
// clear zero for 1 row
const clearZeroTiles = (rowArray) => {
  return rowArray.filter((num) => num !== 0); //return array
};

//put zero back

const putZeroBack = (rowArray, arrayMovement) => {
  for (let i = 0; i < game.columns; i++) {
    if (rowArray.length < game.columns) {
      switch (arrayMovement) {
        case "moveLeft":
          rowArray.push(0);
          break;
        case "moveRight":
          rowArray.unshift(0);
          break;
        case "moveDown":
          rowArray.push(0);
          break;
      }
    }
  }
  return rowArray;
};

// for every row
// clear zero for each row
// merge
// clear zero
// put zero back

const moveLeft = (rowArray) => {
  rowArray = clearZeroTiles(rowArray);

  for (let i = 0; i < rowArray.length; i++) {
    if (rowArray[i] === rowArray[i + 1]) {
      rowArray[i] = rowArray[i + 1] * 2;
      rowArray[i + 1] = 0;
    }
  }

  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveLeft");
  return rowArray;
};

const moveRight = (rowArray) => {
  for (let i = 3; i >= 0; i--) {
    if (rowArray[i] === rowArray[i - 1]) {
      rowArray[i] = rowArray[i - 1] * 2;
      rowArray[i - 1] = 0;
    }
  }

  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveRight");
  return rowArray;
};

// https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript -transposing matrix

//button click
$(".left").on("click", () => {
  for (let r = 0; r < game.rows; r++) {
    let rowArray = moveLeft(game.gameBoard[r]); //move current row and set it back to current row
    game.gameBoard[r] = rowArray; //put it back into the grid
  }
  updateGameBoard();
  newTile();
});

$(".right").on("click", () => {
  for (let r = 3; r >= 0; r--) {
    let rowArray = moveRight(game.gameBoard[r]); //move current row and set it back to current row
    game.gameBoard[r] = rowArray; //put it back into the grid
  }
  updateGameBoard();
  newTile();
});

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
    game.page = "#score-page";
    render();
  });

  $(".retry-button").on("click", () => {
    game.page = "#score-page";
    render();
  });

  $(".home-button").on("click", () => {
    game.page = "#start-page";
    render();
  });
  render();
};

pageTransition();
renderGameBoard();
