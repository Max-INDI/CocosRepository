//玩家子弹控制
var Bullet = require("Global");
cc.Class({
    extends: cc.Component,
    properties: {
        Speed: 500,  //子弹发射速度
        _Angle: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this._Angle = Bullet._Angle;
    },
    onCollisionEnter: function (other, self) {
        Bullet.IsCollision = true;   //发生碰撞
        console.log("333");
        this.node.destroy();
        // if (other.tag == 1) { //爆头控制
        //     console.log("333");
        // }
    },
    start() {

    },

    update(dt) {
        this.node.x += dt * this.Speed * Math.cos(2 * Math.PI / 360 * this._Angle);//Math.abs( Bullet._Angle)
        this.node.y += dt * this.Speed * Math.sin(2 * Math.PI / 360 * this._Angle);//Math.abs(Bullet._Angle)
    },
});
