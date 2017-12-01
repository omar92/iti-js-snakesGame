var Block = function(pos, val, sprite)
{
    this.position = pos;
    this.text = val;
    this.sprite = sprite;
}

var Map = function(width, blockSize, player1, player2, end)
{    
    this.blocks = [];
    this.end;
    this.player1 = player1;
    this.player2 = player2;
    var width = width;
    var blockSize = blockSize;
    var blocksNum = width / blockSize;
    var collidedBlock = undefined;
    var collidedPlayer = undefined;
    var outOfTheMap = false;
    var playerFallBackSpeed = 20;
    var blockStartingPosition = -100;
    var blockFallSpeed = 70;

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
        this.collidedBlock.text.text = val.toString();

        for (var index = 0; index < this.collidedPlayer.content.length; index++) 
        {
            this.collidedPlayer.content[index].y += playerFallBackSpeed;      
        }

        this.collidedPlayer.removeTail();

        if (val <= 0)
        {
            this.DestroyBlock(this.collidedBlock);
        }
    }

    var IsOutOfMap = function(block, end)
    {
        console.log("colliding");
        this.DestroyBlocks();
    }

    this.GenerateBlocks = function()
    {
        for (let index = 0; index < blocksNum; index++) 
        {
            let sprite = game.add.sprite(index * blockSize, blockStartingPosition, "empty");
            var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: sprite.width, align: "center" };
            text = game.add.text(0, 0, "3", style);

            text.anchor.set(0.5);
            game.physics.arcade.enable(sprite); 
            sprite.body.immovable = true;
            sprite.body.velocity.y = blockFallSpeed;
            let block = new Block({x:index * blockSize, y:blockStartingPosition}, text, sprite);
            this.blocks.push(block);
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
            //game.physics.arcade.collide(this.blocks[index].sprite, player1.content, CheckCollision, null, this);
           // game.physics.arcade.collide(this.blocks[index].sprite, player2.content, CheckCollision, null, this);
            this.collidedPlayer = this.player1;
            game.physics.arcade.overlap(this.blocks[index].sprite, player1.head, CheckCollision, null, this);        
            this.collidedPlayer = this.player2;                
            game.physics.arcade.overlap(this.blocks[index].sprite, player2.head, CheckCollision, null, this);            
            game.physics.arcade.overlap(end, this.blocks[index].sprite, IsOutOfMap, null, this);            
        }

        this.collidedBlock = undefined;     
        this.collidedPlayer = undefined;     
    }
}