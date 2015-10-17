/*==================================================
 Copyright (c) 2013-2015 司徒正美 and other contributors
 http://www.cnblogs.com/rubylouvre/
 https://github.com/RubyLouvre
 http://weibo.com/jslouvre/
 
 Released under the MIT license
 avalon.mobile.shim.js 1.46 built in 2015.9.2
 ==================================================*/
(function(global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get avalon.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var avalon = require("avalon")(window);
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("Avalon requires a window with a document")
            }
            return factory(w)
        }
    } else {
        factory(global)
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function(window, noGlobal){

/*********************************************************************
 *                    全局变量及方法                                  *
 **********************************************************************/
var expose = Date.now()
//http://stackoverflow.com/questions/7290086/javascript-use-strict-and-nicks-find-global-function
var DOC = window.document
var head = DOC.head //HEAD元素
head.insertAdjacentHTML("afterBegin", '<avalon ms-skip class="avalonHide"><style id="avalonStyle">.avalonHide{ display: none!important }</style></avalon>')
var ifGroup = head.firstChild

function log() {
    if (avalon.config.debug) {
// http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
        console.log.apply(console, arguments)
    }
}
/**
 * Creates a new object without a prototype. This object is useful for lookup without having to
 * guard against prototypically inherited properties via hasOwnProperty.
 *
 * Related micro-benchmarks:
 * - http://jsperf.com/object-create2
 * - http://jsperf.com/proto-map-lookup/2
 * - http://jsperf.com/for-in-vs-object-keys2
 */
function createMap() {
  return Object.create(null)
}

var subscribers = "$" + expose
var otherRequire = window.require
var otherDefine = window.define
var innerRequire
var stopRepeatAssign = false
var rword = /[^, ]+/g //切割字符串为一个个小块，以空格或豆号分开它们，结合replace实现字符串的forEach
var rcomplexType = /^(?:object|array)$/
var rsvg = /^\[object SVG\w*Element\]$/
var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
var oproto = Object.prototype
var ohasOwn = oproto.hasOwnProperty
var serialize = oproto.toString
var ap = Array.prototype
var aslice = ap.slice
var Registry = {} //将函数曝光到此对象上，方便访问器收集依赖
var W3C = window.dispatchEvent
var root = DOC.documentElement
var avalonFragment = DOC.createDocumentFragment()
var cinerator = DOC.createElement("div")
var class2type = {}
"Boolean Number String Function Array Date RegExp Object Error".replace(rword, function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase()
})


function noop() {
}


function oneObject(array, val) {
    if (typeof array === "string") {
        array = array.match(rword) || []
    }
    var result = {},
            value = val !== void 0 ? val : 1
    for (var i = 0, n = array.length; i < n; i++) {
        result[array[i]] = value
    }
    return result
}

//生成UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
var generateID = function (prefix) {
    prefix = prefix || "avalon"
    return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, prefix)
}
function IE() {
    if (window.VBArray) {
        var mode = document.documentMode
        return mode ? mode : window.XMLHttpRequest ? 7 : 6
    } else {
        return NaN
    }
}
var IEVersion = IE()

avalon = function (el) { //创建jQuery式的无new 实例化结构
    return new avalon.init(el)
}

avalon.profile = function () {
    if (window.console && avalon.config.profile) {
        Function.apply.call(console.log, console, arguments)
    }
}

/*视浏览器情况采用最快的异步回调*/
avalon.nextTick = new function () {// jshint ignore:line
    var tickImmediate = window.setImmediate
    var tickObserver = window.MutationObserver
    if (tickImmediate) {//IE10 \11 edage
        return tickImmediate.bind(window)
    }

    var queue = []
    function callback() {
        var n = queue.length
        for (var i = 0; i < n; i++) {
            queue[i]()
        }
        queue = queue.slice(n)
    }

    if (tickObserver) {// 支持MutationObserver
        var node = document.createTextNode("avalon")
        new tickObserver(callback).observe(node, {characterData: true})// jshint ignore:line
        return function (fn) {
            queue.push(fn)
            node.data = Math.random()
        }
    }

    if (window.VBArray) {
        return function (fn) {
            queue.push(fn)
            var node = DOC.createElement("script")
            node.onreadystatechange = function () {
                callback() //在interactive阶段就触发
                node.onreadystatechange = null
                head.removeChild(node)
                node = null
            }
            head.appendChild(node)
        }
    }


    return function (fn) {
        setTimeout(fn, 4)
    }
}// jshint ignore:line
/*********************************************************************
 *                 avalon的静态方法定义区                              *
 **********************************************************************/
avalon.init = function(el) {
    this[0] = this.element = el
}
avalon.fn = avalon.prototype = avalon.init.prototype

avalon.type = function(obj) { //取得目标的类型
    if (obj == null) {
        return String(obj)
    }
    // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
    return typeof obj === "object" || typeof obj === "function" ?
            class2type[serialize.call(obj)] || "object" :
            typeof obj
}

var isFunction = function(fn) {
    return serialize.call(fn) === "[object Function]"
}

avalon.isFunction = isFunction

avalon.isWindow = function(obj) {
    return rwindow.test(serialize.call(obj))
}

/*判定是否是一个朴素的javascript对象（Object），不是DOM对象，不是BOM对象，不是自定义类的实例*/

avalon.isPlainObject = function(obj) {
    // 简单的 typeof obj === "object"检测，会致使用isPlainObject(window)在opera下通不过
    return serialize.call(obj) === "[object Object]" && Object.getPrototypeOf(obj) === oproto
}

//与jQuery.extend方法，可用于浅拷贝，深拷贝
avalon.mix = avalon.fn.mix = function() {
    var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false

    // 如果第一个参数为布尔,判定是否深拷贝
    if (typeof target === "boolean") {
        deep = target
        target = arguments[1] || {}
        i++
    }

    //确保接受方为一个复杂的数据类型
    if (typeof target !== "object" && !isFunction(target)) {
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

function _number(a, len) { //用于模拟slice, splice的效果
    a = Math.floor(a) || 0
    return a < 0 ? Math.max(len + a, 0) : Math.min(a, len);
}
avalon.mix({
    rword: rword,
    subscribers: subscribers,
    version: 1.46,
    ui: {},
    log: log,
    slice: function(nodes, start, end) {
        return aslice.call(nodes, start, end)
    },
    noop: noop,
    /*如果不用Error对象封装一下，str在控制台下可能会乱码*/
    error: function(str, e) {
        throw new (e || Error)(str)// jshint ignore:line
    },
    /*将一个以空格或逗号隔开的字符串或数组,转换成一个键值都为1的对象*/
    oneObject: oneObject,
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
    range: function(start, end, step) { // 用于生成整数数组
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
    eventHooks: {},
    /*绑定事件*/
    bind: function(el, type, fn, phase) {
        var hooks = avalon.eventHooks
        var hook = hooks[type]
        if (typeof hook === "object") {
            type = hook.type
            if (hook.deel) {
                fn = hook.deel(el, type, fn, phase)
            }
        }
        if (!fn.unbind)
            el.addEventListener(type, fn, !!phase)
        return fn
    },
    /*卸载事件*/
    unbind: function(el, type, fn, phase) {
        var hooks = avalon.eventHooks
        var hook = hooks[type]
        var callback = fn || noop
        if (typeof hook === "object") {
            type = hook.type
            if (hook.deel) {
                fn = hook.deel(el, type, fn, false)
            }
        }
        el.removeEventListener(type, callback, !!phase)
    },
    /*读写删除元素节点的样式*/
    css: function(node, name, value) {
        if (node instanceof avalon) {
            node = node[0]
        }
        var prop = /[_-]/.test(name) ? camelize(name) : name, fn
        name = avalon.cssName(prop) || prop
        if (value === void 0 || typeof value === "boolean") { //获取样式
            fn = cssHooks[prop + ":get"] || cssHooks["@:get"]
            if (name === "background") {
                name = "backgroundColor"
            }
            var val = fn(node, name)
            return value === true ? parseFloat(val) || 0 : val
        } else if (value === "") { //请除样式
            node.style[name] = ""
        } else { //设置样式
            if (value == null || value !== value) {
                return
            }
            if (isFinite(value) && !avalon.cssNumber[prop]) {
                value += "px"
            }
            fn = cssHooks[prop + ":set"] || cssHooks["@:set"]
            fn(node, name, value)
        }
    },
    /*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
    each: function(obj, fn) {
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
    },
    //收集元素的data-{{prefix}}-*属性，并转换为对象
    getWidgetData: function(elem, prefix) {
        var raw = avalon(elem).data()
        var result = {}
        for (var i in raw) {
            if (i.indexOf(prefix) === 0) {
                result[i.replace(prefix, "").replace(/\w/, function(a) {
                    return a.toLowerCase()
                })] = raw[i]
            }
        }
        return result
    },
    Array: {
        /*只有当前数组不存在此元素时只添加它*/
        ensure: function(target, item) {
            if (target.indexOf(item) === -1) {
                return target.push(item)
            }
        },
        /*移除数组中指定位置的元素，返回布尔表示成功与否*/
        removeAt: function(target, index) {
            return !!target.splice(index, 1).length
        },
        /*移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否*/
        remove: function(target, item) {
            var index = target.indexOf(item)
            if (~index)
                return avalon.Array.removeAt(target, index)
            return false
        }
    }
})

var bindingHandlers = avalon.bindingHandlers = {}
var bindingExecutors = avalon.bindingExecutors = {}

/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
function isArrayLike(obj) {
    if (obj && typeof obj === "object") {
        var n = obj.length,
                str = serialize.call(obj)
        if (/(Array|List|Collection|Map|Arguments)\]$/.test(str)) {
            return true
        } else if (str === "[object Object]" && n === (n >>> 0)) {
            return true //由于ecma262v5能修改对象属性的enumerable，因此不能用propertyIsEnumerable来判定了
        }
    }
    return false
}


// https://github.com/rsms/js-lru
var Cache = new function() {// jshint ignore:line
    function LRU(maxLength) {
        this.size = 0
        this.limit = maxLength
        this.head = this.tail = void 0
        this._keymap = {}
    }

    var p = LRU.prototype

    p.put = function(key, value) {
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

    p.shift = function() {
        var entry = this.head
        if (entry) {
            this.head = this.head.newer
            this.head.older =
                    entry.newer =
                    entry.older =
                    this._keymap[entry.key] = void 0
        }
    }
    p.get = function(key) {
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
    return LRU
}// jshint ignore:line

/*********************************************************************
 *                           DOM 底层补丁                             *
 **********************************************************************/
//safari5+是把contains方法放在Element.prototype上而不是Node.prototype
if (!DOC.contains) {
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

if (window.SVGElement) {
    var svgns = "http://www.w3.org/2000/svg"
    var svg = DOC.createElementNS(svgns, "svg")
    svg.innerHTML = '<circle cx="50" cy="50" r="40" fill="red" />'
    if (!rsvg.test(svg.firstChild)) {// #409
        /* jshint ignore:start */
        function enumerateNode(node, targetNode) {
            if (node && node.childNodes) {
                var nodes = node.childNodes
                for (var i = 0, el; el = nodes[i++]; ) {
                    if (el.tagName) {
                        var svg = DOC.createElementNS(svgns,
                                el.tagName.toLowerCase())
                        // copy attrs
                        ap.forEach.call(el.attributes, function (attr) {
                            svg.setAttribute(attr.name, attr.value)
                        })
                        // 递归处理子节点
                        enumerateNode(el, svg)
                        targetNode.appendChild(svg)
                    }
                }
            }
        }
        /* jshint ignore:end */
        Object.defineProperties(SVGElement.prototype, {
            "outerHTML": {//IE9-11,firefox不支持SVG元素的innerHTML,outerHTML属性
                enumerable: true,
                configurable: true,
                get: function () {
                    return new XMLSerializer().serializeToString(this)
                },
                set: function (html) {
                    var tagName = this.tagName.toLowerCase(),
                            par = this.parentNode,
                            frag = avalon.parseHTML(html)
                    // 操作的svg，直接插入
                    if (tagName === "svg") {
                        par.insertBefore(frag, this)
                        // svg节点的子节点类似
                    } else {
                        var newFrag = DOC.createDocumentFragment()
                        enumerateNode(frag, newFrag)
                        par.insertBefore(newFrag, this)
                    }
                    par.removeChild(this)
                }
            },
            "innerHTML": {
                enumerable: true,
                configurable: true,
                get: function () {
                    var s = this.outerHTML
                    var ropen = new RegExp("<" + this.nodeName + '\\b(?:(["\'])[^"]*?(\\1)|[^>])*>', "i")
                    var rclose = new RegExp("<\/" + this.nodeName + ">$", "i")
                    return  s.replace(ropen, "").replace(rclose, "")
                },
                set: function (html) {
                    if (avalon.clearHTML) {
                        avalon.clearHTML(this)
                        var frag = avalon.parseHTML(html)
                        enumerateNode(frag, this)
                    }
                }
            }
        })
    }
}
//========================= event binding ====================
var eventHooks = avalon.eventHooks
//针对firefox, chrome修正mouseenter, mouseleave(chrome30+)
if (!("onmouseenter" in root)) {
    avalon.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (origType, fixType) {
        eventHooks[origType] = {
            type: fixType,
            deel: function (elem, _, fn) {
                return function (e) {
                    var t = e.relatedTarget
                    if (!t || (t !== elem && !(elem.compareDocumentPosition(t) & 16))) {
                        delete e.type
                        e.type = origType
                        return fn.call(elem, e)
                    }
                }
            }
        }
    })
}
//针对IE9+, w3c修正animationend
avalon.each({
    AnimationEvent: "animationend",
    WebKitAnimationEvent: "webkitAnimationEnd"
}, function (construct, fixType) {
    if (window[construct] && !eventHooks.animationend) {
        eventHooks.animationend = {
            type: fixType
        }
    }
})

if (DOC.onmousewheel === void 0) {
    /* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
     firefox DOMMouseScroll detail 下3 上-3
     firefox wheel detlaY 下3 上-3
     IE9-11 wheel deltaY 下40 上-40
     chrome wheel deltaY 下100 上-100 */
    eventHooks.mousewheel = {
        type: "wheel",
        deel: function (elem, _, fn) {
            return function (e) {
                e.wheelDeltaY = e.wheelDelta = e.deltaY > 0 ? -120 : 120
                e.wheelDeltaX = 0
                Object.defineProperty(e, "type", {
                    value: "mousewheel"
                })
                fn.call(elem, e)
            }
        }
    }
}
/*********************************************************************
 *                           配置系统                                 *
 **********************************************************************/

function kernel(settings) {
    for (var p in settings) {
        if (!ohasOwn.call(settings, p))
            continue
        var val = settings[p]
        if (typeof kernel.plugins[p] === "function") {
            kernel.plugins[p](val)
        } else if (typeof kernel[p] === "object") {
            avalon.mix(kernel[p], val)
        } else {
            kernel[p] = val
        }
    }
    return this
}
var openTag, closeTag, rexpr, rexprg, rbind, rregexp = /[-.*+?^${}()|[\]\/\\]/g

function escapeRegExp(target) {
    //http://stevenlevithan.com/regex/xregexp/
    //将字符串安全格式化为正则表达式的源码
    return (target + "").replace(rregexp, "\\$&")
}

var plugins = {
    loader: function (builtin) {
        var flag = innerRequire && builtin
        window.require = flag ? innerRequire : otherRequire
        window.define = flag ? innerRequire.define : otherDefine
    },
    interpolate: function (array) {
        openTag = array[0]
        closeTag = array[1]
        if (openTag === closeTag) {
            throw new SyntaxError("openTag===closeTag")
        } else {
            var test = openTag + "test" + closeTag
            cinerator.innerHTML = test
            if (cinerator.innerHTML !== test && cinerator.innerHTML.indexOf("&lt;") > -1) {
                throw new SyntaxError("此定界符不合法")
            }
            kernel.openTag = openTag
            kernel.closeTag = closeTag
            cinerator.innerHTML = ""
        }
        var o = escapeRegExp(openTag),
                c = escapeRegExp(closeTag)
        rexpr = new RegExp(o + "(.*?)" + c)
        rexprg = new RegExp(o + "(.*?)" + c, "g")
        rbind = new RegExp(o + ".*?" + c + "|\\sms-")
    }
}

kernel.debug = true
kernel.plugins = plugins
kernel.plugins['interpolate'](["{{", "}}"])
kernel.paths = {}
kernel.shim = {}
kernel.maxRepeatSize = 100
avalon.config = kernel
var ravalon = /(\w+)\[(avalonctrl)="(\S+)"\]/
var findNodes = function(str) {
    return DOC.querySelectorAll(str)
} 
/*********************************************************************
 *                            事件总线                               *
 **********************************************************************/
var EventBus = {
    $watch: function (type, callback) {
        if (typeof callback === "function") {
            var callbacks = this.$events[type]
            if (callbacks) {
                callbacks.push(callback)
            } else {
                this.$events[type] = [callback]
            }
        } else { //重新开始监听此VM的第一重简单属性的变动
            this.$events = this.$watch.backup
        }
        return this
    },
    $unwatch: function (type, callback) {
        var n = arguments.length
        if (n === 0) { //让此VM的所有$watch回调无效化
            this.$watch.backup = this.$events
            this.$events = {}
        } else if (n === 1) {
            this.$events[type] = []
        } else {
            var callbacks = this.$events[type] || []
            var i = callbacks.length
            while (~--i < 0) {
                if (callbacks[i] === callback) {
                    return callbacks.splice(i, 1)
                }
            }
        }
        return this
    },
    $fire: function (type) {
        var special, i, v, callback
        if (/^(\w+)!(\S+)$/.test(type)) {
            special = RegExp.$1
            type = RegExp.$2
        }
        var events = this.$events
        if (!events)
            return
        var args = aslice.call(arguments, 1)
        var detail = [type].concat(args)
        if (special === "all") {
            for (i in avalon.vmodels) {
                v = avalon.vmodels[i]
                if (v !== this) {
                    v.$fire.apply(v, detail)
                }
            }
        } else if (special === "up" || special === "down") {
            var elements = events.expr ? findNodes(events.expr) : []
            if (elements.length === 0)
                return
            for (i in avalon.vmodels) {
                v = avalon.vmodels[i]
                if (v !== this) {
                    if (v.$events.expr) {
                        var eventNodes = findNodes(v.$events.expr)
                        if (eventNodes.length === 0) {
                            continue
                        }
                        //循环两个vmodel中的节点，查找匹配（向上匹配或者向下匹配）的节点并设置标识
                        /* jshint ignore:start */
                        ap.forEach.call(eventNodes, function (node) {
                            ap.forEach.call(elements, function (element) {
                                var ok = special === "down" ? element.contains(node) : //向下捕获
                                        node.contains(element) //向上冒泡
                                if (ok) {
                                    node._avalon = v //符合条件的加一个标识
                                }
                            });
                        })
                        /* jshint ignore:end */
                    }
                }
            }
            var nodes = DOC.getElementsByTagName("*") //实现节点排序
            var alls = []
            ap.forEach.call(nodes, function (el) {
                if (el._avalon) {
                    alls.push(el._avalon)
                    el._avalon = ""
                    el.removeAttribute("_avalon")
                }
            })
            if (special === "up") {
                alls.reverse()
            }
            for (i = 0; callback = alls[i++]; ) {
                if (callback.$fire.apply(callback, detail) === false) {
                    break
                }
            }
        } else {
            var callbacks = events[type] || []
            var all = events.$all || []
            for (i = 0; callback = callbacks[i++]; ) {
                if (isFunction(callback))
                    callback.apply(this, args)
            }
            for (i = 0; callback = all[i++]; ) {
                if (isFunction(callback))
                    callback.apply(this, arguments)
            }
        }
    }
}
/*********************************************************************
 *                           modelFactory                             *
 **********************************************************************/
//avalon最核心的方法的两个方法之一（另一个是avalon.scan），返回一个ViewModel(VM)
var VMODELS = avalon.vmodels = {} //所有vmodel都储存在这里
avalon.define = function (id, factory) {
    var $id = id.$id || id
    if (!$id) {
        log("warning: vm必须指定$id")
    }
    if (VMODELS[$id]) {
        log("warning: " + $id + " 已经存在于avalon.vmodels中")
    }
    if (typeof id === "object") {
        var model = modelFactory(id)
    } else {
        var scope = {
            $watch: noop
        }
        factory(scope) //得到所有定义
        model = modelFactory(scope) //偷天换日，将scope换为model
        stopRepeatAssign = true
        factory(model)
        stopRepeatAssign = false
    }
    model.$id = $id
    return VMODELS[$id] = model
}

//一些不需要被监听的属性
var $$skipArray = String("$id,$watch,$unwatch,$fire,$events,$model,$skipArray,$reinitialize").match(rword)

function modelFactory(source, $special, $model) {
    if (Array.isArray(source)) {
        var arr = source.concat()
        source.length = 0
        var collection = arrayFactory(source)// jshint ignore:line
        collection.pushArray(arr)
        return collection
    }
    //0 null undefined || Node || VModel(fix IE6-8 createWithProxy $val: val引发的BUG)
    if (!source || source.nodeType > 0 || (source.$id && source.$events)) {
        return source
    }
    var $skipArray = Array.isArray(source.$skipArray) ? source.$skipArray : []
    $skipArray.$special = $special || createMap() //强制要监听的属性
    var $vmodel = {} //要返回的对象, 它在IE6-8下可能被偷龙转凤
    $model = $model || {} //vmodels.$model属性
    var $events = createMap() //vmodel.$events属性
    var accessors = createMap() //监控属性
    var computed = []
    $$skipArray.forEach(function (name) {
        delete source[name]
    })

    var names = Object.keys(source)
    /* jshint ignore:start */
    names.forEach(function (name, accessor) {
        var val = source[name]
        $model[name] = val
        if (isObservable(name, val, $skipArray)) {
            //总共产生三种accessor
            $events[name] = []
            var valueType = avalon.type(val)
            //总共产生三种accessor
            if (valueType === "object" && isFunction(val.get) && Object.keys(val).length <= 2) {
                accessor = makeComputedAccessor(name, val)
                computed.push(accessor)
            } else if (rcomplexType.test(valueType)) {
                // issue #940 解决$model层次依赖丢失 https://github.com/RubyLouvre/avalon/issues/940
                accessor = makeComplexAccessor(name, val, valueType, $events[name], $model)
            } else {
                accessor = makeSimpleAccessor(name, val)
            }
            accessors[name] = accessor
        }
    })
    /* jshint ignore:end */
    $vmodel = Object.defineProperties($vmodel, descriptorFactory(accessors)) //生成一个空的ViewModel
    for (var i = 0; i < names.length; i++) {
        var name = names[i]
        if (!accessors[name]) {
            $vmodel[name] = source[name]
        }
    }
    //添加$id, $model, $events, $watch, $unwatch, $fire
    hideProperty($vmodel, "$id", generateID())
    hideProperty($vmodel, "$model", $model)
    hideProperty($vmodel, "$events", $events)
    /* jshint ignore:start */
    hideProperty($vmodel, "hasOwnProperty", function (name) {
        return name in this.$model
    })
    /* jshint ignore:end */
    for (var i in EventBus) {
        hideProperty($vmodel, i, EventBus[i])
    }

    $vmodel.$reinitialize = function () {
        computed.forEach(function (accessor) {
            delete accessor._value
            delete accessor.oldArgs
            accessor.digest = function () {
                accessor.call($vmodel)
            }
            dependencyDetection.begin({
                callback: function (vm, dependency) {//dependency为一个accessor
                    var name = dependency._name
                    if (dependency !== accessor) {
                        var list = vm.$events[name]
                        accessor.vm = $vmodel
                        injectDependency(list, accessor.digest)
                    }
                }
            })
            try {
                accessor.get.call($vmodel)
            } finally {
                dependencyDetection.end()
            }
        })
    }
    $vmodel.$reinitialize()
    return $vmodel
}

function hideProperty(host, name, value) {
    Object.defineProperty(host, name, {
        value: value,
        writable: true,
        enumerable: false,
        configurable: true
    })
}

function keysVM(obj) {
    var arr = Object.keys(obj)
    for (var i = 0; i < $$skipArray.length; i++) {
        var index = arr.indexOf($$skipArray[i])
        if (index !== -1) {
            arr.splice(index, 1)
        }
    }
    return arr
}
//创建一个简单访问器
function makeSimpleAccessor(name, value) {
    function accessor(value) {
        var oldValue = accessor._value
        if (arguments.length > 0) {
            if (!stopRepeatAssign && !isEqual(value, oldValue)) {
                accessor.updateValue(this, value)
                accessor.notify(this, value, oldValue)
            }
            return this
        } else {
            dependencyDetection.collectDependency(this, accessor)
            return oldValue
        }
    }
    accessorFactory(accessor, name)
    accessor._value = value
    return accessor;
}

///创建一个计算访问器
function makeComputedAccessor(name, options) {
    function accessor(value) {//计算属性
        var oldValue = accessor._value
        var init = ("_value" in accessor)
        if (arguments.length > 0) {
            if (stopRepeatAssign) {
                return this
            }
            if (typeof accessor.set === "function") {
                if (accessor.oldArgs !== value) {
                    accessor.oldArgs = value
                    var $events = this.$events
                    var lock = $events[name]
                    $events[name] = [] //清空回调，防止内部冒泡而触发多次$fire
                    accessor.set.call(this, value)
                    $events[name] = lock
                    value = accessor.get.call(this)
                    if (value !== oldValue) {
                        accessor.updateValue(this, value)
                        accessor.notify(this, value, oldValue) //触发$watch回调
                    }
                }
            }
            return this
        } else {
            //将依赖于自己的高层访问器或视图刷新函数（以绑定对象形式）放到自己的订阅数组中
            //将自己注入到低层访问器的订阅数组中
            value = accessor.get.call(this)
            accessor.updateValue(this, value)
            if (init && oldValue !== value) {
                accessor.notify(this, value, oldValue) //触发$watch回调
            }
            return value
        }
    }
    accessor.set = options.set
    accessor.get = options.get
    accessorFactory(accessor, name)
    return accessor
}


//创建一个复杂访问器
function makeComplexAccessor(name, initValue, valueType, list, parentModel) {
    function accessor(value) {
        var oldValue = accessor._value
        var son = accessor._vmodel
        if (arguments.length > 0) {
            if (stopRepeatAssign) {
                return this
            }
            if (valueType === "array") {
                var a = son, b = value,
                        an = a.length,
                        bn = b.length
                a.$lock = true
                if (an > bn) {
                    a.splice(bn, an - bn)
                } else if (bn > an) {
                    a.push.apply(a, b.slice(an))
                }
                var n = Math.min(an, bn)
                for (var i = 0; i < n; i++) {
                    a.set(i, b[i])
                }
                delete a.$lock
                a._fire("set")
            } else if (valueType === "object") {
                var observes = this.$events[name] || []
                var newObject = avalon.mix(true, {}, value)
                for (i in son) {
                    if (son.hasOwnProperty(i) && ohasOwn.call(newObject, i)) {
                        son[i] = newObject[i]
                    }
                }
                son = accessor._vmodel = modelFactory(value)
                son.$events[subscribers] = observes
                if (observes.length) {
                    observes.forEach(function (data) {
                        if(!data.type) {
                           return //防止模板先加载报错
                        }
                        if (data.rollback) {
                            data.rollback() //还原 ms-with ms-on
                        }
                        bindingHandlers[data.type](data, data.vmodels)
                    })
                }
            }
            accessor.updateValue(this, son.$model)
            accessor.notify(this, this._value, oldValue)
            return this
        } else {
            dependencyDetection.collectDependency(this, accessor)
            return son
        }
    }
    accessorFactory(accessor, name)
    if (Array.isArray(initValue)) {
        parentModel[name] = initValue
    } else {
        parentModel[name] = parentModel[name] || {}
    }
    var son = accessor._vmodel = modelFactory(initValue, 0, parentModel[name])
    son.$events[subscribers] = list
    return accessor
}

function globalUpdateValue(vmodel, value) {
    vmodel.$model[this._name] = this._value = value
}
function globalUpdateModelValue(vmodel, value) {
    vmodel.$model[this._name] = value
}
function globalNotify(vmodel, value, oldValue) {
    var name = this._name
    var array = vmodel.$events[name] //刷新值
    if (array) {
        fireDependencies(array) //同步视图
        EventBus.$fire.call(vmodel, name, value, oldValue) //触发$watch回调
    }
}

function accessorFactory(accessor, name) {
    accessor._name = name
    //同时更新_value与model
    accessor.updateValue = globalUpdateValue
    accessor.notify = globalNotify
}
//比较两个值是否相等
var isEqual = Object.is || function (v1, v2) {
    if (v1 === 0 && v2 === 0) {
        return 1 / v1 === 1 / v2
    } else if (v1 !== v1) {
        return v2 !== v2
    } else {
        return v1 === v2
    }
}

function isObservable(name, value, $skipArray) {
    if (isFunction(value) || value && value.nodeType) {
        return false
    }
    if ($skipArray.indexOf(name) !== -1) {
        return false
    }
    var $special = $skipArray.$special
    if (name && name.charAt(0) === "$" && !$special[name]) {
        return false
    }
    return true
}

var descriptorFactory = function (obj) {
    var descriptors = {}
    for (var i in obj) {
        descriptors[i] = {
            get: obj[i],
            set: obj[i],
            enumerable: true,
            configurable: true
        }
    }
    return descriptors
}


/*********************************************************************
 *          监控数组（与ms-each, ms-repeat配合使用）                     *
 **********************************************************************/

function arrayFactory(model) {
    var array = []
    array.$id = generateID()
    array.$model = model //数据模型
    array.$events = {}
    array.$events[subscribers] = []
    array._ = modelFactory({
        length: model.length
    })
    array._.$watch("length", function (a, b) {
        array.$fire("length", a, b)
    })
    for (var i in EventBus) {
        array[i] = EventBus[i]
    }
    avalon.mix(array, arrayPrototype)
    return array
}

function mutateArray(method, pos, n, index, method2, pos2, n2) {
    var oldLen = this.length, loop = 2
    while (--loop) {
        switch (method) {
      case "add":
                /* jshint ignore:start */
                var array = this.$model.slice(pos, pos + n).map(function (el) {
                    if (rcomplexType.test(avalon.type(el))) {
                        return el.$id ? el : modelFactory(el, 0, el)
                    } else {
                        return el
                    }
                })
                /* jshint ignore:end */
                _splice.apply(this, [pos, 0].concat(array))
                this._fire("add", pos, n)
                break
            case "del":
                var ret = this._splice(pos, n)
                this._fire("del", pos, n)
                break
        }
        if (method2) {
            method = method2
            pos = pos2
            n = n2
            loop = 2
            method2 = 0
        }
    }
    this._fire("index", index)
    if (this.length !== oldLen) {
        this._.length = this.length
    }
    return ret
}

var _splice = ap.splice
var arrayPrototype = {
    _splice: _splice,
    _fire: function (method, a, b) {
        fireDependencies(this.$events[subscribers], method, a, b)
    },
    size: function () { //取得数组长度，这个函数可以同步视图，length不能
        return this._.length
    },
    pushArray: function (array) {
        var m = array.length, n = this.length
        if (m) {
            ap.push.apply(this.$model, array)
            mutateArray.call(this, "add", n, m, Math.max(0, n - 1))
        }
        return  m + n
    },
    push: function () {
        //http://jsperf.com/closure-with-arguments
        var array = []
        var i, n = arguments.length
        for (i = 0; i < n; i++) {
            array[i] = arguments[i]
        }
        return this.pushArray(array)
    },
    unshift: function () {
        var m = arguments.length, n = this.length
        if (m) {
            ap.unshift.apply(this.$model, arguments)
            mutateArray.call(this, "add", 0, m, 0)
        }
        return  m + n //IE67的unshift不会返回长度
    },
    shift: function () {
        if (this.length) {
            var el = this.$model.shift()
            mutateArray.call(this, "del", 0, 1, 0)
            return el //返回被移除的元素
        }
    },
    pop: function () {
        var n = this.length
        if (n) {
            var el = this.$model.pop()
            mutateArray.call(this, "del", n - 1, 1, Math.max(0, n - 2))
            return el //返回被移除的元素
        }
    },
    splice: function (start) {
        var m = arguments.length, args = [], change
        var removed = _splice.apply(this.$model, arguments)
        if (removed.length) { //如果用户删掉了元素
            args.push("del", start, removed.length, 0)
            change = true
        }
        if (m > 2) {  //如果用户添加了元素
            if (change) {
                args.splice(3, 1, 0, "add", start, m - 2)
            } else {
                args.push("add", start, m - 2, 0)
            }
            change = true
        }
        if (change) { //返回被移除的元素
            return mutateArray.apply(this, args)
        } else {
            return []
        }
    },
    contains: function (el) { //判定是否包含
        return this.indexOf(el) !== -1
    },
    remove: function (el) { //移除第一个等于给定值的元素
        return this.removeAt(this.indexOf(el))
    },
    removeAt: function (index) { //移除指定索引上的元素
        if (index >= 0) {
            this.$model.splice(index, 1)
            return mutateArray.call(this, "del", index, 1, 0)
        }
        return  []
    },
    clear: function () {
        this.$model.length = this.length = this._.length = 0 //清空数组
        this._fire("clear", 0)
        return this
    },
    removeAll: function (all) { //移除N个元素
        if (Array.isArray(all)) {
            for (var i = this.length - 1; i >= 0; i--) {
                if (all.indexOf(this[i]) !== -1) {
                    this.removeAt(i)
                }
            }
        } else if (typeof all === "function") {
            for ( i = this.length - 1; i >= 0; i--) {
                var el = this[i]
                if (all(el, i)) {
                    this.removeAt(i)
                }
            }
        } else {
            this.clear()
        }
    },
    ensure: function (el) {
        if (!this.contains(el)) { //只有不存在才push
            this.push(el)
        }
        return this
    },
    set: function (index, val) {
        if (index < this.length && index > -1) {
            var valueType = avalon.type(val)
            if (val && val.$model) {
                val = val.$model
            }
            var target = this[index]
            if (valueType === "object") {
                for (var i in val) {
                    if (target.hasOwnProperty(i)) {
                        target[i] = val[i]
                    }
                }
            } else if (valueType === "array") {
                target.clear().push.apply(target, val)
            } else if (target !== val) {
                this[index] = val
                this.$model[index] = val
                this._fire("set", index, val)
            }
        }
        return this
    }
}
//相当于原来bindingExecutors.repeat 的index分支
function resetIndex(array, pos) {
    var last = array.length - 1
    for (var el; el = array[pos]; pos++) {
        el.$index = pos
        el.$first = pos === 0
        el.$last = pos === last
    }
}

function sortByIndex(array, indexes) {
    var map = {};
    for (var i = 0, n = indexes.length; i < n; i++) {
        map[i] = array[i] // preserve
        var j = indexes[i]
        if (j in map) {
            array[i] = map[j]
            delete map[j]
        } else {
            array[i] = array[j]
        }
    }
}

"sort,reverse".replace(rword, function (method) {
    arrayPrototype[method] = function () {
        var newArray = this.$model//这是要排序的新数组
        var oldArray = newArray.concat() //保持原来状态的旧数组
        var mask = Math.random()
        var indexes = []
        var hasSort
        ap[method].apply(newArray, arguments) //排序
        for (var i = 0, n = oldArray.length; i < n; i++) {
            var neo = newArray[i]
            var old = oldArray[i]
            if (isEqual(neo, old)) {
                indexes.push(i)
            } else {
                var index = oldArray.indexOf(neo)
                indexes.push(index)//得到新数组的每个元素在旧数组对应的位置
                oldArray[index] = mask    //屏蔽已经找过的元素
                hasSort = true
            }
        }
        if (hasSort) {
            sortByIndex(this, indexes)
            // sortByIndex(this.$proxy, indexes)
            this._fire("move", indexes)
              this._fire("index", 0)
        }
        return this
    }
})


/*********************************************************************
 *                           依赖调度系统                             *
 **********************************************************************/
//检测两个对象间的依赖关系
var dependencyDetection = (function () {
    var outerFrames = []
    var currentFrame
    return {
        begin: function (accessorObject) {
            //accessorObject为一个拥有callback的对象
            outerFrames.push(currentFrame)
            currentFrame = accessorObject
        },
        end: function () {
            currentFrame = outerFrames.pop()
        },
        collectDependency: function (vmodel, accessor) {
            if (currentFrame) {
                //被dependencyDetection.begin调用
                currentFrame.callback(vmodel, accessor);
            }
        }
    };
})()
//将绑定对象注入到其依赖项的订阅数组中
var ronduplex = /^(duplex|on)$/
avalon.injectBinding = function (data) {
    var valueFn = data.evaluator
    if (valueFn) { //如果是求值函数
        dependencyDetection.begin({
            callback: function (vmodel, dependency) {
                injectDependency(vmodel.$events[dependency._name], data)
            }
        })
        try {
            var value = ronduplex.test(data.type) ? data : valueFn.apply(0, data.args)
            if(value === void 0){
                delete data.evaluator
            }
            data.handler(value, data.element, data)
        } catch (e) {
            log("warning:exception throwed in [avalon.injectBinding] " , e)
            delete data.evaluator
            var node = data.element
            if (node.nodeType === 3) {
                var parent = node.parentNode
                if (kernel.commentInterpolate) {
                    parent.replaceChild(DOC.createComment(data.value), node)
                } else {
                    node.data = openTag + (data.oneTime ? "::" : "") + data.value + closeTag
                }
            }
        } finally {
            dependencyDetection.end()
        }
    }
}

//将依赖项(比它高层的访问器或构建视图刷新函数的绑定对象)注入到订阅者数组 
function injectDependency(list, data) {
    if (data.oneTime)
        return
    if (list && avalon.Array.ensure(list, data) && data.element) {
        injectDisposeQueue(data, list)
        if (new Date() - beginTime > 444 ) {
            rejectDisposeQueue()
        }
    }
}

//通知依赖于这个访问器的订阅者更新自身
function fireDependencies(list) {
    if (list && list.length) {
        if (new Date() - beginTime > 444 && typeof list[0] === "object") {
            rejectDisposeQueue()
        }
        var args = aslice.call(arguments, 1)
        for (var i = list.length, fn; fn = list[--i]; ) {
            var el = fn.element
            if (el && el.parentNode) {
                try {
                    var valueFn = fn.evaluator
                    if (fn.$repeat) {
                        fn.handler.apply(fn, args) //处理监控数组的方法
                    }else if("$repeat" in fn || !valueFn ){//如果没有eval,先eval
                        bindingHandlers[fn.type](fn, fn.vmodels)
                    } else if (fn.type !== "on") { //事件绑定只能由用户触发,不能由程序触发
                       var value = valueFn.apply(0, fn.args || [])
                       fn.handler(value, el, fn)
                    }
                } catch (e) { 
                    console.log(e)
                }
            }
        }
    }
}
/*********************************************************************
 *                          定时GC回收机制                             *
 **********************************************************************/
var disposeCount = 0
var disposeQueue = avalon.$$subscribers = []
var beginTime = new Date()
var oldInfo = {}
//var uuid2Node = {}
function getUid(obj, makeID) { //IE9+,标准浏览器
    if (!obj.uuid && !makeID) {
        obj.uuid = ++disposeCount
        //uuid2Node[obj.uuid] = obj
    }
    return obj.uuid
}
//function getNode(uuid) {
//    return uuid2Node[uuid]
//}
//添加到回收列队中
function injectDisposeQueue(data, list) {
    var elem = data.element
    if (!data.uuid) {
        if (elem.nodeType !== 1) {
            data.uuid = data.type + (data.pos || 0) + "-" + getUid(elem.parentNode)
        } else {
            data.uuid = data.name + "-" + getUid(elem)
        }
    }
    var lists = data.lists || (data.lists = [])
    avalon.Array.ensure(lists, list)
    list.$uuid = list.$uuid || generateID()
    if (!disposeQueue[data.uuid]) {
        disposeQueue[data.uuid] = 1
        disposeQueue.push(data)
    }
}

function rejectDisposeQueue(data) {
    if (avalon.optimize)
        return
    var i = disposeQueue.length
    var n = i
    var allTypes = []
    var iffishTypes = {}
    var newInfo = {}
    //对页面上所有绑定对象进行分门别类, 只检测个数发生变化的类型
    while (data = disposeQueue[--i]) {
        var type = data.type
        if (newInfo[type]) {
            newInfo[type]++
        } else {
            newInfo[type] = 1
            allTypes.push(type)
        }
    }
    var diff = false
    allTypes.forEach(function (type) {
        if (oldInfo[type] !== newInfo[type]) {
            iffishTypes[type] = 1
            diff = true
        }
    })
    i = n
    if (diff) {
        while (data = disposeQueue[--i]) {
            if (data.element === null) {
                disposeQueue.splice(i, 1)
                continue
            }
            if (iffishTypes[data.type] && shouldDispose(data.element)) { //如果它没有在DOM树
                disposeQueue.splice(i, 1)
                delete disposeQueue[data.uuid]
                //delete uuid2Node[data.element.uuid]
                var lists = data.lists
                for (var k = 0, list; list = lists[k++]; ) {
                    avalon.Array.remove(lists, list)
                    avalon.Array.remove(list, data)
                }
                disposeData(data)
            }
        }
    }
    oldInfo = newInfo
    beginTime = new Date()
}

function disposeData(data) {
    delete disposeQueue[data.uuid] // 先清除，不然无法回收了
    data.element = null
    data.rollback && data.rollback()
    for (var key in data) {
        data[key] = null
    }
}

function shouldDispose(el) {
    try {//IE下，如果文本节点脱离DOM树，访问parentNode会报错
        var fireError = el.parentNode.nodeType
    } catch (e) {
        return true
    }
    if (el.ifRemove) {
        // 如果节点被放到ifGroup，才移除
        if (!root.contains(el.ifRemove) && (ifGroup === el.parentNode)) {
            el.parentNode && el.parentNode.removeChild(el)
            return true
        }
    }
    return el.msRetain ? 0 : (el.nodeType === 1 ? !root.contains(el) : !avalon.contains(root, el))
}

/************************************************************************
 *              HTML处理(parseHTML, innerHTML, clearHTML)                 *
 **************************************************************************/
//parseHTML的辅助变量
var tagHooks = new function() {// jshint ignore:line
    avalon.mix(this, {
        option: DOC.createElement("select"),
        thead: DOC.createElement("table"),
        td: DOC.createElement("tr"),
        area: DOC.createElement("map"),
        tr: DOC.createElement("tbody"),
        col: DOC.createElement("colgroup"),
        legend: DOC.createElement("fieldset"),
        _default: DOC.createElement("div"),
        "g": DOC.createElementNS("http://www.w3.org/2000/svg", "svg")
    })
    this.optgroup = this.option
    this.tbody = this.tfoot = this.colgroup = this.caption = this.thead
    this.th = this.td
}// jshint ignore:line

String("circle,defs,ellipse,image,line,path,polygon,polyline,rect,symbol,text,use").replace(rword, function(tag) {
    tagHooks[tag] = tagHooks.g //处理SVG
})
var rtagName = /<([\w:]+)/
var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig
var scriptTypes = oneObject(["", "text/javascript", "text/ecmascript", "application/ecmascript", "application/javascript"])
var script = DOC.createElement("script")
var rhtml = /<|&#?\w+;/
avalon.parseHTML = function(html) {
    var fragment = avalonFragment.cloneNode(false)
    if (typeof html !== "string" ) {
        return fragment
    }
    if (!rhtml.test(html)) {
        fragment.appendChild(DOC.createTextNode(html))
        return fragment
    }
    html = html.replace(rxhtml, "<$1></$2>").trim()
    var tag = (rtagName.exec(html) || ["", ""])[1].toLowerCase(),
            //取得其标签名
            wrapper = tagHooks[tag] || tagHooks._default,
            firstChild
    wrapper.innerHTML = html
    var els = wrapper.getElementsByTagName("script")
    if (els.length) { //使用innerHTML生成的script节点不会发出请求与执行text属性
        for (var i = 0, el; el = els[i++]; ) {
            if (scriptTypes[el.type]) {
                var neo = script.cloneNode(false) //FF不能省略参数
                ap.forEach.call(el.attributes, function(attr) {
                    neo.setAttribute(attr.name, attr.value)
                })// jshint ignore:line
                neo.text = el.text
                el.parentNode.replaceChild(neo, el)
            }
        }
    }

    while (firstChild = wrapper.firstChild) { // 将wrapper上的节点转移到文档碎片上！
        fragment.appendChild(firstChild)
    }
    return fragment
}

avalon.innerHTML = function(node, html) {
    var a = this.parseHTML(html)
    this.clearHTML(node).appendChild(a)
}

avalon.clearHTML = function(node) {
    node.textContent = ""
    while (node.firstChild) {
        node.removeChild(node.firstChild)
    }
    return node
}

/*********************************************************************
 *                        avalon的原型方法定义区                        *
 **********************************************************************/

function hyphen(target) {
    //转换为连字符线风格
    return target.replace(/([a-z\d])([A-Z]+)/g, "$1-$2").toLowerCase()
}

function camelize(target) {
    //转换为驼峰风格
    if (target.indexOf("-") < 0 && target.indexOf("_") < 0) {
        return target //提前判断，提高getStyle等的效率
    }
    return target.replace(/[-_][^-_]/g, function(match) {
        return match.charAt(1).toUpperCase()
    })
}

"add,remove".replace(rword, function(method) {
    avalon.fn[method + "Class"] = function(cls) {
        var el = this[0]
        //https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/26
        if (cls && typeof cls === "string" && el && el.nodeType === 1) {
            cls.replace(/\S+/g, function(c) {
                el.classList[method](c)
            })
        }
        return this
    }
})

avalon.fn.mix({
    hasClass: function(cls) {
        var el = this[0] || {} //IE10+, chrome8+, firefox3.6+, safari5.1+,opera11.5+支持classList,chrome24+,firefox26+支持classList2.0
        return el.nodeType === 1 && el.classList.contains(cls)
    },
    toggleClass: function(value, stateVal) {
        var className, i = 0
        var classNames = String(value).split(/\s+/)
        var isBool = typeof stateVal === "boolean"
        while ((className = classNames[i++])) {
            var state = isBool ? stateVal : !this.hasClass(className)
            this[state ? "addClass" : "removeClass"](className)
        }
        return this
    },
    attr: function(name, value) {
        if (arguments.length === 2) {
            this[0].setAttribute(name, value)
            return this
        } else {
            return this[0].getAttribute(name)
        }
    },
    data: function(name, value) {
        name = "data-" + hyphen(name || "")
        switch (arguments.length) {
            case 2:
                this.attr(name, value)
                return this
            case 1:
                var val = this.attr(name)
                return parseData(val)
            case 0:
                var ret = {}
                ap.forEach.call(this[0].attributes, function(attr) {
                    if (attr) {
                        name = attr.name
                        if (!name.indexOf("data-")) {
                            name = camelize(name.slice(5))
                            ret[name] = parseData(attr.value)
                        }
                    }
                })
                return ret
        }
    },
    removeData: function(name) {
        name = "data-" + hyphen(name)
        this[0].removeAttribute(name)
        return this
    },
    css: function(name, value) {
        if (avalon.isPlainObject(name)) {
            for (var i in name) {
                avalon.css(this, i, name[i])
            }
        } else {
            var ret = avalon.css(this, name, value)
        }
        return ret !== void 0 ? ret : this
    },
    position: function() {
        var offsetParent, offset,
            elem = this[0],
            parentOffset = {
                top: 0,
                left: 0
            };
        if (!elem) {
            return
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
    },
    offsetParent: function() {
        var offsetParent = this[0].offsetParent
        while (offsetParent && avalon.css(offsetParent, "position") === "static") {
            offsetParent = offsetParent.offsetParent;
        }
        return avalon(offsetParent || root)
    },
    bind: function(type, fn, phase) {
        if (this[0]) { //此方法不会链
            return avalon.bind(this[0], type, fn, phase)
        }
    },
    unbind: function(type, fn, phase) {
        if (this[0]) {
            avalon.unbind(this[0], type, fn, phase)
        }
        return this
    },
    val: function(value) {
        var node = this[0]
        if (node && node.nodeType === 1) {
            var get = arguments.length === 0
            var access = get ? ":get" : ":set"
            var fn = valHooks[getValType(node) + access]
            if (fn) {
                var val = fn(node, value)
            } else if (get) {
                return (node.value || "").replace(/\r/g, "")
            } else {
                node.value = value
            }
        }
        return get ? val : this
    }
})

if (root.dataset) {
    avalon.fn.data = function(name, val) {
        name = name && camelize(name)
        var dataset = this[0].dataset
        switch (arguments.length) {
            case 2:
                dataset[name] = val
                return this
            case 1:
                val = dataset[name]
                return parseData(val)
            case 0:
                var ret = createMap()
                for (name in dataset) {
                    ret[name] = parseData(dataset[name])
                }
                return ret
        }
    }
}
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
avalon.parseJSON = JSON.parse

function parseData(data) {
    try {
        if (typeof data === "object")
            return data
        data = data === "true" ? true :
            data === "false" ? false :
            data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? JSON.parse(data) : data
    } catch (e) {}
    return data
}
avalon.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
}, function(method, prop) {
    avalon.fn[method] = function(val) {
        var node = this[0] || {}, win = getWindow(node),
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
    return node.window && node.document ? node : node.nodeType === 9 ? node.defaultView : false
}

//=============================css相关==================================
var cssHooks = avalon.cssHooks = createMap()
var prefixes = ["", "-webkit-", "-moz-", "-ms-"] //去掉opera-15的支持
var cssMap = {
    "float": "cssFloat"
}
avalon.cssNumber = oneObject("animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom")

avalon.cssName = function(name, host, camelCase) {
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
cssHooks["@:set"] = function(node, name, value) {
    node.style[name] = value
}

cssHooks["@:get"] = function(node, name) {
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
cssHooks["opacity:get"] = function(node) {
    var ret = cssHooks["@:get"](node, "opacity")
    return ret === "" ? "1" : ret
}

"top,left".replace(rword, function(name) {
    cssHooks[name + ":get"] = function(node) {
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

    "Width,Height".replace(rword, function(name) { //fix 481
        var method = name.toLowerCase(),
            clientProp = "client" + name,
            scrollProp = "scroll" + name,
            offsetProp = "offset" + name
            cssHooks[method + ":get"] = function(node, which, override) {
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
        cssHooks[method + "&get"] = function(node) {
            var hidden = [];
            showHidden(node, hidden);
            var val = cssHooks[method + ":get"](node)
            for (var i = 0, obj; obj = hidden[i++];) {
                node = obj.node
                for (var n in obj) {
                    if (typeof obj[n] === "string") {
                        node.style[n] = obj[n]
                    }
                }
            }
            return val;
        }
        avalon.fn[method] = function(value) { //会忽视其display
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
        avalon.fn["inner" + name] = function() {
            return cssHooks[method + ":get"](this[0], void 0, -2)
        }
        avalon.fn["outer" + name] = function(includeMargin) {
            return cssHooks[method + ":get"](this[0], void 0, includeMargin === true ? 2 : 0)
        }
    })
    avalon.fn.offset = function() { //取得距离页面左右角的坐标
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
    //=============================val相关=======================

    function getValType(elem) {
        var ret = elem.tagName.toLowerCase()
        return ret === "input" && /checkbox|radio/.test(elem.type) ? "checked" : ret
    }
var valHooks = {
    "select:get": function(node, value) {
        var option, options = node.options,
            index = node.selectedIndex,
            one = node.type === "select-one" || index < 0,
            values = one ? null : [],
            max = one ? index + 1 : options.length,
            i = index < 0 ? max : one ? index : 0
        for (; i < max; i++) {
            option = options[i]
            //旧式IE在reset后不会改变selected，需要改用i === index判定
            //我们过滤所有disabled的option元素，但在safari5下，如果设置select为disable，那么其所有孩子都disable
            //因此当一个元素为disable，需要检测其是否显式设置了disable及其父节点的disable情况
            if ((option.selected || i === index) && !option.disabled) {
                value = option.value
                if (one) {
                    return value
                }
                //收集所有selected值组成数组返回
                values.push(value)
            }
        }
        return values
    },
    "select:set": function(node, values, optionSet) {
        values = [].concat(values) //强制转换为数组
        for (var i = 0, el; el = node.options[i++];) {
            if ((el.selected = values.indexOf(el.value) > -1)) {
                optionSet = true
            }
        }
        if (!optionSet) {
            node.selectedIndex = -1
        }
    }
}
/*********************************************************************
 *                          编译系统                                  *
 **********************************************************************/
var quote = JSON.stringify

var keywords = [
    "break,case,catch,continue,debugger,default,delete,do,else,false",
    "finally,for,function,if,in,instanceof,new,null,return,switch,this",
    "throw,true,try,typeof,var,void,while,with", /* 关键字*/
    "abstract,boolean,byte,char,class,const,double,enum,export,extends",
    "final,float,goto,implements,import,int,interface,long,native",
    "package,private,protected,public,short,static,super,synchronized",
    "throws,transient,volatile", /*保留字*/
    "arguments,let,yield,undefined" /* ECMA 5 - use strict*/].join(",")
var rrexpstr = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g
var rsplit = /[^\w$]+/g
var rkeywords = new RegExp(["\\b" + keywords.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g')
var rnumber = /\b\d[^,]*/g
var rcomma = /^,+|,+$/g
var variablePool = new Cache(512)
var getVariables = function (code) {
    var key = "," + code.trim()
    var ret = variablePool.get(key)
    if (ret) {
        return ret
    }
    var match = code
            .replace(rrexpstr, "")
            .replace(rsplit, ",")
            .replace(rkeywords, "")
            .replace(rnumber, "")
            .replace(rcomma, "")
            .split(/^$|,+/)
    return variablePool.put(key, uniqSet(match))
}
/*添加赋值语句*/

function addAssign(vars, scope, name, data) {
    var ret = [],
            prefix = " = " + name + "."
    for (var i = vars.length, prop; prop = vars[--i]; ) {
        if (scope.hasOwnProperty(prop)) {
            ret.push(prop + prefix + prop)
            data.vars.push(prop)
            if (data.type === "duplex") {
                vars.get = name + "." + prop
            }
            vars.splice(i, 1)
        }
    }
    return ret
}

function uniqSet(array) {
    var ret = [],
            unique = {}
    for (var i = 0; i < array.length; i++) {
        var el = array[i]
        var id = el && typeof el.$id === "string" ? el.$id : el
        if (!unique[id]) {
            unique[id] = ret.push(el)
        }
    }
    return ret
}
//缓存求值函数，以便多次利用
var evaluatorPool = new Cache(128)
//取得求值函数及其传参
var rduplex = /\w\[.*\]|\w\.\w/
var rproxy = /(\$proxy\$[a-z]+)\d+$/
var rthimRightParentheses = /\)\s*$/
var rthimOtherParentheses = /\)\s*\|/g
var rquoteFilterName = /\|\s*([$\w]+)/g
var rpatchBracket = /"\s*\["/g
var rthimLeftParentheses = /"\s*\(/g
function parseFilter(val, filters) {
    filters = filters
            .replace(rthimRightParentheses, "")//处理最后的小括号
            .replace(rthimOtherParentheses, function () {//处理其他小括号
                return "],|"
            })
            .replace(rquoteFilterName, function (a, b) { //处理|及它后面的过滤器的名字
                return "[" + quote(b)
            })
            .replace(rpatchBracket, function () {
                return '"],["'
            })
            .replace(rthimLeftParentheses, function () {
                return '",'
            }) + "]"
    return  "return this.filters.$filter(" + val + ", " + filters + ")"
}

function parseExpr(code, scopes, data) {
    var dataType = data.type
    var filters = data.filters || ""
    var exprId = scopes.map(function (el) {
        return String(el.$id).replace(rproxy, "$1")
    }) + code + dataType + filters
    var vars = getVariables(code).concat(),
            assigns = [],
            names = [],
            args = [],
            prefix = ""
    //args 是一个对象数组， names 是将要生成的求值函数的参数
    scopes = uniqSet(scopes)
    data.vars = []
    for (var i = 0, sn = scopes.length; i < sn; i++) {
        if (vars.length) {
            var name = "vm" + expose + "_" + i
            names.push(name)
            args.push(scopes[i])
            assigns.push.apply(assigns, addAssign(vars, scopes[i], name, data))
        }
    }
    if (!assigns.length && dataType === "duplex") {
        return
    }
    if (dataType !== "duplex" && (code.indexOf("||") > -1 || code.indexOf("&&") > -1)) {
        //https://github.com/RubyLouvre/avalon/issues/583
        data.vars.forEach(function (v) {
            var reg = new RegExp("\\b" + v + "(?:\\.\\w+|\\[\\w+\\])+", "ig")
            code = code.replace(reg, function (_, cap) {
                var c = _.charAt(v.length)
                //var r = IEVersion ? code.slice(arguments[1] + _.length) : RegExp.rightContext
                //https://github.com/RubyLouvre/avalon/issues/966
                var r = code.slice(cap + _.length)
                var method = /^\s*\(/.test(r)
                if (c === "." || c === "[" || method) {//比如v为aa,我们只匹配aa.bb,aa[cc],不匹配aaa.xxx
                    var name = "var" + String(Math.random()).replace(/^0\./, "")
                    if (method) {//array.size()
                        var array = _.split(".")
                        if (array.length > 2) {
                            var last = array.pop()
                            assigns.push(name + " = " + array.join("."))
                            return name + "." + last
                        } else {
                            return _
                        }
                    }
                    assigns.push(name + " = " + _)
                    return name
                } else {
                    return _
                }
            })
        })
    }
    //---------------args----------------
    data.args = args
    //---------------cache----------------
    delete data.vars
    var fn = evaluatorPool.get(exprId) //直接从缓存，免得重复生成
    if (fn) {
        data.evaluator = fn
        return
    }
    prefix = assigns.join(", ")
    if (prefix) {
        prefix = "var " + prefix
    }
    if (/\S/.test(filters)) { //文本绑定，双工绑定才有过滤器
        if (!/text|html/.test(data.type)) {
            throw Error("ms-" + data.type + "不支持过滤器")
        }
        code = "\nvar ret" + expose + " = " + code + ";\r\n"
        code += parseFilter("ret" + expose, filters)
        try {
            fn = Function.apply(noop, names.concat("'use strict';\n" + prefix + code))
            data.evaluator = evaluatorPool.put(exprId, function() {
                return fn.apply(avalon, arguments)//确保可以在编译代码中使用this获取avalon对象
            })
        } catch (e) {
            log("debug: parse error," + e.message)
        }
        vars = assigns = names = null //释放内存
        return
    } else if (dataType === "duplex") { //双工绑定
        var _body = "'use strict';\nreturn function(vvv){\n\t" +
                prefix +
                ";\n\tif(!arguments.length){\n\t\treturn " +
                code +
                "\n\t}\n\t" + (!rduplex.test(code) ? vars.get : code) +
                "= vvv;\n} "
        try {
            fn = Function.apply(noop, names.concat(_body))
            data.evaluator = evaluatorPool.put(exprId, fn)
        } catch (e) {
            log("debug: parse error," + e.message)
        }
        vars = assigns = names = null //释放内存
        return
    } else if (dataType === "on") { //事件绑定
        if (code.indexOf("(") === -1) {
            code += ".call(this, $event)"
        } else {
            code = code.replace("(", ".call(this,")
        }
        names.push("$event")
        code = "\nreturn " + code + ";" //IE全家 Function("return ")出错，需要Function("return ;")
        var lastIndex = code.lastIndexOf("\nreturn")
        var header = code.slice(0, lastIndex)
        var footer = code.slice(lastIndex)
        code = header + "\n" + footer
    } else { //其他绑定
        code = "\nreturn " + code + ";" //IE全家 Function("return ")出错，需要Function("return ;")
    }
    try {
        fn = Function.apply(noop, names.concat("'use strict';\n" + prefix + code))
        data.evaluator = evaluatorPool.put(exprId, fn)
    } catch (e) {
        log("debug: parse error," + e.message)
    }
    vars = assigns = names = null //释放内存
}
function stringifyExpr(code) {
    var hasExpr = rexpr.test(code) //比如ms-class="width{{w}}"的情况
    if (hasExpr) {
        var array = scanExpr(code)
        if (array.length === 1) {
            return array[0].value
        }
        return array.map(function (el) {
            return el.expr ? "(" + el.value + ")" : quote(el.value)
        }).join(" + ")
    } else {
        return code
    }
}
//parseExpr的智能引用代理

function parseExprProxy(code, scopes, data, noRegister) {
    code = code || "" //code 可能未定义
    parseExpr(code, scopes, data)
    if (data.evaluator && !noRegister) {
        data.handler = bindingExecutors[data.handlerName || data.type]
        //方便调试
        //这里非常重要,我们通过判定视图刷新函数的element是否在DOM树决定
        //将它移出订阅者列表
        avalon.injectBinding(data)
    }
}
avalon.parseExprProxy = parseExprProxy
/*********************************************************************
 *                           扫描系统                                 *
 **********************************************************************/

avalon.scan = function(elem, vmodel) {
    elem = elem || root
    var vmodels = vmodel ? [].concat(vmodel) : []
    scanTag(elem, vmodels)
}

//http://www.w3.org/TR/html5/syntax.html#void-elements
var stopScan = oneObject("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase())

function checkScan(elem, callback, innerHTML) {
    var id = setTimeout(function() {
        var currHTML = elem.innerHTML
        clearTimeout(id)
        if (currHTML === innerHTML) {
            callback()
        } else {
            checkScan(elem, callback, currHTML)
        }
    })
}


function createSignalTower(elem, vmodel) {
    var id = elem.getAttribute("avalonctrl") || vmodel.$id
    elem.setAttribute("avalonctrl", id)
    vmodel.$events.expr = elem.tagName + '[avalonctrl="' + id + '"]'
}

var getBindingCallback = function(elem, name, vmodels) {
    var callback = elem.getAttribute(name)
    if (callback) {
        for (var i = 0, vm; vm = vmodels[i++]; ) {
            if (vm.hasOwnProperty(callback) && typeof vm[callback] === "function") {
                return vm[callback]
            }
        }
    }
}

function executeBindings(bindings, vmodels) {
    for (var i = 0, data; data = bindings[i++]; ) {
        data.vmodels = vmodels
        bindingHandlers[data.type](data, vmodels)
        if (data.evaluator && data.element && data.element.nodeType === 1) { //移除数据绑定，防止被二次解析
            //chrome使用removeAttributeNode移除不存在的特性节点时会报错 https://github.com/RubyLouvre/avalon/issues/99
            data.element.removeAttribute(data.name)
        }
    }
    bindings.length = 0
}

//https://github.com/RubyLouvre/avalon/issues/636
var mergeTextNodes = IEVersion && window.MutationObserver ? function (elem) {
    var node = elem.firstChild, text
    while (node) {
        var aaa = node.nextSibling
        if (node.nodeType === 3) {
            if (text) {
                text.nodeValue += node.nodeValue
                elem.removeChild(node)
            } else {
                text = node
            }
        } else {
            text = null
        }
        node = aaa
    }
} : 0
var roneTime = /^\s*::/
var rmsAttr = /ms-(\w+)-?(.*)/
var priorityMap = {
    "if": 10,
    "repeat": 90,
    "data": 100,
    "widget": 110,
    "each": 1400,
    "with": 1500,
    "duplex": 2000,
    "on": 3000
}

var events = oneObject("animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit")
var obsoleteAttrs = oneObject("value,title,alt,checked,selected,disabled,readonly,enabled")
function bindingSorter(a, b) {
    return a.priority - b.priority
}

function scanAttr(elem, vmodels, match) {
    var scanNode = true
    if (vmodels.length) {
        var attributes = elem.attributes
        var bindings = []
        var fixAttrs = []
        var msData = createMap()
        for (var i = 0, attr; attr = attributes[i++]; ) {
            if (attr.specified) {
                if (match = attr.name.match(rmsAttr)) {
                    //如果是以指定前缀命名的
                    var type = match[1]
                    var param = match[2] || ""
                    var value = attr.value
                    var name = attr.name
                    if (events[type]) {
                        param = type
                        type = "on"
                    } else if (obsoleteAttrs[type]) {
                        if (type === "enabled") {//吃掉ms-enabled绑定,用ms-disabled代替
                            log("warning!ms-enabled或ms-attr-enabled已经被废弃")
                            type = "disabled"
                            value = "!(" + value + ")"
                        }
                        param = type
                        type = "attr"
                        name = "ms-" + type + "-" + param
                        fixAttrs.push([attr.name, name, value])
                    }
                    msData[name] = value
                    if (typeof bindingHandlers[type] === "function") {
                        var newValue = value.replace(roneTime, "")
                        var oneTime = value !== newValue
                        var binding = {
                            type: type,
                            param: param,
                            element: elem,
                            name: name,
                            value: newValue,
                            oneTime: oneTime,
                            priority: (priorityMap[type] || type.charCodeAt(0) * 10) + (Number(param.replace(/\D/g, "")) || 0)
                        }
                        if (type === "html" || type === "text") {
                            var token = getToken(value)
                            avalon.mix(binding, token)
                            binding.filters = binding.filters.replace(rhasHtml, function () {
                                binding.type = "html"
                                binding.group = 1
                                return ""
                            })// jshint ignore:line
                        } else if (type === "duplex") {
                            var hasDuplex = name
                        } else if (name === "ms-if-loop") {
                            binding.priority += 100
                        }
                        bindings.push(binding)
                        if (type === "widget") {
                            elem.msData = elem.msData || msData
                        }
                    }
                }
            }
        }
        if (bindings.length) {
            bindings.sort(bindingSorter)
            fixAttrs.forEach(function (arr) {
                log("warning!请改用" + arr[1] + "代替" + arr[0] + "!")
                elem.removeAttribute(arr[0])
                elem.setAttribute(arr[1], arr[2])
            })
            var control = elem.type
            if (control && hasDuplex) {
                if (msData["ms-attr-value"] && elem.type === "text") {
                    log("warning!" + control + "控件不能同时定义ms-attr-value与" + hasDuplex)
                }
            }

            for (i = 0; binding = bindings[i]; i++) {
                type = binding.type
                if (rnoscanAttrBinding.test(type)) {
                    return executeBindings(bindings.slice(0, i + 1), vmodels)
                } else if (scanNode) {
                    scanNode = !rnoscanNodeBinding.test(type)
                }
            }
            executeBindings(bindings, vmodels)
        }
    }
    if (scanNode && !stopScan[elem.tagName] && rbind.test(elem.innerHTML + elem.textContent)) {
        mergeTextNodes && mergeTextNodes(elem)
        scanNodeList(elem, vmodels) //扫描子孙元素
    }
}

var rnoscanAttrBinding = /^if|widget|repeat$/
var rnoscanNodeBinding = /^each|with|html|include$/
function scanNodeList(parent, vmodels) {
    var nodes = avalon.slice(parent.childNodes)
    scanNodeArray(nodes, vmodels)
}

function scanNodeArray(nodes, vmodels) {
    for (var i = 0, node; node = nodes[i++];) {
        switch (node.nodeType) {
            case 1:
                scanTag(node, vmodels) //扫描元素节点
                if (node.msCallback) {
                    node.msCallback()
                    node.msCallback = void 0
                }
                break
            case 3:
               if(rexpr.test(node.nodeValue)){
                    scanText(node, vmodels, i) //扫描文本节点
               }
               break
        }
    }
}


function scanTag(elem, vmodels, node) {
    //扫描顺序  ms-skip(0) --> ms-important(1) --> ms-controller(2) --> ms-if(10) --> ms-repeat(100) 
    //--> ms-if-loop(110) --> ms-attr(970) ...--> ms-each(1400)-->ms-with(1500)--〉ms-duplex(2000)垫后        
    var a = elem.getAttribute("ms-skip")
    var b = elem.getAttributeNode("ms-important")
    var c = elem.getAttributeNode("ms-controller")
    if (typeof a === "string") {
        return
    } else if (node = b || c) {
        var newVmodel = avalon.vmodels[node.value]
        if (!newVmodel) {
            return
        }
        //ms-important不包含父VM，ms-controller相反
        vmodels = node === b ? [newVmodel] : [newVmodel].concat(vmodels)
        elem.removeAttribute(node.name) //removeAttributeNode不会刷新[ms-controller]样式规则
        elem.classList.remove(node.name)
        createSignalTower(elem, newVmodel)
    }
    scanAttr(elem, vmodels) //扫描特性节点
}
var rhasHtml = /\|\s*html(?:\b|$)/,
        r11a = /\|\|/g,
        rlt = /&lt;/g,
        rgt = /&gt;/g,
        rstringLiteral = /(['"])(\\\1|.)+?\1/g
function getToken(value) {
    if (value.indexOf("|") > 0) {
        var scapegoat = value.replace(rstringLiteral, function (_) {
            return Array(_.length + 1).join("1")// jshint ignore:line
        })
        var index = scapegoat.replace(r11a, "\u1122\u3344").indexOf("|") //干掉所有短路或
        if (index > -1) {
            return {
                filters: value.slice(index),
                value: value.slice(0, index),
                expr: true
            }
        }
    }
    return {
        value: value,
        filters: "",
        expr: true
    }
}

function scanExpr(str) {
    var tokens = [],
            value, start = 0,
            stop
    do {
        stop = str.indexOf(openTag, start)
        if (stop === -1) {
            break
        }
        value = str.slice(start, stop)
        if (value) { // {{ 左边的文本
            tokens.push({
                value: value,
                filters: "",
                expr: false
            })
        }
        start = stop + openTag.length
        stop = str.indexOf(closeTag, start)
        if (stop === -1) {
            break
        }
        value = str.slice(start, stop)
        if (value) { //处理{{ }}插值表达式
            tokens.push(getToken(value, start))
        }
        start = stop + closeTag.length
    } while (1)
    value = str.slice(start)
    if (value) { //}} 右边的文本
        tokens.push({
            value: value,
            expr: false,
            filters: ""
        })
    }
    return tokens
}

function scanText(textNode, vmodels, index) {
    var bindings = []
    tokens = scanExpr(textNode.data)
    if (tokens.length) {
        for (var i = 0; token = tokens[i++]; ) {
            var node = DOC.createTextNode(token.value) //将文本转换为文本节点，并替换原来的文本节点
            if (token.expr) {
                token.value = token.value.replace(roneTime, function () {
                    token.oneTime = true
                    return ""
                })// jshint ignore:line
                token.type = "text"
                token.element = node
                token.filters = token.filters.replace(rhasHtml, function (a, b,c) {
                    token.type = "html"
                    return ""
                })// jshint ignore:line
                token.pos = index * 1000 + i
                bindings.push(token) //收集带有插值表达式的文本
            }
            avalonFragment.appendChild(node)
        }
        textNode.parentNode.replaceChild(avalonFragment, textNode)
        if (bindings.length)
            executeBindings(bindings, vmodels)
    }
}

var bools = ["autofocus,autoplay,async,allowTransparency,checked,controls",
    "declare,disabled,defer,defaultChecked,defaultSelected",
    "contentEditable,isMap,loop,multiple,noHref,noResize,noShade",
    "open,readOnly,selected"
].join(",")
var boolMap = {}
bools.replace(rword, function (name) {
    boolMap[name.toLowerCase()] = name
})

var propMap = {//属性名映射
    "accept-charset": "acceptCharset",
    "char": "ch",
    "charoff": "chOff",
    "class": "className",
    "for": "htmlFor",
    "http-equiv": "httpEquiv"
}

var anomaly = ["accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan",
    "dateTime,defaultValue,frameBorder,longDesc,maxLength,marginWidth,marginHeight",
    "rowSpan,tabIndex,useMap,vSpace,valueType,vAlign"
].join(",")
anomaly.replace(rword, function (name) {
    propMap[name.toLowerCase()] = name
})

var rnoscripts = /<noscript.*?>(?:[\s\S]+?)<\/noscript>/img
var rnoscriptText = /<noscript.*?>([\s\S]+?)<\/noscript>/im

var getXHR = function () {
    return new (window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP") // jshint ignore:line
}

var templatePool = avalon.templateCache = {}

bindingHandlers.attr = function (data, vmodels) {
    var value = stringifyExpr(data.value.trim())
    if (data.type === "include") {
        var elem = data.element
        data.includeRendered = getBindingCallback(elem, "data-include-rendered", vmodels)
        data.includeLoaded = getBindingCallback(elem, "data-include-loaded", vmodels)
        var outer = data.includeReplace = !!avalon(elem).data("includeReplace")
        if (avalon(elem).data("includeCache")) {
            data.templateCache = {}
        }
        data.startInclude = DOC.createComment("ms-include")
        data.endInclude = DOC.createComment("ms-include-end")
        if (outer) {
            data.element = data.startInclude
            elem.parentNode.insertBefore(data.startInclude, elem)
            elem.parentNode.insertBefore(data.endInclude, elem.nextSibling)
        } else {
            elem.insertBefore(data.startInclude, elem.firstChild)
            elem.appendChild(data.endInclude)
        }
    }
    data.handlerName = "attr" //handleName用于处理多种绑定共用同一种bindingExecutor的情况
    parseExprProxy(value, vmodels, data)
}

bindingExecutors.attr = function (val, elem, data) {
    var method = data.type,
            attrName = data.param
    if (method === "css") {
        avalon(elem).css(attrName, val)
    } else if (method === "attr") {

        // ms-attr-class="xxx" vm.xxx="aaa bbb ccc"将元素的className设置为aaa bbb ccc
        // ms-attr-class="xxx" vm.xxx=false  清空元素的所有类名
        // ms-attr-name="yyy"  vm.yyy="ooo" 为元素设置name属性
        var toRemove = (val === false) || (val === null) || (val === void 0)

        if (!W3C && propMap[attrName]) { //旧式IE下需要进行名字映射
            attrName = propMap[attrName]
        }
        var bool = boolMap[attrName]
        if (typeof elem[bool] === "boolean") {
            elem[bool] = !!val //布尔属性必须使用el.xxx = true|false方式设值
            if (!val) { //如果为false, IE全系列下相当于setAttribute(xxx,''),会影响到样式,需要进一步处理
                toRemove = true
            }
        }
        if (toRemove) {
            return elem.removeAttribute(attrName)
        }
        //SVG只能使用setAttribute(xxx, yyy), VML只能使用elem.xxx = yyy ,HTML的固有属性必须elem.xxx = yyy
        var isInnate = rsvg.test(elem) ? false : (DOC.namespaces && isVML(elem)) ? true : attrName in elem.cloneNode(false)
        if (isInnate) {
            elem[attrName] = val + ""
        } else {
            elem.setAttribute(attrName, val)
        }
    } else if (method === "include" && val) {
        var vmodels = data.vmodels
        var rendered = data.includeRendered
        var loaded = data.includeLoaded
        var replace = data.includeReplace
        var target = replace ? elem.parentNode : elem
        var scanTemplate = function (text) {
            if (loaded) {
                var newText = loaded.apply(target, [text].concat(vmodels))
                if (typeof newText === "string")
                    text = newText
            }
            if (rendered) {
                checkScan(target, function () {
                    rendered.call(target)
                }, NaN)
            }
            var lastID = data.includeLastID
            if (data.templateCache && lastID && lastID !== val) {
                var lastTemplate = data.templateCache[lastID]
                if (!lastTemplate) {
                    lastTemplate = data.templateCache[lastID] = DOC.createElement("div")
                    ifGroup.appendChild(lastTemplate)
                }
            }
            data.includeLastID = val
            while (true) {
                var node = data.startInclude.nextSibling
                if (node && node !== data.endInclude) {
                    target.removeChild(node)
                    if (lastTemplate)
                        lastTemplate.appendChild(node)
                } else {
                    break
                }
            }
            var dom = getTemplateNodes(data, val, text)
            var nodes = avalon.slice(dom.childNodes)
            target.insertBefore(dom, data.endInclude)
            scanNodeArray(nodes, vmodels)
        }

        if (data.param === "src") {
            if (typeof templatePool[val] === "string") {
                avalon.nextTick(function () {
                    scanTemplate(templatePool[val])
                })
            } else if (Array.isArray(templatePool[val])) { //#805 防止在循环绑定中发出许多相同的请求
                templatePool[val].push(scanTemplate)
            } else {
                var xhr = getXHR()
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var s = xhr.status
                        if (s >= 200 && s < 300 || s === 304 || s === 1223) {
                            var text = xhr.responseText
                            for (var f = 0, fn; fn = templatePool[val][f++]; ) {
                                fn(text)
                            }
                            templatePool[val] = text
                        }
                    }
                }
                templatePool[val] = [scanTemplate]
                xhr.open("GET", val, true)
                if ("withCredentials" in xhr) {
                    xhr.withCredentials = true
                }
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
                xhr.send(null)
            }
        } else {
            //IE系列与够新的标准浏览器支持通过ID取得元素（firefox14+）
            //http://tjvantoll.com/2012/07/19/dom-element-references-as-global-variables/
            var el = val && val.nodeType === 1 ? val : DOC.getElementById(val)
            if (el) {
                if (el.tagName === "NOSCRIPT" && !(el.innerHTML || el.fixIE78)) { //IE7-8 innerText,innerHTML都无法取得其内容，IE6能取得其innerHTML
                    xhr = getXHR() //IE9-11与chrome的innerHTML会得到转义的内容，它们的innerText可以
                    xhr.open("GET", location, false) //谢谢Nodejs 乱炖群 深圳-纯属虚构
                    xhr.send(null)
                    //http://bbs.csdn.net/topics/390349046?page=1#post-393492653
                    var noscripts = DOC.getElementsByTagName("noscript")
                    var array = (xhr.responseText || "").match(rnoscripts) || []
                    var n = array.length
                    for (var i = 0; i < n; i++) {
                        var tag = noscripts[i]
                        if (tag) { //IE6-8中noscript标签的innerHTML,innerText是只读的
                            tag.style.display = "none" //http://haslayout.net/css/noscript-Ghost-Bug
                            tag.fixIE78 = (array[i].match(rnoscriptText) || ["", "&nbsp;"])[1]
                        }
                    }
                }
                avalon.nextTick(function () {
                    scanTemplate(el.fixIE78 || el.value || el.innerText || el.innerHTML)
                })
            }
        }
    } else {
        if (!root.hasAttribute && typeof val === "string" && (method === "src" || method === "href")) {
            val = val.replace(/&amp;/g, "&") //处理IE67自动转义的问题
        }
        elem[method] = val
        if (window.chrome && elem.tagName === "EMBED") {
            var parent = elem.parentNode //#525  chrome1-37下embed标签动态设置src不能发生请求
            var comment = document.createComment("ms-src")
            parent.replaceChild(comment, elem)
            parent.replaceChild(elem, comment)
        }
    }
}

function getTemplateNodes(data, id, text) {
    var div = data.templateCache && data.templateCache[id]
    if (div) {
        var dom = DOC.createDocumentFragment(),
                firstChild
        while (firstChild = div.firstChild) {
            dom.appendChild(firstChild)
        }
        return dom
    }
    return avalon.parseHTML(text)
}

//这几个指令都可以使用插值表达式，如ms-src="aaa/{{b}}/{{c}}.html"
"title,alt,src,value,css,include,href".replace(rword, function (name) {
    bindingHandlers[name] = bindingHandlers.attr
})
//根据VM的属性值或表达式的值切换类名，ms-class="xxx yyy zzz:flag" 
//http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
bindingHandlers["class"] = function (binding, vmodels) {
    var oldStyle = binding.param,
            text = binding.value,
            rightExpr
    binding.handlerName = "class"
    if (!oldStyle || isFinite(oldStyle)) {
        binding.param = "" //去掉数字
        var colonIndex = text.replace(rexprg, function (a) {
            return a.replace(/./g, "0")
        }).indexOf(":") //取得第一个冒号的位置
        if (colonIndex === -1) { // 比如 ms-class="aaa bbb ccc" 的情况
            var className = text
            rightExpr = true
        } else { // 比如 ms-class-1="ui-state-active:checked" 的情况
            className = text.slice(0, colonIndex)
            rightExpr = text.slice(colonIndex + 1)
        }
        if (!rexpr.test(text)) {
            className = quote(className)
        } else {
            className = stringifyExpr(className)
        }
        binding.expr = "[" + className + "," + rightExpr + "]"
    } else {
        binding.expr = '[' + quote(oldStyle) + "," + text + "]"
        binding.oldStyle = oldStyle
    }
    var method = binding.type
    if (method === "hover" || method === "active") { //确保只绑定一次
        if (!binding.hasBindEvent) {
            var elem = binding.element
            var $elem = avalon(elem)
            var activate = "mouseenter" //在移出移入时切换类名
            var abandon = "mouseleave"
            if (method === "active") { //在聚焦失焦中切换类名
                elem.tabIndex = elem.tabIndex || -1
                activate = "mousedown"
                abandon = "mouseup"
                var fn0 = $elem.bind("mouseleave", function () {
                    binding.toggleClass && $elem.removeClass(binding.newClass)
                })
            }
        }

        var fn1 = $elem.bind(activate, function () {
            binding.toggleClass && $elem.addClass(binding.newClass)
        })
        var fn2 = $elem.bind(abandon, function () {
            binding.toggleClass && $elem.removeClass(binding.newClass)
        })
        binding.rollback = function () {
            $elem.unbind("mouseleave", fn0)
            $elem.unbind(activate, fn1)
            $elem.unbind(abandon, fn2)
        }
        binding.hasBindEvent = true
    }
    parseExprProxy(binding.expr, vmodels, binding)
}

bindingExecutors["class"] = function (arr, elem, binding) {
    var $elem = avalon(elem)
    binding.newClass = arr[0]
    binding.toggleClass = !!arr[1]
    if (binding.oldClass && binding.newClass !== binding.oldClass) {
        $elem.removeClass(binding.oldClass)
    }
    binding.oldClass = binding.newClass
    if (binding.type === "class") {
        if (binding.oldStyle) {
            $elem.toggleClass(binding.oldStyle, !!arr[1])
        } else {
            $elem.toggleClass(binding.newClass, binding.toggleClass)
        }
    }

}

"hover,active".replace(rword, function (method) {
    bindingHandlers[method] = bindingHandlers["class"]
})
//ms-controller绑定已经在scanTag 方法中实现
//ms-css绑定已由ms-attr绑定实现


// bindingHandlers.data 定义在if.js
bindingExecutors.data = function(val, elem, data) {
	var key = "data-" + data.param
	if (val && typeof val === "object") {
		elem[key] = val
	} else {
		elem.setAttribute(key, String(val))
	}
}
//双工绑定
var duplexBinding = bindingHandlers.duplex = function(data, vmodels) {
    var elem = data.element,
        hasCast
        parseExprProxy(data.value, vmodels, data, 1)

        data.changed = getBindingCallback(elem, "data-duplex-changed", vmodels) || noop
    if (data.evaluator && data.args) {
        var params = []
        var casting = oneObject("string,number,boolean,checked")
        if (elem.type === "radio" && data.param === "") {
            data.param = "checked"
        }
        if (elem.msData) {
            elem.msData["ms-duplex"] = data.value
        }
        data.param.replace(/\w+/g, function(name) {
            if (/^(checkbox|radio)$/.test(elem.type) && /^(radio|checked)$/.test(name)) {
                if (name === "radio")
                    log("ms-duplex-radio已经更名为ms-duplex-checked")
                name = "checked"
                data.isChecked = true
            }
            if (name === "bool") {
                name = "boolean"
                log("ms-duplex-bool已经更名为ms-duplex-boolean")
            } else if (name === "text") {
                name = "string"
                log("ms-duplex-text已经更名为ms-duplex-string")
            }
            if (casting[name]) {
                hasCast = true
            }
            avalon.Array.ensure(params, name)
        })
        if (!hasCast) {
            params.push("string")
        }
        data.param = params.join("-")
        data.bound = function(type, callback) {
            if (elem.addEventListener) {
                elem.addEventListener(type, callback, false)
            } else {
                elem.attachEvent("on" + type, callback)
            }
            var old = data.rollback
            data.rollback = function() {
                elem.avalonSetter = null
                avalon.unbind(elem, type, callback)
                old && old()
            }
        }
        for (var i in avalon.vmodels) {
            var v = avalon.vmodels[i]
            v.$fire("avalon-ms-duplex-init", data)
        }
        var cpipe = data.pipe || (data.pipe = pipe)
        cpipe(null, data, "init")
        var tagName = elem.tagName
        duplexBinding[tagName] && duplexBinding[tagName](elem, data.evaluator.apply(null, data.args), data)
    }
}
//不存在 bindingExecutors.duplex

    function fixNull(val) {
        return val == null ? "" : val
    }
avalon.duplexHooks = {
    checked: {
        get: function(val, data) {
            return !data.element.oldValue
        }
    },
    string: {
        get: function(val) { //同步到VM
            return val
        },
        set: fixNull
    },
    "boolean": {
        get: function(val) {
            return val === "true"
        },
        set: fixNull
    },
    number: {
        get: function(val, data) {
            var number = parseFloat(val)
            if (-val === -number) {
                return number
            }
            var arr = /strong|medium|weak/.exec(data.element.getAttribute("data-duplex-number")) || ["medium"]
            switch (arr[0]) {
                case "strong":
                    return 0
                case "medium":
                    return val === "" ? "" : 0
                case "weak":
                    return val
            }
        },
        set: fixNull
    }
}

function pipe(val, data, action, e) {
    data.param.replace(/\w+/g, function(name) {
        var hook = avalon.duplexHooks[name]
        if (hook && typeof hook[action] === "function") {
            val = hook[action](val, data)
        }
    })
    return val
}

var TimerID, ribbon = []

    avalon.tick = function(fn) {
        if (ribbon.push(fn) === 1) {
            TimerID = setInterval(ticker, 60)
        }
    }

    function ticker() {
        for (var n = ribbon.length - 1; n >= 0; n--) {
            var el = ribbon[n]
            if (el() === false) {
                ribbon.splice(n, 1)
            }
        }
        if (!ribbon.length) {
            clearInterval(TimerID)
        }
    }

var watchValueInTimer = noop
var rmsinput = /text|password|hidden/
new function() { // jshint ignore:line
    try { //#272 IE9-IE11, firefox
        var setters = {}
        var aproto = HTMLInputElement.prototype
        var bproto = HTMLTextAreaElement.prototype
        function newSetter(value) { // jshint ignore:line
                setters[this.tagName].call(this, value)
                if (rmsinput.test(this.type) && !this.msFocus && this.avalonSetter) {
                    this.avalonSetter()
                }
        }
        var inputProto = HTMLInputElement.prototype
        Object.getOwnPropertyNames(inputProto) //故意引发IE6-8等浏览器报错
        setters["INPUT"] = Object.getOwnPropertyDescriptor(aproto, "value").set
    
        Object.defineProperty(aproto, "value", {
            set: newSetter
        })
        setters["TEXTAREA"] = Object.getOwnPropertyDescriptor(bproto, "value").set
        Object.defineProperty(bproto, "value", {
            set: newSetter
        })
    } catch (e) {
        //在chrome 43中 ms-duplex终于不需要使用定时器实现双向绑定了
        // http://updates.html5rocks.com/2015/04/DOM-attributes-now-on-the-prototype
        // https://docs.google.com/document/d/1jwA8mtClwxI-QJuHT7872Z0pxpZz8PBkf2bGAbsUtqs/edit?pli=1
        watchValueInTimer = avalon.tick
    }
} // jshint ignore:line
//处理radio, checkbox, text, textarea, password
duplexBinding.INPUT = function(element, evaluator, data) {
    var $type = element.type,
        bound = data.bound,
        $elem = avalon(element),
        composing = false

        function callback(value) {
            data.changed.call(this, value, data)
        }

        function compositionStart() {
            composing = true
        }

        function compositionEnd() {
            composing = false
        }
        //当value变化时改变model的值

    var updateVModel = function() {
        if (composing) //处理中文输入法在minlengh下引发的BUG
            return
        var val = element.oldValue = element.value //防止递归调用形成死循环
        var lastValue = data.pipe(val, data, "get")
        if ($elem.data("duplexObserve") !== false) {
            evaluator(lastValue)
            callback.call(element, lastValue)
            if ($elem.data("duplex-focus")) {
                avalon.nextTick(function() {
                    element.focus()
                })
            }
        }
    }
    //当model变化时,它就会改变value的值
    data.handler = function() {
        var val = data.pipe(evaluator(), data, "set") + ""
        if (val !== element.oldValue) {
            element.value = val
        }
    }
    if (data.isChecked || $type === "radio") {
        updateVModel = function() {
            if ($elem.data("duplexObserve") !== false) {
                var lastValue = data.pipe(element.value, data, "get")
                evaluator(lastValue)
                callback.call(element, lastValue)
            }
        }
        data.handler = function() {
            var val = evaluator()
            var checked = data.isChecked ? !! val : val + "" === element.value
            element.checked = element.oldValue = checked
        }
        bound("click", updateVModel)
    } else if ($type === "checkbox") {
        updateVModel = function() {
            if ($elem.data("duplexObserve") !== false) {
                var method = element.checked ? "ensure" : "remove"
                var array = evaluator()
                if (!Array.isArray(array)) {
                    log("ms-duplex应用于checkbox上要对应一个数组")
                    array = [array]
                }
                avalon.Array[method](array, data.pipe(element.value, data, "get"))
                callback.call(element, array)
            }
        }
        data.handler = function() {
            var array = [].concat(evaluator()) //强制转换为数组
            element.checked = array.indexOf(data.pipe(element.value, data, "get")) > -1
        }
        bound("change", updateVModel)
    } else {
        var events = element.getAttribute("data-duplex-event") || "input"
        if (element.attributes["data-event"]) {
            log("data-event指令已经废弃，请改用data-duplex-event")
        }
        events.replace(rword, function(name) {
            switch (name) {
                case "input":
                    bound("input", updateVModel)
                    bound("DOMAutoComplete", updateVModel)
                    if (!IEVersion) {
                        bound("compositionstart", compositionStart)
                        bound("compositionend", compositionEnd)
                    }
                    break
                default:
                    bound(name, updateVModel)
                    break
            }
        })
        bound("focus", function() {
            element.msFocus = true
        })
        bound("blur", function() {
            element.msFocus = false
        })
        if (rmsinput.test($type)) {
            watchValueInTimer(function() {
                if (root.contains(element)) {
                    if (!element.msFocus && element.oldValue !== element.value) {
                        updateVModel()
                    }
                } else if (!element.msRetain) {
                    return false
                }
            })
        }

        element.avalonSetter = updateVModel
    }

    element.oldValue = element.value
    avalon.injectBinding(data)
    callback.call(element, element.value)
}
duplexBinding.TEXTAREA = duplexBinding.INPUT
duplexBinding.SELECT = function(element, evaluator, data) {
    var $elem = avalon(element)

        function updateVModel() {
            if ($elem.data("duplexObserve") !== false) {
                var val = $elem.val() //字符串或字符串数组
                if (Array.isArray(val)) {
                    val = val.map(function(v) {
                        return data.pipe(v, data, "get")
                    })
                } else {
                    val = data.pipe(val, data, "get")
                }
                if (val + "" !== element.oldValue) {
                    evaluator(val)
                }
                data.changed.call(element, val, data)
            }
        }
    data.handler = function() {
        var val = evaluator()
        val = val && val.$model || val
        if (Array.isArray(val)) {
            if (!element.multiple) {
                log("ms-duplex在<select multiple=true>上要求对应一个数组")
            }
        } else {
            if (element.multiple) {
                log("ms-duplex在<select multiple=false>不能对应一个数组")
            }
        }
        //必须变成字符串后才能比较
        val = Array.isArray(val) ? val.map(String) : val + ""
        if (val + "" !== element.oldValue) {
            $elem.val(val)
            element.oldValue = val + ""
        }
    }
    data.bound("change", updateVModel)
    element.msCallback = function() {
        avalon.injectBinding(data)
        data.changed.call(element, evaluator(), data)
    }
}
// bindingHandlers.html 定义在if.js
bindingExecutors.html = function (val, elem, data) {
    var isHtmlFilter = elem.nodeType !== 1
    var parent = isHtmlFilter ? elem.parentNode : elem
    if (!parent)
        return
    val = val == null ? "" : val
    if (data.oldText !== val) {
        data.oldText = val
    } else {
        return
    }
    if (elem.nodeType === 3) {
        var signature = generateID("html")
        parent.insertBefore(DOC.createComment(signature), elem)
        data.element = DOC.createComment(signature + ":end")
        parent.replaceChild(data.element, elem)
        elem = data.element
    }
    if (typeof val !== "object") {//string, number, boolean
        var fragment = avalon.parseHTML(String(val))
    } else if (val.nodeType === 11) { //将val转换为文档碎片
        fragment = val
    } else if (val.nodeType === 1 || val.item) {
        var nodes = val.nodeType === 1 ? val.childNodes : val.item
        fragment = avalonFragment.cloneNode(true)
        while (nodes[0]) {
            fragment.appendChild(nodes[0])
        }
    }

    nodes = avalon.slice(fragment.childNodes)
    //插入占位符, 如果是过滤器,需要有节制地移除指定的数量,如果是html指令,直接清空
    if (isHtmlFilter) {
        var endValue = elem.nodeValue.slice(0, -4)
        while (true) {
            var node = elem.previousSibling
            if (!node || node.nodeType === 8 && node.nodeValue === endValue) {
                break
            } else {
                parent.removeChild(node)
            }
        }
        parent.insertBefore(fragment, elem)
    } else {
        avalon.clearHTML(elem).appendChild(fragment)
    }
    scanNodeArray(nodes, data.vmodels)
}
bindingHandlers["if"] =
    bindingHandlers.data =
    bindingHandlers.text =
    bindingHandlers.html =
    function(data, vmodels) {
        parseExprProxy(data.value, vmodels, data)
}

bindingExecutors["if"] = function(val, elem, data) {
     try {
         if(!elem.parentNode) return
     } catch(e) {return}
    if (val) { //插回DOM树
        if (elem.nodeType === 8) {
            elem.parentNode.replaceChild(data.template, elem)
            elem.ifRemove = null
         //   animate.enter(data.template, elem.parentNode)
            elem = data.element = data.template //这时可能为null
        }
        if (elem.getAttribute(data.name)) {
            elem.removeAttribute(data.name)
            scanAttr(elem, data.vmodels)
        }
        data.rollback = null
    } else { //移出DOM树，并用注释节点占据原位置
        if (elem.nodeType === 1) {
            var node = data.element = DOC.createComment("ms-if")
            elem.parentNode.replaceChild(node, elem)
            elem.ifRemove = node
       //     animate.leave(elem, node.parentNode, node)
            data.template = elem //元素节点
            ifGroup.appendChild(elem)
            data.rollback = function() {
                if (elem.parentNode === ifGroup) {
                    ifGroup.removeChild(elem)
                }
            }
        }
    }
}
//ms-important绑定已经在scanTag 方法中实现
//ms-include绑定已由ms-attr绑定实现

var rdash = /\(([^)]*)\)/
bindingHandlers.on = function(data, vmodels) {
    var value = data.value
    data.type = "on"
    var eventType = data.param.replace(/-\d+$/, "") // ms-on-mousemove-10
    if (typeof bindingHandlers.on[eventType + "Hook"] === "function") {
        bindingHandlers.on[eventType + "Hook"](data)
    }
    if (value.indexOf("(") > 0 && value.indexOf(")") > -1) {
        var matched = (value.match(rdash) || ["", ""])[1].trim()
        if (matched === "" || matched === "$event") { // aaa() aaa($event)当成aaa处理
            value = value.replace(rdash, "")
        }
    }
    parseExprProxy(value, vmodels, data)
}

bindingExecutors.on = function(callback, elem, data) {
    callback = function(e) {
        var fn = data.evaluator || noop
        return fn.apply(this, data.args.concat(e))
    }
    var eventType = data.param.replace(/-\d+$/, "") // ms-on-mousemove-10
    if (eventType === "scan") {
        callback.call(elem, {
            type: eventType
        })
    } else if (typeof data.specialBind === "function") {
        data.specialBind(elem, callback)
    } else {
        var removeFn = avalon.bind(elem, eventType, callback)
    }
    data.rollback = function() {
        if (typeof data.specialUnbind === "function") {
            data.specialUnbind()
        } else {
            avalon.unbind(elem, eventType, removeFn)
        }
    }
}
bindingHandlers.repeat = function (data, vmodels) {
    var type = data.type
    parseExprProxy(data.value, vmodels, data, 1)
    data.proxies = []
    var freturn = false
    try {
        var $repeat = data.$repeat = data.evaluator.apply(0, data.args || [])
        var xtype = avalon.type($repeat)
        if (xtype !== "object" && xtype !== "array") {
            freturn = true
            avalon.log("warning:" + data.value + "只能是对象或数组")
        } else {
            data.xtype = xtype
        }
    } catch (e) {
        freturn = true
    }
    var arr = data.value.split(".") || []
    if (arr.length > 1) {
        arr.pop()
        var n = arr[0]
        for (var i = 0, v; v = vmodels[i++]; ) {
            if (v && v.hasOwnProperty(n)) {
                var events = v[n].$events || {}
                events[subscribers] = events[subscribers] || []
                events[subscribers].push(data)
                break
            }
        }
    }

    var elem = data.element
    if (elem.nodeType === 1) {
        elem.removeAttribute(data.name)
        data.sortedCallback = getBindingCallback(elem, "data-with-sorted", vmodels)
        data.renderedCallback = getBindingCallback(elem, "data-" + type + "-rendered", vmodels)
        var signature = generateID(type)
        var start = DOC.createComment(signature)
        var end = DOC.createComment(signature + ":end")
        data.signature = signature
        data.template = avalonFragment.cloneNode(false)
        if (type === "repeat") {
            var parent = elem.parentNode
            parent.replaceChild(end, elem)
            parent.insertBefore(start, end)
            data.template.appendChild(elem)
        } else {
            while (elem.firstChild) {
                data.template.appendChild(elem.firstChild)
            }
            elem.appendChild(start)
            elem.appendChild(end)
        }
        data.element = end
        data.handler = bindingExecutors.repeat
        data.rollback = function () {
            var elem = data.element
            if (!elem)
                return
            data.handler("clear")
        }
    }

    if (freturn) {
        return
    }

    data.$outer = {}
    var check0 = "$key"
    var check1 = "$val"
    if (Array.isArray($repeat)) {
        check0 = "$first"
        check1 = "$last"
    }

    for (i = 0; v = vmodels[i++]; ) {
        if (v.hasOwnProperty(check0) && v.hasOwnProperty(check1)) {
            data.$outer = v
            break
        }
    }
    var $events = $repeat.$events
    var $list = ($events || {})[subscribers]
    injectDependency($list, data)
    if (xtype === "object") {
        data.handler("append")
    } else if ($repeat.length) {
        data.handler("add", 0, $repeat.length)
    }
}

bindingExecutors.repeat = function (method, pos, el) {
    var data = this
    if (!method && data.xtype) {
        var old = data.$repeat
        var neo = data.evaluator.apply(0, data.args || [])

        if (data.xtype === "array") {
            if (old.length === neo.length) {
                return
            }
            method = "add"
            pos = 0
            data.$repeat = neo
            el = neo.length
        } else {
            if (keysVM(old).join(";;") === keysVM(neo).join(";;")) {
                return
            }
            method = "append"
            data.$repeat = neo
        }
    }
    if (method) {
        var start, fragment
        var end = data.element
        var comments = getComments(data)
        var parent = end.parentNode
        var proxies = data.proxies
        var transation = avalonFragment.cloneNode(false)
        switch (method) {
            case "add": //在pos位置后添加el数组（pos为插入位置,el为要插入的个数）
                var n = pos + el
                var fragments = []
                for (var i = pos; i < n; i++) {
                    var proxy = eachProxyAgent(i, data)
                    proxies.splice(i, 0, proxy)
                    shimController(data, transation, proxy, fragments)
                }
                parent.insertBefore(transation, comments[pos] || end)
                for (i = 0; fragment = fragments[i++]; ) {
                    scanNodeArray(fragment.nodes, fragment.vmodels)
                    fragment.nodes = fragment.vmodels = null
                }

                break
            case "del": //将pos后的el个元素删掉(pos, el都是数字)
                sweepNodes(comments[pos], comments[pos + el] || end)
                var removed = proxies.splice(pos, el)
                recycleProxies(removed, "each")
                break
            case "clear":
                start = comments[0]
                if (start) {
                    sweepNodes(start, end)
                    if (data.xtype === "object") {
                        parent.insertBefore(start, end)
                    }else{
                        recycleProxies(proxies, "each")
                    }
                }
                break
            case "move":
                start = comments[0]
                if (start) {
                    var signature = start.nodeValue
                    var rooms = []
                    var room = [],
                            node
                    sweepNodes(start, end, function () {
                        room.unshift(this)
                        if (this.nodeValue === signature) {
                            rooms.unshift(room)
                            room = []
                        }
                    })
                    sortByIndex(rooms, pos)
                    sortByIndex(proxies, pos)
                    while (room = rooms.shift()) {
                        while (node = room.shift()) {
                            transation.appendChild(node)
                        }
                    }
                    parent.insertBefore(transation, end)
                }
                break
            case "index": //将proxies中的第pos个起的所有元素重新索引
                var last = proxies.length - 1
                for (; el = proxies[pos]; pos++) {
                    el.$index = pos
                    el.$first = pos === 0
                    el.$last = pos === last
                }
                return
            case "set": //将proxies中的第pos个元素的VM设置为el（pos为数字，el任意）
                proxy = proxies[pos]
                if (proxy) {
                    fireDependencies(proxy.$events[data.param || "el"])
                }
                break
            case "append":
                var object = data.$repeat //原来第2参数， 被循环对象
                var pool = Array.isArray(proxies) ||!proxies ?  {}: proxies   //代理对象组成的hash
                data.proxies = pool
                var keys = []
                fragments = []
                for (var key in pool) {
                    if (!object.hasOwnProperty(key)) {
                        proxyRecycler(pool[key], withProxyPool) //去掉之前的代理VM
                        delete(pool[key])
                    }
                }
                for (key in object) { //得到所有键名
                    if (object.hasOwnProperty(key) && key !== "hasOwnProperty") {
                        keys.push(key)
                    }
                }
                if (data.sortedCallback) { //如果有回调，则让它们排序
                    var keys2 = data.sortedCallback.call(parent, keys)
                    if (keys2 && Array.isArray(keys2) && keys2.length) {
                        keys = keys2
                    }
                }
                for (i = 0; key = keys[i++]; ) {
                    if (key !== "hasOwnProperty") {
                        pool[key] = withProxyAgent(pool[key], key, data)
                        shimController(data, transation, pool[key], fragments)
                    }
                }

                parent.insertBefore(transation, end)
                for (i = 0; fragment = fragments[i++]; ) {
                    scanNodeArray(fragment.nodes, fragment.vmodels)
                    fragment.nodes = fragment.vmodels = null
                }
                break
        }
        if (!data.$repeat || data.$repeat.hasOwnProperty("$lock")) //IE6-8 VBScript对象会报错, 有时候data.$repeat不存在
            return
        if (method === "clear")
            method = "del"
        var callback = data.renderedCallback || noop,
                args = arguments
        if (parent.oldValue && parent.tagName === "SELECT") { //fix #503
            avalon(parent).val(parent.oldValue.split(","))
        }
        callback.apply(parent, args)
    }
}
"with,each".replace(rword, function (name) {
    bindingHandlers[name] = bindingHandlers.repeat
})

function shimController(data, transation, proxy, fragments) {
    var content = data.template.cloneNode(true)
    var nodes = avalon.slice(content.childNodes)
    content.insertBefore(DOC.createComment(data.signature), content.firstChild)
    transation.appendChild(content)
    var nv = [proxy].concat(data.vmodels)
    var fragment = {
        nodes: nodes,
        vmodels: nv
    }
    fragments.push(fragment)
}

function getComments(data) {
    var ret = []
    var nodes = data.element.parentNode.childNodes
    for (var i = 0, node; node = nodes[i++]; ) {
        if (node.nodeValue === data.signature) {
            ret.push(node)
        } else if (node.nodeValue === data.signature + ":end") {
            break
        }
    }
    return ret
}


//移除掉start与end之间的节点(保留end)
function sweepNodes(start, end, callback) {
    while (true) {
        var node = end.previousSibling
        if (!node)
            break
        node.parentNode.removeChild(node)
        callback && callback.call(node)
        if (node === start) {
            break
        }
    }
}

// 为ms-each,ms-with, ms-repeat会创建一个代理VM，
// 通过它们保持一个下上文，让用户能调用$index,$first,$last,$remove,$key,$val,$outer等属性与方法
// 所有代理VM的产生,消费,收集,存放通过xxxProxyFactory,xxxProxyAgent, recycleProxies,xxxProxyPool实现
var withProxyPool = []
function withProxyFactory() {
    var proxy = modelFactory({
        $key: "",
        $outer: {},
        $host: {},
        $val: {
            get: function () {
                return this.$host[this.$key]
            },
            set: function (val) {
                this.$host[this.$key] = val
            }
        }
    }, {
        $val: 1
    })
    proxy.$id = generateID("$proxy$with")
    return proxy
}

function withProxyAgent(proxy, key, data) {
    proxy = proxy || withProxyPool.pop()
    if (!proxy) {
        proxy = withProxyFactory()
    } else {
        proxy.$reinitialize()
    }
    var host = data.$repeat
    proxy.$key = key

    proxy.$host = host
    proxy.$outer = data.$outer
    if (host.$events) {
        proxy.$events.$val = host.$events[key]
    } else {
        proxy.$events = {}
    }
    return proxy
}


function  recycleProxies(proxies) {
    eachProxyRecycler(proxies)
}
function eachProxyRecycler(proxies) {
    proxies.forEach(function (proxy) {
        proxyRecycler(proxy, eachProxyPool)
    })
    proxies.length = 0
}


var eachProxyPool = []
function eachProxyFactory(name) {
    var source = {
        $host: [],
        $outer: {},
        $index: 0,
        $first: false,
        $last: false,
        $remove: avalon.noop
    }
    source[name] = {
        get: function () {
            var e = this.$events
            var array = e.$index
            e.$index = e[name] //#817 通过$index为el收集依赖
            try {
                return this.$host[this.$index]
            } finally {
                e.$index = array
            }
        },
        set: function (val) {
            try {
                var e = this.$events
                var array = e.$index
                e.$index = []
                this.$host.set(this.$index, val)
            } finally {
                e.$index = array
            }
        }
    }
    var second = {
        $last: 1,
        $first: 1,
        $index: 1
    }
    var proxy = modelFactory(source, second)
    proxy.$id = generateID("$proxy$each")
    return proxy
}

function eachProxyAgent(index, data) {
    var param = data.param || "el",
            proxy
    for (var i = 0, n = eachProxyPool.length; i < n; i++) {
        var candidate = eachProxyPool[i]
        if (candidate && candidate.hasOwnProperty(param)) {
            proxy = candidate
            eachProxyPool.splice(i, 1)
        }
    }
    if (!proxy) {
        proxy = eachProxyFactory(param)
    }
    var host = data.$repeat
    var last = host.length - 1
    proxy.$index = index
    proxy.$first = index === 0
    proxy.$last = index === last
    proxy.$host = host
    proxy.$outer = data.$outer
    proxy.$remove = function () {
        return host.removeAt(proxy.$index)
    }
    return proxy
}


function proxyRecycler(proxy, proxyPool) {
    for (var i in proxy.$events) {
        var arr = proxy.$events[i]
        if (Array.isArray(arr)) {
            arr.forEach(function (data) {
                if (typeof data === "object")
                    disposeData(data)
            })// jshint ignore:line
            arr.length = 0
        }
    }
    proxy.$host = proxy.$outer = {}
    if (proxyPool.unshift(proxy) > kernel.maxRepeatSize) {
        proxyPool.pop()
    }
}

/*********************************************************************
 *                         各种指令                                  *
 **********************************************************************/
//ms-skip绑定已经在scanTag 方法中实现
// bindingHandlers.text 定义在if.js
bindingExecutors.text = function(val, elem) {
	val = val == null ? "" : val //不在页面上显示undefined null
	if (elem.nodeType === 3) { //绑定在文本节点上
		try { //IE对游离于DOM树外的节点赋值会报错
			elem.data = val
		} catch (e) {}
	} else { //绑定在特性节点上
		elem.textContent = val
	}
}
function parseDisplay(nodeName, val) {
    //用于取得此类标签的默认display值
    var key = "_" + nodeName
    if (!parseDisplay[key]) {
        var node = DOC.createElement(nodeName)
        root.appendChild(node)
        if (W3C) {
            val = getComputedStyle(node, null).display
        } else {
            val = node.currentStyle.display
        }
        root.removeChild(node)
        parseDisplay[key] = val
    }
    return parseDisplay[key]
}

avalon.parseDisplay = parseDisplay

bindingHandlers.visible = function (data, vmodels) {
    parseExprProxy(data.value, vmodels, data)
}

bindingExecutors.visible = function (val, elem, binding) {
    if (val) {
        elem.style.display = binding.display || ""
        if (avalon(elem).css("display") === "none") {
            elem.style.display = binding.display = parseDisplay(elem.nodeName)
        }
    } else {
        elem.style.display = "none"
    }
}
bindingHandlers.widget = function(data, vmodels) {
    var args = data.value.match(rword)
    var elem = data.element
    var widget = args[0]
    var id = args[1]
    if (!id || id === "$") { //没有定义或为$时，取组件名+随机数
        id = generateID(widget)
    }
    var optName = args[2] || widget //没有定义，取组件名
    var constructor = avalon.ui[widget]
    if (typeof constructor === "function") { //ms-widget="tabs,tabsAAA,optname"
        vmodels = elem.vmodels || vmodels
        for (var i = 0, v; v = vmodels[i++];) {
            if (v.hasOwnProperty(optName) && typeof v[optName] === "object") {
                var vmOptions = v[optName]
                vmOptions = vmOptions.$model || vmOptions
                break
            }
        }
        if (vmOptions) {
            var wid = vmOptions[widget + "Id"]
            if (typeof wid === "string") {
                log("warning!不再支持" + widget + "Id")
                id = wid
            }
        }
        //抽取data-tooltip-text、data-tooltip-attr属性，组成一个配置对象
        var widgetData = avalon.getWidgetData(elem, widget)
        data.value = [widget, id, optName].join(",")
        data[widget + "Id"] = id
        data.evaluator = noop
        elem.msData["ms-widget-id"] = id
        var options = data[widget + "Options"] = avalon.mix({}, constructor.defaults, vmOptions || {}, widgetData)
        elem.removeAttribute("ms-widget")
        var vmodel = constructor(elem, data, vmodels) || {} //防止组件不返回VM
        if (vmodel.$id) {
            avalon.vmodels[id] = vmodel
            createSignalTower(elem, vmodel)
            try {
                vmodel.$init(function() {
                    avalon.scan(elem, [vmodel].concat(vmodels))
                    if (typeof options.onInit === "function") {
                        options.onInit.call(elem, vmodel, options, vmodels)
                    }
                })
            } catch (e) {}
            data.rollback = function() {
                try {
                    vmodel.$remove()
                    vmodel.widgetElement = null // 放到$remove后边
                } catch (e) {}
                elem.msData = {}
                delete avalon.vmodels[vmodel.$id]
            }
            injectDisposeQueue(data, widgetList)
            if (window.chrome) {
                elem.addEventListener("DOMNodeRemovedFromDocument", function() {
                    setTimeout(rejectDisposeQueue)
                })
            }
        } else {
            avalon.scan(elem, vmodels)
        }
    } else if (vmodels.length) { //如果该组件还没有加载，那么保存当前的vmodels
        elem.vmodels = vmodels
    }
}
var widgetList = []
//不存在 bindingExecutors.widget
/*********************************************************************
 *                             自带过滤器                            *
 **********************************************************************/
var rscripts = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim
var ron = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g
var ropen = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig
var rsanitize = {
    a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
    img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
    form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
}
var rsurrogate = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
var rnoalphanumeric = /([^\#-~| |!])/g;

function numberFormat(number, decimals, point, thousands) {
    //form http://phpjs.org/functions/number_format/
    //number	必需，要格式化的数字
    //decimals	可选，规定多少个小数位。
    //point	可选，规定用作小数点的字符串（默认为 . ）。
    //thousands	可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
    number = (number + '')
            .replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
            sep = thousands || ",",
            dec = point || ".",
            s = '',
            toFixedFix = function(n, prec) {
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


var filters = avalon.filters = {
    uppercase: function(str) {
        return str.toUpperCase()
    },
    lowercase: function(str) {
        return str.toLowerCase()
    },
    truncate: function(str, length, truncation) {
        //length，新字符串长度，truncation，新字符串的结尾的字段,返回新字符串
        length = length || 30
        truncation = typeof truncation === "string" ?  truncation : "..." 
        return str.length > length ? str.slice(0, length - truncation.length) + truncation : String(str)
    },
    $filter: function(val) {
        for (var i = 1, n = arguments.length; i < n; i++) {
            var array = arguments[i]
            var fn = avalon.filters[array.shift()]
            if (typeof fn === "function") {
                var arr = [val].concat(array)
                val = fn.apply(null, arr)
            }
        }
        return val
    },
    camelize: camelize,
    //https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
    //    <a href="javasc&NewLine;ript&colon;alert('XSS')">chrome</a> 
    //    <a href="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg==">chrome</a>
    //    <a href="jav	ascript:alert('XSS');">IE67chrome</a>
    //    <a href="jav&#x09;ascript:alert('XSS');">IE67chrome</a>
    //    <a href="jav&#x0A;ascript:alert('XSS');">IE67chrome</a>
    sanitize: function(str) {
        return str.replace(rscripts, "").replace(ropen, function(a, b) {
            var match = a.toLowerCase().match(/<(\w+)\s/)
            if (match) { //处理a标签的href属性，img标签的src属性，form标签的action属性
                var reg = rsanitize[match[1]]
                if (reg) {
                    a = a.replace(reg, function(s, name, value) {
                        var quote = value.charAt(0)
                        return name + "=" + quote + "javascript:void(0)" + quote// jshint ignore:line
                    })
                }
            }
            return a.replace(ron, " ").replace(/\s+/g, " ") //移除onXXX事件
        })
    },
    escape: function(str) {
        //将字符串经过 str 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt 
        return String(str).
                replace(/&/g, '&amp;').
                replace(rsurrogate, function(value) {
                    var hi = value.charCodeAt(0)
                    var low = value.charCodeAt(1)
                    return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';'
                }).
                replace(rnoalphanumeric, function(value) {
                    return '&#' + value.charCodeAt(0) + ';'
                }).
                replace(/</g, '&lt;').
                replace(/>/g, '&gt;')
    },
    currency: function(amount, symbol, fractionSize) {
        return (symbol || "\uFFE5") + numberFormat(amount, isFinite(fractionSize) ? fractionSize : 2)
    },
    number: numberFormat
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
new function() {// jshint ignore:line
    function toInt(str) {
        return parseInt(str, 10) || 0
    }

    function padNumber(num, digits, trim) {
        var neg = ""
        if (num < 0) {
            neg = '-'
            num = -num
        }
        num = "" + num
        while (num.length < digits)
            num = "0" + num
        if (trim)
            num = num.substr(num.length - digits)
        return neg + num
    }

    function dateGetter(name, size, offset, trim) {
        return function(date) {
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
        return function(date, formats) {
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
    filters.date = function(date, format) {
        var locate = filters.date.locate,
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
                trimDate = trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/, function(_, a, b, c) {
                    var array = c.length === 4 ? [c, a, b] : [a, b, c]
                    dateArray[0] = toInt(array[0])     //年
                    dateArray[1] = toInt(array[1]) - 1 //月
                    dateArray[2] = toInt(array[2])     //日
                    return ""
                })
                var dateSetter = oDate.setFullYear
                var timeSetter = oDate.setHours
                trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function(_, a, b, c, d) {
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
                trimDate = trimDate.replace(/Z|([+-])(\d\d):?(\d\d)/, function(z, symbol, c, d) {
                    dateSetter = oDate.setUTCFullYear
                    timeSetter = oDate.setUTCHours
                    if (symbol) {
                        tzHour = toInt(symbol + c)
                        tzMin = toInt(symbol + d)
                    }
                    return ""
                })

                dateArray[3] -= tzHour
                dateArray[4] -= tzMin
                dateSetter.apply(oDate, dateArray.slice(0, 3))
                timeSetter.apply(oDate, dateArray.slice(3))
                date = oDate
            }
        }
        if (typeof date === "number") {
            date = new Date(date)
        }
        if (avalon.type(date) !== "date") {
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
        parts.forEach(function(value) {
            fn = DATE_FORMATS[value]
            text += fn ? fn(date, locate) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
        })
        return text
    }
    var locate = {
        AMPMS: {
            0: "上午",
            1: "下午"
        },
        DAY: {
            0: "星期日",
            1: "星期一",
            2: "星期二",
            3: "星期三",
            4: "星期四",
            5: "星期五",
            6: "星期六"
        },
        MONTH: {
            0: "1月",
            1: "2月",
            2: "3月",
            3: "4月",
            4: "5月",
            5: "6月",
            6: "7月",
            7: "8月",
            8: "9月",
            9: "10月",
            10: "11月",
            11: "12月"
        },
        SHORTDAY: {
            "0": "周日",
            "1": "周一",
            "2": "周二",
            "3": "周三",
            "4": "周四",
            "5": "周五",
            "6": "周六"
        },
        fullDate: "y年M月d日EEEE",
        longDate: "y年M月d日",
        medium: "yyyy-M-d H:mm:ss",
        mediumDate: "yyyy-M-d",
        mediumTime: "H:mm:ss",
        "short": "yy-M-d ah:mm",
        shortDate: "yy-M-d",
        shortTime: "ah:mm"
    }
    locate.SHORTMONTH = locate.MONTH
    filters.date.locate = locate
}// jshint ignore:line
/*********************************************************************
 *                     END                                  *
 **********************************************************************/
new function () {
    avalon.config({
        loader: false
    })
    var fns = [], loaded = DOC.readyState === "complete", fn
    function flush(f) {
        loaded = 1
        while (f = fns.shift())
            f()
    }

    avalon.bind(DOC, "DOMContentLoaded", fn = function () {
        avalon.unbind(DOC, "DOMContentLoaded", fn)
        flush()
    })

    var id = setInterval(function () {
        if (document.readyState === "complete" && document.body) {
            clearInterval(id)
            flush()
        }
    }, 50)

    avalon.ready = function (fn) {
        loaded ? fn(avalon) : fns.push(fn)
    }
    avalon.ready(function () {
        avalon.scan(DOC.body)
    })
}

new function() {// jshint ignore:line
    var touchProxy = {}
    var IEtouch = navigator.pointerEnabled
    var IEMStouch = navigator.msPointerEnabled
    var ua = navigator.userAgent
    var isAndroid = ua.indexOf("Android") > 0
    var isGoingtoFixTouchEndEvent = isAndroid && ua.match(/Firefox|Opera/gi)
    //合成做成触屏事件所需要的各种原生事件
    var touchNames = ["touchstart", "touchmove", "touchend", "touchcancel"]
    var touchTimeout = null
    var longTapTimeout = null
    var dragDistance = 30
    var clickDuration = 750 //小于750ms是点击，长于它是长按或拖动
    var me = bindingHandlers.on

    if (IEtouch) {
        touchNames = ["pointerdown", "pointermove", "pointerup", "pointercancel"]
    } 
    if (IEMStouch) {
        touchNames = ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerCancel"]
    }
    function isPrimaryTouch(event){
        return (event.pointerType === 'touch' || event.pointerType === event.MSPOINTER_TYPE_TOUCH) && event.isPrimary
    }

    function isPointerEventType(e, type){
        return (e.type === 'pointer'+type || e.type.toLowerCase() === 'mspointer'+type)
    }

    //判定滑动方向
    function swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >=
                Math.abs(y1 - y2) ? (x1 - x2 > 0 ? "left" : "right") : (y1 - y2 > 0 ? "up" : "down")
    }

    function fireEvent(el, name, detail) {
        var event = document.createEvent("Events")
        event.initEvent(name, true, true)
        if (detail) {
            event.detail = detail
        }
        el.dispatchEvent(event)
    }

    function onMouse(event) { 
        var target = event.target,
            element = touchProxy.element

        if (element && element !== target) {
            var type = target.type || '',
                targetTag = target.tagName.toLowerCase(),
                elementTag = element.tagName.toLowerCase()
            // 通过手机的“前往”提交表单时不可禁止默认行为；通过label focus input时也不可以阻止默认行为
            if ((targetTag === 'input' &&  elementTag === "label") || type === 'submit') {
                return false
            }
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation()
            } else {
                event.propagationStopped = true
            }
            event.stopPropagation() 
            event.preventDefault()
        }
    }
    function cancelLongTap() {
        if (longTapTimeout) clearTimeout(longTapTimeout)
        longTapTimeout = null
    }
    function touchstart(event) {
        var _isPointerType = isPointerEventType(event, "down"),
            firstTouch = _isPointerType ? event : event.touches[0],
            element = "tagName" in firstTouch.target ? firstTouch.target: firstTouch.target.parentNode,
            now = Date.now(),
            delta = now - (touchProxy.last || now)

        if (_isPointerType && !isPrimaryTouch(event)) return
        if (touchProxy.x1 || touchProxy.y1) {
            touchProxy.x1 = undefined
            touchProxy.y1 = undefined
        }
        if (delta > 0 && delta <= 250) {
            touchProxy.isDoubleTap = true
        }
        touchProxy.x = firstTouch.pageX
        touchProxy.y = firstTouch.pageY
        touchProxy.mx = 0
        touchProxy.my = 0
        touchProxy.last = now
        touchProxy.element = element

        longTapTimeout = setTimeout(function() {
            longTapTimeout = null
            fireEvent(element, "hold")
            fireEvent(element, "longtap")
            touchProxy = {}
        }, clickDuration)
        return true
    }
    function touchmove(event) {

        var _isPointerType = isPointerEventType(event, 'down'),
            firstTouch = _isPointerType ? event : event.touches[0],
            x = firstTouch.pageX,
            y = firstTouch.pageY
        if (_isPointerType && !isPrimaryTouch(event)) return
        /*
            android下某些浏览器触发了touchmove事件的话touchend事件不触发，禁用touchmove可以解决此bug
            http://stackoverflow.com/questions/14486804/understanding-touch-events
        */
        if (isGoingtoFixTouchEndEvent && Math.abs(touchProxy.x - x) > 10) {
            event.preventDefault()
        }
        cancelLongTap()
        
        touchProxy.x1 = x // touchend事件没有pageX、pageY始终为0，且没有clientX和clientY事件
        touchProxy.y1 = y
        touchProxy.mx += Math.abs(touchProxy.x - x)
        touchProxy.my += Math.abs(touchProxy.y - y)
    }
    function touchend(event) { 
        var _isPointerType = isPointerEventType(event, 'down'),
            element = touchProxy.element

        if (_isPointerType && !isPrimaryTouch(event)) return
        if (!element) return // longtap|hold触发后touchProxy为{}

        cancelLongTap()
        if ((touchProxy.x1 && Math.abs(touchProxy.x1 - touchProxy.x) > dragDistance) || (touchProxy.y1 && Math.abs(touchProxy.y1 - touchProxy.y) > dragDistance)) {
            //如果用户滑动的距离有点大，就认为是swipe事件
            var direction = swipeDirection(touchProxy.x, touchProxy.x1, touchProxy.y, touchProxy.y1)
            var details = {
                direction: direction
            }
            fireEvent(element, "swipe", details)
            fireEvent(element, "swipe" + direction, details)
            touchProxy = {}
        } else {
            if (touchProxy.mx < dragDistance && touchProxy.my < dragDistance) {
                fireEvent(element, 'tap')
                if (touchProxy.isDoubleTap) {
                    fireEvent(element, "doubletap")
                    touchProxy = {}
                    touchProxy.element = element
                } else {
                    touchTimeout = setTimeout(function() {
                        clearTimeout(touchTimeout)
                        touchTimeout = null
                        if (touchProxy.element) fireEvent(touchProxy.element, "singletap")
                        touchProxy = {};
                        touchProxy.element = element
                    }, 250)
                }
            } else {
                touchProxy = {}
            }
        }
    }
    document.addEventListener('mousedown', onMouse, true)
    document.addEventListener('click', onMouse, true)
    document.addEventListener(touchNames[0], touchstart)
    document.addEventListener(touchNames[1], touchmove)
    document.addEventListener(touchNames[2], touchend)
    if (touchNames[3]) {
        document.addEventListener(touchNames[3], function(event) {
            if (longTapTimeout) clearTimeout(longTapTimeout)
            if (touchTimeout) clearTimeout(touchTimeout)
            longTapTimeout = touchTimeout = null
            touchProxy = {}
        })
    }
    ["swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "doubletap", "tap", "singletap", "dblclick", "longtap", "hold"].forEach(function(method) {
        me[method + "Hook"] = me["clickHook"]
    })

    //各种摸屏事件的示意图 http://quojs.tapquo.com/  http://touch.code.baidu.com/
}// jshint ignore:line

// Register as a named AMD module, since avalon can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase avalon is used because AMD module names are
// derived from file names, and Avalon is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of avalon, it will work.

// Note that for maximum portability, libraries that are not avalon should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. avalon is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
    if (typeof define === "function" && define.amd) {
        define("avalon", [], function() {
            return avalon
        })
    }
// Map over avalon in case of overwrite
    var _avalon = window.avalon
    avalon.noConflict = function(deep) {
        if (deep && window.avalon === avalon) {
            window.avalon = _avalon
        }
        return avalon
    }
// Expose avalon identifiers, even in AMD
// and CommonJS for browser emulators
    if (noGlobal === void 0) {
        window.avalon = avalon
    }
    
    return avalon

}));