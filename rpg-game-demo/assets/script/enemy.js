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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.animation = this.node.getComponent(cc.Animation);
    },

    init(hp) {
        this.setHp(hp);
        this.node.active = true;
        window.game.nextBtnNode.active = false;
    },

    setHp(hp) {
        this.hp = hp;
        this.updateHp();
    },
    
    updateHp() {
        this.hpLabel.string = `${this.hp}hp`;
    },

    start () {

    },
    
    hurt(num) {
        this.hp -= num;
        if(this.hp <= 0) {
            window.game.nextBtnNode.active = true;
            this.node.active = false;
            return;
        }
        this.updateHp();
        this.animation.play('hurt');
    },

    onHurtEnd() {
        if (window.game.player.ap <= 0) {
            this.attack();
        }
    },

    onAttackEnd() {
        window.game.player.hurt(cfg.enemyAtk);
        window.game.player.setAp(cfg.playerMaxAp);
    },

    attack() {
        this.animation.play('attack');
    }
    // update (dt) {},
});
