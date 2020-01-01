cc.Class({
    extends: cc.Component,

    properties: {
        speed: 600, // 子弹移动速度
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.node.y += (this.speed * dt);
        if (this.node.y >= (cc.winSize.height * 0.5) + this.node.height * 0.5) {
            this.node.removeFromParent(); // 从父节点删除
        }
    },
});
