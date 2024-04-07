// 引入 Discord.js Voice 模組和文字轉語音函式
const { getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const textToSpeech = require("../functions/tts");
const functions = require("../functions/functions");

module.exports = {
    /**
     * 執行聊天指令的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {
        const text = interaction.options.getString("content"); // 從指令中取得要轉換的文字內容
        const connection = getVoiceConnection(interaction.guild.id); // 取得語音連接
        if (connection) { // 如果機器人在語音頻道中
            const audioPlayer = createAudioPlayer(); // 創建音頻播放器
            const audioPath = textToSpeech.getAudioPath(); // 取得文字轉語音的音頻檔案路徑
            try {
                await textToSpeech.downloadTTS(text); // 下載文字轉語音的音頻檔案
                const audioResource = createAudioResource(audioPath); // 創建音頻資源
                audioPlayer.play(audioResource); // 播放音頻
                connection.subscribe(audioPlayer); // 將播放器訂閱到連接中
                functions.consoleLog(`Bot 說出了: ${text}`); // 記錄機器人說話的內容
                await interaction.reply(`Bot 說出了: ${text}`); // 回覆訊息，表示機器人說話成功
            } catch(error) {
                functions.consoleLog(error); // 記錄錯誤訊息
                await interaction.reply("該文字無法正常撥放!"); // 回覆訊息，表示文字轉語音失敗
            }
        } else {
            functions.consoleLog(`Bot 不在語音室內`); // 記錄機器人不在語音頻道中的訊息
            await interaction.reply("我不在語音室內呦..."); // 回覆訊息，表示機器人不在語音頻道中
        }
    },
};
