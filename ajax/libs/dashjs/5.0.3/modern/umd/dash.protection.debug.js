(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dashjs"] = factory();
	else
		root["dashjs"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/***/ (function(module) {

"use strict";
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

/***/ "./src/core/FactoryMaker.js":
/*!**********************************!*\
  !*** ./src/core/FactoryMaker.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./src/core/Utils.js":
/*!***************************!*\
  !*** ./src/core/Utils.js ***!
  \***************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./src/core/errors/ErrorsBase.js":
/*!***************************************!*\
  !*** ./src/core/errors/ErrorsBase.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
class ErrorsBase {
  extend(errors, config) {
    if (!errors) {
      return;
    }
    let override = config ? config.override : false;
    let publicOnly = config ? config.publicOnly : false;
    for (const err in errors) {
      if (!errors.hasOwnProperty(err) || this[err] && !override) {
        continue;
      }
      if (publicOnly && errors[err].indexOf('public_') === -1) {
        continue;
      }
      this[err] = errors[err];
    }
  }
}
/* harmony default export */ __webpack_exports__["default"] = (ErrorsBase);

/***/ }),

/***/ "./src/core/events/EventsBase.js":
/*!***************************************!*\
  !*** ./src/core/events/EventsBase.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./src/dash/constants/DashConstants.js":
/*!*********************************************!*\
  !*** ./src/dash/constants/DashConstants.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA, OR
 *  PROFITS, OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Dash constants declaration
 * @ignore
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  ACCESSIBILITY: 'Accessibility',
  ADAPTATION_SET: 'AdaptationSet',
  ADAPTATION_SETS: 'adaptationSets',
  ADAPTATION_SET_SWITCHING_SCHEME_ID_URI: 'urn:mpeg:dash:adaptation-set-switching:2016',
  ADD: 'add',
  ASSET_IDENTIFIER: 'AssetIdentifier',
  AUDIO_CHANNEL_CONFIGURATION: 'AudioChannelConfiguration',
  AUDIO_SAMPLING_RATE: 'audioSamplingRate',
  AVAILABILITY_END_TIME: 'availabilityEndTime',
  AVAILABILITY_START_TIME: 'availabilityStartTime',
  AVAILABILITY_TIME_COMPLETE: 'availabilityTimeComplete',
  AVAILABILITY_TIME_OFFSET: 'availabilityTimeOffset',
  BANDWITH: 'bandwidth',
  BASE_URL: 'BaseURL',
  BITSTREAM_SWITCHING: 'BitstreamSwitching',
  BITSTREAM_SWITCHING_MINUS: 'bitstreamSwitching',
  BYTE_RANGE: 'byteRange',
  CAPTION: 'caption',
  CENC_DEFAULT_KID: 'cenc:default_KID',
  CLIENT_DATA_REPORTING: 'ClientDataReporting',
  CLIENT_REQUIREMENT: 'clientRequirement',
  CMCD_PARAMETERS: 'CMCDParameters',
  CODECS: 'codecs',
  CODEC_PRIVATE_DATA: 'codecPrivateData',
  CODING_DEPENDENCY: 'codingDependency',
  CONTENT_COMPONENT: 'ContentComponent',
  CONTENT_PROTECTION: 'ContentProtection',
  CONTENT_STEERING: 'ContentSteering',
  CONTENT_STEERING_RESPONSE: {
    VERSION: 'VERSION',
    TTL: 'TTL',
    RELOAD_URI: 'RELOAD-URI',
    PATHWAY_PRIORITY: 'PATHWAY-PRIORITY',
    PATHWAY_CLONES: 'PATHWAY-CLONES',
    BASE_ID: 'BASE-ID',
    ID: 'ID',
    URI_REPLACEMENT: 'URI-REPLACEMENT',
    HOST: 'HOST',
    PARAMS: 'PARAMS'
  },
  CONTENT_TYPE: 'contentType',
  DEFAULT_SERVICE_LOCATION: 'defaultServiceLocation',
  DEPENDENCY_ID: 'dependencyId',
  DURATION: 'duration',
  DVB_PRIORITY: 'dvb:priority',
  DVB_WEIGHT: 'dvb:weight',
  DVB_URL: 'dvb:url',
  DVB_MIMETYPE: 'dvb:mimeType',
  DVB_FONTFAMILY: 'dvb:fontFamily',
  DYNAMIC: 'dynamic',
  END_NUMBER: 'endNumber',
  ESSENTIAL_PROPERTY: 'EssentialProperty',
  EVENT: 'Event',
  EVENT_STREAM: 'EventStream',
  FORCED_SUBTITLE: 'forced-subtitle',
  FRAMERATE: 'frameRate',
  FRAME_PACKING: 'FramePacking',
  GROUP_LABEL: 'GroupLabel',
  HEIGHT: 'height',
  ID: 'id',
  INBAND: 'inband',
  INBAND_EVENT_STREAM: 'InbandEventStream',
  INDEX: 'index',
  INDEX_RANGE: 'indexRange',
  INITIALIZATION: 'Initialization',
  INITIALIZATION_MINUS: 'initialization',
  LA_URL: 'Laurl',
  LA_URL_LOWER_CASE: 'laurl',
  LABEL: 'Label',
  LANG: 'lang',
  LOCATION: 'Location',
  MAIN: 'main',
  MAXIMUM_SAP_PERIOD: 'maximumSAPPeriod',
  MAX_PLAYOUT_RATE: 'maxPlayoutRate',
  MAX_SEGMENT_DURATION: 'maxSegmentDuration',
  MAX_SUBSEGMENT_DURATION: 'maxSubsegmentDuration',
  MEDIA: 'media',
  MEDIA_PRESENTATION_DURATION: 'mediaPresentationDuration',
  MEDIA_RANGE: 'mediaRange',
  MEDIA_STREAM_STRUCTURE_ID: 'mediaStreamStructureId',
  METRICS: 'Metrics',
  METRICS_MINUS: 'metrics',
  MIME_TYPE: 'mimeType',
  MINIMUM_UPDATE_PERIOD: 'minimumUpdatePeriod',
  MIN_BUFFER_TIME: 'minBufferTime',
  MP4_PROTECTION_SCHEME: 'urn:mpeg:dash:mp4protection:2011',
  MPD: 'MPD',
  MPD_TYPE: 'mpd',
  MPD_PATCH_TYPE: 'mpdpatch',
  ORIGINAL_MPD_ID: 'mpdId',
  ORIGINAL_PUBLISH_TIME: 'originalPublishTime',
  PATCH_LOCATION: 'PatchLocation',
  PERIOD: 'Period',
  PRESENTATION_TIME: 'presentationTime',
  PRESENTATION_TIME_OFFSET: 'presentationTimeOffset',
  PRO: 'pro',
  PRODUCER_REFERENCE_TIME: 'ProducerReferenceTime',
  PRODUCER_REFERENCE_TIME_TYPE: {
    ENCODER: 'encoder',
    CAPTURED: 'captured',
    APPLICATION: 'application'
  },
  PROFILES: 'profiles',
  PSSH: 'pssh',
  PUBLISH_TIME: 'publishTime',
  QUALITY_RANKING: 'qualityRanking',
  QUERY_BEFORE_START: 'queryBeforeStart',
  QUERY_PART: '$querypart$',
  RANGE: 'range',
  RATING: 'Rating',
  REF: 'ref',
  REF_ID: 'refId',
  REMOVE: 'remove',
  REPLACE: 'replace',
  REPORTING: 'Reporting',
  REPRESENTATION: 'Representation',
  REPRESENTATION_INDEX: 'RepresentationIndex',
  ROBUSTNESS: 'robustness',
  ROLE: 'Role',
  S: 'S',
  SAR: 'sar',
  SCAN_TYPE: 'scanType',
  SEGMENT_ALIGNMENT: 'segmentAlignment',
  SEGMENT_BASE: 'SegmentBase',
  SEGMENT_LIST: 'SegmentList',
  SEGMENT_PROFILES: 'segmentProfiles',
  SEGMENT_TEMPLATE: 'SegmentTemplate',
  SEGMENT_TIMELINE: 'SegmentTimeline',
  SEGMENT_TYPE: 'segment',
  SEGMENT_URL: 'SegmentURL',
  SERVICE_DESCRIPTION: 'ServiceDescription',
  SERVICE_DESCRIPTION_LATENCY: 'Latency',
  SERVICE_DESCRIPTION_OPERATING_BANDWIDTH: 'OperatingBandwidth',
  SERVICE_DESCRIPTION_OPERATING_QUALITY: 'OperatingQuality',
  SERVICE_DESCRIPTION_PLAYBACK_RATE: 'PlaybackRate',
  SERVICE_DESCRIPTION_SCOPE: 'Scope',
  SERVICE_LOCATION: 'serviceLocation',
  SERVICE_LOCATIONS: 'serviceLocations',
  SOURCE_URL: 'sourceURL',
  START: 'start',
  START_NUMBER: 'startNumber',
  START_WITH_SAP: 'startWithSAP',
  STATIC: 'static',
  STEERING_TYPE: 'steering',
  SUBSET: 'Subset',
  SUBTITLE: 'subtitle',
  SUB_REPRESENTATION: 'SubRepresentation',
  SUB_SEGMENT_ALIGNMENT: 'subsegmentAlignment',
  SUGGESTED_PRESENTATION_DELAY: 'suggestedPresentationDelay',
  SUPPLEMENTAL_PROPERTY: 'SupplementalProperty',
  SUPPLEMENTAL_CODECS: 'scte214:supplementalCodecs',
  TIMESCALE: 'timescale',
  TIMESHIFT_BUFFER_DEPTH: 'timeShiftBufferDepth',
  TTL: 'ttl',
  TYPE: 'type',
  UTC_TIMING: 'UTCTiming',
  VALUE: 'value',
  VIEWPOINT: 'Viewpoint',
  WALL_CLOCK_TIME: 'wallClockTime',
  WIDTH: 'width'
});

/***/ }),

/***/ "./src/streaming/constants/Constants.js":
/*!**********************************************!*\
  !*** ./src/streaming/constants/Constants.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./src/streaming/constants/ProtectionConstants.js":
/*!********************************************************!*\
  !*** ./src/streaming/constants/ProtectionConstants.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA, OR
 *  PROFITS, OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Protection Constants declaration
 * @ignore
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  CLEARKEY_KEYSTEM_STRING: 'org.w3.clearkey',
  WIDEVINE_KEYSTEM_STRING: 'com.widevine.alpha',
  PLAYREADY_KEYSTEM_STRING: 'com.microsoft.playready',
  PLAYREADY_RECOMMENDATION_KEYSTEM_STRING: 'com.microsoft.playready.recommendation',
  WIDEVINE_UUID: 'edef8ba9-79d6-4ace-a3c8-27dcd51d21ed',
  PLAYREADY_UUID: '9a04f079-9840-4286-ab92-e65be0885f95',
  CLEARKEY_UUID: 'e2719d58-a985-b3c9-781a-b030af78d30e',
  W3C_CLEARKEY_UUID: '1077efec-c0b2-4d02-ace3-3c1e52e2fb4b',
  INITIALIZATION_DATA_TYPE_CENC: 'cenc',
  INITIALIZATION_DATA_TYPE_KEYIDS: 'keyids',
  INITIALIZATION_DATA_TYPE_WEBM: 'webm',
  ENCRYPTION_SCHEME_CENC: 'cenc',
  ENCRYPTION_SCHEME_CBCS: 'cbcs',
  MEDIA_KEY_MESSAGE_TYPES: {
    LICENSE_REQUEST: 'license-request',
    LICENSE_RENEWAL: 'license-renewal',
    LICENSE_RELEASE: 'license-release',
    INDIVIDUALIZATION_REQUEST: 'individualization-request'
  },
  ROBUSTNESS_STRINGS: {
    WIDEVINE: {
      SW_SECURE_CRYPTO: 'SW_SECURE_CRYPTO',
      SW_SECURE_DECODE: 'SW_SECURE_DECODE',
      HW_SECURE_CRYPTO: 'HW_SECURE_CRYPTO',
      HW_SECURE_DECODE: 'HW_SECURE_DECODE',
      HW_SECURE_ALL: 'HW_SECURE_ALL'
    }
  },
  MEDIA_KEY_STATUSES: {
    USABLE: 'usable',
    EXPIRED: 'expired',
    RELEASED: 'released',
    OUTPUT_RESTRICTED: 'output-restricted',
    OUTPUT_DOWNSCALED: 'output-downscaled',
    STATUS_PENDING: 'status-pending',
    INTERNAL_ERROR: 'internal-error'
  }
});

/***/ }),

/***/ "./src/streaming/protection/CommonEncryption.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/CommonEncryption.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dash_constants_DashConstants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dash/constants/DashConstants.js */ "./src/dash/constants/DashConstants.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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


const LICENSE_SERVER_MANIFEST_CONFIGURATIONS = {
  prefixes: ['clearkey', 'dashif', 'ck']
};

/**
 * @class
 * @ignore
 */
class CommonEncryption {
  /**
   * Find and return the ContentProtection element in the given array
   * that indicates support for MP4 Common Encryption
   *
   * @param {Array} cpArray array of content protection elements
   * @returns {Object|null} the Common Encryption content protection element or
   * null if one was not found
   */
  static findMp4ProtectionElement(cpArray) {
    let retVal = null;
    for (let i = 0; i < cpArray.length; ++i) {
      let cp = cpArray[i];
      if (cp.schemeIdUri && cp.schemeIdUri.toLowerCase() === _dash_constants_DashConstants_js__WEBPACK_IMPORTED_MODULE_0__["default"].MP4_PROTECTION_SCHEME && cp.value && (cp.value.toLowerCase() === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_1__["default"].ENCRYPTION_SCHEME_CENC || cp.value.toLowerCase() === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_1__["default"].ENCRYPTION_SCHEME_CBCS)) {
        retVal = cp;
      }
    }
    return retVal;
  }

  /**
   * Returns just the data portion of a single PSSH
   *
   * @param {ArrayBuffer} pssh - the PSSH
   * @return {ArrayBuffer} data portion of the PSSH
   */
  static getPSSHData(pssh) {
    let offset = 8; // Box size and type fields
    let view = new DataView(pssh);

    // Read version
    let version = view.getUint8(offset);
    offset += 20; // Version (1), flags (3), system ID (16)

    if (version > 0) {
      offset += 4 + 16 * view.getUint32(offset); // Key ID count (4) and All key IDs (16*count)
    }
    offset += 4; // Data size
    return pssh.slice(offset);
  }

  /**
   * Returns the PSSH associated with the given key system from the concatenated
   * list of PSSH boxes in the given initData
   *
   * @param {KeySystem} keySystem the desired
   * key system
   * @param {ArrayBuffer} initData 'cenc' initialization data.  Concatenated list of PSSH.
   * @returns {ArrayBuffer|null} The PSSH box data corresponding to the given key system, null if not found
   * or null if a valid association could not be found.
   */
  static getPSSHForKeySystem(keySystem, initData) {
    let psshList = CommonEncryption.parsePSSHList(initData);
    if (keySystem && psshList.hasOwnProperty(keySystem.uuid.toLowerCase())) {
      return psshList[keySystem.uuid.toLowerCase()];
    }
    return null;
  }

  /**
   * Parse a standard common encryption PSSH which contains a simple
   * base64-encoding of the init data
   *
   * @param {Object} cpData the ContentProtection element
   * @param {BASE64} BASE64 reference
   * @returns {ArrayBuffer|null} the init data or null if not found
   */
  static parseInitDataFromContentProtection(cpData, BASE64) {
    if ('pssh' in cpData && cpData.pssh) {
      // Remove whitespaces and newlines from pssh text
      cpData.pssh.__text = cpData.pssh.__text.replace(/\r?\n|\r/g, '').replace(/\s+/g, '');
      return BASE64.decodeArray(cpData.pssh.__text).buffer;
    }
    return null;
  }

  /**
   * Parses list of PSSH boxes into keysystem-specific PSSH data
   *
   * @param {ArrayBuffer} data - the concatenated list of PSSH boxes as provided by
   * CDM as initialization data when CommonEncryption content is detected
   * @returns {Object|Array} an object that has a property named according to each of
   * the detected key system UUIDs (e.g. 00000000-0000-0000-0000-0000000000)
   * and a ArrayBuffer (the entire PSSH box) as the property value
   */
  static parsePSSHList(data) {
    if (data === null || data === undefined) {
      return [];
    }
    let dv = new DataView(data.buffer || data); // data.buffer first for Uint8Array support
    let done = false;
    let pssh = {};

    // TODO: Need to check every data read for end of buffer
    let byteCursor = 0;
    while (!done) {
      let size, nextBox, version, systemID;
      let boxStart = byteCursor;
      if (byteCursor >= dv.buffer.byteLength) {
        break;
      }

      /* Box size */
      size = dv.getUint32(byteCursor);
      nextBox = byteCursor + size;
      byteCursor += 4;

      /* Verify PSSH */
      if (dv.getUint32(byteCursor) !== 0x70737368) {
        byteCursor = nextBox;
        continue;
      }
      byteCursor += 4;

      /* Version must be 0 or 1 */
      version = dv.getUint8(byteCursor);
      if (version !== 0 && version !== 1) {
        byteCursor = nextBox;
        continue;
      }
      byteCursor++;
      byteCursor += 3; /* skip flags */

      // 16-byte UUID/SystemID
      systemID = '';
      let i, val;
      for (i = 0; i < 4; i++) {
        val = dv.getUint8(byteCursor + i).toString(16);
        systemID += val.length === 1 ? '0' + val : val;
      }
      byteCursor += 4;
      systemID += '-';
      for (i = 0; i < 2; i++) {
        val = dv.getUint8(byteCursor + i).toString(16);
        systemID += val.length === 1 ? '0' + val : val;
      }
      byteCursor += 2;
      systemID += '-';
      for (i = 0; i < 2; i++) {
        val = dv.getUint8(byteCursor + i).toString(16);
        systemID += val.length === 1 ? '0' + val : val;
      }
      byteCursor += 2;
      systemID += '-';
      for (i = 0; i < 2; i++) {
        val = dv.getUint8(byteCursor + i).toString(16);
        systemID += val.length === 1 ? '0' + val : val;
      }
      byteCursor += 2;
      systemID += '-';
      for (i = 0; i < 6; i++) {
        val = dv.getUint8(byteCursor + i).toString(16);
        systemID += val.length === 1 ? '0' + val : val;
      }
      byteCursor += 6;
      systemID = systemID.toLowerCase();

      /* PSSH Data Size */
      byteCursor += 4;

      /* PSSH Data */
      pssh[systemID] = dv.buffer.slice(boxStart, nextBox);
      byteCursor = nextBox;
    }
    return pssh;
  }
  static getLicenseServerUrlFromMediaInfo(mediaInfoArr, schemeIdUri) {
    try {
      if (!mediaInfoArr || mediaInfoArr.length === 0) {
        return null;
      }
      let i = 0;
      let licenseServer = null;
      while (i < mediaInfoArr.length && !licenseServer) {
        const mediaInfo = mediaInfoArr[i];
        if (mediaInfo && mediaInfo.contentProtection && mediaInfo.contentProtection.length > 0) {
          const targetProtectionData = mediaInfo.contentProtection.filter(cp => {
            return cp.schemeIdUri && cp.schemeIdUri === schemeIdUri;
          });
          if (targetProtectionData && targetProtectionData.length > 0) {
            let j = 0;
            while (j < targetProtectionData.length && !licenseServer) {
              const contentProtection = targetProtectionData[j];
              if (contentProtection.laUrl && contentProtection.laUrl.__prefix && LICENSE_SERVER_MANIFEST_CONFIGURATIONS.prefixes.includes(contentProtection.laUrl.__prefix) && contentProtection.laUrl.__text) {
                licenseServer = contentProtection.laUrl.__text;
              }
              j += 1;
            }
          }
        }
        i += 1;
      }
      return licenseServer;
    } catch (e) {
      return null;
    }
  }
  static hexKidToBufferSource(hexKid) {
    const cleanedHexKid = hexKid.replace(/-/g, '');
    const typedArray = new Uint8Array(cleanedHexKid.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16);
    }));
    return typedArray.buffer;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (CommonEncryption);

/***/ }),

/***/ "./src/streaming/protection/ProtectionEvents.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/ProtectionEvents.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 */
class ProtectionEvents extends _core_events_EventsBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @description Public facing external events to be used when including protection package.
   * All public events will be aggregated into the MediaPlayerEvents Class and can be accessed
   * via MediaPlayer.events.  public_ is the prefix that we use to move event names to MediaPlayerEvents.
   */
  constructor() {
    super();

    /**
     * Event ID for events delivered when the protection set receives
     * a key message from the CDM
     *
     * @ignore
     */
    this.INTERNAL_KEY_MESSAGE = 'internalKeyMessage';

    /**
     * Event ID for events delivered when the status of one decryption keys has changed
     * @ignore
     */
    this.INTERNAL_KEY_STATUSES_CHANGED = 'internalkeyStatusesChanged';

    /**
     * Event ID for events delivered when a new key has been added
     *
     * @constant
     * @deprecated The latest versions of the EME specification no longer
     * use this event.  {@MediaPlayer.models.protectionModel.eventList.KEY_STATUSES_CHANGED}
     * is preferred.
     * @event ProtectionEvents#KEY_ADDED
     */
    this.KEY_ADDED = 'public_keyAdded';
    /**
     * Event ID for events delivered when an error is encountered by the CDM
     * while processing a license server response message
     * @event ProtectionEvents#KEY_ERROR
     */
    this.KEY_ERROR = 'public_keyError';

    /**
     * Event ID for events delivered when the protection set receives
     * a key message from the CDM
     * @event ProtectionEvents#KEY_MESSAGE
     */
    this.KEY_MESSAGE = 'public_keyMessage';

    /**
     * Event ID for events delivered when a key session close
     * process has completed
     * @event ProtectionEvents#KEY_SESSION_CLOSED
     */
    this.KEY_SESSION_CLOSED = 'public_keySessionClosed';

    /**
     * Event ID for events delivered when a new key sessions creation
     * process has completed
     * @event ProtectionEvents#KEY_SESSION_CREATED
     */
    this.KEY_SESSION_CREATED = 'public_keySessionCreated';

    /**
     * Event ID for events delivered when a key session removal
     * process has completed
     * @event ProtectionEvents#KEY_SESSION_REMOVED
     */
    this.KEY_SESSION_REMOVED = 'public_keySessionRemoved';

    /**
     * Event ID for events delivered when the status of one or more
     * decryption keys has changed
     * @event ProtectionEvents#KEY_STATUSES_CHANGED
     */
    this.KEY_STATUSES_CHANGED = 'public_keyStatusesChanged';

    /**
     * Triggered when the key statuses Map() of the ProtectionController was updated. This happens after there is a keystatuseschange.
     * The event can be used as an indicator when to refresh the list of possible Representations
     * @event ProtectionEvents#KEY_STATUSES_MAP_UPDATED
     */
    this.KEY_STATUSES_MAP_UPDATED = 'keyStatusesMapUpdated';

    /**
     * Event ID for events delivered when a key system access procedure
     * has completed
     * @event ProtectionEvents#KEY_SYSTEM_ACCESS_COMPLETE
     */
    this.KEY_SYSTEM_ACCESS_COMPLETE = 'public_keySystemAccessComplete';

    /**
     * Event ID for events delivered when a key system selection procedure
     * completes
     * @event ProtectionEvents#KEY_SYSTEM_SELECTED
     */
    this.KEY_SYSTEM_SELECTED = 'public_keySystemSelected';

    /**
     * Event ID for events delivered when a license request procedure
     * has completed
     * @event ProtectionEvents#LICENSE_REQUEST_COMPLETE
     */
    this.LICENSE_REQUEST_COMPLETE = 'public_licenseRequestComplete';

    /**
     * Sending a license rquest
     * @event ProtectionEvents#LICENSE_REQUEST_SENDING
     */
    this.LICENSE_REQUEST_SENDING = 'public_licenseRequestSending';

    /**
     * Event ID for needkey/encrypted events
     * @ignore
     */
    this.NEED_KEY = 'needkey';

    /**
     * Event ID for events delivered when the Protection system is detected and created.
     * @event ProtectionEvents#PROTECTION_CREATED
     */
    this.PROTECTION_CREATED = 'public_protectioncreated';

    /**
     * Event ID for events delivered when the Protection system is destroyed.
     * @event ProtectionEvents#PROTECTION_DESTROYED
     */
    this.PROTECTION_DESTROYED = 'public_protectiondestroyed';

    /**
     * Event ID for events delivered when a new server certificate has
     * been delivered to the CDM
     * @ignore
     */
    this.SERVER_CERTIFICATE_UPDATED = 'serverCertificateUpdated';

    /**
     * Event ID for events delivered when the process of shutting down
     * a protection set has completed
     * @ignore
     */
    this.TEARDOWN_COMPLETE = 'protectionTeardownComplete';

    /**
     * Event ID for events delivered when a HTMLMediaElement has been
     * associated with the protection set
     * @ignore
     */
    this.VIDEO_ELEMENT_SELECTED = 'videoElementSelected';

    /**
     * Triggered when the key session has been updated successfully
     * @ignore
     */
    this.KEY_SESSION_UPDATED = 'public_keySessionUpdated';
  }
}
let protectionEvents = new ProtectionEvents();
/* harmony default export */ __webpack_exports__["default"] = (protectionEvents);

/***/ }),

/***/ "./src/streaming/protection/controllers/ProtectionController.js":
/*!**********************************************************************!*\
  !*** ./src/streaming/protection/controllers/ProtectionController.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommonEncryption.js */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _vo_MediaCapability_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/MediaCapability.js */ "./src/streaming/protection/vo/MediaCapability.js");
/* harmony import */ var _vo_KeySystemConfiguration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vo/KeySystemConfiguration.js */ "./src/streaming/protection/vo/KeySystemConfiguration.js");
/* harmony import */ var _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errors/ProtectionErrors.js */ "./src/streaming/protection/errors/ProtectionErrors.js");
/* harmony import */ var _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../vo/DashJSError.js */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _vo_LicenseRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vo/LicenseRequest.js */ "./src/streaming/protection/vo/LicenseRequest.js");
/* harmony import */ var _vo_LicenseResponse_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../vo/LicenseResponse.js */ "./src/streaming/protection/vo/LicenseResponse.js");
/* harmony import */ var _vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../vo/metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _core_Utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../core/Utils.js */ "./src/core/Utils.js");
/* harmony import */ var _constants_Constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../constants/Constants.js */ "./src/streaming/constants/Constants.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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













const NEEDKEY_BEFORE_INITIALIZE_RETRIES = 5;
const NEEDKEY_BEFORE_INITIALIZE_TIMEOUT = 500;
const LICENSE_SERVER_REQUEST_RETRIES = 3;
const LICENSE_SERVER_REQUEST_RETRY_INTERVAL = 1000;
const LICENSE_SERVER_REQUEST_DEFAULT_TIMEOUT = 8000;

/**
 * @module ProtectionController
 * @description Provides access to media protection information and functionality.  Each
 * ProtectionController manages a single {@link MediaPlayer.models.ProtectionModel}
 * which encapsulates a set of protection information (EME APIs, selected key system,
 * key sessions).  The APIs of ProtectionController mostly align with the latest EME
 * APIs.  Key system selection is mostly automated when combined with app-overrideable
 * functionality provided in {@link ProtectionKeyController}.
 * @todo ProtectionController does almost all of its tasks automatically after init() is
 * called.  Applications might want more control over this process and want to go through
 * each step manually (key system selection, session creation, session maintenance).
 * This module can be accessed using the MediaPlayer API getProtectionController()
 * @param {Object} config
 */

function ProtectionController(config) {
  config = config || {};
  const BASE64 = config.BASE64;
  const cmcdModel = config.cmcdModel;
  const constants = config.constants;
  const customParametersModel = config.customParametersModel;
  const debug = config.debug;
  const eventBus = config.eventBus;
  const events = config.events;
  const protectionKeyController = config.protectionKeyController;
  const settings = config.settings;
  let protectionModel = config.protectionModel;
  let needkeyRetries = [];
  let applicationProvidedProtectionData, instance, keyStatusMap, keySystemSelectionInProgress, licenseRequestRetryTimeout, licenseXhrRequest, logger, mediaInfoArr, pendingMediaTypesToHandle, robustnessLevel, selectedKeySystem, sessionType;
  function setup() {
    logger = debug.getLogger(instance);
    pendingMediaTypesToHandle = [];
    mediaInfoArr = [];
    sessionType = 'temporary';
    robustnessLevel = '';
    licenseXhrRequest = null;
    licenseRequestRetryTimeout = null;
    keyStatusMap = new Map();
    eventBus.on(events.INTERNAL_KEY_MESSAGE, _onKeyMessage, instance);
  }
  function _checkConfig() {
    if (!eventBus || !eventBus.hasOwnProperty('on') || !protectionKeyController || !protectionKeyController.hasOwnProperty('getSupportedKeySystemMetadataFromContentProtection')) {
      throw new Error('Missing config parameter(s)');
    }
  }

  /**
   * Initialize this protection system for a given media type.
   *
   * @param {StreamInfo} [mediaInfo] Media information
   * @memberof module:ProtectionController
   * @instance
   */
  function initializeForMedia(mediaInfo) {
    // Not checking here if a session for similar KS/KID combination is already created
    // because still don't know which keysystem will be selected.
    // Once Keysystem is selected and before creating the session, we will do that check
    // so we create the strictly necessary DRM sessions
    if (!mediaInfo) {
      throw new Error('mediaInfo can not be null or undefined');
    }
    _checkConfig();
    mediaInfoArr.push(mediaInfo);
  }

  /**
   * Once all mediaInfo objects have been added to our mediaInfoArray we can select a key system or check if the kid has changed and we need to trigger a new license request
   * @memberof module:ProtectionController
   * @instance
   */
  function handleKeySystemFromManifest() {
    if (!mediaInfoArr || mediaInfoArr.length === 0) {
      return;
    }
    let supportedKeySystemsMetadata = [];
    mediaInfoArr.forEach(mediaInfo => {
      const keySystemsMetadata = protectionKeyController.getSupportedKeySystemMetadataFromContentProtection(mediaInfo.contentProtection, applicationProvidedProtectionData, sessionType);
      // We assume that the same key systems are signaled for each AS. We can use the first entry we find
      if (keySystemsMetadata.length > 0) {
        if (supportedKeySystemsMetadata.length === 0) {
          supportedKeySystemsMetadata = keySystemsMetadata;
        }
        // Save config for creating key session once we selected a key system
        pendingMediaTypesToHandle.push(keySystemsMetadata);
      }
    });
    if (supportedKeySystemsMetadata && supportedKeySystemsMetadata.length > 0) {
      _selectKeySystemOrUpdateKeySessions(supportedKeySystemsMetadata, true);
    }
  }

  /**
   * Selects a key system if we dont have any one yet. Otherwise we use the existing key system and trigger a new license request if the initdata has changed
   * @param {array} supportedKeySystemsMetadata
   * @private
   */
  function _handleKeySystemFromPssh(supportedKeySystemsMetadata) {
    pendingMediaTypesToHandle.push(supportedKeySystemsMetadata);
    _selectKeySystemOrUpdateKeySessions(supportedKeySystemsMetadata, false);
  }

  /**
   * Select the key system or update one of our existing key sessions
   * @param {array} supportedKeySystemsMetadata
   * @param {boolean} fromManifest
   * @private
   */
  function _selectKeySystemOrUpdateKeySessions(supportedKeySystemsMetadata, fromManifest) {
    // First time, so we need to select a key system
    if (!selectedKeySystem && !keySystemSelectionInProgress) {
      _selectInitialKeySystem(supportedKeySystemsMetadata, fromManifest);
    }

    // We already selected a key system. We only need to trigger a new license exchange if the init data has changed
    else if (selectedKeySystem) {
      _handlePendingMediaTypes();
    }
  }

  /**
   * We do not have a key system yet. Select one
   * @param {array} supportedKeySystemsMetadata
   * @param {boolean} fromManifest
   * @private
   */
  function _selectInitialKeySystem(supportedKeySystemsMetadata, fromManifest) {
    if (keySystemSelectionInProgress) {
      return;
    }
    keySystemSelectionInProgress = true;

    // Reorder key systems according to priority order provided in protectionData
    supportedKeySystemsMetadata = _sortKeySystemsByPriority(supportedKeySystemsMetadata);

    // Add all key systems to our request list since we have yet to select a key system
    const keySystemConfigurationsToRequest = _getKeySystemConfigurations(supportedKeySystemsMetadata);
    let keySystemAccess;
    protectionModel.requestKeySystemAccess(keySystemConfigurationsToRequest).then(event => {
      keySystemAccess = event.data;
      return _onKeySystemAccessed(keySystemAccess);
    }).then(keySystem => {
      _onMediaKeysCreated(keySystem, keySystemAccess);
    }).catch(event => {
      _handleKeySystemSelectionError(event, fromManifest);
    });
  }
  function _onKeySystemAccessed(keySystemAccess) {
    let selectedSystemString = keySystemAccess && keySystemAccess.selectedSystemString ? keySystemAccess.selectedSystemString : keySystemAccess.keySystem.systemString;
    logger.info('DRM: KeySystem Access Granted for system string (' + selectedSystemString + ')!  Selecting key system...');
    return protectionModel.selectKeySystem(keySystemAccess);
  }
  function _onMediaKeysCreated(keySystem, keySystemAccess) {
    selectedKeySystem = keySystem;
    keySystemSelectionInProgress = false;
    eventBus.trigger(events.KEY_SYSTEM_SELECTED, {
      data: keySystemAccess
    });

    // Set server certificate from protData
    const protData = _getProtDataForKeySystem(selectedKeySystem);
    if (protData && protData.serverCertificate && protData.serverCertificate.length > 0) {
      protectionModel.setServerCertificate(BASE64.decodeArray(protData.serverCertificate).buffer);
    }
    _handlePendingMediaTypes();
  }

  /**
   * If we have already selected a key system we only need to create a new key session and issue a new license request if the init data has changed.
   * @private
   */
  function _handlePendingMediaTypes() {
    // Create key sessions for the different AdaptationSets
    let ksIdx;
    for (let i = 0; i < pendingMediaTypesToHandle.length; i++) {
      for (ksIdx = 0; ksIdx < pendingMediaTypesToHandle[i].length; ksIdx++) {
        if (selectedKeySystem === pendingMediaTypesToHandle[i][ksIdx].ks) {
          const keySystemMetadata = pendingMediaTypesToHandle[i][ksIdx];
          _loadOrCreateKeySession(keySystemMetadata);
          break;
        }
      }
    }
    pendingMediaTypesToHandle = [];
  }
  function _handleKeySystemSelectionError(event, fromManifest) {
    selectedKeySystem = null;
    keySystemSelectionInProgress = false;
    if (!fromManifest) {
      eventBus.trigger(events.KEY_SYSTEM_SELECTED, {
        data: null,
        error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SYSTEM_ACCESS_DENIED_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SYSTEM_ACCESS_DENIED_ERROR_MESSAGE + 'Error selecting key system! -- ' + event.error)
      });
    }
  }
  function _sortKeySystemsByPriority(supportedKeySystems) {
    return supportedKeySystems.sort((ksA, ksB) => {
      let indexA = applicationProvidedProtectionData && applicationProvidedProtectionData[ksA.ks.systemString] && applicationProvidedProtectionData[ksA.ks.systemString].priority >= 0 ? applicationProvidedProtectionData[ksA.ks.systemString].priority : supportedKeySystems.length;
      let indexB = applicationProvidedProtectionData && applicationProvidedProtectionData[ksB.ks.systemString] && applicationProvidedProtectionData[ksB.ks.systemString].priority >= 0 ? applicationProvidedProtectionData[ksB.ks.systemString].priority : supportedKeySystems.length;
      return indexA - indexB;
    });
  }
  function _getKeySystemConfigurations(supportedKeySystemsMetadata) {
    const keySystemConfigurationsToRequest = [];
    for (let i = 0; i < supportedKeySystemsMetadata.length; i++) {
      const keySystemConfiguration = _getKeySystemConfiguration(supportedKeySystemsMetadata[i]);
      keySystemConfigurationsToRequest.push({
        ks: supportedKeySystemsMetadata[i].ks,
        configs: [keySystemConfiguration],
        protData: supportedKeySystemsMetadata[i].protData
      });
    }
    return keySystemConfigurationsToRequest;
  }

  /**
   * Returns an object corresponding to the EME MediaKeySystemConfiguration dictionary
   * @param {object} keySystem
   * @return {KeySystemConfiguration}
   * @private
   */
  function _getKeySystemConfiguration(keySystemData) {
    const protData = keySystemData.protData;
    const audioCapabilities = [];
    const videoCapabilities = [];
    const initDataTypes = protData && protData.initDataTypes && protData.initDataTypes.length > 0 ? protData.initDataTypes : [_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_11__["default"].INITIALIZATION_DATA_TYPE_CENC];
    const audioRobustness = protData && protData.audioRobustness && protData.audioRobustness.length > 0 ? protData.audioRobustness : robustnessLevel;
    const videoRobustness = protData && protData.videoRobustness && protData.videoRobustness.length > 0 ? protData.videoRobustness : robustnessLevel;
    const ksSessionType = keySystemData.sessionType;
    const distinctiveIdentifier = protData && protData.distinctiveIdentifier ? protData.distinctiveIdentifier : 'optional';
    const persistentState = protData && protData.persistentState ? protData.persistentState : ksSessionType === 'temporary' ? 'optional' : 'required';
    mediaInfoArr.forEach(media => {
      if (media.type === constants.AUDIO) {
        audioCapabilities.push(new _vo_MediaCapability_js__WEBPACK_IMPORTED_MODULE_1__["default"](media.codec, audioRobustness));
      } else if (media.type === constants.VIDEO) {
        videoCapabilities.push(new _vo_MediaCapability_js__WEBPACK_IMPORTED_MODULE_1__["default"](media.codec, videoRobustness));
      }
    });
    return new _vo_KeySystemConfiguration_js__WEBPACK_IMPORTED_MODULE_2__["default"](audioCapabilities, videoCapabilities, distinctiveIdentifier, persistentState, [ksSessionType], initDataTypes);
  }

  /**
   * Loads an existing key session if we already have a session id. Otherwise we create a new key session
   * @param {object} keySystemMetadata
   * @private
   */
  function _loadOrCreateKeySession(keySystemMetadata) {
    if (protectionKeyController.isClearKey(selectedKeySystem)) {
      _handleClearkeySession(keySystemMetadata);
    }

    // Reuse existing KeySession
    if (keySystemMetadata.sessionId) {
      // Load MediaKeySession with sessionId
      loadKeySession(keySystemMetadata);
    }

    // Create a new KeySession
    else if (keySystemMetadata.initData !== null) {
      // Create new MediaKeySession with initData
      createKeySession(keySystemMetadata);
    }
  }
  function _handleClearkeySession(keySystemMetadata) {
    // For Clearkey: if parameters for generating init data was provided by the user, use them for generating
    // initData and overwrite possible initData indicated in encrypted event (EME)
    if (keySystemMetadata.protData && keySystemMetadata.protData.hasOwnProperty('clearkeys') && Object.keys(keySystemMetadata.protData.clearkeys).length !== 0) {
      const initData = {
        kids: Object.keys(keySystemMetadata.protData.clearkeys)
      };
      keySystemMetadata.initData = new TextEncoder().encode(JSON.stringify(initData));
    }
  }

  /**
   * Loads a key session with the given session ID from persistent storage.  This essentially creates a new key session
   *
   * @param {object} ksInfo
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#KeySessionCreated
   * @ignore
   */
  function loadKeySession(keySystemMetadata) {
    _checkConfig();
    protectionModel.loadKeySession(keySystemMetadata);
  }

  /**
   * Create a new key session associated with the given initialization data from the MPD or from the PSSH box in the media
   * For the latest version of the EME a request is generated. Once this request is ready we get notified via the INTERNAL_KEY_MESSAGE event
   * @param {ArrayBuffer} initData the initialization data
   * @param {Uint8Array} cdmData the custom data to provide to licenser
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#KeySessionCreated
   * @ignore
   */
  function createKeySession(keySystemMetadata) {
    // Check for duplicate key id
    if (keySystemMetadata && _doesSessionForKeyIdExists(keySystemMetadata.keyId)) {
      return;
    }
    const initDataForKS = _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPSSHForKeySystem(selectedKeySystem, keySystemMetadata ? keySystemMetadata.initData : null);
    if (initDataForKS) {
      // Check for duplicate initData
      if (_isInitDataDuplicate(initDataForKS)) {
        return;
      }
      try {
        keySystemMetadata.initData = initDataForKS;
        protectionModel.createKeySession(keySystemMetadata);
      } catch (error) {
        eventBus.trigger(events.KEY_SESSION_CREATED, {
          data: null,
          error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + error.message)
        });
      }
    } else if (keySystemMetadata && keySystemMetadata.initData) {
      protectionModel.createKeySession(keySystemMetadata);
    } else {
      eventBus.trigger(events.KEY_SESSION_CREATED, {
        data: null,
        error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + 'Selected key system is ' + (selectedKeySystem ? selectedKeySystem.systemString : null) + '.  needkey/encrypted event contains no initData corresponding to that key system!')
      });
    }
  }

  /**
   * Returns the protectionData for a specific keysystem as specified by the application.
   * @param {object} keySystem
   * @return {object | null}
   * @private
   */
  function _getProtDataForKeySystem(keySystem) {
    if (keySystem) {
      const keySystemString = keySystem.systemString;
      if (applicationProvidedProtectionData) {
        return keySystemString in applicationProvidedProtectionData ? applicationProvidedProtectionData[keySystemString] : null;
      }
    }
    return null;
  }

  /**
   * Removes all entries from the mediaInfoArr
   */
  function clearMediaInfoArray() {
    mediaInfoArr = [];
  }

  /**
   * Returns a set of supported key systems and CENC initialization data
   * from the given array of ContentProtection elements.  Only
   * key systems that are supported by this player will be returned.
   * Key systems are returned in priority order (highest first).
   *
   * @param {Array.<Object>} cps - array of content protection elements parsed
   * from the manifest
   * @returns {Array.<Object>} array of objects indicating which supported key
   * systems were found.  Empty array is returned if no
   * supported key systems were found
   * @memberof module:ProtectionKeyController
   * @instance
   * @ignore
   */
  function getSupportedKeySystemMetadataFromContentProtection(cps) {
    _checkConfig();
    return protectionKeyController.getSupportedKeySystemMetadataFromContentProtection(cps, applicationProvidedProtectionData, sessionType);
  }

  /**
   * Checks if a session has already created for the provided key id
   * @param {string} keyId
   * @return {boolean}
   * @private
   */
  function _doesSessionForKeyIdExists(keyId) {
    if (!keyId) {
      return false;
    }
    try {
      const sessions = protectionModel.getSessionTokens();
      for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].getKeyId() === keyId) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Checks if the provided init data is equal to one of the existing init data values
   * @param {any} initDataForKS
   * @return {boolean}
   * @private
   */
  function _isInitDataDuplicate(initDataForKS) {
    if (!initDataForKS) {
      return false;
    }
    try {
      const currentInitData = protectionModel.getAllInitData();
      for (let i = 0; i < currentInitData.length; i++) {
        if (protectionKeyController.initDataEquals(initDataForKS, currentInitData[i])) {
          logger.debug('DRM: Ignoring initData because we have already seen it!');
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Removes the given key session from persistent storage and closes the session
   * as if {@link ProtectionController#closeKeySession}
   * was called
   *
   * @param {SessionToken} sessionToken the session
   * token
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#KeySessionRemoved
   * @fires ProtectionController#KeySessionClosed
   * @ignore
   */
  function removeKeySession(sessionToken) {
    _checkConfig();
    protectionModel.removeKeySession(sessionToken);
  }

  /**
   * Closes the key session and releases all associated decryption keys.  These
   * keys will no longer be available for decrypting media
   *
   * @param {SessionToken} sessionToken the session
   * token
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#KeySessionClosed
   * @ignore
   */
  function closeKeySession(sessionToken) {
    _checkConfig();
    protectionModel.closeKeySession(sessionToken);
  }

  /**
   * Sets a server certificate for use by the CDM when signing key messages
   * intended for a particular license server.  This will fire
   * an error event if a key system has not yet been selected.
   *
   * @param {ArrayBuffer} serverCertificate a CDM-specific license server
   * certificate
   * @memberof module:ProtectionController
   * @instance
   * @fires ProtectionController#ServerCertificateUpdated
   */
  function setServerCertificate(serverCertificate) {
    _checkConfig();
    protectionModel.setServerCertificate(serverCertificate);
  }

  /**
   * Associate this protection system with the given HTMLMediaElement.  This
   * causes the system to register for needkey/encrypted events from the given
   * element and provides a destination for setting of MediaKeys
   *
   * @param {HTMLMediaElement} element the media element to which the protection
   * system should be associated
   * @memberof module:ProtectionController
   * @instance
   */
  function setMediaElement(element) {
    _checkConfig();
    if (element) {
      protectionModel.setMediaElement(element);
      eventBus.on(events.NEED_KEY, _onNeedKey, instance);
    } else if (element === null) {
      protectionModel.setMediaElement(element);
      eventBus.off(events.NEED_KEY, _onNeedKey, instance);
    }
  }

  /**
   * Sets the session type to use when creating key sessions.  Either "temporary" or
   * "persistent-license".  Default is "temporary".
   *
   * @param {string} value the session type
   * @memberof module:ProtectionController
   * @instance
   */
  function setSessionType(value) {
    sessionType = value;
  }

  /**
   * Sets the robustness level for video and audio capabilities. Optional to remove Chrome warnings.
   * Possible values are SW_SECURE_CRYPTO, SW_SECURE_DECODE, HW_SECURE_CRYPTO, HW_SECURE_CRYPTO, HW_SECURE_DECODE, HW_SECURE_ALL.
   *
   * @param {string} level the robustness level
   * @memberof module:ProtectionController
   * @instance
   */
  function setRobustnessLevel(level) {
    robustnessLevel = level;
  }

  /**
   * Attach KeySystem-specific data to use for license acquisition with EME
   *
   * @param {Object} data an object containing property names corresponding to
   * key system name strings (e.g. "org.w3.clearkey") and associated values
   * being instances of {@link ProtectionData}
   * @memberof module:ProtectionController
   * @instance
   * @ignore
   */
  function setProtectionData(data) {
    applicationProvidedProtectionData = data;
    protectionKeyController.setProtectionData(data);
  }

  /**
   * Stop method is called when current playback is stopped/resetted.
   *
   * @memberof module:ProtectionController
   * @instance
   */
  function stop() {
    _abortLicenseRequest();
    if (protectionModel) {
      protectionModel.stop();
    }
  }

  /**
   * Destroys all protection data associated with this protection set.  This includes
   * deleting all key sessions. In the case of persistent key sessions, the sessions
   * will simply be unloaded and not deleted.  Additionally, if this protection set is
   * associated with a HTMLMediaElement, it will be detached from that element.
   *
   * @memberof module:ProtectionController
   * @instance
   * @ignore
   */
  function reset() {
    eventBus.off(events.INTERNAL_KEY_MESSAGE, _onKeyMessage, instance);
    _checkConfig();
    _abortLicenseRequest();
    setMediaElement(null);
    selectedKeySystem = null;
    keySystemSelectionInProgress = false;
    keyStatusMap = new Map();
    if (protectionModel) {
      protectionModel.reset();
      protectionModel = null;
    }
    needkeyRetries.forEach(retryTimeout => clearTimeout(retryTimeout));
    needkeyRetries = [];
    mediaInfoArr = [];
    pendingMediaTypesToHandle = [];
  }

  /**
   * Event handler for the key message event. Once we have a key message we can issue a license request
   * @param {object} e
   * @private
   */
  function _onKeyMessage(e) {
    logger.debug('DRM: onKeyMessage');

    // Dispatch event to applications indicating we received a key message
    const keyMessage = e.data;
    eventBus.trigger(events.KEY_MESSAGE, {
      data: keyMessage
    });
    const messageType = keyMessage.messageType ? keyMessage.messageType : _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_11__["default"].MEDIA_KEY_MESSAGE_TYPES.LICENSE_REQUEST;
    const message = keyMessage.message;
    const sessionToken = keyMessage.sessionToken;
    const protData = _getProtDataForKeySystem(selectedKeySystem);
    const licenseServerModelInstance = protectionKeyController.getLicenseServerModelInstance(selectedKeySystem, protData, messageType);
    const eventData = {
      sessionToken: sessionToken,
      messageType: messageType
    };

    // Ensure message from CDM is not empty
    if (!message || message.byteLength === 0) {
      _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_MESSAGE));
      return;
    }

    // Message not destined for license server
    if (!licenseServerModelInstance) {
      logger.debug('DRM: License server request not required for this message (type = ' + e.data.messageType + ').  Session ID = ' + sessionToken.getSessionId());
      _sendLicenseRequestCompleteEvent(eventData);
      return;
    }

    // Perform any special handling for ClearKey
    if (protectionKeyController.isClearKey(selectedKeySystem)) {
      const clearkeys = protectionKeyController.processClearKeyLicenseRequest(selectedKeySystem, protData, message);
      if (clearkeys && clearkeys.keyPairs && clearkeys.keyPairs.length > 0) {
        logger.debug('DRM: ClearKey license request handled by application!');
        _sendLicenseRequestCompleteEvent(eventData);
        protectionModel.updateKeySession(sessionToken, clearkeys);
        return;
      }
    }

    // In all other cases we have to make a license request
    _issueLicenseRequest(keyMessage, licenseServerModelInstance, protData);
  }

  /**
   * Notify other classes that the license request was completed
   * @param {object} data
   * @param {object} error
   * @private
   */
  function _sendLicenseRequestCompleteEvent(data) {
    let error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    eventBus.trigger(events.LICENSE_REQUEST_COMPLETE, {
      data: data,
      error: error
    });
  }

  /**
   * Start issuing a license request
   * @param {object} keyMessage
   * @param {object} licenseServerData
   * @param {object} protData
   * @private
   */
  function _issueLicenseRequest(keyMessage, licenseServerData, protData) {
    const sessionToken = keyMessage.sessionToken;
    const messageType = keyMessage.messageType ? keyMessage.messageType : _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_11__["default"].MEDIA_KEY_MESSAGE_TYPES.LICENSE_REQUEST;
    const eventData = {
      sessionToken: sessionToken,
      messageType: messageType
    };
    const keySystemString = selectedKeySystem ? selectedKeySystem.systemString : null;

    // Determine license server URL
    let url = _getLicenseServerUrl(protData, messageType, sessionToken, keyMessage, licenseServerData);

    // Ensure valid license server URL
    if (!url) {
      _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_MESSAGE));
      return;
    }

    // Set optional XMLHttpRequest headers from protection data and message
    const reqHeaders = {};
    let withCredentials = false;
    if (protData) {
      _updateHeaders(reqHeaders, protData.httpRequestHeaders);
    }
    const message = keyMessage.message;
    const headersFromMessage = selectedKeySystem.getRequestHeadersFromMessage(message);
    _updateHeaders(reqHeaders, headersFromMessage);
    Object.keys(reqHeaders).forEach(key => {
      if ('authorization' === key.toLowerCase()) {
        withCredentials = true;
      }
    });

    // Overwrite withCredentials property from protData if present
    if (protData && typeof protData.withCredentials == 'boolean') {
      withCredentials = protData.withCredentials;
    }
    const onLoad = function (xhr) {
      if (!protectionModel) {
        return;
      }
      if (xhr.status >= 200 && xhr.status <= 299) {
        const responseHeaders = _core_Utils_js__WEBPACK_IMPORTED_MODULE_8__["default"].parseHttpHeaders(xhr.getAllResponseHeaders ? xhr.getAllResponseHeaders() : null);
        let licenseResponse = new _vo_LicenseResponse_js__WEBPACK_IMPORTED_MODULE_6__["default"](xhr.responseURL, responseHeaders, xhr.response);
        const licenseResponseFilters = customParametersModel.getLicenseResponseFilters();
        _applyFilters(licenseResponseFilters, licenseResponse).then(() => {
          const licenseMessage = licenseServerData.getLicenseMessage(licenseResponse.data, keySystemString, messageType);
          if (licenseMessage !== null) {
            _sendLicenseRequestCompleteEvent(eventData);
            protectionModel.updateKeySession(sessionToken, licenseMessage);
          } else {
            _reportError(xhr, eventData, keySystemString, messageType, licenseServerData);
          }
        });
      } else {
        _reportError(xhr, eventData, keySystemString, messageType, licenseServerData);
      }
    };
    const onAbort = function (xhr) {
      _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE + keySystemString + ' update, XHR aborted. status is "' + xhr.statusText + '" (' + xhr.status + '), readyState is ' + xhr.readyState));
    };
    const onError = function (xhr) {
      _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE + keySystemString + ' update, XHR error. status is "' + xhr.statusText + '" (' + xhr.status + '), readyState is ' + xhr.readyState));
    };
    const reqPayload = selectedKeySystem.getLicenseRequestFromMessage(message);
    const reqMethod = licenseServerData.getHTTPMethod(messageType);
    const responseType = licenseServerData.getResponseType(keySystemString, messageType);
    const timeout = protData && !isNaN(protData.httpTimeout) ? protData.httpTimeout : LICENSE_SERVER_REQUEST_DEFAULT_TIMEOUT;
    const sessionId = sessionToken.getSessionId() || null;
    let licenseRequest = new _vo_LicenseRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"](url, reqMethod, responseType, reqHeaders, withCredentials, messageType, sessionId, reqPayload);
    const retryAttempts = !isNaN(settings.get().streaming.retryAttempts[_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE]) ? settings.get().streaming.retryAttempts[_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE] : LICENSE_SERVER_REQUEST_RETRIES;
    const licenseRequestFilters = customParametersModel.getLicenseRequestFilters();
    _applyFilters(licenseRequestFilters, licenseRequest).then(() => {
      _doLicenseRequest(licenseRequest, retryAttempts, timeout, onLoad, onAbort, onError);
    });
  }

  /**
   * Implement license requests with a retry mechanism to avoid temporary network issues to affect playback experience
   * @param {object} request
   * @param {number} retriesCount
   * @param {number} timeout
   * @param {function} onLoad
   * @param {function} onAbort
   * @param {function} onError
   * @private
   */
  function _doLicenseRequest(request, retriesCount, timeout, onLoad, onAbort, onError) {
    const xhr = new XMLHttpRequest();
    const cmcdParameters = cmcdModel.getCmcdParametersFromManifest();
    if (cmcdModel.isCmcdEnabled()) {
      const cmcdMode = cmcdParameters.mode ? cmcdParameters.mode : settings.get().streaming.cmcd.mode;
      if (cmcdMode === _constants_Constants_js__WEBPACK_IMPORTED_MODULE_9__["default"].CMCD_MODE_QUERY) {
        const cmcdParams = cmcdModel.getQueryParameter({
          url: request.url,
          type: _vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE
        });
        if (cmcdParams) {
          request.url = _core_Utils_js__WEBPACK_IMPORTED_MODULE_8__["default"].addAdditionalQueryParameterToUrl(request.url, [cmcdParams]);
        }
      }
    }
    xhr.open(request.method, request.url, true);
    xhr.responseType = request.responseType;
    xhr.withCredentials = request.withCredentials;
    if (timeout > 0) {
      xhr.timeout = timeout;
    }
    for (const key in request.headers) {
      xhr.setRequestHeader(key, request.headers[key]);
    }
    if (cmcdModel.isCmcdEnabled()) {
      const cmcdMode = cmcdParameters.mode ? cmcdParameters.mode : settings.get().streaming.cmcd.mode;
      if (cmcdMode === _constants_Constants_js__WEBPACK_IMPORTED_MODULE_9__["default"].CMCD_MODE_HEADER) {
        const cmcdHeaders = cmcdModel.getHeaderParameters({
          url: request.url,
          type: _vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE
        });
        if (cmcdHeaders) {
          for (const header in cmcdHeaders) {
            let value = cmcdHeaders[header];
            if (value) {
              xhr.setRequestHeader(header, value);
            }
          }
        }
      }
    }
    const _retryRequest = function () {
      // fail silently and retry
      retriesCount--;
      const retryInterval = !isNaN(settings.get().streaming.retryIntervals[_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE]) ? settings.get().streaming.retryIntervals[_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.LICENSE] : LICENSE_SERVER_REQUEST_RETRY_INTERVAL;
      licenseRequestRetryTimeout = setTimeout(function () {
        _doLicenseRequest(request, retriesCount, timeout, onLoad, onAbort, onError);
      }, retryInterval);
    };
    xhr.onload = function () {
      licenseXhrRequest = null;
      if (this.status >= 200 && this.status <= 299 || retriesCount <= 0) {
        onLoad(this);
      } else {
        logger.warn('License request failed (' + this.status + '). Retrying it... Pending retries: ' + retriesCount);
        _retryRequest();
      }
    };
    xhr.ontimeout = xhr.onerror = function () {
      licenseXhrRequest = null;
      if (retriesCount <= 0) {
        onError(this);
      } else {
        logger.warn('License request network request failed . Retrying it... Pending retries: ' + retriesCount);
        _retryRequest();
      }
    };
    xhr.onabort = function () {
      onAbort(this);
    };

    // deprecated, to be removed
    eventBus.trigger(events.LICENSE_REQUEST_SENDING, {
      url: request.url,
      headers: request.headers,
      payload: request.data,
      sessionId: request.sessionId
    });
    licenseXhrRequest = xhr;
    xhr.send(request.data);
  }

  /**
   * Aborts license request
   * @private
   */
  function _abortLicenseRequest() {
    if (licenseXhrRequest) {
      licenseXhrRequest.onloadend = licenseXhrRequest.onerror = licenseXhrRequest.onprogress = undefined; //Ignore events from aborted requests.
      licenseXhrRequest.abort();
      licenseXhrRequest = null;
    }
    if (licenseRequestRetryTimeout) {
      clearTimeout(licenseRequestRetryTimeout);
      licenseRequestRetryTimeout = null;
    }
  }

  /**
   * Returns the url of the license server
   * @param {object} protData
   * @param {string} messageType
   * @param {object} sessionToken
   * @param {object} keyMessage
   * @param {object} licenseServerData
   * @return {*}
   * @private
   */
  function _getLicenseServerUrl(protData, messageType, sessionToken, keyMessage, licenseServerData) {
    let url = null;
    const message = keyMessage.message;

    // Check if the url is defined by the application
    if (protData && protData.serverURL) {
      const serverURL = protData.serverURL;
      if (typeof serverURL === 'string' && serverURL !== '') {
        url = serverURL;
      } else if (typeof serverURL === 'object' && serverURL.hasOwnProperty(messageType)) {
        url = serverURL[messageType];
      }
    }

    // This is the old way of providing the url
    else if (protData && protData.laURL && protData.laURL !== '') {
      url = protData.laURL;
    }

    // No url provided by the app. Check the manifest and the pssh
    else {
      // Check for url defined in the manifest
      url = _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__["default"].getLicenseServerUrlFromMediaInfo(mediaInfoArr, selectedKeySystem.schemeIdURI);

      // In case we are not using Clearky we can still get a url from the pssh.
      if (!url && !protectionKeyController.isClearKey(selectedKeySystem)) {
        const psshData = _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPSSHData(sessionToken.initData);
        url = selectedKeySystem.getLicenseServerURLFromInitData(psshData);

        // Still no url, check the keymessage
        if (!url) {
          url = keyMessage.laURL;
        }
      }
    }
    // Possibly update or override the URL based on the message
    url = licenseServerData.getServerURLFromMessage(url, message, messageType);
    return url;
  }

  /**
   * Add new headers to the existing ones
   * @param {array} reqHeaders
   * @param {object} headers
   * @private
   */
  function _updateHeaders(reqHeaders, headers) {
    if (headers) {
      for (const key in headers) {
        reqHeaders[key] = headers[key];
      }
    }
  }

  /**
   * Reports an error that might have occured during the license request
   * @param {object} xhr
   * @param {object} eventData
   * @param {string} keySystemString
   * @param {string} messageType
   * @param {object} licenseServerData
   * @private
   */
  function _reportError(xhr, eventData, keySystemString, messageType, licenseServerData) {
    let errorMsg = 'NONE';
    let data = null;
    if (xhr.response) {
      errorMsg = licenseServerData.getErrorResponse(xhr.response, keySystemString, messageType);
      data = {
        serverResponse: xhr.response || null,
        responseCode: xhr.status || null,
        responseText: xhr.statusText || null
      };
    }
    _sendLicenseRequestCompleteEvent(eventData, new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_4__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE + keySystemString + ' update, XHR complete. status is "' + xhr.statusText + '" (' + xhr.status + '), readyState is ' + xhr.readyState + '.  Response is ' + errorMsg, data));
  }

  /**
   * Applies custom filters defined by the application
   * @param {array} filters
   * @param {object} param
   * @return {Promise<void>|*}
   * @private
   */
  function _applyFilters(filters, param) {
    if (!filters) {
      return Promise.resolve();
    }
    return filters.reduce((prev, next) => {
      return prev.then(() => {
        return next(param);
      });
    }, Promise.resolve());
  }

  /**
   * Event handler for "needkey" and "encrypted" events
   * @param {object} event
   * @param {number} retry
   * @private
   */
  function _onNeedKey(event, retry) {
    if (settings.get().streaming.protection.ignoreEmeEncryptedEvent) {
      return;
    }
    logger.debug('DRM: onNeedKey');

    // Ignore non-cenc initData
    if (event.key.initDataType !== _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_11__["default"].INITIALIZATION_DATA_TYPE_CENC) {
      logger.warn('DRM:  Only \'cenc\' initData is supported!  Ignoring initData of type: ' + event.key.initDataType);
      return;
    }
    if (mediaInfoArr.length === 0) {
      logger.warn('DRM: onNeedKey called before initializeForMedia, wait until initialized');
      retry = typeof retry === 'undefined' ? 1 : retry + 1;
      if (retry < NEEDKEY_BEFORE_INITIALIZE_RETRIES) {
        needkeyRetries.push(setTimeout(() => {
          _onNeedKey(event, retry);
        }, NEEDKEY_BEFORE_INITIALIZE_TIMEOUT));
        return;
      }
    }

    // Some browsers return initData as Uint8Array (IE), some as ArrayBuffer (Chrome).
    // Convert to ArrayBuffer
    let abInitData = event.key.initData;
    if (ArrayBuffer.isView(abInitData)) {
      abInitData = abInitData.buffer;
    }

    // If key system has already been selected and initData already seen, then do nothing
    if (selectedKeySystem) {
      const initDataForKS = _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPSSHForKeySystem(selectedKeySystem, abInitData);
      if (initDataForKS) {
        // Check for duplicate initData
        if (_isInitDataDuplicate(initDataForKS)) {
          return;
        }
      }
    }
    logger.debug('DRM: initData:', String.fromCharCode.apply(null, new Uint8Array(abInitData)));
    const supportedKeySystemsMetadata = protectionKeyController.getSupportedKeySystemMetadataFromSegmentPssh(abInitData, applicationProvidedProtectionData, sessionType);
    if (supportedKeySystemsMetadata.length === 0) {
      logger.debug('DRM: Received needkey event with initData, but we don\'t support any of the key systems!');
      return;
    }
    _handleKeySystemFromPssh(supportedKeySystemsMetadata);
  }

  /**
   * Returns all available key systems
   * @return {array}
   */
  function getKeySystems() {
    return protectionKeyController ? protectionKeyController.getKeySystems() : [];
  }

  /**
   * Sets all available key systems
   * @param {array} keySystems
   */
  function setKeySystems(keySystems) {
    if (protectionKeyController) {
      protectionKeyController.setKeySystems(keySystems);
    }
  }
  function updateKeyStatusesMap(e) {
    try {
      if (!e || !e.sessionToken || !e.parsedKeyStatuses) {
        return;
      }
      e.sessionToken.hasTriggeredKeyStatusMapUpdate = true;
      const parsedKeyStatuses = e.parsedKeyStatuses;
      const ua = _core_Utils_js__WEBPACK_IMPORTED_MODULE_8__["default"].parseUserAgent();
      const isEdgeBrowser = ua && ua.browser && ua.browser.name && ua.browser.name.toLowerCase() === 'edge';
      parsedKeyStatuses.forEach(keyStatus => {
        if (isEdgeBrowser && selectedKeySystem.uuid === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_11__["default"].PLAYREADY_UUID && keyStatus.keyId && keyStatus.keyId.byteLength === 16) {
          _handlePlayreadyKeyId(keyStatus.keyId);
        }
        const keyIdInHex = _core_Utils_js__WEBPACK_IMPORTED_MODULE_8__["default"].bufferSourceToHex(keyStatus.keyId).slice(0, 32);
        if (keyIdInHex && keyIdInHex !== '') {
          keyStatusMap.set(keyIdInHex, keyStatus.status);
        }
      });
      eventBus.trigger(events.KEY_STATUSES_MAP_UPDATED, {
        keyStatusMap
      });
    } catch (e) {
      logger.error(e);
    }
  }
  function _handlePlayreadyKeyId(keyId) {
    const dataView = _core_Utils_js__WEBPACK_IMPORTED_MODULE_8__["default"].bufferSourceToDataView(keyId);
    const part0 = dataView.getUint32(0, /* LE= */true);
    const part1 = dataView.getUint16(4, /* LE= */true);
    const part2 = dataView.getUint16(6, /* LE= */true);
    // Write it back in big-endian:
    dataView.setUint32(0, part0, /* BE= */false);
    dataView.setUint16(4, part1, /* BE= */false);
    dataView.setUint16(6, part2, /* BE= */false);
  }
  function areKeyIdsUsable(normalizedKeyIds) {
    try {
      if (!_shouldCheckKeyStatusMap(normalizedKeyIds, keyStatusMap)) {
        return true;
      }
      return [...normalizedKeyIds].some(normalizedKeyId => {
        const keyStatus = keyStatusMap.get(normalizedKeyId);
        return keyStatus && keyStatus !== _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_11__["default"].MEDIA_KEY_STATUSES.INTERNAL_ERROR && keyStatus !== _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_11__["default"].MEDIA_KEY_STATUSES.OUTPUT_RESTRICTED;
      });
    } catch (error) {
      logger.error(error);
      return true;
    }
  }
  function areKeyIdsExpired(normalizedKeyIds) {
    try {
      if (!_shouldCheckKeyStatusMap(normalizedKeyIds, keyStatusMap)) {
        return false;
      }
      return [...normalizedKeyIds].every(normalizedKeyId => {
        const keyStatus = keyStatusMap.get(normalizedKeyId);
        return keyStatus === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_11__["default"].MEDIA_KEY_STATUSES.EXPIRED;
      });
    } catch (error) {
      logger.error(error);
      return false;
    }
  }
  function _shouldCheckKeyStatusMap(normalizedKeyIds, keyStatusMap) {
    if (normalizedKeyIds.size <= 0) {
      return false;
    }
    const allHaveStatus = keyStatusMap.size > 0 && [...normalizedKeyIds].every(normalizedKeyId => {
      const keyStatus = keyStatusMap.get(normalizedKeyId);
      return typeof keyStatus !== 'undefined' && keyStatus !== '';
    });
    if (allHaveStatus) {
      return true;
    }
    const sessionTokens = protectionModel.getSessionTokens();
    if (sessionTokens && sessionTokens.length > 0) {
      const targetSessionTokens = sessionTokens.filter(sessionToken => {
        return [...normalizedKeyIds].includes(sessionToken.normalizedKeyId);
      });
      const hasNotTriggeredKeyStatusMapUpdate = targetSessionTokens.some(sessionToken => {
        return !sessionToken.hasTriggeredKeyStatusMapUpdate;
      });
      if (hasNotTriggeredKeyStatusMapUpdate || targetSessionTokens.length === 0) {
        return false;
      }
    }
    return !settings.get().streaming.protection.ignoreKeyStatuses && normalizedKeyIds && normalizedKeyIds.size > 0 && keyStatusMap && keyStatusMap.size > 0;
  }
  instance = {
    areKeyIdsExpired,
    areKeyIdsUsable,
    clearMediaInfoArray,
    closeKeySession,
    createKeySession,
    getKeySystems,
    getSupportedKeySystemMetadataFromContentProtection,
    handleKeySystemFromManifest,
    initializeForMedia,
    loadKeySession,
    removeKeySession,
    reset,
    setKeySystems,
    setMediaElement,
    setProtectionData,
    setRobustnessLevel,
    setServerCertificate,
    setSessionType,
    stop,
    updateKeyStatusesMap
  };
  setup();
  return instance;
}
ProtectionController.__dashjs_factory_name = 'ProtectionController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_10__["default"].getClassFactory(ProtectionController));

/***/ }),

/***/ "./src/streaming/protection/controllers/ProtectionKeyController.js":
/*!*************************************************************************!*\
  !*** ./src/streaming/protection/controllers/ProtectionKeyController.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../CommonEncryption.js */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _drm_KeySystemClearKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../drm/KeySystemClearKey.js */ "./src/streaming/protection/drm/KeySystemClearKey.js");
/* harmony import */ var _drm_KeySystemW3CClearKey_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../drm/KeySystemW3CClearKey.js */ "./src/streaming/protection/drm/KeySystemW3CClearKey.js");
/* harmony import */ var _drm_KeySystemWidevine_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../drm/KeySystemWidevine.js */ "./src/streaming/protection/drm/KeySystemWidevine.js");
/* harmony import */ var _drm_KeySystemPlayReady_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../drm/KeySystemPlayReady.js */ "./src/streaming/protection/drm/KeySystemPlayReady.js");
/* harmony import */ var _servers_DRMToday_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../servers/DRMToday.js */ "./src/streaming/protection/servers/DRMToday.js");
/* harmony import */ var _servers_PlayReady_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../servers/PlayReady.js */ "./src/streaming/protection/servers/PlayReady.js");
/* harmony import */ var _servers_Widevine_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../servers/Widevine.js */ "./src/streaming/protection/servers/Widevine.js");
/* harmony import */ var _servers_ClearKey_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../servers/ClearKey.js */ "./src/streaming/protection/servers/ClearKey.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _vo_KeySystemMetadata_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../vo/KeySystemMetadata.js */ "./src/streaming/protection/vo/KeySystemMetadata.js");
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
 * @module ProtectionKeyController
 * @ignore
 * @description Media protection key system functionality that can be modified/overridden by applications
 */
function ProtectionKeyController() {
  let context = this.context;
  let instance, debug, logger, keySystems, BASE64, settings, clearkeyKeySystem, clearkeyW3CKeySystem;
  function setConfig(config) {
    if (!config) {
      return;
    }
    if (config.debug) {
      debug = config.debug;
      logger = debug.getLogger(instance);
    }
    if (config.BASE64) {
      BASE64 = config.BASE64;
    }
    if (config.settings) {
      settings = config.settings;
    }
  }
  function initialize() {
    keySystems = [];
    let keySystem;

    // PlayReady
    keySystem = (0,_drm_KeySystemPlayReady_js__WEBPACK_IMPORTED_MODULE_4__["default"])(context).getInstance({
      BASE64: BASE64,
      settings: settings
    });
    keySystems.push(keySystem);

    // Widevine
    keySystem = (0,_drm_KeySystemWidevine_js__WEBPACK_IMPORTED_MODULE_3__["default"])(context).getInstance({
      BASE64: BASE64
    });
    keySystems.push(keySystem);

    // ClearKey
    keySystem = (0,_drm_KeySystemClearKey_js__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance({
      BASE64: BASE64
    });
    keySystems.push(keySystem);
    clearkeyKeySystem = keySystem;

    // W3C ClearKey
    keySystem = (0,_drm_KeySystemW3CClearKey_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context).getInstance({
      BASE64: BASE64,
      debug: debug
    });
    keySystems.push(keySystem);
    clearkeyW3CKeySystem = keySystem;
  }

  /**
   * Returns a prioritized list of key systems supported
   * by this player (not necessarily those supported by the
   * user agent)
   *
   * @returns {Array.<KeySystem>} a prioritized
   * list of key systems
   * @memberof module:ProtectionKeyController
   * @instance
   */
  function getKeySystems() {
    return keySystems;
  }

  /**
   * Sets the prioritized list of key systems to be supported
   * by this player.
   *
   * @param {Array.<KeySystem>} newKeySystems the new prioritized
   * list of key systems
   * @memberof module:ProtectionKeyController
   * @instance
   */
  function setKeySystems(newKeySystems) {
    keySystems = newKeySystems;
  }

  /**
   * Returns the key system associated with the given key system string
   * name (i.e. 'org.w3.clearkey')
   *
   * @param {string} systemString the system string
   * @returns {KeySystem|null} the key system
   * or null if no supported key system is associated with the given key
   * system string
   * @memberof module:ProtectionKeyController
   * @instance
   */
  function getKeySystemBySystemString(systemString) {
    for (let i = 0; i < keySystems.length; i++) {
      if (keySystems[i].systemString === systemString) {
        return keySystems[i];
      }
    }
    return null;
  }

  /**
   * Determines whether the given key system is ClearKey.  This is
   * necessary because the EME spec defines ClearKey and its method
   * for providing keys to the key session; and this method has changed
   * between the various API versions.  Our EME-specific ProtectionModels
   * must know if the system is ClearKey so that it can format the keys
   * according to the particular spec version.
   *
   * @param {Object} keySystem the key
   * @returns {boolean} true if this is the ClearKey key system, false
   * otherwise
   * @memberof module:ProtectionKeyController
   * @instance
   */
  function isClearKey(keySystem) {
    return keySystem === clearkeyKeySystem || keySystem === clearkeyW3CKeySystem;
  }

  /**
   * Check equality of initData array buffers.
   *
   * @param {ArrayBuffer} initData1 - first initData
   * @param {ArrayBuffer} initData2 - second initData
   * @returns {boolean} true if the initData arrays are equal in size and
   * contents, false otherwise
   * @memberof module:ProtectionKeyController
   * @instance
   */
  function initDataEquals(initData1, initData2) {
    if (initData1.byteLength === initData2.byteLength) {
      let data1 = new Uint8Array(initData1);
      let data2 = new Uint8Array(initData2);
      for (let j = 0; j < data1.length; j++) {
        if (data1[j] !== data2[j]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  /**
   * Returns a set of supported key systems and CENC initialization data
   * from the given array of ContentProtection elements.  Only
   * key systems that are supported by this player will be returned.
   * Key systems are returned in priority order (highest first).
   *
   * @param {Array.<Object>} contentProtectionElements - array of content protection elements parsed
   * from the manifest
   * @param {ProtectionData} applicationSpecifiedProtectionData user specified protection data - license server url etc
   * supported by the content
   * @param {string} sessionType session type
   * @returns {Array.<Object>} array of objects indicating which supported key
   * systems were found.  Empty array is returned if no supported key systems were found
   * @memberof module:ProtectionKeyController
   * @instance
   */
  function getSupportedKeySystemMetadataFromContentProtection(contentProtectionElements, applicationSpecifiedProtectionData, sessionType) {
    let contentProtectionElement, keySystem, ksIdx, cpIdx;
    let supportedKS = [];
    if (!contentProtectionElements || !contentProtectionElements.length) {
      return supportedKS;
    }
    const mp4ProtectionElement = _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__["default"].findMp4ProtectionElement(contentProtectionElements);
    for (ksIdx = 0; ksIdx < keySystems.length; ksIdx++) {
      keySystem = keySystems[ksIdx];

      // Get protection data that applies for current key system
      const protData = _getProtDataForKeySystem(keySystem.systemString, applicationSpecifiedProtectionData);
      for (cpIdx = 0; cpIdx < contentProtectionElements.length; cpIdx++) {
        contentProtectionElement = contentProtectionElements[cpIdx];
        if (contentProtectionElement.schemeIdUri.toLowerCase() === keySystem.schemeIdURI) {
          // Look for DRM-specific ContentProtection
          let initData = keySystem.getInitData(contentProtectionElement, mp4ProtectionElement);
          const keySystemMetadata = new _vo_KeySystemMetadata_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
            ks: keySystems[ksIdx],
            keyId: contentProtectionElement.keyId,
            initData: initData,
            protData: protData,
            cdmData: keySystem.getCDMData(protData ? protData.cdmData : null),
            sessionId: _getSessionId(protData, contentProtectionElement),
            sessionType: _getSessionType(protData, sessionType)
          });
          if (protData) {
            supportedKS.unshift(keySystemMetadata);
          } else {
            supportedKS.push(keySystemMetadata);
          }
        }
      }
    }
    return supportedKS;
  }

  /**
   * Returns key systems supported by this player for the given PSSH
   * initializationData. Key systems are returned in priority order
   * (highest priority first)
   *
   * @param {ArrayBuffer} initData Concatenated PSSH data for all DRMs
   * supported by the content
   * @param {ProtectionData} protDataSet user specified protection data - license server url etc
   * supported by the content
   * @param {string} default session type
   * @returns {Array.<Object>} array of objects indicating which supported key
   * systems were found.  Empty array is returned if no
   * supported key systems were found
   * @memberof module:ProtectionKeyController
   * @instance
   */
  function getSupportedKeySystemMetadataFromSegmentPssh(initData, protDataSet, sessionType) {
    let supportedKS = [];
    let pssh = _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__["default"].parsePSSHList(initData);
    let ks, keySystemString;
    for (let ksIdx = 0; ksIdx < keySystems.length; ++ksIdx) {
      ks = keySystems[ksIdx];
      keySystemString = ks.systemString;

      // Get protection data that applies for current key system
      const protData = _getProtDataForKeySystem(keySystemString, protDataSet);
      if (ks.uuid in pssh) {
        supportedKS.push({
          ks: ks,
          initData: pssh[ks.uuid],
          protData: protData,
          cdmData: ks.getCDMData(protData ? protData.cdmData : null),
          sessionId: _getSessionId(protData),
          sessionType: _getSessionType(protData, sessionType)
        });
      }
    }
    return supportedKS;
  }

  /**
   * Returns the license server implementation data that should be used for this request.
   *
   * @param {KeySystem} keySystem the key system
   * associated with this license request
   * @param {ProtectionData} protData protection data to use for the
   * request
   * @param {string} [messageType="license-request"] the message type associated with this
   * request.  Supported message types can be found
   * {@link https://w3c.github.io/encrypted-media/#idl-def-MediaKeyMessageType|here}.
   * @returns {LicenseServer|null} the license server
   * implementation that should be used for this request or null if the player should not
   * pass messages of the given type to a license server
   * @memberof module:ProtectionKeyController
   * @instance
   *
   */
  function getLicenseServerModelInstance(keySystem, protData, messageType) {
    // Our default server implementations do not do anything with "license-release" or
    // "individualization-request" messages, so we just send a success event
    if (messageType === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_9__["default"].MEDIA_KEY_MESSAGE_TYPES.LICENSE_RELEASE || messageType === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_9__["default"].MEDIA_KEY_MESSAGE_TYPES.INDIVIDUALIZATION_REQUEST) {
      return null;
    }
    let licenseServerData = null;
    if (protData && protData.hasOwnProperty('drmtoday')) {
      licenseServerData = (0,_servers_DRMToday_js__WEBPACK_IMPORTED_MODULE_5__["default"])(context).getInstance({
        BASE64: BASE64
      });
    } else if (keySystem.systemString === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_9__["default"].WIDEVINE_KEYSTEM_STRING) {
      licenseServerData = (0,_servers_Widevine_js__WEBPACK_IMPORTED_MODULE_7__["default"])(context).getInstance();
    } else if (keySystem.systemString === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_9__["default"].PLAYREADY_KEYSTEM_STRING) {
      licenseServerData = (0,_servers_PlayReady_js__WEBPACK_IMPORTED_MODULE_6__["default"])(context).getInstance();
    } else if (keySystem.systemString === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_9__["default"].CLEARKEY_KEYSTEM_STRING) {
      licenseServerData = (0,_servers_ClearKey_js__WEBPACK_IMPORTED_MODULE_8__["default"])(context).getInstance();
    }
    return licenseServerData;
  }

  /**
   * Allows application-specific retrieval of ClearKey keys.
   *
   * @param {KeySystem} clearkeyKeySystem They exact ClearKey System to be used
   * @param {ProtectionData} protData protection data to use for the
   * request
   * @param {ArrayBuffer} message the key message from the CDM
   * @return {ClearKeyKeySet|null} the clear keys associated with
   * the request or null if no keys can be returned by this function
   * @memberof module:ProtectionKeyController
   * @instance
   */
  function processClearKeyLicenseRequest(clearkeyKeySystem, protData, message) {
    try {
      return clearkeyKeySystem.getClearKeysFromProtectionData(protData, message);
    } catch (error) {
      logger.error('Failed to retrieve clearkeys from ProtectionData');
      return null;
    }
  }
  function setProtectionData(protectionDataSet) {
    var getProtectionData = function (keySystemString) {
      var protData = null;
      if (protectionDataSet) {
        protData = keySystemString in protectionDataSet ? protectionDataSet[keySystemString] : null;
      }
      return protData;
    };
    for (var i = 0; i < keySystems.length; i++) {
      var keySystem = keySystems[i];
      if (keySystem.hasOwnProperty('init')) {
        keySystem.init(getProtectionData(keySystem.systemString));
      }
    }
  }
  function _getProtDataForKeySystem(systemString, protDataSet) {
    if (!protDataSet) {
      return null;
    }
    return systemString in protDataSet ? protDataSet[systemString] : null;
  }
  function _getSessionId(protData, cp) {
    // Get sessionId from protectionData or from manifest (ContentProtection)
    if (protData && protData.sessionId) {
      return protData.sessionId;
    } else if (cp && cp.sessionId) {
      return cp.sessionId;
    }
    return null;
  }
  function _getSessionType(protData, sessionType) {
    return protData && protData.sessionType ? protData.sessionType : sessionType;
  }
  instance = {
    getKeySystemBySystemString,
    getKeySystems,
    getLicenseServerModelInstance,
    getSupportedKeySystemMetadataFromContentProtection,
    getSupportedKeySystemMetadataFromSegmentPssh,
    initDataEquals,
    initialize,
    isClearKey,
    processClearKeyLicenseRequest,
    setConfig,
    setKeySystems,
    setProtectionData
  };
  return instance;
}
ProtectionKeyController.__dashjs_factory_name = 'ProtectionKeyController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_10__["default"].getSingletonFactory(ProtectionKeyController));

/***/ }),

/***/ "./src/streaming/protection/drm/KeySystemClearKey.js":
/*!***********************************************************!*\
  !*** ./src/streaming/protection/drm/KeySystemClearKey.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_KeyPair_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/KeyPair.js */ "./src/streaming/protection/vo/KeyPair.js");
/* harmony import */ var _vo_ClearKeyKeySet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/ClearKeyKeySet.js */ "./src/streaming/protection/vo/ClearKeyKeySet.js");
/* harmony import */ var _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonEncryption.js */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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






const uuid = _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_3__["default"].CLEARKEY_UUID;
const systemString = _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_3__["default"].CLEARKEY_KEYSTEM_STRING;
const schemeIdURI = 'urn:uuid:' + uuid;
function KeySystemClearKey(config) {
  config = config || {};
  let instance;
  const BASE64 = config.BASE64;

  /**
   * Returns desired clearkeys (as specified in the CDM message) from protection data
   *
   * @param {ProtectionData} protectionData the protection data
   * @param {ArrayBuffer} message the ClearKey CDM message
   * @returns {ClearKeyKeySet} the key set or null if none found
   * @throws {Error} if a keyID specified in the CDM message was not found in the
   * protection data
   * @memberof KeySystemClearKey
   */
  function getClearKeysFromProtectionData(protectionData, message) {
    let clearkeySet = null;
    if (protectionData) {
      // ClearKey is the only system that does not require a license server URL, so we
      // handle it here when keys are specified in protection data
      const jsonMsg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(message)));
      const keyPairs = [];
      for (let i = 0; i < jsonMsg.kids.length; i++) {
        const clearkeyID = jsonMsg.kids[i];
        const clearkey = protectionData.clearkeys && protectionData.clearkeys.hasOwnProperty(clearkeyID) ? protectionData.clearkeys[clearkeyID] : null;
        if (!clearkey) {
          throw new Error('DRM: ClearKey keyID (' + clearkeyID + ') is not known!');
        }
        // KeyIDs from CDM are not base64 padded.  Keys may or may not be padded
        keyPairs.push(new _vo_KeyPair_js__WEBPACK_IMPORTED_MODULE_0__["default"](clearkeyID, clearkey));
      }
      clearkeySet = new _vo_ClearKeyKeySet_js__WEBPACK_IMPORTED_MODULE_1__["default"](keyPairs);
    }
    return clearkeySet;
  }
  function getInitData(cp, cencContentProtection) {
    try {
      let initData = _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_2__["default"].parseInitDataFromContentProtection(cp, BASE64);
      if (!initData && cencContentProtection) {
        const cencDefaultKid = cencDefaultKidToBase64Representation(cencContentProtection.cencDefaultKid);
        const data = {
          kids: [cencDefaultKid]
        };
        initData = new TextEncoder().encode(JSON.stringify(data));
      }
      return initData;
    } catch (e) {
      return null;
    }
  }
  function cencDefaultKidToBase64Representation(cencDefaultKid) {
    try {
      let kid = cencDefaultKid.replace(/-/g, '');
      kid = btoa(kid.match(/\w{2}/g).map(a => {
        return String.fromCharCode(parseInt(a, 16));
      }).join(''));
      return kid.replace(/=/g, '').replace(/\//g, '_').replace(/\+/g, '-');
    } catch (e) {
      return null;
    }
  }
  function getRequestHeadersFromMessage(/*message*/
  ) {
    // Set content type to application/json by default
    return {
      'Content-Type': 'application/json'
    };
  }
  function getLicenseRequestFromMessage(message) {
    return JSON.stringify(JSON.parse(String.fromCharCode.apply(null, new Uint8Array(message))));
  }
  function getLicenseServerURLFromInitData(/*initData*/
  ) {
    return null;
  }
  function getCDMData(/*cdmData*/
  ) {
    return null;
  }
  instance = {
    uuid,
    schemeIdURI,
    systemString,
    getInitData,
    getRequestHeadersFromMessage,
    getLicenseRequestFromMessage,
    getLicenseServerURLFromInitData,
    getCDMData,
    getClearKeysFromProtectionData
  };
  return instance;
}
KeySystemClearKey.__dashjs_factory_name = 'KeySystemClearKey';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_4__["default"].getSingletonFactory(KeySystemClearKey));

/***/ }),

/***/ "./src/streaming/protection/drm/KeySystemPlayReady.js":
/*!************************************************************!*\
  !*** ./src/streaming/protection/drm/KeySystemPlayReady.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommonEncryption.js */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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

/**
 * Microsoft PlayReady DRM
 *
 * @class
 * @implements KeySystem
 */



const uuid = _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_1__["default"].PLAYREADY_UUID;
const systemString = _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_1__["default"].PLAYREADY_KEYSTEM_STRING;
const schemeIdURI = 'urn:uuid:' + uuid;
const PRCDMData = '<PlayReadyCDMData type="LicenseAcquisition"><LicenseAcquisition version="1.0" Proactive="false"><CustomData encoding="base64encoded">%CUSTOMDATA%</CustomData></LicenseAcquisition></PlayReadyCDMData>';
function KeySystemPlayReady(config) {
  config = config || {};
  let instance;
  let messageFormat = 'utf-16';
  const BASE64 = config.BASE64;
  const settings = config.settings;
  function checkConfig() {
    if (!BASE64 || !BASE64.hasOwnProperty('decodeArray') || !BASE64.hasOwnProperty('decodeArray')) {
      throw new Error('Missing config parameter(s)');
    }
  }
  function getRequestHeadersFromMessage(message) {
    let msg, xmlDoc;
    const headers = {};
    const parser = new DOMParser();
    if (settings && settings.get().streaming.protection.detectPlayreadyMessageFormat) {
      // If message format configured/defaulted to utf-16 AND number of bytes is odd, assume 'unwrapped' raw CDM message.
      if (messageFormat === 'utf-16' && message && message.byteLength % 2 === 1) {
        headers['Content-Type'] = 'text/xml; charset=utf-8';
        return headers;
      }
    }
    const dataview = messageFormat === 'utf-16' ? new Uint16Array(message) : new Uint8Array(message);
    msg = String.fromCharCode.apply(null, dataview);
    xmlDoc = parser.parseFromString(msg, 'application/xml');
    const headerNameList = xmlDoc.getElementsByTagName('name');
    const headerValueList = xmlDoc.getElementsByTagName('value');
    for (let i = 0; i < headerNameList.length; i++) {
      headers[headerNameList[i].childNodes[0].nodeValue] = headerValueList[i].childNodes[0].nodeValue;
    }
    // Some versions of the PlayReady CDM return 'Content' instead of 'Content-Type'.
    // this is NOT w3c conform and license servers may reject the request!
    // -> rename it to proper w3c definition!
    if (headers.hasOwnProperty('Content')) {
      headers['Content-Type'] = headers.Content;
      delete headers.Content;
    }
    // Set Content-Type header by default if not provided in the the CDM message (<PlayReadyKeyMessage/>)
    // or if the message contains directly the challenge itself (Ex: LG SmartTVs)
    if (!headers.hasOwnProperty('Content-Type')) {
      headers['Content-Type'] = 'text/xml; charset=utf-8';
    }
    return headers;
  }
  function getLicenseRequestFromMessage(message) {
    let licenseRequest = null;
    const parser = new DOMParser();
    if (settings && settings.get().streaming.protection.detectPlayreadyMessageFormat) {
      // If message format configured/defaulted to utf-16 AND number of bytes is odd, assume 'unwrapped' raw CDM message.
      if (messageFormat === 'utf-16' && message && message.byteLength % 2 === 1) {
        return message;
      }
    }
    const dataview = messageFormat === 'utf-16' ? new Uint16Array(message) : new Uint8Array(message);
    checkConfig();
    const msg = String.fromCharCode.apply(null, dataview);
    const xmlDoc = parser.parseFromString(msg, 'application/xml');
    if (xmlDoc.getElementsByTagName('PlayReadyKeyMessage')[0]) {
      const Challenge = xmlDoc.getElementsByTagName('Challenge')[0].childNodes[0].nodeValue;
      if (Challenge) {
        licenseRequest = BASE64.decode(Challenge);
      }
    } else {
      // The message from CDM is not a wrapped message as on IE11 and Edge,
      // thus it contains direclty the challenge itself
      // (note that the xmlDoc at this point may be unreadable since it may have been interpreted as UTF-16)
      return message;
    }
    return licenseRequest;
  }
  function getLicenseServerURLFromInitData(initData) {
    if (initData) {
      const data = new DataView(initData);
      const numRecords = data.getUint16(4, true);
      let offset = 6;
      const parser = new DOMParser();
      for (let i = 0; i < numRecords; i++) {
        // Parse the PlayReady Record header
        const recordType = data.getUint16(offset, true);
        offset += 2;
        const recordLength = data.getUint16(offset, true);
        offset += 2;
        if (recordType !== 0x0001) {
          offset += recordLength;
          continue;
        }
        const recordData = initData.slice(offset, offset + recordLength);
        const record = String.fromCharCode.apply(null, new Uint16Array(recordData));
        const xmlDoc = parser.parseFromString(record, 'application/xml');

        // First try <LA_URL>
        if (xmlDoc.getElementsByTagName('LA_URL')[0]) {
          const laurl = xmlDoc.getElementsByTagName('LA_URL')[0].childNodes[0].nodeValue;
          if (laurl) {
            return laurl;
          }
        }

        // Optionally, try <LUI_URL>
        if (xmlDoc.getElementsByTagName('LUI_URL')[0]) {
          const luiurl = xmlDoc.getElementsByTagName('LUI_URL')[0].childNodes[0].nodeValue;
          if (luiurl) {
            return luiurl;
          }
        }
      }
    }
    return null;
  }
  function getInitData(cpData) {
    // * desc@ getInitData
    // *   generate PSSH data from PROHeader defined in MPD file
    // *   PSSH format:
    // *   size (4)
    // *   box type(PSSH) (8)
    // *   Protection SystemID (16)
    // *   protection system data size (4) - length of decoded PROHeader
    // *   decoded PROHeader data from MPD file
    const PSSHBoxType = new Uint8Array([0x70, 0x73, 0x73, 0x68, 0x00, 0x00, 0x00, 0x00]); //'PSSH' 8 bytes
    const playreadySystemID = new Uint8Array([0x9a, 0x04, 0xf0, 0x79, 0x98, 0x40, 0x42, 0x86, 0xab, 0x92, 0xe6, 0x5b, 0xe0, 0x88, 0x5f, 0x95]);
    let byteCursor = 0;
    let uint8arraydecodedPROHeader = null;
    let PROSize, PSSHSize, PSSHBoxBuffer, PSSHBox, PSSHData;
    checkConfig();
    if (!cpData) {
      return null;
    }
    // Handle common encryption PSSH
    if ('pssh' in cpData && cpData.pssh) {
      return _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseInitDataFromContentProtection(cpData, BASE64);
    }
    // Handle native MS PlayReady ContentProtection elements
    if ('pro' in cpData && cpData.pro) {
      uint8arraydecodedPROHeader = BASE64.decodeArray(cpData.pro.__text);
    } else if ('prheader' in cpData && cpData.prheader) {
      uint8arraydecodedPROHeader = BASE64.decodeArray(cpData.prheader.__text);
    } else {
      return null;
    }
    PROSize = uint8arraydecodedPROHeader.length;
    PSSHSize = 0x4 + PSSHBoxType.length + playreadySystemID.length + 0x4 + PROSize;
    PSSHBoxBuffer = new ArrayBuffer(PSSHSize);
    PSSHBox = new Uint8Array(PSSHBoxBuffer);
    PSSHData = new DataView(PSSHBoxBuffer);
    PSSHData.setUint32(byteCursor, PSSHSize);
    byteCursor += 0x4;
    PSSHBox.set(PSSHBoxType, byteCursor);
    byteCursor += PSSHBoxType.length;
    PSSHBox.set(playreadySystemID, byteCursor);
    byteCursor += playreadySystemID.length;
    PSSHData.setUint32(byteCursor, PROSize);
    byteCursor += 0x4;
    PSSHBox.set(uint8arraydecodedPROHeader, byteCursor);
    byteCursor += PROSize;
    return PSSHBox.buffer;
  }

  /**
   * It seems that some PlayReady implementations return their XML-based CDM
   * messages using UTF16, while others return them as UTF8.  Use this function
   * to modify the message format to expect when parsing CDM messages.
   *
   * @param {string} format the expected message format.  Either "utf-8" or "utf-16".
   * @throws {Error} Specified message format is not one of "utf8" or "utf16"
   */
  function setPlayReadyMessageFormat(format) {
    if (format !== 'utf-8' && format !== 'utf-16') {
      throw new Error('Specified message format is not one of "utf-8" or "utf-16"');
    }
    messageFormat = format;
  }

  /**
   * Get Playready Custom data
   */
  function getCDMData(_cdmData) {
    let customData, cdmData, cdmDataBytes, i;
    checkConfig();
    if (!_cdmData) {
      return null;
    }

    // Convert custom data into multibyte string
    customData = [];
    for (i = 0; i < _cdmData.length; ++i) {
      customData.push(_cdmData.charCodeAt(i));
      customData.push(0);
    }
    customData = String.fromCharCode.apply(null, customData);

    // Encode in Base 64 the custom data string
    customData = BASE64.encode(customData);

    // Initialize CDM data with Base 64 encoded custom data
    // (see https://msdn.microsoft.com/en-us/library/dn457361.aspx)
    cdmData = PRCDMData.replace('%CUSTOMDATA%', customData);

    // Convert CDM data into multibyte characters
    cdmDataBytes = [];
    for (i = 0; i < cdmData.length; ++i) {
      cdmDataBytes.push(cdmData.charCodeAt(i));
      cdmDataBytes.push(0);
    }
    return new Uint8Array(cdmDataBytes).buffer;
  }
  instance = {
    uuid,
    schemeIdURI,
    systemString,
    getInitData,
    getRequestHeadersFromMessage,
    getLicenseRequestFromMessage,
    getLicenseServerURLFromInitData,
    getCDMData,
    setPlayReadyMessageFormat
  };
  return instance;
}
KeySystemPlayReady.__dashjs_factory_name = 'KeySystemPlayReady';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSingletonFactory(KeySystemPlayReady));

/***/ }),

/***/ "./src/streaming/protection/drm/KeySystemW3CClearKey.js":
/*!**************************************************************!*\
  !*** ./src/streaming/protection/drm/KeySystemW3CClearKey.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_KeyPair_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/KeyPair.js */ "./src/streaming/protection/vo/KeyPair.js");
/* harmony import */ var _vo_ClearKeyKeySet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/ClearKeyKeySet.js */ "./src/streaming/protection/vo/ClearKeyKeySet.js");
/* harmony import */ var _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonEncryption.js */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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






const uuid = _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_3__["default"].W3C_CLEARKEY_UUID;
const systemString = _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_3__["default"].CLEARKEY_KEYSTEM_STRING;
const schemeIdURI = 'urn:uuid:' + uuid;
function KeySystemW3CClearKey(config) {
  let instance;
  const BASE64 = config.BASE64;
  const logger = config.debug.getLogger(instance);
  /**
   * Returns desired clearkeys (as specified in the CDM message) from protection data
   *
   * @param {ProtectionDataSet} protectionData the protection data
   * @param {ArrayBuffer} message the ClearKey CDM message
   * @returns {ClearKeyKeySet} the key set or null if none found
   * @throws {Error} if a keyID specified in the CDM message was not found in the
   * protection data
   * @memberof KeySystemClearKey
   */
  function getClearKeysFromProtectionData(protectionData, message) {
    let clearkeySet = null;
    if (protectionData) {
      // ClearKey is the only system that does not require a license server URL, so we
      // handle it here when keys are specified in protection data
      const jsonMsg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(message)));
      const keyPairs = [];
      for (let i = 0; i < jsonMsg.kids.length; i++) {
        const clearkeyID = jsonMsg.kids[i];
        const clearkey = protectionData.clearkeys && protectionData.clearkeys.hasOwnProperty(clearkeyID) ? protectionData.clearkeys[clearkeyID] : null;
        if (!clearkey) {
          throw new Error('DRM: ClearKey keyID (' + clearkeyID + ') is not known!');
        }
        // KeyIDs from CDM are not base64 padded.  Keys may or may not be padded
        keyPairs.push(new _vo_KeyPair_js__WEBPACK_IMPORTED_MODULE_0__["default"](clearkeyID, clearkey));
      }
      clearkeySet = new _vo_ClearKeyKeySet_js__WEBPACK_IMPORTED_MODULE_1__["default"](keyPairs);
      logger.warn('ClearKey schemeIdURI is using W3C Common PSSH systemID (1077efec-c0b2-4d02-ace3-3c1e52e2fb4b) in Content Protection. See DASH-IF IOP v4.1 section 7.6.2.4');
    }
    return clearkeySet;
  }
  function getInitData(cp) {
    return _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_2__["default"].parseInitDataFromContentProtection(cp, BASE64);
  }
  function getRequestHeadersFromMessage(/*message*/
  ) {
    return null;
  }
  function getLicenseRequestFromMessage(message) {
    return new Uint8Array(message);
  }
  function getLicenseServerURLFromInitData(/*initData*/
  ) {
    return null;
  }
  function getCDMData(/*cdmData*/
  ) {
    return null;
  }
  instance = {
    uuid: uuid,
    schemeIdURI: schemeIdURI,
    systemString: systemString,
    getInitData: getInitData,
    getRequestHeadersFromMessage: getRequestHeadersFromMessage,
    getLicenseRequestFromMessage: getLicenseRequestFromMessage,
    getLicenseServerURLFromInitData: getLicenseServerURLFromInitData,
    getCDMData: getCDMData,
    getClearKeysFromProtectionData: getClearKeysFromProtectionData
  };
  return instance;
}
KeySystemW3CClearKey.__dashjs_factory_name = 'KeySystemW3CClearKey';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_4__["default"].getSingletonFactory(KeySystemW3CClearKey));

/***/ }),

/***/ "./src/streaming/protection/drm/KeySystemWidevine.js":
/*!***********************************************************!*\
  !*** ./src/streaming/protection/drm/KeySystemWidevine.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommonEncryption.js */ "./src/streaming/protection/CommonEncryption.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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

/**
 * Google Widevine DRM
 *
 * @class
 * @implements MediaPlayer.dependencies.protection.KeySystem
 */




const uuid = _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_1__["default"].WIDEVINE_UUID;
const systemString = _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_1__["default"].WIDEVINE_KEYSTEM_STRING;
const schemeIdURI = 'urn:uuid:' + uuid;
function KeySystemWidevine(config) {
  config = config || {};
  let instance;
  const BASE64 = config.BASE64;
  function getInitData(cp) {
    return _CommonEncryption_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseInitDataFromContentProtection(cp, BASE64);
  }
  function getRequestHeadersFromMessage(/*message*/
  ) {
    return null;
  }
  function getLicenseRequestFromMessage(message) {
    return new Uint8Array(message);
  }
  function getLicenseServerURLFromInitData(/*initData*/
  ) {
    return null;
  }
  function getCDMData(/*cdmData*/
  ) {
    return null;
  }
  instance = {
    uuid,
    schemeIdURI,
    systemString,
    getInitData,
    getRequestHeadersFromMessage,
    getLicenseRequestFromMessage,
    getLicenseServerURLFromInitData,
    getCDMData
  };
  return instance;
}
KeySystemWidevine.__dashjs_factory_name = 'KeySystemWidevine';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSingletonFactory(KeySystemWidevine));

/***/ }),

/***/ "./src/streaming/protection/errors/ProtectionErrors.js":
/*!*************************************************************!*\
  !*** ./src/streaming/protection/errors/ProtectionErrors.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_errors_ErrorsBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/errors/ErrorsBase.js */ "./src/core/errors/ErrorsBase.js");
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
 */
class ProtectionErrors extends _core_errors_ErrorsBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();

    /**
     *  Generid key Error code
     */
    this.MEDIA_KEYERR_CODE = 100;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */
    this.MEDIA_KEYERR_UNKNOWN_CODE = 101;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */
    this.MEDIA_KEYERR_CLIENT_CODE = 102;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */
    this.MEDIA_KEYERR_SERVICE_CODE = 103;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */
    this.MEDIA_KEYERR_OUTPUT_CODE = 104;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */
    this.MEDIA_KEYERR_HARDWARECHANGE_CODE = 105;
    /**
     *  Error code returned by keyerror api for ProtectionModel_01b
     */
    this.MEDIA_KEYERR_DOMAIN_CODE = 106;

    /**
     *  Error code returned when an error occured in keymessage event for ProtectionModel_01b
     */
    this.MEDIA_KEY_MESSAGE_ERROR_CODE = 107;
    /**
     *  Error code returned when challenge is invalid in keymessage event (event triggered by CDM)
     */
    this.MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_CODE = 108;
    /**
     *  Error code returned when License server certificate has not been successfully updated
     */
    this.SERVER_CERTIFICATE_UPDATED_ERROR_CODE = 109;
    /**
     *  Error code returned when license validity has expired
     */
    this.KEY_STATUS_CHANGED_EXPIRED_ERROR_CODE = 110;
    /**
     *  Error code returned when no licenser url is defined
     */
    this.MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_CODE = 111;
    /**
     *  Error code returned when key system access is denied
     */
    this.KEY_SYSTEM_ACCESS_DENIED_ERROR_CODE = 112;
    /**
     *  Error code returned when key session has not been successfully created
     */
    this.KEY_SESSION_CREATED_ERROR_CODE = 113;
    /**
     *  Error code returned when license request failed after a keymessage event has been triggered
     */
    this.MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE = 114;
    this.MEDIA_KEYERR_UNKNOWN_MESSAGE = 'An unspecified error occurred. This value is used for errors that don\'t match any of the other codes.';
    this.MEDIA_KEYERR_CLIENT_MESSAGE = 'The Key System could not be installed or updated.';
    this.MEDIA_KEYERR_SERVICE_MESSAGE = 'The message passed into update indicated an error from the license service.';
    this.MEDIA_KEYERR_OUTPUT_MESSAGE = 'There is no available output device with the required characteristics for the content protection system.';
    this.MEDIA_KEYERR_HARDWARECHANGE_MESSAGE = 'A hardware configuration change caused a content protection error.';
    this.MEDIA_KEYERR_DOMAIN_MESSAGE = 'An error occurred in a multi-device domain licensing configuration. The most common error is a failure to join the domain.';
    this.MEDIA_KEY_MESSAGE_ERROR_MESSAGE = 'Multiple key sessions were creates with a user-agent that does not support sessionIDs!! Unpredictable behavior ahead!';
    this.MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_MESSAGE = 'DRM: Empty key message from CDM';
    this.SERVER_CERTIFICATE_UPDATED_ERROR_MESSAGE = 'Error updating server certificate -- ';
    this.KEY_STATUS_CHANGED_EXPIRED_ERROR_MESSAGE = 'DRM: KeyStatusChange error! -- License has expired';
    this.MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_MESSAGE = 'DRM: No license server URL specified!';
    this.KEY_SYSTEM_ACCESS_DENIED_ERROR_MESSAGE = 'DRM: KeySystem Access Denied! -- ';
    this.KEY_SESSION_CREATED_ERROR_MESSAGE = 'DRM: unable to create session! --';
    this.MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE = 'DRM: licenser error! --';
  }
}
let protectionErrors = new ProtectionErrors();
/* harmony default export */ __webpack_exports__["default"] = (protectionErrors);

/***/ }),

/***/ "./src/streaming/protection/models/DefaultProtectionModel.js":
/*!*******************************************************************!*\
  !*** ./src/streaming/protection/models/DefaultProtectionModel.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_ProtectionKeyController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/ProtectionKeyController.js */ "./src/streaming/protection/controllers/ProtectionKeyController.js");
/* harmony import */ var _vo_NeedKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/NeedKey.js */ "./src/streaming/protection/vo/NeedKey.js");
/* harmony import */ var _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors/ProtectionErrors.js */ "./src/streaming/protection/errors/ProtectionErrors.js");
/* harmony import */ var _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../vo/DashJSError.js */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _vo_KeyMessage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vo/KeyMessage.js */ "./src/streaming/protection/vo/KeyMessage.js");
/* harmony import */ var _vo_KeySystemAccess_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vo/KeySystemAccess.js */ "./src/streaming/protection/vo/KeySystemAccess.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
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
 * Most recent EME implementation
 *
 * Implemented by Google Chrome v36+ (Windows, OSX, Linux)
 *
 * @implements ProtectionModel
 * @class
 */








const SYSTEM_STRING_PRIORITY = {};
SYSTEM_STRING_PRIORITY[_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].PLAYREADY_KEYSTEM_STRING] = [_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].PLAYREADY_KEYSTEM_STRING, _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].PLAYREADY_RECOMMENDATION_KEYSTEM_STRING];
SYSTEM_STRING_PRIORITY[_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].WIDEVINE_KEYSTEM_STRING] = [_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].WIDEVINE_KEYSTEM_STRING];
SYSTEM_STRING_PRIORITY[_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].CLEARKEY_KEYSTEM_STRING] = [_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].CLEARKEY_KEYSTEM_STRING];
function DefaultProtectionModel(config) {
  config = config || {};
  const context = this.context;
  const eventBus = config.eventBus; //Need to pass in here so we can use same instance since this is optional module
  const events = config.events;
  const debug = config.debug;
  let instance, logger, keySystem, videoElement, mediaKeys, sessionTokens, eventHandler, protectionKeyController;
  function setup() {
    logger = debug.getLogger(instance);
    keySystem = null;
    videoElement = null;
    mediaKeys = null;
    sessionTokens = [];
    protectionKeyController = (0,_controllers_ProtectionKeyController_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
    eventHandler = createEventHandler();
  }
  function reset() {
    const numSessions = sessionTokens.length;
    let session;
    if (numSessions !== 0) {
      // Called when we are done closing a session.  Success or fail
      const done = function (session) {
        removeSession(session);
        if (sessionTokens.length === 0) {
          if (videoElement) {
            videoElement.removeEventListener('encrypted', eventHandler);
            videoElement.setMediaKeys(null).then(function () {
              eventBus.trigger(events.TEARDOWN_COMPLETE);
            });
          } else {
            eventBus.trigger(events.TEARDOWN_COMPLETE);
          }
        }
      };
      for (let i = 0; i < numSessions; i++) {
        session = sessionTokens[i];
        (function (s) {
          _closeKeySessionInternal(session);
          done(s);
        })(session);
      }
    } else {
      eventBus.trigger(events.TEARDOWN_COMPLETE);
    }
  }
  function stop() {
    // Close and remove not usable sessions
    let session;
    for (let i = 0; i < sessionTokens.length; i++) {
      session = sessionTokens[i];
      if (!session.getUsable()) {
        _closeKeySessionInternal(session);
        removeSession(session);
      }
    }
  }
  function getAllInitData() {
    const retVal = [];
    for (let i = 0; i < sessionTokens.length; i++) {
      if (sessionTokens[i].initData) {
        retVal.push(sessionTokens[i].initData);
      }
    }
    return retVal;
  }
  function getSessionTokens() {
    return sessionTokens;
  }
  function requestKeySystemAccess(keySystemConfigurationsToRequest) {
    return new Promise((resolve, reject) => {
      _requestKeySystemAccessInternal(keySystemConfigurationsToRequest, 0, resolve, reject);
    });
  }

  /**
   * Initializes access to a key system. Once we found a valid configuration we get a mediaKeySystemAccess object
   * @param keySystemConfigurationsToRequest
   * @param idx
   * @param resolve
   * @param reject
   * @private
   */
  function _requestKeySystemAccessInternal(keySystemConfigurationsToRequest, idx, resolve, reject) {
    // In case requestMediaKeySystemAccess is not available we can not proceed and dispatch an error
    if (navigator.requestMediaKeySystemAccess === undefined || typeof navigator.requestMediaKeySystemAccess !== 'function') {
      const msg = 'Insecure origins are not allowed';
      eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
        error: msg
      });
      reject({
        error: msg
      });
      return;
    }

    // If a systemStringPriority is defined by the application we use these values. Otherwise, we use the default system string
    // This is useful for DRM systems such as Playready for which multiple system strings are possible for instance com.microsoft.playready and com.microsoft.playready.recommendation
    const protDataSystemStringPriority = keySystemConfigurationsToRequest[idx].protData && keySystemConfigurationsToRequest[idx].protData.systemStringPriority ? keySystemConfigurationsToRequest[idx].protData.systemStringPriority : null;
    const configs = keySystemConfigurationsToRequest[idx].configs;
    const currentKeySystem = keySystemConfigurationsToRequest[idx].ks;
    let systemString = currentKeySystem.systemString;

    // Use the default values in case no values are provided by the application
    const systemStringsToApply = protDataSystemStringPriority ? protDataSystemStringPriority : SYSTEM_STRING_PRIORITY[systemString] ? SYSTEM_STRING_PRIORITY[systemString] : [systemString];

    // Check all the available system strings and the available configurations for support
    _checkAccessForKeySystem(systemStringsToApply, configs).then(data => {
      const configuration = data && data.nativeMediaKeySystemAccessObject && typeof data.nativeMediaKeySystemAccessObject.getConfiguration === 'function' ? data.nativeMediaKeySystemAccessObject.getConfiguration() : null;
      const keySystemAccess = new _vo_KeySystemAccess_js__WEBPACK_IMPORTED_MODULE_5__["default"](currentKeySystem, configuration);
      keySystemAccess.selectedSystemString = data.selectedSystemString;
      keySystemAccess.nativeMediaKeySystemAccessObject = data.nativeMediaKeySystemAccessObject;
      eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
        data: keySystemAccess
      });
      resolve({
        data: keySystemAccess
      });
    }).catch(e => {
      if (idx + 1 < keySystemConfigurationsToRequest.length) {
        _requestKeySystemAccessInternal(keySystemConfigurationsToRequest, idx + 1, resolve, reject);
      } else {
        const errorMessage = 'Key system access denied! ';
        eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
          error: errorMessage + e.message
        });
        reject({
          error: errorMessage + e.message
        });
      }
    });
  }

  /**
   * For a specific key system: Iterate over the possible system strings and resolve once a valid configuration was found
   * @param {array} systemStringsToApply
   * @param {object} configs
   * @return {Promise}
   * @private
   */
  function _checkAccessForKeySystem(systemStringsToApply, configs) {
    return new Promise((resolve, reject) => {
      _checkAccessForSystemStrings(systemStringsToApply, configs, 0, resolve, reject);
    });
  }

  /**
   * Recursively iterate over the possible system strings until a supported configuration is found or we ran out of options
   * @param {array} systemStringsToApply
   * @param {object} configs
   * @param {number} idx
   * @param {function} resolve
   * @param {function} reject
   * @private
   */
  function _checkAccessForSystemStrings(systemStringsToApply, configs, idx, resolve, reject) {
    const systemString = systemStringsToApply[idx];
    logger.debug(`Requesting key system access for system string ${systemString}`);
    navigator.requestMediaKeySystemAccess(systemString, configs).then(mediaKeySystemAccess => {
      resolve({
        nativeMediaKeySystemAccessObject: mediaKeySystemAccess,
        selectedSystemString: systemString
      });
    }).catch(e => {
      if (idx + 1 < systemStringsToApply.length) {
        _checkAccessForSystemStrings(systemStringsToApply, configs, idx + 1, resolve, reject);
      } else {
        reject(e);
      }
    });
  }

  /**
   * Selects a key system by creating the mediaKeys and adding them to the video element
   * @param keySystemAccess
   * @return {Promise<unknown>}
   */
  function selectKeySystem(keySystemAccess) {
    return new Promise((resolve, reject) => {
      keySystemAccess.nativeMediaKeySystemAccessObject.createMediaKeys().then(mkeys => {
        keySystem = keySystemAccess.keySystem;
        mediaKeys = mkeys;
        if (videoElement) {
          return videoElement.setMediaKeys(mediaKeys);
        } else {
          return Promise.resolve();
        }
      }).then(() => {
        resolve(keySystem);
      }).catch(function () {
        reject({
          error: 'Error selecting keys system (' + keySystemAccess.keySystem.systemString + ')! Could not create MediaKeys -- TODO'
        });
      });
    });
  }
  function setMediaElement(mediaElement) {
    if (videoElement === mediaElement) {
      return;
    }

    // Replacing the previous element
    if (videoElement) {
      videoElement.removeEventListener('encrypted', eventHandler);
      if (videoElement.setMediaKeys) {
        videoElement.setMediaKeys(null);
      }
    }
    videoElement = mediaElement;

    // Only if we are not detaching from the existing element
    if (videoElement) {
      videoElement.addEventListener('encrypted', eventHandler);
      if (videoElement.setMediaKeys && mediaKeys) {
        videoElement.setMediaKeys(mediaKeys);
      }
    }
  }
  function setServerCertificate(serverCertificate) {
    return new Promise((resolve, reject) => {
      mediaKeys.setServerCertificate(serverCertificate).then(function () {
        logger.info('DRM: License server certificate successfully updated.');
        eventBus.trigger(events.SERVER_CERTIFICATE_UPDATED);
        resolve();
      }).catch(error => {
        reject(error);
        eventBus.trigger(events.SERVER_CERTIFICATE_UPDATED, {
          error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__["default"].SERVER_CERTIFICATE_UPDATED_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__["default"].SERVER_CERTIFICATE_UPDATED_ERROR_MESSAGE + error.name)
        });
      });
    });
  }

  /**
   * Create a key session, a session token and initialize a request by calling generateRequest
   * @param keySystemMetadata
   */
  function createKeySession(keySystemMetadata) {
    if (!keySystem || !mediaKeys) {
      throw new Error('Can not create sessions until you have selected a key system');
    }
    const mediaKeySession = mediaKeys.createSession(keySystemMetadata.sessionType);
    const sessionToken = _createSessionToken(mediaKeySession, keySystemMetadata);

    // The "keyids" type is used for Clearkey when keys are provided directly in the protection data and a request to a license server is not needed
    const dataType = keySystem.systemString === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].CLEARKEY_KEYSTEM_STRING && (keySystemMetadata.initData || keySystemMetadata.protData && keySystemMetadata.protData.clearkeys) ? _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].INITIALIZATION_DATA_TYPE_KEYIDS : _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].INITIALIZATION_DATA_TYPE_CENC;
    mediaKeySession.generateRequest(dataType, keySystemMetadata.initData).then(function () {
      logger.debug('DRM: Session created.  SessionID = ' + sessionToken.getSessionId());
      eventBus.trigger(events.KEY_SESSION_CREATED, {
        data: sessionToken
      });
    }).catch(function (error) {
      removeSession(sessionToken);
      eventBus.trigger(events.KEY_SESSION_CREATED, {
        data: null,
        error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + 'Error generating key request -- ' + error.name)
      });
    });
  }
  function updateKeySession(sessionToken, message) {
    const session = sessionToken.session;

    // Send our request to the key session
    if (protectionKeyController.isClearKey(keySystem)) {
      message = message.toJWK();
    }
    session.update(message).then(() => {
      eventBus.trigger(events.KEY_SESSION_UPDATED);
    }).catch(function (error) {
      eventBus.trigger(events.KEY_ERROR, {
        error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__["default"].MEDIA_KEYERR_CODE, 'Error sending update() message! ' + error.name, sessionToken)
      });
    });
  }
  function loadKeySession(keySystemMetadata) {
    if (!keySystem || !mediaKeys) {
      throw new Error('Can not load sessions until you have selected a key system');
    }
    const sessionId = keySystemMetadata.sessionId;

    // Check if session Id is not already loaded or loading
    for (let i = 0; i < sessionTokens.length; i++) {
      if (sessionId === sessionTokens[i].sessionId) {
        logger.warn('DRM: Ignoring session ID because we have already seen it!');
        return;
      }
    }
    const session = mediaKeys.createSession(keySystemMetadata.sessionType);
    const sessionToken = _createSessionToken(session, keySystemMetadata);
    sessionToken.hasTriggeredKeyStatusMapUpdate = true;

    // Load persisted session data into our newly created session object
    session.load(sessionId).then(function (success) {
      if (success) {
        logger.debug('DRM: Session loaded.  SessionID = ' + sessionToken.getSessionId());
        eventBus.trigger(events.KEY_SESSION_CREATED, {
          data: sessionToken
        });
      } else {
        removeSession(sessionToken);
        eventBus.trigger(events.KEY_SESSION_CREATED, {
          data: null,
          error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + 'Could not load session! Invalid Session ID (' + sessionId + ')')
        });
      }
    }).catch(function (error) {
      removeSession(sessionToken);
      eventBus.trigger(events.KEY_SESSION_CREATED, {
        data: null,
        error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_3__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_2__["default"].KEY_SESSION_CREATED_ERROR_MESSAGE + 'Could not load session (' + sessionId + ')! ' + error.name)
      });
    });
  }
  function removeKeySession(sessionToken) {
    const session = sessionToken.session;
    session.remove().then(function () {
      logger.debug('DRM: Session removed.  SessionID = ' + sessionToken.getSessionId());
      eventBus.trigger(events.KEY_SESSION_REMOVED, {
        data: sessionToken.getSessionId()
      });
    }, function (error) {
      eventBus.trigger(events.KEY_SESSION_REMOVED, {
        data: null,
        error: 'Error removing session (' + sessionToken.getSessionId() + '). ' + error.name
      });
    });
  }
  function closeKeySession(sessionToken) {
    // Send our request to the key session
    _closeKeySessionInternal(sessionToken).catch(function (error) {
      removeSession(sessionToken);
      eventBus.trigger(events.KEY_SESSION_CLOSED, {
        data: null,
        error: 'Error closing session (' + sessionToken.getSessionId() + ') ' + error.name
      });
    });
  }
  function _closeKeySessionInternal(sessionToken) {
    if (!sessionToken || !sessionToken.session) {
      return Promise.resolve;
    }
    const session = sessionToken.session;

    // Remove event listeners
    session.removeEventListener('keystatuseschange', sessionToken);
    session.removeEventListener('message', sessionToken);

    // Send our request to the key session
    return session.close();
  }

  // This is our main event handler for all desired HTMLMediaElement events
  // related to EME.  These events are translated into our API-independent
  // versions of the same events
  function createEventHandler() {
    return {
      handleEvent: function (event) {
        switch (event.type) {
          case 'encrypted':
            if (event.initData) {
              let initData = ArrayBuffer.isView(event.initData) ? event.initData.buffer : event.initData;
              eventBus.trigger(events.NEED_KEY, {
                key: new _vo_NeedKey_js__WEBPACK_IMPORTED_MODULE_1__["default"](initData, event.initDataType)
              });
            }
            break;
        }
      }
    };
  }
  function removeSession(token) {
    // Remove from our session list
    for (let i = 0; i < sessionTokens.length; i++) {
      if (sessionTokens[i] === token) {
        sessionTokens.splice(i, 1);
        break;
      }
    }
  }

  // Function to create our session token objects which manage the EME
  // MediaKeySession and session-specific event handler
  function _createSessionToken(session, keySystemMetadata) {
    const token = {
      // Implements SessionToken
      session: session,
      keyId: keySystemMetadata.keyId,
      normalizedKeyId: keySystemMetadata && keySystemMetadata.keyId && typeof keySystemMetadata.keyId === 'string' ? keySystemMetadata.keyId.replace(/-/g, '').toLowerCase() : '',
      initData: keySystemMetadata.initData,
      sessionId: keySystemMetadata.sessionId,
      sessionType: keySystemMetadata.sessionType,
      hasTriggeredKeyStatusMapUpdate: false,
      // This is our main event handler for all desired MediaKeySession events
      // These events are translated into our API-independent versions of the
      // same events
      handleEvent: function (event) {
        switch (event.type) {
          case 'keystatuseschange':
            this._onKeyStatusesChange(event);
            break;
          case 'message':
            this._onKeyMessage(event);
            break;
        }
      },
      _onKeyStatusesChange: function (event) {
        eventBus.trigger(events.KEY_STATUSES_CHANGED, {
          data: this
        });
        const keyStatuses = [];
        event.target.keyStatuses.forEach(function () {
          keyStatuses.push(_parseKeyStatus(arguments));
        });
        eventBus.trigger(events.INTERNAL_KEY_STATUSES_CHANGED, {
          parsedKeyStatuses: keyStatuses,
          sessionToken: token
        });
      },
      _onKeyMessage: function (event) {
        let message = ArrayBuffer.isView(event.message) ? event.message.buffer : event.message;
        eventBus.trigger(events.INTERNAL_KEY_MESSAGE, {
          data: new _vo_KeyMessage_js__WEBPACK_IMPORTED_MODULE_4__["default"](this, message, undefined, event.messageType)
        });
      },
      getKeyId: function () {
        return this.keyId;
      },
      getSessionId: function () {
        return session.sessionId;
      },
      getSessionType: function () {
        return this.sessionType;
      },
      getExpirationTime: function () {
        return session.expiration;
      },
      getKeyStatuses: function () {
        return session.keyStatuses;
      },
      getUsable: function () {
        let usable = false;
        session.keyStatuses.forEach(function () {
          let keyStatus = _parseKeyStatus(arguments);
          if (keyStatus.status === _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEY_STATUSES.USABLE) {
            usable = true;
          }
        });
        return usable;
      }
    };

    // Add all event listeners
    session.addEventListener('keystatuseschange', token);
    session.addEventListener('message', token);

    // Register callback for session closed Promise
    session.closed.then(() => {
      removeSession(token);
      logger.debug('DRM: Session closed.  SessionID = ' + token.getSessionId());
      eventBus.trigger(events.KEY_SESSION_CLOSED, {
        data: token.getSessionId()
      });
    });

    // Add to our session list
    sessionTokens.push(token);
    return token;
  }
  function _parseKeyStatus(args) {
    // Edge and Chrome implement different version of keystatuses, param are not on same order
    let status, keyId;
    if (args && args.length > 0) {
      if (args[0]) {
        if (typeof args[0] === 'string') {
          status = args[0];
        } else {
          keyId = args[0];
        }
      }
      if (args[1]) {
        if (typeof args[1] === 'string') {
          status = args[1];
        } else {
          keyId = args[1];
        }
      }
    }
    return {
      status: status,
      keyId: keyId
    };
  }
  instance = {
    closeKeySession,
    createKeySession,
    getAllInitData,
    getSessionTokens,
    loadKeySession,
    removeKeySession,
    requestKeySystemAccess,
    reset,
    selectKeySystem,
    setMediaElement,
    setServerCertificate,
    stop,
    updateKeySession
  };
  setup();
  return instance;
}
DefaultProtectionModel.__dashjs_factory_name = 'DefaultProtectionModel';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_7__["default"].getClassFactory(DefaultProtectionModel));

/***/ }),

/***/ "./src/streaming/protection/models/ProtectionModel_01b.js":
/*!****************************************************************!*\
  !*** ./src/streaming/protection/models/ProtectionModel_01b.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_ProtectionKeyController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/ProtectionKeyController.js */ "./src/streaming/protection/controllers/ProtectionKeyController.js");
/* harmony import */ var _vo_NeedKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/NeedKey.js */ "./src/streaming/protection/vo/NeedKey.js");
/* harmony import */ var _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../vo/DashJSError.js */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _vo_KeyMessage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vo/KeyMessage.js */ "./src/streaming/protection/vo/KeyMessage.js");
/* harmony import */ var _vo_KeySystemConfiguration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vo/KeySystemConfiguration.js */ "./src/streaming/protection/vo/KeySystemConfiguration.js");
/* harmony import */ var _vo_KeySystemAccess_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vo/KeySystemAccess.js */ "./src/streaming/protection/vo/KeySystemAccess.js");
/* harmony import */ var _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../errors/ProtectionErrors.js */ "./src/streaming/protection/errors/ProtectionErrors.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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
 * Initial implementation of EME
 *
 * Implemented by Google Chrome prior to v36
 *
 * @implements ProtectionModel
 * @class
 */









function ProtectionModel_01b(config) {
  config = config || {};
  const context = this.context;
  const eventBus = config.eventBus; //Need to pass in here so we can use same instance since this is optional module
  const events = config.events;
  const debug = config.debug;
  const api = config.api;
  const errHandler = config.errHandler;
  let instance, logger, videoElement, keySystem, protectionKeyController,
    // With this version of the EME APIs, sessionIds are not assigned to
    // sessions until the first key message is received.  We are assuming
    // that in the case of multiple sessions, key messages will be received
    // in the order that generateKeyRequest() is called.
    // Holding spot for newly-created sessions until we determine whether or
    // not the CDM supports sessionIds
    pendingSessions,
    // List of sessions that have been initialized.  Only the first position will
    // be used in the case that the CDM does not support sessionIds
    sessionTokens,
    // Not all CDMs support the notion of sessionIds.  Without sessionIds
    // there is no way for us to differentiate between sessions, therefore
    // we must only allow a single session.  Once we receive the first key
    // message we can set this flag to determine if more sessions are allowed
    moreSessionsAllowed,
    // This is our main event handler for all desired HTMLMediaElement events
    // related to EME.  These events are translated into our API-independent
    // versions of the same events
    eventHandler;
  function setup() {
    logger = debug.getLogger(instance);
    videoElement = null;
    keySystem = null;
    pendingSessions = [];
    sessionTokens = [];
    protectionKeyController = (0,_controllers_ProtectionKeyController_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
    eventHandler = createEventHandler();
  }
  function reset() {
    if (videoElement) {
      removeEventListeners();
    }
    for (let i = 0; i < sessionTokens.length; i++) {
      closeKeySession(sessionTokens[i]);
    }
    eventBus.trigger(events.TEARDOWN_COMPLETE);
  }
  function getAllInitData() {
    const retVal = [];
    for (let i = 0; i < pendingSessions.length; i++) {
      retVal.push(pendingSessions[i].initData);
    }
    for (let i = 0; i < sessionTokens.length; i++) {
      retVal.push(sessionTokens[i].initData);
    }
    return retVal;
  }
  function getSessionTokens() {
    return sessionTokens.concat(pendingSessions);
  }
  function requestKeySystemAccess(ksConfigurations) {
    return new Promise((resolve, reject) => {
      let ve = videoElement;
      if (!ve) {
        // Must have a video element to do this capability tests
        ve = document.createElement('video');
      }

      // Try key systems in order, first one with supported key system configuration
      // is used
      let found = false;
      for (let ksIdx = 0; ksIdx < ksConfigurations.length; ksIdx++) {
        const systemString = ksConfigurations[ksIdx].ks.systemString;
        const configs = ksConfigurations[ksIdx].configs;
        let supportedAudio = null;
        let supportedVideo = null;

        // Try key system configs in order, first one with supported audio/video
        // is used
        for (let configIdx = 0; configIdx < configs.length; configIdx++) {
          //let audios = configs[configIdx].audioCapabilities;
          const videos = configs[configIdx].videoCapabilities;
          // Look for supported video container/codecs
          if (videos && videos.length !== 0) {
            supportedVideo = []; // Indicates that we have a requested video config
            for (let videoIdx = 0; videoIdx < videos.length; videoIdx++) {
              if (ve.canPlayType(videos[videoIdx].contentType, systemString) !== '') {
                supportedVideo.push(videos[videoIdx]);
              }
            }
          }

          // No supported audio or video in this configuration OR we have
          // requested audio or video configuration that is not supported
          if (!supportedAudio && !supportedVideo || supportedAudio && supportedAudio.length === 0 || supportedVideo && supportedVideo.length === 0) {
            continue;
          }

          // This configuration is supported
          found = true;
          const ksConfig = new _vo_KeySystemConfiguration_js__WEBPACK_IMPORTED_MODULE_4__["default"](supportedAudio, supportedVideo);
          const ks = protectionKeyController.getKeySystemBySystemString(systemString);
          const keySystemAccess = new _vo_KeySystemAccess_js__WEBPACK_IMPORTED_MODULE_5__["default"](ks, ksConfig);
          eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
            data: keySystemAccess
          });
          resolve({
            data: keySystemAccess
          });
          break;
        }
      }
      if (!found) {
        const errorMessage = 'Key system access denied! -- No valid audio/video content configurations detected!';
        eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
          error: errorMessage
        });
        reject({
          error: errorMessage
        });
      }
    });
  }
  function selectKeySystem(keySystemAccess) {
    keySystem = keySystemAccess.keySystem;
    return Promise.resolve(keySystem);
  }
  function setMediaElement(mediaElement) {
    if (videoElement === mediaElement) {
      return;
    }

    // Replacing the previous element
    if (videoElement) {
      removeEventListeners();

      // Close any open sessions - avoids memory leak on LG webOS 2016/2017 TVs
      for (var i = 0; i < sessionTokens.length; i++) {
        closeKeySession(sessionTokens[i]);
      }
      sessionTokens = [];
    }
    videoElement = mediaElement;

    // Only if we are not detaching from the existing element
    if (videoElement) {
      videoElement.addEventListener(api.keyerror, eventHandler);
      videoElement.addEventListener(api.needkey, eventHandler);
      videoElement.addEventListener(api.keymessage, eventHandler);
      videoElement.addEventListener(api.keyadded, eventHandler);
      eventBus.trigger(events.VIDEO_ELEMENT_SELECTED);
    }
  }
  function createKeySession(ksInfo) {
    if (!keySystem) {
      throw new Error('Can not create sessions until you have selected a key system');
    }

    // Determine if creating a new session is allowed
    if (moreSessionsAllowed || sessionTokens.length === 0) {
      const newSession = {
        // Implements SessionToken
        sessionId: null,
        keyId: ksInfo.keyId,
        normalizedKeyId: ksInfo && ksInfo.keyId && typeof ksInfo.keyId === 'string' ? ksInfo.keyId.replace(/-/g, '').toLowerCase() : '',
        initData: ksInfo.initData,
        hasTriggeredKeyStatusMapUpdate: false,
        getKeyId: function () {
          return this.keyId;
        },
        getSessionId: function () {
          return this.sessionId;
        },
        getExpirationTime: function () {
          return NaN;
        },
        getSessionType: function () {
          return 'temporary';
        },
        getKeyStatuses: function () {
          return {
            size: 0,
            has: () => {
              return false;
            },
            get: () => {
              return undefined;
            }
          };
        }
      };
      pendingSessions.push(newSession);

      // Send our request to the CDM
      videoElement[api.generateKeyRequest](keySystem.systemString, new Uint8Array(ksInfo.initData));
      return newSession;
    } else {
      throw new Error('Multiple sessions not allowed!');
    }
  }
  function updateKeySession(sessionToken, message) {
    const sessionId = sessionToken.sessionId;
    if (!protectionKeyController.isClearKey(keySystem)) {
      // Send our request to the CDM
      videoElement[api.addKey](keySystem.systemString, new Uint8Array(message), new Uint8Array(sessionToken.initData), sessionId);
    } else {
      // For clearkey, message is a ClearKeyKeySet
      for (let i = 0; i < message.keyPairs.length; i++) {
        videoElement[api.addKey](keySystem.systemString, message.keyPairs[i].key, message.keyPairs[i].keyID, sessionId);
      }
    }
    eventBus.trigger(events.KEY_SESSION_UPDATED);
  }
  function closeKeySession(sessionToken) {
    // Send our request to the CDM
    try {
      videoElement[api.cancelKeyRequest](keySystem.systemString, sessionToken.sessionId);
    } catch (error) {
      eventBus.trigger(events.KEY_SESSION_CLOSED, {
        data: null,
        error: 'Error closing session (' + sessionToken.sessionId + ') ' + error.message
      });
    }
  }
  function setServerCertificate(/*serverCertificate*/
  ) {/* Not supported */
  }
  function loadKeySession(/*ksInfo*/
  ) {/* Not supported */
  }
  function removeKeySession(/*sessionToken*/
  ) {/* Not supported */
  }
  function createEventHandler() {
    return {
      handleEvent: function (event) {
        let sessionToken = null;
        switch (event.type) {
          case api.needkey:
            let initData = ArrayBuffer.isView(event.initData) ? event.initData.buffer : event.initData;
            eventBus.trigger(events.NEED_KEY, {
              key: new _vo_NeedKey_js__WEBPACK_IMPORTED_MODULE_1__["default"](initData, _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_8__["default"].INITIALIZATION_DATA_TYPE_CENC)
            });
            break;
          case api.keyerror:
            sessionToken = findSessionByID(sessionTokens, event.sessionId);
            if (!sessionToken) {
              sessionToken = findSessionByID(pendingSessions, event.sessionId);
            }
            if (sessionToken) {
              let code = _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_CODE;
              let msg = '';
              switch (event.errorCode.code) {
                case 1:
                  code = _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_UNKNOWN_CODE;
                  msg += 'MEDIA_KEYERR_UNKNOWN - ' + _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_UNKNOWN_MESSAGE;
                  break;
                case 2:
                  code = _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_CLIENT_CODE;
                  msg += 'MEDIA_KEYERR_CLIENT - ' + _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_CLIENT_MESSAGE;
                  break;
                case 3:
                  code = _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_SERVICE_CODE;
                  msg += 'MEDIA_KEYERR_SERVICE - ' + _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_SERVICE_MESSAGE;
                  break;
                case 4:
                  code = _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_OUTPUT_CODE;
                  msg += 'MEDIA_KEYERR_OUTPUT - ' + _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_OUTPUT_MESSAGE;
                  break;
                case 5:
                  code = _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_HARDWARECHANGE_CODE;
                  msg += 'MEDIA_KEYERR_HARDWARECHANGE - ' + _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_HARDWARECHANGE_MESSAGE;
                  break;
                case 6:
                  code = _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_DOMAIN_CODE;
                  msg += 'MEDIA_KEYERR_DOMAIN - ' + _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEYERR_DOMAIN_MESSAGE;
                  break;
              }
              msg += '  System Code = ' + event.systemCode;
              // TODO: Build error string based on key error
              eventBus.trigger(events.KEY_ERROR, {
                error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_2__["default"](code, msg, sessionToken)
              });
            } else {
              logger.error('No session token found for key error');
            }
            break;
          case api.keyadded:
            sessionToken = findSessionByID(sessionTokens, event.sessionId);
            if (!sessionToken) {
              sessionToken = findSessionByID(pendingSessions, event.sessionId);
            }
            if (sessionToken) {
              logger.debug('DRM: Key added.');
              eventBus.trigger(events.KEY_ADDED, {
                data: sessionToken
              }); //TODO not sure anything is using sessionToken? why there?
            } else {
              logger.debug('No session token found for key added');
            }
            break;
          case api.keymessage:
            // If this CDM does not support session IDs, we will be limited
            // to a single session
            moreSessionsAllowed = event.sessionId !== null && event.sessionId !== undefined;

            // SessionIDs supported
            if (moreSessionsAllowed) {
              // Attempt to find an uninitialized token with this sessionId
              sessionToken = findSessionByID(sessionTokens, event.sessionId);
              if (!sessionToken && pendingSessions.length > 0) {
                // This is the first message for our latest session, so set the
                // sessionId and add it to our list
                sessionToken = pendingSessions.shift();
                sessionTokens.push(sessionToken);
                sessionToken.sessionId = event.sessionId;
                eventBus.trigger(events.KEY_SESSION_CREATED, {
                  data: sessionToken
                });
              }
            } else if (pendingSessions.length > 0) {
              // SessionIDs not supported
              sessionToken = pendingSessions.shift();
              sessionTokens.push(sessionToken);
              if (pendingSessions.length !== 0) {
                errHandler.error(new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_2__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEY_MESSAGE_ERROR_CODE, _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_6__["default"].MEDIA_KEY_MESSAGE_ERROR_MESSAGE));
              }
            }
            if (sessionToken) {
              let message = ArrayBuffer.isView(event.message) ? event.message.buffer : event.message;

              // For ClearKey, the spec mandates that you pass this message to the
              // addKey method, so we always save it to the token since there is no
              // way to tell which key system is in use
              sessionToken.keyMessage = message;
              eventBus.trigger(events.INTERNAL_KEY_MESSAGE, {
                data: new _vo_KeyMessage_js__WEBPACK_IMPORTED_MODULE_3__["default"](sessionToken, message, event.defaultURL)
              });
            } else {
              logger.warn('No session token found for key message');
            }
            break;
        }
      }
    };
  }

  /**
   * Helper function to retrieve the stored session token based on a given
   * sessionId value
   *
   * @param {Array} sessionArray - the array of sessions to search
   * @param {*} sessionId - the sessionId to search for
   * @returns {*} the session token with the given sessionId
   */
  function findSessionByID(sessionArray, sessionId) {
    if (!sessionId || !sessionArray) {
      return null;
    } else {
      const len = sessionArray.length;
      for (let i = 0; i < len; i++) {
        if (sessionArray[i].sessionId == sessionId) {
          return sessionArray[i];
        }
      }
      return null;
    }
  }
  function removeEventListeners() {
    videoElement.removeEventListener(api.keyerror, eventHandler);
    videoElement.removeEventListener(api.needkey, eventHandler);
    videoElement.removeEventListener(api.keymessage, eventHandler);
    videoElement.removeEventListener(api.keyadded, eventHandler);
  }
  instance = {
    getAllInitData,
    getSessionTokens,
    requestKeySystemAccess,
    selectKeySystem,
    setMediaElement,
    createKeySession,
    updateKeySession,
    closeKeySession,
    setServerCertificate,
    loadKeySession,
    removeKeySession,
    stop: reset,
    reset
  };
  setup();
  return instance;
}
ProtectionModel_01b.__dashjs_factory_name = 'ProtectionModel_01b';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_7__["default"].getClassFactory(ProtectionModel_01b));

/***/ }),

/***/ "./src/streaming/protection/models/ProtectionModel_3Feb2014.js":
/*!*********************************************************************!*\
  !*** ./src/streaming/protection/models/ProtectionModel_3Feb2014.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_ProtectionKeyController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/ProtectionKeyController.js */ "./src/streaming/protection/controllers/ProtectionKeyController.js");
/* harmony import */ var _vo_NeedKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/NeedKey.js */ "./src/streaming/protection/vo/NeedKey.js");
/* harmony import */ var _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../vo/DashJSError.js */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errors/ProtectionErrors.js */ "./src/streaming/protection/errors/ProtectionErrors.js");
/* harmony import */ var _vo_KeyMessage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vo/KeyMessage.js */ "./src/streaming/protection/vo/KeyMessage.js");
/* harmony import */ var _vo_KeySystemConfiguration_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vo/KeySystemConfiguration.js */ "./src/streaming/protection/vo/KeySystemConfiguration.js");
/* harmony import */ var _vo_KeySystemAccess_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../vo/KeySystemAccess.js */ "./src/streaming/protection/vo/KeySystemAccess.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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
 * Implementation of the EME APIs as of the 3 Feb 2014 state of the specification.
 *
 * Implemented by Internet Explorer 11 (Windows 8.1)
 *
 * @implements ProtectionModel
 * @class
 */










function ProtectionModel_3Feb2014(config) {
  config = config || {};
  const context = this.context;
  const eventBus = config.eventBus; //Need to pass in here so we can use same instance since this is optional module
  const events = config.events;
  const debug = config.debug;
  const api = config.api;
  let instance, logger, videoElement, keySystem, mediaKeys, keySystemAccess, sessionTokens, eventHandler, protectionKeyController;
  function setup() {
    logger = debug.getLogger(instance);
    videoElement = null;
    keySystem = null;
    mediaKeys = null;
    keySystemAccess = null;
    sessionTokens = [];
    protectionKeyController = (0,_controllers_ProtectionKeyController_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).getInstance();
    eventHandler = createEventHandler();
  }
  function reset() {
    try {
      for (let i = 0; i < sessionTokens.length; i++) {
        closeKeySession(sessionTokens[i]);
      }
      if (videoElement) {
        videoElement.removeEventListener(api.needkey, eventHandler);
      }
      eventBus.trigger(events.TEARDOWN_COMPLETE);
    } catch (error) {
      eventBus.trigger(events.TEARDOWN_COMPLETE, {
        error: 'Error tearing down key sessions and MediaKeys! -- ' + error.message
      });
    }
  }
  function getAllInitData() {
    const retVal = [];
    for (let i = 0; i < sessionTokens.length; i++) {
      retVal.push(sessionTokens[i].initData);
    }
    return retVal;
  }
  function getSessionTokens() {
    return sessionTokens;
  }
  function requestKeySystemAccess(ksConfigurations) {
    return new Promise((resolve, reject) => {
      // Try key systems in order, first one with supported key system configuration
      // is used
      let found = false;
      for (let ksIdx = 0; ksIdx < ksConfigurations.length; ksIdx++) {
        const systemString = ksConfigurations[ksIdx].ks.systemString;
        const configs = ksConfigurations[ksIdx].configs;
        let supportedAudio = null;
        let supportedVideo = null;

        // Try key system configs in order, first one with supported audio/video
        // is used
        for (let configIdx = 0; configIdx < configs.length; configIdx++) {
          const audios = configs[configIdx].audioCapabilities;
          const videos = configs[configIdx].videoCapabilities;

          // Look for supported audio container/codecs
          if (audios && audios.length !== 0) {
            supportedAudio = []; // Indicates that we have a requested audio config
            for (let audioIdx = 0; audioIdx < audios.length; audioIdx++) {
              if (window[api.MediaKeys].isTypeSupported(systemString, audios[audioIdx].contentType)) {
                supportedAudio.push(audios[audioIdx]);
              }
            }
          }

          // Look for supported video container/codecs
          if (videos && videos.length !== 0) {
            supportedVideo = []; // Indicates that we have a requested video config
            for (let videoIdx = 0; videoIdx < videos.length; videoIdx++) {
              if (window[api.MediaKeys].isTypeSupported(systemString, videos[videoIdx].contentType)) {
                supportedVideo.push(videos[videoIdx]);
              }
            }
          }

          // No supported audio or video in this configuration OR we have
          // requested audio or video configuration that is not supported
          if (!supportedAudio && !supportedVideo || supportedAudio && supportedAudio.length === 0 || supportedVideo && supportedVideo.length === 0) {
            continue;
          }

          // This configuration is supported
          found = true;
          const ksConfig = new _vo_KeySystemConfiguration_js__WEBPACK_IMPORTED_MODULE_5__["default"](supportedAudio, supportedVideo);
          const ks = protectionKeyController.getKeySystemBySystemString(systemString);
          const keySystemAccess = new _vo_KeySystemAccess_js__WEBPACK_IMPORTED_MODULE_6__["default"](ks, ksConfig);
          eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
            data: keySystemAccess
          });
          resolve({
            data: keySystemAccess
          });
          break;
        }
      }
      if (!found) {
        const errorMessage = 'Key system access denied! -- No valid audio/video content configurations detected!';
        eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, {
          error: errorMessage
        });
        reject({
          error: errorMessage
        });
      }
    });
  }
  function selectKeySystem(ksAccess) {
    return new Promise((resolve, reject) => {
      try {
        mediaKeys = ksAccess.mediaKeys = new window[api.MediaKeys](ksAccess.keySystem.systemString);
        keySystem = ksAccess.keySystem;
        keySystemAccess = ksAccess;
        if (videoElement) {
          setMediaKeys();
        }
        resolve(keySystem);
      } catch (error) {
        reject({
          error: 'Error selecting keys system (' + keySystem.systemString + ')! Could not create MediaKeys -- TODO'
        });
      }
    });
  }
  function setMediaElement(mediaElement) {
    if (videoElement === mediaElement) {
      return;
    }

    // Replacing the previous element
    if (videoElement) {
      videoElement.removeEventListener(api.needkey, eventHandler);
    }
    videoElement = mediaElement;

    // Only if we are not detaching from the existing element
    if (videoElement) {
      videoElement.addEventListener(api.needkey, eventHandler);
      if (mediaKeys) {
        setMediaKeys();
      }
    }
  }
  function createKeySession(ksInfo) {
    if (!keySystem || !mediaKeys || !keySystemAccess) {
      throw new Error('Can not create sessions until you have selected a key system');
    }

    // Use the first video capability for the contentType.
    // TODO:  Not sure if there is a way to concatenate all capability data into a RFC6386-compatible format

    // If player is trying to playback Audio only stream - don't error out.
    let capabilities = null;
    if (keySystemAccess.ksConfiguration.videoCapabilities && keySystemAccess.ksConfiguration.videoCapabilities.length > 0) {
      capabilities = keySystemAccess.ksConfiguration.videoCapabilities[0];
    }
    if (capabilities === null && keySystemAccess.ksConfiguration.audioCapabilities && keySystemAccess.ksConfiguration.audioCapabilities.length > 0) {
      capabilities = keySystemAccess.ksConfiguration.audioCapabilities[0];
    }
    if (capabilities === null) {
      throw new Error('Can not create sessions for unknown content types.');
    }
    const contentType = capabilities.contentType;
    const session = mediaKeys.createSession(contentType, new Uint8Array(ksInfo.initData), ksInfo.cdmData ? new Uint8Array(ksInfo.cdmData) : null);
    const sessionToken = createSessionToken(session, ksInfo);

    // Add all event listeners
    session.addEventListener(api.error, sessionToken);
    session.addEventListener(api.message, sessionToken);
    session.addEventListener(api.ready, sessionToken);
    session.addEventListener(api.close, sessionToken);

    // Add to our session list
    sessionTokens.push(sessionToken);
    logger.debug('DRM: Session created.  SessionID = ' + sessionToken.getSessionId());
    eventBus.trigger(events.KEY_SESSION_CREATED, {
      data: sessionToken
    });
  }
  function updateKeySession(sessionToken, message) {
    const session = sessionToken.session;
    if (!protectionKeyController.isClearKey(keySystem)) {
      // Send our request to the key session
      session.update(new Uint8Array(message));
    } else {
      // For clearkey, message is a ClearKeyKeySet
      session.update(new Uint8Array(message.toJWK()));
    }
    eventBus.trigger(events.KEY_SESSION_UPDATED);
  }

  /**
   * Close the given session and release all associated keys.  Following
   * this call, the sessionToken becomes invalid
   *
   * @param {Object} sessionToken - the session token
   */
  function closeKeySession(sessionToken) {
    const session = sessionToken.session;

    // Remove event listeners
    session.removeEventListener(api.error, sessionToken);
    session.removeEventListener(api.message, sessionToken);
    session.removeEventListener(api.ready, sessionToken);
    session.removeEventListener(api.close, sessionToken);

    // Remove from our session list
    for (let i = 0; i < sessionTokens.length; i++) {
      if (sessionTokens[i] === sessionToken) {
        sessionTokens.splice(i, 1);
        break;
      }
    }

    // Send our request to the key session
    session[api.release]();
  }
  function setServerCertificate(/*serverCertificate*/
  ) {/* Not supported */
  }
  function loadKeySession(/*ksInfo*/
  ) {/* Not supported */
  }
  function removeKeySession(/*sessionToken*/
  ) {/* Not supported */
  }
  function createEventHandler() {
    return {
      handleEvent: function (event) {
        switch (event.type) {
          case api.needkey:
            if (event.initData) {
              const initData = ArrayBuffer.isView(event.initData) ? event.initData.buffer : event.initData;
              eventBus.trigger(events.NEED_KEY, {
                key: new _vo_NeedKey_js__WEBPACK_IMPORTED_MODULE_1__["default"](initData, _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_8__["default"].INITIALIZATION_DATA_TYPE_CENC)
              });
            }
            break;
        }
      }
    };
  }

  // IE11 does not let you set MediaKeys until it has entered a certain
  // readyState, so we need this logic to ensure we don't set the keys
  // too early
  function setMediaKeys() {
    let boundDoSetKeys = null;
    const doSetKeys = function () {
      videoElement.removeEventListener('loadedmetadata', boundDoSetKeys);
      videoElement[api.setMediaKeys](mediaKeys);
      eventBus.trigger(events.VIDEO_ELEMENT_SELECTED);
    };
    if (videoElement.readyState >= 1) {
      doSetKeys();
    } else {
      boundDoSetKeys = doSetKeys.bind(this);
      videoElement.addEventListener('loadedmetadata', boundDoSetKeys);
    }
  }

  // Function to create our session token objects which manage the EME
  // MediaKeySession and session-specific event handler
  function createSessionToken(keySession, ksInfo) {
    return {
      // Implements SessionToken
      session: keySession,
      keyId: ksInfo.keyId,
      normalizedKeyId: ksInfo && ksInfo.keyId && typeof ksInfo.keyId === 'string' ? ksInfo.keyId.replace(/-/g, '').toLowerCase() : '',
      initData: ksInfo.initData,
      hasTriggeredKeyStatusMapUpdate: false,
      getKeyId: function () {
        return this.keyId;
      },
      getSessionId: function () {
        return this.session.sessionId;
      },
      getExpirationTime: function () {
        return NaN;
      },
      getSessionType: function () {
        return 'temporary';
      },
      getKeyStatuses: function () {
        return {
          size: 0,
          has: () => {
            return false;
          },
          get: () => {
            return undefined;
          }
        };
      },
      // This is our main event handler for all desired MediaKeySession events
      // These events are translated into our API-independent versions of the
      // same events
      handleEvent: function (event) {
        switch (event.type) {
          case api.error:
            let errorStr = 'KeyError'; // TODO: Make better string from event
            eventBus.trigger(events.KEY_ERROR, {
              error: new _vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_2__["default"](_errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"].MEDIA_KEYERR_CODE, errorStr, this)
            });
            break;
          case api.message:
            let message = ArrayBuffer.isView(event.message) ? event.message.buffer : event.message;
            eventBus.trigger(events.INTERNAL_KEY_MESSAGE, {
              data: new _vo_KeyMessage_js__WEBPACK_IMPORTED_MODULE_4__["default"](this, message, event.destinationURL)
            });
            break;
          case api.ready:
            logger.debug('DRM: Key added.');
            eventBus.trigger(events.KEY_ADDED);
            break;
          case api.close:
            logger.debug('DRM: Session closed.  SessionID = ' + this.getSessionId());
            eventBus.trigger(events.KEY_SESSION_CLOSED, {
              data: this.getSessionId()
            });
            break;
        }
      }
    };
  }
  instance = {
    getAllInitData,
    getSessionTokens,
    requestKeySystemAccess,
    selectKeySystem,
    setMediaElement,
    createKeySession,
    updateKeySession,
    closeKeySession,
    setServerCertificate,
    loadKeySession,
    removeKeySession,
    stop: reset,
    reset
  };
  setup();
  return instance;
}
ProtectionModel_3Feb2014.__dashjs_factory_name = 'ProtectionModel_3Feb2014';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_7__["default"].getClassFactory(ProtectionModel_3Feb2014));

/***/ }),

/***/ "./src/streaming/protection/servers/ClearKey.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/servers/ClearKey.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_KeyPair_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/KeyPair.js */ "./src/streaming/protection/vo/KeyPair.js");
/* harmony import */ var _vo_ClearKeyKeySet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vo/ClearKeyKeySet.js */ "./src/streaming/protection/vo/ClearKeyKeySet.js");
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

/**
 * CableLabs ClearKey license server implementation
 *
 * For testing purposes and evaluating potential uses for ClearKey, we have developed
 * a dirt-simple API for requesting ClearKey licenses from a remote server.
 *
 * @implements LicenseServer
 * @class
 */



function ClearKey() {
  let instance;
  function getServerURLFromMessage(url /* message, messageType*/) {
    return url;
  }
  function getHTTPMethod(/*messageType*/
  ) {
    return 'POST';
  }
  function getResponseType(/*keySystemStr*/
  ) {
    return 'json';
  }
  function getLicenseMessage(serverResponse /*, keySystemStr, messageType*/) {
    if (!serverResponse.hasOwnProperty('keys')) {
      return null;
    }
    let keyPairs = [];
    for (let i = 0; i < serverResponse.keys.length; i++) {
      let keypair = serverResponse.keys[i];
      let keyid = keypair.kid.replace(/=/g, '');
      let key = keypair.k.replace(/=/g, '');
      keyPairs.push(new _vo_KeyPair_js__WEBPACK_IMPORTED_MODULE_0__["default"](keyid, key));
    }
    return new _vo_ClearKeyKeySet_js__WEBPACK_IMPORTED_MODULE_1__["default"](keyPairs);
  }
  function getErrorResponse(serverResponse /*, keySystemStr, messageType*/) {
    return String.fromCharCode.apply(null, new Uint8Array(serverResponse));
  }
  instance = {
    getServerURLFromMessage,
    getHTTPMethod,
    getResponseType,
    getLicenseMessage,
    getErrorResponse
  };
  return instance;
}
ClearKey.__dashjs_factory_name = 'ClearKey';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSingletonFactory(ClearKey));

/***/ }),

/***/ "./src/streaming/protection/servers/DRMToday.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/servers/DRMToday.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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

/**
 * CastLabs DRMToday License Server implementation
 *
 * @implements LicenseServer
 * @class
 */



function DRMToday(config) {
  config = config || {};
  const BASE64 = config.BASE64;
  const keySystems = {};
  keySystems[_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_0__["default"].WIDEVINE_KEYSTEM_STRING] = {
    responseType: 'json',
    getLicenseMessage: function (response) {
      return BASE64.decodeArray(response.license);
    },
    getErrorResponse: function (response) {
      return response;
    }
  };
  keySystems[_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_0__["default"].PLAYREADY_KEYSTEM_STRING] = {
    responseType: 'arraybuffer',
    getLicenseMessage: function (response) {
      return response;
    },
    getErrorResponse: function (response) {
      return String.fromCharCode.apply(null, new Uint8Array(response));
    }
  };
  let instance;
  function checkConfig() {
    if (!BASE64 || !BASE64.hasOwnProperty('decodeArray')) {
      throw new Error('Missing config parameter(s)');
    }
  }
  function getServerURLFromMessage(url /*, message, messageType*/) {
    return url;
  }
  function getHTTPMethod(/*messageType*/
  ) {
    return 'POST';
  }
  function getResponseType(keySystemStr /*, messageType*/) {
    return keySystems[keySystemStr].responseType;
  }
  function getLicenseMessage(serverResponse, keySystemStr /*, messageType*/) {
    checkConfig();
    return keySystems[keySystemStr].getLicenseMessage(serverResponse);
  }
  function getErrorResponse(serverResponse, keySystemStr /*, messageType*/) {
    return keySystems[keySystemStr].getErrorResponse(serverResponse);
  }
  instance = {
    getServerURLFromMessage,
    getHTTPMethod,
    getResponseType,
    getLicenseMessage,
    getErrorResponse
  };
  return instance;
}
DRMToday.__dashjs_factory_name = 'DRMToday';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSingletonFactory(DRMToday));

/***/ }),

/***/ "./src/streaming/protection/servers/PlayReady.js":
/*!*******************************************************!*\
  !*** ./src/streaming/protection/servers/PlayReady.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* global escape: true */



/**
 * Microsoft PlayReady Test License Server
 *
 * For testing content that uses the PlayReady test server at
 *
 * @implements LicenseServer
 * @class
 * @ignore
 */

function PlayReady() {
  let instance;
  const soap = 'http://schemas.xmlsoap.org/soap/envelope/';
  function uintToString(arrayBuffer) {
    const encodedString = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    const decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
  }
  function parseServerResponse(serverResponse) {
    if (window.DOMParser) {
      const stringResponse = uintToString(serverResponse);
      const parser = new window.DOMParser();
      const xmlDoc = parser.parseFromString(stringResponse, 'text/xml');
      const envelope = xmlDoc ? xmlDoc.getElementsByTagNameNS(soap, 'Envelope')[0] : null;
      const body = envelope ? envelope.getElementsByTagNameNS(soap, 'Body')[0] : null;
      const fault = body ? body.getElementsByTagNameNS(soap, 'Fault')[0] : null;
      if (fault) {
        return null;
      }
    }
    return serverResponse;
  }
  function parseErrorResponse(serverResponse) {
    let faultstring = '';
    let statusCode = '';
    let message = '';
    let idStart = -1;
    let idEnd = -1;
    if (window.DOMParser) {
      const stringResponse = uintToString(serverResponse);
      const parser = new window.DOMParser();
      const xmlDoc = parser.parseFromString(stringResponse, 'text/xml');
      const envelope = xmlDoc ? xmlDoc.getElementsByTagNameNS(soap, 'Envelope')[0] : null;
      const body = envelope ? envelope.getElementsByTagNameNS(soap, 'Body')[0] : null;
      const fault = body ? body.getElementsByTagNameNS(soap, 'Fault')[0] : null;
      const detail = fault ? fault.getElementsByTagName('detail')[0] : null;
      const exception = detail ? detail.getElementsByTagName('Exception')[0] : null;
      let node = null;
      if (fault === null) {
        return stringResponse;
      }
      node = fault.getElementsByTagName('faultstring')[0].firstChild;
      faultstring = node ? node.nodeValue : null;
      if (exception !== null) {
        node = exception.getElementsByTagName('StatusCode')[0];
        statusCode = node ? node.firstChild.nodeValue : null;
        node = exception.getElementsByTagName('Message')[0];
        message = node ? node.firstChild.nodeValue : null;
        idStart = message ? message.lastIndexOf('[') + 1 : -1;
        idEnd = message ? message.indexOf(']') : -1;
        message = message ? message.substring(idStart, idEnd) : '';
      }
    }
    let errorString = `code: ${statusCode}, name: ${faultstring}`;
    if (message) {
      errorString += `, message: ${message}`;
    }
    return errorString;
  }
  function getServerURLFromMessage(url /*, message, messageType*/) {
    return url;
  }
  function getHTTPMethod(/*messageType*/
  ) {
    return 'POST';
  }
  function getResponseType(/*keySystemStr, messageType*/
  ) {
    return 'arraybuffer';
  }
  function getLicenseMessage(serverResponse /*, keySystemStr, messageType*/) {
    return parseServerResponse.call(this, serverResponse);
  }
  function getErrorResponse(serverResponse /*, keySystemStr, messageType*/) {
    return parseErrorResponse.call(this, serverResponse);
  }
  instance = {
    getServerURLFromMessage,
    getHTTPMethod,
    getResponseType,
    getLicenseMessage,
    getErrorResponse
  };
  return instance;
}
PlayReady.__dashjs_factory_name = 'PlayReady';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(PlayReady));

/***/ }),

/***/ "./src/streaming/protection/servers/Widevine.js":
/*!******************************************************!*\
  !*** ./src/streaming/protection/servers/Widevine.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
function Widevine() {
  let instance;
  function getServerURLFromMessage(url /*, message, messageType*/) {
    return url;
  }
  function getHTTPMethod(/*messageType*/
  ) {
    return 'POST';
  }
  function getResponseType(/*keySystemStr, messageType*/
  ) {
    return 'arraybuffer';
  }
  function getLicenseMessage(serverResponse /*, keySystemStr, messageType*/) {
    return serverResponse;
  }
  function getErrorResponse(serverResponse /*, keySystemStr, messageType*/) {
    return String.fromCharCode.apply(null, new Uint8Array(serverResponse));
  }
  instance = {
    getServerURLFromMessage,
    getHTTPMethod,
    getResponseType,
    getLicenseMessage,
    getErrorResponse
  };
  return instance;
}
Widevine.__dashjs_factory_name = 'Widevine';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSingletonFactory(Widevine));

/***/ }),

/***/ "./src/streaming/protection/vo/ClearKeyKeySet.js":
/*!*******************************************************!*\
  !*** ./src/streaming/protection/vo/ClearKeyKeySet.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * @classdesc A collection of ClearKey encryption keys with an (optional) associated
 *  type
 * @ignore
 */
class ClearKeyKeySet {
  /**
   * @param {Array.<KeyPair>} keyPairs
   * @param {string} type the type of keys in this set.  One of either 'persistent'
   * or 'temporary'.  Can also be null or undefined.
   * @class
   * @ignore
   */
  constructor(keyPairs, type) {
    if (type && type !== 'persistent' && type !== 'temporary') {
      throw new Error('Invalid ClearKey key set type!  Must be one of \'persistent\' or \'temporary\'');
    }
    this.keyPairs = keyPairs;
    this.type = type;
  }

  /**
   * Convert this key set to its JSON Web Key (JWK) representation
   *
   * @return {ArrayBuffer} JWK object UTF-8 encoded as ArrayBuffer
   */
  toJWK() {
    let i;
    let numKeys = this.keyPairs.length;
    let jwk = {
      keys: []
    };
    for (i = 0; i < numKeys; i++) {
      let key = {
        kty: 'oct',
        alg: 'A128KW',
        kid: this.keyPairs[i].keyID,
        k: this.keyPairs[i].key
      };
      jwk.keys.push(key);
    }
    if (this.type) {
      jwk.type = this.type;
    }
    let jwkString = JSON.stringify(jwk);
    const len = jwkString.length;

    // Convert JSON string to ArrayBuffer
    let buf = new ArrayBuffer(len);
    let bView = new Uint8Array(buf);
    for (i = 0; i < len; i++) {
      bView[i] = jwkString.charCodeAt(i);
    }
    return buf;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (ClearKeyKeySet);

/***/ }),

/***/ "./src/streaming/protection/vo/KeyMessage.js":
/*!***************************************************!*\
  !*** ./src/streaming/protection/vo/KeyMessage.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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
 * @classdesc EME-independent KeyMessage
 * @ignore
 */
class KeyMessage {
  /**
   * @param {SessionToken} sessionToken the session
   * to which the key message is associated
   * @param {ArrayBuffer} message the key message
   * @param {string} defaultURL license acquisition URL provided by the CDM
   * @param {string} messageType Supported message types can be found
   * {@link https://w3c.github.io/encrypted-media/#idl-def-MediaKeyMessageType|here}.
   * @class
   */
  constructor(sessionToken, message, defaultURL, messageType) {
    this.sessionToken = sessionToken;
    this.message = message;
    this.defaultURL = defaultURL;
    this.messageType = messageType ? messageType : _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_0__["default"].MEDIA_KEY_MESSAGE_TYPES.LICENSE_REQUEST;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (KeyMessage);

/***/ }),

/***/ "./src/streaming/protection/vo/KeyPair.js":
/*!************************************************!*\
  !*** ./src/streaming/protection/vo/KeyPair.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * @classdesc Represents a 128-bit keyID and 128-bit encryption key
 * @ignore
 */
class KeyPair {
  /**
   * @param {string} keyID 128-bit key ID, base64 encoded, with no padding
   * @param {string} key 128-bit encryption key, base64 encoded, with no padding
   * @class
   * @ignore
   */
  constructor(keyID, key) {
    this.keyID = keyID;
    this.key = key;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (KeyPair);

/***/ }),

/***/ "./src/streaming/protection/vo/KeySystemAccess.js":
/*!********************************************************!*\
  !*** ./src/streaming/protection/vo/KeySystemAccess.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * @classdesc Creates a new key system access token.  Represents a valid key system for
 * given piece of content and key system requirements.  Used to initialize license
 * acquisition operations.
 * @ignore
 */
class KeySystemAccess {
  /**
   * @param {MediaPlayer.dependencies.protection.KeySystem} keySystem the key system
   * @param {KeySystemConfiguration} ksConfiguration the
   * subset of configurations passed to the key system access request that are supported
   * by this user agent
   * @class
   * @ignore
   */
  constructor(keySystem, ksConfiguration) {
    this.keySystem = keySystem;
    this.ksConfiguration = ksConfiguration;
    this.nativeMediaKeySystemAccessObject = null;
    this.selectedSystemString = null;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (KeySystemAccess);

/***/ }),

/***/ "./src/streaming/protection/vo/KeySystemConfiguration.js":
/*!***************************************************************!*\
  !*** ./src/streaming/protection/vo/KeySystemConfiguration.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
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
 * @classdesc Represents a set of configurations that describe the capabilities desired for
 *  support by a given CDM
 * @ignore
 */
class KeySystemConfiguration {
  /**
   * @param {Array.<MediaCapability>} audioCapabilities array of
   * desired audio capabilities.  Higher preference capabilities should be placed earlier
   * in the array.
   * @param {Array.<MediaCapability>} videoCapabilities array of
   * desired video capabilities.  Higher preference capabilities should be placed earlier
   * in the array.
   * @param {string} distinctiveIdentifier desired use of distinctive identifiers.
   * One of "required", "optional", or "not-allowed"
   * @param {string} persistentState desired support for persistent storage of
   * key systems.  One of "required", "optional", or "not-allowed"
   * @param {Array.<string>} sessionTypes List of session types that must
   * be supported by the key system
   * @class
   */
  constructor(audioCapabilities, videoCapabilities, distinctiveIdentifier, persistentState, sessionTypes, initDataTypes) {
    this.initDataTypes = initDataTypes && initDataTypes.length > 0 ? initDataTypes : [_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_0__["default"].INITIALIZATION_DATA_TYPE_CENC];
    if (audioCapabilities && audioCapabilities.length) {
      this.audioCapabilities = audioCapabilities;
    }
    if (videoCapabilities && videoCapabilities.length) {
      this.videoCapabilities = videoCapabilities;
    }
    this.distinctiveIdentifier = distinctiveIdentifier;
    this.persistentState = persistentState;
    this.sessionTypes = sessionTypes;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (KeySystemConfiguration);

/***/ }),

/***/ "./src/streaming/protection/vo/KeySystemMetadata.js":
/*!**********************************************************!*\
  !*** ./src/streaming/protection/vo/KeySystemMetadata.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * @classdesc A model class to save metadata about a key system
 * @ignore
 */

class KeySystemMetadata {
  constructor(config) {
    this.ks = config.ks;
    this.keyId = config.keyId;
    this.initData = config.initData;
    this.protData = config.protData;
    this.cdmData = config.cdmData;
    this.sessionId = config.sessionId;
    this.sessionType = config.sessionType;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (KeySystemMetadata);

/***/ }),

/***/ "./src/streaming/protection/vo/LicenseRequest.js":
/*!*******************************************************!*\
  !*** ./src/streaming/protection/vo/LicenseRequest.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * @classdesc Defines a license request
 * @ignore
 */
class LicenseRequest {
  /**
   * Defines a license request
   *
   * @class
   */
  constructor(url, method, responseType, headers, withCredentials, messageType, sessionId, data) {
    /**
     * The license request url
     */
    this.url = url;

    /**
     * The HTTP method
     */
    this.method = method;

    /**
     * The HTTP response type
     */
    this.responseType = responseType;

    /**
     * The HTP request headers
     */
    this.headers = headers;

    /**
     * Wether request is done using credentials (cross-site cookies)
     */
    this.withCredentials = withCredentials;

    /**
     * The license request message type (see https://www.w3.org/TR/encrypted-media/#dom-mediakeymessagetype)
     */
    this.messageType = messageType;

    /**
     * The corresponding EME session ID
     */
    this.sessionId = sessionId;

    /**
     * The license request data
     */
    this.data = data;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (LicenseRequest);

/***/ }),

/***/ "./src/streaming/protection/vo/LicenseResponse.js":
/*!********************************************************!*\
  !*** ./src/streaming/protection/vo/LicenseResponse.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * @classdesc Defines a license response
 */
class LicenseResponse {
  /**
   * Defines a license response
   *
   * @class
   * @ignore
   */
  constructor(url, headers, data) {
    /**
     * The url that was loaded, that can be redirected from original request url
     */
    this.url = url;

    /**
     * The HTP response headers
     */
    this.headers = headers;

    /**
     * The license response data
     */
    this.data = data;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (LicenseResponse);

/***/ }),

/***/ "./src/streaming/protection/vo/MediaCapability.js":
/*!********************************************************!*\
  !*** ./src/streaming/protection/vo/MediaCapability.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * @classdesc A media capability
 * @ignore
 */
class MediaCapability {
  /**
   * @param {string} contentType MIME type and codecs (RFC6386)
   * @param {string} robustness
   * @class
   * @ignore
   */
  constructor(contentType, robustness) {
    this.contentType = contentType;
    this.robustness = robustness;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (MediaCapability);

/***/ }),

/***/ "./src/streaming/protection/vo/NeedKey.js":
/*!************************************************!*\
  !*** ./src/streaming/protection/vo/NeedKey.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * @classdesc NeedKey
 * @ignore
 */
class NeedKey {
  /**
   * @param {ArrayBuffer} initData the initialization data
   * @param {string} initDataType initialization data type
   * @class
   */
  constructor(initData, initDataType) {
    this.initData = initData;
    this.initDataType = initDataType;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (NeedKey);

/***/ }),

/***/ "./src/streaming/vo/DashJSError.js":
/*!*****************************************!*\
  !*** ./src/streaming/vo/DashJSError.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
class DashJSError {
  constructor(code, message, data) {
    this.code = code || null;
    this.message = message || null;
    this.data = data || null;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (DashJSError);

/***/ }),

/***/ "./src/streaming/vo/metrics/HTTPRequest.js":
/*!*************************************************!*\
  !*** ./src/streaming/vo/metrics/HTTPRequest.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************************************!*\
  !*** ./src/streaming/protection/Protection.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_ProtectionController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/ProtectionController.js */ "./src/streaming/protection/controllers/ProtectionController.js");
/* harmony import */ var _controllers_ProtectionKeyController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/ProtectionKeyController.js */ "./src/streaming/protection/controllers/ProtectionKeyController.js");
/* harmony import */ var _ProtectionEvents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProtectionEvents.js */ "./src/streaming/protection/ProtectionEvents.js");
/* harmony import */ var _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors/ProtectionErrors.js */ "./src/streaming/protection/errors/ProtectionErrors.js");
/* harmony import */ var _models_DefaultProtectionModel_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/DefaultProtectionModel.js */ "./src/streaming/protection/models/DefaultProtectionModel.js");
/* harmony import */ var _models_ProtectionModel_3Feb2014_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/ProtectionModel_3Feb2014.js */ "./src/streaming/protection/models/ProtectionModel_3Feb2014.js");
/* harmony import */ var _models_ProtectionModel_01b_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models/ProtectionModel_01b.js */ "./src/streaming/protection/models/ProtectionModel_01b.js");
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







const APIS_ProtectionModel_01b = [
// Un-prefixed as per spec
{
  // Video Element
  generateKeyRequest: 'generateKeyRequest',
  addKey: 'addKey',
  cancelKeyRequest: 'cancelKeyRequest',
  // Events
  needkey: 'needkey',
  keyerror: 'keyerror',
  keyadded: 'keyadded',
  keymessage: 'keymessage'
},
// Webkit-prefixed (early Chrome versions and Chrome with EME disabled in chrome://flags)
{
  // Video Element
  generateKeyRequest: 'webkitGenerateKeyRequest',
  addKey: 'webkitAddKey',
  cancelKeyRequest: 'webkitCancelKeyRequest',
  // Events
  needkey: 'webkitneedkey',
  keyerror: 'webkitkeyerror',
  keyadded: 'webkitkeyadded',
  keymessage: 'webkitkeymessage'
}];
const APIS_ProtectionModel_3Feb2014 = [
// Un-prefixed as per spec
// Chrome 38-39 (and some earlier versions) with chrome://flags -- Enable Encrypted Media Extensions
{
  // Video Element
  setMediaKeys: 'setMediaKeys',
  // MediaKeys
  MediaKeys: 'MediaKeys',
  // MediaKeySession
  release: 'close',
  // Events
  needkey: 'needkey',
  error: 'keyerror',
  message: 'keymessage',
  ready: 'keyadded',
  close: 'keyclose'
},
// MS-prefixed (IE11, Windows 8.1)
{
  // Video Element
  setMediaKeys: 'msSetMediaKeys',
  // MediaKeys
  MediaKeys: 'MSMediaKeys',
  // MediaKeySession
  release: 'close',
  // Events
  needkey: 'msneedkey',
  error: 'mskeyerror',
  message: 'mskeymessage',
  ready: 'mskeyadded',
  close: 'mskeyclose'
}];
function Protection() {
  let instance;
  const context = this.context;

  /**
   * Create a ProtectionController and associated ProtectionModel for use with
   * a single piece of content.
   *
   * @param {Object} config
   * @return {ProtectionController} protection controller
   *
   */
  function createProtectionSystem(config) {
    let controller = null;
    const protectionKeyController = (0,_controllers_ProtectionKeyController_js__WEBPACK_IMPORTED_MODULE_1__["default"])(context).getInstance();
    protectionKeyController.setConfig({
      debug: config.debug,
      BASE64: config.BASE64,
      settings: config.settings
    });
    protectionKeyController.initialize();
    let protectionModel = _getProtectionModel(config);
    if (protectionModel) {
      controller = (0,_controllers_ProtectionController_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create({
        BASE64: config.BASE64,
        cmcdModel: config.cmcdModel,
        constants: config.constants,
        customParametersModel: config.customParametersModel,
        debug: config.debug,
        eventBus: config.eventBus,
        events: config.events,
        protectionKeyController: protectionKeyController,
        protectionModel: protectionModel,
        settings: config.settings
      });
      config.capabilities.setEncryptedMediaSupported(true);
    }
    return controller;
  }
  function _getProtectionModel(config) {
    const debug = config.debug;
    const logger = debug.getLogger(instance);
    const eventBus = config.eventBus;
    const errHandler = config.errHandler;
    const videoElement = config.videoModel ? config.videoModel.getElement() : null;
    if ((!videoElement || videoElement.onencrypted !== undefined) && (!videoElement || videoElement.mediaKeys !== undefined)) {
      logger.info('EME detected on this user agent! (DefaultProtectionModel');
      return (0,_models_DefaultProtectionModel_js__WEBPACK_IMPORTED_MODULE_4__["default"])(context).create({
        debug: debug,
        eventBus: eventBus,
        events: config.events
      });
    } else if (_getAPI(videoElement, APIS_ProtectionModel_3Feb2014)) {
      logger.info('EME detected on this user agent! (ProtectionModel_3Feb2014)');
      return (0,_models_ProtectionModel_3Feb2014_js__WEBPACK_IMPORTED_MODULE_5__["default"])(context).create({
        debug: debug,
        eventBus: eventBus,
        events: config.events,
        api: _getAPI(videoElement, APIS_ProtectionModel_3Feb2014)
      });
    } else if (_getAPI(videoElement, APIS_ProtectionModel_01b)) {
      logger.info('EME detected on this user agent! (ProtectionModel_01b)');
      return (0,_models_ProtectionModel_01b_js__WEBPACK_IMPORTED_MODULE_6__["default"])(context).create({
        debug: debug,
        eventBus: eventBus,
        errHandler: errHandler,
        events: config.events,
        api: _getAPI(videoElement, APIS_ProtectionModel_01b)
      });
    } else {
      logger.warn('No supported version of EME detected on this user agent! - Attempts to play encrypted content will fail!');
      return null;
    }
  }
  function _getAPI(videoElement, apis) {
    for (let i = 0; i < apis.length; i++) {
      const api = apis[i];
      // detect if api is supported by browser
      // check only first function in api -> should be fine
      if (typeof videoElement[api[Object.keys(api)[0]]] !== 'function') {
        continue;
      }
      return api;
    }
    return null;
  }
  instance = {
    createProtectionSystem
  };
  return instance;
}
Protection.__dashjs_factory_name = 'Protection';
const factory = dashjs.FactoryMaker.getClassFactory(Protection);
factory.events = _ProtectionEvents_js__WEBPACK_IMPORTED_MODULE_2__["default"];
factory.errors = _errors_ProtectionErrors_js__WEBPACK_IMPORTED_MODULE_3__["default"];
dashjs.FactoryMaker.updateClassFactory(Protection.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);
}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=dash.protection.debug.js.map