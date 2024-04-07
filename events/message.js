const functions = require("../functions/functions.js"); // 引入自訂函式

module.exports = {
    name: "messageCreate", // 事件名稱
    once: false, // 是否只執行一次
    /**
     * 執行訊息創建事件的函式，接受訊息物件作為參數
     * @param {Message} message - 訊息物件
     */
    execute(message) {
        if (message.author.bot) return; // 如果訊息的發送者是機器人，結束函式

        const message_content = message.content.trim(); // 取得訊息內容並去除首尾空白
        let reactData = functions.getJSON("data", "chat_react"); // 從JSON檔案中獲取聊天回應資料
        reactData.forEach((data) => { // 迴圈處理每筆聊天回應資料
            if (message_content === data.name) { // 如果訊息內容與資料名稱相符
                message.delete(); // 刪除原始訊息
                message.channel.send(data.react); // 傳送聊天回應
                functions.consoleLog(`[Message React] "${data.name}" by user: ${message.author.username}`); // 使用自訂函式記錄訊息回應
            }
        });
    },
};
