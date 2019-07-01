import options from "../options.js";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    preload() {
        this.load.image("platform", "assets/platform-test.png");
        this.load.image("404image", "assets/404.svg");
        this.load.spritesheet("codey", "assets/codey_sprite.png", {
            frameWidth: 72,
            frameHeight: 72,
        });
    }

    create() {
        this.start_player = this.physics.add.sprite(100, options.windowHeight - 100, "codey");

        this.start_platform = this.physics.add.sprite(100, options.windowHeight - 50, "platform");

        this.start_player.body.setAllowGravity(false);
        this.start_platform.body.setAllowGravity(false);

        this.add.image(options.windowWidth / 2, 100, "404image");

        this.add.text(65, options.windowHeight / 2 - 40, "Oh no! Looks like you're lost.", {
            fontFamily: "sans-serif",
            fontSize: "48px",
            fontStyle: "bold",
            color: "#000",
            align: "center",
        });

        this.add.text(
            140,
            options.windowHeight / 2 + 50,
            "Luckily you're not alone. Help Codey return home and get back to coding.",
            {
                fontFamily: "sans-serif",
                fontSize: "16px",
                color: "#000",
                align: "center",
            },
        );

        const gameStart = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 2 + 120,
            220,
            40,
            0x6400e4,
        );

        const buildYourOwn = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 2 + 170,
            220,
            40,
            0xf9f9f9,
        );

        this.add.text(
            options.windowWidth / 2 - 60,
            options.windowHeight / 2 + 110,
            "Play the Game",
            {
                fontFamily: "sans-serif",
                fontSize: "17px",
                fontStyle: "bold",
                fill: "#ffffff",
            },
        );

        this.add.text(
            options.windowWidth / 2 - 55,
            options.windowHeight / 2 + 160,
            "Build your own",
            {
                fontFamily: "sans-serif",
                fontSize: "17px",
                fill: "#6400e4",
            },
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
    }
}
