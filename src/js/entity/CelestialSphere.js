
	//see:
	// http://hokori.net/archives/170


	export class CelestialSphere {

		private static var STARS:Array = [];

		//0=全天（赤緯-60～60の範囲のみ） メルカトル図法 / 1=北天 正距方位図法 / 2=南天 正距方位図法
		public static const MAP_TYPE_ALL = "all";
		public static const MAP_TYPE_NORTH = "north";
		public static const MAP_TYPE_SOUTH = "south";
		private const DEG2RAD = Math.PI / 180;

		public function CelestialSphere() {
			// constructor code

			if(STARS.length == 0){
				STARS = StarMap.createAllStars();
			}
			//this.renderStars3d(this,"StarElem",2000);

		}

		public function renderStars(canvas: MovieClip, starMcName: String, mapType: String, zoom: Number) {
			var mcClass:Class = Class(getDefinitionByName(starMcName));
			for each(var elem: Object in STARS) {
				var st = elem as Star;
				var pos: Point = this.angle2Position(st.ra, st.dec, mapType, zoom);
				var mc:MovieClip = new mcClass();
				canvas.addChild(mc);
				var scale = Math.pow(Math.max(0.1,7-st.grade)/10,2);
				mc.scaleX = scale;
				mc.scaleY = scale;
				mc.x	= pos.x ;
				mc.y	= pos.y ;
				//trace("x="+pos.x+"  y="+pos.y);
			}

		}

		public function renderStars3d(canvas: MovieClip, starMcName: String, zoom: Number) {
			var mcClass:Class = Class(getDefinitionByName(starMcName));
			for each(var elem: Object in STARS) {
				var st = elem as Star;
				var vec: Vector3D = this.angle2vector3d(st.ra, st.dec, st.parallax, zoom);
				var mc:MovieClip = new mcClass();
				canvas.addChild(mc);
				var scale = Math.max(0.3,6.3-st.grade) * (Math.min(10,1/st.parallax));
				mc.scaleX = scale;
				mc.scaleY = scale;
				mc.x	= vec.x ;
				mc.y	= vec.y ;
				mc.z	= vec.z ;
				//trace("x="+vec.x+"  y="+vec.y+"  z="+vec.z);
			}

		}

		//赤緯・赤経を2次元座標上の位置に変換して返します
		private function angle2Position(ra: Number, dec: Number, mapType: String, zoom: Number): Point {
			var pos: Point = new Point();
			if (mapType == MAP_TYPE_ALL) {
				pos.x = -ra * zoom;
				pos.y = dec * zoom;
			} else if (mapType == MAP_TYPE_NORTH) {
				pos.x = -Math.cos((ra - 270) * DEG2RAD) * (90 - dec) * zoom;
				pos.y = Math.sin((ra - 270) * DEG2RAD) * (90 - dec) * zoom;
			} else if (mapType == MAP_TYPE_SOUTH) {
				pos.x = Math.cos((ra - 270) * DEG2RAD) * (-90 - dec) * zoom;
				pos.y = Math.sin((ra - 270) * DEG2RAD) * (-90 - dec) * zoom;
			}
			return pos;
		}

		//赤緯(dec)・赤経(ra)・年周視差を元に3次元座標上の位置を返します
		private function angle2vector3d(ra: Number, dec: Number, parallax:Number, zoom: Number): Vector3D {
			var vec:Vector3D	= new Vector3D();
			var r:Number		= 1 / parallax;
			vec.x				= r * Math.sin(dec * DEG2RAD) * Math.cos(ra * DEG2RAD) * zoom;
			vec.y				= r * Math.sin(dec * DEG2RAD) * Math.sin(ra * DEG2RAD) * zoom;
			vec.z				= r * Math.cos(dec * DEG2RAD) * zoom * 1;
			return vec;
		}


	}



}
