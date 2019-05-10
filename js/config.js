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
    scene: [BootScene, playGame, EndScene]
};
let game = new Phaser.Game(config);