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
        ballNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initPhysics();

        this.node.on('touchstart', this.boost, this); // 给小球加速（boost推动）
    },

    onDestroy() {
        this.node.off('touchstart', this.boost, this);
    },

    // 初始化物理引擎
    initPhysics() {
        let manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, -2400);
    },

    // 加速
    boost() {
        let rigidbody = this.ballNode.getComponent(cc.RigidBody);
        rigidbody.linearVelocity = cc.v2(0, -1200); // 给刚体设置线性速度
    },

    start () {

    },

    // update (dt) {},
});
