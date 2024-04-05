const { CronJob } = require('cron');
const { BotPresence } = require("../data/config.json");
const functions = require("../functions/functions.js");

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        functions.consoleLog(`Logged in as ${client.user.tag}!`);
        const uploadPresence = new CronJob('0 */30 * * * *', function () {
            client.user.setPresence(BotPresence);
        }, null, true, "Asia/Taipei");
    },
};