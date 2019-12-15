/**
 * San
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file 组件体系，vm引擎
 * @author errorrik(errorrik@gmail.com)
 *         otakustay(otakustay@gmail.com)
 *         junmer(junmer@foxmail.com)
 */


/* eslint-disable fecs-max-statements */
(function (root) {
/* eslint-enable fecs-max-statements */

    // #region utils
    /**
     * 对象属性拷贝
     *
     * @inner
     * @param {Object} target 目标对象
     * @param {Object} source 源对象
     * @return {Object} 返回目标对象
     */
    function extend(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }

        return target;
    }

    /**
     * 构建类之间的继承关系
     *
     * @inner
     * @param {Function} subClass 子类函数
     * @param {Function} superClass 父类函数
     */
    function inherits(subClass, superClass) {
        /* jshint -W054 */
        var subClassProto = subClass.prototype;
        var F = new Function();
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        extend(subClass.prototype, subClassProto);
        /* jshint +W054 */
    }

    /**
     * 遍历数组集合
     *
     * @inner
     * @param {Array} array 数组源
     * @param {function(Any,number):boolean} iterator 遍历函数
     * @param {Object=} thisArg this指向对象
     */
    function each(array, iterator, thisArg) {
        if (array && array.length > 0) {
            for (var i = 0, l = array.length; i < l; i++) {
                if (iterator.call(thisArg || array, array[i], i) === false) {
                    break;
                }
            }
        }
    }


    /**
     * 判断数组中是否包含某项
     *
     * @inner
     * @param {Array} array 数组
     * @param {*} value 包含的项
     * @return {boolean}
     */
    function contains(array, value) {
        var result;
        each(array, function (item) {
            result = item === value;
            return !result;
        });

        return result;
    }

    /**
     * Function.prototype.bind 方法的兼容性封装
     *
     * @inner
     * @param {Function} func 要bind的函数
     * @param {Object} thisArg this指向对象
     * @param {...*} args 预设的初始参数
     * @return {Function}
     */
    function bind(func, thisArg) {
        var nativeBind = Function.prototype.bind;
        var slice = Array.prototype.slice;
        if (nativeBind && func.bind === nativeBind) {
            return nativeBind.apply(func, slice.call(arguments, 1));
        }

        var args = slice.call(arguments, 2);
        return function () {
            return func.apply(thisArg, args.concat(slice.call(arguments)));
        };
    }

    /**
     * DOM 事件挂载
     *
     * @inner
     * @param {HTMLElement} el DOM元素
     * @param {string} eventName 事件名
     * @param {Function} listener 监听函数
     */
    function on(el, eventName, listener) {
        if (el.addEventListener) {
            el.addEventListener(eventName, listener, false);
        }
        else {
            el.attachEvent('on' + eventName, listener);
        }
    }

    /**
     * DOM 事件卸载
     *
     * @inner
     * @param {HTMLElement} el DOM元素
     * @param {string} eventName 事件名
     * @param {Function} listener 监听函数
     */
    function un(el, eventName, listener) {
        if (el.addEventListener) {
            el.removeEventListener(eventName, listener, false);
        }
        else {
            el.detachEvent('on' + eventName, listener);
        }
    }

    /**
     * 将 DOM 从页面中移除
     *
     * @inner
     * @param {HTMLElement} el DOM元素
     */
    function removeEl(el) {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }

    /**
     * svgTags
     *
     * @see https://www.w3.org/TR/SVG/svgdtd.html 只取常用
     * @inner
     * @type {Object}
     */
    var svgTags = {};
    each((''
            // structure
            + 'svg,g,defs,desc,metadata,symbol,use,'
            // image & shape
            + 'image,path,rect,circle,line,ellipse,polyline,polygon,'
            // text
            + 'text,tspan,tref,textpath,'
            // other
            + 'marker,pattern,clippath,mask,filter,cursor,view,animate,'
            // font
            + 'font,font-face,glyph,missing-glyph'
        ).split(','),
        function (key) {
            svgTags[key] = 1;
        }
    );

    /**
     * 创建 DOM 元素
     *
     * @inner
     * @param  {string} tagName tagName
     * @return {HTMLElement}
     */
    function createEl(tagName) {
        if (svgTags[tagName]) {
            return document.createElementNS('http://www.w3.org/2000/svg', tagName);
        }

        return document.createElement(tagName);
    }

    /**
     * 唯一id的起始值
     *
     * @inner
     * @type {number}
     */
    var guidIndex = 1;

    /**
     * 获取唯一id
     *
     * @inner
     * @return {string} 唯一id
     */
    function guid() {
        return '_san_' + (guidIndex++);
    }

    /**
     * 下一个周期要执行的任务列表
     *
     * @inner
     * @type {Array}
     */
    var nextTasks = [];

    /**
     * 执行下一个周期任务的函数
     *
     * @inner
     * @type {Function}
     */
    var nextHandler;

    /**
     * 在下一个时间周期运行任务
     *
     * @inner
     * @param {Function} fn 要运行的任务函数
     * @param {Object=} thisArg this指向对象
     */
    function nextTick(fn, thisArg) {
        if (thisArg) {
            fn = bind(fn, thisArg);
        }
        nextTasks.push(fn);

        if (nextHandler) {
            return;
        }

        nextHandler = function () {
            var tasks = nextTasks.slice(0);
            nextTasks = [];
            nextHandler = null;

            each(tasks, function (task) {
                task();
            });
        };

        if (typeof MutationObserver === 'function') {
            var num = 1;
            var observer = new MutationObserver(nextHandler);
            var text = document.createTextNode(num);
            observer.observe(text, {
                characterData: true
            });
            text.data = ++num;
        }
        else if (typeof setImmediate === 'function') {
            setImmediate(nextHandler);
        }
        else {
            setTimeout(nextHandler, 0);
        }
    }

    /**
     * 从userAgent中ie版本号的匹配信息
     *
     * @inner
     * @type {Array}
     */
    var ieVersionMatch = typeof navigator !== 'undefined'
        && navigator.userAgent.match(/msie\s*([0-9]+)/i);

    /**
     * ie版本号，非ie时为0
     *
     * @inner
     * @type {number}
     */
    var ie = ieVersionMatch ? ieVersionMatch[1] - 0 : 0;

    /**
     * 字符串连接时是否使用老式的兼容方案
     *
     * @inner
     * @type {boolean}
     */
    var isCompatStringJoin = ie && ie < 8;

    // HACK: IE8下，设置innerHTML时如果以script开头，script会被自动滤掉
    //       为了保证script的stump存在，前面加个零宽特殊字符
    /**
     * 是否在桩元素前面插入空白字符
     *
     * @inner
     * @type {boolean}
     */
    var isFEFFBeforeStump = ie && ie < 9;

    /**
     * 写个用于跨平台提高性能的字符串连接类
     * 万一不小心支持老式浏览器了呢
     *
     * @inner
     * @class
     */
    function StringBuffer() {
        this.raw = isCompatStringJoin ? [] : '';
        this.length = 0;
    }

    /**
     * 获取连接的字符串结果
     *
     * @inner
     * @return {string}
     */
    StringBuffer.prototype.toString = function () {
        return isCompatStringJoin ? this.raw.join('') : this.raw;
    };

    /**
     * 增加字符串片段
     * 就不支持多参数，别问我为什么，这东西也不是给外部用的
     *
     * @inner
     * @param {string} source 字符串片段
     */
    StringBuffer.prototype.push = isCompatStringJoin
        ? function (source) {
            this.raw[this.length++] = source;
        }
        : function (source) {
            this.length++;
            this.raw += source;
        };

    /**
     * 索引列表，能根据 item 中的 name 进行索引
     *
     * @inner
     * @class
     */
    function IndexedList() {
        this.raw = [];
        this.index = {};
    }

    /**
     * 在列表末尾添加 item
     *
     * @inner
     * @param {Object} item 要添加的对象
     */
    IndexedList.prototype.push = function (item) {
        // #begin-ignore
//        if (!item.name) {
//            throw new Error('Miss "name" property');
//        }
        // #end-ignore

        if (!this.index[item.name]) {
            this.raw.push(item);
            this.index[item.name] = item;
        }
    };

    /**
     * 根据顺序下标获取 item
     *
     * @inner
     * @param {number} index 顺序下标
     * @return {Object}
     */
    IndexedList.prototype.getAt = function (index) {
        return this.raw[index];
    };

    /**
     * 根据 name 获取 item
     *
     * @inner
     * @param {string} name name
     * @return {Object}
     */
    IndexedList.prototype.get = function (name) {
        return this.index[name];
    };

    /**
     * 遍历 items
     *
     * @inner
     * @param {function(*,Number):boolean} iterator 遍历函数
     * @param {Object} thisArg 遍历函数运行的this环境
     */
    IndexedList.prototype.each = function (iterator, thisArg) {
        each(this.raw, bind(iterator, thisArg || this));
    };

    /**
     * 根据 name 移除 item
     *
     * @inner
     * @param {string} name name
     */
    IndexedList.prototype.remove = function (name) {
        this.index[name] = null;

        var len = this.raw.length;
        while (len--) {
            if (this.raw[len].name === name) {
                this.raw.splice(len, 1);
                break;
            }
        }
    };

    /**
     * 连接另外一个 IndexedList，返回一个新的 IndexedList
     *
     * @inner
     * @param {IndexedList} other 要连接的IndexedList
     * @return {IndexedList}
     */
    IndexedList.prototype.concat = function (other) {
        var result = new IndexedList();
        each(this.raw.concat(other.raw), function (item) {
            result.push(item);
        });

        return result;
    };

    /**
     * 判断标签是否应自关闭
     *
     * @inner
     * @param {string} tagName 标签名
     * @return {boolean}
     */
    function tagIsAutoClose(tagName) {
        return /^(area|base|br|col|embed|hr|img|input|keygen|param|source|track|wbr)$/i.test(tagName);
    }


    // #region parse
    /**
     * 表达式类型
     *
     * @inner
     * @const
     * @type {Object}
     */
    var ExprType = {
        STRING: 1,
        NUMBER: 2,
        ACCESSOR: 3,
        INTERP: 4,
        CALL: 5,
        TEXT: 6,
        BINARY: 7,
        UNARY: 8,
        TERTIARY: 9
    };

    /**
     * 字符串源码读取类，用于模板字符串解析过程
     *
     * @inner
     * @class
     * @param {string} source 要读取的字符串
     */
    function Walker(source) {
        this.source = source;
        this.len = this.source.length;
        this.index = 0;
    }

    /**
     * 获取当前字符码
     *
     * @return {number}
     */
    Walker.prototype.currentCode = function () {
        return this.charCode(this.index);
    };

    /**
     * 截取字符串片段
     *
     * @param {number} start 起始位置
     * @param {number} end 结束位置
     * @return {string}
     */
    Walker.prototype.cut = function (start, end) {
        return this.source.slice(start, end);
    };

    /**
     * 向前读取字符
     *
     * @param {number} distance 读取字符数
     */
    Walker.prototype.go = function (distance) {
        this.index += distance;
    };

    /**
     * 读取下一个字符，返回下一个字符的 code
     *
     * @return {number}
     */
    Walker.prototype.nextCode = function () {
        this.go(1);
        return this.currentCode();
    };

    /**
     * 获取相应位置字符的 code
     *
     * @param {number} index 字符位置
     * @return {number}
     */
    Walker.prototype.charCode = function (index) {
        return this.source.charCodeAt(index);
    };

    /**
     * 向前读取字符，直到遇到指定字符再停止
     *
     * @param {number=} charCode 指定字符的code
     * @return {boolean} 当指定字符时，返回是否碰到指定的字符
     */
    Walker.prototype.goUntil = function (charCode) {
        var code;
        while (this.index < this.len && (code = this.currentCode())) {
            switch (code) {
                case 32:
                case 9:
                    this.index++;
                    break;
                default:
                    if (code === charCode) {
                        this.index++;
                        return 1;
                    }
                    return;
            }
        }
    };

    /**
     * 向前读取符合规则的字符片段，并返回规则匹配结果
     *
     * @param {RegExp} reg 字符片段的正则表达式
     * @return {Array}
     */
    Walker.prototype.match = function (reg) {
        reg.lastIndex = this.index;

        var match = reg.exec(this.source);
        if (match) {
            this.index = reg.lastIndex;
        }

        return match;
    };

    /**
     * 模板解析生成的抽象节点
     *
     * @class
     * @inner
     * @param {Object=} options 节点参数
     * @param {string=} options.tagName 标签名
     * @param {ANode=} options.parent 父节点
     * @param {boolean=} options.isText 是否文本节点
     */
    function ANode(options) {
        if (!options || !options.isText) {
            this.directives = new IndexedList();
            this.props = new IndexedList();
            this.events = [];
            this.childs = [];
        }

        extend(this, options);
    }

    /**
     * 解析 template
     *
     * @inner
     * @param {string} source template 源码
     * @return {node.Root}
     */
    function parseTemplate(source) {
        var rootNode = new ANode();

        if (typeof source !== 'string') {
            return rootNode;
        }

        source = source.replace(/<!--([\s\S]*?)-->/mg, '').replace(/(^\s+|\s+$)/g, '');
        var walker = new Walker(source);

        var tagReg = /<(\/)?([a-z0-9-]+)\s*/ig;
        var attrReg = /([-:0-9a-z\(\)\[\]]+)(=(['"])([^\3]*?)\3)?\s*/ig;

        var tagMatch;
        var currentNode = rootNode;
        var beforeLastIndex = 0;

        while ((tagMatch = walker.match(tagReg)) != null) {
            var tagEnd = tagMatch[1];
            var tagName = tagMatch[2].toLowerCase();

            pushTextNode(source.slice(
                beforeLastIndex,
                walker.index - tagMatch[0].length
            ));

            // 62: >
            // 47: /
            if (tagEnd && walker.currentCode() === 62) {
                // 满足关闭标签的条件时，关闭标签
                // 向上查找到对应标签，找不到时忽略关闭
                var closeTargetNode = currentNode;
                while (closeTargetNode && closeTargetNode.tagName !== tagName) {
                    closeTargetNode = closeTargetNode.parent;
                }

                closeTargetNode && (currentNode = closeTargetNode.parent);
                walker.go(1);
            }
            else if (!tagEnd) {
                var aElement = new ANode({
                    tagName: tagName,
                    parent: currentNode
                });
                var tagClose = tagIsAutoClose(tagName);

                // 解析 attributes

                /* eslint-disable no-constant-condition */
                while (1) {
                /* eslint-enable no-constant-condition */

                    var nextCharCode = walker.currentCode();

                    // 标签结束时跳出 attributes 读取
                    // 标签可能直接结束或闭合结束
                    if (nextCharCode === 62) {
                        walker.go(1);
                        break;
                    }
                    else if (nextCharCode === 47
                        && walker.charCode(walker.index + 1) === 62
                    ) {
                        walker.go(2);
                        tagClose = 1;
                        break;
                    }

                    // 读取 attribute
                    var attrMatch = walker.match(attrReg);
                    if (attrMatch) {
                        integrateAttr(
                            aElement,
                            attrMatch[1],
                            attrMatch[2] ? attrMatch[4] : attrMatch[1]
                        );
                    }
                }

                currentNode.childs.push(aElement);
                if (!tagClose) {
                    currentNode = aElement;
                }
            }

            beforeLastIndex = walker.index;
        }

        pushTextNode(walker.cut(beforeLastIndex));

        return rootNode;

        /**
         * 在读取栈中添加文本节点
         *
         * @inner
         * @param {string} text 文本内容
         */
        function pushTextNode(text) {
            if (text) {
                currentNode.childs.push(new ANode({
                    isText: true,
                    text: text,
                    textExpr: parseText(text),
                    parent: currentNode
                }));
            }
        }
    }

    /**
     * 解析抽象节点属性
     *
     * @inner
     * @param {ANode} aNode 抽象节点
     * @param {string} name 属性名称
     * @param {string} value 属性值
     * @param {boolean=} ignoreNormal 是否忽略无前缀的普通属性
     */
    function integrateAttr(aNode, name, value, ignoreNormal) {
        if (name === 'id') {
            aNode.id = value;
            return;
        }

        var prefixIndex = name.indexOf('-');
        var realName;
        var prefix;

        if (prefixIndex > 0) {
            prefix = name.slice(0, prefixIndex);
            realName = name.slice(prefixIndex + 1);
        }

        switch (prefix) {
            case 'on':
                aNode.events.push({
                    name: realName,
                    expr: parseCall(value)
                });
                break;

            case 'san':
                var directive = parseDirective(realName, value);
                directive && aNode.directives.push(directive);
                break;

            case 'prop':
                integrateProp(aNode, realName, value);
                break;

            default:
                if (!ignoreNormal) {
                    integrateProp(aNode, name, value);
                }
        }
    }

    /**
     * 解析抽象节点绑定属性
     *
     * @inner
     * @param {ANode} aNode 抽象节点
     * @param {string} name 属性名称
     * @param {string} value 属性值
     */
    function integrateProp(aNode, name, value) {
        // parse two way binding, e.g. value="{=ident=}"
        var xMatch = value.match(/^\{=\s*(.*?)\s*=\}$/);

        if (xMatch) {
            aNode.props.push({
                name: name,
                expr: parseExpr(xMatch[1]),
                x: true
            });

            return;
        }

        // parse normal prop
        aNode.props.push(textPropExtra({
            name: name,
            expr: parseText(value),
            raw: value
        }));
    }

    /**
     * 为text类型的属性绑定附加额外的行为，用于一些特殊需求，比如class中插值的自动展开
     *
     * @inner
     * @param {Object} prop 绑定信息
     * @return {Object}
     */
    function textPropExtra(prop) {
        // 这里不能把只有一个插值的属性抽取
        // 因为插值里的值可能是html片段，容易被注入
        // 组件的数据绑定在组件init时做抽取
        switch (prop.name) {
            case 'class':
                each(prop.expr.segs, function (seg) {
                    if (seg.type === ExprType.INTERP) {
                        seg.filters.push({
                            type: ExprType.CALL,
                            name: 'clazz',
                            args: []
                        });
                    }
                });
                break;

            case 'style':
                each(prop.expr.segs, function (seg) {
                    if (seg.type === ExprType.INTERP) {
                        seg.filters.push({
                            type: ExprType.CALL,
                            name: 'style',
                            args: []
                        });
                    }
                });
                break;
        }

        return prop;
    }

    /**
     * 指令解析器
     *
     * @type {Object}
     * @inner
     */
    var directiveParsers = {
        'for': function (value) {
            var walker = new Walker(value);
            var match = walker.match(/^\s*([\$0-9a-z_]+)(\s*,\s*([\$0-9a-z_]+))?\s+in\s+/ig);

            if (match) {
                return {
                    item: match[1],
                    index: match[3] || '$index',
                    list: readPropertyAccessor(walker)
                };
            }

            // #begin-ignore
//            throw new Error('[SAN FATAL] for syntax error: ' + value);
            // #end-ignore
        },

        'ref': function (value) {
            return {
                value: parseText(value)
            };
        },

        'if': function (value) {
            return {
                value: parseExpr(value)
            };
        },

        'else': function () {
            return {
                value: true
            };
        }
    };

    /**
     * 解析指令
     *
     * @inner
     * @param {string} name 指令名称
     * @param {string} value 指令值
     * @return {Object?}
     */
    function parseDirective(name, value) {
        var parser = directiveParsers[name];
        if (parser) {
            var result = parser(value);
            result.name = name;
            return result;
        }
    }

    /**
     * 解析文本
     *
     * @inner
     * @param {string} source 源码
     * @return {Object}
     */
    function parseText(source) {
        var exprStartReg = /\{\{\s*([\s\S]+?)\s*\}\}/ig;
        var exprMatch;

        var walker = new Walker(source);
        var beforeIndex = 0;

        var segs = [];
        function pushStringToSeg(text) {
            text && segs.push({
                type: ExprType.STRING,
                value: text
            });
        }

        while ((exprMatch = walker.match(exprStartReg)) != null) {
            pushStringToSeg(walker.cut(
                beforeIndex,
                walker.index - exprMatch[0].length
            ));
            segs.push(parseInterp(exprMatch[1]));
            beforeIndex = walker.index;
        }

        pushStringToSeg(walker.cut(beforeIndex));

        return {
            type: ExprType.TEXT,
            segs: segs
        };
    }

    /**
     * 解析插值替换
     *
     * @inner
     * @param {string} source 源码
     * @return {Object}
     */
    function parseInterp(source) {
        var walker = new Walker(source);
        var expr = readTertiaryExpr(walker);

        var filters = [];
        while (walker.goUntil(124)) { // |
            filters.push(readCall(walker));
        }

        return {
            type: ExprType.INTERP,
            expr: expr,
            filters: filters
        };
    }

    /**
     * 解析表达式
     *
     * @inner
     * @param {string} source 源码
     * @return {Object}
     */
    function parseExpr(source) {
        if (typeof source === 'object' && source.type) {
            return source;
        }

        return readTertiaryExpr(new Walker(source));
    }

    /**
     * 解析调用
     *
     * @inner
     * @param {string} source 源码
     * @return {Object}
     */
    function parseCall(source) {
        return readCall(new Walker(source));
    }

    /**
     * 读取字符串
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readString(walker) {
        var startCode = walker.currentCode();
        var startIndex = walker.index;
        var charCode;

        walkLoop: while ((charCode = walker.nextCode())) {
            switch (charCode) {
                case 92: // \
                    walker.go(1);
                    break;
                case startCode:
                    walker.go(1);
                    break walkLoop;
            }
        }

        var literal = walker.cut(startIndex, walker.index);
        return {
            type: ExprType.STRING,
            value: (new Function('return ' + literal))()
        };
    }

    /**
     * 读取ident
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {string}
     */
    function readIdentifier(walker) {
        var match = walker.match(/\s*([\$0-9a-z_]+)/ig);
        return match[1];
    }

    /**
     * 读取数字
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readNumber(walker) {
        var match = walker.match(/\s*(-?[0-9]+(.[0-9]+)?)/g);

        return {
            type: ExprType.NUMBER,
            value: match[1] - 0
        };
    }

    /**
     * 读取属性访问表达式
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readPropertyAccessor(walker) {
        var result = {
            type: ExprType.ACCESSOR,
            paths: [
                {
                    type: ExprType.STRING,
                    value: readIdentifier(walker)
                }
            ]
        };

        /* eslint-disable no-constant-condition */
        accessorLoop: while (1) {
        /* eslint-enable no-constant-condition */

            switch (walker.currentCode()) {
                case 46: // .
                    walker.go(1);

                    // ident as string
                    result.paths.push({
                        type: ExprType.STRING,
                        value: readIdentifier(walker)
                    });
                    break;

                case 91: // [
                    walker.go(1);
                    result.paths.push(readTertiaryExpr(walker));
                    walker.goUntil(93);  // ]
                    break;

                default:
                    break accessorLoop;
            }
        }

        return result;
    }

    /**
     * 读取三元表达式
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readTertiaryExpr(walker) {
        var conditional = readLogicalORExpr(walker);
        walker.goUntil();

        if (walker.currentCode() === 63) { // ?
            walker.go(1);
            var yesExpr = readTertiaryExpr(walker);
            walker.goUntil();

            if (walker.currentCode() === 58) { // :
                walker.go(1);
                return {
                    type: ExprType.TERTIARY,
                    segs: [
                        conditional,
                        yesExpr,
                        readTertiaryExpr(walker)
                    ]
                };
            }
        }

        return conditional;
    }

    /**
     * 读取逻辑或表达式
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readLogicalORExpr(walker) {
        var expr = readLogicalANDExpr(walker);
        walker.goUntil();

        if (walker.currentCode() === 124) { // |
            if (walker.nextCode() === 124) {
                walker.go(1);
                return {
                    type: ExprType.BINARY,
                    operator: 248,
                    segs: [expr, readLogicalORExpr(walker)]
                };
            }

            walker.go(-1);
        }

        return expr;
    }

    /**
     * 读取逻辑与表达式
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readLogicalANDExpr(walker) {
        var expr = readEqualityExpr(walker);
        walker.goUntil();

        if (walker.currentCode() === 38) { // &
            if (walker.nextCode() === 38) {
                walker.go(1);
                return {
                    type: ExprType.BINARY,
                    operator: 76,
                    segs: [expr, readLogicalANDExpr(walker)]
                };
            }

            walker.go(-1);
        }

        return expr;
    }

    /**
     * 读取相等比对表达式
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readEqualityExpr(walker) {
        var expr = readRelationalExpr(walker);
        walker.goUntil();

        var code = walker.currentCode();
        switch (code) {
            case 61: // =
            case 33: // !
                if (walker.nextCode() === 61) {
                    code += 61;
                    if (walker.nextCode() === 61) {
                        code += 61;
                        walker.go(1);
                    }

                    return {
                        type: ExprType.BINARY,
                        operator: code,
                        segs: [expr, readEqualityExpr(walker)]
                    };
                }

                walker.go(-1);
        }

        return expr;
    }

    /**
     * 读取关系判断表达式
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readRelationalExpr(walker) {
        var expr = readAdditiveExpr(walker);
        walker.goUntil();

        var code = walker.currentCode();
        switch (code) {
            case 60: // <
            case 62: // >
                if (walker.nextCode() === 61) {
                    code += 61;
                    walker.go(1);
                }

                return {
                    type: ExprType.BINARY,
                    operator: code,
                    segs: [expr, readRelationalExpr(walker)]
                };
        }

        return expr;
    }

    /**
     * 读取加法表达式
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readAdditiveExpr(walker) {
        var expr = readMultiplicativeExpr(walker);
        walker.goUntil();

        var code = walker.currentCode();
        switch (code) {
            case 43: // +
            case 45: // -
                walker.go(1);
                return {
                    type: ExprType.BINARY,
                    operator: code,
                    segs: [expr, readAdditiveExpr(walker)]
                };
        }

        return expr;
    }

    /**
     * 读取乘法表达式
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readMultiplicativeExpr(walker) {
        var expr = readUnaryExpr(walker);
        walker.goUntil();

        var code = walker.currentCode();
        switch (code) {
            case 42: // *
            case 47: // /
                walker.go(1);
                return {
                    type: ExprType.BINARY,
                    operator: code,
                    segs: [expr, readMultiplicativeExpr(walker)]
                };
        }

        return expr;
    }

    /**
     * 读取一元表达式
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readUnaryExpr(walker) {
        walker.goUntil();

        switch (walker.currentCode()) {
            case 33: // !
                walker.go(1);
                return {
                    type: ExprType.UNARY,
                    expr: readUnaryExpr(walker)
                };
            case 34: // "
            case 39: // '
                return readString(walker);
            case 45: // number
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                return readNumber(walker);
            case 40: // (
                return readParenthesizedExpr(walker);
        }

        return readPropertyAccessor(walker);
    }

    function readParenthesizedExpr(walker) {
        walker.go(1);
        var expr = readTertiaryExpr(walker);
        walker.goUntil(41);  // )

        return expr;
    }

    /**
     * 二元表达式操作函数
     *
     * @inner
     * @type {Object}
     */
    var BinaryOp = {
        /* eslint-disable */
        43: function (a, b) {
            return a + b;
        },
        45: function (a, b) {
            return a - b;
        },
        42: function (a, b) {
            return a * b;
        },
        47: function (a, b) {
            return a / b;
        },
        60: function (a, b) {
            return a < b;
        },
        62: function (a, b) {
            return a > b;
        },
        76: function (a, b) {
            return a && b;
        },
        94: function (a, b) {
            return a != b;
        },
        121: function (a, b) {
            return a <= b;
        },
        122: function (a, b) {
            return a == b;
        },
        123: function (a, b) {
            return a >= b;
        },
        155: function (a, b) {
            return a !== b;
        },
        183: function (a, b) {
            return a === b;
        },
        248: function (a, b) {
            return a || b;
        }
        /* eslint-enable */
    };

    /**
     * 读取调用
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
    function readCall(walker) {
        walker.goUntil();
        var ident = readIdentifier(walker);
        var args = [];

        if (walker.goUntil(40)) { // (
            while (!walker.goUntil(41)) { // )
                args.push(readTertiaryExpr(walker));
                walker.goUntil(44); // ,
            }
        }

        return {
            type: ExprType.CALL,
            name: ident,
            args: args
        };
    }

    /**
     * 判断变更表达式与多个表达式之间的关系，-1为完全没关系，0为有关系
     *
     * @inner
     * @param {Object} changeExpr 目标表达式
     * @param {Array} exprs 多个源表达式
     * @param {Model} model 表达式所属数据环境
     * @return {number}
     */
    function changeExprCompareExprs(changeExpr, exprs, model) {
        var result;
        each(exprs, function (expr) {
            result = changeExprCompare(changeExpr, expr, model);
            return !result;
        });

        return result ? 1 : 0;
    }

    /**
     * 比较变更表达式与目标表达式之间的关系，用于视图更新判断
     * 视图更新需要根据其关系，做出相应的更新行为
     *
     * 0: 完全没关系
     * 1: 变更表达式是目标表达式的母项(如a与a.b) 或 表示需要完全变化
     * 2: 变更表达式是目标表达式相等
     * >2: 变更表达式是目标表达式的子项，如a.b.c与a.b
     *
     * @param {Object} changeExpr 变更表达式
     * @param {Object} expr 要比较的目标表达式
     * @param {Model} model 表达式所属数据环境
     * @return {number}
     */
    function changeExprCompare(changeExpr, expr, model) {
        switch (expr.type) {
            case ExprType.ACCESSOR:
                var paths = expr.paths;
                var len = paths.length;
                var changePaths = changeExpr.paths;
                var changeLen = changePaths.length;

                var result = 1;
                for (var i = 0; i < len; i++) {
                    var pathExpr = paths[i];

                    if (pathExpr.type === ExprType.ACCESSOR
                        && changeExprCompare(changeExpr, pathExpr, model)
                    ) {
                        return 1;
                    }

                    if (result && i < changeLen
                        /* eslint-disable eqeqeq */
                        && evalExpr(pathExpr, model) != changePaths[i].value
                        /* eslint-enable eqeqeq */
                    ) {
                        result = 0;
                    }
                }

                if (result) {
                    result = Math.max(1, changeLen - len + 2);
                }
                return result;

            case ExprType.UNARY:
                return changeExprCompare(changeExpr, expr.expr, model) ? 1 : 0;


            case ExprType.TEXT:
            case ExprType.BINARY:
            case ExprType.TERTIARY:
                return changeExprCompareExprs(changeExpr, expr.segs, model);

            case ExprType.INTERP:
                if (!changeExprCompare(changeExpr, expr.expr, model)) {
                    var filterResult;
                    each(expr.filters, function (filter) {
                        filterResult = changeExprCompareExprs(changeExpr, filter.args, model);
                        return !filterResult;
                    });

                    return filterResult ? 1 : 0;
                }

                return 1;
        }

        return 0;
    }

    // #region Model

    /**
     * 数据容器类
     *
     * @inner
     * @class
     * @param {Model} parent 父级数据容器
     */
    function Model(parent) {
        this.parent = parent;
        this.listeners = [];
        this.data = {};
    }

    /**
     * 数据变更类型枚举
     *
     * @inner
     * @const
     * @type {Object}
     */
    var ModelChangeType = {
        SET: 1,
        SPLICE: 2
    };

    /**
     * 添加数据变更的事件监听器
     *
     * @param {Function} listener 监听函数
     */
    Model.prototype.onChange = function (listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        }
    };

    /**
     * 移除数据变更的事件监听器
     *
     * @param {Function} listener 监听函数
     */
    Model.prototype.unChange = function (listener) {
        var len = this.listeners.length;
        while (len--) {
            if (!listener || this.listeners[len] === listener) {
                this.listeners.splice(len, 1);
            }
        }
    };

    /**
     * 触发数据变更
     *
     * @param {Object} change 变更信息对象
     */
    Model.prototype.fireChange = function (change) {
        each(this.listeners, function (listener) {
            listener.call(this, change);
        }, this);
    };

    /**
     * 获取数据项
     *
     * @param {string|Object?} expr 数据项路径
     * @return {*}
     */
    Model.prototype.get = function (expr) {
        var value = this.data;
        if (!expr) {
            return value;
        }

        expr = parseExpr(expr);

        if (expr.type === ExprType.ACCESSOR) {
            var paths = expr.paths;
            var start = 0;
            var l = paths.length;

            for (; start < l; start++) {
                if (paths[start].value == null) {
                    break;
                }
            }

            var i = 0;
            for (; value != null && i < start; i++) {
                value = value[paths[i].value];
            }

            if (value == null && this.parent) {
                value = this.parent.get({
                    type: ExprType.ACCESSOR,
                    paths: paths.slice(0, start)
                });
            }

            for (i = start; value != null && i < l; i++) {
                value = value[paths[i].value || evalExpr(paths[i], this)];
            }

            return value;
        }
    };

    /**
     * 设置数据项
     *
     * @param {string|Object} expr 数据项路径
     * @param {*} value 数据值
     * @param {Object=} option 设置参数
     * @param {boolean} option.silence 静默设置，不触发变更事件
     */
    Model.prototype.set = function (expr, value, option) {
        option = option || {};
        expr = parseExpr(expr);

        if (expr.type === ExprType.ACCESSOR) {
            var data = this.data;
            var prop;

            var paths = expr.paths;
            for (var i = 0, l = paths.length; i < l - 1; i++) {
                var pathValue = evalExpr(paths[i], this);

                if (data[pathValue] == null) {
                    data[pathValue] = {};
                }
                data = data[pathValue];
            }

            prop = evalExpr(paths[i], this);

            if (prop != null) {
                data[prop] = value;
                !option.silence && this.fireChange({
                    type: ModelChangeType.SET,
                    expr: expr,
                    value: value,
                    option: option
                });
            }
        }
    };

    /**
     * 数组数据项push操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {*} item 要push的值
     * @param {Object=} option 设置参数
     * @param {boolean} option.silence 静默设置，不触发变更事件
     */
    Model.prototype.push = function (expr, item, option) {
        var target = this.get(expr);

        if (target instanceof Array) {
            this.splice(expr, [target.length, 0, item], option);
        }
    };

    /**
     * 数组数据项pop操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {Object=} option 设置参数
     * @param {boolean} option.silence 静默设置，不触发变更事件
     * @return {*}
     */
    Model.prototype.pop = function (expr, option) {
        var target = this.get(expr);

        if (target instanceof Array) {
            var len = target.length;
            if (len) {
                return this.splice(expr, [len - 1, 1], option)[0];
            }
        }
    };

    /**
     * 数组数据项shift操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {Object=} option 设置参数
     * @param {boolean} option.silence 静默设置，不触发变更事件
     * @return {*}
     */
    Model.prototype.shift = function (expr, option) {
        return this.splice(expr, [0, 1], option)[0];
    };

    /**
     * 数组数据项unshift操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {*} item 要unshift的值
     * @param {Object=} option 设置参数
     * @param {boolean} option.silence 静默设置，不触发变更事件
     */
    Model.prototype.unshift = function (expr, item, option) {
        this.splice(expr, [0, 0, item], option);
    };

    /**
     * 数组数据项移除操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {number} index 要移除项的索引
     * @param {Object=} option 设置参数
     * @param {boolean} option.silence 静默设置，不触发变更事件
     */
    Model.prototype.removeAt = function (expr, index, option) {
        this.splice(expr, [index, 1], option);
    };

    /**
     * 数组数据项移除操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {*} value 要移除的项
     * @param {Object=} option 设置参数
     * @param {boolean} option.silence 静默设置，不触发变更事件
     */
    Model.prototype.remove = function (expr, value, option) {
        var target = this.get(expr);

        if (target instanceof Array) {
            var len = target.length;
            while (len--) {
                if (target[len] === value) {
                    this.splice(expr, [len, 1], option);
                    break;
                }
            }
        }
    };

    Model.prototype.splice = function (expr, args, option) {
        option = option || {};
        expr = parseExpr(expr);

        var target = this.get(expr);
        var returnValue = [];

        if (target instanceof Array) {
            var index = args[0];
            if (index < 0 || index > target.length) {
                return;
            }

            returnValue = target.splice.apply(target, args);

            !option.silence && this.fireChange({
                expr: expr,
                type: ModelChangeType.SPLICE,
                index: index,
                deleteCount: returnValue.length,
                value: returnValue,
                insertions: args.slice(2),
                option: option
            });
        }

        return returnValue;
    };

    /**
     * HTML Filter替换的字符实体表
     *
     * @const
     * @inner
     * @type {Object}
     */
    var HTML_ENTITY = {
        /* jshint ignore:start */
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        /* eslint-disable quotes */
        "'": '&#39;'
        /* eslint-enable quotes */
        /* jshint ignore:end */
    };

    /**
     * HTML Filter的替换函数
     *
     * @inner
     * @param {string} c 替换字符
     * @return {string} 替换后的HTML字符实体
     */
    function htmlFilterReplacer(c) {
        return HTML_ENTITY[c];
    }

    /**
     * HTML转义
     *
     * @param {string} source 源串
     * @return {string} 替换结果串
     */
    function escapeHTML(source) {
        if (source == null) {
            return '';
        }

        return String(source).replace(/[&<>"']/g, htmlFilterReplacer);
    }

    /**
     * 默认filter
     *
     * @inner
     * @const
     * @type {Object}
     */
    var DEFAULT_FILTERS = {

        /**
         * HTML转义filter
         *
         * @param {string} source 源串
         * @return {string} 替换结果串
         */
        html: escapeHTML,

        /**
         * URL编码filter
         *
         * @param {string} source 源串
         * @return {string} 替换结果串
         */
        url: encodeURIComponent,

        /**
         * 源串filter，用于在默认开启HTML转义时获取源串，不进行转义
         *
         * @param {string} source 源串
         * @return {string} 替换结果串
         */
        raw: function (source) {
            return source;
        },

        clazz: function (source) {
            if (source instanceof Array) {
                return source.join(' ');
            }

            return source;
        },

        style: function (source) {
            if (typeof source === 'object') {
                var result = '';
                for (var key in source) {
                    result += key + ':' + source[key] + ';';
                }

                return result;
            }

            return source;
        }
    };

    /**
     * 计算表达式的值
     *
     * @inner
     * @param {Object} expr 表达式对象
     * @param {Model} model 数据容器对象
     * @param {Component=} owner 所属组件环境
     * @param {boolean?} escapeInterpHtml 是否对插值进行html转义
     * @return {*}
     */
    function evalExpr(expr, model, owner, escapeInterpHtml) {
        switch (expr.type) {
            case ExprType.UNARY:
                return !evalExpr(expr.expr, model, owner);

            case ExprType.BINARY:
                var opHandler = BinaryOp[expr.operator];
                if (typeof opHandler === 'function') {
                    return opHandler(
                        evalExpr(expr.segs[0], model, owner),
                        evalExpr(expr.segs[1], model, owner)
                    );
                }
                return;

            case ExprType.TERTIARY:
                var cond = evalExpr(expr.segs[0], model, owner);
                return evalExpr(
                    cond ? expr.segs[1] : expr.segs[2],
                    model,
                    owner
                );

            case ExprType.STRING:
            case ExprType.NUMBER:
                return expr.value;

            case ExprType.ACCESSOR:
                return model.get(expr);

            case ExprType.INTERP:
                var value = evalExpr(expr.expr, model, owner);

                owner && each(expr.filters, function (filter) {
                    var filterName = filter.name;
                    /* eslint-disable no-use-before-define */
                    var filterFn = owner.filters[filterName] || DEFAULT_FILTERS[filterName];
                    /* eslint-enable no-use-before-define */

                    if (typeof filterFn === 'function') {
                        var args = [value];
                        each(filter.args, function (arg) {
                            args.push(evalExpr(arg, model, owner));
                        });

                        value = filterFn.apply(owner, args);
                    }
                });

                if (value == null) {
                    value = '';
                }

                return value;

            case ExprType.TEXT:
                var buf = new StringBuffer();
                each(expr.segs, function (seg) {
                    var segValue = evalExpr(seg, model, owner);

                    // escape html
                    if (escapeInterpHtml && seg.type === ExprType.INTERP && !seg.filters[0]) {
                        segValue = escapeHTML(segValue);
                    }

                    buf.push(segValue);
                });
                return buf.toString();
        }
    }

    // #region node



    /* eslint-disable fecs-valid-var-jsdoc */
    /**
     * 节点生命周期信息
     *
     * @inner
     * @type {Object}
     */
    var LifeCycles = {
        compiled: {
            value: 1
        },

        inited: {
            value: 2
        },

        created: {
            value: 3
        },

        attached: {
            value: 4,
            mutex: 'detached'
        },

        detached: {
            value: 5,
            mutex: 'attached'
        },

        disposed: {
            value: 6,
            mutex: '*'
        }
    };
    /* eslint-enable fecs-valid-var-jsdoc */

    /**
     * 生命周期类
     *
     * @inner
     * @class
     */
    function LifeCycle() {
        this.raw = {};
    }

    /**
     * 设置生命周期
     *
     * @param {string} name 生命周期名称
     */
    LifeCycle.prototype.set = function (name) {
        var lifeCycle = LifeCycles[name];
        if (!lifeCycle) {
            return;
        }

        if (lifeCycle.mutex === '*') {
            this.raw = {};
        }
        else if (lifeCycle.mutex) {
            this.raw[LifeCycles[lifeCycle.mutex].value] = 0;
        }

        this.raw[lifeCycle.value] = 1;
    };

    /**
     * 是否位于生命周期
     *
     * @param {string} name 生命周期名称
     * @return {boolean}
     */
    LifeCycle.prototype.is = function (name) {
        var lifeCycle = LifeCycles[name];
        if (lifeCycle) {
            return !!this.raw[lifeCycle.value];
        }

        return false;
    };

    /**
     * 节点基类
     *
     * @inner
     * @class
     * @param {Object} options 初始化参数
     * @param {ANode} options.aNode 抽象信息节点对象
     * @param {Component=} options.owner 所属的组件对象
     */
    function Node(options) {
        options = options || {};

        this.lifeCycle = new LifeCycle();
        this.init(options);
    }

    /**
     * 使节点到达相应的生命周期，并调用钩子
     *
     * @protected
     * @param {string} name 生命周期名称
     */
    Node.prototype._callHook = function (name) {
        if (this.lifeCycle.is(name)) {
            return;
        }

        this.lifeCycle.set(name);

        if (typeof this['_' + name] === 'function') {
            this['_' + name].call(this);
        }

        if (typeof this[name] === 'function') {
            this[name].call(this);
        }
    };

    /**
     * 初始化
     *
     * @param {Object} options 初始化参数
     */
    Node.prototype.init = function (options) {
        this._init(options);
        this._callHook('inited');
    };

    /**
     * 初始化行为
     *
     * @param {Object} options 初始化参数
     */
    Node.prototype._init = function (options) {
        this.owner = options.owner;
        this.parent = options.parent;
        this.parentComponent = this.parent instanceof Component
            ? this.parent
            : this.parent && this.parent.parentComponent;

        this.scope = options.scope;
        this.aNode = this.aNode || options.aNode;
        this.el = options.el;

        this.id = (this.el && this.el.id)
            || (this.aNode && this.aNode.id)
            || guid();
    };

    /**
     * 创建完成后的行为
     */
    Node.prototype._created = function () {
        if (!this.el) {
            this.el = document.getElementById(this.id);
        }
    };

    /**
     * 通知自己和childs完成attached状态
     *
     * @protected
     */
    Node.prototype._noticeAttached = function () {
        each(this.childs, function (child) {
            child._noticeAttached();
        });

        this._callHook('created');
        this._callHook('attached');
    };

    /**
     * 销毁释放元素
     */
    Node.prototype.dispose = function () {
        this._dispose();
        this._callHook('disposed');
    };

    /**
     * 销毁释放元素行为
     */
    Node.prototype._dispose = function () {
        this.el = null;
        this.owner = null;
        this.scope = null;
        this.aNode = null;
        this.parent = null;
        this.parentComponent = null;
    };

    /**
     * 计算表达式的结果
     *
     * @param {Object} expr 表达式对象
     * @param {boolean} escapeInterpHtml 是否要对插值结果进行html转义
     * @return {*}
     */
    Node.prototype.evalExpr = function (expr, escapeInterpHtml) {
        return evalExpr(expr, this.scope, this.owner, escapeInterpHtml);
    };

    /**
     * 创建桩的html
     *
     * @inner
     * @param {Node} node 节点对象
     * @return {string}
     */
    function genStumpHTML(node) {
        return '<script type="text/san" id="' + node.id + '"></script>';
    }

    /**
     * 文本节点类
     *
     * @inner
     * @class
     * @param {Object} options 初始化参数
     * @param {ANode} options.aNode 抽象信息节点对象
     * @param {Component} options.owner 所属的组件对象
     */
    function TextNode(options) {
        Node.call(this, options);
    }

    inherits(TextNode, Node);

    /**
     * 初始化行为
     *
     * @param {Object} options 初始化参数
     */
    TextNode.prototype._init = function (options) {
        Node.prototype._init.call(this, options);

        // from el
        if (this.el) {
            this.aNode.isText = true;
            this.aNode.textExpr = parseText(this.el.innerHTML);
            this.parent._pushChildANode(this.aNode);
        }

        var segs = this.aNode.textExpr.segs;
        this._static = segs.length === 1 && segs[0].type === ExprType.STRING;
    };

    /**
     * 初始化完成后的行为
     */
    TextNode.prototype._inited = function () {
        if (this.el) {
            this._callHook('created');

            if (this.el.parentNode) {
                this._callHook('attached');
            }
        }
    };

    /**
     * 生成文本节点的HTML
     *
     * @return {string}
     */
    TextNode.prototype.genHTML = function () {
        var defaultText = isFEFFBeforeStump ? '\uFEFF' : '';
        return (this.evalExpr(this.aNode.textExpr, 1) || defaultText)
            + (this._static ? '' : genStumpHTML(this));
    };

    /**
     * 刷新文本节点的内容
     */
    TextNode.prototype.update = function () {
        var node = this.el.previousSibling;

        if (node && node.nodeType === 3) {
            var textProp = typeof node.textContent === 'string'
                ? 'textContent'
                : 'data';
            node[textProp] = this.evalExpr(this.aNode.textExpr);
        }
        else {
            this.el.insertAdjacentHTML(
                'beforebegin',
                this.evalExpr(this.aNode.textExpr, 1)
            );
        }
    };

    /**
     * 视图更新函数
     *
     * @param {Array} changes 数据变化信息
     */
    TextNode.prototype.updateView = function (changes) {
        each(changes, function (change) {
            if (changeExprCompare(change.expr, this.aNode.textExpr, this.scope)) {
                this.update();
                return false;
            }
        }, this);
    };


    // #region Element

    /**
     * 元素存储对象
     *
     * @inner
     * @type {Object}
     */
    var elementContainer = {};

    /**
     * 元素类
     *
     * @inner
     * @class
     * @param {Object} options 初始化参数
     * @param {ANode} options.aNode 抽象信息节点对象
     * @param {Component} options.owner 所属的组件对象
     */
    function Element(options) {
        this.childs = [];
        this.listeners = {};

        Node.call(this, options);
    }

    inherits(Element, Node);

    /**
     * 初始化行为
     *
     * @param {Object} options 初始化参数
     */
    Element.prototype._init = function (options) {
        Node.prototype._init.call(this, options);

        if (this.el) {
            this._initFromEl(options);
        }

        elementContainer[this.id] = this;

        this.tagName = this.tagName || this.aNode.tagName || 'div';
        // ie8- 不支持innerHTML输出自定义标签
        if (ie && ie < 9 && /^[a-z0-9]+-[a-z0-9]+$/i.test(this.tagName)) {
            this.tagName = 'div';
        }
    };

    /**
     * 从已有的el进行初始化
     */
    Element.prototype._initFromEl = function () {
        this.aNode = parseANodeFromEl(this.el);
        this.parent._pushChildANode(this.aNode);
        this.tagName = this.aNode.tagName;
    };

    /**
     * 初始化完成后的行为
     */
    Element.prototype._inited = function () {
        // ie 下，如果 option 没有 value 属性，select.value = xx 操作不会选中 option
        // 所以没有设置 value 时，默认把 option 的内容作为 value
        if (this.tagName === 'option'
            && !this.aNode.props.get('value')
            && this.aNode.childs[0]
        ) {
            this.aNode.props.push({
                name: 'value',
                expr: this.aNode.childs[0].textExpr
            });
        }

        this.props = this.binds = this.aNode.props;
        this._initPropHandlers();

        if (this.el) {
            this.tagName = this.el.tagName.toLowerCase();

            compileChildsFromEl(this);
            this._callHook('created');

            if (this.el.parentNode) {
                this._callHook('attached');
            }
        }
    };

    /**
     * 创建元素DOM行为
     */
    Element.prototype._create = function () {
        if (!this.el) {
            this.el = createEl(this.tagName);
            this.el.id = this.id;

            this.props.each(function (prop) {
                var value = this instanceof Component
                    ? evalExpr(prop.expr, this.data, this)
                    : this.evalExpr(prop.expr, 1);

                var match = /^\s+([a-z0-9_-]+)=(['"])([^\2]*)\2$/.exec(
                    getPropHandler(this, prop.name)
                        .input
                        .attr(this, prop.name, value)
                );

                if (match) {
                    this.el.setAttribute(match[1], match[3]);
                }
            }, this);
        }
    };

    /**
     * 创建元素DOM
     */
    Element.prototype.create = function () {
        if (!this.lifeCycle.is('created')) {
            this._create();
            this._callHook('created');
        }
    };

    /**
     * 完成创建元素DOM后的行为
     */
    Element.prototype._created = function () {
        Node.prototype._created.call(this);
        this._initSelfChanger();
        this.bindEvents();
    };

    /**
     * 处理自身变化时双绑的逻辑
     *
     * @private
     */
    Element.prototype._initSelfChanger = function () {
        this.binds && this.binds.each(function (bindInfo) {
            if (!bindInfo.x) {
                return;
            }

            var outputer = bind(bindOutputer, this, bindInfo);
            switch (bindInfo.name) {
                case 'value':
                    switch (this.tagName) {
                        case 'input':
                        case 'textarea':
                            if (root.CompositionEvent) {
                                this.on('compositionstart', function () {
                                    this.composing = 1;
                                });
                                this.on('compositionend', function () {
                                    this.composing = 0;

                                    var event = document.createEvent('HTMLEvents');
                                    event.initEvent('input', true, true);
                                    this.dispatchEvent(event);
                                });
                            }

                            this.on(
                                ('oninput' in this.el) ? 'input' : 'propertychange',
                                function (e) {
                                    if (!this.composing) {
                                        outputer(e);
                                    }
                                }
                            );

                            break;

                        case 'select':
                            this.on('change', outputer);
                            break;
                    }
                    break;

                case 'checked':
                    switch (this.tagName) {
                        case 'input':
                            switch (this.el.type) {
                                case 'checkbox':
                                case 'radio':
                                    this.on('click', outputer);
                            }
                    }
                    break;
            }

        }, this);
    };


    /**
     * HTML 属性和 DOM 操作属性的对照表
     *
     * @inner
     * @const
     * @type {Object}
     */
    var HTML_ATTR_PROP_MAP = {
        'readonly': 'readOnly',
        'cellpadding': 'cellPadding',
        'cellspacing': 'cellSpacing',
        'colspan': 'colSpan',
        'rowspan': 'rowSpan',
        'valign': 'vAlign',
        'usemap': 'useMap',
        'frameborder': 'frameBorder',
        'for': 'htmlFor',
        'class': 'className'
    };

    /**
     * 默认的元素的属性设置的变换方法
     *
     * @inner
     * @type {Object}
     */
    var defaultElementPropHandler = {
        input: {
            attr: function (element, name, value) {
                if (value != null) {
                    return ' ' + name + '="' + value + '"';
                }
            },

            prop: function (element, name, value) {
                name = HTML_ATTR_PROP_MAP[name] || name;
                if (svgTags[element.tagName]) {
                    element.el.setAttribute(name, value);
                }
                else {
                    element.el[name] = value;
                }
            }
        },

        output: function (element, bindInfo) {
            element.scope.set(bindInfo.expr, element.el[bindInfo.name], {
                target: {
                    id: element.id,
                    prop: bindInfo.name
                }
            });
        }
    };

    /**
     * 生成 bool 类型属性绑定操作的变换方法
     *
     * @inner
     * @param {string} attrName 属性名
     * @param {Array} tagNames 匹配的元素名
     * @return {Object}
     */
    function genBoolPropHandler(attrName, tagNames) {
        attrName = attrName.toLowerCase();

        return {
            input: {
                attr: function (element, name, value) {
                    // 因为元素的attr值必须经过html escape，否则可能有漏洞
                    // 所以这里直接对假值字符串形式进行处理
                    // NaN之类非主流的就先不考虑了
                    if (value && value !== 'false' && value !== '0') {
                        return ' ' + attrName + '="' + attrName + '"';
                    }
                },

                prop: function (element, name, value) {
                    var propName = HTML_ATTR_PROP_MAP[attrName] || attrName;
                    element.el[propName] = !!(value && value !== 'false' && value !== '0');
                }
            },

            choose: function (element) {
                if (contains(tagNames, element.tagName)) {
                    return attrName;
                }
            }
        };
    }

    /**
     * 元素的属性设置的变换方法集合
     *
     * @inner
     * @type {Array}
     */
    var elementPropHandlers = [
        // 表单元素(input / button / textarea / select) 的 disabled
        genBoolPropHandler('disabled', ['input', 'textarea', 'button', 'select']),

        // 表单元素(input / textarea) 的 readonly
        genBoolPropHandler('readonly', ['input', 'textarea']),

        // 表单元素(input) 的 mutiple
        genBoolPropHandler('mutiple', ['input']),

        // input[type=checkbox] 的 checked bind handler
        {
            input: {
                attr: function (element, name, value) {
                    var bindValue = element.props.get('value');
                    if (bindValue) {
                        if (contains(value, element.evalExpr(bindValue.expr))) {
                            return ' checked="checked"';
                        }
                    }
                },

                prop: function (element, name, value) {
                    var bindValue = element.props.get('value');
                    if (bindValue) {
                        if (contains(value, element.evalExpr(bindValue.expr))) {
                            element.el.checked = true;
                            return;
                        }
                    }

                    element.el.checked = false;
                }
            },

            output: function (element, bindInfo) {
                var el = element.el;
                element.scope[el.checked ? 'push' : 'remove'](bindInfo.expr, el.value);
            },

            choose: function (element) {
                if (element.aNode) {
                    var bindType = element.props.get('type');
                    return element.tagName === 'input'
                        && bindType && bindType.raw === 'checkbox'
                        && 'checked';
                }
            }
        },

        // input[type=radio] 的 checked bind handler
        {
            input: {
                attr: function (element, name, value) {
                    var bindValue = element.props.get('value');
                    if (bindValue) {
                        if (value === element.evalExpr(bindValue.expr)) {
                            return ' checked="checked"';
                        }
                    }
                },

                prop: function (element, name, value) {
                    var bindValue = element.props.get('value');
                    if (bindValue) {
                        if (value === element.evalExpr(bindValue.expr)) {
                            element.el.checked = true;
                            return;
                        }
                    }

                    element.el.checked = false;
                }
            },

            output: function (element, bindInfo) {
                var el = element.el;
                element.scope.set(bindInfo.expr, el.checked ? el.value : '', {
                    target: {
                        id: element.id,
                        prop: bindInfo.name
                    }
                });
            },

            choose: function (element) {
                if (element.aNode) {
                    var bindType = element.props.get('type');
                    return element.tagName === 'input'
                        && bindType && bindType.raw === 'radio'
                        && 'checked';
                }
            }
        },

        // option value bind handler，附加 selected
        {
            input: {
                attr: function (element, name, value) {
                    var attrStr = defaultElementPropHandler.input.attr(element, name, value);
                    var parent = element.parent;
                    var parentValueProp;

                    if (parent.tagName === 'select'
                        && (parentValueProp = parent.props.get('value'))
                        && parent.evalExpr(parentValueProp.expr) === value
                    ) {
                        attrStr += ' selected';
                    }

                    return attrStr;
                },

                prop: defaultElementPropHandler.input.prop
            },

            choose: function (element) {
                return 'option' === element.tagName && 'value';
            }
        },

        // textarea 的 value bind handler
        {
            input: {
                attr: function () {},

                prop: function (element, name, value) {
                    element.el[name] = value;
                }
            },

            output: defaultElementPropHandler.output,

            choose: function (element) {
                return 'textarea' === element.tagName && 'value';
            }
        },

        // style 的 bind handler
        {
            input: {
                attr: function (element, name, value) {
                    if (value) {
                        return ' style="' + value + '"';
                    }
                },

                prop: function (element, name, value) {
                    element.el.style.cssText = value;
                }
            },

            choose: function () {
                return 'style';
            }
        }
    ];

    /**
     * 初始化元素属性操作的处理器
     * 元素属性操作和具体名称可能不同，比如style操作的是style.cssText等等
     * 所以需要一些 handler 做输入输出的属性名与值变换。这里就是初始化这些 handler
     */
    Element.prototype._initPropHandlers = function () {
        this.propHandlers = {};
        each(
            elementPropHandlers,
            function (propHandler) {
                var name = propHandler.choose(this);
                if (name) {
                    this.propHandlers[name] = propHandler;
                }
            },
            this
        );
    };

    function getPropHandler(element, name) {
        return element.propHandlers[name] || defaultElementPropHandler;
    }

    function bindOutputer(bindInfo) {
        getPropHandler(this, bindInfo.name).output(this, bindInfo);
    }

    /**
     * 将元素attach到页面
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
    Element.prototype.attach = function (parentEl, beforeEl) {
        if (!this.lifeCycle.is('attached')) {
            this._attach(parentEl, beforeEl);
            this._noticeAttached();
        }
    };

    /**
     * 将元素attach到页面的行为
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
    Element.prototype._attach = function (parentEl, beforeEl) {
        this.create();

        this.el.innerHTML = elementGenChildsHTML(this);

        if (parentEl) {
            if (beforeEl) {
                parentEl.insertBefore(this.el, beforeEl);
            }
            else {
                parentEl.appendChild(this.el);
            }
        }
    };

    /**
     * 普适事件监听函数
     *
     * @inner
     * @param {Object} eventBind 绑定信息对象
     * @param {Event} e 事件对象
     */
    function elementEventListener(eventBind, e) {
        var args = [];
        var expr = eventBind.expr;

        each(expr.args, function (argExpr) {
            args.push(argExpr.type === ExprType.ACCESSOR
                    && argExpr.paths.length === 1
                    && argExpr.paths[0].value === '$event'
                ? (this instanceof Component ? e : e || window.event)
                : this.evalExpr(argExpr)
            );
        }, this);

        var owner = this.owner;
        if (this instanceof Component && eventBind.isOwn) {
            owner = this;
        }

        var method = owner[expr.name];
        if (typeof method === 'function') {
            method.apply(owner, args);
        }
    }

    /**
     * 绑定事件
     */
    Element.prototype.bindEvents = function () {
        each(this.aNode.events, function (eventBind) {
            this.on(eventBind.name, bind(elementEventListener, this, eventBind));
        }, this);
    };

    /**
     * 解除绑定事件
     */
    Element.prototype.unbindEvents = function () {
        var listeners = this.listeners;

        for (var key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                this.un(key);
            }
        }

        this.listeners = null;
    };

    /**
     * 派发事件
     *
     * @param {string} name 事件名
     * @param {Object} event 事件对象
     */
    Element.prototype.fire = function (name, event) {
        each(this.listeners[name], function (listener) {
            listener.call(this, event);
        }, this);
    };

    /**
     * 添加事件监听器
     *
     * @param {string} name 事件名
     * @param {Function} listener 监听器
     */
    Element.prototype.on = function (name, listener) {
        if (typeof listener === 'function') {
            if (!this.listeners[name]) {
                this.listeners[name] = [];
            }
            this.listeners[name].push(listener);

            on(this.el, name, listener);
        }
    };

    /**
     * 移除事件监听器
     *
     * @param {string} name 事件名
     * @param {Function=} listener 监听器
     */
    Element.prototype.un = function (name, listener) {
        var nameListeners = this.listeners[name];
        var len = nameListeners && nameListeners.length;

        while (len--) {
            var fn = nameListeners[len];
            if (!listener || listener === fn) {
                nameListeners.splice(len, 1);
                un(this.el, name, fn);
            }
        }
    };

    /**
     * 生成元素的html
     *
     * @return {string}
     */
    Element.prototype.genHTML = function () {
        var buf = new StringBuffer();

        elementGenStartHTML(this, buf);
        buf.push(elementGenChildsHTML(this));
        elementGenCloseHTML(this, buf);

        return buf.toString();
    };

    /**
     * 生成元素标签起始的html
     *
     * @inner
     * @param {Element} element 元素
     * @param {StringBuffer} stringBuffer html串存储对象
     */
    function elementGenStartHTML(element, stringBuffer) {
        if (!element.tagName) {
            return;
        }

        stringBuffer.push('<');
        stringBuffer.push(element.tagName);
        stringBuffer.push(' id="');
        stringBuffer.push(element.id);
        stringBuffer.push('"');

        element.props.each(function (prop) {
            var value = this instanceof Component
                ? evalExpr(prop.expr, this.data, this)
                : this.evalExpr(prop.expr, 1);

            stringBuffer.push(
                getPropHandler(this, prop.name)
                    .input
                    .attr(this, prop.name, value)
                || ''
            );
        }, element);

        stringBuffer.push('>');
    }

    /**
     * 生成元素标签结束的html
     *
     * @inner
     * @param {Element} element 元素
     * @param {StringBuffer} stringBuffer html串存储对象
     */
    function elementGenCloseHTML(element, stringBuffer) {
        var tagName = element.tagName;

        if (!tagIsAutoClose(tagName)) {
            stringBuffer.push('</');
            stringBuffer.push(tagName);
            stringBuffer.push('>');
        }
    }

    /**
     * 生成元素的子元素html
     *
     * @inner
     * @param {Element} element 元素
     * @return {string}
     */
    function elementGenChildsHTML(element) {
        if (element.tagName === 'textarea') {
            var valueProp = element.props.get('value');
            return valueProp ? escapeHTML(element.evalExpr(valueProp.expr)) : '';
        }

        var buf = new StringBuffer();

        each(element.aNode.childs, function (aNodeChild) {
            var child = createNode(aNodeChild, element);
            if (!this._static) {
                element.childs.push(child);
            }
            buf.push(child.genHTML());
        });

        return buf.toString();
    }

    /**
     * 设置元素属性
     *
     * @param {string} name 属性名称
     * @param {*} value 属性值
     */
    Element.prototype.setProp = function (name, value) {
        if (this.lifeCycle.is('created')) {
            getPropHandler(this, name).input.prop(this, name, value);
        }
    };

    /**
     * 判断变更是否来源于元素，来源于元素时，视图更新需要阻断
     *
     * @inner
     * @param {Object} change 变更对象
     * @param {Element} element 元素
     * @param {string?} propName 属性名，可选。需要精确判断是否来源于此属性时传入
     * @return {boolean}
     */
    function isDataChangeByElement(change, element, propName) {
        var changeTarget = change.option.target;
        return changeTarget && changeTarget.id === element.id
            && (!propName || changeTarget.prop === propName);
    }

    /**
     * 视图更新函数
     *
     * @param {Array} changes 数据变化信息
     */
    Element.prototype.updateView = function (changes) {
        this.props.each(function (prop) {
            each(changes, function (change) {
                if (!isDataChangeByElement(change, this, prop.name)
                    && changeExprCompare(change.expr, prop.expr, this.scope)
                ) {
                    this.setProp(prop.name, this.evalExpr(prop.expr));
                    return false;
                }
            }, this);
        }, this);

        each(this.childs, function (child) {
            child.updateView(changes);
        });
    };


    /**
     * 将元素从页面上移除
     */
    Element.prototype.detach = function () {
        if (this.lifeCycle.is('attached')) {
            this._detach();
            this._callHook('detached');
        }
    };

    /**
     * 将元素从页面上移除的行为
     */
    Element.prototype._detach = function () {
        removeEl(this.el);
    };

    /**
     * 销毁释放元素的行为
     */
    Element.prototype._dispose = function () {
        this._disposeChilds();
        this.detach();
        this.unbindEvents();

        this.el = null;
        this.childs = null;

        this.propHandlers = null;
        this.props = null;
        this.binds = null;
        elementContainer[this.id] = null;
        Node.prototype._dispose.call(this);
    };

    /**
     * 销毁释放子元素的行为
     */
    Element.prototype._disposeChilds = function () {
        each(this.childs, function (child) {
            child.dispose();
        });
        this.childs.length = 0;
    };

    /**
     * 添加子节点的 ANode
     * 用于从 el 初始化时，需要将解析的元素抽象成 ANode，并向父级注册
     *
     * @param {ANode} aNode 抽象节点对象
     */
    Element.prototype._pushChildANode = function (aNode) {
        this.aNode.childs.push(aNode);
    };

    /**
     * slot 元素类
     *
     * @class
     * @param {Object} options 初始化参数
     */
    function SlotElement(options) {
        this.childs = [];
        Node.call(this, options);
    }

    inherits(SlotElement, Node);

    /**
     * 初始化行为
     *
     * @param {Object} options 初始化参数
     */
    SlotElement.prototype._init = function (options) {
        var nameBind = options.aNode.props.get('name');
        this.name = nameBind ? nameBind.raw : '____';

        var literalOwner = options.owner;
        var givenSlots = literalOwner.aNode.givenSlots;
        var givenChilds = givenSlots && givenSlots[this.name];


        var aNode = new ANode();
        if (givenChilds) {
            aNode.childs = givenChilds;
            options.owner = literalOwner.owner;
            options.scope = literalOwner.scope;
        }
        else {
            aNode.childs = options.aNode.childs.slice(0);
        }

        options.aNode = aNode;
        Node.prototype._init.call(this, options);
    };

    /**
     * 初始化完成后的行为
     */
    SlotElement.prototype._inited = function () {
        this.owner.slotChilds.push(this);
    };

    /**
     * 生成元素的html
     *
     * @return {string}
     */
    SlotElement.prototype.genHTML = function () {
        return elementGenChildsHTML(this);
    };

    /**
     * 隔离实际所属组件对其的视图更新调用。更新应由outer组件调用
     */
    SlotElement.prototype.updateView = function () {
    };

    /**
     * 视图更新函数
     *
     * @param {Array} changes 数据变化信息
     */
    SlotElement.prototype.slotUpdateView = function (changes) {
        each(this.childs, function (child) {
            child.updateView(changes);
        });
    };

    /**
     * 销毁释放元素行为
     */
    SlotElement.prototype._dispose = function () {
        Element.prototype._disposeChilds.call(this);
        Node.prototype._dispose.call(this);
    };


    // #region Component

    /**
     * 组件类
     *
     * @class
     * @param {Object} options 初始化参数
     */
    function Component(options) {
        this.slotChilds = [];
        this.data = new Model();
        this.dataChanges = [];

        Element.call(this, options);
    }

    inherits(Component, Element);

    /**
     * 初始化
     *
     * @param {Object} options 初始化参数
     */
    Component.prototype.init = function (options) {
        this.filters = this.filters || this.constructor.filters || {};
        this.computed = this.computed || this.constructor.computed || {};
        this.messages = this.messages || this.constructor.messages || {};

        // compile
        this._compile();

        if (!options.el) {
            var protoANode = this.constructor.prototype.aNode;

            if (options.aNode) {
                var givenANode = options.aNode;

                // 组件运行时传入的结构，做slot解析
                var givenSlots = {};
                each(givenANode.childs, function (child) {
                    var slotName = '____';
                    var slotBind = !child.isText && child.props.get('slot');
                    if (slotBind) {
                        slotName = slotBind.raw;
                    }

                    if (!givenSlots[slotName]) {
                        givenSlots[slotName] = [];
                    }

                    givenSlots[slotName].push(child);
                }, this);

                this.aNode = new ANode({
                    tagName: protoANode.tagName || givenANode.tagName,
                    givenSlots: givenSlots,

                    // 组件的实际结构应为template编译的结构
                    childs: protoANode.childs,

                    // 合并运行时的一些绑定和事件声明
                    props: protoANode.props,
                    binds: givenANode.props,
                    events: givenANode.events.concat(protoANode.events),
                    directives: givenANode.directives.concat(protoANode.directives)
                });
            }
        }

        this._callHook('compiled');


        Element.prototype._init.call(this, options);
        this.binds = this.aNode.binds || new IndexedList();
        this.binds.each(function (bind) {
            var expr = bind.expr;

            // 当 text 解析只有一项时，要么就是 string，要么就是 interp
            // interp 有可能是绑定到组件属性的表达式，不希望被 eval text 成 string
            // 所以这里做个处理，只有一项时直接抽出来
            if (expr.type === ExprType.TEXT && expr.segs.length === 1) {
                expr = bind.expr = expr.segs[0];
                if (expr.type === ExprType.INTERP && expr.filters.length === 0) {
                    bind.expr = expr.expr;
                }
            }
        });
        this.props = this.aNode.props;

        // init data
        var initData = options.data
            || (typeof this.initData === 'function' && this.initData());
        for (var key in initData) {
            if (initData.hasOwnProperty(key)) {
                this.data.set(key, initData[key]);
            }
        }

        this.scope && this.binds.each(function (bind) {
            this.data.set(bind.name, this.evalExpr(bind.expr));
        }, this);

        this.computedDeps = {};
        for (var expr in this.computed) {
            if (!this.computedDeps[expr]) {
                this._calcComputed(expr);
            }
        }

        this._callHook('inited');
    };

    /**
     * 计算 computed 属性的值
     *
     * @private
     * @param {string} computedExpr computed表达式串
     */
    Component.prototype._calcComputed = function (computedExpr) {
        var computedDeps = this.computedDeps[computedExpr];
        if (!computedDeps) {
            computedDeps = this.computedDeps[computedExpr] = {};
        }

        this.data.set(computedExpr, this.computed[computedExpr].call({
            data: {
                get: bind(function (expr) {
                    if (expr) {
                        if (!computedDeps[expr]) {
                            computedDeps[expr] = 1;

                            if (this.computed[expr]) {
                                this._calcComputed(expr);
                            }

                            this.watch(expr, function () {
                                this._calcComputed(computedExpr);
                            });
                        }

                        return this.data.get(expr);
                    }

                    // #begin-ignore
//                    throw new Error('[SAN ERROR] call get method in computed need argument');
                    // #end-ignore
                }, this)
            }
        }));
    };

    /**
     * 初始化完成后的行为
     * 清空Element.prototype._inited的行为
     */
    Component.prototype._inited = function () {
        this._initPropHandlers();

        // 如果从el编译的，认为已经attach了，触发钩子
        if (this._isInitFromEl) {
            this._callHook('created');
            this._callHook('attached');
        }
    };

    // #begin-ignore
//    /**
//     * attach 完成后的行为
//     * 通知devtool
//     */
//    Component.prototype._attached = function () {
//        emitDevTool('comp-attached', this);
//    };
//
//    /**
//     * detach 完成后的行为
//     * 通知devtool
//     */
//    Component.prototype._detached = function () {
//        emitDevTool('comp-detached', this);
//    };
//
//    /**
//     * update 完成后的行为
//     * 通知devtool
//     */
//    Component.prototype._updated = function () {
//        emitDevTool('comp-updated', this);
//    };
    // #end-ignore

    /**
     * 派发消息
     * 组件可以派发消息，消息将沿着组件树向上传递，直到遇上第一个处理消息的组件
     *
     * @param {string} name 消息名称
     * @param {*?} value 消息值
     */
    Component.prototype.dispatch = function (name, value) {
        var parentComponent = this.parentComponent;

        while (parentComponent) {
            if (typeof parentComponent.messages[name] === 'function') {
                parentComponent.messages[name].call(
                    parentComponent,
                    {target: this, value: value}
                );
                break;
            }

            parentComponent = parentComponent.parentComponent;
        }
    };

    /**
     * 获取带有 san-ref 指令的子组件引用
     *
     * @param {string} name 子组件的引用名
     * @return {Component}
     */
    Component.prototype.ref = function (name) {
        var refComponent;
        var owner = this;

        function childsTraversal(element) {
            each(element.childs, function (child) {
                if (child instanceof Component) {
                    var refDirective = child.aNode.directives.get('ref');
                    if (refDirective
                        && evalExpr(refDirective.value, child.scope || owner.data, owner) === name
                    ) {
                        refComponent = child;
                    }
                }
                else if (child instanceof Element) {
                    childsTraversal(child);
                }

                return !refComponent;
            });
        }


        childsTraversal(this);
        each(this.slotChilds, function (slotChild) {
            childsTraversal(slotChild);
            return !refComponent;
        });
        return refComponent;
    };

    /**
     * 从存在的 el 中编译抽象节点
     */
    Component.prototype._initFromEl = function () {
        this._isInitFromEl = true;
        this.aNode = parseANodeFromEl(this.el);
        this.aNode.binds = this.aNode.props;
        this.aNode.props = new IndexedList();

        this.parent && this.parent._pushChildANode(this.aNode);
        compileChildsFromEl(this);
    };

    /**
     * 遍历和编译已有元素的孩子
     *
     * @inner
     * @param {HTMLElement} element 已有元素
     */
    function compileChildsFromEl(element) {
        var walker = new DOMChildsWalker(element.el);
        var current;
        while ((current = walker.current)) {
            var child = createNodeByEl(current, element, walker);
            if (child) {
                element.childs.push(child);
            }

            walker.goNext();
        }
    }

    /**
     * 创建节点的工厂方法
     *
     * @inner
     * @param {ANode} aNode 抽象节点
     * @param {Node} parent 父亲节点
     * @param {Model=} scope 所属数据环境
     * @return {Node}
     */
    function createNode(aNode, parent, scope) {
        var owner = parent instanceof Component ? parent : parent.owner;
        // scope = scope || owner.data;
        scope = scope || (parent instanceof Component ? parent.data : parent.scope);
        var options = {
            aNode: aNode,
            owner: owner,
            scope: scope,
            parent: parent
        };

        if (aNode.isText) {
            return new TextNode(options);
        }

        if (aNode.directives.get('if')) {
            return new IfDirective(options);
        }

        if (aNode.directives.get('else')) {
            return new ElseDirective(options);
        }

        if (aNode.directives.get('for')) {
            return new ForDirective(options);
        }

        var ComponentType = owner.components[aNode.tagName];
        if (ComponentType) {
            return new ComponentType(options);
        }

        if (aNode.tagName === 'slot') {
            return new SlotElement(options);
        }

        return new Element(options);
    }

    /**
     * 通过存在的 el 创建节点的工厂方法
     *
     * @inner
     * @param {HTMLElement} el 页面中存在的元素
     * @param {Node} parent 父亲节点
     * @param {DOMChildsWalker} elWalker 遍历元素的功能对象
     * @return {Node}
     */
    function createNodeByEl(el, parent, elWalker) {
        var owner = parent instanceof Component ? parent : parent.owner;

        // find component class
        var tagName = el.tagName.toLowerCase();
        var ComponentClass = null;

        if (tagName.indexOf('-') > 0) {
            ComponentClass = owner.components[tagName];
        }

        var componentName = el.getAttribute('san-component');
        if (componentName) {
            ComponentClass = owner.components[componentName];
        }

        var option = {
            owner: owner,
            scope: owner.data,
            parent: parent,
            el: el,
            elWalker: elWalker
        };

        // as Component
        if (ComponentClass) {
            return new ComponentClass(option);
        }

        // as normal Element
        var childANode = parseANodeFromEl(el);
        var stumpName = el.getAttribute('san-stump');
        option.aNode = childANode;

        if (childANode.directives.get('if') || stumpName === 'if') {
            return new IfDirective(option);
        }

        if (childANode.directives.get('else') || stumpName === 'else') {
            return new ElseDirective(option);
        }

        if (childANode.directives.get('for') || stumpName === 'for') {
            return new ForDirective(option);
        }

        if (isStump(el)) {
            // as TextNode
            return new TextNode(option);
        }

        // as Element
        return new Element(option);
    }

    /**
     * 解析元素自身的 ANode
     *
     * @inner
     * @param {HTMLElement} el 页面元素
     * @return {ANode}
     */
    function parseANodeFromEl(el) {
        var aNode = new ANode();
        aNode.tagName = el.tagName.toLowerCase();

        each(
            el.attributes,
            function (attr) {
                integrateAttr(aNode, attr.name, attr.value, true);
            }
        );

        return aNode;
    }

    /**
     * 判断一个元素是不是桩
     *
     * @inner
     * @param {HTMLElement} element 要判断的元素
     * @return {boolean}
     */
    function isStump(element) {
        return element.tagName === 'SCRIPT' && element.type === 'text/san';
    }

    /**
     * 元素子节点遍历操作对象
     *
     * @inner
     * @class
     * @param {HTMLElement} el 要遍历的元素
     */
    function DOMChildsWalker(el) {
        this.raw = [];
        this.index = 0;

        var child = el.firstChild;
        while (child) {
            if (child.nodeType === 1) {
                this.raw.push(child);
            }

            child = child.nextSibling;
        }

        this.current = this.raw[this.index];
        this.next = this.raw[this.index + 1];
    }

    /**
     * 往下走一个元素
     */
    DOMChildsWalker.prototype.goNext = function () {
        this.current = this.raw[++this.index];
        this.next = this.raw[this.index + 1];
    };

    var componentPropExtra = [
        {name: 'class', expr: parseText("{{class ? ' ' + class : ''}}")},
        {name: 'style', expr: parseText("{{style ? ';' + style : ''}}")}
    ];


    /**
     * 模板编译行为
     *
     * @private
     */
    Component.prototype._compile = function () {
        var ComponentClass = this.constructor;
        var proto = ComponentClass.prototype;

        // pre define components class
        if (!proto._isComponentsReady) {
            proto.components = proto.components || ComponentClass.components || {};
            var components = proto.components;

            for (var key in components) {
                var componentClass = components[key];

                if (typeof componentClass === 'object') {
                    components[key] = defineComponent(componentClass);
                }
                else if (componentClass === 'self') {
                    components[key] = ComponentClass;
                }
            }

            proto._isComponentsReady = 1;
        }


        // pre compile template
        if (!proto.aNode) {
            proto.aNode = new ANode();
            var tpl = proto.template || ComponentClass.template;

            if (tpl) {
                var aNode = parseTemplate(tpl);
                var firstChild = aNode.childs[0];

                // #begin-ignore
//                if (aNode.childs.length !== 1 || firstChild.isText) {
//                    throw new Error('[SAN FATAL] template must have a root element.');
//                }
                // #end-ignore

                proto.aNode = firstChild;
                if (firstChild.tagName === 'template') {
                    firstChild.tagName = null;
                }

                each(firstChild.events, function (item) {
                    item.isOwn = 1;
                });

                each(componentPropExtra, function (extra) {
                    var prop = firstChild.props.get(extra.name);
                    if (prop) {
                        prop.expr.segs.push(extra.expr.segs[0]);
                    }
                    else {
                        firstChild.props.push({
                            name: extra.name,
                            expr: extra.expr
                        });
                    }
                });
            }
        }
    };

    /**
     * 初始化自身变化时，监听数据变化的行为
     *
     * @private
     */
    Component.prototype._initSelfChanger = function () {
        if (!this.dataChanger) {
            this.dataChanger = bind(this._dataChanger, this);
            this.data.onChange(this.dataChanger);
        }
    };

    /**
     * 视图更新函数
     */
    Component.prototype.updateView = function (changes) {
        if (this.lifeCycle.is('disposed')) {
            return;
        }

        each(changes, function (change) {
            var changeExpr = change.expr;

            this.binds.each(function (bindItem) {
                var relation;
                var setExpr = bindItem.name;
                var updateExpr = bindItem.expr;

                if (!isDataChangeByElement(change, this, setExpr)
                    && (relation = changeExprCompare(changeExpr, updateExpr, this.scope))
                ) {
                    if (relation > 2) {
                        setExpr = {
                            type: ExprType.ACCESSOR,
                            paths: [{
                                type: ExprType.STRING,
                                value: setExpr
                            }].concat(changeExpr.paths.slice(updateExpr.paths.length))
                        };
                        updateExpr = changeExpr;
                    }

                    this.data.set(setExpr, this.evalExpr(updateExpr), {
                        target: {
                            id: this.owner.id
                        }
                    });
                }
            }, this);
        }, this);


        var dataChanges = this.dataChanges;
        if (dataChanges.length) {
            this.dataChanges = [];
            this.props.each(function (prop) {
                each(dataChanges, function (change) {
                    if (changeExprCompare(change.expr, prop.expr, this.data)) {
                        this.setProp(
                            prop.name,
                            evalExpr(prop.expr, this.data, this)
                        );

                        return false;
                    }
                }, this);
            }, this);


            each(this.childs, function (child) {
                child.updateView(dataChanges);
            });

            each(this.slotChilds, function (child) {
                child.slotUpdateView(dataChanges);
            });

            this._callHook('updated');

            if (this.owner) {
                each(dataChanges, function (change) {
                    this.binds.each(function (bindItem) {
                        var changeExpr = change.expr;
                        if (bindItem.x
                            && !isDataChangeByElement(change, this.owner)
                            && changeExprCompare(changeExpr, parseExpr(bindItem.name), this.data)
                        ) {
                            var updateScopeExpr = bindItem.expr;
                            if (changeExpr.paths.length > 1) {
                                updateScopeExpr = {
                                    type: ExprType.ACCESSOR,
                                    paths: bindItem.expr.paths.concat(changeExpr.paths.slice(1))
                                };
                            }

                            this.scope.set(
                                updateScopeExpr,
                                evalExpr(changeExpr, this.data, this),
                                {
                                    target: {
                                        id: this.id,
                                        prop: bindItem.name
                                    }
                                }
                            );
                        }
                    }, this);
                }, this);
                this.owner.updateView();
            }

        }
    };


    /**
     * 组件内部监听数据变化的函数
     *
     * @private
     * @param {Object} change 数据变化信息
     */
    Component.prototype._dataChanger = function (change) {
        var len = this.dataChanges.length;

        if (!len) {
            nextTick(this.updateView, this);
        }

        while (len--) {
            switch (changeExprCompare(change.expr, this.dataChanges[len].expr)) {
                case 1:
                case 2:
                    if (change.type === ModelChangeType.SET) {
                        this.dataChanges.splice(len, 1);
                    }
            }
        }

        this.dataChanges.push(change);
    };


    /**
     * 监听组件的数据变化
     *
     * @param {string} dataName 变化的数据项
     * @param {Function} listener 监听函数
     */
    Component.prototype.watch = function (dataName, listener) {
        var dataExpr = parseExpr(dataName);

        this.data.onChange(bind(function (change) {
            if (changeExprCompare(change.expr, dataExpr, this.data)) {
                listener.call(this, evalExpr(dataExpr, this.data, this), change);
            }
        }, this));
    };

    /**
     * 组件销毁的行为
     */
    Component.prototype._dispose = function () {
        // 这里不用挨个调用 dispose 了，因为 childs 释放链会调用的
        this.slotChilds = null;

        this.data.unChange();
        this.dataChanger = null;
        this.dataChanges.length = 0;

        this.data = null;
        Element.prototype._dispose.call(this);
    };


    /**
     * if 指令处理类
     *
     * @class
     * @param {Object} options 初始化参数
     */
    function IfDirective(options) {
        Element.call(this, options);
    }

    inherits(IfDirective, Element);

    /**
     * 创建 if 指令对应条件为 true 时对应的元素
     *
     * @param {IfDirective} ifElement if指令元素
     * @return {Element}
     */
    function createIfDirectiveChild(ifElement) {
        var aNode = ifElement.aNode;
        var childANode = new ANode({
            childs: aNode.childs,
            props: aNode.props,
            events: aNode.events,
            tagName: aNode.tagName,
            directives: (new IndexedList()).concat(aNode.directives)
        });

        childANode.directives.remove('if');
        childANode.directives.remove('else');

        return createNode(childANode, ifElement);
    }

    /**
     * 从已有的el进行初始化的
     *
     * @param {Object} options 初始化参数
     */
    IfDirective.prototype._initFromEl = function (options) {
        if (options.el) {
            if (options.el.getAttribute('san-stump') === 'if') {
                var aNode = parseTemplate(options.el.innerHTML);
                aNode = aNode.childs[0];
                this.aNode = aNode;
            }
            else {
                this.el = null;
                this._create();
                options.el.parentNode.insertBefore(this.el, options.el.nextSibling);

                options.el.removeAttribute('san-if');
                var child = createNodeByEl(options.el, this, options.elWalker);

                this.childs.push(child);
                this.aNode.childs = child.aNode.childs.slice(0);
            }

            if (options.ifDirective) {
                this.aNode.directives.push(options.ifDirective);
            }

            this.parent._pushChildANode(this.aNode);
        }
    };

    /**
     * 创建元素DOM行为
     */
    IfDirective.prototype._create = function () {
        if (!this.el) {
            this.el = document.createElement('script');
            this.el.type = 'text/san';
            this.el.id = this.id;
        }
    };

    /**
     * 初始化完成后的行为
     */
    IfDirective.prototype._inited = function () {
        if (this.el) {
            this._callHook('created');
            if (this.el.parentNode) {
                this._callHook('attached');
            }
        }
    };

    IfDirective.prototype._created = Node.prototype._created;

    /**
     * 生成html
     *
     * @return {string}
     */
    IfDirective.prototype.genHTML = function () {
        var buf = new StringBuffer();

        if (this.evalExpr(this.aNode.directives.get('if').value)) {
            var child = createIfDirectiveChild(this);
            this.childs[0] = child;
            buf.push(child.genHTML());
        }

        if (isFEFFBeforeStump && !buf.length) {
            buf.push('\uFEFF');
        }
        buf.push(genStumpHTML(this));

        return buf.toString();
    };

    /**
     * 视图更新函数
     *
     * @param {Array} changes 数据变化信息
     */
    IfDirective.prototype.updateView = function (changes) {
        var ifExpr = this.aNode.directives.get('if').value;
        var child = this.childs[0];

        if (this.evalExpr(ifExpr)) {
            if (child) {
                child.updateView(changes);
            }
            else {
                child = createIfDirectiveChild(this);
                child.attach(this.el.parentNode, this.el);
                this.childs[0] = child;
            }
        }
        else {
            this._disposeChilds();
        }
    };

    /**
     * 清空添加子节点的 ANode 的行为
     * 从 el 初始化时，不接受子节点的 ANode信息
     */
    IfDirective.prototype._pushChildANode = function () {};

    /**
     * else 指令处理类
     * 不做具体事情，直接归约成 if
     *
     * @class
     * @param {Object} options 初始化参数
     */
    function ElseDirective(options) {
        var parentChilds = options.parent.childs;

        var len = parentChilds.length;
        while (len--) {
            var child = parentChilds[len];

            if (child instanceof IfDirective) {
                var directiveValue = {
                    name: 'if',
                    value: {
                        type: ExprType.UNARY,
                        expr: child.aNode.directives.get('if').value
                    }
                };
                options.aNode.directives.push(directiveValue);

                if (options.el) {
                    if (isStump(options.el)) {
                        options.el.setAttribute('san-stump', 'if');
                    }
                    else {
                        options.el.removeAttribute('san-else');
                    }
                }

                options.ifDirective = directiveValue;
                return new IfDirective(options);
            }

            // #begin-ignore
//            if (!(child instanceof TextNode)) {
//                throw new Error('[SAN FATEL] else not match if.');
//            }
            // #end-ignore
        }
    }

    /**
     * for 指令处理类
     *
     * @class
     * @param {Object} options 初始化参数
     */
    function ForDirective(options) {
        Element.call(this, options);
    }

    inherits(ForDirective, Element);

    /**
     * 清空添加子节点的 ANode 的行为
     * 从 el 初始化时，不接受子节点的 ANode信息
     */
    ForDirective.prototype._pushChildANode = function () {};

    ForDirective.prototype._created = Node.prototype._created;

    /**
     * 生成html
     *
     * @param {boolean} onlyChilds 是否只生成列表本身html，不生成stump部分
     * @return {string}
     */
    ForDirective.prototype.genHTML = function (onlyChilds) {
        var buf = new StringBuffer();

        each(
            this.evalExpr(this.aNode.directives.get('for').list),
            function (item, i) {
                var child = createForDirectiveChild(this, item, i);
                this.childs.push(child);
                buf.push(child.genHTML());
            },
            this
        );

        if (!onlyChilds) {
            if (isFEFFBeforeStump && !buf.length) {
                buf.push('\uFEFF');
            }
            buf.push(genStumpHTML(this));
        }

        return buf.toString();
    };

    /**
     * 从已有的el进行初始化
     *
     * @param {Object} options 初始化参数
     */
    ForDirective.prototype._initFromEl = function (options) {
        if (options.el) {
            while (1) {
                var current = options.elWalker.current;
                if (current.getAttribute('san-stump') === 'for') {
                    var aNode = parseTemplate(current.innerHTML);
                    aNode = aNode.childs[0];
                    this.aNode = aNode;
                    break;
                }
                else {
                    current.removeAttribute('san-for');
                    var child = createNodeByEl(current, this, options.elWalker);
                    this.childs.push(child);
                }

                var next = options.elWalker.next;
                if (next && (next.getAttribute('san-for') || next.getAttribute('san-stump') === 'for')) {
                    options.elWalker.goNext();
                }
                else {
                    break;
                }
            }

            this.parent._pushChildANode(this.aNode);
        }
    };

    /**
     * 初始化完成后的行为
     */
    ForDirective.prototype._inited = function () {
        if (this.el) {
            this._callHook('created');
            if (this.el.parentNode) {
                this._callHook('attached');
            }
        }
    };

    /**
     * 将元素attach到页面的行为
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
    ForDirective.prototype._attach = function (parentEl, beforeEl) {
        this.create();
        if (parentEl) {
            if (beforeEl) {
                parentEl.insertBefore(this.el, beforeEl);
            }
            else {
                parentEl.appendChild(this.el);
            }
        }

        this.el.insertAdjacentHTML('beforebegin', this.genHTML(1));
    };

    /**
     * 将元素从页面上移除的行为
     */
    ForDirective.prototype._detach = function () {
        this._disposeChilds();
        removeEl(this.el);
    };

    /**
     * 创建元素DOM行为
     */
    ForDirective.prototype._create = function () {
        if (!this.el) {
            this.el = document.createElement('script');
            this.el.type = 'text/san';
            this.el.id = this.id;
        }
    };

    /**
     * 创建 for 指令元素的子元素
     *
     * @inner
     * @param {ForDirective} forElement for 指令元素对象
     * @param {*} item 子元素对应数据
     * @param {number} index 子元素对应序号
     * @return {Element}
     */
    function createForDirectiveChild(forElement, item, index) {
        var forDirective = forElement.aNode.directives.get('for');
        var itemScope = new Model(forElement.scope);
        itemScope.set(forDirective.item, item);
        itemScope.set(forDirective.index, index);

        function exprResolve(expr) {
            // 这里是各种操作方法用的，只能是ExprType.ACCESSOR
            if (expr.paths[0].value === forDirective.item) {
                return {
                    type: ExprType.ACCESSOR,
                    paths: forDirective.list.paths.concat(
                        {
                            type: ExprType.NUMBER,
                            value: itemScope.get(forDirective.index)
                        },
                        expr.paths.slice(1)
                    )
                };
            }

            var resolvedExpr = {
                type: ExprType.ACCESSOR,
                paths: []
            };
            each(expr.paths, function (item) {
                resolvedExpr.paths.push(
                    item.type === ExprType.ACCESSOR
                        && item.paths[0].value === forDirective.index
                    ? {
                        type: ExprType.NUMBER,
                        value: itemScope.get(forDirective.index)
                    }
                    : item
                );
            });
            return resolvedExpr;
        }

        each(
            ['set', 'remove', 'unshift', 'shift', 'push', 'pop', 'splice'],
            function (method) {
                var rawFn = forElement.scope[method];
                itemScope[method] = function (expr) {
                    expr = exprResolve(parseExpr(expr));

                    rawFn.apply(
                        forElement.scope,
                        [expr].concat(Array.prototype.slice.call(arguments, 1))
                    );
                };
            }
        );

        var aNode = forElement.aNode;
        var directiveANode = new ANode({
            childs: aNode.childs,
            props: aNode.props,
            events: aNode.events,
            tagName: aNode.tagName,
            directives: (new IndexedList()).concat(aNode.directives)
        });

        directiveANode.directives.remove('for');

        return createNode(directiveANode, forElement, itemScope);
    }


    /**
     * 视图更新函数
     */
    ForDirective.prototype.updateView = function (changes) {
        var childsChanges = [];
        each(this.childs, function () {
            childsChanges.push([]);
        });

        var repaintAll = 0;
        var forDirective = this.aNode.directives.get('for');
        each(changes, function (change) {
            var relation = changeExprCompare(change.expr, forDirective.list, this.scope);

            if (!relation) {
                // 无关时，直接传递给子元素更新，列表本身不需要动
                each(childsChanges, function (childChanges) {
                    childChanges.push(change);
                });
            }
            else if (relation > 2) {
                // 变更表达式是list绑定表达式的子项
                // 只需要对相应的子项进行更新
                var changePaths = change.expr.paths;
                var forLen = forDirective.list.paths.length;

                change = extend({}, change);
                change.expr = {
                    type: ExprType.ACCESSOR,
                    paths: [
                        {value: forDirective.item, type: ExprType.STRING}
                    ].concat(changePaths.slice(forLen + 1))
                };

                var changeIndex = +this.evalExpr(changePaths[forLen]);
                Model.prototype.set.call(
                    this.childs[changeIndex].scope,
                    change.expr,
                    change.value,
                    {silence: true}
                );
                childsChanges[changeIndex].push(change);
            }
            else if (change.type === ModelChangeType.SET) {
                // 变更表达式是list绑定表达式本身或母项的重新设值
                // 此时需要更新整个列表
                this._disposeChilds();
                repaintAll = 1;
            }
            else if (relation === 2 && change.type === ModelChangeType.SPLICE) {
                // 变更表达式是list绑定表达式本身数组的SPLICE操作
                // 此时需要删除部分项，创建部分项
                var changeStart = change.index;
                var deleteCount = change.deleteCount;

                var lengthChange = {
                    type: ModelChangeType.SET,
                    option: change.option,
                    expr: {
                        type: ExprType.ACCESSOR,
                        paths: change.expr.paths.concat({
                            type: ExprType.STRING,
                            value: 'length'
                        })
                    }
                };
                var indexChange = {
                    type: ModelChangeType.SET,
                    option: change.option,
                    expr: {
                        type: ExprType.ACCESSOR,
                        paths: [{
                            type: ExprType.STRING,
                            value: forDirective.index
                        }]
                    }
                };

                var insertionsLen = change.insertions.length;
                each(this.childs, function (child, index) {
                    childsChanges[index].push(lengthChange);

                    // update child index
                    if (index >= changeStart + deleteCount) {
                        childsChanges[index].push(indexChange);
                        Model.prototype.set.call(
                            child.scope,
                            indexChange.expr,
                            index - deleteCount + insertionsLen,
                            {silence: true}
                        );
                    }
                }, this);

                var spliceArgs = [changeStart, deleteCount];
                var childsChangesSpliceArgs = [changeStart, deleteCount];
                each(change.insertions, function (insertion, index) {
                    spliceArgs.push(createForDirectiveChild(this, insertion, changeStart + index));
                    childsChangesSpliceArgs.push([]);
                }, this);

                each(this.childs.splice.apply(this.childs, spliceArgs), function (child) {
                    child.dispose();
                });
                childsChanges.splice.apply(childsChanges, childsChangesSpliceArgs);
            }

            return !repaintAll;
        }, this);


        if (repaintAll) {
            // 整个列表都需要重新刷新
            this.el.insertAdjacentHTML('beforebegin', this.genHTML(1));
            this._noticeAttached();
        }
        else {
            // 对相应的项进行更新
            // 如果不存在则直接创建，如果存在则调用更新函数
            var len = this.childs.length;
            var attachStump = this;

            while (len--) {
                var child = this.childs[len];
                if (child.lifeCycle.is('attached')) {
                    child.updateView(childsChanges[len]);
                }
                else {
                    child.attach(attachStump.el.parentNode, attachStump.el);
                }

                attachStump = child;
            }
        }
    };


    /* eslint-disable */
    if (isFEFFBeforeStump) {
        IfDirective.prototype.attached =
        TextNode.prototype.attached =
        ForDirective.prototype.attached = function () {
            // 移除节点桩元素前面的空白 FEFF 字符
            if (this.el) {
                var headingBlank = this.el.previousSibling;

                if (headingBlank && headingBlank.nodeType === 3) {
                    var textProp = typeof headingBlank.textContent === 'string'
                        ? 'textContent'
                        : 'data';
                    var text = headingBlank[textProp];

                    if (!text || text === '\uFEFF') {
                        removeEl(headingBlank);
                    }
                }
            }
        };
    }
    /* eslint-enable */

    /**
     * 创建组件类
     *
     * @param {Object} proto 组件类的方法表
     * @return {Function}
     */
    function defineComponent(proto) {
        function ComponentClass(option) {
            Component.call(this, option);
        }

        ComponentClass.prototype = proto;
        inherits(ComponentClass, Component);

        return ComponentClass;
    }

    // #region exports
    var san = {
        /**
         * san版本号
         *
         * @type {string}
         */
        version: '3.0.3-rc.21',

        /**
         * 组件基类
         *
         * @type {Function}
         */
        Component: Component,

        /**
         * 创建组件类
         *
         * @param {Object} proto 组件类的方法表
         * @return {Function}
         */
        defineComponent: defineComponent,

        /**
         * 解析 template
         *
         * @inner
         * @param {string} source template 源码
         * @return {ANode}
         */
        parseTemplate: parseTemplate,

        /**
         * 解析表达式
         *
         * @param {string} source 源码
         * @return {Object}
         */
        parseExpr: parseExpr,

        /**
         * 表达式类型枚举
         *
         * @const
         * @type {Object}
         */
        ExprType: ExprType,

        /**
         * 生命周期类
         *
         * @class
         */
        LifeCycle: LifeCycle,

        /**
         * 在下一个更新周期运行函数
         *
         * @param {Function} fn 要运行的函数
         */
        nextTick: nextTick,

        /**
         * 构建类之间的继承关系
         *
         * @param {Function} subClass 子类函数
         * @param {Function} superClass 父类函数
         */
        inherits: inherits,

        /**
         * 是否开启调试。开启调试时 devtool 会工作
         *
         * @type {boolean}
         */
        debug: true
    };


    // export
    if (typeof exports === 'object' && typeof module === 'object') {
        // For CommonJS
        exports = module.exports = san;
    }
    else if (typeof define === 'function' && define.amd) {
        // For AMD
        define('san', [], san);
    }
    else {
        // For <script src="..."
        root.san = san;
    }

    // #begin-ignore
//    /**
//     * 给 devtool 发通知消息
//     *
//     * @inner
//     * @param {string} name 消息名称
//     * @param {*} arg 消息参数
//     */
//    function emitDevTool(name, arg) {
//        if (san.debug && root.__san_devtool__) {
//            root.__san_devtool__.emit(name, arg);
//        }
//    }
//
//    emitDevTool('san', san);
    // #end-ignore
})(this);
