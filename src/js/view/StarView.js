import StarMap from '../entity/StarMap.js';

export default class StarView{

    constructor (star){
        this.star       = star;
        this.elem       = new createjs.Shape;
        this.initElem();
    }

    initElem(){
        const el    = this.elem;
        const size  = 10 * Math.pow(Math.max(0.1,7-this.star.grade)/10,2);
        el.graphics.beginFill("gray").drawCircle(-size/2,-size/2,size);
    }

    updatePos(zoom){
        zoom    = zoom || 1;
        const pos = this.star.position2d(StarMap.MAP_TYPE_ALL,zoom);
        this.elem.x     = pos.x;
        this.elem.y     = pos.y;
    }

}
