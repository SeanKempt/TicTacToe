"use strict";

//modules for parts that we are only going to need once
const gameBoard = (function () {
  let _gameArray = [];
  const _winMatrix = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  //to reset the game to orignal state
  const gameReset = () => {
    _gameArray = [];
    generateGameArray();
    _resetSquares();
    player1.isTurn = true;
    player2.isTurn = false;
    player1.moves = [];
    player2.moves = [];
    displayController.turnClassReset();
  };

  const getGameBoard = () => {
    return _gameArray;
  };

  //need the empty strings to validate if there is a tie using check tie
  const generateGameArray = () => {
    for (let i = 0; i < 9; i++) {
      _gameArray.push("");
    }
  };

  //checks what player's turn it is.
  const currentPlayer = () => {
    if (player1.isTurn) {
      return player1;
    } else {
      return player2;
    }
  };

  //to reset squares to original state

  const _resetSquares = () => {
    displayController.squares.forEach((element) => {
      element.textContent = "";
    });
  };

  //check if player moves match a win condition from winMatrix
  const checkWin = () => {
    return _winMatrix.some((combo) => {
      return combo.every((i) => {
        return currentPlayer().moves.includes(i);
      });
    });
  };

  const declareWinner = () => {
    if (checkWin() && currentPlayer() === player1) {
      displayController.setWinner(player1.name);
    } else if (checkWin() && currentPlayer() === player2) {
      displayController.setWinner(player2.name);
    }
  };

  const checkTie = () => {
    if (!_gameArray.includes("") && checkWin() === false) {
      displayController.setTie();
    }
  };

  return {
    getGameBoard,
    generateGameArray,
    currentPlayer,
    declareWinner,
    checkTie,
    gameReset,
  };
})();

//renders contents of the gameBoard array to the webpage
const displayController = (function () {
  const squares = document.querySelectorAll(".field");
  const playerTurnButton1 = document.getElementById("player1");
  const playerTurnButton2 = document.getElementById("player2");
  const modal = document.getElementById("winner-modal");
  const span = document.getElementsByClassName("close")[0];
  const winner = document.getElementById("winner");

  //sets modal display to block. To be used with winner declaration. Replaced alerts.
  const setWinner = (name) => {
    modal.style.display = "block";
    winner.textContent = `${name} is the winner!`;
  };

  const setTie = () => {
    modal.style.display = "block";
    winner.textContent = `It's a Tie!`;
  };

  const closeModal = () => {
    span.addEventListener("click", function () {
      modal.style.display = "none";
      gameBoard.gameReset();
    });
  };

  //assigns text content of squares to the array at the current index
  const setArray = function () {
    for (let i = 0; i < gameBoard.getGameBoard().length; i++) {
      gameBoard.getGameBoard()[i] = squares[i].textContent;
    }
  };
  //Add event listeners to the Squares and when a player clicks a square add their mark to that square
  const squareListeners = () => {
    squares.forEach((Element) => {
      Element.addEventListener("click", function () {
        if (Element.textContent === "X" || Element.textContent === "O") {
          return alert(`Sorry this space is taken. Try again!`);
        } else if (!player1.isTurn) {
          Element.textContent = player2.mark;
          setArray();
          player2.moves.push(Number(Element.dataset.index));
        } else {
          Element.textContent = player1.mark;
          setArray();
          player1.moves.push(Number(Element.dataset.index));
        }
        gameBoard.declareWinner();
        _switchTurn();
        gameBoard.checkTie();
      });
    });
  };

  //To check if the current turn button has the current-turn class and if it doesn't switch it. Using this with game reset to set the correct turn display. Not sure if this should be private or not.
  const turnClassReset = () => {
    if (playerTurnButton2.classList.contains("current-turn")) {
      playerTurnButton2.classList.remove("current-turn");
      playerTurnButton1.classList.add("current-turn");
    }
  };

  //changes the current turn indicator to the correct player
  const _switchTurn = () => {
    if (player1.isTurn === true && player2.isTurn === false) {
      player2.isTurn = true;
      player1.isTurn = false;
      playerTurnButton2.classList.toggle("current-turn");
      playerTurnButton1.classList.toggle("current-turn");
    } else {
      player1.isTurn = true;
      player2.isTurn = false;
      playerTurnButton2.classList.toggle("current-turn");
      playerTurnButton1.classList.toggle("current-turn");
    }
  };

  return {
    squareListeners,
    squares,
    closeModal,
    setWinner,
    setTie,
    turnClassReset,
  };
})();

gameBoard.generateGameArray();
displayController.squareListeners();
displayController.closeModal();

//factories for items that we need multiples of ***players***
const Player = (name, mark, isTurn) => {
  this.moves = [];
  return { name, mark, isTurn, moves };
};

let player1 = Player("player1", "X", true);
let player2 = Player("player2", "O", false);
