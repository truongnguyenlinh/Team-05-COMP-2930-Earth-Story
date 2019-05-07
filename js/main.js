class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }

    preload() {
        this.load.image("card", "./assets/images/card.png");
        this.load.image("earth", "./assets/images/earth.png");
        this.load.image("timeline", "./assets/images/timeline.png");
        this.load.image("background", "./assets/images/background.png");
        this.load.image("star", "./assets/images/star.png");
        this.load.image("fill", "./assets/images/fill.png");
        this.load.spritesheet('card',
            './assets/images/cards.png',
            { frameWidth: 243, frameHeight: 167 }
        );
    }

    create() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasgame = document.getElementById("canvasGame");

        this.background = this.add.image(0, 0, "background").setOrigin(0,0);
        this.earth = this.add.image(game.config.width / 2 , this.canvasgame.height / 2, "earth");
        this.earth.displayWidth = this.canvasgame.width * 0.8;
        this.earth.displayHeight = this.earth.displayWidth;
        this.card = this.add.image(game.config.width / 2, this.canvasgame.height, "card");
        this.timeline = this.add.image(game.config.width / 2, this.canvasgame.height - 150, "timeline");

        this.star = this.add.image(150, this.canvasgame.height - 170, "star").setScale(.25);
        this.input.on("pointerup", this.endSwipe, this);
        this.cards = this.createCard();
        this.card.on('pointerdown', function(pointer, localX, localY, event){
            var tween = this.tweens.add({
                targets: [this.card, this.question],
                scaleX: 2.2,
                scaleY: 0,
                flipY: true,
                yoyo: false,
                duration: 200,
            });
            this.time.delayedCall(200, function(card){
                this.card.setFrame(1 - this.card.frame.name);
                // this.text = this.info
                if (this.card.frame.name === 1){
                    this.info.visible = true;
                    this.question.visible = false;
                } else {
                    this.info.visible = false;
                    this.question.visible = true;
                }
                // this.up = this.info;
                // this.question.text = "hi";
                var tween = this.tweens.add({
                    targets: this.card,
                    scaleX: 2,
                    scaleY: 2,
                    flipY: true,
                    yoyo: false,
                    duration: 200,
                });
                var tween = this.tweens.add({
                    targets: this.question,
                    scaleX: 1,
                    scaleY: 1,
                    flipY: true,
                    yoyo: false,
                    duration: 200,
                });
            }, this.card, this);

        }, this);

    }

    createCard() {
        this.question = this.add.text(-50, 0, 'Will you eat beef?',
            { fontSize: '50px', fill: '#000' });
        this.info = this.add.text(-50, 0, 'Beef has highest CO2 footprint',
            { fontSize: '50px', fill: '#000' });
        this.info.visible = false;
        let style = {color:'#000000', align:"left",boundsAlignH: "left"};
        this.card = this.add.image(0, 0 , "card", 0).setInteractive();
        this.card.setScale(2);
//         this.cardText = this.add.text(-100,0, "Questions go here", style);
        //container for the card
        this.container = this.add.container(game.config.width / 2, this.canvasgame.height / 2).setSize(this.canvasgame.width * 0.5, this.canvasgame.width * 0.5).setInteractive();
        this.container.add([this.card, this.question, this.info]);
    }

    moveStar() {
        if (this.star.x >= this.timeline.width + 100) {
            this.star.x = this.timeline.width + 100;
        } else {
            this.star.x += 50;
        }
    }

    endSwipe(e) {
        let swipeTime = e.upTime - e.downTime;
        let swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        let swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        let swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);

        if(swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {
            if(swipeNormal.x > 0.8) {
                // right
                $(this.container).animate({x: this.canvasgame.width + 1500, speed: "slow"});
                this.moveStar();
                this.createCard();
                this.card.on('pointerdown', function(pointer, localX, localY, event){
                    var tween = this.tweens.add({
                        targets: [this.card, this.question],
                        scaleX: 2.2,
                        scaleY: 0,
                        flipY: true,
                        yoyo: false,
                        duration: 200,
                    });
                    this.time.delayedCall(200, function(card){
                        this.card.setFrame(1 - this.card.frame.name);
                        // this.text = this.info
                        if (this.card.frame.name === 1){
                            this.info.visible = true;
                            this.question.visible = false;
                        } else {
                            this.info.visible = false;
                            this.question.visible = true;
                        }
                        // this.up = this.info;
                        // this.question.text = "hi";
                        var tween = this.tweens.add({
                            targets: this.card,
                            scaleX: 2,
                            scaleY: 2,
                            flipY: true,
                            yoyo: false,
                            duration: 200,
                        });
                        var tween = this.tweens.add({
                            targets: this.question,
                            scaleX: 1,
                            scaleY: 1,
                            flipY: true,
                            yoyo: false,
                            duration: 200,
                        });
                    }, this.card, this);

                }, this);


            }
            if(swipeNormal.x < -0.8) {
                // left
                $(this.container).animate({x: -1500, speed: "slow"});
                this.moveStar();
                this.createCard();
                this.card.on('pointerdown', function(pointer, localX, localY, event){
                    var tween = this.tweens.add({
                        targets: [this.card, this.question],
                        scaleX: 2.2,
                        scaleY: 0,
                        flipY: true,
                        yoyo: false,
                        duration: 200,
                    });
                    this.time.delayedCall(200, function(card){
                        this.card.setFrame(1 - this.card.frame.name);
                        // this.text = this.info
                        if (this.card.frame.name === 1){
                            this.info.visible = true;
                            this.question.visible = false;
                        } else {
                            this.info.visible = false;
                            this.question.visible = true;
                        }
                        // this.up = this.info;
                        // this.question.text = "hi";
                        var tween = this.tweens.add({
                            targets: this.card,
                            scaleX: 2,
                            scaleY: 2,
                            flipY: true,
                            yoyo: false,
                            duration: 200,
                        });
                        var tween = this.tweens.add({
                            targets: this.question,
                            scaleX: 1,
                            scaleY: 1,
                            flipY: true,
                            yoyo: false,
                            duration: 200,
                        });
                    }, this.card, this);

                }, this);

            }
            if(swipeNormal.y > 0.8) {
                // down
                $(this.container).animate({y: this.canvasgame.height});
            }
            if(swipeNormal.y < -0.8) {
                // up
                $(this.container).animate({y: this.canvasgame.height / 2});
            }
        }
        if (this.star.x === this.timeline.width){
            this.card.visible = false;
        }
    }
}

class BootScene extends Phaser.Scene {
    preload() {
        this.load.image("logo", "./assets/images/logo.png");
        this.load.image("bg", "./assets/images/background.png");
    }

    create() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasgame = document.getElementById("canvasGame");

        this.bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
        this.logo = this.add.image(this.canvasgame.width / 2, this.canvasgame.height / 2.5, "logo");
        this.logo.displayWidth = this.canvasgame.width * 0.9;
        this.logo.displayHeight = this.logo.displayWidth;

        this.button = this.add.text(this.canvasgame.width / 2, this.canvasgame.height / 1.35,
            "Play", {fill: "#FFFFFF", fontSize: "4em"});
        this.button.setInteractive().setOrigin(0.5, 0)
            .on("pointerdown", function () {
                this.scene.add("PlayGame", playGame, true);
                this.scene.setVisible(false);
            }, this);

        this.tutorial = this.add.text(this.canvasgame.width / 2, this.canvasgame.height / 1.25,
            "Tutorial", {fill: "#FFFFFF", fontSize: "4em"});
        this.tutorial.setInteractive().setOrigin(0.5, 0);

        this.options = this.add.text(this.canvasgame.width / 2, this.canvasgame.height / 1.15,
            "Options", {fill: "#FFFFFF", fontSize: "4em"});
        this.options.setInteractive().setOrigin(0.5, 0);
    }
}