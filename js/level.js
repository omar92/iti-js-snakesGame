var Block = function (pos, val, sprite) {
    this.position = pos;
    this.text = val;
    this.sprite = sprite;
    this.destroyed = false;
};
var blockFallSpeed = 0;
var Map = function (width, blockSize, player1, player2, end) {
    this.blocks = [];
    this.end;
    this.player1 = player1;
    this.player2 = player2;
    var maxBlocksNum = width / blockSize;
    var collidedBlock = undefined;
    var collidedPlayer = undefined;
    var outOfTheMap = false;
    var playerFallBackSpeed = 0;
    var blockStartingPosition = -100;
    blockFallSpeed = 400;
    var blockMin;
    var blockMax;

    var CheckCollision = function (block, player) {
        let val = parseInt(this.collidedBlock.text.text);
        val--;
        this.collidedBlock.text.text = val.toString();

        for (var index = 0; index < this.collidedPlayer.content.length; index++) {
            this.collidedPlayer.content[index].y += playerFallBackSpeed;
        }

        this.collidedPlayer.removeTail();

        if (val <= 0) {

            this.DestroyBlock(this.collidedBlock);


        }
    };


    var IsOutOfMap = function (block, end) {
        //console.log("colliding");
        this.DestroyBlocks();
    };

    this.GenerateBlocks = function (blocksNum) {
        blockFallSpeed += 10;
        var positions = [];
        var planets = [];
        for (let i = 0; i < maxBlocksNum; i++) {
            positions.push(i);
            planets.push(i);
        }
        //console.log(blocksNum);
        //console.log(maxBlocksNum);
        //console.log(positions);
        for (let index = 0; index < blocksNum; index++) {
            var randPosition = positions.splice(
                Math.floor(Math.random() * positions.length),
                1
            );
            var randPlanet = planets.splice(
                Math.floor(Math.random() * planets.length),
                1
            );

            let sprite = game.add.sprite(0, 0, "planet_0" + randPlanet);
            blockSize = ((screenSize.x) / (maxBlocksNum-1 ));
            sprite.position.set(
                randPosition * blockSize,
                blockStartingPosition
            );

            sprite.scale.set(.25);
            //  sprite.anchor.set(0.5);
            //  sprite.tint = getRandomColor();
            var style = {
                font: "25px Arial",
                fill: "#ffffff",
                wordWrap: true,
                wordWrapWidth: sprite.width,
                align: "center"
            };
            text = game.add.text(0, 0, "3", style);
            text.stroke = '#000000';
            text.strokeThickness = 5;
           // text.fill = '#43d637';
            text.anchor.set(0.5);
            game.physics.arcade.enable(sprite);
            sprite.body.immovable = true;
            sprite.body.velocity.y = blockFallSpeed;
            let block = new Block({ x: index * blockSize, y: blockStartingPosition },
                text,
                sprite
            );
            this.blocks.push(block);
        }

        let ind1 = Math.round(Math.random() * (blocksNum - 1));
        let ind2 = Math.round(Math.random() * (blocksNum - 1));

        if (blocksNum === maxBlocksNum) {
            if (player1.health >= 1) {
                this.blocks[ind1].text.text = (player1.health - 1).toString();
            } else {
                let rnd = Math.round(
                    1 +
                    Math.random() *
                    (player1.health > player2.health ? player1.health - 1 : player2.health - 1)
                );
                this.blocks[ind1].text.text = rnd.toString();
            }

            if (player2.health >= 1) {
                this.blocks[ind2].text.text = (player2.health - 1).toString();
            } else {
                let rnd = Math.round(
                    1 +
                    Math.random() *
                    (player1.health > player2.health ? player1.health - 1 : player2.health - 1)
                );
                this.blocks[ind2].text.text = rnd.toString();
            }
        }

        for (let index = 0; index < this.blocks.length; index++) {
            if (index !== ind1 && index !== ind2) {
                let rnd = Math.round(
                    1 +
                    Math.random() *
                    (player1.health > player2.health ? player1.health - 1 : player2.health - 1)
                );
                this.blocks[index].text.text = rnd.toString();
            }

            if (parseInt(this.blocks[index].text.text) === 0) {
                //   this.DestroyBlock(this.blocks[index]);
            }
        }
    };

    this.DestroyBlock = function (block) {

        block.sprite.destroy(true);
        block.text.destroy(true);
        console.log(this.blocks.length);

        block.destroyed = true;

        console.log(this.blocks);

        if (this.blocks.length === 1) {
            // console.log("here")
            // this.blocks = [];
            //return;
        }

        if (this.blocks) {
            //this.blocks.splice(this.blocks.indexOf(block), 1)

            var arr = [];
            for (let index = 0; index < this.blocks.length; index++) {
                if (this.blocks[index].destroyed) {
                    this.blocks.splice(index, 1);
                }
            }

            if (this.blocks.length === 0) {
                // console.log("here")
                this.blocks = [];
            }
        }
    };

    this.DestroyBlocks = function () {
        for (var index = 0; index < this.blocks.length; index++) {
            this.blocks[index].sprite.destroy(true);
            this.blocks[index].text.destroy(true);
        }

        this.blocks = [];
    };

    this.update = function () {
        var blocksNum = Math.floor(Math.random() * (maxBlocksNum) - 1) + 1;
        //      console.log(this.blocks.length);
        //console.log("blocksNum :" + blocksNum);
        if (this.blocks.length === 0) {
            //          console.log(this.blocks.length * 20);

            this.GenerateBlocks(blocksNum > maxBlocksNum ? maxBlocksNum : blocksNum);
        } else {

            for (var index = 0; index < this.blocks.length; index++) {
                this.collidedBlock = this.blocks[index];
                this.blocks[index].text.x = Math.floor(
                    this.blocks[index].sprite.x + this.blocks[index].sprite.width / 2
                );
                this.blocks[index].text.y = Math.floor(
                    this.blocks[index].sprite.y + this.blocks[index].sprite.height / 2+7
                );
                //game.physics.arcade.collide(this.blocks[index].sprite, player1.content, CheckCollision, null, this);
                // game.physics.arcade.collide(this.blocks[index].sprite, player2.content, CheckCollision, null, this);

                this.collidedPlayer = this.player1;

                if (this.blocks[index] &&
                    game.physics.arcade.overlap(
                        this.blocks[index].sprite,
                        player1.head,
                        CheckCollision,
                        null,
                        this
                    )
                ) {
                    if (this.player1.health === 0) {
                        this.player2.win = 1;
                        blockFallSpeed = 0;
                    }
                }
                this.collidedPlayer = this.player2;

                if (this.blocks[index] &&
                    game.physics.arcade.overlap(
                        this.blocks[index].sprite,
                        player2.head,
                        CheckCollision,
                        null,
                        this
                    )
                ) {
                    if (this.player2.health === 0) {
                        this.player1.win = 1;
                        blockFallSpeed = 0;
                    }
                }

                if (this.blocks[index]) {
                    game.physics.arcade.overlap(
                        end,
                        this.blocks[index].sprite,
                        IsOutOfMap,
                        null,
                        this
                    );
                }
            }
        }

        this.collidedBlock = undefined;
        this.collidedPlayer = undefined;
    }
};