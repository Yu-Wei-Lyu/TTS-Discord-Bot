const { EmbedBuilder } = require('discord.js');
const functions = require("../functions/functions.js");
const helpEmbed = functions.getJSON("config", "helpEmbed");

module.exports = {
    async cmdExecute(interaction) {
        functions.consoleLog(`[Command Detected] "help" by user: ${interaction.user.username}`);
        functions.consoleLog(`[Command Execute] Show help embed`);
        await interaction.reply(helpEmbed);
    },
};