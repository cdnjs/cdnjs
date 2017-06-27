/* A JavaScript implementation of the SHA family of hashes, as defined in FIPS PUB 180-2
 * as well as the corresponding HMAC implementation as defined in FIPS PUB 198a
 * Version 1.2 Copyright Brian Turek 2009
 * Distributed under the BSD License
 * See http://jssha.sourceforge.net/ for more information
 *
 * Several functions taken from Paul Johnson
 */

function jsSHA(srcString, inputFormat) {

	jsSHA.charSize = 8;
	jsSHA.b64pad  = "";
	jsSHA.hexCase = 0;

	var sha1 = null;

	var str2binb = function (str) {
		var bin = [];
		var mask = (1 << jsSHA.charSize) - 1;
		var length = str.length * jsSHA.charSize;

		for (var i = 0; i < length; i += jsSHA.charSize) {
			bin[i >> 5] |= (str.charCodeAt(i / jsSHA.charSize) & mask) << (32 - jsSHA.charSize - i % 32);
		}

		return bin;
	};
	
	var hex2binb = function (str) {
		var bin = [];
		var length = str.length;

		for (var i = 0; i < length; i += 2) {
			var num = parseInt(str.substr(i, 2), 16);
			if (!isNaN(num)) {
				bin[i >> 3] |= num << (24 - (4 * (i % 8)));
			} else {
				return "INVALID HEX STRING";
			}
		}

		return bin;
	};

	var strBinLen = null;
	var strToHash = null;

	if ("HEX" === inputFormat) {
		if (0 !== (srcString.length % 2)) {
			return "TEXT MUST BE IN BYTE INCREMENTS";
		}
		strBinLen = srcString.length * 4;
		strToHash = hex2binb(srcString);
	} else if (("ASCII" === inputFormat) ||
		('undefined' === typeof(inputFormat))) {
		strBinLen = srcString.length * jsSHA.charSize;
		strToHash = str2binb(srcString);
	} else {
		return "UNKNOWN TEXT INPUT TYPE";
	}

	var binb2hex = function (binarray) {
		var hex_tab = jsSHA.hexCase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		var length = binarray.length * 4;

		for (var i = 0; i < length; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
		}

		return str;
	};

	var binb2b64 = function (binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		var length = binarray.length * 4;
		for (var i = 0; i < length; i += 3)
		{
			var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) {
					str += jsSHA.b64pad;
				} else {
					str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
				}
			}
		}
		return str;
	};

	var rotl = function (x, n) {
		if (n < 32) {
			return (x <<  n) | (x >>> (32 - n));
		} else {
			return x;
		}
	};

	var parity = function (x, y, z) {
		return x ^ y ^ z;
	};

	var ch = function (x, y, z) {
		return (x & y) ^ (~x & z);
	};

	var maj = function (x, y, z) {
		return (x & y) ^ (x & z) ^ (y & z);
	};

	var safeAdd_2 = function (x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >>> 16) + (y >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	};
	
	var safeAdd_5 = function (a, b, c, d, e) {
		var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF) +
			(e & 0xFFFF);
		var msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
			(e >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	};

	var coreSHA1 = function (message, messageLen) {
		var W = [];
		var a, b, c, d, e;
		var T;
		var H = [
			0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476,	0xc3d2e1f0
		];
		var K = [
			0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
			0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
			0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
			0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
			0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
			0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
			0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
			0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
			0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
			0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
			0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
			0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
			0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
			0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
			0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
			0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6,
			0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6,
			0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6,
			0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6,
			0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6
		];

		message[messageLen >> 5] |= 0x80 << (24 - messageLen % 32);
		message[((messageLen + 1 + 64 >> 9) << 4) + 15] = messageLen;
		var appendedMessageLength = message.length;

		for (var i = 0; i < appendedMessageLength; i += 16) {
			a = H[0];
			b = H[1];
			c = H[2];
			d = H[3];
			e = H[4];

			for (var t = 0; t < 80; t++) {
				if (t < 16) {
					W[t] = message[t + i];
				} else {
					W[t] = rotl(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
				}

				if (t < 20) {
					T = safeAdd_5(rotl(a, 5), ch(b, c, d), e, K[t], W[t]);
				} else if (t < 40) {
					T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, K[t], W[t]);
				} else if (t < 60) {
					T = safeAdd_5(rotl(a, 5), maj(b, c, d), e, K[t], W[t]);
				} else {
					T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, K[t], W[t]);
				}

				e = d;
				d = c;
				c = rotl(b, 30);
				b = a;
				a = T;
			}

			H[0] = safeAdd_2(a, H[0]);
			H[1] = safeAdd_2(b, H[1]);
			H[2] = safeAdd_2(c, H[2]);
			H[3] = safeAdd_2(d, H[3]);
			H[4] = safeAdd_2(e, H[4]);
		}

		return H;
	};

	this.getHash = function (format) {
		var formatFunc = null;
		var message = strToHash.slice();

		if (sha1 === null) {
			sha1 = sha1 = coreSHA1(message, strBinLen);
		}

		switch (format) {
		case "HEX":
			formatFunc = binb2hex;
			break;
		case "B64":
			formatFunc = binb2b64;
			break;
		default:
			return "FORMAT NOT RECOGNIZED";
		}

		return formatFunc(sha1);
	};
	
	this.getHMAC = function (key, inputFormat, outputFormat) {
		var formatFunc = null;
		var keyToUse = null;
		var keyWithIPad = [];
		var keyWithOPad = [];
		var retVal = null;
		var keyBinLen = null;

		switch (outputFormat) {
		case "HEX":
			formatFunc = binb2hex;
			break;
		case "B64":
			formatFunc = binb2b64;
			break;
		default:
			return "FORMAT NOT RECOGNIZED";
		}

		if ("HEX" === inputFormat) {
			if (0 !== (key.length % 2)) {
				return "KEY MUST BE IN BYTE INCREMENTS";
			}
			keyToUse = hex2binb(key);
			keyBinLen = key.length * 4;
		} else if ("ASCII" === inputFormat) {
			keyToUse = str2binb(key);
			keyBinLen = key.length * jsSHA.charSize;
		} else {
			return "UNKNOWN KEY INPUT TYPE";
		}

		if (512 < keyBinLen) {
			keyToUse = coreSHA1(keyToUse, keyBinLen);
			keyToUse[15] &= 0xFFFFFF00;
		} else if (512 > keyBinLen) {
			keyToUse[15] &= 0xFFFFFF00;
		}

		for (var i = 0; i <= 15; i++) {
			keyWithIPad[i] = keyToUse[i] ^ 0x36363636;
			keyWithOPad[i] = keyToUse[i] ^ 0x5C5C5C5C;
		}

		retVal = coreSHA1(keyWithIPad.concat(strToHash), 512 + strBinLen);
		retVal = coreSHA1(keyWithOPad.concat(retVal), 672);

		return (formatFunc(retVal));
	};
}
