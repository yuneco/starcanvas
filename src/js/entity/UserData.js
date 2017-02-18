/*
    データストアに対応するデータエンティティを定義するクラスです。
    サーバから入出力するデータをクライアントアプリ側で想定している形式に変換します。
    # サンプルでは特に変換はせず、そのまま突っ込んでいます
*/

export class UserData{
  constructor(){
      this.data = null;
   }

  applyJSON(json){
    this.data = json;
  }
}
