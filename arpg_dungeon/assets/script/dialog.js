const roleMap = {
    1: {
        name: '勇者',
        url: 'role/hero'
    },
    2: {
        name: '魔王',
        url: 'role/npc'
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        picSprite: cc.Sprite,
        nameLabel: cc.Label,
        textLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.dialog = this.node;
        this.subscribeEvent();
    },

    subscribeEvent() {
        // 监听事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
    },

    unSubscribeEvent() {
        // 监听事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
    },

    init(textDataArr) {
        this.node.active = true;
        this.nowText = ''; // 当前播放的文本
        this.textEnd = true; // 当前对话是否播放完毕
        this.totalTime = 0; // 播放总时长
        this.textIndex = -1;
        this.textDataArr = textDataArr;
        this.node.active = true;
        this.nextTextData();
    },

    nextTextData() {
        if (!this.textEnd) return ;
        if (++this.textIndex < this.textDataArr.length) {
            this.setTextData(this.textDataArr[this.textIndex]);
        } else {
            this.closeDialog();
        }
    },

    setTextData(textData) {
        // 若当前未播放完毕
        if (!this.textEnd) return ;
        this.textEnd = false;

        this.nameLabel.string = roleMap[textData.role].name;
        this.textLabel.string = '';
        this.nowText = textData.content;

        // 加载resources里的资源
        cc.loader.loadRes(roleMap[textData.role].url, cc.SpriteFrame, (err, texture) => {
            if (err) {
                console.log(err);
            } else {
                this.picSprite.spriteFrame = texture;
            }
        });
    },

    onKeyDown(e) {
        switch(e.keyCode) {
            case cc.macro.KEY.space:
                this.nextTextData();
                break;
            default:
                break;
        }
    },

    closeDialog() {
        this.node.active = false;
    },

    start () {

    },

    update (dt) {
        // 若当前没有内容
        if (!this.nowText) return ;
        this.totalTime += dt;
        if (this.totalTime >= 0.1) {
            // 文字未播放完毕时
            if (this.textLabel.string.length < this.nowText.length) {
                this.textLabel.string = this.nowText.slice(0, this.textLabel.string.length + 1);
            } else {
                this.textEnd = true;
                this.nowText = '';
            }
            this.totalTime = 0;
        }
    },

    onDestroy() {
        this.unSubscribeEvent();
    }
});
