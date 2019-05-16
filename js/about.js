let colors = ["0xffffff", "0xffffff", "0xffffff", "0xffffff", "0xffffff"];

class AboutScene extends Phaser.Scene{
    constructor(){
        super("AboutScene");
    }


    preload(){
        this.canvas1 = document.getElementsByTagName("canvas");
        this.canvas1[0].setAttribute("id", "canvasGame");
        this.canvasGame = document.getElementById("canvasGame");

        this.add.image(0, 0, "bg").setOrigin(0);
        let loader = this.add.image(this.canvasGame.width / 2, this.canvasGame.height / 2, "earth");
        loader.displayWidth = this.canvasGame.width * 0.8;
        loader.displayHeight = loader.displayWidth;

        this.loadingText = this.make.text({
            x: this.canvasGame.width / 2,
            y: this.canvasGame.height - 200,
            text: 'Loading...',
            style: {
                fill: '#ffffff',
                fontSize: "3em"
            }
        });
        this.loadingText.setOrigin(0.5);

        this.load.on("progress", function() {
            loader.rotation += 0.01;
        });

        loader.destroy();
        this.loadingText.destroy();
        this.load.image("levelpages", "./assets/images/about/levelpages.png");
        this.load.image("transp", "./assets/images/about/transp.png");
        this.load.image("gordon", "./assets/images/about/gordon.png");
        this.load.image("josh", "./assets/images/about/josh.png");
        this.load.image("may", "./assets/images/about/may.png");
        this.load.image("suhee", "./assets/images/about/suhee.png");
        this.load.image("linh", "./assets/images/about/linh.png");
    }


    create(){
        this.container = [];
        this.container[0] = 0;
        this.canMove = true;
        this.itemGroup = this.add.group();
        for (let l = 1; l < colors.length; l++){
            this.container[l] = -1;
        }

        this.scrollingMap = this.add.tileSprite(0, 0, colors.length * this.canvasGame.width, this.canvasGame.height, "transp");
        this.scrollingMap.setInteractive();
        this.input.setDraggable(this.scrollingMap);
        this.scrollingMap.setOrigin(0, 0);
        this.currentPage = 0;
        this.pageSelectors = [];
        let leftMargin = this.canvasGame.width / 2;

        let gordon_image = this.add.image(this.canvasGame.width / 1.9, this.canvasGame.height / 2, "gordon").setOrigin(0.5, 1);
        let suhee_image = this.add.image(this.canvasGame.width + leftMargin * 1.1, this.canvasGame.height / 2, "suhee").setOrigin(0.5, 1);
        let may_image = this.add.image(2 * (this.canvasGame.width * 1.076) + leftMargin, this.canvasGame.height / 2, "may").setOrigin(0.5, 1);
        let linh_image = this.add.image(3 * (this.canvasGame.width * 1.063) + leftMargin, this.canvasGame.height / 2, "linh").setOrigin(0.5, 1);
        let josh_image = this.add.image(4 * (this.canvasGame.width * 1.063) + leftMargin, this.canvasGame.height / 2, "josh").setOrigin(0.5, 1);

        for (let k = 0; k < colors.length; k++){
            this.itemGroup.add(gordon_image);
            this.itemGroup.add(suhee_image);
            this.itemGroup.add(may_image);
            this.itemGroup.add(linh_image);
            this.itemGroup.add(josh_image);


            this.pageSelectors[k] = this.add.sprite(this.canvasGame.width / 2 + (k - Math.floor(colors.length / 2) + 0.5 * (1 - colors.length % 2)) * 40, this.canvasGame.height - 40, "levelpages");
            this.pageSelectors[k].setInteractive();
            this.pageSelectors[k].on("pointerdown", function(){
                if (this.scene.canMove){
                    let difference = this.pageIndex - this.scene.currentPage;
                    this.scene.changePage(difference);
                    this.scene.canMove = false;
                }
            });

            this.pageSelectors[k].pageIndex = k;
            if (k === this.currentPage){
                this.pageSelectors[k].scaleY = 1;

            }
            else {
                this.pageSelectors[k].scaleY = 0.5;
            }
        }

        this.input.on("dragstart", function(pointer, gameObject){
            gameObject.startPosition = gameObject.x;
            gameObject.currentPosition = gameObject.x;
        });

        this.input.on("drag", function(pointer, gameObject, dragX){
            if (dragX <= 10 && dragX >= -gameObject.width + game.config.width - 10){
                gameObject.x = dragX;
                let delta = gameObject.x - gameObject.currentPosition;
                gameObject.currentPosition = dragX;
                this.itemGroup.children.iterate(function(item){
                    item.x += delta;
                });
            }
        }, this);

        this.input.on("dragend", function(pointer, gameObject){
            this.canMove = false;
            let delta = gameObject.startPosition - gameObject.x;
            if (delta === 0){
                this.canMove = true;
            }
            if (delta > game.config.width / 8){
                this.changePage(1);
            }
            else {
                if(delta < -game.config.width / 8){
                    this.changePage(-1);
                }
                else {
                    this.changePage(0);
                }
            }
        }, this);

        let style = { fill: "#FFFFFF", fontSize: "6em", fontFamily: 'Abel'};
        this.exitbutton = this.add.text(100, 100, " X ", style);
        this.exitbutton.setInteractive();
        this.exitbutton.on("pointerdown", function() {
            this.scene.start("BootScene");
        }, this);
    }

    
    // handles how swipe looks, from moving one page to another
    changePage(page){
        // changes the size of the squares at the bottom of the page
        this.currentPage += page;
        for (let k = 0; k < colors.length; k++){
            if (k === this.currentPage){
                this.pageSelectors[k].scaleY = 1;
            }
            else{
                this.pageSelectors[k].scaleY = 0.5;
            }
        }

        let currentPosition = this.scrollingMap.x;
        this.tweens.add({
            targets: this.scrollingMap, // entire canvas
            x: this.currentPage * -game.config.width,
            duration: 300,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onUpdate: function(tween, target){
                let delta = target.x - currentPosition;
                currentPosition = target.x;
                this.itemGroup.children.iterate(function(item){
                    item.x += delta;
                });
            },
            onComplete: function(){
                this.canMove = true;
            }
        });
    }
}