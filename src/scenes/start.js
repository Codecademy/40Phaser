import elements from "../elements.js";
import options from "../options.js";
import state from "../state.js";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.image("platform", "assets/platform-test.png");
    this.load.spritesheet("codey", "assets/codey_sprite.png", {
      frameWidth: 72,
      frameHeight: 72
    });
  }

  create() {
    this.start_player = this.physics.add.sprite(
      100,
      options.windowHeight - 100,
      "codey"
    ); // player sprite
    this.start_platform = this.physics.add.sprite(
      100,
      options.windowHeight - 50,
      "platform"
    );
    this.start_player.body.setAllowGravity(false);
    this.start_platform.body.setAllowGravity(false);

    elements.buttonGameStart.onclick = function() {
      state.getGame().scene.start("GameScene");
      state.getGame().scene.stop("StartScene");
      elements.app404.style.visibility = "hidden";
      elements.app404.style.display = "none";
    };
  }
}
