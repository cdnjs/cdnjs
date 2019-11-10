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


	// shortcuts for easier to read formulas

	var PI   = Math.PI,
	    rad  = PI / 180,
	    sin  = Math.sin,
	    cos  = Math.cos,
	    tan  = Math.tan,
	    asin = Math.asin,
	    atan = Math.atan2,
	    acos = Math.acos;


	// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


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
	function toDays(date) {
		return toJulian(date) - J2000;
	}


	// general calculations for position

	var e = rad * 23.4397; // obliquity of the Earth

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
	function getSiderealTime(d, lw) {
		return rad * (280.16 + 360.9856235 * d) - lw;
	}


	// general sun calculations

	function getSolarMeanAnomaly(d) {
		return rad * (357.5291 + 0.98560028 * d);
	}
	function getEquationOfCenter(M) {
		return rad * (1.9148 * sin(M) + 0.0200 * sin(2 * M) + 0.0003 * sin(3 * M));
	}
	function getEclipticLongitude(M, C) {
		var P = rad * 102.9372; // perihelion of the Earth
		return M + C + P + PI;
	}
	function getSunCoords(d) {

		var M = getSolarMeanAnomaly(d),
		    C = getEquationOfCenter(M),
		    L = getEclipticLongitude(M, C);

		return {
			dec: getDeclination(L, 0),
		    ra: getRightAscension(L, 0)
		};
	}


	// calculates sun position for a given date and latitude/longitude

	SunCalc.getPosition = function (date, lat, lng) {

		var lw  = rad * -lng,
		    phi = rad * lat,
		    d   = toDays(date),

		    c  = getSunCoords(d),
		    th = getSiderealTime(d, lw),
		    H  = th - c.ra;

		return {
			azimuth: getAzimuth(H, phi, c.dec),
			altitude: getAltitude(H, phi, c.dec)
		};
	};


	// sun times configuration (angle, morning name, evening name)

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


	// calculations for sun times

	var J0 = 0.0009;

	function getJulianCycle(d, lw) {
		return Math.round(d - J0 - lw / (2 * PI));
	}
	function getApproxTransit(Ht, lw, n) {
		return J0 + (Ht + lw) / (2 * PI) + n;
	}
	function getSolarTransitJ(ds, M, L) {
		return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L);
	}
	function getHourAngle(h, phi, d) {
		return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
	}


	// calculates sun times for a given date and latitude/longitude

	SunCalc.getTimes = function (date, lat, lng) {

		var lw  = rad * -lng,
		    phi = rad * lat,
		    d   = toDays(date),

		    n  = getJulianCycle(d, lw),
		    ds = getApproxTransit(0, lw, n),

		    M = getSolarMeanAnomaly(ds),
		    C = getEquationOfCenter(M),
		    L = getEclipticLongitude(M, C),

		    dec = getDeclination(L, 0),

		    Jnoon = getSolarTransitJ(ds, M, L);


		// returns set time for the given sun altitude
		function getSetJ(h) {
			var w = getHourAngle(h, phi, dec),
			    a = getApproxTransit(w, lw, n);

			return getSolarTransitJ(a, M, L);
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


	// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

	function getMoonCoords(d) { // geocentric ecliptic coordinates of the moon

		var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
		    M = rad * (134.963 + 13.064993 * d), // mean anomaly
		    F = rad * (93.272 + 13.229350 * d),  // mean distance

		    l  = L + rad * 6.289 * sin(M), // longitude
		    b  = rad * 5.128 * sin(F),     // latitude
		    dt = 385001 - 20905 * cos(M);  // distance to the moon in km

		return {
			ra: getRightAscension(l, b),
			dec: getDeclination(l, b),
			dist: dt
		};
	}

	SunCalc.getMoonPosition = function (date, lat, lng) {

		var lw  = rad * -lng,
		    phi = rad * lat,
		    d   = toDays(date),

		    c = getMoonCoords(d),
		    H = getSiderealTime(d, lw) - c.ra,
		    h = getAltitude(H, phi, c.dec);

		// altitude correction for refraction
		h = h + 0.017 * rad / tan(h + 10.26 * rad / (h + 5.10 * rad));

		return {
			azimuth: getAzimuth(H, phi, c.dec),
			altitude: h,
			distance: c.dist
		};
	};


	// calculations for illuminated fraction of the moon,
	// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas

	SunCalc.getMoonFraction = function (date) {

		var d = toDays(date),
		    s = getSunCoords(d),
		    m = getMoonCoords(d),

		    sdist = 1.49598e8, // distance from Earth to Sun

		    phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
		    inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi));

		return (1 + cos(inc)) / 2;
	};

}(this));
