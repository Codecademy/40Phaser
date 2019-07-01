import options from "../options.js";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
        this.gameStart = {};
        this.buildYourOwn = {};
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

        this.createDOMElements();

        this.gameStart.setInteractive();
        this.buildYourOwn.setInteractive();

        this.gameStart.on("pointerup", () => {
            this.scene.start("GameScene");
            this.scene.stop("StartScene");
        });

        this.buildYourOwn.on("pointerup", () => {
            window.location.href = "https://www.codecademy.com/learn/learn-phaser";
        });
    }

    createDOMElements() {
        // create the 404 image
        this.add.image(options.windowWidth / 2, 100, "404image");

        // add heading
        this.add.text(65, options.windowHeight / 2 - 40, "Oh no! Looks like you're lost.", {
            fontFamily: "sans-serif",
            fontSize: "48px",
            fontStyle: "bold",
            color: "#000",
            align: "center",
        });

        // add subheading
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

        // add "Play the Game" button
        this.gameStart = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 2 + 120,
            220,
            40,
            0x6400e4,
        );

        // add "Build your own" button
        this.buildYourOwn = this.add.rectangle(
            options.windowWidth / 2,
            options.windowHeight / 2 + 170,
            220,
            40,
            0xf9f9f9,
        );

        // add "Play the Game" text to button
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

        // add "Build your own" text to button
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
    }
}
