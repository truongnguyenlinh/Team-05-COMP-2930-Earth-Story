function addPlayer(numOfPlayers){
    let playerId = numOfPlayers + 1;
    console.log("playerid:" + playerId);
    const scoreRoot = firebase.database().ref().child('players/' + playerId + '/score');
    const profileRoot = firebase.database().ref().child('players/' + playerId + '/profile');

    var scoreObj = {};
    scoreObj.environment = getEnvironment();
    scoreObj.society = getResources();
    scoreObj.economy = getEconomy();
    scoreObj.resources = getResources();
    scoreObj.average = Math.round(getAverage() / 4);
    scoreRoot.set(scoreObj);

    var profileObj = {};
    profileObj.name = firebase.auth().currentUser.displayName;
    profileObj.email = firebase.auth().currentUser.email;
    profileRoot.set(profileObj);
}





