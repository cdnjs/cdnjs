/*!
 *  ___ __ __  
 * (   (  /  \ 
 *  ) ) )( () )
 * (___(__\__/ 
 * 
 * Dio.js is a blazing fast, lightweight (~10kb) feature rich Virtual DOM framework. 
 * https://github.com/thysultan/dio.js
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
	
	
	var version     = '3.3.0';
	
	var nsstyle     = 'data-scope';
	var nsmath      = 'http://www.w3.org/1998/Math/MathML';
	var nsxlink     = 'http://www.w3.org/1999/xlink';
	var nssvg       = 'http://www.w3.org/2000/svg';
	
	var document    = window.document;
	var server      = window.global === window;
	var development = server && process.env.NODE_ENV === 'development';
	var readable    = server ? require('stream').Readable : function () {};
	
	var oempty      = Object.create(null);
	var vempty      = VNode(0, '', oempty, [], null, null);
	var isvoid      = {
		'area':   1, 'base':  1, 'br':   1, '!doctype': 1, 'col':    1, 'embed': 1,
		'wbr':    1, 'track': 1, 'hr':   1, 'img':      1, 'input':  1, 
		'keygen': 1, 'link':  1, 'meta': 1, 'param':    1, 'source': 1
	};
	
	var escpattern   = /[<>&"']/g;
	var unicodes     = {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'&': '&amp;'
	};
	
	
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
		var string = subject + '';
	
		if (string.length > 50) {
			// use regex if the string is long
			return string.replace(escpattern, unicode);
		} else {
			var characters = '';
	
			for (var i = 0, length = string.length; i < length; i++) {
				switch (string.charCodeAt(i)) {
					// & character
					case 38: characters += '&amp;'; break;
					// " character
					case 34: characters += '&quot;'; break;
					// < character
					case 60: characters += '&lt;'; break;
					// > character
					case 62: characters += '&gt;'; break;
					// any character
					default: characters += string[i]; break;
				}
			}
			
			return characters;
		}
	}
	
	
	/**
	 * unicode, escape => () helper
	 * 
	 * @param  {string} char
	 * @return {string}
	 */
	function unicode (char) {
		return unicodes[char];
	}
	
	
	/**
	 * input stream factory
	 * 
	 * used to build the css parser but could 
	 * be used to develop other parsers as well
	 * 
	 * @param  {string} string
	 * @return {Object}
	 */
	function input (string) {
	 	// peek at the next character
	 	function peek () { 
	 		return string[position] || ''; 
	 	}
	
	 	// peek x number of characters relative to the current character
	 	function look (distance) { 
	 		return string[(position-1)+distance] || ''; 
	 	}
	
	 	// move on to the next character
	 	function next () { 
	 		return string[position++]; 
	 	}
	
	 	// get current position
	 	function pos () {
	 		return position;
	 	}
	
	 	// end of file
	 	function eof () {
	 		return position === length; 
	 	}
	
	 	// sleep until a certain character is reached
	 	function sleep (until) {
	 		// use character code for faster number-to-number comparison
	 		var code = until.charCodeAt(0);
	
			while (position !== length && next().charCodeAt(0) !== code) {
				// empty
			} 
	 	}
	
	 	// position of the caret
	 	var position = 0;
	 	// length of string
	 	var length = string.length;
	
	 	return { 
	 		next:  next, 
	 		peek:  peek, 
	 		eof:   eof, 
	 		look:  look, 
	 		sleep: sleep,
	 		pos:   pos
	 	};
	}
	
	
	/**
	 * generate random string of a certain length
	 * 
	 * @param  {number} length
	 * @return {string}
	 */
	function random (length) {
	    var text     = '';
	    var possible = 'JrIFgLKeEuQUPbhBnWZCTXDtRcxwSzaqijOvfpklYdAoMHmsVNGy';
	
	    for (var i = 0; i < length; i++) {
	        text += possible[Math.floor(Math.random() * 52)];
	    }
	
	    return text;
	}
	
	
	/**
	 * throw/return error
	 * 
	 * @param  {string}            message
	 * @param  {number=}           silent
	 * @return {(undefined|Error)}
	 */
	function panic (message, silent) {
		// create an error object for stack stake tracing
		var error = (message || '').constructor === Error ? message : new Error(message);
	
		// throw error/return error(silent)
		if (silent) { 
			return error; 
		} else { 
			throw error; 
		}
	}
	
	
	/**
	 * try catch helper
	 * 
	 * @param  {function}  func
	 * @param  {function=} onerror
	 * @param  {any=}      value
	 * @return {any}
	 */
	function sandbox (func, onerror, value) {
		// hoisted due to V8 not opt'ing functions with try..catch
		try {
			return value ? func(value) : func();
		} catch (err) {
			return onerror && onerror(err);
		}
	}
	
	
	/**
	 * defer function
	 *
	 * defers the execution of a function with predefined arguments
	 * and an optional command to preventDefault event behaviour
	 * 
	 * @param  {function} subject
	 * @param  {any[]}    args
	 * @param  {boolean}  preventDefault
	 * @return {function}
	 */
	function defer (subject, args, preventDefault) {
		var empty = !args || args.length === 0;
	
		// return a function that calls `subject` with args as arguments
		return function callback (e) {
			// auto prevent default
			if (preventDefault && e && e.preventDefault) {
				e.preventDefault();
			}
	
			// defaults to arguments if there are no predefined args
			return subject.apply(this, (empty ? arguments : args));
		}
	}
	
	/**
	 * composes single-argument functions from right to left. The right most
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function
	 *
	 * @param  {...Function} funcs functions to compose
	 * @return {function}          function obtained by composing the argument functions
	 * from right to left. for example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	function compose () {
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
	 * flatten array
	 *
	 * @param  {any[]}  subject
	 * @param  {any[]=} output
	 * @return {any[]}  output
	 */
	function flatten (subject, output) {
		output = output || [];
		
		// for each item add to array, if an item is an array add recursively its elements
		for (var i = 0, length = subject.length; i < length; i++){
			var item = subject[i];
	
			// if it is not an array add its value to the output array
			if (item == null || item.constructor !== Array) {
				output[output.length] = item;
			} else {
				// recursively add the arrays elements to output
				flatten(item, output);
			}
		}
		
		return output;
	}
	
	
	/**
	 * [].splice
	 * 
	 * @param  {any[]}   subject
	 * @param  {number}  index
	 * @param  {number}  deleteCount
	 * @param  {Object=} itemToAdd
	 */
	function splice (subject, index, deleteCount, item) {
		if (item === void 0) {
			// remove first item with shift if start of array
			if (index === 0) { 
				return subject.shift(); 
			}
			// remove last item using pop if end of array
			else if (index > subject.length - 1) { 
				return subject.pop(); 
			}
			// remove at a specific index
			else { 
				return subject.splice(index, 1); 
			}
		} else {
			// prepend with unshift if start of array
			if (index === 0) { 
				return subject.unshift(item); 
			}
			// append using with push if end of array
			else if (index > subject.length - 1) { 
				return subject[subject.length] = item; 
			}
			// insert at a specific index
			else { 
				return subject.splice(index, deleteCount, item); 
			}
		}
	}
	
	
	/**
	 * for in proxy
	 * 
	 * @param  {Object}   subject
	 * @param  {Function} callback
	 * @param  {*}        thisArg
	 */
	function each (subject, callback, thisArg) {
		for (var name in subject) {
			// if return false, exit
			if (callback.call(thisArg, subject[name], name, subject) === false) { 
				return;
			}
		}
	}
	
	
	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isFunction (subject) {
		return typeof subject === 'function';
	}
	
	
	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isString (subject) {
		return typeof subject === 'string';
	}
	
	
	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isNumber (subject) {
		return typeof subject === 'number';
	}
	
	
	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isArray (subject) {
		return subject != null && subject.constructor === Array;
	}
	
	
	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isObject (subject) {
		return subject != null && subject.constructor === Object;
	}
	
	
	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isDefined (subject) {
		return subject != null;
	}
	
	
	/**
	 * @param  {*} subject 
	 * @return {boolean}
	 */
	function isArrayLike (subject) {
		return subject != null && typeof subject.length === 'number' && typeof subject !== 'function';
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * element
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * virtual fragment node factory
	 * 
	 * @param  {VNode[]} children
	 * @return {VNode}
	 */
	function VFragment (children) {
		return {
			nodeType: 11, 
			type: '@', 
			props: oempty, 
			children: children,
			_node: null,
			_owner: null
		};
	}
	
	
	/**
	 * virtual text node factory
	 * 
	 * @param  {string} text
	 * @return {VNode}
	 */
	function VText (text) {
		return {
			nodeType: 3, 
			type: 'text', 
			props: oempty, 
			children: text, 
			_node: null,
			_owner: null
		};
	}
		
	
	/**
	 * virtual element node factory
	 * 
	 * @param  {string} type
	 * @param  {Object=} props
	 * @param  {any[]=}  children
	 * @return {VNode}
	 */
	function VElement (type, props, children) {
		return {
			nodeType: 1, 
			type: type, 
			props: (props || {}), 
			children: (children || []), 
			_node: null,
			_owner: null
		};
	}
	
	
	/**
	 * virtual svg node factory
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
			props: (props = props || {}, props.xmlns = nssvg, props), 
			children: (children || []),
			_node: null,
			_owner: null
		};
	}
	
	
	/**
	 * virtual component node factory
	 * 
	 * @param  {function} type
	 * @param  {Object=}  props
	 * @param  {any[]=}   children
	 * @return {VNode}
	 */
	function VComponent (type, props, children) {
		return {
			nodeType: 2, 
			type: type, 
			props: (props || type.defaultProps || {}), 
			children: (children || []),
			_node: null,
			_owner: null
		};
	}
	
	
	/**
	 * internal virtual node factory
	 * 
	 * @param {number}            nodeType
	 * @param {(function|string)} type
	 * @param {Object}            props
	 * @param {VNode[]}           children
	 * @param {(Node|null)}       _node
	 * @param {Component}         _owner
	 */
	function VNode (nodeType, type, props, children, _node, _owner) {
		return {
			nodeType: nodeType,
			type: type,
			props: props,
			children: children,
			_node: _node,
			_owner: _owner
		};
	}
	
	
	/**
	 * virtual blueprint node factory
	 * 
	 * @param  {Object} subject
	 * @return {Object} subject
	 */
	function VBlueprint (subject) {
		if (subject != null) {
			// if array run all VNodes through VBlueprint
			if (subject.constructor === Array) {
				for (var i = 0, length = subject.length; i < length; i++) {
					VBlueprint(subject[i]);
				}
			} else {
				// if a blueprint is not already constructed
				if (subject._node == null && document !== void 0) {
					// browser, cache blueprint node
					subject._node = createNode(subject.nodeType ? subject : VComponent(subject));
				}
			}
		}
	
		return subject;
	}
	
	
	/**
	 * create virtual element
	 * 
	 * @param  {(string|function|Object)} type
	 * @param  {Object=}                  props
	 * @param  {...*=}                    children
	 * @return {Object}
	 */
	function createElement (type, props) {
		var length = arguments.length;
		var children = [];
		var position = 2;
	
		// if props is not a normal object
		if (props == null || props.nodeType !== void 0 || props.constructor !== Object) {
			// update position if props !== undefined|null
			// this assumes that it would look like
			// createElement('type', null, ...children);
			if (props !== null) {
				position = 1; 
			}
	
			// default
			props = {};
		}
	
		// construct children
		for (var i = position; i < length; i++) {
			var child = arguments[i];
			
			// only add non null/undefined children
			if (child != null) {
				// if array add all its items this means that we can have
				// createElement('type', null, 'Hello', [1, 2], 'World')
				// then Hello, 1, 2 and World will all become
				// individual items in the children array of the VNode
				if (child.constructor === Array) {
					var len = child.length;
	
					// add array child
					for (var j = 0; j < len; j++) {
						assignElement(child[j], children); 
					} 
				} else {
					// add non-array child
					assignElement(child, children);
				}
			}
		}
	
		// if type is a function, create component VNode
		if (typeof type === 'function') {
			return VComponent(type, props, children);
		} else {
			// if first letter = @, create fragment VNode, else create element VNode
			var element = type[0] === '@' ? VFragment(children) : VElement(type, props, children);
	
			// special type, i.e [type] | div.class | #id
			if ((type.indexOf('.') > -1 || type.indexOf('[') > -1 || type.indexOf('#') > -1)) {
				parseVNodeType(type, props || {}, element);
			}
	
			// if props.xmlns is undefined  and type === svg|math 
			// assign svg && math namespaces to props.xmlns
			if (element.props.xmlns === void 0) {	
				if (type === 'svg') { 
					element.props.xmlns = nssvg; 
				} else if (type === 'math') { 
					element.props.xmlns = nsmath; 
				}
			}
	
			return element;
		}
	}
	
	
	/**
	 * assign virtual element
	 * 
	 * @param  {*}     element
	 * @param  {any[]} children
	 */
	function assignElement (element, children) {
		var childNode;
	
		if (element != null && element.nodeType !== void 0) {
			// default element
			childNode = element;
		} else if (typeof element === 'function') {
			// component
			childNode = VComponent(element);
		} else {
			// primitives, string, bool, number
			childNode = VText(element);
		}
	
		// push to children array
		children[children.length] = childNode;
	}
	
	
	/**
	 * special virtual element types
	 *
	 * @example h('inpu#id[type=radio]') <-- yields --> h('input', {id: 'id', type: 'radio'})
	 *
	 * @param  {Object} type
	 * @param  {Object} props
	 * @param  {Object} element
	 * @return {Object} element
	 */
	function parseVNodeType (type, props, element) {
		var matches;
		var regex;
		var classList = [];
	
		// default type
		element.type = 'div';
	
		// if undefined, create and cache RegExp
		if (!parseVNodeType.regex) {
			regex = parseVNodeType.regex = new RegExp(
				'(?:(^|#|\\.)([^#\\.\\[\\]]+))|(\\[(.+?)(?:\\s*=\\s*(\"|\'|)((?:\\\\[\"\'\\]]|.)*?)\\5)?\\])','g'
			);
		} else {
			regex = parseVNodeType.regex;
		}
	
		// execute RegExp, iterate matches
		while (matches = regex.exec(type)) {
			var typeMatch      = matches[1];
			var valueMatch     = matches[2];
			var propMatch      = matches[3];
			var propKeyMatch   = matches[4];
			var propValueMatch = matches[6];
	
			if (typeMatch === '' && valueMatch !== '') {
				// type
				element.type = valueMatch;
			} else if (typeMatch === '#') { 
				// id
				props.id = valueMatch;
			} else if (typeMatch === '.') { 
				// class(es)
				classList[classList.length] = valueMatch;
			} else if (propMatch[0] === '[') { 
				// attribute
				// remove `[`, `]`, `'` and `"` characters
				if (propValueMatch != null) {
					propValueMatch = propValueMatch.replace(/\\(["'])/g, '$1').replace(/\\\\/g, "\\");
				}
	
				if (propKeyMatch === 'class') {
					propKeyMatch = 'className';
				}
	
				// h('input[checked]') or h('input[checked=true]') yield {checked: true}
				props[propKeyMatch] = propValueMatch || true;
			}
		}
	
		// if there are classes in classList, create className prop member
		if (classList.length !== 0) {
			props.className = classList.join(' ');
		}
	
		// assign props
		element.props = props;
	}
	
	
	/**
	 * clone and return an element having the original element's props
	 * with new props merged in shallowly and new children replacing existing ones.
	 * 
	 * @param  {Object}  subject
	 * @param  {Object=} props
	 * @param  {any[]=}  children
	 * @return {Object}
	 */
	function cloneElement (subject, newProps, newChildren) {
		newProps = newProps || {};
	
		// copy props
		each(subject.props, function (value, name) {
			if (newProps[name] === void 0) {
				newProps[name] = value;
			}
		});
	
		// assign children
		if (newChildren) {
			var length = newChildren.length;
	
			// and new children is not an empty array
			if (length > 0) {
				var children = [];
	
				// copy old children
				for (var i = 0; i < length; i++) {
					assignElement(newChildren[i], children);
				}
			}
		}
	
		return VElement(subject.type, newProps, newChildren);
	}
	
	
	/**
	 * DOM factory
	 * 
	 * create references to common dom elements
	 *
	 * @param {any[]=} types
	 */
	function DOM (types) {
		// default to preset types if non passed
		types = types || [
			'h1','h2','h3','h4','h5', 'h6','audio','video','canvas',
			'header','nav','main','aside','footer','section','article','div',
			'form','button','fieldset','form','input','label','option','select','textarea',
			'ul','ol','li','p','a','pre','code','span','img','strong','time','small','hr','br',
			'table','tr','td','th','tbody','thead',
		];
	
		var elements = {};
	
		// add element factories
		for (var i = 0, length = types.length; i < length; i++) {
			var type = types[i]; elements[type] = VElement.bind(null, type);
		}
	
		// optional usefull helpers
		if (elements.text)      { elements.text      = VText; }
		if (elements.fragment)  { elements.fragment  = VFragment; }
		if (elements.component) { elements.component = VComponent; }
		
		// if in list of types, add related svg element factories
		if (elements.svg) {
			var svgs = [
				'rect','path','polygon','circle','ellipse','line','polyline','image','marker','a','symbol',
				'linearGradient','radialGradient','stop','filter','use','clipPath','view','pattern','svg',
				'g','defs','text','textPath','tspan','mpath','defs','g','marker','mask'
			];
	
			for (var i = 0, length = svgs.length; i < length; i++) {
				var type = svgs[i]; 
	
				elements[type] = VSvg.bind(null, type);
			}
		}
	
		return elements;
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
	 * create element factory
	 * 
	 * @param  {string}  element
	 * @return {function}
	 */
	function createFactory (type, props) {
		return props ? VElement.bind(null, type, props) : VElement.bind(null, type);
	}
	
	
	/**
	 * Children, mocks React.Children top-level api
	 *
	 * @return {Object}
	 */
	function Children () {
		return {
			only: function only (children) {
			  	return isArray(children) && children.length === 1 ? children[0] : panic('expects one child!');
			},
			map: function map (children, func) {
				return isArray(children) ? children.map(func) : children;
			},
			forEach: function forEach (children, func) {
				return isArray(children) ? children.forEach(func) : children;
			},
			toArray: function toArray (children) {
				return isArray(children) ? children : children.slice(0);
			},
			count: function count (children) {
				return isArray(children) ? children.length : 0;
			}
		}
	}
	
	
	/**
	 * retrieve virtual node
	 * 
	 * @param  {(function|object)} subject
	 * @return {VNode}
	 */
	function retrieveVNode (subject) {
		if (subject.type) {
			return subject;
		} else {
			return typeof subject === 'function' ? VComponent(subject) : createElement('@', null, subject);
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
	 * @param  {(function|Object)} subject
	 * @param  {Node|string}       target
	 * @return {function}
	 */
	function render (subject, target, callback) {
		// renderer
		function reconciler (props) {
				if (initial === 1) {
					// dispatch mount
					mount(element, node);
	
					// register mount has been dispatched
					initial = 0;
	
					// assign component
					if (component == null) { 
						component = node._owner;
					}
				} else {
					// update props
					if (props !== void 0) {
						if (component.shouldComponentUpdate !== void 0 && 
							component.shouldComponentUpdate(props, component.state) === false) {
							return reconciler;
						}
	
						component.props = props;
					}
	
					// update component
					component.forceUpdate();
				}
	
	   		return reconciler;
	   	}
	
	   	var component;
	   	var node;
	
	   	if (subject.render !== void 0) {
	   		// create component from object
	   		node = VComponent(createClass(subject));
	   	} else if (subject.type === void 0) {
	   		// normalization
	   		if (subject.constructor === Array) {
				// fragment array
	   			node = createElement('@', null, subject);	   			
	   		} else {
	   			node = VComponent(subject);
	   		}
	   	} else {
	   		node = subject;
	   	}
	
	   	// server-side
	   	if (document === void 0) {
	   		return renderToString(node);
	   	}
	
		// retrieve mount element
		var element = retrieveMount(target);
	
		// initial mount registry
		var initial = 1;
	
		// hydration
	   	if (element.hasAttribute('hydrate')) {
	   		// dispatch hydration
	   		hydrate(element, node, 0, vempty);
	
	   		// cleanup element hydrate attributes
	   		element.removeAttribute('hydrate');
	
	   		// register mount has been dispatched
	   		initial = 0;
	
	   		// assign component
	   		if (component == null) {
	   			component = node._owner; 
	   		}
	   	} else {
	   		reconciler();
	   	}
	
	   	if (typeof callback === 'function') {
	   		callback();
	   	}
	
	   	return reconciler;
	}
	
	
	/**
	 * mount render
	 * 
	 * @param  {Node}   element
	 * @param  {Object} newNode
	 * @return {number}
	 */
	function mount (element, newNode) {
		// clear element
		element.textContent = '';
		// create element
		appendNode(newNode, element, createNode(newNode));
	}
	
	
	/**
	 * retrieve mount element
	 * 
	 * @param  {*} subject
	 * @return {Node}
	 */
	function retrieveMount (subject) {
		// document not available
		if (subject != null && subject.nodeType != null) {
			return subject;
		}
	
		var target = document.querySelector(subject);
	
		// default to document.body if no match/document
		return (target === null || target === document) ? document.body : target;
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * patch (extraction)
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * extract node
	 * 
	 * @param  {Object} subject
	 * @param  {Object} props
	 * @return {Object} 
	 */
	function extractVNode (subject) {		
		// static node
		if (subject.nodeType !== 2) {
			return subject;
		}
	
		// possible component class, type
		var candidate;
		var type = subject.type;
	
		if (type._component !== void 0) {
			// cache
			candidate = type._component;
		} else if (type.constructor === Function && type.prototype.render === void 0) {
			// function components
			candidate = type._component = createClass(type);
		} else {
			// class / createClass components
			candidate = type;
		}
	
		// create component instance
		var component = subject._owner = new candidate(subject.props);
	
		if (subject.children.length !== 0) {
			component.props.children = subject.children;
		}
		
		// retrieve vnode
		var vnode = retrieveRender(component);
	
		// if keyed, assign key to vnode
		if (subject.props.key !== void 0 && vnode.props.key === void 0) {
			vnode.props.key = subject.props.key;
		}
	
		// if render returns a component
		if (vnode.nodeType === 2) {
			vnode = extractVNode(vnode);
		}
	
		// assign component node
		component._vnode = VNode(
			vnode.nodeType,
			vnode.type,
			subject.props = vnode.props, 
			subject.children = vnode.children,
			null,
			null
		);
	
		if (type.stylesheet === void 0) {
			type.stylesheet = component.stylesheet !== void 0 ? component.stylesheet : null;
		}
	
		return vnode;
	}
	
	
	/**
	 * retrieve VNode from render function
	 *
	 * @param  {Object} subject
	 * @return {Object}
	 */
	function retrieveRender (component) {
		// retrieve vnode
		var vnode = component.render(component.props, component.state, component);
	
		// if vnode, else fragment
		return vnode.nodeType !== void 0 ? vnode : VFragment(vnode);
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * patch (nodes)
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * patch
	 *  
	 * @param {Object} newNode  
	 * @param {Object} oldNode  
	 */
	function patch (newNode, oldNode) {
		var newNodeType = newNode.nodeType, oldNodeType = oldNode.nodeType;
	
		// remove operation
		if (newNodeType === 0) { 
			return 1; 
		}
		// add operation
		else if (oldNodeType === 0) { 
			return 2; 
		}
		// text operation
		else if (newNodeType === 3 && oldNodeType === 3) { 
			if (newNode.children !== oldNode.children) {
				return 3; 
			} 
		}
		// replace operation
		else if (newNode.type !== oldNode.type) {
			return 4;
		}
		// key operation
		else if (newNode.props.key !== oldNode.props.key) {
			return 5; 
		}
		// recursive
		else {		
			// extract node from possible component node
			var currentNode = newNodeType === 2 ? extractVNode(newNode) : newNode;
	
			// opt1: if currentNode and oldNode are the identical, exit early
			if (currentNode !== oldNode) {			
				// component will update
				if (oldNodeType === 2) {
					var component = oldNode._owner;
	
					if (
						component.shouldComponentUpdate && 
						component.shouldComponentUpdate(newNode.props, newNode._owner.state) === false
					) {
						return 0;
					}
	
					if (component.componentWillUpdate) {
						component.componentWillUpdate(newNode.props, newNode._owner.state);
					}
				}
	
				// opt2: patch props only if oldNode is not a textNode 
				// and the props objects of the two noeds are not equal
				if (currentNode.props !== oldNode.props) {
					patchProps(currentNode, oldNode); 
				}
	
				// references, children & children length
				var currentChildren = currentNode.children;
				var oldChildren = oldNode.children;
				var newLength = currentChildren.length;
				var oldLength = oldChildren.length;
	
				// opt3: if new children length is 0 clear/remove all children
				if (newLength === 0) {
					// but only if old children is not already cleared
					if (oldLength !== 0) {
						oldNode._node.textContent = '';
						oldNode.children = currentChildren;
					}	
				}
				// if newNode has children
				// opt4: if currentChildren and oldChildren are identical, exit early
				else {
					// count of index change when we remove items to keep track of the new index to reference
					var deleteCount = 0, parentElement = oldNode._node;
	
					// for loop, the end point being which ever is the 
					// greater value between newLength and oldLength
					for (var i = 0; i < newLength || i < oldLength; i++) {
						var newChild = currentChildren[i] || vempty;
						var oldChild = oldChildren[i] || vempty;
						var action   = patch(newChild, oldChild);
	
						// if action dispatched, 
						// ref: 1 - remove, 2 - add, 3 - text update, 4 - replace, 5 - key
						if (action !== 0) {
							// index is always the index 'i' (minus) the deleteCount to get the correct
							// index amidst .splice operations that mutate oldChildren's indexes
							var index = i - deleteCount;
	
							switch (action) {
								// remove operation
								case 1: {
									var nodeToRemove = oldChildren[index];
	
									// remove node from the dom
									removeNode(nodeToRemove, parentElement, nodeToRemove._node);
									// normalize old children, remove from array
									splice(oldChildren, index, 1);
									// update delete count, increment
									deleteCount = deleteCount + 1;
	
									break;
								}
								// add operation
								case 2: {
									addNode(
										index, 
										oldLength, 
										parentElement, 
										createNode(newChild), 
										newChild, 
										oldChild
									);
	
									// normalize old children, add to array								
									splice(oldChildren, index, 0, newChild);
									// update delete count, decrement
									deleteCount = deleteCount - 1;
	
									break;
								}
								// text operation
								case 3: {
									// update dom textNode value and oldChild textNode content
									oldChild._node.nodeValue = oldChild.children = newChild.children;
	
									break;
								}
								// replace operation
								case 4: {
									// replace dom node
									replaceNode(newChild, parentElement, createNode(newChild), oldChild._node);
									// update old children, replace array element
									oldChildren[index] = newChild; 
	
									break;
								}
								// key operation
								case 5: {
									var fromIndex;
									var newChildKey = newChild.props.key;
	
									// opt: try to find newChild in oldChildren
									for (var j = 0; j < oldLength; j = j + 1) {
										// found newChild in oldChildren, reference index, exit
										if (oldChildren[j].props.key === newChildKey) {
											fromIndex = j;
											break;
										}
									}
	
									// opt: if found newChild in oldChildren, only move element
									if (fromIndex !== void 0) {
										// reference element from oldChildren that matches newChild key
										var element = oldChildren[fromIndex];
	
									    addNode(index, oldLength, parentElement, element._node, element, oldChild);
	
										// remove element from 'old' oldChildren index
									    splice(oldChildren, fromIndex, 1);
									    // insert into 'new' oldChildren index
									    splice(oldChildren, index, 0, element);
	
									    // note: the length of oldChildren does not change in this case
									} else {
										// remove node
										if (newLength < oldLength) {
											// reference node to be removed
											var nodeToRemove = oldChildren[index];
											
											// remove node from the dom
											removeNode(nodeToRemove, parentElement, nodeToRemove._node);
	
											// normalize old children, remove from array
											splice(oldChildren, index, 1);
	
											// update delete count, increment
											deleteCount = deleteCount + 1;
	
											// update old children length, decrement
											oldLength = oldLength - 1;
										}
										// add node
										else if (newLength > oldLength) {
											addNode(
												index, 
												oldLength, 
												parentElement, 
												createNode(newChild), 
												newChild, 
												oldChild
											);
	
											// normalize old children, add to array
											splice(oldChildren, index, 0, newChild);
	
											// update delete count, decrement
											deleteCount = deleteCount - 1;
	
											// update old children length, increment
											oldLength = oldLength + 1;
										}
										// replace node
										else {
											// replace dom node
											replaceNode(
												newChild, 
												parentElement, 
												createNode(newChild), 
												oldChild._node
											);
	
											// update old children, replace array element
											oldChildren[index] = newChild; 
										}
									}
	
									break;
								}
							}
						}
					}
				}
	
				// component did update
				if (oldNodeType === 2 && component.componentDidUpdate) {
					component.componentDidUpdate(newNode.props, newNode._owner.state);
				}
			}
		}
	
		return 0;
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * patch (props)
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * handles diff props
	 * 
	 * @param  {Object} node
	 * @param  {number} index
	 * @param  {Object} old
	 */
	function patchProps (newNode, oldNode) {
		var propsDiff = diffProps(newNode.props, oldNode.props, newNode.props.xmlns || '', []);
		var length    = propsDiff.length;
	
		// if diff length > 0 apply diff
		if (length !== 0) {
			var target = oldNode._node;
	
			for (var i = 0; i < length; i++) {
				var prop = propsDiff[i];
				// [0: action, 1: name, 2: value, namespace]
				updateProp(target, prop[0], prop[1], prop[2], prop[3]);
			}
	
			oldNode.props = newNode.props;
		}
	}
	
	
	/**
	 * collect prop diffs
	 * 
	 * @param  {Object}  newProps 
	 * @param  {Object}  oldProps 
	 * @param  {string}  namespace
	 * @param  {Array[]} propsDiff
	 * @return {Array[]}          
	 */
	function diffProps (newProps, oldProps, namespace, propsDiff) {
		// diff newProps
		for (var newName in newProps) { 
			diffNewProps(newProps, oldProps, newName, namespace, propsDiff); 
		}
		// diff oldProps
		for (var oldName in oldProps) { 
			diffOldProps(newProps, oldName, namespace, propsDiff); 
		}
	
		return propsDiff;
	}
	
	
	/**
	 * diff newProps agains oldProps
	 * 
	 * @param  {Object}  newProps 
	 * @param  {Object}  oldProps 
	 * @param  {string}  newName
	 * @param  {string}  namespace
	 * @param  {Array[]} propsDiff
	 * @return {Array[]}          
	 */
	function diffNewProps (newProps, oldProps, newName, namespace, propsDiff) {
		var newValue = newProps[newName];
		var oldValue = oldProps[newName];
	
		if (newValue != null && oldValue !== newValue) {
			propsDiff[propsDiff.length] = ['setAttribute', newName, newValue, namespace];
		}
	}
	
	
	/**
	 * diff oldProps agains newProps
	 * 
	 * @param  {Object}  newProps 
	 * @param  {Object}  oldName 
	 * @param  {string}  namespace
	 * @param  {Array[]} propsDiff
	 * @return {Array[]}          
	 */
	function diffOldProps (newProps, oldName, namespace, propsDiff) {
		var newValue = newProps[oldName];
	
		if (newValue == null) {
			propsDiff[propsDiff.length] = ['removeAttribute', oldName, '', namespace];
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * dom (events)
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * check if a name is an event-like name, i.e onclick, onClick...
	 * 
	 * @param  {string}  name
	 * @param  {*}       value
	 * @return {boolean}
	 */
	function isEventName (name) {
		return name.charCodeAt(0) === 111 && name.charCodeAt(1) === 110 && name.length > 3;
	}
	
	
	/**
	 * extract event name from prop
	 * 
	 * @param  {string} name
	 * @return {string}
	 */
	function extractEventName (name) {
		return name.substr(2).toLowerCase();
	}
	
	
	/**
	 * assign refs
	 * 
	 * @param {Object} subject
	 * @param {Node}   element
	 * @param {Object} refs
	 */
	function assignRefs (element, ref, component) {
		// hoist typeof info
		var type = typeof ref;
		var refs = component.refs === null ? component.refs = {} : component.refs;
	
		if (type === 'string') {
			// string ref, assign
			refs[ref] = element;
		} else if (type === 'function') {
			// function ref, call with element as arg
			ref(element);
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * dom (nodes)
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * remove element
	 *
	 * @param  {Object} oldNode
	 * @param  {Node}   parent
	 * @param  {Node}   prevNode
	 */
	function removeNode (oldNode, parent, prevNode) {
		// remove node
		parent.removeChild(prevNode);
	
		if (oldNode._owner && oldNode._owner.componentWillUnmount) {
			oldNode._owner.componentWillUnmount();
		}
	}
	
	
	/**
	 * insert element
	 *
	 * @param  {Object} newNode
	 * @param  {Node}   parent
	 * @param  {Node}   nextNode
	 * @param  {Node=}  beforeNode
	 */
	function insertNode (newNode, parent, nextNode, beforeNode) {
		if (newNode._owner && newNode._owner.componentWillMount) {
			newNode._owner.componentWillMount();
		}
	
		// insert node
		parent.insertBefore(nextNode, beforeNode);
	
		if (newNode._owner && newNode._owner.componentDidMount) {
			newNode._owner.componentDidMount();
		}
	}
	
	
	/**
	 * append element
	 *
	 * @param  {Object} newNode
	 * @param  {Node}   parent
	 * @param  {Node}   nextNode
	 * @param  {Node=}  beforeNode
	 */
	function appendNode (newNode, parent, nextNode, beforeNode) {
		if (newNode._owner && newNode._owner.componentWillMount) {
			newNode._owner.componentWillMount();
		}
	
		// append node
		parent.appendChild(nextNode);
		
		if (newNode._owner && newNode._owner.componentDidMount) {
			newNode._owner.componentDidMount();
		}
	}
	
	
	/**
	 * replace element
	 *
	 * @param  {Object} newNode
	 * @param  {Node}   parent 
	 * @param  {Node}   prevNode
	 * @param  {Node}   nextNode
	 */
	function replaceNode (newNode, parent, nextNode, prevNode) {
		// replace node
		parent.replaceChild(nextNode, prevNode);
	}
	
	
	/**
	 * append/insert node
	 * 
	 * @param {number} index        
	 * @param {number} oldLength    
	 * @param {Object} newNode      
	 * @param {Node}   parentElement
	 * @param {Node}   newElement   
	 * @param {Object} oldNode      
	 */
	function addNode (index, oldLength, parent, newElement, newNode, oldNode) {
		// append/insert
		if (index > (oldLength - 1)) {
			// append node to the dom
			appendNode(newNode, parent, newElement);
		} else {
			// insert node to the dom at an specific position
			insertNode(newNode, parent, newElement, oldNode._node);
		}
	}
	
	
	/**
	 * create element
	 * 
	 * @param  {Object}  subject
	 * @param  {Object=} component
	 * @param  {string=} namespace
	 * @return {Node}
	 */
	function createNode (subject, component, namespace) {
		var nodeType = subject.nodeType;
		
		if (nodeType === 3) {
			// textNode
			return subject._node = document.createTextNode(subject.children || '');
		} else {
			// element
			var element;
			var props;
	
			if (subject._node) {
				// clone, blueprint node/hoisted vnode
				props = subject.props;
				element = subject._node;
			} else {
				// create
				var newNode  = nodeType === 2 ? extractVNode(subject) : subject;
				var type     = newNode.type;
				var children = newNode.children;
				var length   = children.length;
	
				props = newNode.props;
	
				// assign namespace
				if (props.xmlns !== void 0) { 
					namespace = props.xmlns; 
				}
	
				// if namespaced, create namespaced element
				if (namespace != null) {
					// if undefined, assign svg namespace
					if (props.xmlns === void 0) {
						props.xmlns = namespace;
					}
	
					element = document.createElementNS(namespace, type);
				} else {
					if (newNode.nodeType === 11) {
						element = document.createDocumentFragment();
					} else {
						element = document.createElement(type);
					}
				}
	
				if (props !== oempty) {
					// diff and update/add/remove props
					assignProps(element, props, 0);
				}
	
				// vnode has component attachment
				if (subject._owner != null) {
					(component = subject._owner)._vnode._node = element;
				}
	
				if (length !== 0) {				
					// create children
					for (var i = 0; i < length; i++) {
						var newChild = children[i];
	
						// clone vnode of hoisted/pre-rendered node
						if (newChild._node) {
							newChild = children[i] = VNode(
								newChild.nodeType,
								newChild.type,
								newChild.props,
								newChild.children,
								newChild._node.cloneNode(true),
								null
							);
						}
	
						// append child
						appendNode(newChild, element, createNode(newChild, component, namespace));
						
						// we pass namespace and component so that 
						// 1. if element is svg element we can namespace all its children
						// 2. if nested refs we can propagate them to a parent component
					}
				}
	
				subject._node = element;
			}
	
			// refs
			if (props.ref !== void 0 && component !== void 0) {
				assignRefs(element, props.ref, component);
			}
	
			// check if a stylesheet is attached
			if (subject.type.stylesheet != null) {
				if (subject.type.stylesheet === 0) {
					element.setAttribute(nsstyle, subject.type.id);
				} else {
					// note: since we mutate the .stylesheet property to 0 in stylesheet
					// this will execute exactly once at any given runtime lifecycle
					stylesheet(element, subject.type);
				}
			}
	
			// cache element reference
			return element;
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * dom (props)
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * assign prop for create element
	 * 
	 * @param  {Node}   target
	 * @param  {Object} props
	 * @param  {number} onlyEvents
	 */
	function assignProps (target, props, onlyEvents) {
		for (var name in props) {
			assignProp(target, name, props, onlyEvents);
		}
	}
	
	
	/**
	 * assign prop for create element
	 * 
	 * @param  {Node}   target
	 * @param  {string} name
	 * @param  {Object} props
	 * @param  {number} onlyEvents
	 */
	function assignProp (target, name, props, onlyEvents) {
		var propValue = props[name];
	
		if (isEventName(name)) {
			// add event listener
			target.addEventListener(extractEventName(name), propValue, false);
		} else if (onlyEvents !== 1) {
			// add attribute
			updateProp(target, 'setAttribute', name, propValue, props.xmlns);
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
			propValue === nssvg || 
			propValue === nsmath
		) {
			return;
		}
	
		// if xlink:href set, exit, 
		if (name === 'xlink:href') {
			return (target[action + 'NS'](nsxlink, 'href', propValue), void 0);
		}
	
		var isSVG = 0;
		var propName;
	
		// normalize class/className references, i.e svg className !== html className
		// uses className instead of class for html elements
		if (namespace === nssvg) {
			isSVG = 1;
			propName = name === 'className' ? 'class' : name;
		} else {
			propName = name === 'class' ? 'className' : name;
		}
	
		var targetProp = target[propName];
		var isDefinedValue = (propValue != null && propValue !== false) ? 1 : 0;
	
		// objects, adds property if undefined, else, updates each memeber of attribute object
		if (isDefinedValue === 1 && typeof propValue === 'object') {
			targetProp === void 0 ? target[propName] = propValue : updatePropObject(propValue, targetProp);
		} else {
			if (targetProp !== void 0 && isSVG === 0) {
				target[propName] = propValue;
			} else {
				// remove attributes with false/null/undefined values
				if (isDefinedValue === 0) {
					target['removeAttribute'](propName);
				} else {
					// reduce value to an empty string if true, <tag checked=true> --> <tag checked>
					if (propValue === true) { 
						propValue = ''; 
					}
	
					target[action](propName, propValue);
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
			var propValue = value[propName];
	
			// if targetAttr object has propName, assign
			if (propName in targetAttr) {
				targetAttr[propName] = propValue;
			}
		}
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * server-side (sync) string
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * server side render
	 * 
	 * @param  {(Object|function)} subject
	 * @param  {string}            template
	 * @return {string}
	 */
	function renderToString (subject, template) {
		var styles = [''];
		var vnode  = retrieveVNode(subject);
		var lookup = {};
		var body   = renderVNodeToString(vnode, styles, lookup);
		var style  = styles[0];
	
		if (template) {
			if (typeof template === 'string') {
				return template.replace('{{body}}', body+style);
			} else {
				return template(body, style);
			}
		} else {
			return body+style;
		}
	}
	
	
	/**
	 * render a VNode to string
	 * 
	 * @param  {Object} subject
	 * @param  {str[1]} styles
	 * @return {string}  
	 */
	function renderVNodeToString (subject, styles, lookup) {
		var nodeType = subject.nodeType;
	
		// textNode
		if (nodeType === 3) {
			return escape(subject.children);
		}
	
		var component = subject.type;
		var vnode;
	
		// if component
		if (nodeType === 2) {
			// if cached
			if (component._html) {
				return component._html;
			} else {
				vnode = extractVNode(subject);
			}
		} else {
			vnode = subject;
		}
	
		// references
		var type = vnode.type;
		var props = vnode.props;
		var children = vnode.children;
	
		var schildren = '';
	
		if (props.innerHTML) {
			// special case when a prop replaces children
			schildren = props.innerHTML;
		} else {		
			// construct children string
			if (children.length !== 0) {
				for (var i = 0, length = children.length; i < length; i++) {
					schildren += renderVNodeToString(children[i], styles, lookup);
				}
			}
		}
	
		var sprops = renderStylesheetToString(nodeType, component, styles, renderPropsToString(props), lookup);
	
		if (nodeType === 11) {
			return schildren;
		} else if (isvoid[type]) {
			// <type ...props>
			return '<'+type+sprops+'>';
		} else {
			// <type ...props>...children</type>
			return '<'+type+sprops+'>'+schildren+'</'+type+'>';
		}
	}
	
	
	/**
	 * render stylesheet to string
	 * 
	 * @param  {function}  component
	 * @param  {string[1]} styles    
	 * @param  {string}    string   
	 * @return {string}          
	 */
	function renderStylesheetToString (nodeType, component, styles, string, lookup) {
		// stylesheet
		if (nodeType === 2 && component.stylesheet != null) {
			// insure we only every create one 
			// stylesheet for every component
			if (component.css === void 0 || component.css[0] !== '<') {
				// initial build css
				styles[0] += stylesheet(null, component);
				lookup[component.id] = true;
			} else if (!lookup[component.id]) {
				styles[0] += component.css;
				lookup[component.id] = true;
			}
	
			// add attribute to element
			string += ' '+nsstyle+'='+'"'+component.id+'"';
		}
	
		return string;
	}
	
	
	/**
	 * render props to string
	 * 
	 * @param  {Object} props
	 * @param  {string} string
	 * @return {string}
	 */
	function renderPropsToString (props) {
		var string = '';
	
		// construct props string
		if (props !== oempty && props !== null) {
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
									name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
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
	 * ---------------------------------------------------------------------------------
	 * 
	 * server-side (sync) cache
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * renderToCache
	 * 
	 * @param  {Object} subject
	 * @return {Object} subject
	 */
	function renderToCache (subject) {
		if (subject != null) {
			// if array run all VNodes through VBlueprint
			if (subject.constructor === Array) {
				for (var i = 0, length = subject.length; i < length; i++) {
					renderToCache(subject[i]);
				}
			} else {
				// if a blueprint is not already constructed
				if (subject._html == null) {
					subject._html = renderToString(subject);
				}
			}
		}
	
		return subject;
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * server-side (async) stream
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * renderToStream
	 * 
	 * @param  {(Object|function)} subject 
	 * @return {Stream}
	 */
	function renderToStream (subject, template) {	
		return subject ? (
			new Stream(
				subject,
				template == null ? null : template.split('{{body}}')
			)
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
		this.lookup   = {};
		this.stack    = [];
		this.styles   = [''];
		this.template = template;
		this.node     = retrieveVNode(subject);
	
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
					var style = this.styles[0];
	
					// if there are styles, append
					if (style.length !== 0) {
						this.push(style);
					}
	
					// has template, push closing
					this.template && this.push(this.template[1]);
	
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
					this._pipe(this.node, true, this.stack, this.styles, this.lookup);
				}
			}
		},
		_pipe: {
			value: function (subject, flush, stack, styles, lookup) {
				// if there is something pending in the stack
				// give that priority
				if (flush && stack.length !== 0) {
					stack.pop()(this); return;
				}
	
				var nodeType = subject.nodeType;
	
				// text node
				if (nodeType === 3) {
					// convert string to buffer and send chunk
					this.push(escape(subject.children)); return;
				}
	
				var component = subject.type;
				var vnode;
	
				// if component
				if (nodeType === 2) {
					// if cached
					if (component._html) {
						this.push(component._html); return;
					} else {
						vnode = extractVNode(subject);
					}
				} else {
					vnode = subject;
				}
	
				// references
				var type = vnode.type;
				var props = vnode.props;
				var children = vnode.children;
	
				var sprops = renderStylesheetToString(nodeType, component, styles, renderPropsToString(props), lookup);
	
				if (isvoid[type]) {
					// <type ...props>
					this.push('<'+type+sprops+'>');
				} else {
					var opening = '';
					var closing = '';
	
					// fragments do not have opening/closing tags
					if (nodeType !== 11) {
						// <type ...props>...children</type>
						opening = '<'+type+sprops+'>';
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
							// split this operation into asynchronously added chunks of data
							var index = 0;
							// add one more for the closing tag
							var middlwares = length + 1;
	
							var doctype = type === 'html';
							var eof = type === 'body' || doctype;
	
							// for each _read if queue has middleware
							// middleware execution will take priority
							function middlware (stream) {
								// done, close html tag, delegate next middleware
								if (index === length) {
									// if the closing tag is body or html
									// we want to push the styles before we close them
									if (eof && styles[0].length !== 0) {
										stream.push(styles[0]);
										styles[0] = '';
									}
	
									stream.push(closing);
								} else {
									stream._pipe(children[index++], false, stack, styles, lookup);
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
								stack[stack.length] = middlware;
							}
						}
					}
				}
			}
		}
	}) : oempty;
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * hydrate
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * hydrates a server-side rendered dom structure
	 * 
	 * @param  {Node}    element
	 * @param  {Object}  newNode
	 * @param  {number}  index
	 * @param  {Object}  parentNode
	 */
	function hydrate (element, newNode, index, parentNode) {
		var currentNode = newNode.nodeType === 2 ? extractVNode(newNode) : newNode;
		var nodeType    = currentNode.nodeType;
	
		// is a fragment if `newNode` is not a text node and type is fragment signature '@'
		var isFragmentNode = nodeType === 11 ? 1 : 0;
		var newElement     = isFragmentNode === 1 ? element : element.childNodes[index];
	
		// if the node is not a textNode and
		// has children hydrate each of its children
		if (nodeType === 1) {
			var newChildren = currentNode.children;
			var newLength = newChildren.length;
	
			for (var i = 0; i < newLength; i++) {
				hydrate(newElement, newChildren[i], i, currentNode);
			}
	
			// hydrate the dom element to the virtual element
			currentNode._node = newElement;
	
			// exit early if fragment
			if (isFragmentNode === 1) { 
				return; 
			}
	
			// add events if any
			assignProps(newElement, currentNode.props, 1);
	
			// assign refs
			if (currentNode.props.ref !== void 0 && currentNode._owner !== void 0) {
				assignRefs(newElement, currentNode.props.ref, currentNode._owner);
			}
		}
		/*
			when we reach a string child, it is assumed that the dom representing it is a single textNode,
			we do a look ahead of the child, create & append each textNode child to documentFragment 
			starting from current child till we reach a non textNode such that on h('p', 'foo', 'bar') 
			foo and bar are two different textNodes in the fragment, we then replace the 
			single dom's textNode with the fragment converting the dom's single textNode to multiple
		 */
		else if (nodeType === 3) {
			// fragment to use to replace a single textNode with multiple text nodes
			// case in point h('h1', 'Hello', 'World') output: <h1>HelloWorld</h1>
			// but HelloWorld is one text node in the dom while two in the vnode
			var fragment = document.createDocumentFragment();
			var children = parentNode.children;
	
			// look ahead of this nodes siblings and add all textNodes to the the fragment.
			// exit when a non text node is encounted
			for (var i = index, length = children.length - index; i < length; i++) {
				var textNode = children[i];
	
				// exit early once we encounter a non text/string node
				if (textNode.nodeType !== 3) {
					break;
				}
	
				// create textnode, append to the fragment
				fragment.appendChild(createNode(textNode));
			}
	
			// replace the textNode with a set of textNodes
			element.replaceChild(fragment, element.childNodes[index]);
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
	 * findDOMNode
	 * 
	 * @param  {Object} component
	 * @return {(Node|boolean)}
	 */
	function findDOMNode (component) {
		return component._vnode && component._vnode._node;
	}
	
	
	/**
	 * unmountComponentAtNode
	 * 
	 * @param  {Node} container
	 */
	function unmountComponentAtNode (container) {
		container.textContent = '';
	}
	
	
	/**
	 * component class
	 * 
	 * @param {Object=} props
	 */
	function Component (props) {
		if (props) {
			// if dev env and has propTypes, validate props
			if (development) {
				var propTypes = this.propTypes || this.constructor.propTypes;
	
				if (propTypes) {				
					validatePropTypes(
						props, 
						propTypes, 
						this.displayName || this.constructor.name
					);
				}
			}
	
			// componentWillReceiveProps lifecycle
			if (this.componentWillReceiveProps) { 
				this.componentWillReceiveProps(props); 
			}
	
			// assign props
			this.props = props;
		} else {
			this.props = (this.getDefaultProps && this.getDefaultProps()) || {};
		}
	
		this.state = (this.getInitialState && this.getInitialState()) || {};
	
		this.refs = this._vnode = null;
	}
	
	
	/**
	 * component prototype
	 * 
	 * @type {Object}
	 */
	Component.prototype = Object.create(null, {
		setState: { value: setState },
		forceUpdate: { value: forceUpdate },
		withAttr: { value: withAttr }
	});
	
	
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
	
		// update state
		for (var name in newState) {
			this.state[name] = newState[name];
		}		
	
		this.forceUpdate();
	
		// callback, call
		if (callback) {
			callback(this.state);
		}
	}
	
	
	/**
	 * force an update
	 *
	 * @return {void}
	 */
	function forceUpdate () {
		if (this._vnode != null) {
			// componentWillUpdate lifecycle
			if (this.componentWillUpdate) {
				this.componentWillUpdate(this.props, this.state);
			}
	
			// patch update
			patch(retrieveRender(this), this._vnode);
	
			// componentDidUpdate lifecycle
			if (this.componentDidUpdate) {
				this.componentDidUpdate(this.props, this.state);
			}
		}
	}
	
	
	/**
	 * withAttr
	 * 
	 * @param  {(any[]|string)}      props
	 * @param  {function[]|function} setters
	 * @param  {function=}           callback
	 * @return {function=}           
	 */
	function withAttr (props, setters, callback) {
		var component = this, isarray = typeof props === 'object';
	
		return function () {
			// array of bindings
			if (isarray) {
				for (var i = 0, length = props.length; i < length; i++) {
					updateAttr(this, props[i], setters[i]);
				}
			} else {
				updateAttr(this, props, setters);
			}
	
			callback ? callback(component) : component.forceUpdate();
		}
	}
	
	
	/**
	 * withAttr(update attribute)
	 * 
	 * @param  {Node}           target
	 * @param  {(string|any[])} prop
	 * @param  {function}       setter
	 */
	function updateAttr (target, prop, setter) {
		var value;
	
		if (typeof prop === 'string') {
			value = prop in target ? target[prop] : target.getAttribute(prop);
	
			if (value != null) { 
				setter(value); 
			}
		} else {
			value = prop();
			
			if (value != null) {
				setter in target ? target[setter] = value : target.setAttribute(setter, value);
			}
		}
	}
	
	
	/**
	 * create component
	 * 
	 * @param  {(Object|function)} subject
	 * @return {function}
	 */
	function createClass (subject) {
		// component cache
		if (subject._component) {
			return subject._component;
		}
	
		var func  = typeof subject === 'function';
		var shape = func ? subject() : subject;
	
		if (shape.nodeType) {
			var vnode = shape;
				shape = { render: function () { return vnode; } };
		}
		
		function component (props) {
			Component.call(this, props);
			binder(this);
		}
	
		var prototype = component.prototype = Object.create(Component.prototype);
		var methods = [];
		var length = 0;
		var auto = true;
	
		function binder (ctx) {
			var i = length;
	
			while (i--) {
				var name = methods[i];
	
				ctx[name] = ctx[name].bind(ctx);
			}
		}
	
		each(shape, function (value, name) {
			if (name !== 'statics') {
				prototype[name] = value;
	
				if (
					auto && typeof 
					value === 'function' &&
	
					name !== 'render' && 
					name !== 'stylesheet' && 
	
					name !== 'getInitialState' && 
					name !== 'getDefaultProps' && 
					name !== 'shouldComponentUpdate' &&
	
					name !== 'componentWillReceiveProps' &&
					name !== 'componentWillUpdate' &&
					name !== 'componentDidUpdate' &&
					name !== 'componentWillMount' &&
					name !== 'componentDidMount' &&
					name !== 'componentWillUnmount'
				) {
					methods[length++] = name;
				}
			}
		});
	
		if (func) {
			if (!shape.displayName) {
				component.prototype.displayName = getDisplayName(subject);
			}
	
			subject._component = component;
		}
	
		if (shape.statics) {
			each(shape.statics, function (value, name) {
				(shape === subject ? component : subject)[name] = value;
			});
		}
	
		return component.constructor = prototype.constructor = component;
	}
	
	
	/**
	 * retrieve function name
	 * 
	 * @param  {function} subject
	 * @return {string}
	 */
	function getDisplayName (subject) {
		// the regex may return nothing, ['',''] insures we can always retrieves something
		var displayName = (/function ([^(]*)/.exec(subject.valueOf()) || ['',''])[1];
	
		return displayName === '' && subject.name !== void 0 ? subject.name : displayName;
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
	 * @param  {(Node|null)}   element
	 * @param  {function}      component
	 * @return {(string|void)}
	 */
	function stylesheet (element, component) {
		var id   = '';
		var css  = '';
		var func = typeof component.stylesheet === 'function';
	
		// create stylesheet, executed once per component constructor(not instance)
		if (func) {
			// generate unique id
			id = component.name + random(6);
	
			// property id, selector id 
			var prefix      = '['+nsstyle+'='+id+']';
			var currentLine = '';
	        
	        var content = (
	            // retrieve css string and format...
	            component.stylesheet()
	                // remove all spaces after `:`
	                .replace(/:[ \t]+/g, ':')
	
	                // remove all spaces before `;`
	                .replace(/[ \t]+;/g, ';')
	                
	                // remove all leading spaces and newlines                
	                .replace(/^[\t\n ]*/gm, '')
	
	                // remove all spaces/tabs after opening `{` and closing `}` tags
	                .replace(/(\{|\})[ \t]+/g, '$1')
	
	                // remove all spaces/tabs before opening `{` and closing `}` tags
	                .replace(/[ \t]+(\{|\})/g, '$1')
	                
	                // remove all trailing spaces and tabs
	                .replace(/[ \t]+$/gm, '')
	
	                // insure opening `{` are on the same line as the selector
	                .replace(/(.*)\n(?:|[\t\n ])\{/g, '$1{')
	
	                // drop every block and property into newlines
	                .replace(/(\{|\}|;)(?!\n)/g, '$1\n')
	
	                // patch declarations ending without ;
	                .replace(/([^\{\};\n\/]$)/gm, '$1;')
	        );
	
			var characters = input(content);
	
			// css parser, SASS &{} is supported, styles are namespaced,
			// appearance, transform, animation & keyframes are prefixed,
			// keyframes and corrosponding animations are also namespaced
	        while (!characters.eof()) {
	        	var character     = characters.next();
	        	var characterCode = character.charCodeAt(0);
	
	        	// end of current line, \n
	        	if (characterCode === 10) {
	        		var firstLetter = currentLine.charCodeAt(0);
	
	        		// `@` character
	        		if (firstLetter === 64) {
	                    var firstCharacter = currentLine.charCodeAt(1);
	
	        			// @keyframe/@root, `k` or @root, `r` character
	        			if (firstCharacter === 107 || firstCharacter === 114) {
	        				if (firstCharacter == 107) {
	                            // @keyframes
	                            currentLine = currentLine.substr(1, 10) + id + currentLine.substr(11);
	                        } else {
	                            // @root
	                            currentLine = '';
	                        }
	
	        				// till the end of the keyframe block
	        				while (!characters.eof()) {
	        					var char = characters.next();
	        					var charCode = char.charCodeAt(0);
	        					
	        					// `\n` character
	        					if (charCode !== 10) {
	        						currentLine += char;
	
	                                var timetravel = characters.look(2);
	
	        						// `}`, `}` characters
	        						if (charCode === 125 && timetravel && timetravel.charCodeAt(0) === 125) {
	        							currentLine += ''; break;
	        						}
	        					}
	        				}
	
	        				if (firstLetter === 107) {
	                            // add prefix, webkit is the only reasonable prefix to use here
	                            // -moz- has supported this since 2012 and -ms- was never a thing here
	                            currentLine = '@-webkit-'+currentLine+'}@'+currentLine;
	                        }
	        			}
	
	                    // do nothing to @media...
	        		} else {
	        			// animation: `a`, `n`, `n` characters
	        			if (
	        				firstLetter === 97 && 
	        				currentLine.charCodeAt(1) === 110 && 
	        				currentLine.charCodeAt(8) === 110
	    				) {
	        				// remove space after `,` and `:`
	        				currentLine = currentLine.replace(/, /g, ',').replace(/: /g, ':');
	
	        				var splitLine = currentLine.split(':');
	
	        				// re-build line
	        				currentLine = (
	        					splitLine[0] + ':' + id + (splitLine[1].split(',')).join(','+id)
	    					);
	
	                        // add prefix, same as before webkit is the only reasonable prefix
	                        // for older andriod phones
	        				currentLine = '-webkit-' + currentLine + currentLine;
	        			} else if (
	        				// `t`, `r`, `:`, characters
	        				(
	        					firstLetter === 116 && 
	        					currentLine.charCodeAt(1) === 114 && 
	        					currentLine.charCodeAt(9) === 58
	    					) 
	        					||
	        				// `a`, `p`, `:`, characters
	        				(
	        					firstLetter === 97 && 
	        					currentLine.charCodeAt(1) === 112 && 
	        					currentLine.charCodeAt(10) === 58
	    					)
	    				) {
	        				// transform/appearance
	                        // the above if condition assumes the length and placement
	                        // of the 3 characters listed to pass the condition
	        				currentLine = '-webkit-' + currentLine + currentLine;
	        			} else {
	        				// selector declaration, if last char is `{`
	                        // note: the format block made it so that this will always
	                        // be the case for selector declarations
	        				if (currentLine.charCodeAt(currentLine.length - 1) === 123) {
	        					var splitLine         = currentLine.split(',');
	        					var currentLineBuffer = '';
	
	                            // iterate through all the characters and build
	                            // this allows us to prefix multiple selectors with namesapces
	                            // i.e h1, h2, h3 --> [namespace] h1, ....
	        					for (var i = 0, length = splitLine.length; i < length; i++) {
	        						var selector = splitLine[i],
	        							first    = selector.charCodeAt(0),
	        							affix    = '';
	
	                                // if first selector
	    							if (i === 0) {
	    								// `:`, `&`, characters
	    								affix = (first === 58 || first === 38) ? prefix : prefix + ' ';
	    							} else {
	                                    affix = ',' + prefix;
	                                }
	
	        						if (first === 123) {
	        							// `{`, character
	        							currentLineBuffer += affix + selector;
	        						} else if (first === 38) { 
	        							// `&` character
	        							currentLineBuffer += affix + selector.substr(1);
	        						} else {
	        							currentLineBuffer += affix + selector;
	        						}
	        					}
	
	        					currentLine = currentLineBuffer;
	        				}
	        			}
	        		}
	
	        		css += currentLine;
	        		currentLine = '';
	        	} else {
	                // `/` character
	                if (characterCode === 47) {
	                    var nextCharaterCode = characters.peek().charCodeAt(0);
	
	                    // `/`, `/` characters
	                    if (nextCharaterCode === 47) {
	                        // till end of line comment 
	                        characters.sleep('\n');
	                    } else if (nextCharaterCode === 42) {
	                        characters.next();
	
	                        // `/`, `*` character
	                        while (!characters.eof()) {
	                            // till end of block comment
	                            if (
	                                // `*`, `/` character
	                                characters.next().charCodeAt(0)  === 42 && 
	                                characters.peek().charCodeAt(0) === 47
	                            ) {
	                                characters.next(); break;
	                            }
	                        }
	                    } else {
	                        currentLine += character;
	                    }
	                } else {
	                    currentLine += character;
	                }
	        	}
	        }
	
	        // signifies that we are done parsing the components css
	        // so we can avoid this whole step for any other instances
	        component.stylesheet = 0;
	
	        component.id = id;
	        component.css = css;
		} else {
			// retrieve cache
			id = component.id;
			css = component.css;
		}
	
	    if (element == null) {
	    	// cache for server-side rendering
	    	return component.css = '<style id="'+id+'">'+css+'</style>';
	    } else {
	    	element.setAttribute(nsstyle, id);
	
	    	// create style element and append to head
	    	// only when stylesheet is a function
	    	// this insures we will only ever excute this once 
	    	// since we mutate the .stylesheet property to 0
	    	if (func) {
	    		// avoid adding a style element when one is already present
	    		if (document.querySelector('style#'+id) == null) {
		    		var style = document.createElement('style');
		    		
	                style.textContent = css;
	    			style.id = id;
	
					document.head.appendChild(style);
	    		}
	    	}
	    }
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * PropTypes
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * log validation errors
	 * 
	 * @param {string} error 
	 */
	function logValidationError (error) {
		console.error('Warning: Failed propType: ' + error + '`.');
		// this error is thrown as a convenience to trace the call stack
		sandbox(function () { panic(error); });
	}
	
	
	/**
	 * create error message, invalid prop types
	 * 
	 * @param  {string} propName
	 * @param  {*}      propValue
	 * @param  {string} displayName
	 * @param  {string} expectedType
	 * @return {Error}
	 */
	function createInvalidPropTypeError (propName, propValue, displayName, expectedType) {
		return panic((
			'Invalid prop `' + propName + '` of type `' + 
			getDisplayName(propValue.constructor).toLowerCase() +
			'` supplied to `' + displayName + '`, expected `' + expectedType
		), true);
	}
	
	
	/**
	 * create error message, required prop types
	 * 
	 * @param  {string} propName
	 * @param  {string} displayName
	 * @return {Error}
	 */
	function createRequiredPropTypeError (propName, displayName) {
		return panic(
			('Required prop `' + propName + '` not specified in `' +  displayName), 
			true
		);
	}
	
	
	/**
	 * validate prop types
	 * 
	 * @param  {Object} props       
	 * @param  {Object} propTypes   
	 * @param  {string} displayName
	 */
	function validatePropTypes (props, propTypes, displayName) {
		for (var propName in propTypes) {
			var typeValidator = propTypes[propName];
	
			// execute validator
			var validationResult = typeValidator(props, propName, displayName,
				createInvalidPropTypeError, createRequiredPropTypeError
			);
	
			// an error has occured only if the validator returns a non-falsey value
			if (validationResult) {
				logValidationError(validationResult);
			}
		} 
	}
	
	
	/**
	 * check type validity
	 * 
	 * @param  {*}  propValue
	 * @param  {*}  expectedType
	 * @return {Boolean}
	 */
	function isValidPropType (propValue, expectedType) {
		// uppercase first letter, converts something like `function` to `Function`
		expectedType = (
			expectedType[0].toUpperCase() + expectedType.substr(1, expectedType.length)
		);
	
		// check if the propValue is of this type
		return (
			propValue != null && 
			propValue.constructor === window[expectedType]
		);
	}
	
	
	/**
	 * primitive type validator
	 * 
	 * @param  {*} propValue
	 * @param  {*} expectedType
	 * @return {boolean|undefined}
	 */
	function primitiveTypeValidator (propValue, expectedType) {
		// if it's not of the valid type
		if (isValidPropType(propValue, expectedType) === false) {
			return 1;
		}
	}
	
	
	/**
	 * type validator factory
	 * 
	 * @param  {*}         expectedType
	 * @param  {boolean}   isRequired
	 * @param  {function=} validator
	 * @return {function}
	 */
	function createTypeValidator (expectedType, isRequired, validator) {
		validator = validator || primitiveTypeValidator;
	
		function typeValidator (props, propName, displayName) {
			var propValue = props[propName];
	
			displayName = displayName || '#unknown';
	
			if (propValue != null) {
				if (validator(propValue, expectedType, props, propName, displayName) === 1) {
					return createInvalidPropTypeError(
						propName, propValue, displayName,  expectedType
					);
				}
			} else if (isRequired === 1) {
				// if required prop i.e propTypes.bool.isRequired
				return createRequiredPropTypeError(propName, displayName);
			}
		}
	
		// assign .isRequired
		if (isRequired !== 1) {
			typeValidator.isRequired = createTypeValidator(expectedType, 1, validator);
		}
	
		return (typeValidator._propType = expectedType, typeValidator);
	}
	
	
	/**
	 * hash-maps (arrays/objects) validator factory 
	 * 
	 * @param  {string} type
	 * @return {function}
	 */
	function createMapOfTypeValidator (type) {
		return function (validator) {
			var expectedTypeName = validator._propType + type;
	
			return createTypeValidator(expectedTypeName, 0,
				function (propValue, expectedType, props, propName, displayName) {
					// failed, exit early if not array
					if (!isArray(propValue)) {
						return 1;
					}
	
					var failed = 0;
	
					// check if every item in the array is of expectedType
					for (var i = 0, length = propValue.length; i < length; i++) {
						// failed, exit early
						if (validator(propValue, i, displayName)) {
							return failed = 1;
						}
					}
	
					return failed;
				}
			);
		};
	}
	
	
	/**
	 * PropTypes constructor
	 * 
	 * @return {Object}
	 */
	function PropTypes () {
		var primitivesTypes = ['number', 'string', 'bool', 'array', 'object', 'func', 'symbol'];
		var propTypesObj    = {};
	
		// assign primitive validators
		for (var i = 0, length = primitivesTypes.length; i < length; i++) {
			var name = primitivesTypes[i];
	
			// bool / func ---> boolean / function
			var primitiveType = name === 'bool' ? name + 'ean'  :
								name === 'func' ? name + 'tion' : 
								name;
	
			// create, assign validator
			propTypesObj[name] = createTypeValidator(primitiveType);
		}
	
		// element
		propTypesObj.element = createTypeValidator('element', 0,
			function (propValue) {
				if (isValidElement(propValue) === false) {
					return 1;
				}
			}
		);
	
		// number, string, element ...or array of those
		propTypesObj.node = createTypeValidator('node', 0,
			function (propValue) {
				if (
					isString(propValue)       === false &&
					isNumber(propValue)       === false &&
					isValidElement(propValue) === false
				) {
					return 1;
				}
			}
		);
	
		// any defined data type
		propTypesObj.any = createTypeValidator('any', 0,
			function (propValue) {
				if (propValue != null) {
					return 1;
				}
			}
		);
	
		// instance of a constructor
		propTypesObj.instanceOf = function (Constructor) {
			var expectedTypeName = getDisplayName(Constructor);
	
			return createTypeValidator(expectedTypeName, 0,
				function (propValue, expectedType) {
					if (propValue && propValue.constructor !== Constructor) {
						return 1;
					}
				}
			);
		};
	
		// object of a certain shape
		propTypesObj.shape = function (shape) {
			var keys = Object.keys(shape);
			var length = keys.length;
			
			var expectedType = keys.map(function (name) { 
				return name + ': ' + shape[name]._propType; 
			});
	
			var expectedTypeName = '{\n\t' + expectedType.join(', \n\t') + '\n}';
	
			return createTypeValidator(expectedTypeName, 0,
				function (propValue, expectedType, props, propName, displayName) {
					// fail if propValue is not an object
					if (!isObject(propValue)) {
						return 1;
					}
	
					var propValueKeys = Object.keys(propValue);
	
					// fail if object has different number of keys
					if (propValueKeys.length !== length) {
						return 1;
					}
	
					var failed = 0;
	
					// check if object has the same keys
					for (var name in shape) {
						var validator = shape[name];
	
						// failed, exit
						if (!propValue[name] || validator(propValue, name, displayName)) {
							return failed = 1;
						}
					}
	
					return failed;
				}
			);
		};
	
		// limited to certain values
		propTypesObj.oneOf = function (values) {
			var expectedTypeName = values.join(' or ');
	
			return createTypeValidator(expectedTypeName, 0,
				function (propValue) {
					// default state
					var failed = 1;
	
					// if propValue is one of the values
					for (var i = 0, length = values.length; i < length; i++) {
						// passed, exit
						if (values[i] === propValue) {
							return failed = 0;
						}
					}
	
					return failed;
				}
			);
		};
	
		// limited to certain types
		propTypesObj.oneOfType = function (types) {
			var expectedTypeName = types.map(function (type) {
				return type._propType;
			}).join(' or ');
	
			return createTypeValidator(expectedTypeName, 0,
				function (propValue, expectedType, props, propName, displayName) {
					// default state
					var failed = 1;
	
					// if propValue is of one of the types
					for (var i = 0, length = types.length; i < length; i++) {
						if (!types[i](props, propName, displayName)) {
							return failed = 0;
						}
					}
	
					return failed;
				}
			);
		};
	
		// an array with values of a certain type
		propTypesObj.arrayOf = createMapOfTypeValidator('[]');
		// an object with property values of a certain type
		propTypesObj.objectOf = createMapOfTypeValidator('{}');
	
		return propTypesObj;
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * streams
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * create stream, getter/setter
	 * 
	 * @param  {*}                  value
	 * @param  {(function|boolean)} middleware
	 * @return {function}
	 */
	function stream (value, middleware) {
		// this allows us to return values in a .then block that will
		// get passed to the next .then block
		var chain = { then: null, catch: null }; 
		// .then/.catch listeners
		var listeners = { then: [], catch: [] };
	
		var store;
	
		// predetermine if a middlware was passed
		var hasMiddleware = !!middleware;
		// predetermine if the middlware passed is a function
		var middlewareFunc = hasMiddleware && typeof middleware === 'function';
	
		// constructor
		function Stream (value) {
			// received value, update stream
			if (arguments.length !== 0) {
				dispatch('then', store = value);
				return Stream;
			}
	
			var output;
	
			// if you pass a middleware function i.e a = stream(1, String)
			// the stream will return 1 processed through String
			// if you pass a boolean an assumtion is made tha the store
			// is a function and that it should return the functions return value
			if (hasMiddleware) {
				// if middleware function
				output = middlewareFunc ? middleware(store) : store();
			} else {
				output = store;
			}
	
			return output;  
		}
	
		// dispatcher, dispatches listerners
		function dispatch (type, value) {
			var collection = listeners[type];
			var length = collection.length;
	
			if (length !== 0) {
				// executes a listener, adding the return value to the chain
				function action (listener) {
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
			dispatch('catch', reason); 
		}
	
		// push listener
		function push (type, listener, end) {
			listeners[type].push(function (chain) {
				return listener(chain);
			});
	
			return !end ? Stream : void 0;
		};
	
		// add then listener
		function then (listener, onerror) {
			if (onerror) {
				error(onerror);
			}
	
			if (listener) {
				return push('then', listener, onerror);
			}
		}
	
		// add done listener, ends the chain
		function done (listener, onerror) {
			then(listener, onerror || true);
		}
	
		// create a map
		function map (dep) {
			return stream(function (resolve) {
				resolve(function () { return dep(Stream()); });
			}, true);
		}
	
		// end/reset a stream
		function end () {
			chain.then = null; 
			chain.catch = null;
			listeners.then = [];
			listeners.catch = [];
		}
	
		// add catch/error listener
		function error (listener) {
			return push('catch', listener);
		}
	
		// ...JSON.strinfigy()
		function toJSON () {
			return store;
		}
	
		// {function}.valueOf()
		function valueOf () {
			return store; 
		}
	
		// assign public methods
		Stream.then = then;
		Stream.done = done;
		Stream.catch = error;
		Stream.map = map;
		Stream.end = end;
		Stream.valueOf = valueOf;
		Stream.toJSON = toJSON;
	
		// id to distinguish functions from streams
		Stream._stream = true;
	
		// acts like a promise if function is passed as value
		typeof value === 'function' ? value(resolve, reject) : Stream(value);
	
		return Stream;
	}
	
	
	/**
	 * combine two or more streams
	 * 
	 * @param  {function}  reducer
	 * @return {streams[]} deps
	 */
	stream.combine = function (reducer, deps) {
		// if deps is not an array, we dependencies are arguments
		// build deps array inline
		if (typeof deps !== 'object') {
			var args = [];
	
			for (var i = 0, length = arguments.length; i < length; i++) {
				args[i] = arguments[i];
			}
	
			deps = args;
		}
	
		// add address for the prev store
		deps[deps.length] = null;
	
		// the previous store will always be the last item in the list of dependencies
		var prevStoreAddress = deps.length - 1;
	
		// second arg === 1 allows us to pass a function as the streams store
		// that runs when retrieved
		return stream(function (resolve) {
			resolve(function () {
				// extract return value of reducer, assign prevStore, return it
				return deps[prevStoreAddress] = reducer.apply(null, deps);
			});
		}, true);
	};
	
	
	/**
	 * do something after all dependecies have resolved
	 * 
	 * @param  {any[]}    deps
	 * @return {function}
	 */
	stream.all = function (deps) {
		var resolved = [];
	
		// pushes a value to the resolved array and compares if resolved length
		// is equal to deps this will tell us when all dependencies have resolved
		function resolver (value, resolve) {
			resolved[resolved.length] = value;
	
			if (resolved.length === deps.length) {
				resolve(resolved);
			}
		}
	
		return stream(function (resolve, reject) {
			// check all dependencies, if a dependecy is a stream attach a listener
			// reject / resolve as nessessary.
			for (var i = 0, length = deps.length; i < length; i++) {
				var value = deps[i];
	
				if (value._stream) {
					value.then(function (value) {
						resolver(value, resolve);
					}).catch(function (reason) {
						reject(reason);
					});
				} else {
					resolver(value, resolve);
				}
			}
		});
	};
	
	
	/**
	 * creates a new stream that accumulates everytime it is called
	 *
	 * @example var bar = stream.scan((sum, n) => { sum + n }, 0, foo = {Stream}) 
	 * foo(1)(1)(2) // bar => 4
	 *
	 * @param  {function} reducer
	 * @param  {*}        accumulator
	 * @param  {function} stream 
	 * @return {function} stream
	 */
	stream.scan = function (reducer, accumulator, stream) {
		return Stream(function (resolve) {
			// attach a listener to stream, 
			stream.then(function () {
				// update the accumulator with the returned value of the reducer,
				accumulator = reducer(accumulator, stream);
				// resolve the store of the stream we return back
				resolve(accumulator);
			});
		});
	};
	
	
	/**
	 * create new stream in resolved state
	 * 
	 * @param  {any}    value
	 * @return {Stream}
	 */
	stream.resolve = function (value) {
		return stream(function (resolve, reject) {
			setTimeout(resolve, 0, value);
		});
	};
	
	
	/**
	 * create new stream in rejected state
	 * 
	 * @param  {any}    value 
	 * @return {Stream}
	 */
	stream.reject = function (value) {
		return stream(function (resolve, reject) {
			setTimeout(reject, 0, value);
		});
	};
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * requests
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * http requests
	 * 
	 * @param  {string}  url
	 * @param  {*}       payload 
	 * @param  {string}  enctype 
	 * @param  {boolean} withCredentials
	 * @return {Object}
	 */
	function request () {
		/**
		 * serialize + encode object
		 * 
		 * @example serialize({url:'http://.com'}) //=> 'url=http%3A%2F%2F.com'
		 * 
		 * @param  {Object} object   
		 * @param  {Object} prefix
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
		 * parse, format response
		 * 
		 * @param  {Object} xhr
		 * @return {*} 
		 */
		function response (xhr, type) {			
			var body; 
			var type; 
			var data;
			var header = xhr.getResponseHeader('Content-Type');
	
			if (!xhr.responseType || xhr.responseType === "text") {
		        data = xhr.responseText;
		    } else if (xhr.responseType === "document") {
		        data = xhr.responseXML;
		    } else {
		        data = xhr.response;
		    }
	
			// get response format
			type = (
				header.indexOf(';') !== -1 ? 
				header.split(';')[0].split('/') : 
				header.split('/')
			)[1];
	
			switch (type) {
				case 'json': { body = JSON.parse(data); break; }
				case 'html': { body = (new DOMParser()).parseFromString(data, 'text/html'); break; }
				default    : { body = data; }
			}
	
			return body;
		}
	
		/**
		 * create http request
		 * 
		 * @param  {string}            method
		 * @param  {string}            uri
		 * @param  {(Object|string)=}  payload
		 * @param  {string=}           enctype
		 * @param  {boolean=}          withCredential
		 * @param  {initial=}          initial
		 * @param  {function=}         config
		 * @param  {string=}           username
		 * @param  {string=}           password
		 * @return {function}
		 */
		function create (
			method, uri, payload, enctype, withCredentials, initial, config, username, password
		) {
			// return a a stream
			return stream(function (resolve, reject, stream) {
				// if XMLHttpRequest constructor absent, exit early
				if (window.XMLHttpRequest === void 0) {
					return;
				}
	
				// create xhr object
				var xhr = new window.XMLHttpRequest();
	
				// retrieve browser location 
				var location = window.location;
	
				// create anchor element
				var anchor = document.createElement('a');
				
				// plug uri as href to anchor element, 
				// to extract hostname, port, protocol properties
				anchor.href = uri;
	
				// check if cross origin request
				var isCrossOriginRequest = !(
					anchor.hostname   === location.hostname && 
					anchor.port       === location.port &&
					anchor.protocol   === location.protocol && 
					location.protocol !== 'file:'
				);
	
				// remove reference, for garbage collection
				anchor = null;
	
				// open request
				xhr.open(method, uri, true, username, password);
	
				// on success resolve
				xhr.onload  = function onload () { resolve(response(this)); };
				// on error reject
				xhr.onerror = function onerror () { reject(this.statusText); };
				
				// cross origin request cookies
				if (isCrossOriginRequest && withCredentials === true) {
					xhr.withCredentials = true;
				}
	
				// assign content type and payload
				if (method === 'POST' || method === 'PUT') {
					xhr.setRequestHeader('Content-Type', enctype);
	
					if (enctype.indexOf('x-www-form-urlencoded') > -1) {
						payload = serialize(payload);
					} else if (enctype.indexOf('json') > -1) {
						payload = JSON.stringify(payload);
					}
				}
	
				// if, assign inital value of stream
				if (initial !== void 0) {
					resolve(initial);
				}
	
				// if config, expose underlying XMLHttpRequest object
				// allows us to save a reference to it and call abort when required
				if (config !== void 0 && typeof config !== 'function') {
					config(xhr);
				}
	
				// send request
				payload !== void 0 ? xhr.send(payload) : xhr.send();
			});
		}
	
	
		/**
		 * create request method
		 * 
		 * @param {string}
		 * @param {function}
		 */
		function method (method) {
			return function (
				url, payload, enctype, withCredentials, initial, config, username, password
			) {
				// encode url
				var uri = encodeURI(url);
	
				// enctype syntax sugar
				switch (enctype) {
					case 'json': { enctype = 'application/json'; break; }
					case 'text': { enctype = 'text/plain'; break; }
					case 'file': { enctype = 'multipart/form-data'; break; }
					default:     { enctype = 'application/x-www-form-urlencoded'; }
				}
	
				// if has payload && GET pass payload as query string
				if (method === 'GET' && payload) {
					uri = uri + '?' + (typeof payload === 'object' ? serialize(payload) : payload);
				}
	
				// return promise-like stream
				return create(
					method, uri, payload, enctype, withCredentials, initial, config, username, password
				);
			}
		}
	
		/**
		 * request constructor
		 * 
		 * request({method: 'GET', url: '?'}) === request.get('?')
		 * 
		 * @param  {Object} subject
		 * @return {function}
		 */
		function Request (subject) {
			if (typeof subject === 'string') {
				return Request.get(subject);
			} else {
				return Request[(subject.method || 'GET').toLowerCase()](
					subject.url, 
					subject.payload || subject.data,
					subject.enctype, 
					subject.withCredentials,
					subject.initial,
					subject.config,
					subject.username, 
					subject.password
				);
			}
		}
	
		Request.get  = method('GET'),
		Request.post = method('POST');
	
		return Request;
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
	 * @param  {Object}        routes
	 * @param  {string}        address 
	 * @param  {string}        initialiser
	 * @param  {(string|Node)} element
	 * @param  {middleware}    middleware
	 * @return {Object}
	 */
	function router (routes, address, initialiser, element, middleware) {
		if (typeof routes === 'function') {
			routes = routes();
		}
	
		if (typeof address === 'function') {
			address = address();
		}
	
		if (typeof address === 'object') {
			element     = address.mount,
			initialiser = address.init,
			middleware  = address.middleware,
			address     = address.root;
		}
	
		if (element !== void 0) {
			each(routes, function (component, uri) {
				if (middleware !== void 0) {
					routes[uri] = function (data) {
						middleware(component, data, element, uri);
					}
				} else {
					routes[uri] = function (data) {
						render(VComponent(component, data), element);
					}
				}
			});
		}
	
		return Router(routes, address, initialiser);
	}
	
	
	/**
	 * router constructor
	 * 
	 * @param {any[]}     routes
	 * @param {string=}   address
	 * @param {function=} initialiser
	 */
	function Router (routes, address, initialiser) {
		// listens for changes to the url
		function listen () {
			if (interval !== 0) {
				// clear the interval if it's already set
				clearInterval(interval);
			}
	
			// start listening for a change in the url
			interval = setInterval(function () {
				var current = window.location.pathname;
	
				// if our store of the current url does not 
				// equal the url of the browser, something has changed
				if (location !== current) {					
					// update the location
					location = current;
	
					// dispatch route change
					dispatch();
				}
			}, 50);
		}
	
		// register routes
		function register () {
			// assign routes
			each(routes, function (callback, uri) {
				// - params is where we store variable names
				// i.e in /:user/:id - user, id are variables
				var params = [];
	
				// uri is the url/RegExp that describes the uri match thus
				// given the following /:user/:id/*
				// the pattern will be / ([^\/]+) / ([^\/]+) / (?:.*)
				var pattern = uri.replace(regex, function () {
					// id => 'user', '>>>id<<<', undefned
					var id = arguments[2];
	
					// if, not variable, else, capture variable
					return id != null ? (params[params.length] = id, '([^\/]+)') : '(?:.*)';
				});
	
				// assign a route item
				routes[uri] = [callback, new RegExp((address ? address + pattern : pattern) + '$'), params];
			}, null);
		}
	
		// called when the listener detects a route change
		function dispatch () {
			each(routes, function (route, uri) {
				var callback = route[0];
				var pattern  = route[1];
				var params   = route[2];
				var match    = location.match(pattern);
	
				// we have a match
				if (match != null) {
					// create params object to pass to callback
					// i.e {user: 'simple', id: '1234'}
					var data = match.slice(1, match.length);
	
					var args = data.reduce(function (previousValue, currentValue, index) {
							// if this is the first value, create variables store
							if (previousValue == null) {
								previousValue = {};
							}
	
							// name: value
							// i.e user: 'simple'
							// `vars` contains the keys for the variables
							previousValue[params[index]] = currentValue;
	
							return previousValue;
	
							// null --> first value
						}, null); 
	
					callback(args, uri);
				}
			});
		}
	
		// navigate to a uri
		function navigate (uri) {
			if (typeof uri === 'string') {
				history.pushState(null, null, address ? address + uri : uri);
			}
		}
	
		// middleware between event and route
		function link (to) {
			var func = typeof to === 'function';
	
			return function (e) {
				var target = e.currentTarget;
				var value  = func ? to.call(target, target) : to;
	
				navigate(target[value] || target.getAttribute(value) || value); 
			}
		}
	
		// normalize rootAddress format
		// i.e '/url/' -> '/url'
		if (typeof address === 'string' && address.substr(-1) === '/') {
			address = address.substr(0, address.length - 1);
		}
	
		var location = '';
		var interval = 0;
		var regex    = /([:*])(\w+)|([\*])/g;
		
		var api = {
			nav:    navigate,
			go:     history.go, 
			back:   history.back, 
			foward: history.foward, 
			link:   link
		};
	
	
		// register routes, start listening for changes
		register();
	
		// listens only while in the browser enviroment
		if (document !== void 0) {
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
					dispatch: compose.apply(null, chain)(store.dispatch), 
					subscribe: store.subscribe,
					connect: store.connect,
					replaceReducer: store.replaceReducer
				};
			}
		}
	}
	
	
	/**
	 * combines a set of reducers
	 * 
	 * @param  {Object}  reducers
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
			var callback;
	
			// if component
			if (element && typeof render === 'function' && typeof VComponent === 'function') {
				// create renderer
				callback = render(VComponent(subject, currentState, []), element);
			} else {
				callback = subject;
			}
	
			// subscribe to state updates, dispatching render on update
			subscribe(callback);
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
	 * ---------------------------------------------------------------------------------
	 * 
	 * animations
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * animate interface
	 * 
	 * @return {Object}
	 */
	function animate () {
		/**
		 * element has class
		 * 
		 * @param  {Node}    element
		 * @param  {string}  className
		 * @return {boolean}
		 */
		function hasClass (element, className) {
			return element.classList !== void 0 ? 
				element.classList.contains(className) : 
				element.className.indexOf(className) > -1;
		}
	
	
		/**
		 * element add class
		 * 
		 * @param {Node}   element
		 * @param {string} className
		 */
		function addClass (element, className) {
			if (element.classList !== void 0) {
				element.classList.add(className);
			} else if (hasClass(element, className) === true) {
				var classes = element.className.split(' ');
				// add new class, join array, assign
				classes[classes.length] = className; 
				element.className = classes.join(' ');			
			}
		}
	
	
		/**
		 * element remove class
		 * 
		 * @param {Node}
		 * @param {string}
		 */
		function removeClass (element, className) {
			if (element.classList !== void 0) {
				element.classList.remove(className);
			} else {
				var classes = element.className.split(' ');
				// remove className on index, join array, assign
				classes.splice(classes.indexOf(className), 1);
				element.className = classes.join(' ');
			}
		}
	
	
		/**
		 * element toggle class
		 * 
		 * @param {Node}   element   - target element
		 * @param {string} className - classname to toggle
		 */
		function toggleClass (element, className) {
			if (element.classList !== void 0) {
				element.classList.toggle(className);
			} else {
				hasClass(element, className) === true ? 
							removeClass(element, className) : 
							addClass(element, className);
			}
		}
	
	
		/**
		 * assign style prop (un)/prefixed
		 * 
		 * @param {Object} style
		 * @param {string} prop
		 * @param {string} value
		 */
		function prefix (style, prop, value) {
			// if !un-prefixed support
			if (style !== void 0 && style[prop] === void 0) {
				// chrome, safari, mozila, ie
				var vendors = ['webkit','Webkit','Moz','ms'];
	
				for (var i = 0, length = vendors.length; i < length; i++) {
					// vendor + capitalized ---> webkitAnimation
					prefixed = (
						vendors[i] + prop[0].toUpperCase() + prop.substr(1, prop.length)
					);
	
					// add prop if vendor prop exists
					if (style[prefixed] !== void 0) {
						style[prefixed] = value;
					}
				}
			} else {
				style[prop] = value;
			}
		}
	
	
		/**
		 * FLIP animate element, (First, Last, Invert, Play)
		 * 
		 * @example h('.card', {onclick: animate('active-state', 400, null, null, 'linear')})
		 *
		 * @param  {string}   className        end state class
		 * @param  {number=}  duration
		 * @param  {any[]=}   transformations  additional transforms
		 * @param  {string=}  transformOrigin
		 * @param  {number=}  easing
		 * @return {function}
		 */
		function flip (className, duration, transformations, transformOrigin, easing) {
			return function (element, callback) {
				transformations = transformations || '';
	
				// get element if selector
				if (typeof element === 'string') {
					element = document.querySelector(element);
				} else if (this.nodeType !== void 0) {
					element = this;
				}
	
				// check if element exists
				if (element === void 0 || element.nodeType === void 0) {
					panic('element not found');
				}
	
				var first, last, webAnimations,
					transform    = [],
					invert       = {},
					element      = element.currentTarget || element,
					style        = element.style,
					body         = document.body,
					runningClass = 'animation-running',
					transEvtEnd  = 'transitionend';
	
				// feature detection
				if (element.animate !== void 0 && typeof element.animate === 'function') {
					webAnimations = 1;
				}
	
				// get the first rect state of the element
				first = element.getBoundingClientRect();
				// assign last state if there is an end class
				if (className) {
					toggleClass(element, className);
				}
				// get last rect state of the element, if no nothing changed, use the first state
				last = className ? element.getBoundingClientRect() : first;
	
				// invert values
				invert.x  = first.left - last.left,
				invert.y  = first.top  - last.top,
				invert.sx = last.width  !== 0 ? first.width  / last.width  : 1,
				invert.sy = last.height !== 0 ? first.height / last.height : 1,
	
				// animation details
				duration  = duration || 200,
				easing    = easing || 'cubic-bezier(0,0,0.32,1)',
	
				// 0% state
				transform[0] = 'translate('+invert.x+'px,'+invert.y+'px) translateZ(0)'+
								' scale('+invert.sx+','+invert.sy+')',
	
				// if extra transformations
				transform[0] = transform[0] + ' ' + transformations,
	
				// 100% state
				transform[1] = 'translate(0,0) translateZ(0) scale(1,1) rotate(0) skew(0)';
	
				// assign transform origin if set
				if (transformOrigin !== void 0) {
					prefix(style, 'transformOrigin', transformOrigin);
				}
	
				// add animation state to dom
				addClass(element, runningClass);
				addClass(body, runningClass);
	
				// use native web animations api if present for better performance
				if (webAnimations === 1) {
					var player = element.animate(
						[{transform: transform[0]}, {transform: transform[1]}], 
						{duration: duration, easing: easing}
					);
	
					player.addEventListener('finish', onfinish, false);
				} else {
					// cleanup listener, transitionEnd
					element.addEventListener(transEvtEnd, onfinish, false);
					// assign first state
					prefix(style, 'transform', transform[0])
	
					// register repaint
					element.offsetWidth;
	
					var timeDetails = duration + 'ms ' + easing;
									
					// assign animation timing details
					prefix(
						style, 'transition', 'transform ' + timeDetails + ', ' + 'opacity ' + timeDetails
					);
	
					// assign last state, animation will playout, calling onfinish when complete
					prefix(style, 'transform', transform[1]);
				}
	
				// cleanup
				function onfinish (e) {
					if (webAnimations === 1) {
						// name of the event listener to remove when using webAnimations
						transEvtEnd = 'finish';
					} else {
						// bubbled events
						if (e.target !== element) {
							return;
						}
						// clear transition and transform styles
						prefix(style, 'transition', null); 
						prefix(style, 'transform', null);
					}
	
					// remove event listener
					element.removeEventListener(transEvtEnd, onfinish);
					// clear transform origin styles
					prefix(style, 'transformOrigin', null);
	
					// clear animation running styles
					removeClass(element, runningClass);
					removeClass(body, runningClass);
	
					// callback
					if (callback !== void 0 && typeof callback === 'function') {
						callback(element);
					}
				}
	
				return duration;
			}
		}
	
	
		/**
		 * css transitions/animations
		 * 
		 * @param  {string}
		 * @return {function}
		 */
		function css (type) {			
			return function keyframe (className, operation) {
				// default to addition
				if (operation === void 0) {
					operation = 1;
				}
	
				var reducer = operation|0 !== 0 ? addClass : removeClass;
	
				return function (element, callback) {
					// exit early in the absence of an element
					if (element == null || element.nodeType === void 0) {
						callback(element, keyframe);
						return;
					}
	
					// push to next event-cycle/frame
					setTimeout(function () {
						// add transition class this will start the transtion
						reducer(element, className);
	
						// exit early no callback,
						if (callback === void 0) {
							return;
						}
	
						var duration = 0, 
							transition = getComputedStyle(element)[type + 'Duration'];
	
						// if !(duration property)
						if (transition === void 0) {
							callback(element, keyframe);
							return;
						}
	
						// remove 's' & spaces, '0.4s, 0.2s' ---> '0.4,0.2', split ---> ['0.4','0.2']
						var transitions = (transition.replace(/s| /g, '').split(','));
	
						// increament duration (in ms)
						for (var i = 0, length = transitions.length; i < length; i++) {
							duration = duration + (1000 * parseFloat(transitions[i]));
						}
	
						// callback, duration of transition, passing element & keyframe to callback
						setTimeout(callback, duration, element, keyframe);
					});
				}
			}
		}
	
	
		return {
			flip:       flip,
			transition: css('transition'),
			animation:  css('animation')
		};
	}
	
	
	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * exports
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	
	/**
	 * bootstrap
	 * 
	 * @param  {Object} api
	 * @return {Object} api
	 */
	function bootstrap (api) {
		// if browser expose h
		if (window.window === window) {
			window.h = createElement;
		}
	
		return Object.defineProperties(api, {
	  		'PropTypes': {
	  			// only construct PropTypes when used
	  			get: function () {
	  				return (
	  					Object.defineProperty(
	  						this, 'PropTypes', { value: PropTypes() }
							),
	  					this.PropTypes
						);
	  			},
	  			configurable: true, 
	  			enumerable: true
	    	},
	  		'window': {
	  			get: function () { 
	  				return window; 
	  			}, 
	  			set: function (value) { 
	  				return window = value, document = value.document, value; 
	  			},
				},
	  		'enviroment': {
	  			get: function () { 
	  				return development ? 'development' : 'production'; 
	  			}, 
	  			set: function (value) {
	  				development = value === 'development'; 
	  			},
				}
			});
	}
	
	return bootstrap({
		// elements
		createElement:          createElement,
		isValidElement:         isValidElement,
		cloneElement:           cloneElement,
		createFactory:          createFactory,
		VText:                  VText,
		VElement:               VElement,
		VFragment:              VFragment,
		VSvg:                   VSvg,
		VComponent:             VComponent,
		VBlueprint:             VBlueprint,
		Children:               Children(),
		DOM:                    DOM,
	
		// render
		render:                 render,
		renderToString:         renderToString,
		renderToStaticMarkup:   renderToString,
		renderToStream:         renderToStream,
		renderToCache:          renderToCache,
	
		// components
		Component:              Component,
		createClass:            createClass,
		findDOMNode:            findDOMNode,
		unmountComponentAtNode: unmountComponentAtNode,
	
		// stores
		createStore:            createStore,
		applyMiddleware:        applyMiddleware,
		combineReducers:        combineReducers,
	
		// animations
		animate:                animate(),
		
		// http
		request:                request(),
		router:                 router,
	
		// streams
		stream:                 stream,
		input:                  input,
	
		// utilities
		escape:                 escape,
		panic:                  panic,
		sandbox:                sandbox,
		compose:                compose,
		random:                 random,
		defer:                  defer,
		flatten:                flatten,
		isObject:               isObject,
		isFunction:             isFunction,
		isString:               isString,
		isArray:                isArray,
		isDefined:              isDefined,
		isNumber:               isNumber,
		isArrayLike:            isArrayLike,
	
		// version
		version:                version,
	
		// alias
		h:                      createElement,
	
		// test utilities
		PropTypes:              null,
		window:                 null,
		enviroment:             null
	});
}));