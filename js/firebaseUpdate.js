function getPlayerNum() {
    var playerRoot = firebase.database().ref().child("players/");
    var count = 0;
    playerRoot.once('value').then((snapshot) => {
        list = snapshot.val();
        console.log(list);
        for (x in list) {
            count += 1;
        }
        addToFireBase(count);
    });
}


let addToFireBase = function (getPlayerNum) {
    let playerId = getPlayerNum + 1;
    console.log("playerid:" + playerId);
    const scoreRoot = firebase.database().ref().child('players/' + playerId + '/score');
    const profileRoot = firebase.database().ref().child('players/' + playerId + '/profile');

    var scoreObj = {};
    scoreObj.environment = getEnvironment();
    scoreObj.society = getResources();
    scoreObj.economy = getEconomy();
    scoreObj.resources = getResources();
    scoreObj.average = getAverage() / 4;
    scoreRoot.set(scoreObj);

    var profileObj = {};
    profileObj.name = firebase.auth().currentUser.displayName;
    profileObj.email = firebase.auth().currentUser.email;
    profileRoot.set(profileObj);

};