var gun = require("Global");
cc.Class({
    extends: cc.Component,

    properties: {
       taijie2: {
           default: null,
           type: cc.Prefab
       },
       taijie22: {
           default: null,
           type: cc.Prefab
       },
       taijie2dui: {
           default: null,
           type: cc.Prefab
       },
       taijie3: {
           default: null,
           type: cc.Prefab
       },
       taijie33: {
           default: null,
           type: cc.Prefab
       },
       taijie3dui: {
           default: null,
           type: cc.Prefab
       },
       player: {
           default: null,
           type: cc.Prefab
       },
       _positionY: 0,
       _colorR: 0,
       _colorG: 0,
       _colorB: 0,
       _orientation: 1,
       _player: null,
       _playerNode: null,
       _i: 0,
    },

    onLoad () {
        // var self = this;

        //数据初始化
        this._orientation = 1;//初始化方向
        this._i = gun.i; //初始化阶梯索引
        //生成初始背景
        var arr = gun.arr;
        //var arr = [2,33,3,22,2,33,2,33,2,33,3];
        this.beijing(arr);
        //生成player
        this.playerPosition();
        this.playerGun("prefab/GUN/Gun_8");
        this.guaiwu("prefab/Boss/Boss5",arr);
    },
    //初始化player
    playerPosition: function() {
        var player = cc.instantiate(this.player);
        this.node.addChild(player);
        player.setPosition(cc.v2(0,-this.node.height/2 +player.height/2 + 105));
        this._player = player;
    },
    //初始化player佩戴的枪
    playerGun: function(gunRoute) {
        var self = this;
        cc.loader.loadRes(gunRoute, function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            newNode.setPosition(cc.v2(0,0));
            self._player.addChild(newNode);
        });
    },
    //初始化怪物
    guaiwu: function(guaiwuRoute,arr) {
        var self = this;
        var newNode = null;
        var height = 0;
        var width = 0;
        switch(arr[self._i]) {
            case 2:
            height = 105;
            width = -3 * 35;
                break;
            case 22:
            height = 105;
            width = -3 * 35;
                break;
            case 3:
            height = 140;
            width = -4 * 35;
                break;
            case 33:
            height = 140;
            width = -4 * 35;
                break;                
        }
        cc.loader.loadRes(guaiwuRoute, function (err, prefab) {
            newNode = cc.instantiate(prefab);
            newNode.setPosition(cc.v2(-128 + width ,-self.node.height/2 + 105 + height +newNode.height/2));
            self.node.addChild(newNode);
        });
        // cc.loader.loadRes(guaiwuGunRoute, function (err, prefab) {
        //     var newGun = cc.instantiate(prefab);
        //     newGun.setPosition(cc.v2(0,0));
        //     newNode.addChild(newGun);
        // });
    },
    //人物移动
    characterMove: function(player,frequency) {
        var gotoTaijie = cc.moveBy(0.1,cc.v2(-64,0));
        var gotoUp = cc.moveBy(0.1,cc.v2(0,35));
        var gotoLevel = cc.moveBy(0.1,cc.v2(-35,0));
        var move = cc.sequence(gotoUp,gotoLevel);
        var seq = cc.repeat(move,frequency);
        var gotolev = cc.moveBy(0.1,cc.v2(-64,0));
        var once = cc.sequence(gotoTaijie,seq,gotolev);
        player.runAction(once);
        this.scheduleOnce(function(){
            player.setScaleX(1);
        },0.2*(frequency+1));
    },
    //生成初始背景
    beijing: function(arr) {
        this._colorR = 220;
        this._colorG = 150;
        this._colorB = 150;
        //var arr = [2,33,3,22,2,33,2,33,2,33,3];
        var color = cc.color(this._colorR,this._colorG,this._colorB);
        this.continuedJieti(this.taijie2dui,color);
        this._positionY += 105;
        for(var i = 0;i < arr.length;i++) {
            switch(arr[i]) {
                case 2:
                this.continuedJieti(this.taijie2dui,cc.color(this._colorR-12,this._colorG-12,this._colorB-12));
                this.continuedJieti(this.taijie2,color);
                this._positionY += 105;
                    break;
                case 22:
                this.continuedJieti(this.taijie2dui,cc.color(this._colorR-12,this._colorG-12,this._colorB-12));
                this.continuedJieti(this.taijie22,color);
                this._positionY += 105;
                    break;
                case 3:
                this.continuedJieti(this.taijie3dui,cc.color(this._colorR-12,this._colorG-12,this._colorB-12));
                this.continuedJieti(this.taijie3,color);
                this._positionY += 140;
                    break;
                case 33:
                this.continuedJieti(this.taijie3dui,cc.color(this._colorR-12,this._colorG-12,this._colorB-12));
                this.continuedJieti(this.taijie33,color);
                this._positionY += 140;
                    break;                
            }
            this._colorR -= 12;
            this._colorG -= 12;
            this._colorB -= 12;
            color = cc.color(this._colorR,this._colorG,this._colorB);
            this._orientation = this._orientation * -1;
            cc.log(this._orientation);
        }
    },
    //生成一块阶梯
    continuedJieti: function(jietiType,color) {
        var X = 0;
        var Y = 0;
        var newJieti = cc.instantiate(jietiType);
        this.node.addChild(newJieti);
        if(this._orientation == 1) {
            X = -this.node.width/2 + newJieti.width/2;
        }
        if(this._orientation == -1) {
            X = this.node.width/2 - newJieti.width/2;
        }
        Y =-this.node.height/2 + newJieti.height/2 +this._positionY;
        newJieti.color = color;
        newJieti.setPosition(cc.v2(X,Y));
    },

    start () {

    },

    update (dt) {
        var self = this;
        if(gun.GuaiwuLive == true) {
            self.characterMove(self._player,3);
            gun._Angle = 0;
            gun.IsShoot = false; 
            gun.IsCollision = false; 
            gun.ShouldShoot = false; 
            gun.EnemyShoot = true; 
            gun.PlayerDie = false; 
            gun.GunTypeRoute = null;
            gun.GuaiwuLive = false; 
        }
    },
});
