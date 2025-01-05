class Phase10 {
  constructor() {}

  init() {
    window.localStorage.setItem("players", JSON.stringify([]));
  }
}

window.addEventListener("load", function() {
  const game = new Phase10();
  game.init();
});