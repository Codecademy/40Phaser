import options from "../options.js";
import strings from "../assets/strings.js";

export default function createStartScene({ on, phaser: Phaser }) {
    return class StartScene extends Phaser.Scene {
        constructor() {
            super({ key: "StartScene" });
        }

        preload() {
            this.load.image(
                "platform",
                "https://static-assets.codecademy.com/assets/40phaser/platform-test.png",
            );
            this.load.image(
                "404image",
                "https://static-assets.codecademy.com/assets/40phaser/404.svg",
            );
            this.load.spritesheet(
                "codey",
                "https://static-assets.codecademy.com/assets/40phaser/codey_sprite.png",
                {
                    frameWidth: 72,
                    frameHeight: 72,
                },
            );
        }

        create() {
            this.game.canvas.setAttribute(
                "aria-label",
                [
                    strings.fourZeroFour,
                    strings.ohNo,
                    strings.looksLikeYoureLost,
                    strings.luckilyYoureNotAlone,
                    strings.startingInstructions,
                ].join(". "),
            );

            this.createShortcuts();
            this.createTextElements();

            this.start_player = this.physics.add.sprite(
                100,
                this.game.config.height - 100,
                "codey",
            );

            this.start_platform = this.physics.add.sprite(
                100,
                this.game.config.height - 50,
                "platform",
            );

            this.start_player.body.setAllowGravity(false);
            this.start_platform.body.setAllowGravity(false);
        }

        createShortcuts() {
            this.input.keyboard.addKey("b").on("down", () => this.launchBuildYourOwn());
            this.input.keyboard.addKey("c").on("down", () => this.launchContribute());
            this.input.keyboard.addKey("p").on("down", () => this.launchGame());
        }

        createTextElements() {
            this.add.image(this.game.config.width / 2, 100, "404image");

            this.add.text(
                this.game.config.width / 2 - 70,
                this.game.config.height / 2 - 100,
                strings.ohNo,
                {
                    fontFamily: options.fontFamily,
                    fontSize: options.extraLargeFontSize,
                    fontStyle: "bold",
                    color: options.blackText,
                    align: "center",
                },
            );

            this.add.text(
                this.game.config.width / 2 - 150,
                this.game.config.height / 2 - 48,
                strings.looksLikeYoureLost,
                {
                    fontFamily: options.fontFamily,
                    fontSize: options.largeFontSize,
                    fontStyle: "bold",
                    color: options.blackText,
                    align: "center",
                },
            );

            this.add.text(
                this.game.config.width / 2 - 170,
                this.game.config.height / 2 + 25,
                strings.luckilyYoureNotAlone,
                {
                    fontFamily: options.fontFamily,
                    fontSize: options.smallFontSize,
                    color: options.blackText,
                    align: "center",
                },
            );

            const gameStart = this.add.rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2 + 120,
                220,
                40,
                0x6400e4,
            );

            const buildYourOwn = this.add.rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2 + 170,
                220,
                40,
                options.backgroundColor,
            );

            const easterEggButton = this.add.rectangle(
                this.game.config.width - 90,
                this.game.config.height - 50,
                140,
                30,
                0xffffff,
            );

            gameStart.setInteractive();
            buildYourOwn.setInteractive();
            easterEggButton.setInteractive();

            gameStart.on("pointerup", () => this.launchGame());

            buildYourOwn.on("pointerup", () => this.launchBuildYourOwn());

            easterEggButton.on("pointerup", () => this.launchContribute());

            this.add.text(
                this.game.config.width / 2 - 53,
                this.game.config.height / 2 + 110,
                strings.playTheGame,
                {
                    fontFamily: options.fontFamily,
                    fontSize: options.smallFontSize,
                    fill: options.whiteText,
                },
            );

            this.add.text(
                this.game.config.width / 2 - 53,
                this.game.config.height / 2 + 160,
                strings.buildYourOwn,
                {
                    fontFamily: options.fontFamily,
                    fontSize: options.smallFontSize,
                    fill: options.purpleText,
                },
            );

            const easterEggText = this.add.text(
                this.game.config.width - 155,
                this.game.config.height - 60,
                strings.clickToContribute,
                {
                    fontFamily: options.fontFamily,
                    fontSize: options.smallFontSize,
                    fill: options.blackText,
                },
            );

            easterEggText.visible = false;

            easterEggButton.on("pointerover", () => {
                easterEggText.visible = true;
                document.querySelector("body").style.cursor = "pointer";
            });

            easterEggButton.on("pointerout", () => {
                easterEggText.visible = false;
                document.querySelector("body").style.cursor = "default";
            });
        }

        launchBuildYourOwn() {
            on.start("build-your-own");
            window.location.href = "https://www.codecademy.com/learn/learn-phaser";
        }

        launchContribute() {
            on.start("contribute");
            window.location.href = "https://github.com/Codecademy/40Phaser";
        }

        launchGame() {
            on.start("game");
            this.scene.start("GameScene");
            this.scene.stop("StartScene");
        }
    };
}
