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
    [0, 0, 0, 0],
    [2, 8, 16, 32],
    [8, 16, 32, 64],
    [16, 32, 64, 128],
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
  //countZero(game.gameBoard);
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
  //countZero(game.gameBoard);
  //checkForLastContainer();
};

const checkForGameOver = () => {
  //when all containers are filled 
  //all tiles cannot merge
  //you lose 
};

const countZero = (gameBoard) => {
  let numOfZero = 0;
  for (let r = 0; r < game.rows; r++) {
    for (let c = 0; c < game.columns; c++) {
      if (game.gameBoard[r][c] === 0) {
        numOfZero++;
      }
    }
  }
  //console.log(numOfZero);
  return numOfZero;
};

const newTile = () => {
  let end = true;
  while (end) {
    let r = Math.round(Math.random() * 3);
    let c = Math.round(Math.random() * 3);
    if (countZero(game.gameBoard) === 1) {
      console.log("index 0-0 " + game.gameBoard[0][0]);

      game.gameBoard[0][0] = 1;
      $("#0-0").addClass("x1").text(1);

      console.log("end1");
      console.log(game.gameBoard);
      end = false;
      //return
      // }
    } else {
      if (game.gameBoard[r][c] === 0) {
        game.gameBoard[r][c] = 1;

        return;
      } else {
        r = Math.round(Math.random() * 3);
        c = Math.round(Math.random() * 3);
      }
    }
    // if tiles left is 1, end the loop
  }
  console.log("ended");
};
/* ------------------------------------------------------------------------------------- */
// https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript -transposing matrix
const transpose = (gameBoardArray) => {
  return gameBoardArray[0].map((col, c) =>
    gameBoardArray.map((row, r) => gameBoardArray[r][c])
  );
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
          rowArray.unshift(0);
          break;
        case "moveUp":
          rowArray.push(0);
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

const moveDown = (rowArray) => {
  for (let i = 3; i >= 0; i--) {
    if (rowArray[i] === rowArray[i - 1]) {
      rowArray[i] = rowArray[i - 1] * 2;
      rowArray[i - 1] = 0;
    }
  }

  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveDown");
  return rowArray;
};

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

/* -------------------- button click -------------------- */
$(".up").on("click", () => {
  const newBoard = transpose(game.gameBoard);
  for (let r = 0; r < game.rows; r++) {
    let rowArray = moveUp(newBoard[r]); //move current row and set it back to current row
    newBoard[r] = rowArray;
    game.gameBoard = transpose(newBoard); //put it back into the grid
  }
  updateGameBoard();
  newTile();
});

$(".down").on("click", () => {
  const newBoard = transpose(game.gameBoard);
  for (let r = 3; r >= 0; r--) {
    let rowArray = moveDown(newBoard[r]); //move current row and set it back to current row
    newBoard[r] = rowArray;
    game.gameBoard = transpose(newBoard); //put it back into the grid
  }
  updateGameBoard();
  newTile();
});

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
