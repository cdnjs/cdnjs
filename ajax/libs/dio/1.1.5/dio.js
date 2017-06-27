/**
 *  ___ __ __  
 * (   (  /  \ 
 *  ) ) )( () )
 * (___(__\__/ 
 * 
 * DIO.js - a fast and lightweight (~7kb) feature rich Virtual DOM framework.
 * 
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
	version                     = '1.1.5',

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
	__hasFunctionBind           = !!Function.prototype.bind,
	// placeholder for regex that is used
	// only when special type selectors are used
	// we will create the regex and cache it the 
	// first time that a special selector is used
	__parseSelectorRegExp;




	/* ---------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------
	 *
	 * 
	 * toArray                       - convert array like object to an array
	 * throwError                    - throw/return an error
	 * forEach                       - for each iterator for arrays and objects
	 * map                           - faster `[].map()`
	 * isFunction                    - checks if a value is a function
	 * isString                      - checks if a value is a string
	 * isArray                       - checks if a value is an array
	 * isObject                      - checks if a value is an Object
	 * isDefined                     - checks if a value is is defined
	 * setEnviroment                 - set the enviroment namespace
	 * ObjectKeys                    - get all the keys of the an object as an array
	 * getFunctionDisplayName        - get a functions displayName
	 * 
	 * 
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */




	/**
	 * convert array like object to an array
	 * 
	 * @param  {IArrayLike<?>} value - array like object
	 * @param  {number=}       start - index start
	 * @param  {number=}       end   - index end
	 * @return {Array}
	 */
	function toArray (value, start, end) {
		return Array.prototype.slice.call(value, start, end);
	}


	/**
	 * throw/return an error
	 * 
	 * @param  {string}   message - error message
	 * @param  {Boolean=} silent  - signal return / throw
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
	 * for each element in the list execute callback
	 * 
	 * @param  {(Array|Object)} list
	 * @param  {Function}       callback
	 */
	function forEach (list, callback) {
		// arrays
		if (isArray(list)) {
			var 
			length = list.length,
			index  = 0;

			for (; index < length; index = index + 1) {
				// break if `callback` returns false
				// passing currentValue, index, list{Array}
				if (callback(list[index], index, list) === false) {
					return;
				}
			}
		}
		// objects 
		else {
			for (var index in list) {
				// break if callback() returns false
				// passing currentValue, index, list{Object}
				if (callback(list[index], index, list) === false) {
					return;
				}
			}
		}
	}


	/**
	 * for each element in the list execute callback 
	 * adding the returned value to an array that is the output
	 *
	 * @param  {Array}    list
	 * @param  {Function} callback
	 * @return {Array}    output
	 */
	function map (list, callback) {
		var 
		length = list.length,
		output = [],
		index  = 0,
		value;

		for (; index < length; index = index + 1) {
			value = callback(list[index], index, list);

			if (isDefined(value)) {
				output[index] = value;
			}
		}

		return output;
	}


	/**
	 * checks if `subject` is a function
	 * 
	 * @param  {*}       subject - subject for type checking
	 * @return {boolean}
	 */
	function isFunction (subject) {
		return !!subject && typeof subject === 'function';
	}


	/**
	 * checks if `subject` is a string
	 * 
	 * @param  {*}       subject - subject for type checking
	 * @return {boolean}
	 */
	function isString (subject) {
		return !!subject && typeof subject === 'string';
	}


	/**
	 * checks if `subject` is an array
	 * 
	 * @param  {*}       subject - subject for type checking
	 * @return {boolean}
	 */
	function isArray (subject) {
		return !!subject && subject.constructor === Array;
	}


	/**
	 * checks if `subject` is an Object
	 * 
	 * @param  {*}       subject - subject for type checking
	 * @return {boolean}
	 */
	function isObject (subject) {
		return !!subject && subject.constructor === Object;
	}


	/**
	 * checks if `subject` is defined/(!null and !undefined)
	 * 
	 * @param  {*}       subject - subject for type checking
	 * @return {boolean}
	 */
	function isDefined (subject) {
		return subject !== undefined && subject !== null;
	}


	/**
	 * set the enviroment namespace
	 * development/production
	 */
	function setEnviroment () {
		/*
			first check if __isDevEnv is set
			if it is exit the if block quickly since we already
			a cached value of what the dev enviroment is

			1. if it is not set, proceed to check first 
			if NODE_ENV is set, a string and not 'production'

			2. otherwise check for process.env.NODE_ENV !== 'production'
			if any of 1 || 2 returns true set __isDevEnv to true, 
			thus caching it for future reference
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
	 * get all the keys of the an object as an array
	 * 
	 * @param  {Object} obj  - object to extract keys from
	 * @return {Array}  keys - array of keys
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
	 * @param  {Function} func - function to extract displayName from
	 * @return {string}
	 */
	function getFunctionDisplayName (func) {
		// the regex may return nothing[,''] insures that the )[1] 
		// can always retrieve something even if it's an empty string
		var 
		displayName = (
			/function ([^(]*)/.exec(func.valueOf()) || 
			[,__emptyString]
		)[1];

		/*
			we may not find the func's name
			i.e annonymous functions or class extenders
			so we also try to get the name from func.name if it exists
			however this name maybe obscured if a minifier is used on the codebase,
			but at this point something is better than nothing
		 */
		return !displayName && func.name ? func.name : displayName;
	}




	/* ---------------------------------------------------------------------------------
	 * ---------------------------------------------------------------------------------
	 * 
	 * 
	 * h                             - create virtual element
	 * setHyperscriptChild           - set hyperscript children
	 * parseHyperscriptType          - tag special hyperscript types
	 * 
	 *
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */




	/**
	 * create virtual element
	 * 
	 * @param  {(string|Function|Object)} type        - element type/component
	 * @param  {Object=}                  props       - properties
	 * @param  {...*}                     children
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

		// auto set xmlns namespaces for svg and math elements
		// but only if it's not already set
		if ((type === 'svg' || type === 'math') && !props.xmlns) {
			props.xmlns = __namespace[type];
		}

		// construct children
		for (var index = position; index < length; index = index + 1) {
			// reference to current current child
			child = args[index];
	
			// if the child is an array go deeper
			// and set the 'arrays children' as children
			if (isArray(child)) {
				for (var i = 0, l = child.length; i < l; i++) {
					setHyperscriptChild(child[i], children);
				}
			}
			// add as a child to children
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
	 * @param  {*}     child    - the child to add
	 * @param  {Array} children - the children array to add it to
	 */
	function setHyperscriptChild (child, children) {
		// support for child component
		// h('', {}, ComponentA, ComponentB)
		if (isFunction(child)) {
			child = extract(child);
		}
		// if the child is not an object it is a textNode
		// string, bool, number ...etc, so we convert them to string values
		else if (!isObject(child)) {
			child = {
				type: 'text',
				props: undefined,
				children: [child + __emptyString]
			}
		}
		
		children.push(child);
	}


	/**
	 * tag special hyperscript types
	 *
	 * for example
	 * 
	 * h('inpu#id[type=checkbox]'), is the same as
	 * h('input', {id: 'id', type: 'checkbox'})
	 * 
	 * @param  {Object} hyperscript - a hyperscript object
	 * @return {Object} hyperscript - the altered hyperscript object
	 */
	function parseHyperscriptType (hyperscript) {
		var 
		match,
		classes = [],

		// keep a reference of props, if hyperscript.props 
		// is undefined create a props object
		props = !hyperscript.props ? {} : hyperscript.props,

		// keep a reference of type
		type = hyperscript.type

		// set the default element to a div
		hyperscript.type = 'div';

		// if this is the first time we are doing this
		// create and cache the RegExp.
		// we could cache the RegExp as a global reference
		// but doing it here insures we are not creating a
		// RegExp that is not being used 
		// if there is no use of special type tags
		if (!__parseSelectorRegExp) {
			__parseSelectorRegExp   = new RegExp(
				"(?:(^|#|\\.)([^#\\.\\[\\]]+))|" +
				"(\\[(.+?)(?:\\s*=\\s*(\"|'|)((?:\\\\[\"'\\]]|.)*?)\\5)?\\])",
				"g"
			);
		}

		// execute the regex and iterate through the results
		while ((match = __parseSelectorRegExp.exec(type))) {
			var 
			matchedType      = match[1],
			matchedValue     = match[2],
			matchedProp      = match[3],
			matchedPropKey   = match[4],
			matchedPropValue = match[6];

			// type match
			if (matchedType === __emptyString && matchedValue !== __emptyString) {
				hyperscript.type = matchedValue;
			}
			// id match
			else if (matchedType === '#') {
				props.id = matchedValue;
			} 
			// class(es) match
			else if (matchedType === '.') {
				classes.push(matchedValue);
			} 
			// attribute match
			else if (matchedProp.substr(0,1) === '[') {
				var 
				prop = matchedPropValue;

				if (prop) {
					// remove `[`, `]`, `'` and `"`
					prop = prop.replace(/\\(["'])/g, '$1').replace(/\\\\/g, "\\");
				}

				// h('input[checked]') and h('input[checked=true]')
				// will both become {checked: true}
				props[matchedPropKey] = prop || true;
			}
		}

		// add classes to hyperscript props if any
		if (classes.length) {
			props.className = classes.join(' ');
		}

		// attach props
		hyperscript.props = props;
		
		return hyperscript;
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
	 * 2. if it does not, we check if it is a class or just a function
	 *    if it is a class pass it through createComponent, extract and return.
	 *    
	 *    if it s a pure function extract it check if it has a render method
	 *    if it does createComponent, extract and return, otherwise return
	 *    
	 *    in both cases we store the resulting component from createComponent
	 *    to a __componentSignature property of the function passed
	 *    so that the next time we come across the same function we do
	 *    not need to createComponent again, but can rather
	 *    just extract and return as seen in point 1.
	 * 
	 * @param  {Function} func        - the function to extract
	 * @param  {Object}   props       - the passed props argument
	 * @param  {Array}    children    - the passed children argument
	 * @return {Object}   hyperscript - {type: '', props: {}, children: []}
	 */
	function extract (func, props, children) {
		var 
		hyperscript;

		// if there is a cache of the component, use that
		if (func[__componentSignature]) {
			// extract and return the hyperscript
			// passing props and children
			hyperscript = func[__componentSignature](props, children);
		}
		else {
			// components created with
			// ... extends dio.Component { }
			if (func.prototype.render) {
				// create and cache the component
				func[__componentSignature] = createComponent(func);
				// call the component and hold onto the returned hyperscript object
				hyperscript = func[__componentSignature](props, children);
			}
			// functions(stateless components) 
			// or components created with .createClass / .createComponent 
			else {
				hyperscript = func(props, children);

				// components, stateless/otherwise always return hyperscript
				// given the values passed to it above.
				// if hyperscript has a render method 
				// it is safe to assume it is
				// a statefull component blueprint
				// so we create its component now, once, and cache it.
				if (hyperscript.render) {
					// create and cache the component
					func[__componentSignature] = createComponent(func);
					// call the component and hold onto the returned hyperscript object
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
	 * hydrate                       - hydrates a server-side rendered dom structure
	 * vdomToDOM                     - render vdom to dom
	 * patch                         - patch the dom
	 *
	 * 
	 * ---------------------------------------------------------------------------------
	 * --------------------------------------------------------------------------------- */



	/**
	 * hydrates a server-side rendered dom structure
	 * 
	 * @param  {Node}    parent
	 * @param  {Object}  newNode
	 * @param  {Object}  component
	 * @param  {number}  index
	 * @param  {Object=} parentNode
	 * @return {Object}  newNode    - hydrated virtual node
	 */
	function hydrate (parent, newNode, component, index, parentNode) {
		var 
		nextNode;

		// if the node is not a textNode and
		// has children hydrate each of its children
		if (newNode.props && newNode.children) {
			nextNode = parent.childNodes[index];

			var
			newNodeChildren       = newNode.children,
			newNodeChildrenLength = newNodeChildren.length;

			for (var i = 0; i < newNodeChildrenLength; i = i + 1) {
				hydrate(nextNode, newNodeChildren[i], component, i, newNode);
			}

			// hydrate the dom element to the virtual element
			newNode.dom = nextNode;
		}

		/*
			when we reach a string child, we assume the dom 
			representing it is but a single textNode, 
			we do a look ahead of the child and create + append each textNode child 
			to a documentFragment starting from the current child 
			till we reach a non textNode child such that on 
			h('p', 'foo', 'bar') foo and bar are two different 
			textNodes in the fragment, then replaceChild the 
			single dom textNode with the fragment converting the dom's single 
			textNode to multiple textNodes
		 */
		if (!newNode.props) {
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
			// and add all textNodes to the the fragment.
			// exit when a non text node is encounted
			forEach(parentNode.children.slice(index), function (textNode) {
				// exit quickly once we encounter a non text/string node
				if (textNode.props) {
					return false;
				}

				// create the textNode
				var 
				element = createElement(textNode);

				// hydrate it to the virtual node
				textNode.dom = element;

				// append it to the fragment
				appendChild(fragment, element);
			});

			// replace the textNode with a set of textNodes
			replaceChild(parent, parent.childNodes[index], fragment);
		}

		// dom node
		nextNode = parent.childNodes[index];

		// add event listeners to non textNodes
		// and add set refs
		if (newNode.props) {
			// set refs
			setRefs(newNode, nextNode, component);
			// add events if any
			setElementProps(nextNode, newNode.props, true);
		}

		return newNode;
	}


	/**
	 * diff virtual component and update dom
	 * 
	 * @param {Node}   parent
	 * @param {Object} newNode
	 * @param {Object} oldNode
	 * @param {Object} component
	 */
	function vdomToDOM (parent, newNode, oldNode, component) {
		// this is an entry point so if oldNode
		// is defined we can be sure that this is an update patch
		// opertation
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
		// if oldNode is not defined this is a mount path
		// opertation
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
	 * @param  {Node}    parent
	 * @param  {Object}  newNode
	 * @param  {Object}  oldNode
	 * @param  {number}  index
	 * @param  {Object}  component
	 * @param  {Array=}  newNodeChildren
	 * @param  {Array=}  oldNodeChildren
	 * @param  {number=} newNodeChildrenLength
	 * @param  {number=} oldNodeChildrenLength
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
		// appending to the dom
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
				// assuming a textnode is not empty
				// it is faster to change it's nodeValue
				// than textContent/replacing it with
				// a newly create textNode
				prevNode.nodeValue = newNode.children[0];
			}
			else {
				// dom operation, create node
				var
				nextNode = createElement(newNode);
				// dom operation, replace node
				replaceChild(parent, prevNode, nextNode, newNode);
				// replace old dom node reference with new
				oldNode.dom = nextNode;
			}
		}

		// the lookup loop down the children stack
		else if (
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
			
			// if newNode's children length is 0, exit quickly
			if (newNodeChildrenLength === 0) {
				// clear the newNodes children 
				// if newNodeChildrenLength is 0
				// while oldNodeChildrenLength is not
				// that is to say that we are going from 
				// having childNodes to having none 
				// indicating that the all childNodes have been removed
				if (oldNodeChildrenLength > 0) {
					oldNode.dom.textContent = __emptyString;
				}
				
				// normalize dom references and exit
				return normalizeNodes(newNode, oldNode);
			}

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

					// insert action happend
					if (action === true) {
						newNodeChildren[i+1].dom = oldNodeChildren[i].dom;
					}
					// remove action happend
					else {
						newNodeChildren[i].dom = oldNodeChildren[i].dom;
					}
				}
			}
		}

		// normalize dom references
		normalizeNodes(newNode, oldNode);
	}


	/**
	 * normalize virtual nodes
	 * 
	 * @param {Object} oldNode
	 * @param {Object} newNode
	 */
	function normalizeNodes (newNode, oldNode) {
		// verify that the two nodes are indeed virtual nodes
		if (oldNode && newNode && oldNode.type && newNode.type) {
			// newNode absorbes oldNodes.dom reference
			newNode.dom = oldNode.dom;
		}
	}


	/**
	 * remove/insert a node uses shift/unshift/pop/push where optimal
	 * 
	 * @param  {Array}  arr         - array to mutate
	 * @param  {number} index       - position index
	 * @param  {number} deleteCount - number of items to delete
	 * @param  {Object} item        - item to add
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
			// insert at index
			else {
				arr.splice(index, deleteCount, item);
			}
		}
		else {
			// remove first item using faster shift if start of array
			if (index === 0) {
				arr.shift();
			}
			// remove last item using faster pop if end of array
			else if (index >= arr.length - 1) {
				arr.pop();
			}
			// remove at index
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
	 * remove an element from the dom
	 * 
	 * @param  {Node}   parent
	 * @param  {Node}   nextNode
	 * @param  {Object} oldNode
	 */
	function removeChild (parent, prevNode, oldNode) {
		lifecycle(oldNode, __componentWillUnmount);
		parent.removeChild(prevNode);
		lifecycle(oldNode, __componentDidUnmount);
	}


	/**
	 * append an element to the dom
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
	 * insert an element to the dom at a certian posiiton
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
	 * 
	 * @param  {Object} newNode
	 * @param  {Object} component
	 * @param  {string} namespace
	 * @return {Node}
	 */
	function createElement (newNode, component, namespace) {
		// text nodes
		if (!newNode.props) {
			var
			textContent = newNode.children[0];

			if (!isString(textContent)) {
				textContent = textContent + __emptyString;
			}

			newNode.dom = __document.createTextNode(textContent);
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

			// only map children arrays
			if (isArray(children)) {
				forEach(children, function (newNodechild) {
					appendChild(
						element, 
						createElement(newNodechild, component, namespace), 
						newNodechild
					);
				});
			}

			newNode.dom = element;
		}

		return newNode.dom;
	}


	/**
	 * adds a node's dom reference to its component
	 * 
	 * @param {Object} node
	 * @param {Node}   element
	 * @param {Object} component
	 */
	function setRefs (node, element, component) {
		// a child node may have a reference to its own component
		if (isObject(node[__hyperscriptSignature])) {
			component = node[__hyperscriptSignature];
		}

		if (component && node.props && node.props.ref) {
			var
			ref = node.props.ref;

			// we have a string ref
			if (isString(ref)) {
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
		// checks if the first two characters are `on`
		// and the value of the property is a function
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
			// before updating props
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

			// after updating props
			lifecycle(newNode, __componentDidUpdate);
		}
	}


	/**
	 * set props when element is created
	 * 
	 * @param  {Node}   target
	 * @param  {Object} props
	 */
	function setElementProps (target, props, onlyEvents) {
		for (var name in props) {
			var 
			value = props[name];

			// add events
			if (isEventProp(name, value)) {
				target.addEventListener(extractEventName(name), value, false);
			}
			// add attributes
			else {
				updateElementProps(target, __setAttribute, name, value, props.xmlns);
			}
		}
	}


	/**
	 * get a list of changed props
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

			// if newValue is defined: !(null/undefined) 
			// and
			// either oldValue is not defined: (null/undefined)
			// or 
			// oldValue is defined but is not equal
			// to newValue
			if (isDefined(newValue) && (!isDefined(oldValue) || oldValue !== newValue)) {
				changes[changes.length] = [__setAttribute, name, newValue];
			}
		}

		// go through all oldProps
		// if there is a prop in oldProps
		// that is not also in newProps, remove it
		for (var name in oldProps) {
			// if there is no value of the same
			// name in newProps
			if (!isDefined(newProps[name])) {
				// we add __emptyString to 1 make sure there are always
				// 3 values in the array and in the best case that
				// they are all strings, 
				// constant length + constant type can possibly make it easier for
				// the compiler to better optimization
				changes[changes.length] = [__removeAttribute, name, __emptyString];
			}
		}

		return changes;
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
			// we do not set ref, key and event props
			name === 'ref' || 
			name === 'key' ||
			isEventProp(name, value) ||
			// we do not set xmlns namespace props 
			// because we set them when we create elements
			value === __namespace['svg'] || 
			value === __namespace['math']
		) {
			return;
		}

		// if xlink:href set and exit, 
		// since it is a namespaced prop
		// we have to use setAttributeNS/removeAttributeNS
		if (name === 'xlink:href') {
			return target[action + 'NS'](__namespace['xlink'], 'href', value);
		}

		// normalize class/className references
		// className means something different in the svg namespace
		if (namespace === __namespace['svg']) {
			if (name === 'className') {
				// svg className is not the same as html
				// so we default to 'class'
				name = 'class';
			}
		}
		else {
			if (name === 'class') {
				// in html elements 
				// accessing className directly is faster 
				// that setAttribute('class', value)
				// default to className if 'class'
				name = 'className';
			}
		}

		// objects
		if (isObject(value)) {
			// classes
			if (name === 'className' || name === 'class') {
				forEach(value, function (propValue, propName) {
					// if the value is falsey value, remove
					// else add
					var
					classListAction = !propValue ? classListRemove : classListAdd;
					// add/remove class
					classListAction(target, propName);
				});
			}
			// styles and other object {} type props
			else {
				forEach(value, function (propValue, propName) {					
					if (propName in target[name]) {
						target[name][propName] = propValue;
					}
				});
			}
		}
		// default
		else {
			// if the value is an array convert to string
			if (isArray(value)) {
				value = value.join(' ');
			}

			if (
				target[name] !== undefined &&
				namespace    !== __namespace['svg']
			) {
				target[name] = value;
			}
			else {
				// remove values that are false/null/undefined
				if (!isDefined(value) || value === false) {
					action = __removeAttribute;
				}
				// reduce value to an empty string if true
				// so that checked=true, becomes just checked
				else if (value === true) {
					value = __emptyString;
				}

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
	 * @param  {Object}              node        - component, or hyperscript
	 * @param  {string}              stage       - stage of the lifecycle
	 * @param  {boolean}             isComponent - weather this is a component or not
	 * @param  {Object}              props       - weather to pass props to stage
	 * @param  {Object}              state       - weather to pass sate to stage
	 * @return {(undefined|boolean)}
	 */
	function lifecycle (node, stage, isComponent, props, state) {
		// end quickly if node is not from statefull component
		// since all state less components do not 
		// feature lifecyclem methods
		if (
			!isComponent &&
			(!node || (!node[__hyperscriptSignature] && !node.render))
		) {
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
	 * 
	 * example
	 * 
	 * render = dio.createRender(Component, '.selector')
	 *
	 * @param  {Object|Function}           componentBlueprint
	 * @param  {(Element|String|Function)} mountBlueprint
	 * @return {Function}                  render
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
				mountElement.textContent = __emptyString;
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
	 * @param  {Array}    component - component reference
	 * @return {Function} h         - hyperscript class
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
	 * @param  {Object}   hyperscript
	 * @return {Function} Component
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
	 * @param  {(Function|Object)} componentBlueprint
	 * @return {Function}          Component
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
		component,
		componentRender;

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
			// extract render method
			if (name === 'render') {
				componentRender = value;
			}
			// methods
			else if (isFunction(value)) {
				// bind methods
				component[name] = (
					__hasFunctionBind ? value.bind(component) : function () {
						value.apply(component, toArray(arguments));
					}
				);
			}
			// everything else
			else {
				component[name] = value;
			}
		});

		// if this method is set, set the initial state
		if (component.getInitialState) {
			component.state = component.getInitialState(
				component.props, 
				component.state, 
				component
			);
		}
		// if this method is set, set the default props
		if (component.getDefaultProps) {
			component.props = component.getDefaultProps(
				component.props, 
				component.state, 
				component
			);
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
		hyperscript = createHyperscriptClass(component),

		// check presence of 
		// shouldComponentUpdate, 
		// componentWillReceiveProps, 
		// shouldValidatePropTypes
		// and cache the results for later us.
		shouldComponentUpdate     = !!component.shouldComponentUpdate,
		componentWillReceiveProps = !!component.componentWillReceiveProps,

		// if this is a dev enviroment and the component has propTypes assigned.
		// signal that validation should take place
		// we cache this value now so we don't need to do this later
		// whenever a component is called
		shouldValidatePropTypes   = !!__isDevEnv && !!component.propTypes;

		// define render
		function render () {
			return componentRender.call(
				component, 
				component.props,
				component.state,
				component
			);
		}

		// reset the render method to one that
		// insures the render function returns the newly
		// created hyperscript object
		component.render = function () {
			return new hyperscript(render());
		};

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
				component.shouldComponentUpdate(props, component.state, component) === false
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
		this.displayName = displayName || __emptyString;

		/*
			the first time that a component is created
			we set the enviroment namespace
			we do this now because on the client side
			NODE_ENV can get set after dio is loaded and parsed
			we only ever do this once when the first component is created
		 */
		if (!isDefined(__isDevEnv)) {
			setEnviroment();
		}	
	}


	/**
	 * components class prototype
	 */
	componentClass.prototype = {
		id: __componentSignature,
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
		setProps: function (data) {
			// set props does not trigger a redraw/render
			setProps(this, data);
		},
		forceUpdate: function (self, props, children) {
			// same thing
			self = self || this;

			// if a component function is passed
			if (isFunction(self)) {
				// function with component reference
				if (self[__componentSignature]) {
					self = self[__componentSignature](props, children, true);
				}
				// component
				else if (self.id === __componentSignature) {
					self = self(props, children, true);
				}
				// render instance
				else if (self.id === __renderSignature) {
					self = self(props, children);
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
					having that component nested as a child and
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
			self = self || this;

			// default to forceUpdate without a callback
			if (!isFunction(callback)) {
				callback = self.forceUpdate;
			}

			return withAttr(
				props, 
				setters,
				// preserve the `this` context by
				// passing a callback function
				// that calls the callback with the
				// this context of self
				function () {
					callback.call(self);
				}
			)
		}
	}


	/**
	 * set/update a components props
	 * 
	 * @param {Object} self - components object
	 * @param {Object} data - data with which to update the components props
	 */
	function setProps (self, data) {
		// if the object is a function that returns an object
		if (isFunction(data)) {
			data = data();
		}

		// assign props to {} if it's undefined
		if (!self.props) {
			self.props = {};
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
		// if the object is a function that returns an object
		if (isFunction(data)) {
			data = data();
		}

		// assign state to {} if it's undefined
		if (!self.state) {
			self.state = {};
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
	 * two-way data binding
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
		function update (target, prop, setter) {
			var
			value;

			// if prop is a string, get value from element
			if (isString(prop)) {
				// either the prop of the element object or an attribute
				value = (prop in target) ? 
							target[prop] : 
								target.getAttribute(prop);

				if (isDefined(value)) {
					// execute setter
					setter(value);
				}
			}
			// setter is a string, get value from stream
			else {
				value = prop();
				
				if (isDefined(value)) {
					(setter in target) ? 
						target[setter] = value : 
							target.setAttribute(setter, value);
				}
			}
		}

		/*
			the idea is that when you attach a function to an event,
			i.e target.addEventListener('eventName', fn)
			when that event is dispatched the function will execute
			making the this context of this function the element 
			that the event was attached to
			we can then extract the value, and run the setter(value)
			to change its value
		 */
		return function (event) {
			// assign element
			var 
			target = this || event.currentTarget;

			// array of bindings
			if (isArray(props)) {
				forEach(props, function(value, index) {
					update(target, value, setters[index]);
				});
			}
			// singles
			else {
				update(target, props, setters);
			}

			// execute callback
			if (callback) {
				callback();
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
	 * creates an error message for invalid prop types
	 * 
	 * @param  {string} propName
	 * @param  {*}      propValue
	 * @param  {string} displayName
	 * @param  {string} expectedType
	 * @return {Error}
	 */
	function createInvalidPropTypeError (propName, propValue, displayName, expectedType) {
		return throwError(
			(
				'Invalid prop `' + propName +
				'` of type `' + 
				getFunctionDisplayName(propValue.constructor).toLowerCase() +
				'` supplied to `' +
				displayName +
				'`, expected `' + expectedType
			),
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
			(
				'Required prop `' +
				propName + '` not specified in `' + 
				displayName
			),
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
	 * creates the propTypes object
	 * 
	 * @return {Object}
	 */
	function createPropTypes () {
		var
		primitivesTypes    = ['number', 'string', 'bool', 'array', 'object', 'func'],
		propTypesObj       = {};

		// check if the type is valid
		function isValidType (propValue, expectedType) {
			// convert something like `function` to `Function` since function
			// is not a constructor that we can find on the root/window object but 
			// Function, Array, String, Function... are
			expectedType = expectedType.substr(0,1).toUpperCase() + expectedType.substr(1);

			// check if the propValue is of this type
			return isDefined(propValue) && propValue.constructor === __window[expectedType];
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
		forEach(primitivesTypes, function (name) {
			// if the type is bool / func -> boolean / function
			var
			primitiveType = name === 'bool' ? name + 'ean'  :
							name === 'func' ? name + 'tion' : 
							name;

			// add the validator
			propTypesObj[name] = createTypeValidator(primitiveType);
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
	 * classListContains            - check if an element has a class
	 * classListAdd                 - add class to an element
	 * classListRemove              - remove class from an element
	 * classListToggle              - toggle class on a element
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
	 * check if the element has the class/className
	 * 
	 * @param  {Node}   element   - target element
	 * @param  {string}  className - className to check for
	 * @return {boolean}
	 */
	function classListContains (element, className) {
		// default to native Element.classList.contains
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
	function classListAdd (element, className) {
		// default to native Element.classList.add
		if (element.classList) {
			element.classList.add(className);
		}
		// exit early if the class is already added
		else if (!classListContains(element, className)) {
			// create array of current classList
			var 
			classes = element.className.split(' ');
			// add our new class
			classes.push(className);
			// join our classes array and re-assign to className
			element.className = classes.join(' ');
		}
	}

	/**
	 * remove a className from an element
	 * 
	 * @param {Node}   element   - target element
	 * @param {string} className - className to remove
	 */
	function classListRemove (element, className) {
		// default to native Element.classList.remove
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
	function classListToggle (element, className) {
		// default to native Element.classList.toggle
		if (element.classList) {
			element.classList.toggle(className);
		}
		else {
			// if has class, remove
			if (classListContains(element, className)) {
				classListRemove(element, className);
			}
			// if does not have class, add
			else {
				classListAdd(element, className);
			}
		}
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
				transformations  = transformations || __emptyString;

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
					classListToggle(element, className);
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
				classListAdd(element, runningClass);
				classListAdd(body, runningClass);

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
					classListRemove(element, runningClass);
					classListRemove(body, runningClass);

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
				var 
				classListAction;

				// remove class if less than 0 or a falsey value or 'remove'
				if (
					classListMethod < 0 ||
					(classListMethod !== undefined && !classListMethod)
				) {
					classListAction = classListRemove;
				}
				else {
					classListAction = classListAdd;
				}

				return function (element, callback) {
					// push to next event-cycle/frame
					setTimeout(function () {
						// add transition class
						// this will start the transtion
						classListAction(element, className);

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
						transitionData = (
							transitionData.replace(/s| /g, __emptyString).split(',')
						);

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
			return props ? (' ' + props) : __emptyString;
		}

		// print children
		function Children (children) {
			// null/undefined or empty
			if (!isDefined(children) || children.length === 0) {
				return __emptyString;
			}

			return map(children, function (child) {
				return toHTML(child);
			}).join(__emptyString);
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
		namespace    = __emptyString,
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
					result = __emptyString;

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
			result = __emptyString;

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
						newValue = __emptyString;

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
						parent = split[0].replace(/ &|^ /g, __emptyString),
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
			style = __emptyString,

			// create this here so that
			// we don't have to create it in a for loop block
			// this is for when we want to add vendors we
			// add an empty vendor that represents the un-prefixed version
			vendorsPlusDefault = vendors.concat([__emptyString]);

			// the tree object will become populated with our style tree
			iterate(children, __emptyString, tree);

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
					body = arr.join(__emptyString);
				}
				// handle sass like @at-rule
				else if (body.indexOf(atRootKey) > -1) {
					body = body.split(atRootKey)[1].replace(' ', __emptyString);
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
							space = index > 0 ? __emptyString : ' ';
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
			name = namespace ? ' id=' + (namespace + __signatureBase) : __emptyString;

			return '<style'+name+'>\n' + style + '</style>';
		}

		return function (stylesheet, id, onlyOutputString) {
			namespace = id || __emptyString;

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
			var 
			obj = elements[length-1] === true ? __window : {};

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
	exports.dio.version = version;
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
	exports.dio.PropTypes = createPropTypes();
	exports.dio.injectWindowDependency = injectWindowDependency;
}));