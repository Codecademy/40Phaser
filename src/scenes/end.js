import strings from "../assets/strings.js";
import options from "../options.js";

export default function createEndScene({ on, phaser: Phaser }) {
    return class EndScene extends Phaser.Scene {
        constructor() {
            super({ key: "EndScene" });
        }

        preload() {}

        create(data) {
            this.createShortcuts();
            this.createTextElements(data);

            this.game.canvas.setAttribute(
                "aria-label",
                [
                    strings.score(data.score),
                    strings.highscore(data.highscore),
                    strings.soClose,
                    strings.pressPToPlayAgain,
                    strings.endingInstructions,
                ].join(". "),
            );
        }

        createShortcuts() {
            this.input.keyboard.addKey("b").on("down", () => this.launchBuildYourOwn());
            this.input.keyboard.addKey("p").on("down", () => this.launchGame());
        }

        createTextElements({ score, highscore }) {
            this.add.text(this.game.config.width / 2 - 110, 50, strings.score(score), {
                fontFamily: options.fontFamily,
                fontSize: options.extraLargeFontSize,
                fontStyle: "bold",
                color: options.blackText,
                align: "center",
            });

            this.add.text(this.game.config.width / 2 - 80, 110, strings.highscore(highscore), {
                fontFamily: options.fontFamily,
                fontSize: options.mediumFontSize,
                fill: options.blackText,
            });

            this.add.text(
                this.game.config.width / 2 - 35,
                this.game.config.height / 4,
                strings.soClose,
                {
                    fontFamily: options.fontFamily,
                    fontSize: options.smallFontSize,
                    fill: options.blackText,
                },
            );

            const gameReplay = this.add.rectangle(
                this.game.config.width / 2,
                this.game.config.height / 3 + 25,
                210,
                40,
                options.purpleBox,
            );

            const buildYourOwn = this.add.rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2 - 20,
                210,
                40,
                options.backgroundColor,
            );

            gameReplay.setInteractive();
            buildYourOwn.setInteractive();

            gameReplay.on("pointerup", () => this.launchGame());

            buildYourOwn.on("pointerup", () => this.launchBuildYourOwn());

            this.add.text(
                this.game.config.width / 2 - 40,
                this.game.config.height / 3 + 15,
                strings.playAgain,
                {
                    fontFamily: options.fontFamily,
                    fontSize: options.smallFontSize,
                    fill: options.whiteText,
                },
            );

            this.add.text(
                this.game.config.width / 2 - 55,
                this.game.config.height / 2 - 30,
                strings.buildYourOwn,
                {
                    fontFamily: options.fontFamily,
                    fontSize: options.smallFontSize,
                    fill: options.purpleText,
                },
            );
        }

        launchBuildYourOwn() {
            on.end("build-your-own");
            window.location.href = "https://www.codecademy.com/learn/learn-phaser";
        }

        launchGame() {
            on.end("game");
            this.scene.start("GameScene");
            this.scene.stop("EndScene");
        }
    };
}
