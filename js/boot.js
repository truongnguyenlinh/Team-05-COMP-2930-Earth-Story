/* Initialize Boot scene */

class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    // Preload assets
    preload() {
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.load.image("earth", "./assets/images/earth.png");
        this.load.image("logo", "./assets/images/logo.png");
        this.load.image("bg", "./assets/images/background.png");
        this.load.spritesheet('cat', './assets/images/nyan_cat_sprite.png', { frameWidth: 52.7, frameHeight: 22});

        this.load.image("unmute", "./assets/images/unmute.png");
        this.load.image("mute", "./assets/images/mute.png");

        this.load.audio('bgm','./assets/sounds/bgm.mp3');
        this.load.audio('sfxButton','./assets/sounds/button.wav');
        this.load.audio('sfxCard','./assets/sounds/card.mp3');
        this.load.audio('sfxTick','./assets/sounds/tick.wav');

        this.load.image("about", "./assets/images/button/About_button.png");
        this.load.image("start", "./assets/images/button/Start_button.png");
        this.load.image("tutorial", "./assets/images/button/tutorial_button.png");
        this.load.image("logout", "./assets/images/button/logout_button.png");
        this.load.image("loading", "./assets/images/loading.png");
    }

    // Create assets on canvas
    create() {
        // Check if background music and start music if it isn't playing
        if (!this.bgm) {
            this.sound.pauseOnBlur = false;
            this.bgm = this.sound.add('bgm', config);
            this.bgm.play();
        }

        initializeEvents(); // Read and initialize events.json
        initializeEndings(); // Read and initialize endings.json

        this.bg = this.add.image(0, 0, "bg").setOrigin(0,0); // Create background image

        // Create logo and place at centre of canvas
        this.logo = this.add.image(this.canvasGame.width / 2, this.canvasGame.height * 0.4, "logo");
        this.logo.displayWidth = this.canvasGame.width * 0.8;
        this.logo.displayHeight = this.logo.displayWidth;

        this.countSpin = 0; // Initialize counter for easter egg logo spinning
        this.canSpin = true; // Boolean state for logo
        this.logo.setInteractive(); // Allow logo to be interactive
        this.logo.on("pointerdown", this.spinEarth, this); // Spin earth on pointer down

        this.startGame = false; // Boolean state for startGame

        // Add start button and have it run function firebaseLogin on pointer down
        this.start = this.add.image(this.canvasGame.width / 2, this.canvasGame.height * 0.65,
            "start");
        this.start.setInteractive().setOrigin(0.5, 0).setScale(0.25);
        this.start.on("pointerdown", this.firebaseLogin, this);

        // Add tutorial button and have it change to PlayTutorial scene on pointer down
        this.tutorial = this.add.image(this.canvasGame.width / 2, this.canvasGame.height * 0.72,
            "tutorial");
        this.tutorial.setInteractive().setOrigin(0.5, 0).setScale(0.25);
        this.tutorial.on("pointerdown", function() {
            this.sound.play('sfxButton');
            this.scene.start("PlayTutorial");
        }, this);

        // Add tutorial button and have it change to AboutScene scene on pointer down
        this.about = this.add.image(this.canvasGame.width / 2, this.canvasGame.height * 0.79,
            "about");
        this.about.setInteractive().setOrigin(0.5, 0).setScale(0.25);
        this.about.on("pointerdown", function() {
            this.sound.play('sfxButton');
            this.scene.start("AboutScene");
        }, this);

        // Add mute button and turn off game sounds on pointer down
        this.mute = this.add.image(this.canvasGame.width/ 1.06 , this.canvasGame.height / 55, "mute").setScale(1);
        this.mute.setInteractive().setOrigin(0.5, 0);
        this.mute.on("pointerdown", function(){
            game.sound.mute = false;
        });

        // Add unmute button and turn on game sounds on pointer down
        this.unmute = this.add.image(this.canvasGame.width/ 1.06 , this.canvasGame.height / 55, "unmute").setScale(1);
        this.unmute.setInteractive().setOrigin(0.5, 0);
        this.unmute.on("pointerdown",function(){
            game.sound.mute = true;
        });
    }

    /* Check if user is currently logged in. If user is not logged in, use Firebase Authentication to allow for log in.
     Else start the game.
     */
    firebaseLogin() {
        this.sound.play('sfxButton');
        // Check if user is logged in
        this.login = function (provider) {
            if (!firebase.auth().currentUser) {
                provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope("https://www.googleapis.com/auth/userinfo.email");
                // Check browser of user
                if (navigator.userAgent.indexOf("Chrome") != -1 )
                {
                    firebase.auth().signInWithPopup(provider).then(this.start_game.bind(this)); // If user browser is Chrome, use Popup

                }
                else if(navigator.userAgent.indexOf("Safari") != -1) // If user browser is Safari, use Redirect
                {
                    firebase.auth().signInWithRedirect(provider).then(this.start_game.bind(this));
                }
            } else {
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid).once("value").then(this.start_game.bind(this)); // Start game if user logged in
            }
        };

        // Start game function
        this.start_game = function () {
            if (this.startGame === false){
                this.startGame = true;
                this.scene.start("PlayGame");
            }
        };
        this.login();
    }


    // Logout of Firebase Authentication
    firebaseLogout(){
        this.sound.play('sfxButton');
        firebase.auth().signOut();
        this.scene.restart(); // Refresh scene
    }


    // Easter Egg #1 Spin the Earth Story logo
    spinEarth() {
        if (this.canSpin) {
            this.sound.play('sfxTick');
            this.canSpin = false; // Boolean state of the logo
            // Animation for the spin
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

        // If spin counter reaches 3, Invoke nyanCat function
        this.countSpin += 1;
        if (this.countSpin == 3) {
            this.nyanCat();
            this.countSpin = 0;
        }
    }


    // Easter Egg #1 Send 3 animated nyan cats across the screen
    nyanCat(){
        // Add three cat sprites
        this.cat = this.physics.add.sprite(-10, Math.random() * this.canvasGame.height, "cat", 0).setScale(3);
        this.cat_2 = this.physics.add.sprite(-50, Math.random() * this.canvasGame.height, "cat", 0).setScale(3);
        this.cat_3 = this.physics.add.sprite(-20, Math.random() * this.canvasGame.height, "cat", 0).setScale(3);

        // Animate cat sprite from spritesheet
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 9 }),
            frameRate: 9,
            repeat: -1
        });

        this.cat.setVelocityX(300); // Set speed cat will travel horizontally
        this.cat.anims.play('right', true); // Send cat across the screen

        this.cat_2.setVelocityX(200);
        this.cat_2.anims.play('right', true);

        this.cat_3.setVelocityX(400);
        this.cat_3.anims.play('right', true);
    }


    update() {
        // Display log out button only if user logged in
        if (firebase.auth().currentUser) {
            this.logout = this.add.image(this.canvasGame.width / 2, this.canvasGame.height * 0.86,
                "logout");
            this.logout.setInteractive().setOrigin(0.5, 0).setScale(0.25);
            this.logout.on("pointerdown", this.firebaseLogout.bind(this), this);
        }

        // If game sound is muted, unhide the mute button
        if (game.sound.mute == true){
            this.unmute.visible = false;
        } else {
            this.unmute.visible = true;
            game.sound.mute = false;
        }
    }
}
