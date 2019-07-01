import options from "../options.js";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    preload() {}

    create(data) {
        this.add.text(options.windowWidth / 2 - 110, 60, `Score: ${data.score}`, {
            fontFamily: "sans-serif",
            fontSize: "48px",
            fontStyle: "bold",
            color: "#000",
            align: "center",
        });

        this.add.text(options.windowWidth / 2 - 35, options.windowHeight / 4, "So Close!", {
            fontFamily: "sans-serif",
            fontSize: "17px",
            fill: "#000",
        });

        const gameReplay = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 3 + 25,
            210,
            40,
            0x6400e4,
        );

        const buildYourOwn = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 2 - 20,
            210,
            40,
            0xf9f9f9,
        );

        gameReplay.setInteractive();
        buildYourOwn.setInteractive();

        gameReplay.on("pointerup", () => {
            this.scene.stop("EndScene");
            this.scene.start("GameScene");
        });

        buildYourOwn.on("pointerup", () => {
            window.location.href("https://www.codecademy.com/learn/learn-phaser");
        });

        this.add.text(options.windowWidth / 2 - 40, options.windowHeight / 3 + 15, "Play Again", {
            fontFamily: "sans-serif",
            fontSize: "17px",
            fill: "#fff",
        });

        this.add.text(
            options.windowWidth / 2 - 55,
            options.windowHeight / 2 - 40,
            "Build your own",
            {
                fontFamily: "sans-serif",
                fontSize: "17px",
                fill: "#6400e4",
            },
        );
    }
}
