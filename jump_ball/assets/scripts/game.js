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
        ballNode: cc.Node,
        blockPrefab: cc.Prefab,
        blockAreaNode: cc.Node,
        scoreLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.setFrameRate(30);
        this.initPhysics();

        this.node.on('touchstart', this.boost, this); // 给小球加速（boost推动）

        this.isLoad = true;
        this.score = 0;
        this.gameStart = 0;

        this.initBlock();

    },

    onDestroy() {
        this.node.off('touchstart', this.boost, this);
    },

    // 初始化跳板
    initBlock() {
        this.lastBlockPosX = this.ballNode.x; // 最后一个方块的x坐标
        this.blockNodeArr = [];
        for(let i=0;i<5;i++) {
            let blockNode = cc.instantiate(this.blockPrefab);
            blockNode.x = this.lastBlockPosX;
            blockNode.y = 0;

            let width = 80 + (Math.random() > 0.5 ? 1: -1) * (40 * Math.random());
            blockNode.getComponent('block').init(width);

            this.blockAreaNode.addChild(blockNode);
            this.blockNodeArr.push(blockNode);

            this.lastBlockPosX += 200;
        }
    },

    // 初始化物理引擎
    initPhysics() {
        let manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, -1600);
    },

    // 加速
    boost() {
        if (this.ballNode.getComponent('ball').initVel) {
            let rigidbody = this.ballNode.getComponent(cc.RigidBody);
            rigidbody.linearVelocity = cc.v2(0, -1200); // 给刚体设置线性速度
            this.gameStart = 1;
        }
    },

    // 刷新得分
    incrScore(incr) {
        this.score += incr;
        this.scoreLabel.string = this.score;
    },

    // 获取最后一块跳板的位置
    getLastBlockPosX() {
        let posX = 0;
        for (let blockNode of this.blockNodeArr) {
            if (blockNode.x > posX) {
                posX = blockNode.x;
            }
        }
        return posX;
    },

    gameOver() {
        // loadScene之前先用if条件句判断一下之前是否load过
        if (this.isLoad) {
            // this.ballNode.stopAllActions();
            cc.director.loadScene('game');
            this.isLoad = false;
        }
    },

    // start () {},

    update (dt) {
        if (this.gameStart) {
            let speed = -450 * dt;
            for (let blockNode of this.blockNodeArr) {
                blockNode.x += speed;

                if (blockNode.x < -cc.winSize.width / 2 - blockNode.width / 2) {
                    this.incrScore(1);
                    let width = 80 + (Math.random() > 0.5 ? 1: -1) * (40 * Math.random());
                    blockNode.getComponent('block').init(width);
                    blockNode.x = this.getLastBlockPosX() + 200;
                }
            }
        }
        if (this.ballNode.y < -cc.winSize.height/2) {
            console.log('game over');
            this.gameOver();
        }
    },
});
