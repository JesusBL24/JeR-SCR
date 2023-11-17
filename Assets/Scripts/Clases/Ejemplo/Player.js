class Player{
    constructor(game) {
        this.player = this.addPlayer(game);
        this.cursors = this.addCursors(game);
    }
    addPlayer(game){
        var player = game.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        game.anims.create({
            key: 'left',
            frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        game.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        game.anims.create({
            key: 'right',
            frames: game.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        return player;
    }

    addCursors(game){
        var cursors = game.input.keyboard.createCursorKeys();
        return cursors;
    }

    addColliders(game, platforms){
        game.physics.add.collider(this.player, platforms);
    }


    Update(){
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }


}