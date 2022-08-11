import $ from "jquery";
console.log($);
import "./main.css";

/* ------------------------------------------------------ */

/* ------------------------------------------------------ */
/*                      game content                      */
/* ------------------------------------------------------ */
const renderGameBoard = () => {
  newTile();
  newTile();
  createBoard();
};
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
    [0, 0, 0, 0],
    [2, 8, 16, 32],
    [8, 16, 32, 64],
    [16, 32, 64, 128],
  ],
};

/* --------------------- game board --------------------- */
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
  checkForGameOver();
};

/* --------------- checking for game over --------------- */
const checkForGameOver = () => {
  //when all containers are filled
  if (checkZero(game.gameBoard) === 0 && !(checkColumn() || checkRow())) {
    //if any checkColumn or checkRow is true, ! will make it false
    alert("You lose!");
    $(".left").prop("disabled", true);
    $(".right").prop("disabled", true);
    $(".up").prop("disabled", true);
    $(".down").prop("disabled", true);
  }
};

const checkRow = () => {
  let validMove = false;
  for (let c = 0; c < game.columns; c++) {
    for (let r = 0; r < game.rows - 1; r++) {
      if (game.gameBoard[c][r] === 1 && game.gameBoard[c][r + 1] === 0) {
        validMove = true;
      } else if (game.gameBoard[c][r] === 0 && game.gameBoard[c][r + 1] === 1) {
        validMove = true;
      } else if (
        game.gameBoard[c][r] > 0 &&
        game.gameBoard[c][r] === game.gameBoard[c][r + 1]
      ) {
        validMove = true;
      }
    }
  }
  return validMove;
};

const checkColumn = () => {
  let validMove = false;
  for (let r = 0; r < game.rows; r++) {
    for (let c = 0; c < game.columns - 1; c++) {
      if (game.gameBoard[c][r] === 1 && game.gameBoard[c + 1][r] === 0) {
        validMove = true;
      } else if (game.gameBoard[c][r] === 0 && game.gameBoard[c + 1][r] === 1) {
        validMove = true;
      } else if (
        game.gameBoard[c][r] > 0 &&
        game.gameBoard[c][r] === game.gameBoard[c + 1][r]
      ) {
        validMove = true;
      }
    }
  }

  return validMove;
};

const checkZero = (gameBoard) => {
  let numOfZero = 0;
  for (let r = 0; r < game.rows; r++) {
    for (let c = 0; c < game.columns; c++) {
      if (game.gameBoard[r][c] === 0) {
        numOfZero++;
      }
    }
  }
  return numOfZero;
};

/* ------------------ adding new tiles ------------------ */
const newTile = () => {
  let end = true;
  while (end) {
    let r = Math.round(Math.random() * 3);
    let c = Math.round(Math.random() * 3);

    if (checkZero(game.gameBoard) === 1) {
      for (let r = 0; r < game.rows; r++) {
        for (let c = 0; c < game.columns; c++) {
          if (game.gameBoard[r][c] === 0) {
            game.gameBoard[r][c] = 1;
            $("#" + r.toString() + "-" + c.toString())
              .addClass("x1")
              .text(game.gameBoard[r][c]);
          }
        }
      }
      end = false;
      return;
    } else if (game.gameBoard[r][c] === 0) {
      game.gameBoard[r][c] = 1;
      return;
    } else {
      r = Math.round(Math.random() * 3);
      c = Math.round(Math.random() * 3);
    }
  }
};

/* ------------------------------------------------------ */
/*                        game play                       */
/* ------------------------------------------------------ */
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
          rowArray.unshift(0);
          break;
        case "moveUp":
          rowArray.push(0);
          break;
      }
    }
  }
  return rowArray;
};

// https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript -transposing matrix
const transpose = (gameBoardArray) => {
  return gameBoardArray[0].map((col, c) =>
    gameBoardArray.map((row, r) => gameBoardArray[r][c])
  );
};

/* ---------------------- move left --------------------- */
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
$(".left").on("click", () => {
  for (let r = 0; r < game.rows; r++) {
    let rowArray = moveLeft(game.gameBoard[r]); //move current row and set it back to current row
    game.gameBoard[r] = rowArray; //put it back into the grid
  }
  newTile();
  updateGameBoard();
});

/* --------------------- move right --------------------- */
const moveRight = (rowArray) => {
  rowArray = clearZeroTiles(rowArray);

  for (let i = rowArray.length; i > 0; i--) {
    if (rowArray[i] === rowArray[i - 1]) {
      rowArray[i] = rowArray[i - 1] * 2;
      rowArray[i - 1] = 0;
    }
  }

  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveRight");
  return rowArray;
};

$(".right").on("click", () => {
  for (let r = game.rows - 1; r >= 0; r--) {
    let rowArray = moveRight(game.gameBoard[r]); //move current row and set it back to current row
    game.gameBoard[r] = rowArray; //put it back into the grid
  }
  newTile();
  updateGameBoard();
});

/* ---------------------- move down --------------------- */
const moveDown = (rowArray) => {
  rowArray = clearZeroTiles(rowArray);
  for (let i = rowArray.length; i > 0; i--) {
    if (rowArray[i] === rowArray[i - 1]) {
      rowArray[i] = rowArray[i - 1] * 2;
      rowArray[i - 1] = 0;
    }
  }

  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveDown");
  return rowArray;
};

$(".down").on("click", () => {
  const newBoard = transpose(game.gameBoard);
  for (let r = 3; r >= 0; r--) {
    let rowArray = moveDown(newBoard[r]); //move current row and set it back to current row
    newBoard[r] = rowArray;
    game.gameBoard = transpose(newBoard); //put it back into the grid
  }
  newTile();
  updateGameBoard();
});

/* ----------------------- move up ---------------------- */
const moveUp = (rowArray) => {
  rowArray = clearZeroTiles(rowArray);

  for (let i = 0; i < rowArray.length; i++) {
    if (rowArray[i] === rowArray[i + 1]) {
      rowArray[i] = rowArray[i + 1] * 2;
      rowArray[i + 1] = 0;
    }
  }

  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveUp");
  return rowArray;
};

$(".up").on("click", () => {
  const newBoard = transpose(game.gameBoard);
  for (let r = 0; r < game.rows; r++) {
    let rowArray = moveUp(newBoard[r]); //move current row and set it back to current row
    newBoard[r] = rowArray;
    game.gameBoard = transpose(newBoard); //put it back into the grid
  }
  newTile();
  updateGameBoard();
});
/* -------------------- reset button -------------------- */
$(".reset-button").on("click", () => {
  //reset game board to zero
  //activate all buttons
  //update board
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
