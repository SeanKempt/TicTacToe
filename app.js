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
let displayController = (function () {
  const squares = document.querySelectorAll(".field");
  const renderArray = () => {
    for (let i = 0; i < array.length; i++) {
      const gameArray = gameBoard.getGameBoard[i];
      squares.forEach(() => {
        squares.textContent = gameArray;
      });
    }
    return {
      renderArray,
    };
  };
})();

gameBoard.generateGameArray();

//factories for items that we need multiples of ***players***
