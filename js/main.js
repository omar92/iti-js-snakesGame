var mainState = 
{
    preload: function() 
    {

        game.load.image('player1', 'assets/player.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.image('empty', 'assets/empty.png');

    },

    create: function() 
    {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.playerOne = new CreatPlayer('player1');
        this.playerOne.init();
        this.playerOne.setControlKey('cursor');
        this.playerOne.removeTail();
        this.map = new Map(500, 100, this.playerOne);

        this.playerTwo = new CreatPlayer('player2');
        this.playerTwo.init();
        this.playerTwo.setControlKey('');
        this.playerTwo.addTail();


    },

    update: function() 
    {
        // This function is called 60 times per second // It contains the game's logic 
        this.playerOne.move();
        this.playerTwo.move();
        this.map.update();
    },




};

// We initialising Phaser 
var game = new Phaser.Game(500, 600, Phaser.AUTO, 'gameDiv');
// And finally we tell Phaser to add and start our 'main' state 

game.state.add('main', mainState);

game.state.start('main');