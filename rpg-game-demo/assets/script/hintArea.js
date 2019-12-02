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
        hintLabel: cc.Label,
        attackBtnNode: cc.Node,
        healBtnNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.attackBtnNode.on('mousemove', this.setAtkHint, this);
        this.attackBtnNode.on('mouseleave', this.removeHint, this);
        this.healBtnNode.on('mousemove', this.setHealHint, this);
        this.healBtnNode.on('mouseleave', this.removeHint, this);
    },

    onDestroy() {
        this.attackBtnNode.off('mousemove', this.setAtkHint, this);
        this.attackBtnNode.off('mouseleave', this.removeHint, this);
        this.healBtnNode.off('mousemove', this.setHealHint, this);
        this.healBtnNode.off('mouseleave', this.removeHint, this);
    },


    setAtkHint() {
        this.setHint(`对敌人造成${cfg.playerAtk}点伤害`);
    },

    setHealHint() {
        this.setHint(`消耗${cfg.mpCost}点MP，自身回复${cfg.healHp}点HP`);
    },

    removeHint() {
        this.setHint('');
    },

    setHint(hint) {
        this.hintLabel.string = hint || '';
    },


    start () {

    },

    // update (dt) {},
});
