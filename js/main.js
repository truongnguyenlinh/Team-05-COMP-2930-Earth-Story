/* Initialize Main scene */

let gameInstance = null;
class PlayGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
        gameInstance = this;
    }


    preload() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.add.image(0, 0, "bg").setOrigin(0);

        // Create loading screen for while assets are preloading
        let loader = this.add.image(this.canvasGame.width / 2, this.canvasGame.height / 2, "earth");
        loader.displayWidth = this.canvasGame.width * 0.8;
        loader.displayHeight = loader.displayWidth;

        this.loadingText = this.add.image(this.canvasGame.width / 2, this.canvasGame.height - 200, "loading");
        this.loadingText.setInteractive().setOrigin(0.5, 0).setScale(0.25);
        this.loadingText.setOrigin(0.5);

        // Display loading screen while assets preloading
        this.load.on("progress", function () {
            loader.rotation += 0.01;
        });

        // Destory the loading screen when assets are finished preloading
        this.load.on("complete", function (value) {
            loader.destroy();
        });

        // Preload Earth layer assets
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
        this.loadingText.destroy(); // Destroy the loading screen

        // create the timeline and star icon
        this.timeline = this.add.image(0, 0, "timeline");
        this.star = this.add.image(-this.timeline.width / 2, 0, "star").setScale(.25);
        this.progressBar = this.add.container(this.canvasGame.width / 2,
            this.canvasGame.height * 0.9).setSize(this.timeline.width, this.timeline.height);
        this.progressBar.add([this.timeline, this.star]);

        this.setupIcons(); // Generate earth status icons
        this.createEarth(); // Generate earth image

        this.hasSwiped = false; // Boolean state of question card
        this.endGame = false; // Boolean state of the game

        this.currentEvent = getRandomEvent(); // Obtain a random question from question bank
        this.createCard(this.currentEvent["question"], this.currentEvent["info"]); // Create question card from currentEvent
        this.flipCard(); // Allow card to flip
        this.input.on("pointerup", this.endSwipe, this); // On pointer up, calculate the delta for swipe
    }


    update() {
        // if state of endGame is true, transition to EndGame scene
        if (this.endGame) {
            this.scene.start("EndGame");
        }
    }

    // Create the earth with all the earth layers into a container
    createEarth() {
        this.earthContainer = this.add.container(this.canvasGame.width / 2, this.canvasGame.height / 2);
        this.earth_water = this.add.image(0, 0, "earth_water");

        this.earth_dirty_water_1 = this.add.image(0, 0, "earth_dirty_water_1");
        this.earth_dirty_water_2 = this.add.image(0, 0, "earth_dirty_water_2");
        this.earth_dirty_water_3 = this.add.image(0, 0, "earth_dirty_water_3");

        this.earth_water.alpha = 1; // Change alpha of layer to be visible
        this.earth_dirty_water_1.alpha = 1;
        this.earth_dirty_water_2.alpha = 0; // Change alpha of layer to be not visible
        this.earth_dirty_water_3.alpha = 0;

        this.earth_land = this.add.image(0, 0, "earth_land");
        this.earth_dirty_land_1 = this.add.image(0, 0, "earth_dirty_land_1");
        this.earth_dirty_land_2 = this.add.image(0, 0, "earth_dirty_land_2");
        this.earth_dirty_land_3 = this.add.image(0, 0, "earth_dirty_land_3");

        this.earth_land.alpha = 1;
        this.earth_dirty_land_1.alpha = 1;
        this.earth_dirty_land_2.alpha = 0;
        this.earth_dirty_land_3.alpha = 0;

        this.clean_mt = this.add.image(0,0, "clean_mt");
        this.default_mt = this.add.image(0,0, "default_mt");
        this.dirty_mt = this.add.image(0,0, "dirty_mt");

        this.clean_mt.alpha = 0;
        this.dirty_mt.alpha = 0;

        this.clean_clouds = this.add.image(0,0, "clean_clouds");
        this.dirty_clouds = this.add.image(0,0, "dirty_clouds");
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
        this.whale_1 = this.add.image(0, 0, "whale_1");
        this.salmon_1 = this.add.image(0, 0, "salmon_1");
        this.salmon_2 = this.add.image(0, 0, "salmon_2");
        this.tuna_1 = this.add.image(0, 0, "tuna_1");
        this.tuna_2 = this.add.image(0, 0, "tuna_2");
        this.cow_1 = this.add.image(0, 0, "cow_1");
        this.cow_2 = this.add.image(0, 0, "cow_2");
        this.pig_1 = this.add.image(0, 0, "pig_1");
        this.pig_2 = this.add.image(0, 0, "pig_2");
        this.shrimp_1 = this.add.image(0, 0, "shrimp_1");
        this.shrimp_2 = this.add.image(0, 0, "shrimp_2");
        this.whale_2 = this.add.image(0, 0, "whale_2");

        this.fish_2.alpha = 0;
        this.whale_2.alpha = 0;
        this.salmon_2.alpha = 0;
        this.tuna_2.alpha = 0;
        this.cow_2.alpha = 0;
        this.pig_2.alpha = 0;
        this.shrimp_2.alpha = 0;

        this.factory_1 = this.add.image(0, 0, "factory_1");
        this.factory_2 = this.add.image(0, 0, "factory_2");
        this.solar_panel_1 = this.add.image(0, 0, "solar_panel_1");
        this.solar_panel_2 = this.add.image(0, 0, "solar_panel_2");
        this.wind_turbines_1 = this.add.image(0, 0, "wind_turbines_1");
        this.wind_turbines_2 = this.add.image(0, 0, "wind_turbines_2");
        this.wind_turbines_3 = this.add.image(0, 0, "wind_turbines_3");

        this.factory_1.alpha = 0;
        this.factory_2.alpha = 0;
        this.solar_panel_1.alpha = 0;
        this.solar_panel_2.alpha = 0;
        this.wind_turbines_1.alpha = 0;
        this.wind_turbines_2.alpha = 0;
        this.wind_turbines_3.alpha = 0;

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
            this.factory_1, this.factory_2, this.house_1, this.house_2, this.solar_panel_1, this.solar_panel_2,
            this.wind_turbines_1, this.wind_turbines_2, this.wind_turbines_3]);
    }

    // Check Earth status to update visible earth layers
    updateEarth() {
        // Check Environment status
        if (getEnvironment() < 25) {
            this.tweenLayer(this.earth_dirty_water_3, 1);
            this.tweenLayer(this.earth_dirty_land_3, 1);
            this.tweenLayer(this.dirty_mt, 1);
        } else if (getEnvironment() >= 25 && getEnvironment() < 50){
            this.tweenLayer(this.earth_dirty_water_2, 1);
            this.tweenLayer(this.earth_dirty_land_2, 1);
            this.tweenLayer(this.default_mt, 1);
            this.tweenLayer(this.dirty_clouds, 1);

            // remove layers
            this.tweenLayer(this.clean_clouds, 0);
            this.tweenLayer(this.earth_dirty_water_3, 0);
            this.tweenLayer(this.earth_dirty_land_3, 0);
            this.tweenLayer(this.dirty_mt, 0);
        } else if (getEnvironment() >= 50 && getEnvironment() < 75){
            this.tweenLayer(this.earth_dirty_water_1, 1);
            this.tweenLayer(this.earth_dirty_land_1, 1);
            this.tweenLayer(this.clean_clouds, 1);

            // remove layers
            this.tweenLayer(this.earth_dirty_water_2, 0);
            this.tweenLayer(this.earth_dirty_land_2, 0);
            this.tweenLayer(this.dirty_clouds, 0);

        } else if (getEnvironment() >= 75) {
            this.tweenLayer(this.clean_mt, 1);

            // remove layer
            this.tweenLayer(this.earth_dirty_water_1, 0);
            this.tweenLayer(this.earth_dirty_land_1, 0);
            this.tweenLayer(this.dirty_clouds, 0);
        }

        // Check Resource status
        if (getResources() < 25) {
            // remove layers
            this.tweenLayer(this.tree_1, 0);
            this.tweenLayer(this.tree_2, 0);
            this.tweenLayer(this.tree_3, 0);
            this.tweenLayer(this.tree_4, 0);
            this.tweenLayer(this.fish_2, 0);
            this.tweenLayer(this.salmon_2, 0);
            this.tweenLayer(this.tuna_2, 0);
            this.tweenLayer(this.cow_2, 0);
            this.tweenLayer(this.pig_2, 0);
            this.tweenLayer(this.shrimp_2, 0);
            this.tweenLayer(this.fish_1, 0);
            this.tweenLayer(this.salmon_1, 0);
            this.tweenLayer(this.tuna_1, 0);
            this.tweenLayer(this.cow_1, 0);
            this.tweenLayer(this.pig_1, 0);
            this.tweenLayer(this.shrimp_1, 0);

        } else if (getResources() >= 25 && getResources() < 50) {
            this.tweenLayer(this.tree_4, 1);
            this.tweenLayer(this.fish_2, 1);
            this.tweenLayer(this.cow_2, 1);
            this.tweenLayer(this.pig_2, 1);
            this.tweenLayer(this.shrimp_2, 1);

            //remove layers
            this.tweenLayer(this.tree_2, 0);
            this.tweenLayer(this.tree_3, 0);
            this.tweenLayer(this.salmon_2, 0);
            this.tweenLayer(this.tuna_2, 0);
            this.tweenLayer(this.cow_1, 0);
            this.tweenLayer(this.pig_1, 0);
            this.tweenLayer(this.shrimp_1, 0);

        } else if (getResources() >= 50 && getResources() < 75) {
            this.tweenLayer(this.tree_3, 1);
            this.tweenLayer(this.tree_2, 1);
            this.tweenLayer(this.fish_2, 1);
            this.tweenLayer(this.salmon_2, 1);
            this.tweenLayer(this.tuna_2, 1);
            this.tweenLayer(this.whale_2, 1);
            this.tweenLayer(this.cow_1, 1);
            this.tweenLayer(this.pig_1, 1);
            this.tweenLayer(this.shrimp_1, 1);

            //remove layers
            this.tweenLayer(this.tree_1, 0);
            this.tweenLayer(this.salmon_1, 0);
            this.tweenLayer(this.tuna_1, 0);
            this.tweenLayer(this.fish_1, 0);
            this.tweenLayer(this.whale_1, 0);

        } else if (getResources() >= 75) {
            this.tweenLayer(this.tree_1, 1);
            this.tweenLayer(this.fish_1, 1);
            this.tweenLayer(this.salmon_1, 1);
            this.tweenLayer(this.tuna_1, 1);
            this.tweenLayer(this.whale_1, 1);
        }

        // Check Economy Status
        if (getEconomy() < 25) {
            this.tweenLayer(this.factory_2, 0);

            // remove layers
            this.tweenLayer(this.wind_turbines_3, 0);
        } else if (getEconomy() >= 25 && getEconomy() < 50) {
            this.tweenLayer(this.factory_2, 1);

            // remove layers
            this.tweenLayer(this.factory_1, 0);
            this.tweenLayer(this.wind_turbines_2, 0);
            this.tweenLayer(this.wind_turbines_3, 0);

        } else if (getEconomy() >= 50 && getEconomy() < 75) {
            this.tweenLayer(this.factory_1, 1);
            this.tweenLayer(this.wind_turbines_3, 1);

            // remove layers
            this.tweenLayer(this.wind_turbines_1, 0);
            this.tweenLayer(this.wind_turbines_2, 0);

        } else if (getEconomy() >= 75) {
            this.tweenLayer(this.wind_turbines_1, 1);
            this.tweenLayer(this.wind_turbines_2, 1);
        }

        // Check Society status
        if (getSociety() < 33){
            // remove layers
            this.tweenLayer(this.house_2, 0);
            this.tweenLayer(this.bush_2, 0);

        } else if (getSociety() >= 33 && getSociety() < 66) {
            // remove layers
            this.tweenLayer(this.house_1, 0);
            this.tweenLayer(this.bush_1, 0);

        } else if (getSociety() > 66) {
            this.tweenLayer(this.house_1, 1);
            this.tweenLayer(this.bush_1, 1);
            this.tweenLayer(this.house_2, 1);
            this.tweenLayer(this.bush_2, 1);
        }
    }


    // Tween animation for earth layers
    tweenLayer(layer, alphaValue) {
        this.tweens.add({
            targets: layer,
            alpha: alphaValue,
            ease: 'Linear',
            duration: 600
        });
    }


    // Generate the question card
    createCard(textFront, textBack) {
        this.card = this.add.image(0, 0, "card").setInteractive();
        this.card.setScale(2.75);
        this.card.alpha = 0.7;

        // Card styling
        let textStyle = {
            color: '#000000',
            align: "center",
            boundsAlignH: "center",
            fontFamily: 'Abel',
            fontSize: '6em',
            wordWrap: {
                width: this.card.width * 2.25,
                useAdvancedWrap: false
            }
        };
        // Add text to card
        this.question = this.add.text(0, 0, textFront, textStyle).setOrigin(0.5);
        this.info = this.add.text(0, 0, textBack, textStyle).setOrigin(0.5);
        this.info.visible = false;
        // Container for the card
        this.container = this.add.container(this.canvasGame.width / 2, this.canvasGame.height / 2)
            .setSize(this.canvasGame.width * 0.5, this.canvasGame.width * 0.5)
            .setInteractive();
        this.container.add([this.card, this.question, this.info]);
    }


    // Move star along the timeline
    moveStar() {
        this.star.x += this.progressBar.width / 30;
        if (Math.ceil(this.star.x) > this.progressBar.width / 2) {
            this.endGame = true;
        }
    }

    // Flip card to backside on click
    flipCard() {
        this.card.on('pointerup', function () {
            if (this.flipping || this.hidden) {
                return;
            }
            this.sound.play('sfxCard');
            this.flipping = true;

            // Animation to make card look like a line
            this.tweens.add({
                targets: this.card,
                scaleY: 2.9,
                scaleX: 0,
                flipX: true,
                duration: 200,
            });

            // Animation to make text look like a line
            this.tweens.add({
                targets: [this.question, this.info],
                scaleY: 1.2,
                scaleX: 0,
                flipX: true,
                duration: 200,
            });

            // Detect what is on the card
            this.time.delayedCall(200, function () {
                if (this.question.visible) {
                    this.info.visible = true;
                    this.question.visible = false;
                } else {
                    this.info.visible = false;
                    this.question.visible = true;
                }
                // Change card back to original size
                this.tweens.add({
                    targets: this.card,
                    scaleY: 2.75,
                    scaleX: 2.75,
                    flipX: true,
                    duration: 200,
                });

                // Change text back to original size
                this.tweens.add({
                    targets: [this.question, this.info],
                    scaleY: 1,
                    scaleX: 1,
                    flipX: true,
                    duration: 200,
                });
            }, this.card, this);

            this.time.delayedCall(350, function () {
                this.flipping = false;
            }, this.card, this);
        }, this);
    }

    // Calculate the delta for the swipe length to initiate card swipe
    endSwipe(e) {
        let swipeTime = e.upTime - e.downTime; // Calculate swipe time
        let swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        let swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        let swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);

        // When swipeMagnitude is greater than magnitude of 20 and swipeTime is less than absolute value of y and x swipe
        if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {
            // Don't allow swipe when card is being flipped
            if (this.flipping) {
                return;
            }

            // If swipe is greater than magnitude of 0.8 and has not already been swiped
            if (swipeNormal.x > 0.8 && this.hasSwiped === false) {
                // Swipe right
                this.sound.play('sfxCard');
                this.hasSwiped = true;
                $(this.container).animate({x: this.canvasGame.width + 1500, speed: 500});

                // When card is off the screen (has been swiped), destroy the asset and update Earth image
                this.time.delayedCall(500, function () {
                    if (this.container.x === this.canvasGame.width + 1500) {
                        this.container.destroy();
                        this.updateEarth();
                    }
                }, this.container, this);

                // Complete swipeX method on statuses
                this.time.delayedCall(1410, function () {
                    this.hasSwiped = false;
                    this.swipeX("yes");
                }, this.swipeX, this);
            }

            if (swipeNormal.x < -0.8 && this.hasSwiped === false) {
                // Swipe left
                this.sound.play('sfxCard');
                this.hasSwiped = true;
                $(this.container).animate({x: -1500, speed: 500});

                // When card is off the screen (has been swiped), destroy the asset and update Earth image
                this.time.delayedCall(500, function () {
                    if (this.container.x === -1500) {
                        this.container.destroy();
                        this.updateEarth();
                    }
                }, this.container, this);

                // Complete swipeX method on statuses
                this.time.delayedCall(1410, function () {
                    this.hasSwiped = false;
                    this.swipeX("no");
                }, this.swipeX, this);
            }

            // When card container is greater than 0.8 and is not hidden on screen
            if (swipeNormal.y > 0.8 && !this.hidden) {
                // Swipe down
                this.sound.play('sfxCard');
                $(this.container).animate({y: this.canvasGame.height * 1.16});
                this.hasSwiped = true;
                this.hidden = true;
            }

            // When card container is less than -0.8 and is currently off screen
            if (swipeNormal.y < -0.8 && this.hidden) {
                // Swipe up
                this.sound.play('sfxCard');
                $(this.container).animate({y: this.canvasGame.height / 2});
                this.hasSwiped = false;
                this.hidden = false;
            }
        }
    }


    // Helper function on horizontal swipe to trigger moveStar, createCard and flipCard
    swipeX(direction) {
        if (!this.endGame) {
            if (this.currentEvent) {
                applyConsequence(this.currentEvent[direction]);
            }
            this.currentEvent = getRandomEvent();
            this.moveStar();
            this.createCard(this.currentEvent["question"], this.currentEvent["info"]);
            this.flipCard();
        }
    }


    // Set up earth status icons at the top of the screen
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


    // Helper function to invoke masking of status icons
    updateIcons() {
        this.cropIcon(this.envMask, getEnvironment());
        this.cropIcon(this.socMask, getSociety());
        this.cropIcon(this.ecoMask, getEconomy());
        this.cropIcon(this.resMask, getResources());
    }


    // Crop the status icons
    cropIcon(icon, percent) {
        icon.setCrop(0, icon.height - icon.height * (percent / 100), 1000, 1000);
    }


    // Trigger end of game
    triggerEndGame() {
        this.endGame = true;
    }


    // Visually flash the status icons on change
    flashStatus(target) {
        target.alpha = 1;
        this.tweens.add({
            targets: target,
            alpha: 0.6,
            ease: 'Sine.easeInOut',
            duration: 400,
            yoyo: true
        });
    }
}
