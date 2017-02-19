<starmap>
    <span> star count = { countStar() } </span>
    <button onclick={ posStar } >pos</button>
    <canvas id="starmap-view" width="600" height="400"></canvas>

<script>
    const self = this;

    // イベントの発行
    this.on("mount", function(){
        App.controller.trigger(App.events.STARMAP.REQUEST);
    });

    // イベントの受信
    App.controller.on(App.events.STARMAP.LOADED, function(items,opt) {
        self.stars = items.stars;
        self.view  = new classes.StarMapView('starmap-view',self.stars);
        self.update();
    })

    countStar(){
        return this.stars ? this.stars.length : 'NOT LOADED YET!';
    }

    posStar(){
        console.log( this.stars[0].position2d('all',1) );
    }

</script>

</starmap>
