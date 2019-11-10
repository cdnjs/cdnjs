/*!
 *  ___ __ __  
 * (   (  /  \ 
 *  ) ) )( () )
 * (___(__\__/ 
 * 
 * Dio is a blazing fast, lightweight (~9kb) feature rich Virtual DOM framework.
 * 
 * @author Sultan Tarimo <https://github.com/thysultan>
 * @licence MIT
 */
(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
		factory(exports);
	} else {
		factory(root);
	}
}(this, function (exports) {
	'use strict';

	var
	VERSION                    = '2.0.0',
	// signatures
	FRAGMENT                   = '@',
	SIGNATURE                  = '@DIO',
	STORE                      = '@DIO/STORE',
	// objects
	window                    = typeof global === 'object' ? global : exports,
	document                  = window.document,
	mathNS                    = 'http://www.w3.org/1998/Math/MathML',
	xlinkNS                   = 'http://www.w3.org/1999/xlink',
	svgNS                     = 'http://www.w3.org/2000/svg',
	// functions
	XMLHttpRequest            = window && window.XMLHttpRequest,
	hasOwnProperty            = Object.prototype.hasOwnProperty,
	slice                     = Array.prototype.slice,
	// other
	isDevEnv                  = registerEnviroment()|0,
	emptyNode                 = {nodeType: 0, type: '', props: {}, children: []},
	voidElements              = {
		'area': 0, 'base': 0, 'br': 0, '!doctype': 0, 'col': 0, 
		'embed': 0, 'wbr': 0, 'track': 0, 'hr': 0, 'img': 0, 'input': 0, 
		'keygen': 0, 'link': 0, 'meta': 0, 'param': 0, 'source': 0
	},
	specialVirtualElementTypeRegExp;


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * utilities
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	

	/**
	 * [].slice
	 * 
	 * @param  {any[]|IArrayLike<?>|Object} subject
	 * @param  {number=}                    startIndex
	 * @param  {number=}                    endIndex
	 * @return {any[]}
	 */
	function sliceArray (subject, startIndex, endIndex) {
		return (
			slice.call(subject, startIndex || 0, endIndex)
		);
	}

	/**
	 * [].splice
	 * 
	 * @param  {any[]}   subject
	 * @param  {number}  index
	 * @param  {number}  deleteCount
	 * @param  {Object=} itemToAdd
	 */
	function spliceArray (subject, index, deleteCount, item) {
		if (item === void 0) {
			// remove first item using faster shift if start of array
			if (index === 0) { return subject.shift(); }
			// remove last item using faster pop if end of array
			else if (index >= subject.length - 1) { return subject.pop(); }
			// remove at a specific index
			else { return subject.splice(index, deleteCount); }
		} else {
			// prepend using faster unshift if start of array
			if (index === 0) { return subject.unshift(item); }
			// append using faster push to end of array
			else if (index >= subject.length - 1) { return subject[subject.length] = item; }
			// insert at index
			else { return subject.splice(index, deleteCount, item); }
		}
	}

	/**
	 * throw/return error
	 * 
	 * @param  {string}   message
	 * @param  {number=}  silent
	 * @return {(undefined|Error)}
	 */
	function throwError (message, silent) {
		// create error
		var error = new Error(message);
		// silent, return erro
		if (silent === 1) { return error; }
		// throw error
		else { throw error; }
	}
	
	/**
	 * [].forEach or for in {}
	 * 
	 * @param  {(any[]|Object)} subject
	 * @param  {function}       callback
	 * @param  {*=}             thisArg
	 */
	function forEach (subject, callback, thisArg) {
		if (subject !== void 0 && subject !== null) {
			var len;

			if (subject.constructor === Array) {
				// arrays/array-like object
				for (var i = 0, len = subject.length; i < len; i = i + 1) {
					if (callback.call(thisArg, subject[i], i, subject) === false) {
						return void 0;
					}
				}
			} else {
				// objects 
				forIn(subject, callback, thisArg);
			}
		}
	}

	/**
	 * forIn helper
	 * 
	 * @param  {Object}   subject
	 * @param  {Function} callback
	 * @param  {*}        thisArg
	 */
	function forIn (subject, callback, thisArg) {
		// objects 
		for (var name in subject) {
			if (callback.call(thisArg, subject[name], name, subject) === false) { 
				return void 0;
			}
		}
	}

	/**
	 * [].map
	 * 
	 * @param  {any[]}    subject
	 * @param  {function} callback
	 * @param  {*=}       thisArg
	 * @return {any[]}    output
	 */
	function arrayMap (subject, callback, thisArg) {
		if (subject.map !== void 0) {
			return subject.map(callback, thisArg);
		} else {
			var len    = subject.length, 
				output = new Array(len);

			for (var i = 0; i < len; i = i + 1) {
				output[i] = callback.call(thisArg, subject[i], i, subject);
			}

			return output;
		}
	}

	/**
	 * [].filter
	 * @param  {any[]}    subject
	 * @param  {function} callback
	 * @param  {*=}       thisArg
	 * @return {any[]}    output
	 */
	function arrayFilter (subject, callback, thisArg) {
		if (subject.filter !== void 0) {
			return subject.filter(callback);
		} else {
			var output = [];

			for (var i = 0, len = subject.length; i < len; i = i + 1) {
				var value = subject[i];

				if (callback.call(thisArg, value, i, subject) === true) {
					output[output.length] = value;
				}
			}

			return output;
		}
	}

	/**
	 * [].reduce
	 * 
	 * @param  {any[]}    subject
	 * @param  {function} callback
	 * @param  {*}        initialValue
	 * @return {*}
	 */
	function arrayReduce (subject, callback, initialValue) {
		if (subject.reduce !== void 0) {
			return subject.reduce(callback, initialValue);
		} else {
			var value = initialValue

			for (var i = 0, len = subject.length; i < len; i = i + 1) {
				if (i in subject) {
					value = callback(value, subject[i], i, subject);
				}
			}

			return value;
		}
	}

	/**
	 * [].reduceRight
	 * 
	 * @param  {any[]}    subject
	 * @param  {function} callback
	 * @param  {*}        initialValue
	 * @return {*}
	 */
	function arrayReduceRight (subject, callback, initialValue) {
		if (subject.reduceRight !== void 0) {
			return subject.reduceRight(callback, initialValue);
		} else {
			var value = initialValue;

			for (var len = subject.length, i = len - 1; i >= 0; i = i - 1) {
				if (i in subject) value = callback(value, subject[i], i, subject);
			}

			return value;
		}
	}

	/**
	 * flatten array
	 *
	 * @param  {any[]}  subject
	 * @param  {any[]=} output
	 * @return {any[]}  output
	 */
	function arrayFlatten (subject, output) {
		output = output || [];
				
		for (var i = 0, len = subject.length; i < len; i = i + 1){
			var item = subject[i];

			(item === void 0 || item === null || item.constructor !== Array) ?
				output[output.length] = item :
				arrayFlatten(item, output);
		}
		
		return output;
	}

	/**
	 * Object.keys
	 * 
	 * @param  {Object} subject
	 * @return {any[]}  keys
	 */
	function objectKeys (subject) {
		if (Object.keys !== void 0) {
			return Object.keys(subject);
		} else {
			var keys = [];
			
			for (var key in subject) {
				if (hasOwnProperty.call(subject, key) === false) {
					continue;
				}

				keys[keys.length] = key;
			}

			return keys;
		}
	}

	/**
	 * Object.assign
	 * 
	 * @param  {Object} target
	 * @return {Object} target
	 */
	function objectAssign (target) {
		for (var i = 0, args = arguments, len = args.length - 1; i < len; i = i + 1) {
			var source = args[i + 1];

			for (var name in source) {
				if (hasOwnProperty.call(source, name) === true) {
					target[name] = source[name];
				}
			}
		}

		return target;
	}

	/**
	 * Element.addEventListener
	 * 
	 * @param {Node}     target
	 * @param {string}   event
	 * @param {function} callback
	 */
	function addEventListener (target, eventName, callback) {
		if (target.addEventListener !== void 0) {
			target.addEventListener(eventName, callback, false);
		} else if (target.attachEvent !== void 0) {
			// ie8 has no currentTarget, target or preventDefault equivalent, emulate
			target.attachEvent('on' + eventName, function (event) {
				event.currentTarget    = target,
				event.target           = event.srcElement,
				event.preventDefault   = function () {
					event.returnValue  = false,
					event.cancelBubble = true;
				};

				callback.call(currentTarget, event);
			});
		}
	}

	/**
	 * Function.bind
	 *
	 * @param  {function} func
	 * @param  {*}        thisArg
	 * @return {function}
	 */
	function functionBind (func, thisArg) {
		if (func.bind !== void 0) {
			return func.bind(thisArg);
		} else {
			return function () {
				var args = arguments,
					len = args.length;

				switch(len) {
					case 0:  func.call(thisArg); break;
					case 1:  func.call(thisArg, args[0]); break;
					case 2:  func.call(thisArg, args[0], args[1]); break;
					case 3:  func.call(thisArg, args[0], args[1], args[2]); break;
					case 4:  func.call(thisArg, args[0], args[1], args[2], args[3]); break;
					default: func.apply(thisArg, sliceArray(args));
				}
			}
		}
	}

	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isFunction (subject) {
		return (
			typeof subject === 'function'
		);
	}

	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isString (subject) {
		return (
			typeof subject === 'string'
		);
	}

	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isArray (subject) {
		return (
			isDefined(subject) && subject.constructor === Array
		); 
	}

	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isObject (subject) {
		return (
			isDefined(subject) && subject.constructor === Object
		);
	}

	/**
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isDefined (subject) {
		return (
			subject !== void 0 && subject !== null
		);
	}

	/**
	 * curry function
	 * 
	 * @param  {function} subject
	 * @param  {*}        args
	 * @param  {boolean}  preventDefault
	 * @return {function}
	 */
	function curry (subject, args, preventDefault) {
		// return a function that calls `subject` with args as arguments
		return function (e) {
			// auto prevent default
			if (preventDefault !== void 0 && e !== void 0 && e.preventDefault !== void 0) {
				e.preventDefault();
			}
			// if empty args, else
			return (args === void 0 || args === null || args.length === 0) ? 
					subject.call(this, e) : 
					subject.apply(this, args);
		}
	}

	/**
	 * moves properties from one object to another
	 * 
	 * @param  {Object} source
	 * @param  {Object} destination
	 */
	function forInSourceToDestination (source, destination) {
		for (var name in source) {
			destination[name] = source[name];
		}
	}

	/**
	 * try catch helper
	 * 
	 * @param  {function} tryBlock  
	 * @param  {function} catchBlock
	 */
	function tryCatch (tryBlock, catchBlock) {
		try {
			tryBlock();
		} catch (e) {
			if (catchBlock !== void 0) {
				catchBlock(e);
			}
		}
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * elements
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
	function createVirtualElement (type, props) {
		var length   = arguments.length,
			children = [],
		// position children element(s) begin, h('tag', {}, ...children) -> h(0, 1, 2)
		position = 2;

		// if props = element
		if (props === void 0 || props.constructor !== Object || props.children) {
			// update position if props !== undefined|null
			if (props !== null) position = 1;

			// default
			props = {};
		}

		// if !props.xmlns && type === svg|math assign svg && math props.xmlns
		if (props.xmlns === void 0) {
			if (type === 'svg') { props.xmlns = svgNS; }
			else if (type === 'math') { props.xmlns = mathNS; }
		}

		// construct children
		for (var i = position; i < length; i = i + 1) {
			var child = arguments[i];
	
			if (child !== void 0 && child !== null && child.constructor === Array) {
				var len = child.length;
				// array child
				for (var j = 0; j < len; j = j + 1) {
					assignVirtualElement(child[j], children); 
				} 
			} else {
				assignVirtualElement(child, children);
			}
		}

		var nodeType = type === '@' ? 11 : 1;

		// create element
		var element = {nodeType: nodeType, type: type, props: props, children: children};

		// if special type, i.e [type] | div.class | #id
		if (
			typeof type === 'string' &&
			(
				type.indexOf('.') > -1 || 
				type.indexOf('[') > -1 || 
				type.indexOf('#') > -1
			)
		) {
			element = specialVirtualElementType(element);
		}

		return element;
	}

	/**
	 * assign virtual element
	 * 
	 * @param  {*}     element
	 * @param  {any[]} children
	 */
	function assignVirtualElement (element, children) {
		var childNode;
			
		if (element === void 0 || element === null || element.type === void 0) {
			// primitives, string, bool, number
			childNode = {nodeType: 3, type: 'text', props: {}, children: ['' + element]};
		}	
		else if (element.type !== void 0) {
			// default element
			childNode = element;
		} else if (typeof element === 'function') {
			// component
			childNode = {nodeType: 1, type: element, props: {}, children: []};
		}

		// push to children array
		children[children.length] = childNode;
	}

	/**
	 * special virtual element types
	 *
	 * @example h('inpu#id[type=radio]') <-- yields --> h('input', {id: 'id', type: 'radio'})
	 * 
	 * @param  {Object} element
	 * @return {Object} element
	 */
	function specialVirtualElementType (element) {
		var matches, classes = [],
			// reference type
			type = element.type,
			// reference/create props
			props = element.props || {};

		// default type
		element.type = 'div';

		// if undefined, create RegExp
		if (specialVirtualElementTypeRegExp === void 0) {
			specialVirtualElementTypeRegExp = new RegExp(
				"(?:(^|#|\\.)([^#\\.\\[\\]]+))|" +
				"(\\[(.+?)(?:\\s*=\\s*(\"|'|)((?:\\\\[\"'\\]]|.)*?)\\5)?\\])",
				"g"
			);
		}

		// execute RegExp, iterate matches
		while ((matches = specialVirtualElementTypeRegExp.exec(type))) {
			var matchedType      = matches[1],
				matchedValue     = matches[2],
				matchedProp      = matches[3],
				matchedPropKey   = matches[4],
				matchedPropValue = matches[6];

			if (matchedType === '' && matchedValue !== '') {
				// type
				element.type = matchedValue;
			} else if (matchedType === '#') { 
				// id
				props.id = matchedValue;
			} else if (matchedType === '.') { 
				// class(es)
				classes[classes.length] = matchedValue;
			} else if (matchedProp.charAt(0) === '[') { 
				// attribute
				var prop = matchedPropValue;

				// remove `[`, `]`, `'` and `"` characters
				if (prop !== void 0) {
					prop = prop.replace(/\\(["'])/g, '$1').replace(/\\\\/g, "\\");
				}

				// h('input[checked]') or h('input[checked=true]') yield {checked: true}
				props[matchedPropKey] = prop || true;
			}
		}

		// if classes, assign classes
		if (classes.length !== 0) {
			props.className = classes.join(' ');
		}

		// assign props
		element.props = props;

		return element;		
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
	function cloneElement (subject, props, children) {
		if (Object.assign !== void 0) {
			Object.assign(subject.props, props);
		} else {
			objectAssign(subject.props, props);
		}

		if (children !== void 0 && children.constructor === Array) {
			var len = children.length;

			if (len !== 0) {
				subject.children = [];

				for (var i = 0; i < len; i = i + 1) {
					assignVirtualElement(children[i], subject.children);
				}
			}
		}

		return subject;
	}

	/**
	 * is valid element
	 * 
	 * @param  {*} subject
	 * @return {boolean}
	 */
	function isValidElement (subject) {
		return (
			subject !== void 0 && subject !== null && 
			subject.type !== void 0 && subject.children !== void 0
		);
	}

	/**
	 * create element factory
	 * 
	 * @param  {string} element
	 * @return {function}
	 */
	function createFactory (element) {
		return function (props) {
			return createVirtualElement.call(void 0, element, props, sliceArray(arguments, 1));
		} 
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * vdom patch helpers
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
	function isEventName (name, value) {
		return (
			name.charAt(0) === 'o' && 
			name.charAt(1) === 'n' && 
			name.length > 3
		);
	}

	/**
	 * extract event name from prop
	 * 
	 * @param  {string} name
	 * @return {string}
	 */
	function extractEventName (name) {
		return (
			name.substr(2, name.length).toLowerCase()
		);
	}

	/**
	 * assign refs
	 * 
	 * @param {Object} subject
	 * @param {Node}   element
	 * @param {Object} refs
	 */
	function assignRefs (ref, element, refs) {
		if (ref !== void 0) {
			// string ref
			if (typeof ref === 'string') {
				// assign ref
				refs[ref] = element;
			} else if (typeof ref === 'function') {
				// function ref
				ref(element);
			}
		}
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * vdom patch helpers - props
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
		var value = props[name];

		if (isEventName(name, value) === true) {
			// add event listener
			addEventListener(target, extractEventName(name), value);
		} else if (onlyEvents !== 1) {
			// add attribute
			updateProp(target, 'setAttribute', name, value, props.xmlns);
		}
	}

	/**
	 * assign/update/remove prop
	 * 
	 * @param  {Node}   target
	 * @param  {string} name
	 * @param  {*}      value
	 * @param  {string} action       
	 * @param  {string} namespace
	 */
	function updateProp (target, action, name, value, namespace) {
		// avoid refs, keys, events and xmlns namespaces
		if (
			name === 'ref' ||
			name === 'key' ||
			isEventName(name, value) === true || 
			value === svgNS ||
			value === mathNS
		) {
			return void 0;
		}

		// if xlink:href set, exit, 
		if (name === 'xlink:href') {
			target[action + 'NS'](xlinkNS, 'href', value);
			return void 0;
		}

		var isSVG = 0;

		// normalize class/className references, className:svg !== className:html
		if (namespace === svgNS) {
			isSVG = 1;
			if (name === 'className') name = 'class';
		} else {
			// optimization, use className instead of class
			if (name === 'class') name = 'className';
		}

		var isDefinedValue = (value !== null && value !== void 0) ? 1 : 0;

		// objects
		if (isDefinedValue === 1 && typeof value === 'object') {
			if (name === 'className' || name === 'class') {
				var className = classNameObjectToString(value);

				isSVG === 1 ? target[action](name, className) : target[name] = className;
			} else {
				// retrieve attr object
				var targetAttr = target[name];

				// exit early if undefined
				if (targetAttr === void 0) return void 0;

				updatePropObject(value, targetAttr);
			}
		}
		// default
		else {
			if (target[name] !== void 0 && isSVG === 0) {
				target[name] = value;
			} else {
				// remove attributes with false/null/undefined values
				if (isDefinedValue === 0 || value === false) {
					action = 'removeAttribute';
				} else if (value === true) {
					// reduce value to an empty string if true, 
					// checked=true --> checked
					value = '';
				}

				target[action](name, value);
			}
		}
	}

	/**
	 * convert className Object to string
	 * 
	 * @param  {Object} value
	 * @return {string}
	 */
	function classNameObjectToString (value) {
		var className = '';

		for (var propName in value) {
			var propValue = value[propName];

			// if !(falsey), add className
			if (propValue !== void 0 && 
				propValue !== null && 
				propValue !== false && 
				propValue !== 0 &&
				propValue !== ''
			) {
				className = className + propValue;
			}
		}

		return className;
	}

	/**
	 * update prop objects, i.e .style
	 * 
	 * @param  {Object} value
	 * @param  {*} targetAttr
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
	 * handles diff props
	 * 
	 * @param  {Object} node
	 * @param  {number} index
	 * @param  {Object} old
	 */
	function patchProps (newNode, oldNode) {
		var propsDiff = diffProps(newNode.props, oldNode.props, newNode.props.xmlns || '', []),
			len       = propsDiff.length;

		// if diff length > 0 apply diff
		if (len !== 0) {
			var target = oldNode._el;

			for (var i = 0; i < len; i = i + 1) {
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
		for (var newName in newProps) { diffNewProps(newProps, oldProps, newName, namespace, propsDiff); }
		// diff oldProps
		for (var oldName in oldProps) { diffOldProps(newProps, oldName, namespace, propsDiff); }

		return propsDiff;
	}

	/**
	 * diff newProps agains oldProps
	 * 
	 * @param  {Object}  newProps 
	 * @param  {Object}  oldProps 
	 * @param  {string}  namespace
	 * @param  {Array[]} propsDiff
	 * @return {Array[]}          
	 */
	function diffNewProps (newProps, oldProps, newName, namespace, propsDiff) {
		var newValue = newProps[newName], 
			oldValue = oldProps[newName];

		if (newValue !== void 0 && newValue !== null && oldValue !== newValue) {
			propsDiff[propsDiff.length] = ['setAttribute', newName, newValue, namespace];
		}
	}

	/**
	 * diff oldProps agains newProps
	 * 
	 * @param  {Object}  newProps 
	 * @param  {Object}  oldProps 
	 * @param  {string}  namespace
	 * @param  {Array[]} propsDiff
	 * @return {Array[]}          
	 */
	function diffOldProps (newProps, oldNode, namespace, propsDiff) {
		if (newProps[oldNode] === null || newProps[oldNode] === void 0) {
			propsDiff[propsDiff.length] = ['removeAttribute', oldNode, '', namespace];
		}
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * vdom patch helpers - append/insert/remove/replace/create
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
	function removeChild (oldNode, parent, prevNode) {
		// remove node
		parent.removeChild(prevNode);

		if (oldNode._owner !== void 0 && oldNode._owner.componentWillUnmount !== void 0) {
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
	function insertBefore (newNode, parent, nextNode, beforeNode) {
		if (newNode._owner !== void 0 && newNode._owner.componentWillMount !== void 0) {
			newNode._owner.componentWillMount();
		}

		// append/insert node
		parent.insertBefore(nextNode, beforeNode);

		if (newNode._owner !== void 0 && newNode._owner.componentDidMount !== void 0) {
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
	function appendChild (newNode, parent, nextNode, beforeNode) {
		if (newNode._owner !== void 0 && newNode._owner.componentWillMount !== void 0) {
			newNode._owner.componentWillMount();
		}

		parent.appendChild(nextNode);
		
		if (newNode._owner !== void 0 && newNode._owner.componentDidMount !== void 0) {
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
	function replaceChild (newNode, parent, nextNode, prevNode) {
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
		if (index >= oldLength - 1) {
			// append node to the dom
			appendChild(newNode, parent, newElement);
		} else {
			// insert node to the dom at an specific position
			insertBefore(newNode, parent, newElement, oldNode._el);
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
	function createElement (subject, component, namespace) {
		// textNode
		if (subject.nodeType === 3) {
			var textContent = subject.children[0] || '';

			return subject._el = document.createTextNode(
				typeof textContent !== 'string' ? '' + textContent : textContent
			);
		}
		// element
		else {
			var element, newNode  = extractNode(subject);

			var type     = newNode.type,
				props    = newNode.props,
				children = newNode.children,
				len      = children.length;

			if (subject._owner !== void 0) {
				component = subject._owner;
			}

			// assign namespace
			if (props.xmlns !== void 0) namespace = props.xmlns;

			// if namespaced
			if (namespace !== void 0) {
				// create namespaced element
				element = document.createElementNS(namespace, type);
				// assign xlmns
				if(props.xmlns === void 0) props.xmlns = namespace;
			}
			// not namespaced
			else {
				element = newNode.nodeType === 11 ? document.createDocumentFragment() : document.createElement(type);
			}			

			// refs
			if (props.ref !== void 0 && component !== void 0) {
				assignRefs(props.ref, element, component.refs);
			}

			// diff and update/add/remove props
			assignProps(element, props, 0);

			if (len !== 0) {
				// create children
				for (var i = 0; i < len; i = i + 1) {
					var newChild = children[i];
					// append child
					appendChild(newChild, element, createElement(newChild, component, namespace));	
				}
			}

			// cache element reference
			return subject._el = newNode._el = element;
		}
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * vdom patch helpers - extract vnode, extract component
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
	function extractNode (subject) {
		var type       = subject.type,
			typeOfType = typeof type;

		// static node
		if (typeOfType === 'string') {
			return subject;
		}

		var component, vnode;

		if (typeOfType === 'function') {
			if (type._component !== void 0) {
				// cache
				component = type._component;
			} else if (type.constructor === Function && type.prototype.render === void 0) {
				// function components
				component = type._component = createClass(type);
			} else {
				// class / createClass components
				component = type;
			}
			subject._owner = new component(subject.props || component.defaultProps);
		} else {
			subject._owner = subject.type;
		}

		return vnode = retrieveVirtualElement(subject);
	}

	/**
	 * retrieve virtual element
	 * 
	 * @param  {Object} subject
	 * @return {Object}
	 */
	function retrieveVirtualElement (subject) {
		var vnode, component = subject._owner;
		
		// retrieve vnode
		vnode = component.render(component.props, component.state, component);

		// if keyed, assign key to vnode
		if (subject.props.key !== void 0 && vnode.props.key === void 0) {
			vnode.props.key = subject.props.key;
		}

		// assign props
		subject.props    = vnode.props;
		subject.children = vnode.children;

		// assign component node
		component._node  = subject;

		return vnode;
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * vdom patcher
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
		var newNodeType = newNode.nodeType,
			oldNodeType = oldNode.nodeType;

		// remove operation
		if (newNodeType === 0) { return 1; }
		// add operation
		else if (oldNodeType === 0) { return 2; }
		// text operation
		else if (newNodeType === 3 && newNodeType === 3) { if (newNode.children[0] !== oldNode.children[0]) { return 3; } }
		// key operation
		else if (newNode.props.key !== oldNode.props.key) { return 5; }
		// replace operation
		else if (newNode.type !== oldNode.type) { return 4; }

		// recursive
		else {
			// extract node from possible component node
			var _newNode = extractNode(newNode);

			// opt: if _newNode and oldNode are the same, exity early
			if (_newNode === oldNode) { return 0; }

			// opt: patch props only if oldNode is not a textNode and the props objects of the two noeds are not equal
			if (oldNode.nodeType === 1 && _newNode.props !== oldNode.props) { patchProps(_newNode, oldNode); }

			// references, children & children length
			var newChildren = _newNode.children,
				oldChildren = oldNode.children,
				newLength   = newChildren.length,
				oldLength   = oldChildren.length;

			// opt: if new children length is 0 clear/remove all children
			if (newLength === 0) {
				// but only if old children is not already cleared
				if (oldLength !== 0) {
					oldNode._el.textContent = '';
					oldNode.children = _newNode.children;
				}	
			}
			// if newNode has children
			else {
				// count of index change when we .splice to keep track of the new index to reference
				var deleteCount = 0,
					parent      = oldNode._el;

				// for loop, the end point being which ever is the greater value between newLength and oldLength
				for (var i = 0; i < newLength || i < oldLength; i = i + 1) {
					var newChild = newChildren[i] || emptyNode,
						oldChild = oldChildren[i] || emptyNode,
						action   = patch(newChild, oldChild);

					// if action dispatched, ref: 1 - remove, 2 - add, 3 - text update, 4 - replace, 5 - key
					if (action !== 0) {
						// index is always the index 'i' (minus) the deleteCount to get the correct
						// index amidst .splice operations that mutate oldChildren's indexes
						var index = i - deleteCount;

						switch (action) {
							// remove operation
							case 1: {
								var removeNode = oldChildren[index];

								// remove node from the dom
								removeChild(removeNode, parent, removeNode._el);
								// normalize old children, remove from array
								spliceArray(oldChildren, index, 1);
								// update delete count, increment
								deleteCount = deleteCount + 1;
								// update old children length, decrement

								break;
							}
							// add operation
							case 2: {
								addNode(index, oldLength, parent, createElement(newChild), newChild, oldChild);

								// normalize old children, add to array								
								spliceArray(oldChildren, index, 0, newChild);
								// update delete count, decrement
								deleteCount = deleteCount - 1;

								break;
							}
							// text operation
							case 3: {
								// update dom textNode value and oldChild textNode content
								oldChild._el.nodeValue = oldChild.children[0] = newChild.children[0];

								break;
							}
							// replace operation
							case 4: {
								// replace dom node
								replaceChild(newChild, parent, createElement(newChild), oldChild._el);
								// update old children, replace array element
								oldChildren[index] = newChild; 

								break;
							}
							// key operation
							case 5: {
								var fromIndex, newChildKey = newChild.props.key;

								// opt: try to find newChild in oldChildren
								for (var j = 0; j < oldLength; j = j + 1) {
									// found newChild in oldChildren, reference index, exit
									if (oldChildren[j].props.key === newChildKey) {
										fromIndex = j;

										break;
									}
								}

								// opt: if found newChild in oldChildren
								if (fromIndex !== void 0) {
									// reference element from oldChildren that matches newChild key
									var element = oldChildren[fromIndex];

								    addNode(index, oldLength, parent, element._el, element, oldChild);

									// remove element from 'old' oldChildren index
								    oldChildren.splice(fromIndex, 1);
								    // insert into 'new' oldChildren index
								    oldChildren.splice(index, 0, element);
								    // the length of oldChildren does not change in this case
								} else {
									// remove node
									if (newLength < oldLength) {
										// reference node to be removed
										var removeNode = oldChildren[index];
										
										// remove node from the dom
										removeChild(removeNode, parent, removeNode._el);

										// normalize old children, remove from array
										spliceArray(oldChildren, index, 1);
										// update delete count, increment
										deleteCount = deleteCount + 1;
										// update old children length, decrement
										oldLength = oldLength - 1;
									}
									// add node
									else if (newLength > oldLength) {
										addNode(index, oldLength, parent, createElement(newChild), newChild, oldChild);

										// normalize old children, add to array
										spliceArray(oldChildren, index, 0, newChild);
										// update delete count, decrement
										deleteCount = deleteCount - 1;
										// update old children length, increment
										oldLength = oldLength + 1;
									}
									// replace node
									else {
										// replace dom node
										replaceChild(newChild, parent, createElement(newChild), oldChild._el);
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
		}

		return 0;
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
	 * @param  {Node}    element
	 * @param  {Object}  newNode
	 * @param  {number}  index
	 * @param  {Object} parentNode
	 */
	function hydrate (element, $newNode, index, parentNode) {
		var newNode        = extractNode($newNode), 
			isFragmentNode = 0;

		// is fragment if newNode is not a text node and type is fragment signature '@'
		if (newNode.props !== void 0 && newNode.type.charAt(0) === FRAGMENT) {
			isFragmentNode = 1;
		}

		var newElement = isFragmentNode === 1 ? 
			element : 
			element.childNodes[index];

		// if the node is not a textNode and
		// has children hydrate each of its children
		if (newNode.nodeType === 1) {
			var newChildren = newNode.children, 
				newLength   = newChildren.length;

			for (var i = 0; i < newLength; i = i + 1) {
				hydrate(newElement, newChildren[i], i, newNode);
			}

			// hydrate the dom element to the virtual element
			newNode._el = newElement;

			// exit early if fragment
			if (isFragmentNode === 1) {
				return void 0;
			}
		}

		/*
			when we reach a string child, we assume the dom 
			representing it is a single textNode,
			we do a look ahead of the child and create + append each textNode child 
			to a documentFragment starting from the current child 
			till we reach a non textNode child such that on 
			h('p', 'foo', 'bar') foo and bar are two different 
			textNodes in the fragment, we then replaceChild the 
			single dom's textNode with the fragment converting the dom's single 
			textNode to multiple textNodes
		 */
		if (newNode.nodeType === 3) {
			// fragment to use to replace a single textNode with multiple text nodes
			// case in point h('h1', 'Hello', 'World') output: <h1>HelloWorld</h1>
			// but HelloWorld is one text node in the dom while two in the vnode
			var fragment = document.createDocumentFragment(),
				children = sliceArray(parentNode.children, index);

			// look ahead of this nodes siblings and add all textNodes to the the fragment.
			// exit when a non text node is encounted
			for (var i = 0, len = children.length; i < len; i = i + 1) {
				var textNode = children[i];

				// exit early once we encounter a non text/string node
				if (textNode.nodeType !== 3) {
					break;
				}

				// create textnode, append to the fragment
				fragment.appendChild(createElement(textNode));
			}

			// replace the textNode with a set of textNodes
			element.replaceChild(fragment, element.childNodes[index]);
		}

		// add event listeners to non textNodes
		// and add set refs
		if (newNode.nodeType === 1) {
			// add events if any
			assignProps(newNode._el, newNode.props, 1);

			// assign refs
			if (newNode.props.ref !== void 0) {
				assignRefs(newNode.props.ref, newElement, component.refs);
			}
		}
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * server-side render
	 * 
	 * ---------------------------------------------------------------------------------
	 */


	/**
	 * server side render
	 * 
	 * @param  {(Object|function)} subject
	 * @param  {Object} props
	 * @param  {Object} children
	 * @return {string}
	 */
	function renderToString (subject) {		
		return renderToStringHTML(
			subject.type !== void 0 ? subject : {nodeType: 1, type: subject, props: {}, children: []}
		);
	}

	/**
	 * print node to string
	 * 
	 * @param  {Object} subject
	 * @return {string}
	 */
	function renderToStringHTML (subject) {
		var vnode = extractNode(subject);

		// textNode
		if (vnode.nodeType === 3) {
			return vnode.children[0];
		}

		// references
		var type     = vnode.type, 
			props    = vnode.props, 
			children = vnode.children;

		if (type.charAt(0) === FRAGMENT) {
			return renderToStringChildren(children);
		} else if (voidElements[type] === 0) {
			// <type ...props>
			return '<'+type+renderToStringProps(props)+'>';
		} else {
			// <type ...props>...children</type>
			return '<'+type+renderToStringProps(props)+'>' + renderToStringChildren(children) + '</'+type+'>';
		}
	}

	/**
	 * print props to string
	 * 
	 * @param  {Object} props
	 * @return {string}
	 */
	function renderToStringProps (props) {
		if (props.constructor === Object) {
			var propsFilter = renderToStringPropsFilter(props, []);

			// create string, convert multi-spaces to single space
			var propsString = propsFilter.join(' ').replace(/  +/g, ' ').trim();

			return propsString ? (' ' + propsString) : '';			
		}

		// empty string if falsey else ' ' + ...props
		// mitigates <divclass=a></div> ---> <div class=a></div>
		return ' ' + props;
	}

	/**
	 * filter props
	 * 
	 * @param  {Object} props
	 * @param  {any[]} propsFilter
	 */
	function renderToStringPropsFilter (props, propsFilter) {
		for (var name in props) {
			renderToStringPropsFilterAssignProp(name, props[name], propsFilter);
		}

		return propsFilter;
	}

	/**
	 * assign filter props
	 * 
	 * @param  {string} name
	 * @param  {*}      propValue
	 */
	function renderToStringPropsFilterAssignProp (name, propValue, propsFilter) {
		// propValue --> <type name=value>
		if (propValue !== void 0 && propValue !== null && propValue !== false) {
			// do not add events, keys or refs
			if (name !== 'key' && name !== 'ref' && typeof propValue !== 'function') {
				// if falsey/truefy checkbox=true ---> <type checkbox>
				var output = propValue === true ? name : name + '="' + propValue + '"';

				propsFilter[propsFilter.length] = output;
			}
		}
	}

	/**
	 * print children to string
	 * 
	 * @param  {any[]}  children
	 * @return {string}
	 */
	function renderToStringChildren (children) {
		// null/undefined or empty
		if (children === void 0 || children === null || children.length === 0) {
			return '';
		}

		return arrayMap(children, function (child) {
			return renderToStringHTML(child);
		}).join('');
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * renders
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
	function render (subject, target) {
		// renderer
		function reconciler (props) {
   			if (initial === 1) {
   				// dispatch mount
   				mount(element, node);
   				// register mount dispatched
   				initial = 0;
   				// assign component
   				if (component === void 0) { component = node._owner; }
   			} else {
   				// update props
   				if (props !== void 0) {
   					component.props = props;
   				}

		   		var time  = Date.now(),
		   			delta = time - then;

		   		if (delta > interval) {
	   				then = time - (delta % interval);
	   				// update component
	   				component.forceUpdate();
	   			}
   			}

	   		return reconciler;
	   	}

	   	// render cache
	   	if (subject._render !== void 0 && subject._mount === target) {
	   		return subject._render;
	   	} 

	   	var component, node;

	   	// create component from object
	   	if (subject.render !== void 0 || subject.constructor === Function) {
	   		node = {nodeType: 1, type: createClass(subject), props: {}, children: []};
	   	}
	   	// normalization
	   	else if (subject.type === void 0) {
	   		node = {nodeType: 1, type: subject, props: {}, children: []};
	   	} else {
	   		node = subject;
	   	}

	   	// normalize props
	   	if (node.props === void 0 || node.props === null || node.props.constructor !== Object) {
	   		node.props = {};
	   	}

	   	// server-side
	   	if (document === void 0) {
	   		return renderToString(node);
	   	}

		// retrieve mount element
		var element = retrieveMountElement(target);

		// initialize variables
		var initial   = 1, 
			then      = 0,
			// pipe each update at 60 frames per second
			// this does not use async requestAnimationFrame
			interval  = 1000/60;

		// caching
		reconciler._render = reconciler;
		reconciler._mount  = target;

		if (typeof node.type === 'function') {
			node.type._render = reconciler;
			node.type._mount = target;
		}

		// hydration
	   	if (element.hasAttribute('data-hydrate')) {
	   		// dispatch hydration
	   		hydrate(element, node, 0, emptyNode);
	   		// cleanup element hydrate attributes
	   		element.removeAttribute('data-hydrate');
	   		// register mount dispatched
	   		initial = 0;
	   		// assign component
	   		if (component === void 0) { component = node._owner; }

	   		return reconciler;
	   	}

	   	return reconciler(); 
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
		appendChild(newNode, element, createElement(newNode));
	}

	/**
	 * update render
	 * 
	 * @param  {Node}   element
	 * @param  {Object} newNode
	 * @param  {Object} oldNode
	 */
	function update (newNode, oldNode) {
		// detect diffs, pipe diffs to diff handler
		patch(newNode, oldNode);
	}

	/**
	 * retrieve mount element
	 * 
	 * @param  {*} subject
	 * @return {Node}
	 */
	function retrieveMountElement (subject) {
		// document not available
		if (document === void 0) {
			return subject;
		}

		var candidate, target;

		if (typeof subject === 'function') {
			target = subject();
		} else {
			target = subject;
		}

		if (target !== void 0 && target !== null && target.nodeType !== void 0) {
			candidate = target;
		} else {
			candidate = document.querySelector(target);
		}

		// default document.body
		return candidate === void 0 || candidate === null || candidate === document ? 
					document.body : 
					candidate;
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * components
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	/**
	 * assign component properties
	 * 
	 * @param  {Object} source
	 * @param  {Object} destination
	 */
	function assignComponentProperties (source, destination) {
		// assign properties
		for (var name in source) {
			var value = source[name];

			if (value !== SIGNATURE) {
				destination[name] = value;
			}
		}
	}

	/**
	 * getInitialState
	 * 
	 * @return {Object}
	 */
	function getInitialState () { return {}; }

	/**
	 * getDefaultProps
	 * 
	 * @return {Object}
	 */
	function getDefaultProps () { return {}; }

	/**
	 * createAutoBindPairs
	 * 
	 * @param  {Object} source     
	 */
	function createAutoBindPairs (source) {
		var functions = [],
			names     = [];

		for (var name in source) {
			var value = source[name];
			
			if (typeof value === 'function' && name !== 'render') {
				functions[functions.length] = value;
				names[names.length] = name;
			}
		}

		var length = names.length;

		return function autoBind (thisArg) {
			for (var i = 0; i < length; i = i + 1) {
				thisArg[names[i]] = functionBind(functions[i], thisArg);
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
		if (subject._component !== void 0) {
			return subject._component;
		}

		var component, candidate, displayName, isFunctionComponent = typeof subject === 'function';

		if (isFunctionComponent === true) {
			candidate   = subject();
			displayName = candidate.displayName || getDisplayName(subject);
		} else {
			candidate   = subject;
			displayName = candidate.displayName || '';
		}

		if (candidate.render === void 0) {
			component = {
				render: function () {
					return candidate;
				}
			};
		} else {
			component = candidate;
		}

		var componentClass                      = createComponentClass(),
			prototype                           = componentClass.prototype;

		var statics                             = component.statics,
			_getDefaultProps                    = component.getDefaultProps || getDefaultProps,
			_getInitialState                    = component.getInitialState || getInitialState,
			componentWillUpdate                 = component.componentWillUpdate,
			componentDidUpdate                  = component.componentDidUpdate,
			componentWillMount                  = component.componentWillMount,
			componentDidMount                   = component.componentDidMount,
			componentWillUnmount                = component.componentWillUnmount,
			componentWillReceiveProps           = component.componentWillReceiveProps,
			propTypes                           = component.propTypes;

		if (statics                   !== void 0) component.statics                   = SIGNATURE;
		if (_getDefaultProps          !== void 0) component.getDefaultProps           = SIGNATURE;
		if (_getInitialState          !== void 0) component.getInitialState           = SIGNATURE;
		if (componentWillUpdate       !== void 0) component.componentWillUpdate       = SIGNATURE;
		if (componentDidUpdate        !== void 0) component.componentDidUpdate        = SIGNATURE;
		if (componentWillMount        !== void 0) component.componentWillMount        = SIGNATURE;
		if (componentDidMount         !== void 0) component.componentDidMount         = SIGNATURE;
		if (componentWillUnmount      !== void 0) component.componentWillUnmount      = SIGNATURE;
		if (componentWillReceiveProps !== void 0) component.componentWillReceiveProps = SIGNATURE;
		if (propTypes                 !== void 0) component.propTypes                 = SIGNATURE;

		assignComponentProperties(component, prototype);

		// create method auto binder
		var autoBind                            = createAutoBindPairs(component);

		prototype.getInitialState               = _getInitialState;
		prototype.componentWillUpdate           = componentWillUpdate;
		prototype.componentDidUpdate            = componentDidUpdate;
		prototype.componentWillMount            = componentWillMount;
		prototype.componentDidMount             = componentDidMount;
		prototype.componentWillUnmount          = componentWillUnmount;
		prototype.componentWillReceiveProps     = componentWillReceiveProps;
		prototype.propTypes                     = propTypes;

		function Component (props) {
			var component = new componentClass(props || _getDefaultProps());
				autoBind(component);

			return (component);
		}

		Component.constructor = componentClass;

		if (statics !== void 0) {
			assignComponentProperties(statics, (component === subject ? Component : subject));
		}

		if (isFunctionComponent === true) {
			subject._component = Component;
		}

		// cache, return Component
		return Component;
	}

	/**
	 * componentClass factory
	 * 
	 * @return {Class}
	 */
	function createComponentClass () {
		function componentClass (props) {
			if (this.getInitialState !== void 0) {
				this.state = this.getInitialState();
			}

			if (props !== void 0) {
				// componentWillReceiveProps lifecycle
				if (this.componentWillReceiveProps !== void 0) { 
					this.componentWillReceiveProps(props); 
				}

				// validate propTypes
				if (isDevEnv === 1) {
					var propTypes = this.propTypes || this.constructor.propTypes;

					if (propTypes !== void 0) {
						validatePropTypes(props, propTypes, this.displayName);
					}
				}

				// assign props
				this.props = props;
			} else {
				if (this.getDefaultProps !== void 0) {
					this.props = this.getDefaultProps();
				} else {
					this.props = {};
				}
			}

			this.refs  = {};
			this._node = {};
		}

		componentClass.prototype = {
			autoBind: function autoBind (methods) {
				for (var i = 0, len = methods.length; i < len; i = i + 1) {
					var name   = methods[i];
					var method = this[name];

					if (method !== void 0) {
						this[name] = functionBind(method, this);
					}
				}
			},
			setState: function setState (newState, callback) {
				if (
					this.shouldComponentUpdate !== void 0 && 
					this.shouldComponentUpdate(this.props, newState) === false
				) {
					return;
				}

				// update state
				forInSourceToDestination(newState, this.state);

				this.forceUpdate();

				// callback, call
				if (callback !== void 0) {
					callback(this.state);
				}
			},
			forceUpdate: function forceUpdate () {
				// patch update
				if (this._node !== void 0) {
					// componentWillUpdate lifecycle
					if (this.componentWillUpdate !== void 0) {
						this.componentWillUpdate(this.props, this.state);
					}

					var newNode = this.render(this.props, this.state, this), 
						oldNode = this._node;

					// never executes more than once
					if (oldNode.type !== newNode.type) {
						oldNode.type = newNode.type;
					}

					update(newNode, oldNode);

					// componentDidUpdate lifecycle
					if (this.componentDidUpdate !== void 0) {
						this.componentDidUpdate(this.props, this.state);
					}
				}
			},
			withAttr: function withAttr (props, setters, callback) {
				var thisArg = this;

				function updateAttr (target, prop, setter) {
					var value;

					if (typeof prop === 'string') {
						value = prop in target ? target[prop] : target.getAttribute(prop);

						if (value !== void 0 && value !== null) { setter(value); }
					} else {
						value = prop();
						
						if (value !== void 0 && value !== null) {
							setter in target ? target[setter] = value : target.setAttribute(setter, value);
						}
					}
				}

				return function (event) {
					var target = this || event.currentTarget;

					// array of bindings
					if (props.constructor === Array) {
						for (var i = 0, len = props.length; i < len; i = i + 1) {
							updateAttr(target, props[i], setters[i]);
						}
					} else {
						updateAttr(target, props, setters);
					}

					if (callback !== void 0) {
						callback(thisArg);
					} else {
						thisArg.forceUpdate();
					}
				}
			}
		}

		return componentClass;
	}

	/**
	 * retrieve function name
	 * 
	 * @param  {function} subject
	 * @return {string}
	 */
	function getDisplayName (subject) {
		// regex may return nothing, [,''] insures `)[1]` always retrieves something
		var displayName = (/function ([^(]*)/.exec(subject.valueOf()) || [,''])[1];

		return (displayName === '' && subject.name !== void 0) ? subject.name : displayName;
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * testing
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
		tryCatch(function () { throwError(error); });
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
		return throwError((
			'Invalid prop `' + propName + '` of type `' + 
			getDisplayName(propValue.constructor).toLowerCase() +
			'` supplied to `' + displayName + '`, expected `' + expectedType
		), 1);
	}

	/**
	 * create error message, required prop types
	 * 
	 * @param  {string} propName
	 * @param  {string} displayName
	 * @return {Error}
	 */
	function createRequiredPropTypeError (propName, displayName) {
		return throwError(
			('Required prop `' + propName + '` not specified in `' +  displayName), 
			1
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
			if (validationResult !== void 0) {
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
			expectedType.charAt(0).toUpperCase() + expectedType.substr(1, expectedType.length)
		);

		// check if the propValue is of this type
		return (
			propValue !== void 0 && propValue !== null && 
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

			if (propValue !== void 0 && propValue !== null) {
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

			return createTypeValidator(expectedTypeName, void 0,
				function (propValue, expectedType, props, propName, displayName) {
					// failed, exit early if not array
					if (propValue.constructor !== Array) {
						return 1;
					}

					var failed = 0;

					// check if every item in the array is of expectedType
					for (var i = 0, len = propValue.length; i < len; i = i + 1) {
						// failed, exit early
						if (validator(propValue, i, displayName)) return failed = 1;
					}

					return failed;
				}
			);
		};
	}

	/**
	 * create PropTypes object
	 * 
	 * @return {Object}
	 */
	function createPropTypes () {
		var
		primitivesTypes = ['number', 'string', 'bool', 'array', 'object', 'func', 'symbol'],
		propTypesObj    = {};

		// assign primitive validators
		for (var i = 0, len = primitivesTypes.length; i < len; i = i + 1) {
			var name = primitivesTypes[i];
			// bool / func ---> boolean / function
			var primitiveType = name === 'bool' ? name + 'ean'  :
								name === 'func' ? name + 'tion' : 
								name;

			// create, assign validator
			propTypesObj[name] = createTypeValidator(primitiveType);
		}

		// element
		propTypesObj._element = createTypeValidator('element', void 0,
			function (propValue) {
				if (isValidElement(propValue) === false) {
					return 1;
				}
			}
		);

		// number, string, element ...or array of those
		propTypesObj.node = createTypeValidator('node', void 0,
			function (propValue) {
				if (
					typeof propValue !== 'string' &&
					isNaN(propValue) === true && 
					isValidElement(propValue) === false
				) {
					return 1;
				}
			}
		);

		// any defined data type
		propTypesObj.any = createTypeValidator('any', void 0,
			function (propValue) {
				if (propValue !== void 0 && propValue !== null) {
					return 1;
				}
			}
		);

		// instance of a constructor
		propTypesObj.instanceOf = function (constructor) {
			var expectedTypeName = getDisplayName(constructor);

			return createTypeValidator(expectedTypeName, void 0,
				function (propValue, expectedType) {
					if ((propValue instanceof constructor) !== true) {
						return 1;
					}
				}
			);
		};

		// object of a certain shape
		propTypesObj.shape = function (shape) {
			var 
			shapeKeys        = objectKeys(shape),
			expectedTypes    = arrayMap(shapeKeys, function (name) { return name + ': ' + shape[name]._propType; }),
			expectedTypeName = '{\n\t' + expectedTypes.join(', \n\t') + '\n}';

			return createTypeValidator(expectedTypeName, void 0,
				function (propValue, expectedType, props, propName, displayName) {
					// fail if propValue is not an object
					if (!propValue || propValue.constructor !== Object) {
						return 1;
					}

					var propValueKeys = objectKeys(propValue);

					// fail if object has different number of keys
					if (propValueKeys.length !== shapeKeys.length) {
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

			return createTypeValidator(expectedTypeName, void 0,
				function (propValue) {
					// default state
					var failed = 1;

					// if propValue is one of the values
					for (var i = 0, len = values.length; i < len; i = i + 1) {
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
			var expectedTypeName = arrayMap(types, function (type) {
				return type._propType;
			}).join(' or ');

			return createTypeValidator(expectedTypeName, void 0,
				function (propValue, expectedType, props, propName, displayName) {
					// default state
					var failed = 1;

					// if propValue is of one of the types
					for (var i = 0, len = types.length; i < len; i++) {
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
	 * register enviroment
	 * 
	 * @param  {undefined=} enviroment
	 */
	function registerEnviroment (enviroment) {
		if (isDevEnv === void 0) {
			enviroment = (
				(typeof process === 'object' && process.env !== void 0) ? 
						process.env.NODE_ENV : 
						typeof NODE_ENV === 'string' ? NODE_ENV : 0
			);

			return (enviroment === 'development')|0;
		} else if (enviroment !== void 0) {
			return isDevEnv = (enviroment === 'development')|0; 
		}
	}

	/**
	 * injects a mock window object
	 * 
	 * @param  {Object} mockWindow
	 * @return {Object}   
	 */
	function injectWindowDependency (mockWindow) {
		if (mockWindow !== void 0) {
			window           = mockWindow,
			document         = window.document,
			XMLHttpRequest   = window.XMLHttpRequest;
		}

		return mockWindow;
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
	 * @param  {*}        value
	 * @param  {function} middleware
	 * @return {function}
	 */
	function Stream (value, middleware) {
		var store, 
			chain = {then: void 0, 'catch': void 0}, listeners = {then: [],'catch': []};

		function stream (value) {
			// recieved value, update stream
			if (arguments.length !== 0) {
				dispatch('then', store = value);
				return stream;
			}

			var output;

			// special store
			if (middleware === 1) {
				output = store();
			} else {
				// if middleware function
				output = typeof middleware === 'function' ? middleware(store) : store;
			}

			return output;  
		}

		function dispatch (type, value) {
			var collection = listeners[type], 
				len = collection.length;

			if (len !== 0) {
				for (var i = 0; i < len; i = i + 1) {
					var listener = collection[i];

					tryCatch(
						function () {
							// link in the .then / .catch chain
							var link = listener(chain[type] || value);

							// add to chain if defined
							if (link !== void 0) {
								chain[type] = link;
							}
						}, 
						function (e) {
							stream.reject(e);
						}
					)
				}
			}
		}

		// ...JSON.strinfigy()
		stream.toJSON = function () { 
			return store; 
		};
		// {function}.valueOf()
		stream.valueOf = function () { 
			return store; 
		};
		// resolve value
		stream.resolve = function (value) { 
			return stream(value); 
		};
		// reject
		stream.reject  = function (reason) { 
			dispatch('catch', reason); 
		};
		// push listener
		stream.push = function (type, listener, end) {
			listeners[type].push(function (chain) {
				return listener(chain);
			});

			return end === void 0 ? stream : void 0;
		};
		// add then listener
		stream.then  = function (listener, error) {
			if (error !== void 0) {
				stream['catch'](error);
			}

			if (listener !== void 0) {
				return stream.push('then', listener, error);
			}
		};
		// add a done listener, ends the chain
		stream.done = function (listener, error) {
			stream.then(listener, error || 1);
		};
		// add a catch listener
		stream['catch'] = function (listener) {
			return stream.push('catch', listener);
		};
		// create a map
		stream.map = function (map) {
			// dependency i.e `var bar = a.map(fn)` a is dependency
			var dependency = stream;

			return Stream(function (resolve) {
				resolve(function () { return map(dependency()); });
			}, 1);
		};
		// end/reset a stream
		stream.end = function () {
			chain.then         = void 0;
			chain['catch']     = void 0;
			listeners.then     = [];
			listeners['catch'] = [];
		};

		// id to distinguish functions from streams
		stream._stream = 1;

		typeof value === 'function' ? 
					value(stream.resolve, stream.reject, stream) : 
					stream(value);

		return stream;
	}

	/**
	 * combine two or more streams
	 * 
	 * @param  {function} reducer
	 * @return {any[]}    deps
	 */
	Stream.combine = function combine (reducer, deps) {
		var depsIsArray = deps !== void 0 && deps !== null && deps.constructor === Array,
			args        = depsIsArray ? deps : arguments;

		// if deps`dependecies` !== single array create from arguments
		deps = sliceArray(args, depsIsArray === false ? 1 : 0);

		// add address for the prev store
		deps[deps.length] = void 0;

		// the previous store will always be the last item in the list of dependencies
		var prevStoreAddress = deps.length - 1;

		// second arg === 1 allows us to pass a function as the streams store
		// that runs when retrieved
		return Stream(function (resolve) {
			resolve(function () {
				// extract return value of reducer, assign prevStore, return it
				return deps[prevStoreAddress] = reducer.apply(void 0, deps);
			});
		}, 1);
	};

	/**
	 * do something after all dependecies have resolved
	 * 
	 * @param  {any[]} deps
	 * @return {function}
	 */
	Stream.all = function all (deps) {
		var resolved = [];

		// pushes a value to the resolved array and compares if resolved length
		// is equal to deps this will tell us when all dependencies have resolved
		function resolver (value, resolve) {
			resolved[resolved.length] = value;

			if (resolved.length === deps.length) {
				resolve(resolved);
			}
		}

		return Stream(function (resolve, reject) {
			// check all dependencies, if a dependecy is a stream attach a listener
			// reject / resolve as nessessary.
			for (var i = 0, len = deps.length; i < len; i++) {
				var value = deps[i];

				if (value._stream === 1) {
					value.done(function (value) {
						resolver(value, resolve);
					}, function (reason) {
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
	Stream.scan = function scan (reducer, accumulator, stream) {
		return Stream(function (resolve) {
			// attach a listener to stream, 
			stream.then(function () {
				// update the accumulator with the returned value of the reducer,
				accumulator = reducer(accumulator, stream);
				// resolve the store of the stream we return back
				resolve(accumulator);
			});
		});
	}


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
		 * @example param({url:'http://.com'}) //=> 'url=http%3A%2F%2F.com'
		 * 
		 * @param  {Object} obj   
		 * @param  {Object} prefix
		 * @return {string}
		 */
		function param (obj, prefix) {
			var arr = [];

			forIn(obj, function (value, key) {
				var __prefix = prefix !== void 0 ? prefix + '[' + key + ']' : key;

				// when the value is equal to an object 
				// we have somethinglike value = {name:'John', addr: {...}}
				// re-run param(addr) to serialize 'addr: {...}'
				arr[arr.length] = typeof value == 'object' ? 
										param(value, __prefix) :
										encodeURIComponent(__prefix) + '=' + encodeURIComponent(value);
			});

			return arr.join('&');
		}

		/**
		 * parse, format response
		 * 
		 * @param  {Object} xhr
		 * @return {*} 
		 */
		function parseResponse (xhr, type) {			
			var body, type, text = xhr.responseText, header = xhr.getResponseHeader('Content-Type');

			// get response format
			type = (
				header.indexOf(';') !== -1 ? 
				header.split(';')[0].split('/') : 
				header.split('/')
			)[1];

			switch (type) {
				case 'json': body = JSON.parse(text); break;
				case 'html': body = (new DOMParser()).parseFromString(text, 'text/html'); break;
				default    : body = text;
			}

			return body;
		}

		/**
		 * create http request
		 * 
		 * @param  {string}
		 * @param  {string}
		 * @param  {Object}
		 * @param  {string}
		 * @param  {string}
		 * @return {function}
		 */
		function createRequest (url, method, payload, enctype, withCredentials) {
			// return a a stream
			return Stream(function (resolve, reject) {
				// if, exit early
				if (XMLHttpRequest === void 0) {
					return void 0;
				}

				// create xhr object 
				var xhr  = new XMLHttpRequest(),
				// reference window location
				location = window.location,
				// create anchor element, extract url data
				a        = document.createElement('a');
				a.href   = url;

				// if cross origin request
				var CORS = !(
					a.hostname === location.hostname && a.port === location.port &&
					a.protocol === location.protocol && location.protocol !== 'file:'
				);

				// remove reference, garbage collection
				a = 0;
				
				// open request
				xhr.open(method, url);
				// on success resolve
				xhr.onload  = function () { resolve(parseResponse(this)); };
				// on error reject
				xhr.onerror = function () { reject(this.statusText); };
				
				// cross origin request cookies
				if (CORS === true && withCredentials !== void 0) {
					xhr.withCredentials = true;
				}

				// assign content type and payload
				if (method === 'POST' || method === 'PUT') {
					xhr.setRequestHeader('Content-Type', enctype);

					if (enctype.indexOf('x-www-form-urlencoded') > -1) {
						payload = param(payload);
					} else if (enctype.indexOf('json') > -1) {
						payload = JSON.stringify(payload);
					}
				}

				// send request
				xhr.send(payload);
			});
		}


		/**
		 * create request
		 * 
		 * @param {string}
		 * @param {Object}
		 * @param {function}
		 */
		function createInterface (method) {
			return function (url, payload, enctype, withCredentials) {
				// encode url
				url = encodeURI(url);

				// enctype syntax sugar
				switch (enctype) {
					case 'json': enctype = 'application/json'; break;
					case 'text': enctype = 'text/plain'; break;
					case 'file': enctype = 'multipart/form-data'; break;
					default:     enctype = 'application/x-www-form-urlencoded';
				}

				// if has payload && GET pass payload as query string
				if (payload !== void 0 && method === 'GET') {
					url = url + '?' + param(payload);
				}

				// return promise-like stream
				return createRequest(url, method, payload, enctype, withCredentials);
			}
		}

		/**
		 * request interface
		 * 
		 * request({method: 'GET', url: '?'}) === request.get('?')
		 * 
		 * @param {Object} subject
		 */
		function request (subject) {
			return request[subject.method.toLowerCase()](
				subject.url, 
				subject.payload, 
				subject.enctype, 
				subject.withCredentials
			);
		}

		request.get       = createInterface('GET'),
		request.post      = createInterface('POST'),
		request.put       = createInterface('PUT'),
		request['delete'] = createInterface('DELETE');

		return request;
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
	 * @param  {string}        addr 
	 * @param  {string}        init
	 * @param  {(string|Node)} element
	 * @param  {middleware}    middleware
	 * @return {Object}
	 */
	function router (routes, addr, init, element, middleware) {
		if (typeof routes === 'function') {
			routes = routes();
		}

		if (typeof addr === 'function') {
			addr = addr();
		}

		if (typeof addr === 'object') {
			element     = addr.mount,
			init        = addr.init,
			middleware  = addr.middleware,
			addr        = addr.root;
		}

		if (element !== void 0) {
			forIn(routes, function (component, uri) {
				if (middleware !== void 0) {
					routes[uri] = function (data) {
						middleware(component, data, element, uri);
					}
				} else {
					routes[uri] = function (data) {
						render({nodeType: 1, type: component, props: data, children: []}, element);
					}
				}
			});
		}

		return Router(routes, addr, init);
	}

	/**
	 * router constructor
	 * 
	 * @param {any[]}     routes
	 * @param {string=}   addr
	 * @param {function=} init
	 */
	function Router (routes, addr, init) {
		// listens for changes to the url
		function startListening () {
			if (interval !== void 0) {
				// clear the interval if it's already set
				clearInterval(interval);
			}

			// start listening for a change in the url
			interval = setInterval(function () {
				var path = window.location.pathname;

				// if our store of the current url does not 
				// equal the url of the browser, something has changed
				if (currentPath !== path) {
					// update the currentPath
					currentPath = path;
					// trigger a routeChange
					triggerRouteChange();
				}
			}, 50);
		}

		// register routes
		function registerRoutes () {
			var routesRegExp = /([:*])(\w+)|([\*])/g;

			// assign routes
			forIn(routes, function (callback, uri) {
				// - vars is where we store the variables
				// i.e in /:user/:id - user, id are variables
				var vars = [];

				// uri is RegExp that describes the uri match thus
				// given the following /:user/:id/*
				// the uri will become / ([^\/]+) / ([^\/]+) / (?:.*)
				var pattern = uri.replace(routesRegExp, function () {
					// id => 'user', 'id', undefned
					var args = arguments, id = args[2];

					// if not a variable 
					if (id === void 0 || id === null) {
						return '(?:.*)';
					} else {
						// capture
						vars[vars.length] = id;
						return '([^\/]+)';
					}
				});

				// close the pattern
				var _pattern = new RegExp(
					(addr ? addr + pattern : pattern) + '$'
				);

				// assign a route item
				routes[uri] = [callback, _pattern, vars];
			});
		}

		// called when the listener detects a route change
		function triggerRouteChange () {
			forIn(routes, function (route, uri) {
				var callback = route[0],
					pattern  = route[1],
					vars     = route[2],
					match    = currentPath.match(pattern);

				// we have a match
				if (match !== void 0 && match !== null) {
					// create params object to pass to callback
					// i.e {user: 'simple', id: '1234'}
					var data  = match.slice(1, match.length);
					var _data = arrayReduce(data, function (nextState, value, index) {
							if (!nextState) {
								nextState = {};
							}
							// var name: value
							// i.e user: 'simple'
							nextState[vars[index]] = value;

							return nextState;
						}, void 0);

					callback(_data, uri);
				}
			});
		}

		// navigate to a path
		function navigateToPath (path) {
			if (addr) {
				path = addr + path;
			}

			history.pushState(void 0, void 0, path);
		}

		// normalize rootAddress format
		// i.e '/url/' -> '/url'
		if (typeof addr === 'string' && addr.substr(-1) === '/') {
			addr = addr.substr(0, addr.length - 1);
		}

		var currentPath, interval;

		registerRoutes();
		startListening();

		var actions = {
			// navigate to a view
			nav: navigateToPath,
			// history back
			back: history.back,
			// history foward
			foward: history.foward,
			// history go
			go: history.go,
			// routes
			routes: routes
		};

		if (init !== void 0) {
			if (isFunction(init)) {
				// init function
				init(actions);
			} else if (isString(init)) {
				// init path
				navigateToPath(init);
			}
		}

		return actions;
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * stores
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	

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
		var args  = arguments,
			funcs = sliceArray(args);

		// no functions passed
		if (funcs.length === 0) {
			return function (arg) { return arg; }
		} else {
			// remove and retrieve last function
			var last = funcs.pop();
			
			return function () {
				return arrayReduceRight(funcs, function (composed, func) {
					return func(composed);
				}, last.apply(void 0, arguments));
			}
		}
	}


	/**
	 * creates a store enhancer
	 *
	 * @param   {...function} middlewares
	 * @return  {function}                - a store enhancer
	 */
	function applyMiddleware () {
		var args = arguments,
			middlewares = sliceArray(args);

		return function (createStore) {
			return function (reducer, initialState, enhancer) {
				// create store
				var store         = createStore(reducer, initialState, enhancer),
					dispatch      = store.dispatch,
					chain         = [],
					middlewareAPI = {
						getState: store.getState,
						dispatch: function (action) {
							return dispatch(action);
						}
					};

				// create chain
				chain = arrayMap(middlewares, function (middleware) {
					return middleware(middlewareAPI);
				});

				// compose dispatcher
				dispatch = compose.apply(void 0, sliceArray(chain))(store.dispatch);

				// return store with composed dispatcher
				return objectAssign({}, store, {
					dispatch: dispatch
				});
			}
		}
	}


	/**
	 * combines a set of reducers
	 * 
	 * @param  {Object} reducers - reducers to combine
	 * @return {function}        - combined reducers
	 */
	function combineReducers (reducers) {
		var reducerKeys = objectKeys(reducers);

		// create and return a single reducer
		// that executes all the reducers
		return function (state, action) {
			state = state || {};

			return arrayReduce(reducerKeys, function (nextState, key) {
				nextState[key] = reducers[key](state[key], action);

				return nextState;
			}, {});
		}
	}


	/**
	 * create store constructor
	 * 
	 * @param  {function} reducer
	 * @param  {*}        initialState
	 * @return {Object}   {getState, dispatch, subscribe, connect, replaceReducer}
	 */
	function createStore (reducer, initialState) {
		var currentState = initialState,
			listeners    = [];

		// state getter, retrieves the current state
		function getState () {
			return currentState;
		}

		// dispatchs a action
		function dispatch (action) {
			if (action.type === void 0) {
				throwError('actions without type');
			}

			// update state with return value of reducer
			currentState = reducer(currentState, action);

			// dispatch to all listeners
			for (var i = 0, len = listeners.length; i < len; i = i + 1) {
				listeners[i]();
			}
		}

		// subscribe to a store
		function subscribe (listener) {
			if (typeof listener !== 'function') {
				throwError('listener should be a function');
			}

			// retrieve index position
			var index = listeners.length;

			// append listener
			listeners[index] = listener;

			// return unsubscribe function
			return function unsubscribe () {
				// for each listener
				for (var i = 0, len = listeners.length; i < len; i = i + 1) {
					// if currentListener === listener, remove
					if (listeners[i] === listener) {
						spliceArray(listeners, i, 1);
					}
				}
			}
		}

		function replaceReducer (nextReducer) {
			// exit early, reducer is not a function
			if (typeof nextReducer !== 'function') {
				throwError('nextReducer should be a function');
			}

			// replace reducer
			reducer = nextReducer;

			// dispath initial action
			dispatch({type: STORE});
		}

		// auto subscribe a component to a store
		function connect (subject, element) {
			var callback;

			// if component
			if (subject.constructor !== Function || element !== void 0) {
				// create renderer
				callback = render({nodeType: 1, type: subject, props: getState(), children: []}, element);
			} else{
				callback = subject;
			}

			// subscribe to state updates, dispatching render on update
			subscribe(function () {
				callback(getState());
			});
		}

		// dispath initial action
		dispatch({type: STORE});

		return {
			getState: getState, 
			dispatch: dispatch, 
			subscribe: subscribe,
			connect: connect,
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
	function Store (reducer, initialState, enhancer) {
		// exit early, reducer is not a function
		if (typeof reducer !== 'function') {
			throwError('reducer should be a function');
		}

		// if initialState is a function and enhancer is undefined
		// we assume that initialState is an enhancer
		if (typeof initialState === 'function' && enhancer === void 0) {
			enhancer = initialState, initialState = void 0;
		}

		// delegate to enhancer if defined
		if (enhancer !== void 0) {
			// exit early, enhancer is not a function
			if (typeof enhancer !== 'function') {
				throwError('enhancer should be a function');
			}

			return applyMiddleware(enhancer)(createStore)(reducer, initialState);
		}

		// if object, multiple reducers, else, single reducer
		return reducer.constructor === Object ? 
								createStore(combineReducers(reducer)) : 
								createStore(reducer);
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
	function animateWith () {
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

				for (var i = 0, len = vendors.length; i < len; i = i + 1) {
					// vendor + capitalized ---> webkitAnimation
					prefixed = (
						vendors[i] + prop.charAt(0).toUpperCase() + prop.substr(1, prop.length)
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
		function flipAnimation (className, duration, transformations, transformOrigin, easing) {
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
					throwError('element not found');
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

					addEventListener(player, 'finish', onfinish);
				} else {
					// cleanup listener, transitionEnd,
					addEventListener(element, transEvtEnd, onfinish);
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
							return void 0;
						}
						// clear transition and transform styles
						prefix(style, 'transition', void 0); 
						prefix(style, 'transform', void 0);
					}

					// remove event listener
					element.removeEventListener(transEvtEnd, onfinish);
					// clear transform origin styles
					prefix(style, 'transformOrigin', void 0);

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
		function cssAnimation (type) {			
			return function keyframe (className, operation) {
				// default to addition
				if (operation === void 0) {
					operation = 1;
				}

				var reducer = operation|0 !== 0 ? addClass : removeClass;

				return function (element, callback) {
					// exit early in the absence of an element
					if (element === void 0 || element === null || element.nodeType === void 0) {
						return (callback(keyframe, element), void 0);
					}

					// push to next event-cycle/frame
					setTimeout(function () {
						// add transition class this will start the transtion
						reducer(element, className);

						// exit early no callback,
						if (callback === void 0) {
							return void 0;
						}

						var duration = 0, 
							transition = getComputedStyle(element)[type + 'Duration'];

						// if !(duration property)
						if (transition === void 0) {
							return (callback(keyframe, element), void 0);
						}

						// remove 's' & spaces, '0.4s, 0.2s' ---> '0.4,0.2', split ---> ['0.4','0.2']
						var transitions = (transition.replace(/s| /g, '').split(','));

						// increament duration (in ms)
						for (var i = 0, len = transitions.length; i < len; i = i + 1) {
							duration = duration + (1000 * parseFloat(transitions[i]));
						}

						// callback, duration of transition, passing element & keyframe to callback
						setTimeout(callback, duration, keyframe, element);
					});
				}
			}
		}

		return {
			flip: flipAnimation,
			transitions: cssAnimation('transition'),
			animations: cssAnimation('animation')
		};
	}


	/**
	 * ---------------------------------------------------------------------------------
	 * 
	 * exports
	 * 
	 * ---------------------------------------------------------------------------------
	 */
	
	exports.h   = createVirtualElement;
	exports.dio = {
		version: VERSION,

		// elements
		createElement: createVirtualElement,
		isValidElement: isValidElement,
		cloneElement: cloneElement,
		createFactory: createFactory,

		// render
		render: render,
		renderToString: renderToString,
		renderToStaticMarkUp: renderToString,

		// components
		Component: createComponentClass(),
		createClass: createClass,

		// stores
		createStore: Store,

		// animations
		animateWith: animateWith(),

		// testing
		PropTypes: createPropTypes(),
		registerEnviroment: registerEnviroment,
		injectWindowDependency: injectWindowDependency,

		// http
		request: request(),
		router: router,

		// streams
		stream: Stream,

		// utilities
		addEventListener: addEventListener,
		bind: functionBind,
		assign: objectAssign,
		keys: objectKeys,
		forEach: forEach,
		reduce: arrayReduce,
		reduceRight: arrayReduceRight,
		filter: arrayFilter,
		map: arrayMap,
		flatten: arrayFlatten,
		splice: spliceArray,
		slice: sliceArray,
		isObject: isObject,
		isFunction: isFunction,
		isString: isString,
		isArray: isArray,
		isDefined: isDefined,
		curry: curry
	};
}));