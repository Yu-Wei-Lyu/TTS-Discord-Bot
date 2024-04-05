const nconf = require("nconf");

module.exports = {
    getJSON(fileName, objectName) {
        nconf.use("file", { file: `./data/${fileName}.json` });
        nconf.load();
        return nconf.get(objectName);
    },
    updateJSON(fileName, field, obj) {
        nconf.use("file", { file: `./data/${fileName}.json` });
        nconf.load();
        nconf.clear(field);
        nconf.set(field, obj);
        if (fileName == "data" && field == "activities:data")
            nconf.set("activities:lastUpdated", this.getTimestamp());
        nconf.save();
    },
    getTimestamp() {
        let logTime = new Date();
        logTime.setUTCHours(logTime.getUTCHours() + 8);
        return JSON.stringify(logTime).substring(1,20).replaceAll('-','/').replace('T', ' ');
    },
    consoleLog(str) {
        console.log(`${this.getTimestamp()} ${str}`);
    }
};