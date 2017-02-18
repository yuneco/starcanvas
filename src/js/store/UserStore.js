/*
    テータストアのサンプルです。コビーして使ってください。
    タグからはデータストアにはアクセスできません。データが必要な場合、イベントを発行して間接的にアクセスします。
    users.tagの例を参照してください。
*/

// 対応するデータエンティティをimport
import { UserData } from '../entity/UserData.js'

export default class UserDataStore {
    constructor() {
        // イベントを扱えるようにriotに登録
        riot.observable(this);
        // データエンティティを作成
        this.userData = new UserData();

        // 以下、受信したい（自分が処理できる）イベントを登録
        this.on(App.events.USER.REQUEST, (opt) => {
            console.log("request user");
            this.loadUserData(opt);
        });

    }

    loadUserData(opt) {
        // データがリクエストされたので、取得して返す
        // optには追加のパラメータ等が（渡された場合）入ります
        // ここでは単に静的なjsonを使用していますが、実際にはサーバから必要に応じて取得してください
        const sampleData = [{ name: 'alice', age: 23 }, { name: 'bob', age: 21 }];
        // 取得したデータをデータエンティティにセット
        this.userData.applyJSON(sampleData);
        // イベントを発行
        // タグでこのイベントを購読している場合、引数で渡したデータが受け渡されます
        this.trigger(App.events.USER.CHANGED, this.userData.data, opt);
    }

};
