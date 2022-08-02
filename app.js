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
  //sets game board value to the game array values
  const setArray = function () {
    for (let i = 0; i < gameBoard.getGameBoard().length; i++) {
      squares[i].textContent = gameBoard.getGameBoard()[i];
    }
  };
  //Add event listeners to the Squares and when a player clicks a square add their mark to that square
  return {
    setArray,
  };
})();

gameBoard.generateGameArray();

//factories for items that we need multiples of ***players***
const Player = (name, mark) => {
  return { name, mark };
};

const player1 = Player("player1", "X");
const player2 = Player("player2", "O");
