var message;
var resultText;
var restartButton;
var mainButton2;
var sadMouse;

var Result = 
{
    preload : function()
    {
        game.load.image("restart", "image/button/restart.png", 300, 117);
        game.load.image("main", "image/button/main.png", 300, 117);
        game.load.image("sadMouse", "image/mouse/end.png", 200, 300);
    },
    create : function()
    {
        background = game.add.tileSprite(0, 0, 1200, 900, "background");

        message = game.add.text(game.world.centerX, 200, "");
        message.anchor.set(0.5, 0);
        message.align = "center";
        message.fontSize = 80;
        message.fill = "#ffffff";
        checkScore();

        resultText = game.add.text(game.world.centerX, 350, "점수는 " + score + "점입니다~");
        resultText.anchor.set(0.5, 0);
        resultText.align = "center";
        resultText.fontSize = 50;
        resultText.fill = "#ffffff";
        resultText.addColor("#266bff", 4);
        resultText.addColor("#ffffff", 4 + score.toString().length);

        restartButton = game.add.button(game.world.centerX - 100, 550, "restart", restartGame, this, 2, 1, 0);
        mainButton2 = game.add.button(game.world.centerX + 250, 550, "main", gotoMain, this, 2, 1, 0);

        sadMouse = game.add.sprite(150, 500, "sadMouse");
    },
    update : function()
    {

    },
    render : function()
    {

    }
};

//////////////////////////////////

function checkScore()
{
    if(score < 1000)
    {
        message.text = "정말 못하시는군요..";
        message.fill = "#ff0000";
        message.addColor("#ffffff", 3);
    }
    else if(score < 2000)
    {
        message.text = "흐음... 당신의 실력의 상태가??";
    }
    else if(score < 4000)
    {
        message.text = "조금만 더 하신다면 뭔가 있을 수도 있겠네요 ㅎㅎ";
        message.addColor("#ffff00", 11);
        message.addColor("#ffffff", 13);
    }
    else if(score < 5000)
    {
        message.text = (5000 - score) + "점만 얻으면 정말로 뭔가가 있을 것 같아요!!";
    }
    else
    {
        message.text = "당신은 상품을 얻을 자격이 있군요";
    }
}

function restartGame()
{
    game.state.start("Select");
}

function gotoMain()
{
    game.state.start("Main");
}