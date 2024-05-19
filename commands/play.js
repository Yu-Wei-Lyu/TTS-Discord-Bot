const { ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder, getUserAgentAppendix, Integration } = require('discord.js');
const functions = require("../functions/functions");
const tttGame = "Tic-Tac-Toe(井字遊戲)";
const tttButton = "tttButton_";

module.exports = {
    /**
     * 執行選擇小遊戲的函式
     * @param {Interaction} interaction - 互動物件
     */
    async cmdExecute(interaction) {
        // 初始化放置按鈕的 Action row
        const gameModeActionRow = new ActionRowBuilder();

        // 增加遊玩 Nonogram 小遊戲的按鈕
        gameModeActionRow.addComponents(
            new ButtonBuilder()
                .setCustomId(`play/${tttGame}`)
                .setLabel(tttGame)
                .setStyle(ButtonStyle.Secondary)
        )

        // 提供給使用者選擇小遊戲的選項
        await interaction.reply({
            content: `你想要玩什麼遊戲呢？`,
            components: [gameModeActionRow],
            ephemeral: true
        });
    },

    /**
     * 執行開始小遊戲的函式
     * @param {Interaction} interaction - 互動物件
     * @param {string} gameMode - 遊戲模式
     */
    async buttonClick(interaction, gameMode) {
        // 如果 gameMode 未定義或不存在
        if (gameMode == "" || gameMode == undefined || gameMode == null) {
            functions.consoleLog("lang 按鈕的 ID 未定義");
            await interaction.reply("Oops! 我好像吃到 bug 了，尋找我的監護人解決問題吧...");
        } 
        else if (gameMode.includes(tttButton)) {
            this.tttButtonClick(interaction, gameMode.slice(tttButton.length))
        }
        else { // gameMode 存在 更新語音的語言
            functions.consoleLog(`Gamemode 模式為 ${gameMode}`);
            switch (gameMode) {
                case tttGame:
                    this.createTictactoeGame(interaction);
                    break;
                default:
                    functions.consoleLog("遊戲模式 未定義");
                    await interaction.reply("Oops! 我好像吃到 bug 了，尋找我的監護人解決問題吧...");
                    return;
            }
        }
    },
    /**
     * 執行 Tic-tac-toe 小遊戲的函式
     * @param {Interaction} interaction - Discord 互動物件
     */
    async createTictactoeGame(interaction) {

        // 創建 ttt 按鈕矩陣
        const buttonMatrix = [];
        for (let row = 0; row < 3; row++) {
            const buttonsRow = new ActionRowBuilder();
            for (let column = 0; column < 3; column++) {
                const button = new ButtonBuilder()
                    .setCustomId(`play/${tttButton}${row}${column}`)
                    .setLabel(`.`)
                    .setStyle(ButtonStyle.Primary);
                buttonsRow.addComponents(button);
            }
            buttonMatrix.push(buttonsRow);
        }

        // 將遊戲與按鈕發送到文字頻道
        const message = await interaction.channel.send({
            content: `Tic-tac-toe Mini-game\n**Player1: ${interaction.member.displayName}** \n**Player2:**`,
            components: buttonMatrix
        })

        // 定義遊戲資料
        const tttGameData = {
            player1: interaction.member.displayName, 
            player2: "",
            blanks:[['', '', ''],['', '', ''],['', '', '']],
            messageId: message.id,
            message: message
        }

        // 儲存遊戲資料
        this.saveGameData(tttGame, interaction.channel.id, tttGameData);
    },
    /**
     * 執行 Tic-tac-toe 按鈕點擊事件處理的函式
     * @param {Interaction} interaction - Discord 互動物件
     * @param {string} buttonTag - 按鈕標籤
     */
    async tttButtonClick(interaction, buttonTag) {
        const buttonRow = parseInt(buttonTag[0]);
        const buttonCol = parseInt(buttonTag[1]);

        var gameData = this.getGameData(tttGame, interaction.channel.id)
        console.log("Read:")
        for (let i = 0; i < 3; i++) {
            console.log(gameData.blanks[i][0], gameData.blanks[i][1], gameData.blanks[i][2])
        }
        gameData.blanks[buttonRow][buttonCol] = "X";
        console.log("Edit:")
        for (let i = 0; i < 3; i++) {
            console.log(gameData.blanks[i][0], gameData.blanks[i][1], gameData.blanks[i][2])
        }
        this.saveGameData(tttGame, interaction.channel.id, gameData)

        const player1Won = this.checkWinner("X", gameData.blanks)  
        const player2Won = this.checkWinner("O", gameData.blanks) 
        let buttonStyle = ButtonStyle.Primary;
        let messageContent = "";

        // 更新訊息的組件
        if (player1Won) {
            messageContent = `Player1: ${gameData.player1} 勝利!`
            buttonStyle = ButtonStyle.Secondary;
        }
        else if (player2Won) {
            messageContent = `Player2: ${gameData.player2} 勝利!`
            buttonStyle = ButtonStyle.Secondary;
        }
        else {
            messageContent = `獲勝條件：先連成一線者`
        }

        // 創建新的按鈕組件陣列並設置新的標籤
        const newLabel = "X"; // 新的按鈕標籤
        const newComponents = [];
        for (let row = 0; row < 3; row++) {
            const buttonsRow = new ActionRowBuilder();
            for (let col = 0; col < 3; col++) {
                const label = (row === buttonRow && col === buttonCol) ? newLabel : interaction.message.components[row].components[col].label;
                const button = new ButtonBuilder()
                    .setCustomId(`play/${tttButton}${row}${col}`)
                    .setLabel(label)
                    .setStyle(buttonStyle);
                buttonsRow.addComponents(button);
            }
            newComponents.push(buttonsRow);
        }

        await interaction.reply({content: messageContent, components: newComponents})
    },
    checkWinner(playerSign, board) {
        console.log("Judge:")
        for (let i = 0; i < 3; i++) {
            console.log(board[i][0], board[i][1], board[i][2])
        }

        // 檢查每一行是否有一樣的子
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === playerSign && board[i][1] === playerSign && board[i][2] === playerSign) {
                return true; // 如果有一樣的子，則返回true，表示獲勝
            }
        }
    
        // 檢查每一列是否有一樣的子
        for (let j = 0; j < 3; j++) {
            if (board[0][j] === playerSign && board[1][j] === playerSign && board[2][j] === playerSign) {
                return true; // 如果有一樣的子，則返回true，表示獲勝
            }
        }
    
        // 檢查兩條對角線是否有一樣的子
        if ((board[0][0] === playerSign && board[1][1] === playerSign && board[2][2] === playerSign) ||
            (board[0][2] === playerSign && board[1][1] === playerSign && board[2][0] === playerSign)) {
            return true; // 如果有一樣的子，則返回true，表示獲勝
        }
    
        return false; // 如果都沒有一樣的子，則返回false，表示未獲勝
    },
    /**
     * 取得小遊戲資料的函數
     * @param {string} gameSessionGroup 
     * @param {string} sessionId 
     * @returns 
     */
    getGameData(gameSessionGroup, sessionId) {
        return functions.getJSON("data", `${gameSessionGroup}:${sessionId}`)
    },
    /**
     * 儲存小遊戲資料的函數
     * @param {string} gameSessionGroup 
     * @param {string} sessionId 
     * @returns 
     */
    saveGameData(gameSessionGroup, sessionId, data) {
        functions.updateJSON("data", `${gameSessionGroup}:${sessionId}`, data)
    }
};
