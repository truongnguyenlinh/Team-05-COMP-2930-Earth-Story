function addPlayer() {
    const playerRoot = firebase.database().ref().child("players/");
    var count = 0;
    playerRoot.once('value').then((snapshot) => {
        list = snapshot.val();
        console.log(list);
        for (x in list) {
            count += 1;
        }
    }).then(function(){
        saveData(count);
    });
}


function saveData(numOfPlayers){
    let playerId = numOfPlayers + 1;
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
}



// function getLeader(){
//     const playerRoot = firebase.database().ref().child("players/");
//     playerRoot.once('value').then((snapshot) => {
//         list = snapshot.val();
//         let leaders = [];
//         for (x in list){
//             playersInfo = [];
//             playersInfo.push(list[x]['profile']['name']);
//             playersInfo.push(list[x]['score']['average']);
//             leaders.push(playersInfo)
//         }
//         leaders.sort(function(a, b) { return b[1] - a[1]});
//         return leaders;
//     });
// }

// function showLeaders(leaderArr){




