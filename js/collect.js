var Collect = function(player1, player2, spriteName, numberOfCollectObj) {
    this.spriteName = spriteName || '';
    this.player1 = player1 || undefined;
    this.player2 = player2 || undefined;
    this.numberOfCollectObj = numberOfCollectObj || 1;
    this.content = [];
    this.flag = true;
    this.timerId;
    this.random = function() {
        for (let i = 0; i < this.numberOfCollectObj; i++) {
            let x = game.add.sprite(game.world.randomX, 20, this.spriteName);
            x.width = 20;
            x.height = 20;
            game.physics.arcade.enable(x);
            x.enableBody = true;
            x.body.immovable = true;
            x.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            x.body.gravity.y = 100;
            this.content.push(x);
        }
        this.flag = true;
    }

    this.clearContent = function() {
        this.content.splice(0, this.content.length);
    }

    this.checkAllContentKill = function() {
        let flag = true;
        if (this.content.length > 0) {
            for (let i = 0; i < this.content.length; i++) {
                if (this.content[i].inWorld) {
                    return false;
                }
            }
        }
        return flag;
    }

    this.update = function() {
        if (this.checkAllContentKill()) {
            if (this.flag) {
                this.clearContent();
                // this.random();

                var that = this;
                this.timerId = setTimeout(function() {
                    that.random();
                }, 5000);
                this.flag = false;
            }
        }

        for (var i = 0; i < this.content.length; i++) {
            var food = this.content[i];
            if (
                game.physics.arcade.overlap(
                    food,
                    player2.head,
                    CheckCollision, //(this.content[0], this.player2),
                    null,
                    this
                )
            ) {
                player2.addTail();
            }
            if (
                game.physics.arcade.overlap(
                    food,
                    player1.head,
                    CheckCollision, //(this.content[0], this.player2),
                    null,
                    this
                )
            ) {
                player1.addTail();

            }
        }


    }
}

var CheckCollision = function(content, player) {
    console.log(player);

    setTimeout(function() {
        if (content) {
            content.kill();

        }

    }, 10)
    this.content = [];
}