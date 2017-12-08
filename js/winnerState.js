var winnerState = {

    preload: function() {
        game.load.image("win", "assets/winner.png");
        game.load.image("button", "assets/playAgain.png");
        game.load.image("player1", "assets/player1.png");
        game.load.image("player2", "assets/player2.png");
        game.load.image("tail", "assets/tail.png");
        game.load.image("winnerWord", "assets/winnerWord.png");
        game.load.image("drawWord", "assets/drawWord.png");

    },

    create: function() {

        this.bg = game.add.sprite(0, 0, 'win');
        this.bg.width = 500;
        this.bg.height = 600;
        game.stage.backgroundColor = this.bg;

        if (winnerName !== "Draw") {
            this.wordImg = game.add.sprite(game.world.centerX, game.world.centerY - 130, 'winnerWord');
            this.wordImg.anchor.setTo(0.5, 0.5);
            this.wordImg.scale.setTo(.5);


            this.playerImg = game.add.sprite(game.world.centerX, game.world.centerY - 20, winnerName);
            this.playerImg.anchor.setTo(0.5, 0.5);

            this.playerImg.scale.setTo(.3);


            this.TailImg = game.add.sprite(game.world.centerX, game.world.centerY + 55, 'tail');
            this.TailImg.anchor.setTo(0.5, 0.5);
            this.TailImg.scale.setTo(.3);
        } else {
            this.wordImg = game.add.sprite(game.world.centerX, game.world.centerY - 50, 'drawWord');
            this.wordImg.anchor.setTo(0.5, 0.5);
            this.wordImg.scale.setTo(.6);
        }

        button = game.add.button(game.world.centerX, 500, 'button', this.actionOnClick, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
        button.width = 260;
        button.height = 80;


    },

    update: function() {

    },

    actionOnClick: function() {

        game.state.start("main");
    }

};