import defaultOptions from "./options.js";
import EndScene from "./scenes/end.js";
import GameScene from "./scenes/game.js";
import StartScene from "./scenes/start.js";

const defaultGameSettings = {
    debug: false,
    phaser: window.Phaser,
};

export const launch40Phaser = settings => {
    settings = { ...defaultGameSettings, ...settings };
    const options = {
        ...defaultOptions,
        ...settings.phaserOptions,
    };

    return new settings.phaser.Game({
        type: Phaser.AUTO,
        width: options.windowWidth,
        height: options.windowHeight,
        backgroundColor: options.backgroundColor,
        physics: {
            default: "arcade",
            arcade: {
                debug: defaultGameSettings.debug,
                gravity: { y: options.gravity },
            },
        },
        scene: [StartScene, GameScene, EndScene],
        parent: options.parent,
    });
};

export default launch40Phaser;
