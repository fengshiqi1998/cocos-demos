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
        enemyNode: cc.Node,
        playerNode: cc.Node,
        nextBtnNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.game = this;
        this.enemy = this.enemyNode.getComponent('enemy');
        this.player = this.playerNode.getComponent('player');
    },

    start () {
        this.enemy.init(cfg.enemyMaxHp);
        this.player.init(cfg.playerMaxHp, cfg.playerMaxMp, cfg.playerMaxAp);
    },
    playerAttack() {
        if (this.player.ap >= cfg.apCost) {
            this.player.costAp(cfg.apCost);
            this.enemy.hurt(cfg.playerAtk);
            this.player.increaseMp(cfg.incrMp);
        } else {
            console.log('no ap');
        }
    },

    playerHeal() {
        if (this.player.mp >= cfg.mpCost && this.player.ap >= cfg.apCost) {
            this.player.costAp(cfg.apCost);
            this.player.heal();
        }
    },

    nextRoom() {
        this.node.getComponent(cc.Animation).play('interlude');
    },

    onInterlude() {
        this.enemy.init(cfg.enemyMaxHp);
        this.player.init(cfg.playerMaxHp, cfg.playerMaxMp, cfg.playerMaxAp);
    },

    gameOver() {
        console.log('game over');
        cc.director.loadScene('game');
    }
    // update (dt) {},
});
