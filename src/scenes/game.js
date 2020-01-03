import options from "../options.js";
import platformImg from "../assets/platform-test.png";
import codeyImg from "../assets/codey_sprite.png";

let spacebar;
let score;
let highscore;
let scoreText;
let isPaused = false;
let pauseButton;
let pKey;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    preload() {
        this.load.image("platform", platformImg);
        this.load.spritesheet("codey", codeyImg, {
            frameWidth: 72,
            frameHeight: 72,
        });
    }

    create() {
        score = 0;
        highscore = parseInt(localStorage.getItem("highscore"), 10) || 0;

        // create the codey running animation from sprite sheet
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("codey", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        // create the codey running animation from sprite sheet
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("codey", { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        this.platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });

        for (let i = 0; i < 8; i += 1) {
            this.addPlatform(110 * i);
        }

        this.player = this.physics.add.sprite(100, this.game.config.height - 100, "codey");

        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.platforms, this.platforms, (s1, s2) => {
            const b1 = s1.body;
            const b2 = s2.body;

            if (b1.x > b2.x) {
                b1.y -= 60;
            } else {
                b2.y -= 60;
            }
        });

        // add the space bar input
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // add the tap/click input
        this.input.on("pointerdown", this.jump, this);

        scoreText = this.add.text(16, 16, "Score: 0", {
            fontFamily: options.fontFamily,
            fontSize: options.mediumFontSize,
            fill: options.blackText,
        });

        // create p key input
        pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // add pause button with text
        pauseButton = this.add.rectangle(
            this.game.config.width - 70,
            25,
            100,
            30,
            options.purpleBox,
        );
        pauseButton.setInteractive();

        pauseButton.text = this.add.text(this.game.config.width - 100, 14, "(P)ause", {
            fontFamily: options.fontFamily,
            fontSize: options.smallFontSize,
            fill: options.whiteText,
        });

        pauseButton.on("pointerup", () => {
            if (isPaused) {
                pauseButton.text.setText("(P)ause");
                pauseButton.text.x += 6;
                this.physics.resume();
                this.anims.resumeAll();
            } else {
                pauseButton.text.setText("un(P)ause");
                pauseButton.text.x -= 6;
                this.physics.pause();
                this.anims.pauseAll();
            }
            isPaused = !isPaused;
        });
    }

    addPlatform(platformX = this.game.config.width) {
        const platformY = this.game.config.height - 50;
        const platform = this.physics.add.sprite(platformX, platformY, "platform");

        this.platforms.add(platform);
    }

    jump() {
        if (this.player.body.touching.down) {
            this.player.body.setAccelerationY(1000);
            this.player.setVelocityY(-options.jumpForce);
        }
    }

    update() {
        if (!isPaused) {
            score += 0.2;
            scoreText.setText(`Score: ${Math.floor(score)}`);

            if (Phaser.Input.Keyboard.JustDown(spacebar)) {
                this.jump();
            }
            if (!this.player.body.touching.down) {
                this.player.anims.play("jump", true);
            } else {
                this.player.anims.play("run", true);
            }
            if (this.player.y > this.game.config.height) {
                this.scene.stop("GameScene");

                highscore = score > highscore ? score : highscore;
                localStorage.setItem("highscore", Math.floor(highscore));

                this.scene.start("EndScene", {
                    score: Math.floor(score),
                    highscore: Math.floor(highscore),
                });
            }
            this.platforms.children.iterate(this.updatePlatforms, this);
        }
        if (Phaser.Input.Keyboard.JustDown(pKey)) {
            if (isPaused) {
                pauseButton.text.setText("(P)ause");
                pauseButton.text.x += 6;
                this.physics.resume();
                this.anims.resumeAll();
            } else {
                pauseButton.text.setText("un(P)ause");
                pauseButton.text.x -= 6;
                this.physics.pause();
                this.anims.pauseAll();
            }
            isPaused = !isPaused;
        }
    }

    updatePlatforms(platform) {
        if (platform.x < -platform.width) {
            const randDiff = Math.floor(Math.random() * 250);
            platform.x = this.game.config.width + randDiff;
        } else {
            options.platformSpeedIncrement = score / 500;
            platform.x -= options.platformSpeed * (1 + options.platformSpeedIncrement);
        }
    }
}
