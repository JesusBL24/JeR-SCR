class Bombas{
    constructor(game) {
        this.bombs = this.addBombs(game);
    }

    addBombs(game){
        var bombs = game.physics.add.group();
        return bombs;
    }

    addColliders(game, platforms){
        game.physics.add.collider(this.bombs, platforms);
    }

}