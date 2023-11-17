var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var escenario;
var estrellas;
var bombs;
var score;
var gameOver;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'Assets/Sprites/Ejemplo/sky.png');
    this.load.image('ground', 'Assets/Sprites/Ejemplo/platform.png');
    this.load.image('star', 'Assets/Sprites/Ejemplo/star.png');
    this.load.image('bomb', 'Assets/Sprites/Ejemplo/bomb.png');
    this.load.spritesheet('dude', 'Assets/Sprites/Ejemplo/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    escenario = new Escenario(this);
    player = new Player(this);
    estrellas = new Stars(this);
    score = new Score(this);
    bombs = new Bombas(this);

    //Colliders
    player.addColliders(this, escenario.platforms);
    estrellas.addColliders(this, escenario.platforms);
    bombs.addColliders(this, escenario.platforms);

    this.physics.add.overlap(player.player, estrellas.stars,  collectStar, null, this);
    this.physics.add.collider(player.player, bombs.bombs, hitBomb, null, this);
}

function update ()
{
    if(!gameOver){
        player.Update();
    }else{
        return;
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true);
    //  Add and update the score
    score.score += 10;
    score.scoreText.setText('Score: ' + score.score);

    if (estrellas.stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        estrellas.stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
