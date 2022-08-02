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
let displayController = (function () {})();

//factories for items that we need multiples of ***players***
