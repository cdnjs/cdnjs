(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Glamor"] = factory();
	else
		root["Glamor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Simulations_1 = __webpack_require__(2);
exports.isBrowser = typeof window !== 'undefined';
exports.isDev = "test" !== 'production';
exports.isTest = "test" === 'test';
exports.idRegex = /data\-css\-([a-zA-Z0-9]+)/;
var hash_1 = __webpack_require__(7);
exports.hashify = hash_1.hashify;
var clean_1 = __webpack_require__(6);
exports.clean = clean_1.clean;
/**** labels ****/
// toggle for debug labels.
// *shouldn't* have to mess with this manually
exports.hasLabels = exports.isDev;
function cssLabels(bool) {
    exports.hasLabels = !!bool;
}
exports.cssLabels = cssLabels;
/**
 * Check if the passed value is a css rule.
 * CSS rule object must contain the key 'data-css-<id>'
 * @param rule
 */
function isLikeRule(rule) {
    var keys = Object.keys(rule).filter(function (x) { return x !== 'toString'; });
    if (keys.length !== 1) {
        return false;
    }
    return !!/data\-css\-([a-zA-Z0-9]+)/.exec(keys[0]);
}
exports.isLikeRule = isLikeRule;
// extracts id from a { 'data-css-<id>': ''} like object
/**
 * Get the id from a rule, the rule looks like { 'data-css-<id>': ''}
 * @param rule
 */
function idFor(rule) {
    var keys = Object.keys(rule).filter(function (x) { return x !== 'toString'; });
    if (keys.length !== 1) {
        throw new Error('not a rule');
    }
    var match = exports.idRegex.exec(keys[0]);
    if (!match) {
        throw new Error('not a rule');
    }
    return match[1];
}
exports.idFor = idFor;
exports.nullRule = {
    'data-css-nil': ''
};
Object.defineProperty(exports.nullRule, 'toString', {
    enumerable: false, value: function () { return 'css-nil'; }
});
/**
 * Create a selector string. Selector string looks like '.css-1j2tyha,[data-css-1j2tyha]'
 * @param id
 * @param path
 */
function selector(id, path) {
    if (id == null) {
        return path.replace(/\&/g, '');
    }
    if (path == null) {
        return ".css-" + id + ",[data-css-" + id + "]";
    }
    var x = path
        .split(',')
        .map(function (x) { return x.indexOf('&') >= 0 ?
        [x.replace(/\&/mg, ".css-" + id), x.replace(/\&/mg, "[data-css-" + id + "]")].join(',') // todo - make sure each sub selector has an &
        : ".css-" + id + x + ",[data-css-" + id + "]" + x; })
        .join(',');
    if (Simulations_1.canSimulate && /^\&\:/.exec(path) && !/\s/.exec(path)) {
        x += ",.css-" + id + "[data-simulate-" + simple(path) + "],[data-css-" + id + "][data-simulate-" + simple(path) + "]";
    }
    return x;
}
exports.selector = selector;
/**
 * Remove every charachter that is not a letter or a number and turn the capital-case to lowercase.
 *
 * Ex: simple('abc$%#12 3abc') => return 'abc123abc'
 * @param str
 */
function simple(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}
exports.simple = simple;
// flatten a nested array
/**
 * Flatten a nasted array, destructure an array of arrays into a single simple array
 * Example: input is arr1[arr2[val1, val2, val3], val4, val5 ,arr3[val6, val7] ] =>
 * Output is : arr [val1, val2, val3, val4, val5, val6, val7]
 * @param inArr
 */
function flatten(inArr) {
    var arr = [];
    for (var _i = 0, inArr_1 = inArr; _i < inArr_1.length; _i++) {
        var value = inArr_1[_i];
        if (Array.isArray(value)) {
            arr = arr.concat(flatten(value));
        }
        else {
            arr = arr.concat(value);
        }
    }
    return arr;
}
exports.flatten = flatten;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;

var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var clean_1 = __webpack_require__(6);
// a flag to enable simulation meta tags on dom nodes
// defaults to true in dev mode. recommend *not* to
// toggle often.
exports.canSimulate = utils_1.isDev;
// we use these flags for issuing warnings when simulate is called
// in prod / in incorrect order
var warned1 = false, warned2 = false;
// toggles simulation activity. shouldn't be needed in most cases
function simulations(bool) {
    if (bool === void 0) { bool = true; }
    exports.canSimulate = !!bool;
}
exports.simulations = simulations;
// use this on dom nodes to 'simulate' pseudoclasses
// <div {...hover({ color: 'red' })} {...simulate('hover', 'visited')}>...</div>
// you can even send in some weird ones, as long as it's in simple format
// and matches an existing rule on the element
// eg simulate('nthChild2', ':hover:active') etc
function simulate() {
    var pseudos = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pseudos[_i] = arguments[_i];
    }
    pseudos = clean_1.clean(pseudos);
    if (!pseudos) {
        return {};
    }
    if (!exports.canSimulate) {
        if (!warned1) {
            console.warn("can't simulate without once calling simulations(true)"); // eslint-disable-line no-console
            warned1 = true;
        }
        if (!utils_1.isDev && !utils_1.isTest && !warned2) {
            console.warn("don't use simulation outside dev"); // eslint-disable-line no-console
            warned2 = true;
        }
        return {};
    }
    return pseudos.reduce(function (o, p) { return (o["data-simulate-" + utils_1.simple(p)] = '', o); }, {});
}
exports.simulate = simulate;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var GenericCache_1 = __webpack_require__(36);
exports.GenericCache = GenericCache_1.GenericCache;
/**
 * This variable will be used to store each created style object using the hash value of this object (id) as a key
 */
exports.registered = new GenericCache_1.GenericCache();
/**
 * This vaiable will be used to store each created rule using the hash value of Spec object(id) as a key.
 *
 * A cached rule looks like: {data-css-<id>: ''}
 */
exports.ruleCache = new GenericCache_1.GenericCache();
/**
 * Store if a rule is successfully inserted in the StyleSheet (in <style> tag) using the id as a key
 */
exports.inserted = new GenericCache_1.GenericCache();
function getRegistered(rule) {
    if (utils_1.isLikeRule(rule)) {
        var ret = exports.registered.get(utils_1.idFor(rule));
        if (ret == null) {
            throw new Error('[glamor] an unexpected rule cache miss occurred. This is probably a sign of multiple glamor instances in your app. See https://github.com/threepointone/glamor/issues/79');
        }
        return ret;
    }
    return rule;
}
exports.getRegistered = getRegistered;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PluginSet_1 = __webpack_require__(11);
var prefix_1 = __webpack_require__(13);
var fallbacks_1 = __webpack_require__(12);
var StyleSheet_1 = __webpack_require__(8);
var utils_1 = __webpack_require__(0);
exports.isLikeRule = utils_1.isLikeRule;
exports.cssLabels = utils_1.cssLabels;
var css_1 = __webpack_require__(10);
exports.cssFor = css_1.cssFor;
var cache_1 = __webpack_require__(3);
var MultiIndexCache_1 = __webpack_require__(9);
var cachedCss = (typeof WeakMap !== 'undefined') ? MultiIndexCache_1.multiIndexCache(css_1.generateCss, function (spec) { return cache_1.registered.has(spec.toString().substring(4)); }) : css_1.generateCss;
exports.styleSheet = new StyleSheet_1.StyleSheet();
exports.styleSheet.inject();
exports.plugins = new PluginSet_1.PluginSet([prefix_1.prefix, fallbacks_1.fallbacks]);
exports.keyframesPlugins = new PluginSet_1.PluginSet([prefix_1.prefix]);
function speedy(bool) {
    return exports.styleSheet.speedy(bool);
}
exports.speedy = speedy;
function css() {
    // if (rules[0] && rules[0].length && rules[0].raw) {
    //   throw new Error('you forgot to include glamor/babel in your babel plugins.')
    // }
    var rules = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rules[_i] = arguments[_i];
    }
    var cleanedRules = utils_1.clean(rules);
    if (!cleanedRules) {
        return utils_1.nullRule;
    }
    return cachedCss(cleanedRules);
}
exports.css = css;
(function (css_2) {
    function insert(css) {
        var spec = {
            id: utils_1.hashify(css),
            css: css,
            type: 'raw'
        };
        cache_1.registered.add(spec.id, spec);
        if (!cache_1.inserted.has(spec.id)) {
            exports.styleSheet.insert(spec.css);
            cache_1.inserted.add(spec.id, true);
        }
    }
    css_2.insert = insert;
    function global(selector, style) {
        return css.insert(css_1.toCSS({ selector: selector, style: style }));
    }
    css_2.global = global;
    function keyframes(arg1, arg2) {
        var name = 'animation';
        var kfs;
        if (arg2 != null) {
            name = arg1;
            kfs = arg2;
        }
        else {
            kfs = arg1;
        }
        // do not ignore empty keyframe definitions for now.
        kfs = utils_1.clean(kfs) || {};
        var spec = {
            id: utils_1.hashify(name, kfs),
            type: 'keyframes',
            name: name,
            keyframes: kfs
        };
        cache_1.registered.add(spec.id, spec);
        css_1.insertKeyframe(spec);
        return name + '_' + spec.id;
    }
    css_2.keyframes = keyframes;
    function fontFace(font) {
        font = utils_1.clean(font);
        var spec = {
            id: utils_1.hashify(font),
            type: 'font-face',
            font: font
        };
        cache_1.registered.add(spec.id, spec);
        css_1.insertFontFace(spec);
        return font.fontFamily;
    }
    css_2.fontFace = fontFace;
})(css || (css = {}));
exports.css = css;
var insertRule = css.insert, insertGlobal = css.global, keyframes = css.keyframes, fontFace = css.fontFace;
exports.insertRule = insertRule;
exports.insertGlobal = insertGlobal;
exports.keyframes = keyframes;
exports.fontFace = fontFace;
// rehydrate the insertion cache with ids sent from
// renderStatic / renderStaticOptimized
function rehydrate(ids) {
    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
        var id = ids_1[_i];
        cache_1.inserted.add(id, true);
    }
}
exports.rehydrate = rehydrate;
function flush() {
    cache_1.inserted.flush();
    cache_1.registered.flush();
    cache_1.ruleCache.flush();
    exports.styleSheet.flush();
    exports.styleSheet.inject();
}
exports.flush = flush;
var Simulations_1 = __webpack_require__(2);
exports.simulate = Simulations_1.simulate;
exports.simulations = Simulations_1.simulations;
exports.caches = {
    inserted: cache_1.inserted,
    registered: cache_1.registered
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Returns true for null, false, undefined and {}
function isFalsy(value) {
    return value === null ||
        value === undefined ||
        value === false ||
        (typeof value === 'object' && Object.keys(value).length === 0);
}
function cleanObject(object) {
    if (isFalsy(object)) {
        return null;
    }
    if (typeof object !== 'object') {
        return object;
    }
    var acc = {}, keys = Object.keys(object), hasFalsy = false;
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var value = object[key];
        var filteredValue = clean(value);
        if (filteredValue === null || filteredValue !== value) {
            hasFalsy = true;
        }
        if (filteredValue !== null) {
            acc[key] = filteredValue;
        }
    }
    return Object.keys(acc).length === 0 ? null : hasFalsy ? acc : object;
}
function cleanArray(rules) {
    var hasFalsy = false;
    var filtered = [];
    rules.forEach(function (rule) {
        var filteredRule = clean(rule);
        if (filteredRule === null || filteredRule !== rule) {
            hasFalsy = true;
        }
        if (filteredRule !== null) {
            filtered.push(filteredRule);
        }
    });
    return filtered.length === 0 ? null :
        hasFalsy ? filtered : rules;
}
/**
 * Takes style array or object provided by user and clears all the falsy data.
 *
 *  If there is no styles left after filtration returns null
 * @param input
 */
function clean(input) {
    return Array.isArray(input) ? cleanArray(input) : cleanObject(input);
}
exports.clean = clean;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @param str
 * @param seed
 *
 * this function will calculate the hash value and return the value as a number
 */
Object.defineProperty(exports, "__esModule", { value: true });
function calculateHash(str, seed) {
    var m = 0x5bd1e995;
    var r = 24;
    var h = seed ^ str.length;
    var length = str.length;
    var currentIndex = 0;
    while (length >= 4) {
        var k = UInt32(str, currentIndex);
        k = Umul32(k, m);
        k ^= k >>> r;
        k = Umul32(k, m);
        h = Umul32(h, m);
        h ^= k;
        currentIndex += 4;
        length -= 4;
    }
    switch (length) {
        case 3:
            h ^= UInt16(str, currentIndex);
            h ^= str.charCodeAt(currentIndex + 2) << 16;
            h = Umul32(h, m);
            break;
        case 2:
            h ^= UInt16(str, currentIndex);
            h = Umul32(h, m);
            break;
        case 1:
            h ^= str.charCodeAt(currentIndex);
            h = Umul32(h, m);
            break;
    }
    h ^= h >>> 13;
    h = Umul32(h, m);
    h ^= h >>> 15;
    return h >>> 0;
}
function UInt32(str, pos) {
    return (str.charCodeAt(pos++)) +
        (str.charCodeAt(pos++) << 8) +
        (str.charCodeAt(pos++) << 16) +
        (str.charCodeAt(pos) << 24);
}
function UInt16(str, pos) {
    return (str.charCodeAt(pos++)) +
        (str.charCodeAt(pos++) << 8);
}
function Umul32(n, m) {
    n = n | 0;
    m = m | 0;
    var nlo = n & 0xffff;
    var nhi = n >>> 16;
    var res = ((nlo * m) + (((nhi * m) & 0xffff) << 16)) | 0;
    return res;
}
/**
 *
 * @param str the value that have to be hashed
 * @param seed
 *
 */
function doHash(str, seed) {
    return seed ? calculateHash(str, seed).toString(36) : calculateHash(str).toString(36);
}
exports.doHash = doHash;
/**
 *
 * @param objs
 *
 * this function accept many objects of different types and calculate the hash value for all of them
 */
function hashify() {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    var str = '';
    for (var i = 0; i < objs.length; i++) {
        str += JSON.stringify(objs[i]);
    }
    return calculateHash(str).toString(36);
}
exports.hashify = hashify;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side


// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject()
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents


*/
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var oldIE = (function () {
    if (utils_1.isBrowser) {
        var div = document.createElement('div');
        div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
        return div.getElementsByTagName('i').length === 1;
    }
})();
var ServerSheet = (function () {
    function ServerSheet() {
        this.cssRules = [];
    }
    ServerSheet.prototype.insertRule = function (rule, isImportRule) {
        if (isImportRule === void 0) { isImportRule = false; }
        if (isImportRule) {
            this.cssRules.unshift({ cssText: rule });
        }
        else {
            this.cssRules.push({ cssText: rule });
        }
    };
    ServerSheet.prototype.getCSSRules = function () {
        return this.cssRules;
    };
    ServerSheet.prototype.emptyCssRules = function () {
        this.cssRules = [];
    };
    return ServerSheet;
}());
var StyleSheet = (function () {
    function StyleSheet(speedy, maxRules) {
        if (speedy === void 0) { speedy = !utils_1.isDev; }
        if (maxRules === void 0) { maxRules = (utils_1.isBrowser && oldIE) ? 4000 : 65000; }
        this.tags = []; // all the <style> tags inside our dom
        this.injected = false; // determine if the <Style> tags are already injected inside the head of the do
        this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
        this.sheet = undefined;
        this.tags = [];
        this.maxRules = maxRules;
        this.ruleCounter = 0;
    }
    StyleSheet.prototype.getSheet = function () {
        return sheetForTag(last(this.tags));
    };
    /**
     * create <style> tag and inject it in the dom if it's browser einvironment
     * otherwise it will create an array of cssRules within the StyleSheet object
     */
    StyleSheet.prototype.inject = function () {
        if (this.injected) {
            throw new Error('already injected stylesheet!');
        }
        if (utils_1.isBrowser) {
            this.tags[0] = makeStyleTag();
        }
        else {
            // server side 'polyfill'. just enough behavior to be useful.
            this.sheet = new ServerSheet();
        }
        this.injected = true;
    };
    StyleSheet.prototype.speedy = function (speedy) {
        if (this.ruleCounter !== 0) {
            throw new Error("cannot change speedy mode after inserting any rule to sheet. Either call speedy(" + speedy + ") earlier in your app, or call flush() before speedy(" + speedy + ")");
        }
        this.isSpeedy = !!speedy;
    };
    /**
     * Insert a new css rule into the <style> tag when it's in the browser environment
     * @param rule
     */
    StyleSheet.prototype.insert = function (rule) {
        if (utils_1.isBrowser) {
            // this is the ultrafast version, works across browsers
            if (this.isSpeedy && this.getSheet().insertRule) {
                this.browInsert(rule);
            }
            else {
                if (rule.indexOf('@import') !== -1) {
                    var tag = last(this.tags);
                    tag.insertBefore(document.createTextNode(rule), tag.firstChild);
                }
                else {
                    last(this.tags).appendChild(document.createTextNode(rule));
                }
            }
        }
        else {
            // server side is pretty simple
            this.sheet.insertRule(rule, rule.indexOf('@import') !== -1);
        }
        this.ruleCounter++;
        if (utils_1.isBrowser && this.ruleCounter % this.maxRules === 0) {
            this.tags.push(makeStyleTag());
        }
        return this.ruleCounter - 1;
    };
    // delete(index) {
    //  // we insert a blank rule when 'deleting' so previously returned indexes remain stable
    //   return this.replace(index, '');
    // }
    StyleSheet.prototype.flush = function () {
        this.injected = false;
        if (utils_1.isBrowser) {
            this.tags.forEach(function (tag) { return tag.parentNode.removeChild(tag); });
            this.tags = [];
            this.sheet = null;
            this.ruleCounter = 0;
            // todo - look for remnants in document.styleSheets
        }
        else {
            // simpler on server
            //this.sheet.emptyCssRules();
            this.sheet.emptyCssRules();
        }
    };
    StyleSheet.prototype.rules = function () {
        if (!utils_1.isBrowser) {
            return this.sheet.getCSSRules();
        }
        var arr = [];
        this.tags.forEach(function (tag) { return arr.splice.apply(arr, [arr.length, 0].concat(Array.from(sheetForTag(tag).cssRules))); });
        return arr;
    };
    /**
     * Insert a new css rule into the <style> tag when it's in the browser environment
     * @param rule
     */
    StyleSheet.prototype.browInsert = function (rule) {
        // this weirdness for perf, and chrome's weird bug
        // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
        try {
            var sheet = this.getSheet();
            sheet.insertRule(rule, rule.indexOf('@import') !== -1 ? 0 : sheet.cssRules.length);
        }
        catch (e) {
            if (utils_1.isDev) {
                // might need beter dx for this
                console.warn('whoops, illegal rule inserted', rule); // eslint-disable-line no-console
            }
        }
    };
    return StyleSheet;
}());
exports.StyleSheet = StyleSheet;
function makeStyleTag() {
    var tag = document.createElement('style');
    tag.type = 'text/css';
    tag.setAttribute('data-glamor', '');
    tag.appendChild(document.createTextNode(''));
    (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
    return tag;
}
function last(arr) {
    return arr[arr.length - 1];
}
function sheetForTag(tag) {
    if (tag.sheet) {
        return tag.sheet;
    }
    // this weirdness brought to you by firefox
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode === tag) {
            return document.styleSheets[i];
        }
    }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
/**
 * Optimization: Cache the results of calling a function with multiple parameters, in order to prevent re-excuting the function when it has been called
 * with the same parameters more than one time.
 * more explenation can be found here:
 * https://github.com/threepointone/glamor/blob/master/docs/weakmaps.md
 *
 * @param fn the dunction which we want to cache its results
 * @param check : optional function that returns boolean, when it's not needed do not send anything
 *
 * example: if we have a function fn(...args) which sum numbers and return the result
 * 1- calling fn(1,2,3): the function will be excuted normally and the result will be cached
 * 2- calling fn(1,3) : the function also will be excuted normally and the result will be cached.
 * 3- calling fn(1,2,3): the function will not be excuted because we called it one timebefore with the same parameters (in the same order!),
 * a cached result will be returned in this case
 */
// For future aspects and in order to write better typing, looking regularly at this link to implement it when it's finished
// https://github.com/Microsoft/TypeScript/issues/5453
function multiIndexCache(fn, check) {
    if (check === void 0) { check = function (spec) { return true; }; }
    var inputCaches = typeof WeakMap !== 'undefined' ?
        [new WeakMap(), new WeakMap(), new WeakMap(), new WeakMap(), new WeakMap(), new WeakMap(), new WeakMap(), new WeakMap()] :
        [];
    var warnedWeakMapError = false;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (inputCaches[args.length - 1]) {
            var coi = inputCaches[args.length - 1];
            var ctr = 0;
            while (ctr < args.length - 1) {
                if (coi.has(args[ctr]) === false) {
                    coi.set(args[ctr], new WeakMap());
                }
                coi = coi.get(args[ctr]);
                ctr++;
            }
            if (coi.has(args[args.length - 1])) {
                var ret = coi.get(args[ctr]);
                // This if statement is not really important if we want to reuse the MultiIndexCache somewhere else, 
                // But in our case we need some kind of checking, therefore we send this check function as parameter
                if (check(ret)) {
                    return ret;
                }
            }
        }
        var value = fn.apply(void 0, args);
        if (inputCaches[args.length - 1]) {
            var ctr = 0, coi = inputCaches[args.length - 1];
            while (ctr < args.length - 1) {
                coi = coi.get(args[ctr]);
                ctr++;
            }
            try {
                coi.set(args[ctr], value);
            }
            catch (err) {
                if (index_1.isDev && !warnedWeakMapError) {
                    warnedWeakMapError = true;
                    console.warn.apply(console, ['failed setting the WeakMap cache for args:'].concat(args)); // eslint-disable-line no-console
                    console.warn('this should NOT happen, please file a bug on the github repo.'); // eslint-disable-line no-console
                }
            }
        }
        return value;
    });
}
exports.multiIndexCache = multiIndexCache;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var index_2 = __webpack_require__(5);
var react_css_property_operations_1 = __webpack_require__(35);
var cache_1 = __webpack_require__(3);
var hash_1 = __webpack_require__(7);
var helper_1 = __webpack_require__(37);
/**
 * A Style object will be destructured into new object style with four main keys { plain:, selects:, medias:, supports:}
 *
 * 1- 'plain' contains the plain css styles like (color: red)
 *
 * 2- 'selects' contains all css styles that depend on selectors like (. , & , : , > ) ex: &:hover { }
 *
 * 3- 'medias' contains all css styles that depend on @media selectors
 *
 * 4- 'supports' contains all css styles that depend on @support selectors
 * @param style
 *
 * example:
 * input {label: [], color: 'red',
 *        &:hover: {color: 'blue'},
 *        @media(min-width: 300px): {color: 'green', &:hover: {color: ...}, .a & .c:{color: ...}}}
 *
 * output {plain: {color: 'red'},
 *          selects: {&:hover: {color: 'blue'}},
 *          medias: {@media(min-width: 300px): {plain: {color: ...}, selects: {&:hover: ..., .a & .c: ...}, medias: null, supports: null}},
 *          supports: null}
 *
 * Notice the deep destructuring in the medias object
 *
 */
function deconstruct(style) {
    // we can be sure it's not infinitely nested here
    var plain = null;
    var selects = null;
    var medias = null;
    var supports = null;
    Object.keys(style).forEach(function (key) {
        if (key.indexOf('&') >= 0) {
            selects = selects || {};
            selects[key] = style[key];
        }
        else if (key.indexOf('@media') === 0) {
            medias = medias || {};
            medias[key] = deconstruct(style[key]);
        }
        else if (key.indexOf('@supports') === 0) {
            supports = supports || {};
            supports[key] = deconstruct(style[key]);
        }
        else if (key === 'label') {
            if (style.label.length > 0) {
                plain = plain || {};
                plain.label = index_1.hasLabels ? style.label.join('.') : '';
            }
        }
        else {
            plain = plain || {};
            plain[key] = style[key];
        }
    });
    return { plain: plain, selects: selects, medias: medias, supports: supports };
}
/**
 * create an array of strings which contains the different styles with its selectors.
 *
 * The result could look like:
 *
 *  ['.css-1j2tyha,[data-css-1j2tyha]{color:green;}', '.css-1j2tyha:hover,[ data-css-1j2tyha]:hover{color:yellow;}']
 * @param id the hash value of the style.
 * @param style
 */
function deconstructedStyleToCSS(id, style) {
    var css = [];
    // plugins here
    var plain = style.plain, selects = style.selects, medias = style.medias, supports = style.supports;
    if (plain) {
        css.push(toCSS({ style: plain, selector: index_1.selector(id) }));
    }
    if (selects) {
        Object.keys(selects).forEach(function (key) {
            return css.push(toCSS({ style: selects[key], selector: index_1.selector(id, key) }));
        });
    }
    if (medias) {
        Object.keys(medias).forEach(function (key) {
            return css.push(key + "{" + deconstructedStyleToCSS(id, medias[key]).join('') + "}");
        });
    }
    if (supports) {
        Object.keys(supports).forEach(function (key) {
            return css.push(key + "{" + deconstructedStyleToCSS(id, supports[key]).join('') + "}");
        });
    }
    return css;
}
/**
 *
 * @param param0
 *
 * example
 * selector: .css-1j2tyha:hover,[data-css-1j2tyha]:hover'
 * style: {color: 'blue'}
 * result:'.css-1j2tyha:hover,[data-css-1j2tyha]:hover{color:blue;}'
 */
function toCSS(_a) {
    var selector = _a.selector, style = _a.style;
    var result = index_2.plugins.transform({ selector: selector, style: style });
    return result.selector + "{" + react_css_property_operations_1.createMarkupForStyles(result.style) + "}";
}
exports.toCSS = toCSS;
/**
 * Insert the style rule into the StyleSheet (in other words: insert the rule into the <style> tag)
 * @param spec
 */
function insert(spec) {
    if (!cache_1.inserted.has(spec.id)) {
        cache_1.inserted.add(spec.id, true);
        var deconstructed = deconstruct(spec.style);
        deconstructedStyleToCSS(spec.id, deconstructed).map(function (cssRule) { return index_2.styleSheet.insert(cssRule); });
    }
}
// mutable! modifies dest.
/**
 * build a simplified style object by combining between corrospending @media and @support queries
 * at the end we will get an object that is ready to be destructured
 * @param dest
 * @param param1
 */
function build(dest, _a) {
    var _b = _a.selector, selector = _b === void 0 ? '' : _b, _c = _a.mq, mq = _c === void 0 ? '' : _c, _d = _a.supp, supp = _d === void 0 ? '' : _d, _e = _a.src, src = _e === void 0 ? {} : _e;
    var source;
    if (!Array.isArray(src)) {
        source = [src];
    }
    else {
        source = src;
    }
    source = index_1.flatten(source);
    source.forEach(function (_src) {
        if (index_1.isLikeRule(_src)) {
            var reg = cache_1.getRegistered(_src);
            if (reg.type !== 'css') {
                throw new Error('cannot merge this rule');
            }
            _src = reg.style;
        }
        _src = index_1.clean(_src);
        if (_src && _src.composes) {
            build(dest, { selector: selector, mq: mq, supp: supp, src: _src.composes });
        }
        Object.keys(_src || {}).forEach(function (key) {
            if (helper_1.isSelector(key)) {
                if (key === '::placeholder') {
                    build(dest, { selector: helper_1.joinSelectors(selector, '::-webkit-input-placeholder'), mq: mq, supp: supp, src: _src[key] });
                    build(dest, { selector: helper_1.joinSelectors(selector, '::-moz-placeholder'), mq: mq, supp: supp, src: _src[key] });
                    build(dest, { selector: helper_1.joinSelectors(selector, '::-ms-input-placeholder'), mq: mq, supp: supp, src: _src[key] });
                }
                build(dest, { selector: helper_1.joinSelectors(selector, key), mq: mq, supp: supp, src: _src[key] });
            }
            else if (helper_1.isMediaQuery(key)) {
                build(dest, { selector: selector, mq: helper_1.joinMediaQueries(mq, key), supp: supp, src: _src[key] });
            }
            else if (helper_1.isSupports(key)) {
                build(dest, { selector: selector, mq: mq, supp: helper_1.joinSupports(supp, key), src: _src[key] });
            }
            else if (key === 'composes') {
                // ignore, we already dealth with it
            }
            else {
                var _dest = dest;
                if (supp) {
                    _dest[supp] = _dest[supp] || {};
                    _dest = _dest[supp];
                }
                if (mq) {
                    _dest[mq] = _dest[mq] || {};
                    _dest = _dest[mq];
                }
                if (selector) {
                    _dest[selector] = _dest[selector] || {};
                    _dest = _dest[selector];
                }
                if (key === 'label') {
                    if (index_1.hasLabels) {
                        dest.label = dest.label.concat(_src.label);
                    }
                }
                else {
                    _dest[key] = _src[key];
                }
            }
        });
    });
}
// let cachedCss = (typeof WeakMap !== 'undefined') ? multiIndexCache(_css) : _css;
function generateCss(rules) {
    // hard to type because before build() label is a string, after
    var style = { label: [] };
    build(style, { src: rules }); // mutative! but worth it.
    var spec = {
        id: hash_1.hashify(style),
        style: style,
        label: index_1.hasLabels ? style.label.join('.') : '',
        type: 'css'
    };
    return toRule(spec);
}
exports.generateCss = generateCss;
/**
 * get the actual output for the css function, the result will look similer to:
 * {data-css-1j2tyha: ''}
 * @param spec
 */
function toRule(spec) {
    cache_1.registered.add(spec.id, spec);
    insert(spec);
    if (cache_1.ruleCache.has(spec.id)) {
        return cache_1.ruleCache.get(spec.id);
    }
    var ret = (_a = {}, _a["data-css-" + spec.id] = index_1.hasLabels ? spec.label || '' : '', _a);
    Object.defineProperty(ret, 'toString', {
        enumerable: false, value: function () { return 'css-' + spec.id; }
    });
    cache_1.ruleCache.add(spec.id, ret);
    return ret;
    var _a;
}
function cssFor() {
    var rules = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rules[_i] = arguments[_i];
    }
    var r = index_1.clean(rules);
    return r ? r.map(function (r) {
        var style = { label: [] };
        build(style, { src: r }); // mutative! but worth it.
        return deconstructedStyleToCSS(hash_1.hashify(style), deconstruct(style)).join('');
    }).join('') : '';
}
exports.cssFor = cssFor;
function attribsFor() {
    var rules = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rules[_i] = arguments[_i];
    }
    var r = index_1.clean(rules);
    var htmlAttributes = r ? r.map(function (rule) {
        index_1.idFor(rule); // throwaway check for rule
        var key = Object.keys(rule)[0], value = rule[key];
        return key + "=\"" + (value || '') + "\"";
    }).join(' ') : '';
    return htmlAttributes;
}
exports.attribsFor = attribsFor;
function insertKeyframe(spec) {
    if (!cache_1.inserted.has(spec.id)) {
        var inner_1 = Object.keys(spec.keyframes).map(function (kf) {
            var result = index_2.keyframesPlugins.transform({ id: spec.id, name: kf, style: spec.keyframes[kf] });
            return result.name + "{" + react_css_property_operations_1.createMarkupForStyles(result.style) + "}";
        }).join('');
        ['-webkit-', '-moz-', '-o-', ''].forEach(function (prefix) {
            return index_2.styleSheet.insert("@" + prefix + "keyframes " + (spec.name + '_' + spec.id) + "{" + inner_1 + "}");
        });
        cache_1.inserted.add(spec.id, true);
    }
}
exports.insertKeyframe = insertKeyframe;
function insertFontFace(spec) {
    if (!cache_1.inserted.has(spec.id)) {
        index_2.styleSheet.insert("@font-face{" + react_css_property_operations_1.createMarkupForStyles(spec.font) + "}");
        cache_1.inserted.add(spec.id, true);
    }
}
exports.insertFontFace = insertFontFace;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PluginSet = (function () {
    function PluginSet(initial) {
        if (initial === void 0) { initial = []; }
        this.fns = initial;
    }
    /**
       * Takes a list of functions(plugins) as an input parameters and add them to the plugin set if they do not exist.
       *
       * Can be called like: add(func1, func2, ...)
       * @param functionsList an array of different functions to add it to
       */
    PluginSet.prototype.add = function () {
        var _this = this;
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        fns.forEach(function (fn) {
            if (_this.fns.indexOf(fn) >= 0) {
                if (true) {
                    console.warn('adding the same plugin again, ignoring');
                }
            }
            else {
                _this.fns = [fn].concat(_this.fns);
            }
        });
    };
    PluginSet.prototype.remove = function (fn) {
        this.fns = this.fns.filter(function (x) { return x !== fn; });
    };
    PluginSet.prototype.clear = function () {
        this.fns = [];
    };
    PluginSet.prototype.transform = function (o) {
        return this.fns.reduce(function (o, fn) { return fn(o); }, o);
    };
    return PluginSet;
}());
exports.PluginSet = PluginSet;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hyphenateStyleName = __webpack_require__(16);
var memoizeStringOnly = __webpack_require__(17);
var processStyleName = memoizeStringOnly(hyphenateStyleName);
function fallbacks(node) {
    var hasArray = Object.keys(node.style).map(function (x) { return Array.isArray(node.style[x]); }).indexOf(true) >= 0;
    if (hasArray) {
        var style_1 = node.style;
        var flattened = Object.keys(style_1).reduce(function (o, key) {
            return (__assign({}, o, (_a = {}, _a[key] = Array.isArray(style_1[key]) ? style_1[key].join("; " + processStyleName(key) + ": ") : style_1[key], _a)));
            var _a;
        }, {});
        return __assign({}, node, { style: flattened });
    }
    return node;
}
exports.fallbacks = fallbacks;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var createPrefixer = __webpack_require__(19);
var staticData = __webpack_require__(38).default;
var prefixAll = createPrefixer(staticData);
function prefix(node) {
    return __assign({}, node, { style: prefixAll(node.style) });
}
exports.prefix = prefix;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;

var _hyphenateStyleName = __webpack_require__(18);

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(15);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @typechecks static-only
 */



/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

module.exports = memoizeStringOnly;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function hyphenateStyleName(string) {
    return string in cache
    ? cache[string]
    : cache[string] = string
      .replace(uppercasePattern, '-$&')
      .toLowerCase()
      .replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPrefixer;

var _prefixProperty = __webpack_require__(33);

var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

var _prefixValue = __webpack_require__(34);

var _prefixValue2 = _interopRequireDefault(_prefixValue);

var _addNewValuesOnly = __webpack_require__(31);

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = __webpack_require__(32);

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;

  function prefixAll(style) {
    for (var property in style) {
      var value = style[property];

      // handle nested objects
      if ((0, _isObject2.default)(value)) {
        style[property] = prefixAll(value
        // handle array values
        );
      } else if (Array.isArray(value)) {
        var combinedValue = [];

        for (var i = 0, len = value.length; i < len; ++i) {
          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue;
        }
      } else {
        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        );if (_processedValue) {
          style[property] = _processedValue;
        }

        (0, _prefixProperty2.default)(prefixMap, property, style);
      }
    }

    return style;
  }

  return prefixAll;
}
module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;

var _isPrefixedValue = __webpack_require__(1);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#search=cross-fade
var prefixes = ['-webkit-', ''];
function crossFade(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;
var prefixes = ['-webkit-', '-moz-', ''];

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _isPrefixedValue = __webpack_require__(1);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-filter-function
var prefixes = ['-webkit-', ''];
function filter(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/filter\(/g, prefix + 'filter(');
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return values[value];
  }
}
module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxIE;
var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

function flexboxIE(property, value, style) {
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _isPrefixedValue = __webpack_require__(1);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;

var _isPrefixedValue = __webpack_require__(1);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-image-set
var prefixes = ['-webkit-', ''];
function imageSet(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/image-set\(/g, prefix + 'image-set(');
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky'];
  }
}
module.exports = exports['default'];

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateProperty = __webpack_require__(14);

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

var _isPrefixedValue = __webpack_require__(1);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

var _capitalizeString = __webpack_require__(4);

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap
    // if the property is already prefixed
    );var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
module.exports = exports['default'];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addNewValuesOnly;
function addIfNew(list, value) {
  if (list.indexOf(value) === -1) {
    list.push(value);
  }
}

function addNewValuesOnly(list, values) {
  if (Array.isArray(values)) {
    for (var i = 0, len = values.length; i < len; ++i) {
      addIfNew(list, values[i]);
    }
  } else {
    addIfNew(list, values);
  }
}
module.exports = exports["default"];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
function isObject(value) {
  return value instanceof Object && !Array.isArray(value);
}
module.exports = exports["default"];

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;

var _capitalizeString = __webpack_require__(4);

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var requiredPrefixes = prefixProperties[property];
    for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
    }
  }
}
module.exports = exports['default'];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    );if (processedValue) {
      return processedValue;
    }
  }
}
module.exports = exports["default"];

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var CSSProperty = __webpack_require__(3);
	var ExecutionEnvironment = __webpack_require__(4);
	var ReactInstrumentation = __webpack_require__(5);

	var camelizeStyleName = __webpack_require__(17);
	var dangerousStyleValue = __webpack_require__(19);
	var hyphenateStyleName = __webpack_require__(20);
	var memoizeStringOnly = __webpack_require__(22);
	var warning = __webpack_require__(8);

	var processStyleName = memoizeStringOnly(function (styleName) {
	  return hyphenateStyleName(styleName);
	});

	var hasShorthandPropertyBug = false;
	var styleFloatAccessor = 'cssFloat';
	if (ExecutionEnvironment.canUseDOM) {
	  var tempStyle = document.createElement('div').style;
	  try {
	    // IE8 throws "Invalid argument." if resetting shorthand style properties.
	    tempStyle.font = '';
	  } catch (e) {
	    hasShorthandPropertyBug = true;
	  }
	  // IE8 only supports accessing cssFloat (standard) as styleFloat
	  if (document.documentElement.style.cssFloat === undefined) {
	    styleFloatAccessor = 'styleFloat';
	  }
	}

	if (process.env.NODE_ENV !== 'production') {
	  // 'msTransform' is correct, but the other prefixes should be capitalized
	  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

	  // style values shouldn't contain a semicolon
	  var badStyleValueWithSemicolonPattern = /;\s*$/;

	  var warnedStyleNames = {};
	  var warnedStyleValues = {};
	  var warnedForNaNValue = false;

	  var warnHyphenatedStyleName = function (name, owner) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), checkRenderMessage(owner)) : void 0;
	  };

	  var warnBadVendoredStyleName = function (name, owner) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
	  };

	  var warnStyleValueWithSemicolon = function (name, value, owner) {
	    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	      return;
	    }

	    warnedStyleValues[value] = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
	  };

	  var warnStyleValueIsNaN = function (name, value, owner) {
	    if (warnedForNaNValue) {
	      return;
	    }

	    warnedForNaNValue = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
	  };

	  var checkRenderMessage = function (owner) {
	    if (owner) {
	      var name = owner.getName();
	      if (name) {
	        return ' Check the render method of `' + name + '`.';
	      }
	    }
	    return '';
	  };

	  /**
	   * @param {string} name
	   * @param {*} value
	   * @param {ReactDOMComponent} component
	   */
	  var warnValidStyle = function (name, value, component) {
	    var owner;
	    if (component) {
	      owner = component._currentElement._owner;
	    }
	    if (name.indexOf('-') > -1) {
	      warnHyphenatedStyleName(name, owner);
	    } else if (badVendoredStyleNamePattern.test(name)) {
	      warnBadVendoredStyleName(name, owner);
	    } else if (badStyleValueWithSemicolonPattern.test(value)) {
	      warnStyleValueWithSemicolon(name, value, owner);
	    }

	    if (typeof value === 'number' && isNaN(value)) {
	      warnStyleValueIsNaN(name, value, owner);
	    }
	  };
	}

	/**
	 * Operations for dealing with CSS properties.
	 */
	var CSSPropertyOperations = {

	  /**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   * The result should be HTML-escaped before insertion into the DOM.
	   *
	   * @param {object} styles
	   * @param {ReactDOMComponent} component
	   * @return {?string}
	   */
	  createMarkupForStyles: function (styles, component) {
	    var serialized = '';
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var styleValue = styles[styleName];
	      if (process.env.NODE_ENV !== 'production') {
	        warnValidStyle(styleName, styleValue, component);
	      }
	      if (styleValue != null) {
	        serialized += processStyleName(styleName) + ':';
	        serialized += dangerousStyleValue(styleName, styleValue, component) + ';';
	      }
	    }
	    return serialized || null;
	  },

	  /**
	   * Sets the value for multiple styles on a node.  If a value is specified as
	   * '' (empty string), the corresponding style property will be unset.
	   *
	   * @param {DOMElement} node
	   * @param {object} styles
	   * @param {ReactDOMComponent} component
	   */
	  setValueForStyles: function (node, styles, component) {
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onHostOperation({
	        instanceID: component._debugID,
	        type: 'update styles',
	        payload: styles
	      });
	    }

	    var style = node.style;
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      if (process.env.NODE_ENV !== 'production') {
	        warnValidStyle(styleName, styles[styleName], component);
	      }
	      var styleValue = dangerousStyleValue(styleName, styles[styleName], component);
	      if (styleName === 'float' || styleName === 'cssFloat') {
	        styleName = styleFloatAccessor;
	      }
	      if (styleValue) {
	        style[styleName] = styleValue;
	      } else {
	        var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
	        if (expansion) {
	          // Shorthand property that IE8 won't like unsetting, so unset each
	          // component to placate it
	          for (var individualStyleName in expansion) {
	            style[individualStyleName] = '';
	          }
	        } else {
	          style[styleName] = '';
	        }
	      }
	    }
	  }

	};

	module.exports = CSSPropertyOperations;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */

	var isUnitlessNumber = {
	  animationIterationCount: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridRow: true,
	  gridColumn: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};

	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundAttachment: true,
	    backgroundColor: true,
	    backgroundImage: true,
	    backgroundPositionX: true,
	    backgroundPositionY: true,
	    backgroundRepeat: true
	  },
	  backgroundPosition: {
	    backgroundPositionX: true,
	    backgroundPositionY: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  },
	  outline: {
	    outlineWidth: true,
	    outlineStyle: true,
	    outlineColor: true
	  }
	};

	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};

	module.exports = CSSProperty;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	// Trust the developer to only use ReactInstrumentation with a __DEV__ check

	var debugTool = null;

	if (process.env.NODE_ENV !== 'production') {
	  var ReactDebugTool = __webpack_require__(6);
	  debugTool = ReactDebugTool;
	}

	module.exports = { debugTool: debugTool };
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var ReactInvalidSetStateWarningHook = __webpack_require__(7);
	var ReactHostOperationHistoryHook = __webpack_require__(10);
	var ReactComponentTreeHook = __webpack_require__(11);
	var ExecutionEnvironment = __webpack_require__(4);

	var performanceNow = __webpack_require__(15);
	var warning = __webpack_require__(8);

	var hooks = [];
	var didHookThrowForEvent = {};

	function callHook(event, fn, context, arg1, arg2, arg3, arg4, arg5) {
	  try {
	    fn.call(context, arg1, arg2, arg3, arg4, arg5);
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' ? warning(didHookThrowForEvent[event], 'Exception thrown by hook while handling %s: %s', event, e + '\n' + e.stack) : void 0;
	    didHookThrowForEvent[event] = true;
	  }
	}

	function emitEvent(event, arg1, arg2, arg3, arg4, arg5) {
	  for (var i = 0; i < hooks.length; i++) {
	    var hook = hooks[i];
	    var fn = hook[event];
	    if (fn) {
	      callHook(event, fn, hook, arg1, arg2, arg3, arg4, arg5);
	    }
	  }
	}

	var isProfiling = false;
	var flushHistory = [];
	var lifeCycleTimerStack = [];
	var currentFlushNesting = 0;
	var currentFlushMeasurements = [];
	var currentFlushStartTime = 0;
	var currentTimerDebugID = null;
	var currentTimerStartTime = 0;
	var currentTimerNestedFlushDuration = 0;
	var currentTimerType = null;

	var lifeCycleTimerHasWarned = false;

	function clearHistory() {
	  ReactComponentTreeHook.purgeUnmountedComponents();
	  ReactHostOperationHistoryHook.clearHistory();
	}

	function getTreeSnapshot(registeredIDs) {
	  return registeredIDs.reduce(function (tree, id) {
	    var ownerID = ReactComponentTreeHook.getOwnerID(id);
	    var parentID = ReactComponentTreeHook.getParentID(id);
	    tree[id] = {
	      displayName: ReactComponentTreeHook.getDisplayName(id),
	      text: ReactComponentTreeHook.getText(id),
	      updateCount: ReactComponentTreeHook.getUpdateCount(id),
	      childIDs: ReactComponentTreeHook.getChildIDs(id),
	      // Text nodes don't have owners but this is close enough.
	      ownerID: ownerID || parentID && ReactComponentTreeHook.getOwnerID(parentID) || 0,
	      parentID: parentID
	    };
	    return tree;
	  }, {});
	}

	function resetMeasurements() {
	  var previousStartTime = currentFlushStartTime;
	  var previousMeasurements = currentFlushMeasurements;
	  var previousOperations = ReactHostOperationHistoryHook.getHistory();

	  if (currentFlushNesting === 0) {
	    currentFlushStartTime = 0;
	    currentFlushMeasurements = [];
	    clearHistory();
	    return;
	  }

	  if (previousMeasurements.length || previousOperations.length) {
	    var registeredIDs = ReactComponentTreeHook.getRegisteredIDs();
	    flushHistory.push({
	      duration: performanceNow() - previousStartTime,
	      measurements: previousMeasurements || [],
	      operations: previousOperations || [],
	      treeSnapshot: getTreeSnapshot(registeredIDs)
	    });
	  }

	  clearHistory();
	  currentFlushStartTime = performanceNow();
	  currentFlushMeasurements = [];
	}

	function checkDebugID(debugID) {
	  var allowRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (allowRoot && debugID === 0) {
	    return;
	  }
	  if (!debugID) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDebugTool: debugID may not be empty.') : void 0;
	  }
	}

	function beginLifeCycleTimer(debugID, timerType) {
	  if (currentFlushNesting === 0) {
	    return;
	  }
	  if (currentTimerType && !lifeCycleTimerHasWarned) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	    lifeCycleTimerHasWarned = true;
	  }
	  currentTimerStartTime = performanceNow();
	  currentTimerNestedFlushDuration = 0;
	  currentTimerDebugID = debugID;
	  currentTimerType = timerType;
	}

	function endLifeCycleTimer(debugID, timerType) {
	  if (currentFlushNesting === 0) {
	    return;
	  }
	  if (currentTimerType !== timerType && !lifeCycleTimerHasWarned) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	    lifeCycleTimerHasWarned = true;
	  }
	  if (isProfiling) {
	    currentFlushMeasurements.push({
	      timerType: timerType,
	      instanceID: debugID,
	      duration: performanceNow() - currentTimerStartTime - currentTimerNestedFlushDuration
	    });
	  }
	  currentTimerStartTime = 0;
	  currentTimerNestedFlushDuration = 0;
	  currentTimerDebugID = null;
	  currentTimerType = null;
	}

	function pauseCurrentLifeCycleTimer() {
	  var currentTimer = {
	    startTime: currentTimerStartTime,
	    nestedFlushStartTime: performanceNow(),
	    debugID: currentTimerDebugID,
	    timerType: currentTimerType
	  };
	  lifeCycleTimerStack.push(currentTimer);
	  currentTimerStartTime = 0;
	  currentTimerNestedFlushDuration = 0;
	  currentTimerDebugID = null;
	  currentTimerType = null;
	}

	function resumeCurrentLifeCycleTimer() {
	  var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop(),
	      startTime = _lifeCycleTimerStack$.startTime,
	      nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime,
	      debugID = _lifeCycleTimerStack$.debugID,
	      timerType = _lifeCycleTimerStack$.timerType;

	  var nestedFlushDuration = performanceNow() - nestedFlushStartTime;
	  currentTimerStartTime = startTime;
	  currentTimerNestedFlushDuration += nestedFlushDuration;
	  currentTimerDebugID = debugID;
	  currentTimerType = timerType;
	}

	var lastMarkTimeStamp = 0;
	var canUsePerformanceMeasure =
	// $FlowFixMe https://github.com/facebook/flow/issues/2345
	typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

	function shouldMark(debugID) {
	  if (!isProfiling || !canUsePerformanceMeasure) {
	    return false;
	  }
	  var element = ReactComponentTreeHook.getElement(debugID);
	  if (element == null || typeof element !== 'object') {
	    return false;
	  }
	  var isHostElement = typeof element.type === 'string';
	  if (isHostElement) {
	    return false;
	  }
	  return true;
	}

	function markBegin(debugID, markType) {
	  if (!shouldMark(debugID)) {
	    return;
	  }

	  var markName = debugID + '::' + markType;
	  lastMarkTimeStamp = performanceNow();
	  performance.mark(markName);
	}

	function markEnd(debugID, markType) {
	  if (!shouldMark(debugID)) {
	    return;
	  }

	  var markName = debugID + '::' + markType;
	  var displayName = ReactComponentTreeHook.getDisplayName(debugID) || 'Unknown';

	  // Chrome has an issue of dropping markers recorded too fast:
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=640652
	  // To work around this, we will not report very small measurements.
	  // I determined the magic number by tweaking it back and forth.
	  // 0.05ms was enough to prevent the issue, but I set it to 0.1ms to be safe.
	  // When the bug is fixed, we can `measure()` unconditionally if we want to.
	  var timeStamp = performanceNow();
	  if (timeStamp - lastMarkTimeStamp > 0.1) {
	    var measurementName = displayName + ' [' + markType + ']';
	    performance.measure(measurementName, markName);
	  }

	  performance.clearMarks(markName);
	  performance.clearMeasures(measurementName);
	}

	var ReactDebugTool = {
	  addHook: function (hook) {
	    hooks.push(hook);
	  },
	  removeHook: function (hook) {
	    for (var i = 0; i < hooks.length; i++) {
	      if (hooks[i] === hook) {
	        hooks.splice(i, 1);
	        i--;
	      }
	    }
	  },
	  isProfiling: function () {
	    return isProfiling;
	  },
	  beginProfiling: function () {
	    if (isProfiling) {
	      return;
	    }

	    isProfiling = true;
	    flushHistory.length = 0;
	    resetMeasurements();
	    ReactDebugTool.addHook(ReactHostOperationHistoryHook);
	  },
	  endProfiling: function () {
	    if (!isProfiling) {
	      return;
	    }

	    isProfiling = false;
	    resetMeasurements();
	    ReactDebugTool.removeHook(ReactHostOperationHistoryHook);
	  },
	  getFlushHistory: function () {
	    return flushHistory;
	  },
	  onBeginFlush: function () {
	    currentFlushNesting++;
	    resetMeasurements();
	    pauseCurrentLifeCycleTimer();
	    emitEvent('onBeginFlush');
	  },
	  onEndFlush: function () {
	    resetMeasurements();
	    currentFlushNesting--;
	    resumeCurrentLifeCycleTimer();
	    emitEvent('onEndFlush');
	  },
	  onBeginLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onBeginLifeCycleTimer', debugID, timerType);
	    markBegin(debugID, timerType);
	    beginLifeCycleTimer(debugID, timerType);
	  },
	  onEndLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    endLifeCycleTimer(debugID, timerType);
	    markEnd(debugID, timerType);
	    emitEvent('onEndLifeCycleTimer', debugID, timerType);
	  },
	  onBeginProcessingChildContext: function () {
	    emitEvent('onBeginProcessingChildContext');
	  },
	  onEndProcessingChildContext: function () {
	    emitEvent('onEndProcessingChildContext');
	  },
	  onHostOperation: function (operation) {
	    checkDebugID(operation.instanceID);
	    emitEvent('onHostOperation', operation);
	  },
	  onSetState: function () {
	    emitEvent('onSetState');
	  },
	  onSetChildren: function (debugID, childDebugIDs) {
	    checkDebugID(debugID);
	    childDebugIDs.forEach(checkDebugID);
	    emitEvent('onSetChildren', debugID, childDebugIDs);
	  },
	  onBeforeMountComponent: function (debugID, element, parentDebugID) {
	    checkDebugID(debugID);
	    checkDebugID(parentDebugID, true);
	    emitEvent('onBeforeMountComponent', debugID, element, parentDebugID);
	    markBegin(debugID, 'mount');
	  },
	  onMountComponent: function (debugID) {
	    checkDebugID(debugID);
	    markEnd(debugID, 'mount');
	    emitEvent('onMountComponent', debugID);
	  },
	  onBeforeUpdateComponent: function (debugID, element) {
	    checkDebugID(debugID);
	    emitEvent('onBeforeUpdateComponent', debugID, element);
	    markBegin(debugID, 'update');
	  },
	  onUpdateComponent: function (debugID) {
	    checkDebugID(debugID);
	    markEnd(debugID, 'update');
	    emitEvent('onUpdateComponent', debugID);
	  },
	  onBeforeUnmountComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onBeforeUnmountComponent', debugID);
	    markBegin(debugID, 'unmount');
	  },
	  onUnmountComponent: function (debugID) {
	    checkDebugID(debugID);
	    markEnd(debugID, 'unmount');
	    emitEvent('onUnmountComponent', debugID);
	  },
	  onTestEvent: function () {
	    emitEvent('onTestEvent');
	  }
	};

	// TODO remove these when RN/www gets updated
	ReactDebugTool.addDevtool = ReactDebugTool.addHook;
	ReactDebugTool.removeDevtool = ReactDebugTool.removeHook;

	ReactDebugTool.addHook(ReactInvalidSetStateWarningHook);
	ReactDebugTool.addHook(ReactComponentTreeHook);
	var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
	if (/[?&]react_perf\b/.test(url)) {
	  ReactDebugTool.beginProfiling();
	}

	module.exports = ReactDebugTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var warning = __webpack_require__(8);

	if (process.env.NODE_ENV !== 'production') {
	  var processingChildContext = false;

	  var warnInvalidSetState = function () {
	    process.env.NODE_ENV !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
	  };
	}

	var ReactInvalidSetStateWarningHook = {
	  onBeginProcessingChildContext: function () {
	    processingChildContext = true;
	  },
	  onEndProcessingChildContext: function () {
	    processingChildContext = false;
	  },
	  onSetState: function () {
	    warnInvalidSetState();
	  }
	};

	module.exports = ReactInvalidSetStateWarningHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(9);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var history = [];

	var ReactHostOperationHistoryHook = {
	  onHostOperation: function (operation) {
	    history.push(operation);
	  },
	  clearHistory: function () {
	    if (ReactHostOperationHistoryHook._preventClearing) {
	      // Should only be used for tests.
	      return;
	    }

	    history = [];
	  },
	  getHistory: function () {
	    return history;
	  }
	};

	module.exports = ReactHostOperationHistoryHook;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(12);

	var ReactCurrentOwner = __webpack_require__(13);

	var invariant = __webpack_require__(14);
	var warning = __webpack_require__(8);

	function isNative(fn) {
	  // Based on isNative() from Lodash
	  var funcToString = Function.prototype.toString;
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  var reIsNative = RegExp('^' + funcToString
	  // Take an example native function source for comparison
	  .call(hasOwnProperty)
	  // Strip regex characters so we can use it for regex
	  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  // Remove hasOwnProperty from the template to make it generic
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	  try {
	    var source = funcToString.call(fn);
	    return reIsNative.test(source);
	  } catch (err) {
	    return false;
	  }
	}

	var canUseCollections =
	// Array.from
	typeof Array.from === 'function' &&
	// Map
	typeof Map === 'function' && isNative(Map) &&
	// Map.prototype.keys
	Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
	// Set
	typeof Set === 'function' && isNative(Set) &&
	// Set.prototype.keys
	Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

	var setItem;
	var getItem;
	var removeItem;
	var getItemIDs;
	var addRoot;
	var removeRoot;
	var getRootIDs;

	if (canUseCollections) {
	  var itemMap = new Map();
	  var rootIDSet = new Set();

	  setItem = function (id, item) {
	    itemMap.set(id, item);
	  };
	  getItem = function (id) {
	    return itemMap.get(id);
	  };
	  removeItem = function (id) {
	    itemMap['delete'](id);
	  };
	  getItemIDs = function () {
	    return Array.from(itemMap.keys());
	  };

	  addRoot = function (id) {
	    rootIDSet.add(id);
	  };
	  removeRoot = function (id) {
	    rootIDSet['delete'](id);
	  };
	  getRootIDs = function () {
	    return Array.from(rootIDSet.keys());
	  };
	} else {
	  var itemByKey = {};
	  var rootByKey = {};

	  // Use non-numeric keys to prevent V8 performance issues:
	  // https://github.com/facebook/react/pull/7232
	  var getKeyFromID = function (id) {
	    return '.' + id;
	  };
	  var getIDFromKey = function (key) {
	    return parseInt(key.substr(1), 10);
	  };

	  setItem = function (id, item) {
	    var key = getKeyFromID(id);
	    itemByKey[key] = item;
	  };
	  getItem = function (id) {
	    var key = getKeyFromID(id);
	    return itemByKey[key];
	  };
	  removeItem = function (id) {
	    var key = getKeyFromID(id);
	    delete itemByKey[key];
	  };
	  getItemIDs = function () {
	    return Object.keys(itemByKey).map(getIDFromKey);
	  };

	  addRoot = function (id) {
	    var key = getKeyFromID(id);
	    rootByKey[key] = true;
	  };
	  removeRoot = function (id) {
	    var key = getKeyFromID(id);
	    delete rootByKey[key];
	  };
	  getRootIDs = function () {
	    return Object.keys(rootByKey).map(getIDFromKey);
	  };
	}

	var unmountedIDs = [];

	function purgeDeep(id) {
	  var item = getItem(id);
	  if (item) {
	    var childIDs = item.childIDs;

	    removeItem(id);
	    childIDs.forEach(purgeDeep);
	  }
	}

	function describeComponentFrame(name, source, ownerName) {
	  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
	}

	function getDisplayName(element) {
	  if (element == null) {
	    return '#empty';
	  } else if (typeof element === 'string' || typeof element === 'number') {
	    return '#text';
	  } else if (typeof element.type === 'string') {
	    return element.type;
	  } else {
	    return element.type.displayName || element.type.name || 'Unknown';
	  }
	}

	function describeID(id) {
	  var name = ReactComponentTreeHook.getDisplayName(id);
	  var element = ReactComponentTreeHook.getElement(id);
	  var ownerID = ReactComponentTreeHook.getOwnerID(id);
	  var ownerName;
	  if (ownerID) {
	    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
	  }
	  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
	  return describeComponentFrame(name, element && element._source, ownerName);
	}

	var ReactComponentTreeHook = {
	  onSetChildren: function (id, nextChildIDs) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.childIDs = nextChildIDs;

	    for (var i = 0; i < nextChildIDs.length; i++) {
	      var nextChildID = nextChildIDs[i];
	      var nextChild = getItem(nextChildID);
	      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
	      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
	      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
	      if (nextChild.parentID == null) {
	        nextChild.parentID = id;
	        // TODO: This shouldn't be necessary but mounting a new root during in
	        // componentWillMount currently causes not-yet-mounted components to
	        // be purged from our tree data so their parent id is missing.
	      }
	      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
	    }
	  },
	  onBeforeMountComponent: function (id, element, parentID) {
	    var item = {
	      element: element,
	      parentID: parentID,
	      text: null,
	      childIDs: [],
	      isMounted: false,
	      updateCount: 0
	    };
	    setItem(id, item);
	  },
	  onBeforeUpdateComponent: function (id, element) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.element = element;
	  },
	  onMountComponent: function (id) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.isMounted = true;
	    var isRoot = item.parentID === 0;
	    if (isRoot) {
	      addRoot(id);
	    }
	  },
	  onUpdateComponent: function (id) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.updateCount++;
	  },
	  onUnmountComponent: function (id) {
	    var item = getItem(id);
	    if (item) {
	      // We need to check if it exists.
	      // `item` might not exist if it is inside an error boundary, and a sibling
	      // error boundary child threw while mounting. Then this instance never
	      // got a chance to mount, but it still gets an unmounting event during
	      // the error boundary cleanup.
	      item.isMounted = false;
	      var isRoot = item.parentID === 0;
	      if (isRoot) {
	        removeRoot(id);
	      }
	    }
	    unmountedIDs.push(id);
	  },
	  purgeUnmountedComponents: function () {
	    if (ReactComponentTreeHook._preventPurging) {
	      // Should only be used for testing.
	      return;
	    }

	    for (var i = 0; i < unmountedIDs.length; i++) {
	      var id = unmountedIDs[i];
	      purgeDeep(id);
	    }
	    unmountedIDs.length = 0;
	  },
	  isMounted: function (id) {
	    var item = getItem(id);
	    return item ? item.isMounted : false;
	  },
	  getCurrentStackAddendum: function (topElement) {
	    var info = '';
	    if (topElement) {
	      var name = getDisplayName(topElement);
	      var owner = topElement._owner;
	      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
	    }

	    var currentOwner = ReactCurrentOwner.current;
	    var id = currentOwner && currentOwner._debugID;

	    info += ReactComponentTreeHook.getStackAddendumByID(id);
	    return info;
	  },
	  getStackAddendumByID: function (id) {
	    var info = '';
	    while (id) {
	      info += describeID(id);
	      id = ReactComponentTreeHook.getParentID(id);
	    }
	    return info;
	  },
	  getChildIDs: function (id) {
	    var item = getItem(id);
	    return item ? item.childIDs : [];
	  },
	  getDisplayName: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element) {
	      return null;
	    }
	    return getDisplayName(element);
	  },
	  getElement: function (id) {
	    var item = getItem(id);
	    return item ? item.element : null;
	  },
	  getOwnerID: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element || !element._owner) {
	      return null;
	    }
	    return element._owner._debugID;
	  },
	  getParentID: function (id) {
	    var item = getItem(id);
	    return item ? item.parentID : null;
	  },
	  getSource: function (id) {
	    var item = getItem(id);
	    var element = item ? item.element : null;
	    var source = element != null ? element._source : null;
	    return source;
	  },
	  getText: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (typeof element === 'string') {
	      return element;
	    } else if (typeof element === 'number') {
	      return '' + element;
	    } else {
	      return null;
	    }
	  },
	  getUpdateCount: function (id) {
	    var item = getItem(id);
	    return item ? item.updateCount : 0;
	  },


	  getRootIDs: getRootIDs,
	  getRegisteredIDs: getItemIDs
	};

	module.exports = ReactComponentTreeHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	'use strict';

	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */

	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;

	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }

	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

	  throw error;
	}

	module.exports = reactProdInvariant;

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */
	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	var performance = __webpack_require__(16);

	var performanceNow;

	/**
	 * Detect if we can use `window.performance.now()` and gracefully fallback to
	 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
	 * because of Facebook's testing infrastructure.
	 */
	if (performance.now) {
	  performanceNow = function performanceNow() {
	    return performance.now();
	  };
	} else {
	  performanceNow = function performanceNow() {
	    return Date.now();
	  };
	}

	module.exports = performanceNow;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(4);

	var performance;

	if (ExecutionEnvironment.canUseDOM) {
	  performance = window.performance || window.msPerformance || window.webkitPerformance;
	}

	module.exports = performance || {};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var camelize = __webpack_require__(18);

	var msPattern = /^-ms-/;

	/**
	 * Camelcases a hyphenated CSS property name, for example:
	 *
	 *   > camelizeStyleName('background-color')
	 *   < "backgroundColor"
	 *   > camelizeStyleName('-moz-transition')
	 *   < "MozTransition"
	 *   > camelizeStyleName('-ms-transition')
	 *   < "msTransition"
	 *
	 * As Andi Smith suggests
	 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	 * is converted to lowercase `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	}

	module.exports = camelizeStyleName;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var CSSProperty = __webpack_require__(3);
	var warning = __webpack_require__(8);

	var isUnitlessNumber = CSSProperty.isUnitlessNumber;
	var styleWarnings = {};

	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @param {ReactDOMComponent} component
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(name, value, component) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901

	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }

	  var isNonNumeric = isNaN(value);
	  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
	    return '' + value; // cast to string
	  }

	  if (typeof value === 'string') {
	    if (process.env.NODE_ENV !== 'production') {
	      // Allow '0' to pass through without warning. 0 is already special and
	      // doesn't require units, so we don't need to warn about it.
	      if (component && value !== '0') {
	        var owner = component._currentElement._owner;
	        var ownerName = owner ? owner.getName() : null;
	        if (ownerName && !styleWarnings[ownerName]) {
	          styleWarnings[ownerName] = {};
	        }
	        var warned = false;
	        if (ownerName) {
	          var warnings = styleWarnings[ownerName];
	          warned = warnings[name];
	          if (!warned) {
	            warnings[name] = true;
	          }
	        }
	        if (!warned) {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
	        }
	      }
	    }
	    value = value.trim();
	  }
	  return value + 'px';
	}

	module.exports = dangerousStyleValue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var hyphenate = __webpack_require__(21);

	var msPattern = /^ms-/;

	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}

	module.exports = hyphenateStyleName;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	module.exports = hyphenate;

/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 */

	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function (string) {
	    if (!cache.hasOwnProperty(string)) {
	      cache[string] = callback.call(this, string);
	    }
	    return cache[string];
	  };
	}

	module.exports = memoizeStringOnly;

/***/ }
/******/ ]);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericCache = (function () {
    function GenericCache() {
        this.cache = {};
    }
    GenericCache.prototype.add = function (key, val) {
        if (!this.has(key)) {
            this.cache[key] = val;
        }
    };
    GenericCache.prototype.has = function (key) {
        return this.cache[key] != null;
    };
    GenericCache.prototype.get = function (key) {
        return this.cache[key];
    };
    GenericCache.prototype.flush = function () {
        this.cache = {};
    };
    GenericCache.prototype.counts = function () {
        return Object.keys(this.cache).length;
    };
    GenericCache.prototype.keys = function () {
        return Object.keys(this.cache);
    };
    return GenericCache;
}());
exports.GenericCache = GenericCache;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var possibles = [':', '.', '[', '>', ' '];
/**
 * Check if the key is a css selector like (:, ., [, >, ' ' )
 * @param key
 */
function isSelector(key) {
    var ch = key.charAt(0);
    var found = false;
    for (var _i = 0, possibles_1 = possibles; _i < possibles_1.length; _i++) {
        var possible = possibles_1[_i];
        if (ch === possible) {
            found = true;
            break;
        }
    }
    return found || (key.indexOf('&') >= 0);
}
exports.isSelector = isSelector;
function joinSelectors(a, b) {
    var as = a.split(',').map(function (a) { return !(a.indexOf('&') >= 0) ? '&' + a : a; });
    var bs = b.split(',').map(function (b) { return !(b.indexOf('&') >= 0) ? '&' + b : b; });
    return bs.reduce(function (arr, b) { return arr.concat(as.map(function (a) { return b.replace(/\&/g, a); })); }, []).join(',');
}
exports.joinSelectors = joinSelectors;
/**
 * Compine two @media quieries with "and" operator, and return one @media query
 *
 * ex. a: @media only print
 * b:@media only screen and (max-device-width: 480px)
 * => result: @media only print and only screen and (max-device-width: 480px)
 * @param a
 * @param b
 */
function joinMediaQueries(a, b) {
    return a ? "@media " + a.substring(6) + " and " + b.substring(6) : b;
}
exports.joinMediaQueries = joinMediaQueries;
/**
 * Check if the key representing a media query
 * Media query start with "@media"
 * @param key
 */
function isMediaQuery(key) {
    return key.indexOf('@media') === 0;
}
exports.isMediaQuery = isMediaQuery;
/**
 * Check if the key represents a support query
 * Support query starts with "@supports"
 * ex: @support (conditions){ some css magic! }
 * @param key
 */
function isSupports(key) {
    return key.indexOf('@supports') === 0;
}
exports.isSupports = isSupports;
/**
 * Compine two @support quieries with "and" operator, and return one @support query
 * @param a
 * @param b
 * ex a = @supports (display: flex)'
 *    b = '@supports (-webkit-appearance: caret)
 *    result :'@supports  (display: flex) and  (-webkit-appearance: caret)'
 */
function joinSupports(a, b) {
    return a ? "@supports " + a.substring(9) + " and " + b.substring(9) : b;
}
exports.joinSupports = joinSupports;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inline_style_prefixer_static_plugins_crossFade__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inline_style_prefixer_static_plugins_crossFade___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inline_style_prefixer_static_plugins_crossFade__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inline_style_prefixer_static_plugins_cursor__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inline_style_prefixer_static_plugins_cursor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inline_style_prefixer_static_plugins_cursor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inline_style_prefixer_static_plugins_filter__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inline_style_prefixer_static_plugins_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_inline_style_prefixer_static_plugins_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inline_style_prefixer_static_plugins_flex__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inline_style_prefixer_static_plugins_flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_inline_style_prefixer_static_plugins_flex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inline_style_prefixer_static_plugins_flexboxIE__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inline_style_prefixer_static_plugins_flexboxIE___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_inline_style_prefixer_static_plugins_flexboxIE__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_inline_style_prefixer_static_plugins_flexboxOld__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_inline_style_prefixer_static_plugins_flexboxOld___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_inline_style_prefixer_static_plugins_flexboxOld__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inline_style_prefixer_static_plugins_gradient__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inline_style_prefixer_static_plugins_gradient___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_inline_style_prefixer_static_plugins_gradient__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_inline_style_prefixer_static_plugins_imageSet__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_inline_style_prefixer_static_plugins_imageSet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_inline_style_prefixer_static_plugins_imageSet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_inline_style_prefixer_static_plugins_position__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_inline_style_prefixer_static_plugins_position___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_inline_style_prefixer_static_plugins_position__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_inline_style_prefixer_static_plugins_sizing__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_inline_style_prefixer_static_plugins_sizing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_inline_style_prefixer_static_plugins_sizing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_inline_style_prefixer_static_plugins_transition__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_inline_style_prefixer_static_plugins_transition___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_inline_style_prefixer_static_plugins_transition__);











var w = ["Webkit"];
var m = ["Moz"];
var ms = ["ms"];
var wm = ["Webkit","Moz"];
var wms = ["Webkit","ms"];
var wmms = ["Webkit","Moz","ms"];

/* harmony default export */ __webpack_exports__["default"] = ({
  plugins: [__WEBPACK_IMPORTED_MODULE_0_inline_style_prefixer_static_plugins_crossFade___default.a,__WEBPACK_IMPORTED_MODULE_1_inline_style_prefixer_static_plugins_cursor___default.a,__WEBPACK_IMPORTED_MODULE_2_inline_style_prefixer_static_plugins_filter___default.a,__WEBPACK_IMPORTED_MODULE_3_inline_style_prefixer_static_plugins_flex___default.a,__WEBPACK_IMPORTED_MODULE_4_inline_style_prefixer_static_plugins_flexboxIE___default.a,__WEBPACK_IMPORTED_MODULE_5_inline_style_prefixer_static_plugins_flexboxOld___default.a,__WEBPACK_IMPORTED_MODULE_6_inline_style_prefixer_static_plugins_gradient___default.a,__WEBPACK_IMPORTED_MODULE_7_inline_style_prefixer_static_plugins_imageSet___default.a,__WEBPACK_IMPORTED_MODULE_8_inline_style_prefixer_static_plugins_position___default.a,__WEBPACK_IMPORTED_MODULE_9_inline_style_prefixer_static_plugins_sizing___default.a,__WEBPACK_IMPORTED_MODULE_10_inline_style_prefixer_static_plugins_transition___default.a],
  prefixMap: {"transform":w,"transformOrigin":w,"transformOriginX":w,"transformOriginY":w,"backfaceVisibility":w,"perspective":w,"perspectiveOrigin":w,"transformStyle":w,"transformOriginZ":w,"animation":w,"animationDelay":w,"animationDirection":w,"animationFillMode":w,"animationDuration":w,"animationIterationCount":w,"animationName":w,"animationPlayState":w,"animationTimingFunction":w,"appearance":wm,"userSelect":wmms,"fontKerning":w,"textEmphasisPosition":w,"textEmphasis":w,"textEmphasisStyle":w,"textEmphasisColor":w,"boxDecorationBreak":w,"clipPath":w,"maskImage":w,"maskMode":w,"maskRepeat":w,"maskPosition":w,"maskClip":w,"maskOrigin":w,"maskSize":w,"maskComposite":w,"mask":w,"maskBorderSource":w,"maskBorderMode":w,"maskBorderSlice":w,"maskBorderWidth":w,"maskBorderOutset":w,"maskBorderRepeat":w,"maskBorder":w,"maskType":w,"textDecorationStyle":wm,"textDecorationSkip":wm,"textDecorationLine":wm,"textDecorationColor":wm,"filter":w,"fontFeatureSettings":wm,"breakAfter":wmms,"breakBefore":wmms,"breakInside":wmms,"columnCount":wm,"columnFill":wm,"columnGap":wm,"columnRule":wm,"columnRuleColor":wm,"columnRuleStyle":wm,"columnRuleWidth":wm,"columns":wm,"columnSpan":wm,"columnWidth":wm,"flex":wms,"flexBasis":w,"flexDirection":wms,"flexGrow":w,"flexFlow":wms,"flexShrink":w,"flexWrap":wms,"alignContent":w,"alignItems":w,"alignSelf":w,"justifyContent":w,"order":w,"backdropFilter":w,"scrollSnapType":wms,"scrollSnapPointsX":wms,"scrollSnapPointsY":wms,"scrollSnapDestination":wms,"scrollSnapCoordinate":wms,"shapeImageThreshold":w,"shapeImageMargin":w,"shapeImageOutside":w,"hyphens":wmms,"flowInto":wms,"flowFrom":wms,"regionFragment":wms,"boxSizing":m,"textAlignLast":m,"tabSize":m,"wrapFlow":ms,"wrapThrough":ms,"wrapMargin":ms,"touchAction":ms,"gridTemplateColumns":ms,"gridTemplateRows":ms,"gridTemplateAreas":ms,"gridTemplate":ms,"gridAutoColumns":ms,"gridAutoRows":ms,"gridAutoFlow":ms,"grid":ms,"gridRowStart":ms,"gridColumnStart":ms,"gridRowEnd":ms,"gridRow":ms,"gridColumn":ms,"gridColumnEnd":ms,"gridColumnGap":ms,"gridRowGap":ms,"gridArea":ms,"gridGap":ms,"textSizeAdjust":wms,"borderImage":w,"borderImageOutset":w,"borderImageRepeat":w,"borderImageSlice":w,"borderImageSource":w,"borderImageWidth":w,"transitionDelay":w,"transitionDuration":w,"transitionProperty":w,"transitionTimingFunction":w}
});

/***/ })
/******/ ]);
});