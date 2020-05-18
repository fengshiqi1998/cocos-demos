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
        },
        loadNode: {
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

        let mapNameArr = [
            ['00000', '01000', '00000'],
            ['00010', '11110', '00100'],
            ['00000', '10000', '00000']
        ];

        this.loadNode.active = true;

        this.initMapArr(mapNameArr);

    },

    initMapArr(mapNameArr) {
        let mapSt = null;
        let loadCnt = 0;
        for (let i=0;i<mapNameArr.length;i++) {
            for (let j=0;j<mapNameArr[i].length;j++) {
                let mapName = mapNameArr[i][j];
                if (!mapName || mapName === '00000') continue;
                if (!mapSt) mapSt = { i, j };
                loadCnt++;

                cc.loader.loadRes(`map/${mapName}`, cc.TiledMapAsset, (err, asset) => {
                    let node = new cc.Node();
                    let map = node.addComponent(cc.TiledMap);
                    node.anchorX = node.anchorY = 0;
                    node.x = (j - mapSt.j) * 384;
                    node.y = -(i - mapSt.i) * 384;

                    map.tmxAsset = asset;
                    node.parent = this.mapNode;
                    this.initMapNode(node);
                    if (--loadCnt === 0) {
                        this.loadNode.active = false;
                    }
                });
            }
        }
    },

    initMapNode(mapNode) {
        let tiledMap = mapNode.getComponent(cc.TiledMap);
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
                // 添加迷雾
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
