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


function parseUA() {
    var u = navigator.userAgent;
    var u2 = navigator.userAgent.toLowerCase();
    return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') == -1,
        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
        weixin: u2.match(/MicroMessenger/i) == "micromessenger",
        ali: u.indexOf('AliApp') > -1,
    };
}
var ua = parseUA();

if (ua.mobile) {
    location.href = './pc.html';
}