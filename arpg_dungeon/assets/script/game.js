cc.Class({
    extends: cc.Component,

    properties: {
        isDebug: false,
        isCollisionDebug: false,
        mapNode: {
            type: cc.Node,
            default: null
        },
        dialogNode: {
            type: cc.Node,
            default: null
        }
    },

    onLoad () {
        const phy = cc.director.getPhysicsManager();
        const colli = cc.director.getCollisionManager();

        phy.enabled = true;
        phy.debugDrawFlags = this.isDebug;
        phy.gravity = cc.v2(0, 0);

        colli.enabled = true;
        colli.enabledDebugDraw = this.isCollisionDebug;

    },

    addWallToTiled(tiledMap) {
        let tiledSize = tiledMap.getTileSize();

        const wall = tiledMap.getLayer('wall');
        const wallSize = wall.getLayerSize();

        const smog = tiledMap.getLayer('smog');
        smog.node.active = true;


        for (let i=0;i<wallSize.width;i++) {
            for (let j=0;j<wallSize.height;j++) {
                let tiled = wall.getTiledTileAt(i, j, true);
                // 若图块存在
                if (tiled.gid !== 0) {
                    tiled.node.group = 'wall';

                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);// 偏移量
                    collider.size = tiledSize;
                    collider.apply();
                }

                tiled = smog.getTiledTileAt(i, j, true);
                if (tiled.gid !== 0) {
                    tiled.node.group = 'smog';
                    let collider = tiled.node.addComponent(cc.BoxCollider);
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);// 偏移量
                    collider.size = tiledSize;
                }
            }
        }
    },

    start () {
        for (let mapNode of this.mapNode.children) {
            let tiledMap = mapNode.getComponent(cc.TiledMap);
            this.addWallToTiled(tiledMap);
        }
        // this.dialog = this.dialogNode.getComponent('dialog');
        // this.dialog.init([
        //     { role: 2, content: '...............' },
        //     { role: 1, content: '......' },
        //     { role: 1, content: '你是谁？' },
        //     { role: 2, content: '我是魔王' },
        //     { role: 1, content: '我是勇者......' },
        //     { role: 2, content: '我是魔王' }
        // ]);
    },

    // update (dt) {},
});
