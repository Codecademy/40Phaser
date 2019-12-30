import options from "../options.js";
import platformImg from "../assets/platform-test.png";
import error404Img from "../assets/404.svg";
import codeyImg from "../assets/codey_sprite.png";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    preload() {
        this.load.image("platform", platformImg);
        this.load.image("404image", error404Img);
        this.load.spritesheet("codey", codeyImg, {
            frameWidth: 72,
            frameHeight: 72,
        });
    }

    create() {
        this.createTextElements();

        this.start_player = this.physics.add.sprite(100, this.game.config.height - 100, "codey");

        this.start_platform = this.physics.add.sprite(
            100,
            this.game.config.height - 50,
            "platform",
        );

        this.start_player.body.setAllowGravity(false);
        this.start_platform.body.setAllowGravity(false);
    }

    createTextElements() {
        this.add.image(this.game.config.width / 2, 100, "404image");

        this.add.text(
            this.game.config.width / 2 - 70,
            this.game.config.height / 2 - 100,
            "Oh no!",
            {
                fontFamily: options.fontFamily,
                fontSize: options.extraLargeFontSize,
                fontStyle: "bold",
                color: options.blackText,
                align: "center",
            },
        );

        this.add.text(
            this.game.config.width / 2 - 160,
            this.game.config.height / 2 - 48,
            "Looks like you're lost.",
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
            "Luckily you're not alone.\nHelp Codey return home and get back to coding.",
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

        gameStart.setInteractive();
        buildYourOwn.setInteractive();

        gameStart.on("pointerup", () => {
            this.scene.start("GameScene");
            this.scene.stop("StartScene");
        });

        buildYourOwn.on("pointerup", () => {
            window.location.href = "https://www.codecademy.com/learn/learn-phaser";
        });

        this.add.text(
            this.game.config.width / 2 - 60,
            this.game.config.height / 2 + 110,
            "Play the Game",
            {
                fontFamily: options.fontFamily,
                fontSize: options.smallFontSize,
                fill: options.whiteText,
            },
        );

        this.add.text(
            this.game.config.width / 2 - 55,
            this.game.config.height / 2 + 160,
            "Build your own",
            {
                fontFamily: options.fontFamily,
                fontSize: options.smallFontSize,
                fill: options.purpleText,
            },
        );
    }
}
