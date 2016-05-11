;(function(window, undefined) {
    "use strict";
    var emptyArray = [],slice = emptyArray.slice,filter = emptyArray.filter,some = emptyArray.some,elementTypes = [1, 9, 11],P={},
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
    JSLite = (function(){
        var JSLite = function( selector ) {
            return new JSLite.fn.init(selector);
        };
        JSLite.fn = JSLite.prototype = {
            init:function( selector ){
                var dom ;
                if (!selector) 
                    dom = emptyArray,dom.selector = selector || '',dom.__proto__ = JSLite.fn.init.prototype;
                else if (typeof selector == 'string' && (selector = selector.trim()) && selector[0] == '<'  && /^\s*<(\w+|!)[^>]*>/.test(selector))
                    dom = fragment(selector),selector=null;
                else if (isFunction(selector)) return JSLite(document).ready(selector)
                else {
                    if (isArray(selector))
                        dom = selector;
                    else if (isObject(selector))
                        dom = [selector], selector = null
                    else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window)
                        dom = [selector], selector = null;
                    else dom = (function(){
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
                dom = dom || emptyArray;
                JSLite.extend(dom, JSLite.fn);
                dom.selector = selector || '';
                return dom;
            },
            size:function(){return this.length;}
        }
        JSLite.fn.init.prototype = JSLite.fn;
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
        return JSLite;
    })();

    JSLite.fn.extend({
        forEach: emptyArray.forEach,
        concat: emptyArray.concat,
        indexOf: emptyArray.indexOf,
        ready: function(callback){
            if (/complete|loaded|interactive/.test(document.readyState) && document.body) callback(JSLite)
            else document.addEventListener('DOMContentLoaded', function(){callback(JSLite) }, false)
            return this
        },
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
            return element ? this.indexOf(JSLite(element)[0]) : this.parent().children().indexOf(this[0])
        },
        empty: function(){ return this.each(function(){ this.innerHTML = '' }) },
        detach: function(){return this.remove();},
        remove: function(){
            return this.each(function(){
                if (this.parentNode != null) this.parentNode.removeChild(this)
            })
        },
        replaceWith: function(newContent){
            return this.before(newContent).remove()
        },
        unwrap: function(){
            this.parent().each(function(){
                JSLite(this).replaceWith(JSLite(this).children())
            })
            return this
        },
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
        },
        css:function(property, value){
            if (!this[0]) return [];
            var computedStyle = getComputedStyle(this[0], '')
            if(value === undefined && typeof property == 'string') return computedStyle.getPropertyValue(property);
            var css="",k;
            for(k in property) css += k+':'+property[k]+';';
            if(typeof property == 'string') css = property+":"+value;
            return this.each(function(el){
                css ? this.style.cssText += ';' + css :"";
            });
        },
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
        hasClass:function(name){
            if (!name) return false
            return emptyArray.some.call(this, function(el){
                return this.test(el.className)
            }, new RegExp('(^|\\s)' + name + '(\\s|$)'));
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
        filter:function(selector){
            if (isFunction(selector)) return this.not(this.not(selector))
            return JSLite(filter.call(this, function(element){
                return JSLite.matches(element, selector)
            }))
        },
        is: function(selector){
            if (this.length > 0 && isObject(selector)) return this.indexOf(selector)>-1?true:false;
            return this.length > 0 && JSLite.matches(this[0], selector);
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
        pluck: function(property){ return JSLite.map(this, function(el){ return el[property] })},
        find: function(selector){
            var nodes = this.children(),ancestors=[];
            while (nodes.length > 0)
            nodes=JSLite.map(nodes, function(node,inx){
                if (ancestors.indexOf(node)<0) ancestors.push(node);
                if ((nodes = JSLite(node).children())&&nodes.length>0 ) return nodes;
            });
            return JSLite(ancestors).filter(selector || '*');
        },
        clone: function(){return this.map(function(){ return this.cloneNode(true)})},
        add: function(selector){return JSLite.unique(this.concat(JSLite(selector)));},
        eq: function(idx){return idx === -1 ? JSLite(this.slice(idx)) : JSLite(this.slice(idx, + idx + 1))},
        first: function(){
            var el = this[0]
            return el && !isObject(el) ? el : JSLite(el)
        },
        children:function(selector){
            var e=[];
            filter.call(this.pluck('children'), function(item, idx){
                JSLite.map(item,function(els){ if (els&&els.nodeType == 1) e.push(els) })
            });
            return JSLite(e).filter(selector || '*');
        },
        contents: function() {
            return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
        },
        parent: function(selector){return JSLite(JSLite.unique(this.pluck('parentNode'))).filter(selector||'*')},
        parents: function(selector){
            var ancestors=JSLite.sibling(this,'parentNode');
            return selector == null ? JSLite(ancestors) : JSLite(ancestors).filter(selector);
        },
        closest: function(selector, context){
            var node = this[0], collection = false
            if (typeof selector == 'object') collection = JSLite(selector)
            while (node && !(collection ? collection.indexOf(node) >= 0 : JSLite.matches(node, selector)))
                node = node !== context && !isDocument(node) && node.parentNode
            return JSLite(node)
        },
        slice:function(argument) { return JSLite(slice.apply(this, arguments))},
        prev: function(selector){ 
            return JSLite(this.pluck('previousElementSibling')).filter(selector || '*') 
        },
        next: function(selector){
            return JSLite(this.pluck('nextElementSibling')).filter(selector || '*') 
        },
        nextAll: function (selector) {
            return JSLite(JSLite.sibling(this,'nextElementSibling')).filter(selector || '*');
        },
        prevAll: function (selector) {
            return JSLite(JSLite.sibling(this,'previousElementSibling')).filter(selector || '*');
        },
        siblings: function(selector){
            var n=[];this.map(function(i,el){
                filter.call(el.parentNode.children, function(els, idx){ 
                     if (els&&els.nodeType == 1&&els!=el) n.push(els)
                });
            })
            return JSLite(n).filter(selector || '*');
        },
        scrollTop: function(value){
            if (!this.length) return;
            var hasScrollTop = 'scrollTop' in this[0];
            if (value === undefined){
                return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
            };
            return this.each(hasScrollTop ? function(){ 
                this.scrollTop = value;
            } : function(){ 
                this.scrollTo(this.scrollX, value);
            })
        },
        scrollLeft: function(value){
            if (!this.length) return;
            var hasScrollLeft = 'scrollLeft' in this[0];
            if (value === undefined){
                return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
            };
            return this.each(hasScrollLeft ?function(){ 
                this.scrollLeft = value;
            } : function(){ 
                this.scrollTo(value, this.scrollY);
            })
        }
    });

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
        trim:function(str){if(str) return str.trim();},
        intersect:function(a,b){
            var array=[];
            a.forEach(function(item){
                if(b.indexOf(item)>-1) array.push(item);
            })
            return array;
        },
        error:function(msg) {throw msg;},
        getUrlParam:function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        each:function(elements, callback){
            var i, key
            if (likeArray(elements)) {
                for (i = 0; i < elements.length; i++)
                    if (callback.call(elements[i], i, elements[i]) === false) return elements
                } else {
                for (key in elements)
                    if (callback.call(elements[key], key, elements[key]) === false) return elements
            }
            return elements
        },
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
            while (nodes.length > 0)
            nodes = JSLite.map(nodes, function(node){
                if ((node = node[ty]) && !isDocument(node) && ancestors.indexOf(node) < 0) 
                    ancestors.push(node)
                    return node
            });
            return ancestors;
        },
        contains:function(parent, node){
            if(parent&&!node) return document.documentElement.contains(parent)
            return parent !== node && parent.contains(node)
        }
    });

    function isDocument(obj) { return obj = obj ? obj != null && obj.nodeType ? obj.nodeType == obj.DOCUMENT_NODE : false : undefined;}
    function isFunction(value) { return ({}).toString.call(value) == "[object Function]" }
    function isObject(value) { return value instanceof Object }
    function isArray(value) { return value instanceof Array }
    function isString(obj){ return typeof obj == 'string' }
    function isWindow(obj){ return obj != null && obj == obj.window }
    function isPlainObject(obj){
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }
    function isJson(obj) {
        var isjson = typeof(obj) == "object" && 
        Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isjson;
    }
    function type(obj) {
        if(!obj) return undefined;
        var type="";
        JSLite.each("Boolean Number HTMLDivElement String Function Array Date RegExp Object Error".split(" "), function(i, name) {
            if(Object.prototype.toString.call(obj).indexOf(name) > -1) type = name == "HTMLDivElement"?"Object":name;
        })
        return type;
    }
    function likeArray(obj) {return obj? typeof obj.length == 'number' :null }

    P = {
        singleTagRE:/^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        fragmentRE:/^\s*<(\w+|!)[^>]*>/,
        tagExpanderRE:/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        table: document.createElement('table'),
        tableRow: document.createElement('tr'),
        containers:{
            '*': document.createElement('div'),
            'tr': document.createElement('tbody'),
            'tbody': P.table,'thead': P.table,'tfoot': P.table,
            'td': P.tableRow,'th': P.tableRow
        }
    };

    /**
     * fragment
     * 需要一个HTML字符串和一个可选的标签名
     * 生成DOM节点从给定的HTML字符串节点。
     * 生成的DOM节点作为一个数组返回。
     */
    function fragment(html,name){
        var dom, container
        if (P.singleTagRE.test(html)) dom = JSLite(document.createElement(RegExp.$1));
        if (!dom) {
            if (html.replace) html = html.replace(P.tagExpanderRE, "<$1></$2>")
            if (name === undefined) name = P.fragmentRE.test(html) && RegExp.$1
            if (!(name in P.containers)) name = '*'
            container = P.containers[name]
            container.innerHTML = '' + html
            dom = JSLite.each(slice.call(container.childNodes), function(){
                container.removeChild(this)
            });
        }
        return dom;
    }
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
    })
    ;['after','prepend','before','append'].forEach(function(operator, operatorIndex) {
        var inside = operatorIndex % 2;
        JSLite.fn[operator] = function(){
            var argType, nodes = JSLite.map(arguments, function(arg) {
                    argType = type(arg)
                    if(argType=="Function") arg = funcArg(this, arg)
                    return argType == "Object" || argType == "Array" || arg == null ? arg : fragment(arg)
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
    
    function funcArg(context, arg, idx, payload) {
        return isFunction(arg) ? arg.call(context, idx, payload) : arg;
    }
    //字符串处理
    JSLite.extend(String.prototype,{
        trim: function () {return this.replace(/(^\s*)|(\s*$)/g, "");},
        leftTrim: function () {return this.replace(/(^\s*)/g, "");}
    });
    
    var _JSLite = window.JSLite;
    var _$ = window.$;
    JSLite.noConflict = function(deep) {
        if (deep && window.JSLite === JSLite) {
            window.JSLite = _JSLite;
        }
        if (window.$ === JSLite) window.$ = _$;
        return JSLite;
    };
    window.JSLite = window.$ = JSLite;
})(window);