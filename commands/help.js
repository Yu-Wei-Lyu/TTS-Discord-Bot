const functions = require("../functions/functions.js"); // 引入自訂函式
const helpEmbed = functions.getJSON("config", "helpEmbed"); // 從配置檔中取得幫助嵌入訊息

module.exports = {
    /**
     * 執行 help 指令的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {
        functions.consoleLog(`[Command Detected] "help" by user: ${interaction.user.username}`); // 記錄指令偵測到控制台
        functions.consoleLog(`[Command Execute] Show help embed`); // 記錄指令執行到控制台
        await interaction.reply(helpEmbed); // 回覆幫助嵌入訊息
    },
};
