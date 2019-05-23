/* Handle game events and generate question bank from events.json */

let rawEvents;


// Async call to events.json - data is written onto the global variable rawEvent
function initializeEvents() {
    console.log("LOADING EVENTS");
    $.getJSON("./assets/json/events.json", function(json) {
        rawEvents = json;
        console.log("LOADED EVENTS SUCCESSFULLY!");
    });
}


// Get a random event from the question bank
function getRandomEvent() {
    let chosenIndex = getRandomInt(0, rawEvents.length);
    let chosenEvent = rawEvents[chosenIndex];
    rawEvents.splice(chosenIndex, 1);
    return chosenEvent;
}


// Modify the 4 status according to choice made in an event
function applyConsequence(consequence) {
    if (consequence["environment"]) {
        modifyEnvironment(consequence["environment"]);
    }
    if (consequence["society"]) {
        modifySociety(consequence["society"]);
    }
    if (consequence["economy"]) {
        modifyEconomy(consequence["economy"]);
    }
    if (consequence["resources"]) {
        modifyResources(consequence["resources"]);
    }
}


// Get random integer between the arguments min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}