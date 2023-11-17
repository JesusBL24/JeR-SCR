class Escenario{
    constructor(game) {
        this.backGround = this.addBackground(game);
        this.platforms = this.addPlatforms(game);
    }

    addPlatforms(game){
        var platforms = game.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        return platforms;
    }

    addBackground(game){
        var backGround = game.add.image(400, 300, 'sky');
        return backGround;
    }
}