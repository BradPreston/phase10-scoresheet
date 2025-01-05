class Phase10 {
  constructor() {}

  init() {
    window.localStorage.setItem("players", JSON.stringify([]));
  }

  newGame() {
    const playerList = JSON.parse(window.localStorage.getItem("players"));
    if (playerList.length < 2) {
      showErrorModal('Must have at least 2 players to start.');
      throw new Error('Must have at least 2 players to start.');
    }
    document.getElementById("gameSetup").style.display = "none";
    document.getElementById("gameScore").style.display = "block";
  }
}

class Player {
  name;
  score;
  constructor(name, score = 0) {
    this.name = capitalizeFirstLetter(name);
    this.score = score;
  }

  addToGame() {
    let playerList = JSON.parse(localStorage.getItem("players"));
    if (!playerList) localStorage.setItem("players", JSON.stringify([]));
    playerList = JSON.parse(localStorage.getItem("players"));
    if (playerList.some(name => name === this.name)) {
      showErrorModal(`${this.name} is already in the game.`);
      throw new Error(`${this.name} is already in the game.`);
    }
    playerList.push(this.name);
    localStorage.setItem('players', JSON.stringify(playerList));
  }
}

function capitalizeFirstLetter(name) {
  const firstLetter = name.slice(0, 1);
  const restOfLetters = name.slice(1);
  return `${firstLetter.toUpperCase()}${restOfLetters}`;
}

function showErrorModal(message) {
  const errorModal = document.getElementById("errorModal");
  const errorModalMessage = document.getElementById("errorModalMessage");
  const closeErrorModalButton = document.getElementById("closeErrorModalButton");

  errorModal.showModal();
  errorModalMessage.innerText = message;

  closeErrorModalButton.addEventListener('click', function() {
    errorModal.close();
  });
}

function addPlayer() {
  const playerList = document.getElementById("playerList");
  const playerName = playerList.lastElementChild.value;
  if (!playerName) {
    showErrorModal('Player name cannot be empty.');
    throw new Error('Player name cannot be empty.');
  }
  const newPlayer = new Player(playerName);
  newPlayer.addToGame();
  playerList.appendChild(addNewPlayerInput());
}

function addNewPlayerInput() {
  const input = document.createElement("input");
  input.className = "newPlayerInput";
  input.type = "text";
  input.placeholder = "Player name";
  return input;
}

window.addEventListener("load", function() {
  const startGameButton = this.document.getElementById("startGame");
  const game = new Phase10();
  game.init();
  startGameButton.addEventListener("click", game.newGame);
});