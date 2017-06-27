/*!
 * 
 * 这是一个迷你版avalon,支持IE9+
 */
(function () {
    var avalon = function () {
    }
    window.avalon = avalon
    var vmodels = avalon.vmodels = {}
    avalon.define = function (obj) {
        return vmodels[obj.$id] = Observer(obj)
    }

    avalon.mix = function (a, b) {
        for (var i in b) {
            a[i] = b[i]
        }
        return a
    }

    avalon.noop = avalon

    var rhashcode = /\d\.\d{4}/
    avalon.makeHashCode = function (prefix) {
        /* istanbul ignore next*/
        prefix = prefix || 'avalon'
        /* istanbul ignore next*/
        return String(Math.random() + Math.random()).replace(rhashcode, prefix)
    }
    var hasConsole = typeof console === 'object'
    avalon.config = function fn(obj) {
        avalon.mix(fn, obj)
    }
    avalon.config({
        debug: 1
    })
    avalon.log = function () {
        if (hasConsole && avalon.config.debug) {
            // http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
            Function.apply.call(console.log, console, arguments)
        }
    }
    var rword = /[^, ]+/g
    avalon.oneObject = function (array, val) {
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
    
    avalon.quote = JSON.stringify

   function startWith(long, short){
       return long.indexOf(short) === 0
   }
    function isArray(a) {
        return Array.isArray(a)
    }
    function isObservable(key, value) {
        return (typeof value !== 'function') && key.charAt(0) !== '$'
    }
    function isObject(a) {
        return a && typeof a === 'object'
    }
    function createFragment() {
        return document.createDocumentFragment()
    }
    function createAnchor(nodeValue) {
        return document.createComment(nodeValue)
    }
    function copy(target) {
        var ret
        if (isArray(target)) {
            ret = target.slice(0)
        } else if (isObject(target)) {
            ret = avalon.mix({}, target)
        }

        return ret || target
    }
    function replaceNode(newNode, oldNode) {
        oldNode.parentNode.replaceChild(newNode, oldNode)
        return newNode
    }

    avalon.each = function (a, fn) {
        if (isArray(a)) {
            a.forEach(function (el, index) {
                fn(index, el)
            })
        } else {
            for (var i in a) {
                fn(i, a[i])
            }
        }
    }

    var delayCompile = {}
    avalon.directives = {}
    avalon.directive = function (name, opts) {
        avalon.directives[name] = opts
        if (opts.delay) {
            delayCompile[name] = 1
        }
    }
    //============ Observer 模块 ==========

    function createObserver(target, ret) {
        if (isObject(target)) {
            return target.$events ? target : new Observer(target, ret)
        }
        if (ret) {
            return target
        }
    }
    function Observer(data, vm) {
        if (isArray(data)) {
            vm = observeArray(data)
        } else {
            vm = observeObject(data)
        }
        if(vm)
        vm.$events.__dep__ = new Depend()
        return vm
    }

    function observeObject(object) {
        var core = {} //events
        var state = {}
        var props = {}
        for (var key in object) {
            var val = object[key]
            if (isObservable(key, val)) {
                state[key] = createAccessor(key, val, core)
            } else {
                props[key] = val
            }
        }

        addMoreProps(props, object, state, core)
        var observe = {}
        observe = createViewModel(observe, state, props)
        for (var i in props) {
            observe[i] = props[i]
        }
        core.observe = observe
        return observe
    }

    function observeItemObject(before, after) {
        var core = before.$events
        var state = before.$accessor
        var object = after.data
        delete after.data
        var props = after
        for (var key in object) {
            state[key] = createAccessor(key, object[key], core)
        }

        addMoreProps(props, object, state, core)
        var observe = {}
        observe = createViewModel(observe, state, props)
        for (var i in props) {
            observe[i] = props[i]
        }
        core.observe = observe
        if (!core.__dep__) {
            core.__dep__ = new Depend()
        }
        return observe
    }
    var modelAccessor = {
        get: function () {
            return toJson(this)
        },
        set: avalon.noop,
        enumerable: false,
        configurable: true
    }
    
    function toJson(val) {
        if (isArray(val)) {
            var array = []
            for (var i = 0; i < val.length; i++) {
                array[i] = toJson(val[i])
            }
            return array
        } else if (isObject(val)) {
            var obj = {}
            for (i in val) {
                if (val.hasOwnProperty(i)) {
                    var value = val[i]
                    obj[i] = value && value.nodeType ? value : toJson(value)
                }
            }
            return obj
        } else {
            return val
        }
    }

    function createViewModel(a, b, c) {
        return Object.defineProperties(a, b)
    }
    
    function observeArray(array, rewrite, ret) {
    function createAccessor(key, val, core) {
        var value = val
        var childOb = createObserver(val)
        return {
            get: function Getter() {
                var ret = value
                if (Depend.watcher) {
                    core.__dep__.collect()
                    if (childOb && childOb.$events) {
                        childOb.$events.__dep__.collect()
                    }
                }
                return ret
            },
            set: function Setter(newValue) {
                var oldValue = value
                if (newValue === oldValue) {
                    return
                }
                core.__dep__.beforeNotify()
                value = newValue
                childOb = createObserver(newValue)
                core.__dep__.notify()
            },
            enumerable: true,
            configurable: true
        }
    }


    function addMoreProps(props, object, state, core) {
        var hash = avalon.makeHashCode('$')
        state.$model = modelAccessor
        avalon.mix(props, {
            $id: object.$id || hash,
            $events: core,
            $hashcode: hash,
            $accessor: state
        })
    }
    //============ 监控数组   ==========
    var ap = Array.prototype
    var __array__ = {}
    var __method__ = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
    function rewriteArrayMethods(array) {
        /* istanbul ignore else */
        for (var i in __array__) {
            array[i] = __array__[i]
        }
        array.$events = {} // 以后自动加上    
    }

    __method__.forEach(function (method) {
        var original = ap[method]
        __array__[method] = function () {
            // 继续尝试劫持数组元素的属性
            var args = []
            var size = this.length
            var core = this.$events
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i])
            }
            core.__dep__.beforeNotify()
            var result = original.apply(this, args)
            var inserts = []
            switch (method) {
                case 'push':
                case 'unshift':
                    inserts = args
                    break
                case 'splice':
                    inserts = args.slice(2)
                    break
            }
            if (inserts && inserts) {
                inserts = observeArray(inserts, 1, 1)
            }
            
            core.__dep__.notify({
                method: method,
                args: args
            })
            return result
        }
    })

    //============== Depend ============

    var guid = 0
    /**
     * 依赖收集类 用于联结 VM 与 Watcher
     */
    function Depend() {
        this.watchers = []
        this.guid = guid++
    }

    /**
     * 当前收集依赖的订阅模块 watcher
     * @type  {Object}
     */
    Depend.watcher = null
    var dp = Depend.prototype
    /**
     * 添加依赖订阅
     * @param  {Object}  watcher
     */
    dp.addWatcher = function (watcher) {
        this.watchers.push(watcher)
    }

    /**
     * 移除依赖订阅
     * @param  {Object}  watcher
     */
    dp.removeWatcher = function (watcher) {
        var index = this.watchers.indexOf(watcher)
        if (index > -1) {
            this.watchers.splice(index, 1)
        }
    }

    /**
     * 为 watcher 收集当前的依赖
     */
    dp.collect = function () {
        if (Depend.watcher) {
            Depend.watcher.addDepend(this)
        }
    }

    /**
     * 依赖变更前调用方法，用于旧数据的缓存处理
     */
    dp.beforeNotify = function () {
        this.watchers.forEach(function (watcher) {
            watcher.beforeUpdate()
        })
    }

    /**
     * 依赖变更，通知每一个订阅了该依赖的 watcher
     * @param  {Object}  args  [数组操作参数信息]
     */
    dp.notify = function (args) {
        var guid = this.guid
        this.watchers.forEach(function (watcher) {
            watcher.update(args, guid)
        })
    }

    //============ Watcher模块 ============

    /** 
     * 遍历对象/数组每一个可枚举属性
     * @param  {Object|Array}  target  [遍历值/对象或数组]
     * @param  {Boolean}       root    [是否是根对象/数组]
     */
    var walkedObs = []
    function walkThrough(target, root) {
        var events = target && target.$events

        var guid = events && events.__dep__.guid

        if (guid) {
            if (walkedObs.indexOf(guid) > -1) {
                return
            } else {
                walkedObs.push(guid)
            }
        }

        avalon.each(target, function (key, value) {
            walkThrough(value, false)
        })
        if (root) {
            walkedObs.length = 0
        }
    }
    /**
     * 用户watch回调及页面上的指令都会转换它的实例
     * @param {type} vm
     * @param {type} desc
     * @param {type} callback
     * @param {type} context
     * @returns {Watcher}
     */

    function Watcher(vm, desc, callback, context) {
        this.vm = vm
        avalon.mix(this, desc)
        this.callback = callback
        this.context = context || this
        // 依赖 id 缓存
        this.depIds = []
        this.newDepIds = []
        this.shallowIds = []
        // 依赖实例缓存
        this.depends = []
        this.newDepends = []
        var expr = desc.expr
        var preSetFunc = typeof expr === 'function'
        // 缓存取值函数
        this.getter = preSetFunc ? expr : createGetter(expr)
        // 缓存设值函数（双向数据绑定）
        this.setter = this.type === 'duplex' ? createSetter(expr) : null
        // 缓存表达式旧值
        this.oldVal = null
        // 表达式初始值 & 提取依赖
        this.value = this.get()
    }

    var wp = Watcher.prototype
    /**
     * 获取取值域
     * @return  {Object}
     */
    wp.getScope = function () {
        return this.context.scope || this.vm
    }

    wp.getValue = function () {
        var scope = this.getScope()
        try {
            return this.getter.call(scope, scope)
        } catch (e) {
            avalon.log(this.getter + 'exec error')
        }
    }

    wp.setValue = function (value) {
        var scope = this.getScope()
        if (this.setter) {
            this.setter.call(scope, scope, value)
        }
    }
    wp.get = function () {
        var value
        this.beforeGet()
        value = this.getValue()
        // 深层依赖获取
        if (this.deep) {
            // 先缓存浅依赖的 ids
            this.shallowIds = copy(this.newDepIds)
            walkThrough(value, true)
        }

        this.afterGet()
        return value
    }

    wp.beforeGet = function () {
        Depend.watcher = this
    }

    wp.addDepend = function (depend) {
        var guid = depend.guid
        var newIds = this.newDepIds
        if (newIds.indexOf(guid) < 0) {
            newIds.push(guid)
            this.newDepends.push(depend)
            if (this.depIds.indexOf(guid) < 0) {
                depend.addWatcher(this)
            }
        }
    }

    wp.removeDepends = function (filter) {
        var self = this
        this.depends.forEach(function (depend) {
            if (filter) {
                if (filter.call(self, depend)) {
                    depend.removeWatcher(self)
                }
            } else {
                depend.removeWatcher(self)
            }
        })
    }

    wp.afterGet = function () {
        Depend.watcher = null
        // 清除无用的依赖
        this.removeDepends(function (depend) {
            return this.newDepIds.indexOf(depend.guid) < 0
        })
        // 重设依赖缓存
        this.depIds = copy(this.newDepIds)
        this.newDepIds.length = 0
        this.depends = copy(this.newDepends)
        this.newDepends.length = 0
    }

    wp.beforeUpdate = function () {
        this.oldVal = copy(this.value)
    }

    wp.update = function (args, guid) {
        var oldVal = this.oldVal
        var newVal = this.value = this.get()
        var callback = this.callback
        if (callback && (oldVal !== newVal)) {
            var fromDeep = this.deep && this.shallowIds.indexOf(guid) < 0
            callback.call(this.context, newVal, oldVal, fromDeep, args)
        }
    }

    wp.destroy = function () {
        this.value = null
        this.removeDepends()
        if (this._destroy) {
            this._destroy()
        }
        for (var i in this) {
            delete this[i]
        }
    }

    //========== 渲染模块 =========
    function isDirective(directive) {
        return /^(?:\:|ms-)\w+/.test(directive)
    }

    function delayCompileNodes(dirs) {
        for (var i in delayCompile) {
            if (('ms-' + i) in dirs) {
                return true
            }
        }
    }
    var regMustache = /\{\{.+\}\}/
    var rcolon = /^(:|ms)-/
    function getRawBindings(node) {
        if (node.nodeType === 1) {
            var attrs = node.attributes
            var props = {}, has = false
            for (var i = 0, n = attrs.length; i < n; i++) {
                var attr = attrs[i]
                if (attr.specified) {
                    var name = attr.name
                    if (name.charAt(0) === ':') {
                        name = name.replace(rcolon, 'ms-')
                    }
                    if (startWith(name,'ms-')) {
                        props[name] = attr.value
                        has = true
                    }

                }
            }
            if (attrs['is']) {
                if (!props['ms-widget']) {
                    props['ms-widget'] = '{}'
                }
                has = true
            }

            return has ? props : false
        } else if (node.nodeType === 3) {
            if (regMustache.test(node.nodeValue)) {
                return {
                    nodeValue: node.nodeValue
                }
            }
        } else if (node.nodeType === 8) {
            if (startWith(node.nodeValue,'ms-for:')) {
                var nodes = []
                var deep = 1
                var begin = node
                var expr = node.nodeValue.replace('ms-for:', '')
                node.nodeValue = 'msfor:' + expr
                while (node = node.nextSibling) {
                    nodes.push(node)

                    if (node.nodeType === 8) {
                        if (startWith(node.nodeValue,'ms-for:')) {
                            deep++
                        } else if (startWith(node.nodeValue,'ms-for-end:')) {
                            deep--
                            if (deep === 0) {
                                node.nodeValue = 'msfor-end:'
                                nodes.pop()
                            }
                        }
                    }

                }
                var f = createFragment()
                nodes.forEach(function (n) {
                    f.appendChild(n)
                })
                this.queue.push([
                    f, this.vm, {'ms-for': expr}, begin
                ])

            }
        }
    }
    function emptyNode(a) {
        var f = createFragment()
        while (a.firstChild) {
            f.appendChild(a.firstChild)
        }
        return f
    }
    avalon.scan = function (node, vm) {
        return new Render(node, vm)
    }
    var eventMap = avalon.oneObject('animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit')

    function Render(node, vm) {
        this.node = node
        this.vm = vm
        this.queue = []
        this.directives = []
        this.init()
    }

    var cp = Render.prototype
    cp.init = function () {
        this.fragment = emptyNode(this.node)
        this.getBindings(this.fragment, true)
    }

    cp.getRawBindings = getRawBindings
    cp.getBindings = function (element, root) {
        var childNodes = element.childNodes
        var scope = this.vm
        var dirs = this.getRawBindings(element)
        if (dirs) {
            this.queue.push([element, scope, dirs])
        }
        if (!/style|textarea|xmp|script|template/i.test(element.nodeName)
                && childNodes
                && childNodes.length
                && !delayCompileNodes(dirs || {})
                ) {
            for (var i = 0; i < childNodes.length; i++) {
                this.getBindings(childNodes[i], false)
            }
        }
        if (root) {
            this.compileBindings()
        }
    }

    cp.compileBindings = function () {
        this.queue.forEach(function (tuple) {
            this.parseBindings(tuple)
        }, this)
        this.node.appendChild(this.fragment)
    }

    /**
     * 将收集到的绑定属性进行深加工,最后转换为watcher
     * @param   {Array}  tuple  [node, scope, dirs]
     */
    cp.parseBindings = function (tuple) {
        var node = tuple[0]
        var scope = tuple[1]
        var dirs = tuple[2]
        if ('nodeValue' in dirs) {
            this.parseText(node, dirs, scope)
        } else if (!('ms-skip' in dirs)) {
            var uniq = {}, bindings = []
            var directives = avalon.directives
            for (var name in dirs) {
                var value = dirs[name]
                var rbinding = /^(\:|ms\-)\w+/
                var match = name.match(rbinding)
                var arr = name.replace(match[1], '').split('-')

                if (eventMap[arr[0]]) {
                    arr.unshift('on')
                }
                if (arr[0] === 'on') {
                    arr[2] = parseFloat(arr[2]) || 0
                }
                arr.unshift('ms')
                var type = arr[1]
                if (directives[type]) {

                    var binding = {
                        type: type,
                        param: arr[2],
                        name: arr.join('-'),
                        expr: value,
                        priority: directives[type].priority || type.charCodeAt(0) * 100
                    }
                    if (type === 'on') {
                        binding.priority += arr[3]
                    }
                    if (!uniq[binding.name]) {
                        uniq[binding.name] = value
                        bindings.push(binding)
                        if (type === 'for') {
                            binding.begin = tuple[3]
                            bindings = [binding]
                            break
                        }
                    }

                }

            }

            bindings.forEach(function (binding) {
                this.parse(node, binding, scope)
            }, this)
        }
    }

    cp.parse = function (node, binding, scope) {
        var dir = avalon.directives[binding.type]
        if (dir) {
            if (dir.parse) {
                dir.parse(binding)
            }
            this.directives.push(new DirectiveWatcher(node, binding, scope))
        }
    }

    cp.parseText = function (node, dir, scope) {
        var rlineSp = /\n\r?/g
        var text = dir.nodeValue.trim().replace(rlineSp, '')
        var pieces = text.split(/\{\{(.+?)\}\}/g)
        var tokens = []
        pieces.forEach(function (piece) {
            var segment = '{{' + piece + '}}'
            if (text.indexOf(segment) > -1) {
                tokens.push('(' + piece + ')')
                text = text.replace(segment, '')
            } else if (piece) {
                tokens.push(avalon.quote(piece))
                text = text.replace(piece, '')
            }
        })
        var binding = {
            expr: tokens.join('+'),
            name: 'nodeValue',
            type: 'nodeValue'
        }

        this.directives.push(new DirectiveWatcher(node, binding, scope))
    }

    cp.destroy = function () {
        this.directives.forEach(function (directive) {
            directive.destroy()
        })
        for (var i in this) {
            delete this[i]
        }
    }

    //========== Eval  ========
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
    var keyMap = avalon.oneObject("break,case,catch,continue,debugger,default,delete,do,else,false," +
            "finally,for,function,if,in,instanceof,new,null,return,switch,this," +
            "throw,true,try,typeof,var,void,while,with," + /* 关键字*/
            "abstract,boolean,byte,char,class,const,double,enum,export,extends," +
            "final,float,goto,implements,import,int,interface,long,native," +
            "package,private,protected,public,short,static,super,synchronized," +
            "throws,transient,volatile")
    var skipMap = avalon.mix({
        Math: 1,
        Date: 1,
        $event: 1,
        __vmodel__: 1
    }, keyMap)
    var rguide = /(^|[^\w\u00c0-\uFFFF_])(@|##)(?=[$\w])/g
    var ruselessSp = /\s*(\.|\|)\s*/g
    var rlocal = /[$a-z_][$\.\w\_]*/gi
    var rregexp = /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/g
    function addScope(expr) {
        var body = expr.trim().replace(rregexp, dig)//移除所有正则
        body = clearString(body)      //移除所有字符串
        body = body.replace(ruselessSp, '$1').//移除.|两端空白
                replace(rguide, '$1__vmodel__.').//转换@与##
                replace(rlocal, function (a, b) {
                    var arr = a.split('.')
                    if (!skipMap[arr[0]]) {
                        return '__vmodel__.' + a
                    }
                    return a
                }).replace(rfill, fill).replace(rfill, fill)
        return body
    }
    function createGetter(expr) {
        var body = addScope(expr)
        try {
            return new Function('__vmodel__', 'return ' + body + ';')
        } catch (e) {
            avalon.log('parse getter: ', expr, body, ' error')
            return avalon.noop
        }
    }

    /**
     * 生成表达式设值函数
     * @param  {String}  expr
     */
    function createSetter(expr) {
        var body = addScope(expr)
        if (!startWith(body,'__vmodel__.')) {
            body = ' __vmodel__.' + body
        }
        body = 'try{ ' + body + ' = __value__}catch(e){}'
        try {
            return new Function('__vmodel__', '__value__', body + ';')
        } catch (e) {
            avalon.log('parse setter: ', expr, ' error')
            return avalon.noop
        }
    }
    //=================== 各种指令的实现  ==============
    /**
     * 一个watcher装饰器
     * @returns {watcher}
     */
    function DirectiveWatcher(node, binding, scope) {
        var type = binding.type
        var directive = avalon.directives[type]
        if (node.nodeType === 1) {
            node.removeAttribute('ms-' + type)
            node.removeAttribute(':' + type)
        }
        var callback = directive.update ? function (value) {
            directive.update.call(this, node, value)
        } : avalon.noop
        var watcher = new Watcher(scope, binding, callback)

        watcher.node = node
        watcher._destory = directive.destory
        if (directive.init)
            directive.init(watcher)
        delete watcher.value
        watcher.update()
        return watcher
    }

    avalon.directive('nodeValue', {
        update: function (node, value) {
            node.nodeValue = value
        }
    })
    avalon.directive('attr', {
        update: function (node, value) {
            for (var i in value) {
                node[i] = value[i]
            }
        }
    })
     avalon.directive('css', {
        update: function (node, value) {
             for (var i in value) {
                node.style.setPropertyValue(i, value[i])
            }
            
        }
    })
    avalon.directive('on', {
        init: function (watcher) {
            var node = watcher.node
            var body = addScope(watcher.expr)
            var rhandleName = /^__vmodel__\.[$\w\.]+$/i
            if (rhandleName.test(body)) {
                body = body + '($event)'
            }

            body = body.replace(/__vmodel__\.([^(]+)\(([^)]*)\)/, function (a, b, c) {
                return '__vmodel__.' + b + '.call(__vmodel__' + (/\S/.test(c) ? ',' + c : '') + ')'
            })
            var ret = [
                'try{',
                '\tvar __vmodel__ = this;',
                '\t' + body,
                '}catch(e){avalon.log(e)}']
            var fn = new Function('$event', ret.join('\n'))
            this.eventHandler = function (e) {
                return fn.call(watcher.vm, e)
            }
            node.addEventListener(watcher.param, this.eventHandler)
        },
        destory: function () {
            this.node.removeEventListener(this.param, this.eventHandler)
        }
    })
    avalon.directive('if', {
        delay: true,
        priority: 5,
        init: function (watcher) {
            var node = watcher.node
            node.removeAttribute('ms-if')
            node.removeAttribute(':if')
            watcher.node = node
            var parent = node.parentNode
            var c = watcher.placeholder = createAnchor('if')
            replaceNode(c, node)
            watcher.isShow = true
            var f = createFragment()
            f.appendChild(node)
            watcher.fragment = f.cloneNode(true)
            watcher.boss = avalon.scan(f, watcher.vm)
            if (!!watcher.value) {
                parent.replaceChild(f, c)
            }
        },
        update: function (node, value) {
            value = !!value
            if (this.isShow === value)
                return
            this.isShow = value
            if (value) {

                var c = this.placeholder
                var p = c.parentNode
                var node = this.fragment.cloneNode(true)
                this.boss = avalon.scan(node, this.vm)
                this.node = node.firstChild
                p.replaceChild(node, c)

            } else {

                var p = this.node.parentNode
                var c = this.placeholder
                p.replaceChild(c, this.node)
                this.boss.destroy()
            }


        }
    })
    avalon.directive('html', {
        update: function (node, value) {
            this.boss && this.boss.destroy()
            var div = document.createElement('div')
            div.innerHTML = value
            this.boss = avalon.scan(div, this.vm)
            emptyNode(node)
            node.appendChild(emptyNode(div))
        },
        delay: true
    })
    avalon.directive('duplex', {
        priority: 999999,
        init: function (watcher) {
            var node = watcher.node
            this.eventHandler = function () {
                watcher.setValue(node.value)
            }
            if (/password|text|hidden/i.test(node.type)) {
                node.addEventListener('input', this.eventHandler)
            }
        },
        update: function (node, value) {
            if (/password|text|hidden/i.test(node.type)) {
                node.value = value
            }
        },
        destory: function () {
            this.node.removeEventListener('input', this.eventHandler)
        }
    })
    avalon.directive('text', {
        delay: true,
        init: function (watcher) {
            var node = watcher.node
            emptyNode(node)
            var child = document.createTextNode(watcher.value)
            node.appendChild(child)
            watcher.node = child
            var type = 'nodeValue'
            watcher.type = watcher.name = type
            var directive = avalon.directives[type]
            watcher.callback = function (value) {
                directive.update.call(this, watcher.node, value)
            }
        }
    })
   
    

    var none = 'none'
    function getDisplay(el) {
        return window.getComputedStyle(el, null).display
    }
    function parseDisplay(elem, val) {
        //用于取得此类标签的默认display值
        var doc = elem.ownerDocument
        var nodeName = elem.nodeName
        var key = '_' + nodeName
        if (!parseDisplay[key]) {
            var temp = doc.body.appendChild(doc.createElement(nodeName))
            val = getDisplay(temp)
            doc.body.removeChild(temp)
            if (val === none) {
                val = 'block'
            }
            parseDisplay[key] = val
        }
        return parseDisplay[key]
    }
    avalon.directive('skip', {
        delay: true
    })
    avalon.directive('visible', {
        init: function (watcher) {
            watcher.isShow = true
        },
        update: function (node, value) {
            var isShow = !!value
            if (this.isShow === isShow)
                return
            this.isShow = isShow
            var display = node.style.display
            if (isShow) {
                if (display === none) {
                    value = this.displayValue
                    if (!value) {
                        node.style.display = ''
                        if (node.style.cssText === '') {
                            node.removeAttribute('style')
                        }
                    }
                }
                if (node.style.display === '' && getDisplay(node) === none &&
                        // fix firefox BUG,必须挂到页面上
                        node.ownerDocument.contains(node)) {

                    value = parseDisplay(node)
                }

            } else {
                if (display !== none) {
                    value = none
                    this.displayValue = display
                }
            }
            function cb() {
                if (value !== void 0) {
                    node.style.display = value
                }
            }
            cb()
        }
    })
    var rforAs = /\s+as\s+([$\w]+)/
    var rident = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
    var rinvalid = /^(null|undefined|NaN|window|this|\$index|\$id)$/
    var rargs = /[$\w_]+/g
    avalon.directive('for', {
        delay: true,
        priority: 3,
        parse: function (binding) {
            var str = binding.origExpr = binding.expr, asName
            str = str.replace(rforAs, function (a, b) {
                /* istanbul ignore if */
                if (!rident.test(b) || rinvalid.test(b)) {
                    avalon.error('alias ' + b + ' is invalid --- must be a valid JS identifier which is not a reserved name.')
                } else {
                    asName = b
                }
                return ''
            })

            var arr = str.split(' in ')
            var kv = arr[0].match(rargs)
            if (kv.length === 1) {//确保avalon._each的回调有三个参数
                kv.unshift('$key')
            }
            binding.expr = arr[1]
            binding.keyName = kv[0]
            binding.valName = kv[1]
            binding.signature = avalon.makeHashCode('for')
            if (asName) {
                binding.asName = asName
            }
        },
        init: function (watcher) {
            var node = watcher.node
            if (node.nodeType === 11) {
                watcher.fragment = node
                var begin = watcher.begin
                delete watcher.begin
            } else {
                begin = createAnchor('msfor:' + watcher.origExpr)
                var end = createAnchor('msfor-end:')
                var p = node.parentNode
                p.insertBefore(begin, node)
                p.replaceChild(end, node)
                var f = createFragment()
                f.appendChild(node)
                watcher.fragment = f
                var cb = node.getAttribute('data-for-rendered')
                if (cb) {
                    watcher.forCb = createGetter(cb)
                }
              
            }
            watcher.node = begin
            watcher.end = watcher.node.nextSibling


            watcher.fragment.appendChild(createAnchor(watcher.signature))
            watcher.cache = {}

            watcher.update = function () {
                var newVal = this.value = this.get()
                var traceIds = createFragments(this, newVal)
                var callback = this.callback
                if (this.oldTrackIds !== traceIds) {
                    this.oldTrackIds = traceIds
                    callback.call(this.context, newVal)
                }
            }

        },
        update: function (node, value) {
            if (!this.preFragments) {
                mountList(this)
            } else {
                diffList(this)
                updateList(this)
            }
            if (this.forCb) {
                this.forCb()
            }
        }
    })

    function getTraceKey(item) {
        var type = typeof item
        return item && type === 'object' ? item.$hashcode : type + ':' + item
    }

    //创建一组fragment的虚拟DOM
    function createFragments(watcher, obj) {
        if (isObject(obj)) {
            var array = isArray(obj)
            var ids = []
            var fragments = [], i = 0
            avalon.each(obj, function (key, value) {
                var k = array ? getTraceKey(value) : key
                fragments.push(new Fragment(k, value, i++))
                ids.push(k)
            })
            if (watcher.fragments) {
                watcher.preFragments = watcher.fragments
                watcher.fragments = fragments
            } else {
                watcher.fragments = fragments
            }
            return ids.join(';;')
        } else {
            return NaN
        }
    }


    function mountList(watcher) {
        var f = createFragment()
        watcher.fragments.forEach(function (fragment, index) {
            FragmentDecorator(fragment, watcher, index)
            saveInCache(watcher.cache, fragment)
            f.appendChild(fragment.dom)
        })
        watcher.end.parentNode.insertBefore(f, watcher.end)
    }

    function diffList(watcher) {
        var cache = watcher.cache
        var newCache = {}
        var fuzzy = []
        var list = watcher.preFragments
        list.forEach(function (el) {
            el._destory = true
        })
        watcher.fragments.forEach(function (c, index) {
            var fragment = isInCache(cache, c.key)
            //取出之前的文档碎片
            if (fragment) {
                delete fragment._destory
                fragment.oldIndex = fragment.index
                fragment.index = index // 相当于 c.index
                fragment.vm[watcher.keyName] = index
                saveInCache(newCache, fragment)
            } else {
                //如果找不到就进行模糊搜索
                fuzzy.push(c)
            }
        })

        fuzzy.forEach(function (c) {
            var fragment = fuzzyMatchCache(cache, c.key)
            if (fragment) {//重复利用
                fragment.oldIndex = fragment.index
                fragment.key = c.key
                var val = fragment.val = c.val
                var index = fragment.index = c.index
                fragment.vm[watcher.valName] = val
                fragment.vm[watcher.keyName] = index
                delete fragment._destory
            } else {
                fragment = FragmentDecorator(c, watcher, c.index)
                list.push(fragment)
            }
            saveInCache(newCache, fragment)
        })

        watcher.fragments = list
        list.sort(function (a, b) {
            return a.index - b.index
        })
        watcher.cache = newCache
    }
    function updateList(watcher) {

        var before = watcher.node
        var parent = before.parentNode
        var list = watcher.fragments
        for (var i = 0, item; item = list[i]; i++) {
            if (item._destory) {
                list.splice(i, 1)
                i--
                item.destory()
                continue
            }
            if (item.ordexIndex !== item.index) {
                if (item.dom && !item.dom.childNodes.length) {
                    item.move()
                }
                parent.insertBefore(item.dom, before.nextSibling)
            }
            before = item.split
        }
    }

    function Fragment(key, val, index) {
        this.name = '#document-fragment'
        this.key = key
        this.val = val
        this.index = index
    }
    Fragment.prototype = {
        destory: function () {
            this.move()
            this.boss.destroy()
            for (var i in this) {
                this[i] = null
            }
        },
        move: function () {
            var pre = this.split
            var f = this.dom
            var list = [pre]
            var w = this.watcher
            var a = 99999
            do {
                pre = pre.previousSibling
                if (!pre || pre === w.node || pre.nodeValue === w.signature) {
                    break
                }
                list.unshift(pre)

            } while (--a)
            list.forEach(function (el) {
                f.appendChild(el)
            })
            return f
        }
    }
    /**
     * 
     * @param {type} fragment
     * @param {type} watcher
     * @param {type} index
     * @returns { key, val, index, oldIndex, watcher, dom, split, boss, vm}
     */
    function FragmentDecorator(fragment, watcher, index) {
        var dom = fragment.dom = watcher.fragment.cloneNode(true)
        fragment.split = dom.lastChild
        fragment.watcher = watcher
        fragment.vm = observeItemObject(watcher.vm, {
            data: new function () {
                var data = {}
                data[watcher.keyName] = fragment.index
                data[watcher.valName] = fragment.val
                if (watcher.asName) {
                    data[watcher.asName] = []
                }
                return data
            }
        })
        fragment.index = index
        fragment.boss = avalon.scan(dom, fragment.vm)
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

    var rfuzzy = /^(string|number|boolean)/
    var rkfuzzy = /^_*(string|number|boolean)/
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
    avalon.directive('widget', {
        delay: true,
        priority: 4,
        init: function (watcher) {
            var node = watcher.node
            var is = node.getAttribute('is')
            var component = avalon.components[is]
            if (component) {
                var slots = {}, soleSlot
                if (component.soleSlot) {
                    soleSlot = avalon.scan(emptyNode(node), watcher.vm)
                } else {
                    avalon.each(node.childNodes, function (el) {
                        var name = el.getAttribute('slot')
                        if (name) {
                            slots[name] = avalon.scan(el, watcher.vm)
                        }
                    })
                }
                var opt = watcher.value
                if (isObject(watcher.value)) {
                    var def = avalon.mix({}, component.defaults)
                    for (var i in def) {
                        def[i] = opt[i]
                    }
                    if (opt.id) {
                        def.$id = opt.id
                    }
                    var vm = avalon.define(def)
                    var div = document.createElement('div')
                    div.innerHTML = component.template
                    var boss = avalon.scan(div, vm)
                    var com = div.children[0]
                    var els = com.querySelectorAll('slot')
                    var push = Array.prototype.push
                    if (soleSlot) {
                        push.apply(boss.directives, soleSlot.directives)
                        replaceNode(soleSlot.node, els[0])
                    } else {
                        avalon.each(function (el) {
                            var name = el.getAttribute('name')
                            replaceNode(slots[name].node, el)
                            push.apply(boss.directives, slots[name].directives)
                        })
                    }
                    replaceNode(com, node)
                    watcher.node = com
                    watcher.comBoss = boss
                }
            }
        },
        update: function (node, value) {
            
        },
        destory: function () {
            this.comBoss.destory()
        }
    })

    avalon.components = {}
    avalon.component = function (name, component) {
        /**
         * template: string
         * defaults: object
         * soleSlot: string
         */
        avalon.components[name] = component
    }
})()

