var mainState = {
    preload: function() {
        game.load.image("player1", "assets/player.png");
        game.load.image("player2", "assets/player2.png");
        game.load.image("empty", "assets/empty.png");
        game.load.audio("collesion", "assets/audio/SoundEffects/crash.mp3");

    },

    create: function() {
        SoundManager.init(function onInit(params) {});
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.playerOne = new CreatPlayer("player1");
        this.playerOne.init();
        this.playerOne.setControlKey("cursor");
        //     this.playerOne.removeTail();

        this.playerTwo = new CreatPlayer("player2");
        this.playerTwo.init();
        this.playerTwo.setControlKey("");
        //     this.playerTwo.addTail();
        this.end = game.add.sprite(0, 750, "empty");
        this.end.width = 1000;
        game.physics.arcade.enable(this.end);

        this.map = new Map(500, 100, this.playerOne, this.playerTwo, this.end);
        this.playerOne.map = this.map;
        this.playerTwo.map = this.map;

        this.collector = new Collect(this.playerOne, this.playerTwo, "player1", 1);
        this.aler = 0;
    },

    update: function() {
        // This function is called 60 times per second // It contains the game's logic
        if (SoundManager.initialiased) {
            this.playerOne.move();
            this.playerTwo.move();
            this.map.update();
            this.collector.update();
            if (this.playerOne.win || this.playerTwo.win) {
                if (this.playerOne.win && this.playerTwo.win) {
                    if (!this.aler) {
                        var conf = alert("Draw");
                        this.aler = 1;
                    }
                } else {
                    if (!this.aler) {
                        if (this.playerOne.win) {
                            var conf = alert("player1 win");
                            this.aler = 1;
                        } else if (this.playerTwo.win) {
                            var conf = alert("player2 win");
                            this.aler = 1;
                        }
                    }

                }
                //location.reload();
                game.state.restart();
            }


        }
    }
};

// We initialising Phaser
var game = new Phaser.Game(500, 600, Phaser.AUTO, "gameDiv");
// And finally we tell Phaser to add and start our 'main' state

game.state.add("main", mainState);

game.state.start("main");