import StarMap from '../entity/StarMap.js';
import StarView from './StarView.js';

export default class StarMapView{

    constructor (canvasid,stars){
        this.stars       = stars;
        this.starViews   = [];

        this.stage       = new createjs.Stage(canvasid);
        this.skyView    = new createjs.Container();
        this.stage.addChild(this.skyView);
        this.skyView.x = this.stage.canvas.width/2;
        this.skyView.y = this.stage.canvas.height/2;

        this.initElems();
        this.updatePos(1.0);
    }

    initElems(){
        const stars     = this.stars;
        stars.forEach((v,i)=>{
            const sv = new StarView(v);
            this.starViews.push(sv);
            this.skyView.addChild(sv.elem);
        })
    }

    updatePos(zoom){
        const svs     = this.starViews;
        svs.forEach((sv,i)=>{
            sv.updatePos(zoom);
        });
        this.stage.update();
    }



}
