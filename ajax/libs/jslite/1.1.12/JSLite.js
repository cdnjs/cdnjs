;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['JSLite'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('JSLite'));
  } else {
    root.JSLite = factory(root.JSLite);
  }
}(this, function(JSLite) {
//修复IE，增加方法getComputedStyle为对象的窗口和getPropertyValue方法的对象，它返回的getComputedStyle
if (window&&!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            if (prop == 'float') prop = 'styleFloat';
            prop = camelCase(prop);
            return el.currentStyle[prop] || null;
        }
        return this;
    }
}
//IE浏览器对filter方法的支持
if (!Array.prototype.filter){
    Array.prototype.filter = function(fun /*, thisArg */){
        "use strict";
        if (this === void 0 || this === null)
            throw new TypeError();
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++){
            if (i in t){
                var val = t[i];
                if (fun.call(thisArg, val, i, t))
                res.push(val);
            }
        }
        return res;
    };
}
//IE对indexOf方法的支持
if(!Array.indexOf){
    Array.prototype.indexOf = function(obj){
        for(var i=0; i<this.length; i++){
            if(this[i]==obj) return i;
        }
        return -1;
    }
}
//IE对forEach方法的支持
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fun /*, thisp*/){
        var len = this.length;
        if (typeof fun != "function")
            throw new TypeError();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++){
            if (i in this)
                fun.call(thisp, this[i], i, this);
        }
    }
}
//删除数组 元素
if (!Array.prototype.remove){
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        return index > -1 && this.splice(index, 1), this;
    }
}

// trim 对于原型没有，进行扩展
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
function likeArray(obj) {
    return obj ? typeof obj.length == 'number' : null;
}
function each(elements, callback) {
    var i, key;
    if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++) {
            if (callback.call(elements[i], i, elements[i]) === false) {
                return elements;
            }
        }
    } else {
        for (key in elements) {
            if (callback.call(elements[key], key, elements[key]) === false) {
                return elements;
            }
        }
    }
    return elements;
}

var class2type = {}
each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function type(obj) {
    if ( obj == null ) return obj + "";
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[ toString.call(obj) ] || "object" :
        typeof obj;
}

function isFunction(fn) {
    return type(fn) == 'function';
}

function isObject(obj) {
    return type(obj) == 'object';
}

function isArray(arr) {
    return Array.isArray ? Array.isArray(arr) : type(arr) === 'array';
}

function isString(obj) {
    return typeof obj == 'string';
}
function isPlainObject(obj) {
    // 判断是否为 `{}` 和 `new Object`
    function hasOwn( class2type ) {
        return class2type.hasOwnProperty;
    }
    // 判断不是简单的对象 非 `DOM 节点`，`window`
    if ( JSLite.type( obj ) !== "object" || obj.nodeType || JSLite.isWindow( obj ) ) return false;
    if ( obj.constructor && !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) return false;
    // 如果是 `{}` 和 `new Object` 返回true
    return true;
}

function isJson(obj) {
    var isjson = typeof(obj) == "object" &&
        toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

function isWindow(win) {
    return win && win == win.window;
}
function isDocument(doc) {
    return doc && doc.nodeType == doc.DOCUMENT_NODE;
}
var P = {};
P = {
    singleTagRE: /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    fragmentRE: /^\s*<(\w+|!)[^>]*>/,
    tagExpanderRE: /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    table: document.createElement('table'),
    tableRow: document.createElement('tr'),
    containers: {
        '*': document.createElement('div'),
        'tr': document.createElement('tbody'),
        'tbody': P.table,
        'thead': P.table,
        'tfoot': P.table,
        'td': P.tableRow,
        'th': P.tableRow
    }
}
// fragment
// 需要一个HTML字符串和一个可选的标签名
// 生成DOM节点从给定的HTML字符串节点。
// 生成的DOM节点作为一个数组返回。
function fragment(html, name) {
    var dom, container;
    if (P.singleTagRE.test(html)) dom = JSLite(document.createElement(RegExp.$1));
    if (!dom) {
        if (html.replace) {
            html = html.replace(P.tagExpanderRE, "<$1></$2>");
        }
        if (name === undefined) {
            name = P.fragmentRE.test(html) && RegExp.$1;
        }
        if (!(name in P.containers)) {
            name = '*';
        }
        container = P.containers[name];
        container.innerHTML = '' + html;
        dom = each(slice.call(container.childNodes), function() {
            container.removeChild(this);
        });
    }
    return dom;
}

function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
}

//将样式属性字符转换成驼峰。
function camelCase(string){ 
    // Support: IE9-11+
    return string.replace( /^-ms-/, "ms-" ).replace( /-([a-z])/g, function( all, letter ) {
        return letter.toUpperCase();
    });
}

//将字符串格式化成 如border-width 样式上使用
function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
}

// parents、 nextAll等方法调用
// nodes 节点集合或者单个节点
// selector 选择器，过滤用
// dir 获取集合比如`parentNode`
function dir(nodes,selector,dir){
    var ancestors = []
    while (nodes.length > 0) nodes = $.map(nodes, function(node){
        if ((node = node[dir]) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
        }
    })
    return selector&&isString(selector)?$(ancestors).filter(selector):$(ancestors);
}
var emptyArray = [],
    slice = emptyArray.slice,
    filter = emptyArray.filter,
    some = emptyArray.some,
    emptyObject = {},
    toString = emptyObject.toString,
    elementTypes = [1, 9, 11],
    propMap = {
        'tabindex': 'tabIndex',
        'readonly': 'readOnly',
        'for': 'htmlFor',
        'class': 'className',
        'maxlength': 'maxLength',
        'cellspacing': 'cellSpacing',
        'cellpadding': 'cellPadding',
        'rowspan': 'rowSpan',
        'colspan': 'colSpan',
        'usemap': 'useMap',
        'frameborder': 'frameBorder',
        'contenteditable': 'contentEditable'
    },
    JSLite;


JSLite = (function(){
    var JSLite = function(selector) {
        return new JSLite.fn.init(selector);
    };

    JSLite.fn = JSLite.prototype = {
        init: function(selector) {
            var dom ;
            if (!selector) {
                dom = emptyArray,dom.selector = selector || '',dom.__proto__ = JSLite.fn.init.prototype;
            } else if (typeof selector == 'string' && (selector = selector.trim()) && selector[0] == '<'  && /^\s*<(\w+|!)[^>]*>/.test(selector)) {
                dom = fragment(selector),selector=null;
            } else if (isFunction(selector)) {
                return JSLite(document).ready(selector);
            } else {
                if (isArray(selector)) {
                    dom = selector;
                } else if (isObject(selector)) {
                    dom = [selector], selector = null
                } else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window) {
                    dom = [selector], selector = null;
                } else {
                    dom = (function(){
                        var found;
                        return (document && /^#([\w-]+)$/.test(selector))?
                        ((found = document.getElementById(RegExp.$1)) ? [found] : [] ):
                        slice.call(
                            /^\.([\w-]+)$/.test(selector) ? document.getElementsByClassName(RegExp.$1) :
                            /^[\w-]+$/.test(selector) ? document.getElementsByTagName(selector) :
                            document.querySelectorAll(selector)
                        );
                    })();
                }
            }
            dom = dom || emptyArray;
            JSLite.extend(dom, JSLite.fn);
            dom.selector = selector || '';
            return dom;
        }
    };

    JSLite.fn.init.prototype = JSLite.fn;

    return JSLite;
})();

JSLite.extend = JSLite.fn.extend = function () {
    var options, name, src, copy,
    target = arguments[0],i = 1,
    length = arguments.length,
    deep = false;
    //处理深拷贝的情况
    if (typeof (target) === "boolean")
        deep = target,target = arguments[1] || {},i = 2;
    //处理时，目标是一个字符串或（深拷贝可能的情况下）的东西
    if (typeof (target) !== "object" && !isFunction(target))
        target = {};
    //扩展JSLite的本身，如果只有一个参数传递
    if (length === i) target = this,--i;
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name],copy = options[name];
                if (target === copy) continue;
                if (copy !== undefined) target[name] = copy;
            }
        }
    }
    return target;
};

JSLite.extend({
    isDocument:isDocument,
    isFunction:isFunction,
    isObject:isObject,
    isArray:isArray,
    isString:isString,
    isWindow:isWindow,
    isPlainObject:isPlainObject,
    isJson:isJson,
    parseJSON:JSON.parse,
    type:type,
    likeArray:likeArray,
    trim:function(str){return str == null ? "" : String.prototype.trim.call(str)},
    intersect:function(a,b){
        var array=[];
        a.forEach(function(item){
            if(b.indexOf(item)>-1) array.push(item);
        })
        return array;
    },
    error:function(msg) {throw msg;},
    getUrlParam: function(name, searchStr) {
        // 兼容 ?id=22&name=%E4%B8%AD%E6%96%87&DEBUG 处理
        var url = searchStr || location.search;
        var params = {};

        if (url.indexOf('?') != -1) {
            var arr = url.substr(1).split('&');
            for(var i = 0, l = arr.length; i < l; i ++) {
                var kv = arr[i].split('=');
                params[kv[0]] = kv[1] && decodeURIComponent(kv[1]); // 有值解码，无值 undefined
            }
        }

        return name ? params[name] : params;
    },
    each:function(elements, callback){return each.apply(this,arguments);},
    map:function(elements, callback){
        var value, values = [], i, key
        if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
            value = callback(elements[i], i)
            if (value != null) values.push(value)
        }
        else for (key in elements) {
            value = callback(elements[key], key)
            if (value != null) values.push(value)
         }
        return values.length > 0 ? JSLite.fn.concat.apply([], values) : values;
    },
    grep:function(elements, callback){
        return filter.call(elements, callback)
    },
    matches:function(element, selector){
        if (!selector || !element || element.nodeType !== 1) return false;
        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                            element.oMatchesSelector || element.msMatchesSelector || element.matchesSelector;
        if (matchesSelector) return matchesSelector.call(element, selector);
    },
    unique:function(array){return filter.call(array, function(item, idx){ return array.indexOf(item) == idx })},
    inArray:function(elem, array, i){
        return emptyArray.indexOf.call(array, elem, i)
    },
    sibling:function(nodes,ty){
        var ancestors = [];
        if(nodes.length > 0) ancestors = JSLite.map(nodes, function(node){
            if ((node = node[ty]) && !isDocument(node) && ancestors.indexOf(node) < 0)
                ancestors.push(node)
                return node
        });
        return this.unique(ancestors);
    },
    contains:function(parent, node){
        if(parent&&!node) return document.documentElement.contains(parent)
        return parent !== node && parent.contains(node)
    },
    camelCase:camelCase,
    now:Date.now
});

JSLite.fn.extend({
    forEach: emptyArray.forEach,
    concat: emptyArray.concat,
    indexOf: emptyArray.indexOf,
    each: function(callback){
        return JSLite.each(this,callback);
    },
    map: function(fn){
        return JSLite(JSLite.map(this, function(el, i){ return fn.call(el, i, el) }));
    },
    get: function(index){
        return index === undefined ? slice.call(this) : this[index >= 0 ? index : index + this.length];
    },
    index: function(element){
        return element ? (type(element) === 'string'?this.indexOf(this.parent().children(element)[0]):this.indexOf(element))
            : this.parent().children().indexOf(this[0])
    },
    is: function(selector){
        if (this.length > 0 && typeof selector !== 'string') return this.indexOf(selector)>-1?true:false;
        return this.length > 0 && JSLite.matches(this[0], selector);
    },
    add: function(selector){return JSLite(JSLite.unique(this.concat(JSLite(selector))) );},
    eq: function(idx){return idx === -1 ? JSLite(this.slice(idx)) : JSLite(this.slice(idx, + idx + 1))},
    first: function(){
        var el = this[0]
        return el && !isObject(el) ? el : JSLite(el)
    },
    slice:function(argument) { return JSLite(slice.apply(this, arguments));},
    size:function(){return this.length;},
    //遍历查找对象
    filter:function(selector){
        if (isFunction(selector)) return this.not(this.not(selector))
        return JSLite(filter.call(this, function(element){
            return JSLite.matches(element, selector)
        }))
    },
    not:function(selector){
        var nodes = [];
        if (isFunction(selector)&& selector.call !== undefined){
            this.each(function(idx){
                if (!selector.call(this,idx)) nodes.push(this);
            });
        }else {
            var excludes = typeof selector == 'string' ? this.filter(selector):
            (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : JSLite(selector)
            this.forEach(function(el){
                if (excludes.indexOf(el) < 0) nodes.push(el)
            })
        }
        return JSLite(nodes)
    },
    children:function(selector){
        var e=[];
        filter.call(this.pluck('children'), function(item, idx){
            JSLite.map(item,function(els){ if (els&&els.nodeType == 1) e.push(els) })
        });
        return JSLite(e).filter(selector || '*');
    },
    contents: function(selector) {
        return this.map(function() { 
            return this.contentDocument || $.grep(this.childNodes,function(node){
                return selector? $.matches(node,selector):node
            }) 
        })
    },
    parent: function(selector){return JSLite(JSLite.unique(this.pluck('parentNode'))).filter(selector||'*')},
    parents: function(selector){return dir(this,selector,'parentNode')},
    closest: function(selector, context){
        var node = this[0], collection = false
        if (typeof selector == 'object') collection = JSLite(selector)
        while (node && !(collection ? collection.indexOf(node) >= 0 : JSLite.matches(node, selector)))
            node = node !== context && !isDocument(node) && node.parentNode
        return JSLite(node)
    },
    prev: function(selector){
        return JSLite(this.pluck('previousElementSibling')).filter(selector || '*')
    },
    next: function(selector){
        return JSLite(this.pluck('nextElementSibling')).filter(selector || '*')
    },
    nextAll: function (selector) { return dir(this,selector,'nextElementSibling')},
    prevAll: function (selector) { return dir(this,selector,'previousElementSibling')},
    siblings: function(selector){
        var n=[];this.map(function(i,el){
            filter.call(el.parentNode.children, function(els, idx){
                 if (els&&els.nodeType == 1&&els!=el) n.push(els)
            });
        })
        return JSLite(n).filter(selector || '*');
    },
    find: function(selector){
        var nodes = this.children(),ancestors=[];
        while (nodes.length > 0)
        nodes=JSLite.map(nodes, function(node,inx){
            if (ancestors.indexOf(node)<0) ancestors.push(node);
            if ((nodes = JSLite(node).children())&&nodes.length>0 ) return nodes;
        });
        return JSLite(ancestors).filter(selector || '*');
    },
    //DOM 操作
    replaceWith: function(newContent){
        return this.before(newContent).remove()
    },
    unwrap: function(){
        this.parent().each(function(){
            JSLite(this).replaceWith(JSLite(this).html());
        })
        return this
    },
    remove: function(selector){
        var elm = selector?JSLite(this.find(funcArg(this, selector))):this;
        return elm.each(function(){
            if (this.parentNode != null) this.parentNode.removeChild(this)
        })
    },
    detach: function(){return this.remove();},
    empty: function(){ return this.each(function(){ this.innerHTML = '' }) },
    clone: function(){return this.map(function(){ return this.cloneNode(true)})},
    text: function(text){
        return text === undefined ?
            (this.length > 0 ? this[0].textContent : null) :
            this.each(function(){this.textContent = funcArg(this, text)});
    },
    html:function(html){
        return 0 in arguments ? this.each(function(idx){
            JSLite(this).empty().append(funcArg(this, html))
        }) : (0 in this ? this[0].innerHTML : null)
    },
    //效果
    hide:function(){ return this.css("display", "none")},
    show:function(){
        return this.each(function(){
            this.style.display == "none" && (this.style.display = '');
            var CurrentStyle = function(e){
                return e.currentStyle || document.defaultView.getComputedStyle(e, null);
            }
            function defaultDisplay(nodeName) {
                var elm=document.createElement(nodeName),display
                JSLite('body').append(JSLite(elm));
                display = CurrentStyle(elm)['display'];
                elm.parentNode.removeChild(elm)
                return display
            }
            if (CurrentStyle(this)['display']=='none') {
                this.style.display = defaultDisplay(this.nodeName)
            }
        })
    },
    toggle:function(setting){
        return this.each(function(){
            var el = JSLite(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
        })
    },
    //尺寸规格
    offset:function(){
        if(this.length==0) return null;
        var obj = this[0].getBoundingClientRect();
        return {
            left: obj.left + window.pageXOffset,
            top: obj.top + window.pageYOffset,
            width: obj.width,
            height: obj.height
        };
    },
    //操控CSS
    css:function(property, value){
        var elem = this[0];
        if(arguments.length < 2){
            if (!elem) return [];
            if(!value && typeof property == 'string') return elem.style[property];
            if(isArray(property)){
                var props = {}
                $.each(property, function(_, prop){
                    props[prop] = elem.style[camelCase(prop)]
                })
                return props
            }
        }

        var css={},k;
        if (typeof property == 'string') {
            //当value的值为非零的 空不存在，删掉property样式
            if (!value && value !== 0) this.each(function(){ this.style.removeProperty(dasherize(property)) });
            else css[dasherize(property)] = value
        } else {
            for(k in property){
                if(!property[k] && property[k] !== 0){
                    this.each(function(){ this.style.removeProperty(dasherize(k)) });
                }else{
                    css[dasherize(k)] = property[k];
                }
            } 
        }
        // 设置样式
        return this.each(function(){ for(var a in css) this.style[a] = css[a];});
    },
    hasClass:function(name){
        if (!name) return false
        return emptyArray.some.call(this, function(el){
            return (' ' + el.className + ' ').indexOf(this) > -1
        }, ' ' + name + ' ');
    },
    addClass:function(name){
        if (!name) return this;
        var classList,cls,newName;
        return this.each(function(idx){
            classList=[],cls = this.className,newName=funcArg(this, name).trim();
            newName.split(/\s+/).forEach(function(k){
                if (!JSLite(this).hasClass(k)) classList.push(k);
            },this);
            if (!newName) return this;
            classList.length ? this.className = cls + (cls ? " " : "") + classList.join(" "):null;
        })
    },
    removeClass:function(name){
        var cls;
        if (name === undefined) return this.removeAttr('class');
        return this.each(function(idx){
            cls = this.className;
            funcArg(this, name, idx, cls).split(/\s+/).forEach(function(k){
                cls=cls.replace(new RegExp('(^|\\s)'+k+'(\\s|$)')," ").trim();
            },this);
            cls?this.className = cls:this.className = "";
        })
    },
    toggleClass:function(name){
        if(!name) return this;
        return this.each(function(idx){
            var w=JSLite(this),names=funcArg(this, name);
            names.split(/\s+/g).forEach(function(cls){
                w.hasClass(cls)?w.removeClass(cls):w.addClass(cls);
            })
        })
    },
    //属性
    pluck: function(property){ return JSLite.map(this, function(el){ return el[property] })},
    prop: function(name, value){
        name = propMap[name] || name
        return (1 in arguments) ? this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :(this[0] && this[0][name])
    },
    removeProp: function(name) {
        name = propMap[name] || name;
        return this.each(function() {
            // 在IE中处理window属性可能报错
            try {
                this[name] = undefined;
                delete this[name];
            } catch(e) {}
        });
    },
    attr: function(name,value){
        var result,k;
        return (typeof name == 'string' && !(1 in arguments)) ?
            (!this.length || this[0].nodeType !== 1 ? undefined :
                (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
            ) : this.each(function(n){
                if (isObject(name)) for(k in name) this.setAttribute(k, name[k]);
                else this.setAttribute(name,funcArg(this, value));
            });
    },
    removeAttr:function(name){
        return this.each(function(){ this.nodeType === 1 && this.removeAttribute(name)});
    },
    val:function(value){
        return 0 in arguments ?
        this.each(function(idx){this.value = funcArg(this, value, idx, this.value)}) :
        (this[0] && (this[0].multiple ?
            JSLite(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
            this[0].value))
    },
    data: function(name, value){
        var attrName = 'data-' + name,data,a
        if(!name) return this[0].dataset;
        if(name&&isJson(name)){
            for(a in name) this.attr('data-' + a, name[a])
            return this
        }
        if(value&&(isArray(value) || isJson(value))) value = JSON.stringify(value);

        data = (1 in arguments) ? this.attr(attrName, value) : this.attr(attrName);
        try{data = JSON.parse(data);}catch(e){}
        return data;
    }
});

// 创建 scrollLeft 和 scrollTop 方法
JSLite.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
    var top = "pageYOffset" === prop;
    JSLite.fn[ method ] = function( value ) {
        var win = isWindow( this[0] );
        if ( value === undefined ) return win ? window[ prop ] : this[0][ method ];
        if ( win ) {
            window.scrollTo(
                !top ? value : window.pageXOffset,
                top ? value : window.pageYOffset
            );
            return this[0];
        } else return this.each(function(){
            this[ method ] = value;
        })
    };
});

;['after','prepend','before','append'].forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2;
    JSLite.fn[operator] = function(){
        var argType, nodes = JSLite.map(arguments, function(arg) {
                argType = type(arg)
                if(argType=="function") arg = funcArg(this, arg)
                return argType == "object" || argType == "array" || arg == null ? arg : fragment(arg)
            }),parent,script,copyByClone = this.length > 1
        if (nodes.length < 1) return this
        return this.each(function(_, target){
            parent = inside ? target : target.parentNode
            target = operatorIndex == 0 ? target.nextSibling :
                    operatorIndex == 1 ? target.firstChild :
                    operatorIndex == 2 ? target :
                    null;

            var parentInDocument = JSLite.contains(document.documentElement, parent)

            nodes.forEach(function(node){
                var txt
                if (copyByClone) node = node.cloneNode(true)
                parent.insertBefore(node, target);
                if(parentInDocument && node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' &&
                    (!node.type || node.type === 'text/javascript') && !node.src) txt=node.innerHTML;
                else if(parentInDocument &&node.children && node.children.length>0&&JSLite(node)&&(script=JSLite(node).find("script")))
                    if(script.length>0) script.each(function(_,item){
                        txt=item.innerHTML
                    });
                    txt?window['eval'].call(window, txt):undefined;
            });
        })
    }
    JSLite.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
        JSLite(html)[operator](this)
        return this
    }
});


;['width', 'height'].forEach(function(dimension){
    var dimensionProperty = dimension.replace(/./,dimension[0].toUpperCase())
    JSLite.fn[dimension]=function(value){
        var offset, el = this[0]
        if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
        else return this.each(function(idx){
            el = $(this)
            el.css(dimension, funcArg(this, value, idx, el[dimension]()))
        })
    }
});

var _JSLite = window.JSLite,
    _$ = window.$;

JSLite.noConflict = function( deep ) {
    if ( window.$ === JSLite ) {
        window.$ = _$;
    }

    if ( deep && window.JSLite === JSLite ) {
        window.JSLite = _JSLite;
    }

    return JSLite;
};

window.JSLite = window.$ = JSLite;
;(function($){
    $.fn.extend({
        serializeArray:function(){
            var result = [], el,type,elm=this.get(0);
            if(!elm || ! elm.elements) return result
            $([].slice.call(this.get(0).elements)).each(function(){
                el = $(this),type = el.attr('type')
                if (this.nodeName.toLowerCase() != 'fieldset' && !this.disabled && type != 'submit' && type != 'reset' && type != 'button' && ((type != 'radio' && type != 'checkbox') || this.checked)) {
                    result.push({name: el.attr('name'), value: el.val() }) 
                }
            });
            return result
        },
        serialize:function(result){
            result = [],this.serializeArray().forEach(function(elm){
              result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
            })
            return result.join('&')
        }
    });
})(JSLite);
;(function($){
    var handlers = {},_jid = 1
    /* 绑定事件 start */
    $.fn.extend({
        ready: function(callback){
            if (/complete|loaded|interactive/.test(document.readyState) && document.body) callback(JSLite)
            else document.addEventListener('DOMContentLoaded', function(){callback(JSLite) }, false)
            return this
        },
        bind: function(event, func) {return this.each(function(){add(this, event, func)})},
        unbind:function(event, func) {return this.each(function(){remove(this, event, func)})},
        on:function(event, selector, data, callback){
            var self = this
            if (event && !$.isString(event)) {
                $.each(event, function(type, fn){
                    self.on(type, selector, data, fn)
                })
                return self
            }
            if (!$.isString(selector) && !$.isFunction(callback) && callback !== false)
                callback = data, data = selector, selector = undefined
            if ($.isFunction(data) || data === false)
                callback = data, data = undefined
            if (callback === false) callback = function(){return false;}
            return this.each(function(){
                add(this, event, callback, data, selector)
            })
        },
        off:function(event, selector, callback){
            var self = this
            if (event && !$.isString(event)) {
                $.each(event, function(type, fn){
                    self.off(type, selector, fn)
                })
                return self
            }
            if (!$.isString(selector) && !$.isFunction(callback) && callback !== false)
                callback = selector, selector = undefined
            if (callback === false) callback =  function(){return false;}
            return self.each(function(){
                remove(this, event, callback, selector)
            })
        },
        delegate: function(selector, event, callback){
            return this.on(event, selector, callback)
        },
        trigger:function(event, data){
            var type = event,specialEvents={}
            specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';
            if (typeof type == 'string') {
                event = document.createEvent(specialEvents[type] || 'Events');
                event.initEvent(type,true, true);
            }else return;
            event._data = data;
            return this.each(function(){
                if('dispatchEvent' in this) this.dispatchEvent(event);
            });
        }
    });
    $.event={add:add,remove:remove};
    function add(element, events, func, data, selector){
        var self=this,id=jid(element),set=(handlers[id] || (handlers[id] = []));
        events.split(/\s/).forEach(function(event){
            var handler = $.extend(parse(event), {fn: func,sel: selector, i: set.length});
            var proxyfn = handler.proxy = function (e) {
                //处理事件代理
                if (selector) {
                    var $temp = $(element).find(selector);
                    var res = [].some.call($temp, function(val) {
                        return val === e.target || $.contains(val, e.target);
                    });
                    //不包含
                    if (!res) {
                        return false;
                    }
                }
                e.data = data;
                var result = func.apply(element,e._data == undefined ? [e] : [e].concat(e._data));
                if (result === false) e.preventDefault(), e.stopPropagation();
                return result;
            };
            set.push(handler)
            if (element.addEventListener) element.addEventListener(handler.e,proxyfn, false);
        })
    }
    function remove(element, events, func, selector){
        ;(events || '').split(/\s/).forEach(function(event){
            $.event = parse(event)
            findHandlers(element, event, func, selector).forEach(function(handler){
                delete handlers[jid(element)][handler.i]
                if (element.removeEventListener) element.removeEventListener(handler.e, handler.proxy, false);
            })
        })
    }
    function jid(element) {return element._jid || (element._jid = _jid++)}
    function parse(event) {
        var parts = ('' + event).split('.');
        return {e: parts[0], ns: parts.slice(1).sort().join(' ')};
    }
    function findHandlers(element, event, func, selector){
        var self=this,id = jid(element);event = parse(event)
        return (handlers[jid(element)] || []).filter(function(handler) {
            return handler
            && (!event.e  || handler.e == event.e)
            && (!func || handler.fn.toString()===func.toString())
            && (!selector || handler.sel == selector);
        })
    }
    ;("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error paste drop dragstart dragover " +
    "beforeunload").split(' ').forEach(function(event) {
        $.fn[event] = function(callback) {
            return callback ? this.bind(event, callback) : this.trigger(event);
        }
    });
    /* 绑定事件 end */
})(JSLite);
;(function($){
    var jsonpID = 0
    function parseArguments(url, data, success, dataType){
        $.isFunction(data) && (dataType = success, success = data, data = undefined),
        $.isFunction(success) || (dataType = success, success = undefined)
        return {
            url: url, 
            data: data, 
            success: success, 
            dataType: dataType
        }
    }
    $.extend({
        ajaxSettings:{
            // 默认请求类型
            type:'GET',
            // 如果请求成功时执行回调
            success:function(){},
            // 如果请求失败时执行回调
            error:function(){},
            xhr:function () {
              return new window.XMLHttpRequest();
            },
            processData:true,
            complete:function(){},//要求执行回调完整（包括：错误和成功）
            // MIME类型的映射
            accepts:{
                script:'text/javascript, application/javascript',
                json:  'application/json',
                xml:   'application/xml, text/xml',
                html:  'text/html',
                text:  'text/plain'
            },
            // 应该被允许缓存GET响应
            cache: true
        },
        param:function(obj,traditional,scope){
            if($.type(obj) == "string") return obj;
            var params = [],str='';
            params.add=function(key, value){
                this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value== null?"":value))
            };
            if(scope==true&&type(obj)=='object') params.add(traditional,obj)
            else {
                for(var p in obj) {
                    var v = obj[p],str='',
                        k = (function(){
                            if (traditional) {
                                if (traditional==true) return p;
                                else{
                                    if(scope&&type(obj)=='array') return traditional
                                    return traditional + "[" + ($.type(obj)=='array'?"":p) + "]";
                                };
                            };
                            return p
                        })();
                    if (typeof v=="object") {
                        str=this.param(v, k ,traditional);
                    }else if(!isFunction(v)){
                        str=params.add(k, v);
                    }

                    if (str) params.push(str);
                };
            }
            return params.join('&');
        },
        get:function(url, success){return $.ajax(parseArguments.apply(null, arguments))},
        post:function(url, data, success, dataType){
            var options = parseArguments.apply(null, arguments);
            return options.type = "POST", $.ajax(options);
        },
        getJSON:function(/* url, data, success */){
            var options = parseArguments.apply(null, arguments),
                url = arguments[0];
            if(url&&url == document.location.host) options.dataType = 'json';
            else options.dataType = 'jsonp';
            return this.ajax(options);
        },
        ajaxJSONP:function (options) {
            var _callbackName = options.jsonpCallback,
            callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
            script = document.createElement('script'),
            originalCallback = window[callbackName],
            responseData,xhr={};

            $(script).on('load error', function(e, errorType){
                $(script).off().remove()
                if (e.type == 'error' || !responseData) {
                    options.error(e, errorType || 'error',options)
                } else {
                    options.success(responseData[0], xhr, options)
                }
                window[callbackName] = originalCallback
                if (responseData && $.isFunction(originalCallback))
                originalCallback(responseData[0])
                originalCallback = responseData = undefined
            })

            //插入script 获取返回的数据
            window[callbackName] = function(){responseData = arguments}
            script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
            document.head.appendChild(script)
            return options.xhr()
        },
        ajax:function(options){
            var key,settings,name,
                setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
                appendQuery = function(url, query) {
                    if (query == '') return url
                    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
                },
                serializeData = function(options){
                    if (options.processData && options.data && $.type(options.data) != "string")
                        options.data = $.param(options.data, options.traditional)
                    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
                        options.url = appendQuery(options.url, options.data), options.data = undefined
                };
                options = options || {};
                if ($.isString(options)) {
                    if (arguments[0]=="GET") {
                        var  urls=arguments[1];
                        if (arguments[2]&&$.isFunction(arguments[2])) {
                            $.get(urls,arguments[2])
                        }else if(arguments[2]&&$.isJson(arguments[2])){
                            $.get(urls.indexOf('?')>-1?urls+'&'+this.param(arguments[2]):urls+'?'+this.param(arguments[2]),arguments[3])
                        };
                    }else if(arguments[0]=="POST"){
                        $.post(arguments[1],arguments[2],arguments[3],arguments[4])
                    };
                    return;
                };
                settings=$.extend({}, options || {});
                for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
                //{ type, url, data, success, dataType, contentType }
            serializeData(settings)

            //jsonp
            var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
            if (hasPlaceholder) dataType = 'jsonp';
            //给URL后面加上时间戳
            if (settings.cache === false || (
                (!options || options.cache !== true) &&
                ('script' == dataType || 'jsonp' == dataType)
            )) {
                settings.url = appendQuery(settings.url, '_=' + Date.now())
            }
            //判断是否为jsonp
            if ('jsonp' == dataType) {
                if (!hasPlaceholder) settings.url = appendQuery(settings.url,settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
                return $.ajaxJSONP(settings)
            }

            var data = settings.data,
                callback = settings.success || function(){},
                errback = settings.error || function(){},
                mime = $.ajaxSettings.accepts[settings.dataType],
                content = settings.contentType,
                xhr = new XMLHttpRequest(),
                nativeSetHeader = xhr.setRequestHeader,
                headers={};
                if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest'),setHeader('Accept', mime || '*/*');
                if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
                if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
                    setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0) {
                        var result, error = false;
                            result = xhr.responseText
                        try {
                            if (settings.dataType == 'script')    (1,eval)(result)
                            else if (settings.dataType == 'xml')  result = xhr.responseXML
                            else if (settings.dataType == 'json') result = /^\s*$/.test(result) ? null : JSON.parse(result)
                        } catch (e) { error = e }

                        if (error) errback(error, 'parsererror', xhr, settings);
                        else callback(result, 'success', xhr);
                    } else {
                        settings.complete(xhr, error ? 'error' : 'success')
                    }
                }
            };
            if (data&&data instanceof Object&&settings.type=='GET'){
                data?settings.url =(settings.url.indexOf('?')>-1?settings.url +'&'+ data:settings.url +'?'+ data) :null;
            }
            var async = 'async' in settings ? settings.async : true
            xhr.open(settings.type, settings.url, async);
            if (mime) xhr.setRequestHeader('Accept', mime);
            if (data instanceof Object && mime == 'application/json' ) data = JSON.stringify(data), content = content || 'application/json';
            for (name in headers) nativeSetHeader.apply(xhr, headers[name]);

            xhr.send(data?data:null);
        }
    });
    var _load = $.fn.load;
    $.fn.extend({
        load:function (url, data, success) {
            //兼容 onload 事件
            if (arguments[0] && typeof arguments[0] !== 'string' && _load ) return _load.apply( this, arguments );
            if (!this.length || arguments.length === 0) return this
            var self = this, parts = arguments[0].split(/\s/), selector,
                options = parseArguments(url, data, success),
                callback = options.success;
            if (parts.length > 1){
                options.url = parts[0], selector = parts[1]
            }
            options.success = function(response){
                response = response.replace(/<(script)[^>]*>(|[\s\S]+?)<\/\1>/gi,'')
                self.html(selector ? $('<div>').html(response).find(selector) : response)
                callback && callback.apply(self, arguments)
            }
            $.ajax(options)
            return this
        }
    });
})(JSLite);
return JSLite;
}));
