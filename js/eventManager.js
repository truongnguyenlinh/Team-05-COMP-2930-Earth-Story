// $.getJSON("./asset/json/events.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

let rawEvents = [
    {
        "question": "Eat beef?",
        "choice1": "Yum",
        "choice2": "Eh",
        "economy1": 0,
        "society1": 15,
        "environment1": -15,
        "resources1": -5,
        "economy2": -5,
        "society2": 0,
        "environment2": 15,
        "resources2": 0
    },
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
        swipeRight(event);
    };
    btn2.onclick = function() {
        swipeLeft(event);
    };
    btn1.onmouseover = function() {
        hoverRight(event);
    };
    btn2.onmouseover = function() {
        hoverLeft(event);
    };
    btn1.onmouseout = function() {
        resetChangeIndicators();
    };
    btn2.onmouseout = function() {
        resetChangeIndicators();
    };
}

function hoverRight(event) {
    resetChangeIndicators();
    if (event.environment1 > 0) {
        document.getElementById("environmentChange").innerHTML = "↑";
    }
    else if (event.environment1 < 0) {
        document.getElementById("environmentChange").innerHTML = "↓";
    }
    if (event.resources1 > 0) {
        document.getElementById("resourcesChange").innerHTML = "↑";
    }
    else if (event.resources1 < 0) {
        document.getElementById("resourcesChange").innerHTML = "↓";
    }
    if (event.economy1 > 0) {
        document.getElementById("economyChange").innerHTML = "↑";
    }
    else if (event.economy1 < 0) {
        document.getElementById("economyChange").innerHTML = "↓";
    }
    if (event.society1 > 0) {
        document.getElementById("societyChange").innerHTML = "↑";
    }
    else if (event.society1 < 0) {
        document.getElementById("societyChange").innerHTML = "↓";
    }
}

function hoverLeft(event) {
    resetChangeIndicators();
    if (event.environment2 > 0) {
        document.getElementById("environmentChange").innerHTML = "↑";
    }
    else if (event.environment2 < 0) {
        document.getElementById("environmentChange").innerHTML = "↓";
    }
    if (event.resources2 > 0) {
        document.getElementById("resourcesChange").innerHTML = "↑";
    }
    else if (event.resources2 < 0) {
        document.getElementById("resourcesChange").innerHTML = "↓";
    }
    if (event.economy2 > 0) {
        document.getElementById("economyChange").innerHTML = "↑";
    }
    else if (event.economy2 < 0) {
        document.getElementById("economyChange").innerHTML = "↓";
    }
    if (event.society2 > 0) {
        document.getElementById("societyChange").innerHTML = "↑";
    }
    else if (event.society2 < 0) {
        document.getElementById("societyChange").innerHTML = "↓";
    }
}

function resetChangeIndicators() {
    document.getElementById("environmentChange").innerHTML = "_";
    document.getElementById("resourcesChange").innerHTML = "_";
    document.getElementById("economyChange").innerHTML = "_";
    document.getElementById("societyChange").innerHTML = "_";
}

function swipeRight(event) {
    playConsequence1(event);
    updateStatsVisually();
    playRandomEvent();
    resetChangeIndicators();
}

function swipeLeft(event) {
    playConsequence2(event);
    updateStatsVisually();
    playRandomEvent();
    resetChangeIndicators();
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
