let gameInstance = null;

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
        gameInstance = this;
    }


    preload() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.add.image(0, 0, "bg").setOrigin(0);
        let loader = this.add.image(this.canvasGame.width / 2, this.canvasGame.height / 2, "earth");
        loader.displayWidth = this.canvasGame.width * 0.8;
        loader.displayHeight = loader.displayWidth;

        let loadingText = this.make.text({
            x: this.canvasGame.width / 2,
            y: this.canvasGame.height - 200,
            text: 'Loading...',
            style: {
                fill: '#ffffff',
                fontSize: "3em"
            }
        });
        loadingText.setOrigin(0.5);

        this.load.on("progress", function() {
            loader.rotation += 0.01;
        });

        this.load.on("complete", function(value) {
            console.log(value);
            loader.destroy();
            loadingText.destroy();
        });

        this.load.image("earth_water", "./assets/images/layers/earth_water.png");
        this.load.image("earth_land", "./assets/images/layers/earth_land.png");
        this.load.image("earth_dirty_water_1", "./assets/images/layers/earth_dirty_water_1.png");
        this.load.image("earth_dirty_water_2", "./assets/images/layers/earth_dirty_water_2.png");
        this.load.image("earth_dirty_water_3", "./assets/images/layers/earth_dirty_water_3.png");
        this.load.image("earth_dirty_land_1", "./assets/images/layers/earth_dirty_land_1.png");
        this.load.image("earth_dirty_land_2", "./assets/images/layers/earth_dirty_land_2.png");
        this.load.image("earth_dirty_land_3", "./assets/images/layers/earth_dirty_land_3.png");

        this.load.image("clean_mt", "./assets/images/layers/clean_mt.png");
        this.load.image("default_mt", "./assets/images/layers/default_mt.png");
        this.load.image("dirty_mt", "./assets/images/layers/dirty_mt.png");
        this.load.image("clean_clouds", "./assets/images/layers/clean_clouds.png");
        this.load.image("dirty_clouds", "./assets/images/layers/dirty_clouds.png");
        this.load.image("bush_1", "./assets/images/layers/bush_1.png");
        this.load.image("bush_2", "./assets/images/layers/bush_2.png");
        this.load.image("tree_1", "./assets/images/layers/tree_1.png");
        this.load.image("tree_2", "./assets/images/layers/tree_2.png");
        this.load.image("tree_3", "./assets/images/layers/tree_3.png");
        this.load.image("tree_4", "./assets/images/layers/tree_4.png");

        this.load.image("cow_1", "./assets/images/layers/cow_1.png");
        this.load.image("cow_2", "./assets/images/layers/cow_2.png");
        this.load.image("pig_1", "./assets/images/layers/pig_1.png");
        this.load.image("pig_2", "./assets/images/layers/pig_2.png");
        this.load.image("fish_1", "./assets/images/layers/fish_1.png");
        this.load.image("fish_2", "./assets/images/layers/fish_2.png");
        this.load.image("salmon_1", "./assets/images/layers/salmon_1.png");
        this.load.image("salmon_2", "./assets/images/layers/salmon_2.png");
        this.load.image("shrimp_1", "./assets/images/layers/shrimp_1.png");
        this.load.image("shrimp_2", "./assets/images/layers/shrimp_2.png");
        this.load.image("tuna_1", "./assets/images/layers/tuna_1.png");
        this.load.image("tuna_2", "./assets/images/layers/tuna_2.png");
        this.load.image("whale_1", "./assets/images/layers/whale_1.png");
        this.load.image("whale_2", "./assets/images/layers/whale_2.png");

        this.load.image("factory_1", "./assets/images/layers/factory_1.png");
        this.load.image("factory_2", "./assets/images/layers/factory_2.png");
        this.load.image("house_1", "./assets/images/layers/house_1.png");
        this.load.image("house_2", "./assets/images/layers/house_2.png");

        this.load.image("solar_panel_1", "./assets/images/layers/solar_panel_1.png");
        this.load.image("solar_panel_2", "./assets/images/layers/solar_panel_2.png");
        this.load.image("wind_turbines_1", "./assets/images/layers/wind_turbines_1.png");
        this.load.image("wind_turbines_2", "./assets/images/layers/wind_turbines_2.png");
        this.load.image("wind_turbines_3", "./assets/images/layers/wind_turbines_3.png");


        this.load.image("timeline", "./assets/images/timeline.png");
        this.load.image("card", "./assets/images/card.png");
        this.load.image("star", "./assets/images/star.png");
        this.load.image("eco", "./assets/images/icons/eco.png");
        this.load.image("env", "./assets/images/icons/env.png");
        this.load.image("res", "./assets/images/icons/res.png");
        this.load.image("soc", "./assets/images/icons/soc.png");
    }


    create() {
        this.timeline = this.add.image(0, 0, "timeline");

        this.star = this.add.image(-this.timeline.width / 2, 0, "star").setScale(.25);

        this.progressBar = this.add.container(this.canvasGame.width / 2, this.canvasGame.height * 0.9).setSize(this.timeline.width, this.timeline.height);
        this.progressBar.add([this.timeline, this.star]);


        this.setupIcons();
        this.createEarth();


        this.hasSwiped = false;
        this.endGame = false;


        this.createCard(getRandomEvent()["question"], getRandomEvent()["info"]);
        this.flipCard();
        this.input.on("pointerup", this.endSwipe, this);



    }


    update() {
        console.log(this.endGame);
        if (this.endGame) {
            this.scene.start("EndGame");
        }
    }

    gameOver(){
            if (getAverage() > 300){
                this.createCard(getGoodEnding(), getEndingBack());
            }
            else {
                this.createCard(getBadEnding(), getEndingBack());
            }
            this.flipCard()
    }


    createEarth() {
        this.earthContainer = this.add.container(game.config.width / 2, this.canvasGame.height / 2);
        this.earth_water = this.add.image(0, 0, "earth_water");
        this.earth_dirty_water_1 = this.add.image(0, 0, "earth_dirty_water_1");
        this.earth_dirty_water_2 = this.add.image(0, 0, "earth_dirty_water_2");
        this.earth_dirty_water_3 = this.add.image(0, 0, "earth_dirty_water_3");

        this.earth_dirty_water_1.alpha = 0;
        this.earth_dirty_water_2.alpha = 0;
        this.earth_dirty_water_3.alpha = 0;

        this.earth_land = this.add.image(0, 0, "earth_land");
        this.earth_dirty_land_1 = this.add.image(0,0, "earth_dirty_land_1");
        this.earth_dirty_land_2 = this.add.image(0, 0, "earth_dirty_land_2");
        this.earth_dirty_land_3 = this.add.image(0, 0, "earth_dirty_land_3");

        this.earth_dirty_land_1.alpha = 0;
        this.earth_dirty_land_2.alpha = 0;
        this.earth_dirty_land_3.alpha = 0;

        this.clean_mt = this.add.image(0,0, "clean_mt");
        this.default_mt = this.add.image(0,0, "default_mt");
        this.dirty_mt = this.add.image(0,0, "dirty_mt");
        this.clean_clouds = this.add.image(0,0, "clean_clouds");
        this.dirty_clouds = this.add.image(0,0, "dirty_clouds");

        this.clean_mt.alpha = 0;
        this.dirty_mt.alpha = 0;
        this.dirty_clouds.alpha = 0;

        this.bush_1 = this.add.image(0, 0, "bush_1");
        this.bush_2 = this.add.image(0, 0, "bush_2");

        this.tree_1 = this.add.image(0, 0, "tree_1");
        this.tree_2 = this.add.image(0, 0, "tree_2");
        this.tree_3 = this.add.image(0, 0, "tree_3");
        this.tree_4 = this.add.image(0, 0, "tree_4");

        this.tree_3.alpha = 0;
        this.tree_4.alpha = 0;

        this.fish_1 = this.add.image(0, 0, "fish_1");
        this.fish_2 = this.add.image(0, 0, "fish_2");

        this.fish_2.alpha = 0;

        this.whale_1 = this.add.image(0, 0, "whale_1");
        this.whale_2 = this.add.image(0, 0, "whale_2");

        this.whale_2.alpha = 0;

        this.salmon_1 = this.add.image(0, 0, "salmon_1");
        this.salmon_2 = this.add.image(0, 0, "salmon_2");

        this.salmon_2.alpha = 0;

        this.tuna_1 = this.add.image(0, 0, "tuna_1");
        this.tuna_2 = this.add.image(0, 0, "tuna_2");

        this.tuna_2.alpha = 0;

        this.cow_1 = this.add.image(0, 0, "cow_1");
        this.cow_2 = this.add.image(0, 0, "cow_2");

        this.cow_2.alpha = 0;

        this.pig_1 = this.add.image(0, 0, "pig_1");
        this.pig_2 = this.add.image(0, 0, "pig_2");

        this.pig_2.alpha = 0;

        this.shrimp_1 = this.add.image(0, 0, "shrimp_1");
        this.shrimp_2 = this.add.image(0, 0, "shrimp_2");

        this.shrimp_2.alpha = 0;

        this.factory_1= this.add.image(0, 0, "factory_1");
        this.factory_2 = this.add.image(0, 0, "factory_2");
        this.factory_2.alpha = 0;

        this.house_1 = this.add.image(0, 0, "house_1");
        this.house_2 = this.add.image(0, 0, "house_2");
        this.house_2.alpha = 0;

        this.earthContainer.add([this.earth_water, this.earth_dirty_water_1, this.earth_dirty_water_2, this.earth_dirty_water_3,
            this.earth_land, this.earth_dirty_land_1, this.earth_dirty_land_2, this.earth_dirty_land_3,
            this.bush_1, this.bush_2, this.tree_1, this.tree_2, this.tree_3, this.tree_4,
            this.default_mt, this.clean_mt, this.dirty_mt,
            this.clean_clouds, this.dirty_clouds,
            this.fish_1, this.fish_2,
            this.whale_1, this.whale_2,
            this.salmon_1, this.salmon_2, this.tuna_1, this.tuna_2,
            this.cow_1, this.cow_2, this.pig_1, this.pig_2, this.shrimp_1, this.shrimp_2,
            this.factory_1, this.factory_2, this.house_1, this.house_2]);
    }


    updateEarth() {
        if (getEnvironment() < 50) {
            this.tweenLayer(this.earth_dirty_water_3, 1);
            this.tweenLayer(this.earth_dirty_land_3, 1);

            console.log("environment < 50 = bad earth");
        }

        if (getEnvironment() > 50) {
            this.tweenLayer(this.earth_dirty_water_3, 0);
            this.tweenLayer(this.earth_dirty_land_3, 0);

            console.log("environment > 50 = good earth");
        }
        if (getResources() > 50) {
            this.tweenLayer(this.tree_3, 1);
            this.tweenLayer(this.tree_4, 1);

            console.log("resource > 50 = add trees");
        }
        if (getResources() < 50) {
            this.tweenLayer(this.tree_3, 0);
            this.tweenLayer(this.tree_4, 0);

            console.log("resource < 50 = remove trees");
        }

        if (getEconomy() > 50) {
            this.tweenLayer(this.factory_2, 1);

            console.log("economy > 50 = add factories");
        }
        if (getEconomy() < 50) {
            this.tweenLayer(this.factory_2, 0);


            console.log("economy < 50 = remove factories");
        }
        if (getSociety() > 50) {
            // this.house_2.visible = true;
            this.tweenLayer(this.house_2, 1);

            console.log("society > 50 = add houses");
        }
        if (getSociety() < 50) {
            this.tweenLayer(this.house_2, 0);

            console.log("society < 50 = remove houses");
        }
    }


    tweenLayer(layer, alphaValue) {
         this.tweens.add({
                targets: layer,
                alpha: alphaValue,
                ease: 'Linear',
                duration: 600,})
    }

    createCard(textFront, textBack) {
        this.card = this.add.image(0, 0, "card").setInteractive();
        this.card.setScale(2.75);
        this.card.alpha = 0.7;
        // this.currentEvent = getRandomEvent();

        let textStyle = {
            color:'#FF0000',
            align:"center",
            boundsAlignH: "center",
            fontSize: '50px',
            wordWrap: {
                width: this.card.width * 2.75,
                useAdvancedWrap: false }
        };

        this.question = this.add.text(0, 0, textFront, textStyle).setOrigin(0.5);
        this.info = this.add.text(0, 0, textBack, textStyle).setOrigin(0.5);
        this.info.visible = false;
        //container for the card
        this.container = this.add.container(this.canvasGame.width / 2, this.canvasGame.height / 2)
            .setSize(this.canvasGame.width * 0.5, this.canvasGame.width * 0.5)
            .setInteractive();
        this.container.add([this.card, this.question, this.info]);
    }


    moveStar() {
        this.star.x  += this.progressBar.width / 30;
        if (Math.ceil(this.star.x) > this.progressBar.width / 2) {
            this.endGame = true;
        }
    }


    flipCard(){
        this.card.on('pointerup', function(pointer, localX, localY, event){
            this.tweens.add({
                targets: this.card,
                scaleY: 2.9,
                scaleX: 0,
                flipX: true,
                yoyo: false,
                duration: 200,
            });

            this.tweens.add({
                targets: [this.question, this.info],
                scaleY: 1.2,
                scaleX: 0,
                flipX: true,
                yoyo: false,
                duration: 200,
            });


            this.time.delayedCall(200, function(card){
                if (this.question.visible){
                    this.info.visible = true;
                    this.question.visible = false;
                } else {
                    this.info.visible = false;
                    this.question.visible = true;
                }
                this.tweens.add({
                    targets: this.card,
                    scaleY: 2.75,
                    scaleX: 2.75,
                    flipX: true,
                    yoyo: false,
                    duration: 200,
                });
                this.tweens.add({
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

            if (swipeNormal.x > 0.8 && this.hasSwiped === false) {
                // right
                this.hasSwiped = true;

                $(this.container).animate({x: this.canvasGame.width + 1500, speed: 500});
                this.time.delayedCall(500, function (container) {
                    if (this.container.x === this.canvasGame.width + 1500){
                        this.container.destroy();
                        this.updateEarth();

                    }
                }, this.container, this);

                this.time.delayedCall(1200, function (swipe) {
                    this.hasSwiped = false;

                    this.swipeX("yes");
                }, this.swipeX, this);
            }
            if (swipeNormal.x < -0.8 && this.hasSwiped === false) {
                // left
                this.hasSwiped = true;
                $(this.container).animate({x: -1500, speed: 500});
                this.time.delayedCall(500, function (container) {
                    if (this.container.x === -1500){
                        this.container.destroy();
                        this.updateEarth();


                    }
                }, this.container, this);
                this.time.delayedCall(1200, function (swipe) {
                    this.hasSwiped = false;
                    this.swipeX("no");
                }, this.swipeX, this);
            }
            if (swipeNormal.y > 0.8) {
                // down
                $(this.container).animate({y: this.canvasGame.height * 1.15});
                this.hasSwiped = true;
            }
            if (swipeNormal.y < -0.8) {
                // up
                $(this.container).animate({y: this.canvasGame.height / 2});
                this.hasSwiped = false;

            }
        }
    }

    swipeX(direction) {
        if (!this.endGame) {
            getAverage();
            this.moveStar()
            // this.updateEarth();
            this.createCard(getRandomEvent()["question"], getRandomEvent()["info"]);
            this.flipCard();
            applyConsequence(getRandomEvent()[direction]);
        } else {
            this.gameOver();
        }


    }


    setupIcons() {
        // Under icons
        this.add.image(this.canvasGame.width / 2 - 330, 150, 'env').setScale(0.4);
        this.add.image(this.canvasGame.width / 2 - 110, 150, 'soc').setScale(0.4);
        this.add.image(this.canvasGame.width / 2 + 110, 150, 'eco').setScale(0.4);
        this.add.image(this.canvasGame.width / 2 + 330, 150, 'res').setScale(0.4);

        // Over icons
        this.envMask = this.add.image(this.canvasGame.width / 2 - 330, 150, 'env').setScale(0.4);
        this.envMask.tint = 0x808080;
        this.socMask = this.add.image(this.canvasGame.width / 2 - 110, 150, 'soc').setScale(0.4);
        this.socMask.tint = 0x808080;
        this.ecoMask = this.add.image(this.canvasGame.width / 2 + 110, 150, 'eco').setScale(0.4);
        this.ecoMask.tint = 0x808080;
        this.resMask = this.add.image(this.canvasGame.width / 2 + 330, 150, 'res').setScale(0.4);
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
        this.load.image("earth", "./assets/images/earth.png");
        this.load.image("logo", "./assets/images/logo.png");
        this.load.image("bg", "./assets/images/background.png");
        this.load.spritesheet('cat', './assets/images/nyan_cat_sprite.png', { frameWidth: 52.7, frameHeight: 22});

    }

    create() {
        initializeEvents(); // Read and initialize events.json
        initializeEndings(); // Read and initialize endings.json

        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.bg = this.add.image(0, 0, "bg").setOrigin(0,0);
        this.logo = this.add.image(this.canvasGame.width / 2, this.canvasGame.height / 2, "logo");
        this.logo.displayWidth = this.canvasGame.width * 0.8;
        this.logo.displayHeight = this.logo.displayWidth;

        this.countSpin = 0;
        this.canSpin = true;
        this.logo.setInteractive();
        this.logo.on("pointerdown", this.spinEarth, this);

        this.button = this.add.text(this.canvasGame.width / 2, this.canvasGame.height / 1.35,
            "Play", { fill: "#FFFFFF", fontSize: "3em" });
        this.button.setInteractive().setOrigin(0.5, 0);
        this.button.on("pointerdown", function(){
            this.scene.start("PlayGame");
        }, this);

        this.tutorial = this.add.text(this.canvasGame.width / 2, this.canvasGame.height / 1.25,
            "Tutorial", { fill: "#FFFFFF", fontSize: "3em" });
        this.tutorial.setInteractive().setOrigin(0.5, 0);

        this.options = this.add.text(this.canvasGame.width / 2, this.canvasGame.height / 1.15,
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
            console.log("Send Nyan Cat!");
            this.nyanCat();
            this.countSpin = 0;
        }
    }
  
  nyanCat(){
        this.cat = this.physics.add.sprite(-10, Math.random() * this.canvasGame.height, "cat", 0).setScale(3);
        this.cat_2 = this.physics.add.sprite(-50, Math.random() * this.canvasGame.height, "cat", 0).setScale(3);
        this.cat_3 = this.physics.add.sprite(-20, Math.random() * this.canvasGame.height, "cat", 0).setScale(3);

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 9 }),
            frameRate: 9,
            repeat: -1
        });

        this.cat.setVelocityX(300);
        this.cat.anims.play('right', true);
        this.cat_2.setVelocityX(200);
        this.cat_2.anims.play('right', true);
        this.cat_3.setVelocityX(400);
        this.cat_3.anims.play('right', true);
    }

}

class EndScene extends Phaser.Scene {
    constructor() {
        super("EndGame");
    }


    preload() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.add.image(0, 0, "bg").setOrigin(0);


        this.load.image("earth_water", "./assets/images/layers/earth_water.png");
        this.load.image("earth_land", "./assets/images/layers/earth_land.png");
        this.load.image("earth_dirty_water_1", "./assets/images/layers/earth_dirty_water_1.png");
        this.load.image("earth_dirty_water_2", "./assets/images/layers/earth_dirty_water_2.png");
        this.load.image("earth_dirty_water_3", "./assets/images/layers/earth_dirty_water_3.png");
        this.load.image("earth_dirty_land_1", "./assets/images/layers/earth_dirty_land_1.png");
        this.load.image("earth_dirty_land_2", "./assets/images/layers/earth_dirty_land_2.png");
        this.load.image("earth_dirty_land_3", "./assets/images/layers/earth_dirty_land_3.png");

        this.load.image("clean_mt", "./assets/images/layers/clean_mt.png");
        this.load.image("default_mt", "./assets/images/layers/default_mt.png");
        this.load.image("dirty_mt", "./assets/images/layers/dirty_mt.png");
        this.load.image("clean_clouds", "./assets/images/layers/clean_clouds.png");
        this.load.image("dirty_clouds", "./assets/images/layers/dirty_clouds.png");
        this.load.image("bush_1", "./assets/images/layers/bush_1.png");
        this.load.image("bush_2", "./assets/images/layers/bush_2.png");
        this.load.image("tree_1", "./assets/images/layers/tree_1.png");
        this.load.image("tree_2", "./assets/images/layers/tree_2.png");
        this.load.image("tree_3", "./assets/images/layers/tree_3.png");
        this.load.image("tree_4", "./assets/images/layers/tree_4.png");

        this.load.image("cow_1", "./assets/images/layers/cow_1.png");
        this.load.image("cow_2", "./assets/images/layers/cow_2.png");
        this.load.image("pig_1", "./assets/images/layers/pig_1.png");
        this.load.image("pig_2", "./assets/images/layers/pig_2.png");
        this.load.image("fish_1", "./assets/images/layers/fish_1.png");
        this.load.image("fish_2", "./assets/images/layers/fish_2.png");
        this.load.image("salmon_1", "./assets/images/layers/salmon_1.png");
        this.load.image("salmon_2", "./assets/images/layers/salmon_2.png");
        this.load.image("shrimp_1", "./assets/images/layers/shrimp_1.png");
        this.load.image("shrimp_2", "./assets/images/layers/shrimp_2.png");
        this.load.image("tuna_1", "./assets/images/layers/tuna_1.png");
        this.load.image("tuna_2", "./assets/images/layers/tuna_2.png");
        this.load.image("whale_1", "./assets/images/layers/whale_1.png");
        this.load.image("whale_2", "./assets/images/layers/whale_2.png");

        this.load.image("factory_1", "./assets/images/layers/factory_1.png");
        this.load.image("factory_2", "./assets/images/layers/factory_2.png");
        this.load.image("house_1", "./assets/images/layers/house_1.png");
        this.load.image("house_2", "./assets/images/layers/house_2.png");

        this.load.image("solar_panel_1", "./assets/images/layers/solar_panel_1.png");
        this.load.image("solar_panel_2", "./assets/images/layers/solar_panel_2.png");
        this.load.image("wind_turbines_1", "./assets/images/layers/wind_turbines_1.png");
        this.load.image("wind_turbines_2", "./assets/images/layers/wind_turbines_2.png");
        this.load.image("wind_turbines_3", "./assets/images/layers/wind_turbines_3.png");


        this.load.image("timeline", "./assets/images/timeline.png");
        this.load.image("card", "./assets/images/card.png");
        this.load.image("star", "./assets/images/star.png");
        this.load.image("eco", "./assets/images/icons/eco.png");
        this.load.image("env", "./assets/images/icons/env.png");
        this.load.image("res", "./assets/images/icons/res.png");
        this.load.image("soc", "./assets/images/icons/soc.png");
    }


    create() {
        console.log("scene change")
        this.timeline = this.add.image(0, 0, "timeline");

        this.star = this.add.image( this.timeline.width / 2, 0, "star").setScale(.25)

        this.progressBar = this.add.container(this.canvasGame.width / 2, this.canvasGame.height * 0.9).setSize(this.timeline.width, this.timeline.height);
        this.progressBar.add([this.timeline, this.star]);

        this.setupIcons();
        this.createEarth();
        this.updateEarth();
        this.gameOver();

    }



    gameOver(){
        if (getAverage() > 300){
            this.createCard(getGoodEnding(), getEndingBack());
        }
        else {
            this.createCard(getBadEnding(), getEndingBack());
        }
        this.flipCard()



    }

    createEarth() {
        this.earthContainer = this.add.container(this.canvasGame.width / 2, this.canvasGame.height / 2);
        this.earth_water = this.add.image(0, 0, "earth_water");
        this.earth_dirty_water_1 = this.add.image(0, 0, "earth_dirty_water_1");
        this.earth_dirty_water_2 = this.add.image(0, 0, "earth_dirty_water_2");
        this.earth_dirty_water_3 = this.add.image(0, 0, "earth_dirty_water_3");

        this.earth_dirty_water_1.visible = false;
        this.earth_dirty_water_2.visible = false;
        this.earth_dirty_water_3.visible = false;

        this.earth_land = this.add.image(0, 0, "earth_land");
        this.earth_dirty_land_1 = this.add.image(0,0, "earth_dirty_land_1");
        this.earth_dirty_land_2 = this.add.image(0, 0, "earth_dirty_land_2");
        this.earth_dirty_land_3 = this.add.image(0, 0, "earth_dirty_land_3");

        this.earth_dirty_land_1.visible = false;
        this.earth_dirty_land_2.visible = false;
        this.earth_dirty_land_3.visible = false;

        this.clean_mt = this.add.image(0,0, "clean_mt");
        this.default_mt = this.add.image(0,0, "default_mt");
        this.dirty_mt = this.add.image(0,0, "dirty_mt");
        this.clean_clouds = this.add.image(0,0, "clean_clouds");
        this.dirty_clouds = this.add.image(0,0, "dirty_clouds");

        this.clean_mt.visible = false;
        this.dirty_mt.visible = false;
        this.dirty_clouds.visible = false;

        this.bush_1 = this.add.image(0, 0, "bush_1");
        this.bush_2 = this.add.image(0, 0, "bush_2");

        this.tree_1 = this.add.image(0, 0, "tree_1");
        this.tree_2 = this.add.image(0, 0, "tree_2");
        this.tree_3 = this.add.image(0, 0, "tree_3");
        this.tree_4 = this.add.image(0, 0, "tree_4");

        this.tree_3.visible = false;
        this.tree_4.visible = false;

        this.fish_1 = this.add.image(0, 0, "fish_1");
        this.fish_2 = this.add.image(0, 0, "fish_2");

        this.fish_2.visible = false;

        this.whale_1 = this.add.image(0, 0, "whale_1");
        this.whale_2 = this.add.image(0, 0, "whale_2");

        this.whale_2.visible = false;

        this.salmon_1 = this.add.image(0, 0, "salmon_1");
        this.salmon_2 = this.add.image(0, 0, "salmon_2");

        this.salmon_2.visible = false;

        this.tuna_1 = this.add.image(0, 0, "tuna_1");
        this.tuna_2 = this.add.image(0, 0, "tuna_2");

        this.tuna_2.visible = false;

        this.cow_1 = this.add.image(0, 0, "cow_1");
        this.cow_2 = this.add.image(0, 0, "cow_2");

        this.cow_2.visible = false;

        this.pig_1 = this.add.image(0, 0, "pig_1");
        this.pig_2 = this.add.image(0, 0, "pig_2");

        this.pig_2.visible = false;

        this.shrimp_1 = this.add.image(0, 0, "shrimp_1");
        this.shrimp_2 = this.add.image(0, 0, "shrimp_2");

        this.shrimp_2.visible = false;

        this.factory_1= this.add.image(0, 0, "factory_1");
        this.factory_2 = this.add.image(0, 0, "factory_2");
        this.factory_2.visible = false;

        this.house_1 = this.add.image(0, 0, "house_1");
        this.house_2 = this.add.image(0, 0, "house_2");
        this.house_2.visible = false;

        this.earthContainer.add([this.earth_water, this.earth_dirty_water_1, this.earth_dirty_water_2, this.earth_dirty_water_3,
            this.earth_land, this.earth_dirty_land_1, this.earth_dirty_land_2, this.earth_dirty_land_3,
            this.bush_1, this.bush_2, this.tree_1, this.tree_2, this.tree_3, this.tree_4,
            this.default_mt, this.clean_mt, this.dirty_mt,
            this.clean_clouds, this.dirty_clouds,
            this.fish_1, this.fish_2,
            this.whale_1, this.whale_2,
            this.salmon_1, this.salmon_2, this.tuna_1, this.tuna_2,
            this.cow_1, this.cow_2, this.pig_1, this.pig_2, this.shrimp_1, this.shrimp_2,
            this.factory_1, this.factory_2, this.house_1, this.house_2]);
    }

    updateEarth() {
        if (getEnvironment() < 50) {
            this.earth_dirty_water_3.visible = true;
            this.earth_dirty_land_3.visible = true;

            console.log("environment < 50 = bad earth");
        }

        if (getEnvironment() > 50) {
            this.earth_dirty_water_3.visible = false;
            this.earth_dirty_land_3.visible = false;

            console.log("environment > 50 = good earth");
        }
        if (getResources() > 50) {
            this.tree_3.visible = true;
            this.tree_4.visible = true;

            console.log("resource > 50 = add trees");
        }
        if (getResources() < 50) {
            this.tree_3.visible = false;
            this.tree_4.visible = false;
            //console.log(getResources());
            console.log("resource < 50 = remove trees");
        }

        if (getEconomy() > 50) {
            this.factory_2.visible = true;

            console.log("economy > 50 = add factories");
        }
        if (getEconomy() < 50) {
            this.factory_2.visible = false;

            console.log("economy < 50 = remove factories");
        }
        if (getSociety() > 50) {
            this.house_2.visible = true;

            console.log("society > 50 = add houses");
        }
        if (getSociety() < 50) {
            this.house_2.visible = false;

            console.log("society < 50 = remove houses");
        }
    }

    createCard(textFront, textBack) {
        this.card = this.add.image(0, 0, "card").setInteractive();
        this.card.setScale(2.75);
        this.card.alpha = 0.7;
        // this.currentEvent = getRandomEvent();

        let textStyle = {
            color:'#FF0000',
            align:"center",
            boundsAlignH: "center",
            fontSize: '50px',
            wordWrap: {
                width: this.card.width * 2.75,
                useAdvancedWrap: false }
        };

        this.question = this.add.text(0, 0, textFront, textStyle).setOrigin(0.5);
        this.info = this.add.text(0, 0, textBack, textStyle).setOrigin(0.5);
        this.info.visible = false;
        //container for the card
        this.container = this.add.container(this.canvasGame.width / 2, this.canvasGame.height / 2)
            .setSize(this.canvasGame.width * 0.5, this.canvasGame.width * 0.5)
            .setInteractive();
        this.container.add([this.card, this.question, this.info]);
    }

    flipCard(){
        this.card.on('pointerup', function(pointer, localX, localY, event){
            this.tweens.add({
                targets: this.card,
                scaleY: 2.9,
                scaleX: 0,
                flipX: true,
                yoyo: false,
                duration: 200,
            });

            this.tweens.add({
                targets: [this.question, this.info],
                scaleY: 1.2,
                scaleX: 0,
                flipX: true,
                yoyo: false,
                duration: 200,
            });


            this.time.delayedCall(200, function(card){
                if (this.question.visible){
                    this.info.visible = true;
                    this.question.visible = false;
                } else {
                    this.info.visible = false;
                    this.question.visible = true;
                }
                this.tweens.add({
                    targets: this.card,
                    scaleY: 2.75,
                    scaleX: 2.75,
                    flipX: true,
                    yoyo: false,
                    duration: 200,
                });
                this.tweens.add({
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

    setupIcons() {
        // Under icons
        this.add.image(this.canvasGame.width / 2 - 330, 150, 'env').setScale(0.4);
        this.add.image(this.canvasGame.width / 2 - 110, 150, 'soc').setScale(0.4);
        this.add.image(this.canvasGame.width / 2 + 110, 150, 'eco').setScale(0.4);
        this.add.image(this.canvasGame.width / 2 + 330, 150, 'res').setScale(0.4);

        // Over icons
        this.envMask = this.add.image(this.canvasGame.width / 2 - 330, 150, 'env').setScale(0.4);
        this.envMask.tint = 0x808080;
        this.socMask = this.add.image(this.canvasGame.width / 2 - 110, 150, 'soc').setScale(0.4);
        this.socMask.tint = 0x808080;
        this.ecoMask = this.add.image(this.canvasGame.width / 2 + 110, 150, 'eco').setScale(0.4);
        this.ecoMask.tint = 0x808080;
        this.resMask = this.add.image(this.canvasGame.width / 2 + 330, 150, 'res').setScale(0.4);
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

