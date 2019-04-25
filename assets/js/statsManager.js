const minStat = 0;
const maxStat = 100;
const startStat = 50;
let stats = {environment: startStat, resources: startStat, economy: startStat, society: startStat};

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

function modifyEnvironment(amount) {
    stats.environment = (stats.environment += amount).clamp(minStat, maxStat);
}

function getEnvironment() {
    return stats.environment;
}

function modifyResources(amount) {
    stats.resources = (stats.resources += amount).clamp(minStat, maxStat);
}

function getResources() {
    return stats.resources;
}

function modifyEconomy(amount) {
    stats.economy = (stats.economy += amount).clamp(minStat, maxStat);
}

function getEconomy() {
    return stats.economy;
}

function modifySociety(amount) {
    stats.society = (stats.society += amount).clamp(minStat, maxStat);
}

function getSociety() {
    return stats.society;
}

function updateStatsVisually() {
    document.getElementById("environment").innerHTML = "ENV: " + stats.environment;
    document.getElementById("resources").innerHTML = "RSC: " + stats.resources;
    document.getElementById("economy").innerHTML = "ECO: " + stats.economy;
    document.getElementById("society").innerHTML = "SOC: " + stats.society;
}