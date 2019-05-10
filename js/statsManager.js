const minStat = 0;
const maxStat = 100;
const startStat = 50;
let stats = {environment: startStat, resources: startStat, economy: startStat, society: startStat};

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};


function modifyEnvironment(amount) {
    stats.environment = (stats.environment += amount).clamp(minStat, maxStat);
    gameInstance.updateIcons();
    if (!stats.environment) {
        gameInstance.triggerEndGame();
    }
}


function getEnvironment() {
    return stats.environment;
}


function modifyResources(amount) {
    stats.resources = (stats.resources += amount).clamp(minStat, maxStat);
    gameInstance.updateIcons();
    if (!stats.resources) {
        gameInstance.triggerEndGame();
    }
}


function getResources() {
    return stats.resources;
}


function modifyEconomy(amount) {
    stats.economy = (stats.economy += amount).clamp(minStat, maxStat);
    gameInstance.updateIcons();
    if (!stats.economy) {
        gameInstance.triggerEndGame();
    }
}


function getEconomy() {
    return stats.economy;
}


function modifySociety(amount) {
    stats.society = (stats.society += amount).clamp(minStat, maxStat);
    gameInstance.updateIcons();
    if (!stats.society) {
        gameInstance.triggerEndGame();
    }
}


function getSociety() {
    return stats.society;
}


function getAverage(){
    console.log(getEnvironment());
    console.log(getSociety());
    console.log(getEconomy());
    console.log(getResources());
    console.log(getEconomy() + getResources() + getSociety() + getEnvironment());
    return getEconomy() + getResources() + getSociety() + getEnvironment()
}