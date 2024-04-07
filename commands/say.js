const functions = require("../functions/functions.js"); // 引入自訂函式

module.exports = {
    /**
     * 執行聊天指令的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {
        interaction.deferReply({ ephemeral: true }); // 延遲回覆，僅對互動者可見
        interaction.deleteReply(); // 刪除原始回覆

        let input = interaction.options; // 取得指令選項
        let inputContent = input.getString('content'); // 取得指令中的文字內容
        functions.consoleLog(`[Say] ${inputContent}`); // 記錄訊息到控制台
        interaction.channel.send(inputContent); // 發送文字訊息到頻道
    },
};
