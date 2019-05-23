/* Handle the four game status (env, soc, eco, res) */

const minStat = 0;
const maxStat = 100;
const startStat = 50;
let stats = {environment: startStat, resources: startStat, economy: startStat, society: startStat};

// Add integer clamp functionality
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};


// Change the environment stat by the given amount (positive or negative)
function modifyEnvironment(amount) {
    stats.environment = (stats.environment += amount).clamp(minStat, maxStat);  // Modify the status within min and max
    gameInstance.updateIcons();                                                 // Update the status visually
    if (!stats.environment) {                                                   // End game if 0
        gameInstance.triggerEndGame();
    }
    gameInstance.flashStatus(gameInstance.envMask);
}


// Return the environment stat
function getEnvironment() {
    return stats.environment;
}


// Change the environment stat by the given amount (positive or negative)
function modifyResources(amount) {
    stats.resources = (stats.resources += amount).clamp(minStat, maxStat);
    gameInstance.updateIcons();
    if (!stats.resources) {
        gameInstance.triggerEndGame();
    }
    gameInstance.flashStatus(gameInstance.resMask);
}


// Return the environment stat
function getResources() {
    return stats.resources;
}


// Change the environment stat by the given amount (positive or negative)
function modifyEconomy(amount) {
    stats.economy = (stats.economy += amount).clamp(minStat, maxStat);
    gameInstance.updateIcons();
    if (!stats.economy) {
        gameInstance.triggerEndGame();
    }
    gameInstance.flashStatus(gameInstance.ecoMask);
}


// Return the environment stat
function getEconomy() {
    return stats.economy;
}


// Change the environment stat by the given amount (positive or negative)
function modifySociety(amount) {
    stats.society = (stats.society += amount).clamp(minStat, maxStat);
    gameInstance.updateIcons();
    if (!stats.society) {
        gameInstance.triggerEndGame();
    }
    gameInstance.flashStatus(gameInstance.socMask);
}


// Return the environment stat
function getSociety() {
    return stats.society;
}


// Return the sum of all status stats
function getAverage(){
    return getEconomy() + getResources() + getSociety() + getEnvironment();
}


// Rest all status stats
function restartStat(){
    stats.environment = startStat;
    stats.resources = startStat;
    stats.society = startStat;
    stats.economy = startStat;
}