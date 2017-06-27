/*==================================================
 Copyright (c) 2013-2015 司徒正美 and other contributors
 http://www.cnblogs.com/rubylouvre/
 https://github.com/RubyLouvre
 http://weibo.com/jslouvre/
 
 Released under the MIT license
 avalon.mobile.shim.js 1.5.3 built in 2015.9.30
 mobile
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
var nullObject = {} //作用类似于noop，只用于代码防御，千万不要在它上面添加属性
var rword = /[^, ]+/g //切割字符串为一个个小块，以空格或豆号分开它们，结合replace实现字符串的forEach
var rw20g = /\w+/g
var rcomplexType = /^(?:object|array)$/
var rsvg = /^\[object SVG\w*Element\]$/
var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
var oproto = Object.prototype
var ohasOwn = oproto.hasOwnProperty
var serialize = oproto.toString
var ap = Array.prototype
var aslice = ap.slice
var W3C = window.dispatchEvent
var root = DOC.documentElement
var avalonFragment = DOC.createDocumentFragment()
var cinerator = DOC.createElement("div")
var class2type = {}
"Boolean Number String Function Array Date RegExp Object Error".replace(rword, function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase()
})
function scpCompile(array){
    return Function.apply(noop,array)
}
function noop(){}

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


/*视浏览器情况采用最快的异步回调*/
avalon.nextTick = new function () {// jshint ignore:line
    var tickImmediate = window.setImmediate
    var tickObserver = window.MutationObserver
    if (tickImmediate) {
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

    if (tickObserver) {
        var node = document.createTextNode("avalon")
        new tickObserver(callback).observe(node, {characterData: true})// jshint ignore:line
        var bool = false
        return function (fn) {
            queue.push(fn)
            bool = !bool
            node.data = bool
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
    version: 1.53,
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

var directives = avalon.directives = {}
avalon.directive = function (name, obj) {
        bindingHandlers[name] = obj.init = (obj.init || noop)
        bindingExecutors[name] = obj.update = (obj.update || noop)
        
        return directives[name] = obj
    }
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
             delete this._keymap[entry.key] //#1029
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
            throw new SyntaxError("openTag!==closeTag")
            var test = openTag + "test" + closeTag
            cinerator.innerHTML = test
            if (cinerator.innerHTML !== test && cinerator.innerHTML.indexOf("&lt;") > -1) {
                throw new SyntaxError("此定界符不合法")
            }
            cinerator.innerHTML = ""
        }
         kernel.openTag = openTag
            kernel.closeTag = closeTag
        var o = escapeRegExp(openTag),
                c = escapeRegExp(closeTag)
        rexpr = new RegExp(o + "(.*?)" + c)
        rexprg = new RegExp(o + "(.*?)" + c, "g")
        rbind = new RegExp(o + ".*?" + c + "|\\sms-")
    }
}
kernel.async =true
kernel.debug = true
kernel.plugins = plugins
kernel.plugins['interpolate'](["{{", "}}"])
kernel.paths = {}
kernel.shim = {}
kernel.maxRepeatSize = 100
avalon.config = kernel
function $watch(expr, binding) {
    var $events = this.$events || (this.$events = {})
    var queue = $events[expr] || ($events[expr] = [])
    if (typeof binding === "function") {
        var backup = binding
        backup.uniqueNumber = Math.random()
        binding = {
            element: root,
            type: "user-watcher",
            handler: noop,
            vmodels: [this],
            expr: expr,
            uniqueNumber: backup.uniqueNumber
        }
        binding.wildcard = /\*/.test(expr)
    }
   
    if (!binding.update) {
        if (/\w\.*\B/.test(expr)) {
            binding.getter = noop
            var host = this
            binding.update = function () {
                var args = this.fireArgs || []
                if (args[2])
                    binding.handler.apply(host, args)
                delete this.fireArgs
            }
            queue.sync = true
            avalon.Array.ensure(queue, binding)
        } else {
            avalon.injectBinding(binding)
        }
        if (backup) {
            binding.handler = backup
        }
    } else if (!binding.oneTime) {
        avalon.Array.ensure(queue, binding)
    }
    return function () {
        binding.update = binding.getter = binding.handler = noop
        binding.element = DOC.createElement("a")
    }
}

function $emit(key, args) {
    var event = this.$events
    if (event && event[key]) {
        if (args) {
            args[2] = key
        }
        notifySubscribers(event[key], args)
        var parent = this.$up
        if (parent) {
            if (this.$pathname) {
                $emit.call(parent, this.$pathname + "." + key, args)//以确切的值往上冒泡
            }

           $emit.call(parent, "*." + key, args)//以模糊的值往上冒泡
        }
    } else {
        parent = this.$up
        if (parent) {
            var path = this.$pathname + "." + key
            var arr = path.split(".")
            if (arr.indexOf("*") === -1) {
                $emit.call(parent, path, args)//以确切的值往上冒泡
                arr[1] = "*"
                $emit.call(parent, arr.join("."), args)//以确切的值往上冒泡
            } else {
                $emit.call(parent, path, args)//以确切的值往上冒泡
            }
        }
    }
}


function collectDependency(el, key) {
    do {
        if (el.$watch) {
            var e = el.$events || (el.$events = {})
            var array = e[key] || (e[key] = [])
            dependencyDetection.collectDependency(array)
            return
        }
        el = el.$up
        if (el) {
            key = el.$pathname + "." + key
        } else {
            break
        }

    } while (true)
}


function notifySubscribers(subs, args) {
    if (!subs)
        return
    if (new Date() - beginTime > 444 && typeof subs[0] === "object") {
        rejectDisposeQueue()
    }
    var users = [], renders = []
    for (var i = 0, sub; sub = subs[i++]; ) {
        if (sub.type === "user-watcher") {
            users.push(sub)
        } else {
            renders.push(sub)
        }

    }
    if (kernel.async) {
        buffer.render()//1
        for (i = 0; sub = renders[i++]; ) {
            if (sub.update) {
                var uuid = getUid(sub)
                if (!buffer.queue[uuid]) {
                    buffer.queue[uuid] = 1
                    buffer.queue.push(sub)
                }
            }
        }
    } else {
        for (i = 0; sub = renders[i++]; ) {
            if (sub.update) {
                sub.update()//最小化刷新DOM树
            }
        }
    }
    for (i = 0; sub = users[i++]; ) {
        if (args && args[2] === sub.expr || sub.wildcard) {
            sub.fireArgs = args
        }
        sub.update()
    }
}
//avalon最核心的方法的两个方法之一（另一个是avalon.scan），返回一个ViewModel(VM)
var VMODELS = avalon.vmodels = {} //所有vmodel都储存在这里
avalon.define = function (source) {
    var $id = source.$id
    if (!$id) {
        log("warning: vm必须指定$id")
    }
    var vmodel = modelFactory(source)
    vmodel.$id = $id
    return VMODELS[$id] = vmodel
}

//一些不需要被监听的属性
var $$skipArray = oneObject("$id,$watch,$fire,$events,$model,$skipArray,$active,$pathname,$up,$track,$accessors")

//如果浏览器不支持ecma262v5的Object.defineProperties或者存在BUG，比如IE8
//标准浏览器使用__defineGetter__, __defineSetter__实现

function modelFactory(source, options) {
    options = options || {}
    options.watch = true
    return observeObject(source, options)
}

//监听对象属性值的变化(注意,数组元素不是数组的属性),通过对劫持当前对象的访问器实现
//监听对象或数组的结构变化, 对对象的键值对进行增删重排, 或对数组的进行增删重排,都属于这范畴
//   通过比较前后代理VM顺序实现
function Component() {
}

function observeObject(source, options) {
    if (!source || (source.$id && source.$accessors)) {
        return source
    }
    //source为原对象,不能是元素节点或null
    //options,可选,配置对象,里面有old, force, watch这三个属性
    options = options || nullObject
    var force = options.force || nullObject
    var old = options.old
    var oldAccessors = typeof old === "object" ? old.$accessors : nullObject
    var $vmodel = new Component() //要返回的对象, 它在IE6-8下可能被偷龙转凤
    var accessors = {} //监控属性
    var hasOwn = {}
    var skip = []
    var simple = []
    var $skipArray = {}
    if (source.$skipArray) {
        $skipArray = oneObject(source.$skipArray)
        delete source.$skipArray
    }
    //处理计算属性
    var computed = source.$computed
    if (computed) {
        delete source.$computed
        for (var name in computed) {
            hasOwn[name] = true;
            (function (key, value) {
                var old
                accessors[key] = {
                    get: function () {
                        return old = value.get.call(this)
                    },
                    set: function (x) {
                        if (typeof value.set === "function") {
                            var older = old
                            value.set.call(this, x)
                            var newer = this[key]
                            if (this.$fire && (newer !== older)) {
                                this.$fire(key, newer, older)
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                }
            })(name, computed[name])// jshint ignore:line
        }
    }


    for (name in source) {
        var value = source[name]
        if (!$$skipArray[name])
            hasOwn[name] = true
        if (typeof value === "function" || (value && value.nodeType) ||
                (!force[name] && (name.charAt(0) === "$" || $$skipArray[name] || $skipArray[name]))) {
            skip.push(name)
        } else if (isComputed(value)) {
            log("warning:计算属性建议放在$computed对象中统一定义");
            (function (key, value) {
                var old
                accessors[key] = {
                    get: function () {
                        return old = value.get.call(this)
                    },
                    set: function (x) {
                        if (typeof value.set === "function") {
                            var older = old
                            value.set.call(this, x)
                            var newer = this[key]
                            if (this.$fire && (newer !== older)) {
                                this.$fire(key, newer, older)
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                }
            })(name, value)// jshint ignore:line
        } else {
            simple.push(name)
            if (oldAccessors[name]) {
                accessors[name] = oldAccessors[name]
            } else {
                accessors[name] = makeGetSet(name, value)
            }
        }
    }


    accessors["$model"] = $modelDescriptor
    $vmodel = Object.defineProperties($vmodel, accessors, source)
    function trackBy(name) {
        return hasOwn[name] === true
    }
    skip.forEach(function (name) {
        $vmodel[name] = source[name]
    })

    /* jshint ignore:start */
    hideProperty($vmodel, "$id", "anonymous")
    hideProperty($vmodel, "$up", old ? old.$up : null)
    hideProperty($vmodel, "$track", Object.keys(hasOwn))
    hideProperty($vmodel, "$active", false)
    hideProperty($vmodel, "$pathname", old ? old.$pathname : "")
    hideProperty($vmodel, "$accessors", accessors)
    hideProperty($vmodel, "hasOwnProperty", trackBy)
    if (options.watch) {
        hideProperty($vmodel, "$watch", function () {
            return $watch.apply($vmodel, arguments)
        })
        hideProperty($vmodel, "$fire", function (path, a) {
            if(path.indexOf("all!") === 0 ){
                var ee = path.slice(4)
                for(var i in avalon.vmodels){
                    var v = avalon.vmodels[i]
                    v.$fire && v.$fire.apply(v, [ee, a])
                }
            }else{
               $emit.call($vmodel, path, [a])
            }
        })
    }
    /* jshint ignore:end */

    //必须设置了$active,$events
    simple.forEach(function (name) {
        var val = $vmodel[name] = source[name]
        if (val && typeof val === "object") {
            val.$up = $vmodel
            val.$pathname = name
        }
        $emit.call($vmodel, name)
    })
    for (name in computed) {
        value = $vmodel[name]
    }
    $vmodel.$active = true
    return $vmodel
}
/*
 新的VM拥有如下私有属性
 $id: vm.id
 $events: 放置$watch回调与绑定对象
 $watch: 增强版$watch
 $fire: 触发$watch回调
 $track:一个数组,里面包含用户定义的所有键名
 $active:boolean,false时防止依赖收集
 $model:返回一个纯净的JS对象
 $accessors:放置所有读写器的数据描述对象
 $up:返回其上级对象
 $pathname:返回此对象在上级对象的名字,注意,数组元素的$pathname为空字符串
 =============================
 $skipArray:用于指定不可监听的属性,但VM生成是没有此属性的
 */
function isComputed(val) {//speed up!
    if (val && typeof val === "object") {
        for (var i in val) {
            if (i !== "get" && i !== "set") {
                return false
            }
        }
        return  typeof val.get === "function"
    }
}
function makeGetSet(key, value) {
    var childVm, value = NaN
    return {
        get: function () {
            if (this.$active) {
                collectDependency(this, key)
            }
            return value
        },
        set: function (newVal) {
            if (value === newVal)
                return
            var oldValue = value
            childVm = observe(newVal, value)
            if (childVm) {
                value = childVm
            } else {
                childVm = void 0
                value = newVal
            }

            if (Object(childVm) === childVm) {
                childVm.$pathname = key
                childVm.$up = this
            }
            if (this.$active) {
                $emit.call(this, key, [value, oldValue])
            }
        },
        enumerable: true,
        configurable: true
    }
}

function observe(obj, old, hasReturn, watch) {
    if (Array.isArray(obj)) {
        return observeArray(obj, old, watch)
    } else if (avalon.isPlainObject(obj)) {
        if (old) {
            var keys = Object.keys(obj)
            var keys2 = Object.keys(old)
            if (keys.join(";") === keys2.join(";")) {
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        old[i] = obj[i]
                    }
                }
                return old
            }
            old.$active = false
        }
        return observeObject(obj, {
            old: old,
            watch: watch
        })
    }
    if (hasReturn) {
        return obj
    }
}

function observeArray(array, old, watch) {
    if (old) {
        var args = [0, old.length].concat(array)
        old.splice.apply(old, args)
        return old
    } else {
        for (var i in newProto) {
            array[i] = newProto[i]
        }

        hideProperty(array, "$up", null)
        hideProperty(array, "$pathname", "")
        hideProperty(array, "$track", createTrack(array.length))

        array._ = observeObject({
            length: NaN
        }, {
            watch: true
        })
        array._.length = array.length
        array._.$watch("length", function (a, b) {
            $emit.call(array.$up, array.$pathname + ".length", [a, b])
        })
        if (watch) {
            hideProperty(array, "$watch", function () {
                return $watch.apply(array, arguments)
            })
        }


        Object.defineProperty(array, "$model", $modelDescriptor)

        for (var j = 0, n = array.length; j < n; j++) {
            var el = array[j] = observe(array[j], 0, 1, 1)
            if (Object(el) === el) {//#1077
                el.$up = array
            }
        }

        return array
    }
}

function hideProperty(host, name, value) {

    Object.defineProperty(host, name, {
        value: value,
        writable: true,
        enumerable: false,
        configurable: true
    })

}

function toJson(val) {
    var xtype = avalon.type(val)
    if (xtype === "array") {
        var array = []
        for (var i = 0; i < val.length; i++) {
            array[i] = toJson(val[i])
        }
        return array
    } else if (xtype === "object") {
        var obj = {}
        for (i in val) {
            if (val.hasOwnProperty(i)) {
                var value = val[i]
                obj[i] = value && value.nodeType ? value :toJson(value)
            }
        }
        return obj
    }
    return val
}

var $modelDescriptor = {
    get: function () {
        return toJson(this)
    },
    set: noop,
    enumerable: false,
    configurable: true
}


/*********************************************************************
 *          监控数组（与ms-each, ms-repeat配合使用）                     *
 **********************************************************************/

var arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice']
var arrayProto = Array.prototype
var newProto = {
    notify: function () {
        $emit.call(this.$up, this.$pathname)
    },
    set: function (index, val) {
        if (((index >>> 0) === index) && this[index] !== val) {
            if (index > this.length) {
                throw Error(index + "set方法的第一个参数不能大于原数组长度")
            }
            $emit.call(this.$up, this.$pathname + ".*", [val, this[index]])
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
    size: function () { //取得数组长度，这个函数可以同步视图，length不能
        return this._.length
    },
    removeAll: function (all) { //移除N个元素
        if (Array.isArray(all)) {
            for (var i = this.length - 1; i >= 0; i--) {
                if (all.indexOf(this[i]) !== -1) {
                    _splice.call(this.$track, i, 1)
                    _splice.call(this, i, 1)
                    
                }
            }
        } else if (typeof all === "function") {
            for (i = this.length - 1; i >= 0; i--) {
                var el = this[i]
                if (all(el, i)) {
                     _splice.call(this.$track, i, 1)
                    _splice.call(this, i, 1)
                   
                }
            }
        } else {
            _splice.call(this.$track, 0, this.length)
            _splice.call(this, 0, this.length)

        }
        if (!W3C) {
            this.$model = toJson(this)
        }
        this.notify()
        this._.length = this.length
    },
    clear: function () {
        return this.removeAll()
    }
}
var _splice = arrayProto.splice
arrayMethods.forEach(function (method) {
    var original = arrayProto[method]
    newProto[method] = function () {
        // 继续尝试劫持数组元素的属性
        var args = []
        for (var i = 0, n = arguments.length; i < n; i++) {
            args[i] = observe(arguments[i], 0, 1, 1)
        }
        var result = original.apply(this, args)
        addTrack(this.$track, method, args)
        if (!W3C) {
            this.$model = toJson(this)
        }
        this.notify()
        this._.length = this.length
        return result
    }
})

"sort,reverse".replace(rword, function (method) {
    newProto[method] = function () {
        var oldArray = this.concat() //保持原来状态的旧数组
        var newArray = this
        var mask = Math.random()
        var indexes = []
        var hasSort = false
        arrayProto[method].apply(newArray, arguments) //排序
        for (var i = 0, n = oldArray.length; i < n; i++) {
            var neo = newArray[i]
            var old = oldArray[i]
            if (neo === old) {
                indexes.push(i)
            } else {
                var index = oldArray.indexOf(neo)
                indexes.push(index)//得到新数组的每个元素在旧数组对应的位置
                oldArray[index] = mask    //屏蔽已经找过的元素
                hasSort = true
            }
        }
        if (hasSort) {
            sortByIndex(this.$track, indexes)
            if (!W3C) {
                this.$model = toJson(this)
            }
            this.notify()
        }
        return this
    }
})

function sortByIndex(array, indexes) {
    var map = {};
    for (var i = 0, n = indexes.length; i < n; i++) {
        map[i] = array[i]
        var j = indexes[i]
        if (j in map) {
            array[i] = map[j]
            delete map[j]
        } else {
            array[i] = array[j]
        }
    }
}

function createTrack(n) {
    var ret = []
    for (var i = 0; i < n; i++) {
        ret[i] = generateID("$proxy$each")
    }
    return ret
}

function addTrack(track, method, args) {
    switch (method) {
        case 'push':
        case 'unshift':
            args = createTrack(args.length)
            break
        case 'splice':
            if (args.length > 2) {
                // 0, 5, a, b, c --> 0, 2, 0
                // 0, 5, a, b, c, d, e, f, g--> 0, 0, 3
                var del = args[1]
                var add = args.length - 2
                // args = [args[0], Math.max(del - add, 0)].concat(createTrack(Math.max(add - del, 0)))
                args = [args[0], args[1]].concat(createTrack(args.length - 2))
            }
            break
    }
    Array.prototype[method].apply(track, args)
}
/*********************************************************************
 *                           依赖调度系统                             *
 **********************************************************************/
//检测两个对象间的依赖关系
var dependencyDetection = (function () {
    var outerFrames = []
    var currentFrame
    return {
        begin: function (binding) {
            //accessorObject为一个拥有callback的对象
            outerFrames.push(currentFrame)
            currentFrame = binding
        },
        end: function () {
            currentFrame = outerFrames.pop()
        },
        collectDependency: function (array) {
            if (currentFrame) {
                //被dependencyDetection.begin调用
                currentFrame.callback(array)
            }
        }
    };
})()
//将绑定对象注入到其依赖项的订阅数组中
var roneval = /^on$/

function returnRandom() {
    return new Date() - 0
}

avalon.injectBinding = function (binding) {

    binding.handler = binding.handler || directives[binding.type].update || noop
    binding.update = function () {
        var begin = false
        if (!binding.getter) {
            begin = true
            dependencyDetection.begin({
                callback: function (array) {
                    injectDependency(array, binding)
                }
            })
            binding.getter = parseExpr(binding.expr, binding.vmodels, binding)
            binding.observers.forEach(function (a) {
                a.v.$watch(a.p, binding)
            })
            delete binding.observers
        }
        try {
            var args = binding.fireArgs, a, b
            delete binding.fireArgs
            if (!args) {
                if (binding.type === "on") {
                    a = binding.getter + ""
                } else {
                    a = binding.getter.apply(0, binding.args)
                }
            } else {
                a = args[0]
                b = args[1]

            }
            b = typeof b === "undefined" ? binding.oldValue : b
            if (binding._filters) {
                a = filters.$filter.apply(0, [a].concat(binding._filters))
            }
            if (binding.signature) {
                var xtype = avalon.type(a)
                if (xtype !== "array" && xtype !== "object") {
                    throw Error("warning:" + binding.expr + "只能是对象或数组")
                }
                binding.xtype = xtype
                var vtrack = getProxyIds(binding.proxies || [], xtype)
                var mtrack = a.$track || (xtype === "array" ? createTrack(a.length) :
                        Object.keys(a))
                binding.track = mtrack
                if (vtrack !== mtrack.join(";")) {
                    binding.handler(a, b)
                    binding.oldValue = 1
                }
            } else if (Array.isArray(a) ? a.length !== (b && b.length) : false) {
                binding.handler(a, b)
                binding.oldValue = a.concat()
            } else if (!("oldValue" in binding) || a !== b) {
                binding.handler(a, b)
                binding.oldValue = a
            }
        } catch (e) {
            delete binding.getter
            log("warning:exception throwed in [avalon.injectBinding] ", e)
            var node = binding.element
            if (node && node.nodeType === 3) {
                node.nodeValue = openTag + (binding.oneTime ? "::" : "") + binding.expr + closeTag
            }
        } finally {
            begin && dependencyDetection.end()

        }
    }
    binding.update()
}


//将依赖项(比它高层的访问器或构建视图刷新函数的绑定对象)注入到订阅者数组
function injectDependency(list, binding) {
    if (binding.oneTime)
        return
    if (list && avalon.Array.ensure(list, binding) && binding.element) {
        injectDisposeQueue(binding, list)
        if (new Date() - beginTime > 444) {
            rejectDisposeQueue()
        }
    }
}


function getProxyIds(a, isArray) {
    var ret = []
    for (var i = 0, el; el = a[i++]; ) {
        ret.push(isArray ? el.$id : el.$key)
    }
    return ret.join(";")
}

/*********************************************************************
 *                          定时GC回收机制                             *
 **********************************************************************/
var disposeCount = 0
var disposeQueue = avalon.$$subscribers = []
var beginTime = new Date()
var oldInfo = {}

function getUid(data) { //IE9+,标准浏览器
    if (!data.uniqueNumber) {
        var elem = data.element
        if (elem) {
            if (elem.nodeType !== 1) {
                data.uniqueNumber = data.type + (data.pos || 0) + "-" + getUid(elem.parentNode)
            } else {
                data.uniqueNumber = data.name + "-" + getUid(elem)
            }
        } else {
            data.uniqueNumber = ++disposeCount
        }
    }
    return data.uniqueNumber
}

//添加到回收列队中
function injectDisposeQueue(data, list) {
    var lists = data.lists || (data.lists = [])
    var uuid = getUid(data)
    avalon.Array.ensure(lists, list)
    list.$uuid = list.$uuid || generateID()
    if (!disposeQueue[uuid]) {
        disposeQueue[uuid] = 1
        disposeQueue.push(data)
    }
}

function rejectDisposeQueue(data) {

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
                delete disposeQueue[data.uniqueNumber]
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
    delete disposeQueue[data.uniqueNumber] // 先清除，不然无法回收了
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
    return target.replace(/[-_][^-_]/g, function (match) {
        return match.charAt(1).toUpperCase()
    })
}

"add,remove".replace(rword, function (method) {
    avalon.fn[method + "Class"] = function (cls) {
        var el = this[0]
            //https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/26
        if (cls && typeof cls === "string" && el && el.nodeType === 1) {
            cls.replace(/\S+/g, function (c) {
                el.classList[method](c)
            })
        }
        return this
    }
})

avalon.fn.mix({
    hasClass: function (cls) {
        var el = this[0] || {} //IE10+, chrome8+, firefox3.6+, safari5.1+,opera11.5+支持classList,chrome24+,firefox26+支持classList2.0
        return el.nodeType === 1 && el.classList.contains(cls)
    },
    toggleClass: function (value, stateVal) {
        var className, i = 0
        var classNames = String(value).split(/\s+/)
        var isBool = typeof stateVal === "boolean"
        while ((className = classNames[i++])) {
            var state = isBool ? stateVal : !this.hasClass(className)
            this[state ? "addClass" : "removeClass"](className)
        }
        return this
    },
    attr: function (name, value) {
        if (arguments.length === 2) {
            this[0].setAttribute(name, value)
            return this
        } else {
            return this[0].getAttribute(name)
        }
    },
    data: function (name, value) {
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
            ap.forEach.call(this[0].attributes, function (attr) {
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
    removeData: function (name) {
        name = "data-" + hyphen(name)
        this[0].removeAttribute(name)
        return this
    },
    css: function (name, value) {
        if (avalon.isPlainObject(name)) {
            for (var i in name) {
                avalon.css(this, i, name[i])
            }
        } else {
            var ret = avalon.css(this, name, value)
        }
        return ret !== void 0 ? ret : this
    },
    position: function () {
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
    offsetParent: function () {
        var offsetParent = this[0].offsetParent
        while (offsetParent && avalon.css(offsetParent, "position") === "static") {
            offsetParent = offsetParent.offsetParent;
        }
        return avalon(offsetParent || root)
    },
    bind: function (type, fn, phase) {
        if (this[0]) { //此方法不会链
            return avalon.bind(this[0], type, fn, phase)
        }
    },
    unbind: function (type, fn, phase) {
        if (this[0]) {
            avalon.unbind(this[0], type, fn, phase)
        }
        return this
    },
    val: function (value) {
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
    avalon.fn.data = function (name, val) {
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
    return node.window && node.document ? node : node.nodeType === 9 ? node.defaultView : false
}

//=============================css相关==================================
var cssHooks = avalon.cssHooks = createMap()
var prefixes = ["", "-webkit-", "-moz-", "-ms-"] //去掉opera-15的支持
var cssMap = {
    "float": "cssFloat"
}
avalon.cssNumber = oneObject("animationIterationCount,animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom")

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

"top,left".replace(rword, function (name) {
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

"Width,Height".replace(rword, function (name) { //fix 481
    var method = name.toLowerCase(),
        clientProp = "client" + name,
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
    //=============================val相关=======================

function getValType(elem) {
    var ret = elem.tagName.toLowerCase()
    return ret === "input" && /checkbox|radio/.test(elem.type) ? "checked" : ret
}
var valHooks = {
    "select:get": function (node, value) {
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
    "select:set": function (node, values, optionSet) {
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

var keyMap = {}
var keys = ["break,case,catch,continue,debugger,default,delete,do,else,false",
    "finally,for,function,if,in,instanceof,new,null,return,switch,this",
    "throw,true,try,typeof,var,void,while,with", /* 关键字*/
    "abstract,boolean,byte,char,class,const,double,enum,export,extends",
    "final,float,goto,implements,import,int,interface,long,native",
    "package,private,protected,public,short,static,super,synchronized",
    "throws,transient,volatile", /*保留字*/
    "arguments,let,yield,undefined"].join(",")
keys.replace(/\w+/g, function (a) {
    keyMap[a] = true
})
var ridentStart = /[a-z_$]/i
var rwhiteSpace = /[\s\uFEFF\xA0]/
function getIdent(input, lastIndex) {
    var result = []
    var subroutine = !!lastIndex
    lastIndex = lastIndex || 0

    //将表达式中的标识符抽取出来
    var state = "unknown"
    var variable = ""
    for (var i = 0; i < input.length; i++) {
        var c = input.charAt(i)
        if (c === "'" || c === '"') {//字符串开始
            if (state === "unknown") {
                state = c
            } else if (state === c) {//字符串结束
                state = "unknown"
            }
        } else if (c === "\\") {
            if (state === "'" || state === '"') {
                i++
            }
        } else if (ridentStart.test(c)) {//碰到标识符
            if (state === "unknown") {
                state = "variable"
                variable = c
            } else if (state === "maybePath") {
                variable = result.pop()
                variable += "." + c
                state = "variable"
            } else if (state === "variable") {
                variable += c
            }
        } else if (/\w/.test(c)) {
            if (state === "variable") {
                variable += c
            }
        } else if (c === ".") {
            if (state === "variable") {
                if (variable) {
                    result.push(variable)
                    variable = ""
                    state = "maybePath"
                }
            }
        } else if (c === "[") {
            if (state === "variable" || state === "maybePath") {
                if (variable) {//如果前面存在变量,收集它
                    result.push(variable)
                    variable = ""
                }
                var lastLength = result.length
                var last = result[lastLength - 1]
                var innerResult = getIdent(input.slice(i), i)
                if (innerResult.length) {//如果括号中存在变量,那么这里添加通配符
                    result[lastLength - 1] = last + ".*"
                    result = innerResult.concat(result)
                } else { //如果括号中的东西是确定的,直接转换为其子属性
                    var content = input.slice(i + 1, innerResult.i)
                    try {
                        var text = (scpCompile(["return " + content]))()
                        result[lastLength - 1] = last + "." + text
                    } catch (e) {
                    }
                }
                state = "maybePath"//]后面可能还接东西
                i = innerResult.i
            }
        } else if (c === "]") {
            if (subroutine) {
                result.i = i + lastIndex
                addVar(result, variable)
                return result
            }
        } else if (rwhiteSpace.test(c) && c !== "\r" && c !== "\n") {
            if (state === "variable") {
                if (addVar(result, variable)) {
                    state = "maybePath" // aaa . bbb 这样的情况
                }
                variable = ""
            }
        } else {
            addVar(result, variable)
            state = "unknown"
            variable = ""
        }
    }
    addVar(result, variable)
    return result
}
function addVar(array, element) {
    if (element && !keyMap[element]) {
        array.push(element)
        return true
    }
}
function addAssign(vars, vmodel, name, binding) {
    var ret = [],
            prefix = " = " + name + "."
    for (var i = vars.length, prop; prop = vars[--i]; ) {
        var arr = prop.split("."), a
        var first = arr[0]
        while (a = arr.shift()) {
            if (vmodel.hasOwnProperty(a)) {
                ret.push(first + prefix + first)

                binding.observers.push({
                    v: vmodel,
                    p: prop
                })

                vars.splice(i, 1)
            }
        }
    }
    return ret
}
var rproxy = /(\$proxy\$[a-z]+)\d+$/
var variablePool = new Cache(218)
//缓存求值函数，以便多次利用
var evaluatorPool = new Cache(128)

function getVars(expr) {
    expr = expr.trim()
    var ret = variablePool.get(expr)
    if (ret) {
        return ret.concat()
    }
    var array = getIdent(expr)
    var uniq = {}
    var result = []
    for (var i = 0, el; el = array[i++]; ) {
        if (!uniq[el]) {
            uniq[el] = 1
            result.push(el)
        }
    }
    return variablePool.put(expr, result).concat()
}

function parseExpr(expr, vmodels, binding) {
    var filters = binding.filters
    if (typeof filters === "string" && filters.trim() && !binding._filters) {
        binding._filters = parseFilter(filters.trim())
    }

    var vars = getVars(expr)

    var expose = new Date() - 0
    var assigns = []
    var names = []
    var args = []
    binding.observers = []
    for (var i = 0, sn = vmodels.length; i < sn; i++) {
        if (vars.length) {
            var name = "vm" + expose + "_" + i
            names.push(name)
            args.push(vmodels[i])
            assigns.push.apply(assigns, addAssign(vars, vmodels[i], name, binding))
        }
    }
    binding.args = args
    var dataType = binding.type
    var exprId = vmodels.map(function (el) {
        return String(el.$id).replace(rproxy, "$1")
    }) + expr + dataType
    var getter = evaluatorPool.get(exprId) //直接从缓存，免得重复生成
    if (getter) {
        if (dataType === "duplex") {
            var setter = evaluatorPool.get(exprId + "setter")
            binding.setter = setter.apply(setter, binding.args)
        }
        return binding.getter = getter
    }

    if (!assigns.length) {
        assigns.push("fix" + expose)
    }

    if (dataType === "duplex") {
        var nameOne = {}
        assigns.forEach(function (a) {
            var arr = a.split("=")
            nameOne[arr[0].trim()] = arr[1].trim()
        })
        expr = expr.replace(/[\$\w]+/, function (a) {
            return nameOne[a] ? nameOne[a] : a
        })
        /* jshint ignore:start */
        var fn2 = scpCompile(names.concat("'use strict';" +
                "return function(vvv){" + expr + " = vvv\n}\n"))
        /* jshint ignore:end */
        evaluatorPool.put(exprId + "setter", fn2)
        binding.setter = fn2.apply(fn2, binding.args)
    }

    if (dataType === "on") { //事件绑定
        if (expr.indexOf("(") === -1) {
            expr += ".call(this, $event)"
        } else {
            expr = expr.replace("(", ".call(this,")
        }
        names.push("$event")
        expr = "\nreturn " + expr + ";" //IE全家 Function("return ")出错，需要Function("return ;")
        var lastIndex = expr.lastIndexOf("\nreturn")
        var header = expr.slice(0, lastIndex)
        var footer = expr.slice(lastIndex)
        expr = header + "\n" + footer
    } else {
        expr = "\nreturn " + expr + ";" //IE全家 Function("return ")出错，需要Function("return ;")
    }
    /* jshint ignore:start */
    getter = scpCompile(names.concat("'use strict';\nvar " +
            assigns.join(",\n") + expr))
    /* jshint ignore:end */

    return  evaluatorPool.put(exprId, getter)

}
//========

function stringifyExpr(code) {
    var hasExpr = rexpr.test(code) //比如ms-class="width{{w}}"的情况
    if (hasExpr) {
        var array = scanExpr(code)
        if (array.length === 1) {
            return array[0].expr
        }
        return array.map(function (el) {
            return el.type ? "(" + el.expr + ")" : quote(el.expr)
        }).join(" + ")
    } else {
        return code
    }
}
//parseExpr的智能引用代理

function parseExprProxy(code, scopes, data) {
    avalon.log("parseExprProxy方法即将被废弃")
    var fn = data.evaluator = parseExpr(code, scopes, data)
    if (fn) {
        data.handler = bindingExecutors[data.handlerName || data.type]
        avalon.injectBinding(data)
    }
}


var rthimRightParentheses = /\)\s*$/
var rthimOtherParentheses = /\)\s*\|/g
var rquoteFilterName = /\|\s*([$\w]+)/g
var rpatchBracket = /"\s*\["/g
var rthimLeftParentheses = /"\s*\(/g
function parseFilter(filters) {
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
    /* jshint ignore:start */
    return  scpCompile(["return [" + filters + "]"])()
    /* jshint ignore:end */

}
/*********************************************************************
 *                          编译系统                                  *
 **********************************************************************/
var quote = JSON.stringify
/*********************************************************************
 *                           扫描系统                                 *
 **********************************************************************/

avalon.scan = function (elem, vmodel) {
    elem = elem || root
    var vmodels = vmodel ? [].concat(vmodel) : []
    scanTag(elem, vmodels)
}

//http://www.w3.org/TR/html5/syntax.html#void-elements
var stopScan = oneObject("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase())

function checkScan(elem, callback, innerHTML) {
    var id = setTimeout(function () {
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
    if (vmodel.$events) {
        vmodel.$events.expr = elem.tagName + '[avalonctrl="' + id + '"]'
    }
}

var getBindingCallback = function (elem, name, vmodels) {
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
    for (var i = 0, binding; binding = bindings[i++]; ) {
        binding.vmodels = vmodels
        directives[binding.type].init(binding)
      
        avalon.injectBinding(binding)
        if (binding.getter && binding.element.nodeType === 1) { //移除数据绑定，防止被二次解析
            //chrome使用removeAttributeNode移除不存在的特性节点时会报错 https://github.com/RubyLouvre/avalon/issues/99
            binding.element.removeAttribute(binding.name)
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

var events = oneObject("animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit")
var obsoleteAttrs = oneObject("value,title,alt,checked,selected,disabled,readonly,enabled,href,src")
function bindingSorter(a, b) {
    return a.priority - b.priority
}

function scanAttr(elem, vmodels, match) {
    var scanNode = true
    if (vmodels.length) {
        var attributes = elem.attributes
        var bindings = []
        var uniq = {}
        for (var i = 0, attr; attr = attributes[i++]; ) {
            var name = attr.name
            if (uniq[name]) {//IE8下ms-repeat,ms-with BUG
                continue
            }
            uniq[name] = 1
            if (attr.specified) {
                if (match = name.match(rmsAttr)) {
                    //如果是以指定前缀命名的
                    var type = match[1]
                    var param = match[2] || ""
                    var value = attr.value
                    if (events[type]) {
                        param = type
                        type = "on"
                    } else if (obsoleteAttrs[type]) {
                        param = type
                        type = "attr"
                        name = "ms-" + type + "-" + param
                        log("warning!请改用" + name + "代替" + attr.name + "!")
                    }
                    if (directives[type]) {
                        var newValue = value.replace(roneTime, "")
                        var oneTime = value !== newValue
                        var binding = {
                            type: type,
                            param: param,
                            element: elem,
                            name: name,
                            expr: newValue,
                            oneTime: oneTime,
                            priority: (directives[type].priority || type.charCodeAt(0) * 10) + (Number(param.replace(/\D/g, "")) || 0)
                        }
                        if (type === "html" || type === "text") {

                            var filters = getToken(value).filters
                            binding.expr = binding.expr.replace(filters, "")
                            binding.filters = filters.replace(rhasHtml, function () {
                                binding.type = "html"
                                binding.group = 1
                                return ""
                            }).trim() // jshint ignore:line
                        } else if (type === "duplex") {
                            var hasDuplex = name
                        } else if (name === "ms-if-loop") {
                            binding.priority += 100
                        } else if (name === "ms-attr-value") {
                            var hasAttrValue = name
                        }
                        bindings.push(binding)
                    }
                }
            }
        }
        if (bindings.length) {
            bindings.sort(bindingSorter)

            if (hasDuplex && hasAttrValue && elem.type === "text") {
                log("warning!一个控件不能同时定义ms-attr-value与" + hasDuplex)
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
    if (scanNode && !stopScan[elem.tagName]) {
        mergeTextNodes && mergeTextNodes(elem)
        scanNodeList(elem, vmodels) //扫描子孙元素
    }
}

var rnoscanAttrBinding = /^if|widget|repeat$/
var rnoscanNodeBinding = /^each|with|html|include$/

var rnoCollect = /^(ms-\S+|data-\S+|on[a-z]+|id|style|class|tabindex)$/
function getOptionsFromTag(elem) {
    var attributes = elem.attributes
    var ret = {}
    for (var i = 0, attr; attr = attributes[i++]; ) {
        if (attr.specified && !rnoCollect.test(attr.name)) {
            ret[camelize(attr.name)] = parseData(attr.value)
        }
    }
    return ret
}
function scanNodeList(parent, vmodels) {
    var nodes = avalon.slice(parent.childNodes)
    scanNodeArray(nodes, vmodels)
}


function scanNodeArray(nodes, vmodels) {
    for (var i = 0, node; node = nodes[i++]; ) {
        switch (node.nodeType) {
            case 1:
                var elem = node, fn

                scanTag(node, vmodels) //扫描元素节点

                if (!elem.msResolved && elem.parentNode && elem.parentNode.nodeType === 1) {
                    var library = isWidget(elem)
                    if (library) {
                        var widget = elem.localName ? elem.localName.replace(library + ":", "") : elem.nodeName
                        var fullName = library + ":" + camelize(widget)
                        componentQueue.push({
                            library: library,
                            element: elem,
                            fullName: fullName,
                            widget: widget,
                            vmodels: vmodels,
                            name: "widget"
                        })
                        if (avalon.components[fullName]) {
                            avalon.component(fullName)
                        }
                    }
                }
                if (node.msHasEvent) {
                    avalon.fireDom(node, "datasetchanged", {
                        bubble: node.msHasEvent
                    })
                }

                break
            case 3:
                if (rexpr.test(node.nodeValue)) {
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
            return Array(_.length + 1).join("1") // jshint ignore:line
        })
        var index = scapegoat.replace(r11a, "\u1122\u3344").indexOf("|") //干掉所有短路或
        if (index > -1) {
            return {
                type: "text",
                filters: value.slice(index).trim(),
                expr: value.slice(0, index)
            }
        }
    }
    return {
        type: "text",
        expr: value,
        filters: ""
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
                expr: value
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
            expr: value
        })
    }
    return tokens
}

function scanText(textNode, vmodels, index) {
    var bindings = []
    tokens = scanExpr(textNode.data)
    if (tokens.length) {
        for (var i = 0; token = tokens[i++];) {
            var node = DOC.createTextNode(token.expr) //将文本转换为文本节点，并替换原来的文本节点
            if (token.type) {
                token.expr = token.expr.replace(roneTime, function () {
                        token.oneTime = true
                        return ""
                    }) // jshint ignore:line
                token.element = node
                token.filters = token.filters.replace(rhasHtml, function () {
                        token.type = "html"
                        return ""
                    }) // jshint ignore:line
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



//使用来自游戏界的双缓冲技术,减少对视图的冗余刷新
var Buffer = function () {
    this.queue = []
}
Buffer.prototype = {
    render: function (isAnimate) {
        if (!this.locked) {
            this.locked = isAnimate ? root.offsetHeight + 10 : 1
            var me = this
            avalon.nextTick(function () {
                me.flush()
            })
        }
    },
    flush: function () {
        for (var i = 0, sub; sub = this.queue[i++]; ) {
            sub.update()
        }
        this.locked = 0
        this.queue = []
    }
}

var buffer = new Buffer()
var componentQueue = []
var widgetList = []
var componentHooks = {
    $construct: function () {
        return avalon.mix.apply(null, arguments)
    },
    $ready: noop,
    $init: noop,
    $dispose: noop,
    $container: null,
    $childReady: noop,
    $replace: false,
    $extend: null,
    $$template: function (str) {
        return str
    }
}


avalon.components = {}
avalon.component = function (name, opts) {
    if (opts) {
        avalon.components[name] = avalon.mix({}, componentHooks, opts)
    }
    for (var i = 0, obj; obj = componentQueue[i]; i++) {
        if (name === obj.fullName) {
            componentQueue.splice(i, 1)
            i--;

            (function (host, hooks, elem, widget) {

                var dependencies = 1
                var library = host.library
                var global = avalon.libraries[library] || componentHooks

                //===========收集各种配置=======

                var elemOpts = getOptionsFromTag(elem)
                var vmOpts = getOptionsFromVM(host.vmodels, elemOpts.config || host.fullName)
                var $id = elemOpts.$id || elemOpts.identifier || generateID(widget)
                delete elemOpts.config
                delete elemOpts.$id
                delete elemOpts.identifier
                var componentDefinition = {}

                var parentHooks = avalon.components[hooks.$extend]
                if (parentHooks) {
                    avalon.mix(true, componentDefinition, parentHooks)
                    componentDefinition = parentHooks.$construct.call(elem, componentDefinition, {}, {})
                } else {
                    avalon.mix(true, componentDefinition, hooks)
                }
                componentDefinition = avalon.components[name].$construct.call(elem, componentDefinition, vmOpts, elemOpts)

                componentDefinition.$refs = {}
                componentDefinition.$id = $id

                //==========构建VM=========
                var keepSolt = componentDefinition.$slot
                var keepReplace = componentDefinition.$replace
                var keepContainer = componentDefinition.$container
                var keepTemplate = componentDefinition.$template
                delete componentDefinition.$slot
                delete componentDefinition.$replace
                delete componentDefinition.$container
                delete componentDefinition.$template
                delete componentDefinition.$construct

                var vmodel = avalon.define(componentDefinition) || {}
                elem.msResolved = 1
                vmodel.$init(vmodel, elem)
                global.$init(vmodel, elem)
                var nodes = elem.childNodes
                //收集插入点
                var slots = {}, snode

                for (var s = 0, el; el = nodes[s++]; ) {
                    var type = el.nodeType === 1 && el.getAttribute("slot") || keepSolt
                    if (type) {
                        if (slots[type]) {
                            slots[type].push(el)
                        } else {
                            slots[type] = [el]
                        }
                    }
                }


                if (vmodel.$$template) {
                    avalon.clearHTML(elem)
                    elem.innerHTML = vmodel.$$template(keepTemplate)
                }
                for (s in slots) {
                    if (vmodel.hasOwnProperty(s)) {
                        var ss = slots[s]
                        if (ss.length) {
                            var fragment = avalonFragment.cloneNode(true)
                            for (var ns = 0; snode = ss[ns++]; ) {
                                fragment.appendChild(snode)
                            }
                            vmodel[s] = fragment
                        }
                        slots[s] = null
                    }
                }
                slots = null
                var child = elem.firstChild
                if (keepReplace) {
                    child = elem.firstChild
                    elem.parentNode.replaceChild(child, elem)
                    child.msResolved = 1
                    elem = host.element = child
                }
                if (keepContainer) {
                    keepContainer.appendChild(elem)
                }
                avalon.fireDom(elem, "datasetchanged",
                        {library: library, vm: vmodel, childReady: 1})
                var children = 0
                var removeFn = avalon.bind(elem, "datasetchanged", function (e) {
                    if (e.childReady && e.library === library) {
                        dependencies += e.childReady
                        if (vmodel !== e.vm) {
                            vmodel.$refs[e.vm.$id] = e.vm
                            if (e.childReady === -1) {
                                children++
                                vmodel.$childReady(vmodel, elem, e)
                            }
                            e.stopPropagation()
                        }
                    }

                    if (dependencies === 0) {
                        var id1 = setTimeout(function () {
                            clearTimeout(id1)
                            vmodel.$ready(vmodel, elem)
                            global.$ready(vmodel, elem)
                        }, children ? Math.max(children * 17, 100) : 17)
                        avalon.unbind(elem, "datasetchanged", removeFn)
                        //==================
                        host.rollback = function () {
                            try {
                                vmodel.$dispose(vmodel, elem)
                                global.$dispose(vmodel, elem)
                            } catch (e) {
                            }
                            delete avalon.vmodels[vmodel.$id]
                        }
                        injectDisposeQueue(host, widgetList)
                        if (window.chrome) {
                            elem.addEventListener("DOMNodeRemovedFromDocument", function () {
                                setTimeout(rejectDisposeQueue)
                            })
                        }

                    }
                })

                scanTag(elem, [vmodel].concat(host.vmodels))
                avalon.vmodels[vmodel.$id] = vmodel
                if (!elem.childNodes.length) {
                    avalon.fireDom(elem, "datasetchanged", {library: library, vm: vmodel, childReady: -1})
                } else {
                    var id2 = setTimeout(function () {
                        clearTimeout(id2)
                        avalon.fireDom(elem, "datasetchanged", {library: library, vm: vmodel, childReady: -1})
                    }, 17)
                }


            })(obj, avalon.components[name], obj.element, obj.widget)// jshint ignore:line


        }
    }
}

avalon.fireDom = function (elem, type, opts) {
    if (DOC.createEvent) {
        var hackEvent = DOC.createEvent("Events");
        hackEvent.initEvent(type, true, true, opts)
        avalon.mix(hackEvent, opts)

        elem.dispatchEvent(hackEvent)
    } else if (root.contains(elem)) {//IE6-8触发事件必须保证在DOM树中,否则报"SCRIPT16389: 未指明的错误"
        hackEvent = DOC.createEventObject()
        avalon.mix(hackEvent, opts)
        elem.fireEvent("on" + type, hackEvent)
    }
}


function getOptionsFromVM(vmodels, pre) {
    if (pre) {
        for (var i = 0, v; v = vmodels[i++]; ) {
            if (v.hasOwnProperty(pre) && typeof v[pre] === "object") {
                var vmOptions = v[pre]
                return vmOptions.$model || vmOptions
                break
            }
        }
    }
    return {}
}



avalon.libraries = []
avalon.library = function (name, opts) {
    if (DOC.namespaces) {
        DOC.namespaces.add(name, 'http://www.w3.org/1999/xhtml');
    }
    avalon.libraries[name] = avalon.mix({
        $init: noop,
        $ready: noop,
        $dispose: noop
    }, opts || {})
}

avalon.library("ms")
/*
broswer  nodeName  scopeName  localName
IE9     ONI:BUTTON oni        button
IE10    ONI:BUTTON undefined  oni:button
IE8     button     oni        undefined
chrome  ONI:BUTTON undefined  oni:button

*/
function isWidget(el) { //如果为自定义标签,返回UI库的名字
    if(el.scopeName && el.scopeName !== "HTML" ){
        return el.scopeName
    }
    var fullName = el.nodeName.toLowerCase() 
    var index = fullName.indexOf(":")
    if (index > 0) {
        return fullName.slice(0, index)
    }
}
//各种MVVM框架在大型表格下的性能测试
// https://github.com/RubyLouvre/avalon/issues/859


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


var attrDir = avalon.directive("attr", {
    init: function (binding) {
        //{{aaa}} --> aaa
        //{{aaa}}/bbb.html --> (aaa) + "/bbb.html"
        binding.expr = stringifyExpr(binding.expr.trim())
        if (binding.type === "include") {
            var elem = binding.element
            effectBinding(elem, binding)
            binding.includeRendered = getBindingCallback(elem, "data-include-rendered", binding.vmodels)
            binding.includeLoaded = getBindingCallback(elem, "data-include-loaded", binding.vmodels)
            var outer = binding.includeReplace = !!avalon(elem).data("includeReplace")
            if (avalon(elem).data("includeCache")) {
                binding.templateCache = {}
            }
            binding.start = DOC.createComment("ms-include")
            binding.end = DOC.createComment("ms-include-end")
            if (outer) {
                binding.element = binding.end
                binding._element = elem
                elem.parentNode.insertBefore(binding.end, elem)
                elem.parentNode.insertBefore(binding.start, binding.end)
            } else {
                elem.insertBefore(binding.start, elem.firstChild)
                elem.appendChild(binding.end)
            }
        }
    },
    update: function (val) {
        var elem = this.element
        var attrName = this.param
        if (attrName === "href" || attrName === "src") {
            if (typeof val === "string" && !root.hasAttribute) {
                val = val.replace(/&amp;/g, "&") //处理IE67自动转义的问题
            }
            elem[attrName] = val
            if (window.chrome && elem.tagName === "EMBED") {
                var parent = elem.parentNode //#525  chrome1-37下embed标签动态设置src不能发生请求
                var comment = document.createComment("ms-src")
                parent.replaceChild(comment, elem)
                parent.replaceChild(elem, comment)
            }
        } else {

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
        }
    }
})



//这几个指令都可以使用插值表达式，如ms-src="aaa/{{b}}/{{c}}.html"
"title,alt,src,value,css,include,href".replace(rword, function (name) {
    directives[name] = attrDir
})

//根据VM的属性值或表达式的值切换类名，ms-class="xxx yyy zzz:flag"
//http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
avalon.directive("class", {
    init: function (binding) {
        var oldStyle = binding.param
        var method = binding.type
        if (!oldStyle || isFinite(oldStyle)) {
            binding.param = "" //去掉数字
            directives.effect.init(binding)
        } else {
            log('ms-' + method + '-xxx="yyy"这种用法已经过时,请使用ms-' + method + '="xxx:yyy"')
            binding.expr = '[' + quote(oldStyle) + "," + binding.expr + "]"
            binding.oldStyle = oldStyle
        }
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

    },
    update: function (arr) {
        var binding = this
        var $elem = avalon(this.element)
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
})

"hover,active".replace(rword, function (name) {
    directives[name] = directives["class"]
})


//ms-controller绑定已经在scanTag 方法中实现
avalon.directive("css", {
    init: directives.attr.init,
    update: function (val) {
        avalon(this.element).css(this.param, val)
    }
})

avalon.directive("data", {
    priority: 100,
    update: function (val) {
        var elem = this.element
        var key = "data-" + this.param
        if (val && typeof val === "object") {
            elem[key] = val
        } else {
            elem.setAttribute(key, String(val))
        }
    }
})

//双工绑定
var rduplexType = /^(?:checkbox|radio)$/
var rduplexParam = /^(?:radio|checked)$/
var duplexBinding = avalon.directive("duplex", {
    priority: 2000,
    init: function (binding, hasCast) {
        var elem = binding.element
        var vmodels = binding.vmodels
        binding.changed = getBindingCallback(elem, "data-duplex-changed", vmodels) || noop
        var params = []
        var casting = oneObject("string,number,boolean,checked")
        if (elem.type === "radio" && binding.param === "") {
            binding.param = "checked"
        }
        
        
        binding.param.replace(rw20g, function (name) {
            if (rduplexType.test(elem.type) && rduplexParam.test(name)) {
                if (name === "radio")
                    log("ms-duplex-radio已经更名为ms-duplex-checked")
                name = "checked"
                binding.isChecked = true
                binding.xtype = "radio"
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
        binding.param = params.join("-")
        binding.changed = getBindingCallback(elem, "binding-duplex-changed", vmodels) || noop
        if (!binding.xtype) {
            binding.xtype = elem.tagName === "SELECT" ? "select" :
                    elem.type === "checkbox" ? "checkbox" :
                    elem.type === "radio" ? "radio" :
                    /^change/.test(elem.getAttribute("data-duplex-event")) ? "change" :
                    "input"
        }
        //===================绑定事件======================
        binding.bound = function (type, callback) {
            elem.addEventListener(type, callback, false)
            var old = binding.rollback
            binding.rollback = function () {
                elem.avalonSetter = null
                avalon.unbind(elem, type, callback)
                old && old()
            }
        }
        var composing = false
        function callback(value) {
            binding.changed.call(this, value, binding)
        }
        function compositionStart() {
            composing = true
        }
        function compositionEnd() {
            composing = false
        }
        var updateVModel = function () {
            var val = elem.value //防止递归调用形成死循环
            if (composing || val === binding.oldValue) //处理中文输入法在minlengh下引发的BUG
                return
            var lastValue = binding.pipe(val, binding, "get")
            binding.setter(lastValue)
            callback.call(elem, lastValue)
        }
        switch (binding.xtype) {
            case "radio":
                binding.bound("click", function () {
                    var lastValue = binding.pipe(elem.value, binding, "get")
                    binding.setter(lastValue)
                    callback.call(elem, lastValue)
                })
                break
            case "checkbox":
                binding.bound("change", function () {
                    var method = elem.checked ? "ensure" : "remove"
                    var array = binding.getter.apply(0, binding.vmodels)
                    if (!Array.isArray(array)) {
                        log("ms-duplex应用于checkbox上要对应一个数组")
                        array = [array]
                    }
                    var val = binding.pipe(elem.value, binding, "get")
                    avalon.Array[method](array, val)
                    callback.call(elem, array)
                })
                break
            case "change":
                binding.bound("change", updateVModel)
                break
            case "input":
                if (!IEVersion) { // W3C
                    binding.bound("input", updateVModel)
                    //非IE浏览器才用这个
                    binding.bound("compositionstart", compositionStart)
                    binding.bound("compositionend", compositionEnd)
                    binding.bound("DOMAutoComplete", updateVModel)
                } else { //onpropertychange事件无法区分是程序触发还是用户触发
                    // IE下通过selectionchange事件监听IE9+点击input右边的X的清空行为，及粘贴，剪切，删除行为
                    binding.bound("input", updateVModel) //IE9使用propertychange无法监听中文输入改动
                    //http://www.cnblogs.com/rubylouvre/archive/2013/02/17/2914604.html
                    //http://www.matts411.com/post/internet-explorer-9-oninput/
                }

                break
            case "select":
                binding.bound("change", function () {
                    var val = avalon(elem).val() //字符串或字符串数组
                    if (Array.isArray(val)) {
                        val = val.map(function (v) {
                            return binding.pipe(v, binding, "get")
                        })
                    } else {
                        val = binding.pipe(val, binding, "get")
                    }
                    if (val + "" !== binding.oldValue) {
                        binding.setter(val)
                        callback.call(elem, val)
                    }
                })
                break
        }
        if (binding.xtype === "input" && /^(text|password|hidden)/.test(elem.type)) {
            watchValueInTimer(function () {
                if (root.contains(elem)) {
                    if (binding.oldValue !== elem.value) {
                        updateVModel()
                    }
                } else if (!elem.msRetain) {
                    return false
                }
            })
        }

        elem.avalonSetter = updateVModel //#765
        for (var i in avalon.vmodels) {
            var v = avalon.vmodels[i]
            v.$fire("avalon-ms-duplex-init", binding)
        }
        var cpipe = binding.pipe || (binding.pipe = pipe)
        cpipe(null, binding, "init")
    },
    update: function (value) {
        var elem = this.element, binding = this, curValue
        switch (this.xtype) {
            case "input":
            case "change":
                curValue = this.pipe(value, this, "set")  //fix #673
                if (curValue !== this.oldValue) {
                    elem.value = this.oldValue = curValue
                }
                break
            case "radio":
                curValue = binding.isChecked ? !!value : value + "" === elem.value
                elem.checked = curValue
                break
            case "checkbox":
                var array = [].concat(value) //强制转换为数组
                curValue = this.pipe(elem.value, this, "get")
                elem.checked = array.indexOf(curValue) > -1
                break
            case "select":
                //必须变成字符串后才能比较
                binding._value = value
                elem.msHasEvent = "selectDuplex"
                //必须等到其孩子准备好才触发
                avalon.bind(elem, "datasetchanged", function (e) {
                    if (e.bubble === "selectDuplex") {
                        var value = binding._value
                        var curValue = Array.isArray(value) ? value.map(String) : value + ""
                        avalon(elem).val(curValue)
                        elem.oldValue = curValue + ""
                        binding.changed.call(elem, curValue)
                    }
                })
                break
        }
        if (binding.xtype !== "select") {
            binding.changed.call(elem, curValue)
        }
    }
})


function fixNull(val) {
    return val == null ? "" : val
}
avalon.duplexHooks = {
    checked: {
        get: function (val, binding) {
            return !binding.element.oldValue
        }
    },
    string: {
        get: function (val) { //同步到VM
            return val
        },
        set: fixNull
    },
    "boolean": {
        get: function (val) {
            return val === "true"
        },
        set: fixNull
    },
    number: {
        get: function (val, binding) {
            var number = parseFloat(val)
            if (-val === -number) {
                return number
            }
            var arr = /strong|medium|weak/.exec(binding.element.getAttribute("data-duplex-number")) || ["medium"]
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

function pipe(val, binding, action, e) {
    binding.param.replace(rw20g, function (name) {
        var hook = avalon.duplexHooks[name]
        if (hook && typeof hook[action] === "function") {
            val = hook[action](val, binding)
        }
    })
    return val
}

var TimerID, ribbon = []

avalon.tick = function (fn) {
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
new function () { // jshint ignore:line
    try { //#272 IE9-IE11, firefox
        var setters = {}
        var aproto = HTMLInputElement.prototype
        var bproto = HTMLTextAreaElement.prototype
        function newSetter(value) { // jshint ignore:line
            setters[this.tagName].call(this, value)
            if ((typeof this.avalonSetter === "function") && this.oldValue !== value) {
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

avalon.directive("effect", {
    priority: 5,
    init: function (binding) {
        var text = binding.expr,
                className,
                rightExpr
        var colonIndex = text.replace(rexprg, function (a) {
            return a.replace(/./g, "0")
        }).indexOf(":") //取得第一个冒号的位置
        if (colonIndex === -1) { // 比如 ms-class/effect="aaa bbb ccc" 的情况
            className = text
            rightExpr = true
        } else { // 比如 ms-class/effect-1="ui-state-active:checked" 的情况
            className = text.slice(0, colonIndex)
            rightExpr = text.slice(colonIndex + 1)
        }
        if (!rexpr.test(text)) {
            className = quote(className)
        } else {
            className = stringifyExpr(className)
        }
        binding.expr = "[" + className + "," + rightExpr + "]"
    },
    update: function (arr) {
        var name = arr[0]
        var elem = this.element
        if (elem.getAttribute("data-effect-name") === name) {
            return
        } else {
            elem.removeAttribute("data-effect-driver")
        }
        var inlineStyles = elem.style
        var computedStyles = window.getComputedStyle ? window.getComputedStyle(elem) : null
        var useAni = false
        if (computedStyles && (supportTransition || supportAnimation)) {

            //如果支持CSS动画
            var duration = inlineStyles[transitionDuration] || computedStyles[transitionDuration]
            if (duration && duration !== '0s') {
                elem.setAttribute("data-effect-driver", "t")
                useAni = true
            }

            if (!useAni) {

                duration = inlineStyles[animationDuration] || computedStyles[animationDuration]
                if (duration && duration !== '0s') {
                    elem.setAttribute("data-effect-driver", "a")
                    useAni = true
                }

            }
        }

        if (!useAni) {
            if (avalon.effects[name]) {
                elem.setAttribute("data-effect-driver", "j")
                useAni = true
            }
        }
        if (useAni) {
            elem.setAttribute("data-effect-name", name)
        }
    }
})

avalon.effects = {}
avalon.effect = function (name, callbacks) {
    avalon.effects[name] = callbacks
}



var supportTransition = false
var supportAnimation = false

var transitionEndEvent
var animationEndEvent
var transitionDuration = avalon.cssName("transition-duration")
var animationDuration = avalon.cssName("animation-duration")
new function () {// jshint ignore:line
    var checker = {
        'TransitionEvent': 'transitionend',
        'WebKitTransitionEvent': 'webkitTransitionEnd',
        'OTransitionEvent': 'oTransitionEnd',
        'otransitionEvent': 'otransitionEnd'
    }
    var tran
    //有的浏览器同时支持私有实现与标准写法，比如webkit支持前两种，Opera支持1、3、4
    for (var name in checker) {
        if (window[name]) {
            tran = checker[name]
            break;
        }
        try {
            var a = document.createEvent(name);
            tran = checker[name]
            break;
        } catch (e) {
        }
    }
    if (typeof tran === "string") {
        supportTransition = true
        transitionEndEvent = tran
    }

    //大致上有两种选择
    //IE10+, Firefox 16+ & Opera 12.1+: animationend
    //Chrome/Safari: webkitAnimationEnd
    //http://blogs.msdn.com/b/davrous/archive/2011/12/06/introduction-to-css3-animat ions.aspx
    //IE10也可以使用MSAnimationEnd监听，但是回调里的事件 type依然为animationend
    //  el.addEventListener("MSAnimationEnd", function(e) {
    //     alert(e.type)// animationend！！！
    // })
    checker = {
        'AnimationEvent': 'animationend',
        'WebKitAnimationEvent': 'webkitAnimationEnd'
    }
    var ani;
    for (name in checker) {
        if (window[name]) {
            ani = checker[name];
            break;
        }
    }
    if (typeof ani === "string") {
        supportTransition = true
        animationEndEvent = ani
    }

}()

var effectPool = []//重复利用动画实例
function effectFactory(el, opts) {
    if (!el || el.nodeType !== 1) {
        return null
    }
    if (opts) {
        var name = opts.effectName
        var driver = opts.effectDriver
    } else {
        name = el.getAttribute("data-effect-name")
        driver = el.getAttribute("data-effect-driver")
    }
    if (!name || !driver) {
        return null
    }

    var instance = effectPool.pop() || new Effect()
    instance.el = el
    instance.driver = driver
    instance.useCss = driver !== "j"
    if (instance.useCss) {
        opts && avalon(el).addClass(opts.effectClass)
        instance.cssEvent = driver === "t" ? transitionEndEvent : animationEndEvent
    }
    instance.name = name
    instance.callbacks = avalon.effects[name] || {}

    return instance


}

function effectBinding(elem, binding) {
    var name = elem.getAttribute("data-effect-name")
    if (name) {
        binding.effectName = name
        binding.effectDriver = elem.getAttribute("data-effect-driver")
        var stagger = +elem.getAttribute("data-effect-stagger")
        binding.effectLeaveStagger = +elem.getAttribute("data-effect-leave-stagger") || stagger
        binding.effectEnterStagger = +elem.getAttribute("data-effect-enter-stagger") || stagger
        binding.effectClass = elem.className || NaN
    }
}
function upperFirstChar(str) {
    return str.replace(/^[\S]/g, function (m) {
        return m.toUpperCase()
    })
}
var effectBuffer = new Buffer()
function Effect() {
}// 动画实例,做成类的形式,是为了共用所有原型方法

Effect.prototype = {
    contrustor: Effect,
    enterClass: function () {
        return getEffectClass(this, "enter")
    },
    leaveClass: function () {
        return getEffectClass(this, "leave")
    },
    // 共享一个函数
    actionFun: function (name, before, after) {
        if (document.hidden) {
            return
        }
        var me = this
        var el = me.el
        var isLeave = name === "leave"
        name = isLeave ? "leave" : "enter"
        var oppositeName = isLeave ? "enter" : "leave"
        callEffectHook(me, "abort" + upperFirstChar(oppositeName))
        callEffectHook(me, "before" + upperFirstChar(name))
        if (!isLeave)
            before(el) //  这里可能做插入DOM树的操作,因此必须在修改类名前执行
        var cssCallback = function (cancel) {
            el.removeEventListener(me.cssEvent, me.cssCallback)
            if (isLeave) {
                before(el) //这里可能做移出DOM树操作,因此必须位于动画之后
                avalon(el).removeClass(me.cssClass)
            } else {
                if (me.driver === "a") {
                    avalon(el).removeClass(me.cssClass)
                }
            }
            if (cancel !== true) {
                callEffectHook(me, "after" + upperFirstChar(name))
                after && after(el)
            }
            me.dispose()
        }
        if (me.useCss) {
            if (me.cssCallback) { //如果leave动画还没有完成,立即完成
                me.cssCallback(true)
            }

            me.cssClass = getEffectClass(me, name)
            me.cssCallback = cssCallback

            me.update = function () {
                el.addEventListener(me.cssEvent, me.cssCallback)
                if (!isLeave && me.driver === "t") {//transtion延迟触发
                    avalon(el).removeClass(me.cssClass)
                }
            }
            avalon(el).addClass(me.cssClass)//animation会立即触发

            effectBuffer.render(true)
            effectBuffer.queue.push(me)

        } else {
            callEffectHook(me, name, cssCallback)

        }
    },
    enter: function (before, after) {
        this.actionFun.apply(this, ["enter"].concat(avalon.slice(arguments)))

    },
    leave: function (before, after) {
        this.actionFun.apply(this, ["leave"].concat(avalon.slice(arguments)))

    },
    dispose: function () {//销毁与回收到池子中
        this.update = this.cssCallback = null
        if (effectPool.unshift(this) > 100) {
            effectPool.pop()
        }
    }


}


function getEffectClass(instance, type) {
    var a = instance.callbacks[type + "Class"]
    if (typeof a === "string")
        return a
    if (typeof a === "function")
        return a()
    return instance.name + "-" + type
}


function callEffectHook(effect, name, cb) {
    var hook = effect.callbacks[name]
    if (hook) {
        hook.call(effect, effect.el, cb)
    }
}

var applyEffect = function (el, dir/*[before, [after, [opts]]]*/) {
    var args = aslice.call(arguments, 0)
    if (typeof args[2] !== "function") {
        args.splice(2, 0, noop)
    }
    if (typeof args[3] !== "function") {
        args.splice(3, 0, noop)
    }
    var before = args[2]
    var after = args[3]
    var opts = args[4]
    var effect = effectFactory(el, opts)
    if (!effect) {
        before()
        after()
        return false
    } else {
        var method = dir ? 'enter' : 'leave'
        effect[method](before, after)
    }
}

avalon.mix(avalon.effect, {
    apply: applyEffect,
    append: function (el, parent, after, opts) {
        return applyEffect(el, 1, function () {
            parent.appendChild(el)
        }, after, opts)
    },
    before: function (el, target, after, opts) {
        return applyEffect(el, 1, function () {
            target.parentNode.insertBefore(el, target)
        }, after, opts)
    },
    remove: function (el, parent, after, opts) {
        return applyEffect(el, 0, function () {
            if (el.parentNode === parent)
                parent.removeChild(el)
        }, after, opts)
    }
})


avalon.directive("html", {
    update: function (val) {
        var binding = this
        var elem = this.element
        var isHtmlFilter = elem.nodeType !== 1
        var parent = isHtmlFilter ? elem.parentNode : elem
        if (!parent)
            return
        val = val == null ? "" : val

        if (elem.nodeType === 3) {
            var signature = generateID("html")
            parent.insertBefore(DOC.createComment(signature), elem)
            binding.element = DOC.createComment(signature + ":end")
            parent.replaceChild(binding.element, elem)
            elem = binding.element
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
        scanNodeArray(nodes, binding.vmodels)
    }
})

avalon.directive("if", {
    priority: 10,
    update: function (val) {
        var binding = this
        var elem = this.element
        var stamp = binding.stamp = +new Date()
        var par
        var after = function () {
            if (stamp !== binding.stamp)
                return
            binding.recoverNode = null
        }
        if (binding.recoverNode)
            binding.recoverNode() // 还原现场，有移动节点的都需要还原现场
        try {
            if (!elem.parentNode)
                return
            par = elem.parentNode
        } catch (e) {
            return
        }
        if (val) { //插回DOM树
            function alway() {// jshint ignore:line
                if (elem.getAttribute(binding.name)) {
                    elem.removeAttribute(binding.name)
                    scanAttr(elem, binding.vmodels)
                }
                binding.rollback = null
            }
            if (elem.nodeType === 8) {
                var keep = binding.keep
                var hasEffect = avalon.effect.apply(keep, 1, function () {
                    if (stamp !== binding.stamp)
                        return
                    elem.parentNode.replaceChild(keep, elem)
                    elem = binding.element = keep //这时可能为null
                    if (keep.getAttribute("_required")) {//#1044
                        elem.required = true
                        elem.removeAttribute("_required")
                    }
                    if (elem.querySelectorAll) {
                        avalon.each(elem.querySelectorAll("[_required=true]"), function (el) {
                            el.required = true
                            el.removeAttribute("_required")
                        })
                    }
                    alway()
                }, after)
                hasEffect = hasEffect === false
            }
            if (!hasEffect)
                alway()
        } else { //移出DOM树，并用注释节点占据原位置
            if (elem.nodeType === 1) {
                if (elem.required === true) {
                    elem.required = false
                    elem.setAttribute("_required", "true")
                }
                try {// 如果不支持querySelectorAll或:required,可以直接无视
                    avalon.each(elem.querySelectorAll(":required"), function (el) {
                        elem.required = false
                        el.setAttribute("_required", "true")
                    })
                } catch (e) {
                }

                var node = binding.element = DOC.createComment("ms-if"),
                        pos = elem.nextSibling
                binding.recoverNode = function () {
                    binding.recoverNode = null
                    if (node.parentNode !== par) {
                        par.insertBefore(node, pos)
                        binding.keep = elem
                    }
                }

                avalon.effect.apply(elem, 0, function () {
                    binding.recoverNode = null
                    if (stamp !== binding.stamp)
                        return
                    elem.parentNode.replaceChild(node, elem)
                    binding.keep = elem //元素节点
                    ifGroup.appendChild(elem)
                    binding.rollback = function () {
                        if (elem.parentNode === ifGroup) {
                            ifGroup.removeChild(elem)
                        }
                    }
                }, after)
            }
        }
    }
})



//ms-important绑定已经在scanTag 方法中实现
var rnoscripts = /<noscript.*?>(?:[\s\S]+?)<\/noscript>/img
var rnoscriptText = /<noscript.*?>([\s\S]+?)<\/noscript>/im

var getXHR = function () {
    return new window.XMLHttpRequest() // jshint ignore:line
}
//将所有远程加载的模板,以字符串形式存放到这里
var templatePool = avalon.templateCache = {}

function getTemplateContainer(binding, id, text) {
    var div = binding.templateCache && binding.templateCache[id]
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
function nodesToFrag(nodes) {
    var frag = DOC.createDocumentFragment()
    for (var i = 0, len = nodes.length; i < len; i++) {
        frag.appendChild(nodes[i])
    }
    return frag
}
avalon.directive("include", {
    init: directives.attr.init,
    update: function (val) {
        var binding = this
        var elem = this.element
        var vmodels = binding.vmodels
        var rendered = binding.includeRendered
        var effectClass = binding.effectName && binding.effectClass // 是否开启动画
        var templateCache = binding.templateCache // 是否data-include-cache
        var outer = binding.includeReplace // 是否data-include-replace
        var loaded = binding.includeLoaded
        var target = outer ? elem.parentNode : elem
        var _ele = binding._element // data-include-replace binding.element === binding.end

        binding.recoverNodes = binding.recoverNodes || avalon.noop

        var tpl = outer && _ele.cloneNode()
        var scanTemplate = function (text) {
            var _stamp = binding._stamp = +(new Date()) // 过滤掉频繁操作
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
            var lastID = binding.includeLastID || "_default" // 默认

            binding.includeLastID = val
            var leaveEl = templateCache && templateCache[lastID] || DOC.createElement(elem.tagName || binding._element.tagName) // 创建一个离场元素

            if (effectClass) {
                leaveEl.className = effectClass
                target.insertBefore(leaveEl, binding.start) // 插入到start之前，防止被错误的移动
            }

            // cache or animate，移动节点
            (templateCache || {})[lastID] = leaveEl
            var fragOnDom = binding.recoverNodes() // 恢复动画中的节点
            if (fragOnDom) {
                target.insertBefore(fragOnDom, binding.end)
            }
            while (true) {
                var node = binding.start.nextSibling
                if (node && node !== leaveEl && node !== binding.end) {
                    leaveEl.appendChild(node)
                } else {
                    break
                }
            }

            // 元素退场
            avalon.effect.remove(leaveEl, target, function () {
                if (templateCache) { // write cache
                    if (_stamp === binding._stamp)
                        ifGroup.appendChild(leaveEl)
                }
            }, binding)


            var enterEl = target,
                    before = avalon.noop,
                    after = avalon.noop

            var fragment = getTemplateContainer(binding, val, text)
            var nodes = avalon.slice(fragment.childNodes)

            if (outer && effectClass) {
                enterEl = _ele
                enterEl.innerHTML = "" // 清空
                enterEl.setAttribute("ms-skip", "true")
                target.insertBefore(enterEl, binding.end.nextSibling) // 插入到bingding.end之后避免被错误的移动
                before = function () {
                    enterEl.insertBefore(fragment, null) // 插入节点
                }
                after = function () {
                    binding.recoverNodes = avalon.noop
                    if (_stamp === binding._stamp) {
                        fragment = nodesToFrag(nodes)
                        target.insertBefore(fragment, binding.end) // 插入真实element
                        scanNodeArray(nodes, vmodels)
                    }
                    if (enterEl.parentNode === target)
                        target.removeChild(enterEl) // 移除入场动画元素
                }
                binding.recoverNodes = function () {
                    binding.recoverNodes = avalon.noop
                    return nodesToFrag(nodes)
                }
            } else {
                before = function () {// 新添加元素的动画 
                    target.insertBefore(fragment, binding.end)
                    scanNodeArray(nodes, vmodels)
                }
            }

            avalon.effect.apply(enterEl, "enter", before, after)


        }


        if (binding.param === "src") {
            if (typeof templatePool[val] === "string") {
                avalon.nextTick(function () {
                    scanTemplate(templatePool[val])
                })
            } else if (Array.isArray(templatePool[val])) { //#805 防止在循环绑定中发出许多相同的请求
                templatePool[val].push(scanTemplate)
            } else {
                var xhr = getXHR()
                xhr.onload = function () {
                    var text = xhr.responseText
                    for (var f = 0, fn; fn = templatePool[val][f++]; ) {
                        fn(text)
                    }
                    templatePool[val] = text
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
                avalon.nextTick(function () {
                    scanTemplate(el.value || el.innerText || el.innerHTML)
                })
            }
        }
    }
})

var rdash = /\(([^)]*)\)/
var onDir = avalon.directive("on", {
    priority: 3000,
    init: function (binding) {
        var value = binding.expr
        binding.type = "on"
        var eventType = binding.param.replace(/-\d+$/, "") // ms-on-mousemove-10
        if (typeof onDir[eventType + "Hook"] === "function") {
            onDir[eventType + "Hook"](binding)
        }
        if (value.indexOf("(") > 0 && value.indexOf(")") > -1) {
            var matched = (value.match(rdash) || ["", ""])[1].trim()
            if (matched === "" || matched === "$event") { // aaa() aaa($event)当成aaa处理
                value = value.replace(rdash, "")
            }
        }
        binding.expr = value
    },
    update: function (callback) {
        var binding = this
        var elem = this.element
        callback = function (e) {
            var fn = binding.getter || noop
            return fn.apply(this, binding.args.concat(e))
        }
        
        var eventType = binding.param.replace(/-\d+$/, "") // ms-on-mousemove-10
        if (eventType === "scan") {
            callback.call(elem, {
                type: eventType
            })
        } else if (typeof binding.specialBind === "function") {
            binding.specialBind(elem, callback)
        } else {
            var removeFn = avalon.bind(elem, eventType, callback)
        }
        binding.rollback = function () {
            if (typeof binding.specialUnbind === "function") {
                binding.specialUnbind()
            } else {
                avalon.unbind(elem, eventType, removeFn)
            }
        }
    }
})
avalon.directive("repeat", {
    priority: 90,
    init: function (binding) {
        var type = binding.type
        binding.cache = {} //用于存放代理VM
        binding.enterCount = 0

        var elem = binding.element
        if (elem.nodeType === 1) {
            elem.removeAttribute(binding.name)
            effectBinding(elem, binding)
            binding.param = binding.param || "el"
            binding.sortedCallback = getBindingCallback(elem, "data-with-sorted", binding.vmodels)
            // binding.renderedCallback = 
            var rendered = getBindingCallback(elem, "data-" + type + "-rendered", binding.vmodels)

            var signature = generateID(type)
            var start = DOC.createComment(signature + ":start")
            var end = binding.element = DOC.createComment(signature + ":end")
            binding.signature = signature
            binding.start = start
            binding.template = avalonFragment.cloneNode(false)
            if (type === "repeat") {
                var parent = elem.parentNode
                parent.replaceChild(end, elem)
                parent.insertBefore(start, end)
                binding.template.appendChild(elem)
            } else {
                while (elem.firstChild) {
                    binding.template.appendChild(elem.firstChild)
                }
                elem.appendChild(start)
                elem.appendChild(end)
                parent = elem
            }
            binding.element = end

            if (rendered) {
                var removeFn = avalon.bind(parent, "datasetchanged", function () {
                    rendered.apply(parent, parent.args)
                    avalon.unbind(parent, "datasetchanged", removeFn)
                    parent.msRendered = rendered
                })
            }
        }
    },
    update: function (value, oldValue) {
        var binding = this
        var xtype = this.xtype

        this.enterCount += 1
        var init = !oldValue
        if (init) {
            binding.$outer = {}
            var check0 = "$key"
            var check1 = "$val"
            if (xtype === "array") {
                check0 = "$first"
                check1 = "$last"
            }
            for (var i = 0, v; v = binding.vmodels[i++]; ) {
                if (v.hasOwnProperty(check0) && v.hasOwnProperty(check1)) {
                    binding.$outer = v
                    break
                }
            }
        }
        var track = this.track
        if (binding.sortedCallback) { //如果有回调，则让它们排序
            var keys2 = binding.sortedCallback.call(parent, track)
            if (keys2 && Array.isArray(keys2)) {
                track = keys2
            }
        }

        var action = "move"
        binding.$repeat = value
        var fragments = []
        var transation = init && avalonFragment.cloneNode(false)
        var proxies = []
        var param = this.param
        var retain = avalon.mix({}, this.cache)
        var elem = this.element
        var length = track.length

        var parent = elem.parentNode
        for (i = 0; i < length; i++) {

            var keyOrId = track[i] //array为随机数, object 为keyName
            var proxy = retain[keyOrId]
            if (!proxy) {
                proxy = getProxyVM(this)

                if (xtype === "array") {
                    action = "add"
                    proxy.$id = keyOrId

                    proxy[param] = value[i] //index

                } else {
                    action = "append"
                    proxy.$key = keyOrId
                    proxy.$val = value[keyOrId] //key
                }
                this.cache[keyOrId] = proxy
                var node = proxy.$anchor || (proxy.$anchor = elem.cloneNode(false))
                node.nodeValue = this.signature
                shimController(binding, transation, proxy, fragments, init && !binding.effectDriver)
                decorateProxy(proxy, binding, xtype)
            } else {
//                if (xtype === "array") {
//                    proxy[param] = value[i]
//                }
                fragments.push({})
                retain[keyOrId] = true
            }

            //重写proxy
            if (this.enterCount === 1) {// 防止多次进入,导致位置不对
                proxy.$active = false
                proxy.$oldIndex = proxy.$index
                proxy.$active = true
                proxy.$index = i

            }

            if (xtype === "array") {
                proxy.$first = i === 0
                proxy.$last = i === length - 1
                // proxy[param] = value[i]
            } else {
                proxy.$val = toJson(value[keyOrId]) // 这里是处理vm.object = newObject的情况 
            }
            proxies.push(proxy)
        }
        this.proxies = proxies
        if (init && !binding.effectDriver) {
            parent.insertBefore(transation, elem)
            fragments.forEach(function (fragment) {
                scanNodeArray(fragment.nodes || [], fragment.vmodels)
                //if(fragment.vmodels.length > 2)
                fragment.nodes = fragment.vmodels = null
            })// jshint ignore:line
        } else {

            var staggerIndex = binding.staggerIndex = 0
            for (keyOrId in retain) {
                if (retain[keyOrId] !== true) {

                    action = "del"
                    removeItem(retain[keyOrId].$anchor, binding)
                    // avalon.log("删除", keyOrId)
                    // 相当于delete binding.cache[key]
                    proxyRecycler(this.cache, keyOrId, param)
                    retain[keyOrId] = null
                }
            }

            //  console.log(effectEnterStagger)
            for (i = 0; i < length; i++) {
                proxy = proxies[i]
                keyOrId = xtype === "array" ? proxy.$id : proxy.$key
                var pre = proxies[i - 1]
                var preEl = pre ? pre.$anchor : binding.start
                if (!retain[keyOrId]) {//如果还没有插入到DOM树
                    (function (fragment, preElement) {
                        var nodes = fragment.nodes
                        var vmodels = fragment.vmodels
                        if (nodes) {
                            staggerIndex = mayStaggerAnimate(binding.effectEnterStagger, function () {
                                parent.insertBefore(fragment.content, preElement.nextSibling)
                                scanNodeArray(nodes, vmodels)
                                animateRepeat(nodes, 1, binding)
                            }, staggerIndex)
                        }
                        fragment.nodes = fragment.vmodels = null
                    })(fragments[i], preEl)// jshint ignore:line
                    // avalon.log("插入")

                } else if (proxy.$index !== proxy.$oldIndex) {
                    (function (proxy2, preElement) {
                        staggerIndex = mayStaggerAnimate(binding.effectEnterStagger, function () {
                            var curNode = removeItem(proxy2.$anchor)// 如果位置被挪动了
                            var inserted = avalon.slice(curNode.childNodes)
                            parent.insertBefore(curNode, preElement.nextSibling)
                            animateRepeat(inserted, 1, binding)
                        }, staggerIndex)
                    })(proxy, preEl)// jshint ignore:line

                    // avalon.log("移动", proxy.$oldIndex, "-->", proxy.$index)
                }
            }

        }
        if (!value.$track) {//如果是非监控对象,那么就将其$events清空,阻止其持续监听
            for (keyOrId in this.cache) {
                proxyRecycler(this.cache, keyOrId, param)
            }

        }

        //repeat --> duplex
        (function (args) {
            parent.args = args
            if (parent.msRendered) {//第一次事件触发,以后直接调用
                parent.msRendered.apply(parent, args)
            }
        })(kernel.newWatch ? arguments : [action]);
        var id = setTimeout(function () {
            clearTimeout(id)
            //触发上层的select回调及自己的rendered回调
            avalon.fireDom(parent, "datasetchanged", {
                bubble: parent.msHasEvent
            })
        })
        this.enterCount -= 1

    }

})

"with,each".replace(rword, function (name) {
    directives[name] = avalon.mix({}, directives.repeat, {
        priority: 1400
    })
})


function animateRepeat(nodes, isEnter, binding) {
    for (var i = 0, node; node = nodes[i++]; ) {
        if (node.className === binding.effectClass) {
            avalon.effect.apply(node, isEnter, noop, noop, binding)
        }
    }
}

function mayStaggerAnimate(staggerTime, callback, index) {
    if (staggerTime) {
        setTimeout(callback, (++index) * staggerTime)
    } else {
        callback()
    }
    return index
}


function removeItem(node, binding) {
    var fragment = avalonFragment.cloneNode(false)
    var last = node
    var breakText = last.nodeValue
    var staggerIndex = binding && Math.max(+binding.staggerIndex, 0)
    var nodes = avalon.slice(last.parentNode.childNodes)
    var index = nodes.indexOf(last)
    while (true) {
        var pre = nodes[--index] //node.previousSibling
        if (!pre || String(pre.nodeValue).indexOf(breakText) === 0) {
            break
        }

        if (binding && (pre.className === binding.effectClass)) {
            node = pre;
            (function (cur) {
                binding.staggerIndex = mayStaggerAnimate(binding.effectLeaveStagger, function () {
                    avalon.effect.apply(cur, 0, noop, function () {
                        fragment.appendChild(cur)
                    }, binding)
                }, staggerIndex)
            })(pre);// jshint ignore:line
        } else {
            fragment.insertBefore(pre, fragment.firstChild)
        }
    }
    fragment.appendChild(last)
    return fragment
}


function shimController(data, transation, proxy, fragments, init) {
    var content = data.template.cloneNode(true)
    var nodes = avalon.slice(content.childNodes)
    content.appendChild(proxy.$anchor)
    init && transation.appendChild(content)
    var nv = [proxy].concat(data.vmodels)
    var fragment = {
        nodes: nodes,
        vmodels: nv,
        content: content
    }
    fragments.push(fragment)
}
// {}  -->  {xx: 0, yy: 1, zz: 2} add
// {xx: 0, yy: 1, zz: 2}  -->  {xx: 0, yy: 1, zz: 2, uu: 3}
// [xx: 0, yy: 1, zz: 2}  -->  {xx: 0, zz: 1, yy: 2}

function getProxyVM(binding) {
    var agent = binding.xtype === "object" ? withProxyAgent : eachProxyAgent
    var proxy = agent(binding)
    var node = proxy.$anchor || (proxy.$anchor = binding.element.cloneNode(false))
    node.nodeValue = binding.signature
    proxy.$outer = binding.$outer
    return proxy
}

var eachProxyPool = []

function eachProxyAgent(data, proxy) {
    var itemName = data.param || "el"
    for (var i = 0, n = eachProxyPool.length; i < n; i++) {
        var candidate = eachProxyPool[i]
        if (candidate && candidate.hasOwnProperty(itemName)) {
            eachProxyPool.splice(i, 1)
            proxy = candidate
            break
        }
    }
    if (!proxy) {
        proxy = eachProxyFactory(itemName)
    }
    return proxy
}

function eachProxyFactory(itemName) {
    var source = {
        $outer: {},
        $index: 0,
        $oldIndex: 0,
        $anchor: null,
        //-----
        $first: false,
        $last: false,
        $remove: avalon.noop
    }
    source[itemName] = NaN

    var force = {
        $last: 1,
        $first: 1,
        $index: 1
    }
    force[itemName] = 1
    var proxy = modelFactory(source, {
        force: force
    })
    proxy.$id = generateID("$proxy$each")
    return proxy
}

function decorateProxy(proxy, binding, type) {
    if (type === "array") {
        proxy.$remove = function () {

            binding.$repeat.removeAt(proxy.$index)
        }
        var param = binding.param


        proxy.$watch(param, function (a) {
            var index = proxy.$index
            binding.$repeat[index] = a
        })
    } else {
        proxy.$watch("$val", function fn(a) {
            binding.$repeat[proxy.$key] = a
        })
    }
}

var withProxyPool = []

function withProxyAgent() {
    return withProxyPool.pop() || withProxyFactory()
}

function withProxyFactory() {
    var proxy = modelFactory({
        $key: "",
        $val: NaN,
        $index: 0,
        $oldIndex: 0,
        $outer: {},
        $anchor: null
    }, {
        force: {
            $key: 1,
            $val: 1,
            $index: 1
        }
    })
    proxy.$id = generateID("$proxy$with")
    return proxy
}


function proxyRecycler(cache, key, param) {
    var proxy = cache[key]
    if (proxy) {
        var proxyPool = proxy.$id.indexOf("$proxy$each") === 0 ? eachProxyPool : withProxyPool
        proxy.$outer = {}

        for (var i in proxy.$events) {
            var a = proxy.$events[i]
            if (Array.isArray(a)) {
                a.length = 0
                if (i === param) {
                    proxy[param] = NaN

                } else if (i === "$val") {
                    proxy.$val = NaN
                }
            }
        }

        if (proxyPool.unshift(proxy) > kernel.maxRepeatSize) {
            proxyPool.pop()
        }
        delete cache[key]
    }
}
/*********************************************************************
 *                         各种指令                                  *
 **********************************************************************/
//ms-skip绑定已经在scanTag 方法中实现
avalon.directive("text", {
    update: function (val) {
        var elem = this.element
        val = val == null ? "" : val //不在页面上显示undefined null
        if (elem.nodeType === 3) { //绑定在文本节点上
            try { //IE对游离于DOM树外的节点赋值会报错
                elem.data = val
            } catch (e) {
            }
        } else { //绑定在特性节点上
            elem.textContent = val
        }
    }
})
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

avalon.directive("visible", {
    init: function (binding) {
    },
    update: function (val) {
        var elem = this.element,
                binding = this,
                stamp = binding.stamp = +new Date()
        if (val) {
            elem.style.display = "none"
            avalon.effect.apply(elem, 1, function () {
                if (stamp !== binding.stamp)
                    return
                var data = elem.getAttribute("data-effect-driver") || "a"
                if (/^[atn]/.test(data)) {
                    if (!this.effectName)
                        elem.style.display = ""//这里jQuery会自动处理
                    if (avalon(elem).css("display") === "none") {
                        elem.style.display = parseDisplay(elem.nodeName)
                    }
                }
            })
        } else {
            avalon.effect.apply(elem, 0, function () {
                if (stamp !== binding.stamp)
                    return
                elem.style.display = "none"
            })

        }
    }
})

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
            var fn = avalon.filters[array[0]]
            if (typeof fn === "function") {
                var arr = [val].concat(array.slice(1))
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
 *                    DOMReady                                         *
 **********************************************************************/
var readyList = [],
    isReady
var fireReady = function (fn) {
    isReady = true
    if (innerRequire) {
        modules["domReady!"].state = 4
        innerRequire.checkDeps()
    }
    while (fn = readyList.shift()) {
        fn(avalon)
    }
}


if (DOC.readyState === "complete") {
    setTimeout(fireReady) //如果在domReady之外加载
} else {
    DOC.addEventListener("DOMContentLoaded", fireReady)
}
window.addEventListener("load", fireReady)
avalon.ready = function (fn) {
    if (!isReady) {
        readyList.push(fn)
    } else {
        fn(avalon)
    }
}
avalon.config({
    loader: true
})
avalon.ready(function () {
    avalon.scan(DOC.body)
})

new function () {// jshint ignore:line
    var me = onDir
    var sniff = {}
    var ua = navigator.userAgent
    var platform = navigator.platform
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/) // 匹配 android
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/) // 匹配 ipad
    var ipod = ua.match(/(iPod)(?:.*OS\s([\d_]+))?/) // 匹配 ipod
    var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/)  // 匹配 iphone
    if (android) {
        sniff.version = android[2]
        sniff.android = true
    }

    var iversion = ipad || iphone || ipod
    if (iversion) {
        sniff.version = String(iversion[2]).replace(/_/g, '.');
        sniff.ios = true
        if (ua.indexOf('Version/') >= 0) {
            sniff.version = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
        sniff.versionN = parseInt(sniff.version, 10)
    }
    sniff.pc = platform.indexOf('Mac') === 0 || platform.indexOf('Win') === 0 ||
            (platform.indexOf('linux') === 0 && !sniff.android)

    // avalon在移动端提供两组 tap系 与 swipe系
    // tap相当于PC端的click,包括tap, doubletap, longtap(500)
    // swipe是划动,移动距离超过10, 大于0.65px/ms的速度才可以触发
    var TOUCHKEYS = [
        'screenX', 'screenY', 'clientX', 'clientY', 'pageX', 'pageY'
    ]
    // 普通的点击 200, 长按500

    var gesture,
            curElement,
            curId,
            lastId,
            lastTime = 0,
            trackingClick,
            clickElement,
            overTouchTime = 0,
            cancelNextClick = false,
            running = true;

    // 重置
    function reset() {
        gesture = curElement = curId = null;
    }

    // 复制 touch 对象上的有用属性到固定对象上
    function mixTouchAttr(target, source) {
        if (source) {
            TOUCHKEYS.forEach(function (key) {
                target[key] = source[key];
            });
        }
        return target;
    }

    // 检测是否需要原生 click
    function needsClick(target) {
        switch (target.nodeName.toLowerCase()) {
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return true;
                }
                break;
            case 'input':
                // IOS6 pad 上选择文件，如果不是原生的click，弹出的选择界面尺寸错误
                if ((ipad && sniff.versionN === 6 && target.type === 'file') || target.disabled) {
                    return true;
                }
                break;
            case 'label':
            case 'iframe':
            case 'video':
                return true;
        }

        return (/\bneedsclick\b/).test(target.className);
    }

    // 检测是否需要 focus
    function needsFocus(target) {
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !sniff.android;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/).test(target.className);
        }
    }

    // 选择触发的事件
    function determineEventType(target) {
        // 安卓chrome浏览器上，模拟的 click 事件不能让 select 打开，故使用 mousedown 事件
        if (sniff.android && target.nodeName.toLowerCase() === 'select') {
            return 'mousedown'
        }

        return 'click'
    }

    // 发送 click 事件
    function sendClick(target, touch) {
        var clickEvent;

        // 某些安卓设备必须先移除焦点，之后模拟的click事件才能让新元素获取焦点
        if (document.activeElement && document.activeElement !== target) {
            document.activeElement.blur();
        }

        clickEvent = document.createEvent('MouseEvents')
        clickEvent.initMouseEvent(determineEventType(target), true, true, window, 1, touch.screenX,
                touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        if (running) {
            target.dispatchEvent(clickEvent);
        }
    }

    //  寻找 label 对应的元素
    function findControl(labelElement) {

        // HTML5 新属性
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // 通过 htmlFor
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter,' +
                'output, progress, select, textarea');
    }

    function findTouch(touches) {
        for (var i = 0, el; el = touches[i++]; ) {
            if (el.identifier === curId) {
                return el
            }
        }
    }

    // 创建事件
    function createEvent(type) {
        var event = document.createEvent('HTMLEvents')
        event.initEvent(type, true, true)
        return event
    }

    // 分析 Move
    function analysisMove(event, touch) {
        var startTouch = gesture.origin
        var offsetX = touch.clientX - startTouch.clientX
        var offsetY = touch.clientY - startTouch.clientY
        if (gesture.status === 'tapping') {
            if (swipeDistance(offsetX, offsetY) > 10) {//如果发生移动, 那么事件改成
                gesture.status = 'swipering' // 更改状态
                trackingClick = clickElement = null;
                gesture.startMoveTime = event.timeStamp // 记录移动开始的时间
                clearTimeout(gesture.handler)
                gesture.handler = null
            }
        }
    }
    // 判定滑动方向
    function swipeDirection(offsetX, offsetY) {
        return Math.abs(offsetX) >=
                Math.abs(offsetY) ? (offsetX < 0 ? 'left' : 'right') : (offsetY < 0 ? 'up' : 'down')
    }
    // 计算滑动距离
    function swipeDistance(offsetX, offsetY) {
        return Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2))
    }
    // 分析 End
    var doubleCount = 0
    var doubleTime = 0
    function analysisEnd(event, touch) {
        if (gesture.handler) {
            clearTimeout(gesture.handler)
            gesture.handler = null
        }
        if (gesture.status === 'swipering') {//平移
            var startTouch = gesture.origin,
                    offsetX = touch.clientX - startTouch.clientX,
                    offsetY = touch.clientY - startTouch.clientY,
                    duration = event.timeStamp - gesture.startMoveTime;
            var distance = swipeDistance(offsetX, offsetY)
            if (distance > 100 && distance / duration > 0.65) {
                var direction = swipeDirection(offsetX, offsetY)

                var swipeEvent = mixTouchAttr(createEvent('swipe'), touch)
                swipeEvent.direction = direction
                trigger(swipeEvent)
                trigger(mixTouchAttr(createEvent('swipe' + direction), touch))
            }
        } else {
            if (gesture.status === 'tapping') {
                trigger(mixTouchAttr(createEvent('tap'), touch))
                doubleCount++
                var now = new Date - 0
                if (doubleCount === 2) {
                    doubleTime = now
                    doubleCount = 0
                    if (now - doubleTime < 250) {
                        event.preventDefault()
                        trigger(mixTouchAttr(createEvent('doubletap'), touch))
                    }
                }
            }
        }
    }

    // 触发事件
    function trigger(event) {
        if (running && curElement) {
            curElement.dispatchEvent(event);
        }
    }
    function onTouchStart(event) {

        var touch, selection,
                changedTouches = event.changedTouches,
                timestamp = event.timeStamp;

        // 如果两次 touch 事件过快，则，直接阻止默认行为
        if (timestamp - lastTime < 200) {
            event.preventDefault()
            return false
        }

        // 忽略多指操作
        if (changedTouches.length > 1) {
            return true
        } else if (curId) {
            // 防抱死，由于快速点击时，有时touchend事件没有触发，造成手势库卡死
            overTouchTime++
            if (overTouchTime > 3) {
                reset()
            }
            return true;
        }

        touch = changedTouches[0]
        if (touch) {
            curElement = event.target
            curId = touch.identifier
            gesture = {
                origin: mixTouchAttr({}, touch), //保持原有的位置
                timestamp: timestamp,
                status: 'tapping',
                handler: setTimeout(function () {
                    var event = mixTouchAttr(createEvent('longtap'), gesture.origin)
                    event.duration = new Date - timestamp //长按
                    trigger(event)
                    clearTimeout(gesture.handler)
                    gesture.handler = null
                }, 500)
            };

            if (!sniff.pc) {
                // 排除 ios 上的一些特殊情况
                if (sniff.ios) {
                    // 判断是否是点击文字，进行选择等操作，如果是，不需要模拟click
                    selection = window.getSelection()
                    if (selection.rangeCount && !selection.isCollapsed) {
                        return true
                    }
                    // 当 alert 或 confirm 时，点击其他地方，会触发touch事件，id相同，此事件应该被忽略
                    if (curId === lastId) {
                        event.preventDefault()
                        return false
                    }

                    lastId = curId
                }

                // 开始跟踪 click
                trackingClick = true;
                clickElement = curElement
            }

        }
        overTouchTime = 0
    }


    function onTouchMove(event) {
        var touch = findTouch(event.changedTouches)
        if (touch && gesture) {
            analysisMove(event, touch)
        }
    }

    function onFocus(element) {
        var length;
        // 兼容 ios7 问题
        if (sniff.ios && element.setSelectionRange &&
                element.type.indexOf('date') !== 0 &&
                element.type !== 'time' && element.type !== 'month') {
            length = element.value.length
            element.setSelectionRange(length, length)
        } else {
            element.focus()
        }
    }

    function onTouchEnd(event) {
        var touch = findTouch(event.changedTouches),
                timestamp = event.timeStamp,
                tagName, forElement

        if (touch && gesture) {
            analysisEnd(event, touch);

            var startTime = gesture.timestamp;

            reset()

            if (trackingClick) {

                // 触击过快，阻止下一次 click
                // 这次的touchstart - 上次的touchstart
                if (timestamp - lastTime < 200) {
                    cancelNextClick = true;
                    return true
                }
                //太长了
                if (timestamp - startTime > 200) {
                    return true
                }

                cancelNextClick = false
                lastTime = timestamp

                tagName = clickElement.nodeName.toLowerCase();
                // 如果是 label， 则模拟 focus 其相关的元素
                if (tagName === 'label') {
                    forElement = findControl(clickElement);
                    if (forElement) {
                        onFocus(forElement)

                        if (android) {
                            return false;
                        }

                        clickElement = forElement
                    }
                } else if (needsFocus(clickElement)) {
                    if (timestamp - startTime > 100 ||
                            (sniff.ios && window.top !== window && tagName === 'input')) {
                        clickElement = null
                        return false
                    }

                    onFocus(clickElement)
                    sendClick(clickElement, touch)

                    if (!sniff.ios || tagName !== 'select') {
                        clickElement = null
                        event.preventDefault()
                    }

                    return false
                }

                if (!needsClick(clickElement)) {
                    event.preventDefault()
                    sendClick(clickElement, touch)
                }

            }
        }
    }


    function onTouchCancel(event) {
        var touch = findTouch(event.changedTouches)

        if (touch && gesture) {
            clickElement = null
            analysisEnd(event, touch)
            reset()
        }
    }

    function onMouse(event) {
        if (!clickElement) {
            return true
        }

        if (event.forwardedTouchEvent) {
            return true
        }

        if (!event.cancelable) {
            return true
        }

        if (!needsClick(clickElement) || cancelNextClick) {
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation()
            } else {
                event.propagationStopped = true
            }
            event.stopPropagation()
            event.preventDefault()
            return false
        }

        return true
    }
    function onClick(event) {
        var permitted;

        if (trackingClick) {
            clickElement = trackingClick = null;
            return true;
        }

        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = onMouse(event);

        if (!permitted) {
            clickElement = null;
        }

        return permitted;
    }

    avalon.ready(function () {
        var body = DOC.body

        if (!sniff.pc) {
            if (android) {
                avalon.bind(body, 'moveover', onMouse, true)
                avalon.bind(body, 'mousedown', onMouse, true)
                avalon.bind(body, 'mouseup', onMouse, true)
            }

            avalon.bind(body, 'click', onClick, true)
        }

        avalon.bind(body, 'touchstart', onTouchStart, true)
        avalon.bind(body, 'touchmove', onTouchMove, true)
        avalon.bind(body, 'touchend', onTouchEnd, true)
        avalon.bind(body, 'touchcancel', onTouchCancel, true)
    });

    ["swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "doubletap", "tap", "longtap"].forEach(function (method) {
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