/**
 *  ___ __ __  
 * (   (  /  \ 
 *  ) ) )( () )
 * (___(__\__/ 
 * 
 * dio.js - a lightweight (~7kb) feature rich Virtual DOM framework
 * @author Sultan Tarimo <https://github.com/thysultan>
 * @licence MIT
 */
(function (root, factory) {
	'use strict';

	// amd
	if (typeof define === 'function' && define.amd) {
		// register as an anonymous module
		define([], factory);
	}
	// commonjs
	else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
		factory(exports);
	} 
	// browser globals
	else {
		factory(root);
	}
}(this, function (exports) {
	'use strict';

	var
	// signatures
	__signatureBase             = '@@dio',
	__streamSignature           = __signatureBase + '/STREAM',
	__storeSignature            = __signatureBase + '/STORE',
	__componentSignature        = __signatureBase + '/COMPONENT',
	__hyperscriptSignature      = __signatureBase + '/HYPERSCRIPT',
	__renderSignature           = __signatureBase + '/RENDER',

	// component lifecycle
	__componentWillReceiveProps = 'componentWillReceiveProps',
	__componentDidMount         = 'componentDidMount',
	__componentWillMount        = 'componentWillMount',
	__componentWillUnmount      = 'componentWillUnmount',
	__componentDidUnmount       = 'componentDidUnmount',
	__componentWillUpdate       = 'componentWillUpdate',
	__componentDidUpdate        = 'componentDidUpdate',

	// objects
	__window    = typeof global === 'object' ? global : exports,
	__document  = __window.document,
	__namespace = {
		math:  'http://www.w3.org/1998/Math/MathML',
		xlink: 'http://www.w3.org/1999/xlink',
		svg:   'http://www.w3.org/2000/svg',
		html:  'http://www.w3.org/1999/xhtml'
	},

	// functions
	__XMLHttpRequest            = __window && __window.XMLHttpRequest,
	__hyperscriptClass          = createHyperscriptClass(),

	// other
	__isDevEnv,
	__setAttribute              = 'setAttribute',
	__removeAttribute           = 'removeAttribute',
	__emptyString               = '',
	// placeholder for regex that is used
	// only when special type selectors are used
	// we will create the regex and cache it the 
	// first time that a special selector is used
	__parseSelectorRegExp;




	/* ---------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------
	 *
	 * 
	 * toArray                       - convert to array
	 * throwError                    - throw/create error object
	 * forEach                       - iterator
	 * map                           - faster `[].map()`
	 * isFunction                    - checks if `a` is a function
	 * isString                      - checks if `a` is a string
	 * isArray                       - checks if `a` is an array
	 * isObject                      - checks if `a` is a Object
	 * isDefined                     - checks if object is defined
	 * setEnviroment                 - set the enviroment, based on NODE_ENV
	 * ObjectKeys                    - get array of object keys
	 * getFunctionDisplayName        - gets a functions displayName/name
	 * 
	 * 
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */




	/**
	 * convert arguments to arrays
	 * 
	 * @param  {IArrayLike<?>} arg
	 * @param  {number}        index
	 * @param  {number}        end
	 * @return {Array}
	 */
	function toArray (arg, index, end) {
		return Array.prototype.slice.call(
			arg, 
			index, 
			end
		);
	}


	/**
	 * throws an error or returns a error if on silent mode
	 * 
	 * @param  {string}  message
	 * @param  {Boolean} silent
	 * @return {Error}
	 */
	function throwError (message, silent) {
		var 
		error = new Error(message);

		if (silent) {
			return error;
		}
		else {
			throw error;
		}
	}

	
	/**
	 * forEach helper
	 * 
	 * @param  {(Array|Object)} arr
	 * @param  {Function}       fn
	 */
	function forEach (arr, fn) {
		// Handle arrays
		if (isArray(arr)) {
			var 
			length = arr.length,
			index  = 0;

			for (; index < length; index = index + 1) {
				// break if fn() returns false
				if (fn(arr[index], index, arr) === false) {
					return;
				}
			}
		}
		// Handle objects 
		else {
			for (var index in arr) {
				// break if fn() returns false
				if (fn(arr[index], index, arr) === false) {
					return;
				}
			}
		}
	}


	/**
	 * faster `[].map()`
	 *
	 * @param  {Array}    subject
	 * @param  {Function} fn
	 * @return {Array}
	 */
	function map (subject, fn) {
		var 
		length = subject.length,
		result = new Array(length),
		index  = 0,
		ret;

		for (; index < length; index = index + 1) {
			ret = fn(subject[index], index, subject);

			if (isDefined(ret)) {
				result[index] = ret;
			}
		}

		return result;
	}


	/**
	 * checks if `a` is a function
	 * 
	 * @param  {*}       a - object to check for type
	 * @return {boolean}
	 */
	function isFunction (a) {
		return !!a && typeof a === 'function';
	}


	/**
	 * checks if `a` is a string
	 * 
	 * @param  {*}       a - object to check for type
	 * @return {boolean}
	 */
	function isString (a) {
		return !!a && typeof a === 'string';
	}


	/**
	 * checks if `a` is an array
	 * 
	 * @param  {*}       a - object to check for type
	 * @return {boolean}
	 */
	function isArray (a) {
		return !!a && a.constructor === Array;
	}


	/**
	 * checks if `a` is an Object
	 * 
	 * @param  {*}       a - object to check for type
	 * @return {boolean}
	 */
	function isObject (a) {
		return !!a && a.constructor === Object;
	}


	/**
	 * checks if object is defined
	 * 
	 * @param  {*}       a - object to check for type
	 * @return {boolean}
	 */
	function isDefined (a) {
		return a !== undefined && a !== null;
	}


	/**
	 * set the __isDevEnv variable
	 */
	function setEnviroment () {
		/*
			first check if __isDevEnv is set
			if it is exit the if block quickly since we have already have a
			stored cached value of what the dev enviroment is
			1.if it is not set, proceed to check first 
			if NODE_ENV is set, a string and not 'production'
			2.otherwise check for process.env.NODE_ENV !== 'production'
			if any of 1 || 2 returns true set __isDevEnv to true, 
			thus caching it for future reference
			meaning that everything within the if block
			 will only compute once and never again
			this may look like a micro-optimization if looked 
			in isolation but if you are creating more than
			100,000 components each with propTypes it beomces evidence that checking for
			the node enviroment everytime is anywhere from 100% to 1000% slower
		 */
		var 
		enviroment = typeof process  === 'object' && process.env ? process.env.NODE_ENV : 
					 typeof NODE_ENV === 'string' ? NODE_ENV : undefined;

		if (enviroment === 'development') {
			__isDevEnv = true;
		}
		else {
			__isDevEnv = false;
		}
	}


	/**
	 * gets all the keys of the an object
	 * 
	 * @param  {Object} obj - object to extract keys from
	 * @return {Array}      - array of keys
	 */
	function ObjectKeys (obj) {
		var 
		keys = [];
		
		for (var key in obj) {
			if (!obj.hasOwnProperty(key)) {
				continue;
			}
			keys.push(key);
		}

		return keys;
	}


	/**
	 * get a functions displayName
	 * 
	 * i.e in function Name () {}
	 * Name is the displayName
	 * 
	 * @param  {Function} func
	 * @return {string}
	 */
	function getFunctionDisplayName (func) {
		/*
			the regex may return nothing
			[,''] insures that the )[1] can always retrieve
			something even if it's an empty string
		 */
		var 
		displayName = (
			/function ([^(]*)/.exec(func.valueOf()) || 
			[,'']
		)[1];

		/*
			we may not find the func's name
			i.e annonymous functions or class extenders
			so we also try to get the name from func.name if it exists
			however this name maybe obscured if a minifier is used on the codebase,
			but something is better than nothing
		 */
		return !displayName && func.name ? func.name : displayName;
	}




	/* ---------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------
	 * 
	 * 
	 * h                             - hyperscript helper
	 * setHyperscriptChild           - set child of hyperscript
	 * parseHyperscriptType          - parse hyperscript special type
	 * 
	 *
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */




	/**
	 * create virtual element
	 * 
	 * @param  {(string|Function|Object)} type        - Element, i.e: div
	 * @param  {Object}                   props       - optional properties
	 * @return {Object}                   hyperscript - {type, props, children}
	 * 
	 * @example
	 * 
	 * h('div', {class: 'close'}, 'Text Content')
	 * h('div', null, h('h1', 'Text'))
	 */
	function h (type, props) {
		var
		args     = arguments,
		length   = args.length,
		children = [],
		// the position that children elements start from
		// as in h('tag', {}, ...children) -> h(0, 1, 2);
		position = 2,
		child;

		// if what was suppose to be the props position
		// is a child (hyperscript or any non object value)
		// example case: h('tag', ...children)
		if (!isObject(props) || props[__hyperscriptSignature]) {
			// only change the position key
			// when props is something other than undefined/null
			if (isDefined(props)) {
				position = 1;
			}

			// default props to an empty object
			props = {};
		}

		// auto set namespaces for svg and math elements
		// but only if it's not already set
		if ((type === 'svg' || type === 'math') && props.xmlns === undefined) {
			props.xmlns = __namespace[type];
		}

		// construct children
		for (var i = position; i < length; i = i + 1) {
			// reference to current layer
			child = args[i];
	
			// if the child is an array go deeper
			// and set the 'arrays children' as children
			if (isArray(child)) {
				forEach(child, function (child) {
					setHyperscriptChild(child, children);
				});
			}
			// deep enough, add this child to children
			else {
				setHyperscriptChild(child, children);
			}
		}

		// support for passing a component as the type argument
		// h(Component, props, children)
		if (isFunction(type)) {
			return extract(type, props, children);
		}

		// create the hyperscript object
		var 
		hyperscript = new __hyperscriptClass({type: type, props: props, children: children});

		// check if the type is a special case i.e [type] | div.class | #id
		// and alter the hyperscript accordingly
		if (
			type.indexOf('.') > -1 ||
			type.indexOf('[') > -1 ||
			type.indexOf('#') > -1
		) {
			hyperscript = parseHyperscriptType(hyperscript);
		}

		return hyperscript;
	}


	/**
	 * set hyperscript children
	 * 
	 * @param  {*}     child
	 * @param  {Array} children
	 */
	function setHyperscriptChild (child, children) {
		// support for child function component
		if (isFunction(child)) {
			child = extract(child);
		}
		// if the child is not an object it is a textNode
		// string, bool, number ...etc, so we convert them to string values
		else if (!isObject(child)) {
			child = {
				type: 'text',
				props: undefined,
				children: [child + '']
			}
		}
		
		children.push(child);
	}


	/**
	 * hyperscript tagger
	 *
	 * for example
	 * 
	 * // return {type: 'input', props: {id: 'id', type: 'checkbox'}}
	 * tag('inpu#id[type=checkbox]')
	 * 
	 * @param  {Object} obj - hyperscript object
	 * @return {Object} obj
	 */
	function parseHyperscriptType (obj) {
		var 
		match,
		classes = [],

		// copy obj's props to abstract props and type
		// incase obj.props is empty create new obj
		// otherwise just add to already available object
		// we will add this back to obj.props later
		props = !obj.props ? {} : obj.props,

		// since we use type in a while loop
		// we will be updating obj.type directly
		// lets keep a copy of the value
		type = obj.type

		// set default type to a div
		obj.type = 'div';

		// if this is the first time we are doing this
		// create and cache the regex so we never have to do this again
		if (!__parseSelectorRegExp) {
			__parseSelectorRegExp   = new RegExp(
				"(?:(^|#|\\.)([^#\\.\\[\\]]+))|" +
				"(\\[(.+?)(?:\\s*=\\s*(\"|'|)((?:\\\\[\"'\\]]|.)*?)\\5)?\\])",
				"g"
			);
		}

		// execute the regex and loop through the results
		while ((match = __parseSelectorRegExp.exec(type))) {
			var 
			matchedType      = match[1],
			matchedValue     = match[2],
			matchedProp      = match[3],
			matchedPropKey   = match[4],
			matchedPropValue = match[6];

			// no special match, set type
			if (matchedType === '' && matchedValue !== '') {
				obj.type = matchedValue;
			}
			// matches id's - #id
			else if (matchedType === '#') {
				props.id = matchedValue;
			} 
			// matches classes - div.classname
			else if (matchedType === '.') {
				classes.push(matchedValue);
			} 
			// matches - [prop=value]
			else if (matchedProp.substr(0,1) === '[') {
				var 
				prop = matchedPropValue;

				// make sure we have a prop value
				if (prop) {
					prop = prop.replace(/\\(["'])/g, '$1').replace(/\\\\/g, "\\");
				}
				// if prop value is an empty string assign true
				props[matchedPropKey] = prop || true;
			}
		}

		// add classes to obj.props if we have any
		if (classes.length > 0) {
			props.className = classes.join(' ');
		}

		// as promised, update props
		obj.props = props;
		
		// done
		return obj;
	}


	/**
	 * extracts, caches and create a component from a pure function/class
	 *
	 * this allows us to pass anything to h(type, ...children)
	 * components, functions, classes, i.e
	 * h(aClassComponent, aPureFunction, aCreateClassComponent)...
	 * 
	 * we do two things
	 * 
	 * 1. check if the function has a __componentSignature, if it does
	 *    extract and return that.
	 *    
	 * 2. if it does not check if it is class or just a function
	 *    if it is a class pass it through createComponent, extract then return that
	 *    if it s a pure function extract it check if it has a render method
	 *    if it does createComponent, extract then return that
	 *    in both cases we store the resulting component from createComponent
	 *    to a __componentSignature property of the function passed
	 *    so that the next time we come across the same function we do
	 *    not need to createComponent again 
	 *    and can just extract and return that as seen in point 1.
	 * 
	 * @param  {(function|Object)} func
	 * @param  {Object}            props
	 * @param  {Array}             children
	 * @return {Object}
	 */
	function extract (func, props, children) {
		var 
		hyperscript;

		// if there is a cache of the component, return it
		if (func[__componentSignature]) {
			// extract and return the hyperscript
			// passing props and children
			hyperscript = func[__componentSignature](props, children);
		}
		else {
			// components created with
			// ... extends dio.Component {}
			// this will only run once after which the precending above if block
			// will take precedence
			if (func.prototype.render) {
				// create and cache the component
				func[__componentSignature] = createComponent(func);
				// call the component storing the resulting hyperscript object
				hyperscript = func[__componentSignature](props, children);
			}
			// functions or components created with .createClass / .createComponent 
			else {
				hyperscript = func(props, children);

				// if not a hyperscript object/returns a component definition
				// with a render method
				if (hyperscript.render) {
					// create and cache the component
					func[__componentSignature] = createComponent(func);
					hyperscript = func[__componentSignature](props, children);
				}
			}
		}

		return hyperscript;
	}




	/* ---------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------
	 *
	 * 
	 * hydrate                       - absorb a dom structure to vdom
	 * vdomToDOM                     - render vdom to dom
	 * patch                         - patch the dom
	 *
	 * 
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */



	/**
	 * hydrate
	 * 
	 * @param  {Node}   parent
	 * @param  {Object} newNode
	 * @param  {Object} component
	 * @return {Object} vnode
	 */
	function hydrate (parent, newNode, component, index, newNodeParent) {
		var 
		nextNode;

		// if the node has children hydrate each of its children
		if (newNode.props && newNode.children) {
			nextNode = parent.childNodes[index];

			var
			newNodeChildren       = newNode.children,
			newNodeChildrenLength = newNodeChildren.length;

			for (var i = 0; i < newNodeChildrenLength; i = i + 1) {
				hydrate(nextNode, newNodeChildren[i], component, i, newNode);
			}

			newNode.dom = nextNode;
		}

		/*
			when we reach a string vnode child, assume the dom 
			is a single textNode, do a look ahead of the 
			vnode child and create + append each textNode child 
			to a documentFragment starting from the current child 
			till we reach a non textNode child such that on 
			h('p', 'foo', 'bar') foo and bar are two different 
			textNodes in the fragment, then do replaceChild of the 
			textNode with the fragment converting the single 
			textNode to multiple textNodes
		 */
		if (!newNode.props && newNode.type === 'text') {
			/*
				fragment to use to replace a single textNode
				with multiple text nodes
				case in point
				h('h1', 'Hello', 'World')
				output: <h1>HelloWorld</h1>
				but HelloWorld is one text node in the dom
				while two in the vnode
			 */
			var 
			fragment = __document.createDocumentFragment();

			// look ahead of this nodes siblings
			// add any that is not an object aka 'textNode'/'string' to
			// the fragment 
			forEach(newNodeParent.children.slice(index), function (textNode) {
				// exit quickly once we encounter a non text/string node
				if (textNode.props) {
					return false;
				}

				appendChild(fragment, createElement(textNode));
			});

			// replace the textNode with a set of textNodes
			replaceChild(parent, parent.childNodes[index], fragment);
		}

		// dom node
		nextNode = parent.childNodes[index];

		// add event listeners to non textNodes
		// add dom node to refs
		if (newNode.props) {
			// set refs
			setRefs(newNode, nextNode, component);
			// add events if any
			addEventListeners(nextNode, newNode.props);
		}

		return newNode;
	}


	/**
	 * diff virtual component and update dom
	 * 
	 * @param {Node}   parent - dom node
	 * @param {Object} newNode
	 * @param {Object} oldNode
	 * @param {Object} component
	 */
	function vdomToDOM (parent, newNode, oldNode, component) {
		// update
		if (oldNode) {
			var
			newNodeChildren = newNode.children,
			oldNodeChildren = oldNode.children;

			patch(
				parent,
				newNode,
				oldNode,
				0,
				component, 				
				newNodeChildren,
				oldNodeChildren,
				newNodeChildren.length,
				oldNodeChildren.length
			);
		}
		// mount
		else {
			patch(
				parent,
				newNode,
				oldNode,
				0,
				component
			);
		}
	}



	/**
	 * patch dom
	 * 
	 * @param  {Node}   parent
	 * @param  {Object} newNode
	 * @param  {Object} oldNode
	 * @param  {number} index
	 * @param  {Object} component
	 * @param  {Array}  newNodeChildren
	 * @param  {Array}  oldNodeChildren
	 * @param  {number} newNodeChildrenLength
	 * @param  {number} oldNodeChildrenLength
	 */
	function patch (
		parent,
		newNode, 
		oldNode,
		index, 
		component,
		newNodeChildren, 
		oldNodeChildren,
		newNodeChildrenLength, 
		oldNodeChildrenLength
	) {		
		// adding to the dom
		if (oldNode === undefined) {
			// dom operation, create node
			var
			nextNode = createElement(newNode, component);
			// dom operation, append node
			appendChild(parent, nextNode, newNode);
		}

		// removing from the dom
		else if (newNode === undefined) {
			var
			prevNode = oldNode.dom;
			// dom operation, remove node
			removeChild(parent, prevNode, oldNode);
		}

		// updating keyed items
		else if (keysChanged(newNode, oldNode)) {			
			var
			currentNode = oldNode.dom;

			// remove
			if (newNodeChildrenLength < oldNodeChildrenLength) {
				// dom operation, remove node
				removeChild(parent, currentNode, newNode);
				// update the oldChildren array to remove the old node
				spliceNode(oldNodeChildren, index, 1);

				return false;
			}
			else {
				// dom operation, create element
				var
				nextNode = createElement(newNode);

				// add
				if (newNodeChildrenLength > oldNodeChildrenLength) {
					// dom operation, insert node
					insertBefore(parent, currentNode, nextNode, newNode);
					// update the oldChildren array to include the new node					
					spliceNode(oldNodeChildren, index, 0, newNode);

					return index === 0 ? undefined : true;
				}
				// replace
				else {
					// dom operation, replace node
					replaceChild(parent, currentNode, nextNode, newNode);
					// replace old dom node reference with new
					oldNode.dom = nextNode;
				}
			}
		}

		// replacing a node
		else if (nodeChanged(newNode, oldNode)) {
			var
			prevNode = oldNode.dom;

			// text node
			if (!oldNode.props &&!newNode.props) {
				prevNode.nodeValue = newNode.children[0];
			}
			else {
				var
				// dom operation, create node
				nextNode = createElement(newNode);
				// dom operation, replace node
				replaceChild(parent, prevNode, nextNode, newNode);
				// replace old dom node reference with new
				oldNode.dom = nextNode;
			}
		}

		// the lookup loop down the stack
		else if (
			newNode.shouldComponentUpdate !== false &&
			newNode.props &&
			oldNode.props &&
			newNodeChildren &&
			oldNodeChildren
		) {
			var
			nextNode              = oldNode.dom;

			newNodeChildren       = newNode.children,
			oldNodeChildren       = oldNode.children,
			newNodeChildrenLength = newNodeChildren.length,
			oldNodeChildrenLength = oldNodeChildren.length;

			// update props
			handlePropChanges(nextNode, newNode, oldNode);

			// loop through children
			for (
				var i = 0;
				i < newNodeChildrenLength || i < oldNodeChildrenLength; 
				i = i + 1
			) {
				var
				newNodeChild = newNodeChildren[i],
				oldNodeChild = oldNodeChildren[i];

				var
				action = patch(
					nextNode,
					newNodeChild, 
					oldNodeChild,
					i,
					undefined,
					newNodeChildren,
					oldNodeChildren,
					newNodeChildrenLength,
					oldNodeChildrenLength
				);

				// re-reconcile key changes
				if (action !== undefined) {
					newNodeChildrenLength = newNodeChildrenLength - 1,
					oldNodeChildrenLength = oldNodeChildrenLength - 1;

					if (action === true) {
						newNodeChildren[i+1].dom = oldNodeChildren[i].dom;
					}
					else {
						newNodeChildren[i].dom = oldNodeChildren[i].dom;
					}
				}
			}
		}

		// normalize dom references
		if (
			oldNode && 
			newNode && 
			oldNode.type && 
			newNode.type
		) {
			newNode.dom = oldNode.dom;
		}
	}


	/**
	 * remove/insert a node uses shift/unshift/pop/push when optimal
	 * 
	 * @param  {Array}  arr
	 * @param  {number} index
	 * @param  {number} deleteCount
	 * @param  {Object} item
	 */
	function spliceNode (arr, index, deleteCount, item) {
		if (item) {
			// prepend using faster unshift if start of array
			if (index === 0) {
				arr.unshift(item);
			}
			// append using faster push if end of array
			else if (index >= arr.length - 1) {
				arr.push(item);
			}
			// insert
			else {
				arr.splice(index, deleteCount, item);
			}
		}
		else {
			// faster shift if start of array
			if (index === 0) {
				arr.shift();
			}
			// faster pop if end of array
			else if (index >= arr.length - 1) {
				arr.pop();
			}
			// insert
			else {
				arr.splice(index, deleteCount);
			}
		}
	}



	/**
	 * check if keyed nodes have changed
	 * 
	 * @param  {Object}  newNode
	 * @param  {Object}  oldNode
	 * @return {boolean}
	 */
	function keysChanged (newNode, oldNode) {
		return (
			newNode.props && oldNode.props &&
			newNode.props.key !== oldNode.props.key
		);
	}


	/**
	 * check if two nodes have changed
	 * 
	 * @param  {Object} newNode
	 * @param  {Object} oldNode
	 */
	function nodeChanged (newNode, oldNode) {
		var
		// text node
		text = (
			!newNode.props && !oldNode.props &&
			newNode.children[0] !== oldNode.children[0]
		),
		// element type
		type = newNode.type !== oldNode.type;

		return text || type;
	}


	/**
	 * remove element from dom
	 * 
	 * @param  {Node}   parent
	 * @param  {Node}   nextNode
	 * @param  {Object} oldNode
	 */
	function removeChild (parent, nextNode, oldNode) {
		lifecycle(oldNode, __componentWillUnmount);
		parent.removeChild(nextNode);
		lifecycle(oldNode, __componentDidUnmount);
	}


	/**
	 * append element to the dom
	 * 
	 * @param  {Node}   parent
	 * @param  {Node}   nextNode
	 * @param  {Object} newNode
	 */
	function appendChild (parent, nextNode, newNode) {
		lifecycle(newNode, __componentWillMount);
		parent.appendChild(nextNode);
		lifecycle(newNode, __componentDidMount);
	}


	/**
	 * insert an element to the dom at a posiiton
	 * 
	 * @param  {Node}   parent
	 * @param  {Node}   beforeNode
	 * @param  {Node}   nextNode
	 * @param  {Object} newNode
	 */
	function insertBefore (parent, beforeNode, nextNode, newNode) {
		lifecycle(newNode, __componentWillMount);			
		parent.insertBefore(nextNode, beforeNode);
		lifecycle(newNode, __componentDidMount);
	}


	/**
	 * replace an element in the dom
	 * 
	 * @param  {Node}   parent 
	 * @param  {Node}   prevNode
	 * @param  {Node}   nextNode
	 * @param  {Object} newNode
	 */
	function replaceChild (parent, prevNode, nextNode, newNode) {
		lifecycle(newNode, __componentWillUpdate);
		parent.replaceChild(nextNode, prevNode);
		lifecycle(newNode, __componentDidUpdate);
	}


	/**
	 * create an element
	 * @param  {(Object|string)} newNode
	 * @param  {Object}          component
	 * @param  {string}          namespace
	 * @return {Node}
	 */
	function createElement (newNode, component, namespace) {
		var 
		element;

		// text nodes
		if (!newNode.props) {
			element = newNode.children[0];

			if (!isString(element)) {
				element = element + '';
			}

			newNode.dom = __document.createTextNode(element);
		}
		else {
			var 
			element,
			children = newNode.children;

			// assign namespace if set
			if (newNode.props && newNode.props.xmlns) {
				namespace = newNode.props.xmlns;
			}

			// namespaced
			if (namespace) {
				element = __document.createElementNS(namespace, newNode.type);

				if (!newNode.props.xmlns) {
					newNode.props.xmlns = namespace;
				}
			}
			// default
			else {
				element = __document.createElement(newNode.type);
			}

			// set refs
			setRefs(newNode, element, component);
			// diff and update/add/remove props
			setElementProps(element, newNode.props);
			// add events if any
			addEventListeners(element, newNode.props);
			
			// only map children arrays
			if (isArray(children)) {
				forEach(children, function (newNodechild) {
					var 
					nextNode = createElement(newNodechild, component, namespace);
					appendChild(element, nextNode, newNodechild);
				});
			}

			newNode.dom = element;
		}

		return newNode.dom;
	}


	/**
	 * adds node's dom reference to component
	 * 
	 * @param {Object} node
	 * @param {Node}   element
	 * @param {Object} component
	 */
	function setRefs (node, element, component) {
		if (isObject(node[__hyperscriptSignature])) {
			component = node[__hyperscriptSignature];
		}

		if (component && node.props && node.props.ref) {
			var
			ref = node.props.ref;

			// we have a component and string ref
			if (component && isString(ref)) {
				// create the refs object if it doesn't already exist
				component.refs = component.refs || {};
				// set string refs
				component.refs[ref] = element;
			}
			// function ref, execute and pass the element as a parameter
			else if (isFunction(ref)) {
				ref(element);
			}
		}
	}


	/**
	 * check if a prop is an event
	 * 
	 * @param  {string}  name
	 * @param  {*}       value
	 * @return {boolean}
	 */
	function isEventProp (name, value) {
		// checks if the first two characters are on
		return name.substr(0,2) === 'on' && isFunction(value);
	}


	/**
	 * extract event name from prop name
	 * 
	 * i.e onClick -> click || onclick -> click
	 * 
	 * @param  {string} name
	 * @return {string}
	 */
	function extractEventName (name) {
		// removes the first two characters and converts to lowercase
		return name.substr(2, name.length).toLowerCase();
	}


	/**
	 * add event listeners
	 * 
	 * @param {Node}   target
	 * @param {Object} props
	 */
	function addEventListeners (target, props) {
		for (var name in props) {
			var 
			value = props[name];

			if (isEventProp(name, value)) {
				// is a callback
				target.addEventListener(extractEventName(name), value, false);
			}
		}
	}


	/**
	 * handle prop changes
	 * 
	 * @param  {Node}   target
	 * @param  {Object} newNode
	 * @param  {Object} oldNode
	 */
	function handlePropChanges (target, newNode, oldNode) {
		// get prop changs
		var
		changes = getPropChanges(newNode.props, oldNode.props);

		// if there are any prop changes
		if (changes.length) {
			// before updating all the props that have changed
			lifecycle(newNode, __componentWillUpdate);

			var 
			namespace = newNode.props.xmlns,
			index     = 0,
			length    = changes.length;

			for (; index < length; index = index + 1) {
				var 
				prop = changes[index];

				updateElementProps(
					target,
					prop[0],
					prop[1],
					prop[2],
					namespace
				);
			}

			// after updating all the props that have changed
			lifecycle(newNode, __componentDidUpdate);
		}
	}

	/**
	 * get list of changed props
	 * 
	 * @param  {Object}  newProps
	 * @param  {Object}  oldProps
	 * @return {Array[]} [0: action, 1: name, 2: value]
	 */
	function getPropChanges (newProps, oldProps) {
		// buffer to store diff changes
		var
		changes = [];

		// go through all newProps
		// if there is a prop that is not in oldProps
		// or a value that is but is not the same
		// as the prop in newProps then set it
		for (var name in newProps) {
			var 
			oldValue = oldProps[name],
			newValue = newProps[name];

			if (!isDefined(oldValue) || (isDefined(oldValue) && (oldValue !== newValue))) {
				changes[changes.length] = [__setAttribute, name, newValue];
			}
		}

		// go through all oldProps
		// if there is a prop in oldProps
		// that is not also in newProps, remove it
		for (var name in oldProps) {
			var 
			oldValue = oldProps[name],
			newValue = newProps[name];

			if (!isDefined(oldValue)) {
				// we add __emptyString to 1 make sure there are always
				// 3 values in the array and in the base case that
				// they are all strings, 
				// constant length + constant type makes it easier for
				// the compiler to do some ahead of time optimizations.
				changes[changes.length] = [__removeAttribute, name, __emptyString];
			}
		}

		// return our changes
		return changes;
	}


	/**
	 * set props when element is created
	 * 
	 * @param  {Node}    target
	 * @param  {Object}  props
	 */
	function setElementProps (target, props) {
		for (var name in props) {
			updateElementProps(target, __setAttribute, name, props[name], props.xmlns);
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
	function updateElementProps (target, action, name, value, namespace) {
		// don't add events/refs/keys as props/attrs
		if (
			name === 'ref' || 
			name === 'key' ||
			isEventProp(name, value)
		) {
			return;
		}

		// set xlink:href attr
		if (name === 'xlink:href') {
			return target[action+'NS'](__namespace['xlink'], 'href', value);
		}

		// don't set xmlns namespace attributes we set them when we create an element
		if (value === __namespace['svg'] || value === __namespace['math']) {
			return;
		}

		// normalize class/className references
		if (namespace === __namespace['svg']) {
			// svg className is not the same as html
			// default to 'class' if  'className'
			if (name === 'className') {
				name = 'class'
			}
		}
		else {
			// in html elements 
			// accessing className directly is faster 
			// that setAttribute('class', value)
			// default to className if 'class'
			if (name === 'class') {
				name = 'className'
			}
		}

		// objects
		if (isObject(value)) {
			// classes
			if (name === 'className') {
				forEach(value, function (content, index) {
					var 
					type = !content ? 'remove' : 'add';

					// add/remove class
					classList(type, target, index);
				});
			}
			// styles and other object {} type props
			else {
				forEach(value, function (value, index) {					
					if (index in target[name]) {
						target[name][index] = value;
					}
				});
			}
		}
		// array of classes
		else if (isArray(value) && name === 'className') {
			target[action](name, value.join(' '));
		}
		// everything else
		else {
			if (
				target[name] !== undefined &&
				namespace    !== __namespace['svg']
			) {
				target[name] = value;
			}
			else {
				target[action](name, value);
			}
		}
	}




	/* ---------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------
	 *
	 * 
	 * lifecycle                     - executes a lifecycle methods
	 * createRender                  - creates a render instance
	 * createHyperscriptClass        - creates hyperscript class
	 * createStateLessComponent      - creates a stateless component
	 * createComponent               - creates a component
	 * componentClass                - components class / interface / blueprint
	 * setProps                      - updates a components props
	 * setState                      - updates a components state
	 * withAttr                      - two-way data binding helper
	 * logValidationError            - log validation results
	 * validatePropTypes             - validate prop types
	 * createPropTypes               - creates primitive prop types
	 *
	 * 
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */




	/**
	 * component lifecycle trigger
	 * 
	 * @param  {Object}  node        - component, or hyperscript
	 * @param  {string}  stage       - stage of the lifecycle
	 * @param  {boolean} isComponent - weather this is a component or not
	 * @param  {Object}  props       - weather to pass props to stage
	 * @param  {Object}  state       - weather to pass sate to stage
	 */
	function lifecycle (node, stage, isComponent, props, state) {
		// end quickly if node is not from statefull component
		// since all state less components do not 
		// feature lifecyclem methods
		if (!isComponent && (!node || (!node[__hyperscriptSignature] && !node.render))) {
			return;
		}

		var 
		component;

		// when we know that node is a component
		// we passed isComponent as true
		if (isComponent) {
			component = node;
		}
		// node is a hyperscript object
		// check if it has a component reference
		else if (isObject(node[__hyperscriptSignature])) {
			component = node[__hyperscriptSignature];
		}

		if (component && component[stage]) {
			/*
				is the props/state truthy? if so check if it is not a boolean
				if so default to the value in props/state passed, 
				if it is default to the components own props.
				if props/state is falsey value, 
				default to undefined
				props is either the value of the props passed as an argument
				or the value of the components
			 */
			props = props || component.props,
			state = state || component.state;

			/*
				componentShouldUpdate returns a Boolean
				so we publish the lifecycle return values
				which we can use in the vdomToDOM / update () function
				to see if we should skip an element or not
			 */
			return component[stage](props, state, component);
		}
	}


	/**
	 * creates a render interface

	 * example
	 * 
	 * render = dio.createRender(Component, '.selector')
	 * render()
	 *
	 * @return {Function}
	 */
	function createRender (componentBlueprint, mountBlueprint) {
		// update
		function update (props, children) {
			// get a fresh copy of the vdom
			newNode = component(props, children);
			vdomToDOM(mountElement, newNode, oldNode);
			// this newNode = the next renders oldNode
			oldNode = newNode;
		}

		// initial mount
		function mount (props, children) {
			// don't try to set it's internals if it's statless
			if (!isStatelessComponent && componentObject) {
				// reference render, so we can then call this in this.setState, 
				// this only applied to parent components passed to
				// .createRender(here, ...);
				if (!componentObject.$render) {
					componentObject.$render = update;
				}
			}

			// get a fresh copy of the vdom
			newNode = component(props, children);
				
			// configured to hydrate the dom into vdom
			if (isHydrateElement) {
				mountElement.removeAttribute('data-hydrate');
				hydrate(mountElement, newNode, componentObject, 0);				
			}
			else {
				// clear container
				mountElement.textContent = '';
				// execute initial mount
				vdomToDOM(mountElement, newNode, undefined, componentObject);
			}

			// this newNode is equal to the next renders oldNode
			oldNode = newNode;
			// publish that the initial mount has taken place
			initialRender = false;
		}

		// return function that runs update/mount when executed
		function render (props, children, forceUpdate) {
			if (forceUpdate) {
				// return hyperscript if requested
				if (forceUpdate === __hyperscriptSignature) {
					return component(props, children);
				}
				// return component if requested
				else if (forceUpdate === __componentSignature) {
					return component(props, children, true);
				}
			}

			// return html if there is no document to mount to
			if (!__document) {
				var 
				cache = component(props, children);

				return function (props, children) {
					return createHTML(
						!!props && !!children ? component(props, children) : cache
					);
				}
			}

			// when the mountBlueprint is a function
			if (mountElementIsFunction) {
				mountElement = mountElementIsFunction();

				if (oldMountElement !== mountElement) {
					forceUpdate = true;
				}

				oldMountElement = mountElement;
			}
			
			// initial render
			if (initialRender || forceUpdate) {
				// mount and publish that the initial render has taken place
				mount(props, children);
			}
			// updates
			else {
				update(props, children);
			}

			return render;
		}

		// set mount element
		function setMountElement (mountBlueprint) {
			if (__document) {
				// element
				if (mountBlueprint && mountBlueprint.nodeType) {
					mountElement = mountBlueprint;
				}
				// string
				else if (isString(mountBlueprint)) {
					mountElement = __document.querySelector(mountBlueprint);
				}
				// function/stream
				else if (isFunction(mountBlueprint)) {
					mountElementIsFunction = mountBlueprint;
				}

				// default element
				if (!mountElement || mountElement === __document) {
					mountElement = __document.body;
				}

				// check if the mount element is setup for hydration
				if (mountElement.hasAttribute('data-hydrate')) {
					isHydrateElement = true;
				}
			}
		}

		render.id = __renderSignature;

		var
		component,
		newNode,
		oldNode,
		oldMountElement,
		mountElement,
		mountElementIsFunction,
		componentObject,
		isStatelessComponent,
		isHydrateElement,
		initialRender = true;

		// get mountElement
		setMountElement(mountBlueprint);

		// create parent component
		component = createComponent(componentBlueprint);

		// a component exists
		if (component) {
			// determine if the component is stateless
			if (component.stateLess) {
				isStatelessComponent = true;
			}

			// don't try to get it's internals if it's stateless
			if (!isStatelessComponent) {
				componentObject = component(undefined, undefined, true);
			}

			// react-like behaviour
			// i.e h(Component, {...props}, ...children) behaviour
			if (componentBlueprint.type) {
				return render();
			}
			// normal behaviour
			// i.e render(Component, mount)({...props}, [children])
			else {
				return render;
			}
		}
		// can't find the parent component
		else {
			// .createRender/.render accepts functions/objects
			throwError('no component found');
		}
	}


	/**
	 * hyperscript class
	 * 
	 * @param  {Array}    args - arugments to add to the prototype object
	 * @return {Function}
	 */
	function createHyperscriptClass (component) {
		// interface
		function h (obj) {
			if (!obj) {
				// make sure your render method 
				// returns a hyperscript object
				throwError('no hyperscript found');
			}

			this.type     = obj.type,
			this.props    = obj.props,
			this.children = obj.children;
		}

		h.prototype[__hyperscriptSignature] = component || true;
		// we want the constructor of the resulting created object
		// from new hyperscript()... to use the Object constructor
		h.prototype.constructor = Object;

		return h;
	}


	/**
	 * creates a state less component
	 *
	 * @param {Object} hyperscript
	 */
	function createStateLessComponent (hyperscript) {
		function Component () {
			return hyperscript;
		}

		Component.stateLess = true;

		return Component;
	}


	/**
	 * creates a component
	 * 
	 * @param  {(Function|Object)} arg - component
	 * @return {Function}
	 */
	function createComponent (componentBlueprint) {
		var 
		componentInterface,
		displayName;

		// maybe the arg is a function that returns an object
		if (isFunction(componentBlueprint)) {
			// already a component
			if (componentBlueprint.id === __componentSignature) {
				return componentBlueprint;
			}

			// a component created with class extends dio.Component
			if (componentBlueprint.prototype.render) {
				componentInterface = new componentBlueprint(componentBlueprint.defaultProps);

				if (componentBlueprint.propTypes) {
					componentInterface.propTypes = componentBlueprint.propTypes;
				}
			}
			// pure function
			else {
				componentInterface = componentBlueprint();
			}

			if (!componentInterface) {
				// make sure your component functions return
				// something i.e hyperscript/object with render method
				throwError('no render');
			}
			// a stateless component
			// we assume it returns a hyperscript object
			// rather than a render method
			else if (!componentInterface.render) {
				componentBlueprint.stateLess = true;
				return componentBlueprint;
			}

			// get displayName from componentInterface or function
			// i.e a function Foo () { ... } // => Foo
			displayName = (
				componentInterface.displayName || getFunctionDisplayName(componentBlueprint)
			);
		}
		// we have an object
		else if (isObject(componentBlueprint)) {
			// does the object have a render method
			// if not create one that returns 'componentBlueprint' which we 
			// assume is a hyperscript object thus a stateless component
			if (componentBlueprint.render) {
				componentInterface = componentBlueprint;
			}
			// a hyperscript object with a component reference
			else if (isObject(componentBlueprint[__hyperscriptSignature])) {				
				componentInterface = componentBlueprint[__hyperscriptSignature];
			}
			// componentBlueprint is a hyperscript object, create a stateless component
			else {
				return createStateLessComponent(componentBlueprint);
			}
		}
		else {
			// .createClass/.createComponent accepts only functions/objects
			throwError('invalid component');
		}

		// everything checks out i.e
		// - componentInterface has a render method
		// - or componentBlueprint() returns an object that has a render method
		// stateless components never reach here

		// the component object
		var
		component;

		// instance of the componentClass
		if (componentInterface.id === __componentSignature) {
			component = componentInterface;
		}
		// not an instance of the componentClass
		// create new
		else {
			component = new componentClass(
				componentInterface.props, 
				componentInterface.state, 
				displayName
			);
		}

		// add the properties from the object describing
		// the component to the component instance
		// and bind methods to the component scope
		// we bind .render later on.
		forEach(componentInterface, function (value, name) {
			// methods
			if (isFunction(value)) {
				// pass props and state to render
				if (name !== 'render') {
					component[name] = value.bind(component);
				}
			}
			// everything else
			else {
				component[name] = value;
			}
		});

		// if this method is set, set the initial state
		if (component.getInitialState) {
			component.state = component.getInitialState();
		}
		// if this method is set, set the default props
		if (component.getDefaultProps) {
			component.props = component.getDefaultProps();
		}

		/*
			creates a hyperscript class
			with the passed values in the array as it's prototypes
			such that it looks like
			{
					type: '...', 
					props: {...}, 
					children: ...,
					shouldComponentUpdate: true,
					@@dio/COMPONENT: component
			}
			by default a component is always set to update, as in true
			untill changed in a shouldComponentUpdate method
		 */
		var 
		hyperscript = createHyperscriptClass(component);

		// get the render method bound to the component
		var
		render = componentInterface.render.bind(
			component,
			component.props,
			component.state,
			component
		);

		// reset the render method to one that
		// insures the render function returns the newly
		// created hyperscript object
		component.render = function () {
			return new hyperscript(render());
		}

		var
		shouldComponentUpdate     = !!component.shouldComponentUpdate,
		componentWillReceiveProps = !!component.componentWillReceiveProps,

		// if this is a dev enviroment and the component has propTypes assigned.
		// signal that validation should take place
		// we cache this value now so we don't need to do this later
		// whenever a component is called
		shouldValidatePropTypes   = !!__isDevEnv && !!component.propTypes;

		// we will return a function that when called
		// returns the components vdom representation
		// i.e User(props) -> {type: 'div', props: {..props}, children: ...}
		// this is that function
		function Component (props, children, internal) {
			// expose the components internal configuration when requested
			if (internal) {
				return component;
			}

			// check if cached hyperscript
			if (
				shouldComponentUpdate &&
				component.$hyperscript &&
				isDefined(
					component.shouldComponentUpdate(
						component.props, 
						component.state, 
						component
					)
				)
			) {
				return component.$hyperscript;
			}

			// add children to props if set
			if (children) {
				props = props || {};
				props.children = children;
			}

			// publish componentWillReceiveProps lifecycle
			if (props) {
				// the cached value we where talking about
				if (shouldValidatePropTypes) {
					validatePropTypes(props, component.propTypes, component.displayName);
				}
				// execute componentWillReceiveProps lifecycle
				if (componentWillReceiveProps) {
					lifecycle(component, __componentWillReceiveProps, true, props);
				}
				// set props
				setProps(component, props);
			}

			// extract and add cached copy of hyperscript
			return component.$hyperscript = component.render();
		}

		// add a signature by which we can identify that this function
		// is a component
		Component.id = __componentSignature;

		return Component;
	}


	/**
	 * components class
	 * 
	 * @param  {Object} props
	 * @param  {Object} state
	 * @param  {string} displayname
	 * @return {Object}
	 */
	function componentClass (props, state, displayName) {
		// immutable internal props & state
		this.props       = props       || {},
		this.state       = state       || {},
		this.displayName = displayName || '';

		if (!isDefined(__isDevEnv)) {
			setEnviroment();
		}	
	}


	/**
	 * components class prototype
	 */
	componentClass.prototype = {
		id: __componentSignature,
		// i.e this.setState({})
		setState: function (data, callback) {
			/*
				set state
				if the state is changed
				setState will return true
				thus force and update when
				that happens
			*/
			if (setState(this, data)) {
				if (callback) {
					callback(this.state);
				}

				// redraw only if and after state changes
				this.forceUpdate();
			}
		},
		// i.e this.setProps({})
		setProps: function (data) {
			// set props does not trigger an redraw/update
			setProps(this, data);
		},
		// force update public method
		forceUpdate: function (self, props, children) {
			// same thing
			self = self || this;

			// if a component function is passed
			if (isFunction(self)) {
				// function with component reference, extract
				if (self[__componentSignature]) {
					self = self[__componentSignature](props, children, true);
				}
				// component, extract
				else if (self.id === __componentSignature) {
					self = self(props, children, true);
				}
				// pure function, create component
				else {
					self = extract(self);
				}
			}

			// self is defined
			if (self) {
				// parent component / render instance
				if (self.$render) {
					self.$render();
				}
				/*
					child component!
					do a granular update
					this allows us to pass a component to forceUpdate
					to single it out and update it from another component
					i.e this.forceUpdate(ComponentA)
					will extract the contents of ComponentA
					get it's last rendered state
					get it's next render state
					then do a granular update of just that component
					this allows for things such as updating a different
					component from within one component without
					needing to have a central store or even
					or having that component nested as a child and
					passing it the forceUpdate function to call
				*/
				else if (self.$hyperscript && self.$hyperscript.dom) {
					var
					parent  = self.$hyperscript.dom,
					newNode = self.render(),
					oldNode = self.$hyperscript;

					vdomToDOM(parent, newNode, oldNode, 0, self);
				}

				// if the second argument props is a callback
				// executre it
				if (isFunction(props)) {
					props();
				}
			}
		},
		withAttr: function (props, setters, callback, self) {
			// same thing
			self = self || this;

			if (!isFunction(callback)) {
				callback = function () {
					self.forceUpdate.call(self);
				}
			}

			return withAttr(props, setters, callback.bind(self))
		}
	}


	/**
	 * set/update a components props
	 * 
	 * @param {Object} self - components object
	 * @param {Object} data - data with which to update the components props
	 */
	function setProps (self, data) {
		// assign props to {} if it's undefined
		self.props = self.props || {};

		// if the object is a function that returns an object
		if (isFunction(data)) {
			data = data();
		}

		// make sure we have something to update
		if (data) {
			// set props
			forEach(data, function (value, name) {
				self.props[name] = value;
			});
		}
	}


	/**
	 * set/update a components state
	 * 
	 * @param {Object} self - components object
	 * @param {Object} data - data with which to update the components state
	 */
	function setState (self, data) {
		// assign state to {} if it's undefined
		self.state = self.state || {};

		// if the object is a function that returns an object
		if (isFunction(data)) {
			data = data();
		}

		// make sure we have something to update
		if (data) {
			// set state
			forEach(data, function (value, name) {
				self.state[name] = value;
			});

			return true;
		}
	}


	/**
	 * two-way data binding, not to be confused with Function.bind
	 * 
	 * example
	 * 
	 * direction of binding element ----> setter
	 * this.withAttr(
	 * 		['prop1-from-el', 'prop2-from-el'], 
	 * 		to-prop1-setter, to-prop2-setter
	 * )
	 * 
	 * direction of binding element <---- setter
	 * this.withAttr(
	 * 		[to-prop1-setter, to-prop2-setter], 
	 *   	['prop1-from-el', 'prop2-from-el']
	 * )
	 *
	 * setters are always an array of: functions
	 * and element props: strings
	 * 
	 * @param  {(string|string[])}     props  - attr to look for in the element
	 * @param  {(Function|Function[])} setter - object to update/setter to execute
	 * @return {Function}
	 */
	function withAttr (props, setters, callback) {
		function update (el, prop, setter) {
			var
			value;

			// prop is a string, get value from element
			if (isString(prop)) {
				// get key from element
				// either the prop is a property of the element object
				// or an attribute
				value = (prop in el) ? el[prop] : el.getAttribute(prop);

				// just an <if(value)> doesn't work since the value can be false
				// null or undefined = prop/attr doesn't exist
				if (value !== undefined && value !== null) {
					// run the setter
					setter(value);
				}
			}
			// setter is a string, get value from stream
			else {
				value = prop()
				
				if (value !== undefined && value !== null) {
					(setter in el) ? el[setter] = value : el.setAttribute(setter, value);
				}
			}
		}

		/*
			the idea is that when you attach a function to an event,
			i.e el.addEventListener('eventName', fn)
			when that event is dispatched the function will execute
			making the this context of this function the element 
			that the event was attached to
			we can then extract the value, and run the prop setter(value)
			to change it's value
		 */
		return function () {
			// assign element
			var 
			el  = this;

			// array of bindings
			if (isArray(props)) {
				forEach(props, function(value, index) {
					update(el, value, setters[index]);
				});
			}
			// singles
			else {
				update(el, props, setters);
			}

			// execute callback if specified
			if (callback) {
				callback()
			}
		}
	}




	/* ---------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------
	 *
	 * 
	 * logValidationError            - log validation results
	 * validatePropTypes             - validate prop types
	 * createPropTypes               - create primitive prop types
	 * injectWindowDependency        - inject a mock window
	 * 
	 * 
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */




	/**
	 * log validation errors for propTypes
	 * 
	 * @param {string} error 
	 */
	function logValidationError (error) {
		console.error('Warning: Failed propType: ' + error + '`.');

		try {
			// this error is thrown as a convenience so that you can use this stack
			// to find the callsite that caused this warning to fire.
			// i.e in chrome > dev tools > sources > pause on exceptions
			throwError(error);
		} catch (e) {}
	}


	/**
	 * creates an error message for invalide prop types
	 * 
	 * @param  {string} propName
	 * @param  {*}      propValue
	 * @param  {string} displayName
	 * @param  {string} expectedType
	 * @return {Error}
	 */
	function createInvalidPropTypeError (propName, propValue, displayName, expectedType) {
		return throwError(
			'Invalid prop `' + propName +
			'` of type `' + 
			getFunctionDisplayName(propValue.constructor).toLowerCase() +
			'` supplied to `' +
			displayName +
			'`, expected `' + expectedType,

			true
		);
	}


	/**
	 * creates an error message for required prop types
	 * 
	 * @param  {string} propName
	 * @param  {string} displayName
	 * @return {Error}
	 */
	function createRequiredPropTypeError (propName, displayName) {
		return throwError(
			'Required prop `' +
			propName + '` not specified in `' + 
			displayName,

			true
		);
	}


	/**
	 * check and validate prop types
	 * 
	 * @param  {Object} props       
	 * @param  {Object} propTypes   
	 * @param  {string} displayName - components display name/function name
	 */
	function validatePropTypes (props, propTypes, displayName) {
		// for each of the prop types specified
		forEach(propTypes, function (typeValidator, propName) {
			// execute the validator function
			var 
			validationResult = typeValidator(
					props, 
					propName, 
					displayName,
					createInvalidPropTypeError, 
					createRequiredPropTypeError
			);

			// an error has occured only if the validator
			// has returned something
			if (validationResult) {
				// log validation error
				logValidationError(validationResult);
			}
		});
	}


	/**
	 * create the propTypes object
	 * 
	 * @return {Object}
	 */
	function createPropTypes () {
		var
		types        = ['number', 'string', 'bool', 'array', 'object', 'func'],
		propTypesObj = {};

		// check if the type is valid
		function isValidType (propValue, name) {
			// convert something like `function` to `Function`
			// since function is not a constructor that we can 
			// find on the root/window object but 
			// Function, Array, String, Function... are
			var 
			type = name.substr(0,1).toUpperCase() + name.substr(1);

			// we then check if the propValue is of this type
			// if window[type] yields nothing we default to a function
			// that propValue could not possible have it\s constructor
			// set to it.
			return isDefined(propValue) && propValue.constructor === __window[type];
		}

		// factory that creates a type validator
		function createTypeValidator (expectedType, isRequired) {
			function typeValidator (props, propName, displayName) {
				var 
				propValue = props[propName];
				// if the displayName is not default to #unknown
				displayName = displayName || '#unknown';

				// a prop was passed, as in it's not undefined
				if (isDefined(propValue)) {
					// if it's not of the valid type
					if (!isValidType(propValue, expectedType)) {
						return createInvalidPropTypeError(
							propName, 
							propValue, 
							displayName, 
							expectedType
						);
					}
				}
				// if it is a required prop
				// isRequired is only set for
				// i.e propTypes.bool.isRequired
				// and not for propTypes.bool
				else if (isRequired) {
					return createRequiredPropTypeError(
						propName, 
						displayName
					);
				}
			}

			// add the isRequired validator
			// also avoid a infinite call stack
			// by checking that isRequired has not yet been set
			if (!isRequired) {
				typeValidator.isRequired = createTypeValidator(expectedType, true);
			}

			return typeValidator;
		}

		// for all these types
		forEach(types, function (name) {
			// if the type is bool / func -> boolean / function
			var 
			type = name.substr(0,1) === 'b' ? name + 'ean' :
				   name.substr(0,1) === 'f' ? name + 'tion' : name;

			// add the validator
			propTypesObj[name] = createTypeValidator(type);
		});

		return propTypesObj;
	}


	/**
	 * injects a mock window object
	 * 
	 * @param  {Object} obj - window object
	 * @return {Object}     - window object     
	 */
	function injectWindowDependency (obj) {
		if (obj) {
			__window         = obj,
			__document       = __window.document,
			__XMLHttpRequest = __window.XMLHttpRequest;
		}

		return obj;
	}




	/* ---------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------
	 *
	 * 
	 * animateWith                  - animation helper
	 * request                      - http helper
	 * createStore                  - redux-like store
	 * createRouter                 - router helper
	 * createStream                 - create stream
	 * createHTML                   - ouput html from vdom
	 * createStyle                  - create stylesheet
	 * curry                        - curry helper
	 * createFactory                - create element factory
	 * 
	 *
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */




	/**
	 * classList helper
	 * 
	 * @param  {Node}   element
	 * @param  {string} value
	 * @return {Object}
	 */
	function classList (type, element, className) {
		/**
		 * check if the element has the class/className
		 * 
		 * @param  {Node}    element   - target element
		 * @param  {string}  className - className to check for
		 * @return {boolean}
		 */
		function hasClass (element, className) {
			// default to native Element.classList()
			if (element.classList) {
				return element.classList.contains(className);
			} 
			else {
				// this will return true if indexOf does not
				// find our class in the className string 
				return element.className.indexOf(className) > -1;
			}
		}

		/**
		 * add a className to an element
		 * 
		 * @param {Node}   element   - target element
		 * @param {string} className - className to add
		 */
		function add (element, className) {
			// default to native Element.classList.remove()
			if (element.classList) {
				element.classList.add(className);
			}
			// exit early if the class is already added
			else if (!hasClass(element, className)) {
				// create array of current classList
				var 
				classes = element.className.split(' ');
				// add our new class
				classes.push(className);
				// join our classes array and re-assign to className
				element.className = classes.join(' ')
			}
		}

		/**
		 * remove a className from an element
		 * 
		 * @param {Node}   element   - target element
		 * @param {string} className - className to remove
		 */
		function remove (element, className) {
			// default to native Element.classList.remove()
			if (element.classList) {
				element.classList.remove(className);
			}
			else {
				// create array of current classList
				var
				classes = element.className.split(' ');
				// remove the className on this index
				classes.splice(classes.indexOf(className), 1);
				// join our classes array and re-ssign to className
				element.className = classes.join(' ');
			}
		}

		/**
		 * toggle a className on an element
		 * 
		 * @param {Node}   element   - target element
		 * @param {string} className - classname to toggle
		 */
		function toggle (element, className) {
			// default to native Element.classList.toggle()
			if (element.classList) {
				element.classList.toggle(className);
			}
			else {
				// if has class, remove
				if (hasClass(element, className)) {
					remove(element, className);
				}
				// if does not have class, add
				else {
					add(element, className);
				}
			}
		}

		var 
		methods = {
			add: add,
			remove: remove,
			hasClass: hasClass,
			toggle: toggle
		};

		return methods[type](element, className);
	}


	/**
	 * animate interface
	 * 
	 * @return {Object}
	 */
	function animateWith () {
		/**
		 * prefix css props
		 * 
		 * @param {Object} style - the elements style object
		 * @param {string} prop  - prop to set
		 * @param {string} value - value of the prop
		 */
		function prefix (style, prop, value) {
			// exit early if we support un-prefixed prop
			if (style && (style[prop] === null || style[prop] === undefined)) {
				// chrome, safari, mozila, ie
				var 
				vendors = ['webkit','Webkit','Moz','ms'];

				for (var i = 0; i < vendors.length; i = i + 1) {
					// vendor + capitalized prop
					prop = (
						vendors[i] + 
						prop.substr(0,1).toUpperCase() + 
						prop.slice(1)
					);

					// add prop if vendor prop exists
					if (style[prop] !== undefined) {
						style[prop] = value;
					}
				}
			}
			// set un-prefixed prop
			else {
				style[prop] = value;
			}
		}

		/**
		 * First, Last, Invert, Play, flip animate an element
		 * 
		 * example
		 * 
		 * h('.card', {onclick: animate}, h('p', null, a)) 
		 * // className defaults to animation-active end class
		 * // duration defaults to 220ms
		 * // or 
		 * 
		 * h('.card', {onclick: animate(400, 'active-state', null, 'linear')})
		 * 
		 * // or 
		 * animate(
		 *   duration{400},'endClassName'{'.class'},
		 *   'extra transforms'{'rotate(25deg)')}
		 * )
		 * 
		 * @param {Node}   element   
		 * @param {Array}  transforms - describe additional transforms
		 * @param {number} duration   - duration of the animation
		 * @param {string} className  - class that represents end state animating to
		 */
		function flipAnimation (
			className, 
			duration, 
			transformations, 
			transformOrigin, 
			easing) {
			return function (element, callback) {
				transformations  = transformations || '';

				// get element if selector
				if (isString(element)) {
					element = __document.querySelector(element);
				}

				// check if element exists
				if (!element && element.nodeType) {
					throwError('element not found');
				}

				var
				first, 
				last,
				webAnimations,
				transform    = [],
				invert       = {},
				element      = element.currentTarget || element,
				style        = element.style,
				body         = __document.body,
				runningClass = 'animation-running',
				transEvtEnd  = 'transitionend';

				// animation type
				// if this is set we opt for the more performant
				// web animations api
				if (isFunction(element.animate)) {
					webAnimations = true;
				}

				// get the first rect state of the element
				first = element.getBoundingClientRect();
				// assign last state if there is an end class
				if (className) {
					classList('toggle', element, className);
				}
				// get last rect state of the elemenet, 
				// if there is no end class
				// then nothing has changed, save a reflow and just use the first state
				last = className ? element.getBoundingClientRect() : first;

				// invert values
				invert.x  = first.left - last.left,
				invert.y  = first.top  - last.top,
				invert.sx = last.width  !== 0 ? first.width  / last.width  : 1,
				invert.sy = last.height !== 0 ? first.height / last.height : 1,

				// flesh out animation details
				duration  = duration || 200,
				easing    = easing   || 'cubic-bezier(0,0,0.32,1)',

				// the 0% state of the animation
				transform[0] = 'translate('+invert.x+'px,'+invert.y+'px) translateZ(0)'+
								' scale('+invert.sx+','+invert.sy+')',

				// if there are any extra transformations passesd we add then here
				transform[0] = transform[0] + ' ' + transformations,

				// this is the 100% state of the animation
				transform[1] = 'translate(0,0) translateZ(0) scale(1,1) rotate(0) skew(0)';

				// assign transform origin if set
				if (transformOrigin) {
					prefix(style, 'transformOrigin', transformOrigin);
				}

				// reflect animation state on dom
				classList('add', element, runningClass);
				classList('add', body, runningClass);

				// use native web animations api if present for better performance
				if (webAnimations) {
					var 
					player = element.animate([
						{transform: transform[0]},
						{transform: transform[1]}
					], {
						duration: duration,
						easing:   easing
					});

					player.addEventListener('finish', onfinish);
				}
				// use css transitions
				else {
					// listen for the transition end event
					// we can then do cleanup after the animation
					element.addEventListener(transEvtEnd, onfinish);

					// set first state
					prefix(style, 'transform', transform[0]);

					// trigger repaint
					element.offsetWidth;
									
					// setup to animate when we change to the last state,
					// limited only to transition transforms and opacity
					// to avoid reflows
					prefix(
						style, 
						'transition', 
						'transform ' + duration + 'ms ' + easing + ', ' +
						'opacity ' + duration + 'ms ' + easing
					);

					// set last state
					// the animation will playout at this point
					// when it's done onfinish will get called
					prefix(style, 'transform', transform[1]);
				}

				// the cleanup
				function onfinish (e) {
					if (webAnimations) {
						// the name of the event listener we will remove
						// in the case of when we use the webAnimations api
						transEvtEnd = 'finish';
					}
					else {
						// bubbled events
						if (e.target !== element) {
							return;
						}

						// clear transition and transform styles
						prefix(style, 'transition', undefined);
						prefix(style, 'transform', undefined);
					}

					// remove the event listener
					element.removeEventListener(transEvtEnd, onfinish);

					// clear transform origin styles
					prefix(style, 'transformOrigin', undefined);

					// clear animation running styles
					classList('remove', element, runningClass);
					classList('remove', body, runningClass);

					// execute callback if set
					if (callback) {
						callback(element);
					}
				}

				// the duration of the animation
				return duration;
			}
		}

		/**
		 * css transitions/animations for an element callback on finish
		 * 
		 * @param  {string}
		 * @return {Function}
		 */
		function cssAnimation (type) {			
			return function keyframe (className, classListMethod) {
				// the default is to add the class
				classListMethod = classListMethod || 'add';

				// remove class if less than 0 or a falsey value or 'remove'
				if (
					classListMethod < 0 || 
					(classListMethod !== undefined && !classListMethod)
				) {
					classListMethod = 'remove';
				}

				return function (element, callback) {
					// push to next event-cycle/frame
					setTimeout(function () {
						// add transition class
						// this will start the transtion
						classList(classListMethod, element, className);

						// no callback,
						// exit early
						if (!callback) {
							return;
						}

						var
						// duration starts at 0
						// for every 'time' we find in 
						// transition-duration we add it to duration
						duration = 0,
						// get transition duration and remove 's' and spaces
						// we will get from this '0.4s, 0.2s' to '0.4,0.2'
						// we then split it to an array ['0.4','0.2']
						// note: the numbers are still in string format
						transitionData = getComputedStyle(element)
						transitionData = transitionData[type+'Duration'];
						transitionData = transitionData.replace(/s| /g, '').split(',');

						// convert all values to a number
						// increament duration (in ms)
						forEach(transitionData, function (value) {
							duration = duration + (parseFloat(value) * 1000);
						});

						// run callback after duration of transition
						// has elapsed
						if (callback) {
							setTimeout(function () {
								callback(element, keyframe);
							}, duration);
						}
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
	 * request interface
	 * 
	 * @param  {string}  url
	 * @param  {*}       payload 
	 * @param  {string}  enctype 
	 * @param  {boolean} withCredentials
	 * @return {Object}
	 */
	function request () {
		/**
		 * return the response in it's right type
		 * i.e json as {}, text/html as a document...
		 * 
		 * @param  {{Object}} xhr
		 * @return {*} 
		 */
		function response (xhr) {			
			var 
			responseBody,
			responseType,
			responseText   = xhr.responseText,
			responseHeader = xhr.getResponseHeader('Content-Type');

			// format response header
			// get the type of response
			// so we can use that to format the response body
			// if needed i.e create a dom/parse json
			if (responseHeader.indexOf(';') !== -1) {
				responseType = responseHeader.split(';');
				responseType = responseType[0].split('/');
			}
			else {
				responseType = responseHeader.split('/');
			}

			// extract response type 'html/json/text'
			responseType = responseType[1];

			// json, parse json
			if (responseType === 'json') {
				responseBody = JSON.parse(responseText);
			}
			// html, create dom
			else if (responseType === 'html') {
				responseBody = (new DOMParser()).parseFromString(responseText, 'text/html');
			}
			// text, as is
			else {
				responseBody = responseText;
			}

			return responseBody;
		}

		/**
		 * http interface
		 * 
		 * @param  {string}
		 * @param  {string}
		 * @param  {Object}
		 * @param  {string}
		 * @param  {string}
		 * @return {Function}
		 */
		function http (url, method, payload, enctype, withCredentials) {
			// return a a stream
			return createStream(function (resolve, reject) {
				if (!__XMLHttpRequest) {
					return;
				}

				// create xhr object 
				var
				xhr      = new __XMLHttpRequest(),
				// get window location to check fo CORS
				location = __window.location,
				// create anchor element and extract url information
				a        = __document.createElement('a');		

				a.href   = url;

				// check if is this a cross origin request
				var
				CORS = !(
					a.hostname        === location.hostname &&
					a.port            === location.port     &&
					a.protocol        === location.protocol &&
					location.protocol !== 'file:'
				);

				// destroy created element
				a = undefined;
				
				// open request
				xhr.open(method, url);
				
				// on success resolve the xhrStream
				xhr.onload = function () {
					resolve(response(this));
				};

				// on error send a reject signal to the xhrStream
				xhr.onerror = function () {
					reject(this.statusText);
				};
				
				// cross origin request cookies
				if (CORS && withCredentials) {
					xhr.withCredentials = true;
				}

				// set content type and payload
				if (method === 'POST' || method === 'PUT') {
					xhr.setRequestHeader('Content-Type', enctype);

					if (enctype.indexOf('x-www-form-urlencoded') > -1) {
						payload = param(payload);
					}
					else if (enctype.indexOf('json') > -1) {
						payload = JSON.stringify(payload);
					}
				}

				// send request
				xhr.send(payload);
			});
		}

		/**
		 * serialize + encode object
		 * 
		 * example
		 * 
		 * // returns 'url=http%3A%2F%2F.com'
		 * param({url:'http://.com'})
		 * 
		 * @param  {Object} obj   
		 * @param  {Object} prefix
		 * @return {string} serialized object
		 */
		function param (obj, prefix) {
			var 
			arr = [];

			// loop through object and create a serialized representation
			for (var key in obj) {
				var 
				__prefix = prefix ? prefix + '[' + key + ']' : key,
				value    = obj[key];

				// when the value is equal to an object 
				// that means we have data = {name:'John', addr: {...}}
				// so we re-run param on addr to serialize 'addr: {...}' as well
				arr.push(typeof value == 'object' ? 
					param(value, __prefix) :
					encodeURIComponent(__prefix) + '=' + encodeURIComponent(value));
			}

			return arr.join('&');
		}


		/**
		 * create request
		 * 
		 * @param {string}
		 * @param {Object}
		 * @param {Function}
		 */
		function create (method) {
			return function (url, payload, enctype, withCredentials) {
				// enctype syntax sugar
				if (enctype) {
					if (enctype === 'json') {
						enctype = 'application/json';
					}
					else if (enctype === 'text') {
						enctype = 'text/plain';
					}
					else if (enctype === 'file') {
						enctype = 'multipart/form-data';
					}
				}
				else {
					// defaults
					enctype = 'application/x-www-form-urlencoded';
				}

				// encode the url
				url = encodeURI(url);

				// for .get requests pass payload as query string if present
				if (payload && method === 'GET') {
					url = url + '?' + param(payload);
				}

				// return ajax promise
				return http(url, method, payload, enctype, withCredentials);
			}
		}

		/**
		 * request interface
		 * 
		 * request({method: 'GET', url: '?'})
		 * is the same as
		 * request.get('?')
		 * 
		 * @param  {Object} obj - details of the request
		 */
		function request (obj) {
			return request[obj.method.toLowerCase()](
				obj.url, 
				obj.payload, 
				obj.enctype, 
				obj.withCredentials
			);
		}

		request.get    = create('GET'),
		request.post   = create('POST'),
		request.put    = create('PUT'),
		request.delete = create('DELETE');

		return request;
	}


	/**
	 * store interface
	 * 
	 * @param  {Function} reducer
	 * @return {Object}
	 */
	function createStore (reducer) {
		// if the reducer is an object of reducers (multiple)
		// lets combine the reducers
		if (isObject(reducer)) {
			return create(combine(reducer));
		}
		// single reducer
		else {
			return create(reducer);
		}

		// combine reducers
		function combine (reducers) {
			return function (state, action) {
				state = state || {};

				return ObjectKeys(reducers).reduce(function (nextState, key) {
					nextState[key] = reducers[key](state[key], action);

					return nextState;
				}, {});
			}
		}

		// create store
		function create (reducer) {
			var
			state,
			listeners = [];

			// return the state
			function getState () {
				return state;
			}

			// dispatch an action
			function dispatch (action) {
				// there are no actions when we are time traveling
				if (!isObject(action)) {
					throwError('action must be plain object');
				}
				if (!isDefined(action.type)) {
					throwError('actions must have type');
				}

				// get state from reducer
				state = reducer(state, action);

				// dispatch to all listeners
				forEach(listeners, function (listener) {
					return listener(state);
				})
			}

			// subscribe to a store
			function subscribe (listener) {
				if (!isFunction(listener)) {
					throwError('listener should be function');
				}

				listeners.push(listener);

				// return a unsubscribe function that we can 
				// use to unsubscribe as follows: 
				// i.e - var sub = store.subscribe()
				// sub() // un-subscribes
				return function () {
					listener = listeners.filter(function (l) {
						return l !== listener;
					});
				}
			}

			// auto subscribe a component to a store
			function connect (render, element) {
				// create a render instance if not one
				if (element) {
					render = createRender(render, element);
				}

				// trigger initial render
				render(getState());

				// trigger subsequent renders on state updates
				subscribe(function () {
					render(getState());
				});
			}

			// dispath initial action
			dispatch({type: __storeSignature});

			return {
				getState: getState, 
				dispatch: dispatch, 
				subscribe: subscribe,
				connect: connect
			};
		}
	}


	/**
	 * router interface
	 * 
	 * example
	 * 
	 * router({
	 * 		'/:page/:name': () => {}
	 * }, '/example', '/user/id')
	 * 
	 * router({
	 * 		'/:page/:name': Component
	 * })
	 *
	 * @param  {Object} routes
	 * @param  {string} rootAddress 
	 * @param  {string} onInitNavigateTo
	 * @return {Object}
	 */
	function createRouter (routes, rootAddress, onInitNavigateTo, mount) {
		function router (routes, rootAddress, onInitNavigateTo) {
			/**
			 * listens for changes to the url
			 */
			function startListening () {
				// clear the interval if it's already set
				clearInterval(interval);

				// start listening for a change in the url
				interval = setInterval(function () {
					var 
					path = __window.location.pathname;

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

			/**
			 * register routes
			 */
			function registerRoutes () {
				// assign routes
				forEach(routes, function (value, name) {
					// - vars is where we store the variables
					// i.e in /:user/:id - user, id are variables
					var 
					vars = [],
					regex = /([:*])(\w+)|([\*])/g,

					// given the following /:user/:id/*
					pattern = name.replace(regex, function () {
								var 
								// 'user', 'id', undefned
								args = arguments,
								id   = args[2];

								// if not a variable 
								if (!id) {
									return '(?:.*)';
								}
								// capture
								else {
									vars.push(id)
									return '([^\/]+)';
								}
							}),

					// close the pattern
					pattern = pattern + '$';
					pattern = rootAddress ? rootAddress + pattern : pattern;
					pattern = new RegExp(pattern);

					// assign a route item
					routes[name] = [value, pattern, vars];
				});
			}

			/**
			 * called when the listener detects a route change
			 */
			function triggerRouteChange () {
				forEach(routes, function (val) {
					var 
					callback = val[0],
					pattern  = val[1],
					vars     = val[2],
					match;

					// exec pattern on url
					match = currentPath.match(pattern);

					// we have a match
					if (match) {
						// create params object to pass to callback
						// i.e {user: 'simple', id: '1234'}
						var
						data = match.slice(1, match.length) 
							.reduce(function (data, val, i) {
								if (!data) {
									data = {};
								}
								// var name: value
								// i.e user: 'simple'
								data[vars[i]] = val;

								return data;
							}, undefined);

						// callback is a function, exec
						if (isFunction(callback)) {
							callback(data);
						}
					}
				})
			}

			/**
			 * navigate to a path
			 */
			function navigateToPath (path) {
				if (rootAddress) {
					path = rootAddress + path;
				}

				history.pushState(undefined, undefined, path);
			}

			var
			currentPath,
			interval;

			// normalize rootAddress formate
			// i.e '/url/' -> '/url'
			if (rootAddress.substr(-1) === '/') {
				rootAddress = rootAddress.substr(0, rootAddress.length - 1);
			}

			registerRoutes();
			startListening();

			if (onInitNavigateTo) {
				navigateToPath(onInitNavigateTo);
			}

			return {
				// navigate to a view
				nav: navigateToPath,
				// history back
				back: history.back,
				// history foward
				foward: history.foward,
				// history go
				go: history.go
			};
		}

		// get return value if function
		if (isFunction(routes)) {
			routes = routes();
		}

		if (mount) {
			forEach(routes, function (value, index) {
				var 
				renderInstance;

				if (value.id !== __renderSignature) {
					renderInstance = createRender(value, mount);
				}
				else {
					renderInstance = value;
				}

				routes[index] = function (data) {
					renderInstance(data, null, true);
				}
			});
		}

		return router(routes, rootAddress, onInitNavigateTo);
	}


	/**
	 * streams utility getter/setter
	 * 
	 * @param  {*}        value  - store value
	 * @param  {Function} mapper - processor
	 * @return {Function}
	 */
	function createStream (value, mapper) {
		var
		store,
		chain = {
			then: undefined,
			catch: undefined
		},
		listeners = {
			catch: [],
			then: []
		};

		function stream () {
			return update(arguments);
		}

		function update (args) {
			// update the stream when a value is passed
			if (args.length) {
				store = args[0];
				dispatch('then', store);

				return stream;
			}

			// the value we will return
			var
			ret;

			// special store
			if (mapper === true) {
				ret = store()
			}
			else {
				// we have a mapper, run the store through it
				if (isFunction(mapper)) {
					ret = mapper(store)
				}
				// return the store as is
				else {
					ret = store;
				}
			}

			// return the store
			return ret;      
		}

		function dispatch (type, value) {
			if (listeners[type].length) {
				forEach(listeners[type], function (listener) {
					try {
						// a link in the .then / .catch chain
						var
						link = listener(chain[type] || value);

						// listerner returned a value, add to chain
						// the next .then / .catch listerner
						// will receieve this
						if (link) {
							chain[type] = link;
						}
					} catch (e) {
						stream.reject(e);
					}
				});
			}
		}

		// ...JSON.strinfigy()
		stream.toJSON = function () {
			return store;
		};

		// {Function}.valueOf()
		stream.valueOf = function () {
			return store;
		};

		// resolve a value
		stream.resolve = function (value) {
			return stream(value);
		};

		// reject with a reason
		stream.reject = function (reason) {
			dispatch('catch', reason);
		};

		// push a listener
		stream.push = function (to, listener, end) {
			listeners[to].push(function (chain) {
				return listener(chain);
			});

			return !end ? stream : undefined;
		};

		// add a then listener
		stream.then  = function (listener, error) {
			if (error) {
				stream.catch(error)
			}

			if (listener) {
				return stream.push('then', listener, error);
			}
		};

		// add a done listener, ends the chain
		stream.done = function (listener, error) {
			stream.then(listener, error || true);
		};

		// add a catch listener
		stream.catch = function (listener) {
			return stream.push('catch', listener);
		};

		// create a map
		stream.map = function (map) {
			// the dependency as in
			// - var bar = a.map(fn) a will be dep
			var 
			dep = stream;

			return createStream(function (resolve) {
				resolve(function () {
					return map(dep());
				});
			}, true);
		};

		// end/reset a stream
		stream.end = function () {
			chain.then      = undefined;
			chain.catch     = undefined;
			listeners.catch = [];
			listeners.then  = [];
		};

		// a way to distinguish between normal functions
		// and streams
		stream.id = __streamSignature;

		if (isFunction(value)) {
			value(stream.resolve, stream.reject, stream);
		}
		else {
			stream(value);
		}

		return stream;
	}


	/**
	 * combine two or more streams
	 * 
	 * @param  {Function} reducer - reducer
	 * @return {Array}    deps    - dependecies
	 */
	createStream.combine = function (reducer, deps) {
		// if deps are not in a single array
		// create deps from arguments
		if (!isArray(deps)) {
			deps = toArray(arguments, 1);
		}
		// we later use push so we don't want to mutate
		// the deps array that is passed as an arg 
		else {
			deps = toArray(deps);
		}

		// add an address for the prev store
		deps.push(undefined);

		// the previous store will always be the 
		// last item in the list of dependencies
		var
		prevStoreAddress = deps.length - 1;

		// creating a stream with the second argument as true
		// allows us to pass a function a the streams store
		// that will be run anytime we retreive it
		return createStream(function (resolve) {
			resolve(function () {
				// extract return value of reducer
				// return it and also set the value of the prevStore to it
				return deps[prevStoreAddress] = reducer.apply(undefined, deps);
			});
		}, true);
	};


	/**
	 * do something after all dependecies have resolve
	 * 
	 * @param  {Array}    deps - dependecies
	 * @return {Function}
	 */
	createStream.all = function (deps) {
		var
		resolved = [];

		// pushes a value to the resolved array
		// and compares if resolved length is equal to deps
		// this will tell us wheather all dependencies
		// have resolved
		function resolver (value, resolve) {
			resolved.push(value);

			if (resolved.length === deps.length) {
				resolve(resolved)
			}
		}

		return createStream(function (resolve, reject) {
			// check all dependencies
			// if a dependecy is a stream attach a listerner
			// reject / resolve as nessessary.
			forEach(deps, function (value) {
				if (value.id === __streamSignature) {
					value.done(function (value) {
						resolver(value, resolve);
					}, function (reason) {
						reject(reason);
					});
				}
				else {
					resolver(value, resolve);
				}
			});
		});
	};


	/**
	 * creates a new stream that accumulates everytime it is called
	 *
	 * example
	 * 
	 * var foo = {Stream}
	 * var bar = stream.scan((sum, n) => { sum+n }, 0, foo) 
	 * foo(1)(1)(2)
	 * // bar => 4
	 *
	 * @param  {Function} reducer
	 * @param  {*}        accumulator
	 * @param  {Function} stream 
	 * @return {Function} stream
	 */
	createStream.scan = function (reducer, accumulator, stream) {
		return createStream(function (resolve) {
			// attach a listener to stream and update
			// the accumulator with the returned value of the reducer
			// proceed to resolve the store of the stream we return back
			stream.then(function () {
				accumulator = reducer(accumulator, stream);
				resolve(accumulator);
			});
		});
	}


	/**
	 * server-side interface converts a hyperscript/component/render to html string
	 *
	 * example
	 * 
	 * createHTML(h('div', 'Hello World'));
	 * createHTML(component/render, {id:1234}, {item:'first'});
	 *
	 * @param  {(Object|Function)} arg      - hyperscript/render/component
	 * @param  {Object}            props    - props to pass to component/render
	 * @param  {Object}            children - children to pass to component/render
	 * @return {string}
	 */
	function createHTML (arg, props, children) {
		// print node
		function toHTML (vnode, level) {
			// not a hyperscript object
			if (!vnode.props) {
				return vnode.children[0];
			}

			// references
			var 
			// i.e 'div'
			type = vnode.type,
			// i.e {id: 123, class: 'one two'}
			props = vnode.props,
			// i.e [obj, obj]
			children = vnode.children;

			// print voidElements
			if (element[type]) {
				// <type ...props>
				return '<'+type+Props(props)+'>';
			}

			// otherwise...
			// <type ...props>...children</type>
			return '<'+type+Props(props)+'>' + Children(children, level) + '</'+type+'>';
		}

		// print props
		function Props (props) {
			if (isObject(props)) {
				props = map(ObjectKeys(props), function (name) {
							if (isDefined(props[name]) && props[name] !== false) {
								// <type name=value>
								var 
								value = props[name];

								// don't add events, keys or refs
								if (
									!isFunction(value) && 
									name !== 'key' && 
									name !== 'ref'
								) {
									// if the value is a falsey/truefy value
									// print just the name
									// i.e checkbox=true
									// will print <type checkbox>
									// otherwise <type value="">
									return value === true ? name : name + '="' + value + '"';
								}
							}
						})
						// create string 
						// and convert all multi-spaces to a single space
						.join(' ').replace(/  +/g, ' ').trim();			
			}

			/*
				if props is falsey just return an empty string
				otherwise return ' ' + ...props
				this prevents us from having a case of
				<divclass=a></div>, 
				so we add a space before props giving us
				<div class=a></div>
			 */
			return props ? (' ' + props) : '';
		}

		// print children
		function Children (children) {
			if (!isDefined(children)) {
				return '';
			}

			// empty
			if (children.length === 0) {
				return '';
			}

			return map(children, function (child) {
				return toHTML(child);
			}).join('');
		}

		// void elements that do not have a close </tag> 
		var
		element = {
			'area': true, 'base':  true, 'br':    true, '!doctype': true,
			'col':  true, 'embed': true, 'wbr':   true, 'track':    true,
			'hr':   true, 'img':   true, 'input': true, 'keygen':   true,
			'link': true, 'meta':  true, 'param': true, 'source':   true
		};

		var
		vnode;

		// either a render function or component function
		if (isFunction(arg)) {
			vnode = arg(props, children);

			// render functions return functions
			if (isFunction(vnode)) {
				vnode = vnode(
					props,
					children,
					vnode.id === __renderSignature ? __hyperscriptSignature : undefined
				);
			}
			else if (vnode.render) {
				vnode = vnode.render(props, children);
			}

			return isObject(vnode) ? createHTML(vnode) : vnode;
		}
		// probably hyperscript
		else {
			vnode = arg;
		}

		return toHTML(vnode);
	}


	/**
	 * create and inject style to the dom
	 * 
	 * @param   {Object}  stylesheet       - object of css
	 * @param   {string}  id               - namespace
	 * @param   {boolean} onlyOutputString
	 * @returns {string}
	 */
	function createStyle () {
		// references
		var
		vendors      = ['webkit', 'moz', 'ms'],
		properties   = [
			'animation', 'transform', 'appearance', 
			'transition', 'box-shadow', 'linear-gradient'
		],
		namespace    = '',
		keyframesKey = '@keyframes',
		atRootKey    = '@at-root';

		// returns a prefixed version of a property 
		// if the property is one of the above listed
		function prefix (property, value) {
			var
			result;

			// check if the property is one we should prefix
			forEach(properties, function (prefix) {
				// if it is
				if (property.indexOf(prefix) > -1) {
					result = '';

					// adds all the vendors
					forEach(vendors, function (vendor) {
						result = (
							result + '-' + vendor + '-' + 
							property + ': ' + value + ';\n\t'
						);
					});

					result = result + property;
				}
			});

			// result will not be empty if we
			// added prefixes
			if (result) {
				return result + ': ' + value;
			}
			else {
				return property + ': ' + value;
			}
		}

		// iterate through the stylesheet object
		// and create a stack representation of
		// a selectors children
		function iterate (stylesheet, stack, tree) {
			var 
			result = '';

			forEach(stylesheet, function (value, property, obj) {
				if (obj.hasOwnProperty(property)) {
					// handle @keyframes properties
					// allows us to specify either
					// %: ['color: blue'] or
					// 0%: {'color': 'black' }
					// for keyframe animations
					if (
						!isArray(value) &&
						stack.indexOf(keyframesKey) > -1 && 
						(property.indexOf('%') > -1 || !isNaN(property))
					) {
						// allows us to specify number as percent as in
						// {
						// 		0: {...}
						// 		50: {...}
						// 		100: {...}
						// }
						if (!isNaN(property)) {
							property = property + '%';
						}

						// we could easily do the below
						// JSON.stringify().replace()...
						// but since values are sometimes functions we want to extract the
						// return value of the function to do that we do a 'for (...){}'
						var 
						newValue = '';

						forEach(value, function (value, name) {
							if (isFunction(value)) {
								value = value ();
							}
							newValue = newValue + name + ':' + value + ';';
						});

						value = '{' + newValue + '}';
					}

					if (isObject(value)) {
						// keep going down the stack
						iterate(value, stack + ' ' + property, tree);
					} else {
						// extract functions
						if (isFunction(value)) {
							value = value ();
						}

						// handle arrays
						if (isArray(value)) {
							value  = '{' + value.join(':') + ';}';
						}

						var
						joint = ' { ';

						// check if the property is camelCase as in
						// marginTop !== margintop, but
						// margin-top === margin-top
						// if so convert to dash-case
						if (property !== property.toLowerCase()) {
							property = dash(property);
						}

						// add unites to numbers
						if (typeof value === 'number') {
							value = value + 'px';
						}

						// namespace animations
						if (property === 'animation' || property === 'animation-name') {
							value = escape(namespace) + value;
						}

						// create a stack trace of the selector
						var 
						trace  = stack + joint + prefix(property, value);

						// fix keyframes
						// 0%: {} <-- removes ':'
						if (stack.indexOf(keyframesKey) > -1) {
							trace = trace.replace(/%:/g, '%');
						}

						// add closing ;
						if (trace.substr(-1) !== '}') {
							trace = trace + ';';
						}

						var
						split  = trace.split(joint);

						var
						// remove & and space in the beginning of a selector
						// so that h1&:hover becomes h1:hover
						// and ' h1' becomes 'h1'
						parent = split[0].replace(/ &|^ /g, ''),
						child  = split[1],
						block  = tree[parent];

						// tab selectors children as in
						// selector {
						// 		children: value;
						// }
						child  = '\t' + child;

						block = block ? block + child : child;

						// add a newline after every block, a block is something like
						// selector {
						// 		...block-1,
						// 		...block-2
						// }
						tree[parent] =  block + '\n';
					}
				}
			});

			// this returns a object
			return result;
		}

		// converts camelCase to dash-case
		function dash (value) {
			return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}

		// escapes #ids and .classes for css use
		// so that #id becomes \#id or .class becomes \.class
		function escape (value) {
			var
			firstLetter = value.substr(0, 1);

			if (firstLetter === '#' || firstLetter === '.') {
				value = '\\' +value;
			}

			return value;
		}
		
		// creates the style tree
		function create (children) {
			// references
			var
			tree  = {},
			style = '',

			// create this here so that
			// we don't have to create it in a for loop block
			// this is for when we want to add vendors we
			// add an empty vendor that represents the un-prefixed version
			vendorsPlusDefault = vendors.concat(['']);

			// the tree object will become populated with our style tree
			iterate(children, '', tree);

			// builds a string representation of the tree
			forEach(tree, function (body, selector) {
				// creates something like
				// .selector { 
				// 		... 
				// }
				body = selector + ' {\n' + body + '}\n';

				// check if the block has '@keyframes' in it
				// if so then this is a keyframe block
				if (body.indexOf(keyframesKey) > -1) {
					var
					keyframesLength = keyframesKey.length,
					arr = [];

					// for when a keyframe is nested
					// i.e h1: {
					// 		'@keyframes:' {
					// 			...
					// 		}
					// }
					body = keyframesKey + body.split(keyframesKey)[1];

					// this is the position of what comes after @keyframes
					// so the pos of where the word @keyframes starts 
					// plus its length
					var
					keyFramesBodyPos = body.indexOf(keyframesKey) + keyframesLength;

					// since keyframes are not properties of a selector
					// we could not prefix them in the prefix() function
					// so let us do it now
					forEach(vendorsPlusDefault, function (prefix) {
						// there is an empty vendor in the array so
						// we want to only add prefixes for the vendors
						// and not the empty that represents an un-prefixed version
						prefix = prefix ? '-' + prefix + '-' : prefix;

						// creates something like
						// @-prefix-keyframes ...
						var
						prefixed  = body.substr(0,1) + 
									prefix + 
									body.substr(1, keyFramesBodyPos);

						// escapes namespaces, as in id's #id and classes .class
						prefixed = prefixed + escape(namespace) + 
									body.substr(keyFramesBodyPos+1);

						arr.push(prefixed);
					});

					// extract string from our array of prefixed values
					body = arr.join('');
				}
				// handle sass like @at-rule
				else if (body.indexOf(atRootKey) > -1) {
					body = body.split(atRootKey)[1].replace(' ', '');
				}
				else {
					// handle ','' as in
					// h1, h2 will turn into something like
					// #namespace h1, #namespace h2 {}
					if (selector.indexOf(',') > -1) {
						// first we split it
						var
						selectorNamespaced = selector.split(',');

						// then we add the namespaces
						forEach(selectorNamespaced, function (value, index) {
							var 
							space = index > 0 ? '' : ' ';
							selectorNamespaced[index] = namespace + space + value;
						});

						// put it back together
						selectorNamespaced = selectorNamespaced.join(', ');

						// then replace the selector in selector block
						// with the namespaced version
						body = body.replace(
							new RegExp(selector), 
							selectorNamespaced
						);
					}
					// default
					else {
						// ensure that '#namespace' + ':hover' is 
						// joined as 'namespace:hover'
						// and that '#namespace' + 'h1' is
						// joined as '#namespace h1'
						if (body.substr(0,1) === ':') {
							body = namespace + body;
						}
						else {
							body = namespace + ' ' + body;
						}
					}
				}

				// add this style block to the string that contains all our styles
				style = style + body;
			});
			
			var 
			name = namespace ? ' id=' + (namespace + __signatureBase) : '';

			return '<style'+name+'>\n' + style + '</style>';
		}

		return function (stylesheet, id, onlyOutputString) {
			namespace = id || '';

			// exit early if the stylesheet has already been added
			// this allows use to call dio.createStyle
			// within a function that we execute multiple times
			// insuring that what follows after this
			// is only ever computed once for each namespaced style
			if (
				namespace && __document &&
				__document.getElementById(namespace + __signatureBase)
			) {
				return;
			}

			// extract stylesheet is a function
			if (isFunction(stylesheet)) {
				stylesheet = stylesheet();
			}

			var
			style = create(stylesheet);

			// for enviroments that do not have a document
			// or if we pass the html arg
			// this will not try to insert it to the dom
			// rather we will just return a string of the style element below
			if (__document && __document.head && !onlyOutputString) {
				__document.head.insertAdjacentHTML('beforeend', style);
			}

			return style;
		}
	}


	/**
	 * curry / create / return a function with set arguments
	 * 
	 * @param  {Function} fn             - function to curry
	 * @param  {*}        arg            - arguments to pass to function
	 * @param  {boolean}  preventDefault - auto preventDefault events
	 * @return {Function}
	 */
	function curry (fn, args, preventDefault) {
		// return a function that executes
		// our passed function with the arguments passed
		return function (e) {
			// auto prevent default behaviour for events when
			// preventDefault parameter is set
			if (e && e.preventDefault && preventDefault) {
				e.preventDefault();
			}

			// empty arguments provided
			if (!args || !args.length) {
				return fn.call(this, e);
			}

			return fn.apply(this, args);
		}
	}


	/**
	 * create element factory
	 * 
	 * @param  {Array|string} elements - list of elements
	 * @return {Function}
	 */
	function createFactory (elements) {
		function factory (element) {
			return function (props) {
				return h.call(null, element, props, toArray(arguments, 1));
			}
		}

		// convert arguments to array of elements
		if (!isArray(elements)) {
			elements = toArray(arguments);
		}

		var 
		length = elements.length;

		// if there is only one element return it
		if (length === 1) {
			var 
			elementFactory = factory(elements[0]);

			if (elements[length-1] === true) {
				__window[elements[0]] = elementFactory;
			}
			else {
				return elementFactory;
			}
		}
		// multiple elements
		else {
			var obj = elements[length-1] === true ? __window : {};

			forEach(elements, function (element) {
				obj[element] = factory(element);
			});

			return obj;
		}
	}




	/* ---------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------
	 *
	 * 
	 * exports                       - export all public function
	 * 
	 *
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */




	exports.h = h;
	exports.dio = {};
	exports.dio.createElement = h;
	exports.dio.createComponent = createComponent;
	exports.dio.createClass = createComponent;
	exports.dio.request = request();
	exports.dio.curry = curry;
	exports.dio.animateWith = animateWith();
	exports.dio.createStyle = createStyle();
	exports.dio.createStream = createStream;
	exports.dio.createRouter = createRouter;
	exports.dio.createHTML = createHTML;
	exports.dio.createStore = createStore;
	exports.dio.createFactory = createFactory;
	exports.dio.createRender = createRender;
	exports.dio.render = createRender;
	exports.dio.Component = componentClass;
	exports.dio.propTypes = createPropTypes();
	exports.dio.injectWindowDependency = injectWindowDependency;
}));