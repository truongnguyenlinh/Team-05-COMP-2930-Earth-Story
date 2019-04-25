// $.getJSON("./asset/json/events.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

let rawEvents = [
    {
        "question": "question 1?",
        "choice1": "choice 1-1",
        "choice2": "choice 1-2",
        "economy": 1,
        "society": 1,
        "environment": 1,
        "resources": 1
    },
    {
        "question": "question 2?",
        "choice1": "choice 2-1",
        "choice2": "choice 2-2",
        "economy": -1,
        "society": -1,
        "environment": -1,
        "resources": -1
    }
];

function playRandomEvent() {
    let event = rawEvents[getRandomInt(0, rawEvents.length)];

    document.getElementById("question").innerHTML = event.question;
    let btn1 = document.getElementById("choice1");
    let btn2 = document.getElementById("choice2");

    btn1.innerHTML = event.choice1;
    btn2.innerHTML = event.choice2;
    btn1.onclick = function() {
        playConsequence(event);
        playRandomEvent();
    };
    btn2.onclick = function() {
        playConsequence(event);
        playRandomEvent();
    };
}

function playConsequence(event) {
    modifyEconomy(event.economy);
    modifyEnvironment(event.environment);
    modifyResources(event.resources);
    modifySociety(event.society);
    updateStatsVisually();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
