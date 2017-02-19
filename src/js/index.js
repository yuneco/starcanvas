import riot from 'riot';
import RiotControl from 'riotcontrol';
import AppEvent from './event/AppEvent.js';
import UserStore from './store/UserStore.js';
import StarMapStore from './store/StarMapStore.js';
import router from './router.js';

import StarMapView from './view/StarMapView';

class Application {
    constructor() {
        this.controller = RiotControl;
        this.events = AppEvent;
        this.router = router;

    }

    // アプリを初期化します
    // htmlのbody末尾または$(document).readyで呼び出すことを想定しています
    init(opt) {
        // データストアの登録
        // データストアが増えた場合はここに追記します
        this.controller.addStore(new UserStore());
        this.controller.addStore(new StarMapStore());
        // appタグをマウント
        // html直下に置くのはappタグのみとすることを想定しているので、'*'にはしていません
        riot.mount('app');
        // ルーティングの監視をスタート
        this.router.start(true);

    }

    // 以下、任意の共通メソッド・プロパティを追加できます
    // 各タグからはApp.hello()のようにアクセスできます
    hello() {
        alert('hello!hello!');
    }
}

// グローバルに利用する必要があるモジュールをエクスポートします
// 通常のjsはES2015でimportを利用して読み込みができるので、この方法でエクスポートが必要なのはriotタグ内で必要としているモジュールのみです
// npmでインストールした他のモジュールを追加する場合は、下のriotと同様にしてください
window.riot = riot;
window.classes = {
    StarMapView
};
window.App = new Application()
