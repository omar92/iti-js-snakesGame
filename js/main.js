var winnerName = "";
var player1color = '0xff0000';
var player2color = '0x0000ff';
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
     

    },


    create: function() {


        this.bg = game.add.sprite(0, 0, 'env');
        this.bg.width = screenSize.x;
        this.bg.height = screenSize.y;
        game.stage.backgroundColor = this.bg;


        SoundManager.init(function onInit(params) {});
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.playerOne = new CreatPlayer('player1');
        this.playerOne.x = this.playerOne.x + 20;
        this.playerOne.init();
        this.playerOne.setControlKey("cursor");
        //     this.playerOne.removeTail();

        this.playerTwo = new CreatPlayer('player2');
        this.playerTwo.x = this.playerTwo.x - 20;
        this.playerTwo.init();
        this.playerTwo.setControlKey("");
        //     this.playerTwo.addTail();
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

        // this.playerImg.tint = player1color;

        var style = { font: "bold 20px Arial", fill: "white", boundsAlignH: "center", boundsAlignV: "middle" };

        this.text1 = game.add.text(0, 0, "0", style);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        this.text1.setTextBounds(50, 23, 0, 0);


        this.playerImg = game.add.sprite(470, 10, 'player2');
        this.playerImg.width = 30;
        this.playerImg.height = 30;
        //this.playerImg.tint = player2color;

        this.text2 = game.add.text(0, 0, "0", style);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        this.text2.setTextBounds(455, 23, 0, 0);
    },

    update: function() {
        // This function is called 60 times per second // It contains the game's logic
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
                        // var conf = alert("Draw");
                        winnerName = "Draw";
                        this.aler = 1;
                    }
                } else {
                    if (!this.aler) {
                        if (this.playerOne.win) {
                            //var conf = alert("player1 win");
                            winnerName = "Player1";
                            this.aler = 1;
                        } else if (this.playerTwo.win) {
                            // var conf = alert("player2 win");
                            winnerName = "Player2";
                            this.aler = 1;
                        }
                    }

                }
                //location.reload();
                //game.state.restart();
                game.state.start("win");
            }


        }
    }
};


var winnerState = {

    preload: function() {
        game.load.image("win", "assets/youwin.png");
        game.load.image("button", "assets/PlayAgainButton.png");


    },

    create: function() {
        this.bg = game.add.sprite(0, 0, 'win');


        this.bg.x = game.world.centerX - (this.bg.width / 2);
        this.bg.y = game.world.centerY - (this.bg.height / 2);



        this.bg.x = game.world.centerX - (this.bg.width / 2);
        this.bg.y = game.world.centerY - (this.bg.height / 2);
        this.playerImg = game.add.sprite(10, 10, 'player1');
        this.playerImg.width = 30;
        this.playerImg.height = 30;
        game.stage.backgroundColor = "#fff";

        var style = { font: "bold 14px Arial", fill: "rgb(0,1,0)", boundsAlignH: "center", boundsAlignV: "middle" };

        if (winnerName !== "Draw") {
            this.playerImg = game.add.sprite(229, 210, 'player1');
            this.playerImg.tint = winnerName === "Player1" ? player1color : player2color;
            this.playerImg.scale.setTo(1.75)
        }
        //  The Text is positioned at 0, 100
        text = game.add.text(0, 0, winnerName, style);
        text.setShadow(3, 3, 'rgba(1,1,1,0.5)', 2);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        text.setTextBounds(250, 190, 0, 0);

        button = game.add.button(game.world.centerX, 500, 'button', this.actionOnClick, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
        button.width = 200;
        button.height = 90;


    },

    update: function() {

    },

    actionOnClick: function() {

        // console.log("button clicked");
        game.state.start("main");
    }

};

// We initialising Phaser
var game = new Phaser.Game(500, 600, Phaser.AUTO, "gameDiv");
// And finally we tell Phaser to add and start our 'main' state

game.state.add("main", mainState);
game.state.add("win", winnerState);

game.state.start("main");