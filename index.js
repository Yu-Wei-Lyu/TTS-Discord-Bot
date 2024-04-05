// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { botID, token } = require('./token.json');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent
    ]
});

const functions = require("./functions/functions.js")
// 註冊斜線指令 deploy.js
const { REST, Routes } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(token);
const { commands } = require('./data/commands.json');
(async() => {
    try {
        functions.consoleLog('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(botID), { body: commands });
        functions.consoleLog('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const fs = require('fs');
// 讀取事件觸發
const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Log in to Discord with your client's token
client.login(token);