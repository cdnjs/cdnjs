/*!
 *  ___ __ __  
 * (   (  /  \ 
 *  ) ) )( () )
 * (___(__\__/ 
 * 
 * dio.js v0.1.0 - a lightweight (~7kb) feature rich Virtual DOM framework
 *
 * @author Sultan Tarimo <https://github.com/thysultan>
 * @license MIT
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
        factory(exports, root);
    } 
    // browser globals
    else {
        factory(root, root);
    }
}(this, function (exports, root) {
	'use strict';

	// references for better minification
	// so instead of obj.constructor we would do obj[__constructor].
	// the minifier will then be able to minify that to something like
	// o[c] but it can't quite do the the former.
	var
	// types
	__null                      = null,
	__false                     = false,
	__true                      = true,
	__undefined                 = void 0,

	// properties
	__constructor               = 'constructor',
	__prototype                 = 'prototype',
	__length                    = 'length',
	__children                  = 'children',
	__childNodes                = 'childNodes',
	__classList                 = 'classList',
	__className                 = 'className',
	__toLowerCase               = 'toLowerCase',
	__toUpperCase               = 'toUpperCase',
	__substr                    = 'substr',
	__state                     = 'state',
	__props                     = 'props',
	__type                      = 'type',
	__slice                     = 'slice',
	__splice                    = 'splice',
	__replace                   = 'replace',
	__join                      = 'join',
	__split                     = 'split',
	__push                      = 'push',

	// lifecycle properties
	__getInitialState           = 'getInitialState',
	__getDefaultProps           = 'getDefaultProps',
	__componentWillReceiveProps = 'componentWillReceiveProps',
	__componentDidMount         = 'componentDidMount',
	__componentWillMount        = 'componentWillMount',
	__componentWillUnmount      = 'componentWillUnmount',
	__componentDidUnmount       = 'componentDidUnmount',
	__componentWillUpdate       = 'componentWillUpdate',
	__componentDidUpdate        = 'componentDidUpdate',
	__shouldComponentUpdate     = 'shouldComponentUpdate',

	// signatures
	__signatureBase             = '@@dio',
	__streamSignature           = __signatureBase + '/STREAM',
	__storeSignature            = __signatureBase + '/STORE',
	__componentSignature        = __signatureBase + '/COMPONENT',
	__hyperscriptSignature      = __signatureBase + '/HYPERSCRIPT',
	__renderSignature           = __signatureBase + '/RENDER',
	__hydrateSignature          = 'data-hydrate',
	__w3URL                     = 'http://www.w3.org/',

	// functions
	__Number                    = Number,
	__Array                     = Array,
	__Object                    = Object,
	__Function                  = Function,
	__String                    = String,
	__RegExp                    = RegExp,
	__encodeURIComponent        = encodeURIComponent,
	__encodeURI                 = encodeURI,
	__setTimeout                = setTimeout,
	__hyperscriptClass          = createHyperscriptClass(),

	// objects
	__window                    = root,
	__document                  = __window.document,
	__namespace 				= {
		math:  __w3URL + '1998/Math/MathML',
		xlink: __w3URL + '1999/xlink',
		svg:   __w3URL + '2000/svg',
		html:  __w3URL + '1999/xhtml'
	};


	/* --------------------------------------------------------------
	 * 
	 * toArray - convert to array, 
	 * each    - iterator, 
	 * is      - type checker
	 * h       - hyperscript helper
	 * 
	 * -------------------------------------------------------------- */


	/**
	 * convert arguments to arrays
	 * @param  {arugments} arg - array like object
	 * @return {Array}
	 */
	function toArray (arg, index, end) {
		return __Array[__prototype][__slice].call(arg, index, end);
	}

	
	/**
	 * forEach helper
	 * @param  {Array|Object} a 
	 * @param  {Function}     fn
	 * @param  {Boolean}      multiple
	 * @return {Array|Object}
	 */
	function each (arr, fn) {
		// index {Number}
		var 
		index;

		// Handle arrays
		if (is(arr, __Array)) {
			// length {Number}
			var 
			length = arr[__length];
			index  = 0;

			for (; index < length; ++index) {
				// break if fn() returns false
				if (fn(arr[index], index, arr) === __false) {
					return;
				}
			}
		}
		// Handle objects 
		else {
			for (index in arr) {
				// break if fn() returns false
				if (fn(arr[index], index, arr) === __false) {
					return;
				}
			}
		}
	}


	/**
	 * type checker
	 * @param  {Any}  obj  - object to check for type
	 * @param  {Any}? type - type to check for
	 * @return {Boolean}   - true/false
	 */
	function is (obj, type) {
		// obj has a constructor, 
		// we also avoid null values since null has an object constructor
		if (obj !== __undefined && obj !== __null) {
			return obj[__constructor] === type;
		}
		// doesn't have a constructor, is undefined, or is null 
		else {
			return __false;
		}
	}


	/**
	 * hyperscript set children
	 * @param  {Any} a
	 * @return {String|Array|Object}
	 */
	function setHyperscriptChild (child, parent) {
		// if the child is not an object it is a textNode
		// string, bool, number ...etc, so we convert them to string values
		if (!is(child, __Object)) {
			child += '';
		}
		
		return child;
	}

	/**
	 * hyperscript tagger
	 * @param  {Object} a - object with opt props key
	 * @param  {Object} b - tag
	 * @return {[Object]} - {props, type}
	 * 
	 * @example
	 * 
	 * // return {type: 'input', props: {id: 'id', type: 'checkbox'}}
	 * tag('inpu#id[type=checkbox]')
	 */
	function parseHyperscriptType (obj) {
		var 
		classes = [], 
		match,

		// regex to parse type/tag
		regex = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,

		// copy obj's props to abstract props and type
		// incase obj.props is empty create new obj
		// otherwise just add to already available object
		// we will add this back to obj.props later
		props = !obj[__props] ? {} : obj[__props],

		// since we use type in a while loop
		// we will be updating obj.type directly
		// lets keep a copy of the value
		type = obj[__type]

		// set default type to a div
		obj[__type] = 'div';

		// execute the regex and loop through the results
		while ((match = regex.exec(type))) {
			var 
			matchedType      = match[1],
			matchedValue     = match[2],
			matchedProp      = match[3],
			matchedPropKey   = match[4],
			matchedPropValue = match[6];

			// no custom prop match
			if (matchedType === '' && matchedValue !== '') {
				obj[__type] = matchedValue;
			}
			// matches id's - #id
			else if (matchedType === '#') {
				props.id = matchedValue;
			} 
			// matches classes - div.classname
			else if (matchedType === '.') {
				classes[__push](matchedValue);
			} 
			// matches - [prop=value]
			else if (matchedProp[0] === '[') {
				var 
				prop = matchedPropValue;

				// make sure we have a prop value
				if (prop) {
					prop = prop[__replace](/\\(["'])/g, '$1')[__replace](/\\\\/g, "\\");
				}
				// if prop value is an empty string assign true
				props[matchedPropKey] = prop || __true;
			}
		}

		// add classes to obj.props if we have any
		if (classes[__length] > 0) {
			props.class = classes[__join](' ');
		}

		// as promised, update props
		obj[__props] = props;
		
		// done
		return obj;
	}

	/**
	 * create virtual element : h()
	 * @param  {String} type  - Element, i.e: div
	 * @param  {Object} props - optional properties
	 * @return {Object}       - {type, props, children}
	 * 
	 * @example
	 * 
	 * h('div', {class: 'close'}, 'Text Content')
	 * h('div', null, h('h1', 'Text'))
	 */
	function h (type, props) {
		var 
		args     = arguments,
		length   = args[__length],
		children = [],
		// the position that children elements start from
		// example case: h('tag', {}, ...children)
		key      = 2,
		child;

		// if what was suppose to be the position
		// for props is actually a child (hyperscript or any non object value)
		// example case: h('tag', ...children)
		if (
			(props && props[__hyperscriptSignature]) ||
			!is(props, __Object)
		) {
			key   = 1;
			props = {};
		}
		// otherwise just insure props is always an object
		else if (!is(props, __Object)) {
			props = {};
		}

		// auto set namespace for svg and math elements
		// but only if it's not already set
		if ((type === 'svg' || type === 'math') && !props.xmlns) {
			props.xmlns = __namespace[type];
		}

		// construct children
		for (var i = key; i < length; i++) {
			// reference to current layer
			child = args[i];
	
			// if the child is an array go deeper
			// and set the 'arrays children' as children
			if (is(child, __Array)) {
				each(child, function (child) {
					children[__push](setHyperscriptChild(child));
				});
			}
			// deep enough, add this child to children
			else {
				children[__push](setHyperscriptChild(child));
			}
		}

		// support for passing a component as the type argument
		// h(Component, props, children)
		if (is(type, __Function)) {
			return type(props, children);
		}

		// create the hyperscript object
		var
		hyperscript = new __hyperscriptClass({type: type, props: props, children: children});

		// check if the type is a special case i.e [type] | div.class | #id
		// and alter the hyperscript
		if (
			type.indexOf('[') > -1 ||
			type.indexOf('#') > -1 || 
			type.indexOf('.') > -1
		) {
			hyperscript = parseHyperscriptType(hyperscript);
		}

		return hyperscript;
	}


	/* --------------------------------------------------------------
	 *
	 * hydrate   - absorb a dom structure to vdom
	 * vdomToDOM - render vdom to dom
	 * patch     - patch the dom
	 * 
	 * -------------------------------------------------------------- */


	/**
	 * diff virtual component and update dom
	 * @param {Element} parent - dom node
	 * @param {Object}  newNode
	 * @param {Object}  oldNode?
	 * @param {Object}  component?
	 */
	function vdomToDOM (parent, newNode, oldNode, component) {
		// update
		if (oldNode) {
			patch(
				parent, 
				newNode, 
				oldNode, 
				0, 
				component, 
				newNode, 
				oldNode,
				newNode[__children][__length], 
				oldNode[__children][__length],
				newNode[__children], oldNode[__children]
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
	 * hydrate
	 * @param  {[type]} parent
	 * @param  {[type]} newNode
	 * @param  {Object} component
	 * @return {Object} vnode
	 */
	function hydrate (parent, newNode, component, index, newParentNode) {
		index = index || 0;

		var 
		nextNode;

		if (newNode[__children]) {
			nextNode          = parent[__childNodes][index];

			var
			newChildren       = newNode[__children],
			newChildrenLength = newChildren[__length];

			for (var i = 0; i < newChildrenLength; i++) {
				hydrate(nextNode, newChildren[i], component, i, newNode);
			}

			newNode.dom = nextNode;
		}

		if (is(newNode, __String)) {
			// fragment to use to replace a single textNode
			// with multiple text nodes
			// case in point
			// h('h1', 'Hello', 'World')
			// output: <h1>HelloWorld</h1>
			// but HelloWorld is one text node in the dom
			// while two in the vnode
			var 
			fragment = __document.createDocumentFragment();

			// look ahead of this nodes siblings
			// add any that is not an object aka 'textNode'/'string' to
			// the fragment 
			each(newParentNode[__children][__slice](index), function (value) {
				// exit quickly once we encounter a non text/string node
				if (is(value, __Object)) {
					return __false;
				}

				appendChild(fragment, createElement(value));
			});

			// replace the textNode with a set of textNodes
			replaceChild(fragment, parent[__childNodes][index]);
		}

		nextNode = parent[__childNodes][index];

		if (newParentNode) {
			newParentNode[__childNodes] = newParentNode[__childNodes] || [];
			newParentNode[__childNodes][__push](nextNode);
		}

		if (!is(newNode, __String)) {
			// set refs
			setRefs(newNode, nextNode, component);
			// add events if any
			addEventListeners(nextNode, newNode[__props]);
		}

		return newNode;
	}

	// patch
	function patch (
		parent,
		newNode, 
		oldNode,
		index, 
		component,
		newParentNode, 
		oldParentNode,
		newChildrenLength, 
		oldChildrenLength,
		newChildren, 
		oldChildren
	) {
		index = index || 0;

		// adding to the dom
		if (oldNode === __undefined) {
			var
			nextNode = createElement(newNode, component);

			// add to parents child nodes to keep in sync
			if (oldParentNode) {
				spliceNode(oldParentNode[__childNodes], index, 0, nextNode);
			}

			appendChild(parent, nextNode, newNode);
		}

		// removing from the dom
		else if (newNode === __undefined) {
			var
			prevNode = oldNode.dom || oldParentNode[__childNodes][index];

			spliceNode(oldParentNode[__childNodes], index, 1);

			removeChild(parent, prevNode, oldNode);
		}

		// updating keyed items
		else if (keysChanged(newNode, oldNode)) {
			var
			currentNode = oldParentNode[__childNodes][index];

			// remove
			if (newChildrenLength < oldChildrenLength) {
				// update the oldChildren array to remove the old node
				spliceNode(oldChildren, index, 1);

				// update the parentNodes children array to remove the child
				spliceNode(oldParentNode[__childNodes], index, 1);

				// dom operation, remove node
				removeChild(parent, currentNode, newNode);

				// reduce the length of newChildrenLength
				return -1;
			}
			else {
				var 
				nextNode = createElement(newNode, __undefined, __undefined, oldNode);

				// add
				if (newChildrenLength > oldChildrenLength) {
					// update the oldChildren array to include the new node
					spliceNode(oldChildren, index, 0, newNode);

					// update the parentNodes children array to include the child
					spliceNode(oldParentNode[__childNodes], index, 0, nextNode);

					// dom operation, insert node
					insertBefore(parent, currentNode, nextNode, newNode);
				}
				// replace
				else {
					// dom operation, replace node
					replaceChild(parent, currentNode, nextNode, newNode);

					// update the parentNodes children array, replacing the child
					oldParentNode[__childNodes][index] = nextNode;
				}
			}
		}

		// replacing a node
		else if (nodeChanged(newNode, oldNode)) {
			var
			prevNode = oldParentNode[__childNodes][index];

			// text node
			if (!oldNode[__type] && !newNode[__type]) {
				prevNode.nodeValue = newNode;
			}
			else {
				var
				nextNode = createElement(newNode, __undefined, __undefined, oldNode);

				replaceChild(parent, prevNode, nextNode, newNode);

				oldParentNode[__childNodes][index] = nextNode;
				oldChildren[index]                 = newNode;
			}
		}

		// the lookup loop down the stack
		else if (is(newNode[__children], __Array) && is(oldNode[__children], __Array)) {
			var
			nextNode          = oldNode.dom || oldParentNode[__childNodes][index],
			newChildren       = newNode[__children],
			oldChildren       = oldNode[__children],
			newChildrenLength = newChildren[__length],
			oldChildrenLength = oldChildren[__length];

			// update props
			handlePropChanges(nextNode, newNode, oldNode);

			// loop through children
			for (var i = 0; i < newChildrenLength || i < oldChildrenLength; i++) {
				if (shouldComponentUpdate(newChild)) {
					return;
				}
				else {
					var
					newChild = newChildren[i],
					oldChild = oldChildren[i];

					var
					op = patch(
						nextNode,
						newChild, 
						oldChild,
						i,
						__undefined,
						newNode, 
						oldNode,
						newChildrenLength, 
						oldChildrenLength,
						newChildren, 
						oldChildren
					);

					if (op !== __undefined) {
						newChildrenLength += op,
						oldChildrenLength += op;
					}
				}
			}
		}

		normalizeNodes(newNode, oldNode);
	}

	function spliceNode (arr, index, length, item) {
		if (item) {
			arr[__splice](index, length, item);
		}
		else {
			arr[__splice](index, length);
		}
	}

	// normalize old and new nodes dom references
	// so that newNode retains the dom references of oldNode
	function normalizeNodes (newNode, oldNode) {
		if (oldNode && newNode && oldNode[__type] && newNode[__type]) {
			newNode.dom           = oldNode.dom;
			newNode[__childNodes] = oldNode[__childNodes];
		}
	}

	// check for keyed nodes changes
	function keysChanged (newNode, oldNode) {
		return (
			newNode && oldNode &&
			newNode[__props] && oldNode[__props] &&
			newNode[__props].key !== oldNode[__props].key
		);
	}

	// check if the component should update
	function shouldComponentUpdate (newNode) {
		return (
			newNode &&
			newNode[__shouldComponentUpdate] &&
			newNode[__shouldComponentUpdate] === __false
		);
	}

	// remove element
	function removeChild (parent, nextNode, oldNode) {
		lifecycle(oldNode, __componentWillUnmount);
		parent.removeChild(nextNode);
		lifecycle(oldNode, __componentDidUnmount);
	}

	// add element to the end
	function appendChild (parent, nextNode, newNode) {
		lifecycle(newNode, __componentWillMount);
		parent.appendChild(nextNode);
		lifecycle(newNode, __componentDidMount);
	}

	// add element before another element
	function insertBefore (parent, beforeNode, nextNode, newNode) {
		lifecycle(newNode, __componentWillMount);			
		parent.insertBefore(nextNode, beforeNode);
		lifecycle(newNode, __componentDidMount);
	}

	// replace element
	function replaceChild (parent, prevNode, nextNode, newNode) {
		lifecycle(newNode, __componentWillUpdate);
		parent.replaceChild(nextNode, prevNode);
		lifecycle(newNode, __componentDidUpdate);
	}

	// diffing if two nodes have changed
	function nodeChanged (newNode, oldNode) {
		var
		// text node
		text = !newNode[__type] && newNode !== oldNode,
		// element type
		type = newNode[__type] !== oldNode[__type];

		return text || type;
	}

	// create element
	function createElement (node, component, namespace, oldNode) {
		var 
		element;

		// text nodes
		if (!node[__type]) {
			element = node;

			if (!is(element, __String)) {
				element += '';
			}

			return __document.createTextNode(element);
		}
		else {
			var 
			element,
			children = node[__children];

			node[__childNodes] = [];

			// assign namespace if set
			if (node[__props] && node[__props].xmlns) {
				namespace = node[__props].xmlns;
			}

			// namespaced
			if (namespace) {
				element = __document.createElementNS(namespace, node[__type]);

				if (!node[__props].xmlns) {
					node[__props].xmlns = namespace;
				}
			}
			// default
			else {
				element = __document.createElement(node[__type]);
			}

			// set refs
			setRefs(node, element, component);
			// diff and update/add/remove props
			setElementProps(element, node[__props]);
			// add events if any
			addEventListeners(element, node[__props]);
			
			// only map children arrays
			if (is(children, __Array)) {
				each(children, function (child) {
					var 
					nextNode = createElement(child, component, namespace, oldNode);

					node[__childNodes][__push](nextNode);
					appendChild(element, nextNode, child);
				});
			}
		}

		node.dom = element;

		return element;
	}

	function setRefs (node, element, component) {
		if (
			node[__hyperscriptSignature] &&
			node[__hyperscriptSignature][__componentSignature]
		) {
			component = node[__hyperscriptSignature][__componentSignature];
		}

		if (component && node[__props] && node[__props].ref) {
			var
			ref = node[__props].ref;

			// we have a component and string ref
			if (component && is(ref, __String)) {
				// create the refs object if it doesn't already exist
				component.refs = component.refs || {};
				// set string refs
				component.refs[ref] = element;
			}
			// function ref, execute and pass the element as a parameter
			else if (is(ref, __Function)) {
				ref(element);
			}
		}
	}

	// check if props is event
	function isEventProp (name, value) {
		// checks if the first two characters are on
		return name[__substr](0,2) === 'on' && is(value, __Function);
	}

	// get event name
	function extractEventName (name) {
		// removes the first two characters and converts to lowercase
		return name[__substr](2, name[__length])[__toLowerCase]();
	}

	// add event
	function addEventListeners (target, props) {
		for (var name in props) {
			var 
			value = props[name];

			if (isEventProp(name, value)) {
				// is a callback
				target.addEventListener(extractEventName(name), value, __false);
			}
		}
	}

	// create list of changed props
	function handlePropChanges (target, newNode, oldNode) {
		// get changes to props/attrs
		var
		propChanges = getPropChanges(newNode[__props], oldNode[__props]);

		// if there are any prop changes
		if (propChanges[__length]) {
			// before all props change
			lifecycle(newNode, __componentWillUpdate);

			each(propChanges, function (obj) {
				updateElementProps(target, obj.name, obj.value, obj.op, newNode[__props].xmlns);
			});

			// after all props change
			lifecycle(newNode, __componentDidUpdate);
		}
	}

	// update props
	function getPropChanges (newProps, oldProps) {
		var 
		changes = [];
		oldProps = oldProps || {};

		// merge old and new props
		var
		props = {};

		for (var name in newProps) { 
			props[name] = newProps[name];
		}
		for (var name in oldProps) { 
			props[name] = oldProps[name];
		}

		// compare if props have been added/delete/updated
		for (var name in props) {
			var 
			oldVal = oldProps[name],
			newVal = newProps[name],
			// returns true/false if the prop has changed from it's prev value
			remove = newVal === __undefined || newVal === __null,
			// says only diff this if it's not an event i.e onClick...
			add    = oldVal === __undefined || oldVal === __null || newVal !== oldVal;

			// something changed
			if (add || remove) {
				var 
				value  = remove === -1 ? oldVal : newVal;

				changes[__push]({
					name: name, 
					value: value,
					op: add || remove
				});
			}
		}

		return changes;
	}

	// initial creation of props, no checks, just set
	function setElementProps (target, props) {
		for (var name in props) {
			updateElementProps(target, name, props[name], +1, props.xmlns);
		}
	}

	// assign/update/remove prop
	function updateElementProps (target, name, value, op, namespace) {
		// don't add events/refs/keys as props/attrs
		if (
			name === 'ref' || 
			name === 'key' ||
			isEventProp(name, value)
		) {
			return;
		}

		// prop operation type, either remove / set
		if (op === -1) {
			op = 'removeAttribute';
		}
		else {
			op = 'setAttribute';
		}

		// set xlink:href attr
		if (name === 'xlink:href') {
			return target[op+'NS'](__namespace['xlink'], 'href', value);
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
		if (is(value, __Object)) {
			// classes
			if (name === __className || name === 'class') {
				each(value, function (content, index) {
					var 
					type = !content ? 'remove' : 'add';

					// add/remove class
					classList(type, target, index);
				});
			}
			// styles and other object {} type props
			else {
				each(value, function (value, index) {
					if (!is(target[name][index])) {
						target[name][index] = value;
					}
				});
			}
		}
		// array of classes
		else if (is(value, __Array) && (name === __className || name === 'class')) {
			target[op](name, value[__join](' '));
		}
		// everything else
		else {
			if (
				target[name] !== __undefined &&
				namespace    !== __namespace['svg']
			) {
				target[name] = value;
			}
			else {
				target[op](name, value);
			}
		}
	}


	/* --------------------------------------------------------------
	 * 
	 * lifecycle              - execute lifecycle methods
	 * createRender           - create a render instance
	 * createHyperscriptClass - create hyperscript class
	 * createComponent        - create a component
	 * componentClass         - components class / interface / blueprint
	 * setProps               - update a components props
	 * setState               - update a components state
	 * withAttr               - two-way data binding helper
	 * 
	 * -------------------------------------------------------------- */


	/**
	 * component lifecycle trigger
	 * @param  {Object}         node  - component, or hyperscript
	 * @param  {String}         state - stage of the lifecycle
	 * @param  {Boolean|Object} props - weather to pass props to stage
	 * @param  {Boolean|Object} state - weather to pass sate to stage
	 * @params {Boolean}        isCmp - weather this is a component or not
	 */
	function lifecycle (node, stage, isComponent, props, state, wildcard) {
		// end quickly
		// if node is not from statefull component
		if (
			// no node
			!node ||

			// without .componentSignature and .render
			// the hyperscript object is thus from
			// a stateless component
			(
				node && 
				node[__hyperscriptSignature] && 
				!node[__hyperscriptSignature][__componentSignature] &&
				!node.render
			)
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
		else if (
			node[__hyperscriptSignature] &&
			node[__hyperscriptSignature][__componentSignature]
		) {
			component = node[__hyperscriptSignature][__componentSignature];
		}

		if (component && component[stage]) {
			// is the props/state truthy? if so check if it is not a boolean
			// if so default to the value in props/state passed, 
			// if it is default to the components own props.
			// if props/state is falsey value, 
			// default to undefined

			// props is either the value of the props passed as an argument
			// or the value of the components
			props = props || component[__props],
			state = state || component[__state];

			// componentShouldUpdate returns a Boolean
			// so we publish the lifecycle return values
			// which we can use in the vdomToDOM / update () function
			// to see if we should skip an element or not
			return component[stage](props, state, component, wildcard);
		}
	}


	/**
	 * creates a render interface
	 * @return {Function}
	 * 
	 * @example
	 * 
	 * render = dio.createRender(Component, '.selector')
	 * render()
	 */
	function createRender (componentArg, mountArg) {
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
			if (!isStatelessComponent && componentsObj) {
				// reference render, so we can then call this
				// in this.setState
				// this only applied to parent components passed to
				// .createRender(here, ...);
				if (!componentsObj['()']) {
					componentsObj['()'] = update;	
				}
			}

			// get a fresh copy of the vdom
			newNode = component(props, children);
			
			// clear mount
			if (newNode && !mountElement.hasAttribute(__hydrateSignature)) {
				// clear container
				mountElement.textContent = '';
				// initial mount
				vdomToDOM(mountElement, newNode, __undefined, componentsObj);
			}
			// hydration mount
			else {
				mountElement.removeAttribute(__hydrateSignature);
				hydrate(mountElement, newNode, componentsObj);
			}

			// this newNode is equal to the next renders oldNode
			oldNode = newNode;
			// publish that the initial mount has taken place
			initialRender = __false;
		}

		// return function that runs update/mount when executed
		function render (props, children, forceUpdate) {
			// don't render to dom, if vdom is requested
			if (forceUpdate === __componentSignature) {
				return component(props, children);
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

		render.id = __renderSignature;

		var
		component,
		newNode,
		oldNode,
		mountElement,
		componentsObj,
		isStatelessComponent,
		initialRender = __true;

		// set mountElement
		if (mountArg) {
			mountElement = mountArg.nodeType ? mountArg : __document.querySelector(mountArg);
		}

		// default element to body
		if (!mountElement || mountElement === __document) {
			mountElement = __document.body;
		}

		component = createComponent(componentArg);

		// a component exists
		if (component) {
			// determine if the component is stateless
			if (component.stateless) {
				isStatelessComponent = __true;
			}

			// don't try to get it's internals if it's stateless
			if (!isStatelessComponent) {
				componentsObj = component(__undefined, __undefined, __true);
			}

			// react-like behaviour
			// i.e h(Component, {...props}, ...children) behaviour
			if (componentArg[__type]) {
				return render();
			}
			// normal behaviour
			// i.e render(Component, mount)({...props}, [children])
			else {
				return render;
			}
		}
		// can't find a component
		else {
			throw 'not component';
		}
	}

	/**
	 * hyperscript class
	 * @param  {Array} args arugments to add to the prototype object
	 * @return {Function}
	 */
	function createHyperscriptClass (args) {
		// interface
		function h (obj) {
			if (!obj) {
				throw 'not hyperscript';
			}

			var 
			self = this;

			self[__type]     = obj[__type],
			self[__props]    = obj[__props],
			self[__children] = obj[__children];
		}

		// data placeholder for storing internal data
		h[__prototype][__hyperscriptSignature] = {};

		if (args) {
			each(args, function (value, index) {
				h[__prototype][__hyperscriptSignature][value[0]] = value[1];
			});
		}

		// we want the constructor of the resulting created object
		// from new hyperscript()... to be the Object interface
		// and not our h () interface above
		h[__prototype][__constructor] = __Object;

		return h;
	}


	/**
	 * creates a component
	 * @param  {Function|Object} arg - component
	 * @return {Function}
	 */
	function createComponent (arg) {
		var 
		obj,
		displayName;

		// maybe the arg is a function that returns an object
		if (is(arg, __Function)) {
			// already a component
			if (arg.id === __componentSignature) {
				return arg;
			}

			obj = arg();

			if (!obj) {
				throw 'no render';
			}
			// a stateless component
			// we assume it returns a hyperscript object
			// rather than a render method
			else if (!obj.render) {
				arg.stateless = __true
				return arg;
			}

			// get displayName from obj or function
			// i.e a function Foo () { ... } // => Foo
 			displayName = obj.displayName || /function ([^(]*)/.exec(arg.valueOf())[1];
		}
		// we have an object
		else if (is(arg, __Object)) {
			// does the object have a render method
			// if not create one that returns 'arg' which we 
			// assume is a hyperscript object thus a stateless component
			if (arg.render) {
				obj = arg;
			}
			// a hyperscript object with a component reference
			else if (
				arg[__hyperscriptSignature] &&
				arg[__hyperscriptSignature][__componentSignature]
			) {				
				obj = arg[__hyperscriptSignature][__componentSignature];
			}
			// stateless
			else {
				var 
				statelessComponent = function () { 
					return arg;
				};
				statelessComponent.stateless = __true;

				return statelessComponent;
			}
		}
		else {
			throw 'invalid component';
		}

		// everything checks out i.e
		// - obj has a render method
		// - or arg() returns an object that has a render method
		// stateless components never reach here

		// the component object
		var
		component;

		// already a component
		if (obj.setState && obj[__state] && obj[__props]) {
			component = obj;
		}
		else {
			component = new componentClass(displayName);

			// add the properties to the component instance
			// also bind functions to the component scope
			each(obj, function (value, name) {
				// methods
				if (is(value, __Function)) {
					// pass props and state to render
					if (name !== 'render') {
						component[name] = value.bind(component);
					}
				}
				// objects
				else {
					component[name] = value;
				}
			});

			// set initial state
			if (component[__getInitialState]) {
				component[__state] = component[__getInitialState]();
			}
			// set default props
			if (component[__getDefaultProps]) {
				component[__props] = component[__getDefaultProps]();
			}

			// creates a hyperscript class
			// with the passed values in the array as it's prototypes
			var 
			h = createHyperscriptClass([
				[__componentSignature, component], 
				[__shouldComponentUpdate, __true]
			]);

			// get the render method
			var
			render = obj.render.bind(component, component[__props], component[__state], component);

			// insure the render function returns the newly
			// created hyperscript object
			component.render = function () {
				return new h(render());
			}
		}

		// hyperscript cache
		var
		cache,
		// should we check prop types
		shouldValidatePropTypes = !!component.propTypes && !!root && root.NODE_ENV !== 'production';

		// we will return a function that when called
		// returns the components vdom representation
		// i.e User(props) -> {type: 'div', props: {..props}, children: ...}
		// this is that function
		function Component (props, children, internal) {
			if (internal) {
				return component;
			}

			// make sure this is not the first render
			// if it is there will be no cached copy
			if (cache) {
				// shouldComponentUpdate?
				// if false, add signal, and return cached copy
				if (
					component[__shouldComponentUpdate] === __false ||
					lifecycle(component, __shouldComponentUpdate, __true, props) === __false
				) {
					cache[__hyperscriptSignature][__shouldComponentUpdate] = __false;
					return cache;
				}
				else {
					cache[__hyperscriptSignature][__shouldComponentUpdate] = __true;
				}
			}

			// add children to props if set
			if (children) {
				props = props || {};
				props[__children] = children;
			}

			// publish componentWillReceiveProps lifecycle
			if (props) {
				if (shouldValidatePropTypes) {
					validatePropTypes(props, component.propTypes, displayName);
				}

				lifecycle(component, __componentWillReceiveProps, __true, props);
				// set props
				setProps(component, props);
			}

			cache = component.render();
			return cache;
		}
		Component.id = __componentSignature;

		return Component;
	}


	function logValidationError (error) {
		var 
		type = 'error';

		if (console && is(console[type], __Function)) {
			console[type]('Warning: Failed propType: ' + error + '`.');
		}
	}

	function validatePropTypes (props, propTypes, displayName) {
		each(propTypes, function (typeValidator, propName) {
			var 
			validationResult = typeValidator(props, propName, displayName);

			if (validationResult) {
				logValidationError(validationResult);
			}
		});
	}

	function createPropTypes () {
		var
		types        = ['number', 'string', 'bool', 'array', 'object', 'func'],
		propTypesObj = {};

		function createTypeValidator (name, isRequired) {
			function typeValidator (props, propName, displayName) {
				var 
				propValue = props[propName];

				if (propValue) {
					if (
						!is(
							propValue, 
							root[
								name[__substr](0,1)[__toUpperCase]() + 
								name[__substr](1)
							]
						)
					) {
						return new Error(
							'Invalid prop `' + propName +
							'` of type `' + propValue[__constructor].name[__toLowerCase]() + 
							'` supplied to `' +
							displayName +
							'`, expected `' + name
						);
					}
				}
				else if (isRequired) {
					return new Error(
						'Required prop `' +
						propName + '` not specified in `' + 
						displayName
					);
				}
			}

			if (!isRequired) {
				typeValidator.isRequired = createTypeValidator(name, __true);
			}

			return typeValidator;
		}

		each(types, function (name) {
			propTypesObj[name] = createTypeValidator(name);
		});

		return propTypesObj;
	}


	/**
	 * componentClass
	 * component interface/blueprint
	 * @param {String} - displayName
	 * @return {Object} {props, state, setState, setProps, forceUpdate, withAttr}
	 */
	function componentClass (displayName) {
		// immutable internal props & state
		this[__props] = {},
		this[__state] = {};

		// add displayName if available
		// this will make for better debugging
		if (displayName) {
			this.displayName = displayName;
		}
	}

	/**
	 * componentClass prototype
	 */
	componentClass[__prototype] = {
		// i.e this.setState({})
		setState: function (data, self) {
			// this allows us to run setState
			// from outside the components namespace
			// i.e this.setState({}, context)
			self = self || this;

			// set state
			// if the state is changed
			// setState will return true
			// thus force and update when
			// that happens
			if (setState(self, data)) {
				// update render
				self.forceUpdate();
			}
		},
		// i.e this.setProps({})
		setProps: function (data, self) {
			// same thing
			self = self || this;

			// set props does not trigger an redraw/update
			setProps(self, data);
		},
		// force update public method
		forceUpdate: function (self) {
			self = self || this;

			// update only if this component is a render instance
			if (self['()']) {
				self['()']();
			}
		},
		withAttr: function (props, setters, callback, self) {
			self = self || this;

			if (!is(callback, __Function)) {
				callback = function () {
					self.forceUpdate.call(self);
				}
			}

			return withAttr(props, setters, callback.bind(self))
		}
	}


	/**
	 * set/update a components props
	 * @param {Object} self components object
	 * @param {Object} data data with which to update the components props
	 */
	function setProps (self, data) {
		// assign props to {} if it's undefined
		self[__props] = self[__props] || {};

		// if the object is a function that returns an object
		if (is(data, __Function)) {
			data = data();
		}

		if (data) {
			// set props
			each(data, function (value, name) {
				self[__props][name] = value;
			});
		}
	}


	/**
	 * set/update a components state
	 * @param {Object} self components object
	 * @param {Object} data data with which to update the components state
	 */
	function setState (self, data) {
		// assign state to {} if it's undefined
		self[__state] = self[__state] || {};

		// if the object is a function that returns an object
		if (is(data, __Function)) {
			data = data();
		}

		// make sure we have something to update
		if (data) {
			// set state
			each(data, function (value, name) {
				self[__state][name] = value;
			});

			return __true;
		}
	}


	/**
	 * two-way data binding, not to be confused with Function.bind
	 * @param  {String|String[]} props      - the property/attr to look for in the element
	 * @param  {Function|Function[]} setter - the object to update/setter to execute
	 * 
	 * @example
	 * 
	 * direction of binding element ----> setter
	 * this.withAttr(['prop1-from-el', 'prop2-from-el'], to-prop1-setter, to-prop2-setter)
	 * direction of binding element <---- setter
	 * this.withAttr([to-prop1-setter, to-prop2-setter], ['prop1-from-el', 'prop2-from-el'])
	 *
	 * setters are always an array of: functions
	 * and element props: strings
	 */
	function withAttr (props, setters, callback) {
		function update (el, prop, setter) {
			var
			value;

			// prop is a string, get value from element
			if (is(prop, __String)) {
				// get key from element
				// either the prop is a property of the element object
				// or an attribute
				value = (prop in el) ? el[prop] : el.getAttribute(prop);

				// just an <if(value)> doesn't work since the value can be false
				// null or undefined = prop/attr doesn't exist
				if (value !== __undefined && value !== __null) {
					// run the setter
					setter(value);
				}
			}
			// setter is a string, get value from stream
			else {
				value = prop()
				
				if (value !== __undefined && value !== __null) {
					(setter in el) ? el[setter] = value : el.setAttribute(setter, value);
				}
			}
		}

		// the idea is that when you attach a function to an event,
		// i.e el.addEventListener('eventName', fn)
		// when that event is dispatched the function will execute
		// making the this context of this function the element 
		// that the event was attached to
		// we can then extract the value, and run the prop setter(value)
		// to change it's value
		return function () {
			// assign element
			var 
			el  = this;

			// array of bindings
			if (is(props, __Array)) {
				each(props, function(value, index) {
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


	/* --------------------------------------------------------------
	 * 
	 * animateWith  - animation helper
	 * request      - http helper
	 * createStore  - redux-like store
	 * createRouter - router helper
	 * createStream - create stream
	 * createHTML   - ouput html from vdom
	 * createStyle  - create stylesheet
	 * curry        - curry helper
	 * 
	 * -------------------------------------------------------------- */


	/**
	 * classList helper
	 * @param  {Element} element
	 * @param  {String}  value
	 * @return {Object} {add, remove, toggle, hasClass}
	 */
	function classList (type, element, className) {
		/**
		 * check if the element has the class/className
		 * @param  {Element}  element   - target element
		 * @param  {String}   className - className to check for
		 * @return {Boolean}
		 */
		function hasClass (element, className) {
			// default to native Element.classList()
		    if (element[__classList]) {
		        return element[__classList].contains(className);
		    } 
		    else {
		    	// this will return true if indexOf does not
		    	// find our class in the className string 
		        return element[__className].indexOf(className) > -1;
		    }
		}

		/**
		 * add a className to an element
		 * @param  {Element}  element   - target element
		 * @param  {String}   className - className to add
		 */
		function add (element, className) {
			// default to native Element.classList.remove()
			if (element[__classList]) {
		        element[__classList].add(className);
		    }
		    // exit early if the class is already added
		    else if (!hasClass(element, className)) {
		    	// create array of current classList
		        var 
		        classes = element[__className][__split](" ");
		        // add our new class
		        classes[__push](className);
		        // join our classes array and re-assign to className
		        element[__className] = classes[__join](" ")
		    }
		}

		/**
		 * remove a className from an element
		 * @param  {Element}  element   - target element
		 * @param  {String}   className - className to remove
		 */
		function remove (element, className) {
			// default to native Element.classList.remove()
		    if (element[__classList]) {
		        element[__classList].remove(className);
		    }
		    else {
		    	// create array of current classList
		        var
		        classes = element[__className][__split](" ");
		        // remove the className on this index
		        classes[__splice](classes.indexOf(className), 1);
		        // join our classes array and re-ssign to className
		        element[__className] = classes[__join](" ");
		    }
		}

		/**
		 * toggle a className on an element
		 * @param  {Element}  element   - target element
		 * @param  {String}   className - classname to toggle
		 */
		function toggle (element, className) {
			// default to native Element.classList.toggle()
		    if (element[__classList]) {
		        element[__classList].toggle(className);
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
	 * @return {Object} {flip, animate}
	 */
	function animateWith () {
		/**
		 * add / remove event Listeners
		 * @param  {Element}  element 
		 * @param  {Array}    events
		 * @param  {Function} listener
		 * @param  {String}   type     'add' | 'remove'
		 */
		function eventListener (element, events, listener, type) {
			each(events, function (event) {
				element[type+'EventListener'](event, listener);
			});
		}

		/**
		 * get elements client rect and return a mutable object
		 * with top, left, width, and height values
		 * @param  {Element} element - element to run getBoundingClientRect on
		 * @return {Object}          - {top, left, width, height}
		 */
		function getBoundingClientRect (element) {
			var 
			rect = element.getBoundingClientRect();

			return {
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height
			};
		}

		/**
		 * prefix css props
		 * @param  {Object} style - the elements style object
		 * @param  {String} prop  - prop to set
		 * @param  {String} value - value of the prop
		 */
		function prefix (style, prop, value) {
			// exit early if we support un-prefixed prop
	  		if (style && (style[prop] === __null || style[prop] === __undefined)) {
	  			// chrome, safari, mozila, ie
    			var 
    			vendors = ['webkit','Webkit','Moz','ms'];

	      		for (var i = 0; i < vendors[__length]; i++) {
	      			// vendor + capitalized prop
	      			prop = vendors[i] + prop[0][__toUpperCase]() + prop[__slice](1);

	      			// add prop if vendor prop exists
  					if (style[prop] !== __undefined) {
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
		 * First, Last, Invert, Play
		 * flip animate an element
		 * 
		 * @param  {Element} element   
		 * @param  {Array}   transforms 'describe additional transforms'
		 * @param  {Number}  duration   'duration of the animation'
		 * @param  {String}  className  'class that represents end state animating to'
		 * @return {Void}
		 * 
		 * @example
		 * 
		 * h('.card', {onclick: animate}, h('p', null, a)) 
		 * // className defaults to animation-active end class
		 * // duration defaults to 220ms
		 * // or 
		 * 
		 * h('.card', {onclick: animate(400, 'active-state', null, 'linear')})
		 * 
		 * // or 
		 * animate(duration{400},'endClassName'{'.class'},'extra transforms'{'rotate(25deg)')})
		 */
		function flipAnimation (className, duration, transformations, transformOrigin, easing) {
			return function (element, callback) {
				transformations  = transformations || '';

				// get element if selector
				if (is(element, __String)) {
					element = __document.querySelector(element);
				}

				// check if element exists
				if (!element && element.nodeType) {
					throw 'can\'t animate without an element';
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
				if (is(element.animate, __Function)) {
					webAnimations = __true;
				}

				// get the first rect state of the element
				first = getBoundingClientRect(element);
				// assign last state if there is an end class
				if (className) {
					classList('toggle', element, className);
				}
				// get last rect state of the elemenet, 
				// if there is no end class
				// then nothing has changed, save a reflow and just use the first state
				last = className ? getBoundingClientRect(element) : first;

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
					eventListener(element, [transEvtEnd], onfinish, 'add')

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
						prefix(style, 'transition', __undefined);
						prefix(style, 'transform', __undefined);
					}

					// remove the event listener
					element.removeEventListener(transEvtEnd, onfinish);

					// clear transform origin styles
					prefix(style, 'transformOrigin', __undefined);

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
		 * css transitions/animations for an element then run the callback after
		 * the transition/animation is complete
		 */
		function cssAnimation (type) {			
			return function keyframe (className, classListMethod) {
				// the default is to add the class
				classListMethod = classListMethod || 'add';

				// remove class if less than 0 or a falsey value or 'remove'
				if (
					classListMethod < 0 || 
					(classListMethod !== __undefined && !classListMethod)
				) {
					classListMethod = 'remove';
				}

				return function (element, callback) {
					// push to next event-cycle/frame
					__setTimeout(function () {
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
						// for every 'time' we find in transition-duration we add it to duration
						duration = 0,
						// get transition duration and remove 's' and spaces
						// we will get from this '0.4s, 0.2s' to '0.4,0.2'
						// we then split it to an array ['0.4','0.2']
						// note: the numbers are still in string format
						transitionData = getComputedStyle(element)
						transitionData = transitionData[type+'Duration'];
						transitionData = transitionData[__replace](/s| /g, '')[__split](',');

						// convert all values to a number
						// increament duration (in ms)
						each(transitionData, function (value) {
							duration += parseFloat(value) * 1000;
						});

						// run callback after duration of transition
						// has elapsed
						if (callback) {
							__setTimeout(function () {
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
	 * @param {String}  url, 
	 * @param {Any}     payload, 
	 * @param {String}  enctype, 
	 * @param {Boolean} withCredentials
	 * @return {Object} {get, post, put, delete}
	 */
	function request () {
		/**
		 * return the response in it's right type
		 * i.e json as {}, text/html as a document...
		 * @param  {{Object}} xhr
		 * @return {Any} 
		 */
		function response (xhr) {			
			var 
			responseBody,
			responseType,
			responseText   = xhr.responseText,
			responseHeader = xhr.getResponseHeader("Content-Type");

			// format response header
			// get the type of response
			// so we can use that to format the response body
			// if needed i.e create a dom/parse json
			if (responseHeader.indexOf(';') !== -1) {
				responseType = responseHeader[__split](';');
				responseType = responseType[0][__split]('/');
			}
			else {
				responseType = responseHeader[__split]('/');
			}

			// extract response type 'html/json/text'
			responseType = responseType[1];

			// json, parse json
			if (responseType === 'json') {
				responseBody = JSON.parse(responseText);
			}
			// html, create dom
			else if (responseType === 'html') {
				responseBody = (new DOMParser()).parseFromString(responseText, "text/html");
			}
			// text, as is
			else {
				responseBody = responseText;
			}

			return responseBody;
		}

		/**
		 * http interface
		 * @param {String}
		 * @param {String}
		 * @param {Object}
		 * @param {Function}
		 */
		function http (url, method, payload, enctype, withCredentials) {
			// return a a stream
			return createStream(function (resolve, reject) {
				// create xhr object 
				var
				xhr      = new XMLHttpRequest(),
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
				a = __undefined;
				
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
					xhr.withCredentials = __true;
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
		 * @param  {Object}  obj   
		 * @param  {Object}  prefix
		 * @return {String}  serialized object
		 * 
		 * @example
		 * 
		 * // returns 'url=http%3A%2F%2F.com'
		 * param({url:'http://.com'})
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
			    arr[__push](typeof value == 'object' ? 
			    	param(value, __prefix) :
			    	__encodeURIComponent(__prefix) + '=' + __encodeURIComponent(value));
			}

			return arr[__join]('&');
		}


		/**
		 * create request
		 * @param {String}
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
				url = __encodeURI(url);

				// for .get requests pass payload as query string if present
				if (payload && method === 'GET') {
					url += '?' + param(payload);
				}

				// return ajax promise
				return http(url, method, payload, enctype, withCredentials);
			}
		}

		/**
		 * request interface
		 * request({method: 'GET', url: '?'})
		 * is the same as
		 * request.get('?')
		 * @param  {Object} obj - details of the request
		 */
		function request (obj) {
			return request[obj.method[__toLowerCase]()](
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
	 * @param  {[type]} reducer [description]
 	 * @return {Object} {connect, dispatch, getState, subscribe}
	 */
	function createStore (reducer) {
		// if the reducer is an object of reducers (multiple)
		// lets combine the reducers
		if (is(reducer, __Object)) {
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

				return __Object.keys(reducers).reduce(function (nextState, key) {
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
				if (!is(action, __Object)) {
					throw 'action must be a plain object';
				}
				if (action[__type] === __undefined) {
					throw 'actions must have a type';
				}

				// get state from reducer
				state = reducer(state, action);

				// dispatch to all listeners
				each(listeners, function (listener) {
					return listener(state);
				})
			}

			// subscribe to a store
			function subscribe (listener) {
				if (!is(listener, __Function)) {
			  		throw 'listener should be a function';
				}

				listeners[__push](listener);

				// return a unsubscribe function that we can 
				// use to unsubscribe as follows: i.e
				// var sub = store.subscribe()
				// sub() // un-subscribes
				return function unsubscribe () {
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
	 * @param {Object} routes
	 * @param {String} rootAddress 
	 * @param {String} onInitNavigateTo
	 * 
	 * @example
	 * 
	 * router({
	 * 		'/:page/:name': () => {}
	 * }, '/example', '/user/id')
	 * 
	 * router({
	 * 		'/:page/:name': Component
	 * })
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
				each(routes, function (value, name) {
					// vars = where we store the variables
					// i.e in /:user/:id - user, id are variables
					var 
					vars = [],
					regex = /([:*])(\w+)|([\*])/g,

					// given the following /:user/:id/*
					pattern = name[__replace](regex, function () {
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
									vars[__push](id)
									return '([^\/]+)';
								}
							}),

					// close the pattern
					pattern = pattern + '$';
					pattern = rootAddress ? rootAddress + pattern : pattern;
					pattern = new __RegExp(pattern);

					// assign a route item
					routes[name] = [value, pattern, vars];
				});
			}

			/**
			 * called when the listener detects a route change
			 */
			function triggerRouteChange () {
				each(routes, function (val) {
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
						// i.e {user: "simple", id: "1234"}
						var
						data = match[__slice](1, match[__length]) 
							.reduce(function (data, val, i) {
								if (!data) {
									data = {};
								}
								// var name: value
								// i.e user: 'simple'
								data[vars[i]] = val;

								return data;
							}, __undefined);

						// callback is a function, exec
						if (is(callback, __Function)) {
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

				history.pushState(__undefined, __undefined, path);
			}

			var
			currentPath,
			interval;

			// normalize rootAddress formate
			// i.e '/url/' -> '/url'
			if (rootAddress[__substr](-1) === '/') {
				rootAddress = rootAddress[__substr](0, rootAddress[__length] - 1);
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
		if (is(routes, __Function)) {
			routes = routes();
		}

		if (mount) {
			each(routes, function (value, index) {
				var 
				renderInstance;

				if (value.id !== __renderSignature) {
					renderInstance = createRender(value, mount);
				}
				else {
					renderInstance = value;
				}

				routes[index] = function (data) {
					renderInstance(data, __null, __true);
				}
			});
		}

		return router(routes, rootAddress, onInitNavigateTo);
	}


	/**
	 * streams utility getter/setter
	 * @param {Any} store value
	 * @param {Function} processor
	 * @return {Function} a stream
	 */
	function createStream (value, mapper) {
		var
		store,
		chain = {
			then: __undefined,
			catch: __undefined
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
			if (args[__length]) {
				store = args[0];
				dispatch('then', store);

				return stream;
			}

			// the value we will return
			var
			ret;

			// special store
			if (mapper === __true) {
				ret = store()
			}
			else {
				// we have a mapper, run the store through it
				if (is(mapper, __Function)) {
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
			if (listeners[type][__length]) {
				each(listeners[type], function (listener) {
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
			listeners[to][__push](function (chain) {
				return listener(chain);
			});

			return !end ? stream : __undefined;
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
			stream.then(listener, error || __true);
		};

		// add a catch listener
		stream.catch = function (listener) {
			return stream.push('catch', listener);
		};

		// create a map
		stream.map = function (map) {
			// the dependency as in
			// var bar = a.map(fn) a will be dep
			var 
			dep = stream;

			return createStream(function (resolve) {
				resolve(function () {
					return map(dep());
				});
			}, __true);
		};

		// end/reset a stream
		stream.end = function () {
			chain.then      = __undefined;
			chain.catch     = __undefined;
			listeners.catch = [];
			listeners.then  = [];
		};

		// a way to distinguish between normal functions
		// and streams
		stream.id = __streamSignature;

		if (is(value, __Function)) {
			value(stream.resolve, stream.reject, stream);
		}
		else {
			stream(value);
		}

		return stream;
	}

	/**
	 * combine two or more streams
	 * @param  {Function} reducer
	 * @return {Array} dependecies
	 */
	createStream.combine = function (reducer, deps) {
		// if deps are not in a single array
		// create deps from arguments
		if (!is(deps, __Array)) {
			deps = toArray(arguments, 1);
		}
		// we later use .push so we don't want to mutate
		// the deps array that is passed as an arg 
		else {
			deps = toArray(deps);
		}

		// add an address for the prev store
		deps[__push](__undefined);

		// the previous store will always be the 
		// last item in the list of dependencies
		var
		prevStoreAddress = deps[__length] - 1;

		// creating a stream with the second argument as true
		// allows us to pass a function a the streams store
		// that will be run anytime we retreive it
		return createStream(function (resolve) {
			resolve(function () {
				// extract return value of reducer
				// return it and also set the value of the prevStore to it
				return deps[prevStoreAddress] = reducer.apply(__undefined, deps);
			});
		}, __true);
	};

	/**
	 * do something after all dependecies have resolve
	 * @param  {Array} dependecies
	 * @return {Function} a stream
	 */
	createStream.all = function (deps) {
		var
		resolved = [];

		// pushes a value to the resolved array
		// and compares if resolved length is equal to deps
		// this will tell us wheather all dependencies
		// have resolved
		function resolver (value, resolve) {
			resolved[__push](value);

			if (resolved[__length] === deps[__length]) {
				resolve(resolved)
			}
		}

		return createStream(function (resolve, reject) {
			// check all dependencies
			// if a dependecy is a stream attach a listerner
			// reject / resolve as nessessary.
			each(deps, function (value, index, arr) {
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
	 * @param  {Function} reducer
	 * @param  {Any}      accumulator 
	 * @param  {Function} stream     
	 * @return {Function} stream  
	 *
	 * @example
	 * 
	 * var foo = {Stream}
	 * var bar = stream.scan((sum, n) => { sum+n }, 0, foo) 
	 * foo(1)(1)(2)
	 * // bar => 4
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
	 * @param {Object} hyperscript - hyperscript object/render/component
	 * @param {Object} props - props to pass to component/render
	 * @param {Object} children - children to pass to component/render
	 * @return {String} html string ouput
	 *
	 * @example
	 * 
	 * createHTML(h('div', 'Hello World'));
	 * createHTML(component/render, {id:1234}, {item:'first'});
	 */
	function createHTML (arg, props, children) {
		// print node
		function toHTML (vnode, level) {
			// not a hyperscript object
			if (is(vnode, __String)) {
				return vnode;
			}

			// references
			var 
			// i.e 'div'
			type = vnode[__type],
			// i.e {id: 123, class: 'one two'}
			props = vnode[__props],
			// i.e [obj, obj]
			children = vnode[__children];

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
			props = __Object.keys(props)
							// remove any falsey value
							.filter(function (name) {
								return  props[name] !== __undefined &&
										props[name] !== __null &&
										props[name] !== __false
							})
							// 
							.map(function (name) {
								// <type name="value">
								var 
								value = props[name];

								// don't add events, keys or refs
								if (!is(value, __Function) && name !== 'key' && name !== 'ref') {
									// if the value is a falsey/truefy value
									// print just the name
									// i.e checkbox=true
									// will print <type checkbox>
									// otherwise <type value="">
									return value === __true ? name : name+'="'+value+'"';
								}
							})
							// create string
							[__join](' ')
							// convert all multi-spaces to a single space
							[__replace](/  +/g, ' ')
							.trim();

			// if props is falsey just return an empty string
			// otherwise return ' ' + ...props
			// this prevents us from having a case of
			// <divclass=a></div>, 
			// so we add a space before props giving us
			// <div class=a></div>
			return props ? (' ' + props) : '';
		}

		// print children
		function Children (children) {
			// empty
			if (children[__length] === 0) {
				return '';
			}

			return children.map(function (child) {
				return toHTML(child);
			})[__join]('');
		}

		// void elements that do not have a close </tag> 
		var
		element = {
			'area': __true, 'base':  __true, 'br':    __true, '!doctype': __true,
			'col':  __true, 'embed': __true, 'wbr':   __true, 'track':    __true,
			'hr':   __true, 'img':   __true, 'input': __true, 'keygen':   __true,
			'link': __true, 'meta':  __true, 'param': __true, 'source':   __true
		};

		var
		vnode;

		// either a render function or component function
		if (is(arg, __Function)) {
			// component functions expose their internals
			// when we pass a third param, on the other hand
			// render functions expose their hyperscript output
			// when we pass a third param
			vnode = arg(
				props, 
				children, 
				(arg.id === __componentSignature) ? __undefined : __componentSignature
			)
		}
		// probably hyperscript
		else {
			vnode = arg;
		}

		return toHTML(vnode);
	}


	/**
	 * creates a style element
	 * and inserts to document.head if document exists
	 * @param {Object} stylesheet
	 * @returns {String} compiled style string
	 */
	function createStyle () {
		// references
		var
		vendors      = ['webkit', 'moz', 'ms'],
		properties   = [
			'animation', 'transform', 'appearance', 'transition', 'box-shadow', 'linear-gradient'
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
			each(properties, function (prefix) {
				// if it is
				if (property.indexOf(prefix) > -1) {
					result = '';

					// add all the vendors
					each(vendors, function (vendor, index, arr) {
						result += '-' + vendor + '-' + property + ': ' + value + ';\n\t';
					});

					result += property;
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

	        each(stylesheet, function (value, property, obj) {
	            if (obj.hasOwnProperty(property)) {
	            	// handle @keyframes properties
	            	// allows us to specify either
	            	// %: ['color: blue'] or
					// 0%: {'color': 'black' }
					// for keyframe animations
            	   	if (
            	   		!is(value, __Array) &&
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
        	   				property += '%';
        	   			}

        	   			// we could easily do the below
        	   			// JSON.stringify().replace()...
        	   			// but since values are sometimes functions we want to extract the
        	   			// return value of the function to do that we do a 'for (...){}'
        	   			var 
        	   			newValue = '';
            	   		each(value, function (value, name) {
            	   			if (is(value, __Function)) {
            	   				value = value ();
            	   			}
            	   			newValue += name + ':' + value + ';';
            	   		});

            	   		value = '{' + newValue + '}';
        			}

	                if (is(value, __Object)) {
                		// keep going down the stack
            			iterate(value, stack + ' ' + property, tree);
	                } else {
	                	// extract functions
	                	if (is(value, __Function)) {
	                		value = value ();
	                	}

	                	// handle arrays
	                	if (is(value, __Array)) {
	                		value  = '{' + value[__join](':') + ';}';
	                	}

	                	var
	                	joint = ' { ';

	                	// check if the property is camelCase as in
	                	// marginTop !== margintop, but
	                	// margin-top === margin-top
	                	// if so convert to dash-case
	                	if (property !== property[__toLowerCase]()) {
	                		property = dash(property);
	                	}

	                	// add unites to numbers
	                	if (is(value, __Number)) {
	                		value += 'px';
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
	                		trace = trace[__replace](/%:/g, '%');
	                	}

	                	// add closing ;
	                	if (trace[__substr](-1) !== '}') {
	                		trace += ';';
	                	}

	                	var
	                	split  = trace[__split](joint);

	                	var
	                	// remove & and space in the beginning of a selector
	                	// so that h1&:hover becomes h1:hover
	                	// and ' h1' becomes 'h1'
	                	parent = split[0][__replace](/ &|^ /g, ''),
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
	    	return value[__replace](/([a-z])([A-Z])/g, '$1-$2')[__toLowerCase]();
	    }

	    // escapes #ids and .classes for css use
	    // so that #id becomes \#id or .class becomes \.class
	    function escape (value) {
	    	var
	    	firstLetter = value[__substr](0, 1);

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
			each(tree, function (body, selector) {
				// creates something like
				// 
				// .selector { 
				// 		... 
				// }
				// 
				body = selector + ' {\n' + body + '}\n';

				// check if the block has '@keyframes' in it
				// if so then this is a keyframe block
				if (body.indexOf(keyframesKey) > -1) {
					var
					keyframesLength = keyframesKey[__length],
					arr = [];

					// for when a keyframe is nested
					// i.e h1: {
					// 		'@keyframes:' {
					// 			...
					// 		}
					// }
					body = keyframesKey + body[__split](keyframesKey)[1];

					// this is the position of what comes after @keyframes
					// so the pos of where the word @keyframes starts 
					// plus its length
					var
					keyFramesBodyPos = body.indexOf(keyframesKey) + keyframesLength;

					// since keyframes are not properties of a selector
					// we could not prefix them in the prefix() function
					// so let us do it now
					each(vendorsPlusDefault, function (prefix) {
						// there is an empty vendor in the array so
						// we want to only add prefixes for the vendors
						// and not the empty that represents an un-prefixed version
						prefix = prefix ? '-' + prefix + '-' : prefix;

						// creates something like
						// @-prefix-keyframes ...
						var
						prefixed  = body[__substr](0,1) + prefix + body[__substr](1, keyFramesBodyPos);
						// escapes namespaces, as in id's #id and classes .class
						prefixed += escape(namespace) + body[__substr](keyFramesBodyPos+1);
						arr[__push](prefixed);
					});

					// extract string from our array of prefixed values
					body = arr[__join]('');
				}
				// handle sass like @at-rule
				else if (body.indexOf(atRootKey) > -1) {
					body = body[__split](atRootKey)[1][__replace](' ', '');
				}
				else {
					// handle ','' as in
					// h1, h2 will turn into something like
					// #namespace h1, #namespace h2 {}
					if (selector.indexOf(',') > -1) {
						// first we split it
						var
						selectorNamespaced = selector[__split](',');

						// then we add the namespaces
						each(selectorNamespaced, function (value, index) {
							var 
							space = index > 0 ? '' : ' ';
							selectorNamespaced[index] = namespace + space + value;
						});

						// put it back together
						selectorNamespaced = selectorNamespaced[__join](', ');

						// then replace the selector in selector block
						// with the namespaced version
						body = body[__replace](new __RegExp(selector), selectorNamespaced);
					}
					// default
					else {
						// ensure that '#namespace' + ':hover' is 
						// joined as 'namespace:hover'
						// and that '#namespace' + 'h1' is
						// joined as '#namespace h1'
						if (body[__substr](0,1) === ':') {
							body = namespace + body;
						}
						else {
							body = namespace + ' ' + body;
						}
					}
				}

				// add this style block to the string that contains all our styles
				style +=  body;
			});
			
			var 
			name = namespace ? ' data-id=' + namespace : '';

			return '<style'+name+'>\n' + style + '</style>';
		}

		return function (stylesheet, Namespace, onlyOutputString) {
			namespace = Namespace || '';

			// extract returned value of stylesheet is a function
			if (is(stylesheet, __Function)) {
				stylesheet = stylesheet();
			}

			var
			style = create(stylesheet);

			// for enviroments that do not have a document
			// or if we pass the html arg
			// this will not try to insert it to the dom
			// rather we will just return a string of the style element
			// below
			if (__document && __document.head && !onlyOutputString) {
				__document.head.insertAdjacentHTML('beforeend', style);
			}

			return style;
		}
	}


	/**
	 * curry / create / return a function with set arguments
	 * @param  {Function} fn  function to curry
	 * @param  {Any}      arg arguments to pass to function
	 * @param  {Boolean}      auto preventDefault events
	 * @return {Function}     curried function
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
			if (!args || !args[__length]) {
				return fn.call(this, e);
			}

			return fn.apply(this, args);
		}
	}


	/**
	 * create element factory
	 * @param  {Array|String} elements - list of elements
	 * @param  {Boolean}      expose   - expose to global namespace?
	 * @return {Function}
	 */
	function createFactory (elements, expose) {
		function factory (element) {
			return function (props, children) {
				return h.call(__null, element, props, toArray(arguments, 1));
			}
		}

		// convert arguments to array of elements
		if (!is(elements, __Array)) {
			elements = toArray(arguments);
		}

		var 
		length = elements[__length];

		// if there is only one element return it
		if (length === 1) {
			var 
			elementFactory = factory(elements[0]);

			if (elements[length-1] === __true) {
				__window[elements[0]] = elementFactory;
			}
			else {
				return elementFactory;
			}
		}
		// multiple elements
		else {
			var obj = elements[length-1] === __true ? __window : {};

			each(elements, function (element) {
				obj[element] = factory(element);
			});

			return obj;
		}
	}


	/* --------------------------------------------------------------
	 * 
	 * exports
	 * 
	 * -------------------------------------------------------------- */


	exports.h = h,
	exports.dio = {
		request: request(),
		curry: curry,

		animateWith: animateWith(),
		createStyle: createStyle(),
		createStream: createStream,
		createRouter: createRouter,
		createHTML: createHTML,

		createElement: h,

		createStore: createStore,
		createFactory: createFactory,

		createRender: createRender,
		render: createRender,

		createComponent: createComponent,
		createClass: createComponent,
		Component: createComponent,
		propTypes: createPropTypes()
	};
}));
