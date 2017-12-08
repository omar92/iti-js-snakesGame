var CreatPlayer = function(imageName) {

    this.head;
    this.content = [];
    this.spriteName = imageName || "";
    this.x = game.world.centerX;
    this.y = game.world.centerY + 130;
    this.height = 22;
    this.health = 2;
    this.LeftFlag = false;
    this.RightFlag = false;
    this.cursor;
    this.tweens = [];
    this.map;

    this.win;

    this.init = function() {

        this.content.push(
            game.add.sprite(this.x, this.y, this.spriteName)
        );
        this.content[0].anchor.setTo(0.5, 0.5);
        this.content[0].width = 50;
        this.content[0].height = 50;
        //this.content[i].tint = color; //'0xff0000';//getRandomColor();
        game.physics.arcade.enable(this.content[0]);

        for (let i = 1; i < this.health + 1; i++) {
            this.content.push(
                game.add.sprite(this.x, this.y + i * this.height + 15, 'tail')
            );
            this.content[i].anchor.setTo(0.5, 0.5);
            this.content[i].width = 20;
            this.content[i].height = 20;
            //this.content[i].tint = color; //'0xff0000';//getRandomColor();
            game.physics.arcade.enable(this.content[i]);
        }
        this.head = this.content[0];
    };

    this.addTail = function() {
        this.x = this.content[this.content.length - 1].x;
        this.y = this.content[this.content.length - 1].y;
        this.content.push(
            game.add.sprite(this.x, this.y + this.height, 'tail')
        );
        this.content[this.content.length - 1].anchor.setTo(0.5, 0.5);
        //this.content[this.content.length - 1].tint = color;
        this.content[this.content.length - 1].width = 20;
        this.content[this.content.length - 1].height = 20;
        game.physics.arcade.enable(this.content[this.content.length - 1]);
        this.health++;
    };
    this.setControlKey = function(keyType) {
        if (keyType === "cursor") {
            this.cursor = game.input.keyboard.createCursorKeys();
        } else {
            this.cursor = {
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D)
            };
        }
    };



    this.removeTail = function() {
        SoundManager.playSound(SoundManager.SOUNDS.COLLISION);
        this.content[this.content.length - 1].destroy(true);
        this.content.pop();
        this.health--;
    };

    this.move = function() {
            if (this.content.length > 0) {
                if (this.cursor.left.isDown) {
                    if (this.RightFlag) {
                        this.removeAllTweens();
                        this.RightFlag = false;
                    }

                    let postion = this.content[0].x - 30;

                    if (postion <= 10) postion = 10;

                    for (let index = 0; index < this.content.length; index++) {
                        this.tweens.push(
                            game.add
                            .tween(this.content[index])
                            .to({ x: postion }, 200 + index * 200, "Quart.easeOut")
                        );
                        this.tweens[this.tweens.length - 1].start();
                    }

                    this.LeftFlag = true;
                } else if (this.cursor.right.isDown) {
                    //console.log("flag= " + this.LeftFlag);

                    if (this.LeftFlag) {
                        this.removeAllTweens();
                        this.LeftFlag = false;
                    }
                    let postion = this.content[0].x + 30;

                    if (postion >= 490) postion = 490;

                    for (let index = 0; index < this.content.length; index++) {
                        this.tweens.push(
                            game.add
                            .tween(this.content[index])
                            .to({ x: postion }, 200 + index * 200, "Quart.easeOut")
                        );
                        this.tweens[this.tweens.length - 1].start();
                    }
                    this.RightFlag = true;
                }

                this.head = this.content[0];
                /*
                      for (let index = 0; index < this.map.blocks.length; index++) 
                      {
                          game.physics.arcade.overlap(this.map.blocks[index].sprite, this.head, CheckCollision, null, this);            
                      }
                      */
            }
        },
        this.removeAllTweens = function() {
            let x = this.tweens.length;
            for (let i = 0; i < x; i++) {
                this.tweens[this.tweens.length - 1].stop();
                this.tweens.pop();
            }
        };

    var CheckCollision = function() {};
};