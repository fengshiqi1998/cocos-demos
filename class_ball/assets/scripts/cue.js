// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        SHOOT_POWER: 18,// 比例系数
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody);

    },

    // 发射击球函数
    shoot_at(dst) {
        // 给球杆冲量 矢量，大小，方向
        // 方向：当前位置指向目标位置
        var src = this.node.getPosition();
        var dir = dst.sub(src);

        // 大小：
        var cue_len_half = this.node.width * 0.5;
        var len = dir.mag();
        var distance = len - cue_len_half;

        // 矢量向量分解
        var power_x = distance * this.SHOOT_POWER * dir.x / len;
        var power_y = distance * this.SHOOT_POWER * dir.y / len;

        // 冲量函数 applyLinearImpulse(冲量大小向量，球杆的原点转成世界坐标，是否马上唤醒刚体)
        this.body.applyLinearImpulse(cc.v2(power_x, power_y), this.node.convertToWorldSpaceAR(cc.v2(0, 0)), true);

    },

    // 碰撞接触更新前调用
    onPreSolve(contact, selfCollider, otherCollider) {
        this.node.active = false;
    }

    // update (dt) {},
});
