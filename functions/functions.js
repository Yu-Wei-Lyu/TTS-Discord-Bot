const nconf = require("nconf"); // 引入 nconf 模組

module.exports = {
    /**
     * 從指定的 JSON 檔案中取得指定物件
     * @param {string} fileName - JSON 檔案名稱
     * @param {string} objectName - 要取得的物件名稱
     * @returns {any} 指定的物件
     */
    getJSON(fileName, objectName) {
        nconf.use("file", { file: `./data/${fileName}.json` }); // 設定要使用的 JSON 檔案路徑
        nconf.load(); // 載入 JSON 檔案內容
        return nconf.get(objectName); // 回傳指定的物件
    },
    
    /**
     * 更新指定 JSON 檔案中的指定欄位內容
     * @param {string} fileName - JSON 檔案名稱
     * @param {string} field - 欄位名稱
     * @param {any} obj - 要設定的新值
     */
    updateJSON(fileName, field, obj) {
        nconf.use("file", { file: `./data/${fileName}.json` }); // 設定要使用的 JSON 檔案路徑
        nconf.load(); // 載入 JSON 檔案內容
        nconf.clear(field); // 清除指定欄位的內容
        nconf.set(field, obj); // 設定指定欄位的新值
        if (fileName == "data" && field == "activities:data") // 如果更新的是特定欄位
            nconf.set("activities:lastUpdated", this.getTimestamp()); // 更新最後更新時間
        nconf.save(); // 儲存更新後的 JSON 檔案
    },
    
    /**
     * 取得格式化的時間戳記
     * @returns {string} 格式化後的時間戳記
     */
    getTimestamp() {
        let logTime = new Date(); // 取得當前時間
        logTime.setUTCHours(logTime.getUTCHours() + 8); // 調整時區
        return JSON.stringify(logTime).substring(1, 20).replaceAll('-', '/').replace('T', ' '); // 格式化時間字串
    },
    
    /**
     * 輸出格式化的日誌訊息
     * @param {string} str - 要輸出的訊息
     */
    consoleLog(str) {
        console.log(`${this.getTimestamp()} ${str}`); // 輸出時間戳記和訊息
    }
};
