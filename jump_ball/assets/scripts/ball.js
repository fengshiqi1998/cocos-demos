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
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initVel = 0; // 小球初始速度
    },

    start () {

    },



    onBeginContact(contact, selfCollider, otherCollider) {
        // console.log(contact, selfCollider, otherCollider);
        let rigidBody = selfCollider.node.getComponent(cc.RigidBody);
        if (!this.initVel) {
            this.initVel = rigidBody.linearVelocity.y;
        } else {
            rigidBody.linearVelocity = cc.v2(0, this.initVel);
        }
    },

    // update (dt) {},
});
