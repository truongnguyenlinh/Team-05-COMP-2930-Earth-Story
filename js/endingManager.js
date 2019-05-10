let rawEndings;


// Async call to endings.json. Data is written onto the global variable rawEnding.
function initializeEndings() {
    console.log("LOADING ENDINGS");
    $.getJSON("./assets/json/endings.json", function(json) {
        rawEndings = json;
        console.log("LOADED ENDINGS SUCCESSFULLY!");
    });
}


function getGoodEnding() {
    return rawEndings["ending good"];
}


function getBadEnding() {
    return rawEndings["ending bad"];
}


function getEndingBack() {
    return rawEndings["ending back"];
}