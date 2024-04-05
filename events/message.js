const functions = require("../functions/functions.js")

module.exports = {
    name: "messageCreate",
    once: false,
    execute(message) {
        if (message.author.bot) return;
        
        const message_content = message.content.trim();
        let reactData = functions.getJSON("data", "chat_react");
        reactData.forEach((data) => {
            if (message_content === data.name) {
                message.delete();
                message.channel.send(data.react);
                functions.consoleLog(`[Message React] "${data.name}" by user: ${message.author.username}`);
            }
        });
    },
};