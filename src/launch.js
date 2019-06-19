import options from "./options.js";
import EndScene from "./scenes/end.js";
import GameScene from "./scenes/game.js";
import StartScene from "./scenes/start.js";

const defaultGameSettings = {
    debug: false,
    phaser: window.Phaser,
};

export const launch40Phaser = (setting = defaultGameSettings) => {
    setting = { ...defaultGameSettings, ...setting };

    return new setting.phaser.Game({
        type: Phaser.AUTO,
        width: options.windowWidth,
        height: options.windowHeight,
        backgroundColor: "#f9f9f9",
        physics: {
            default: "arcade",
            arcade: {
                debug: setting.debug,
                gravity: { y: options.gravity },
            },
        },
        scene: [StartScene, GameScene, EndScene],
    });
};