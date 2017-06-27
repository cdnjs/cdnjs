/*
 *  ___ __ __
 * (   (  /  \
 *  ) ) )( () )
 * (___(__\__/
 *
 * a library for building user interfaces
 */
/* eslint-disable */
(function (factory) {
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory(global, typeof __webpack_require__ === 'undefined' ? require : null);
	} else if (typeof define === 'function' && define.amd) {
		define(factory(window, null));
	} else {
		window.dio = factory(window, null);
	}
}(function (self, __require__) {

	'use strict';

	/**
	 * ## Constants
	 */
	var browser = self.window === self;
	var server = browser === false;
	var body = null;
	
	var w3 = 'http://www.w3.org/';
	var svg = w3 + '2000/svg';
	var xlink = w3 + '1999/xlink';
	var math = w3 + '1998/Math/MathML';
	
	var noop = function () {};
	var Promise = self.Promise || noop;
	var requestAnimationFrame = self.requestAnimationFrame || setTimeout;
	var requestIdleCallback = self.requestIdleCallback || setTimeout;
	
	var READY = 0;
	var PROCESSING = 1;
	var PROCESSED = 2;
	var PENDING = 3;
	
	var STRING = 0;
	var FUNCTION = 1;
	var CLASS = 2;
	var NOOP = 3;
	var FORCE = 4;
	
	var EMPTY = 0;
	var TEXT = 1;
	var ELEMENT = 2;
	var COMPOSITE = 3;
	var FRAGMENT = 4;
	var ERROR = 5;
	var PORTAL = 6;
	var CUSTOM = 7;
	
	var CHILDREN = [];
	var ATTRS = {};
	var PROPS = {children: CHILDREN};
	var SHARED = new Tree(EMPTY);
	
	/**
	 * ## Element Shape
	 *
	 * tag: node tag {String}
	 * type: node type {Function|Class|String}
	 * props: node properties {Object?}
	 * attrs: node attributes {Object?}
	 * children: node children {Array<Tree>}
	 * key: node key {Any}
	 * flag: node flag {Number}
	 * xmlns: node xmlns namespace {String?}
	 * owner: node component {Component?}
	 * node: node DOM reference {Node?}
	 * group: node ground {Number}
	 * async: node work state {Number} 0: ready, 1:processing, 2:processed, 3: pending
	 * yield: coroutine {Function?}
	 * host: host component
	 *
	 * ## Component Shape
	 *
	 * this: current tree {Tree?}
	 * async: component async, tracks async lifecycle methods flag {Number}
	 *
	 * _props: previous props {Object}
	 * _state: previous state {Object}
	 * _pending: pending state {Object}
	 *
	 * props: current props {Object}
	 * state: current state {Object}
	 * refs: refs {Object?}
	 * setState: method {Function}
	 * forceUpdate: method {Function}
	 */
	
	/**
	 * Component
	 *
	 * @param {Object?} props
	 */
	function Component (props) {
		var state = this.state;
	
		this.refs = null;
		this.this = null;
	
		// props
		if (this.props === void 0) {
			this.props = (props !== void 0 && props !== null) ? props : PROPS;
		}
	
		// state
		if (state === void 0) {
			state = this.state = {};
		}
	
		this._state = state;
	}
	
	/**
	 * Prototype
	 *
	 * @type {Object}
	 */
	var ComponentPrototype = {
		setState: {value: setState},
		forceUpdate: {value: forceUpdate},
		UUID: {value: 2}
	};
	
	Component.prototype = Object.create(null, ComponentPrototype);
	ComponentPrototype.UUID.value = 1;
	
	/**
	 * Extend
	 *
	 * @param {Function} type
	 * @param {Object} prototype
	 */
	function extendClass (type, prototype) {
		if (prototype.constructor !== type) {
			Object.defineProperty(prototype, 'constructor', {value: type});
		}
	
		Object.defineProperties(prototype, ComponentPrototype);
	}
	
	/**
	 * setState
	 *
	 * @param {Object} state
	 * @param {Function?} callback
	 */
	function setState (state, callback) {
		var owner = this;
		var newState = state !== void 0 && state !== null ? state : {};
		var oldState = owner.state;
		var constructor = newState.constructor;
	
		if (constructor === Function) {
			newState = callbackBoundary(SHARED, owner, newState, oldState, 0);
	
			if (newState === void 0 || newState === null) {
				return;
			}
	
			constructor = newState.constructor;
		}
	
		switch (constructor) {
			case Promise: {
				newState.then(function (value) {
					owner.setState(value, callback);
				});
				break;
			}
			case Object: {
				var older = owner.this;
	
				if (older === null) {
					return;
				}
	
				if (older.async !== READY) {
					updateState(owner._state, newState);
					return
				} else {
					owner._state = newState;
				}
	
				commitUpdate(callback, this, NOOP)
			}
		}
	}
	
	/**
	 * forceUpdate
	 *
	 * @param {Function?} callback
	 */
	function forceUpdate (callback) {
		commitUpdate(callback, this, FORCE);
	}
	
	/**
	 * commitUpdate
	 * 
	 * @param {Function?} callback
	 * @param {Component} owner
	 * @param {Number} group
	 */
	function commitUpdate (callback, owner, group) {
		var older = owner.this;
	
		if (older === null || older.node === null) {
			return;
		} else if (older.async !== READY) {
			// process this update in the next frame
			return void requestAnimationFrame(function () {
				owner.forceUpdate(callback);
			});
		} else {
			patch(older, older, group);
		}
	
		if (callback !== void 0 && callback !== null && callback.constructor === Function) {
			if (older.async === READY) {
				callbackBoundary(older, owner, callback, owner.state, 1);
			} else {
				requestAnimationFrame(function () {
					callbackBoundary(older, owner, callback, owner.state, 1);
				});
			}
		}
	}
	
	/**
	 * updateState
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
	 * initialState
	 *
	 * @param {Tree} older
	 * @param {Object} state
	 */
	function getInitialState (older, state) {
		if (state !== void 0 && state !== null) {
			switch (state.constructor) {
				case Promise: {
					older.async = PENDING;
	
					if (browser === true) {
						state.then(function (value) {
							older.async = READY;
							older.owner.setState(value);
						});
						break;
					}
				}
				case Object: {
					older.owner.state = state;
					break;
				}
			}
		}
	}
	
	/**
	 * initialStatic
	 *
	 * @param  {Function} owner
	 * @param  {Function} func
	 * @param  {String} type
	 * @param  {Object} props
	 * @return {Object?}
	 */
	function getInitialStatic (owner, func, type, props) {
		if (typeof func !== 'function') {
			return func;
		}
	
		var value = callbackBoundary(SHARED, owner, func, props, 0);
	
		if (value !== void 0 && value !== null) {
			return Object.defineProperty(owner, type, {value: value});
		}
	}
	
	/**
	 * PropTypes
	 *
	 * @param {Component} owner
	 * @param {Function} type
	 * @param {Object} props
	 */
	function propTypes (owner, type, props) {
		var display = type.name;
		var types = type.propTypes;
	
		try {
			for (var name in types) {
				var valid = types[name];
				var result = valid(props, name, display);
	
				if (result) {
					console.error(result);
				}
			}
		} catch (err) {
			errorBoundary(err, SHARED, owner, 2, valid);
		}
	}
	
	/**
	 * Element
	 *
	 * @param  {String|Function} _type
	 * @param  {...} _props
	 * @return {Tree}
	 */
	function element (_type, _props) {
		var type = _type;
		var props = _props !== void 0 ? _props : null;
		var attrs = props;
		var length = arguments.length;
		var size = 0;
		var offset = 0;
		var i = 2;
		var group = 0;
		var newer = new Tree(ELEMENT);
	
		switch (props) {
			case null: {
				props = PROPS;
				attrs = ATTRS;
				offset++;
				break;
			}
			default: {
				switch (props.constructor) {
					case Object: {
						if (props.key !== void 0) {
							newer.key = props.key;
						}
						if (props.xmlns !== void 0) {
							newer.xmlns = props.xmlns;
						}
	
						offset++;
						newer.props = props;
	
						break;
					}
					case Array: {
						size = props.length;
					}
					default: {
						props = PROPS;
						attrs = ATTRS;
						i = 1;
					}
				}
			}
		}
	
		switch (type.constructor) {
			// node
			case String: {
				newer.tag = type;
				newer.attrs = attrs;
	
				break;
			}
			// component
			case Function: {
				var proto = type.prototype;
	
				if (proto !== void 0 && proto.render !== void 0) {
					// class component
					group = CLASS;
				} else if (type.ELEMENT_NODE !== 1) {
					// function component
					group = FUNCTION;
				} else {
					// custom element
					group = STRING;
					newer.flag = CUSTOM;
					newer.tag = type;
					newer.attrs = attrs;
				}
	
				newer.group = group;
				break;
			}
			default: {
				if (type.ELEMENT_NODE === 1) {
					// portal
					newer.flag = PORTAL;
					newer.tag = type;
					newer.attrs = attrs;
				}	else if (type.flag !== void 0) {
					// clone
					if (type.props !== PROPS) {
						if (props === PROPS) {
							props = newer.props = {};
							attrs = newer.attrs = {};
						}
	
						merge(type.props, props);
						merge(type.attrs, attrs);
					}
	
					group = newer.group = type.group;
					type = type.type;
	
					if (group === STRING) {
						newer.tag = type;
					} else {
						props.children = CHILDREN;
					}
				}
			}
		}
	
		newer.type = type;
	
		if (length - offset > 1) {
			var children = newer.children = new Array(size);
			var index = 0;
	
			if (group === 0) {
				for (; i < length; i++) {
					index = push(newer, index, arguments[i]);
				}
			} else {
				if (props === PROPS) {
					props = newer.props = {};
				}
	
				for (; i < length; i++) {
					index = pull(newer, index, arguments[i]);
				}
	
				props.children = children;
				newer.children = CHILDREN;
			}
		}
	
		return newer;
	}
	
	/**
	 * Push Children
	 *
	 * @param  {Tree} newer
	 * @param  {Number} index
	 * @param  {Any} value
	 * @return {Number}
	 */
	function push (newer, index, value) {
		var children = newer.children;
		var child;
	
		if (value === null || value === void 0) {
			child = text(' ');
		} else if (value.group !== void 0) {
			if (newer.keyed === 0 && value.key !== null) {
				newer.keyed = 1;
			}
	
			child = value;
		} else {
			switch (value.constructor) {
				case String: {
					if (value.length === 0) {
						value = ' ';
					}
				}
				case Number:{
					child = new Tree(TEXT);
					child.type = child.tag = '#text';
					child.children = value;
					break;
				}
				case Array: {
					for (var j = 0, i = index, length = value.length; j < length; j++) {
						i = push(newer, i, value[j]);
					}
					return i;
				}
				case Function: {
					child = element(value);
					break;
				}
				case Object: {
					child = stringify(value);
					break;
				}
				case Date: {
					child = text(value.toString());
					break;
				}
				default: {
					child = value.ELEMENT_NODE === 1 ? element(value) : text(' ');
					break;
				}
			}
		}
	
		children[index] = child;
	
		return index + 1;
	}
	
	/**
	 * Pull Children
	 *
	 * @param  {Tree} newer
	 * @param  {Number} index
	 * @param  {Any} value
	 * @return {Number}
	 */
	function pull (newer, index, value) {
		var children = newer.children;
	
		if (value !== null && value !== void 0 && value.constructor === Array) {
			for (var j = 0, i = index, length = value.length; j < length; j++) {
				i = pull(newer, i, value[j]);
			}
	
			return i;
		}
	
		children[index] = value;
	
		return index + 1;
	}
	
	/**
	 * Text
	 *
	 * @param  {String|Number|Boolean} value
	 * @param  {Tree}
	 * @return {Tree}
	 */
	function text (value) {
		var newer = new Tree(TEXT);
	
		newer.type = newer.tag = '#text';
		newer.children = value;
	
		return newer;
	}
	
	/**
	 * Fragment
	 *
	 * @param  {Array<Tree>|Tree|Function} children
	 * @return {Tree}
	 */
	function fragment (children) {
		var newer = new Tree(FRAGMENT);
	
		newer.tag = newer.type = 'div';
		newer.children = children;
	
		for (var i = 0, index = 0, length = children.length; i < length; i++) {
			index = push(newer, index, children[i]);
		}
	
		return newer;
	}
	
	/**
	 * Compose
	 *
	 * @param  {Tree} child
	 * @return {Tree}
	 */
	function compose (child) {
		var newer = new Tree(COMPOSITE);
	
		newer.children = [child];
	
		return newer;
	}
	
	/**
	 * Stringify
	 *
	 * @param {Object} value
	 * @return {Tree}
	 */
	function stringify (value) {
		try {
			return element('pre', null, JSON.stringify(value, null, 2));
		} catch (err) {
			return text(' ');
		}
	}
	
	/**
	 * Assign
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 * @param {Boolean} deep
	 */
	function assign (older, newer, deep) {
		older.flag = newer.flag;
		older.tag = newer.tag;
		older.ref = newer.ref;
		older.node = newer.node;
		older.attrs = newer.attrs;
		older.xmlns = newer.xmlns;
		older.async = newer.async;
		older.keyed = newer.keyed;
		older.children = newer.children;
	
		if (deep === true) {
			older.parent = newer.parent;
			older.props = newer.props;
			older.owner = newer.owner;
			older.yield = newer.yield;
			older.type = newer.type;
			older.host = newer.host;
			older.key = newer.key;
	
			if ((older.group = newer.group) === CLASS) {
				older.owner.this = older;
			}
		}
	}
	
	/**
	 * Clone
	 *
	 * @param  {Tree} older
	 * @param  {Tree} newer
	 * @param  {Boolean} deep
	 * @return {Tree}
	 */
	function clone (older, newer, deep) {
		assign(older, newer, deep);
		return older;
	}
	
	/**
	 * Tree
	 *
	 * @param {Number} flag
	 */
	function Tree (flag) {
		this.flag = flag;
		this.tag = null;
		this.key = null;
		this.ref = null;
		this.type = null;
		this.node = null;
		this.host = null;
		this.group = STRING;
		this.async = READY;
		this.props = PROPS;
		this.attrs = ATTRS;
		this.xmlns = null;
		this.owner = null;
		this.yield = null;
		this.keyed = 0;
		this.parent = null;
		this.children = CHILDREN;
	}
	
	/**
	 * Prototype
	 *
	 * @type {Object}
	 */
	Tree.prototype = element.prototype = Object.create(null);
	
	/**
	 * Data Boundary
	 *
	 * @param  {Tree} older
	 * @param  {Component} owner
	 * @param  {Number} type
	 * @param  {Object} props
	 * @return {Object?}
	 */
	function dataBoundary (older, owner, type, props) {
		try {
			switch (type) {
				case 0: returnBoundary(older, owner.componentWillReceiveProps(props), owner, null, true); break;
				case 1: return owner.getInitialState(props);
			}
		} catch (err) {
			errorBoundary(err, older, owner, 0, type);
		}
	}
	
	/**
	 * Update Boundary
	 *
	 * @param  {Tree} older
	 * @param  {Component} owner
	 * @param  {Number} type
	 * @param  {Object} props
	 * @param  {Object} state
	 * @return {Boolean?}
	 */
	function updateBoundary (older, owner, type, props, state) {
		try {
			switch (type) {
				case 0: return owner.shouldComponentUpdate(props, state);
				case 1: returnBoundary(older, owner.componentWillUpdate(props, state), owner, null, true); break;
				case 2: returnBoundary(older, owner.componentDidUpdate(props, state), owner, null, false); break;
			}
		} catch (err) {
			errorBoundary(err, older, owner, 1, type);
		}
	}
	
	/**
	 * Render Boundary
	 *
	 * @param  {Tree} older
	 * @param  {Number} group
	 * @return {Tree}
	 */
	function renderBoundary (older, group) {
		try {
			if (older.yield !== null) {
				return older.yield();
			}
	
			switch (group) {
				case FUNCTION: return older.type(older.props);
				default: return older.owner.render(older.owner.props, older.owner.state);
			}
		} catch (err) {
			return errorBoundary(err, older, group === CLASS ? older.owner : older.type, 3, group);
		}
	}
	
	/**
	 * Mount Boundary
	 *
	 * @param {Tree} older
	 * @param {Component} owner
	 * @param {Node} node
	 * @param {Number} type
	 */
	function mountBoundary (older, owner, node, type) {
		try {
			switch (type) {
				case 0: returnBoundary(older, owner.componentWillMount(node), owner, null, false); break;
				case 1: returnBoundary(older, owner.componentDidMount(node), owner, null, true); break;
				case 2: return owner.componentWillUnmount(node);
			}
		} catch (err) {
			errorBoundary(err, older, owner, 4, type);
		}
	}
	
	/**
	 * Callback Boundary
	 *
	 * @param {Tree} older
	 * @param {Function} callback
	 * @param {Component} owner
	 * @param {Object|Node} data
	 * @param {Number} type
	 */
	function callbackBoundary (older, owner, callback, data, type) {
		try {
			if (type === 0) {
				return callback.call(owner, data);
			} else {
				returnBoundary(older, callback.call(owner, data), owner, null, false);
			}
		} catch (err) {
			errorBoundary(err, older, owner, 2, callback);
		}
	}
	
	/**
	 * Events Boundary
	 *
	 * @param {Event} e
	 */
	function eventBoundary (e) {
		var handlers = this.that;
		var host = handlers.host;
		var func = handlers[e.type];
	
		if (func !== null && func !== void 0) {
			if (host !== void 0) {
				try {
					var owner = host.owner;
					var result = func.call(owner, e);
	
					if (result !== void 0) {
						returnBoundary(host, result, owner, e, true);
					}
				} catch (err) {
					errorBoundary(err, host, owner, 5, func);
				}
			} else {
				func.call(this, e);
			}
		}
	}
	
	/**
	 * Return Boundary
	 *
	 * @param {Tree} older
	 * @param {(Object|Promise)?} state
	 * @param {Component} owner
	 * @param {Event?} e
	 * @param {Boolean} sync
	 */
	function returnBoundary (older, state, owner, e, sync) {
		if (state === void 0 || state === null || older.group !== CLASS) {
			return;
		}
	
		if (sync === true) {
			owner.setState(state);
			return;
		}
	
		requestIdleCallback(function () {
			owner.setState(state);
		});
	}
	
	/**
	 * Error Boundary
	 *
	 * @param  {Error|String} message
	 * @param  {Tree} older
	 * @param  {Component} owner
	 * @param  {Number} type
	 * @param  {Number|Function} from
	 * @return {Tree?}
	 */
	function errorBoundary (message, older, owner, type, from) {
		var unknown = '#unknown';
		var component = unknown;
		var location = unknown;
		var newer;
	
		try {
			if (typeof from === 'function') {
				location = from.name;
			} else {
				switch (type) {
					case 0: {
						switch (from) {
							case 0: location = 'componentWillReceiveProps';
							case 1: location = 'getInitialState';
						}
						break;
					}
					case 1: {
						switch (from) {
							case 0: location = 'shouldComponentUpdate';
							case 1: location = 'componentWillUpdate';
							case 2: location = 'componentDidUpdate';
						}
						break;
					}
					case 3: {
						location = 'render';
						break;
					}
					case 4: {
						switch (from) {
							case 0: location = 'componentWillMount';
							case 1: location = 'componentDidMount';
							case 2: location = 'componentWillUnmount';
						}
						break;
					}
					case 5: {
						location = 'event';
						break;
					}
				}
			}
	
			if (owner !== null) {
				if (owner.componentDidThrow !== void 0) {
					newer = owner.componentDidThrow({location: location, message: message});
				}
	
				component = typeof owner === 'function' ? owner.name : owner.constructor.name;
			}
		} catch (err) {
			message = err;
			location = 'componentDidThrow';
		}
	
		console.error(
			(message instanceof Error ? message.stack : message) +
			'\n\n  ^^ Error caught in '+'"'+component+'"'+' from "'+location+'" \n'
		);
	
		if (type === 3) {
			if (newer === void 0 && older !== SHARED && older.node !== null) {
				// last non-error state
				return older;
			} else {
				// authored/default error state
				return shape(newer, older, true);
			}
		}
	}
	
	/**
	 * Whitelist
	 *
	 * @param  {String} name
	 * @return {Number}
	 */
	function whitelist (name) {
		switch (name) {
			case 'class':
			case 'className': return 1;
	
			case 'width':
			case 'height': return 3;
	
			case 'xlink:href': return 4;
	
			case 'defaultValue': return 5;
	
			case 'id':
			case 'selected':
			case 'hidden':
			case 'checked':
			case 'value': return 6;
	
			case 'innerHTML': return 10;
	
			case 'style': return 20;
	
			case 'ref': return 30;
			case 'key': case 'children': return 31;
	
			default: return name.charCodeAt(0) === 111 && name.charCodeAt(1) === 110 ? 21 : 0;
		}
	}
	
	/**
	 * Attribute [Mount]
	 *
	 * @param {Tree} newer
	 * @param {String?} xmlns
	 * @param {Boolean} event
	 */
	function attribute (newer, xmlns, event) {
		var attrs = newer.attrs;
		var node = newer.node;
	
		for (var name in attrs) {
			var type = event === false ? whitelist(name) : 21;
	
			if (type < 31) {
				var value = attrs[name];
	
				if (type === 30) {
					refs(newer, value, 2);
				} else if (type < 20) {
					if (value !== void 0 && value !== null) {
						setAttribute(type, name, value, xmlns, true, node);
					}
				} else if (type > 20) {
					setEvent(newer, name, value, 1);
				} else {
					setStyle(newer, newer, 0);
				}
			}
		}
	}
	
	/**
	 * Attributes [Reconcile]
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 */
	function attributes (older, newer) {
		var node = older.node;
		var previous = older.attrs;
		var current = newer.attrs;
	
		if (previous === current && current === ATTRS) {
			return;
		}
	
		var xmlns = older.xmlns;
		var type;
		var next;
		var prev;
	
		// old attributes
		for (var name in previous) {
			type = whitelist(name);
	
			if (type < 31) {
				next = current[name];
	
				if (next === null || next === void 0) {
					if (type < 20) {
						setAttribute(type, name, next, xmlns, false, node);
					} else if (type > 20) {
						setEvent(older, name, next, 0);
					}
				} else if (type === 30 && next !== (prev = previous[name])) {
					refs(older, prev, 0);
				}
			}
		}
	
		// new attributes
		for (var name in current) {
			type = whitelist(name);
	
			if (type < 31) {
				next = current[name];
	
				if (type === 30) {
					refs(older, next, 2);
				} else {
					prev = previous[name];
	
					if (next !== prev && next !== null && next !== void 0) {
						if (type < 20) {
							setAttribute(type, name, next, xmlns, true, node);
						} else if (type > 20) {
							setEvent(older, name, next, 2);
						} else {
							setStyle(older, newer, 1);
						}
					}
				}
			}
		}
	
		older.attrs = current;
	}
	
	/**
	 * Refs
	 *
	 * @param  {Tree} older
	 * @param  {Function|String} value
	 * @param  {Number} type
	 */
	function refs (older, value, type) {
		var host = older.host;
		var stateful = false;
	
		if (host !== null) {
			var owner = host.owner;
	
			if (owner !== null && host.group === CLASS) {
				stateful = true;
			}
		}
	
		if (stateful === true && owner.refs === null) {
			owner.refs = {};
		}
	
		if ((older.ref = value) !== void 0 && value !== null) {
			var node = type > 0 ? older.node : null;
	
			switch (value.constructor) {
				case Function: {
					callbackBoundary(older, owner, value, node, 2);
					break;
				}
				case String: {
					if (stateful === true) {
						owner.refs[value] = node;
					}
					break;
				}
			}
		}
	}
	
	/**
	 * Merge
	 *
	 * @param {Object} source
	 * @param {Object} props
	 */
	function merge (source, props) {
		for (var name in source) {
			if (props[name] === void 0) {
				props[name] = source[name];
			}
		}
	}
	
	/**
	 * Create
	 *
	 * @param {Tree} newer
	 * @param {Tree} parent
	 * @param {Tree} sibling
	 * @param {Number} _action
	 * @param {Tree?} _host
	 * @param {String?} _xmlns
	 */
	function create (newer, parent, sibling, _action, _host, _xmlns) {
		var host = _host;
		var xmlns = _xmlns;
		var action = _action;
		var group = newer.group;
		var flag = newer.flag;
		var type = 2;
		var skip = false;
		var owner;
		var node;
		var temp;
	
	 	// cache host
	 	if (host !== SHARED) {
			newer.host = host;
	 	}
	
	 	// component
	 	if (group !== STRING) {
	 		if (group === CLASS) {
	 			host = newer;
	 		}
	
	 		extract(newer, true);
	
	 		flag = newer.flag;
	 		owner = newer.owner;
	 	}
	
	 	switch (flag) {
	 		// text
	 		case TEXT: {
	 			node = newer.node = createTextNode(newer.children);
	 			type = 1;
	 			break;
	 		}
	 		// composite
	 		case COMPOSITE: {
	 			create(temp = newer.children[0], parent, sibling, action, newer, xmlns);
	 			node = newer.node = temp.node;
				type = 0;
	 			break;
	 		} 		
	 		default: {
	 			var children = newer.children;
				var length = children.length;
	
				switch (flag) {
					case PORTAL: {
						node = newer.tag;
						action = 0;
						break;
					}
					case CUSTOM: {
						node = createCustomElement(newer, host)
						break;
					}
					default: {
		 				var tag = newer.tag;
	
		 				// cache namespace
		 				if (newer.xmlns !== null) {
		 					xmlns = newer.xmlns;
		 				}
	
			 			// namespace(implicit) svg/math roots
			 			switch (tag) {
			 				case 'svg': xmlns = svg; break;
			 				case 'math': xmlns = math; break;
			 				case '!doctype': tag = 'html'; break;
			 			}
	
			 			node = createElement(tag, newer, host, xmlns);
					}
				}
	
				// error
				if (newer.flag === ERROR) {
					create(node, parent, sibling, action, host, xmlns);
					assign(newer, node, newer.group === 0);
					return;
				}
	
				newer.node = node;
	
	 			if (length > 0) {
	 				for (var i = 0; i < length; i++) {
	 					var child = children[i];
	
	 					// hoisted
	 					if (child.node !== null) {
	 						child = assign(children[i] = new Tree(child.flag), child, true);
	 					}
	
	 					create(child, newer, sibling, 1, host, xmlns);
	 				}
	 			}
	 		}
	 	}
	
		if (group !== STRING && owner.componentWillMount !== void 0) {
			mountBoundary(newer, owner, node, 0);
		}
	
		newer.parent = parent;
	
		if (type !== 0) {
			switch (action) {
				case 1: appendChild(newer, parent); break;
				case 2: insertBefore(newer, sibling, parent); break;
				case 3: skip = remove(sibling, newer, parent); break;
			}
	
			if (type !== 1) {
				attribute(newer, xmlns, false);
			}
		}
	
		if (group !== STRING && skip !== true && owner.componentDidMount !== void 0) {
			mountBoundary(newer, owner, node, 1);
		}
	}
	
	/**
	 * Extract
	 *
	 * @param {Tree} older
	 * @param {Boolean} abstract
	 * @return {Tree}
	 */
	function extract (older, abstract) {
		var type = older.type;
		var props = older.props;
		var children = older.children;
		var group = older.group;
		var length = children.length;
		var defaults = type.defaultProps;
		var types = type.propTypes;
		var skip = false;
		var newer;
		var result;
	
		if (props === PROPS) {
			props = {};
		}
	
		if (length !== 0) {
			props.children = children;
		}
	
		if (defaults !== void 0) {
			merge(getInitialStatic(type, defaults, 'defaultProps', props), props);
		}
	
		if (types !== void 0) {
			getInitialStatic(type, types, 'propTypes', props);
		}
	
		if (group === CLASS) {
			var proto = type.prototype;
			var UUID = proto.UUID;
			var owner;
	
			if (UUID === 2) {
				if ((owner = new type(props)).props === PROPS) {
					owner.props = props
				}
			} else {
				if (UUID !== 1) {
					extendClass(type, proto);
				}
	
				owner = new type(props);
				Component.call(owner, props);
			}
	
			older.owner = owner;
	
			if (owner.getInitialState !== void 0) {
				getInitialState(older, dataBoundary(SHARED, owner, 1, owner.props));
	
				if (older.async === PENDING) {
					if (server === true) {
						return older;
					} else {
						skip = true;
						newer = text(' ');
					}
				}
			}
	
			if (skip !== true) {
				older.async = PROCESSING;
				newer = renderBoundary(older, group);
				older.async = READY;
			}
	
			owner.this = older;
		} else {
			older.owner = type;
			newer = renderBoundary(older, group);
		}
	
		result = shape(newer, older, abstract);
	
		older.tag = result.tag;
		older.flag = result.flag;
		older.attrs = result.attrs;
		older.xmlns = result.xmlns;
		older.children = result.children;
	
		return result;
	}
	
	/**
	 * Shape
	 *
	 * @param {Any} value
	 * @param {Tree?} older
	 * @param {Boolean} abstract
	 * @return {Tree}
	 */
	function shape (value, older, abstract) {
		var newer = (value !== null && value !== void 0) ? value : text(' ');
	
		if (newer.group === void 0) {
			switch (newer.constructor) {
				case Function: {
					newer = element(newer);
					break;
				}
				case String: {
					if (newer.length === 0) {
						newer = ' ';
					}
				}
				case Number: {
					return text(newer);
				}
				case Array: {
					return fragment(newer);
				}
				case Date: {
					return text(newer.toString());
				}
				case Object: {
					return stringify(newer);
				}
				case Promise: {
					if (older !== null && older.flag !== EMPTY) {
						return resolve(older, newer);
					}
				}
				case Boolean: {
					return text(' ');
				}
				default: {
					if (older === null || newer.next === void 0) {
						return newer.ELEMENT_NODE === 1 ? element(newer) : text(' ');
					}
	
					newer = coroutine(older, newer);
				}
			}
		}
	
		if (abstract === true && newer.group !== STRING) {
			return compose(newer);
		} else {
			return newer;
		}
	}
	
	/**
	 * Resolve
	 *
	 * @param {Tree} older
	 * @param {Promise} pending
	 */
	function resolve (older, pending) {
		older.async = PENDING;
	
		pending.then(function (value) {
			if (older.node === null) {
				return;
			}
	
			older.async = READY;
	
			var newer = shape(value, older, true);
	
			if (older.tag !== newer.tag) {
				exchange(older, newer, false);
			} else {
				patch(older, newer, 0);
			}
		});
	
		return older.node !== null ? older : text(' ');
	}
	
	/**
	 * Coroutine
	 *
	 * @param {Tree} older
	 * @param {Generator} generator
	 * @return {Tree}
	 */
	function coroutine (older, generator) {
		var previous;
		var current;
	
		older.yield = function () {
			var supply = generator.next(previous);
			var next = supply.value;
	
			if (supply.done === true) {
				current = shape(next !== void 0 && next !== null ? next : previous, older, true);
			} else {
				current = shape(next, older, true);
			}
	
			return previous = current;
		};
	
		return shape(renderBoundary(older, older.group), older, true);
	}
	
	/**
	 * Fill
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 * @param {Number} length
	 */
	function fill (older, newer, length) {
		var children = newer.children;
		var host = older.host;
	
		for (var i = 0, child; i < length; i++) {
			create(child = children[i], older, SHARED, 1, host, null);
		}
	
		older.children = children;
	}
	
	/**
	 * Animate
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 * @param {tree} parent
	 * @param {Promise} pending
	 * @param {Node} node
	 */
	function animate (older, newer, parent, pending) {
		pending.then(function () {
			if (parent.node === null || older.node === null) {
				return;
			}
	
			if (newer === SHARED) {
				removeChild(older, parent);
			} else if (newer.node !== null) {
				replaceChild(older, newer, parent);
	
				if (newer.group !== STRING && newer.owner.componentDidMount !== void 0) {
					mountBoundary(newer, newer.owner, newer.node, 1);
				}
			}
	
			unmount(older);
			detach(older);
		});
	}
	
	/**
	 * Remove
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 * @param {Tree} parent
	 * @return {Tree}
	 */
	function remove (older, newer, parent) {
		if (older.group !== STRING && older.owner.componentWillUnmount !== void 0) {
			var pending = mountBoundary(older, older.owner, older.node, 2);
	
			if (pending !== void 0 && pending !== null && pending.constructor === Promise) {
				animate(older, newer, parent, pending, older.node);
	
				return true;
			}
		}
	
		unmount(older);
	
		if (newer === SHARED) {
			removeChild(older, parent);
			detach(older);
		} else {
			replaceChild(older, newer, parent);
		}
	
		return false;
	}
	
	/**
	 * Unmount
	 *
	 * @param {Tree} older
	 */
	function unmount (older) {
		var children = older.children;
		var length = children.length;
		var flag = older.flag;
	
		if (flag !== TEXT) {
			if (length !== 0) {
				for (var i = 0; i < length; i++) {
					var child = children[i];
	
					if (child.group !== STRING && child.owner.componentWillUnmount !== void 0) {
						mountBoundary(child, child.owner, child.node, 2);
					}
	
					unmount(child);
					detach(child);
				}
			}
	
			if (older.ref !== null) {
				refs(older, older.ref, 0);
			}
		}
	}
	
	/**
	 * Detach
	 *
	 * @param {Tree}
	 */
	function detach (older) {
		older.parent = null;
		older.owner = null;
		older.node = null;
		older.host = null;
	}
	
	/**
	 * Exchange
	 *
	 * @param {Tree} newer
	 * @param {Tree} older
	 * @param {Boolean} deep
	 */
	function exchange (older, newer, deep) {
		change(older, newer, older.host);
		assign(older, newer, deep);
		update(older.host, newer);
	}
	
	/**
	 * Update
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 */
	function update (older, newer) {
		if (older !== null && older.flag === COMPOSITE) {
			older.node = newer.node;
			older.parent = newer.parent;
	
			if (older.host !== older) {
				update(older.host, newer);
			}
		}
	}
	
	/**
	 * Change
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 */
	function change (older, newer) {
		create(newer, older.parent, older, 3, older.host, null);
	}
	
	/**
	 * Render
	 *
	 * @param {Any} subject
	 * @param {Node?} container
	 * @param {(Function|Node)?} callback
	 */
	function render (subject, container, callback) {
		var newer = subject;
		var target = container;
	
		if (newer === void 0 || newer === null) {
			newer = text(' ');
		} else if (newer.flag === void 0) {
			newer = shape(newer, null, false);
		}
	
		// browser
		if (target === void 0 || target === null) {
			// uses <body> if it exists at this point
			// else default to the root <html> node
			if (body === null && (body = documentElement()) === null) {
				return server === true ? newer.toString() : void 0;
			}
	
			target = body;
		}
	
		var older = target.this;
	
		if (older !== void 0) {
			if (older.key === newer.key) {
				patch(older, newer, older.group);
			} else {
				exchange(older, newer, true);
			}
		} else {
			var parent = new Tree(ELEMENT);
	
			target.this = older = newer;
			parent.node = target;
	
			if (callback === void 0 || callback === null || callback.constructor === Function) {
				create(newer, parent, SHARED, 1, newer, null);
			} else {
				hydrate(newer, parent, 0, callback, newer, null);
			}
		}
	
		if (callback !== void 0 && callback !== null && callback.constructor === Function) {
			callbackBoundary(older, older.owner, callback, target, 0);
		}
	}
	
	/**
	 * Patch
	 *
	 * @param {Tree} older
	 * @param {Tree} _newer
	 * @param {Number} group
	 */
	function patch (older, _newer, group) {
		var newer = _newer;
		var type = older.type;
		var skip = false;
	
		if (type !== newer.type) {
			exchange(older, newer, true);
			return;
		}
	
		if (group !== STRING) {
			var owner = older.owner
	
			if (owner === null || older.async !== READY) {
				return;
			}
	
			older.async = PROCESSING;
	
			var newProps = newer.props;
			var oldProps = older.props;
			var newState;
			var oldState;
	
			if (group !== FUNCTION) {
				oldState = owner.state;
				newState = owner._state;
			} else {
				oldState = oldProps;
				newState = newProps;
			}
	
			if (group < NOOP) {
				if (type.propTypes !== void 0) {
					propTypes(owner, type, newProps);
				}
	
				if (owner.componentWillReceiveProps !== void 0) {
					dataBoundary(older, owner, 0, newProps);
				}
	
				if (type.defaultProps !== void 0) {
					merge(type.defaultProps, newProps === PROPS ? (newProps = {}) : newProps);
				}
			}
	
			if (
				group !== FORCE &&
				owner.shouldComponentUpdate !== void 0 &&
				updateBoundary(older, owner, 0, newProps, newState) === false
			) {
				older.async = READY;
				return;
			}
	
			if (group < NOOP) {
				if (group === CLASS) {
					owner.props = newProps;
				}
	
				older.props = newProps;
			}
	
			if (owner.componentWillUpdate !== void 0) {
				updateBoundary(older, owner, 1, newProps, newState);
			}
	
			// update current state
			if (group !== FUNCTION) {
				updateState(oldState, newState);
			}
	
			newer = renderBoundary(older, group);
			newer = newer !== older ? shape(newer, older, true) : newer;
	
			if (older.async === PENDING) {
				return;
			}
	
			older.async = READY;
	
			if (newer.tag !== older.tag) {
				exchange(older, newer, false);
				skip = true;
			} else {
				// composite component
				if (newer.flag === COMPOSITE) {
					patch(older.children[0], newer.children[0], group);
					skip = true;
				}
			}
		}
	
		if (skip === false) {
			switch (older.flag) {
				// text component
				case TEXT: {
					if (older.children !== newer.children) {
						nodeValue(older, newer);
					}
					break
				}
				default: {
					var oldLength = older.children.length;
					var newLength = newer.children.length;
	
					/**
					 * when int * 0 === 0,
					 * if oldLength is not zero then newLength is.
					 */
					switch (oldLength * newLength) {
						case 0: {
							switch (oldLength) {
								// fill children
								case 0: {
									if (newLength > 0) {
										fill(older, newer, newLength);
										older.children = newer.children;
									}
									break
								}
								// remove children
								default: {
									unmount(older);
									removeChildren(older);
									older.children = newer.children;
								}
							}
							break;
						}
						default: {
							switch (newer.keyed) {
								case 0: nonkeyed(older, newer, oldLength, newLength); break;
								case 1: keyed(older, newer, oldLength, newLength); break;
							}
						}
					}
	
					attributes(older, newer);
				}
			}
		}
	
		if (group !== STRING && older.owner.componentDidUpdate !== void 0) {
			older.async = PROCESSED;
			updateBoundary(older, owner, 2, oldProps, oldState);
			older.async = READY;
		}
	}
	
	/**
	 * Non-Keyed Children [Simple]
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 * @param {Number} oldLength
	 * @param {Number} newLength
	 */
	function nonkeyed (older, newer, oldLength, newLength) {
		var host = older.host;
		var oldChildren = older.children;
		var newChildren = newer.children;
		var length = newLength > oldLength ? newLength : oldLength;
	
		for (var i = 0; i < length; i++) {
			if (i >= oldLength) {
				create(oldChildren[i] = newChildren[i], older, SHARED, 1, host, null);
			} else if (i >= newLength) {
				remove(oldChildren.pop(), SHARED, older);
			} else {
				var newChild = newChildren[i];
				var oldChild = oldChildren[i];
	
				if (newChild.flag === TEXT && oldChild.flag === TEXT) {
					if (newChild.children !== oldChild.children) {
						nodeValue(oldChild, newChild);
					}
				} else {
					patch(oldChild, newChild, oldChild.group);
				}
			}
		}
	}
	
	/**
	 * Keyed Children [Simple]
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 * @param {Number} oldLength
	 * @param {Number} newLength
	 */
	function keyed (older, newer, oldLength, newLength) {
		var host = older.host;
	 	var oldChildren = older.children;
	 	var newChildren = newer.children;
	 	var oldStart = 0;
	 	var newStart = 0;
	 	var oldEnd = oldLength - 1;
	 	var newEnd = newLength - 1;
	 	var oldStartNode = oldChildren[oldStart];
	 	var newStartNode = newChildren[newStart];
	 	var oldEndNode = oldChildren[oldEnd];
	 	var newEndNode = newChildren[newEnd];
	 	var nextPos;
	 	var nextChild;
	
	 	// step 1, sync leading [a, b ...], trailing [... c, d], opposites [a, b] [b, a] recursively
	 	outer: while (true) {
	 		// sync leading nodes
	 		while (oldStartNode.key === newStartNode.key) {
	 			newChildren[newStart] = oldStartNode;
	
	 			patch(oldStartNode, newStartNode, oldStartNode.group);
	
	 			oldStart++;
	 			newStart++;
	
	 			if (oldStart > oldEnd || newStart > newEnd) {
	 				break outer;
	 			}
	
	 			oldStartNode = oldChildren[oldStart];
	 			newStartNode = newChildren[newStart];
	 		}
	
	 		// sync trailing nodes
	 		while (oldEndNode.key === newEndNode.key) {
	 			newChildren[newEnd] = oldEndNode;
	
	 			patch(oldEndNode, newEndNode, oldEndNode.group);
	
	 			oldEnd--;
	 			newEnd--;
	
	 			if (oldStart > oldEnd || newStart > newEnd) {
	 				break outer;
	 			}
	
	 			oldEndNode = oldChildren[oldEnd];
	 			newEndNode = newChildren[newEnd];
	 		}
	
	 		// move and sync nodes from right to left
	 		if (oldEndNode.key === newStartNode.key) {
	 			newChildren[newStart] = oldEndNode;
	 			oldChildren[oldEnd] = oldStartNode;
	
	 			insertBefore(oldEndNode, oldStartNode, older);
	 			patch(oldEndNode, newStartNode, oldEndNode.group);
	
	 			oldEnd--;
	 			newStart++;
	
	 			oldEndNode = oldChildren[oldEnd];
	 			newStartNode = newChildren[newStart];
	
	 			continue;
	 		}
	
	 		// move and sync nodes from left to right
	 		if (oldStartNode.key === newEndNode.key) {
	 			newChildren[newEnd] = oldStartNode;
	 			oldChildren[oldStart] = oldEndNode;
	
	 			nextPos = newEnd + 1;
	
	 			if (nextPos < newLength) {
	 				insertBefore(oldStartNode, oldChildren[nextPos], older);
	 			} else {
	 				appendChild(oldStartNode, older);
	 			}
	
	 			patch(oldStartNode, newEndNode, oldStartNode.group);
	
	 			oldStart++;
	 			newEnd--;
	
	 			oldStartNode = oldChildren[oldStart];
	 			newEndNode = newChildren[newEnd];
	
	 			continue;
	 		}
	
	 		break;
	 	}
	
	 	// step 2, remove or insert or both
	 	if (oldStart > oldEnd) {
	 		// old children is synced, insert the difference
	 		if (newStart <= newEnd) {
	 			nextPos = newEnd + 1;
	 			nextChild = nextPos < newLength ? newChildren[nextPos] : SHARED;
	
	 			do {
	 				create(newStartNode = newChildren[newStart++], older, nextChild, 2, host, null);
	 			} while (newStart <= newEnd);
	 		}
	 	} else if (newStart > newEnd) {
	 		// new children is synced, remove the difference
	 		do {
	 			remove(oldStartNode = oldChildren[oldStart++], SHARED, older);
	 		} while (oldStart <= oldEnd);
	 	} else if (newStart === 0 && newEnd === newLength-1) {
	 		// all children are out of sync, remove all, append new set
	 		unmount(older);
	 		removeChildren(older);
	 		fill(older, newer, newLength);
	 	} else {
	 		// could sync all children, move on the the next phase
	 		complex(older, newer, oldStart, newStart, oldEnd + 1, newEnd + 1, oldLength, newLength);
	 	}
	
	 	older.children = newChildren;
	}
	
	/**
	 * Keyed Children [Complex]
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 * @param {Number} oldStart
	 * @param {Number} newStart
	 * @param {Number} oldEnd
	 * @param {Number} newEnd
	 * @param {Number} oldLength
	 * @param {number} newLength
	 */
	function complex (older, newer, oldStart, newStart, oldEnd, newEnd, oldLength, newLength) {
		var host = older.host;
		var oldChildren = older.children;
		var newChildren = newer.children;
		var oldKeys = {};
		var newKeys = {};
		var oldIndex = oldStart;
		var newIndex = newStart;
		var oldOffset = 0;
		var newOffset = 0;
		var oldChild;
		var newChild;
		var nextChild;
		var nextPos;
	
		// step 1, build a map of keys
		while (true) {
			if (oldIndex < oldEnd) {
				oldChild = oldChildren[oldIndex];
				oldKeys[oldChild.key] = oldIndex++;
			}
	
			if (newIndex < newEnd) {
				newChild = newChildren[newIndex];
				newKeys[newChild.key] = newIndex++;
			}
	
			if (oldIndex === oldEnd && newIndex === newEnd) {
				break;
			}
		}
	
		// reset
		oldIndex = oldStart;
		newIndex = newStart;
	
		// step 2, insert and sync nodes from left to right [a, b, ...]
		while (newIndex < newEnd) {
			newChild = newChildren[newIndex];
			oldIndex = oldKeys[newChild.key];
	
			// new child doesn't exist in old children, insert
			if (oldIndex === void 0) {
				nextPos = newIndex - newOffset;
				nextChild = nextPos < oldLength ? oldChildren[nextPos] : SHARED;
	
				create(newChild, older, nextChild, 2, host, null);
	
				newOffset++;
			} else if (newIndex === oldIndex) {
				oldChild = oldChildren[oldIndex];
	
				patch(newChildren[newIndex] = oldChild, newChild, oldChild.group);
			}
	
			newIndex++;
		}
	
		// reset
		oldIndex = oldStart;
	
		// step 3, remove and sync nodes from left to right [a, b, ...]
		while (oldIndex < oldEnd) {
			oldChild = oldChildren[oldIndex];
			newIndex = newKeys[oldChild.key];
	
			// old child doesn't exist in new children, remove
			if (newIndex === void 0) {
				remove(oldChild, SHARED, older);
	
				oldOffset++;
			}
	
			oldIndex++;
		}
	
		// compute changes
		oldOffset = (oldEnd - oldStart) - oldOffset;
		newOffset = (newEnd - newStart) - newOffset;
	
		// new and old children positions are in sync
		if (oldOffset + newOffset === 2) {
			return;
		}
	
		// reset
		newIndex = newEnd - 1;
	
		// step 4, move and sync nodes from right to left, [..., c, d]
		while (newIndex >= newStart) {
			newChild = newChildren[newIndex];
	
			// moved node
			if (newChild.node === null) {
				// retreive index
				oldIndex = oldKeys[newChild.key];
	
				// exists
				if (oldIndex !== void 0) {
					oldChild = oldChildren[oldIndex];
	
					// within bounds
					if ((nextPos = newIndex + 1) < newLength) {
						insertBefore(oldChild, newChildren[nextPos], older);
					} else {
						appendChild(oldChild, older);
					}
	
					patch(newChildren[newIndex] = oldChild, newChild, oldChild.group);
				}
			}
	
			newIndex--;
		}
	}
	
	/**
	 * Create
	 *
	 * @param {String} tag
	 * @param {Tree} newer
	 * @param {Tree} host
	 * @param {String?} xmlns
	 * @return {Node}
	 */
	function createElement (tag, newer, host, xmlns) {
		try {
			if (xmlns === null) {
				return document.createElement(tag);
			} else {
				return document.createElementNS(newer.xmlns = xmlns, tag);
			}
		} catch (err) {
			return errorBoundary(err, host, host.owner, (newer.flag = ERROR, 3), 0);
		}
	}
	
	/**
	 * Custom
	 * 
	 * @param {Tree} newer
	 * @param {Tree} host
	 * @return {Node}
	 */
	function createCustomElement (newer, host) {
		try {
			return new newer.tag(newer.props);
		} catch (err) {
			return errorBoundary(err, host, host.owner, (newer.flag = ERROR, 3), 0);
		}
	}
	
	/**
	 * Text
	 *
	 * @param {(String|Number)} value
	 * @return {Node}
	 */
	function createTextNode (value) {
		return document.createTextNode(value);
	}
	
	/**
	 * Fragment
	 *
	 * @return {Node}
	 */
	function createDocumentFragment () {
		return document.createDocumentFragment();
	}
	
	/**
	 * Document
	 *
	 * @return {Node?}
	 */
	function documentElement () {
		return self.document !== void 0 ? (document.body || document.documentElement) : null;
	}
	
	/**
	 * Insert
	 *
	 * @param {Tree} newer
	 * @param {Tree} sibling
	 * @param {Tree} parent
	 */
	function insertBefore (newer, sibling, parent) {
		parent.node.insertBefore(newer.node, sibling.node);
	}
	
	/**
	 * Append
	 *
	 * @param {Tree} newer
	 * @param {Tree} parent
	 */
	function appendChild (newer, parent) {
		parent.node.appendChild(newer.node);
	}
	
	/**
	 * Replace
	 *
	 * @param  {Tree} older
	 * @param  {Tree} newer
	 * @param  {Tree} parent
	 */
	function replaceChild (older, newer, parent) {
		parent.node.replaceChild(newer.node, older.node);
	}
	
	/**
	 * Remove
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 * @param {Tree} parent
	 */
	function removeChild (older, parent) {
		parent.node.removeChild(older.node);
	}
	
	/**
	 * Remove All
	 *
	 * @param {Tree} older
	 */
	function removeChildren (older) {
		older.node.textContent = null;
	}
	
	/**
	 * Text
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 */
	function nodeValue (older, newer) {
		older.node.nodeValue = older.children = newer.children;
	}
	
	/**
	 * Attribute
	 *
	 * @param {Number} type
	 * @param {String} name
	 * @param {Any} value
	 * @param {String?} xmlns
	 * @param {Boolean} set
	 * @param {Tree} node
	 */
	function setAttribute (type, name, value, xmlns, set, node) {
		switch (type) {
			case 0: {
				if (xmlns === null && (name in node) === true) {
					setUnknown(name, value, node);
				} else if (set === true) {
					node.setAttribute(name, value);
				} else {
					node.removeAttribute(name);
				}
				break;
			}
			case 1: {
				if (xmlns === null) {
					node.className = value;
				} else {
					setAttribute(0, 'class', value, xmlns, set, node);
				}
				break;
			}
			case 3: {
				if ((name in node) === false) {
					node.style.setProperty(name, value);
				} else if (isNaN(Number(value)) === true) {
					setAttribute(0, name, value, xmlns, set, node);
				} else {
					setAttribute(6, name, value, xmlns, set, node);
				}
				break;
			}
			case 4: {
				if (set === true) {
					node.setAttributeNS(xlink, 'href', value);
				} else {
					node.removeAttributeNS(xlink, 'href');
				}
				break;
			}
			case 5:
			case 6: {
				if (xmlns === null) {
					node[name] = value;
				} else {
					setAttribute(0, name, value, xmlns, set, node);
				}
				break;
			}
			case 10: {
				node.innerHTML = value;
				break;
			}
		}
	}
	
	/**
	 * Unknown
	 *
	 * @param  {String} name
	 * @param  {Any} value
	 * @param  {Node} node
	 */
	function setUnknown (name, value, node) {
		try {
			node[name] = value;
		} catch (e) {}
	}
	
	/**
	 * Style
	 *
	 * @param {Tree} older
	 * @param {Tree} newer
	 * @param {Number} _type
	 */
	function setStyle (older, newer, _type) {
		var node = older.node.style;
		var prev = older.attrs.style;
		var next = newer.attrs.style;
	
		switch (next.constructor) {
			case Object: {
				// update/assign
				var type = prev !== void 0 && prev !== null ? _type : 0;
	
				for (var name in next) {
					var value = next[name];
	
					if (type === 1 && value === prev[name]) {
						continue
					}
	
					if (name.charCodeAt(0) === 45) {
						node.setProperty(name, value);
					} else {
						node[name] = value;
					}
				}
				break;
			}
			case String: {
				// update/assign
				if (_type === 0 || next !== prev) {
					node.cssText = next;
				}
				break;
			}
			default: {
				node.cssText = '';
			}
		}
	}
	
	/**
	 * Event
	 *
	 * @param {Tree} older
	 * @param {String} type
	 * @param {Function} value
	 * @param {Number} action
	 */
	function setEvent (older, type, value, action) {
		var name = type.toLowerCase().substring(2);
		var host = older.host;
		var node = older.node;
		var handlers = node.that;
	
		if (handlers === void 0) {
			handlers = node.that = {};
		}
	
		switch (action) {
			case 0: {
				node.removeEventListener(name, eventBoundary);
	
				if (handlers.host !== void 0) {
					handlers.host = null;
				}
				break;
			}
			case 1: {
				node.addEventListener(name, eventBoundary);
			}
			case 2: {
				if (host !== null && host.group === CLASS) {
					handlers.host = host;
				}
			}
		}
	
		handlers[name] = value;
	}
	
	/**
	 * Hydrate
	 *
	 * @param {Tree} newer
	 * @param {Tree} parent
	 * @param {Number} index
	 * @param {Node} _node
	 * @param {Tree?} _host
	 * @param {String?} _xmlns
	 * @param {Boolean} entry
	 * @return {Number}
	 */
	function hydrate (newer, parent, index, _node, _host, _xmlns, entry) {
		var flag = newer.flag;
		var group = newer.group;
		var node = _node;
		var host = _host;
		var xmlns = _xmlns;
		var i = 0;
		var temp;
	
		// link host
		if (host !== SHARED) {
			newer.host = host;
		}
	
		// link parent
		newer.parent = parent;
	
		// component
		if (group !== STRING) {
			if (group === CLASS) {
				host = newer;
			}
	
			temp = extract(newer, true);
			flag = temp.flag;
		}
	
		switch (flag) {
			// text
	 		case TEXT: {
	 			var children = parent.children;
	 			var length = children.length;
	
	 			if (length > 1 && children[index + 1].flag === TEXT) {
	 				var fragment = new Tree(FRAGMENT);
	 				var sibling = new Tree(TEXT);
	
	 				fragment.node = createDocumentFragment();
	 				sibling.node = node;
	
	 				for (i = index; i < length; i++) {
	 					var child = children[i];
	
	 					if (child.flag !== TEXT) {
	 						replaceChild(sibling, fragment, parent);
	 						return i;
	 					}
	
	 					child.node = createTextNode(child.children);
	
	 					appendChild(child, fragment);
	 				}
	 			} else {
	 				if (node.nodeValue !== newer.children) {
	 					node.nodeValue = newer.children;
	 				}
	
	 				newer.node = node;
	 			}
	
	 			return 0;
	 		}
	 		// composite
	 		case COMPOSITE: {
	 			hydrate(temp = temp.children[0], parent, index, node, host, xmlns);
	 			newer.node = temp.node;
	
				return 0;
	 		}
	 		// portal
	 		case PORTAL: {
	 			create(newer, parent, SHARED, 0, host, xmlns);
	 			break;
	 		}
	 		default: {
				var children = newer.children;
				var length = children.length;
	
				// cache namespace
				if (newer.xmlns !== null) {
					xmlns = newer.xmlns;
				} else if (xmlns !== null) {
					newer.xmlns = xmlns;
				}
	
	 			// namespace(implicit) svg/math roots
	 			switch (newer.tag) {
	 				case 'svg': xmlns = svg; break;
	 				case 'math': xmlns = math; break;
	 			}
	
	 			// whitespace
	 			if (node.splitText !== void 0 && node.nodeValue.trim().length === 0) {
	 				node = node.nextSibling;
	 			}
	
	 			newer.node = node;
	
	 			if (length > 0) {
	 				node = node.firstChild;
	
	 				while (i < length && node !== null) {
	 					var child = children[i];
	
	 					if (child.node !== null) {
	 						child = clone(children[i] = new Tree(child.flag), child, true);
	 					}
	
	 					var idx = hydrate(child, newer, i, node, host, xmlns);
	
	 					if (idx !== 0) {
	 						node = children[i = idx - 1].node;
	 					}
	
	 					node = node.nextSibling;
	 					i++;
	 				}
	 			}
	 		}
	 	}
	
		attribute(newer, xmlns, true);
	
		return 0;
	}
	
	/**
	 * Exports
	 *
	 * @type {Object}
	 */
	var dio = {
		version: '7.0.4',
		h: element,
		createElement: element,
		render: render,
		Component: Component
	};
	
	self.h = element;
	
	/**
	 * Server
	 */
	if (server === true && __require__ !== null) {
		__require__('./dio.server.js')(
			dio, element, shape, extract, whitelist, render, renderBoundary,
			CHILDREN, PROPS, ATTRS,
			READY, PROCESSING, PROCESSED, PENDING,
			STRING, FUNCTION, CLASS, NOOP,
			EMPTY, TEXT, ELEMENT, COMPOSITE, FRAGMENT, ERROR, PORTAL
		);
	}
	
	return dio;
	
}));
