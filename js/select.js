var selectText;
var mainButton1;
var easyButton;
var normalButton;
var hardButton;
var level;

var Select = 
{
    preload : function()
    {
        game.load.image("main", "image/button/main.png", 300, 117);
        game.load.image("easy", "image/button/easy.png", 300, 117);
        game.load.image("normal", "image/button/normal.png", 300, 117);
        game.load.image("hard", "image/button/hard.png", 300, 117);
    },
    create : function()
    {
        background = game.add.tileSprite(0, 0, 1200, 900, "background");

        selectText = game.add.text(game.world.centerX, 200, "난이도를 선택하세요");
        selectText.anchor.set(0.5, 0);
        selectText.align = "center";
        selectText.fontSize = 50;
        selectText.fill = "#0000ff";

        mainButton1 = game.add.button(game.world.width - 310, 10, "main", gotoMain, this, 2, 1, 0);

        easyButton = game.add.button(game.world.centerX - 500, 550, "easy", startEasy, this, 2, 1, 0);
        normalButton = game.add.button(game.world.centerX - 150, 550, "normal", startNormal, this, 2, 1, 0);
        hardButton = game.add.button(game.world.centerX + 250, 550, "hard", startHard, this, 2, 1, 0);
    }
}

//////////////////////////

function startEasy()
{
    level = "easy";
    startGame();
}

function startNormal()
{
    level = "normal";
    startGame();
}

function startHard()
{
    level = "hard";
    startGame();
}

function startGame()
{
    game.state.start("Game");
}