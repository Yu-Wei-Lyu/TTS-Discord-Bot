const { Client, Events, GatewayIntentBits } = require('discord.js'); // 引入 Discord.js 模組
const { botID, token } = require('./token.json'); // 引入機器人 ID 和令牌

// 初始化 Discord 客戶端
const client = new Client({
    intents: [
        // 設置客戶端的 Gateway 權限位
        GatewayIntentBits.Guilds, // 伺服器
        GatewayIntentBits.GuildMessages, // 伺服器訊息
        GatewayIntentBits.GuildMessageTyping, // 伺服器訊息打字
        GatewayIntentBits.DirectMessages, // 私人訊息
        GatewayIntentBits.DirectMessageTyping, // 私人訊息打字
        GatewayIntentBits.MessageContent, // 訊息內容
        GatewayIntentBits.GuildVoiceStates // 伺服器語音狀態
    ]
});

const functions = require("./functions/functions.js"); // 引入自訂函式
const { REST, Routes } = require('discord.js'); // 引入 Discord.js 中的 REST API
const rest = new REST({ version: '10' }).setToken(token); // 設置 REST API 版本和令牌
const { commands } = require('./data/commands.json'); // 引入應用程式指令資料

// 更新應用程式指令
(async() => {
    try {
        functions.consoleLog('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(botID), { body: commands }); // 透過 REST API 更新指令
        functions.consoleLog('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const fs = require('fs'); // 引入檔案系統模組
const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js")); // 讀取事件檔案
for (const file of eventFiles) {
    const event = require(`./events/${file}`); // 引入每個事件的處理程式
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args)); // 如果是一次性事件，使用 client.once 註冊事件
    } else {
        client.on(event.name, (...args) => event.execute(...args)); // 否則使用 client.on 註冊事件
    }
}

client.login(token); // 登入到 Discord 伺服器
