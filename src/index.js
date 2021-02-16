import defaultOptions from "./options.js";
import createEndScene from "./scenes/end.js";
import createGameScene from "./scenes/game.js";
import createStartScene from "./scenes/start.js";

const defaultGameSettings = {
    debug: false,
    on: {
        end: () => {},
        game: () => {},
        start: () => {},
    },
    phaser: window.Phaser,
};

export const launch40Phaser = settings => {
    settings = {
        ...defaultGameSettings,
        ...settings,
        on: { ...defaultGameSettings.on, ...settings.on },
    };
    const options = {
        ...defaultOptions,
        ...settings.phaserOptions,
    };

    const game = new settings.phaser.Game({
        type: settings.phaser.AUTO,
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
        scene: [createStartScene(settings), createGameScene(settings), createEndScene(settings)],
        parent: options.parent,
    });

    game.canvas.setAttribute("role", "img");

    return game;
};

export default launch40Phaser;
