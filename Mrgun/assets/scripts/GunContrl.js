//玩家枪控制脚本
var Bullet = require("Global");
cc.Class({
    extends: cc.Component,

    properties: {
        direction: 1, //枪以及标准扇形方向
        speed: 0.15,  //扇形填充速度
        GunSpeed: 50,  //枪旋转速度
        _IsShoot: false,  //是否开枪
        _Bullet: cc.Node,  //枪中子弹
        _Angel: 0,        //枪瞄准角度
        Gun: cc.Node,     //拖拽连接枪
        Pin: cc.Node,     //瞄准线
        cel: {
            default: null,
            type: cc.Sprite   //扇形
        },
        bullet: cc.Node,      //拖拽子弹
        audio: {
            default: null,
            type: cc.AudioSource    //子弹发射声音
        }
    },

    onLoad() {
        this.node.parent.parent.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this._IsShoot == false && Bullet.EnemyShoot == true) { //发射子弹条件：未开枪 & 怪物以开枪
                Bullet.IsShoot = true; //已开枪
                this.Pin.active = false; //隐藏瞄准线
                this._Bullet = cc.instantiate(this.bullet);
                Bullet._Angle = this._Angel;  //收集瞄准角度
                this._Bullet.active = true;
                this._Bullet.parent = this.node;
                this._Bullet.setPosition(0, 0);
                this.audio.play();
                this._IsShoot = true;
                Bullet.EnemyShoot = false;  //怪物未开枪
                this.scheduleOnce(function () {
                    if(Bullet.IsCollision == false){ //未击中怪物
                        Bullet.ShouldShoot = true; //怪物应该开枪
                    }
                    this._IsShoot = false;
                    this.Gun.rotation = 0;  //枪归位
                    this.Pin.active = true; //瞄准线归位
                    this._Bullet.destroy();  //销毁子弹
                }, 1);
            }
        }, this);
    },
    update(dt) {   //控制枪的瞄准
        if (this._IsShoot == true) {
            this.direction = 0;
            this.cel.fillRange = 0;
        }
        if (this._IsShoot == false) {
            if (this.Gun.rotation <= -45) {
                this.direction = -1;
            }
            if (this.Gun.rotation >= 0) {
                this.direction = 1;
            }
            this.cel.fillRange += dt * this.speed * this.direction;
            this.Gun.rotation -= dt * this.GunSpeed * this.direction;
            this._Angel = -this.Gun.rotation;  //收集枪旋转角度
        }
    },
});
