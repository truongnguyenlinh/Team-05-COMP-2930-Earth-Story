let gameInstance = null;

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
        gameInstance = this;
    }


    preload() {
        this.load.image("earth", "./assets/images/earth.png");
        this.load.image("timeline", "./assets/images/timeline.png");
        this.load.image("background", "./assets/images/background.png");
        this.load.spritesheet('card', './assets/images/cards.png', { frameWidth: 167, frameHeight: 243 });
        this.load.image("star", "./assets/images/star.png");
        this.load.image("eco", "./assets/images/icons/eco.png");
        this.load.image("env", "./assets/images/icons/env.png");
        this.load.image("res", "./assets/images/icons/res.png");
        this.load.image("soc", "./assets/images/icons/soc.png");
    }


    create() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
        this.earth = this.add.image(game.config.width / 2, this.canvasGame.height / 2, "earth");
        this.earth.width = this.canvasGame.width * 0.8;
        this.earth.height = this.earth.width;
        this.timeline = this.add.image(0, 0, "timeline");
        this.star = this.add.image(-this.timeline.width / 2 * 0.9, 0, "star").setScale(.25);

        this.containerTimeline = this.add.container(game.config.width / 2, this.canvasGame.height * 0.9).setSize(this.timeline.width, this.timeline.height);
        this.containerTimeline.add([this.star, this.timeline]);


        this.setupIcons();

        this.input.on("pointerup", this.endSwipe, this);
        this.cards = this.createCard();
        this.flip = this.flipCard();
    }

    createCard() {
        this.card = this.add.image(0, 0 , "card", 0).setInteractive();
        this.card.setScale(3);
        this.currentEvent = getRandomEvent();

        let style = {
            color:'#FF0000',
            align:"center",
            boundsAlignH: "center",
            fontSize: '50px',
            wordWrap: {
                width: this.card.width * 3,
                useAdvancedWrap: false }
        };

        this.question = this.add.text(0, 0, this.currentEvent["question"], style).setOrigin(0.5, 0.5);
        this.info = this.add.text(0, 0, this.currentEvent["info"], style).setOrigin(0.5, 0.5);
        this.info.visible = false;
        //container for the card
        this.container = this.add.container(game.config.width / 2, this.canvasGame.height / 2)
            .setSize(this.canvasGame.width * 0.5, this.canvasGame.width * 0.5)
            .setInteractive();
        this.container.add([this.card, this.question, this.info]);
        if (this.containerTimeline.first.x === this.timeline.width  / 2 * 0.9) {
            this.container.visible = false;
        }
    }


    moveStar() {
        if (this.containerTimeline.first.x + this.containerTimeline.first.width * 0.25  > this.containerTimeline.width / 2) {
            this.containerTimeline.first.x = this.containerTimeline.width / 2 * 0.9;
            return true;

        } else {
            this.containerTimeline.first.x  += this.containerTimeline.width / 30;
        }
    }


    flipCard(){
        this.card.on('pointerdown', function(pointer, localX, localY, event){
            this.cardTween = this.tweens.add({
                targets: this.card,
                scaleY: 3.2,
                scaleX: 0,
                flipX: true,
                yoyo: false,
                duration: 200,
            });

            this.wordTween = this.tweens.add({
                targets: [this.question, this.info],
                scaleY: 1.2,
                scaleX: 0,
                flipX: true,
                yoyo: false,
                duration: 200,
            });


            this.time.delayedCall(200, function(card){
                this.card.setFrame(1 - this.card.frame.name);
                if (this.card.frame.name === 1){
                    this.info.visible = true;
                    this.question.visible = false;
                } else {
                    this.info.visible = false;
                    this.question.visible = true;
                }

                this.cardTween = this.tweens.add({
                    targets: this.card,
                    scaleY: 3,
                    scaleX: 3,
                    flipX: true,
                    yoyo: false,
                    duration: 200,
                });
                this.wordTween = this.tweens.add({
                    targets: [this.question, this.info],
                    scaleY: 1,
                    scaleX: 1,
                    flipX: true,
                    yoyo: false,
                    duration: 200,
                });
            }, this.card, this);
        }, this);
    }


    endSwipe(e) {
        let swipeTime = e.upTime - e.downTime;
        let swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        let swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        let swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);

        if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {
            if (swipeNormal.x > 0.8) {
                // right
                $(this.container).animate({x: this.canvasGame.width + 1500, speed: "slow"});
                this.time.delayedCall(1500, function (container) {
                    if (this.container.x === this.canvasGame.width + 1500){
                        this.container.destroy();

                    }
                }, this.container, this);

                this.time.delayedCall(800, function (swipe) {
                    this.swipeX("yes");
                }, this.swipeX, this);
            }
            if (swipeNormal.x < -0.8) {
                // left
                $(this.container).animate({x: -1500, speed: "slow"});
                this.time.delayedCall(1500, function (container) {
                    if (this.container.x === -1500){
                        this.container.destroy();

                    }
                }, this.container, this);
                this.time.delayedCall(800, function (swipe) {
                    this.swipeX("no");
                }, this.swipeX, this);
            }
            if (swipeNormal.y > 0.8) {
                // down
                $(this.container).animate({y: this.canvasGame.height});
            }
            if (swipeNormal.y < -0.8) {
                // up
                $(this.container).animate({y: this.canvasGame.height / 2});
            }
        }


    }

    swipeX(direction) {
        this.endGame = this.moveStar();
        if (!this.endGame) {
            this.createCard();
            this.flip = this.flipCard();
            applyConsequence(this.currentEvent[direction]);
        }

    }


    setupIcons() {
        // Under icons
        this.add.image(game.config.width / 2 - 340, 175, 'env').setScale(0.5);
        this.add.image(game.config.width / 2 - 140, 175, 'soc').setScale(0.5);
        this.add.image(game.config.width / 2 + 60, 175, 'eco').setScale(0.5);
        this.add.image(game.config.width / 2 + 260, 175, 'res').setScale(0.5);

        // Over icons
        this.envMask = this.add.image(game.config.width / 2 - 340, 175, 'env').setScale(0.5);
        this.envMask.tint = 0x808080;
        this.socMask = this.add.image(game.config.width / 2 - 140, 175, 'soc').setScale(0.5);
        this.socMask.tint = 0x808080;
        this.ecoMask = this.add.image(game.config.width / 2 + 60, 175, 'eco').setScale(0.5);
        this.ecoMask.tint = 0x808080;
        this.resMask = this.add.image(game.config.width / 2 + 260, 175, 'res').setScale(0.5);
        this.resMask.tint = 0x808080;

        this.updateIcons();
    }


    updateIcons() {
        this.cropIcon(this.envMask, getEnvironment());
        this.cropIcon(this.socMask, getSociety());
        this.cropIcon(this.ecoMask, getEconomy());
        this.cropIcon(this.resMask, getResources());
    }


    cropIcon(icon, percent) {
        icon.setCrop(0, icon.height - icon.height * (percent / 100), 1000, 1000);
    }
}

class BootScene extends Phaser.Scene {
    preload() {
        this.load.image("logo", "./assets/images/logo.png");
        this.load.image("bg", "./assets/images/background.png");
    }

    create() {
        initializeEvents(); // Read and initialize events.json

        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasgame = document.getElementById("canvasGame");

        this.bg = this.add.image(0, 0, "bg").setOrigin(0,0);
        this.logo = this.add.image(this.canvasgame.width / 2, this.canvasgame.height / 2, "logo");
        this.logo.displayWidth = this.canvasgame.width * 0.8;
        this.logo.displayHeight = this.logo.displayWidth;

        this.countSpin = 0;
        this.canSpin = true;
        this.logo.setInteractive();
        this.logo.on("pointerdown", this.spinEarth, this);

        this.button = this.add.text(this.canvasgame.width / 2, this.canvasgame.height / 1.35,
            "Play", { fill: "#FFFFFF", fontSize: "3em" });
        this.button.setInteractive().setOrigin(0.5, 0);
        this.button.on("pointerdown", function() {
            this.scene.add("PlayGame", playGame, true);
            this.scene.setVisible(false);
        }, this);

        this.tutorial = this.add.text(this.canvasgame.width / 2, this.canvasgame.height / 1.25,
            "Tutorial", { fill: "#FFFFFF", fontSize: "3em" });
        this.tutorial.setInteractive().setOrigin(0.5, 0);

        this.options = this.add.text(this.canvasgame.width / 2, this.canvasgame.height / 1.15,
            "Options", { fill: "#FFFFFF", fontSize: "3em" });
        this.options.setInteractive().setOrigin(0.5, 0);
    }

    spinEarth() {
        if (this.canSpin) {
            this.canSpin = false;
            this.tweens.add({
                targets: [this.logo],
                angle: 360,
                duration: 1000,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function() {
                    this.canSpin = true;
                }
            });
        }
        this.countSpin += 1;
        if (this.countSpin == 3) {
            console.log("Send Nyan Cat!")
        }

    }
}