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
        button:{
            default:null,
            type:cc.Node
        },
        scoreLabel:{
            default:null,
            type:cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("GameScene");
        this.button.on("touchstart",function(){
            cc.director.loadScene("GameScene");
        })
        var score = cc.sys.localStorage.getItem('score');
        this.scoreLabel.string=score;
    },

    start () {

    },

    // update (dt) {},
});
