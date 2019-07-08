import options from "../options.js";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    preload() {}

    create(data) {
        this.createDOMElements(data);
    }

    createDOMElements({ score, highscore }) {
        this.add.text(options.windowWidth / 2 - 110, 50, `Score: ${score}`, {
            fontFamily: options.fontFamily,
            fontSize: options.largeFontSize,
            fontStyle: "bold",
            color: options.blackText,
            align: "center",
        });

        this.add.text(options.windowWidth / 2 - 80, 110, `Highscore: ${highscore}`, {
            fontFamily: options.fontFamily,
            fontSize: options.mediumFontSize,
            fill: options.blackText,
        });

        this.add.text(options.windowWidth / 2 - 35, options.windowHeight / 4, "So Close!", {
            fontFamily: options.fontFamily,
            fontSize: options.smallFontSize,
            fill: options.blackText,
        });

        const gameReplay = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 3 + 25,
            210,
            40,
            options.purpleBox,
        );

        const buildYourOwn = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 2 - 20,
            210,
            40,
            options.backgroundColor,
        );

        gameReplay.setInteractive();
        buildYourOwn.setInteractive();

        gameReplay.on("pointerup", () => {
            this.scene.stop("EndScene");
            this.scene.start("GameScene");
        });

        buildYourOwn.on("pointerup", () => {
            window.location.href = "https://www.codecademy.com/learn/learn-phaser";
        });

        this.add.text(options.windowWidth / 2 - 40, options.windowHeight / 3 + 15, "Play Again", {
            fontFamily: options.fontFamily,
            fontSize: options.smallFontSize,
            fill: options.whiteText,
        });

        this.add.text(
            options.windowWidth / 2 - 55,
            options.windowHeight / 2 - 30,
            "Build your own",
            {
                fontFamily: options.fontFamily,
                fontSize: options.smallFontSize,
                fill: options.purpleText,
            },
        );
    }
}
