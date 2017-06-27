(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('proptypes'), require('preact-svg'), require('preact')) :
	typeof define === 'function' && define.amd ? define(['proptypes', 'preact-svg', 'preact'], factory) :
	(global.preactCompat = factory(global.PropTypes,global.preactSvg,global.preact));
}(this, function (PropTypes,SVG,preact) {

	PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;
	SVG = 'default' in SVG ? SVG['default'] : SVG;

	var version = '15.1.0';

	var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

	var AUTOBIND_BLACKLIST = {
		constructor: 1,
		render: 1,
		shouldComponentUpdate: 1,
		componentWillRecieveProps: 1,
		componentWillUpdate: 1,
		componentDidUpdate: 1,
		componentWillMount: 1,
		componentDidMount: 1,
		componentWillUnmount: 1,
		componentDidUnmount: 1
	};

	var BYPASS_HOOK = {};

	var DEV = typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production';

	var EmptyComponent = function () {
		return null;
	};

	var VNode = preact.h('').constructor;
	VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;

	Object.defineProperty(VNode.prototype, 'type', {
		get: function () {
			return this.nodeName;
		},
		set: function (v) {
			this.nodeName = v;
		}
	});

	Object.defineProperty(VNode.prototype, 'props', {
		get: function () {
			return this.attributes;
		},
		set: function (v) {
			this.attributes = v;
		}
	});

	var oldVnodeHook = preact.options.vnode || EmptyComponent;
	preact.options.vnode = function (vnode) {
		var a = vnode.attributes;
		if (!a) a = vnode.attributes = {};

		if (Object.isExtensible && !Object.isExtensible(a)) {
			a = extend({}, a, true);
		}
		a.children = vnode.children;
		oldVnodeHook(vnode);
	};

	function render$1(vnode, parent, callback) {
		var prev = parent._preactCompatRendered;
		if (prev && prev.parentNode !== parent) prev = null;
		var out = preact.render(vnode, parent, prev);
		parent._preactCompatRendered = out;
		if (typeof callback === 'function') callback();
		return out && out._component;
	}

	function unmountComponentAtNode(container) {
		var existing = container._preactCompatRendered;
		if (existing && existing.parentNode === container) {
			preact.render(preact.h(EmptyComponent), container, existing);
			return true;
		}
		return false;
	}

	var ARR = [];

	var Children = {
		map: function (children, fn, ctx) {
			children = Children.toArray(children);
			if (ctx && ctx !== children) fn = fn.bind(ctx);
			return children.map(fn);
		},
		forEach: function (children, fn, ctx) {
			children = Children.toArray(children);
			if (ctx && ctx !== children) fn = fn.bind(ctx);
			children.forEach(fn);
		},
		count: function (children) {
			children = Children.toArray(children);
			return children.length;
		},
		only: function (children) {
			children = Children.toArray(children);
			if (children.length !== 1) throw new Error('Children.only() expects only one child.');
			return children[0];
		},
		toArray: function (children) {
			return Array.isArray && Array.isArray(children) ? children : ARR.concat(children);
		}
	};

	var currentComponent = void 0;

	function createFactory(type) {
		return createElement.bind(null, type);
	}

	var DOM = {};
	for (var i = ELEMENTS.length; i--;) {
		DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
	}

	function createElement() {
		var vnode = preact.h.apply(undefined, arguments);

		if (vnode.nodeName === 'svg') {
			vnode.nodeName = SVG;
		}

		applyClassName(vnode);

		var ref = vnode.attributes && vnode.attributes.ref;
		if (currentComponent && ref && typeof ref === 'string') {
			vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
		}

		return vnode;
	}

	function cloneElement$1(element, props) {
		var node = preact.h(element.nodeName || element.type, element.attributes || element.props, element.children || element.props.children);

		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		if (preact.cloneElement) {
			return preact.cloneElement.apply(undefined, [node, props].concat(children));
		}
		return createElement.apply(undefined, [node.nodeName, extend(extend({}, node.attributes || {}), props)].concat(children.length && children || node.children || []));
	}

	function isValidElement(element) {
		return element && (element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE);
	}

	function createStringRefProxy(name, component) {
		return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
			if (component && component.refs) {
				component.refs[name] = resolved;
				if (resolved === null) {
					delete component._refProxies[name];
					component = null;
				}
			}
		});
	}

	function applyClassName(_ref) {
		var attributes = _ref.attributes;

		if (!attributes) return;
		var cl = attributes.className || attributes.class;
		if (cl) attributes.className = cl;
	}

	function extend(base, props, all) {
		for (var key in props) {
			if (all === true || props[key] != null) {
				base[key] = props[key];
			}
		}
		return base;
	}

	var findDOMNode = function (component) {
		return component.base || component;
	};

	function F() {}

	function createClass(obj) {
		function cl(props, context) {
			extend(this, obj);
			Component$1.call(this, props, context, BYPASS_HOOK);
			bindAll(this);
			newComponentHook.call(this, props, context);
		}

		if (obj.statics) {
			extend(cl, obj.statics);
		}
		if (obj.propTypes) {
			cl.propTypes = obj.propTypes;
		}
		if (obj.defaultProps) {
			cl.defaultProps = obj.defaultProps;
		}
		if (obj.getDefaultProps) {
			cl.defaultProps = obj.getDefaultProps();
		}

		F.prototype = Component$1.prototype;
		cl.prototype = new F();
		cl.prototype.constructor = cl;

		cl.displayName = obj.displayName || 'Component';

		return cl;
	}

	function bindAll(ctx) {
		for (var _i in ctx) {
			var v = ctx[_i];
			if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(_i)) {
				(ctx[_i] = v.bind(ctx)).__bound = true;
			}
		}
	}

	function callMethod(ctx, m, args) {
		if (typeof m === 'string') {
			m = ctx.constructor.prototype[m];
		}
		if (typeof m === 'function') {
			return m.apply(ctx, args);
		}
	}

	function multihook() {
		var hooks = arguments;
		return function () {
			var ret = void 0;
			for (var _i2 = 0; _i2 < hooks.length; _i2++) {
				var r = callMethod(this, hooks[_i2], arguments);
				if (r !== undefined) ret = r;
			}
			return ret;
		};
	}

	function newComponentHook(props, context) {
		propsHook.call(this, props, context);
		this.componentWillReceiveProps = multihook(this.componentWillReceiveProps || 'componentWillReceiveProps', propsHook);
		this.render = multihook(beforeRender, this.render || 'render', afterRender);
	}

	function propsHook(props) {
		if (!props) return;

		var c = props.children;
		if (c && c.length === 1) {
			props.children = c[0];

			if (props.children && typeof props.children === 'object') {
				props.children.length = 1;
				props.children[0] = props.children;
			}
		}

		if (DEV) {
			var propTypes = this.propTypes || this.constructor.propTypes;
			if (propTypes) {
				for (var prop in propTypes) {
					if (propTypes.hasOwnProperty(prop) && typeof propTypes[prop] === 'function') {
						var err = propTypes[prop](props, prop, this.constructor.name, 'prop');
						if (err) throw err;
					}
				}
			}
		}
	}

	function beforeRender() {
		currentComponent = this;
	}

	function afterRender() {
		if (currentComponent === this) {
			currentComponent = null;
		}
	}

	function Component$1(props, context, opts) {
		preact.Component.call(this, props, context);
		this.refs = {};
		this._refProxies = {};
		if (opts !== BYPASS_HOOK) {
			newComponentHook.call(this, props, context);
		}
	}
	Component$1.prototype = new preact.Component();
	extend(Component$1.prototype, {
		constructor: Component$1,

		isReactComponent: {},

		getDOMNode: function () {
			return this.base;
		},
		isMounted: function () {
			return !!this.base;
		}
	});

	var index = { version: version, DOM: DOM, PropTypes: PropTypes, Children: Children, render: render$1, createClass: createClass, createFactory: createFactory, createElement: createElement, cloneElement: cloneElement$1, isValidElement: isValidElement, findDOMNode: findDOMNode, unmountComponentAtNode: unmountComponentAtNode, Component: Component$1 };

	return index;

}));
//# sourceMappingURL=preact-compat.js.map