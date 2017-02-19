import StarMap from '../StarMap.js';

export default class  Star {

    constructor(hip, ra, dec, grade, parallax) {
        this.hip = hip;
        this.ra = ra;
        this.dec = dec;
        this.grade = grade;
        this.parallax = parallax;
    }

    position2d(mapType, zoom) {
        const pos       = {x:0,y:0};
        const ra        = this.ra;
        const dec       = this.dec;
        const DEG2RAD   = Math.PI / 180;

        if (mapType == StarMap.MAP_TYPE_ALL) {
            pos.x = -ra * zoom;
            pos.y = dec * zoom;
        } else if (mapType == StarMap.MAP_TYPE_NORTH) {
            pos.x = -Math.cos((ra - 270) * DEG2RAD) * (90 - dec) * zoom;
            pos.y = Math.sin((ra - 270) * DEG2RAD) * (90 - dec) * zoom;
        } else if (mapType == StarMap.MAP_TYPE_SOUTH) {
            pos.x = Math.cos((ra - 270) * DEG2RAD) * (-90 - dec) * zoom;
            pos.y = Math.sin((ra - 270) * DEG2RAD) * (-90 - dec) * zoom;
        }
        return pos;
}


}
