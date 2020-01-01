cc.Class({
    extends: cc.Component,

    properties: {
        bullet_prefab: {
            type: cc.Prefab,
            default: null
        },

        bullet_root: {
            type: cc.Node,
            default: null
        },

        shoot_time: 0.3, // 每隔0.3秒发射一次
    },

    // onLoad () {},

    start () {
        this.now_time = this.shoot_time;
        // cocos creator 引擎API：监听事件
        this.node.on(cc.Node.EventType.TOUCH_START, function(e) {

        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            var screen_pos = e.getLocation();
            var pos = this.node.parent.convertToNodeSpaceAR(screen_pos); // 转到父节点坐标系下
            this.node.setPosition(pos);
        }.bind(this), this);
        // 放弃触摸节点
        this.node.on(cc.Node.EventType.TOUCH_END, function(e) {

        }.bind(this), this);
        // 触摸节点外
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {

        }.bind(this), this);
    },

    shootBullet() {
        var b = cc.instantiate(this.bullet_prefab); // 实例化一个预制体节点，或者克隆
        this.bullet_root.addChild(b);

        var pos = this.node.getPosition(); // 获取当前节点（飞机）的位置
        pos.y += 55;
        b.setPosition(pos); // 设置新生成的子弹的位置
    },

    update (dt) {
        this.now_time += dt;
        if (this.now_time >= this.shoot_time) {
            this.now_time = 0;
            this.shootBullet();
        }
    },
});
