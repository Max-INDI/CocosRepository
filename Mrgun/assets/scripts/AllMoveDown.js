var gun = require("Global");
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // onLoad () {},

    start () {

    },

    update (dt) {
        if(gun.IsEnd == true) {
            var height = 0;
            switch(gun.arr[gun.i]) {
                case 2:
                height = 105;
                    break;
                case 22:
                height = 105;
                    break;
                case 3:
                height = 140;
                    break;
                case 33:
                height = 140;
                    break;                
            }
            cc.log(gun.arr[gun.i]);
            var goAction = cc.moveBy(0.2,cc.v2(0,-height));
            this.node.runAction(goAction);
            gun.i++;
            gun.IsEnd = false;
        }
    },
});
