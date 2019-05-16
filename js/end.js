class EndScene extends Phaser.Scene {
    constructor() {
        super("EndGame");
    }


    preload() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");
        this.add.image(0, 0, "bg").setOrigin(0);

        this.load.image("leaderboard", "./assets/images/button/leaderboard_button.png");
        this.load.image("Restart", "./assets/images/button/restart_button.png");
    }


    create() {

        this.setupIcons();
        this.createEarth();
        this.updateEarth();
        this.readDatabase();
        this.gameOver();
        this.showLeader = false;

        this.leaderboard = this.add.image(this.canvasGame.width / 3, this.canvasGame.height * 0.9,
            "leaderboard");
        this.leaderboard.setInteractive().setOrigin(0.5, 0).setScale(0.25);
        this.leaderboard.on("pointerdown", function() {
            if (this.showLeader === false) {
                this.hideScore();

                this.leaderRankTitle.visible = true;
                this.leaderNameTitle.visible = true;
                this.leaderScoreTitle.visible = true;
                this.leaderRank.visible = true;
                this.leaderName.visible = true;
                this.leaderScore.visible = true;
                this.showLeader = true;
            }
        }, this);

        this.restart = this.add.image(this.canvasGame.width * 3 / 4, this.canvasGame.height * 0.9,
            "Restart");
        this.restart.setInteractive().setOrigin(0.5, 0).setScale(0.25);
        this.restart.on("pointerdown", function(){
            restartStat();
            this.scene.start("BootScene");
        }, this);
    }

    readDatabase() {
        const playerRoot = firebase.database().ref().child("players/");
        var count = 0;
        playerRoot.once('value').then((snapshot) => {
            let list = snapshot.val();
            console.log(list);
            for (this.x in list) {
                count += 1;
            }
            addPlayer(count);
        }).then((getLeader) => {
            this.getLeader()})

    }

    getLeader(){
        const playerRoot = firebase.database().ref().child("players/");
        var leaders = [];
        playerRoot.once('value').then((snapshot) => {
            let list = snapshot.val();
            for (this.x in list){
                let playersInfo = [];
                playersInfo.push(list[this.x]['profile']['name']);
                playersInfo.push(list[this.x]['score']['average']);
                leaders.push(playersInfo)
            }
            leaders.sort(function(a, b) { return b[1] - a[1]});
            console.log(leaders);
            this.displayLeaders(leaders);
        })
    }


    displayLeaders(leaders){
        // console.log(leaders[0]);
        var style = { fill: "#000000", fontSize: "5em", fontFamily: 'Abel', tabs: 300,};
        this.leaderRankTitle = this.add.text(-this.container.width*2.75 / 4 , -this.container.height / 1.5, "Rank", style).setOrigin(0.5, 0);
        this.leaderNameTitle = this.add.text(0 , -this.container.height / 1.5, "Name", style).setOrigin(0.5, 0);
        this.leaderScoreTitle = this.add.text(this.container.width *2.75/ 4 , -this.container.height / 1.5, "Score", style).setOrigin(0.5, 0);

        this.leaderRank = this.add.text(-this.container.width *2.75/ 4, -this.container.height*2.75 / 6, "", style).setOrigin(0.5, 0);
        this.leaderName = this.add.text(0, -this.container.height *2.75/ 6, "", style).setOrigin(0.5, 0);
        this.leaderScore = this.add.text(this.container.width *2.75/ 4, -this.container.height*2.75 / 6, "", style).setOrigin(0.5, 0);

        this.leaderRankTitle.visible = false;
        this.leaderNameTitle.visible = false;
        this.leaderScoreTitle.visible = false;
        this.leaderRank.visible = false;
        this.leaderName.visible = false;
        this.leaderScore.visible = false;

        this.container.add([this.leaderRankTitle, this.leaderNameTitle, this.leaderScoreTitle]);
        if (leaders.length >= 5) {
            for (let i = 0; i < 5; i++) {
                this.leaderRank.text += i+1+"\n";
                this.leaderName.text += leaders[i][0]+"\n";
                this.leaderScore.text += leaders[i][1]+"\n";
            }
        } else {
            for (let i = 0; i < leaders.length; i++) {
                this.leaderRank.text += i+1+"\n";
                this.leaderName.text += leaders[i][0]+"\n";
                this.leaderScore.text += leaders[i][1]+"\n";
            }

        }
        this.container.add([this.leaderRank, this.leaderName, this.leaderScore]);
    }


    hideScore(){
        this.question.visible = false;
        this.info.visible = false;
    }

    gameOver(){
        if (getAverage() > 300){
            this.createCard(getGoodEnding(), getEndingBack());
        }
        else {
            this.createCard(getBadEnding(), getEndingBack());
        }
        this.flipCard();
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

        this.earthContainer.add([this.earth_water, this.earth_dirty_water_1, this.earth_dirty_water_2,
            this.earth_dirty_water_3, this.earth_land, this.earth_dirty_land_1, this.earth_dirty_land_2,
            this.earth_dirty_land_3, this.bush_1, this.bush_2, this.tree_1, this.tree_2, this.tree_3, this.tree_4,
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
            color:'#000000',
            align:"center",
            fontFamily: 'Abel',
            boundsAlignH: "center",
            fontSize: '60px',
            wordWrap: {
                width: this.card.width * 2.25,
                useAdvancedWrap: false
            }
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


        this.card.on('pointerup', function(){
            if (this.showLeader){
                this.leaderRankTitle.visible = false;
                this.leaderNameTitle.visible = false;
                this.leaderScoreTitle.visible = false;
                this.leaderRank.visible = false;
                this.leaderName.visible = false;
                this.leaderScore.visible = false;
                this.showLeader = false;

            }
            this.tweens.add({
                targets: this.card,
                scaleY: 2.9,
                scaleX: 0,
                flipX: true,
                duration: 200,
            });

            this.tweens.add({
                targets: [this.question, this.info],
                scaleY: 1.2,
                scaleX: 0,
                flipX: true,
                duration: 200,
            });
            this.time.delayedCall(200, function(){

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
                    duration: 200,
                });
                this.tweens.add({
                    targets: [this.question, this.info],
                    scaleY: 1,
                    scaleX: 1,
                    flipX: true,
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
