/* A JavaScript implementation of the SHA family of hashes, as defined in FIPS PUB 180-2
 * Version 1.1 Copyright Brian Turek 2008
 * Distributed under the BSD License
 * See http://jssha.sourceforge.net/ for more information
 *
 * Several functions taken from Paul Johnson
 */

/*
 * Int_64 is a object/container for 2 32-bit numbers emulating a 64-bit number
 *
 * @constructor
 * @param {Number} msint_32 The most significant 32-bits of a 64-bit number
 * @param {Number} lsint_32 The least significant 32-bits of a 64-bit number
 */
function Int_64(msint_32, lsint_32) {
	this.highOrder = msint_32;
	this.lowOrder = lsint_32;
}

/*
 * jsSHA is the workhorse of the library.  Instantiate it with the string to be hashed
 * as the parameter
 *
 * @constructor
 * @param {String} srcString The string to be hashed
 */
function jsSHA(srcString) {

	/*
	 * Configurable variables. Defaults typically work
	 */
	jsSHA.charSize = 8; /* Number of Bits Per character (8 for ASCII, 16 for Unicode)	  */
	jsSHA.b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
	jsSHA.hexCase = 0; /* hex output format. 0 - lowercase; 1 - uppercase		*/

	var sha1 = null;
	var sha224 = null;
	var sha256 = null;
	var sha384 = null;
	var sha512 = null;

	/*
	 * Convert a string to an array of big-endian words
	 * If charSize is ASCII, characters >255 have their hi-byte silently ignored.
	 *
	 * @param {String} str String to be converted to binary representation
	 * @return Integer array representation of the parameter
	 */
	var str2binb = function (str) {
		var bin = [];
		var mask = (1 << jsSHA.charSize) - 1;
		var length = str.length * jsSHA.charSize;

		for (var i = 0; i < length; i += jsSHA.charSize) {
			bin[i >> 5] |= (str.charCodeAt(i / jsSHA.charSize) & mask) << (32 - jsSHA.charSize - i % 32);
		}

		return bin;
	};

    var strBinLen = srcString.length * jsSHA.charSize;
	var strToHash = str2binb(srcString);

	/*
	 * Convert an array of big-endian words to a hex string.
	 *
	 * @private
	 * @param {Array} binarray Array of integers to be converted to hexidecimal representation
	 * @return Hexidecimal representation of the parameter in String form
	 */
	var binb2hex = function (binarray) {
		var hex_tab = jsSHA.hexCase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		var length = binarray.length * 4;

		for (var i = 0; i < length; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
		}

		return str;
	};

	/*
	 * Convert an array of big-endian words to a base-64 string
	 *
	 * @private
	 * @param {Array} binarray Array of integers to be converted to base-64 representation
	 * @return Base-64 encoded representation of the parameter in String form
	 */
	var binb2b64 = function (binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWxYZabcdefghijklmnopqrstuvwxyz0123456789+/";
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

	/*
	 * The 32-bit implementation of circular rotate left
	 *
	 * @private
	 * @param {Number} x The 32-bit integer argument
	 * @param {Number} n The number of bits to shift
	 * @return The x shifted circularly by n bits
	 */
	var rotl_32 = function (x, n) {
		if (n < 32) {
			return (x <<  n) | (x >>> (32 - n));
		} else {
			return x;
		}
	};

	/*
	 * The 32-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {Number} x The 32-bit integer argument
	 * @param {Number} n The number of bits to shift
	 * @return The x shifted circularly by n bits
	 */
	var rotr_32 = function (x, n) {
		if (n < 32) {
			return (x >>> n) | (x << (32 - n));
		} else {
			return x;
		}
	};

	/*
	 * The 64-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {Number} n The number of bits to shift
	 * @return The x shifted circularly by n bits
	 */
	var rotr_64 = function (x, n) {
		if (n < 32) {
			return new Int_64(
					(x.highOrder >>> n) | (x.lowOrder << (32 - n)),
					(x.lowOrder >>> n) | (x.highOrder << (32 - n))
				);
		} else if (n === 32) { // Apparently in JS, shifting a 32-bit value by 32 yields original value
			return new Int_64(x.lowOrder, x.highOrder);
		} else {
			return rotr_64(rotr_64(x, 32), n - 32);
		}
	};

	/*
	 * The 32-bit implementation of shift right
	 *
	 * @private
	 * @param {Number} x The 32-bit integer argument
	 * @param {Number} n The number of bits to shift
	 * @return The x shifted by n bits
	 */
	var shr_32 = function (x, n) {
		if (n < 32) {
			return x >>> n;
		} else {
			return 0;
		}
	};

	/*
	 * The 64-bit implementation of shift right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {Number} n The number of bits to shift
	 * @return The x shifted by n bits
	 */
	var shr_64 = function (x, n) {
		if (n < 32) {
			return new Int_64(
					x.highOrder >>> n,
					x.lowOrder >>> n | (x.highOrder << (32 - n))
				);
		} else if (n === 32) { // Apparently in JS, shifting a 32-bit value by 32 yields original value
			return new Int_64(0, x.highOrder);
		} else {
			return shr_64(shr_64(x, 32), n - 32);
		}
	};

	/*
	 * The 32-bit implementation of the NIST specified Parity function
	 *
	 * @private
	 * @param {Number} x The first 32-bit integer argument
	 * @param {Number} y The second 32-bit integer argument
	 * @param {Number} z The third 32-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var parity_32 = function (x, y, z) {
		return x ^ y ^ z;
	};

	/*
	 * The 32-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {Number} x The first 32-bit integer argument
	 * @param {Number} y The second 32-bit integer argument
	 * @param {Number} z The third 32-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var ch_32 = function (x, y, z) {
		return (x & y) ^ (~x & z);
	};

	/*
	 * The 64-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var ch_64 = function (x, y, z) {
		return new Int_64(
				(x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
				(x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
			);
	};

	/*
	 * The 32-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {Number} x The first 32-bit integer argument
	 * @param {Number} y The second 32-bit integer argument
	 * @param {Number} z The third 32-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var maj_32 = function (x, y, z) {
		return (x & y) ^ (x & z) ^ (y & z);
	};

	/*
	 * The 64-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var maj_64 = function (x, y, z) {
		return new Int_64(
				(x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
				(x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
			);
	};

	/*
	 * The 32-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {Number} x The 32-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var sigma0_32 = function (x) {
		return rotr_32(x, 2) ^ rotr_32(x, 13) ^ rotr_32(x, 22);
	};

	/*
	 * The 64-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var sigma0_64 = function (x) {
		var rotr28 = rotr_64(x, 28);
		var rotr34 = rotr_64(x, 34);
		var rotr39 = rotr_64(x, 39);

		return new Int_64(
				rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
				rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder);
	};

	/*
	 * The 32-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {Number} x The 32-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var sigma1_32 = function (x) {
		return rotr_32(x, 6) ^ rotr_32(x, 11) ^ rotr_32(x, 25);
	};

	/*
	 * The 64-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var sigma1_64 = function (x) {
		var rotr14 = rotr_64(x, 14);
		var rotr18 = rotr_64(x, 18);
		var rotr41 = rotr_64(x, 41);

		return new Int_64(
				rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
				rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder);
	};

	/*
	 * The 32-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {Number} x The 32-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var gamma0_32 = function (x) {
		return rotr_32(x, 7) ^ rotr_32(x, 18) ^ shr_32(x, 3);
	};

	/*
	 * The 64-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var gamma0_64 = function (x) {
		var rotr1 = rotr_64(x, 1);
		var rotr8 = rotr_64(x, 8);
		var shr7 = shr_64(x, 7);

		return new Int_64(
				rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
				rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder);
	};

	/*
	 * The 32-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {Number} x The 32-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var gamma1_32 = function (x) {
		return rotr_32(x, 17) ^ rotr_32(x, 19) ^ shr_32(x, 10);
	};

	/*
	 * The 64-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return The NIST specified output of the function
	 */
	var gamma1_64 = function (x) {
		var rotr19 = rotr_64(x, 19);
		var rotr61 = rotr_64(x, 61);
		var shr6 = shr_64(x, 6);

		return new Int_64(
				rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
				rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder);
	};

	/*
	 * Add 32-bit integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Number} x The first 32-bit integer argument to be added
	 * @param {Number} y The second 32-bit integer argument to be added
	 * @return The sum of x + y
	 */
	var safeAdd_32 = function (x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >>> 16) + (y >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	};

	/*
	 * Add 64-bit integers, wrapping at 2^64. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument to be added
	 * @param {Int_64} y The second 64-bit integer argument to be added
	 * @return The sum of x + y
	 */
	var safeAdd_64 = function (x, y) {
		var lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
		var msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
		var lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
		var highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	};

	/*
	 * Calculates the SHA-1 hash of the string set at instantiation
	 *
	 * @private
	 * @return The array of integers representing the SHA-1 hash of message
	 */
	var coreSHA1 = function () {
		var W = [];
		var a, b, c, d, e;
		var T;
		var ch = ch_32, parity = parity_32, maj = maj_32, rotl = rotl_32, safeAdd = safeAdd_32;
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
		var message = strToHash.slice();

		message[strBinLen >> 5] |= 0x80 << (24 - strBinLen % 32); // Append '1' at  the end of the binary string
		message[((strBinLen + 1 + 64 >> 9) << 4) + 15] = strBinLen; // Append length of binary string in the position such that the new length is a multiple of 512

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
					T = safeAdd(safeAdd(safeAdd(safeAdd(rotl(a, 5), ch(b, c, d)), e), K[t]), W[t]);
				} else if (t < 40) {
					T = safeAdd(safeAdd(safeAdd(safeAdd(rotl(a, 5), parity(b, c, d)), e), K[t]), W[t]);
				} else if (t < 60) {
					T = safeAdd(safeAdd(safeAdd(safeAdd(rotl(a, 5), maj(b, c, d)), e), K[t]), W[t]);
				} else {
					T = safeAdd(safeAdd(safeAdd(safeAdd(rotl(a, 5), parity(b, c, d)), e), K[t]), W[t]);
				}

				e = d;
				d = c;
				c = rotl(b, 30);
				b = a;
				a = T;
			}

			H[0] = safeAdd(a, H[0]);
			H[1] = safeAdd(b, H[1]);
			H[2] = safeAdd(c, H[2]);
			H[3] = safeAdd(d, H[3]);
			H[4] = safeAdd(e, H[4]);
		}

		return H;
	};

	/*
	 * Calculates the desired SHA-2 hash of the string set at instantiation
	 *
	 * @private
	 * @param {String} variant The desired SHA-2 variant
	 * @return The array of integers representing the SHA-2 hash of message
	 */
	var coreSHA2 = function (variant) {
		var W = [];
		var a, b, c, d, e, f, g, h;
		var T1, T2;
		var H;
		var numRounds, lengthPosition, binaryStringInc, binaryStringMult;
		var safeAdd, gamma0, gamma1, sigma0, sigma1, ch, maj, Int;
		var K;
		var message = strToHash.slice();

		// Set up the various function handles and variable for the specific variant
		if (variant === "SHA-224" || variant === "SHA-256") // 32-bit variant
		{
			numRounds = 64;
			lengthPosition = ((strBinLen + 1 + 64 >> 9) << 4) + 15;
			binaryStringInc = 16;
			binaryStringMult = 1;
			Int = Number;
			safeAdd = safeAdd_32;
			gamma0 = gamma0_32;
			gamma1 = gamma1_32;
			sigma0 = sigma0_32;
			sigma1 = sigma1_32;
			maj = maj_32;
			ch = ch_32;
			K = [
					0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
					0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
					0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
					0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
					0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
					0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
					0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
					0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
					0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
					0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
					0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
					0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
					0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
					0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
					0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
					0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
				];

			if (variant === "SHA-224") {
				H = [
						0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
						0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
					];
			} else {
				H = [
						0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
						0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
					];
			}
		} else if (variant === "SHA-384" || variant === "SHA-512") {// 64-bit variant
			numRounds = 80;
			lengthPosition = ((strBinLen + 1 + 128 >> 10) << 5) + 31;
			binaryStringInc = 32;
			binaryStringMult = 2;
			Int = Int_64;
			safeAdd = safeAdd_64;
			gamma0 = gamma0_64;
			gamma1 = gamma1_64;
			sigma0 = sigma0_64;
			sigma1 = sigma1_64;
			maj = maj_64;
			ch = ch_64;

			K = [
					new Int_64(0x428a2f98, 0xd728ae22), new Int_64(0x71374491, 0x23ef65cd), new Int_64(0xb5c0fbcf, 0xec4d3b2f), new Int_64(0xe9b5dba5, 0x8189dbbc),
					new Int_64(0x3956c25b, 0xf348b538), new Int_64(0x59f111f1, 0xb605d019), new Int_64(0x923f82a4, 0xaf194f9b), new Int_64(0xab1c5ed5, 0xda6d8118),
					new Int_64(0xd807aa98, 0xa3030242), new Int_64(0x12835b01, 0x45706fbe), new Int_64(0x243185be, 0x4ee4b28c), new Int_64(0x550c7dc3, 0xd5ffb4e2),
					new Int_64(0x72be5d74, 0xf27b896f), new Int_64(0x80deb1fe, 0x3b1696b1), new Int_64(0x9bdc06a7, 0x25c71235), new Int_64(0xc19bf174, 0xcf692694),
					new Int_64(0xe49b69c1, 0x9ef14ad2), new Int_64(0xefbe4786, 0x384f25e3), new Int_64(0x0fc19dc6, 0x8b8cd5b5), new Int_64(0x240ca1cc, 0x77ac9c65),
					new Int_64(0x2de92c6f, 0x592b0275), new Int_64(0x4a7484aa, 0x6ea6e483), new Int_64(0x5cb0a9dc, 0xbd41fbd4), new Int_64(0x76f988da, 0x831153b5),
					new Int_64(0x983e5152, 0xee66dfab), new Int_64(0xa831c66d, 0x2db43210), new Int_64(0xb00327c8, 0x98fb213f), new Int_64(0xbf597fc7, 0xbeef0ee4),
					new Int_64(0xc6e00bf3, 0x3da88fc2), new Int_64(0xd5a79147, 0x930aa725), new Int_64(0x06ca6351, 0xe003826f), new Int_64(0x14292967, 0x0a0e6e70),
					new Int_64(0x27b70a85, 0x46d22ffc), new Int_64(0x2e1b2138, 0x5c26c926), new Int_64(0x4d2c6dfc, 0x5ac42aed), new Int_64(0x53380d13, 0x9d95b3df),
					new Int_64(0x650a7354, 0x8baf63de), new Int_64(0x766a0abb, 0x3c77b2a8), new Int_64(0x81c2c92e, 0x47edaee6), new Int_64(0x92722c85, 0x1482353b),
					new Int_64(0xa2bfe8a1, 0x4cf10364), new Int_64(0xa81a664b, 0xbc423001), new Int_64(0xc24b8b70, 0xd0f89791), new Int_64(0xc76c51a3, 0x0654be30),
					new Int_64(0xd192e819, 0xd6ef5218), new Int_64(0xd6990624, 0x5565a910), new Int_64(0xf40e3585, 0x5771202a), new Int_64(0x106aa070, 0x32bbd1b8),
					new Int_64(0x19a4c116, 0xb8d2d0c8), new Int_64(0x1e376c08, 0x5141ab53), new Int_64(0x2748774c, 0xdf8eeb99), new Int_64(0x34b0bcb5, 0xe19b48a8),
					new Int_64(0x391c0cb3, 0xc5c95a63), new Int_64(0x4ed8aa4a, 0xe3418acb), new Int_64(0x5b9cca4f, 0x7763e373), new Int_64(0x682e6ff3, 0xd6b2b8a3),
					new Int_64(0x748f82ee, 0x5defb2fc), new Int_64(0x78a5636f, 0x43172f60), new Int_64(0x84c87814, 0xa1f0ab72), new Int_64(0x8cc70208, 0x1a6439ec),
					new Int_64(0x90befffa, 0x23631e28), new Int_64(0xa4506ceb, 0xde82bde9), new Int_64(0xbef9a3f7, 0xb2c67915), new Int_64(0xc67178f2, 0xe372532b),
					new Int_64(0xca273ece, 0xea26619c), new Int_64(0xd186b8c7, 0x21c0c207), new Int_64(0xeada7dd6, 0xcde0eb1e), new Int_64(0xf57d4f7f, 0xee6ed178),
					new Int_64(0x06f067aa, 0x72176fba), new Int_64(0x0a637dc5, 0xa2c898a6), new Int_64(0x113f9804, 0xbef90dae), new Int_64(0x1b710b35, 0x131c471b),
					new Int_64(0x28db77f5, 0x23047d84), new Int_64(0x32caab7b, 0x40c72493), new Int_64(0x3c9ebe0a, 0x15c9bebc), new Int_64(0x431d67c4, 0x9c100d4c),
					new Int_64(0x4cc5d4be, 0xcb3e42b6), new Int_64(0x597f299c, 0xfc657e2a), new Int_64(0x5fcb6fab, 0x3ad6faec), new Int_64(0x6c44198c, 0x4a475817)
				];

			if (variant === "SHA-384") {
				H = [
						new Int_64(0xcbbb9d5d, 0xc1059ed8), new Int_64(0x0629a292a, 0x367cd507), new Int_64(0x9159015a, 0x3070dd17), new Int_64(0x152fecd8, 0xf70e5939),
						new Int_64(0x67332667, 0xffc00b31), new Int_64(0x98eb44a87, 0x68581511), new Int_64(0xdb0c2e0d, 0x64f98fa7), new Int_64(0x47b5481d, 0xbefa4fa4)
					];
			} else {
				H = [
						new Int_64(0x6a09e667, 0xf3bcc908), new Int_64(0xbb67ae85, 0x84caa73b), new Int_64(0x3c6ef372, 0xfe94f82b), new Int_64(0xa54ff53a, 0x5f1d36f1),
						new Int_64(0x510e527f, 0xade682d1), new Int_64(0x9b05688c, 0x2b3e6c1f), new Int_64(0x1f83d9ab, 0xfb41bd6b), new Int_64(0x5be0cd19, 0x137e2179)
					];
			}
		}

		message[strBinLen >> 5] |= 0x80 << (24 - strBinLen % 32); // Append '1' at  the end of the binary string
		message[lengthPosition] = strBinLen; // Append length of binary string in the position such that the new length is correct

		var appendedMessageLength = message.length;

		for (var i = 0; i < appendedMessageLength; i += binaryStringInc) {
			a = H[0];
			b = H[1];
			c = H[2];
			d = H[3];
			e = H[4];
			f = H[5];
			g = H[6];
			h = H[7];

			for (var t = 0; t < numRounds; t++) {
				if (t < 16) {
					W[t] = new Int(message[t * binaryStringMult + i], message[t * binaryStringMult + i + 1]); // Bit of a hack - for 32-bit, the second term is ignored
				} else {
					W[t] = safeAdd(safeAdd(safeAdd(gamma1(W[t - 2]), W[t - 7]), gamma0(W[t - 15])), W[t - 16]);
				}

				T1 = safeAdd(safeAdd(safeAdd(safeAdd(h, sigma1(e)), ch(e, f, g)), K[t]), W[t]);
				T2 = safeAdd(sigma0(a), maj(a, b, c));
				h = g;
				g = f;
				f = e;
				e = safeAdd(d, T1);
				d = c;
				c = b;
				b = a;
				a = safeAdd(T1, T2);
			}

			H[0] = safeAdd(a, H[0]);
			H[1] = safeAdd(b, H[1]);
			H[2] = safeAdd(c, H[2]);
			H[3] = safeAdd(d, H[3]);
			H[4] = safeAdd(e, H[4]);
			H[5] = safeAdd(f, H[5]);
			H[6] = safeAdd(g, H[6]);
			H[7] = safeAdd(h, H[7]);
		}

		switch (variant) {
		case "SHA-224":
			return	[
				H[0], H[1],	H[2], H[3],
				H[4], H[5],	H[6]
			];
		case "SHA-256":
			return H;
		case "SHA-384":
			return	[
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder
			];
		case "SHA-512":
			return	[
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder,
				H[6].highOrder, H[6].lowOrder,
				H[7].highOrder, H[7].lowOrder
			];
		default:
			return []; // This should near be reached
		}
	};

	/*
	 * Returns the desired SHA hash of the string specified at instantiation using the specified parameters
	 *
	 * @param {String} variant The desired SHA variant (SHA-1, SHA-224, SHA-256, SHA-384, or SHA-512)
	 * @param {String} format The desired output formatting (B64 or HEX)
	 * @return The string representation of the hash in the format specified
	 */
	this.getHash = function (variant, format) {
		var formatFunc = null;

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

		switch (variant) {
		case "SHA-1":
			if (sha1 === null) {
				sha1 = coreSHA1();
			}
			return formatFunc(sha1);
		case "SHA-224":
			if (sha224 === null) {
				sha224 = coreSHA2(variant);
			}
			return formatFunc(sha224);
		case "SHA-256":
			if (sha256 === null) {
				sha256 = coreSHA2(variant);
			}
			return formatFunc(sha256);
		case "SHA-384":
			if (sha384 === null) {
				sha384 = coreSHA2(variant);
			}
			return formatFunc(sha384);
		case "SHA-512":
			if (sha512 === null) {
				sha512 = coreSHA2(variant);
			}
			return formatFunc(sha512);
		default:
			return "HASH NOT RECOGNIZED";
		}
	};
}
