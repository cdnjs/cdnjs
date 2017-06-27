/*
 Copyright (c) 2011-2013, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun position, sunlight phases, and moon position.
 https://github.com/mourner/suncalc
 */

(function (global) { /*jshint smarttabs: true */
	"use strict";

	// export either as a CommonJS module or a global variable

	var SunCalc;

	if (typeof exports !== 'undefined') {
		SunCalc = exports;
	} else {
		SunCalc = global.SunCalc = {};
	}


	// utility shortcuts

	var PI = Math.PI,
	    rad = PI / 180,
	    sin = Math.sin,
	    cos = Math.cos,
	    tan = Math.tan,
	    asin = Math.asin,
	    atan = Math.atan2;


	// date/time constants and conversions

	var dayMs = 1000 * 60 * 60 * 24,
	    J1970 = 2440588,
	    J2000 = 2451545;

	function toJulian(date) {
		return date.valueOf() / dayMs - 0.5 + J1970;
	}
	function fromJulian(j) {
		return new Date((j + 0.5 - J1970) * dayMs);
	}


	// general calculations for position

	var e = rad * 23.4397, // obliquity of the Earth
	    th0 = rad * 280.16,
	    th1 = rad * 360.9856235;

	function getSiderealTime(d, lw) {
		return th0 + th1 * d - lw;
	}

	function getRightAscension(l, b) {
		return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
	}
	function getDeclination(l, b) {
		return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
	}

	function getAzimuth(H, phi, dec) {
		return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
	}
	function getAltitude(H, phi, dec) {
		return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
	}


	// general sun calculations

	function getSolarMeanAnomaly(d) {
		return rad * (357.5291 + 0.98560028 * d);
	}
	function getEquationOfCenter(M) {
		return rad * (1.9148 * sin(M) + 0.0200 * sin(2 * M) + 0.0003 * sin(3 * M));
	}

	var P = rad * 102.9372; // perihelion of the Earth

	function getEclipticLongitude(M, C) {
		return M + C + P + PI;
	}


	// calculations for sun times

	var J0 = 0.0009;

	function getJulianCycle(d, lw) {
		return Math.round(d - J0 - lw / (2 * PI));
	}
	function getApproxTransit(Ht, lw, n) {
		return J0 + (Ht + lw) / (2 * PI) + n;
	}
	function getSolarTransit(ds, M, Ls) {
		return ds + 0.0053 * sin(M) - 0.0069 * sin(2 * Ls);
	}

	function getHourAngle(h, phi, d) {
		return Math.acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
	}


	// calculates sun azimuth and altitude for a given date and latitude/longitude

	SunCalc.getPosition = function (date, lat, lng) {

		var lw  = rad * -lng,
		    phi = rad * lat,
		    d   = toJulian(date) - J2000,

		    M  = getSolarMeanAnomaly(d),
		    C  = getEquationOfCenter(M),
		    Ls = getEclipticLongitude(M, C),

		    dec = getDeclination(Ls, 0),
		    ra  = getRightAscension(Ls, 0),

		    th = getSiderealTime(d, lw),
		    H  = th - ra;

		return {
			azimuth: getAzimuth(H, phi, dec),
			altitude: getAltitude(H, phi, dec)
		};
	};


	// times configuration (angle, morning name, evening name)

	var times = [
		[-0.83, 'sunrise',       'sunset'      ],
		[ -0.3, 'sunriseEnd',    'sunsetStart' ],
		[   -6, 'dawn',          'dusk'        ],
		[  -12, 'nauticalDawn',  'nauticalDusk'],
		[  -18, 'nightEnd',      'night'       ],
		[    6, 'goldenHourEnd', 'goldenHour'  ]
	];

	// adds a custom time to the times config

	SunCalc.addTime = function (angle, riseName, setName) {
		times.push([angle, riseName, setName]);
	};


	// calculates sun times for a given date and latitude/longitude

	SunCalc.getTimes = function (date, lat, lng) {

		var lw  = rad * -lng,
		    phi = rad * lat,
		    d   = toJulian(date) - J2000,

		    n   = getJulianCycle(d, lw),
		    ds  = getApproxTransit(0, lw, n),
		    M   = getSolarMeanAnomaly(ds),
		    C   = getEquationOfCenter(M),
		    Ls  = getEclipticLongitude(M, C),
		    dec = getDeclination(Ls, 0),

		    Jnoon = J2000 + getSolarTransit(ds, M, Ls);

		function getSetJ(h) {
			var w = getHourAngle(h, phi, dec),
			    a = getApproxTransit(w, lw, n);
			return J2000 + getSolarTransit(a, M, Ls);
		}

		var result = {
			solarNoon: fromJulian(Jnoon),
			nadir: fromJulian(Jnoon - 0.5)
		};

		var i, len, time,
		    angle, morningName, eveningName,
		    Jset, Jrise;

		for (i = 0, len = times.length; i < len; i += 1) {

			time = times[i];

			angle = time[0];
			morningName = time[1];
			eveningName = time[2];

			Jset = getSetJ(angle * rad);
			Jrise = Jnoon - (Jset - Jnoon);

			result[morningName] = fromJulian(Jrise);
			result[eveningName] = fromJulian(Jset);
		}

		return result;
	};


	// moon calculations

	function getMoonMeanAnomaly(d) {
		return rad * (134.963 + 13.064993 * d);
	}
	function getMoonEclipticLongitude(d) {
		return rad * (218.316 + 13.176396 * d);
	}
	function getMoonMeanDistance(d) {
		return rad * (93.272 + 13.229350 * d);
	}

	function getMoonLongitude(L, M) {
		return L + rad * 6.289 * sin(M);
	}
	function getMoonLatitude(F) {
		return rad * 5.128 * sin(F);
	}
	function getMoonDistance(M) {
		return 385001 - 20905 * cos(M);
	}


	function getRefractedAltitude(h) {
		return h + 0.017 * rad / tan(h + 10.26 * rad / (h + 5.10 * rad));
	}

	SunCalc.getMoonPosition = function (date, lat, lng) {

		var lw  = rad * -lng,
		    phi = rad * lat,

		    d = toJulian(date) - J2000,

		    L = getMoonEclipticLongitude(d),
		    M = getMoonMeanAnomaly(d),
		    F = getMoonMeanDistance(d),

		    l  = getMoonLongitude(L, M),
		    b  = getMoonLatitude(F),
		    dt = getMoonDistance(M),

		    ra  = getRightAscension(l, b),
			dec = getDeclination(l, b),

		    H  = getSiderealTime(d, lw) - ra;

		return {
			azimuth: getAzimuth(H, phi, dec),
			altitude: getRefractedAltitude(getAltitude(H, phi, dec)),
			distance: dt
		};
	};

}(this));
