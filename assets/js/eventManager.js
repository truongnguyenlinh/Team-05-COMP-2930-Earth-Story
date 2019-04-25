// $.getJSON("./asset/json/events.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

let rawEvents = [
    {
        "question": "Ban straws?",
        "choice1": "Yeah Boi",
        "choice2": "Nah Fam",
        "economy1": -5,
        "society1": 0,
        "environment1": 5,
        "resources1": 0,
        "economy2": 10,
        "society2": 0,
        "environment2": -5,
        "resources2": 0
    },
    {
        "question": "Build solar panels?",
        "choice1": "Do it",
        "choice2": "Pass",
        "economy1": 0,
        "society1": 5,
        "environment1": 10,
        "resources1": -5,
        "economy2": 5,
        "society2": 0,
        "environment2": -5,
        "resources2": 0
    }];

function playRandomEvent() {
    let event = rawEvents[getRandomInt(0, rawEvents.length)];

    document.getElementById("question").innerHTML = event.question;
    let btn1 = document.getElementById("choice1");
    let btn2 = document.getElementById("choice2");

    btn1.innerHTML = event.choice1;
    btn2.innerHTML = event.choice2;
    btn1.onclick = function() {
        playConsequence1(event);
        playRandomEvent();
    };
    btn2.onclick = function() {
        playConsequence2(event);
        updateStatsVisually();
        playRandomEvent();
    };
}

function playConsequence1(event) {
    modifyEconomy(event.economy1);
    modifyEnvironment(event.environment1);
    modifyResources(event.resources1);
    modifySociety(event.society1);
}

function playConsequence2(event) {
    modifyEconomy(event.economy2);
    modifyEnvironment(event.environment2);
    modifyResources(event.resources2);
    modifySociety(event.society2);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
