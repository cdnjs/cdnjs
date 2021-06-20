(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DriverDOM = {}));
}(this, (function (exports) {
	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	function isUndef(type) {
	  return type === 'undefined';
	}

	var isWeb = !isUndef(typeof window) && 'onload' in window;
	var isNode = !isUndef(typeof process) && !!(process.versions && process.versions.node);
	var isWeex = !isUndef(typeof WXEnvironment) && WXEnvironment.platform !== 'Web';
	var isKraken = !isUndef(typeof __kraken__);
	var isMiniApp = !isUndef(typeof my) && my !== null && !isUndef(typeof my.alert);
	var isByteDanceMicroApp = !isUndef(typeof tt) && tt !== null && !isUndef(typeof tt) && !isUndef(tt.showToast);
	var isBaiduSmartProgram = !isUndef(typeof swan) && swan !== null && !isUndef(typeof swan) && !isUndef(swan.showToast);
	var isKuaiShouMiniProgram = !isUndef(typeof ks) && ks !== null && !isUndef(typeof ks) && !isUndef(ks.showToast); // In wechat mini program, wx.login is a function
	// In wechat mini propgram webview, there is no wx.login, but exist wx.miniProgram
	// In bytedance maicro app, there is wx variable.

	var isWeChatMiniProgram = !isByteDanceMicroApp && !isUndef(typeof wx) && wx !== null && (!isUndef(typeof wx.login) || !isUndef(typeof wx.miniProgram));
	var isQuickApp = !isUndef(typeof global) && global !== null && !isUndef(typeof global.callNative) && !isWeex;
	var index = {
	  isWeb: isWeb,
	  isNode: isNode,
	  isWeex: isWeex,
	  isKraken: isKraken,
	  isMiniApp: isMiniApp,
	  isByteDanceMicroApp: isByteDanceMicroApp,
	  isBaiduSmartProgram: isBaiduSmartProgram,
	  isKuaiShouMiniProgram: isKuaiShouMiniProgram,
	  isWeChatMiniProgram: isWeChatMiniProgram,
	  isQuickApp: isQuickApp
	};

	var es = {
		__proto__: null,
		isWeb: isWeb,
		isNode: isNode,
		isWeex: isWeex,
		isKraken: isKraken,
		isMiniApp: isMiniApp,
		isByteDanceMicroApp: isByteDanceMicroApp,
		isBaiduSmartProgram: isBaiduSmartProgram,
		isKuaiShouMiniProgram: isKuaiShouMiniProgram,
		isWeChatMiniProgram: isWeChatMiniProgram,
		isQuickApp: isQuickApp,
		'default': index
	};

	var _env = /*@__PURE__*/getAugmentedNamespace(es);

	var lib = createCommonjsModule(function (module, exports) {

	  exports.__esModule = true;
	  Object.keys(_env).forEach(function (key) {
	    if (key === "default" || key === "__esModule") return;
	    if (key in exports && exports[key] === _env[key]) return;
	    exports[key] = _env[key];
	  });
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}
	var RPX_REG = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)rpx/g;

	var __rpx_coefficient__;

	var __viewport_width__; // convertUnit method targetPlatform


	var targetPlatform = lib.isWeb ? 'web' : lib.isWeex ? 'weex' : ''; // Init toFixed method

	var unitPrecision = 4;

	var toFixed = function toFixed(number, precision) {
	  var multiplier = Math.pow(10, precision + 1);
	  var wholeNumber = Math.floor(number * multiplier);
	  return Math.round(wholeNumber / 10) * 10 / multiplier;
	}; // Dedault decimal px transformer.


	var decimalPixelTransformer = function decimalPixelTransformer(rpx, $1) {
	  return $1 ? parseFloat(rpx) * getRpx() + 'px' : rpx;
	}; // Default decimal vw transformer.


	var decimalVWTransformer = function decimalVWTransformer(rpx, $1) {
	  return $1 ? toFixed(parseFloat(rpx) / (getViewportWidth() / 100), unitPrecision) + 'vw' : rpx;
	}; // Default 1 rpx to 1 px


	if (getRpx() === undefined) {
	  setRpx(1);
	} // Viewport width, default to 750.


	if (getViewportWidth() === undefined) {
	  setViewportWidth(750);
	}

	var CustomMap = /*#__PURE__*/function () {
	  function CustomMap() {
	    _defineProperty(this, "__store", {});
	  }

	  var _proto = CustomMap.prototype;

	  _proto.set = function set(key, value) {
	    this.__store[key + "_" + typeof key] = value;
	  };

	  _proto.get = function get(key) {
	    return this.__store[key + "_" + typeof key];
	  };

	  _proto.has = function has(key) {
	    return Object.prototype.hasOwnProperty.call(this.__store, key + "_" + typeof key);
	  };

	  return CustomMap;
	}();
	/**
	 * Is string contains rpx
	 * note: rpx is an alias to rpx
	 * @param {String} str
	 * @returns {Boolean}
	 */


	function isRpx(str) {
	  return typeof str === 'string' && RPX_REG.test(str);
	}
	/**
	 * Calculate rpx
	 * @param {String} str
	 * @returns {String}
	 */

	function calcRpx(str) {
	  if (targetPlatform === 'web') {
	    // In Web convert rpx to 'vw', same as driver-dom and driver-universal
	    // '375rpx' => '50vw'
	    return str.replace(RPX_REG, decimalVWTransformer);
	  } else if (targetPlatform === 'weex') {
	    // In Weex convert rpx to 'px'
	    // '375rpx' => 375 * px
	    return str.replace(RPX_REG, decimalPixelTransformer);
	  } else {
	    // Other platform return original value, like Mini-App and WX Mini-Program ...
	    // '375rpx' => '375rpx'
	    return str;
	  }
	}
	function getRpx() {
	  return __rpx_coefficient__;
	}
	function setRpx(rpx) {
	  __rpx_coefficient__ = rpx;
	}
	function getViewportWidth() {
	  return __viewport_width__;
	}
	function setViewportWidth(viewport) {
	  __viewport_width__ = viewport;
	}
	/**
	 * Set unit precision.
	 * @param n {Number} Unit precision, default to 4.
	 */

	function setUnitPrecision(n) {
	  unitPrecision = n;
	}
	/**
	 * Create a cached version of a pure function.
	 * Use the first params as cache key.
	 */

	function cached(fn) {
	  var cache = new CustomMap();
	  return function cachedFn() {
	    var key = arguments.length <= 0 ? undefined : arguments[0];
	    if (!cache.has(key)) cache.set(key, fn.apply(void 0, arguments));
	    return cache.get(key);
	  };
	}
	function setTargetPlatform(platform) {
	  targetPlatform = platform;
	}
	/**
	 * Convert rpx.
	 * @param value
	 * @param prop
	 * @param platform
	 * @return {String} Transformed value.
	 */

	var convertUnit = cached(function (value, prop, platform) {
	  if (platform) {
	    setTargetPlatform(platform);
	  }

	  return isRpx(value) ? calcRpx(value) : value;
	});

	var didWarnInvalidHydration = false;

	function warnForReplacedHydratebleElement(parentNode, clientNode, serverNode) {
	  {
	    if (didWarnInvalidHydration) {
	      return;
	    } // should not warn for replace comment, bescause it may be a placeholder from server


	    if (serverNode.nodeType === 8) {
	      return;
	    }

	    didWarnInvalidHydration = true;
	    warning('Expected server HTML to contain a matching %s in %s, but got %s.', getNodeName(clientNode), getNodeName(parentNode), getNodeName(serverNode));
	  }
	}
	function warnForDeletedHydratableElement(parentNode, child) {
	  {
	    if (didWarnInvalidHydration) {
	      return;
	    }

	    didWarnInvalidHydration = true;
	    warning('Did not expect server HTML to contain a %s in %s.', getNodeName(child), getNodeName(parentNode));
	  }
	}
	function warnForInsertedHydratedElement(parentNode, node) {
	  {
	    if (didWarnInvalidHydration) {
	      return;
	    }

	    didWarnInvalidHydration = true;
	    warning('Expected server HTML to contain a matching %s in %s.', getNodeName(node), getNodeName(parentNode));
	  }
	}
	/**
	 * Concat tagName、 id and class info to help locate a node
	 * @param {*} node HTMLElement
	 * @returns {string} for example: <div#home.rax-view.home>
	 */

	function getNodeName(node) {
	  // text node don`t have tagName
	  if (!node.tagName) {
	    return node.nodeName;
	  }

	  var name = node.tagName.toLowerCase();
	  var id = node.id ? '#' + node.id : '';
	  var classStr = node.className || '';
	  var classList = classStr.split(' ').map(function (className) {
	    return className ? '.' + className : '';
	  });
	  return "<" + name + id + classList.join('') + ">";
	}

	var warning = function warning() {};

	{
	  warning = function warning(template) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (typeof console !== 'undefined') {
	      var argsWithFormat = args.map(function (item) {
	        return '' + item;
	      });
	      argsWithFormat.unshift('Warning: ' + template); // Don't use spread (or .apply) directly because it breaks IE9

	      Function.prototype.apply.call(console.error, console, argsWithFormat);
	    } // For works in DevTools when enable `Pause on caught exceptions`
	    // that can find the component where caused this warning


	    try {
	      var argIndex = 0;
	      var message = 'Warning: ' + template.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      throw new Error(message);
	    } catch (e) {}
	  };
	}

	/**
	 * Driver for Web DOM
	 **/
	// fontWeight -> ntw
	// lineHeight|lineClamp -> ne[ch]
	// flex|flexGrow|flexPositive|flexShrink|flexNegative|boxFlex|boxFlexGroup|zIndex -> ex(?:s|g|n|p|$)
	// order -> ^ord
	// zoom -> zoo
	// gridArea|gridRow|gridRowEnd|gridRowSpan|gridRowStart|gridColumn|gridColumnEnd|gridColumnSpan|gridColumnStart -> grid
	// columnCount -> mnc
	// tabSize -> bs
	// orphans -> orp
	// windows -> ows
	// animationIterationCount -> onit
	// borderImageOutset|borderImageSlice|borderImageWidth -> erim

	var NON_DIMENSIONAL_REG = /opa|ntw|ne[ch]|ex(?:s|g|n|p|$)|^ord|zoo|grid|orp|ows|mnc|^columns$|bs|erim|onit/i;
	var EVENT_PREFIX_REG = /^on[A-Z]/;
	var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
	var HTML = '__html';
	var INNER_HTML = 'innerHTML';
	var CLASS_NAME = 'className';
	var CLASS = 'class';
	var STYLE = 'style';
	var CHILDREN = 'children';
	var TEXT_CONTENT_ATTR = 'textContent';
	var CREATE_ELEMENT = 'createElement';
	var CREATE_COMMENT = 'createComment';
	var CREATE_TEXT_NODE = 'createTextNode';
	var SET_ATTRIBUTE = 'setAttribute';
	var REMOVE_ATTRIBUTE = 'removeAttribute';
	var SVG_NS = 'http://www.w3.org/2000/svg';
	var TEXT_NODE = 3;
	var COMMENT_NODE = 8;
	var TEXT_SPLIT_COMMENT = '|';
	var EMPTY = '';
	var HYDRATION_INDEX = '__i';
	var HYDRATION_APPEND = '__a';
	var WITH_INNERHTML = '__h';

	var tagNamePrefix = EMPTY; // Flag indicating if the diff is currently within an SVG

	var isSVGMode = false;
	var isHydrating = false;
	/**
	 * Camelize CSS property.
	 * Vendor prefixes should begin with a capital letter.
	 * For example:
	 * background-color -> backgroundColor
	 * -webkit-transition -> webkitTransition
	 */

	var camelizeStyleName = cached(function (name) {
	  return name.replace(/-([a-z])/gi, function (s, g) {
	    return g.toUpperCase();
	  });
	});
	var isDimensionalProp = cached(function (prop) {
	  return !NON_DIMENSIONAL_REG.test(prop);
	});
	var isEventProp = cached(function (prop) {
	  return EVENT_PREFIX_REG.test(prop);
	});
	function setTagNamePrefix(prefix) {
	  tagNamePrefix = prefix;
	}
	function createBody() {
	  return document.body;
	}
	function createEmpty(component) {
	  var parent = component._parent;
	  var node;

	  if (isHydrating) {
	    var hydrationChild = findHydrationChild(parent);

	    if (hydrationChild) {
	      if (hydrationChild.nodeType === COMMENT_NODE) {
	        return hydrationChild;
	      } else {
	        node = document[CREATE_COMMENT](EMPTY);
	        replaceChild(node, hydrationChild, parent);
	      }
	    } else {
	      node = document[CREATE_COMMENT](EMPTY);
	      node[HYDRATION_APPEND] = true;
	    }
	  } else {
	    node = document[CREATE_COMMENT](EMPTY);
	  }

	  return node;
	}
	function createText(text, component) {
	  var parent = component._parent;
	  var node;

	  if (isHydrating) {
	    var hydrationChild = findHydrationChild(parent);

	    if (hydrationChild) {
	      if (hydrationChild.nodeType === TEXT_NODE) {
	        if (text !== hydrationChild[TEXT_CONTENT_ATTR]) {
	          hydrationChild[TEXT_CONTENT_ATTR] = text;
	        }

	        return hydrationChild;
	      } else {
	        node = document[CREATE_TEXT_NODE](text);
	        replaceChild(node, hydrationChild, parent);
	      }
	    } else {
	      node = document[CREATE_TEXT_NODE](text);
	      node[HYDRATION_APPEND] = true;
	    }
	  } else {
	    node = document[CREATE_TEXT_NODE](text);
	  }

	  return node;
	}
	function updateText(node, text) {
	  node[TEXT_CONTENT_ATTR] = text;
	}

	function findHydrationChild(parent) {
	  var childNodes = parent.childNodes;

	  if (parent[HYDRATION_INDEX] == null) {
	    parent[HYDRATION_INDEX] = 0;
	  }

	  var child = childNodes[parent[HYDRATION_INDEX]++]; // If child is an comment node for spliting text node, use the next node.

	  if (child && child.nodeType === COMMENT_NODE && child.data === TEXT_SPLIT_COMMENT) {
	    return childNodes[parent[HYDRATION_INDEX]++];
	  } else {
	    return child;
	  }
	}
	/**
	 * @param {string} type node type
	 * @param {object} props elemement properties
	 * @param {object} component component instance
	 * @param {boolean} __shouldConvertUnitlessToRpx should add unit when missing
	 */


	function createElement(type, props, component, __shouldConvertUnitlessToRpx) {
	  var parent = component._parent;
	  isSVGMode = type === 'svg' || parent && parent.namespaceURI === SVG_NS;
	  var node;
	  var hydrationChild = null;

	  function createNode() {
	    if (isSVGMode) {
	      node = document.createElementNS(SVG_NS, type);
	    } else if (tagNamePrefix) {
	      var _tagNamePrefix = typeof _tagNamePrefix === 'function' ? _tagNamePrefix(type) : _tagNamePrefix;

	      node = document[CREATE_ELEMENT](_tagNamePrefix + type);
	    } else {
	      node = document[CREATE_ELEMENT](type);
	    }
	  }

	  if (isHydrating) {
	    hydrationChild = findHydrationChild(parent);

	    if (hydrationChild) {
	      if (type === hydrationChild.nodeName.toLowerCase()) {
	        for (var attributes = hydrationChild.attributes, i = attributes.length; i--;) {
	          var attribute = attributes[i];
	          var attributeName = attribute.name;
	          var propValue = props[attributeName];

	          if ( // The class or className prop all not in props
	          attributeName === CLASS && props[CLASS_NAME] == null && propValue == null || // The style prop is empty object or not in props
	          attributeName === STYLE && (propValue == null || Object.keys(propValue).length === 0) || // Remove rendered node attribute that not existed
	          attributeName !== CLASS && attributeName !== STYLE && propValue == null) {
	            hydrationChild[REMOVE_ATTRIBUTE](attributeName);
	            continue;
	          }

	          if (attributeName === STYLE) {
	            // Remove invalid style prop, and direct reset style to child avoid diff style
	            // Set style to empty will change the index of style, so here need to traverse style backwards
	            for (var l = hydrationChild.style.length; 0 < l; l--) {
	              // Prop name get from node style is hyphenated, eg: background-color
	              var stylePropName = hydrationChild.style[l - 1]; // Style with webkit prefix, will cause stylePropName be undefined in iOS 10.1 and 10.2.
	              // Eg. when set transition-timing-function to be empty, it will also delete -webkit-transition-timing-function.

	              if (stylePropName) {
	                var camelizedStyleName = camelizeStyleName(stylePropName);

	                if (propValue[camelizedStyleName] == null) {
	                  hydrationChild.style[camelizedStyleName] = EMPTY;
	                }
	              }
	            }
	          }
	        }

	        node = hydrationChild;
	      } else {
	        createNode();
	        replaceChild(node, hydrationChild, parent);

	        {
	          warnForReplacedHydratebleElement(parent, node, hydrationChild);
	        }
	      }
	    } else {
	      createNode();
	      node[HYDRATION_APPEND] = true;

	      {
	        warnForInsertedHydratedElement(parent, node);
	      }
	    }
	  } else {
	    createNode();
	  }

	  for (var prop in props) {
	    var value = props[prop];
	    if (prop === CHILDREN) continue;

	    if (value != null) {
	      if (prop === STYLE) {
	        setStyle(node, value, __shouldConvertUnitlessToRpx);
	      } else if (isEventProp(prop)) {
	        addEventListener(node, prop.slice(2).toLowerCase(), value);
	      } else {
	        setAttribute(node, prop, value, isSVGMode);
	      }
	    }
	  }

	  return node;
	}
	function appendChild(node, parent) {
	  if (!isHydrating || node[HYDRATION_APPEND]) {
	    return parent.appendChild(node);
	  }
	}
	function removeChild(node, parent) {
	  parent = parent || node.parentNode; // Maybe has been removed when remove child

	  if (parent) {
	    parent.removeChild(node);
	  }
	}
	function replaceChild(newChild, oldChild, parent) {
	  parent = parent || oldChild.parentNode;
	  parent.replaceChild(newChild, oldChild);
	}
	function insertAfter(node, after, parent) {
	  parent = parent || after.parentNode;
	  var nextSibling = after.nextSibling;

	  if (nextSibling) {
	    // Performance improve when node has been existed before nextSibling
	    if (nextSibling !== node) {
	      insertBefore(node, nextSibling, parent);
	    }
	  } else {
	    appendChild(node, parent);
	  }
	}
	function insertBefore(node, before, parent) {
	  parent = parent || before.parentNode;
	  parent.insertBefore(node, before);
	}
	function addEventListener(node, eventName, eventHandler) {
	  return node.addEventListener(eventName, eventHandler);
	}
	function removeEventListener(node, eventName, eventHandler) {
	  return node.removeEventListener(eventName, eventHandler);
	}
	function removeAttribute(node, propKey) {
	  if (propKey === DANGEROUSLY_SET_INNER_HTML) {
	    return node[INNER_HTML] = null;
	  }

	  if (propKey === CLASS_NAME) propKey = CLASS;

	  if (propKey in node) {
	    try {
	      // Some node property is readonly when in strict mode
	      node[propKey] = null;
	    } catch (e) {}
	  }

	  node[REMOVE_ATTRIBUTE](propKey);
	}
	function setAttribute(node, propKey, propValue, isSvg) {
	  if (propKey === DANGEROUSLY_SET_INNER_HTML) {
	    // For reduce innerHTML operation to improve performance.
	    if (node[INNER_HTML] !== propValue[HTML]) {
	      node[INNER_HTML] = propValue[HTML];
	    }

	    node[WITH_INNERHTML] = true;
	    return;
	  }

	  if (propKey === CLASS_NAME) propKey = CLASS; // Prop for svg can only be set by attribute

	  if (!isSvg && propKey in node) {
	    try {
	      // Some node property is readonly when in strict mode
	      node[propKey] = propValue;
	    } catch (e) {
	      node[SET_ATTRIBUTE](propKey, propValue);
	    }
	  } else {
	    node[SET_ATTRIBUTE](propKey, propValue);
	  }
	}
	/**
	 * @param {object} node target node
	 * @param {object} style target node style value
	 * @param {boolean} __shouldConvertUnitlessToRpx
	 */

	function setStyle(node, style, __shouldConvertUnitlessToRpx) {
	  for (var prop in style) {
	    var value = style[prop];
	    var convertedValue = void 0;

	    if (typeof value === 'number' && isDimensionalProp(prop)) {
	      if (__shouldConvertUnitlessToRpx) {
	        convertedValue = value + 'rpx'; // Transfrom rpx to vw

	        convertedValue = convertUnit(convertedValue);
	      } else {
	        convertedValue = value + 'px';
	      }
	    } else {
	      convertedValue = convertUnit(value);
	    } // Support CSS custom properties (variables) like { --main-color: "black" }


	    if (prop[0] === '-' && prop[1] === '-') {
	      // reference: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty.
	      // style.setProperty do not support Camel-Case style properties.
	      node.style.setProperty(prop, convertedValue);
	    } else {
	      node.style[prop] = convertedValue;
	    }
	  }
	}
	function beforeRender(_ref) {
	  var hydrate = _ref.hydrate;

	  // Nested render may reset `isHydrating`, `recolectHydrationChild` will not work correctly after render.
	  if (isHydrating && !hydrate) {
	    {
	      throw new Error('Nested render is not allowed when hydrating. ' + 'If necessary, trigger render in useEffect.');
	    }
	  }

	  isHydrating = hydrate;
	}

	function recolectHydrationChild(hydrationParent) {
	  // Should not to compare node with dangerouslySetInnerHTML because vdomLength is alway 0
	  if (hydrationParent[WITH_INNERHTML]) {
	    return;
	  }

	  var nativeLength = hydrationParent.childNodes.length;
	  var vdomLength = hydrationParent[HYDRATION_INDEX] || 0;

	  if (nativeLength - vdomLength > 0) {
	    for (var i = nativeLength - 1; i >= vdomLength; i--) {
	      {
	        warnForDeletedHydratableElement(hydrationParent, hydrationParent.childNodes[i]);
	      }

	      hydrationParent.removeChild(hydrationParent.childNodes[i]);
	    }
	  }

	  for (var j = hydrationParent.childNodes.length - 1; j >= 0; j--) {
	    recolectHydrationChild(hydrationParent.childNodes[j]);
	  }
	}

	function afterRender(_ref2) {
	  var container = _ref2.container;

	  if (isHydrating) {
	    // Remove native node when more then vdom node
	    recolectHydrationChild(container);
	    isHydrating = false;
	  }
	}
	/**
	 * Remove all children from node.
	 * @NOTE: Optimization at web.
	 */

	function removeChildren(node) {
	  node.textContent = EMPTY;
	}

	exports.addEventListener = addEventListener;
	exports.afterRender = afterRender;
	exports.appendChild = appendChild;
	exports.beforeRender = beforeRender;
	exports.createBody = createBody;
	exports.createElement = createElement;
	exports.createEmpty = createEmpty;
	exports.createText = createText;
	exports.insertAfter = insertAfter;
	exports.insertBefore = insertBefore;
	exports.removeAttribute = removeAttribute;
	exports.removeChild = removeChild;
	exports.removeChildren = removeChildren;
	exports.removeEventListener = removeEventListener;
	exports.replaceChild = replaceChild;
	exports.setAttribute = setAttribute;
	exports.setStyle = setStyle;
	exports.setTagNamePrefix = setTagNamePrefix;
	exports.setUnitPrecision = setUnitPrecision;
	exports.setViewportWidth = setViewportWidth;
	exports.updateText = updateText;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=driver-dom.umd.js.map
