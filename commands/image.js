const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const functions = require("../functions/functions.js"); // 引入自訂函式

module.exports = {
    /**
     * 執行聊天指令的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {
        const imageDatas = functions.getJSON("data", "ImageData");

        const imageOptions = imageDatas.map(image => 
            new StringSelectMenuOptionBuilder()                    
                .setLabel(image.Label)
                .setDescription(image.Description)
                .setValue(image.Label));

        const select = new StringSelectMenuBuilder()
            .setCustomId('image')
            .setPlaceholder('選擇要發送的圖片或GIF')
            .addOptions(imageOptions);

        const row = new ActionRowBuilder()
            .addComponents(select);

        await interaction.reply({
            content: '選擇要發送的圖片或GIF',
            components: [row],
        });
    },
    /**
     * 選擇圖片後的回應行為的函式
     */
    async menuSelect(interaction) {
        const selectedImage = interaction.values[0];
        console.log("selectedImage", selectedImage);
        const imageDataResponse = functions.getJSON("data", "ImageData").find(image => image.Label == selectedImage);
        await interaction.reply(imageDataResponse.Source);
    }
};
