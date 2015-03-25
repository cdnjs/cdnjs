/* A JavaScript implementation of SHA-384 and SHA-512 hashes, as defined in FIPS PUB 180-2
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
 * the SHA-2 variant you want to use (SHA-384, SHA-512)
 */
function hex_sha(string, variant) {return binb2hex(coreSHA2(str2binb(string), string.length * charSize, variant));}

var K = new Array(
			new int_64(0x428a2f98,0xd728ae22), new int_64(0x71374491,0x23ef65cd), new int_64(0xb5c0fbcf,0xec4d3b2f), new int_64(0xe9b5dba5,0x8189dbbc),
			new int_64(0x3956c25b,0xf348b538), new int_64(0x59f111f1,0xb605d019), new int_64(0x923f82a4,0xaf194f9b), new int_64(0xab1c5ed5,0xda6d8118),
			new int_64(0xd807aa98,0xa3030242), new int_64(0x12835b01,0x45706fbe), new int_64(0x243185be,0x4ee4b28c), new int_64(0x550c7dc3,0xd5ffb4e2),
			new int_64(0x72be5d74,0xf27b896f), new int_64(0x80deb1fe,0x3b1696b1), new int_64(0x9bdc06a7,0x25c71235), new int_64(0xc19bf174,0xcf692694),
			new int_64(0xe49b69c1,0x9ef14ad2), new int_64(0xefbe4786,0x384f25e3), new int_64(0x0fc19dc6,0x8b8cd5b5), new int_64(0x240ca1cc,0x77ac9c65),
			new int_64(0x2de92c6f,0x592b0275), new int_64(0x4a7484aa,0x6ea6e483), new int_64(0x5cb0a9dc,0xbd41fbd4), new int_64(0x76f988da,0x831153b5),
			new int_64(0x983e5152,0xee66dfab), new int_64(0xa831c66d,0x2db43210), new int_64(0xb00327c8,0x98fb213f), new int_64(0xbf597fc7,0xbeef0ee4),
			new int_64(0xc6e00bf3,0x3da88fc2), new int_64(0xd5a79147,0x930aa725), new int_64(0x06ca6351,0xe003826f), new int_64(0x14292967,0x0a0e6e70),
			new int_64(0x27b70a85,0x46d22ffc), new int_64(0x2e1b2138,0x5c26c926), new int_64(0x4d2c6dfc,0x5ac42aed), new int_64(0x53380d13,0x9d95b3df),
			new int_64(0x650a7354,0x8baf63de), new int_64(0x766a0abb,0x3c77b2a8), new int_64(0x81c2c92e,0x47edaee6), new int_64(0x92722c85,0x1482353b),
			new int_64(0xa2bfe8a1,0x4cf10364), new int_64(0xa81a664b,0xbc423001), new int_64(0xc24b8b70,0xd0f89791), new int_64(0xc76c51a3,0x0654be30),
			new int_64(0xd192e819,0xd6ef5218), new int_64(0xd6990624,0x5565a910), new int_64(0xf40e3585,0x5771202a), new int_64(0x106aa070,0x32bbd1b8),
			new int_64(0x19a4c116,0xb8d2d0c8), new int_64(0x1e376c08,0x5141ab53), new int_64(0x2748774c,0xdf8eeb99), new int_64(0x34b0bcb5,0xe19b48a8),
			new int_64(0x391c0cb3,0xc5c95a63), new int_64(0x4ed8aa4a,0xe3418acb), new int_64(0x5b9cca4f,0x7763e373), new int_64(0x682e6ff3,0xd6b2b8a3),
			new int_64(0x748f82ee,0x5defb2fc), new int_64(0x78a5636f,0x43172f60), new int_64(0x84c87814,0xa1f0ab72), new int_64(0x8cc70208,0x1a6439ec),
			new int_64(0x90befffa,0x23631e28), new int_64(0xa4506ceb,0xde82bde9), new int_64(0xbef9a3f7,0xb2c67915), new int_64(0xc67178f2,0xe372532b),
			new int_64(0xca273ece,0xea26619c), new int_64(0xd186b8c7,0x21c0c207), new int_64(0xeada7dd6,0xcde0eb1e), new int_64(0xf57d4f7f,0xee6ed178),
			new int_64(0x06f067aa,0x72176fba), new int_64(0x0a637dc5,0xa2c898a6), new int_64(0x113f9804,0xbef90dae), new int_64(0x1b710b35,0x131c471b),
			new int_64(0x28db77f5,0x23047d84), new int_64(0x32caab7b,0x40c72493), new int_64(0x3c9ebe0a,0x15c9bebc), new int_64(0x431d67c4,0x9c100d4c),
			new int_64(0x4cc5d4be,0xcb3e42b6), new int_64(0x597f299c,0xfc657e2a), new int_64(0x5fcb6fab,0x3ad6faec), new int_64(0x6c44198c,0x4a475817)
		);

var H_384 = new Array(
	new int_64(0xcbbb9d5d,0xc1059ed8), new int_64(0x629a292a,0x367cd507), new int_64(0x9159015a,0x3070dd17), new int_64(0x152fecd8,0xf70e5939),
	new int_64(0x67332667,0xffc00b31), new int_64(0x98eb44a87,0x68581511), new int_64(0xdb0c2e0d,0x64f98fa7), new int_64(0x47b5481d,0xbefa4fa4)
);

var H_512 = new Array(
	new int_64(0x6a09e667,0xf3bcc908), new int_64(0xbb67ae85,0x84caa73b), new int_64(0x3c6ef372,0xfe94f82b), new int_64(0xa54ff53a,0x5f1d36f1),
	new int_64(0x510e527f,0xade682d1), new int_64(0x9b05688c,0x2b3e6c1f), new int_64(0x1f83d9ab,0xfb41bd6b), new int_64(0x5be0cd19,0x137e2179)
);

function ROTR(x, n)
{
	if (n < 32)
		return new int_64(
				(x.highOrder >>> n) | (x.lowOrder << (32 - n)),
				(x.lowOrder >>> n) | (x.highOrder << (32 - n))
			);
	else if (n == 32) // Apparently in JS, shifting a 32-bit value by 32 yields original value
		return new int_64(x.lowOrder, x.highOrder);
	else
		return ROTR(ROTR(x, 32), n-32);
}

function SHR(x, n)
{
	if (n < 32)
		return new int_64(
				x.highOrder >>> n,
				x.lowOrder >>> n | (x.highOrder << (32 - n))
			);
	else if (n == 32) // Apparently in JS, shifting a 32-bit value by 32 yields original value
		return new int_64(0, x.highOrder);
	else
		return SHR(SHR(x, 32), n-32);
}

function Ch(x, y, z)
{
	return new int_64(
			(x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
			(x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
		);
}

function Maj(x, y, z)
{
	return new int_64(
			(x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
			(x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
		);
}

function Sigma0(x)
{
	var ROTR28 = ROTR(x, 28);
	var ROTR34 = ROTR(x, 34);
	var ROTR39 = ROTR(x, 39);

	return new int_64(
			ROTR28.highOrder ^ ROTR34.highOrder ^ ROTR39.highOrder,
			ROTR28.lowOrder ^ ROTR34.lowOrder ^ ROTR39.lowOrder
		);
}

function Sigma1(x)
{
	var ROTR14 = ROTR(x, 14);
	var ROTR18 = ROTR(x, 18);
	var ROTR41 = ROTR(x, 41)

	return new int_64(
			ROTR14.highOrder ^ ROTR18.highOrder ^ ROTR41.highOrder,
			ROTR14.lowOrder ^ ROTR18.lowOrder ^ ROTR41.lowOrder
		);
}

function Gamma0(x)
{
	var ROTR1 = ROTR(x, 1);
	var ROTR8 = ROTR(x, 8);
	var SHR7 = SHR(x, 7);

	return new int_64(
			ROTR1.highOrder ^ ROTR8.highOrder ^ SHR7.highOrder,
			ROTR1.lowOrder ^ ROTR8.lowOrder ^ SHR7.lowOrder
		);
}

function Gamma1(x)
{
	var ROTR19 = ROTR(x, 19);
	var ROTR61 = ROTR(x, 61);
	var SHR6 = SHR(x, 6);

	return new int_64(
			ROTR19.highOrder ^ ROTR61.highOrder ^ SHR6.highOrder,
			ROTR19.lowOrder ^ ROTR61.lowOrder ^ SHR6.lowOrder
		);
}

function coreSHA2(message, messageLength, variant)
{
	var W = new Array();
	var a, b, c, d, e, f, g, h;
	var T1, T2;
	var H;

	// Set up the various function handles and variable for the specific variant
	if (variant == "SHA-384")
		H = H_384.slice();
	else if (variant == "SHA-512")
		H = H_512.slice();
	else
		return "HASH NOT RECOGNIZED";

	message[messageLength >> 5] |= 0x80 << (24 - messageLength % 32); // Append '1' at  the end of the binary string
	message[((messageLength + 1 + 128 >> 10) << 5) + 31] = messageLength; // Append length of binary string in the position such that the new length is a multiple of 1024

	var appendedMessageLength = message.length;

	for (var i = 0; i < appendedMessageLength; i += 32) {
		a = H[0];
		b = H[1];
		c = H[2];
		d = H[3];
		e = H[4];
		f = H[5];
		g = H[6];
		h = H[7];

		for ( var t = 0; t < 80; t++)
		{
			if (t < 16)
				W[t] = new int_64(message[t*2 + i], message[t*2 + i +1]);
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
		case "SHA-384":
				return new Array(
						hashArray[0].highOrder, hashArray[0].lowOrder,
						hashArray[1].highOrder, hashArray[1].lowOrder,
						hashArray[2].highOrder, hashArray[2].lowOrder,
						hashArray[3].highOrder, hashArray[3].lowOrder,
						hashArray[4].highOrder, hashArray[4].lowOrder,
						hashArray[5].highOrder, hashArray[5].lowOrder
					);
			break;
		case "SHA-512":
				return new Array(
						hashArray[0].highOrder, hashArray[0].lowOrder,
						hashArray[1].highOrder, hashArray[1].lowOrder,
						hashArray[2].highOrder, hashArray[2].lowOrder,
						hashArray[3].highOrder, hashArray[3].lowOrder,
						hashArray[4].highOrder, hashArray[4].lowOrder,
						hashArray[5].highOrder, hashArray[5].lowOrder,
						hashArray[6].highOrder, hashArray[6].lowOrder,
						hashArray[7].highOrder, hashArray[7].lowOrder
				);
			break;
	}
}

/*
 * Add int_64egers, wrapping at 2^32. This uses 16-bit operations int_64ernally
 * to work around bugs in some JS int_64erpreters.
 * Taken from Paul Johnson (modified slightly)
 */
function safeAdd_32 (x, y)
{
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >>> 16) + (y >>> 16) + (lsw >>> 16);

	return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
}

/*
 * The 64-bit counterpart to safeAdd_32
 */
function safeAdd (x, y) {
	var lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
	var msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
	var lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF)

	lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
	msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
	var highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

	return new int_64(highOrder, lowOrder);
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

/*
 * int_64 is a object/container for 2 32-bit numbers emulating a 64-bit number
 */
function int_64(msint_32, lsint_32)
{
	this.highOrder = msint_32;
	this.lowOrder = lsint_32;
}
