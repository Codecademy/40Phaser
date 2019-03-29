/*
  Phaser Codey
*/
let game;
let spacebar;
let score = 0;
let scoreText;

let gameOptions = {
  windowWidth: 800,
  windowHeight: 600,
  jumpForce: 700,
  platformSpeed: 4,
  platformSpeedIncrement: 0, 
  gravity: 400,
}

let button_gameStart;
let button_gameReplay;
let app_404;
let app_end;



window.onload = function(){

  let config = {
    type: Phaser.AUTO,
    width: gameOptions.windowWidth,
    height: gameOptions.windowHeight,
    backgroundColor: '#f9f9f9',
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: gameOptions.gravity }
        }
    },
    scene: [ StartScene, GameScene, EndScene ]
  };

  game = new Phaser.Game(config);

  button_gameStart = document.getElementById('game-start');
  button_gameReplay = document.getElementById('game-replay');
  app_404 = document.getElementById('app-404');
  app_end = document.getElementById('app-end');

}


class StartScene extends Phaser.Scene {

    constructor ()
    {
      super({ key: 'StartScene' });
    }

    preload ()
    {
      this.load.image('platform', 'assets/platform-test.png');
      this.load.spritesheet("codey", "assets/codey_sprite.png", {
        frameWidth: 72,
        frameHeight: 72
      });   
    }

    create ()
    {

      this.start_player = this.physics.add.sprite(100, gameOptions.windowHeight - 100, "codey"); // player sprite
      this.start_platform = this.physics.add.sprite(100, gameOptions.windowHeight - 50, "platform");
      this.start_player.body.setAllowGravity(false);
      this.start_platform.body.setAllowGravity(false);


      button_gameStart.onclick = function() {
          game.scene.start('GameScene');
          game.scene.stop('StartScene');
          app_404.style.visibility = "hidden";
          app_404.style.display = "none";
      };
    }

}


class EndScene extends Phaser.Scene {

    constructor()
    {
      super({ key: 'EndScene' });
    }

    preload()
    {
        
    }

    create()
    {
      button_gameReplay.onclick = function() {
        app_end.style.visibility = 'visible';
        app_end.style.display = 'initial';
        game.scene.start('GameScene');
      };

    }

}


class GameScene extends Phaser.Scene {

    constructor(){
      super({ key: 'GameScene' });
    }

    preload(){
      this.load.image('platform', 'assets/platform-test.png');
      this.load.spritesheet("codey", "assets/codey_sprite.png", {
        frameWidth: 72,
        frameHeight: 72
      });   
    }

    create(){  

      this.player = this.physics.add.sprite(100, gameOptions.windowHeight - 100, "codey"); 
    
      console.log('game scene'); // !to be removed!

      //create the codey running animation from sprite sheet
      this.anims.create({
          key: 'run',
          frames: this.anims.generateFrameNumbers('codey', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });

      //create the codey running animation from sprite sheet
      this.anims.create({
          key: 'jump',
          frames: this.anims.generateFrameNumbers('codey', { start: 5, end: 5 }),
          frameRate: 10,
          repeat: -1
      });


      this.platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
      });


      for (let i = 0; i < 8; i++) {
        this.addPlatform(110 * i);
      }


      this.player.body.checkCollision.up = false;
      this.player.body.checkCollision.left = false;
      this.player.body.checkCollision.right = false;
      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.platforms, this.platforms, function(s1, s2){
        let b1 = s1.body;
        let b2 = s2.body;

        if(b1.x > b2.x){
          b1.y -= 60;
        }
        else{
          b2.y -= 60;
        }
      })



      //add the space bar input
      spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#000' });

    }

    addPlatform(x) {

      let platform;
      let platformY = gameOptions.windowHeight - 50;
      let platformX;

      if(x){
        platformX = x;
      }
      else{
        platformX = gameOptions.windowWidth;
      }

      platform = this.physics.add.sprite(platformX, platformY, "platform");
      this.platforms.add(platform);

      
    }




    jump(){
      if(this.player.body.touching.down){
        //this.player.anims.pause();

        this.player.body.setAccelerationY(1000);
        this.player.setVelocityY(-gameOptions.jumpForce);

      }
    }

    update(){

      score += 0.2;
      scoreText.setText(Math.floor(score));

      if (Phaser.Input.Keyboard.JustDown(spacebar)){
         this.jump();
      }
      if(!this.player.body.touching.down){
        this.player.anims.play('jump', true);
      }
      else{
         this.player.anims.play('run', true);
      }
      if(this.player.y > gameOptions.windowHeight){
        //this.scene.start('EndScene');
        this.scene.pause();
      }
      this.platforms.children.iterate(this.updatePlatforms, this);
    }


    updatePlatforms(platform){
      if(platform.x < 0){
          let randDiff = Math.floor(Math.random() * 250);
          platform.x = gameOptions.windowWidth + randDiff;
      } 
      else{
          gameOptions.platformSpeedIncrement = score/500;
         // console.log(gameOptions.platformSpeedIncrement);
          platform.x = platform.x - (gameOptions.platformSpeed * (1 + gameOptions.platformSpeedIncrement));
      }
    }


}







