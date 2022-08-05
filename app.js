"use strict";

//modules for parts that we are only going to need once
const gameBoard = (function () {
  const _gameArray = [];
  const getGameBoard = () => {
    return _gameArray;
  };

  const generateGameArray = () => {
    for (let i = 0; i < 9; i++) {
      _gameArray.push("");
    }
  };

  //checks what players turn it is.
  const currentTurn = () => {
    if (player1.isTurn) {
      return player1.name;
    } else {
      return player2.name;
    }
  };

  return {
    getGameBoard,
    generateGameArray,
    currentTurn,
  };
})();

//renders contents of the gameBoard array to the webpage
const displayController = (function () {
  const squares = document.querySelectorAll(".field");
  const playerTurnButton1 = document.getElementById("player1");
  const playerTurnButton2 = document.getElementById("player2");

  //sets game board value to the game array values
  const setArray = function () {
    for (let i = 0; i < gameBoard.getGameBoard().length; i++) {
      squares[i].textContent = gameBoard.getGameBoard()[i];
    }
  };
  //Add event listeners to the Squares and when a player clicks a square add their mark to that square
  const squareListeners = () => {
    squares.forEach((Element) => {
      Element.addEventListener("click", function () {
        const row = Element.dataset.row;
        const column = Element.dataset.column;
        if (Element.textContent === "X" || Element.textContent === "O") {
          return alert(`Sorry this space is taken. Try again!`);
        } else if (!player1.isTurn) {
          Element.textContent = player2.mark;
        } else {
          Element.textContent = player1.mark;
        }
        switchTurn();
      });
    });
  };

  //changes the current turn indicator to the correct player
  const switchTurn = () => {
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
    setArray,
    squareListeners,
    squares,
  };
})();

gameBoard.generateGameArray();
displayController.squareListeners();

//factories for items that we need multiples of ***players***
const Player = (name, mark, isTurn) => {
  return { name, mark, isTurn };
};

const player1 = Player("player1", "X", true);
const player2 = Player("player2", "O", false);

//Game Board is currently checking for wins just by individual clicks. We need to track player movements individually or I need to find a better way to track player movements or else I can't see who won.
//Need to also appropriately place everything where it needs to go into modules. Clean things up.
//Need to come up with a new check winner solution.
//create win matrix based on index of squares and make an array to track the movements of each player and push the index of the square that is selected to the array based on the current players turn
