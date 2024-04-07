const functions = require("../functions/functions"); // 引入自訂函式

module.exports = {
    name: 'voiceStateUpdate', // 事件名稱為 voiceStateUpdate
    /**
     * 執行 voiceStateUpdate 事件的函式
     * @param {VoiceState} oldState - 舊的語音狀態
     * @param {VoiceState} newState - 新的語音狀態
     */
    async execute(oldState, newState) {
        const oldChannel = oldState.channel; // 舊的語音頻道
        const newChannel = newState.channel; // 新的語音頻道

        if (oldChannel && !newChannel) { // 如果舊的頻道存在且新的頻道不存在（表示機器人從語音頻道離開）
            functions.consoleLog(`[Voice Disconnected]: 退出了語音室 ${oldChannel.name}`); // 記錄語音斷開的事件
        }
    },
};
