const { CronJob } = require('cron'); // 引入 CronJob 物件
const { BotPresence } = require("../data/config.json"); // 引入設定檔中的 BotPresence
const functions = require("../functions/functions.js"); // 引入自訂函式

module.exports = {
    name: "ready", // 事件名稱
    once: true, // 是否只執行一次
    /**
     * 執行機器人就緒事件的函式
     * @param {Client} client - Discord 機器人客戶端
     */
    execute(client) {
        functions.consoleLog(`Logged in as ${client.user.tag}!`); // 輸出機器人登入資訊
    },
};
