import options from "../options.js";
import strings from "../assets/strings.js";

export default function createGameScene({ on, phaser: Phaser }) {
    return class GameScene extends Phaser.Scene {
        constructor() {
            super({ key: "GameScene" });
            this.isPaused = false;
        }

        preload() {
            this.load.image(
                "platform",
                "https://static-assets.codecademy.com/assets/40phaser/platform-test.png",
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
            this.scores = {
                currScore: 0,
                highscore: parseInt(localStorage.getItem("highscore"), 10) || 0,
            };

            this.keys = {
                spacebar: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
                pKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),
            };

            // Running animation
            this.anims.create({
                key: "run",
                frames: this.anims.generateFrameNumbers("codey", { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1,
            });

            // jumping animation
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

            for (let i = 0; i < 5; i += 1) {
                this.addPlatform(110 * i);
            }

            this.addPlatform(125 * 5);
            this.addPlatform(135 * 6);
            this.addPlatform(140 * 7);

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

            // add the tap/click input
            this.input.on("pointerdown", this.jump, this);

            this.scoreText = this.add.text(16, 16, strings.score(0), {
                fontFamily: options.fontFamily,
                fontSize: options.mediumFontSize,
                fill: options.blackText,
            });

            // add pause button with text
            this.pauseButton = this.add.rectangle(
                this.game.config.width - 70,
                25,
                100,
                30,
                options.purpleBox,
            );
            this.pauseButton.setInteractive();

            this.pauseButton.text = this.add.text(this.game.config.width - 100, 14, strings.pause, {
                fontFamily: options.fontFamily,
                fontSize: options.smallFontSize,
                fill: options.whiteText,
            });

            this.pauseButton.on("pointerup", () => {
                this.togglePause();
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
            on.game("jump");
        }

        update() {
            const newScore = Math.floor(this.scores.currScore);

            if (!this.isPaused) {
                this.scores.currScore += 0.2;
                this.scoreText.setText(strings.score(newScore));

                if (Phaser.Input.Keyboard.JustDown(this.keys.spacebar)) {
                    this.jump();
                }
                if (!this.player.body.touching.down) {
                    this.player.anims.play("jump", true);
                } else {
                    this.player.anims.play("run", true);
                }
                if (this.player.y > this.game.config.height) {
                    this.scene.stop("GameScene");

                    this.scores.highscore = Math.max(this.scores.highscore, this.scores.currScore);
                    localStorage.setItem("highscore", Math.floor(this.scores.highscore));

                    on.game("death");
                    this.scene.start("EndScene", {
                        score: Math.floor(this.scores.currScore),
                        highscore: Math.floor(this.scores.highscore),
                    });
                }
                this.platforms.children.iterate(this.updatePlatforms, this);
            }
            if (Phaser.Input.Keyboard.JustDown(this.keys.pKey)) {
                this.togglePause();
            }

            const ariaLabel = [
                strings.score(newScore),
                this.isPaused ? strings.pressPToUnpause : strings.pressPToPause,
                strings.pressSpaceOrTap,
            ].join(". ");

            if (ariaLabel !== this.ariaLabel) {
                this.ariaLabel = ariaLabel;
                this.game.canvas.setAttribute("aria-label", ariaLabel);
            }
        }

        togglePause() {
            if (this.isPaused) {
                on.game("unpause");
                this.pauseButton.text.setText(strings.pause);
                this.pauseButton.text.x += 6;
                this.physics.resume();
                this.anims.resumeAll();
            } else {
                on.game("pause");
                this.pauseButton.text.setText(strings.unpause);
                this.pauseButton.text.x -= 6;
                this.physics.pause();
                this.anims.pauseAll();
            }
            this.isPaused = !this.isPaused;
        }

        updatePlatforms(platform) {
            if (platform.x < -platform.width) {
                const randDiff = Math.floor(Math.random() * 250);
                platform.x = this.game.config.width + randDiff;
            } else {
                options.platformSpeedIncrement = this.scores.currScore / 500;
                platform.x -= options.platformSpeed * (1 + options.platformSpeedIncrement);
            }
        }
    };
}
