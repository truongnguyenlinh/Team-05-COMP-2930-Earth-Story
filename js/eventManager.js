let rawEvents;


// Async call to events.json. Data is written onto the global variable rawEvent.
function initializeEvents() {
    console.log("LOADING EVENTS");
    $.getJSON("./assets/json/events.json", function(json) {
        rawEvents = json;
        console.log("LOADED EVENTS SUCCESSFULLY!");
    });
}


function getRandomEvent() {
    let chosenIndex = getRandomInt(0, rawEvents.length);
    let chosenEvent = rawEvents[chosenIndex];
    rawEvents.splice(chosenIndex, 1);
    return chosenEvent;
}


function applyConsequence(consequence) {
    modifyEnvironment(consequence["environment"]);
    modifySociety(consequence["society"]);
    modifyEconomy(consequence["economy"]);
    modifyResources(consequence["resources"]);
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}