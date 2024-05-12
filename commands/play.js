const { ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder } = require('discord.js');
const functions = require("../functions/functions");
const tttGame = "Tic-Tac-Toe(井字遊戲)";
const tttButton = "tttButton/";

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
            await interaction.reply(`${interaction.member.displayName} 開始了小遊戲: ${gameMode}`);
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
                    .setCustomId(`play/${tttButton}/${row}_${column}`)
                    .setLabel(`.`)
                    .setStyle(ButtonStyle.Primary);
                buttonsRow.addComponents(button);
            }
            buttonMatrix.push(buttonsRow);
        }

        // 將遊戲與按鈕發送到文字頻道
        await interaction.channel.send({
            content: `Tic-tac-toe Mini-game\n**Player1: ${interaction.member.displayName}** \n**Player2:**`,
            components: buttonMatrix
        })

        // 定義遊戲資料
        const tttGameData = {
            player1: interaction.member.displayName, 
            player2: "",
            blank:[['', '', ''],['', '', ''],['', '', '']]
        }

        // 儲存遊戲資料
        functions.updateJSON("data", `tttSession:${interaction.channel.id}`, tttGameData)
    },
    /**
     * 執行 Tic-tac-toe 按鈕點擊事件處理的函式
     * @param {Interaction} interaction - Discord 互動物件
     * @param {string} buttonTag - 按鈕標籤
     */
    async tttButtonClick(interaction, buttonTag) {
        
    }
};
