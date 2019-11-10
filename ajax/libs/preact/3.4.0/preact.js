(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.preact = factory());
}(this, function () { 'use strict';

  var NO_RENDER = { render: false };
  var SYNC_RENDER = { renderSync: true };
  var DOM_RENDER = { build: true };

  var EMPTY = {};
  var EMPTY_BASE = '';

  // is this a DOM environment
  var HAS_DOM = typeof document !== 'undefined';
  var TEXT_CONTENT = !HAS_DOM || 'textContent' in document ? 'textContent' : 'nodeValue';

  var ATTR_KEY = '__preactattr_';

  var UNDEFINED_ELEMENT = 'x-undefined-element';

  // DOM properties that should NOT have "px" added when numeric
  var NON_DIMENSION_PROPS = {
  	boxFlex: 1, boxFlexGroup: 1, columnCount: 1, fillOpacity: 1, flex: 1, flexGrow: 1,
  	flexPositive: 1, flexShrink: 1, flexNegative: 1, fontWeight: 1, lineClamp: 1, lineHeight: 1,
  	opacity: 1, order: 1, orphans: 1, strokeOpacity: 1, widows: 1, zIndex: 1, zoom: 1
  };

  /** Copy own-properties from `props` onto `obj`.
   *	@returns obj
   *	@private
   */

  function extend(obj, props) {
  	for (var i in props) {
  		if (hasOwnProperty.call(props, i)) {
  			obj[i] = props[i];
  		}
  	}return obj;
  }

  /** Fast clone. Note: does not filter out non-own properties. */

  function clone(obj) {
  	var out = {};
  	/*eslint guard-for-in:0*/
  	for (var i in obj) {
  		out[i] = obj[i];
  	}return out;
  }

  /** Create a caching wrapper for the given function.
   *	@private
   */

  function memoize(fn, mem) {
  	mem = mem || {};
  	return function (k) {
  		return hasOwnProperty.call(mem, k) ? mem[k] : mem[k] = fn(k);
  	};
  }

  /** Get a deep property value from the given object, expressed in dot-notation.
   *	@private
   */

  function delve(obj, key) {
  	for (var p = key.split('.'), i = 0; i < p.length && obj; i++) {
  		obj = obj[p];
  	}
  	return obj;
  }

  /** @private is the given object a Function? */
  var isFunction = function isFunction(obj) {
  	return 'function' === typeof obj;
  };

  /** @private is the given object a String? */
  var isString = function isString(obj) {
  	return 'string' === typeof obj;
  };

  /** @private Safe reference to builtin hasOwnProperty */
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /** Check if a value is `null` or `undefined`.
   *	@private
   */
  var empty = function empty(x) {
  	return x === null || x === undefined;
  };

  /** Convert a hashmap of styles to CSSText
   *	@private
   */

  function styleObjToCss(s) {
  	var str = '';
  	for (var prop in s) {
  		if (hasOwnProperty.call(s, prop)) {
  			var val = s[prop];
  			str += jsToCss(prop);
  			str += ': ';
  			str += val;
  			if (typeof val === 'number' && !NON_DIMENSION_PROPS[prop]) {
  				str += 'px';
  			}
  			str += '; ';
  		}
  	}
  	return str;
  }

  /** Convert a hashmap of CSS classes to a space-delimited className string
   *	@private
   */

  function hashToClassName(c) {
  	var str = '';
  	for (var prop in c) {
  		if (c[prop]) {
  			if (str) str += ' ';
  			str += prop;
  		}
  	}
  	return str;
  }

  /** Convert a JavaScript camel-case CSS property name to a CSS property name
   *	@private
   *	@function
   */
  var jsToCss = memoize(function (s) {
  	return s.replace(/([A-Z])/, '-$1').toLowerCase();
  });

  /** Just a memoized String.prototype.toLowerCase */
  var toLowerCase = memoize(function (s) {
  	return s.toLowerCase();
  });

  /** Global options
   *	@public
   *	@namespace options {Object}
   */
  var options = {

  	/** If `true`, `prop` changes trigger synchronous component updates.
    *	@boolean
    */
  	syncComponentUpdates: true,

  	/** Processes all created VNodes.
    *	@param {VNode} vnode	A newly-created VNode to normalize/process
    *	@protected
    */
  	vnode: function vnode(n) {
  		var attrs = n.attributes;
  		if (!attrs || isFunction(n.nodeName)) return;

  		// normalize className to class.
  		var p = attrs.className;
  		if (p) {
  			attrs['class'] = p;
  			delete attrs.className;
  		}

  		if (attrs['class']) normalize(attrs, 'class', hashToClassName);
  		if (attrs.style) normalize(attrs, 'style', styleObjToCss);
  	}
  };

  function normalize(obj, prop, fn) {
  	var v = obj[prop];
  	if (v && !isString(v)) {
  		obj[prop] = fn(v);
  	}
  }

  function VNode(nodeName, attributes, children) {
  	/** @type {string|function} */
  	this.nodeName = nodeName;

  	/** @type {object<string>|undefined} */
  	this.attributes = attributes;

  	/** @type {array<VNode>|undefined} */
  	this.children = children;
  }

  function hook(obj, name, a, b, c) {
  	var fn = obj[name];
  	if (fn && fn.call) return fn.call(obj, a, b, c);
  }

  /** Invoke hook() on a component and child components (recursively)
   *	@private
   */

  function deepHook(obj, type) {
  	do {
  		hook(obj, type);
  	} while (obj = obj._component);
  }

  var SHARED_TEMP_ARRAY = [];

  /** JSX/hyperscript reviver
   *	@see http://jasonformat.com/wtf-is-jsx
   *	@public
   *  @example
   *  /** @jsx h *\/
   *  import { render, h } from 'preact';
   *  render(<span>foo</span>, document.body);
   */
  function h(nodeName, attributes) {
  	var len = arguments.length,
  	    children = undefined,
  	    arr = undefined,
  	    lastSimple = undefined;

  	if (len > 2) {
  		children = [];
  		for (var i = 2; i < len; i++) {
  			var _p = arguments[i];
  			if (empty(_p)) continue;
  			if (_p.join) {
  				arr = _p;
  			} else {
  				arr = SHARED_TEMP_ARRAY;
  				arr[0] = _p;
  			}
  			for (var j = 0; j < arr.length; j++) {
  				var child = arr[j],
  				    simple = !empty(child) && !(child instanceof VNode);
  				if (simple) child = String(child);
  				if (simple && lastSimple) {
  					children[children.length - 1] += child;
  				} else if (!empty(child)) {
  					children.push(child);
  				}
  				lastSimple = simple;
  			}
  		}
  	}

  	if (attributes && attributes.children) {
  		delete attributes.children;
  	}

  	var p = new VNode(nodeName, attributes || undefined, children || undefined);
  	hook(options, 'vnode', p);
  	return p;
  }

  /** Create an Event handler function that sets a given state property.
   *	@param {Component} component	The component whose state should be updated
   *	@param {string} key				A dot-notated key path to update in the component's state
   *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
   *	@returns {function} linkedStateHandler
   *	@private
   */

  function createLinkedState(component, key, eventPath) {
  	var path = key.split('.'),
  	    p0 = path[0],
  	    len = path.length;
  	return function (e) {
  		var _component$setState;

  		var t = this,
  		    s = component.state,
  		    obj = s,
  		    v = undefined,
  		    i = undefined;
  		if (isString(eventPath)) {
  			v = delve(e, eventPath);
  			if (empty(v) && (t = t._component)) {
  				v = delve(t, eventPath);
  			}
  		} else {
  			v = (t.nodeName + t.type).match(/^input(checkbox|radio)$/i) ? t.checked : t.value;
  		}
  		if (isFunction(v)) v = v.call(t);
  		if (len > 1) {
  			for (i = 0; i < len - 1; i++) {
  				obj = obj[path[i]] || (obj[path[i]] = {});
  			}
  			obj[path[i]] = v;
  			v = s[p0];
  		}
  		component.setState((_component$setState = {}, _component$setState[p0] = v, _component$setState));
  	};
  }

  var items = [];
  var itemsOffline = [];
  function enqueueRender(component) {
  	if (items.push(component) !== 1) return;

  	var d = options.debounceRendering;
  	if (d) d(rerender);else setTimeout(rerender, 0);
  }

  function rerender() {
  	var currentItems = items,
  	    len = currentItems.length;
  	if (!len) return;
  	items = itemsOffline;
  	items.length = 0;
  	itemsOffline = currentItems;
  	while (len--) {
  		if (currentItems[len]._dirty) {
  			renderComponent(currentItems[len]);
  		}
  	}
  }

  /** Check if a VNode is a reference to a stateless functional component.
   *	A function component is represented as a VNode whose `nodeName` property is a reference to a function.
   *	If that function is not a Component (ie, has no `.render()` method on a prototype), it is considered a stateless functional component.
   *	@param {VNode} vnode	A VNode
   *	@private
   */

  function isFunctionalComponent(_ref) {
    var nodeName = _ref.nodeName;

    return isFunction(nodeName) && !nodeName.prototype.render;
  }

  /** Construct a resultant VNode from a VNode referencing a stateless functional component.
   *	@param {VNode} vnode	A VNode with a `nodeName` property that is a reference to a function.
   *	@private
   */

  function buildFunctionalComponent(vnode, context) {
    return vnode.nodeName(getNodeProps(vnode), context) || EMPTY_BASE;
  }

  /** Check if two nodes are equivalent.
   *	@param {Element} node
   *	@param {VNode} vnode
   *	@private
   */

  function isSameNodeType(node, vnode) {
  	if (node.nodeType === 3) return isString(vnode);
  	if (isFunctionalComponent(vnode)) return true;
  	var nodeName = vnode.nodeName;
  	if (isFunction(nodeName)) return node._componentConstructor === nodeName;
  	return toLowerCase(node.nodeName) === nodeName;
  }

  /** Reconstruct Component-style `props` from a VNode
   *	@todo: determine if it would be acceptible to drop the extend() clone here for speed
   *	@private
   */

  function getNodeProps(vnode) {
  	var props = clone(vnode.attributes);
  	if (vnode.children) {
  		props.children = vnode.children;
  	}
  	return props;
  }

  function ensureNodeData(node) {
  	return node[ATTR_KEY] || (node[ATTR_KEY] = {});
  }

  /** Append multiple children to a Node.
   *	Uses a Document Fragment to batch when appending 2 or more children
   *	@private
   */

  function appendChildren(parent, children) {
  	var len = children.length;
  	if (len <= 2) {
  		parent.appendChild(children[0]);
  		if (len === 2) parent.appendChild(children[1]);
  		return;
  	}

  	var frag = document.createDocumentFragment();
  	for (var i = 0; i < len; i++) {
  		frag.appendChild(children[i]);
  	}parent.appendChild(frag);
  }

  /** Retrieve the value of a rendered attribute
   *	@private
   */

  function getAccessor(node, name, value, cache) {
  	if (name !== 'type' && name in node) return node[name];
  	if (name === 'class') return node.className;
  	if (name === 'style') return node.style.cssText;
  	var attrs = node[ATTR_KEY];
  	if (cache !== false && attrs && hasOwnProperty.call(attrs, name)) return attrs[name];
  	return value;
  }

  /** Set a named attribute on the given Node, with special behavior for some names and event handlers.
   *	If `value` is `null`, the attribute/handler will be removed.
   *	@param {Element} node	An element to mutate
   *	@param {string} name	The name/key to set, such as an event or attribute name
   *	@param {any} value		An attribute value, such as a function to be used as an event handler
   *	@param {any} previousValue	The last value that was set for this name/node pair
   *	@private
   */

  function setAccessor(node, name, value) {
  	if (name === 'class') {
  		node.className = value;
  	} else if (name === 'style') {
  		node.style.cssText = value;
  	} else if (name === 'dangerouslySetInnerHTML') {
  		node.innerHTML = value.__html;
  	} else if (name === 'key' || name in node && name !== 'type') {
  		node[name] = value;
  	} else {
  		setComplexAccessor(node, name, value);
  	}

  	ensureNodeData(node)[name] = getAccessor(node, name, value, false);
  }

  /** For props without explicit behavior, apply to a Node as event handlers or attributes.
   *	@private
   */
  function setComplexAccessor(node, name, value) {
  	if (name.substring(0, 2) === 'on') {
  		var _type = normalizeEventName(name),
  		    l = node._listeners || (node._listeners = {}),
  		    fn = !l[_type] ? 'add' : !value ? 'remove' : null;
  		if (fn) node[fn + 'EventListener'](_type, eventProxy);
  		l[_type] = value;
  		return;
  	}

  	var type = typeof value;
  	if (value === null) {
  		node.removeAttribute(name);
  	} else if (type !== 'function' && type !== 'object') {
  		node.setAttribute(name, value);
  	}
  }

  /** Proxy an event to hooked event handlers
   *	@private
   */
  function eventProxy(e) {
  	var fn = this._listeners[normalizeEventName(e.type)];
  	if (fn) return fn.call(this, hook(options, 'event', e) || e);
  }

  /** Convert an Event name/type to lowercase and strip any "on*" prefix.
   *	@function
   *	@private
   */
  var normalizeEventName = memoize(function (t) {
  	return t.replace(/^on/i, '').toLowerCase();
  });

  /** Get a hashmap of node properties, preferring preact's cached property values over the DOM's
   *	@private
   */

  function getNodeAttributes(node) {
  	return node[ATTR_KEY] || getRawNodeAttributes(node) || EMPTY;
  	// let list = getRawNodeAttributes(node),
  	// 	l = node[ATTR_KEY];
  	// return l && list ? extend(list, l) : (l || list || EMPTY);
  }

  /** Get a node's attributes as a hashmap, regardless of type.
   *	@private
   */
  function getRawNodeAttributes(node) {
  	var list = node.attributes;
  	if (!list || !list.getNamedItem) return list;
  	if (list.length) return getAttributesAsObject(list);
  }

  /** Convert a DOM `.attributes` NamedNodeMap to a hashmap.
   *	@private
   */
  function getAttributesAsObject(list) {
  	var attrs = undefined;
  	for (var i = list.length; i--;) {
  		var item = list[i];
  		if (!attrs) attrs = {};
  		attrs[item.name] = item.value;
  	}
  	return attrs;
  }

  var components = {};

  function collectComponent(component) {
  	var name = component.constructor.name,
  	    list = components[name];
  	if (list) list.push(component);else components[name] = [component];
  }

  function createComponent(ctor, props, context) {
  	var list = components[ctor.name];
  	if (list && list.length) {
  		for (var i = list.length; i--;) {
  			if (list[i].constructor === ctor) {
  				return list.splice(i, 1)[0];
  			}
  		}
  	}
  	return new ctor(props, context);
  }

  /** DOM node pool, keyed on nodeName. */

  var nodes = {};

  var normalizeName = memoize(function (name) {
  	return name.toUpperCase();
  });

  function collectNode(node) {
  	cleanNode(node);
  	var name = normalizeName(node.nodeName),
  	    list = nodes[name];
  	if (list) list.push(node);else nodes[name] = [node];
  }

  function createNode(nodeName) {
  	var name = normalizeName(nodeName),
  	    list = nodes[name],
  	    node = list && list.pop() || document.createElement(nodeName);
  	ensureNodeData(node);
  	return node;
  }

  function cleanNode(node) {
  	if (node.parentNode) node.parentNode.removeChild(node);

  	if (node.nodeType === 3) return;

  	var attrs = node[ATTR_KEY];
  	for (var i in attrs) {
  		if (hasOwnProperty.call(attrs, i)) {
  			setAccessor(node, i, null, attrs[i]);
  		}
  	}

  	node[ATTR_KEY] = node._component = node._componentConstructor = null;

  	// if (node.childNodes.length>0) {
  	// 	console.warn(`Warning: Recycler collecting <${node.nodeName}> with ${node.childNodes.length} children.`);
  	// 	toArray(node.childNodes).forEach(recycler.collect);
  	// }
  }

  /** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
   *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
   *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
   *	@returns {Element} dom			The created/mutated element
   *	@private
   */
  function diff(_x, _x2, _x3) {
  	var _again = true;

  	_function: while (_again) {
  		var dom = _x,
  		    vnode = _x2,
  		    context = _x3;
  		_again = false;

  		if (isFunctionalComponent(vnode)) {
  			_x = dom;
  			_x2 = buildFunctionalComponent(vnode, context);
  			_x3 = context;
  			_again = true;
  			continue _function;
  		}

  		if (isFunction(vnode.nodeName)) {
  			return buildComponentFromVNode(dom, vnode, context);
  		}

  		if (isString(vnode)) {
  			if (dom) {
  				var type = dom.nodeType;
  				if (type === 3) {
  					dom[TEXT_CONTENT] = vnode;
  					return dom;
  				} else if (type === 1) {
  					collectNode(dom);
  				}
  			}
  			return document.createTextNode(vnode);
  		}

  		return diffNode(dom, vnode, context);
  	}
  }

  /** Apply changes from a VNode to the given DOM Node. */
  function diffNode(dom, vnode, context) {
  	var out = dom,
  	    nodeName = vnode.nodeName || UNDEFINED_ELEMENT;

  	if (!dom) {
  		out = createNode(nodeName);
  	} else if (toLowerCase(dom.nodeName) !== nodeName) {
  		out = createNode(nodeName);
  		appendChildren(out, dom.childNodes);
  		// reclaim element nodes
  		if (dom.nodeType === 1) collectNode(dom);
  	}

  	var children = undefined,
  	    keyed = undefined,
  	    keyedLen = 0,
  	    len = out.childNodes.length,
  	    childrenLen = 0,
  	    i = 0;
  	if (len) {
  		children = [];
  		for (; i < len; i++) {
  			var child = out.childNodes[i],
  			    key = getAccessor(child, 'key') || child._component && child._component.props && child._component.props.key;
  			if (!empty(key)) {
  				if (!keyed) keyed = {};
  				keyed[key] = child;
  				keyedLen++;
  			} else {
  				children[childrenLen++] = child;
  			}
  		}
  	}

  	diffAttributes(out, vnode);

  	var vchildren = vnode.children,
  	    vlen = vchildren && vchildren.length,
  	    min = 0;
  	if (vlen) {
  		for (i = 0; i < vlen; i++) {
  			var vchild = vchildren[i],
  			    child = undefined;

  			// if (isFunctionalComponent(vchild)) {
  			// 	vchild = buildFunctionalComponent(vchild);
  			// }

  			if (keyedLen) {
  				var attrs = vchild.attributes,
  				    key = attrs && attrs.key;
  				if (!empty(key) && keyed.hasOwnProperty(key)) {
  					child = keyed[key];
  					keyedLen--;
  				}
  			}

  			// attempt to pluck a node of the same type from the existing children
  			if (!child && min < childrenLen) {
  				for (var j = min; j < childrenLen; j++) {
  					var c = children[j];
  					if (c && isSameNodeType(c, vchild)) {
  						child = c;
  						children[j] = null;
  						if (j === childrenLen - 1) childrenLen--;
  						if (j === min + 1) min++;
  						break;
  					}
  				}
  			}

  			// morph the matched/found/created DOM child to match vchild (deep)
  			child = diff(child, vchild, context);

  			if (out.childNodes[i] !== child) {
  				var c = child._component,
  				    next = out.childNodes[i + 1];
  				if (c) deepHook(c, 'componentWillMount');
  				if (next) {
  					out.insertBefore(child, next);
  				} else {
  					out.appendChild(child);
  				}
  				if (c) deepHook(c, 'componentDidMount');
  			}
  		}
  	}

  	if (keyedLen) {
  		/*eslint guard-for-in:0*/
  		for (i in keyed) {
  			children[childrenLen++] = keyed[i];
  		}
  	}

  	// remove orphaned children
  	if (min < childrenLen) {
  		removeOrphanedChildren(out, children);
  	}

  	return out;
  }

  /** Reclaim children that were unreferenced in the desired VTree */
  function removeOrphanedChildren(out, children) {
  	for (var i = children.length; i--;) {
  		var child = children[i];
  		if (child) {
  			var c = child._component;

  			if (c) hook(c, 'componentWillUnmount');

  			out.removeChild(child);

  			if (c) {
  				hook(c, 'componentDidUnmount');
  				collectComponent(c);
  			} else if (child.nodeType === 1) {
  				collectNode(child);
  			}
  		}
  	}
  }

  /** Apply differences in attributes from a VNode to the given DOM Node. */
  function diffAttributes(dom, vnode) {
  	// apply attributes
  	var old = getNodeAttributes(dom) || EMPTY,
  	    attrs = vnode.attributes || EMPTY,
  	    name = undefined,
  	    value = undefined,
  	    prev = undefined;

  	// removed attributes
  	if (old !== EMPTY) {
  		for (name in old) {
  			if (hasOwnProperty.call(old, name)) {
  				value = attrs[name];
  				if (empty(value)) {
  					setAccessor(dom, name, null, old[name]);
  				}
  			}
  		}
  	}

  	// new & updated attributes
  	if (attrs !== EMPTY) {
  		for (name in attrs) {
  			if (hasOwnProperty.call(attrs, name)) {
  				value = attrs[name];
  				if (!empty(value)) {
  					prev = getAccessor(dom, name, old[name]);
  					if (value != prev) {
  						setAccessor(dom, name, value, prev);
  					}
  				}
  			}
  		}
  	}
  }

  /** Mark component as dirty and queue up a render.
   *	@param {Component} component
   *	@private
   */

  function triggerComponentRender(component) {
  	if (!component._dirty) {
  		component._dirty = true;
  		enqueueRender(component);
  	}
  }

  /** Set a component's `props` (generally derived from JSX attributes).
   *	@param {Object} props
   *	@param {Object} [opts]
   *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
   *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
   */

  function setComponentProps(component, props, opts, context) {
  	var d = component._disableRendering;
  	component._disableRendering = true;

  	opts = opts || EMPTY;

  	if (context) {
  		if (!component.prevContext) component.prevContext = clone(component.context);
  		component.context = context;
  	}

  	hook(component, 'componentWillReceiveProps', props, component.context);

  	if (!component.prevProps) component.prevProps = clone(component.props);
  	component.props = props;

  	component._disableRendering = d;

  	if (opts.render !== false) {
  		if (opts.renderSync || options.syncComponentUpdates) {
  			renderComponent(component);
  		} else {
  			triggerComponentRender(component);
  		}
  	}
  }

  /** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
   *	@param {Component} component
   *	@param {Object} [opts]
   *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
   *	@private
   */

  function renderComponent(component, opts) {
  	if (component._disableRendering) return;

  	var skip = undefined,
  	    rendered = undefined,
  	    props = component.props,
  	    state = component.state,
  	    context = component.context,
  	    previousProps = component.prevProps || props,
  	    previousState = component.prevState || state,
  	    previousContext = component.prevContext || context,
  	    isUpdate = component.base;

  	if (isUpdate) {
  		component.props = previousProps;
  		component.state = previousState;
  		component.context = previousContext;
  		if (hook(component, 'shouldComponentUpdate', props, state, context) === false) {
  			skip = true;
  		} else {
  			hook(component, 'componentWillUpdate', props, state, context);
  		}
  		component.props = props;
  		component.state = state;
  		component.context = context;
  	}

  	component.prevProps = component.prevState = component.prevContext = null;
  	component._dirty = false;

  	if (!skip) {
  		rendered = hook(component, 'render', props, state, context);

  		var childComponent = rendered && rendered.nodeName,
  		    childContext = component.getChildContext ? component.getChildContext() : context,
  		    base = undefined;

  		if (isFunction(childComponent) && childComponent.prototype.render) {
  			// set up high order component link

  			var inst = component._component;
  			if (inst && inst.constructor !== childComponent) {
  				unmountComponent(inst.base, inst, false);
  				inst = null;
  			}

  			var childProps = getNodeProps(rendered);

  			if (inst) {
  				setComponentProps(inst, childProps, SYNC_RENDER, childContext);
  			} else {
  				inst = createComponent(childComponent, childProps, childContext);
  				inst._parentComponent = component;
  				component._component = inst;
  				if (component.base) deepHook(inst, 'componentWillMount');
  				setComponentProps(inst, childProps, NO_RENDER, childContext);
  				renderComponent(inst, DOM_RENDER);
  				if (component.base) deepHook(inst, 'componentDidMount');
  			}

  			base = inst.base;
  		} else {
  			// destroy high order component link
  			if (component._component) {
  				unmountComponent(component.base, component._component);
  			}
  			component._component = null;

  			if (component.base || opts && opts.build) {
  				base = diff(component.base, rendered || EMPTY_BASE, childContext);
  			}
  		}

  		if (component.base && base !== component.base) {
  			var p = component.base.parentNode;
  			if (p) p.replaceChild(base, component.base);
  		}

  		component.base = base;
  		if (base) {
  			var componentRef = component,
  			    t = component;
  			while (t = t._parentComponent) {
  				componentRef = t;
  			}
  			base._component = componentRef;
  			base._componentConstructor = componentRef.constructor;
  		}

  		if (isUpdate) {
  			hook(component, 'componentDidUpdate', previousProps, previousState, previousContext);
  		}
  	}

  	var cb = component._renderCallbacks,
  	    fn = undefined;
  	if (cb) while (fn = cb.pop()) fn();

  	return rendered;
  }

  /** Apply the Component referenced by a VNode to the DOM.
   *	@param {Element} dom	The DOM node to mutate
   *	@param {VNode} vnode	A Component-referencing VNode
   *	@returns {Element} dom	The created/mutated element
   *	@private
   */

  function buildComponentFromVNode(dom, vnode, context) {
  	var c = dom && dom._component;

  	if (isFunctionalComponent(vnode)) {
  		var p = diff(dom, buildFunctionalComponent(vnode, context), context);
  		p._componentConstructor = vnode.nodeName;
  		return p;
  	}

  	var isOwner = c && dom._componentConstructor === vnode.nodeName;
  	while (c && !isOwner && (c = c._parentComponent)) {
  		isOwner = c.constructor === vnode.nodeName;
  	}

  	if (isOwner) {
  		setComponentProps(c, getNodeProps(vnode), SYNC_RENDER, context);
  	} else {
  		if (c) {
  			unmountComponent(dom, c);
  			dom = null;
  		}
  		dom = createComponentFromVNode(vnode, dom, context);
  	}

  	return dom;
  }

  /** Instantiate and render a Component, given a VNode whose nodeName is a constructor.
   *	@param {VNode} vnode
   *	@private
   */
  function createComponentFromVNode(vnode, dom, context) {
  	var props = getNodeProps(vnode);
  	var component = createComponent(vnode.nodeName, props, context);
  	if (dom) component.base = dom;
  	setComponentProps(component, props, NO_RENDER, context);
  	renderComponent(component, DOM_RENDER);

  	// let node = component.base;
  	//if (!node._component) {
  	//	node._component = component;
  	//	node._componentConstructor = vnode.nodeName;
  	//}

  	return component.base;
  }

  /** Remove a component from the DOM and recycle it.
   *	@param {Element} dom			A DOM node from which to unmount the given Component
   *	@param {Component} component	The Component instance to unmount
   *	@private
   */
  function unmountComponent(dom, component, remove) {
  	// console.warn('unmounting mismatched component', component);

  	deepHook(component, 'componentWillUnmount');
  	if (remove !== false) {
  		if (dom._component === component) {
  			delete dom._component;
  			delete dom._componentConstructor;
  		}
  		var base = component.base;
  		if (base && base.parentNode) {
  			base.parentNode.removeChild(base);
  		}
  	}
  	component._parentComponent = null;
  	deepHook(component, 'componentDidUnmount');
  	collectComponent(component);
  }

  /** Base Component class, for he ES6 Class method of creating Components
   *	@public
   *
   *	@example
   *	class MyFoo extends Component {
   *		render(props, state) {
   *			return <div />;
   *		}
   *	}
   */
  function Component(props, context) {
  	/** @private */
  	this._dirty = this._disableRendering = false;
  	/** @private */
  	this._linkedStates = {};
  	/** @private */
  	this._renderCallbacks = [];
  	/** @public */
  	this.prevState = this.prevProps = this.prevContext = this.base = this._parentComponent = this._component = null;
  	/** @public */
  	this.context = context || null;
  	/** @type {object} */
  	this.props = props || hook(this, 'getDefaultProps') || {};
  	/** @type {object} */
  	this.state = hook(this, 'getInitialState') || {};
  }

  extend(Component.prototype, {

  	/** Returns a `boolean` value indicating if the component should re-render when receiving the given `props` and `state`.
    *	@param {object} nextProps
    *	@param {object} nextState
    *	@param {object} nextContext
    *	@returns {Boolean} should the component re-render
    *	@name shouldComponentUpdate
    *	@function
    */
  	// shouldComponentUpdate() {
  	// 	return true;
  	// },

  	/** Returns a function that sets a state property when called.
    *	Calling linkState() repeatedly with the same arguments returns a cached link function.
    *
    *	Provides some built-in special cases:
    *		- Checkboxes and radio buttons link their boolean `checked` value
    *		- Inputs automatically link their `value` property
    *		- Event paths fall back to any associated Component if not found on an element
    *		- If linked value is a function, will invoke it and use the result
    *
    *	@param {string} key				The path to set - can be a dot-notated deep key
    *	@param {string} [eventPath]		If set, attempts to find the new state value at a given dot-notated path within the object passed to the linkedState setter.
    *	@returns {function} linkStateSetter(e)
    *
    *	@example Update a "text" state value when an input changes:
    *		<input onChange={ this.linkState('text') } />
    *
    *	@example Set a deep state value on click
    *		<button onClick={ this.linkState('touch.coords', 'touches.0') }>Tap</button
    */
  	linkState: function linkState(key, eventPath) {
  		var c = this._linkedStates,
  		    cacheKey = key + '|' + (eventPath || '');
  		return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
  	},

  	/** Update component state by copying properties from `state` to `this.state`.
    *	@param {object} state		A hash of state properties to update with new values
    */
  	setState: function setState(state, callback) {
  		var s = this.state;
  		if (!this.prevState) this.prevState = clone(s);
  		extend(s, isFunction(state) ? state(s, this.props) : state);
  		if (callback) this._renderCallbacks.push(callback);
  		triggerComponentRender(this);
  	},

  	/** Immediately perform a synchronous re-render of the component.
    *	@private
    */
  	forceUpdate: function forceUpdate() {
  		renderComponent(this);
  	},

  	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
    *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
    *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
    *	@param {object} state		The component's current state
    *	@returns VNode
    */
  	render: function render() {
  		return null;
  	}

  });

  /** Render JSX into a `parent` Element.
   *	@param {VNode} vnode		A (JSX) VNode to render
   *	@param {Element} parent		DOM element to render into
   *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
   *	@public
   *
   *	@example
   *	// render a div into <body>:
   *	render(<div id="hello">hello!</div>, document.body);
   *
   *	@example
   *	// render a "Thing" component into #foo:
   *	const Thing = ({ name }) => <span>{ name }</span>;
   *	render(<Thing name="one" />, document.querySelector('#foo'));
   */
  function render(vnode, parent, merge) {
    var existing = merge && merge._component && merge._componentConstructor === vnode.nodeName,
        built = diff(merge, vnode),
        c = !existing && built._component;

    if (c) deepHook(c, 'componentWillMount');

    if (built.parentNode !== parent) {
      parent.appendChild(built);
    }

    if (c) deepHook(c, 'componentDidMount');

    return built;
  }

  var preact = {
  	h: h,
  	Component: Component,
  	render: render,
  	rerender: rerender,
  	options: options,
  	hooks: options
  };

  return preact;

}));
//# sourceMappingURL=preact.js.map