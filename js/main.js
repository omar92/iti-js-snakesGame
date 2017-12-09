var winnerName = "";
var screenSize = { x: 500, y: 600 };
var mainState = {
    preload: function() {
        game.load.image("player1", "assets/player1.png");
        game.load.image("player2", "assets/player2.png");
        game.load.image("tail", "assets/tail.png");
        game.load.image("empty", "assets/empty.png");
        game.load.image("life", "assets/star.png");
        game.load.image("env", "assets/bg.png");
        game.load.image("planet_00", "assets/planet_00.png");
        game.load.image("planet_01", "assets/planet_01.png");
        game.load.image("planet_02", "assets/planet_02.png");
        game.load.image("planet_03", "assets/planet_03.png");
        game.load.image("planet_04", "assets/planet_04.png");
        game.load.audio("collesion", "assets/audio/SoundEffects/crash.mp3");
        game.load.audio("bgSound", "assets/audio/SoundEffects/music-snake.mp3");

    },


    create: function() {


        this.bg = game.add.sprite(0, 0, 'env');
        this.bg.width = screenSize.x;
        this.bg.height = screenSize.y;
        game.stage.backgroundColor = this.bg;


        SoundManager.init(function onInit(params) { SoundManager.playSound("bgSound", true); });
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.playerOne = new CreatPlayer('player1');
        this.playerOne.x = this.playerOne.x + 20;
        this.playerOne.init();
        this.playerOne.setControlKey("cursor");


        this.playerTwo = new CreatPlayer('player2');
        this.playerTwo.x = this.playerTwo.x - 20;
        this.playerTwo.init();
        this.playerTwo.setControlKey("");

        this.end = game.add.sprite(0, 750, "empty");
        this.end.width = 1000;
        game.physics.arcade.enable(this.end);

        this.map = new Map(500, 100, this.playerOne, this.playerTwo, this.end);
        this.playerOne.map = this.map;
        this.playerTwo.map = this.map;

        this.collector = new Collect(this.playerOne, this.playerTwo, "life", 1);
        this.aler = 0;

        ////////////////////////////////////////////
        this.playerImg = game.add.sprite(10, 10, 'player1');
        this.playerImg.width = 30;
        this.playerImg.height = 30;



        var style = { font: "bold 20px Arial", fill: "white", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text1 = game.add.text(0, 0, "0", style);
        this.text1.setTextBounds(50, 23, 0, 0);


        this.playerImg = game.add.sprite(470, 10, 'player2');
        this.playerImg.width = 30;
        this.playerImg.height = 30;


        this.text2 = game.add.text(0, 0, "0", style);
        this.text2.setTextBounds(455, 23, 0, 0);

    },

    update: function() {

        if (SoundManager.initialiased) {
            this.playerOne.move();
            this.playerTwo.move();

            this.text1.text = this.playerOne.health;
            this.text2.text = this.playerTwo.health;

            this.map.update();
            this.collector.update();
            if (this.playerOne.win || this.playerTwo.win) {
                if (this.playerOne.win && this.playerTwo.win) {
                    if (!this.aler) {

                        winnerName = "Draw";
                        this.aler = 1;
                    }
                } else {
                    if (!this.aler) {
                        if (this.playerOne.win) {

                            winnerName = "player1";
                            this.aler = 1;
                        } else if (this.playerTwo.win) {

                            winnerName = "player2";
                            this.aler = 1;
                        }
                    }

                }
                clearTimeout(this.collector.timerId);

                game.state.start("win");
            }


        }
    }
};




// We initialising Phaser
var game = new Phaser.Game(500, 600, Phaser.AUTO, "gameDiv");

game.state.add("main", mainState);
game.state.add("win", winnerState);

game.state.start("main");