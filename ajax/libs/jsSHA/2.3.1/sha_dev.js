/**
 * @preserve A JavaScript implementation of the SHA family of hashes, as
 * defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 * HMAC implementation as defined in FIPS PUB 198a
 *
 * Copyright Brian Turek 2008-2017
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Several functions taken from Paul Johnston
 */

/*jslint
	bitwise: true, multivar: true, for: true, this: true, sub: true, esversion: 3
*/

 /**
  * SUPPORTED_ALGS is the stub for a compile flag that will cause pruning of
  * functions that are not needed when a limited number of SHA families are
  * selected
  *
  * @define {number} ORed value of SHA variants to be supported
  *   1 = SHA-1, 2 = SHA-224/SHA-256, 4 = SHA-384/SHA-512, 8 = SHA3
  */
var SUPPORTED_ALGS = 8 | 4 | 2 | 1;

(function (global)
{
	"use strict";

	/* Globals */
	var TWO_PWR_32 = 4294967296;

	/**
	 * Int_64 is a object for 2 32-bit numbers emulating a 64-bit number
	 *
	 * @private
	 * @constructor
	 * @this {Int_64}
	 * @param {number} msint_32 The most significant 32-bits of a 64-bit number
	 * @param {number} lsint_32 The least significant 32-bits of a 64-bit number
	 */
	function Int_64(msint_32, lsint_32)
	{
		this.highOrder = msint_32;
		this.lowOrder = lsint_32;
	}

	/**
	 * Convert a string to an array of big-endian words
	 *
	 * There is a known bug with an odd number of existing bytes and using a
	 * UTF-16 encoding.  However, this function is used such that the existing
	 * bytes are always a result of a previous UTF-16 str2packed call and
	 * therefore there should never be an odd number of existing bytes
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {string} utfType The Unicode type, UTF8 or UTF16BE, UTF16LE, to
	 *   use to encode the source string
	 * @param {Array<number>} existingPacked A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingPackedLen The number of bits in the existingPacked
	 *   array
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function str2packed(str, utfType, existingPacked, existingPackedLen, bigEndianMod)
	{
		var packed, codePnt, codePntArr, byteCnt = 0, i, j, existingByteLen,
			intOffset, byteOffset, shiftModifier, transposeBytes;

		packed = existingPacked || [0];
		existingPackedLen = existingPackedLen || 0;
		existingByteLen = existingPackedLen >>> 3;

		if ("UTF8" === utfType)
		{
			shiftModifier = (bigEndianMod === -1) ? 3 : 0;
			for (i = 0; i < str.length; i += 1)
			{
				codePnt = str.charCodeAt(i);
				codePntArr = [];

				if (0x80 > codePnt)
				{
					codePntArr.push(codePnt);
				}
				else if (0x800 > codePnt)
				{
					codePntArr.push(0xC0 | (codePnt >>> 6));
					codePntArr.push(0x80 | (codePnt & 0x3F));
				}
				else if ((0xd800 > codePnt) || (0xe000 <= codePnt)) {
					codePntArr.push(
						0xe0 | (codePnt >>> 12),
						0x80 | ((codePnt >>> 6) & 0x3f),
						0x80 | (codePnt & 0x3f)
					);
				}
				else
				{
					i += 1;
					codePnt = 0x10000 + (((codePnt & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
					codePntArr.push(
						0xf0 | (codePnt >>> 18),
						0x80 | ((codePnt >>> 12) & 0x3f),
						0x80 | ((codePnt >>> 6) & 0x3f),
						0x80 | (codePnt & 0x3f)
					);
				}

				for (j = 0; j < codePntArr.length; j += 1)
				{
					byteOffset = byteCnt + existingByteLen;
					intOffset = byteOffset >>> 2;
					while (packed.length <= intOffset)
					{
						packed.push(0);
					}
					/* Known bug kicks in here */
					packed[intOffset] |= codePntArr[j] << (8 * (shiftModifier + bigEndianMod * (byteOffset % 4)));
					byteCnt += 1;
				}
			}
		}
		else if (("UTF16BE" === utfType) || "UTF16LE" === utfType)
		{
			shiftModifier = (bigEndianMod === -1) ? 2 : 0;
			/* Internally strings are UTF-16BE so transpose bytes under two conditions:
				* need LE and not switching endianness due to SHA-3
				* need BE and switching endianness due to SHA-3 */
			transposeBytes = (("UTF16LE" === utfType) && (bigEndianMod !== 1)) || (("UTF16LE" !== utfType) && (bigEndianMod === 1));
			for (i = 0; i < str.length; i += 1)
			{
				codePnt = str.charCodeAt(i);
				if (transposeBytes === true)
				{
					j = codePnt & 0xFF;
					codePnt = (j << 8) | (codePnt >>> 8);
				}

				byteOffset = byteCnt + existingByteLen;
				intOffset = byteOffset >>> 2;
				while (packed.length <= intOffset)
				{
					packed.push(0);
				}
				packed[intOffset] |= codePnt << (8 * (shiftModifier + bigEndianMod * (byteOffset % 4)));
				byteCnt += 2;
			}
		}
		return {"value" : packed, "binLen" : byteCnt * 8 + existingPackedLen};
	}

	/**
	 * Convert a hex string to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {Array<number>} existingPacked A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingPackedLen The number of bits in the existingPacked
	 *   array
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function hex2packed(str, existingPacked, existingPackedLen, bigEndianMod)
	{
		var packed, length = str.length, i, num, intOffset, byteOffset,
			existingByteLen, shiftModifier;

		if (0 !== (length % 2))
		{
			throw new Error("String of HEX type must be in byte increments");
		}

		packed = existingPacked || [0];
		existingPackedLen = existingPackedLen || 0;
		existingByteLen = existingPackedLen >>> 3;
		shiftModifier = (bigEndianMod === -1) ? 3 : 0;

		for (i = 0; i < length; i += 2)
		{
			num = parseInt(str.substr(i, 2), 16);
			if (!isNaN(num))
			{
				byteOffset = (i >>> 1) + existingByteLen;
				intOffset = byteOffset >>> 2;
				while (packed.length <= intOffset)
				{
					packed.push(0);
				}
				packed[intOffset] |= num  << (8 * (shiftModifier + bigEndianMod * (byteOffset % 4)));
			}
			else
			{
				throw new Error("String of HEX type contains invalid characters");
			}
		}

		return {"value" : packed, "binLen" : length * 4 + existingPackedLen};
	}

	/**
	 * Convert a string of raw bytes to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String of raw bytes to be converted to binary representation
	 * @param {Array<number>} existingPacked A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingPackedLen The number of bits in the existingPacked
	 *   array
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function bytes2packed(str, existingPacked, existingPackedLen, bigEndianMod)
	{
		var packed, codePnt, i, existingByteLen, intOffset,
			byteOffset, shiftModifier;

		packed = existingPacked || [0];
		existingPackedLen = existingPackedLen || 0;
		existingByteLen = existingPackedLen >>> 3;
		shiftModifier = (bigEndianMod === -1) ? 3 : 0;

		for (i = 0; i < str.length; i += 1)
		{
			codePnt = str.charCodeAt(i);

			byteOffset = i + existingByteLen;
			intOffset = byteOffset >>> 2;
			if (packed.length <= intOffset)
			{
				packed.push(0);
			}
			packed[intOffset] |= codePnt << (8 * (shiftModifier + bigEndianMod * (byteOffset % 4)));
		}

		return {"value" : packed, "binLen" : str.length * 8 + existingPackedLen};
	}

	/**
	 * Convert a base-64 string to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {Array<number>} existingPacked A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingPackedLen The number of bits in the existingPacked
	 *   array
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function b642packed(str, existingPacked, existingPackedLen, bigEndianMod)
	{
		var packed, byteCnt = 0, index, i, j, tmpInt, strPart, firstEqual,
			b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			existingByteLen, intOffset, byteOffset, shiftModifier;

		if (-1 === str.search(/^[a-zA-Z0-9=+\/]+$/))
		{
			throw new Error("Invalid character in base-64 string");
		}

		firstEqual = str.indexOf("=");
		str = str.replace(/\=/g, "");
		if ((-1 !== firstEqual) && (firstEqual < str.length))
		{
			throw new Error("Invalid '=' found in base-64 string");
		}

		packed = existingPacked || [0];
		existingPackedLen = existingPackedLen || 0;
		existingByteLen = existingPackedLen >>> 3;
		shiftModifier = (bigEndianMod === -1) ? 3 : 0;

		for (i = 0; i < str.length; i += 4)
		{
			strPart = str.substr(i, 4);
			tmpInt = 0;

			for (j = 0; j < strPart.length; j += 1)
			{
				index = b64Tab.indexOf(strPart[j]);
				tmpInt |= index << (18 - (6 * j));
			}

			for (j = 0; j < strPart.length - 1; j += 1)
			{
				byteOffset = byteCnt + existingByteLen;
				intOffset = byteOffset >>> 2;
				while (packed.length <= intOffset)
				{
					packed.push(0);
				}
				packed[intOffset] |= ((tmpInt >>> (16 - (j * 8))) & 0xFF) <<
					(8 * (shiftModifier + bigEndianMod * (byteOffset % 4)));
				byteCnt += 1;
			}
		}

		return {"value" : packed, "binLen" : byteCnt * 8 + existingPackedLen};
	}

	/**
	 * Convert an ArrayBuffer to an array of big-endian words
	 *
	 * @private
	 * @param {ArrayBuffer} arr ArrayBuffer to be converted to binary
	 *   representation
	 * @param {Array<number>} existingPacked A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingPackedLen The number of bits in the existingPacked
	 *   array
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function arraybuffer2packed(arr, existingPacked, existingPackedLen, bigEndianMod)
	{
		var packed, i, existingByteLen, intOffset, byteOffset, shiftModifier, arrView;

		packed = existingPacked || [0];
		existingPackedLen = existingPackedLen || 0;
		existingByteLen = existingPackedLen >>> 3;
		shiftModifier = (bigEndianMod === -1) ? 3 : 0;
		arrView = new Uint8Array(arr);

		for (i = 0; i < arr.byteLength; i += 1)
		{
			byteOffset = i + existingByteLen;
			intOffset = byteOffset >>> 2;
			if (packed.length <= intOffset)
			{
				packed.push(0);
			}
			packed[intOffset] |= arrView[i] << (8 * (shiftModifier + bigEndianMod * (byteOffset % 4)));
		}

		return {"value" : packed, "binLen" : arr.byteLength * 8 + existingPackedLen};
	}

	/**
	 * Convert an array of big-endian words to a hex string.
	 *
	 * @private
	 * @param {Array<number>} packed Array of integers to be converted to
	 *   hexidecimal representation
	 * @param {number} outputLength Length of output in bits
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
	 *   containing validated output formatting options
	 * @return {string} Hexidecimal representation of the parameter in string
	 *   form
	 */
	function packed2hex(packed, outputLength, bigEndianMod, formatOpts)
	{
		var hex_tab = "0123456789abcdef", str = "",
			length = outputLength / 8, i, srcByte, shiftModifier;

		shiftModifier = (bigEndianMod === -1) ? 3 : 0;

		for (i = 0; i < length; i += 1)
		{
			/* The below is more than a byte but it gets taken care of later */
			srcByte = packed[i >>> 2] >>> (8 * (shiftModifier + bigEndianMod * (i % 4)));
			str += hex_tab.charAt((srcByte >>> 4) & 0xF) +
				hex_tab.charAt(srcByte & 0xF);
		}

		return (formatOpts["outputUpper"]) ? str.toUpperCase() : str;
	}

	/**
	 * Convert an array of big-endian words to a base-64 string
	 *
	 * @private
	 * @param {Array<number>} packed Array of integers to be converted to
	 *   base-64 representation
	 * @param {number} outputLength Length of output in bits
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
	 *   containing validated output formatting options
	 * @return {string} Base-64 encoded representation of the parameter in
	 *   string form
	 */
	function packed2b64(packed, outputLength, bigEndianMod, formatOpts)
	{
		var str = "", length = outputLength / 8, i, j, triplet, int1, int2, shiftModifier,
			b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

		shiftModifier = (bigEndianMod === -1) ? 3 : 0;

		for (i = 0; i < length; i += 3)
		{
			int1 = ((i + 1) < length) ? packed[(i + 1) >>> 2] : 0;
			int2 = ((i + 2) < length) ? packed[(i + 2) >>> 2] : 0;
			triplet = (((packed[i >>> 2] >>> (8 * (shiftModifier + bigEndianMod * (i % 4)))) & 0xFF) << 16) |
				(((int1 >>> (8 * (shiftModifier + bigEndianMod * ((i + 1) % 4)))) & 0xFF) << 8) |
				((int2 >>> (8 * (shiftModifier + bigEndianMod * ((i + 2) % 4)))) & 0xFF);
			for (j = 0; j < 4; j += 1)
			{
				if (i * 8 + j * 6 <= outputLength)
				{
					str += b64Tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
				}
				else
				{
					str += formatOpts["b64Pad"];
				}
			}
		}
		return str;
	}

	/**
	 * Convert an array of big-endian words to raw bytes string
	 *
	 * @private
	 * @param {Array<number>} packed Array of integers to be converted to
	 *   a raw bytes string representation
	 * @param {number} outputLength Length of output in bits
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @return {string} Raw bytes representation of the parameter in string
	 *   form
	 */
	function packed2bytes(packed, outputLength, bigEndianMod)
	{
		var str = "", length = outputLength / 8, i, srcByte, shiftModifier;

		shiftModifier = (bigEndianMod === -1) ? 3 : 0;

		for (i = 0; i < length; i += 1)
		{
			srcByte = (packed[i >>> 2] >>> (8 * (shiftModifier + bigEndianMod * (i % 4)))) & 0xFF;
			str += String.fromCharCode(srcByte);
		}

		return str;
	}

	/**
	 * Convert an array of big-endian words to an ArrayBuffer
	 *
	 * @private
	 * @param {Array<number>} packed Array of integers to be converted to
	 *   an ArrayBuffer
	 * @param {number} outputLength Length of output in bits
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @return {ArrayBuffer} Raw bytes representation of the parameter in an
	 *   ArrayBuffer
	 */
	function packed2arraybuffer(packed, outputLength, bigEndianMod)
	{
		var length = outputLength / 8, i, retVal = new ArrayBuffer(length), shiftModifier, arrView;
		arrView = new Uint8Array(retVal);

		shiftModifier = (bigEndianMod === -1) ? 3 : 0;

		for (i = 0; i < length; i += 1)
		{
			arrView[i] = (packed[i >>> 2] >>> (8 * (shiftModifier + bigEndianMod * (i % 4)))) & 0xFF;
		}

		return retVal;
	}

	/**
	 * Validate hash list containing output formatting options, ensuring
	 * presence of every option or adding the default value
	 *
	 * @private
	 * @param {{outputUpper : (boolean|undefined), b64Pad : (string|undefined),
	 *   shakeLen : (number|undefined)}=} options Hash list of output formatting options
	 * @return {{outputUpper : boolean, b64Pad : string, shakeLen : number}} Validated
	 *   hash list containing output formatting options
	 */
	function getOutputOpts(options)
	{
		var retVal = {"outputUpper" : false, "b64Pad" : "=", "shakeLen" : -1},
			outputOptions;
		outputOptions = options || {};

		retVal["outputUpper"] = outputOptions["outputUpper"] || false;

		if (true === outputOptions.hasOwnProperty("b64Pad"))
		{
			retVal["b64Pad"] = outputOptions["b64Pad"];
		}

		if ((true === outputOptions.hasOwnProperty("shakeLen")) && ((8 & SUPPORTED_ALGS) !== 0))
		{
			if (outputOptions["shakeLen"] % 8 !== 0)
			{
				throw new Error("shakeLen must be a multiple of 8");
			}
			retVal["shakeLen"] = outputOptions["shakeLen"];
		}

		if ("boolean" !== typeof(retVal["outputUpper"]))
		{
			throw new Error("Invalid outputUpper formatting option");
		}

		if ("string" !== typeof(retVal["b64Pad"]))
		{
			throw new Error("Invalid b64Pad formatting option");
		}

		return retVal;
	}

	/**
	 * Function that takes an input format and UTF encoding and returns the
	 * appropriate function used to convert the input.
	 *
	 * @private
	 * @param {string} format The format of the string to be converted
	 * @param {string} utfType The string encoding to use (UTF8, UTF16BE,
	 *	UTF16LE)
	 * @param {number} bigEndianMod Modifier for whether hash function is
	 *   big or small endian
	 * @return {function((string|ArrayBuffer), Array<number>=, number=): {value :
	 *   Array<number>, binLen : number}} Function that will convert an input
	 *   string to a packed int array
	 */
	function getStrConverter(format, utfType, bigEndianMod)
	{
		var retVal;

		/* Validate encoding */
		switch (utfType)
		{
		case "UTF8":
			/* Fallthrough */
		case "UTF16BE":
			/* Fallthrough */
		case "UTF16LE":
			/* Fallthrough */
			break;
		default:
			throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
		}

		/* Map inputFormat to the appropriate converter */
		switch (format)
		{
		case "HEX":
			/**
			 * @param {string} str String of raw bytes to be converted to binary representation
			 * @param {Array<number>} existingBin A packed int array of bytes to
			 *   append the results to
			 * @param {number} existingBinLen The number of bits in the existingBin
			 *   array
			 * @return {{value : Array<number>, binLen : number}} Hash list where
			 *   "value" contains the output number array and "binLen" is the binary
			 *   length of "value"
			 */
			retVal = function(str, existingBin, existingBinLen)
				{
				   return hex2packed(str, existingBin, existingBinLen, bigEndianMod);
				};
			break;
		case "TEXT":
			/**
			 * @param {string} str String of raw bytes to be converted to binary representation
			 * @param {Array<number>} existingBin A packed int array of bytes to
			 *   append the results to
			 * @param {number} existingBinLen The number of bits in the existingBin
			 *   array
			 * @return {{value : Array<number>, binLen : number}} Hash list where
			 *   "value" contains the output number array and "binLen" is the binary
			 *   length of "value"
			 */
			retVal = function(str, existingBin, existingBinLen)
				{
					return str2packed(str, utfType, existingBin, existingBinLen, bigEndianMod);
				};
			break;
		case "B64":
			/**
			 * @param {string} str String of raw bytes to be converted to binary representation
			 * @param {Array<number>} existingBin A packed int array of bytes to
			 *   append the results to
			 * @param {number} existingBinLen The number of bits in the existingBin
			 *   array
			 * @return {{value : Array<number>, binLen : number}} Hash list where
			 *   "value" contains the output number array and "binLen" is the binary
			 *   length of "value"
			 */
			retVal = function(str, existingBin, existingBinLen)
				{
				   return b642packed(str, existingBin, existingBinLen, bigEndianMod);
				};
			break;
		case "BYTES":
			/**
			 * @param {string} str String of raw bytes to be converted to binary representation
			 * @param {Array<number>} existingBin A packed int array of bytes to
			 *   append the results to
			 * @param {number} existingBinLen The number of bits in the existingBin
			 *   array
			 * @return {{value : Array<number>, binLen : number}} Hash list where
			 *   "value" contains the output number array and "binLen" is the binary
			 *   length of "value"
			 */
			retVal = function(str, existingBin, existingBinLen)
				{
				   return bytes2packed(str, existingBin, existingBinLen, bigEndianMod);
				};
			break;
		case "ARRAYBUFFER":
			try {
				retVal = new ArrayBuffer(0);
			} catch(ignore) {
				throw new Error("ARRAYBUFFER not supported by this environment");
			}
			/**
			 * @param {ArrayBuffer} arr ArrayBuffer to be converted to binary
			 *   representation
			 * @param {Array<number>} existingBin A packed int array of bytes to
			 *   append the results to
			 * @param {number} existingBinLen The number of bits in the existingBin
			 *   array
			 * @return {{value : Array<number>, binLen : number}} Hash list where
			 *   "value" contains the output number array and "binLen" is the binary
			 *   length of "value"
			 */
			retVal = function(arr, existingBin, existingBinLen)
				{
				   return arraybuffer2packed(arr, existingBin, existingBinLen, bigEndianMod);
				};
			break;
		default:
			throw new Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
		}

		return retVal;
	}

	/**
	 * The 32-bit implementation of circular rotate left
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted circularly by n bits
	 */
	function rotl_32(x, n)
	{
		return (x << n) | (x >>> (32 - n));
	}

	/**
	 * The 64-bit implementation of circular rotate left
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {Int_64} The x shifted circularly by n bits
	 */
	function rotl_64(x, n)
	{
		if (n > 32)
		{
			n = n - 32;
			return new Int_64(
				x.lowOrder << n | x.highOrder >>> (32 - n),
				x.highOrder << n | x.lowOrder >>> (32 - n)
			);
		}
		else if (0 !== n)
		{
			return new Int_64(
				x.highOrder << n | x.lowOrder >>> (32 - n),
				x.lowOrder << n | x.highOrder >>> (32 - n)
			);
		}
		else
		{
			return x;
		}
	}

	/**
	 * The 32-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted circularly by n bits
	 */
	function rotr_32(x, n)
	{
		return (x >>> n) | (x << (32 - n));
	}

	/**
	 * The 64-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {Int_64} The x shifted circularly by n bits
	 */
	function rotr_64(x, n)
	{
		var retVal = null, tmp = new Int_64(x.highOrder, x.lowOrder);

		if (32 >= n)
		{
			retVal = new Int_64(
					(tmp.highOrder >>> n) | ((tmp.lowOrder << (32 - n)) & 0xFFFFFFFF),
					(tmp.lowOrder >>> n) | ((tmp.highOrder << (32 - n)) & 0xFFFFFFFF)
				);
		}
		else
		{
			retVal = new Int_64(
					(tmp.lowOrder >>> (n - 32)) | ((tmp.highOrder << (64 - n)) & 0xFFFFFFFF),
					(tmp.highOrder >>> (n - 32)) | ((tmp.lowOrder << (64 - n)) & 0xFFFFFFFF)
				);
		}

		return retVal;
	}

	/**
	 * The 32-bit implementation of shift right
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted by n bits
	 */
	function shr_32(x, n)
	{
		return x >>> n;
	}

	/**
	 * The 64-bit implementation of shift right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {Int_64} The x shifted by n bits
	 */
	function shr_64(x, n)
	{
		var retVal = null;

		if (32 >= n)
		{
			retVal = new Int_64(
					x.highOrder >>> n,
					x.lowOrder >>> n | ((x.highOrder << (32 - n)) & 0xFFFFFFFF)
				);
		}
		else
		{
			retVal = new Int_64(
					0,
					x.highOrder >>> (n - 32)
				);
		}

		return retVal;
	}

	/**
	 * The 32-bit implementation of the NIST specified Parity function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function parity_32(x, y, z)
	{
		return x ^ y ^ z;
	}

	/**
	 * The 32-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function ch_32(x, y, z)
	{
		return (x & y) ^ (~x & z);
	}

	/**
	 * The 64-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function ch_64(x, y, z)
	{
		return new Int_64(
				(x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
				(x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
			);
	}

	/**
	 * The 32-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function maj_32(x, y, z)
	{
		return (x & y) ^ (x & z) ^ (y & z);
	}

	/**
	 * The 64-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function maj_64(x, y, z)
	{
		return new Int_64(
				(x.highOrder & y.highOrder) ^
				(x.highOrder & z.highOrder) ^
				(y.highOrder & z.highOrder),
				(x.lowOrder & y.lowOrder) ^
				(x.lowOrder & z.lowOrder) ^
				(y.lowOrder & z.lowOrder)
			);
	}

	/**
	 * The 32-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function sigma0_32(x)
	{
		return rotr_32(x, 2) ^ rotr_32(x, 13) ^ rotr_32(x, 22);
	}

	/**
	 * The 64-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function sigma0_64(x)
	{
		var rotr28 = rotr_64(x, 28), rotr34 = rotr_64(x, 34),
			rotr39 = rotr_64(x, 39);

		return new Int_64(
				rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
				rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder);
	}

	/**
	 * The 32-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function sigma1_32(x)
	{
		return rotr_32(x, 6) ^ rotr_32(x, 11) ^ rotr_32(x, 25);
	}

	/**
	 * The 64-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function sigma1_64(x)
	{
		var rotr14 = rotr_64(x, 14), rotr18 = rotr_64(x, 18),
			rotr41 = rotr_64(x, 41);

		return new Int_64(
				rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
				rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder);
	}

	/**
	 * The 32-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function gamma0_32(x)
	{
		return rotr_32(x, 7) ^ rotr_32(x, 18) ^ shr_32(x, 3);
	}

	/**
	 * The 64-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function gamma0_64(x)
	{
		var rotr1 = rotr_64(x, 1), rotr8 = rotr_64(x, 8), shr7 = shr_64(x, 7);

		return new Int_64(
				rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
				rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
			);
	}

	/**
	 * The 32-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function gamma1_32(x)
	{
		return rotr_32(x, 17) ^ rotr_32(x, 19) ^ shr_32(x, 10);
	}

	/**
	 * The 64-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function gamma1_64(x)
	{
		var rotr19 = rotr_64(x, 19), rotr61 = rotr_64(x, 61),
			shr6 = shr_64(x, 6);

		return new Int_64(
				rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
				rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
			);
	}

	/**
	 * Add two 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @return {number} The sum of a + b
	 */
	function safeAdd_32_2(a, b)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}

	/**
	 * Add four 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @param {number} c The third 32-bit integer argument to be added
	 * @param {number} d The fourth 32-bit integer argument to be added
	 * @return {number} The sum of a + b + c + d
	 */
	function safeAdd_32_4(a, b, c, d)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
				(lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}

	/**
	 * Add five 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @param {number} c The third 32-bit integer argument to be added
	 * @param {number} d The fourth 32-bit integer argument to be added
	 * @param {number} e The fifth 32-bit integer argument to be added
	 * @return {number} The sum of a + b + c + d + e
	 */
	function safeAdd_32_5(a, b, c, d, e)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF) +
				(e & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
				(e >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}

	/**
	 * Add two 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument to be added
	 * @param {Int_64} y The second 64-bit integer argument to be added
	 * @return {Int_64} The sum of x + y
	 */
	function safeAdd_64_2(x, y)
	{
		var lsw, msw, lowOrder, highOrder;

		lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
		msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	}

	/**
	 * Add four 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} a The first 64-bit integer argument to be added
	 * @param {Int_64} b The second 64-bit integer argument to be added
	 * @param {Int_64} c The third 64-bit integer argument to be added
	 * @param {Int_64} d The fouth 64-bit integer argument to be added
	 * @return {Int_64} The sum of a + b + c + d
	 */
	function safeAdd_64_4(a, b, c, d)
	{
		var lsw, msw, lowOrder, highOrder;

		lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
			(c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
		msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
			(c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
			(c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
			(c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	}

	/**
	 * Add five 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} a The first 64-bit integer argument to be added
	 * @param {Int_64} b The second 64-bit integer argument to be added
	 * @param {Int_64} c The third 64-bit integer argument to be added
	 * @param {Int_64} d The fouth 64-bit integer argument to be added
	 * @param {Int_64} e The fouth 64-bit integer argument to be added
	 * @return {Int_64} The sum of a + b + c + d + e
	 */
	function safeAdd_64_5(a, b, c, d, e)
	{
		var lsw, msw, lowOrder, highOrder;

		lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
			(c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) +
			(e.lowOrder & 0xFFFF);
		msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
			(c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) +
			(lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
			(c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) +
			(e.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
			(c.highOrder >>> 16) + (d.highOrder >>> 16) +
			(e.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	}

	/**
	 * XORs two given arguments.
	 *
	 * @private
	 * @param {Int_64} a First argument to be XORed
	 * @param {Int_64} b Second argument to be XORed
	 * @return {Int_64} The XOR of the arguments
	 */
	function xor_64_2(a, b)
	{
		return new Int_64(
			a.highOrder ^ b.highOrder,
			a.lowOrder ^ b.lowOrder
		);
	}

	/**
	 * XORs five given arguments.
	 *
	 * @private
	 * @param {Int_64} a First argument to be XORed
	 * @param {Int_64} b Second argument to be XORed
	 * @param {Int_64} c Third argument to be XORed
	 * @param {Int_64} d Fourth argument to be XORed
	 * @param {Int_64} e Fifth argument to be XORed
	 * @return {Int_64} The XOR of the arguments
	 */
	function xor_64_5(a, b, c, d, e)
	{
		return new Int_64(
			a.highOrder ^ b.highOrder ^ c.highOrder ^ d.highOrder ^ e.highOrder,
			a.lowOrder ^ b.lowOrder ^ c.lowOrder ^ d.lowOrder ^ e.lowOrder
		);
	}

	/**
	 * Returns a clone of the given SHA3 state
	 *
	 * @private
	 * @param {Array<Array<Int_64>>} state The state to be cloned
	 * @return {Array<Array<Int_64>>} The cloned state
	 */
	function cloneSHA3State(state) {
		var clone = [], i;
		for (i = 0; i < 5; i += 1)
		{
			clone[i] = state[i].slice();
		}

		return clone;
	}

	/**
	 * Gets the state values for the specified SHA variant
	 *
	 * @param {string} variant The SHA variant
	 * @return {Array<number|Int_64|Array<null>>} The initial state values
	 */
	function getNewState(variant)
	{
		var retVal = [], H_trunc, H_full, i;

		if (("SHA-1" === variant) && ((1 & SUPPORTED_ALGS) !== 0))
		{
			retVal = [
				0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0
			];
		}
		else if ((variant.lastIndexOf("SHA-", 0) === 0) && ((6 & SUPPORTED_ALGS) !== 0))
		{
			H_trunc = [
				0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
				0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
			];
			H_full = [
				0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
				0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
			];

			switch (variant)
			{
			case "SHA-224":
				retVal = H_trunc;
				break;
			case "SHA-256":
				retVal = H_full;
				break;
			case "SHA-384":
				retVal = [
					new Int_64(0xcbbb9d5d, H_trunc[0]),
					new Int_64(0x0629a292a, H_trunc[1]),
					new Int_64(0x9159015a, H_trunc[2]),
					new Int_64(0x0152fecd8, H_trunc[3]),
					new Int_64(0x67332667, H_trunc[4]),
					new Int_64(0x98eb44a87, H_trunc[5]),
					new Int_64(0xdb0c2e0d, H_trunc[6]),
					new Int_64(0x047b5481d, H_trunc[7])
				];
				break;
			case "SHA-512":
				retVal = [
					new Int_64(H_full[0], 0xf3bcc908),
					new Int_64(H_full[1], 0x84caa73b),
					new Int_64(H_full[2], 0xfe94f82b),
					new Int_64(H_full[3], 0x5f1d36f1),
					new Int_64(H_full[4], 0xade682d1),
					new Int_64(H_full[5], 0x2b3e6c1f),
					new Int_64(H_full[6], 0xfb41bd6b),
					new Int_64(H_full[7], 0x137e2179)
				];
				break;
			default:
				throw new Error("Unknown SHA variant");
			}
		}
		else if (((variant.lastIndexOf("SHA3-", 0) === 0) || (variant.lastIndexOf("SHAKE", 0) === 0)) &&
			((8 & SUPPORTED_ALGS) !== 0))
		{
			for (i = 0; i < 5; i += 1)
			{
				retVal[i] = [new Int_64(0, 0), new Int_64(0, 0), new Int_64(0, 0), new Int_64(0, 0), new Int_64(0, 0)];
			}
		}
		else
		{
			throw new Error("No SHA variants supported");
		}

		return retVal;
	}

	/**
	 * Performs a round of SHA-1 hashing over a 512-byte block
	 *
	 * @private
	 * @param {Array<number>} block The binary array representation of the
	 *   block to hash
	 * @param {Array<number>} H The intermediate H values from a previous
	 *   round
	 * @return {Array<number>} The resulting H values
	 */
	function roundSHA1(block, H)
	{
		var W = [], a, b, c, d, e, T, ch = ch_32, parity = parity_32,
			maj = maj_32, rotl = rotl_32, safeAdd_2 = safeAdd_32_2, t,
			safeAdd_5 = safeAdd_32_5;

		a = H[0];
		b = H[1];
		c = H[2];
		d = H[3];
		e = H[4];

		for (t = 0; t < 80; t += 1)
		{
			if (t < 16)
			{
				W[t] = block[t];
			}
			else
			{
				W[t] = rotl(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
			}

			if (t < 20)
			{
				T = safeAdd_5(rotl(a, 5), ch(b, c, d), e, 0x5a827999, W[t]);
			}
			else if (t < 40)
			{
				T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0x6ed9eba1, W[t]);
			}
			else if (t < 60)
			{
				T = safeAdd_5(rotl(a, 5), maj(b, c, d), e, 0x8f1bbcdc, W[t]);
			} else {
				T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0xca62c1d6, W[t]);
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

		return H;
	}

	/**
	 * Finalizes the SHA-1 hash
	 *
	 * @private
	 * @param {Array<number>} remainder Any leftover unprocessed packed ints
	 *   that still need to be processed
	 * @param {number} remainderBinLen The number of bits in remainder
	 * @param {number} processedBinLen The number of bits already
	 *   processed
	 * @param {Array<number>} H The intermediate H values from a previous
	 *   round
	 * @param {number} outputLen Unused for this variant
	 * @return {Array<number>} The array of integers representing the SHA-1
	 *   hash of message
	 */
	function finalizeSHA1(remainder, remainderBinLen, processedBinLen, H, outputLen)
	{
		var i, appendedMessageLength, offset, totalLen;

		/* The 65 addition is a hack but it works.  The correct number is
		   actually 72 (64 + 8) but the below math fails if
		   remainderBinLen + 72 % 512 = 0. Since remainderBinLen % 8 = 0,
		   "shorting" the addition is OK. */
		offset = (((remainderBinLen + 65) >>> 9) << 4) + 15;
		while (remainder.length <= offset)
		{
			remainder.push(0);
		}
		/* Append '1' at the end of the binary string */
		remainder[remainderBinLen >>> 5] |= 0x80 << (24 - (remainderBinLen % 32));
		/* Append length of binary string in the position such that the new
		 * length is a multiple of 512.  Logic does not work for even multiples
		 * of 512 but there can never be even multiples of 512. JavaScript
		 * numbers are limited to 2^53 so it's "safe" to treat the totalLen as
		 * a 64-bit integer. */
		totalLen = remainderBinLen + processedBinLen;
		remainder[offset] = totalLen & 0xFFFFFFFF;
		/* Bitwise operators treat the operand as a 32-bit number so need to
		 * use hacky division and round to get access to upper 32-ish bits */
		remainder[offset - 1] = (totalLen / TWO_PWR_32) | 0;

		appendedMessageLength = remainder.length;

		/* This will always be at least 1 full chunk */
		for (i = 0; i < appendedMessageLength; i += 16)
		{
			H = roundSHA1(remainder.slice(i, i + 16), H);
		}

		return H;
	}

	/* Put this here so the K arrays aren't put on the stack for every block */
	var K_sha2, K_sha512, r_sha3, rc_sha3;
	if ((6 & SUPPORTED_ALGS) !== 0)
	{
		K_sha2 = [
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

		if ((4 & SUPPORTED_ALGS) !== 0)
		{
			 K_sha512 = [
				new Int_64(K_sha2[ 0], 0xd728ae22), new Int_64(K_sha2[ 1], 0x23ef65cd),
				new Int_64(K_sha2[ 2], 0xec4d3b2f), new Int_64(K_sha2[ 3], 0x8189dbbc),
				new Int_64(K_sha2[ 4], 0xf348b538), new Int_64(K_sha2[ 5], 0xb605d019),
				new Int_64(K_sha2[ 6], 0xaf194f9b), new Int_64(K_sha2[ 7], 0xda6d8118),
				new Int_64(K_sha2[ 8], 0xa3030242), new Int_64(K_sha2[ 9], 0x45706fbe),
				new Int_64(K_sha2[10], 0x4ee4b28c), new Int_64(K_sha2[11], 0xd5ffb4e2),
				new Int_64(K_sha2[12], 0xf27b896f), new Int_64(K_sha2[13], 0x3b1696b1),
				new Int_64(K_sha2[14], 0x25c71235), new Int_64(K_sha2[15], 0xcf692694),
				new Int_64(K_sha2[16], 0x9ef14ad2), new Int_64(K_sha2[17], 0x384f25e3),
				new Int_64(K_sha2[18], 0x8b8cd5b5), new Int_64(K_sha2[19], 0x77ac9c65),
				new Int_64(K_sha2[20], 0x592b0275), new Int_64(K_sha2[21], 0x6ea6e483),
				new Int_64(K_sha2[22], 0xbd41fbd4), new Int_64(K_sha2[23], 0x831153b5),
				new Int_64(K_sha2[24], 0xee66dfab), new Int_64(K_sha2[25], 0x2db43210),
				new Int_64(K_sha2[26], 0x98fb213f), new Int_64(K_sha2[27], 0xbeef0ee4),
				new Int_64(K_sha2[28], 0x3da88fc2), new Int_64(K_sha2[29], 0x930aa725),
				new Int_64(K_sha2[30], 0xe003826f), new Int_64(K_sha2[31], 0x0a0e6e70),
				new Int_64(K_sha2[32], 0x46d22ffc), new Int_64(K_sha2[33], 0x5c26c926),
				new Int_64(K_sha2[34], 0x5ac42aed), new Int_64(K_sha2[35], 0x9d95b3df),
				new Int_64(K_sha2[36], 0x8baf63de), new Int_64(K_sha2[37], 0x3c77b2a8),
				new Int_64(K_sha2[38], 0x47edaee6), new Int_64(K_sha2[39], 0x1482353b),
				new Int_64(K_sha2[40], 0x4cf10364), new Int_64(K_sha2[41], 0xbc423001),
				new Int_64(K_sha2[42], 0xd0f89791), new Int_64(K_sha2[43], 0x0654be30),
				new Int_64(K_sha2[44], 0xd6ef5218), new Int_64(K_sha2[45], 0x5565a910),
				new Int_64(K_sha2[46], 0x5771202a), new Int_64(K_sha2[47], 0x32bbd1b8),
				new Int_64(K_sha2[48], 0xb8d2d0c8), new Int_64(K_sha2[49], 0x5141ab53),
				new Int_64(K_sha2[50], 0xdf8eeb99), new Int_64(K_sha2[51], 0xe19b48a8),
				new Int_64(K_sha2[52], 0xc5c95a63), new Int_64(K_sha2[53], 0xe3418acb),
				new Int_64(K_sha2[54], 0x7763e373), new Int_64(K_sha2[55], 0xd6b2b8a3),
				new Int_64(K_sha2[56], 0x5defb2fc), new Int_64(K_sha2[57], 0x43172f60),
				new Int_64(K_sha2[58], 0xa1f0ab72), new Int_64(K_sha2[59], 0x1a6439ec),
				new Int_64(K_sha2[60], 0x23631e28), new Int_64(K_sha2[61], 0xde82bde9),
				new Int_64(K_sha2[62], 0xb2c67915), new Int_64(K_sha2[63], 0xe372532b),
				new Int_64(0xca273ece, 0xea26619c), new Int_64(0xd186b8c7, 0x21c0c207),
				new Int_64(0xeada7dd6, 0xcde0eb1e), new Int_64(0xf57d4f7f, 0xee6ed178),
				new Int_64(0x06f067aa, 0x72176fba), new Int_64(0x0a637dc5, 0xa2c898a6),
				new Int_64(0x113f9804, 0xbef90dae), new Int_64(0x1b710b35, 0x131c471b),
				new Int_64(0x28db77f5, 0x23047d84), new Int_64(0x32caab7b, 0x40c72493),
				new Int_64(0x3c9ebe0a, 0x15c9bebc), new Int_64(0x431d67c4, 0x9c100d4c),
				new Int_64(0x4cc5d4be, 0xcb3e42b6), new Int_64(0x597f299c, 0xfc657e2a),
				new Int_64(0x5fcb6fab, 0x3ad6faec), new Int_64(0x6c44198c, 0x4a475817)
			];
		}
	}
	if ((8 & SUPPORTED_ALGS) !== 0)
	{
		rc_sha3 = [
			new Int_64(0x00000000, 0x00000001), new Int_64(0x00000000, 0x00008082),
			new Int_64(0x80000000, 0x0000808A), new Int_64(0x80000000, 0x80008000),
			new Int_64(0x00000000, 0x0000808B), new Int_64(0x00000000, 0x80000001),
			new Int_64(0x80000000, 0x80008081), new Int_64(0x80000000, 0x00008009),
			new Int_64(0x00000000, 0x0000008A), new Int_64(0x00000000, 0x00000088),
			new Int_64(0x00000000, 0x80008009), new Int_64(0x00000000, 0x8000000A),
			new Int_64(0x00000000, 0x8000808B), new Int_64(0x80000000, 0x0000008B),
			new Int_64(0x80000000, 0x00008089), new Int_64(0x80000000, 0x00008003),
			new Int_64(0x80000000, 0x00008002), new Int_64(0x80000000, 0x00000080),
			new Int_64(0x00000000, 0x0000800A), new Int_64(0x80000000, 0x8000000A),
			new Int_64(0x80000000, 0x80008081), new Int_64(0x80000000, 0x00008080),
			new Int_64(0x00000000, 0x80000001), new Int_64(0x80000000, 0x80008008)
		];

		r_sha3 = [
			[ 0, 36,  3, 41, 18],
			[ 1, 44, 10, 45,  2],
			[62,  6, 43, 15, 61],
			[28, 55, 25, 21, 56],
			[27, 20, 39,  8, 14]
		];
	}

	/**
	 * Performs a round of SHA-2 hashing over a block
	 *
	 * @private
	 * @param {Array<number>} block The binary array representation of the
	 *   block to hash
	 * @param {Array<number|Int_64>} H The intermediate H values from a previous
	 *   round
	 * @param {string} variant The desired SHA-2 variant
	 * @return {Array<number|Int_64>} The resulting H values
	 */
	function roundSHA2(block, H, variant)
	{
		var a, b, c, d, e, f, g, h, T1, T2, numRounds, t, binaryStringMult,
			safeAdd_2, safeAdd_4, safeAdd_5, gamma0, gamma1, sigma0, sigma1,
			ch, maj, Int, W = [], int1, int2, offset, K;

		/* Set up the various function handles and variable for the specific
		 * variant */
		if ((variant === "SHA-224" || variant === "SHA-256") &&
			((2 & SUPPORTED_ALGS) !== 0))
		{
			/* 32-bit variant */
			numRounds = 64;
			binaryStringMult = 1;
			Int = Number;
			safeAdd_2 = safeAdd_32_2;
			safeAdd_4 = safeAdd_32_4;
			safeAdd_5 = safeAdd_32_5;
			gamma0 = gamma0_32;
			gamma1 = gamma1_32;
			sigma0 = sigma0_32;
			sigma1 = sigma1_32;
			maj = maj_32;
			ch = ch_32;
			K = K_sha2;
		}
		else if ((variant === "SHA-384" || variant === "SHA-512") &&
			((4 & SUPPORTED_ALGS) !== 0))
		{
			/* 64-bit variant */
			numRounds = 80;
			binaryStringMult = 2;
			Int = Int_64;
			safeAdd_2 = safeAdd_64_2;
			safeAdd_4 = safeAdd_64_4;
			safeAdd_5 = safeAdd_64_5;
			gamma0 = gamma0_64;
			gamma1 = gamma1_64;
			sigma0 = sigma0_64;
			sigma1 = sigma1_64;
			maj = maj_64;
			ch = ch_64;
			K = K_sha512;
		}
		else
		{
			throw new Error("Unexpected error in SHA-2 implementation");
		}

		a = H[0];
		b = H[1];
		c = H[2];
		d = H[3];
		e = H[4];
		f = H[5];
		g = H[6];
		h = H[7];

		for (t = 0; t < numRounds; t += 1)
		{
			if (t < 16)
			{
				offset = t * binaryStringMult;
				int1 = (block.length <= offset) ? 0 : block[offset];
				int2 = (block.length <= offset + 1) ? 0 : block[offset + 1];
				/* Bit of a hack - for 32-bit, the second term is ignored */
				W[t] = new Int(int1, int2);
			}
			else
			{
				W[t] = safeAdd_4(
						gamma1(W[t - 2]), W[t - 7],
						gamma0(W[t - 15]), W[t - 16]
					);
			}

			T1 = safeAdd_5(h, sigma1(e), ch(e, f, g), K[t], W[t]);
			T2 = safeAdd_2(sigma0(a), maj(a, b, c));
			h = g;
			g = f;
			f = e;
			e = safeAdd_2(d, T1);
			d = c;
			c = b;
			b = a;
			a = safeAdd_2(T1, T2);
		}

		H[0] = safeAdd_2(a, H[0]);
		H[1] = safeAdd_2(b, H[1]);
		H[2] = safeAdd_2(c, H[2]);
		H[3] = safeAdd_2(d, H[3]);
		H[4] = safeAdd_2(e, H[4]);
		H[5] = safeAdd_2(f, H[5]);
		H[6] = safeAdd_2(g, H[6]);
		H[7] = safeAdd_2(h, H[7]);

		return H;
	}

	/**
	 * Finalizes the SHA-2 hash
	 *
	 * @private
	 * @param {Array<number>} remainder Any leftover unprocessed packed ints
	 *   that still need to be processed
	 * @param {number} remainderBinLen The number of bits in remainder
	 * @param {number} processedBinLen The number of bits already
	 *   processed
	 * @param {Array<number|Int_64>} H The intermediate H values from a previous
	 *   round
	 * @param {string} variant The desired SHA-2 variant
	 * @param {number} outputLen Unused for this variant
	 * @return {Array<number>} The array of integers representing the SHA-2
	 *   hash of message
	 */
	function finalizeSHA2(remainder, remainderBinLen, processedBinLen, H, variant, outputLen)
	{
		var i, appendedMessageLength, offset, retVal, binaryStringInc, totalLen;

		if ((variant === "SHA-224" || variant === "SHA-256") &&
			((2 & SUPPORTED_ALGS) !== 0))
		{
			/* 32-bit variant */
			/* The 65 addition is a hack but it works.  The correct number is
			   actually 72 (64 + 8) but the below math fails if
			   remainderBinLen + 72 % 512 = 0. Since remainderBinLen % 8 = 0,
			   "shorting" the addition is OK. */
			offset = (((remainderBinLen + 65) >>> 9) << 4) + 15;
			binaryStringInc = 16;
		}
		else if ((variant === "SHA-384" || variant === "SHA-512") &&
			((4 & SUPPORTED_ALGS) !== 0))
		{
			/* 64-bit variant */
			/* The 129 addition is a hack but it works.  The correct number is
			   actually 136 (128 + 8) but the below math fails if
			   remainderBinLen + 136 % 1024 = 0. Since remainderBinLen % 8 = 0,
			   "shorting" the addition is OK. */
			offset = (((remainderBinLen + 129) >>> 10) << 5) + 31;
			binaryStringInc = 32;
		}
		else
		{
			throw new Error("Unexpected error in SHA-2 implementation");
		}

		while (remainder.length <= offset)
		{
			remainder.push(0);
		}
		/* Append '1' at the end of the binary string */
		remainder[remainderBinLen >>> 5] |= 0x80 << (24 - remainderBinLen % 32);
		/* Append length of binary string in the position such that the new
		 * length is correct. JavaScript numbers are limited to 2^53 so it's
		 * "safe" to treat the totalLen as a 64-bit integer. */
		totalLen = remainderBinLen + processedBinLen;
		remainder[offset] = totalLen & 0xFFFFFFFF;
		/* Bitwise operators treat the operand as a 32-bit number so need to
		 * use hacky division and round to get access to upper 32-ish bits */
		remainder[offset - 1] = (totalLen / TWO_PWR_32) | 0;

		appendedMessageLength = remainder.length;

		/* This will always be at least 1 full chunk */
		for (i = 0; i < appendedMessageLength; i += binaryStringInc)
		{
			H = roundSHA2(remainder.slice(i, i + binaryStringInc), H, variant);
		}

		if (("SHA-224" === variant) && ((2 & SUPPORTED_ALGS) !== 0))
		{
			retVal = [
				H[0], H[1], H[2], H[3],
				H[4], H[5], H[6]
			];
		}
		else if (("SHA-256" === variant) && ((2 & SUPPORTED_ALGS) !== 0))
		{
			retVal = H;
		}
		else if (("SHA-384" === variant) && ((4 & SUPPORTED_ALGS) !== 0))
		{
			retVal = [
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder
			];
		}
		else if (("SHA-512" === variant) && ((4 & SUPPORTED_ALGS) !== 0))
		{
			retVal = [
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder,
				H[6].highOrder, H[6].lowOrder,
				H[7].highOrder, H[7].lowOrder
			];
		}
		else /* This should never be reached */
		{
			throw new Error("Unexpected error in SHA-2 implementation");
		}

		return retVal;
	}

	/**
	 * Performs a round of SHA-3 hashing over a block
	 *
	 * @private
	 * @param {Array<number>|null} block The binary array representation of the
	 *   block to hash
	 * @param {Array<Array<Int_64>>} state The binary array representation of the
	 *   block to hash
	 * @return {Array<Array<Int_64>>} The resulting state value
	 */
	function roundSHA3(block, state)
	{
		var round, x, y, B, C = [], D = [];

		if (null !== block)
		{
			for (x = 0; x < block.length; x+=2)
			{
				state[(x >>> 1) % 5][((x >>> 1) / 5) | 0] = xor_64_2(
					state[(x >>> 1) % 5][((x >>> 1) / 5) | 0],
					new Int_64(block[x + 1], block[x])
				);
			}
		}

		for (round = 0; round < 24; round += 1)
		{
			/* getNewState doesn't care about variant beyond SHA3 so feed it a
			   value that triggers the getNewState "if" statement
			*/
			B = getNewState("SHA3-");

			/* Perform theta step */
			for (x = 0; x < 5; x += 1)
			{
				C[x] = xor_64_5(state[x][0], state[x][1], state[x][2],
					state[x][3], state[x][4]);
			}
			for (x = 0; x < 5; x += 1)
			{
				D[x] = xor_64_2(C[(x + 4) % 5], rotl_64(C[(x + 1) % 5], 1));
			}
			for (x = 0; x < 5; x += 1)
			{
				for (y = 0; y < 5; y += 1)
				{
					state[x][y] = xor_64_2(state[x][y], D[x]);
				}
			}

			/* Perform combined ro and pi steps */
			for (x = 0; x < 5; x += 1)
			{
				for (y = 0; y < 5; y += 1)
				{
					B[y][(2 * x + 3 * y) % 5] = rotl_64(
						state[x][y],
						r_sha3[x][y]
					);
				}
			}

			/* Perform chi step */
			for (x = 0; x < 5; x += 1)
			{
				for (y = 0; y < 5; y += 1)
				{
					state[x][y] = xor_64_2(
						B[x][y],
						new Int_64(
							~(B[(x + 1) % 5][y].highOrder) & B[(x + 2) % 5][y].highOrder,
							~(B[(x + 1) % 5][y].lowOrder)  & B[(x + 2) % 5][y].lowOrder
						)
					);
				}
			}

			/* Perform iota step */
			state[0][0] = xor_64_2(state[0][0], rc_sha3[round]);
		}

		return state;
	}

	/**
	 * Finalizes the SHA-3 hash
	 *
	 * @private
	 * @param {Array<number>} remainder Any leftover unprocessed packed ints
	 *   that still need to be processed
	 * @param {number} remainderBinLen The number of bits in remainder
	 * @param {number} processedBinLen The number of bits already
	 *   processed
	 * @param {Array<Array<Int_64>>} state The state from a previous round
	 * @param {number} blockSize The block size/rate of the variant in bits
	 * @param {number} delimiter The delimiter value for the variant
	 * @param {number} outputLen The output length for the variant in bits
	 * @return {Array<number>} The array of integers representing the SHA-3
	 *   hash of message
	 */
	function finalizeSHA3(remainder, remainderBinLen, processedBinLen, state, blockSize, delimiter, outputLen)
	{
		var i, retVal = [], binaryStringInc = blockSize >>> 5, state_offset = 0,
			remainderIntLen = remainderBinLen >>> 5, temp;


		/* Process as many blocks as possible, some may be here for multiple rounds
		   with SHAKE
		*/
		for (i = 0; i < remainderIntLen && remainderBinLen >= blockSize; i += binaryStringInc)
		{
			state = roundSHA3(remainder.slice(i, i + binaryStringInc), state);
			remainderBinLen -= blockSize;
		}

		remainder = remainder.slice(i);
		remainderBinLen = remainderBinLen % blockSize;

		/* Pad out the remainder to a full block */
		while (remainder.length < binaryStringInc)
		{
			remainder.push(0);
		}

		/* Find the next "empty" byte for the 0x80 and append it via an xor */
		i = remainderBinLen >>> 3;
		remainder[i >> 2] ^= delimiter << (8 * (i % 4));

		remainder[binaryStringInc - 1] ^= 0x80000000;
		state = roundSHA3(remainder, state);

		while (retVal.length * 32 < outputLen)
		{
			temp = state[state_offset % 5][(state_offset / 5) | 0];
			retVal.push(temp.lowOrder);
			if (retVal.length * 32 >= outputLen)
			{
				break;
			}
			retVal.push(temp.highOrder);
			state_offset += 1;

			if (0 === ((state_offset * 64) % blockSize))
			{
				roundSHA3(null, state);
			}
		}

		return retVal;
	}

	/**
	 * jsSHA is the workhorse of the library.  Instantiate it with the string to
	 * be hashed as the parameter
	 *
	 * @constructor
	 * @this {jsSHA}
	 * @param {string} variant The desired SHA variant (SHA-1, SHA-224, SHA-256,
	 *   SHA-384, SHA-512, SHA3-224, SHA3-256, SHA3-384, or SHA3-512)
	 * @param {string} inputFormat The format of srcString: HEX, TEXT, B64,
	 *   BYTES, or ARRAYBUFFER
	 * @param {{encoding: (string|undefined), numRounds: (number|undefined)}=}
	 *   options Optional values
	 */
	var jsSHA = function(variant, inputFormat, options)
	{
		var processedLen = 0, remainder = [], remainderLen = 0, utfType,
			intermediateState, converterFunc, shaVariant = variant, outputBinLen,
			variantBlockSize, roundFunc, finalizeFunc, stateCloneFunc,
			hmacKeySet = false, keyWithIPad = [], keyWithOPad = [], numRounds,
			updatedCalled = false, inputOptions, isSHAKE = false, bigEndianMod = -1;

		inputOptions = options || {};
		utfType = inputOptions["encoding"] || "UTF8";
		numRounds = inputOptions["numRounds"] || 1;

		if ((numRounds !== parseInt(numRounds, 10)) || (1 > numRounds))
		{
			throw new Error("numRounds must a integer >= 1");
		}

		if (("SHA-1" === shaVariant) && ((1 & SUPPORTED_ALGS) !== 0))
		{
			variantBlockSize = 512;
			roundFunc = roundSHA1;
			finalizeFunc = finalizeSHA1;
			outputBinLen = 160;
			stateCloneFunc = function(state) { return state.slice();};
		}
		else if ((shaVariant.lastIndexOf("SHA-", 0) === 0) && ((6 & SUPPORTED_ALGS) !== 0))
		{
			roundFunc = function (block, H) {
				return roundSHA2(block, H, shaVariant);
			};
			finalizeFunc = function (remainder, remainderBinLen, processedBinLen, H, outputLen)
			{
				return finalizeSHA2(remainder, remainderBinLen, processedBinLen, H, shaVariant, outputLen);
			};
			stateCloneFunc = function(state) { return state.slice(); };

			if (("SHA-224" === shaVariant) && ((2 & SUPPORTED_ALGS) !== 0))
			{
				variantBlockSize = 512;
				outputBinLen = 224;
			}
			else if (("SHA-256" === shaVariant) && ((2 & SUPPORTED_ALGS) !== 0))
			{
				variantBlockSize = 512;
				outputBinLen = 256;
			}
			else if (("SHA-384" === shaVariant) && ((4 & SUPPORTED_ALGS) !== 0))
			{
				variantBlockSize = 1024;
				outputBinLen = 384;
			}
			else if (("SHA-512" === shaVariant) && ((4 & SUPPORTED_ALGS) !== 0))
			{
				variantBlockSize = 1024;
				outputBinLen = 512;
			}
			else
			{
				throw new Error("Chosen SHA variant is not supported");
			}
		}
		else if (((shaVariant.lastIndexOf("SHA3-", 0) === 0) || (shaVariant.lastIndexOf("SHAKE", 0) === 0)) &&
			((8 & SUPPORTED_ALGS) !== 0))
		{
			var delimiter = 0x06;

			roundFunc = roundSHA3;
			stateCloneFunc = function(state) { return cloneSHA3State(state);};
			bigEndianMod = 1;

			if ("SHA3-224" === shaVariant)
			{
				variantBlockSize = 1152;
				outputBinLen = 224;

			}
			else if ("SHA3-256" === shaVariant)
			{
				variantBlockSize = 1088;
				outputBinLen = 256;
			}
			else if ("SHA3-384" === shaVariant)
			{
				variantBlockSize = 832;
				outputBinLen = 384;
			}
			else if ("SHA3-512" === shaVariant)
			{
				variantBlockSize = 576;
				outputBinLen = 512;
			}
			else if ("SHAKE128" === shaVariant)
			{
				variantBlockSize = 1344;
				outputBinLen = -1;
				delimiter = 0x1F;
				isSHAKE = true;
			}
			else if ("SHAKE256" === shaVariant)
			{
				variantBlockSize = 1088;
				outputBinLen = -1;
				delimiter = 0x1F;
				isSHAKE = true;
			}
			else
			{
				throw new Error("Chosen SHA variant is not supported");
			}
			finalizeFunc = function (remainder, remainderBinLen, processedBinLen, state, outputLen)
			{
				return finalizeSHA3(remainder, remainderBinLen, processedBinLen, state, variantBlockSize, delimiter, outputLen);
			};
		}
		else
		{
			throw new Error("Chosen SHA variant is not supported");
		}
		converterFunc = getStrConverter(inputFormat, utfType, bigEndianMod);
		intermediateState = getNewState(shaVariant);

		/**
		 * Sets the HMAC key for an eventual getHMAC call.  Must be called
		 * immediately after jsSHA object instantiation
		 *
		 * @expose
		 * @param {string|ArrayBuffer} key The key used to calculate the HMAC
		 * @param {string} inputFormat The format of key, HEX, TEXT, B64, BYTES,
		 *   or ARRAYBUFFER
		 * @param {{encoding : (string|undefined)}=} options Associative array
		 *   of input format options
		 */
		this.setHMACKey = function(key, inputFormat, options)
		{
			var keyConverterFunc, convertRet, keyBinLen, keyToUse, blockByteSize,
				i, lastArrayIndex, keyOptions;

			if (true === hmacKeySet)
			{
				throw new Error("HMAC key already set");
			}

			if (true === updatedCalled)
			{
				throw new Error("Cannot set HMAC key after calling update");
			}

			if ((isSHAKE === true) && ((8 & SUPPORTED_ALGS) !== 0))
			{
				throw new Error("SHAKE is not supported for HMAC");
			}

			keyOptions = options || {};
			utfType = keyOptions["encoding"] || "UTF8";

			keyConverterFunc = getStrConverter(inputFormat, utfType, bigEndianMod);

			convertRet = keyConverterFunc(key);
			keyBinLen = convertRet["binLen"];
			keyToUse = convertRet["value"];

			blockByteSize = variantBlockSize >>> 3;

			/* These are used multiple times, calculate and store them */
			lastArrayIndex = (blockByteSize / 4) - 1;

			/* Figure out what to do with the key based on its size relative to
			 * the hash's block size */
			if (blockByteSize < (keyBinLen / 8))
			{

				keyToUse = finalizeFunc(keyToUse, keyBinLen, 0,getNewState(shaVariant), outputBinLen);
				/* For all variants, the block size is bigger than the output
				 * size so there will never be a useful byte at the end of the
				 * string */
				while (keyToUse.length <= lastArrayIndex)
				{
					keyToUse.push(0);
				}
				keyToUse[lastArrayIndex] &= 0xFFFFFF00;
			}
			else if (blockByteSize > (keyBinLen / 8))
			{
				/* If the blockByteSize is greater than the key length, there
				 * will always be at LEAST one "useless" byte at the end of the
				 * string */
				while (keyToUse.length <= lastArrayIndex)
				{
					keyToUse.push(0);
				}
				keyToUse[lastArrayIndex] &= 0xFFFFFF00;
			}

			/* Create ipad and opad */
			for (i = 0; i <= lastArrayIndex; i += 1)
			{
				keyWithIPad[i] = keyToUse[i] ^ 0x36363636;
				keyWithOPad[i] = keyToUse[i] ^ 0x5C5C5C5C;
			}

			intermediateState = roundFunc(keyWithIPad, intermediateState);
			processedLen = variantBlockSize;

			hmacKeySet = true;
		};

		/**
		 * Takes strString and hashes as many blocks as possible.  Stores the
		 * rest for either a future update or getHash call.
		 *
		 * @expose
		 * @param {string|ArrayBuffer} srcString The string to be hashed
		 */
		this.update = function(srcString)
		{
			var convertRet, chunkBinLen, chunkIntLen, chunk, i, updateProcessedLen = 0,
				variantBlockIntInc = variantBlockSize >>> 5;

			convertRet = converterFunc(srcString, remainder, remainderLen);
			chunkBinLen = convertRet["binLen"];
			chunk = convertRet["value"];

			chunkIntLen = chunkBinLen >>> 5;
			for (i = 0; i < chunkIntLen; i += variantBlockIntInc)
			{
				if (updateProcessedLen + variantBlockSize <= chunkBinLen)
				{
					intermediateState = roundFunc(
						chunk.slice(i, i + variantBlockIntInc),
						intermediateState
					);
					updateProcessedLen += variantBlockSize;
				}
			}
			processedLen += updateProcessedLen;
			remainder = chunk.slice(updateProcessedLen >>> 5);
			remainderLen = chunkBinLen % variantBlockSize;
			updatedCalled = true;

		};

		/**
		 * Returns the desired SHA hash of the string specified at instantiation
		 * using the specified parameters
		 *
		 * @expose
		 * @param {string} format The desired output formatting (B64, HEX,
		 *   BYTES, or ARRAYBUFFER)
		 * @param {{outputUpper : (boolean|undefined), b64Pad : (string|undefined),
		 *   shakeLen : (number|undefined)}=} options Hash list of output formatting options
		 * @return {string|ArrayBuffer} The string representation of the hash
		 *   in the format specified.
		 */
		this.getHash = function(format, options)
		{
			var formatFunc, i, outputOptions, finalizedState;

			if (true === hmacKeySet)
			{
				throw new Error("Cannot call getHash after setting HMAC key");
			}

			outputOptions = getOutputOpts(options);

			if ((isSHAKE === true) && ((8 & SUPPORTED_ALGS) !== 0))
			{
				if (outputOptions["shakeLen"] === -1)
				{
					throw new Error("shakeLen must be specified in options");
				}
				outputBinLen = outputOptions["shakeLen"];
			}

			/* Validate the output format selection */
			switch (format)
			{
			case "HEX":
				formatFunc = function(binarray) {return packed2hex(binarray, outputBinLen, bigEndianMod, outputOptions);};
				break;
			case "B64":
				formatFunc = function(binarray) {return packed2b64(binarray, outputBinLen, bigEndianMod, outputOptions);};
				break;
			case "BYTES":
				formatFunc = function(binarray) {return packed2bytes(binarray, outputBinLen, bigEndianMod);};
				break;
			case "ARRAYBUFFER":
				try {
					i = new ArrayBuffer(0);
				} catch (ignore) {
					throw new Error("ARRAYBUFFER not supported by this environment");
				}
				formatFunc = function(binarray) {return packed2arraybuffer(binarray, outputBinLen, bigEndianMod);};
				break;
			default:
				throw new Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
			}

			finalizedState = finalizeFunc(remainder.slice(), remainderLen, processedLen, stateCloneFunc(intermediateState), outputBinLen);
			for (i = 1; i < numRounds; i += 1)
			{
				/* This weird fix-up is only for the case of SHAKE algorithms
				 * and outputBinLen is not a multiple of 32.  In this case, the
				 * very last block of finalizedState has data that needs to be
				 * ignored because all the finalizeFunc calls need to have
				 * unneeded bits set to 0.
				 */
				if (((8 & SUPPORTED_ALGS) !== 0) && (isSHAKE === true) && (outputBinLen % 32 !== 0))
				{
					finalizedState[finalizedState.length - 1] &= 0x00FFFFFF >>> 24 - (outputBinLen % 32);
				}
				finalizedState = finalizeFunc(finalizedState, outputBinLen, 0, getNewState(shaVariant), outputBinLen);
			}

			return formatFunc(finalizedState);
		};

		/**
		 * Returns the the HMAC in the specified format using the key given by
		 * a previous setHMACKey call.
		 *
		 * @expose
		 * @param {string} format The desired output formatting
		 *   (B64, HEX, BYTES, or ARRAYBUFFER)
		 * @param {{outputUpper : (boolean|undefined), b64Pad : (string|undefined),
		 *   shakeLen : (number|undefined)}=} options associative array of output
		 *   formatting options
		 * @return {string|ArrayBuffer} The string representation of the hash in the
		 *   format specified.
		 */
		this.getHMAC = function(format, options)
		{
			var formatFunc,	firstHash, outputOptions, finalizedState;

			if (false === hmacKeySet)
			{
				throw new Error("Cannot call getHMAC without first setting HMAC key");
			}

			outputOptions = getOutputOpts(options);

			/* Validate the output format selection */
			switch (format)
			{
			case "HEX":
				formatFunc = function(binarray) {return packed2hex(binarray, outputBinLen, bigEndianMod, outputOptions);};
				break;
			case "B64":
				formatFunc = function(binarray) {return packed2b64(binarray, outputBinLen, bigEndianMod, outputOptions);};
				break;
			case "BYTES":
				formatFunc = function(binarray) {return packed2bytes(binarray, outputBinLen, bigEndianMod);};
				break;
			case "ARRAYBUFFER":
				try {
					formatFunc = new ArrayBuffer(0);
				} catch(ignore) {
					throw new Error("ARRAYBUFFER not supported by this environment");
				}
				formatFunc = function(binarray) {return packed2arraybuffer(binarray, outputBinLen, bigEndianMod);};
				break;
			default:
				throw new Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
			}

			firstHash = finalizeFunc(remainder.slice(), remainderLen, processedLen, stateCloneFunc(intermediateState), outputBinLen);
			finalizedState = roundFunc(keyWithOPad, getNewState(shaVariant));
			finalizedState = finalizeFunc(firstHash, outputBinLen, variantBlockSize, finalizedState, outputBinLen);

			return formatFunc(finalizedState);
		};
	};

	if (("function" === typeof define) && (define["amd"])) /* AMD Support */
	{
		define(function()
		{
			return jsSHA;
		});
	} else if ("undefined" !== typeof exports) /* Node Support */
	{
		if (("undefined" !== typeof module) && module["exports"])
		{
		  module["exports"] = jsSHA;
		  exports = jsSHA;
		}
		else {
			exports = jsSHA;
		}
	} else { /* Browsers and Web Workers*/
		global["jsSHA"] = jsSHA;
	}
}(this));
