var Boot = 
{
    preload : function()
    {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    create : function()
    {
        game.state.start("Main");
    }
};