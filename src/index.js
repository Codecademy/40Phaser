import options from "./options.js";
import EndScene from "./scenes/end.js";
import GameScene from "./scenes/game.js";
import StartScene from "./scenes/start.js";
import state from "./state.js";

window.onload = () => {
    const config = {
        type: Phaser.AUTO,
        width: options.windowWidth,
        height: options.windowHeight,
        backgroundColor: "#f9f9f9",
        physics: {
            default: "arcade",
            arcade: {
                debug: true,
                gravity: { y: options.gravity },
            },
        },
        scene: [StartScene, GameScene, EndScene],
    };

    state.setGame(new Phaser.Game(config));
};
