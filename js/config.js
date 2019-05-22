let config = {
    type: Phaser.AUTO,
    backgroundColor:"#FFFFFF",
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 0 },
            debug: false
        }},
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    mute: false,
    loop: true,
    scene: [BootScene, PlayGame, EndScene, PlayTutorial, AboutScene]
};

let firebaseConfig = {
    apiKey: "AIzaSyCwzFFjsxSXox7P-Am3-Ex_h_P2tcrlnI8",
    authDomain: "earthstory-aafb7.firebaseapp.com",
    databaseURL: "https://earthstory-aafb7.firebaseio.com",
    projectId: "earthstory-aafb7",
    storageBucket: "earthstory-aafb7.appspot.com",
    messagingSenderId: "264306899569",
    appId: "1:264306899569:web:b0d92f92d52cf3aa"
};

firebase.initializeApp(firebaseConfig);
let game = new Phaser.Game(config);



}