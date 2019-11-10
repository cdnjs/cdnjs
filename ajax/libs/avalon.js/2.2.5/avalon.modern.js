/*!
built in 2017-3-28:16:0 version 2.2.4 by 司徒正美
https://github.com/RubyLouvre/avalon/tree/2.2.4

更改下载Promise的提示
修正IE下 orderBy BUG
修复ms-for在循环利用对象数组的元素时,旧有元素的指令没有进行刷新的BUG
修复effect内部传参 BUG
重构ms-validate的绑定事件的机制

*/;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.avalon = factory()
})(this, function () {
    'use strict'

    var win = typeof window === 'object' ? window : typeof global === 'object' ? global : {}

    var inBrowser = !!win.location && win.navigator
    /* istanbul ignore if  */

    var document$1 = inBrowser ? win.document : {
        createElement: Object,
        createElementNS: Object,
        documentElement: 'xx',
        contains: Boolean
    }
    var root = inBrowser ? document$1.documentElement : {
        outerHTML: 'x'
    }

    var versions = {
        objectobject: 7, //IE7-8
        objectundefined: 6, //IE6
        undefinedfunction: NaN, // other modern browsers
        undefinedobject: NaN }
    /* istanbul ignore next  */
    var msie = document$1.documentMode || versions[typeof document$1.all + typeof XMLHttpRequest]

    var modern = /NaN|undefined/.test(msie) || msie > 8

    /*
     https://github.com/rsms/js-lru
     entry             entry             entry             entry        
     ______            ______            ______            ______       
     | head |.newer => |      |.newer => |      |.newer => | tail |      
     |  A   |          |  B   |          |  C   |          |  D   |      
     |______| <= older.|______| <= older.|______| <= older.|______|      
     
     removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added 
     */
    function Cache(maxLength) {
        // 标识当前缓存数组的大小
        this.size = 0
        // 标识缓存数组能达到的最大长度
        this.limit = maxLength
        //  head（最不常用的项），tail（最常用的项）全部初始化为undefined

        this.head = this.tail = void 0
        this._keymap = {}
    }

    Cache.prototype = {
        put: function put(key, value) {
            var entry = {
                key: key,
                value: value
            }
            this._keymap[key] = entry
            if (this.tail) {
                // 如果存在tail（缓存数组的长度不为0），将tail指向新的 entry
                this.tail.newer = entry
                entry.older = this.tail
            } else {
                // 如果缓存数组的长度为0，将head指向新的entry
                this.head = entry
            }
            this.tail = entry
            // 如果缓存数组达到上限，则先删除 head 指向的缓存对象
            /* istanbul ignore if */
            if (this.size === this.limit) {
                this.shift()
            } else {
                this.size++
            }
            return value
        },
        shift: function shift() {
            /* istanbul ignore next */
            var entry = this.head
            /* istanbul ignore if */
            if (entry) {
                // 删除 head ，并改变指向
                this.head = this.head.newer
                // 同步更新 _keymap 里面的属性值
                this.head.older = entry.newer = entry.older = this._keymap[entry.key] = void 0
                delete this._keymap[entry.key] //#1029
                // 同步更新 缓存数组的长度
                this.size--
            }
        },
        get: function get(key) {
            var entry = this._keymap[key]
            // 如果查找不到含有`key`这个属性的缓存对象
            if (entry === void 0) return
            // 如果查找到的缓存对象已经是 tail (最近使用过的)
            /* istanbul ignore if */
            if (entry === this.tail) {
                return entry.value
            }
            // HEAD--------------TAIL
            //   <.older   .newer>
            //  <--- add direction --
            //   A  B  C  <D>  E
            if (entry.newer) {
                // 处理 newer 指向
                if (entry === this.head) {
                    // 如果查找到的缓存对象是 head (最近最少使用过的)
                    // 则将 head 指向原 head 的 newer 所指向的缓存对象
                    this.head = entry.newer
                }
                // 将所查找的缓存对象的下一级的 older 指向所查找的缓存对象的older所指向的值
                // 例如：A B C D E
                // 如果查找到的是D，那么将E指向C，不再指向D
                entry.newer.older = entry.older // C <-- E.
            }
            if (entry.older) {
                // 处理 older 指向
                // 如果查找到的是D，那么C指向E，不再指向D
                entry.older.newer = entry.newer // C. --> E
            }
            // 处理所查找到的对象的 newer 以及 older 指向
            entry.newer = void 0 // D --x
            // older指向之前使用过的变量，即D指向E
            entry.older = this.tail // D. --> E
            if (this.tail) {
                // 将E的newer指向D
                this.tail.newer = entry // E. <-- D
            }
            // 改变 tail 为D 
            this.tail = entry
            return entry.value
        }
    }

    var delayCompile = {}

    var directives = {}

    function directive(name, opts) {
        if (directives[name]) {
            avalon.warn(name, 'directive have defined! ')
        }
        directives[name] = opts
        if (!opts.update) {
            opts.update = function () {}
        }
        if (opts.delay) {
            delayCompile[name] = 1
        }
        return opts
    }

    function delayCompileNodes(dirs) {
        for (var i in delayCompile) {
            if ('ms-' + i in dirs) {
                return true
            }
        }
    }

    var window$1 = win
    function avalon$2(el) {
        return new avalon$2.init(el)
    }

    avalon$2.init = function (el) {
        this[0] = this.element = el
    }

    avalon$2.fn = avalon$2.prototype = avalon$2.init.prototype

    function shadowCopy(destination, source) {
        for (var property in source) {
            destination[property] = source[property]
        }
        return destination
    }
    var rword = /[^, ]+/g
    var rnowhite = /\S+/g //存在非空字符
    var platform = {} //用于放置平台差异的方法与属性


    function oneObject(array, val) {
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

    var op = Object.prototype
    function quote(str) {
        return avalon$2._quote(str)
    }
    var inspect = op.toString
    var ohasOwn = op.hasOwnProperty
    var ap = Array.prototype

    var hasConsole = typeof console === 'object'
    avalon$2.config = { debug: true }
    function log() {
        if (hasConsole && avalon$2.config.debug) {
            Function.apply.call(console.log, console, arguments)
        }
    }
    function warn() {
        if (hasConsole && avalon$2.config.debug) {
            var method = console.warn || console.log
            // http://qiang106.iteye.com/blog/1721425
            Function.apply.call(method, console, arguments)
        }
    }
    function error(str, e) {
        throw (e || Error)(str)
    }
    function noop() {}
    function isObject(a) {
        return a !== null && typeof a === 'object'
    }

    function range(start, end, step) {
        // 用于生成整数数组
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
    }

    var rhyphen = /([a-z\d])([A-Z]+)/g
    function hyphen(target) {
        //转换为连字符线风格
        return target.replace(rhyphen, '$1-$2').toLowerCase()
    }

    var rcamelize = /[-_][^-_]/g
    function camelize(target) {
        //提前判断，提高getStyle等的效率
        if (!target || target.indexOf('-') < 0 && target.indexOf('_') < 0) {
            return target
        }
        //转换为驼峰风格
        return target.replace(rcamelize, function (match) {
            return match.charAt(1).toUpperCase()
        })
    }

    var _slice = ap.slice
    function slice(nodes, start, end) {
        return _slice.call(nodes, start, end)
    }

    var rhashcode = /\d\.\d{4}/
    //生成UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    function makeHashCode(prefix) {
        /* istanbul ignore next*/
        prefix = prefix || 'avalon'
        /* istanbul ignore next*/
        return String(Math.random() + Math.random()).replace(rhashcode, prefix)
    }
    //生成事件回调的UUID(用户通过ms-on指令)
    function getLongID(fn) {
        /* istanbul ignore next */
        return fn.uuid || (fn.uuid = makeHashCode('e'))
    }
    var UUID = 1
    //生成事件回调的UUID(用户通过avalon.bind)
    function getShortID(fn) {
        /* istanbul ignore next */
        return fn.uuid || (fn.uuid = '_' + ++UUID)
    }

    var rescape = /[-.*+?^${}()|[\]\/\\]/g
    function escapeRegExp(target) {
        //http://stevenlevithan.com/regex/xregexp/
        //将字符串安全格式化为正则表达式的源码
        return (target + '').replace(rescape, '\\$&')
    }

    var eventHooks = {}
    var eventListeners = {}
    var validators = {}
    var cssHooks = {}

    window$1.avalon = avalon$2

    function createFragment() {
        /* istanbul ignore next  */
        return document$1.createDocumentFragment()
    }

    var rentities = /&[a-z0-9#]{2,10};/
    var temp = document$1.createElement('div')
    shadowCopy(avalon$2, {
        Array: {
            merge: function merge(target, other) {
                //合并两个数组 avalon2新增
                target.push.apply(target, other)
            },
            ensure: function ensure(target, item) {
                //只有当前数组不存在此元素时只添加它
                if (target.indexOf(item) === -1) {
                    return target.push(item)
                }
            },
            removeAt: function removeAt(target, index) {
                //移除数组中指定位置的元素，返回布尔表示成功与否
                return !!target.splice(index, 1).length
            },
            remove: function remove(target, item) {
                //移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否
                var index = target.indexOf(item)
                if (~index) return avalon$2.Array.removeAt(target, index)
                return false
            }
        },
        evaluatorPool: new Cache(888),
        parsers: {
            number: function number(a) {
                return a === '' ? '' : parseFloat(a) || 0
            },
            string: function string(a) {
                return a === null || a === void 0 ? '' : a + ''
            },
            boolean: function boolean(a) {
                if (a === '') return a
                return a === 'true' || a === '1'
            }
        },
        _decode: function _decode(str) {
            if (rentities.test(str)) {
                temp.innerHTML = str
                return temp.innerText || temp.textContent
            }
            return str
        }
    })

    //============== config ============
    function config(settings) {
        for (var p in settings) {
            var val = settings[p]
            if (typeof config.plugins[p] === 'function') {
                config.plugins[p](val)
            } else {
                config[p] = val
            }
        }
        return this
    }

    var plugins = {
        interpolate: function interpolate(array) {
            var openTag = array[0]
            var closeTag = array[1]
            if (openTag === closeTag) {
                throw new SyntaxError('interpolate openTag cannot equal to closeTag')
            }
            var str = openTag + 'test' + closeTag

            if (/[<>]/.test(str)) {
                throw new SyntaxError('interpolate cannot contains "<" or ">"')
            }

            config.openTag = openTag
            config.closeTag = closeTag
            var o = escapeRegExp(openTag)
            var c = escapeRegExp(closeTag)

            config.rtext = new RegExp(o + '(.+?)' + c, 'g')
            config.rexpr = new RegExp(o + '([\\s\\S]*)' + c)
        }
    }
    function createAnchor(nodeValue) {
        return document$1.createComment(nodeValue)
    }
    config.plugins = plugins
    config({
        interpolate: ['{{', '}}'],
        debug: true
    })
    //============  config ============

    shadowCopy(avalon$2, {
        shadowCopy: shadowCopy,

        oneObject: oneObject,
        inspect: inspect,
        ohasOwn: ohasOwn,
        rword: rword,
        version: "2.2.4",
        vmodels: {},

        directives: directives,
        directive: directive,

        eventHooks: eventHooks,
        eventListeners: eventListeners,
        validators: validators,
        cssHooks: cssHooks,

        log: log,
        noop: noop,
        warn: warn,
        error: error,
        config: config,

        modern: modern,
        msie: msie,
        root: root,
        document: document$1,
        window: window$1,
        inBrowser: inBrowser,

        isObject: isObject,
        range: range,
        slice: slice,
        hyphen: hyphen,
        camelize: camelize,
        escapeRegExp: escapeRegExp,
        quote: quote,

        makeHashCode: makeHashCode

    })

    //这里放置存在异议的方法
    var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
    var rarraylike = /(Array|List|Collection|Map|Arguments)\]$/

    // avalon.type
    var class2type = {}
    'Boolean Number String Function Array Date RegExp Object Error'.replace(avalon$2.rword, function (name) {
        class2type['[object ' + name + ']'] = name.toLowerCase()
    })

    avalon$2.type = function (obj) {
        //取得目标的类型
        if (obj == null) {
            return String(obj)
        }
        // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
        return typeof obj === 'object' || typeof obj === 'function' ? class2type[inspect.call(obj)] || 'object' : typeof obj
    }

    avalon$2._quote = JSON.stringify

    avalon$2.isFunction = function (fn) {
        return typeof fn === 'function'
    }

    avalon$2.isWindow = function (obj) {
        return rwindow.test(inspect.call(obj))
    }

    /*判定是否是一个朴素的javascript对象（Object），不是DOM对象，不是BOM对象，不是自定义类的实例*/
    avalon$2.isPlainObject = function (obj) {
        // 简单的 typeof obj === 'object'检测，会致使用isPlainObject(window)在opera下通不过
        return inspect.call(obj) === '[object Object]' && Object.getPrototypeOf(obj) === Object.prototype
    }

    //与jQuery.extend方法，可用于浅拷贝，深拷贝
    avalon$2.mix = avalon$2.fn.mix = function () {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
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

                    copy = options[name]

                    // 防止环引用
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (avalon$2.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false
                            clone = src && Array.isArray(src) ? src : []
                        } else {
                            clone = src && avalon$2.isPlainObject(src) ? src : {}
                        }

                        target[name] = avalon$2.mix(deep, clone, copy)
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
        /* istanbul ignore if*/
        if (obj && typeof obj === 'object') {
            var n = obj.length,
                str = inspect.call(obj)
            if (rarraylike.test(str)) {
                return true
            } else if (str === '[object Object]' && n === n >>> 0) {
                return true //由于ecma262v5能修改对象属性的enumerable，因此不能用propertyIsEnumerable来判定了
            }
        }
        return false
    }

    avalon$2.each = function (obj, fn) {
        if (obj) {
            //排除null, undefined
            var i = 0
            if (isArrayLike(obj)) {
                for (var n = obj.length; i < n; i++) {
                    if (fn(i, obj[i]) === false) break
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

    new function welcome() {
        var welcomeIntro = ["%cavalon.js %c" + avalon$2.version + " %cin debug mode, %cmore...", "color: rgb(114, 157, 52); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;"]
        var welcomeMessage = "You're running avalon in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\n" + 'To disable debug mode, add this line at the start of your app:\n\n  avalon.config({debug: false});\n\n' + 'Debug mode also automatically shut down amicably when your app is minified.\n\n' + "Get help and support:\n  https://segmentfault.com/t/avalon\n  http://avalonjs.coding.me/\n  http://www.baidu-x.com/?q=avalonjs\n http://www.avalon.org.cn/\n\nFound a bug? Raise an issue:\n  https://github.com/RubyLouvre/avalon/issues\n\n"

        var hasGroup = !!console.groupCollapsed
        console[hasGroup ? 'groupCollapsed' : 'log'].apply(console, welcomeIntro)
        console.log(welcomeMessage)
        if (hasGroup) {
            console.groupEnd(welcomeIntro)
        }
    }()

    function toFixedFix(n, prec) {
        var k = Math.pow(10, prec)
        return '' + (Math.round(n * k) / k).toFixed(prec)
    }
    function numberFilter(number, decimals, point, thousands) {
        //https://github.com/txgruppi/number_format
        //form http://phpjs.org/functions/number_format/
        //number 必需，要格式化的数字
        //decimals 可选，规定多少个小数位。
        //point 可选，规定用作小数点的字符串（默认为 . ）。
        //thousands 可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
            sep = typeof thousands === 'string' ? thousands : ",",
            dec = point || ".",
            s = ''

        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
        }
        /** //好像没有用
         var s1 = s[1] || ''
        
          if (s1.length < prec) {
                  s1 += new Array(prec - s[1].length + 1).join('0')
                  s[1] = s1
          }
          **/
        return s.join(dec)
    }

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
    function sanitizeFilter(str) {
        return str.replace(rscripts, "").replace(ropen, function (a, b) {
            var match = a.toLowerCase().match(/<(\w+)\s/)
            if (match) {
                //处理a标签的href属性，img标签的src属性，form标签的action属性
                var reg = rsanitize[match[1]]
                if (reg) {
                    a = a.replace(reg, function (s, name, value) {
                        var quote = value.charAt(0)
                        return name + "=" + quote + "javascript:void(0)" + quote // jshint ignore:line
                    })
                }
            }
            return a.replace(ron, " ").replace(/\s+/g, " ") //移除onXXX事件
        })
    }

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
        /* istanbul ignore if*/
        if (num < 0) {
            neg = '-'
            num = -num
        }
        num = '' + num
        while (num.length < digits) {
            num = '0' + num
        }if (trim) num = num.substr(num.length - digits)
        return neg + num
    }

    function dateGetter(name, size, offset, trim) {
        return function (date) {
            var value = date["get" + name]()
            if (offset > 0 || value > -offset) value += offset
            if (value === 0 && offset === -12) {
                /* istanbul ignore next*/
                value = 12
            }
            return padNumber(value, size, trim)
        }
    }

    function dateStrGetter(name, shortForm) {
        return function (date, formats) {
            var value = date["get" + name]()
            var get = (shortForm ? "SHORT" + name : name).toUpperCase()
            return formats[get][value]
        }
    }

    function timeZoneGetter(date) {
        var zone = -1 * date.getTimezoneOffset()
        var paddedZone = zone >= 0 ? "+" : ""
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
            fn,
            match
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
                    dateArray[0] = toInt(array[0]) //年
                    dateArray[1] = toInt(array[1]) - 1 //月
                    dateArray[2] = toInt(array[2]) //日
                    return ""
                })
                var dateSetter = oDate.setFullYear
                var timeSetter = oDate.setHours
                trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (_, a, b, c, d) {
                    dateArray[3] = toInt(a) //小时
                    dateArray[4] = toInt(b) //分钟
                    dateArray[5] = toInt(c) //秒
                    if (d) {
                        //毫秒
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

        while (format) {
            match = rdateFormat.exec(format)
            /* istanbul ignore else */
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

    /**
    $$skipArray:是系统级通用的不可监听属性
    $skipArray: 是当前对象特有的不可监听属性
    
     不同点是
     $$skipArray被hasOwnProperty后返回false
     $skipArray被hasOwnProperty后返回true
     */
    var falsy
    var $$skipArray = {
        $id: falsy,
        $render: falsy,
        $track: falsy,
        $element: falsy,
        $computed: falsy,
        $watch: falsy,
        $fire: falsy,
        $events: falsy,
        $accessors: falsy,
        $hashcode: falsy,
        $mutations: falsy,
        $vbthis: falsy,
        $vbsetter: falsy
    }

    /*
    https://github.com/hufyhang/orderBy/blob/master/index.js
    */

    function orderBy(array, by, decend) {
        var type = avalon$2.type(array)
        if (type !== 'array' && type !== 'object') throw 'orderBy只能处理对象或数组'
        var criteria = typeof by == 'string' ? function (el) {
            return el && el[by]
        } : typeof by === 'function' ? by : function (el) {
            return el
        }
        var mapping = {}
        var temp = []
        __repeat(array, Array.isArray(array), function (key) {
            var val = array[key]
            var k = criteria(val, key)
            if (k in mapping) {
                mapping[k].push(key)
            } else {
                mapping[k] = [key]
            }
            temp.push(k)
        })

        temp.sort()
        if (decend < 0) {
            temp.reverse()
        }
        var _array = type === 'array'
        var target = _array ? [] : {}
        return recovery(target, temp, function (k) {
            var key = mapping[k].shift()
            if (_array) {
                target.push(array[key])
            } else {
                target[key] = array[key]
            }
        })
    }

    function __repeat(array, isArray$$1, cb) {
        if (isArray$$1) {
            array.forEach(function (val, index) {
                cb(index)
            })
        } else if (typeof array.$track === 'string') {
            array.$track.replace(/[^☥]+/g, function (k) {
                cb(k)
            })
        } else {
            for (var i in array) {
                if (array.hasOwnProperty(i)) {
                    cb(i)
                }
            }
        }
    }
    function filterBy(array, search) {
        var type = avalon$2.type(array)
        if (type !== 'array' && type !== 'object') throw 'filterBy只能处理对象或数组'
        var args = avalon$2.slice(arguments, 2)
        var stype = avalon$2.type(search)
        if (stype === 'function') {
            var criteria = search._orig || search
        } else if (stype === 'string' || stype === 'number') {
            if (search === '') {
                return array
            } else {
                var reg = new RegExp(avalon$2.escapeRegExp(search), 'i')
                criteria = function criteria(el) {
                    return reg.test(el)
                }
            }
        } else {
            return array
        }
        var isArray$$1 = type === 'array'
        var target = isArray$$1 ? [] : {}
        __repeat(array, isArray$$1, function (key) {
            var val = array[key]
            if (criteria.apply({
                key: key
            }, [val, key].concat(args))) {
                if (isArray$$1) {
                    target.push(val)
                } else {
                    target[key] = val
                }
            }
        })
        return target
    }

    function selectBy(data, array, defaults) {
        if (avalon$2.isObject(data) && !Array.isArray(data)) {
            var target = []
            return recovery(target, array, function (name) {
                target.push(data.hasOwnProperty(name) ? data[name] : defaults ? defaults[name] : '')
            })
        } else {
            return data
        }
    }

    function limitBy(input, limit, begin) {
        var type = avalon$2.type(input)
        if (type !== 'array' && type !== 'object') throw 'limitBy只能处理对象或数组'
        //必须是数值
        if (typeof limit !== 'number') {
            return input
        }
        //不能为NaN
        if (limit !== limit) {
            return input
        }
        //将目标转换为数组
        if (type === 'object') {
            input = convertArray(input, false)
        }
        var n = input.length
        limit = Math.floor(Math.min(n, limit))
        begin = typeof begin === 'number' ? begin : 0
        if (begin < 0) {
            begin = Math.max(0, n + begin)
        }
        var data = []
        for (var i = begin; i < n; i++) {
            if (data.length === limit) {
                break
            }
            data.push(input[i])
        }
        var isArray$$1 = type === 'array'
        if (isArray$$1) {
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

    //Chrome谷歌浏览器中js代码Array.sort排序的bug乱序解决办法
    //http://www.cnblogs.com/yzeng/p/3949182.html
    function convertArray(array, isArray$$1) {
        var ret = [],
            i = 0
        __repeat(array, isArray$$1, function (key) {
            ret[i] = {
                oldIndex: i,
                value: array[key],
                key: key
            }
            i++
        })
        return ret
    }

    var eventFilters = {
        stop: function stop(e) {
            e.stopPropagation()
            return e
        },
        prevent: function prevent(e) {
            e.preventDefault()
            return e
        }
    }
    var keys = {
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
    for (var name$1 in keys) {
        ;(function (filter, key) {
            eventFilters[filter] = function (e) {
                if (e.which !== key) {
                    e.$return = true
                }
                return e
            }
        })(name$1, keys[name$1])
    }

    //https://github.com/teppeis/htmlspecialchars
    function escapeFilter(str) {
        if (str == null) return ''

        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
    }

    var filters = avalon$2.filters = {}

    avalon$2.composeFilters = function () {
        var args = arguments
        return function (value) {
            for (var i = 0, arr; arr = args[i++];) {
                var name = arr[0]
                var filter = avalon$2.filters[name]
                if (typeof filter === 'function') {
                    arr[0] = value
                    try {
                        value = filter.apply(0, arr)
                    } catch (e) {}
                }
            }
            return value
        }
    }

    avalon$2.escapeHtml = escapeFilter

    avalon$2.mix(filters, {
        uppercase: function uppercase(str) {
            return String(str).toUpperCase()
        },
        lowercase: function lowercase(str) {
            return String(str).toLowerCase()
        },
        truncate: function truncate(str, length, end) {
            //length，新字符串长度，truncation，新字符串的结尾的字段,返回新字符串
            if (!str) {
                return ''
            }
            str = String(str)
            if (isNaN(length)) {
                length = 30
            }
            end = typeof end === "string" ? end : "..."
            return str.length > length ? str.slice(0, length - end.length) + end : /* istanbul ignore else*/
            str
        },

        camelize: avalon$2.camelize,
        date: dateFilter,
        escape: escapeFilter,
        sanitize: sanitizeFilter,
        number: numberFilter,
        currency: function currency(amount, symbol, fractionSize) {
            return (symbol || '\xA5') + numberFilter(amount, isFinite(fractionSize) ? /* istanbul ignore else*/fractionSize : 2)
        }
    }, { filterBy: filterBy, orderBy: orderBy, selectBy: selectBy, limitBy: limitBy }, eventFilters)

    /* istanbul ignore next */
    function fixContains(root, el) {
        try {
            //IE6-8,游离于DOM树外的文本节点，访问parentNode有时会抛错
            while (el = el.parentNode) {
                if (el === root) return true
            }
        } catch (e) {}
        return false
    }

    //safari5+是把contains方法放在Element.prototype上而不是Node.prototype
    avalon$2.contains = fixContains

    avalon$2.cloneNode = function (a) {
        return a.cloneNode(true)
    }

    if (avalon$2.modern) {
        var fixFF = function fixFF(prop, cb) {
            //firefox12 http://caniuse.com/#search=outerHTML
            if (!(prop in root)) {
                HTMLElement.prototype.__defineGetter__(prop, cb)
            }
        }

        if (!document$1.contains) {
            Node.prototype.contains = function (child) {
                //IE6-8没有Node对象
                return fixContains(this, child)
            }
        }

        fixFF('outerHTML', function () {
            //https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children
            var div = document$1.createElement('div')
            div.appendChild(this)
            return div.innerHTML
        })
        fixFF('children', function () {
            var children = []
            for (var i = 0, el; el = this.childNodes[i++];) {
                if (el.nodeType === 1) {
                    children.push(el)
                }
            }
            return children
        })
        fixFF('innerText', function () {
            return this.textContent
        })
    }

    'add,remove'.replace(rword, function (method) {
        avalon$2.fn[method + 'Class'] = function (cls) {
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

    avalon$2.shadowCopy(avalon$2.fn, {
        hasClass: function hasClass(cls) {
            var el = this[0] || {}
            //IE10+, chrome8+, firefox3.6+, safari5.1+,opera11.5+支持classList,
            //chrome24+,firefox26+支持classList2.0
            return el.nodeType === 1 && el.classList.contains(cls)
        },
        toggleClass: function toggleClass(value, stateVal) {
            var isBool = typeof stateVal === 'boolean'
            var me = this
            String(value).replace(rnowhite, function (c) {
                var state = isBool ? stateVal : !me.hasClass(c)
                me[state ? 'addClass' : 'removeClass'](c)
            })
            return this
        }
    })

    var propMap = {} //不规则的属性名映射


    //防止压缩时出错
    ;'accept-charset,acceptCharset|char,ch|charoff,chOff|class,className|for,htmlFor|http-equiv,httpEquiv'.replace(/[^\|]+/g, function (a) {
        var k = a.split(',')
        propMap[k[0]] = k[1]
    })
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
    var bools = ['autofocus,autoplay,async,allowTransparency,checked,controls', 'declare,disabled,defer,defaultChecked,defaultSelected,', 'isMap,loop,multiple,noHref,noResize,noShade', 'open,readOnly,selected'].join(',')

    bools.replace(/\w+/g, function (name) {
        propMap[name.toLowerCase()] = name
    })

    var anomaly = ['accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan', 'dateTime,defaultValue,contentEditable,frameBorder,longDesc,maxLength,' + 'marginWidth,marginHeight,rowSpan,tabIndex,useMap,vSpace,valueType,vAlign'].join(',')

    anomaly.replace(/\w+/g, function (name) {
        propMap[name.toLowerCase()] = name
    })

    //module.exports = propMap

    var rsvg = /^\[object SVG\w*Element\]$/
    function updateAttrs(node, attrs) {
        for (var attrName in attrs) {
            var val = attrs[attrName]
            /* istanbul ignore if*/
            if (attrName.indexOf('data-') === 0 || rsvg.test(node)) {
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
                var isInnate = attrName in node.cloneNode(false)
                if (isInnate) {
                    node[propName] = val + ''
                } else {
                    node.setAttribute(attrName, val)
                }
            }
        }
    }

    avalon$2.parseJSON = JSON.parse

    avalon$2.fn.attr = function (name, value) {
        if (arguments.length === 2) {
            this[0].setAttribute(name, value)
            return this
        } else {
            return this[0].getAttribute(name)
        }
    }

    var cssMap = oneObject('float', 'cssFloat')
    avalon$2.cssNumber = oneObject('animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom')
    var prefixes = ['', '-webkit-', '-o-', '-moz-', '-ms-']
    /* istanbul ignore next */
    avalon$2.cssName = function (name, host, camelCase) {
        if (cssMap[name]) {
            return cssMap[name]
        }
        host = host || avalon$2.root.style || {}
        for (var i = 0, n = prefixes.length; i < n; i++) {
            camelCase = avalon$2.camelize(prefixes[i] + name)
            if (camelCase in host) {
                return cssMap[name] = camelCase
            }
        }
        return null
    }
    /* istanbul ignore next */
    avalon$2.css = function (node, name, value, fn) {
        //读写删除元素节点的样式
        if (node instanceof avalon$2) {
            node = node[0]
        }
        if (node.nodeType !== 1) {
            return
        }
        var prop = avalon$2.camelize(name)
        name = avalon$2.cssName(prop) || /* istanbul ignore next*/prop
        if (value === void 0 || typeof value === 'boolean') {
            //获取样式
            fn = cssHooks[prop + ':get'] || cssHooks['@:get']
            if (name === 'background') {
                name = 'backgroundColor'
            }
            var val = fn(node, name)
            return value === true ? parseFloat(val) || 0 : val
        } else if (value === '') {
            //请除样式
            node.style[name] = ''
        } else {
            //设置样式
            if (value == null || value !== value) {
                return
            }
            if (isFinite(value) && !avalon$2.cssNumber[prop]) {
                value += 'px'
            }
            fn = cssHooks[prop + ':set'] || cssHooks['@:set']
            fn(node, name, value)
        }
    }
    /* istanbul ignore next */
    avalon$2.fn.css = function (name, value) {
        if (avalon$2.isPlainObject(name)) {
            for (var i in name) {
                avalon$2.css(this, i, name[i])
            }
        } else {
            var ret = avalon$2.css(this, name, value)
        }
        return ret !== void 0 ? ret : this
    }
    /* istanbul ignore next */
    avalon$2.fn.position = function () {
        var offsetParent,
            offset,
            elem = this[0],
            parentOffset = {
            top: 0,
            left: 0
        }
        if (!elem) {
            return parentOffset
        }
        if (this.css('position') === 'fixed') {
            offset = elem.getBoundingClientRect()
        } else {
            offsetParent = this.offsetParent() //得到真正的offsetParent
            offset = this.offset() // 得到正确的offsetParent
            if (offsetParent[0].tagName !== 'HTML') {
                parentOffset = offsetParent.offset()
            }
            parentOffset.top += avalon$2.css(offsetParent[0], 'borderTopWidth', true)
            parentOffset.left += avalon$2.css(offsetParent[0], 'borderLeftWidth', true)

            // Subtract offsetParent scroll positions
            parentOffset.top -= offsetParent.scrollTop()
            parentOffset.left -= offsetParent.scrollLeft()
        }
        return {
            top: offset.top - parentOffset.top - avalon$2.css(elem, 'marginTop', true),
            left: offset.left - parentOffset.left - avalon$2.css(elem, 'marginLeft', true)
        }
    }
    /* istanbul ignore next */
    avalon$2.fn.offsetParent = function () {
        var offsetParent = this[0].offsetParent
        while (offsetParent && avalon$2.css(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.offsetParent
        }
        return avalon$2(offsetParent || avalon$2.root)
    }

    /* istanbul ignore next */
    cssHooks['@:set'] = function (node, name, value) {
        try {
            //node.style.width = NaN;node.style.width = 'xxxxxxx';
            //node.style.width = undefine 在旧式IE下会抛异常
            node.style[name] = value
        } catch (e) {}
    }
    /* istanbul ignore next */
    cssHooks['@:get'] = function (node, name) {
        if (!node || !node.style) {
            throw new Error('getComputedStyle要求传入一个节点 ' + node)
        }
        var ret,
            styles = window$1.getComputedStyle(node, null)
        if (styles) {
            ret = name === 'filter' ? styles.getPropertyValue(name) : styles[name]
            if (ret === '') {
                ret = node.style[name] //其他浏览器需要我们手动取内联样式
            }
        }
        return ret
    }

    cssHooks['opacity:get'] = function (node) {
        var ret = cssHooks['@:get'](node, 'opacity')
        return ret === '' ? '1' : ret
    }

    'top,left'.replace(avalon$2.rword, function (name) {
        cssHooks[name + ':get'] = function (node) {
            var computed = cssHooks['@:get'](node, name)
            return (/px$/.test(computed) ? computed : avalon$2(node).position()[name] + 'px'
            )
        }
    })

    var cssShow = {
        position: 'absolute',
        visibility: 'hidden',
        display: 'block'
    }

    var rdisplayswap = /^(none|table(?!-c[ea]).+)/
    /* istanbul ignore next */
    function showHidden(node, array) {
        //http://www.cnblogs.com/rubylouvre/archive/2012/10/27/2742529.html
        if (node.offsetWidth <= 0) {
            //opera.offsetWidth可能小于0
            if (rdisplayswap.test(cssHooks['@:get'](node, 'display'))) {
                var obj = {
                    node: node
                }
                for (var name in cssShow) {
                    obj[name] = node.style[name]
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
    /* istanbul ignore next*/
    avalon$2.each({
        Width: 'width',
        Height: 'height'
    }, function (name, method) {
        var clientProp = 'client' + name,
            scrollProp = 'scroll' + name,
            offsetProp = 'offset' + name
        cssHooks[method + ':get'] = function (node, which, override) {
            var boxSizing = -4
            if (typeof override === 'number') {
                boxSizing = override
            }
            which = name === 'Width' ? ['Left', 'Right'] : ['Top', 'Bottom']
            var ret = node[offsetProp] // border-box 0
            if (boxSizing === 2) {
                // margin-box 2
                return ret + avalon$2.css(node, 'margin' + which[0], true) + avalon$2.css(node, 'margin' + which[1], true)
            }
            if (boxSizing < 0) {
                // padding-box  -2
                ret = ret - avalon$2.css(node, 'border' + which[0] + 'Width', true) - avalon$2.css(node, 'border' + which[1] + 'Width', true)
            }
            if (boxSizing === -4) {
                // content-box -4
                ret = ret - avalon$2.css(node, 'padding' + which[0], true) - avalon$2.css(node, 'padding' + which[1], true)
            }
            return ret
        }
        cssHooks[method + '&get'] = function (node) {
            var hidden = []
            showHidden(node, hidden)
            var val = cssHooks[method + ':get'](node)
            for (var i = 0, obj; obj = hidden[i++];) {
                node = obj.node
                for (var n in obj) {
                    if (typeof obj[n] === 'string') {
                        node.style[n] = obj[n]
                    }
                }
            }
            return val
        }
        avalon$2.fn[method] = function (value) {
            //会忽视其display
            var node = this[0]
            if (arguments.length === 0) {
                if (node.setTimeout) {
                    //取得窗口尺寸
                    return node['inner' + name] || node.document.documentElement[clientProp] || node.document.body[clientProp] //IE6下前两个分别为undefined,0
                }
                if (node.nodeType === 9) {
                    //取得页面尺寸
                    var doc = node.documentElement
                    //FF chrome    html.scrollHeight< body.scrollHeight
                    //IE 标准模式 : html.scrollHeight> body.scrollHeight
                    //IE 怪异模式 : html.scrollHeight 最大等于可视窗口多一点？
                    return Math.max(node.body[scrollProp], doc[scrollProp], node.body[offsetProp], doc[offsetProp], doc[clientProp])
                }
                return cssHooks[method + '&get'](node)
            } else {
                return this.css(method, value)
            }
        }
        avalon$2.fn['inner' + name] = function () {
            return cssHooks[method + ':get'](this[0], void 0, -2)
        }
        avalon$2.fn['outer' + name] = function (includeMargin) {
            return cssHooks[method + ':get'](this[0], void 0, includeMargin === true ? 2 : 0)
        }
    })

    avalon$2.fn.offset = function () {
        //取得距离页面左右角的坐标
        var node = this[0]
        try {
            var rect = node.getBoundingClientRect()
            // Make sure element is not hidden (display: none) or disconnected
            // https://github.com/jquery/jquery/pull/2043/files#r23981494
            if (rect.width || rect.height || node.getClientRects().length) {
                var doc = node.ownerDocument
                var root$$1 = doc.documentElement
                var win = doc.defaultView
                return {
                    top: rect.top + win.pageYOffset - root$$1.clientTop,
                    left: rect.left + win.pageXOffset - root$$1.clientLeft
                }
            }
        } catch (e) {
            return {
                left: 0,
                top: 0
            }
        }
    }

    avalon$2.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (method, prop) {
        avalon$2.fn[method] = function (val) {
            var node = this[0] || {}
            var win = getWindow$$1(node)
            var top = method === "scrollTop"
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

    function getWindow$$1(node) {
        return node.window || node.defaultView || false
    }

    var rcheckedType = /^(?:checkbox|radio)$/

    function getDuplexType(elem) {
        var ret = elem.tagName.toLowerCase()
        if (ret === 'input') {
            return rcheckedType.test(elem.type) ? 'checked' : elem.type
        }
        return ret
    }

    var valHooks = {
        'select:get': function self(node, ret, index, singleton) {
            var nodes = node.children,
                value,
                index = ret ? index : node.selectedIndex
            singleton = ret ? singleton : node.type === 'select-one' || index < 0
            ret = ret || []
            for (var i = 0, el; el = nodes[i++];) {
                if (!el.disabled) {
                    switch (el.nodeName.toLowerCase()) {
                        case 'option':
                            if (el.selected || el.index === index) {
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
        'select:set': function selectSet(node, values, optionSet) {
            values = [].concat(values) //强制转换为数组
            for (var i = 0, el; el = node.options[i++];) {
                if (el.selected = values.indexOf(el.value) > -1) {
                    optionSet = true
                }
            }
            if (!optionSet) {
                node.selectedIndex = -1
            }
        }
    }

    avalon$2.fn.val = function (value) {
        var node = this[0]
        if (node && node.nodeType === 1) {
            var get = arguments.length === 0
            var access = get ? ':get' : ':set'
            var fn = valHooks[getDuplexType(node) + access]
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

    /* 
     * 将要检测的字符串的字符串替换成??123这样的格式
     */
    var stringNum = 0
    var stringPool = {
        map: {}
    }
    var rfill = /\?\?\d+/g
    function dig(a) {
        var key = '??' + stringNum++
        stringPool.map[key] = a
        return key + ' '
    }
    function fill(a) {
        var val = stringPool.map[a]
        return val
    }
    function clearString(str) {
        var array = readString(str)
        for (var i = 0, n = array.length; i < n; i++) {
            str = str.replace(array[i], dig)
        }
        return str
    }
    //https://github.com/RubyLouvre/avalon/issues/1944
    function readString(str, i, ret) {
        var end = false,
            s = 0,
            i = i || 0
        ret = ret || []
        for (var n = str.length; i < n; i++) {
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
                if (c === end) {
                    ret.push(str.slice(s, i + 1))
                    end = false
                }
            }
        }
        if (end !== false) {
            return readString(str, s + 1, ret)
        }
        return ret
    }

    var voidTag = {
        area: 1,
        base: 1,
        basefont: 1,
        bgsound: 1,
        br: 1,
        col: 1,
        command: 1,
        embed: 1,
        frame: 1,
        hr: 1,
        img: 1,
        input: 1,
        keygen: 1,
        link: 1,
        meta: 1,
        param: 1,
        source: 1,
        track: 1,
        wbr: 1
    }

    var orphanTag = {
        script: 1,
        style: 1,
        textarea: 1,
        xmp: 1,
        noscript: 1,
        template: 1
    }

    /* 
     *  此模块只用于文本转虚拟DOM, 
     *  因为在真实浏览器会对我们的HTML做更多处理,
     *  如, 添加额外属性, 改变结构
     *  此模块就是用于模拟这些行为
     */
    function makeOrphan(node, nodeName, innerHTML) {
        switch (nodeName) {
            case 'style':
            case 'script':
            case 'noscript':
            case 'template':
            case 'xmp':
                node.children = [{
                    nodeName: '#text',
                    nodeValue: innerHTML
                }]
                break
            case 'textarea':
                var props = node.props
                props.type = nodeName
                props.value = innerHTML
                node.children = [{
                    nodeName: '#text',
                    nodeValue: innerHTML
                }]
                break
            case 'option':
                node.children = [{
                    nodeName: '#text',
                    nodeValue: trimHTML(innerHTML)
                }]
                break
        }
    }

    //专门用于处理option标签里面的标签
    var rtrimHTML = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi
    function trimHTML(v) {
        return String(v).replace(rtrimHTML, '').trim()
    }

    //widget rule duplex validate

    //如果直接将tr元素写table下面,那么浏览器将将它们(相邻的那几个),放到一个动态创建的tbody底下
    function makeTbody(nodes) {
        var tbody,
            needAddTbody = false,
            count = 0,
            start = 0,
            n = nodes.length
        for (var i = 0; i < n; i++) {
            var node = nodes[i]
            if (!tbody) {
                if (node.nodeName === 'tr') {
                    //收集tr及tr两旁的注释节点
                    tbody = {
                        nodeName: 'tbody',
                        props: {},
                        children: []
                    }
                    tbody.children.push(node)
                    needAddTbody = true
                    if (start === 0) start = i
                    nodes[i] = tbody
                }
            } else {
                if (node.nodeName !== 'tr' && node.children) {
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

    function validateDOMNesting(parent, child) {

        var parentTag = parent.nodeName
        var tag = child.nodeName
        var parentChild = nestObject[parentTag]
        if (parentChild) {
            if (parentTag === 'p') {
                if (pNestChild[tag]) {
                    avalon$2.warn('P element can not  add these childlren:\n' + Object.keys(pNestChild))
                    return false
                }
            } else if (!parentChild[tag]) {
                avalon$2.warn(parentTag.toUpperCase() + 'element only add these children:\n' + Object.keys(parentChild) + '\nbut you add ' + tag.toUpperCase() + ' !!')
                return false
            }
        }
        return true
    }

    function makeObject(str) {
        return oneObject(str + ',template,#document-fragment,#comment')
    }
    var pNestChild = oneObject('div,ul,ol,dl,table,h1,h2,h3,h4,h5,h6,form,fieldset')
    var tNestChild = makeObject('tr,style,script')
    var nestObject = {
        p: pNestChild,
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
        select: makeObject('option,optgroup,#text'),
        optgroup: makeObject('option,#text'),
        option: makeObject('#text'),
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
        // No special behavior since these rules fall back to "in body" mode for
        // all except special table nodes which cause bad parsing behavior anyway.

        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
        tr: makeObject('th,td,style,script'),

        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
        tbody: tNestChild,
        tfoot: tNestChild,
        thead: tNestChild,
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
        colgroup: makeObject('col'),
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
        // table: oneObject('caption,colgroup,tbody,thead,tfoot,style,script,template,#document-fragment'),
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
        head: makeObject('base,basefont,bgsound,link,style,script,meta,title,noscript,noframes'),
        // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
        html: oneObject('head,body')
    }

    /**
     * ------------------------------------------------------------
     * avalon2.1.1的新式lexer
     * 将字符串变成一个虚拟DOM树,方便以后进一步变成模板函数
     * 此阶段只会生成VElement,VText,VComment
     * ------------------------------------------------------------
     */
    function nomalString(str) {
        return avalon$2.unescapeHTML(str.replace(rfill, fill))
    }
    //https://github.com/rviscomi/trunk8/blob/master/trunk8.js

    var ropenTag = /^<([-A-Za-z0-9_]+)\s*([^>]*?)(\/?)>/
    var rendTag = /^<\/([^>]+)>/
    var rtagStart = /[\!\/a-z]/i //闭标签的第一个字符,开标签的第一个英文,注释节点的!
    var rlineSp = /\\n\s*/g
    var rattrs = /([^=\s]+)(?:\s*=\s*(\S+))?/

    var rcontent = /\S/ //判定里面有没有内容
    function fromString(str) {
        return from(str)
    }
    avalon$2.lexer = fromString

    var strCache = new Cache(100)

    function AST() {}
    AST.prototype = {
        init: function init(str) {
            this.ret = []
            var stack = []
            stack.last = function () {
                return stack[stack.length - 1]
            }
            this.stack = stack
            this.str = str
        },
        gen: function gen() {
            var breakIndex = 999999
            do {
                this.tryGenText()
                this.tryGenComment()
                this.tryGenOpenTag()
                this.tryGenCloseTag()
                var node = this.node
                this.node = 0
                if (!node || --breakIndex === 0) {
                    break
                }
                if (node.end) {
                    if (node.nodeName === 'table') {
                        makeTbody(node.children)
                    }
                    delete node.end
                }
            } while (this.str.length)
            return this.ret
        },

        fixPos: function fixPos(str, i) {
            var tryCount = str.length - i
            while (tryCount--) {
                if (!rtagStart.test(str.charAt(i + 1))) {
                    i = str.indexOf('<', i + 1)
                } else {
                    break
                }
            }
            if (tryCount === 0) {
                i = str.length
            }
            return i
        },
        tryGenText: function tryGenText() {
            var str = this.str
            if (str.charAt(0) !== '<') {
                //处理文本节点
                var i = str.indexOf('<')
                if (i === -1) {
                    i = str.length
                } else if (!rtagStart.test(str.charAt(i + 1))) {
                    //处理`内容2 {{ (idx1 < < <  1 ? 'red' : 'blue' ) + a }} ` 的情况 
                    i = this.fixPos(str, i)
                }
                var nodeValue = str.slice(0, i).replace(rfill, fill)
                this.str = str.slice(i)
                this.node = {
                    nodeName: '#text',
                    nodeValue: nodeValue
                }
                if (rcontent.test(nodeValue)) {
                    this.tryGenChildren() //不收集空白节点
                }
            }
        },
        tryGenComment: function tryGenComment() {
            if (!this.node) {
                var str = this.str
                var i = str.indexOf('<!--') //处理注释节点
                /* istanbul ignore if*/
                if (i === 0) {
                    var l = str.indexOf('-->')
                    if (l === -1) {
                        avalon$2.error('注释节点没有闭合' + str)
                    }
                    var nodeValue = str.slice(4, l).replace(rfill, fill)
                    this.str = str.slice(l + 3)
                    this.node = {
                        nodeName: '#comment',
                        nodeValue: nodeValue
                    }
                    this.tryGenChildren()
                }
            }
        },
        tryGenOpenTag: function tryGenOpenTag() {
            if (!this.node) {
                var str = this.str
                var match = str.match(ropenTag) //处理元素节点开始部分
                if (match) {
                    var nodeName = match[1]
                    var props = {}
                    if (/^[A-Z]/.test(nodeName) && avalon$2.components[nodeName]) {
                        props.is = nodeName
                    }
                    nodeName = nodeName.toLowerCase()
                    var isVoidTag = !!voidTag[nodeName] || match[3] === '\/'
                    var node = this.node = {
                        nodeName: nodeName,
                        props: {},
                        children: [],
                        isVoidTag: isVoidTag
                    }
                    var attrs = match[2]
                    if (attrs) {
                        this.genProps(attrs, node.props)
                    }
                    this.tryGenChildren()
                    str = str.slice(match[0].length)
                    if (isVoidTag) {
                        node.end = true
                    } else {
                        this.stack.push(node)
                        if (orphanTag[nodeName] || nodeName === 'option') {
                            var index = str.indexOf('</' + nodeName + '>')
                            var innerHTML = str.slice(0, index).trim()
                            str = str.slice(index)
                            makeOrphan(node, nodeName, nomalString(innerHTML))
                        }
                    }
                    this.str = str
                }
            }
        },
        tryGenCloseTag: function tryGenCloseTag() {
            if (!this.node) {
                var str = this.str
                var match = str.match(rendTag) //处理元素节点结束部分
                if (match) {
                    var nodeName = match[1].toLowerCase()
                    var last = this.stack.last()
                    /* istanbul ignore if*/
                    if (!last) {
                        avalon$2.error(match[0] + '前面缺少<' + nodeName + '>')
                        /* istanbul ignore else*/
                    } else if (last.nodeName !== nodeName) {
                        var errMsg = last.nodeName + '没有闭合,请注意属性的引号'
                        avalon$2.warn(errMsg)
                        avalon$2.error(errMsg)
                    }
                    var node = this.stack.pop()
                    node.end = true
                    this.node = node
                    this.str = str.slice(match[0].length)
                }
            }
        },
        tryGenChildren: function tryGenChildren() {
            var node = this.node
            var p = this.stack.last()
            if (p) {
                validateDOMNesting(p, node)
                p.children.push(node)
            } else {
                this.ret.push(node)
            }
        },
        genProps: function genProps(attrs, props) {

            while (attrs) {
                var arr = rattrs.exec(attrs)

                if (arr) {
                    var name = arr[1]
                    var value = arr[2] || ''
                    attrs = attrs.replace(arr[0], '')
                    if (value) {
                        //https://github.com/RubyLouvre/avalon/issues/1844
                        if (value.indexOf('??') === 0) {
                            value = nomalString(value).replace(rlineSp, '').slice(1, -1)
                        }
                    }
                    if (!(name in props)) {
                        props[name] = value
                    }
                } else {
                    break
                }
            }
        }
    }

    var vdomAst = new AST()

    function from(str) {
        var cacheKey = str
        var cached = strCache.get(cacheKey)
        if (cached) {
            return avalon$2.mix(true, [], cached)
        }
        stringPool.map = {}
        str = clearString(str)

        vdomAst.init(str)
        var ret = vdomAst.gen()
        strCache.put(cacheKey, avalon$2.mix(true, [], ret))
        return ret
    }

    var rhtml = /<|&#?\w+;/
    var htmlCache = new Cache(128)
    var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig

    avalon$2.parseHTML = function (html) {
        var fragment = createFragment()
        //处理非字符串
        if (typeof html !== 'string') {
            return fragment
        }
        //处理非HTML字符串
        if (!rhtml.test(html)) {
            return document$1.createTextNode(html)
        }

        html = html.replace(rxhtml, '<$1></$2>').trim()
        var hasCache = htmlCache.get(html)
        if (hasCache) {
            return avalon$2.cloneNode(hasCache)
        }
        var vnodes = fromString(html)
        for (var i = 0, el; el = vnodes[i++];) {
            var child = avalon$2.vdom(el, 'toDOM')
            fragment.appendChild(child)
        }
        if (html.length < 1024) {
            htmlCache.put(html, fragment)
        }
        return fragment
    }

    avalon$2.innerHTML = function (node, html) {
        var parsed = avalon$2.parseHTML(html)
        this.clearHTML(node)
        node.appendChild(parsed)
    }

    //https://github.com/karloespiritu/escapehtmlent/blob/master/index.js
    avalon$2.unescapeHTML = function (html) {
        return String(html).replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    }

    avalon$2.clearHTML = function (node) {
        /* istanbul ignore next */
        while (node.lastChild) {
            node.removeChild(node.lastChild)
        }
        return node
    }

    //http://www.feiesoft.com/html/events.html
    //http://segmentfault.com/q/1010000000687977/a-1020000000688757
    var canBubbleUp = {
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

    /* istanbul ignore if */
    var hackSafari = avalon$2.modern && document$1.ontouchstart

    //添加fn.bind, fn.unbind, bind, unbind
    avalon$2.fn.bind = function (type, fn, phase) {
        if (this[0]) {
            //此方法不会链
            return avalon$2.bind(this[0], type, fn, phase)
        }
    }

    avalon$2.fn.unbind = function (type, fn, phase) {
        if (this[0]) {
            var args = _slice.call(arguments)
            args.unshift(this[0])
            avalon$2.unbind.apply(0, args)
        }
        return this
    }

    /*绑定事件*/
    avalon$2.bind = function (elem, type, fn) {
        if (elem.nodeType === 1) {
            var value = elem.getAttribute('avalon-events') || ''
            //如果是使用ms-on-*绑定的回调,其uuid格式为e12122324,
            //如果是使用bind方法绑定的回调,其uuid格式为_12
            var uuid = getShortID(fn)
            var hook = eventHooks[type]
            /* istanbul ignore if */
            if (type === 'click' && hackSafari) {
                elem.addEventListener('click', avalon$2.noop)
            }
            /* istanbul ignore if */
            if (hook) {
                type = hook.type || type
                if (hook.fix) {
                    fn = hook.fix(elem, fn)
                    fn.uuid = uuid
                }
            }
            var key = type + ':' + uuid
            avalon$2.eventListeners[fn.uuid] = fn
            /* istanbul ignore if */
            if (value.indexOf(type + ':') === -1) {
                //同一种事件只绑定一次
                if (canBubbleUp[type] || avalon$2.modern && focusBlur[type]) {
                    delegateEvent(type)
                } else {
                    avalon$2._nativeBind(elem, type, dispatch)
                }
            }
            var keys = value.split(',')
            /* istanbul ignore if */
            if (keys[0] === '') {
                keys.shift()
            }
            if (keys.indexOf(key) === -1) {
                keys.push(key)
                setEventId(elem, keys.join(','))
                //将令牌放进avalon-events属性中
            }
            return fn
        } else {
            /* istanbul ignore next */
            var cb = function cb(e) {
                fn.call(elem, new avEvent(e))
            }

            avalon$2._nativeBind(elem, type, cb)
            return cb
        }
    }

    function setEventId(node, value) {
        node.setAttribute('avalon-events', value)
    }
    /* istanbul ignore next */
    avalon$2.unbind = function (elem, type, fn) {
        if (elem.nodeType === 1) {
            var value = elem.getAttribute('avalon-events') || ''
            switch (arguments.length) {
                case 1:
                    avalon$2._nativeUnBind(elem, type, dispatch)
                    elem.removeAttribute('avalon-events')
                    break
                case 2:
                    value = value.split(',').filter(function (str) {
                        return str.indexOf(type + ':') === -1
                    }).join(',')
                    setEventId(elem, value)
                    break
                default:
                    var search = type + ':' + fn.uuid
                    value = value.split(',').filter(function (str) {
                        return str !== search
                    }).join(',')
                    setEventId(elem, value)
                    delete avalon$2.eventListeners[fn.uuid]
                    break
            }
        } else {
            avalon$2._nativeUnBind(elem, type, fn)
        }
    }

    var typeRegExp = {}

    function collectHandlers(elem, type, handlers) {
        var value = elem.getAttribute('avalon-events')
        if (value && (elem.disabled !== true || type !== 'click')) {
            var uuids = []
            var reg = typeRegExp[type] || (typeRegExp[type] = new RegExp("\\b" + type + '\\:([^,\\s]+)', 'g'))
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
        var g = avalon$2.gestureEvents || {}
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
        var i = 0,
            j,
            uuid,
            handler
        while ((handler = handlers[i++]) && !event.cancelBubble) {
            var host = event.currentTarget = handler.elem
            j = 0
            while (uuid = handler.uuids[j++]) {
                if (event.stopImmediate) {
                    break
                }
                var fn = avalon$2.eventListeners[uuid]
                if (fn) {
                    var vm = rhandleHasVm.test(uuid) ? handler.elem._ms_context_ : 0
                    if (vm && vm.$hashcode === false) {
                        return avalon$2.unbind(elem, type, fn)
                    }
                    var ret = fn.call(vm || elem, event)

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

    function delegateEvent(type) {
        var value = root.getAttribute('delegate-events') || ''
        if (value.indexOf(type) === -1) {
            //IE6-8会多次绑定同种类型的同一个函数,其他游览器不会
            var arr = value.match(avalon$2.rword) || []
            arr.push(type)
            root.setAttribute('delegate-events', arr.join(','))
            avalon$2._nativeBind(root, type, dispatch, !!focusBlur[type])
        }
    }

    var eventProto = {
        webkitMovementY: 1,
        webkitMovementX: 1,
        keyLocation: 1,
        fixEvent: function fixEvent() {},
        preventDefault: function preventDefault() {
            var e = this.originalEvent || {}
            e.returnValue = this.returnValue = false
            if (modern && e.preventDefault) {
                e.preventDefault()
            }
        },
        stopPropagation: function stopPropagation() {
            var e = this.originalEvent || {}
            e.cancelBubble = this.cancelBubble = true
            if (modern && e.stopPropagation) {
                e.stopPropagation()
            }
        },
        stopImmediatePropagation: function stopImmediatePropagation() {
            this.stopPropagation()
            this.stopImmediate = true
        },
        toString: function toString() {
            return '[object Event]' //#1619
        }
    }

    function avEvent(event) {
        if (event.originalEvent) {
            return event
        }
        for (var i in event) {
            if (!eventProto[i]) {
                this[i] = event[i]
            }
        }
        if (!this.target) {
            this.target = event.srcElement
        }
        var target = this.target
        this.fixEvent()
        this.timeStamp = new Date() - 0
        this.originalEvent = event
    }
    avEvent.prototype = eventProto
    //针对firefox, chrome修正mouseenter, mouseleave
    /* istanbul ignore if */
    if (!('onmouseenter' in root)) {
        avalon$2.each({
            mouseenter: 'mouseover',
            mouseleave: 'mouseout'
        }, function (origType, fixType) {
            eventHooks[origType] = {
                type: fixType,
                fix: function fix(elem, fn) {
                    return function (e) {
                        var t = e.relatedTarget
                        if (!t || t !== elem && !(elem.compareDocumentPosition(t) & 16)) {
                            delete e.type
                            e.type = origType
                            return fn.apply(this, arguments)
                        }
                    }
                }
            }
        })
    }
    //针对IE9+, w3c修正animationend
    avalon$2.each({
        AnimationEvent: 'animationend',
        WebKitAnimationEvent: 'webkitAnimationEnd'
    }, function (construct, fixType) {
        if (window$1[construct] && !eventHooks.animationend) {
            eventHooks.animationend = {
                type: fixType
            }
        }
    })

    /* istanbul ignore if */
    if (!("onmousewheel" in document$1)) {
        /* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
         firefox DOMMouseScroll detail 下3 上-3
         firefox wheel detlaY 下3 上-3
         IE9-11 wheel deltaY 下40 上-40
         chrome wheel deltaY 下100 上-100 */
        var fixWheelType = document$1.onwheel !== void 0 ? 'wheel' : 'DOMMouseScroll'
        var fixWheelDelta = fixWheelType === 'wheel' ? 'deltaY' : 'detail'
        eventHooks.mousewheel = {
            type: fixWheelType,
            fix: function fix(elem, fn) {
                return function (e) {
                    var delta = e[fixWheelDelta] > 0 ? -120 : 120
                    e.wheelDelta = ~~elem._ms_wheel_ + delta
                    elem._ms_wheel_ = e.wheelDeltaY = e.wheelDelta
                    e.wheelDeltaX = 0
                    if (Object.defineProperty) {
                        Object.defineProperty(e, 'type', {
                            value: 'mousewheel'
                        })
                    }
                    return fn.apply(this, arguments)
                }
            }
        }
    }

    /* istanbul ignore next */
    avalon$2._nativeBind = function (el, type, fn, capture) {
        el.addEventListener(type, fn, !!capture)
    }

    /* istanbul ignore next */
    avalon$2._nativeUnBind = function (el, type, fn, a) {
        el.removeEventListener(type, fn, !!a)
    }

    /* istanbul ignore next */
    avalon$2.fireDom = function (elem, type, opts) {
        /* istanbul ignore else */
        if (document$1.createEvent) {
            var hackEvent = document$1.createEvent('Events')
            hackEvent.initEvent(type, true, true, opts)
            avalon$2.shadowCopy(hackEvent, opts)
            elem.dispatchEvent(hackEvent)
        }
    }

    var readyList = []

    function fireReady(fn) {
        avalon$2.isReady = true
        while (fn = readyList.shift()) {
            fn(avalon$2)
        }
    }

    avalon$2.ready = function (fn) {
        readyList.push(fn)
        if (avalon$2.isReady) {
            fireReady()
        }
    }

    avalon$2.ready(function () {
        avalon$2.scan && avalon$2.scan(document$1.body)
    })

    /* istanbul ignore next */
    function bootstrap() {
        if (document$1.readyState === 'complete') {
            setTimeout(fireReady) //如果在domReady之外加载
        } else {
            //必须传入三个参数，否则在firefox4-26中报错
            //caught exception: [Exception... "Not enough arguments"  nsresult: "0x80570001 (NS_ERROR_XPC_NOT_ENOUGH_ARGS)" 
            document$1.addEventListener('DOMContentLoaded', fireReady, false)
        }

        avalon$2.bind(window$1, 'load', fireReady)
    }

    if (inBrowser) {
        bootstrap()
    }

    /*******************************************************************
     *                          DOM Api                                 *
     *           shim,class,data,css,val,html,event,ready               *
     ********************************************************************/

    function fromDOM(dom) {
        return [from$1(dom)]
    }

    function from$1(node) {
        var type = node.nodeName.toLowerCase()
        switch (type) {
            case '#text':
            case '#comment':
                return {
                    nodeName: type,
                    dom: node,
                    nodeValue: node.nodeValue
                }
            default:
                var props = markProps(node, node.attributes || [])
                var vnode = {
                    nodeName: type,
                    dom: node,
                    isVoidTag: !!voidTag[type],
                    props: props
                }
                if (type === 'option') {
                    //即便你设置了option.selected = true,
                    //option.attributes也找不到selected属性
                    props.selected = node.selected
                }
                if (orphanTag[type] || type === 'option') {
                    makeOrphan(vnode, type, node.text || node.innerHTML)
                    if (node.childNodes.length === 1) {
                        vnode.children[0].dom = node.firstChild
                    }
                } else if (!vnode.isVoidTag) {
                    vnode.children = []
                    for (var i = 0, el; el = node.childNodes[i++];) {
                        var child = from$1(el)
                        if (/\S/.test(child.nodeValue)) {
                            vnode.children.push(child)
                        }
                    }
                }
                return vnode
        }
    }

    var rformElement = /input|textarea|select/i

    function markProps(node, attrs) {
        var ret = {}
        for (var i = 0, n = attrs.length; i < n; i++) {
            var attr = attrs[i]
            if (attr.specified) {
                //IE6-9不会将属性名变小写,比如它会将用户的contenteditable变成contentEditable
                ret[attr.name.toLowerCase()] = attr.value
            }
        }
        if (rformElement.test(node.nodeName)) {
            ret.type = node.type
            var a = node.getAttributeNode('value')
            if (a && /\S/.test(a.value)) {
                //IE6,7中无法取得checkbox,radio的value
                ret.value = a.value
            }
        }
        var style = node.style.cssText
        if (style) {
            ret.style = style
        }
        //类名 = 去重(静态类名+动态类名+ hover类名? + active类名)
        if (ret.type === 'select-one') {
            ret.selectedIndex = node.selectedIndex
        }
        return ret
    }

    function VText(text) {
        this.nodeName = '#text'
        this.nodeValue = text
    }

    VText.prototype = {
        constructor: VText,
        toDOM: function toDOM() {
            /* istanbul ignore if*/
            if (this.dom) return this.dom
            var v = avalon$2._decode(this.nodeValue)
            return this.dom = document$1.createTextNode(v)
        },
        toHTML: function toHTML() {
            return this.nodeValue
        }
    }

    function VComment(text) {
        this.nodeName = '#comment'
        this.nodeValue = text
    }
    VComment.prototype = {
        constructor: VComment,
        toDOM: function toDOM() {
            if (this.dom) return this.dom
            return this.dom = document$1.createComment(this.nodeValue)
        },
        toHTML: function toHTML() {
            return '<!--' + this.nodeValue + '-->'
        }
    }

    function VElement(type, props, children, isVoidTag) {
        this.nodeName = type
        this.props = props
        this.children = children
        this.isVoidTag = isVoidTag
    }
    VElement.prototype = {
        constructor: VElement,
        toDOM: function toDOM() {
            if (this.dom) return this.dom
            var dom,
                tagName = this.nodeName
            if (avalon$2.modern && svgTags[tagName]) {
                dom = createSVG(tagName)
            } else {
                dom = document$1.createElement(tagName)
            }
            var props = this.props || {}

            for (var i in props) {
                var val = props[i]
                if (skipFalseAndFunction(val)) {
                    dom.setAttribute(i, val + '')
                }
            }
            var c = this.children || []
            var template = c[0] ? c[0].nodeValue : ''
            switch (this.nodeName) {
                case 'xmp':
                case 'style':
                case 'script':
                case 'noscript':
                    dom.innerHTML = template
                    break
                case 'template':
                    if (supportTemplate) {
                        dom.innerHTML = template
                    } else {
                        /* istanbul ignore next*/
                        dom.textContent = template
                    }
                    break
                default:
                    if (!this.isVoidTag && this.children) {
                        this.children.forEach(function (el) {
                            return el && dom.appendChild(avalon$2.vdom(el, 'toDOM'))
                        })
                    }
                    break
            }
            return this.dom = dom
        },
        toHTML: function toHTML() {
            var arr = []
            var props = this.props || {}
            for (var i in props) {
                var val = props[i]
                if (skipFalseAndFunction(val)) {
                    arr.push(i + '=' + avalon$2.quote(props[i] + ''))
                }
            }
            arr = arr.length ? ' ' + arr.join(' ') : ''
            var str = '<' + this.nodeName + arr
            if (this.isVoidTag) {
                return str + '/>'
            }
            str += '>'
            if (this.children) {
                str += this.children.map(function (el) {
                    return el ? avalon$2.vdom(el, 'toHTML') : ''
                }).join('')
            }
            return str + '</' + this.nodeName + '>'
        }
    }

    function skipFalseAndFunction(a) {
        return a !== false && Object(a) !== a
    }

    function createSVG(type) {
        return document$1.createElementNS('http://www.w3.org/2000/svg', type)
    }

    var svgTags = avalon$2.oneObject('circle,defs,ellipse,image,line,' + 'path,polygon,polyline,rect,symbol,text,use,g,svg')

    if (avalon$2.inBrowser) {
        var supportTemplate = 'content' in document$1.createElement('template')
    }

    function VFragment(children, key, val, index) {
        this.nodeName = '#document-fragment'
        this.children = children
        this.key = key
        this.val = val
        this.index = index
        this.props = {}
    }
    VFragment.prototype = {
        constructor: VFragment,
        toDOM: function toDOM() {
            if (this.dom) return this.dom
            var f = this.toFragment()
            //IE6-11 docment-fragment都没有children属性 
            this.split = f.lastChild
            return this.dom = f
        },
        dispose: function dispose() {
            this.toFragment()
            this.innerRender && this.innerRender.dispose()
            for (var i in this) {
                this[i] = null
            }
        },
        toFragment: function toFragment() {
            var f = createFragment()
            this.children.forEach(function (el) {
                return f.appendChild(avalon$2.vdom(el, 'toDOM'))
            })
            return f
        },
        toHTML: function toHTML() {
            var c = this.children
            return c.map(function (el) {
                return avalon$2.vdom(el, 'toHTML')
            }).join('')
        }
    }

    /**
     * 虚拟DOM的4大构造器
     */
    avalon$2.mix(avalon$2, {
        VText: VText,
        VComment: VComment,
        VElement: VElement,
        VFragment: VFragment
    })

    var constNameMap = {
        '#text': 'VText',
        '#document-fragment': 'VFragment',
        '#comment': 'VComment'
    }

    var vdom = avalon$2.vdomAdaptor = avalon$2.vdom = function (obj, method) {
        if (!obj) {
            //obj在ms-for循环里面可能是null
            return method === "toHTML" ? '' : createFragment()
        }
        var nodeName = obj.nodeName
        if (!nodeName) {
            return new avalon$2.VFragment(obj)[method]()
        }
        var constName = constNameMap[nodeName] || 'VElement'
        return avalon$2[constName].prototype[method].call(obj)
    }

    avalon$2.domize = function (a) {
        return avalon$2.vdom(a, 'toDOM')
    }

    avalon$2.pendingActions = []
    avalon$2.uniqActions = {}
    avalon$2.inTransaction = 0
    config.trackDeps = false
    avalon$2.track = function () {
        if (config.trackDeps) {
            avalon$2.log.apply(avalon$2, arguments)
        }
    }

    /**
     * Batch is a pseudotransaction, just for purposes of memoizing ComputedValues when nothing else does.
     * During a batch `onBecomeUnobserved` will be called at most once per observable.
     * Avoids unnecessary recalculations.
     */

    function runActions() {
        if (avalon$2.isRunningActions === true || avalon$2.inTransaction > 0) return
        avalon$2.isRunningActions = true
        var tasks = avalon$2.pendingActions.splice(0, avalon$2.pendingActions.length)
        for (var i = 0, task; task = tasks[i++];) {
            task.update()
            delete avalon$2.uniqActions[task.uuid]
        }
        avalon$2.isRunningActions = false
    }

    function propagateChanged(target) {
        var list = target.observers
        for (var i = 0, el; el = list[i++];) {
            el.schedule() //通知action, computed做它们该做的事
        }
    }

    //将自己抛到市场上卖
    function reportObserved(target) {
        var action = avalon$2.trackingAction || null
        if (action !== null) {

            avalon$2.track('征收到', target.expr)
            action.mapIDs[target.uuid] = target
        }
    }

    var targetStack = []

    function collectDeps(action, getter) {
        if (!action.observers) return
        var preAction = avalon$2.trackingAction
        if (preAction) {
            targetStack.push(preAction)
        }
        avalon$2.trackingAction = action
        avalon$2.track('【action】', action.type, action.expr, '开始征收依赖项')
        //多个observe持有同一个action
        action.mapIDs = {} //重新收集依赖
        var hasError = true,
            result
        try {
            result = getter.call(action)
            hasError = false
        } finally {
            if (hasError) {
                avalon$2.warn('collectDeps fail', getter + '')
                action.mapIDs = {}
                avalon$2.trackingAction = preAction
            } else {
                // 确保它总是为null
                avalon$2.trackingAction = targetStack.pop()
                try {
                    resetDeps(action)
                } catch (e) {
                    avalon$2.warn(e)
                }
            }
            return result
        }
    }

    function resetDeps(action) {
        var prev = action.observers,
            curr = [],
            checked = {},
            ids = []
        for (var i in action.mapIDs) {
            var dep = action.mapIDs[i]
            if (!dep.isAction) {
                if (!dep.observers) {
                    //如果它已经被销毁
                    delete action.mapIDs[i]
                    continue
                }
                ids.push(dep.uuid)
                curr.push(dep)
                checked[dep.uuid] = 1
                if (dep.lastAccessedBy === action.uuid) {
                    continue
                }
                dep.lastAccessedBy = action.uuid
                avalon$2.Array.ensure(dep.observers, action)
            }
        }
        var ids = ids.sort().join(',')
        if (ids === action.ids) {
            return
        }
        action.ids = ids
        if (!action.isComputed) {
            action.observers = curr
        } else {
            action.depsCount = curr.length
            action.deps = avalon$2.mix({}, action.mapIDs)
            action.depsVersion = {}
            for (var _i in action.mapIDs) {
                var _dep = action.mapIDs[_i]
                action.depsVersion[_dep.uuid] = _dep.version
            }
        }

        for (var _i2 = 0, _dep2; _dep2 = prev[_i2++];) {
            if (!checked[_dep2.uuid]) {
                avalon$2.Array.remove(_dep2.observers, action)
            }
        }
    }

    function transaction(action, thisArg, args) {
        args = args || []
        var name = 'transaction ' + (action.name || action.displayName || 'noop')
        transactionStart(name)
        var res = action.apply(thisArg, args)
        transactionEnd(name)
        return res
    }
    avalon$2.transaction = transaction

    function transactionStart(name) {
        avalon$2.inTransaction += 1
    }

    function transactionEnd(name) {
        if (--avalon$2.inTransaction === 0) {
            avalon$2.isRunningActions = false
            runActions()
        }
    }

    var keyMap = avalon$2.oneObject("break,case,catch,continue,debugger,default,delete,do,else,false," + "finally,for,function,if,in,instanceof,new,null,return,switch,this," + "throw,true,try,typeof,var,void,while,with," + /* 关键字*/
    "abstract,boolean,byte,char,class,const,double,enum,export,extends," + "final,float,goto,implements,import,int,interface,long,native," + "package,private,protected,public,short,static,super,synchronized," + "throws,transient,volatile,arguments")

    var skipMap = avalon$2.mix({
        Math: 1,
        Date: 1,
        $event: 1,
        window: 1,
        __vmodel__: 1,
        avalon: 1
    }, keyMap)

    var rvmKey = /(^|[^\w\u00c0-\uFFFF_])(@|##)(?=[$\w])/g
    var ruselessSp = /\s*(\.|\|)\s*/g
    var rshortCircuit = /\|\|/g
    var brackets = /\(([^)]*)\)/
    var rpipeline = /\|(?=\?\?)/
    var rregexp = /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/g
    var robjectProp = /\.[\w\.\$]+/g //对象的属性 el.xxx 中的xxx
    var robjectKey = /(\{|\,)\s*([\$\w]+)\s*:/g //对象的键名与冒号 {xxx:1,yyy: 2}中的xxx, yyy
    var rfilterName = /\|(\w+)/g
    var rlocalVar = /[$a-zA-Z_][$a-zA-Z0-9_]*/g

    var exprCache = new Cache(300)

    function addScopeForLocal(str) {
        return str.replace(robjectProp, dig).replace(rlocalVar, function (el) {
            if (!skipMap[el]) {
                return "__vmodel__." + el
            }
            return el
        })
    }

    function addScope(expr, type) {
        var cacheKey = expr + ':' + type
        var cache = exprCache.get(cacheKey)
        if (cache) {
            return cache.slice(0)
        }

        stringPool.map = {}
        //https://github.com/RubyLouvre/avalon/issues/1849
        var input = expr.replace(rregexp, function (a, b) {
            return b + dig(a.slice(b.length))
        }) //移除所有正则
        input = clearString(input) //移除所有字符串
        input = input.replace(rshortCircuit, dig). //移除所有短路运算符
        replace(ruselessSp, '$1'). //移除.|两端空白

        replace(robjectKey, function (_, a, b) {
            //移除所有键名
            return a + dig(b) + ':' //比如 ms-widget="[{is:'ms-address-wrap', $id:'address'}]"这样极端的情况 
        }).replace(rvmKey, '$1__vmodel__.'). //转换@与##为__vmodel__
        replace(rfilterName, function (a, b) {
            //移除所有过滤器的名字
            return '|' + dig(b)
        })
        input = addScopeForLocal(input) //在本地变量前添加__vmodel__

        var filters = input.split(rpipeline) //根据管道符切割表达式
        var body = filters.shift().replace(rfill, fill).trim()
        if (/\?\?\d/.test(body)) {
            body = body.replace(rfill, fill)
        }
        if (filters.length) {
            filters = filters.map(function (filter) {
                var bracketArgs = ''
                filter = filter.replace(brackets, function (a, b) {
                    if (/\S/.test(b)) {
                        bracketArgs += ',' + b //还原字符串,正则,短路运算符
                    }
                    return ''
                })
                var arg = '[' + avalon$2.quote(filter.trim()) + bracketArgs + ']'
                return arg
            })
            filters = 'avalon.composeFilters(' + filters + ')(__value__)'
            filters = filters.replace(rfill, fill)
        } else {
            filters = ''
        }
        return exprCache.put(cacheKey, [body, filters])
    }
    var rhandleName = /^__vmodel__\.[$\w\.]+$/
    var rfixIE678 = /__vmodel__\.([^(]+)\(([^)]*)\)/
    function makeHandle(body) {
        if (rhandleName.test(body)) {
            body = body + '($event)'
        }
        /* istanbul ignore if */
        if (msie < 9) {
            body = body.replace(rfixIE678, function (a, b, c) {
                return '__vmodel__.' + b + '.call(__vmodel__' + (/\S/.test(c) ? ',' + c : '') + ')'
            })
        }
        return body
    }
    function createGetter(expr, type) {
        var arr = addScope(expr, type),
            body
        if (!arr[1]) {
            body = arr[0]
        } else {
            body = arr[1].replace(/__value__\)$/, arr[0] + ')')
        }
        try {
            return new Function('__vmodel__', 'return ' + body + ';')
            /* istanbul ignore next */
        } catch (e) {
            avalon$2.log('parse getter: [', expr, body, ']error')
            return avalon$2.noop
        }
    }

    /**
     * 生成表达式设值函数
     * @param  {String}  expr
     */
    function createSetter(expr, type) {
        var arr = addScope(expr, type)
        var body = 'try{ ' + arr[0] + ' = __value__}catch(e){}'
        try {
            return new Function('__vmodel__', '__value__', body + ';')
            /* istanbul ignore next */
        } catch (e) {
            avalon$2.log('parse setter: ', expr, ' error')
            return avalon$2.noop
        }
    }

    var actionUUID = 1
    //需要重构
    function Action(vm, options, callback) {
        for (var i in options) {
            if (protectedMenbers[i] !== 1) {
                this[i] = options[i]
            }
        }

        this.vm = vm
        this.observers = []
        this.callback = callback
        this.uuid = ++actionUUID
        this.ids = ''
        this.mapIDs = {} //这个用于去重
        this.isAction = true
        var expr = this.expr
        // 缓存取值函数
        if (typeof this.getter !== 'function') {
            this.getter = createGetter(expr, this.type)
        }
        // 缓存设值函数（双向数据绑定）
        if (this.type === 'duplex') {
            this.setter = createSetter(expr, this.type)
        }
        // 缓存表达式旧值
        this.value = NaN
        // 表达式初始值 & 提取依赖
        if (!this.node) {
            this.value = this.get()
        }
    }

    Action.prototype = {
        getValue: function getValue() {
            var scope = this.vm
            try {
                return this.getter.call(scope, scope)
            } catch (e) {
                avalon$2.log(this.getter + ' exec error')
            }
        },
        setValue: function setValue(value) {
            var scope = this.vm
            if (this.setter) {
                this.setter.call(scope, scope, value)
            }
        },


        // get --> getValue --> getter
        get: function get(fn) {
            var name = 'action track ' + this.type

            if (this.deep) {
                avalon$2.deepCollect = true
            }

            var value = collectDeps(this, this.getValue)
            if (this.deep && avalon$2.deepCollect) {
                avalon$2.deepCollect = false
            }

            return value
        },


        /**
         * 在更新视图前保存原有的value
         */
        beforeUpdate: function beforeUpdate() {
            return this.oldValue = getPlainObject(this.value)
        },
        update: function update(args, uuid) {
            var oldVal = this.beforeUpdate()
            var newVal = this.value = this.get()
            var callback = this.callback
            if (callback && this.diff(newVal, oldVal, args)) {
                callback.call(this.vm, this.value, oldVal, this.expr)
            }
            this._isScheduled = false
        },
        schedule: function schedule() {
            if (!this._isScheduled) {
                this._isScheduled = true
                if (!avalon$2.uniqActions[this.uuid]) {
                    avalon$2.uniqActions[this.uuid] = 1
                    avalon$2.pendingActions.push(this)
                }

                runActions() //这里会还原_isScheduled

            }
        },
        removeDepends: function removeDepends() {
            var self = this
            this.observers.forEach(function (depend) {
                avalon$2.Array.remove(depend.observers, self)
            })
        },


        /**
         * 比较两个计算值是否,一致,在for, class等能复杂数据类型的指令中,它们会重写diff复法
         */
        diff: function diff(a, b) {
            return a !== b
        },


        /**
         * 销毁指令
         */
        dispose: function dispose() {
            this.value = null
            this.removeDepends()
            if (this.beforeDispose) {
                this.beforeDispose()
            }
            for (var i in this) {
                delete this[i]
            }
        }
    }

    function getPlainObject(v) {
        if (v && typeof v === 'object') {
            if (v && v.$events) {
                return v.$model
            } else if (Array.isArray(v)) {
                var ret = []
                for (var i, n = v.length; i < n; i++) {
                    ret.push(getPlainObject(v[i]))
                }
                return ret
            } else {
                var _ret = {}
                for (var _i3 in v) {
                    _ret[_i3] = getPlainObject(v[_i3])
                }
                return _ret
            }
        } else {
            return v
        }
    }

    var protectedMenbers = {
        vm: 1,
        callback: 1,

        observers: 1,
        oldValue: 1,
        value: 1,
        getValue: 1,
        setValue: 1,
        get: 1,

        removeDepends: 1,
        beforeUpdate: 1,
        update: 1,
        //diff
        //getter
        //setter
        //expr
        //vdom
        //type: "for"
        //name: "ms-for"
        //attrName: ":for"
        //param: "click"
        //beforeDispose
        dispose: 1
    }

    /**
    * 
     与Computed等共享UUID
    */
    var obid = 1
    function Mutation(expr, value, vm) {
        //构造函数
        this.expr = expr
        if (value) {
            var childVm = platform.createProxy(value, this)
            if (childVm) {
                value = childVm
            }
        }
        this.value = value
        this.vm = vm
        try {
            vm.$mutations[expr] = this
        } catch (ignoreIE) {}
        this.uuid = ++obid
        this.updateVersion()
        this.mapIDs = {}
        this.observers = []
    }

    Mutation.prototype = {
        get: function get() {
            if (avalon$2.trackingAction) {
                this.collect() //被收集
                var childOb = this.value
                if (childOb && childOb.$events) {
                    if (Array.isArray(childOb)) {
                        childOb.forEach(function (item) {
                            if (item && item.$events) {
                                item.$events.__dep__.collect()
                            }
                        })
                    } else if (avalon$2.deepCollect) {
                        for (var key in childOb) {
                            if (childOb.hasOwnProperty(key)) {
                                var collectIt = childOb[key]
                            }
                        }
                    }
                }
            }
            return this.value
        },
        collect: function collect() {
            avalon$2.track(name, '被收集')
            reportObserved(this)
        },
        updateVersion: function updateVersion() {
            this.version = Math.random() + Math.random()
        },
        notify: function notify() {
            transactionStart()
            propagateChanged(this)
            transactionEnd()
        },
        set: function set(newValue) {
            var oldValue = this.value
            if (newValue !== oldValue) {
                if (avalon$2.isObject(newValue)) {
                    var hash = oldValue && oldValue.$hashcode
                    var childVM = platform.createProxy(newValue, this)
                    if (childVM) {
                        if (hash) {
                            childVM.$hashcode = hash
                        }
                        newValue = childVM
                    }
                }
                this.value = newValue
                this.updateVersion()
                this.notify()
            }
        }
    }

    function getBody(fn) {
        var entire = fn.toString()
        return entire.substring(entire.indexOf('{}') + 1, entire.lastIndexOf('}'))
    }
    //如果不存在三目,if,方法
    var instability = /(\?|if\b|\(.+\))/

    function __create(o) {
        var __ = function __() {}
        __.prototype = o
        return new __()
    }

    function __extends(child, parent) {
        if (typeof parent === 'function') {
            var proto = child.prototype = __create(parent.prototype)
            proto.constructor = child
        }
    }
    var Computed = function (_super) {
        __extends(Computed, _super)

        function Computed(name, options, vm) {
            //构造函数
            _super.call(this, name, undefined, vm)
            delete options.get
            delete options.set

            avalon$2.mix(this, options)
            this.deps = {}
            this.type = 'computed'
            this.depsVersion = {}
            this.isComputed = true
            this.trackAndCompute()
            if (!('isStable' in this)) {
                this.isStable = !instability.test(getBody(this.getter))
            }
        }
        var cp = Computed.prototype
        cp.trackAndCompute = function () {
            if (this.isStable && this.depsCount > 0) {
                this.getValue()
            } else {
                collectDeps(this, this.getValue.bind(this))
            }
        }

        cp.getValue = function () {
            return this.value = this.getter.call(this.vm)
        }

        cp.schedule = function () {
            var observers = this.observers
            var i = observers.length
            while (i--) {
                var d = observers[i]
                if (d.schedule) {
                    d.schedule()
                }
            }
        }

        cp.shouldCompute = function () {
            if (this.isStable) {
                //如果变动因子确定,那么只比较变动因子的版本
                var toComputed = false
                for (var i in this.deps) {
                    if (this.deps[i].version !== this.depsVersion[i]) {
                        toComputed = true
                        this.deps[i].version = this.depsVersion[i]
                    }
                }
                return toComputed
            }
            return true
        }
        cp.set = function () {
            if (this.setter) {
                avalon$2.transaction(this.setter, this.vm, arguments)
            }
        }
        cp.get = function () {

            //当被设置了就不稳定,当它被访问了一次就是稳定
            this.collect()

            if (this.shouldCompute()) {
                this.trackAndCompute()
                // console.log('computed 2 分支')
                this.updateVersion()
                //  this.reportChanged()
            }

            //下面这一行好像没用
            return this.value
        }
        return Computed
    }(Mutation)

    /**
     * 这里放置ViewModel模块的共用方法
     * avalon.define: 全框架最重要的方法,生成用户VM
     * IProxy, 基本用户数据产生的一个数据对象,基于$model与vmodel之间的形态
     * modelFactory: 生成用户VM
     * canHijack: 判定此属性是否该被劫持,加入数据监听与分发的的逻辑
     * createProxy: listFactory与modelFactory的封装
     * createAccessor: 实现数据监听与分发的重要对象
     * itemFactory: ms-for循环中产生的代理VM的生成工厂
     * fuseFactory: 两个ms-controller间产生的代理VM的生成工厂
     */

    avalon$2.define = function (definition) {
        var $id = definition.$id
        if (!$id) {
            avalon$2.error('vm.$id must be specified')
        }
        if (avalon$2.vmodels[$id]) {
            avalon$2.warn('error:[' + $id + '] had defined!')
        }
        var vm = platform.modelFactory(definition)
        return avalon$2.vmodels[$id] = vm
    }

    /**
     * 在未来的版本,avalon改用Proxy来创建VM,因此
     */

    function IProxy(definition, dd) {
        avalon$2.mix(this, definition)
        avalon$2.mix(this, $$skipArray)
        this.$hashcode = avalon$2.makeHashCode('$')
        this.$id = this.$id || this.$hashcode
        this.$events = {
            __dep__: dd || new Mutation(this.$id)
        }
        if (avalon$2.config.inProxyMode) {
            delete this.$mutations
            this.$accessors = {}
            this.$computed = {}
            this.$track = ''
        } else {
            this.$accessors = {
                $model: modelAccessor
            }
        }
        if (dd === void 0) {
            this.$watch = platform.watchFactory(this.$events)
            this.$fire = platform.fireFactory(this.$events)
        } else {
            delete this.$watch
            delete this.$fire
        }
    }

    platform.modelFactory = function modelFactory(definition, dd) {
        var $computed = definition.$computed || {}
        delete definition.$computed
        var core = new IProxy(definition, dd)
        var $accessors = core.$accessors
        var keys = []

        platform.hideProperty(core, '$mutations', {})

        for (var key in definition) {
            if (key in $$skipArray) continue
            var val = definition[key]
            keys.push(key)
            if (canHijack(key, val)) {
                $accessors[key] = createAccessor(key, val)
            }
        }
        for (var _key in $computed) {
            if (_key in $$skipArray) continue
            var val = $computed[_key]
            if (typeof val === 'function') {
                val = {
                    get: val
                }
            }
            if (val && val.get) {
                val.getter = val.get
                val.setter = val.set
                avalon$2.Array.ensure(keys, _key)
                $accessors[_key] = createAccessor(_key, val, true)
            }
        }
        //将系统API以unenumerable形式加入vm,
        //添加用户的其他不可监听属性或方法
        //重写$track
        //并在IE6-8中增添加不存在的hasOwnPropert方法
        var vm = platform.createViewModel(core, $accessors, core)
        platform.afterCreate(vm, core, keys, !dd)
        return vm
    }
    var $proxyItemBackdoorMap = {}

    function canHijack(key, val, $proxyItemBackdoor) {
        if (key in $$skipArray) return false
        if (key.charAt(0) === '$') {
            if ($proxyItemBackdoor) {
                if (!$proxyItemBackdoorMap[key]) {
                    $proxyItemBackdoorMap[key] = 1
                    avalon$2.warn('ms-for\u4E2D\u7684\u53D8\u91CF' + key + '\u4E0D\u518D\u5EFA\u8BAE\u4EE5$\u4E3A\u524D\u7F00')
                }
                return true
            }
            return false
        }
        if (val == null) {
            avalon$2.warn('定义vmodel时' + key + '的属性值不能为null undefine')
            return true
        }
        if (/error|date|function|regexp/.test(avalon$2.type(val))) {
            return false
        }
        return !(val && val.nodeName && val.nodeType)
    }

    function createProxy(target, dd) {
        if (target && target.$events) {
            return target
        }
        var vm
        if (Array.isArray(target)) {
            vm = platform.listFactory(target, false, dd)
        } else if (isObject(target)) {
            vm = platform.modelFactory(target, dd)
        }
        return vm
    }

    platform.createProxy = createProxy

    platform.itemFactory = function itemFactory(before, after) {
        var keyMap = before.$model
        var core = new IProxy(keyMap)
        var state = avalon$2.shadowCopy(core.$accessors, before.$accessors) //防止互相污染
        var data = after.data
        //core是包含系统属性的对象
        //keyMap是不包含系统属性的对象, keys
        for (var key in data) {
            var val = keyMap[key] = core[key] = data[key]
            state[key] = createAccessor(key, val)
        }
        var keys = Object.keys(keyMap)
        var vm = platform.createViewModel(core, state, core)
        platform.afterCreate(vm, core, keys)
        return vm
    }

    function createAccessor(key, val, isComputed) {
        var mutation = null
        var Accessor = isComputed ? Computed : Mutation
        return {
            get: function Getter() {
                if (!mutation) {
                    mutation = new Accessor(key, val, this)
                }
                return mutation.get()
            },
            set: function Setter(newValue) {
                if (!mutation) {
                    mutation = new Accessor(key, val, this)
                }
                mutation.set(newValue)
            },
            enumerable: true,
            configurable: true
        }
    }

    platform.fuseFactory = function fuseFactory(before, after) {
        var keyMap = avalon$2.mix(before.$model, after.$model)
        var core = new IProxy(avalon$2.mix(keyMap, {
            $id: before.$id + after.$id
        }))
        var state = avalon$2.mix(core.$accessors, before.$accessors, after.$accessors) //防止互相污染

        var keys = Object.keys(keyMap)
        //将系统API以unenumerable形式加入vm,并在IE6-8中添加hasOwnPropert方法
        var vm = platform.createViewModel(core, state, core)
        platform.afterCreate(vm, core, keys, false)
        return vm
    }

    function toJson(val) {
        var xtype = avalon$2.type(val)
        if (xtype === 'array') {
            var array = []
            for (var i = 0; i < val.length; i++) {
                array[i] = toJson(val[i])
            }
            return array
        } else if (xtype === 'object') {
            if (typeof val.$track === 'string') {
                var obj = {}
                var arr = val.$track.match(/[^☥]+/g) || []
                arr.forEach(function (i) {
                    var value = val[i]
                    obj[i] = value && value.$events ? toJson(value) : value
                })
                return obj
            }
        }
        return val
    }

    var modelAccessor = {
        get: function get() {
            return toJson(this)
        },
        set: avalon$2.noop,
        enumerable: false,
        configurable: true
    }

    platform.toJson = toJson
    platform.modelAccessor = modelAccessor

    var _splice = ap.splice
    var __array__ = {
        set: function set(index, val) {
            if (index >>> 0 === index && this[index] !== val) {
                if (index > this.length) {
                    throw Error(index + 'set方法的第一个参数不能大于原数组长度')
                }
                this.splice(index, 1, val)
            }
        },
        toJSON: function toJSON() {
            //为了解决IE6-8的解决,通过此方法显式地求取数组的$model
            return this.$model = platform.toJson(this)
        },
        contains: function contains(el) {
            //判定是否包含
            return this.indexOf(el) !== -1
        },
        ensure: function ensure(el) {
            if (!this.contains(el)) {
                //只有不存在才push
                this.push(el)
                return true
            }
            return false
        },
        pushArray: function pushArray(arr) {
            return this.push.apply(this, arr)
        },
        remove: function remove(el) {
            //移除第一个等于给定值的元素
            return this.removeAt(this.indexOf(el))
        },
        removeAt: function removeAt(index) {
            //移除指定索引上的元素
            if (index >>> 0 === index) {
                return this.splice(index, 1)
            }
            return []
        },
        clear: function clear() {
            this.removeAll()
            return this
        },
        removeAll: function removeAll(all) {
            //移除N个元素
            var size = this.length
            var eliminate = Array.isArray(all) ? function (el) {
                return all.indexOf(el) !== -1
            } : typeof all === 'function' ? all : false

            if (eliminate) {
                for (var i = this.length - 1; i >= 0; i--) {
                    if (eliminate(this[i], i)) {
                        _splice.call(this, i, 1)
                    }
                }
            } else {
                _splice.call(this, 0, this.length)
            }
            this.toJSON()
            this.$events.__dep__.notify()
        }
    }
    function hijackMethods(array) {
        for (var i in __array__) {
            platform.hideProperty(array, i, __array__[i])
        }
    }
    var __method__ = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

    __method__.forEach(function (method) {
        var original = ap[method]
        __array__[method] = function () {
            // 继续尝试劫持数组元素的属性
            var core = this.$events

            var args = platform.listFactory(arguments, true, core.__dep__)
            var result = original.apply(this, args)

            this.toJSON()
            core.__dep__.notify(method)
            return result
        }
    })

    function listFactory(array, stop, dd) {
        if (!stop) {
            hijackMethods(array)
            if (modern) {
                Object.defineProperty(array, '$model', platform.modelAccessor)
            }
            platform.hideProperty(array, '$hashcode', avalon$2.makeHashCode('$'))
            platform.hideProperty(array, '$events', { __dep__: dd || new Mutation() })
        }
        var _dd = array.$events && array.$events.__dep__
        for (var i = 0, n = array.length; i < n; i++) {
            var item = array[i]
            if (isObject(item)) {
                array[i] = platform.createProxy(item, _dd)
            }
        }
        return array
    }

    platform.listFactory = listFactory

    function hideProperty(host, name, value) {
        Object.defineProperty(host, name, {
            value: value,
            writable: true,
            enumerable: false,
            configurable: true
        })
    }

    function $fire(expr, a) {
        var list = this.$events[expr]
        if (Array.isArray(list)) {
            for (var i = 0, w; w = list[i++];) {
                w.callback.call(w.vm, a, w.value, w.expr)
            }
        }
    }

    function $watch(expr, callback, deep) {
        var core = this.$events
        var w = new Action(this, {
            deep: deep,
            type: 'user',
            expr: expr
        }, callback)
        if (!core[expr]) {
            core[expr] = [w]
        } else {
            core[expr].push(w)
        }
        return function () {
            w.dispose()
            avalon$2.Array.remove(core[expr], w)
            if (core[expr].length === 0) {
                delete core[expr]
            }
        }
    }
    function watchFactory(core) {
        return $watch
    }

    function fireFactory(core) {
        return $fire
    }

    function afterCreate(vm, core, keys, bindThis) {
        var ac = vm.$accessors
        //隐藏系统属性
        for (var key in $$skipArray) {
            hideProperty(vm, key, vm[key])
        }
        //为不可监听的属性或方法赋值
        for (var i = 0; i < keys.length; i++) {
            var _key2 = keys[i]
            if (!(_key2 in ac)) {
                var val = core[_key2]
                if (bindThis && typeof val === 'function') {
                    vm[_key2] = val.bind(vm)
                    vm[_key2]._orig = val
                    continue
                }
                vm[_key2] = val
            }
        }
        vm.$track = keys.join('☥')
        vm.$events.__proxy__ = vm
    }

    platform.fireFactory = fireFactory
    platform.watchFactory = watchFactory
    platform.afterCreate = afterCreate
    platform.hideProperty = hideProperty
    platform.createViewModel = Object.defineProperties

    if (typeof Proxy === 'function') {

        //https://developer.mozilla.org/en-US/docs/Archive/Web/Old_Proxy_API
        var toProxy = function toProxy(definition) {
            return Proxy.create ? Proxy.create(definition, traps) : new Proxy(definition, traps)
        }

        var wrapIt = function wrapIt(str) {
            return '☥' + str + '☥'
        }

        var updateTrack = function updateTrack(target, name) {
            var arr = target.$track.match(/[^☥]+/g) || []
            arr.push(name)
            target.$track = arr.sort().join('☥')
        }

        avalon$2.config.inProxyMode = true

        platform.modelFactory = function modelFactory(definition, dd) {
            var clone = {}
            for (var i in definition) {
                clone[i] = definition[i]
                delete definition[i]
            }

            definition.$id = clone.$id
            var proxy = new IProxy(definition, dd)

            var vm = toProxy(proxy)
            //先添加普通属性与监控属性
            for (var _i4 in clone) {
                vm[_i4] = clone[_i4]
            }
            var $computed = clone.$computed
            //再添加计算属性
            if ($computed) {
                delete clone.$computed
                for (var _i5 in $computed) {
                    var val = $computed[_i5]
                    if (typeof val === 'function') {
                        var _val = val
                        val = { get: _val }
                    }
                    if (val && val.get) {
                        val.getter = val.get
                        //在set方法中的target是IProxy，需要重写成Proxy，才能依赖收集
                        val.vm = vm
                        if (val.set) val.setter = val.set
                        $computed[_i5] = val
                        delete clone[_i5] //去掉重名的监控属性
                    } else {
                        delete $computed[_i5]
                    }
                }
                for (var _i6 in $computed) {
                    vm[_i6] = $computed[_i6]
                }
            }

            return vm
        }
        var traps = {
            deleteProperty: function deleteProperty(target, name) {
                if (target.hasOwnProperty(name)) {
                    //移除一个属性,分三昌:
                    //1. 移除监听器
                    //2. 移除真实对象的对应属性
                    //3. 移除$track中的键名
                    delete target.$accessors[name]
                    delete target[name]
                    target.$track = wrapIt(target.$track).replace(wrapIt(name), '').slice(1, -1)
                }
                return true
            },
            get: function get(target, name) {
                if (name === '$model') {
                    return platform.toJson(target)
                }
                //收集依赖
                var m = target.$accessors[name]
                if (m && m.get) {
                    return m.get()
                }

                return target[name]
            },
            set: function set(target, name, value) {
                if (name === '$model' || name === '$track') {
                    return true
                }
                if (name in $$skipArray) {
                    target[name] = value
                    return true
                }

                var ac = target.$accessors
                var oldValue = ac[name] ? ac[name].value : target[name]

                if (oldValue !== value) {
                    if (!target.hasOwnProperty(name)) {
                        updateTrack(target, name)
                    }
                    if (canHijack(name, value, target.$proxyItemBackdoor)) {
                        var $computed = target.$computed || {}
                        //如果是新属性
                        if (!ac[name]) {
                            target[name] = value //必须设置，用于hasOwnProperty
                            var isComputed = !!$computed[name]
                            var Observable = isComputed ? Computed : Mutation
                            ac[name] = new Observable(name, value, target)
                            return true
                        }
                        var mutation = ac[name]
                        //创建子对象
                        mutation.set(value)
                        target[name] = mutation.value
                    } else {
                        target[name] = value
                    }
                }
                // set方法必须返回true, 告诉Proxy已经成功修改了这个值,否则会抛
                //'set' on proxy: trap returned falsish for property xxx 错误
                return true
            }
            //has 只能用于 in 操作符，没什么用删去

        }

        avalon$2.itemFactory = platform.itemFactory = function itemFactory(before, after) {
            var definition = before.$model
            definition.$proxyItemBackdoor = true
            definition.$id = before.$hashcode + String(after.hashcode || Math.random()).slice(6)
            definition.$accessors = avalon$2.mix({}, before.$accessors)
            var vm = platform.modelFactory(definition)
            vm.$track = before.$track
            for (var i in after.data) {
                vm[i] = after.data[i]
            }
            return vm
        }

        platform.fuseFactory = function fuseFactory(before, after) {
            var definition = avalon$2.mix(before.$model, after.$model)
            definition.$id = before.$hashcode + after.$hashcode
            definition.$accessors = avalon$2.mix({}, before.$accessors, after.$accessors)
            return platform.modelFactory(definition)
        }
    }

    var impDir = avalon$2.directive('important', {
        priority: 1,
        getScope: function getScope(name, scope) {
            var v = avalon$2.vmodels[name]
            if (v) return v
            throw 'error! no vmodel called ' + name
        },
        update: function update(node, attrName, $id) {
            if (!avalon$2.inBrowser) return
            var dom = avalon$2.vdom(node, 'toDOM')
            if (dom.nodeType === 1) {
                dom.removeAttribute(attrName)
                avalon$2(dom).removeClass('ms-controller')
            }
            var vm = avalon$2.vmodels[$id]
            if (vm) {
                vm.$element = dom
                vm.$render = this
                vm.$fire('onReady')
                delete vm.$events.onReady
            }
        }
    })

    var impCb = impDir.update

    avalon$2.directive('controller', {
        priority: 2,
        getScope: function getScope(name, scope) {
            var v = avalon$2.vmodels[name]
            if (v) {
                v.$render = this
                if (scope && scope !== v) {
                    return platform.fuseFactory(scope, v)
                }
                return v
            }
            return scope
        },
        update: impCb
    })

    avalon$2.directive('skip', {
        delay: true
    })

    var arrayWarn = {}
    var cssDir = avalon$2.directive('css', {
        diff: function diff(newVal, oldVal) {
            if (Object(newVal) === newVal) {
                newVal = platform.toJson(newVal) //安全的遍历VBscript
                if (Array.isArray(newVal)) {
                    //转换成对象
                    var b = {}
                    newVal.forEach(function (el) {
                        el && avalon$2.shadowCopy(b, el)
                    })
                    newVal = b
                    if (!arrayWarn[this.type]) {
                        avalon$2.warn('ms-' + this.type + '指令的值不建议使用数组形式了！')
                        arrayWarn[this.type] = 1
                    }
                }

                var hasChange = false
                var patch = {}
                if (!oldVal) {
                    //如果一开始为空
                    patch = newVal
                    hasChange = true
                } else {
                    if (this.deep) {
                        var deep = typeof this.deep === 'number' ? this.deep : 6
                        for (var i in newVal) {
                            //diff差异点  
                            if (!deepEquals(newVal[i], oldVal[i], 4)) {
                                this.value = newVal
                                return true
                            }
                            patch[i] = newVal[i]
                        }
                    } else {
                        for (var _i7 in newVal) {
                            //diff差异点
                            if (newVal[_i7] !== oldVal[_i7]) {
                                hasChange = true
                            }
                            patch[_i7] = newVal[_i7]
                        }
                    }

                    for (var _i8 in oldVal) {
                        if (!(_i8 in patch)) {
                            hasChange = true
                            patch[_i8] = ''
                        }
                    }
                }
                if (hasChange) {
                    this.value = patch
                    return true
                }
            }
            return false
        },
        update: function update(vdom, value) {

            var dom = vdom.dom
            if (dom && dom.nodeType === 1) {
                var wrap = avalon$2(dom)
                for (var name in value) {
                    wrap.css(name, value[name])
                }
            }
        }
    })

    var cssDiff = cssDir.diff

    function getEnumerableKeys(obj) {
        var res = []
        for (var key in obj) {
            res.push(key)
        }return res
    }

    function deepEquals(a, b, level) {
        if (level === 0) return a === b
        if (a === null && b === null) return true
        if (a === undefined && b === undefined) return true
        var aIsArray = Array.isArray(a)
        if (aIsArray !== Array.isArray(b)) {
            return false
        }
        if (aIsArray) {
            return equalArray(a, b, level)
        } else if (typeof a === "object" && typeof b === "object") {
            return equalObject(a, b, level)
        }
        return a === b
    }

    function equalArray(a, b, level) {
        if (a.length !== b.length) {
            return false
        }
        for (var i = a.length - 1; i >= 0; i--) {
            try {
                if (!deepEquals(a[i], b[i], level - 1)) {
                    return false
                }
            } catch (noThisPropError) {
                return false
            }
        }
        return true
    }

    function equalObject(a, b, level) {
        if (a === null || b === null) return false
        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length) return false
        for (var prop in a) {
            if (!(prop in b)) return false
            try {
                if (!deepEquals(a[prop], b[prop], level - 1)) {
                    return false
                }
            } catch (noThisPropError) {
                return false
            }
        }
        return true
    }

    /**
     * ------------------------------------------------------------
     * 检测浏览器对CSS动画的支持与API名
     * ------------------------------------------------------------
     */

    var checker = {
        TransitionEvent: 'transitionend',
        WebKitTransitionEvent: 'webkitTransitionEnd',
        OTransitionEvent: 'oTransitionEnd',
        otransitionEvent: 'otransitionEnd'
    }
    var css3 = void 0
    var tran = void 0
    var ani = void 0
    var name$2 = void 0
    var animationEndEvent = void 0
    var transitionEndEvent = void 0
    var transition = false
    var animation = false
    //有的浏览器同时支持私有实现与标准写法，比如webkit支持前两种，Opera支持1、3、4
    for (name$2 in checker) {
        if (window$1[name$2]) {
            tran = checker[name$2]
            break
        }
        /* istanbul ignore next */
        try {
            var a = document.createEvent(name$2)
            tran = checker[name$2]
            break
        } catch (e) {}
    }
    if (typeof tran === 'string') {
        transition = css3 = true
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
    for (name$2 in checker) {
        if (window$1[name$2]) {
            ani = checker[name$2]
            break
        }
    }
    if (typeof ani === 'string') {
        animation = css3 = true
        animationEndEvent = ani
    }

    var effectDir = avalon$2.directive('effect', {
        priority: 5,
        diff: function diff(effect) {
            var vdom = this.node
            if (typeof effect === 'string') {
                this.value = effect = {
                    is: effect
                }
                avalon$2.warn('ms-effect的指令值不再支持字符串,必须是一个对象')
            }
            this.value = vdom.effect = effect
            var ok = cssDiff.call(this, effect, this.oldValue)
            var me = this
            if (ok) {
                setTimeout(function () {
                    vdom.animating = true
                    effectDir.update.call(me, vdom, vdom.effect)
                })
                vdom.animating = false
                return true
            }
            return false
        },

        update: function update(vdom, change, opts) {
            var dom = vdom.dom
            if (dom && dom.nodeType === 1) {
                //要求配置对象必须指定is属性，action必须是布尔或enter,leave,move
                var option = change || opts
                var is = option.is

                var globalOption = avalon$2.effects[is]
                if (!globalOption) {
                    //如果没有定义特效
                    avalon$2.warn(is + ' effect is undefined')
                    return
                }
                var finalOption = {}
                var action = actionMaps[option.action]
                if (typeof Effect.prototype[action] !== 'function') {
                    avalon$2.warn('action is undefined')
                    return
                }
                //必须预定义特效

                var effect = new avalon$2.Effect(dom)
                avalon$2.mix(finalOption, globalOption, option, { action: action })

                if (finalOption.queue) {
                    animationQueue.push(function () {
                        effect[action](finalOption)
                    })
                    callNextAnimation()
                } else {

                    effect[action](finalOption)
                }
                return true
            }
        }
    })

    var move = 'move'
    var leave = 'leave'
    var enter = 'enter'
    var actionMaps = {
        'true': enter,
        'false': leave,
        enter: enter,
        leave: leave,
        move: move,
        'undefined': enter
    }

    var animationQueue = []
    function callNextAnimation() {
        var fn = animationQueue[0]
        if (fn) {
            fn()
        }
    }

    avalon$2.effects = {}
    avalon$2.effect = function (name, opts) {
        var definition = avalon$2.effects[name] = opts || {}
        if (css3 && definition.css !== false) {
            patchObject(definition, 'enterClass', name + '-enter')
            patchObject(definition, 'enterActiveClass', definition.enterClass + '-active')
            patchObject(definition, 'leaveClass', name + '-leave')
            patchObject(definition, 'leaveActiveClass', definition.leaveClass + '-active')
        }
        return definition
    }

    function patchObject(obj, name, value) {
        if (!obj[name]) {
            obj[name] = value
        }
    }

    var Effect = function Effect(dom) {
        this.dom = dom
    }

    avalon$2.Effect = Effect

    Effect.prototype = {
        enter: createAction('Enter'),
        leave: createAction('Leave'),
        move: createAction('Move')
    }

    function execHooks(options, name, el) {
        var fns = [].concat(options[name])
        for (var i = 0, fn; fn = fns[i++];) {
            if (typeof fn === 'function') {
                fn(el)
            }
        }
    }
    var staggerCache = new Cache(128)

    function createAction(action) {
        var lower = action.toLowerCase()
        return function (option) {
            var dom = this.dom
            var elem = avalon$2(dom)
            //处理与ms-for指令相关的stagger
            //========BEGIN=====
            var staggerTime = isFinite(option.stagger) ? option.stagger * 1000 : 0
            if (staggerTime) {
                if (option.staggerKey) {
                    var stagger = staggerCache.get(option.staggerKey) || staggerCache.put(option.staggerKey, {
                        count: 0,
                        items: 0
                    })
                    stagger.count++
                    stagger.items++
                }
            }
            var staggerIndex = stagger && stagger.count || 0
            //=======END==========
            var stopAnimationID
            var animationDone = function animationDone(e) {
                var isOk = e !== false
                if (--dom.__ms_effect_ === 0) {
                    avalon$2.unbind(dom, transitionEndEvent)
                    avalon$2.unbind(dom, animationEndEvent)
                }
                clearTimeout(stopAnimationID)
                var dirWord = isOk ? 'Done' : 'Abort'
                execHooks(option, 'on' + action + dirWord, dom)
                if (stagger) {
                    if (--stagger.items === 0) {
                        stagger.count = 0
                    }
                }
                if (option.queue) {
                    animationQueue.shift()
                    callNextAnimation()
                }
            }
            //执行开始前的钩子
            execHooks(option, 'onBefore' + action, dom)

            if (option[lower]) {
                //使用JS方式执行动画
                option[lower](dom, function (ok) {
                    animationDone(ok !== false)
                })
            } else if (css3) {
                //使用CSS3方式执行动画
                elem.addClass(option[lower + 'Class'])
                elem.removeClass(getNeedRemoved(option, lower))

                if (!dom.__ms_effect_) {
                    //绑定动画结束事件
                    elem.bind(transitionEndEvent, animationDone)
                    elem.bind(animationEndEvent, animationDone)
                    dom.__ms_effect_ = 1
                } else {
                    dom.__ms_effect_++
                }
                setTimeout(function () {
                    //用xxx-active代替xxx类名的方式 触发CSS3动画
                    var time = avalon$2.root.offsetWidth === NaN
                    elem.addClass(option[lower + 'ActiveClass'])
                    //计算动画时长
                    time = getAnimationTime(dom)
                    if (!time === 0) {
                        //立即结束动画
                        animationDone(false)
                    } else if (!staggerTime) {
                        //如果动画超出时长还没有调用结束事件,这可能是元素被移除了
                        //如果强制结束动画
                        stopAnimationID = setTimeout(function () {
                            animationDone(false)
                        }, time + 32)
                    }
                }, 17 + staggerTime * staggerIndex) // = 1000/60
            }
        }
    }

    avalon$2.applyEffect = function (dom, vdom, opts) {
        var cb = opts.cb
        var curEffect = vdom.effect
        if (curEffect && dom && dom.nodeType === 1) {
            var hook = opts.hook
            var old = curEffect[hook]
            if (cb) {
                if (Array.isArray(old)) {
                    old.push(cb)
                } else if (old) {
                    curEffect[hook] = [old, cb]
                } else {
                    curEffect[hook] = [cb]
                }
            }
            getAction(opts)
            avalon$2.directives.effect.update(vdom, curEffect, avalon$2.shadowCopy({}, opts))
        } else if (cb) {
            cb(dom)
        }
    }
    /**
     * 获取方向
     */
    function getAction(opts) {
        if (!opts.action) {
            return opts.action = opts.hook.replace(/^on/, '').replace(/Done$/, '').toLowerCase()
        }
    }
    /**
     * 需要移除的类名
     */
    function getNeedRemoved(options, name) {
        var name = name === 'leave' ? 'enter' : 'leave'
        return Array(name + 'Class', name + 'ActiveClass').map(function (cls) {
            return options[cls]
        }).join(' ')
    }
    /**
     * 计算动画长度
     */
    var transitionDuration = avalon$2.cssName('transition-duration')
    var animationDuration = avalon$2.cssName('animation-duration')
    var rsecond = /\d+s$/
    function toMillisecond(str) {
        var ratio = rsecond.test(str) ? 1000 : 1
        return parseFloat(str) * ratio
    }

    function getAnimationTime(dom) {
        var computedStyles = window$1.getComputedStyle(dom, null)
        var tranDuration = computedStyles[transitionDuration]
        var animDuration = computedStyles[animationDuration]
        return toMillisecond(tranDuration) || toMillisecond(animDuration)
    }
    /**
     * 
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="dist/avalon.js"></script>
            <script>
                avalon.effect('animate')
                var vm = avalon.define({
                    $id: 'ani',
                    a: true
                })
            </script>
            <style>
                .animate-enter, .animate-leave{
                    width:100px;
                    height:100px;
                    background: #29b6f6;
                    transition:all 2s;
                    -moz-transition: all 2s; 
                    -webkit-transition: all 2s;
                    -o-transition:all 2s;
                }  
                .animate-enter-active, .animate-leave{
                    width:300px;
                    height:300px;
                }
                .animate-leave-active{
                    width:100px;
                    height:100px;
                }
            </style>
        </head>
        <body>
            <div :controller='ani' >
                <p><input type='button' value='click' :click='@a =!@a'></p>
                <div :effect="{is:'animate',action:@a}"></div>
            </div>
    </body>
    </html>
     * 
     */

    var none = 'none'
    function parseDisplay(elem, val) {
        //用于取得此类标签的默认display值
        var doc = elem.ownerDocument
        var nodeName = elem.nodeName
        var key = '_' + nodeName
        if (!parseDisplay[key]) {
            var temp = doc.body.appendChild(doc.createElement(nodeName))
            val = avalon$2.css(temp, 'display')
            doc.body.removeChild(temp)
            if (val === none) {
                val = 'block'
            }
            parseDisplay[key] = val
        }
        return parseDisplay[key]
    }

    avalon$2.parseDisplay = parseDisplay
    avalon$2.directive('visible', {
        diff: function diff(newVal, oldVal) {
            var n = !!newVal
            if (oldVal === void 0 || n !== oldVal) {
                this.value = n
                return true
            }
        },
        ready: true,
        update: function update(vdom, show) {
            var dom = vdom.dom
            if (dom && dom.nodeType === 1) {
                var display = dom.style.display
                var value
                if (show) {
                    if (display === none) {
                        value = vdom.displayValue
                        if (!value) {
                            dom.style.display = ''
                            if (dom.style.cssText === '') {
                                dom.removeAttribute('style')
                            }
                        }
                    }
                    if (dom.style.display === '' && avalon$2(dom).css('display') === none &&
                    // fix firefox BUG,必须挂到页面上
                    avalon$2.contains(dom.ownerDocument, dom)) {
                        value = parseDisplay(dom)
                    }
                } else {

                    if (display !== none) {
                        value = none
                        vdom.displayValue = display
                    }
                }
                var cb = function cb() {
                    if (value !== void 0) {
                        dom.style.display = value
                    }
                }

                avalon$2.applyEffect(dom, vdom, {
                    hook: show ? 'onEnterDone' : 'onLeaveDone',
                    cb: cb
                })
            }
        }
    })

    avalon$2.directive('text', {
        delay: true,
        init: function init() {

            var node = this.node
            if (node.isVoidTag) {
                avalon$2.error('自闭合元素不能使用ms-text')
            }
            var child = { nodeName: '#text', nodeValue: this.getValue() }
            node.children.splice(0, node.children.length, child)
            if (inBrowser) {
                avalon$2.clearHTML(node.dom)
                node.dom.appendChild(avalon$2.vdom(child, 'toDOM'))
            }
            this.node = child
            var type = 'expr'
            this.type = this.name = type
            var directive$$1 = avalon$2.directives[type]
            var me = this
            this.callback = function (value) {
                directive$$1.update.call(me, me.node, value)
            }
        }
    })

    avalon$2.directive('expr', {
        update: function update(vdom, value) {
            value = value == null || value === '' ? '\u200B' : value
            vdom.nodeValue = value
            //https://github.com/RubyLouvre/avalon/issues/1834
            if (vdom.dom) vdom.dom.data = value
        }
    })

    avalon$2.directive('attr', {
        diff: cssDiff,
        update: function update(vdom, value) {
            var props = vdom.props
            for (var i in value) {
                if (!!value[i] === false) {
                    delete props[i]
                } else {
                    props[i] = value[i]
                }
            }
            var dom = vdom.dom
            if (dom && dom.nodeType === 1) {
                updateAttrs(dom, value)
            }
        }
    })

    avalon$2.directive('html', {

        update: function update(vdom, value) {
            this.beforeDispose()

            this.innerRender = avalon$2.scan('<div class="ms-html-container">' + value + '</div>', this.vm, function () {
                var oldRoot = this.root
                if (vdom.children) vdom.children.length = 0
                vdom.children = oldRoot.children
                this.root = vdom
                if (vdom.dom) avalon$2.clearHTML(vdom.dom)
            })
        },
        beforeDispose: function beforeDispose() {
            if (this.innerRender) {
                this.innerRender.dispose()
            }
        },
        delay: true
    })

    avalon$2.directive('if', {
        delay: true,
        priority: 5,
        init: function init() {
            this.placeholder = createAnchor('if')
            var props = this.node.props
            delete props['ms-if']
            delete props[':if']
            this.fragment = avalon$2.vdom(this.node, 'toHTML')
        },
        diff: function diff(newVal, oldVal) {
            var n = !!newVal
            if (oldVal === void 0 || n !== oldVal) {
                this.value = n
                return true
            }
        },
        update: function update(vdom, value) {
            if (this.isShow === void 0 && value) {
                continueScan(this, vdom)
                return
            }
            this.isShow = value
            var placeholder = this.placeholder

            if (value) {
                var p = placeholder.parentNode
                continueScan(this, vdom)
                p && p.replaceChild(vdom.dom, placeholder)
            } else {
                //移除DOM
                this.beforeDispose()
                vdom.nodeValue = 'if'
                vdom.nodeName = '#comment'
                delete vdom.children
                var dom = vdom.dom
                var p = dom && dom.parentNode
                vdom.dom = placeholder
                if (p) {
                    p.replaceChild(placeholder, dom)
                }
            }
        },
        beforeDispose: function beforeDispose() {
            if (this.innerRender) {
                this.innerRender.dispose()
            }
        }
    })

    function continueScan(instance, vdom) {
        var innerRender = instance.innerRender = avalon$2.scan(instance.fragment, instance.vm)
        avalon$2.shadowCopy(vdom, innerRender.root)
        delete vdom.nodeValue
    }

    avalon$2.directive('on', {
        beforeInit: function beforeInit() {
            this.getter = avalon$2.noop
        },
        init: function init() {
            var vdom = this.node
            var underline = this.name.replace('ms-on-', 'e').replace('-', '_')
            var uuid = underline + '_' + this.expr.replace(/\s/g, '').replace(/[^$a-z]/ig, function (e) {
                return e.charCodeAt(0)
            })
            var fn = avalon$2.eventListeners[uuid]
            if (!fn) {
                var arr = addScope(this.expr)
                var body = arr[0],
                    filters = arr[1]
                body = makeHandle(body)

                if (filters) {
                    filters = filters.replace(/__value__/g, '$event')
                    filters += '\nif($event.$return){\n\treturn;\n}'
                }
                var ret = ['try{', '\tvar __vmodel__ = this;', '\t' + filters, '\treturn ' + body, '}catch(e){avalon.log(e, "in on dir")}'].filter(function (el) {
                    return (/\S/.test(el)
                    )
                })
                fn = new Function('$event', ret.join('\n'))
                fn.uuid = uuid
                avalon$2.eventListeners[uuid] = fn
            }

            var dom = avalon$2.vdom(vdom, 'toDOM')
            dom._ms_context_ = this.vm

            this.eventType = this.param.replace(/\-(\d)$/, '')
            delete this.param
            avalon$2(dom).bind(this.eventType, fn)
        },

        beforeDispose: function beforeDispose() {
            avalon$2(this.node.dom).unbind(this.eventType)
        }
    })

    var rforAs = /\s+as\s+([$\w]+)/
    var rident = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
    var rinvalid = /^(null|undefined|NaN|window|this|\$index|\$id)$/
    var rargs = /[$\w_]+/g
    avalon$2.directive('for', {
        delay: true,
        priority: 3,
        beforeInit: function beforeInit() {
            var str = this.expr,
                asName
            str = str.replace(rforAs, function (a, b) {
                /* istanbul ignore if */
                if (!rident.test(b) || rinvalid.test(b)) {
                    avalon$2.error('alias ' + b + ' is invalid --- must be a valid JS identifier which is not a reserved name.')
                } else {
                    asName = b
                }
                return ''
            })

            var arr = str.split(' in ')
            var kv = arr[0].match(rargs)
            if (kv.length === 1) {
                //确保avalon._each的回调有三个参数
                kv.unshift('$key')
            }
            this.expr = arr[1]
            this.keyName = kv[0]
            this.valName = kv[1]
            this.signature = avalon$2.makeHashCode('for')
            if (asName) {
                this.asName = asName
            }

            delete this.param
        },
        init: function init() {
            var cb = this.userCb
            if (typeof cb === 'string' && cb) {
                var arr = addScope(cb, 'for')
                var body = makeHandle(arr[0])
                this.userCb = new Function('$event', 'var __vmodel__ = this\nreturn ' + body)
            }
            this.node.forDir = this //暴露给component/index.js中的resetParentChildren方法使用
            this.fragment = ['<div>', this.fragment, '<!--', this.signature, '--></div>'].join('')
            this.cache = {}
        },
        diff: function diff(newVal, oldVal) {
            /* istanbul ignore if */
            if (this.updating) {
                return
            }
            this.updating = true
            var traceIds = createFragments(this, newVal)

            if (this.oldTrackIds === void 0) return true

            if (this.oldTrackIds !== traceIds) {
                this.oldTrackIds = traceIds
                return true
            }
        },
        update: function update() {

            if (!this.preFragments) {
                this.fragments = this.fragments || []
                mountList(this)
            } else {
                diffList(this)
                updateList(this)
            }

            if (this.userCb) {
                var me = this
                setTimeout(function () {
                    me.userCb.call(me.vm, {
                        type: 'rendered',
                        target: me.begin.dom,
                        signature: me.signature
                    })
                }, 0)
            }
            delete this.updating
        },
        beforeDispose: function beforeDispose() {
            this.fragments.forEach(function (el) {
                el.dispose()
            })
        }
    })

    function getTraceKey(item) {
        var type = typeof item
        return item && type === 'object' ? item.$hashcode : type + ':' + item
    }

    //创建一组fragment的虚拟DOM
    function createFragments(instance, obj) {
        if (isObject(obj)) {
            var array = Array.isArray(obj)
            var ids = []
            var fragments = [],
                i = 0

            instance.isArray = array
            if (instance.fragments) {
                instance.preFragments = instance.fragments
                avalon$2.each(obj, function (key, value) {
                    var k = array ? getTraceKey(value) : key

                    fragments.push({
                        key: k,
                        val: value,
                        index: i++
                    })
                    ids.push(k)
                })
                instance.fragments = fragments
            } else {
                avalon$2.each(obj, function (key, value) {
                    if (!(key in $$skipArray)) {
                        var k = array ? getTraceKey(value) : key
                        fragments.push(new VFragment([], k, value, i++))
                        ids.push(k)
                    }
                })
                instance.fragments = fragments
            }
            return ids.join(';;')
        } else {
            return NaN
        }
    }

    function mountList(instance) {
        var args = instance.fragments.map(function (fragment, index) {
            FragmentDecorator(fragment, instance, index)
            saveInCache(instance.cache, fragment)
            return fragment
        })
        var list = instance.parentChildren
        var i = list.indexOf(instance.begin)
        list.splice.apply(list, [i + 1, 0].concat(args))
    }

    function diffList(instance) {
        var cache = instance.cache
        var newCache = {}
        var fuzzy = []
        var list = instance.preFragments

        list.forEach(function (el) {
            el._dispose = true
        })

        instance.fragments.forEach(function (c, index) {
            var fragment = isInCache(cache, c.key)
            //取出之前的文档碎片
            if (fragment) {
                delete fragment._dispose
                fragment.oldIndex = fragment.index
                fragment.index = index // 相当于 c.index

                resetVM(fragment.vm, instance.keyName)
                fragment.vm[instance.valName] = c.val
                fragment.vm[instance.keyName] = instance.isArray ? index : fragment.key
                saveInCache(newCache, fragment)
            } else {
                //如果找不到就进行模糊搜索
                fuzzy.push(c)
            }
        })
        fuzzy.forEach(function (c) {
            var fragment = fuzzyMatchCache(cache, c.key)
            if (fragment) {
                //重复利用
                fragment.oldIndex = fragment.index
                fragment.key = c.key
                var val = fragment.val = c.val
                var index = fragment.index = c.index

                fragment.vm[instance.valName] = val
                fragment.vm[instance.keyName] = instance.isArray ? index : fragment.key
                delete fragment._dispose
            } else {

                c = new VFragment([], c.key, c.val, c.index)
                fragment = FragmentDecorator(c, instance, c.index)
                list.push(fragment)
            }
            saveInCache(newCache, fragment)
        })

        instance.fragments = list
        list.sort(function (a, b) {
            return a.index - b.index
        })
        instance.cache = newCache
    }

    function resetVM(vm, a, b) {
        if (avalon$2.config.inProxyMode) {
            vm.$accessors[a].value = NaN
        } else {
            vm.$accessors[a].set(NaN)
        }
    }

    function updateList(instance) {
        var before = instance.begin.dom
        var parent = before.parentNode
        var list = instance.fragments
        var end = instance.end.dom
        for (var i = 0, item; item = list[i]; i++) {
            if (item._dispose) {
                list.splice(i, 1)
                i--
                item.dispose()
                continue
            }
            if (item.oldIndex !== item.index) {
                var f = item.toFragment()
                var isEnd = before.nextSibling === null
                parent.insertBefore(f, before.nextSibling)
                if (isEnd && !parent.contains(end)) {
                    parent.insertBefore(end, before.nextSibling)
                }
            }
            before = item.split
        }
        var ch = instance.parentChildren
        var startIndex = ch.indexOf(instance.begin)
        var endIndex = ch.indexOf(instance.end)

        list.splice.apply(ch, [startIndex + 1, endIndex - startIndex].concat(list))
    }

    /**
     * 
     * @param {type} fragment
     * @param {type} this
     * @param {type} index
     * @returns { key, val, index, oldIndex, this, dom, split, vm}
     */
    function FragmentDecorator(fragment, instance, index) {
        var data = {}
        data[instance.keyName] = instance.isArray ? index : fragment.key
        data[instance.valName] = fragment.val
        if (instance.asName) {
            data[instance.asName] = instance.value
        }
        var vm = fragment.vm = platform.itemFactory(instance.vm, {
            data: data
        })
        if (instance.isArray) {
            vm.$watch(instance.valName, function (a) {
                if (instance.value && instance.value.set) {
                    instance.value.set(vm[instance.keyName], a)
                }
            })
        } else {
            vm.$watch(instance.valName, function (a) {
                instance.value[fragment.key] = a
            })
        }

        fragment.index = index
        fragment.innerRender = avalon$2.scan(instance.fragment, vm, function () {
            var oldRoot = this.root
            ap.push.apply(fragment.children, oldRoot.children)
            this.root = fragment
        })
        return fragment
    }
    // 新位置: 旧位置
    function isInCache(cache, id) {
        var c = cache[id]
        if (c) {
            var arr = c.arr
            /* istanbul ignore if*/
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

    function fuzzyMatchCache(cache) {
        var key
        for (var id in cache) {
            var key = id
            break
        }
        if (key) {
            return isInCache(cache, key)
        }
    }

    //根据VM的属性值或表达式的值切换类名，ms-class='xxx yyy zzz:flag'
    //http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
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

    avalon$2.directive('class', {
        diff: function diff(newVal, oldVal) {
            var type = this.type
            var vdom = this.node
            var classEvent = vdom.classEvent || {}
            if (type === 'hover') {
                //在移出移入时切换类名
                classEvent.mouseenter = activateClass
                classEvent.mouseleave = abandonClass
            } else if (type === 'active') {
                //在获得焦点时切换类名
                classEvent.tabIndex = vdom.props.tabindex || -1
                classEvent.mousedown = activateClass
                classEvent.mouseup = abandonClass
                classEvent.mouseleave = abandonClass
            }
            vdom.classEvent = classEvent

            var className = classNames(newVal)

            if (typeof oldVal === void 0 || oldVal !== className) {
                this.value = className

                vdom['change-' + type] = className
                return true
            }
        },
        update: function update(vdom, value) {
            var dom = vdom.dom
            if (dom && dom.nodeType == 1) {

                var dirType = this.type
                var change = 'change-' + dirType
                var classEvent = vdom.classEvent
                if (classEvent) {
                    for (var i in classEvent) {
                        if (i === 'tabIndex') {
                            dom[i] = classEvent[i]
                        } else {
                            avalon$2.bind(dom, i, classEvent[i])
                        }
                    }
                    vdom.classEvent = {}
                }
                var names = ['class', 'hover', 'active']
                names.forEach(function (type) {
                    if (dirType !== type) return
                    if (type === 'class') {
                        dom && setClass(dom, value)
                    } else {
                        var oldClass = dom.getAttribute(change)
                        if (oldClass) {
                            avalon$2(dom).removeClass(oldClass)
                        }
                        var name = 'change-' + type
                        dom.setAttribute(name, value)
                    }
                })
            }
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
        avalon$2(elem).addClass(elem.getAttribute(classMap[e.type]) || '')
    }

    function abandonClass(e) {
        var elem = e.target
        var name = classMap[e.type]
        avalon$2(elem).removeClass(elem.getAttribute(name) || '')
        if (name !== 'change-active') {
            avalon$2(elem).removeClass(elem.getAttribute('change-active') || '')
        }
    }

    function setClass(dom, neo) {
        var old = dom.getAttribute('change-class')
        if (old !== neo) {
            avalon$2(dom).removeClass(old).addClass(neo)
            dom.setAttribute('change-class', neo)
        }
    }

    getLongID(activateClass)
    getLongID(abandonClass)

    function lookupOption(vdom, values) {
        vdom.children && vdom.children.forEach(function (el) {
            if (el.nodeName === 'option') {
                setOption(el, values)
            } else {
                lookupOption(el, values)
            }
        })
    }

    function setOption(vdom, values) {
        var props = vdom.props
        if (!('disabled' in props)) {
            var value = getOptionValue(vdom, props)
            value = String(value || '').trim()
            props.selected = values.indexOf(value) !== -1

            if (vdom.dom) {
                vdom.dom.selected = props.selected
                var v = vdom.dom.selected //必须加上这个,防止移出节点selected失效
            }
        }
    }

    function getOptionValue(vdom, props) {
        if (props && 'value' in props) {
            return props.value + ''
        }
        var arr = []
        vdom.children.forEach(function (el) {
            if (el.nodeName === '#text') {
                arr.push(el.nodeValue)
            } else if (el.nodeName === '#document-fragment') {
                arr.push(getOptionValue(el))
            }
        })
        return arr.join('')
    }

    function getSelectedValue(vdom, arr) {
        vdom.children.forEach(function (el) {
            if (el.nodeName === 'option') {
                if (el.props.selected === true) arr.push(getOptionValue(el, el.props))
            } else if (el.children) {
                getSelectedValue(el, arr)
            }
        })
        return arr
    }

    var updateDataActions = {
        input: function input(prop) {
            //处理单个value值处理
            var field = this
            prop = prop || 'value'
            var dom = field.dom
            var rawValue = dom[prop]
            var parsedValue = field.parseValue(rawValue)

            //有时候parse后一致,vm不会改变,但input里面的值
            field.value = rawValue
            field.setValue(parsedValue)
            duplexCb(field)
            var pos = field.pos
            /* istanbul ignore if */
            if (dom.caret) {
                field.setCaret(dom, pos)
            }
            //vm.aaa = '1234567890'
            //处理 <input ms-duplex='@aaa|limitBy(8)'/>{{@aaa}} 这种格式化同步不一致的情况 
        },
        radio: function radio() {
            var field = this
            if (field.isChecked) {
                var val = !field.value
                field.setValue(val)
                duplexCb(field)
            } else {
                updateDataActions.input.call(field)
                field.value = NaN
            }
        },
        checkbox: function checkbox() {
            var field = this
            var array = field.value
            if (!Array.isArray(array)) {
                avalon$2.warn('ms-duplex应用于checkbox上要对应一个数组')
                array = [array]
            }
            var method = field.dom.checked ? 'ensure' : 'remove'
            if (array[method]) {
                var val = field.parseValue(field.dom.value)
                array[method](val)
                duplexCb(field)
            }
            this.__test__ = array
        },
        select: function select() {
            var field = this
            var val = avalon$2(field.dom).val() //字符串或字符串数组
            if (val + '' !== this.value + '') {
                if (Array.isArray(val)) {
                    //转换布尔数组或其他
                    val = val.map(function (v) {
                        return field.parseValue(v)
                    })
                } else {
                    val = field.parseValue(val)
                }
                field.setValue(val)
                duplexCb(field)
            }
        },
        contenteditable: function contenteditable() {
            updateDataActions.input.call(this, 'innerHTML')
        }
    }

    function duplexCb(field) {
        if (field.userCb) {
            field.userCb.call(field.vm, {
                type: 'changed',
                target: field.dom
            })
        }
    }

    function updateDataHandle(event) {
        var elem = this
        var field = elem._ms_duplex_
        if (elem.composing) {
            //防止onpropertychange引发爆栈
            return
        }
        if (elem.value === field.value) {
            return
        }
        /* istanbul ignore if*/
        if (elem.caret) {
            try {
                var pos = field.getCaret(elem)
                field.pos = pos
            } catch (e) {}
        }
        /* istanbul ignore if*/
        if (field.debounceTime > 4) {
            var timestamp = new Date()
            var left = timestamp - field.time || 0
            field.time = timestamp
            /* istanbul ignore if*/
            if (left >= field.debounceTime) {
                updateDataActions[field.dtype].call(field)
                /* istanbul ignore else*/
            } else {
                clearTimeout(field.debounceID)
                field.debounceID = setTimeout(function () {
                    updateDataActions[field.dtype].call(field)
                }, left)
            }
        } else if (field.isChanged) {
            setTimeout(function () {
                //https://github.com/RubyLouvre/avalon/issues/1908
                updateDataActions[field.dtype].call(field)
            }, 4)
        } else {
            updateDataActions[field.dtype].call(field)
        }
    }

    var rchangeFilter = /\|\s*change\b/
    var rdebounceFilter = /\|\s*debounce(?:\(([^)]+)\))?/
    function duplexBeforeInit() {
        var expr = this.expr
        if (rchangeFilter.test(expr)) {
            this.isChanged = true
            expr = expr.replace(rchangeFilter, '')
        }
        var match = expr.match(rdebounceFilter)
        if (match) {
            expr = expr.replace(rdebounceFilter, '')
            if (!this.isChanged) {
                this.debounceTime = parseInt(match[1], 10) || 300
            }
        }
        this.expr = expr
    }
    function duplexInit() {
        var expr = this.expr
        var node = this.node
        var etype = node.props.type
        this.parseValue = parseValue
        //处理数据转换器
        var parsers = this.param,
            dtype
        var isChecked = false
        parsers = parsers ? parsers.split('-').map(function (a) {
            if (a === 'checked') {
                isChecked = true
            }
            return a
        }) : []
        node.duplex = this
        if (rcheckedType.test(etype) && isChecked) {
            //如果是radio, checkbox,判定用户使用了checked格式函数没有
            parsers = []
            dtype = 'radio'
            this.isChecked = isChecked
        }
        this.parsers = parsers
        if (!/input|textarea|select/.test(node.nodeName)) {
            if ('contenteditable' in node.props) {
                dtype = 'contenteditable'
            }
        } else if (!dtype) {
            dtype = node.nodeName === 'select' ? 'select' : etype === 'checkbox' ? 'checkbox' : etype === 'radio' ? 'radio' : 'input'
        }
        this.dtype = dtype

        //判定是否使用了 change debounce 过滤器
        // this.isChecked = /boolean/.test(parsers)
        if (dtype !== 'input' && dtype !== 'contenteditable') {
            delete this.isChanged
            delete this.debounceTime
        } else if (!this.isChecked) {
            this.isString = true
        }

        var cb = node.props['data-duplex-changed']
        if (cb) {
            var arr = addScope(cb, 'xx')
            var body = makeHandle(arr[0])
            this.userCb = new Function('$event', 'var __vmodel__ = this\nreturn ' + body)
        }
    }
    function duplexDiff(newVal, oldVal) {
        if (Array.isArray(newVal)) {
            if (newVal + '' !== this.compareVal) {
                this.compareVal = newVal + ''
                return true
            }
        } else {
            newVal = this.parseValue(newVal)
            if (!this.isChecked) {
                this.value = newVal += ''
            }
            if (newVal !== this.compareVal) {
                this.compareVal = newVal
                return true
            }
        }
    }

    function duplexBind(vdom, addEvent) {
        var dom = vdom.dom
        this.dom = dom
        this.vdom = vdom
        this.duplexCb = updateDataHandle
        dom._ms_duplex_ = this
        //绑定事件
        addEvent(dom, this)
    }

    var valueHijack = true
    try {
        //#272 IE9-IE11, firefox
        var setters = {}
        var aproto = HTMLInputElement.prototype
        var bproto = HTMLTextAreaElement.prototype
        var newSetter = function newSetter(value) {
            // jshint ignore:line
            setters[this.tagName].call(this, value)
            var data = this._ms_duplex_
            if (!this.caret && data && data.isString) {
                data.duplexCb.call(this, { type: 'setter' })
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
        valueHijack = false
    } catch (e) {
        //在chrome 43中 ms-duplex终于不需要使用定时器实现双向绑定了
        // http://updates.html5rocks.com/2015/04/DOM-attributes-now-on-the-prototype
        // https://docs.google.com/document/d/1jwA8mtClwxI-QJuHT7872Z0pxpZz8PBkf2bGAbsUtqs/edit?pli=1
    }

    function parseValue(val) {
        for (var i = 0, k; k = this.parsers[i++];) {
            var fn = avalon$2.parsers[k]
            if (fn) {
                val = fn.call(this, val)
            }
        }
        return val
    }

    var updateView = {
        input: function input() {
            //处理单个value值处理
            var vdom = this.node
            var value = this.value + ''
            vdom.dom.value = vdom.props.value = value
        },
        updateChecked: function updateChecked(vdom, checked) {
            if (vdom.dom) {
                vdom.dom.defaultChecked = vdom.dom.checked = checked
            }
        },
        radio: function radio() {
            //处理单个checked属性
            var node = this.node
            var nodeValue = node.props.value
            var checked
            if (this.isChecked) {
                checked = !!this.value
            } else {
                checked = this.value + '' === nodeValue
            }
            node.props.checked = checked
            updateView.updateChecked(node, checked)
        },
        checkbox: function checkbox() {
            //处理多个checked属性
            var node = this.node
            var props = node.props
            var value = props.value + ''
            var values = [].concat(this.value)
            var checked = values.some(function (el) {
                return el + '' === value
            })

            props.defaultChecked = props.checked = checked
            updateView.updateChecked(node, checked)
        },
        select: function select() {
            //处理子级的selected属性
            var a = Array.isArray(this.value) ? this.value.map(String) : this.value + ''
            lookupOption(this.node, a)
        },
        contenteditable: function contenteditable() {
            //处理单个innerHTML 

            var vnodes = fromString(this.value)
            var fragment = createFragment()
            for (var i = 0, el; el = vnodes[i++];) {
                var child = avalon$2.vdom(el, 'toDOM')
                fragment.appendChild(child)
            }
            avalon$2.clearHTML(this.dom).appendChild(fragment)
            var list = this.node.children
            list.length = 0
            Array.prototype.push.apply(list, vnodes)

            this.duplexCb.call(this.dom)
        }
    }

    /* 
     * 通过绑定事件同步vmodel
     * 总共有三种方式同步视图
     * 1. 各种事件 input, change, click, propertychange, keydown...
     * 2. value属性重写
     * 3. 定时器轮询
     */
    function updateDataEvents(dom, data) {
        var events = {}
        //添加需要监听的事件
        switch (data.dtype) {
            case 'radio':
            case 'checkbox':
                events.click = updateDataHandle
                break
            case 'select':
                events.change = updateDataHandle
                break
            case 'contenteditable':
                if (data.isChanged) {
                    events.blur = updateDataHandle
                } else {

                    if (window$1.webkitURL) {
                        // http://code.metager.de/source/xref/WebKit/LayoutTests/fast/events/
                        // https://bugs.webkit.org/show_bug.cgi?id=110742
                        events.webkitEditableContentChanged = updateDataHandle
                    } else if (window$1.MutationEvent) {
                        events.DOMCharacterDataModified = updateDataHandle
                    }
                    events.input = updateDataHandle
                }
                break
            case 'input':
                if (data.isChanged) {
                    events.change = updateDataHandle
                } else {
                    events.input = updateDataHandle

                    //https://github.com/RubyLouvre/avalon/issues/1368#issuecomment-220503284
                    events.compositionstart = openComposition
                    events.compositionend = closeComposition
                    if (avalon$2.msie) {
                        events.keyup = updateModelKeyDown
                    }
                }
                break
        }

        if (/password|text/.test(dom.type)) {
            events.focus = openCaret //判定是否使用光标修正功能 
            events.blur = closeCaret
            data.getCaret = getCaret
            data.setCaret = setCaret
        }
        for (var name in events) {
            avalon$2.bind(dom, name, events[name])
        }
    }

    /* istanbul ignore next */
    function updateModelKeyDown(e) {
        var key = e.keyCode
        // ignore
        //    command            modifiers                   arrows
        if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40) return
        updateDataHandle.call(this, e)
    }
    /* istanbul ignore next */
    function openCaret() {
        this.caret = true
    }
    /* istanbul ignore next */
    function closeCaret() {
        this.caret = false
    }
    function openComposition() {
        this.composing = true
    }
    /* istanbul ignore next */
    function closeComposition(e) {
        this.composing = false
        var elem = this
        setTimeout(function () {
            updateDataHandle.call(elem, e)
        }, 0)
    }

    getShortID(openCaret)
    getShortID(closeCaret)
    getShortID(openComposition)
    getShortID(closeComposition)
    getShortID(updateModelKeyDown)
    getShortID(updateDataHandle)

    /* istanbul ignore next */
    function getCaret(field) {
        var start = NaN
        if (field.setSelectionRange) {
            start = field.selectionStart
        }
        return start
    }
    /* istanbul ignore next */
    function setCaret(field, pos) {
        if (!field.value || field.readOnly) return
        field.selectionStart = pos
        field.selectionEnd = pos
    }

    avalon$2.directive('duplex', {
        priority: 2000,
        beforeInit: duplexBeforeInit,
        init: duplexInit,
        diff: duplexDiff,
        update: function update(vdom, value) {
            if (!this.dom) {
                duplexBind.call(this, vdom, updateDataEvents)
            }
            updateView[this.dtype].call(this)
        }
    })

    avalon$2.directive('rules', {
        diff: function diff(rules) {
            if (isObject(rules)) {
                var vdom = this.node
                vdom.rules = platform.toJson(rules)
                return true
            }
        }
    })
    function isRegExp(value) {
        return avalon$2.type(value) === 'regexp'
    }
    var rmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i
    var rurl = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
    function isCorrectDate(value) {
        if (typeof value === "string" && value) {
            //是字符串但不能是空字符
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
    //https://github.com/adform/validator.js/blob/master/validator.js
    avalon$2.shadowCopy(avalon$2.validators, {
        pattern: {
            message: '必须匹配{{pattern}}这样的格式',
            get: function get(value, field, next) {
                var elem = field.dom
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
            get: function get(value, field, next) {
                //整数
                next(/^\-?\d+$/.test(value))
                return value
            }
        },
        number: {
            message: '必须数字',
            get: function get(value, field, next) {
                //数值
                next(!!value && isFinite(value)) // isFinite('') --> true
                return value
            }
        },
        norequired: {
            message: '',
            get: function get(value, field, next) {
                next(true)
                return value
            }
        },
        required: {
            message: '必须填写',
            get: function get(value, field, next) {
                next(value !== '')
                return value
            }
        },
        equalto: {
            message: '密码输入不一致',
            get: function get(value, field, next) {
                var id = String(field.data.equalto)
                var other = avalon$2(document.getElementById(id)).val() || ""
                next(value === other)
                return value
            }
        },
        date: {
            message: '日期格式不正确',
            get: function get(value, field, next) {
                var data = field.data
                if (isRegExp(data.date)) {
                    next(data.date.test(value))
                } else {
                    next(isCorrectDate(value))
                }
                return value
            }
        },
        url: {
            message: 'URL格式不正确',
            get: function get(value, field, next) {
                next(rurl.test(value))
                return value
            }
        },
        email: {
            message: 'email格式不正确',
            get: function get(value, field, next) {
                next(rmail.test(value))
                return value
            }
        },
        minlength: {
            message: '最少输入{{minlength}}个字',
            get: function get(value, field, next) {
                var num = parseInt(field.data.minlength, 10)
                next(value.length >= num)
                return value
            }
        },
        maxlength: {
            message: '最多输入{{maxlength}}个字',
            get: function get(value, field, next) {
                var num = parseInt(field.data.maxlength, 10)
                next(value.length <= num)
                return value
            }
        },
        min: {
            message: '输入值不能小于{{min}}',
            get: function get(value, field, next) {
                var num = parseInt(field.data.min, 10)
                next(parseFloat(value) >= num)
                return value
            }
        },
        max: {
            message: '输入值不能大于{{max}}',
            get: function get(value, field, next) {
                var num = parseInt(field.data.max, 10)
                next(parseFloat(value) <= num)
                return value
            }
        },
        chs: {
            message: '必须是中文字符',
            get: function get(value, field, next) {
                next(/^[\u4e00-\u9fa5]+$/.test(value))
                return value
            }
        }
    })

    var valiDir = avalon$2.directive('validate', {
        diff: function diff(validator) {
            var vdom = this.node
            if (vdom.validator) {
                return
            }
            if (isObject(validator)) {
                //注意，这个Form标签的虚拟DOM有两个验证对象
                //一个是vmValidator，它是用户VM上的那个原始子对象，也是一个VM
                //一个是validator，它是vmValidator.$model， 这是为了防止IE6－8添加子属性时添加的hack
                //也可以称之为safeValidate
                vdom.vmValidator = validator
                validator = platform.toJson(validator)
                validator.vdom = vdom
                vdom.validator = validator
                for (var name in valiDir.defaults) {
                    if (!validator.hasOwnProperty(name)) {
                        validator[name] = valiDir.defaults[name]
                    }
                }
                validator.fields = validator.fields || []
                return true
            }
        },
        update: function update(vdom) {

            var validator = vdom.validator
            var dom = validator.dom = vdom.dom
            dom._ms_validate_ = validator
            var fields = validator.fields
            collectFeild(vdom.children, fields, validator)
            var type = window.netscape ? 'keypress' : 'focusin'
            avalon$2.bind(document, type, function (e) {
                var dom = e.target
                var duplex = dom._ms_duplex_
                var vdom = (duplex || {}).vdom
                if (duplex && vdom.rules && !duplex.validator) {
                    if (avalon$2.Array.ensure(fields, duplex)) {
                        bindValidateEvent(duplex, validator)
                    }
                }
            })

            //为了方便用户手动执行验证，我们需要为原始vmValidate上添加一个onManual方法
            var v = vdom.vmValidator
            try {
                v.onManual = onManual
            } catch (e) {}
            delete vdom.vmValidator

            dom.setAttribute('novalidate', 'novalidate')

            function onManual() {
                valiDir.validateAll.call(validator, validator.onValidateAll)
            }
            /* istanbul ignore if */
            if (validator.validateAllInSubmit) {
                avalon$2.bind(dom, 'submit', function (e) {
                    e.preventDefault()
                    onManual()
                })
            }
        },
        validateAll: function validateAll(callback) {
            var validator = this
            var vdom = this.vdom
            var fields = validator.fields = []
            collectFeild(vdom.children, fields, validator)
            var fn = typeof callback === 'function' ? callback : validator.onValidateAll
            var promises = validator.fields.filter(function (field) {
                var el = field.dom
                return el && !el.disabled && validator.dom.contains(el)
            }).map(function (field) {
                return valiDir.validate(field, true)
            })
            var uniq = {}
            return Promise.all(promises).then(function (array) {
                var reasons = array.concat.apply([], array)
                if (validator.deduplicateInValidateAll) {

                    reasons = reasons.filter(function (reason) {
                        var el = reason.element
                        var uuid = el.uniqueID || (el.uniqueID = setTimeout('1'))

                        if (uniq[uuid]) {
                            return false
                        } else {
                            return uniq[uuid] = true
                        }
                    })
                }
                fn.call(validator.dom, reasons) //这里只放置未通过验证的组件
            })
        },

        validate: function validate(field, isValidateAll, event) {
            var promises = []
            var value = field.value
            var elem = field.dom

            /* istanbul ignore if */
            if (typeof Promise !== 'function') {
                //avalon-promise不支持phantomjs
                avalon$2.warn('浏览器不支持原生Promise,请下载并<script src=url>引入\nhttps://github.com/RubyLouvre/avalon/blob/master/test/promise.js')
            }
            /* istanbul ignore if */
            if (elem.disabled) return
            var rules = field.vdom.rules
            var ngs = [],
                isOk = true
            if (!(rules.norequired && value === '')) {
                for (var ruleName in rules) {
                    var ruleValue = rules[ruleName]
                    if (ruleValue === false) continue
                    var hook = avalon$2.validators[ruleName]
                    var resolve
                    promises.push(new Promise(function (a, b) {
                        resolve = a
                    }))
                    var next = function next(a) {
                        var reason = {
                            element: elem,
                            data: field.data,
                            message: elem.getAttribute('data-' + ruleName + '-message') || elem.getAttribute('data-message') || hook.message,
                            validateRule: ruleName,
                            getMessage: getMessage
                        }
                        if (a) {
                            resolve(true)
                        } else {
                            isOk = false
                            ngs.push(reason)
                            resolve(false)
                        }
                    }
                    field.data = {}
                    field.data[ruleName] = ruleValue
                    hook.get(value, field, next)
                }
            }

            //如果promises不为空，说明经过验证拦截器
            return Promise.all(promises).then(function (array) {
                if (!isValidateAll) {
                    var validator = field.validator
                    if (isOk) {
                        validator.onSuccess.call(elem, [{
                            data: field.data,
                            element: elem
                        }], event)
                    } else {
                        validator.onError.call(elem, ngs, event)
                    }
                    validator.onComplete.call(elem, ngs, event)
                }
                return ngs
            })
        }
    })

    function collectFeild(nodes, fields, validator) {
        for (var i = 0, vdom; vdom = nodes[i++];) {
            var duplex = vdom.rules && vdom.duplex
            if (duplex) {
                fields.push(duplex)
                bindValidateEvent(duplex, validator)
            } else if (vdom.children) {
                collectFeild(vdom.children, fields, validator)
            } else if (Array.isArray(vdom)) {
                collectFeild(vdom, fields, validator)
            }
        }
    }

    function bindValidateEvent(field, validator) {

        var node = field.dom
        if (field.validator) {
            return
        }
        field.validator = validator
        /* istanbul ignore if */
        if (validator.validateInKeyup && !field.isChanged && !field.debounceTime) {
            avalon$2.bind(node, 'keyup', function (e) {
                validator.validate(field, 0, e)
            })
        }
        /* istanbul ignore if */
        if (validator.validateInBlur) {
            avalon$2.bind(node, 'blur', function (e) {
                validator.validate(field, 0, e)
            })
        }
        /* istanbul ignore if */
        if (validator.resetInFocus) {
            avalon$2.bind(node, 'focus', function (e) {
                validator.onReset.call(node, e, field)
            })
        }
    }
    var rformat = /\\?{{([^{}]+)\}}/gm

    function getMessage() {
        var data = this.data || {}
        return this.message.replace(rformat, function (_, name) {
            return data[name] == null ? '' : data[name]
        })
    }
    valiDir.defaults = {
        validate: valiDir.validate,
        onError: avalon$2.noop,
        onSuccess: avalon$2.noop,
        onComplete: avalon$2.noop,
        onManual: avalon$2.noop,
        onReset: avalon$2.noop,
        onValidateAll: avalon$2.noop,
        validateInBlur: true, //@config {Boolean} true，在blur事件中进行验证,触发onSuccess, onError, onComplete回调
        validateInKeyup: true, //@config {Boolean} true，在keyup事件中进行验证,触发onSuccess, onError, onComplete回调
        validateAllInSubmit: true, //@config {Boolean} true，在submit事件中执行onValidateAll回调
        resetInFocus: true, //@config {Boolean} true，在focus事件中执行onReset回调,
        deduplicateInValidateAll: false //@config {Boolean} false，在validateAll回调中对reason数组根据元素节点进行去重
    }

    /**
     * 一个directive装饰器
     * @returns {directive}
     */
    // DirectiveDecorator(scope, binding, vdom, this)
    // Decorator(vm, options, callback)
    function Directive(vm, binding, vdom, render) {
        var type = binding.type
        var decorator = avalon$2.directives[type]
        if (inBrowser) {
            var dom = avalon$2.vdom(vdom, 'toDOM')
            if (dom.nodeType === 1) {
                dom.removeAttribute(binding.attrName)
            }
            vdom.dom = dom
        }
        var callback = decorator.update ? function (value) {
            if (!render.mount && /css|visible|duplex/.test(type)) {
                render.callbacks.push(function () {
                    decorator.update.call(directive$$1, directive$$1.node, value)
                })
            } else {
                decorator.update.call(directive$$1, directive$$1.node, value)
            }
        } : avalon$2.noop
        for (var key in decorator) {
            binding[key] = decorator[key]
        }
        binding.node = vdom
        var directive$$1 = new Action(vm, binding, callback)
        if (directive$$1.init) {
            //这里可能会重写node, callback, type, name
            directive$$1.init()
        }
        directive$$1.update()
        return directive$$1
    }

    var eventMap = avalon$2.oneObject('animationend,blur,change,input,' + 'click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,' + 'mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit', 'on')
    function parseAttributes(dirs, tuple) {
        var node = tuple[0],
            uniq = {},
            bindings = []
        var hasIf = false
        for (var name in dirs) {
            var value = dirs[name]
            var arr = name.split('-')
            // ms-click
            if (name in node.props) {
                var attrName = name
            } else {
                attrName = ':' + name.slice(3)
            }
            if (eventMap[arr[1]]) {
                arr.splice(1, 0, 'on')
            }
            //ms-on-click
            if (arr[1] === 'on') {
                arr[3] = parseFloat(arr[3]) || 0
            }

            var type = arr[1]
            if (type === 'controller' || type === 'important') continue
            if (directives[type]) {

                var binding = {
                    type: type,
                    param: arr[2],
                    attrName: attrName,
                    name: arr.join('-'),
                    expr: value,
                    priority: directives[type].priority || type.charCodeAt(0) * 100
                }
                if (type === 'if') {
                    hasIf = true
                }
                if (type === 'on') {
                    binding.priority += arr[3]
                }
                if (!uniq[binding.name]) {
                    uniq[binding.name] = value
                    bindings.push(binding)
                    if (type === 'for') {
                        return [avalon$2.mix(binding, tuple[3])]
                    }
                }
            }
        }
        bindings.sort(byPriority)

        if (hasIf) {
            var ret = []
            for (var i = 0, el; el = bindings[i++];) {
                ret.push(el)
                if (el.type === 'if') {
                    return ret
                }
            }
        }
        return bindings
    }
    function byPriority(a, b) {
        return a.priority - b.priority
    }

    var rimprovePriority = /[+-\?]/
    var rinnerValue = /__value__\)$/
    function parseInterpolate(dir) {
        var rlineSp = /\n\r?/g
        var str = dir.nodeValue.trim().replace(rlineSp, '')
        var tokens = []
        do {
            //aaa{{@bbb}}ccc
            var index = str.indexOf(config.openTag)
            index = index === -1 ? str.length : index
            var value = str.slice(0, index)
            if (/\S/.test(value)) {
                tokens.push(avalon$2.quote(avalon$2._decode(value)))
            }
            str = str.slice(index + config.openTag.length)
            if (str) {
                index = str.indexOf(config.closeTag)
                var value = str.slice(0, index)
                var expr = avalon$2.unescapeHTML(value)
                if (/\|\s*\w/.test(expr)) {
                    //如果存在过滤器，优化干掉
                    var arr = addScope(expr, 'expr')
                    if (arr[1]) {
                        expr = arr[1].replace(rinnerValue, arr[0] + ')')
                    }
                }
                if (rimprovePriority) {
                    expr = '(' + expr + ')'
                }
                tokens.push(expr)

                str = str.slice(index + config.closeTag.length)
            }
        } while (str.length)
        return [{
            expr: tokens.join('+'),
            name: 'expr',
            type: 'expr'
        }]
    }

    function getChildren(arr) {
        var count = 0
        for (var i = 0, el; el = arr[i++];) {
            if (el.nodeName === '#document-fragment') {
                count += getChildren(el.children)
            } else {
                count += 1
            }
        }
        return count
    }
    function groupTree(parent, children) {
        children && children.forEach(function (vdom) {
            if (!vdom) return
            var vlength = vdom.children && getChildren(vdom.children)
            if (vdom.nodeName === '#document-fragment') {
                var dom = createFragment()
            } else {
                dom = avalon$2.vdom(vdom, 'toDOM')
                var domlength = dom.childNodes && dom.childNodes.length
                if (domlength && vlength && domlength > vlength) {
                    if (!appendChildMayThrowError[dom.nodeName]) {
                        avalon$2.clearHTML(dom)
                    }
                }
            }
            if (vlength) {
                groupTree(dom, vdom.children)
                if (vdom.nodeName === 'select') {
                    var values = []
                    getSelectedValue(vdom, values)
                    lookupOption(vdom, values)
                }
            }
            //高级版本可以尝试 querySelectorAll

            try {
                if (!appendChildMayThrowError[parent.nodeName]) {
                    parent.appendChild(dom)
                }
            } catch (e) {}
        })
    }

    function dumpTree(elem) {
        var firstChild
        while (firstChild = elem.firstChild) {
            if (firstChild.nodeType === 1) {
                dumpTree(firstChild)
            }
            elem.removeChild(firstChild)
        }
    }

    function getRange(childNodes, node) {
        var i = childNodes.indexOf(node) + 1
        var deep = 1,
            nodes = [],
            end
        nodes.start = i
        while (node = childNodes[i++]) {
            nodes.push(node)
            if (node.nodeName === '#comment') {
                if (startWith(node.nodeValue, 'ms-for:')) {
                    deep++
                } else if (node.nodeValue === 'ms-for-end:') {
                    deep--
                    if (deep === 0) {
                        end = node
                        nodes.pop()
                        break
                    }
                }
            }
        }
        nodes.end = end
        return nodes
    }

    function startWith(long, short) {
        return long.indexOf(short) === 0
    }

    var appendChildMayThrowError = {
        '#text': 1,
        '#comment': 1,
        script: 1,
        style: 1,
        noscript: 1
    }

    /**
     * 生成一个渲染器,并作为它第一个遇到的ms-controller对应的VM的$render属性
     * @param {String|DOM} node
     * @param {ViewModel|Undefined} vm
     * @param {Function|Undefined} beforeReady
     * @returns {Render}
     */
    avalon$2.scan = function (node, vm, beforeReady) {
        return new Render(node, vm, beforeReady || avalon$2.noop)
    }

    /**
     * avalon.scan 的内部实现
     */
    function Render(node, vm, beforeReady) {
        this.root = node //如果传入的字符串,确保只有一个标签作为根节点
        this.vm = vm
        this.beforeReady = beforeReady
        this.bindings = [] //收集待加工的绑定属性
        this.callbacks = []
        this.directives = []
        this.init()
    }

    Render.prototype = {
        /**
         * 开始扫描指定区域
         * 收集绑定属性
         * 生成指令并建立与VM的关联
         */
        init: function init() {
            var vnodes
            if (this.root && this.root.nodeType > 0) {
                vnodes = fromDOM(this.root) //转换虚拟DOM
                //将扫描区域的每一个节点与其父节点分离,更少指令对DOM操作时,对首屏输出造成的频繁重绘
                dumpTree(this.root)
            } else if (typeof this.root === 'string') {
                vnodes = fromString(this.root) //转换虚拟DOM
            } else {
                return avalon$2.warn('avalon.scan first argument must element or HTML string')
            }

            this.root = vnodes[0]
            this.vnodes = vnodes
            this.scanChildren(vnodes, this.vm, true)
        },
        scanChildren: function scanChildren(children, scope, isRoot) {
            for (var i = 0; i < children.length; i++) {
                var vdom = children[i]
                switch (vdom.nodeName) {
                    case '#text':
                        scope && this.scanText(vdom, scope)
                        break
                    case '#comment':
                        scope && this.scanComment(vdom, scope, children)
                        break
                    case '#document-fragment':
                        this.scanChildren(vdom.children, scope, false)
                        break
                    default:
                        this.scanTag(vdom, scope, children, false)
                        break
                }
            }
            if (isRoot) {
                this.complete()
            }
        },


        /**
         * 从文本节点获取指令
         * @param {type} vdom 
         * @param {type} scope
         * @returns {undefined}
         */
        scanText: function scanText(vdom, scope) {
            if (config.rexpr.test(vdom.nodeValue)) {
                this.bindings.push([vdom, scope, {
                    nodeValue: vdom.nodeValue
                }])
            }
        },


        /**
         * 从注释节点获取指令
         * @param {type} vdom 
         * @param {type} scope
         * @param {type} parentChildren
         * @returns {undefined}
         */
        scanComment: function scanComment(vdom, scope, parentChildren) {
            if (startWith(vdom.nodeValue, 'ms-for:')) {
                this.getForBinding(vdom, scope, parentChildren)
            }
        },


        /**
         * 从元素节点的nodeName与属性中获取指令
         * @param {type} vdom 
         * @param {type} scope
         * @param {type} parentChildren
         * @param {type} isRoot 用于执行complete方法
         * @returns {undefined}
         */
        scanTag: function scanTag(vdom, scope, parentChildren, isRoot) {
            var dirs = {},
                attrs = vdom.props,
                hasDir,
                hasFor
            for (var attr in attrs) {
                var value = attrs[attr]
                var oldName = attr
                if (attr.charAt(0) === ':') {
                    attr = 'ms-' + attr.slice(1)
                }
                if (startWith(attr, 'ms-')) {
                    dirs[attr] = value
                    var type = attr.match(/\w+/g)[1]
                    type = eventMap[type] || type
                    if (!directives[type]) {
                        avalon$2.warn(attr + ' has not registered!')
                    }
                    hasDir = true
                }
                if (attr === 'ms-for') {
                    hasFor = value
                    delete attrs[oldName]
                }
            }
            var $id = dirs['ms-important'] || dirs['ms-controller']
            if ($id) {
                /**
                 * 后端渲染
                 * serverTemplates后端给avalon添加的对象,里面都是模板,
                 * 将原来后端渲染好的区域再还原成原始样子,再被扫描
                 */
                var templateCaches = avalon$2.serverTemplates
                var temp = templateCaches && templateCaches[$id]
                if (temp) {
                    avalon$2.log('前端再次渲染后端传过来的模板')
                    var node = fromString(temp)[0]
                    for (var i in node) {
                        vdom[i] = node[i]
                    }
                    delete templateCaches[$id]
                    this.scanTag(vdom, scope, parentChildren, isRoot)
                    return
                }
                //推算出指令类型
                var type = dirs['ms-important'] === $id ? 'important' : 'controller'
                //推算出用户定义时属性名,是使用ms-属性还是:属性
                var attrName = 'ms-' + type in attrs ? 'ms-' + type : ':' + type

                if (inBrowser) {
                    delete attrs[attrName]
                }
                var dir = directives[type]
                scope = dir.getScope.call(this, $id, scope)
                if (!scope) {
                    return
                } else {
                    var clazz = attrs['class']
                    if (clazz) {
                        attrs['class'] = (' ' + clazz + ' ').replace(' ms-controller ', '').trim()
                    }
                }
                var render = this
                scope.$render = render
                this.callbacks.push(function () {
                    //用于删除ms-controller
                    dir.update.call(render, vdom, attrName, $id)
                })
            }
            if (hasFor) {
                if (vdom.dom) {
                    vdom.dom.removeAttribute(oldName)
                }
                return this.getForBindingByElement(vdom, scope, parentChildren, hasFor)
            }

            if (/^ms\-/.test(vdom.nodeName)) {
                attrs.is = vdom.nodeName
            }

            if (attrs['is']) {
                if (!dirs['ms-widget']) {
                    dirs['ms-widget'] = '{}'
                }
                hasDir = true
            }
            if (hasDir) {
                this.bindings.push([vdom, scope, dirs])
            }
            var children = vdom.children
            //如果存在子节点,并且不是容器元素(script, stype, textarea, xmp...)
            if (!orphanTag[vdom.nodeName] && children && children.length && !delayCompileNodes(dirs)) {
                this.scanChildren(children, scope, false)
            }
        },


        /**
         * 将绑定属性转换为指令
         * 执行各种回调与优化指令
         * @returns {undefined}
         */
        complete: function complete() {
            this.yieldDirectives()
            this.beforeReady()
            if (inBrowser) {
                var root$$1 = this.root
                if (inBrowser) {
                    var rootDom = avalon$2.vdom(root$$1, 'toDOM')
                    groupTree(rootDom, root$$1.children)
                }
            }

            this.mount = true
            var fn
            while (fn = this.callbacks.pop()) {
                fn()
            }
            this.optimizeDirectives()
        },


        /**
         * 将收集到的绑定属性进行深加工,最后转换指令
         * @returns {Array<tuple>}
         */
        yieldDirectives: function yieldDirectives() {
            var tuple
            while (tuple = this.bindings.shift()) {
                var vdom = tuple[0],
                    scope = tuple[1],
                    dirs = tuple[2],
                    bindings = []
                if ('nodeValue' in dirs) {
                    bindings = parseInterpolate(dirs)
                } else if (!('ms-skip' in dirs)) {
                    bindings = parseAttributes(dirs, tuple)
                }
                for (var i = 0, binding; binding = bindings[i++];) {
                    var dir = directives[binding.type]
                    if (!inBrowser && /on|duplex|active|hover/.test(binding.type)) {
                        continue
                    }
                    if (dir.beforeInit) {
                        dir.beforeInit.call(binding)
                    }

                    var directive$$1 = new Directive(scope, binding, vdom, this)
                    this.directives.push(directive$$1)
                }
            }
        },


        /**
         * 修改指令的update与callback方法,让它们以后执行时更加高效
         * @returns {undefined}
         */
        optimizeDirectives: function optimizeDirectives() {
            for (var i = 0, el; el = this.directives[i++];) {
                el.callback = directives[el.type].update
                el.update = newUpdate
                el._isScheduled = false
            }
        },

        update: function update() {
            for (var i = 0, el; el = this.directives[i++];) {
                el.update()
            }
        },

        /**
         * 销毁所有指令
         * @returns {undefined}
         */
        dispose: function dispose() {
            var list = this.directives || []
            for (var i = 0, el; el = list[i++];) {
                el.dispose()
            }
            //防止其他地方的this.innerRender && this.innerRender.dispose报错
            for (var _i9 in this) {
                if (_i9 !== 'dispose') delete this[_i9]
            }
        },


        /**
         * 将循环区域转换为for指令
         * @param {type} begin 注释节点
         * @param {type} scope
         * @param {type} parentChildren
         * @param {type} userCb 循环结束回调
         * @returns {undefined}
         */
        getForBinding: function getForBinding(begin, scope, parentChildren, userCb) {
            var expr = begin.nodeValue.replace('ms-for:', '').trim()
            begin.nodeValue = 'ms-for:' + expr
            var nodes = getRange(parentChildren, begin)
            var end = nodes.end
            var fragment = avalon$2.vdom(nodes, 'toHTML')
            parentChildren.splice(nodes.start, nodes.length)
            begin.props = {}
            this.bindings.push([begin, scope, {
                'ms-for': expr
            }, {
                begin: begin,
                end: end,
                expr: expr,
                userCb: userCb,
                fragment: fragment,
                parentChildren: parentChildren
            }])
        },


        /**
         * 在带ms-for元素节点旁添加两个注释节点,组成循环区域
         * @param {type} vdom
         * @param {type} scope
         * @param {type} parentChildren
         * @param {type} expr
         * @returns {undefined}
         */
        getForBindingByElement: function getForBindingByElement(vdom, scope, parentChildren, expr) {
            var index = parentChildren.indexOf(vdom) //原来带ms-for的元素节点
            var props = vdom.props
            var begin = {
                nodeName: '#comment',
                nodeValue: 'ms-for:' + expr
            }
            if (props.slot) {
                begin.slot = props.slot
                delete props.slot
            }
            var end = {
                nodeName: '#comment',
                nodeValue: 'ms-for-end:'
            }
            parentChildren.splice(index, 1, begin, vdom, end)
            this.getForBinding(begin, scope, parentChildren, props['data-for-rendered'])
        }
    }
    var viewID

    function newUpdate() {
        var oldVal = this.beforeUpdate()
        var newVal = this.value = this.get()
        if (this.callback && this.diff(newVal, oldVal)) {
            this.callback(this.node, this.value)
            var vm = this.vm
            var $render = vm.$render
            var list = vm.$events['onViewChange']
            /* istanbul ignore if */
            if (list && $render && $render.root && !avalon$2.viewChanging) {
                if (viewID) {
                    clearTimeout(viewID)
                    viewID = null
                }
                viewID = setTimeout(function () {
                    list.forEach(function (el) {
                        el.callback.call(vm, {
                            type: 'viewchange',
                            target: $render.root,
                            vmodel: vm
                        })
                    })
                })
            }
        }
        this._isScheduled = false
    }

    var events = 'onInit,onReady,onViewChange,onDispose,onEnter,onLeave'
    var componentEvents = avalon$2.oneObject(events)

    function toObject(value) {
        var value = platform.toJson(value)
        if (Array.isArray(value)) {
            var v = {}
            value.forEach(function (el) {
                el && avalon$2.shadowCopy(v, el)
            })
            return v
        }
        return value
    }
    var componentQueue = []
    avalon$2.directive('widget', {
        delay: true,
        priority: 4,
        deep: true,
        init: function init() {
            //cached属性必须定义在组件容器里面,不是template中
            var vdom = this.node
            this.cacheVm = !!vdom.props.cached
            if (vdom.dom && vdom.nodeName === '#comment') {
                var comment = vdom.dom
            }
            var oldValue = this.getValue()
            var value = toObject(oldValue)
            //外部VM与内部VM
            // ＝＝＝创建组件的VM＝＝BEGIN＝＝＝
            var is = vdom.props.is || value.is
            this.is = is
            var component = avalon$2.components[is]
            //外部传入的总大于内部
            if (!('fragment' in this)) {
                if (!vdom.isVoidTag) {
                    //提取组件容器内部的东西作为模板
                    var text = vdom.children[0]
                    if (text && text.nodeValue) {
                        this.fragment = text.nodeValue
                    } else {
                        this.fragment = avalon$2.vdom(vdom.children, 'toHTML')
                    }
                } else {
                    this.fragment = false
                }
            }
            //如果组件还没有注册，那么将原元素变成一个占位用的注释节点
            if (!component) {
                this.readyState = 0
                vdom.nodeName = '#comment'
                vdom.nodeValue = 'unresolved component placeholder'
                delete vdom.dom
                avalon$2.Array.ensure(componentQueue, this)
                return
            }

            //如果是非空元素，比如说xmp, ms-*, template
            var id = value.id || value.$id
            var hasCache = avalon$2.vmodels[id]
            var fromCache = false
            // this.readyState = 1
            if (hasCache) {
                comVm = hasCache
                this.comVm = comVm
                replaceRoot(this, comVm.$render)
                fromCache = true
            } else {
                if (typeof component === 'function') {
                    component = new component(value)
                }
                var comVm = createComponentVm(component, value, is)
                this.readyState = 1
                fireComponentHook(comVm, vdom, 'Init')
                this.comVm = comVm

                // ＝＝＝创建组件的VM＝＝END＝＝＝
                var innerRender = avalon$2.scan(component.template, comVm)
                comVm.$render = innerRender
                replaceRoot(this, innerRender)
                var nodesWithSlot = []
                var directives$$1 = []
                if (this.fragment || component.soleSlot) {
                    var curVM = this.fragment ? this.vm : comVm
                    var curText = this.fragment || '{{##' + component.soleSlot + '}}'
                    var childBoss = avalon$2.scan('<div>' + curText + '</div>', curVM, function () {
                        nodesWithSlot = this.root.children
                    })
                    directives$$1 = childBoss.directives
                    this.childBoss = childBoss
                    for (var i in childBoss) {
                        delete childBoss[i]
                    }
                }
                Array.prototype.push.apply(innerRender.directives, directives$$1)

                var arraySlot = [],
                    objectSlot = {}
                //从用户写的元素内部 收集要移动到 新创建的组件内部的元素
                if (component.soleSlot) {
                    arraySlot = nodesWithSlot
                } else {
                    nodesWithSlot.forEach(function (el, i) {
                        //要求带slot属性
                        if (el.slot) {
                            var nodes = getRange(nodesWithSlot, el)
                            nodes.push(nodes.end)
                            nodes.unshift(el)
                            objectSlot[el.slot] = nodes
                        } else if (el.props) {
                            var name = el.props.slot
                            if (name) {
                                delete el.props.slot
                                if (Array.isArray(objectSlot[name])) {
                                    objectSlot[name].push(el)
                                } else {
                                    objectSlot[name] = [el]
                                }
                            }
                        }
                    })
                }
                //将原来元素的所有孩子，全部移动新的元素的第一个slot的位置上
                if (component.soleSlot) {
                    insertArraySlot(innerRender.vnodes, arraySlot)
                } else {
                    insertObjectSlot(innerRender.vnodes, objectSlot)
                }
            }

            if (comment) {
                var dom = avalon$2.vdom(vdom, 'toDOM')
                comment.parentNode.replaceChild(dom, comment)
                comVm.$element = innerRender.root.dom = dom
                delete this.reInit
            }

            //处理DOM节点

            dumpTree(vdom.dom)
            comVm.$element = vdom.dom
            groupTree(vdom.dom, vdom.children)
            if (fromCache) {
                fireComponentHook(comVm, vdom, 'Enter')
            } else {
                fireComponentHook(comVm, vdom, 'Ready')
            }
        },
        diff: function diff(newVal, oldVal) {
            if (cssDiff.call(this, newVal, oldVal)) {
                return true
            }
        },

        update: function update(vdom, value) {
            //this.oldValue = value //★★防止递归

            switch (this.readyState) {
                case 0:
                    if (this.reInit) {
                        this.init()
                        this.readyState++
                    }
                    break
                case 1:
                    this.readyState++
                    break
                default:
                    this.readyState++
                    var comVm = this.comVm
                    avalon$2.viewChanging = true
                    avalon$2.transaction(function () {
                        for (var i in value) {
                            if (comVm.hasOwnProperty(i)) {
                                if (Array.isArray(value[i])) {
                                    comVm[i] = value[i].concat()
                                } else {
                                    comVm[i] = value[i]
                                }
                            }
                        }
                    })

                    //要保证要先触发孩子的ViewChange 然后再到它自己的ViewChange
                    fireComponentHook(comVm, vdom, 'ViewChange')
                    delete avalon$2.viewChanging
                    break
            }
            this.value = avalon$2.mix(true, {}, value)
        },
        beforeDispose: function beforeDispose() {
            var comVm = this.comVm
            if (!this.cacheVm) {
                fireComponentHook(comVm, this.node, 'Dispose')
                comVm.$hashcode = false
                delete avalon$2.vmodels[comVm.$id]
                this.innerRender && this.innerRender.dispose()
            } else {
                fireComponentHook(comVm, this.node, 'Leave')
            }
        }
    })

    function replaceRoot(instance, innerRender) {
        instance.innerRender = innerRender
        var root$$1 = innerRender.root
        var vdom = instance.node
        var slot = vdom.props.slot
        for (var i in root$$1) {
            vdom[i] = root$$1[i]
        }
        if (vdom.props && slot) {
            vdom.props.slot = slot
        }
        innerRender.root = vdom
        innerRender.vnodes[0] = vdom
    }

    function fireComponentHook(vm, vdom, name) {
        var list = vm.$events['on' + name]
        if (list) {
            list.forEach(function (el) {
                setTimeout(function () {
                    el.callback.call(vm, {
                        type: name.toLowerCase(),
                        target: vdom.dom,
                        vmodel: vm
                    })
                }, 0)
            })
        }
    }

    function createComponentVm(component, value, is) {
        var hooks = []
        var defaults = component.defaults
        collectHooks(defaults, hooks)
        collectHooks(value, hooks)
        var obj = {}
        for (var i in defaults) {
            var val = value[i]
            if (val == null) {
                obj[i] = defaults[i]
            } else {
                obj[i] = val
            }
        }
        obj.$id = value.id || value.$id || avalon$2.makeHashCode(is)
        delete obj.id
        var def = avalon$2.mix(true, {}, obj)
        var vm = avalon$2.define(def)
        hooks.forEach(function (el) {
            vm.$watch(el.type, el.cb)
        })
        return vm
    }

    function collectHooks(a, list) {
        for (var i in a) {
            if (componentEvents[i]) {
                if (typeof a[i] === 'function' && i.indexOf('on') === 0) {
                    list.unshift({
                        type: i,
                        cb: a[i]
                    })
                }
                //delete a[i] 这里不能删除,会导致再次切换时没有onReady
            }
        }
    }

    function resetParentChildren(nodes, arr) {
        var dir = arr && arr[0] && arr[0].forDir
        if (dir) {
            dir.parentChildren = nodes
        }
    }

    function insertArraySlot(nodes, arr) {
        for (var i = 0, el; el = nodes[i]; i++) {
            if (el.nodeName === 'slot') {
                resetParentChildren(nodes, arr)
                nodes.splice.apply(nodes, [i, 1].concat(arr))
                break
            } else if (el.children) {
                insertArraySlot(el.children, arr)
            }
        }
    }

    function insertObjectSlot(nodes, obj) {
        for (var i = 0, el; el = nodes[i]; i++) {
            if (el.nodeName === 'slot') {
                var name = el.props.name
                resetParentChildren(nodes, obj[name])
                nodes.splice.apply(nodes, [i, 1].concat(obj[name]))
                continue
            } else if (el.children) {
                insertObjectSlot(el.children, obj)
            }
        }
    }

    avalon$2.components = {}
    avalon$2.component = function (name, component) {

        component.extend = componentExtend
        return addToQueue(name, component)
    }
    function addToQueue(name, component) {
        avalon$2.components[name] = component
        for (var el, i = 0; el = componentQueue[i]; i++) {
            if (el.is === name) {
                componentQueue.splice(i, 1)
                el.reInit = true
                delete el.value
                el.update()
                i--
            }
        }
        return component
    }

    function componentExtend(child) {
        var name = child.displayName
        delete child.displayName
        var obj = { defaults: avalon$2.mix(true, {}, this.defaults, child.defaults) }
        if (child.soleSlot) {
            obj.soleSlot = child.soleSlot
        }
        obj.template = child.template || this.template
        return avalon$2.component(name, obj)
    }

    return avalon$2
})