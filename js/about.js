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
            text: 'Loading...', style: {
                fill: "#FFFFFF",
                fontSize: "5em",
                fontFamily: 'Abel',
        }});
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
        this.load.image("quit", "./assets/images/button/quit_button.png");

    }


    create(){
        this.container = [];
        this.container[0] = 0;
        this.canMove = true;
        this.itemGroup = this.add.group();

        this.scrollingMap = this.add.tileSprite(0, 0, colors.length * this.canvasGame.width, this.canvasGame.height, "transp");
        this.scrollingMap.setInteractive();
        this.input.setDraggable(this.scrollingMap);
        this.scrollingMap.setOrigin(0, 0);
        this.currentPage = 0;
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
            text: "Aka the leng jai, is the genius behind the nyan cat. " +
                "He loves everything about cats. His favourite shirt is the " +
                "'if I fit, I sit' cat shirt. He believes that the world would " +
                "be a better place if it is ruled by cats.\n\n" +
                "His love of cats continuously pushes him to do more about creating a better earth for cats. " +
                "As an environmental scientist, he is also really upset about fish chewing on plastic in the sea.",
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
            text: "Aka the magnae, is a professional graphic designer." +
                " She did all the beautiful artwork of the app. " +
                "Her photoshop skills bring a lot of fun, fun, fun to the group. \n\n" +
                "She loves getting starbucks coffee and she asks for a straw every time. " +
                "One day, she had an epiphany that she has to stop " +
                "and start protecting the environment.",
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
            text: "Aka the entertainer, makes sure the daily pose picture is up to standard. She also makes sure everyone has lunch so they all have strength to work cause coding takes LOTS OF ENERGY.\n\n" +
                "Working at a restaurant made her realize how wasteful human beings are. Time to teach people a lesson!",
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
            text: "Aka the dep, is the fashion icon and game expert. " +
                "Her years of experience in the gaming industry is a great asset to the project. " +
                "She spends a lot of time doing her research even when she is not working with the team.\n\n" +
                "As a vegetarian, she hopes to tell people the consequences of eating animal.",
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
            text: "Aka the oppa, wants to be jacked. " +
                "He has a poster of his head attached to Arnold's body in his room. " +
                "That's his life goal. He would love to share the poster. Just ask!\n\n" +
                "His friends at the gym always take hot baths after working out. " +
                "Josh feels like it's time to let his friends know taking hot bath is a No No to the planet!",
            style: bioStyle
        });
        joshBio.setOrigin(0.5, 0);

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

        this.exitbutton = this.add.image(this.canvasGame.width * 0.9, this.canvasGame.height * 0.07, 'quit');
        this.exitbutton.setInteractive().setScale(0.3);
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