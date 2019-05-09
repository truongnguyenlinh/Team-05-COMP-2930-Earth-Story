let gameInstance = null;

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
        gameInstance = this;
    }


    preload() {
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
        this.load.image("background", "./assets/images/background.png");
        this.load.spritesheet('card', './assets/images/cards.png', { frameWidth: 243, frameHeight: 167 });
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
        // this.earth = this.add.image(game.config.width / 2, this.canvasGame.height / 2, "earth");
        // this.earth.displayWidth = this.canvasGame.width * 0.8;
        // this.earth.displayHeight = this.earth.displayWidth;
        this.timeline = this.add.image(0, 0, "timeline");
        // this.timeline = this.add.image(game.config.width / 2, this.canvasGame.height - 150, "timeline");

        // this.star = this.add.image(150, this.canvasGame.height - 170, "star").setScale(.25);
        this.star = this.add.image(-this.timeline.width / 2, 0, "star").setScale(.25);

        this.setupIcons();
        this.earth();
        this.createDefaultEarth();

        this.input.on("pointerup", this.endSwipe, this);
        this.cards = this.createCard();
        this.flip = this.flipCard();
        this.containerTimeline = this.add.container(game.config.width / 2, this.canvasGame.height * 0.8).setSize(this.timeline.width, this.timeline.height);
        this.containerTimeline.add([this.star, this.timeline]);

    }

    earth() {
        this.oneEarth = this.add.container(game.config.width / 2, this.canvasGame.height / 2);
        this.earth_water = this.add.image(0, 0, "earth_water");
        this.earth_land = this.add.image(0, 0, "earth_land");
        this.oneEarth.add([this.earth_water, this.earth_land])
    }

    createDefaultEarth() {
        this.earthContainer = this.add.container(game.config.width / 2, this.canvasGame.height / 2);
        // this.earth_water = this.add.image(0, 0, "earth_water");
        // this.earth_land = this.add.image(0, 0, "earth_land");

        this.bush_2 = this.add.image(0, 0, "bush_2");
        this.tree_3 = this.add.image(0, 0, "tree_3");
        this.tree_4 = this.add.image(0, 0, "tree_4");
        this.clean_mt = this.add.image(0, 0, "clean_mt");
        this.clean_clouds = this.add.image(0, 0, "clean_clouds");
        this.fish_2 = this.add.image(0, 0, "fish_2");
        this.whale_2 = this.add.image(0, 0, "whale_2");
        this.salmon_2 = this.add.image(0, 0, "salmon_2");
        this.tuna_2 = this.add.image(0, 0, "tuna_2");
        this.cow_2 = this.add.image(0, 0, "cow_2");
        this.pig_2 = this.add.image(0, 0, "pig_2");
        this.shrimp_2 = this.add.image(0, 0, "shrimp_2");
        this.earthContainer.add([this.bush_2, this.tree_4, this.tree_3, this.clean_mt,
            this.clean_clouds, this.fish_2, this.whale_2, this.salmon_2, this.tuna_2, this.cow_2, this.pig_2, this.shrimp_2]);
    }

    updateEarth() {

        if (getEnvironment() < 50) {
            // this.earthContainer.removeAll();
            // this.earthContainer = this.add.container(game.config.width / 2, this.canvasGame.height / 2);
            this.earth_dirty_water_3 = this.add.image(0, 0, "earth_dirty_water_3");
            this.earth_dirty_land_3 = this.add.image(0, 0, "earth_dirty_land_3");
            //this.earthContainer.add([this.earth_dirty_water_3, this.earth_dirty_land_3]);
            this.oneEarth.replace(this.earth_water, this.earth_dirty_water_3);
            this.oneEarth.replace(this.earth_land, this.earth_dirty_land_3);
            this.createDefaultEarth();
            //console.log(getEnvironment());
            console.log("environment < 50 = bad earth");
            }

        if (getEnvironment() > 50) {
            this.oneEarth.add([this.earth_water, this.earth_land]);
            this.createDefaultEarth();
            //console.log(getEnvironment());
            console.log("environment > 50 = good earth");
        }
        if (getResources() > 50) {
            this.tree_2 = this.add.image(0, 0, "tree_2");
            this.earthContainer.add([this.tree_2]);
            //console.log(getResources());
            console.log("resource > 50 = add trees");
        }
        if (getResources() < 50) {
            this.earthContainer.remove([this.tree_4, this.tree_3]);
            //console.log(getResources());
            console.log("resource < 50 = remove trees");
        }

        if (getEconomy() > 50) {
            this.factory_2 = this.add.image(0, 0, "factory_2");
            this.earthContainer.add([this.factory_2]);
            //console.log(getEconomy());
            console.log("economy > 50 = add factories");
        }
        if (getEconomy() < 50) {
            this.earthContainer.remove([this.factory_2]);
            //console.log(getEconomy());
            console.log("economy < 50 = remove factories");
        }
        if (getSociety() > 50) {
            this.house_2 = this.add.image(0, 0, "house_2");
            this.earthContainer.add([this.house_2]);
            console.log("society > 50 = add houses");
        }
        if (getSociety() < 50) {
            this.earthContainer.remove([this.house_2]);
            console.log("society < 50 = remove houses");
        }
    }

    createCard() {
        this.currentEvent = getRandomEvent();
        this.question = this.add.text(-50, 0, this.currentEvent["question"],
            { fontSize: '50px', fill: '#000' });
        this.info = this.add.text(-50, 0, this.currentEvent["info"],
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


    endSwipe(e) {
        let swipeTime = e.upTime - e.downTime;
        let swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        let swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        let swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);

            if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {
                if (swipeNormal.x > 0.8) {
                    // right
                    $(this.container).animate({x: this.canvasGame.width + 1500, speed: "slow"});
                    this.swipeX("yes");

                }
                if (swipeNormal.x < -0.8) {
                    // left
                    $(this.container).animate({x: -1500, speed: "slow"});
                    this.swipeX("no");
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

    swipeX(direction) {
        this.moveStar();
        this.earth();
        this.updateEarth();

        this.createCard();

        this.flip = this.flipCard();
        applyConsequence(this.currentEvent[direction]);
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
}