import options from "../options.js";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
        this.gameReplay = {};
        this.buildYourOwn = {};
    }

    preload() {}

    create(data) {
        this.createDOMElements(data.score);

        this.gameReplay.setInteractive();
        this.buildYourOwn.setInteractive();

        this.gameReplay.on("pointerup", () => {
            this.scene.stop("EndScene");
            this.scene.start("GameScene");
        });

        this.buildYourOwn.on("pointerup", () => {
            window.location.href = "https://www.codecademy.com/learn/learn-phaser";
        });
    }

    createDOMElements(score) {
        // add score text
        this.add.text(options.windowWidth / 2 - 110, 60, `Score: ${score}`, {
            fontFamily: "sans-serif",
            fontSize: "48px",
            fontStyle: "bold",
            color: "#000",
            align: "center",
        });

        // add subheding
        this.add.text(options.windowWidth / 2 - 35, options.windowHeight / 4, "So Close!", {
            fontFamily: "sans-serif",
            fontSize: "17px",
            fill: "#000",
        });

        // add Play again button
        this.gameReplay = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 3 + 25,
            210,
            40,
            0x6400e4,
        );

        // add build your own button
        this.buildYourOwn = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 2 - 20,
            210,
            40,
            0xf9f9f9,
        );

        // add text to Play again button
        this.add.text(options.windowWidth / 2 - 40, options.windowHeight / 3 + 15, "Play Again", {
            fontFamily: "sans-serif",
            fontSize: "17px",
            fill: "#fff",
        });

        // add text to Build your own button
        this.add.text(
            options.windowWidth / 2 - 55,
            options.windowHeight / 2 - 30,
            "Build your own",
            {
                fontFamily: "sans-serif",
                fontSize: "17px",
                fill: "#6400e4",
            },
        );
    }
}
