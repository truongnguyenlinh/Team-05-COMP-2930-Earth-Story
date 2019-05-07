let rawEvents;


// Async call to events.json. Data is written onto the global variable rawEvent, and the first random event is called.
function initializeEvents() {
    console.log("LOADING EVENTS");
    $.getJSON("./assets/json/events.json", function(json) {
        rawEvents = json;
        console.log("LOADED EVENTS SUCCESSFULLY!");
    });
}


function getRandomEvent() {
    return rawEvents[getRandomInt(0, rawEvents.length)];
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}