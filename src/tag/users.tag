<users>

  <ul>
    <li each={ items }>
         { name } { age }
    </li>
  </ul>

<script>
    // データストアとやりとりをするタグのサンプルです
    // App.controllerを通じてイベントを発行・受信することでデータストアへのアクセスを間接的に行います

    const self = this;
    // イベントの発行
    this.on("mount", function(){
        App.controller.trigger(App.events.USER.REQUEST,{from:0,to:10});
    });

    // イベントの受信
    App.controller.on(App.events.USER.CHANGED, function(items,opt) {
        console.log(items,opt);
        self.items = items;
        self.update();
    })


</script>

</users>


