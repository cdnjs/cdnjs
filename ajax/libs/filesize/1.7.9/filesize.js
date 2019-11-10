/**
 * filesize
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2013 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/filesize.js/master/LICENSE>
 * @link http://filesizejs.com
 * @module filesize
 * @version 1.7.9
 */

(function (global) {
	"use strict";

	/**
	 * filesize
	 * 
	 * @param  {Mixed}   arg   String, Int or Float to transform
	 * @param  {Number}  pos   [Optional] Position to round to, defaults to 2 if short is ommitted
	 * @param  {Boolean} short [Optional] Shorthand output, similar to "ls -lh", overrides pos to 1
	 * @return {String}        Readable file size String
	 */
	var filesize = function (arg) {
		var base = 10,
		    bit, i, neg, num, pos, regex, result, short, size, sizes, suffix, z, zero;

		if (arguments[2] !== undefined) {
			pos   = arguments[1];
			short = arguments[2];
		}
		else typeof arguments[1] === "boolean" ? short = arguments[1] : pos = arguments[1];

		if (isNaN(arg) || (pos !== undefined && isNaN(pos))) throw Error("Invalid arguments");

		short  = (short === true);
		pos    = short ? 1 : (pos === undefined ? 2 : parseInt(pos, base));
		num    = Number(arg);
		neg    = (num < 0);
		sizes  = [["B", 1], ["Kb", 128], ["KB", 1024], ["Mb", 131072], ["MB", 1.049e+6], ["Gb", 1.342e+8], ["GB", 1.074e+9], ["Tb", 1.374e+11], ["TB", 1.1e+12], ["Pb", 1.407e+14], ["PB", 1.126e+15]];
		i      = sizes.length;
		result = "";
		regex  = /\.(.*)/;
		bit    = /b$/;
		zero   = /^0$/;

		// Flipping a negative number to determine the size
		if (neg) num = -num;

		// Zero is now a special case because bytes divide by 1
		if (num === 0) {
			if (short) pos = 0;
			result = Number(0).toFixed(pos) + "B";
		}
		else {
			while (i--) {
				size   = sizes[i][1];
				suffix = sizes[i][0];
				if (num >= size) {
					result = (num / size).toFixed(pos);
					if (short) {
						if (bit.test(suffix)) suffix = suffix.toLowerCase();
						suffix = suffix.charAt(0);
						z      = regex.exec(result);
						if (z !== null && z[1] !== undefined && zero.test(z[1])) result = parseInt(result, base);
					}
					result += suffix;
					break;
				}
			}
		}

		return (neg ? "-" : "") + result;
	};

	switch (true) {
		case typeof exports !== "undefined":
			module.exports = filesize;
			break;
		case typeof define === "function":
			define(function () { return filesize; });
			break;
		default:
			global.filesize  = filesize;
	}
})(this);