var Block = function(pos, val, sprite)
{
    this.position = pos;
    this.value = val;
    this.sprite = sprite;
}

var Map = function(width, blockSize, player, end)
{    
    this.blocks = [];
    this.end;
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

    var CheckCollision = function(block, player)
    {
        block.value--;

        if (block.value <= 0)
        {
            this.DestroyBlock(block);
        }

        //console.log("colliding");
    }

    var IsOutOfMap = function(block, end)
    {
        console.log("colliding");
        this.DestroyBlocks();
    }

    this.GenerateBlocks = function()
    {
        console.log(blocksNum);
        for (let index = 0; index < blocksNum; index++) 
        {
            let sprite = game.add.sprite(index * blockSize, -100, "empty");
            game.physics.arcade.enable(sprite); 
            //sprite.body.gravity.y = 50;
            let block = new Block({x:index * blockSize, y:-100}, 10, sprite);
            this.blocks.push(block);
        }

        for (var index = 0; index < this.blocks.length; index++) 
        {
            this.blocks[index].sprite.body.velocity.y = 70;           
        }
    }

    this.DestroyBlock = function(block)
    {

    }

    this.DestroyBlocks = function()
    {
        for (var index = 0; index < this.blocks.length; index++) 
        {
            this.blocks[index].sprite.destroy(true);         
        }

        this.blocks = [];
    }

    this.update = function()
    {
        if (this.blocks.length == 0)
        {
            console.log(this.blocks.length);
            
            this.GenerateBlocks();
        }
        
        for (var index = 0; index < this.blocks.length; index++) 
        {
            game.physics.arcade.overlap(player.head, this.blocks[index].sprite, CheckCollision, null, this);            
            game.physics.arcade.overlap(end, this.blocks[index].sprite, IsOutOfMap, null, this);            
        }

        this.MoveBlocks();        
    }
}