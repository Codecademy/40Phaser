let game;

export default {
  getGame() {
    return game;
  },
  setGame(newGame) {
    game = newGame;
  },
  startGameScene(scene) {
    game.scene.start(scene);
  }
};
