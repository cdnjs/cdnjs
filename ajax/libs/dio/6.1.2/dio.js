/*
 *  ___ __ __  
 * (   (  /  \ 
 *  ) ) )( () )
 * (___(__\__/ 
 * 
 * dio is a javascript framework for building applications.
 * 
 * @licence MIT
 */
(function (factory) {
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory(global);
	}
	else if (typeof define === 'function' && define.amd) {
		define(factory(window));
	}
	else {
		window.dio = factory(window);
	}
}(function (window) {


	'use strict';


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * constants
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	// current version
	var version = '6.1.2';
	
	// enviroment
	var document = window.document || null;
	var browser = document !== null;
	
	// other
	var Promise = window.Promise;
	var requestAnimationFrame = window.requestAnimationFrame;
	var setImmediate = window.setImmediate;
	
	var promiseSupport = Promise !== void 0;
	var requestAnimationFrameSupport = requestAnimationFrame !== void 0;
	var setImmediateSupport = setImmediate !== void 0;
	
	// namespaces
	var nsStyle = 'data-scope';
	var nsMath = 'http://www.w3.org/1998/Math/MathML';
	var nsXlink = 'http://www.w3.org/1999/xlink';
	var nsSvg = 'http://www.w3.org/2000/svg';
	
	// empty shapes
	var objEmpty = {};
	var arrEmpty = [];
	var nodeEmpty = createNodeShape(0, '', objEmpty, arrEmpty, null, null, 0, null, void 0);
	var funcEmpty = function () {};
	var fragProps = {style: 'display: inherit;'};
	
	
	// server
	var server = browser === false && window.window !== window;
	var readable = server ? require('stream').Readable : null;
	
	// void elements
	var isVoid = {
		'area': 0, 'base': 0, 'br': 0, '!doctype': 0, 'col': 0, 'embed': 0,
		'wbr': 0, 'track': 0, 'hr': 0, 'img': 0, 'input': 0, 'keygen': 0, 
		'link': 0, 'meta': 0, 'param': 0, 'source': 0
	};
	
	// unicode characters
	var uniCodes = {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'&': '&amp;'
	};
	
	// regular expressions
	var regEsc = /[<>&"']/g;
	var regStyleCamel = /([a-zA-Z])(?=[A-Z])/g;
	var regStyleVendor = /^(ms|webkit|moz)/;
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * utilities
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * escape string
	 * 
	 * @param  {(string|boolean|number)} subject
	 * @return {string}
	 */
	function escape (subject) {
		return (''+subject).replace(regEsc, unicode);
	}
	
	
	/**
	 * unicode, escape => () helper
	 * 
	 * @param  {string} char
	 * @return {string}
	 */
	function unicode (char) {
		return uniCodes[char] || char;
	}
	
	
	/**
	 * try catch helper
	 * 
	 * @param  {function}  func
	 * @param  {function=} errorHandler
	 * @param  {any=}      arg
	 * @return {any}
	 */
	function sandbox (func, errorHandler, arg) {
		try {
			return arg != null ? func(arg) : func();
		}
		catch (error) {
			return errorHandler != null && errorHandler(error);
		}
	}
	
	
	/**
	 * schedule callback
	 * 
	 * @type {function}
	 * @param {function} callback
	 */
	var schedule;
	
	if (requestAnimationFrameSupport) {
		schedule = function schedule (callback) { 
			requestAnimationFrame(callback);
		}
	}
	else if (setImmediateSupport) {
		schedule = function schedule (callback) { 
			setImmediate(callback); 
		}
	}
	else if (promiseSupport) {
		schedule = function schedule (callback) { 
			Promise.resolve().then(callback); 
		}
	}
	else {
		schedule = function schedule (callback) { 
			setTimeout(callback, 0); 
		}
	}
	
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * shapes
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * Node shapes
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * element shape
	 *
	 * @public
	 * 
	 * @param  {string}               type
	 * @param  {Object<string, any>=} props
	 * @param  {VNode[]=}             children
	 * @return {VNode}
	 */
	function createElementShape (type, props, children) {
		return {
			Type: 1,
			type: type,
			props: (props = props != null ? props : objEmpty),
			children: (children == null ? [] : children),
			DOMNode: null,
			instance: null,
			index: 0,
			nodeName: null,
			key: props !== objEmpty ? props.key : void 0
		};
	}
	
	
	/**
	 * component shape
	 *
	 * @public
	 * 
	 * @param  {(function|Component)} type
	 * @param  {Object<string, any>=} props
	 * @param  {any[]=}               children
	 * @return {VNode}
	 */
	function createComponentShape (type, props, children) {
		return {
			Type: 2,
			type: type,
			props: (props = props != null ? props : objEmpty),
			children: (children == null ? arrEmpty : children),
			DOMNode: null,
			instance: null,
			index: 0,
			nodeName: null,
			key: props !== objEmpty ? props.key : void 0
		};
	}
	
	
	/**
	 * fragment shape
	 *
	 * @public
	 * 
	 * @param  {VNode[]} children
	 * @return {VNode}
	 */
	function createFragmentShape (children) {
		return {
			Type: 1,
			type: 'fragment',
			props: fragProps,
			children: children,
			DOMNode: null,
			instance: null,
			index: 0,
			nodeName: null,
			key: void 0
		};
	}
	
	
	/**
	 * create text shape
	 *
	 * @public
	 * 
	 * @param  {(string|boolean|number)} text
	 * @return {VNode}
	 */
	function createTextShape (text) {
		return {
			Type: 3,
			type: '#text',
			props: objEmpty,
			children: text,
			DOMNode: null,
			instance: null,
			index: 0,
			nodeName: null,
			key: void 0
		};
	}
	
	
	/**
	 * svg shape
	 *
	 * @public
	 * 
	 * @param  {string}               type
	 * @param  {Object<string, any>=} props
	 * @param  {VNode[]=}             children
	 * @return {VNode}
	 */
	function createSvgShape (type, props, children) {
		return {
			Type: 1,
			type: type,
			props: (props == null ? (props = {xmlns: nsSvg}) : (props.xmlns = nsSvg, props)),
			children: (children == null ? [] : children),
			DOMNode: null,
			instance: null,
			index: 0,
			nodeName: null,
			key: props.key
		};
	}
	
	
	/**
	 * create node shape
	 *
	 * @param  {number}                      Type
	 * @param  {(string|function|Component)} type
	 * @param  {Object<string, any>}         props
	 * @param  {VNode[]}                     children
	 * @param  {Node}                        DOMNode
	 * @param  {Component}                   instance
	 * @param  {number}                      index
	 * @param  {string?}                     nodeName
	 * @param  {any}                         key
	 * @return {VNode}
	 */
	function createNodeShape (Type, type, props, children, DOMNode, instance, index, nodeName, key) {
		return {
			Type: Type,
			type: type,
			props: props,
			children: children,
			DOMNode: DOMNode,
			instance: instance,
			index: index,
			nodeName: nodeName,
			key: key
		};
	}
	
	
	/**
	 * empty shape
	 * 
	 * @return {VNode}
	 */
	function createEmptyShape () {
		return {
			Type: 1,
			type: 'noscript',
			props: objEmpty,
			children: [],
			DOMNode: null,
			instance: null,
			index: 0,
			nodeName: null,
			key: void 0
		};
	}
	
	
	/**
	 * portal shape
	 *
	 * @public
	 * 
	 * @param  {Node} DOMNode
	 * @return {VNode}
	 */
	function createPortalShape (type, props, children) {
		return {
			Type: 4,
			type: type.nodeName.toLowerCase(),
			props: (props = props != null ? props : objEmpty),
			children: (children == null ? [] : children),
			DOMNode: type,
			instance: null,
			index: 0,
			nodeName: null,
			key: props !== objEmpty ? props.key : void 0
		};
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * HTTP shapes
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * request shape
	 * 
	 * @param {string}           method
	 * @param {string}           url
	 * @param {(string|Object)=} payload
	 * @param {string=}          enctype
	 * @param {string=}          responseType
	 */
	function createRequestShape (method, url, payload, enctype, responseType) {
		return {
			method: method,
			url: url,
			payload: payload,
			enctype: enctype,
			responseType: responseType,
			withCredentials: null,
			headers: null,
			initial: null,
			config: null,
			username: null,
			password: null
		};
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * stylesheet
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * create scoped stylesheet
	 *
	 * @param {Component} component
	 * @param {function}  constructor
	 * @param {Node?}     element
	 */
	function createScopedStylesheet (component, constructor, element) {
		try {
			// create
			if (component.stylesheet.CSSNamespace === void 0) {
				createScopedCSS(component, constructor.COMPCache || constructor, true)(element);
			}
			// namespace
			else {
				component.stylesheet(element);
			}
		}
		catch (error) {
			componentErrorBoundary(error, component, 'stylesheet');
		}
	}
	
	
	/**
	 * create scoped css
	 * 
	 * @param  {Component}       component
	 * @param  {function}        constructor
	 * @param  {boolean}         inject
	 * @return {function(?Node)}
	 */
	function createScopedCSS (component, constructor, inject) {
		var namespace = component.displayName || constructor.name;
		var selector = '['+nsStyle+'='+namespace+']';
		var css = component.stylesheet();
		var output = stylesheet(selector, css, true, true, null);
	
		if (browser && inject) {
			// obscure namesapce to avoid id/global namespace conflicts
			var id = '\''+namespace+'\'';
	
			// prevent duplicate styles when SSR outputs stylesheet
			if (document.getElementById(id) == null) {			
				var style = document.createElement('style');
				
				style.textContent = output;
				style.id = id;
	
				document.head.appendChild(style);
			}
		}
	
		/**
		 * decorator
		 * 
		 * @param  {?Node} DOMNode
		 * @return {(undefined|string)}
		 */
		function decorator (DOMNode) {
			// SSR
			if (DOMNode === null) {
				return output;
			}
			// DOM
			else {
				DOMNode.setAttribute(nsStyle, namespace);
			}
		}
	
		decorator.CSSNamespace = namespace;
	
		// replace stylesheet method for all instances with the style constructor `decorator`
		return component.stylesheet = constructor.prototype.stylesheet = decorator;
	}
	
	
	/**
	 * css preprocessor
	 *
	 * @example stylesheet('.foo', 'css...', true, true, null);
	 * 
	 * @param  {string}   selector   - i.e `.class` or `#id` or `[attr=id]`
	 * @param  {string}   styles     - css string
	 * @param  {boolean=} animations - prefix animations and keyframes, true by default
	 * @param  {boolean=} compact    - enable additional features(mixins and variables)
	 * @param  {function(context, content, line, column)=} middleware
	 * @return {string}
	 */
	function stylesheet (selector, styles, animations, compact, middleware) {
	    // to string
	    selector += '';
	
	    var prefix = '';
	    var namespace = '';
	    var type = selector.charCodeAt(0) || 0;
	    
	    var char;
	    var attr;
	    var animns;
	    var plugins;
	    var uses;
	
	    // [ attr selector
	    if (type === 91) {
	        // `[data-id=namespace]` -> ['data-id', 'namespace']
	        attr = selector.substring(1, selector.length-1).split('=');
	        char = (namespace = attr[1]).charCodeAt(0);
	
	        // [data-id="namespace"]/[data-id='namespace']
	        // --> "namespace"/'namspace' --> namespace
	        if (char === 34 || char === 39) {
	            namespace = namespace.substring(1, namespace.length-1);
	        }
	
	        prefix = '['+ attr[0] + '="' + namespace +'"]';
	    }
	    // `#` `.` `>` id class and descendant selectors
	    else if (type === 35 || type === 46 || type === 62) {
	        namespace = (prefix = selector).substring(1);
	    }
	    // element selector
	    else {
	        namespace = prefix = selector;
	    }
	
	    // reset type signature
	    type = 0;
	
	    // animation and keyframe namespace
	    if (animations == void 0 || animations === true) {
	        animations = true;
	        animns = namespace;
	    }
	    else {
	        animns = '';
	        animations = false;
	    }
	
	    // uses middleware
	    var use = middleware != null;
	
	    // middleware
	    if (use) {
	        uses = (typeof middleware).charCodeAt(0);
	
	        // o, object of middlewares
	        if (uses === 111) {
	            stylesheet.use(middleware, null);
	        }
	        // f, not a single function middleware
	        else if (uses !== 102) {
	            use = false;
	        }
	    }
	
	    // plugins
	    if ((plugins = stylesheet.plugins).length !== 0) {
	        middleware = function (ctx, str, line, col) {
	            var output = str;
	
	            for (var i = 0, length = plugins.length; i < length; i++) {
	                output = plugins[i](ctx, output, line, col) || output;
	            }
	
	            return output !== str ? output : void 0;
	        };
	
	        use = true;
	    }
	
	    // declare
	    var colon;
	    var inner;
	    var selectors;
	    var build;
	    var media;
	    var temp;
	    var prev;
	    var indexOf;
	    var first;
	    var second;
	    var third;
	    var sel;
	
	    // variables
	    var variables;
	
	    // mixins
	    var mixins;
	    var mixin;
	
	    // buffers
	    var buff = '';
	    var blob = '';
	    var blck = '';
	    var nest = '';
	    var flat = '';
	    var code = 0;
	
	    // context signatures       
	    var special = 0;
	    var close = 0;
	    var closed = 0;
	    var comment = 0;
	    var comments = 0;
	    var strings = 0;
	    var nested = 0;
	    var func = 0;
	
	    // context(flat) signatures
	    var levels = 0;
	    var level = 0;
	
	    // prefixes
	    var moz = '-moz-';
	    var ms = '-ms-';
	    var webkit = '-webkit-';
	
	    if (use) {
	        temp = middleware(0, styles, line, column);
	        
	        if (temp != null) {
	            styles = temp;
	        }
	    }
	
	    // positions
	    var caret = 0;
	    var depth = 0;
	    var column = 0;
	    var line = 1;
	    var eof = styles.length;
	
	    // compiled output
	    var output = '';
	
	    // parse + compile
	    while (caret < eof) {
	        code = styles.charCodeAt(caret);
	
	        // {, }, ; characters, parse line by line
	        if (strings === 0 && func === 0 && (code === 123 || code === 125 || code === 59)) {
	            buff += styles.charAt(caret);
	
	            first = buff.charCodeAt(0);
	
	            // only trim when the first character is a space ` `
	            if (first === 32) {
	                first = (buff = buff.trim()).charCodeAt(0);
	            }
	
	            // default to 0 instead of NaN if there is no second/third character
	            second = buff.charCodeAt(1) || 0;
	            third = buff.charCodeAt(2) || 0;
	
	            // middleware, selector/property context, }
	            if (use && code !== 125) {
	                // { selector context
	                if (code === 123) {
	                    temp = middleware(1, buff.substring(0, buff.length - 1).trim(), line, column);
	                } 
	                // ; property context
	                else {
	                    temp = middleware(2, buff, line, column);
	                }
	
	                if (temp != null) {
	                    buff = code === 123 ? temp + '{' : temp;
	                }
	            }
	
	            // ignore comments
	            if (comment === 2) {
	                if (code === 125) {
	                    comment = 0;
	                }
	                buff = ''; 
	            }
	            // @, special block
	            else if (first === 64) {
	                // push flat css
	                if (levels === 1 && flat.length !== 0) {
	                    levels = 0;
	                    flat = prefix + ' {' + flat + '}';
	
	                    // middleware, flat context
	                    if (use) {
	                        temp = middleware(4, flat, line, column);
	                    
	                        if (temp != null) {
	                            flat = temp;
	                        }
	                    }
	
	                    output += flat;
	                    flat = '';
	                }
	
	                // @keyframe/@global, `k` or @global, `g` character
	                if (second === 107 || second === 103) {
	                    // k, @keyframes
	                    if (second === 107) {
	                        blob = buff.substring(1, 11) + animns + buff.substring(11);
	                        buff = '@'+webkit+blob;
	                        type = 1;
	                    }
	                    // g, @global
	                    else {
	                        buff = '';
	                    }
	                }
	                // @media/@mixin `m` character
	                else if (second === 109) {
	                    // @mixin
	                    if (compact === true && third === 105) {
	                        // first match create mixin store
	                        mixins === void 0 && (mixins = {});
	
	                        // retrieve mixin identifier
	                        blob = (mixin = buff.substring(7, buff.indexOf('{')) + ' ').trim();
	
	                        // cache current mixin name
	                        mixin = mixin.substring(0, mixin.indexOf(' ')).trim();
	
	                        // append mixin identifier
	                        mixins[mixin] = {key: blob.trim(), body: ''};
	
	                        type = 3;
	                        buff = '';
	                        blob = '';
	                    }
	                    // @media
	                    else if (third === 101) {
	                        // nested
	                        if (depth !== 0) {
	                            // discard first character {
	                            caret++;
	                            
	                            media = '';
	                            inner = '';
	                            selectors = prev.split(',');
	
	                            // keep track of opening `{` and `}` occurrences
	                            closed = 1;
	
	                            // travel to the end of the block
	                            while (caret < eof) {
	                                char = styles.charCodeAt(caret);
	
	                                // {, }, nested blocks may have nested blocks
	                                if (char === 123) {
	                                    closed++;
	                                }
	                                else if (char === 125) {
	                                    closed--;
	                                }
	
	                                // break when the nested block has ended
	                                if (closed === 0) {
	                                    break;
	                                }
	
	                                // build content of nested block
	                                inner += styles.charAt(caret++);
	                            }
	
	                            for (var i = 0, length = selectors.length; i < length; i++) {
	                                selector = selectors[i];
	
	                                // build media block
	                                media += stylesheet(
	                                    // remove { on last selector
	                                    (i === length - 1 ? selector.substring(0, selector.length - 1) :  selector).trim(),
	                                    inner, 
	                                    animations, 
	                                    compact, 
	                                    middleware
	                                );
	                            }
	
	                            media = buff + media + '}';
	                            buff = '';
	                            type = 4;
	                        }
	                        // top-level
	                        else {
	                            type = 2;
	                        }
	                    }
	                    // unknown
	                    else {
	                        type = 6;
	                    }
	                }
	
	                // @include/@import `i` character
	                if (second === 105) {
	                    // @include `n` character
	                    if (compact === true && third === 110) {
	                        buff = buff.substring(9, buff.length - 1);
	                        indexOf = buff.indexOf('(');
	
	                        // function mixins
	                        if (indexOf !== -1) {
	                            // mixin name
	                            var name = buff.substring(0, indexOf);
	
	                            // mixin data
	                            var data = mixins[name];
	
	                            // args passed to the mixin
	                            var argsPassed = buff.substring(name.length+1, buff.length - 1).split(',');
	
	                            // args the mixin expects
	                            var argsExpected = data.key.replace(name, '').replace(/\(|\)/g, '').trim().split(',');
	                            
	                            buff = data.body;
	
	                            for (var i = 0, length = argsPassed.length; i < length; i++) {
	                                var arg = argsExpected[i].trim();
	
	                                // if the mixin has a slot for that arg
	                                if (arg !== void 0) {
	                                    buff = buff.replace(new RegExp('var\\(~~'+arg+'\\)', 'g'), argsPassed[i].trim());
	                                }
	                            }
	
	                            // create block and update styles length
	                            styles += buff;
	                            eof += buff.length;
	
	                            // reset
	                            buff = '';
	                        }
	                        // static mixins
	                        else {
	                            buff = mixins[buff].body;
	
	                            if (depth === 0) {
	                                // create block and update styles length
	                                styles += buff;
	                                eof += buff.length;
	
	                                // reset
	                                buff = '';
	                            }
	                        }
	                    }
	                    // @import `m` character
	                    else if (third === 109 && use) {
	                        // avoid "foo.css"; "foo" screen; "http://foo.com/bar"; url(foo);
	                        var match = /@import.*?(["'`][^\.\n\r]*?["'`];|["'`][^:\r\n]*?\.[^c].*?["'`])/g.exec(buff);
	
	                        if (match !== null) {
	                            // middleware, import context
	                            buff = middleware(5, match[1].replace(/['"; ]/g, ''), line, column) || '';
	
	                            if (buff) {
	                                // create block and update styles length
	                                styles = styles.substring(0, caret+1) + buff + styles.substring(caret+1);
	                                eof += buff.length;
	                            }
	
	                            buff = '';
	                        }
	                    }
	                }
	                // flag special, i.e @keyframes, @global
	                else if (type !== 4) {
	                    close = -1;
	                    special++;
	                }
	            }
	            // ~, ; variables
	            else if (compact === true && code === 59 && first === 126 && second === 126) {
	                colon = buff.indexOf(':');
	
	                // first match create variables store 
	                if (variables === void 0) {
	                    variables = [];
	                }
	
	                // push key value pair
	                variables[variables.length] = [buff.substring(0, colon), buff.substring(colon+1, buff.length - 1).trim()];
	
	                // reset buffer
	                buff = '';
	            }
	            // property/selector
	            else {
	                // animation: a, n, i characters
	                if (first === 97 && second === 110 && third === 105) {
	                    // removes ;
	                    buff = buff.substring(0, buff.length - 1);
	
	                    // position of :
	                    colon = buff.indexOf(':')+1;
	
	                    // left hand side everything before `:`
	                    build = buff.substring(0, colon);
	
	                    // right hand side everything after `:` /* @type string[] */
	                    var anims = buff.substring(colon).trim().split(',');
	
	                    // - short hand animation syntax
	                    if (animations === true && (buff.charCodeAt(9) || 0) !== 45) {
	                        // because we can have multiple animations `animation: slide 4s, slideOut 2s`
	                        for (var j = 0, length = anims.length; j < length; j++) {
	                            var anim = anims[j];
	                            var props = anim.split(' ');
	
	                            // since we can't be sure of the position of the name of the animation we have to find it
	                            for (var k = 0, l = props.length; k < l; k++) {
	                                var prop = props[k].trim();
	                                var frst = prop.charCodeAt(0);
	                                var thrd = prop.charCodeAt(2);
	                                var len = prop.length;
	                                var last = prop.charCodeAt(len - 1);
	
	                                // animation name is anything not in this list
	                                if (
	                                    // cubic-bezier()/steps(), ) 
	                                    last !== 41 && len !== 0 &&
	
	                                    // infinite, i, f, e
	                                    !(frst === 105 && thrd === 102 && last === 101 && len === 8) &&
	
	                                    // linear, l, n, r
	                                    !(frst === 108 && thrd === 110 && last === 114 && len === 6) &&
	
	                                    // alternate/alternate-reverse, a, t, e
	                                    !(frst === 97 && thrd === 116 && last === 101 && (len === 9 || len === 17)) &&
	
	                                    // normal, n, r, l
	                                    !(frst === 110 && thrd === 114 && last === 108 && len === 6) &&
	
	                                    // backwards, b, c, s
	                                    !(frst === 98 && thrd === 99 && last === 115 && len === 9) &&
	
	                                    // forwards, f, r, s
	                                    !(frst === 102 && thrd === 114 && last === 115 && len === 8) &&
	
	                                    // both, b, t, h
	                                    !(frst === 98 && thrd === 116 && last === 104 && len === 4) &&
	
	                                    // none, n, n, e
	                                    !(frst === 110 && thrd === 110 && last === 101 && len === 4)&&
	
	                                    // running, r, n, g 
	                                    !(frst === 114 && thrd === 110 && last === 103 && len === 7) &&
	
	                                    // paused, p, u, d
	                                    !(frst === 112 && thrd === 117 && last === 100 && len === 6) &&
	
	                                    // reversed, r, v, d
	                                    !(frst === 114 && thrd === 118 && last === 100 && len === 8) &&
	
	                                    // step-start/step-end, s, e, (t/d)
	                                    !(
	                                        frst === 115 && thrd === 101 && 
	                                        ((last === 116 && len === 10) || (last === 100 && len === 8)) 
	                                    ) &&
	
	                                    // ease/ease-in/ease-out/ease-in-out, e, s, e
	                                    !(
	                                        frst === 101 && thrd === 115 &&
	                                        (
	                                            (last === 101 && len === 4) ||
	                                            (len === 11 || len === 7 || len === 8) && prop.charCodeAt(4) === 45
	                                        )
	                                    ) &&
	
	                                    // durations, 0.4ms, .4s, 400ms ...
	                                    isNaN(parseFloat(prop)) &&
	
	                                    // handle spaces in cubic-bezier()/steps() functions
	                                    prop.indexOf('(') === -1
	                                ) {
	                                    props[k] = animns + prop;
	                                }
	                            }
	
	                            build += (j === 0 ? '' : ',') + props.join(' ').trim();
	                        }
	                    }
	                    // explicit syntax, anims array should have only one elemenet
	                    else {
	                        // n
	                        build += ((buff.charCodeAt(10) || 0) !== 110 ? '' : animns) + anims[0].trim();
	                    }
	
	                    // vendor prefix
	                    buff = webkit + build + ';' + build + ';';
	                }
	                // appearance: a, p, p
	                else if (first === 97 && second === 112 && third === 112) {
	                    // vendor prefix -webkit- and -moz-
	                    buff = (
	                        webkit + buff + 
	                        moz + buff + 
	                        buff
	                    );
	                }
	                // display: d, i, s
	                else if (first === 100 && second === 105 && third === 115) {
	                    // flex/inline-flex
	                    if ((indexOf = buff.indexOf('flex')) !== -1) {
	                        // e, inline-flex
	                        temp = buff.charCodeAt(indexOf-2) === 101 ? 'inline-' : '';
	
	                        // vendor prefix
	                        buff = 'display:'+webkit+temp+'box;display:'+webkit+temp+'flex;'+ms+'flexbox;display:'+temp+'flex;';
	                    }
	                }
	                // transforms & transitions: t, r, a 
	                else if (first === 116 && second === 114 && third === 97) {
	                    // vendor prefix -webkit- and -ms- if transform
	                    buff = (
	                        webkit + buff + 
	                        (buff.charCodeAt(5) === 102 ? ms + buff : '') + 
	                        buff
	                    );
	                }
	                // hyphens: h, y, p
	                // user-select: u, s, e
	                else if (
	                    (first === 104 && second === 121 && third === 112) ||
	                    (first === 117 && second === 115 && third === 101)
	                ) {
	                    // vendor prefix all
	                    buff = (
	                        webkit + buff + 
	                        moz + buff + 
	                        ms + buff + 
	                        buff
	                    );
	                }
	                // flex: f, l, e
	                else if (first === 102 && second === 108 && third === 101) {
	                    // vendor prefix all but moz
	                    buff = (
	                        webkit + buff + 
	                        ms + buff + 
	                        buff
	                    );
	                }
	                // order: o, r, d
	                else if (first === 111 && second === 114 && third === 100) {
	                    // vendor prefix all but moz
	                    buff = (
	                        webkit + buff + 
	                        ms + 'flex-' + buff + 
	                        buff
	                    );
	                }
	                // align-items, align-center, align-self: a, l, i, -
	                else if (first === 97 && second === 108 && third === 105 && (buff.charCodeAt(5) || 0) === 45) {
	                    switch (buff.charCodeAt(6) || 0) {
	                        // align-items, i
	                        case 105: {
	                            temp = buff.replace('-items', '');
	                            buff = (
	                                webkit + 'box-' + temp + 
	                                ms + 'flex-'+ temp + 
	                                buff
	                            );
	                            break;
	                        }
	                        // align-self, s
	                        case 115: {
	                            buff = (
	                                ms + 'flex-item-' + buff.replace('-self', '') + 
	                                buff
	                            );
	                            break;
	                        }
	                        // align-content
	                        default: {
	                            buff = (
	                                ms + 'flex-line-pack' + buff.replace('align-content', '') + 
	                                buff
	                            );
	                            break;
	                        }
	                    }
	                }
	                // { character, selector declaration
	                else if (code === 123) {
	                    depth++;
	
	                    // push flat css
	                    if (levels === 1 && flat.length !== 0) {
	                        levels = 0;
	                        flat = prefix + ' {' + flat + '}';
	
	                        // middleware, flat context
	                        if (use) {
	                            temp = middleware(4, flat, line, column);
	                        
	                            if (temp != null) {
	                                flat = temp;
	                            }
	                        }
	
	                        output += flat;
	                        flat = '';
	                    }
	
	                    if (special === 0 || type === 2) {
	                        // nested selector
	                        if (depth === 2) {
	                            // discard first character {
	                            caret++;
	
	                            // inner content of block
	                            inner = '';
	
	                            var nestSelector = buff.substring(0, buff.length-1).split(',');
	                            var prevSelector = prev.substring(0, prev.length-1).split(',');
	
	                            // keep track of opening `{` and `}` occurrences
	                            closed = 1;
	
	                            // travel to the end of the block
	                            while (caret < eof) {
	                                char = styles.charCodeAt(caret);
	
	                                // {, }, nested blocks may have nested blocks
	                                if (char === 123) {
	                                    closed++;
	                                }
	                                else if (char === 125) {
	                                    closed--;
	                                }
	
	                                // break when the nested block has ended
	                                if (closed === 0) {
	                                    break;
	                                }
	
	                                // build content of nested block
	                                inner += styles.charAt(caret++);
	                            }
	
	                            // handle multiple selectors: h1, h2 { div, h4 {} } should generate
	                            // -> h1 div, h2 div, h2 h4, h2 div {}
	                            for (var j = 0, length = prevSelector.length; j < length; j++) {
	                                // extract value, prep index for reuse
	                                temp = prevSelector[j];
	                                prevSelector[j] = '';
	
	                                // since there could also be multiple nested selectors
	                                for (var k = 0, l = nestSelector.length; k < l; k++) {
	                                    selector = temp.replace(prefix, '&').trim();
	                                    sel = nestSelector[k].trim();
	
	                                    if (sel.indexOf(' &') > 0) {
	                                        selector = sel.replace('&', '').trim() + ' ' + selector;
	                                    }
	                                    else {
	                                        selector = selector + ' ' + sel;
	                                    }
	
	                                    prevSelector[j] += selector.trim() + (k === l - 1  ? '' : ',');
	                                }
	                            }
	
	                            // the `new line` is to avoid conflicts when the last line is a // line comment
	                            buff = ('\n' + prevSelector.join(',') + ' {'+inner+'}');
	
	                            // append nest
	                            nest += buff.replace(/ +&/g, '');
	
	                            // signature
	                            nested = 1;
	
	                            // clear current line, to avoid adding nested blocks to the normal flow
	                            buff = '';
	
	                            // decreament depth
	                            depth--;
	                        }
	                        // top-level selector
	                        else {
	                            selectors = buff.split(',');
	                            build = '';
	
	                            // prefix multiple selectors with namesapces
	                            // @example h1, h2, h3 --> [namespace] h1, [namespace] h1, ....
	                            for (var j = 0, length = selectors.length; j < length; j++) {
	                                var firstChar = (selector = selectors[j]).charCodeAt(0);
	
	                                // ` `, trim if first character is a space
	                                if (firstChar === 32) {
	                                    firstChar = (selector = selector.trim()).charCodeAt(0);
	                                }
	
	                                // [, [title="a,b,..."]
	                                if (firstChar === 91 && selector.indexOf(']') === -1) {
	                                    for (var k = j + 1, l = length; k < l; k++) {
	                                        var broken = (selector += ',' + selectors[k]).trim();
	
	                                        // ], end
	                                        if (broken.indexOf(']') !== -1) {
	                                            length -= k;
	                                            selectors.splice(j, k);
	                                            break;
	                                        }
	                                    }
	                                }
	
	                                // &
	                                if (firstChar === 38) {
	                                    // before: & {
	                                    selector = prefix + selector.substring(1);
	                                    // after: ${prefix} {
	                                }
	                                else {
	                                    // default to :global if & exist outside of the first non-space character
	                                    if ((indexOf = selector.indexOf(' &')) > 0) {
	                                        // `:`
	                                        firstChar = 58;
	                                        // before: html & {
	                                        selector = ':global('+selector.substring(0, indexOf)+')' + selector.substring(indexOf);
	                                        // after: html ${prefix} {
	                                    }
	
	                                    // :
	                                    if (firstChar === 58) {
	                                        var secondChar = selector.charCodeAt(1);
	
	                                        // h, t, :host
	                                        if (secondChar === 104 && selector.charCodeAt(4) === 116) {
	                                            var nextChar = (selector = selector.substring(5)).charCodeAt(0);
	
	                                            // :host(selector)                    
	                                            if (nextChar === 40) {
	                                                // before: `(selector)`
	                                                selector = prefix + selector.substring(1).replace(')', '');
	                                                // after: ${prefx} selector {
	                                            }
	                                            // :host-context(selector)
	                                            else if (nextChar === 45) {
	                                                indexOf = selector.indexOf(')');
	
	                                                // before: `-context(selector)`
	                                                selector = (
	                                                    selector.substring(9, indexOf)+' '+prefix+selector.substring(indexOf+1)
	                                                );
	                                                // after: selector ${prefix} {
	                                            }
	                                            // :host
	                                            else {
	                                                selector = prefix + selector;
	                                            }
	                                        }
	                                        // g, :global(selector)
	                                        else if (secondChar === 103) {
	                                            // before: `:global(selector)`
	                                            selector = selector.substring(8).replace(')', '').replace('&', prefix);
	                                            // after: selector
	                                        }
	                                        // :hover, :active, :focus, etc...
	                                        else {
	                                            selector = prefix + selector;
	                                        }
	                                    }
	                                    // non-pseudo selectors
	                                    else {
	                                        selector = prefix + ' ' + selector;
	                                    }
	                                }
	
	                                // if first selector do not prefix with `,`
	                                build += (j === 0 ? selector : ',' + selector);
	                            }
	
	                            // cache current selector
	                            prev = (buff = build);
	                        }
	                    }
	                }
	                // } character
	                else if (code === 125) {
	                    if (depth !== 0) {
	                        depth--;
	                    }
	
	                    // concat nested css
	                    if (depth === 0 && nested === 1) {
	                        styles = styles.substring(0, caret+1) + nest + styles.substring(caret+1);
	                        eof += nest.length;
	                        nest = '';
	                        nested = 0;
	                        close++;
	                    }
	                }
	
	                // @global/@keyframes
	                if (special !== 0) {
	                    // }, find closing tag
	                    if (code === 125) {
	                        close++;
	                    } 
	                    // {
	                    else if (code === 123 && close !== 0) {
	                        close--;
	                    }
	
	                    // append flat @media css
	                    if (level === 1 && (code === 123 || close === 0) && flat.length !== 0) {
	                        level = 0;
	                        buff = prefix + ' {'+flat+'}' + buff;
	                        flat = '';
	                    }
	
	                    // closing tag
	                    if (close === 0) {
	                        // @global
	                        if (type === 0) {
	                            buff = '';
	                        }
	                        // @keyframes 
	                        else if (type === 1) {
	                            // vendor prefix
	                            buff = '}@'+blob+'}';
	
	                            // reset
	                            blob = '';
	                        }
	                        // @mixin
	                        else if (type === 3) {
	                            // append body of mixin
	                            mixins[mixin].body = blob;
	
	                            // reset
	                            mixin = '';
	                            buff = '';
	                            blob = '';
	                        }
	
	                        // reset signatures
	                        type = 0;
	                        close--;
	                        special--;
	                    }
	                    // @keyframes, @mixin
	                    else if (type === 1 || type === 3) {
	                        blob += buff;
	
	                        if (type === 3) {
	                            buff = '';
	                        }
	                    }
	                    // @media flat context
	                    else if (type === 2 && depth === 0) {
	                        if (code !== 125) {
	                            if (level === 0) {
	                                flat = '';
	                            }
	
	                            flat += buff;
	                            buff = '';
	                        }
	
	                        level = 1;
	                    }
	                }
	                // flat context
	                else if (depth === 0 && code !== 125) {
	                    levels = 1;
	                    flat = flat === void 0 ? buff : flat + buff;
	                    buff = '';
	                }
	            }
	
	            // append line to blck buffer
	            blck += buff;
	
	            // reset line buffer
	            buff = '';
	
	            // add blck buffer to output
	            if (code === 125 && comment === 0 && (type === 0 || type === 4)) {                  
	                // append if the block is not empty {}
	                if (blck.charCodeAt(blck.length-2) !== 123) {
	                    // middleware, block context
	                    if (use && blck.length !== 0) {
	                        temp = middleware(3, blck, line, column);
	
	                        if (temp != null) {
	                            blck = temp;
	                        }
	                    }
	
	                    // append blck buffer
	                    output += blck.trim();
	                }
	
	                // nested @media
	                if (type === 4) {
	                    // middleware, block context
	                    if (use) {
	                        temp = middleware(3, media, line, column);
	
	                        if (temp != null) {
	                            media = temp;
	                        }
	                    }
	
	                    // reset
	                    type = 0;
	
	                    // concat nested @media block
	                    output += media;
	                }
	
	                // reset blck buffer
	                blck = '';
	            }
	        }
	        // build line by line
	        else {
	            // \r, \n, new lines
	            if (code === 13 || code === 10) {
	                // ignore line and block comments
	                if (comment === 2) {
	                    // * character, block comment
	                    if (buff.charCodeAt(buff.length - 2) === 42) {
	                        buff = buff.substring(0, buff.indexOf('/*')).trim();
	                    }
	                    else {
	                        // / character, does not start with `/`
	                        if (buff.charCodeAt(0) !== 47 && (indexOf = buff.indexOf('//')) !== -1) {
	                            buff = buff.substring(0, indexOf).trim();
	                        }
	                        else {
	                            buff = '';
	                        }
	                    }
	
	                    comments = 0;
	                    comment = 0;
	                }
	
	                column = 0;
	                line++;
	            }
	            // not `\t` tab character
	            else if (code !== 9) {
	                switch (code) {
	                    // " character
	                    case 34: {
	                        // exit string " context / enter string context
	                        strings = strings === 34 ? 0 : (strings === 39 ? 39 : 34);
	                        break;
	                    }
	                    // ' character
	                    case 39: {
	                        // exit string ' context / enter string context
	                        strings = strings === 39 ? 0 : (strings === 34 ? 34 : 39);
	                        break;
	                    }
	                    // ( character
	                    case 40: {
	                        if (strings === 0) {
	                            func = 1;
	                        }
	                        break;
	                    }
	                    // ) character
	                    case 41: {
	                        if (strings === 0) {
	                            func = 0;
	                        }
	                        break;
	                    }
	                    // / character
	                    case 47: {
	                        if (strings === 0 && func !== 1 && comment < 2) {
	                            // * character
	                            if (comments === 0 || styles.charCodeAt(caret - 1) === 42) {
	                                comment++;              
	                            }
	
	                            // * character, allow line comments in block comments
	                            if (comments === 0 && styles.charCodeAt(caret + 1) === 42) {
	                                comments = 1;
	                            }
	                        }
	                        break;
	                    }
	                }
	
	                // build line buffer
	                buff += styles.charAt(caret);
	            }
	        }
	
	        // move caret position
	        caret++;
	
	        // move column position
	        column++;
	    }
	
	    // trailing flat css
	    if (flat !== void 0 && flat.length !== 0) {
	        flat = prefix + ' {' + flat + '}';
	
	        // middleware, flat context
	        if (use) {
	            temp = middleware(4, flat, line, column);
	        
	            if (temp != null) {
	                flat = temp;
	            }
	        }
	
	        // append flat css
	        output += flat;
	    }
	
	    // has variables
	    if (compact && variables !== void 0) {
	        // replace all variables
	        for (var i = 0, length = variables.length; i < length; i++) {
	            output = output.replace(new RegExp('var\\('+variables[i][0]+'\\)', 'g'), variables[i][1]);
	        }
	    }
	
	    // middleware, output context
	    if (use) {
	        temp = middleware(6, output, line, column);
	    
	        if (temp != null) {
	            output = temp;
	        }
	    }
	
	    return output;
	}
	
	
	/**
	 * use plugin
	 * 
	 * @param  {string|function|function[]} key
	 * @param  {function?} plugin
	 * @return {Object} {use, plugins}
	 */
	stylesheet.use = function (key, plugin) {
	    var plugins = stylesheet.plugins;
	    var length = plugins.length;
	
	    if (plugin == null) {
	        plugin = key;
	        key = void 0;
	    }
	
	    if (plugin != null) {
	        // object of plugins
	        if (plugin.constructor === Object) {
	            for (var name in plugin) {
	                stylesheet.use(name, plugin[name]);
	            }
	        }
	        // array of plugins
	        else if (plugin.constructor === Array) {
	            for (var i = 0, length = plugin.length; i < length; i++) {
	                plugins[length++] = plugin[i];
	            }
	        }
	        // single un-keyed plugin
	        else if (key == null) {
	            plugins[length] = plugin;
	        }
	        // keyed plugin
	        else {
	            var pattern = (key instanceof RegExp) ? key : new RegExp(key + '\\([ \\t\\r\\n]*([^\\0]*?)[ \\t\\r\\n]*\\)', 'g');
	            var regex = /[ \t\r\n]*,[ \t\r\n]*/g;
	
	            plugins[length] = function (ctx, str, line, col) {
	                if (ctx === 6) {
	                    str = str.replace(pattern, function (match, group) {
	                        var args = group.replace(regex, ',').split(',');
	                        var replace = plugin.apply(null, args);
	
	                        return replace != null ? replace : match;
	                    });
	
	                    return str;
	                }
	            }
	        }
	    }
	
	    return stylesheet;
	};
	
	
	/**
	 * plugin store
	 * 
	 * @type {function[]}
	 */
	stylesheet.plugins = [];
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * element
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * create virtual element
	 *
	 * @public
	 * 
	 * @param  {(string|function|Component)} type
	 * @param  {Object<string, any>=}        props
	 * @param  {...any=}                     children
	 * @return {Object<string, any>}
	 */
	function createElement (type, props) {
		if (type == null) {
			return createEmptyShape();
		}
	
		var length = arguments.length;
		var children = [];
		var position = 2;
	
		// if props is not a normal object
		if (props == null || props.constructor !== Object || props.props !== void 0) {
			// update position if props !== null
			if (props !== null) {
				props = null;
				position = 1; 
			}
		}
	
		if (length !== 1) {
			var index = 0;
			
			// construct children
			for (var i = position; i < length; i++) {
				var child = arguments[i];
				
				// only add non null/undefined children
				if (child != null) {
					// if array, flatten
					if (child.constructor === Array) {
						// add array child
						for (var j = 0, len = child.length; j < len; j++) {
							index = createChild(child[j], children, index);
						}
					}
					else {
						index = createChild(child, children, index);
					}
				}
			}
		}
	
		var typeOf = typeof type;
	
		if (typeOf === 'string') {
			// fragment
			if (type === '@') {
				return createFragmentShape(children);
			}
			// element
			else {
				if (props === null) {
					props = {};
				}
	
				// svg and math namespaces
				if (type === 'svg') {
					props.xmlns = nsSvg; 
				}
				else if (type === 'math') { 
					props.xmlns = nsMath;
				}
	
				return createElementShape(type, props, children);
			}
		}
		// component
		else if (typeOf === 'function') {
			return createComponentShape(type, props, children);
		}
		// hoisted
		else if (type.Type != null) {
			return cloneElement(type, props, children);
		}
		// portal
		else if (type.nodeType != null) {
			return createPortalShape(type, props != null ? props : objEmpty, children);
		}
		// fragment
		else {
			return createElement('@', null, type);
		}
	}
	
	
	/**
	 * create virtual child node
	 * 
	 * @param  {*}       child
	 * @param  {VNode[]} children
	 * @param  {number}  index
	 * @return {number}  index
	 */
	function createChild (child, children, index) {
		if (child != null) {
			// vnode
			if (child.Type !== void 0) {
				children[index++] = child;
			}
			// portal
			else if (child.nodeType !== void 0) {
				children[index++] = createPortalShape(child, objEmpty, arrEmpty);
			}
			else {
				var type = typeof child;
	
				// function/component
				if (type === 'function') {
					children[index++] = createComponentShape(child, objEmpty, arrEmpty);
				}
				// array
				else if (type === 'object') {
					for (var i = 0, length = child.length; i < length; i++) {
						index = createChild(child[i], children, index);
					}
				}
				// text
				else {
					children[index++] = createTextShape(type !== 'boolean' ? child : '');
				}
			}
		}
	
		return index;
	}
	
	
	/**
	 * clone and return an element having the original element's props
	 * with new props merged in shallowly and new children replacing existing ones.
	 *
	 * @public
	 * 
	 * @param  {VNode}                subject
	 * @param  {Object<string, any>=} newProps
	 * @param  {any[]=}               newChildren
	 * @return {VNode}
	 */
	function cloneElement (subject, newProps, newChildren) {
		var type = subject.type;
		var props = subject.props;
		var children = newChildren || subject.children;
	
		newProps = newProps || {};
	
		// copy old props
		for (var name in subject.props) {
			if (newProps[name] === void 0) {
				newProps[name] = props[name];
			}
		}
	
		// replace children
		if (newChildren !== void 0) {
			var length = newChildren.length;
	
			// if not empty, copy
			if (length > 0) {
				var index = 0;
				
				children = [];
	
				// copy old children
				for (var i = 0; i < length; i++) {
					index = createChild(newChildren[i], children, index);
				}
			}
		}
	
		return createElement(type, newProps, children);
	}
	
	
	/**
	 * clone virtual node
	 * 
	 * @param  {VNode} subject
	 * @return {VNode}
	 */
	function cloneNode (subject) {
		return createNodeShape(
			subject.Type,
			subject.type,
			subject.props,
			subject.children,
			subject.DOMNode,
			null,
			0,
			null,
			void 0
		);
	}
	
	
	/**
	 * create element factory
	 * 
	 * @param  {string}              type
	 * @param  {Object<string, any>} props
	 * @return {createElement(?Object<string>, ...any=)}
	 */
	function createFactory (type, props) {
		return props != null ? createElement.bind(null, type, props) : createElement.bind(null, type);
	}
	/**
	 * is valid element
	 *
	 * @public
	 * 
	 * @param  {any} subject
	 * @return {boolean}
	 */
	function isValidElement (subject) {
		return subject != null && subject.Type != null;
	}
	
	
	/**
	 * DOM factory, create vnode factories
	 *
	 * @public
	 * 
	 * @param  {string[]}                 types
	 * @return {Object<string, function>} elements
	 */
	function DOM (types) {
		var elements = {};
	
		// add element factories
		for (var i = 0, length = types.length; i < length; i++) {
			elements[types[i]] = createElementShape.bind(null, types[i]);
		}
	
		return elements;
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * component
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * set state
	 *
	 * @public
	 * 
	 * @param {Object}                    newState
	 * @param {function(this:Component)=} callback
	 */
	function setState (newState, callback) {
		// exist early if shouldComponentUpdate exists and returns false
		if (
			this.shouldComponentUpdate !== void 0 && 
			componentUpdateBoundary(this, 'shouldComponentUpdate', this.props, newState) === false
		) {
			return;
		}
	
		// update state
		updateState(this.state, newState);
	
		// callback
		if (callback != null && typeof callback === 'function') {
			componentStateBoundary(this, callback, 0);
		}
	
		// update component
		this.forceUpdate();
	}
	
	
	/**
	 * update state, hoisted to avoid `for in` deopts
	 * 
	 * @param {Object} oldState
	 * @param {Object} newState
	 */
	function updateState (oldState, newState) {	
		if (oldState != null) {
			for (var name in newState) {
				oldState[name] = newState[name];
			}
		}
	}
	
	
	/**
	 * force an update
	 *
	 * @public
	 * 
	 * @param  {function(this:Component)=} callback
	 */
	function forceUpdate (callback) {	
		if (this.componentWillUpdate !== void 0) {
			componentUpdateBoundary(this, 'componentWillUpdate', this.props, this.state);
		}
	
		var oldNode = this['--vnode'];
		var newNode = extractRenderNode(this);
	
		var newType = newNode.Type;
		var oldType = oldNode.Type;
	
		// different root node
		if (newNode.type !== oldNode.nodeName) {
			replaceRootNode(newNode, oldNode, newType, oldType, this);
		}
		// patch node
		else {
			// element root node
			if (oldType !== 3) {
				reconcileNodes(newNode, oldNode, newType, 1);
			} 
			// text root node
			else if (newNode.children !== oldNode.children) {
				oldNode.DOMNode.nodeValue = oldNode.children = newNode.children;
			}
		}
	
		if (this.componentDidUpdate !== void 0) {
			componentUpdateBoundary(this, 'componentDidUpdate', this.props, this.state);
		}
	
		// callback
		if (callback != null && typeof callback === 'function') {
			componentStateBoundary(this, callback, 1, null);
		}
	}
	
	
	/**
	 * Component class
	 *
	 * @public
	 * 
	 * @param {Object<string, any>=} props
	 */
	function Component (props) {
		// initial props
		if (this.getInitialProps !== void 0) {
			props = this.props = (
				componentDataBoundary(
					this, 
					'getInitialProps', 
					(props = (props === objEmpty ? {} : props) || {}) || props)
			);
	
			this['--async'] = (
				props != null && props.constructor !== Object && typeof props.then === 'function'
			) ? true : false;
		}
		else {
			// assign props
			if (props !== objEmpty) {
				// hydrate default props
				if (this.getDefaultProps !== void 0) {
					assignDefaultProps(componentDataBoundary(this, 'getDefaultProps', props), props);
				}
				
				if (this.componentWillReceiveProps !== void 0) {
					componentPropsBoundary(this, props);
				}
	
				this.props = props;
			} 
			// default props
			else {
				this.props = (
					this.props || 
					(this.getDefaultProps !== void 0 && componentDataBoundary(this, 'getDefaultProps', null)) || 
					{}
				);
			}
	
			this['--async'] = false;
		}
	
		// assign state
		this.state = (
			this.state || 
			(this.getInitialState !== void 0 && componentDataBoundary(this, 'getInitialState', null)) || 
			{}
		);
	
		this.refs = null;
	
		this['--vnode'] = null;
		this['--yield'] = false;
		this['--throw'] = 0;
	}
	
	
	/**
	 * Component prototype
	 * 
	 * @type {Object<string, function>}
	 */
	Component.prototype = Object.create(null, {
		setState: {value: setState},
		forceUpdate: {value: forceUpdate}
	});
	
	
	/**
	 * create class
	 *
	 * @public
	 * 
	 * @param  {(Object<string, any>|function(createElement): (Object<string, any>|function))} subject
	 * @param  {Object<string, any>=} props
	 * @return {function(new:Component, Object<string, any>)}
	 */
	function createClass (subject, props) {
		// empty class
		if (subject == null) {
			subject = createEmptyShape();
		}
	
		// component cache
		if (subject.COMPCache !== void 0) {
			return subject.COMPCache;
		}
	
		// is function?
		var func = typeof subject === 'function';
	
		// extract shape of component
		var shape = func ? (subject(createElement) || createEmptyShape()) : subject;	
		var type = func && typeof shape === 'function' ? 2 : (shape.Type != null ? 1 : 0);
		var construct = false;
		
		var vnode;
		var constructor;
		var render;
	
		// numbers, strings, arrays
		if (type !== 2 && shape.constructor !== Object && shape.render === void 0) {
			shape = extractVirtualNode(shape, {props: props});
		}
	
		// elements/functions
		if (type !== 0) {
			// render method
			render = type === 1 ? (vnode = shape, function () { return vnode; }) : shape;
	
			// new shape
			shape = { render: render };
		}
		else {
			if (construct = shape.hasOwnProperty('constructor')) {
				constructor = shape.constructor
			}
	
			// create render method if one does not exist
			if (typeof shape.render !== 'function') {
				shape.render = function () { return createEmptyShape(); };
			}
		}
	
		// create component class
		function component (props) {
			// constructor
			if (construct) {
				constructor.call(this, props);
			}
	
			// extend Component
			Component.call(this, props); 
		}
	
		// extends shape
		component.prototype = shape;
	
		// extends Component class
		shape.setState = Component.prototype.setState;
		shape.forceUpdate = Component.prototype.forceUpdate;
		component.constructor = Component;
	
		// function shape, cache component
		if (func) {
			shape.constructor = subject;
			subject.COMPCache = component;
		}
	
		// stylesheet namespaced
		if (func || shape.stylesheet !== void 0) {
			// displayName / function name / random string
			shape.displayName = (
				shape.displayName || 
				(func ? subject.name : false) || 
				((Math.random()+1).toString(36).substr(2, 5))
			);
		}
	
		return component;
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * error boundries
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * mount error boundaries
	 *
	 * @param {Component} component
	 * @param {string}    method
	 * @param {Node}      DOMNode
	 */
	function componentMountBoundary (component, method, DOMNode) {	
		try {
			component[method](DOMNode);
		}
		catch (error) {
			componentErrorBoundary(error, component, method);
		}
	}
	
	
	/**
	 * update error boundaries
	 *
	 * @param  {Component} component
	 * @param  {string}    method
	 * @param  {Object}    newProps
	 * @param  {Object}    newState
	 * @return {boolean?}
	 */
	function componentUpdateBoundary (component, method, newProps, newState) {
		try {
			return component[method](newProps, newState);
		}
		catch (error) {
			componentErrorBoundary(error, component, method);
		}
	}
	
	
	/**
	 * state error boundaries
	 *
	 * @param {Component} component
	 * @param {function}  func
	 */
	function componentStateBoundary (component, func, location) {	
		try {
			return func.call(component);
		}
		catch (error) {
			componentErrorBoundary(error, component, location === 0 ? 'setState' : 'forceUpdate');
		}
	}
	
	
	/**
	 * props error boundaries
	 *
	 * @param {Component} component
	 * @param {Object}    props
	 */
	function componentPropsBoundary (component, props) {	
		try {
			component.componentWillReceiveProps(props);
		}
		catch (error) {
			componentErrorBoundary(error, component, 'componentWillReceiveProps');
		}
	}
	
	
	/**
	 * data error boundaries
	 *
	 * @param {Component} component
	 * @param {string}    method
	 * @param {Object}    props
	 */
	function componentDataBoundary (component, method, data) {	
		try {
			return component[method](data);
		}
		catch (error) {
			componentErrorBoundary(error, component, method);
		}
	}
	
	
	/**
	 * render error boundaries
	 *
	 * @param {Component} component
	 * @param {string}    type
	 * @param {string}    name
	 * @param {Error}     error
	 */
	function componentRenderBoundary (component, type, name, error) {
		return componentErrorBoundary(
			'Encountered an unsupported ' + type + ' type `'+ name + '`.\n\n' + error,
			component, 
			type
		);
	}
	
	
	/**
	 * generate error
	 *
	 * @param {string|Error} error
	 * @param {Component}    component
	 * @param {string}       location
	 * @param {VNode}
	 */
	function componentErrorBoundary (error, component, location) {
		if (component == null) {
			return createEmptyShape();
		}
	
		var newNode;
		var oldNode;
		var displayName;
		var authored;
	    var func;
		var thrown = component['--throw'];
	
	    if (thrown == null) {
	        thrown = 0;
	    }
	
		component['--throw'] = thrown + 1;
	
		if ((error instanceof Error) === false) {
			error = new Error(error);
		}
	
		// initial throw from render, try to recover once
		if (thrown === 0 && browser && location === 'render') {
			schedule(function () {
	            try {
	                // test render for errors
	                component.render(component.props, component.state, component);
	
	                // update if no errors where thrown
	                component.forceUpdate();
	            }
	            catch (e) {
	                // silently fail to recover
	            }
			});
		}
	
		// second throw, failed to recover the first time
		if (thrown !== 0 && location === 'render') {
			return createEmptyShape();
		}
	
	    func = typeof component === 'function';
		authored = func === false && typeof component.componentDidThrow === 'function';
		displayName = func ? component.name : component.displayName || component.constructor.name;
	
		// authored error handler
	    if (authored) {
	        // define error
	        Object.defineProperties(error, {
	            silence: {value: false, writable: true},
	            location: {value: location}, 
	            from: {value: displayName}
	        });
	        
	    	try {
	    		newNode = component.componentDidThrow(error);
	    	}
	    	catch (e) {    		
	    		// avoid recursive call stack
	    		if (thrown >= 0) {
	    			// preserve order of errors logged 
	    			schedule(function () {
	    				component['--throw'] = -1;
	    				componentErrorBoundary(e, component, 'componentDidThrow');
	    			});
	    		}
	    	}
	    }
	
	    if (error.silence !== true) {
	    	// default error handler
	    	console.error(
	          'Dio caught an error thrown by ' + 
	          (displayName ? '`' + displayName + '`' : 'one of your components') + 
	          ', the error was thrown in `' + location + '`.' + 
	          '\n\n' + error.stack.replace(/\n+/, '\n\n')
	        );
	    }
	
	    if (authored && location !== 'stylesheet') {	    	
	    	// return render node
	    	if (location === 'render' || location === 'element') {
	    		if (newNode != null && typeof newNode.type === 'string') {
	    			if (/^[A-z]/g.exec(newNode.type) === null) {
						console.error(
							'Dio bailed out of rendering an error state for `' + displayName + '`.\n\n'+
							'Reason: `componentDidThrow` returned an invalid element `'+ newNode.type +'`'
						);
	
	    				return createEmptyShape();
	    			}
	
	    			newNode.type = newNode.type.replace(/ /g, '');
	    		}
	
	    		return newNode || createEmptyShape();
	    	}
	    	// async replace render node
	    	else if (browser && newNode != null && newNode !== true && newNode !== false) {
	    		schedule(function () {
	    			replaceRootNode(
	    				extractVirtualNode(newNode, component), 
	    				oldNode = component['--vnode'], 
	    				newNode.Type, 
	    				oldNode.Type, 
	    				component
					)
	    		});
	    	}
	    }
	
	    return createEmptyShape();
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * extract
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * extract component node
	 * 
	 * @param  {VNode}      subject
	 * @param  {Component?} instance
	 * @param  {VNode?}     parent
	 * @return {VNode} 
	 */
	function extractComponentNode (subject, instance, parent) {
		/** @type {Component} */
		var owner;
	
		/** @type {VNode} */
		var vnode;
	
		/** @type {(Component|function(new:Component, Object<string, any>))} */
		var type = subject.type;
	
		/** @type {Object<string, any>} */
		var props = subject.props;
	
		// default props
		if (type.defaultProps !== void 0) {
			// clone default props if props is not an empty object, else use defaultProps as props
			props !== objEmpty ? assignDefaultProps(type.defaultProps, props) : (props = type.defaultProps);
		}
	
		// assign children to props if not empty
		if (subject.children.length !== 0) {
			// prevents mutating the empty object constant
			if (props === objEmpty) {
				props = {children: subject.children};
			}
			else {
				props.children = subject.children;			
			}
		}
		
		// cached component
		if (type.COMPCache !== void 0) {
			owner = type.COMPCache;
		}
		// function components
		else if (type.constructor === Function && (type.prototype === void 0 || type.prototype.render === void 0)) {
			vnode = extractFunctionNode(type, props);
	
			if (vnode.Type === void 0) {
				// create component
				owner = createClass(vnode, props);
			}
			else {
				// pure function
				return vnode;
			}
		}
		// class / createClass components
		else {
			owner = type;
		}
	
		// create component instance
		var component = subject.instance = new owner(props);
		
		// retrieve vnode
		var vnode = extractRenderNode(component);
	
		// if render returns a component, extract component recursive
		if (vnode.Type === 2) {
			vnode = extractComponentNode(vnode, component, parent || subject);
		}
	
		// if keyed, assign key to vnode
		if (subject.key !== void 0 && vnode.key === void 0) {
			vnode.key = subject.key;
		}
	
		// replace props and children
		subject.props = vnode.props
		subject.children = vnode.children;
	
		// recursive component
		if (instance !== null) {
			component['--vnode'] = parent;
		}
		else {
			component['--vnode'] = subject;
			
			subject.nodeName = vnode.type;
		}
	
		return vnode;
	}
	
	
	/**
	 * extract render node
	 *
	 * @param  {Component} component
	 * @return {VNode}
	 */
	function extractRenderNode (component) {
		try {
			// async render
			if (component['--async'] === true) {	
				if (browser) {
					component.props.then(function resolveAsyncClientComponent (props) {
						component.props = props;
						component.forceUpdate();
					}).catch(funcEmpty);
					
					component['--async'] = false;
				}
	
				return createEmptyShape();
			}
			// generator
			else if (component['--yield'] === true) {
				return extractVirtualNode(
					component.render.next().value, 
					component
				);
			}
			// sync render
			else {
				return extractVirtualNode(
					component.render(component.props, component.state, component), 
					component
				);
			}
		}
		// error thrown
		catch (error) {
			return componentErrorBoundary(error, component, 'render');
		}
	}
	
	
	/**
	 * extract virtual node
	 * 
	 * @param  {(VNode|function|Component)} subject
	 * @param  {Component}                  component
	 * @return {VNode}
	 */
	function extractVirtualNode (subject, component) {
		// empty
		if (subject == null) {
			return createEmptyShape();
		}
	
		// element
		if (subject.Type !== void 0) {
			return subject;
		}
	
		// portal
		if (subject.nodeType !== void 0) {	
			return (
				subject = createPortalShape(subject, objEmpty, arrEmpty), 
				subject.Type = 5, 
				subject
			);
		}
		
		switch (subject.constructor) {
			// component
			case Component: {
				return createComponentShape(subject, objEmpty, arrEmpty);
			}
			// booleans
			case Boolean: {
				return createEmptyShape();
			}
			// fragment
			case Array: {
				return createElement('@', null, subject);
			}
			// string/number
			case String: case Number: {
				return createTextShape(subject);
			}
			// component/function
			case Function: {
				// stream
				if (subject.then != null && typeof subject.then === 'function') {
					if (subject['--listening'] !== true) {
						subject.then(function resolveStreamComponent () {
							component.forceUpdate();
						}).catch(funcEmpty);
	
						subject['--listening'] = true;
					}
	
					return extractVirtualNode(subject(), component);
				}
				// component
				else if (subject.prototype !== void 0 && subject.prototype.render !== void 0) {
					return createComponentShape(subject, objEmpty, arrEmpty);
				}
				// function
				else {
					return extractVirtualNode(subject(component != null ? component.props : {}), component);
				}
			}
			// promise
			case Promise: {
				if (browser) {
					subject.then(function resolveAsyncComponent (newNode) {
						replaceRootNode(
							extractVirtualNode(newNode, component), 
							subject = component['--vnode'], 
							newNode.Type, 
							subject.Type, 
							component
						);
					}).catch(funcEmpty);
				}
				else {
					component['--async'] = subject;
				}
	
				return createEmptyShape();
			}
		}
	
		// coroutine
		if (typeof subject.next === 'function' || (subject.prototype != null && subject.prototype.next != null)) {			
			if (subject.return == null) {
				subject = subject(component.props, component.state, component);
			}
	
			component['--yield'] = true;
			component.render = subject;
	
			component.constructor.prototype.render = function render () {
				return subject.next().value;
			};
	
			return extractVirtualNode(subject.next().value, component);
		}
		// component descriptor
		else if (typeof subject.render === 'function') {
			return (
				subject.COMPCache || 
				createComponentShape(subject.COMPCache = createClass(subject, null), objEmpty, arrEmpty)
			);
		} 
		// unsupported render types, fail gracefully
		else {
			return componentRenderBoundary(
				component,
				'render', 
				subject.constructor.name, 
				''
			);
		}
	}
	
	
	/**
	 * extract function node
	 *
	 * @param  {function}            type
	 * @param  {Object<string, any>} props
	 * @return {VNode}
	 */
	function extractFunctionNode (type, props) {
		try {
			var vnode;
			var func = type['--func'] !== void 0;
	
			if (func === false) {
				vnode = type(createElement);
			}
			
			if (func || vnode.Type !== void 0) {
				try {
					vnode = type(props);
					
					if (func === false) {
						type['--func'] = true;
					}
				}
				catch (e) {
					vnode = componentErrorBoundary(e, type, 'function');
				}
			}
	
			return vnode;
		}
		// error thrown
		catch (error) {
			return componentErrorBoundary(error, type, 'function');
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * render
	 * 
	 * ---------------------------------------------------------------------------------
	 */
		
	
	/**
	 * render
	 *
	 * @public
	 * 
	 * @param  {(Component|VNode|function|Object<string, any>)} subject
	 * @param  {(Node|string)=}                                 target
	 * @param  {function(this:Component, Node)=}                callback
	 * @param  {boolean=}                                       hydration
	 * @return {function(Object=)}
	 */
	function render (subject, target, callback, hydration) {
		var initial = true;
		var nodeType = 2;
		
		var component;	
		var vnode;
		var element;
		
		// renderer
		function renderer (newProps) {
			if (initial) {
				// dispatch mount
				appendNode(nodeType, vnode, element, createNode(vnode, null, null));
	
				// register mount has been dispatched
				initial = false;
	
				// assign component instance
				component = vnode.instance;
			}
			else {
				// update props
				if (newProps !== void 0) {
					// component with shouldComponentUpdate
					if (
						component.shouldComponentUpdate !== void 0 && 
						componentUpdateBoundary(component, 'shouldComponentUpdate', newProps, component.state) === false
					) {
						// exit early
						return renderer;
					}
	
					component.props = newProps;
				}
	
				// update component
				component.forceUpdate();
			}
	
			return renderer;
		}
	
		// exit early
		if (browser === false) {
			return renderer;
		}
	
		// Object
		if (subject.render !== void 0) {
			vnode = createComponentShape(createClass(subject, null), objEmpty, arrEmpty);
		}
		// array/component/function
		else if (subject.Type === void 0) {
			// array
			if (subject.constructor === Array) {
				vnode = createElement('@', null, subject);
			}
			// component/function
			else {
				vnode = createComponentShape(subject, objEmpty, arrEmpty);
			}
		} 
		// element/component
		else {
			vnode = subject;
		}
	
		// element
		if (vnode.Type !== 2) {
			vnode = createComponentShape(createClass(vnode, null), objEmpty, arrEmpty);
		}
	
		// mount
	  	if (target != null && target.nodeType != null) {
	  		// target is a dom element
	  		element = target === document ? docuemnt.body : target;
		} 
		else {
	  		// selector
	  		target = document.querySelector(target);
	
	  		// default to document.body if no match/document
	  		element = (target === null || target === document) ? document.body : target;
		}
	
		// hydration
		if (hydration != null && hydration !== false) {
			// dispatch hydration
			hydrate(element, vnode, typeof hydration === 'number' ? hydration : 0, null, null);
	
			// register mount has been dispatched
			initial = false;
	
			// assign component
			component = vnode.instance;
		} 
		else {
			// destructive mount
			hydration === false && (element.textContent = '');
			
			renderer();
		}
	
		// if present call root components context, passing root node as argument
		if (callback && typeof callback === 'function') {
			callback.call(component, vnode.DOMNode || target);
		}
	
		return renderer;
	}
	
	
	/**
	 * shallow render
	 *
	 * @public
	 * 
	 * @param  {(VNode|Component|function)}
	 * @return {VNode}
	 */
	function shallow (subject) {
		if (isValidElement(subject)) {
			return subject.Type === 2 ? extractComponentNode(subject, null, null) : subject;
		}
		else {
			return extractComponentNode(createElement(subject, null, null), null, null);
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * props
	 * 
	 * ---------------------------------------------------------------------------------
	 */
		
	
	/**
	 * assign prop for create element
	 * 
	 * @param  {Node}       target
	 * @param  {Object}     props
	 * @param  {boolean}    onlyEvents
	 * @param  {Component}  component
	 */
	function assignProps (target, props, onlyEvents, component) {
		for (var name in props) {
			var value = props[name];
	
			// refs
			if (name === 'ref' && value != null) {
				refs(value, component, target);
			}
			// events
			else if (isEventProp(name)) {
				addEventListener(target, name.substring(2).toLowerCase(), value, component);
			}
			// attributes
			else if (onlyEvents === false && name !== 'key' && name !== 'children') {
				// add attribute
				updateProp(target, true, name, value, props.xmlns);
			}
		}
	}
	
	
	/**
	 * patch props
	 * 
	 * @param  {VNode} newNode
	 * @param  {VNode} oldNode
	 */
	function patchProps (newNode, oldNode) {
		var newProps = newNode.props;
		var oldProps = oldNode.props;
		var namespace = newNode.props.xmlns || '';
		var target = oldNode.DOMNode;
		var updated = false;
		var length = 0;
	
		// diff newProps
		for (var newName in newNode.props) {
			length = newName.length;
	
			if (
				(length === 3 && newName === 'key') === false && 
				(length === 8 && newName === 'children') === false && 
				isEventProp(newName) === false
			) {
				var newValue = newProps[newName];
				var oldValue = oldProps[newName];
	
				if (newValue != null && oldValue !== newValue) {
					updateProp(target, true, newName, newValue, namespace);
					
					if (updated === false) {
						updated = true;
					}
				}
			}
		}
	
		// diff oldProps
		for (var oldName in oldNode.props) {
			length = oldName.length;
	
			if (
				(length === 3 && oldName === 'key') === false && 
				(length === 8 && oldName === 'children') === false &&  
				isEventProp(oldName) === false
			) {
				var newValue = newProps[oldName];
	
				if (newValue == null) {
					updateProp(target, false, oldName, '', namespace);
					
					if (updated === false) {
						updated = true;
					}
				}
			}
		}
	
		if (updated) {
			oldNode.props = newNode.props;
		}
	}
	
	
	/**
	 * assign/update/remove prop
	 * 
	 * @param  {Node}    target
	 * @param  {boolean} set
	 * @param  {string}  name
	 * @param  {any}     value
	 * @param  {string}  namespace
	 */
	function updateProp (target, set, name, value, namespace) {
		var length = name.length;
	
		// avoid xmlns namespaces
		if (length > 22 && (value === nsSvg || value === nsMath)) {
			return;
		}
	
		// if xlink:href set, exit, 
		if (length === 10 && name === 'xlink:href') {
			target[(set ? 'set' : 'remove') + 'AttributeNS'](nsXlink, 'href', value);
			return;
		}
	
		var svg = false;
	
		// svg element, default to class instead of className
		if (namespace === nsSvg) {
			svg = true;
	
			if (length === 9 && name === 'className') {
				name = 'class';
			}
			else {
				name = name;
			}
		}
		// html element, default to className instead of class
		else {
			if (length === 5 && name === 'class') {
				name = 'className';
			}
		}
	
		var destination = target[name];
		var defined = value != null && value !== false;
	
		// objects
		if (defined && typeof value === 'object') {
			destination === void 0 ? target[name] = value : updatePropObject(name, value, destination);
		}
		// primitives `string, number, boolean`
		else {
			// id, className, style, etc..
			if (destination !== void 0 && svg === false) {
				if (length === 5 && name === 'style') {
					target.style.cssText = value;
				}
				else {
					target[name] = value;
				}
			}
			// set/remove Attribute
			else {
				if (defined && set) {
					// assign an empty value with boolean `true` values
					target.setAttribute(name, value === true ? '' : value);
				}
				else {
					// removes attributes with false/null/undefined values
					target.removeAttribute(name);
				}
			}
		}
	}
	
	
	/**
	 * check if a name is an event-like name, i.e onclick, onClick...
	 * 
	 * @param  {string} name
	 * @return {boolean}
	 */
	function isEventProp (name) {
		return name.charCodeAt(0) === 111 && name.charCodeAt(1) === 110 && name.length > 3;
	}
	
	
	/**
	 * update prop objects, i.e .style
	 *
	 * @param {string} parent
	 * @param {Object} prop
	 * @param {Object} target
	 */
	function updatePropObject (parent, prop, target) {
		for (var name in prop) {
			var value = prop[name] || null;
	
			// assign if target object has property
			if (name in target) {
				target[name] = value;
			}
			// style properties that don't exist on CSSStyleDeclaration
			else if (parent === 'style') {
				// assign/remove
				value ? target.setProperty(name, value, null) : target.removeProperty(name);
			}
		}
	}
	
	
	/**
	 * assign default props
	 * 
	 * @param  {Object<string, any>} defaultProps
	 */
	function assignDefaultProps (defaultProps, props) {
		for (var name in defaultProps) {
			props[name] = props[name] || defaultProps[name];
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * nodes
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * create DOMNode
	 *
	 * @param {number}    type
	 * @param {Component} component
	 */
	function createDOMNode (type, component) {
		try {
			return document.createElement(type);
		} 
		catch (error) {
			return createDOMNodeError(
				componentRenderBoundary(component, 'element', type, error),
				component
			);
		}
	}
	
	
	/**
	 * create namespaced DOMNode
	 *
	 * @param {namespace} namespace
	 * @param {number}    type
	 * @param {Componnet} component
	 */
	function createDOMNodeNS (namespace, type, component) {
		try {
			return document.createElementNS(namespace, type);
		}
		catch (error) {
			return createDOMNodeError(
				componentRenderBoundary(component, 'element', type, error),
				component
			);
		}
	}
	
	
	/**
	 * create error state DOMNode
	 * 
	 * @param  {VNode}      vnode
	 * @param  {Component?} component
	 * @return {Node}
	 */
	function createDOMNodeError (vnode, component) {
		// empty, null/undefined
		if (vnode == null) {
			return createNode(createEmptyShape(), null, null);
		}
		// string, number, element, array
		else {
			return createNode(createElement('@', null, vnode), component, null);
		}
	}
	
	
	/**
	 * create node
	 * 
	 * @param  {VNode}      subject
	 * @param  {Component?} component
	 * @param  {string?}    namespace
	 * @return {Node}
	 */
	function createNode (subject, component, namespace) {
		var nodeType = subject.Type;
	
		// create text node element	
		if (nodeType === 3) {
			return subject.DOMNode = document.createTextNode(subject.children);
		}
	
		var vnode;
		var element;
	
		var portal = false;
	
		// DOMNode exists
		if (subject.DOMNode !== null) {
			element = subject.DOMNode;
	
			// portal
			if (portal = (nodeType === 4 || nodeType === 5)) {
				element = (vnode = subject).DOMNode = (nodeType === 4 ? element.cloneNode(true) : element);
			}
			// hoisted
			else {
				return subject.DOMNode = element.cloneNode(true);
			}
		}
		// create DOMNode
		else {
			vnode = nodeType === 2 ? extractComponentNode(subject, null, null) : subject;
		}
		
		var Type = vnode.Type;
		var children = vnode.children;
	
		if (portal === false) {
			// text		
			if (Type === 3) {
				return vnode.DOMNode = subject.DOMNode = document.createTextNode(children);
			}
			// portal
			else if (Type === 4 || Type === 5) {
				element = vnode.DOMNode;
				portal = true;
			}
		}
	
		var type = vnode.type;
		var props = vnode.props;
		var length = children.length;
	
		var instance = subject.instance !== null;
		var thrown = 0;
	
		// assign namespace
		if (props.xmlns !== void 0) { 
			namespace = props.xmlns; 
		}
	
		// has a component instance, hydrate component instance
		if (instance) {
			component = subject.instance;
			thrown = component['--throw'];
		}
	
		if (portal === false) {
			// create namespaced element
			if (namespace !== null) {
				// if undefined, assign svg namespace
				if (props.xmlns === void 0) {
					props === objEmpty ? (props = {xmlns: namespace}) : (props.xmlns = namespace);
				}
	
				element = createDOMNodeNS(namespace, type, component);
			}
			// create html element
			else {
				element = createDOMNode(type, component);
			}
	
			vnode.DOMNode = subject.DOMNode = element;
		}
	
		if (instance) {
			// avoid appending children if an error was thrown while creating a DOMNode
			if (thrown !== component['--throw']) {
				return vnode.DOMNode = subject.DOMNode = element;
			}
	
			vnode = component['--vnode'];
	
			// hydrate
			if (vnode.DOMNode === null) {
				vnode.DOMNode = element;
			}
	
			// stylesheets
			if (nodeType === 2 && component.stylesheet !== void 0 && type !== 'noscript' && type !== '#text') {
				createScopedStylesheet(component, subject.type, element);
			}
		}
	
		// has children
		if (length !== 0) {
			// append children
			for (var i = 0; i < length; i++) {
				var newChild = children[i];
	
				// hoisted, clone
				if (newChild.DOMNode !== null) {
					newChild = children[i] = cloneNode(newChild);
				}
	
				// append child
				appendNode(newChild.Type, newChild, element, createNode(newChild, component, namespace));
			}
		}
	
		// has props
		if (props !== objEmpty) {
			// props and events
			assignProps(element, props, false, component);
		}
	
		// cache DOM reference
		return element;
	}
	
	
	/**
	 * append node
	 *
	 * @param {number} newType
	 * @param {VNode}  newNode
	 * @param {Node}   parentNode
	 * @param {Node}   nextNode
	 */
	function appendNode (newType, newNode, parentNode, nextNode) {
		// lifecycle, componentWillMount
		if (newType === 2 && newNode.instance !== null && newNode.instance.componentWillMount) {
			componentMountBoundary(newNode.instance, 'componentWillMount', nextNode);
		}
	
		// append element
		parentNode.appendChild(nextNode);
	
		// lifecycle, componentDidMount
		if (newType === 2 && newNode.instance !== null && newNode.instance.componentDidMount) {
			componentMountBoundary(newNode.instance, 'componentDidMount', nextNode);
		}
	}
	
	
	/**
	 * insert node
	 *
	 * @param {number} newType
	 * @param {VNode}  newNode
	 * @param {Node}   prevNode
	 * @param {Node}   parentNode
	 * @param {Node}   nextNode
	 */
	function insertNode (newType, newNode, prevNode, parentNode, nextNode) {
		// lifecycle, componentWillMount
		if (newType === 2 && newNode.instance !== null && newNode.instance.componentWillMount) {
			componentMountBoundary(newNode.instance, 'componentWillMount', nextNode);
		}
	
		// insert element
		parentNode.insertBefore(nextNode, prevNode);
	
		// lifecycle, componentDidMount
		if (newType === 2 && newNode.instance !== null && newNode.instance.componentDidMount) {
			componentMountBoundary(newNode.instance, 'componentDidMount', nextNode);
		}
	}
	
	
	/**
	 * remove node
	 *
	 * @param {number} oldType
	 * @param {VNode}  oldNode
	 * @param {Node}   parentNode
	 */
	function removeNode (oldType, oldNode, parentNode) {
		// lifecycle, componentWillUnmount
		if (oldType === 2 && oldNode.instance !== null && oldNode.instance.componentWillUnmount) {
			componentMountBoundary(oldNode.instance, 'componentWillUnmount', oldNode.DOMNode);
		}
	
		// remove element
		parentNode.removeChild(oldNode.DOMNode);
	
		// clear references
		oldNode.DOMNode = null;
	}
	
	
	/**
	 * empty node
	 *
	 * @param {VNode}  oldNode
	 * @param {number} oldLength
	 */
	function emptyNode (oldNode, oldLength) {
		var children = oldNode.children;	
		var parentNode = oldNode.DOMNode;
		var oldChild;
	
		// umount children
		for (var i = 0; i < oldLength; i++) {
			oldChild = children[i];
			
			// lifecycle, componentWillUnmount
			if (oldChild.Type === 2 && oldChild.instance !== null && oldChild.instance.componentWillUnmount) {
				componentMountBoundary(oldChild.instance, 'componentWillUnmount', oldChild.DOMNode);
			}
	
			// clear references
			oldChild.DOMNode = null;
		}
	
		parentNode.textContent = '';
	}
	
	
	/**
	 * replace node
	 *
	 * @param {VNode} newType
	 * @param {VNode} oldType
	 * @param {VNode} newNode
	 * @param {VNode} oldNode
	 * @param {Node}  parentNode 
	 * @param {Node}  nextNode
	 */
	function replaceNode (newType, oldType, newNode, oldNode, parentNode, nextNode) {
		// lifecycle, componentWillUnmount
		if (oldType === 2 && oldNode.instance !== null && oldNode.instance.componentWillUnmount) {
			componentMountBoundary(oldNode.instance, 'componentWillUnmount', oldNode.DOMNode);
		}
	
		// lifecycle, componentWillMount
		if (newType === 2 && newNode.instance !== null && newNode.instance.componentWillMount) {
			componentMountBoundary(newNode.instance, 'componentWillMount', nextNode);
		}
	
		// replace element
		parentNode.replaceChild(nextNode, oldNode.DOMNode);
			
		// lifecycle, componentDidmount
		if (newType === 2 && newNode.instance !== null && newNode.instance.componentDidMount) {
			componentMountBoundary(newNode.instance, 'componentDidMount', nextNode);
		}
	
		// clear references
		oldNode.DOMNode = null;
	}
	
	
	/**
	 * replace root node
	 * 
	 * @param  {VNode}     newNode
	 * @param  {VNode}     oldNode
	 * @param  {number}    newType
	 * @param  {number}    oldType
	 * @param  {Component} component
	 */
	function replaceRootNode (newNode, oldNode, newType, oldType, component) {
		var refDOMNode = oldNode.DOMNode;
		var newProps = newNode.props;
	
		// replace node
		refDOMNode.parentNode.replaceChild(createNode(newNode, component, null), refDOMNode);
	
		// hydrate new node
		oldNode.props = newProps;
		oldNode.nodeName = newNode.nodeName || newNode.type;
		oldNode.children = newNode.children;
		oldNode.DOMNode = newNode.DOMNode;
	
	 	// // stylesheet
	 	if (newType !== 3 && component.stylesheet !== void 0) {
	 		createScopedStylesheet(component, component.constructor, newNode.DOMNode);
	 	}
	}	
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * events
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * add event listener
	 *
	 * @param {Node}            element
	 * @param {string}          name
	 * @param {function|Object} listener
	 * @param {Component}       component
	 */
	function addEventListener (element, name, listener, component) {
		// default listener
		if (typeof listener === 'function') {
			element.addEventListener(name, listener, false);
		}
		// non-default listener
		else {
			element.addEventListener(name, bindEvent(name, listener, component), listener.options || false);
		}
	}
	
	
	/**
	 * bind event
	 *
	 * @param  {string}              name
	 * @param  {Object<string, any>} value
	 * @param  {Component}           component
	 * @return {function}
	 */
	function bindEvent (name, value, component) {
		var bind = value.bind || value.handler;
		var data = value.with || value.data;
		var preventDefault = value.preventDefault === true || (!value.options && value.preventDefault === void 0);
	
		if (typeof bind === 'object') {
			var property = bind.property || data;
	
			return function (event) {
				var target = event.currentTarget || event.target;
				var value = data in target ? target[data] : target.getAttribute(data);
	
				preventDefault && event.preventDefault();
	
				// update component state
				component.state[property] = value;
	
				// update component
				component.forceUpdate();
			}
		} 
		else {
			return function (event) {
				preventDefault && event.preventDefault();
				bind.call(data, data, event);
			}
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * refs
	 * 
	 * ---------------------------------------------------------------------------------
	 */
		
	
	/**
	 * refs
	 *
	 * @param {(string|function(Node))} ref
	 * @param {Component}               component
	 * @param {Node}                    element
	 */
	function refs (ref, component, element) {
		if (typeof ref === 'function') {
			ref.call(component, element);
		}
		else {
			(component.refs = component.refs || {})[ref] = element;
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * reconcile
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * reconcile keyed nodes
	 *
	 * @param {Object<string, any>}    newKeys
	 * @param {Object<string, any>}    oldKeys
	 * @param {Node}                   parentNode
	 * @param {VNode}                  newNode
	 * @param {VNode}                  oldNode
	 * @param {number}                 newLength
	 * @param {number}                 oldLength
	 * @param {number}                 position
	 * @param {number}                 length
	 */
	function reconcileKeys (newKeys, oldKeys, parentNode, newNode, oldNode, newLength, oldLength, position, length) {
		var reconciled = new Array(newLength);
	
		// children
		var newChildren = newNode.children;
		var oldChildren = oldNode.children;
	
		// child nodes
		var newChild;
		var oldChild;
	
		// DOM nodes
		var nextNode;
		var prevNode;
	
		// keys
		var key;
	
		// offsets
		var added = 0;
		var removed = 0;
		var i = 0;
		var index = 0;
		var offset = 0;
		var moved = 0;
	
		// reconcile leading nodes
		if (position !== 0) {
			for (; i < position; i++) {
				reconciled[i] = oldChildren[i];
			}
		}
	
		// reconcile trailing nodes
		for (i = 0; i < length; i++) {
			newChild = newChildren[index = (newLength-1)-i];
			oldChild = oldChildren[(oldLength-1)-i];
	
			if (newChild.key === oldChild.key) {
				reconciled[index] = oldChild;
	
				// trim trailing node
				length--;
			}
			else {
				break;
			}
		}
	
		// reconcile inverted nodes
		if (newLength === oldLength) {
			for (i = position; i < length; i++) {
				newChild = newChildren[index = (newLength-1)-i];
				oldChild = oldChildren[i];
	
				if (index !== i && newChild.key === oldChild.key) {		
					newChild = oldChildren[index];
	
					nextNode = oldChild.DOMNode;
					prevNode = newChild.DOMNode;
	
					// adjacent nodes
					if (index - i === 1) {
						parentNode.insertBefore(prevNode, nextNode);
					}
					else {
						// move first node to inverted postion
						parentNode.insertBefore(nextNode, prevNode);
	
						nextNode = prevNode;
						prevNode = oldChildren[i + 1].DOMNode;
	
						// move second node to inverted position
						parentNode.insertBefore(nextNode, prevNode);
					}
	
					// trim leading node
					position = i;
	
					// trim trailing node
					length--;
	
					// hydrate
					reconciled[i] = newChild;
					reconciled[index] = oldChild;
				}
				else {			
					break;
				}
			}
	
			// single remaining node
			if (length - i === 1) {
				reconciled[i] = oldChildren[i];
				oldNode.children = reconciled;
	
				return;
			}
		}
	
		// reconcile remaining node
		for (i = position; i < length; i++) {
			// old children
			if (i < oldLength) {
				oldChild = oldChildren[i];
				newChild = newKeys[oldChild.key];
	
				if (newChild === void 0) {
					removeNode(oldChild.Type, oldChild, parentNode);
					removed++;
				}
			}
	
			// new children
			if (i < newLength) {
				newChild = newChildren[i];
				oldChild = oldKeys[newChild.key];
	
				// new
				if (oldChild === void 0) {
					nextNode = createNode(newChild, null, null);
	
					// insert
					if (i < oldLength + added) {
						insertNode(
							newChild.Type, 
							newChild, 
							oldChildren[i - added].DOMNode, 
							parentNode, 
							nextNode
						);
					}
					// append
					else {
						appendNode(
							newChild.Type, 
							newChild, 
							parentNode, 
							nextNode
						);
					}
	
					reconciled[i] = newChild;
					added++;
				}
				// old
				else {
					index = oldChild.index;
					offset = index - removed;
	
					// moved
					if (offset !== i) {
						key = oldChildren[offset].key;
	
						// not moving to a removed index
						if (newKeys[key] !== void 0) {
							offset = i - added;
	
							// not identical keys
							if (newChild.key !== oldChildren[offset].key) {
								nextNode = oldChild.DOMNode;
								prevNode = oldChildren[offset - (moved++)].DOMNode;
	
								if (prevNode !== nextNode) {
									parentNode.insertBefore(nextNode, prevNode);
								}
							}
						}					
					}
	
					reconciled[i] = oldChild;
				}
			}
		}
	
		oldNode.children = reconciled;
	}
	
	
	/**
	 * reconcile nodes
	 *  
	 * @param  {VNode}  newNode
	 * @param  {VNode}  oldNode
	 * @param  {number} newNodeType
	 * @param  {number} oldNodeType
	 */
	function reconcileNodes (newNode, oldNode, newNodeType, oldNodeType) {	
		// if newNode and oldNode, exit early
		if (newNode === oldNode) {
			return;
		}
	
		// extract node from possible component node
		var currentNode = newNodeType === 2 ? extractComponentNode(newNode, null, null) : newNode;
		
		// a component
		if (oldNodeType === 2) {
			// retrieve components
			var oldComponent = oldNode.instance;
			var newComponent = newNode.instance;
	
			// retrieve props
			var newProps = newComponent.props;
			var newState = newComponent.state;
	
			// component with shouldComponentUpdate
			if (
				oldComponent.shouldComponentUpdate !== void 0 && 
				componentUpdateBoundary(oldComponent, 'shouldComponentUpdate', newProps, newState) === false
			) {
				// exit early
				return;
			}
	
			// component with componentWillUpdate
			if (oldComponent.componentWillUpdate !== void 0) {
				componentUpdateBoundary(oldComponent, 'componentWillUpdate', newProps, newState);
			}
		}
	
		// children
		var newChildren = currentNode.children;
		var oldChildren = oldNode.children;
	
		// children length
		var newLength = newChildren.length;
		var oldLength = oldChildren.length;
	
		// no children
		if (newLength === 0) {
			// remove all children if old children is not already cleared
			if (oldLength !== 0) {
				emptyNode(oldNode, oldLength);
				oldNode.children = newChildren;
			}
		}
		// has children
		else {
			// new node has children
			var parentNode = oldNode.DOMNode;
	
			// when keyed, the position that dirty keys begin
			var position = 0;
	
			// non-keyed until the first dirty key is found
			var keyed = false;
	
			// un-initialized key hash maps
			var oldKeys;
			var newKeys;
	
			var newKey;
			var oldKey;
	
			// the highest point of interest
			var length = newLength > oldLength ? newLength : oldLength;
	
			// children nodes
			var newChild;
			var oldChild;
	
			// children types
			var newType;
			var oldType;
	
			// for loop, the end point being which ever is the 
			// greater value between new length and old length
			for (var i = 0; i < length; i++) {
				// avoid accessing out of bounds index and Type where unnecessary
				newType = i < newLength ? (newChild = newChildren[i]).Type : (newChild = nodeEmpty, 0);
				oldType = i < oldLength ? (oldChild = oldChildren[i]).Type : (oldChild = nodeEmpty, 0);
	
				if (keyed) {				
					// push keys
					if (newType !== 0) {
						newKeys[newChild.key] = (newChild.index = i, newChild);
					}
	
					if (oldType !== 0) {
						oldKeys[oldChild.key] = (oldChild.index = i, oldChild);
					}
				}
				// remove
				else if (newType === 0) {
					removeNode(oldType, oldChildren.pop(), parentNode);
	
					oldLength--;
				}
				// add
				else if (oldType === 0) {
					appendNode(
						newType, 
						oldChildren[oldLength++] = newChild, 
						parentNode, 
						createNode(newChild, null, null)
					);
				}
				// text
				else if (newType === 3 && oldType === 3) {
					if (newChild.children !== oldChild.children) {
						oldChild.DOMNode.nodeValue = oldChild.children = newChild.children;
					}
				}
				// key
				else if ((newKey = newChild.key) !== (oldKey = oldChild.key)) {
					keyed = true;
					position = i;
	
					// map of key
					newKeys = {};
					oldKeys = {};
	
					// push keys
					newKeys[newKey] = (newChild.index = i, newChild);
					oldKeys[oldKey] = (oldChild.index = i, oldChild);
				}
				// replace
				else if (newChild.type !== oldChild.type) {
					replaceNode(
						newType, 
						oldType, 
						oldChildren[i] = newChild, 
						oldChild, 
						parentNode, 
						createNode(newChild, null, null)
					);
				}
				// noop
				else {
					reconcileNodes(newChild, oldChild, newType, oldType);
				}
			}
	
			// reconcile keyed children
			if (keyed) {
				reconcileKeys(
					newKeys, 
					oldKeys,
					parentNode, 
					newNode, 
					oldNode, 
					newLength, 
					oldLength, 
					position,
					length
				);
			}
		}
	
		// props objects of the two nodes are not equal, patch
		if (currentNode.props !== oldNode.props) {
			patchProps(currentNode, oldNode);
		}
	
		// component with componentDidUpdate
		if (oldNodeType === 2 && oldComponent.componentDidUpdate !== void 0) {
			componentUpdateBoundary(oldComponent, 'componentDidUpdate', newProps, newState);
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * hydration
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * hydrates a server-side rendered dom structure
	 * 
	 * @param  {Node}       parent
	 * @param  {VNode}      subject
	 * @param  {number}     index
	 * @param  {VNode}      parentNode
	 * @param  {?Component} component
	 */
	function hydrate (parent, subject, index, parentNode, component) {
		var newNode = subject.Type === 2 ? extractComponentNode(subject, null, null) : subject;
		
		var nodeType = newNode.Type;
		var type = newNode.type;
	
		var childNodes = parent.childNodes;
		var element = childNodes[index];
		var nodeName = element.nodeName;
	
		// DOMNode type does not match
		if (type !== nodeName.toLowerCase()) {
			// root(mount target) context
			if (parentNode === null) {
				// find a DOMNode match
				for (var i = 0, l = childNodes.length; i < l; i++) {
					if ((element = childNodes[i]).nodeName.toLowerCase() === type) {
						break;
					}
				}
			}
			else {
				// whitespace
				if (nodeName === '#text' && element.nodeValue.trim() === '') {
					parent.removeChild(element);
				}
	
				element = childNodes[index];
			}
		}
	
		// newNode is not a textNode, hydrate its children
		if (nodeType !== 3) {
			var props = newNode.props;
			var children = newNode.children;
			var length = children.length;
	
			// vnode has component attachment
			if (subject.instance !== null) {
				(component = subject.instance)['--vnode'].DOMNode = parent;
			}
	
			// hydrate children
			for (var i = 0; i < length; i++) {
				var newChild = children[i];
	
				// hoisted, clone VNode
				if (newChild.DOMNode !== null) {
					newChild = children[i] = cloneNode(newChild);
				}
	
				hydrate(element, newChild, i, newNode, component);
			}
	
	
			// not a fragment, not an emtpy object
			if (props !== objEmpty) {
				// events
				assignProps(element, props, true, component);
			}
	
			// hydrate the dom element to the virtual node
			subject.DOMNode = element;
		}
		// textNode
		else if (nodeType === 3) {
			var children = parentNode.children;
			var length = children.length;
	
			// when we reach a string child that is followed by a string child, 
			// it is assumed that the dom representing it is a single textNode
			// case in point h('h1', 'Hello', 'World') output: <h1>HelloWorld</h1>
			// HelloWorld is one textNode in the DOM but two in the VNode
			if (length > 1 && index + 1 < length && children[index + 1].Type === 3) {
				var fragment = document.createDocumentFragment();
	
				// look ahead of this nodes siblings and add all textNodes to the fragment
				// and exit when a non-textNode is encounted
				for (var i = index, len = length - index; i < len; i++) {
					var textNode = children[i];
	
					// exit early once we encounter a non textNode
					if (textNode.Type !== 3) {
						break;
					}
	
					// create textNode, hydrate and append to fragment
					fragment.appendChild(textNode.DOMNode = document.createTextNode(textNode.children));
				}
	
				// replace the textNode with a set of textNodes
				parent.replaceChild(fragment, element);
			}
			else {
				var nodeValue = newNode.children+'';
	
				// DOMNode text does not match, reconcile
				if (element.nodeValue !== nodeValue) {
					element.nodeValue = nodeValue;
				}
	
				// hydrate single textNode
				newNode.DOMNode = element;
			}
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * Server Side Render
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * server side render to string
	 *
	 * @public
	 * 
	 * @param  {(Object|function)}  subject
	 * @param  {(string|function)=} template
	 * @return {string}
	 */
	function renderToString (subject, template) {
		var lookup = {styles: '', namespaces: {}};	
		var body = renderVNodeToString(extractVirtualNode(subject, null), lookup, true);
		var styles = lookup.styles;
		var style = styles.length !== 0 ? styles : '';
	
		if (template) {
			if (typeof template === 'string') {
				return template.replace('@body', body+style);
			}
			else {
				return template(body, styles);
			}
		}
		else {
			return body+style;
		}
	}
	
	
	/**
	 * server-side render to stream
	 *
	 * @public
	 * 
	 * @param  {(VNode|Component|VNode[])} subject 
	 * @param  {string=}                   template
	 * @return {Stream}
	 */
	function renderToStream (subject, template) {	
		return subject ? (
			new Stream(subject, template == null ? null : template.split('@body'))
		) : function (subject) {
			return new Stream(subject);
		}
	}
	
	
	/**
	 * Stream
	 * 
	 * @param {(VNode|Component|VNode[])} subject
	 * @param {string=}                   template
	 */
	function Stream (subject, template) {
		if (server === false) {
			return renderToString(subject, template);
		}
	
		this.initial = true;
		this.stack = [];
		this.lookup = {styles: '', namespaces: {}};
		this.template = template;
		this.node = extractVirtualNode(subject, null);
	
		readable.call(this);
	}
	
	
	/**
	 * Stream prototype
	 * 
	 * @type {Object<string, (function|string)>}
	 */
	Stream.prototype = server ? Object.create(readable.prototype, {
		_type: {
			value: 'text/html'
		},
		_read: {
			value: function () {
				var initial = this.initial;
				var template;
				var styles;
				var blob;
	
				if (initial === false && this.stack.length === 0) {
					styles = this.lookup.styles;
					template = this.template;
					blob = '';
	
					// styles?
					if (styles.length !== 0) {
						blob += styles;
					}
	
					// template?
					if (template !== null) {
						styles += template[1];
					}
	
					// reset `initial` identifier
					this.initial = true;
	
					// styles/template?
					if (blob.length !== 0) {
						this.push(blob);
					}
	
					// end of stream
					this.push(null);
				}
				else {
					// start of stream
					if (initial === true) {
						this.initial = false;
	
						// has template, push opening 
						if (template = this.template) {
							this.push(template[0]);
						}
					}
	
					// pipe a chunk
					this._pipe(
						this.node, 
						true, 
						this.stack, 
						this.lookup, 
						initial, 
						this
					);
				}
			}
		},
		_pipe: {
			value: function (subject, flush, stack, lookup, initial, self) {
				// if there is something pending in the stack give that priority
				if (flush && stack.length !== 0) {
					stack.pop()(this);
					
					return;
				}
	
				var nodeType = subject.Type;
	
				// text node, sync
				if (nodeType === 3) {
					this.push(escape(subject.children) || ' ');
	
					return;
				}
	
				var vnode;
				var component;
				var promise;
	
				// if component
				if (nodeType === 2) {
					// cached
					if (subject.type.HTMLCache !== void 0) {
						this.push(subject.type.HTMLCache);
	
						return;
					}
					// resolved async component
					else if (subject.instance !== null) {
						// render returned promise
						if (subject.DOMNode !== null) {
							vnode = subject.DOMNode;
						}
						// async getInitialProps
						else {
							vnode = extractRenderNode(subject.instance);
						}
					}
					else {
						vnode = extractComponentNode(subject, null, null);
	
						// pending async component
						if ((component = subject.instance)['--async'] !== false) {
							promise = component['--async'] !== true;
	
							(promise ? component['--async'] : component.props)
								.then(function resolveAsyncComponent (data) {
									vnode.Type = 2;
									vnode.type = subject.type;
									vnode.instance = component;
	
									if (promise) {
										vnode.DOMNode = data;
									}
									else {
										component.props = data;
									}
	
									self._pipe(
										vnode,
										false, 
										stack, 
										lookup, 
										initial, 
										self
									);
								}).catch(funcEmpty);
	
							component['--async'] = false;
	
							return;
						}
					}
				}
				else {
					vnode = subject;
				}
	
				// references
				var type = vnode.type;
				var props = vnode.props;
				var children = vnode.children;
	
				var propsStr = renderStylesheetToString(
					nodeType, type, subject.instance, subject.type, renderPropsToString(vnode), lookup
				);
	
				if (isVoid[type] === 0) {
					// <type ...props>
					this.push('<'+type+propsStr+'>');
	
					return;
				}
	
				var opening = '<'+type+propsStr+'>';
				var closing = '</'+type+'>';
	
				if (props.innerHTML !== void 0) {
					// special case when a prop replaces children
					this.push(opening + props.innerHTML + closing);
	
					return;
				}
	
				var length = children.length;
	
				if (length === 0) {
					// no children, sync
					this.push(opening + closing);
	
					return;
				}
				if (length === 1 && children[0].Type === 3) {
					// one text node child, sync
					this.push(opening + escape(children[0].children) + closing);
	
					return;
				}
	
				// has children, async
				// since we cannot know ahead of time the number of children
				// this is operation is split into asynchronously added chunks of data
				var index = 0;
	
				// add one more for the closing tag
				var middlwares = length + 1;
	
				var doctype = initial && type === 'html';
				var eof = doctype || type === 'body';
	
				// if opening html tag, push doctype first
				if (doctype) {
					opening = '<!doctype html>' + opening;
				}
	
				// for each _read if queue has middleware
				// middleware execution will take priority
				var middleware = function (stream) {
					// done, close html tag, delegate next middleware
					if (index === length) {
						// if the closing tag is body or html
						// we want to push the styles before we close them
						if (eof && lookup.styles.length !== 0) {
							stream.push(lookup.styles);
	
							// clear styles, avoid adding duplicates
							lookup.styles = '';
						}
	
						stream.push(closing);
					}
					else {
						stream._pipe(
							children[index++], 
							false, 
							stack, 
							lookup, 
							initial, 
							self
						);
					}
				}
	
				// push middlwares
				for (var i = 0; i < middlwares; i++) {
					stack[stack.length] = middleware;
				}
	
				// push opening tag
				this.push(opening);
			}
		}
	}) : objEmpty;
	
	/**
	 * renderToCache
	 *
	 * @public
	 * 
	 * @param  {(VNode|VNode[]|Component)} subject
	 * @return {(VNode|VNode[]|Component)} subject
	 */
	function renderToCache (subject) {
		if (subject != null) {
			// array
			if (subject.constructor === Array) {
				for (var i = 0, length = subject.length; i < length; i++) {
					renderToCache(subject[i]);
				}
			}
			// component
			else if (typeof subject === 'function') {
				subject.HTMLCache = renderToString(subject);
			}
			// vnode
			else if (subject.Type === 2) {
				subject.type.HTMLCache = renderToString(subject);
			}
		}
	
		return subject;
	}
	
	
	/**
	 * render stylesheet to string
	 *
	 * @param  {number}              nodeType
	 * @param  {string}              type
	 * @param  {Component}           component
	 * @param  {function}            constructor
	 * @param  {string}              output   
	 * @param  {Object<string, any>} lookup
	 * @return {string}          
	 */
	function renderStylesheetToString (nodeType, type, component, constructor, output, lookup) {
		// stylesheet
		if (nodeType === 2 && type !== 'noscript') {
			// stylesheet
			if (component.stylesheet) {
				var namespace = component.stylesheet.CSSNamespace;
	
				// create
				if (namespace === void 0) {
					var decorator = createScopedCSS(component, constructor.COMPCache || constructor, false);
	
					lookup.namespaces[namespace = decorator.CSSNamespace] = true;			
					lookup.styles += '<style id="\''+namespace+'\'">'+decorator(null)+'</style>';
				}
				// cache
			 	else if (!lookup.namespaces[namespace]) {
			 		lookup.namespaces[namespace] = true;
					lookup.styles += '<style id="\''+namespace+'\'">'+component.stylesheet(null)+'</style>';
				}
	
				// add attribute to element
				output += ' '+nsStyle+'='+'"'+namespace+'"';
			}
		}
	
		return output;
	}
	
	
	/**
	 * render props to string
	 * 
	 * @param  {VNode}  vnode
	 * @return {string}
	 */
	function renderPropsToString (vnode) {
		var string = '';
		var props = vnode.props;
	
		var length;
		var type;
		var value;
		var styles;
		var property;
	
		// construct props string
		if (props !== objEmpty) {
			for (var name in props) {
				value = props[name];
	
				// value --> <type name=value>, exclude props with undefined/null/false as values
				if (value != null && value !== false) {
					type = typeof value;
					length = name.length;
	
					// props to avoid
					if (
						(length === 3 && (name === 'key' || name === 'ref')) === false &&
						(length === 9 && name === 'children') === false &&
						(length === 9 && (name === 'innerHTML' && name === 'innerText')) === false &&
						(type.length === 8 && type === 'function') === false &&
						isEventProp(name) === false
					) {
						// defaultValue does not render
						if (name === 'defaultValue') {
							// if value does not already exist
							if (props.value === void 0) {
								name = 'value';
							}
							// else exist
							else {
								return;
							}
						}
	
						if (type === 'string' && value) {
							value = escape(value);
						}
	
						if (type !== 'object') {
							if (length === 9 && name === 'className') { 
								name = 'class'; 
							}
	
							// if falsey/truefy checkbox=true ---> <type checkbox>
							string += ' ' + (value === true ? name : name + '="' + value + '"');
						}
						// style objects
						else {
							styles = '';
	
							for (var name in value) {
								property = value[name];
	
								// if camelCase convert to dash-case 
								// i.e marginTop --> margin-top
								if (name !== name.toLowerCase()) {
									name = name.replace(regStyleCamel, '$1-').replace(regStyleVendor, '-$1').toLowerCase();
								}
	
								styles += name + ':' + property + ';';
							}
	
							string += name + '="' + property + '"';
						}
					}
				}
			}
		}
	
		return string;
	}
	
	
	/**
	 * render a VNode to string
	 * 
	 * @param  {VNode}               subject
	 * @param  {Object<string, any>} lookup
	 * @param  {boolean}             initial
	 * @return {string}  
	 */
	function renderVNodeToString (subject, lookup, initial) {
		var nodeType = subject.Type;
	
		// textNode
		if (nodeType === 3) {
			return escape(subject.children) || ' ';
		}
	
		var vnode;
	
		// if component
		if (nodeType === 2) {
			// if cached
			if (subject.type.HTMLCache !== void 0) {
				return subject.type.HTMLCache;
			} 
			else {
				vnode = extractComponentNode(subject, null, null);
			}
		} 
		else {
			vnode = subject;
		}
	
		// references
		var type = vnode.type;
		var props = vnode.props;
		var children = vnode.children;
	
		var childrenString = '';
		var vnodeString = '';
	
		if (props.innerHTML !== void 0) {
			// special case when a prop replaces children
			childrenString = props.innerHTML;
		}
		else {		
			// construct children string
			if (children.length !== 0) {
				for (var i = 0, length = children.length; i < length; i++) {
					childrenString += renderVNodeToString(children[i], lookup, false);
				}
			}
		}
	
		var propsStr = renderStylesheetToString(
			nodeType, type, subject.instance, subject.type, renderPropsToString(vnode), lookup
		);
	
		if (isVoid[type] === 0) {
			// <type ...props>
			vnodeString = '<'+type+propsStr+'>';
		}
		else {
			// <type ...props>...children</type>
			vnodeString = '<'+type+propsStr+'>'+childrenString+'</'+type+'>';
		}
	
		// add doctype if initial element is <html>
		return initial && type === 'html' ? ('<!doctype html>' + vnodeString) : vnodeString;
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * stream
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * create stream
	 *
	 * @public
	 * 
	 * @param  {(function(resolve, reject)|any)} value
	 * @param  {(function(...any)|boolean)}      middleware
	 * @return {function}
	 */
	function stream (value, middleware) {
		var store;
	
		// state
		var paused = false;
	
		// this allows us to return values in a .then block that will
		// get passed to the next .then block
		var chain = {then: null, catch: null};
	
		// .then/.catch listeners
		var listeners = {then: [], catch: []};
	
		// predetermine if a middlware was passed
		var plugin = middleware != null;
	
		// predetermine if the middlware passed is a function
		var func = plugin && typeof middleware === 'function';
	
		function observable (value) {
			// received value, update stream
			if (arguments.length !== 0) {
				store = value;
				
				schedule(function () {
					dispatch('then', store);
				});
	
				return observable;
			}
			else {
				// if you pass a middleware function i.e a = stream(1, String)
				// the stream will return 1 processed through String
				// if you pass a boolean primitive the assumtion is made that the store
				// is a function and that it should return the functions return value
				if (plugin) {
					return func ? middleware(store) : store();
				}
				else {
					return store;
				}
			}
		}
	
		// dispatcher, dispatches listerners
		function dispatch (type, value) {
			if (paused) {
				return;
			}
	
			var collection = listeners[type];
			var length = collection.length;
	
			if (length !== 0) {
				// executes a listener, adding the return value to the chain
				var action = function (listener) {
					// link in the .then / .catch chain
					var link = listener(chain[type] || value);
					
					// add to chain if defined
					if (link !== void 0) { 
						chain[type] = link; 
					}
				}
	
				for (var i = 0; i < length; i++) {
					sandbox(action, reject, collection[i]);
				}
			}
		}
		
		// add catch/error listener
		function error (listener) {
			return push('catch', listener, null);
		}
	
		// ...JSON.strinfigy()
		function toJSON () {
			return store;
		}
	
		// {function}.valueOf()
		function valueOf () {
			return store; 
		}
	
		// push listener
		function push (type, listener, end) {
			listeners[type].push(function (chain) {
				return listener(chain);
			});
	
			return end === null ? observable : void 0;
		}
	
		// resolve value
		function resolve (value) {
			return observable(value); 
		}
	
		// reject
		function reject (reason) {
			schedule(function () {
				dispatch('catch', reason);
			});
		}
	
		// add done listener, ends the chain
		function done (listener, onerror) {
			then(listener, onerror || true);
		}
	
		// add then listener
		function then (listener, onerror) {
			if (onerror) {
				error(onerror);
			}
	
			if (listener) {
				return push('then', listener, onerror || null);
			}
		}
	
		// create a map
		function map (callback) {
			return stream(function (resolve) {
				resolve(function () { return callback(observable()); });
			}, true);
		}
	
		// end/reset a stream
		function end (value) {
			if (value !== void 0) {
				store = value;
			}
	
			paused = false;
			chain.then = null;
			chain.catch = null; 
			listeners.then = []; 
			listeners.catch = [];
		}
	
		// pause stream
		function pause () {
			paused = true;
		}
	
		// resume stream
		function resume () {
			paused = false;
		}
	
		// assign public methods
		observable.then = then;
		observable.done = done;
		observable.catch = error;
		observable.map = map;
		observable.end = end;
		observable.valueOf = valueOf;
		observable.toJSON = toJSON;
		observable.resolve = resolve;
		observable.reject = reject;
		observable.pause = pause;
		observable.resume = resume;
	
		// acts like a promise if a function is passed as value
		if (typeof value === 'function') {
			value(resolve, reject);
		} 
		else {
			observable(value);
		}
	
		return observable;
	}
	
	
	/**
	 * create new stream in resolved state
	 *
	 * @public
	 * 
	 * @param  {*} value
	 * @return {function}
	 */
	stream.resolve = function (value) {
		return stream(function (resolve, reject) {
			resolve(value);
		});
	};
	
	
	/**
	 * create new stream in rejected state
	 *
	 * @public
	 * 
	 * @param  {*} value 
	 * @return {function}
	 */
	stream.reject = function (value) {
		return stream(function (resolve, reject) {
			reject(value);
		});
	};
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * request
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * create http request
	 *
	 * @param  {VRequest|Object<string, any>}
	 * @return {function} {then, catch, done, ...}
	 */
	function http (options) {
		// extract properties from options
		var method = options.method;
		var url = options.url;
		var payload = options.payload; 
		var enctype = options.enctype;
		var responseType = options.responseType;
		var withCredentials = options.withCredentials;
		var headers = options.headers;
		var initial = options.initial;
		var config = options.config;
		var username = options.username;
		var password = options.password;
	
		// return a stream
		return stream(function (resolve, reject) {
			// if XMLHttpRequest constructor absent, exit early
			if (window.XMLHttpRequest == null) {
				return;
			}
	
			// create xhr object
			var xhr = new window.XMLHttpRequest();
	
			// retrieve browser location 
			var location = window.location;
	
			// create anchor element
			var anchor = document.createElement('a');
			
			// use to extract hostname, port, protocol properties
			anchor.href = url;
	
			// check if cross origin request
			var isCrossOriginRequest = !(
				anchor.hostname === location.hostname && 
				anchor.port === location.port &&
				anchor.protocol === location.protocol && 
				location.protocol !== 'file:'
			);
	
			// open request
			xhr.open(method, url, true, username, password);
	
			// on success resolve
			xhr.onload = function onload () { 
				response(this, responseType, resolve, reject);
			};
			// on error reject
			xhr.onerror = function onerror () { 
				reject(this.statusText); 
			};
			
			// cross origin request cookies
			isCrossOriginRequest && withCredentials && (xhr.withCredentials = true);
	
			// assign content type and payload
			if (method === 'POST') {
				xhr.setRequestHeader('Content-Type', enctype);
	
				if (enctype.indexOf('x-www-form-urlencoded') > -1) {
					payload = serialize(payload);
				} 
				else if (enctype.indexOf('json') > -1) {
					payload = JSON.stringify(payload);
				}
			}
	
			// headers property
			if (headers != null) {
				// assign headers
				for (var name in headers) {
					xhr.setRequestHeader(name, headers[name]);
				}
			}
	
			// if, assign inital value of stream
			initial != null && resolve(initial);
	
			// config, expose underlying XMLHttpRequest object
			// allows us to save a reference to it and call abort when required
			config != null && typeof config === 'function' && config(xhr);
	
			// send request
			payload != null ? xhr.send(payload) : xhr.send();
		});
	}
	
	
	/**
	 * request constructor
	 *
	 * @public
	 * 
	 * @example request({method: 'GET', url: '?'}) === request.get('?') === request('?')
	 * 
	 * @param  {VRequest|Object<string, any>} options
	 * @return {function} {then, catch, done, ...}
	 */
	function request (options) {
		// alias request.get
		if (typeof options === 'string') {
			return request.get(options, arguments[1], arguments[2], arguments[3]);
		}
		else {
			var payload = options.payload;
			var method = options.method = (options.method.toUpperCase() || 'GET');
			
			// encode url
			options.url = encodeURI(options.url);
	
			// enctype syntax sugar
			switch (options.enctype) {
				case 'json': options.enctype = 'application/json'; break;
				case 'text': options.enctype = 'text/plain'; break;
				case 'file': options.enctype = 'multipart/form-data'; break;
				default: options.enctype = 'application/x-www-form-urlencoded';
			}
	
			// if has payload && GET pass payload as query string
			if (method === 'GET' && payload != null) {
				options.url += '?' + (typeof payload === 'object' ? serialize(payload) : payload);		
			}
	
			// returns a promise-like stream
			return http(options);
		}
	}
	
	
	/**
	 * request GET alias
	 * 
	 * @param  {string}   url
	 * @param  {any=}     payload
	 * @param  {string=}  enctype
	 * @param  {string=}  responseType
	 * @return {function} {then, catch, done, ...}
	 */
	request.get = function (url, payload, enctype, responseType) {
		return request(createRequestShape('GET', url, payload, enctype, responseType));
	};
	
	
	/**
	 * request POST alias
	 * 
	 * @param  {string}   url
	 * @param  {any=}     payload
	 * @param  {string=}  enctype
	 * @param  {string=}  responseType
	 * @return {function} {then, catch, done, ...}
	 */
	request.post = function (url, payload, enctype, responseType) {
		return request(createRequestShape('POST', url, payload, enctype, responseType));
	};
	
	
	/**
	 * retrieve and format response
	 * 
	 * @param  {XMLHttpRequest} xhr
	 * @param  {string}         responseType
	 * @param  {function}       resolve
	 * @param  {function}       reject
	 * @return {(Node|string|Object)}
	 */
	function response (xhr, responseType, resolve, reject) {			
		var header = xhr.getResponseHeader('Content-Type');
		var status = xhr.status;
		
		var data;
		var body;
	
		// text
		if (!xhr.responseType || xhr.responseType === 'text') {
			data = xhr.responseText;
		}
		// Node 
		else if (xhr.responseType === 'document') {
			data = responseXML;
		}
		// ?any
		else {
			data = response;
		}
	
		// response format
		if (responseType == null) {
			responseType = (header.indexOf(';') > -1 ? header.split(';')[0].split('/') : header.split('/'))[1];
		}
	
		// json
		if (responseType === 'json') {
			// sandbox JSON parsing
			body = sandbox(JSON.parse, reject, data);
		} 
		// Node
		else if (responseType === 'html' || responseType === 'document') {
			// parse html string
			body = (new DOMParser()).parseFromString(data, 'text/html');
		}
		// ?any
		else {
			body = data;
		}
	
		if (!status || status >= 400) {
			reject(xhr);
		}
		else {
			resolve(body);
		}
	}
	
	
	/**
	 * serialize + encode object
	 * 
	 * @example serialize({url:'http://.com'}) //=> 'url=http%3A%2F%2F.com'
	 * 
	 * @param  {Object} object   
	 * @param  {string} prefix
	 * @return {string}
	 */
	function serialize (object, prefix) {
		var array = [];
	
		for (var key in object) {
			var value = object[key];
			var prefixed = prefix !== void 0 ? prefix + '[' + key + ']' : key;
	
			// recursive serialize
			if (typeof value == 'object') {
				array[array.length] = serialize(value, prefixed);
			}
			// serialize
			else {
				array[array.length] = encodeURIComponent(prefixed) + '=' + encodeURIComponent(value);
			}
		}
	
		return array.join('&');
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * router
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * router
	 *
	 * @public
	 * 
	 * @param  {Object<string, (function|Component)>} routes
	 * @param  {string|Object<string, any>=}          address 
	 * @param  {string=}                              initialiser
	 * @param  {(string|Node)=}                       element
	 * @param  {function=}                            middleware
	 * @param  {function=}                            notFound
	 * @return {Object}
	 */
	function router (routes, directory, initial, mount, middleware, notFound) {
		if (typeof directory === 'object') {
			mount = directory.mount;
			initial = directory.initial;
			middleware = directory.middleware;
			notFound = directory['404'];
			directory = directory.directory;
		}
	
		// functions
		if (middleware !== void 0) {
			for (var name in routes) {
				(function () {
					var func = routes[name];
	
					routes[name] = function (data) { 
						middleware(func, data, mount); 
					};
				})()
			}
		}
		// components
		else if (mount !== void 0) {
			for (var name in routes) {
				(function () {
					var component = routes[name];
	
					routes[name] = function (data) {	
						render(createComponentShape(component, data, null), mount, null, false);
					};
				})();
			}
		}
	
		return createRouter(routes, directory || '', initial, notFound);
	}
	
	
	/**
	 * router constructor
	 * 
	 * @param {Object<string, (function|Component)>} patterns
	 * @param {string=}                              directory
	 * @param {function=}                            initialiser
	 * @param {function=}                            notFound
	 */
	function createRouter (patterns, directory, initialiser, notFound) {
		// listens for changes to the url
		function listen () {
			if (interval !== 0) {
				// clear the interval if it's already set
				clearInterval(interval);
				interval = 0;
			}
	
			// start listening for a change in the url
			interval = setInterval(function () {
				href = location.href;
	
				// current url does not equal the url of the browser
				if (href !== current) {
					// update the current and dispatch
					dispatch((current = href).replace(origin, ''));
				}
			}, 40);
		}
	
		// register routes
		function register () {
			// assign routes
			for (var name in patterns) {
				set(name, patterns[name]);
			}
		}
	
		// assign a route
		function set (uri, callback) {
			// - params is where we store variable names
			// i.e in /:user/:id - user, id are variables
			var params = [];
	
			// uri is the url/RegExp that describes the uri match thus
			// given the following /:user/:id/*
			// the pattern would be / ([^\/]+) / ([^\/]+) / (?:.*)
			var pattern = uri.replace(regex, function () {
				// id => arguments: 'user', id, undefned
				var id = arguments[2];
				// if, not variable, else, capture variable
				return id != null ? (params[params.length] = id, '([^\/]+)') : '(?:.*)';
			});
	
			// assign a route item
			Object.defineProperty(routes, uri, {
				value: Object.create(null, {
					callback: {value: callback},
					pattern: {value: new RegExp(directory + pattern + '$')},
					params: {value: params}
				}),
				enumerable: true
			});
		}
	
		// called when the listener detects a route change
		function dispatch (current) {
			for (var name in routes) {
				finder(routes[name], name, current);
			}
	
			// if resolved flag is 0 and a notFound function is available
			if (resolved === 0 && notFound !== void 0) {
				notFound({url: current});
			}
	
			// reset resolved flag
			resolved = 0;
		}
	
		// find a match from the available routes
		function finder (route, uri, current) {
			var match = current.match(route.pattern);
	
			// we have a match
			if (match != null) {
				// create params object to pass to callback
				// i.e {user: 'simple', id: '1234'}
				var args = match.slice(1, match.length).reduce(function (prev, val, i) {
					// if this is the first value, create variables store
					if (prev === null) {
						prev = {url: current};
					}
	
					// name: value, i.e user: 'simple'
					// `vars` contains the keys for variables
					prev[route.params[i]] = val;
	
					return prev;
	
					// null --> first value
				}, null) || {url: current};
	
				route.callback(args, uri);
	
				// register match
				resolved = 1;
			}
			else {
				// register not found
				resolved = 0;
			}
		}
	
		// middleware between event and route
		function link (to) {
			var func = typeof to === 'function';
	
			return function (e) {
				var target = e.currentTarget || e.target || this;
				var value = func ? to(target) : to;
	
				navigate(target[value] || (target.nodeName && target.getAttribute(value)) || value); 
			};
		}
	
		// navigate to a uri
		function navigate (uri) {
			if (typeof uri === 'string') {
				history.pushState(null, null, directory + uri);
			}
		}
	
		// resume listener
		function resume () {
			current = location.href;
			listen();
		}
	
		// pause listerner
		function pause () {
			clearInterval(interval);
		}
	
		// stop listening and clear all routes 
		function destroy () {
			pause();
			routes = {};
		}
	
		// manually resolve a route
		function resolve (uri) {
			dispatch(uri);
		}
	
		// normalize rootAddress format
		// i.e '/url/' -> '/url', 47 === `/` character
		if (typeof directory === 'string' && directory.charCodeAt(directory.length - 1) === 47) {
			directory = directory.substring(0, directory.length - 1);
		}
	
		var regex = /([:*])(\w+)|([\*])/g;
		var history = window.history || objEmpty;
		var location = history.location || window.location;
		var origin = location.origin;
		var current = '';
		var href = '';
		var interval = 0;
		var resolved = 0;
		var routes = {};
	
		/** @public */
		var api = Object.defineProperty({
			navigate: navigate,
			back: history.back, 
			forward: history.forward, 
			link: link,
			resume: resume,
			pause: pause,
			destroy: destroy,
			set: set,
			resolve: resolve,
			routes: routes
		}, 'location', {
			get: function () { return current; },
			set: navigate
		});
	
		// register routes
		register();
	
		// listen if browser enviroment
		if (browser) {
			listen();
		}
	
		// if function pass api as args, else if string navigate to url
		if (initialiser !== void 0) {
			var type = typeof initialiser;
	
			if (type === 'function') {
				// initialiser function
				initialiser(api);
			}
			else if (type === 'string') {
				// navigate to path
				navigate(initialiser);
			}
		}
	
		return api;
	}
	
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * store
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * creates a store enhancer
	 *
	 * @public
	 * 
	 * @param   {...function} middlewares
	 * @return  {function}    a store enhancer
	 */
	function applyMiddleware () {
		var middlewares = [];
		var length = arguments.length;
	
		// passing arguments to a function i.e [].splice() will prevent this function
		// from getting optimized by the VM, so we manually build the array in-line
		for (var i = 0; i < length; i++) {
			middlewares[i] = arguments[i];
		}
	
		return function (Store) {
			return function (reducer, initialState, enhancer) {
				// create store
				var store = Store(reducer, initialState, enhancer);
				
				// create api
				var api = {
					getState: store.getState,
					dispatch: store.dispatch
				};
	
				// create chain
				var chain = [];
	
				// add middlewares to chain
				for (var i = 0; i < length; i++) {
					chain[i] = middlewares[i](api);
				}
	
				// return store with composed dispatcher
				return {
					getState: store.getState, 
					dispatch: composeMiddlewares.apply(null, chain)(store.dispatch), 
					subscribe: store.subscribe,
					connect: store.connect,
					replaceReducer: store.replaceReducer
				};
			}
		}
	}
	
	
	/**
	 * composes single-argument functions from right to left. The right most
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function
	 * 
	 * @param  {...function} funcs functions to compose
	 * @return {function}          function obtained by composing the argument functions
	 * from right to left. for example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	function composeMiddlewares () {
		var length = arguments.length;
	
		// no functions passed
		if (length === 0) {
			return function (a) { 
				return a;
			}
		}
		else {
			// functions to compose
			var funcs = [];
	
			// passing arguments to a function i.e [].splice() will prevent this function
			// from getting optimized by the VM, so we manually build the array in-line
			for (var i = 0; i < length; i++) {
				funcs[i] = arguments[i];
			}
	
			// remove and retrieve last function
			// we will use this for the initial composition
			var lastFunc = funcs.pop();
	
			// decrement length of funcs array as a reflection of the above
			length--;
	
			return function () {
				// initial composition
				var output = lastFunc.apply(null, arguments);
					
				// recursively commpose all functions
				while (length--) {
					output = funcs[length](output);
				}
	
				return output;
			}
		}
	}
	
	
	/**
	 * combines a set of reducers
	 *
	 * @public
	 * 
	 * @param  {Object<string, function>}  reducers
	 * @return {function}
	 */
	function combineReducers (reducers) {
		var keys = Object.keys(reducers);
		var length = keys.length;
	
		// return a single reducer which combines all reducers
		return function (state, action) {
			state = state || {};
	
			var nextState = {};
			var key;
	
			for (var i = 0; i < length; i++) {			
				nextState[key = keys[i]] = reducers[key](state[key], action);
			}
	
			return nextState;
		}
	}
	
	
	/**
	 * create store interface
	 * 
	 * @param  {function}  reducer
	 * @param  {*}         initialState
	 * @param  {function=} enhancer
	 * @return {Store}     {getState, dispatch, subscribe, connect, replaceReducer}
	 */
	function createStore (reducer, initialState, enhancer) {
		// exit early, reducer is not a function
		if (typeof reducer !== 'function') {
			throw 'reducer should be a function';
		}
	
		// if initialState is a function and enhancer is undefined
		// we assume that initialState is an enhancer
		if (typeof initialState === 'function' && enhancer === void 0) {
			enhancer = initialState;
			initialState = void 0;
		}
	
		// delegate to enhancer if defined
		if (enhancer !== void 0) {
			// exit early, enhancer is not a function
			if (typeof enhancer !== 'function') {
				throw 'enhancer should be a function';
			}
	
			return applyMiddleware(enhancer)(Store)(reducer, initialState);
		}
	
		// if object, multiple reducers, else, single reducer
		return typeof reducer === 'object' ? Store(combineReducers(reducer)) : Store(reducer);
	}
	
	
	/**
	 * create store constructor
	 * 
	 * @param  {function} reducer
	 * @param  {*}        initialState
	 * @return {Store}    {getState, dispatch, subscribe, connect, replaceReducer}
	 */
	function Store (reducer, initialState) {
		var currentState = initialState;
		var listeners = [];
		var length = 0;
	
		// state getter, retrieves the current state
		function getState () {
			return currentState;
		}
	
		// dispatchs a action
		function dispatch (action) {
			if (action.type === void 0) {
				throw 'action without a type';
			}
	
			// update state with return value of reducer
			currentState = reducer(currentState, action);
	
			// dispatch to all listeners
			for (var i = 0; i < length; i++) {
				listeners[i](currentState);
			}
	
			return action;
		}
	
		// subscribe to a store
		function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw 'listener should be a function';
			}
	
			// append listener
			listeners[length++] = listener;
	
			// return unsubscribe function
			return function unsubscribe () {
				// for each listener
				for (var i = 0; i < length; i++) {
					// if currentListener === listener, remove
					if (listeners[i] === listener) {
						listeners.splice(i, 1);
						length--;
					}
				}
			}
		}
	
		// replace a reducer
		function replaceReducer (nextReducer) {
			// exit early, reducer is not a function
			if (typeof nextReducer !== 'function') {
				throw 'reducer should be a function';
			}
	
			// replace reducer
			reducer = nextReducer;
	
			// dispath initial action
			dispatch({type: '@/STORE'});
		}
	
		// auto subscribe a component to a store
		function connect (subject, element) {
			var renderer;
	
			// if component and element 
			if (element) {			
				// create renderer add it as a subscriber and return the renderer
				subscribe(
					renderer = render(
						createComponentShape(subject, currentState, null), 
						element, 
						null, 
						null
					)
				);
	
				return renderer;
			}
			else {
				return subscribe(subject);
			}
		}
	
		// dispath initial action
		dispatch({type: '@/STORE'});
	
		return {
			getState: getState, 
			dispatch: dispatch, 
			subscribe: subscribe,
			connect: connect,
			replaceReducer: replaceReducer
		};
	}
	
	
	

	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * exports
	 * 
	 * ---------------------------------------------------------------------------------
	 */


	if (browser) {
		window.h = createElement;
	}

	return {
		// version
		version: version,

		// alias
		h: createElement,
		
		// elements
		createElement: createElement,
		isValidElement: isValidElement,
		cloneElement: cloneElement,
		createFactory: createFactory,
		DOM: DOM,

		// render
		render: render,
		shallow: shallow,

		// components
		Component: Component,
		createClass: createClass,

		// shapes
		text: createTextShape,
		element: createElementShape,
		svg: createSvgShape,
		fragment: createFragmentShape,
		component: createComponentShape,
		portal: createPortalShape,

		// stylesheet
		stylesheet: stylesheet,

		// server
		renderToString: renderToString,
		renderToStream: renderToStream,
		renderToCache: renderToCache,

		// stores
		createStore: createStore,
		applyMiddleware: applyMiddleware,
		combineReducers: combineReducers,
		
		// utilities
		request: request,
		router: router,
		stream: stream
	};
}));