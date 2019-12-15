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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        cue: {
            type: cc.Node,
            default: null
        },

        min_dis: 20, // 如果拖动的距离到白球的中心小于这个距离，那么就隐藏球杆，否则显示
        is_move: false // 白球是否在移动
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody);
        this.cue_inst = this.cue.getComponent('cue');// 获取实例
        this.start_x = this.node.x;
        this.start_y = this.node.y;
        // START（点击下去）, MOVE（触摸移动）, ENDED（触摸在节点范围内弹起）, CANCEL（节点范围外弹起）
        this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
            
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            if (this.body.linearVelocity.x !== 0 || this.body.linearVelocity.y !== 0){
                // console.log('球杆不可用');
                return ;
            }
            // console.log(this.body.linearVelocity);
            var w_pos = e.getLocation();// 获取触摸位置
            var dst = this.node.parent.convertToNodeSpaceAR(w_pos);
            var src = this.node.getPosition();
            var dir = dst.sub(src);
            var len = dir.mag();
            if (len < this.min_dis) {
                this.cue.active = false;// 设置球杆为隐藏，可视化属性置为false
                return ;
            }

            this.cue.active = true;
            var r = Math.atan2(dir.y, dir.x);// 反三角函数
            var degree = r * 180 / Math.PI;// 弧度转成度
            degree = 360 - degree;

            // this.cue.rotation = degree + 180;// 球杆转正
            this.cue.angle = -(degree + 180);

            var cue_pos = dst;
            var cue_len_half = this.cue.width * 0.5;
            cue_pos.x += (cue_len_half * dir.x / len);
            cue_pos.y += (cue_len_half * dir.y / len);

            this.cue.setPosition(cue_pos);
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
            if (this.cue.active === false) {
                return ;
            }
            this.cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
            if (this.cue.active === false) {
                return ;
            }
            this.cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);
    },

    reset() {
        this.node.scale = 1;
        this.node.x = this.start_x;
        this.node.y = this.start_y;
        this.body.linearVelocity = cc.v2(0, 0);
        this.body.angularVelocity = 0;
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        // 白球有可能碰球杆，球，桌边，球袋
        if(otherCollider.node.groupIndex === 2) {
            // 隔一秒钟把白球归初始位
            this.node.scale = 0;
            this.scheduleOnce(this.reset.bind(this), 1);
            return ;
        }
    }

    // update (dt) {},
});
