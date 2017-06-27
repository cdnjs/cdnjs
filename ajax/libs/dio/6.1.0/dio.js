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
	var version = '6.1.0';
	
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
	var nodeEmpty = createNodeShape(0, '', objEmpty, arrEmpty, null, null, 0, null, null);
	var funcEmpty = function () {};
	var fragProps = {style: 'display: inherit;'};
	
	
	// server
	var server = browser === false && window.window !== window;
	var readable = server ? require('stream').Readable : null;
	
	// void elements
	var isVoid = {
		'area':   0, 'base':  0, 'br':   0, '!doctype': 0, 'col':    0, 'embed': 0,
		'wbr':    0, 'track': 0, 'hr':   0, 'img':      0, 'input':  0, 
		'keygen': 0, 'link':  0, 'meta': 0, 'param':    0, 'source': 0
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
			props: props || objEmpty,
			children: children || [],
			DOMNode: null,
			instance: null,
			index: 0,
			parent: null,
			key: null
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
			props: props || objEmpty,
			children: children || arrEmpty,
			DOMNode: null,
			instance: null,
			index: 0,
			parent: null,
			key: null
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
			parent: null,
			key: null
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
			index: null,
			parent: null,
			key: null
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
			props: (props = props || {}, props.xmlns = nsSvg, props),
			children: children || [],
			DOMNode: null,
			instance: null,
			index: 0,
			parent: null,
			key: null
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
	 * @param  {Component}                   parent
	 * @return {VNode}
	 */
	function createNodeShape (Type, type, props, children, DOMNode, instance, index, parent, key) {
		return {
			Type: Type,
			type: type,
			props: props,
			children: children,
			DOMNode: DOMNode,
			instance: instance,
			index: index,
			parent: parent,
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
			parent: null,
			key: null
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
			props: props,
			children: children,
			DOMNode: type,
			instance: null,
			index: 0,
			parent: null,
			key: null
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
		var selector  = '['+nsStyle+'='+namespace+']';
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
	 * css compiler
	 *
	 * @public
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
	
	    // [ attr selector
	    if (type === 91) {
	        // `[data-id=namespace]` -> ['data-id', 'namespace']
	        var attr = selector.substring(1, selector.length-1).split('=');
	        var char = (namespace = attr[1]).charCodeAt(0);
	
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
	    var animns = (animations === void 0 || animations === true) ? namespace : '';
	
	    // uses middleware
	    var use = middleware != null;
	    var plugins;
	
	    // middleware
	    if (use) {
	        var uses = (typeof middleware).charCodeAt(0);
	
	        // o, object of middlewares
	        if (uses === 111) {
	            for (var i = 0, keys = Object.keys(middleware), length = keys.length; i < length; i++) {
	                stylesheet.use(keys[i], middleware[keys[i]]);
	            }
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
	
	    // context signatures       
	    var special = 0;
	    var close = 0;
	    var closed = 0;
	    var comment = 0;
	    var strings = 0;
	    var nested = 0;
	
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
	        var code = styles.charCodeAt(caret);
	
	        // {, }, ; characters, parse line by line
	        if (strings === 0 && (code === 123 || code === 125 || code === 59)) {
	            buff += styles[caret];
	
	            var first = buff.charCodeAt(0);
	
	            // only trim when the first character is a space ` `
	            if (first === 32) {
	                first = (buff = buff.trim()).charCodeAt(0);
	            }
	
	            // default to 0 instead of NaN if there is no second/third character
	            var second = buff.charCodeAt(1) || 0;
	            var third = buff.charCodeAt(2) || 0;
	
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
	                code === 125 && (comment = 0);
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
	                                char === 123 ? closed++ : char === 125 && closed--;
	
	                                // break when the nested block has ended
	                                if (closed === 0) {
	                                    break;
	                                }
	
	                                // build content of nested block
	                                inner += styles[caret++];
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
	                        if (indexOf > -1) {
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
	                variables === void 0 && (variables = []);
	
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
	                    if ((buff.charCodeAt(9) || 0) !== 45) {
	                        // because we can have multiple animations `animation: slide 4s, slideOut 2s`
	                        for (var j = 0, length = anims.length; j < length; j++) {
	                            var anim = anims[j];
	                            var props = anim.split(' ');
	
	                            // since we can't be sure of the position of the name of the animation we have to find it
	                            for (var k = 0, l = props.length; k < l; k++) {
	                                var prop = props[k].trim();
	                                var frst = prop.charCodeAt(0);
	                                var third = prop.charCodeAt(2);
	                                var len = prop.length;
	                                var last = prop.charCodeAt(len - 1);
	
	                                // animation name is anything not in this list
	                                if (
	                                    // cubic-bezier()
	                                    !(frst === 99 && last === 41) &&
	
	                                    // infinite, i, f, e
	                                    !(frst === 105 && third === 102 && last === 101 && len === 8) &&
	
	                                    // linear, l, n, r
	                                    !(frst === 108 && third === 110 && last === 114 && len === 6) &&
	
	                                    // alternate, a, t, e
	                                    !(frst === 97 && third === 116 && last === 101 && len === 9) &&
	
	                                    // normal, n, r, l
	                                    !(frst === 110 && third === 114 && last === 108 && len === 6) &&
	
	                                    // backwords, b, c, s
	                                    !(frst === 98 && third === 99 && last === 115 && len === 9) &&
	
	                                    // forwards, f, r, s
	                                    !(frst === 102 && third === 114 && last === 115 && len === 8) &&
	
	                                    // both, b, t, h
	                                    !(frst === 98 && third === 116 && last === 104 && len === 4) &&
	
	                                    // none, n, n, e
	                                    !(frst === 110 && third === 110 && last === 101 && len === 4)&&
	
	                                    // ease, e, s, e
	                                    !(frst === 101 && third === 115 && last === 101 && len === 4) &&
	
	                                    // ease-
	                                    !(frst === 101 && len > 4 && prop.charCodeAt(4) === 45) &&
	
	                                    // durations 0.4ms, .4s, 400ms ...
	                                    isNaN(parseFloat(prop))
	                                ) {
	                                    props[k] = animns+prop;
	                                    anim = props.join(' ');
	                                }
	                            }
	
	                            build += (j === 0 ? '' : ',') + anim.trim();
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
	                    if (buff.indexOf('flex') > -1) {
	                        // vendor prefix
	                        buff = 'display:'+webkit+'box;display:'+webkit+'flex;'+ms+'flexbox;display:flex;';
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
	                                char === 123 ? closed++ : char === 125 && closed--;
	
	                                // break when the nested block has ended
	                                if (closed === 0) {
	                                    break;
	                                }
	
	                                // build content of nested block
	                                inner += styles[caret++];
	                            }
	
	                            // handle multiple selectors: h1, h2 { div, h4 {} } should generate
	                            // -> h1 div, h2 div, h2 h4, h2 div {}
	                            for (var j = 0, length = prevSelector.length; j < length; j++) {
	                                // extract value, prep index for reuse
	                                temp = prevSelector[j];
	                                prevSelector[j] = '';
	
	                                // since there could also be multiple nested selectors
	                                for (var k = 0, l = nestSelector.length; k < l; k++) {
	                                    selector = temp.replace(prefix, '').trim();
	
	                                    if (nestSelector[k].indexOf(' &') > 0) {
	                                        selector = nestSelector[k].replace('&', '').trim() + ' ' + selector;
	                                    }
	                                    else {
	                                        selector = selector + ' ' + nestSelector[k].trim();
	                                    }
	
	                                    prevSelector[j] += selector.trim() + (k === l - 1  ? '' : ',');
	                                }
	                            }
	
	                            // the `new line` is to avoid conflicts when the last line is a // line comment
	                            buff = ('\n' + prevSelector.join(',') + ' {'+inner+'}');
	
	                            // append nest
	                            nest += buff.replace(/&| +&/g, '');
	
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
	                                if (firstChar === 91) {
	                                    for (var k = j+1, l = length-j; k < l; k++) {
	                                        var broken = (selector += ',' + selectors[k]).trim();
	
	                                        // ], end
	                                        if (broken.charCodeAt(broken.length-1) === 93) {
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
	                    buff = '';
	                    comment = 0;
	                }
	
	                column = 0;
	                line++;
	            }
	            // not `\t` tab character
	            else if (code !== 9) {
	                // " character
	                if (code === 34) {
	                    // exit string " context / enter string context
	                    strings = strings === 34 ? 0 : (strings === 39 ? 39 : 34);
	                }
	                // ' character
	                else if (code === 39) {
	                    // exit string ' context / enter string context
	                    strings = strings === 39 ? 0 : (strings === 34 ? 34 : 39);
	                }
	                // / character
	                else if (code === 47) {
	                    code === 47 && comment < 2 && comment++;
	                }
	
	                // build line buffer
	                buff += styles[caret];
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
	    var plugins = this.plugins;
	    var length = plugins.length;
	
	    if (plugin == null) {
	        plugin = key;
	        key = void 0;
	    }
	
	    // array of plugins
	    if (plugin instanceof Array) {
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
	
				// if props.xmlns is undefined and type === 'svg' or 'math' 
				// assign svg && math namespaces to props.xmlns
				if (props.xmlns === void 0) {	
					if (type === 'svg') { 
						props.xmlns = nsSvg; 
					}
					else if (type === 'math') { 
						props.xmlns = nsMath; 
					}
				}
	
				return createElementShape(type, props, children);
			}
		}
		// component
		else if (typeOf === 'function') {
			return createComponentShape(type, props, children);
		}
		// hoisted
		else if (type.Type) {
			return cloneElement(type, props, children);
		}
		// portal
		else if (type.nodeType !== void 0) {
			return createPortalShape(type, props || objEmpty, children);
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
			null
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
		return props ? createElement.bind(null, type, props) : createElement.bind(null, type);
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
		
		// if svg, add related svg element factory
		if (elements.svg !== void 0) {
			elements.svg = createSvgShape.bind(null, 'svg');
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
		this.forceUpdate(null);
	}
	
	
	/**
	 * update state, hoisted to avoid `for in` deopts
	 * 
	 * @param {Object} oldState
	 * @param {Object} newState
	 */
	function updateState (oldState, newState) {
		for (var name in newState) {
			oldState[name] = newState[name];
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
	
		var newNode = extractRenderNode(this);
		var oldNode = this.vnode;
	
		var newType = newNode.Type;
		var oldType = oldNode.Type;
	
		// different root node
		if (
			// node type check
			newType !== oldType || 
	
			// portal type check
			(newType === 4 && oldType === 4 && newNode !== oldNode) ||
		
			// element type checke
			newNode.type !== oldNode.type
		) {
			// render returns a promise
			if (newType === void 0) {
				return;
			}
	
			replaceRootNode(newNode, oldNode, newType, oldType, this);
		} 
		// patch node
		else {
			// text root node
			if (oldType === 3) {
				if (newNode.children !== oldNode.children) {
					oldNode.DOMNode.nodeValue = oldNode.children = newNode.children;
				}
			} 
			// element root node
			else {
				reconcileNodes(newNode, oldNode, newType, oldType);
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
	
			this.async = (
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
	
			this.async = false;
		}
	
		// assign state
		this.state = (
			this.state || 
			(this.getInitialState !== void 0 && componentDataBoundary(this, 'getInitialState', null)) || 
			{}
		);
	
		this.thrown = 0;
		this.yield = false;
		this.vnode = null;
		this.refs = null;
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
		var type = typeof shape === 'function' ? 2 : (shape.Type != null ? 1 : 0);
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
	 * @param {Error}
	 */
	function componentErrorBoundary (error, component, location) {
		if (component == null) {
			return;
		}
	
		var newNode;
		var oldNode;
		var displayName;
		var authored;
		var thrown = component.thrown;
	
		component.thrown = thrown + 1;
	
		if ((error instanceof Error) === false) {
			error = new Error(error);
		}
	
		// intial throw from render, try to recover once
		if (thrown === 0 && browser && location === 'render') {
			schedule(function () {
				component.forceUpdate(null);
			});
		}
	
		// second throw, failed to recover the first time
		if (thrown !== 0 && location === 'render') {
			return;
		}
	
		authored = typeof component.componentDidThrow === 'function';
		displayName = component.displayName || component.constructor.name;
	
		// define error
		Object.defineProperties(error, {
			silence: {value: false, writable: true},
			location: {value: location}, 
			from: {value: displayName}
		});
	
		// authored error handler
	    if (authored) {
	    	try {
	    		newNode = component.componentDidThrow(error);
	    	}
	    	catch (err) {    		
	    		// avoid recursive call stack
	    		if (thrown >= 0) {
	    			// preserve order of errors logged 
	    			schedule(function () {
	    				component.thrown = -1;
	    				componentErrorBoundary(err, component, 'componentDidThrow');
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
							'Dio bailed out of rendering an error state.\n\n'+
							'Reason: `componentDidThrow` returned an invalid element `'+ newNode.type +'`'
						);
	
	    				return;
	    			}
	
	    			newNode.type = newNode.type.replace(/ /g, '');
	    		}
	
	    		return newNode;
	    	}
	    	// async replace render node
	    	else if (browser && newNode != null && newNode !== true && newNode !== false) {
	    		schedule(function () {
	    			replaceRootNode(
	    				extractVirtualNode(newNode), 
	    				oldNode = component.vnode, 
	    				newNode.Type, 
	    				oldNode.Type, 
	    				component
					)
	    		});
	    	}
	    }
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * extract
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * extract component
	 * 
	 * @param  {VNode} subject
	 * @return {VNode} 
	 */
	function extractComponentNode (subject) {
		/** @type {Component} */
		var owner;
	
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
				props = { children: subject.children };
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
			// create component
			owner = createClass(type, props);
		}
		// class / createClass components
		else {
			owner = type;
		}
	
		// create component instance
		var component = subject.instance = new owner(props);
		
		// retrieve vnode
		var vnode = extractRenderNode(component);
	
		// if render returns a component, extract that component
		if (vnode.Type === 2) {
			vnode = extractComponentNode(vnode);
		}
		
		// if keyed, assign key to vnode
		if (props.key !== void 0 && vnode.props.key === void 0) {
			vnode.props.key = props.key;
		}
	
		// replace props and children
		subject.props    = vnode.props
		subject.children = vnode.children;
	
		// assign reference to component and return vnode
		(component.vnode = vnode).parent = subject;
	
		return vnode;
	}
	
	
	/**
	 * extract a render function
	 *
	 * @param  {Component} component
	 * @return {VNode}
	 */
	function extractRenderNode (component) {
		try {
			// async render
			if (component.async === true) {			
				if (browser) {
					component.props.then(function resolveAsyncClientComponent (props) {
						component.props = props;
						component.forceUpdate();
					}).catch(funcEmpty);
					
					component.async = false;
				}
	
				return createEmptyShape();
			}
			// generator
			else if (component.yield) {
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
			return componentErrorBoundary(error, component, 'render') || createEmptyShape();
		}
	}
	
	
	/**
	 * render to virtual node
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
		else if (subject.Type !== void 0) {
			return subject;
		}
		// portal
		else if (subject.nodeType !== void 0) {	
			return (
				subject = createPortalShape(subject, objEmpty, arrEmpty), 
				subject.Type = 5, 
				subject
			);
		}
		else {
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
						subject.then(function resolveStreamUpdates () {
							component.forceUpdate();
						}).catch(funcEmpty);
	
						return extractVirtualNode(subject(), component);
					}
					// component
					else if (subject.prototype !== void 0 && subject.prototype.render !== void 0) {
						return createComponentShape(subject, objEmpty, arrEmpty);
					}
					// function
					else {
						return extractVirtualNode(subject((component && component.props) || {}), component);
					}
				}
				// promise
				case Promise: {
					if (browser) {
						subject.then(function resolveAsyncComponent (newNode) {
							replaceRootNode(
								extractVirtualNode(newNode), 
								subject = component.vnode, 
								newNode.Type, 
								subject.Type, 
								component
							);
						}).catch(funcEmpty);
					}
					else {
						component.async = subject;
					}
	
					return createEmptyShape();
				}
			}
	
			// coroutine
			if (typeof subject.next === 'function' || (subject.prototype != null && subject.prototype.next != null)) {			
				if (subject.return == null) {
					subject = subject(component.props, component.state, component);
				}
	
				component.yield = true;
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
				) || createEmptyShape();
			}
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
				component.forceUpdate(null);
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
			return subject.Type === 2 ? extractComponentNode(subject) : subject;
		}
		else {
			return extractComponentNode(createElement(subject, null, null));
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
			if (isEventName(name)) {
				addEventListener(target, extractEventName(name), props[name], component);
			}
			else if (onlyEvents === false) {
				// add attribute
				updateProp(target, 'setAttribute', name, props[name], props.xmlns);
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
		var length = 0;
	
		// diff newProps
		for (var newName in newNode.props) { 
			var newValue = newProps[newName];
			var oldValue = oldProps[newName];
	
			if (newValue != null && oldValue !== newValue) {
				updateProp(target, 'setAttribute', newName, newValue, namespace);
				
				if (length === 0) {
					length++;
				}
			}
		}
	
		// diff oldProps
		for (var oldName in oldNode.props) { 
			var newValue = newProps[oldName];
	
			if (newValue == null) {
				updateProp(target, 'removeAttribute', oldName, '', namespace);
				
				if (length === 0) {
					length++;
				}
			}
		}
	
		if (length !== 0) {
			oldNode.props = newNode.props;
		}
	}
	
	
	/**
	 * assign/update/remove prop
	 * 
	 * @param  {Node}   target
	 * @param  {string} action
	 * @param  {string} name
	 * @param  {any}    propValue
	 * @param  {string} namespace
	 */
	function updateProp (target, action, name, propValue, namespace) {
		// avoid refs, keys, events and xmlns namespaces
		if (name === 'ref' || 
			name === 'key' || 
			name === 'children' ||
			isEventName(name) || 
			propValue === nsSvg || 
			propValue === nsMath
		) {
			return;
		}
	
		// if xlink:href set, exit, 
		if (name === 'xlink:href') {
			return (target[action + 'NS'](nsXlink, 'href', propValue), void 0);
		}
	
		var isSVG = false;
		var propName;
	
		// svg element, default to class instead of className
		if (namespace === nsSvg) {
			isSVG = true;
			propName = name === 'className' ? 'class' : name;
		}
		// html element, default to className instead of class
		else {
			propName = name === 'class' ? 'className' : name;
		}
	
		var targetProp = target[propName];
		var isDefinedValue = propValue != null && propValue !== false;
	
		// objects
		if (isDefinedValue && typeof propValue === 'object') {
			targetProp === void 0 ? target[propName] = propValue : updatePropObject(propName, propValue, targetProp);
		}
		// primitives `string | number | boolean`
		else {
			// id, className etc..
			if (targetProp !== void 0 && isSVG === false) {
				if (propName === 'style') {
					target.style.cssText = propValue;
				}
				else {
					target[propName] = propValue;
				}
			}
			// setAttribute/removeAttribute
			else {
				if (isDefinedValue) {
					// reduce value to an empty string if true, <tag checked=true> --> <tag checked>
					propValue === true && (propValue = '');
	
					target.setAttribute(propName, propValue);
				}
				else {
					// remove attributes with false/null/undefined values
					target.removeAttribute(propName);
				}
			}
		}
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
			vnode = nodeType === 2 ? extractComponentNode(subject) : subject;
		}
		
		var vnodeType = vnode.Type;	
		var children = vnode.children;
	
		if (portal === false) {
			// text		
			if (vnodeType === 3) {
				return vnode.DOMNode = subject.DOMNode = document.createTextNode(children);
			}
			// portal
			else if (vnodeType === 4 || vnodeType === 5) {
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
	
		// has a component instance
		if (instance) {
			// hydrate component instance
			component = subject.instance;
			thrown = component.thrown;
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
		}
	
		if (instance) {
			// avoid appending children if an error was thrown
			if (thrown !== 0 || thrown !== component.thrown) {
				return vnode.DOMNode = subject.DOMNode = element;
			}
	
			// hydrate
			if (component.vnode.DOMNode === null) {
				component.vnode.DOMNode = element;
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
			// refs
			if (props.ref !== void 0) {
				refs(props.ref, component, element);
			}
	
			// props and events
			assignProps(element, props, false, component);
		}
	
		// cache DOM reference
		return vnode.DOMNode = subject.DOMNode = element;
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
		if (newType === 2 && newNode.instance !== null && newNode.instance.componentWillMount) {
			componentMountBoundary(newNode.instance, 'componentWillMount', nextNode);
		}
	
		// append element
		parentNode.appendChild(nextNode);
	
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
		if (newType === 2 && newNode.instance !== null && newNode.instance.componentWillMount) {
			componentMountBoundary(newNode.instance, 'componentWillMount', nextNode);
		}
	
		// insert element
		parentNode.insertBefore(nextNode, prevNode);
	
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
		if (oldType === 2 && oldNode.instance !== null && oldNode.instance.componentWillUnmount) {
			componentMountBoundary(oldNode.instance, 'componentWillUnmount', oldNode.DOMNode);
		}
	
		// remove element
		parentNode.removeChild(oldNode.DOMNode);
	
		// clear references
		oldNode.DOMNode = null;
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
		if (oldType === 2 && oldNode.instance !== null && oldNode.instance.componentWillUnmount) {
			componentMountBoundary(oldNode.instance, 'componentWillUnmount', oldNode.DOMNode);
		}
	
		if (newType === 2 && newNode.instance !== null && newNode.instance.componentWillMount) {
			componentMountBoundary(newNode.instance, 'componentWillMount', nextNode);
		}
	
		// replace element
		parentNode.replaceChild(nextNode, oldNode.DOMNode);
		
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
	 * @param  {number}
	 * @param  {number}
	 * @param  {Component} component
	 */
	function replaceRootNode (newNode, oldNode, newType, oldType, component) {
		var key = oldNode.props.key;
		var node = oldNode.parent;
	
		// replace node
		replaceNode(
			newType, 
			oldType, 
			newNode, 
			oldNode, 
			oldNode.DOMNode.parentNode, 
			createNode(newNode, component, null)
		);
	
		// stylesheet
		if (newType !== 3 && component.stylesheet !== void 0) {
			createScopedStylesheet(component, component.constructor, newNode.DOMNode);
		}
	
		// hydrate new node
		oldNode.Type = newType;
		oldNode.type = newNode.type;
		oldNode.props = newNode.props;
		oldNode.children = newNode.children;
		oldNode.DOMNode = newNode.DOMNode;
		oldNode.instance = newNode.instance = component;
	
		node.type = component.constructor;
		node.props = newNode.props;
		node.children = newNode.children;
		node.DOMNode = newNode.DOMNode;
		node.instance = component;
	
		if (key !== void 0) {
			node.props === objEmpty ? (node.props = {key: key}) : (node.props.key = key);
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
	 * extract event name from prop
	 * 
	 * @param  {string} name
	 * @return {string}
	 */
	function extractEventName (name) {
		return name.substring(2).toLowerCase();
	}
	
	
	/**
	 * check if a name is an event-like name, i.e onclick, onClick...
	 * 
	 * @param  {string} name
	 * @return {boolean}
	 */
	function isEventName (name) {
		return name.charCodeAt(0) === 111 && name.charCodeAt(1) === 110 && name.length > 3;
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
	 * @param {Object<string, any>[2]} keys
	 * @param {Node}                   parentNode
	 * @param {VNode}                  newNode
	 * @param {VNode}                  oldNode
	 * @param {number}                 newLength
	 * @param {number}                 oldLength
	 * @param {number}                 pos
	 */
	function reconcileKeys (keys, parentNode, newNode, oldNode, newLength, oldLength, pos) {
		var reconciled = new Array(newLength);
		var childNodes = parentNode.childNodes;
	
		// children
		var newChildren = newNode.children;
		var oldChildren = oldNode.children;
	
		// keys
		var newKeys = keys[0];
		var oldKeys = keys[1];
	
		// position
		var inserted = 0;
		var added = 0;
		var removed = 0;
		var i = 0;
		var index = 0;
	
		// VNodes
		var newChild;
		var oldChild;
	
		// DOMNodes
		var nextNode;
		var prevNode;
	
		// signatures
		var nodeType;
	
		// hydrate clean nodes
		if (pos !== 0) {
			for (var i = 0; i < pos; i++) {
				reconciled[i] = oldChildren[i];
			}
		}
	
		// old children
		for (var i = pos; i < oldLength; i++) {
			oldChild = oldChildren[i];
			newChild = newKeys[oldChild.key];
	
			// removed
			if (newChild === void 0) {
				removeNode(oldChild.Type, oldChild, parentNode);
				removed++;
			}
	
			// update forward indexes
			if (removed !== 0) {
				oldChild.index -= removed;
			}
		}
	
		oldLength -= removed;
	
		// new children
		for (var i = pos; i < newLength; i++) {
			newChild = newChildren[i];
			oldChild = oldKeys[newChild.key];
	
			// new
			if (oldChild === void 0) {
				nodeType = newChild.Type;
				nextNode = createNode(newChild, null, null);
	
				// insert
				if (i < oldLength + added) {
					oldChild = oldChildren[i - added];
					prevNode = oldChild.DOMNode;
	
					insertNode(nodeType, newChild, prevNode, parentNode, nextNode);
	
					// update forward indexes
					oldChild.index += ++inserted;
				} 
				// append
				else {
					appendNode(nodeType, newChild, parentNode, nextNode);
				}
	
				added++;
	
				reconciled[i] = newChild;
			}
			// old
			else {
				index = oldChild.index;
	
				// moved
				if (index !== i) {
					if (newChild.key !== oldChildren[i - added].key) {
						prevNode = childNodes[i];
						nextNode = oldChild.DOMNode;
	
						if (prevNode !== nextNode) {
							parentNode.insertBefore(nextNode, prevNode);
						}
					}
				}
	
				reconciled[i] = oldChild;
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
		var currentNode = newNodeType === 2 ? extractComponentNode(newNode) : newNode;
	
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
				oldNode.DOMNode.textContent = '';
				oldNode.children = newChildren;
			}
		}
		// has children
		else {
			// new node has children
			var parentNode = oldNode.DOMNode;
	
			// when keyed, the position that dirty keys begin
			var pos = 0;
	
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
				// avoid accessing out of bounds index and nodeType where unnecessary
				newType = i < newLength ? (newChild = newChildren[i]).Type : (newChild = nodeEmpty, 0);
				oldType = i < oldLength ? (oldChild = oldChildren[i]).Type : (oldChild = nodeEmpty, 0);
	
				if (keyed) {
					// push keys
					if (newType !== 0) {
						newKeys[newKey = newChild.props.key] = (
							newChild.index = i, 
							newChild.key = newKey, 
							newChild
						);
					}
	
					if (oldType !== 0) {
						oldKeys[oldKey = oldChild.props.key] = (
							oldChild.index = i, 
							oldChild.key = oldKey, 
							oldChild
						);
					}
				}
				// remove
				else if (newType === 0) {
					oldLength--;
	
					removeNode(oldType, oldChildren.pop(), parentNode);
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
				else if ((newKey = newChild.props.key) !== (oldKey = oldChild.props.key)) {
					keyed = true; 
					pos = i;
					oldKeys = {}; 
					newKeys = {};
	
					// push keys
					newKeys[newKey] = (newChild.index = i, newChild.key = newKey, newChild);
					oldKeys[oldKey] = (oldChild.index = i, oldChild.key = oldKey, oldChild);
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
				// new and old keys object are of differing shapes
				reconcileKeys([newKeys, oldKeys], parentNode, newNode, oldNode, newLength, oldLength, pos);
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
		var newNode = subject.Type === 2 ? extractComponentNode(subject) : subject;
		
		var nodeType = newNode.Type;
		var type = newNode.type;
	
		var childNodes = parent.childNodes;
		var element = childNodes[index];
		var nodeName = element.nodeName;
	
		// DOMNode does not match vnode
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
				(component = subject.instance).vnode.DOMNode = parent;
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
				// refs
				if (props.ref !== void 0) {
					refs(props.ref, component, element);
				}
	
				// events
				assignProps(element, props, true, component);
			}
	
			// hydrate the dom element to the virtual node
			subject.DOMNode = element;
		}
		// textNode
		else if (nodeType === 3) {
			children = parentNode.children;
			length = children.length;
	
			// when we reach a string child that is followed by a string child, 
			// it is assumed that the dom representing it is a single textNode
			// case in point h('h1', 'Hello', 'World') output: <h1>HelloWorld</h1>
			// HelloWorld is one textNode in the DOM but two in the VNode
			if (length > 1 && (children[index + 1] || nodeEmpty).Type === 3) {			
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
					this.push(escape(subject.children)); 
	
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
						vnode = extractComponentNode(subject);
	
						// pending async component
						if ((component = subject.instance).async !== false) {
							promise = component.async !== true;
	
							(promise ? component.async : component.props)
								.then(function resolveAsyncServerComponent (data) {								
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
	
							component.async = false;
	
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
	
					return
				}
	
				var opening = '';
				var closing = '';
	
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
			else if (subject.Type === void 0) {
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
		var propsString = '';
		var props = vnode.props;
	
		// construct props string
		if (props !== objEmpty) {
			for (var name in props) {
				var value = props[name];
	
				// value --> <type name=value>, exclude props with undefined/null/false as values
				if (value != null && value !== false) {
					var type = typeof value;
	
					// props to avoid
					if (
						name !== 'key' && 
						name !== 'ref' && 
						name !== 'children' &&
						name !== 'innerHTML' &&
						name !== 'innerText' &&
						type !== 'function' &&
						isEventName(name) === false
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
							if (name === 'className') { 
								name = 'class'; 
							}
	
							// if falsey/truefy checkbox=true ---> <type checkbox>
							propsString += ' ' + (value === true ? name : name + '="' + value + '"');
						}
						// style objects
						else {
							var styles = '';
	
							for (name in value) {
								var property = value[name];
	
								// if camelCase convert to dash-case 
								// i.e marginTop --> margin-top
								if (name !== name.toLowerCase()) {
									name = name.replace(regStyleCamel, '$1-').replace(regStyleVendor, '-$1').toLowerCase();
								}
	
								styles += name + ':' + property + ';';
							}
	
							propsString += name + '="' + property + '"';
						}
					}
				}
			}
		}
	
		return propsString;
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
			return escape(subject.children);
		}
	
		var vnode;
	
		// if component
		if (nodeType === 2) {
			// if cached
			if (subject.type.HTMLCache !== void 0) {
				return subject.type.HTMLCache;
			} 
			else {
				vnode = extractComponentNode(subject);
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
		var chain = { then: null, catch: null };
	
		// .then/.catch listeners
		var listeners = { then: [], catch: [] };
	
		// predetermine if a middlware was passed
		var hasMiddleware = middleware != null;
	
		// predetermine if the middlware passed is a function
		var middlewareFunc = hasMiddleware && typeof middleware === 'function';
	
		function Stream (value) {
			// received value, update stream
			if (arguments.length !== 0) {
				store = value;
				
				schedule(function () {
					dispatch('then', store);
				});
	
				return Stream;
			}
			else {
				// if you pass a middleware function i.e a = stream(1, String)
				// the stream will return 1 processed through String
				// if you pass a boolean primitive the assumtion is made that the store
				// is a function and that it should return the functions return value
				if (hasMiddleware) {
					return middlewareFunc ? middleware(store) : store();
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
	
		// resolve value
		function resolve (value) {
			return Stream(value); 
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
	
			return end === null ? Stream : void 0;
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
				resolve(function () { return callback(Stream()); });
			}, true);
		}
	
		// end/reset a stream
		function end (value) {
			value !== void 0 && (store = value);
	
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
		Stream.then = then;
		Stream.done = done;
		Stream.catch = error;
		Stream.map = map;
		Stream.end = end;
		Stream.valueOf = valueOf;
		Stream.toJSON = toJSON;
		Stream.resolve = resolve;
		Stream.reject = reject;
		Stream.pause = pause;
		Stream.resume = resume;
	
		// signature
		Stream.isStream = true;
	
		// acts like a promise if a function is passed as value
		typeof value === 'function' ? value(resolve, reject) : Stream(value);
	
		return Stream;
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
		var data = null; 
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
	
		(!status || status >= 400) ? reject(xhr) : resolve(body);
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
		var arr = [];
	
		for (var key in object) {
			var value = object[key];
			var prefixed = prefix !== void 0 ? prefix + '[' + key + ']' : key;
	
			// recursive serialize
			if (typeof value == 'object') {
				arr[arr.length] = serialize(value, prefixed);
			}
			// serialize
			else {
				arr[arr.length] = encodeURIComponent(prefixed) + '=' + encodeURIComponent(value);
			}
		}
	
		return arr.join('&');
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
					callback: { value: callback, },
					pattern:  { value: new RegExp(directory + pattern + '$'), },
					params:   { value: params, }
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
				}, null) || {uri: current};
	
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
	
		// state listening if browser enviroment
		if (browser) {
			listen();
		}
	
		// initialiser, if function pass api as args, else string, navigate to uri
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
			return function (a) { return a; }
		}
		else {
			// list of functions to compose
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
	
			for (var i = 0; i < length; i++) {
				var key = keys[i]; 
	
				nextState[key] = reducers[key](state[key], action);
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
			for (var i = 0, length = listeners.length; i < length; i++) {
				listeners[i](currentState);
			}
	
			return action;
		}
	
		// subscribe to a store
		function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw 'listener should be a function';
			}
	
			// retrieve index position
			var index = listeners.length;
	
			// append listener
			listeners[index] = listener;
	
			// return unsubscribe function
			return function unsubscribe () {
				// for each listener
				for (var i = 0, length = listeners.length; i < length; i++) {
					// if currentListener === listener, remove
					if (listeners[i] === listener) {
						listeners.splice(i, 1);
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