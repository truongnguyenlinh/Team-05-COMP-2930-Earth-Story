// Global variable colors to make page indicators white for all members
let colors = ["0xffffff", "0xffffff", "0xffffff", "0xffffff", "0xffffff"];


class AboutScene extends Phaser.Scene{
    constructor(){
        super("AboutScene");
    }


    preload(){
        // Obtain canvas for current AboutScene
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.add.image(0, 0, "bg").setOrigin(0);

        // Loader variable displays logo image during pre-load, before all assets appear
        let loader = this.add.image(this.canvasGame.width / 2, this.canvasGame.height / 2, "earth");
        loader.displayWidth = this.canvasGame.width * 0.8;
        loader.displayHeight = loader.displayWidth;

        // Loading Text also included to clearly display to the user that scene is loading
        this.loadingText = this.add.image(this.canvasGame.width / 2, this.canvasGame.height - 200, "loading");
        this.loadingText.setInteractive().setOrigin(0.5, 0).setScale(0.25);
        this.loadingText.setOrigin(0.5);

        this.load.on("progress", function() {
            loader.rotation += 0.01;
        });

        // Once scene is completely loaded, loader image and text are destroyed
        loader.destroy();
        this.loadingText.destroy();
        this.load.image("levelpages", "./assets/images/about/levelpages.png");
        this.load.image("transp", "./assets/images/about/transp.png");
        this.load.image("gordon", "./assets/images/about/gordon.png");
        this.load.image("josh", "./assets/images/about/josh.png");
        this.load.image("may", "./assets/images/about/may.png");
        this.load.image("suhee", "./assets/images/about/suhee.png");
        this.load.image("linh", "./assets/images/about/linh.png");
        this.load.image("quit", "./assets/images/button/quit_button.png");
    }


    create(){
        // Method this.moving determines whether page is currently in drag mode. If moving, this.moving reassigned to true
        this.moving = false;

        this.canMove = true;

        // Method this.itemGroup used to make it appear that page is moving
        this.itemGroup = this.add.group();

        // All images and biographies are bound to this.scrollingMap to ensure that assets move with swipe
        this.scrollingMap = this.add.tileSprite(0, 0, colors.length * this.canvasGame.width, this.canvasGame.height, "transp");
        this.scrollingMap.setInteractive();
        this.input.setDraggable(this.scrollingMap);
        this.scrollingMap.setOrigin(0, 0);

        // this.currentPage keeps track of where user is on About Scene
        this.currentPage = 0;

        // Used to contain all page indicators as an array
        this.pageSelectors = [];
        let leftMargin = this.canvasGame.width / 2;

        let nameStyle = {
            fill: "#FFFFFF",
            align:"center",
            fontSize: "8em",
            fontFamily: 'Abel',
        };

        let bioStyle = {
            fill: "#FFFFFF",
            align:"center",
            fontSize: "4.75em",
            fontFamily: 'Abel',
            wordWrap: {
                width: this.canvasGame.width * 0.7,
                useAdvancedWrap: false
            }
        };

        // Images are at position x (half of canvas), and position y, (top half of page)
        let gordonImage = this.add.image(this.canvasGame.width / 2, this.canvasGame.height * 0.2, "gordon").setOrigin(0.5);
        let gordonName = this.make.text({
            x: this.canvasGame.width / 2,
            y: this.canvasGame.height * 0.4,
            text: "GORDON TSUI",
            style: nameStyle});
        gordonName.setOrigin(0.5);
        let gordonBio = this.make.text({
            x: this.canvasGame.width / 2,
            y: this.canvasGame.height * 0.45,
            text: "A recent BCIT Computer Systems Technology graduate; focused on the Earth image layering" + 
            "and progress bar slider.",
            style: bioStyle
        });
        gordonBio.setOrigin(0.5, 0);

        let suheeImage = this.add.image(this.canvasGame.width + leftMargin * 1.1, this.canvasGame.height * 0.2, "suhee").setOrigin(0.5);
        let suheeName = this.make.text({
            x: this.canvasGame.width * 1.063 + leftMargin,
            y: this.canvasGame.height * 0.4,
            text: "SUHEE BAE",
            style: nameStyle});
        suheeName.setOrigin(0.5);
        let suheeBio = this.make.text({
            x: this.canvasGame.width * 1.063 + leftMargin,
            y: this.canvasGame.height * 0.45,
            text: "A BFA in Visual Design; focused on creating all assets " + 
            "and producing Earth Story's pitch video.",
            style: bioStyle

        });
        suheeBio.setOrigin(0.5, 0);

        let mayImage = this.add.image(2 * (this.canvasGame.width * 1.076) + leftMargin, this.canvasGame.height * 0.2, "may").setOrigin(0.5);
        let mayName = this.make.text({
            x: (2 * this.canvasGame.width * 1.063) + leftMargin,
            y: this.canvasGame.height * 0.4,
            text: "MAY CHAU",
            style: nameStyle});
        mayName.setOrigin(0.5);
        let mayBio = this.make.text({
            x: (2 * this.canvasGame.width * 1.063) + leftMargin,
            y: this.canvasGame.height * 0.45,
            text: "A current Junior Software Engineer at Netskirt Systems and " + 
            "BCIT Computer Systems Technology student; " + 
            "focused on the card swipe feature. ",
            style: bioStyle
        });
        mayBio.setOrigin(0.5, 0);

        let linhImage = this.add.image(3 * (this.canvasGame.width * 1.063) + leftMargin, this.canvasGame.height * 0.2, "linh").setOrigin(0.5);
        let linhName = this.make.text({
            x: (3 * this.canvasGame.width * 1.063) + leftMargin,
            y: this.canvasGame.height * 0.4,
            text: "LINH TRUONG",
            style: nameStyle});
        linhName.setOrigin(0.5);
        let linhBio = this.make.text({
            x: (3 * this.canvasGame.width * 1.063) + leftMargin,
            y: this.canvasGame.height * 0.45,
            text: "A current BCIT Computer Systems Technology student; " + 
            "focused on navigating through the Phaser 3 framework and documentation. ",
            style: bioStyle
        });
        linhBio.setOrigin(0.5, 0);

        let joshImage = this.add.image(4 * (this.canvasGame.width * 1.063) + leftMargin, this.canvasGame.height * 0.2, "josh").setOrigin(0.5);
        let joshName = this.make.text({
            x: (4 * this.canvasGame.width * 1.063) + leftMargin,
            y: this.canvasGame.height * 0.4,
            text: "JOSHUA SHIN",
            style: nameStyle});
        joshName.setOrigin(0.5);
        let joshBio = this.make.text({
            x: (4 * this.canvasGame.width * 1.063) + leftMargin,
            y: this.canvasGame.height * 0.45,
            text: "A current BCIT Computer Systems Technology student; " +
            "focused on the status icon functionality, which determines the user's progress.",
            style: bioStyle
        });
        joshBio.setOrigin(0.5, 0);

        // For loop to go through the array of indicators
        for (let k = 0; k < colors.length; k++){
            this.itemGroup.add(gordonImage);
            this.itemGroup.add(gordonName);
            this.itemGroup.add(gordonBio);

            this.itemGroup.add(suheeImage);
            this.itemGroup.add(suheeName);
            this.itemGroup.add(suheeBio);

            this.itemGroup.add(mayImage);
            this.itemGroup.add(mayName);
            this.itemGroup.add(mayBio);

            this.itemGroup.add(linhImage);
            this.itemGroup.add(linhName);
            this.itemGroup.add(linhBio);

            this.itemGroup.add(joshImage);
            this.itemGroup.add(joshName);
            this.itemGroup.add(joshBio);

            // Add an indicator to the array through for-loop
            this.pageSelectors[k] = this.add.sprite(this.canvasGame.width / 2 + (k - Math.floor(colors.length / 2) + 0.5 * (1 - colors.length % 2)) * 40, this.canvasGame.height - 40, "levelpages");
            this.pageSelectors[k].setInteractive();
            this.pageSelectors[k].on("pointerdown", function(){
                if (this.scene.canMove){
                    // Obtains page the user wants to go to when user clicks on page indicator
                    let difference = this.pageIndex - this.scene.currentPage;
                    this.scene.changePage(difference);
                    this.scene.canMove = false;
                }
            });

            // Indicator is seen as large, when user is on current page. Otherwise, seen as smaller
            this.pageSelectors[k].pageIndex = k;
            if (k === this.currentPage){
                this.pageSelectors[k].scaleY = 1;

            }
            else {
                this.pageSelectors[k].scaleY = 0.5;
            }
        }

        // Obtain users initial start position and ending position
        this.input.on("dragstart", function(pointer, gameObject){
            if (this.moving) {
                return;
            }
            gameObject.startPosition = gameObject.x;
            gameObject.currentPosition = gameObject.x;
        });

        // Obtain input in the process of drag
        this.input.on("drag", function(pointer, gameObject, dragX){
            if (this.moving) {
                return;
            }
            // DragX must be greater than 10 and greater than ~ -10
            if (dragX <= 10 && dragX >= -gameObject.width + game.config.width - 10){
                gameObject.x = dragX;
                let delta = gameObject.x - gameObject.currentPosition;
                gameObject.currentPosition = dragX;
                // Iterate through the page for each member
                this.itemGroup.children.iterate(function(item){
                    item.x += delta;
                });
            }
        }, this);

        this.input.on("dragend", function(pointer, gameObject){
            if (this.moving) {
                return;
            }
            this.canMove = false;
            let delta = gameObject.startPosition - gameObject.x;
            if (delta === 0){
                this.canMove = true;
            }
            // If swip eright, change current page to +1
            if (delta > game.config.width / 8){
                this.changePage(1);
            }
            else {
                // If swipe left, change current page to -1
                if (delta < -game.config.width / 8){
                    this.changePage(-1);
                }
                else {
                    this.changePage(0);
                }
            }
        }, this);

        // On pointer down on exit button, start a new scene
        this.exitbutton = this.add.image(this.canvasGame.width * 0.9, this.canvasGame.height * 0.07, 'quit');
        this.exitbutton.setInteractive().setScale(0.3);
        this.exitbutton.on("pointerdown", function() {
            this.sound.play('sfxButton');
            this.scene.start("BootScene");
        }, this);
    }


    // Handles how swipe looks, when moving from one page to another
    changePage(page){
        if (!this.canMove) {
            this.sound.play('sfxTick');
            this.moving = true;
        }

        // Changes the size of the page indicators at the bottom of the page
        this.currentPage += page;
        for (let k = 0; k < colors.length; k++){
            if (k === this.currentPage){
                // Page indicator is large when on current page
                this.pageSelectors[k].scaleY = 1;
            }
            else{
                // Page indicator is small when on current page
                this.pageSelectors[k].scaleY = 0.5;
            }
        }

        // ScrollingMap.x is current position of transparent tile group
        let currentPosition = this.scrollingMap.x;
        this.tweens.add({
            targets: this.scrollingMap,
            x: this.currentPage * -game.config.width,
            duration: 300,
            ease: "Cubic.easeOut", // Change of page will be smooth and will appear as if it eases into new page
            callbackScope: this,
            onUpdate: function(tween, target){
                let delta = target.x - currentPosition;
                currentPosition = target.x;
                this.itemGroup.children.iterate(function(item){
                    item.x += delta; // Tile group x position will be added by delta when swiped
                });
            },
            onComplete: function(){
                this.canMove = true;
            }
        });

        // Locks the movement when tween is in transition, to limit breaking the carousel
        this.time.delayedCall(400, function () {
            this.moving = false;
        }, this.canvasGame, this);
    }
}
