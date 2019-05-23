// Update firebase with user's information from authentication and user's score
function addPlayer(numOfPlayers){
    let playerId = numOfPlayers + 1;
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





