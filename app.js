import $, { event } from "jquery";
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
  createElement();
};
const game = {
  page: "#start-page",
  rows: 4,
  columns: 4,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  // gameBoard: [
  //   [0, 0, 0, 0],
  //   [2, 8, 16, 32],
  //   [8, 16, 32, 39],
  //   [16, 32, 33, 39],
  // ],
  elements: [
    { atomicNum: 1, elementName: "H" },
    { atomicNum: 2, elementName: "He" },
    { atomicNum: 3, elementName: "Li" },
    { atomicNum: 4, elementName: "Be" },
    { atomicNum: 5, elementName: "B" },
    { atomicNum: 6, elementName: "C" },
    { atomicNum: 7, elementName: "N" },
    { atomicNum: 8, elementName: "O" },
    { atomicNum: 9, elementName: "F" },
    { atomicNum: 10, elementName: "Ne" },
    { atomicNum: 11, elementName: "Na" },
    { atomicNum: 12, elementName: "Mg" },
    { atomicNum: 13, elementName: "Al" },
    { atomicNum: 14, elementName: "Si" },
    { atomicNum: 15, elementName: "P" },
    { atomicNum: 16, elementName: "S" },
    { atomicNum: 17, elementName: "Cl" },
    { atomicNum: 18, elementName: "Ar" },
    { atomicNum: 19, elementName: "K" },
    { atomicNum: 20, elementName: "Ca" },
    { atomicNum: 21, elementName: "Sc" },
    { atomicNum: 22, elementName: "Ti" },
    { atomicNum: 23, elementName: "V" },
    { atomicNum: 24, elementName: "Cr" },
    { atomicNum: 25, elementName: "Mn" },
    { atomicNum: 26, elementName: "Fe" },
    { atomicNum: 27, elementName: "Co" },
    { atomicNum: 28, elementName: "Ni" },
    { atomicNum: 29, elementName: "Cu" },
    { atomicNum: 30, elementName: "Zn" },
    { atomicNum: 31, elementName: "Ga" },
    { atomicNum: 32, elementName: "Ge" },
    { atomicNum: 33, elementName: "As" },
    { atomicNum: 34, elementName: "Se" },
    { atomicNum: 35, elementName: "Br" },
    { atomicNum: 36, elementName: "Kr" },
    { atomicNum: 37, elementName: "Rb" },
    { atomicNum: 38, elementName: "Sr" },
    { atomicNum: 39, elementName: "Y" },
    { atomicNum: 40, elementName: "Zr" },
  ],
  gameNotOver: true,
};

/* --------------------- game board --------------------- */
const createBoard = () => {
  for (let r = 0; r < game.rows; r++) {
    for (let c = 0; c < game.columns; c++) {
      let $tile = $("<div>").attr("id", r.toString() + "-" + c.toString());
      $tile.addClass("tile");
      let num = game.gameBoard[r][c]; //adding numbers from gameBoard to tiles
      $tile.addClass("x" + num);
      // if (num !== 0) {
      //   $tile.text(num);
      // }
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
        $("#" + r.toString() + "-" + c.toString());
        $("#" + r.toString() + "-" + c.toString()).addClass(
          "x" + game.gameBoard[r][c].toString()
        );
      }
    }
  }
  createElement();
  checkForWin();
  checkForGameOver();
};

/* ------------------ creating elements ----------------- */

class element {
  constructor(atomicNum, elementName) {
    this.atomicNum = atomicNum;
    this.elementName = elementName;

    //creating a tile face div
    const $element = $("<div>").addClass("element");

    const $atomicNum = $("<div>").addClass("atomicNum").text(this.atomicNum);
    $element.append($atomicNum);
    const $elementName = $("<div>")
      .addClass("elementName")
      .text(this.elementName);
    $atomicNum.append($elementName);

    for (let r = 0; r < game.rows; r++) {
      for (let c = 0; c < game.columns; c++) {
        $(".x" + this.atomicNum.toString()).append($element);
        return;
      }
    }
  }
}

const createElement = () => {
  for (let i = 0; i < game.elements.length; i++) {
    new element(game.elements[i].atomicNum, game.elements[i].elementName);
  }
};

/* --------------- checking for game over --------------- */
const checkForGameOver = () => {
  //when all containers are filled
  if (checkZero(game.gameBoard) === 0 && !(checkColumn() || checkRow())) {
    //if any checkColumn or checkRow is true, ! will make it false
    setTimeout(function () {
      alert("You lose!");
    }, 100);
    //onKeyDown(event);
    game.gameNotOver = false;
  }
};

/* ----------------- check for game win ----------------- */
const checkForWin = () => {
  for (let r = 0; r < game.rows; r++) {
    for (let c = 0; c < game.columns; c++) {
      if (game.gameBoard[r][c] === 40) {
        setTimeout(function () {
          alert("You win!");
        }, 100);
      }
    }
  }
};

/* ------------------------------------------------------ */
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

/* --------------------- clear zeros -------------------- */
const clearZeroTiles = (rowArray) => {
  return rowArray.filter((num) => num !== 0); //return array
};

/* -------------------- put zero back ------------------- */
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
/* ------------------ transposing board ----------------- */
const transpose = (gameBoardArray) => {
  return gameBoardArray[0].map((col, c) =>
    gameBoardArray.map((row, r) => gameBoardArray[r][c])
  );
};

/* ------------------------ slide ----------------------- */

const slideLeft = (rowArray) => {
  rowArray = clearZeroTiles(rowArray);
  for (let i = 0; i < rowArray.length; i++) {
    if (rowArray[i] === rowArray[i + 1]) {
      rowArray[i] = rowArray[i + 1] + 1;
      rowArray[i + 1] = 0;
    }
  }
  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveLeft");
  return rowArray;
};

const slideRight = (rowArray) => {
  rowArray = clearZeroTiles(rowArray);

  for (let i = rowArray.length; i > 0; i--) {
    if (rowArray[i] === rowArray[i - 1]) {
      rowArray[i] = rowArray[i - 1] + 1;
      rowArray[i - 1] = 0;
    }
  }

  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveRight");
  return rowArray;
};

const slideDown = (rowArray) => {
  rowArray = clearZeroTiles(rowArray);
  for (let i = rowArray.length; i > 0; i--) {
    if (rowArray[i] === rowArray[i - 1]) {
      rowArray[i] = rowArray[i - 1] + 1;
      rowArray[i - 1] = 0;
    }
  }

  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveDown");
  return rowArray;
};

const slideUp = (rowArray) => {
  rowArray = clearZeroTiles(rowArray);

  for (let i = 0; i < rowArray.length; i++) {
    if (rowArray[i] === rowArray[i + 1]) {
      rowArray[i] = rowArray[i + 1] + 1;
      rowArray[i + 1] = 0;
    }
  }

  rowArray = clearZeroTiles(rowArray);
  putZeroBack(rowArray, "moveUp");
  return rowArray;
};
/* ------------------------------------------------------ */
window.addEventListener("keydown", (e) => {
  if (game.gameNotOver) {
    switch (e.code) {
      case "ArrowLeft":
        for (let r = 0; r < game.rows; r++) {
          let rowArray = slideLeft(game.gameBoard[r]); //move current row and set it back to current row
          game.gameBoard[r] = rowArray; //put it back into the grid
        }
        newTile();
        updateGameBoard();

        break;

      case "ArrowRight":
        for (let r = game.rows - 1; r >= 0; r--) {
          let rowArray = slideRight(game.gameBoard[r]); //move current row and set it back to current row
          game.gameBoard[r] = rowArray; //put it back into the grid
        }
        newTile();
        updateGameBoard();
        break;

      case "ArrowDown":
        const newBoard = transpose(game.gameBoard);
        for (let r = game.rows - 1; r >= 0; r--) {
          let rowArray = slideDown(newBoard[r]); //move current row and set it back to current row
          newBoard[r] = rowArray;
          game.gameBoard = transpose(newBoard); //put it back into the grid
        }
        newTile();
        updateGameBoard();
        break;

      case "ArrowUp":
        const newBoard2 = transpose(game.gameBoard);
        for (let r = 0; r < game.rows; r++) {
          let rowArray = slideUp(newBoard2[r]); //move current row and set it back to current row
          newBoard2[r] = rowArray;
          game.gameBoard = transpose(newBoard2); //put it back into the grid
        }
        newTile();
        updateGameBoard();
        break;
    }
  }
});

/* ----------------------- buttons ---------------------- */
$(".left").on("click", () => {
  if (game.gameNotOver) {
    for (let r = 0; r < game.rows; r++) {
      let rowArray = slideLeft(game.gameBoard[r]); //move current row and set it back to current row
      game.gameBoard[r] = rowArray; //put it back into the grid
    }
    newTile();
    updateGameBoard();
  }
});

$(".right").on("click", () => {
  if (game.gameNotOver) {
    for (let r = game.rows - 1; r >= 0; r--) {
      let rowArray = slideRight(game.gameBoard[r]); //move current row and set it back to current row
      game.gameBoard[r] = rowArray; //put it back into the grid
    }
    newTile();
    updateGameBoard();
  }
});

$(".up").on("click", () => {
  if (game.gameNotOver) {
    const newBoard2 = transpose(game.gameBoard);
    for (let r = 0; r < game.rows; r++) {
      let rowArray = slideUp(newBoard2[r]); //move current row and set it back to current row
      newBoard2[r] = rowArray;
      game.gameBoard = transpose(newBoard2); //put it back into the grid
    }
    newTile();
    updateGameBoard();
  }
});

$(".down").on("click", () => {
  if (game.gameNotOver) {
    const newBoard = transpose(game.gameBoard);
    for (let r = game.rows - 1; r >= 0; r--) {
      let rowArray = slideDown(newBoard[r]); //move current row and set it back to current row
      newBoard[r] = rowArray;
      game.gameBoard = transpose(newBoard); //put it back into the grid
    }
    newTile();
    updateGameBoard();
  }
});

/* -------------------- reset button -------------------- */
$(".reset-button").on("click", () => {
  game.gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  game.gameNotOver = true;
  newTile();
  newTile();
  updateGameBoard();
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
