class Phase10 {
  players = [];
  constructor() {}

  addPlayer(player) {
    if (this.players.includes(player)) {
      showErrorModal(`${this.name} is already in the game.`);
      throw new Error(`${this.name} is already in the game.`);
    }
    this.players.push(player);
  }

  newGame() {
    if (this.players.length < 2) {
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
  currentPhase;
  constructor(name, score = 0, currentPhase = 1) {
    this.name = capitalizeFirstLetter(name);
    this.score = score;
    this.currentPhase = currentPhase;
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

function getPlayerName() {
  const newPlayerInput = document.getElementById("newPlayerInput");
  
  if (!newPlayerInput.value) {
    showErrorModal('Player name cannot be empty.');
    throw new Error('Player name cannot be empty.');
  }

  return new Player(newPlayerInput.value);
}

function appendPlayerToPlayersList(player) {
  const playerList = document.getElementById("playerList");

  const li = document.createElement('li');
  li.className = 'playerList-player';
  li.innerText = player.name;
  playerList.appendChild(li);

  newPlayerInput.value = null;
}

window.addEventListener("load", function() {
  const startGameButton = this.document.getElementById("startGame");
  const addPlayerButton = this.document.getElementById("addPlayerButton");

  const game = new Phase10();

  startGameButton.addEventListener("click", function() {
    game.newGame();
  });

  addPlayerButton.addEventListener("click", function() {
    const newPlayer = getPlayerName();
    // add the player to the list of players
    appendPlayerToPlayersList(newPlayer);
    // add the player to the game
    game.addPlayer(newPlayer);
  });
});