var Block = function(pos, val, sprite)
{
    this.position = pos;
    this.value = val;
    this.sprite = sprite;
}

var Map = function(width, blockSize, player)
{    
    this.blocks = [];
    this.player;
    var width = width;
    var blockSize = blockSize;
    var blocksNum = width / blockSize;
    var collidedBlock = undefined;
    var outOfTheMap = false;

    this.EditBlock = function()
    {

    }

    this.MoveBlocks = function()
    {

    }

    this.CheckCollision = function()
    {

    }

    this.GenerateBlocks = function()
    {
        console.log(blocksNum);
        for (let index = 0; index < blocksNum; index++) 
        {
            let sprite = game.add.sprite(index * blockSize, -20, "empty");
            game.physics.arcade.enable(sprite); 
            sprite.body.gravity.y = 50;
            let block = new Block({x:index * blockSize, y:-20}, 10, sprite);
            this.blocks.push(block);
        }
    }

    this.DestroyBlock = function()
    {

    }

    this.update = function()
    {
        if (this.blocks.length == 0)
        {
            this.GenerateBlocks();
        }
        //CheckCollision();
        this.MoveBlocks();
        
    }
}