/*
    イベント名の定義です。index.jsのApplicationクラスから読み込んでいいるため、
    任意の場所からApp.eventsでアクセスできます。

    イベントは「データストア名.イベント名」の形式で定義します。
    # 共通的なイベントについてはこの限りではありません。自由に設計してください
*/

const AppEvent = {

    USER:{
        REQUEST     :   'user_request'
        ,CHANGED    :   'user_changed'
    }

    ,STARMAP:{
        REQUEST     :   'starmap_request'
        ,LOADED     :   'starmap_loaded'
    }

};

module.exports = AppEvent;
