import options from "../options.js";

let spacebar;
let score = 0;
let scoreText;
// if gamePlaying is true, then the game isn't paused
let gamePlaying = true;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    preload() {
        this.load.image("platform", "assets/platform-test.png");
        this.load.spritesheet("codey", "assets/codey_sprite.png", {
            frameWidth: 72,
            frameHeight: 72,
        });
    }

    create(data) {
        score = data.score ? data.score : 0;
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
            frames: this.anims.generateFrameNumbers("codey", { start: 5, end: 5 }),
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

        this.player = this.physics.add.sprite(100, options.windowHeight - 100, "codey");

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
        scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "24px",
            fill: "#000",
        });

        // add pause button with text
        const togglePause = this.add.rectangle(options.windowWidth, 25, 150, 30, 0x6400e4);
        togglePause.setInteractive();

        togglePause.text = this.add.text(options.windowWidth - 65, 13, "pause", {
            fontSize: "17px",
            fill: "#fff",
        });

        togglePause.on("pointerup", () => {
            if (gamePlaying) {
                togglePause.text.setText("resume");
                togglePause.text.x -= 3;
                this.physics.pause();
                this.anims.pauseAll();
            } else {
                togglePause.text.setText("pause");
                togglePause.text.x += 3;
                this.physics.resume();
                this.anims.resumeAll();
            }
            gamePlaying = !gamePlaying;
        });
    }

    addPlatform(platformX = options.windowWidth) {
        const platformY = options.windowHeight - 50;
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
        // game mechanics occur only if gamePlaying is true
        if (gamePlaying) {
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
            if (this.player.y > options.windowHeight) {
                this.scene.stop("GameScene");
                this.scene.start("EndScene", { score });
            }
            this.platforms.children.iterate(this.updatePlatforms, this);
        }
    }

    updatePlatforms(platform) {
        if (platform.x < -platform.width) {
            const randDiff = Math.floor(Math.random() * 250);
            platform.x = options.windowWidth + randDiff;
        } else {
            options.platformSpeedIncrement = score / 500;
            platform.x -= options.platformSpeed * (1 + options.platformSpeedIncrement);
        }
    }
}
