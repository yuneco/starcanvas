import Hips from './starmap/HipData.js';
import Star from './starmap/Star.js';

export default class StarMap {
    //赤経 / 赤緯 / 年周視差 / HIP / 視等級

    constructor (){
        this.data   = {
            stars       :   []
        }
    }

    static get MAP_TYPE_ALL(){return 'all'}
    static get MAP_TYPE_NORTH(){return 'north'}
    static get MAP_TYPE_SOUTH(){return 'south'}

    createAllStars() {
        if(this.data.stars.length){return;}

        const COL_RA	= 0;
        const COL_DEC	= 1;
        const COL_PARA	= 2;
        const COL_HIP	= 3;
        const COL_MAG	= 4;

        const MAX_COUNT = 4000;

        const stars = [];
        let count	= 0;
        Hips.forEach((v,i)=>{
            if(i >= MAX_COUNT){return;}
            stars.push(new Star(v[COL_HIP],v[COL_RA],v[COL_DEC],v[COL_MAG],v[COL_PARA]));
        });
        this.data.stars = stars;
    }


}
