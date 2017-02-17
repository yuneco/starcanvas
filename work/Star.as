package com.nekobooks.awoy {
	
	public class Star {

		public var hip: Number = 0;
		public var ra: Number = 0;
		public var dec: Number = 0;
		public var grade: Number = 0;
		public var parallax: Number = 0;

		public function Star(hip: Number, ra: Number, dec: Number, grade: Number, parallax: Number) {
			this.hip = hip;
			this.ra = ra;
			this.dec = dec;
			this.grade = grade;
			this.parallax = parallax;
		}

	}
	
}
