/* A JavaScript implementation of the SHA family of hashes, as defined in FIPS PUB 180-2
 * Version 1.1 Copyright Brian Turek 2008
 * Distributed under the BSD License
 * See http://jssha.sourceforge.net/ for more information
 */
 
/***************************** Functions for sha.js *****************************/
/*
 * Returns the desired SHA hash of the specified stream formatted as hexidecimal
 *
 * @deprecated
 * @param {String} string The string to be hashed
 * @param {String} variant The desired SHA variant (SHA-1, SHA-224, SHA-256, SHA-384, or SHA-512)
 * @return The hexidecimal string representation of the hashed string
 */
function hex_sha(string, variant) {
	var shaObj = new jsSHA(string);
	return shaObj.getHash(variant, "HEX");
}

/*
 * Returns the desired SHA hash of the specified stream encoded in Base-64
 *
 * @deprecated
 * @param {String} string The string to be hashed
 * @param {String} variant The desired SHA variant (SHA-1, SHA-224, SHA-256, SHA-384, or SHA-512)
 * @return The base-64 encoded string representation of the hashed string
 */
function b64_sha(string, variant) {
	var shaObj = new jsSHA(string);
	return shaObj.getHash(variant, "B64");
}
/*************************** End Functions for sha.js ***************************/

/***************************** Functions for sha1.js ****************************/
function hex_sha(string){var shaObj=new jsSHA(string);return shaObj.getHash("HEX");}function b64_sha(string){var shaObj=new jsSHA(string);return shaObj.getHash("B64");}
/*************************** End Functions for sha1.js **************************/

/********************* Functions for sha256.js and sha512.js *********************/
function hex_sha(string,variant){var shaObj=new jsSHA(string);return shaObj.getHash(variant,"HEX");}function b64_sha(string,variant){var shaObj=new jsSHA(string);return shaObj.getHash(variant,"B64");}
/******************* End Functions for sha256.js and sha512.js *******************/