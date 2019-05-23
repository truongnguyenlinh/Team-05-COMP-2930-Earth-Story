/* Config for Phaser and Firebase */

// Window size config depending on user device
let userAgent = window.navigator.userAgent;
let height = "100%";
let width = "100%";
let center = Phaser.Scale.CENTER_BOTH;
if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    height = "99%";

}

// Phaser 3 config
let config = {
    type: Phaser.AUTO,
    backgroundColor:"#FFFFFF",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }},
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    canvasStyle: 'height:' + height + ';' + 'width:' + width + ';' + '; position: 0;',

    mute: false,
    loop: true,
    scene: [BootScene, PlayGame, EndScene, PlayTutorial, AboutScene]
};

// Firebase Config
let firebaseConfig = {
    apiKey: "AIzaSyCwzFFjsxSXox7P-Am3-Ex_h_P2tcrlnI8",
    authDomain: "earthstory-aafb7.firebaseapp.com",
    databaseURL: "https://earthstory-aafb7.firebaseio.com",
    projectId: "earthstory-aafb7",
    storageBucket: "earthstory-aafb7.appspot.com",
    messagingSenderId: "264306899569",
    appId: "1:264306899569:web:b0d92f92d52cf3aa"
};

firebase.initializeApp(firebaseConfig); // Initialize Firebase
let game = new Phaser.Game(config); // Initialize game
