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

        this.fill = this.add.image(100, 300, "fill");
        this.background = this.add.image(0, 0, "background").setOrigin(0,0);
        this.earth = this.add.image(game.config.width / 2 , this.canvasgame.height / 2, "earth");
        this.earth.displayWidth = this.canvasgame.width * 0.8;
        this.earth.displayHeight = this.earth.displayWidth;

        this.card = this.add.image(game.config.width / 2, this.canvasgame.height / 2 , "card", 0).setInteractive();
        this.card.setScale(2);
        this.timeline = this.add.image(game.config.width / 2, this.canvasgame.height - 150, "timeline");

        this.star = this.add.image(150, this.canvasgame.height - 160, "star").setScale(.25);
        this.input.on("pointerup", this.endSwipe, this);



        this.question = this.add.text(30, this.canvasgame.height / 2, 'Will you eat beef?',
            { fontSize: '50px', fill: '#000' });
        this.info = this.add.text(30, this.canvasgame.height / 2, 'Beef has highest CO2 footprint',
            { fontSize: '50px', fill: '#000' });
        this.info.visible = false;
        // this.info.scaleX = 1.2;
        // this.info.scaleY = 0;
        // this.cardText = ["question", 'data']
        // this.data = [this.question, this.info];
        // this.text = this.data[0];


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



    moveStar() {
        if (this.star.x >= this.timeline.width) {
            this.star.x = this.timeline.width;
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
                $(this.card).animate({x: this.canvasgame.width, speed: "slow"});
                $(this.question).animate({x: this.canvasgame.width, speed: "slow"});
                this.moveStar();
                this.card = this.add.image(game.config.width / 2, this.canvasgame.height / 2 , "card", 0).setInteractive();

                this.question = this.add.text(game.config.width / 2, this.canvasgame.height / 2, 'Will you eat beef?',
                    { fontSize: '50px', fill: '#000' });
                this.info = this.add.text(game.config.width / 2, this.canvasgame.height / 2, 'Beef has highest CO2 footprint',
                    { fontSize: '50px', fill: '#000' });
                this.info.visible = false;
                // this.info.scaleX = 1.2;
                // this.info.scaleY = 0;
                // this.cardText = ["question", 'data']
                // this.data = [this.question, this.info];
                // this.text = this.data[0];


                this.card.on('pointerdown', function(pointer, localX, localY, event){
                    var tween = this.tweens.add({
                        targets: [this.card, this.question],
                        scaleX: 1.2,
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
                            targets: [this.card, this.question],
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
                $(this.card).animate({x: 0});
                $(this.question).animate({x: 0});
                this.moveStar();
                this.card = this.add.image(game.config.width / 2, this.canvasgame.height / 2 , "card", 0).setInteractive();

                this.question = this.add.text(game.config.width / 2, this.canvasgame.height / 2, 'Will you eat beef?',
                    { fontSize: '50px', fill: '#000' });
                this.info = this.add.text(game.config.width / 2, this.canvasgame.height / 2, 'Beef has highest CO2 footprint',
                    { fontSize: '50px', fill: '#000' });
                this.info.visible = false;
                // this.info.scaleX = 1.2;
                // this.info.scaleY = 0;
                // this.cardText = ["question", 'data']
                // this.data = [this.question, this.info];
                // this.text = this.data[0];


                this.card.on('pointerdown', function(pointer, localX, localY, event){
                    var tween = this.tweens.add({
                        targets: [this.card, this.question],
                        scaleX: 1.2,
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
                            targets: [this.card, this.question],
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
                $(this.card).animate({y: this.canvasgame.height});
            }
            if(swipeNormal.y < -0.8) {
                // up
                $(this.card).animate({y: this.canvasgame.height / 2});
            }
        }

        if (this.star.x === this.timeline.width){
            this.card.visible = false;
        }

    }

}