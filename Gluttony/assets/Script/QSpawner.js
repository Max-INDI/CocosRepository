

cc.Class({
    extends: cc.Component,

    properties: {
        scorePrefab:{
            default:null,
            type:cc.Prefab,
        },
    },

    getprefab:function(){
        var newQ = cc.instantiate(this.scorePrefab);
        this.node.addChild(newQ);
        newQ.setPosition(this.getnewQPosition());
    },

    getnewQPosition:function(){
        var randX = 0;
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
        var randY = 0;
        var maxY = this.node.height/2;
        randY = cc.randomMinus1To1() * maxY;
        cc.log(randX);
        return cc.v2(randX,randY);
    },


    onLoad:function () 
    {
        this.schedule(function(){
            this.getprefab();
        },5);
    },

    start () {

    },

     update:function (dt) 
     {
        //this.getprefab();
    },
});
