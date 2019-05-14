class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }


    preload() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.load.image("earth", "./assets/images/earth.png");
        this.load.image("logo", "./assets/images/logo.png");
        this.load.image("bg", "./assets/images/background.png");
        this.load.spritesheet('cat', './assets/images/nyan_cat_sprite.png', { frameWidth: 52.7, frameHeight: 22});

        this.load.audio('bgm','./assets/bgm.mp3');
    }


    create() {

        this.bgm = this.sound.play('bgm', config);

        initializeEvents(); // Read and initialize events.json
        initializeEndings(); // Read and initialize endings.json

        this.bg = this.add.image(0, 0, "bg").setOrigin(0,0);
        this.logo = this.add.image(this.canvasGame.width / 2, this.canvasGame.height / 2, "logo");
        this.logo.displayWidth = this.canvasGame.width * 0.8;
        this.logo.displayHeight = this.logo.displayWidth;

        this.countSpin = 0;
        this.canSpin = true;
        this.logo.setInteractive();
        this.logo.on("pointerdown", this.spinEarth, this);

        this.button = this.add.text(this.canvasGame.width / 2, this.canvasGame.height / 1.35,
            "Play", { fill: "#FFFFFF", fontSize: "3em", fontFamily: 'abel-regular'});
        this.button.setInteractive().setOrigin(0.5, 0);
        this.button.on("pointerdown", this.firebaseLogin, this);

        this.tutorial = this.add.text(this.canvasGame.width / 2, this.canvasGame.height / 1.25,
            "Tutorial", { fill: "#FFFFFF", fontSize: "3em", fontFamily: 'abel-regular' });
        this.tutorial.setInteractive().setOrigin(0.5, 0);

        this.options = this.add.text(this.canvasGame.width / 2, this.canvasGame.height / 1.15,
            "Options", { fill: "#FFFFFF", fontSize: "3em", fontFamily: 'abel-regular' });
        this.options.setInteractive().setOrigin(0.5, 0);

        this.about = this.add.text(this.canvasGame.width / 2, this.canvasGame.height / 1.08,
            "About", { fill: "#FFFFFF", fontSize: "3em", fontFamily: 'abel-regular' });
        this.about.setInteractive().setOrigin(0.5, 0);

        if (firebase.auth().currentUser) {
            this.logout = this.add.text(this.canvasGame.width / 2, this.canvasGame.height / 1.05,
                "Log out", {fill: "#FFFFFF", fontSize: "3em"});
            this.logout.setInteractive().setOrigin(0.5, 0);
            this.logout.on("pointerdown", this.firebaseLogout, this);
        }
    }


    firebaseLogin() {
        console.log("called firebaseLogin");
        this.login = function (provider) {
            "use strict";
            if (!firebase.auth().currentUser) {
                provider = new firebase.auth.GoogleAuthProvider();
                //provider.addScope('https://www.googleapis.com/auth/plus.login');
                provider.addScope("https://www.googleapis.com/auth/userinfo.email");

                firebase.auth().signInWithRedirect(provider).then(this.start_game.bind(this));
            } else {
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid).once("value").then(this.start_game.bind(this));
            }
        };

        this.start_game = function () {
            "use strict";
            this.scene.start("PlayGame");
        };
        this.login();
    }


    firebaseLogout(){
        firebase.auth().signOut().then(function() {
            // Redirect to google sign out.
            window.location.assign('https://accounts.google.com/logout');
        });
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