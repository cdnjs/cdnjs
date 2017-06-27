/* A JavaScript implementation of SHA-224 and SHA-256 hashes, as defined in FIPS PUB 180-2
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
 * The below function is what you want to call.  It take the string to be hashed, as well as
 * the SHA-2 variant you want to use (SHA-224, SHA-256)
 */
function hex_sha(string, variant) {return binb2hex(coreSHA2(str2binb(string), string.length * charSize, variant));}

var K = new Array(
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
		);

var H_224 = new Array(
			0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
			0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
		);

var H_256 = new Array(
			0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
			0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
		);

function ROTR (x, n)
{
	if (n < 32)
		return (x >>> n) | (x << (32 - n));
	else
		return x
}

function SHR (x, n)
{
	if (n < 32)
		return x >>> n;
	else
		return 0;
}

function Ch(x, y, z)
{
	return (x & y) ^ (~x & z);
}

function Maj(x, y, z)
{
	return (x & y) ^ (x & z) ^ (y & z);
}

function Sigma0(x)
{
	return ROTR(x, 2) ^ ROTR(x, 13) ^ ROTR(x, 22);
}

function Sigma1(x)
{
	return ROTR(x, 6) ^ ROTR(x, 11) ^ ROTR(x, 25);
}

function Gamma0(x)
{
	return ROTR(x, 7) ^ ROTR(x, 18) ^ SHR(x, 3);
}

function Gamma1(x)
{
	return ROTR(x, 17) ^ ROTR(x, 19) ^ SHR(x, 10);
}

function coreSHA2(message, messageLength, variant)
{
	var W = new Array();
	var a, b, c, d, e, f, g, h;
	var T1, T2;
	var H;
	
	if (variant == "SHA-224")
			H = H_224.slice();
	else if (variant == "SHA-256")
			H = H_256.slice();
	else
		return "HASH NOT RECOGNIZED";

	message[messageLength >> 5] |= 0x80 << (24 - messageLength % 32); // Append '1' at  the end of the binary string
	message[((messageLength + 1 + 64 >> 9) << 4) + 15] = messageLength; // Append length of binary string in the position such that the new length is a multiple of 1024

	var appendedMessageLength = message.length;

	for (var i = 0; i < appendedMessageLength; i += 16) {
		a = H[0];
		b = H[1];
		c = H[2];
		d = H[3];
		e = H[4];
		f = H[5];
		g = H[6];
		h = H[7];

		for ( var t = 0; t < 64; t++)
		{
			if (t < 16)
				W[t] = message[t + i]; // Bit of a hack - for 32-bit, the second term is ignored
			else
				W[t] = safeAdd(safeAdd(safeAdd(Gamma1(W[t - 2]), W[t - 7]), Gamma0(W[t - 15])), W[t - 16]);

			T1 = safeAdd(safeAdd(safeAdd(safeAdd(h, Sigma1(e)), Ch(e, f, g)), K[t]), W[t]);
			T2 = safeAdd(Sigma0(a), Maj(a, b, c));
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

	return returnSHA2(H, variant);
}

function returnSHA2(hashArray, variant)
{
	switch (variant)
	{
		case "SHA-224":
				return new Array(
						hashArray[0],
						hashArray[1],
						hashArray[2],
						hashArray[3],
						hashArray[4],
						hashArray[5],
						hashArray[6]
					);
			break;
		case "SHA-256":
				return hashArray;
			break;
	}
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 * Taken from Paul Johnson (modified slightly)
 */
function safeAdd (x, y)
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
