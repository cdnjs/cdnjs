/*	Utf8.js
 *
 *	A port of the Utf8 encoding functions written by Chris Veness, about as far
 *	back as 2002. I simply ported this to Node's module architecture and pushed it to
 *	npm (package manager), because... well, this is a ridiculously useful module to NOT have. ;P
 *
 *	@Authors: Chris Veness, Ryan McGrath <ryan@venodesigns.net>
 *	@Requires: Nothing
 */

/*	Encode multi-byte Unicode string into utf-8 multiple single-byte characters 
 * 	(BMP / basic multilingual plane only)
 *
 * 	Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * 	@param {String} strUni Unicode string to be encoded as UTF-8
 * 	@returns {String} encoded string
 */
exports.encode = function(strUni) {
	/*	Use regular expressions & String.replace callback function for better efficiency 
	 *	than procedural approaches
	 */
	var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function(c) { 
       	var cc = c.charCodeAt(0);
       	return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); 
	});
  
	strUtf = strUtf.replace(/[\u0800-\uffff]/g, function(c) { 
	    var cc = c.charCodeAt(0); 
	    return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); 
	});
  
	return strUtf;
};

/*	Decode utf-8 encoded string back into multi-byte Unicode characters
 *
 * 	@param {String} strUtf UTF-8 string to be decoded back to Unicode
 * 	@returns {String} decoded string
 */
exports.decode = function(strUtf) {
  	/* note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char! */
  	var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(c) {
    	var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
        return String.fromCharCode(cc); 
	});
  
	strUni = strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(c) {
		var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
		return String.fromCharCode(cc); 
	});
  
	return strUni;
};