// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        start_btn:{
            default:null,
            type:cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        cc.director.preloadScene("GameScene");
        var scareTo=cc.scaleTo(0.8,0.9);
        var reverse=cc.scaleTo(0.8,1);
        var seq= cc.sequence(scareTo,reverse);
        var repeat = cc.repeatForever(seq);
        this.start_btn.runAction(repeat);
        this.start_btn.on("touchstart",function(){
            cc.director.loadScene("GameScene");
        });
    },

    start () {

    },

    // update (dt) {},
});
