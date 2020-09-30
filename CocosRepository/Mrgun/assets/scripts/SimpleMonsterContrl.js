//怪物行为控制脚本
var Bullet = require("Global");
cc.Class({
    extends: cc.Component,

    properties: {
        Speed: 500,    //枪旋转至指定角度速度
        Gun: cc.Node,    //拖拽枪
        Bullet: cc.Node,  //拖拽子弹
        Audio: {
            default: null,
            type: cc.AudioSource   //子弹声音
        },
        Monster:cc.Node,    //拖拽怪物
        _AnimPlay:false,    //判断是否播放动画
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start() {

    },

    update(dt) {
        if (Bullet.IsShoot == true && Bullet.ShouldShoot == true && Bullet.EnemyShoot == false) { //怪物反击条件：主角已经开枪 & 怪物需要开枪 & 怪物未开枪
            if (this.Gun.rotation >= 30) {
                var bullet = cc.instantiate(this.Bullet);
                bullet.active = true;  //子弹默认关闭，需开启
                bullet.parent = this.node;
                bullet.position = this.Gun.position;
                this.Audio.play();  //播放声音
                Bullet.EnemyShoot = true;  //怪物已开枪
                Bullet.IsShoot = false;   //主角未开枪
                Bullet.ShouldShoot = false;  //怪物不需要开枪
                this.scheduleOnce(function (){
                    this.Gun.rotation = 0;  //枪旋转至原位置
                },1);
            }
            this.Gun.rotation += dt * this.Speed;     //怪物枪旋转至指定角度攻击
        }
        if(Bullet.IsCollision == true && this._AnimPlay == false){  //动画播放条件： 玩家击中怪物，动画未播放
            Bullet.EnemyShoot = true;   //怪物已开枪
            this.Monster.active = false;   //关闭怪物图形
            var anim = this.getComponent(cc.Animation);
            anim.play();
            this._AnimPlay = true;
            Bullet.GuaiwuLive = true;
            Bullet.IsEnd = true;
            // Bullet._Angle = 0;
            // Bullet.IsShoot = false, 
            // Bullet.IsCollision = false, 
            // Bullet.ShouldShoot = false, 
            // Bullet.EnemyShoot = true, 
            // Bullet.PlayerDie = false, 
            // Bullet.GunTypeRoute = null, 
            this.scheduleOnce(function (){
                this.node.destroy();
            },1);
        }
    },
});
