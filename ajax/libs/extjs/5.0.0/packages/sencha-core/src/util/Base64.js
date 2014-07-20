/**
 * @class Ext.util.Base64
 *
 * Base64 is a group of similar binary-to-text encoding schemes that represent binary data in an ASCII string format by
 * translating it into a radix-64 representation.
 *
 * This class is an implementation of base64 encoding and decoding functions and is UTF-8 safe.
 *
 * @singleton
 */
Ext.define('Ext.util.Base64', {
    singleton:true,

    /**
     * @private
     */
    _str : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /**
     * Encodes given string in to base64 formatted string
     * @param input
     * @returns {string}
     */
    encode : function (input) {
        var me = this;
        var output = '', chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            i = 0;

        input = me._utf8_encode(input);
        var len = input.length;

        while (i < len) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                me._str.charAt(enc1) + me._str.charAt(enc2) +
                me._str.charAt(enc3) + me._str.charAt(enc4);

        }

        return output;
    },

    /**
     * Decodes given base64 formatted string
     * @param input
     * @returns {string}
     */
    decode : function (input) {
        var me = this;
        var output = '',
            chr1, chr2, chr3,
            enc1, enc2, enc3, enc4,
            i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        var len = input.length;

        while (i < len) {

            enc1 = me._str.indexOf(input.charAt(i++));
            enc2 = me._str.indexOf(input.charAt(i++));
            enc3 = me._str.indexOf(input.charAt(i++));
            enc4 = me._str.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = me._utf8_decode(output);

        return output;
    },

    /**
     * @private
     * UTF-8 encoding
     */
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = '',
            n = 0,
            len = string.length;

        for (; n < len; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    /**
     * @private
     * UTF-8 decoding
     */
    _utf8_decode : function (utftext) {
        var string = '',
            i = 0,
            c = 0,
            c3 = 0,
            c2 = 0,
            len = utftext.length;

        while (i < len) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    }
});
