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
        hpLabel: cc.Label,
        mpLabel: cc.Label,
        apLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init(hp, mp, ap) {
        this.setHp(hp);
        this.setMp(mp);
        this.setAp(ap);
    },

    setHp(hp) {
        this.hp = hp;
        this.updateHp();
    },
    
    updateHp() {
        this.hpLabel.string =`HP\n${this.hp}`;
    },

    setMp(mp) {
        this.mp = mp;
        this.updateMp();
    },
    
    updateMp() {
        this.mpLabel.string = `MP\n${this.mp}`;
    },

    setAp(ap) {
        this.ap = ap;
        this.updateAp();
    },
    
    updateAp() {
        this.apLabel.string = `AP\n${this.ap}`;
    },

    costAp(num) {
        this.ap -= num;
        this.updateAp();
        if (this.ap === 0) {
            window.game.enemy.onHurtEnd();
        }
    },

    increaseMp() {
        this.mp += cfg.incrMp;
        if (this.mp >= cfg.playerMaxMp) {
            this.mp = cfg.playerMaxMp;
        }
        this.updateMp();
    },

    hurt(num) {
        this.hp -= num;
        this.updateHp();
        if (this.hp <= 0) {
            window.game.gameOver();
        }
    },

    heal() {
        this.mp -= cfg.mpCost;
        this.hp += cfg.healHp;
        if (this.hp >= cfg.playerMaxHp) {
            this.hp = cfg.playerMaxHp;
        }
        this.updateHp();
        this.updateMp();
    },

    start () {

    },

    // update (dt) {},
});
