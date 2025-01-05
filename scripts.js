class Phase10 {
  players = [];
  constructor() {}

  addPlayer(player) {
    if (this.players.some(p => p.name === player.name)) {
      showErrorModal(`${player.name} is already in the game.`);
      throw new Error(`${player.name} is already in the game.`);
    }
    this.players.push(player);
  }

  removePlayer(name) {
    this.players = this.players.filter(p => p.name !== name);
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
  errorModal.style.display = "grid";
  errorModalMessage.innerText = message;

  closeErrorModalButton.addEventListener('click', function() {
    errorModal.style.display = "none";
    errorModal.close();
  });

  errorModal.addEventListener("click", function(event) {
    const modalWrapper = event.target.closest(".errorModalContent");
    if (!modalWrapper) {
      errorModal.style.display = "none";
      errorModal.close();
    }
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
  li.dataset.name = player.name;
  li.innerHTML = `${player.name} &#10005;`;
  playerList.appendChild(li);

  newPlayerInput.value = null;
}

window.addEventListener("load", function() {
  const startGameButton = this.document.getElementById("startGame");
  const addPlayerButton = this.document.getElementById("addPlayerButton");
  const playerList = document.getElementById("playerList");

  const game = new Phase10();

  startGameButton.addEventListener("click", function() {
    game.newGame();
  });

  addPlayerButton.addEventListener("click", function() {
    const newPlayer = getPlayerName();
    game.addPlayer(newPlayer);
    // Important to load after game.addPlayer to prevent the player's name from being added to the list
    appendPlayerToPlayersList(newPlayer);
  });

  playerList.addEventListener("click", function(event) {
    const player = event.target.closest('.playerList-player');
    if (!player) return;
    game.removePlayer(player.dataset.name);
    playerList.removeChild(player);
    game.players.forEach(player => console.log(player.name))
  })
});