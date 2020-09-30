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
        player:{
            default:null,
            type:cc.Node            
        },
        dici:{
            default:null,
            type:cc.Prefab
        },
        timelaybel:{
            default:null,
            type:cc.Label
        },
        ScoreLabel:{
            default:null,
            type:cc.Label
        },
        bgAudio:{
            default:null,
            url:cc.AudioClip
        },
        jumpAudio:{
            default:null,
            url:cc.AudioClip
        },
        PlayerJumpHeight:30,
        dicicount:0,
        DCduration:140,
        gametime:60,
        score:0,
    },

    playerMoveRight:function(){
        var goRight = cc.moveTo(0.2,cc.p(this.node.width/2-80,this.player.getPositionY()));
        var goR1 = cc.moveTo(0.1,cc.p(this.node.width/2-110,this.player.getPositionY()));
        var goR2 = cc.moveTo(0.1,cc.p(this.node.width/2-80,this.player.getPositionY()));
        var sque = cc.sequence(goR1,goR2);
        if(this.player.rotationY == 180){
            this.player.runAction(sque);
        }
        else{
            this.player.runAction(goRight);
        }
        this.player.rotationY=180;        
    },

    playerMoveLeft:function(){
        var goLeft = cc.moveTo(0.2,cc.p(-this.node.width/2+80,this.player.getPositionY()));
        var goL1 = cc.moveTo(0.1,cc.p(-this.node.width/2+110,this.player.getPositionY()));
        var goL2 = cc.moveTo(0.1,cc.p(-this.node.width/2+80,this.player.getPositionY()));
        var sque = cc.sequence(goL1,goL2);
        if(this.player.rotationY == 0){
            this.player.runAction(sque);
        }
        else{
            this.player.runAction(goLeft);
        }
        this.player.rotationY=0;       
    },

    setInputControl:function(){
        var self = this;
        var listener={
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touches, event){
                cc.audioEngine.playEffect(self.jumpAudio,false);
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touches.getLocation());
                cc.log(locationInNode.x);
                if(locationInNode.x > self.node.width / 2){
                    self.playerMoveRight();
                }
                else{
                    self.playerMoveLeft();
                }
                self.newDC();
                self.score+=1;
                self.ScoreLabel.string=self.score;
               // cc.sys.localStorage.setItem("score",self.score);
                return true;
            },
            onTouchMoved:function(touches, event){
                
            },
            onTouchEnded:function(touches, event){

            },
        }
        cc.eventManager.addListener(listener, self.node)
    },
    
    newDC:function(){
        this.dicicount+=1;
        var newDC=cc.instantiate(this.dici);
        this.node.addChild(newDC);
        var rannum=cc.random0To1();
        if(rannum>=0.5){
            newDC.rotationY=0;
        }
        else{
            newDC.rotationY=180;
        }
        newDC.setPosition(this.DCPosition(rannum));
    },

    DCPosition:function(rannum){
        var ranX=0;
        var ranY=0;
        if(rannum>=0.5){
            ranX=this.node.width/2-80;
        }
        else{
            ranX=-this.node.width/2+80;
        }
        if(this.dicicount<=8){
            ranY=(this.node.height/2)-(this.DCduration*this.dicicount)-this.DCduration;
        }
        else{
            ranY=(this.node.height/2)-(this.DCduration*8)-this.DCduration;
        }
        return cc.p(ranX,ranY);
    },


    onLoad () {
        cc.audioEngine.setEffectsVolume(0.2);
        cc.audioEngine.playMusic(this.bgAudio,true);
        this.dicicount=0;
        cc.director.preloadScene("OverScene");
        this.setInputControl();
        this.player.setPosition(-this.node.width/2+80,this.node.height/2-175);
        for(var i=0;i<8;i++){
            this.newDC();
        }
        this.schedule(function(){
            this.gametime--;
            this.timelaybel.string="倒计时"+this.gametime;
            if(this.gametime<=0){
                cc.audioEngine.pauseMusic();
                cc.director.loadScene("OverScene");
            }
        },1)
    },

    start () {

    },

    // update (dt) {},
});
