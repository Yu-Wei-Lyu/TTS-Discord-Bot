const { commands } = require("../data/commands.json"); // 引入命令資料
const functions = require("../functions/functions.js"); // 引入自訂函式

module.exports = {
    name: "interactionCreate", // 事件名稱
    once: false, // 是否只執行一次
    /**
     * 執行互動創建事件的函式
     * @param {Interaction} interaction - 互動物件
     */
    async execute(interaction) {
        if (interaction.isChatInputCommand()) { // 如果互動為聊天指令
            commands.forEach(command => { // 迴圈處理每個命令
                if (interaction.commandName === command.name) { // 如果互動的指令名稱與命令名稱相符
                    functions.consoleLog(`[Command Detected] "${interaction.commandName}" by user: ${interaction.user.username}`); // 記錄指令偵測
                    require(`../commands/${command.name}.js`).cmdExecute(interaction); // 呼叫指令的執行函式
                }
            });
        } else if (interaction.isModalSubmit()) { // 如果互動為模態提交
            require(`../commands/${interaction.customId}.js`).modalSubmit(interaction); // 呼叫模態提交處理函式
        } else if (interaction.isButton()) { // 如果互動為按鈕
            require(`../commands/${interaction.customId}.js`).buttonClick(interaction); // 呼叫按鈕點擊處理函式
        } else { // 如果互動不符合以上任何類型
            return; // 結束函式
        }
    },
};
