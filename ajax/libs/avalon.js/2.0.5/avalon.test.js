/*! built in 2016-6-8:22 version 2.07 by 司徒正美 */
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	
	var avalon = __webpack_require__(107)
	//require('./gesture/tap')
	__webpack_require__(108)
	__webpack_require__(109)
	module.exports = avalon




/***/ },

/***/ 107:
/***/ function(module, exports, __webpack_require__) {

	/*! built in 2016-6-8:22 version 2.07 by 司徒正美 */
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
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

		var avalon = __webpack_require__(84) 

		__webpack_require__(8)
		__webpack_require__(15)
		__webpack_require__(86)
		__webpack_require__(95)
		__webpack_require__(72)
		__webpack_require__(103)
		__webpack_require__(104)

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
		            return a === '' ? '' : parseFloat(a) || 0
		        },
		        string: function (a) {
		            return a === null || a === void 0 ? '' : a + ''
		        },
		        boolean: function (a) {
		            return a === 'true'
		        }
		    },
		    version: "2.07",
		    slice: function (nodes, start, end) {
		        return _slice.call(nodes, start, end)
		    },
		    css: function (node, name, value, fn) {
		        //读写删除元素节点的样式
		        if (node instanceof avalon) {
		            node = node[0]
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
		        kernel.rexpr = new RegExp(o + '([\\ss\\S]*)' + c)
		        kernel.rexprg = new RegExp(o + '([\\ss\\S]*)' + c, 'g')
		        kernel.rbind = new RegExp(o + '[\\ss\\S]*' + c + '|\\bms-|\\bslot\\b')
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
		var escape = __webpack_require__(10)
		var sanitize = __webpack_require__(11)
		var date = __webpack_require__(12)
		var arrayFilters = __webpack_require__(13)
		var eventFilters = __webpack_require__(14)
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
		    escape: escape,
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

		
		var rsurrogate = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
		var rnoalphanumeric = /([^\#-~| |!])/g

		function escape(str) {
		    //将字符串经过 str 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt 
		    return String(str).
		            replace(/&/g, '&amp;').
		            replace(rsurrogate, function (value) {
		                var hi = value.charCodeAt(0)
		                var low = value.charCodeAt(1)
		                return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';'
		            }).
		            replace(rnoalphanumeric, function (value) {
		                return '&#' + value.charCodeAt(0) + ';'
		            }).
		            replace(/</g, '&lt;').
		            replace(/>/g, '&gt;')
		}

		module.exports = escape

	/***/ },
	/* 11 */
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
	/* 12 */
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
	/* 13 */
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
	/* 14 */
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
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * 虚拟DOM的4大构造器
		 */
		var VText = __webpack_require__(16)
		var VComment = __webpack_require__(17)
		var VElement = __webpack_require__(18)

		avalon.vdomAdaptor = function (obj, method) {
		    if(!obj){//obj在ms-for循环里面可能是null
		        return (method === "toHTML" ? '' :
		                avalon.avalonFragment.cloneNode(false))
		    }
		    switch (obj.nodeType) {
		        case 3:
		            return VText.prototype[method].call(obj) 
		        case 8:
		            return VComment.prototype[method].call(obj)
		        default:
		            return VElement.prototype[method].call(obj)
		    }
		}

		module.exports = {
		    VText: VText,
		    VComment: VComment,
		    VElement: VElement
		}


	/***/ },
	/* 16 */
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
		        return document.createTextNode(this.nodeValue)
		    },
		    toHTML: function () {
		        return this.nodeValue
		    }
		}

		module.exports = VText

	/***/ },
	/* 17 */
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
	/* 18 */
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
		        this.template = ''
		    }
		}
		function skipFalseAndFunction(a) {
		    return a !== false && (Object(a) !== a)
		}
		var specal = {
		    "class": function (dom, val) {
		        dom.className = val
		    },
		    style: function (dom, val) {
		        dom.style.cssText = val
		    },
		    'for': function (dom, val) {
		        dom.htmlFor = val
		    }
		}
		VElement.prototype = {
		    constructor: VElement,
		    toDOM: function () {
		        var dom = document.createElement(this.type)
		        for (var i in this.props) {
		            var val = this.props[i]
		            if (skipFalseAndFunction(val)) {
		                if (specal[i] && avalon.msie < 8) {
		                    specal[i](dom, val)
		                } else {
		                    dom.setAttribute(i, val + '')
		                }
		            }
		        }
		        if(this.wid){
		            var scope = avalon.scopes[this.wid]
		            if(scope && scope.dom){
		               return scope.dom
		            }
		        }
		        if (this.skipContent) {
		            switch (this.type) {
		                case 'script':
		                    dom.text = this.template
		                    break
		                case 'style':
		                case 'template':
		                    dom.innerHTML = this.template
		                    break
		                case 'noscript':
		                    dom.textContent = this.template
		                    break
		                default:
		                    var a = avalon.parseHTML(this.template)
		                    dom.appendChild(a)
		                    break
		            }

		        } else if (!this.isVoidTag) {
		            if (this.children.length) {
		                this.children.forEach(function (c) {
		                    c && dom.appendChild(avalon.vdomAdaptor(c, 'toDOM'))
		                })
		            } else {
		                dom.appendChild(avalon.parseHTML(this.template))
		            }
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
		                return c ? avalon.vdomAdaptor(c, 'toHTML'): ''
		            }).join('')
		        } else {
		            str += this.template
		        }
		        return str + '</' + this.type + '>'
		    }
		}

		module.exports = VElement

	/***/ },
	/* 19 */,
	/* 20 */,
	/* 21 */,
	/* 22 */,
	/* 23 */
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
	/* 24 */,
	/* 25 */,
	/* 26 */,
	/* 27 */,
	/* 28 */
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
	/* 29 */
	/***/ function(module, exports) {

		
		var scriptNode = avalon.document.createElement('script')
		var scriptTypes = avalon.oneObject(['', 'text/javascript', 'text/ecmascript',
		    'application/ecmascript', 'application/javascript'])

		function fixScript(wrapper) {
		    var els = typeof  wrapper.querySelectorAll !== 'undefined'?
		       wrapper.querySelectorAll('script'): wrapper.getElementsByTagName('script')
		    if (els.length) {
		        for (var i = 0, el; el = els[i++]; ) {
		            if (scriptTypes[el.type]) {
		                //以偷龙转凤方式恢复执行脚本功能
		                var neo = scriptNode.cloneNode(false) //FF不能省略参数
		                Array.prototype.forEach.call(el.attributes, function (attr) {
		                    if (attr && attr.specified) {
		                        neo[attr.name] = attr.value //复制其属性
		                        neo.setAttribute(attr.name, attr.value)
		                    }
		                }) // jshint ignore:line
		                neo.text = el.text
		                el.parentNode.replaceChild(neo, el) //替换节点
		            }
		        }
		    }
		}

		module.exports = fixScript


	/***/ },
	/* 30 */,
	/* 31 */,
	/* 32 */,
	/* 33 */
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
	/* 34 */,
	/* 35 */
	/***/ function(module, exports) {

		var scanStatistics = 0
		function scan(nodes, fn) {
		    for (var i = 0, elem; elem = nodes[i++]; ) {
		        if (elem.nodeType === 1) {
		            var $id = getController(elem)
		            if ($id) {
		                ++scanStatistics
		            }
		            var vm = avalon.vmodels[$id]
		            if (vm && !vm.$element) {
		                cleanWhitespace(elem)//减少虚拟DOM的规模及diff, patch的时间
		                avalon(elem).removeClass('ms-controller')
		                vm.$element = elem
		                var now = new Date()
		                //IE6-8下元素的outerHTML前面会有空白
		                elem.vtree = avalon.lexer(elem.outerHTML.trim())
		                var now2 = new Date()
		                avalon.log('create primitive vtree', now2 - now)
		                vm.$render = avalon.render(elem.vtree)
		                avalon.scopes[vm.$id] = {
		                    vmodel: vm,
		                    local: {},
		                    dom: elem,
		                    render: vm.$render
		                }
		                
		                
		                var now3 = new Date()
		                avalon.log('create template Function ', now3 - now2)
		                avalon.rerenderStart = now3
		                avalon.batch($id, true)
		                if(typeof fn === 'function'){
		                    fn(vm)
		                }
		            } else if (!$id) {
		                scan(elem.childNodes, fn)
		            }
		        }
		    }
		}
		var notWhitespace = /\S/
		function cleanWhitespace(target) {
		    var keep
		    for (var i = 0; i < target.childNodes.length; i++) {
		        var node = target.childNodes[i]
		        if ((node.nodeType === 3) && (!notWhitespace.test(node.nodeValue))) {
		            keep = target.removeChild(node)
		            i--
		        } else if (node.nodeType === 1) {
		            cleanWhitespace(node)
		        }
		    }
		    if (target.childNodes.length === 0 && keep) {
		        target.appendChild(keep)
		    }
		}
		module.exports = avalon.scan = function (a, fn) {
		    if (!a || !a.nodeType) {
		        avalon.warn('[avalon.scan] first argument must be element , documentFragment, or document')
		        return
		    }
		    scan([a], fn)
		    scanStatistics = 0
		}

		function getController(a) {
		    return a.getAttribute('ms-controller') || a.getAttribute('ms-important')
		}

	/***/ },
	/* 36 */,
	/* 37 */
	/***/ function(module, exports, __webpack_require__) {

		// 抽离出来公用
		var update = __webpack_require__(38)

		avalon.directive('important', {
		    priority: 1,
		    parse: function (cur, pre, binding) {
		        var $id = binding.expr
		        var quoted = avalon.quote($id)
		        var name = binding.name
		        cur[name] = quoted

		        pre.$prepend = ['(function(__vmodel__){',
		            'var important = avalon.scopes[' + quoted + ']',
		            'if(important && important.fast){avalon.log("不进入"+'+quoted+');return }',
		            'var __top__ = __vmodel__',
		            'var __synth__ =  avalon.vmodels[' + quoted + ']',
		            'var __present__ = __synth__',
		            'var __vmodel__ = __synth__',
		            '/*controller:' + $id + '*/', 
		        ].join('\n') + '\n\n'
		        cur.synth = '__synth__'
		        cur.local = '{}'
		        cur.top = '__top__'
		        cur.present = '__present__'
		                
		        pre.$append = '/*controller:' + $id + '*/\n})(__vmodel__);'
		    },
		    diff: function (cur, pre, steps, name) {
		        if (pre[name] !== cur[name]) {
		            update(cur, this.update, steps, 'controller')
		        }
		    },
		    update: function (node, vnode,parent) {
		       avalon.directives.controller.update(node, vnode, parent, 'important')
		    }
		})


	/***/ },
	/* 38 */
	/***/ function(module, exports) {

		module.exports = function (cur, update, steps,  type, hookName) {
		    hookName = hookName || 'change'
		    var list = cur[hookName] || (cur[hookName] = [])
		    if (avalon.Array.ensure(list, update)) {
		        steps.count += 1
		        avalon.config.showDiff && avalon.log(type+ ' change')
		    }
		}


	/***/ },
	/* 39 */
	/***/ function(module, exports, __webpack_require__) {

		// 抽离出来公用
		var update = __webpack_require__(38)

		avalon.directive('controller', {
		    priority: 2,
		    parse: function (cur, pre, binding) {
		        var $id = binding.expr
		        var quoted = avalon.quote($id)
		        var name = binding.name
		        cur[name] = quoted

		        // 'if(!avalon.skipController(__fast__, bottomVm)){ '
		        // cur.props[name] = $id
		        pre.$prepend = ['(function(__vmodel__){',
		            'var __top__ = __vmodel__',
		            'var __present__ = avalon.vmodels[' + quoted + ']',
		            'if(__present__ && __top__ && __present__ !== __top__){',
		            'var __synth__ =  avalon.mediatorFactory(__vmodel__, __present__)',
		            'var __vmodel__ = __synth__',
		            '}else{',
		            '__vmodel__ = __top__ || __present__',
		            '}',
		            '/*controller:' + $id + '*/',
		        ].join('\n') + '\n\n'
		        cur.synth = '__synth__'
		        cur.local = '__local__'
		        cur.top = '__top__'
		        cur.present = '__present__'
		        pre.$append = '/*controller:' + $id + '*/\n})(__vmodel__);'
		    },
		    diff: function (cur, pre, steps, name) {
		        if (pre[name] !== cur[name]) {
		            update(cur, this.update, steps, 'controller')
		        }
		    },
		    update: function (node, vnode, parent, important) {
		        var top = vnode.top //位于上方的顶层vm或mediator vm
		        var present = vnode.present
		        var synth = vnode.synth
		        if (top === present) {
		            if (top === void 0) {
		                //如果变动是来自某个顶层vm的下方vm,那么在avalon.batch里
		                //只会为render传入synth,top,present都为undefined
		                return
		            }
		            var scope = avalon.scopes[top.$id]

		            if (scope &&
		                    (!important || important.fast)) {
		                //如果vm在位于顶层,那么在domReady的第一次scan中已经注册到scopes
		                return
		            }
		        }

		        if (top && present) {
		            var str = (top.$render + "")
		            var splitText = '/*controller:' + present.$id + '*/'
		            var start = str.indexOf(splitText) + splitText.length
		            var end = str.lastIndexOf(splitText)
		            var effective = str.slice(start, end)
		            var local = vnode.local || {}
		            var vars = []
		            for (var i in local) {
		                vars.push('var ' + i + ' = __local__[' + avalon.quote(i) + ']')
		            }
		            vars.push('var vnodes = []')
		            var body = vars.join('\n') + effective + '\nreturn vnodes'
		            var render = avalon.render(body)
		            synth.$render = present.$render = render
		            synth.$element = present.$element = node
		            avalon.scopes[present.$id] = {
		                vmodel: present,
		                synth: synth,
		                local: local,
		                dom: node,
		                render: render,
		                fast: 'important'
		            }
		        }
		    }
		})


	/***/ },
	/* 40 */,
	/* 41 */
	/***/ function(module, exports, __webpack_require__) {

		
		var update = __webpack_require__(38)

		avalon.directive('css', {
		    diff: function (cur, pre, steps, name) {
		        var a = cur[name]
		        var p = pre[name]
		        if (Object(a) === a) {
		            
		            a = a.$model || a
		            if (Array.isArray(a)) {
		                a = cur[name] = avalon.mix.apply({}, a)
		            }
		            if (typeof p !== 'object') {
		                cur.changeStyle = a
		            } else {
		                var patch = {}
		                var hasChange = false
		                for (var i in a) {
		                    if (a[i] !== p[i]) {
		                        hasChange = true
		                        patch[i] = a[i]
		                    }
		                }
		                if (hasChange) {
		                    cur.changeStyle = patch
		                }
		            }
		            if (cur.changeStyle) {
		                update(cur, this.update, steps, 'css')
		            }
		        } else {
		            cur[name] = p
		        }
		    },
		    update: function (node, vnode) {
		        var change = vnode.changeStyle
		        var wrap = avalon(node)
		        for (var name in change) {
		            wrap.css(name, change[name])
		        }
		        delete vnode.changeStyle
		    }
		})


	/***/ },
	/* 42 */
	/***/ function(module, exports, __webpack_require__) {

		var update = __webpack_require__(38)

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
		    diff: function (cur, pre, steps, name) {
		        var c = cur[name] = !!cur[name]
		        cur.displayValue = pre.displayValue
		        if (c !== pre.props[name]) {
		            update(cur, this.update, steps, 'visible' )
		        }
		    },
		    update: function (node, vnode) {
		        var show = vnode['ms-visible']
		        var display = node.style.display
		        var value
		        if (show) {
		            if (display === none) {
		                value = vnode.displayValue
		                if (!value) {
		                    node.style.display = ''
		                }
		            }
		            if (node.style.display === '' && avalon(node).css('display') === none &&
		                    // fix firefox BUG,必须挂到页面上
		                    avalon.contains(node.ownerDocument, node)) {

		                value = parseDisplay(node)
		            }
		        } else {
		            if (display !== none) {
		                value = none
		                vnode.displayValue = display
		            }
		        }
		        function cb(){
		           if (value !== void 0) {
		              node.style.display = value
		           }
		        }
		        avalon.applyEffect(node, vnode, {
		            hook: show ? 'onEnterDone': 'onLeaveDone',
		            cb: cb
		        })
		    }
		})



	/***/ },
	/* 43 */,
	/* 44 */
	/***/ function(module, exports, __webpack_require__) {

		var rident = __webpack_require__(45).ident
		var update = __webpack_require__(38)

		avalon.directive('text', {
		    parse: function (cur, pre, binding) {
		        cur.children = '[]'
		        cur.skipContent = true
		        var val = rident.test(binding.expr) ? binding.expr : avalon.parseExpr(binding)
		        cur[binding.name] = val
		    },
		    diff: function (cur, pre, steps, name) {
		        var curValue = cur[name]
		        var preValue = pre[name]
		        cur.children = pre.children
		        var dom = cur.dom = pre.dom

		        if (curValue !== preValue || cur.children.length === 0) {
		            if (!cur.children[0])
		                cur.children[0] = {type: "#text", nodeType: 3}
		            cur.children[0].nodeValue = curValue
		            if (dom) {
		                this.update(dom, cur)
		            } else {
		                update(cur, this.update, steps, 'text')
		            }
		        }
		        pre.dom = null
		        return false
		    },
		    update: function (node, vnode) {
		        var nodeValue = vnode['ms-text']
		        if ('textContent' in node) {
		            node.textContent = nodeValue + ''
		        } else {
		            node.innerText = nodeValue + ''
		        }
		        vnode.dom = node
		    }
		})

	/***/ },
	/* 45 */
	/***/ function(module, exports) {

		module.exports = {
		    ident: /^[$a-zA-Z_][$a-zA-Z0-9_]*$/,
		    sp: /^\s+$/, //全部都是空白,
		    leftSp: /^\s+/, //左边空白
		    rightSp: /s+$/, //右边空白,
		    binding: /^ms-(\w+)-?(.*)/, //绑定属性,
		    string: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g
		}

	/***/ },
	/* 46 */
	/***/ function(module, exports, __webpack_require__) {

		var update = __webpack_require__(38)
		var parseView = __webpack_require__(47)

		avalon.htmlFactory = function (str, vm, local) {
		    var vtree = avalon.lexer(str + "")
		    var e = avalon.render(vtree)
		    return  e(vm, local)
		}

		avalon.directive('html', {
		    parse: function (cur, pre, binding) {
		        if (!pre.isVoidTag) {
		            //将渲染函数的某一部分存起来,渲在c方法中转换为函数
		            cur[binding.name] = avalon.parseExpr(binding)
		            delete pre.children
		            cur.children = 'avalon.htmlFactory(' + avalon.parseExpr(binding) + ',__vmodel__,__local__)'
		        }else{
		            cur.children = '[]'
		        }
		    },
		    diff: function (cur, pre, steps, name) {
		        var curValue = cur[name]
		        var preValue = pre[name]

		        if (curValue !== preValue) {
		            update(cur, this.update, steps, 'html')
		        }
		    },
		    update: function (node, vnode) {
		        if (node.nodeType !== 1) {
		            return
		        }
		        //添加节点
		        avalon.clearHTML(node)
		        var fragment = document.createDocumentFragment()
		        vnode.children.forEach(function (c) {
		            c && fragment.appendChild(avalon.vdomAdaptor(c, 'toDOM'))
		        })
		        node.appendChild(fragment)
		    }
		})


	/***/ },
	/* 47 */
	/***/ function(module, exports, __webpack_require__) {

		
		var parseExpr = __webpack_require__(48)
		var extractBindings = __webpack_require__(50)
		var parseDelimiter = __webpack_require__(51)
		var stringify = __webpack_require__(52)
		var config = avalon.config
		var quote = avalon.quote
		var makeHashCode = avalon.makeHashCode
		var r = __webpack_require__(45)
		var rident = r.ident
		var rsp = r.sp

		var rmsFor = /^\s*ms\-for:/
		var rmsForEnd = /^\s*ms\-for\-end:/
		function wrapDelimiter(expr) {
		    return rident.test(expr) ? expr : parseExpr(expr, 'text')
		}

		function add(a) {
		    return 'vnodes.push(' + a + ');'
		}
		function addTag(obj) {
		    return add(stringify(obj))
		}

		function parseNodes(array) {
		    //ms-important， ms-controller ， ms-for 不可复制，省得死循环
		    //ms-important --> ms-controller --> ms-for --> ms-widget --> ms-effect --> ms-if
		    var buffer = ['\nvar vnodes = [];']
		    var forstack = []
		    for (var i = 0, el; el = array[i++]; ) {
		        var vnode = parseNode(el, forstack)
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
		    buffer.push('return vnodes\n')
		    return buffer.join('\n')
		}



		function parseNode(pre, forstack, logic) {
		    var directives = avalon.directives
		    if (pre.nodeType === 3) {
		        if (config.rexpr.test(pre.nodeValue)) {
		            return add(stringifyText(pre))
		        } else {
		            return addTag(pre)
		        }
		    } else if (pre.nodeType === 1) {
		        var props = pre.props
		        if (pre.type.indexOf('ms-') === 0) {
		            if (!props['ms-widget']) {
		                props['ms-widget'] = '{is:' + quote(pre.type) + '}'
		            }
		        }

		        var cur = {
		            props: {},
		            type: pre.type,
		            nodeType: 1,
		            template: ''
		        }
		        var bindings = extractBindings(cur, props)
		        if (!bindings.length) {
		            cur.skipAttrs = true
		        }

		        cur.order = bindings.map(function (b) {
		            //将ms-*的值变成函数,并赋给cur.props[ms-*]
		            //如果涉及到修改结构,则在pre添加$append,$prepend
		            directives[b.type].parse(cur, pre, b)
		            return b.name

		        }).join(';;')
		        if (pre.directive === 'widget') {
		            cur.order = cur.order ? 'ms-widget;;' + cur.order : 'ms-widget'
		            cur.directive = 'widget'
		            cur.local = '__local__'
		            cur.vmodel = '__vmodel__'
		            cur.wid = avalon.quote(pre.props.wid)
		            delete cur.skipAttrs
		        }
		        if (pre.isVoidTag) {
		            cur.isVoidTag = true
		        } else {
		            if (!('children' in cur)) {
		                var pChildren = pre.children
		                if (pChildren.length) {
		                    cur.children = '(function(){' + parseNodes(pChildren) + '})()'
		                } else {
		                    cur.template = pre.template
		                    cur.children = '[]'
		                }
		            }
		        }

		        return addTag(cur)

		    } else if (pre.nodeType === 8) {
		        var nodeValue = pre.nodeValue
		        if (rmsFor.test(nodeValue)) {// 处理ms-for指令
		            if (nodeValue.indexOf('ms-for:') !== 0) {
		                avalon.error('ms-for指令前不能有空格')
		            }
		            forstack.push(pre)
		            var cur = avalon.mix({
		                directive: 'for',
		                vmodel: '__vmodel__'
		            }, pre)
		            directives['for'].parse(cur, pre, pre)

		            return addTag(cur)

		        } else if (rmsForEnd.test(nodeValue)) {
		            var node = forstack[forstack.length - 1]
		            var signature = node.signature
		            if (nodeValue.indexOf('ms-for-end:') !== 0) {
		                avalon.error('ms-for-end指令前不能有空格')
		            }

		            pre.$append = addTag({
		                nodeType: 8,
		                type: '#comment',
		                nodeValue: signature,
		                key: 'traceKey'
		            }) + '\n' //结束循环
		                    + "\n})"
		            if (forstack.length) {
		                pre.$append += "\n" + signature + '.end =' +
		                        addTag({
		                            nodeType: 8,
		                            type: "#comment",
		                            signature: signature,
		                            nodeValue: "ms-for-end:"
		                        }) + '\n'
		                forstack.pop()
		            }
		            return ''
		        } else if (nodeValue.indexOf('ms-js:') === 0) {//插入JS声明语句
		            var statement = parseExpr(nodeValue.replace('ms-js:', ''), 'js') + '\n'
		            var ret = addTag(pre)
		            var match = statement.match(rstatement)
		            if (match && match[1]) {
		                pre.$append = (pre.$append || '') + statement +
		                        "\n__local__." + match[1] + ' = ' + match[1] + '\n'
		            }else{
		                avalon.warn(nodeValue+' parse fail!')
		            }
		            return ret
		        } else {
		            return addTag(pre)
		        }
		    }
		}
		var rstatement = /^\s*var\s+([$\w]+)\s*\=\s*\S+/

		function stringifyText(el) {
		    var array = parseDelimiter(el.nodeValue)//返回一个数组
		    var nodeValue = ''
		    if (array.length === 1) {
		        nodeValue = wrapDelimiter(array[0].expr)
		    } else {
		        var token = array.map(function (el) {
		            return el.type ? wrapDelimiter(el.expr) : quote(el.expr)
		        }).join(' + ')
		        nodeValue = 'String(' + token + ')'
		    }
		    return '{\ntype: "#text",\nnodeType:3,\nfixIESkip: true,\nnodeValue: ' + nodeValue + '\n}'
		}

		module.exports = parseNodes


	/***/ },
	/* 48 */
	/***/ function(module, exports, __webpack_require__) {

		

		//缓存求值函数，以便多次利用
		var evaluatorPool = __webpack_require__(49)

		var rregexp = /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/g
		var rstring = __webpack_require__(45).string
		var rfill = /\?\?\d+/g
		var brackets = /\(([^)]*)\)/

		var rshortCircuit = /\|\|/g
		var rpipeline = /\|(?=\w)/
		var ruselessSp = /\s*(\.|\|)\s*/g

		var rAt = /(^|[^\w\u00c0-\uFFFF_])(@|##)(?=[$\w])/g
		var rhandleName = /^(?:\@|##)[$\w]+$/i

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
		            replace(rshortCircuit, dig).//移除所有短路或
		            replace(ruselessSp, '$1').//移除. |两端空白
		            split(rpipeline) //使用管道符分离所有过滤器及表达式的正体
		//还原body
		    var body = input.shift().replace(rfill, fill).trim()
		    if (category === 'on' && rhandleName.test(body)) {
		        body = body + '($event)'
		    }

		    body = body.replace(rAt, '$1__vmodel__.')
		    if (category === 'js') {
		        return evaluatorPool.put(category + ':' + cacheID, body)
		    }

		//处理表达式的过滤器部分

		    var filters = input.map(function (str) {

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
		        if(!avalon.modern){
		            body = body.replace(/__vmodel__\.([^(]+)\(([^)]*)\)/,function(a, b, c){
		                return '__vmodel__.'+b+".call(__vmodel__"+ (/\S/.test(c) ? ','+c: "")+")"
		            })
		        }
		        ret = ['function ms_on($event){',
		            'try{',
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
		            quoteError(str, category).replace('parse','get'),
		            '}',
		            '}']
		        evaluatorPool.put('duplex:' + cacheID, getterBody.join('\n'))
		        //给vm同步某个属性
		        var setterBody = [
		            'function (__vmodel__,__value__){',
		            'try{',
		            '\t' + body + ' = __value__',
		            '}catch(e){',
		            quoteError(str, category).replace('parse','set'),
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
		                quoteError(str, category).replace('parse','format'),
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
		            ( category === 'text'? 
		            'return avalon.parsers.string(__value__)': 
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

		
		var Cache = __webpack_require__(28)
		//缓存求值函数，以便多次利用
		module.exports = new Cache(512)


	/***/ },
	/* 50 */
	/***/ function(module, exports, __webpack_require__) {

		var directives = avalon.directives
		var rbinding = __webpack_require__(45).binding
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
		                    binding.priority += param.charCodeAt(0) * 100 + order
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

		    var ret = []
		    for (var k = 0, el; el = bindings[k++]; ) {
		        var type = el.type
		        ret.type = type
		        ret.push(el)
		        if ( type === 'widget') {
		               break
		        }
		    }
		    return ret
		}

		function byPriority(a, b) {
		    return a.priority - b.priority
		}

		module.exports = extractBindings


	/***/ },
	/* 51 */
	/***/ function(module, exports, __webpack_require__) {

		var rline = /\r?\n/g
		var r = __webpack_require__(45)
		var config = avalon.config

		function parseDelimiter(str) {
		    var tokens = [],
		            value, start = 0,
		            stop
		    do {
		        stop = str.indexOf(config.openTag, start)
		        if (stop === -1) {
		            break
		        }
		        value = str.slice(start, stop)
		        if (start === 0) {
		            value = value.replace(r.leftSp, '')
		        }
		        if (value) { // {{ 左边的文本
		            tokens.push({
		                expr: value
		            })
		        }
		        start = stop + config.openTag.length
		        stop = str.indexOf(config.closeTag, start)
		        if (stop === -1) {
		            break
		        }
		        value = str.slice(start, stop)
		        if (value) { //处理{{ }}插值表达式
		            tokens.push({
		                expr: value.replace(rline, ''),
		                type: '{{}}'
		            })
		        }
		        start = stop + avalon.config.closeTag.length
		    } while (1)
		    value = str.slice(start)

		    var lastText = value.replace(r.rightSp, '')
		    if (lastText) { //}} 右边的文本
		        tokens.push({
		            expr: lastText.replace(/^\s+$/,' ')
		        })
		    }
		    return tokens
		}

		module.exports = parseDelimiter


	/***/ },
	/* 52 */
	/***/ function(module, exports) {

		var keyMap = avalon.oneObject("break,case,catch,continue,debugger,default,delete,do,else,false," +
		        "finally,for,function,if,in,instanceof,new,null,return,switch,this," +
		        "throw,true,try,typeof,var,void,while,with," + /* 关键字*/
		        "abstract,boolean,byte,char,class,const,double,enum,export,extends," +
		        "final,float,goto,implements,import,int,interface,long,native," +
		        "package,private,protected,public,short,static,super,synchronized," +
		        "throws,transient,volatile")

		  var quoted = {
		      type: 1,
		      template: 1,
		      innerHTML: 1,
		      outerHTML: 1,
		      order: 1,
		      nodeValue: 1,
		      directive: 1,
		      signature: 1,
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
		        } else if(obj.hasOwnProperty(i)) {
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
	/* 53 */
	/***/ function(module, exports, __webpack_require__) {

		//根据VM的属性值或表达式的值切换类名，ms-class='xxx yyy zzz:flag'
		//http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
		var markID = __webpack_require__(6).getLongID
		var update = __webpack_require__(38)

		var directives = avalon.directives
		avalon.directive('class', {
		    diff: function (cur, pre, steps, name) {
		        var type = name.slice(3)
		        var curValue = cur[name]
		        var preValue = pre[name]
		        if(preValue === void 0)
		            preValue = ''
		        if (!pre.classEvent) {
		            var classEvent = {}
		            if (type === 'hover') {//在移出移入时切换类名
		                classEvent.mouseenter = activateClass
		                classEvent.mouseleave = abandonClass
		            } else if (type === 'active') {//在获得焦点时切换类名
		                cur.props.tabindex = cur.props.tabindex || -1
		                classEvent.tabIndex = cur.props.tabindex
		                classEvent.mousedown = activateClass
		                classEvent.mouseup = abandonClass
		                classEvent.mouseleave = abandonClass
		            }
		            cur.classEvent = classEvent
		        } else {
		            cur.classEvent = pre.classEvent
		        }
		        pre.classEvent = null

		        var className = avalon.noop
		        if (Array.isArray(curValue)) {
		            //处理复杂的一维数组
		           className = curValue.map(function(el){
		                return el && typeof el === 'object' ? processBooleanObject(el) :
		                        el ? el : ''
		            }).join(' ')
		        } else if (avalon.isObject(curValue)) {
		            //处理布尔对象
		            className = processBooleanObject(curValue)
		        } else if(curValue || curValue === 0) {
		            //处理其他真值，如字符串，数字
		            className = String(curValue)
		        }else if(!curValue){
		            className = ''
		        }
		        className = cur[name] = className.trim().replace(/\s+/, ' ')
		        if (preValue !== className) {
		            cur['change-' + type] = className
		            update(cur, this.update, steps, type )
		        }
		    },
		    update: function (node, vnode) {
		        if(!node || node.nodeType !==1)
		            return
		        var classEvent = vnode.classEvent
		        if (classEvent) {
		            for (var i in classEvent) {
		                if (i === 'tabIndex') {
		                    node[i] = classEvent[i]
		                } else {
		                    avalon.bind(node, i, classEvent[i])
		                }
		            }
		            vnode.classEvent = {}
		        }
		        var names = ['class', 'hover', 'active']
		        names.forEach(function (type) {
		            var name = 'change-' + type
		            var value = vnode[ name ]
		            if (value === void 0)
		                return
		            if (type === 'class') {
		                node && setClass(node, vnode)
		            } else {
		                var oldType = node.getAttribute('change-'+type)
		                if (oldType) {
		                    avalon(node).removeClass(oldType)
		                }
		                node.setAttribute(name, value)
		            }
		        })
		    }
		})

		directives.active = directives.hover = directives['class']

		function processBooleanObject(obj) {
		    return Object.keys(obj).filter(function (name) {
		        return obj[name]
		    }).join(' ')
		}

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

		function setClass(node, vnode) {
		    var old = node.getAttribute('old-change-class') || ''
		    var neo = vnode['ms-class']
		    avalon(node).removeClass(old).addClass(neo)
		    node.setAttribute('old-change-class', neo)
		}

		markID(activateClass)
		markID(abandonClass)




	/***/ },
	/* 54 */
	/***/ function(module, exports, __webpack_require__) {

		var markID = __webpack_require__(6).getLongID
		var Cache = __webpack_require__(28)
		var eventCache = new Cache(128)
		var quote = avalon.quote
		var update = __webpack_require__(38)

		//Ref: http://developers.whatwg.org/webappapis.html#event-handler-idl-attributes
		// The assumption is that future DOM event attribute names will begin with
		// 'on' and be composed of only English letters.
		var revent = /^ms-on-([a-z]+)/
		var rfilters = /\|.+/g
		var rvar = /((?:\@|\$|\#\#)?\w+)/g
		var rstring = __webpack_require__(45).string
		//基于事件代理的高性能事件绑定
		avalon.directive('on', {
		    priority: 3000,
		    parse: function (cur, pre, binding) {
		        var vars = binding.expr.replace(rstring, ' ').replace(rfilters, '').match(rvar)
		        var canCache = vars.every(function (el) {
		            return el.charAt(0) === '@' || el.slice(0, 2) === '##' || el === '$event'
		        })
		        cur.vmodel = '__vmodel__'
		        if (canCache) {
		            var key = binding.expr
		            var fn = eventCache.get(key)
		            if (!fn) {
		                var fn = Function('return ' + avalon.parseExpr(binding, 'on'))()
		                var uuid = markID(fn)
		                eventCache.put(key, fn)
		            }else{
		                uuid = fn.uuid
		            }
		            
		            avalon.eventListeners[uuid] = fn
		            cur[binding.name] = 'avalon.eventListeners.' + uuid
		        } else {//如果闭包引用其他变量
		            cur[binding.name] = avalon.parseExpr(binding, 'on')

		        }
		    },
		    diff: function (cur, pre, steps, name) {
		        var cFn = cur[name]
		        var pFn = pre[name]
		        if (cFn !== pFn) {
		            if (typeof pFn === 'function' && typeof cFn === 'function') {
		                var pid = pFn.uuid
		                cFn.uuid = pid
		                avalon.eventListeners[ pid ] = cFn
		                return
		            }
		            var match = name.match(revent)
		            var type = match[1]
		            var search = type + ':' + markID(cFn)
		            cur.addEvents = cur.addEvents || {}
		            cur.addEvents[search] = cFn
		            update(cur, this.update, steps, 'on')
		        }
		    },
		    update: function (node, vnode) {
		        if (!node || node.nodeType > 1) //在循环绑定中，这里为null
		            return
		        var key, type, listener
		        node._ms_context_ = vnode.vmodel
		        for (key in vnode.addEvents) {
		            type = key.split(':').shift()
		            listener = vnode.addEvents[key]
		            avalon.bind(node, type, listener)
		        }
		        delete vnode.addEvents
		    }
		})


	/***/ },
	/* 55 */,
	/* 56 */
	/***/ function(module, exports) {

		//如果select的option没有ms-*或{{}}
		//那么它们是以template形式存在,需要转换成虚拟节点
		function genVirtualSelectChildren(cur, curValue) {
		    var options = []
		    cur.children.forEach(function (a) {
		        if (a.type === 'option') {
		            options.push(a)
		        } else if (a.type === 'optgroup') {
		            a.children.forEach(function (c) {
		                if (c.type === 'option') {
		                    options.push(c)
		                }
		            })
		        }
		    })
		    var multi = cur.props.multiple
		    var map = {}
		    var one = multi === null || multi === void 0 || multi === false
		    if (Array.isArray(curValue)) {
		        curValue.forEach(function (a) {
		            map[a] = 1
		        })
		    } else {
		        map[curValue] = 1
		    }
		    for (var i = 0, option; option = options[i++]; ) {
		        var v = 'value' in option.props ? option.props.value :
		                (option.children[0] || {nodeValue: ''}).nodeValue.trim()
		        option.props.selected = !!map[v]
		        if (map[v] && one) {
		            break
		        }
		    }
		}

		module.exports = genVirtualSelectChildren

	/***/ },
	/* 57 */,
	/* 58 */
	/***/ function(module, exports, __webpack_require__) {

		var updateModelMethods = __webpack_require__(59)
		function updateModelHandle() {
		    var elem = this
		    var field = this.__ms_duplex__
		    if (elem.composing || elem.value === field.lastViewValue)
		        return
		    if (elem.caret) {
		        try {
		            var pos = field.getCaret(elem)
		            if (pos.start === pos.end || pos.start + 1 === pos.end) {
		                field.caretPos = pos
		            }
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
	/* 59 */
	/***/ function(module, exports) {

		var updateModelMethods = {
		    input: function (prop) {//处理单个value值处理
		        var data = this
		        prop = prop || 'value'
		        var rawValue = data.element[prop]
		        var formatedValue = data.format(data.vmodel, rawValue)
		        if (formatedValue !== rawValue) {
		            data.formatedValue = formatedValue
		            data.element[prop] = formatedValue
		        }
		        
		        var parsedValue = data.parse(formatedValue)
		        if (parsedValue !== data.modelValue) {
		            data.set(data.vmodel, parsedValue)
		            callback(data)
		        }

		        //vm.aaa = '1234567890'
		        //处理 <input ms-duplex='@aaa|limitBy(8)'/>{{@aaa}} 这种格式化同步不一致的情况 

		    },
		    radio: function () {
		        var data = this
		        if (data.isChecked) {
		            var val = data.modelValue = !data.modelValue
		            data.set(data.vmodel, val)
		            callback(data)
		        } else {
		            updateModelMethods.input.call(data)
		        }
		    },
		    checkbox: function () {
		        var data = this
		        var array = data.modelValue
		        if (!Array.isArray(array)) {
		            avalon.warn('ms-duplex应用于checkbox上要对应一个数组')
		            array = [array]
		        }
		        var method = data.element.checked ? 'ensure' : 'remove'
		        
		        if (array[method]) {
		            var val = data.parse(data.element.value)
		            array[method](val)
		            callback(data)
		        }

		    },
		    select: function () {
		        var data = this
		        var val = avalon(data.element).val() //字符串或字符串数组
		        if (val + '' !== this.modelValue + '') {
		            if (Array.isArray(val)) { //转换布尔数组或其他
		                val = val.map(function (v) {
		                    return data.parse(v)
		                })
		            } else {
		                val = data.parse(val)
		            }
		            data.modelValue = val
		            data.set(data.vmodel, val)
		            callback(data)
		        }
		    },
		    contenteditable: function () {
		        updateModelMethods.input.call(this, 'innerHTML')
		    }
		}

		function callback(data) {
		    if (data.validator) {
		        avalon.directives.validate.validate(data, false)
		    }
		    if (data.callback) {
		        data.callback.call(data.vmodel, {
		            type: 'changed',
		            target: data.element
		        })
		    }
		}



		module.exports = updateModelMethods


	/***/ },
	/* 60 */
	/***/ function(module, exports) {

		var valueHijack = false
		try { //#272 IE9-IE11, firefox
		    var setters = {}
		    var aproto = HTMLInputElement.prototype
		    var bproto = HTMLTextAreaElement.prototype
		    function newSetter(value) { // jshint ignore:line
		        setters[this.tagName].call(this, value)
		        if (!this.caret && this._ms_field_) {
		            this._ms_field_.update.call(this)
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
	/* 61 */,
	/* 62 */
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
	/* 63 */
	/***/ function(module, exports, __webpack_require__) {

		var update = __webpack_require__(38)

		var dir = avalon.directive('validate', {
		//验证单个表单元素
		    diff: function (cur, pre, steps, name) {
		        var validator = cur[name]
		        var p = pre[name]
		        if (p && p.onError && p.addField) {
		            cur[name] = p
		        } else if (Object(validator) === validator) {
		            if(validator.$id){//转换为普通对象
		                validator = validator.$model
		            }
		            cur[name] = validator
		            for(var name in dir.defaults){
		                if(!validator[name]){
		                    validator[name] = dir.defaults[name]
		                }
		            }
		            validator.fields = validator.fields || []
		            update(cur, this.update, steps, 'validate' )

		        }
		    },
		    update: function (node, vnode) {
		        var validator = vnode['ms-validate']
		        node._ms_validator_ = validator
		        validator.element = node
		        node.setAttribute("novalidate", "novalidate");
		        if (validator.validateAllInSubmit) {
		            avalon.bind(node, "submit", function (e) {
		                e.preventDefault()
		                dir.validateAll.call(validator, validator.onValidateAll)
		            })
		        }
		        if (typeof validator.onInit === "function") { //vmodels是不包括vmodel的
		            validator.onInit.call(node)
		        }
		    },
		    validateAll: function (callback) {
		        var validator = this
		        var fn = typeof callback === "function" ? callback : validator.onValidateAll
		        var promise = validator.fields.filter(function (field) {
		            var el = field.element
		            return el && !el.disabled && validator.element.contains(el)
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
		                    var el = field.element
		                    var uuid = el.uniqueID || (el.uniqueID = setTimeout("1"))
		                    if (uniq[uuid]) {
		                        return false
		                    } else {
		                        uniq[uuid] = true
		                        return true
		                    }
		                })
		            }
		            fn.call(validator.element, reasons) //这里只放置未通过验证的组件
		        })
		    },
		    addField: function (field) {
		        var validator = this
		        var node = field.element
		        if (validator.validateInKeyup && (!field.isChanged &&!field.debounceTime)) {
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
		        var elem = field.element
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
		    addField: dir.addField,
		    onError: avalon.noop,
		    onSuccess: avalon.noop,
		    onComplete: avalon.noop,
		    onReset: avalon.noop,
		    validateInBlur: true, //@config {Boolean} true，在blur事件中进行验证,触发onSuccess, onError, onComplete回调
		    validateInKeyup: true, //@config {Boolean} true，在keyup事件中进行验证,触发onSuccess, onError, onComplete回调
		    validateAllInSubmit: true, //@config {Boolean} true，在submit事件中执行onValidateAll回调
		    resetInFocus: true, //@config {Boolean} true，在focus事件中执行onReset回调,
		    deduplicateInValidateAll: false //@config {Boolean} false，在validateAll回调中对reason数组根据元素节点进行去重
		}

	/***/ },
	/* 64 */
	/***/ function(module, exports) {

		avalon.directive('rules', {
		     parse: function (cur, pre, binding) {
		        var rules = binding.expr
		        if (/{.+}/.test(rules)) {
		           cur[binding.name] = avalon.parseExpr(binding)
		        }
		    },
		    diff: avalon.noop
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
	/* 65 */
	/***/ function(module, exports, __webpack_require__) {

		var patch = __webpack_require__(66)
		var update = __webpack_require__(38)

		//ms-imporant ms-controller ms-for ms-widget ms-effect ms-if   ...
		avalon.directive('if', {
		    priority: 6,
		    parse: function (cur, pre, binding) {
		        pre.$prepend = (pre.$prepend || '') + 'var varIf = ' + avalon.parseExpr(binding) +
		                "\nif(varIf){\n"
		        var old = pre.$append || ''
		        pre.$append = '}else{\n\n' +
		                'vnodes.push({\nnodeType: 8,\ndirective:"if",\n' +
		                'type: "#comment",\nnodeValue:"ms-if"\n})' +
		                '\n}' + old
		    },
		    diff: function (cur, pre, steps) {
		        cur.dom = pre.dom
		        if (cur.nodeType !== pre.nodeType) {
		            cur.steps = steps
		            if(cur.nodeType === 8){
		               cur['ms-effect'] = pre['ms-effect']
		            }
		            update(cur, this.update, steps, 'if')
		        }
		    },
		    update: function (node, vnode, parent) {
		        var dtype = node.nodeType
		        var vtype = vnode.nodeType
		        if (dtype !== vtype) {
		            if (vtype === 1) {
		                //要插入元素节点,将原位置上的注释节点移除并cache
		                var element = vnode.dom
		                if (!element) {
		                    element = avalon.vdomAdaptor(vnode, 'toDOM')
		                    vnode.dom = element
		                    for (var prop in vnode) {//如果一开始是隐藏,那么事件会没有绑上
		                        if (prop.indexOf('ms-on') === 0) {
		                            var fn = vnode[prop]
		                            if (typeof fn === 'function') {
		                                element._ms_context_ = vnode.vmodel
		                                avalon.bind(element, prop.split('-')[2], fn)
		                            }
		                        }
		                    }
		                    
		                }
		                parent.replaceChild(element, node)
		                if (vnode.steps.count) {
		                    patch([element], [vnode], parent, vnode.steps)
		                }
		                avalon.applyEffect(node, vnode, {
		                    hook: 'onEnterDone'
		                })
		                return (vnode.steps = false)
		            } else if (vtype === 8) {
		                //要移除元素节点,在对应位置上插入注释节点
		                avalon.applyEffect(node, vnode, {
		                    hook: 'onLeaveDone',
		                    cb: function () {
		                        var comment = node._ms_if_ ||
		                                (node._ms_if_ = document.createComment(vnode.nodeValue))
		                        delete vnode['ms-effect']
		                        //去掉注释节点临时添加的ms-effect
		                        parent.replaceChild(comment, node)
		                    }
		                })
		            }
		        }
		    }
		})



	/***/ },
	/* 66 */
	/***/ function(module, exports) {

		/**
		 * ------------------------------------------------------------
		 * patch 对某一个视图根据对应的虚拟DOM树进行全量更新
		 * ------------------------------------------------------------
		 */
		var sp = /^\s*$/
		function patch(nodes, vnodes, parent, steps) {
		    var next = nodes[0]
		    if ((!next && !parent) || !steps.count) {
		        return
		    }
		    parent = parent || next.parentNode
		    for (var i = 0, vn = vnodes.length; i < vn; i++) {
		        var vnode = vnodes[i]
		        var node = next
		        //IE6-8不会生成空白的文本节点，造成虚拟DOM与真实DOM的个数不一致，需要跳过,#1333
		        if (avalon.msie < 9 && !vnode.fixIESkip && vnode.nodeType === 3 && sp.test(vnode.nodeValue) ) {
		            continue
		        }

		        if (node) {
		            next = node.nextSibling
		        }
		        if (vnode.directive === 'for') {
		            
		            if (vnode.forDiff) {
		                if (!node) {
		                    return
		                }
		                if (node.nodeType === 1) {
		                    var startRepeat = document.createComment(vnode.nodeValue)
		                    parent.insertBefore(startRepeat, node)
		                    vnode.endRepeat = document.createComment('ms-for-end:')
		                    parent.insertBefore(vnode.endRepeat, node.nextSibling)
		                    node = startRepeat
		                } else {//如果是注释节点
		                    if (!vnode.endRepeat) {
		                        vnode.endRepeat = getEndRepeat(node)
		                    }
		                }
		                if(node.nodeType !== 8){//fix IE6-8
		                    node = node.nextSibling
		                }
		                next = vnode.endRepeat.nextSibling
		            }
		        }
		        //ms-for, ms-if, ms-widget会返回false
		        if (false === execHooks(node, vnode, parent, steps, 'change')) {
		            if (typeof vnode.repeatCount === 'number') {
		                i += vnode.repeatCount + 1 //修正索引值
		            }
		            execHooks(node, vnode, parent, steps, 'afterChange')
		            continue
		        }
		        if (!vnode.skipContent && vnode.children && node && node.nodeType === 1) {
		            //处理子节点
		            patch(avalon.slice(node.childNodes), vnode.children, node, steps)
		        }
		        // ms-if=false内的ms-controller无法正确的关联dom
		        var vmID = vnode.props && vnode.props['ms-controller']
		        if (vmID && node) {
		            var vm = avalon.vmodels[vmID]
		            if (vm.$render) vm.$render.dom = node
		        }
		        //ms-duplex
		        execHooks(node, vnode, parent, steps, 'afterChange')
		        if (!steps.count)
		            break
		    }
		}

		function getEndRepeat(node) {
		    var isBreak = 0, ret = [], node
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
		    return ret.pop()
		}

		function execHooks(node, vnode, parent, steps, hookName) {
		    var hooks = vnode[hookName]
		    if (hooks) {
		        for (var hook; hook = hooks.shift(); ) {
		            steps.count -= 1
		            if (false === hook(node, vnode, parent)) {
		                return false
		            }
		        }
		        delete vnode[hookName]
		    }
		}

		module.exports = patch

	/***/ },
	/* 67 */
	/***/ function(module, exports, __webpack_require__) {

		var patch = __webpack_require__(66)
		var rforPrefix = /ms-for\:\s*/
		var rforLeft = /^\s*\(\s*/
		var rforRight = /\s*\)\s*$/
		var rforSplit = /\s*,\s*/
		var rforAs = /\s+as\s+([$\w]+)/
		var rident = __webpack_require__(45).ident
		var update = __webpack_require__(38)

		var rinvalid = /^(null|undefined|NaN|window|this|\$index|\$id)$/
		function getTrackKey(item) {
		    var type = typeof item
		    return item && type === 'object' ? item.$hashcode : type + ':' + item
		}

		avalon._each = function (obj, fn) {
		    if (Array.isArray(obj)) {
		        for (var i = 0; i < obj.length; i++) {
		            var item = obj[i]
		            var key = getTrackKey(item)
		            fn(i, item, key)
		        }
		    } else {
		        for (var i in obj) {
		            if (obj.hasOwnProperty(i)) {
		                fn(i, obj[i], i)
		            }
		        }
		    }
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
		    cur.components = items
		    cur.compareText = keys.length + '|' + keys.join(';;')
		}

		function getDOMs(first, last, signature) {
		    var items = []
		    var all = []
		    var item = []
		    for (var el = first; el && el !== last; el = el.nextSibling) {
		        all.push(el)
		        if (el.nodeType === 8 && el.nodeValue === signature) {
		            item.push(el)
		            items.push(item)
		            item = []
		        } else {
		            item.push(el)
		        }
		    }
		    items.all = all
		    return items
		}

		avalon.directive('for', {
		    priority: 3,
		    parse: function (cur, pre, binding) {
		        var str = pre.nodeValue, aliasAs
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
		        var assign2 = 'var ' + pre.signature + ' = vnodes[vnodes.length-1]\n'
		        var alias = aliasAs ? 'var ' + aliasAs + ' = loop\n' : ''
		        var kv = arr[0].replace(rforLeft, '').replace(rforRight, '').split(rforSplit)

		        if (kv.length === 1) {//确保avalon._each的回调有三个参数
		            kv.unshift('$key')
		        }
		        kv.push('traceKey')
		        var quote = avalon.quote
		        var localArr = [quote(kv[0]) + ':' + kv[0], quote(kv[1]) + ':' + kv[1]]
		        if (aliasAs) {
		            localArr.push(quote(aliasAs) + ':loop')
		        }
		        var lll = '{' + localArr.join(',\n') + '}'
		        //分别创建isArray, ____n, ___i, ___v, ___trackKey变量
		        //https://www.w3.org/TR/css3-animations/#animationiteration
		        pre.$append = assign + assign2 + alias + 'avalon._each(loop,function('
		                + kv.join(', ') + '){\n' +
		                '__local__ = avalon.mix(__local__, ' + lll + ')\n'

		    },
		    diff: function (current, previous, steps, __index__) {
		        var cur = current[__index__]
		        var pre = previous[__index__] || {}
		        //2.0.7不需要cur.start
		        var nodes = current.slice(__index__, cur.end)
		        cur.items = nodes.slice(1, -1)

		        prepareCompare(cur.items, cur)
		        delete pre.forDiff
		        if (cur.compareText === pre.compareText) {
		            avalon.shadowCopy(cur, pre)
		            return
		        }
		        
		        cur.forDiff = true

		        var isInit = !('items' in pre)
		        var i, c, p
		        if (isInit) {
		            var _items = getRepeatRange(previous,__index__ )
		            pre.items = _items.slice(1,-1)
		            pre.components = []
		            pre.repeatCount =  pre.items.length
		        }

		        var quota = pre.components.length
		        cur.endRepeat = pre.endRepeat

		        var n = Math.max(nodes.length - 2, 0) - pre.repeatCount
		        //让循环区域在新旧vtree里对齐
		        if (n > 0) {
		            var spliceArgs = [__index__ + 1, 0]
		            for (var i = 0; i < n; i++) {
		                spliceArgs.push(null)
		            }
		            previous.splice.apply(previous, spliceArgs)
		        } else if (n < 0) {
		            previous.splice.apply(previous, [__index__, Math.abs(n)])
		        }
		        cur.action = isInit ? 'init' : 'update'
		        if (isInit) {
		            /* eslint-disable no-cond-assign */
		            var cache = cur.cache = {}
		            for (i = 0; c = cur.components[i]; i++) {
		                /* eslint-enable no-cond-assign */
		                saveInCache(cache, c)
		                c.action = 'enter'
		                if (cur.fixAction) {
		                    c.action = 'move'
		                    c.domIndex = i
		                }

		            }
		            cur.removedComponents = {}
		            //如果没有孩子也要处理一下
		        } else {
		            var cache = pre.cache
		            if (!cache)
		                return
		            var newCache = cur.cache = {}
		            /* eslint-disable no-cond-assign */
		            for (i = 0; c = cur.components[i]; i++) {
		                /* eslint-enable no-cond-assign */
		                var p = isInCache(cache, c.key)
		                if (p) {
		                    quota--
		                } else if (quota) {
		                    p = fuzzyMatchCache(cache, c.key)
		                    if (p) {
		                        quota--
		                    }
		                }
		                c.action = p ? 'move' : 'enter'
		                if (p) {
		                    clearDom(p.children)
		                    c.domIndex = p.index
		                }
		                saveInCache(newCache, c)
		            }

		            for (i in cache) {
		                cur.removedComponents = cache
		                break
		            }
		        }

		        pre.components.length = 0 //release memory

		        cur.prevItems = pre.items
		        cur.steps = steps

		        delete pre.cache
		        delete pre.items
		        update(cur, this.update, steps, 'for')
		        return __index__ + nodes.length - 1

		    },
		    update: function (startRepeat, vnode, parent) {
		        var endRepeat = vnode.endRepeat
		        var key = vnode.signature
		        var DOMs = getDOMs(startRepeat.nextSibling, endRepeat, key)
		        if (DOMs.length === 0) {
		            DOMs.all.forEach(function (el) {
		                parent.removeChild(el)
		            })
		        }

		        var fragment = avalon.avalonFragment

		        var domTemplate = avalon.parseHTML(vnode.template)
		        for (var i in vnode.removedComponents) {
		            var el = vnode.removedComponents[i]

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


		        delete vnode.removedComponents

		        var insertPoint = startRepeat
		        var entity = []
		        for (var i = 0; i < vnode.components.length; i++) {
		            var com = vnode.components[i]
		            //添加nodes属性并插入节点
		            if (com.action === 'enter') {
		                var newFragment = domTemplate.cloneNode(true)
		                newFragment.appendChild(document.createComment(vnode.signature))
		                var cnodes = avalon.slice(newFragment.childNodes)

		                parent.insertBefore(newFragment, insertPoint.nextSibling)
		                applyEffects(cnodes, com.children, {
		                    hook: 'onEnterDone',
		                    staggerKey: key + 'enter'
		                })
		            } else if (com.action === 'move') {
		                var moveFragment = fragment.cloneNode(false)
		                var cnodes = DOMs[com.domIndex] || []
		                for (var k = 0, cc; cc = cnodes[k++]; ) {
		                    moveFragment.appendChild(cc)
		                }
		                parent.insertBefore(moveFragment, insertPoint.nextSibling)
		                applyEffects(cnodes, com.children, {
		                    hook: 'onMoveDone',
		                    staggerKey: key + 'move'
		                })
		            }
		            entity.push.apply(entity, cnodes)
		            insertPoint = cnodes[cnodes.length - 1]
		            if (!insertPoint) {
		                break
		            }
		        }
		        var items = vnode.items

		        var steps = vnode.steps
		        var oldCount = steps.count
		        vnode.repeatCount = items.length
		        avalon.diff(items, vnode.prevItems, steps)

		        if (steps.count !== oldCount) {
		            patch(entity, items, parent, steps)
		        }

		        var cb = avalon.caches[vnode.cid]
		        if (cb) {
		            cb.call(vnode.vmodel, {
		                type: 'rendered',
		                target: startRepeat,
		                endRepeat: endRepeat,
		                signature: vnode.signature
		            })
		        }
		        return false
		    }

		})

		function getRepeatRange(nodes, i) {
		    var isBreak = 0, ret = [], node
		    while (node = nodes[i++]) {
		        if (node.type === '#comment') {
		            if (node.nodeValue.indexOf('ms-for:') === 0) {
		                isBreak++
		            } else if (node.nodeValue.indexOf('ms-for-end:') === 0) {
		                isBreak--
		            }
		        }
		        ret.push(node)
		        if (isBreak === 0) {
		            break
		        }
		    }
		    return ret
		}
		function clearDom(arr) {
		    for (var i = 0, el; el = arr[i++]; ) {
		        if (el.dom) {
		            el.dom = null
		        }
		        if (el.children) {
		            clearDom(el.children)
		        }
		    }
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
		    var c = cache[id], cid = id
		    if (c) {
		        var ctack = cache["***" + id]
		        if (ctack) {
		            var a = ctack.pop()
		            delete cache[a.id]
		            if (ctack.length == 0)
		                delete cache["***" + id]
		            return a.c
		        }
		        var stack = [{id: id, c: c}]
		        while (1) {
		            id += '_'
		            if (cache[id]) {
		                stack.push({
		                    id: id,
		                    c: cache[id]
		                })
		            } else {
		                break
		            }
		        }
		        var a = stack.pop()
		        delete cache[a.id]
		        if (stack.length) {
		            cache['***' + cid] = stack
		        }
		        return a.c
		    }
		    return c
		}

		function saveInCache(cache, component) {
		    var trackId = component.key
		    if (!cache[trackId]) {
		        cache[trackId] = component
		    } else {
		        while (1) {
		            trackId += '_'
		            if (!cache[trackId]) {
		                cache[trackId] = component
		                break
		            }
		        }
		    }
		}
		var applyEffects = function (nodes, vnodes, opts) {
		    vnodes.forEach(function (el, i) {
		        avalon.applyEffect(nodes[i], vnodes[i], opts)
		    })
		}


	/***/ },
	/* 68 */,
	/* 69 */,
	/* 70 */
	/***/ function(module, exports, __webpack_require__) {

		var support = __webpack_require__(71)
		var Cache = __webpack_require__(28)
		var update = __webpack_require__(38)

		avalon.directive('effect', {
		    priority: 5,
		    diff: function (cur, pre, steps, name) {
		        var curObj = cur[name]
		        if(typeof curObj === 'string'){
		            var is = curObj
		            curObj = cur[name] = {
		                is: is
		            }
		           
		        }else if (Array.isArray(curObj)) {
		            curObj = cur[name] = avalon.mix.apply({}, curObj)
		        }
		    
		        curObj.action = curObj.action || 'enter'
		       
		        if (Object(curObj) === curObj) {
		            var preObj = pre[name]
		            if ( Object(preObj) !== preObj || diffObj(curObj, preObj ))  {
		                update(cur, this.update, steps, 'effect', 'afterChange')

		            }
		        }
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
	/* 71 */
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
		        break;
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
		        ani = checker[name];
		        break;
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
	/* 72 */
	/***/ function(module, exports, __webpack_require__) {

		
		avalon.lexer = __webpack_require__(73)
		avalon.diff = __webpack_require__(74)
		avalon.batch = __webpack_require__(75)
		// dispatch与patch 为内置模块
		var parseView = __webpack_require__(47)

		function render(vtree, local) {
		    var _body = Array.isArray(vtree) ? parseView(vtree) : vtree
		    var _local = []
		    if (local) {
		        for (var i in local) {
		            _local.push('var ' + i + ' = __local__['+avalon.quote(i)+']')
		        }
		    }
		    var body = '__local__ = __local__ || {};\n' +
		            'var __present__, __top__,__synth__;\n' +
		            _local.join(';\n') + _body
		    var fn = Function('__vmodel__', '__local__', body)
		    return fn
		}
		avalon.render = render

		module.exports = avalon


	/***/ },
	/* 73 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * ------------------------------------------------------------
		 * lexer 将字符串变成一个虚拟DOM树,方便以后进一步变成模板函数
		 * 此阶段只会生成VElement,VText,VComment
		 * ------------------------------------------------------------
		 */

		var makeHashCode = avalon.makeHashCode
		var vdom = __webpack_require__(15)
		var VText = vdom.VText
		var VComment = vdom.VComment


		//匹配只有开标签的无内容元素（Void elements 或 self-contained tags）
		//http://www.colorglare.com/2014/02/03/to-close-or-not-to-close.html
		//http://blog.jobbole.com/61514/

		var rfullTag = /^<([^\s>\/=.$<]+)(?:\s+[^=\s]+(?:=[^>\s]+)?)*\s*>(?:[\s\S]*)<\/\1>/
		var rvoidTag = /^<([^\s>\/=.$<]+)\s*([^>]*?)\/?>/

		var rtext = /^[^<]+/
		var rcomment = /^<!--([\w\W]*?)-->/

		var rnumber = /\d+/g
		var rspAfterForStart = /^\s*ms-for\:/
		var rspBeforeForEnd = /^\s*ms-for-end\:/
		var r = __webpack_require__(45)
		var rsp = r.sp
		var rfill = /\?\?\d+/g
		var rleftSp = r.leftSp
		var rstring = r.string


		var config = avalon.config


		var maps = {}
		var number = 1
		function dig(a) {
		    var key = '??' + number++
		    maps[key] = a
		    return key
		}
		function fill(a) {
		    var val = maps[a]
		    return val
		}
		var rhasString = /=["']/
		var rlineSp = /\n\s*/g
		function fixLongAttrValue(attr) {
		    return rhasString.test(attr) ?
		            attr.replace(rlineSp, '').replace(rstring, dig) : attr
		}
		function lexer(text, curDeep, maxDeep) {
		    var nodes = []
		    maxDeep = maxDeep || 1
		    if (typeof curDeep !== 'number') {
		        curDeep = 0
		    } else {
		        curDeep = curDeep + 1
		    }
		    if (curDeep >= maxDeep && !config.rbind.test(text)) {
		        return nodes
		    }
		    if (!curDeep) {
		        text = text.replace(rstring, dig)
		    }
		    do {
		        var outerHTML = ''
		        var node = false
		        var match = text.match(rtext)
		        if (match) {//尝试匹配文本
		            outerHTML = match[0]
		            node = new VText(outerHTML.replace(rfill, fill))
		        }

		        if (!node) {//尝试匹配注释
		            match = text.match(rcomment)
		            if (match) {
		                outerHTML = match[0]
		                node = new VComment(match[1].replace(rfill, fill))
		                var nodeValue = node.nodeValue
		                if (rspBeforeForEnd.test(nodeValue)) {
		                    var sp = nodes[nodes.length - 1]
		                    //移除紧挨着<!--ms-for-end:xxxx-->前的空白节点
		                    if (sp && sp.nodeType === 3 && rsp.test(sp.nodeValue)) {
		                        nodes.pop()
		                    }
		                    getForTemplate(nodes)
		                }
		            }
		        }


		        if (!node) {//尝试匹配拥有闭标签的元素节点
		            match = text.match(rfullTag)
		            if (match) {
		                outerHTML = match[0]//贪婪匹配 outerHTML,可能匹配过多
		                var type = match[1].toLowerCase()//nodeName
		                outerHTML = clipOuterHTML(outerHTML, type)

		                match = outerHTML.match(rvoidTag) //抽取所有属性

		                var props = {}
		                if (match[2]) {
		                    handleProps(fixLongAttrValue(match[2]), props)
		                }

		                var innerHTML = outerHTML.slice(match[0].length,
		                        (type.length + 3) * -1) //抽取innerHTML
		                node = {
		                    nodeType: 1,
		                    type: type,
		                    props: props,
		                    template: innerHTML.replace(rfill, fill).trim(),
		                    children: []
		                }
		                node = modifyProps(node, innerHTML, nodes, curDeep, maxDeep)
		                
		            }
		        }

		        if (!node) {
		            match = text.match(rvoidTag)
		            if (match) {//尝试匹配自闭合标签
		                outerHTML = match[0]
		                type = match[1].toLowerCase()
		                props = {}
		                if (match[2]) {
		                    handleProps(fixLongAttrValue(match[2]), props)
		                }
		                node = {
		                    nodeType: 1,
		                    type: type,
		                    props: props,
		                    template: '',
		                    children: [],
		                    isVoidTag: true
		                }
		                node = modifyProps(node, '', nodes, curDeep, maxDeep)
		            }
		        }

		        if (node) {//从text中移除被匹配的部分
		            nodes.push(node)
		            text = text.slice(outerHTML.length)
		            if (node.nodeType === 8 && rspAfterForStart.test(node.nodeValue)) {
		                node.signature = makeHashCode('for')
		                //移除紧挨着<!--ms-for:xxxx-->后的空白节点
		                text = text.replace(rleftSp, '')
		            }
		        } else {
		            break
		        }
		    } while (1);
		    if (!curDeep) {
		        maps = {}
		    }
		    return nodes
		}

		function getForTemplate(nodes){
		    var i = 1, el, k = nodes.length, ret = []
		    while(el = nodes[--k]){
		        if(el.nodeType === 8){
		            if(rspAfterForStart.test(el.nodeValue)){
		                i -= 1
		            }else if(rspBeforeForEnd.test(el.nodeValue)){
		                i += 1
		            }
		            if(i === 0){
		                break
		            }
		        }
		        ret.push(avalon.vdomAdaptor(el, 'toHTML'))
		    }
		    return el.template = ret.reverse().join('')
		}

		//用于创建适配某一种标签的正则表达式
		var openStr = '(?:\\s+[^>=]*?(?:=[^>]+?)?)*>'
		var tagCache = {}// 缓存所有匹配开标签闭标签的正则
		var rchar = /./g
		var regArgs = avalon.msie < 9 ? 'ig' : 'g'//IE6-8，标签名都是大写
		function clipOuterHTML(matchText, type) {
		    var opens = []
		    var closes = []
		    var ropen = tagCache[type + 'open'] ||
		            (tagCache[type + 'open'] = new RegExp('<' + type + openStr, regArgs))
		    var rclose = tagCache[type + 'close'] ||
		            (tagCache[type + 'close'] = new RegExp('<\/' + type + '>', regArgs))

		    /* jshint ignore:start */
		    matchText.replace(ropen, function (_, b) {
		        //注意,页面有时很长,b的数值就很大,如
		        //000000000<000000011>000000041<000000066>000000096<000000107>
		        opens.push(('0000000000' + b + '<').slice(-10))//取得所有开标签的位置
		        return _.replace(rchar, '1')
		    }).replace(rclose, function (_, b) {
		        closes.push(('0000000000' + b + '>').slice(-10))//取得所有闭标签的位置               
		    })

		    /* jshint ignore:end */
		    //<div><div>01</div><div>02</div></div><div>222</div><div>333</div>
		    //会变成000<005<012>018<025>031>037<045>051<059>
		    //再变成<<><>><><>
		    //最后获取正确的>的索引值,这里为<<><>>的最后一个字符,
		    var pos = opens.concat(closes).sort()
		    var gtlt = pos.join('').replace(rnumber, '')
		    var k = 0, last = 0

		    for (var i = 0, n = gtlt.length; i < n; i++) {
		        var c = gtlt.charAt(i)
		        if (c === '<') {
		            k += 1
		        } else {
		            k -= 1
		        }
		        if (k === 0) {
		            last = i
		            break
		        }
		    }
		    var findex = parseFloat(pos[last]) + type.length + 3 // (</>为三个字符)
		    return  matchText.slice(0, findex) //取得正确的outerHTML
		}


		function modifyProps(node, innerHTML, nodes, curDeep, maxDeep) {
		    var type = node.type
		    if ('ms-skip' in node.props) {
		        node.skipContent = true
		    } else {
		        switch (type) {
		            case 'style':
		            case 'script':
		            case 'noscript':
		            case 'template':
		            case 'textarea':
		                node.skipContent = true
		                if (type === 'textarea') {
		                    node.props.type = 'textarea'
		                }
		                break
		            case 'input':
		                if (!node.props.type) {
		                    node.props.type = 'text'
		                }
		                break
		           case 'select':
		                if(node.props.hasOwnProperty('multiple')){
		                   node.props.multiple = 'multiple' 
		                   node.multiple = true
		                }
		                break
		            case 'xmp':
		                node.children.push(new VText(node.template))
		                break
		            case 'option':
		                node.children.push(new VText(trimHTML(node.template)))
		                break
		        }
		        if (!node.isVoidTag) {
		            var childs = lexer(innerHTML, curDeep, maxDeep)
		            node.children = childs
		            if (type === 'table') {
		                addTbody(node.children)
		            }
		        }
		        var forExpr = node.props['ms-for']
		        if (forExpr) {
		            var cb = node.props['data-for-rendered']
		            var cid = cb+':cb'
		            delete node.props['ms-for']
		            nodes.push({
		                nodeType: 8,
		                type: '#comment',
		                nodeValue: 'ms-for:' + forExpr,
		                signature: makeHashCode('for'),
		                cid: cid,
		                template: avalon.vdomAdaptor(node, 'toHTML')
		            })
		            
		            if(cb && !avalon.caches[cid]){
		                avalon.caches[cid] = Function('return '+ avalon.parseExpr(cb, 'on'))()  
		            }
		           
		            nodes.push(node)
		            return {
		                nodeType: 8,
		                skipContent: true,
		                type: '#comment',
		                nodeValue: 'ms-for-end:'
		            }
		        }
		    }
		    return node
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
		                    template: '',
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


		var ramp = /&amp;/g
		var rnowhite = /\S+/g
		var rquote = /&quot;/g
		var rnogutter = /\s*=\s*/g
		function handleProps(str, props) {
		    str.replace(rnogutter, '=').replace(rnowhite, function (el) {
		        var arr = el.split('='), value = arr[1] || '',
		                name = arr[0].toLowerCase()
		        if (arr.length === 2) {
		            if (value.indexOf('??') === 0) {
		                value = value.replace(rfill, fill).
		                        slice(1, -1).
		                        replace(ramp, '&').
		                        replace(rquote, '"')
		            }
		        }
		        props[name] = value
		    })
		}

		//form prototype.js
		var rtrimHTML = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi
		function trimHTML(v) {
		    return String(v).replace(rtrimHTML, '').trim()
		}


		module.exports = lexer

	/***/ },
	/* 74 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * ------------------------------------------------------------
		 * diff 对比新旧两个虚拟DOM树,根据directive中的diff方法为新虚拟DOM树
		 * 添加change, afterChange更新钩子
		 * ------------------------------------------------------------
		 */
		var emptyArr = []
		// 防止被引用
		var emptyObj = function() {
		    return {
		        children: [], props: {}
		    }
		}
		var directives = avalon.directives
		var rbinding = __webpack_require__(45).binding

		function diff(current, previous, steps) {
		    if (!current)
		        return
		    for (var i = 0; i < current.length; i++) {
		        var cur = current[i]
		        var pre = previous[i] || emptyObj()
		        switch (cur.nodeType) {
		            case 3:
		                if (!cur.skipContent) {
		                    directives.expr.diff(cur, pre, steps)
		                }
		                break
		            case 8:
		                if (cur.directive === 'for' ) {
		                    var forDiff = directives['for'].diff(current, previous, steps, i)
		                    if(typeof forDiff === 'number'){
		                        i = forDiff
		                    }
		                } else if (cur.directive ) {//if widget
		                    directives[cur.directive].diff(cur, pre, steps)
		                }
		                break
		            default:
		                if (!cur.skipAttrs) {
		                    diffProps(cur, pre, steps)
		                }
		                if (!cur.skipContent) {
		                    diff(cur.children, pre.children || emptyArr, steps)
		                }
		                break
		        }
		    }
		}

		function diffProps(current, previous, steps) {
		    if (current.order) {
		        var directiveType
		        try {
		            current.order.replace(/([^;]+)/g, function (name) {
		                var match = name.match(rbinding)
		                var type = match && match[1]
		                directiveType = type
		                if (directives[type]) {
		                    directives[type].diff(current, previous || emptyObj(), steps, name)
		                }
		                return name
		            })
		        } catch (e) {
		            avalon.log(directiveType, e, e.message,'diffProps error')
		        }
		    }
		    

		}
		avalon.diffProps = diffProps
		module.exports = diff


	/***/ },
	/* 75 */
	/***/ function(module, exports, __webpack_require__) {

		
		/**
		 * ------------------------------------------------------------
		 * batch 同时对N个视图进行全量更新
		 * ------------------------------------------------------------
		 */

		var patch = __webpack_require__(66)


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
		    if (!scope || !document.nodeName) {
		        return renderingID = null
		    }
		    
		    var dom = scope.dom
		    var steps = {count: 0}
		    var vtree = scope.render(scope.synth || scope.vmodel, scope.local)

		    avalon.diff(vtree, dom.vtree || [], steps)
		    patch([dom], vtree, null, steps)
		    steps.count = 0
		    dom.vtree = vtree
		    
		    renderingID = null

		    var index = needRenderIds.indexOf(id)
		    if (index > -1) {
		        var removed = needRenderIds.splice(index, 1)
		        return batchUpdate(removed[0])
		    }
		    
		    var id = needRenderIds.shift()
		    if (id) {
		        batchUpdate(id)
		    }
		}



		module.exports = avalon.batch = batchUpdate


	/***/ },
	/* 76 */,
	/* 77 */
	/***/ function(module, exports) {

		/**
		 * 
		$$skipArray:是系统级通用的不可监听属性
		$skipArray: 是当前对象特有的不可监听属性

		 不同点是
		 $$skipArray被hasOwnProperty后返回false
		 $skipArray被hasOwnProperty后返回true
		 */

		module.exports = avalon.oneObject('$id,$render,$track,$element,$watch,$fire,$events,$model,$skipArray,$accessors,$hashcode,__proxy__,__data__,__const__')

	/***/ },
	/* 78 */,
	/* 79 */,
	/* 80 */
	/***/ function(module, exports, __webpack_require__) {

		
		var $$midway = {}
		var $$skipArray = __webpack_require__(77)
		var dispatch = __webpack_require__(81)
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


		function isSkip(key, value, skipArray) {
		    // 判定此属性能否转换访问器
		    return key.charAt(0) === '$' ||
		            skipArray[key] ||
		            (typeof value === 'function') ||
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
		            if (val && typeof val === 'object') {
		                val = $$midway.modelAdaptor(val, old, heirloom, {
		                    pathname: spath,
		                    id: sid
		                })
		            }
		            var older = old
		            old = val

		            var vm = heirloom.__vmodel__
		            if (this.$hashcode && vm && !avalon.suspendUpdate) {
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

		                avalon.rerenderStart = new Date
		                var dotIndex = vm.$id.indexOf('.')
		                if (dotIndex > 0) {
		                    avalon.batch(vm.$id.slice(0, dotIndex), true)
		                } else {
		                    avalon.batch(vm.$id, true)
		                }

		            }
		        },
		        enumerable: true,
		        configurable: true
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
		        throw Error('error:['+ $id+ '] had defined!')
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
		                if (!d && !avalon.suspendUpdate) {
		                    avalon.rerenderStart = new Date
		                    avalon.batch(vm.$id, true)
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
	/* 81 */
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
	/* 82 */,
	/* 83 */,
	/* 84 */
	/***/ function(module, exports, __webpack_require__) {

		
		var avalon = __webpack_require__(3)
		var browser = __webpack_require__(4)

		avalon.shadowCopy(avalon, browser)

		__webpack_require__(85)
		__webpack_require__(6)
		__webpack_require__(7)

		module.exports = avalon

	/***/ },
	/* 85 */
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
	/* 86 */
	/***/ function(module, exports, __webpack_require__) {

		
		/*********************************************************************
		 *                          DOM Api                                 *
		 *           shim,class,data,css,val,html,event,ready               *
		 **********************************************************************/

		__webpack_require__(87)
		__webpack_require__(88)
		__webpack_require__(89)
		__webpack_require__(90)
		__webpack_require__(91)
		__webpack_require__(92)
		__webpack_require__(93)
		__webpack_require__(94)

		module.exports = avalon


	/***/ },
	/* 87 */
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
		function outerHTML() {
		    return new XMLSerializer().serializeToString(this)
		}


		var svgns = 'http://www.w3.org/2000/svg'
		var svg = avalon.document.createElementNS(svgns, 'svg')

		svg.innerHTML = '<circle fill="red" />'
		//IE9-11,firefox,ios7,8的chrome不支持SVG元素的innerHTML,outerHTML属性
		if (!/^\[object SVG\w*Element\]$/.test(svg.firstChild)) {
		    function createSVG(node, parent) {
		        /* jshint ignore:start */
		        if (node && node.childNodes) {
		            var nodes = node.childNodes
		            for (var i = 0, el; el = nodes[i++]; ) {
		                if (el.nodeType === 1) {
		                    var svg = document.createElementNS(svgns, el.nodeName.toLowerCase())
		                    avalon.each(el.attributes, function (a, attr) {
		                        svg.setAttribute(attr.name, attr.value)
		                    })
		                    createSVG(el, svg)
		                    parent.appendChild(svg)
		                } else {
		                    parent.appendChild(el.cloneNode(true))
		                }
		            }
		        }
		        /* jshint ignore:end */
		    }
		    Object.defineProperties(SVGElement.prototype, {
		        outerHTML: {
		            configurable: true,
		            get: outerHTML,
		            set: function (html) {
		                var tagName = this.tagName.toLowerCase()
		                var parent = this.parent
		                var parsed = avalon.parseHTML(html)
		                if (tagName === 'svg') {
		                    parent.insertBefore(parsed, this)
		                } else {
		                    var empty = document.createDocumentFragment()
		                    createSVG(parsed, empty)
		                    parent.insertBefore(empty, this)
		                }
		                parent.removeChild(this)
		            }
		        },
		        innerHTML: {
		            configurable: true,
		            get: function () {
		                var s = this.outerHTML
		                var ropen = new RegExp('<' + this.nodeName + '\\b(?:(["\'])[^"]*?(\\1)|[^>])*>', 'i')
		                var rclose = new RegExp('<\/' + this.nodeName + '>$', 'i')
		                return s.replace(ropen, '').replace(rclose, '')
		            },
		            set: function (html) {
		                if (avalon.clearHTML) {
		                    avalon.clearHTML(this)
		                    var frag = avalon.parseHTML(html)
		                    createSVG(frag, this)
		                }
		            }
		        }
		    })
		}





	/***/ },
	/* 88 */
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
	/* 89 */
	/***/ function(module, exports, __webpack_require__) {

		var propMap = __webpack_require__(23)
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
	/* 90 */
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
		        offsetParent = offsetParent.offsetParent;
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
		        var hidden = [];
		        showHidden(node, hidden);
		        var val = cssHooks[method + ":get"](node)
		        for (var i = 0, obj; obj = hidden[i++]; ) {
		            node = obj.node
		            for (var n in obj) {
		                if (typeof obj[n] === "string") {
		                    node.style[n] = obj[n]
		                }
		            }
		        }
		        return val;
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
	/* 91 */
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
	/* 92 */
	/***/ function(module, exports, __webpack_require__) {

		var Cache = __webpack_require__(28)
		var fixScript = __webpack_require__(29)
		var tagHooks = new function () {// jshint ignore:line
		    avalon.shadowCopy(this, {
		        option: document.createElement('select'),
		        thead: document.createElement('table'),
		        td: document.createElement('tr'),
		        area: document.createElement('map'),
		        tr: document.createElement('tbody'),
		        col: document.createElement('colgroup'),
		        legend: document.createElement('fieldset'),
		        _default: document.createElement('div'),
		        'g': document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		    })
		    this.optgroup = this.option
		    this.tbody = this.tfoot = this.colgroup = this.caption = this.thead
		    this.th = this.td
		}// jshint ignore:line

		var svgHooks = {
		    g: tagHooks.g
		}
		String('circle,defs,ellipse,image,line,path,polygon,polyline,rect,symbol,text,use').replace(avalon.rword, function (tag) {
		    svgHooks[tag] = tagHooks.g //处理SVG
		})

		var rtagName = /<([\w:]+)/
		var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig

		var rhtml = /<|&#?\w+;/
		var htmlCache = new Cache(128)
		var templateHook = avalon.document.createElement('template')
		var templateHook
		if (!/HTMLTemplateElement/.test(templateHook)) {
		    templateHook = null
		    avalon.shadowCopy(tagHooks, svgHooks)
		}

		avalon.parseHTML = function (html) {
		    var fragment = avalon.avalonFragment.cloneNode(false), firstChild
		    if (typeof html !== 'string') {
		        return fragment
		    }
		    if (!rhtml.test(html)) {
		        fragment.appendChild(document.createTextNode(html))
		        return fragment
		    }
		    html = html.replace(rxhtml, '<$1></$2>').trim()
		    var hasCache = htmlCache.get(html)
		    if (hasCache) {
		        return hasCache.cloneNode(true)
		    }
		    var tag = (rtagName.exec(html) || ['', ''])[1].toLowerCase()
		    var wrapper = svgHooks[tag], firstChild
		    if (wrapper) {//svgHooks
		        wrapper.innerHTML = html
		    } else if (templateHook) {//templateHook
		        templateHook.innerHTML = html
		        wrapper = templateHook.content
		    } else {//tagHooks
		        wrapper = tagHooks[tag] || tagHooks._default
		        wrapper.innerHTML = html
		    }
		    //使用innerHTML生成的script节点不会发出请求与执行text属性
		    fixScript(wrapper)
		    if (templateHook) {
		        fragment = wrapper
		    } else {// 将wrapper上的节点转移到文档碎片上！
		        while (firstChild = wrapper.firstChild) {
		            fragment.appendChild(firstChild)
		        }
		    }
		    if (html.length < 1024) {
		        htmlCache.put(html, fragment.cloneNode(true))
		    }
		    return fragment
		}

		avalon.innerHTML = function (node, html) {
		    var a = this.parseHTML(html)
		    this.clearHTML(node).appendChild(a)
		}

		avalon.clearHTML = function (node) {
		    avalon.$$unbind(node)
		    node.textContent = ''
		    while (node.lastChild) {
		        node.removeChild(node.lastChild)
		    }
		    return node
		}

	/***/ },
	/* 93 */
	/***/ function(module, exports, __webpack_require__) {

		var document = avalon.document
		var window = avalon.window
		var root = avalon.root

		var getShortID = __webpack_require__(6).getShortID
		var canBubbleUp = __webpack_require__(33)

		var eventHooks = avalon.eventHooks
		/*绑定事件*/
		avalon.bind = function (elem, type, fn) {
		    if (elem.nodeType === 1) {
		        var value = elem.getAttribute('avalon-events') || ''
		        //如果是使用ms-on-*绑定的回调,其uuid格式为e12122324,
		        //如果是使用bind方法绑定的回调,其uuid格式为_12
		        var uuid = getShortID(fn)
		        var hook = eventHooks[type]
		        if(hook){
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
		        var keys = value.split('??')
		        if (keys[0] === '') {
		            keys.shift()
		        }
		        if (keys.indexOf(key) === -1) {
		            keys.push(key)
		            elem.setAttribute('avalon-events', keys.join('??'))
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
		                value = value.split('??').filter(function (str) {
		                    return str.indexOf(type + ':') === -1
		                }).join('??')

		                elem.setAttribute('avalon-events', value)
		                break
		            default:
		                var search = type + ':' + fn.uuid
		                value = value.split('??').filter(function (str) {
		                    return str !== search
		                }).join('??')
		                elem.setAttribute('avalon-events', value)
		                delete avalon.eventListeners[fn.uuid]
		                break
		        }
		    } else {
		        nativeUnBind(elem, type, fn)
		    }
		}

		var reventNames = /[^\s\?]+/g
		var last = Date.now()
		var typeRegExp = {}
		function collectHandlers(elem, type, handlers) {
		    var value = elem.getAttribute('avalon-events')
		    if (value && (elem.disabled !== true || type !== 'click')) {
		        var uuids = []
		        var reg = typeRegExp[type] || (typeRegExp[type] = new RegExp(type + '\\:([^?\s]+)', 'g'))
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

		var rhandleHasVm = /^e\d+/
		var rneedSmooth = /move|scroll/
		function dispatch(event) {
		    event = new avEvent(event)
		    var type = event.type
		    var elem = event.target
		    var handlers = []
		    collectHandlers(elem, type, handlers)
		    var i = 0, j, uuid, handler
		    while ((handler = handlers[i++]) && !event.cancelBubble) {
		        event.currentTarget = handler.elem
		        j = 0
		        while ((uuid = handler.uuids[ j++ ]) &&
		                !event.isImmediatePropagationStopped) {
		            var fn = avalon.eventListeners[uuid]
		            if (fn) {
		                var vm = rhandleHasVm.test(uuid) ? handler.elem._ms_context_ : 0
		                if (vm && vm.$hashcode === false) {
		                    return avalon.unbind(elem, type, fn)
		                }
		                if (rneedSmooth.test(type)) {
		                    var curr = +new Date()
		                    if (curr - last > 16) {
		                        var ret = fn.call(vm || elem, event)
		                        last = curr
		                    }
		                } else {
		                    ret = fn.call(vm || elem, event)
		                }
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
		        var arr = value.match(reventNames) || []
		        arr.push(type)
		        root.setAttribute('delegate-events', arr.join('??'))
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
		        var e = this.originalEvent;
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
		    var hackEvent = document.createEvent('Events');
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
	/* 94 */
	/***/ function(module, exports, __webpack_require__) {

		var scan = __webpack_require__(35)
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
	/* 95 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(37)
		__webpack_require__(39)
		//处理属性样式
		__webpack_require__(96)
		__webpack_require__(41)
		__webpack_require__(42)
		//处理内容
		__webpack_require__(97)
		__webpack_require__(44)
		__webpack_require__(46)
		//需要用到事件的
		__webpack_require__(53)
		__webpack_require__(54)
		__webpack_require__(98)
		__webpack_require__(63)
		__webpack_require__(64)

		//处理逻辑
		__webpack_require__(65)
		__webpack_require__(67)

		__webpack_require__(101)
		__webpack_require__(70)

	/***/ },
	/* 96 */
	/***/ function(module, exports, __webpack_require__) {

		
		var attrUpdate = __webpack_require__(89)
		var update = __webpack_require__(38)

		avalon.directive('attr', {
		    diff: function (cur, pre, steps, name) {
		        var a = cur[name]
		        var p = pre[name]
		        if (Object(a) === a) {
		            if (Array.isArray(a)) {
		                a = cur[name] = avalon.mix.apply({}, a)
		            }
		            if (typeof p !== 'object') {
		                cur.changeAttr = a
		            } else {
		                var patch = {}
		                var hasChange = false
		                for (var i in a) {
		                    if (a[i] !== p[i]) {
		                        hasChange = true
		                        patch[i] = a[i]
		                    }
		                }
		                if (hasChange) {
		                    cur.changeAttr = patch
		                    steps.count += 1
		                }
		            }
		            if (cur.changeAttr) {
		                update(cur, attrUpdate, steps, 'attr' )
		            }
		        } else {
		            cur[name] = p
		        }
		    },
		    //dom, vnode
		    update: attrUpdate
		})



	/***/ },
	/* 97 */
	/***/ function(module, exports, __webpack_require__) {

		var update = __webpack_require__(38)

		avalon.directive('expr', {
		    parse: function () {
		    },
		    diff: function (cur, pre, steps) {
		        if (cur.nodeValue !== pre.nodeValue) {
		            update(cur, this.update, steps, 'expr' )
		        }
		    },
		    update: function (node, vnode, parent) {
		        if (node.nodeType !== 3) {
		            var textNode = document.createTextNode(vnode.nodeValue)
		            parent.replaceChild(textNode, node)
		        } else {
		            node.nodeValue = vnode.nodeValue
		        }
		    }
		})

	/***/ },
	/* 98 */
	/***/ function(module, exports, __webpack_require__) {

		
		var update = __webpack_require__(38)
		var evaluatorPool = __webpack_require__(49)
		var stringify = __webpack_require__(52)

		var rchangeFilter = /\|\s*change\b/
		var rcheckedType = /^(?:checkbox|radio)$/
		var rdebounceFilter = /\|\s*debounce(?:\(([^)]+)\))?/
		var genVirtualSelectChildren = __webpack_require__(56)
		var updateModelByEvent = __webpack_require__(99)
		var updateModelByValue = __webpack_require__(60)
		var updateModel = __webpack_require__(58)
		var updateView = __webpack_require__(100)
		var addValidateField = __webpack_require__(62)


		avalon.directive('duplex', {
		    priority: 2000,
		    parse: function (cur, pre, binding) {
		        var expr = binding.expr
		        var etype = pre.props.type
		        //处理数据转换器
		        var parser = binding.param, dtype
		        var isChecked = false
		         parser = parser ?
		            '[' + parser.split('-').map(function(a){
		                if(a === 'checked'){
		                    isChecked = true
		                }
		                return avalon.quote(a)
		            }) + ']': '[]'
		       
		        if (rcheckedType.test(etype) && isChecked) {
		            //如果是radio, checkbox,判定用户使用了checked格式函数没有
		            parser = '[]'
		            dtype = 'radio'
		        }

		        if (!/input|textarea|select/.test(pre.type)) {
		            if ('contenteditable' in pre.props) {
		                dtype = 'contenteditable'
		            }
		        } else if (!dtype) {
		            dtype = pre.type === 'select' ? 'select' :
		                    etype === 'checkbox' ? 'checkbox' :
		                    etype === 'radio' ? 'radio' :
		                    'input'
		        }
		        var isChanged = false, debounceTime = 0
		        //判定是否使用了 change debounce 过滤器
		        if (dtype === 'input' || dtype === 'contenteditable') {
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

		        cur.vmodel = '__vmodel__'
		        cur.modelValue = '('+avalon.parseExpr(binding, 'duplex')+')(__vmodel__)'// 输出原始数据
		        cur.duplexSetter = evaluatorPool.get('duplex:set:' + expr)
		        var format = evaluatorPool.get('duplex:format:' + expr)
		        var changed = cur.props['data-duplex-changed']
		        cur.callback = changed ? avalon.parseExpr(changed,'on'):'avalon.noop'
		        cur.duplexFormat = format || 'function(vm, a){return a}'
		        cur.duplexData = stringify({
		            type: dtype, //这个决定绑定什么事件
		            isChecked: isChecked,
		            isChanged: isChanged, //这个决定同步的频数
		            parser: parser, //用于转换原始的视图数据
		            callback: changed ? avalon.parseExpr(binding, 'on') : 'avalon.noop',
		            debounceTime: debounceTime, //这个决定同步的频数
		            vmodel: '__vmodel__'
		        })

		    },
		    diff: function (cur, pre, steps) {
		        var curValue = cur.modelValue
		        var preValue = pre.modelValue
		        var viewValue = cur.duplexFormat(cur.vmodel, curValue)
		        
		        if (String(viewValue) !==
		                String(cur.duplexFormat(cur.vmodel, preValue))) {
		            cur.viewValue = viewValue
		            
		            if (cur.type === 'select' && !cur.children.length) {
		                avalon.Array.merge(cur.children, avalon.lexer(cur.template, 0, 2))
		                genVirtualSelectChildren(cur, viewValue)
		            }
		            update(cur, this.update, steps, 'duplex', 'afterChange')
		        }
		    },
		    update: function (node, vnode) {

		        if (node && node.nodeType === 1) {
		            if (!node.getAttribute('duplex-inited')) {
		                node.__ms_duplex__ = vnode.duplexData
		                node.setAttribute('duplex-inited', 'true')
		                updateModelByEvent(node, vnode)
		            }
		            var data = node.__ms_duplex__
		            data.format = vnode.duplexFormat
		            data.set = vnode.duplexSetter
		            data.parse = parseValue
		            data.element = node
		            data.callback = vnode.callback
		            addValidateField(node, vnode)
		            if (!avalon.msie && updateModelByValue === false && !node.valueHijack) {
		                //chrome 42及以下版本需要这个hack
		             
		                node.valueHijack = updateModel
		                var intervalID = setInterval(function () {
		                    if (!avalon.contains(avalon.root, node)) {
		                        clearInterval(intervalID)
		                    } else {
		                        node.valueHijack()
		                    }
		                }, 30)
		            }
		         
		 
		            if (data.viewValue !== vnode.viewValue) {
		                data.modelValue = vnode.modelValue //原始数据
		                if(!Array.isArray(vnode.modelValue)){
		                    var parsedValue = data.parse( vnode.viewValue)
		                    if(parsedValue !== data.modelValue){
		                        data.set(data.vmodel, parsedValue)
		                    }
		                }
		                
		                                
		                data.viewValue = vnode.viewValue  //被过滤器处理的数据
		                data.element = node
		                updateView[data.type].call(data)
		                if (node.caret) {
		                    var pos = data.caretPos
		                    pos && data.setCaret(node, pos.start, pos.end)
		                    data.caretPos = null
		                }
		            }
		        }

		    }
		})

		function parseValue( val) {
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
	/* 99 */
	/***/ function(module, exports, __webpack_require__) {

		/* 
		 * 通过绑定事件同步vmodel
		 * 总共有三种方式同步视图
		 * 1. 各种事件 input, change, click, propertychange, keydown...
		 * 2. value属性重写
		 * 3. 定时器轮询
		 */
		var updateModel = __webpack_require__(58)
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
		            if (vnode.props.type === 'radio') {
		                events.click = updateModel
		            } else {
		                events.change = updateModel
		            }
		            break
		        case 'checkbox':
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
		                if (!avalon.msie) {
		                    //https://github.com/RubyLouvre/avalon/issues/1368#issuecomment-220503284
		                    events.compositionstart = openComposition
		                    events.compositionend = closeComposition
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


		function updateModelHack(e) {
		    if (e.propertyName === 'value') {
		        updateModel.call(this, e)
		    }
		}

		function updateModelDelay(e) {
		    var elem = this
		    setTimeout(function () {
		        updateModel.call(elem, e)
		    }, 17)
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
		}


		markID(openCaret)
		markID(closeCaret)
		markID(openComposition)
		markID(closeComposition)
		markID(updateModel)


		function getCaret(field) {
		    var start = NaN, end = NaN
		    if (field.setSelectionRange) {
		        start = field.selectionStart
		        end = field.selectionEnd
		    }
		    return {
		        start: start,
		        end: end
		    }
		}

		function setCaret(field, begin, end) {
		    if (!field.value || field.readOnly)
		        return
		    field.selectionStart = begin
		    field.selectionEnd = end
		}


		module.exports = updateModelByEvent

	/***/ },
	/* 100 */
	/***/ function(module, exports) {

		
		var updateView = {
		    input: function () {//处理单个value值处理
		        this.element.value = this.viewValue
		    },
		    radio: function () {//处理单个checked属性
		        var checked
		        if (this.isChecked) {
		            checked = !!this.viewValue
		        } else {
		            checked = this.viewValue + '' === this.element.value
		        }
		        var element = this.element

		        element.checked = checked

		    },
		    checkbox: function () {//处理多个checked属性
		        var checked = false
		        var element = this.element
		        var value = element.value
		        for (var i = 0; i < this.modelValue.length; i++) {
		            var el = this.modelValue[i]
		            if (el + '' === value) {
		                checked = true
		            }
		        }
		        element.checked = checked
		    },
		    select: function () {//处理子级的selected属性
		        var a = Array.isArray(this.viewValue) ?
		                this.viewValue.map(String) : this.viewValue + ''
		        avalon(this.element).val(a)
		    },
		    contenteditable: function () {//处理单个innerHTML
		        this.element.innerHTML = this.viewValue
		        this.update.call(this.element)
		    }
		}

		module.exports = updateView


	/***/ },
	/* 101 */
	/***/ function(module, exports, __webpack_require__) {

		var disposeDetectStrategy = __webpack_require__(102)
		var patch = __webpack_require__(66)
		var update = __webpack_require__(38)

		//插入点机制,组件的模板中有一些slot元素,用于等待被外面的元素替代
		var dir = avalon.directive('widget', {
		    priority: 4,
		    parse: function (cur, pre, binding) {

		        var wid = pre.props.wid || avalon.makeHashCode('w')

		        cur.wid = avalon.quote(wid)
		        cur.directive = 'widget'
		        cur.template = pre.template
		        cur.children = '[]'
		        cur[binding.name] = avalon.parseExpr(binding)

		        var old = pre.$append || ''
		        pre.$append = [
		            'var il1492 = vnodes.length - 1',
		            'var el1492 = vnodes[il1492]',
		            'if(el1492.nodeType === 1){',
		            'el1492.local = __local__',
		            'el1492.vmodel = __vmodel__',
		            'avalon.component(el1492, vnodes, il1492,' + cur.wid + ')',
		            '}'
		        ].join('\n ') + old
		    },
		    define: function () {
		        return avalon.mediatorFactory.apply(this, arguments)
		    },
		    diff: function (cur, pre, steps) {
		        var wid = cur.wid
		        var scope = avalon.scopes[wid]
		        if (cur.nodeType === 8) {
		            steps.count += 1
		            cur.change = [this.replaceByComment]
		        } else if (scope && scope.renderCount === 1) {
		            //https://github.com/RubyLouvre/avalon/issues/1390
		            //当第一次渲染组件时,当组件的儿子为元素,而xmp容器里面只有文本时,就会出错
		            scope.vmodel.$fire('onInit', {
		                type: 'init',
		                vmodel: scope.vmodel,
		                wid: wid,
		                componentName: scope.componentName
		            })
		            scope.renderCount = 2
		            pre.children = []
		            cur.steps = steps
		            fixRepeatAction(cur.children)
		            update(cur, this.replaceByComponent, steps, 'widget')
		            function fireReady(dom, vnode) {
		                cur.vmodel.$fire('onReady', {
		                    type: 'ready',
		                    target: dom,
		                    wid: wid,
		                    vmodel: vnode.vmodel
		                })

		            }

		            update(cur, fireReady, steps, 'widget', 'afterChange')
		        } else {
		            scope.renderCount++
		            var needUpdate = !cur.diff || cur.diff(cur, pre, steps)
		            cur.skipContent = !needUpdate
		            if (pre.wid && cur.wid !== pre.wid && !pre.props.cached ) {

		                delete avalon.scopes[pre.wid]
		                delete avalon.vmodels[pre.wid]
		            }

		            var viewChangeObservers = cur.vmodel.$events.onViewChange
		            if (viewChangeObservers && viewChangeObservers.length) {
		                steps.count += 1
		                cur.afterChange = [function (dom, vnode) {
		                        var preHTML = pre.outerHTML
		                        var curHTML = cur.outerHTML ||
		                                (cur.outerHTML = avalon.vdomAdaptor(cur, 'toHTML'))
		                        if (preHTML !== curHTML) {
		                            cur.vmodel.$fire('onViewChange', {
		                                type: 'viewchange',
		                                target: dom,
		                                wid: wid,
		                                vmodel: vnode.vmodel
		                            })
		                        }
		                    }]
		            }

		        }
		    },
		    addDisposeMonitor: function (dom) {

		        disposeDetectStrategy.byRewritePrototype(dom)

		    },
		    replaceByComment: function (dom, node, parent) {
		        var comment = document.createComment(node.nodeValue)
		        if (dom) {
		            parent.replaceChild(comment, dom)
		        } else {
		            parent.appendChild(comment)
		        }
		    },
		    replaceByComponent: function (dom, vdom, parent) {

		        var com = avalon.vdomAdaptor(vdom, 'toDOM')
		        vdom.ouerHTML = avalon.vdomAdaptor(vdom, 'toHTML')

		        if (dom) {
		            parent.replaceChild(com, dom)
		        } else {
		            parent.appendChild(com)
		        }

		        patch([com], [vdom], parent, vdom.steps)

		        var vm = vdom.vmodel
		        var scope = avalon.scopes[vm.$id]

		        scope.dom = com
		        vm.$element = com
		        com.vtree = [vdom]

		        dir.addDisposeMonitor(com)

		        return false
		    }
		})

		function fixRepeatAction(nodes) {
		    for (var i = 0, el; el = nodes[i++]; ) {
		        if (el.directive === 'for') {
		            el.fixAction = true
		        }
		        if (el.children) {
		            fixRepeatAction(el.children)
		        }
		    }
		}


	/***/ },
	/* 102 */
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



		module.exports = {
		    byRewritePrototype: byRewritePrototype
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
		            vm.$element = null
		            vm.$hashcode = false
		            delete docker.vmodel
		            delete docker.dom
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


	/***/ },
	/* 103 */
	/***/ function(module, exports, __webpack_require__) {

		
		var VText = __webpack_require__(16)
		var parseView = __webpack_require__(47)
		var skipArray = __webpack_require__(77)

		var componentContainers = {wbr: 1, xmp: 1, template: 1}
		var events = 'onInit,onReady,onViewChange,onDispose'
		var componentEvents = avalon.oneObject(events)
		var protected = events.split(',').concat('is', 'diff', 'define')

		var unresolvedComponent = {
		    nodeType: 8,
		    type: "#comment",
		    directive: 'widget',
		    nodeValue: 'unresolved component placeholder'
		}
		function isEmptyOption(a, b) {
		    if (!a)
		        return true
		    var tmpl = avalon.mix(b || {}, a)
		    for (var ii in tmpl) {
		        if(ii === 'is' || ii === '$id')
		            continue
		        return false
		    }
		    return true
		}
		avalon.component = function (name, definition) {
		    //这是定义组件的分支,并将列队中的同类型对象移除
		    if (arguments.length < 4) {
		        if (!avalon.components[name]) {
		            avalon.components[name] = definition
		        }//这里没有返回值
		    } else {
		        var root = arguments[0]
		        var nodes = arguments[1]
		        var index = arguments[2]
		        var wid = arguments[3]
		        var topVm = root.vmodel
		        var finalOptions = {}
		        if (!isEmptyOption(root['ms-widget'],finalOptions)) {
		            var options = [].concat(root['ms-widget'] || [])
		            options.forEach(function (option, index) {
		                //收集里面的事件
		                mixinHooks(finalOptions, option, index)
		            })
		            var isEmpty = isEmptyOption(finalOptions)
		        } else {
		            isEmpty = true
		        }

		        //得到组件的is类型
		        var componentName = root.type.indexOf('-') > 0 ?
		                root.type : finalOptions.is
		        if (!avalon.components[componentName]) {
		            return nodes[index] = unresolvedComponent
		        }


		        //得到组件在顶层vm的配置对象名
		        var configName = componentName.replace(/-/g, '_')
		        if (topVm.hasOwnProperty(configName) &&
		                typeof topVm[configName] === 'object') {
		            //如果定义了,那么全部舍弃
		            finalOptions = {}
		            options = [topVm[configName]]
		            mixinHooks(finalOptions, topVm[configName], 0)
		            protected = [configName].concat(protected)
		        }

		        var docker = avalon.scopes[finalOptions.$id] || avalon.scopes[wid]
		        if (docker && docker.dom) {
		          //  var ret = isEmpty ? docker.dom.vtree :
		              var ret = docker.render(docker.vmodel, docker.local)
		            if (ret[0]) {
		                return replaceByComponent(ret[0], docker.vmodel, nodes, index)
		            }
		        }


		        var type = root.type
		        //判定用户传入的标签名是否符合规格
		        if (!componentContainers[type] && !isCustomTag(type)) {
		            avalon.warn(type + '不合适做组件的标签')
		        }

		        //将用户声明组件用的自定义标签(或xmp.template)的template转换成虚拟DOM
		        if (type === 'xmp' || type === 'template' || root.children.length === 0) {
		            root.children = avalon.lexer(root.template)
		        }

		        //对于IE6-8,需要对自定义标签进行hack
		        definition = avalon.components[componentName]

		        //开始构建组件的vm的配置对象
		        var diff = finalOptions.diff
		        var define = finalOptions.define
		        define = define || avalon.directives.widget.define

		        var $id = finalOptions.$id || wid

		        var defaults = avalon.mix(true, {}, definition.defaults)
		        mixinHooks(finalOptions, defaults, false)
		        defineArgs = [topVm, defaults].concat(options)

		        var vmodel = define.apply(function (a, b) {
		            protected.forEach(function (k) {
		                delete a[k]
		                delete b[k]
		            })
		        }, defineArgs)

		        vmodel.$id = $id
		        //开始构建组件的虚拟DOM
		        var finalTemplate = definition.template.trim()
		        if (typeof definition.getTemplate === 'function') {
		            finalTemplate = definition.getTemplate(vmodel, finalTemplate)
		        }
		        //对组件内置的template转换成虚拟DOM
		        var vtree = avalon.lexer(finalTemplate)
		        if (vtree.length > 1) {
		            avalon.error('组件必须用一个元素包起来')
		        }

		        var componentRoot = vtree[0]

		        avalon.vmodels[$id] = vmodel

		        //将用户标签中的属性合并到组件标签的属性里
		        avalon.mix(componentRoot.props, root.props)
		        //  必须指定wid
		        componentRoot.props.wid = $id
		        //抽取用户标签里带slot属性的元素,替换组件的虚拟DOM树中的slot元素

		        //抽取用户标签里带slot属性的元素,替换组件的虚拟DOM树中的slot元素
		        if (definition.soleSlot) {
		            var slots = {}
		            var slotName = definition.soleSlot
		            slots[slotName] = /\S/.test(root.template) ? root.children :
		                    new VText('{{@' + slotName + '}}')
		            mergeTempale(vtree, slots)
		        } else if (!root.isVoidTag) {
		            insertSlots(vtree, root, definition.soleSlot)
		        }
		        for (var e in componentEvents) {
		            if (finalOptions[e]) {
		                finalOptions[e].forEach(function (fn) {
		                    vmodel.$watch(e, fn)
		                })
		            }
		        }
		        
		        // 必须加这个,方便在parseView.js开挂
		        vtree[0].directive = 'widget'
		        var render = avalon.render(vtree, root.local)

		        vmodel.$render = render
		        try {
		            var ret = render(vmodel, root.local)
		        } catch (e) {
		            ret = [unresolvedComponent]
		        }
		        var vdom = ret[0]
		        vdom.diff = diff
		        replaceByComponent(vdom, vmodel, nodes, index, componentName)

		    }
		}

		function replaceByComponent(vdom, vm, vnodes, index, componentName) {

		    if (!isComponentReady(vdom)) {
		        return vnodes[index] = unresolvedComponent
		    }

		    var wid = vm.$id
		    var scope = avalon.scopes[wid]

		    if (scope && scope.dom) {
		        scope.dom.vtree = [vdom]
		    } else {
		        var scope = {
		            componentName: componentName,
		            vmodel: vm,
		            render: vm.$render,
		            local: vdom.local,
		            renderCount: 1
		        }
		        avalon.scopes[wid] = scope
		    }
		    vnodes[index] = vdom

		}
		//必须以字母开头,结尾以字母或数字结束,中间至少出现一次"-",
		//并且不能大写字母,特殊符号,"_","$",汉字
		var rcustomTag = /^[a-z]([a-z\d]+\-)+[a-z\d]+$/

		function isCustomTag(type) {
		    return rcustomTag.test(type)
		}

		function mixinHooks(target, option, index) {
		    for (var k in option) {
		        if (!option.hasOwnProperty(k))
		            continue
		        var v = option[k]
		        if (componentEvents[k]) {
		            if (k in target) {
		                target[k].push(v)
		            } else {
		                target[k] = [option[k]]
		            }
		        } else if (isFinite(index)) {
		            target[k] = v
		        }
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
		            if (el === unresolvedComponent) {
		                throw 'unresolved'
		            }
		        } else if (el.children) {
		            hasUnresolvedComponent(el)
		        }
		    })
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
		                    var s = slots[name]
		                    vtree.splice.apply(vtree, [i - 1, 1].concat(s))
		                    if (s.length === 1 && s[0].nodeType === 3) {
		                        removeEmptyText(vtree)
		                    }
		                }
		            } else {
		                mergeTempale(node.children, slots)
		            }
		        }
		    }

		    return vtree
		}

		function removeEmptyText(nodes) {
		    //如果定义组件时,slot元素两旁有大片空白,且slot元素又是被一个文本节点替代时,需要合并这三个文本节点
		    for (var i = 0, el; el = nodes[i]; i++) {
		        if (el.skipContent === false && el.nodeType === 3) {
		            var pre = nodes[i - 1]
		            var next = nodes[i + 1]
		            if (pre && pre.nodeType === 3 && !/\S/.test(pre.nodeValue)) {
		                avalon.Array.remove(nodes, pre)
		                --i
		            }
		            if (next && next.nodeType === 3 && !/\S/.test(next.nodeValue)) {
		                avalon.Array.remove(nodes, next)
		            }
		        }
		    }
		}


	/***/ },
	/* 104 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * ------------------------------------------------------------
		 * avalon基于纯净的Object.defineProperties的vm工厂 
		 * masterFactory,slaveFactory,mediatorFactory, ArrayFactory
		 * ------------------------------------------------------------
		 */
		var share = __webpack_require__(105)
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
	/* 105 */
	/***/ function(module, exports, __webpack_require__) {

		var share = __webpack_require__(80)
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
		        hideProperty($vmodel, '$element', null)
		        hideProperty($vmodel, '$render', 0)
		        initEvents($vmodel, heirloom)
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


	/***/ }
	/******/ ])
	});
	;

/***/ },

/***/ 108:
/***/ function(module, exports) {

	//var avalon = require('avalon')

	avalon.component('ms-button', {
	    template: '<button type="button"><span><slot name="buttonText"></slot></span></button>',
	    defaults: {
	        buttonText: "button"
	    },
	    soleSlot: 'buttonText'
	})

/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	var button = __webpack_require__(108)
	var tmpl = __webpack_require__(110)

	avalon.component('ms-panel', {
	    template: tmpl,
	    defaults: {
	        body: "&nbsp;&nbsp;",
	        'ms_button': {
	            buttonText: 'click me!'
	        }
	    },
	    soleSlot: 'body'
	})

/***/ },

/***/ 110:
/***/ function(module, exports) {

	module.exports = "<div>\n    <div class=\"body\">\n        <slot name=\"body\"></slot>\n    </div>\n    <p><ms-button /></p>\n</div>"

/***/ }

/******/ })
});
;