// 引入 Discord.js 模組
const { joinVoiceChannel, VoiceChannel } = require('@discordjs/voice');

module.exports = {
    async cmdExecute(interaction) {
        const voiceChannel = interaction.member.voice.channel; // 獲取使用者所在的語音頻道
        // console.log(voiceChannel);
        if (voiceChannel) {
            console.log(voiceChannel.id);
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            }); // 加入語音頻道
            // console.log(`Bot joined voice channel: ${voiceChannel.name}`);
            await interaction.reply(`喔耶! 我加入了 ${voiceChannel.name} 語音室`);
        } else {
            await interaction.reply(`你不在任何語音室喔`);
        }
    },
};