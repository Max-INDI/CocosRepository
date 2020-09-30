// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var tmpPlayer = require('Player');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    setInputControl:function(){
        var self=this;
        var listener={
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(){
                var goAction=cc.moveBy(0.2,cc.p(0,140));
                self.node.runAction(goAction);
                return true;
            },
        }
        cc.eventManager.addListener(listener, self.node);
    },

 onLoad:function () {
    this.setInputControl();
 },
 noteBox:function(){
    return this.node.getBoundingBoxToWorld();
 },

    start () {

    },

     update (dt) {
         var player=cc.find("Canvas/normal").getComponent(tmpPlayer);

         if(cc.rectIntersectsRect(player.node.getBoundingBoxToWorld(),this.noteBox())){
             cc.director.loadScene("OverScene")
         }
     },
});
