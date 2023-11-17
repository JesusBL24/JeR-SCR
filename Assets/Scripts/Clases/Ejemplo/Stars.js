class Stars{
    constructor(game) {
        this.stars = this.addStars(game);
    }

    addStars(game){
        var stars = game.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            //child.parentContainer = stars;

        });

        return stars;
    }

    addColliders(game, platforms){
        game.physics.add.collider(this.stars, platforms);
    }

}