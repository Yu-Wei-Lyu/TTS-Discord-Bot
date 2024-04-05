const { commands } = require("../data/commands.json");
const functions = require("../functions/functions.js")

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            commands.forEach(command => {
                if (interaction.commandName === command.name) {
                    functions.consoleLog(`[Command Detected] "${interaction.commandName}" by user: ${interaction.user.username}`);
                    require(`../commands/${command.name}.js`).cmdExecute(interaction);
                }
            });
        } else if (interaction.isModalSubmit()) {
            require(`../commands/${interaction.customId}.js`).modalSubmit(interaction);
        } else if (interaction.isButton()) {
            require(`../commands/${interaction.customId}.js`).buttonClick(interaction);
        } else {
            return;
        }
    },
};