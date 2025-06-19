/******/ var __webpack_modules__ = ({

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/***/ (function(module) {

// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) code = path.charCodeAt(i);else if (code === 47 /*/*/) break;else code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += '/..';else res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i);else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}
var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0) path = arguments[i];else {
        if (cwd === undefined) cwd = process.cwd();
        path = cwd;
      }
      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }
      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedAbsolute) {
      if (resolvedPath.length > 0) return '/' + resolvedPath;else return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },
  normalize: function normalize(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);
    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';
    if (isAbsolute) return '/' + path;
    return path;
  },
  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },
  join: function join() {
    if (arguments.length === 0) return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined) joined = arg;else joined += '/' + arg;
      }
    }
    if (joined === undefined) return '.';
    return posix.normalize(joined);
  },
  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return '';
    from = posix.resolve(from);
    to = posix.resolve(to);
    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/) break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/) break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode) break;else if (fromCode === 47 /*/*/) lastCommonSep = i;
    }
    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0) out += '..';else out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/) ++toStart;
      return to.slice(toStart);
    }
  },
  _makeLong: function _makeLong(path) {
    return path;
  },
  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }
    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },
  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) return '';
      return path.slice(start, end);
    }
  },
  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },
  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },
  parse: function parse(path) {
    assertPath(path);
    var ret = {
      root: '',
      dir: '',
      base: '',
      ext: '',
      name: ''
    };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';
    return ret;
  },
  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};
posix.posix = posix;
module.exports = posix;

/***/ }),

/***/ "./node_modules/ua-parser-js/src/ua-parser.js":
/*!****************************************************!*\
  !*** ./node_modules/ua-parser-js/src/ua-parser.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/////////////////////////////////////////////////////////////////////////////////
/* UAParser.js v1.0.38
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License */ /*
                  Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
                  Supports browser & node.js environment. 
                  Demo   : https://faisalman.github.io/ua-parser-js
                  Source : https://github.com/faisalman/ua-parser-js */
/////////////////////////////////////////////////////////////////////////////////

(function (window, undefined) {
  'use strict';

  //////////////
  // Constants
  /////////////
  var LIBVERSION = '1.0.38',
    EMPTY = '',
    UNKNOWN = '?',
    FUNC_TYPE = 'function',
    UNDEF_TYPE = 'undefined',
    OBJ_TYPE = 'object',
    STR_TYPE = 'string',
    MAJOR = 'major',
    MODEL = 'model',
    NAME = 'name',
    TYPE = 'type',
    VENDOR = 'vendor',
    VERSION = 'version',
    ARCHITECTURE = 'architecture',
    CONSOLE = 'console',
    MOBILE = 'mobile',
    TABLET = 'tablet',
    SMARTTV = 'smarttv',
    WEARABLE = 'wearable',
    EMBEDDED = 'embedded',
    UA_MAX_LENGTH = 500;
  var AMAZON = 'Amazon',
    APPLE = 'Apple',
    ASUS = 'ASUS',
    BLACKBERRY = 'BlackBerry',
    BROWSER = 'Browser',
    CHROME = 'Chrome',
    EDGE = 'Edge',
    FIREFOX = 'Firefox',
    GOOGLE = 'Google',
    HUAWEI = 'Huawei',
    LG = 'LG',
    MICROSOFT = 'Microsoft',
    MOTOROLA = 'Motorola',
    OPERA = 'Opera',
    SAMSUNG = 'Samsung',
    SHARP = 'Sharp',
    SONY = 'Sony',
    XIAOMI = 'Xiaomi',
    ZEBRA = 'Zebra',
    FACEBOOK = 'Facebook',
    CHROMIUM_OS = 'Chromium OS',
    MAC_OS = 'Mac OS';

  ///////////
  // Helper
  //////////

  var extend = function (regexes, extensions) {
      var mergedRegexes = {};
      for (var i in regexes) {
        if (extensions[i] && extensions[i].length % 2 === 0) {
          mergedRegexes[i] = extensions[i].concat(regexes[i]);
        } else {
          mergedRegexes[i] = regexes[i];
        }
      }
      return mergedRegexes;
    },
    enumerize = function (arr) {
      var enums = {};
      for (var i = 0; i < arr.length; i++) {
        enums[arr[i].toUpperCase()] = arr[i];
      }
      return enums;
    },
    has = function (str1, str2) {
      return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
    },
    lowerize = function (str) {
      return str.toLowerCase();
    },
    majorize = function (version) {
      return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split('.')[0] : undefined;
    },
    trim = function (str, len) {
      if (typeof str === STR_TYPE) {
        str = str.replace(/^\s\s*/, EMPTY);
        return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
      }
    };

  ///////////////
  // Map helper
  //////////////

  var rgxMapper = function (ua, arrays) {
      var i = 0,
        j,
        k,
        p,
        q,
        matches,
        match;

      // loop through all regexes maps
      while (i < arrays.length && !matches) {
        var regex = arrays[i],
          // even sequence (0,2,4,..)
          props = arrays[i + 1]; // odd sequence (1,3,5,..)
        j = k = 0;

        // try matching uastring with regexes
        while (j < regex.length && !matches) {
          if (!regex[j]) {
            break;
          }
          matches = regex[j++].exec(ua);
          if (!!matches) {
            for (p = 0; p < props.length; p++) {
              match = matches[++k];
              q = props[p];
              // check if given property is actually array
              if (typeof q === OBJ_TYPE && q.length > 0) {
                if (q.length === 2) {
                  if (typeof q[1] == FUNC_TYPE) {
                    // assign modified match
                    this[q[0]] = q[1].call(this, match);
                  } else {
                    // assign given value, ignore regex match
                    this[q[0]] = q[1];
                  }
                } else if (q.length === 3) {
                  // check whether function or regex
                  if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                    // call function (usually string mapper)
                    this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                  } else {
                    // sanitize match using given regex
                    this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                  }
                } else if (q.length === 4) {
                  this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                }
              } else {
                this[q] = match ? match : undefined;
              }
            }
          }
        }
        i += 2;
      }
    },
    strMapper = function (str, map) {
      for (var i in map) {
        // check if current value is array
        if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
          for (var j = 0; j < map[i].length; j++) {
            if (has(map[i][j], str)) {
              return i === UNKNOWN ? undefined : i;
            }
          }
        } else if (has(map[i], str)) {
          return i === UNKNOWN ? undefined : i;
        }
      }
      return str;
    };

  ///////////////
  // String map
  //////////////

  // Safari < 3.0
  var oldSafariMap = {
      '1.0': '/8',
      '1.2': '/1',
      '1.3': '/3',
      '2.0': '/412',
      '2.0.2': '/416',
      '2.0.3': '/417',
      '2.0.4': '/419',
      '?': '/'
    },
    windowsVersionMap = {
      'ME': '4.90',
      'NT 3.11': 'NT3.51',
      'NT 4.0': 'NT4.0',
      '2000': 'NT 5.0',
      'XP': ['NT 5.1', 'NT 5.2'],
      'Vista': 'NT 6.0',
      '7': 'NT 6.1',
      '8': 'NT 6.2',
      '8.1': 'NT 6.3',
      '10': ['NT 6.4', 'NT 10.0'],
      'RT': 'ARM'
    };

  //////////////
  // Regex map
  /////////////

  var regexes = {
    browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
    ], [VERSION, [NAME, 'Chrome']], [/edg(?:e|ios|a)?\/([\w\.]+)/i // Microsoft Edge
    ], [VERSION, [NAME, 'Edge']], [
    // Presto based
    /(opera mini)\/([-\w\.]+)/i,
    // Opera Mini
    /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
    // Opera Mobi/Tablet
    /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i // Opera
    ], [NAME, VERSION], [/opios[\/ ]+([\w\.]+)/i // Opera mini on iphone >= 8.0
    ], [VERSION, [NAME, OPERA + ' Mini']], [/\bop(?:rg)?x\/([\w\.]+)/i // Opera GX
    ], [VERSION, [NAME, OPERA + ' GX']], [/\bopr\/([\w\.]+)/i // Opera Webkit
    ], [VERSION, [NAME, OPERA]], [
    // Mixed
    /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i // Baidu
    ], [VERSION, [NAME, 'Baidu']], [/(kindle)\/([\w\.]+)/i,
    // Kindle
    /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
    // Lunascape/Maxthon/Netfront/Jasmine/Blazer
    // Trident based
    /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
    // Avant/IEMobile/SlimBrowser
    /(?:ms|\()(ie) ([\w\.]+)/i,
    // Internet Explorer

    // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
    /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
    // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
    /(heytap|ovi)browser\/([\d\.]+)/i,
    // Heytap/Ovi
    /(weibo)__([\d\.]+)/i // Weibo
    ], [NAME, VERSION], [/\bddg\/([\w\.]+)/i // DuckDuckGo
    ], [VERSION, [NAME, 'DuckDuckGo']], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i // UCBrowser
    ], [VERSION, [NAME, 'UC' + BROWSER]], [/microm.+\bqbcore\/([\w\.]+)/i,
    // WeChat Desktop for Windows Built-in Browser
    /\bqbcore\/([\w\.]+).+microm/i, /micromessenger\/([\w\.]+)/i // WeChat
    ], [VERSION, [NAME, 'WeChat']], [/konqueror\/([\w\.]+)/i // Konqueror
    ], [VERSION, [NAME, 'Konqueror']], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i // IE11
    ], [VERSION, [NAME, 'IE']], [/ya(?:search)?browser\/([\w\.]+)/i // Yandex
    ], [VERSION, [NAME, 'Yandex']], [/slbrowser\/([\w\.]+)/i // Smart Lenovo Browser
    ], [VERSION, [NAME, 'Smart Lenovo ' + BROWSER]], [/(avast|avg)\/([\w\.]+)/i // Avast/AVG Secure Browser
    ], [[NAME, /(.+)/, '$1 Secure ' + BROWSER], VERSION], [/\bfocus\/([\w\.]+)/i // Firefox Focus
    ], [VERSION, [NAME, FIREFOX + ' Focus']], [/\bopt\/([\w\.]+)/i // Opera Touch
    ], [VERSION, [NAME, OPERA + ' Touch']], [/coc_coc\w+\/([\w\.]+)/i // Coc Coc Browser
    ], [VERSION, [NAME, 'Coc Coc']], [/dolfin\/([\w\.]+)/i // Dolphin
    ], [VERSION, [NAME, 'Dolphin']], [/coast\/([\w\.]+)/i // Opera Coast
    ], [VERSION, [NAME, OPERA + ' Coast']], [/miuibrowser\/([\w\.]+)/i // MIUI Browser
    ], [VERSION, [NAME, 'MIUI ' + BROWSER]], [/fxios\/([-\w\.]+)/i // Firefox for iOS
    ], [VERSION, [NAME, FIREFOX]], [/\bqihu|(qi?ho?o?|360)browser/i // 360
    ], [[NAME, '360 ' + BROWSER]], [/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i], [[NAME, /(.+)/, '$1 ' + BROWSER], VERSION], [
    // Oculus/Sailfish/HuaweiBrowser/VivoBrowser
    /samsungbrowser\/([\w\.]+)/i // Samsung Internet
    ], [VERSION, [NAME, SAMSUNG + ' Internet']], [/(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
    ], [[NAME, /_/g, ' '], VERSION], [/metasr[\/ ]?([\d\.]+)/i // Sogou Explorer
    ], [VERSION, [NAME, 'Sogou Explorer']], [/(sogou)mo\w+\/([\d\.]+)/i // Sogou Mobile
    ], [[NAME, 'Sogou Mobile'], VERSION], [/(electron)\/([\w\.]+) safari/i,
    // Electron-based App
    /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
    // Tesla
    /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i // QQBrowser/2345 Browser
    ], [NAME, VERSION], [/(lbbrowser)/i,
    // LieBao Browser
    /\[(linkedin)app\]/i // LinkedIn App for iOS & Android
    ], [NAME], [
    // WebView
    /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i // Facebook App for iOS & Android
    ], [[NAME, FACEBOOK], VERSION], [/(Klarna)\/([\w\.]+)/i,
    // Klarna Shopping Browser for iOS & Android
    /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
    // Kakao App
    /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
    // Naver InApp
    /safari (line)\/([\w\.]+)/i,
    // Line App for iOS
    /\b(line)\/([\w\.]+)\/iab/i,
    // Line App for Android
    /(alipay)client\/([\w\.]+)/i,
    // Alipay
    /(twitter)(?:and| f.+e\/([\w\.]+))/i,
    // Twitter
    /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i // Chromium/Instagram/Snapchat
    ], [NAME, VERSION], [/\bgsa\/([\w\.]+) .*safari\//i // Google Search Appliance on iOS
    ], [VERSION, [NAME, 'GSA']], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i // TikTok
    ], [VERSION, [NAME, 'TikTok']], [/headlesschrome(?:\/([\w\.]+)| )/i // Chrome Headless
    ], [VERSION, [NAME, CHROME + ' Headless']], [/ wv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
    ], [[NAME, CHROME + ' WebView'], VERSION], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i // Android Browser
    ], [VERSION, [NAME, 'Android ' + BROWSER]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
    ], [NAME, VERSION], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i // Mobile Safari
    ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i // Safari & Safari Mobile
    ], [VERSION, NAME], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
    ], [NAME, [VERSION, strMapper, oldSafariMap]], [/(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [
    // Gecko based
    /(navigator|netscape\d?)\/([-\w\.]+)/i // Netscape
    ], [[NAME, 'Netscape'], VERSION], [/mobile vr; rv:([\w\.]+)\).+firefox/i // Firefox Reality
    ], [VERSION, [NAME, FIREFOX + ' Reality']], [/ekiohf.+(flow)\/([\w\.]+)/i,
    // Flow
    /(swiftfox)/i,
    // Swiftfox
    /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
    // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
    /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
    // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
    /(firefox)\/([\w\.]+)/i,
    // Other Firefox-based
    /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
    // Mozilla

    // Other
    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
    // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
    /(links) \(([\w\.]+)/i,
    // Links
    /panasonic;(viera)/i // Panasonic Viera
    ], [NAME, VERSION], [/(cobalt)\/([\w\.]+)/i // Cobalt
    ], [NAME, [VERSION, /master.|lts./, ""]]],
    cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i // AMD64 (x64)
    ], [[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i // IA32 (quicktime)
    ], [[ARCHITECTURE, lowerize]], [/((?:i[346]|x)86)[;\)]/i // IA32 (x86)
    ], [[ARCHITECTURE, 'ia32']], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i // ARM64
    ], [[ARCHITECTURE, 'arm64']], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i // ARMHF
    ], [[ARCHITECTURE, 'armhf']], [
    // PocketPC mistakenly identified as PowerPC
    /windows (ce|mobile); ppc;/i], [[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i // PowerPC
    ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [/(sun4\w)[;\)]/i // SPARC
    ], [[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
    // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
    ], [[ARCHITECTURE, lowerize]]],
    device: [[
    //////////////////////////
    // MOBILES & TABLETS
    /////////////////////////

    // Samsung
    /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [
    // Apple
    /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i // iPod/iPhone
    ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [/\((ipad);[-\w\),; ]+apple/i,
    // iPad
    /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [/(macintosh);/i], [MODEL, [VENDOR, APPLE]], [
    // Sharp
    /\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]], [
    // Huawei
    /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [
    // Xiaomi
    /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
    // Xiaomi POCO
    /\b; (\w+) build\/hm\1/i,
    // Xiaomi Hongmi 'numeric' models
    /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
    // Xiaomi Hongmi
    /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
    // Xiaomi Redmi
    /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
    // Xiaomi Redmi 'numeric' models
    /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
    ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
    // Redmi Pad
    /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i // Mi Pad tablets
    ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [
    // OPPO
    /; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [/\b(opd2\d{3}a?) bui/i], [MODEL, [VENDOR, 'OPPO'], [TYPE, TABLET]], [
    // Vivo
    /vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [
    // Realme
    /\b(rmx[1-3]\d{3})(?: bui|;|\))/i], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [
    // Motorola
    /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [
    // LG
    /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [
    // Lenovo
    /(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [
    // Nokia
    /(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [
    // Google
    /(pixel c)\b/i // Google Pixel C
    ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i // Google Pixel
    ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [
    // Sony
    /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [
    // OnePlus
    / (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [
    // Amazon
    /(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
    // Kindle Fire without Silk / Echo Show
    /(kf[a-z]+)( bui|\)).+silk\//i // Kindle Fire HD
    ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i // Fire Phone
    ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [
    // BlackBerry
    /(playbook);[-\w\),; ]+(rim)/i // BlackBerry PlayBook
    ], [MODEL, VENDOR, [TYPE, TABLET]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i // BlackBerry 10
    ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [
    // Asus
    /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [
    // HTC
    /(nexus 9)/i // HTC Nexus 9
    ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
    // HTC

    // ZTE
    /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
    ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [
    // Acer
    /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [
    // Meizu
    /droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
    // Ulefone
    /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i], [MODEL, [VENDOR, 'Ulefone'], [TYPE, MOBILE]], [
    // MIXED
    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
    // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
    /(hp) ([\w ]+\w)/i,
    // HP iPAQ
    /(asus)-?(\w+)/i,
    // Asus
    /(microsoft); (lumia[\w ]+)/i,
    // Microsoft Lumia
    /(lenovo)[-_ ]?([-\w]+)/i,
    // Lenovo
    /(jolla)/i,
    // Jolla
    /(oppo) ?([\w ]+) bui/i // OPPO
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/(kobo)\s(ereader|touch)/i,
    // Kobo
    /(archos) (gamepad2?)/i,
    // Archos
    /(hp).+(touchpad(?!.+tablet)|tablet)/i,
    // HP TouchPad
    /(kindle)\/([\w\.]+)/i,
    // Kindle
    /(nook)[\w ]+build\/(\w+)/i,
    // Nook
    /(dell) (strea[kpr\d ]*[\dko])/i,
    // Dell Streak
    /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
    // Le Pan Tablets
    /(trinity)[- ]*(t\d{3}) bui/i,
    // Trinity Tablets
    /(gigaset)[- ]+(q\w{1,9}) bui/i,
    // Gigaset Tablets
    /(vodafone) ([\w ]+)(?:\)| bui)/i // Vodafone
    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(surface duo)/i // Surface Duo
    ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i // Fairphone
    ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [/(u304aa)/i // AT&T
    ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [/\bsie-(\w*)/i // Siemens
    ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/\b(rct\w+) b/i // RCA Tablets
    ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [/\b(venue[\d ]{2,7}) b/i // Dell Venue Tablets
    ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [/\b(q(?:mv|ta)\w+) b/i // Verizon Tablet
    ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i // Barnes & Noble Tablet
    ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [/\b(tm\d{3}\w+) b/i], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [/\b(k88) b/i // ZTE K Series Tablet
    ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [/\b(nx\d{3}j) b/i // ZTE Nubia
    ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [/\b(gen\d{3}) b.+49h/i // Swiss GEN Mobile
    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [/\b(zur\d{3}) b/i // Swiss ZUR Tablet
    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [/\b((zeki)?tb.*\b) b/i // Zeki Tablets
    ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i // Dragon Touch Tablet
    ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [/\b(ns-?\w{0,9}) b/i // Insignia Tablets
    ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [/\b((nxa|next)-?\w{0,9}) b/i // NextBook Tablets
    ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i // Voice Xtreme Phones
    ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [/\b(lvtel\-)?(v1[12]) b/i // LvTel Phones
    ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [/\b(ph-1) /i // Essential PH-1
    ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [/\b(v(100md|700na|7011|917g).*\b) b/i // Envizen Tablets
    ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [/\b(trio[-\w\. ]+) b/i // MachSpeed Tablets
    ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [/\btu_(1491) b/i // Rotor Tablets
    ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [/(shield[\w ]+) b/i // Nvidia Shield Tablets
    ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [/(sprint) (\w+)/i // Sprint Phones
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/(kin\.[onetw]{3})/i // Microsoft Kin
    ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i // Zebra
    ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [
    ///////////////////
    // SMARTTVS
    ///////////////////

    /smart-tv.+(samsung)/i // Samsung
    ], [VENDOR, [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i // LG SmartTV
    ], [[VENDOR, LG], [TYPE, SMARTTV]], [/(apple) ?tv/i // Apple TV
    ], [VENDOR, [MODEL, APPLE + ' TV'], [TYPE, SMARTTV]], [/crkey/i // Google Chromecast
    ], [[MODEL, CHROME + 'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [/droid.+aft(\w+)( bui|\))/i // Fire TV
    ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i // Sharp
    ], [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]], [/(bravia[\w ]+)( bui|\))/i // Sony
    ], [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]], [/(mitv-\w{5}) bui/i // Xiaomi
    ], [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]], [/Hbbtv.*(technisat) (.*);/i // TechniSAT
    ], [VENDOR, MODEL, [TYPE, SMARTTV]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
    // Roku
    /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i // HbbTV devices
    ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i // SmartTV from Unidentified Vendors
    ], [[TYPE, SMARTTV]], [
    ///////////////////
    // CONSOLES
    ///////////////////

    /(ouya)/i,
    // Ouya
    /(nintendo) ([wids3utch]+)/i // Nintendo
    ], [VENDOR, MODEL, [TYPE, CONSOLE]], [/droid.+; (shield) bui/i // Nvidia
    ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation [345portablevi]+)/i // Playstation
    ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i // Microsoft Xbox
    ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [
    ///////////////////
    // WEARABLES
    ///////////////////

    /((pebble))app/i // Pebble
    ], [VENDOR, MODEL, [TYPE, WEARABLE]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i // Apple Watch
    ], [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]], [/droid.+; (glass) \d/i // Google Glass
    ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [/droid.+; (wt63?0{2,3})\)/i], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [/(quest( \d| pro)?)/i // Oculus Quest
    ], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [
    ///////////////////
    // EMBEDDED
    ///////////////////

    /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i // Tesla
    ], [VENDOR, [TYPE, EMBEDDED]], [/(aeobc)\b/i // Echo Dot
    ], [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]], [
    ////////////////////
    // MIXED (GENERIC)
    ///////////////////

    /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i // Android Phones from Unidentified Vendors
    ], [MODEL, [TYPE, MOBILE]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i // Android Tablets from Unidentified Vendors
    ], [MODEL, [TYPE, TABLET]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i // Unidentifiable Tablet
    ], [[TYPE, TABLET]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i // Unidentifiable Mobile
    ], [[TYPE, MOBILE]], [/(android[-\w\. ]{0,9});.+buil/i // Generic Android Device
    ], [MODEL, [VENDOR, 'Generic']]],
    engine: [[/windows.+ edge\/([\w\.]+)/i // EdgeHTML
    ], [VERSION, [NAME, EDGE + 'HTML']], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i // Blink
    ], [VERSION, [NAME, 'Blink']], [/(presto)\/([\w\.]+)/i,
    // Presto
    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
    // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
    /ekioh(flow)\/([\w\.]+)/i,
    // Flow
    /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
    // KHTML/Tasman/Links
    /(icab)[\/ ]([23]\.[\d\.]+)/i,
    // iCab
    /\b(libweb)/i], [NAME, VERSION], [/rv\:([\w\.]{1,9})\b.+(gecko)/i // Gecko
    ], [VERSION, NAME]],
    os: [[
    // Windows
    /microsoft (windows) (vista|xp)/i // Windows (iTunes)
    ], [NAME, VERSION], [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i // Windows Phone
    ], [NAME, [VERSION, strMapper, windowsVersionMap]], [/windows nt 6\.2; (arm)/i,
    // Windows RT
    /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i, /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[VERSION, strMapper, windowsVersionMap], [NAME, 'Windows']], [
    // iOS/macOS
    /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
    // iOS
    /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i // Mac OS
    ], [[NAME, MAC_OS], [VERSION, /_/g, '.']], [
    // Mobile OSes
    /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i // Android-x86/HarmonyOS
    ], [VERSION, NAME], [
    // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
    /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i,
    // Blackberry
    /(tizen|kaios)[\/ ]([\w\.]+)/i,
    // Tizen/KaiOS
    /\((series40);/i // Series 40
    ], [NAME, VERSION], [/\(bb(10);/i // BlackBerry 10
    ], [VERSION, [NAME, BLACKBERRY]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i // Symbian
    ], [VERSION, [NAME, 'Symbian']], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
    ], [VERSION, [NAME, FIREFOX + ' OS']], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i // WebOS
    ], [VERSION, [NAME, 'webOS']], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i // watchOS
    ], [VERSION, [NAME, 'watchOS']], [
    // Google Chromecast
    /crkey\/([\d\.]+)/i // Google Chromecast
    ], [VERSION, [NAME, CHROME + 'cast']], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i // Chromium OS
    ], [[NAME, CHROMIUM_OS], VERSION], [
    // Smart TVs
    /panasonic;(viera)/i,
    // Panasonic Viera
    /(netrange)mmh/i,
    // Netrange
    /(nettv)\/(\d+\.[\w\.]+)/i,
    // NetTV

    // Console
    /(nintendo|playstation) ([wids345portablevuch]+)/i,
    // Nintendo/Playstation
    /(xbox); +xbox ([^\);]+)/i,
    // Microsoft Xbox (360, One, X, S, Series X, Series S)

    // Other
    /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
    // Joli/Palm
    /(mint)[\/\(\) ]?(\w*)/i,
    // Mint
    /(mageia|vectorlinux)[; ]/i,
    // Mageia/VectorLinux
    /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
    // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
    /(hurd|linux) ?([\w\.]*)/i,
    // Hurd/Linux
    /(gnu) ?([\w\.]*)/i,
    // GNU
    /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
    // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
    /(haiku) (\w+)/i // Haiku
    ], [NAME, VERSION], [/(sunos) ?([\w\.\d]*)/i // Solaris
    ], [[NAME, 'Solaris'], VERSION], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
    // Solaris
    /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
    // AIX
    /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
    // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
    /(unix) ?([\w\.]*)/i // UNIX
    ], [NAME, VERSION]]
  };

  /////////////////
  // Constructor
  ////////////////

  var UAParser = function (ua, extensions) {
    if (typeof ua === OBJ_TYPE) {
      extensions = ua;
      ua = undefined;
    }
    if (!(this instanceof UAParser)) {
      return new UAParser(ua, extensions).getResult();
    }
    var _navigator = typeof window !== UNDEF_TYPE && window.navigator ? window.navigator : undefined;
    var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
    var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined;
    var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
    var _isSelfNav = _navigator && _navigator.userAgent == _ua;
    this.getBrowser = function () {
      var _browser = {};
      _browser[NAME] = undefined;
      _browser[VERSION] = undefined;
      rgxMapper.call(_browser, _ua, _rgxmap.browser);
      _browser[MAJOR] = majorize(_browser[VERSION]);
      // Brave-specific detection
      if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
        _browser[NAME] = 'Brave';
      }
      return _browser;
    };
    this.getCPU = function () {
      var _cpu = {};
      _cpu[ARCHITECTURE] = undefined;
      rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
      return _cpu;
    };
    this.getDevice = function () {
      var _device = {};
      _device[VENDOR] = undefined;
      _device[MODEL] = undefined;
      _device[TYPE] = undefined;
      rgxMapper.call(_device, _ua, _rgxmap.device);
      if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
        _device[TYPE] = MOBILE;
      }
      // iPadOS-specific detection: identified as Mac, but has some iOS-only properties
      if (_isSelfNav && _device[MODEL] == 'Macintosh' && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
        _device[MODEL] = 'iPad';
        _device[TYPE] = TABLET;
      }
      return _device;
    };
    this.getEngine = function () {
      var _engine = {};
      _engine[NAME] = undefined;
      _engine[VERSION] = undefined;
      rgxMapper.call(_engine, _ua, _rgxmap.engine);
      return _engine;
    };
    this.getOS = function () {
      var _os = {};
      _os[NAME] = undefined;
      _os[VERSION] = undefined;
      rgxMapper.call(_os, _ua, _rgxmap.os);
      if (_isSelfNav && !_os[NAME] && _uach && _uach.platform && _uach.platform != 'Unknown') {
        _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS); // backward compatibility
      }
      return _os;
    };
    this.getResult = function () {
      return {
        ua: this.getUA(),
        browser: this.getBrowser(),
        engine: this.getEngine(),
        os: this.getOS(),
        device: this.getDevice(),
        cpu: this.getCPU()
      };
    };
    this.getUA = function () {
      return _ua;
    };
    this.setUA = function (ua) {
      _ua = typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH ? trim(ua, UA_MAX_LENGTH) : ua;
      return this;
    };
    this.setUA(_ua);
    return this;
  };
  UAParser.VERSION = LIBVERSION;
  UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR]);
  UAParser.CPU = enumerize([ARCHITECTURE]);
  UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
  UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);

  ///////////
  // Export
  //////////

  // check js environment
  if (typeof exports !== UNDEF_TYPE) {
    // nodejs env
    if ("object" !== UNDEF_TYPE && module.exports) {
      exports = module.exports = UAParser;
    }
    exports.UAParser = UAParser;
  } else {
    // requirejs env (optional)
    if ("function" === FUNC_TYPE && __webpack_require__.amdO) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return UAParser;
      }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof window !== UNDEF_TYPE) {
      // browser env
      window.UAParser = UAParser;
    }
  }

  // jQuery/Zepto specific (optional)
  // Note:
  //   In AMD env the global scope should be kept clean, but jQuery is an exception.
  //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
  //   and we should catch that.
  var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);
  if ($ && !$.ua) {
    var parser = new UAParser();
    $.ua = parser.getResult();
    $.ua.get = function () {
      return parser.getUA();
    };
    $.ua.set = function (ua) {
      parser.setUA(ua);
      var result = parser.getResult();
      for (var prop in result) {
        $.ua[prop] = result[prop];
      }
    };
  }
})(typeof window === 'object' ? window : this);

/***/ }),

/***/ "./src/core/Debug.js":
/*!***************************!*\
  !*** ./src/core/Debug.js ***!
  \***************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventBus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventBus.js */ "./src/core/EventBus.js");
/* harmony import */ var _events_Events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events/Events.js */ "./src/core/events/Events.js");
/* harmony import */ var _FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



const LOG_LEVEL_NONE = 0;
const LOG_LEVEL_FATAL = 1;
const LOG_LEVEL_ERROR = 2;
const LOG_LEVEL_WARNING = 3;
const LOG_LEVEL_INFO = 4;
const LOG_LEVEL_DEBUG = 5;

/**
 * @module Debug
 * @param {object} config
 * @ignore
 */
function Debug(config) {
  config = config || {};
  const context = this.context;
  const eventBus = (0,_EventBus_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
  const settings = config.settings;
  const logFn = [];
  let instance, showLogTimestamp, showCalleeName, startTime;
  function setup() {
    showLogTimestamp = true;
    showCalleeName = true;
    startTime = new Date().getTime();
    if (typeof window !== 'undefined' && window.console) {
      logFn[LOG_LEVEL_FATAL] = getLogFn(window.console.error);
      logFn[LOG_LEVEL_ERROR] = getLogFn(window.console.error);
      logFn[LOG_LEVEL_WARNING] = getLogFn(window.console.warn);
      logFn[LOG_LEVEL_INFO] = getLogFn(window.console.info);
      logFn[LOG_LEVEL_DEBUG] = getLogFn(window.console.debug);
    }
  }
  function getLogFn(fn) {
    if (fn && fn.bind) {
      return fn.bind(window.console);
    }
    // if not define, return the default function for reporting logs
    return window.console.log.bind(window.console);
  }

  /**
   * Retrieves a logger which can be used to write logging information in browser console.
   * @param {object} instance Object for which the logger is created. It is used
   * to include calle object information in log messages.
   * @memberof module:Debug
   * @returns {Logger}
   * @instance
   */
  function getLogger(instance) {
    return {
      fatal: fatal.bind(instance),
      error: error.bind(instance),
      warn: warn.bind(instance),
      info: info.bind(instance),
      debug: debug.bind(instance)
    };
  }

  /**
   * Prepends a timestamp in milliseconds to each log message.
   * @param {boolean} value Set to true if you want to see a timestamp in each log message.
   * @default LOG_LEVEL_WARNING
   * @memberof module:Debug
   * @instance
   */
  function setLogTimestampVisible(value) {
    showLogTimestamp = value;
  }

  /**
   * Prepends the callee object name, and media type if available, to each log message.
   * @param {boolean} value Set to true if you want to see the callee object name and media type in each log message.
   * @default true
   * @memberof module:Debug
   * @instance
   */
  function setCalleeNameVisible(value) {
    showCalleeName = value;
  }
  function fatal() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }
    doLog(LOG_LEVEL_FATAL, this, ...params);
  }
  function error() {
    for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }
    doLog(LOG_LEVEL_ERROR, this, ...params);
  }
  function warn() {
    for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      params[_key3] = arguments[_key3];
    }
    doLog(LOG_LEVEL_WARNING, this, ...params);
  }
  function info() {
    for (var _len4 = arguments.length, params = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      params[_key4] = arguments[_key4];
    }
    doLog(LOG_LEVEL_INFO, this, ...params);
  }
  function debug() {
    for (var _len5 = arguments.length, params = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      params[_key5] = arguments[_key5];
    }
    doLog(LOG_LEVEL_DEBUG, this, ...params);
  }
  function doLog(level, _this) {
    let message = '';
    let logTime = null;
    if (showLogTimestamp) {
      logTime = new Date().getTime();
      message += '[' + (logTime - startTime) + ']';
    }
    if (showCalleeName && _this && _this.getClassName) {
      message += '[' + _this.getClassName() + ']';
      if (_this.getType) {
        message += '[' + _this.getType() + ']';
      }
    }
    if (message.length > 0) {
      message += ' ';
    }
    for (var _len6 = arguments.length, params = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
      params[_key6 - 2] = arguments[_key6];
    }
    Array.apply(null, params).forEach(function (item) {
      message += item + ' ';
    });

    // log to console if the log level is high enough
    if (logFn[level] && settings && settings.get().debug.logLevel >= level) {
      logFn[level](message);
    }

    // send log event regardless of log level
    if (settings && settings.get().debug.dispatchEvent) {
      eventBus.trigger(_events_Events_js__WEBPACK_IMPORTED_MODULE_1__["default"].LOG, {
        message: message,
        level: level
      });
    }
  }
  instance = {
    getLogger: getLogger,
    setLogTimestampVisible: setLogTimestampVisible,
    setCalleeNameVisible: setCalleeNameVisible
  };
  setup();
  return instance;
}
Debug.__dashjs_factory_name = 'Debug';
const factory = _FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSingletonFactory(Debug);
factory.LOG_LEVEL_NONE = LOG_LEVEL_NONE;
factory.LOG_LEVEL_FATAL = LOG_LEVEL_FATAL;
factory.LOG_LEVEL_ERROR = LOG_LEVEL_ERROR;
factory.LOG_LEVEL_WARNING = LOG_LEVEL_WARNING;
factory.LOG_LEVEL_INFO = LOG_LEVEL_INFO;
factory.LOG_LEVEL_DEBUG = LOG_LEVEL_DEBUG;
_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].updateSingletonFactory(Debug.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/core/EventBus.js":
/*!******************************!*\
  !*** ./src/core/EventBus.js ***!
  \******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _streaming_MediaPlayerEvents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../streaming/MediaPlayerEvents.js */ "./src/streaming/MediaPlayerEvents.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


const EVENT_PRIORITY_LOW = 0;
const EVENT_PRIORITY_HIGH = 5000;
function EventBus() {
  let handlers = {};
  function _commonOn(type, listener, scope) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    let executeOnlyOnce = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    if (!type) {
      throw new Error('event type cannot be null or undefined');
    }
    if (!listener || typeof listener !== 'function') {
      throw new Error('listener must be a function: ' + listener);
    }
    let priority = options.priority || EVENT_PRIORITY_LOW;
    if (getHandlerIdx(type, listener, scope) >= 0) {
      return;
    }
    handlers[type] = handlers[type] || [];
    const handler = {
      callback: listener,
      scope,
      priority,
      executeOnlyOnce
    };
    if (scope && scope.getStreamId) {
      handler.streamId = scope.getStreamId();
    }
    if (scope && scope.getType) {
      handler.mediaType = scope.getType();
    }
    if (options && options.mode) {
      handler.mode = options.mode;
    }
    const inserted = handlers[type].some((item, idx) => {
      if (item && priority > item.priority) {
        handlers[type].splice(idx, 0, handler);
        return true;
      }
    });
    if (!inserted) {
      handlers[type].push(handler);
    }
  }
  function on(type, listener, scope) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    _commonOn(type, listener, scope, options);
  }
  function once(type, listener, scope) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    _commonOn(type, listener, scope, options, true);
  }
  function off(type, listener, scope) {
    if (!type || !listener || !handlers[type]) {
      return;
    }
    const idx = getHandlerIdx(type, listener, scope);
    if (idx < 0) {
      return;
    }
    handlers[type][idx] = null;
  }
  function trigger(type) {
    let payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!type || !handlers[type]) {
      return;
    }
    payload = payload || {};
    if (payload.hasOwnProperty('type')) {
      throw new Error('\'type\' is a reserved word for event dispatching');
    }
    payload.type = type;
    if (filters.streamId) {
      payload.streamId = filters.streamId;
    }
    if (filters.mediaType) {
      payload.mediaType = filters.mediaType;
    }
    const handlersToRemove = [];
    handlers[type].filter(handler => {
      if (!handler) {
        return false;
      }
      if (filters.streamId && handler.streamId && handler.streamId !== filters.streamId) {
        return false;
      }
      if (filters.mediaType && handler.mediaType && handler.mediaType !== filters.mediaType) {
        return false;
      }
      // This is used for dispatching DASH events. By default we use the onStart mode. Consequently we filter everything that has a non matching mode and the onReceive events for handlers that did not specify a mode.
      if (filters.mode && handler.mode && handler.mode !== filters.mode || !handler.mode && filters.mode && filters.mode === _streaming_MediaPlayerEvents_js__WEBPACK_IMPORTED_MODULE_1__["default"].EVENT_MODE_ON_RECEIVE) {
        return false;
      }
      return true;
    }).forEach(handler => {
      handler && handler.callback.call(handler.scope, payload);
      if (handler.executeOnlyOnce) {
        handlersToRemove.push(handler);
      }
    });
    handlersToRemove.forEach(handler => {
      off(type, handler.callback, handler.scope);
    });
  }
  function getHandlerIdx(type, listener, scope) {
    let idx = -1;
    if (!handlers[type]) {
      return idx;
    }
    handlers[type].some((item, index) => {
      if (item && item.callback === listener && (!scope || scope === item.scope)) {
        idx = index;
        return true;
      }
    });
    return idx;
  }
  function reset() {
    handlers = {};
  }
  const instance = {
    on,
    once,
    off,
    trigger,
    reset
  };
  return instance;
}
EventBus.__dashjs_factory_name = 'EventBus';
const factory = _FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(EventBus);
factory.EVENT_PRIORITY_LOW = EVENT_PRIORITY_LOW;
factory.EVENT_PRIORITY_HIGH = EVENT_PRIORITY_HIGH;
_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].updateSingletonFactory(EventBus.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/core/FactoryMaker.js":
/*!**********************************!*\
  !*** ./src/core/FactoryMaker.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @module FactoryMaker
 * @ignore
 */
const FactoryMaker = function () {
  let instance;
  let singletonContexts = [];
  const singletonFactories = {};
  const classFactories = {};
  function extend(name, childInstance, override, context) {
    if (!context[name] && childInstance) {
      context[name] = {
        instance: childInstance,
        override: override
      };
    }
  }

  /**
   * Use this method from your extended object.  this.factory is injected into your object.
   * this.factory.getSingletonInstance(this.context, 'VideoModel')
   * will return the video model for use in the extended object.
   *
   * @param {Object} context - injected into extended object as this.context
   * @param {string} className - string name found in all dash.js objects
   * with name __dashjs_factory_name Will be at the bottom. Will be the same as the object's name.
   * @returns {*} Context aware instance of specified singleton name.
   * @memberof module:FactoryMaker
   * @instance
   */
  function getSingletonInstance(context, className) {
    for (const i in singletonContexts) {
      const obj = singletonContexts[i];
      if (obj.context === context && obj.name === className) {
        return obj.instance;
      }
    }
    return null;
  }

  /**
   * Use this method to add an singleton instance to the system.  Useful for unit testing to mock objects etc.
   *
   * @param {Object} context
   * @param {string} className
   * @param {Object} instance
   * @memberof module:FactoryMaker
   * @instance
   */
  function setSingletonInstance(context, className, instance) {
    for (const i in singletonContexts) {
      const obj = singletonContexts[i];
      if (obj.context === context && obj.name === className) {
        singletonContexts[i].instance = instance;
        return;
      }
    }
    singletonContexts.push({
      name: className,
      context: context,
      instance: instance
    });
  }

  /**
   * Use this method to remove all singleton instances associated with a particular context.
   *
   * @param {Object} context
   * @memberof module:FactoryMaker
   * @instance
   */
  function deleteSingletonInstances(context) {
    singletonContexts = singletonContexts.filter(x => x.context !== context);
  }

  /*------------------------------------------------------------------------------------------*/

  // Factories storage Management

  /*------------------------------------------------------------------------------------------*/

  function getFactoryByName(name, factoriesArray) {
    return factoriesArray[name];
  }
  function updateFactory(name, factory, factoriesArray) {
    if (name in factoriesArray) {
      factoriesArray[name] = factory;
    }
  }

  /*------------------------------------------------------------------------------------------*/

  // Class Factories Management

  /*------------------------------------------------------------------------------------------*/

  function updateClassFactory(name, factory) {
    updateFactory(name, factory, classFactories);
  }
  function getClassFactoryByName(name) {
    return getFactoryByName(name, classFactories);
  }
  function getClassFactory(classConstructor) {
    let factory = getFactoryByName(classConstructor.__dashjs_factory_name, classFactories);
    if (!factory) {
      factory = function (context) {
        if (context === undefined) {
          context = {};
        }
        return {
          create: function () {
            return merge(classConstructor, context, arguments);
          }
        };
      };
      classFactories[classConstructor.__dashjs_factory_name] = factory; // store factory
    }
    return factory;
  }

  /*------------------------------------------------------------------------------------------*/

  // Singleton Factory MAangement

  /*------------------------------------------------------------------------------------------*/

  function updateSingletonFactory(name, factory) {
    updateFactory(name, factory, singletonFactories);
  }
  function getSingletonFactoryByName(name) {
    return getFactoryByName(name, singletonFactories);
  }
  function getSingletonFactory(classConstructor) {
    let factory = getFactoryByName(classConstructor.__dashjs_factory_name, singletonFactories);
    if (!factory) {
      factory = function (context) {
        let instance;
        if (context === undefined) {
          context = {};
        }
        return {
          getInstance: function () {
            // If we don't have an instance yet check for one on the context
            if (!instance) {
              instance = getSingletonInstance(context, classConstructor.__dashjs_factory_name);
            }
            // If there's no instance on the context then create one
            if (!instance) {
              instance = merge(classConstructor, context, arguments);
              singletonContexts.push({
                name: classConstructor.__dashjs_factory_name,
                context: context,
                instance: instance
              });
            }
            return instance;
          }
        };
      };
      singletonFactories[classConstructor.__dashjs_factory_name] = factory; // store factory
    }
    return factory;
  }
  function merge(classConstructor, context, args) {
    let classInstance;
    const className = classConstructor.__dashjs_factory_name;
    const extensionObject = context[className];
    if (extensionObject) {
      let extension = extensionObject.instance;
      if (extensionObject.override) {
        //Override public methods in parent but keep parent.

        classInstance = classConstructor.apply({
          context
        }, args);
        extension = extension.apply({
          context,
          factory: instance,
          parent: classInstance
        }, args);
        for (const prop in extension) {
          if (classInstance.hasOwnProperty(prop)) {
            classInstance[prop] = extension[prop];
          }
        }
      } else {
        //replace parent object completely with new object. Same as dijon.

        return extension.apply({
          context,
          factory: instance
        }, args);
      }
    } else {
      // Create new instance of the class
      classInstance = classConstructor.apply({
        context
      }, args);
    }

    // Add getClassName function to class instance prototype (used by Debug)
    classInstance.getClassName = function () {
      return className;
    };
    return classInstance;
  }
  instance = {
    extend: extend,
    getSingletonInstance: getSingletonInstance,
    setSingletonInstance: setSingletonInstance,
    deleteSingletonInstances: deleteSingletonInstances,
    getSingletonFactory: getSingletonFactory,
    getSingletonFactoryByName: getSingletonFactoryByName,
    updateSingletonFactory: updateSingletonFactory,
    getClassFactory: getClassFactory,
    getClassFactoryByName: getClassFactoryByName,
    updateClassFactory: updateClassFactory
  };
  return instance;
}();
/* harmony default export */ __webpack_exports__["default"] = (FactoryMaker);

/***/ }),

/***/ "./src/core/Settings.js":
/*!******************************!*\
  !*** ./src/core/Settings.js ***!
  \******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils.js */ "./src/core/Utils.js");
/* harmony import */ var _core_Debug_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Debug.js */ "./src/core/Debug.js");
/* harmony import */ var _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../streaming/constants/Constants.js */ "./src/streaming/constants/Constants.js");
/* harmony import */ var _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../streaming/vo/metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _EventBus_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventBus.js */ "./src/core/EventBus.js");
/* harmony import */ var _events_Events_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./events/Events.js */ "./src/core/events/Events.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */








/** @module Settings
 * @description Define the configuration parameters of Dash.js MediaPlayer.
 * @see {@link module:Settings~PlayerSettings PlayerSettings} for further information about the supported configuration properties.
 */

/**
 * @typedef {Object} PlayerSettings
 * @property {module:Settings~DebugSettings} [debug]
 * Debug related settings.
 * @property {module:Settings~ErrorSettings} [errors]
 * Error related settings
 * @property {module:Settings~StreamingSettings} [streaming]
 * Streaming related settings.
 * @example
 *
 * // Full settings object
 * settings = {
 *        debug: {
 *            logLevel: Debug.LOG_LEVEL_WARNING,
 *            dispatchEvent: false
 *        },
 *        streaming: {
 *            abandonLoadTimeout: 10000,
 *            wallclockTimeUpdateInterval: 100,
 *            manifestUpdateRetryInterval: 100,
 *            liveUpdateTimeThresholdInMilliseconds: 0,
 *            cacheInitSegments: false,
 *            applyServiceDescription: true,
 *            applyProducerReferenceTime: true,
 *            applyContentSteering: true,
 *            enableManifestDurationMismatchFix: true,
 *            parseInbandPrft: false,
 *            enableManifestTimescaleMismatchFix: false,
 *            capabilities: {
 *               filterUnsupportedEssentialProperties: true,
 *               supportedEssentialProperties: [
 *                   { schemeIdUri: Constants.FONT_DOWNLOAD_DVB_SCHEME },
 *                   { schemeIdUri: Constants.COLOUR_PRIMARIES_SCHEME_ID_URI, value: /1|5|6|7/ },
 *                   { schemeIdUri: Constants.URL_QUERY_INFO_SCHEME },
 *                   { schemeIdUri: Constants.EXT_URL_QUERY_INFO_SCHEME },
 *                   { schemeIdUri: Constants.MATRIX_COEFFICIENTS_SCHEME_ID_URI, value: /0|1|5|6/ },
 *                   { schemeIdUri: Constants.TRANSFER_CHARACTERISTICS_SCHEME_ID_URI, value: /1|6|13|14|15/ },
 *                   ...Constants.THUMBNAILS_SCHEME_ID_URIS.map(ep => { return { 'schemeIdUri': ep }; })
 *               ],
 *               useMediaCapabilitiesApi: true,
 *               filterVideoColorimetryEssentialProperties: false,
 *               filterHDRMetadataFormatEssentialProperties: false
 *            },
 *            events: {
 *              eventControllerRefreshDelay: 100,
 *              deleteEventMessageDataTimeout: 10000
 *            }
 *            timeShiftBuffer: {
 *                calcFromSegmentTimeline: false,
 *                fallbackToSegmentTimeline: true
 *            },
 *            metrics: {
 *              maxListDepth: 100
 *            },
 *            delay: {
 *                liveDelayFragmentCount: NaN,
 *                liveDelay: NaN,
 *                useSuggestedPresentationDelay: true
 *            },
 *            protection: {
 *                keepProtectionMediaKeys: false,
 *                ignoreEmeEncryptedEvent: false,
 *                detectPlayreadyMessageFormat: true,
 *                ignoreKeyStatuses: false
 *            },
 *            buffer: {
 *                enableSeekDecorrelationFix: false,
 *                fastSwitchEnabled: true,
 *                flushBufferAtTrackSwitch: false,
 *                reuseExistingSourceBuffers: true,
 *                bufferPruningInterval: 10,
 *                bufferToKeep: 20,
 *                bufferTimeAtTopQuality: 30,
 *                bufferTimeAtTopQualityLongForm: 60,
 *                initialBufferLevel: NaN,
 *                bufferTimeDefault: 18,
 *                longFormContentDurationThreshold: 600,
 *                stallThreshold: 0.3,
 *                lowLatencyStallThreshold: 0.3,
 *                useAppendWindow: true,
 *                setStallState: true,
 *                avoidCurrentTimeRangePruning: false,
 *                useChangeType: true,
 *                mediaSourceDurationInfinity: true,
 *                resetSourceBuffersForTrackSwitch: false,
 *                syntheticStallEvents: {
 *                    enabled: false,
 *                    ignoreReadyState: false
 *                }
 *            },
 *            gaps: {
 *                jumpGaps: true,
 *                jumpLargeGaps: true,
 *                smallGapLimit: 1.5,
 *                threshold: 0.3,
 *                enableSeekFix: true,
 *                enableStallFix: false,
 *                stallSeek: 0.1
 *            },
 *            utcSynchronization: {
 *                enabled: true,
 *                useManifestDateHeaderTimeSource: true,
 *                backgroundAttempts: 2,
 *                timeBetweenSyncAttempts: 30,
 *                maximumTimeBetweenSyncAttempts: 600,
 *                minimumTimeBetweenSyncAttempts: 2,
 *                timeBetweenSyncAttemptsAdjustmentFactor: 2,
 *                maximumAllowedDrift: 100,
 *                enableBackgroundSyncAfterSegmentDownloadError: true,
 *                defaultTimingSource: {
 *                    scheme: 'urn:mpeg:dash:utc:http-xsdate:2014',
 *                    value: 'http://time.akamai.com/?iso&ms'
 *                }
 *            },
 *            scheduling: {
 *                defaultTimeout: 500,
 *                lowLatencyTimeout: 0,
 *                scheduleWhilePaused: true
 *            },
 *            text: {
 *                defaultEnabled: true,
 *                dispatchForManualRendering: false,
 *                extendSegmentedCues: true,
 *                imsc: {
 *                    displayForcedOnlyMode: false,
 *                    enableRollUp: true
 *                },
 *                webvtt: {
 *                    customRenderingEnabled: false
 *                }
 *            },
 *            liveCatchup: {
 *                maxDrift: NaN,
 *                playbackRate: {min: NaN, max: NaN},
 *                playbackBufferMin: 0.5,
 *                enabled: null,
 *                mode: Constants.LIVE_CATCHUP_MODE_DEFAULT
 *            },
 *            lastBitrateCachingInfo: { enabled: true, ttl: 360000 },
 *            lastMediaSettingsCachingInfo: { enabled: true, ttl: 360000 },
 *            saveLastMediaSettingsForCurrentStreamingSession: true,
 *            cacheLoadThresholds: { video: 10, audio: 5 },
 *            trackSwitchMode: {
 *                audio: Constants.TRACK_SWITCH_MODE_ALWAYS_REPLACE,
 *                video: Constants.TRACK_SWITCH_MODE_NEVER_REPLACE
 *            },
 *            ignoreSelectionPriority: false,
 *            prioritizeRoleMain: true,
 *            assumeDefaultRoleAsMain: true,
 *            selectionModeForInitialTrack: Constants.TRACK_SELECTION_MODE_HIGHEST_EFFICIENCY,
 *            fragmentRequestTimeout: 20000,
 *            fragmentRequestProgressTimeout: -1,
 *            manifestRequestTimeout: 10000,
 *            retryIntervals: {
 *                [HTTPRequest.MPD_TYPE]: 500,
 *                [HTTPRequest.XLINK_EXPANSION_TYPE]: 500,
 *                [HTTPRequest.MEDIA_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.INIT_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.INDEX_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE]: 1000,
 *                [HTTPRequest.LICENSE]: 1000,
 *                [HTTPRequest.OTHER_TYPE]: 1000,
 *                lowLatencyReductionFactor: 10
 *            },
 *            retryAttempts: {
 *                [HTTPRequest.MPD_TYPE]: 3,
 *                [HTTPRequest.XLINK_EXPANSION_TYPE]: 1,
 *                [HTTPRequest.MEDIA_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.INIT_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.INDEX_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE]: 3,
 *                [HTTPRequest.LICENSE]: 3,
 *                [HTTPRequest.OTHER_TYPE]: 3,
 *                lowLatencyMultiplyFactor: 5
 *            },
 *             abr: {
 *                 limitBitrateByPortal: false,
 *                 usePixelRatioInLimitBitrateByPortal: false,
 *                rules: {
 *                     throughputRule: {
 *                         active: true
 *                     },
 *                     bolaRule: {
 *                         active: true
 *                     },
 *                     insufficientBufferRule: {
 *                         active: true,
 *                         parameters: {
 *                             throughputSafetyFactor: 0.7,
 *                             segmentIgnoreCount: 2
 *                         }
 *                     },
 *                     switchHistoryRule: {
 *                         active: true,
 *                         parameters: {
 *                             sampleSize: 8,
 *                             switchPercentageThreshold: 0.075
 *                         }
 *                     },
 *                     droppedFramesRule: {
 *                         active: true,
 *                         parameters: {
 *                             minimumSampleSize: 375,
 *                             droppedFramesPercentageThreshold: 0.15
 *                         }
 *                     },
 *                     abandonRequestsRule: {
 *                         active: true,
 *                         parameters: {
 *                             abandonDurationMultiplier: 1.8,
 *                             minSegmentDownloadTimeThresholdInMs: 500,
 *                             minThroughputSamplesThreshold: 6
 *                         }
 *                     },
 *                     l2ARule: {
 *                         active: false
 *                     },
 *                     loLPRule: {
 *                         active: false
 *                     }
 *                 },
 *                 throughput: {
 *                     averageCalculationMode: Constants.THROUGHPUT_CALCULATION_MODES.EWMA,
 *                     lowLatencyDownloadTimeCalculationMode: Constants.LOW_LATENCY_DOWNLOAD_TIME_CALCULATION_MODE.MOOF_PARSING,
 *                     useResourceTimingApi: true,
 *                     useNetworkInformationApi: {
 *                         xhr: false,
 *                         fetch: false
 *                     },
 *                     useDeadTimeLatency: true,
 *                     bandwidthSafetyFactor: 0.9,
 *                     sampleSettings: {
 *                         live: 3,
 *                         vod: 4,
 *                         enableSampleSizeAdjustment: true,
 *                         decreaseScale: 0.7,
 *                         increaseScale: 1.3,
 *                         maxMeasurementsToKeep: 20,
 *                         averageLatencySampleAmount: 4,
 *                     },
 *                     ewma: {
 *                         throughputSlowHalfLifeSeconds: 8,
 *                         throughputFastHalfLifeSeconds: 3,
 *                         latencySlowHalfLifeCount: 2,
 *                         latencyFastHalfLifeCount: 1,
 *                         weightDownloadTimeMultiplicationFactor: 0.0015
 *                     }
 *                 },
 *                 maxBitrate: {
 *                     audio: -1,
 *                     video: -1
 *                 },
 *                 minBitrate: {
 *                     audio: -1,
 *                     video: -1
 *                 },
 *                 initialBitrate: {
 *                     audio: -1,
 *                     video: -1
 *                 },
 *                 autoSwitchBitrate: {
 *                     audio: true,
 *                     video: true
 *                 }
 *             },
 *            cmcd: {
 *                enabled: false,
 *                sid: null,
 *                cid: null,
 *                rtp: null,
 *                rtpSafetyFactor: 5,
 *                mode: Constants.CMCD_MODE_QUERY,
 *                enabledKeys: ['br', 'd', 'ot', 'tb' , 'bl', 'dl', 'mtp', 'nor', 'nrr', 'su' , 'bs', 'rtp' , 'cid', 'pr', 'sf', 'sid', 'st', 'v']
 *                includeInRequests: ['segment', 'mpd'],
 *                version: 1
 *            },
 *            cmsd: {
 *                enabled: false,
 *                abr: {
 *                    applyMb: false,
 *                    etpWeightRatio: 0
 *                }
 *            },
 *            defaultSchemeIdUri: {
 *                viewpoint: '',
 *                audioChannelConfiguration: 'urn:mpeg:mpegB:cicp:ChannelConfiguration',
 *                role: 'urn:mpeg:dash:role:2011',
 *                accessibility: 'urn:mpeg:dash:role:2011'
 *            }
 *          },
 *          errors: {
 *            recoverAttempts: {
 *                mediaErrorDecode: 5
 *             }
 *          }
 * }
 */

/**
 * @typedef {Object} TimeShiftBuffer
 * @property {boolean} [calcFromSegmentTimeline=false]
 * Enable calculation of the DVR window for SegmentTimeline manifests based on the entries in \<SegmentTimeline\>.
 *  * @property {boolean} [fallbackToSegmentTimeline=true]
 * In case the MPD uses \<SegmentTimeline\ and no segment is found within the DVR window the DVR window is calculated based on the entries in \<SegmentTimeline\>.
 */

/**
 * @typedef {Object} EventSettings
 * @property {number} [eventControllerRefreshDelay=100]
 * Interval timer used by the EventController to check if events need to be triggered or removed.
 * @property {number} [deleteEventMessageDataTimeout=10000]
 * If this value is larger than -1 the EventController will delete the message data attributes of events after they have been started and dispatched to the application.
 * This is to save memory in case events have a long duration and need to be persisted in the EventController.
 * This parameter defines the time in milliseconds between the start of an event and when the message data is deleted.
 * If an event is dispatched for the second time (e.g. when the user seeks back) the message data will not be included in the dispatched event if it has been deleted already.
 * Set this value to -1 to not delete any message data.
 */

/**
 * @typedef {Object} LiveDelay
 * @property {number} [liveDelayFragmentCount=NaN]
 * Changing this value will lower or increase live stream latency.
 *
 * The detected segment duration will be multiplied by this value to define a time in seconds to delay a live stream from the live edge.
 *
 * Lowering this value will lower latency but may decrease the player's ability to build a stable buffer.
 * @property {number} [liveDelay=NaN]
 * Equivalent in seconds of setLiveDelayFragmentCount.
 *
 * Lowering this value will lower latency but may decrease the player's ability to build a stable buffer.
 *
 * This value should be less than the manifest duration by a couple of segment durations to avoid playback issues.
 *
 * If set, this parameter will take precedence over setLiveDelayFragmentCount and manifest info.
 * @property {boolean} [useSuggestedPresentationDelay=true]
 * Set to true if you would like to overwrite the default live delay and honor the SuggestedPresentationDelay attribute in by the manifest.
 */

/**
 * @typedef {Object} Buffer
 * @property {boolean} [enableSeekDecorrelationFix=false]
 * Enables a workaround for playback start on some devices, e.g. WebOS 4.9.
 * It is necessary because some browsers do not support setting currentTime on video element to a value that is outside of current buffer.
 *
 * If you experience unexpected seeking triggered by BufferController, you can try setting this value to false.

 * @property {boolean} [fastSwitchEnabled=true]
 * When enabled, after an ABR up-switch in quality, instead of requesting and appending the next fragment at the end of the current buffer range it is requested and appended closer to the current time.
 *
 * When enabled, The maximum time to render a higher quality is current time + (1.5 * fragment duration).
 *
 * Note, When ABR down-switch is detected, we appended the lower quality at the end of the buffer range to preserve the
 * higher quality media for as long as possible.
 *
 * If enabled, it should be noted there are a few cases when the client will not replace inside buffer range but rather just append at the end.
 * 1. When the buffer level is less than one fragment duration.
 * 2. The client is in an Abandonment State due to recent fragment abandonment event.
 *
 * Known issues:
 * 1. In IE11 with auto switching off, if a user switches to a quality they can not download in time the fragment may be appended in the same range as the playhead or even in the past, in IE11 it may cause a stutter or stall in playback.
 * @property {boolean} [flushBufferAtTrackSwitch=false]
 * When enabled, after a track switch and in case buffer is being replaced, the video element is flushed (seek at current playback time) once a segment of the new track is appended in buffer in order to force video decoder to play new track.
 *
 * This can be required on some devices like GoogleCast devices to make track switching functional.
 *
 * Otherwise, track switching will be effective only once after previous buffered track is fully consumed.
 * @property {boolean} [reuseExistingSourceBuffers=true]
 * Enable reuse of existing MediaSource Sourcebuffers during period transition.
 * @property {number} [bufferPruningInterval=10]
 * The interval of pruning buffer in seconds.
 * @property {number} [bufferToKeep=20]
 * This value influences the buffer pruning logic.
 *
 * Allows you to modify the buffer that is kept in source buffer in seconds.
 * 0|-----------bufferToPrune-----------|-----bufferToKeep-----|currentTime|
 * @property {number} [bufferTimeDefault=18]
 * The time that the internal buffer target will be set to when not playing at the top quality.
 * @property {number} [bufferTimeAtTopQuality=30]
 * The time that the internal buffer target will be set to once playing the top quality.
 *
 * If there are multiple bitrates in your adaptation, and the media is playing at the highest bitrate, then we try to build a larger buffer at the top quality to increase stability and to maintain media quality.
 * @property {number} [bufferTimeAtTopQualityLongForm=60]
 * The time that the internal buffer target will be set to once playing the top quality for long form content.
 * @property {number} [longFormContentDurationThreshold=600]
 * The threshold which defines if the media is considered long form content.
 *
 * This will directly affect the buffer targets when playing back at the top quality.
 * @property {number} [initialBufferLevel=NaN]
 * Initial buffer level before playback starts
 * @property {number} [stallThreshold=0.3]
 * Stall threshold used in BufferController.js to determine whether a track should still be changed and which buffer range to prune.
 * @property {number} [lowLatencyStallThreshold=0.3]
 * Low Latency stall threshold used in BufferController.js to determine whether a track should still be changed and which buffer range to prune.
 * @property {boolean} [useAppendWindow=true]
 * Specifies if the appendWindow attributes of the MSE SourceBuffers should be set according to content duration from manifest.
 * @property {boolean} [setStallState=true]
 * Specifies if we fire manual waiting events once the stall threshold is reached.
 * @property {module:Settings~SyntheticStallSettings} [syntheticStallEvents]
 * Specifies if manual stall events are to be fired once the stall threshold is reached.
 * @property {boolean} [avoidCurrentTimeRangePruning=false]
 * Avoids pruning of the buffered range that contains the current playback time.
 *
 * That buffered range is likely to have been enqueued for playback. Pruning it causes a flush and reenqueue in WPE and WebKitGTK based browsers. This stresses the video decoder and can cause stuttering on embedded platforms.
 * @property {boolean} [useChangeType=true]
 * If this flag is set to true then dash.js will use the MSE v.2 API call "changeType()" before switching to a different codec family.
 * Note that some platforms might not implement the changeType function. dash.js is checking for the availability before trying to call it.
 * @property {boolean} [mediaSourceDurationInfinity=true]
 * If this flag is set to true then dash.js will allow `Infinity` to be set as the MediaSource duration otherwise the duration will be set to `Math.pow(2,32)` instead of `Infinity` to allow appending segments indefinitely.
 * Some platforms such as WebOS 4.x have issues with seeking when duration is set to `Infinity`, setting this flag to false resolve this.
 * @property {boolean} [resetSourceBuffersForTrackSwitch=false]
 * When switching to a track that is not compatible with the currently active MSE SourceBuffers, MSE will be reset. This happens when we switch codecs on a system
 * that does not properly implement "changeType()", such as webOS 4.0 and before.
 */

/**
 * @typedef {Object} module:Settings~AudioVideoSettings
 * @property {number|boolean|string} [audio]
 * Configuration for audio media type of tracks.
 * @property {number|boolean|string} [video]
 * Configuration for video media type of tracks.
 */

/**
 * @typedef {Object} module:Settings~SyntheticStallSettings
 * @property {boolean} [enabled]
 * Enables manual stall events and sets the playback rate to 0 once the stall threshold is reached.
 * @property {boolean} [ignoreReadyState]
 * Ignore the media element's ready state when entering or exiting a stall.
 * Enable this when either of these scenarios still occur with synthetic stalls enabled:
 * - If the buffer is empty, but playback is not stalled.
 * - If playback resumes, but a playing event isn't reported.
 */

/**
 * @typedef {Object} DebugSettings
 * @property {number} [logLevel=dashjs.Debug.LOG_LEVEL_WARNING]
 * Sets up the log level. The levels are cumulative.
 *
 * For example, if you set the log level to dashjs.Debug.LOG_LEVEL_WARNING all warnings, errors and fatals will be logged.
 *
 * Possible values.
 *
 * - dashjs.Debug.LOG_LEVEL_NONE
 * No message is written in the browser console.
 *
 * - dashjs.Debug.LOG_LEVEL_FATAL
 * Log fatal errors.
 * An error is considered fatal when it causes playback to fail completely.
 *
 * - dashjs.Debug.LOG_LEVEL_ERROR
 * Log error messages.
 *
 * - dashjs.Debug.LOG_LEVEL_WARNING
 * Log warning messages.
 *
 * - dashjs.Debug.LOG_LEVEL_INFO
 * Log info messages.
 *
 * - dashjs.Debug.LOG_LEVEL_DEBUG
 * Log debug messages.
 * @property {boolean} [dispatchEvent=false]
 * Enable to trigger a Events.LOG event whenever log output is generated.
 *
 * Note this will be dispatched regardless of log level.
 */

/**
 * @typedef {Object} module:Settings~ErrorSettings
 * @property {object} [recoverAttempts={mediaErrorDecode: 5}]
 * Defines the maximum number of recover attempts for specific media errors.
 *
 * For mediaErrorDecode the player will reset the MSE and skip the blacklisted segment that caused the decode error. The resulting gap will be handled by the GapController.
 */

/**
 * @typedef {Object} CachingInfoSettings
 * @property {boolean} [enable]
 * Enable or disable the caching feature.
 * @property {number} [ttl]
 * Time to live.
 *
 * A value defined in milliseconds representing how log to cache the settings for.
 */

/**
 * @typedef {Object} Gaps
 * @property {boolean} [jumpGaps=true]
 * Sets whether player should jump small gaps (discontinuities) in the buffer.
 * @property {boolean} [jumpLargeGaps=true]
 * Sets whether player should jump large gaps (discontinuities) in the buffer.
 * @property {number} [smallGapLimit=1.5]
 * Time in seconds for a gap to be considered small.
 * @property {number} [threshold=0.3]
 * Threshold at which the gap handling is executed. If currentRangeEnd - currentTime < threshold the gap jump will be triggered.
 * For live stream the jump might be delayed to keep a consistent live edge.
 * Note that the amount of buffer at which platforms automatically stall might differ.
 * @property {boolean} [enableSeekFix=true]
 * Enables the adjustment of the seek target once no valid segment request could be generated for a specific seek time. This can happen if the user seeks to a position for which there is a gap in the timeline.
 * @property {boolean} [enableStallFix=false]
 * If playback stalled in a buffered range this fix will perform a seek by the value defined in stallSeek to trigger playback again.
 * @property {number} [stallSeek=0.1]
 * Value to be used in case enableStallFix is set to true
 */

/**
 * @typedef {Object} UtcSynchronizationSettings
 * @property {boolean} [enabled=true]
 * Enables or disables the UTC clock synchronization
 * @property {boolean} [useManifestDateHeaderTimeSource=true]
 * Allows you to enable the use of the Date Header, if exposed with CORS, as a timing source for live edge detection.
 *
 * The use of the date header will happen only after the other timing source that take precedence fail or are omitted as described.
 * @property {number} [backgroundAttempts=2]
 * Number of synchronization attempts to perform in the background after an initial synchronization request has been done. This is used to verify that the derived client-server offset is correct.
 *
 * The background requests are async and done in parallel to the start of the playback.
 *
 * This value is also used to perform a resync after 404 errors on segments.
 * @property {number} [timeBetweenSyncAttempts=30]
 * The time in seconds between two consecutive sync attempts.
 *
 * Note: This value is used as an initial starting value. The internal value of the TimeSyncController is adjusted during playback based on the drift between two consecutive synchronization attempts.
 *
 * Note: A sync is only performed after an MPD update. In case the @minimumUpdatePeriod is larger than this value the sync will be delayed until the next MPD update.
 * @property {number} [maximumTimeBetweenSyncAttempts=600]
 * The maximum time in seconds between two consecutive sync attempts.
 *
 * @property {number} [minimumTimeBetweenSyncAttempts=2]
 * The minimum time in seconds between two consecutive sync attempts.
 *
 * @property {number} [timeBetweenSyncAttemptsAdjustmentFactor=2]
 * The factor used to multiply or divide the timeBetweenSyncAttempts parameter after a sync. The maximumAllowedDrift defines whether this value is used as a factor or a dividend.
 *
 * @property {number} [maximumAllowedDrift=100]
 * The maximum allowed drift specified in milliseconds between two consecutive synchronization attempts.
 *
 * @property {boolean} [enableBackgroundSyncAfterSegmentDownloadError=true]
 * Enables or disables the background sync after the player ran into a segment download error.
 *
 * @property {object} [defaultTimingSource={scheme:'urn:mpeg:dash:utc:http-xsdate:2014',value: 'http://time.akamai.com/?iso&ms'}]
 * The default timing source to be used. The timing sources in the MPD take precedence over this one.
 */

/**
 * @typedef {Object} Scheduling
 * @property {number} [defaultTimeout=500]
 * Default timeout between two consecutive segment scheduling attempts
 * @property {number} [lowLatencyTimeout=0]
 * Default timeout between two consecutive low-latency segment scheduling attempts
 * @property {boolean} [scheduleWhilePaused=true]
 * Set to true if you would like dash.js to keep downloading fragments in the background when the video element is paused.
 */

/**
 * @typedef {Object} Text
 * @property {boolean} [defaultEnabled=true]
 * Enable/disable subtitle rendering by default.
 * @property {boolean} [dispatchForManualRendering=false]
 * Enable/disable firing of CueEnter/CueExt events. This will disable the display of subtitles and should be used when you want to have full control about rendering them.
 * @property {boolean} [extendSegmentedCues=true]
 * Enable/disable patching of segmented cues in order to merge as a single cue by extending cue end time.
 * @property {boolean} [imsc.displayForcedOnlyMode=false]
 * Enable/disable forced only mode in IMSC captions.
 * When true, only those captions where itts:forcedDisplay="true" will be displayed.
 * @property {boolean} [imsc.enableRollUp=true]
 * Enable/disable rollUp style display of IMSC captions.
 * @property {object} [webvtt.customRenderingEnabled=false]
 * Enables the custom rendering for WebVTT captions. For details refer to the "Subtitles and Captions" sample section of dash.js.
 * Custom WebVTT rendering requires the external library vtt.js that can be found in the contrib folder.
 */

/**
 * @typedef {Object} LiveCatchupSettings
 * @property {number} [maxDrift=NaN]
 * Use this method to set the maximum latency deviation allowed before dash.js to do a seeking to live position.
 *
 * In low latency mode, when the difference between the measured latency and the target one, as an absolute number, is higher than the one sets with this method, then dash.js does a seek to live edge position minus the target live delay.
 *
 * LowLatencyMaxDriftBeforeSeeking should be provided in seconds.
 *
 * If 0, then seeking operations won't be used for fixing latency deviations.
 *
 * Note: Catch-up mechanism is only applied when playing low latency live streams.
 * @property {number} [playbackRate={min: NaN, max: NaN}]
 * Use this parameter to set the minimum and maximum catch up rates, as percentages, for low latency live streams.
 *
 * In low latency mode, when measured latency is higher/lower than the target one, dash.js increases/decreases playback rate respectively up to (+/-) the percentage defined with this method until target is reached.
 *
 * Valid values for min catch up rate are in the range -0.5 to 0 (-50% to 0% playback rate decrease)
 *
 * Valid values for max catch up rate are in the range 0 to 1 (0% to 100% playback rate increase).
 *
 * Set min and max to NaN to turn off live catch up feature.
 *
 * These playback rate limits take precedence over any PlaybackRate values in ServiceDescription elements in an MPD. If only one of the min/max properties is given a value, the property without a value will not fall back to a ServiceDescription value. Its default value of NaN will be used.
 *
 * Note: Catch-up mechanism is only applied when playing low latency live streams.
 * @property {number} [playbackBufferMin=0.5]
 * Use this parameter to specify the minimum buffer which is used for LoL+ based playback rate reduction.
 *
 *
 * @property {boolean} [enabled=null]
 * Use this parameter to enable the catchup mode for non low-latency streams.
 *
 * @property {string} [mode="liveCatchupModeDefault"]
 * Use this parameter to switch between different catchup modes.
 *
 * Options: "liveCatchupModeDefault" or "liveCatchupModeLOLP".
 *
 * Note: Catch-up mechanism is automatically applied when playing low latency live streams.
 */

/**
 * @typedef {Object} RequestTypeSettings
 * @property {number} [MPD]
 * Manifest type of requests.
 * @property {number} [XLinkExpansion]
 * XLink expansion type of requests.
 * @property {number} [InitializationSegment]
 * Request to retrieve an initialization segment.
 * @property {number} [IndexSegment]
 * Request to retrieve an index segment (SegmentBase).
 * @property {number} [MediaSegment]
 * Request to retrieve a media segment (video/audio/image/text chunk).
 * @property {number} [BitstreamSwitchingSegment]
 * Bitrate stream switching type of request.
 * @property {number} [FragmentInfoSegment]
 * Request to retrieve a FragmentInfo segment (specific to Smooth Streaming live streams).
 * @property {number} [other]
 * Other type of request.
 * @property {number} [lowLatencyReductionFactor]
 * For low latency mode, values of type of request are divided by lowLatencyReductionFactor.
 *
 * Note: It's not type of request.
 * @property {number} [lowLatencyMultiplyFactor]
 * For low latency mode, values of type of request are multiplied by lowLatencyMultiplyFactor.
 *
 * Note: It's not type of request.
 */

/**
 * @typedef {Object} Protection
 * @property {boolean} [keepProtectionMediaKeys=false]
 * Set the value for the ProtectionController and MediaKeys life cycle.
 *
 * If true, the ProtectionController and then created MediaKeys and MediaKeySessions will be preserved during the MediaPlayer lifetime.
 * @property {boolean} [ignoreEmeEncryptedEvent=false]
 * If set to true the player will ignore "encrypted" and "needkey" events thrown by the EME.
 *
 * @property {boolean} [detectPlayreadyMessageFormat=true]
 * If set to true the player will use the raw unwrapped message from the Playready CDM
 *
 * @property {boolean} [ignoreKeyStatuses=false]
 * If set to true the player will ignore the status of a key and try to play the corresponding track regardless whether the key is usable or not.
 */

/**
 * @typedef {Object} Capabilities
 * @property {boolean} [filterUnsupportedEssentialProperties=true]
 * Enable to filter all the AdaptationSets and Representations which contain an unsupported \<EssentialProperty\> element.
 * @property {Array.<string>} [supportedEssentialProperties]
 * List of supported \<EssentialProperty\> elements
 * @property {boolean} [useMediaCapabilitiesApi=true]
 * Enable to use the MediaCapabilities API to check whether codecs are supported. If disabled MSE.isTypeSupported will be used instead.
 * @property {boolean} [filterVideoColorimetryEssentialProperties=false]
 * Enable dash.js to query MediaCapabilities API for signalled Colorimetry EssentialProperties (per schemeIdUris: 'urn:mpeg:mpegB:cicp:ColourPrimaries', 'urn:mpeg:mpegB:cicp:TransferCharacteristics').
 * If disabled, registered properties per supportedEssentialProperties will be allowed without any further checking (including 'urn:mpeg:mpegB:cicp:MatrixCoefficients').
 * @property {boolean} [filterHDRMetadataFormatEssentialProperties=false]
 * Enable dash.js to query MediaCapabilities API for signalled HDR-MetadataFormat EssentialProperty (per schemeIdUri:'urn:dvb:dash:hdr-dmi').
 */

/**
 * @typedef {Object} AbrSettings
 * @property {boolean} [limitBitrateByPortal=false]
 * If true, the size of the video portal will limit the max chosen video resolution.
 * @property {boolean} [usePixelRatioInLimitBitrateByPortal=false]
 * Sets whether to take into account the device's pixel ratio when defining the portal dimensions.
 *
 * Useful on, for example, retina displays.
 * @property {module:Settings~AbrRules} [rules]
 * Enable/Disable individual ABR rules. Note that if the throughputRule and the bolaRule are activated at the same time we switch to a dynamic mode.
 * In the dynamic mode either ThroughputRule or BolaRule are active but not both at the same time.
 *
 * l2ARule and loLPRule are ABR rules that are designed for low latency streams. They are tested as standalone rules meaning the other rules should be deactivated when choosing these rules.
 * @property {module:Settings~ThroughputSettings} [throughput]
 * Settings related to throughput calculation
 * @property {module:Settings~AudioVideoSettings} [maxBitrate={audio: -1, video: -1}]
 * The maximum bitrate that the ABR algorithms will choose. This value is specified in kbps.
 *
 * Use -1 for no limit.
 * @property {module:Settings~AudioVideoSettings} [minBitrate={audio: -1, video: -1}]
 * The minimum bitrate that the ABR algorithms will choose. This value is specified in kbps.
 *
 * Use -1 for no limit.
 * @property {module:Settings~AudioVideoSettings} [initialBitrate={audio: -1, video: -1}]
 * Explicitly set the starting bitrate for audio or video. This value is specified in kbps.
 *
 * Use -1 to let the player decide.
 * @property {module:Settings~AudioVideoSettings} [autoSwitchBitrate={audio: true, video: true}]
 * Indicates whether the player should enable ABR algorithms to switch the bitrate.
 */

/**
 * @typedef {Object} AbrRules
 * @property {module:Settings~ThroughputRule} [throughputRule]
 * Configuration of the Throughput rule
 * @property {module:Settings~BolaRule} [bolaRule]
 * Configuration of the BOLA rule
 * @property {module:Settings~InsufficientBufferRule} [insufficientBufferRule]
 * Configuration of the Insufficient Buffer rule
 * @property {module:Settings~SwitchHistoryRule} [switchHistoryRule]
 * Configuration of the Switch History rule
 * @property {module:Settings~DroppedFramesRule} [droppedFramesRule]
 * Configuration of the Dropped Frames rule
 * @property {module:Settings~AbandonRequestsRule} [abandonRequestsRule]
 * Configuration of the Abandon Requests rule
 * @property {module:Settings~L2ARule} [l2ARule]
 * Configuration of the L2A rule
 * @property {module:Settings~LoLPRule} [loLPRule]
 * Configuration of the LoLP rule
 */

/**
 * @typedef {Object} ThroughputRule
 * @property {boolean} [active=true]
 * Enable or disable the rule
 */

/**
 * @typedef {Object} BolaRule
 * @property {boolean} [active=true]
 * Enable or disable the rule
 */

/**
 * @typedef {Object} InsufficientBufferRule
 * @property {boolean} [active=true]
 * Enable or disable the rule
 * @property {object} [parameters={throughputSafetyFactor=0.7, segmentIgnoreCount=2}]
 * Configures the rule specific parameters.
 *
 * - `throughputSafetyFactor`: The safety factor that is applied to the derived throughput, see example in the Description.
 * - `segmentIgnoreCount`: This rule is not taken into account until the first segmentIgnoreCount media segments have been appended to the buffer.
 */

/**
 * @typedef {Object} SwitchHistoryRule
 * @property {boolean} [active=true]
 * Enable or disable the rule
 * @property {object} [parameters={sampleSize=8, switchPercentageThreshold=0.075}]
 * Configures the rule specific parameters.
 *
 * - `sampleSize`: Number of switch requests ("no switch", because of the selected Representation is already playing or "actual switches") required before the rule is applied
 * - `switchPercentageThreshold`: Ratio of actual quality drops compared to no drops before a quality down-switch is triggered
 */

/**
 * @typedef {Object} DroppedFramesRule
 * @property {boolean} [active=true]
 * Enable or disable the rule
 * @property {object} [parameters={minimumSampleSize=375, droppedFramesPercentageThreshold=0.15}]
 * Configures the rule specific parameters.
 *
 * - `minimumSampleSize`: Sum of rendered and dropped frames required for each Representation before the rule kicks in.
 * - `droppedFramesPercentageThreshold`: Minimum percentage of dropped frames to trigger a quality down switch. Values are defined in the range of 0 - 1.
 */

/**
 * @typedef {Object} AbandonRequestsRule
 * @property {boolean} [active=true]
 * Enable or disable the rule
 * @property {object} [parameters={abandonDurationMultiplier=1.8, minSegmentDownloadTimeThresholdInMs=500, minThroughputSamplesThreshold=6}]
 * Configures the rule specific parameters.
 *
 * - `abandonDurationMultiplier`: Factor to multiply with the segment duration to compare against the estimated remaining download time of the current segment. See code example above.
 * - `minSegmentDownloadTimeThresholdInMs`: The AbandonRequestRule only kicks if the download time of the current segment exceeds this value.
 * - `minThroughputSamplesThreshold`: Minimum throughput samples (equivalent to number of progress events) required before the AbandonRequestRule kicks in.
 */

/**
 * @typedef {Object} L2ARule
 * @property {boolean} [active=true]
 * Enable or disable the rule
 */

/**
 * @typedef {Object} LoLPRule
 * @property {boolean} [active=true]
 * Enable or disable the rule
 */

/**
 * @typedef {Object} ThroughputSettings
 * @property {string} [averageCalculationMode=Constants.THROUGHPUT_CALCULATION_MODES.EWMA]
 * Defines the default mode for calculating the throughput based on the samples collected during playback.
 *
 * For arithmetic and harmonic mean calculations we use a sliding window with the values defined in "sampleSettings"
 *
 * For exponential weighted moving average calculation the default values can be changed in "ewma"
 * @property {string} [lowLatencyDownloadTimeCalculationMode=Constants.LOW_LATENCY_DOWNLOAD_TIME_CALCULATION_MODE.MOOF_PARSING]
 * Defines the effective download time estimation method we use for low latency streams that utilize the Fetch API and chunked transfer coding
 * @property {boolean} [useResourceTimingApi=true]
 * If set to true the ResourceTimingApi is used to derive the download time and the number of downloaded bytes.
 * This option has no effect for low latency streaming as the download time equals the segment duration in most of the cases and therefor does not provide reliable values
 * @property {object} [useNetworkInformationApi = { xhr=false, fetch=false}]
 * If set to true the NetworkInformationApi is used to derive the current throughput. Browser support is limited, only available in Chrome and Edge.
 * Applies to standard (XHR requests) and/or low latency streaming (Fetch API requests).
 * @property {boolean} [useDeadTimeLatency=true]
 * If true, only the download portion will be considered part of the download bitrate and latency will be regarded as static.
 *
 * If false, the reciprocal of the whole transfer time will be used.
 * @property {number} [bandwidthSafetyFactor=0.9]
 * Standard ABR throughput rules multiply the throughput by this value.
 *
 * It should be between 0 and 1, with lower values giving less rebuffering (but also lower quality)
 * @property {object} [sampleSettings = {live=3,vod=4,enableSampleSizeAdjustment=true,decreaseScale=0.7,increaseScale=1.3,maxMeasurementsToKeep=20,averageLatencySampleAmount=4}]
 * When deriving the throughput based on the arithmetic or harmonic mean these settings define:
 * - `live`: Number of throughput samples to use (sample size) for live streams
 * - `vod`: Number of throughput samples to use (sample size) for VoD streams
 * - `enableSampleSizeAdjustment`: Adjust the sample sizes if throughput samples vary a lot
 * - `decreaseScale`: Increase sample size by one if the ratio of current and previous sample is below or equal this value
 * - `increaseScale`: Increase sample size by one if the ratio of current and previous sample is higher or equal this value
 * - `maxMeasurementsToKeep`: Number of samples to keep before sliding samples out of the window
 * - `averageLatencySampleAmount`: Number of latency samples to use (sample size)
 * @property {object} [ewma={throughputSlowHalfLifeSeconds=8,throughputFastHalfLifeSeconds=3,latencySlowHalfLifeCount=2,latencyFastHalfLifeCount=1, weightDownloadTimeMultiplicationFactor=0.0015}]
 * When deriving the throughput based on the exponential weighted moving average these settings define:
 * - `throughputSlowHalfLifeSeconds`: Number by which the weight of the current throughput measurement is divided, see ThroughputModel._updateEwmaValues
 * - `throughputFastHalfLifeSeconds`: Number by which the weight of the current throughput measurement is divided, see ThroughputModel._updateEwmaValues
 * - `latencySlowHalfLifeCount`: Number by which the weight of the current latency is divided, see ThroughputModel._updateEwmaValues
 * - `latencyFastHalfLifeCount`: Number by which the weight of the current latency is divided, see ThroughputModel._updateEwmaValues
 * - `weightDownloadTimeMultiplicationFactor`: This value is multiplied with the download time in milliseconds to derive the weight for the EWMA calculation.
 */

/**
 * @typedef {Object} CmcdSettings
 * @property {boolean} [applyParametersFromMpd=true]
 * Set to true if dash.js should use the CMCD parameters defined in the MPD.
 * @property {boolean} [enable=false]
 * Enable or disable the CMCD reporting.
 * @property {string} [sid]
 * GUID identifying the current playback session.
 *
 * Should be in UUID format.
 *
 * If not specified a UUID will be automatically generated.
 * @property {string} [cid]
 * A unique string to identify the current content.
 *
 * If not specified it will be a hash of the MPD url.
 * @property {number} [rtp]
 * The requested maximum throughput that the client considers sufficient for delivery of the asset.
 *
 * If not specified this value will be dynamically calculated in the CMCDModel based on the current buffer level.
 * @property {number} [rtpSafetyFactor=5]
 * This value is used as a factor for the rtp value calculation: rtp = minBandwidth * rtpSafetyFactor
 *
 * If not specified this value defaults to 5. Note that this value is only used when no static rtp value is defined.
 * @property {number} [mode="query"]
 * The method to use to attach cmcd metrics to the requests. 'query' to use query parameters, 'header' to use http headers.
 *
 * If not specified this value defaults to 'query'.
 * @property {Array.<string>} [enabledKeys]
 * This value is used to specify the desired CMCD parameters. Parameters not included in this list are not reported.
 * @property {Array.<string>} [includeInRequests]
 * Specifies which HTTP GET requests shall carry parameters.
 *
 * If not specified this value defaults to ['segment', 'mpd].
 * @property {number} [version=1]
 * The version of the CMCD to use.
 *
 * If not specified this value defaults to 1.
 */

/**
 * @typedef {Object} module:Settings~CmsdSettings
 * @property {boolean} [enabled=false]
 * Enable or disable the CMSD response headers parsing.
 * @property {module:Settings~CmsdAbrSettings} [abr]
 * Sets additional ABR rules based on CMSD response headers.
 */

/**
 * @typedef {Object} CmsdAbrSettings
 * @property {boolean} [applyMb=false]
 * Set to true if dash.js should apply CMSD maximum suggested bitrate in ABR logic.
 * @property {number} [etpWeightRatio=0]
 * Sets the weight ratio (between 0 and 1) that shall be applied on CMSD estimated throuhgput compared to measured throughput when calculating throughput.
 */

/**
 * @typedef {Object} Metrics
 * @property {number} [metricsMaxListDepth=100]
 * Maximum number of metrics that are persisted per type.
 */

/**
 * @typedef {Object} StreamingSettings
 * @property {number} [abandonLoadTimeout=10000]
 * A timeout value in seconds, which during the ABRController will block switch-up events.
 *
 * This will only take effect after an abandoned fragment event occurs.
 * @property {number} [wallclockTimeUpdateInterval=100]
 * How frequently the wallclockTimeUpdated internal event is triggered (in milliseconds).
 * @property {number} [manifestUpdateRetryInterval=100]
 * For live streams, set the interval-frequency in milliseconds at which dash.js will check if the current manifest is still processed before downloading the next manifest once the minimumUpdatePeriod time has.
 * @property {number} [liveUpdateTimeThresholdInMilliseconds=0]
 * For live streams, postpone syncing time updates until the threshold is passed. Increase if problems occurs during live streams on low end devices.
 * @property {boolean} [cacheInitSegments=false]
 * Enables the caching of init segments to avoid requesting the init segments before each representation switch.
 * @property {boolean} [applyServiceDescription=true]
 * Set to true if dash.js should use the parameters defined in ServiceDescription elements
 * @property {boolean} [applyProducerReferenceTime=true]
 * Set to true if dash.js should use the parameters defined in ProducerReferenceTime elements in combination with ServiceDescription elements.
 * @property {boolean} [applyContentSteering=true]
 * Set to true if dash.js should apply content steering during playback.
 * @property {boolean} [enableManifestDurationMismatchFix=true]
 * For multi-period streams, overwrite the manifest mediaPresentationDuration attribute with the sum of period durations if the manifest mediaPresentationDuration is greater than the sum of period durations
 * @property {boolean} [enableManifestTimescaleMismatchFix=false]
 * Overwrite the manifest segments base information timescale attributes with the timescale set in initialization segments
 * @property {boolean} [parseInbandPrft=false]
 * Set to true if dash.js should parse inband prft boxes (ProducerReferenceTime) and trigger events.
 * @property {module:Settings~Metrics} metrics Metric settings
 * @property {module:Settings~LiveDelay} delay Live Delay settings
 * @property {module:Settings~EventSettings} events Event settings
 * @property {module:Settings~TimeShiftBuffer} timeShiftBuffer TimeShiftBuffer settings
 * @property {module:Settings~Protection} protection DRM related settings
 * @property {module:Settings~Capabilities} capabilities Capability related settings
 * @property {module:Settings~Buffer}  buffer Buffer related settings
 * @property {module:Settings~Gaps}  gaps Gap related settings
 * @property {module:Settings~UtcSynchronizationSettings} utcSynchronization Settings related to UTC clock synchronization
 * @property {module:Settings~Scheduling} scheduling Settings related to segment scheduling
 * @property {module:Settings~Text} text Settings related to Subtitles and captions
 * @property {module:Settings~LiveCatchupSettings} liveCatchup  Settings related to live catchup.
 * @property {module:Settings~CachingInfoSettings} [lastBitrateCachingInfo={enabled: true, ttl: 360000}]
 * Set to false if you would like to disable the last known bit rate from being stored during playback and used to set the initial bit rate for subsequent playback within the expiration window.
 *
 * The default expiration is one hour, defined in milliseconds.
 *
 * If expired, the default initial bit rate (closest to 1000 kbps) will be used for that session and a new bit rate will be stored during that session.
 * @property {module:Settings~CachingInfoSettings} [lastMediaSettingsCachingInfo={enabled: true, ttl: 360000}]
 * Set to false if you would like to disable the last media settings from being stored to localStorage during playback and used to set the initial track for subsequent playback within the expiration window.
 *
 * The default expiration is one hour, defined in milliseconds.
 * @property {boolean} [saveLastMediaSettingsForCurrentStreamingSession=true]
 * Set to true if dash.js should save media settings from last selected track for incoming track selection during current streaming session.
 * @property {module:Settings~AudioVideoSettings} [cacheLoadThresholds={video: 10, audio: 5}]
 * For a given media type, the threshold which defines if the response to a fragment request is coming from browser cache or not.
 * @property {module:Settings~AudioVideoSettings} [trackSwitchMode={video: "neverReplace", audio: "alwaysReplace"}]
 * For a given media type defines if existing segments in the buffer should be overwritten once the track is switched. For instance if the user switches the audio language the existing segments in the audio buffer will be replaced when setting this value to "alwaysReplace".
 *
 * Possible values
 *
 * - Constants.TRACK_SWITCH_MODE_ALWAYS_REPLACE
 * Replace existing segments in the buffer
 *
 * - Constants.TRACK_SWITCH_MODE_NEVER_REPLACE
 * Do not replace existing segments in the buffer
 *
 * @property {} [ignoreSelectionPriority: false]
 * provides the option to disregard any signalled selectionPriority attribute. If disabled and if no initial media settings are set, track selection is accomplished as defined by selectionModeForInitialTrack.
 *
 * @property {} [prioritizeRoleMain: true]
 * provides the option to disable prioritization of AdaptationSets with their Role set to Main
 *
 * @property {} [assumeDefaultRoleAsMain: true]
 * when no Role descriptor is present, assume main per default
 * 
 * @property {string} [selectionModeForInitialTrack="highestEfficiency"]
 * Sets the selection mode for the initial track. This mode defines how the initial track will be selected if no initial media settings are set. If initial media settings are set this parameter will be ignored. Available options are:
 *
 * Possible values
 *
 * - Constants.TRACK_SELECTION_MODE_HIGHEST_BITRATE
 * This mode makes the player select the track with a highest bitrate.
 *
 * - Constants.TRACK_SELECTION_MODE_FIRST_TRACK
 * This mode makes the player select the first track found in the manifest.
 *
 * - Constants.TRACK_SELECTION_MODE_HIGHEST_EFFICIENCY
 * This mode makes the player select the track with the lowest bitrate per pixel average.
 *
 * - Constants.TRACK_SELECTION_MODE_WIDEST_RANGE
 * This mode makes the player select the track with a widest range of bitrates.
 *
 *
 * @property {number} [fragmentRequestTimeout=20000]
 * Time in milliseconds before timing out on loading a media fragment.
 *
 * @property {number} [fragmentRequestProgressTimeout=-1]
 * Time in milliseconds before timing out on loading progress of a media fragment.
 *
 * @property {number} [manifestRequestTimeout=10000]
 * Time in milliseconds before timing out on loading a manifest.
 *
 * Fragments that timeout are retried as if they failed.
 * @property {module:Settings~RequestTypeSettings} [retryIntervals]
 * Time in milliseconds of which to reload a failed file load attempt.
 *
 * For low latency mode these values are divided by lowLatencyReductionFactor.
 * @property {module:Settings~RequestTypeSettings} [retryAttempts]
 * Total number of retry attempts that will occur on a file load before it fails.
 *
 * For low latency mode these values are multiplied by lowLatencyMultiplyFactor.
 * @property {module:Settings~AbrSettings} abr
 * Adaptive Bitrate algorithm related settings.
 * @property {module:Settings~CmcdSettings} cmcd
 * Settings related to Common Media Client Data reporting.
 * @property {module:Settings~CmsdSettings} cmsd
 * Settings related to Common Media Server Data parsing.
 * @property {module:Settings~defaultSchemeIdUri} defaultSchemeIdUri
 * Default schemeIdUri for descriptor type elements
 * These strings are used when not provided with setInitialMediaSettingsFor()
 */

/**
 * @class
 * @ignore
 */
function Settings() {
  let instance;
  const context = this.context;
  const eventBus = (0,_EventBus_js__WEBPACK_IMPORTED_MODULE_5__["default"])(context).getInstance();
  const DISPATCH_KEY_MAP = {
    'streaming.delay.liveDelay': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_LIVE_DELAY,
    'streaming.delay.liveDelayFragmentCount': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_LIVE_DELAY_FRAGMENT_COUNT,
    'streaming.liveCatchup.enabled': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_CATCHUP_ENABLED,
    'streaming.liveCatchup.playbackRate.min': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_PLAYBACK_RATE_MIN,
    'streaming.liveCatchup.playbackRate.max': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_PLAYBACK_RATE_MAX,
    'streaming.abr.rules.throughputRule.active': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_ABR_ACTIVE_RULES,
    'streaming.abr.rules.bolaRule.active': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_ABR_ACTIVE_RULES,
    'streaming.abr.rules.insufficientBufferRule.active': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_ABR_ACTIVE_RULES,
    'streaming.abr.rules.switchHistoryRule.active': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_ABR_ACTIVE_RULES,
    'streaming.abr.rules.droppedFramesRule.active': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_ABR_ACTIVE_RULES,
    'streaming.abr.rules.abandonRequestsRule.active': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_ABR_ACTIVE_RULES,
    'streaming.abr.rules.l2ARule.active': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_ABR_ACTIVE_RULES,
    'streaming.abr.rules.loLPRule.active': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_ABR_ACTIVE_RULES,
    'streaming.abr.maxBitrate.video': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_MAX_BITRATE,
    'streaming.abr.maxBitrate.audio': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_MAX_BITRATE,
    'streaming.abr.minBitrate.video': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_MIN_BITRATE,
    'streaming.abr.minBitrate.audio': _events_Events_js__WEBPACK_IMPORTED_MODULE_6__["default"].SETTING_UPDATED_MIN_BITRATE
  };

  /**
   * @const {PlayerSettings} defaultSettings
   * @ignore
   */
  const defaultSettings = {
    debug: {
      logLevel: _core_Debug_js__WEBPACK_IMPORTED_MODULE_2__["default"].LOG_LEVEL_WARNING,
      dispatchEvent: false
    },
    streaming: {
      abandonLoadTimeout: 10000,
      wallclockTimeUpdateInterval: 100,
      manifestUpdateRetryInterval: 100,
      liveUpdateTimeThresholdInMilliseconds: 0,
      cacheInitSegments: false,
      applyServiceDescription: true,
      applyProducerReferenceTime: true,
      applyContentSteering: true,
      enableManifestDurationMismatchFix: true,
      parseInbandPrft: false,
      enableManifestTimescaleMismatchFix: false,
      capabilities: {
        filterUnsupportedEssentialProperties: true,
        supportedEssentialProperties: [{
          schemeIdUri: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].FONT_DOWNLOAD_DVB_SCHEME
        }, {
          schemeIdUri: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].COLOUR_PRIMARIES_SCHEME_ID_URI,
          value: /1|5|6|7/
        }, {
          schemeIdUri: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].URL_QUERY_INFO_SCHEME
        }, {
          schemeIdUri: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].EXT_URL_QUERY_INFO_SCHEME
        }, {
          schemeIdUri: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].MATRIX_COEFFICIENTS_SCHEME_ID_URI,
          value: /0|1|5|6/
        }, {
          schemeIdUri: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].TRANSFER_CHARACTERISTICS_SCHEME_ID_URI,
          value: /1|6|13|14|15/
        }, ..._streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].THUMBNAILS_SCHEME_ID_URIS.map(ep => {
          return {
            'schemeIdUri': ep
          };
        })],
        useMediaCapabilitiesApi: true,
        filterVideoColorimetryEssentialProperties: false,
        filterHDRMetadataFormatEssentialProperties: false
      },
      events: {
        eventControllerRefreshDelay: 100,
        deleteEventMessageDataTimeout: 10000
      },
      timeShiftBuffer: {
        calcFromSegmentTimeline: false,
        fallbackToSegmentTimeline: true
      },
      metrics: {
        maxListDepth: 100
      },
      delay: {
        liveDelayFragmentCount: NaN,
        liveDelay: NaN,
        useSuggestedPresentationDelay: true
      },
      protection: {
        keepProtectionMediaKeys: false,
        ignoreEmeEncryptedEvent: false,
        detectPlayreadyMessageFormat: true,
        ignoreKeyStatuses: false
      },
      buffer: {
        enableSeekDecorrelationFix: false,
        fastSwitchEnabled: null,
        flushBufferAtTrackSwitch: false,
        reuseExistingSourceBuffers: true,
        bufferPruningInterval: 10,
        bufferToKeep: 20,
        bufferTimeAtTopQuality: 30,
        bufferTimeAtTopQualityLongForm: 60,
        initialBufferLevel: NaN,
        bufferTimeDefault: 18,
        longFormContentDurationThreshold: 600,
        stallThreshold: 0.3,
        lowLatencyStallThreshold: 0.3,
        useAppendWindow: true,
        setStallState: true,
        avoidCurrentTimeRangePruning: false,
        useChangeType: true,
        mediaSourceDurationInfinity: true,
        resetSourceBuffersForTrackSwitch: false,
        syntheticStallEvents: {
          enabled: false,
          ignoreReadyState: false
        }
      },
      gaps: {
        jumpGaps: true,
        jumpLargeGaps: true,
        smallGapLimit: 1.5,
        threshold: 0.3,
        enableSeekFix: true,
        enableStallFix: false,
        stallSeek: 0.1
      },
      utcSynchronization: {
        enabled: true,
        useManifestDateHeaderTimeSource: true,
        backgroundAttempts: 2,
        timeBetweenSyncAttempts: 30,
        maximumTimeBetweenSyncAttempts: 600,
        minimumTimeBetweenSyncAttempts: 2,
        timeBetweenSyncAttemptsAdjustmentFactor: 2,
        maximumAllowedDrift: 100,
        enableBackgroundSyncAfterSegmentDownloadError: true,
        defaultTimingSource: {
          scheme: 'urn:mpeg:dash:utc:http-xsdate:2014',
          value: 'https://time.akamai.com/?iso&ms'
        }
      },
      scheduling: {
        defaultTimeout: 500,
        lowLatencyTimeout: 0,
        scheduleWhilePaused: true
      },
      text: {
        defaultEnabled: true,
        dispatchForManualRendering: false,
        extendSegmentedCues: true,
        imsc: {
          displayForcedOnlyMode: false,
          enableRollUp: true
        },
        webvtt: {
          customRenderingEnabled: false
        }
      },
      liveCatchup: {
        maxDrift: NaN,
        playbackRate: {
          min: NaN,
          max: NaN
        },
        playbackBufferMin: 0.5,
        enabled: null,
        mode: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].LIVE_CATCHUP_MODE_DEFAULT
      },
      lastBitrateCachingInfo: {
        enabled: true,
        ttl: 360000
      },
      lastMediaSettingsCachingInfo: {
        enabled: true,
        ttl: 360000
      },
      saveLastMediaSettingsForCurrentStreamingSession: true,
      cacheLoadThresholds: {
        video: 10,
        audio: 5
      },
      trackSwitchMode: {
        audio: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].TRACK_SWITCH_MODE_ALWAYS_REPLACE,
        video: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].TRACK_SWITCH_MODE_NEVER_REPLACE
      },
      ignoreSelectionPriority: false,
      prioritizeRoleMain: true,
      assumeDefaultRoleAsMain: true,
      selectionModeForInitialTrack: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].TRACK_SELECTION_MODE_HIGHEST_EFFICIENCY,
      fragmentRequestTimeout: 20000,
      fragmentRequestProgressTimeout: -1,
      manifestRequestTimeout: 10000,
      retryIntervals: {
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MPD_TYPE]: 500,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.XLINK_EXPANSION_TYPE]: 500,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MEDIA_SEGMENT_TYPE]: 1000,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.INIT_SEGMENT_TYPE]: 1000,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE]: 1000,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.INDEX_SEGMENT_TYPE]: 1000,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE]: 1000,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.LICENSE]: 1000,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.OTHER_TYPE]: 1000,
        lowLatencyReductionFactor: 10
      },
      retryAttempts: {
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MPD_TYPE]: 3,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.XLINK_EXPANSION_TYPE]: 1,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MEDIA_SEGMENT_TYPE]: 3,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.INIT_SEGMENT_TYPE]: 3,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE]: 3,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.INDEX_SEGMENT_TYPE]: 3,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE]: 3,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.LICENSE]: 3,
        [_streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_4__.HTTPRequest.OTHER_TYPE]: 3,
        lowLatencyMultiplyFactor: 5
      },
      abr: {
        limitBitrateByPortal: false,
        usePixelRatioInLimitBitrateByPortal: false,
        enableSupplementalPropertyAdaptationSetSwitching: true,
        rules: {
          throughputRule: {
            active: true
          },
          bolaRule: {
            active: true
          },
          insufficientBufferRule: {
            active: true,
            parameters: {
              throughputSafetyFactor: 0.7,
              segmentIgnoreCount: 2
            }
          },
          switchHistoryRule: {
            active: true,
            parameters: {
              sampleSize: 8,
              switchPercentageThreshold: 0.075
            }
          },
          droppedFramesRule: {
            active: false,
            parameters: {
              minimumSampleSize: 375,
              droppedFramesPercentageThreshold: 0.15
            }
          },
          abandonRequestsRule: {
            active: true,
            parameters: {
              abandonDurationMultiplier: 1.8,
              minSegmentDownloadTimeThresholdInMs: 500,
              minThroughputSamplesThreshold: 6
            }
          },
          l2ARule: {
            active: false
          },
          loLPRule: {
            active: false
          }
        },
        throughput: {
          averageCalculationMode: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].THROUGHPUT_CALCULATION_MODES.EWMA,
          lowLatencyDownloadTimeCalculationMode: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].LOW_LATENCY_DOWNLOAD_TIME_CALCULATION_MODE.MOOF_PARSING,
          useResourceTimingApi: true,
          useNetworkInformationApi: {
            xhr: false,
            fetch: false
          },
          useDeadTimeLatency: true,
          bandwidthSafetyFactor: 0.9,
          sampleSettings: {
            live: 3,
            vod: 4,
            enableSampleSizeAdjustment: true,
            decreaseScale: 0.7,
            increaseScale: 1.3,
            maxMeasurementsToKeep: 20,
            averageLatencySampleAmount: 4
          },
          ewma: {
            throughputSlowHalfLifeSeconds: 8,
            throughputFastHalfLifeSeconds: 3,
            latencySlowHalfLifeCount: 2,
            latencyFastHalfLifeCount: 1,
            weightDownloadTimeMultiplicationFactor: 0.0015
          }
        },
        maxBitrate: {
          audio: -1,
          video: -1
        },
        minBitrate: {
          audio: -1,
          video: -1
        },
        initialBitrate: {
          audio: -1,
          video: -1
        },
        autoSwitchBitrate: {
          audio: true,
          video: true
        }
      },
      cmcd: {
        applyParametersFromMpd: true,
        enabled: false,
        sid: null,
        cid: null,
        rtp: null,
        rtpSafetyFactor: 5,
        mode: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].CMCD_MODE_QUERY,
        enabledKeys: _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_3__["default"].CMCD_AVAILABLE_KEYS,
        includeInRequests: ['segment', 'mpd'],
        version: 1
      },
      cmsd: {
        enabled: false,
        abr: {
          applyMb: false,
          etpWeightRatio: 0
        }
      },
      defaultSchemeIdUri: {
        viewpoint: '',
        audioChannelConfiguration: 'urn:mpeg:mpegB:cicp:ChannelConfiguration',
        role: 'urn:mpeg:dash:role:2011',
        accessibility: 'urn:mpeg:dash:role:2011'
      }
    },
    errors: {
      recoverAttempts: {
        mediaErrorDecode: 5
      }
    }
  };
  let settings = _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].clone(defaultSettings);

  //Merge in the settings. If something exists in the new config that doesn't match the schema of the default config,
  //regard it as an error and log it.
  function mixinSettings(source, dest, path) {
    for (let n in source) {
      if (source.hasOwnProperty(n)) {
        if (dest.hasOwnProperty(n)) {
          if (typeof source[n] === 'object' && !(source[n] instanceof RegExp) && !(source[n] instanceof Array) && source[n] !== null) {
            mixinSettings(source[n], dest[n], path.slice() + n + '.');
          } else {
            dest[n] = _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].clone(source[n]);
            if (DISPATCH_KEY_MAP[path + n]) {
              eventBus.trigger(DISPATCH_KEY_MAP[path + n]);
            }
          }
        } else {
          console.error('Settings parameter ' + path + n + ' is not supported');
        }
      }
    }
  }

  /**
   * Return the settings object. Don't copy/store this object, you won't get updates.
   * @func
   * @instance
   */
  function get() {
    return settings;
  }

  /**
   * @func
   * @instance
   * @param {object} settingsObj - This should be a partial object of the Settings.Schema type. That is, fields defined should match the path (e.g.
   * settingsObj.streaming.abr.autoSwitchBitrate.audio -> defaultSettings.streaming.abr.autoSwitchBitrate.audio). Where an element's path does
   * not match it is ignored, and a warning is logged.
   *
   * Use to change the settings object. Any new values defined will overwrite the settings and anything undefined will not change.
   * Implementers of new settings should add it in an approriate namespace to the defaultSettings object and give it a default value (that is not undefined).
   *
   */
  function update(settingsObj) {
    if (typeof settingsObj === 'object') {
      mixinSettings(settingsObj, settings, '');
    }
  }

  /**
   * Resets the settings object. Everything is set to its default value.
   * @func
   * @instance
   *
   */
  function reset() {
    settings = _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].clone(defaultSettings);
  }
  instance = {
    get,
    update,
    reset
  };
  return instance;
}
Settings.__dashjs_factory_name = 'Settings';
let factory = _FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(Settings);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/core/Utils.js":
/*!***************************!*\
  !*** ./src/core/Utils.js ***!
  \***************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path_browserify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path-browserify */ "./node_modules/path-browserify/index.js");
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ua-parser-js */ "./node_modules/ua-parser-js/src/ua-parser.js");
/* harmony import */ var _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../streaming/constants/Constants.js */ "./src/streaming/constants/Constants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */




class Utils {
  static mixin(dest, source, copy) {
    let s;
    let empty = {};
    if (dest) {
      for (let name in source) {
        if (source.hasOwnProperty(name)) {
          s = source[name];
          if (!(name in dest) || dest[name] !== s && (!(name in empty) || empty[name] !== s)) {
            if (typeof dest[name] === 'object' && dest[name] !== null) {
              dest[name] = Utils.mixin(dest[name], s, copy);
            } else {
              dest[name] = copy(s);
            }
          }
        }
      }
    }
    return dest;
  }
  static clone(src) {
    if (!src || typeof src !== 'object') {
      return src; // anything
    }
    if (src instanceof RegExp) {
      return new RegExp(src);
    }
    let r;
    if (src instanceof Array) {
      // array
      r = [];
      for (let i = 0, l = src.length; i < l; ++i) {
        if (i in src) {
          r.push(Utils.clone(src[i]));
        }
      }
    } else {
      r = {};
    }
    return Utils.mixin(r, src, Utils.clone);
  }
  static addAdditionalQueryParameterToUrl(url, params) {
    try {
      if (!params || params.length === 0) {
        return url;
      }
      let updatedUrl = url;
      params.forEach(_ref => {
        let {
          key,
          value
        } = _ref;
        const separator = updatedUrl.includes('?') ? '&' : '?';
        updatedUrl += `${separator}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      });
      return updatedUrl;
    } catch (e) {
      return url;
    }
  }
  static removeQueryParameterFromUrl(url, queryParameter) {
    if (!url || !queryParameter) {
      return url;
    }
    // Parse the URL
    const parsedUrl = new URL(url);

    // Get the search parameters
    const params = new URLSearchParams(parsedUrl.search);
    if (!params || params.size === 0 || !params.has(queryParameter)) {
      return url;
    }

    // Remove the queryParameter
    params.delete(queryParameter);

    // Manually reconstruct the query string without re-encoding
    const queryString = Array.from(params.entries()).map(_ref2 => {
      let [key, value] = _ref2;
      return `${key}=${value}`;
    }).join('&');

    // Reconstruct the URL
    const baseUrl = `${parsedUrl.origin}${parsedUrl.pathname}`;
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }
  static parseHttpHeaders(headerStr) {
    let headers = {};
    if (!headerStr) {
      return headers;
    }

    // Trim headerStr to fix a MS Edge bug with xhr.getAllResponseHeaders method
    // which send a string starting with a "\n" character
    let headerPairs = headerStr.trim().split('\u000d\u000a');
    for (let i = 0, ilen = headerPairs.length; i < ilen; i++) {
      let headerPair = headerPairs[i];
      let index = headerPair.indexOf('\u003a\u0020');
      if (index > 0) {
        headers[headerPair.substring(0, index)] = headerPair.substring(index + 2);
      }
    }
    return headers;
  }

  /**
   * Parses query parameters from a string and returns them as an array of key-value pairs.
   * @param {string} queryParamString - A string containing the query parameters.
   * @return {Array<{key: string, value: string}>} An array of objects representing the query parameters.
   */
  static parseQueryParams(queryParamString) {
    const params = [];
    const searchParams = new URLSearchParams(queryParamString);
    for (const [key, value] of searchParams.entries()) {
      params.push({
        key: decodeURIComponent(key),
        value: decodeURIComponent(value)
      });
    }
    return params;
  }
  static generateUuid() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  }
  static generateHashCode(string) {
    let hash = 0;
    if (string.length === 0) {
      return hash;
    }
    for (let i = 0; i < string.length; i++) {
      const chr = string.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }

  /**
   * Compares both urls and returns a relative url (target relative to original)
   * @param {string} originalUrl
   * @param {string} targetUrl
   * @return {string|*}
   */
  static getRelativeUrl(originalUrl, targetUrl) {
    try {
      const original = new URL(originalUrl);
      const target = new URL(targetUrl);

      // Unify the protocol to compare the origins
      original.protocol = target.protocol;
      if (original.origin !== target.origin) {
        return targetUrl;
      }

      // Use the relative path implementation of the path library. We need to cut off the actual filename in the end to get the relative path
      let relativePath = path_browserify__WEBPACK_IMPORTED_MODULE_0__.relative(original.pathname.substr(0, original.pathname.lastIndexOf('/')), target.pathname.substr(0, target.pathname.lastIndexOf('/')));

      // In case the relative path is empty (both path are equal) return the filename only. Otherwise add a slash in front of the filename
      const startIndexOffset = relativePath.length === 0 ? 1 : 0;
      relativePath += target.pathname.substr(target.pathname.lastIndexOf('/') + startIndexOffset, target.pathname.length - 1);

      // Build the other candidate, e.g. the 'host relative' path that starts with "/", and return the shortest of the two candidates.
      if (target.pathname.length < relativePath.length) {
        return target.pathname;
      }
      return relativePath;
    } catch (e) {
      return targetUrl;
    }
  }
  static getHostFromUrl(urlString) {
    try {
      const url = new URL(urlString);
      return url.host;
    } catch (e) {
      return null;
    }
  }
  static parseUserAgent() {
    let ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    try {
      const uaString = ua === null ? typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '' : '';
      return (0,ua_parser_js__WEBPACK_IMPORTED_MODULE_1__.UAParser)(uaString);
    } catch (e) {
      return {};
    }
  }

  /**
   * Checks for existence of "http" or "https" in a string
   * @param string
   * @returns {boolean}
   */
  static stringHasProtocol(string) {
    return /(http(s?)):\/\//i.test(string);
  }
  static bufferSourceToDataView(bufferSource) {
    return Utils.toDataView(bufferSource, DataView);
  }
  static bufferSourceToInt8(bufferSource) {
    return Utils.toDataView(bufferSource, Uint8Array);
  }
  static uint8ArrayToString(uint8Array) {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(uint8Array);
  }
  static bufferSourceToHex(data) {
    const arr = Utils.bufferSourceToInt8(data);
    let hex = '';
    for (let value of arr) {
      value = value.toString(16);
      if (value.length === 1) {
        value = '0' + value;
      }
      hex += value;
    }
    return hex;
  }
  static toDataView(bufferSource, Type) {
    const buffer = Utils.getArrayBuffer(bufferSource);
    let bytesPerElement = 1;
    if ('BYTES_PER_ELEMENT' in DataView) {
      bytesPerElement = DataView.BYTES_PER_ELEMENT;
    }
    const dataEnd = ((bufferSource.byteOffset || 0) + bufferSource.byteLength) / bytesPerElement;
    const rawStart = (bufferSource.byteOffset || 0) / bytesPerElement;
    const start = Math.floor(Math.max(0, Math.min(rawStart, dataEnd)));
    const end = Math.floor(Math.min(start + Math.max(Infinity, 0), dataEnd));
    return new Type(buffer, start, end - start);
  }
  static getArrayBuffer(view) {
    if (view instanceof ArrayBuffer) {
      return view;
    } else {
      return view.buffer;
    }
  }
  static getCodecFamily(codecString) {
    const {
      base,
      profile
    } = Utils._getCodecParts(codecString);
    switch (base) {
      case 'mp4a':
        switch (profile) {
          case '69':
          case '6b':
          case '40.34':
            return _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_2__["default"].CODEC_FAMILIES.MP3;
          case '66':
          case '67':
          case '68':
          case '40.2':
          case '40.02':
          case '40.5':
          case '40.05':
          case '40.29':
          case '40.42':
            return _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_2__["default"].CODEC_FAMILIES.AAC;
          case 'a5':
            return _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_2__["default"].CODEC_FAMILIES.AC3;
          case 'e6':
            return _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_2__["default"].CODEC_FAMILIES.EC3;
          case 'b2':
            return _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_2__["default"].CODEC_FAMILIES.DTSX;
          case 'a9':
            return _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_2__["default"].CODEC_FAMILIES.DTSC;
        }
        break;
      case 'avc1':
      case 'avc3':
        return _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_2__["default"].CODEC_FAMILIES.AVC;
      case 'hvc1':
      case 'hvc3':
        return _streaming_constants_Constants_js__WEBPACK_IMPORTED_MODULE_2__["default"].CODEC_FAMILIES.HEVC;
      default:
        return base;
    }
    return base;
  }
  static _getCodecParts(codecString) {
    const [base, ...rest] = codecString.split('.');
    const profile = rest.join('.');
    return {
      base,
      profile
    };
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Utils);

/***/ }),

/***/ "./src/core/events/CoreEvents.js":
/*!***************************************!*\
  !*** ./src/core/events/CoreEvents.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventsBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventsBase.js */ "./src/core/events/EventsBase.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * These are internal events that should not be needed at the player level.
 * If you find and event in here that you would like access to from MediaPlayer level
 * please add an issue at https://github.com/Dash-Industry-Forum/dash.js/issues/new
 * @class
 * @ignore
 */
class CoreEvents extends _EventsBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.ATTEMPT_BACKGROUND_SYNC = 'attemptBackgroundSync';
    this.BUFFERING_COMPLETED = 'bufferingCompleted';
    this.BUFFER_CLEARED = 'bufferCleared';
    this.BYTES_APPENDED_END_FRAGMENT = 'bytesAppendedEndFragment';
    this.BUFFER_REPLACEMENT_STARTED = 'bufferReplacementStarted';
    this.CHECK_FOR_EXISTENCE_COMPLETED = 'checkForExistenceCompleted';
    this.CMSD_STATIC_HEADER = 'cmsdStaticHeader';
    this.CURRENT_TRACK_CHANGED = 'currentTrackChanged';
    this.DATA_UPDATE_COMPLETED = 'dataUpdateCompleted';
    this.INBAND_EVENTS = 'inbandEvents';
    this.INITIAL_STREAM_SWITCH = 'initialStreamSwitch';
    this.INIT_FRAGMENT_LOADED = 'initFragmentLoaded';
    this.INIT_FRAGMENT_NEEDED = 'initFragmentNeeded';
    this.INTERNAL_MANIFEST_LOADED = 'internalManifestLoaded';
    this.ORIGINAL_MANIFEST_LOADED = 'originalManifestLoaded';
    this.LOADING_COMPLETED = 'loadingCompleted';
    this.LOADING_PROGRESS = 'loadingProgress';
    this.LOADING_DATA_PROGRESS = 'loadingDataProgress';
    this.LOADING_ABANDONED = 'loadingAborted';
    this.MANIFEST_UPDATED = 'manifestUpdated';
    this.MEDIA_FRAGMENT_LOADED = 'mediaFragmentLoaded';
    this.MEDIA_FRAGMENT_NEEDED = 'mediaFragmentNeeded';
    this.MEDIAINFO_UPDATED = 'mediaInfoUpdated';
    this.QUOTA_EXCEEDED = 'quotaExceeded';
    this.SEGMENT_LOCATION_BLACKLIST_ADD = 'segmentLocationBlacklistAdd';
    this.SEGMENT_LOCATION_BLACKLIST_CHANGED = 'segmentLocationBlacklistChanged';
    this.SERVICE_LOCATION_BASE_URL_BLACKLIST_ADD = 'serviceLocationBlacklistAdd';
    this.SERVICE_LOCATION_BASE_URL_BLACKLIST_CHANGED = 'serviceLocationBlacklistChanged';
    this.SERVICE_LOCATION_LOCATION_BLACKLIST_ADD = 'serviceLocationLocationBlacklistAdd';
    this.SERVICE_LOCATION_LOCATION_BLACKLIST_CHANGED = 'serviceLocationLocationBlacklistChanged';
    this.SET_FRAGMENTED_TEXT_AFTER_DISABLED = 'setFragmentedTextAfterDisabled';
    this.SET_NON_FRAGMENTED_TEXT = 'setNonFragmentedText';
    this.SOURCE_BUFFER_ERROR = 'sourceBufferError';
    this.STREAMS_COMPOSED = 'streamsComposed';
    this.STREAM_BUFFERING_COMPLETED = 'streamBufferingCompleted';
    this.STREAM_REQUESTING_COMPLETED = 'streamRequestingCompleted';
    this.TEXT_TRACKS_QUEUE_INITIALIZED = 'textTracksQueueInitialized';
    this.TIME_SYNCHRONIZATION_COMPLETED = 'timeSynchronizationComplete';
    this.UPDATE_TIME_SYNC_OFFSET = 'updateTimeSyncOffset';
    this.URL_RESOLUTION_FAILED = 'urlResolutionFailed';
    this.VIDEO_CHUNK_RECEIVED = 'videoChunkReceived';
    this.WALLCLOCK_TIME_UPDATED = 'wallclockTimeUpdated';
    this.XLINK_ELEMENT_LOADED = 'xlinkElementLoaded';
    this.XLINK_READY = 'xlinkReady';
    this.SEEK_TARGET = 'seekTarget';
    this.SETTING_UPDATED_LIVE_DELAY = 'settingUpdatedLiveDelay';
    this.SETTING_UPDATED_LIVE_DELAY_FRAGMENT_COUNT = 'settingUpdatedLiveDelayFragmentCount';
    this.SETTING_UPDATED_CATCHUP_ENABLED = 'settingUpdatedCatchupEnabled';
    this.SETTING_UPDATED_PLAYBACK_RATE_MIN = 'settingUpdatedPlaybackRateMin';
    this.SETTING_UPDATED_PLAYBACK_RATE_MAX = 'settingUpdatedPlaybackRateMax';
    this.SETTING_UPDATED_ABR_ACTIVE_RULES = 'settingUpdatedAbrActiveRules';
    this.SETTING_UPDATED_MAX_BITRATE = 'settingUpdatedMaxBitrate';
    this.SETTING_UPDATED_MIN_BITRATE = 'settingUpdatedMinBitrate';
  }
}
/* harmony default export */ __webpack_exports__["default"] = (CoreEvents);

/***/ }),

/***/ "./src/core/events/Events.js":
/*!***********************************!*\
  !*** ./src/core/events/Events.js ***!
  \***********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CoreEvents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CoreEvents.js */ "./src/core/events/CoreEvents.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */

class Events extends _CoreEvents_js__WEBPACK_IMPORTED_MODULE_0__["default"] {}
let events = new Events();
/* harmony default export */ __webpack_exports__["default"] = (events);

/***/ }),

/***/ "./src/core/events/EventsBase.js":
/*!***************************************!*\
  !*** ./src/core/events/EventsBase.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class EventsBase {
  extend(events, config) {
    if (!events) {
      return;
    }
    let override = config ? config.override : false;
    let publicOnly = config ? config.publicOnly : false;
    for (const evt in events) {
      if (!events.hasOwnProperty(evt) || this[evt] && !override) {
        continue;
      }
      if (publicOnly && events[evt].indexOf('public_') === -1) {
        continue;
      }
      this[evt] = events[evt];
    }
  }
}
/* harmony default export */ __webpack_exports__["default"] = (EventsBase);

/***/ }),

/***/ "./src/dash/vo/UTCTiming.js":
/*!**********************************!*\
  !*** ./src/dash/vo/UTCTiming.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class UTCTiming {
  constructor() {
    // UTCTiming is a DescriptorType and doesn't have any additional fields
    this.schemeIdUri = '';
    this.value = '';
  }
}
/* harmony default export */ __webpack_exports__["default"] = (UTCTiming);

/***/ }),

/***/ "./src/streaming/MediaPlayerEvents.js":
/*!********************************************!*\
  !*** ./src/streaming/MediaPlayerEvents.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_events_EventsBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/events/EventsBase.js */ "./src/core/events/EventsBase.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @class
 * @implements EventsBase
 */
class MediaPlayerEvents extends _core_events_EventsBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @description Public facing external events to be used when developing a player that implements dash.js.
   */
  constructor() {
    super();
    /**
     * Triggered when playback will not start yet
     * as the MPD's availabilityStartTime is in the future.
     * Check delay property in payload to determine time before playback will start.
     * @event MediaPlayerEvents#AST_IN_FUTURE
     */
    this.AST_IN_FUTURE = 'astInFuture';

    /**
     * Triggered when the BaseURLs have been updated.
     * @event MediaPlayerEvents#BASE_URLS_UPDATED
     */
    this.BASE_URLS_UPDATED = 'baseUrlsUpdated';

    /**
     * Triggered when the video element's buffer state changes to stalled.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_EMPTY
     */
    this.BUFFER_EMPTY = 'bufferStalled';

    /**
     * Triggered when the video element's buffer state changes to loaded.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_LOADED
     */
    this.BUFFER_LOADED = 'bufferLoaded';

    /**
     * Triggered when the video element's buffer state changes, either stalled or loaded. Check payload for state.
     * @event MediaPlayerEvents#BUFFER_LEVEL_STATE_CHANGED
     */
    this.BUFFER_LEVEL_STATE_CHANGED = 'bufferStateChanged';

    /**
     * Triggered when the buffer level of a media type has been updated
     * @event MediaPlayerEvents#BUFFER_LEVEL_UPDATED
     */
    this.BUFFER_LEVEL_UPDATED = 'bufferLevelUpdated';

    /**
     * Triggered when a font signalled by a DVB Font Download has been added to the document FontFaceSet interface.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_ADDED
     */
    this.DVB_FONT_DOWNLOAD_ADDED = 'dvbFontDownloadAdded';

    /**
     * Triggered when a font signalled by a DVB Font Download has successfully downloaded and the FontFace can be used.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_COMPLETE
     */
    this.DVB_FONT_DOWNLOAD_COMPLETE = 'dvbFontDownloadComplete';

    /**
     * Triggered when a font signalled by a DVB Font Download could not be successfully downloaded, so the FontFace will not be used.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_FAILED
     */
    this.DVB_FONT_DOWNLOAD_FAILED = 'dvbFontDownloadFailed';

    /**
     * Triggered when a dynamic stream changed to static (transition phase between Live and On-Demand).
     * @event MediaPlayerEvents#DYNAMIC_TO_STATIC
     */
    this.DYNAMIC_TO_STATIC = 'dynamicToStatic';

    /**
     * Triggered when there is an error from the element or MSE source buffer.
     * @event MediaPlayerEvents#ERROR
     */
    this.ERROR = 'error';
    /**
     * Triggered when a fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_COMPLETED
     */
    this.FRAGMENT_LOADING_COMPLETED = 'fragmentLoadingCompleted';

    /**
     * Triggered when a partial fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_PROGRESS
     */
    this.FRAGMENT_LOADING_PROGRESS = 'fragmentLoadingProgress';
    /**
     * Triggered when a fragment download has started.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_STARTED
     */
    this.FRAGMENT_LOADING_STARTED = 'fragmentLoadingStarted';

    /**
     * Triggered when a fragment download is abandoned due to detection of slow download base on the ABR abandon rule..
     * @event MediaPlayerEvents#FRAGMENT_LOADING_ABANDONED
     */
    this.FRAGMENT_LOADING_ABANDONED = 'fragmentLoadingAbandoned';

    /**
     * Triggered when {@link module:Debug} logger methods are called.
     * @event MediaPlayerEvents#LOG
     */
    this.LOG = 'log';

    /**
     * Triggered when the manifest load is started
     * @event MediaPlayerEvents#MANIFEST_LOADING_STARTED
     */
    this.MANIFEST_LOADING_STARTED = 'manifestLoadingStarted';

    /**
     * Triggered when the manifest loading is finished, providing the request object information
     * @event MediaPlayerEvents#MANIFEST_LOADING_FINISHED
     */
    this.MANIFEST_LOADING_FINISHED = 'manifestLoadingFinished';

    /**
     * Triggered when the manifest load is complete, providing the payload
     * @event MediaPlayerEvents#MANIFEST_LOADED
     */
    this.MANIFEST_LOADED = 'manifestLoaded';

    /**
     * Triggered anytime there is a change to the overall metrics.
     * @event MediaPlayerEvents#METRICS_CHANGED
     */
    this.METRICS_CHANGED = 'metricsChanged';

    /**
     * Triggered when an individual metric is added, updated or cleared.
     * @event MediaPlayerEvents#METRIC_CHANGED
     */
    this.METRIC_CHANGED = 'metricChanged';

    /**
     * Triggered every time a new metric is added.
     * @event MediaPlayerEvents#METRIC_ADDED
     */
    this.METRIC_ADDED = 'metricAdded';

    /**
     * Triggered every time a metric is updated.
     * @event MediaPlayerEvents#METRIC_UPDATED
     */
    this.METRIC_UPDATED = 'metricUpdated';

    /**
     * Triggered when a new stream (period) starts.
     * @event MediaPlayerEvents#PERIOD_SWITCH_STARTED
     */
    this.PERIOD_SWITCH_STARTED = 'periodSwitchStarted';

    /**
     * Triggered at the stream end of a period.
     * @event MediaPlayerEvents#PERIOD_SWITCH_COMPLETED
     */
    this.PERIOD_SWITCH_COMPLETED = 'periodSwitchCompleted';

    /**
     * Triggered when an ABR up /down switch is initiated; either by user in manual mode or auto mode via ABR rules.
     * @event MediaPlayerEvents#QUALITY_CHANGE_REQUESTED
     */
    this.QUALITY_CHANGE_REQUESTED = 'qualityChangeRequested';

    /**
     * Triggered when the new ABR quality is being rendered on-screen.
     * @event MediaPlayerEvents#QUALITY_CHANGE_RENDERED
     */
    this.QUALITY_CHANGE_RENDERED = 'qualityChangeRendered';

    /**
     * Triggered when the new track is being selected
     * @event MediaPlayerEvents#NEW_TRACK_SELECTED
     */
    this.NEW_TRACK_SELECTED = 'newTrackSelected';

    /**
     * Triggered when the new track is being rendered.
     * @event MediaPlayerEvents#TRACK_CHANGE_RENDERED
     */
    this.TRACK_CHANGE_RENDERED = 'trackChangeRendered';

    /**
     * Triggered when a stream (period) is being loaded
     * @event MediaPlayerEvents#STREAM_INITIALIZING
     */
    this.STREAM_INITIALIZING = 'streamInitializing';

    /**
     * Triggered when a stream (period) is loaded
     * @event MediaPlayerEvents#STREAM_UPDATED
     */
    this.STREAM_UPDATED = 'streamUpdated';

    /**
     * Triggered when a stream (period) is activated
     * @event MediaPlayerEvents#STREAM_ACTIVATED
     */
    this.STREAM_ACTIVATED = 'streamActivated';

    /**
     * Triggered when a stream (period) is deactivated
     * @event MediaPlayerEvents#STREAM_DEACTIVATED
     */
    this.STREAM_DEACTIVATED = 'streamDeactivated';

    /**
     * Triggered when a stream (period) is activated
     * @event MediaPlayerEvents#STREAM_INITIALIZED
     */
    this.STREAM_INITIALIZED = 'streamInitialized';

    /**
     * Triggered when the player has been reset.
     * @event MediaPlayerEvents#STREAM_TEARDOWN_COMPLETE
     */
    this.STREAM_TEARDOWN_COMPLETE = 'streamTeardownComplete';

    /**
     * Triggered once all text tracks detected in the MPD are added to the video element.
     * @event MediaPlayerEvents#TEXT_TRACKS_ADDED
     */
    this.TEXT_TRACKS_ADDED = 'allTextTracksAdded';

    /**
     * Triggered when a text track is added to the video element's TextTrackList
     * @event MediaPlayerEvents#TEXT_TRACK_ADDED
     */
    this.TEXT_TRACK_ADDED = 'textTrackAdded';

    /**
     * Triggered when a text track should be shown
     * @event MediaPlayerEvents#CUE_ENTER
     */
    this.CUE_ENTER = 'cueEnter';

    /**
     * Triggered when a text track should be hidden
     * @event MediaPlayerEvents#CUE_ENTER
     */
    this.CUE_EXIT = 'cueExit';

    /**
     * Triggered when a throughput measurement based on the last segment request has been stored
     * @event MediaPlayerEvents#THROUGHPUT_MEASUREMENT_STORED
     */
    this.THROUGHPUT_MEASUREMENT_STORED = 'throughputMeasurementStored';

    /**
     * Triggered when a ttml chunk is parsed.
     * @event MediaPlayerEvents#TTML_PARSED
     */
    this.TTML_PARSED = 'ttmlParsed';

    /**
     * Triggered when a ttml chunk has to be parsed.
     * @event MediaPlayerEvents#TTML_TO_PARSE
     */
    this.TTML_TO_PARSE = 'ttmlToParse';

    /**
     * Triggered when a caption is rendered.
     * @event MediaPlayerEvents#CAPTION_RENDERED
     */
    this.CAPTION_RENDERED = 'captionRendered';

    /**
     * Triggered when the caption container is resized.
     * @event MediaPlayerEvents#CAPTION_CONTAINER_RESIZE
     */
    this.CAPTION_CONTAINER_RESIZE = 'captionContainerResize';

    /**
     * Sent when enough data is available that the media can be played,
     * at least for a couple of frames.  This corresponds to the
     * HAVE_ENOUGH_DATA readyState.
     * @event MediaPlayerEvents#CAN_PLAY
     */
    this.CAN_PLAY = 'canPlay';

    /**
     * This corresponds to the CAN_PLAY_THROUGH readyState.
     * @event MediaPlayerEvents#CAN_PLAY_THROUGH
     */
    this.CAN_PLAY_THROUGH = 'canPlayThrough';

    /**
     * Sent when playback completes.
     * @event MediaPlayerEvents#PLAYBACK_ENDED
     */
    this.PLAYBACK_ENDED = 'playbackEnded';

    /**
     * Sent when an error occurs.  The element's error
     * attribute contains more information.
     * @event MediaPlayerEvents#PLAYBACK_ERROR
     */
    this.PLAYBACK_ERROR = 'playbackError';

    /**
     * This event is fired once the playback has been initialized by MediaPlayer.js.
     * After that event methods such as setTextTrack() can be used.
     * @event MediaPlayerEvents#PLAYBACK_INITIALIZED
     */
    this.PLAYBACK_INITIALIZED = 'playbackInitialized';

    /**
     * Sent when playback is not allowed (for example if user gesture is needed).
     * @event MediaPlayerEvents#PLAYBACK_NOT_ALLOWED
     */
    this.PLAYBACK_NOT_ALLOWED = 'playbackNotAllowed';

    /**
     * The media's metadata has finished loading; all attributes now
     * contain as much useful information as they're going to.
     * @event MediaPlayerEvents#PLAYBACK_METADATA_LOADED
     */
    this.PLAYBACK_METADATA_LOADED = 'playbackMetaDataLoaded';

    /**
     * The event is fired when the frame at the current playback position of the media has finished loading;
     * often the first frame
     * @event MediaPlayerEvents#PLAYBACK_LOADED_DATA
     */
    this.PLAYBACK_LOADED_DATA = 'playbackLoadedData';

    /**
     * Sent when playback is paused.
     * @event MediaPlayerEvents#PLAYBACK_PAUSED
     */
    this.PLAYBACK_PAUSED = 'playbackPaused';

    /**
     * Sent when the media begins to play (either for the first time, after having been paused,
     * or after ending and then restarting).
     *
     * @event MediaPlayerEvents#PLAYBACK_PLAYING
     */
    this.PLAYBACK_PLAYING = 'playbackPlaying';

    /**
     * Sent periodically to inform interested parties of progress downloading
     * the media. Information about the current amount of the media that has
     * been downloaded is available in the media element's buffered attribute.
     * @event MediaPlayerEvents#PLAYBACK_PROGRESS
     */
    this.PLAYBACK_PROGRESS = 'playbackProgress';

    /**
     * Sent when the playback speed changes.
     * @event MediaPlayerEvents#PLAYBACK_RATE_CHANGED
     */
    this.PLAYBACK_RATE_CHANGED = 'playbackRateChanged';

    /**
     * Sent when a seek operation completes.
     * @event MediaPlayerEvents#PLAYBACK_SEEKED
     */
    this.PLAYBACK_SEEKED = 'playbackSeeked';

    /**
     * Sent when a seek operation begins.
     * @event MediaPlayerEvents#PLAYBACK_SEEKING
     */
    this.PLAYBACK_SEEKING = 'playbackSeeking';

    /**
     * Sent when the video element reports stalled
     * @event MediaPlayerEvents#PLAYBACK_STALLED
     */
    this.PLAYBACK_STALLED = 'playbackStalled';

    /**
     * Sent when playback of the media starts after having been paused;
     * that is, when playback is resumed after a prior pause event.
     *
     * @event MediaPlayerEvents#PLAYBACK_STARTED
     */
    this.PLAYBACK_STARTED = 'playbackStarted';

    /**
     * The time indicated by the element's currentTime attribute has changed.
     * @event MediaPlayerEvents#PLAYBACK_TIME_UPDATED
     */
    this.PLAYBACK_TIME_UPDATED = 'playbackTimeUpdated';

    /**
     * Sent when the video element reports that the volume has changed
     * @event MediaPlayerEvents#PLAYBACK_VOLUME_CHANGED
     */
    this.PLAYBACK_VOLUME_CHANGED = 'playbackVolumeChanged';

    /**
     * Sent when the media playback has stopped because of a temporary lack of data.
     *
     * @event MediaPlayerEvents#PLAYBACK_WAITING
     */
    this.PLAYBACK_WAITING = 'playbackWaiting';

    /**
     * Manifest validity changed - As a result of an MPD validity expiration event.
     * @event MediaPlayerEvents#MANIFEST_VALIDITY_CHANGED
     */
    this.MANIFEST_VALIDITY_CHANGED = 'manifestValidityChanged';

    /**
     * Dash events are triggered at their respective start points on the timeline.
     * @event MediaPlayerEvents#EVENT_MODE_ON_START
     */
    this.EVENT_MODE_ON_START = 'eventModeOnStart';

    /**
     * Dash events are triggered as soon as they were parsed.
     * @event MediaPlayerEvents#EVENT_MODE_ON_RECEIVE
     */
    this.EVENT_MODE_ON_RECEIVE = 'eventModeOnReceive';

    /**
     * Event that is dispatched whenever the player encounters a potential conformance validation that might lead to unexpected/not optimal behavior
     * @event MediaPlayerEvents#CONFORMANCE_VIOLATION
     */
    this.CONFORMANCE_VIOLATION = 'conformanceViolation';

    /**
     * Event that is dispatched whenever the player switches to a different representation
     * @event MediaPlayerEvents#REPRESENTATION_SWITCH
     */
    this.REPRESENTATION_SWITCH = 'representationSwitch';

    /**
     * Event that is dispatched whenever an adaptation set is removed due to all representations not being supported.
     * @event MediaPlayerEvents#ADAPTATION_SET_REMOVED_NO_CAPABILITIES
     */
    this.ADAPTATION_SET_REMOVED_NO_CAPABILITIES = 'adaptationSetRemovedNoCapabilities';

    /**
     * Triggered when a content steering request has completed.
     * @event MediaPlayerEvents#CONTENT_STEERING_REQUEST_COMPLETED
     */
    this.CONTENT_STEERING_REQUEST_COMPLETED = 'contentSteeringRequestCompleted';

    /**
     * Triggered when an inband prft (ProducerReferenceTime) boxes has been received.
     * @event MediaPlayerEvents#INBAND_PRFT
     */
    this.INBAND_PRFT = 'inbandPrft';

    /**
     * The streaming attribute of the Managed Media Source is true
     * @type {string}
     */
    this.MANAGED_MEDIA_SOURCE_START_STREAMING = 'managedMediaSourceStartStreaming';

    /**
     * The streaming attribute of the Managed Media Source is false
     * @type {string}
     */
    this.MANAGED_MEDIA_SOURCE_END_STREAMING = 'managedMediaSourceEndStreaming';
  }
}
let mediaPlayerEvents = new MediaPlayerEvents();
/* harmony default export */ __webpack_exports__["default"] = (mediaPlayerEvents);

/***/ }),

/***/ "./src/streaming/constants/Constants.js":
/*!**********************************************!*\
  !*** ./src/streaming/constants/Constants.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Constants declaration
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   *  @constant {string} STREAM Stream media type. Mainly used to report metrics relative to the full stream
   *  @memberof Constants#
   *  @static
   */
  STREAM: 'stream',
  /**
   *  @constant {string} VIDEO Video media type
   *  @memberof Constants#
   *  @static
   */
  VIDEO: 'video',
  /**
   *  @constant {string} AUDIO Audio media type
   *  @memberof Constants#
   *  @static
   */
  AUDIO: 'audio',
  /**
   *  @constant {string} TEXT Text media type
   *  @memberof Constants#
   *  @static
   */
  TEXT: 'text',
  /**
   *  @constant {string} MUXED Muxed (video/audio in the same chunk) media type
   *  @memberof Constants#
   *  @static
   */
  MUXED: 'muxed',
  /**
   *  @constant {string} IMAGE Image media type
   *  @memberof Constants#
   *  @static
   */
  IMAGE: 'image',
  /**
   *  @constant {string} STPP STTP Subtitles format
   *  @memberof Constants#
   *  @static
   */
  STPP: 'stpp',
  /**
   *  @constant {string} TTML STTP Subtitles format
   *  @memberof Constants#
   *  @static
   */
  TTML: 'ttml',
  /**
   *  @constant {string} VTT STTP Subtitles format
   *  @memberof Constants#
   *  @static
   */
  VTT: 'vtt',
  /**
   *  @constant {string} WVTT STTP Subtitles format
   *  @memberof Constants#
   *  @static
   */
  WVTT: 'wvtt',
  /**
   *  @constant {string} Content Steering
   *  @memberof Constants#
   *  @static
   */
  CONTENT_STEERING: 'contentSteering',
  /**
   *  @constant {string} LIVE_CATCHUP_MODE_DEFAULT Throughput calculation based on moof parsing
   *  @memberof Constants#
   *  @static
   */
  LIVE_CATCHUP_MODE_DEFAULT: 'liveCatchupModeDefault',
  /**
   *  @constant {string} LIVE_CATCHUP_MODE_LOLP Throughput calculation based on moof parsing
   *  @memberof Constants#
   *  @static
   */
  LIVE_CATCHUP_MODE_LOLP: 'liveCatchupModeLoLP',
  /**
   *  @constant {string} MOVING_AVERAGE_SLIDING_WINDOW Moving average sliding window
   *  @memberof Constants#
   *  @static
   */
  MOVING_AVERAGE_SLIDING_WINDOW: 'slidingWindow',
  /**
   *  @constant {string} EWMA Exponential moving average
   *  @memberof Constants#
   *  @static
   */
  MOVING_AVERAGE_EWMA: 'ewma',
  /**
   *  @constant {string} BAD_ARGUMENT_ERROR Invalid Arguments type of error
   *  @memberof Constants#
   *  @static
   */
  BAD_ARGUMENT_ERROR: 'Invalid Arguments',
  /**
   *  @constant {string} MISSING_CONFIG_ERROR Missing configuration parameters type of error
   *  @memberof Constants#
   *  @static
   */
  MISSING_CONFIG_ERROR: 'Missing config parameter(s)',
  /**
   *  @constant {string} TRACK_SWITCH_MODE_ALWAYS_REPLACE used to clear the buffered data (prior to current playback position) after track switch. Default for audio
   *  @memberof Constants#
   *  @static
   */
  TRACK_SWITCH_MODE_ALWAYS_REPLACE: 'alwaysReplace',
  /**
   *  @constant {string} TRACK_SWITCH_MODE_NEVER_REPLACE used to forbid clearing the buffered data (prior to current playback position) after track switch. Defers to fastSwitchEnabled for placement of new data. Default for video
   *  @memberof Constants#
   *  @static
   */
  TRACK_SWITCH_MODE_NEVER_REPLACE: 'neverReplace',
  /**
   *  @constant {string} TRACK_SELECTION_MODE_FIRST_TRACK makes the player select the first track found in the manifest.
   *  @memberof Constants#
   *  @static
   */
  TRACK_SELECTION_MODE_FIRST_TRACK: 'firstTrack',
  /**
   *  @constant {string} TRACK_SELECTION_MODE_HIGHEST_BITRATE makes the player select the track with a highest bitrate. This mode is a default mode.
   *  @memberof Constants#
   *  @static
   */
  TRACK_SELECTION_MODE_HIGHEST_BITRATE: 'highestBitrate',
  /**
   *  @constant {string} TRACK_SELECTION_MODE_HIGHEST_EFFICIENCY makes the player select the track with the lowest bitrate per pixel average.
   *  @memberof Constants#
   *  @static
   */
  TRACK_SELECTION_MODE_HIGHEST_EFFICIENCY: 'highestEfficiency',
  /**
   *  @constant {string} TRACK_SELECTION_MODE_WIDEST_RANGE makes the player select the track with a widest range of bitrates.
   *  @memberof Constants#
   *  @static
   */
  TRACK_SELECTION_MODE_WIDEST_RANGE: 'widestRange',
  /**
   *  @constant {string} CMCD_QUERY_KEY specifies the key that is used for the CMCD query parameter.
   *  @memberof Constants#
   *  @static
   */
  CMCD_QUERY_KEY: 'CMCD',
  /**
   *  @constant {string} CMCD_MODE_QUERY specifies to attach CMCD metrics as query parameters.
   *  @memberof Constants#
   *  @static
   */
  CMCD_MODE_QUERY: 'query',
  /**
   *  @constant {string} CMCD_MODE_HEADER specifies to attach CMCD metrics as HTTP headers.
   *  @memberof Constants#
   *  @static
   */
  CMCD_MODE_HEADER: 'header',
  /**
   *  @constant {string} CMCD_AVAILABLE_KEYS specifies all the available keys for CMCD metrics.
   *  @memberof Constants#
   *  @static
   */
  CMCD_AVAILABLE_KEYS: ['br', 'd', 'ot', 'tb', 'bl', 'dl', 'mtp', 'nor', 'nrr', 'su', 'bs', 'rtp', 'cid', 'pr', 'sf', 'sid', 'st', 'v'],
  /**
   *  @constant {string} CMCD_AVAILABLE_KEYS_V2 specifies all the available keys for CMCD version 2 metrics.
   *  @memberof Constants#
   *  @static
   */
  CMCD_V2_AVAILABLE_KEYS: ['msd', 'ltc'],
  /**
   *  @constant {string} CMCD_AVAILABLE_REQUESTS specifies all the available requests type for CMCD metrics.
   *  @memberof Constants#
   *  @static
   */
  CMCD_AVAILABLE_REQUESTS: ['segment', 'mpd', 'xlink', 'steering', 'other'],
  INITIALIZE: 'initialize',
  TEXT_SHOWING: 'showing',
  TEXT_HIDDEN: 'hidden',
  TEXT_DISABLED: 'disabled',
  ACCESSIBILITY_CEA608_SCHEME: 'urn:scte:dash:cc:cea-608:2015',
  CC1: 'CC1',
  CC3: 'CC3',
  UTF8: 'utf-8',
  SCHEME_ID_URI: 'schemeIdUri',
  START_TIME: 'starttime',
  SERVICE_DESCRIPTION_DVB_LL_SCHEME: 'urn:dvb:dash:lowlatency:scope:2019',
  SUPPLEMENTAL_PROPERTY_DVB_LL_SCHEME: 'urn:dvb:dash:lowlatency:critical:2019',
  CTA_5004_2023_SCHEME: 'urn:mpeg:dash:cta-5004:2023',
  THUMBNAILS_SCHEME_ID_URIS: ['http://dashif.org/thumbnail_tile', 'http://dashif.org/guidelines/thumbnail_tile'],
  FONT_DOWNLOAD_DVB_SCHEME: 'urn:dvb:dash:fontdownload:2014',
  COLOUR_PRIMARIES_SCHEME_ID_URI: 'urn:mpeg:mpegB:cicp:ColourPrimaries',
  URL_QUERY_INFO_SCHEME: 'urn:mpeg:dash:urlparam:2014',
  EXT_URL_QUERY_INFO_SCHEME: 'urn:mpeg:dash:urlparam:2016',
  MATRIX_COEFFICIENTS_SCHEME_ID_URI: 'urn:mpeg:mpegB:cicp:MatrixCoefficients',
  TRANSFER_CHARACTERISTICS_SCHEME_ID_URI: 'urn:mpeg:mpegB:cicp:TransferCharacteristics',
  HDR_METADATA_FORMAT_SCHEME_ID_URI: 'urn:dvb:dash:hdr-dmi',
  HDR_METADATA_FORMAT_VALUES: {
    ST2094_10: 'ST2094-10',
    SL_HDR2: 'SL-HDR2',
    ST2094_40: 'ST2094-40'
  },
  MEDIA_CAPABILITIES_API: {
    COLORGAMUT: {
      SRGB: 'srgb',
      P3: 'p3',
      REC2020: 'rec2020'
    },
    TRANSFERFUNCTION: {
      SRGB: 'srgb',
      PQ: 'pq',
      HLG: 'hlg'
    },
    HDR_METADATATYPE: {
      SMPTE_ST_2094_10: 'smpteSt2094-10',
      SLHDR2: 'slhdr2',
      SMPTE_ST_2094_40: 'smpteSt2094-40'
    }
  },
  XML: 'XML',
  ARRAY_BUFFER: 'ArrayBuffer',
  DVB_REPORTING_URL: 'dvb:reportingUrl',
  DVB_PROBABILITY: 'dvb:probability',
  OFF_MIMETYPE: 'application/font-sfnt',
  WOFF_MIMETYPE: 'application/font-woff',
  VIDEO_ELEMENT_READY_STATES: {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4
  },
  FILE_LOADER_TYPES: {
    FETCH: 'fetch_loader',
    XHR: 'xhr_loader'
  },
  THROUGHPUT_TYPES: {
    LATENCY: 'throughput_type_latency',
    BANDWIDTH: 'throughput_type_bandwidth'
  },
  THROUGHPUT_CALCULATION_MODES: {
    EWMA: 'throughputCalculationModeEwma',
    ZLEMA: 'throughputCalculationModeZlema',
    ARITHMETIC_MEAN: 'throughputCalculationModeArithmeticMean',
    BYTE_SIZE_WEIGHTED_ARITHMETIC_MEAN: 'throughputCalculationModeByteSizeWeightedArithmeticMean',
    DATE_WEIGHTED_ARITHMETIC_MEAN: 'throughputCalculationModeDateWeightedArithmeticMean',
    HARMONIC_MEAN: 'throughputCalculationModeHarmonicMean',
    BYTE_SIZE_WEIGHTED_HARMONIC_MEAN: 'throughputCalculationModeByteSizeWeightedHarmonicMean',
    DATE_WEIGHTED_HARMONIC_MEAN: 'throughputCalculationModeDateWeightedHarmonicMean'
  },
  LOW_LATENCY_DOWNLOAD_TIME_CALCULATION_MODE: {
    MOOF_PARSING: 'lowLatencyDownloadTimeCalculationModeMoofParsing',
    DOWNLOADED_DATA: 'lowLatencyDownloadTimeCalculationModeDownloadedData',
    AAST: 'lowLatencyDownloadTimeCalculationModeAast'
  },
  RULES_TYPES: {
    QUALITY_SWITCH_RULES: 'qualitySwitchRules',
    ABANDON_FRAGMENT_RULES: 'abandonFragmentRules'
  },
  QUALITY_SWITCH_RULES: {
    BOLA_RULE: 'BolaRule',
    THROUGHPUT_RULE: 'ThroughputRule',
    INSUFFICIENT_BUFFER_RULE: 'InsufficientBufferRule',
    SWITCH_HISTORY_RULE: 'SwitchHistoryRule',
    DROPPED_FRAMES_RULE: 'DroppedFramesRule',
    LEARN_TO_ADAPT_RULE: 'L2ARule',
    LOL_PLUS_RULE: 'LoLPRule'
  },
  ABANDON_FRAGMENT_RULES: {
    ABANDON_REQUEST_RULE: 'AbandonRequestsRule'
  },
  /**
   *  @constant {string} ID3_SCHEME_ID_URI specifies scheme ID URI for ID3 timed metadata
   *  @memberof Constants#
   *  @static
   */
  ID3_SCHEME_ID_URI: 'https://aomedia.org/emsg/ID3',
  COMMON_ACCESS_TOKEN_HEADER: 'common-access-token',
  DASH_ROLE_SCHEME_ID: 'urn:mpeg:dash:role:2011',
  CODEC_FAMILIES: {
    MP3: 'mp3',
    AAC: 'aac',
    AC3: 'ac3',
    EC3: 'ec3',
    DTSX: 'dtsx',
    DTSC: 'dtsc',
    AVC: 'avc',
    HEVC: 'hevc'
  }
});

/***/ }),

/***/ "./src/streaming/metrics/MetricsReportingEvents.js":
/*!*********************************************************!*\
  !*** ./src/streaming/metrics/MetricsReportingEvents.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_events_EventsBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/events/EventsBase.js */ "./src/core/events/EventsBase.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @class
 * @implements EventsBase
 */
class MetricsReportingEvents extends _core_events_EventsBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.METRICS_INITIALISATION_COMPLETE = 'internal_metricsReportingInitialized';
    this.BECAME_REPORTING_PLAYER = 'internal_becameReportingPlayer';

    /**
     * Triggered when CMCD data was generated for a HTTP request
     * @event MetricsReportingEvents#CMCD_DATA_GENERATED
     */
    this.CMCD_DATA_GENERATED = 'cmcdDataGenerated';
  }
}
let metricsReportingEvents = new MetricsReportingEvents();
/* harmony default export */ __webpack_exports__["default"] = (metricsReportingEvents);

/***/ }),

/***/ "./src/streaming/metrics/controllers/MetricsCollectionController.js":
/*!**************************************************************************!*\
  !*** ./src/streaming/metrics/controllers/MetricsCollectionController.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MetricsController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MetricsController.js */ "./src/streaming/metrics/controllers/MetricsController.js");
/* harmony import */ var _utils_ManifestParsing_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ManifestParsing.js */ "./src/streaming/metrics/utils/ManifestParsing.js");
/* harmony import */ var _MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MetricsReportingEvents.js */ "./src/streaming/metrics/MetricsReportingEvents.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */





function MetricsCollectionController(config) {
  config = config || {};
  let instance;
  let metricsControllers = {};
  let context = this.context;
  let eventBus = config.eventBus;
  const events = config.events;
  function update(e) {
    if (e.error) {
      return;
    }

    // start by assuming all existing controllers need removing
    let controllersToRemove = Object.keys(metricsControllers);
    const metrics = (0,_utils_ManifestParsing_js__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance({
      adapter: config.adapter,
      constants: config.constants
    }).getMetrics(e.manifest);
    metrics.forEach(m => {
      const key = JSON.stringify(m);
      if (!metricsControllers.hasOwnProperty(key)) {
        try {
          let controller = (0,_MetricsController_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create(config);
          controller.initialize(m);
          metricsControllers[key] = controller;
        } catch (e) {
          // fail quietly
        }
      } else {
        // we still need this controller - delete from removal list
        controllersToRemove.splice(key, 1);
      }
    });

    // now remove the unwanted controllers
    controllersToRemove.forEach(c => {
      metricsControllers[c].reset();
      delete metricsControllers[c];
    });
    eventBus.trigger(_MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_2__["default"].METRICS_INITIALISATION_COMPLETE);
  }
  function resetMetricsControllers() {
    Object.keys(metricsControllers).forEach(key => {
      metricsControllers[key].reset();
    });
    metricsControllers = {};
  }
  function setup() {
    eventBus.on(events.MANIFEST_UPDATED, update, instance);
    eventBus.on(events.STREAM_TEARDOWN_COMPLETE, resetMetricsControllers, instance);
  }
  function reset() {
    eventBus.off(events.MANIFEST_UPDATED, update, instance);
    eventBus.off(events.STREAM_TEARDOWN_COMPLETE, resetMetricsControllers, instance);
  }
  instance = {
    reset: reset
  };
  setup();
  return instance;
}
MetricsCollectionController.__dashjs_factory_name = 'MetricsCollectionController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__["default"].getClassFactory(MetricsCollectionController));

/***/ }),

/***/ "./src/streaming/metrics/controllers/MetricsController.js":
/*!****************************************************************!*\
  !*** ./src/streaming/metrics/controllers/MetricsController.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RangeController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RangeController.js */ "./src/streaming/metrics/controllers/RangeController.js");
/* harmony import */ var _ReportingController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReportingController.js */ "./src/streaming/metrics/controllers/ReportingController.js");
/* harmony import */ var _MetricsHandlersController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MetricsHandlersController.js */ "./src/streaming/metrics/controllers/MetricsHandlersController.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */





function MetricsController(config) {
  config = config || {};
  let metricsHandlersController, reportingController, rangeController, instance;
  let context = this.context;
  function initialize(metricsEntry) {
    try {
      rangeController = (0,_RangeController_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create({
        mediaElement: config.mediaElement
      });
      rangeController.initialize(metricsEntry.Range);
      reportingController = (0,_ReportingController_js__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create({
        debug: config.debug,
        metricsConstants: config.metricsConstants,
        mediaPlayerModel: config.mediaPlayerModel
      });
      reportingController.initialize(metricsEntry.Reporting, rangeController);
      metricsHandlersController = (0,_MetricsHandlersController_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create({
        debug: config.debug,
        eventBus: config.eventBus,
        metricsConstants: config.metricsConstants,
        events: config.events
      });
      metricsHandlersController.initialize(metricsEntry.metrics, reportingController);
    } catch (e) {
      reset();
      throw e;
    }
  }
  function reset() {
    if (metricsHandlersController) {
      metricsHandlersController.reset();
    }
    if (reportingController) {
      reportingController.reset();
    }
    if (rangeController) {
      rangeController.reset();
    }
  }
  instance = {
    initialize: initialize,
    reset: reset
  };
  return instance;
}
MetricsController.__dashjs_factory_name = 'MetricsController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__["default"].getClassFactory(MetricsController));

/***/ }),

/***/ "./src/streaming/metrics/controllers/MetricsHandlersController.js":
/*!************************************************************************!*\
  !*** ./src/streaming/metrics/controllers/MetricsHandlersController.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metrics_MetricsHandlerFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metrics/MetricsHandlerFactory.js */ "./src/streaming/metrics/metrics/MetricsHandlerFactory.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



function MetricsHandlersController(config) {
  config = config || {};
  let handlers = [];
  let instance;
  const context = this.context;
  const eventBus = config.eventBus;
  const Events = config.events;
  let metricsHandlerFactory = (0,_metrics_MetricsHandlerFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance({
    debug: config.debug,
    eventBus: config.eventBus,
    metricsConstants: config.metricsConstants
  });
  function handle(e) {
    handlers.forEach(handler => {
      handler.handleNewMetric(e.metric, e.value, e.mediaType);
    });
  }
  function initialize(metrics, reportingController) {
    metrics.split(',').forEach((m, midx, ms) => {
      let handler;

      // there is a bug in ISO23009-1 where the metrics attribute
      // is a comma-separated list but HttpList key can contain a
      // comma enclosed by ().
      if (m.indexOf('(') !== -1 && m.indexOf(')') === -1) {
        let nextm = ms[midx + 1];
        if (nextm && nextm.indexOf('(') === -1 && nextm.indexOf(')') !== -1) {
          m += ',' + nextm;

          // delete the next metric so forEach does not visit.
          delete ms[midx + 1];
        }
      }
      handler = metricsHandlerFactory.create(m, reportingController);
      if (handler) {
        handlers.push(handler);
      }
    });
    eventBus.on(Events.METRIC_ADDED, handle, instance);
    eventBus.on(Events.METRIC_UPDATED, handle, instance);
  }
  function reset() {
    eventBus.off(Events.METRIC_ADDED, handle, instance);
    eventBus.off(Events.METRIC_UPDATED, handle, instance);
    handlers.forEach(handler => handler.reset());
    handlers = [];
  }
  instance = {
    initialize: initialize,
    reset: reset
  };
  return instance;
}
MetricsHandlersController.__dashjs_factory_name = 'MetricsHandlersController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(MetricsHandlersController));

/***/ }),

/***/ "./src/streaming/metrics/controllers/RangeController.js":
/*!**************************************************************!*\
  !*** ./src/streaming/metrics/controllers/RangeController.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_CustomTimeRanges_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/CustomTimeRanges.js */ "./src/streaming/utils/CustomTimeRanges.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



function RangeController(config) {
  config = config || {};
  let useWallClockTime = false;
  let context = this.context;
  let instance, ranges;
  let mediaElement = config.mediaElement;
  function initialize(rs) {
    if (rs && rs.length) {
      rs.forEach(r => {
        let start = r.starttime;
        let end = start + r.duration;
        ranges.add(start, end);
      });
      useWallClockTime = !!rs[0]._useWallClockTime;
    }
  }
  function reset() {
    ranges.clear();
  }
  function setup() {
    ranges = (0,_utils_CustomTimeRanges_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create();
  }
  function isEnabled() {
    let numRanges = ranges.length;
    let time;
    if (!numRanges) {
      return true;
    }

    // When not present, DASH Metrics reporting is requested
    // for the whole duration of the content.
    time = useWallClockTime ? new Date().getTime() / 1000 : mediaElement.currentTime;
    for (let i = 0; i < numRanges; i += 1) {
      let start = ranges.start(i);
      let end = ranges.end(i);
      if (start <= time && time < end) {
        return true;
      }
    }
    return false;
  }
  instance = {
    initialize: initialize,
    reset: reset,
    isEnabled: isEnabled
  };
  setup();
  return instance;
}
RangeController.__dashjs_factory_name = 'RangeController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(RangeController));

/***/ }),

/***/ "./src/streaming/metrics/controllers/ReportingController.js":
/*!******************************************************************!*\
  !*** ./src/streaming/metrics/controllers/ReportingController.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reporting_ReportingFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reporting/ReportingFactory.js */ "./src/streaming/metrics/reporting/ReportingFactory.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



function ReportingController(config) {
  let reporters = [];
  let instance;
  const reportingFactory = (0,_reporting_ReportingFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.context).getInstance(config);
  function initialize(reporting, rangeController) {
    // "if multiple Reporting elements are present, it is expected that
    // the client processes one of the recognized reporting schemes."
    // to ignore this, and support multiple Reporting per Metric,
    // simply change the 'some' below to 'forEach'
    reporting.some(r => {
      let reporter = reportingFactory.create(r, rangeController);
      if (reporter) {
        reporters.push(reporter);
        return true;
      }
    });
  }
  function reset() {
    reporters.forEach(r => r.reset());
    reporters = [];
  }
  function report(type, vos) {
    reporters.forEach(r => r.report(type, vos));
  }
  instance = {
    initialize: initialize,
    reset: reset,
    report: report
  };
  return instance;
}
ReportingController.__dashjs_factory_name = 'ReportingController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(ReportingController));

/***/ }),

/***/ "./src/streaming/metrics/metrics/MetricsHandlerFactory.js":
/*!****************************************************************!*\
  !*** ./src/streaming/metrics/metrics/MetricsHandlerFactory.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _handlers_BufferLevelHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers/BufferLevelHandler.js */ "./src/streaming/metrics/metrics/handlers/BufferLevelHandler.js");
/* harmony import */ var _handlers_DVBErrorsHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers/DVBErrorsHandler.js */ "./src/streaming/metrics/metrics/handlers/DVBErrorsHandler.js");
/* harmony import */ var _handlers_HttpListHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers/HttpListHandler.js */ "./src/streaming/metrics/metrics/handlers/HttpListHandler.js");
/* harmony import */ var _handlers_GenericMetricHandler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handlers/GenericMetricHandler.js */ "./src/streaming/metrics/metrics/handlers/GenericMetricHandler.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */






function MetricsHandlerFactory(config) {
  config = config || {};
  let instance;
  const logger = config.debug ? config.debug.getLogger(instance) : {};

  // group 1: key, [group 3: n [, group 5: type]]
  let keyRegex = /([a-zA-Z]*)(\(([0-9]*)(\,\s*([a-zA-Z]*))?\))?/;
  const context = this.context;
  let knownFactoryProducts = {
    BufferLevel: _handlers_BufferLevelHandler_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    DVBErrors: _handlers_DVBErrorsHandler_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    HttpList: _handlers_HttpListHandler_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    PlayList: _handlers_GenericMetricHandler_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    RepSwitchList: _handlers_GenericMetricHandler_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    TcpList: _handlers_GenericMetricHandler_js__WEBPACK_IMPORTED_MODULE_3__["default"]
  };
  function create(listType, reportingController) {
    var matches = listType.match(keyRegex);
    var handler;
    if (!matches) {
      return;
    }
    try {
      handler = knownFactoryProducts[matches[1]](context).create({
        eventBus: config.eventBus,
        metricsConstants: config.metricsConstants
      });
      handler.initialize(matches[1], reportingController, matches[3], matches[5]);
    } catch (e) {
      handler = null;
      logger.error(`MetricsHandlerFactory: Could not create handler for type ${matches[1]} with args ${matches[3]}, ${matches[5]} (${e.message})`);
    }
    return handler;
  }
  function register(key, handler) {
    knownFactoryProducts[key] = handler;
  }
  function unregister(key) {
    delete knownFactoryProducts[key];
  }
  instance = {
    create: create,
    register: register,
    unregister: unregister
  };
  return instance;
}
MetricsHandlerFactory.__dashjs_factory_name = 'MetricsHandlerFactory';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_4__["default"].getSingletonFactory(MetricsHandlerFactory));

/***/ }),

/***/ "./src/streaming/metrics/metrics/handlers/BufferLevelHandler.js":
/*!**********************************************************************!*\
  !*** ./src/streaming/metrics/metrics/handlers/BufferLevelHandler.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_HandlerHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/HandlerHelpers.js */ "./src/streaming/metrics/utils/HandlerHelpers.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



function BufferLevelHandler(config) {
  config = config || {};
  let instance, reportingController, n, name, interval, lastReportedTime;
  let context = this.context;
  let handlerHelpers = (0,_utils_HandlerHelpers_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
  let storedVOs = [];
  const metricsConstants = config.metricsConstants;
  function getLowestBufferLevelVO() {
    try {
      return Object.keys(storedVOs).map(key => storedVOs[key]).reduce((a, b) => {
        return a.level < b.level ? a : b;
      });
    } catch (e) {
      return;
    }
  }
  function intervalCallback() {
    let vo = getLowestBufferLevelVO();
    if (vo) {
      if (lastReportedTime !== vo.t) {
        lastReportedTime = vo.t;
        reportingController.report(name, vo);
      }
    }
  }
  function initialize(basename, rc, n_ms) {
    if (rc) {
      // this will throw if n is invalid, to be
      // caught by the initialize caller.
      n = handlerHelpers.validateN(n_ms);
      reportingController = rc;
      name = handlerHelpers.reconstructFullMetricName(basename, n_ms);
      interval = setInterval(intervalCallback, n);
    }
  }
  function reset() {
    clearInterval(interval);
    interval = null;
    n = 0;
    reportingController = null;
    lastReportedTime = null;
  }
  function handleNewMetric(metric, vo, type) {
    if (metric === metricsConstants.BUFFER_LEVEL) {
      storedVOs[type] = vo;
    }
  }
  instance = {
    initialize: initialize,
    reset: reset,
    handleNewMetric: handleNewMetric
  };
  return instance;
}
BufferLevelHandler.__dashjs_factory_name = 'BufferLevelHandler';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(BufferLevelHandler));

/***/ }),

/***/ "./src/streaming/metrics/metrics/handlers/DVBErrorsHandler.js":
/*!********************************************************************!*\
  !*** ./src/streaming/metrics/metrics/handlers/DVBErrorsHandler.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../MetricsReportingEvents.js */ "./src/streaming/metrics/MetricsReportingEvents.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



function DVBErrorsHandler(config) {
  config = config || {};
  let instance, reportingController;
  let eventBus = config.eventBus;
  const metricsConstants = config.metricsConstants;
  function onInitialisationComplete() {
    // we only want to report this once per call to initialize
    eventBus.off(_MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_0__["default"].METRICS_INITIALISATION_COMPLETE, onInitialisationComplete, this);

    // Note: A Player becoming a reporting Player is itself
    // something which is recorded by the DVBErrors metric.
    eventBus.trigger(_MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_0__["default"].BECAME_REPORTING_PLAYER);
  }
  function initialize(unused, rc) {
    if (rc) {
      reportingController = rc;
      eventBus.on(_MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_0__["default"].METRICS_INITIALISATION_COMPLETE, onInitialisationComplete, this);
    }
  }
  function reset() {
    reportingController = null;
  }
  function handleNewMetric(metric, vo) {
    // simply pass metric straight through
    if (metric === metricsConstants.DVB_ERRORS) {
      if (reportingController) {
        reportingController.report(metric, vo);
      }
    }
  }
  instance = {
    initialize: initialize,
    reset: reset,
    handleNewMetric: handleNewMetric
  };
  return instance;
}
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(DVBErrorsHandler));

/***/ }),

/***/ "./src/streaming/metrics/metrics/handlers/GenericMetricHandler.js":
/*!************************************************************************!*\
  !*** ./src/streaming/metrics/metrics/handlers/GenericMetricHandler.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * @ignore
 */
function GenericMetricHandler() {
  let instance, metricName, reportingController;
  function initialize(name, rc) {
    metricName = name;
    reportingController = rc;
  }
  function reset() {
    reportingController = null;
    metricName = undefined;
  }
  function handleNewMetric(metric, vo) {
    // simply pass metric straight through
    if (metric === metricName) {
      if (reportingController) {
        reportingController.report(metricName, vo);
      }
    }
  }
  instance = {
    initialize: initialize,
    reset: reset,
    handleNewMetric: handleNewMetric
  };
  return instance;
}
GenericMetricHandler.__dashjs_factory_name = 'GenericMetricHandler';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(GenericMetricHandler));

/***/ }),

/***/ "./src/streaming/metrics/metrics/handlers/HttpListHandler.js":
/*!*******************************************************************!*\
  !*** ./src/streaming/metrics/metrics/handlers/HttpListHandler.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_HandlerHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/HandlerHelpers.js */ "./src/streaming/metrics/utils/HandlerHelpers.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



function HttpListHandler(config) {
  config = config || {};
  let instance, reportingController, n, type, name, interval;
  let storedVos = [];
  let handlerHelpers = (0,_utils_HandlerHelpers_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.context).getInstance();
  const metricsConstants = config.metricsConstants;
  function intervalCallback() {
    var vos = storedVos;
    if (vos.length) {
      if (reportingController) {
        reportingController.report(name, vos);
      }
    }
    storedVos = [];
  }
  function initialize(basename, rc, n_ms, requestType) {
    if (rc) {
      // this will throw if n is invalid, to be
      // caught by the initialize caller.
      n = handlerHelpers.validateN(n_ms);
      reportingController = rc;
      if (requestType && requestType.length) {
        type = requestType;
      }
      name = handlerHelpers.reconstructFullMetricName(basename, n_ms, requestType);
      interval = setInterval(intervalCallback, n);
    }
  }
  function reset() {
    clearInterval(interval);
    interval = null;
    n = null;
    type = null;
    storedVos = [];
    reportingController = null;
  }
  function handleNewMetric(metric, vo) {
    if (metric === metricsConstants.HTTP_REQUEST) {
      if (!type || type === vo.type) {
        storedVos.push(vo);
      }
    }
  }
  instance = {
    initialize: initialize,
    reset: reset,
    handleNewMetric: handleNewMetric
  };
  return instance;
}
HttpListHandler.__dashjs_factory_name = 'HttpListHandler';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(HttpListHandler));

/***/ }),

/***/ "./src/streaming/metrics/reporting/ReportingFactory.js":
/*!*************************************************************!*\
  !*** ./src/streaming/metrics/reporting/ReportingFactory.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reporters_DVBReporting_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reporters/DVBReporting.js */ "./src/streaming/metrics/reporting/reporters/DVBReporting.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



function ReportingFactory(config) {
  config = config || {};
  const knownReportingSchemeIdUris = {
    'urn:dvb:dash:reporting:2014': _reporters_DVBReporting_js__WEBPACK_IMPORTED_MODULE_0__["default"]
  };
  const context = this.context;
  let instance;
  const logger = config.debug ? config.debug.getLogger(instance) : {};
  const metricsConstants = config.metricsConstants;
  const mediaPlayerModel = config.mediaPlayerModel || {};
  function create(entry, rangeController) {
    let reporting;
    try {
      reporting = knownReportingSchemeIdUris[entry.schemeIdUri](context).create({
        metricsConstants: metricsConstants,
        mediaPlayerModel: mediaPlayerModel
      });
      reporting.initialize(entry, rangeController);
    } catch (e) {
      reporting = null;
      logger.error(`ReportingFactory: could not create Reporting with schemeIdUri ${entry.schemeIdUri} (${e.message})`);
    }
    return reporting;
  }
  function register(schemeIdUri, moduleName) {
    knownReportingSchemeIdUris[schemeIdUri] = moduleName;
  }
  function unregister(schemeIdUri) {
    delete knownReportingSchemeIdUris[schemeIdUri];
  }
  instance = {
    create: create,
    register: register,
    unregister: unregister
  };
  return instance;
}
ReportingFactory.__dashjs_factory_name = 'ReportingFactory';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSingletonFactory(ReportingFactory));

/***/ }),

/***/ "./src/streaming/metrics/reporting/reporters/DVBReporting.js":
/*!*******************************************************************!*\
  !*** ./src/streaming/metrics/reporting/reporters/DVBReporting.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_MetricSerialiser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/MetricSerialiser.js */ "./src/streaming/metrics/utils/MetricSerialiser.js");
/* harmony import */ var _utils_RNG_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/RNG.js */ "./src/streaming/metrics/utils/RNG.js");
/* harmony import */ var _models_CustomParametersModel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/CustomParametersModel.js */ "./src/streaming/models/CustomParametersModel.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */





function DVBReporting(config) {
  config = config || {};
  let instance;
  let context = this.context;
  let metricSerialiser, customParametersModel, randomNumberGenerator, reportingPlayerStatusDecided, isReportingPlayer, reportingUrl, rangeController;
  let USE_DRAFT_DVB_SPEC = true;
  let allowPendingRequestsToCompleteOnReset = true;
  let pendingRequests = [];
  const metricsConstants = config.metricsConstants;
  function setup() {
    metricSerialiser = (0,_utils_MetricSerialiser_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
    randomNumberGenerator = (0,_utils_RNG_js__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance();
    customParametersModel = (0,_models_CustomParametersModel_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context).getInstance();
    resetInitialSettings();
  }
  function doGetRequest(url, successCB, failureCB) {
    let req = new XMLHttpRequest();
    req.withCredentials = customParametersModel.getXHRWithCredentialsForType(metricsConstants.HTTP_REQUEST_DVB_REPORTING_TYPE);
    const oncomplete = function () {
      let reqIndex = pendingRequests.indexOf(req);
      if (reqIndex === -1) {
        return;
      } else {
        pendingRequests.splice(reqIndex, 1);
      }
      if (req.status >= 200 && req.status < 300) {
        if (successCB) {
          successCB();
        }
      } else {
        if (failureCB) {
          failureCB();
        }
      }
    };
    pendingRequests.push(req);
    try {
      req.open('GET', url);
      req.onloadend = oncomplete;
      req.onerror = oncomplete;
      req.send();
    } catch (e) {
      req.onerror();
    }
  }
  function report(type, vos) {
    if (!Array.isArray(vos)) {
      vos = [vos];
    }

    // If the Player is not a reporting Player, then the Player shall
    // not report any errors.
    // ... In addition to any time restrictions specified by a Range
    // element within the Metrics element.
    if (isReportingPlayer && rangeController.isEnabled()) {
      // This reporting mechanism operates by creating one HTTP GET
      // request for every entry in the top level list of the metric.
      vos.forEach(function (vo) {
        let url = metricSerialiser.serialise(vo);

        // this has been proposed for errata
        if (USE_DRAFT_DVB_SPEC && type !== metricsConstants.DVB_ERRORS) {
          url = `metricname=${type}&${url}`;
        }

        // Take the value of the @reportingUrl attribute, append a
        // question mark ('?') character and then append the string
        // created in the previous step.
        url = `${reportingUrl}?${url}`;

        // Make an HTTP GET request to the URL contained within the
        // string created in the previous step.
        doGetRequest(url, null, function () {
          // If the Player is unable to make the report, for
          // example because the @reportingUrl is invalid, the
          // host cannot be reached, or an HTTP status code other
          // than one in the 200 series is received, the Player
          // shall cease being a reporting Player for the
          // duration of the MPD.
          isReportingPlayer = false;
        });
      });
    }
  }
  function initialize(entry, rc) {
    let probability;
    rangeController = rc;
    reportingUrl = entry.dvbReportingUrl;

    // If a required attribute is missing, the Reporting descriptor may
    // be ignored by the Player
    if (!reportingUrl) {
      throw new Error('required parameter missing (dvb:reportingUrl)');
    }

    // A Player's status, as a reporting Player or not, shall remain
    // static for the duration of the MPD, regardless of MPD updates.
    // (i.e. only calling reset (or failure) changes this state)
    if (!reportingPlayerStatusDecided) {
      probability = entry.dvbProbability;
      // TS 103 285 Clause 10.12.3.4
      // If the @probability attribute is set to 1000, it shall be a reporting Player.
      // If the @probability attribute is absent it will take the default value of 1000.
      // For any other value of the @probability attribute, it shall decide at random whether to be a
      // reporting Player, such that the probability of being one is @probability/1000.
      if (probability && (probability === 1000 || probability / 1000 >= randomNumberGenerator.random())) {
        isReportingPlayer = true;
      }
      reportingPlayerStatusDecided = true;
    }
  }
  function resetInitialSettings() {
    reportingPlayerStatusDecided = false;
    isReportingPlayer = false;
    reportingUrl = null;
    rangeController = null;
  }
  function reset() {
    if (!allowPendingRequestsToCompleteOnReset) {
      pendingRequests.forEach(req => req.abort());
      pendingRequests = [];
    }
    resetInitialSettings();
  }
  instance = {
    report: report,
    initialize: initialize,
    reset: reset
  };
  setup();
  return instance;
}
DVBReporting.__dashjs_factory_name = 'DVBReporting';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__["default"].getClassFactory(DVBReporting));

/***/ }),

/***/ "./src/streaming/metrics/utils/DVBErrorsTranslator.js":
/*!************************************************************!*\
  !*** ./src/streaming/metrics/utils/DVBErrorsTranslator.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_DVBErrors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/DVBErrors.js */ "./src/streaming/metrics/vo/DVBErrors.js");
/* harmony import */ var _MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MetricsReportingEvents.js */ "./src/streaming/metrics/MetricsReportingEvents.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */




function DVBErrorsTranslator(config) {
  config = config || {};
  let instance, mpd;
  const eventBus = config.eventBus;
  const dashMetrics = config.dashMetrics;
  const metricsConstants = config.metricsConstants;
  //MediaPlayerEvents have been added to Events in MediaPlayer class
  const Events = config.events;
  function report(vo) {
    let o = new _vo_DVBErrors_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (!mpd) {
      return;
    }
    for (const key in vo) {
      if (vo.hasOwnProperty(key)) {
        o[key] = vo[key];
      }
    }
    if (!o.mpdurl) {
      o.mpdurl = mpd.originalUrl || mpd.url;
    }
    if (!o.terror) {
      o.terror = new Date();
    }
    dashMetrics.addDVBErrors(o);
  }
  function onManifestUpdate(e) {
    if (e.error) {
      return;
    }
    mpd = e.manifest;
  }
  function onServiceLocationChanged(e) {
    report({
      errorcode: _vo_DVBErrors_js__WEBPACK_IMPORTED_MODULE_0__["default"].BASE_URL_CHANGED,
      servicelocation: e.entry
    });
  }
  function onBecameReporter() {
    report({
      errorcode: _vo_DVBErrors_js__WEBPACK_IMPORTED_MODULE_0__["default"].BECAME_REPORTER
    });
  }
  function handleHttpMetric(vo) {
    if (vo.responsecode === 0 ||
    // connection failure - unknown
    vo.responsecode == null ||
    // Generated on .catch() and when uninitialized
    vo.responsecode >= 400 ||
    // HTTP error status code
    vo.responsecode < 100 ||
    // unknown status codes
    vo.responsecode >= 600) {
      // unknown status codes
      report({
        errorcode: vo.responsecode || _vo_DVBErrors_js__WEBPACK_IMPORTED_MODULE_0__["default"].CONNECTION_ERROR,
        url: vo.url,
        terror: vo.tresponse,
        servicelocation: vo._serviceLocation
      });
    }
  }
  function onMetricEvent(e) {
    switch (e.metric) {
      case metricsConstants.HTTP_REQUEST:
        handleHttpMetric(e.value);
        break;
      default:
        break;
    }
  }
  function onPlaybackError(e) {
    let reason = e.error ? e.error.code : 0;
    let errorcode;
    switch (reason) {
      case MediaError.MEDIA_ERR_NETWORK:
        errorcode = _vo_DVBErrors_js__WEBPACK_IMPORTED_MODULE_0__["default"].CONNECTION_ERROR;
        break;
      case MediaError.MEDIA_ERR_DECODE:
        errorcode = _vo_DVBErrors_js__WEBPACK_IMPORTED_MODULE_0__["default"].CORRUPT_MEDIA_OTHER;
        break;
      default:
        return;
    }
    report({
      errorcode: errorcode
    });
  }
  function initialize() {
    eventBus.on(Events.MANIFEST_UPDATED, onManifestUpdate, instance);
    eventBus.on(Events.SERVICE_LOCATION_BASE_URL_BLACKLIST_CHANGED, onServiceLocationChanged, instance);
    eventBus.on(Events.METRIC_ADDED, onMetricEvent, instance);
    eventBus.on(Events.METRIC_UPDATED, onMetricEvent, instance);
    eventBus.on(Events.PLAYBACK_ERROR, onPlaybackError, instance);
    eventBus.on(_MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_1__["default"].BECAME_REPORTING_PLAYER, onBecameReporter, instance);
  }
  function reset() {
    eventBus.off(Events.MANIFEST_UPDATED, onManifestUpdate, instance);
    eventBus.off(Events.SERVICE_LOCATION_BASE_URL_BLACKLIST_CHANGED, onServiceLocationChanged, instance);
    eventBus.off(Events.METRIC_ADDED, onMetricEvent, instance);
    eventBus.off(Events.METRIC_UPDATED, onMetricEvent, instance);
    eventBus.off(Events.PLAYBACK_ERROR, onPlaybackError, instance);
    eventBus.off(_MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_1__["default"].BECAME_REPORTING_PLAYER, onBecameReporter, instance);
  }
  instance = {
    initialize,
    reset
  };
  return instance;
}
DVBErrorsTranslator.__dashjs_factory_name = 'DVBErrorsTranslator';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSingletonFactory(DVBErrorsTranslator));

/***/ }),

/***/ "./src/streaming/metrics/utils/HandlerHelpers.js":
/*!*******************************************************!*\
  !*** ./src/streaming/metrics/utils/HandlerHelpers.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * @ignore
 */
function HandlerHelpers() {
  return {
    reconstructFullMetricName: function (key, n, type) {
      let mn = key;
      if (n) {
        mn += '(' + n;
        if (type && type.length) {
          mn += ',' + type;
        }
        mn += ')';
      }
      return mn;
    },
    validateN: function (n_ms) {
      if (!n_ms) {
        throw new Error('missing n');
      }
      if (isNaN(n_ms)) {
        throw new Error('n is NaN');
      }

      // n is a positive integer is defined to refer to the metric
      // in which the buffer level is recorded every n ms.
      if (n_ms < 0) {
        throw new Error('n must be positive');
      }
      return n_ms;
    }
  };
}
HandlerHelpers.__dashjs_factory_name = 'HandlerHelpers';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(HandlerHelpers));

/***/ }),

/***/ "./src/streaming/metrics/utils/ManifestParsing.js":
/*!********************************************************!*\
  !*** ./src/streaming/metrics/utils/ManifestParsing.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_Metrics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/Metrics.js */ "./src/streaming/metrics/vo/Metrics.js");
/* harmony import */ var _vo_Range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/Range.js */ "./src/streaming/metrics/vo/Range.js");
/* harmony import */ var _vo_Reporting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vo/Reporting.js */ "./src/streaming/metrics/vo/Reporting.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");




function ManifestParsing(config) {
  config = config || {};
  let instance;
  let adapter = config.adapter;
  const constants = config.constants;
  function getMetricsRangeStartTime(manifest, dynamic, range) {
    let voPeriods, reportingStartTime;
    let presentationStartTime = 0;
    if (dynamic) {
      // For services with MPD@type='dynamic', the start time is
      // indicated in wall clock time by adding the value of this
      // attribute to the value of the MPD@availabilityStartTime
      // attribute.
      presentationStartTime = adapter.getAvailabilityStartTime(manifest) / 1000;
    } else {
      // For services with MPD@type='static', the start time is indicated
      // in Media Presentation time and is relative to the PeriodStart
      // time of the first Period in this MPD.
      voPeriods = adapter.getRegularPeriods(manifest);
      if (voPeriods.length) {
        presentationStartTime = voPeriods[0].start;
      }
    }

    // When not present, DASH Metrics collection is
    // requested from the beginning of content
    // consumption.
    reportingStartTime = presentationStartTime;
    if (range && range.hasOwnProperty(constants.START_TIME)) {
      reportingStartTime += range.starttime;
    }
    return reportingStartTime;
  }
  function getMetrics(manifest) {
    let metrics = [];
    if (manifest && manifest.Metrics) {
      manifest.Metrics.forEach(metric => {
        var metricEntry = new _vo_Metrics_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        var isDynamic = adapter.getIsDynamic(manifest);
        if (metric.hasOwnProperty('metrics')) {
          metricEntry.metrics = metric.metrics;
        } else {
          return;
        }
        if (metric.Range) {
          metric.Range.forEach(range => {
            var rangeEntry = new _vo_Range_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
            rangeEntry.starttime = getMetricsRangeStartTime(manifest, isDynamic, range);
            if (range.hasOwnProperty('duration')) {
              rangeEntry.duration = range.duration;
            } else {
              // if not present, the value is identical to the
              // Media Presentation duration.
              rangeEntry.duration = adapter.getDuration(manifest);
            }
            rangeEntry._useWallClockTime = isDynamic;
            metricEntry.Range.push(rangeEntry);
          });
        }
        if (metric.Reporting) {
          metric.Reporting.forEach(reporting => {
            var reportingEntry = new _vo_Reporting_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
            if (reporting.hasOwnProperty(constants.SCHEME_ID_URI)) {
              reportingEntry.schemeIdUri = reporting.schemeIdUri;
            } else {
              // Invalid Reporting. schemeIdUri must be set. Ignore.
              return;
            }
            if (reporting.hasOwnProperty('value')) {
              reportingEntry.value = reporting.value;
            }
            if (reporting.hasOwnProperty(constants.DVB_REPORTING_URL)) {
              reportingEntry.dvbReportingUrl = reporting[constants.DVB_REPORTING_URL];
            }
            if (reporting.hasOwnProperty(constants.DVB_PROBABILITY)) {
              reportingEntry.dvbProbability = reporting[constants.DVB_PROBABILITY];
            }
            metricEntry.Reporting.push(reportingEntry);
          });
        } else {
          // Invalid Metrics. At least one reporting must be present. Ignore
          return;
        }
        metrics.push(metricEntry);
      });
    }
    return metrics;
  }
  instance = {
    getMetrics: getMetrics
  };
  return instance;
}
ManifestParsing.__dashjs_factory_name = 'ManifestParsing';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__["default"].getSingletonFactory(ManifestParsing));

/***/ }),

/***/ "./src/streaming/metrics/utils/MetricSerialiser.js":
/*!*********************************************************!*\
  !*** ./src/streaming/metrics/utils/MetricSerialiser.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * @ignore
 */
function MetricSerialiser() {
  // For each entry in the top level list within the metric (in the case
  // of the DVBErrors metric each entry corresponds to an "error event"
  // described in clause 10.8.4) the Player shall:
  function serialise(metric) {
    let pairs = [];
    let obj = [];
    let key, value;

    // Take each (key, value) pair from the metric entry and create a
    // string consisting of the name of the key, followed by an equals
    // ('=') character, followed by the string representation of the
    // value. The string representation of the value is created based
    // on the type of the value following the instructions in Table 22.
    for (key in metric) {
      if (metric.hasOwnProperty(key) && key.indexOf('_') !== 0) {
        value = metric[key];

        // we want to ensure that keys still end up in the report
        // even if there is no value
        if (value === undefined || value === null) {
          value = '';
        }

        // DVB A168 10.12.4 Table 22
        if (Array.isArray(value)) {
          // if trace or similar is null, do not include in output
          if (!value.length) {
            continue;
          }
          obj = [];
          value.forEach(function (v) {
            let isBuiltIn = Object.prototype.toString.call(v).slice(8, -1) !== 'Object';
            obj.push(isBuiltIn ? v : serialise(v));
          });
          value = obj.map(encodeURIComponent).join(',');
        } else if (typeof value === 'string') {
          value = encodeURIComponent(value);
        } else if (value instanceof Date) {
          value = value.toISOString();
        } else if (typeof value === 'number') {
          value = Math.round(value);
        }
        pairs.push(key + '=' + value);
      }
    }

    // Concatenate the strings created in the previous step with an
    // ampersand ('&') character between each one.
    return pairs.join('&');
  }
  return {
    serialise: serialise
  };
}
MetricSerialiser.__dashjs_factory_name = 'MetricSerialiser';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(MetricSerialiser));

/***/ }),

/***/ "./src/streaming/metrics/utils/RNG.js":
/*!********************************************!*\
  !*** ./src/streaming/metrics/utils/RNG.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * @ignore
 */
function RNG() {
  // check whether secure random numbers are available. if not, revert to
  // using Math.random
  let crypto = window.crypto || window.msCrypto;

  // could just as easily use any other array type by changing line below
  let ArrayType = Uint32Array;
  let MAX_VALUE = Math.pow(2, ArrayType.BYTES_PER_ELEMENT * 8) - 1;

  // currently there is only one client for this code, and that only uses
  // a single random number per initialisation. may want to increase this
  // number if more consumers in the future
  let NUM_RANDOM_NUMBERS = 10;
  let randomNumbers, index, instance;
  function initialize() {
    if (crypto) {
      if (!randomNumbers) {
        randomNumbers = new ArrayType(NUM_RANDOM_NUMBERS);
      }
      crypto.getRandomValues(randomNumbers);
      index = 0;
    }
  }
  function rand(min, max) {
    let r;
    if (!min) {
      min = 0;
    }
    if (!max) {
      max = 1;
    }
    if (crypto) {
      if (index === randomNumbers.length) {
        initialize();
      }
      r = randomNumbers[index] / MAX_VALUE;
      index += 1;
    } else {
      r = Math.random();
    }
    return r * (max - min) + min;
  }
  instance = {
    random: rand
  };
  initialize();
  return instance;
}
RNG.__dashjs_factory_name = 'RNG';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(RNG));

/***/ }),

/***/ "./src/streaming/metrics/vo/DVBErrors.js":
/*!***********************************************!*\
  !*** ./src/streaming/metrics/vo/DVBErrors.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class DVBErrors {
  constructor() {
    this.mpdurl = null;
    // String - Absolute URL from which the MPD was originally
    // retrieved (MPD updates will not change this value).

    this.errorcode = null;
    // String - The value of errorcode depends upon the type
    // of error being reported. For an error listed in the
    // ErrorType column below the value is as described in the
    // Value column.
    //
    // ErrorType                                            Value
    // ---------                                            -----
    // HTTP error status code                               HTTP status code
    // Unknown HTTP status code                             HTTP status code
    // SSL connection failed                                "SSL" followed by SSL alert value
    // DNS resolution failed                                "C00"
    // Host unreachable                                     "C01"
    // Connection refused                                   "C02"
    // Connection error – Not otherwise specified           "C03"
    // Corrupt media – ISO BMFF container cannot be parsed  "M00"
    // Corrupt media – Not otherwise specified              "M01"
    // Changing Base URL in use due to errors               "F00"
    // Becoming an error reporting Player                   "S00"

    this.terror = null;
    // Real-Time - Date and time at which error occurred in UTC,
    // formatted as a combined date and time according to ISO 8601.

    this.url = null;
    // String - Absolute URL from which data was being requested
    // when this error occurred. If the error report is in relation
    // to corrupt media or changing BaseURL, this may be a null
    // string if the URL from which the media was obtained or
    // which led to the change of BaseURL is no longer known.

    this.ipaddress = null;
    // String - IP Address which the host name in "url" resolved to.
    // If the error report is in relation to corrupt media or
    // changing BaseURL, this may be a null string if the URL
    // from which the media was obtained or which led to the
    // change of BaseURL is no longer known.

    this.servicelocation = null;
    // String - The value of the serviceLocation field in the
    // BaseURL being used. In the event of this report indicating
    // a change of BaseURL this is the value from the BaseURL
    // being moved from.
  }
}
DVBErrors.SSL_CONNECTION_FAILED_PREFIX = 'SSL';
DVBErrors.DNS_RESOLUTION_FAILED = 'C00';
DVBErrors.HOST_UNREACHABLE = 'C01';
DVBErrors.CONNECTION_REFUSED = 'C02';
DVBErrors.CONNECTION_ERROR = 'C03';
DVBErrors.CORRUPT_MEDIA_ISOBMFF = 'M00';
DVBErrors.CORRUPT_MEDIA_OTHER = 'M01';
DVBErrors.BASE_URL_CHANGED = 'F00';
DVBErrors.BECAME_REPORTER = 'S00';
/* harmony default export */ __webpack_exports__["default"] = (DVBErrors);

/***/ }),

/***/ "./src/streaming/metrics/vo/Metrics.js":
/*!*********************************************!*\
  !*** ./src/streaming/metrics/vo/Metrics.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class Metrics {
  constructor() {
    this.metrics = '';
    this.Range = [];
    this.Reporting = [];
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Metrics);

/***/ }),

/***/ "./src/streaming/metrics/vo/Range.js":
/*!*******************************************!*\
  !*** ./src/streaming/metrics/vo/Range.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class Range {
  constructor() {
    // as defined in ISO23009-1
    this.starttime = 0;
    this.duration = Infinity;

    // for internal use
    this._useWallClockTime = false;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Range);

/***/ }),

/***/ "./src/streaming/metrics/vo/Reporting.js":
/*!***********************************************!*\
  !*** ./src/streaming/metrics/vo/Reporting.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */

// TS 103 285 Clause 10.12.3.3
const DEFAULT_DVB_PROBABILITY = 1000;
class Reporting {
  constructor() {
    this.schemeIdUri = '';
    this.value = '';

    // DVB Extensions
    this.dvbReportingUrl = '';
    this.dvbProbability = DEFAULT_DVB_PROBABILITY;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Reporting);

/***/ }),

/***/ "./src/streaming/models/CustomParametersModel.js":
/*!*******************************************************!*\
  !*** ./src/streaming/models/CustomParametersModel.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dash_vo_UTCTiming_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dash/vo/UTCTiming.js */ "./src/dash/vo/UTCTiming.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _core_Settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Settings.js */ "./src/core/Settings.js");
/* harmony import */ var _utils_SupervisorTools_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/SupervisorTools.js */ "./src/streaming/utils/SupervisorTools.js");
/* harmony import */ var _constants_Constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/Constants.js */ "./src/streaming/constants/Constants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */





const DEFAULT_XHR_WITH_CREDENTIALS = false;
function CustomParametersModel() {
  let instance, utcTimingSources, xhrWithCredentials, requestInterceptors, responseInterceptors, licenseRequestFilters, licenseResponseFilters, customCapabilitiesFilters, customInitialTrackSelectionFunction, customAbrRules;
  const context = this.context;
  const settings = (0,_core_Settings_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context).getInstance();
  function setup() {
    xhrWithCredentials = {
      default: DEFAULT_XHR_WITH_CREDENTIALS
    };
    _resetInitialSettings();
  }
  function _resetInitialSettings() {
    requestInterceptors = [];
    responseInterceptors = [];
    licenseRequestFilters = [];
    licenseResponseFilters = [];
    customCapabilitiesFilters = [];
    customAbrRules = [];
    customInitialTrackSelectionFunction = null;
    utcTimingSources = [];
  }
  function reset() {
    _resetInitialSettings();
  }
  function setConfig() {}

  /**
   * Registers a custom initial track selection function. Only one function is allowed. Calling this method will overwrite a potentially existing function.
   * @param {function} customFunc - the custom function that returns the initial track
   */
  function setCustomInitialTrackSelectionFunction(customFunc) {
    customInitialTrackSelectionFunction = customFunc;
  }

  /**
   * Resets the custom initial track selection
   */
  function resetCustomInitialTrackSelectionFunction() {
    customInitialTrackSelectionFunction = null;
  }

  /**
   * Returns the initial track selection function
   * @return {function}
   */
  function getCustomInitialTrackSelectionFunction() {
    return customInitialTrackSelectionFunction;
  }

  /**
   * Returns all license request filters
   * @return {array}
   */
  function getLicenseRequestFilters() {
    return licenseRequestFilters;
  }

  /**
   * Returns all license response filters
   * @return {array}
   */
  function getLicenseResponseFilters() {
    return licenseResponseFilters;
  }

  /**
   * Registers a license request filter. This enables application to manipulate/overwrite any request parameter and/or request data.
   * The provided callback function shall return a promise that shall be resolved once the filter process is completed.
   * The filters are applied in the order they are registered.
   * @param {function} filter - the license request filter callback
   */
  function registerLicenseRequestFilter(filter) {
    licenseRequestFilters.push(filter);
  }

  /**
   * Registers a license response filter. This enables application to manipulate/overwrite the response data
   * The provided callback function shall return a promise that shall be resolved once the filter process is completed.
   * The filters are applied in the order they are registered.
   * @param {function} filter - the license response filter callback
   */
  function registerLicenseResponseFilter(filter) {
    licenseResponseFilters.push(filter);
  }

  /**
   * Unregisters a license request filter.
   * @param {function} filter - the license request filter callback
   */
  function unregisterLicenseRequestFilter(filter) {
    _unregisterFilter(licenseRequestFilters, filter);
  }

  /**
   * Unregisters a license response filter.
   * @param {function} filter - the license response filter callback
   */
  function unregisterLicenseResponseFilter(filter) {
    _unregisterFilter(licenseResponseFilters, filter);
  }

  /**
   * Returns all custom capabilities filter
   * @return {array}
   */
  function getCustomCapabilitiesFilters() {
    return customCapabilitiesFilters;
  }

  /**
   * Registers a custom capabilities filter. This enables application to filter representations to use.
   * The provided callback function shall return a boolean or promise resolving to a boolean based on whether or not to use the representation.
   * The filters are applied in the order they are registered.
   * @param {function} filter - the custom capabilities filter callback
   */
  function registerCustomCapabilitiesFilter(filter) {
    customCapabilitiesFilters.push(filter);
  }

  /**
   * Unregisters a custom capabilities filter.
   * @param {function} filter - the custom capabilities filter callback
   */
  function unregisterCustomCapabilitiesFilter(filter) {
    _unregisterFilter(customCapabilitiesFilters, filter);
  }

  /**
   * Unregister a filter from the list of existing filers.
   * @param {array} filters
   * @param {function} filter
   * @private
   */
  function _unregisterFilter(filters, filter) {
    let index = -1;
    filters.some((item, i) => {
      if (item === filter) {
        index = i;
        return true;
      }
    });
    if (index < 0) {
      return;
    }
    filters.splice(index, 1);
  }

  /**
   * Iterate through the list of custom ABR rules and find the right rule by name
   * @param {string} rulename
   * @return {number} rule number
   */
  function _findAbrCustomRuleIndex(rulename) {
    let i;
    for (i = 0; i < customAbrRules.length; i++) {
      if (customAbrRules[i].rulename === rulename) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Add a custom ABR Rule
   * Rule will be apply on next stream if a stream is being played
   *
   * @param {string} type - rule type (one of ['qualitySwitchRules','abandonFragmentRules'])
   * @param {string} rulename - name of rule (used to identify custom rule). If one rule of same name has been added, then existing rule will be updated
   * @param {object} rule - the rule object instance
   * @throws {@link Constants#BAD_ARGUMENT_ERROR BAD_ARGUMENT_ERROR} if called with invalid arguments.
   */
  function addAbrCustomRule(type, rulename, rule) {
    if (typeof type !== 'string' || type !== _constants_Constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].RULES_TYPES.ABANDON_FRAGMENT_RULES && type !== _constants_Constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].RULES_TYPES.QUALITY_SWITCH_RULES || typeof rulename !== 'string') {
      throw _constants_Constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].BAD_ARGUMENT_ERROR;
    }
    let index = _findAbrCustomRuleIndex(rulename);
    if (index === -1) {
      // add rule
      customAbrRules.push({
        type: type,
        rulename: rulename,
        rule: rule
      });
    } else {
      // update rule
      customAbrRules[index].type = type;
      customAbrRules[index].rule = rule;
    }
  }

  /**
   * Remove a custom ABR Rule
   *
   * @param {string} rulename - name of the rule to be removed
   */
  function removeAbrCustomRule(rulename) {
    if (rulename) {
      let index = _findAbrCustomRuleIndex(rulename);
      //if no rulename custom rule has been found, do nothing
      if (index !== -1) {
        // remove rule
        customAbrRules.splice(index, 1);
      }
    } else {
      //if no rulename is defined, remove all ABR custome rules
      customAbrRules = [];
    }
  }

  /**
   * Remove all custom rules
   */
  function removeAllAbrCustomRule() {
    customAbrRules = [];
  }

  /**
   * Return all ABR custom rules
   * @return {array}
   */
  function getAbrCustomRules() {
    return customAbrRules;
  }

  /**
   * Adds a request interceptor. This enables application to monitor, manipulate, overwrite any request parameter and/or request data.
   * The provided callback function shall return a promise with updated request that shall be resolved once the process of the request is completed.
   * The interceptors are applied in the order they are added.
   * @param {function} interceptor - the request interceptor callback
   */
  function addRequestInterceptor(interceptor) {
    requestInterceptors.push(interceptor);
  }

  /**
   * Adds a response interceptor. This enables application to monitor, manipulate, overwrite the response data
   * The provided callback function shall return a promise with updated response that shall be resolved once the process of the response is completed.
   * The interceptors are applied in the order they are added.
   * @param {function} interceptor - the response interceptor callback
   */
  function addResponseInterceptor(interceptor) {
    responseInterceptors.push(interceptor);
  }

  /**
   * Unregisters a request interceptor.
   * @param {function} interceptor - the request interceptor callback
   */
  function removeRequestInterceptor(interceptor) {
    _unregisterFilter(requestInterceptors, interceptor);
  }

  /**
   * Unregisters a response interceptor.
   * @param {function} interceptor - the request interceptor callback
   */
  function removeResponseInterceptor(interceptor) {
    _unregisterFilter(responseInterceptors, interceptor);
  }

  /**
   * Returns all request interceptors
   * @return {array}
   */
  function getRequestInterceptors() {
    return requestInterceptors;
  }

  /**
   * Returns all response interceptors
   * @return {array}
   */
  function getResponseInterceptors() {
    return responseInterceptors;
  }

  /**
   * Add a UTC timing source at the top of the list
   * @param {string} schemeIdUri
   * @param {string} value
   */
  function addUTCTimingSource(schemeIdUri, value) {
    removeUTCTimingSource(schemeIdUri, value); //check if it already exists and remove if so.
    let vo = new _dash_vo_UTCTiming_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    vo.schemeIdUri = schemeIdUri;
    vo.value = value;
    utcTimingSources.push(vo);
  }

  /**
   * Return all UTC timing sources
   * @return {array}
   */
  function getUTCTimingSources() {
    return utcTimingSources;
  }

  /**
   * Remove a specific timing source from the array
   * @param {string} schemeIdUri
   * @param {string} value
   */
  function removeUTCTimingSource(schemeIdUri, value) {
    (0,_utils_SupervisorTools_js__WEBPACK_IMPORTED_MODULE_3__.checkParameterType)(schemeIdUri, 'string');
    (0,_utils_SupervisorTools_js__WEBPACK_IMPORTED_MODULE_3__.checkParameterType)(value, 'string');
    utcTimingSources.forEach(function (obj, idx) {
      if (obj.schemeIdUri === schemeIdUri && obj.value === value) {
        utcTimingSources.splice(idx, 1);
      }
    });
  }

  /**
   * Remove all timing sources
   */
  function clearDefaultUTCTimingSources() {
    utcTimingSources = [];
  }

  /**
   * Add the default timing source to the list
   */
  function restoreDefaultUTCTimingSources() {
    let defaultUtcTimingSource = settings.get().streaming.utcSynchronization.defaultTimingSource;
    addUTCTimingSource(defaultUtcTimingSource.scheme, defaultUtcTimingSource.value);
  }
  function setXHRWithCredentialsForType(type, value) {
    if (!type) {
      Object.keys(xhrWithCredentials).forEach(key => {
        setXHRWithCredentialsForType(key, value);
      });
    } else {
      xhrWithCredentials[type] = !!value;
    }
  }
  function getXHRWithCredentialsForType(type) {
    const useCreds = xhrWithCredentials[type];
    return useCreds === undefined ? xhrWithCredentials.default : useCreds;
  }
  instance = {
    addAbrCustomRule,
    addRequestInterceptor,
    addResponseInterceptor,
    addUTCTimingSource,
    clearDefaultUTCTimingSources,
    getAbrCustomRules,
    getCustomCapabilitiesFilters,
    getCustomInitialTrackSelectionFunction,
    getLicenseRequestFilters,
    getLicenseResponseFilters,
    getRequestInterceptors,
    getResponseInterceptors,
    getUTCTimingSources,
    getXHRWithCredentialsForType,
    registerCustomCapabilitiesFilter,
    registerLicenseRequestFilter,
    registerLicenseResponseFilter,
    removeAbrCustomRule,
    removeAllAbrCustomRule,
    removeRequestInterceptor,
    removeResponseInterceptor,
    removeUTCTimingSource,
    reset,
    resetCustomInitialTrackSelectionFunction,
    restoreDefaultUTCTimingSources,
    setConfig,
    setCustomInitialTrackSelectionFunction,
    setXHRWithCredentialsForType,
    unregisterCustomCapabilitiesFilter,
    unregisterLicenseRequestFilter,
    unregisterLicenseResponseFilter
  };
  setup();
  return instance;
}
CustomParametersModel.__dashjs_factory_name = 'CustomParametersModel';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSingletonFactory(CustomParametersModel));

/***/ }),

/***/ "./src/streaming/utils/CustomTimeRanges.js":
/*!*************************************************!*\
  !*** ./src/streaming/utils/CustomTimeRanges.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _SupervisorTools_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SupervisorTools.js */ "./src/streaming/utils/SupervisorTools.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


function CustomTimeRanges(/*config*/
) {
  let customTimeRangeArray = [];
  let length = 0;
  function add(start, end) {
    let i;

    // eslint-disable-next-line curly
    for (i = 0; i < this.customTimeRangeArray.length && start > this.customTimeRangeArray[i].start; i++);
    this.customTimeRangeArray.splice(i, 0, {
      start: start,
      end: end
    });
    for (i = 0; i < this.customTimeRangeArray.length - 1; i++) {
      if (this.mergeRanges(i, i + 1)) {
        i--;
      }
    }
    this.length = this.customTimeRangeArray.length;
  }
  function clear() {
    this.customTimeRangeArray = [];
    this.length = 0;
  }
  function remove(start, end) {
    for (let i = 0; i < this.customTimeRangeArray.length; i++) {
      if (start <= this.customTimeRangeArray[i].start && end >= this.customTimeRangeArray[i].end) {
        //      |--------------Range i-------|
        //|---------------Range to remove ---------------|
        //    or
        //|--------------Range i-------|
        //|--------------Range to remove ---------------|
        //    or
        //                 |--------------Range i-------|
        //|--------------Range to remove ---------------|
        this.customTimeRangeArray.splice(i, 1);
        i--;
      } else if (start > this.customTimeRangeArray[i].start && end < this.customTimeRangeArray[i].end) {
        //|-----------------Range i----------------|
        //        |-------Range to remove -----|
        this.customTimeRangeArray.splice(i + 1, 0, {
          start: end,
          end: this.customTimeRangeArray[i].end
        });
        this.customTimeRangeArray[i].end = start;
        break;
      } else if (start > this.customTimeRangeArray[i].start && start < this.customTimeRangeArray[i].end) {
        //|-----------Range i----------|
        //                    |---------Range to remove --------|
        //    or
        //|-----------------Range i----------------|
        //            |-------Range to remove -----|
        this.customTimeRangeArray[i].end = start;
      } else if (end > this.customTimeRangeArray[i].start && end < this.customTimeRangeArray[i].end) {
        //                     |-----------Range i----------|
        //|---------Range to remove --------|
        //            or
        //|-----------------Range i----------------|
        //|-------Range to remove -----|
        this.customTimeRangeArray[i].start = end;
      }
    }
    this.length = this.customTimeRangeArray.length;
  }
  function mergeRanges(rangeIndex1, rangeIndex2) {
    let range1 = this.customTimeRangeArray[rangeIndex1];
    let range2 = this.customTimeRangeArray[rangeIndex2];
    if (range1.start <= range2.start && range2.start <= range1.end && range1.end <= range2.end) {
      //|-----------Range1----------|
      //                    |-----------Range2----------|
      range1.end = range2.end;
      this.customTimeRangeArray.splice(rangeIndex2, 1);
      return true;
    } else if (range2.start <= range1.start && range1.start <= range2.end && range2.end <= range1.end) {
      //                |-----------Range1----------|
      //|-----------Range2----------|
      range1.start = range2.start;
      this.customTimeRangeArray.splice(rangeIndex2, 1);
      return true;
    } else if (range2.start <= range1.start && range1.start <= range2.end && range1.end <= range2.end) {
      //      |--------Range1-------|
      //|---------------Range2--------------|
      this.customTimeRangeArray.splice(rangeIndex1, 1);
      return true;
    } else if (range1.start <= range2.start && range2.start <= range1.end && range2.end <= range1.end) {
      //|-----------------Range1--------------|
      //        |-----------Range2----------|
      this.customTimeRangeArray.splice(rangeIndex2, 1);
      return true;
    }
    return false;
  }
  function start(index) {
    (0,_SupervisorTools_js__WEBPACK_IMPORTED_MODULE_1__.checkInteger)(index);
    if (index >= this.customTimeRangeArray.length || index < 0) {
      return NaN;
    }
    return this.customTimeRangeArray[index].start;
  }
  function end(index) {
    (0,_SupervisorTools_js__WEBPACK_IMPORTED_MODULE_1__.checkInteger)(index);
    if (index >= this.customTimeRangeArray.length || index < 0) {
      return NaN;
    }
    return this.customTimeRangeArray[index].end;
  }
  return {
    customTimeRangeArray: customTimeRangeArray,
    length: length,
    add: add,
    clear: clear,
    remove: remove,
    mergeRanges: mergeRanges,
    start: start,
    end: end
  };
}
CustomTimeRanges.__dashjs_factory_name = 'CustomTimeRanges';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].getClassFactory(CustomTimeRanges));

/***/ }),

/***/ "./src/streaming/utils/SupervisorTools.js":
/*!************************************************!*\
  !*** ./src/streaming/utils/SupervisorTools.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkInteger: function() { return /* binding */ checkInteger; },
/* harmony export */   checkIsVideoOrAudioType: function() { return /* binding */ checkIsVideoOrAudioType; },
/* harmony export */   checkParameterType: function() { return /* binding */ checkParameterType; },
/* harmony export */   checkRange: function() { return /* binding */ checkRange; }
/* harmony export */ });
/* harmony import */ var _constants_Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/Constants.js */ "./src/streaming/constants/Constants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

function checkParameterType(parameter, type) {
  if (typeof parameter !== type) {
    throw _constants_Constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].BAD_ARGUMENT_ERROR;
  }
}
function checkInteger(parameter) {
  const isInt = parameter !== null && !isNaN(parameter) && parameter % 1 === 0;
  if (!isInt) {
    throw _constants_Constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].BAD_ARGUMENT_ERROR + ' : argument is not an integer';
  }
}
function checkRange(parameter, min, max) {
  if (parameter < min || parameter > max) {
    throw _constants_Constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].BAD_ARGUMENT_ERROR + ' : argument out of range';
  }
}
function checkIsVideoOrAudioType(type) {
  if (typeof type !== 'string' || type !== _constants_Constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].AUDIO && type !== _constants_Constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].VIDEO) {
    throw _constants_Constants_js__WEBPACK_IMPORTED_MODULE_0__["default"].BAD_ARGUMENT_ERROR;
  }
}

/***/ }),

/***/ "./src/streaming/vo/metrics/HTTPRequest.js":
/*!*************************************************!*\
  !*** ./src/streaming/vo/metrics/HTTPRequest.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTTPRequest: function() { return /* binding */ HTTPRequest; },
/* harmony export */   HTTPRequestTrace: function() { return /* binding */ HTTPRequestTrace; }
/* harmony export */ });
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @classdesc This Object holds reference to the HTTPRequest for manifest, fragment and xlink loading.
 * Members which are not defined in ISO23009-1 Annex D should be prefixed by a _ so that they are ignored
 * by Metrics Reporting code.
 * @ignore
 */
class HTTPRequest {
  /**
   * @class
   */
  constructor() {
    /**
     * Identifier of the TCP connection on which the HTTP request was sent.
     * @public
     */
    this.tcpid = null;
    /**
     * This is an optional parameter and should not be included in HTTP request/response transactions for progressive download.
     * The type of the request:
     * - MPD
     * - XLink expansion
     * - Initialization Fragment
     * - Index Fragment
     * - Media Fragment
     * - Bitstream Switching Fragment
     * - other
     * @public
     */
    this.type = null;
    /**
     * The original URL (before any redirects or failures)
     * @public
     */
    this.url = null;
    /**
     * The actual URL requested, if different from above
     * @public
     */
    this.actualurl = null;
    /**
     * The contents of the byte-range-spec part of the HTTP Range header.
     * @public
     */
    this.range = null;
    /**
     * Real-Time | The real time at which the request was sent.
     * @public
     */
    this.trequest = null;
    /**
     * Real-Time | The real time at which the first byte of the response was received.
     * @public
     */
    this.tresponse = null;
    /**
     * The HTTP response code.
     * @public
     */
    this.responsecode = null;
    /**
     * The duration of the throughput trace intervals (ms), for successful requests only.
     * @public
     */
    this.interval = null;
    /**
     * Throughput traces, for successful requests only.
     * @public
     */
    this.trace = [];
    /**
     * The CMSD static and dynamic values retrieved from CMSD response headers.
     * @public
     */
    this.cmsd = null;

    /**
     * Type of stream ("audio" | "video" etc..)
     * @public
     */
    this._stream = null;
    /**
     * Real-Time | The real time at which the request finished.
     * @public
     */
    this._tfinish = null;
    /**
     * The duration of the media requests, if available, in seconds.
     * @public
     */
    this._mediaduration = null;
    /**
     * all the response headers from request.
     * @public
     */
    this._responseHeaders = null;
    /**
     * The selected service location for the request. string.
     * @public
     */
    this._serviceLocation = null;
    /**
     * The type of the loader that was used. Distinguish between fetch loader and xhr loader
     */
    this._fileLoaderType = null;
    /**
     * The values derived from the ResourceTimingAPI.
     */
    this._resourceTimingValues = null;
  }
}

/**
 * @classdesc This Object holds reference to the progress of the HTTPRequest.
 * @ignore
 */
class HTTPRequestTrace {
  /**
   * @class
   */
  constructor() {
    /**
     * Real-Time | Measurement stream start.
     * @public
     */
    this.s = null;
    /**
     * Measurement stream duration (ms).
     * @public
     */
    this.d = null;
    /**
     * List of integers counting the bytes received in each trace interval within the measurement stream.
     * @public
     */
    this.b = [];
  }
}
HTTPRequest.GET = 'GET';
HTTPRequest.HEAD = 'HEAD';
HTTPRequest.MPD_TYPE = 'MPD';
HTTPRequest.XLINK_EXPANSION_TYPE = 'XLinkExpansion';
HTTPRequest.INIT_SEGMENT_TYPE = 'InitializationSegment';
HTTPRequest.INDEX_SEGMENT_TYPE = 'IndexSegment';
HTTPRequest.MEDIA_SEGMENT_TYPE = 'MediaSegment';
HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE = 'BitstreamSwitchingSegment';
HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE = 'FragmentInfoSegment';
HTTPRequest.DVB_REPORTING_TYPE = 'DVBReporting';
HTTPRequest.LICENSE = 'license';
HTTPRequest.CONTENT_STEERING_TYPE = 'ContentSteering';
HTTPRequest.OTHER_TYPE = 'other';


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/amd options */
/******/ !function() {
/******/ 	__webpack_require__.amdO = {};
/******/ }();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ !function() {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ !function() {
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ }();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ !function() {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ }();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!***************************************************!*\
  !*** ./src/streaming/metrics/MetricsReporting.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_DVBErrorsTranslator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/DVBErrorsTranslator.js */ "./src/streaming/metrics/utils/DVBErrorsTranslator.js");
/* harmony import */ var _MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetricsReportingEvents.js */ "./src/streaming/metrics/MetricsReportingEvents.js");
/* harmony import */ var _controllers_MetricsCollectionController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/MetricsCollectionController.js */ "./src/streaming/metrics/controllers/MetricsCollectionController.js");
/* harmony import */ var _metrics_MetricsHandlerFactory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metrics/MetricsHandlerFactory.js */ "./src/streaming/metrics/metrics/MetricsHandlerFactory.js");
/* harmony import */ var _reporting_ReportingFactory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reporting/ReportingFactory.js */ "./src/streaming/metrics/reporting/ReportingFactory.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */






function MetricsReporting() {
  let context = this.context;
  let instance, dvbErrorsTranslator;

  /**
   * Create a MetricsCollectionController, and a DVBErrorsTranslator
   * @param {Object} config - dependancies from owner
   * @return {MetricsCollectionController} Metrics Collection Controller
   */
  function createMetricsReporting(config) {
    dvbErrorsTranslator = (0,_utils_DVBErrorsTranslator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance({
      eventBus: config.eventBus,
      dashMetrics: config.dashMetrics,
      metricsConstants: config.metricsConstants,
      events: config.events
    });
    dvbErrorsTranslator.initialize();
    return (0,_controllers_MetricsCollectionController_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create(config);
  }

  /**
   * Get the ReportingFactory to allow new reporters to be registered
   * @return {ReportingFactory} Reporting Factory
   */
  function getReportingFactory() {
    return (0,_reporting_ReportingFactory_js__WEBPACK_IMPORTED_MODULE_4__["default"])(context).getInstance();
  }

  /**
   * Get the MetricsHandlerFactory to allow new handlers to be registered
   * @return {MetricsHandlerFactory} Metrics Handler Factory
   */
  function getMetricsHandlerFactory() {
    return (0,_metrics_MetricsHandlerFactory_js__WEBPACK_IMPORTED_MODULE_3__["default"])(context).getInstance();
  }
  instance = {
    createMetricsReporting: createMetricsReporting,
    getReportingFactory: getReportingFactory,
    getMetricsHandlerFactory: getMetricsHandlerFactory
  };
  return instance;
}
MetricsReporting.__dashjs_factory_name = 'MetricsReporting';
const factory = dashjs.FactoryMaker.getClassFactory(MetricsReporting);
factory.events = _MetricsReportingEvents_js__WEBPACK_IMPORTED_MODULE_1__["default"];
dashjs.FactoryMaker.updateClassFactory(MetricsReporting.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);
__webpack_exports__ = __webpack_exports__["default"];
var __webpack_exports__default = __webpack_exports__["default"];
export { __webpack_exports__default as default };

//# sourceMappingURL=dash.reporting.debug.js.map