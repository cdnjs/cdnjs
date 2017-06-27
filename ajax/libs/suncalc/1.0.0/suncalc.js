/**
 * @preserve Copyright (c) 2011, Vladimir Agafonkin
 * SunCalc is a JavaScript library for calculating sun position and sunlight phases.
 * https://github.com/mourner/suncalc
 */

/*jslint browser: true, node: true, vars: true */

(function (global) {
	"use strict";

	// export either as a CommonJS module or a global variable

	var SunCalc;

	if (typeof exports !== 'undefined') {
		SunCalc = exports;
	} else {
		SunCalc = global.SunCalc = {};
	}


	// utility shortcuts (for better compression)

	var m   = Math,
	    rad = m.PI / 180,
	    sin = m.sin,
	    cos = m.cos;


	// constants for sun calculations

	var dayMs = 1000 * 60 * 60 * 24,
	    J1970 = 2440588,
	    J2000 = 2451545,
	    M0    = rad * 357.5291,
	    M1    = rad * 0.98560028,
	    J0    = 0.0009,
	    J1    = 0.0053,
	    J2    = -0.0069,
	    C1    = rad * 1.9148,
	    C2    = rad * 0.0200,
	    C3    = rad * 0.0003,
	    P     = rad * 102.9372,
	    e     = rad * 23.45,
	    th0   = rad * 280.1600,
	    th1   = rad * 360.9856235;


	// date conversions

	function dateToJulianDate(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
	function julianDateToDate(j) { return new Date((j + 0.5 - J1970) * dayMs); }


	// general sun calculations

	function getJulianCycle(J, lw) { return m.round(J - J2000 - J0 - lw / (2 * m.PI)); }
	function getSolarMeanAnomaly(Js) { return M0 + M1 * (Js - J2000); }
	function getEquationOfCenter(M) { return C1 * sin(M) + C2 * sin(2 * M) + C3 * sin(3 * M); }
	function getEclipticLongitude(M, C) { return M + P + C + m.PI; }
	function getSunDeclination(Ls) { return m.asin(sin(Ls) * sin(e)); }


	// calculations for sun times

	function getApproxTransit(Ht, lw, n) { return J2000 + J0 + (Ht + lw) / (2 * m.PI) + n; }
	function getSolarTransit(Js, M, Ls) { return Js + (J1 * sin(M)) + (J2 * sin(2 * Ls)); }
	function getHourAngle(h, phi, d) { return m.acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }


	// calculations for sun position

	function getRightAscension(Ls) { return m.atan2(sin(Ls) * cos(e), cos(Ls)); }
	function getSiderealTime(J, lw) { return th0 + th1 * (J - J2000) - lw; }
	function getAzimuth(H, phi, d) { return m.atan2(sin(H), cos(H) * sin(phi) - m.tan(d) * cos(phi)); }
	function getAltitude(H, phi, d) { return m.asin(sin(phi) * sin(d) + cos(phi) * cos(d) * cos(H)); }


	// times configuration (angle, morning name, evening name)

	var times = [[-0.83, 'sunrise',       'sunset'      ],
	             [ -0.3, 'sunriseEnd',    'sunsetStart' ],
	             [   -6, 'dawn',          'dusk'        ],
	             [  -12, 'nauticalDawn',  'nauticalDusk'],
	             [  -18, 'nightEnd',      'night'       ],
	             [    6, 'goldenHourEnd', 'goldenHour'  ]];


	// adds a custom time to the times config

	SunCalc.addTime = function (angle, riseName, setName) {
		times.push([angle, riseName, setName]);
	};


	// calculates sun times for a given date and latitude/longitude

	SunCalc.getTimes = function (date, lat, lng) {

		var lw    = rad * -lng,
		    phi   = rad * lat,
		    J     = dateToJulianDate(date),
		    n     = getJulianCycle(J, lw),
		    Js    = getApproxTransit(0, lw, n),
		    M     = getSolarMeanAnomaly(Js),
		    C     = getEquationOfCenter(M),
		    Ls    = getEclipticLongitude(M, C),
		    d     = getSunDeclination(Ls),
		    Jnoon = getSolarTransit(Js, M, Ls);

		function getSetJ(h) {
			var w = getHourAngle(h, phi, d),
			    a = getApproxTransit(w, lw, n);

			return getSolarTransit(a, M, Ls);
		}

		var result = {solarNoon: julianDateToDate(Jnoon)};

		var i, len, time, angle, morningName, eveningName, Jset, Jrise;
		for (i = 0, len = times.length; i < len; i += 1) {
			time = times[i];

			angle       = time[0];
			morningName = time[1];
			eveningName = time[2];

			Jset  = getSetJ(angle * rad);
			Jrise = Jnoon - (Jset - Jnoon);

			result[morningName] = julianDateToDate(Jrise);
			result[eveningName] = julianDateToDate(Jset);
		}

		return result;
	};


	// calculates sun azimuth and altitude for a given date and latitude/longitude

	SunCalc.getPosition = function (date, lat, lng) {

		var lw  = rad * -lng,
		    phi = rad * lat,
		    J   = dateToJulianDate(date),
		    M   = getSolarMeanAnomaly(J),
		    C   = getEquationOfCenter(M),
		    Ls  = getEclipticLongitude(M, C),
		    d   = getSunDeclination(Ls),
		    a   = getRightAscension(Ls),
		    th  = getSiderealTime(J, lw),
		    H   = th - a;

		return {
			azimuth:  getAzimuth(H, phi, d),
			altitude: getAltitude(H, phi, d)
		};
	};

}(this));
