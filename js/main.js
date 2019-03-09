var startButton;
var background;
var logo;

var Main = 
{
    preload : function()
    {
        game.load.image("start", "image/button/start.png", 300, 117);
        game.load.image("background", "image/background.png", 1200, 900);
        game.load.image("logo", "image/logo.png", 500, 400);
    },
    create : function()
    {
        background = game.add.tileSprite(0, 0, 1200, 900, "background");

        startButton = game.add.button(game.world.centerX - 150, 550, "start", gameStart, this, 2, 1, 0);
;
        logo = game.add.sprite(game.world.centerX - 250, 70, "logo")
    }
}

///////////////////////

function gameStart()
{
    game.state.start("Select");
}