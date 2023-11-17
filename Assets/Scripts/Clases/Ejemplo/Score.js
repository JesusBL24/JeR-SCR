class Score{
    constructor(game) {
        this.score = 0;
        this.scoreText = this.addScore(game);
    }

    addScore(game){
        var scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        return scoreText;
    }
}