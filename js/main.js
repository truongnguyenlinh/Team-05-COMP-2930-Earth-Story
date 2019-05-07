
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
        this.load.spritesheet('card', './assets/images/cards.png', { frameWidth: 243, frameHeight: 167 });
        this.load.image("star", "./assets/images/star.png");
        this.load.image("eco", "./assets/images/icons/eco.png");
        this.load.image("env", "./assets/images/icons/env.png");
        this.load.image("res", "./assets/images/icons/res.png");
        this.load.image("soc", "./assets/images/icons/soc.png");
    }

    flipCard(){
      this.card.on('pointerdown', function(pointer, localX, localY, event){
            var tween = this.tweens.add({
                targets: [this.card, this.question],
                scaleY: 2.2,
                scaleX: 0,
                flipX: true,
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
                    scaleY: 2,
                    scaleX: 2,
                    flipX: true,
                    yoyo: false,
                    duration: 200,
                });
                var tween = this.tweens.add({
                    targets: this.question,
                    scaleY: 1,
                    scaleX: 1,
                    flipX: true,
                    yoyo: false,
                    duration: 200,
                });
            }, this.card, this);
        }, this);       


    }


    create() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasgame = document.getElementById("canvasGame");

        this.background = this.add.image(0, 0, "background").setOrigin(0,0);
        this.earth = this.add.image(game.config.width / 2 , this.canvasgame.height / 2, "earth");
        this.earth.displayWidth = this.canvasgame.width * 0.8;
        this.earth.displayHeight = this.earth.displayWidth;
        this.timeline = this.add.image(game.config.width / 2, this.canvasgame.height - 150, "timeline");

        this.star = this.add.image(150, this.canvasgame.height - 170, "star").setScale(.25);
        this.input.on("pointerup", this.endSwipe, this);
      
        this.setupIcons();
      
        this.cards = this.createCard();
        
    }

    create() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
        this.earth = this.add.image(game.config.width / 2, this.canvasGame.height / 2, "earth");
        this.earth.displayWidth = this.canvasGame.width * 0.8;
        this.earth.displayHeight = this.earth.displayWidth;
        this.timeline = this.add.image(0, 0, "timeline");
        // this.timeline = this.add.image(game.config.width / 2, this.canvasGame.height - 150, "timeline");

        // this.star = this.add.image(150, this.canvasGame.height - 170, "star").setScale(.25);
        this.star = this.add.image(-this.timeline.width / 2, 0, "star").setScale(.25);

        this.input.on("pointerup", this.endSwipe, this);
        this.cards = this.createCard();
        this.flip = this.flipCard();
        this.containerTimeline = this.add.container(game.config.width / 2, this.canvasGame.height * 0.8).setSize(this.timeline.width, this.timeline.height);
        this.containerTimeline.add([this.star, this.timeline]);

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
        //container for the card
        this.container = this.add.container(game.config.width / 2, this.canvasGame.height / 2).setSize(this.canvasGame.width * 0.5, this.canvasGame.width * 0.5).setInteractive();
        this.container.add([this.card, this.question, this.info]);
    }


    moveStar() {


        console.log(this.star.width);
        console.log(this.containerTimeline.first.x, this.timeline.width);
        if (this.containerTimeline.first.x  > this.containerTimeline.width / 2) {
            this.containerTimeline.first.x = this.containerTimeline.width / 2;
            // this.game = false;
        } else {
            this.containerTimeline.first.x  += this.containerTimeline.width/30;
        }
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
                    this.moveStar();
                    console.log("yes");
                    this.createCard();

                    this.flip = this.flipCard()
                }
                if (swipeNormal.x < -0.8) {
                    // left

                    $(this.container).animate({x: -1500, speed: "slow"});
                    this.moveStar();
                    console.log("no");
                    this.createCard();
                    this.flip = this.flipCard()

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

            if (this.star.x === this.timeline.width) {
                this.card.visible = false;
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

        this.button = this.add.text(this.canvasgame.width / 2, this.canvasgame.height / 1.35,
            "Click here to start game", { fill: "#FFFFFF" });
        this.button.setInteractive().setOrigin(0.5, 0);
        this.button.on("pointerdown", function() {
            this.scene.add("PlayGame", playGame, true);
            this.scene.setVisible(false);
        }, this);

        this.tutorial = this.add.text(this.canvasgame.width / 2, this.canvasgame.height / 1.25,
            "Click here to start tutorial", { fill: "#FFFFFF" });
        this.tutorial.setInteractive().setOrigin(0.5, 0);
    }
}

