/*
Copyright 2014, modulex-url@1.0.4
MIT Licensed
build time: Thu, 16 Oct 2014 03:50:46 GMT
*/
/*
combined modules:
url
*/
modulex.add("url", ["modulex-querystring","modulex-path"], function(require, exports, module) {/**
 * @ignore
 * url utilities
 * @author yiminghe@gmail.com
 */
var querystring = require('modulex-querystring');
var undef;
var Path = require('modulex-path');
var reDisallowedInProtocolOrAuth = /[#\/\?@]/g,
    reDisallowedInPathName = /[#\?]/g,
    reDisallowedInHash = /#/g,
    URI_SPLIT_REG = new RegExp(
            '^' +
            /*
             Scheme names consist of a sequence of characters beginning with a
             letter and followed by any combination of letters, digits, plus
             ('+'), period ('.'), or hyphen ('-').
             */
            '([\\w\\d+.-]+:)?' + // protocol

            '(?://' +
            /*
             The authority component is preceded by a double slash ('//') and is
             terminated by the next slash ('/'), question mark ('?'), or number
             sign ('#') character, or by the end of the URI.
             */
            '(?:([^/?#@]*)@)?' + // auth

            '(' +
            '[\\w\\d\\-\\u0100-\\uffff.+%]*' +
            '|' +
            // ipv6
            '\\[[^\\]]+\\]' +
            ')' + // hostname - restrict to letters,
            // digits, dashes, dots, percent
            // escapes, and unicode characters.
            '(?::([0-9]+))?' + // port
            ')?' +
            /*
             The path is terminated
             by the first question mark ('?') or number sign ('#') character, or
             by the end of the URI.
             */
            '([^?#]+)?' + // pathname. hierarchical part
            /*
             The query component is indicated by the first question
             mark ('?') character and terminated by a number sign ('#') character
             or by the end of the URI.
             */
            '(\\?[^#]*)?' + // search. non-hierarchical data
            /*
             The hash identifier component of a URI allows indirect
             identification of a secondary resource by reference to a primary
             resource and additional identifying information.

             A
             hash identifier component is indicated by the presence of a
             number sign ('#') character and terminated by the end of the URI.
             */
            '(#.*)?' + // hash
            '$'),

    REG_INFO = {
        protocol: 1,
        auth: 2,
        hostname: 3,
        port: 4,
        pathname: 5,
        search: 6,
        hash: 7
    };

function needDoubleSlash(str) {
    if (str.slice(0 - 1) === ':') {
        str = str.slice(0, -1);
    }
    return str === 'http' ||
        str === 'https' ||
        str === 'ftp' ||
        str === 'gopher' ||
        str === 'file';
}

function padding2(str) {
    return str.length === 1 ? '0' + str : str;
}

// www.ta#bao.com // => www.ta.com/#bao.com
// www.ta%23bao.com
// Percent-Encoding
function encodeSpecialChars(str, specialCharsReg) {
    // encodeURI( ) is intended to encode complete URIs,
    // the following ASCII punctuation characters,
    // which have special meaning in URIs, are not escaped either:
    // ; / ? : @ & = + $ , #
    return encodeURI(str).replace(specialCharsReg, function (m) {
        return '%' + padding2(m.charCodeAt(0).toString(16));
    });
}

var url = {
    version: '1.0.4',
    
    /**
     * parse a url to a structured object
     * @param {String} str url string
     * @param {Boolean} [parseQueryString] whether parse query string to structured object
     * @return {Object}
     */
    parse: function (str, parseQueryString) {
        var m = str.match(URI_SPLIT_REG) || [],
            ret = {};

        // old ie 7:  return "" for unmatched regexp ...

        for (var part in REG_INFO) {
            ret[part] = m[REG_INFO[part]];
        }

        if (ret.protocol) {
            ret.protocol = ret.protocol.toLowerCase();
        }

        if (ret.hostname) {
            ret.hostname = ret.hostname.toLowerCase();
        }

        var protocol = ret.protocol;

        if (protocol) {
            ret.slashes = str.lastIndexOf(protocol + '//') !== -1;
        }

        // mailto: yiminghe@gmail.com
        if (protocol && !needDoubleSlash(protocol.slice(0, -1))) {
            if (!ret.slashes) {
                str = str.slice(0, protocol.length) + '//' + str.slice(protocol.length);
                ret = url.parse(str, parseQueryString);
                ret.slashes = null;
                return ret;
            }
        } else {
            // http://www.g.cn
            // pathname => /
            if (ret.hostname && !ret.pathname) {
                ret.pathname = '/';
            }
        }

        ret.path = ret.pathname;
        if (ret.search) {
            ret.path += ret.search;
        }
        ret.host = ret.hostname;
        if (ret.port) {
            ret.host = ret.hostname + ':' + ret.port;
        }
        if (ret.search) {
            ret.query = ret.search.substring(1);
        }
        if (parseQueryString && ret.query) {
            ret.query = querystring.parse(ret.query);
        }
        ret.href = url.format(ret);
        return ret;
    },

    /**
     * Take a parsed URL object, and return a formatted URL string.
     * @param {Object} url parsed from url.parse
     * @param {Boolean} [serializeArray=true] whether add '[]' to array key of query data
     */
    format: function (url, serializeArray) {
        var host = url.host;
        if (host === undef && url.hostname) {
            host = encodeURIComponent(url.hostname);
            if (url.port) {
                host += ':' + url.port;
            }
        }

        var search = url.search;
        var query = url.query;
        if (search === undef && query !== undef) {
            if (typeof query !== 'string') {
                query = querystring.stringify(query, undef, undef, serializeArray);
            }
            if (query) {
                search = '?' + query;
            }
        }

        if (search && search.charAt(0) !== '?') {
            search = '?' + search;
        }

        var hash = url.hash || '';
        if (hash && hash.charAt(0) !== '#') {
            hash = '#' + hash;
        }

        var pathname = url.pathname || '';

        var out = [],
            protocol, auth;

        if ((protocol = url.protocol)) {
            if (protocol.slice(0 - 1) !== ':') {
                protocol += ':';
            }

            out.push(encodeSpecialChars(protocol, reDisallowedInProtocolOrAuth));
        }

        if (host !== undef) {
            if (this.slashes || protocol && needDoubleSlash(protocol)) {
                out.push('//');
            }
            if ((auth = url.auth)) {
                out.push(encodeSpecialChars(auth, reDisallowedInProtocolOrAuth));
                out.push('@');
            }
            out.push(host);
        }

        if (pathname) {
            out.push(encodeSpecialChars(pathname, reDisallowedInPathName));
        }

        if (search) {
            out.push(search);
        }

        if (hash) {
            out.push('#' + encodeSpecialChars(hash.substring(1), reDisallowedInHash));
        }

        return out.join('');
    },

    resolve: function (from, to) {
        var override = 0,
            lastSlashIndex,
            order = ['protocol', 'auth', 'host', 'pathname', 'search', 'hash'],
            target = {};

        from = url.parse(from);
        to = url.parse(to);

        for (var i = 0; i < order.length; i++) {
            var o = order[i];

            if (override) {
                target[o] = to[o];
                continue;
            } else {
                target[o] = from[o];
            }

            if (o === 'pathname') {
                // relativeUri does not set for scheme/userInfo/hostname/port
                var pathname = to.pathname;
                if (pathname) {
                    // force to override target 's query with relative
                    override = 1;
                    if (pathname.charAt(0) !== '/') {
                        if (target.hostname && !target.pathname) {
                            // RFC 3986, section 5.2.3, case 1
                            pathname = '/' + pathname;
                        } else if (target.pathname) {
                            if (pathname.slice(0 - 2) === '/.' || pathname.slice(0 - 3) === '/..' ||
                                pathname === '.' || pathname === '..') {
                                pathname = pathname + '/';
                            }
                            // RFC 3986, section 5.2.3, case 2
                            lastSlashIndex = target.pathname.lastIndexOf('/');
                            if (lastSlashIndex !== -1) {
                                pathname = target.pathname.slice(0, lastSlashIndex + 1) + pathname;
                            }
                        }
                    }
                    // remove .. / .  as part of the resolution process
                    target.pathname = Path.normalize(pathname);
                }
            } else if (o === 'search') {
                if (to.search) {
                    target.search = to.search;
                    override = 1;
                }
            } else if (to[o]) {
                // protocol auth host can inherit
                override = override || target[o] !== to[o];
                target[o] = to[o];
            }
        }

        return url.format(target);
    }
};

url.stringify = url.format;

module.exports = url;
/*
 Refer
 - application/x-www-form-urlencoded
 - http://www.ietf.org/rfc/rfc3986.txt
 - http://en.wikipedia.org/wiki/URI_scheme
 - http://unixpapa.com/js/querystring.html
 - http://code.stephenmorley.org/javascript/parsing-query-strings-for-get-data/
 - same origin: http://tools.ietf.org/html/rfc6454
 */});