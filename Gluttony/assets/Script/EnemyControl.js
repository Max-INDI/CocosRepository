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
        // enemy:{
        //     default:null,
        //     type:cc.Node,
        // },
        hero:{
            default:null,
            type:cc.Node,
        },
    },

    chasehero:function(){
        this.schedule(function(){
            let target = this.hero.getPosition();
            let etarget = this.node.getPosition();
            let normal = cc.v2(target.x - etarget.x,target.y - etarget.y).normalizeSelf();
            
            this.node.x += normal.x * 5;
            this.node.y += normal.y * 5;
        },0.02);
        
    },

    // onCollisionEnter:function(other){
    //     var score = 0
    //     if(other.tag == 2){
    //         cc.director.loadScene("OverScene");
    //     }
    // },

    onEnable:function(){
        cc.director.getCollisionManager().enabled = true;
    },

    onLoad:function(){
        this.chasehero();
    },

    start () {

    },

    // update (dt) {},
});
