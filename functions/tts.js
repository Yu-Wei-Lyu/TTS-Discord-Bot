const axios = require('axios'); // 引入 axios 模組處理 HTTP 請求
const fs = require('fs'); // 引入 fs 模組處理檔案操作
const path = require('path'); // 引入 path 模組處理路徑

module.exports = {
    /**
     * 下載 Google TTS 音檔
     * @param {string} text - 要轉換成音檔的文字
     */
    async downloadTTS(text) {
        // 定義儲存路徑和檔案名稱
        const outputPath = path.join(__dirname, '..', 'Audios', 'output.mp3'); 

        // 定義 Google TTS 的 URL
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=${encodeURIComponent(text)}`;

        try {
            // 發送 GET 請求獲取音檔
            const response = await axios.get(ttsUrl, { responseType: 'stream' });

            // 將音檔寫入到指定路徑的檔案中
            const writer = fs.createWriteStream(outputPath);
            response.data.pipe(writer);
            console.log('音檔下載完成！');
        } catch (error) {
            console.error('下載音檔時發生錯誤：', error);
        }
    },
    /**
     * 取得下載的音檔路徑
     * @returns {string} 音檔路徑
     */
    getAudioPath() {
        return path.join(__dirname, '..', 'Audios', 'output.mp3');
    }
};
