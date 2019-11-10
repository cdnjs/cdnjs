/*
 *  ___ __ __  
 * (   (  /  \ 
 *  ) ) )( () )
 * (___(__\__/ 
 * 
 * dio is a fast javascript framework for building applications.
 * 
 * @licence MIT
 */
(function (factory) {
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory(global);
	} else if (typeof define === 'function' && define.amd) {
		define(factory(window));
	} else {
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
	var version = '5.0.5';
	
	// enviroment variables
	var document = window.document || null;
	var browser = document !== null;
	var server = browser === false;
	
	// namespaces
	var nsStyle = 'data-scope';
	var nsMath  = 'http://www.w3.org/1998/Math/MathML';
	var nsXlink = 'http://www.w3.org/1999/xlink';
	var nsSvg = 'http://www.w3.org/2000/svg';
	
	// empty shapes
	var objEmpty = Object.create(null);
	var arrEmpty = [];
	var nodEmpty = VNode(0, '', objEmpty, arrEmpty, null, null, null);
	
	
	// ssr
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
		return String(subject).replace(regEsc, unicoder);
	}
	
	
	/**
	 * unicoder, escape => () helper
	 * 
	 * @param  {string} char
	 * @return {string}
	 */
	function unicoder (char) {
		return uniCodes[char] || char;
	}
	
	
	/**
	 * for in proxy
	 * 
	 * @param  {Object<string, any>} obj
	 * @param  {function(any, string)} func
	 */
	function each (obj, func) {
		for (var name in obj) {
			func(obj[name], name);
		}
	}
	
	
	/**
	 * try catch helper
	 * 
	 * @param  {function}  func
	 * @param  {function=} error
	 * @param  {any=}      value
	 * @return {any}
	 */
	function tryCatch (func, error, value) {
		try {
			return value != null ? func(value) : func();
		} catch (e) {
			return error && error(e);
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
	 * element shape
	 *
	 * @public
	 * 
	 * @param  {string}               type
	 * @param  {Object<string, any>=} props
	 * @param  {VNode[]=}             children
	 * @return {VNode}
	 */
	function VElement (type, props, children) {
		return {
			nodeType: 1, 
			type: type, 
			props: (props || objEmpty), 
			children: (children || []), 
			DOMNode: null,
			instance: null,
			index: null
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
	function VComponent (type, props, children) {
		return {
			nodeType: 2, 
			type: type, 
			props: (props || objEmpty), 
			children: (children || arrEmpty),
			DOMNode: null,
			instance: null,
			index: null
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
	function VFragment (children) {
		return {
			nodeType: 11, 
			type: '@', 
			props: objEmpty, 
			children: children,
			DOMNode: null,
			instance: null,
			index: null
		};
	}
	
	
	/**
	 * text shape
	 *
	 * @public
	 * 
	 * @param  {(string|boolean|number)} text
	 * @return {VNode}
	 */
	function VText (text) {
		return {
			nodeType: 3, 
			type: 'text', 
			props: objEmpty, 
			children: text, 
			DOMNode: null,
			instance: null,
			index: null
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
	function VSvg (type, props, children) {
		return {
			nodeType: 1, 
			type: type, 
			props: (props = props || {}, props.xmlns = nsSvg, props), 
			children: (children || []),
			DOMNode: null,
			instance: null,
			index: null
		};
	}
	
	
	/**
	 * VNode shape
	 *
	 * @param  {number}                      nodeType
	 * @param  {(string|function|Component)} type
	 * @param  {Object<string, any>}         props
	 * @param  {VNode[]}                     children
	 * @param  {Node}                        DOMNode
	 * @param  {Component}                   instance
	 * @param  {number}                      index
	 * @return {VNode}
	 */
	function VNode (nodeType, type, props, children, DOMNode, instance, index) {
		return {
			nodeType: nodeType,
			type: type,
			props: props,
			children: children,
			DOMNode: DOMNode,
			instance: instance,
			index: index
		};
	}
	
	
	/**
	 * empty shape
	 * 
	 * @return {VNode}
	 */
	function VEmpty () {
		return {
			nodeType: 1, 
			type: 'noscript', 
			props: objEmpty, 
			children: [], 
			DOMNode: null,
			instance: null,
			index: null
		};
	}
	
	
	/**
	 * request shape
	 * 
	 * @param {string}           method
	 * @param {string}           url
	 * @param {(string|Object)=} payload
	 * @param {string=}          enctype
	 * @param {string=}          responseType
	 */
	function VRequest (method, url, payload, enctype, responseType) {
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
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * stylesheet
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * stylesheet
	 * 
	 * @param  {Component}       component
	 * @param  {function}        constructor
	 * @param  {boolean}         inject
	 * @return {function(?Node)}
	 */
	function stylesheet (component, constructor, inject) {
		var namespace = component.displayName || constructor.name;
		var selector  = '['+nsStyle+'='+namespace+']';
		var css       = component.stylesheet();
		var output    = stylis(selector, css, true, null);
	
		if (browser && inject) {
			// obscure namesapce to avoid id/global namespace conflicts
			var id = '\''+namespace+'\'';
	
			// prevent duplicate styles, this also works with SSR
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
			if (DOMNode === null) {
				return output;			
			} else {
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
	 * @example compiler('.class1', 'css...', false);
	 * 
	 * @param  {string}       selector   - i.e `.class` or `#id` or `[attr=id]`
	 * @param  {string}       styles
	 * @param  {boolean=}     animations - pass false to prevent prefixing animations, true by default
	 * @param  {function(4)=} middleware
	 * @return {string}
	 */
	function stylis (selector, styles, animations, middleware) {
	    var prefix = '';
	    var namespace = '';
	    var type = selector.charCodeAt(0) || 0;
	
	    // [ attr selector
	    if (type === 91) {
	        // `[data-id=namespace]` -> ['data-id', 'namespace']
	        var attr = selector.substring(1, selector.length-1).split('=');
	        var char = (namespace = attr[1]).charCodeAt(0);
	
	        // [data-id="namespace"]/[data-id='namespace']
	        // --> "namespace"/'namspace' -> namespace
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
	
	    // animation and keyframe namespace
	    var animns = (animations === void 0 || animations === true) ? namespace : '';
	
	    // has middleware
	    var plugin = middleware != null && typeof middleware === 'function';
	
	    // variables, i.e $a = 1;
	    var vars;
	
	    // mixins
	    var mixins;
	    var mixin;
	
	    // buffers
	    var buff = '';
	    var blob = '';
	    var prev = '';
	    var flat = '';
	    var blck = '';
	    var indexOf = 0;
	
	    // positions
	    var caret = 0;
	    var depth = 0;
	    var column = 0;
	    var line = 1;
	    var eof = styles.length;
	
	    // context signatures
	    var special = 0;
	    var type = 0;
	    var close = 0;
	    var comment = 0;
	    var strings = 0;
	
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
	
	            // middleware
	            plugin && (buff = middleware(0, buff, line, column) || buff);
	
	            // ignore comments
	            if (comment === 2) {
	                code === 125 && (comment = 0);
	                buff = ''; 
	            }
	            // @, special block
	            else if (first === 64) {
	                // @keyframe/@global, `k` or @global, `g` character
	                if (second === 107 || second === 103) {
	                    // k, @keyframes
	                    if (second === 107) {
	                        blob = buff.substring(1, 11) + animns + buff.substring(11);
	                        buff = '@-webkit-'+blob;
	                        type = 1;
	                    }
	                    // g, @global
	                    else {
	                        buff = '';
	                    }
	                }
	                // @media/@mixin `m` character
	                else if (second === 109) {
	                    if (third === 105) {
	                        // first match create mixin store
	                        mixins === void 0 && (mixins = {});
	
	                        // retrieve mixin identifier
	                        blob = (mixin = buff.substring(7, buff.indexOf('{')) + ' ').trim();
	
	                        // cache current mixin name
	                        mixin = mixin.substring(0, mixin.indexOf(' ')).trim();
	
	                        // append mixin identifier
	                        mixins[mixin] = { key: blob.trim(), body: null };
	
	                        type = 3;
	                        buff = '';
	                        blob = '';
	                    }
	                    // @media
	                    else {
	                        type = 2;
	                    }
	                }
	
	                // @include/@import `i` character
	                if (second === 105) {
	                    // @include `n` character
	                    if (third === 110) {
	                        buff = buff.substring(9, buff.length-1);
	
	                        indexOf = buff.indexOf('(');
	
	                        // function mixins
	                        if (indexOf > -1) {
	                            // mixin name
	                            var name = buff.substring(0, indexOf);
	
	                            // mixin data
	                            var data = mixins[name];
	
	                            // args passed to the mixin
	                            var argsPassed = buff.substring(name.length+1, buff.length-1).split(',');
	
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
	                    else if (third === 109 && plugin) {
	                        // avoid "foo.css"; "foo" screen; "http://foo.com/bar"; url(foo);
	                        var match = /@import.*?(["'][^\.\n\r]*?["'];|["'].*\.scss["'])/g.exec(buff);                    
	
	                        if (match !== null) {
	                            // middleware
	                            buff = middleware(3, match[1].replace(/['"; ]/g, ''), line, column) || '';
	
	                            if (buff) {
	                                // create block and update styles length
	                                styles += buff;
	                                eof += buff.length;
	                            }
	
	                            buff = '';
	                        }
	                    }
	                } else {
	                    close = -1;
	                    special++;
	                }
	            }
	            // ~, ; variables
	            else if (code === 59 && first === 126 && second === 126) {
	                var colon = buff.indexOf(':');
	
	                // first match create variables store 
	                vars === void 0 && (vars = []);
	
	                // push key value pair
	                vars[vars.length] = [buff.substring(0, colon), buff.substring(colon+1, buff.length-1).trim()];
	
	                // reset buffer
	                buff = '';
	            }
	            // property/selector
	            else {
	                // animation: a, n, i characters
	                if (first === 97 && second === 110 && third === 105) {
	                    // removes ;
	                    buff = buff.substring(0, buff.length-1);
	
	                    // position of :
	                    var colon = buff.indexOf(':')+1;
	
	                    // left hand side everything before `:`
	                    var build = buff.substring(0, colon);
	
	                    // right hand side everything after `:` /* @type string[] */
	                    var anims = buff.substring(colon).trim().split(',');
	
	                    // - short hand animation syntax
	                    if ((buff.charCodeAt(9) || 0) !== 45) {
	                        // because we can have multiple animations `animation: slide 4s, slideOut 2s`
	                        for (var j = 0, length = anims.length; j < length; j++) {
	                            var anim = anims[j];
	                            var props = anim.split(' ');
	
	                            // since we can't be sure of the position of the name of the animation name
	                            // we have to find it
	                            for (var k = 0, l = props.length; k < l; k++) {
	                                var prop = props[k].trim();
	                                var frst = prop.charCodeAt(0);
	                                var third = prop.charCodeAt(2);
	                                var slen = prop.length;
	                                var last = prop.charCodeAt(slen-1);
	
	                                // animation name is anything not in this list
	                                if (
	                                    // cubic-bezier()
	                                    !(frst === 99 && last === 41) &&
	
	                                    // infinite, i, f, e
	                                    !(frst === 105 && third === 102 && last === 101 && slen === 8) &&
	
	                                    // linear, l, n, r
	                                    !(frst === 108 && third === 110 && last === 114 && slen === 6) &&
	
	                                    // alternate, a, t, e
	                                    !(frst === 97 && third === 116 && last === 101 && slen === 9) &&
	
	                                    // normal, n, r, l
	                                    !(frst === 110 && third === 114 && last === 108 && slen === 6) &&
	
	                                    // backwords, b, c, s
	                                    !(frst === 98 && third === 99 && last === 115 && slen === 9) &&
	
	                                    // forwards, f, r, s
	                                    !(frst === 102 && third === 114 && last === 115 && slen === 8) &&
	
	                                    // both, b, t, h
	                                    !(frst === 98 && third === 116 && last === 104 && slen === 4) &&
	
	                                    // none, n, n, e
	                                    !(frst === 110 && third === 110 && last === 101 && slen === 4)&&
	
	                                    // ease, e, s, e
	                                    !(frst === 101 && third === 115 && last === 101 && slen === 4) &&
	
	                                    // ease-
	                                    !(frst === 101 && slen > 4 && prop.charCodeAt(4) === 45) &&
	
	                                    // 0.4ms, .4s, 400ms ...
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
	                    buff = '-webkit-' + build + ';' + build + ';';
	                }
	                // appearance: a, p, p
	                else if (first === 97 && second === 112 && third === 112) {
	                    // vendor prefix -webkit- and -moz-
	                    buff = '-webkit-' + buff + '-moz-' + buff + buff;
	                }
	                // hyphens: h, y, p
	                // user-select: u, s, e
	                else if (
	                    (first === 104 && second === 121 && third === 112) ||
	                    (first === 117 && second === 115 && third === 101)
	                ) {
	                    // vendor prefix all
	                    buff = '-webkit-' + buff + '-moz-' + buff + '-ms-' + buff + buff;
	                }
	                // flex: f, l, e
	                // order: o, r, d
	                else if (
	                    (first === 102 && second === 108 && third === 101) ||
	                    (first === 111 && second === 114 && third === 100)
	                ) {
	                    // vendor prefix only -webkit-
	                    buff = '-webkit-' + buff + buff;
	                }
	                // transforms & transitions: t, r, a 
	                else if (first === 116 && second === 114 && third === 97) {
	                    // vendor prefix -webkit- and -ms- if transform
	                    buff = '-webkit-' + buff + (buff.charCodeAt(5) === 102 ? '-ms-' + buff : '') + buff;
	                }
	                // display: d, i, s
	                else if (first === 100 && second === 105 && third === 115) {
	                    if (buff.indexOf('flex') > -1) {
	                        // vendor prefix
	                        buff = 'display:-webkit-flex; display:flex;';
	                    }
	                }
	                // { character, selector declaration
	                else if (code === 123) {
	                    depth++;
	
	                    if (special === 0 || type === 2) {
	                        // nested selector
	                        if (depth === 2) {
	                            // discard first character {
	                            caret++;
	
	                            // inner content of block
	                            var inner   = '';
	                            var nestSel = buff.substring(0, buff.length-1).split(',');
	                            var prevSel = prev.substring(0, prev.length-1).split(',');
	
	                            // keep track of opening `{` and `}` occurrences
	                            var closed = 1;
	
	                            // travel to the end of the block
	                            while (caret < eof) {
	                                var char = styles.charCodeAt(caret);
	
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
	                            for (var j = 0, length = prevSel.length; j < length; j++) {
	                                // extract value, prep index for reuse
	                                var val = prevSel[j]; prevSel[j] = '';
	
	                                // since there can also be multiple nested selectors
	                                for (var k = 0, l = nestSel.length; k < l; k++) {
	                                    prevSel[j] += (
	                                        (val.replace(prefix, '').trim() + ' ' + nestSel[k].trim()).trim() + 
	                                        (k === l-1  ? '' : ',')
	                                    );
	                                }
	                            }
	
	                            // create block and update styles length
	                            // the `new line` is to avoid conflicts when the last line is a // line comment
	                            eof += (styles += ('\n' + prevSel.join(',') + ' {'+inner+'}').replace(/&| +&/g, '')).length;
	
	                            // clear current line, to avoid adding nested blocks to the normal flow
	                            buff = '';
	
	                            // decreament depth
	                            depth--;
	                        }
	                        // top-level selector
	                        else {
	                            var split = buff.split(',');
	                            var build = '';
	
	                            // prefix multiple selectors with namesapces
	                            // @example h1, h2, h3 --> [namespace] h1, [namespace] h1, ....
	                            for (var j = 0, length = split.length; j < length; j++) {
	                                var selector = split[j];
	                                var firstChar = selector.charCodeAt(0);
	
	                                // ` `, trim if first char is space
	                                if (firstChar === 32) {
	                                    firstChar = (selector = selector.trim()).charCodeAt(0);
	                                }
	
	                                // [, [title="a,b,..."]
	                                if (firstChar === 91) {
	                                    for (var k = j+1, l = length-j; k < l; k++) {
	                                        var broken = (selector += ',' + split[k]).trim();
	
	                                        // ]
	                                        if (broken.charCodeAt(broken.length-1) === 93) {
	                                            length -= k;
	                                            split.splice(j, k);
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
	                                // :
	                                else if (firstChar === 58) {
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
	                                            // before: `-context(selector)`
	                                            selector = selector.substring(9, selector.indexOf(')')) + ' ' + prefix + ' {';
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
	                                        selector = selector.substring(8).replace(')', '');
	                                        // after: selector
	                                    }
	                                    // :hover, :active, :focus, etc...
	                                    else {
	                                        selector = prefix + selector;
	                                    }
	                                }
	                                else {
	                                    selector = prefix + ' ' + selector;
	                                }
	
	                                // if first selector do not prefix with `,`
	                                build += j === 0 ? selector : ',' + selector;
	                            }
	
	                            // cache current selector
	                            prev = (buff = build);
	                        }
	                    }
	                }
	                // } character
	                else if (code === 125 && depth !== 0) {
	                    depth--;
	                }
	
	                // @global/@keyframes
	                if (special !== 0) {
	                    // find the closing tag
	                    code === 125 ? close++ : (code === 123 && close !== 0 && close--);
	
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
	                        // @media
	                        else if (type === 2) {
	                            blob.length !== 0 && (buff = prefix + ' {'+blob+'}' + buff);
	
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
	                    else if (type === 2 && depth === 0 && code !== 125) {
	                        blob += buff;
	                        buff = '';
	                    }
	                }
	                // flat context
	                else if (depth === 0 && code !== 125) {
	                    flat += buff;
	                    buff = '';
	                }
	            }
	
	            // append line to blck buffer
	            blck += buff;
	
	            // reset line buffer
	            buff = '';
	
	            // add blck buffer to output
	            if (code === 125 && type === 0 && comment === 0) {
	                // remove empty blocks
	                if (blck.charCodeAt(blck.length-2) === 123) {
	                    blck = '';
	                } else {
	                    // middleware
	                    plugin && blck.length !== 0 && (blck = middleware(1, blck, line, column) || blck);
	                }
	
	                // append blck buffer
	                output += blck;
	
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
	
	    // has flat css, since flat css can appear any where we add them last
	    if (flat.length !== 0) {
	        flat = prefix + ' {' + flat + '}';
	
	        // middleware
	        plugin && (flat = middleware(2, flat, line, column) || flat);
	
	        // append flat css
	        output += flat;
	    }
	
	    // has variables
	    if (vars !== void 0) {
	        // replace all variables
	        for (var i = 0, l = vars.length; i < l; i++) {
	            output = output.replace(new RegExp('var\\('+vars[i][0]+'\\)', 'g'), vars[i][1]);
	        }
	    }
	
	    return output;
	}
	
	
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
		var length   = arguments.length;
		var children = [];
		var position = 2;
	
		// if props is not a normal object
		if (props == null || props.nodeType !== void 0 || props.constructor !== Object) {
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
					} else {
						index = createChild(child, children, index);
					}
				}
			}
		}
	
		// if type is a function, create component VNode
		if (typeof type === 'function') {
			return VComponent(type, props, children);
		} 
		else if (type === '@') {
			return VFragment(children);
		} 
		else {
			if (props === null) {
				props = {};
			}
	
			// if props.xmlns is undefined and type === 'svg' or 'math' 
			// assign svg && math namespaces to props.xmlns
			if (props.xmlns === void 0) {	
				if (type === 'svg') { 
					props.xmlns = nsSvg; 
				} else if (type === 'math') { 
					props.xmlns = nsMath; 
				}
			}
	
			return VElement(type, props, children);
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
			if (child.nodeType !== void 0) {
				// Element
				children[index++] = child;
			} else {
				var type = typeof child;
	
				if (type === 'function') {
					// Component
					children[index++] = VComponent(child, null, null);
				} else if (type === 'object') {
					// Array
					for (var i = 0, len = child.length; i < len; i++) {
						index = createChild(child[i], children, index);
					}
				} else {
					// Text
					children[index++] = VText(type !== 'boolean' ? child : '');
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
		var type     = subject.type;
		var props    = newProps || {};
		var children = newChildren || subject.children;
	
		// copy old props
		each(subject.props, function (value, name) {
			if (props[name] === void 0) {
				props[name] = value;
			}
		});
	
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
	
		return createElement(type, props, children);
	}
	
	
	/**
	 * clone virtual node
	 * 
	 * @param  {VNode} subject
	 * @return {VNode}
	 */
	function cloneNode (subject) {
		return VNode(
			subject.nodeType,
			subject.type,
			subject.props,
			subject.children,
			subject.DOMNode,
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
		return subject != null && subject.nodeType != null;
	}
	
	
	/**
	 * DOM factory, create VNode factories
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
			elements[types[i]] = VElement.bind(null, types[i]);
		}
		
		// if svg, add related svg element factories
		elements.svg !== void 0 && (elements.svg = VSvg.bind(null, 'svg'));
	
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
		if (this.shouldComponentUpdate !== void 0 && this.shouldComponentUpdate(this.props, newState) === false) {
			return;
		}
	
		// update state
		updateState(this.state, newState);
	
		// update component
		this.forceUpdate(callback || null);
	}
	
	
	/**
	 * update state, hoisted to avoid `for in` deopts
	 * 
	 * @param  {Object} state
	 * @param  {Object} newState
	 */
	function updateState (state, newState) {
		for (var name in newState) {
			state[name] = newState[name];
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
			this.componentWillUpdate(this.props, this.state);
		}
	
		var newNode = extractRender(this);
		var oldNode = this.VNode;
	
		// component returns a different root node
		if (newNode.type !== oldNode.type) {		
			// replace node
			replaceNode(newNode, oldNode, oldNode.DOMNode.parentNode, createNode(newNode, null, null));
	
			// hydrate newNode
			oldNode.nodeType = newNode.nodeType;
			oldNode.type     = newNode.type;
			oldNode.props    = newNode.props;
			oldNode.children = newNode.children;
			oldNode.DOMNode  = newNode.DOMNode;
			newNode.instance = oldNode.instance;
		} else {
			// patch node
			patchNodes(newNode, oldNode, newNode.nodeType, oldNode.nodeType);
		}
	
		if (this.componentDidUpdate !== void 0) {
			this.componentDidUpdate(this.props, this.state);
		}
	
		// if callback function call with the component as `this` context
		if (callback != null && typeof callback === 'function') {
			callback.call(this);
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
			this.props = this.getInitialProps(props) || {};
		}
		// assign props
		else if (props !== objEmpty) {
			// hydrate default props
			if (this.getDefaultProps !== void 0) {
				assignDefaultProps(this.getDefaultProps(), props);
			}
			
			if (this.componentWillReceiveProps !== void 0) {
				this.componentWillReceiveProps(props);
			}
	
			this.props = props;
		} 
		// default props
		else {
			this.props = this.props || (this.getDefaultProps && this.getDefaultProps()) || {};
		}
	
		// assign state
		this.state = this.state || (this.getInitialState && this.getInitialState()) || {};
	
		// VNode and refs
		this.refs = this.VNode = null;
	}
	
	
	/**
	 * Component prototype
	 * 
	 * @type {Object<string, function>}
	 */
	Component.prototype = Object.create(null, {
		setState:    { value: setState },
		forceUpdate: { value: forceUpdate }
	});
	
	
	/**
	 * create class
	 *
	 * @public
	 * 
	 * @param  {(Object<string, any>|function(createElement): (Object<string, any>|function))} subject
	 * @return {function(new:Component, Object<string, any>)}
	 */
	function createClass (subject) {
		// component cache
		if (subject.COMPCache !== void 0) {
			return subject.COMPCache;
		}
	
		// is function?
		var func = typeof subject === 'function';
	
		// extract shape of component
		var shape = func ? subject(createElement) : subject;
		var constructor = false;
		var render;
	
		if (shape.nodeType !== void 0 || typeof shape === 'function') {
			// render function
			render = shape.nodeType !== void 0 ? subject : shape;
			shape = { render: render };
		}
		else {
			// register that the shape has a constructor method
			constructor = shape.hasOwnProperty('constructor');
		}
	
		// create component class
		function component (props) {
			// constructor
			if (constructor) {
				this.constructor(props);
			}
	
			// extend Component
			Component.call(this, props); 
		}
	
		// inherit shape properties
		component.prototype = shape;
	
		// inherit Component methods
		shape.setState = Component.prototype.setState;
		shape.forceUpdate = Component.prototype.forceUpdate;
	
		// function shape, cache component
		if (func) {
			subject.COMPCache = component;
		}
	
		// stylesheet namespaced
		if (shape.stylesheet !== void 0) {
			// function name / displayName / random string
			shape.displayName = (func ? subject.name : shape.displayName) || ((Math.random()+1).toString(36).substr(2, 5));
		}
	
		return (component.constructor = Component, component);
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
		var component;	
		var vnode;
		var element;
		
		// renderer
		function renderer (props) {
			if (initial) {
				// dispatch mount
				appendNode(vnode, element, createNode(vnode, null, null));
	
				// register mount has been dispatched
				initial = false;
	
				// assign component instance
				component = vnode.instance;
			} else {
				// update props
				if (props !== void 0) {
					if (component.shouldComponentUpdate !== void 0 && 
						component.shouldComponentUpdate(props, component.state) === false
					) {
						return renderer;
					}
	
					component.props = props;
				}
	
				// update component
				component.forceUpdate(null);
			}
	
			return renderer;
		}
	
		// exit early
		if (server) {
			return renderer;
		}
	
		// Object
		if (subject.render !== void 0) {
			vnode = VComponent(createClass(subject));
		}
		// array/Component/function
		else if (subject.nodeType === void 0) {
			vnode = subject.constructor === Array ? createElement('@', null, subject) : VComponent(subject);
		} 
		// VElement/VSvg
		else if (subject.nodeType !== 2) {
			vnode = VComponent(createClass({ render: function () { return subject; } }))
		}
		// VComponent
		else {
			vnode = subject;
		}
	
		// dom element
	  	if (target != null && target.nodeType != null) {
	  		// target is a dom element
	  		element = target === document ? docuemnt.body : target;
		} else {
	  		// selector
	  		target = document.querySelector(target);
	
	  		// default to document.body if no match/document
	  		element = (target === null || target === document) ? document.body : target;
		}
	
		// hydration
		if (hydration === true) {
			// dispatch hydration
			hydrate(element, vnode, 0, nodEmpty, null);
	
			// register mount has been dispatched
			initial = false;
	
			// assign component
			component = vnode.instance;
		} else {
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
			return subject.nodeType === 2 ? extractComponent(subject) : subject;
		} else {
			return extractComponent(createElement(subject, null, null));
		}
	}
	
	
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
		} else {
			(component.refs = component.refs || {})[ref] = element;
		}
	}
	
	
	/**
	 * patch keyed nodes
	 *
	 * @param {Object<string, any>[2]} keys
	 * @param {Node}                   parentNode
	 * @param {VNode}                  newNode
	 * @param {VNode}                  oldNode
	 * @param {number}                 newLength
	 * @param {number}                 oldLength
	 * @param {number}                 pos
	 */
	function patchKeys (keys, parentNode, newNode, oldNode, newLength, oldLength, pos) {
		var reconciled = new Array(newLen);
		var childNodes = parentNode.childNodes;
	
		// children
		var newChildren = newNode.children;
		var oldChildren = oldNode.children;
	
		var length = oldChildren.length;
	
		// keys
		var newKeys = keys[0];
		var oldKeys = keys[1];
	
		// book keeping
		var delOffset = 0;
		var addOffset = 0;
	
		// hydrate clean nodes
		if (pos !== 0) {
			for (var i = 0; i < pos; i++) {
				reconciled[i] = oldChildren[i];
			}
		}
	
		// old children
		for (var i = pos; i < oldLen; i++) {
			var oldChild = oldChildren[i];
			var newChild = newKeys[oldChild.props.key];
	
			// removed
			if (newChild === void 0) {
				// book keeping
				delOffset++;
	
				removeNode(oldChild, parentNode);
			}
	
			// update old indexes
			if (delOffset !== 0) {
				oldChild.index -= delOffset;
			}
		}
	
		// update length
		length -= delOffset;
	
		// new children
		for (var i = pos; i < newLen; i++) {
			var newChild = newChildren[i];
			var oldChild = oldKeys[newChild.props.key];
	
			// exists
			if (oldChild !== void 0) {
				var index = oldChild.index;
	
				// moved
				if (index+addOffset !== i) {
					parentNode.insertBefore(childNodes[index], childNodes[i]);
				}
	
				// assign clean node
				reconciled[i] = oldChild;
			} else {
				if (i < length) {
					// insert
					insertNode(newChild, childNodes[i], parentNode, createNode(newChild, null, null));
				} else {
					// append
					appendNode(newChild, parentNode, createNode(newChild, null, null));
				}
	
				// book keeping
				addOffset++; 
				length++;
	
				// assign clean node
				reconciled[i] = newChild;
			}	
		}
	
		// replace dirty children
		oldNode.children = reconciled;
	}
	
	
	/**
	 * patch nodes
	 *  
	 * @param  {VNode}   newNode  
	 * @param  {VNode}   oldNode 
	 * @param  {number}  newNodeType 
	 * @param  {number}  oldNodeType
	 */
	function patchNodes (newNode, oldNode, newNodeType, oldNodeType) {
		// if newNode and oldNode are the identical, exit early
		if (newNode === oldNode) {
			return;
		}
	
		// extract node from possible component node
		var currentNode = newNodeType === 2 ? extractComponent(newNode) : newNode;
	
		// a component
		if (oldNodeType === 2) {
			// retrieve components
			var oldComp = oldNode.instance;
			var newComp = newNode.instance;
	
			// retrieve props
			var newProps = newComp.props;
			var newState = newComp.state;
	
			// component with shouldComponentUpdate
			if (oldComp.shouldComponentUpdate !== void 0 && 
				oldComp.shouldComponentUpdate(newProps, newState) === false) {
				// exit early
				return;
			}
	
			// component with componentWillUpdate
			if (oldComp.componentWillUpdate !== void 0) {
				oldComp.componentWillUpdate(newProps, newState);
			}
		}
	
		// children
		var newChildren = currentNode.children;
		var oldChildren = oldNode.children;
	
		// children length
		var newLength = newChildren.length;
		var oldLength = oldChildren.length;
	
		// new children length is 0, remove all children
		if (newLength === 0) {
			// but only if old children is not already cleared
			if (oldLength !== 0) {
				oldNode.DOMNode.textContent = '';
				oldNode.children = newChildren;
			}
		} else {
			// new node has children
			var parentNode = oldNode.DOMNode;
	
			// when keyed, the position that dirty keys begin
			var pos = 0;
	
			// non-keyed until the first dirty key is found
			var keyed = false;
	
			// un-initialized key hash maps
			var oldKeys;
			var newKeys;
	
			// the highest point of interest
			var length = newLength > oldLength ? newLength : oldLength;
	
			// for loop, the end point being which ever is the 
			// greater value between new length and old length
			for (var i = 0; i < length; i++) {
				var newChild = newChildren[i] || nodEmpty;
				var oldChild = oldChildren[i] || nodEmpty;
	
				var newType = newChild.nodeType;
				var oldType = oldChild.nodeType;
	
				if (keyed) {
					// push keys
					if (newType !== 0) newKeys[newChild.props.key] = (newChild.index = i, newChild);
					if (oldType !== 0) oldKeys[oldChild.props.key] = (oldChild.index = i, oldChild);
				}
				// remove
				else if (newType === 0) {
					removeNode(oldChildren.pop(), parentNode);
				}
				// add
				else if (oldType === 0) {
					appendNode(oldChildren[oldChildren.length] = newChild, parentNode, createNode(newChild, null, null));
				}
				// text
				else if (newType === 3 && oldType === 3) {
					if (newChild.children !== oldChild.children) {
						oldChild.DOMNode.nodeValue = oldChild.children = newChild.children;
					}
				}
				// key
				else if (newChild.props.key !== oldChild.props.key) {
					keyed = true; 
					pos = i;
					oldKeys = {}; 
					newKeys = {}; 
	
					// push keys
					newKeys[newChild.props.key] = (newChild.index = i, newChild);
					oldKeys[oldChild.props.key] = (oldChild.index = i, oldChild);
				}
				// replace
				else if (newChild.type !== oldChild.type) {
					replaceNode(oldChildren[i] = newChild, oldChild, parentNode, createNode(newChild, null, null));
				}
				// noop
				else {
					patchNodes(newChild, oldChild, newType, oldType);
				}
			}
	
			// reconcile keyed children
			if (keyed) {
				patchKeys([newKeys, oldKeys], parentNode, newNode, oldNode, newLength, oldLength, pos);
			}
		}
	
		// props objects of the two nodes are not equal, patch
		if (currentNode.props !== oldNode.props) {
			patchProps(currentNode, oldNode);
		}
	
		// component with componentDidUpdate
		if (oldNodeType === 2 && oldComp.componentDidUpdate !== void 0) {
			oldComp.componentDidUpdate(newProps, newState);
		}
	}
	
	
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
			assignProp(target, name, props, onlyEvents, component);
		}
	}
	
	
	/**
	 * assign prop for create element
	 * 
	 * @param  {Node}       target
	 * @param  {string}     name
	 * @param  {Object}     props
	 * @param  {boolean}    onlyEvents,
	 * @param  {Component}  component
	 */
	function assignProp (target, name, props, onlyEvents, component) {
		if (isEventName(name)) {
			addEventListener(target, extractEventName(name), props[name], component);
		} else if (onlyEvents === false) {
			// add attribute
			updateProp(target, 'setAttribute', name, props[name], props.xmlns);
		}
	}
	
	
	/**
	 * patch props
	 * 
	 * @param  {VNode} newNode
	 * @param  {VNode} oldNode
	 */
	function patchProps (newNode, oldNode) {
		var diff   = diffProps(newNode, oldNode, newNode.props.xmlns || '', []);
		var length = diff.length;
	
		// if diff length > 0 apply diff
		if (length !== 0) {
			var target = oldNode.DOMNode;
	
			for (var i = 0; i < length; i++) {
				var prop = diff[i];
				// [0: action, 1: name, 2: value, namespace]
				updateProp(target, prop[0], prop[1], prop[2], prop[3]);
			}
	
			oldNode.props = newNode.props;
		}
	}
	
	
	/**
	 * collect prop diffs
	 * 
	 * @param  {VNode}   newNode 
	 * @param  {VNode}   oldNode 
	 * @param  {string}  namespace
	 * @param  {Array[]} diff
	 * @return {Array[]}          
	 */
	function diffProps (newNode, oldNode, namespace, diff) {
		// diff newProps
		for (var newName in newNode.props) { 
			diffNewProps(newNode, oldNode, newName, namespace, diff); 
		}
	
		// diff oldProps
		for (var oldName in oldNode.props) { 
			diffOldProps(newNode, oldName, namespace, diff); 
		}
	
		return diff;
	}
	
	
	/**
	 * diff newProps agains oldProps
	 * 
	 * @param  {VNode}   newNode 
	 * @param  {VNode}   oldNode 
	 * @param  {string}  newName
	 * @param  {string}  namespace
	 * @param  {Array[]} diff
	 * @return {Array[]}          
	 */
	function diffNewProps (newNode, oldNode, newName, namespace, diff) {
		var newValue = newNode.props[newName];
		var oldValue = oldNode.props[newName];
	
		if (newValue != null && oldValue !== newValue) {
			diff[diff.length] = ['setAttribute', newName, newValue, namespace];
		}
	}
	
	
	/**
	 * diff oldProps agains newProps
	 * 
	 * @param  {VNode}   newNode 
	 * @param  {Object}  oldName 
	 * @param  {string}  namespace
	 * @param  {Array[]} diff
	 * @return {Array[]}          
	 */
	function diffOldProps (newNode, oldName, namespace, diff) {
		var newValue = newNode.props[oldName];
	
		if (newValue == null) {
			diff[diff.length] = ['removeAttribute', oldName, '', namespace];
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
	
		// normalize class/className references, i.e svg className !== html className
		// uses className instead of class for html elements
		if (namespace === nsSvg) {
			isSVG = true;
			propName = name === 'className' ? 'class' : name;
		} else {
			propName = name === 'class' ? 'className' : name;
		}
	
		var targetProp = target[propName];
		var isDefinedValue = propValue != null && propValue !== false;
	
		// objects, adds property if undefined, else, updates each memeber of attribute object
		if (isDefinedValue && typeof propValue === 'object') {
			targetProp === void 0 ? target[propName] = propValue : updatePropObject(propValue, targetProp);
		} else {
			if (targetProp !== void 0 && isSVG === false) {
				target[propName] = propValue;
			} else {
				if (isDefinedValue) {
					// reduce value to an empty string if true, <tag checked=true> --> <tag checked>
					if (propValue === true) { 
						propValue = ''; 
					}
	
					target[action](propName, propValue);
				} else {
					// remove attributes with false/null/undefined values
					target.removeAttribute(propName);
				}
			}
		}
	}
	
	
	/**
	 * update prop objects, i.e .style
	 * 
	 * @param  {Object} value
	 * @param  {any}    targetAttr
	 */
	function updatePropObject (value, targetAttr) {
		for (var propName in value) {
			var propValue = value[propName] || null;
	
			// if targetAttr object has propName, assign
			if (propName in targetAttr) {
				targetAttr[propName] = propValue;
			}
		}
	}
	
	
	/**
	 * create node
	 * 
	 * @param  {VNode}      subject
	 * @param  {?Component} component
	 * @param  {?string}    namespace
	 * @return {Node}
	 */
	function createNode (subject, component, namespace) {
		var nodeType = subject.nodeType;
		
		// textNode	
		if (nodeType === 3) {
			return subject.DOMNode = document.createTextNode(subject.children);
		}
	
		// hoisted, clone DOMNode, second check ensures fragments are not cloned
		if (subject.DOMNode !== null && subject.DOMNode.isFragment !== true) {
			return subject.DOMNode = subject.DOMNode.cloneNode(true);
		}
	
		// create
		var newNode  = nodeType === 2 ? extractComponent(subject) : subject;
		var type     = newNode.type;
		var children = newNode.children;
		var props    = newNode.props;
		var length   = children.length;
		var element;
	
		// update nodeType
		nodeType = newNode.nodeType;
	
		// assign namespace
		if (props.xmlns !== void 0) { 
			namespace = props.xmlns; 
		}
	
		// if namespaced, create namespaced element
		if (namespace !== null) {
			// if undefined, assign svg namespace
			if (props.xmlns === void 0) {
				props.xmlns = namespace;
			}
	
			element = document.createElementNS(namespace, type);
		} else {
			if (nodeType !== 11) {
				element = document.createElement(type);				
			} else {
				element = document.createDocumentFragment();
	
				// accessing any dom property i.e nodeType to check if a node is a fragment
				// is slower ~(50mil vs 800mil) than accessing a non-existent or added property
				element.isFragment = true;
			}
		}
	
		// has a component instance
		if (subject.instance !== null) {
			// hydrate component instance, 
			// this travels through the tree until we find another component to hydrate
			// which allows use to call ref functions under the context of the component they are within
			// and assign string refs to their parent components
			(component = subject.instance).VNode.DOMNode = element;
	
			// stylesheets
			if (component.stylesheet !== void 0 && nodeType !== 11) {
				if (component.stylesheet.CSSNamespace === void 0) {
					// create
					stylesheet(component, subject.type.COMPCache || subject.type, true)(element);
				} else {
					// namespace
					component.stylesheet(element);
				}
			}
		}
	
		// has children
		if (length !== 0) {
			// append children
			for (var i = 0; i < length; i++) {
				var newChild = children[i];
	
				// hoisted, clone VNode
				if (newChild.DOMNode !== null) {
					newChild = children[i] = cloneNode(newChild);
				}
	
				// append child
				appendNode(newChild, element, createNode(newChild, component, namespace));					
			}
		}
	
		// props is not an empty object
		if (props !== objEmpty) {
			// refs
			if (props.ref !== void 0) {
				refs(props.ref, component, element);
			}
	
			// props and events
			assignProps(element, props, false, component);
		}
	
		// cache element reference
		return subject.DOMNode = element;
	}
	
	
	/**
	 * append node
	 *
	 * @param {VNode} newNode
	 * @param {Node}  parentNode
	 * @param {Node}  nextNode
	 */
	function appendNode (newNode, parentNode, nextNode) {
		if (newNode.instance !== null && newNode.instance.componentWillMount) {
			newNode.instance.componentWillMount(nextNode);
		}
	
		// append DOMNode
		parentNode.appendChild(nextNode);
	
		if (newNode.instance !== null && newNode.instance.componentDidMount) {
			newNode.instance.componentDidMount(nextNode);
		}
	}
	
	
	/**
	 * insert node
	 *
	 * @param {VNode} newNode
	 * @param {Node}  oldNode
	 * @param {Node}  parentNode
	 * @param {Node}  nextNode
	 */
	function insertNode (newNode, oldNode, parentNode, nextNode) {
		if (newNode.instance !== null && newNode.instance.componentWillMount) {
			newNode.instance.componentWillMount(nextNode);
		}
	
		// insert DOMNode
		parentNode.insertBefore(nextNode, oldNode);
	
		if (newNode.instance !== null && newNode.instance.componentDidMount) {
			newNode.instance.componentDidMount(nextNode);
		}
	}
	
	
	/**
	 * remove node
	 *
	 * @param {VNode} oldNode
	 * @param {Node}  parentNode
	 */
	function removeNode (oldNode, parentNode) {
		if (oldNode.instance !== null && oldNode.instance.componentWillUnmount) {
			oldNode.instance.componentWillUnmount(oldNode.DOMNode);
		}
	
		// remove DOMNode
		parentNode.removeChild(oldNode.DOMNode);
	
		// clear references
		oldNode.DOMNode = null;
	}
	
	
	/**
	 * replace node
	 *
	 * @param {VNode} newNode
	 * @param {VNode} oldNode
	 * @param {Node}  parentNode 
	 * @param {Node}  nextNode
	 */
	function replaceNode (newNode, oldNode, parentNode, nextNode) {
		if (oldNode.instance !== null && oldNode.instance.componentWillUnmount) {
			oldNode.instance.componentWillUnmount(oldNode.DOMNode);
		}
	
		if (newNode.instance !== null && newNode.instance.componentWillMount) {
			newNode.instance.componentWillMount(nextNode);
		}
	
		// replace DOMNode
		parentNode.replaceChild(nextNode, oldNode.DOMNode);
		
		if (newNode.instance !== null && newNode.instance.componentDidMount) {
			newNode.instance.componentDidMount(nextNode);
		}
	
		// clear references
		oldNode.DOMNode = null;
	}
	
	
	/**
	 * add event listener
	 *
	 * @param {Node}      element
	 * @param {string}    name
	 * @param {function}  listener
	 * @param {Component} component
	 */
	function addEventListener (element, name, listener, component) {
		if (typeof listener !== 'function') {
			element.addEventListener(name, bindEvent(name, listener, component));
		} else {
			element.addEventListener(name, listener);
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
		var bind = value.bind;
		var data = value.with;
	
		var preventDefault = value.preventDefault === void 0 || value.preventDefault === true;
	
		if (typeof bind === 'object') {
			var property = bind.property || data;
	
			return function (event) {
				var target = event.currentTarget || event.target;
				var value  = data in target ? target[data] : target.getAttribute(data);
	
				preventDefault && event.preventDefault();
	
				// update component state
				component.state[property] = value;
	
				// update component
				component.forceUpdate();
			}
		} else {
			return function (event) {
				preventDefault && event.preventDefault();
				bind.call(data, data, event);
			}
		}
	}
	
	
	/**
	 * extract component
	 * 
	 * @param  {VNode} subject
	 * @return {VNode} 
	 */
	function extractComponent (subject) {
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
			owner = createClass(type);
		}
		// class / createClass components
		else {
			owner = type;
		}
	
		// create component instance
		var component = subject.instance = new owner(props);
		
		// retrieve vnode
		var vnode = extractRender(component);
	
		// if keyed, assign key to vnode
		if (props.key !== void 0 && vnode.props.key === void 0) {
			vnode.props.key = props.key;
		}
	
		// if render returns a component, extract that component
		if (vnode.nodeType === 2) {
			vnode = extractComponent(vnode);
		}
	
		// replace props and children
		subject.props    = vnode.props
		subject.children = vnode.children;
	
		// assign reference to component and return vnode
		return component.VNode = vnode;
	}
	
	
	/**
	 * extract a render function
	 *
	 * @param  {Component} component
	 * @return {VNode}
	 */
	function extractRender (component) {
		// extract render
		var vnode = component.render(component.props, component.state, component) || VEmpty();
		
		// if vnode, else fragment
		return vnode.nodeType !== void 0 ? vnode : createElement('@', null, vnode);
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
		var newNode  = subject.nodeType === 2 ? extractComponent(subject) : subject;
		var nodeType = newNode.nodeType;
	
		var element = nodeType === 11 ? parent : parent.childNodes[index];
	
		// newNode is not a textNode, hydrate its children
		if (nodeType !== 3) {
			var props    = newNode.props;
			var children = newNode.children;
			var length   = children.length;
	
			// vnode has component attachment
			if (subject.instance !== null) {
				(component = subject.instance).VNode.DOMNode = parent;
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
	
	
			// not a fragment, fragments do not use props
			if (nodeType !== 11) {
				// not an emtpy object
				if (props !== objEmpty) {
					// refs
					if (props.ref !== void 0) {
						refs(props.ref, component, element);
					}
	
					// events
					assignProps(element, props, true, component);
				}
			}
	
			// hydrate the dom element to the virtual node
			subject.DOMNode = element;
		}
		// textNode
		else if (nodeType === 3) {
			var children = parentNode.children;
			var length   = children.length;
	
			// when we reach a string child that is followed by a string child, 
			// it is assumed that the dom representing it is a single textNode
			// case in point h('h1', 'Hello', 'World') output: <h1>HelloWorld</h1>
			// HelloWorld is one textNode in the DOM but two in the VNode
			if (length > 1 && (children[index+1] || nodEmpty).nodeType === 3) {			
				var fragment = document.createDocumentFragment();
				
				// look ahead of this nodes siblings and add all textNodes to the fragment
				// and exit when a non-textNode is encounted
				for (var i = index, len = length - index; i < len; i++) {
					var textNode = children[i];
	
					// exit early once we encounter a non textNode
					if (textNode.nodeType !== 3) {
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
		var body   = renderVNodeToString(renderVNode(subject), lookup, true);
		var styles = lookup.styles;
		var style  = styles.length !== 0 ? styles : '';
	
		if (template) {
			if (typeof template === 'string') {
				return template.replace('@body', body+style);
			} else {
				return template(body, styles);
			}
		} else {
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
		this.initial  = true;
		this.stack    = [];
		this.lookup   = {styles: '', namespaces: {}};
		this.template = template;
		this.node     = renderVNode(subject);
	
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
	
				if (initial === false && this.stack.length === 0) {
					var styles = this.lookup.styles;
	
					// if there are styles, append
					if (styles.length !== 0) {
						this.push(styles);
					}
	
					// has template, push closing
					if (this.template) {
						this.push(this.template[1]);
					}
	
					// end of stream
					this.push(null);
	
					// reset `initial` identifier
					this.initial = true;			
				} else {
					// start of stream
					if (initial === true) {
						this.initial = false;
	
						// has template, push opening 
						this.template && this.push(this.template[0]);
					}
	
					// pipe a chunk
					this._pipe(this.node, true, this.stack, this.lookup, initial);
				}
			}
		},
		_pipe: {
			value: function (subject, flush, stack, lookup, initial) {
				// if there is something pending in the stack give that priority
				if (flush && stack.length !== 0) {
					stack.pop()(this); 
					return;
				}
	
				var nodeType = subject.nodeType;
	
				// text node, sync
				if (nodeType === 3) {
					this.push(escape(subject.children)); 
					return;
				}
	
				var vnode;
	
				// if component
				if (nodeType === 2) {
					// cached
					if (subject.type.HTMLCache !== void 0) {
						this.push(subject.type.HTMLCache); 
						return;
					} else {
						vnode = extractComponent(subject);
					}
				} else {
					vnode = subject;
				}
	
				// references
				var type     = vnode.type;
				var props    = vnode.props;
				var children = vnode.children;
	
				var propsStr = renderStylesheetToString(
					nodeType, subject.instance, subject.type, renderPropsToString(props), lookup
				);
	
				if (isVoid[type] === 0) {
					// <type ...props>
					this.push('<'+type+propsStr+'>');
				} else {
					var opening = '';
					var closing = '';
	
					// fragments do not have opening/closing tags
					if (vnode.nodeType !== 11) {
						// <type ...props>...children</type>
						opening = '<'+type+propsStr+'>';
						closing = '</'+type+'>';
					}
	
					if (props.innerHTML !== void 0) {
						// special case when a prop replaces children
						this.push(opening+props.innerHTML+closing);
					} else {
						var length = children.length;
	
						if (length === 0) {
							// no children, sync
							this.push(opening+closing);
						} else if (length === 1 && children[0].nodeType === 3) {
							// one text node child, sync
							this.push(opening+escape(children[0].children)+closing);
						} else {
							// has children, async
							// since we cannot know ahead of time the number of children
							// this is operation is split into asynchronously added chunks of data
							var index = 0;
	
							// add one more for the closing tag
							var middlwares = length + 1;
	
							var doctype = initial && type === 'html';
							var eof = doctype || type === 'body';
	
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
								} else {
									stream._pipe(children[index++], false, stack, lookup);
								}
							}
	
							// if opening html tag, push doctype first
							if (doctype) {
								this.push('<!doctype html>');
							}
	
							// push opening tag
							this.push(opening);
	
							// push middlwares
							for (var i = 0; i < middlwares; i++) {
								stack[stack.length] = middleware;
							}
						}
					}
				}
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
		if (subject) {
			// array, run all VNodes through renderToCache
			if (subject.constructor === Array) {
				for (var i = 0, length = subject.length; i < length; i++) {
					renderToCache(subject[i]);
				}
			} else if (subject.nodeType === void 0) {
				subject.HTMLCache = renderToString(subject);
			} else if (subject.nodeType === 2) {
				subject.type.HTMLCache = renderToString(subject);
			}
		}
	
		return subject;
	}
	
	
	/**
	 * render stylesheet to string
	 *
	 * @param  {number}              nodeType
	 * @param  {Component}           component
	 * @param  {function}            constructor
	 * @param  {string}              output   
	 * @param  {Object<string, any>} lookup
	 * @return {string}          
	 */
	function renderStylesheetToString (nodeType, component, constructor, output, lookup) {
		// stylesheet
		if (nodeType === 2) {
			// stylesheet
			if (component.stylesheet) {
				var namespace = component.stylesheet.CSSNamespace;
	
				// create
				if (namespace === void 0) {
					var decorator = stylesheet(component, constructor.COMPCache || constructor, false);
	
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
	 * @param  {Object<string, any>} props
	 * @return {string}
	 */
	function renderPropsToString (props) {
		var string = '';
	
		// construct props string
		if (props !== objEmpty && props !== null) {
			each(props, function (value, name) {
				// value --> <type name=value>, exclude props with undefined/null/false as values
				if (value != null && value !== false) {
					var type = typeof value;
	
					if (type === 'string' && value) {
						value = escape(value);
					}
	
					// do not process these props
					if (
						name !== 'key' && 
						name !== 'ref' && 
						name !== 'innerHTML' &&
						type !== 'function' &&
						isEventName(name) === false
					) {
						if (type !== 'object') {
							if (name === 'className') { 
								name = 'class'; 
							}
	
							// if falsey/truefy checkbox=true ---> <type checkbox>
							string += ' ' + (value === true ? name : name + '="' + value + '"');
						} else {
							// if style objects
							var style = '';
	
							each(value, function (value, name) {
								// if camelCase convert to dash-case 
								// i.e marginTop --> margin-top
								if (name !== name.toLowerCase()) {
									name.replace(regStyleCamel, '$1-').replace(regStyleVendor, '-$1').toLowerCase();
								}
	
								style += name + ':' + value + ';';
							});
	
							string += name + '="' + value + '"';
						}
					}
				}
			});
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
		var nodeType = subject.nodeType;
	
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
			} else {
				vnode = extractComponent(subject);
			}
		} else {
			vnode = subject;
		}
	
		// references
		var type = vnode.type;
		var props = vnode.props;
		var children = vnode.children;
	
		var childrenStr = '';
		var vnodeStr = '';
	
		if (props.innerHTML !== void 0) {
			// special case when a prop replaces children
			childrenStr = props.innerHTML;
		} else {		
			// construct children string
			if (children.length !== 0) {
				for (var i = 0, length = children.length; i < length; i++) {
					childrenStr += renderVNodeToString(children[i], lookup, false);
				}
			}
		}
	
		var propsStr = renderStylesheetToString(
			nodeType, subject.instance, subject.type, renderPropsToString(props), lookup
		);
	
		if (vnode.nodeType === 11) {
			vnodeStr = childrenStr;
		} else if (isVoid[type] === 0) {
			// <type ...props>
			vnodeStr = '<'+type+propsStr+'>';
		} else {
			// <type ...props>...children</type>
			vnodeStr = '<'+type+propsStr+'>'+childrenStr+'</'+type+'>';
		}
	
		// add doctype if initial element is <html>
		return initial && type === 'html' ? ('<!doctype html>' + vnodeStr) : vnodeStr;
	}
	
	
	/**
	 * render virtual node
	 * 
	 * @param  {(VNode|function|Component)} subject
	 * @return {VNode}
	 */
	function renderVNode (subject) {
		if (subject.nodeType) {
			return subject;
		} else {
			return typeof subject === 'function' ? VComponent(subject) : createElement('@', null, subject);
		}
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
				return (setTimeout(dispatch, 0, 'then', store = value), Stream);
			} else {
				// if you pass a middleware function i.e a = stream(1, String)
				// the stream will return 1 processed through String
				// if you pass a boolean primitive the assumtion is made that the store
				// is a function and that it should return the functions return value
				if (hasMiddleware) {
					return middlewareFunc ? middleware(store) : store();
				} else {
					return store;
				}
			}
		}
	
		// dispatcher, dispatches listerners
		function dispatch (type, value) {
			var collection = listeners[type];
			var length = collection.length;
	
			if (length !== 0) {
				// executes a listener, adding the return value to the chain
				var action = function (listener) {
					// link in the .then / .catch chain
					var link = listener(chain[type] || value);
					// add to chain if defined
					if (link !== void 0) { chain[type] = link; }
				}
	
				for (var i = 0; i < length; i++) {
					tryCatch(action, reject, collection[i]);
				}
			}
		}
	
		// resolve value
		function resolve (value) {
			return Stream(value); 
		}
	
		// reject
		function reject (reason) { 
			setTimeout(dispatch, 0, 'catch', reason);
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
	
			chain.then      = null;
			chain.catch     = null; 
			listeners.then  = []; 
			listeners.catch = [];
		}
	
		// assign public methods
		Stream.then    = then;
		Stream.done    = done;
		Stream.catch   = error;
		Stream.map     = map;
		Stream.end     = end;
		Stream.valueOf = valueOf;
		Stream.toJSON  = toJSON;
		// signature
		Stream._stream = true;
	
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
		var method          = options.method;
		var url             = options.url;
		var payload         = options.payload; 
		var enctype         = options.enctype;
		var responseType    = options.responseType;
		var withCredentials = options.withCredentials;
		var headers         = options.headers;
		var initial         = options.initial;
		var config          = options.config;
		var username        = options.username;
		var password        = options.password;
	
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
				} else if (enctype.indexOf('json') > -1) {
					payload = JSON.stringify(payload);
				}
			}
	
			// headers property
			if (headers != null) {
				// assign headers
				each(headers, function (value, name) {
					xhr.setRequestHeader(name, value);
				});
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
				default:     options.enctype = 'application/x-www-form-urlencoded';
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
		return request(VRequest('GET', url, payload, enctype, responseType));
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
		return request(VRequest('POST', url, payload, enctype, responseType));
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
			body = tryCatch(JSON.parse, reject, data);
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
	
		each(object, function (value, key) {
			var prefixValue = prefix !== void 0 ? prefix + '[' + key + ']' : key;
	
			// when the value is an object recursive serialize
			if (typeof value == 'object') {
				arr[arr.length] = serialize(value, prefixValue);
			} else {
				arr[arr.length] = encodeURIComponent(prefixValue) + '=' + encodeURIComponent(value);
			}
		});
	
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
	function router (routes, address, initialiser, element, middleware, notFound) {
		if (typeof address === 'object') {
			element     = address.mount;
			initialiser = address.initial;
			middleware  = address.middleware;
			notFound    = address['404'];
			address     = address.directory;
		}
	
		if (middleware !== void 0) {
			each(routes, function (func, uri) {
				routes[uri] = function (data) { middleware(func, data, element); };
			});
		} else if (element !== void 0) {
			each(routes, function (component, uri) {
				routes[uri] = function (data) {
					render(VComponent(component, data), element, null, false);
				};
			});
		}
	
		return createRouter(routes, address, initialiser, notFound);
	}
	
	
	/**
	 * router constructor
	 * 
	 * @param {Object<string, (function|Component)>} patterns
	 * @param {string=}                              address
	 * @param {function=}                            initialiser
	 * @param {function=}                            notFound
	 */
	function createRouter (patterns, address, initialiser, notFound) {
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
			// the pattern will be / ([^\/]+) / ([^\/]+) / (?:.*)
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
					pattern:  { value: new RegExp((address ? address + pattern : pattern) + '$'), },
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
			var callback = route.callback;
			var pattern  = route.pattern;
			var params   = route.params;
			var match    = current.match(pattern);
	
			// we have a match
			if (match != null) {
				// create params object to pass to callback
				// i.e {user: 'simple', id: '1234'}
				var data = match.slice(1, match.length);
	
				var args = data.reduce(function (previousValue, currentValue, index) {
					// if this is the first value, create variables store
					if (previousValue === null) {
						previousValue = {url: current};
					}
	
					// name: value, i.e user: 'simple'
					// `vars` contains the keys for variables
					previousValue[params[index]] = currentValue;
	
					return previousValue;
	
					// null --> first value
				}, null) || {uri: current};
	
				callback(args, uri);
	
				// register match
				resolved = 1;
			} else {
				// register not found
				resolved = 0;
			}
		}
	
		// middleware between event and route
		function link (to) {
			var func = typeof to === 'function';
	
			return function (e) {
				var target = e.currentTarget || e.target || this;
				var value  = func ? to(target) : to;
	
				navigate(target[value] || (target.nodeName && target.getAttribute(value)) || value); 
			};
		}
	
		// navigate to a uri
		function navigate (uri) {
			if (typeof uri === 'string') {
				history.pushState(null, null, address ? address + uri : uri);
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
		if (typeof address === 'string' && address.charCodeAt(address.length - 1) === 47) {
			address = address.substring(0, address.length - 1);
		}
	
		var regex    = /([:*])(\w+)|([\*])/g;
		var history  = window.history || objEmpty;
		var location = history.location || window.location;
		var origin   = location.origin;
		var current  = '';
		var href     = '';
		var interval = 0;
		var resolved = 0;
		var routes   = {};
	
		/** @public */
		var api      = Object.defineProperty({
			navigate: navigate,
			back:     history.back, 
			foward:   history.forward, 
			link:     link,
			resume:   resume,
			pause:    pause,
			destroy:  destroy,
			set:      set,
			resolve:  resolve,
			routes:   routes
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
			} else if (type === 'string') {
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
		var length      = arguments.length;
	
		// passing arguments to a function i.e [].splice() will prevent this function
		// from getting optimized by the VM, so we manually build the array in-line
		for (var i = 0; i < length; i++) {
			middlewares[i] = arguments[i];
		}
	
		return function (Store) {
			return function (reducer, initialState, enhancer) {
				// create store
				var store = Store(reducer, initialState, enhancer);
				var api   = {
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
		} else {
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
		var keys   = Object.keys(reducers);
		var length = keys.length;
	
		// create and return a single reducer
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
		var listeners    = [];
	
		// state getter, retrieves the current state
		function getState () {
			return currentState;
		}
	
		// dispatchs a action
		function dispatch (action) {
			if (action.type === void 0) {
				throw 'actions without type';
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
				return subscribe(renderer = render(VComponent(subject, currentState, null), element)), renderer;
			} else {
				return subscribe(subject);
			}
		}
	
		// dispath initial action
		dispatch({type: '@/STORE'});
	
		return {
			getState:       getState, 
			dispatch:       dispatch, 
			subscribe:      subscribe,
			connect:        connect,
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

		// server
		renderToString: renderToString,
		renderToStream: renderToStream,
		renderToCache: renderToCache,

		// components
		Component: Component,
		createClass: createClass,

		// stores
		createStore: createStore,
		applyMiddleware: applyMiddleware,
		combineReducers: combineReducers,
		
		// utilities
		request: request,
		router: router,
		stream: stream,

		// shapes
		VText: VText,
		VElement: VElement,
		VSvg: VSvg,
		VFragment: VFragment,
		VComponent: VComponent
	};
}));