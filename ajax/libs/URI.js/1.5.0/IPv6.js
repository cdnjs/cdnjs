/*
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.5.0
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.com/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */

(function(undefined){

var global = typeof module !== 'undefined' && module.exports
    ? module.exports
    : window;

var best = function(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase(),
        segments = _address.split(':'),
        length = segments.length,
        total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
        // must have been ::
        // remove first two items
        segments.shift();
        segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
        // must have been ::xxxx
        // remove the first item
        segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
        // must have been xxxx::
        segments.pop();
    }

    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
        // found a "." which means IPv4
        total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
        if (segments[pos] === '') {
            break;
        }
    }

    if (pos < total) {
        segments.splice(pos, 1, '0000');
        while (segments.length < total) {
            segments.splice(pos, 0, '0000');
        }

        length = segments.length;
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
        _segments = segments[i].split("");
        for (var j = 0; j < 3 ; j++) {
            if (_segments[0] === '0' && _segments.length > 1) {
                _segments.splice(0,1);
            } else {
                break;
            }
        }

        segments[i] = _segments.join("");
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1,
        _best = 0,
        _current = 0,
        current = -1,
        inzeroes = false;
        // i; already declared

    for (i = 0; i < total; i++) {
        if (inzeroes) {
            if (segments[i] === '0') {
                _current += 1;
            } else {
                inzeroes = false;
                if (_current > _best) {
                    best = current;
                    _best = _current;
                }
            }
        } else {
            if (segments[i] == '0') {
                inzeroes = true;
                current = i;
                _current = 1;
            }
        }
    }

    if (_current > _best) {
        best = current;
        _best = _current;
    }

    if (_best > 1) {
        segments.splice(best, _best, "");
    }

    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '')  {
        beststr = ":";
    }

    for (i = 0; i < length; i++) {
        result += segments[i];
        if (i === length - 1) {
            break;
        }

        result += ':';
    }

    if (segments[length - 1] === '') {
        result += ":";
    }

    return result;
};

global.IPv6 = {
    best: best
};
})();

/*
var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156",
    _out = IPv6.best(_in),
    _expected = "fe80::204:61ff:fe9d:f156";

console.log(_in, _out, _expected, _out === _expected);
*/
