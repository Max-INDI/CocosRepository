//怪物子弹控制脚本
cc.Class({
    extends: cc.Component,

    properties: {
        Speed: 500,  //怪物子弹发射速度
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.node.x += dt * this.Speed * Math.cos(2 * Math.PI / 360 * -45);
        this.node.y += dt * this.Speed * Math.sin(2 * Math.PI / 360 * -45);
    },
});
