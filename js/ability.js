var Ability = function(player1, player2, spriteName, abilityName) {
    this.spriteName = spriteName;
    this.abilityName = abilityName;
    this.currentIndex = null;
    this.content = null;
    this.player1 = player1 || undefined;
    this.player2 = player2 || undefined;
    this.flag = true;
    this.timerId;
    this.random = function() {
        this.content = game.add.sprite(game.world.randomX, 20, this.spriteName);
        this.content.anchor.setTo(0.5, 0.5);
        this.content.width = 20;
        this.content.height = 20;
        game.physics.arcade.enable(this.content);
        this.content.enableBody = true;
        this.content.body.immovable = true;
        this.content.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.content.body.gravity.y = 100;
        this.flag = true;
    }

    this.clearContent = function() {
        this.content = null;
    }

    this.checkAllContentKill = function() {
        let flag = true;
        if (this.content) {

            if (this.content.inWorld) {
                return false;
            }
        }
        return flag;
    }

    this.update = function() {
        if (this.checkAllContentKill()) {
            if (this.flag) {
                this.clearContent();
                var that = this;
                this.timerId = setTimeout(function() {
                    that.random();
                }, 8000);
                this.flag = false;
            }
        }

        if (this.content) {
            var ability = this.content;
            if (
                game.physics.arcade.overlap(
                    ability,
                    player2.head,
                    function(content, player) {
                        console.log(player);

                        setTimeout(function() {
                            if (content) {
                                content.kill();

                            }

                        }, 10)
                        this.content = null;
                    },
                    null,
                    this
                )
            ) {
                player2.ability = this.abilityName;
            }
            if (
                game.physics.arcade.overlap(
                    ability,
                    player1.head,
                    function(content, player) {
                        console.log(player);

                        setTimeout(function() {
                            if (content) {
                                content.kill();

                            }

                        }, 10)
                        this.content = null;
                    },
                    null,
                    this
                )
            ) {
                player1.ability = this.abilityName;

            }



        }
    }
}