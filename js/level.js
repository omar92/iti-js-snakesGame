var Block = function(pos, val, sprite)
{
    this.position = pos;
    this.text = val;
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
        let val = parseInt(this.collidedBlock.text.text);
        val--;

        if (val <= 0)
        {
            this.DestroyBlock(this.collidedBlock);
        }

        this.collidedBlock.text.text = val.toString();

        console.log(val);
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
            var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: sprite.width, align: "center", backgroundColor: "#ffff00" };
            text = game.add.text(0, 0, "10", style);

            text.anchor.set(0.5);
            game.physics.arcade.enable(sprite); 
            //sprite.body.gravity.y = 50;
            let block = new Block({x:index * blockSize, y:-100}, text, sprite);
            this.blocks.push(block);
        }

        for (var index = 0; index < this.blocks.length; index++) 
        {
            this.blocks[index].sprite.body.velocity.y = 70;           
        }
    }

    this.DestroyBlock = function(block)
    {
        block.sprite.destroy(true);
        block.text.destroy(true);
        block = undefined;

        for (var index = 0; index < this.blocks.length; index++) 
        {
            if (this.blocks[index] == undefined)
            {
                break;
            }         
        }

        this.blocks.splice(index, 1);
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
            this.collidedBlock = this.blocks[index];
            this.blocks[index].text.x = Math.floor(this.blocks[index].sprite.x + this.blocks[index].sprite.width / 2);
            this.blocks[index].text.y = Math.floor(this.blocks[index].sprite.y + this.blocks[index].sprite.height / 2);
            game.physics.arcade.overlap(this.blocks[index].sprite, player.content, CheckCollision, null, this);            
            game.physics.arcade.overlap(end, this.blocks[index].sprite, IsOutOfMap, null, this);            
        }

        this.collidedBlock = undefined;     
    }
}