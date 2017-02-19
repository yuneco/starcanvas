
// 対応するデータエンティティをimport
import StarMap from '../entity/StarMap.js'

export default class StarMapStore {
    constructor() {
        riot.observable(this);
        this.starMap = new StarMap();

        // 以下、受信したい（自分が処理できる）イベントを登録
        this.on(App.events.STARMAP.REQUEST, (opt) => {
            this.loadStarData(opt);
        });

    }

    loadStarData(opt) {
        // 今の所星表のデータは全て静的に保持しているため、
        // 同期的に生成してそのまま返します
        // サーバ側からロードするようにした場合はここを非同期にしてください
        this.starMap.createAllStars();
        this.trigger(App.events.STARMAP.LOADED, this.starMap.data, opt);
    }

};
