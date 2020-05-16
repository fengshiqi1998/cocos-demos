const Input = {};

cc.Class({
    extends: cc.Component,

    properties: {
        nodeSpeed: {
            type: cc.Integer,
            default: 200
        }
    },

    onLoad () {
        this.nodeVelocity = cc.v2(0, 0);
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        this.state = '';
        this.heroAni = this.node.getComponent(cc.Animation);
        this.subscribeEvent();
    },

    start () {

    },

    setState(state) {
        if (this.state === state) return null;
        this.state = state;
        this.heroAni.play(this.state)
        return null;
    },

    heroAnimationPlay() {
        this.heroAni.play(this.state)
    },

    subscribeEvent() {
        // 监听事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);
    },

    unSubscribeEvent() {
        // 监听事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);
    },

    onKeyDown(e) {
        Input[e.keyCode] = 1;
    },

    onKeyUp(e) {
        Input[e.keyCode] = 0;
    },

    // 碰撞回调
    onCollisionEnter(other, self) {
        if (other.node.group === 'smog') {
            other.node.active = false;
            other.node.getComponent(cc.TiledTile).gid = 0; // 擦除效果
        }
    },

    update (dt) {
        if (window.dialog && window.dialog.active) return;

        if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]) {
            this.nodeVelocity.x = -1;
        } else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]) {
            this.nodeVelocity.x = 1;
        } else {
            this.nodeVelocity.x = 0;
        }

        if (Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up]) {
            this.nodeVelocity.y = 1;
        } else if (Input[cc.macro.KEY.s] || Input[cc.macro.KEY.down]) {
            this.nodeVelocity.y = -1;
        } else {
            this.nodeVelocity.y = 0;
        }

        this.lv = this.rigidBody.linearVelocity;

        if (this.nodeVelocity.x) {
            this.lv.y = 0;
            this.lv.x = this.nodeVelocity.x * this.nodeSpeed;
        } else if (this.nodeVelocity.y) {
            this.lv.x = 0;
            this.lv.y = this.nodeVelocity.y * this.nodeSpeed;
        } else {
            this.lv.x = this.lv.y = 0;
        }

        this.rigidBody.linearVelocity = this.lv;


        let state = '';

        if (this.nodeVelocity.x === 1) {
            state = 'hero_right';
        } else if (this.nodeVelocity.x === -1) {
            state = 'hero_left';
        } else if (this.nodeVelocity.y === 1) {
            state = 'hero_up';
        } else if (this.nodeVelocity.y === -1) {
            state = 'hero_down';
        } else {
            state = '';
        }

        if (state) {
            this.setState(state);
        }
    },

    onDestroy() {
        this.unSubscribeEvent();
    }
});
