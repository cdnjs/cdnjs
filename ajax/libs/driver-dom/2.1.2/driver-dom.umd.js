(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.DriverDOM = {}));
}(this, (function (exports) {
  /**
   * Driver for Web DOM
   **/
  var _require = require('./warning'),
      warnForReplacedHydratebleElement = _require.warnForReplacedHydratebleElement,
      warnForDeletedHydratableElement = _require.warnForDeletedHydratableElement,
      warnForInsertedHydratedElement = _require.warnForInsertedHydratedElement;

  var RPX_REG = /[-+]?\d*\.?\d+(rpx)/g; // opacity -> opa
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
  var viewportWidth = 750;
  var unitPrecision = 4;
  /**
   * Set viewport width.
   * @param viewport {Number} Viewport width, default to 750.
   */


  function setViewportWidth(viewport) {
    viewportWidth = viewport;
  }
  /**
   * Set unit precision.
   * @param n {Number} Unit precision, default to 4.
   */

  function setUnitPrecision(n) {
    unitPrecision = n;
  }
  /**
   * Set a function to transform unit of pixel,
   * default to passthrough.
   * @param {Function} transformer function
   */

  function setDecimalPixelTransformer(transformer) {
  }

  function unitTransformer(n) {
    return toFixed(parseFloat(n) / (viewportWidth / 100), unitPrecision) + 'vw';
  }

  function toFixed(number, precision) {
    var multiplier = Math.pow(10, precision + 1);
    var wholeNumber = Math.floor(number * multiplier);
    return Math.round(wholeNumber / 10) * 10 / multiplier;
  }
  /**
   * Create a cached version of a pure function.
   */


  function cached(fn) {
    var cache = Object.create(null);
    return function cachedFn(str) {
      return cache[str] || (cache[str] = fn(str));
    };
  }

  function calcRpxToVw(value) {
    return value.replace(RPX_REG, unitTransformer);
  }

  function isRpx(str) {
    return RPX_REG.test(str);
  } // Cache the convert fn.


  var convertUnit = cached(function (value) {
    return isRpx(value) ? calcRpxToVw(value) : value;
  });
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
   * @param {boolean} __shouldConvertRpxToVw should transfrom rpx to vw
   */


  function createElement(type, props, component, __shouldConvertUnitlessToRpx, __shouldConvertRpxToVw) {
    if (__shouldConvertRpxToVw === void 0) {
      __shouldConvertRpxToVw = true;
    }

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
                var stylePropName = hydrationChild.style[l - 1];
                var camelizedStyleName = camelizeStyleName(stylePropName);

                if (propValue[camelizedStyleName] == null) {
                  hydrationChild.style[camelizedStyleName] = EMPTY;
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
          setStyle(node, value, __shouldConvertUnitlessToRpx, __shouldConvertRpxToVw);
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
   * @param {boolean} __shouldConvertRpxToVw should transfrom rpx to vw
   */

  function setStyle(node, style, __shouldConvertUnitlessToRpx, __shouldConvertRpxToVw) {
    if (__shouldConvertRpxToVw === void 0) {
      __shouldConvertRpxToVw = true;
    }

    for (var prop in style) {
      var value = style[prop];
      var convertedValue = void 0;

      if (typeof value === 'number' && isDimensionalProp(prop)) {
        if (__shouldConvertUnitlessToRpx) {
          convertedValue = value + 'rpx';

          if (__shouldConvertRpxToVw) {
            // Transfrom rpx to vw
            convertedValue = convertUnit(convertedValue);
          }
        } else {
          convertedValue = value + 'px';
        }
      } else {
        convertedValue = __shouldConvertRpxToVw ? convertUnit(value) : value;
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
  exports.setDecimalPixelTransformer = setDecimalPixelTransformer;
  exports.setStyle = setStyle;
  exports.setTagNamePrefix = setTagNamePrefix;
  exports.setUnitPrecision = setUnitPrecision;
  exports.setViewportWidth = setViewportWidth;
  exports.updateText = updateText;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=driver-dom.umd.js.map
