let config = {
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    type: Phaser.CANVAS,
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


var viewMode = getCookie("view-mode");
if(viewMode == "desktop"){
    console.log("desktop");
    viewport.setAttribute('content', 'width=1024');
}else if (viewMode == "mobile"){
    console.log("mobile");

    viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
}