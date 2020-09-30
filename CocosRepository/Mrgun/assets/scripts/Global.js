//各脚本数据连接 全局变量
module.exports = {
    _Angle:0, //主角枪瞄准角度
    IsShoot:false, //判断主角是否开枪
    IsCollision:false, //判断是否产生碰撞
    ShouldShoot:false, //判断怪物是否需要开枪
    EnemyShoot:true, //怪物已经开枪
    PlayerDie:false, //是否集中玩家
    GunTypeRoute:null, //枪的路径
    GuaiwuLive:false, //判断怪物是否死亡
    arr:[2,33,3,22,2,33,2,33,2,33,3], //初始阶梯
    i:0,
    IsEnd:false, //判断与怪物的对抗是否结束
};
