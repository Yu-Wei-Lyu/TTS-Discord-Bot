// 引入 Discord.js Voice 模組中的 getVoiceConnection 函式
const { getVoiceConnection } = require('@discordjs/voice');
const functions = require("../functions/functions"); // 引入自訂函式

module.exports = {
    /**
     * 執行指令的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id); // 獲取語音連接
        if (connection) { // 如果機器人在語音頻道中
            connection.disconnect(); // 斷開語音連接
            functions.consoleLog(`被踢出語音室`); // 記錄被踢出語音頻道的訊息到控制台
            await interaction.reply(`掰掰～要找我就再次使用 /join 吧`); // 回覆被踢出語音頻道的訊息給互動者
        } else { // 如果機器人不在語音頻道中
            await interaction.reply("我不在語音室內呦..."); // 回覆機器人不在語音頻道中的訊息給互動者
        }
    },
};
