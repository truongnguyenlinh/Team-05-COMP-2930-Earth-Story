/* Handle game endings and generate ending messages from endings.json */

let rawEndings;


// Async call to endings.json - data is written onto the global variable rawEnding
function initializeEndings() {
    console.log("LOADING ENDINGS");
    $.getJSON("./assets/json/endings.json", function(json) {
        rawEndings = json;
        console.log("LOADED ENDINGS SUCCESSFULLY!");
    });
}


// Return good ending message and score
function getGoodEnding() {
    return "Score: " + Math.round(getAverage() / 4) + "\n" + rawEndings["ending good"];
}


// Return bad ending message and score
function getBadEnding() {
    return "Score: " + Math.round(getAverage() / 4) + "\n" + rawEndings["ending bad"];
}


// Return back of the card ending mesage
function getEndingBack() {
    return rawEndings["ending back"];
}