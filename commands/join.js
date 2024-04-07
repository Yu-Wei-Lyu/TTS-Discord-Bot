// 引入 Discord.js Voice 模組中的 joinVoiceChannel 函式
const { joinVoiceChannel } = require('@discordjs/voice');
const functions = require("../functions/functions.js"); // 引入自訂函式

module.exports = {
    /**
     * 執行指令的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {
        const voiceChannel = interaction.member.voice.channel; // 獲取使用者所在的語音頻道
        if (voiceChannel) { // 如果使用者在語音頻道中
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id, // 語音頻道的 ID
                guildId: interaction.guildId, // 伺服器的 ID
                adapterCreator: interaction.guild.voiceAdapterCreator, // 語音適配器的創建者
            }); 
            functions.consoleLog(`加入語音室 ${voiceChannel.name} `); // 記錄加入語音頻道的訊息到控制台
            await interaction.reply(`喔耶! 我加入了 ${voiceChannel.name} 語音室`); // 回覆加入語音頻道成功的訊息
        } else { // 如果使用者不在語音頻道中
            functions.consoleLog(`不在任何語音室`); // 記錄不在任何語音頻道的訊息到控制台
            await interaction.reply(`你不在任何語音室喔`); // 回覆使用者不在語音頻道的訊息
        }
    },
};
