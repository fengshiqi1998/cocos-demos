cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if (!this.playerNode) return ;
        const w_pos = this.playerNode.convertToWorldSpaceAR(cc.v2(0, 0));
        const n_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        this.node.position = n_pos;
    },
});
