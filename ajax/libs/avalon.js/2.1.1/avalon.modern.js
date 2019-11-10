/*!
 * built in 2016-7-11:15 version 2.10 by 司徒正美
 * 重构ms-controller, ms-important指令
 * 虚拟DOM移除template属性
 * 修正ms-for的排序问题
 * fix 在chrome与firefox下删掉select中的空白节点，会影响到selectedIndex BUG  
 * ms-widget, ms-controller, ms-important生成的VM与对应的DOM都保存起来,
 * 并在avalon.vdomAdaptor中还原
 * 添加unescapeHTML与escapeHTML方法
 * 全新的lexer与 插值表达式抽取方法
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["avalon"] = factory();
	else
		root["avalon"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	var avalon = __webpack_require__(80) 

	__webpack_require__(8)
	__webpack_require__(82)
	__webpack_require__(84)
	__webpack_require__(92)
	__webpack_require__(69)
	__webpack_require__(97)
	avalon.onComponentDispose = __webpack_require__(99)

	module.exports = avalon


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {//avalon的核心,这里都是一些不存在异议的*核心*方法与属性
	function avalon(el) {
	    return new avalon.init(el)
	}

	global.avalon = avalon
	if(typeof window !== 'undefined'){
	    window.avalon = avalon
	}

	avalon.init = function (el) {
	    this[0] = this.element = el
	}

	avalon.fn = avalon.prototype = avalon.init.prototype


	avalon.shadowCopy = function (destination, source) {
	    for (var property in source) {
	        destination[property] = source[property]
	    }
	    return destination
	}

	var rword = /[^, ]+/g

	var hasConsole = global.console

	avalon.shadowCopy(avalon, {
	    noop: function () {
	    },
	    //切割字符串为一个个小块，以空格或逗号分开它们，结合replace实现字符串的forEach
	    rword: rword,
	    inspect: ({}).toString,
	    ohasOwn: ({}).hasOwnProperty,
	    log: function () {
	        if (hasConsole && avalon.config.debug) {
	            // http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
	            Function.apply.call(console.log, console, arguments)
	        }
	    },
	    warn: function () {
	        if (hasConsole && avalon.config.debug) {
	            var method = console.warn || console.log
	            // http://qiang106.iteye.com/blog/1721425
	            Function.apply.call(method, console, arguments)
	        }
	    },
	    error: function (str, e) {
	        throw (e || Error)(str)
	    },
	    //将一个以空格或逗号隔开的字符串或数组,转换成一个键值都为1的对象
	    oneObject: function (array, val) {
	        if (typeof array === 'string') {
	            array = array.match(rword) || []
	        }
	        var result = {},
	                value = val !== void 0 ? val : 1
	        for (var i = 0, n = array.length; i < n; i++) {
	            result[array[i]] = value
	        }
	        return result
	    }

	})

	module.exports = avalon
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var window = global
	var browser = {
	    window: window,
	    document: {//方便在nodejs环境不会报错
	        createElement: function () {
	            return {}
	        },
	        createElementNS: function(){
	            return {}
	        },
	        contains: Boolean
	    },
	    root: {
	        outerHTML: 'x'
	    },
	    msie: NaN,
	    modern: true,
	    avalonDiv: {},
	    avalonFragment: null
	}

	if(window.location && window.navigator && window.window){
	    var document = window.document
	    browser.document = document
	    browser.modern = window.dispatchEvent
	    browser.root = document.documentElement
	    browser.avalonDiv = document.createElement('div')
	    browser.avalonFragment = document.createDocumentFragment()
	    if (window.VBArray) {
	        browser.msie = document.documentMode || (window.XMLHttpRequest ? 7 : 6)
	    }
	}


	module.exports = browser
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	var cssHooks = {}
	var rhyphen = /([a-z\d])([A-Z]+)/g
	var rcamelize = /[-_][^-_]/g
	var rhashcode = /\d\.\d{4}/
	var rescape = /[-.*+?^${}()|[\]\/\\]/g

	var _slice = [].slice
	function defaultParse(cur, pre, binding) {
	       cur[binding.name] = avalon.parseExpr(binding)
	}
	avalon.shadowCopy(avalon, {
	    caches: {}, //avalon2.0 新增
	    vmodels: {},
	    filters: {},
	    components: {},//放置组件的类
	    directives: {},
	    eventHooks: {},
	    eventListeners: {},
	    validators: {},
	    scopes: {},
	    cssHooks: cssHooks,
	    parsers: {
	        number: function (a) {
	            return a === '' ? '' : /\d\.$/.test(a) ? a : parseFloat(a) || 0
	        },
	        string: function (a) {
	            return a === null || a === void 0 ? '' : a + ''
	        },
	        boolean: function (a) {
	            if(a === '')
	                return a
	            return a === 'true'|| a == '1'
	        }
	    },
	    version: "2.10",
	    slice: function (nodes, start, end) {
	        return _slice.call(nodes, start, end)
	    },
	    css: function (node, name, value, fn) {
	        //读写删除元素节点的样式
	        if (node instanceof avalon) {
	            node = node[0]
	        }
	        if(node.nodeType !==1){
	            return
	        }
	        var prop = avalon.camelize(name)
	        name = avalon.cssName(prop) || prop
	        if (value === void 0 || typeof value === 'boolean') { //获取样式
	            fn = cssHooks[prop + ':get'] || cssHooks['@:get']
	            if (name === 'background') {
	                name = 'backgroundColor'
	            }
	            var val = fn(node, name)
	            return value === true ? parseFloat(val) || 0 : val
	        } else if (value === '') { //请除样式
	            node.style[name] = ''
	        } else { //设置样式
	            if (value == null || value !== value) {
	                return
	            }
	            if (isFinite(value) && !avalon.cssNumber[prop]) {
	                value += 'px'
	            }
	            fn = cssHooks[prop + ':set'] || cssHooks['@:set']
	            fn(node, name, value)
	        }
	    },
	    directive: function (name, definition) {
	        definition.parse = definition.parse || defaultParse
	        return this.directives[name] = definition
	    },
	    isObject: function (a) {//1.6新增
	        return a !== null && typeof a === 'object'
	    },
	    /* avalon.range(10)
	     => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	     avalon.range(1, 11)
	     => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	     avalon.range(0, 30, 5)
	     => [0, 5, 10, 15, 20, 25]
	     avalon.range(0, -10, -1)
	     => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
	     avalon.range(0)
	     => []*/
	    range: function (start, end, step) { // 用于生成整数数组
	        step || (step = 1)
	        if (end == null) {
	            end = start || 0
	            start = 0
	        }
	        var index = -1,
	                length = Math.max(0, Math.ceil((end - start) / step)),
	                result = new Array(length)
	        while (++index < length) {
	            result[index] = start
	            start += step
	        }
	        return result
	    },
	    hyphen: function (target) {
	        //转换为连字符线风格
	        return target.replace(rhyphen, '$1-$2').toLowerCase()
	    },
	    camelize: function (target) {
	        //提前判断，提高getStyle等的效率
	        if (!target || target.indexOf('-') < 0 && target.indexOf('_') < 0) {
	            return target
	        }
	        //转换为驼峰风格
	        return target.replace(rcamelize, function (match) {
	            return match.charAt(1).toUpperCase()
	        })
	    },
	    //生成UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	    makeHashCode: function (prefix) {
	        prefix = prefix || 'avalon'
	        return String(Math.random() + Math.random()).replace(rhashcode, prefix)
	    },
	    escapeRegExp: function (target) {
	        //http://stevenlevithan.com/regex/xregexp/
	        //将字符串安全格式化为正则表达式的源码
	        return (target + '').replace(rescape, '\\$&')
	    },
	    Array: {
	        merge: function (target, other) {
	            //合并两个数组 avalon2新增
	            target.push.apply(target, other)
	        },
	        ensure: function (target, item) {
	            //只有当前数组不存在此元素时只添加它
	            if (target.indexOf(item) === -1) {
	                return target.push(item)
	            }
	        },
	        removeAt: function (target, index) {
	            //移除数组中指定位置的元素，返回布尔表示成功与否
	            return !!target.splice(index, 1).length
	        },
	        remove: function (target, item) {
	            //移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否
	            var index = target.indexOf(item)
	            if (~index)
	                return avalon.Array.removeAt(target, index)
	            return false
	        }
	    }
	})

	if(typeof performance !== 'undefined' && performance.now){
	    avalon.makeHashCode = function (prefix) {
	        prefix = prefix || 'avalon'
	        return (prefix + performance.now()).replace('.', '')
	    }
	}

	var UUID = 1
	module.exports = {
	    //生成事件回调的UUID(用户通过ms-on指令)
	    avalon: avalon,
	    getLongID: function (fn) {
	        return fn.uuid || (fn.uuid = avalon.makeHashCode('e'))
	    },
	    //生成事件回调的UUID(用户通过avalon.bind)
	    getShortID: function (fn) {
	        return fn.uuid || (fn.uuid = '_' + (++UUID))
	    }
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	
	function kernel(settings) {
	    for (var p in settings) {
	        if (!avalon.ohasOwn.call(settings, p))
	            continue
	        var val = settings[p]
	        if (typeof kernel.plugins[p] === 'function') {
	            kernel.plugins[p](val)
	        } else if (typeof kernel[p] === 'object') {
	            avalon.shadowCopy(kernel[p], val)
	        } else {
	            kernel[p] = val
	        }
	    }
	    return this
	}

	avalon.config = kernel

	var plugins = {
	    interpolate: function (array) {
	        var openTag = array[0]
	        var closeTag = array[1]
	        /*eslint-disable */
	        if (openTag === closeTag) {
	            throw new SyntaxError('openTag!==closeTag')
	        }
	        var test = openTag + 'test' + closeTag
	        var div = avalon.avalonDiv
	        div.innerHTML = test
	        if (div.innerHTML !== test && div.innerHTML.indexOf('&lt;') > -1) {
	            throw new SyntaxError('此定界符不合法')
	        }
	        div.innerHTML = ''
	        /*eslint-enable */
	        kernel.openTag = openTag
	        kernel.closeTag = closeTag
	        var o = avalon.escapeRegExp(openTag)
	        var c = avalon.escapeRegExp(closeTag)
	        kernel.rexpr = new RegExp(o + '([\\s\\S]*)' + c)
	        kernel.rexprg = new RegExp(o + '([\\s\\S]*)' + c, 'g')
	        kernel.rbind = new RegExp(o + '[\\s\\S]*' + c + '|\\bms-|\\bslot\\b')
	    }
	}
	kernel.plugins = plugins
	avalon.config({
	    interpolate: ['{{', '}}'],
	    debug: true
	})


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	var number = __webpack_require__(9)
	var sanitize = __webpack_require__(10)
	var date = __webpack_require__(11)
	var arrayFilters = __webpack_require__(12)
	var eventFilters = __webpack_require__(13)
	var filters = avalon.filters

	function K(a) {
	    return a
	}

	avalon.__format__ = function (name) {
	    var fn = filters[name]
	    if (fn) {
	        return fn.get ? fn.get : fn
	    }
	    return K
	}


	avalon.mix(filters, {
	    uppercase: function (str) {
	        return String(str).toUpperCase()
	    },
	    lowercase: function (str) {
	        return String(str).toLowerCase()
	    },
	    truncate: function (str, length, truncation) {
	        //length，新字符串长度，truncation，新字符串的结尾的字段,返回新字符串
	        length = length || 30
	        truncation = typeof truncation === "string" ? truncation : "..."
	        return str.length > length ?
	                str.slice(0, length - truncation.length) + truncation :
	                String(str)
	    },
	    camelize: avalon.camelize,
	    date: date,
	    escape: avalon.escapeHtml,
	    sanitize: sanitize,
	    number: number,
	    currency: function (amount, symbol, fractionSize) {
	        return (symbol || "\uFFE5") +
	                number(amount,
	                        isFinite(fractionSize) ? fractionSize : 2)
	    }
	}, arrayFilters, eventFilters)


	module.exports = avalon

/***/ },
/* 9 */
/***/ function(module, exports) {

	function number(number, decimals, point, thousands) {
	    //form http://phpjs.org/functions/number_format/
	    //number 必需，要格式化的数字
	    //decimals 可选，规定多少个小数位。
	    //point 可选，规定用作小数点的字符串（默认为 . ）。
	    //thousands 可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
	    number = (number + '')
	            .replace(/[^0-9+\-Ee.]/g, '')
	    var n = !isFinite(+number) ? 0 : +number,
	            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
	            sep = thousands || ",",
	            dec = point || ".",
	            s = '',
	            toFixedFix = function (n, prec) {
	                var k = Math.pow(10, prec)
	                return '' + (Math.round(n * k) / k)
	                        .toFixed(prec)
	            }
	    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
	            .split('.')
	    if (s[0].length > 3) {
	        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
	    }
	    if ((s[1] || '')
	            .length < prec) {
	        s[1] = s[1] || ''
	        s[1] += new Array(prec - s[1].length + 1)
	                .join('0')
	    }
	    return s.join(dec)
	}

	module.exports = number

	//处理 货币 http://openexchangerates.github.io/accounting.js/

/***/ },
/* 10 */
/***/ function(module, exports) {

	var rscripts = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim
	var ron = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g
	var ropen = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig
	var rsanitize = {
	    a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
	    img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
	    form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
	}


	//https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	//    <a href="javasc&NewLine;ript&colon;alert('XSS')">chrome</a> 
	//    <a href="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg==">chrome</a>
	//    <a href="jav	ascript:alert('XSS');">IE67chrome</a>
	//    <a href="jav&#x09;ascript:alert('XSS');">IE67chrome</a>
	//    <a href="jav&#x0A;ascript:alert('XSS');">IE67chrome</a>
	module.exports = function sanitize(str) {
	    return str.replace(rscripts, "").replace(ropen, function (a, b) {
	        var match = a.toLowerCase().match(/<(\w+)\s/)
	        if (match) { //处理a标签的href属性，img标签的src属性，form标签的action属性
	            var reg = rsanitize[match[1]]
	            if (reg) {
	                a = a.replace(reg, function (s, name, value) {
	                    var quote = value.charAt(0)
	                    return name + "=" + quote + "javascript:void(0)" + quote// jshint ignore:line
	                })
	            }
	        }
	        return a.replace(ron, " ").replace(/\s+/g, " ") //移除onXXX事件
	    })
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
	 'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
	 'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
	 'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
	 'MMMM': Month in year (January-December)
	 'MMM': Month in year (Jan-Dec)
	 'MM': Month in year, padded (01-12)
	 'M': Month in year (1-12)
	 'dd': Day in month, padded (01-31)
	 'd': Day in month (1-31)
	 'EEEE': Day in Week,(Sunday-Saturday)
	 'EEE': Day in Week, (Sun-Sat)
	 'HH': Hour in day, padded (00-23)
	 'H': Hour in day (0-23)
	 'hh': Hour in am/pm, padded (01-12)
	 'h': Hour in am/pm, (1-12)
	 'mm': Minute in hour, padded (00-59)
	 'm': Minute in hour (0-59)
	 'ss': Second in minute, padded (00-59)
	 's': Second in minute (0-59)
	 'a': am/pm marker
	 'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)
	 format string can also be one of the following predefined localizable formats:
	 
	 'medium': equivalent to 'MMM d, y h:mm:ss a' for en_US locale (e.g. Sep 3, 2010 12:05:08 pm)
	 'short': equivalent to 'M/d/yy h:mm a' for en_US locale (e.g. 9/3/10 12:05 pm)
	 'fullDate': equivalent to 'EEEE, MMMM d,y' for en_US locale (e.g. Friday, September 3, 2010)
	 'longDate': equivalent to 'MMMM d, y' for en_US locale (e.g. September 3, 2010
	 'mediumDate': equivalent to 'MMM d, y' for en_US locale (e.g. Sep 3, 2010)
	 'shortDate': equivalent to 'M/d/yy' for en_US locale (e.g. 9/3/10)
	 'mediumTime': equivalent to 'h:mm:ss a' for en_US locale (e.g. 12:05:08 pm)
	 'shortTime': equivalent to 'h:mm a' for en_US locale (e.g. 12:05 pm)
	 */

	function toInt(str) {
	    return parseInt(str, 10) || 0
	}

	function padNumber(num, digits, trim) {
	    var neg = ''
	    if (num < 0) {
	        neg = '-'
	        num = -num
	    }
	    num = '' + num
	    while (num.length < digits)
	        num = '0' + num
	    if (trim)
	        num = num.substr(num.length - digits)
	    return neg + num
	}

	function dateGetter(name, size, offset, trim) {
	    return function (date) {
	        var value = date["get" + name]()
	        if (offset > 0 || value > -offset)
	            value += offset
	        if (value === 0 && offset === -12) {
	            value = 12
	        }
	        return padNumber(value, size, trim)
	    }
	}

	function dateStrGetter(name, shortForm) {
	    return function (date, formats) {
	        var value = date["get" + name]()
	        var get = (shortForm ? ("SHORT" + name) : name).toUpperCase()
	        return formats[get][value]
	    }
	}

	function timeZoneGetter(date) {
	    var zone = -1 * date.getTimezoneOffset()
	    var paddedZone = (zone >= 0) ? "+" : ""
	    paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
	    return paddedZone
	}
	//取得上午下午

	function ampmGetter(date, formats) {
	    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
	}
	var DATE_FORMATS = {
	    yyyy: dateGetter("FullYear", 4),
	    yy: dateGetter("FullYear", 2, 0, true),
	    y: dateGetter("FullYear", 1),
	    MMMM: dateStrGetter("Month"),
	    MMM: dateStrGetter("Month", true),
	    MM: dateGetter("Month", 2, 1),
	    M: dateGetter("Month", 1, 1),
	    dd: dateGetter("Date", 2),
	    d: dateGetter("Date", 1),
	    HH: dateGetter("Hours", 2),
	    H: dateGetter("Hours", 1),
	    hh: dateGetter("Hours", 2, -12),
	    h: dateGetter("Hours", 1, -12),
	    mm: dateGetter("Minutes", 2),
	    m: dateGetter("Minutes", 1),
	    ss: dateGetter("Seconds", 2),
	    s: dateGetter("Seconds", 1),
	    sss: dateGetter("Milliseconds", 3),
	    EEEE: dateStrGetter("Day"),
	    EEE: dateStrGetter("Day", true),
	    a: ampmGetter,
	    Z: timeZoneGetter
	}
	var rdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/
	var raspnetjson = /^\/Date\((\d+)\)\/$/
	function dateFilter(date, format) {
	    var locate = dateFilter.locate,
	            text = "",
	            parts = [],
	            fn, match
	    format = format || "mediumDate"
	    format = locate[format] || format
	    if (typeof date === "string") {
	        if (/^\d+$/.test(date)) {
	            date = toInt(date)
	        } else if (raspnetjson.test(date)) {
	            date = +RegExp.$1
	        } else {
	            var trimDate = date.trim()
	            var dateArray = [0, 0, 0, 0, 0, 0, 0]
	            var oDate = new Date(0)
	            //取得年月日
	            trimDate = trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/, function (_, a, b, c) {
	                var array = c.length === 4 ? [c, a, b] : [a, b, c]
	                dateArray[0] = toInt(array[0])     //年
	                dateArray[1] = toInt(array[1]) - 1 //月
	                dateArray[2] = toInt(array[2])     //日
	                return ""
	            })
	            var dateSetter = oDate.setFullYear
	            var timeSetter = oDate.setHours
	            trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (_, a, b, c, d) {
	                dateArray[3] = toInt(a) //小时
	                dateArray[4] = toInt(b) //分钟
	                dateArray[5] = toInt(c) //秒
	                if (d) {                //毫秒
	                    dateArray[6] = Math.round(parseFloat("0." + d) * 1000)
	                }
	                return ""
	            })
	            var tzHour = 0
	            var tzMin = 0
	            trimDate = trimDate.replace(/Z|([+-])(\d\d):?(\d\d)/, function (z, symbol, c, d) {
	                dateSetter = oDate.setUTCFullYear
	                timeSetter = oDate.setUTCHours
	                if (symbol) {
	                    tzHour = toInt(symbol + c)
	                    tzMin = toInt(symbol + d)
	                }
	                return ''
	            })

	            dateArray[3] -= tzHour
	            dateArray[4] -= tzMin
	            dateSetter.apply(oDate, dateArray.slice(0, 3))
	            timeSetter.apply(oDate, dateArray.slice(3))
	            date = oDate
	        }
	    }
	    if (typeof date === 'number') {
	        date = new Date(date)
	    }
	    if (avalon.type(date) !== 'date') {
	        return
	    }
	    while (format) {
	        match = rdateFormat.exec(format)
	        if (match) {
	            parts = parts.concat(match.slice(1))
	            format = parts.pop()
	        } else {
	            parts.push(format)
	            format = null
	        }
	    }
	    parts.forEach(function (value) {
	        fn = DATE_FORMATS[value]
	        text += fn ? fn(date, locate) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
	    })
	    return text
	}


	var locate = {
	    AMPMS: {
	        0: '上午',
	        1: '下午'
	    },
	    DAY: {
	        0: '星期日',
	        1: '星期一',
	        2: '星期二',
	        3: '星期三',
	        4: '星期四',
	        5: '星期五',
	        6: '星期六'
	    },
	    MONTH: {
	        0: '1月',
	        1: '2月',
	        2: '3月',
	        3: '4月',
	        4: '5月',
	        5: '6月',
	        6: '7月',
	        7: '8月',
	        8: '9月',
	        9: '10月',
	        10: '11月',
	        11: '12月'
	    },
	    SHORTDAY: {
	        '0': '周日',
	        '1': '周一',
	        '2': '周二',
	        '3': '周三',
	        '4': '周四',
	        '5': '周五',
	        '6': '周六'
	    },
	    fullDate: 'y年M月d日EEEE',
	    longDate: 'y年M月d日',
	    medium: 'yyyy-M-d H:mm:ss',
	    mediumDate: 'yyyy-M-d',
	    mediumTime: 'H:mm:ss',
	    'short': 'yy-M-d ah:mm',
	    shortDate: 'yy-M-d',
	    shortTime: 'ah:mm'
	}
	locate.SHORTMONTH = locate.MONTH
	dateFilter.locate = locate

	module.exports = dateFilter

/***/ },
/* 12 */
/***/ function(module, exports) {

	
	function orderBy(array, criteria, reverse) {
	    var type = avalon.type(array)
	    if (type !== 'array' && type !== 'object')
	        throw 'orderBy只能处理对象或数组'
	    var order = (reverse && reverse < 0) ? -1 : 1

	    if (typeof criteria === 'string') {
	        var key = criteria
	        criteria = function (a) {
	            return a && a[key]
	        }
	    }
	    array = convertArray(array)
	    array.forEach(function (el) {
	        el.order = criteria(el.value, el.key)
	    })
	    array.sort(function (left, right) {
	        var a = left.order
	        var b = right.order
	        if (Number.isNaN(a) && Number.isNaN(b)) {
	            return 0
	        }
	        return a === b ? 0 : a > b ? order : -order
	    })
	    var isArray = type === 'array'
	    var target = isArray ? [] : {}
	    return recovery(target, array, function (el) {
	        if (isArray) {
	            target.push(el.value)
	        } else {
	            target[el.key] = el.value
	        }
	    })
	}

	function filterBy(array, search) {
	    var type = avalon.type(array)
	    if (type !== 'array' && type !== 'object')
	        throw 'filterBy只能处理对象或数组'
	    var args = avalon.slice(arguments, 2)
	    var stype = avalon.type(search)
	    if (stype === 'function') {
	        var criteria = search
	    } else if (stype === 'string' || stype === 'number' ) {
	        if (search === '') {
	            return array
	        } else {
	            var reg = new RegExp(avalon.escapeRegExp(search), 'i')
	            criteria = function(el){
	                return reg.test(el)
	            }
	        }
	    } else {
	        return array
	    }

	    array = convertArray(array).filter(function (el, i) {
	        return !!criteria.apply(el, [el.value,i].concat(args) )
	    })
	    var isArray = type === 'array'
	    var target = isArray ? [] : {}
	    return recovery(target, array, function (el) {
	        if (isArray) {
	            target.push(el.value)
	        } else {
	            target[el.key] = el.value
	        }
	    })
	}

	function selectBy(data, array, defaults) {
	    if (avalon.isObject(data) && !Array.isArray(data)) {
	        var target = []
	        return recovery(target, array, function (name) {
	            target.push(data.hasOwnProperty(name) ? data[name] : defaults ? defaults[name] : '')
	        })
	    } else {
	        return data
	    }
	}

	Number.isNaN = Number.isNaN || function (a) {
	    return a !== a
	}

	function limitBy(input, limit, begin) {
	    var type = avalon.type(input)
	    if (type !== 'array' && type !== 'object')
	        throw 'limitBy只能处理对象或数组'
	    //尝试将limit转换数值
	    if (Math.abs(Number(limit)) === Infinity) {
	        limit = Number(limit)
	    } else {
	        limit = parseInt(limit, 10)
	    }
	    //转换不了返回
	    if (Number.isNaN(limit)) {
	        return input
	    }
	    //将目标转换为数组
	    if (type === 'object') {
	        input = convertArray(input)
	    }
	    limit = Math.min(input.length, limit)
	    begin = (!begin || Number.isNaN(begin)) ? 0 : ~~begin
	    if (begin < 0) {
	        begin = Math.max(0, input.length + begin)
	    }

	    var data = []
	    for (var i = begin; i < limit; i++) {
	        data.push(input[i])
	    }
	    var isArray = type === 'array'
	    if (isArray) {
	        return data
	    }
	    var target = {}
	    return recovery(target, data, function (el) {
	        target[el.key] = el.value
	    })
	}

	function recovery(ret, array, callback) {
	    for (var i = 0, n = array.length; i < n; i++) {
	        callback(array[i])
	    }
	    return ret
	}


	function convertArray(array) {
	    var ret = [], i = 0
	    avalon.each(array, function (key, value) {
	        ret[i++] = {
	            value: value,
	            key: key
	        }
	    })
	    return ret
	}

	module.exports = {
	    limitBy: limitBy,
	    orderBy: orderBy,
	    selectBy: selectBy,
	    filterBy: filterBy
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	
	var eventFilters = {
	    stop: function (e) {
	        e.stopPropagation()
	        return e
	    },
	    prevent: function (e) {
	        e.preventDefault()
	        return e
	    }
	}
	var keyCode = {
	    esc: 27,
	    tab: 9,
	    enter: 13,
	    space: 32,
	    del: 46,
	    up: 38,
	    left: 37,
	    right: 39,
	    down: 40
	}

	avalon.each(keyCode, function (name, keyCode) {
	    eventFilters[name] = function (e) {
	        if (e.which !== keyCode) {
	            e.$return = true
	        }
	        return e
	    }
	})

	module.exports = eventFilters

/***/ },
/* 14 */,
/* 15 */
/***/ function(module, exports) {

	var rexpr = avalon.config.rexpr

	function VText(text) {
	    if (typeof text === 'string') {
	        this.type = '#text'
	        this.nodeValue = text
	        this.skipContent = !rexpr.test(text)
	        this.nodeType = 3
	    } else {
	        for (var i in text) {
	            this[i] = text[i]
	        }
	    }
	}

	VText.prototype = {
	    constructor: VText,
	    toDOM: function () {
	       var a =  VText.decoder = VText.decoder || document.createElement('p')
	       a.innerHTML = this.nodeValue
	       return a.removeChild(a.firstChild) 
	    },
	    toHTML: function () {
	        return this.nodeValue
	    }
	}

	module.exports = VText

/***/ },
/* 16 */
/***/ function(module, exports) {

	
	function VComment(text) {
	    if (typeof text === 'string') {
	        this.type = '#comment'
	        this.nodeValue = text
	        this.skipContent = true
	        this.nodeType = 8
	    } else {
	        for (var i in text) {
	            this[i] = text[i]
	        }
	    }
	}
	VComment.prototype = {
	    constructor: VComment,
	    toDOM: function () {
	        return document.createComment(this.nodeValue)
	    },
	    toHTML: function () {
	        return '<!--' + this.nodeValue + '-->'
	    }
	}

	module.exports = VComment

/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports) {

	var propMap = {//不规则的属性名映射
	    'accept-charset': 'acceptCharset',
	    'char': 'ch',
	    charoff: 'chOff',
	    'class': 'className',
	    'for': 'htmlFor',
	    'http-equiv': 'httpEquiv'
	}
	/*
	contenteditable不是布尔属性
	http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/
	contenteditable=''
	contenteditable='events'
	contenteditable='caret'
	contenteditable='plaintext-only'
	contenteditable='true'
	contenteditable='false'
	 */
	var bools = ['autofocus,autoplay,async,allowTransparency,checked,controls',
	    'declare,disabled,defer,defaultChecked,defaultSelected,',
	    'isMap,loop,multiple,noHref,noResize,noShade',
	    'open,readOnly,selected'
	].join(',')

	bools.replace(/\w+/g, function (name) {
	    propMap[name.toLowerCase()] = name
	})

	var anomaly = ['accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan',
	    'dateTime,defaultValue,contentEditable,frameBorder,longDesc,maxLength,'+
	    'marginWidth,marginHeight,rowSpan,tabIndex,useMap,vSpace,valueType,vAlign'
	].join(',')

	anomaly.replace(/\w+/g, function (name) {
	    propMap[name.toLowerCase()] = name
	})

	module.exports = propMap


/***/ },
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(27)

	var fixCloneNode = __webpack_require__(28)

	var rhtml = /<|&#?\w+;/
	var htmlCache = new Cache(128)
	var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig

	avalon.parseHTML = function (html) {
	    var fragment = avalon.avalonFragment.cloneNode(false)
	    //处理非字符串
	    if (typeof html !== 'string') {
	        return fragment
	    }
	    //处理非HTML字符串
	    if (!rhtml.test(html)) {
	        return document.createTextNode(html)
	    }

	    html = html.replace(rxhtml, '<$1></$2>').trim()
	    var hasCache = htmlCache.get(html)
	    if (hasCache) {
	        return fixCloneNode(hasCache)
	    }
	    var vnodes = avalon.lexer(html, false, 1000)
	    for (var i = 0, el; el = vnodes[i++]; ) {
	        fragment.appendChild(avalon.vdomAdaptor(el, 'toDOM'))
	    }
	    if (html.length < 1024) {
	        htmlCache.put(html, fixCloneNode(fragment))
	    }
	    return fragment
	}

	avalon.innerHTML = function (node, html) {
	    if (!avalon.modern && (!rcreate.test(html) && !rnest.test(html))) {
	        try {
	            node.innerHTML = html
	            return
	        } catch (e) {
	        }
	    }
	    var parsed = this.parseHTML(html)
	    this.clearHTML(node).appendChild(parsed)
	}

	var reunescapeHTML = /&(?:amp|lt|gt|quot|#39|#96);/g
	var htmlUnescapes = {
	    '&amp;': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&#39;': "'",
	    '&#96;': '`'
	}
	avalon.unescapeHTML = function (string) {
	    var str = '' + string
	    return str.replace(reunescapeHTML, function (c) {
	        return htmlUnescapes[c]
	    })
	}

	var rescapeHTML = /["'&<>]/
	//https://github.com/nthtran/vdom-to-html
	//将字符串经过 str 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt 
	avalon.escapeHtml = function (string) {
	    var str = '' + string
	    var match = rescapeHTML.exec(str)

	    if (!match) {
	        return str
	    }

	    var escape
	    var html = ''
	    var index = 0
	    var lastIndex = 0

	    for (index = match.index; index < str.length; index++) {
	        switch (str.charCodeAt(index)) {
	            case 34: // "
	                escape = '&quot;'
	                break
	            case 38: // &
	                escape = '&amp;'
	                break
	            case 39: // '
	                escape = '&#39;'
	                break
	            case 60: // <
	                escape = '&lt;'
	                break
	            case 62: // >
	                escape = '&gt;'
	                break
	            default:
	                continue
	        }

	        if (lastIndex !== index) {
	            html += str.substring(lastIndex, index)
	        }

	        lastIndex = index + 1
	        html += escape
	    }

	    return lastIndex !== index
	            ? html + str.substring(lastIndex, index)
	            : html
	}

	avalon.clearHTML = function (node) {
	    node.textContent = ''
	    while (node.lastChild) {
	        node.removeChild(node.lastChild)
	    }
	    return node
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	// https://github.com/rsms/js-lru
	function LRU(maxLength) {
	    this.size = 0
	    this.limit = maxLength
	    this.head = this.tail = void 0
	    this._keymap = {}
	}

	var p = LRU.prototype

	p.put = function (key, value) {
	    var entry = {
	        key: key,
	        value: value
	    }
	    this._keymap[key] = entry
	    if (this.tail) {
	        this.tail.newer = entry
	        entry.older = this.tail
	    } else {
	        this.head = entry
	    }
	    this.tail = entry
	    if (this.size === this.limit) {
	        this.shift()
	    } else {
	        this.size++
	    }
	    return value
	}

	p.shift = function () {
	    var entry = this.head
	    if (entry) {
	        this.head = this.head.newer
	        this.head.older =
	                entry.newer =
	                entry.older =
	                this._keymap[entry.key] = void 0
	        delete this._keymap[entry.key] //#1029
	    }
	}
	p.get = function (key) {
	    var entry = this._keymap[key]
	    if (entry === void 0)
	        return
	    if (entry === this.tail) {
	        return  entry.value
	    }
	    // HEAD--------------TAIL
	    //   <.older   .newer>
	    //  <--- add direction --
	    //   A  B  C  <D>  E
	    if (entry.newer) {
	        if (entry === this.head) {
	            this.head = entry.newer
	        }
	        entry.newer.older = entry.older // C <-- E.
	    }
	    if (entry.older) {
	        entry.older.newer = entry.newer // C. --> E
	    }
	    entry.newer = void 0 // D --x
	    entry.older = this.tail // D. --> E
	    if (this.tail) {
	        this.tail.newer = entry // E. <-- D
	    }
	    this.tail = entry
	    return entry.value
	}

	module.exports = LRU


/***/ },
/* 28 */
/***/ function(module, exports) {

	var rcheckedType = /radio|checkbox/

	function fix(dest, src) {
	    if (dest.nodeType !== 1) {
	        return
	    }
	    var nodeName = dest.nodeName.toLowerCase()
	    if (nodeName === 'object') {
	        if (dest.parentNode) {
	            dest.outerHTML = src.outerHTML
	        }

	    } else if (nodeName === 'input' && rcheckedType.test(src.type)) {

	        dest.defaultChecked = dest.checked = src.checked

	        if (dest.value !== src.value) {
	            dest.value = src.value
	        }

	    } else if (nodeName === 'option') {
	        dest.defaultSelected = dest.selected = src.defaultSelected
	    } else if (nodeName === 'input' || nodeName === 'textarea') {
	        dest.defaultValue = src.defaultValue
	    }
	}


	function getAll(context) {
	    return typeof context.getElementsByTagName !== "undefined" ?
	            context.getElementsByTagName("*") :
	            typeof context.querySelectorAll !== "undefined" ?
	            context.querySelectorAll("*") : []
	}

	function fixCloneNode(src) {
	    var target = src.cloneNode(true)
	    if (avalon.modern)
	        return target
	    var t = getAll(target)
	    var s = getAll(src)
	    avalon.each(s, function (i) {
	        fix(t[i], s[i])
	    })
	    return target
	}

	module.exports = fixCloneNode

/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports) {

	//http://www.feiesoft.com/html/events.html
	//http://segmentfault.com/q/1010000000687977/a-1020000000688757
	module.exports = {
	    click: true,
	    dblclick: true,
	    keydown: true,
	    keypress: true,
	    keyup: true,
	    mousedown: true,
	    mousemove: true,
	    mouseup: true,
	    mouseover: true,
	    mouseout: true,
	    wheel: true,
	    mousewheel: true,
	    input: true,
	    change: true,
	    beforeinput: true,
	    compositionstart: true,
	    compositionupdate: true,
	    compositionend: true,
	    select: true,
	    //http://blog.csdn.net/lee_magnum/article/details/17761441
	    cut: true,
	    copy: true,
	    paste: true,
	    beforecut: true,
	    beforecopy: true,
	    beforepaste: true,
	    focusin: true,
	    focusout: true,
	    DOMFocusIn: true,
	    DOMFocusOut: true,
	    DOMActivate: true,
	    dragend: true,
	    datasetchanged: true
	}

/***/ },
/* 31 */,
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var getHTML = __webpack_require__(33)
	var first = true
	function scan(nodes) {
	    for (var i = 0, elem; elem = nodes[i++]; ) {
	        if (elem.nodeType === 1) {
	            var $id = getController(elem)

	            var vm = avalon.vmodels[$id]
	            if (vm && !vm.$element) {
	                avalon(elem).removeClass('ms-controller')
	                vm.$element = elem
	                var now = new Date()
	                //IE6-8下元素的outerHTML前面会有空白
	                var text = getHTML(elem)//elem.outerHTML
	                elem.vtree = avalon.lexer(text)
	                avalon.speedUp(elem.vtree)
	                var now2 = new Date()
	                first && avalon.log('构建虚拟DOM耗时', now2 - now, 'ms')
	                vm.$render = avalon.render(elem.vtree)
	                avalon.scopes[vm.$id] = {
	                    vmodel: vm,
	                    local: {},
	                    isTemp: true
	                }
	                var now3 = new Date()
	                first && avalon.log('构建当前vm的$render方法耗时 ', now3 - now2, 'ms\n',
	                        '如果此时间太长,达100ms以上\n',
	                        '建议将当前ms-controller拆分成多个ms-controlelr,减少每个vm管辖的区域')
	                avalon.rerenderStart = now3
	                first = false
	                avalon.batch($id)

	            } else if (!$id) {
	                scan(elem.childNodes)
	            }
	        }
	    }
	}

	module.exports = avalon.scan = function (a) {
	    if (!a || !a.nodeType) {
	        avalon.warn('[avalon.scan] first argument must be element , documentFragment, or document')
	        return
	    }
	    scan([a])
	}

	function getController(a) {
	    return a.getAttribute('ms-controller') || a.getAttribute('ms-important')
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	var noChild = avalon.oneObject("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr")

	function getHTML(el) {
	    switch (el.nodeType) {
	        case 1:
	            var type = el.nodeName.toLowerCase()
	            return '<' + type + getAttributes(el.attributes) +
	                    (noChild[type] ? '/>' : ('>' + getChild(el) + '</' + type + '>'))
	        case 3:
	            return el.nodeValue
	        case 8:
	            return '<!--' + el.nodeValue + '-->'
	    }
	}


	function getAttributes(array) {
	    var ret = []
	    for (var i = 0, attr; attr = array[i++]; ) {
	        if (attr.specified) {
	            ret.push(attr.name.toLowerCase()+'="' + avalon.escapeHtml(attr.value) + '"')
	        }
	    }
	    var str = ret.join(' ')
	    return str ? ' ' + str : ''
	}

	function getChild(el) {
	    var ret = ''
	    for (var i = 0, node; node = el.childNodes[i++]; ) {
	        ret += getHTML(node)
	    }
	    return ret
	}

	module.exports = getHTML


/***/ },
/* 34 */,
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 抽离出来公用
	var update = __webpack_require__(36)

	avalon.directive('important', {
	    priority: 1,
	    parse: function (copy, src, binding) {
	        var quoted = avalon.quote(binding.expr)
	        copy[binding.name] = quoted
	        copy.local = '{}'
	        copy.vmodel = '(function(){ return __vmodel__ = avalon.vmodels[' + quoted + ']})()'
	        src.$prepend = ['(function(__vmodel__){',
	            'var important = avalon.scopes[' + quoted + ']',
	            'if(important){avalon.log("不进入"+' + quoted + ');return }',
	        ].join('\n') + '\n'
	        src.$append = '\n})();'
	    },
	    diff: function (copy, src, name) {
	        if (src.vmodel !== copy.vmodel) {
	            src['ms-controller'] = copy[name]
	            src.local = copy.local
	            src.vmodel = copy.vmodel
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom, parent) {
	        avalon.directives.controller.update(dom, vdom, parent, 'important')
	    }
	})


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function (vdom, update, hookName) {
	    if (hookName) {
	        vdom.afterChange = vdom.afterChange || []
	        avalon.Array.ensure(vdom.afterChange, update)
	    } else {
	        var dom = vdom.dom
	        update(vdom.dom, vdom, dom && dom.parentNode)
	    }
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 抽离出来公用
	var update = __webpack_require__(36)
	var reconcile = __webpack_require__(38)

	var cache = {}
	avalon.mediatorFactoryCache = function (__vmodel__, __present__) {
	    var a = __vmodel__.$hashcode
	    var b = __present__.$hashcode
	    var id = a + b
	    if (cache[id]) {
	        return cache[id]
	    }
	    var c = avalon.mediatorFactory(__vmodel__, __present__)
	    return  cache[id] = c
	}
	avalon.directive('controller', {
	    priority: 2,
	    parse: function (copy, src, binding) {
	        var quoted = avalon.quote(binding.expr)
	        copy[binding.name] = quoted
	        copy.local = '__local__'
	        copy.vmodel = [
	            '(function(){',
	            'var vm = avalon.vmodels[' + quoted + ']',
	            'if(vm && __vmodel__&& vm !== __vmodel__){',
	            'return __vmodel__ = avalon.mediatorFactoryCache(__vmodel__, vm)',
	            '}else if(vm){',
	            'return __vmodel__ = vm',
	            '}',
	            '})()'
	        ].join('\n')

	        src.$prepend = '(function(__vmodel__){'
	        src.$append = '\n})(__vmodel__);'
	    },
	    diff: function (copy, src, name) {
	        if (src[name] !== copy[name]) {
	            src[name] = copy[name]
	            src.local = copy.local
	            src.vmodel = copy.vmodel
	            update(src, this.update)

	        }
	    },
	    update: function (dom, vdom, parent, important) {
	        var vmodel = vdom.vmodel
	        var local = vdom.local
	        var id = vdom['ms-controller']
	        var scope = avalon.scopes[id]
	        if (scope) {
	            return
	        }
	        delete vdom.vmodel
	        delete vdom.local
	        var top = avalon.vmodels[id]
	        var render = avalon.render([vdom], local)
	        vmodel.$render = render
	        vmodel.$element = dom
	        reconcile([dom], vdom, parent)
	        dom.vtree = [vdom]
	        if (top !== vmodel) {
	            top.$render = top.$render || render
	            top.$element = top.$element || dom
	        }
	        var needFire = important ? vmodel : top
	        var scope = avalon.scopes[id] = {
	            vmodel: vmodel,
	            local: local
	        }
	        update(vdom, function () {
	            var events = needFire.$events["onReady"]
	            if (events) {
	                needFire.$fire('onReady')
	                delete needFire.$events.onReady
	            }
	            scope.isMount = true
	        }, 'afterChange')

	    }
	})


/***/ },
/* 38 */
/***/ function(module, exports) {

	/*
	 * 
	 节点对齐算法
	 元素节点是1＋其类型
	 文本节点是3＋其是否能移除
	 注释节点是8＋其内容
	 发现不一样，就对真实DOM树添加或删除
	 添加的是 ms-for,ms-for-end占位的注释节点
	 删除的是多余的空白文本节点,与IE6-8私下添加的奇怪节点
	 */
	var rretain = /[\S\xA0]/
	var rforRange = /^8ms\-for/
	var containers = avalon.oneObject('script,style,xmp,template,noscript,textarea')


	function reconcile(nodes, vnodes, parent) {
	    //遍平化虚拟DOM树
	    vnodes = flatten(vnodes)
	    var map = {}
	    var vn = vnodes.length
	    if (vn === 0)
	        return

	    vnodes.forEach(function (el, index) {
	        map[index] = getType(el)
	    })
	    var newNodes = [], change = false, el, i = 0
	    var breakLoop = 0
	    while (true) {
	        el = nodes[i++]
	        if (breakLoop++ > 5000) {
	            break
	        }
	        var vtype = el && getType(el)
	        var v = newNodes.length
	        if (map[v] === vtype) {
	            newNodes.push(el)
	            var vnode = vnodes[v]

	            if (vnode.dynamic) {
	                vnode.dom = el
	            }

	            if (el.nodeType === 1 && !vnode.isVoidTag && !containers[vnode.type]) {
	                if (el.type === 'select-one') {
	                    //在chrome与firefox下删掉select中的空白节点，会影响到selectedIndex
	                    var fixIndex = el.selectedIndex
	                }
	                reconcile(el.childNodes, vnode.children, el)
	                if (el.type === 'select-one') {
	                    el.selectedIndex = fixIndex
	                }
	            }
	        } else {
	            change = true
	            if (rforRange.test(map[v])) {
	                var vv = vnodes[v]
	                var nn = document.createComment(vv.nodeValue)
	                vv.dom = nn
	                newNodes.push(nn)
	                i = Math.max(0, --i)
	            }
	        }
	        if (newNodes.length === vn) {
	            break
	        }
	    }
	    if (change) {
	        var f = document.createDocumentFragment(), i = 0
	        while (el = newNodes[i++]) {
	            f.appendChild(el)
	        }
	        while (parent.firstChild) {
	            parent.removeChild(parent.firstChild)
	        }
	        parent.appendChild(f)
	    }
	}

	module.exports = reconcile


	function getType(node) {
	    switch (node.nodeType) {
	        case 3:
	            return '3' + (/[\S\xA0]/.test(node.nodeValue) ? 'retain' : 'remove')
	        case 1:
	            return '1' + (node.nodeName || node.type).toLowerCase()
	        case 8:
	            return '8' + node.nodeValue

	    }

	}

	function flatten(nodes) {
	    var arr = []
	    for (var i = 0, el; el = nodes[i]; i++) {
	        if (Array.isArray(el)) {
	            arr = arr.concat(flatten(el))
	        } else {
	            arr.push(el)
	        }
	    }
	    return arr
	}



/***/ },
/* 39 */,
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	
	var update = __webpack_require__(36)

	avalon.directive('css', {
	    diff: function (copy, src, name) {
	        var a = copy[name]
	        var p = src[name]
	        if (Object(a) === a) {
	            
	            a = a.$model || a//安全的遍历VBscript
	            if (Array.isArray(a)) {//转换成对象
	                a = avalon.mix.apply({}, a)
	            }
	            if (typeof p !== 'object') {//如果一开始为空
	                src.changeStyle = src[name] = a
	            } else {
	                var patch = {}
	                var hasChange = false
	                for (var i in a) {//diff差异点
	                    if (a[i] !== p[i]) {
	                        hasChange = true
	                        patch[i] = a[i]
	                    }
	                }
	                if (hasChange) {
	                    src[name] = a
	                    src.changeStyle = patch
	                }
	            }
	            if (src.changeStyle) {
	                update(src, this.update)
	            }
	        }
	        delete copy[name]//释放内存
	    },
	    update: function (dom, vdom) {
	        var change = vdom.changeStyle
	        var wrap = avalon(dom)
	        for (var name in change) {
	            wrap.css(name, change[name])
	        }
	        delete vdom.changeStyle
	    }
	})


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(36)

	var none = 'none'
	function parseDisplay(elem, val) {
	    //用于取得此类标签的默认display值
	    var doc = elem.ownerDocument
	    var nodeName = elem.nodeName
	    var key = '_' + nodeName
	    if (!parseDisplay[key]) {
	        var temp = doc.body.appendChild(doc.createElement(nodeName))
	        if (avalon.modern) {
	            val = getComputedStyle(temp, null).display
	        } else {
	            val = temp.currentStyle.display
	        }
	        doc.body.removeChild(temp)
	        if (val === none) {
	            val = 'block'
	        }
	        parseDisplay[key] = val
	    }
	    return parseDisplay[key]
	}

	avalon.parseDisplay = parseDisplay

	avalon.directive('visible', {
	    diff: function (copy, src, name) {
	        var c = !!copy[name]
	        if (c !== src[name]) {
	            src[name] = c
	            update(src, this.update )
	        }
	    },
	    update: function (dom, vdom) { 
	        if(!dom || dom.nodeType !== 1){
	            return
	        }
	        var show = vdom['ms-visible']
	        var display = dom.style.display
	        var value
	        if (show) {
	            if (display === none) {
	                value = vdom.displayValue
	                if (!value) {
	                    dom.style.display = ''
	                }
	            }
	            if (dom.style.display === '' && avalon(dom).css('display') === none &&
	                    // fix firefox BUG,必须挂到页面上
	                    avalon.contains(dom.ownerDocument, dom)) {

	                value = parseDisplay(dom)
	            }
	        } else {
	            if (display !== none) {
	                value = none
	                vdom.displayValue = display
	            }
	        }
	        function cb(){
	           if (value !== void 0) {
	              dom.style.display = value
	           }
	        }
	        avalon.applyEffect(dom, vdom, {
	            hook: show ? 'onEnterDone': 'onLeaveDone',
	            cb: cb
	        })
	    }
	})



/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(36)

	avalon.directive('expr', {
	    parse: avalon.noop,
	    diff: function (copy, src) {
	        var copyValue = copy.nodeValue + ''
	        if (copyValue !== src.nodeValue) {
	            src.nodeValue = copyValue
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom) {
	        if (dom) {
	            dom.nodeValue = vdom.nodeValue
	        } else {
	            avalon.warn('[', vdom.nodeValue, ']找到对应的文本节点赋值')
	        }
	    }
	})




/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	//此指令实际上不会操作DOM,交由expr指令处理
	var update = __webpack_require__(36)

	avalon.directive('text', {
	    parse: function (copy, src, binding) {
	        copy[binding.name] = 1
	        src.children = []
	        copy.children = '[{\nnodeType:3,\ntype:"#text",\ndynamic:true,' +
	                '\nnodeValue:avalon.parsers.string(' +
	                avalon.parseExpr(binding) + ')}]'
	    },
	    diff: function (copy, src) {
	        if(!src.children.length){
	           update(src, this.update)
	        }
	    },
	    update: function(dom, vdom){
	        if (dom && !vdom.isVoidTag ) {
	            var parent = dom
	            while (parent.firstChild) {
	                parent.removeChild(parent.firstChild)
	            }
	            var dom = document.createTextNode('x')
	            parent.appendChild(dom)
	            var a = {nodeType: 3, type:'#text', dom: dom}
	            vdom.children.push(a)
	        }
	    }
	})

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(36)
	var reconcile = __webpack_require__(38)
	var parseView = __webpack_require__(45)


	avalon.directive('html', {
	    parse: function (copy, src, binding) {
	        if (!src.isVoidTag) {
	            //将渲染函数的某一部分存起来,渲在c方法中转换为函数
	            copy[binding.name] = avalon.parseExpr(binding)
	            copy.vmodel = '__vmodel__'
	            copy.local = '__local__'
	        } else {
	            copy.children = '[]'
	        }
	    },
	    diff: function (copy, src, name) {
	        var copyValue = copy[name] + ''
	        if (copyValue !== src[name]) {
	            src[name] = copyValue
	            var oldTree = avalon.lexer(copyValue)
	            avalon.speedUp(oldTree)
	            src.children = oldTree
	            var render = avalon.render(oldTree,copy.local)
	            src.render = render
	            var newTree = render(copy.vmodel, copy.local)
	            copy.children = newTree
	            update(src, this.update)
	        } else {
	            var newTree = src.render(copy.vmodel, copy.local)
	            copy.children = newTree
	        }
	    },

	    update: function (dom, vdom, parent) {
	        avalon.clearHTML(dom)
	        var f = avalon.vdomAdaptor(vdom.children)
	        reconcile(f.childNodes, vdom.children, f)
	        dom.appendChild(f)
	    }
	})


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * 本模块是用于将虚拟DOM变成一个函数
	 */

	var extractBindings = __webpack_require__(46)
	var stringify = __webpack_require__(47)
	var parseExpr = __webpack_require__(48)
	var decode = __webpack_require__(50)
	var config = avalon.config
	var quote = avalon.quote
	var rident =  /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
	var rstatement = /^\s*var\s+([$\w]+)\s*\=\s*\S+/
	var skips = {__local__: 1,vmode:1, dom: 1}


	function parseNodes(source, inner) {
	    //ms-important， ms-controller ， ms-for 不可复制，省得死循环
	    //ms-important --> ms-controller --> ms-for --> ms-widget --> ms-effect --> ms-if
	    var buffer = inner ? [] : ['\nvar vnodes = [];']

	    for (var i = 0, el; el = source[i++]; ) {
	        var vnode = parseNode(el)
	        if (el.$prepend) {
	            buffer.push(el.$prepend)
	        }
	        var append = el.$append
	        delete el.$append
	        delete el.$prepend
	        if (vnode) {
	            buffer.push(vnode + '\n')
	        }
	        if (append) {
	            buffer.push(append)
	        }
	    }
	    if (!inner) {
	        buffer.push('return vnodes\n')
	    }
	    return buffer.join('\n')
	}



	function parseNode(vdom) {
	    switch (vdom.nodeType) {
	        case 3:
	            if (config.rexpr.test(vdom.nodeValue)) {
	                return add(parseText(vdom))
	            } else {
	                return addTag(vdom)
	            }
	        case 1:
	            var copy = {
	                props: {},
	                type: vdom.type,
	                nodeType: 1
	            }
	            var bindings = extractBindings(copy, vdom.props)
	            var order = bindings.map(function (b) {
	                //将ms-*的值变成函数,并赋给copy.props[ms-*]
	                //如果涉及到修改结构,则在source添加$append,$prepend
	                avalon.directives[b.type].parse(copy, vdom, b)
	                return b.name
	            }).join(',')
	            if (order) {
	                copy.order = order
	            }
	            if (vdom.isVoidTag) {
	                copy.isVoidTag = true
	            } else {
	                if (!('children' in copy)) {
	                    var c = vdom.children
	                    if (c.length) {
	                        copy.children = '(function(){' + parseNodes(c) + '})()'
	                    } else {
	                        copy.children = '[]'
	                    }
	                }
	            }
	            if (vdom.skipContent)
	                copy.skipContent = true
	            if (vdom.skipAttrs)
	                copy.skipAttrs = true

	            return addTag(copy)
	        case 8:
	            var nodeValue = vdom.nodeValue
	            if (vdom.dynamic === 'for') {// 处理ms-for指令
	                if (nodeValue.indexOf('ms-for:') !== 0) {
	                    avalon.error('ms-for指令前不能有空格')
	                }
	                var copy = {
	                    dynamic: 'for',
	                    vmodel: '__vmodel__'
	                }
	                for (var i in vdom) {
	                    if (vdom.hasOwnProperty(i) && !skips[i]) {
	                        copy[i] = vdom[i]
	                    }
	                }

	                avalon.directives['for'].parse(copy, vdom, vdom)
	                return addTag(copy)
	            } else if (vdom.dynamic) {
	                if (nodeValue.indexOf('ms-for-end:') !== 0) {
	                    avalon.error('ms-for-end指令前不能有空格')
	                }
	                vdom.$append = addTag({
	                    nodeType: 8,
	                    type: '#comment',
	                    nodeValue: vdom.signature,
	                    key: 'traceKey'
	                }) + '\n},__local__,vnodes)\n' +
	                        addTag({
	                            nodeType: 8,
	                            type: "#comment",
	                            signature: vdom.signature,
	                            nodeValue: "ms-for-end:"
	                        }) + '\n'
	                return ''

	            } else if (nodeValue.indexOf('ms-js:') === 0) {//插入JS声明语句
	                var statement = parseExpr(nodeValue.replace('ms-js:', ''), 'js') + '\n'
	                var ret = addTag(vdom)
	                var match = statement.match(rstatement)
	                if (match && match[1]) {
	                    vdom.$append = (vdom.$append || '') + statement +
	                            "\n__local__." + match[1] + ' = ' + match[1] + '\n'
	                } else {
	                    avalon.warn(nodeValue + ' parse fail!')
	                }
	                return ret
	            } else {
	                return addTag(vdom)
	            }
	        default:
	            if (Array.isArray(vdom)) {
	                vdom.$append = parseNodes(vdom, true)
	            }
	    }

	}

	module.exports = parseNodes

	function wrapDelimiter(expr) {
	    return rident.test(expr) ? expr : parseExpr(expr, 'text')
	}

	function add(a) {
	    return 'vnodes.push(' + a + ');'
	}
	function addTag(obj) {
	    return add(stringify(obj))
	}

	function parseText(el) {
	    var array = extractExpr(el.nodeValue)//返回一个数组
	    var nodeValue = ''
	    if (array.length === 1) {
	        nodeValue = wrapDelimiter(array[0].expr)
	    } else {
	        var token = array.map(function (el) {
	            return el.type ? wrapDelimiter(el.expr) : quote(el.expr)
	        }).join(' + ')
	        nodeValue = 'String(' + token + ')'
	    }
	    return '{\ntype: "#text",\nnodeType:3,\ndynamic:true,\nnodeValue: ' + nodeValue + '\n}'
	}

	var rlineSp = /\n\s*/g

	function extractExpr(str) {
	    var ret = []
	    do {//aaa{{@bbb}}ccc
	        var index = str.indexOf(config.openTag)
	        index = index === -1 ? str.length : index
	        var value = str.slice(0, index)
	        if (/\S/.test(value)) {
	            ret.push({expr: decode(value)})
	        }
	        str = str.slice(index + config.openTag.length)
	        if (str) {
	            index = str.indexOf(config.closeTag)

	            var value = str.slice(0, index)
	            ret.push({
	                expr: value.replace(rlineSp, ''),
	                type: '{{}}'
	            })
	            str = str.slice(index + config.closeTag.length)
	        }
	    } while (str.length)

	   return ret
	}


/***/ },
/* 46 */
/***/ function(module, exports) {

	var directives = avalon.directives
	var rbinding = /^ms-(\w+)-?(.*)/
	var eventMap = avalon.oneObject('animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit')

	function extractBindings(cur, props) {
	    var bindings = []
	    var skip = 'ms-skip' in props
	    var uniq = {}
	    for (var i in props) {
	        var value = props[i], match

	        if (!skip && (match = i.match(rbinding))) {
	            var type = match[1]
	            var param = match[2] || ''
	            var name = i
	            if (eventMap[type]) {
	                var order = parseFloat(param) || 0
	                param = type
	                type = 'on'
	            }
	            name = 'ms-' + type + (param ? '-' + param : '')
	            if (i !== name) {
	                delete props[i]
	                props[name] = value
	            }
	            if (directives[type]) {

	                var binding = {
	                    type: type,
	                    param: param,
	                    name: name,
	                    expr: value,
	                    priority: directives[type].priority || type.charCodeAt(0) * 100
	                }
	                if (type === 'on') {
	                    order = order || 0
	                    binding.name += '-' + order
	                    binding.priority = param.charCodeAt(0) * 100 + order
	                }
	                if (!uniq[binding.name]) {
	                    uniq[binding.name] = 1
	                    bindings.push(binding)
	                }
	            }
	        } else {
	            cur.props[i] = props[i]
	        }
	    }
	    bindings.sort(byPriority)

	    return bindings
	}

	function byPriority(a, b) {
	    return a.priority - b.priority
	}

	module.exports = extractBindings


/***/ },
/* 47 */
/***/ function(module, exports) {

	var keyMap = avalon.oneObject("break,case,catch,continue,debugger,default,delete,do,else,false," +
	        "finally,for,function,if,in,instanceof,new,null,return,switch,this," +
	        "throw,true,try,typeof,var,void,while,with," + /* 关键字*/
	        "abstract,boolean,byte,char,class,const,double,enum,export,extends," +
	        "final,float,goto,implements,import,int,interface,long,native," +
	        "package,private,protected,public,short,static,super,synchronized," +
	        "throws,transient,volatile")
	avalon.keyMap = keyMap
	  var quoted = {
	      type: 1,
	      template: 1,
	      order: 1,
	      nodeValue: 1,
	      dynamic: 1,
	      signature: 1,
	      wid: 1,
	      cid: 1
	  }

	var rneedQuote = /[W-]/
	var quote = avalon.quote
	function fixKey(k) {
	    return (rneedQuote.test(k) || keyMap[k]) ? quote(k) : k
	}

	function stringify(obj) {
	    var arr1 = []
	//字符不用东西包起来就变成变量
	    for (var i in obj) {
	        if (i === 'props') {
	            var arr2 = []
	            for (var k in obj.props) {
	                var kv = obj.props[k]
	                if (typeof kv === 'string') {
	                    kv = quote(kv)
	                }
	                arr2.push(fixKey(k) + ': ' + kv)
	            }
	            arr1.push('props: {' + arr2.join(',\n') + '}')
	        } else if(obj.hasOwnProperty(i) && i !== 'dom') {
	           
	            var v = obj[i]
	            if (typeof v === 'string') {
	                v = quoted[i] ? quote(v) : v
	            }
	            arr1.push(fixKey(i) + ':' + v)
	        }
	    }
	    return '{\n' + arr1.join(',\n') + '}'
	}

	module.exports = stringify


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	

	//缓存求值函数，以便多次利用
	var evaluatorPool = __webpack_require__(49)

	var rregexp = /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/g
	var rstring = /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g
	var rfill = /\?\?\d+/g
	var brackets = /\(([^)]*)\)/

	var rshortCircuit = /\|\|/g
	var rpipeline = /\|(?=\w)/
	var ruselessSp = /\s*(\.|\|)\s*/g

	var rAt = /(^|[^\w\u00c0-\uFFFF_])(@|##)(?=[$\w])/g
	var rhandleName = /^(?:\@|##)[$\w]+$/i

	var rfilters = /\|.+/g
	var rvar = /((?:\@|\$|\#\#)?\w+)/g

	function collectLocal(str, ret) {
	    var arr = str.replace(rfilters, '').match(rvar)
	    if (arr) {
	        arr.filter(function (el) {
	            if (!/^[@\d\-]/.test(el) &&
	                    el.slice(0, 2) !== '##' &&
	                    el !== '$event' && !avalon.keyMap[el]) {
	                ret[el] = 1
	            }
	        })
	    }
	}

	function extLocal(ret) {
	    var arr = []
	    for (var i in ret) {
	        arr.push('var ' + i + ' = __local__[' + avalon.quote(i) + ']')
	    }
	    return arr
	}

	function parseExpr(str, category) {
	    var binding = {}
	    category = category || 'other'
	    if (typeof str === 'object') {
	        category = str.type
	        binding = str
	        str = binding.expr
	    }
	    if (typeof str !== 'string')
	        return ''
	    var cacheID = str
	    var cacheStr = evaluatorPool.get(category + ':' + cacheID)

	    if (cacheStr) {
	        return cacheStr
	    }

	    var number = 1
	//相同的表达式生成相同的函数
	    var maps = {}
	    function dig(a) {
	        var key = '??' + number++
	        maps[key] = a
	        return key
	    }

	    function fill(a) {
	        return maps[a]
	    }

	    var input = str.replace(rregexp, dig).//移除所有正则
	            replace(rstring, dig).//移除所有字符串
	            
	   // input = avalon.unescapeHTML(input).
	            replace(rshortCircuit, dig).//移除所有短路或
	            replace(ruselessSp, '$1').//移除. |两端空白
	            split(rpipeline) //使用管道符分离所有过滤器及表达式的正体
	    //还原body
	    var _body = input.shift()
	    var local = {}
	    var body = _body.replace(rfill, fill).trim()
	    if (category === 'on' && rhandleName.test(body)) {
	        body = body + '($event)'
	    }

	    body = body.replace(rAt, '$1__vmodel__.')
	    if (category === 'js') {
	        return evaluatorPool.put(category + ':' + cacheID, body)
	    } else if (category === 'on') {
	        collectLocal(_body, local)
	    }

	//处理表达式的过滤器部分

	    var filters = input.map(function (str) {
	        collectLocal(str.replace(/^\w+/g, ""), local)
	        str = str.replace(rfill, fill).replace(rAt, '$1__vmodel__.') //还原
	        var hasBracket = false
	        str = str.replace(brackets, function (a, b) {
	            hasBracket = true
	            return /\S/.test(b) ?
	                    '(__value__,' + b + ');' :
	                    '(__value__);'
	        })
	        if (!hasBracket) {
	            str += '(__value__);'
	        }
	        str = str.replace(/(\w+)/, 'avalon.__format__("$1")')
	        return '__value__ = ' + str
	    })
	    var ret = []
	    if (category === 'on') {
	        filters = filters.map(function (el) {
	            return el.replace(/__value__/g, '$event')
	        })
	        if (filters.length) {
	            filters.push('if($event.$return){\n\treturn;\n}')
	        }
	        if (!avalon.modern) {
	            body = body.replace(/__vmodel__\.([^(]+)\(([^)]*)\)/, function (a, b, c) {
	                return '__vmodel__.' + b + ".call(__vmodel__" + (/\S/.test(c) ? ',' + c : "") + ")"
	            })
	        }

	        ret = ['function ms_on($event, __local__){',
	            'try{',
	            extLocal(local).join('\n'),
	            '\tvar __vmodel__ = this;',
	            '\t' + body,
	            '}catch(e){',
	            quoteError(str, category),
	            '}',
	            '}']
	        filters.unshift(2, 0)
	    } else if (category === 'duplex') {

	//从vm中得到当前属性的值
	        var getterBody = [
	            'function (__vmodel__){',
	            'try{',
	            'return ' + body + '\n',
	            '}catch(e){',
	            quoteError(str, category).replace('parse', 'get'),
	            '}',
	            '}']
	        evaluatorPool.put('duplex:' + cacheID, getterBody.join('\n'))
	        //给vm同步某个属性
	        var setterBody = [
	            'function (__vmodel__,__value__){',
	            'try{',
	            '\t' + body + ' = __value__',
	            '}catch(e){',
	            quoteError(str, category).replace('parse', 'set'),
	            '}',
	            '}']
	        evaluatorPool.put('duplex:set:' + cacheID, setterBody.join('\n'))
	        //对某个值进行格式化
	        if (input.length) {
	            var formatBody = [
	                'function (__vmodel__, __value__){',
	                'try{',
	                filters.join('\n'),
	                'return __value__\n',
	                '}catch(e){',
	                quoteError(str, category).replace('parse', 'format'),
	                '}',
	                '}']
	            evaluatorPool.put('duplex:format:' + cacheID, formatBody.join('\n'))
	        }
	        return  evaluatorPool.get('duplex:' + cacheID)
	    } else {
	        ret = [
	            '(function(){',
	            'try{',
	            'var __value__ = ' + body,
	            (category === 'text' ?
	                    'return avalon.parsers.string(__value__)' :
	                    'return __value__'),
	            '}catch(e){',
	            quoteError(str, category),
	            '\treturn ""',
	            '}',
	            '})()'
	        ]
	        filters.unshift(3, 0)
	    }
	    ret.splice.apply(ret, filters)
	    cacheStr = ret.join('\n')
	    evaluatorPool.put(category + ':' + cacheID, cacheStr)
	    return cacheStr

	}

	function quoteError(str, type) {
	    return '\tavalon.warn(e, ' +
	            avalon.quote('parse ' + type + ' binding【 ' + str + ' 】fail')
	            + ')'
	}

	module.exports = avalon.parseExpr = parseExpr




/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	
	var Cache = __webpack_require__(27)
	//缓存求值函数，以便多次利用
	module.exports = new Cache(512)


/***/ },
/* 50 */
/***/ function(module, exports) {

	/* 
	 * 对html实体进行转义
	 * https://github.com/substack/node-ent
	 * http://www.cnblogs.com/xdp-gacl/p/3722642.html
	 * http://www.stefankrause.net/js-frameworks-benchmark2/webdriver-java/table.html
	 */

	var rentities = /&[a-z0-9#]{2,10};/g
	var temp = avalon.avalonDiv
	module.exports = function (str) {
	    if (rentities.test) {
	        temp.innerHTML = str
	        return temp.innerText || temp.textContent
	    }
	    return str
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	//根据VM的属性值或表达式的值切换类名，ms-class='xxx yyy zzz:flag'
	//http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
	var markID = __webpack_require__(6).getLongID
	var update = __webpack_require__(36)

	function classNames() {
	    var classes = []
	    for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i]
	        var argType = typeof arg
	        if (argType === 'string' || argType === 'number' || arg === true) {
	            classes.push(arg)
	        } else if (Array.isArray(arg)) {
	            classes.push(classNames.apply(null, arg))
	        } else if (argType === 'object') {
	            for (var key in arg) {
	                if (arg.hasOwnProperty(key) && arg[key]) {
	                    classes.push(key)
	                }
	            }
	        }
	    }

	    return classes.join(' ')
	}

	var directives = avalon.directives
	avalon.directive('class', {
	    diff: function (copy, src, name) {
	        var type = name.slice(3)
	        var copyValue = copy[name]
	        var srcValue = src[name] || ''
	        if (!src.classEvent) {
	            var classEvent = {}
	            if (type === 'hover') {//在移出移入时切换类名
	                classEvent.mouseenter = activateClass
	                classEvent.mouseleave = abandonClass
	            } else if (type === 'active') {//在获得焦点时切换类名
	                src.props.tabindex = copy.props.tabindex || -1
	                classEvent.tabIndex = src.props.tabindex
	                classEvent.mousedown = activateClass
	                classEvent.mouseup = abandonClass
	                classEvent.mouseleave = abandonClass
	            }
	            src.classEvent = classEvent
	        }

	        var className = classNames(copyValue)
	        var uniq = {}, arr = []
	        className.replace(/\S+/g, function (el) {
	            if (!uniq[el]) {
	                uniq[el] = 1
	                arr.push(el)
	            }
	        })
	        
	        className = arr.join(' ')
	       
	        if (srcValue !== className) {
	            src[name] = className
	            src['change-' + type] = className
	            update(src, this.update, type)
	        }
	    },
	    update: function (dom, vdom) {
	        if (!dom || dom.nodeType !== 1)
	            return
	        var classEvent = vdom.classEvent
	        if (classEvent) {
	            for (var i in classEvent) {
	                if (i === 'tabIndex') {
	                    dom[i] = classEvent[i]
	                } else {
	                    avalon.bind(dom, i, classEvent[i])
	                }
	            }
	            vdom.classEvent = {}
	        }
	        var names = ['class', 'hover', 'active']
	        names.forEach(function (type) {
	            var name = 'change-' + type
	            var value = vdom[name]
	            if (value === void 0)
	                return
	            if (type === 'class') {
	                dom && setClass(dom, vdom)
	            } else {
	                var oldType = dom.getAttribute('change-' + type)
	                if (oldType) {
	                    avalon(dom).removeClass(oldType)
	                }
	                dom.setAttribute(name, value)
	            }
	        })
	    }
	})

	directives.active = directives.hover = directives['class']


	var classMap = {
	    mouseenter: 'change-hover',
	    mouseleave: 'change-hover',
	    mousedown: 'change-active',
	    mouseup: 'change-active'
	}

	function activateClass(e) {
	    var elem = e.target
	    avalon(elem).addClass(elem.getAttribute(classMap[e.type]) || '')
	}

	function abandonClass(e) {
	    var elem = e.target
	    var name = classMap[e.type]
	    avalon(elem).removeClass(elem.getAttribute(name) || '')
	    if (name !== 'change-active') {
	        avalon(elem).removeClass(elem.getAttribute('change-active') || '')
	    }
	}

	function setClass(dom, vdom) {
	    var old = dom.getAttribute('old-change-class')
	    var neo = vdom['ms-class']
	    if (old !== neo) {
	        avalon(dom).removeClass(old).addClass(neo)
	        dom.setAttribute('old-change-class', neo)
	    }

	}

	markID(activateClass)
	markID(abandonClass)




/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(27)
	var eventCache = new Cache(128)
	var update = __webpack_require__(36)
	var markID = __webpack_require__(6).getLongID

	var rfilters = /\|.+/g
	//Ref: http://developers.whatwg.org/webappapis.html#event-handler-idl-attributes
	// The assumption is that future DOM event attribute names will begin with
	// 'on' and be composed of only English letters.
	var rfilters = /\|.+/g
	var rvar = /((?:\@|\$|\#\#)?\w+)/g
	var rstring = /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g

	//基于事件代理的高性能事件绑定
	avalon.directive('on', {
	    priority: 3000,
	    parse: function (copy, src, binding) {
	        var underline = binding.name.replace('ms-on-', 'e').replace('-', '_')
	        var uuid = underline + '_' + binding.expr.
	                replace(/\s/g, '').
	                replace(/[^$a-z]/ig, function (e) {
	                    return e.charCodeAt(0)
	                })

	        var quoted = avalon.quote(uuid)
	        var fn = '(function(){\n' +
	                'var fn610 = ' +
	                avalon.parseExpr(binding, 'on') +
	                '\nfn610.uuid =' + quoted + ';\nreturn fn610})()'
	        copy.vmodel = '__vmodel__'
	        copy.local = '__local__'
	        copy[binding.name] = fn

	    },
	    diff: function (copy, src, name) {
	        var fn = copy[name]
	        var uuid = fn.uuid
	        var type = uuid.split('_').shift()
	        var search = type.slice(1) + ':' + uuid
	        var srcFn = src[name]
	        var hasChange = false
	        if (!srcFn || srcFn.uuid !== uuid) {
	            src[name] = fn
	            src.addEvents = src.addEvents || {}
	            src.addEvents[search] = fn
	            avalon.eventListeners.uuid = fn
	            hasChange = true
	        }
	        if (diffObj(src.local|| {}, copy.local)) {
	            hasChange = true
	        }
	        if (hasChange) {
	            src.local = copy.local
	            src.vmodel = copy.vmodel
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom) {
	        if (!dom || dom.nodeType > 1) //在循环绑定中，这里为null
	            return
	        var key, type, listener
	        dom._ms_context_ = vdom.vmodel
	        dom._ms_local = vdom.local
	        for (key in vdom.addEvents) {
	            type = key.split(':').shift()
	            listener = vdom.addEvents[key]
	            avalon.bind(dom, type, listener)
	        }
	        delete vdom.addEvents
	    }
	})

	function diffObj(a, b) {
	    for (var i in a) {//diff差异点
	        if (a[i] !== b[i]) {
	            return true
	        }
	    }
	    return false
	}

/***/ },
/* 53 */,
/* 54 */,
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var updateModelMethods = __webpack_require__(56)

	function updateModelHandle(e) {
	    var elem = this
	    var field = this.__ms_duplex__
	    if (elem.composing || field.parse(elem.value) === field.lastViewValue){
	        //防止onpropertychange引发爆栈
	        return
	    }
	   if (elem.caret) {
	        try {
	            var pos = field.getCaret(elem)
	            field.pos = pos
	        } catch (e) {
	            avalon.warn('fixCaret error', e)
	        }
	    }
	    if (field.debounceTime > 4) {
	        var timestamp = new Date()
	        var left = timestamp - field.time || 0
	        field.time = timestamp
	        if (left >= field.debounceTime) {
	            updateModelMethods[field.type].call(field)
	        } else {
	            clearTimeout(field.debounceID)
	            field.debounceID = setTimeout(function () {
	                updateModelMethods[field.type].call(field)
	            }, left)
	        }
	    } else {
	        updateModelMethods[field.type].call(field)
	    }
	}

	module.exports = updateModelHandle

/***/ },
/* 56 */
/***/ function(module, exports) {

	var updateModelMethods = {
	    input: function (prop) {//处理单个value值处理
	        var data = this
	        prop = prop || 'value'
	        var dom = data.dom
	        var rawValue = dom[prop]
	        var parsedValue = data.parse(rawValue)
	        var formatedValue = data.format(data.vmodel, parsedValue)
	        data.lastViewValue = formatedValue
	        //有时候parse后一致,vm不会改变,但input里面的值
	        if (parsedValue !== data.modelValue) {
	            data.set(data.vmodel, parsedValue)
	            callback(data)
	        }
	       
	        dom[prop] = formatedValue
	      
	        var pos = data.pos
	        if (dom.caret ) {
	            data.setCaret(dom, pos)
	         }
	        //vm.aaa = '1234567890'
	        //处理 <input ms-duplex='@aaa|limitBy(8)'/>{{@aaa}} 这种格式化同步不一致的情况 

	    },
	    radio: function () {
	        var data = this
	        if (data.isChecked) {
	            var val = !data.modelValue
	            data.set(data.vmodel, val)
	            callback(data)
	        } else {
	            updateModelMethods.input.call(data)
	            data.lastViewValue = NaN
	        }
	    },
	    checkbox: function () {
	        var data = this
	        var array = data.modelValue
	        if (!Array.isArray(array)) {
	            avalon.warn('ms-duplex应用于checkbox上要对应一个数组')
	            array = [array]
	        }
	        var method = data.dom.checked ? 'ensure' : 'remove'
	        
	        if (array[method]) {
	            var val = data.parse(data.dom.value)
	            array[method](val)
	            callback(data)
	        }

	    },
	    select: function () {
	        var data = this
	        var val = avalon(data.dom).val() //字符串或字符串数组
	        if (val + '' !== this.modelValue + '') {
	            if (Array.isArray(val)) { //转换布尔数组或其他
	                val = val.map(function (v) {
	                    return data.parse(v)
	                })
	            } else {
	                val = data.parse(val)
	            }
	            data.set(data.vmodel, val)
	            callback(data)
	        }
	    },
	    contenteditable: function () {
	        updateModelMethods.input.call(this, 'innerHTML')
	    }
	}

	function callback(data) {
	    if (data.callback) {
	        data.callback.call(data.vmodel, {
	            type: 'changed',
	            target: data.dom
	        })
	    }
	}



	module.exports = updateModelMethods


/***/ },
/* 57 */
/***/ function(module, exports) {

	var valueHijack = false
	try { //#272 IE9-IE11, firefox
	    var setters = {}
	    var aproto = HTMLInputElement.prototype
	    var bproto = HTMLTextAreaElement.prototype
	    function newSetter(value) { // jshint ignore:line
	        setters[this.tagName].call(this, value)
	        if (!this.caret && this.__ms_duplex__) {
	            this.__ms_duplex__.update.call(this)
	        }
	    }
	    var inputProto = HTMLInputElement.prototype
	    Object.getOwnPropertyNames(inputProto) //故意引发IE6-8等浏览器报错
	    setters['INPUT'] = Object.getOwnPropertyDescriptor(aproto, 'value').set

	    Object.defineProperty(aproto, 'value', {
	        set: newSetter
	    })
	    setters['TEXTAREA'] = Object.getOwnPropertyDescriptor(bproto, 'value').set
	    Object.defineProperty(bproto, 'value', {
	        set: newSetter
	    })
	    valueHijack = true
	} catch (e) {
	    //在chrome 43中 ms-duplex终于不需要使用定时器实现双向绑定了
	    // http://updates.html5rocks.com/2015/04/DOM-attributes-now-on-the-prototype
	    // https://docs.google.com/document/d/1jwA8mtClwxI-QJuHT7872Z0pxpZz8PBkf2bGAbsUtqs/edit?pli=1
	}
	module.exports = valueHijack

/***/ },
/* 58 */,
/* 59 */
/***/ function(module, exports) {

	
	module.exports = function addField(node, vnode) {
	    var field = node.__ms_duplex__
	    var rules = vnode['ms-rules']
	    if (rules && !field.validator) {
	        while (node && node.nodeType === 1) {
	            var validator = node._ms_validator_
	            if (validator) {
	                field.rules = rules
	                field.validator = validator
	                if(avalon.Array.ensure(validator.fields, field)){
	                    validator.addField(field)
	                }
	                break
	            }
	            node = node.parentNode
	        }
	    }
	}


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(36)

	var dir = avalon.directive('validate', {
	//验证单个表单元素
	    diff: function (copy, src, name) {
	        var validator = copy[name]
	        var p = src[name]
	        if (p && p.onError && p.addField) {
	            return
	        } else if (Object(validator) === validator) {
	            src.vmValidator = validator
	            if (validator.$id) {//转换为普通对象
	                validator = validator.$model
	            }
	           
	            src[name] = validator
	            for (var name in dir.defaults) {
	                if (!validator.hasOwnProperty(name)) {
	                    validator[name] = dir.defaults[name]
	                }
	            }
	            validator.fields = validator.fields || []
	            update(src, this.update)

	        }
	    },
	    update: function (dom, vdom) {
	        var validator = vdom['ms-validate']
	        dom._ms_validator_ = validator
	        validator.dom = dom
	        var v = vdom.vmValidator 
	        try{
	           v.onManual = onManual
	        }catch(e){}
	        delete vdom.vmValidator 
	        dom.setAttribute("novalidate", "novalidate")
	        function onManual() {
	            dir.validateAll.call(validator, validator.onValidateAll)
	        }
	        if (validator.validateAllInSubmit) {
	            avalon.bind(dom, "submit", function (e) {
	                e.preventDefault()
	                onManual()
	            })
	        }
	       
	        if (typeof validator.onInit === "function") { //vmodels是不包括vmodel的
	            validator.onInit.call(dom, {
	                type: 'init',
	                target: dom,
	                validator: validator
	            })
	        }
	    },
	    validateAll: function (callback) {
	        var validator = this
	        var fn = typeof callback === "function" ? callback : validator.onValidateAll
	        var promise = validator.fields.filter(function (field) {
	            var el = field.dom
	            return el && !el.disabled && validator.dom.contains(el)
	        }).map(function (field) {
	            return dir.validate(field, true)
	        })
	        var reasons = []
	        Promise.all(promise).then(function (array) {
	            for (var i = 0, el; el = array[i++]; ) {
	                reasons = reasons.concat(el)
	            }
	            if (validator.deduplicateInValidateAll) {
	                var uniq = {}
	                reasons = reasons.filter(function (field) {
	                    var el = field.dom
	                    var uuid = el.uniqueID || (el.uniqueID = setTimeout("1"))
	                    if (uniq[uuid]) {
	                        return false
	                    } else {
	                        uniq[uuid] = true
	                        return true
	                    }
	                })
	            }
	            fn.call(validator.dom, reasons) //这里只放置未通过验证的组件
	        })
	    },
	    addField: function (field) {
	        var validator = this
	        var node = field.dom
	        if (validator.validateInKeyup && (!field.isChanged && !field.debounceTime)) {
	            avalon.bind(node, 'keyup', function (e) {
	                dir.validate(field, 0, e)
	            })
	        }
	        if (validator.validateInBlur) {
	            avalon.bind(node, 'blur', function (e) {
	                dir.validate(field, 0, e)
	            })
	        }
	        if (validator.resetInFocus) {
	            avalon.bind(node, 'focus', function (e) {
	                validator.onReset.call(node, e, field)
	            })
	        }
	    },
	    validate: function (field, isValidateAll, event) {
	        var promises = []
	        var value = field.modelValue
	        var elem = field.dom
	        var validator = field.validator
	        if (elem.disabled)
	            return
	        for (var ruleName in field.rules) {
	            var ruleValue = field.rules[ruleName]
	            if (ruleValue === false)
	                continue
	            var hook = avalon.validators[ruleName]
	            var resolve, reject
	            promises.push(new Promise(function (a, b) {
	                resolve = a
	                reject = b
	            }))
	            var next = function (a) {
	                if (field.norequired && value === "") {
	                    a = true
	                }
	                if (a) {
	                    resolve(true)
	                } else {
	                    var reason = {
	                        element: elem,
	                        data: field.data,
	                        message: elem.getAttribute("data-" + ruleName + "-message") || elem.getAttribute("data-message") || hook.message,
	                        validateRule: ruleName,
	                        getMessage: getMessage
	                    }
	                    resolve(reason)
	                }
	            }
	            field.data = {}
	            field.data[ruleName] = ruleValue
	            hook.get(value, field, next)
	        }
	        var reasons = []
	        //如果promises不为空，说明经过验证拦截器
	        var lastPromise = Promise.all(promises).then(function (array) {
	            for (var i = 0, el; el = array[i++]; ) {
	                if (typeof el === "object") {
	                    reasons.push(el)
	                }
	            }
	            if (!isValidateAll) {
	                if (reasons.length) {
	                    validator.onError.call(elem, reasons, event)
	                } else {
	                    validator.onSuccess.call(elem, reasons, event)
	                }
	                validator.onComplete.call(elem, reasons, event)
	            }
	            return reasons
	        })
	        return lastPromise
	    }
	})

	var rformat = /\\?{{([^{}]+)\}}/gm

	function getMessage() {
	    var data = this.data || {}
	    return this.message.replace(rformat, function (_, name) {
	        return data[name] == null ? "" : data[name]
	    })
	}
	dir.defaults = {
	    addField: dir.addField,//供内部使用,收集此元素底下的所有ms-duplex的域对象
	    onError: avalon.noop,
	    onSuccess: avalon.noop,
	    onComplete: avalon.noop,
	    onManual: avalon.noop,
	    onReset: avalon.noop,
	    onValidateAll: avalon.noop,
	    validateInBlur: true, //@config {Boolean} true，在blur事件中进行验证,触发onSuccess, onError, onComplete回调
	    validateInKeyup: true, //@config {Boolean} true，在keyup事件中进行验证,触发onSuccess, onError, onComplete回调
	    validateAllInSubmit: true, //@config {Boolean} true，在submit事件中执行onValidateAll回调
	    resetInFocus: true, //@config {Boolean} true，在focus事件中执行onReset回调,
	    deduplicateInValidateAll: false //@config {Boolean} false，在validateAll回调中对reason数组根据元素节点进行去重
	}

/***/ },
/* 61 */
/***/ function(module, exports) {

	avalon.directive('rules', {
	     parse: function (copy, src, binding) {
	        var rules = binding.expr
	        if (/{.+}/.test(rules)) {
	           copy[binding.name] = avalon.parseExpr(binding)
	        }
	    },
	    diff: function(copy, src, name){
	        src[name] = copy[name]
	    }
	})
	function isRegExp(value) {
	    return avalon.type(value) === 'regexp'
	}
	var rmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i
	var rurl = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
	function isCorrectDate(value) {
	    if (typeof value === "string" && value) { //是字符串但不能是空字符
	        var arr = value.split("-") //可以被-切成3份，并且第1个是4个字符
	        if (arr.length === 3 && arr[0].length === 4) {
	            var year = ~~arr[0] //全部转换为非负整数
	            var month = ~~arr[1] - 1
	            var date = ~~arr[2]
	            var d = new Date(year, month, date)
	            return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date
	        }
	    }
	    return false
	}
	avalon.shadowCopy(avalon.validators, {
	    pattern: {
	        message: '必须匹配{{pattern}}这样的格式',
	        get: function (value, field, next) {
	            var elem = field.element
	            var data = field.data
	            if (!isRegExp(data.pattern)) {
	                var h5pattern = elem.getAttribute("pattern")
	                data.pattern = new RegExp('^(?:' + h5pattern + ')$')
	            }
	            next(data.pattern.test(value))
	            return value
	        }
	    },
	    digits: {
	        message: '必须整数',
	        get: function (value, field, next) {//整数
	            next(/^\-?\d+$/.test(value))
	            return value
	        }
	    },
	    number: {
	        message: '必须数字',
	        get: function (value, field, next) {//数值
	            next(isFinite(value))
	            return value
	        }
	    },
	    required: {
	        message: '必须填写',
	        get: function (value, field, next) {
	            next(value !== "")
	            return value
	        }
	    },
	    equalto: {
	        message: '密码输入不一致',
	        get: function (value, field, next) {
	            var id = String(field.data.equalto)
	            var other = avalon(document.getElementById(id)).val() || ""
	            next(value === other)
	            return value
	        }
	    },
	    date: {
	        message: '日期格式不正确',
	        get: function (value, field, next) {
	            var data = field.data
	            if (avalon.type(data.date) === 'regexp') {
	                next(data.date.test(value))
	            } else {
	                next(isCorrectDate(value))
	            }
	            return value
	        }
	    },
	    url: {
	        message: 'URL格式不正确',
	        get: function (value, field, next) {
	            next(rurl.test(value))
	            return value
	        }
	    },
	    email: {
	        message: 'email格式不正确',
	        get: function (value, field, next) {
	            next(rmail.test(value))
	            return value
	        }
	    },
	    minlength: {
	        message: '最少输入{{minlength}}个字',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.minlength, 10)
	            next(value.length >= num)
	            return value
	        }
	    },
	    maxlength: {
	        message: '最多输入{{maxlength}}个字',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.maxlength, 10)
	            next(value.length <= num)
	            return value
	        }
	    },
	    min: {
	        message: '输入值不能小于{{min}}',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.min, 10)
	            next(parseFloat(value) >= num)
	            return value
	        }
	    },
	    max: {
	        message: '输入值不能大于{{max}}',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.max, 10)
	            next(parseFloat(value) <= num)
	            return value
	        }
	    },
	    chs: {
	        message: '必须是中文字符',
	        get: function (value, field, next) {
	            next(/^[\u4e00-\u9fa5]+$/.test(value))
	            return value
	        }
	    }
	})

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(36)
	//ms-imporant ms-controller ms-for ms-widget ms-effect ms-if   ...
	avalon.directive('if', {
	    priority: 6,
	    diff: function (copy, src, name) {
	        var c = !!copy[name]
	        if (!c) {
	            copy.nodeType = 8
	            copy.order = ""
	            //不再执行子孙节点的操作
	            copy.skipContent = true
	        }
	        if (c !== src[name]) {
	            src[name] = c
	            if (c && src.nodeType === 1) {
	                return
	            }
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom, parent) {
	        var show = vdom['ms-if']
	        if (show) {
	            //要移除元素节点,在对应位置上插入注释节点
	            vdom.nodeType = 1
	            vdom.nodeValue = null
	            var comment = vdom.comment
	            parent = comment.parentNode
	            parent.replaceChild(dom, comment)
	            avalon.applyEffect(dom, vdom, {
	                hook: 'onEnterDone'
	            })
	        } else {

	            avalon.applyEffect(dom, vdom, {
	                hook: 'onLeaveDone',
	                cb: function () {
	                    var comment = document.createComment('ms-if')
	                    //去掉注释节点临时添加的ms-effect
	                    //https://github.com/RubyLouvre/avalon/issues/1577
	                    //这里必须设置nodeValue为ms-if,否则会在节点对齐算法中出现乱删节点的BUG
	                    vdom.nodeValue = 'ms-if'
	                    parent.replaceChild(comment, dom)
	                    vdom.nodeType = 8
	                    vdom.comment = comment
	                }
	            })
	        }
	    }
	})



/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(36)

	var rforPrefix = /ms-for\:\s*/
	var rforLeft = /^\s*\(\s*/
	var rforRight = /\s*\)\s*$/
	var rforSplit = /\s*,\s*/
	var rforAs = /\s+as\s+([$\w]+)/
	var rident = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
	var rinvalid = /^(null|undefined|NaN|window|this|\$index|\$id)$/
	var reconcile = __webpack_require__(38)
	var Cache = __webpack_require__(27)
	var cache = new Cache(100)

	function enterAction(src, key) {
	    var tmpl = src.template + '<!--' + src.signature + '-->'
	    var t = cache.get(tmpl)
	    if (!t) {
	        var vdomTemplate = avalon.lexer(tmpl)
	        avalon.speedUp(vdomTemplate)
	        t = cache.put(tmpl, vdomTemplate)
	    }
	    return {
	        action: 'enter',
	        children: avalon.mix(true, [], t),
	        key: key
	    }
	}

	function getTraceKey(item) {
	    var type = typeof item
	    return item && type === 'object' ? item.$hashcode : type + ':' + item
	}
	//IE6-8,function后面没有空格
	var rfunction = /^\s*function\s*\(([^\)]+)\)/
	avalon._each = function (obj, fn, local, vnodes) {
	    var repeat = []
	    vnodes.push(repeat)
	    var str = (fn + "").match(rfunction)
	    var args = str[1]
	    var arr = args.match(avalon.rword)
	    if (Array.isArray(obj)) {
	        for (var i = 0; i < obj.length; i++) {
	            iterator(i, obj[i], local, fn, arr[0], arr[1], repeat, true)
	        }
	    } else {
	        for (var i in obj) {
	            if (obj.hasOwnProperty(i)) {
	                iterator(i, obj[i], local, fn, arr[0], arr[1], repeat)
	            }
	        }
	    }
	}

	function iterator(index, item, vars, fn, k1, k2, repeat, isArray) {
	    var key = isArray ? getTraceKey(item) : index
	    var local = {}
	    local[k1] = index
	    local[k2] = item
	    for (var k in vars) {
	        if (!(k in local)) {
	            local[k] = vars[k]
	        }
	    }
	    fn(index, item, key, local, repeat)
	}


	avalon.directive('for', {
	    priority: 3,
	    parse: function (copy, src, binding) {
	        var str = src.nodeValue, aliasAs
	        str = str.replace(rforAs, function (a, b) {
	            if (!rident.test(b) || rinvalid.test(b)) {
	                avalon.error('alias ' + b + ' is invalid --- must be a valid JS identifier which is not a reserved name.')
	            } else {
	                aliasAs = b
	            }
	            return ''
	        })

	        var arr = str.replace(rforPrefix, '').split(' in ')
	        var assign = 'var loop = ' + avalon.parseExpr(arr[1]) + ' \n'
	        var alias = aliasAs ? 'var ' + aliasAs + ' = loop\n' : ''
	        var kv = arr[0].replace(rforLeft, '').replace(rforRight, '').split(rforSplit)

	        if (kv.length === 1) {//确保avalon._each的回调有三个参数
	            kv.unshift('$key')
	        }
	        kv.push('traceKey')
	        kv.push('__local__')
	        kv.push('vnodes')
	        src.$append = assign + alias + 'avalon._each(loop,function('
	                + kv.join(', ') + '){\n'
	                + (aliasAs ? '__local__[' + avalon.quote(aliasAs) + ']=loop\n' : '')

	    },
	    diff: function (copy, src, curRepeat, preRepeat, end) {
	        //将curRepeat转换成一个个可以比较的component,并求得compareText
	        preRepeat = preRepeat || []
	        //preRepeat不为空时
	        src.preRepeat = preRepeat
	        var curItems = prepareCompare(curRepeat, copy)
	        if (src.compareText === copy.compareText) {
	            //如果个数与key一致,那么说明此数组没有发生排序,立即返回
	            return
	        }
	        if (!src.preItems) {
	            src.preItems = prepareCompare(preRepeat, src)
	        }
	        src.compareText = copy.compareText
	        //for指令只做添加删除操作
	        var cache = src.cache
	        var i, c, p
	        
	         function enterAction2(src, key) {//IE6-8下不能使用缓存
	                var template = src.template + '<!--' + src.signature + '-->'
	                var vdomTemplate = avalon.lexer(template)
	                avalon.speedUp(vdomTemplate)
	            return {
	                action: 'enter',
	                children: vdomTemplate,
	                key: key
	            }
	        }
	        if(avalon.msie <= 8){
	            enterAction = enterAction2
	        }

	        if (!cache || isEmptyObject(cache)) {
	            /* eslint-disable no-cond-assign */
	            var cache = src.cache = {}
	            src.preItems.length = 0
	            for (i = 0; c = curItems[i]; i++) {
	                var p = enterAction(src, c.key)
	                src.preItems.push(p)
	                p.action = 'enter'
	                p.index = i
	                saveInCache(cache, p)
	            }
	            src.removes = []
	            /* eslint-enable no-cond-assign */
	        } else {
	            var newCache = {}
	            /* eslint-disable no-cond-assign */
	            var fuzzy = []
	            for (i = 0; c = curItems[i++]; ) {
	                var p = isInCache(cache, c.key)
	                if (p) {
	                    p.action = 'move'
	                    p.oldIndex = p.index
	                    p.index = c.index
	                    saveInCache(newCache, p)
	                } else {
	                    //如果找不到就进行模糊搜索
	                    fuzzy.push(c)
	                }

	            }
	            for (var i = 0, c; c = fuzzy[i++]; ) {
	                p = fuzzyMatchCache(cache, c.key)
	                if (p) {
	                    p.action = 'move'
	                    // clearData(p.children)
	                    p.oldIndex = p.index

	                    p.index = c.index
	                } else {
	                    p = enterAction(src, c.key)
	                    p.index = c.index
	                    src.preItems.push(p)
	                }
	                saveInCache(newCache, p)
	            }
	            src.preItems.sort(function (a, b) {
	                return a.index - b.index
	            })

	            /* eslint-enable no-cond-assign */
	            src.cache = newCache
	            var removes = []

	            for (var i in cache) {
	                p = cache[i]
	                p.action = 'leave'
	                removes.push(p)
	                if (p.arr) {
	                    p.arr.forEach(function (m) {
	                        m.action = 'leave'
	                        removes.push(m)
	                    })
	                    delete p.arr
	                }
	            }
	            src.removes = removes
	        }

	        var cb = avalon.caches[src.cid]
	        var vm = copy.vmodel
	        if (end && cb) {
	            end.afterChange = [function (dom) {
	                    cb.call(vm, {
	                        type: 'rendered',
	                        target: dom,
	                        signature: src.signature
	                    })
	                }]
	        }

	        update(src, this.update)
	        return true

	    },
	    update: function (dom, vdom, parent) {
	        var key = vdom.signature
	        var range = getEndRepeat(dom)
	        var doms = range.slice(1, -1)
	        var endRepeat = range.pop()
	        var DOMs = splitDOMs(doms, key)
	        var check = doms[doms.length - 1]
	        if (check && check.nodeValue !== key) {
	            do {//去掉最初位于循环节点中的内容
	                var prev = endRepeat.previousSibling
	                if (prev === dom || prev.nodeValue === key) {
	                    break
	                }
	                if (prev) {
	                    parent.removeChild(prev)
	                } else {
	                    break
	                }
	            } while (true);
	        }
	        for (var i = 0, el; el = vdom.removes[i++]; ) {
	            var removeNodes = DOMs[el.index]
	            if (removeNodes) {
	                removeNodes.forEach(function (n, k) {
	                    if (n.parentNode) {
	                        avalon.applyEffect(n, el.children[k], {
	                            hook: 'onLeaveDone',
	                            cb: function () {
	                                n.parentNode.removeChild(n)
	                            },
	                            staggerKey: key + 'leave'
	                        })
	                    }
	                })
	                el.children.length = 0
	            }
	        }
	        vdom.removes = []
	        var insertPoint = dom
	        var fragment = avalon.avalonFragment
	        var domTemplate
	        var keep = []
	        for (var i = 0; i < vdom.preItems.length; i++) {
	            var com = vdom.preItems[i]
	            var children = com.children
	            if (com.action === 'leave') {
	                continue
	            }
	            keep.push(com)
	            if (com.action === 'enter') {
	                if (!domTemplate) {
	                    //创建用于拷贝的数据,包括虚拟DOM与真实DOM 
	                    domTemplate = avalon.vdomAdaptor(children, 'toDOM')
	                }
	                var newFragment = domTemplate.cloneNode(true)
	                var cnodes = avalon.slice(newFragment.childNodes)
	                reconcile(cnodes, children, parent)//关联新的虚拟DOM与真实DOM
	                parent.insertBefore(newFragment, insertPoint.nextSibling)
	                applyEffects(cnodes, children, {
	                    hook: 'onEnterDone',
	                    staggerKey: key + 'enter'
	                })
	            } else if (com.action === 'move') {

	                var cnodes = DOMs[com.oldIndex] || []
	                if (com.index !== com.oldIndex) {
	                    var moveFragment = fragment.cloneNode(false)
	                    for (var k = 0, cc; cc = cnodes[k++]; ) {
	                        moveFragment.appendChild(cc)
	                    }
	                    parent.insertBefore(moveFragment, insertPoint.nextSibling)
	                   // reconcile(cnodes, children, parent)
	                    applyEffects(cnodes, children, {
	                        hook: 'onMoveDone',
	                        staggerKey: key + 'move'
	                    })
	                }
	            }

	            insertPoint = cnodes[cnodes.length - 1]

	            if (!insertPoint) {
	                break
	            }
	        }
	        
	        vdom.preRepeat.length = 0
	        vdom.preItems.length = 0
	        keep.forEach(function (el) {
	            vdom.preItems.push(el)
	            
	            range.push.apply(vdom.preRepeat, el.children)
	        })

	    }

	})

	function isEmptyObject(a) {
	    for (var i in a) {
	        return false
	    }
	    return true
	}
	function splitDOMs(nodes, signature) {
	    var items = []
	    var item = []
	    for (var i = 0, el; el = nodes[i++]; ) {
	        if (el.nodeType === 8 && el.nodeValue === signature) {
	            item.push(el)
	            items.push(item)
	            item = []
	        } else {
	            item.push(el)
	        }
	    }
	    return items
	}

	//将要循环的节点根据锚点元素再分成一个个更大的单元,用于diff
	function prepareCompare(nodes, cur) {
	    var splitText = cur.signature
	    var items = []
	    var keys = []
	    var com = {
	        children: []
	    }

	    for (var i = 0, el; el = nodes[i]; i++) {
	        if (el.nodeType === 8 && el.nodeValue === splitText) {
	            com.children.push(el)
	            com.key = el.key
	            keys.push(el.key)
	            com.index = items.length
	            items.push(com)
	            com = {
	                children: []
	            }
	        } else {
	            com.children.push(el)
	        }
	    }

	    cur.compareText = keys.length + '|' + keys.join(';;')
	    return items
	}


	function getEndRepeat(node) {
	    var isBreak = 0, ret = []
	    while (node) {
	        if (node.nodeType === 8) {
	            if (node.nodeValue.indexOf('ms-for:') === 0) {
	                ++isBreak
	            } else if (node.nodeValue.indexOf('ms-for-end:') === 0) {
	                --isBreak
	            }
	        }
	        ret.push(node)
	        node = node.nextSibling
	        if (isBreak === 0) {
	            break
	        }
	    }
	    return ret
	}


	var rfuzzy = /^(string|number|boolean)/
	var rkfuzzy = /^_*(string|number|boolean)/
	function fuzzyMatchCache(cache, id) {
	    var m = id.match(rfuzzy)
	    if (m) {
	        var fid = m[1]
	        for (var i in cache) {
	            var n = i.match(rkfuzzy)
	            if (n && n[1] === fid) {
	                return isInCache(cache, i)
	            }
	        }
	    }
	}

	// 新位置: 旧位置
	function isInCache(cache, id) {
	    var c = cache[id]
	    if (c) {
	        var arr = c.arr
	        if (arr) {
	            var r = arr.pop()
	            if (!arr.length) {
	                c.arr = 0
	            }
	            return r
	        }
	        delete cache[id]
	        return c
	    }
	}
	//[1,1,1] number1 number1_ number1__
	function saveInCache(cache, component) {
	    var trackId = component.key
	    if (!cache[trackId]) {
	        cache[trackId] = component
	    } else {
	        var c = cache[trackId]
	        var arr = c.arr || (c.arr = [])
	        arr.push(component)
	    }
	}
	var applyEffects = function (nodes, vnodes, opts) {
	    vnodes.forEach(function (el, i) {
	        avalon.applyEffect(nodes[i], vnodes[i], opts)
	    })
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(36)
	var reconcile = __webpack_require__(38)
	var createComponent = __webpack_require__(65)

	avalon.component = function (name, definition) {
	    //这是定义组件的分支,并将列队中的同类型对象移除
	    if (!avalon.components[name]) {
	        avalon.components[name] = definition
	    }//这里没有返回值
	}
	avalon.directive('widget', {
	    parse: function (copy, src, binding) {
	        src.wid = src.wid || avalon.makeHashCode('w')
	        //将渲染函数的某一部分存起来,渲在c方法中转换为函数
	        copy[binding.name] = avalon.parseExpr(binding)
	        copy.vmodel = '__vmodel__'
	        copy.local = '__local__'
	    },
	    define: function () {
	        return avalon.mediatorFactory.apply(this, arguments)
	    },
	    diff: function (copy, src, name) {
	        var a = copy[name]
	        var p = src[name]
	        src.vmodel = copy.vmodel
	        src.local = copy.local
	        src.copy = copy
	        if (Object(a) === a) {
	            a = a.$model || a//安全的遍历VBscript
	            if (Array.isArray(a)) {//转换成对象
	                a = avalon.mix.apply({}, a)
	            }
	            var is = a.is || src.props.is
	            if (!src[is + "-vm"]) {
	                if (!createComponent(src, copy, is)) {
	                    //替换成注释节点
	                    update(src, this.mountComment)
	                    return
	                }
	            }
	            var renderComponent = src[is + '-vm'].$render
	            var newTree = renderComponent(src[is + '-vm'], src.local)

	            var componentRoot = newTree[0]
	            if (componentRoot && isComponentReady(componentRoot)) {
	                if (src[is + '-mount']) {//update
	                    updateCopy(copy, componentRoot)
	                    update(src, this.updateComponent)
	                } else {//mount
	                    src.copy = copy
	                    src.newCopy = componentRoot
	                    update(src, this.mountComponent)
	                }
	            } else {
	                update(src, this.mountComment)
	            }

	        }
	    },
	    mountComment: function (dom, vdom, parent) {
	        var copy = vdom.copy
	        copy.nodeType = vdom.nodeType = 8
	        copy.nodeValue = vdom.nodeType = 'unresolved component placeholder'
	        copy.children = []
	        var comment = document.createComment(copy.nodeValue)
	        vdom.dom = comment
	        parent.replaceChild(comment, dom)
	    },
	    updateComponent: function (dom, vdom) {
	        var is = vdom.is
	        var vm = vdom[is + '-vm']
	        var viewChangeObservers = vm.$events.onViewChange
	        if (viewChangeObservers && viewChangeObservers.length) {
	            update(vdom, viewChangeHandle, 'afterChange')
	        }
	    },
	    
	    mountComponent: function (dom, vdom, parent) {
	        var is = vdom.is
	        var vm = vdom[is + '-vm']
	        var copy = vdom.copy
	        var newCopy = vdom.newCopy
	        delete vdom.newCopy
	       
	        var scope = avalon.scopes[vm.$id]  
	        if (scope && scope.vmodel) {  
	            var com = scope.vmodel.$element
	            newCopy = com.vtree[0]
	            updateCopy(vdom, newCopy)
	            parent.replaceChild(com, dom)
	            com.vtree = [vdom]
	            vdom[is + '-vm'] = scope.vmodel
	            vdom[is + '-mount'] = true
	            return
	        }
	        
	        //更新原始虚拟DOM树
	        updateCopy(copy, newCopy )  
	        var vtree = vdom[is + '-vtree']
	        //更新另一个刷数据用的虚拟DOM树
	        updateCopy(vdom, vtree[0] )
	        var com = avalon.vdomAdaptor(vdom, 'toDOM')
	        vm.$fire('onInit', {
	            type: 'init',
	            vmodel: vm,
	            is: is
	        })
	        reconcile([com], [vdom])
	        parent.replaceChild(com, dom)
	        vdom.dom = com
	        avalon.onComponentDispose(com)
	       
	        vdom[is + '-mount'] = true
	        //--------------
	        vm.$element = com
	        com.vtree = [vdom]
	        avalon.scopes[vm.$id] = {
	            vmodel: vm,
	            isMount: 2,
	            local: vdom.local
	        }
	        //--------------
	        update(vdom, function () {
	            vm.$fire('onReady', {
	                type: 'ready',
	                target: com,
	                vmodel: vm,
	                is: is
	            })
	        }, 'afterChange')

	        update(vdom, function () {
	            vdom[is + '-html'] = avalon.vdomAdaptor(vdom, 'toHTML')
	        }, 'afterChange')

	    }
	})

	function updateCopy(copy, newCopy) {
	    copy.children = []
	    avalon.mix(copy, newCopy)
	    copy.local = copy.isVoidTag = copy.skipContent = 0
	}

	function viewChangeHandle(dom, vdom) {
	    var is = vdom.is
	    var vm = vdom[is + '-vm']
	    var preHTML = vdom[is + '-html']
	    var curHTML = avalon.vdomAdaptor(vdom, 'toHTML')
	    if (preHTML !== curHTML) {
	        vdom[is + '-html'] = curHTML
	        vm.$fire('onViewChange', {
	            type: 'viewchange',
	            target: dom,
	            vmodel: vm,
	            is: is
	        })
	    }
	}



	function isComponentReady(vnode) {
	    var isReady = true
	    try {
	        hasUnresolvedComponent(vnode)
	    } catch (e) {
	        isReady = false
	    }
	    return isReady
	}

	function hasUnresolvedComponent(vnode) {
	    vnode.children.forEach(function (el) {
	        if (el.nodeType === 8) {
	            if (el.nodeValue === 'unresolved component placeholder') {
	                throw 'unresolved'
	            }
	        } else if (el.children) {
	            hasUnresolvedComponent(el)
	        }
	    })
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var skipArray = __webpack_require__(66)

	var componentContainers = {wbr: 1, xmp: 1, template: 1}
	var events = 'onInit,onReady,onViewChange,onDispose'
	var componentEvents = avalon.oneObject(events)
	var protected = events.split(',').concat('is', 'define')

	function createComponent(src, copy, is) {
	    var type = src.type
	    //判定用户传入的标签名是否符合规格
	    if (!componentContainers[type] && !isCustomTag(type)) {
	        avalon.warn(type + '不合适做组件的标签')
	        return
	    }
	    //开始初始化组件
	    var hooks = {}
	    //用户只能操作顶层VM
	    //只有$id,is的对象就是emptyOption
	    var rawOption = copy['ms-widget']
	    var isEmpty = false
	    if (!rawOption) {
	        isEmpty = true
	        options = []
	    } else {
	        var options = [].concat(rawOption)
	        options.forEach(function (a) {
	            if (a && typeof a === 'object') {
	                mixinHooks(hooks, (a.$model || a), true)
	            }
	        })
	        isEmpty = isEmptyOption(hooks)
	    }
	    var definition = avalon.components[is]
	    //初始化组件失败,因为连组件的定义都没有加载
	    if (!definition) {
	        return
	    }
	    var skipProps = protected.concat()
	    //得到组件在顶层vm的配置对象名
	    var configName = is.replace(/-/g, '_')

	    var topVm = copy.vmodel
	    try {//如果用户在ms-widget没定义东西那么从vm中取默认东西
	        var vmOption = topVm[configName]
	        if (isEmpty && vmOption && typeof vmOption === 'object') {
	            hooks = {}
	            options = [vmOption]
	            mixinHooks(hooks, vmOption.$model || vmOption, true)
	            skipProps.push(configName)
	        }
	    } catch (e) {
	    }


	    //将用户声明组件用的自定义标签(或xmp.template)的template转换成虚拟DOM
	    if (componentContainers[type] && src.children[0]) {
	        src.children = avalon.lexer(src.children[0].nodeValue)
	    }
	    src.isVoidTag = src.skipContent = 0

	    //开始构建组件的vm的配置对象

	    var define = hooks.define
	    define = define || avalon.directives.widget.define
	    if (!hooks.$id) {
	        avalon.warn('warning!', is, '组件最好在ms-widget配置对象中指定全局不重复的$id以提高性能!\n',
	                '若在ms-for循环中可以利用 ($index,el) in @array 中的$index拼写你的$id\n',
	                '如 ms-widget="{is:\'ms-button\',$id:\'btn\'+$index}"'
	                )
	    }
	    var $id = hooks.$id || src.wid

	    var defaults = avalon.mix(true, {}, definition.defaults)
	    mixinHooks(hooks, defaults, false)

	    var vmodel = define.apply(function (a, b) {
	        skipProps.forEach(function (k) {
	            delete a[k]
	            delete b[k]
	        })
	    }, [topVm, defaults].concat(options))

	    if (!avalon.modern) {//增强对IE的兼容
	        for (var i in vmodel) {
	            if (!skipArray[i] && typeof vmodel[i] === 'function') {
	                vmodel[i] = vmodel[i].bind(vmodel)
	            }
	        }
	    }

	    vmodel.$id = $id

	    //开始构建组件的虚拟DOM
	    var finalTemplate = definition.template.trim()
	    if (typeof definition.getTemplate === 'function') {
	        finalTemplate = definition.getTemplate(vmodel, finalTemplate)
	    }

	    var vtree = avalon.lexer(finalTemplate)
	    if (vtree.length > 1) {
	        avalon.error('组件必须用一个元素包起来')
	    }

	    var componentRoot = vtree[0]

	    avalon.vmodels[$id] = vmodel

	    //将用户标签中的属性合并到组件标签的属性里
	    avalon.mix(componentRoot.props, src.props)
	    delete componentRoot.props['ms-widget']
	    componentRoot.props.wid = $id
	    //抽取用户标签里带slot属性的元素,替换组件的虚拟DOM树中的slot元素

	    if (definition.soleSlot) {
	        var slots = {}
	        var slotName = definition.soleSlot
	        slots[slotName] = /\S/.test(src.template) ?
	                src.children : newText(slotName)
	        mergeTempale(vtree, slots)
	    } else if (!src.isVoidTag) {
	        insertSlots(vtree, src, definition.soleSlot)
	    }
	    avalon.speedUp(vtree)
	    for (var e in componentEvents) {
	        if (hooks[e]) {
	            hooks[e].forEach(function (fn) {
	                vmodel.$watch(e, fn)
	            })
	        }
	    }
	    var render = avalon.render(vtree, src.local)
	    vmodel.$render = render
	    src[is + '-vm'] = vmodel
	    src[is + '-vtree'] = vtree
	    return src.is = is

	}
	module.exports = createComponent

	function newText(name) {
	    return {
	        nodeType: 3,
	        nodeValue: '{{##' + name + '}}',
	        type: "#text",
	        dynamic: true
	    }
	}
	function isEmptyOption(opt) {
	    for (var k in opt) {
	        if (k === 'is' || k === '$id')
	            continue
	        return false
	    }
	    return true
	}

	function insertSlots(vtree, node, soleSlot) {
	    var slots = {}
	    if (soleSlot) {
	        slots[soleSlot] = node.children
	    } else {
	        node.children.forEach(function (el) {
	            if (el.nodeType === 1) {
	                var name = el.props.slot || 'default'
	                if (slots[name]) {
	                    slots[name].push(el)
	                } else {
	                    slots[name] = [el]
	                }
	            }
	        })
	    }
	    mergeTempale(vtree, slots)
	}

	function mergeTempale(vtree, slots) {
	    for (var i = 0, node; node = vtree[i++]; ) {
	        if (node.nodeType === 1) {
	            if (node.type === 'slot') {
	                var name = node.props.name || 'default'
	                if (slots[name]) {
	                    var s = slots[name].length ? slots[name] : newText(name)
	                    vtree.splice.apply(vtree, [i - 1, 1].concat(s))
	                }
	            } else {
	                mergeTempale(node.children, slots)
	            }
	        }
	    }

	    return vtree
	}

	//必须以字母开头,结尾以字母或数字结束,中间至少出现一次"-",
	//并且不能大写字母,特殊符号,"_","$",汉字
	var rcustomTag = /^[a-z]([a-z\d]+\-)+[a-z\d]+$/

	function isCustomTag(type) {
	    return rcustomTag.test(type)
	}

	function mixinHooks(target, option, overwrite) {
	    for (var k in option) {
	        var v = option[k]
	        //如果是生命周期钩子,总是不断收集
	        if (componentEvents[k]) {
	            if (k in target) {
	                target[k].push(v)
	            } else {
	                target[k] = [option[k]]
	            }
	        } else {
	            if (overwrite) {
	                target[k] = v
	            }
	        }
	    }
	}

/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * 
	$$skipArray:是系统级通用的不可监听属性
	$skipArray: 是当前对象特有的不可监听属性

	 不同点是
	 $$skipArray被hasOwnProperty后返回false
	 $skipArray被hasOwnProperty后返回true
	 */

	module.exports = avalon.oneObject('$id,$render,$track,$element,$watch,$fire,$events,$model,$skipArray,$accessors,$hashcode,$run,$wait,__proxy__,__data__,__const__')

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var support = __webpack_require__(68)
	var Cache = __webpack_require__(27)
	var update = __webpack_require__(36)

	avalon.directive('effect', {
	    priority: 5,
	    diff: function (copy, src, name) {
	        var copyObj = copy[name]
	        copyObj = copy.$model || copyObj
	        if(typeof copyObj === 'string'){
	            var is = copyObj
	            copyObj = {
	                is: is
	            }
	           
	        }else if (Array.isArray(copyObj)) {
	            copyObj = avalon.mix.apply({}, copyObj)
	        }
	    
	        copyObj.action = copyObj.action || 'enter'
	       
	        if (Object(copyObj) === copyObj) {
	            var srcObj = src[name]
	            if ( Object(srcObj) !== srcObj || diffObj(copyObj, srcObj ))  {
	                src[name] = copyObj
	                update(src, this.update, 'afterChange')
	            }
	        }
	        delete copy[name]
	    },
	    update: function (dom, vnode, parent, option) {
	        if(dom.animating ){
	            return
	        }
	        dom.animating = true
	        var localeOption = vnode['ms-effect']
	        var type = localeOption.is
	        option = option || {}
	        if(!type){//如果没有指定类型
	            return avalon.warn('need is option')
	        }
	      
	        var effects = avalon.effects
	        if(support.css && !effects[type]){
	            avalon.effect(type, {})
	        }
	        var globalOption = effects[type]
	        if(!globalOption){//如果没有定义特效
	            return avalon.warn(type+' effect is undefined')
	        }
	        var action = option.action || localeOption.action
	        var Effect = avalon.Effect
	        if (typeof Effect.prototype[action] !== 'function'){
	            return avalon.warn(action+' action is undefined')
	        }   
	        var effect = new Effect(dom)
	        var finalOption = avalon.mix(option, globalOption, localeOption)
	        if (finalOption.queue) {
	            animationQueue.push(function () {
	                effect[action](finalOption)
	            })
	            callNextAnimation()
	        } else {
	            setTimeout(function(){
	               effect[action](finalOption)
	            },4)
	        }
	    }
	})
	function diffObj(a, b){
	    for(var i in a){
	        if(a[i] !== b[i])
	            return true
	    }
	    return false
	}

	var animationQueue = []
	function callNextAnimation() {
	    if (animationQueue.lock)
	        return
	    var fn = animationQueue[0]
	    if (fn) {
	       callNextAnimation.lock = true
	       fn()
	    }
	}

	avalon.effects = {}
	//这里定义CSS动画


	avalon.effect = function (name, definition) {
	    avalon.effects[name] = definition || {}
	    if (support.css) {
	        if (!definition.enterClass) {
	            definition.enterClass = name + '-enter'
	        }
	        if (!definition.enterActiveClass) {
	            definition.enterActiveClass = definition.enterClass + '-active'
	        }
	        if (!definition.leaveClass) {
	            definition.leaveClass = name + '-leave'
	        }
	        if (!definition.leaveActiveClass) {
	            definition.leaveActiveClass = definition.leaveClass + '-active'
	        }
	    }
	    if (!definition.action) {
	        definition.action = 'enter'
	    }
	}


	var Effect = function (el) {
	    this.el = el
	}
	avalon.Effect = Effect
	Effect.prototype = {
	    enter: createAction('Enter'),
	    leave: createAction('Leave'),
	    move: createAction('Move')
	}

	var rsecond = /\d+s$/
	function toMillisecond(str){
	   var ratio = rsecond.test(str) ? 1000 : 1
	   return parseFloat(str) * ratio
	}

	function execHooks(options, name, el) {
	    var list = options[name]
	    list = Array.isArray(list) ? list : typeof list === 'function' ? [list] : []
	    list.forEach(function (fn) {
	       fn && fn(el)
	    })
	}
	 var staggerCache = new Cache(128)

	function createAction(action) {
	    var lower = action.toLowerCase()
	    return function (option) {
	        var elem = this.el
	        var $el = avalon(elem)
	        var enterAnimateDone
	        var staggerTime = isFinite(option.stagger) ? option.stagger * 1000 : 0
	        if(staggerTime){
	            if(option.staggerKey){
	                var stagger = staggerCache.get(option.staggerKey) || 
	                        staggerCache.put(option.staggerKey, {
	                    count:0,
	                    items:0
	                })
	                stagger.count++
	                stagger.items++
	            }
	        }
	        var staggerIndex = stagger && stagger.count || 0
	        var animationDone = function(e) {
	            var isOk = e !== false
	            elem.animating = void 0
	            enterAnimateDone = true
	            var dirWord = isOk ? 'Done' : 'Abort'
	            execHooks(option, 'on' + action + dirWord, elem)
	            avalon.unbind(elem,support.transitionEndEvent)
	            avalon.unbind(elem,support.animationEndEvent)
	            if(stagger){
	                if(--stagger.items === 0){
	                    stagger.count = 0
	                }
	            }
	            if(option.queue){
	                animationQueue.lock = false
	                animationQueue.shift()
	                callNextAnimation()
	            }
	        }
	        execHooks(option, 'onBefore' + action, elem)

	        if (option[lower]) {
	            option[lower](elem, function (ok) {
	                animationDone(ok !== false)
	            })
	        } else if (support.css) {
	            
	            $el.addClass(option[lower + 'Class'])
	            if(lower === 'leave'){
	                $el.removeClass(option.enterClass+' '+option.enterActiveClass)
	            }else if(lower === 'enter'){
	                $el.removeClass(option.leaveClass+' '+option.leaveActiveClass)
	            }

	            $el.bind(support.transitionEndEvent, animationDone)
	            $el.bind(support.animationEndEvent, animationDone)
	            setTimeout(function () {
	                enterAnimateDone = avalon.root.offsetWidth === NaN
	                $el.addClass(option[lower + 'ActiveClass'])
	                var computedStyles = window.getComputedStyle(elem)
	                var tranDuration = computedStyles[support.transitionDuration]
	                var animDuration = computedStyles[support.animationDuration]
	                var time = toMillisecond(tranDuration) || toMillisecond(animDuration)
	                if (!time === 0) {
	                    animationDone(false)
	                }else if(!staggerTime ){
	                    setTimeout(function(){
	                        if(!enterAnimateDone){
	                            animationDone(false)
	                        }
	                    },time + 130 )
	                }
	            }, 17+ staggerTime * staggerIndex)// = 1000/60
	        }
	    }
	}

	avalon.applyEffect = function(node, vnode, opts){
	    var cb = opts.cb
	    var hook = opts.hook
	    var curEffect = vnode['ms-effect']
	    if(curEffect && !avalon.document.hidden ){
	        var old = curEffect[hook]
	        if(cb){
	            if(Array.isArray(old)){
	                old.push(cb)
	            }else if(old){
	                curEffect[hook] = [old, cb]
	            }else{
	                curEffect[hook] = [cb]
	            }
	        }
	        getAction(opts)
	        node.animate = true
	        avalon.directives.effect.update(node,vnode, 0, avalon.shadowCopy({},opts) ) 

	    }else if(cb){
	        cb()
	    }
	}

	function getAction(opts){
	    if(!opts.acton){
	        opts.action = opts.hook.replace(/^on/,'').replace(/Done$/,'').toLowerCase()
	    }
	}



/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * ------------------------------------------------------------
	 * 检测浏览器对CSS动画的支持与API名
	 * ------------------------------------------------------------
	 */
	var supportTransition = false
	var supportAnimation = false
	var supportCSS = false
	var transitionEndEvent
	var animationEndEvent
	var transitionDuration = avalon.cssName('transition-duration')
	var animationDuration = avalon.cssName('animation-duration')

	var checker = {
	    TransitionEvent: 'transitionend',
	    WebKitTransitionEvent: 'webkitTransitionEnd',
	    OTransitionEvent: 'oTransitionEnd',
	    otransitionEvent: 'otransitionEnd'
	}
	var window = avalon.window
	var tran
	//有的浏览器同时支持私有实现与标准写法，比如webkit支持前两种，Opera支持1、3、4
	for (var name in checker) {
	    if (window[name]) {
	        tran = checker[name]
	        break
	    }
	    try {
	        var a = document.createEvent(name)
	        tran = checker[name]
	        break
	    } catch (e) {
	    }
	}
	if (typeof tran === 'string') {
	    supportTransition = true
	    supportCSS = true
	    transitionEndEvent = tran
	}

	//animationend有两个可用形态
	//IE10+, Firefox 16+ & Opera 12.1+: animationend
	//Chrome/Safari: webkitAnimationEnd
	//http://blogs.msdn.com/b/davrous/archive/2011/12/06/introduction-to-css3-animat ions.aspx
	//IE10也可以使用MSAnimationEnd监听，但是回调里的事件 type依然为animationend
	//  el.addEventListener('MSAnimationEnd', function(e) {
	//     alert(e.type)// animationend！！！
	// })
	checker = {
	    'AnimationEvent': 'animationend',
	    'WebKitAnimationEvent': 'webkitAnimationEnd'
	}
	var ani
	for (name in checker) {
	    if (window[name]) {
	        ani = checker[name]
	        break
	    }
	}
	if (typeof ani === 'string') {
	    supportAnimation = true
	    supportCSS = true
	    animationEndEvent = ani
	}

	module.exports = {
	    transition: supportTransition,
	    animation: supportAnimation,
	    css: supportCSS,
	    transitionEndEvent: transitionEndEvent,
	    animationEndEvent: animationEndEvent,
	    transitionDuration: transitionDuration,
	    animationDuration: animationDuration
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	
	avalon.lexer = __webpack_require__(70)
	avalon.diff = __webpack_require__(71)
	avalon.batch = __webpack_require__(72)
	// dispatch与patch 为内置模块
	var parseView = __webpack_require__(45)

	function render(vtree, local) {
	    var _body = Array.isArray(vtree) ? parseView(vtree) : vtree
	    var _local = []
	    if (local) {
	        for (var i in local) {
	            _local.push('var ' + i + ' = __local__['+avalon.quote(i)+']')
	        }
	    }
	    var body = '__local__ = __local__ || {};\n' +
	            _local.join(';\n')+'\n' + _body
	    var fn = Function('__vmodel__', '__local__', body)

	    return fn
	}
	avalon.render = render

	module.exports = avalon


/***/ },
/* 70 */
/***/ function(module, exports) {

	/**
	 * ------------------------------------------------------------
	 * avalon2.1.1的新式lexer
	 * 将字符串变成一个虚拟DOM树,方便以后进一步变成模板函数
	 * 此阶段只会生成VElement,VText,VComment
	 * ------------------------------------------------------------
	 */
	var ropenTag = /^<([-A-Za-z0-9_]+)\s*([^>]*?)(\/?)>/
	var rendTag = /^<\/([^>]+)>/
	var rmsForStart = /^\s*ms\-for\:/
	var rmsForEnd = /^\s*ms\-for\-end/
	//判定里面有没有内容
	var rcontent = /\S/
	var voidTag = avalon.oneObject('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed')
	var plainTag = avalon.oneObject('script,style,textarea,xmp,noscript,option,template')
	var stringPool = {}


	function lexer(str) {
	    stringPool = {}
	    str = clearString(str)
	    var stack = []
	    stack.last = function () {
	        return  stack[stack.length - 1]
	    }
	    var ret = []

	    var breakIndex = 100000
	    do {
	        var node = false
	        if (str.charAt(0) !== '<') {
	            var i = str.indexOf('<')
	            i = i === -1 ? str.length : i
	            var nodeValue = nomalString(str.slice(0, i))
	            str = str.slice(i)//处理文本节点
	            node = {type: "#text", nodeType: 3, nodeValue: nodeValue}
	            if (rcontent.test(nodeValue)) {
	                collectNodes(node, stack, ret)//不收集空白节点
	            }
	        }
	        if (!node) {
	            var i = str.indexOf('<!--')
	            if (i === 0) {
	                var l = str.indexOf('-->')
	                if (l === -1) {
	                    avalon.error("注释节点没有闭合" + str)
	                }
	                var nodeValue = str.slice(4, l)
	                str = str.slice(l + 3)
	                node = {type: "#comment", nodeType: 8, nodeValue: nodeValue}
	                collectNodes(node, stack, ret)
	                if(nodeValue.indexOf('ms-js:') === 0){
	                    node.nodeValue = nomalString(node.nodeValu)
	                } else if (rmsForEnd.test(nodeValue)) {
	                    var p = stack.last()
	                    var nodes = p.children
	                    markeRepeatRange(nodes, nodes.pop())
	                }
	            }

	        }
	        if (!node) {
	            var match = str.match(ropenTag)
	            if (match) {
	                var type = match[1].toLowerCase()
	                var isVoidTag = voidTag[type] || match[3] === '\/'
	                node = {type: type, nodeType: 1, props: {}, children: [], isVoidTag: isVoidTag}
	                var attrs = match[2]
	                if (attrs) {
	                    collectProps(attrs, node.props)
	                }
	                collectNodes(node, stack, ret)
	                str = str.slice(match[0].length)
	                if (isVoidTag) {
	                    node.fire = node.isVoidTag = true
	                } else {
	                    stack.push(node)
	                    if (plainTag[type]) {
	                        var index = str.indexOf("</" + type + '>')
	                        var innerHTML = str.slice(0, index).trim()
	                        str = str.slice(index)
	                        if (innerHTML) {
	                            switch (type) {
	                                case 'style':
	                                case 'script':
	                                case 'noscript':
	                                case 'template':
	                                case 'xmp':
	                                    node.skipContent = true
	                                    if (innerHTML) {
	                                        node.children.push({
	                                            nodeType: 3,
	                                            type: '#text',
	                                            nodeValue: nomalString(innerHTML)
	                                        })
	                                    }
	                                    break
	                                case 'textarea':
	                                    node.skipContent = true
	                                    node.props.type = 'textarea'
	                                    node.props.value = nomalString(innerHTML)
	                                    break
	                                case 'option':
	                                    node.children.push({
	                                        nodeType: 3,
	                                        type: '#text',
	                                        nodeValue: nomalString(trimHTML(innerHTML))
	                                    })
	                                    break
	                            }
	                        }
	                    }
	                }
	            }
	        }
	        if (!node) {
	            var match = str.match(rendTag)
	            if (match) {
	                var type = match[1].toLowerCase()
	                var last = stack.last()
	                if (!last) {
	                    avalon.error(match[0] + '前面缺少<' + type + '>')
	                } else if (last.type !== type) {
	                    avalon.error(last.type + '没有闭合')
	                }
	                node = stack.pop()
	                node.fire = true
	                str = str.slice(match[0].length)
	            }
	        }
	        if (!node || --breakIndex === 0) {
	            break
	        }
	        if (node.fire) {
	            fireEnd(node, stack, ret)
	            delete node.fire
	        }

	    } while (str.length);

	    return ret

	}

	module.exports = lexer

	function fireEnd(node, stack) {
	    var type = node.type
	    var props = node.props
	    switch (type) {
	        case 'input':
	            if (!props.type) {
	                props.type = 'text'
	            }
	            break
	        case 'select':
	            props.type = type + '-' + props.hasOwnProperty('multiple') ? 'multiple' : 'one'
	            break
	        case 'table':
	            addTbody(node.children)
	            break
	        default:
	            if (type.indexOf('ms-') === 0) {
	                props.is = type
	                if (!props['ms-widget']) {
	                    props['ms-widget'] = '{is:' + avalon.quote(type) + '}'
	                }
	            }
	            break
	    }
	    var forExpr = props['ms-for']
	    if (forExpr) {
	        delete props['ms-for']
	        var p = stack.last()
	        var arr = p.children
	        arr.splice(arr.length - 2, 0, {
	            nodeType: 8,
	            type: '#comment',
	            nodeValue: 'ms-for:' + forExpr
	        })
	        var cb = props['data-for-rendered']
	        var cid = cb + ':cb'

	        if (cb && !avalon.caches[cid]) {
	            avalon.caches[cid] = Function('return ' + avalon.parseExpr(cb, 'on'))()
	        }

	        markeRepeatRange(arr, {
	            nodeType: 8,
	            type: '#comment',
	            nodeValue: 'ms-for-end:'
	        })
	    }
	}

	function markeRepeatRange(nodes, end) {
	    end.dynamic = true
	    end.signature = avalon.makeHashCode('for')
	    var array = [], start, deep = 1
	    while (start = nodes.pop()) {
	        if (start.nodeType === 8) {
	            if (rmsForEnd.test(start.nodeValue)) {
	                ++deep
	            } else if (rmsForStart.test(start.nodeValue)) {
	                --deep
	                if (deep === 0) {
	                    start.nodeValue = nomalString(start.nodeValue)
	                    start.signature = end.signature
	                    start.dynamic = 'for'
	                    start.template = array.map(function (a) {
	                        return avalon.vdomAdaptor(a, 'toHTML')
	                    }).join('')
	                    nodes.push(start, array, end)
	                    break
	                }
	            }
	        }
	        array.unshift(start)
	    }

	}


	function collectNodes(node, stack, ret) {
	    var p = stack.last()
	    if (p) {
	        p.children.push(node)
	    } else {
	        ret.push(node)
	    }
	}

	function collectProps(attrs, props) {
	    attrs.replace(rnowhite, function (prop) {
	        var arr = prop.split('=')
	        var name = arr[0]
	        var value = arr[1] || ''
	        if (value) {
	            if (value.indexOf('??') === 0) {
	                value = nomalString(value).
	                        replace(rlineSp, '').
	                        slice(1, -1)
	            }
	        }
	        if (!(name in props)) {
	            props[name] = value
	        }
	    })

	}
	function nomalString(str) {
	    return avalon.unescapeHTML(str.replace(rfill, fill))
	}

	function clearString(str) {
	    var array = readString(str)
	    for (var i = 0, n = array.length; i < n; i++) {
	        str = str.replace(array[i], dig)
	    }
	    return str
	}
	function readString(str) {
	    var end, s = 0
	    var ret = []
	    for (var i = 0, n = str.length; i < n; i++) {
	        var c = str.charAt(i)
	        if (!end) {
	            if (c === "'") {
	                end = "'"
	                s = i
	            } else if (c === '"') {
	                end = '"'
	                s = i
	            }
	        } else {
	            if (c === '\\') {
	                i += 1
	                continue
	            }
	            if (c === end) {
	                ret.push(str.slice(s, i + 1))
	                end = false
	            }
	        }
	    }
	    return ret
	}

	var rfill = /\?\?\d+/g
	var rlineSp = /\n\s*/g
	var rnowhite = /\S+/g
	var number = 1
	function dig(a) {
	    var key = '??' + number++
	    stringPool[key] = a
	    return key
	}
	function fill(a) {
	    var val = stringPool[a]
	    return val
	}
	//专门用于处理option标签里面的标签
	var rtrimHTML = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi
	function trimHTML(v) {
	    return String(v).replace(rtrimHTML, '').trim()
	}

	//如果直接将tr元素写table下面,那么浏览器将将它们(相邻的那几个),放到一个动态创建的tbody底下
	function addTbody(nodes) {
	    var tbody, needAddTbody = false, count = 0, start = 0, n = nodes.length
	    for (var i = 0; i < n; i++) {
	        var node = nodes[i]
	        if (!tbody) {
	            if (node.type === 'tr') {
	                tbody = {
	                    nodeType: 1,
	                    type: 'tbody',
	                    children: [],
	                    props: {}
	                }
	                tbody.children.push(node)
	                needAddTbody = true
	                if (start === 0)
	                    start = i
	                nodes[i] = tbody
	            }
	        } else {
	            if (node.type !== 'tr' && node.nodeType === 1) {
	                tbody = false
	            } else {
	                tbody.children.push(node)
	                count++
	                nodes[i] = 0
	            }
	        }
	    }

	    if (needAddTbody) {
	        for (i = start; i < n; i++) {
	            if (nodes[i] === 0) {
	                nodes.splice(i, 1)
	                i--
	                count--
	                if (count === 0) {
	                    break
	                }
	            }
	        }
	    }
	}

	avalon.speedUp = function (arr) {
	    for (var i = 0; i < arr.length; i++) {
	        hasDirective(arr[i])
	    }
	}

	function hasDirective(a) {
	    switch (a.nodeType) {
	        case 3:
	            if (avalon.config.rbind.test(a.nodeValue)) {
	                a.dynamic = 'expr'
	                return true
	            } else {
	                a.skipContent = true
	                return false
	            }
	        case 8:
	            if (a.dynamic) {
	                return true
	            } else {
	                a.skipContent = true
	                return false
	            }
	        case 1:
	            if (a.props['ms-skip']) {
	                a.skipAttrs = true
	                a.skipContent = true
	                return false
	            }
	            if (/^ms\-/.test(a.type) || hasDirectiveAttrs(a.props)) {
	                a.dynamic = true
	            } else {
	                a.skipAttrs = true
	            }
	            if (a.isVoidTag && !a.dynamic) {
	                a.skipContent = true
	                return false
	            }
	            var hasDirective = childrenHasDirective(a.children)
	            if (!hasDirective && !a.dynamic) {
	                a.skipContent = true
	                return false
	            }
	            return true
	        default:
	            if (Array.isArray(a)) {
	                return childrenHasDirective(a)
	            }
	    }
	}

	function childrenHasDirective(arr) {
	    var ret = false
	    for (var i = 0, el; el = arr[i++]; ) {
	        if (hasDirective(el)) {
	            ret = true
	        }
	    }
	    return ret 
	}

	function hasDirectiveAttrs(props) {
	    if ('ms-skip' in props)
	        return false
	    for (var i in props) {
	        if (i.indexOf('ms-') === 0) {
	            return true
	        }
	    }
	    return false
	}

/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * ------------------------------------------------------------
	 * diff 对比新旧两个虚拟DOM树,根据directive中的diff方法为新虚拟DOM树
	 * 添加change, afterChange更新钩子
	 * ------------------------------------------------------------
	 */
	var emptyArr = []
	// 防止被引用
	var emptyObj = function () {
	    return {
	        children: [], props: {}
	    }
	}
	var directives = avalon.directives
	var rbinding = /^ms-(\w+)-?(.*)/

	function diff(copys, sources) {
	    for (var i = 0; i < copys.length; i++) {
	        var copy = copys[i]
	        var src = sources[i] || emptyObj()
	    
	        switch (copy.nodeType) {
	            case 3:
	                if (copy.dynamic) {
	                    directives.expr.diff(copy, src)
	                }
	                break
	            case 8:
	                if (copy.dynamic === 'for') {
	                    directives['for'].diff(copy, src,
	                    copys[i+1],sources[i+1],sources[i+2]) 
	                }
	                if(src.afterChange){
	                    execHooks(src, src.afterChange)
	                }
	                break
	            case 1:
	                if (copy.order) {
	                    diffProps(copy, src)
	                }
	                if (!copy.skipContent && !copy.isVoidTag ) {
	                    diff(copy.children, src.children || emptyArr, copy)
	                }
	                if(src.afterChange){
	                    execHooks(src, src.afterChange)
	                }
	                break
	            default: 
	                if(Array.isArray(copy)){
	                   diff(copy, src)
	                }
	                break
	        }
	    }
	}

	function execHooks(el, hooks) {
	    if (hooks.length) {
	        for (var hook, i = 0; hook = hooks[i++];) {
	           hook(el.dom, el)
	        }
	    }
	    delete el.afterChange
	}

	function diffProps(copys, sources) {
	    var order = copys.order
	    if (order) {
	        var directiveType
	        try {
	           order.replace(avalon.rword, function (name) {
	                var match = name.match(rbinding)
	                var type = match && match[1]
	                directiveType = type
	                if (directives[type]) {
	                    directives[type].diff(copys, sources || emptyObj(), name)
	                }
	                if(copys.order !== order){
	                    throw "break"
	                }
	               
	            })
	            
	        } catch (e) {
	            if(e !== 'break'){
	                avalon.log(directiveType, e, e.stack || e.message, 'diffProps error')
	            }else{
	                diffProps(copys, sources)
	            }
	        }
	    }


	}
	avalon.diffProps = diffProps
	module.exports = diff


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * ------------------------------------------------------------
	 * batch 同时对N个视图进行全量更新
	 * ------------------------------------------------------------
	 */

	var reconcile = __webpack_require__(38)

	//如果正在更新一个子树,那么将它放到
	var needRenderIds = []
	var renderingID = false
	avalon.suspendUpdate = 0


	function batchUpdate(id) {
	    if (renderingID) {
	        return avalon.Array.ensure(needRenderIds, id)
	    } else {
	        renderingID = id
	    }

	    var scope = avalon.scopes[id]
	    if (!scope || !document.nodeName || avalon.suspendUpdate) {
	        return renderingID = null
	    }
	    var vm = scope.vmodel
	    var dom = vm.$element
	    var source = dom.vtree || []
	    var renderFn = vm.$render
	    var copy = renderFn(scope.vmodel, scope.local)
	    if (scope.isTemp) {
	        //在最开始时,替换作用域的所有节点,确保虚拟DOM与真实DOM是对齐的
	        reconcile([dom], source, dom.parentNode)
	        delete avalon.scopes[id]
	    }
	    avalon.diff(copy, source)


	    var index = needRenderIds.indexOf(renderingID)
	    renderingID = 0
	    if (index > -1) {
	        var removed = needRenderIds.splice(index, 1)
	        return batchUpdate(removed[0])
	    }

	    var more = needRenderIds.shift()
	    if (more) {
	        batchUpdate(more)
	    }
	}



	module.exports = avalon.batch = batchUpdate


/***/ },
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	
	var $$midway = {}
	var $$skipArray = __webpack_require__(66)
	var dispatch = __webpack_require__(77)
	var $emit = dispatch.$emit
	var $watch = dispatch.$watch
	/*
	 * initEvents
	 * isSkip
	 * modelAdaptor
	 * makeAccessor
	 */

	function initEvents($vmodel, heirloom) {
	    heirloom.__vmodel__ = $vmodel
	    var hide = $$midway.hideProperty

	    hide($vmodel, '$events', heirloom)
	    hide($vmodel, '$watch', function () {
	        if (arguments.length === 2) {
	            return $watch.apply($vmodel, arguments)
	        } else {
	            throw '$watch方法参数不对'
	        }
	    })
	    hide($vmodel, '$fire', function (expr, a, b) {
	        var list = $vmodel.$events[expr]
	        $emit(list, $vmodel, expr, a, b)
	    })
	}

	var rskip = /function|window|date|regexp|element/i

	function isSkip(key, value, skipArray) {
	    // 判定此属性能否转换访问器
	    return key.charAt(0) === '$' ||
	            skipArray[key] ||
	            (rskip.test(avalon.type(value))) ||
	            (value && value.nodeName && value.nodeType > 0)
	}

	function modelAdaptor(definition, old, heirloom, options) {
	    //如果数组转换为监控数组
	    if (Array.isArray(definition)) {
	        return $$midway.arrayFactory(definition, old, heirloom, options)
	    } else if (Object(definition) === definition && typeof definition !== 'function') {
	        //如果此属性原来就是一个VM,拆分里面的访问器属性
	        if (old && old.$id) {
	            ++avalon.suspendUpdate
	            //1.5带来的优化方案
	            if (old.$track !== Object.keys(definition).sort().join(';;')) {
	                var vm = $$midway.slaveFactory(old, definition, heirloom, options)
	            } else {
	                vm = old
	            }
	            for (var i in definition) {
	                if ($$skipArray[i])
	                    continue
	                vm[i] = definition[i]
	            }
	            --avalon.suspendUpdate
	            return vm
	        } else {
	            vm = $$midway.masterFactory(definition, heirloom, options)
	            return vm
	        }
	    } else {
	        return definition
	    }
	}
	$$midway.modelAdaptor = modelAdaptor


	function makeAccessor(sid, spath, heirloom) {
	    var old = NaN
	    function get() {
	        return old
	    }
	    get.heirloom = heirloom
	    return {
	        get: get,
	        set: function (val) {
	            if (old === val) {
	                return
	            }
	            var vm = heirloom.__vmodel__
	            if (val && typeof val === 'object') {
	                val = $$midway.modelAdaptor(val, old, heirloom, {
	                    pathname: spath,
	                    id: sid
	                })
	            }
	            var older = old
	            old = val
	            if (this.$hashcode && vm ) {
	                vm.$events.$$dirty$$ = true
	                if(vm.$events.$$wait$$)
	                    return
	                //★★确保切换到新的events中(这个events可能是来自oldProxy)               
	                if (heirloom !== vm.$events) {
	                    get.heirloom = vm.$events
	                }
	                //如果这个属性是组件配置对象中的属性,那么它需要触发组件的回调
	                emitWidget(get.$decompose, spath, val, older)
	                //触发普通属性的回调
	                if (spath.indexOf('*') === -1) {
	                    $emit(get.heirloom[spath], vm, spath, val, older)
	                }
	                //如果这个属性是数组元素上的属性
	                emitArray(sid, vm, spath, val, older)
	                //如果这个属性存在通配符
	                emitWildcard(get.heirloom, vm, spath, val, older)
	                vm.$events.$$dirty$$ = false
	                batchUpdateView(vm.$id)
	            }
	        },
	        enumerable: true,
	        configurable: true
	    }
	}

	function batchUpdateView(id) {
	    avalon.rerenderStart = new Date
	    var dotIndex = id.indexOf('.')
	    if (dotIndex > 0) {
	        avalon.batch(id.slice(0, dotIndex))
	    } else {
	        avalon.batch(id)
	    }
	}

	var rtopsub = /([^.]+)\.(.+)/
	function emitArray(sid, vm, spath, val, older) {
	    if (sid.indexOf('.*.') > 0) {
	        var arr = sid.match(rtopsub)
	        var top = avalon.vmodels[ arr[1] ]
	        if (top) {
	            var path = arr[2]
	            $emit(top.$events[ path ], vm, spath, val, older)
	        }
	    }
	}

	function emitWidget(whole, spath, val, older) {
	    if (whole && whole[spath]) {
	        var wvm = whole[spath]
	        if (!wvm.$hashcode) {
	            delete whole[spath]
	        } else {
	            var wpath = spath.replace(/^[^.]+\./, '')
	            if (wpath !== spath) {
	                $emit(wvm.$events[wpath], wvm, wpath, val, older)
	            }
	        }
	    }
	}

	function emitWildcard(obj, vm, spath, val, older) {
	    if (obj.__fuzzy__) {
	        obj.__fuzzy__.replace(avalon.rword, function (expr) {
	            var list = obj[expr]
	            var reg = list.reg
	            if (reg && reg.test(spath)) {
	                $emit(list, vm, spath, val, older)
	            }
	            return expr
	        })
	    }
	}


	function define(definition) {
	    var $id = definition.$id
	    if (!$id && avalon.config.debug) {
	        avalon.warn('vm.$id must be specified')
	    }
	    if (avalon.vmodels[$id]) {
	        throw Error('error:[' + $id + '] had defined!')
	    }
	    var vm = $$midway.masterFactory(definition, {}, {
	        pathname: '',
	        id: $id,
	        master: true
	    })

	    return avalon.vmodels[$id] = vm

	}

	function arrayFactory(array, old, heirloom, options) {
	    if (old && old.splice) {
	        var args = [0, old.length].concat(array)
	        ++avalon.suspendUpdate
	        old.splice.apply(old, args)
	        --avalon.suspendUpdate
	        return old
	    } else {
	        for (var i in __array__) {
	            array[i] = __array__[i]
	        }

	        array.notify = function (a, b, c, d) {
	            var vm = heirloom.__vmodel__
	            if (vm) {
	                var path = a === null || a === void 0 ?
	                        options.pathname :
	                        options.pathname + '.' + a
	                vm.$fire(path, b, c)
	                if (!d && !heirloom.$$wait$$ && !avalon.suspendUpdate ) {
	                    batchUpdateView(vm.$id)
	                }
	            }
	        }

	        var hashcode = avalon.makeHashCode('$')
	        options.array = true
	        options.hashcode = hashcode
	        options.id = options.id || hashcode
	        $$midway.initViewModel(array, heirloom, {}, {}, options)

	        for (var j = 0, n = array.length; j < n; j++) {
	            array[j] = modelAdaptor(array[j], 0, {}, {
	                id: array.$id + '.*',
	                master: true
	            })
	        }
	        return array
	    }
	}
	$$midway.arrayFactory = arrayFactory

	var __array__ = {
	    set: function (index, val) {
	        if (((index >>> 0) === index) && this[index] !== val) {
	            if (index > this.length) {
	                throw Error(index + 'set方法的第一个参数不能大于原数组长度')
	            }
	            this.splice(index, 1, val)
	        }
	    },
	    contains: function (el) { //判定是否包含
	        return this.indexOf(el) !== -1
	    },
	    ensure: function (el) {
	        if (!this.contains(el)) { //只有不存在才push
	            this.push(el)
	        }
	        return this
	    },
	    pushArray: function (arr) {
	        return this.push.apply(this, arr)
	    },
	    remove: function (el) { //移除第一个等于给定值的元素
	        return this.removeAt(this.indexOf(el))
	    },
	    removeAt: function (index) { //移除指定索引上的元素
	        if ((index >>> 0) === index) {
	            return this.splice(index, 1)
	        }
	        return []
	    },
	    clear: function () {
	        this.removeAll()
	        return this
	    }
	}
	avalon.define = define

	module.exports = {
	    $$midway: $$midway,
	    $$skipArray: $$skipArray,
	    isSkip: isSkip,
	    __array__: __array__,
	    initEvents: initEvents,
	    makeAccessor: makeAccessor,
	    modelAdaptor: modelAdaptor
	}

/***/ },
/* 77 */
/***/ function(module, exports) {

	
	/**
	 * ------------------------------------------------------------
	 * 属性监听系统 
	 * ------------------------------------------------------------
	 */

	function adjustVm(vm, expr) {
	    var toppath = expr.split(".")[0], other
	    try {
	        if (vm.hasOwnProperty(toppath)) {
	            if (vm.$accessors) {
	                other = vm.$accessors[toppath].get.heirloom.__vmodel__
	            } else {
	                other = Object.getOwnPropertyDescriptor(vm, toppath).get.heirloom.__vmodel__
	            }

	        }
	    } catch (e) {
	    }
	    return other || vm
	}

	function toRegExp(expr) {
	    var arr = expr.split('.')
	    return new RegExp("^" + arr.map(function (el) {
	        return el === '*' ? '(?:[^.]+)' : el
	    }).join('\\.') + '$', 'i')
	}
	function addFuzzy(add, obj, expr) {
	    if (add) {
	        if (obj.__fuzzy__) {
	            if (obj.__fuzzy__.indexOf(',' + expr) === -1) {
	                obj.__fuzzy__ += ',' + expr
	            }
	        } else {
	            obj.__fuzzy__ = expr
	        }
	    }
	}

	function $watch(expr, callback) {
	    var fuzzy = expr.indexOf('.*') > 0 || expr === '*'
	    var vm = fuzzy ? this : $watch.adjust(this, expr)
	    var hive = vm.$events
	    var list = hive[expr] || (hive[expr] = [])
	    if (fuzzy) {
	        list.reg = list.reg || toRegExp(expr)
	    }
	    addFuzzy(fuzzy, hive, expr)
	    if (vm !== this) {
	        addFuzzy(fuzzy, this.$events, expr)
	        this.$events[expr] = list
	    }

	    avalon.Array.ensure(list, callback)

	    return function () {
	        avalon.Array.remove(list, callback)
	    }
	}

	$watch.adjust = adjustVm
	/**
	 * $fire 方法的内部实现
	 * 
	 * @param {Array} list 订阅者数组
	 * @param {Component} vm
	 * @param {String} path 监听属性名或路径
	 * @param {Any} a 当前值 
	 * @param {Any} b 过去值
	 * @param {Number} i 如果抛错,让下一个继续执行
	 * @returns {undefined}
	 */
	function $emit(list, vm, path, a, b, i) {
	    if (list && list.length) {
	        try {
	            for (i = i || list.length - 1; i >= 0; i--) {
	                var callback = list[i]
	                callback.call(vm, a, b, path)
	            }
	        } catch (e) {
	            if (i - 1 > 0)
	                $emit(list, vm, path, a, b, i - 1)
	            avalon.log(e, path)
	        }

	    }
	}


	module.exports = {
	    $emit: $emit,
	    $watch: $watch,
	    adjustVm: adjustVm
	}


/***/ },
/* 78 */,
/* 79 */,
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	
	var avalon = __webpack_require__(3)
	var browser = __webpack_require__(4)

	avalon.shadowCopy(avalon, browser)

	__webpack_require__(81)
	__webpack_require__(6)
	__webpack_require__(7)

	module.exports = avalon

/***/ },
/* 81 */
/***/ function(module, exports) {

	//这里放置存在异议的方法

	var serialize = avalon.inspect
	var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
	var rarraylike = /(Array|List|Collection|Map|Arguments)\]$/

	avalon.quote = JSON.stringify

	// avalon.type
	var class2type = {}
	'Boolean Number String Function Array Date RegExp Object Error'.replace(avalon.rword, function (name) {
	    class2type['[object ' + name + ']'] = name.toLowerCase()
	})

	avalon.type = function (obj) { //取得目标的类型
	    if (obj == null) {
	        return String(obj)
	    }
	    // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
	    return typeof obj === 'object' || typeof obj === 'function' ?
	            class2type[serialize.call(obj)] || 'object' :
	            typeof obj
	}


	avalon.isFunction = function (fn) {
	    return typeof fn === 'function'
	}

	avalon.isWindow = function (obj) {
	    return rwindow.test(serialize.call(obj))
	}


	/*判定是否是一个朴素的javascript对象（Object），不是DOM对象，不是BOM对象，不是自定义类的实例*/
	avalon.isPlainObject = function (obj) {
	    // 简单的 typeof obj === 'object'检测，会致使用isPlainObject(window)在opera下通不过
	    return serialize.call(obj) === '[object Object]' &&
	            Object.getPrototypeOf(obj) === Object.prototype
	}

	//与jQuery.extend方法，可用于浅拷贝，深拷贝
	avalon.mix = avalon.fn.mix = function () {
	    var options, name, src, copy, copyIsArray, clone,
	            target = arguments[0] || {},
	            i = 1,
	            length = arguments.length,
	            deep = false

	    // 如果第一个参数为布尔,判定是否深拷贝
	    if (typeof target === 'boolean') {
	        deep = target
	        target = arguments[1] || {}
	        i++
	    }

	    //确保接受方为一个复杂的数据类型
	    if (typeof target !== 'object' && typeof target !== 'function') {
	        target = {}
	    }

	    //如果只有一个参数，那么新成员添加于mix所在的对象上
	    if (i === length) {
	        target = this
	        i--
	    }

	    for (; i < length; i++) {
	        //只处理非空参数
	        if ((options = arguments[i]) != null) {
	            for (name in options) {
	                src = target[name]
	                try {
	                    copy = options[name] //当options为VBS对象时报错
	                } catch (e) {
	                    continue
	                }

	                // 防止环引用
	                if (target === copy) {
	                    continue
	                }
	                if (deep && copy && (avalon.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

	                    if (copyIsArray) {
	                        copyIsArray = false
	                        clone = src && Array.isArray(src) ? src : []

	                    } else {
	                        clone = src && avalon.isPlainObject(src) ? src : {}
	                    }

	                    target[name] = avalon.mix(deep, clone, copy)
	                } else if (copy !== void 0) {
	                    target[name] = copy
	                }
	            }
	        }
	    }
	    return target
	}

	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	function isArrayLike(obj) {
	    if (obj && typeof obj === 'object') {
	        var n = obj.length,
	                str = serialize.call(obj)
	        if (rarraylike.test(str)) {
	            return true
	        } else if (str === '[object Object]' && n === (n >>> 0)) {
	            return true //由于ecma262v5能修改对象属性的enumerable，因此不能用propertyIsEnumerable来判定了
	        }
	    }
	    return false
	}


	avalon.each = function (obj, fn) {
	    if (obj) { //排除null, undefined
	        var i = 0
	        if (isArrayLike(obj)) {
	            for (var n = obj.length; i < n; i++) {
	                if (fn(i, obj[i]) === false)
	                    break
	            }
	        } else {
	            for (i in obj) {
	                if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
	                    break
	                }
	            }
	        }
	    }
	}

	module.exports = {
	    avalon: avalon,
	    isArrayLike: isArrayLike
	}




/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 虚拟DOM的3大构造器
	 */
	var VText = __webpack_require__(15)
	var VComment = __webpack_require__(16)
	var VElement = __webpack_require__(83)

	avalon.vdomAdaptor = function (obj, method) {
	    if (!obj) {//obj在ms-for循环里面可能是null
	        return (method === "toHTML" ? '' :
	            avalon.avalonFragment.cloneNode(false))
	    }
	    switch (obj.nodeType) {
	        case 3:
	            return VText.prototype[method].call(obj)
	        case 8:
	            return VComment.prototype[method].call(obj)
	        case 1:
	            return VElement.prototype[method].call(obj)
	        default:
	            if (Array.isArray(obj)) {
	                if (method === "toHTML") {
	                    return obj.map(function (a) {
	                        return avalon.vdomAdaptor(a, 'toHTML')
	                    }).join('')
	                } else {
	                    var f = avalon.avalonFragment.cloneNode(false)
	                    obj.forEach(function (a) {
	                        f.appendChild(avalon.vdomAdaptor(a, 'toDOM'))
	                    })
	                    return f
	                }
	            }
	    }
	}

	module.exports = {
	    VText: VText,
	    VComment: VComment,
	    VElement: VElement
	}


/***/ },
/* 83 */
/***/ function(module, exports) {

	
	function VElement(type, props, children) {
	    if (typeof type === 'object') {
	        for (var i in type) {
	            this[i] = type[i]
	        }
	    } else {
	        this.nodeType = 1
	        this.type = type
	        this.props = props
	        this.children = children
	    }
	}
	function skipFalseAndFunction(a) {
	    return a !== false && (Object(a) !== a)
	}


	function createSVG(type) {
	    return document.createElementNS('http://www.w3.org/2000/svg', type)
	}
	var svgTags = avalon.oneObject('circle,defs,ellipse,image,line,' +
	        'path,polygon,polyline,rect,symbol,text,use,g,svg')


	var rvml = /^\w+\:\w+/
	var supportTemplate = 'content' in document.createElement('template')
	VElement.prototype = {
	    constructor: VElement,
	    toDOM: function () {
	        var dom, tagName = this.type
	        if (avalon.modern && svgTags[tagName]) {
	            dom = createSVG(tagName)
	        } else {
	            dom = document.createElement(tagName)
	        }
	        var wid = this.props['ms-important'] ||
	                this.props['ms-controller'] || this.wid
	        if (wid) {
	            var scope = avalon.scopes[wid]
	            var element = scope && scope.vmodel && scope.vmodel.$element
	            if (element) {
	                var oldVdom = element.vtree[0]
	                if (oldVdom.children) {
	                    this.children = oldVdom.children
	                }
	                return element
	            }
	        }
	        for (var i in this.props) {
	            var val = this.props[i]
	            if (skipFalseAndFunction(val)) {
	                dom.setAttribute(i, val + '')
	            }
	        }
	        var c = this.children || []
	        var template = c[0] ? c[0].nodeValue : ''
	        switch (this.type) {
	            case 'xmp':
	            case 'script':
	            case 'style':
	            case 'noscript':
	                dom.innerHTML = template
	                break
	            case 'template':
	                if (supportTemplate) {
	                    dom.innerHTML = template
	                } else {
	                    dom.textContent = template
	                }
	                break
	            default:
	                if (!this.isVoidTag) {
	                    this.children.forEach(function (c) {
	                        c && dom.appendChild(avalon.vdomAdaptor(c, 'toDOM'))
	                    })
	                }
	                break
	        }
	        return dom
	    },
	    toHTML: function () {
	        var arr = []
	        for (var i in this.props) {
	            var val = this.props[i]
	            if (skipFalseAndFunction(val)) {
	                arr.push(i + '=' + avalon.quote(this.props[i] + ''))
	            }
	        }
	        arr = arr.length ? ' ' + arr.join(' ') : ''
	        var str = '<' + this.type + arr
	        if (this.isVoidTag) {
	            return str + '/>'
	        }
	        str += '>'
	        if (this.children.length) {
	            str += this.children.map(function (c) {
	                return c ? avalon.vdomAdaptor(c, 'toHTML') : ''
	            }).join('')
	        }
	        return str + '</' + this.type + '>'
	    }
	}

	module.exports = VElement

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	
	/*********************************************************************
	 *                          DOM Api                                 *
	 *           shim,class,data,css,val,html,event,ready               *
	 **********************************************************************/

	__webpack_require__(85)
	__webpack_require__(86)
	__webpack_require__(87)
	__webpack_require__(88)
	__webpack_require__(89)
	__webpack_require__(26)
	__webpack_require__(90)
	__webpack_require__(91)

	module.exports = avalon


/***/ },
/* 85 */
/***/ function(module, exports) {

	//safari5+是把contains方法放在Element.prototype上而不是Node.prototype
	if (!avalon.document.contains) {
	    Node.prototype.contains = function (arg) {
	        return !!(this.compareDocumentPosition(arg) & 16)
	    }
	}
	avalon.contains = function (root, el) {
	    try {
	        while ((el = el.parentNode))
	            if (el === root)
	                return true
	        return false
	    } catch (e) {
	        return false
	    }
	}





/***/ },
/* 86 */
/***/ function(module, exports) {

	var rnowhite = /\S+/g

	'add,remove'.replace(avalon.rword, function (method) {
	    avalon.fn[method + 'Class'] = function (cls) {
	        var el = this[0] || {}
	        //https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/26
	        if (cls && typeof cls === 'string' && el.nodeType === 1) {
	            cls.replace(rnowhite, function (c) {
	                el.classList[method](c)
	            })
	        }
	        return this
	    }
	})

	avalon.fn.mix({
	    hasClass: function (cls) {
	        var el = this[0] || {}
	        //IE10+, chrome8+, firefox3.6+, safari5.1+,opera11.5+支持classList,
	        //chrome24+,firefox26+支持classList2.0
	        return el.nodeType === 1 && el.classList.contains(cls)
	    },
	    toggleClass: function (value, stateVal) {
	        var isBool = typeof stateVal === 'boolean'
	        var me = this
	        String(value).replace(rnowhite, function (c) {
	            var state = isBool ? stateVal : !me.hasClass(c)
	            me[state ? 'addClass' : 'removeClass'](c)
	        })
	        return this
	    }
	})



/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var propMap = __webpack_require__(22)
	var rsvg = /^\[object SVG\w*Element\]$/

	function attrUpdate(node, vnode) {
	    var attrs = vnode.changeAttr
	    if (attrs) {
	        for (var attrName in attrs) {
	            var val = attrs[attrName]
	            // switch
	            if (attrName === 'src' && window.chrome && node.tagName === 'EMBED') {
	                node[attrName] = val
	                var parent = node.parentNode //#525  chrome1-37下embed标签动态设置src不能发生请求
	                var comment = document.createComment('ms-src')
	                parent.replaceChild(comment, node)
	                parent.replaceChild(node, comment)
	            } else if (attrName.indexOf('data-') == 0) {
	                node.setAttribute(attrName, val)
	            } else {
	                var propName = propMap[attrName] || attrName
	                if (typeof node[propName] === 'boolean') {
	                    //布尔属性必须使用el.xxx = true|false方式设值
	                    //如果为false, IE全系列下相当于setAttribute(xxx,''),
	                    //会影响到样式,需要进一步处理
	                    node[propName] = !!val
	                }
	                if (val === false) {
	                    node.removeAttribute(attrName)
	                    continue
	                }

	                //SVG只能使用setAttribute(xxx, yyy), VML只能使用node.xxx = yyy ,
	                //HTML的固有属性必须node.xxx = yyy
	                var isInnate = rsvg.test(node) ? false : attrName in node.cloneNode(false)
	                if (isInnate) {
	                    node[propName] = val + ''
	                } else {
	                    node.setAttribute(attrName, val)
	                }
	            }
	        }
	    }
	    vnode.changeAttr = null
	}

	avalon.parseJSON = JSON.parse

	avalon.fn.attr = function (name, value) {
	    if (arguments.length === 2) {
	        this[0].setAttribute(name, value)
	        return this
	    } else {
	        return this[0].getAttribute(name)
	    }
	}


	module.exports = attrUpdate

/***/ },
/* 88 */
/***/ function(module, exports) {

	var root = avalon.root
	var camelize = avalon.camelize
	var cssHooks = avalon.cssHooks

	var prefixes = ['', '-webkit-', '-o-', '-moz-', '-ms-']
	var cssMap = {
	    'float': 'cssFloat'
	}

	avalon.cssNumber = avalon.oneObject('animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom')

	avalon.cssName = function (name, host, camelCase) {
	    if (cssMap[name]) {
	        return cssMap[name]
	    }
	    host = host || root.style
	    for (var i = 0, n = prefixes.length; i < n; i++) {
	        camelCase = camelize(prefixes[i] + name)
	        if (camelCase in host) {
	            return (cssMap[name] = camelCase)
	        }
	    }
	    return null
	}


	avalon.fn.css = function (name, value) {
	    if (avalon.isPlainObject(name)) {
	        for (var i in name) {
	            avalon.css(this, i, name[i])
	        }
	    } else {
	        var ret = avalon.css(this, name, value)
	    }
	    return ret !== void 0 ? ret : this
	}

	avalon.fn.position = function () {
	    var offsetParent, offset,
	            elem = this[0],
	            parentOffset = {
	                top: 0,
	                left: 0
	            }
	    if (!elem) {
	        return parentOffset
	    }
	    if (this.css("position") === "fixed") {
	        offset = elem.getBoundingClientRect()
	    } else {
	        offsetParent = this.offsetParent() //得到真正的offsetParent
	        offset = this.offset() // 得到正确的offsetParent
	        if (offsetParent[0].tagName !== "HTML") {
	            parentOffset = offsetParent.offset()
	        }
	        parentOffset.top += avalon.css(offsetParent[0], "borderTopWidth", true)
	        parentOffset.left += avalon.css(offsetParent[0], "borderLeftWidth", true)

	        // Subtract offsetParent scroll positions
	        parentOffset.top -= offsetParent.scrollTop()
	        parentOffset.left -= offsetParent.scrollLeft()
	    }
	    return {
	        top: offset.top - parentOffset.top - avalon.css(elem, "marginTop", true),
	        left: offset.left - parentOffset.left - avalon.css(elem, "marginLeft", true)
	    }
	}
	avalon.fn.offsetParent = function () {
	    var offsetParent = this[0].offsetParent
	    while (offsetParent && avalon.css(offsetParent, "position") === "static") {
	        offsetParent = offsetParent.offsetParent
	    }
	    return avalon(offsetParent || root)
	}


	cssHooks["@:set"] = function (node, name, value) {
	    node.style[name] = value
	}

	cssHooks["@:get"] = function (node, name) {
	    if (!node || !node.style) {
	        throw new Error("getComputedStyle要求传入一个节点 " + node)
	    }
	    var ret, computed = getComputedStyle(node)
	    if (computed) {
	        ret = name === "filter" ? computed.getPropertyValue(name) : computed[name]
	        if (ret === "") {
	            ret = node.style[name] //其他浏览器需要我们手动取内联样式
	        }
	    }
	    return ret
	}
	cssHooks["opacity:get"] = function (node) {
	    var ret = cssHooks["@:get"](node, "opacity")
	    return ret === "" ? "1" : ret
	}

	"top,left".replace(avalon.rword, function (name) {
	    cssHooks[name + ":get"] = function (node) {
	        var computed = cssHooks["@:get"](node, name)
	        return /px$/.test(computed) ? computed :
	                avalon(node).position()[name] + "px"
	    }
	})

	var cssShow = {
	    position: "absolute",
	    visibility: "hidden",
	    display: "block"
	}
	var rdisplayswap = /^(none|table(?!-c[ea]).+)/

	function showHidden(node, array) {
	    //http://www.cnblogs.com/rubylouvre/archive/2012/10/27/2742529.html
	    if (node.offsetWidth <= 0) { //opera.offsetWidth可能小于0
	        var styles = getComputedStyle(node, null)
	        if (rdisplayswap.test(styles["display"])) {
	            var obj = {
	                node: node
	            }
	            for (var name in cssShow) {
	                obj[name] = styles[name]
	                node.style[name] = cssShow[name]
	            }
	            array.push(obj)
	        }
	        var parent = node.parentNode
	        if (parent && parent.nodeType === 1) {
	            showHidden(parent, array)
	        }
	    }
	}

	avalon.each({
	    Width: "width",
	    Height: "height"
	}, function (name, method) {
	    var clientProp = "client" + name,
	            scrollProp = "scroll" + name,
	            offsetProp = "offset" + name
	    cssHooks[method + ":get"] = function (node, which, override) {
	        var boxSizing = -4
	        if (typeof override === "number") {
	            boxSizing = override
	        }
	        which = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"]
	        var ret = node[offsetProp] // border-box 0
	        if (boxSizing === 2) { // margin-box 2
	            return ret + avalon.css(node, "margin" + which[0], true) + avalon.css(node, "margin" + which[1], true)
	        }
	        if (boxSizing < 0) { // padding-box  -2
	            ret = ret - avalon.css(node, "border" + which[0] + "Width", true) - avalon.css(node, "border" + which[1] + "Width", true)
	        }
	        if (boxSizing === -4) { // content-box -4
	            ret = ret - avalon.css(node, "padding" + which[0], true) - avalon.css(node, "padding" + which[1], true)
	        }
	        return ret
	    }
	    cssHooks[method + "&get"] = function (node) {
	        var hidden = []
	        showHidden(node, hidden)
	        var val = cssHooks[method + ":get"](node)
	        for (var i = 0, obj; obj = hidden[i++]; ) {
	            node = obj.node
	            for (var n in obj) {
	                if (typeof obj[n] === "string") {
	                    node.style[n] = obj[n]
	                }
	            }
	        }
	        return val
	    }
	    avalon.fn[method] = function (value) { //会忽视其display
	        var node = this[0]
	        if (arguments.length === 0) {
	            if (node.setTimeout) { //取得窗口尺寸,IE9后可以用node.innerWidth /innerHeight代替
	                return node["inner" + name]
	            }
	            if (node.nodeType === 9) { //取得页面尺寸
	                var doc = node.documentElement
	                //FF chrome    html.scrollHeight< body.scrollHeight
	                //IE 标准模式 : html.scrollHeight> body.scrollHeight
	                //IE 怪异模式 : html.scrollHeight 最大等于可视窗口多一点？
	                return Math.max(node.body[scrollProp], doc[scrollProp], node.body[offsetProp], doc[offsetProp], doc[clientProp])
	            }
	            return cssHooks[method + "&get"](node)
	        } else {
	            return this.css(method, value)
	        }
	    }
	    avalon.fn["inner" + name] = function () {
	        return cssHooks[method + ":get"](this[0], void 0, -2)
	    }
	    avalon.fn["outer" + name] = function (includeMargin) {
	        return cssHooks[method + ":get"](this[0], void 0, includeMargin === true ? 2 : 0)
	    }
	})

	avalon.fn.offset = function () { //取得距离页面左右角的坐标
	    var node = this[0]
	    try {
	        var rect = node.getBoundingClientRect()
	        // Make sure element is not hidden (display: none) or disconnected
	        // https://github.com/jquery/jquery/pull/2043/files#r23981494
	        if (rect.width || rect.height || node.getClientRects().length) {
	            var doc = node.ownerDocument
	            var root = doc.documentElement
	            var win = doc.defaultView
	            return {
	                top: rect.top + win.pageYOffset - root.clientTop,
	                left: rect.left + win.pageXOffset - root.clientLeft
	            }
	        }
	    } catch (e) {
	        return {
	            left: 0,
	            top: 0
	        }
	    }
	}

	avalon.each({
	    scrollLeft: "pageXOffset",
	    scrollTop: "pageYOffset"
	}, function (method, prop) {
	    avalon.fn[method] = function (val) {
	        var node = this[0] || {},
	                win = getWindow(node),
	                top = method === "scrollTop"
	        if (!arguments.length) {
	            return win ? win[prop] : node[method]
	        } else {
	            if (win) {
	                win.scrollTo(!top ? val : win[prop], top ? val : win[prop])
	            } else {
	                node[method] = val
	            }
	        }
	    }
	})

	function getWindow(node) {
	    return node.window || node.defaultView || false
	}

/***/ },
/* 89 */
/***/ function(module, exports) {

	function getValType(elem) {
	    var ret = elem.tagName.toLowerCase()
	    return ret === 'input' && /checkbox|radio/.test(elem.type) ? 'checked' : ret
	}
	var valHooks = {
	    'select:get': function self(node, ret, index, singleton) {
	        var nodes = node.children, value,
	                getter = valHooks['option:get']
	        index = ret ? index : node.selectedIndex
	        singleton = ret ? singleton : node.type === 'select-one' || index < 0
	        ret = ret || []
	        for (var i = 0, el; el = nodes[i++]; ) {
	            if (!el.disabled) {
	                switch (el.nodeName.toLowerCase()) {
	                    case 'option':
	                        if ((el.selected || el.index === index)) {
	                            value = el.value
	                            if (singleton) {
	                                return value
	                            } else {
	                                ret.push(value)
	                            }
	                        }
	                        break
	                    case 'optgroup':
	                        value = self(el, ret, index, singleton)
	                        if (typeof value === 'string') {
	                            return value
	                        }
	                        break
	                }
	            }
	        }
	        return singleton ? null : ret
	    },
	    'select:set': function (node, values, optionSet) {
	        values = [].concat(values) //强制转换为数组
	        for (var i = 0, el; el = node.options[i++]; ) {
	            if ((el.selected = values.indexOf(el.value) > -1)) {
	                optionSet = true
	            }
	        }
	        if (!optionSet) {
	            node.selectedIndex = -1
	        }
	    }
	}

	avalon.fn.val = function (value) {
	    var node = this[0]
	    if (node && node.nodeType === 1) {
	        var get = arguments.length === 0
	        var access = get ? ':get' : ':set'
	        var fn = valHooks[getValType(node) + access]
	        if (fn) {
	            var val = fn(node, value)
	        } else if (get) {
	            return (node.value || '').replace(/\r/g, '')
	        } else {
	            node.value = value
	        }
	    }
	    return get ? val : this
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var document = avalon.document
	var window = avalon.window
	var root = avalon.root

	var getShortID = __webpack_require__(6).getShortID
	var canBubbleUp = __webpack_require__(30)

	var eventHooks = avalon.eventHooks
	/*绑定事件*/
	avalon.bind = function (elem, type, fn) {
	    if (elem.nodeType === 1) {
	        var value = elem.getAttribute('avalon-events') || ''
	        //如果是使用ms-on-*绑定的回调,其uuid格式为e12122324,
	        //如果是使用bind方法绑定的回调,其uuid格式为_12
	        var uuid = getShortID(fn)
	        var hook = eventHooks[type]
	        if (hook) {
	            type = hook.type || type
	            if (hook.fix) {
	                fn = hook.fix(elem, fn)
	                fn.uuid = uuid
	            }
	        }
	        var key = type + ':' + uuid
	        avalon.eventListeners[fn.uuid] = fn
	        if (value.indexOf(type + ':') === -1) {//同一种事件只绑定一次
	            if (canBubbleUp[type] || focusBlur[type]) {
	                delegateEvent(type)
	            } else {
	                nativeBind(elem, type, dispatch)
	            }
	        }
	        var keys = value.split(',')
	        if (keys[0] === '') {
	            keys.shift()
	        }
	        if (keys.indexOf(key) === -1) {
	            keys.push(key)
	            elem.setAttribute('avalon-events', keys.join(','))
	            //将令牌放进avalon-events属性中
	        }

	    } else {
	        nativeBind(elem, type, fn)
	    }
	    return fn //兼容之前的版本
	}

	avalon.unbind = function (elem, type, fn) {
	    if (elem.nodeType === 1) {
	        var value = elem.getAttribute('avalon-events') || ''
	        switch (arguments.length) {
	            case 1:
	                nativeUnBind(elem, type, dispatch)
	                elem.removeAttribute('avalon-events')
	                break
	            case 2:
	                value = value.split(',').filter(function (str) {
	                    return str.indexOf(type + ':') === -1
	                }).join(',')

	                elem.setAttribute('avalon-events', value)
	                break
	            default:
	                var search = type + ':' + fn.uuid
	                value = value.split(',').filter(function (str) {
	                    return str !== search
	                }).join(',')
	                elem.setAttribute('avalon-events', value)
	                delete avalon.eventListeners[fn.uuid]
	                break
	        }
	    } else {
	        nativeUnBind(elem, type, fn)
	    }
	}

	var typeRegExp = {}
	function collectHandlers(elem, type, handlers) {
	    var value = elem.getAttribute('avalon-events')
	    if (value && (elem.disabled !== true || type !== 'click')) {
	        var uuids = []
	        var reg = typeRegExp[type] || (typeRegExp[type] = new RegExp('\\b' + type + '\\:([^,\\s]+)', 'g'))
	        value.replace(reg, function (a, b) {
	            uuids.push(b)
	            return a
	        })
	        if (uuids.length) {
	            handlers.push({
	                elem: elem,
	                uuids: uuids
	            })
	        }
	    }
	    elem = elem.parentNode
	    var g = avalon.gestureEvents || {}
	    if (elem && elem.getAttribute && (canBubbleUp[type] || g[type])) {
	        collectHandlers(elem, type, handlers)
	    }

	}

	var rhandleHasVm = /^e/
	function dispatch(event) {
	    event = new avEvent(event)
	    var type = event.type
	    var elem = event.target
	    var handlers = []
	    collectHandlers(elem, type, handlers)
	    var i = 0, j, uuid, handler
	    while ((handler = handlers[i++]) && !event.cancelBubble) {
	        var host = event.currentTarget = handler.elem
	        j = 0
	        while ((uuid = handler.uuids[ j++ ]) &&
	                !event.isImmediatePropagationStopped) {
	            var fn = avalon.eventListeners[uuid]
	            if (fn) {
	                var vm = rhandleHasVm.test(uuid) ? handler.elem._ms_context_ : 0
	                if (vm && vm.$hashcode === false) {
	                    return avalon.unbind(elem, type, fn)
	                }

	                var ret = fn.call(vm || elem, event, host._ms_local)

	                if (ret === false) {
	                    event.preventDefault()
	                    event.stopPropagation()
	                }
	            }
	        }
	    }
	}
	var focusBlur = {
	    focus: true,
	    blur: true
	}

	var nativeBind = function (el, type, fn, capture) {
	    el.addEventListener(type, fn, capture)
	}
	var nativeUnBind = function (el, type, fn) {
	    el.removeEventListener(type, fn)
	}

	function delegateEvent(type) {
	    var value = root.getAttribute('delegate-events') || ''
	    if (value.indexOf(type) === -1) {
	        var arr = value.match(avalon.rword) || []
	        arr.push(type)
	        root.setAttribute('delegate-events', arr.join(','))
	        nativeBind(root, type, dispatch, !!focusBlur[type])
	    }
	}

	var rvendor = /^(?:ms|webkit|moz)/
	function avEvent(event) {
	    if (event.originalEvent) {
	        return this
	    }
	    for (var i in event) {
	        if (!rvendor.test(i) && typeof event[i] !== 'function') {
	            this[i] = event[i]
	        }
	    }
	    this.timeStamp = new Date() - 0
	    this.originalEvent = event
	}
	avEvent.prototype = {
	    preventDefault: function () {
	        var e = this.originalEvent
	        this.returnValue = false
	        if (e) {
	            e.returnValue = false
	            e.preventDefault()
	        }
	    },
	    stopPropagation: function () {
	        var e = this.originalEvent
	        this.cancelBubble = true
	        if (e) {
	            e.cancelBubble = true
	            e.stopPropagation()
	        }
	    },
	    stopImmediatePropagation: function () {
	        var e = this.originalEvent
	        this.isImmediatePropagationStopped = true
	        if (e.stopImmediatePropagation) {
	            e.stopImmediatePropagation()
	        }
	        this.stopPropagation()
	    }
	}

	avalon.fireDom = function (elem, type, opts) {
	    var hackEvent = document.createEvent('Events')
	    hackEvent.initEvent(type, true, true)
	    avalon.shadowCopy(hackEvent, opts)
	    elem.dispatchEvent(hackEvent)
	}

	var eventHooks = avalon.eventHooks
	//针对firefox, chrome修正mouseenter, mouseleave(chrome30+)
	if (!('onmouseenter' in root)) {
	    avalon.each({
	        mouseenter: 'mouseover',
	        mouseleave: 'mouseout'
	    }, function (origType, fixType) {
	        eventHooks[origType] = {
	            type: fixType,
	            fn: function (elem, fn) {
	                return function (e) {
	                    var t = e.relatedTarget
	                    if (!t || (t !== elem && !(elem.compareDocumentPosition(t) & 16))) {
	                        delete e.type
	                        e.type = origType
	                        return fn.call(this, e)
	                    }
	                }
	            }
	        }
	    })
	}
	//针对IE9+, w3c修正animationend
	avalon.each({
	    AnimationEvent: 'animationend',
	    WebKitAnimationEvent: 'webkitAnimationEnd'
	}, function (construct, fixType) {
	    if (window[construct] && !eventHooks.animationend) {
	        eventHooks.animationend = {
	            type: fixType
	        }
	    }
	})

	if (document.onmousewheel === void 0) {
	    /* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
	     firefox DOMMouseScroll detail 下3 上-3
	     firefox wheel detlaY 下3 上-3
	     IE9-11 wheel deltaY 下40 上-40
	     chrome wheel deltaY 下100 上-100 */
	    eventHooks.mousewheel = {
	        type: 'wheel',
	        fn: function (elem, fn) {
	            return function (e) {
	                e.wheelDeltaY = e.wheelDelta = e.deltaY > 0 ? -120 : 120
	                e.wheelDeltaX = 0
	                Object.defineProperty(e, 'type', {
	                    value: 'mousewheel'
	                })
	                fn.call(this, e)
	            }
	        }
	    }
	}

	avalon.fn.bind = function (type, fn, phase) {
	    if (this[0]) { //此方法不会链
	        return avalon.bind(this[0], type, fn, phase)
	    }
	}

	avalon.fn.unbind = function (type, fn, phase) {
	    if (this[0]) {
	        avalon.unbind(this[0], type, fn, phase)
	    }
	    return this
	}
	avalon.$$unbind = function (node) {
	    var nodes = node.querySelectorAll('[avalon-events]')
	    avalon.each(nodes, function (i, el) {
	        avalon.unbind(el)
	    })
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var scan = __webpack_require__(32)
	var document = avalon.document
	var window = avalon.window

	var readyList = [], isReady
	var fireReady = function (fn) {
	    isReady = true

	    while (fn = readyList.shift()) {
	        fn(avalon)
	    }
	}

	if (document.readyState === 'complete') {
	    setTimeout(fireReady) //如果在domReady之外加载
	} else {
	    document.addEventListener('DOMContentLoaded', fireReady)
	}

	avalon.bind(window, 'load', fireReady)

	avalon.ready = function (fn) {
	    if (!isReady) {
	        readyList.push(fn)
	    } else {
	        fn(avalon)
	    }
	}

	avalon.ready(function(){
	    scan(document.body)
	})


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35)
	__webpack_require__(37)
	//处理属性样式
	__webpack_require__(93)
	__webpack_require__(40)
	__webpack_require__(41)
	//处理内容
	__webpack_require__(42)
	__webpack_require__(43)
	__webpack_require__(44)
	//需要用到事件的
	__webpack_require__(51)
	__webpack_require__(52)
	__webpack_require__(94)
	__webpack_require__(60)
	__webpack_require__(61)

	//处理逻辑
	__webpack_require__(62)
	__webpack_require__(63)

	__webpack_require__(64)
	__webpack_require__(67)

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	
	var attrUpdate = __webpack_require__(87)
	var update = __webpack_require__(36)

	avalon.directive('attr', {
	    diff: function (copy, src, name) {
	        var a = copy[name]
	        var p = src[name]
	        if (a && typeof a === 'object') {
	            if (Array.isArray(a)) {//转换成对象
	                a = avalon.mix.apply({}, a)
	            }
	            if (typeof p !== 'object') {//如果一开始为空
	                src.changeAttr = src[name] = a
	            } else {
	                var patch = {}
	                var hasChange = false
	                for (var i in a) {//diff差异点
	                    if (a[i] !== p[i]) {
	                        hasChange = true
	                        patch[i] = a[i]
	                    }
	                }
	                if (hasChange) {
	                    src[name] = a
	                    src.changeAttr = patch
	                }
	            }
	            if (src.changeAttr) {
	                update(src, this.update)
	            }
	        }
	        delete copy[name]//释放内存
	    },
	    //dom, vnode
	    update: attrUpdate
	})


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	
	var update = __webpack_require__(36)
	var evaluatorPool = __webpack_require__(49)
	var stringify = __webpack_require__(47)

	var rchangeFilter = /\|\s*change\b/
	var rcheckedType = /^(?:checkbox|radio)$/
	var rdebounceFilter = /\|\s*debounce(?:\(([^)]+)\))?/
	var updateModelByEvent = __webpack_require__(95)
	var updateModelByValue = __webpack_require__(57)
	var updateModel = __webpack_require__(55)
	var updateView = __webpack_require__(96)
	var addValidateField = __webpack_require__(59)


	avalon.directive('duplex', {
	    priority: 2000,
	    parse: function (copy, src, binding) {
	        var expr = binding.expr
	        var etype = src.props.type
	        //处理数据转换器
	        var parser = binding.param, dtype
	        var isChecked = false
	        parser = parser ? parser.split('-').map(function (a) {
	            if (a === 'checked') {
	                isChecked = true
	            }
	            return a
	        }) : []

	        if (rcheckedType.test(etype) && isChecked) {
	            //如果是radio, checkbox,判定用户使用了checked格式函数没有
	            parser = []
	            dtype = 'radio'
	        }

	        if (!/input|textarea|select/.test(src.type)) {
	            if ('contenteditable' in src.props) {
	                dtype = 'contenteditable'
	            }
	        } else if (!dtype) {
	            dtype = src.type === 'select' ? 'select' :
	                    etype === 'checkbox' ? 'checkbox' :
	                    etype === 'radio' ? 'radio' :
	                    'input'
	        }
	        var isChanged = false, debounceTime = 0
	        //判定是否使用了 change debounce 过滤器
	        if (dtype === 'input' || dtype === 'contenteditable') {
	            var isString = true
	            if (rchangeFilter.test(expr)) {
	                isChanged = true
	            }
	            if (!isChanged) {
	                var match = expr.match(rdebounceFilter)
	                if (match) {
	                    debounceTime = parseInt(match[1], 10) || 300
	                }
	            }
	        }


	        var changed = copy.props['data-duplex-changed']
	        copy.parser = avalon.quote(parser + "")
	        copy.modelValue = '(' + avalon.parseExpr(binding, 'duplex') + ')(__vmodel__)'// 输出原始数据
	        var format = evaluatorPool.get('duplex:format:' + expr)

	        copy.duplexData = stringify({
	            type: dtype, //这个决定绑定什么事件
	            vmodel: '__vmodel__',
	            isChecked: isChecked,
	            isString: !!isString,
	            isChanged: isChanged, //这个决定同步的频数
	            debounceTime: debounceTime, //这个决定同步的频数
	            format: format || 'function(vm, a){return a}',
	            set: evaluatorPool.get('duplex:set:' + expr),
	            callback: changed ? avalon.parseExpr(changed, 'on') : 'avalon.noop'
	        })

	    },
	    diff: function (copy, src) {

	        if (!src.duplexData) {
	            //第一次为原始虚拟DOM添加duplexData
	            var data = src.duplexData = copy.duplexData
	            data.parser = copy.parser ? copy.parser.split(',') : []
	            data.parse = parseValue
	            var curValue = copy.modelValue
	        } else {
	            data = src.duplexData
	            var curValue = copy.modelValue
	            var preValue = data.modelValue
	            //#1502
	            if (!Array.isArray(curValue) &&
	                    curValue === preValue) {
	                return
	            }
	        }
	        copy.duplexData = 0
	        if (data.isString) {//输出到页面时要格式化
	           var value = data.parse(curValue)
	           if(value !== curValue){
	               data.set(data.vmodel, value)
	               return
	           }
	           curValue = value
	        }
	        data.modelValue = curValue
	        if (data.isString) {//输出到页面时要格式化
	            value = data.format(data.vmodel, curValue + '')
	            if(value !== curValue+''){
	                data.set(data.vmodel, value)
	                return
	            }
	            curValue = value
	        }
	        data.viewValue = curValue
	        update(src, this.update, 'afterChange')


	    },
	    update: function (dom, vdom) {
	        if (dom && dom.nodeType === 1) {
	            if (!dom.__ms_duplex__) {
	                dom.__ms_duplex__ = vdom.duplexData
	                updateModelByEvent(dom, vdom)
	            }
	            var data = dom.__ms_duplex__

	            data.dom = dom
	            addValidateField(dom, vdom)
	            if (data.isString
	                    && !avalon.msie
	                    && updateModelByValue === false
	                    && !dom.valueHijack) {
	                //chrome 42及以下版本需要这个hack

	                dom.valueHijack = updateModel
	                var intervalID = setInterval(function () {
	                    if (!avalon.contains(avalon.root, dom)) {
	                        clearInterval(intervalID)
	                    } else {
	                        dom.valueHijack()
	                    }
	                }, 30)
	            }

	            updateView[data.type].call(data)
	            if (dom.caret) {
	                var pos = data.caretPos
	                pos && data.setCaret(dom, pos.start, pos.end)
	                data.caretPos = null
	            }

	        }

	    }
	})

	function parseValue(val) {
	    for (var i = 0, k; k = this.parser[i++]; ) {
	        var fn = avalon.parsers[k]
	        if (fn) {
	            val = fn.call(this, val)
	        }
	    }
	    return val
	}

	/*
	 vm[ms-duplex]  →  原始modelValue →  格式化后比较   →   输出页面
	 ↑                                                ↓
	 比较modelValue  ←  parsed后得到modelValue  ← 格式化后比较 ←  原始viewValue
	 */

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* 
	 * 通过绑定事件同步vmodel
	 * 总共有三种方式同步视图
	 * 1. 各种事件 input, change, click, propertychange, keydown...
	 * 2. value属性重写
	 * 3. 定时器轮询
	 */
	var updateModel = __webpack_require__(55)
	var markID = __webpack_require__(6).getShortID
	var msie = avalon.msie
	var window = avalon.window
	var document = avalon.document

	function updateModelByEvent(node, vnode) {
	    var events = {}
	    var data = vnode.duplexData
	    data.update = updateModel
	    //添加需要监听的事件
	    switch (data.type) {
	        case 'radio':
	        case 'checkbox':
	            events.click = updateModel
	            break
	        case 'select':
	            events.change = updateModel
	            break
	        case 'contenteditable':
	            if (data.isChanged) {
	                events.blur = updateModel
	            } else {

	                if (window.webkitURL) {
	                    // http://code.metager.de/source/xref/WebKit/LayoutTests/fast/events/
	                    // https://bugs.webkit.org/show_bug.cgi?id=110742
	                    events.webkitEditableContentChanged = updateModel
	                } else if (window.MutationEvent) {
	                    events.DOMCharacterDataModified = updateModel
	                }
	                events.input = updateModel
	            }
	            break
	        case 'input':
	            if (data.isChanged) {
	                events.change = updateModel
	            } else {
	                events.input = updateModel

	                //https://github.com/RubyLouvre/avalon/issues/1368#issuecomment-220503284
	                events.compositionstart = openComposition
	                events.compositionend = closeComposition
	                if(avalon.msie){
	                   events.keyup = updateModelKeyDown 
	                }
	            }
	            break
	    }

	    if (/password|text/.test(vnode.props.type)) {
	        events.focus = openCaret //判定是否使用光标修正功能 
	        events.blur = closeCaret
	        data.getCaret = getCaret
	        data.setCaret = setCaret
	    }

	    for (var name in events) {
	        avalon.bind(node, name, events[name])
	    }
	}


	function updateModelKeyDown(e) {
	    var key = e.keyCode
	    // ignore
	    //    command            modifiers                   arrows
	    if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40))
	        return
	    updateModel.call(this, e)
	}

	function openCaret() {
	    this.caret = true
	}

	function closeCaret() {
	    this.caret = false
	}
	function openComposition() {
	    this.composing = true
	}

	function closeComposition(e) {
	    this.composing = false
	    var elem = this
	    setTimeout(function(){
	       updateModel.call(elem, e) 
	    }, 0)
	    
	}


	markID(openCaret)
	markID(closeCaret)
	markID(openComposition)
	markID(closeComposition)
	markID(updateModelKeyDown)
	markID(updateModel)


	function getCaret(field) {
	    var start = NaN
	    if (field.setSelectionRange) {
	        start = field.selectionStart
	    }
	    return start
	}

	function setCaret(field, pos) {
	    if (!field.value || field.readOnly)
	        return
	    field.selectionStart = pos
	    field.selectionEnd = pos
	}


	module.exports = updateModelByEvent

/***/ },
/* 96 */
/***/ function(module, exports) {

	
	var updateView = {
	    input: function () {//处理单个value值处理
	        this.dom.value = this.viewValue
	    },
	    radio: function () {//处理单个checked属性
	        var checked
	        if (this.isChecked) {
	            checked = !!this.viewValue
	        } else {
	            checked = this.viewValue + '' === this.dom.value
	        }
	        var dom = this.dom

	        dom.checked = checked

	    },
	    checkbox: function () {//处理多个checked属性
	        var checked = false
	        var dom = this.dom
	        var value = dom.value
	        for (var i = 0; i < this.modelValue.length; i++) {
	            var el = this.modelValue[i]
	            if (el + '' === value) {
	                checked = true
	            }
	        }
	        dom.checked = checked
	    },
	    select: function () {//处理子级的selected属性
	        var a = Array.isArray(this.viewValue) ?
	                this.viewValue.map(String) : this.viewValue + ''
	        avalon(this.dom).val(a)
	    },
	    contenteditable: function () {//处理单个innerHTML
	        this.dom.innerHTML = this.viewValue
	        this.update.call(this.dom)
	    }
	}

	module.exports = updateView


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * avalon基于纯净的Object.defineProperties的vm工厂 
	 * masterFactory,slaveFactory,mediatorFactory, ArrayFactory
	 * ------------------------------------------------------------
	 */
	var share = __webpack_require__(98)
	var isSkip = share.isSkip
	var $$midway = share.$$midway
	var $$skipArray = share.$$skipArray
	delete $$skipArray.$accessors
	delete $$skipArray.__data__
	delete $$skipArray.__proxy__
	delete $$skipArray.__const__

	var makeAccessor = share.makeAccessor
	var initViewModel = share.initViewModel
	var modelAccessor = share.modelAccessor
	var modelAdaptor = share.modelAdaptor
	var makeHashCode = avalon.makeHashCode


	//一个vm总是为Observer的实例
	function Observer() {
	}
	function masterFactory(definition, heirloom, options) {

	    var $skipArray = {}
	    if (definition.$skipArray) {//收集所有不可监听属性
	        $skipArray = avalon.oneObject(definition.$skipArray)
	        delete definition.$skipArray
	    }

	    var keys = {}
	    options = options || {}
	    heirloom = heirloom || {}
	    var accessors = {}
	    var hashcode = makeHashCode('$')
	    var pathname = options.pathname || ''
	    options.id = options.id || hashcode
	    options.hashcode = hashcode
	    var key, sid, spath
	    for (key in definition) {
	        if ($$skipArray[key])
	            continue
	        var val = keys[key] = definition[key]
	        if (!isSkip(key, val, $skipArray)) {
	            sid = options.id + '.' + key
	            spath = pathname ? pathname + '.' + key : key
	            accessors[key] = makeAccessor(sid, spath, heirloom)
	        }
	    }

	    accessors.$model = modelAccessor
	    var $vmodel = new Observer()
	    Object.defineProperties($vmodel, accessors)

	    for (key in keys) {
	        //对普通监控属性或访问器属性进行赋值
	        $vmodel[key] = keys[key]
	        //删除系统属性
	        if (key in $skipArray) {
	            delete keys[key]
	        } else {
	            keys[key] = true
	        }
	    }
	    initViewModel($vmodel, heirloom, keys, accessors, options)

	    return $vmodel
	}
	$$midway.masterFactory = masterFactory

	var empty = {}
	function slaveFactory(before, after, heirloom, options) {
	    var keys = {}
	    var accessors = {}
	    var pathname = options.pathname
	    heirloom = heirloom || {}
	    var key, sid, spath
	    for (key in after) {
	        if ($$skipArray[key])
	            continue
	        keys[key] = after[key]
	        if (!isSkip(key, after[key], empty)) {
	            var accessor = Object.getOwnPropertyDescriptor(before, key)
	            if (accessor && accessor.get) {
	                accessors[key] = accessor
	            } else {
	                sid = options.id + '.' + key
	                spath = pathname ? pathname + '.' + key : key
	                accessors[key] = makeAccessor(sid, spath, heirloom)
	            }
	        }
	    }
	    for (key in before) {
	        delete before[key]
	    }

	    options.hashcode = before.$hashcode || makeHashCode('$')
	    accessors.$model = modelAccessor
	    var $vmodel = before
	    Object.defineProperties($vmodel, accessors)

	    for (key in keys) {
	        if (!accessors[key]) {//添加不可监控的属性
	            $vmodel[key] = keys[key]
	        }
	        keys[key] = true
	    }
	    initViewModel($vmodel, heirloom, keys, accessors, options)

	    return $vmodel
	}

	$$midway.slaveFactory = slaveFactory

	function mediatorFactory(before, after) {
	    var keys = {}
	    var accessors = {}
	    var unresolve = {}
	    var heirloom = {}
	    var $skipArray ={}
	    var arr = avalon.slice(arguments)
	    var config
	    var configName
	    for (var i = 0; i < arr.length; i++) {
	        var obj = arr[i]
	        //收集所有键值对及访问器属性
	        for (var key in obj) {
	         
	            keys[key] = obj[key]
	            
	            if(key === '$skipArray' && Array.isArray(obj.$skipArray)){
	                obj.$skipArray.forEach(function(el){
	                    $skipArray[el] = 1
	                })
	            }
	            var accessor = Object.getOwnPropertyDescriptor(obj, key)
	            if (accessor.set) {
	                if (arr.indexOf(obj[key]) === -1) {
	                    accessors[key] = accessor
	                } else { //去掉vm那个配置对象
	                    config = keys[key]
	                    configName = key
	                    delete keys[key]
	                }
	            } else if (typeof keys[key] !== 'function') {
	                unresolve[key] = 1
	            }
	        }
	    }
	    if(typeof this === 'function'){
	        this(keys, unresolve)
	    }
	    for (key in unresolve) {
	        if ($$skipArray[key] || accessors[key])
	            continue
	        if (!isSkip(key, keys[key], $skipArray)) {
	            accessors[key] = makeAccessor(before.$id + '.' + key, key, heirloom)
	            accessors[key].set(keys[key])
	        }
	    }

	    var $vmodel = new Observer()
	    Object.defineProperties($vmodel, accessors)

	    for (key in keys) {
	        if (!accessors[key]) {//添加不可监控的属性
	            $vmodel[key] = keys[key]
	        }
	        if (configName && accessors[key] && config.hasOwnProperty(key)) {
	            var $$ = accessors[key]
	            if (!$$.get.$decompose) {
	                $$.get.$decompose = {}
	            }
	            $$.get.$decompose[configName+'.'+key] = $vmodel
	        }
	        keys[key] = true
	    }

	    initViewModel($vmodel, heirloom, keys, accessors, {
	        id: before.$id,
	        hashcode: makeHashCode("$"),
	        master: true
	    })

	    return $vmodel
	}

	$$midway.mediatorFactory = avalon.mediatorFactory = mediatorFactory

	var __array__ = share.__array__
	var ap = Array.prototype
	var _splice = ap.splice
	function notifySize(array, size) {
	    if (array.length !== size) {
	        array.notify('length', array.length, size, true)
	    }
	}

	__array__.removeAll = function (all) { //移除N个元素
	    var size = this.length
	    if (Array.isArray(all)) {
	        for (var i = this.length - 1; i >= 0; i--) {
	            if (all.indexOf(this[i]) !== -1) {
	                _splice.call(this, i, 1)
	            }
	        }
	    } else if (typeof all === 'function') {
	        for (i = this.length - 1; i >= 0; i--) {
	            var el = this[i]
	            if (all(el, i)) {
	                _splice.call(this, i, 1)
	            }
	        }
	    } else {
	        _splice.call(this, 0, this.length)

	    }

	    notifySize(this, size)
	    this.notify()
	}


	var __method__ = ['push', 'pop', 'shift', 'unshift', 'splice']
	__method__.forEach(function (method) {
	    var original = ap[method]
	    __array__[method] = function (a, b) {
	        // 继续尝试劫持数组元素的属性
	        var args = [], size = this.length
	        if (method === 'splice' && Object(this[0]) === this[0]) {
	            var old = this.slice(a, b)
	            var neo = ap.slice.call(arguments, 2)
	            var args = [a, b]
	            for (var j = 0, jn = neo.length; j < jn; j++) {
	                var item = old[j]
	                args[j + 2] = modelAdaptor(neo[j], item, (item && item.$events||{}), {
	                    id: this.$id + '.*',
	                    master: true
	                })
	            }
	        } else {
	            for (var i = 0, n = arguments.length; i < n; i++) {
	                args[i] = modelAdaptor(arguments[i], 0, {}, {
	                    id: this.$id + '.*',
	                    master: true
	                })
	            }
	        }

	        var result = original.apply(this, args)

	        notifySize(this, size)
	        this.notify()

	        return result
	    }
	})

	'sort,reverse'.replace(avalon.rword, function (method) {
	    __array__[method] = function () {
	        ap[method].apply(this, arguments)
	        this.notify()
	        return this
	    }
	})


	module.exports = avalon


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var share = __webpack_require__(76)
	var initEvents = share.initEvents

	function toJson(val) {
	    var xtype = avalon.type(val)
	    if (xtype === 'array') {
	        var array = []
	        for (var i = 0; i < val.length; i++) {
	            array[i] = toJson(val[i])
	        }
	        return array
	    } else if (xtype === 'object') {
	        var obj = {}
	        for (i in val) {
	            if (val.hasOwnProperty(i)) {
	                var value = val[i]
	                obj[i] = value && value.nodeType ? value : toJson(value)
	            }
	        }
	        return obj
	    }
	    return val
	}

	function hideProperty(host, name, value) {
	    Object.defineProperty(host, name, {
	        value: value,
	        writable: true,
	        enumerable: false,
	        configurable: true
	    })
	}

	var modelAccessor = {
	    get: function () {
	        return toJson(this)
	    },
	    set: avalon.noop,
	    enumerable: false,
	    configurable: true
	}

	share.$$midway.hideProperty = hideProperty

	function initViewModel($vmodel, heirloom, keys, accessors, options) {

	    if (options.array) {
	        Object.defineProperty($vmodel, '$model', modelAccessor)
	    } else {
	        function hasOwnKey(key) {
	            return keys[key] === true
	        }
	        hideProperty($vmodel, 'hasOwnProperty', hasOwnKey)
	    }
	    hideProperty($vmodel, '$id', options.id)
	    hideProperty($vmodel, '$hashcode', options.hashcode)
	    hideProperty($vmodel, '$track', Object.keys(keys).sort().join(';;'))
	    if (options.master === true) {
	        hideProperty($vmodel, '$run', run)
	        hideProperty($vmodel, '$wait', wait)
	        hideProperty($vmodel, '$element', null)
	        hideProperty($vmodel, '$render', 0)
	        initEvents($vmodel, heirloom)
	    }
	}
	function wait() {
	    this.$events.$$wait$$ = true
	}

	function run() {
	    var host = this.$events
	    delete host.$$wait$$
	    if (host.$$dirty$$) {
	        delete host.$$dirty$$
	        avalon.rerenderStart = new Date
	        var id = this.$id
	        var dotIndex = id.indexOf('.')
	        if (dotIndex > 0) {
	            avalon.batch(id.slice(0, dotIndex))
	        } else {
	            avalon.batch(id)
	        }
	    }
	}

	share.$$midway.initViewModel = initViewModel

	var mixin = {
	    toJson: toJson,
	    initViewModel: initViewModel,
	    modelAccessor: modelAccessor
	}
	for (var i in share) {
	    mixin[i] = share[i]
	}

	module.exports = mixin


/***/ },
/* 99 */
/***/ function(module, exports) {

	
	//用于IE8+, firefox
	function byRewritePrototype() {
	    if (byRewritePrototype.execute) {
	        return
	    }
	//https://www.web-tinker.com/article/20618.html?utm_source=tuicool&utm_medium=referral
	//IE6-8虽然暴露了Element.prototype,但无法重写已有的DOM API
	    byRewritePrototype.execute = true
	    var p = Node.prototype
	    function rewite(name, fn) {
	        var cb = p[name]
	        p[name] = function (a, b) {
	            return  fn.call(this, cb, a, b)
	        }
	    }
	    rewite('removeChild', function (fn, a, b) {
	        fn.call(this, a, b)
	        if (a.nodeType === 1) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })

	    rewite('replaceChild', function (fn, a, b) {
	        fn.call(this, a, b)
	        if (a.nodeType === 1) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })
	    //访问器属性需要用getOwnPropertyDescriptor处理
	    var ep = Element.prototype
	    function newSetter(html) {
	        var all = avalon.slice(this.getElementsByTagName('*'))
	        oldSetter.call(this, html)
	        fireDisposedComponents(all)
	    }
	    var obj = Object.getOwnPropertyDescriptor(ep, 'innerHTML')
	    var oldSetter = obj.set
	    obj.set = newSetter
	    Object.defineProperty(ep, 'innerHTML', obj)


	    rewite('appendChild', function (fn, a) {
	        fn.call(this, a)
	        if (a.nodeType === 1 && this.nodeType === 11) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })

	    rewite('insertBefore', function (fn, a, b) {
	        fn.call(this, a, b)
	        if (a.nodeType === 1 && this.nodeType === 11) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })
	}

	module.exports = function onComponentDispose(dom) {
	    byRewritePrototype(dom)
	}


	function inDomTree(el) {
	    while (el) {
	        if (el.nodeType === 9) {
	            return true
	        }
	        el = el.parentNode
	    }
	    return false
	}

	function fireDisposeHook(el) {
	    if (el.nodeType === 1 && el.getAttribute('wid') && !inDomTree(el)) {
	        var wid = el.getAttribute('wid')
	        var docker = avalon.scopes[ wid ]
	        if (!docker)
	            return
	        var vm = docker.vmodel
	        docker.vmodel.$fire("onDispose", {
	            type: 'dispose',
	            target: el,
	            vmodel: vm
	        })
	        if (docker && !el.getAttribute('cached')) {
	            delete docker.vmodel
	            delete avalon.scopes[ wid ]
	        }
	        return false
	    }
	}
	function fireDisposeHookDelay(a) {
	    setTimeout(function () {
	        fireDisposeHook(a)
	    }, 4)
	}

	function fireDisposedComponents(nodes) {
	    for (var i = 0, el; el = nodes[i++]; ) {
	        fireDisposeHook(el)
	    }
	}


/***/ }
/******/ ])
});
;