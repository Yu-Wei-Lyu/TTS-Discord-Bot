const { ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder } = require('discord.js');
const functions = require("../functions/functions");

module.exports = {
    /**
     * 執行切換語音風格的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {
        const languageOptions = functions.getJSON("data", "LanguageOptions");
        const languageActionRow = new ActionRowBuilder();
        for (var languageCode in languageOptions) {
            languageActionRow.addComponents(
                new ButtonBuilder()
                    .setCustomId(`lang/${languageCode}`)
                    .setLabel(languageOptions[languageCode])
                    .setStyle(ButtonStyle.Primary)
            )
        }
        await interaction.reply({
            content: `選擇要切換的語音風格`,
            components: [languageActionRow]
        });
    },

    /**
     * 執行切換語音按鈕觸發的函式
     * @param {Interaction} interaction - 互動物件
     * @param {string} languageCode - 互動物件
     */
    async buttonClick(interaction, languageCode) {
        if (languageCode == "" || languageCode == undefined || languageCode == null) {
            functions.consoleLog("lang 按鈕的 ID 未定義");
            await interaction.reply("Oops! 我好像吃到 bug 了，尋找我的監護人解決問題吧...");
        } else {
            const languageLabel = functions.getJSON("data", "LanguageOptions")[languageCode];
            functions.updateJSON("data", "VoiceChatLanguage", languageCode);
            functions.consoleLog(`已更新語音的語言為 ${languageLabel}`);
            await interaction.reply(`已更新語音的語言為 ${languageLabel}`);
        }
    }
};
