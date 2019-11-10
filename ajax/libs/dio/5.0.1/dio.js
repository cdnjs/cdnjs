/*
 *  ___ __ __  
 * (   (  /  \ 
 *  ) ) )( () )
 * (___(__\__/ 
 * 
 * dio is a fast javascript framework
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
	var version = '5.0.1';
	
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
	
	// random characters
	var randomChars = 'JrIFgLKeEuQUPbhBnWZCTXDtRcxwSzaqijOvfpklYdAoMHmsVNGy';
	
	
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
	 * generate random string of a certain length
	 * 
	 * @param  {number} length
	 * @return {string}
	 */
	function random (length) {
	    var text = '';
	
	    // 52 is the length of characters in the string `randomChars`
	    for (var i = 0; i < length; i++) {
	        text += randomChars[Math.floor(Math.random() * 52)];
	    }
	
	    return text;
	}
	
	
	/**
	 * for in proxy
	 * 
	 * @param  {Object}   obj
	 * @param  {function} func
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
	 * @param  {string}  type
	 * @param  {Object=} props
	 * @param  {any[]=}  children
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
	 * @param  {(function|Component)} type
	 * @param  {Object=}              props
	 * @param  {any[]=}               children
	 * @return {VNode}
	 */
	function VComponent (type, props, children) {
		return {
			nodeType: 2, 
			type: type, 
			props: (props || type.defaultProps || objEmpty), 
			children: (children || arrEmpty),
			DOMNode: null,
			instance: null,
			index: null
		};
	}
	
	
	/**
	 * fragment shape
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
	 * @param  {string}  type
	 * @param  {Object=} props
	 * @param  {any[]=}  children
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
	 * @param {number}                      nodeType
	 * @param {(function|Component|string)} type
	 * @param {Object}                      props
	 * @param {VNode[]}                     children
	 * @param {?Node}                       DOMNode
	 * @param {?Component}                  instance
	 * @param {?index}                      index
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
	 * @return {function(?Node)} styler
	 */
	function stylesheet (component, constructor) {
		var styles = component.stylesheet();
		var id     = random(5);
		var css    = stylis('['+nsStyle+'='+id+']', styles, true, true);
	
		if (browser && document.getElementById(id) == null) {
			var style = document.createElement('style');
			
			style.textContent = css;
			style.id = id;
	
			document.head.appendChild(style);
		}
	
		function styler (element) {
			if (element === null) {
				return css;
			} else {
				element.setAttribute(nsStyle, id);
			}
		}
	
		styler.styler = id;
	
		return constructor.prototype.stylesheet = styler;
	}
	
	
	/**
	 * css compiler
	 *
	 * @example compiler('.class1', 'css...', false);
	 * 
	 * @param  {string}  selector
	 * @param  {string}  styles
	 * @param  {boolean} nsAnimations
	 * @param  {boolean} nsKeyframes
	 * @return {string}
	 */
	function stylis (selector, styles, nsAnimations, nsKeyframes) {
	    var prefix = '';
	    var id     = '';
	    var type   = selector.charCodeAt(0) || 0;
	
	    // [ attr selector
	    if (type === 91) {
	        // `[data-id=namespace]` -> ['data-id', 'namespace']
	        var attr = selector.substring(1, selector.length-1).split('=');     
	        var char = (id = attr[1]).charCodeAt(0);
	
	        // [data-id="namespace"]/[data-id='namespace']
	        // --> "namespace"/'namspace' -> namespace
	        if (char === 34 || char === 39) {
	            id = id.substring(1, id.length-1);
	        }
	
	        prefix = '['+ attr[0] + '=\'' + id +'\']';
	    }
	    // `#` `.` `>` id class and descendant selectors
	    else if (type === 35 || type === 46 || type === 62) {
	        id = (prefix = selector).substring(1);
	    }
	    // element selector
	    else {
	        id = prefix = selector;
	    }
	
	    var keyframeNs  = (nsAnimations === void 0 || nsAnimations === true ) ? id : '';
	    var animationNs = (nsKeyframes === void 0 || nsKeyframes === true ) ? id : '';
	
	    var output  = '';
	    var line    = '';
	    var blob    = '';
	    var prev    = '';
	    var flat    = '';
	
	    var len     = styles.length;
	
	    var i       = 0;
	    var special = 0;
	    var type    = 0;
	    var close   = 0;
	    var comment = 0;
	    var depth   = 0;
	
	    // parse + compile
	    while (i < len) {
	        var code = styles.charCodeAt(i);
	
	        // {, }, ; characters, parse line by line
	        if (code === 123 || code === 125 || code === 59) {
	            line += styles[i];
	
	            var first = line.charCodeAt(0);
	
	            // only trim when the first character is a space ` `
	            if (first === 32) { 
	                first = (line = line.trim()).charCodeAt(0); 
	            }
	
	            // default to 0 instead of NaN if there is no second character
	            var second = line.charCodeAt(1) || 0;
	
	            // ignore comments
	            if (comment === 2) {
	                line = ''; comment = 0;
	            }
	            // @, special block
	            else if (first === 64) {
	                // @keyframe/@global, `k` or @global, `g` character
	                if (second === 107 || second === 103) {
	                    // k, @keyframes
	                    if (second === 107) {
	                        blob = line.substring(1, 11) + keyframeNs + line.substring(11);
	                        line = '@-webkit-'+blob;
	                        type = 1;
	                    }
	                    // g, @global 
	                    else {
	                        line = '';
	                    }
	                }
	                // @media `m` character
	                else if (second === 109) {
	                    type = 2;
	                }
	
	                special++;
	            }
	            else {
	                var third = line.charCodeAt(2) || 0;
	
	                // animation: a, n, i characters
	                if (first === 97 && second === 110 && third === 105) {
	                    var anims = line.substring(10).split(',');
	                    var build = 'animation:';
	
	                    for (var j = 0, length = anims.length; j < length; j++) {
	                        build += (j === 0 ? '' : ',') + animationNs + anims[j].trim();
	                    }
	
	                    // vendor prefix
	                    line = '-webkit-' + build + build;
	                }
	                // appearance: a, p, p
	                else if (first === 97 && second === 112 && third === 112) {
	                    // vendor prefix -webkit- and -moz-
	                    line = '-webkit-' + line + '-moz-' + line + line;
	                }
	                // hyphens: h, y, p
	                // user-select: u, s, e
	                else if (
	                    (first === 104 && second === 121 && third === 112) ||
	                    (first === 117 && second === 115 && third === 101)
	                ) {
	                    // vendor prefix all
	                    line = '-webkit-' + line + '-moz-' + line + '-ms-' + line + line;
	                }
	                // flex: f, l, e
	                // order: o, r, d
	                else if (
	                    (first === 102 && second === 108 && third === 101) ||
	                    (first === 111 && second === 114 && third === 100)
	                ) {
	                    // vendor prefix only -webkit-
	                    line = '-webkit-' + line + line;
	                }
	                // transforms & transitions: t, r, a 
	                else if (first === 116 && second === 114 && third === 97) {
	                    // vendor prefix -webkit- and -ms- if transform
	                    line = '-webkit-' + line + (line.charCodeAt(5) === 102 ? '-ms-' + line : '') + line;
	                }
	                // display: d, i, s
	                else if (first === 100 && second === 105 && third === 115) {
	                    if (line.indexOf('flex') > -1) {
	                        // vendor prefix
	                        line = 'display:-webkit-flex; display:flex;';
	                    }
	                }
	                // { character, selector declaration
	                else if (code === 123) {
	                    depth++;
	
	                    if (special === 0 || type === 2) {
	                        // nested selector
	                        if (depth === 2) {
	                            // discard first character {
	                            i++;
	
	                            // inner content of block
	                            var inner   = '';
	                            var nestSel = line.substring(0, line.length-1).split(',');
	                            var prevSel = prev.substring(0, prev.length-1).split(',');
	
	                            // keep track of opening `{` and `}` occurrences
	                            var counter = 1;
	
	                            // travel to the end of the block
	                            while (i < len) {
	                                var char = styles.charCodeAt(i);
	                                // {, }, nested blocks may have nested blocks
	                                char === 123 ? counter++ : char === 125 && counter--;
	                                // break when the block has ended
	                                if (counter === 0) break;
	                                // build content of nested block
	                                inner += styles[i++];
	                            }
	
	                            // handle multiple selectors: h1, h2 { div, h4 {} } should generate
	                            // -> h1 div, h2 div, h2 h4, h2 div {}
	                            for (var j = 0, length = prevSel.length; j < length; j++) {
	                                // extract value, prep index for reuse
	                                var val = prevSel[j]; prevSel[j] = '';
	                                // since there could also be multiple nested selectors
	                                for (var k = 0, l = nestSel.length; k < l; k++) {
	                                    prevSel[j] += (
	                                        (val.replace(prefix, '').trim() + ' ' + nestSel[k].trim()).trim() + 
	                                        (k === l-1  ? '' : ',')
	                                    );
	                                }
	                            }
	
	                            // create block and update styles length
	                            len += (styles += (prevSel.join(',') + '{'+inner+'}').replace(/&| +&/g, '')).length;
	
	                            // clear current line, to avoid add block elements to the normal flow
	                            line = '';
	
	                            // decreament depth
	                            depth--;
	                        }
	                        // top-level selector
	                        else {
	                            var split = line.split(',');
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
	
	                            prev = line = build;
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
	                    if (close === 2) {
	                        // @global
	                        if (type === 0) {
	                            line = '';
	                        }
	                        // @keyframes 
	                        else if (type === 1) {
	                            // vendor prefix
	                            line = '}@'+blob+'}';
	                            // reset blob
	                            blob = '';
	                        }
	                        // @media
	                        else if (type === 2) {
	                            blob.length !== 0 && (line = prefix + ' {'+blob+'}' + line);
	                            // reset blob
	                            blob = '';
	                        }
	
	                        // reset flags
	                        type = 0; close--; special--;
	                    }
	                    // @keyframes 
	                    else if (type === 1) {
	                        blob += line;
	                    }
	                    // @media flat context
	                    else if (type === 2 && depth === 0 && code !== 125) {
	                        blob += line; line = '';
	                    }
	                }
	                // flat context
	                else if (depth === 0 && code !== 125) {
	                    flat += line; line = '';
	                }
	            }
	
	            // add line to output, reset line buffer and comment signal
	            output += line; line = ''; comment = 0;
	        }
	        // build line by line
	        else {
	            // \r, \n, ignore line and block comments
	            if (comment === 2 && (code === 13 || code === 10)) {
	                line = ''; comment = 0;
	            }
	            // not `\t`, `\r`, `\n` characters
	            else if (code !== 9 && code !== 13 && code !== 10) {
	                // / line comment signal
	                code === 47 && comment < 2 && comment++;
	
	                // build line buffer
	                line += styles[i];
	            }
	        }
	
	        // next character
	        i++; 
	    }
	
	    // if there is flat css, append
	    return output + (flat.length === 0 ? '' : prefix + ' {' + flat + '}');
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
	 * @param  {(string|function|Object)} type
	 * @param  {Object=}                  props
	 * @param  {...*=}                    children
	 * @return {Object}
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
	 * @param {any} child
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
	 * @param  {VNode}   subject
	 * @param  {Object=} newProps
	 * @param  {any[]=}  newChildren
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
				var index    = 0;
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
	 * create element factory
	 * 
	 * @param  {string}  element
	 * @return {function}
	 */
	function createFactory (type, props) {
		return props ? VElement.bind(null, type, props) : VElement.bind(null, type);
	}
	/**
	 * is valid element
	 * 
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isValidElement (subject) {
		return subject && subject.nodeType;
	}
	
	
	/**
	 * DOM factory, create VNode factories
	 *
	 * @param {string[]} types
	 */
	function DOM (types) {
		var elements = {};
	
		// add element factories
		for (var i = 0, length = types.length; i < length; i++) {
			elements[types[i]] = VElement.bind(null, types[i]);
		}
		
		// if svg, add related svg element factories
		if (elements.svg) {
			var svgs = ['rect','path','polygon','circle','ellipse','line','polyline','svg',
				'g','defs','text','textPath','tspan','mpath','defs','g'];
	
			for (var i = 0, length = svgs.length; i < length; i++) {
				elements[svgs[i]] = VSvg.bind(null, svgs[i]);
			}
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
	 * @param {Object}    newState
	 * @param {function=} callback
	 */
	function setState (newState, callback) {
		if (this.shouldComponentUpdate && this.shouldComponentUpdate(this.props, newState) === false) {
			return;
		}
	
		updateState(this.state, newState);
	
		this.forceUpdate(callback || null);
	}
	
	
	/**
	 * update state, hoisted to avoid deopts
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
	 * @param  {function=}
	 */
	function forceUpdate (callback) {
		if (this.componentWillUpdate) {
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
			oldNode.instance = newNode.instance;
		} else {
			// patch node
			patch(newNode, oldNode, newNode.nodeType, oldNode.nodeType);
		}
	
		if (this.componentDidUpdate) {
			this.componentDidUpdate(this.props, this.state);
		}
	
		// callback
		if (callback && typeof callback === 'function') {
			callback.call(this);
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * component
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * component class
	 * 
	 * @param {Object=} props
	 */
	function Component (props) {
		// initial props
		if (this.getInitialProps) {
			this.props = this.getInitialProps(props);
		}
		// assign props
		else if (props !== objEmpty) {
			this.componentWillReceiveProps && this.componentWillReceiveProps(props);
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
	 * component prototype
	 * 
	 * @type {Object}
	 */
	Component.prototype = Object.create(null, {
		setState:    { value: setState },
		forceUpdate: { value: forceUpdate }
	});
	
	
	/**
	 * create class
	 * 
	 * @param  {(Object|function(createElement))} subject
	 * @return {function}
	 */
	function createClass (subject) {
		if (subject.COMPCache) {
			return subject.COMPCache; 
		}
	
		var func = typeof subject === 'function';
		var shape = func ? subject(createElement) : subject;
		var init = false;
		var render;
	
		if (typeof shape === 'function') {
			render = shape; 
			shape = { render: render };
		} else {
			init = shape.hasOwnProperty('constructor');
		}
	
		function component (props) {
			// constructor
			init && this.constructor(props);
	
			// extend Component
			Component.call(this, props); 
		}
	
		// extend Component prototype
		component.prototype = shape;
	
		shape.setState = Component.prototype.setState;
		shape.forceUpdate = Component.prototype.forceUpdate;
	
		// function component, cache created component
		if (func) {
			subject.COMPCache = component;
			component.constructor = subject;
		}
		
		if (!init) {
			shape.constructor = component;
		}
	
		return component;
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
	 * @param  {(Component|VNode)} subject
	 * @param  {(Node|string)}     target
	 * @param  {function(Node)=}   callback
	 * @param  {boolean=}          hydration
	 * @return {function(Object=)} reconciler
	 */
	function render (subject, target, callback, hydration) {
		var initial = true;
		var component;	
		var vnode;
		var element;
		
		// renderer
		function reconciler (props) {
			if (initial) {
				// dispatch mount
				appendNode(vnode, element, createNode(vnode, null, null));
	
				// register mount has been dispatched
				initial = false;
	
				// assign component instance
				component = vnode.instance;
			} else {
				// update props
				if (props) {
					if (
						component.shouldComponentUpdate !== void 0 && 
						component.shouldComponentUpdate(props, component.state) === false
					) {
						return reconciler;
					}
	
					component.props = props;
				}
	
				// update component
				component.forceUpdate(null);
			}
	
			return reconciler;
		}
	
		if (subject.render !== void 0) {
			// create component from object
			vnode = VComponent(createClass(subject));
		} else if (subject.type === void 0) {
			// fragment/component
			vnode = subject.constructor === Array ? createElement('@', null, subject) : VComponent(subject);
		} else {
			vnode = subject;
		}
	
		if (server) {
			return reconciler;
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
			
			reconciler();
		}
	
		// if present call root components context, passing root node as argument
		if (callback && typeof callback === 'function') {
			callback.call(component, vnode.DOMNode);
		}
	
		return reconciler;
	}
	
	
	/**
	 * patch nodes
	 *  
	 * @param  {VNode}   newNode  
	 * @param  {VNode}   oldNode 
	 * @param  {number}  newNodeType 
	 * @param  {number}  oldNodeType
	 */
	function patch (newNode, oldNode, newNodeType, oldNodeType) {
		// if currentNode and oldNode are the identical, exit early
		if (newNode === oldNode) {
			return;
		}
	
		// extract node from possible component node
		var currentNode = newNodeType === 2 ? extractComponent(newNode) : newNode;
	
		// a component
		if (oldNodeType === 2) {
			var oldComponent = oldNode.instance;
			var newComponent = newNode.instance;
	
			var newProps = newComponent.props;
			var newState = newComponent.state;
	
			// component with shouldComponentUpdate
			if (
				oldComponent.shouldComponentUpdate && 
				oldComponent.shouldComponentUpdate(newProps, newState) === false
			) {
				// exit early
				return;
			}
	
			// component with componentWillUpdate
			if (oldComponent.componentWillUpdate) {
				oldComponent.componentWillUpdate(newProps, newState);
			}
		}
	
		// references, children & children length
		var newChildren = currentNode.children;
		var oldChildren = oldNode.children;
		var newLength   = newChildren.length;
		var oldLength   = oldChildren.length;
	
		// new children length is 0 clear/remove all children
		if (newLength === 0) {
			// but only if old children is not already cleared
			if (oldLength !== 0) {
				oldNode.DOMNode.textContent = '';
				oldNode.children = newChildren;
			}
		} else {
			// new node has children
			var parentNode = oldNode.DOMNode;
	
			var hasKeys = false;
			var diffKeys = false;
			
			var oldKeys;
			var newKeys;
	
			// for loop, the end point being which ever is the 
			// greater value between newLength and oldLength
			for (var i = 0; i < newLength || i < oldLength; i++) {
				var newChild = newChildren[i] || nodEmpty;
				var oldChild = oldChildren[i] || nodEmpty;
	
				var newChildType = newChild.nodeType;
				var oldChildType = oldChild.nodeType;
	
				var action = 0;
	
				// remove
				if (newChildType === 0) {
					action = 1;
				}
				// add
				else if (oldChildType === 0) {
					action = 2;
				}
				// text
				else if (newChildType === 3 && oldChildType === 3) {
					if (newChild.children !== oldChild.children) {
						action = 3;
					}
				}
				// keys
				else if (newChild.props.key !== void 0 || oldChild.props.key !== void 0) {
					action = 4;
				}
				// replace
				else if (newChild.type !== oldChild.type) {
					action = 5;
				}
				// noop
				else {
					patch(newChild, oldChild, newChildType, oldChildType);
				}
	
				// patch
				if (action !== 0) {
					if (diffKeys) {
						action = 4;
					}
	
					switch (action) {
						// remove operation
						case 1: {
							// remove dom node, remove old child
							removeNode(oldChildren.pop(), parentNode);
							break;
						}
						// add operation
						case 2: {
							// append dom node, push new child
							appendNode(oldChildren[oldChildren.length] = newChild, parentNode, createNode(newChild, null, null));
							break;
						}
						// text operation
						case 3: {
							// replace dom node text, replace old child text
							oldChild.DOMNode.nodeValue = oldChild.children = newChild.children;
							break;
						}
						// keyed operation
						case 4: {
							var newKey = newChild.props.key;
							var oldKey = oldChild.props.key;
	
							// initialize key hash maps
							if (hasKeys === false) {
								hasKeys = true;
								oldKeys = {};
								newKeys = {};
							}
	
							// register to patch keys if a mis-match is found
							if (newKey !== oldKey) {
								if (diffKeys === false) {
									diffKeys = true;
								}
							} else {
								patch(newChild, oldChild, newChildType, oldNodeType);
							}
	
							// register key
							newKeys[newKey] = (newChild.index = i, newChild);
							oldKeys[oldKey] = (oldChild.index = i, oldChild);
							break;
						}
						// replace operation
						case 5: {
							// replace dom node, replace old child
							replaceNode(oldChildren[i] = newChild, oldChild, parentNode, createNode(newChild, null, null));
							break;
						}
					}
				}
			}
		}
	
		// reconcile keyed children
		if (diffKeys) {
			// offloaded to another function to keep the type feedback 
			// of this function to a minimum when non-keyed
			keyed(
				newKeys, 
				oldKeys, 
				parentNode, 
				newNode,
				oldNode, 
				newChildren, 
				oldChildren, 
				newLength, 
				oldLength
			);
		}
	
		// patch props only if oldNode is not a textNode 
		// and the props objects of the two nodes are not equal
		if (currentNode.props !== oldNode.props) {
			patchProps(currentNode, oldNode);
		}
	
		// component with componentDidUpdate
		if (oldNodeType === 2 && oldComponent.componentDidUpdate) {
			oldComponent.componentDidUpdate(newProps, newState);
		}
	}
	
	
	/**
	 * patch keyed nodes
	 *
	 * @param {Object}  newKeys
	 * @param {Object}  oldKeys
	 * @param {Node}    parentNode
	 * @param {VNode}   newNode
	 * @param {VNode}   oldNode
	 * @param {VNode[]} newChildren
	 * @param {VNode[]} oldChildren
	 * @param {number}  newLength
	 * @param {number}  oldLength
	 */
	function keyed (newKeys, oldKeys, parentNode, newNode, oldNode, newChildren, oldChildren, newLength, oldLength) {
		var reconciled = new Array(newLength);
		var children   = parentNode.children;
		var length     = children.length;
		var delOffset  = 0;
		var addOffset  = 0;
	
		// old children
		for (var i = 0; i < oldLength; i++) {
			var oldChild = oldChildren[i];
			var oldKey   = oldChild.props.key;
			var newChild = newKeys[oldKey];
	
			// removed
			if (newChild === void 0) {
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
		for (var j = 0; j < newLength; j++) {
			var newChild = newChildren[j];
			var newKey   = newChild.props.key;
			var oldChild = oldKeys[newKey];
	
			// exists
			if (oldChild) {
				var index = oldChild.index;
	
				// moved
				if (index+addOffset !== j) {
					parentNode.insertBefore(children[index], children[j]);
				}
	
				reconciled[j] = oldChild;
			} else {
				reconciled[j] = newChild;
	
				addOffset++;
	
				if (j < length) {
					// insert
					insertNode(newChild, children[j], parentNode, createNode(newChild, null, null));
				} else {
					// append
					appendNode(newChild, parentNode, createNode(newChild, null, null));
				}
	
				length++;
			}		
		}
	
		oldNode.children = reconciled;
	}
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
	
		// if the node is not a textNode and
		// has children hydrate each of its children
		if (nodeType === 1) {
			var props       = newNode.props;
			var newChildren = newNode.children;
			var newLength   = newChildren.length;
	
			// vnode has component attachment
			if (subject.instance !== null) {
				(component = subject.instance).VNode.DOMNode = parent;
			}
	
			// hydrate children
			for (var i = 0; i < newLength; i++) {
				hydrate(element, newChildren[i], i, newNode, component);
			}
	
			// not a fragment
			if (nodeType !== 11) {
				if (props !== objEmpty) {
					// refs
					props.ref && refs(props.ref, component, element);
	
					// assign events
					assignProps(element, props, true, component);
				}
			}
	
			// hydrate the dom element to the virtual element
			subject.DOMNode = element;
		}
		else if (nodeType === 3) {
			var children = parentNode.children;
			var length   = children.length;
	
			// when we reach a string child that is followed by a string child, 
			// it is assumed that the dom representing it is a single textNode,
			if (length > 1 && (children[index+1] || nodEmpty).nodeType === 3) {
				// case in point h('h1', 'Hello', 'World') output: <h1>HelloWorld</h1>
				// HelloWorld is one textNode in the DOM but two in the VNode
				var fragment = document.createDocumentFragment();
				
				// look ahead of this nodes siblings and add all textNodes to the the fragment.
				// exit when a non text node is encounted
				for (var i = index, len = length - index; i < len; i++) {
					var textNode = children[i];
	
					// exit early once we encounter a non text/string node
					if (textNode.nodeType !== 3) {
						break;
					}
	
					// create textnode, append to the fragment
					fragment.appendChild(textNode.DOMNode = document.createTextNode(textNode.children));
				}
	
				// replace the textNode with a set of textNodes
				parent.replaceChild(fragment, element);
			} else {
				newNode.DOMNode = element;
			}
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
	 * shallow render
	 *
	 * @param  {(VNode|Component)}
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
	 * assign prop for create element
	 * 
	 * @param  {Node}       target
	 * @param  {Object}     props
	 * @param  {number}     onlyEvents
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
	 * @param  {number}     onlyEvents,
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
	 * @param  {Array[]} propsDiff
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
	 * @param  {*}      propValue
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
	 * @param  {*}      targetAttr
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
	 * create element
	 * 
	 * @param  {VNode}      subject
	 * @param  {?Component} component
	 * @param  {?string}    namespace
	 * @return {Node}
	 */
	function createNode (subject, component, namespace) {
		var nodeType = subject.nodeType;
		
		if (nodeType === 3) {
			// textNode
			return subject.DOMNode = document.createTextNode(subject.children);
		} else {
			if (subject.DOMNode !== null) {
				// clone
				return subject.DOMNode = subject.DOMNode.cloneNode(true);
			} else {
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
					}
				}
	
				// vnode has component attachment
				if (subject.instance !== null) {
					(component = subject.instance).VNode.DOMNode = element;
	
					// stylesheets
					if (component.stylesheet && nodeType !== 11) {
						if (component.stylesheet.styler === void 0) {
							// create
							stylesheet(component, subject.type)(element);
						} else {
							// namespace
							component.stylesheet(element);
						}
					}
				}
	
				if (length !== 0) {
					// create children
					for (var i = 0; i < length; i++) {
						var newChild = children[i];
	
						// clone VNode
						if (newChild.DOMNode !== null) {
							newChild = children[i] = VNode(
								newChild.nodeType,
								newChild.type,
								newChild.props,
								newChild.children,
								newChild.DOMNode,
								null,
								null
							);
						}
	
						// append child
						appendNode(newChild, element, createNode(newChild, component, namespace));					
					}
				}
	
				if (props !== objEmpty) {
					// refs
					props.ref && refs(props.ref, component, element);
	
					// initialize props
					assignProps(element, props, false, component);
				}
	
				// cache element reference
				return subject.DOMNode = element;
			}
		}
	}
	
	
	/**
	 * append element
	 *
	 * @param {VNode} newNode
	 * @param {Node}  parentNode
	 * @param {Node}  nextNode
	 */
	function appendNode (newNode, parentNode, nextNode) {
		if (newNode.instance !== null && newNode.instance.componentWillMount) {
			newNode.instance.componentWillMount(nextNode);
		}
	
		// append node
		parentNode.appendChild(nextNode);
	
		if (newNode.instance !== null && newNode.instance.componentDidMount) {
			newNode.instance.componentDidMount(nextNode);
		}
	}
	
	
	/**
	 * insert element
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
	
		// insert node
		parentNode.insertBefore(nextNode, oldNode);
	
		if (newNode.instance !== null && newNode.instance.componentDidMount) {
			newNode.instance.componentDidMount(nextNode);
		}
	}
	
	
	/**
	 * remove element
	 *
	 * @param {VNode} oldNode
	 * @param {Node}  parentNode
	 */
	function removeNode (oldNode, parentNode) {
		if (oldNode.instance !== null && oldNode.instance.componentWillUnmount) {
			oldNode.instance.componentWillUnmount(oldNode.DOMNode);
		}
	
		// remove node
		parentNode.removeChild(oldNode.DOMNode);
	
		// clear references
		oldNode.DOMNode = null;
	}
	
	
	/**
	 * replace element
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
	
		// replace node
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
	 * @param  {string}  name
	 * @return {boolean}
	 */
	function isEventName (name) {
		return name.charCodeAt(0) === 111 && name.charCodeAt(1) === 110 && name.length > 3;
	}
	
	
	/**
	 * bind event
	 *
	 * @param  {string}    name
	 * @param  {Object}    value
	 * @param  {Component} component
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
		var type = subject.type;
		var candidate;
		
		if (type.COMPCache !== void 0) {
			// cache
			candidate = type.COMPCache;
		} else if (type.constructor === Function && (type.prototype === void 0 || type.prototype.render === void 0)) {
			// function components
			candidate = type.COMPCache = createClass(type);
		} else {
			// class / createClass components
			candidate = type;
		}
	
		// create component instance
		var component = subject.instance = new candidate(subject.props);
	
		// add children to props if not empty
		if (subject.children.length !== 0) {
			component.props.children = subject.children;
		}
		
		// retrieve vnode
		var vnode = extractRender(component);
	
		// if keyed, assign key to vnode
		if (subject.props.key !== void 0 && vnode.props.key === void 0) {
			vnode.props.key = subject.props.key;
		}
	
		// if render returns a component, extract that component
		if (vnode.nodeType === 2) {
			vnode = extractComponent(vnode);
		}
	
		// replace props and children of old vnode
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
	 * ---------------------------------------------------------------------------------
	 * 
	 * Server Side Render
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * server side render to string
	 * 
	 * @param  {(Object|function)}  subject
	 * @param  {(string|function)=} template
	 * @return {string}
	 */
	function renderToString (subject, template) {
		var lookup = {styles: '', ids: {}};
		var body   = renderVNodeToString(renderVNode(subject), lookup, true);
		var styles = lookup.styles;
		var style  = styles.length !== 0 ? '<style>'+styles+'<style>' : '';
	
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
	 * @param  {(VNode|Component)} subject 
	 * @param  {string=}           template
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
	 * @param {(VNode|Component)} subject
	 * @param {string=}           template
	 */
	function Stream (subject, template) {
		this.initial  = 0;
		this.stack    = [];
		this.lookup   = {styles: '', ids: {}};
		this.template = template;
		this.node     = renderVNode(subject);
	
		readable.call(this);
	}
	
	
	/**
	 * Stream prototype
	 * 
	 * @type {Object}
	 */
	Stream.prototype = server ? Object.create(readable.prototype, {
		_type: {
			value: 'text/html'
		},
		_read: {
			value: function () {
				if (this.initial === 1 && this.stack.length === 0) {
					var style = this.lookup.styles;
	
					// if there are styles, append
					if (style.length !== 0) {
						this.push('<style>'+style+'</style>');
					}
	
					// has template, push closing
					if (this.template) {
						this.push(this.template[1]);
					}
	
					// end of stream
					this.push(null);
	
					// reset `initial` identifier
					this.initial = 0;			
				} else {
					// start of stream
					if (this.initial === 0) {
						this.initial = 1;
	
						// has template, push opening 
						this.template && this.push(this.template[0]);
					}
	
					// pipe a chunk
					this._pipe(this.node, true, this.stack, this.lookup);
				}
			}
		},
		_pipe: {
			value: function (subject, flush, stack, lookup) {
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
					// if cached
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
	
							var doctype = type === 'html';
							var eof = doctype || type === 'body';
	
							// for each _read if queue has middleware
							// middleware execution will take priority
							var middleware = function (stream) {
								// done, close html tag, delegate next middleware
								if (index === length) {
									// if the closing tag is body or html
									// we want to push the styles before we close them
									if (eof && lookup.styles.length !== 0) {
										stream.push('<style>'+lookup.styles+'</style>');
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
	 * @param  {Object} subject
	 * @return {Object} subject
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
			// stylesheets
			if (component.stylesheet) {
				var id = component.stylesheet.styler;
	
				if (id === void 0) {
					// create
					lookup.styles += stylesheet(component, constructor)(null);
					lookup.ids[id = component.stylesheet.styler] = true;
				}
			 	else if (!lookup.ids[id]) {
					lookup.styles += component.stylesheet(null);
					lookup.ids[id] = true;
				}
	
				// add attribute to element
				output += ' '+nsStyle+'='+'"'+id+'"';
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
						type !== 'function' &&
						name !== 'key' && 
						name !== 'ref' && 
						name !== 'innerHTML'
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
		if (initial && type === 'html') {
			vnodeStr = '<!doctype html>' + vnodeStr;
		}
	
		return vnodeStr;
	}
	
	
	/**
	 * render virtual node
	 * 
	 * @param  {(function|Object)} subject
	 * @return {VNode}
	 */
	function renderVNode (subject) {
		if (subject.type) {
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
	 * @param  {(function(resolve, reject)|*)} value
	 * @param  {(function(...*)|boolean)}      middleware
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
	 * @param  {*}          value
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
	 * @param  {*}     value 
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
	 * @param  {Object}
	 * @return {function}
	 */
	function http (options) {
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
				resolve(response(this, responseType, reject)); 
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
	
			if (headers != null) {
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
	 * @example request({method: 'GET', url: '?'}) === request.get('?')
	 * 
	 * @param {Object} options
	 */
	function request (options) {
		var payload = options.payload;
		var method  = options.method = (options.method.toUpperCase() || 'GET');
		
		options.url = encodeURI(options.url);
	
		// enctype syntax sugar
		switch (options.enctype) {
			case 'json': options.enctype = 'application/json'; break;
			case 'text': options.enctype = 'text/plain'; break;
			case 'file': options.enctype = 'multipart/form-data'; break;
			default:     options.enctype = 'application/x-www-form-urlencoded';
		}
	
		// if has payload && GET pass payload as query string
		if (method === 'GET' && payload) {
			options.url += '?' + (typeof payload === 'object' ? serialize(payload) : payload);		
		}
	
		// returns a promise-like stream
		return http(options);
	}
	
	request.get = function (url, payload, enctype, responseType) {
		return request(VRequest('GET', url, payload, enctype, responseType));
	};
	
	request.post = function (url, payload, enctype, responseType) {
		return request(VRequest('POST', url, payload, enctype, responseType));
	};
	
	request.get('');
	
	/**
	 * retrieve and format response
	 * 
	 * @param  {XMLHttpRequest} xhr
	 * @param  {string}         responseType
	 * @param  {function}       reject
	 * @return {(Node|string|Object)}
	 */
	function response (xhr, responseType, reject) {			
		var data   = null; 
		var header = xhr.getResponseHeader('Content-Type');
	
		if (!xhr.responseType || xhr.responseType === 'text') {
			data = xhr.responseText;
		} else if (xhr.responseType === 'document') {
			data = responseXML;
		} else {
			data = response;
		}
	
		// response format
		if (responseType == null) {
			responseType = (header.indexOf(';') > -1 ? header.split(';')[0].split('/') : header.split('/'))[1];
		}
	
		var body;
	
		if (responseType === 'json') {
			body = tryCatch(JSON.parse, reject, data);
		} else if (responseType === 'html' || responseType === 'document') {
			body = (new DOMParser()).parseFromString(data, 'text/html');
		} else {
			body = data;
		}
	
		return body;
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
	
			// when the value is equal to an object 
			// we have somethinglike value = {name:'John', addr: {...}}
			// re-run param(addr) to serialize 'addr: {...}'
			arr[arr.length] = typeof value == 'object' ? 
									serialize(value, prefixValue) :
									encodeURIComponent(prefixValue) + '=' + encodeURIComponent(value);
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
	 * @param  {Object<string, (function|Component)>} routes
	 * @param  {string=}                              address 
	 * @param  {string=}                              initialiser
	 * @param  {(string|Node)=}                       element
	 * @param  {function=}                            middleware
	 * @param  {function=}                            notFound
	 * @return {Object}
	 */
	function router (routes, address, initialiser, element, middleware, notFound) {
		if (typeof routes === 'function') {
			routes = routes();
		}
	
		if (typeof address === 'function') {
			address = address();
		}
	
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
	 * @return {Object}    {getState, dispatch, subscribe, connect, replaceReducer}
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
	 * @return {Object}   {getState, dispatch, subscribe, connect, replaceReducer}
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
		version:          version,

		// alias
		h:                createElement,
		
		// elements
		createElement:    createElement,
		isValidElement:   isValidElement,
		cloneElement:     cloneElement,
		createFactory:    createFactory,
		DOM:              DOM,

		// render
		render:           render,
		shallow:          shallow,
		renderToString:   renderToString,
		renderToStream:   renderToStream,
		renderToCache:    renderToCache,

		// components
		Component:        Component,
		createClass:      createClass,

		// stores
		createStore:      createStore,
		applyMiddleware:  applyMiddleware,
		combineReducers:  combineReducers,
		
		// utilities
		request:          request,
		router:           router,
		stream:           stream,

		// shapes
		VText:            VText,
		VElement:         VElement,
		VSvg:             VSvg,
		VFragment:        VFragment,
		VComponent:       VComponent,
		VRequest:         VRequest,
	};
}));