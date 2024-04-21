const { ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder } = require('discord.js');
const functions = require("../functions/functions");

module.exports = {
    /**
     * 執行切換語音風格的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {
        // 初始化放置按鈕的 Action row
        const languageActionRow = new ActionRowBuilder();

        // 取得語言選項資訊
        const languageOptions = functions.getJSON("data", "LanguageOptions");
        for (var languageCode in languageOptions) {
            // 逐一將語言選項初始化為按鈕
            languageActionRow.addComponents(
                new ButtonBuilder()
                    .setCustomId(`lang/${languageCode}`)
                    .setLabel(languageOptions[languageCode].Description)
                    .setStyle(ButtonStyle.Primary)
            )
        }

        // 提供給使用者語言切換的選項
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
        // 如果 languageCode 未定義或不存在 不進行切換雨具
        if (languageCode == "" || languageCode == undefined || languageCode == null) {
            functions.consoleLog("lang 按鈕的 ID 未定義");
            await interaction.reply("Oops! 我好像吃到 bug 了，尋找我的監護人解決問題吧...");
        } else { // languageCode 存在 更新語音的語言
            const languageLabel = functions.getJSON("data", "LanguageOptions")[languageCode].Description;
            functions.updateJSON("data", "VoiceChatLanguage", languageCode);
            functions.consoleLog(`已更新語音的語言為 ${languageLabel}`);
            await interaction.reply(`已更新語音的語言為 ${languageLabel}`);
        }
    }
};
