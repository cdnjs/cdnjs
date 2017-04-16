/*! PHP-JS | @link https://github.com/kvz/phpjs | @copyright Kevin van Zonneveld | @license MIT and GPL */
function count (mixed_var, mode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Waldo Malqui Silva
    // +   bugfixed by: Soren Hansen
    // +      input by: merabi
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Olivier Louvignes (http://mg-crea.com/)
    // +   improved by: Obinwanne Hill on 22-03-2013 (https://about.me/obinwanne.hill)
    // +   dependencies: isArray() and isObject()
    // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
    var key, nvld = false, cnt = 0;

    switch(true)
    {
        case (mixed_var === null || typeof mixed_var === 'undefined'):
            return 0;
            break;

        case (!isArray(mixed_var) && !isObject(mixed_var)):
            nvld = true;
            break;
    }

    switch(true)
    {
        case (mixed_var.hasOwnProperty('length')):
            return mixed_var.length;
            break;
    }

    //Return 1 if !isArray && !Object && does not have .length
    switch(true)
    {
        case (nvld):
            return 1;
            break;
    }

    switch(true)
    {
        case (mode === 'COUNT_RECURSIVE'):
            mode = 1;
            break;
    }

    switch(true)
    {
        case (mode != 1):
            mode = 0;
            break;
    }

    for (key in mixed_var) {
        switch(true)
        {
            case (mixed_var.hasOwnProperty(key)):
                cnt++;
                switch(true)
                {
                    case (mode == 1 && mixed_var[key] && (isArray(mixed_var[key]) || isObject(mixed_var[key]))):
                        cnt += this.count(mixed_var[key], 1);
                        break;
                }
                break;
        }
    }

    return cnt;
}

function in_array (needle, haystack, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // +   input by: Billy
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: in_array(1, ['1', '2', '3']);
    // *     returns 3: true
    // *     example 3: in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '',
        strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}

function array_search (needle, haystack, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
    // *     returns 1: 'surname'
    // *     example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
    // *     example 2: var ordered_arr = array({3:'value'}, {2:'value'}, {'a':'value'}, {'b':'value'});
    // *     example 2: var key = array_search(/val/g, ordered_arr); // or var key = ordered_arr.search(/val/g);
    // *     returns 2: '3'

    var strict = !!argStrict,
        key = '';

    if (haystack && typeof haystack === 'object' && haystack.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return haystack.search(needle, argStrict);
    }
    if (typeof needle === 'object' && needle.exec) { // Duck-type for RegExp
        if (!strict) { // Let's consider case sensitive searches as strict
            var flags = 'i' + (needle.global ? 'g' : '') +
                (needle.multiline ? 'm' : '') +
                (needle.sticky ? 'y' : ''); // sticky is FF only
            needle = new RegExp(needle.source, flags);
        }
        for (key in haystack) {
            if (needle.test(haystack[key])) {
                return key;
            }
        }
        return false;
    }

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            return key;
        }
    }

    return false;
}

function array_keys (input, search_value, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: jd
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   input by: P
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'firstname', 1: 'surname'}

    var search = typeof search_value !== 'undefined',
        tmp_arr = [],
        strict = !!argStrict,
        include = true,
        key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.keys(search_value, argStrict);
    }

    for (key in input) {
        if (input.hasOwnProperty(key)) {
            include = true;
            if (search) {
                if (strict && input[key] !== search_value) {
                    include = false;
                }
                else if (input[key] != search_value) {
                    include = false;
                }
            }

            if (include) {
                tmp_arr[tmp_arr.length] = key;
            }
        }
    }

    return tmp_arr;
}

function array_values (input) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}
    var tmp_arr = [],
        key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.values();
    }

    for (key in input) {
        tmp_arr[tmp_arr.length] = input[key];
    }

    return tmp_arr;
}

function array_combine (keys, values) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_combine([0,1,2], ['kevin','van','zonneveld']);
    // *     returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}
    var new_array = {},
        keycount = keys && keys.length,
        i = 0;

    // input sanitation
    if (typeof keys !== 'object' || typeof values !== 'object' || // Only accept arrays or array-like objects
        typeof keycount !== 'number' || typeof values.length !== 'number' || !keycount) { // Require arrays to have a count
        return false;
    }

    // number of elements does not match
    if (keycount != values.length) {
        return false;
    }

    for (i = 0; i < keycount; i++) {
        new_array[keys[i]] = values[i];
    }

    return new_array;
}

function implode (glue, pieces) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // +   improved by: Itsacon (http://www.itsacon.net/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    // *     returns 2: 'Kevin van Zonneveld'
    var i = '',
        retVal = '',
        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        for (i in pieces) {
            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }
    return pieces;
}

function explode (delimiter, string, limit) {

    if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
    if ( delimiter === '' || delimiter === false || delimiter === null) return false;
    if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
        return { 0: '' };
    }
    if ( delimiter === true ) delimiter = '1';

    // Here we go...
    delimiter += '';
    string += '';

    var s = string.split( delimiter );


    if ( typeof limit === 'undefined' ) return s;

    // Support for limit
    if ( limit === 0 ) limit = 1;

    // Positive limit
    if ( limit > 0 ){
        if ( limit >= s.length ) return s;
        return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
    }

    // Negative limit
    if ( -limit >= s.length ) return [];

    s.splice( s.length + limit );
    return s;
}

function urlencode (str) {
    // http://kevin.vanzonneveld.net
    // + original by: Philip Peterson
    // + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + input by: AJ
    // + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + improved by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + input by: travc
    // + input by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + improved by: Lars Fischer
    // + input by: Ratheous
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Joris
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // % note 1: This reflects PHP 5.3/6.0+ behavior
    // % note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    // % note 2: pages served as UTF-8
    // * example 1: urlencode('Kevin van Zonneveld!');
    // * returns 1: 'Kevin+van+Zonneveld%21'
    // * example 2: urlencode('http://kevin.vanzonneveld.net/');
    // * returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // * example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // * returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
    str = (str + '').toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function strrpos (haystack, needle, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   input by: saulius
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: strrpos('Kevin van Zonneveld', 'e');
    // *     returns 1: 16
    // *     example 2: strrpos('somepage.com', '.', false);
    // *     returns 2: 8
    // *     example 3: strrpos('baa', 'a', 3);
    // *     returns 3: false
    // *     example 4: strrpos('baa', 'a', 2);
    // *     returns 4: 2
    var i = -1;
    if (offset) {
        i = (haystack + '').slice(offset).lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
        // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
        if (i !== -1) {
            i += offset;
        }
    } else {
        i = (haystack + '').lastIndexOf(needle);
    }
    return i >= 0 ? i : false;
}

function uasort (inputArr, sorter) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // %        note 1: This function deviates from PHP in returning a copy of the array instead
    // %        note 1: of acting by reference and returning true; this was necessary because
    // %        note 1: IE does not allow deleting and re-adding of properties without caching
    // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 1: get the PHP behavior, but use this only if you are in an environment
    // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 1: property deletion is supported. Note that we intend to implement the PHP
    // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 1: is by reference in PHP anyways
    // *     example 1: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: fruits = uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
    // *     results 1: fruits == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    var valArr = [],
        tempKeyVal, tempValue, ret, k = '',
        i = 0,
        strictForIn = false,
        populateArr = {};

    if (typeof sorter === 'string') {
        sorter = this[sorter];
    } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
        sorter = this[sorter[0]][sorter[1]];
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;


    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push([k, inputArr[k]]);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    valArr.sort(function (a, b) {
        return sorter(a[1], b[1]);
    });

    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        populateArr[valArr[i][0]] = valArr[i][1];
    }

    return strictForIn || populateArr;
}

function microtime (get_as_float) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // *     example 1: timeStamp = microtime(true);
    // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
    var now = new Date().getTime() / 1000;
    var s = parseInt(now, 10);

    return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
}

/*! md5.js - MD5 Message-Digest - v2.0.0 | @copyright 1999,2002 Masanao Izumo <iz@onicos.co.jp>  */
/* md5.js - MD5 Message-Digest
 * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
 * Version: 2.0.0
 * LastModified: May 13 2002
 *
 * This program is free software.  You can redistribute it and/or modify
 * it without any warranty.  This library calculates the MD5 based on RFC1321.
 * See RFC1321 for more information and algorithm.
 */

/* Interface:
 * md5_hexstr = md5(data);
 */

/* ChangeLog
 * 2013/07/20: Updated by Obinwanne Ugwuh
 * 2002/05/13: Version 2.0.0 released
 * NOTICE: API is changed.
 * 2002/04/15: Bug fix about MD5 length.
 */
(function() {
    var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391);

    var MD5_round1 = new Array(new Array(0, 7, 1), new Array(1, 12, 2), new Array(2, 17, 3), new Array(3, 22, 4), new Array(4, 7, 5), new Array(5, 12, 6), new Array(6, 17, 7), new Array(7, 22, 8), new Array(8, 7, 9), new Array(9, 12, 10), new Array(10, 17, 11), new Array(11, 22, 12), new Array(12, 7, 13), new Array(13, 12, 14), new Array(14, 17, 15), new Array(15, 22, 16));

    var MD5_round2 = new Array(new Array(1, 5, 17), new Array(6, 9, 18), new Array(11, 14, 19), new Array(0, 20, 20), new Array(5, 5, 21), new Array(10, 9, 22), new Array(15, 14, 23), new Array(4, 20, 24), new Array(9, 5, 25), new Array(14, 9, 26), new Array(3, 14, 27), new Array(8, 20, 28), new Array(13, 5, 29), new Array(2, 9, 30), new Array(7, 14, 31), new Array(12, 20, 32));

    var MD5_round3 = new Array(new Array(5, 4, 33), new Array(8, 11, 34), new Array(11, 16, 35), new Array(14, 23, 36), new Array(1, 4, 37), new Array(4, 11, 38), new Array(7, 16, 39), new Array(10, 23, 40), new Array(13, 4, 41), new Array(0, 11, 42), new Array(3, 16, 43), new Array(6, 23, 44), new Array(9, 4, 45), new Array(12, 11, 46), new Array(15, 16, 47), new Array(2, 23, 48));

    var MD5_round4 = new Array(new Array(0, 6, 49), new Array(7, 10, 50), new Array(14, 15, 51), new Array(5, 21, 52), new Array(12, 6, 53), new Array(3, 10, 54), new Array(10, 15, 55), new Array(1, 21, 56), new Array(8, 6, 57), new Array(15, 10, 58), new Array(6, 15, 59), new Array(13, 21, 60), new Array(4, 6, 61), new Array(11, 10, 62), new Array(2, 15, 63), new Array(9, 21, 64));

    function MD5_F(x, y, z) {
        return (x & y) | (~x & z);
    }

    function MD5_G(x, y, z) {
        return (x & z) | (y & ~z);
    }

    function MD5_H(x, y, z) {
        return x ^ y ^ z;
    }

    function MD5_I(x, y, z) {
        return y ^ (x | ~z);
    }

    var MD5_round = new Array(new Array(MD5_F, MD5_round1), new Array(MD5_G, MD5_round2), new Array(MD5_H, MD5_round3), new Array(MD5_I, MD5_round4));

    function MD5_pack(n32) {
        return String.fromCharCode(n32 & 0xff) + String.fromCharCode((n32 >>> 8) & 0xff) + String.fromCharCode((n32 >>> 16) & 0xff) + String.fromCharCode((n32 >>> 24) & 0xff);
    }

    function MD5_unpack(s4) {
        return s4.charCodeAt(0) | (s4.charCodeAt(1) << 8) | (s4.charCodeAt(2) << 16) | (s4.charCodeAt(3) << 24);
    }

    function MD5_number(n) {
        while (n < 0)
            n += 4294967296;
        while (n > 4294967295)
            n -= 4294967296;
        return n;
    }

    function MD5_apply_round(x, s, f, abcd, r) {
        var a, b, c, d;
        var kk, ss, ii;
        var t, u;

        a = abcd[0];
        b = abcd[1];
        c = abcd[2];
        d = abcd[3];
        kk = r[0];
        ss = r[1];
        ii = r[2];

        u = f(s[b], s[c], s[d]);
        t = s[a] + u + x[kk] + MD5_T[ii];
        t = MD5_number(t);
        t = ((t << ss) | (t >>> (32 - ss)));
        t += s[b];
        s[a] = MD5_number(t);
    }

    function utf8_encode(s)
    {
        for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
            s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
            );
        return s.join("");
    }

    function MD5_hash(data) {
        var abcd, x, state, s;
        var len, index, padLen, f, r;
        var i, j, k;
        var tmp;

        if (/[\x80-\xFF]/.test(data)) {
            data = utf8_encode(data);

        }

        state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
        len = data.length;
        index = len & 0x3f;
        padLen = (index < 56) ? (56 - index) : (120 - index);
        if (padLen > 0) {
            data += "\x80";
            for (i = 0; i < padLen - 1; i++)
                data += "\x00";
        }
        data += MD5_pack(len * 8);
        data += MD5_pack(0);
        len += padLen + 8;
        abcd = new Array(0, 1, 2, 3);
        x = new Array(16);
        s = new Array(4);

        for (k = 0; k < len; k += 64) {
            for (i = 0, j = k; i < 16; i++, j += 4) {
                x[i] = data.charCodeAt(j) | (data.charCodeAt(j + 1) << 8) | (data.charCodeAt(j + 2) << 16) | (data.charCodeAt(j + 3) << 24);
            }
            for (i = 0; i < 4; i++)
                s[i] = state[i];
            for (i = 0; i < 4; i++) {
                f = MD5_round[i][0];
                r = MD5_round[i][1];
                for (j = 0; j < 16; j++) {
                    MD5_apply_round(x, s, f, abcd, r[j]);
                    tmp = abcd[0];
                    abcd[0] = abcd[3];
                    abcd[3] = abcd[2];
                    abcd[2] = abcd[1];
                    abcd[1] = tmp;
                }
            }

            for (i = 0; i < 4; i++) {
                state[i] += s[i];
                state[i] = MD5_number(state[i]);
            }
        }

        return MD5_pack(state[0]) + MD5_pack(state[1]) + MD5_pack(state[2]) + MD5_pack(state[3]);
    }

    function MD5_hexhash(data) {
        var i, out, c;
        var bit128;

        bit128 = MD5_hash(data);
        out = "";
        for (i = 0; i < 16; i++) {
            c = bit128.charCodeAt(i);
            out += "0123456789abcdef".charAt((c >> 4) & 0xf);
            out += "0123456789abcdef".charAt(c & 0xf);
        }
        return out;
    }

    md5 = function (s) {
        return MD5_hexhash(s);
    }
})();


/*! json2.js | @link https://github.com/douglascrockford/JSON-js | @copyright Douglas Crockford <douglas@crockford.com> */

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
                Boolean.prototype.toJSON = function () {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/*! AmplifyJS-Store - v1.1.0 | @link http://amplifyjs.com/api/store/ | @copyright 2012 AppendTo <http://appendto.com/contact> | @license MIT and GPL V2 */
(function( amplify, undefined ) {

    var store = amplify.store = function( key, value, options ) {
        var type = store.type;
        if ( options && options.type && options.type in store.types ) {
            type = options.type;
        }
        return store.types[ type ]( key, value, options || {} );
    };

    store.types = {};
    store.type = null;
    store.addType = function( type, storage ) {
        if ( !store.type ) {
            store.type = type;
        }

        store.types[ type ] = storage;
        store[ type ] = function( key, value, options ) {
            options = options || {};
            options.type = type;
            return store( key, value, options );
        };
    };
    store.error = function() {
        return "amplify.store quota exceeded";
    };

    var rprefix = /^__amplify__/;
    function createFromStorageInterface( storageType, storage ) {
        store.addType( storageType, function( key, value, options ) {
            var storedValue, parsed, i, remove,
                ret = value,
                now = (new Date()).getTime();

            if ( !key ) {
                ret = {};
                remove = [];
                i = 0;
                try {
                    // accessing the length property works around a localStorage bug
                    // in Firefox 4.0 where the keys don't update cross-page
                    // we assign to key just to avoid Closure Compiler from removing
                    // the access as "useless code"
                    // https://bugzilla.mozilla.org/show_bug.cgi?id=662511
                    key = storage.length;

                    while ( key = storage.key( i++ ) ) {
                        if ( rprefix.test( key ) ) {
                            parsed = JSON.parse( storage.getItem( key ) );
                            if ( parsed.expires && parsed.expires <= now ) {
                                remove.push( key );
                            } else {
                                ret[ key.replace( rprefix, "" ) ] = parsed.data;
                            }
                        }
                    }
                    while ( key = remove.pop() ) {
                        storage.removeItem( key );
                    }
                } catch ( error ) {}
                return ret;
            }

            // protect against name collisions with direct storage
            key = "__amplify__" + key;

            if ( value === undefined ) {
                storedValue = storage.getItem( key );
                parsed = storedValue ? JSON.parse( storedValue ) : { expires: -1 };
                if ( parsed.expires && parsed.expires <= now ) {
                    storage.removeItem( key );
                } else {
                    return parsed.data;
                }
            } else {
                if ( value === null ) {
                    storage.removeItem( key );
                } else {
                    parsed = JSON.stringify({
                        data: value,
                        expires: options.expires ? now + options.expires : null
                    });
                    try {
                        storage.setItem( key, parsed );
                        // quota exceeded
                    } catch( error ) {
                        // expire old data and try again
                        store[ storageType ]();
                        try {
                            storage.setItem( key, parsed );
                        } catch( error ) {
                            throw store.error();
                        }
                    }
                }
            }

            return ret;
        });
    }

// localStorage + sessionStorage
// IE 8+, Firefox 3.5+, Safari 4+, Chrome 4+, Opera 10.5+, iPhone 2+, Android 2+
    for ( var webStorageType in { localStorage: 1, sessionStorage: 1 } ) {
        // try/catch for file protocol in Firefox and Private Browsing in Safari 5
        try {
            // Safari 5 in Private Browsing mode exposes localStorage
            // but doesn't allow storing data, so we attempt to store and remove an item.
            // This will unfortunately give us a false negative if we're at the limit.
            window[ webStorageType ].setItem( "__amplify__", "x" );
            window[ webStorageType ].removeItem( "__amplify__" );
            createFromStorageInterface( webStorageType, window[ webStorageType ] );
        } catch( e ) {}
    }

// globalStorage
// non-standard: Firefox 2+
// https://developer.mozilla.org/en/dom/storage#globalStorage
    if ( !store.types.localStorage && window.globalStorage ) {
        // try/catch for file protocol in Firefox
        try {
            createFromStorageInterface( "globalStorage",
                window.globalStorage[ window.location.hostname ] );
            // Firefox 2.0 and 3.0 have sessionStorage and globalStorage
            // make sure we default to globalStorage
            // but don't default to globalStorage in 3.5+ which also has localStorage
            if ( store.type === "sessionStorage" ) {
                store.type = "globalStorage";
            }
        } catch( e ) {}
    }

// userData
// non-standard: IE 5+
// http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
    (function() {
        // IE 9 has quirks in userData that are a huge pain
        // rather than finding a way to detect these quirks
        // we just don't register userData if we have localStorage
        if ( store.types.localStorage ) {
            return;
        }

        // append to html instead of body so we can do this from the head
        var div = document.createElement( "div" ),
            attrKey = "amplify";
        div.style.display = "none";
        document.getElementsByTagName( "head" )[ 0 ].appendChild( div );

        // we can't feature detect userData support
        // so just try and see if it fails
        // surprisingly, even just adding the behavior isn't enough for a failure
        // so we need to load the data as well
        try {
            div.addBehavior( "#default#userdata" );
            div.load( attrKey );
        } catch( e ) {
            div.parentNode.removeChild( div );
            return;
        }

        store.addType( "userData", function( key, value, options ) {
            div.load( attrKey );
            var attr, parsed, prevValue, i, remove,
                ret = value,
                now = (new Date()).getTime();

            if ( !key ) {
                ret = {};
                remove = [];
                i = 0;
                while ( attr = div.XMLDocument.documentElement.attributes[ i++ ] ) {
                    parsed = JSON.parse( attr.value );
                    if ( parsed.expires && parsed.expires <= now ) {
                        remove.push( attr.name );
                    } else {
                        ret[ attr.name ] = parsed.data;
                    }
                }
                while ( key = remove.pop() ) {
                    div.removeAttribute( key );
                }
                div.save( attrKey );
                return ret;
            }

            // convert invalid characters to dashes
            // http://www.w3.org/TR/REC-xml/#NT-Name
            // simplified to assume the starting character is valid
            // also removed colon as it is invalid in HTML attribute names
            key = key.replace( /[^\-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-" );
            // adjust invalid starting character to deal with our simplified sanitization
            key = key.replace( /^-/, "_-" );

            if ( value === undefined ) {
                attr = div.getAttribute( key );
                parsed = attr ? JSON.parse( attr ) : { expires: -1 };
                if ( parsed.expires && parsed.expires <= now ) {
                    div.removeAttribute( key );
                } else {
                    return parsed.data;
                }
            } else {
                if ( value === null ) {
                    div.removeAttribute( key );
                } else {
                    // we need to get the previous value in case we need to rollback
                    prevValue = div.getAttribute( key );
                    parsed = JSON.stringify({
                        data: value,
                        expires: (options.expires ? (now + options.expires) : null)
                    });
                    div.setAttribute( key, parsed );
                }
            }

            try {
                div.save( attrKey );
                // quota exceeded
            } catch ( error ) {
                // roll the value back to the previous value
                if ( prevValue === null ) {
                    div.removeAttribute( key );
                } else {
                    div.setAttribute( key, prevValue );
                }

                // expire old data and try again
                store.userData();
                try {
                    div.setAttribute( key, parsed );
                    div.save( attrKey );
                } catch ( error ) {
                    // roll the value back to the previous value
                    if ( prevValue === null ) {
                        div.removeAttribute( key );
                    } else {
                        div.setAttribute( key, prevValue );
                    }
                    throw store.error();
                }
            }
            return ret;
        });
    }() );

// in-memory storage
// fallback for all browsers to enable the API even if we can't persist data
    (function() {
        var memory = {},
            timeout = {};

        function copy( obj ) {
            return obj === undefined ? undefined : JSON.parse( JSON.stringify( obj ) );
        }

        store.addType( "memory", function( key, value, options ) {
            if ( !key ) {
                return copy( memory );
            }

            if ( value === undefined ) {
                return copy( memory[ key ] );
            }

            if ( timeout[ key ] ) {
                clearTimeout( timeout[ key ] );
                delete timeout[ key ];
            }

            if ( value === null ) {
                delete memory[ key ];
                return null;
            }

            memory[ key ] = value;
            if ( options.expires ) {
                timeout[ key ] = setTimeout(function() {
                    delete memory[ key ];
                    delete timeout[ key ];
                }, options.expires );
            }

            return value;
        });
    }() );

}( this.amplify = this.amplify || {} ) );

/*! ios-orientationchange-fix.js | Script by @scottjehl rebound by @wilto, modified by Peter Wooster | @link https://github.com/scottjehl/iOS-Orientationchange-Fix | @copyright Scott Jehl <@scottjehl> | @license MIT / GPLV2 */
(function(w){

    // This fix addresses an Mobile Safari iOS bug, so return early if the UA claims it's something else.
    var ua = navigator.userAgent.toLowerCase();
    if( !( /iphone|ipad|ipod/.test( navigator.platform.toLowerCase() )
        && /os [1-5]_[0-9_]* like mac os x/i.test(ua)
        && ua.indexOf( "applewebkit" ) > -1
        && ua.indexOf( "crios") == -1  // chrome for iOS doesn't have the bug
        )){
        return;
    }

    var doc = w.document;

    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" );
    if( !meta ){ return; }
    var initialContent = meta && meta.getAttribute( "content" );
    var disabledZoom = initialContent + ",maximum-scale=1";
    var enabledZoom = initialContent + ",maximum-scale=10";
    var enabled = true;
    var	x, y, z, aig;
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }

    function checkTilt( e ){
        var ori = w.orientation;
        // if it's landscape we're out of here
        if(90 == Math.abs(w.orientation)) {
            if(enabled)restoreZoom();
            return;
        }

        aig = e.accelerationIncludingGravity;
        x = Math.abs( aig.x );
        y = Math.abs( aig.y );

        // If in the danger zone where x is much greater than y turn off zoom
        if(y == 0 || (x/y) > 1.2){
            if(enabled)disableZoom();
        }else if( !enabled )restoreZoom();
    }

    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );

})( this );


/*! jQuery resize event - v1.1 | @link http://benalman.com/projects/jquery-resize-plugin/ | Copyright (c) 2010 "Cowboy" Ben Alman | @license MIT/GPL */
// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
//
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
//
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
//
// About: Release History
//
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

(function($,window,undefined){
    '$:nomunge'; // Used by YUI compressor.

    // A jQuery object containing all non-window elements to which the resize
    // event is bound.
    var elems = $([]),

    // Extend $.resize if it already exists, otherwise create it.
        jq_resize = $.resizecontainer = $.extend( $.resize, {} ),

        timeout_id,

    // Reused strings.
        str_setTimeout = 'setTimeout',
        str_resize = 'resizecontainer',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';

    // Property: jQuery.resize.delay
    //
    // The numeric interval (in milliseconds) at which the resize event polling
    // loop executes. Defaults to 250.

    jq_resize[ str_delay ] = 250;

    // Property: jQuery.resize.throttleWindow
    //
    // Throttle the native window object resize event to fire no more than once
    // every <jQuery.resize.delay> milliseconds. Defaults to true.
    //
    // Because the window object has its own resize event, it doesn't need to be
    // provided by this plugin, and its execution can be left entirely up to the
    // browser. However, since certain browsers fire the resize event continuously
    // while others do not, enabling this will throttle the window resize event,
    // making event behavior consistent across all elements in all browsers.
    //
    // While setting this property to false will disable window object resize
    // event throttling, please note that this property must be changed before any
    // window object resize event callbacks are bound.

    jq_resize[ str_throttle ] = true;

    // Event: resize event
    //
    // Fired when an element's width or height changes. Because browsers only
    // provide this event for the window element, for other elements a polling
    // loop is initialized, running every <jQuery.resize.delay> milliseconds
    // to see if elements' dimensions have changed. You may bind with either
    // .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
    //
    // Usage:
    //
    // > jQuery('selector').bind( 'resize', function(e) {
    // >   // element's width or height has changed!
    // >   ...
    // > });
    //
    // Additional Notes:
    //
    // * The polling loop is not created until at least one callback is actually
    //   bound to the 'resize' event, and this single polling loop is shared
    //   across all elements.
    //
    // Double firing issue in jQuery 1.3.2:
    //
    // While this plugin works in jQuery 1.3.2, if an element's event callbacks
    // are manually triggered via .trigger( 'resize' ) or .resize() those
    // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
    // events system. This is not an issue when using jQuery 1.4+.
    //
    // > // While this works in jQuery 1.4+
    // > $(elem).css({ width: new_w, height: new_h }).resize();
    // >
    // > // In jQuery 1.3.2, you need to do this:
    // > var elem = $(elem);
    // > elem.css({ width: new_w, height: new_h });
    // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
    // > elem.resize();

    $.event.special[ str_resize ] = {

        // Called only when the first 'resize' event callback is bound per element.
        setup: function() {
            // Since window has its own native 'resize' event, return false so that
            // jQuery will bind the event using DOM methods. Since only 'window'
            // objects have a .setTimeout method, this should be a sufficient test.
            // Unless, of course, we're throttling the 'resize' event for window.
            if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

            var elem = $(this);

            // Add this element to the list of internal elements to monitor.
            elems = elems.add( elem );

            // Initialize data store on the element.
            $.data( this, str_data, { w: elem.width(), h: elem.height() } );

            // If this is the first element added, start the polling loop.
            if ( elems.length === 1 ) {
                loopy();
            }
        },

        // Called only when the last 'resize' event callback is unbound per element.
        teardown: function() {
            // Since window has its own native 'resize' event, return false so that
            // jQuery will unbind the event using DOM methods. Since only 'window'
            // objects have a .setTimeout method, this should be a sufficient test.
            // Unless, of course, we're throttling the 'resize' event for window.
            if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

            var elem = $(this);

            // Remove this element from the list of internal elements to monitor.
            elems = elems.not( elem );

            // Remove any data stored on the element.
            elem.removeData( str_data );

            // If this is the last element removed, stop the polling loop.
            if ( !elems.length ) {
                clearTimeout( timeout_id );
            }
        },

        // Called every time a 'resize' event callback is bound per element (new in
        // jQuery 1.4).
        add: function( handleObj ) {
            // Since window has its own native 'resize' event, return false so that
            // jQuery doesn't modify the event object. Unless, of course, we're
            // throttling the 'resize' event for window.
            if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

            var old_handler;

            // The new_handler function is executed every time the event is triggered.
            // This is used to update the internal element data store with the width
            // and height when the event is triggered manually, to avoid double-firing
            // of the event callback. See the "Double firing issue in jQuery 1.3.2"
            // comments above for more information.

            function new_handler( e, w, h ) {
                var elem = $(this),
                    data = $.data( this, str_data );

                // If called from the polling loop, w and h will be passed in as
                // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
                // those values will need to be computed.
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();

                old_handler.apply( this, arguments );
            }

            // This may seem a little complicated, but it normalizes the special event
            // .add method between jQuery 1.4/1.4.1 and 1.4.2+
            if ( $.isFunction( handleObj ) ) {
                // 1.4, 1.4.1
                old_handler = handleObj;
                return new_handler;
            } else {
                // 1.4.2+
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }

    };

    function loopy() {

        // Start the polling loop, asynchronously.
        timeout_id = window[ str_setTimeout ](function(){

            // Iterate over all elements to which the 'resize' event is bound.
            elems.each(function(){
                var elem = $(this),
                    width = elem.width(),
                    height = elem.height(),
                    data = $.data( this, str_data );

                // If element size has changed since the last time, update the element
                // data store and trigger the 'resize' event.
                if ( width !== data.w || height !== data.h ) {
                    elem.trigger( str_resize, [ data.w = width, data.h = height ] );
                }

            });

            // Loop.
            loopy();

        }, jq_resize[ str_delay ] );

    }

})(jQuery, window);

/**
 * Count the number of substring occurrences
 * @param haystack {String} the string to search in
 * @param needle {String} the substring to search for
 * @return {Number}
 */
function substr_count(haystack, needle)
{
    var needle_esc = needle.replace(/(?=[\\^$*+?.\(\)|{\}[\]])/g, "\\");
    var pattern = new RegExp(""+needle_esc+"", "g");
    var count = haystack.match(pattern);
    return count ? count.length : 0;
}

/**
 * Checks if a variable is a String
 * @param str {*} The variable to test
 * @return {Boolean}
 */
function isString(str)
{
    return typeof str == "string";
}

/**
 * Checks if a variable is a Number
 * @param num {*} The variable to test
 * @return {Boolean}
 */
function isNumber(num)
{
    return (!isNaN(parseFloat(num)) && isFinite(num));
}

/**
 * Checks if a variable is a Boolean
 * @param bool {*} The variable to test
 * @return {Boolean}
 */
function isBool(bool)
{
    return (bool === true || bool === false);
}

/**
 * Checks if the variable is an array
 * @param arr {*} The variable to test
 * @return {Boolean}
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

/**
 * Checks if a variable is an Object
 * @param obj {*} The variable to test
 * @return {Boolean}
 */
function isObject(obj)
{
    switch(true)
    {
        case (isArray(obj)):
            return false;
            break;
    }

    var is_empty_obj_bool;
    for ( var p in obj )
    {
        if (obj.hasOwnProperty(p))
        {
            is_empty_obj_bool = false;
            break;
        }
    }
    is_empty_obj_bool = (isBool(is_empty_obj_bool)) ? is_empty_obj_bool: true;

    switch(true)
    {
        case (typeof obj === "object" && is_empty_obj_bool === false):
            return true;
            break;
    }

    return false;
}

/**
 * Checks if a variable is a Function
 * @param obj {*} The variable to test
 * @return {Boolean}
 */
function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

/**
 * Converts a string array to an integer array
 * It converts all the string values of an array into their integer equivalents
 * @param str_arr {Array} The array to convert
 * @return {Array}
 */
function arrayToInteger(str_arr)
{
    var int_arr_item_int,
        array_count_int,
        keys_arr = [],
        values_arr = [],
        values_int_arr = [],
        final_int_arr = [];

    keys_arr = array_keys(str_arr);
    values_arr = array_values(str_arr);

    array_count_int = count(str_arr);
    for(var i = 0; i < array_count_int; i++)
    {
        int_arr_item_int = parseInt(values_arr[i]);
        values_int_arr.push(int_arr_item_int);
    }

    final_int_arr = array_combine(keys_arr, values_int_arr);
    return final_int_arr;
}

/**
 * Checks to see if array has duplicate values
 * @param arr {Array} the array to check
 * @return {Boolean}
 */
function arrayHasDuplicates(arr) {
    var valuesSoFar = {},
        array_count_int = count(arr);

    for (var i = 0; i < array_count_int; ++i) {
        var value = arr[i];
        if (Object.prototype.hasOwnProperty.call(valuesSoFar, value)) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

/**
 * Gets a value from an array derived after a tokenized string is exploded
 * @param str {String} the tokenized string that will be exploded to an array
 * @param delim {String} the delimiter
 * @param key {Integer} the position of the array to return
 * @return {String}
 */
function getValueAfterExplode(str, delim, key)
{
    var arr = explode(delim, str);
    return arr[key];
}

/**
 * Sorts an array in numerical order and returns an array containing the keys of the array in the new sorted order
 * @param values_arr {Array} The array to sort
 * @return {Array}
 */
function getSortedKeys(values_arr)
{
    var array_with_keys = [];
    for (var i = 0; i < values_arr.length; i++) {
        array_with_keys.push({ key: i, value: values_arr[i] });
    }

    array_with_keys.sort(function(a, b) {
        if (a.value < b.value) { return -1; }
        if (a.value > b.value) { return  1; }
        return 0;
    });

    var keys = [];
    for (var i = 0; i < array_with_keys.length; i++) {
        keys.push(array_with_keys[i].key);
    }

    return keys;
}

/**
 * Finds the nearest matching number in an array containing integers
 * It is recommended that you sort the array in order before using it with this function
 * @param haystack_arr {Array} The array containing the integer values
 * @param needle_int {Number} The reference integer which is used to find the match
 * @param return_key_only_bool {Boolean} If true, will return the key position of the nearest match. Default is false.
 * @param is_ceil_bool {Boolean} If true, will return the nearest highest number even if a lower number is technically 'closer'. Default value is true.
 * @param disable_ceil_offset_int {Number} Please see explanation below.
 * For example, let's say needle_int is 120 and the nearest matching numbers are 115 on the lower end and 140 on the higher end
 * Being the is_ceil_bool is true by default, 140 would ordinarily be the nearest number selected. However, if disable_ceil_offset is set to 5, this will set is_ceil_bool to false, and 115 will be returned as the nearest number selected because the difference between it (the true nearest matching number) and 120 (needle_int) is 5 or less, even though needle_int is higher and under normal circumstances 120 would have been returned instead
 * @return {Number}
 */
function getClosestNumberMatchArray(haystack_arr, needle_int)
{
    var myArgs = Array.prototype.slice.call(arguments),
        return_key_only_bool = (isBool(myArgs[2])) ? myArgs[2]: false,
        is_ceil_bool = (isBool(myArgs[3])) ? myArgs[3]: true,
        disable_ceil_offset_int = (isNumber(myArgs[4])) ? myArgs[4] : 0,
        value_diff_int,
        value_diff_keys_sort_arr = [],
        value_diff_values_arr = [],
        key_final_int,
        value_final_int,
        value_final_needle_diff_int
        ;

    haystack_arr = arrayToInteger(haystack_arr);
    needle_int = parseInt(needle_int);

    for(var i = 0; i < count(haystack_arr); i++)
    {
        value_diff_int = needle_int - haystack_arr[i];
        value_diff_int = Math.abs(value_diff_int);
        value_diff_values_arr.push(value_diff_int);
    }

    value_diff_keys_sort_arr = getSortedKeys(value_diff_values_arr);
    key_final_int = value_diff_keys_sort_arr[0];
    value_final_int = haystack_arr[key_final_int];

    value_final_needle_diff_int = value_final_int - needle_int;
    value_final_needle_diff_int = Math.abs(value_final_needle_diff_int);

    //Manage for when needle_int is higher than nearest matching number, and highest matching number is required
    switch(true)
    {
        case (value_final_int < needle_int):
            is_ceil_bool = (value_final_needle_diff_int <= disable_ceil_offset_int) ? false : is_ceil_bool;
            key_final_int = (is_ceil_bool) ? key_final_int + 1 : key_final_int;
            break;
    }

    //return value or key
    value_final_int = haystack_arr[key_final_int];
    return (return_key_only_bool) ? key_final_int: value_final_int;
}

/**
 * This function checks if a number is an integer decimal and if the integral part of the decimal is even
 * For example, 640.123 will be true, 641.123 will be false
 * @param number_int {Number} The Integer Decimal
 * @param allow_negative_bool {Boolean} This will allow negative numbers to be considered
 * @return {Boolean}
 */
function isEvenDecimal(number_int)
{
    var myArgs = Array.prototype.slice.call(arguments),
        allow_negative_bool = (isBool(myArgs[1])) ? myArgs[1]: false,
        number_temp_int,
        number_temp_mod_int;

    number_temp_int = (number_int < 0 && allow_negative_bool) ? number_int * -1 : number_int;
    number_temp_mod_int = number_temp_int % 1;

    //return false if Number is less than one or is not a decimal integer
    switch(true)
    {
        case (!isNumber(number_temp_int) || number_temp_int < 1 || number_temp_mod_int == 0):
            return false;
            break;
    }

    //Check if integral part is even number
    number_temp_int = Math.floor(number_temp_int);
    number_temp_mod_int = number_temp_int % 2;

    return !!((number_temp_mod_int == 0));
}

/**
 * Retrieves the current and full URL of the document
 * @param option_flag_str {String} If present, specifies a specific part of the URL to return
 * The two options flags available are:
 * 1. bp [basepath] - Will return 'http://restive.io/index.html' if current URL is 'http://restive.io/index.html?id=1234'
 * 2. bd [basedir] - Will return 'http://restive.io/test' if current URL is 'http://restive.io/test/index.html?id=4'
 * 3. q [query] - Will return 'id=1234' if current URL is 'http://restive.io/index.html?id=1234'
 * @param url_str {String} By default, this function uses document.URL to capture the URL. You may provide your own url using this parameter
 * @return {String}
 */
function getUrl()
{
    var myArgs = Array.prototype.slice.call(arguments),
        option_flag_str = (isString(myArgs[0]) && myArgs[0] != '') ? myArgs[0]: '',
        url_str = (isString(myArgs[1]) && myArgs[1] != '') ? myArgs[1] : document.URL,
        url_temp_str,
        url_temp_arr = [],
        is_url_has_q_bool = /\?+/.test(url_str),
        url_match_arr = url_str.match(/^([h|f]{1}[t]{0,1}tp[s]{0,1}\:\/\/)([^ ]+?)\?([^ ]*)/i);

    switch(true)
    {
        case (option_flag_str == 'basepath' || option_flag_str == 'bp'):
            return (is_url_has_q_bool) ? url_match_arr[1]+url_match_arr[2] : url_str;
            break;

        case (option_flag_str == 'basedir' || option_flag_str == 'bd'):
            url_temp_str = (is_url_has_q_bool) ? url_match_arr[1]+url_match_arr[2] : url_str;
            url_temp_arr = explode('/', url_temp_str);
            url_temp_arr.pop();

            return implode('/', url_temp_arr);
            break;

        case (option_flag_str == 'query' || option_flag_str == 'q'):
            return (is_url_has_q_bool) ? url_match_arr[3]: "";
            break;

        default:
            return url_str;
    }
}

(function($){

    /**
     * Determines if a given element is a child or descendant of another
     * @param {String} $elem_sel_parent_str The selector of the parent object
     * @param {String} $elem_sel_child_str The selector of the suspected child object
     * @return {Boolean}
     */
    window.elementIsChildOf = function($elem_sel_parent_str, $elem_sel_child_str){
        var result_bool = false,
            elem_parent = $(''+$elem_sel_parent_str+''),
            elem_child = $(''+$elem_sel_child_str+'');

        switch(true)
        {
            case ($(elem_child).parents().index(elem_parent) != -1):
                result_bool = true;
                break;
        }

        return result_bool;
    };

    /**
     * Retrieves the text value of a JQuery Selector
     * @param {Object} el the JQuery Object/Element
     * @return {String}
     */
    window.getSelector = function(el){
        var $el = $(el);

        var id = $el.attr("id");
        if (id) { //"should" only be one of these if theres an ID
            return "#"+ id;
        }

        var node = $el[0].nodeName.toLowerCase();
        if(node == 'html' || node == 'body'){
            return node;
        }

        var selector = $el.parents()
            .map(function() { return this.tagName; })
            .get().reverse().join(" ");

        if (selector) {
            selector += " "+ $el[0].nodeName;
        }

        var classNames = $el.attr("class");
        if (classNames) {
            selector += "." + $.trim(classNames).replace(/\s/gi, ".");
        }

        var name = $el.attr('name');
        if (name) {
            selector += "[name='" + name + "']";
        }
        if (!name){
            var index = $el.index();
            if (index) {
                index = index + 1;
                selector += ":nth-child(" + index + ")";
            }
        }
        return selector;
    };

})(jQuery);


/*! Restive.JS | @copyright 2013 Obinwanne Hill */
var Restive = (function(window, document, $) {

    //Check for Dependency
    switch(true)
    {
        case (typeof $ != 'function'):
            //exit gracefully if missing
            throw 'Restive.JS requires JQuery to run!';
            break;
    }

    //Define local vars
    var root = this,
        Restive,
        win = window,
        docElem = document.documentElement,
        $win = $(win),
        screen = win.screen,
        vSpan, vPitch, cSpan, cPitch, dSpan, dPitch, eSpan, ePitch,
        media  = win.matchMedia || win.msMatchMedia || Object
        ;

    //Create window storage
    window.rstv_store = {'main': {}};
    window.parent.rstv_store = {'main': {}};

    //Create window storage function
    window.rstv_store.storage = function(){
        var myArgs = Array.prototype.slice.call(arguments),
            key_str = myArgs[0],
            value_res = myArgs[1],
            is_value_valid_bool = !!((typeof value_res !== "undefined" && value_res !== null) && ((isString(value_res) && value_res != "") || isNumber(value_res) || (isArray(value_res) && count(value_res) > 0) || isBool(value_res) || isObject(value_res))),
            is_value_null_bool = !!((value_res === null))
            ;

        switch(true)
        {
            case (is_value_valid_bool):
                window.rstv_store.main[""+key_str+""] = value_res;
                return;
                break;

            case (is_value_null_bool):
                window.rstv_store.main[""+key_str+""] = null;
                return;
                break;

            default:
                return window.rstv_store.main[""+key_str+""];
        }
    };

    /**
     * Initialize and store some important default values.
     * Return false if initialization has already been performed in same session.
     * @return {Boolean}
     */
    var init = function () {
        //detect private browsing
        window.rstv_store.main["rstv_is_priv_browsing"] = !!((_detectPrivateBrowsing()));

        var is_init_bool = store("rstv_is_init"),
            retr;

        switch (true) {
            case (is_init_bool):
                store("rstv_timestamp_curr", microtime(true));

                store("rstv_url", getUrl('bp'));

                //load counter
                _loadCounter();

                /** FIX FOR LOCAL BROWSER-BASED EMULATORS **/
                _fixForLocalDev();

                //update the dimension and orientation info storage-wide
                _initDimensionVars();
                _updateDimensionStore();
                _updateOrientationStore();

                retr = false;
                break;

            default:
                //flag that defaults are set
                store("rstv_timestamp_curr", microtime(true));
                store("rstv_timestamp_init", store("rstv_timestamp_curr"));
                store("rstv_loaded_count", 0, '', {expires: 1500});

                store("rstv_is_init", true);

                store("rstv_url", getUrl('bp'));
                store("rstv_url_hash", md5(getUrl('bp')));

                _initDimensionVars();
                _updateDimensionStore();
                store("rstv_ort_init", getOrientation());
                store("rstv_ort_curr", getOrientation());

                //load counter
                _loadCounter();

                retr = true;
        }

        return retr;
    };

    /**
     * Reinitializes the Restive Class on Demand
     * It resets Dimension, Orientation, and Timestamp Info
     * The Restive Class is initialized as soon as Restive.JS is called via <script\> tag. In certain circumstances
     * this might bring out a slight change in Dimension and Orientation Data especially for PCs.
     * Re-initialization will usually correct any discrepancies
     * NOTE: It is advised that you use this function only once, within document.ready, and before any other Restive-related methods
     */
    function reInit()
    {
        //reset timestamps
        store("rstv_timestamp_curr", microtime(true));
        store("rstv_timestamp_init", store("rstv_timestamp_curr"));

        //update the dimension and orientation info storage-wide
        _initDimensionVars();
        _updateDimensionStore();
        store("rstv_ort_init", getOrientation());
        store("rstv_ort_curr", getOrientation());
    }

    /**
     * Initializes important dimension variables to Local storage
     * @private
     */
    function _initDimensionVars()
    {
        store("rstv_var_doc_client_w", docElem.clientWidth);
        store("rstv_var_doc_client_h", docElem.clientHeight);
        store("rstv_var_win_outer_w", window.outerWidth);
        store("rstv_var_win_outer_h", window.outerHeight);
        store("rstv_var_win_screen_w", screen.width);
        store("rstv_var_win_screen_h", screen.height);
    }

    /**
     * Keeps track of how many times Restive.JS is loaded in rapid succession in a single browser session
     * @private
     */
    function _loadCounter()
    {
        var load_count_int = parseInt(store("rstv_loaded_count"));
        switch(true)
        {
            case (!isNumber(load_count_int)):
                load_count_int = 0;
                break;
        }
        load_count_int++;
        store("rstv_loaded_count", load_count_int, '', {expires: 1500});
    }

    /**
     * This is a special function to deal with certain issues experienced when using Restive.JS in Chrome Ripple
     * and other Browser Based Mobile Device emulators that load scripts more than once in rapid succession
     * when they are being initialized
     * @private
     */
    function _fixForLocalDev()
    {
        var load_count_int = parseInt(store("rstv_loaded_count")),
            ffld_is_init_bool = store("rstv_ffld_is_init");

        switch(true)
        {
            case (load_count_int > 1):
                store("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH", null);
                store("rstv_is_ios rstv_is_android rstv_is_blackberry rstv_is_symbian rstv_is_windows rstv_is_windows_phone", null);
                store("rstv_is_android_1_ rstv_is_android_2_ rstv_is_android_3_", null);
                store("rstv_is_phone rstv_is_tablet rstv_is_tv rstv_is_pc", null);
                store("rstv_ort_curr rstv_timestamp_curr rstv_is_portrait rstv_is_landscape", null);
                store("rstv_multi_count rstv_multi_bpm_idx rstv_cache_bpm rstv_cache_bpm_lock rstv_cache_req rstv_cache_bpm_viewport_diff", null);
                store("rstv_user_agent", null);

                store("rstv_timestamp_curr", microtime(true));
                store("rstv_ort_curr", getOrientation());

                switch(true)
                {
                    case (!ffld_is_init_bool):

                        store("rstv_timestamp_init", store("rstv_timestamp_curr"));
                        store("rstv_ort_init", getOrientation());

                        //Mark that this function has been executed
                        store("rstv_ffld_is_init", true);
                        break;
                }

                break;
        }
    }

    /**
     * Detects whether private browsing is active or not
     * @return {Boolean}
     */
    function _detectPrivateBrowsing()
    {
        try {
            localStorage.setItem("__test", "data");
        }
        catch (e)
        {
            if (/QUOTA_?EXCEEDED/i.test(e.name)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Stores a value in LocalStorage [or other storage type], or retrieves previously stored value
     * Leverages AmplifyJS Store
     * @param key_str The identifier for the value being stored
     * @param value_res The value to store [optional]
     * @param type_str The type of storage format to be used
     * @param options_res A set of key/value pairs that relate to settings for storing the value
     * @return {*}
     */
    function store()
    {
        var myArgs = Array.prototype.slice.call(arguments);
        var is_priv_browsing_bool = window.rstv_store.main["rstv_is_priv_browsing"],
            key_str = myArgs[0],
            value_res = myArgs[1],
            type_str = ((typeof myArgs[2] !== "undefined" && myArgs[2] !== null) && (isString(myArgs[2]) && myArgs[2] != "")) ? myArgs[2] : 'ss',
            options_res = myArgs[3],
            store_func_name,
            store_func,
            list_del_key_arr = [],
            is_getall_bool = (isString(key_str) && key_str != "") ? false: true,
            is_value_valid_bool = !!((typeof value_res !== "undefined" && value_res !== null) && ((isString(value_res) && value_res != "") || isNumber(value_res) || (isArray(value_res) && count(value_res) > 0) || isBool(value_res) || isObject(value_res))),
            is_value_null_bool = !!((value_res === null));

        try
        {
            switch(true)
            {
                case (is_priv_browsing_bool):
                    //Private Browsing Detected, Use Windows Store
                    store_func_name = 'storage';
                    store_func = window.rstv_store[store_func_name];
                    break;

                default:
                    //Use AmplifyJS Store
                    switch(true)
                    {
                        case (type_str == 'ls'):
                            store_func_name = 'localStorage';
                            break;

                        default:
                            store_func_name = 'sessionStorage';
                    }
                    store_func = amplify.store[store_func_name];

                    //if sessionStorage is not supported, default to amplifyJS
                    switch(true)
                    {
                        case (!window.sessionStorage || !window.localStorage):
                            store_func = amplify.store;
                            break;
                    }

                    //return all values if no key is provided
                    switch(true)
                    {
                        case (is_getall_bool):
                            return store_func();
                            break;
                    }
            }

            //return stored value if empty value argument and value is not null
            switch(true)
            {
                case (!is_value_valid_bool && !is_value_null_bool):
                    return store_func(key_str);
                    break;
            }

            //delete object if value is null
            switch(true)
            {
                case (is_value_null_bool):
                    //delete stored object(s)
                    list_del_key_arr = explode(" ", key_str);
                    for (var i = 0; i < count(list_del_key_arr); i++)
                    {
                        store_func(list_del_key_arr[i], null);
                    }
                    return null;
                    break;
            }

            //store value
            store_func(key_str, null);
            store_func(key_str, value_res, options_res);
        }
        catch(e){
            alert(e);
            
        }
    }

    /**
     * This function is used to track specific String values in a storage system
     * The two possible storage options are (1) Cookies, and (2) Local Storage
     * It will store individual values as a tokenized string.
     * For example, if you call this function on two strings 'trial' and 'error', the stored value will be 'trial|error'
     *
     * @param key_str {String} The identifier of the value being stored
     * @param value_str {String} The individual value to store and track
     * @param store_type_str {String} The storage type of the container that will hold the stored value. 'ck' represents 'Cookie', and 'ls' represents 'LocalStorage'
     * @param unique_bool {Boolean} The setting that determines if the individual values should be unique. If this is true, no two string values will be identical
     * @param expires_ck_int|expires_ls_int {Number} Expiry setting
     * @param reverse_order_bool {Boolean} This affects the order with which data is stored. If true, data will be stored in a LIFO (Last In - First Out) format. If false, data will be store in a FIFO (First In - First Out) format
     * @param delim_str {String} The character that will be used to delimit the stored string
     * @param data_count_int {Number} The number of individual
     * @return {Boolean}
     */
    function storeVarTracker(key_str, value_str)
    {
        /**
         * This function saves the current Restive.JS settings tracking code to history
         */
        var myArgs = Array.prototype.slice.call(arguments),
            store_type_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2] : 'ck',
            unique_bool = (isBool(myArgs[3])) ? myArgs[3]: false,
            expires_ls_int = (isNumber(myArgs[4]) || isString(myArgs[4])) ? parseInt(myArgs[4]): '',
            expires_ck_int = (isNumber(myArgs[4]) || isString(myArgs[4])) ? parseInt(myArgs[4]): 30,
            reverse_order_bool = (isBool(myArgs[5])) ? myArgs[5]: true,
            delim_str = (isString(myArgs[6]) && myArgs[6] != "") ? myArgs[6]: '-!',
            data_count_int = (isNumber(myArgs[7]) || isString(myArgs[7])) ? parseInt(myArgs[7]): 60,
            history_tok_str,
            history_upd_tok_str,
            history_arr = [],
            history_upd_arr = []
            ;

        //check if this tracking code exists
        history_tok_str = (store_type_str == 'ls') ? store(key_str) : $.cookie(key_str);
        switch(true)
        {
            case (history_tok_str === null || typeof history_tok_str === "undefined"):
                (store_type_str == 'ls') ? store(key_str, value_str,
                    '', {expires: expires_ls_int}) : $.cookie(key_str, value_str, { expires: expires_ck_int, path: '/' });

                return true;
                break;

            case (typeof history_tok_str !== "undefined" && history_tok_str !== null && history_tok_str != ""):
                //get cookie info and check if tracking cookie exists
                history_arr = explode(delim_str, history_tok_str);
                switch(true)
                {
                    case (in_array(value_str, history_arr) && unique_bool):
                        return false;
                        break;

                    default:
                        //generate the current tracking code
                        switch(true)
                        {
                            case (reverse_order_bool):
                                history_arr.unshift(value_str);
                                history_upd_arr = history_arr.slice(0, data_count_int);

                                history_upd_tok_str = implode(delim_str, history_upd_arr);
                                break;

                            default:
                                history_arr.push(value_str);
                                history_upd_tok_str = implode(delim_str, history_arr);
                        }

                        //store the tracking code
                        (store_type_str == 'ls') ? store(key_str, history_upd_tok_str, '', {expires: expires_ls_int}) : $.cookie(key_str, history_upd_tok_str, { expires: expires_ck_int, path: '/' });

                        return true;
                }
                break;
        }
    }

    /**
     * This function is used to validate a string value against the tokenized string stored via storeVarTracker()
     * It checks to see if the string value is one of the tokenized item. If yes, it returns true; if no, it returns false
     * For example if needle = 'trial', and the var_key_str identifies a stored string with value = 'trial|error', then validation will be successful
     * @param value_needle_str {String} The string value that will be validated against the stored value
     * @param key_str {String} The identifier of the value that was stored via storeVarTracker()
     * @param store_type_str {String} The storage type of the container holding the stored value. 'ck' represents 'Cookie', and 'ls' represents 'LocalStorage'
     * @param delim_str {String} The character that will be used to delimit the stored string
     * @return {Boolean}
     */
    function storeVarValidator(value_needle_str, key_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            store_type_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2] : 'ck',
            delim_str = (isString(myArgs[3]) && myArgs[3] != "") ? myArgs[3] : '-!',
            value_str = (store_type_str == 'ls') ? store(key_str) : $.cookie(key_str);

        switch(true)
        {
            case (typeof value_str !== "undefined" && value_str !== null && value_str != ""):
                var value_arr = [];
                value_arr = explode(delim_str, value_str);

                switch(true)
                {
                    case (in_array(value_needle_str, value_arr)):
                        //tracking code is in history
                        return true;
                        break;

                    default:
                        return false;
                }
                break;

            default:
                return false;
        }
    }

    /**
     * Checks if a value stored in LocalStorage exists and contains a value
     * Also stores a value if provided if the value did not previously exist or was invalid
     * @param key_str {String} The identifier for the value that was stored
     * @param value_store_res {*} The value to store [optional]
     * @return {Boolean}
     */
    function isStorageValueSet(key_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            value_store_res = myArgs[1],
            value_retr_res = store(''+key_str+''),
            is_value_valid_bool = !!((typeof value_store_res !== "undefined" && value_store_res !== null)),
            is_store_value_set_bool = false
            ;

        //Determine if store value exists and is valid
        switch(true)
        {
            case (isBool(value_retr_res) || (value_retr_res !== null && typeof value_retr_res !== "undefined" && value_retr_res != "")):
                is_store_value_set_bool = true;
                break;
        }

        //Return result of check immediately if no value is provided
        switch(true)
        {
            case (!is_value_valid_bool):
                return is_store_value_set_bool;
                break;
        }

        //Store value if it does not exist and/or is invalid.
        switch(true)
        {
            case (!is_store_value_set_bool):
                store(key_str, value_store_res);
                break;
        }
    }

    /**
     * Increment (or Decrement) a stored variable
     * @param key_str {String} The identifier of the value that was stored
     * @param increment_value_int {Number} The size of the increment operation. Default is 1
     * @param is_decrement_bool {Boolean} If set to true, will decrement instead of increment
     * @return {Number|Boolean}
     */
    function incrementStorageValue(key_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            increment_value_int = (isNumber(myArgs[1])) ? myArgs[1]: 1,
            is_decrement_bool = (isBool(myArgs[2])) ? myArgs[2]: false,
            value_int;

        value_int = parseInt(store(key_str));
        switch(true)
        {
            case (!isNumber(value_int)):
                return false;
                break;
        }

        value_int = (is_decrement_bool) ? value_int - increment_value_int: value_int + increment_value_int;
        store(key_str, value_int);

        return value_int;
    }

    /**
     * Returns a list of standard resolution dimensions
     * @param class_str {String} the class of dimensions to return. It could be 'w' = widths, or 'h' = heights
     * @return {Array}
     * @private
     */
    function _getResolutionDimensionList(class_str)
    {
        var std_w_arr = [120, 128, 160, 200, 240, 272, 300, 320, 352, 360, 480, 540, 576, 600, 640, 720, 768, 800, 864, 900, 1024, 1050, 1080, 1152, 1200, 1440, 1536, 1600, 1800, 2048, 2160, 2400, 3072, 3200, 4096, 4320, 4800],
            std_h_arr = [160, 240, 260, 320, 400, 432, 480, 640, 720, 800, 854, 960, 1024, 1136, 1152, 1280, 1360, 1366, 1400, 1440, 1600, 1680, 1920, 2048, 2560, 2880, 3200, 3840, 4096, 5120, 6400, 7680]
            ;

        switch(true)
        {
            case (class_str == 'w'):
                return std_w_arr;
                break;

            case (class_str == 'h'):
                return std_h_arr;
                break;
        }
    }

    /**
     * Get the Viewport or Screen Dimensions of the Device
     * @param type_str {String} The type of operation to execute
     * vW = viewport width, vH = viewport height, sW = screen width, sH = screen height
     * @param adj_screen_size_bool {Boolean} This determines if the screen size result should be adjusted to return the nearest standard resolution. For example if actual screen height is 1184, 1280 will be returned as it is the nearest standard resolution height. Default is true
     * @return {*}
     * @private
     */
    function _getDimension(type_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            adj_screen_size_bool = (isBool(myArgs[1])) ? myArgs[1]: true,
            dim_res,
            dim_res_adj,
            adj_dim_res_bool = false,
            is_pc_or_tv_bool = !!((isPC() || isTV())),
            pixel_ratio_device_int = getPixelRatio(),
            pixel_ratio_virtual_int,
            win_outer_w_int = store("rstv_var_win_outer_w"),
            win_outer_h_int = store("rstv_var_win_outer_h"),
            doc_client_w_int = store("rstv_var_doc_client_w"),
            doc_client_h_int = store("rstv_var_doc_client_h"),
            win_screen_w_int = store("rstv_var_win_screen_w"),
            win_screen_h_int = store("rstv_var_win_screen_h")
            ;

        /**
         * Return dimensions quickly if device is PC
         */
        switch(true)
        {
            case (is_pc_or_tv_bool):
                switch(true)
                {
                    case (type_str == 'vW'):
                        dim_res = doc_client_w_int;
                        break;

                    case (type_str == 'vH'):
                        dim_res = doc_client_h_int;
                        break;

                    case (type_str == 'sW'):
                        dim_res = win_screen_w_int;
                        break;

                    case (type_str == 'sH'):
                        dim_res = win_screen_h_int;
                        break;
                }

                switch(true)
                {
                    case (type_str == 'vW' || type_str == 'vH'):
                        dim_res = (pixel_ratio_device_int >= 1.5) ? dim_res * pixel_ratio_device_int : dim_res;
                        break;
                }

                dim_res = Math.floor(dim_res);
                return dim_res;

                break;
        }

        /**
         * If not PC, continue processing
         */

        var device_user_agent_str = getUserAgent(),
            is_opera_browser_bool = /opera.+(mini|mobi)/i.test(device_user_agent_str),
            is_ios_bool = !!((isIOS())),
            is_symbian_bool = !!((isSymbian())),
            is_windows_bool = !!((isWindows())),
            is_android_bool = !!((isAndroid())),
            is_android_1_bool = !!((isAndroid('1.'))),
            is_android_2_bool = !!((isAndroid('2.'))),
            is_special_needs_bool = !!(((is_android_1_bool || is_android_2_bool) || is_symbian_bool || is_windows_bool)),
            viewport_w_int,
            viewport_h_int,
            screen_w_int = win_screen_w_int,
            screen_h_int = win_screen_h_int,
            screen_w_fix_int = screen_w_int,
            ort_w_int,
            ort_h_int,
            viewport_w_to_screen_w_ratio_int,
            screen_w_to_viewport_w_diff_int,
            screen_w_to_h_ratio_int,
            fixed_screen_dim_bool,
            std_w_arr = _getResolutionDimensionList('w'),
            std_h_arr = _getResolutionDimensionList('h'),
            std_w_temp_arr = std_w_arr,
            std_h_temp_arr = std_h_arr,
            is_landscape_v_bool,                    //viewport
            is_landscape_s_bool,                    //screen
            is_landscape_v_extended_verify_bool
            ;

        /**
         * Get the viewport dimensions
         */
        switch(true)
        {
            case (is_special_needs_bool):
                viewport_w_int = (win_outer_w_int <= 0) ? doc_client_w_int : win_outer_w_int;
                viewport_h_int = (win_outer_h_int <= 0) ? doc_client_h_int : win_outer_h_int;
                ort_w_int = viewport_w_int;
                ort_h_int = viewport_h_int;
                break;

            default:
                viewport_w_int = doc_client_w_int;
                viewport_h_int = doc_client_h_int;
                ort_w_int = doc_client_w_int;
                ort_h_int = doc_client_h_int;
        }

        /**
         * Modify Screen Dimensions if Android 2 or Symbian Platform
         */
        switch(true)
        {
            case ((is_android_2_bool || is_symbian_bool) && !is_opera_browser_bool):
                screen_w_int = (win_outer_w_int <= 0) ? screen_w_int : win_outer_w_int;
                screen_h_int = (win_outer_h_int <= 0) ? screen_h_int : win_outer_h_int;
                break;
        }

        //Determine orientation
        screen_w_to_h_ratio_int = screen_w_int/screen_h_int;
        screen_w_to_viewport_w_diff_int = screen_w_int - viewport_w_int;
        screen_w_to_viewport_w_diff_int = Math.abs(screen_w_to_viewport_w_diff_int);

        is_landscape_v_extended_verify_bool = (is_opera_browser_bool && viewport_w_int < 260) ? ((screen_w_to_viewport_w_diff_int <= 4) && (screen_w_to_h_ratio_int >= 1) ? true : false) : true;
        is_landscape_v_bool = !!((ort_h_int <= ort_w_int) && is_landscape_v_extended_verify_bool);
        is_landscape_s_bool = !!((screen_h_int <= screen_w_int));

        /**
         * Reduce resolution dimension list size if iOS
         * This improves the accuracy for first-generation iOS devices
         */
        switch(true)
        {
            case (is_ios_bool):
                std_w_temp_arr = std_w_temp_arr.slice(7);
                std_h_temp_arr = std_h_temp_arr.slice(6);
                break;

            case (is_android_bool):
                std_w_temp_arr = std_w_temp_arr.slice(4);
                std_h_temp_arr = std_h_temp_arr.slice(3);
                break;

            case (is_symbian_bool):
                std_w_temp_arr = std_w_temp_arr.slice(4);
                break;
        }

        /**
         * Reverse resolution dimension list when orientation changes
         */
        switch(true)
        {
            case (is_landscape_v_bool):
                std_w_arr = std_h_temp_arr;
                std_h_arr = std_w_temp_arr;
                break;

            default:
                std_w_arr = std_w_temp_arr;
                std_h_arr = std_h_temp_arr;
        }

        /**
         * Get Dimensions
         */
        switch(true)
        {
            case (type_str == 'vW'):
                dim_res = viewport_w_int;
                break;

            case (type_str == 'vH'):
                dim_res = viewport_h_int;
                break;

            case (type_str == 'sW'):
                /**
                 * This aims to correct any screen dimension discrepancies that usually occur when the
                 * raw viewport dimensions say the orientation is in one mode, but the raw screen dimensions
                 * say it is in another mode. Certain devices e.g. iPad will not change screen dimensions as the
                 * orientation changes. When this happens, we reverse values for screen_w and screen_h to compensate
                 */
                fixed_screen_dim_bool = !!((is_landscape_v_bool === true && is_landscape_s_bool === false) || (is_landscape_v_bool === false && is_landscape_s_bool === true));

                dim_res = (fixed_screen_dim_bool) ? screen_h_int : screen_w_int ;

                //get the fixed screen width
                screen_w_fix_int = (fixed_screen_dim_bool) ? screen_h_int : screen_w_int ;

                dim_res_adj = dim_res * pixel_ratio_device_int;
                adj_dim_res_bool = adj_screen_size_bool ? ((in_array(dim_res, std_w_arr) || in_array(dim_res_adj, std_w_arr)) ? false: true) : false;
                break;

            case (type_str == 'sH'):
                /**
                 * This aims to correct any screen dimension discrepancies that usually occur when the
                 * raw viewport dimensions say the orientation is in one mode, but the raw screen dimensions
                 * say it is in another mode. Certain devices e.g. iPad will not change screen dimensions as the
                 * orientation changes. When this happens, we reverse values for screen_w and screen_h to compensate
                 */
                fixed_screen_dim_bool = !!((is_landscape_v_bool === true && is_landscape_s_bool === false) || (is_landscape_v_bool === false && is_landscape_s_bool === true));

                dim_res = (fixed_screen_dim_bool) ? screen_w_int : screen_h_int ;

                //get the fixed screen width
                screen_w_fix_int = (fixed_screen_dim_bool) ? screen_h_int : screen_w_int ;

                dim_res_adj = dim_res * pixel_ratio_device_int;
                adj_dim_res_bool = adj_screen_size_bool ? ((in_array(dim_res, std_h_arr) || in_array(dim_res_adj, std_h_arr)) ? false: true) : false;
                break;
        }

        /**
         * Get the virtual pixel ratio i.e. screen vs viewport dimensions
         */
        pixel_ratio_virtual_int = screen_w_fix_int/viewport_w_int;

        /**
         * Return if Device Pixel Ratio is 1 or less and Virtual Pixel Ratio is less than 1.1
         */
        switch(true)
        {
            case (pixel_ratio_device_int <= 1 && pixel_ratio_virtual_int <= 1.1):
                switch(true)
                {
                    case (type_str == 'sW' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_w_arr, dim_res, '', '', 8);
                        break;

                    case (type_str == 'sH' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_h_arr, dim_res, '', '', 8);
                        break;
                }
                return dim_res;
                break;
        }

        /**
         * Continue if Pixel Ratio is greater than 1
         */
        switch(true)
        {
            case (is_ios_bool):
                dim_res = dim_res * pixel_ratio_device_int;
                break;

            default:
                switch(true)
                {
                    case (!is_android_2_bool):
                        /**
                         * Case 1: Device Pixel Ratio is 1 or less, and Virtual Pixel Ratio is greater than 1.1
                         * Update Viewport Dimensions only. Do not update Screen Dimensions
                         * Case 2. Device Pixel Ratio is more than 1, and Virtual Pixel Ratio is less than or equal to 1.1
                         * Update both Viewport and Screen Dimensions
                         * Case 3. Device Pixel Ratio is more than 1, and Virtual Pixel Ratio is greater than 1.1
                         * Update Viewport Dimensions only. Do not update Screen Dimensions
                         */
                        switch(true)
                        {
                            //1
                            case (pixel_ratio_device_int <= 1 && pixel_ratio_virtual_int > 1.1):
                                dim_res = (in_array(type_str, ['vW', 'vH'])) ? dim_res * pixel_ratio_virtual_int : dim_res;
                                break;
                            //2
                            case (pixel_ratio_device_int > 1 && pixel_ratio_virtual_int <= 1.1):
                                switch(true)
                                {
                                    case (pixel_ratio_device_int <= 1.1):
                                        //Special Operation for some devices that report device pixel ratio slightly above one
                                        switch(true)
                                        {
                                            case (in_array(type_str, ['vW', 'vH'])):
                                                dim_res = dim_res * pixel_ratio_device_int;
                                                dim_res = (isEvenDecimal(dim_res)) ? Math.floor(dim_res) : dim_res;
                                                break;
                                        }
                                        break;

                                    default:
                                        dim_res = dim_res * pixel_ratio_device_int;
                                }
                                break;
                            //3
                            case (pixel_ratio_device_int > 1 && pixel_ratio_virtual_int > 1.1):
                                switch(true)
                                {
                                    case (in_array(type_str, ['vW', 'vH'])):
                                        dim_res = dim_res * pixel_ratio_device_int;
                                        dim_res = (isEvenDecimal(dim_res)) ? Math.floor(dim_res) : Math.ceil(dim_res);
                                        break;
                                }
                                break;
                        }
                        break;
                }

                /**
                 * Get the nearest standard screen widths or heights
                 */
                switch(true)
                {
                    case (type_str == 'sW' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_w_arr, dim_res, '', '', 8);
                        break;

                    case (type_str == 'sH' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_h_arr, dim_res, '', '', 8);
                        break;
                }
        }

        dim_res = Math.floor(dim_res);
        return dim_res;
    }

    /**
     * Get the Viewport dimensions in Device-Independent Pixels
     * @param type_str {String} The type of operation. Either 'w' for width, or 'h' for height
     * @return {Number}
     * @private
     */
    function _getViewportDimensionDIP(type_str)
    {
        var dim_res,
            is_width_bool = !!((type_str == 'w')),
            is_pc_or_tv_bool = !!((isPC() || isTV())),
            pixel_ratio_int = getPixelRatio()
            ;

        switch(true)
        {
            case (is_pc_or_tv_bool):
                //If pc or tv, moderate use of pixel ratio
                pixel_ratio_int = (pixel_ratio_int <= 1.5) ? 1 : pixel_ratio_int;
                break;
        }
        dim_res = (is_width_bool) ? viewportW()/pixel_ratio_int : viewportH()/pixel_ratio_int;
        return Math.round(dim_res);
    }

    /**
     * Get the dimension of a DOM Element.
     * It uses the JQuery dimension functions e.g. width(), innerHeight(), etc.
     * @param el_obj {String} The JQuery element object
     * @param type_str {String} The type of operation. w = width, h = height
     * @param format_str {String} The dimension retrieval method to use. There are three as follows
     * 1: d = default = el_obj.width() or el_obj.height()
     * 2: i = inner = el_obj.innerWidth() or el_obj.innerHeight()
     * 3: o = outer = el_obj.outerWidth() or el_obj.outerHeight()
     * @param force_dip_bool {Boolean} Determines whether to consider the element dimensions in device-independent pixel format or not. true = do not use DIP, false [default] = use DIP
     * @return {Number|Boolean}
     * @private
     */
    function _getElementDimension(el_obj, type_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            format_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2]: 'd',
            force_dip_bool = (isBool(myArgs[3])) ? myArgs[3]: false,
            dim_final_int
            ;
        type_str = type_str.toLowerCase();

        switch(true)
        {
            case (type_str == 'w'):
                switch(true)
                {
                    case (format_str == 'i'):
                        dim_final_int = el_obj.innerWidth();
                        break;

                    case (format_str == 'o'):
                        dim_final_int = el_obj.outerWidth();
                        break;

                    default:
                        dim_final_int = el_obj.width();
                }
                break;

            case (type_str == 'h'):
                switch(true)
                {
                    case (format_str == 'i'):
                        dim_final_int = el_obj.innerHeight();
                        break;

                    case (format_str == 'o'):
                        dim_final_int = el_obj.outerHeight();
                        break;

                    default:
                        dim_final_int = el_obj.height();
                }
                break;

            default:
                dim_final_int = false;
        }

        switch(true)
        {
            case (force_dip_bool === false):
                //Convert to Device Pixels
                dim_final_int = dim_final_int * getPixelRatio();
                break;
        }

        return dim_final_int;
    }

    /**
     * Get the width of a DOM element
     * @param el_obj {Object} The JQuery Element Object
     * @param dim_format_str {String} The dimension retrieval method to use.
     * @param force_dip_bool {Boolean} Flag for forced Device-Independent Pixel consideration
     * @return {Number|Boolean}
     * @private
     */
    function _elementW(el_obj){
        var myArgs = Array.prototype.slice.call(arguments),
            dim_format_str = myArgs[1],
            force_dip_bool = myArgs[2]
            ;
        return _getElementDimension(el_obj, 'w', dim_format_str, force_dip_bool);
    }

    /**
     * Get the height of a DOM element
     * @param el_obj {Object} The JQuery Element Object
     * @param dim_format_str {String} The dimension retrieval method to use.
     * @param force_dip_bool {Boolean} Flag for forced Device-Independent Pixel consideration
     * @return {Number|Boolean}
     * @private
     */
    function _elementH(el_obj){
        var myArgs = Array.prototype.slice.call(arguments),
            dim_format_str = myArgs[1],
            force_dip_bool = myArgs[2]
            ;
        return _getElementDimension(el_obj, 'h', dim_format_str, force_dip_bool);
    }

    /**
     * Get the width of the viewport
     * @return {*|Number}
     */
    function viewportW(){
        return (isStorageValueSet("rstv_viewportW")) ? store("rstv_viewportW"): _getDimension('vW', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the height of the viewport
     * @return {*|Number}
     */
    function viewportH(){
        return (isStorageValueSet("rstv_viewportH")) ? store("rstv_viewportH"): _getDimension('vH', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the width of the screen i.e. device width
     * @return {*|Number}
     */
    function screenW(){
        return (isStorageValueSet("rstv_screenW")) ? store("rstv_screenW"): _getDimension('sW', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the height of the screen i.e. device height
     * @return {*|Number}
     */
    function screenH(){
        return (isStorageValueSet("rstv_screenH")) ? store("rstv_screenH"): _getDimension('sH', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the Device-Independent Pixel width of the viewport
     */
    function pixelW()
    {
        return (isStorageValueSet("rstv_viewportW_dip")) ? store("rstv_viewportW_dip"): _getViewportDimensionDIP('w');
    }

    /**
     * Get the Device-Independent Pixel height of the viewport
     */
    function pixelH()
    {
        return (isStorageValueSet("rstv_viewportH_dip")) ? store("rstv_viewportH_dip"): _getViewportDimensionDIP('h');
    }

    /**
     * Resets/Updates the cached values (localStorage) of Viewport and Screen Dimension Info
     * @private
     */
    function _updateDimensionStore()
    {
        //reset
        store("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH", null);

        //reload
        store("rstv_viewportW", viewportW());
        store("rstv_viewportH", viewportH());
        store("rstv_screenW", screenW());
        store("rstv_screenH", screenH());
        store("rstv_viewportW_dip", pixelW());
        store("rstv_viewportH_dip", pixelH());
    }

    /**
     * Get the Device Pixel Ratio
     * @param decimal {Number} An optional number (integer or float) to check against actual pixel ratio
     * @return {Number|Boolean}
     */
    function getPixelRatio(decimal)
    {
        //check if pixel ratio check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_pixel_ratio")):
                return store("rstv_pixel_ratio");
                break;
        }

        var device_user_agent_str = getUserAgent(),
            is_opera_browser_bool = /opera.+(mini|mobi)/i.test(device_user_agent_str),
            doc_client_w = store("rstv_var_doc_client_w"),
            win_outer_w = store("rstv_var_win_outer_w"),
            win_screen_w = store("rstv_var_win_screen_w"),
            is_symbian_bool = !!(isSymbian()),
            is_windows_bool = !!(isWindows()),
            is_android_1_bool = !!((isAndroid('1.'))),
            is_android_2_bool = !!((isAndroid('2.'))),
            is_special_needs_bool = !!(((is_android_1_bool || is_android_2_bool) || is_symbian_bool || is_windows_bool)),
            is_windows_or_symbian_bool = !!(is_windows_bool || is_symbian_bool),
            viewport_w = (is_special_needs_bool) ? ((win_outer_w <= 0) ? doc_client_w : win_outer_w) : doc_client_w,
            screen_w = ((is_android_2_bool || is_symbian_bool) && !is_opera_browser_bool) ? ((win_outer_w <= 0) ? win_screen_w : win_outer_w) : win_screen_w,
            dPR,
            dPR_temp,
            dPR_virtual,
            dPR_retr
            ;

        /**
         * Get the Pixel Ratio
         * Make Adjustments for when window.devicePixelRatio is 0
         */
        dPR_temp = win.devicePixelRatio;
        switch(true)
        {
            case (dPR_temp <= 0 || typeof dPR_temp === 'undefined' || dPR_temp === null):
                dPR_virtual = screen_w/viewport_w;
                dPR = dPR_virtual;
                switch(true)
                {
                    case (is_windows_or_symbian_bool):
                        switch(true)
                        {
                            case (dPR > 0.5 && dPR < 1.2):
                                dPR = 1;
                                break;

                            case (dPR >= 1.2 && dPR < 2):
                                dPR = 1.5;
                                break;

                            case (dPR >= 2 && dPR < 3):
                                dPR = 2;
                                break;

                            case (dPR >= 3):
                                dPR = 3;
                                break;

                            default:
                                dPR = 1;
                        }
                        break;
                }
                store("rstv_pixel_ratio_virtual", dPR_virtual);
                break;

            default:
                dPR = dPR_temp;
        }

        //Return Pixel Ratio variations
        switch(true)
        {
            case (!isNumber(decimal)):
                dPR_retr = dPR || (getPixelRatio(3) ? 3 : getPixelRatio(2) ? 2 : getPixelRatio(1.5) ? 1.5 : getPixelRatio(1) ? 1 : 0);
                store("rstv_pixel_ratio", dPR_retr);
                return dPR_retr;
                break;
        }

        //Return false if not finite
        switch(true)
        {
            case (!isFinite(decimal)):
                return false;
                break;
        }

        switch(true)
        {
            case (dPR && dPR > 0):
                return dPR >= decimal;
                break;
        }

        //Revert to .matchMedia/.msMatchMedia for Gecko (FF6+) support
        decimal = 'only all and (min--moz-device-pixel-ratio:' + decimal + ')';
        switch(true)
        {
            case (media(decimal).matches):
                return true;
                break;
        }

        return !!media(decimal.replace('-moz-', '')).matches;
    }

    /**
     * Checks if the device is a Retina-device i.e. it has a Pixel Ratio of 2 or greater
     * @return {Boolean}
     */
    function isRetina()
    {
        var pixel_ratio_int = getPixelRatio();
        switch(true)
        {
            case (pixel_ratio_int >= 2):
                return true;
                break;
        }

        return false;
    }

    /**
     * A comparison function for checking if a number is within a range of two other numbers
     * @param {Function} fn
     * @return {Function}
     */
    function rangeCompare(fn) {
        return function(min, max) {
            var myArgs = Array.prototype.slice.call(arguments),
                bool,
                el = myArgs[2],
                el_valid_bool = !!((isObject(el) && (typeof el !== "undefined" && el !== null))),
                wf = myArgs[3],
                f_dip = myArgs[4],
                curr = (el_valid_bool) ? fn(el, wf, f_dip) : fn()
                ;

            bool = curr >= (min || 0);
            return !max ? bool : bool && curr <= max;
        };
    }

    //Range Comparison Booleans for Viewport and Screen
    vSpan = rangeCompare(viewportW);
    vPitch = rangeCompare(viewportH);
    dSpan = rangeCompare(screenW);
    dPitch = rangeCompare(screenH);
    cSpan = rangeCompare(pixelW);
    cPitch = rangeCompare(pixelH);

    //Range Comparison Booleans for DOM Element Containers
    eSpan = rangeCompare(_elementW);
    ePitch = rangeCompare(_elementH);

    /**
     * Gets the user agent of the Device
     * This function makes provision for proxy-based browsers that employ X11 forwarding
     * @return {String}
     */
    function getUserAgent()
    {
        //check if user agent check has been done and is in storage. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_user_agent")):
                return store("rstv_user_agent");
                break;
        }

        var ua = navigator.userAgent.toLowerCase(),
            is_proxy_bool;

        //Check if device user agent is being updated by proxy-based browser
        is_proxy_bool = /mozilla.+x11/i.test(ua);

        switch(true)
        {
            case (is_proxy_bool):
                $.ajax({
                    type: "GET",
                    async: false,
                    crossDomain: true,
                    url: "http://www.restive.io/ping/ua.php",
                    headers: {
                        "Cache-Control":"no-cache",
                        "Pragma":"no-cache"
                    },
                    success: function(response) {
                        ua = response;
                    },
                    error: function(xhr, status, error_msg){
                        console.log('error');/*RemoveLogging:skip*/
                    }
                });
                break;
        }

        store("rstv_user_agent", ua);
        return ua;
    }

    /**
     * Gets the Operating System Platform of the Device
     * There are six possible platforms available
     * (1) ios, (2) android, (3) Symbian, (4) Blackberry, (5) Windows, (6) Other
     * @return {String}
     */
    function getPlatform()
    {
        switch(true)
        {
            case (_checkOS("ios")):
                return "ios";
                break;

            case (_checkOS("android")):
                return "android";
                break;

            case (_checkOS("symbian")):
                return "symbian";
                break;

            case (_checkOS("blackberry")):
                return "blackberry";
                break;

            case (_checkOS("windows")):
                return "windows";
                break;

            default:
                return "other";
        }
    }

    /**
     * Detects the Operating System [Platform] of the Device
     * @param os_str {String} The name of the OS
     * @param version_str An optional version number [Only valid for Android]
     * @return {Boolean}
     * @private
     */
    function _checkOS(os_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            is_version_valid_bool = !!((isString(myArgs[1]) && myArgs[1] != "")),
            version_str = '',
            version_regex_suffix_str = '',
            version_store_suffix_str = ''
            ;

        //manage version string if provided
        switch(true)
        {
            case (is_version_valid_bool):
                version_str = myArgs[1];
                version_str = version_str.replace(/^\s+|\s+$/g, "");
                version_regex_suffix_str = ' '+version_str;
                version_store_suffix_str = '_'+version_str.replace(".", "_");
                break;
        }

        //Check if value is stored. Return if true
        switch(true)
        {
            case (isStorageValueSet("rstv_is_"+os_str+version_store_suffix_str)):
                return store("rstv_is_"+os_str+version_store_suffix_str);
                break;
        }

        var nav = getUserAgent(),
            is_os_bool = false;

        switch(true)
        {
            case (os_str == "ios"):
                is_os_bool = /\bipad|\biphone|\bipod/i.test(nav);
                break;

            case (os_str == "android"):
                var pattern = new RegExp("\\bandroid"+version_regex_suffix_str, "i");
                is_os_bool = pattern.test(nav);
                break;

            case (os_str == "symbian"):
                is_os_bool = /series(4|6)0|symbian|symbos|syb-[0-9]+|\bs60\b/i.test(nav);
                break;

            case (os_str == "blackberry"):
                is_os_bool = /bb[0-9]+|blackberry|playbook|rim +tablet/i.test(nav);
                break;

            case (os_str == "windows"):
                is_os_bool = /window mobile|windows +(ce|phone)|windows +nt.+arm|windows +nt.+touch|xblwp7|zunewp7/i.test(nav);
                break;

            case (os_str == "windows_phone"):
                is_os_bool = /windows +phone|xblwp7|zunewp7/i.test(nav);
                break;

            default:
                return false;
        }

        //persist to local storage and return
        store("rstv_is_"+os_str+version_store_suffix_str, is_os_bool);
        return !!((is_os_bool));
    }

    /**
     * Checks if the Device is based on Apple's iOS Platform
     * @return {Boolean}
     */
    function isIOS()
    {
        return _checkOS("ios");
    }

    /**
     * Checks if the Device is based on Apple's iOS Platform
     * @return {Boolean}
     */
    function isApple()
    {
        return _checkOS("ios");
    }

    /**
     * Checks if the Device is based on Android Platform
     * @return {Boolean}
     */
    function isAndroid()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            version_str = myArgs[0];
        return _checkOS("android", version_str);
    }

    /**
     * Checks if the Device is based on Symbian Platform
     * @return {Boolean}
     */
    function isSymbian()
    {
        return _checkOS("symbian");
    }

    /**
     * Checks if the Device is based on Blackberry Platform
     * @return {Boolean}
     */
    function isBlackberry()
    {
        return _checkOS("blackberry");
    }

    /**
     * Checks if the Device is based on a Windows Platform
     * @return {Boolean}
     */
    function isWindows()
    {
        return _checkOS("windows");
    }

    /**
     * Checks if the Device is based on Windows Phone Platform
     * @return {Boolean}
     */
    function isWindowsPhone()
    {
        return _checkOS("windows_phone");
    }

    /**
     * Mobile Browser Detection Regex
     * @param ua {String} User Agent String
     * @return {Boolean}
     * @private
     */
    function _mobileDetect(ua)
    {
        return /android|android.+mobile|avantgo|bada\/|\bbb[0-9]+|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|\bip(hone|od|ad)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|motorola|mobile.+firefox|netfront|nokia|nintendo +3ds|opera m(ob|in)i|palm|palm( os)?|phone|p(ixi|re)\/|playbook|rim +tablet|playstation.+vita|plucker|pocket|psp|samsung|(gt\-|bgt\-|sgh\-|sph\-|sch\-)[a-z][0-9]+|series(4|6)0|symbian|symbos|\bs60\b|treo|up\.(browser|link)|vertu|vodafone|wap|windows (ce|phone)|windows +nt.+arm|windows +nt.+touch|xda|xiino|xblwp7|zunewp7/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb|b\-[0-9]+)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
    }

    /**
     * Gets the Form Factor of the device
     * There are only three form factors available
     * (1) Phone, (2) Tablet, (3) TV, (4) PC
     * @return {String}
     */
    function getFormFactor()
    {
        var form_factor_str = "";

        switch(true)
        {
            case (isTablet()):
                form_factor_str = "tablet";
                break;

            case (isTV()):
                form_factor_str = "tv";
                break;

            default:
                switch(true)
                {
                    case (isPhone()):
                        form_factor_str = "phone";
                        break;

                    default:
                        form_factor_str = "pc";
                }
        }

        return form_factor_str;
    }

    /**
     * Check if the Device is a Phone
     * @return {Boolean}
     */
    function isPhone()
    {
        //check if phone check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_phone")):
                return store("rstv_is_phone");
                break;
        }

        //Check if Device is a Tablet
        switch(true)
        {
            case (isTablet(true) || isTV()):
                //is not phone
                store("rstv_is_phone", false);
                return false;
                break;
        }

        //Check if it is a phone
        switch(true)
        {
            case (_mobileDetect(getUserAgent() || navigator.vendor.toLowerCase() || window.opera)):
                store("rstv_is_phone", true);
                return true;
                break;
        }

        store("rstv_is_phone", false);
        return false;
    }

    /**
     * Check if the Device is a Tablet
     * @param bypass_storage_bool {Boolean} Prevent this method from caching its result in local storage
     * @return {Boolean}
     */
    function isTablet()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            bypass_storage_bool = isBool(myArgs[0]) ? myArgs[0] : false
            ;

        //check if tablet check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_tablet")):
                return store("rstv_is_tablet");
                break;
        }

        var regex_raw_str,
            regex,
            is_tablet_bool,
            nav = getUserAgent();

        //if iPad or Blackberry Playbook, return true
        regex = new RegExp("ipad|playbook|rim +tablet", "i");
        is_tablet_bool = regex.test(nav);
        switch(true)
        {
            case (is_tablet_bool):
                if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                return true;
                break;
        }

        //if Windows Surface, return true
        regex = new RegExp("windows +nt.+arm|windows +nt.+touch", "i");
        is_tablet_bool = regex.test(nav);
        switch(true)
        {
            case (is_tablet_bool):
                if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                return true;
                break;
        }

        /**
         * Check Other Known Tablets
         *
         * 1. Amazon Kindle: android.+kindle|kindle +fire|android.+silk|silk.*accelerated
         * 2. Google Nexus Tablet: android.+nexus +(7|10)
         * 3. Samsung Tablet: samsung.*tablet|galaxy.*tab|sc-01c|gt-p1000|gt-p1003|gt-p1010|gt-p3105|gt-p6210|gt-p6800|gt-p6810|gt-p7100|gt-p7300|gt-p7310|gt-p7500|gt-p7510|sch-i800|sch-i815|sch-i905|sgh-i957|sgh-i987|sgh-t849|sgh-t859|sgh-t869|sph-p100|gt-p3100|gt-p3108|gt-p3110|gt-p5100|gt-p5110|gt-p6200|gt-p7320|gt-p7511|gt-n8000|gt-p8510|sgh-i497|sph-p500|sgh-t779|sch-i705|sch-i915|gt-n8013|gt-p3113|gt-p5113|gt-p8110|gt-n8010|gt-n8005|gt-n8020|gt-p1013|gt-p6201|gt-p7501|gt-n5100|gt-n5110|shv-e140k|shv-e140l|shv-e140s|shv-e150s|shv-e230k|shv-e230l|shv-e230s|shw-m180k|shw-m180l|shw-m180s|shw-m180w|shw-m300w|shw-m305w|shw-m380k|shw-m380s|shw-m380w|shw-m430w|shw-m480k|shw-m480s|shw-m480w|shw-m485w|shw-m486w|shw-m500w|gt-i9228|sch-p739|sch-i925|gt-i9200|gt-i9205|gt-p5200|gt-p5210|sm-t311|sm-t310|sm-t210|sm-t210r|sm-t211|sm-p600|sm-p601|sm-p605|sm-p900|sm-t217|sm-t217a|sm-t217s|sm-p6000|sm-t3100|sgh-i467|xe500
         * 4. HTC Tablet: htc flyer|htc jetstream|htc-p715a|htc evo view 4g|pg41200
         * 5. Motorola Tablet: xoom|sholest|mz615|mz605|mz505|mz601|mz602|mz603|mz604|mz606|mz607|mz608|mz609|mz615|mz616|mz617
         * 6. Asus Tablet: transformer|^.*padfone((?!mobile).)*$|tf101|tf201|tf300|tf700|tf701|tf810|me171|me301t|me302c|me371mg|me370t|me372mg|me172v|me173x|me400c|slider *sl101
         * 7. Nook Tablet: android.+nook|nookcolor|nook browser|bnrv200|bnrv200a|bntv250|bntv250a|bntv400|bntv600|logicpd zoom2
         * 8. Acer Tablet: android.*\b(a100|a101|a110|a200|a210|a211|a500|a501|a510|a511|a700|a701|w500|w500p|w501|w501p|w510|w511|w700|g100|g100w|b1-a71|b1-710|b1-711|a1-810)\b|w3-810
         * 9. Toshiba Tablet: android.*(at100|at105|at200|at205|at270|at275|at300|at305|at1s5|at500|at570|at700|at830)|toshiba.*folio
         * 10. LG Tablet: \bl-06c|lg-v900|lg-v905|lg-v909
         * 11. Yarvik Tablet: android.+(xenta.+tab|tab210|tab211|tab224|tab250|tab260|tab264|tab310|tab360|tab364|tab410|tab411|tab420|tab424|tab450|tab460|tab461|tab464|tab465|tab467|tab468|tab469)
         * 12. Medion Tablet: android.+\boyo\b|life.*(p9212|p9514|p9516|s9512)|lifetab
         * 13. Arnova Tablet: an10g2|an7bg3|an7fg3|an8g3|an8cg3|an7g3|an9g3|an7dg3|an7dg3st|an7dg3childpad|an10bg3|an10bg3dt
         * 14. Archos Tablet: android.+archos|\b(101g9|80g9|a101it)\b|qilive 97r|
         * 15. Ainol Tablet: novo7|novo7aurora|novo7basic|novo7paladin|novo8|novo9|novo10
         * 16. Sony Tablet: sony tablet|sony tablet s|sgpt12|sgpt121|sgpt122|sgpt123|sgpt111|sgpt112|sgpt113|sgpt211|sgpt213|ebrd1101|ebrd1102|ebrd1201|sgpt311|sgpt312|sonyso-03e
         * 17. Cube Tablet: android.*(k8gt|u9gt|u10gt|u16gt|u17gt|u18gt|u19gt|u20gt|u23gt|u30gt)|cube u8gt
         * 18. Coby Tablet: mid1042|mid1045|mid1125|mid1126|mid7012|mid7014|mid7034|mid7035|mid7036|mid7042|mid7048|mid7127|mid8042|mid8048|mid8127|mid9042|mid9740|mid9742|mid7022|mid7010
         * 19. SMiTTablet: android.*(\bmid\b|mid-560|mtv-t1200|mtv-pnd531|mtv-p1101|mtv-pnd530)
         * 20. RockchipTablet: android.*(rk2818|rk2808a|rk2918|rk3066)|rk2738|rk2808a
         * 21. TelstraTablet: t-hub2
         * 22. FlyTablet: iq310|fly vision
         * 23. bqTablet: bq.*(elcano|curie|edison|maxwell|kepler|pascal|tesla|hypatia|platon|newton|livingstone|cervantes|avant)
         * 24. HuaweiTablet: mediapad|ideos s7|s7-201c|s7-202u|s7-101|s7-103|s7-104|s7-105|s7-106|s7-201|s7-slim
         * 25. NecTablet: \bn-06d|\bn-08d
         * 26. Pantech: pantech.*p4100
         * 27. BronchoTablet: broncho.*(n701|n708|n802|a710)
         * 28. VersusTablet: touchpad.*[78910]|\btouchtab\b
         * 29. Zynctablet: z1000|z99 2g|z99|z930|z999|z990|z909|z919|z900
         * 30. Positivo: tb07sta|tb10sta|tb07fta|tb10fta
         * 31. NabiTablet: android.*\bnabi
         * 32. Playstation: playstation.*(portable|vita)
         * 33. Dell: dell.*streak
         * 34. Milagrow: milagrow +tab.*top
         * 35. Lenovo: android.+(ideapad|ideatab|lenovo +a1|s2110|s6000|k3011|a3000|a1000|a2107|a2109|a1107)
         * 37. UPad: android.+f8-sup
         * 38. Kobo: android.+(k080|arc|vox)
         * 39. MSI: android.*(msi.+enjoy|enjoy +7|enjoy +10)
         * 40. Agasio: dropad.+a8
         * 41. Acho: android.+c906
         * 42. Iberry: android.+iberry.+auxus
         * 43. Aigo: android.+aigopad
         * 44. Airpad: android.*(airpad|liquid metal)
         * 45. HCL: android.+hcl.+tablet|connect-3g-2.0|connect-2g-2.0|me tablet u1|me tablet u2|me tablet g1|me tablet x1|me tablet y2|me tablet sync
         * 46. Karbonn: android.*(a39|a37|a34|st8|st10|st7|smarttab|smart +tab)
         * 47. Micromax: android.*(micromax.+funbook|funbook|p250|p275|p300|p350|p362|p500|p600)|micromax.*(p250|p275|p350|p362|p500|p600)|funbook
         * 48. Penta: android.+penta
         * 49. Celkon: android.*(celkon.+ct|ct-[0-9])
         * 50. Intex: android.+i-buddy
         * 51. Viewsonic: android.*(viewbook|viewpad)
         * 52: ZTE: android.*(v9|zte.+v8110|light tab|light pro|beeline|base.*tab)
         * 53. Pegatron: chagall
         * 54. Advan: android.*(vandroid|t3i)
         * 55. Creative: android.*(ziio7|ziio10)
         * 56. OlivePad: android.*(v-t100|v-tw100|v-tr200|v-t300)
         * 57. Vizio: android.+vtab1008
         * 58. Bookeen: bookeen|cybook
         * 59. Medion: android.*lifetab_(s9512|p9514|p9516)
         * 60. IRU Tablet: m702pro
         * 61. IRULU: irulu-al101
         * 62. Prestigio: pmp3170b|pmp3270b|pmp3470b|pmp7170b|pmp3370b|pmp3570c|pmp5870c|pmp3670b|pmp5570c|pmp5770d|pmp3970b|pmp3870c|pmp5580c|pmp5880d|pmp5780d|pmp5588c|pmp7280c|pmp7280|pmp7880d|pmp5597d|pmp5597|pmp7100d|per3464|per3274|per3574|per3884|per5274|per5474|pmp5097cpro|pmp5097|pmp7380d|pmp5297c|pmp5297c_quad
         * 63. AllView: allview.*(viva|alldro|city|speed|all tv|frenzy|quasar|shine|tx1|ax1|ax2)
         * 64: Megafon: megafon v9
         * 65: Lava: android.+(z7c|z7h|z7s)
         * 66: iBall: android.+iball.+slide.+(3g *7271|3g *7334|3g *7307|3g *7316|i7119|i7011)|android.+iball.+i6012
         * 67. Tabulet: android.+(tabulet|troy +duos)
         * 68. Texet Tablet: navipad|tb-772a|tm-7045|tm-7055|tm-9750|tm-7016|tm-7024|tm-7026|tm-7041|tm-7043|tm-7047|tm-8041|tm-9741|tm-9747|tm-9748|tm-9751|tm-7022|tm-7021|tm-7020|tm-7011|tm-7010|tm-7023|tm-7025|tm-7037w|tm-7038w|tm-7027w|tm-9720|tm-9725|tm-9737w|tm-1020|tm-9738w|tm-9740|tm-9743w|tb-807a|tb-771a|tb-727a|tb-725a|tb-719a|tb-823a|tb-805a|tb-723a|tb-715a|tb-707a|tb-705a|tb-709a|tb-711a|tb-890hd|tb-880hd|tb-790hd|tb-780hd|tb-770hd|tb-721hd|tb-710hd|tb-434hd|tb-860hd|tb-840hd|tb-760hd|tb-750hd|tb-740hd|tb-730hd|tb-722hd|tb-720hd|tb-700hd|tb-500hd|tb-470hd|tb-431hd|tb-430hd|tb-506|tb-504|tb-446|tb-436|tb-416|tb-146se|tb-126se
         * 69. GalapadTablet: android.*\bg1\b
         * 70. GUTablet: tx-a1301|tx-m9002|q702
         * 71. GT-Pad: ly-f528
         * 72. Danew: android.+dslide.*\b(700|701r|702|703r|704|802|970|971|972|973|974|1010|1012)\b
         * 73. MIDTablet: m9701|m9000|m9100|m806|m1052|m806|t703|mid701|mid713|mid710|mid727|mid760|mid830|mid728|mid933|mid125|mid810|mid732|mid120|mid930|mid800|mid731|mid900|mid100|mid820|mid735|mid980|mid130|mid833|mid737|mid960|mid135|mid860|mid736|mid140|mid930|mid835|mid733
         * 74. Fujitsu: android.*\b(f-01d|f-05e|f-10d|m532|q572)\b
         * 75. GPad: android.+casiatab8
         * 76. Tesco Hudl: android.+hudl
         * 77. Polaroid: android.*(polaroid.*tablet|pmid1000|pmid10c|pmid800|pmid700|pmid4311|pmid701c|pmid701i|pmid705|pmid706|pmid70dc|pmid70c|pmid720|pmid80c|pmid901|ptab7200|ptab4300|ptab750|midc010|midc407|midc409|midc410|midc497|midc700|midc800|midc801|midc802|midc901)
         * 78. Eboda: e-boda.+(supreme|impresspeed|izzycomm|essential)
         * 79. HP Tablet: hp slate 7|hp elitepad 900|hp-tablet|elitebook.*touch
         * 80. AllFineTablet: fine7 genius|fine7 shine|fine7 air|fine8 style|fine9 more|fine10 joy|fine11 wide
         * 81. Sanei: android.*\b(n10|n10-4core|n78|n79|n83|n90 ii)\b
         * 82: ProScan Tablet: \b(pem63|plt1023g|plt1041|plt1044|plt1044g|plt1091|plt4311|plt4311pl|plt4315|plt7030|plt7033|plt7033d|plt7035|plt7035d|plt7044k|plt7045k|plt7045kb|plt7071kg|plt7072|plt7223g|plt7225g|plt7777g|plt7810k|plt7849g|plt7851g|plt7852g|plt8015|plt8031|plt8034|plt8036|plt8080k|plt8082|plt8088|plt8223g|plt8234g|plt8235g|plt8816k|plt9011|plt9045k|plt9233g|plt9735|plt9760g|plt9770g)\b
         * 83: YonesTablet : bq1078|bc1003|bc1077|rk9702|bc9730|bc9001|it9001|bc7008|bc7010|bc708|bc728|bc7012|bc7030|bc7027|bc7026
         * 84: ChangJiaTablet: tpc7102|tpc7103|tpc7105|tpc7106|tpc7107|tpc7201|tpc7203|tpc7205|tpc7210|tpc7708|tpc7709|tpc7712|tpc7110|tpc8101|tpc8103|tpc8105|tpc8106|tpc8203|tpc8205|tpc8503|tpc9106|tpc9701|tpc97101|tpc97103|tpc97105|tpc97106|tpc97111|tpc97113|tpc97203|tpc97603|tpc97809|tpc97205|tpc10101|tpc10103|tpc10106|tpc10111|tpc10203|tpc10205|tpc10503
         * 85: RoverPad: android.*(roverpad|rp3wg70)
         * 86. PointofView Tablet: tab-p506|tab-navi-7-3g-m|tab-p517|tab-p-527|tab-p701|tab-p703|tab-p721|tab-p731n|tab-p741|tab-p825|tab-p905|tab-p925|tab-pr945|tab-pl1015|tab-p1025|tab-pi1045|tab-p1325|tab-protab[0-9]+|tab-protab25|tab-protab26|tab-protab27|tab-protab26xl|tab-protab2-ips9|tab-protab30-ips9|tab-protab25xxl|tab-protab26-ips10|tab-protab30-ips10
         * 87: Overmax: android.*ov-(steelcore|newbase|basecore|baseone|exellen|quattor|edutab|solution|action|basictab|teddytab|magictab|stream|tb-08|tb-09)
         * 88: DPS Tablet: dps dream 9|dps dual 7
         * 89: Visture Tablet: v97 hd|i75 3g|visture v4( hd)?|visture v5( hd)?|visture v10
         * 90: Cresta Tablet: ctp(-)?810|ctp(-)?818|ctp(-)?828|ctp(-)?838|ctp(-)?888|ctp(-)?978|ctp(-)?980|ctp(-)?987|ctp(-)?988|ctp(-)?989
         * 200. Generic Tablet: android.*\b97d\b|tablet(?!.*pc)|viewpad7|lg-v909|mid7015|bntv250a|logicpd zoom2|\ba7eb\b|catnova8|a1_07|ct704|ct1002|\bm721\b|rk30sdk|\bevotab\b|smarttabii10|smarttab10
         */
        regex_raw_str = ""+
            "android.+kindle|kindle +fire|android.+silk|silk.*accelerated|"+
            "android.+nexus +(7|10)|"+
            "samsung.*tablet|galaxy.*tab|sc-01c|gt-p1000|gt-p1003|gt-p1010|gt-p3105|gt-p6210|gt-p6800|gt-p6810|gt-p7100|gt-p7300|gt-p7310|gt-p7500|gt-p7510|sch-i800|sch-i815|sch-i905|sgh-i957|sgh-i987|sgh-t849|sgh-t859|sgh-t869|sph-p100|gt-p3100|gt-p3108|gt-p3110|gt-p5100|gt-p5110|gt-p6200|gt-p7320|gt-p7511|gt-n8000|gt-p8510|sgh-i497|sph-p500|sgh-t779|sch-i705|sch-i915|gt-n8013|gt-p3113|gt-p5113|gt-p8110|gt-n8010|gt-n8005|gt-n8020|gt-p1013|gt-p6201|gt-p7501|gt-n5100|gt-n5110|shv-e140k|shv-e140l|shv-e140s|shv-e150s|shv-e230k|shv-e230l|shv-e230s|shw-m180k|shw-m180l|shw-m180s|shw-m180w|shw-m300w|shw-m305w|shw-m380k|shw-m380s|shw-m380w|shw-m430w|shw-m480k|shw-m480s|shw-m480w|shw-m485w|shw-m486w|shw-m500w|gt-i9228|sch-p739|sch-i925|gt-i9200|gt-i9205|gt-p5200|gt-p5210|sm-t311|sm-t310|sm-t210|sm-t210r|sm-t211|sm-p600|sm-p601|sm-p605|sm-p900|sm-t217|sm-t217a|sm-t217s|sm-p6000|sm-t3100|sgh-i467|xe500|"+
            "htc flyer|htc jetstream|htc-p715a|htc evo view 4g|pg41200|"+
            "xoom|sholest|mz615|mz605|mz505|mz601|mz602|mz603|mz604|mz606|mz607|mz608|mz609|mz615|mz616|mz617|"+
            "transformer|^.*padfone((?!mobile).)*$|tf101|tf201|tf300|tf700|tf701|tf810|me171|me301t|me302c|me371mg|me370t|me372mg|me172v|me173x|me400c|slider *sl101|"+
            "android.+nook|nookcolor|nook browser|bnrv200|bnrv200a|bntv250|bntv250a|bntv400|bntv600|logicpd zoom2|"+
            "android.*\\b(a100|a101|a110|a200|a210|a211|a500|a501|a510|a511|a700|a701|w500|w500p|w501|w501p|w510|w511|w700|g100|g100w|b1-a71|b1-710|b1-711|a1-810)\\b|w3-810|"+
            "android.*(at100|at105|at200|at205|at270|at275|at300|at305|at1s5|at500|at570|at700|at830)|toshiba.*folio|"+
            "\\bl-06c|lg-v900|lg-v905|lg-v909|"+
            "android.+(xenta.+tab|tab210|tab211|tab224|tab250|tab260|tab264|tab310|tab360|tab364|tab410|tab411|tab420|tab424|tab450|tab460|tab461|tab464|tab465|tab467|tab468|tab469)|"+
            "android.+\\boyo\\b|life.*(p9212|p9514|p9516|s9512)|lifetab|"+
            "an10g2|an7bg3|an7fg3|an8g3|an8cg3|an7g3|an9g3|an7dg3|an7dg3st|an7dg3childpad|an10bg3|an10bg3dt|"+
            "android.+archos|\\b(101g9|80g9|a101it)\\b|qilive 97r|"+
            "novo7|novo7aurora|novo7basic|novo7paladin|novo8|novo9|novo10|"+
            "sony tablet|sony tablet s|sgpt12|sgpt121|sgpt122|sgpt123|sgpt111|sgpt112|sgpt113|sgpt211|sgpt213|ebrd1101|ebrd1102|ebrd1201|sgpt311|sgpt312|sonyso-03e|"+
            "android.*(k8gt|u9gt|u10gt|u16gt|u17gt|u18gt|u19gt|u20gt|u23gt|u30gt)|cube u8gt|"+
            "mid1042|mid1045|mid1125|mid1126|mid7012|mid7014|mid7034|mid7035|mid7036|mid7042|mid7048|mid7127|mid8042|mid8048|mid8127|mid9042|mid9740|mid9742|mid7022|mid7010|"+
            "android.*(\\bmid\\b|mid-560|mtv-t1200|mtv-pnd531|mtv-p1101|mtv-pnd530)|"+
            "android.*(rk2818|rk2808a|rk2918|rk3066)|rk2738|rk2808a|"+
            "t-hub2|"+
            "iq310|fly vision|"+
            "bq.*(elcano|curie|edison|maxwell|kepler|pascal|tesla|hypatia|platon|newton|livingstone|cervantes|avant)|"+
            "mediapad|ideos s7|s7-201c|s7-202u|s7-101|s7-103|s7-104|s7-105|s7-106|s7-201|s7-slim|"+
            "\\bn-06d|\\bn-08d|"+
            "pantech.*p4100|"+
            "broncho.*(n701|n708|n802|a710)|"+
            "touchpad.*[78910]|\\btouchtab\\b|"+
            "z1000|z99 2g|z99|z930|z999|z990|z909|z919|z900|"+
            "tb07sta|tb10sta|tb07fta|tb10fta|"+
            "android.*\\bnabi|"+
            "playstation.*(portable|vita)|"+
            "dell.*streak|"+
            "milagrow +tab.*top|"+
            "android.+(ideapad|ideatab|lenovo +a1|s2110|s6000|k3011|a3000|a1000|a2107|a2109|a1107)|"+
            "android.+f8-sup|"+
            "android.*(k080|arc|vox)|"+
            "android.*(msi.+enjoy|enjoy +7|enjoy +10)|"+
            "dropad.+a8|"+
            "android.+c906|"+
            "android.+iberry.+auxus|"+
            "android.+aigopad|"+
            "android.*(airpad|liquid metal)|"+
            "android.+hcl.+tablet|connect-3g-2.0|connect-2g-2.0|me tablet u1|me tablet u2|me tablet g1|me tablet x1|me tablet y2|me tablet sync|"+
            "android.*(a39|a37|a34|st8|st10|st7|smarttab|smart +tab)|"+
            "android.*(micromax.+funbook|funbook|p250|p275|p300|p350|p362|p500|p600)|micromax.*(p250|p275|p350|p362|p500|p600)|funbook|"+
            "android.+penta|"+
            "android.*(celkon.+ct|ct-[0-9])|"+
            "android.+i-buddy|"+
            "android.*(viewbook|viewpad)|"+
            "android.*(v9|zte.+v8110|light tab|light pro|beeline|base.*tab)|"+
            "chagall|"+
            "android.*(vandroid|t3i)|"+
            "android.*(ziio7|ziio10)|"+
            "android.*(v-t100|v-tw100|v-tr200|v-t300)|"+
            "android.+vtab1008|"+
            "bookeen|cybook|"+
            "android.*lifetab_(s9512|p9514|p9516)|"+
            "m702pro|"+
            "irulu-al101|"+
            "pmp3170b|pmp3270b|pmp3470b|pmp7170b|pmp3370b|pmp3570c|pmp5870c|pmp3670b|pmp5570c|pmp5770d|pmp3970b|pmp3870c|pmp5580c|pmp5880d|pmp5780d|pmp5588c|pmp7280c|pmp7280|pmp7880d|pmp5597d|pmp5597|pmp7100d|per3464|per3274|per3574|per3884|per5274|per5474|pmp5097cpro|pmp5097|pmp7380d|pmp5297c|pmp5297c_quad|"+
            "allview.*(viva|alldro|city|speed|all tv|frenzy|quasar|shine|tx1|ax1|ax2)|"+
            "megafon +v9|"+
            "android.+(z7c|z7h|z7s)|"+
            "android.+iball.+slide.+(3g *7271|3g *7334|3g *7307|3g *7316|i7119|i7011)|android.+iball.+i6012|"+
            "navipad|tb-772a|tm-7045|tm-7055|tm-9750|tm-7016|tm-7024|tm-7026|tm-7041|tm-7043|tm-7047|tm-8041|tm-9741|tm-9747|tm-9748|tm-9751|tm-7022|tm-7021|tm-7020|tm-7011|tm-7010|tm-7023|tm-7025|tm-7037w|tm-7038w|tm-7027w|tm-9720|tm-9725|tm-9737w|tm-1020|tm-9738w|tm-9740|tm-9743w|tb-807a|tb-771a|tb-727a|tb-725a|tb-719a|tb-823a|tb-805a|tb-723a|tb-715a|tb-707a|tb-705a|tb-709a|tb-711a|tb-890hd|tb-880hd|tb-790hd|tb-780hd|tb-770hd|tb-721hd|tb-710hd|tb-434hd|tb-860hd|tb-840hd|tb-760hd|tb-750hd|tb-740hd|tb-730hd|tb-722hd|tb-720hd|tb-700hd|tb-500hd|tb-470hd|tb-431hd|tb-430hd|tb-506|tb-504|tb-446|tb-436|tb-416|tb-146se|tb-126se|"+
            "android.*\\bg1\\b|"+
            "tx-a1301|tx-m9002|q702|"+
            "ly-f528|"+
            "android.+dslide.*\\b(700|701r|702|703r|704|802|970|971|972|973|974|1010|1012)\\b|"+
            "m9701|m9000|m9100|m806|m1052|m806|t703|mid701|mid713|mid710|mid727|mid760|mid830|mid728|mid933|mid125|mid810|mid732|mid120|mid930|mid800|mid731|mid900|mid100|mid820|mid735|mid980|mid130|mid833|mid737|mid960|mid135|mid860|mid736|mid140|mid930|mid835|mid733|"+
            "android.*\\b(f-01d|f-05e|f-10d|m532|q572)\\b|"+
            "android.+casiatab8|"+
            "android.+hudl|"+
            "android.*(polaroid.*tablet|pmid1000|pmid10c|pmid800|pmid700|pmid4311|pmid701c|pmid701i|pmid705|pmid706|pmid70dc|pmid70c|pmid720|pmid80c|pmid901|ptab7200|ptab4300|ptab750|midc010|midc407|midc409|midc410|midc497|midc700|midc800|midc801|midc802|midc901)|"+
            "e-boda.+(supreme|impresspeed|izzycomm|essential)|"+
            "hp slate 7|hp elitepad 900|hp-tablet|elitebook.*touch|"+
            "fine7 genius|fine7 shine|fine7 air|fine8 style|fine9 more|fine10 joy|fine11 wide|"+
            "android.*\\b(n10|n10-4core|n78|n79|n83|n90 ii)\\b|"+
            "\\b(pem63|plt1023g|plt1041|plt1044|plt1044g|plt1091|plt4311|plt4311pl|plt4315|plt7030|plt7033|plt7033d|plt7035|plt7035d|plt7044k|plt7045k|plt7045kb|plt7071kg|plt7072|plt7223g|plt7225g|plt7777g|plt7810k|plt7849g|plt7851g|plt7852g|plt8015|plt8031|plt8034|plt8036|plt8080k|plt8082|plt8088|plt8223g|plt8234g|plt8235g|plt8816k|plt9011|plt9045k|plt9233g|plt9735|plt9760g|plt9770g)\\b|"+
            "bq1078|bc1003|bc1077|rk9702|bc9730|bc9001|it9001|bc7008|bc7010|bc708|bc728|bc7012|bc7030|bc7027|bc7026|"+
            "tpc7102|tpc7103|tpc7105|tpc7106|tpc7107|tpc7201|tpc7203|tpc7205|tpc7210|tpc7708|tpc7709|tpc7712|tpc7110|tpc8101|tpc8103|tpc8105|tpc8106|tpc8203|tpc8205|tpc8503|tpc9106|tpc9701|tpc97101|tpc97103|tpc97105|tpc97106|tpc97111|tpc97113|tpc97203|tpc97603|tpc97809|tpc97205|tpc10101|tpc10103|tpc10106|tpc10111|tpc10203|tpc10205|tpc10503|"+
            "android.*(roverpad|rp3wg70)|"+
            "tab-p506|tab-navi-7-3g-m|tab-p517|tab-p-527|tab-p701|tab-p703|tab-p721|tab-p731n|tab-p741|tab-p825|tab-p905|tab-p925|tab-pr945|tab-pl1015|tab-p1025|tab-pi1045|tab-p1325|tab-protab[0-9]+|tab-protab25|tab-protab26|tab-protab27|tab-protab26xl|tab-protab2-ips9|tab-protab30-ips9|tab-protab25xxl|tab-protab26-ips10|tab-protab30-ips10|"+
            "android.*ov-(steelcore|newbase|basecore|baseone|exellen|quattor|edutab|solution|action|basictab|teddytab|magictab|stream|tb-08|tb-09)|"+
            "dps dream 9|dps dual 7|"+
            "v97 hd|i75 3g|visture v4( hd)?|visture v5( hd)?|visture v10|"+
            "ctp(-)?810|ctp(-)?818|ctp(-)?828|ctp(-)?838|ctp(-)?888|ctp(-)?978|ctp(-)?980|ctp(-)?987|ctp(-)?988|ctp(-)?989|"+
            "android.*\\b97d\\b|tablet(?!.*pc)|viewpad7|lg-v909|mid7015|bntv250a|logicpd zoom2|\\ba7eb\\b|catnova8|a1_07|ct704|ct1002|\\bm721\\b|rk30sdk|\\bevotab\\b|smarttabii10|smarttab10"+
            "";

        //Check Main Tablet
        regex = new RegExp(regex_raw_str, "i");
        is_tablet_bool = regex.test(nav);
        switch(true)
        {
            case (is_tablet_bool):
                if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                return true;
                break;
        }

        //Check Android Tablet
        var regex_1_bool = /android/i.test(nav),
            regex_2_bool = !/mobile/i.test(nav),
            pixel_w_int = parseInt(store("rstv_viewportW_dip")),
            pixel_h_int = parseInt(store("rstv_viewportH_dip")),
            pixel_dim_int = (store("rstv_is_portrait")) ? pixel_w_int : pixel_h_int
            ;

        switch(true)
        {
            case (regex_1_bool):
                /**
                 * if tablet has either:
                 * 1. Device independent viewport width between 520px and 800px when in portrait
                 * 2. Device independent viewport height between 520px and 800px when in landscape
                 */
                switch(true)
                {
                    case (isNumber(pixel_dim_int) && (pixel_dim_int >= 520 && pixel_dim_int <= 800)):
                        if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                        return true;
                        break;
                }

                //if user agent is Android but 'mobile' keyword is absent
                switch(true)
                {
                    case (regex_2_bool):
                        if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                        return true;
                        break;
                }

                break;
        }

        //Return false if otherwise
        if(!bypass_storage_bool){ store("rstv_is_tablet", false); }
        return false;
    }

    /**
     * Check if the device is a TV
     * @return {Boolean}
     */
    function isTV()
    {
        //check if TV check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_tv")):
                return store("rstv_is_tv");
                break;
        }

        //get the user agent
        var nav = getUserAgent();

        /**
         * Check for known TVs
         */
        var is_tv_bool = /googletv|smart\-tv|smarttv|internet +tv|netcast|nettv|appletv|boxee|kylo|roku|vizio|dlnadoc|ce\-html|ouya|xbox|playstation *(3|4)|wii/i.test(nav);

        switch(true)
        {
            case (is_tv_bool):
                store("rstv_is_tv", true);
                return true;
                break;
        }

        store("rstv_is_tv", false);
        return false;
    }

    /**
     * Checks if the device is a Personal Computer
     * @return {Boolean}
     */
    function isPC()
    {
        //check if PC check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_pc")):
                return store("rstv_is_pc");
                break;
        }

        switch(true)
        {
            case (isMobile() === false && isTV() === false):
                store("rstv_is_pc", true);
                return true;
                break;
        }

        store("rstv_is_pc", false);
        return false;
    }

    /**
     * Checks if the device is a mobile device
     * @return {Boolean}
     */
    function isMobile()
    {
        //check if device is phone or tablet
        switch(true)
        {
            case (isPhone() || isTablet(true)):
                return true;
                break;

            default:
                return false;
        }
    }

    /**
     * Checks if the device is a non-mobile device
     * @return {Boolean}
     */
    function isNonMobile()
    {
        //check if device is not phone or mobile
        switch(true)
        {
            case (!isMobile()):
                return true;
                break;

            default:
                return false;
        }
    }

    /**
     * Gets the orientation of the device
     * @param bypass_cache_bool {Boolean} Determines if the stored value for current orientation should be retrieved or not. True will ignore the value stored and will re-test the orientation
     * @return {String}
     */
    function getOrientation()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            bypass_cache_bool = isBool(myArgs[0]) ? myArgs[0] : false,
            ort_final_str;

        //check if current orientation value is stored and bypass_cache_bool is false. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_ort_curr") && !bypass_cache_bool):
                return store("rstv_ort_curr");
                break;
        }

        //Reset Viewport Dimensions if bypass_cache_bool is true
        switch(true)
        {
            case (bypass_cache_bool):
                store("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH", null);
                break;
        }

        //Get the Viewport Dimensions
        var device_user_agent_str = getUserAgent(),
            is_opera_mini_bool = /opera.+(mini|mobi)/i.test(device_user_agent_str),
            viewport_w_int = viewportW(),
            viewport_h_int = viewportH(),
            screen_w_int = screenW(),
            screen_h_int = screenH(),
            screen_w_to_h_ratio_int = screen_w_int/screen_h_int,
            screen_w_to_viewport_w_diff_int = screen_w_int - viewport_w_int,
            is_landscape_extended_verify_bool,
            is_landscape_bool;

        screen_w_to_viewport_w_diff_int = Math.abs(screen_w_to_viewport_w_diff_int);
        is_landscape_extended_verify_bool = (is_opera_mini_bool && viewport_w_int < 260) ? ((screen_w_to_viewport_w_diff_int <= 4) && (screen_w_to_h_ratio_int >= 1) ? true : false) : true;
        is_landscape_bool = !!((viewport_h_int <= viewport_w_int) && is_landscape_extended_verify_bool);

        switch(true)
        {
            case (is_landscape_bool):
                //landscape
                ort_final_str = 'landscape';

                //do not alter cached orientation variables if bypass_cache_bool is true
                switch(true)
                {
                    case (!bypass_cache_bool):
                        store("rstv_is_portrait", false);
                        store("rstv_is_landscape", true);
                        break;
                }

                break;

            default:
                //portrait
                ort_final_str = 'portrait';

                //do not alter cached orientation variables if bypass_cache_bool is true
                switch(true)
                {
                    case (!bypass_cache_bool):
                        store("rstv_is_portrait", true);
                        store("rstv_is_landscape", false);
                        break;
                }
        }

        return ort_final_str;
    }

    /**
     * Resets/Updates the cached values (localStorage) of Orientation Info
     * @private
     */
    function _updateOrientationStore()
    {
        //reset
        store("rstv_ort_curr rstv_is_portrait rstv_is_landscape", null);

        //reload
        store("rstv_ort_curr", getOrientation());
    }

    /**
     * Checks if the device is currently in Portrait mode
     * @return {Boolean}
     */
    function isPortrait()
    {
        //check if portrait orientation value is stored. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_portrait")):
                return store("rstv_is_portrait");
                break;
        }
        return !!((getOrientation() == 'portrait'));
    }

    /**
     * Checks if the device is currently in Landscape mode
     * @return {Boolean}
     */
    function isLandscape()
    {
        //check if landscape orientation value is stored. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_landscape")):
                return store("rstv_is_landscape");
                break;
        }
        return !!((getOrientation() == 'landscape'));
    }

    /**
     * Gets the Standard Display Resolution of the given device
     * @return {String}
     */
    function getResolution()
    {
        var is_landscape_bool = isLandscape(),
            screen_w = screenW(),
            screen_h = screenH(),
            std_w_arr = (is_landscape_bool) ? _getResolutionDimensionList('h') :_getResolutionDimensionList('w'),
            std_h_arr = (is_landscape_bool) ? _getResolutionDimensionList('w'): _getResolutionDimensionList('h'),
            screen_w_std = getClosestNumberMatchArray(std_w_arr, screen_w),
            screen_h_std = getClosestNumberMatchArray(std_h_arr, screen_h),
            screen_res_str,
            screen_res_matrix_arr = _getResolutionMatrix(),
            screen_res_name_str
            ;

        switch(true)
        {
            case (screen_w_std >= screen_h_std):
                screen_res_str = screen_h_std+'_'+screen_w_std;
                break;

            default:
                screen_res_str = screen_w_std+'_'+screen_h_std;
        }

        screen_res_name_str = array_search(screen_res_str, screen_res_matrix_arr);

        return screen_res_name_str;
    }

    /**
     * Composes and Saves a List of Standard Graphic Resolutions
     * @return {Array}
     * @private
     */
    function _getResolutionList()
    {
        //Check if Resolution List is Stored
        switch(true)
        {
            case (isStorageValueSet("rstv_is_cache_res_list")):
                return store("rstv_cache_res_list");
                break;
        }

        var $res_arr = [
            'qqvga', 'qqvgax1', 'hqvga', 'hqvgax1', 'hqvgax2', 'hvgax1', 'qvga', 'wqvga', 'wqvga1', 'hvga',
            'hvga1', 'hvga2', 'hvga3', 'hvgax1', 'hvgax2', 'vga', 'wvga', 'wvgax1', 'fwvga', 'svga',
            'dvga', 'dvgax1', 'wsvga', 'wsvga1', 'xga', 'wxga', 'wxga1', 'wxga2', 'wxga3', 'wxga4', 'wxga5',
            'xga+', 'wxga+', 'sxga', 'sxga+', 'wsxga+', 'uxga', 'wuxga', 'qwxga', 'qxga', 'wqxga',
            'qsxga', 'wqsxga', 'quxga', 'wquxga', 'hxga', 'whxga', 'hsxga', 'whsxga', 'huxga', 'whuxga',
            'nhd', 'nhdx1', 'qhd', 'hd', '720p', 'fhd', '1080p', '1080i', 'wqhd', 'mbprhd', '4kuhd', '8kuhd'
        ];

        store("rstv_is_cache_res_list", true);
        store("rstv_cache_res_list", $res_arr);
        return $res_arr;
    }

    /**
     * Composes and Saves a Resolution Matrix (Resolution to Dimensions)
     * @return {Array|Object}
     * @private
     */
    function _getResolutionMatrix()
    {
        //Check if Resolution Matrix is Stored
        switch(true)
        {
            case (isStorageValueSet("rstv_is_cache_res_matrix")):
                return store("rstv_cache_res_matrix");
                break;
        }

        var $res_matrix_arr = {
            'qqvga': '120_160', 'qqvgax1': '128_160', 'hqvga': '160_240', 'hqvgax1': '240_240', 'hqvgax2': '240_260',
            'qvga': '240_320', 'wqvga': '240_400', 'wqvga1': '240_432', 'hvga': '320_480',
            'hvga1': '360_480', 'hvga2': '272_480', 'hvga3': '240_640', 'hvgax1': '200_640', 'hvgax2': '300_640',
            'hvgax3': '360_400',
            'vga': '480_640', 'wvga': '480_800', 'wvgax1': '352_800', 'fwvga': '480_854', 'svga': '600_800',
            'dvga': '640_960', 'dvgax1': '640_1136', 'wsvga': '576_1024', 'wsvga1': '600_1024', 'xga': '768_1024',
            'wxga': '768_1280', 'wxga1': '720_1280', 'wxga2': '800_1280', 'wxga3': '768_1360', 'wxga4': '768_1366',
            'wxga5': '720_720',
            'xga+': '864_1152', 'wxga+': '900_1440', 'sxga': '1024_1280', 'sxga+': '1050_1400', 'wsxga+': '1050_1680',
            'uxga': '1200_1600', 'wuxga': '1200_1920', 'qwxga': '1152_2048', 'qxga': '1536_2048', 'wqxga': '1600_2560',
            'wqxga+': '1800_3200',
            'qsxga': '2048_2560', 'wqsxga': '2048_3200', 'quxga': '2400_3200', 'wquxga': '2400_3840', 'hxga': '3072_4096',
            'whxga': '3200_5120', 'hsxga': '4096_5120', 'whsxga': '4096_6400', 'huxga': '4800_6400', 'whuxga': '4800_7680',
            'nhd': '360_640', 'nhdx1': '320_640', 'qhd': '540_960', 'hd': '720_1280', '720p': '720_1280', 'fhd': '1080_1920',
            '1080p': '1080_1920', '1080i': '1080_1920', 'wqhd': '1440_2560', 'mbprhd': '1800_2880', '4kuhd': '2160_3840',
            '8kuhd': '4320_7680'
        };

        store("rstv_is_cache_res_matrix", true);
        store("rstv_cache_res_matrix", $res_matrix_arr);
        return $res_matrix_arr;
    }

    /**
     * Converts various types of breakpoints into pixel breakpoints
     * It converts 'Device' and 'Resolution' breakpoints
     * @param bp_arr {Array} The breakpoints you define
     * @param bp_class_arr {Array} The names of CSS classes paired with breakpoints
     * @return {Array}
     * @private
     */
    function _toViewportBreakpoints(bp_arr, bp_class_arr)
    {
        try{
            //Create local variables
            var bp_attrib_arr = [],
                list_dev_arr,
                list_res_arr,
                matrix_dev_arr,
                matrix_res_arr,
                ort_marker_str = '',
                ort_marker_key_str = '',
                error_marker_str = '',
                bp_temp_w_arr = [],
                bp_item_w_temp_int = '',
                bp_temp_h_arr = [],
                bp_item_h_temp_int = '',
                bp_temp_type_arr = [],
                bp_ort_marker_temp_arr = [],
                bp_final_arr = [],
                bp_item_temp_str,
                bp_item_res_temp_str,
                bp_item_final_str,
                bp_item_v_temp_str,
                bp_item_v_temp_arr = [],
                is_class_def_bool = false,
                is_attrib_def_bool = false;

            //Create variables for counter functionality
            var counter_int = 0,
                counter_alpha_str = '',
                counter_alpha_arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
                    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai',
                    'aj', 'ak', 'al', 'am', 'an', 'ao', 'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax'
                ],
                counter_alpha_pre_arr = [],
                counter_alpha_post_arr = [],
                bp_arr_count_int = count(bp_arr),
                bp_class_arr_count_int = count(bp_class_arr),
                bp_attrib_arr_count_int = count(bp_attrib_arr),
                bp_item_w_temp_final_int,
                bp_item_h_temp_final_int;

            //check that value in argument is array and is not empty
            switch(true)
            {
                case (!isArray(bp_arr)):
                    throw new Error ("The first argument must be an array!");
                    break;

                case (isArray(bp_arr) && bp_arr_count_int == 0):
                    throw new Error ("The first argument must not be empty!");
                    break;
            }

            //Check that only either classes or attributes are defined
            switch(true)
            {
                case ((bp_class_arr_count_int > 0) && (bp_attrib_arr_count_int > 0)):
                    throw new Error("You can only define either 'Classes' or 'Attributes' settings!");
                    break;
            }

            //If classes are defined, ensure they correspond with the number of breakpoints defined
            switch(true)
            {
                case (bp_class_arr_count_int > 0):
                    //classes are defined
                    is_class_def_bool = true;
                    switch(true)
                    {
                        case (bp_class_arr_count_int !== bp_arr_count_int):
                            throw new Error ("The number items for 'Breakpoints' and 'Classes' settings must match");
                            break;
                    }
                    break;
            }

            //If attributes are defined, ensure they correspond with the number of breakpoints defined
            switch(true)
            {
                case (bp_attrib_arr_count_int > 0):
                    //attributes are defined
                    is_attrib_def_bool = true;
                    switch(true)
                    {
                        case (bp_attrib_arr_count_int !== bp_arr_count_int):
                            throw new Error ("The number items for 'Breakpoints' and 'Attributes' settings must match");
                            break;
                    }
                    break;
            }

            //Get Breakpoint Reference Data
            list_res_arr = _getResolutionList();
            matrix_res_arr = _getResolutionMatrix();

            //iterate over the breakpoints provided
            for(var i = 0; i < bp_arr_count_int; i++)
            {
                bp_item_temp_str = bp_arr[i];

                counter_alpha_str = counter_alpha_arr[i];

                //ensure that the orientation markers are valid i.e. only -p and -l if any
                switch(true)
                {
                    case (/-+/i.test(bp_item_temp_str) && !/^[^-]*-[^-]*$/i.test(bp_item_temp_str)):
                        //error in the way orientation markers are defined
                        error_marker_str += '2';
                        break;
                }

                //find out if there are any resolution markers e.g. -l or -p
                ort_marker_str = '';
                ort_marker_key_str = '';
                switch(true)
                {
                    case (substr_count(bp_item_temp_str, '-p') > 0):
                        ort_marker_str = 'p';
                        ort_marker_key_str = '-p';

                        bp_ort_marker_temp_arr.push('p');
                        break;

                    case (substr_count(bp_item_temp_str, '-l') > 0):
                        ort_marker_str = 'l';
                        ort_marker_key_str = '-l';

                        bp_ort_marker_temp_arr.push('l');
                        break;

                    default:
                        bp_ort_marker_temp_arr.push('x');
                }

                //reset the breakpoint i.e. remove any resolution markers
                bp_item_final_str = bp_item_temp_str.replace(''+ort_marker_key_str+'', '');

                //find out which class of breakpoint i.e. viewport, device, or resolution
                switch(true)
                {
                    case (in_array(bp_item_final_str, list_res_arr)):
                        //is resolution breakpoint. Get viewport dimensions
                        bp_item_v_temp_str = matrix_res_arr[''+bp_item_final_str+''];

                        bp_item_v_temp_arr = arrayToInteger(explode('_', bp_item_v_temp_str));

                        bp_item_w_temp_int = parseInt(bp_item_v_temp_arr[0]);
                        bp_item_h_temp_int = parseInt(bp_item_v_temp_arr[1]);

                        //consider landscape orientation markers
                        bp_item_w_temp_final_int = bp_item_w_temp_int;
                        bp_item_h_temp_final_int = bp_item_h_temp_int;
                        switch(true)
                        {
                            case (ort_marker_str == 'l'):
                                bp_item_w_temp_final_int = bp_item_h_temp_int;
                                bp_item_h_temp_final_int = bp_item_w_temp_int;
                                break;
                        }

                        bp_temp_w_arr[counter_alpha_str] = bp_item_w_temp_final_int;
                        bp_temp_h_arr[counter_alpha_str] = bp_item_h_temp_final_int;

                        //set breakpoint type as resolution
                        bp_temp_type_arr.push('r');

                        break;

                    case (/[0-9]+/i.test(bp_item_final_str)):
                        //is viewport breakpoint
                        bp_temp_w_arr[counter_alpha_str] = parseInt(bp_item_final_str);
                        bp_temp_h_arr[counter_alpha_str] = parseInt(bp_item_final_str);

                        //set breakpoint type as viewport
                        bp_temp_type_arr.push('v');
                        break;

                    default:
                        //mark error
                        error_marker_str += '1';
                }

                counter_alpha_pre_arr.push(counter_alpha_str);

                counter_int++;
            }

            //check if there are any errors. If yes, throw error
            switch(true)
            {
                case (/[1]+/i.test(error_marker_str)):
                    throw new Error("There are errors in your 'Breakpoints' settings!");
                    break;

                case (/[2]+/i.test(error_marker_str)):
                    throw new Error("There are errors in your 'Breakpoints' settings with regard to the way you have defined orientation markers e.g. -p or -l!");
                    break;
            }

            //compose breakpoints
            var cmp = function ($a, $b) {
                if ($a == $b) {
                    return 0;
                }
                return ($a < $b) ? -1 : 1;
            };

            var bp_temp_w_sort_arr = [],
                bp_temp_h_sort_arr = [],
                bp_temp_w_sort_int,
                bp_temp_w_sort_juxta_key_int,
                bp_type_arr = [],
                bp_temp_ort_sort_arr = [],
                bp_temp_class_arr = [],
                bp_temp_pre_attrib_arr = [],
                bp_temp_attrib_arr = [];

            //reformat attribute array
            bp_temp_pre_attrib_arr = bp_attrib_arr;

            //sort viewport width breakpoints
            bp_temp_w_sort_arr = uasort(bp_temp_w_arr, cmp);

            //sort other arrays in an identical fashion to viewport width breakpoints
            counter_alpha_post_arr = array_keys(bp_temp_w_sort_arr);

            var bp_temp_w_sort_arr_size_int = count(bp_temp_w_sort_arr);
            for(var i = 0; i < bp_temp_w_sort_arr_size_int; i++)
            {
                bp_temp_w_sort_int = counter_alpha_post_arr[i];
                bp_temp_w_sort_juxta_key_int = array_search(bp_temp_w_sort_int, counter_alpha_pre_arr);

                //sort breakpoint heights array
                bp_temp_h_sort_arr[bp_temp_w_sort_int] = bp_temp_h_arr[bp_temp_w_sort_int];

                //sort breakpoint type array
                bp_type_arr[i] = bp_temp_type_arr[bp_temp_w_sort_juxta_key_int];

                //sort the orientation marker array
                bp_temp_ort_sort_arr[i] = bp_ort_marker_temp_arr[bp_temp_w_sort_juxta_key_int];

                //sort the classes array
                bp_temp_class_arr[i] = bp_class_arr[bp_temp_w_sort_juxta_key_int];

                //sort the attributes array
                bp_temp_attrib_arr[i] = bp_temp_pre_attrib_arr[bp_temp_w_sort_juxta_key_int];
            }

            //Save Primary Results Data to Array
            bp_final_arr["bp_w"] = implode('|', bp_temp_w_sort_arr);                //width
            bp_final_arr["bp_h"] = implode('|', bp_temp_h_sort_arr);                //height
            bp_final_arr["bp_o"] = implode('|', bp_temp_ort_sort_arr);              //orientation
            bp_final_arr["bp_t"] = implode('|', bp_type_arr);                       //type

            //add data for classes if defined
            switch(true)
            {
                case (is_class_def_bool):
                    var c_str = implode('|', bp_temp_class_arr);
                    bp_final_arr["bp_c"] = c_str;                   //classes
                    break;
            }

            //add data for attributes if defined
            switch(true)
            {
                case (is_attrib_def_bool):
                    var a_str = implode('|', bp_temp_attrib_arr);
                    bp_final_arr["bp_a"] = a_str;                   //attributes
                    break;
            }

            return bp_final_arr;
        }
        catch(e){
            var e_msg_str = "There was an error: "+ e.message;
            alert(e_msg_str);
        }
    }

    /**
     * Wrapper class for _toViewportBreakpoints
     * @param bp_arr {Array} The list of breakpoints
     * @param bp_class_arr {Array} The corresponding list of classes
     * @return {Array}
     */
    function getBreakpoints(bp_arr, bp_class_arr)
    {
        var data_arr = [];
        data_arr = _toViewportBreakpoints(bp_arr, bp_class_arr);

        return data_arr;
    }

    /**
     * Monitors the viewport for size and orientation changes
     */
    function viewportMonitor()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            trigger_suffix_str = (isNumber(myArgs[0])) ? "_"+myArgs[0]: "";

        var viewport_monit_fn = function(){

            //get viewport info before they are reset in storage
            var viewport_w_prev_int = store("rstv_viewportW"),
                viewport_h_prev_int = store("rstv_viewportH");

            //re-initialize dimension variables
            _initDimensionVars();

            //get current and active and define local variables
            var is_mobile_bool = isMobile(),
                ort_active_str = getOrientation(true),
                ort_curr_str = store("rstv_ort_curr"),
                viewport_w_curr_int,
                viewport_h_curr_int,
                viewport_w_diff_int,
                viewport_w_diff_abs_int,
                viewport_w_diff_pc_int,
                viewport_h_diff_int,
                viewport_h_diff_abs_int,
                viewport_h_diff_pc_int,
                is_softkey_bool = false;

            //Update stored values for dimensions
            _updateDimensionStore();

            /**
             * Perform soft keyboard check
             * This manages for mobile devices that resize the viewport when the soft keyboard is initialized
             * This scenario will sometimes result in a pseudo-orientation change which is unwanted
             */
            switch(true)
            {
                case (is_mobile_bool):
                    viewport_w_curr_int = store("rstv_viewportW");
                    viewport_h_curr_int = store("rstv_viewportH");
                    viewport_w_diff_int = viewport_w_curr_int-viewport_w_prev_int;
                    viewport_h_diff_int = viewport_h_curr_int-viewport_h_prev_int;
                    viewport_w_diff_abs_int = Math.abs(viewport_w_diff_int);
                    viewport_h_diff_abs_int = Math.abs(viewport_h_diff_int);

                    //get the percentage changes in viewport width and height
                    viewport_w_diff_pc_int = (viewport_w_diff_abs_int/viewport_w_prev_int)*100;
                    viewport_h_diff_pc_int = (viewport_h_diff_abs_int/viewport_h_prev_int)*100;

                    switch(true)
                    {
                        case (viewport_w_diff_pc_int < 1):
                            switch(true)
                            {
                                case (viewport_h_diff_pc_int > 35 && viewport_h_diff_int < 0):
                                    //soft keyboard is opening
                                    is_softkey_bool = true;
                                    break;

                                case (viewport_h_diff_pc_int > 35 && viewport_h_diff_int > 0):
                                    //Soft keyboard closing - start
                                    is_softkey_bool = true;
                                    break;

                                case (viewport_h_diff_pc_int > 12 && viewport_h_diff_pc_int <= 35 && viewport_h_diff_int > 0):
                                    //Soft keyboard closing - end
                                    is_softkey_bool = true;
                                    break;

                                case (viewport_h_diff_pc_int == 0):
                                    //No movement - possible Soft keyboard action
                                    is_softkey_bool = true;
                                    break;
                            }
                            break;
                    }
                    break;
            }

            /**
             * Trigger events only if soft keyboard action is not detected
             */
            switch(true)
            {
                case (!is_softkey_bool):
                    switch(true)
                    {
                        case ((ort_curr_str !== ort_active_str)):
                            //orientation has changed. Update stored values for dimensions and orientation
                            _updateOrientationStore();

                            $(window).trigger("change_orientation"+trigger_suffix_str);
                            break;

                        default:
                            /**
                             * Fire resize only for devices that are non-mobile
                             * This eliminates resize callback functionality for mobile devices
                             */
                            switch(true)
                            {
                                case (!is_mobile_bool):
                                    $(window).trigger("resize_viewport"+trigger_suffix_str);
                                    break;
                            }
                    }
                    break;
            }
        };
        resize(viewport_monit_fn);
    }

    /**
     * Monitors a DOM element/container for size changes
     */
    function containerMonitor(elem)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            trigger_suffix_str = (isNumber(myArgs[1])) ? "_"+myArgs[1]: ""
            ;

        var container_monit_fn = function(){
            $(window).trigger("resize_container"+trigger_suffix_str);
        };
        resizeContainer(elem, container_monit_fn);
    }

    /**
     * Attach an event handler for the resize event
     * @param {Function} fn The function to execute
     * @return object
     */
    function resize(fn)
    {
        $win.on('resize', fn);
        return Restive;
    }

    /**
     * Attach an event handler for the resizecontainer event
     * @param {Function} fn The function to execute
     * @return object
     */
    function resizeContainer(el, fn)
    {
        el.on('resizecontainer', fn);
        return Restive;
    }

    //Define Restive Object
    Restive = {
        init: init(),
        reInit: reInit,
        getUserAgent: getUserAgent,
        isStorageValueSet: isStorageValueSet,
        store: store,
        storeVarTracker: storeVarTracker,
        storeVarValidator: storeVarValidator,
        incrementStorageValue: incrementStorageValue,
        getBreakpoints: getBreakpoints,
        viewportW: viewportW,
        viewportH: viewportH,
        screenW: screenW,
        screenH: screenH,
        pixelW: pixelW,
        pixelH: pixelH,
        vSpan: vSpan,
        vPitch: vPitch,
        dSpan: dSpan,
        dPitch: dPitch,
        cSpan: cSpan,
        cPitch: cPitch,
        eSpan: eSpan,
        ePitch: ePitch,
        isRetina: isRetina,
        getPixelRatio: getPixelRatio,
        getPlatform: getPlatform,
        getFormFactor: getFormFactor,
        getOrientation: getOrientation,
        getResolution: getResolution,
        isPortrait: isPortrait,
        isLandscape: isLandscape,
        viewportMonitor: viewportMonitor,
        containerMonitor: containerMonitor,
        isMobile: isMobile,
        isNonMobile: isNonMobile,
        isPhone: isPhone,
        isTablet: isTablet,
        isPC: isPC,
        isTV: isTV,
        isIOS: isIOS,
        isApple: isApple,
        isAndroid: isAndroid,
        isSymbian: isSymbian,
        isBlackberry: isBlackberry,
        isWindows: isWindows,
        isWindowsPhone: isWindowsPhone,
        resize: resize,
        resizeContainer: resizeContainer
    };
    return Restive;

})(window, document, jQuery);

/*
 * Restive.JS Plugin v1.3.0
 * http://restivejs.com
 *
 * Copyright 2013 Obinwanne Hill <https://about.me/obinwanne.hill>
 * Released under MIT License
 */
(function (window, document, $, undefined) {
    //Gets the content of a function
    Function.prototype.getFuncBody = function()
    {
        // Get content between first { and last }
        var m = this.toString().match(/\{([\s\S]*)\}/m)[1];
        // Strip comments
        return m.replace(/^\s*\/\/.*$/mg,'');
    };

    var methods = {
		init : function(options){

			try{

                //Multiple Constructor Manager
                methods._multiConstructorCounter();
                methods._multiConstructorManager();

                //Create plugin variables
                var $options = options,
                    $valid_platform_arr = ['all', 'ios', 'android', 'symbian', 'blackberry', 'windows'],
                    $valid_formfactor_arr = ['all', 'pc', 'tv', 'tablet', 'phone'],
                    $platform_init_str = options.platform,
                    $formfactor_init_str = options.formfactor,
                    responsive_basis_str,
                    is_resp_basis_container_bool,
                    is_multi_start_bool = Restive.store("rstv_multi_start"),
                    rstv_store_multi_counter_int = Restive.store("rstv_multi_count"),
                    is_multi_abort_2_bool = Restive.store("rstv_multi_abort_2");

                //Ensure Platform Values are within range
				switch(true)
				{
					case(in_array($platform_init_str, $valid_platform_arr) === false):
						methods._error('rstv_error_001', '"'+$platform_init_str+'" is not a valid Platform option!');
                        return false;
					    break;
				}

                //Ensure Form Factor Values are within range
                switch(true)
                {
                    case(in_array($formfactor_init_str, $valid_formfactor_arr) === false):
                        methods._error('rstv_error_002', '"'+$formfactor_init_str+'" is not a valid Form Factor option!');
                        return false;
                        break;
                }

                //Abort if endMulti() is not called after startMulti() with multiple constructors
                switch(true)
                {
                    case (is_multi_abort_2_bool):
                        methods._error('rstv_error_003', 'If you are calling the Restive.JS Constructor more than once, you must call $.restive.endMulti() at the end!');
                        return false;
                        break;
                }

                //Get Initial Breakpoints
				var $breakpoints_arr = [],
                    $breakpoints_init_arr = [],
                    $classes_init_arr = [];

                $breakpoints_init_arr = options.breakpoints;
                $classes_init_arr = options.classes;

                $breakpoints_arr = methods.getBreakpoints($breakpoints_init_arr, $classes_init_arr);

                /**
                 * Generate Restive Core Information
                 */
                var $rstv_core_info_arr = [];

                //A1. Get the Device Platform e.g. iOS, Android, etc.
                $rstv_core_info_arr["platform"] = methods.getPlatform();

                //A2. Get the Device Form Factor
                $rstv_core_info_arr["formfactor"] = methods.getFormFactor();

                //A3. Check if Device is a mobile device
                $rstv_core_info_arr["is_mobile"] = methods.isMobile();

                //A4. Get the Device Pixel Ratio
                $rstv_core_info_arr["pixelratio"] = methods.getPixelRatio();

                //A5. Get the Orientation and Set Orientation Marker
                $rstv_core_info_arr["orientation"] = methods.getOrientation();

                //A6. Get the Selector of the Element
                $rstv_core_info_arr["selector"] = getSelector(this);

                //A7. Get the Tag Name of the Element
                $rstv_core_info_arr["tagname"] = this.prop("tagName").toLowerCase();

                //Get the Basis for Responsiveness
                responsive_basis_str = methods._responsiveBasis($options, $rstv_core_info_arr);
                is_resp_basis_container_bool = !!((responsive_basis_str == 'c'));

                //Add Responsive Basis Indicator to Device Core Info
                $rstv_core_info_arr["is_resp_basis_container"] = is_resp_basis_container_bool;

                //Set Event Handlers and Callbacks according to Responsive Basis
                switch(true)
                {
                    case (is_resp_basis_container_bool):
                        methods._containerMonitor($breakpoints_arr, this, $options, $rstv_core_info_arr);
                        break;

                    default:
                        switch(true)
                        {
                            case (!is_multi_start_bool):
                                methods._viewportMonitor($breakpoints_arr, this, $options, $rstv_core_info_arr);
                                methods._callbackManager($options, ['ready', 'init']);
                                break;

                            default:
                                //Store some variables required for later use
                                window.parent.rstv_store.main["rstv_breakpoints_"+rstv_store_multi_counter_int] = $breakpoints_arr;
                                window.parent.rstv_store.main["rstv_this_"+rstv_store_multi_counter_int] = this;
                                window.parent.rstv_store.main["rstv_options_"+rstv_store_multi_counter_int] = $options;
                                window.parent.rstv_store.main["rstv_core_info_"+rstv_store_multi_counter_int] = $rstv_core_info_arr;

                                window.rstv_store.main = window.parent.rstv_store.main;
                        }
                }

                //reset turbo_classes_reflow sessionStorage variable
                Restive.store("rstv_turbo_classes_reflow_status_in", null);

                /**
                 * Manage Breakpoints
                 */
                return this.each(function(){
					var $this = $(this);
                    methods.setBreakpoints($breakpoints_arr, $this, $options, $rstv_core_info_arr);
				});
			}
			catch(e){
				alert(e);
			    console.log(e)/*RemoveLogging:skip*/;
			}	
		},
        _error: function(code, message){
            var error_msg_is_init_bool = !!((String(Restive.store(code+"_init")).toLowerCase() === "true"));
            switch(true)
            {
                case (!error_msg_is_init_bool):
                    Restive.store(code+"_init", true);
                    throw new Error(message);
                    break;
            }
        },
        _callbackManager: function(){

            var myArgs = Array.prototype.slice.call(arguments),
                options = myArgs[0],
                callback_type_arr = myArgs[1],
                $on_func,
                $on_func_body_count
                ;

            //Execute onReady
            switch(true)
            {
                case (in_array('ready', callback_type_arr)):
                    var $on_ready = options.onReady,
                        $on_ready_body_count = options.onReady.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_ready) && ($on_ready_body_count > 0)):
                            //Execute Callback
                            $on_ready();
                            break;
                    }
                break;
            }

            //Resize Callbacks
            switch(true)
            {
                case (in_array('resize', callback_type_arr)):
                    var $on_resize = options.onResize,
                        $on_resize_body_count = options.onResize.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_resize) && ($on_resize_body_count > 0)):
                            //Execute Callback
                            $on_resize();
                            break;
                    }
                    break;
            }

            //PC Force Reflow Callbacks
            switch(true)
            {
                case (in_array('turboclassesreflow', callback_type_arr)):
                    var $reflow_direction_str = callback_type_arr[1],
                        $on_reflow = options.onTurboClassReflow,
                        $on_reflow_body_count = options.onTurboClassReflow.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_reflow) && ($on_reflow_body_count > 0)):
                            //Execute Callback
                            $on_reflow();
                            break;
                    }

                    var $on_reflow_in = options.onTurboClassReflowIn,
                        $on_reflow_in_body_count = options.onTurboClassReflowIn.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_reflow_in) && ($on_reflow_in_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case ($reflow_direction_str == 'in'):
                                    $on_reflow_in();
                                    break;
                            }
                            break;
                    }

                    var $on_reflow_out = options.onTurboClassReflowOut,
                        $on_reflow_out_body_count = options.onTurboClassReflowOut.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_reflow_out) && ($on_reflow_out_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case ($reflow_direction_str == 'out'):
                                    $on_reflow_out();
                                    break;
                            }
                            break;
                    }

                    break;
            }

            //Rotate/Orientation Callbacks
            switch(true)
            {
                case (in_array('rotate', callback_type_arr)):
                    var ort_curr_str = Restive.getOrientation(),
                        $on_rotate = options.onRotate,
                        $on_rotate_body_count = options.onRotate.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_rotate) && ($on_rotate_body_count > 0)):
                            //Execute Callback
                            $on_rotate();
                            break;
                    }

                    //Execute onRotateToP
                    var $on_rotate_to_p = options.onRotateToP,
                        $on_rotate_to_p_body_count = options.onRotateToP.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_rotate_to_p) && ($on_rotate_to_p_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case (ort_curr_str == 'portrait'):
                                    $on_rotate_to_p();
                                    break;
                            }
                            break;
                    }

                    //Execute onRotateToL
                    var $on_rotate_to_l = options.onRotateToL,
                        $on_rotate_to_l_body_count = options.onRotateToL.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_rotate_to_l) && ($on_rotate_to_l_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case (ort_curr_str == 'landscape'):
                                    $on_rotate_to_l();
                                    break;
                            }
                            break;
                    }
                    break;
            }

            //Add/Remove Class Callbacks
            switch(true)
            {
                case (in_array('addclass', callback_type_arr) || in_array('removeclass', callback_type_arr)):
                    var $callback_type_str = callback_type_arr[0],
                        $callback_type_args = callback_type_arr[1],
                        $callback_data_arr = {'addclass': 'onAddClass', 'removeclass': 'onRemoveClass'}
                        ;
                    $on_func = options[$callback_data_arr[''+$callback_type_str+'']];
                    $on_func_body_count = $on_func.getFuncBody().length;

                    switch(true)
                    {
                        case ($.isFunction($on_func) && ($on_func_body_count > 0)):
                            //Execute Callback
                            $on_func($callback_type_args);
                            break;
                    }
                    break;
            }

            //Initialization Callbacks
            switch(true)
            {
                case (in_array('init', callback_type_arr)):
                    switch(true)
                    {
                        case (in_array('init', callback_type_arr)):
                            var callback_name_arr = [
                                'onPortrait', 'onLandscape', 'onRetina', 'onPhone', 'onTablet', 'onPC', 'onTV', 'onIOS', 'onAndroid', 'onSymbian', 'onBlackberry', 'onWindows', 'onWindowsPhone', 'onMobile', 'onNonMobile'
                            ],
                                func_name_arr = [
                                'isPortrait', 'isLandscape', 'isRetina', 'isPhone', 'isTablet', 'isPC', 'isTV', 'isIOS', 'isAndroid', 'isSymbian', 'isBlackberry', 'isWindows', 'isWindowsPhone', 'isMobile', 'isNonMobile'
                            ];

                            for(var i = 0; i < count(func_name_arr); i++)
                            {
                                $on_func = options[callback_name_arr[i]];
                                $on_func_body_count = $on_func.getFuncBody().length;

                                switch(true)
                                {
                                    case ($.isFunction($on_func) && ($on_func_body_count > 0)):
                                        var $on_func_res = methods[func_name_arr[i]],
                                            $on_func_bool = $on_func_res();
                                        switch(true)
                                        {
                                            case ($on_func_bool):
                                                $on_func();
                                                break;
                                        }
                                        break;
                                }
                            }
                            break;
                    }
                    break;
            }
        },
        _URLMonitor: function(){
            //monitor changes from URL to URL
            var $rstv_url_str = Restive.store("rstv_url"),
                $rstv_url_hash_prev_str = Restive.store("rstv_url_hash"),
                $rstv_url_hash_curr_str = md5($rstv_url_str);

            switch(true)
            {
                case ($rstv_url_hash_curr_str != $rstv_url_hash_prev_str):
                    //page has changed
                    Restive.store("rstv_multi_bpm_idx rstv_cache_bpm rstv_cache_bpm_lock rstv_cache_req rstv_cache_bpm_viewport_diff", null);

                    Restive.store("rstv_url_hash", $rstv_url_hash_curr_str);
                    break;
            }
        },
        _responsiveBasis: function($options, $rstv_core_info){
            /**
             * This determines the basis for responsive i.e. viewport or container
             * 1. If anchor option is 'element' and Restive.JS selector is under the body tag, basis is 'container' or 'c'
             * 2. If not 1, basis is 'viewport' or 'v'
             */
            var resp_basis_str,
                selector_name_str = $rstv_core_info["selector"],
                elem_is_id_selector_bool = /^#[^\s]+$/i.test(selector_name_str),
                elem_is_child_of_body_bool = elementIsChildOf('body', selector_name_str),
                anchor_str = $options.anchor
                ;

            try
            {
                switch(true)
                {
                    case (elem_is_child_of_body_bool && (anchor_str == 'element' || anchor_str == 'e')):
                        switch(true)
                        {
                            case (!elem_is_id_selector_bool):
                                throw new Error("You must use only the JQuery ID selector when the 'anchor' option is set to 'e' or 'element'!");
                                break;
                        }
                        resp_basis_str = 'c';
                        break;

                    default:
                        resp_basis_str = 'v';
                        /**
                         * This indicates that at least one Restive.JS constructor has a Responsive Basis of 'viewport'
                         * NOTE: It is ultimately used to prevent the viewport and callback manager from being activated if all Restive.JS constructors are determined to have a 'container' responsiveness basis
                         */
                        Restive.store("rstv_resp_basis_viewport_init", true);
                }

                return resp_basis_str;
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        _viewportMonitor: function($bp_arr, $this, $options, $rstv_core_info){
            //set event handler for resize
            var event_name_resize_str = "resize_viewport",
                event_name_ort_str = "change_orientation";

            //set event handler for viewport resize
            $(window).on(event_name_resize_str, function(){
                methods._onResizeViewport($bp_arr, $this, $options, $rstv_core_info);
            });

            //set event handler for orientation change
            $(window).on(event_name_ort_str, function(){
                methods._onChangeOrientation($bp_arr, $this, $options, $rstv_core_info);
            });

            //activate Viewport Monitor
            Restive.viewportMonitor();
        },
        _containerMonitor: function($bp_arr, $this, $options, $rstv_core_info){
            var event_name_resize_container_str = "resizecontainer"
                ;

            //set event handler for container resize
            $this.on(event_name_resize_container_str, function(){
                methods._onResizeContainer($bp_arr, $this, $options, $rstv_core_info);
            });
        },
        _onResizeViewport: function($bp_arr, $this, $options, $rstv_core_info){
            try{
                return $this.each(function(){
                    var $_this = $(this)
                        ;
                    methods.setBreakpoints($bp_arr, $_this, $options, $rstv_core_info, 'rv');

                    //call resize callbacks
                    methods._callbackManager($options, ['resize']);
                });
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        _onResizeContainer: function($bp_arr, $this, $options, $rstv_core_info){
            try{
                return $this.each(function(){
                    var $_this = $(this)
                        ;
                    methods.setBreakpoints($bp_arr, $_this, $options, $rstv_core_info, 'rc');
                });
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        _onChangeOrientation: function($bp_arr, $this, $options, $rstv_core_info){
            try{
                return $this.each(function(){
                    var $_this = $(this);
                    methods.setBreakpoints($bp_arr, $_this, $options, $rstv_core_info, 'co');

                    //call orientation callbacks
                    methods._callbackManager($options, ['rotate']);
                });
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        getBreakpoints: function(bp_arr, bp_class_arr){
            return Restive.getBreakpoints(bp_arr, bp_class_arr);
        },
        setBreakpoints: function(){

            var myArgs = Array.prototype.slice.call(arguments);
            var bp_arr = myArgs[0],
                elem = myArgs[1],
                rstv_options = myArgs[2],
                rstv_core_info = myArgs[3],
                rstv_event_info = myArgs[4],
                is_ort_change_bool = false,
                is_resize_viewport_bool = false,
                is_resize_container_bool = false,
                is_resp_basis_container_bool = rstv_core_info["is_resp_basis_container"],
                is_multi_abort_1_bool = Restive.store("rstv_multi_abort_1")
            ;

            //Capture orientation change
            switch(true)
            {
                case (rstv_event_info == 'co'):
                    //there has been a change in orientation. manage accordingly
                    is_ort_change_bool = true;
                    break;
            }

            //Capture resize
            switch(true)
            {
                case (rstv_event_info == 'rv'):
                    //the viewport has been resized. manage accordingly
                    is_resize_viewport_bool = true;
                    break;
            }

            //Capture resize container
            switch(true)
            {
                case (rstv_event_info == 'rc'):
                    //the selected container has been resized. manage accordingly
                    is_resize_container_bool = true;
                    break;
            }

            //Abort Restive.JS if multiple constructor anomalies occur
            switch(true)
            {
                case (is_multi_abort_1_bool):
                    methods._error('rstv_error_004', 'If you are calling the Restive.JS Constructor more than once, you must call $.restive.startMulti() before calling these constructors!');
                    return false;
                    break;
            }

            /**
             * When multiple Restive.JS Constructors are used, and a match is found, that match is saved
             * On successive attempts, the breakpoint conditions that previously failed are prevented from being executed further to improve overall performace
             * The following code manages this process
             * NOTE: If the Responsive Basis is 'container', this functionality is ignored
             */
            var rstv_store_is_multi_bool = Restive.store("rstv_multi_start"),
                rstv_store_multi_count_int = parseInt(Restive.store("rstv_multi_count")),
                rstv_store_bpm_idx_int = parseInt(Restive.store("rstv_multi_bpm_idx")),
                rstv_store_bpm_lock_bool = Restive.store("rstv_cache_bpm_lock")
                ;

            switch(true)
            {
                case (!is_resp_basis_container_bool):
                    /**
                     * Do only if Responsive Basis is Viewport
                     */
                    switch(true)
                    {
                        case (rstv_store_is_multi_bool && !is_ort_change_bool && rstv_store_bpm_lock_bool):
                            switch(true)
                            {
                                case (isNumber(rstv_store_multi_count_int) && isNumber(rstv_store_bpm_idx_int) && rstv_store_multi_count_int != rstv_store_bpm_idx_int):
                                    return false;
                                    break;
                            }
                            break;
                    }
                    break;
            }

            //get Device and Orientation Options and Information
            var restive_user_agent_str = Restive.getUserAgent(),
                options_platform_str = rstv_options.platform,
                options_formfactor_str = rstv_options.formfactor,
                options_force_dip_str = rstv_options.force_dip,
                restive_platform_str = rstv_core_info["platform"],
                restive_formfactor_str = rstv_core_info["formfactor"],
                restive_pixelratio_str = rstv_core_info["pixelratio"],
                restive_is_mobile_str = (rstv_core_info["is_mobile"] == true) ? "true": "false",
                ort_init_str = Restive.store("rstv_ort_init"),
                ort_curr_str = Restive.store("rstv_ort_curr"),
                is_portrait_bool = Restive.isPortrait(),
                is_landscape_bool = (is_portrait_bool === true) ? false : true;


            var dim_arr = [],
                viewport_w_int,
                viewport_h_int,
                screen_w_int,
                screen_h_int,
                pixel_w_int,
                pixel_h_int,
                viewport_w_active_int,
                bp_set_arr = [],
                bp_class_arr = [],
                is_class_def_bool = false,
                bp_width_tok_str = bp_arr["bp_w"],
                bp_height_tok_str = bp_arr["bp_h"],
                bp_ort_tok_str = bp_arr["bp_o"],
                bp_type_tok_str = bp_arr["bp_t"],
                bp_class_tok_str = bp_arr["bp_c"],
                bp_width_arr = [],
                bp_height_arr = [],
                bp_ort_arr = [],
                bp_type_arr = [];

            viewport_w_int = Restive.viewportW();
            viewport_w_active_int = viewport_w_int;
            viewport_h_int = Restive.viewportH();
            screen_w_int = Restive.screenW();
            screen_h_int = Restive.screenH();
            pixel_w_int = Restive.pixelW();
            pixel_h_int = Restive.pixelH();

            switch(true)
            {
                case (options_force_dip_str == true):
                    viewport_w_active_int = Restive.pixelW();
                    break;
            }

            //Extract Data to Array
            bp_width_arr = arrayToInteger(explode("|", bp_width_tok_str));
            bp_height_arr = arrayToInteger(explode("|", bp_height_tok_str));
            bp_ort_arr = explode("|", bp_ort_tok_str);
            bp_type_arr = explode("|", bp_type_tok_str);

            //Manage Classes Data
            switch(true)
            {
                case (typeof bp_class_tok_str !== "undefined" || bp_class_tok_str != null):
                    is_class_def_bool = true;
                    bp_class_arr = explode("|", bp_class_tok_str);
                    break;
            }

            var bp_width_arr_has_dupl_bool,
                bp_width_tok_no_dupl_str = '',
                bp_break_on_match_bool,
                bp_width_int,
                bp_width_prev_int,
                bp_width_prev_ort_marker_int,
                is_curr_bp_in_ort_range_bool = true,
                is_prev_bp_in_ort_range_bool = true,
                is_ort_marker_set_init_bool = false,        //this indicates whether orientation markers have been used at least once
                bp_width_start_int,
                bp_width_min_int,
                bp_width_max_int,
                bp_height_int,
                bp_width_diff_r_int,                        //the difference between current viewport width and bp_width_max_int
                bp_width_diff_r_abs_int,                    //the absolute difference between current viewport width and bp_width_max_int
                bp_width_diff_l_int,                        //the difference between current viewport width and bp_width_min_int
                bp_width_diff_r_comp_int,
                bp_type_str,
                bp_ort_str,
                bp_class_str,
                bp_class_last_sel_str,
                span_range_bool,
                ort_range_bool,
                is_breakpoint_match_bool = false,
                is_breakpoint_match_hit_bool = false,
                is_breakpoint_match_os_bool = true,
                is_breakpoint_match_ff_bool = true,
                ba_usage_log_status_str = '',
                ba_usage_log_status_code_str = '',
                elem_set_data_str
                ;

            var bp_width_arr_count_int = count(bp_width_arr);

            //check if there are duplicate width values
            bp_width_arr_has_dupl_bool = arrayHasDuplicates(bp_width_arr);
            bp_break_on_match_bool = (bp_width_arr_has_dupl_bool) ? false : true;

            /**
             * Iterate over individual breakpoints
             */
            for(var i = 0; i < bp_width_arr_count_int; i++)
            {
                /**
                 * Filter for:
                 * 1. platform
                 * 2. form factor
                 * If provided in the options
                 * Break out of for loop
                 */
                //1
                switch(true)
                {
                    case (rstv_options.platform != 'all' && rstv_options.platform != restive_platform_str):
                        is_breakpoint_match_os_bool = false;
                        break;
                }

                //2
                switch(true)
                {
                    case (rstv_options.formfactor != 'all' && rstv_options.formfactor != restive_formfactor_str):
                        is_breakpoint_match_ff_bool = false;
                        break;
                }

                //break out of for loop if match is not found
                if(!is_breakpoint_match_os_bool || !is_breakpoint_match_ff_bool) break;

                var i_prev = i - 1;
                bp_width_int = bp_width_arr[i];

                //manage previous breakpoint widths
                switch(true)
                {
                    case (i > 0):
                        bp_width_prev_int = bp_width_arr[i_prev];
                        break;

                    default:
                        bp_width_prev_int = 0;
                        bp_width_prev_ort_marker_int = 0;
                }

                bp_height_int = bp_height_arr[i];

                bp_type_str = bp_type_arr[i];
                bp_ort_str = bp_ort_arr[i];

                //Consider orientation markers
                is_prev_bp_in_ort_range_bool = is_curr_bp_in_ort_range_bool;
                switch(true)
                {
                    case (bp_ort_str == "p"):
                        ort_range_bool = (is_portrait_bool) ? true : false;
                        is_ort_marker_set_init_bool = true;

                        is_curr_bp_in_ort_range_bool = ort_range_bool;
                        bp_width_tok_no_dupl_str = (is_prev_bp_in_ort_range_bool === false) ? bp_width_prev_ort_marker_int: bp_width_tok_no_dupl_str;
                        break;

                    case (bp_ort_str == "l"):
                        ort_range_bool = (is_landscape_bool) ? true : false;
                        is_ort_marker_set_init_bool = true;

                        is_curr_bp_in_ort_range_bool = ort_range_bool;
                        bp_width_tok_no_dupl_str = (is_prev_bp_in_ort_range_bool === false) ? bp_width_prev_ort_marker_int: bp_width_tok_no_dupl_str;
                        break;

                    default:
                        /**
                         * If is_prev_bp_in_ort_range_bool is false, it means that the previous breakpoint
                         * had an orientation marker ('-p' or '-l') that did not match the current
                         * orientation of the viewport.
                         * And if is_ort_marker_set_init_bool is true, then there has been a transition from a
                         * breakpoint with an orientation marker to one without one.
                         */
                        bp_width_tok_no_dupl_str = (is_ort_marker_set_init_bool === true && is_prev_bp_in_ort_range_bool === false) ? bp_width_prev_ort_marker_int: bp_width_tok_no_dupl_str;

                        bp_width_prev_ort_marker_int = (i > 0) ? bp_width_int: 0;
                        ort_range_bool = true;
                        is_curr_bp_in_ort_range_bool = ort_range_bool;
                }

                //Manage duplicate entries
                switch(true)
                {
                    case (i == 0):
                        bp_width_start_int = 0;
                        bp_width_tok_no_dupl_str = bp_width_int;
                        break;

                    case (i >= 1):

                        switch(true)
                        {
                            case (bp_width_int !== bp_width_prev_int):
                                bp_width_tok_no_dupl_str = bp_width_int+'-!'+bp_width_tok_no_dupl_str;
                                break;
                        }

                        bp_width_start_int = parseInt(getValueAfterExplode(bp_width_tok_no_dupl_str, '-!', 1));

                        break;
                }

                //Define classes
                bp_class_str = bp_class_arr[i];

                //set ranges for widths
                switch(true)
                {
                    case (i == 0):
                        bp_width_min_int = bp_width_start_int;
                        bp_width_max_int = bp_width_int;

                        break;

                    default:
                        bp_width_min_int = (bp_width_start_int == 0) ? bp_width_start_int : bp_width_start_int + 1;
                        bp_width_max_int = bp_width_int;
                }

                /**
                 * Check for Matching Breakpoints
                 * 1. Do for Container Basis
                 * 2. Do for Viewport Basis. Make sure to consider force_dip option
                 */
                switch(true)
                {
                    case (is_resp_basis_container_bool):
                        //1
                        span_range_bool = Restive.eSpan(bp_width_min_int, bp_width_max_int, elem, rstv_options.anchor_e_df, rstv_options.force_dip);
                        break;

                    default:
                        //2
                        span_range_bool = (options_force_dip_str == true) ? Restive.cSpan(bp_width_min_int, bp_width_max_int): Restive.vSpan(bp_width_min_int, bp_width_max_int);
                }

                /**
                 * Set Breakpoints
                 * A. For Container Basis
                 *
                 * B. For Viewport Basis
                 * Status codes as follows:
                 * 1: Viewport matched breakpoint with clean hit on initialization i.e. viewport is virtually identical to breakpoint
                 * 2: Viewport matched breakpoint with clean hit after orientation change
                 * 3: Viewport matched breakpoint but not with a clean hit i.e. margin between viewport width and upper limit of matched breakpoint range is significant
                 * 4: Viewport matched breakpoint after orientation change but not with a clean hit i.e. margin between viewport width and upper limit of matched breakpoint range is significant
                 */
                switch(true)
                {
                    case (span_range_bool && ort_range_bool):

                        switch(true)
                        {
                            case (is_resp_basis_container_bool):
                                //A
                                is_breakpoint_match_bool = true;
                                break;

                            default:
                                //B
                                bp_width_diff_r_int = bp_width_max_int - viewport_w_active_int;
                                bp_width_diff_r_abs_int = Math.abs(bp_width_diff_r_int);
                                bp_width_diff_l_int = viewport_w_active_int - bp_width_min_int;

                                bp_width_diff_r_comp_int = bp_width_max_int*0.1;
                                bp_width_diff_r_comp_int = Math.round(bp_width_diff_r_comp_int);

                                switch(true)
                                {
                                    case (is_ort_change_bool):
                                        //capture some key metrics
                                        switch(true)
                                        {
                                            case (bp_width_diff_r_int > bp_width_diff_r_comp_int):
                                                ba_usage_log_status_code_str = "4";
                                                break;

                                            default:
                                                ba_usage_log_status_code_str = "2";
                                        }
                                        break;

                                    default:
                                        //capture some key metrics
                                        switch(true)
                                        {
                                            case (bp_width_diff_r_int > bp_width_diff_r_comp_int):
                                                ba_usage_log_status_code_str = "3";
                                                break;

                                            default:
                                                ba_usage_log_status_code_str = "1";
                                        }
                                }

                                is_breakpoint_match_bool = true;

                                //Capture class values of last hit
                                switch(true)
                                {
                                    case (is_breakpoint_match_bool):
                                        is_breakpoint_match_hit_bool = true;

                                        bp_class_last_sel_str = bp_class_str;

                                        switch(true)
                                        {
                                            case (bp_ort_str != "x"):
                                                bp_break_on_match_bool = true;
                                                break;
                                        }
                                        break;
                                }
                        }

                        break;

                    default:
                        is_breakpoint_match_bool = false;
                }

                //break out of for loop if match is found
                if(is_breakpoint_match_bool && bp_break_on_match_bool) break;
            }

            //Perform adjustment of breakpoint match value to compensate for if bp_break_on_match_bool is false
            switch(true)
            {
                case (is_breakpoint_match_hit_bool):
                    is_breakpoint_match_bool = true;
                    bp_class_str = bp_class_last_sel_str;
                    break;
            }

            //Some Breakpoint Advisory Information
            switch(true)
            {
                case (!is_breakpoint_match_bool):

                    //Do for Container Basis
                    switch(true)
                    {
                        case (is_resp_basis_container_bool):
                            methods.unsetElementDOM(elem, rstv_options);
                            return;
                            break;
                    }

                    //Do for Viewport Basis
                    bp_width_min_int = 0;
                    bp_width_max_int = 0;

                    switch(true)
                    {
                        case (!Restive.store("rstv_multi_start") || is_ort_change_bool):
                            methods.unsetElementDOM(elem, rstv_options);
                            break;
                    }

                    switch(true)
                    {
                        case (!is_breakpoint_match_os_bool && is_breakpoint_match_ff_bool):
                            ba_usage_log_status_code_str = "7";
                            break;

                        case (!is_breakpoint_match_ff_bool && is_breakpoint_match_os_bool):
                            ba_usage_log_status_code_str = "8";
                            break;

                        case (!is_breakpoint_match_ff_bool && !is_breakpoint_match_os_bool):
                            ba_usage_log_status_code_str = "9";
                            break;

                        default:
                            switch(true)
                            {
                                case (is_ort_change_bool):
                                    ba_usage_log_status_code_str = "6";
                                    break;

                                default:
                                    ba_usage_log_status_code_str = "5";
                            }
                    }

                    //Add Turbo Classes if any
                    elem_set_data_str = methods._addTurboClasses('', rstv_options.turbo_classes);

                    //This if for turbo_classes_reflow option
                    elem_set_data_str = methods._addTurboClassesReflow(elem_set_data_str, rstv_options);

                    methods.setElementDOM(elem, elem_set_data_str, rstv_options);

                    //persist
                    Restive.store("rstv_breakpoint_match_curr", false);

                    break;

                case (is_breakpoint_match_bool):
                    elem_set_data_str = methods._addTurboClasses(bp_class_str, rstv_options.turbo_classes);

                    //This if for turbo_classes_reflow option
                    elem_set_data_str = methods._addTurboClassesReflow(elem_set_data_str, rstv_options);

                    /**
                     * Set class
                     */
                    //Do for Container Basis
                    switch(true)
                    {
                        case (is_resp_basis_container_bool):
                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                            return;
                            break;
                    }

                    //Do for Viewport Basis
                    switch(true)
                    {
                        case (Restive.store("rstv_multi_start")):
                            var bpm_h_counter_int = parseInt(Restive.store("rstv_bpm_h_counter"));
                            switch(true)
                            {
                                case (is_ort_change_bool):
                                    //change in orientation
                                    methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                                    break;

                                default:
                                    //initialization
                                    switch(true)
                                    {
                                        case (bpm_h_counter_int > 1):
                                            //check if the current viewport offers a better match
                                            var ss_bp_width_diff_r_abs_int = parseInt(Restive.store("rstv_cache_bpm_viewport_diff"));

                                            switch(true)
                                            {
                                                case (bp_width_diff_r_abs_int < ss_bp_width_diff_r_abs_int):
                                                    //this is a better viewport match
                                                    methods.setElementDOM(elem, elem_set_data_str, rstv_options);

                                                    switch(true)
                                                    {
                                                        case(!rstv_store_bpm_lock_bool):
                                                            Restive.store("rstv_multi_bpm_idx", rstv_store_multi_count_int);
                                                            break;
                                                    }

                                                    Restive.store("rstv_cache_bpm_viewport_diff", bp_width_diff_r_abs_int);
                                                    break;
                                            }

                                            break;

                                        default:
                                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                                            switch(true)
                                            {
                                                case(!rstv_store_bpm_lock_bool):
                                                    Restive.store("rstv_multi_bpm_idx", rstv_store_multi_count_int);
                                                    break;
                                            }

                                            Restive.store("rstv_cache_bpm_viewport_diff", bp_width_diff_r_abs_int);
                                    }

                                    bpm_h_counter_int++;
                                    Restive.store("rstv_bpm_h_counter", bpm_h_counter_int, '', {expires: 1000});
                            }

                            break;

                        default:
                            //Set the element class immediately
                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                    }

                    //persist
                    Restive.store("rstv_breakpoint_match_curr", true);
                    break;
            }

            /**
             * Track Breakpoint Hits and Misses in Storage
             * Do this incrementally when:
             * 1. Multi-Constructor Mode is active
             * 2. There has not been a change in orientation
             * 3. Breakpoint Match Cache Lock is not set
             * NOTE: For Multi-constructor Operations only
             */
            var rstv_cache_bpm_lock_bool = Restive.store("rstv_cache_bpm_lock");
            switch(true)
            {
                case (rstv_store_is_multi_bool && !is_ort_change_bool && !((isString(rstv_cache_bpm_lock_bool) && rstv_cache_bpm_lock_bool != "") || isBool(rstv_cache_bpm_lock_bool))):
                    (Restive.store("rstv_breakpoint_match_curr")) ? methods._extVarTracker("rstv_cache_bpm", "h", "ls", false, '', false): methods._extVarTracker("rstv_cache_bpm", "m", "ls", false, '', false);
                    break;
            }

            //Exit for Matched Breakpoint
            switch(true)
            {
                case (is_breakpoint_match_bool):
                    return true;
                    break;
            }

            return false;
		},
        _addTurboClassesReflow: function(class_data_str, options){
            switch(true)
            {
                case (methods.isPC()):
                    //only do for Personal Computer environments

                    switch(true)
                    {
                        case (options.turbo_classes_reflow && isString(options.turbo_classes) && options.turbo_classes != ''):
                            //only do if turbo_classes_reflow option is true and turbo_classes are populated

                            var opt_isset_is_mobile_bool,
                                fpr_span_range_tomobile_bool,
                                fpr_span_range_tophone_bool,
                                fpr_span_range_totablet_bool,
                                fpr_limits_tablet_int,
                                fpr_limits_phone_int,
                                fpr_limits_bp_btw_phone_and_tablet_int,
                                fpr_test_key_str,
                                fpr_test_value_str,
                                fpr_limits_arr = [],
                                turbo_classes_arr = [],
                                fpr_final_data_str = class_data_str,
                                is_turbo_classes_reflow_match_bool = false,
                                is_turbo_classes_reflow_status_bool = Restive.store('rstv_turbo_classes_reflow_status_in')
                                ;

                            //get the turbo_classes_reflow_limits values
                            fpr_limits_arr = explode(',', options.turbo_classes_reflow_limits);
                            fpr_limits_phone_int = parseInt(fpr_limits_arr[0]);
                            fpr_limits_tablet_int = parseInt(fpr_limits_arr[1]);

                            //ensure is_mobile turbo_classes parameter
                            opt_isset_is_mobile_bool = /is_mobile=/i.test(options.turbo_classes);
                            switch(true)
                            {
                                case (opt_isset_is_mobile_bool):
                                    //iterate over all provided turbo_classes
                                    turbo_classes_arr = explode(',', options.turbo_classes);
                                    for(var j = 0; j < count(turbo_classes_arr); j++)
                                    {
                                        fpr_test_key_str = getValueAfterExplode(turbo_classes_arr[j], "=", 0);
                                        fpr_test_value_str = getValueAfterExplode(turbo_classes_arr[j], "=", 1);

                                        switch(true)
                                        {
                                            case (fpr_test_key_str == 'is_mobile'):
                                                fpr_span_range_tomobile_bool = (options.force_dip == true) ? Restive.cSpan(0, fpr_limits_tablet_int): Restive.vSpan(0, fpr_limits_tablet_int);

                                                switch(true)
                                                {
                                                    case (fpr_span_range_tomobile_bool):

                                                        fpr_final_data_str += ' '+fpr_test_value_str;
                                                        is_turbo_classes_reflow_match_bool = true;
                                                        switch(true)
                                                        {
                                                            case (!is_turbo_classes_reflow_status_bool && is_turbo_classes_reflow_match_bool):
                                                                Restive.store('rstv_turbo_classes_reflow_status_in', true);

                                                                //add callback
                                                                methods._callbackManager(options, ['turboclassesreflow', 'in']);

                                                                break;
                                                        }

                                                        break;

                                                    default:
                                                        is_turbo_classes_reflow_match_bool = false;
                                                        switch(true)
                                                        {
                                                            case (is_turbo_classes_reflow_status_bool && !is_turbo_classes_reflow_match_bool):
                                                                Restive.store('rstv_turbo_classes_reflow_status_in', false);

                                                                //add callback
                                                                methods._callbackManager(options, ['turboclassesreflow', 'out']);

                                                                break;
                                                        }
                                                }

                                                break;
                                        }

                                        switch(true)
                                        {
                                            case (fpr_test_key_str == 'is_phone'):
                                                fpr_span_range_tophone_bool = (options.force_dip == true) ? Restive.cSpan(0, fpr_limits_phone_int): Restive.vSpan(0, fpr_limits_phone_int);

                                                fpr_final_data_str = (fpr_span_range_tophone_bool) ? fpr_final_data_str + ' ' + fpr_test_value_str: fpr_final_data_str;
                                                break;
                                        }

                                        switch(true)
                                        {
                                            case (fpr_test_key_str == 'is_tablet'):
                                                fpr_limits_bp_btw_phone_and_tablet_int = fpr_limits_phone_int + 1;
                                                fpr_span_range_totablet_bool = (options.force_dip == true) ? Restive.cSpan(fpr_limits_bp_btw_phone_and_tablet_int, fpr_limits_tablet_int): Restive.vSpan(fpr_limits_bp_btw_phone_and_tablet_int, fpr_limits_tablet_int);
                                                fpr_final_data_str = (fpr_span_range_totablet_bool) ? fpr_final_data_str + ' ' + fpr_test_value_str: fpr_final_data_str;

                                                break;
                                        }

                                    }

                                    return fpr_final_data_str;
                                    break;
                            }
                            break;
                    }
                    break;
            }

            //Restive.store('rstv_turbo_classes_reflow_status_in', false);
            return class_data_str;
        },
        _addTurboClasses: function(class_data_str, opt_turbo_classes){
            //return class name only if power classes info is invalid or empty
            switch(true)
            {
                case (!isString(opt_turbo_classes) || opt_turbo_classes == ''):
                    return class_data_str;
                    break;
            }

            //Define variables
            var opt_pc_arr = [],
                pc_key_str,
                pc_value_str,
                pc_temp_arr = [],
                pc_temp_str = '',
                pc_final_str = '',
                pc_func_arr = {'is_mobile': 'isMobile', 'is_non_mobile': 'isNonMobile', 'is_retina': 'isRetina', 'is_phone': 'isPhone', 'is_tablet': 'isTablet', 'is_tv': 'isTV', 'is_pc': 'isPC', 'is_portrait': 'isPortrait', 'is_landscape': 'isLandscape'},
                pc_func_name_str,
                pc_func_res
                ;

            opt_pc_arr = explode(',', opt_turbo_classes);
            for(var i = 0; i < count(opt_pc_arr); i++)
            {
                pc_key_str = getValueAfterExplode(opt_pc_arr[i], "=", 0);
                pc_value_str = getValueAfterExplode(opt_pc_arr[i], "=", 1);

                pc_func_name_str = pc_func_arr[pc_key_str];
                switch(true)
                {
                    case (isString(pc_func_name_str) && pc_func_name_str != ''):
                        pc_func_res = methods[pc_func_name_str];
                        switch(true)
                        {
                            case (pc_func_res()):
                                pc_temp_arr.push(pc_value_str);
                                break;
                        }
                        break;
                }
            }

            pc_temp_str = implode(' ', pc_temp_arr);
            pc_final_str = (pc_temp_str != '') ? pc_temp_str+' '+class_data_str : class_data_str;
            return pc_final_str;
        },
        setElementDOM: function(elem, elem_set_str, options){
            var data_key_str = md5(getSelector(elem)),
                ds_elem_set_class_name_str = "rstv_bpm_class_"+data_key_str,
                ds_elem_set_str;

            ds_elem_set_str = (isString(Restive.store(ds_elem_set_class_name_str)) && Restive.store(ds_elem_set_class_name_str) != '') ? Restive.store(ds_elem_set_class_name_str): '';
            switch(true)
            {
                case (ds_elem_set_str != ''):
                    elem.removeClass(ds_elem_set_str).addClass(elem_set_str);
                    switch(true)
                    {
                        case (ds_elem_set_str != elem_set_str):
                            methods._callbackManager(options, ['removeclass', ''+ds_elem_set_str+'']);
                            break;
                    }
                    break;

                default:
                    elem.addClass(elem_set_str);
            }
            Restive.store(ds_elem_set_class_name_str, elem_set_str);
            methods._callbackManager(options, ['addclass', ''+elem_set_str+'']);
        },
        unsetElementDOM: function(elem, options){
            var data_key_str = md5(getSelector(elem)),
                ds_elem_set_class_name_str = "rstv_bpm_class_"+data_key_str,
                ds_elem_set_str;

            ds_elem_set_str = (isString(Restive.store(ds_elem_set_class_name_str)) && Restive.store(ds_elem_set_class_name_str) != '') ? Restive.store(ds_elem_set_class_name_str): '';
            elem.removeClass(ds_elem_set_str);

            methods._callbackManager(options, ['removeclass', ''+ds_elem_set_str+'']);
        },
        _extVarTracker: function($track_name_str, $track_value_str)
        {
            var myArgs = Array.prototype.slice.call(arguments);
            var store_type_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2] : 'ck';
            var unique_bool = (isBool(myArgs[3])) ? myArgs[3]: false;
            var expires = (isNumber(myArgs[4]) || isString(myArgs[4])) ? parseInt(myArgs[4]): '';
            var reverse_order_bool = (isBool(myArgs[5])) ? myArgs[5]: true;
            var delim_str = (isString(myArgs[6]) && myArgs[6] != "") ? myArgs[6]: '-!';
            var data_count_int = (isNumber(myArgs[7]) || isString(myArgs[7])) ? parseInt(myArgs[7]): 80;

            return Restive.storeVarTracker($track_name_str, $track_value_str, store_type_str, unique_bool, expires, reverse_order_bool, delim_str, data_count_int);
        },
        _multiConstructorSelectPos: function(){
            var bpm_val_str = Restive.store("rstv_cache_bpm"),
                bpm_val_arr = explode("-!", bpm_val_str),
                bpm_val_temp_str,
                bpm_idx_int = parseInt(Restive.store("rstv_multi_bpm_idx"))
                ;

            bpm_val_temp_str = implode("", bpm_val_arr);

            /**
             * 1. If only one hit is recorded, get it's position
             * 2. If all misses, get the last position i.e. length of string
             * 3. If more than one hit, get the value for the best match previously calculated
             */
            var sel_constructor_pos,
                sel_constructor_pos_1,
                pattern_1 = new RegExp("^[^h]*h[^h]*$", "gi"),
                pattern_2 = new RegExp("^m+$", "gi");

            switch(true)
            {
                case (pattern_1.test(bpm_val_temp_str)):
                    //1
                    sel_constructor_pos = strrpos(bpm_val_temp_str, 'h');
                    break;

                case (pattern_2.test(bpm_val_temp_str)):
                    //2
                    Restive.store("rstv_cache_bpm_all_miss", true, '', {expires: 2000});
                    sel_constructor_pos = strrpos(bpm_val_temp_str, 'm');
                    break;

                case(substr_count(bpm_val_temp_str, "h") > 1):
                    //3
                    sel_constructor_pos = bpm_idx_int - 1;
                    break;
            }
            sel_constructor_pos_1 = sel_constructor_pos + 1;
            Restive.store("rstv_multi_bpm_idx", sel_constructor_pos_1);

            return sel_constructor_pos;
        },
        _multiConstructorManageEvents: function(sel_constructor_pos){
            //Remove any events previously attached
            $(window).off('resize');

            //Manage Viewport Monitoring and Callbacks
            var $sel_pos_final_int = parseInt(sel_constructor_pos) + 1,
                $breakpoints_arr = window.parent.rstv_store.main["rstv_breakpoints_"+$sel_pos_final_int],
                $this = window.parent.rstv_store.main["rstv_this_"+$sel_pos_final_int],
                $options = window.parent.rstv_store.main["rstv_options_"+$sel_pos_final_int],
                $rstv_core_info_arr = window.parent.rstv_store.main["rstv_core_info_"+$sel_pos_final_int]
                ;

            switch(true)
            {
                case (Restive.store("rstv_resp_basis_viewport_init")):
                    methods._viewportMonitor($breakpoints_arr, $this, $options, $rstv_core_info_arr);
                    methods._callbackManager($options, ['ready', 'init']);
                    break;
            }
        },
        _multiConstructorFinalize: function(){

            var sel_constructor_pos = methods._multiConstructorSelectPos();

            //Redo event handlers
            methods._multiConstructorManageEvents(sel_constructor_pos);

            /**
             * Set Breakpoint Match Cache Lock
             * This marks that a Breakpoint Match has been determined (i.e. hit or miss) and as such this result should be stored and reused
             * NOTE: Only used in Multi-Constructor Operations
             */
            Restive.store("rstv_cache_bpm_lock", true);

            //Reset some local storage variables
            Restive.store("rstv_cache_req", null);
            Restive.store("rstv_multi_count", null);
        },
        _multiConstructorStart: function(){
            Restive.store("rstv_multi_count", 0);                 //counts the number of multi-constructor operations
            Restive.store("rstv_multi_start", true);
            Restive.store("rstv_multi_abort_1", false);
            Restive.store("rstv_multi_abort_2", false);

            //set some expiring counters
            Restive.store("rstv_bpm_h_counter", 1, '', {expires: 1000});
            Restive.store("rstv_bpm_m_counter", 1, '', {expires: 1000});

            //set some persistent counters
            switch(true)
            {
                case (!Restive.isStorageValueSet("rstv_multi_start_count")):
                    Restive.store("rstv_multi_start_count", 1);
                    Restive.store("rstv_multi_end", false);
                    break;

                default:
                    Restive.incrementStorageValue("rstv_multi_start_count");
            }
        },
        _multiConstructorManager: function(){
            var is_multi_start_bool = Restive.store("rstv_multi_start"),
                is_multi_end_bool = Restive.store("rstv_multi_end"),
                rstv_count_int = parseInt(Restive.store("rstv_multi_count")),
                rstv_multi_start_count_int = parseInt(Restive.store("rstv_multi_start_count"))
            ;

            /**
             * Check if Restive.JS Constructor has been called multiple times
             */
            switch(true)
            {
                case (rstv_count_int > 1):
                    //Signal abort if startMulti() method call not used
                    switch(true)
                    {
                        case (is_multi_start_bool === false):
                            Restive.store("rstv_multi_abort_1", true);
                            break;
                    }
                    break;
            }

            /**
             * Check if Restive.JS Constructor has been called multiple times and has not been finalized properly with endMulti() method
             */
            switch(true)
            {
                case (rstv_multi_start_count_int > 1 && is_multi_end_bool === false):
                    Restive.store("rstv_multi_abort_2", true);
                    break;
            }
            methods._URLMonitor();
        },
        _multiConstructorCounter: function(){
            Restive.incrementStorageValue("rstv_multi_count");
        },
        _multiConstructorEnd: function(){
            //reset stored variables
            Restive.store("rstv_multi_start_count", 0);
            Restive.store("rstv_multi_end", true);

            //finalize multi constructor operations
            methods._multiConstructorFinalize();
        },
        getUserAgent: function (){
            return Restive.getUserAgent();
        },
        getPlatform: function (){
            return Restive.getPlatform();
        },
        getFormFactor: function(){
            return Restive.getFormFactor();
        },
        getOrientation: function(){
            return Restive.getOrientation();
        },
        getResolution: function(){
            return Restive.getResolution();
        },
        getPixelRatio: function(pxl_ratio){
            return Restive.getPixelRatio(pxl_ratio);
        },
        getViewportW: function(){
            return Restive.viewportW();
        },
        getViewportH: function(){
            return Restive.viewportH();
        },
        getScreenW: function(){
            return Restive.screenW();
        },
        getScreenH: function(){
            return Restive.screenH();
        },
        getPixelW: function(){
            return Restive.pixelW();
        },
        getPixelH: function(){
            return Restive.pixelH();
        },
        isRetina: function(){
            return Restive.isRetina();
        },
        isMobile: function(){
            return Restive.isMobile();
        },
        isNonMobile: function(){
            return Restive.isNonMobile();
        },
        isPhone: function(){
            return Restive.isPhone();
        },
        isTablet: function(){
            return Restive.isTablet();
        },
        isTV: function(){
            return Restive.isTV();
        },
        isPC: function(){
            return Restive.isPC();
        },
        isIOS: function(){
            return Restive.isIOS();
        },
        isApple: function(){
            return Restive.isApple();
        },
        isAndroid: function(){
            return Restive.isAndroid();
        },
        isSymbian: function(){
            return Restive.isSymbian();
        },
        isBlackberry: function(){
            return Restive.isBlackberry();
        },
        isWindows: function(){
            return Restive.isWindows();
        },
        isWindowsPhone: function(){
            return Restive.isWindowsPhone();
        },
        isPortrait: function(){
            return Restive.isPortrait();
        },
        isLandscape: function(){
            return Restive.isLandscape();
        }
	};

    /**
     * Plugin Initialize
     */
    $.fn.restive = function(args){
		
		if ( methods[args] )
		{
			//execute JQuery Plugin Method
		   	return methods[ args ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof args === 'object' || ! args ) 
		{
			//Process JQuery Plugin Options
			var opts = $.extend({}, $.fn.restive.defaults, args);
			var new_args = new Array(opts);
			return methods.init.apply( this, new_args );
		}
		else 
		{
		   	$.error( 'Method ' +  args + ' does not exist on Restive.JS' );
		}
	};	
	
	/**
	 * Plugin Defaults
	 */
	$.fn.restive.defaults = {
        breakpoints: [],                                //the breakpoints
		classes: [],                                    //the corresponding classes
        anchor: 'window',                               //the basis for responsiveness
        anchor_e_df: 'w',                               //the dimension format for element-value anchor operations
        platform: 'all',						        //all, ios, android, symbian, blackberry, windows
        formfactor: 'all',                              //all, pc, tv, tablet, phone
        turbo_classes: '',                              //special class-based functionality
        turbo_classes_reflow: false,                    //this will apply specific turbo_classes based on limit settings
        turbo_classes_reflow_limits: '480,960',         //defines thresholds for turbo_classes_reflow option
        force_dip: false,                               //force breakpoints to use device-independent pixels
        onReady: 		    function(){},
		onResize: 		    function(){},
		onRotate:		    function(){},
		onRotateToP:	    function(){},
		onRotateToL:	    function(){},
        onPortrait:         function(){},
        onLandscape:        function(){},
        onRetina:           function(){},
        onPhone:            function(){},
        onTablet:           function(){},
        onPC:               function(){},
        onTV:               function(){},
        onIOS:              function(){},
        onAndroid:          function(){},
        onSymbian:          function(){},
        onBlackberry:       function(){},
        onWindows:          function(){},
        onWindowsPhone:     function(){},
        onMobile:           function(){},
        onNonMobile:        function(){},
        onTurboClassReflow:         function(){},
        onTurboClassReflowIn:       function(){},
        onTurboClassReflowOut:      function(){},
        onAddClass:         function(){},
        onRemoveClass:      function(){}
	};

    /**
     * Plugin Methods
     */
    var D = $.restive = function(){};
    $.extend(D, {
        getUserAgent: function(){
            return methods.getUserAgent();
        },
        getPlatform: function(){
            return methods.getPlatform();
        },
        getFormFactor: function(){
            return methods.getFormFactor();
        },
        getOrientation: function(){
            return methods.getOrientation();
        },
        getResolution: function(){
            return methods.getResolution();
        },
        getPixelRatio: function(pxl_ratio){
            return methods.getPixelRatio(pxl_ratio);
        },
        getViewportW: function(){
            return methods.getViewportW();
        },
        getViewportH: function(){
            return methods.getViewportH();
        },
        getScreenW: function(){
            return methods.getScreenW();
        },
        getScreenH: function(){
            return methods.getScreenH();
        },
        getPixelW: function(){
            return methods.getPixelW();
        },
        getPixelH: function(){
            return methods.getPixelH();
        },
        isRetina: function(){
            return methods.isRetina();
        },
        isMobile: function(){
            return methods.isMobile();
        },
        isNonMobile: function(){
            return methods.isNonMobile();
        },
        isPhone: function(){
            return methods.isPhone();
        },
        isTablet: function(){
            return methods.isTablet();
        },
        isTV: function(){
            return methods.isTV();
        },
        isPC: function(){
            return methods.isPC();
        },
        isIOS: function(){
            return methods.isIOS();
        },
        isApple: function(){
            return methods.isIOS();
        },
        isAndroid: function(){
            return methods.isAndroid();
        },
        isSymbian: function(){
            return methods.isSymbian();
        },
        isBlackberry: function(){
            return methods.isBlackberry();
        },
        isWindows: function(){
            return methods.isWindows();
        },
        isWindowsPhone: function(){
            return methods.isWindowsPhone();
        },
        isPortrait: function(){
            return methods.isPortrait();
        },
        isLandscape: function(){
            return methods.isLandscape();
        },
        startMulti: function(){
            methods._multiConstructorStart();
        },
        endMulti: function(){
            methods._multiConstructorEnd();
        }
    });

}(window, document, jQuery));
