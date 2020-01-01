cc.Class({
    extends: cc.Component, // 继承组件类才可被编辑器识别，被挂载实例化

    properties: {
      speed: 10, // 背景滚动速度
      bg1: {
          type: cc.Node,
          default: null
      },
      bg2: {
          type: cc.Node,
          default: null
      },
      bg3: {
          type: cc.Node,
          default: null
      },
      
    },

    // onLoad () {},

    // 场景第一次update之前调用，组件实例.start ---> 初始化入口
    start () {
        // this ---> 当前组件实例，this.node--->当前组件实例所在节点
    },

    /**
     * 每次刷新调用
     * @param {*} dt 距离上一次刷新过去的时间
     */
    update (dt) {
        var sy = this.speed * dt;
        this.node.y -= sy;

        var screen_pos = this.bg1.convertToWorldSpaceAR(cc.v2(0, 0));
        if (screen_pos.y <= 0) {
            var temp = this.bg1;
            this.bg1 = this.bg2;
            this.bg2 = this.bg3;
            this.bg3 = temp;
            this.bg3.y = this.bg2.y + 768;
        }
    },
});
