var gameSpeed = 1.5;
var gameScoreText;
var startCnt;
var startRTime = Date.now() + 3 * 1000;
var startedGame = false;

var mouse;
var mouseMoveAni;
var mouseMoveSpeed = 200;

var cat;
var catMoveAni;

var redZone;

var cheezeGroup;
var cheezeArr = [];
var spawnCheezeRTime = Date.now();
var spawnCheezeTime = 5 / gameSpeed;
var spawnCheezeType = 0;
var cheezePoint = 100;

var trapGroup;
var trapArr = [];
var spawnTrapRTime = Date.now();
var spawnTrapTime = 1.5 / gameSpeed;
var spawnTrapType = 0;

var score = 0;
var cursors;

var Game = 
{
    preload : function()
    {
        game.load.spritesheet("mouse", "image/mouse/1.png", 100, 150, 2);
        game.load.spritesheet("cat", "image/cat/1.png", 600, 808, 2);
        game.load.image("cheeze", "image/cheeze.png", 80, 60);
        game.load.image("trap", "image/trap.png", 100, 150);
    },
    create : function()
    {
        background = game.add.tileSprite(0, 0, 1200, 900, "background");

        startedGame = false;
        score = 0;

        setLevel(level);

        startCnt = game.add.text(game.world.centerX, game.world.centerY, "3");
        startCnt.anchor.set(0.5);
        startCnt.align = "center";
        startCnt.fontSize = 70;
        startCnt.fill = "#0000ff";

        startRTime = Date.now() + 3 * 1000;

        gameScoreText = game.add.text(20, 15, "점수 : ");
        gameScoreText.align = "center";
        gameScoreText.fill = "#ffffff";
        
        mouse = game.add.sprite(game.world.centerX, 200, "mouse");
        mouse.anchor.set(0.5, 0.5);

        game.physics.arcade.enable(mouse);
        mouse.body.collideWorldBounds = true;

        mouseMoveAni = mouse.animations.add("mouseWalk");
        mouse.animations.play("mouseWalk", 4, true);

        cat = game.add.sprite(game.world.centerX - 300, 650, "cat");
        game.physics.arcade.enable(cat);
        cat.body.setSize(2400, 300, -(game.world.centerX + 300), 0);

        catMoveAni = cat.animations.add("catWalk");
        cat.animations.play("catWalk", 4, true);
        
        redZone = new Phaser.Rectangle(0, 650, 1200, 300);

        cheezeArr = [];
        spawnCheezeRTime = Date.now() + 3 * 1000;
        cheezeGroup = game.add.group();
        spawnCheezeType = 1;

        trapArr = [];
        spawnTrapRTime = Date.now() + 1 * 1000 + 3 * 1000;
        trapGroup = game.add.group();
        spawnTrapType = 1;
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    update : function()
    {
        if(startedGame == true)
        {
            updateTrap();   
            updateCheeze();
            moveMouse();
            collision();
            background.tilePosition.y += 5 / gameSpeed;
        }
        else if(Date.now() >= startRTime && startedGame == false)
        {
            startCnt.kill();
            startedGame = true;
        }
    },
    render : function()
    {
        game.debug.geom(redZone, "rgba(255, 0, 0, 0.3)");

        gameScoreText.text = "점수 : " + score;
        startCnt.text = Math.floor((startRTime - Date.now()) / 1000) + 1;
    }
}

//////////////////////////////////////////////////////

/////* mouse */////

function moveMouse()
{
    mouse.body.velocity.x = 0;
    mouse.body.velocity.y = 200 * gameSpeed / 2;

    if(cursors.left.isDown)
    {
        mouse.body.velocity.x = -mouseMoveSpeed * gameSpeed;
        mouse.scale.x = -1;
    }
    else if(cursors.right.isDown)
    {
        mouse.body.velocity.x = mouseMoveSpeed * gameSpeed;
        mouse.scale.x = 1;    
    }
    if(cursors.up.isDown)
    {
        mouse.body.velocity.y = -mouseMoveSpeed * gameSpeed;
    }
    else if(cursors.down.isDown)
    {
        mouse.body.velocity.y += mouseMoveSpeed * gameSpeed;
    }
}

function catchMouse(_mouse, _cat)
{
    console.log("잡혀버렸네요...");
    endGame();
}

/////* cheeze */////

function addCheeze(_x, _y)
{
    let cheeze = game.add.sprite(_x - 40, _y, "cheeze");
    game.physics.arcade.enable(cheeze);
    let time = Date.now() + 6 * 1000 * gameSpeed;
    cheeze.update = () =>
    {
        cheeze.body.velocity.y = 200 * gameSpeed;
        if(Date.now() >= time)
        {
            deleteCheeze(cheeze);
        }
    }
    cheezeGroup.add(cheeze);
    cheezeArr.push(cheeze);
}

function deleteCheeze(_cheeze)
{
    for(let i = 0; i < cheezeArr.length; i++)
    {
        if(_cheeze == cheezeArr[i])
        {
            cheezeArr.splice(i, 1);
            break;
        }
    }
    _cheeze.kill();
}

function checkCheeze(_mouse, _cheeze)
{
    deleteCheeze(_cheeze);
    score += cheezePoint;
}

function randomSpawnCheeze()
{
    let check;
    let cnt = 0;
    for(let i = 0; i < 5; i++)
    {
        check = Math.floor(Math.random() * 2) + 1;
        if(check == 1)
        {
            addCheeze((i + 1) * 200, -60);
            cnt++;
        }
    }
    if(cnt == 0)
    {
        randomSpawnCheeze();
    }
}

function updateCheeze()
{
    if(Date.now() >= spawnCheezeRTime && spawnCheezeType == 1)
    {
        randomSpawnCheeze();
        spawnCheezeRTime += spawnCheezeTime * 1000;
    }
}

/////* trap */////

function addTrap(_x, _y)
{
    let trap = game.add.sprite(_x - 50, _y, "trap");
    game.physics.arcade.enable(trap);
    let time = Date.now() + 6 * 1000 * gameSpeed;
    trap.update = () =>
    {
        trap.body.velocity.y = 200 * gameSpeed;
        if(Date.now() > time)
        {
            deleteTrap(trap);
        }
    }
    trap.moveDown();
    trapGroup.add(trap);
    trapArr.push(trap);
}

function deleteTrap(_trap)
{
    for(let i = 0; i < trapArr.length; i++)
    {
        if(_trap == trapArr[i])
        {
            trapArr.splice(i, 1);
            break;
        }
    }
    _trap.kill();
}

function checkTrap(_mouse, _trap)
{
    console.log("이걸 걸리네...");
    endGame();
}

function randomSpawnTrap()
{
    let x = (Math.floor(Math.random() * 4) + 1) * 200;
    addTrap(x, -150);
}

function updateTrap()
{
    if(Date.now() >= spawnTrapRTime && spawnTrapType == 1)
    {
        randomSpawnTrap();
        spawnTrapRTime += spawnTrapTime * 1000;
    }
}

/////* other *///// 

function setLevel(_level)
{
    switch(_level)
    {
        case "easy" : gameSpeed = 1; cheezePoint = 100; break;
        case "normal" : gameSpeed = 2; cheezePoint = 200; break;
        case "hard" : gameSpeed = 4; cheezePoint = 400; break;
    }

    spawnCheezeTime = 5 / gameSpeed;
    spawnTrapTime = 1.5 / gameSpeed;
}

function collision()
{
    game.physics.arcade.overlap(mouse, cat, catchMouse, null, this);
    game.physics.arcade.overlap(mouse, cheezeGroup, checkCheeze, null, this);
    game.physics.arcade.overlap(mouse, trapGroup, checkTrap, null, this);
}

function endGame()
{
    spawnCheezeType = 0;
    spawnTrapType = 0;
    game.state.start("Result");
}