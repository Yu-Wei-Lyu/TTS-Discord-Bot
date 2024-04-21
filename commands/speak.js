// 引入 Discord.js Voice 模組和文字轉語音函式
const { getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const textToSpeech = require("../functions/tts");
const functions = require("../functions/functions");

module.exports = {
    /**
     * 執行聊天指令的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {

        // 取得語音連接
        const connection = getVoiceConnection(interaction.guild.id); 

        if (connection) { // 如果機器人在語音頻道中
            // 從指令中取得要轉換的文字內容、語言風格
            const text = interaction.options.getString("content"); 
            const language = functions.getJSON("data", "VoiceChatLanguage");

            try {
                // 創建音頻播放器，下載文字轉語音的音頻檔案
                const audioPlayer = createAudioPlayer(); 
                await textToSpeech.downloadTTS(text, language);

                // 取得音頻資源並撥放至語音室
                const audioResource = createAudioResource(textToSpeech.getAudioPath()); 
                audioPlayer.play(audioResource);
                connection.subscribe(audioPlayer);

                // 記錄機器人說話的內容、回覆使用者成功撥放音頻的資訊
                functions.consoleLog(`Bot 說出了: ${text}`); 
                await interaction.reply(`Bot 說出了: ${text}`);
            } catch (error) { // 取得或撥放音頻時發生錯誤
                functions.consoleLog(error);
                await interaction.reply("該文字無法正常撥放!");
            }
        } else { // 不在語音頻道中
            functions.consoleLog(`Bot 不在語音室內`); // 記錄機器人不在語音頻道中的訊息
            await interaction.reply("我不在語音室內呦..."); // 回覆訊息，表示機器人不在語音頻道中
        }
    }
};
