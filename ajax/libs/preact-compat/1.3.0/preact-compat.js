(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('proptypes'), require('preact')) :
	typeof define === 'function' && define.amd ? define(['exports', 'proptypes', 'preact'], factory) :
	(factory((global.preactCompat = global.preactCompat || {}),global.PropTypes,global.preact));
}(this, function (exports,PropTypes,preact) { 'use strict';

	PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;

	var babelHelpers = {};

	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	babelHelpers.createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	babelHelpers.inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	babelHelpers.possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	babelHelpers;

	var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

	var VNode = preact.h('').constructor;
	VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;

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

	var DEV = !isProd();

	function isProd() {
		var prod = undefined;

		try {
			prod = process.env.NODE_ENV === 'production';
		} catch (e) {}
		return !!prod;
	}

	var EmptyComponent = function () {
		return null;
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

	var currentComponent = undefined;

	function createFactory(type) {
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return createElement.apply(undefined, [type].concat(args));
		};
	}

	var DOM = {};
	for (var i = ELEMENTS.length; i--;) {
		DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
	}

	function createElement() {
		var vnode = preact.h.apply(undefined, arguments);
		applyClassName(vnode);

		var ref = vnode.attributes && vnode.attributes.ref;
		if (currentComponent && ref && typeof ref === 'string') {
			vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
		}

		return vnode;
	}

	function cloneElement(element, props) {
		for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
			children[_key2 - 2] = arguments[_key2];
		}

		return createElement.apply(undefined, [element.nodeName || element.type, extend({}, element.attributes || element.props || {}, props)].concat(children));
	}

	function isValidElement(element) {
		return element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE;
	}

	function createStringRefProxy(name, component) {
		return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
			component.refs[name] = resolved;
			if (resolved === null) {
				delete component._refProxies[name];
				component = null;
			}
		});
	}

	function applyClassName(_ref) {
		var attributes = _ref.attributes;

		if (!attributes) return;
		var cl = attributes.className || attributes.class;
		if (cl) attributes.className = cl;
	}

	function extend(base) {
		for (var _len3 = arguments.length, objs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			objs[_key3 - 1] = arguments[_key3];
		}

		for (var i = 0; i < objs.length; i++) {
			for (var key in objs[i]) {
				if (objs[i].hasOwnProperty(key)) {
					var v = objs[i][key];
					if (v !== null && v !== undefined) {
						base[key] = v;
					}
				}
			}
		}
		return base;
	}

	var findDOMNode = function (component) {
		return component.base || component;
	};

	function F() {}

	function createClass(obj) {
		var cl = function (props, context) {
			Component$1.call(this, props, context, BYPASS_HOOK);
			extend(this, obj);
			bindAll(this);
			newComponentHook.call(this, props, context);
		};

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
		for (var i in ctx) {
			var v = ctx[i];
			if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
				(ctx[i] = v.bind(ctx)).__bound = true;
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
		for (var _len4 = arguments.length, hooks = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			hooks[_key4] = arguments[_key4];
		}

		return function () {
			var ret = undefined;

			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			for (var i = 0; i < hooks.length; i++) {
				var r = callMethod(this, hooks[i], args);
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

	var Component$1 = function (_PreactComponent) {
		babelHelpers.inherits(Component, _PreactComponent);

		function Component(props, context, opts) {
			babelHelpers.classCallCheck(this, Component);

			var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, props, context));

			_this.refs = {};
			_this._refProxies = {};
			if (opts !== BYPASS_HOOK) {
				newComponentHook.call(_this, props, context);
			}
			return _this;
		}

		babelHelpers.createClass(Component, [{
			key: 'getDOMNode',
			value: function getDOMNode() {
				return this.base;
			}
		}, {
			key: 'isMounted',
			value: function isMounted() {
				return !!this.base;
			}
		}]);
		return Component;
	}(preact.Component);

	var index = { DOM: DOM, PropTypes: PropTypes, Children: Children, render: render$1, createClass: createClass, createFactory: createFactory, createElement: createElement, cloneElement: cloneElement, isValidElement: isValidElement, findDOMNode: findDOMNode, unmountComponentAtNode: unmountComponentAtNode, Component: Component$1 };

	exports.DOM = DOM;
	exports.PropTypes = PropTypes;
	exports.Children = Children;
	exports.render = render$1;
	exports.createClass = createClass;
	exports.createFactory = createFactory;
	exports.createElement = createElement;
	exports.cloneElement = cloneElement;
	exports.isValidElement = isValidElement;
	exports.findDOMNode = findDOMNode;
	exports.unmountComponentAtNode = unmountComponentAtNode;
	exports.Component = Component$1;
	exports['default'] = index;

}));
//# sourceMappingURL=preact-compat.js.map