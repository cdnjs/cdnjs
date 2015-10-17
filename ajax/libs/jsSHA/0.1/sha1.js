/* A JavaScript implementation of SHA-1 hash, as defined in FIPS PUB 180-2
 * Version 0.1 Copyright Brian Turek 2008
 * Distributed under the BSD License
 * See http://jssha.sourceforge.net/ for more information
 *
 * Several functions taken, as noted, from Paul Johnson
 */

/*
 * Configurable variables. Defaults typically work
 */
var charSize = 8; /* Number of Bits Per character (8 for ASCII, 16 for Unicode)	  */
var hexCase = 0; /* hex output format. 0 - lowercase; 1 - uppercase		*/

/*
 * The below function is what you want to call.  It take the string to be hashed.
 */
function hex_sha(string) { return binb2hex(coreSHA1(str2binb(string), string.length * charSize));}

var K = new Array(
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
		);

var H_1 = new Array(
			0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0
		);

function ROTL_32(x, n)
{
	if (n < 32)
		return (x <<  n) | (x >>> (32 - n));
	else
		return x
}

function Parity_32(x, y, z)
{
	return x ^ y ^ z;
}

function Ch_32(x, y, z)
{
	return (x & y) ^ (~x & z);
}

function Maj_32(x, y, z)
{
	return (x & y) ^ (x & z) ^ (y & z);
}

function coreSHA1(message, messageLength)
{
	var W = new Array();
	var a, b, c, d, e;
	var T;
	var Ch = Ch_32, Parity = Parity_32, Maj = Maj_32, ROTL = ROTL_32, safeAdd = safeAdd_32;
	var H = H_1.slice();

	message[messageLength >> 5] |= 0x80 << (24 - messageLength % 32); // Append '1' at  the end of the binary string
	message[((messageLength + 1 + 64 >> 9) << 4) + 15] = messageLength; // Append length of binary string in the position such that the new length is a multiple of 512

	var appendedMessageLength = message.length;

	for (var i = 0; i < appendedMessageLength; i += 16) {
		a = H[0];
		b = H[1];
		c = H[2];
		d = H[3];
		e = H[4];

		for ( var t = 0; t < 80; t++)
		{
			if (t < 16)
				W[t] = message[t + i];
			else
				W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);

			if (t < 20)
				T = safeAdd(safeAdd(safeAdd(safeAdd(ROTL(a, 5), Ch(b, c, d)), e), K[t]), W[t]);
			else if (t < 40)
				T = safeAdd(safeAdd(safeAdd(safeAdd(ROTL(a, 5), Parity(b, c, d)), e), K[t]), W[t]);
			else if (t < 60)
				T = safeAdd(safeAdd(safeAdd(safeAdd(ROTL(a, 5), Maj(b, c, d)), e), K[t]), W[t]);
			else
				T = safeAdd(safeAdd(safeAdd(safeAdd(ROTL(a, 5), Parity(b, c, d)), e), K[t]), W[t]);

			e = d;
			d = c;
			c = ROTL(b, 30);
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

}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 * Taken from Paul Johnson (modified slightly)
 */
function safeAdd_32 (x, y)
{
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >>> 16) + (y >>> 16) + (lsw >>> 16);

	return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
}

/*
 * Convert a string to an array of big-endian words
 * If charSize is ASCII, characters >255 have their hi-byte silently ignored.
 * Taken from Paul Johnson
 */
function str2binb(str)
{
	var bin = Array();
	var mask = (1 << charSize) - 1;
	var length = str.length * charSize;;

	for(var i = 0; i < length; i += charSize)
		bin[i>>5] |= (str.charCodeAt(i / charSize) & mask) << (32 - charSize - i%32);

	return bin;
}

/*
 * Convert an array of big-endian words to a hex string.
 * Taken from Paul Johnson
 */
function binb2hex(binarray)
{
	var hex_tab = hexCase ? "0123456789ABCDEF" : "0123456789abcdef";
	var str = "";
	var length = binarray.length * 4;

	for(var i = 0; i < length; i++)
		str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
			hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8)) & 0xF);

	return str;
}
