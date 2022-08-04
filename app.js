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

  return {
    getGameBoard,
    generateGameArray,
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
        if (Element.textContent === "X" || Element.textContent === "O") {
          alert(`Sorry this space is taken. Try again!`);
        }
        Element.textContent = player1.mark;
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

//add an option or maybe a function to the square listener where if its player1's turn use their mark if its player2's turn use their mark instead.
