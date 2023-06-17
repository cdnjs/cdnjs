/*! InstantSearch.js 4.54.0 | © Algolia, Inc. and contributors; MIT License | https://github.com/algolia/instantsearch.js */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.instantsearch = factory());
}(this, (function () { 'use strict';

  function capitalize(text) {
    return text.toString().charAt(0).toUpperCase() + text.toString().slice(1);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure " + obj);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  function noop() {}

  /**
   * Logs a warning when this function is called, in development environment only.
   */
  var deprecate = function deprecate(fn, message) {
    return fn;
  };

  /**
   * Logs a warning
   * This is used to log issues in development environment only.
   */
  var warn = noop;

  /**
   * Logs a warning if the condition is not met.
   * This is used to log issues in development environment only.
   */
  var _warning = noop;
  {
    warn = function warn(message) {
      // eslint-disable-next-line no-console
      console.warn("[InstantSearch.js]: ".concat(message.trim()));
    };
    deprecate = function deprecate(fn, message) {
      var hasAlreadyPrinted = false;
      return function () {
        if (!hasAlreadyPrinted) {
          hasAlreadyPrinted = true;
           warn(message) ;
        }
        return fn.apply(void 0, arguments);
      };
    };
    _warning = function warning(condition, message) {
      if (condition) {
        return;
      }
      var hasAlreadyPrinted = _warning.cache[message];
      if (!hasAlreadyPrinted) {
        _warning.cache[message] = true;
         warn(message) ;
      }
    };
    _warning.cache = {};
  }

  /**
   * A typed version of Object.keys, to use when looping over a static object
   * inspired from https://stackoverflow.com/a/65117465/3185307
   */
  var keys = Object.keys;

  // Some connectors are responsible for multiple widgets so we need
  // to map them.
  function getWidgetNames(connectorName) {
    switch (connectorName) {
      case 'range':
        return [];
      case 'menu':
        return ['menu', 'menuSelect'];
      default:
        return [connectorName];
    }
  }
  var stateToWidgetsMap = {
    query: {
      connectors: ['connectSearchBox'],
      widgets: ['ais.searchBox', 'ais.autocomplete', 'ais.voiceSearch']
    },
    refinementList: {
      connectors: ['connectRefinementList'],
      widgets: ['ais.refinementList']
    },
    menu: {
      connectors: ['connectMenu'],
      widgets: ['ais.menu']
    },
    hierarchicalMenu: {
      connectors: ['connectHierarchicalMenu'],
      widgets: ['ais.hierarchicalMenu']
    },
    numericMenu: {
      connectors: ['connectNumericMenu'],
      widgets: ['ais.numericMenu']
    },
    ratingMenu: {
      connectors: ['connectRatingMenu'],
      widgets: ['ais.ratingMenu']
    },
    range: {
      connectors: ['connectRange'],
      widgets: ['ais.rangeInput', 'ais.rangeSlider', 'ais.range']
    },
    toggle: {
      connectors: ['connectToggleRefinement'],
      widgets: ['ais.toggleRefinement']
    },
    geoSearch: {
      connectors: ['connectGeoSearch'],
      widgets: ['ais.geoSearch']
    },
    sortBy: {
      connectors: ['connectSortBy'],
      widgets: ['ais.sortBy']
    },
    page: {
      connectors: ['connectPagination'],
      widgets: ['ais.pagination', 'ais.infiniteHits']
    },
    hitsPerPage: {
      connectors: ['connectHitsPerPage'],
      widgets: ['ais.hitsPerPage']
    },
    configure: {
      connectors: ['connectConfigure'],
      widgets: ['ais.configure']
    },
    places: {
      connectors: [],
      widgets: ['ais.places']
    }
  };
  function checkIndexUiState(_ref) {
    var index = _ref.index,
      indexUiState = _ref.indexUiState;
    var mountedWidgets = index.getWidgets().map(function (widget) {
      return widget.$$type;
    }).filter(Boolean);
    var missingWidgets = keys(indexUiState).reduce(function (acc, parameter) {
      var widgetUiState = stateToWidgetsMap[parameter];
      if (!widgetUiState) {
        return acc;
      }
      var requiredWidgets = widgetUiState.widgets;
      if (requiredWidgets && !requiredWidgets.some(function (requiredWidget) {
        return mountedWidgets.includes(requiredWidget);
      })) {
        acc.push([parameter, {
          connectors: widgetUiState.connectors,
          widgets: widgetUiState.widgets.map(function (widgetIdentifier) {
            return widgetIdentifier.split('ais.')[1];
          })
        }]);
      }
      return acc;
    }, []);
     _warning(missingWidgets.length === 0, "The UI state for the index \"".concat(index.getIndexId(), "\" is not consistent with the widgets mounted.\n\nThis can happen when the UI state is specified via `initialUiState`, `routing` or `setUiState` but that the widgets responsible for this state were not added. This results in those query parameters not being sent to the API.\n\nTo fully reflect the state, some widgets need to be added to the index \"").concat(index.getIndexId(), "\":\n\n").concat(missingWidgets.map(function (_ref2) {
      var _ref4;
      var _ref3 = _slicedToArray(_ref2, 2),
        stateParameter = _ref3[0],
        widgets = _ref3[1].widgets;
      return "- `".concat(stateParameter, "` needs one of these widgets: ").concat((_ref4 = []).concat.apply(_ref4, _toConsumableArray(widgets.map(function (name) {
        return getWidgetNames(name);
      }))).map(function (name) {
        return "\"".concat(name, "\"");
      }).join(', '));
    }).join('\n'), "\n\nIf you do not wish to display widgets but still want to support their search parameters, you can mount \"virtual widgets\" that don't render anything:\n\n```\n").concat(missingWidgets.filter(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        _stateParameter = _ref6[0],
        connectors = _ref6[1].connectors;
      return connectors.length > 0;
    }).map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
        _stateParameter = _ref8[0],
        _ref8$ = _ref8[1],
        connectors = _ref8$.connectors,
        widgets = _ref8$.widgets;
      var capitalizedWidget = capitalize(widgets[0]);
      var connectorName = connectors[0];
      return "const virtual".concat(capitalizedWidget, " = ").concat(connectorName, "(() => null);");
    }).join('\n'), "\n\nsearch.addWidgets([\n  ").concat(missingWidgets.filter(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
        _stateParameter = _ref10[0],
        connectors = _ref10[1].connectors;
      return connectors.length > 0;
    }).map(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
        _stateParameter = _ref12[0],
        widgets = _ref12[1].widgets;
      var capitalizedWidget = capitalize(widgets[0]);
      return "virtual".concat(capitalizedWidget, "({ /* ... */ })");
    }).join(',\n  '), "\n]);\n```\n\nIf you're using custom widgets that do set these query parameters, we recommend using connectors instead.\n\nSee https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/js/#customize-the-complete-ui-of-the-widgets")) ;
  }

  function getObjectType(object) {
    return Object.prototype.toString.call(object).slice(8, -1);
  }

  function checkRendering(rendering, usage) {
    if (rendering === undefined || typeof rendering !== 'function') {
      throw new Error("The render function is not valid (received type ".concat(getObjectType(rendering), ").\n\n").concat(usage));
    }
  }

  /**
   * Clears the refinements of a SearchParameters object based on rules provided.
   * The included attributes list is applied before the excluded attributes list. If the list
   * is not provided, this list of all the currently refined attributes is used as included attributes.
   * @returns search parameters with refinements cleared
   */
  function clearRefinements(_ref) {
    var helper = _ref.helper,
      _ref$attributesToClea = _ref.attributesToClear,
      attributesToClear = _ref$attributesToClea === void 0 ? [] : _ref$attributesToClea;
    var finalState = helper.state.setPage(0);
    finalState = attributesToClear.reduce(function (state, attribute) {
      if (finalState.isNumericRefined(attribute)) {
        return state.removeNumericRefinement(attribute);
      }
      if (finalState.isHierarchicalFacet(attribute)) {
        return state.removeHierarchicalFacetRefinement(attribute);
      }
      if (finalState.isDisjunctiveFacet(attribute)) {
        return state.removeDisjunctiveFacetRefinement(attribute);
      }
      if (finalState.isConjunctiveFacet(attribute)) {
        return state.removeFacetRefinement(attribute);
      }
      return state;
    }, finalState);
    if (attributesToClear.indexOf('query') !== -1) {
      finalState = finalState.setQuery('');
    }
    return finalState;
  }

  /**
   * This implementation is taken from Lodash implementation.
   * See: https://github.com/lodash/lodash/blob/4.17.11-npm/escape.js
   */

  // Used to map characters to HTML entities.
  var htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  // Used to match HTML entities and HTML characters.
  var regexUnescapedHtml = /[&<>"']/g;
  var regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);

  /**
   * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
   * corresponding HTML entities.
   */
  function escape$1(value) {
    return value && regexHasUnescapedHtml.test(value) ? value.replace(regexUnescapedHtml, function (character) {
      return htmlEntities[character];
    }) : value;
  }

  /**
   * This implementation is taken from Lodash implementation.
   * See: https://github.com/lodash/lodash/blob/4.17.11-npm/unescape.js
   */

  // Used to map HTML entities to characters.
  var htmlCharacters = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  // Used to match HTML entities and HTML characters.
  var regexEscapedHtml = /&(amp|quot|lt|gt|#39);/g;
  var regexHasEscapedHtml = RegExp(regexEscapedHtml.source);

  /**
   * Converts the HTML entities "&", "<", ">", '"', and "'" in `string` to their
   * characters.
   */
  function unescape$1(value) {
    return value && regexHasEscapedHtml.test(value) ? value.replace(regexEscapedHtml, function (character) {
      return htmlCharacters[character];
    }) : value;
  }

  /**
   * This implementation is taken from Lodash implementation.
   * See: https://github.com/lodash/lodash/blob/master/isPlainObject.js
   */

  function getTag(value) {
    if (value === null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return Object.prototype.toString.call(value);
  }
  function isObjectLike(value) {
    return _typeof(value) === 'object' && value !== null;
  }

  /**
   * Checks if `value` is a plain object.
   *
   * A plain object is an object created by the `Object`
   * constructor or with a `[[Prototype]]` of `null`.
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
      return false;
    }
    if (Object.getPrototypeOf(value) === null) {
      return true;
    }
    var proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
  }

  var TAG_PLACEHOLDER = {
    highlightPreTag: '__ais-highlight__',
    highlightPostTag: '__/ais-highlight__'
  };
  var TAG_REPLACEMENT = {
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>'
  };
  function replaceTagsAndEscape(value) {
    return escape$1(value).replace(new RegExp(TAG_PLACEHOLDER.highlightPreTag, 'g'), TAG_REPLACEMENT.highlightPreTag).replace(new RegExp(TAG_PLACEHOLDER.highlightPostTag, 'g'), TAG_REPLACEMENT.highlightPostTag);
  }
  function recursiveEscape(input) {
    if (isPlainObject(input) && typeof input.value !== 'string') {
      return Object.keys(input).reduce(function (acc, key) {
        return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, recursiveEscape(input[key])));
      }, {});
    }
    if (Array.isArray(input)) {
      return input.map(recursiveEscape);
    }
    return _objectSpread2(_objectSpread2({}, input), {}, {
      value: replaceTagsAndEscape(input.value)
    });
  }
  function escapeHits(hits) {
    if (hits.__escaped === undefined) {
      // We don't override the value on hit because it will mutate the raw results
      // instead we make a shallow copy and we assign the escaped values on it.
      hits = hits.map(function (_ref) {
        var hit = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
        if (hit._highlightResult) {
          hit._highlightResult = recursiveEscape(hit._highlightResult);
        }
        if (hit._snippetResult) {
          hit._snippetResult = recursiveEscape(hit._snippetResult);
        }
        return hit;
      });
      hits.__escaped = true;
    }
    return hits;
  }
  function escapeFacets(facetHits) {
    return facetHits.map(function (h) {
      return _objectSpread2(_objectSpread2({}, h), {}, {
        highlighted: replaceTagsAndEscape(h.highlighted)
      });
    });
  }

  function concatHighlightedParts(parts) {
    var highlightPreTag = TAG_REPLACEMENT.highlightPreTag,
      highlightPostTag = TAG_REPLACEMENT.highlightPostTag;
    return parts.map(function (part) {
      return part.isHighlighted ? highlightPreTag + part.value + highlightPostTag : part.value;
    }).join('');
  }

  // copied from
  // https://github.com/algolia/autocomplete.js/blob/307a7acc4283e10a19cb7d067f04f1bea79dc56f/packages/autocomplete-core/src/utils/createConcurrentSafePromise.ts#L1:L1
  /**
   * Creates a runner that executes promises in a concurrent-safe way.
   *
   * This is useful to prevent older promises to resolve after a newer promise,
   * otherwise resulting in stale resolved values.
   */
  function createConcurrentSafePromise() {
    var basePromiseId = -1;
    var latestResolvedId = -1;
    var latestResolvedValue = undefined;
    return function runConcurrentSafePromise(promise) {
      var currentPromiseId = ++basePromiseId;
      return Promise.resolve(promise).then(function (x) {
        // The promise might take too long to resolve and get outdated. This would
        // result in resolving stale values.
        // When this happens, we ignore the promise value and return the one
        // coming from the latest resolved value.
        //
        // +----------------------------------+
        // |        100ms                     |
        // | run(1) +--->  R1                 |
        // |        300ms                     |
        // | run(2) +-------------> R2 (SKIP) |
        // |        200ms                     |
        // | run(3) +--------> R3             |
        // +----------------------------------+
        if (latestResolvedValue && currentPromiseId < latestResolvedId) {
          return latestResolvedValue;
        }
        latestResolvedId = currentPromiseId;
        latestResolvedValue = x;
        return x;
      });
    };
  }

  function isFacetRefined(helper, facet, value) {
    if (helper.state.isHierarchicalFacet(facet)) {
      return helper.state.isHierarchicalFacetRefined(facet, value);
    } else if (helper.state.isConjunctiveFacet(facet)) {
      return helper.state.isFacetRefined(facet, value);
    } else {
      return helper.state.isDisjunctiveFacetRefined(facet, value);
    }
  }

  function createSendEventForFacet(_ref) {
    var instantSearchInstance = _ref.instantSearchInstance,
      helper = _ref.helper,
      attr = _ref.attribute,
      widgetType = _ref.widgetType;
    var sendEventForFacet = function sendEventForFacet() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var eventType = args[0],
        facetValue = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;
      var attribute = typeof attr === 'string' ? attr : attr(facetValue);
      if (args.length === 1 && _typeof(args[0]) === 'object') {
        instantSearchInstance.sendEventToInsights(args[0]);
      } else if (eventType === 'click' && (args.length === 2 || args.length === 3)) {
        if (!isFacetRefined(helper, attribute, facetValue)) {
          // send event only when the facet is being checked "ON"
          instantSearchInstance.sendEventToInsights({
            insightsMethod: 'clickedFilters',
            widgetType: widgetType,
            eventType: eventType,
            payload: {
              eventName: eventName,
              index: helper.getIndex(),
              filters: ["".concat(attribute, ":").concat(facetValue)]
            },
            attribute: attribute
          });
        }
      } else {
        throw new Error("You need to pass two arguments like:\n  sendEvent('click', facetValue);\n\nIf you want to send a custom payload, you can pass one object: sendEvent(customPayload);\n");
      }
    };
    return sendEventForFacet;
  }

  function serializePayload(payload) {
    return btoa(encodeURIComponent(JSON.stringify(payload)));
  }
  function deserializePayload(serialized) {
    return JSON.parse(decodeURIComponent(atob(serialized)));
  }

  function chunk(arr) {
    var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var chunks = [];
    for (var i = 0; i < Math.ceil(arr.length / chunkSize); i++) {
      chunks.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return chunks;
  }
  var buildPayloads = function buildPayloads(_ref) {
    var index = _ref.index,
      widgetType = _ref.widgetType,
      methodName = _ref.methodName,
      args = _ref.args,
      instantSearchInstance = _ref.instantSearchInstance;
    // when there's only one argument, that means it's custom
    if (args.length === 1 && _typeof(args[0]) === 'object') {
      return [args[0]];
    }
    var eventType = args[0];
    var hits = args[1];
    var eventName = args[2];
    if (!hits) {
      {
        throw new Error("You need to pass hit or hits as the second argument like:\n  ".concat(methodName, "(eventType, hit);\n  "));
      }
    }
    if ((eventType === 'click' || eventType === 'conversion') && !eventName) {
      {
        throw new Error("You need to pass eventName as the third argument for 'click' or 'conversion' events like:\n  ".concat(methodName, "('click', hit, 'Product Purchased');\n\n  To learn more about event naming: https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/in-depth/clicks-conversions-best-practices/\n  "));
      }
    }
    var hitsArray = Array.isArray(hits) ? hits : [hits];
    if (hitsArray.length === 0) {
      return [];
    }
    var queryID = hitsArray[0].__queryID;
    var hitsChunks = chunk(hitsArray);
    var objectIDsByChunk = hitsChunks.map(function (batch) {
      return batch.map(function (hit) {
        return hit.objectID;
      });
    });
    var positionsByChunk = hitsChunks.map(function (batch) {
      return batch.map(function (hit) {
        return hit.__position;
      });
    });
    if (eventType === 'view') {
      if (instantSearchInstance.status !== 'idle') {
        return [];
      }
      return hitsChunks.map(function (batch, i) {
        return {
          insightsMethod: 'viewedObjectIDs',
          widgetType: widgetType,
          eventType: eventType,
          payload: {
            eventName: eventName || 'Hits Viewed',
            index: index,
            objectIDs: objectIDsByChunk[i]
          },
          hits: batch
        };
      });
    } else if (eventType === 'click') {
      return hitsChunks.map(function (batch, i) {
        return {
          insightsMethod: 'clickedObjectIDsAfterSearch',
          widgetType: widgetType,
          eventType: eventType,
          payload: {
            eventName: eventName,
            index: index,
            queryID: queryID,
            objectIDs: objectIDsByChunk[i],
            positions: positionsByChunk[i]
          },
          hits: batch
        };
      });
    } else if (eventType === 'conversion') {
      return hitsChunks.map(function (batch, i) {
        return {
          insightsMethod: 'convertedObjectIDsAfterSearch',
          widgetType: widgetType,
          eventType: eventType,
          payload: {
            eventName: eventName,
            index: index,
            queryID: queryID,
            objectIDs: objectIDsByChunk[i]
          },
          hits: batch
        };
      });
    } else {
      throw new Error("eventType(\"".concat(eventType, "\") is not supported.\n    If you want to send a custom payload, you can pass one object: ").concat(methodName, "(customPayload);\n    "));
    }
  };
  function createSendEventForHits(_ref2) {
    var instantSearchInstance = _ref2.instantSearchInstance,
      index = _ref2.index,
      widgetType = _ref2.widgetType;
    var sendEventForHits = function sendEventForHits() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var payloads = buildPayloads({
        widgetType: widgetType,
        index: index,
        methodName: 'sendEvent',
        args: args,
        instantSearchInstance: instantSearchInstance
      });
      payloads.forEach(function (payload) {
        return instantSearchInstance.sendEventToInsights(payload);
      });
    };
    return sendEventForHits;
  }
  function createBindEventForHits(_ref3) {
    var index = _ref3.index,
      widgetType = _ref3.widgetType,
      instantSearchInstance = _ref3.instantSearchInstance;
    var bindEventForHits = function bindEventForHits() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var payloads = buildPayloads({
        widgetType: widgetType,
        index: index,
        methodName: 'bindEvent',
        args: args,
        instantSearchInstance: instantSearchInstance
      });
      return payloads.length ? "data-insights-event=".concat(serializePayload(payloads)) : '';
    };
    return bindEventForHits;
  }

  function isIndexWidget(widget) {
    return widget.$$type === 'ais.index';
  }

  function setIndexHelperState(finalUiState, indexWidget) {
    var nextIndexUiState = finalUiState[indexWidget.getIndexId()] || {};
    {
      checkIndexUiState({
        index: indexWidget,
        indexUiState: nextIndexUiState
      });
    }
    indexWidget.getHelper().setState(indexWidget.getWidgetSearchParameters(indexWidget.getHelper().state, {
      uiState: nextIndexUiState
    }));
    indexWidget.getWidgets().filter(isIndexWidget).forEach(function (widget) {
      return setIndexHelperState(finalUiState, widget);
    });
  }

  // Debounce a function call to the trailing edge.
  // The debounced function returns a promise.
  function debounce(func, wait) {
    var lastTimeout = null;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return new Promise(function (resolve, reject) {
        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout(function () {
          lastTimeout = null;
          Promise.resolve(func.apply(void 0, args)).then(resolve).catch(reject);
        }, wait);
      });
    };
  }

  var nextMicroTask = Promise.resolve();
  function defer(callback) {
    var progress = null;
    var cancelled = false;
    var fn = function fn() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (progress !== null) {
        return;
      }
      progress = nextMicroTask.then(function () {
        progress = null;
        if (cancelled) {
          cancelled = false;
          return;
        }
        callback.apply(void 0, args);
      });
    };
    fn.wait = function () {
      if (progress === null) {
        throw new Error('The deferred function should be called before calling `wait()`');
      }
      return progress;
    };
    fn.cancel = function () {
      if (progress === null) {
        return;
      }
      cancelled = true;
    };
    return fn;
  }

  function createDocumentationLink(_ref) {
    var name = _ref.name,
      _ref$connector = _ref.connector,
      connector = _ref$connector === void 0 ? false : _ref$connector;
    return ['https://www.algolia.com/doc/api-reference/widgets/', name, '/js/', connector ? '#connector' : ''].join('');
  }
  function createDocumentationMessageGenerator() {
    for (var _len = arguments.length, widgets = new Array(_len), _key = 0; _key < _len; _key++) {
      widgets[_key] = arguments[_key];
    }
    var links = widgets.map(function (widget) {
      return createDocumentationLink(widget);
    }).join(', ');
    return function (message) {
      return [message, "See documentation: ".concat(links)].filter(Boolean).join('\n\n');
    };
  }

  function unescapeFacetValue(value) {
    if (typeof value === 'string') {
      return value.replace(/^\\-/, '-');
    }
    return value;
  }
  function escapeFacetValue(value) {
    if (typeof value === 'number' && value < 0 || typeof value === 'string') {
      return String(value).replace(/^-/, '\\-');
    }
    return value;
  }

  // We aren't using the native `Array.prototype.find` because the refactor away from Lodash is not
  // published as a major version.
  // Relying on the `find` polyfill on user-land, which before was only required for niche use-cases,
  // was decided as too risky.
  // @MAJOR Replace with the native `Array.prototype.find` method
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  function find(items, predicate) {
    var value;
    for (var i = 0; i < items.length; i++) {
      value = items[i];
      // inlined for performance: if (Call(predicate, thisArg, [value, i, list])) {
      if (predicate(value, i, items)) {
        return value;
      }
    }
    return undefined;
  }

  // We aren't using the native `Array.prototype.findIndex` because the refactor away from Lodash is not
  // published as a major version.
  // Relying on the `findIndex` polyfill on user-land, which before was only required for niche use-cases,
  // was decided as too risky.
  // @MAJOR Replace with the native `Array.prototype.findIndex` method
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  function findIndex(array, comparator) {
    if (!Array.isArray(array)) {
      return -1;
    }
    for (var i = 0; i < array.length; i++) {
      if (comparator(array[i])) {
        return i;
      }
    }
    return -1;
  }

  var latLngRegExp = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/;
  function aroundLatLngToPosition(value) {
    var pattern = value.match(latLngRegExp);

    // Since the value provided is the one send with the request, the API should
    // throw an error due to the wrong format. So throw an error should be safe.
    if (!pattern) {
      throw new Error("Invalid value for \"aroundLatLng\" parameter: \"".concat(value, "\""));
    }
    return {
      lat: parseFloat(pattern[1]),
      lng: parseFloat(pattern[2])
    };
  }
  function insideBoundingBoxArrayToBoundingBox(value) {
    var _value = _slicedToArray(value, 1),
      _value$ = _value[0],
      _value$2 = _value$ === void 0 ? [undefined, undefined, undefined, undefined] : _value$,
      _value$3 = _slicedToArray(_value$2, 4),
      neLat = _value$3[0],
      neLng = _value$3[1],
      swLat = _value$3[2],
      swLng = _value$3[3];

    // Since the value provided is the one send with the request, the API should
    // throw an error due to the wrong format. So throw an error should be safe.
    if (!neLat || !neLng || !swLat || !swLng) {
      throw new Error("Invalid value for \"insideBoundingBox\" parameter: [".concat(value, "]"));
    }
    return {
      northEast: {
        lat: neLat,
        lng: neLng
      },
      southWest: {
        lat: swLat,
        lng: swLng
      }
    };
  }
  function insideBoundingBoxStringToBoundingBox(value) {
    var _value$split$map = value.split(',').map(parseFloat),
      _value$split$map2 = _slicedToArray(_value$split$map, 4),
      neLat = _value$split$map2[0],
      neLng = _value$split$map2[1],
      swLat = _value$split$map2[2],
      swLng = _value$split$map2[3];

    // Since the value provided is the one send with the request, the API should
    // throw an error due to the wrong format. So throw an error should be safe.
    if (!neLat || !neLng || !swLat || !swLng) {
      throw new Error("Invalid value for \"insideBoundingBox\" parameter: \"".concat(value, "\""));
    }
    return {
      northEast: {
        lat: neLat,
        lng: neLng
      },
      southWest: {
        lat: swLat,
        lng: swLng
      }
    };
  }
  function insideBoundingBoxToBoundingBox(value) {
    if (Array.isArray(value)) {
      return insideBoundingBoxArrayToBoundingBox(value);
    }
    return insideBoundingBoxStringToBoundingBox(value);
  }

  // typed as any, since it accepts the _real_ js clients, not the interface we otherwise expect
  function getAppIdAndApiKey(searchClient) {
    if (searchClient.transporter) {
      // searchClient v4
      var _searchClient$transpo = searchClient.transporter,
        headers = _searchClient$transpo.headers,
        queryParameters = _searchClient$transpo.queryParameters;
      var APP_ID = 'x-algolia-application-id';
      var API_KEY = 'x-algolia-api-key';
      var appId = headers[APP_ID] || queryParameters[APP_ID];
      var apiKey = headers[API_KEY] || queryParameters[API_KEY];
      return [appId, apiKey];
    } else {
      // searchClient v3
      return [searchClient.applicationID, searchClient.apiKey];
    }
  }

  function isDomElement(object) {
    return object instanceof HTMLElement || Boolean(object) && object.nodeType > 0;
  }

  /**
   * Return the container. If it's a string, it is considered a
   * css selector and retrieves the first matching element. Otherwise
   * test if it validates that it's a correct DOMElement.
   *
   * @param {string|HTMLElement} selectorOrHTMLElement CSS Selector or container node.
   * @return {HTMLElement} Container node
   * @throws Error when the type is not correct
   */
  function getContainerNode(selectorOrHTMLElement) {
    var isSelectorString = typeof selectorOrHTMLElement === 'string';
    var domElement = isSelectorString ? document.querySelector(selectorOrHTMLElement) : selectorOrHTMLElement;
    if (!isDomElement(domElement)) {
      var errorMessage = 'Container must be `string` or `HTMLElement`.';
      if (isSelectorString) {
        errorMessage += " Unable to find ".concat(selectorOrHTMLElement);
      }
      throw new Error(errorMessage);
    }
    return domElement;
  }

  function getHighlightedParts(highlightedValue) {
    var highlightPostTag = TAG_REPLACEMENT.highlightPostTag,
      highlightPreTag = TAG_REPLACEMENT.highlightPreTag;
    var splitByPreTag = highlightedValue.split(highlightPreTag);
    var firstValue = splitByPreTag.shift();
    var elements = !firstValue ? [] : [{
      value: firstValue,
      isHighlighted: false
    }];
    splitByPreTag.forEach(function (split) {
      var splitByPostTag = split.split(highlightPostTag);
      elements.push({
        value: splitByPostTag[0],
        isHighlighted: true
      });
      if (splitByPostTag[1] !== '') {
        elements.push({
          value: splitByPostTag[1],
          isHighlighted: false
        });
      }
    });
    return elements;
  }

  var hasAlphanumeric = new RegExp(/\w/i);
  function getHighlightFromSiblings(parts, i) {
    var _parts, _parts2;
    var current = parts[i];
    var isNextHighlighted = ((_parts = parts[i + 1]) === null || _parts === void 0 ? void 0 : _parts.isHighlighted) || true;
    var isPreviousHighlighted = ((_parts2 = parts[i - 1]) === null || _parts2 === void 0 ? void 0 : _parts2.isHighlighted) || true;
    if (!hasAlphanumeric.test(unescape$1(current.value)) && isPreviousHighlighted === isNextHighlighted) {
      return isPreviousHighlighted;
    }
    return current.isHighlighted;
  }

  function getPropertyByPath(object, path) {
    var parts = Array.isArray(path) ? path : path.split('.');
    return parts.reduce(function (current, key) {
      return current && current[key];
    }, object);
  }

  function getRefinement(state, type, attribute, name) {
    var resultsFacets = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var res = {
      type: type,
      attribute: attribute,
      name: name,
      escapedValue: escapeFacetValue(name)
    };
    var facet = find(resultsFacets, function (resultsFacet) {
      return resultsFacet.name === attribute;
    });
    var count;
    if (type === 'hierarchical') {
      var facetDeclaration = state.getHierarchicalFacetByName(attribute);
      var nameParts = name.split(facetDeclaration.separator);
      var getFacetRefinement = function getFacetRefinement(facetData) {
        return function (refinementKey) {
          return facetData[refinementKey];
        };
      };
      var _loop = function _loop(i) {
        facet = facet && facet.data && find(Object.keys(facet.data).map(getFacetRefinement(facet.data)), function (refinement) {
          return refinement.name === nameParts[i];
        });
      };
      for (var i = 0; facet !== undefined && i < nameParts.length; ++i) {
        _loop(i);
      }
      count = facet && facet.count;
    } else {
      count = facet && facet.data && facet.data[res.name];
    }
    if (count !== undefined) {
      res.count = count;
    }
    if (facet && facet.exhaustive !== undefined) {
      res.exhaustive = facet.exhaustive;
    }
    return res;
  }
  function getRefinements(results, state) {
    var includesQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var refinements = [];
    var _state$facetsRefineme = state.facetsRefinements,
      facetsRefinements = _state$facetsRefineme === void 0 ? {} : _state$facetsRefineme,
      _state$facetsExcludes = state.facetsExcludes,
      facetsExcludes = _state$facetsExcludes === void 0 ? {} : _state$facetsExcludes,
      _state$disjunctiveFac = state.disjunctiveFacetsRefinements,
      disjunctiveFacetsRefinements = _state$disjunctiveFac === void 0 ? {} : _state$disjunctiveFac,
      _state$hierarchicalFa = state.hierarchicalFacetsRefinements,
      hierarchicalFacetsRefinements = _state$hierarchicalFa === void 0 ? {} : _state$hierarchicalFa,
      _state$numericRefinem = state.numericRefinements,
      numericRefinements = _state$numericRefinem === void 0 ? {} : _state$numericRefinem,
      _state$tagRefinements = state.tagRefinements,
      tagRefinements = _state$tagRefinements === void 0 ? [] : _state$tagRefinements;
    Object.keys(facetsRefinements).forEach(function (attribute) {
      var refinementNames = facetsRefinements[attribute];
      refinementNames.forEach(function (refinementName) {
        refinements.push(getRefinement(state, 'facet', attribute, refinementName, results.facets));
      });
    });
    Object.keys(facetsExcludes).forEach(function (attribute) {
      var refinementNames = facetsExcludes[attribute];
      refinementNames.forEach(function (refinementName) {
        refinements.push({
          type: 'exclude',
          attribute: attribute,
          name: refinementName,
          exclude: true
        });
      });
    });
    Object.keys(disjunctiveFacetsRefinements).forEach(function (attribute) {
      var refinementNames = disjunctiveFacetsRefinements[attribute];
      refinementNames.forEach(function (refinementName) {
        refinements.push(getRefinement(state, 'disjunctive', attribute,
        // We unescape any disjunctive refined values with `unescapeFacetValue` because
        // they can be escaped on negative numeric values with `escapeFacetValue`.
        unescapeFacetValue(refinementName), results.disjunctiveFacets));
      });
    });
    Object.keys(hierarchicalFacetsRefinements).forEach(function (attribute) {
      var refinementNames = hierarchicalFacetsRefinements[attribute];
      refinementNames.forEach(function (refinement) {
        refinements.push(getRefinement(state, 'hierarchical', attribute, refinement, results.hierarchicalFacets));
      });
    });
    Object.keys(numericRefinements).forEach(function (attribute) {
      var operators = numericRefinements[attribute];
      Object.keys(operators).forEach(function (operatorOriginal) {
        var operator = operatorOriginal;
        var valueOrValues = operators[operator];
        var refinementNames = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
        refinementNames.forEach(function (refinementName) {
          refinements.push({
            type: 'numeric',
            attribute: attribute,
            name: "".concat(refinementName),
            numericValue: refinementName,
            operator: operator
          });
        });
      });
    });
    tagRefinements.forEach(function (refinementName) {
      refinements.push({
        type: 'tag',
        attribute: '_tags',
        name: refinementName
      });
    });
    if (includesQuery && state.query && state.query.trim()) {
      refinements.push({
        attribute: 'query',
        type: 'query',
        name: state.query,
        query: state.query
      });
    }
    return refinements;
  }

  function getWidgetAttribute(widget, initOptions) {
    var _widget$getWidgetRend;
    var renderState = (_widget$getWidgetRend = widget.getWidgetRenderState) === null || _widget$getWidgetRend === void 0 ? void 0 : _widget$getWidgetRend.call(widget, initOptions);
    var attribute = null;
    if (renderState && renderState.widgetParams) {
      // casting as widgetParams is checked just before
      var widgetParams = renderState.widgetParams;
      if (widgetParams.attribute) {
        attribute = widgetParams.attribute;
      } else if (Array.isArray(widgetParams.attributes)) {
        attribute = widgetParams.attributes[0];
      }
    }
    if (typeof attribute !== 'string') {
      throw new Error("Could not find the attribute of the widget:\n\n".concat(JSON.stringify(widget), "\n\nPlease check whether the widget's getWidgetRenderState returns widgetParams.attribute correctly."));
    }
    return attribute;
  }

  function addAbsolutePosition(hits, page, hitsPerPage) {
    return hits.map(function (hit, idx) {
      return _objectSpread2(_objectSpread2({}, hit), {}, {
        __position: hitsPerPage * page + idx + 1
      });
    });
  }

  function addQueryID(hits, queryID) {
    if (!queryID) {
      return hits;
    }
    return hits.map(function (hit) {
      return _objectSpread2(_objectSpread2({}, hit), {}, {
        __queryID: queryID
      });
    });
  }

  function isPrimitive(obj) {
    return obj !== Object(obj);
  }
  function isEqual(first, second) {
    if (first === second) {
      return true;
    }
    if (isPrimitive(first) || isPrimitive(second) || typeof first === 'function' || typeof second === 'function') {
      return first === second;
    }
    if (Object.keys(first).length !== Object.keys(second).length) {
      return false;
    }

    // @TODO avoid for..of because of the large polyfill
    // eslint-disable-next-line no-restricted-syntax
    for (var _i = 0, _Object$keys = Object.keys(first); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      if (!(key in second)) {
        return false;
      }
      if (!isEqual(first[key], second[key])) {
        return false;
      }
    }
    return true;
  }

  // This is the `Number.isFinite()` polyfill recommended by MDN.
  // We do not provide any tests for this function.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#Polyfill
  // @MAJOR Replace with the native `Number.isFinite` method
  function isFiniteNumber(value) {
    return typeof value === 'number' && isFinite(value);
  }

  function isSpecialClick(event) {
    var isMiddleClick = event.button === 1;
    return isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
  }

  function uniq(array) {
    return array.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }

  var _excluded = ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"];
  var mergeWithRest = function mergeWithRest(left, right) {
    var facets = right.facets,
      disjunctiveFacets = right.disjunctiveFacets,
      facetsRefinements = right.facetsRefinements,
      facetsExcludes = right.facetsExcludes,
      disjunctiveFacetsRefinements = right.disjunctiveFacetsRefinements,
      numericRefinements = right.numericRefinements,
      tagRefinements = right.tagRefinements,
      hierarchicalFacets = right.hierarchicalFacets,
      hierarchicalFacetsRefinements = right.hierarchicalFacetsRefinements,
      ruleContexts = right.ruleContexts,
      rest = _objectWithoutProperties(right, _excluded);
    return left.setQueryParameters(rest);
  };

  // Merge facets
  var mergeFacets = function mergeFacets(left, right) {
    return right.facets.reduce(function (_, name) {
      return _.addFacet(name);
    }, left);
  };
  var mergeDisjunctiveFacets = function mergeDisjunctiveFacets(left, right) {
    return right.disjunctiveFacets.reduce(function (_, name) {
      return _.addDisjunctiveFacet(name);
    }, left);
  };
  var mergeHierarchicalFacets = function mergeHierarchicalFacets(left, right) {
    return left.setQueryParameters({
      hierarchicalFacets: right.hierarchicalFacets.reduce(function (facets, facet) {
        var index = findIndex(facets, function (_) {
          return _.name === facet.name;
        });
        if (index === -1) {
          return facets.concat(facet);
        }
        var nextFacets = facets.slice();
        nextFacets.splice(index, 1, facet);
        return nextFacets;
      }, left.hierarchicalFacets)
    });
  };

  // Merge facet refinements
  var mergeTagRefinements = function mergeTagRefinements(left, right) {
    return right.tagRefinements.reduce(function (_, value) {
      return _.addTagRefinement(value);
    }, left);
  };
  var mergeFacetRefinements = function mergeFacetRefinements(left, right) {
    return left.setQueryParameters({
      facetsRefinements: _objectSpread2(_objectSpread2({}, left.facetsRefinements), right.facetsRefinements)
    });
  };
  var mergeFacetsExcludes = function mergeFacetsExcludes(left, right) {
    return left.setQueryParameters({
      facetsExcludes: _objectSpread2(_objectSpread2({}, left.facetsExcludes), right.facetsExcludes)
    });
  };
  var mergeDisjunctiveFacetsRefinements = function mergeDisjunctiveFacetsRefinements(left, right) {
    return left.setQueryParameters({
      disjunctiveFacetsRefinements: _objectSpread2(_objectSpread2({}, left.disjunctiveFacetsRefinements), right.disjunctiveFacetsRefinements)
    });
  };
  var mergeNumericRefinements = function mergeNumericRefinements(left, right) {
    return left.setQueryParameters({
      numericRefinements: _objectSpread2(_objectSpread2({}, left.numericRefinements), right.numericRefinements)
    });
  };
  var mergeHierarchicalFacetsRefinements = function mergeHierarchicalFacetsRefinements(left, right) {
    return left.setQueryParameters({
      hierarchicalFacetsRefinements: _objectSpread2(_objectSpread2({}, left.hierarchicalFacetsRefinements), right.hierarchicalFacetsRefinements)
    });
  };
  var mergeRuleContexts = function mergeRuleContexts(left, right) {
    var ruleContexts = uniq([].concat(left.ruleContexts).concat(right.ruleContexts).filter(Boolean));
    if (ruleContexts.length > 0) {
      return left.setQueryParameters({
        ruleContexts: ruleContexts
      });
    }
    return left;
  };
  var mergeSearchParameters = function mergeSearchParameters() {
    for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
      parameters[_key] = arguments[_key];
    }
    return parameters.reduce(function (left, right) {
      var hierarchicalFacetsRefinementsMerged = mergeHierarchicalFacetsRefinements(left, right);
      var hierarchicalFacetsMerged = mergeHierarchicalFacets(hierarchicalFacetsRefinementsMerged, right);
      var tagRefinementsMerged = mergeTagRefinements(hierarchicalFacetsMerged, right);
      var numericRefinementsMerged = mergeNumericRefinements(tagRefinementsMerged, right);
      var disjunctiveFacetsRefinementsMerged = mergeDisjunctiveFacetsRefinements(numericRefinementsMerged, right);
      var facetsExcludesMerged = mergeFacetsExcludes(disjunctiveFacetsRefinementsMerged, right);
      var facetRefinementsMerged = mergeFacetRefinements(facetsExcludesMerged, right);
      var disjunctiveFacetsMerged = mergeDisjunctiveFacets(facetRefinementsMerged, right);
      var ruleContextsMerged = mergeRuleContexts(disjunctiveFacetsMerged, right);
      var facetsMerged = mergeFacets(ruleContextsMerged, right);
      return mergeWithRest(facetsMerged, right);
    });
  };

  /**
   * Creates a new object with the same keys as the original object, but without the excluded keys.
   * @param source original object
   * @param excluded keys to remove from the original object
   * @returns the new object
   */
  function omit(source, excluded) {
    if (source === null || source === undefined) {
      return source;
    }
    return Object.keys(source).reduce(function (target, key) {
      if (excluded.indexOf(key) >= 0) {
        return target;
      }
      var validKey = key;
      target[validKey] = source[validKey];
      return target;
    }, {});
  }

  function range(_ref) {
    var _ref$start = _ref.start,
      start = _ref$start === void 0 ? 0 : _ref$start,
      end = _ref.end,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step;
    // We can't divide by 0 so we re-assign the step to 1 if it happens.
    var limitStep = step === 0 ? 1 : step;

    // In some cases the array to create has a decimal length.
    // We therefore need to round the value.
    // Example:
    //   { start: 1, end: 5000, step: 500 }
    //   => Array length = (5000 - 1) / 500 = 9.998
    var arrayLength = Math.round((end - start) / limitStep);
    return _toConsumableArray(Array(arrayLength)).map(function (_, current) {
      return start + current * limitStep;
    });
  }

  function createInitArgs(instantSearchInstance, parent, uiState) {
    var helper = parent.getHelper();
    return {
      uiState: uiState,
      helper: helper,
      parent: parent,
      instantSearchInstance: instantSearchInstance,
      state: helper.state,
      renderState: instantSearchInstance.renderState,
      templatesConfig: instantSearchInstance.templatesConfig,
      createURL: parent.createURL,
      scopedResults: [],
      searchMetadata: {
        isSearchStalled: instantSearchInstance.status === 'stalled'
      },
      status: instantSearchInstance.status,
      error: instantSearchInstance.error
    };
  }
  function createRenderArgs(instantSearchInstance, parent) {
    var results = parent.getResults();
    return {
      helper: parent.getHelper(),
      parent: parent,
      instantSearchInstance: instantSearchInstance,
      results: results,
      scopedResults: parent.getScopedResults(),
      state: results._state,
      renderState: instantSearchInstance.renderState,
      templatesConfig: instantSearchInstance.templatesConfig,
      createURL: parent.createURL,
      searchMetadata: {
        isSearchStalled: instantSearchInstance.status === 'stalled'
      },
      status: instantSearchInstance.status,
      error: instantSearchInstance.error
    };
  }

  function resolveSearchParameters(current) {
    var parent = current.getParent();
    var states = [current.getHelper().state];
    while (parent !== null) {
      states = [parent.getHelper().state].concat(states);
      parent = parent.getParent();
    }
    return states;
  }

  function reverseHighlightedParts(parts) {
    if (!parts.some(function (part) {
      return part.isHighlighted;
    })) {
      return parts.map(function (part) {
        return _objectSpread2(_objectSpread2({}, part), {}, {
          isHighlighted: false
        });
      });
    }
    return parts.map(function (part, i) {
      return _objectSpread2(_objectSpread2({}, part), {}, {
        isHighlighted: !getHighlightFromSiblings(parts, i)
      });
    });
  }

  // eslint-disable-next-line no-restricted-globals

  /**
   * Runs code on browser environments safely.
   */
  function safelyRunOnBrowser(callback) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        fallback: function fallback() {
          return undefined;
        }
      },
      fallback = _ref.fallback;
    // eslint-disable-next-line no-restricted-globals
    if (typeof window === 'undefined') {
      return fallback();
    }

    // eslint-disable-next-line no-restricted-globals
    return callback({
      window: window
    });
  }

  function toArray(value) {
    return Array.isArray(value) ? value : [value];
  }

  function hasFindAnswersMethod(answersIndex) {
    return typeof answersIndex.findAnswers === 'function';
  }
  var withUsage = createDocumentationMessageGenerator({
    name: 'answers',
    connector: true
  });
  var connectAnswers = function connectAnswers(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        queryLanguages = _ref.queryLanguages,
        attributesForPrediction = _ref.attributesForPrediction,
        _ref$nbHits = _ref.nbHits,
        nbHits = _ref$nbHits === void 0 ? 1 : _ref$nbHits,
        _ref$renderDebounceTi = _ref.renderDebounceTime,
        renderDebounceTime = _ref$renderDebounceTi === void 0 ? 100 : _ref$renderDebounceTi,
        _ref$searchDebounceTi = _ref.searchDebounceTime,
        searchDebounceTime = _ref$searchDebounceTi === void 0 ? 100 : _ref$searchDebounceTi,
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
        _ref$extraParameters = _ref.extraParameters,
        extraParameters = _ref$extraParameters === void 0 ? {} : _ref$extraParameters;

      // @ts-expect-error checking for the wrong value
      if (!queryLanguages || queryLanguages.length === 0) {
        throw new Error(withUsage('The `queryLanguages` expects an array of strings.'));
      }
      var runConcurrentSafePromise = createConcurrentSafePromise();
      var lastHits = [];
      var isLoading = false;
      var debouncedRender = debounce(renderFn, renderDebounceTime);

      // this does not directly use DebouncedFunction<findAnswers>, since then the generic will disappear
      var debouncedRefine;
      return {
        $$type: 'ais.answers',
        init: function init(initOptions) {
          var state = initOptions.state,
            instantSearchInstance = initOptions.instantSearchInstance;
          var answersIndex = instantSearchInstance.client.initIndex(state.index);
          if (!hasFindAnswersMethod(answersIndex)) {
            throw new Error(withUsage('`algoliasearch` >= 4.8.0 required.'));
          }
          debouncedRefine = debounce(answersIndex.findAnswers, searchDebounceTime);
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: initOptions.instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var _this = this;
          var query = renderOptions.state.query;
          if (!query) {
            // renders nothing with empty query
            lastHits = [];
            isLoading = false;
            renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
              instantSearchInstance: renderOptions.instantSearchInstance
            }), false);
            return;
          }

          // render the loader
          lastHits = [];
          isLoading = true;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);

          // call /answers API
          runConcurrentSafePromise(debouncedRefine(query, queryLanguages, _objectSpread2(_objectSpread2({}, extraParameters), {}, {
            nbHits: nbHits,
            attributesForPrediction: attributesForPrediction
          }))).then(function (result) {
            if (!result) {
              // It's undefined when it's debounced.
              return;
            }
            if (escapeHTML && result.hits.length > 0) {
              result.hits = escapeHits(result.hits);
            }
            var hitsWithAbsolutePosition = addAbsolutePosition(result.hits, 0, nbHits);
            var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, result.queryID);
            lastHits = hitsWithAbsolutePositionAndQueryID;
            isLoading = false;
            debouncedRender(_objectSpread2(_objectSpread2({}, _this.getWidgetRenderState(renderOptions)), {}, {
              instantSearchInstance: renderOptions.instantSearchInstance
            }), false);
          });
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            answers: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState() {
          return {
            hits: lastHits,
            isLoading: isLoading,
            widgetParams: widgetParams
          };
        },
        dispose: function dispose(_ref2) {
          var state = _ref2.state;
          unmountFn();
          return state;
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(state) {
          return state;
        }
      };
    };
  };

  var withUsage$1 = createDocumentationMessageGenerator({
    name: 'dynamic-widgets',
    connector: true
  });
  var MAX_WILDCARD_FACETS = 20;
  var connectDynamicWidgets = function connectDynamicWidgets(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$1());
    return function (widgetParams) {
      var widgets = widgetParams.widgets,
        _widgetParams$maxValu = widgetParams.maxValuesPerFacet,
        maxValuesPerFacet = _widgetParams$maxValu === void 0 ? 20 : _widgetParams$maxValu,
        _widgetParams$facets = widgetParams.facets,
        facets = _widgetParams$facets === void 0 ? ['*'] : _widgetParams$facets,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
          return items;
        } : _widgetParams$transfo,
        fallbackWidget = widgetParams.fallbackWidget;
      if (!(widgets && Array.isArray(widgets) && widgets.every(function (widget) {
        return _typeof(widget) === 'object';
      }))) {
        throw new Error(withUsage$1('The `widgets` option expects an array of widgets.'));
      }
      if (!(Array.isArray(facets) && facets.length <= 1 && (facets[0] === '*' || facets[0] === undefined))) {
        throw new Error(withUsage$1("The `facets` option only accepts [] or [\"*\"], you passed ".concat(JSON.stringify(facets))));
      }
      var localWidgets = new Map();
      return {
        $$type: 'ais.dynamicWidgets',
        init: function init(initOptions) {
          widgets.forEach(function (widget) {
            var attribute = getWidgetAttribute(widget, initOptions);
            localWidgets.set(attribute, {
              widget: widget,
              isMounted: false
            });
          });
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: initOptions.instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var parent = renderOptions.parent;
          var renderState = this.getWidgetRenderState(renderOptions);
          var widgetsToUnmount = [];
          var widgetsToMount = [];
          if (fallbackWidget) {
            renderState.attributesToRender.forEach(function (attribute) {
              if (!localWidgets.has(attribute)) {
                var widget = fallbackWidget({
                  attribute: attribute
                });
                localWidgets.set(attribute, {
                  widget: widget,
                  isMounted: false
                });
              }
            });
          }
          localWidgets.forEach(function (_ref, attribute) {
            var widget = _ref.widget,
              isMounted = _ref.isMounted;
            var shouldMount = renderState.attributesToRender.indexOf(attribute) > -1;
            if (!isMounted && shouldMount) {
              widgetsToMount.push(widget);
              localWidgets.set(attribute, {
                widget: widget,
                isMounted: true
              });
            } else if (isMounted && !shouldMount) {
              widgetsToUnmount.push(widget);
              localWidgets.set(attribute, {
                widget: widget,
                isMounted: false
              });
            }
          });
          parent.addWidgets(widgetsToMount);
          // make sure this only happens after the regular render, otherwise it
          // happens too quick, since render is "deferred" for the next microtask,
          // so this needs to be a whole task later
          setTimeout(function () {
            return parent.removeWidgets(widgetsToUnmount);
          }, 0);
          renderFn(_objectSpread2(_objectSpread2({}, renderState), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref2) {
          var parent = _ref2.parent;
          var toRemove = [];
          localWidgets.forEach(function (_ref3) {
            var widget = _ref3.widget,
              isMounted = _ref3.isMounted;
            if (isMounted) {
              toRemove.push(widget);
            }
          });
          parent.removeWidgets(toRemove);
          unmountFn();
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(state) {
          // broadening the scope of facets to avoid conflict between never and *
          return facets.reduce(function (acc, curr) {
            return acc.addFacet(curr);
          }, state.setQueryParameters({
            maxValuesPerFacet: Math.max(maxValuesPerFacet || 0, state.maxValuesPerFacet || 0)
          }));
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            dynamicWidgets: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref4) {
          var _results$renderingCon, _results$renderingCon2, _results$renderingCon3, _results$renderingCon4;
          var results = _ref4.results,
            state = _ref4.state;
          if (!results) {
            return {
              attributesToRender: [],
              widgetParams: widgetParams
            };
          }
          var attributesToRender = transformItems((_results$renderingCon = (_results$renderingCon2 = results.renderingContent) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.facetOrdering) === null || _results$renderingCon3 === void 0 ? void 0 : (_results$renderingCon4 = _results$renderingCon3.facets) === null || _results$renderingCon4 === void 0 ? void 0 : _results$renderingCon4.order) !== null && _results$renderingCon !== void 0 ? _results$renderingCon : [], {
            results: results
          });
          if (!Array.isArray(attributesToRender)) {
            throw new Error(withUsage$1('The `transformItems` option expects a function that returns an Array.'));
          }
           _warning(maxValuesPerFacet >= (state.maxValuesPerFacet || 0), "The maxValuesPerFacet set by dynamic widgets (".concat(maxValuesPerFacet, ") is smaller than one of the limits set by a widget (").concat(state.maxValuesPerFacet, "). This causes a mismatch in query parameters and thus an extra network request when that widget is mounted.")) ;
           _warning(attributesToRender.length <= MAX_WILDCARD_FACETS || widgetParams.facets !== undefined, "More than ".concat(MAX_WILDCARD_FACETS, " facets are requested to be displayed without explicitly setting which facets to retrieve. This could have a performance impact. Set \"facets\" to [] to do two smaller network requests, or explicitly to ['*'] to avoid this warning.")) ;
          return {
            attributesToRender: attributesToRender,
            widgetParams: widgetParams
          };
        }
      };
    };
  };

  var withUsage$2 = createDocumentationMessageGenerator({
    name: 'clear-refinements',
    connector: true
  });
  var connectClearRefinements = function connectClearRefinements(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$2());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        _ref$includedAttribut = _ref.includedAttributes,
        includedAttributes = _ref$includedAttribut === void 0 ? [] : _ref$includedAttribut,
        _ref$excludedAttribut = _ref.excludedAttributes,
        excludedAttributes = _ref$excludedAttribut === void 0 ? ['query'] : _ref$excludedAttribut,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
          return items;
        } : _ref$transformItems;
      if (widgetParams && widgetParams.includedAttributes && widgetParams.excludedAttributes) {
        throw new Error(withUsage$2('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
      }
      var connectorState = {
        refine: noop,
        createURL: function createURL() {
          return '';
        },
        attributesToClear: []
      };
      var cachedRefine = function cachedRefine() {
        return connectorState.refine();
      };
      var cachedCreateURL = function cachedCreateURL() {
        return connectorState.createURL();
      };
      return {
        $$type: 'ais.clearRefinements',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose() {
          unmountFn();
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            clearRefinements: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref2) {
          var createURL = _ref2.createURL,
            scopedResults = _ref2.scopedResults,
            results = _ref2.results;
          connectorState.attributesToClear = scopedResults.reduce(function (attributesToClear, scopedResult) {
            return attributesToClear.concat(getAttributesToClear({
              scopedResult: scopedResult,
              includedAttributes: includedAttributes,
              excludedAttributes: excludedAttributes,
              transformItems: transformItems,
              results: results
            }));
          }, []);
          connectorState.refine = function () {
            connectorState.attributesToClear.forEach(function (_ref3) {
              var indexHelper = _ref3.helper,
                items = _ref3.items;
              indexHelper.setState(clearRefinements({
                helper: indexHelper,
                attributesToClear: items
              })).search();
            });
          };
          connectorState.createURL = function () {
            return createURL(mergeSearchParameters.apply(void 0, _toConsumableArray(connectorState.attributesToClear.map(function (_ref4) {
              var indexHelper = _ref4.helper,
                items = _ref4.items;
              return clearRefinements({
                helper: indexHelper,
                attributesToClear: items
              });
            }))));
          };
          var canRefine = connectorState.attributesToClear.some(function (attributeToClear) {
            return attributeToClear.items.length > 0;
          });
          return {
            canRefine: canRefine,
            hasRefinements: canRefine,
            refine: cachedRefine,
            createURL: cachedCreateURL,
            widgetParams: widgetParams
          };
        }
      };
    };
  };
  function getAttributesToClear(_ref5) {
    var scopedResult = _ref5.scopedResult,
      includedAttributes = _ref5.includedAttributes,
      excludedAttributes = _ref5.excludedAttributes,
      transformItems = _ref5.transformItems,
      results = _ref5.results;
    var includesQuery = includedAttributes.indexOf('query') !== -1 || excludedAttributes.indexOf('query') === -1;
    return {
      helper: scopedResult.helper,
      items: transformItems(uniq(getRefinements(scopedResult.results, scopedResult.helper.state, includesQuery).map(function (refinement) {
        return refinement.attribute;
      }).filter(function (attribute) {
        return (
          // If the array is empty (default case), we keep all the attributes
          includedAttributes.length === 0 ||
          // Otherwise, only add the specified attributes
          includedAttributes.indexOf(attribute) !== -1
        );
      }).filter(function (attribute) {
        return (
          // If the query is included, we ignore the default `excludedAttributes = ['query']`
          attribute === 'query' && includesQuery ||
          // Otherwise, ignore the excluded attributes
          excludedAttributes.indexOf(attribute) === -1
        );
      })), {
        results: results
      })
    };
  }

  var withUsage$3 = createDocumentationMessageGenerator({
    name: 'current-refinements',
    connector: true
  });
  var connectCurrentRefinements = function connectCurrentRefinements(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$3());
    return function (widgetParams) {
      if ((widgetParams || {}).includedAttributes && (widgetParams || {}).excludedAttributes) {
        throw new Error(withUsage$3('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
      }
      var _ref = widgetParams || {},
        includedAttributes = _ref.includedAttributes,
        _ref$excludedAttribut = _ref.excludedAttributes,
        excludedAttributes = _ref$excludedAttribut === void 0 ? ['query'] : _ref$excludedAttribut,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
          return items;
        } : _ref$transformItems;
      return {
        $$type: 'ais.currentRefinements',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose() {
          unmountFn();
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            currentRefinements: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref2) {
          var results = _ref2.results,
            scopedResults = _ref2.scopedResults,
            _createURL = _ref2.createURL,
            helper = _ref2.helper;
          function getItems() {
            if (!results) {
              return transformItems(getRefinementsItems({
                results: {},
                helper: helper,
                indexId: helper.state.index,
                includedAttributes: includedAttributes,
                excludedAttributes: excludedAttributes
              }), {
                results: results
              });
            }
            return scopedResults.reduce(function (accResults, scopedResult) {
              return accResults.concat(transformItems(getRefinementsItems({
                results: scopedResult.results,
                helper: scopedResult.helper,
                indexId: scopedResult.indexId,
                includedAttributes: includedAttributes,
                excludedAttributes: excludedAttributes
              }), {
                results: results
              }));
            }, []);
          }
          var items = getItems();
          return {
            items: items,
            canRefine: items.length > 0,
            refine: function refine(refinement) {
              return clearRefinement(helper, refinement);
            },
            createURL: function createURL(refinement) {
              return _createURL(clearRefinementFromState(helper.state, refinement));
            },
            widgetParams: widgetParams
          };
        }
      };
    };
  };
  function getRefinementsItems(_ref3) {
    var results = _ref3.results,
      helper = _ref3.helper,
      indexId = _ref3.indexId,
      includedAttributes = _ref3.includedAttributes,
      excludedAttributes = _ref3.excludedAttributes;
    var includesQuery = (includedAttributes || []).indexOf('query') !== -1 || (excludedAttributes || []).indexOf('query') === -1;
    var filterFunction = includedAttributes ? function (item) {
      return includedAttributes.indexOf(item.attribute) !== -1;
    } : function (item) {
      return excludedAttributes.indexOf(item.attribute) === -1;
    };
    var items = getRefinements(results, helper.state, includesQuery).map(normalizeRefinement).filter(filterFunction);
    return items.reduce(function (allItems, currentItem) {
      return [].concat(_toConsumableArray(allItems.filter(function (item) {
        return item.attribute !== currentItem.attribute;
      })), [{
        indexName: helper.state.index,
        indexId: indexId,
        attribute: currentItem.attribute,
        label: currentItem.attribute,
        refinements: items.filter(function (result) {
          return result.attribute === currentItem.attribute;
        })
        // We want to keep the order of refinements except the numeric ones.
        .sort(function (a, b) {
          return a.type === 'numeric' ? a.value - b.value : 0;
        }),
        refine: function refine(refinement) {
          return clearRefinement(helper, refinement);
        }
      }]);
    }, []);
  }
  function clearRefinementFromState(state, refinement) {
    state = state.resetPage();
    switch (refinement.type) {
      case 'facet':
        return state.removeFacetRefinement(refinement.attribute, String(refinement.value));
      case 'disjunctive':
        return state.removeDisjunctiveFacetRefinement(refinement.attribute, String(refinement.value));
      case 'hierarchical':
        return state.removeHierarchicalFacetRefinement(refinement.attribute);
      case 'exclude':
        return state.removeExcludeRefinement(refinement.attribute, String(refinement.value));
      case 'numeric':
        return state.removeNumericRefinement(refinement.attribute, refinement.operator, String(refinement.value));
      case 'tag':
        return state.removeTagRefinement(String(refinement.value));
      case 'query':
        return state.setQueryParameter('query', '');
      default:
         _warning(false, "The refinement type \"".concat(refinement.type, "\" does not exist and cannot be cleared from the current refinements.")) ;
        return state;
    }
  }
  function clearRefinement(helper, refinement) {
    helper.setState(clearRefinementFromState(helper.state, refinement)).search();
  }
  function getOperatorSymbol(operator) {
    switch (operator) {
      case '>=':
        return '≥';
      case '<=':
        return '≤';
      default:
        return operator;
    }
  }
  function normalizeRefinement(refinement) {
    var value = getValue(refinement);
    var label = refinement.operator ? "".concat(getOperatorSymbol(refinement.operator), " ").concat(refinement.name) : refinement.name;
    var normalizedRefinement = {
      attribute: refinement.attribute,
      type: refinement.type,
      value: value,
      label: label
    };
    if (refinement.operator !== undefined) {
      normalizedRefinement.operator = refinement.operator;
    }
    if (refinement.count !== undefined) {
      normalizedRefinement.count = refinement.count;
    }
    if (refinement.exhaustive !== undefined) {
      normalizedRefinement.exhaustive = refinement.exhaustive;
    }
    return normalizedRefinement;
  }
  function getValue(refinement) {
    if (refinement.type === 'numeric') {
      return Number(refinement.name);
    }
    if ('escapedValue' in refinement) {
      return refinement.escapedValue;
    }
    return refinement.name;
  }

  var _excluded$1 = ["name", "escapedValue", "data", "path"];
  var withUsage$4 = createDocumentationMessageGenerator({
    name: 'hierarchical-menu',
    connector: true
  });
  var DEFAULT_SORT = ['name:asc'];
  /**
   * **HierarchicalMenu** connector provides the logic to build a custom widget
   * that will give the user the ability to explore facets in a tree-like structure.
   *
   * This is commonly used for multi-level categorization of products on e-commerce
   * websites. From a UX point of view, we suggest not displaying more than two
   * levels deep.
   *
   * @type {Connector}
   * @param {function(HierarchicalMenuRenderingOptions, boolean)} renderFn Rendering function for the custom **HierarchicalMenu** widget.
   * @param {function} unmountFn Unmount function called when the widget is disposed.
   * @return {function(CustomHierarchicalMenuWidgetParams)} Re-usable widget factory for a custom **HierarchicalMenu** widget.
   */
  var connectHierarchicalMenu = function connectHierarchicalMenu(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$4());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        attributes = _ref.attributes,
        _ref$separator = _ref.separator,
        separator = _ref$separator === void 0 ? ' > ' : _ref$separator,
        _ref$rootPath = _ref.rootPath,
        rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath,
        _ref$showParentLevel = _ref.showParentLevel,
        showParentLevel = _ref$showParentLevel === void 0 ? true : _ref$showParentLevel,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? 10 : _ref$limit,
        _ref$showMore = _ref.showMore,
        showMore = _ref$showMore === void 0 ? false : _ref$showMore,
        _ref$showMoreLimit = _ref.showMoreLimit,
        showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit,
        _ref$sortBy = _ref.sortBy,
        sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT : _ref$sortBy,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
          return items;
        } : _ref$transformItems;
      if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
        throw new Error(withUsage$4('The `attributes` option expects an array of strings.'));
      }
      if (showMore === true && showMoreLimit <= limit) {
        throw new Error(withUsage$4('The `showMoreLimit` option must be greater than `limit`.'));
      }
      // we need to provide a hierarchicalFacet name for the search state
      // so that we can always map $hierarchicalFacetName => real attributes
      // we use the first attribute name
      var _attributes = _slicedToArray(attributes, 1),
        hierarchicalFacetName = _attributes[0];
      var sendEvent;

      // Provide the same function to the `renderFn` so that way the user
      // has to only bind it once when `isFirstRendering` for instance
      var toggleShowMore = function toggleShowMore() {};
      function cachedToggleShowMore() {
        toggleShowMore();
      }
      var _refine;
      var isShowingMore = false;
      function createToggleShowMore(renderOptions, widget) {
        return function () {
          isShowingMore = !isShowingMore;
          widget.render(renderOptions);
        };
      }
      function getLimit() {
        return isShowingMore ? showMoreLimit : limit;
      }
      function _prepareFacetValues(facetValues) {
        return facetValues.slice(0, getLimit()).map(function (_ref2) {
          var label = _ref2.name,
            value = _ref2.escapedValue,
            data = _ref2.data,
            path = _ref2.path,
            subValue = _objectWithoutProperties(_ref2, _excluded$1);
          var item = _objectSpread2(_objectSpread2({}, subValue), {}, {
            value: value,
            label: label,
            data: null
          });
          if (Array.isArray(data)) {
            item.data = _prepareFacetValues(data);
          }
          return item;
        });
      }
      return {
        $$type: 'ais.hierarchicalMenu',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          toggleShowMore = createToggleShowMore(renderOptions, this);
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref3) {
          var state = _ref3.state;
          unmountFn();
          return state.removeHierarchicalFacet(hierarchicalFacetName).setQueryParameter('maxValuesPerFacet', undefined);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            hierarchicalMenu: _objectSpread2(_objectSpread2({}, renderState.hierarchicalMenu), {}, _defineProperty({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref4) {
          var results = _ref4.results,
            state = _ref4.state,
            createURL = _ref4.createURL,
            instantSearchInstance = _ref4.instantSearchInstance,
            helper = _ref4.helper;
          var items = [];
          var canToggleShowMore = false;

          // Bind createURL to this specific attribute
          function _createURL(facetValue) {
            return createURL(state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue));
          }
          if (!sendEvent) {
            sendEvent = createSendEventForFacet({
              instantSearchInstance: instantSearchInstance,
              helper: helper,
              attribute: function attribute(facetValue) {
                var index = facetValue.split(separator).length - 1;
                return attributes[index];
              },
              widgetType: this.$$type
            });
          }
          if (!_refine) {
            _refine = function _refine(facetValue) {
              sendEvent('click', facetValue);
              helper.toggleFacetRefinement(hierarchicalFacetName, facetValue).search();
            };
          }
          if (results) {
            var facetValues = results.getFacetValues(hierarchicalFacetName, {
              sortBy: sortBy,
              facetOrdering: sortBy === DEFAULT_SORT
            });
            var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];

            // If the limit is the max number of facet retrieved it is impossible to know
            // if the facets are exhaustive. The only moment we are sure it is exhaustive
            // is when it is strictly under the number requested unless we know that another
            // widget has requested more values (maxValuesPerFacet > getLimit()).
            // Because this is used for making the search of facets unable or not, it is important
            // to be conservative here.
            var hasExhaustiveItems = (state.maxValuesPerFacet || 0) > getLimit() ? facetItems.length <= getLimit() : facetItems.length < getLimit();
            canToggleShowMore = showMore && (isShowingMore || !hasExhaustiveItems);
            items = transformItems(_prepareFacetValues(facetItems), {
              results: results
            });
          }
          return {
            items: items,
            refine: _refine,
            canRefine: items.length > 0,
            createURL: _createURL,
            sendEvent: sendEvent,
            widgetParams: widgetParams,
            isShowingMore: isShowingMore,
            toggleShowMore: cachedToggleShowMore,
            canToggleShowMore: canToggleShowMore
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
          var searchParameters = _ref5.searchParameters;
          var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
          if (!path.length) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            hierarchicalMenu: _objectSpread2(_objectSpread2({}, uiState.hierarchicalMenu), {}, _defineProperty({}, hierarchicalFacetName, path))
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
          var uiState = _ref6.uiState;
          var values = uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName];
          if (searchParameters.isConjunctiveFacet(hierarchicalFacetName) || searchParameters.isDisjunctiveFacet(hierarchicalFacetName)) {
             _warning(false, "HierarchicalMenu: Attribute \"".concat(hierarchicalFacetName, "\" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this HierarchicalMenu widget will not work at all.")) ;
            return searchParameters;
          }
          if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
            var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
             _warning(isEqual(facet.attributes, attributes) && facet.separator === separator && facet.rootPath === rootPath, 'Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.') ;
          }
          var withFacetConfiguration = searchParameters.removeHierarchicalFacet(hierarchicalFacetName).addHierarchicalFacet({
            name: hierarchicalFacetName,
            attributes: attributes,
            separator: separator,
            rootPath: rootPath,
            showParentLevel: showParentLevel
          });
          var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
          var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
          var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);
          if (!values) {
            return withMaxValuesPerFacet.setQueryParameters({
              hierarchicalFacetsRefinements: _objectSpread2(_objectSpread2({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty({}, hierarchicalFacetName, []))
            });
          }
          return withMaxValuesPerFacet.addHierarchicalFacetRefinement(hierarchicalFacetName, values.join(separator));
        }
      };
    };
  };

  var withUsage$5 = createDocumentationMessageGenerator({
    name: 'hits',
    connector: true
  });
  var connectHits = function connectHits(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$5());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
          return items;
        } : _ref$transformItems;
      var sendEvent;
      var bindEvent;
      return {
        $$type: 'ais.hits',
        init: function init(initOptions) {
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: initOptions.instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var renderState = this.getWidgetRenderState(renderOptions);
          renderFn(_objectSpread2(_objectSpread2({}, renderState), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
          renderState.sendEvent('view', renderState.hits);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            hits: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref2) {
          var results = _ref2.results,
            helper = _ref2.helper,
            instantSearchInstance = _ref2.instantSearchInstance;
          if (!sendEvent) {
            sendEvent = createSendEventForHits({
              instantSearchInstance: instantSearchInstance,
              index: helper.getIndex(),
              widgetType: this.$$type
            });
          }
          if (!bindEvent) {
            bindEvent = createBindEventForHits({
              index: helper.getIndex(),
              widgetType: this.$$type,
              instantSearchInstance: instantSearchInstance
            });
          }
          if (!results) {
            return {
              hits: [],
              results: undefined,
              sendEvent: sendEvent,
              bindEvent: bindEvent,
              widgetParams: widgetParams
            };
          }
          if (escapeHTML && results.hits.length > 0) {
            results.hits = escapeHits(results.hits);
          }
          var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
          var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
          var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID, {
            results: results
          });
          return {
            hits: transformedHits,
            results: results,
            sendEvent: sendEvent,
            bindEvent: bindEvent,
            widgetParams: widgetParams
          };
        },
        dispose: function dispose(_ref3) {
          var state = _ref3.state;
          unmountFn();
          if (!escapeHTML) {
            return state;
          }
          return state.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function (acc, key) {
            return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, undefined));
          }, {}));
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(state) {
          if (!escapeHTML) {
            return state;
          }
          return state.setQueryParameters(TAG_PLACEHOLDER);
        }
      };
    };
  };

  var getSelectedHits = function getSelectedHits(hits, selectedObjectIDs) {
    return selectedObjectIDs.map(function (objectID) {
      var hit = find(hits, function (h) {
        return h.objectID === objectID;
      });
      if (typeof hit === 'undefined') {
        throw new Error("Could not find objectID \"".concat(objectID, "\" passed to `clickedObjectIDsAfterSearch` in the returned hits. This is necessary to infer the absolute position and the query ID."));
      }
      return hit;
    });
  };
  var getQueryID = function getQueryID(selectedHits) {
    var queryIDs = uniq(selectedHits.map(function (hit) {
      return hit.__queryID;
    }));
    if (queryIDs.length > 1) {
      throw new Error('Insights currently allows a single `queryID`. The `objectIDs` provided map to multiple `queryID`s.');
    }
    var queryID = queryIDs[0];
    if (typeof queryID !== 'string') {
      throw new Error("Could not infer `queryID`. Ensure InstantSearch `clickAnalytics: true` was added with the Configure widget.\n\nSee: https://alg.li/lNiZZ7");
    }
    return queryID;
  };
  var getPositions = function getPositions(selectedHits) {
    return selectedHits.map(function (hit) {
      return hit.__position;
    });
  };
  var inferPayload = function inferPayload(_ref) {
    var method = _ref.method,
      results = _ref.results,
      hits = _ref.hits,
      objectIDs = _ref.objectIDs;
    var index = results.index;
    var selectedHits = getSelectedHits(hits, objectIDs);
    var queryID = getQueryID(selectedHits);
    switch (method) {
      case 'clickedObjectIDsAfterSearch':
        {
          var positions = getPositions(selectedHits);
          return {
            index: index,
            queryID: queryID,
            objectIDs: objectIDs,
            positions: positions
          };
        }
      case 'convertedObjectIDsAfterSearch':
        return {
          index: index,
          queryID: queryID,
          objectIDs: objectIDs
        };
      default:
        throw new Error("Unsupported method passed to insights: \"".concat(method, "\"."));
    }
  };
  var wrapInsightsClient = function wrapInsightsClient(aa, results, hits) {
    return function (method) {
      for (var _len = arguments.length, payloads = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payloads[_key - 1] = arguments[_key];
      }
      var payload = payloads[0];
       _warning(false, "`insights` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") ;
      if (!aa) {
        var withInstantSearchUsage = createDocumentationMessageGenerator({
          name: 'instantsearch'
        });
        throw new Error(withInstantSearchUsage('The `insightsClient` option has not been provided to `instantsearch`.'));
      }
      if (!Array.isArray(payload.objectIDs)) {
        throw new TypeError('Expected `objectIDs` to be an array.');
      }
      var inferredPayload = inferPayload({
        method: method,
        results: results,
        hits: hits,
        objectIDs: payload.objectIDs
      });
      aa(method, _objectSpread2(_objectSpread2({}, inferredPayload), payload));
    };
  };

  /**
   * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
   * It passes `insights` to `HitsWithInsightsListener` and `InfiniteHitsWithInsightsListener`.
   */
  function withInsights(connector) {
    return function (renderFn, unmountFn) {
      return connector(function (renderOptions, isFirstRender) {
        var results = renderOptions.results,
          hits = renderOptions.hits,
          instantSearchInstance = renderOptions.instantSearchInstance;
        if (results && hits && instantSearchInstance) {
          var insights = wrapInsightsClient(instantSearchInstance.insightsClient, results, hits);
          return renderFn(_objectSpread2(_objectSpread2({}, renderOptions), {}, {
            insights: insights
          }), isFirstRender);
        }
        return renderFn(renderOptions, isFirstRender);
      }, unmountFn);
    };
  }

  var n,l,u,t,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function h(l,u,i){var t,o,r,f={};for(r in u)"key"==r?t=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return v(l,f,t,o,null)}function v(n,i,t,o,r){var f={type:n,props:i,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++u:r};return null==r&&null!=l.vnode&&l.vnode(f),f}function y(){return {current:null}}function p(n){return n.children}function d(n,l){this.props=n,this.context=l;}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?_(n):null}function k(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return k(n)}}function b(n){(!n.__d&&(n.__d=!0)&&t.push(n)&&!g.__r++||o!==l.debounceRendering)&&((o=l.debounceRendering)||setTimeout)(g);}function g(){for(var n;g.__r=t.length;)n=t.sort(function(n,l){return n.__v.__b-l.__v.__b}),t=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=s({},t)).__v=t.__v+1,j(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?_(t):o,t.__h),z(u,t),t.__e!=o&&k(t)));});}function w(n,l,u,i,t,o,r,c,s,a){var h,y,d,k,b,g,w,x=i&&i.__k||e,C=x.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(p,{children:k},null,null,null):k.__b>0?v(k.type,k.props,k.key,k.ref?k.ref:null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(d=x[h])||d&&k.key==d.key&&k.type===d.type)x[h]=void 0;else for(y=0;y<C;y++){if((d=x[y])&&k.key==d.key&&k.type===d.type){x[y]=void 0;break}d=null;}j(n,k,d=d||f,t,o,r,c,s,a),b=k.__e,(y=k.ref)&&d.ref!=y&&(w||(w=[]),d.ref&&w.push(d.ref,null,k),w.push(y,k.__c||b,k)),null!=b?(null==g&&(g=b),"function"==typeof k.type&&k.__k===d.__k?k.__d=s=m(k,s,n):s=A(n,k,d,x,b,s),"function"==typeof u.type&&(u.__d=s)):s&&d.__e==s&&s.parentNode!=n&&(s=_(d));}for(u.__e=g,h=C;h--;)null!=x[h]&&("function"==typeof u.type&&null!=x[h].__e&&x[h].__e==u.__d&&(u.__d=_(i,h+1)),N(x[h],x[h]));if(w)for(h=0;h<w.length;h++)M(w[h],w[++h],w[++h]);}function m(n,l,u){for(var i,t=n.__k,o=0;t&&o<t.length;o++)(i=t[o])&&(i.__=n,l="function"==typeof i.type?m(i,l,u):A(u,i,i,t,i.__e,l));return l}function A(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else{for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o;}return void 0!==r?r:t.nextSibling}function C(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||H(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||H(n,o,l[o],u[o],i);}function $(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px";}function H(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||$(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||$(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?T:I,o):n.removeEventListener(l,o?T:I,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l));}}function I(n){this.l[n.type+!1](l.event?l.event(n):n);}function T(n){this.l[n.type+!0](l.event?l.event(n):n);}function j(n,u,i,t,o,r,f,e,c){var a,h,v,y,_,k,b,g,m,x,A,C,$,H=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=l.__b)&&a(u);try{n:if("function"==typeof H){if(g=u.props,m=(a=H.contextType)&&t[a.__c],x=a?m?m.props.value:a.__:t,i.__c?b=(h=u.__c=i.__c).__=h.__E:("prototype"in H&&H.prototype.render?u.__c=h=new H(g,x):(u.__c=h=new d(g,x),h.constructor=H,h.render=O),m&&m.sub(h),h.props=g,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=H.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=s({},h.__s)),s(h.__s,H.getDerivedStateFromProps(g,h.__s))),y=h.props,_=h.state,v)null==H.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(null==H.getDerivedStateFromProps&&g!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(g,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(g,h.__s,x)||u.__v===i.__v){h.props=g,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u);}),h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(g,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,_,k);});}if(h.context=x,h.props=g,h.__v=u,h.__P=n,A=l.__r,C=0,"prototype"in H&&H.prototype.render)h.state=h.__s,h.__d=!1,A&&A(u),a=h.render(h.props,h.state,h.context);else do{h.__d=!1,A&&A(u),a=h.render(h.props,h.state,h.context),h.state=h.__s;}while(h.__d&&++C<25);h.state=h.__s,null!=h.getChildContext&&(t=s(s({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(k=h.getSnapshotBeforeUpdate(y,_)),$=null!=a&&a.type===p&&null==a.key?a.props.children:a,w(n,Array.isArray($)?$:[$],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),b&&(h.__E=h.__=null),h.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=L(i.__e,u,i,t,o,r,f,c);(a=l.diffed)&&a(u);}catch(n){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),l.__e(n,u,i);}}function z(n,u){l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l.__e(n,u.__v);}});}function L(l,u,i,t,o,r,e,c){var s,h,v,y=i.props,p=u.props,d=u.type,k=0;if("svg"===d&&(o=!0),null!=r)for(;k<r.length;k++)if((s=r[k])&&"setAttribute"in s==!!d&&(d?s.localName===d:3===s.nodeType)){l=s,r[k]=null;break}if(null==l){if(null===d)return document.createTextNode(p);l=o?document.createElementNS("http://www.w3.org/2000/svg",d):document.createElement(d,p.is&&p),r=null,c=!1;}if(null===d)y===p||c&&l.data===p||(l.data=p);else{if(r=r&&n.call(l.childNodes),h=(y=i.props||f).dangerouslySetInnerHTML,v=p.dangerouslySetInnerHTML,!c){if(null!=r)for(y={},k=0;k<l.attributes.length;k++)y[l.attributes[k].name]=l.attributes[k].value;(v||h)&&(v&&(h&&v.__html==h.__html||v.__html===l.innerHTML)||(l.innerHTML=v&&v.__html||""));}if(C(l,p,y,o,c),v)u.__k=[];else if(k=u.props.children,w(l,Array.isArray(k)?k:[k],u,i,t,o&&"foreignObject"!==d,r,e,r?r[0]:i.__k&&_(i,0),c),null!=r)for(k=r.length;k--;)null!=r[k]&&a(r[k]);c||("value"in p&&void 0!==(k=p.value)&&(k!==l.value||"progress"===d&&!k||"option"===d&&k!==y.value)&&H(l,"value",k,y.value,!1),"checked"in p&&void 0!==(k=p.checked)&&k!==l.checked&&H(l,"checked",k,y.checked,!1));}return l}function M(n,u,i){try{"function"==typeof n?n(u):n.current=u;}catch(n){l.__e(n,i);}}function N(n,u,i){var t,o;if(l.unmount&&l.unmount(n),(t=n.ref)&&(t.current&&t.current!==n.__e||M(t,null,u)),null!=(t=n.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(n){l.__e(n,u);}t.base=t.__P=null,n.__c=void 0;}if(t=n.__k)for(o=0;o<t.length;o++)t[o]&&N(t[o],u,"function"!=typeof n.type);i||null==n.__e||a(n.__e),n.__=n.__e=n.__d=void 0;}function O(n,l,u){return this.constructor(n,u)}function P(u,i,t){var o,r,e;l.__&&l.__(u,i),r=(o="function"==typeof t)?null:t&&t.__k||i.__k,e=[],j(i,u=(!o&&t||i).__k=h(p,null,[u]),r||f,f,void 0!==i.ownerSVGElement,!o&&t?[t]:r?null:i.firstChild?n.call(i.childNodes):null,e,!o&&t?t:r?r.__e:i.firstChild,o),z(e,u);}n=e.slice,l={__e:function(n,l,u,i){for(var t,o,r;l=l.__;)if((t=l.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(n)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(n,i||{}),r=t.__d),r)return t.__E=t}catch(l){n=l;}throw n}},u=0,d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(s({},u),this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),b(this));},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),b(this));},d.prototype.render=p,t=[],g.__r=0,r=0;

  function readDataAttributes(domElement) {
    var method = domElement.getAttribute('data-insights-method');
    var serializedPayload = domElement.getAttribute('data-insights-payload');
    if (typeof serializedPayload !== 'string') {
      throw new Error('The insights helper expects `data-insights-payload` to be a base64-encoded JSON string.');
    }
    try {
      var payload = deserializePayload(serializedPayload);
      return {
        method: method,
        payload: payload
      };
    } catch (error) {
      throw new Error('The insights helper was unable to parse `data-insights-payload`.');
    }
  }
  function hasDataAttributes(domElement) {
    return domElement.hasAttribute('data-insights-method');
  }
  function writeDataAttributes(_ref) {
    var method = _ref.method,
      payload = _ref.payload;
    if (_typeof(payload) !== 'object') {
      throw new Error("The insights helper expects the payload to be an object.");
    }
    var serializedPayload;
    try {
      serializedPayload = serializePayload(payload);
    } catch (error) {
      throw new Error("Could not JSON serialize the payload object.");
    }
    return "data-insights-method=\"".concat(method, "\" data-insights-payload=\"").concat(serializedPayload, "\"");
  }

  /**
   * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
   */
  function insights(method, payload) {
     _warning(false, "`insights` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") ;
    return writeDataAttributes({
      method: method,
      payload: payload
    });
  }

  var findInsightsTarget = function findInsightsTarget(startElement, endElement, validator) {
    var element = startElement;
    while (element && !validator(element)) {
      if (element === endElement) {
        return null;
      }
      element = element.parentElement;
    }
    return element;
  };
  var parseInsightsEvent = function parseInsightsEvent(element) {
    var serializedPayload = element.getAttribute('data-insights-event');
    if (typeof serializedPayload !== 'string') {
      throw new Error('The insights middleware expects `data-insights-event` to be a base64-encoded JSON string.');
    }
    try {
      return deserializePayload(serializedPayload);
    } catch (error) {
      throw new Error('The insights middleware was unable to parse `data-insights-event`.');
    }
  };
  var insightsListener = function insightsListener(BaseComponent) {
    function WithInsightsListener(props) {
      var handleClick = function handleClick(event) {
        if (props.sendEvent) {
          // new way with insights middleware
          var targetWithEvent = findInsightsTarget(event.target, event.currentTarget, function (element) {
            return element.hasAttribute('data-insights-event');
          });
          if (targetWithEvent) {
            var payload = parseInsightsEvent(targetWithEvent);
            payload.forEach(function (single) {
              return props.sendEvent(single);
            });
          }
        }

        // old way, e.g. instantsearch.insights("clickedObjectIDsAfterSearch", { .. })
        var insightsTarget = findInsightsTarget(event.target, event.currentTarget, function (element) {
          return hasDataAttributes(element);
        });
        if (insightsTarget) {
          var _readDataAttributes = readDataAttributes(insightsTarget),
            method = _readDataAttributes.method,
            _payload = _readDataAttributes.payload;
          props.insights(method, _payload);
        }
      };
      return h("div", {
        onClick: handleClick
      }, h(BaseComponent, props));
    }
    return WithInsightsListener;
  };

  var connectHitsWithInsights = withInsights(connectHits);

  var withUsage$6 = createDocumentationMessageGenerator({
    name: 'hits-per-page',
    connector: true
  });
  var connectHitsPerPage = function connectHitsPerPage(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$6());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        userItems = _ref.items,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
          return items;
        } : _ref$transformItems;
      if (!Array.isArray(userItems)) {
        throw new Error(withUsage$6('The `items` option expects an array of objects.'));
      }
      var items = userItems;
      var defaultItems = items.filter(function (item) {
        return item.default === true;
      });
      if (defaultItems.length === 0) {
        throw new Error(withUsage$6("A default value must be specified in `items`."));
      }
      if (defaultItems.length > 1) {
        throw new Error(withUsage$6('More than one default value is specified in `items`.'));
      }
      var defaultItem = defaultItems[0];
      var normalizeItems = function normalizeItems(_ref2) {
        var hitsPerPage = _ref2.hitsPerPage;
        return items.map(function (item) {
          return _objectSpread2(_objectSpread2({}, item), {}, {
            isRefined: Number(item.value) === Number(hitsPerPage)
          });
        });
      };
      var connectorState = {
        getRefine: function getRefine(helper) {
          return function (value) {
            return !value && value !== 0 ? helper.setQueryParameter('hitsPerPage', undefined).search() : helper.setQueryParameter('hitsPerPage', value).search();
          };
        },
        createURLFactory: function createURLFactory(_ref3) {
          var state = _ref3.state,
            createURL = _ref3.createURL;
          return function (value) {
            return createURL(state.resetPage().setQueryParameter('hitsPerPage', !value && value !== 0 ? undefined : value));
          };
        }
      };
      return {
        $$type: 'ais.hitsPerPage',
        init: function init(initOptions) {
          var state = initOptions.state,
            instantSearchInstance = initOptions.instantSearchInstance;
          var isCurrentInOptions = items.some(function (item) {
            return Number(state.hitsPerPage) === Number(item.value);
          });
          if (!isCurrentInOptions) {
             _warning(state.hitsPerPage !== undefined, "\n`hitsPerPage` is not defined.\nThe option `hitsPerPage` needs to be set using the `configure` widget.\n\nLearn more: https://www.algolia.com/doc/api-reference/widgets/hits-per-page/js/\n            ") ;
             _warning(false, "\nThe `items` option of `hitsPerPage` does not contain the \"hits per page\" value coming from the state: ".concat(state.hitsPerPage, ".\n\nYou may want to add another entry to the `items` option with this value.")) ;
            items = [
            // The helper will convert the empty string to `undefined`.
            {
              value: '',
              label: ''
            }].concat(_toConsumableArray(items));
          }
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref4) {
          var state = _ref4.state;
          unmountFn();
          return state.setQueryParameter('hitsPerPage', undefined);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            hitsPerPage: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref5) {
          var state = _ref5.state,
            results = _ref5.results,
            createURL = _ref5.createURL,
            helper = _ref5.helper;
          var canRefine = results ? results.nbHits > 0 : false;
          return {
            items: transformItems(normalizeItems(state), {
              results: results
            }),
            refine: connectorState.getRefine(helper),
            createURL: connectorState.createURLFactory({
              state: state,
              createURL: createURL
            }),
            hasNoResults: !canRefine,
            canRefine: canRefine,
            widgetParams: widgetParams
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref6) {
          var searchParameters = _ref6.searchParameters;
          var hitsPerPage = searchParameters.hitsPerPage;
          if (hitsPerPage === undefined || hitsPerPage === defaultItem.value) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            hitsPerPage: hitsPerPage
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
          var uiState = _ref7.uiState;
          return searchParameters.setQueryParameters({
            hitsPerPage: uiState.hitsPerPage || defaultItem.value
          });
        }
      };
    };
  };

  var _excluded$2 = ["page"];
  var withUsage$7 = createDocumentationMessageGenerator({
    name: 'infinite-hits',
    connector: true
  });
  function getStateWithoutPage(state) {
    var _ref = state || {},
      page = _ref.page,
      rest = _objectWithoutProperties(_ref, _excluded$2);
    return rest;
  }
  function getInMemoryCache() {
    var cachedHits = null;
    var cachedState = null;
    return {
      read: function read(_ref2) {
        var state = _ref2.state;
        return isEqual(cachedState, getStateWithoutPage(state)) ? cachedHits : null;
      },
      write: function write(_ref3) {
        var state = _ref3.state,
          hits = _ref3.hits;
        cachedState = getStateWithoutPage(state);
        cachedHits = hits;
      }
    };
  }
  function extractHitsFromCachedHits(cachedHits) {
    return Object.keys(cachedHits).map(Number).sort(function (a, b) {
      return a - b;
    }).reduce(function (acc, page) {
      return acc.concat(cachedHits[page]);
    }, []);
  }
  var connectInfiniteHits = function connectInfiniteHits(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$7());

    // @TODO: this should be a generic, but a Connector can not yet be generic itself

    return function (widgetParams) {
      var _ref4 = widgetParams || {},
        _ref4$escapeHTML = _ref4.escapeHTML,
        escapeHTML = _ref4$escapeHTML === void 0 ? true : _ref4$escapeHTML,
        _ref4$transformItems = _ref4.transformItems,
        transformItems = _ref4$transformItems === void 0 ? function (items) {
          return items;
        } : _ref4$transformItems,
        _ref4$cache = _ref4.cache,
        cache = _ref4$cache === void 0 ? getInMemoryCache() : _ref4$cache;
      var showPrevious;
      var showMore;
      var sendEvent;
      var bindEvent;
      var getFirstReceivedPage = function getFirstReceivedPage(state, cachedHits) {
        var _state$page = state.page,
          page = _state$page === void 0 ? 0 : _state$page;
        var pages = Object.keys(cachedHits).map(Number);
        if (pages.length === 0) {
          return page;
        } else {
          return Math.min.apply(Math, [page].concat(_toConsumableArray(pages)));
        }
      };
      var getLastReceivedPage = function getLastReceivedPage(state, cachedHits) {
        var _state$page2 = state.page,
          page = _state$page2 === void 0 ? 0 : _state$page2;
        var pages = Object.keys(cachedHits).map(Number);
        if (pages.length === 0) {
          return page;
        } else {
          return Math.max.apply(Math, [page].concat(_toConsumableArray(pages)));
        }
      };
      var getShowPrevious = function getShowPrevious(helper) {
        return function () {
          // Using the helper's `overrideStateWithoutTriggeringChangeEvent` method
          // avoid updating the browser URL when the user displays the previous page.
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread2(_objectSpread2({}, helper.state), {}, {
            page: getFirstReceivedPage(helper.state, cache.read({
              state: helper.state
            }) || {}) - 1
          })).searchWithoutTriggeringOnStateChange();
        };
      };
      var getShowMore = function getShowMore(helper) {
        return function () {
          helper.setPage(getLastReceivedPage(helper.state, cache.read({
            state: helper.state
          }) || {}) + 1).search();
        };
      };
      return {
        $$type: 'ais.infiniteHits',
        init: function init(initOptions) {
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: initOptions.instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          var widgetRenderState = this.getWidgetRenderState(renderOptions);
          renderFn(_objectSpread2(_objectSpread2({}, widgetRenderState), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
          sendEvent('view', widgetRenderState.currentPageHits);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            infiniteHits: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref5) {
          var results = _ref5.results,
            helper = _ref5.helper,
            parent = _ref5.parent,
            existingState = _ref5.state,
            instantSearchInstance = _ref5.instantSearchInstance;
          var isFirstPage;
          var currentPageHits = [];
          /**
           * We bail out of optimistic UI here, as the cache is based on search
           * parameters, and we don't want to invalidate the cache when the search
           * is loading.
           */
          var state = parent.getPreviousState() || existingState;
          var cachedHits = cache.read({
            state: state
          }) || {};
          if (!results) {
            showPrevious = getShowPrevious(helper);
            showMore = getShowMore(helper);
            sendEvent = createSendEventForHits({
              instantSearchInstance: instantSearchInstance,
              index: helper.getIndex(),
              widgetType: this.$$type
            });
            bindEvent = createBindEventForHits({
              index: helper.getIndex(),
              widgetType: this.$$type,
              instantSearchInstance: instantSearchInstance
            });
            isFirstPage = state.page === undefined || getFirstReceivedPage(state, cachedHits) === 0;
          } else {
            var _state$page3 = state.page,
              _page = _state$page3 === void 0 ? 0 : _state$page3;
            if (escapeHTML && results.hits.length > 0) {
              results.hits = escapeHits(results.hits);
            }
            var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
            var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
            var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID, {
              results: results
            });
            if (cachedHits[_page] === undefined && !results.__isArtificial && instantSearchInstance.status === 'idle') {
              cachedHits[_page] = transformedHits;
              cache.write({
                state: state,
                hits: cachedHits
              });
            }
            currentPageHits = transformedHits;
            isFirstPage = getFirstReceivedPage(state, cachedHits) === 0;
          }
          var hits = extractHitsFromCachedHits(cachedHits);
          var isLastPage = results ? results.nbPages <= getLastReceivedPage(state, cachedHits) + 1 : true;
          return {
            hits: hits,
            currentPageHits: currentPageHits,
            sendEvent: sendEvent,
            bindEvent: bindEvent,
            results: results,
            showPrevious: showPrevious,
            showMore: showMore,
            isFirstPage: isFirstPage,
            isLastPage: isLastPage,
            widgetParams: widgetParams
          };
        },
        dispose: function dispose(_ref6) {
          var state = _ref6.state;
          unmountFn();
          var stateWithoutPage = state.setQueryParameter('page', undefined);
          if (!escapeHTML) {
            return stateWithoutPage;
          }
          return stateWithoutPage.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function (acc, key) {
            return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, undefined));
          }, {}));
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref7) {
          var searchParameters = _ref7.searchParameters;
          var page = searchParameters.page || 0;
          if (!page) {
            // return without adding `page` to uiState
            // because we don't want `page=1` in the URL
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            // The page in the UI state is incremented by one
            // to expose the user value (not `0`).
            page: page + 1
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref8) {
          var uiState = _ref8.uiState;
          var widgetSearchParameters = searchParameters;
          if (escapeHTML) {
            widgetSearchParameters = searchParameters.setQueryParameters(TAG_PLACEHOLDER);
          }

          // The page in the search parameters is decremented by one
          // to get to the actual parameter value from the UI state.
          var page = uiState.page ? uiState.page - 1 : 0;
          return widgetSearchParameters.setQueryParameter('page', page);
        }
      };
    };
  };

  var connectInfiniteHitsWithInsights = withInsights(connectInfiniteHits);

  var _excluded$3 = ["name", "escapedValue", "path"];
  var withUsage$8 = createDocumentationMessageGenerator({
    name: 'menu',
    connector: true
  });
  var DEFAULT_SORT$1 = ['isRefined', 'name:asc'];
  /**
   * **Menu** connector provides the logic to build a widget that will give the user the ability to choose a single value for a specific facet. The typical usage of menu is for navigation in categories.
   *
   * This connector provides a `toggleShowMore()` function to display more or less items and a `refine()`
   * function to select an item. While selecting a new element, the `refine` will also unselect the
   * one that is currently selected.
   *
   * **Requirement:** the attribute passed as `attribute` must be present in "attributes for faceting" on the Algolia dashboard or configured as attributesForFaceting via a set settings call to the Algolia API.
   */
  var connectMenu = function connectMenu(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$8());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        attribute = _ref.attribute,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? 10 : _ref$limit,
        _ref$showMore = _ref.showMore,
        showMore = _ref$showMore === void 0 ? false : _ref$showMore,
        _ref$showMoreLimit = _ref.showMoreLimit,
        showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit,
        _ref$sortBy = _ref.sortBy,
        sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT$1 : _ref$sortBy,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
          return items;
        } : _ref$transformItems;
      if (!attribute) {
        throw new Error(withUsage$8('The `attribute` option is required.'));
      }
      if (showMore === true && showMoreLimit <= limit) {
        throw new Error(withUsage$8('The `showMoreLimit` option must be greater than `limit`.'));
      }
      var sendEvent;
      var _createURL;
      var _refine;

      // Provide the same function to the `renderFn` so that way the user
      // has to only bind it once when `isFirstRendering` for instance
      var isShowingMore = false;
      var toggleShowMore = function toggleShowMore() {};
      function createToggleShowMore(renderOptions, widget) {
        return function () {
          isShowingMore = !isShowingMore;
          widget.render(renderOptions);
        };
      }
      function cachedToggleShowMore() {
        toggleShowMore();
      }
      function getLimit() {
        return isShowingMore ? showMoreLimit : limit;
      }
      return {
        $$type: 'ais.menu',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref2) {
          var state = _ref2.state;
          unmountFn();
          return state.removeHierarchicalFacet(attribute).setQueryParameter('maxValuesPerFacet', undefined);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            menu: _objectSpread2(_objectSpread2({}, renderState.menu), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(renderOptions) {
          var results = renderOptions.results,
            createURL = renderOptions.createURL,
            instantSearchInstance = renderOptions.instantSearchInstance,
            helper = renderOptions.helper;
          var items = [];
          var canToggleShowMore = false;
          if (!sendEvent) {
            sendEvent = createSendEventForFacet({
              instantSearchInstance: instantSearchInstance,
              helper: helper,
              attribute: attribute,
              widgetType: this.$$type
            });
          }
          if (!_createURL) {
            _createURL = function _createURL(facetValue) {
              return createURL(helper.state.resetPage().toggleFacetRefinement(attribute, facetValue));
            };
          }
          if (!_refine) {
            _refine = function _refine(facetValue) {
              var _helper$getHierarchic = helper.getHierarchicalFacetBreadcrumb(attribute),
                _helper$getHierarchic2 = _slicedToArray(_helper$getHierarchic, 1),
                refinedItem = _helper$getHierarchic2[0];
              sendEvent('click', facetValue ? facetValue : refinedItem);
              helper.toggleFacetRefinement(attribute, facetValue ? facetValue : refinedItem).search();
            };
          }
          if (renderOptions.results) {
            toggleShowMore = createToggleShowMore(renderOptions, this);
          }
          if (results) {
            var facetValues = results.getFacetValues(attribute, {
              sortBy: sortBy,
              facetOrdering: sortBy === DEFAULT_SORT$1
            });
            var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
            canToggleShowMore = showMore && (isShowingMore || facetItems.length > getLimit());
            items = transformItems(facetItems.slice(0, getLimit()).map(function (_ref3) {
              var label = _ref3.name,
                value = _ref3.escapedValue,
                path = _ref3.path,
                item = _objectWithoutProperties(_ref3, _excluded$3);
              return _objectSpread2(_objectSpread2({}, item), {}, {
                label: label,
                value: value
              });
            }), {
              results: results
            });
          }
          return {
            items: items,
            createURL: _createURL,
            refine: _refine,
            sendEvent: sendEvent,
            canRefine: items.length > 0,
            widgetParams: widgetParams,
            isShowingMore: isShowingMore,
            toggleShowMore: cachedToggleShowMore,
            canToggleShowMore: canToggleShowMore
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
          var searchParameters = _ref4.searchParameters;
          var _searchParameters$get = searchParameters.getHierarchicalFacetBreadcrumb(attribute),
            _searchParameters$get2 = _slicedToArray(_searchParameters$get, 1),
            value = _searchParameters$get2[0];
          if (!value) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            menu: _objectSpread2(_objectSpread2({}, uiState.menu), {}, _defineProperty({}, attribute, value))
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
          var uiState = _ref5.uiState;
          var value = uiState.menu && uiState.menu[attribute];
          if (searchParameters.isConjunctiveFacet(attribute) || searchParameters.isDisjunctiveFacet(attribute)) {
             _warning(false, "Menu: Attribute \"".concat(attribute, "\" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this Menu widget will not work at all.")) ;
            return searchParameters;
          }
          var withFacetConfiguration = searchParameters.removeHierarchicalFacet(attribute).addHierarchicalFacet({
            name: attribute,
            attributes: [attribute]
          });
          var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
          var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
          var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);
          if (!value) {
            return withMaxValuesPerFacet.setQueryParameters({
              hierarchicalFacetsRefinements: _objectSpread2(_objectSpread2({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty({}, attribute, []))
            });
          }
          return withMaxValuesPerFacet.addHierarchicalFacetRefinement(attribute, value);
        }
      };
    };
  };

  var withUsage$9 = createDocumentationMessageGenerator({
    name: 'numeric-menu',
    connector: true
  });
  var $$type = 'ais.numericMenu';
  var createSendEvent = function createSendEvent(_ref) {
    var instantSearchInstance = _ref.instantSearchInstance;
    return function () {
      if (arguments.length === 1) {
        instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? undefined : arguments[0]);
        return;
      }
    };
  };
  var connectNumericMenu = function connectNumericMenu(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$9());
    return function (widgetParams) {
      var _ref2 = widgetParams || {},
        _ref2$attribute = _ref2.attribute,
        attribute = _ref2$attribute === void 0 ? '' : _ref2$attribute,
        _ref2$items = _ref2.items,
        items = _ref2$items === void 0 ? [] : _ref2$items,
        _ref2$transformItems = _ref2.transformItems,
        transformItems = _ref2$transformItems === void 0 ? function (item) {
          return item;
        } : _ref2$transformItems;
      if (attribute === '') {
        throw new Error(withUsage$9('The `attribute` option is required.'));
      }
      if (!items || items.length === 0) {
        throw new Error(withUsage$9('The `items` option expects an array of objects.'));
      }
      var prepareItems = function prepareItems(state) {
        return items.map(function (_ref3) {
          var start = _ref3.start,
            end = _ref3.end,
            label = _ref3.label;
          return {
            label: label,
            value: encodeURI(JSON.stringify({
              start: start,
              end: end
            })),
            isRefined: isRefined(state, attribute, {
              start: start,
              end: end,
              label: label
            })
          };
        });
      };
      var connectorState = {};
      return {
        $$type: $$type,
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref4) {
          var state = _ref4.state;
          unmountFn();
          return state.clearRefinements(attribute);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
          var searchParameters = _ref5.searchParameters;
          var values = searchParameters.getNumericRefinements(attribute);
          var equal = values['='] && values['='][0];
          if (equal || equal === 0) {
            return _objectSpread2(_objectSpread2({}, uiState), {}, {
              numericMenu: _objectSpread2(_objectSpread2({}, uiState.numericMenu), {}, _defineProperty({}, attribute, "".concat(values['='])))
            });
          }
          var min = values['>='] && values['>='][0] || '';
          var max = values['<='] && values['<='][0] || '';
          if (min === '' && max === '') {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            numericMenu: _objectSpread2(_objectSpread2({}, uiState.numericMenu), {}, _defineProperty({}, attribute, "".concat(min, ":").concat(max)))
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
          var uiState = _ref6.uiState;
          var value = uiState.numericMenu && uiState.numericMenu[attribute];
          var withoutRefinements = searchParameters.clearRefinements(attribute);
          if (!value) {
            return withoutRefinements.setQueryParameters({
              numericRefinements: _objectSpread2(_objectSpread2({}, withoutRefinements.numericRefinements), {}, _defineProperty({}, attribute, {}))
            });
          }
          var isExact = value.indexOf(':') === -1;
          if (isExact) {
            return withoutRefinements.addNumericRefinement(attribute, '=', Number(value));
          }
          var _value$split$map = value.split(':').map(parseFloat),
            _value$split$map2 = _slicedToArray(_value$split$map, 2),
            min = _value$split$map2[0],
            max = _value$split$map2[1];
          var withMinRefinement = isFiniteNumber(min) ? withoutRefinements.addNumericRefinement(attribute, '>=', min) : withoutRefinements;
          var withMaxRefinement = isFiniteNumber(max) ? withMinRefinement.addNumericRefinement(attribute, '<=', max) : withMinRefinement;
          return withMaxRefinement;
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            numericMenu: _objectSpread2(_objectSpread2({}, renderState.numericMenu), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref7) {
          var results = _ref7.results,
            state = _ref7.state,
            instantSearchInstance = _ref7.instantSearchInstance,
            helper = _ref7.helper,
            createURL = _ref7.createURL;
          if (!connectorState.refine) {
            connectorState.refine = function (facetValue) {
              var refinedState = getRefinedState(helper.state, attribute, facetValue);
              connectorState.sendEvent('click', facetValue);
              helper.setState(refinedState).search();
            };
          }
          if (!connectorState.createURL) {
            connectorState.createURL = function (newState) {
              return function (facetValue) {
                return createURL(getRefinedState(newState, attribute, facetValue));
              };
            };
          }
          if (!connectorState.sendEvent) {
            connectorState.sendEvent = createSendEvent({
              instantSearchInstance: instantSearchInstance
            });
          }
          var hasNoResults = results ? results.nbHits === 0 : true;
          var preparedItems = prepareItems(state);
          var allIsSelected = true;
          // @TODO avoid for..of for polyfill reasons
          // eslint-disable-next-line no-restricted-syntax
          var _iterator = _createForOfIteratorHelper(preparedItems),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var item = _step.value;
              if (item.isRefined && decodeURI(item.value) !== '{}') {
                allIsSelected = false;
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return {
            createURL: connectorState.createURL(state),
            items: transformItems(preparedItems, {
              results: results
            }),
            hasNoResults: hasNoResults,
            canRefine: !(hasNoResults && allIsSelected),
            refine: connectorState.refine,
            sendEvent: connectorState.sendEvent,
            widgetParams: widgetParams
          };
        }
      };
    };
  };
  function isRefined(state, attribute, option) {
    // @TODO: same as another spot, why is this mixing arrays & elements?
    var currentRefinements = state.getNumericRefinements(attribute);
    if (option.start !== undefined && option.end !== undefined) {
      if (option.start === option.end) {
        return hasNumericRefinement(currentRefinements, '=', option.start);
      } else {
        return hasNumericRefinement(currentRefinements, '>=', option.start) && hasNumericRefinement(currentRefinements, '<=', option.end);
      }
    }
    if (option.start !== undefined) {
      return hasNumericRefinement(currentRefinements, '>=', option.start);
    }
    if (option.end !== undefined) {
      return hasNumericRefinement(currentRefinements, '<=', option.end);
    }
    if (option.start === undefined && option.end === undefined) {
      return Object.keys(currentRefinements).every(function (operator) {
        return (currentRefinements[operator] || []).length === 0;
      });
    }
    return false;
  }
  function getRefinedState(state, attribute, facetValue) {
    var resolvedState = state;
    var refinedOption = JSON.parse(decodeURI(facetValue));

    // @TODO: why is array / element mixed here & hasRefinements; seems wrong?
    var currentRefinements = resolvedState.getNumericRefinements(attribute);
    if (refinedOption.start === undefined && refinedOption.end === undefined) {
      return resolvedState.removeNumericRefinement(attribute);
    }
    if (!isRefined(resolvedState, attribute, refinedOption)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute);
    }
    if (refinedOption.start !== undefined && refinedOption.end !== undefined) {
      if (refinedOption.start > refinedOption.end) {
        throw new Error('option.start should be > to option.end');
      }
      if (refinedOption.start === refinedOption.end) {
        if (hasNumericRefinement(currentRefinements, '=', refinedOption.start)) {
          resolvedState = resolvedState.removeNumericRefinement(attribute, '=', refinedOption.start);
        } else {
          resolvedState = resolvedState.addNumericRefinement(attribute, '=', refinedOption.start);
        }
        return resolvedState;
      }
    }
    if (refinedOption.start !== undefined) {
      if (hasNumericRefinement(currentRefinements, '>=', refinedOption.start)) {
        resolvedState = resolvedState.removeNumericRefinement(attribute, '>=', refinedOption.start);
      }
      resolvedState = resolvedState.addNumericRefinement(attribute, '>=', refinedOption.start);
    }
    if (refinedOption.end !== undefined) {
      if (hasNumericRefinement(currentRefinements, '<=', refinedOption.end)) {
        resolvedState = resolvedState.removeNumericRefinement(attribute, '<=', refinedOption.end);
      }
      resolvedState = resolvedState.addNumericRefinement(attribute, '<=', refinedOption.end);
    }
    if (typeof resolvedState.page === 'number') {
      resolvedState.page = 0;
    }
    return resolvedState;
  }
  function hasNumericRefinement(currentRefinements, operator, value) {
    return currentRefinements[operator] !== undefined && currentRefinements[operator].includes(value);
  }

  var Paginator = /*#__PURE__*/function () {
    function Paginator(params) {
      _classCallCheck(this, Paginator);
      _defineProperty(this, "currentPage", void 0);
      _defineProperty(this, "total", void 0);
      _defineProperty(this, "padding", void 0);
      this.currentPage = params.currentPage;
      this.total = params.total;
      this.padding = params.padding;
    }
    _createClass(Paginator, [{
      key: "pages",
      value: function pages() {
        var total = this.total,
          currentPage = this.currentPage,
          padding = this.padding;
        if (total === 0) return [0];
        var totalDisplayedPages = this.nbPagesDisplayed(padding, total);
        if (totalDisplayedPages === total) {
          return range({
            end: total
          });
        }
        var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
        var paddingRight = totalDisplayedPages - paddingLeft;
        var first = currentPage - paddingLeft;
        var last = currentPage + paddingRight;
        return range({
          start: first,
          end: last
        });
      }
    }, {
      key: "nbPagesDisplayed",
      value: function nbPagesDisplayed(padding, total) {
        return Math.min(2 * padding + 1, total);
      }
    }, {
      key: "calculatePaddingLeft",
      value: function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
        if (current <= padding) {
          return current;
        }
        if (current >= total - padding) {
          return totalDisplayedPages - (total - current);
        }
        return padding;
      }
    }, {
      key: "isLastPage",
      value: function isLastPage() {
        return this.currentPage === this.total - 1 || this.total === 0;
      }
    }, {
      key: "isFirstPage",
      value: function isFirstPage() {
        return this.currentPage === 0;
      }
    }]);
    return Paginator;
  }();

  var withUsage$a = createDocumentationMessageGenerator({
    name: 'pagination',
    connector: true
  });
  /**
   * **Pagination** connector provides the logic to build a widget that will let the user
   * choose the current page of the results.
   *
   * When using the pagination with Algolia, you should be aware that the engine won't provide you pages
   * beyond the 1000th hits by default. You can find more information on the [Algolia documentation](https://www.algolia.com/doc/guides/searching/pagination/#pagination-limitations).
   */
  var connectPagination = function connectPagination(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$a());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        totalPages = _ref.totalPages,
        _ref$padding = _ref.padding,
        padding = _ref$padding === void 0 ? 3 : _ref$padding;
      var pager = new Paginator({
        currentPage: 0,
        total: 0,
        padding: padding
      });
      var connectorState = {};
      function getMaxPage(_ref2) {
        var nbPages = _ref2.nbPages;
        return totalPages !== undefined ? Math.min(totalPages, nbPages) : nbPages;
      }
      return {
        $$type: 'ais.pagination',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref3) {
          var state = _ref3.state;
          unmountFn();
          return state.setQueryParameter('page', undefined);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
          var searchParameters = _ref4.searchParameters;
          var page = searchParameters.page || 0;
          if (!page) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            page: page + 1
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
          var uiState = _ref5.uiState;
          var page = uiState.page ? uiState.page - 1 : 0;
          return searchParameters.setQueryParameter('page', page);
        },
        getWidgetRenderState: function getWidgetRenderState(_ref6) {
          var results = _ref6.results,
            helper = _ref6.helper,
            state = _ref6.state,
            createURL = _ref6.createURL;
          if (!connectorState.refine) {
            connectorState.refine = function (page) {
              helper.setPage(page);
              helper.search();
            };
          }
          if (!connectorState.createURL) {
            connectorState.createURL = function (helperState) {
              return function (page) {
                return createURL(helperState.setPage(page));
              };
            };
          }
          var page = state.page || 0;
          var nbPages = getMaxPage(results || {
            nbPages: 0
          });
          pager.currentPage = page;
          pager.total = nbPages;
          return {
            createURL: connectorState.createURL(state),
            refine: connectorState.refine,
            canRefine: nbPages > 1,
            currentRefinement: page,
            nbHits: (results === null || results === void 0 ? void 0 : results.nbHits) || 0,
            nbPages: nbPages,
            pages: results ? pager.pages() : [],
            isFirstPage: pager.isFirstPage(),
            isLastPage: pager.isLastPage(),
            widgetParams: widgetParams
          };
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            pagination: this.getWidgetRenderState(renderOptions)
          });
        }
      };
    };
  };

  var withUsage$b = createDocumentationMessageGenerator({
    name: 'range-input',
    connector: true
  }, {
    name: 'range-slider',
    connector: true
  });
  var $$type$1 = 'ais.range';
  function toPrecision(_ref) {
    var min = _ref.min,
      max = _ref.max,
      precision = _ref.precision;
    var pow = Math.pow(10, precision);
    return {
      min: min ? Math.floor(min * pow) / pow : min,
      max: max ? Math.ceil(max * pow) / pow : max
    };
  }

  /**
   * **Range** connector provides the logic to create custom widget that will let
   * the user refine results using a numeric range.
   *
   * This connectors provides a `refine()` function that accepts bounds. It will also provide
   * information about the min and max bounds for the current result set.
   */
  var connectRange = function connectRange(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$b());
    return function (widgetParams) {
      var _ref2 = widgetParams || {},
        _ref2$attribute = _ref2.attribute,
        attribute = _ref2$attribute === void 0 ? '' : _ref2$attribute,
        minBound = _ref2.min,
        maxBound = _ref2.max,
        _ref2$precision = _ref2.precision,
        precision = _ref2$precision === void 0 ? 0 : _ref2$precision;
      if (!attribute) {
        throw new Error(withUsage$b('The `attribute` option is required.'));
      }
      if (isFiniteNumber(minBound) && isFiniteNumber(maxBound) && minBound > maxBound) {
        throw new Error(withUsage$b("The `max` option can't be lower than `min`."));
      }
      var formatToNumber = function formatToNumber(v) {
        return Number(Number(v).toFixed(precision));
      };
      var rangeFormatter = {
        from: function from(v) {
          return v.toLocaleString();
        },
        to: function to(v) {
          return formatToNumber(v).toLocaleString();
        }
      };

      // eslint-disable-next-line complexity
      var getRefinedState = function getRefinedState(helper, currentRange, nextMin, nextMax) {
        var resolvedState = helper.state;
        var currentRangeMin = currentRange.min,
          currentRangeMax = currentRange.max;
        var _ref3 = resolvedState.getNumericRefinement(attribute, '>=') || [],
          _ref4 = _slicedToArray(_ref3, 1),
          min = _ref4[0];
        var _ref5 = resolvedState.getNumericRefinement(attribute, '<=') || [],
          _ref6 = _slicedToArray(_ref5, 1),
          max = _ref6[0];
        var isResetMin = nextMin === undefined || nextMin === '';
        var isResetMax = nextMax === undefined || nextMax === '';
        var _toPrecision = toPrecision({
            min: !isResetMin ? parseFloat(nextMin) : undefined,
            max: !isResetMax ? parseFloat(nextMax) : undefined,
            precision: precision
          }),
          nextMinAsNumber = _toPrecision.min,
          nextMaxAsNumber = _toPrecision.max;
        var newNextMin;
        if (!isFiniteNumber(minBound) && currentRangeMin === nextMinAsNumber) {
          newNextMin = undefined;
        } else if (isFiniteNumber(minBound) && isResetMin) {
          newNextMin = minBound;
        } else {
          newNextMin = nextMinAsNumber;
        }
        var newNextMax;
        if (!isFiniteNumber(maxBound) && currentRangeMax === nextMaxAsNumber) {
          newNextMax = undefined;
        } else if (isFiniteNumber(maxBound) && isResetMax) {
          newNextMax = maxBound;
        } else {
          newNextMax = nextMaxAsNumber;
        }
        var isResetNewNextMin = newNextMin === undefined;
        var isGreaterThanCurrentRange = isFiniteNumber(currentRangeMin) && currentRangeMin <= newNextMin;
        var isMinValid = isResetNewNextMin || isFiniteNumber(newNextMin) && (!isFiniteNumber(currentRangeMin) || isGreaterThanCurrentRange);
        var isResetNewNextMax = newNextMax === undefined;
        var isLowerThanRange = isFiniteNumber(newNextMax) && currentRangeMax >= newNextMax;
        var isMaxValid = isResetNewNextMax || isFiniteNumber(newNextMax) && (!isFiniteNumber(currentRangeMax) || isLowerThanRange);
        var hasMinChange = min !== newNextMin;
        var hasMaxChange = max !== newNextMax;
        if ((hasMinChange || hasMaxChange) && isMinValid && isMaxValid) {
          resolvedState = resolvedState.removeNumericRefinement(attribute);
          if (isFiniteNumber(newNextMin)) {
            resolvedState = resolvedState.addNumericRefinement(attribute, '>=', newNextMin);
          }
          if (isFiniteNumber(newNextMax)) {
            resolvedState = resolvedState.addNumericRefinement(attribute, '<=', newNextMax);
          }
          return resolvedState.resetPage();
        }
        return null;
      };
      var createSendEvent = function createSendEvent(instantSearchInstance) {
        return function () {
          if (arguments.length === 1) {
            instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? undefined : arguments[0]);
            return;
          }
        };
      };
      function _getCurrentRange(stats) {
        var min;
        if (isFiniteNumber(minBound)) {
          min = minBound;
        } else if (isFiniteNumber(stats.min)) {
          min = stats.min;
        } else {
          min = 0;
        }
        var max;
        if (isFiniteNumber(maxBound)) {
          max = maxBound;
        } else if (isFiniteNumber(stats.max)) {
          max = stats.max;
        } else {
          max = 0;
        }
        return toPrecision({
          min: min,
          max: max,
          precision: precision
        });
      }
      function _getCurrentRefinement(helper) {
        var _ref7 = helper.getNumericRefinement(attribute, '>=') || [],
          _ref8 = _slicedToArray(_ref7, 1),
          minValue = _ref8[0];
        var _ref9 = helper.getNumericRefinement(attribute, '<=') || [],
          _ref10 = _slicedToArray(_ref9, 1),
          maxValue = _ref10[0];
        var min = isFiniteNumber(minValue) ? minValue : -Infinity;
        var max = isFiniteNumber(maxValue) ? maxValue : Infinity;
        return [min, max];
      }
      function _refine(helper, currentRange) {
        return function () {
          var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [undefined, undefined],
            _ref12 = _slicedToArray(_ref11, 2),
            nextMin = _ref12[0],
            nextMax = _ref12[1];
          var refinedState = getRefinedState(helper, currentRange, nextMin, nextMax);
          if (refinedState) {
            helper.setState(refinedState).search();
          }
        };
      }
      return {
        $$type: $$type$1,
        init: function init(initOptions) {
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: initOptions.instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            range: _objectSpread2(_objectSpread2({}, renderState.range), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref13) {
          var results = _ref13.results,
            helper = _ref13.helper,
            instantSearchInstance = _ref13.instantSearchInstance;
          var facetsFromResults = results && results.disjunctiveFacets || [];
          var facet = find(facetsFromResults, function (facetResult) {
            return facetResult.name === attribute;
          });
          var stats = facet && facet.stats || {
            min: undefined,
            max: undefined
          };
          var currentRange = _getCurrentRange(stats);
          var start = _getCurrentRefinement(helper);
          var refine;
          if (!results) {
            // On first render pass an empty range
            // to be able to bypass the validation
            // related to it
            refine = _refine(helper, {
              min: undefined,
              max: undefined
            });
          } else {
            refine = _refine(helper, currentRange);
          }
          return {
            refine: refine,
            canRefine: currentRange.min !== currentRange.max,
            format: rangeFormatter,
            range: currentRange,
            sendEvent: createSendEvent(instantSearchInstance),
            widgetParams: _objectSpread2(_objectSpread2({}, widgetParams), {}, {
              precision: precision
            }),
            start: start
          };
        },
        dispose: function dispose(_ref14) {
          var state = _ref14.state;
          unmountFn();
          return state.removeDisjunctiveFacet(attribute).removeNumericRefinement(attribute);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref15) {
          var searchParameters = _ref15.searchParameters;
          var _searchParameters$get = searchParameters.getNumericRefinements(attribute),
            _searchParameters$get2 = _searchParameters$get['>='],
            min = _searchParameters$get2 === void 0 ? [] : _searchParameters$get2,
            _searchParameters$get3 = _searchParameters$get['<='],
            max = _searchParameters$get3 === void 0 ? [] : _searchParameters$get3;
          if (min.length === 0 && max.length === 0) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            range: _objectSpread2(_objectSpread2({}, uiState.range), {}, _defineProperty({}, attribute, "".concat(min, ":").concat(max)))
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref16) {
          var uiState = _ref16.uiState;
          var widgetSearchParameters = searchParameters.addDisjunctiveFacet(attribute).setQueryParameters({
            numericRefinements: _objectSpread2(_objectSpread2({}, searchParameters.numericRefinements), {}, _defineProperty({}, attribute, {}))
          });
          if (isFiniteNumber(minBound)) {
            widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '>=', minBound);
          }
          if (isFiniteNumber(maxBound)) {
            widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '<=', maxBound);
          }
          var value = uiState.range && uiState.range[attribute];
          if (!value || value.indexOf(':') === -1) {
            return widgetSearchParameters;
          }
          var _value$split$map = value.split(':').map(parseFloat),
            _value$split$map2 = _slicedToArray(_value$split$map, 2),
            lowerBound = _value$split$map2[0],
            upperBound = _value$split$map2[1];
          if (isFiniteNumber(lowerBound) && (!isFiniteNumber(minBound) || minBound < lowerBound)) {
            widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, '>=');
            widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '>=', lowerBound);
          }
          if (isFiniteNumber(upperBound) && (!isFiniteNumber(maxBound) || upperBound < maxBound)) {
            widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, '<=');
            widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '<=', upperBound);
          }
          return widgetSearchParameters;
        }
      };
    };
  };

  var _excluded$4 = ["name", "escapedValue"],
    _excluded2 = ["escapedValue", "value"];
  var withUsage$c = createDocumentationMessageGenerator({
    name: 'refinement-list',
    connector: true
  });
  var DEFAULT_SORT$2 = ['isRefined', 'count:desc', 'name:asc'];
  /**
   * **RefinementList** connector provides the logic to build a custom widget that
   * will let the user filter the results based on the values of a specific facet.
   *
   * **Requirement:** the attribute passed as `attribute` must be present in
   * attributesForFaceting of the searched index.
   *
   * This connector provides:
   * - a `refine()` function to select an item.
   * - a `toggleShowMore()` function to display more or less items
   * - a `searchForItems()` function to search within the items.
   */
  var connectRefinementList = function connectRefinementList(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$c());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        attribute = _ref.attribute,
        _ref$operator = _ref.operator,
        operator = _ref$operator === void 0 ? 'or' : _ref$operator,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? 10 : _ref$limit,
        _ref$showMore = _ref.showMore,
        showMore = _ref$showMore === void 0 ? false : _ref$showMore,
        _ref$showMoreLimit = _ref.showMoreLimit,
        showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit,
        _ref$sortBy = _ref.sortBy,
        sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT$2 : _ref$sortBy,
        _ref$escapeFacetValue = _ref.escapeFacetValues,
        escapeFacetValues = _ref$escapeFacetValue === void 0 ? true : _ref$escapeFacetValue,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
          return items;
        } : _ref$transformItems;
      if (!attribute) {
        throw new Error(withUsage$c('The `attribute` option is required.'));
      }
      if (!/^(and|or)$/.test(operator)) {
        throw new Error(withUsage$c("The `operator` must one of: `\"and\"`, `\"or\"` (got \"".concat(operator, "\").")));
      }
      if (showMore === true && showMoreLimit <= limit) {
        throw new Error(withUsage$c('`showMoreLimit` should be greater than `limit`.'));
      }
      var formatItems = function formatItems(_ref2) {
        var label = _ref2.name,
          value = _ref2.escapedValue,
          item = _objectWithoutProperties(_ref2, _excluded$4);
        return _objectSpread2(_objectSpread2({}, item), {}, {
          value: value,
          label: label,
          highlighted: label
        });
      };
      var lastResultsFromMainSearch;
      var lastItemsFromMainSearch = [];
      var hasExhaustiveItems = true;
      var triggerRefine;
      var sendEvent;
      var isShowingMore = false;
      // Provide the same function to the `renderFn` so that way the user
      // has to only bind it once when `isFirstRendering` for instance
      var toggleShowMore = function toggleShowMore() {};
      function cachedToggleShowMore() {
        toggleShowMore();
      }
      function createToggleShowMore(renderOptions, widget) {
        return function () {
          isShowingMore = !isShowingMore;
          widget.render(renderOptions);
        };
      }
      function getLimit() {
        return isShowingMore ? showMoreLimit : limit;
      }
      var searchForFacetValues = function searchForFacetValues() {
        return function () {};
      };
      var createSearchForFacetValues = function createSearchForFacetValues(helper, widget) {
        return function (renderOptions) {
          return function (query) {
            var instantSearchInstance = renderOptions.instantSearchInstance,
              searchResults = renderOptions.results;
            if (query === '' && lastItemsFromMainSearch) {
              // render with previous data from the helper.
              renderFn(_objectSpread2(_objectSpread2({}, widget.getWidgetRenderState(_objectSpread2(_objectSpread2({}, renderOptions), {}, {
                results: lastResultsFromMainSearch
              }))), {}, {
                instantSearchInstance: instantSearchInstance
              }), false);
            } else {
              var tags = {
                highlightPreTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPreTag : TAG_REPLACEMENT.highlightPreTag,
                highlightPostTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPostTag : TAG_REPLACEMENT.highlightPostTag
              };
              helper.searchForFacetValues(attribute, query,
              // We cap the `maxFacetHits` value to 100 because the Algolia API
              // doesn't support a greater number.
              // See https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits/
              Math.min(getLimit(), 100), tags).then(function (results) {
                var facetValues = escapeFacetValues ? escapeFacets(results.facetHits) : results.facetHits;
                var normalizedFacetValues = transformItems(facetValues.map(function (_ref3) {
                  var escapedValue = _ref3.escapedValue,
                    value = _ref3.value,
                    item = _objectWithoutProperties(_ref3, _excluded2);
                  return _objectSpread2(_objectSpread2({}, item), {}, {
                    value: escapedValue,
                    label: value
                  });
                }), {
                  results: searchResults
                });
                renderFn(_objectSpread2(_objectSpread2({}, widget.getWidgetRenderState(_objectSpread2(_objectSpread2({}, renderOptions), {}, {
                  results: lastResultsFromMainSearch
                }))), {}, {
                  items: normalizedFacetValues,
                  canToggleShowMore: false,
                  canRefine: true,
                  isFromSearch: true,
                  instantSearchInstance: instantSearchInstance
                }), false);
              });
            }
          };
        };
      };
      return {
        $$type: 'ais.refinementList',
        init: function init(initOptions) {
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: initOptions.instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            refinementList: _objectSpread2(_objectSpread2({}, renderState.refinementList), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(renderOptions) {
          var results = renderOptions.results,
            state = renderOptions.state,
            _createURL = renderOptions.createURL,
            instantSearchInstance = renderOptions.instantSearchInstance,
            helper = renderOptions.helper;
          var items = [];
          var facetValues = [];
          if (!sendEvent || !triggerRefine || !searchForFacetValues) {
            sendEvent = createSendEventForFacet({
              instantSearchInstance: instantSearchInstance,
              helper: helper,
              attribute: attribute,
              widgetType: this.$$type
            });
            triggerRefine = function triggerRefine(facetValue) {
              sendEvent('click', facetValue);
              helper.toggleFacetRefinement(attribute, facetValue).search();
            };
            searchForFacetValues = createSearchForFacetValues(helper, this);
          }
          if (results) {
            var values = results.getFacetValues(attribute, {
              sortBy: sortBy,
              facetOrdering: sortBy === DEFAULT_SORT$2
            });
            facetValues = values && Array.isArray(values) ? values : [];
            items = transformItems(facetValues.slice(0, getLimit()).map(formatItems), {
              results: results
            });
            var maxValuesPerFacetConfig = state.maxValuesPerFacet;
            var currentLimit = getLimit();
            // If the limit is the max number of facet retrieved it is impossible to know
            // if the facets are exhaustive. The only moment we are sure it is exhaustive
            // is when it is strictly under the number requested unless we know that another
            // widget has requested more values (maxValuesPerFacet > getLimit()).
            // Because this is used for making the search of facets unable or not, it is important
            // to be conservative here.
            hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
            lastResultsFromMainSearch = results;
            lastItemsFromMainSearch = items;
            if (renderOptions.results) {
              toggleShowMore = createToggleShowMore(renderOptions, this);
            }
          }

          // Do not mistake searchForFacetValues and searchFacetValues which is the actual search
          // function
          var searchFacetValues = searchForFacetValues && searchForFacetValues(renderOptions);
          var canShowLess = isShowingMore && lastItemsFromMainSearch.length > limit;
          var canShowMore = showMore && !hasExhaustiveItems;
          var canToggleShowMore = canShowLess || canShowMore;
          return {
            createURL: function createURL(facetValue) {
              return _createURL(state.resetPage().toggleFacetRefinement(attribute, facetValue));
            },
            items: items,
            refine: triggerRefine,
            searchForItems: searchFacetValues,
            isFromSearch: false,
            canRefine: items.length > 0,
            widgetParams: widgetParams,
            isShowingMore: isShowingMore,
            canToggleShowMore: canToggleShowMore,
            toggleShowMore: cachedToggleShowMore,
            sendEvent: sendEvent,
            hasExhaustiveItems: hasExhaustiveItems
          };
        },
        dispose: function dispose(_ref4) {
          var state = _ref4.state;
          unmountFn();
          var withoutMaxValuesPerFacet = state.setQueryParameter('maxValuesPerFacet', undefined);
          if (operator === 'and') {
            return withoutMaxValuesPerFacet.removeFacet(attribute);
          }
          return withoutMaxValuesPerFacet.removeDisjunctiveFacet(attribute);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
          var searchParameters = _ref5.searchParameters;
          var values = operator === 'or' ? searchParameters.getDisjunctiveRefinements(attribute) : searchParameters.getConjunctiveRefinements(attribute);
          if (!values.length) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            refinementList: _objectSpread2(_objectSpread2({}, uiState.refinementList), {}, _defineProperty({}, attribute, values))
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
          var uiState = _ref6.uiState;
          var isDisjunctive = operator === 'or';
          if (searchParameters.isHierarchicalFacet(attribute)) {
             _warning(false, "RefinementList: Attribute \"".concat(attribute, "\" is already used by another widget applying hierarchical faceting.\nAs this is not supported, please make sure to remove this other widget or this RefinementList widget will not work at all.")) ;
            return searchParameters;
          }
          if (isDisjunctive && searchParameters.isConjunctiveFacet(attribute) || !isDisjunctive && searchParameters.isDisjunctiveFacet(attribute)) {
             _warning(false, "RefinementList: Attribute \"".concat(attribute, "\" is used by another refinement list with a different operator.\nAs this is not supported, please make sure to only use this attribute with one of the two operators.")) ;
            return searchParameters;
          }
          var values = uiState.refinementList && uiState.refinementList[attribute];
          var withoutRefinements = searchParameters.clearRefinements(attribute);
          var withFacetConfiguration = isDisjunctive ? withoutRefinements.addDisjunctiveFacet(attribute) : withoutRefinements.addFacet(attribute);
          var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
          var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
          var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);
          if (!values) {
            var key = isDisjunctive ? 'disjunctiveFacetsRefinements' : 'facetsRefinements';
            return withMaxValuesPerFacet.setQueryParameters(_defineProperty({}, key, _objectSpread2(_objectSpread2({}, withMaxValuesPerFacet[key]), {}, _defineProperty({}, attribute, []))));
          }
          return values.reduce(function (parameters, value) {
            return isDisjunctive ? parameters.addDisjunctiveFacetRefinement(attribute, value) : parameters.addFacetRefinement(attribute, value);
          }, withMaxValuesPerFacet);
        }
      };
    };
  };

  var withUsage$d = createDocumentationMessageGenerator({
    name: 'search-box',
    connector: true
  });
  var defaultQueryHook = function defaultQueryHook(query, hook) {
    return hook(query);
  };

  /**
   * **SearchBox** connector provides the logic to build a widget that will let the user search for a query.
   *
   * The connector provides to the rendering: `refine()` to set the query. The behaviour of this function
   * may be impacted by the `queryHook` widget parameter.
   */
  var connectSearchBox = function connectSearchBox(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$d());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        _ref$queryHook = _ref.queryHook,
        queryHook = _ref$queryHook === void 0 ? defaultQueryHook : _ref$queryHook;
      var _refine;
      var _clear;
      return {
        $$type: 'ais.searchBox',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref2) {
          var state = _ref2.state;
          unmountFn();
          return state.setQueryParameter('query', undefined);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            searchBox: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref3) {
          var helper = _ref3.helper,
            searchMetadata = _ref3.searchMetadata,
            state = _ref3.state;
          if (!_refine) {
            _refine = function _refine(query) {
              queryHook(query, function (q) {
                return helper.setQuery(q).search();
              });
            };
            _clear = function _clear() {
              helper.setQuery('').search();
            };
          }
          return {
            query: state.query || '',
            refine: _refine,
            clear: _clear,
            widgetParams: widgetParams,
            isSearchStalled: searchMetadata.isSearchStalled
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
          var searchParameters = _ref4.searchParameters;
          var query = searchParameters.query || '';
          if (query === '' || uiState && uiState.query === query) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            query: query
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
          var uiState = _ref5.uiState;
          return searchParameters.setQueryParameter('query', uiState.query || '');
        }
      };
    };
  };

  var withUsage$e = createDocumentationMessageGenerator({
    name: 'sort-by',
    connector: true
  });

  /**
   * The **SortBy** connector provides the logic to build a custom widget that will display a
   * list of indices. With Algolia, this is most commonly used for changing ranking strategy. This allows
   * a user to change how the hits are being sorted.
   */

  var connectSortBy = function connectSortBy(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$e());
    var connectorState = {};
    return function (widgetParams) {
      var _ref = widgetParams || {},
        items = _ref.items,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (x) {
          return x;
        } : _ref$transformItems;
      if (!Array.isArray(items)) {
        throw new Error(withUsage$e('The `items` option expects an array of objects.'));
      }
      return {
        $$type: 'ais.sortBy',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          var widgetRenderState = this.getWidgetRenderState(initOptions);
          var currentIndex = widgetRenderState.currentRefinement;
          var isCurrentIndexInItems = find(items, function (item) {
            return item.value === currentIndex;
          });
           _warning(isCurrentIndexInItems !== undefined, "The index named \"".concat(currentIndex, "\" is not listed in the `items` of `sortBy`.")) ;
          renderFn(_objectSpread2(_objectSpread2({}, widgetRenderState), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref2) {
          var state = _ref2.state;
          unmountFn();
          return connectorState.initialIndex ? state.setIndex(connectorState.initialIndex) : state;
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            sortBy: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref3) {
          var results = _ref3.results,
            helper = _ref3.helper,
            state = _ref3.state,
            parent = _ref3.parent;
          if (!connectorState.initialIndex && parent) {
            connectorState.initialIndex = parent.getIndexName();
          }
          if (!connectorState.setIndex) {
            connectorState.setIndex = function (indexName) {
              helper.setIndex(indexName).search();
            };
          }
          var hasNoResults = results ? results.nbHits === 0 : true;
          return {
            currentRefinement: state.index,
            options: transformItems(items, {
              results: results
            }),
            refine: connectorState.setIndex,
            hasNoResults: hasNoResults,
            canRefine: !hasNoResults && items.length > 0,
            widgetParams: widgetParams
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
          var searchParameters = _ref4.searchParameters;
          var currentIndex = searchParameters.index;
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            sortBy: currentIndex !== connectorState.initialIndex ? currentIndex : undefined
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
          var uiState = _ref5.uiState;
          return searchParameters.setQueryParameter('index', uiState.sortBy || connectorState.initialIndex || searchParameters.index);
        }
      };
    };
  };

  var withUsage$f = createDocumentationMessageGenerator({
    name: 'rating-menu',
    connector: true
  });
  var $$type$2 = 'ais.ratingMenu';
  var MAX_VALUES_PER_FACET_API_LIMIT = 1000;
  var STEP = 1;
  var createSendEvent$1 = function createSendEvent(_ref) {
    var instantSearchInstance = _ref.instantSearchInstance,
      helper = _ref.helper,
      getRefinedStar = _ref.getRefinedStar,
      attribute = _ref.attribute;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length === 1) {
        instantSearchInstance.sendEventToInsights(args[0]);
        return;
      }
      var eventType = args[0],
        facetValue = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;
      if (eventType !== 'click') {
        return;
      }
      var isRefined = getRefinedStar() === Number(facetValue);
      if (!isRefined) {
        instantSearchInstance.sendEventToInsights({
          insightsMethod: 'clickedFilters',
          widgetType: $$type$2,
          eventType: eventType,
          payload: {
            eventName: eventName,
            index: helper.getIndex(),
            filters: ["".concat(attribute, ">=").concat(facetValue)]
          },
          attribute: attribute
        });
      }
    };
  };
  /**
   * **StarRating** connector provides the logic to build a custom widget that will let
   * the user refine search results based on ratings.
   *
   * The connector provides to the rendering: `refine()` to select a value and
   * `items` that are the values that can be selected. `refine` should be used
   * with `items.value`.
   */
  var connectRatingMenu = function connectRatingMenu(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$f());
    return function (widgetParams) {
      var _ref2 = widgetParams || {},
        attribute = _ref2.attribute,
        _ref2$max = _ref2.max,
        max = _ref2$max === void 0 ? 5 : _ref2$max;
      var sendEvent;
      if (!attribute) {
        throw new Error(withUsage$f('The `attribute` option is required.'));
      }
      var _getRefinedStar = function getRefinedStar(state) {
        var _values$;
        var values = state.getNumericRefinements(attribute);
        if (!((_values$ = values['>=']) !== null && _values$ !== void 0 && _values$.length)) {
          return undefined;
        }
        return values['>='][0];
      };
      var getFacetsMaxDecimalPlaces = function getFacetsMaxDecimalPlaces(facetResults) {
        var maxDecimalPlaces = 0;
        facetResults.forEach(function (facetResult) {
          var _facetResult$name$spl = facetResult.name.split('.'),
            _facetResult$name$spl2 = _slicedToArray(_facetResult$name$spl, 2),
            _facetResult$name$spl3 = _facetResult$name$spl2[1],
            decimal = _facetResult$name$spl3 === void 0 ? '' : _facetResult$name$spl3;
          maxDecimalPlaces = Math.max(maxDecimalPlaces, decimal.length);
        });
        return maxDecimalPlaces;
      };
      var getFacetValuesWarningMessage = function getFacetValuesWarningMessage(_ref3) {
        var maxDecimalPlaces = _ref3.maxDecimalPlaces,
          maxFacets = _ref3.maxFacets,
          maxValuesPerFacet = _ref3.maxValuesPerFacet;
        var maxDecimalPlacesInRange = Math.max(0, Math.floor(Math.log10(MAX_VALUES_PER_FACET_API_LIMIT / max)));
        var maxFacetsInRange = Math.min(MAX_VALUES_PER_FACET_API_LIMIT, Math.pow(10, maxDecimalPlacesInRange) * max);
        var solutions = [];
        if (maxFacets > MAX_VALUES_PER_FACET_API_LIMIT) {
          solutions.push("- Update your records to lower the precision of the values in the \"".concat(attribute, "\" attribute (for example: ").concat(5.123456789.toPrecision(maxDecimalPlaces + 1), " to ").concat(5.123456789.toPrecision(maxDecimalPlacesInRange + 1), ")"));
        }
        if (maxValuesPerFacet < maxFacetsInRange) {
          solutions.push("- Increase the maximum number of facet values to ".concat(maxFacetsInRange, " using the \"configure\" widget ").concat(createDocumentationLink({
            name: 'configure'
          }), " and the \"maxValuesPerFacet\" parameter https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/"));
        }
        return "The ".concat(attribute, " attribute can have ").concat(maxFacets, " different values (0 to ").concat(max, " with a maximum of ").concat(maxDecimalPlaces, " decimals = ").concat(maxFacets, ") but you retrieved only ").concat(maxValuesPerFacet, " facet values. Therefore the number of results that match the refinements can be incorrect.\n    ").concat(solutions.length ? "To resolve this problem you can:\n".concat(solutions.join('\n')) : "");
      };
      function getRefinedState(state, facetValue) {
        var isRefined = _getRefinedStar(state) === Number(facetValue);
        var emptyState = state.resetPage().removeNumericRefinement(attribute);
        if (!isRefined) {
          return emptyState.addNumericRefinement(attribute, '<=', max).addNumericRefinement(attribute, '>=', Number(facetValue));
        }
        return emptyState;
      }
      var toggleRefinement = function toggleRefinement(helper, facetValue) {
        sendEvent('click', facetValue);
        helper.setState(getRefinedState(helper.state, facetValue)).search();
      };
      var connectorState = {
        toggleRefinementFactory: function toggleRefinementFactory(helper) {
          return toggleRefinement.bind(null, helper);
        },
        createURLFactory: function createURLFactory(_ref4) {
          var state = _ref4.state,
            createURL = _ref4.createURL;
          return function (value) {
            return createURL(getRefinedState(state, value));
          };
        }
      };
      return {
        $$type: $$type$2,
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            ratingMenu: _objectSpread2(_objectSpread2({}, renderState.ratingMenu), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref5) {
          var helper = _ref5.helper,
            results = _ref5.results,
            state = _ref5.state,
            instantSearchInstance = _ref5.instantSearchInstance,
            createURL = _ref5.createURL;
          var facetValues = [];
          if (!sendEvent) {
            sendEvent = createSendEvent$1({
              instantSearchInstance: instantSearchInstance,
              helper: helper,
              getRefinedStar: function getRefinedStar() {
                return _getRefinedStar(helper.state);
              },
              attribute: attribute
            });
          }
          var refinementIsApplied = false;
          var totalCount = 0;
          var facetResults = results === null || results === void 0 ? void 0 : results.getFacetValues(attribute, {});
          if (results && facetResults) {
            var maxValuesPerFacet = facetResults.length;
            var maxDecimalPlaces = getFacetsMaxDecimalPlaces(facetResults);
            var maxFacets = Math.pow(10, maxDecimalPlaces) * max;
             _warning(maxFacets <= maxValuesPerFacet || Boolean(results.__isArtificial), getFacetValuesWarningMessage({
              maxDecimalPlaces: maxDecimalPlaces,
              maxFacets: maxFacets,
              maxValuesPerFacet: maxValuesPerFacet
            })) ;
            var refinedStar = _getRefinedStar(state);
            var _loop = function _loop(star) {
              var isRefined = refinedStar === star;
              refinementIsApplied = refinementIsApplied || isRefined;
              var count = facetResults.filter(function (f) {
                return Number(f.name) >= star && Number(f.name) <= max;
              }).map(function (f) {
                return f.count;
              }).reduce(function (sum, current) {
                return sum + current;
              }, 0);
              totalCount += count;
              if (refinedStar && !isRefined && count === 0) {
                // skip count==0 when at least 1 refinement is enabled
                // eslint-disable-next-line no-continue
                return "continue";
              }
              var stars = _toConsumableArray(new Array(Math.floor(max / STEP))).map(function (_v, i) {
                return i * STEP < star;
              });
              facetValues.push({
                stars: stars,
                name: String(star),
                label: String(star),
                value: String(star),
                count: count,
                isRefined: isRefined
              });
            };
            for (var star = STEP; star < max; star += STEP) {
              var _ret = _loop(star);
              if (_ret === "continue") continue;
            }
          }
          facetValues = facetValues.reverse();
          var hasNoResults = results ? results.nbHits === 0 : true;
          return {
            items: facetValues,
            hasNoResults: hasNoResults,
            canRefine: (!hasNoResults || refinementIsApplied) && totalCount > 0,
            refine: connectorState.toggleRefinementFactory(helper),
            sendEvent: sendEvent,
            createURL: connectorState.createURLFactory({
              state: state,
              createURL: createURL
            }),
            widgetParams: widgetParams
          };
        },
        dispose: function dispose(_ref6) {
          var state = _ref6.state;
          unmountFn();
          return state.removeNumericRefinement(attribute);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref7) {
          var searchParameters = _ref7.searchParameters;
          var value = _getRefinedStar(searchParameters);
          if (typeof value !== 'number') {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            ratingMenu: _objectSpread2(_objectSpread2({}, uiState.ratingMenu), {}, _defineProperty({}, attribute, value))
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref8) {
          var uiState = _ref8.uiState;
          var value = uiState.ratingMenu && uiState.ratingMenu[attribute];
          var withoutRefinements = searchParameters.clearRefinements(attribute);
          var withDisjunctiveFacet = withoutRefinements.addDisjunctiveFacet(attribute);
          if (!value) {
            return withDisjunctiveFacet.setQueryParameters({
              numericRefinements: _objectSpread2(_objectSpread2({}, withDisjunctiveFacet.numericRefinements), {}, _defineProperty({}, attribute, {}))
            });
          }
          return withDisjunctiveFacet.addNumericRefinement(attribute, '<=', max).addNumericRefinement(attribute, '>=', value);
        }
      };
    };
  };

  var withUsage$g = createDocumentationMessageGenerator({
    name: 'stats',
    connector: true
  });

  /**
   * **Stats** connector provides the logic to build a custom widget that will displays
   * search statistics (hits number and processing time).
   */

  var connectStats = function connectStats(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$g());
    return function (widgetParams) {
      return {
        $$type: 'ais.stats',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose() {
          unmountFn();
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            stats: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref) {
          var results = _ref.results,
            state = _ref.state;
          if (!results) {
            return {
              hitsPerPage: state.hitsPerPage,
              nbHits: 0,
              nbSortedHits: undefined,
              areHitsSorted: false,
              nbPages: 0,
              page: state.page || 0,
              processingTimeMS: -1,
              query: state.query || '',
              widgetParams: widgetParams
            };
          }
          return {
            hitsPerPage: results.hitsPerPage,
            nbHits: results.nbHits,
            nbSortedHits: results.nbSortedHits,
            areHitsSorted: typeof results.appliedRelevancyStrictness !== 'undefined' && results.appliedRelevancyStrictness > 0 && results.nbSortedHits !== results.nbHits,
            nbPages: results.nbPages,
            page: results.page,
            processingTimeMS: results.processingTimeMS,
            query: results.query,
            widgetParams: widgetParams
          };
        }
      };
    };
  };

  var withUsage$h = createDocumentationMessageGenerator({
    name: 'toggle-refinement',
    connector: true
  });
  var $$type$3 = 'ais.toggleRefinement';
  var createSendEvent$2 = function createSendEvent(_ref) {
    var instantSearchInstance = _ref.instantSearchInstance,
      helper = _ref.helper,
      attribute = _ref.attribute,
      on = _ref.on;
    var sendEventForToggle = function sendEventForToggle() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length === 1) {
        instantSearchInstance.sendEventToInsights(args[0]);
        return;
      }
      var eventType = args[0],
        isRefined = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;
      if (eventType !== 'click' || on === undefined) {
        return;
      }

      // only send an event when the refinement gets applied,
      // not when it gets removed
      if (!isRefined) {
        instantSearchInstance.sendEventToInsights({
          insightsMethod: 'clickedFilters',
          widgetType: $$type$3,
          eventType: eventType,
          payload: {
            eventName: eventName,
            index: helper.getIndex(),
            filters: on.map(function (value) {
              return "".concat(attribute, ":").concat(value);
            })
          },
          attribute: attribute
        });
      }
    };
    return sendEventForToggle;
  };
  /**
   * **Toggle** connector provides the logic to build a custom widget that will provide
   * an on/off filtering feature based on an attribute value or values.
   *
   * Two modes are implemented in the custom widget:
   *  - with or without the value filtered
   *  - switch between two values.
   */
  var connectToggleRefinement = function connectToggleRefinement(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$h());
    return function (widgetParams) {
      var _ref2 = widgetParams || {},
        attribute = _ref2.attribute,
        _ref2$on = _ref2.on,
        userOn = _ref2$on === void 0 ? true : _ref2$on,
        userOff = _ref2.off;
      if (!attribute) {
        throw new Error(withUsage$h('The `attribute` option is required.'));
      }
      var hasAnOffValue = userOff !== undefined;
      // even though facet values can be numbers and boolean,
      // the helper methods only accept string in the type
      var on = toArray(userOn).map(escapeFacetValue);
      var off = hasAnOffValue ? toArray(userOff).map(escapeFacetValue) : undefined;
      var sendEvent;
      var toggleRefinementFactory = function toggleRefinementFactory(helper) {
        return function () {
          var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
              isRefined: false
            },
            isRefined = _ref3.isRefined;
          if (!isRefined) {
            sendEvent('click', isRefined);
            if (hasAnOffValue) {
              off.forEach(function (v) {
                return helper.removeDisjunctiveFacetRefinement(attribute, v);
              });
            }
            on.forEach(function (v) {
              return helper.addDisjunctiveFacetRefinement(attribute, v);
            });
          } else {
            on.forEach(function (v) {
              return helper.removeDisjunctiveFacetRefinement(attribute, v);
            });
            if (hasAnOffValue) {
              off.forEach(function (v) {
                return helper.addDisjunctiveFacetRefinement(attribute, v);
              });
            }
          }
          helper.search();
        };
      };
      var connectorState = {
        createURLFactory: function createURLFactory(isRefined, _ref4) {
          var state = _ref4.state,
            createURL = _ref4.createURL;
          return function () {
            state = state.resetPage();
            var valuesToRemove = isRefined ? on : off;
            if (valuesToRemove) {
              valuesToRemove.forEach(function (v) {
                state = state.removeDisjunctiveFacetRefinement(attribute, v);
              });
            }
            var valuesToAdd = isRefined ? off : on;
            if (valuesToAdd) {
              valuesToAdd.forEach(function (v) {
                state = state.addDisjunctiveFacetRefinement(attribute, v);
              });
            }
            return createURL(state);
          };
        }
      };
      return {
        $$type: $$type$3,
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref5) {
          var state = _ref5.state;
          unmountFn();
          return state.removeDisjunctiveFacet(attribute);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            toggleRefinement: _objectSpread2(_objectSpread2({}, renderState.toggleRefinement), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref6) {
          var state = _ref6.state,
            helper = _ref6.helper,
            results = _ref6.results,
            createURL = _ref6.createURL,
            instantSearchInstance = _ref6.instantSearchInstance;
          var isRefined = results ? on.every(function (v) {
            return state.isDisjunctiveFacetRefined(attribute, v);
          }) : on.every(function (v) {
            return state.isDisjunctiveFacetRefined(attribute, v);
          });
          var onFacetValue = {
            isRefined: isRefined,
            count: 0
          };
          var offFacetValue = {
            isRefined: hasAnOffValue && !isRefined,
            count: 0
          };
          if (results) {
            var offValue = toArray(off || false);
            var allFacetValues = results.getFacetValues(attribute, {}) || [];
            var onData = on.map(function (v) {
              return find(allFacetValues, function (_ref7) {
                var escapedValue = _ref7.escapedValue;
                return escapedValue === escapeFacetValue(String(v));
              });
            }).filter(function (v) {
              return v !== undefined;
            });
            var offData = hasAnOffValue ? offValue.map(function (v) {
              return find(allFacetValues, function (_ref8) {
                var escapedValue = _ref8.escapedValue;
                return escapedValue === escapeFacetValue(String(v));
              });
            }).filter(function (v) {
              return v !== undefined;
            }) : [];
            onFacetValue = {
              isRefined: onData.length ? onData.every(function (v) {
                return v.isRefined;
              }) : false,
              count: onData.reduce(function (acc, v) {
                return acc + v.count;
              }, 0) || null
            };
            offFacetValue = {
              isRefined: offData.length ? offData.every(function (v) {
                return v.isRefined;
              }) : false,
              count: offData.reduce(function (acc, v) {
                return acc + v.count;
              }, 0) || allFacetValues.reduce(function (total, _ref9) {
                var count = _ref9.count;
                return total + count;
              }, 0)
            };
          }
          if (!sendEvent) {
            sendEvent = createSendEvent$2({
              instantSearchInstance: instantSearchInstance,
              attribute: attribute,
              on: on,
              helper: helper
            });
          }
          var nextRefinement = isRefined ? offFacetValue : onFacetValue;
          return {
            value: {
              name: attribute,
              isRefined: isRefined,
              count: results ? nextRefinement.count : null,
              onFacetValue: onFacetValue,
              offFacetValue: offFacetValue
            },
            createURL: connectorState.createURLFactory(isRefined, {
              state: state,
              createURL: createURL
            }),
            sendEvent: sendEvent,
            canRefine: Boolean(results ? nextRefinement.count : null),
            refine: toggleRefinementFactory(helper),
            widgetParams: widgetParams
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref10) {
          var searchParameters = _ref10.searchParameters;
          var isRefined = on && on.every(function (v) {
            return searchParameters.isDisjunctiveFacetRefined(attribute, v);
          });
          if (!isRefined) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            toggle: _objectSpread2(_objectSpread2({}, uiState.toggle), {}, _defineProperty({}, attribute, isRefined))
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref11) {
          var uiState = _ref11.uiState;
          if (searchParameters.isHierarchicalFacet(attribute) || searchParameters.isConjunctiveFacet(attribute)) {
             _warning(false, "ToggleRefinement: Attribute \"".concat(attribute, "\" is already used by another widget of a different type.\nAs this is not supported, please make sure to remove this other widget or this ToggleRefinement widget will not work at all.")) ;
            return searchParameters;
          }
          var withFacetConfiguration = searchParameters.clearRefinements(attribute).addDisjunctiveFacet(attribute);
          var isRefined = Boolean(uiState.toggle && uiState.toggle[attribute]);
          if (isRefined) {
            if (on) {
              on.forEach(function (v) {
                withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v);
              });
            }
            return withFacetConfiguration;
          }

          // It's not refined with an `off` value
          if (hasAnOffValue) {
            if (off) {
              off.forEach(function (v) {
                withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v);
              });
            }
            return withFacetConfiguration;
          }

          // It's not refined without an `off` value
          return withFacetConfiguration.setQueryParameters({
            disjunctiveFacetsRefinements: _objectSpread2(_objectSpread2({}, searchParameters.disjunctiveFacetsRefinements), {}, _defineProperty({}, attribute, []))
          });
        }
      };
    };
  };

  var withUsage$i = createDocumentationMessageGenerator({
    name: 'breadcrumb',
    connector: true
  });
  var connectBreadcrumb = function connectBreadcrumb(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$i());
    var connectorState = {};
    return function (widgetParams) {
      var _ref = widgetParams || {},
        attributes = _ref.attributes,
        _ref$separator = _ref.separator,
        separator = _ref$separator === void 0 ? ' > ' : _ref$separator,
        _ref$rootPath = _ref.rootPath,
        rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
          return items;
        } : _ref$transformItems;
      if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
        throw new Error(withUsage$i('The `attributes` option expects an array of strings.'));
      }
      var _attributes = _slicedToArray(attributes, 1),
        hierarchicalFacetName = _attributes[0];
      function getRefinedState(state, facetValue) {
        if (!facetValue) {
          var breadcrumb = state.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
          if (breadcrumb.length === 0) {
            return state;
          } else {
            return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, breadcrumb[0]);
          }
        }
        return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue);
      }
      return {
        $$type: 'ais.breadcrumb',
        init: function init(initOptions) {
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: initOptions.instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        },
        dispose: function dispose() {
          unmountFn();
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            breadcrumb: _objectSpread2(_objectSpread2({}, renderState.breadcrumb), {}, _defineProperty({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref2) {
          var helper = _ref2.helper,
            createURL = _ref2.createURL,
            results = _ref2.results,
            state = _ref2.state;
          function getItems() {
            // The hierarchicalFacets condition is required for flavors
            // that render immediately with empty results, without relying
            // on init() (like React InstantSearch Hooks).
            if (!results || state.hierarchicalFacets.length === 0) {
              return [];
            }
            var _state$hierarchicalFa = _slicedToArray(state.hierarchicalFacets, 1),
              facetName = _state$hierarchicalFa[0].name;
            var facetValues = results.getFacetValues(facetName, {});
            var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
            var items = transformItems(shiftItemsValues(prepareItems(facetItems)), {
              results: results
            });
            return items;
          }
          var items = getItems();
          if (!connectorState.createURL) {
            connectorState.createURL = function (facetValue) {
              return createURL(getRefinedState(helper.state, facetValue));
            };
          }
          if (!connectorState.refine) {
            connectorState.refine = function (facetValue) {
              helper.setState(getRefinedState(helper.state, facetValue)).search();
            };
          }
          return {
            canRefine: items.length > 0,
            createURL: connectorState.createURL,
            items: items,
            refine: connectorState.refine,
            widgetParams: widgetParams
          };
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters) {
          if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
            var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
             _warning(isEqual(facet.attributes, attributes) && facet.separator === separator && facet.rootPath === rootPath, 'Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.') ;
            return searchParameters;
          }
          return searchParameters.addHierarchicalFacet({
            name: hierarchicalFacetName,
            attributes: attributes,
            separator: separator,
            rootPath: rootPath
          });
        }
      };
    };
  };
  function prepareItems(data) {
    return data.reduce(function (result, currentItem) {
      if (currentItem.isRefined) {
        result.push({
          label: currentItem.name,
          value: currentItem.escapedValue
        });
        if (Array.isArray(currentItem.data)) {
          result = result.concat(prepareItems(currentItem.data));
        }
      }
      return result;
    }, []);
  }
  function shiftItemsValues(array) {
    return array.map(function (x, idx) {
      return {
        label: x.label,
        value: idx + 1 === array.length ? null : array[idx + 1].value
      };
    });
  }

  var withUsage$j = createDocumentationMessageGenerator({
    name: 'geo-search',
    connector: true
  });

  // in this connector, we assume insideBoundingBox is only a string,
  // even though in the helper it's defined as number[][] alone.
  // This can be done, since the connector assumes "control" of the parameter
  function getBoundingBoxAsString(state) {
    return state.insideBoundingBox || '';
  }
  function setBoundingBoxAsString(state, value) {
    return state.setQueryParameter('insideBoundingBox', value);
  }
  var $$type$4 = 'ais.geoSearch';
  /**
   * The **GeoSearch** connector provides the logic to build a widget that will display the results on a map. It also provides a way to search for results based on their position. The connector provides functions to manage the search experience (search on map interaction or control the interaction for example).
   *
   * @requirements
   *
   * Note that the GeoSearch connector uses the [geosearch](https://www.algolia.com/doc/guides/searching/geo-search) capabilities of Algolia. Your hits **must** have a `_geoloc` attribute in order to be passed to the rendering function.
   *
   * Currently, the feature is not compatible with multiple values in the _geoloc attribute.
   */
  var connectGeoSearch = function connectGeoSearch(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$j());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        _ref$enableRefineOnMa = _ref.enableRefineOnMapMove,
        enableRefineOnMapMove = _ref$enableRefineOnMa === void 0 ? true : _ref$enableRefineOnMa,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
          return items;
        } : _ref$transformItems;
      var widgetState = {
        isRefineOnMapMove: enableRefineOnMapMove,
        // @MAJOR hasMapMoveSinceLastRefine -> hasMapMovedSinceLastRefine
        hasMapMoveSinceLastRefine: false,
        lastRefinePosition: '',
        lastRefineBoundingBox: '',
        internalToggleRefineOnMapMove: noop,
        internalSetMapMoveSinceLastRefine: noop
      };
      var getPositionFromState = function getPositionFromState(state) {
        return state.aroundLatLng ? aroundLatLngToPosition(state.aroundLatLng) : undefined;
      };
      var getCurrentRefinementFromState = function getCurrentRefinementFromState(state) {
        return state.insideBoundingBox && insideBoundingBoxToBoundingBox(state.insideBoundingBox);
      };
      var refine = function refine(helper) {
        return function (_ref2) {
          var ne = _ref2.northEast,
            sw = _ref2.southWest;
          var boundingBox = [ne.lat, ne.lng, sw.lat, sw.lng].join();
          helper.setState(setBoundingBoxAsString(helper.state, boundingBox).resetPage()).search();
          widgetState.hasMapMoveSinceLastRefine = false;
          widgetState.lastRefineBoundingBox = boundingBox;
        };
      };
      var clearMapRefinement = function clearMapRefinement(helper) {
        return function () {
          helper.setQueryParameter('insideBoundingBox', undefined).search();
        };
      };
      var isRefinedWithMap = function isRefinedWithMap(state) {
        return function () {
          return Boolean(state.insideBoundingBox);
        };
      };
      var toggleRefineOnMapMove = function toggleRefineOnMapMove() {
        return widgetState.internalToggleRefineOnMapMove();
      };
      var createInternalToggleRefinementOnMapMove = function createInternalToggleRefinementOnMapMove(renderOptions, render) {
        return function () {
          widgetState.isRefineOnMapMove = !widgetState.isRefineOnMapMove;
          render(renderOptions);
        };
      };
      var isRefineOnMapMove = function isRefineOnMapMove() {
        return widgetState.isRefineOnMapMove;
      };
      var setMapMoveSinceLastRefine = function setMapMoveSinceLastRefine() {
        return widgetState.internalSetMapMoveSinceLastRefine();
      };
      var createInternalSetMapMoveSinceLastRefine = function createInternalSetMapMoveSinceLastRefine(renderOptions, render) {
        return function () {
          var shouldTriggerRender = widgetState.hasMapMoveSinceLastRefine !== true;
          widgetState.hasMapMoveSinceLastRefine = true;
          if (shouldTriggerRender) {
            render(renderOptions);
          }
        };
      };
      var hasMapMoveSinceLastRefine = function hasMapMoveSinceLastRefine() {
        return widgetState.hasMapMoveSinceLastRefine;
      };
      var sendEvent;
      return {
        $$type: $$type$4,
        init: function init(initArgs) {
          var instantSearchInstance = initArgs.instantSearchInstance;
          var isFirstRendering = true;
          widgetState.internalToggleRefineOnMapMove = createInternalToggleRefinementOnMapMove(initArgs, noop);
          widgetState.internalSetMapMoveSinceLastRefine = createInternalSetMapMoveSinceLastRefine(initArgs, noop);
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initArgs)), {}, {
            instantSearchInstance: instantSearchInstance
          }), isFirstRendering);
        },
        render: function render(renderArgs) {
          var helper = renderArgs.helper,
            instantSearchInstance = renderArgs.instantSearchInstance;
          var isFirstRendering = false;
          // We don't use the state provided by the render function because we need
          // to be sure that the state is the latest one for the following condition
          var state = helper.state;
          var positionChangedSinceLastRefine = Boolean(state.aroundLatLng) && Boolean(widgetState.lastRefinePosition) && state.aroundLatLng !== widgetState.lastRefinePosition;
          var boundingBoxChangedSinceLastRefine = !state.insideBoundingBox && Boolean(widgetState.lastRefineBoundingBox) && state.insideBoundingBox !== widgetState.lastRefineBoundingBox;
          if (positionChangedSinceLastRefine || boundingBoxChangedSinceLastRefine) {
            widgetState.hasMapMoveSinceLastRefine = false;
          }
          widgetState.lastRefinePosition = state.aroundLatLng || '';
          widgetState.lastRefineBoundingBox = getBoundingBoxAsString(state);
          widgetState.internalToggleRefineOnMapMove = createInternalToggleRefinementOnMapMove(renderArgs, this.render.bind(this));
          widgetState.internalSetMapMoveSinceLastRefine = createInternalSetMapMoveSinceLastRefine(renderArgs, this.render.bind(this));
          var widgetRenderState = this.getWidgetRenderState(renderArgs);
          sendEvent('view', widgetRenderState.items);
          renderFn(_objectSpread2(_objectSpread2({}, widgetRenderState), {}, {
            instantSearchInstance: instantSearchInstance
          }), isFirstRendering);
        },
        getWidgetRenderState: function getWidgetRenderState(renderOptions) {
          var helper = renderOptions.helper,
            results = renderOptions.results,
            instantSearchInstance = renderOptions.instantSearchInstance;
          var state = helper.state;
          var items = results ? transformItems(results.hits.filter(function (hit) {
            return hit._geoloc;
          }), {
            results: results
          }) : [];
          if (!sendEvent) {
            sendEvent = createSendEventForHits({
              instantSearchInstance: instantSearchInstance,
              index: helper.getIndex(),
              widgetType: $$type$4
            });
          }
          return {
            items: items,
            position: getPositionFromState(state),
            currentRefinement: getCurrentRefinementFromState(state),
            refine: refine(helper),
            sendEvent: sendEvent,
            clearMapRefinement: clearMapRefinement(helper),
            isRefinedWithMap: isRefinedWithMap(state),
            toggleRefineOnMapMove: toggleRefineOnMapMove,
            isRefineOnMapMove: isRefineOnMapMove,
            setMapMoveSinceLastRefine: setMapMoveSinceLastRefine,
            hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine,
            widgetParams: widgetParams
          };
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            geoSearch: this.getWidgetRenderState(renderOptions)
          });
        },
        dispose: function dispose(_ref3) {
          var state = _ref3.state;
          unmountFn();
          return state.setQueryParameter('insideBoundingBox', undefined);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
          var searchParameters = _ref4.searchParameters;
          var boundingBox = getBoundingBoxAsString(searchParameters);
          if (!boundingBox || uiState && uiState.geoSearch && uiState.geoSearch.boundingBox === boundingBox) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            geoSearch: {
              boundingBox: boundingBox
            }
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
          var uiState = _ref5.uiState;
          if (!uiState || !uiState.geoSearch) {
            return searchParameters.setQueryParameter('insideBoundingBox', undefined);
          }
          return setBoundingBoxAsString(searchParameters, uiState.geoSearch.boundingBox);
        }
      };
    };
  };

  var withUsage$k = createDocumentationMessageGenerator({
    name: 'powered-by',
    connector: true
  });
  /**
   * **PoweredBy** connector provides the logic to build a custom widget that will displays
   * the logo to redirect to Algolia.
   */
  var connectPoweredBy = function connectPoweredBy(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$k());
    var defaultUrl = 'https://www.algolia.com/?' + 'utm_source=instantsearch.js&' + 'utm_medium=website&' + "utm_content=".concat(safelyRunOnBrowser(function (_ref) {
      var _window$location;
      var window = _ref.window;
      return ((_window$location = window.location) === null || _window$location === void 0 ? void 0 : _window$location.hostname) || '';
    }, {
      fallback: function fallback() {
        return '';
      }
    }), "&") + 'utm_campaign=poweredby';
    return function (widgetParams) {
      var _ref2 = widgetParams || {},
        _ref2$url = _ref2.url,
        url = _ref2$url === void 0 ? defaultUrl : _ref2$url;
      return {
        $$type: 'ais.poweredBy',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            poweredBy: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState() {
          return {
            url: url,
            widgetParams: widgetParams
          };
        },
        dispose: function dispose() {
          unmountFn();
        }
      };
    };
  };

  function clone(value) {
    if (typeof value === 'object' && value !== null) {
      return _merge(Array.isArray(value) ? [] : {}, value);
    }
    return value;
  }

  function isObjectOrArrayOrFunction(value) {
    return (
      typeof value === 'function' ||
      Array.isArray(value) ||
      Object.prototype.toString.call(value) === '[object Object]'
    );
  }

  function _merge(target, source) {
    if (target === source) {
      return target;
    }

    for (var key in source) {
      if (
        !Object.prototype.hasOwnProperty.call(source, key) ||
        key === '__proto__' ||
        key === 'constructor'
      ) {
        continue;
      }

      var sourceVal = source[key];
      var targetVal = target[key];

      if (typeof targetVal !== 'undefined' && typeof sourceVal === 'undefined') {
        continue;
      }

      if (
        isObjectOrArrayOrFunction(targetVal) &&
        isObjectOrArrayOrFunction(sourceVal)
      ) {
        target[key] = _merge(targetVal, sourceVal);
      } else {
        target[key] = clone(sourceVal);
      }
    }
    return target;
  }

  /**
   * This method is like Object.assign, but recursively merges own and inherited
   * enumerable keyed properties of source objects into the destination object.
   *
   * NOTE: this behaves like lodash/merge, but:
   * - does mutate functions if they are a source
   * - treats non-plain objects as plain
   * - does not work for circular objects
   * - treats sparse arrays as sparse
   * - does not convert Array-like objects (Arguments, NodeLists, etc.) to arrays
   *
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   */

  function merge(target) {
    if (!isObjectOrArrayOrFunction(target)) {
      target = {};
    }

    for (var i = 1, l = arguments.length; i < l; i++) {
      var source = arguments[i];

      if (isObjectOrArrayOrFunction(source)) {
        _merge(target, source);
      }
    }
    return target;
  }

  var merge_1 = merge;

  // NOTE: this behaves like lodash/defaults, but doesn't mutate the target
  // it also preserve keys order
  var defaultsPure = function defaultsPure() {
    var sources = Array.prototype.slice.call(arguments);

    return sources.reduceRight(function(acc, source) {
      Object.keys(Object(source)).forEach(function(key) {
        if (source[key] === undefined) {
          return;
        }
        if (acc[key] !== undefined) {
          // remove if already added, so that we can add it in correct order
          delete acc[key];
        }
        acc[key] = source[key];
      });
      return acc;
    }, {});
  };

  function intersection(arr1, arr2) {
    return arr1.filter(function(value, index) {
      return (
        arr2.indexOf(value) > -1 &&
        arr1.indexOf(value) === index /* skips duplicates */
      );
    });
  }

  var intersection_1 = intersection;

  // @MAJOR can be replaced by native Array#find when we change support
  var find$1 = function find(array, comparator) {
    if (!Array.isArray(array)) {
      return undefined;
    }

    for (var i = 0; i < array.length; i++) {
      if (comparator(array[i])) {
        return array[i];
      }
    }
  };

  function valToNumber(v) {
    if (typeof v === 'number') {
      return v;
    } else if (typeof v === 'string') {
      return parseFloat(v);
    } else if (Array.isArray(v)) {
      return v.map(valToNumber);
    }

    throw new Error('The value should be a number, a parsable string or an array of those.');
  }

  var valToNumber_1 = valToNumber;

  // https://github.com/babel/babel/blob/3aaafae053fa75febb3aa45d45b6f00646e30ba4/packages/babel-helpers/src/helpers.js#L604-L620
  function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source === null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key;
    var i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }

  var omit$1 = _objectWithoutPropertiesLoose$1;

  function objectHasKeys(obj) {
    return obj && Object.keys(obj).length > 0;
  }

  var objectHasKeys_1 = objectHasKeys;

  var isValidUserToken = function isValidUserToken(userToken) {
    if (userToken === null) {
      return false;
    }
    return /^[a-zA-Z0-9_-]{1,64}$/.test(userToken);
  };

  /**
   * Functions to manipulate refinement lists
   *
   * The RefinementList is not formally defined through a prototype but is based
   * on a specific structure.
   *
   * @module SearchParameters.refinementList
   *
   * @typedef {string[]} SearchParameters.refinementList.Refinements
   * @typedef {Object.<string, SearchParameters.refinementList.Refinements>} SearchParameters.refinementList.RefinementList
   */





  var lib = {
    /**
     * Adds a refinement to a RefinementList
     * @param {RefinementList} refinementList the initial list
     * @param {string} attribute the attribute to refine
     * @param {string} value the value of the refinement, if the value is not a string it will be converted
     * @return {RefinementList} a new and updated refinement list
     */
    addRefinement: function addRefinement(refinementList, attribute, value) {
      if (lib.isRefined(refinementList, attribute, value)) {
        return refinementList;
      }

      var valueAsString = '' + value;

      var facetRefinement = !refinementList[attribute] ?
        [valueAsString] :
        refinementList[attribute].concat(valueAsString);

      var mod = {};

      mod[attribute] = facetRefinement;

      return defaultsPure({}, mod, refinementList);
    },
    /**
     * Removes refinement(s) for an attribute:
     *  - if the value is specified removes the refinement for the value on the attribute
     *  - if no value is specified removes all the refinements for this attribute
     * @param {RefinementList} refinementList the initial list
     * @param {string} attribute the attribute to refine
     * @param {string} [value] the value of the refinement
     * @return {RefinementList} a new and updated refinement lst
     */
    removeRefinement: function removeRefinement(refinementList, attribute, value) {
      if (value === undefined) {
        // we use the "filter" form of clearRefinement, since it leaves empty values as-is
        // the form with a string will remove the attribute completely
        return lib.clearRefinement(refinementList, function(v, f) {
          return attribute === f;
        });
      }

      var valueAsString = '' + value;

      return lib.clearRefinement(refinementList, function(v, f) {
        return attribute === f && valueAsString === v;
      });
    },
    /**
     * Toggles the refinement value for an attribute.
     * @param {RefinementList} refinementList the initial list
     * @param {string} attribute the attribute to refine
     * @param {string} value the value of the refinement
     * @return {RefinementList} a new and updated list
     */
    toggleRefinement: function toggleRefinement(refinementList, attribute, value) {
      if (value === undefined) throw new Error('toggleRefinement should be used with a value');

      if (lib.isRefined(refinementList, attribute, value)) {
        return lib.removeRefinement(refinementList, attribute, value);
      }

      return lib.addRefinement(refinementList, attribute, value);
    },
    /**
     * Clear all or parts of a RefinementList. Depending on the arguments, three
     * kinds of behavior can happen:
     *  - if no attribute is provided: clears the whole list
     *  - if an attribute is provided as a string: clears the list for the specific attribute
     *  - if an attribute is provided as a function: discards the elements for which the function returns true
     * @param {RefinementList} refinementList the initial list
     * @param {string} [attribute] the attribute or function to discard
     * @param {string} [refinementType] optional parameter to give more context to the attribute function
     * @return {RefinementList} a new and updated refinement list
     */
    clearRefinement: function clearRefinement(refinementList, attribute, refinementType) {
      if (attribute === undefined) {
        if (!objectHasKeys_1(refinementList)) {
          return refinementList;
        }
        return {};
      } else if (typeof attribute === 'string') {
        return omit$1(refinementList, [attribute]);
      } else if (typeof attribute === 'function') {
        var hasChanged = false;

        var newRefinementList = Object.keys(refinementList).reduce(function(memo, key) {
          var values = refinementList[key] || [];
          var facetList = values.filter(function(value) {
            return !attribute(value, key, refinementType);
          });

          if (facetList.length !== values.length) {
            hasChanged = true;
          }
          memo[key] = facetList;

          return memo;
        }, {});

        if (hasChanged) return newRefinementList;
        return refinementList;
      }
    },
    /**
     * Test if the refinement value is used for the attribute. If no refinement value
     * is provided, test if the refinementList contains any refinement for the
     * given attribute.
     * @param {RefinementList} refinementList the list of refinement
     * @param {string} attribute name of the attribute
     * @param {string} [refinementValue] value of the filter/refinement
     * @return {boolean}
     */
    isRefined: function isRefined(refinementList, attribute, refinementValue) {
      var containsRefinements = !!refinementList[attribute] &&
        refinementList[attribute].length > 0;

      if (refinementValue === undefined || !containsRefinements) {
        return containsRefinements;
      }

      var refinementValueAsString = '' + refinementValue;

      return refinementList[attribute].indexOf(refinementValueAsString) !== -1;
    }
  };

  var RefinementList = lib;

  /**
   * isEqual, but only for numeric refinement values, possible values:
   * - 5
   * - [5]
   * - [[5]]
   * - [[5,5],[4]]
   */
  function isEqualNumericRefinement(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return (
        a.length === b.length &&
        a.every(function(el, i) {
          return isEqualNumericRefinement(b[i], el);
        })
      );
    }
    return a === b;
  }

  /**
   * like _.find but using deep equality to be able to use it
   * to find arrays.
   * @private
   * @param {any[]} array array to search into (elements are base or array of base)
   * @param {any} searchedValue the value we're looking for (base or array of base)
   * @return {any} the searched value or undefined
   */
  function findArray(array, searchedValue) {
    return find$1(array, function(currentValue) {
      return isEqualNumericRefinement(currentValue, searchedValue);
    });
  }

  /**
   * The facet list is the structure used to store the list of values used to
   * filter a single attribute.
   * @typedef {string[]} SearchParameters.FacetList
   */

  /**
   * Structure to store numeric filters with the operator as the key. The supported operators
   * are `=`, `>`, `<`, `>=`, `<=` and `!=`.
   * @typedef {Object.<string, Array.<number|number[]>>} SearchParameters.OperatorList
   */

  /**
   * SearchParameters is the data structure that contains all the information
   * usable for making a search to Algolia API. It doesn't do the search itself,
   * nor does it contains logic about the parameters.
   * It is an immutable object, therefore it has been created in a way that each
   * changes does not change the object itself but returns a copy with the
   * modification.
   * This object should probably not be instantiated outside of the helper. It will
   * be provided when needed. This object is documented for reference as you'll
   * get it from events generated by the {@link AlgoliaSearchHelper}.
   * If need be, instantiate the Helper from the factory function {@link SearchParameters.make}
   * @constructor
   * @classdesc contains all the parameters of a search
   * @param {object|SearchParameters} newParameters existing parameters or partial object
   * for the properties of a new SearchParameters
   * @see SearchParameters.make
   * @example <caption>SearchParameters of the first query in
   *   <a href="http://demos.algolia.com/instant-search-demo/">the instant search demo</a></caption>
  {
     "query": "",
     "disjunctiveFacets": [
        "customerReviewCount",
        "category",
        "salePrice_range",
        "manufacturer"
    ],
     "maxValuesPerFacet": 30,
     "page": 0,
     "hitsPerPage": 10,
     "facets": [
        "type",
        "shipping"
    ]
  }
   */
  function SearchParameters(newParameters) {
    var params = newParameters ? SearchParameters._parseNumbers(newParameters) : {};

    if (params.userToken !== undefined && !isValidUserToken(params.userToken)) {
      console.warn('[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}');
    }
    /**
     * This attribute contains the list of all the conjunctive facets
     * used. This list will be added to requested facets in the
     * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
     * @member {string[]}
     */
    this.facets = params.facets || [];
    /**
     * This attribute contains the list of all the disjunctive facets
     * used. This list will be added to requested facets in the
     * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
     * @member {string[]}
     */
    this.disjunctiveFacets = params.disjunctiveFacets || [];
    /**
     * This attribute contains the list of all the hierarchical facets
     * used. This list will be added to requested facets in the
     * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
     * Hierarchical facets are a sub type of disjunctive facets that
     * let you filter faceted attributes hierarchically.
     * @member {string[]|object[]}
     */
    this.hierarchicalFacets = params.hierarchicalFacets || [];

    // Refinements
    /**
     * This attribute contains all the filters that need to be
     * applied on the conjunctive facets. Each facet must be properly
     * defined in the `facets` attribute.
     *
     * The key is the name of the facet, and the `FacetList` contains all
     * filters selected for the associated facet name.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `facetFilters` attribute.
     * @member {Object.<string, SearchParameters.FacetList>}
     */
    this.facetsRefinements = params.facetsRefinements || {};
    /**
     * This attribute contains all the filters that need to be
     * excluded from the conjunctive facets. Each facet must be properly
     * defined in the `facets` attribute.
     *
     * The key is the name of the facet, and the `FacetList` contains all
     * filters excluded for the associated facet name.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `facetFilters` attribute.
     * @member {Object.<string, SearchParameters.FacetList>}
     */
    this.facetsExcludes = params.facetsExcludes || {};
    /**
     * This attribute contains all the filters that need to be
     * applied on the disjunctive facets. Each facet must be properly
     * defined in the `disjunctiveFacets` attribute.
     *
     * The key is the name of the facet, and the `FacetList` contains all
     * filters selected for the associated facet name.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `facetFilters` attribute.
     * @member {Object.<string, SearchParameters.FacetList>}
     */
    this.disjunctiveFacetsRefinements = params.disjunctiveFacetsRefinements || {};
    /**
     * This attribute contains all the filters that need to be
     * applied on the numeric attributes.
     *
     * The key is the name of the attribute, and the value is the
     * filters to apply to this attribute.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `numericFilters` attribute.
     * @member {Object.<string, SearchParameters.OperatorList>}
     */
    this.numericRefinements = params.numericRefinements || {};
    /**
     * This attribute contains all the tags used to refine the query.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `tagFilters` attribute.
     * @member {string[]}
     */
    this.tagRefinements = params.tagRefinements || [];
    /**
     * This attribute contains all the filters that need to be
     * applied on the hierarchical facets. Each facet must be properly
     * defined in the `hierarchicalFacets` attribute.
     *
     * The key is the name of the facet, and the `FacetList` contains all
     * filters selected for the associated facet name. The FacetList values
     * are structured as a string that contain the values for each level
     * separated by the configured separator.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `facetFilters` attribute.
     * @member {Object.<string, SearchParameters.FacetList>}
     */
    this.hierarchicalFacetsRefinements = params.hierarchicalFacetsRefinements || {};

    var self = this;
    Object.keys(params).forEach(function(paramName) {
      var isKeyKnown = SearchParameters.PARAMETERS.indexOf(paramName) !== -1;
      var isValueDefined = params[paramName] !== undefined;

      if (!isKeyKnown && isValueDefined) {
        self[paramName] = params[paramName];
      }
    });
  }

  /**
   * List all the properties in SearchParameters and therefore all the known Algolia properties
   * This doesn't contain any beta/hidden features.
   * @private
   */
  SearchParameters.PARAMETERS = Object.keys(new SearchParameters());

  /**
   * @private
   * @param {object} partialState full or part of a state
   * @return {object} a new object with the number keys as number
   */
  SearchParameters._parseNumbers = function(partialState) {
    // Do not reparse numbers in SearchParameters, they ought to be parsed already
    if (partialState instanceof SearchParameters) return partialState;

    var numbers = {};

    var numberKeys = [
      'aroundPrecision',
      'aroundRadius',
      'getRankingInfo',
      'minWordSizefor2Typos',
      'minWordSizefor1Typo',
      'page',
      'maxValuesPerFacet',
      'distinct',
      'minimumAroundRadius',
      'hitsPerPage',
      'minProximity'
    ];

    numberKeys.forEach(function(k) {
      var value = partialState[k];
      if (typeof value === 'string') {
        var parsedValue = parseFloat(value);
        // global isNaN is ok to use here, value is only number or NaN
        numbers[k] = isNaN(parsedValue) ? value : parsedValue;
      }
    });

    // there's two formats of insideBoundingBox, we need to parse
    // the one which is an array of float geo rectangles
    if (Array.isArray(partialState.insideBoundingBox)) {
      numbers.insideBoundingBox = partialState.insideBoundingBox.map(function(geoRect) {
        if (Array.isArray(geoRect)) {
          return geoRect.map(function(value) {
            return parseFloat(value);
          });
        }
        return geoRect;
      });
    }

    if (partialState.numericRefinements) {
      var numericRefinements = {};
      Object.keys(partialState.numericRefinements).forEach(function(attribute) {
        var operators = partialState.numericRefinements[attribute] || {};
        numericRefinements[attribute] = {};
        Object.keys(operators).forEach(function(operator) {
          var values = operators[operator];
          var parsedValues = values.map(function(v) {
            if (Array.isArray(v)) {
              return v.map(function(vPrime) {
                if (typeof vPrime === 'string') {
                  return parseFloat(vPrime);
                }
                return vPrime;
              });
            } else if (typeof v === 'string') {
              return parseFloat(v);
            }
            return v;
          });
          numericRefinements[attribute][operator] = parsedValues;
        });
      });
      numbers.numericRefinements = numericRefinements;
    }

    return merge_1({}, partialState, numbers);
  };

  /**
   * Factory for SearchParameters
   * @param {object|SearchParameters} newParameters existing parameters or partial
   * object for the properties of a new SearchParameters
   * @return {SearchParameters} frozen instance of SearchParameters
   */
  SearchParameters.make = function makeSearchParameters(newParameters) {
    var instance = new SearchParameters(newParameters);

    var hierarchicalFacets = newParameters.hierarchicalFacets || [];
    hierarchicalFacets.forEach(function(facet) {
      if (facet.rootPath) {
        var currentRefinement = instance.getHierarchicalRefinement(facet.name);

        if (currentRefinement.length > 0 && currentRefinement[0].indexOf(facet.rootPath) !== 0) {
          instance = instance.clearRefinements(facet.name);
        }

        // get it again in case it has been cleared
        currentRefinement = instance.getHierarchicalRefinement(facet.name);
        if (currentRefinement.length === 0) {
          instance = instance.toggleHierarchicalFacetRefinement(facet.name, facet.rootPath);
        }
      }
    });

    return instance;
  };

  /**
   * Validates the new parameters based on the previous state
   * @param {SearchParameters} currentState the current state
   * @param {object|SearchParameters} parameters the new parameters to set
   * @return {Error|null} Error if the modification is invalid, null otherwise
   */
  SearchParameters.validate = function(currentState, parameters) {
    var params = parameters || {};

    if (currentState.tagFilters && params.tagRefinements && params.tagRefinements.length > 0) {
      return new Error(
        '[Tags] Cannot switch from the managed tag API to the advanced API. It is probably ' +
        'an error, if it is really what you want, you should first clear the tags with clearTags method.');
    }

    if (currentState.tagRefinements.length > 0 && params.tagFilters) {
      return new Error(
        '[Tags] Cannot switch from the advanced tag API to the managed API. It is probably ' +
        'an error, if it is not, you should first clear the tags with clearTags method.');
    }

    if (
      currentState.numericFilters &&
      params.numericRefinements &&
      objectHasKeys_1(params.numericRefinements)
    ) {
      return new Error(
        "[Numeric filters] Can't switch from the advanced to the managed API. It" +
          ' is probably an error, if this is really what you want, you have to first' +
          ' clear the numeric filters.'
      );
    }

    if (objectHasKeys_1(currentState.numericRefinements) && params.numericFilters) {
      return new Error(
        "[Numeric filters] Can't switch from the managed API to the advanced. It" +
        ' is probably an error, if this is really what you want, you have to first' +
        ' clear the numeric filters.');
    }

    return null;
  };

  SearchParameters.prototype = {
    constructor: SearchParameters,

    /**
     * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
     * @method
     * @param {undefined|string|SearchParameters.clearCallback} [attribute] optional string or function
     * - If not given, means to clear all the filters.
     * - If `string`, means to clear all refinements for the `attribute` named filter.
     * - If `function`, means to clear all the refinements that return truthy values.
     * @return {SearchParameters}
     */
    clearRefinements: function clearRefinements(attribute) {
      var patch = {
        numericRefinements: this._clearNumericRefinements(attribute),
        facetsRefinements: RefinementList.clearRefinement(
          this.facetsRefinements,
          attribute,
          'conjunctiveFacet'
        ),
        facetsExcludes: RefinementList.clearRefinement(
          this.facetsExcludes,
          attribute,
          'exclude'
        ),
        disjunctiveFacetsRefinements: RefinementList.clearRefinement(
          this.disjunctiveFacetsRefinements,
          attribute,
          'disjunctiveFacet'
        ),
        hierarchicalFacetsRefinements: RefinementList.clearRefinement(
          this.hierarchicalFacetsRefinements,
          attribute,
          'hierarchicalFacet'
        )
      };
      if (
        patch.numericRefinements === this.numericRefinements &&
        patch.facetsRefinements === this.facetsRefinements &&
        patch.facetsExcludes === this.facetsExcludes &&
        patch.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements &&
        patch.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements
      ) {
        return this;
      }
      return this.setQueryParameters(patch);
    },
    /**
     * Remove all the refined tags from the SearchParameters
     * @method
     * @return {SearchParameters}
     */
    clearTags: function clearTags() {
      if (this.tagFilters === undefined && this.tagRefinements.length === 0) return this;

      return this.setQueryParameters({
        tagFilters: undefined,
        tagRefinements: []
      });
    },
    /**
     * Set the index.
     * @method
     * @param {string} index the index name
     * @return {SearchParameters}
     */
    setIndex: function setIndex(index) {
      if (index === this.index) return this;

      return this.setQueryParameters({
        index: index
      });
    },
    /**
     * Query setter
     * @method
     * @param {string} newQuery value for the new query
     * @return {SearchParameters}
     */
    setQuery: function setQuery(newQuery) {
      if (newQuery === this.query) return this;

      return this.setQueryParameters({
        query: newQuery
      });
    },
    /**
     * Page setter
     * @method
     * @param {number} newPage new page number
     * @return {SearchParameters}
     */
    setPage: function setPage(newPage) {
      if (newPage === this.page) return this;

      return this.setQueryParameters({
        page: newPage
      });
    },
    /**
     * Facets setter
     * The facets are the simple facets, used for conjunctive (and) faceting.
     * @method
     * @param {string[]} facets all the attributes of the algolia records used for conjunctive faceting
     * @return {SearchParameters}
     */
    setFacets: function setFacets(facets) {
      return this.setQueryParameters({
        facets: facets
      });
    },
    /**
     * Disjunctive facets setter
     * Change the list of disjunctive (or) facets the helper chan handle.
     * @method
     * @param {string[]} facets all the attributes of the algolia records used for disjunctive faceting
     * @return {SearchParameters}
     */
    setDisjunctiveFacets: function setDisjunctiveFacets(facets) {
      return this.setQueryParameters({
        disjunctiveFacets: facets
      });
    },
    /**
     * HitsPerPage setter
     * Hits per page represents the number of hits retrieved for this query
     * @method
     * @param {number} n number of hits retrieved per page of results
     * @return {SearchParameters}
     */
    setHitsPerPage: function setHitsPerPage(n) {
      if (this.hitsPerPage === n) return this;

      return this.setQueryParameters({
        hitsPerPage: n
      });
    },
    /**
     * typoTolerance setter
     * Set the value of typoTolerance
     * @method
     * @param {string} typoTolerance new value of typoTolerance ("true", "false", "min" or "strict")
     * @return {SearchParameters}
     */
    setTypoTolerance: function setTypoTolerance(typoTolerance) {
      if (this.typoTolerance === typoTolerance) return this;

      return this.setQueryParameters({
        typoTolerance: typoTolerance
      });
    },
    /**
     * Add a numeric filter for a given attribute
     * When value is an array, they are combined with OR
     * When value is a single value, it will combined with AND
     * @method
     * @param {string} attribute attribute to set the filter on
     * @param {string} operator operator of the filter (possible values: =, >, >=, <, <=, !=)
     * @param {number | number[]} value value of the filter
     * @return {SearchParameters}
     * @example
     * // for price = 50 or 40
     * searchparameter.addNumericRefinement('price', '=', [50, 40]);
     * @example
     * // for size = 38 and 40
     * searchparameter.addNumericRefinement('size', '=', 38);
     * searchparameter.addNumericRefinement('size', '=', 40);
     */
    addNumericRefinement: function(attribute, operator, v) {
      var value = valToNumber_1(v);

      if (this.isNumericRefined(attribute, operator, value)) return this;

      var mod = merge_1({}, this.numericRefinements);

      mod[attribute] = merge_1({}, mod[attribute]);

      if (mod[attribute][operator]) {
        // Array copy
        mod[attribute][operator] = mod[attribute][operator].slice();
        // Add the element. Concat can't be used here because value can be an array.
        mod[attribute][operator].push(value);
      } else {
        mod[attribute][operator] = [value];
      }

      return this.setQueryParameters({
        numericRefinements: mod
      });
    },
    /**
     * Get the list of conjunctive refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {string[]} list of refinements
     */
    getConjunctiveRefinements: function(facetName) {
      if (!this.isConjunctiveFacet(facetName)) {
        return [];
      }
      return this.facetsRefinements[facetName] || [];
    },
    /**
     * Get the list of disjunctive refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {string[]} list of refinements
     */
    getDisjunctiveRefinements: function(facetName) {
      if (!this.isDisjunctiveFacet(facetName)) {
        return [];
      }
      return this.disjunctiveFacetsRefinements[facetName] || [];
    },
    /**
     * Get the list of hierarchical refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {string[]} list of refinements
     */
    getHierarchicalRefinement: function(facetName) {
      // we send an array but we currently do not support multiple
      // hierarchicalRefinements for a hierarchicalFacet
      return this.hierarchicalFacetsRefinements[facetName] || [];
    },
    /**
     * Get the list of exclude refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {string[]} list of refinements
     */
    getExcludeRefinements: function(facetName) {
      if (!this.isConjunctiveFacet(facetName)) {
        return [];
      }
      return this.facetsExcludes[facetName] || [];
    },

    /**
     * Remove all the numeric filter for a given (attribute, operator)
     * @method
     * @param {string} attribute attribute to set the filter on
     * @param {string} [operator] operator of the filter (possible values: =, >, >=, <, <=, !=)
     * @param {number} [number] the value to be removed
     * @return {SearchParameters}
     */
    removeNumericRefinement: function(attribute, operator, paramValue) {
      if (paramValue !== undefined) {
        if (!this.isNumericRefined(attribute, operator, paramValue)) {
          return this;
        }
        return this.setQueryParameters({
          numericRefinements: this._clearNumericRefinements(function(value, key) {
            return (
              key === attribute &&
              value.op === operator &&
              isEqualNumericRefinement(value.val, valToNumber_1(paramValue))
            );
          })
        });
      } else if (operator !== undefined) {
        if (!this.isNumericRefined(attribute, operator)) return this;
        return this.setQueryParameters({
          numericRefinements: this._clearNumericRefinements(function(value, key) {
            return key === attribute && value.op === operator;
          })
        });
      }

      if (!this.isNumericRefined(attribute)) return this;
      return this.setQueryParameters({
        numericRefinements: this._clearNumericRefinements(function(value, key) {
          return key === attribute;
        })
      });
    },
    /**
     * Get the list of numeric refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {SearchParameters.OperatorList} list of refinements
     */
    getNumericRefinements: function(facetName) {
      return this.numericRefinements[facetName] || {};
    },
    /**
     * Return the current refinement for the (attribute, operator)
     * @param {string} attribute attribute in the record
     * @param {string} operator operator applied on the refined values
     * @return {Array.<number|number[]>} refined values
     */
    getNumericRefinement: function(attribute, operator) {
      return this.numericRefinements[attribute] && this.numericRefinements[attribute][operator];
    },
    /**
     * Clear numeric filters.
     * @method
     * @private
     * @param {string|SearchParameters.clearCallback} [attribute] optional string or function
     * - If not given, means to clear all the filters.
     * - If `string`, means to clear all refinements for the `attribute` named filter.
     * - If `function`, means to clear all the refinements that return truthy values.
     * @return {Object.<string, OperatorList>}
     */
    _clearNumericRefinements: function _clearNumericRefinements(attribute) {
      if (attribute === undefined) {
        if (!objectHasKeys_1(this.numericRefinements)) {
          return this.numericRefinements;
        }
        return {};
      } else if (typeof attribute === 'string') {
        return omit$1(this.numericRefinements, [attribute]);
      } else if (typeof attribute === 'function') {
        var hasChanged = false;
        var numericRefinements = this.numericRefinements;
        var newNumericRefinements = Object.keys(numericRefinements).reduce(function(memo, key) {
          var operators = numericRefinements[key];
          var operatorList = {};

          operators = operators || {};
          Object.keys(operators).forEach(function(operator) {
            var values = operators[operator] || [];
            var outValues = [];
            values.forEach(function(value) {
              var predicateResult = attribute({val: value, op: operator}, key, 'numeric');
              if (!predicateResult) outValues.push(value);
            });
            if (outValues.length !== values.length) {
              hasChanged = true;
            }
            operatorList[operator] = outValues;
          });

          memo[key] = operatorList;

          return memo;
        }, {});

        if (hasChanged) return newNumericRefinements;
        return this.numericRefinements;
      }
    },
    /**
     * Add a facet to the facets attribute of the helper configuration, if it
     * isn't already present.
     * @method
     * @param {string} facet facet name to add
     * @return {SearchParameters}
     */
    addFacet: function addFacet(facet) {
      if (this.isConjunctiveFacet(facet)) {
        return this;
      }

      return this.setQueryParameters({
        facets: this.facets.concat([facet])
      });
    },
    /**
     * Add a disjunctive facet to the disjunctiveFacets attribute of the helper
     * configuration, if it isn't already present.
     * @method
     * @param {string} facet disjunctive facet name to add
     * @return {SearchParameters}
     */
    addDisjunctiveFacet: function addDisjunctiveFacet(facet) {
      if (this.isDisjunctiveFacet(facet)) {
        return this;
      }

      return this.setQueryParameters({
        disjunctiveFacets: this.disjunctiveFacets.concat([facet])
      });
    },
    /**
     * Add a hierarchical facet to the hierarchicalFacets attribute of the helper
     * configuration.
     * @method
     * @param {object} hierarchicalFacet hierarchical facet to add
     * @return {SearchParameters}
     * @throws will throw an error if a hierarchical facet with the same name was already declared
     */
    addHierarchicalFacet: function addHierarchicalFacet(hierarchicalFacet) {
      if (this.isHierarchicalFacet(hierarchicalFacet.name)) {
        throw new Error(
          'Cannot declare two hierarchical facets with the same name: `' + hierarchicalFacet.name + '`');
      }

      return this.setQueryParameters({
        hierarchicalFacets: this.hierarchicalFacets.concat([hierarchicalFacet])
      });
    },
    /**
     * Add a refinement on a "normal" facet
     * @method
     * @param {string} facet attribute to apply the faceting on
     * @param {string} value value of the attribute (will be converted to string)
     * @return {SearchParameters}
     */
    addFacetRefinement: function addFacetRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }
      if (RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

      return this.setQueryParameters({
        facetsRefinements: RefinementList.addRefinement(this.facetsRefinements, facet, value)
      });
    },
    /**
     * Exclude a value from a "normal" facet
     * @method
     * @param {string} facet attribute to apply the exclusion on
     * @param {string} value value of the attribute (will be converted to string)
     * @return {SearchParameters}
     */
    addExcludeRefinement: function addExcludeRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }
      if (RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

      return this.setQueryParameters({
        facetsExcludes: RefinementList.addRefinement(this.facetsExcludes, facet, value)
      });
    },
    /**
     * Adds a refinement on a disjunctive facet.
     * @method
     * @param {string} facet attribute to apply the faceting on
     * @param {string} value value of the attribute (will be converted to string)
     * @return {SearchParameters}
     */
    addDisjunctiveFacetRefinement: function addDisjunctiveFacetRefinement(facet, value) {
      if (!this.isDisjunctiveFacet(facet)) {
        throw new Error(
          facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
      }

      if (RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

      return this.setQueryParameters({
        disjunctiveFacetsRefinements: RefinementList.addRefinement(
          this.disjunctiveFacetsRefinements, facet, value)
      });
    },
    /**
     * addTagRefinement adds a tag to the list used to filter the results
     * @param {string} tag tag to be added
     * @return {SearchParameters}
     */
    addTagRefinement: function addTagRefinement(tag) {
      if (this.isTagRefined(tag)) return this;

      var modification = {
        tagRefinements: this.tagRefinements.concat(tag)
      };

      return this.setQueryParameters(modification);
    },
    /**
     * Remove a facet from the facets attribute of the helper configuration, if it
     * is present.
     * @method
     * @param {string} facet facet name to remove
     * @return {SearchParameters}
     */
    removeFacet: function removeFacet(facet) {
      if (!this.isConjunctiveFacet(facet)) {
        return this;
      }

      return this.clearRefinements(facet).setQueryParameters({
        facets: this.facets.filter(function(f) {
          return f !== facet;
        })
      });
    },
    /**
     * Remove a disjunctive facet from the disjunctiveFacets attribute of the
     * helper configuration, if it is present.
     * @method
     * @param {string} facet disjunctive facet name to remove
     * @return {SearchParameters}
     */
    removeDisjunctiveFacet: function removeDisjunctiveFacet(facet) {
      if (!this.isDisjunctiveFacet(facet)) {
        return this;
      }

      return this.clearRefinements(facet).setQueryParameters({
        disjunctiveFacets: this.disjunctiveFacets.filter(function(f) {
          return f !== facet;
        })
      });
    },
    /**
     * Remove a hierarchical facet from the hierarchicalFacets attribute of the
     * helper configuration, if it is present.
     * @method
     * @param {string} facet hierarchical facet name to remove
     * @return {SearchParameters}
     */
    removeHierarchicalFacet: function removeHierarchicalFacet(facet) {
      if (!this.isHierarchicalFacet(facet)) {
        return this;
      }

      return this.clearRefinements(facet).setQueryParameters({
        hierarchicalFacets: this.hierarchicalFacets.filter(function(f) {
          return f.name !== facet;
        })
      });
    },
    /**
     * Remove a refinement set on facet. If a value is provided, it will clear the
     * refinement for the given value, otherwise it will clear all the refinement
     * values for the faceted attribute.
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {string} [value] value used to filter
     * @return {SearchParameters}
     */
    removeFacetRefinement: function removeFacetRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }
      if (!RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

      return this.setQueryParameters({
        facetsRefinements: RefinementList.removeRefinement(this.facetsRefinements, facet, value)
      });
    },
    /**
     * Remove a negative refinement on a facet
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {string} value value used to filter
     * @return {SearchParameters}
     */
    removeExcludeRefinement: function removeExcludeRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }
      if (!RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

      return this.setQueryParameters({
        facetsExcludes: RefinementList.removeRefinement(this.facetsExcludes, facet, value)
      });
    },
    /**
     * Remove a refinement on a disjunctive facet
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {string} value value used to filter
     * @return {SearchParameters}
     */
    removeDisjunctiveFacetRefinement: function removeDisjunctiveFacetRefinement(facet, value) {
      if (!this.isDisjunctiveFacet(facet)) {
        throw new Error(
          facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
      }
      if (!RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

      return this.setQueryParameters({
        disjunctiveFacetsRefinements: RefinementList.removeRefinement(
          this.disjunctiveFacetsRefinements, facet, value)
      });
    },
    /**
     * Remove a tag from the list of tag refinements
     * @method
     * @param {string} tag the tag to remove
     * @return {SearchParameters}
     */
    removeTagRefinement: function removeTagRefinement(tag) {
      if (!this.isTagRefined(tag)) return this;

      var modification = {
        tagRefinements: this.tagRefinements.filter(function(t) {
          return t !== tag;
        })
      };

      return this.setQueryParameters(modification);
    },
    /**
     * Generic toggle refinement method to use with facet, disjunctive facets
     * and hierarchical facets
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     * @return {SearchParameters}
     * @throws will throw an error if the facet is not declared in the settings of the helper
     * @deprecated since version 2.19.0, see {@link SearchParameters#toggleFacetRefinement}
     */
    toggleRefinement: function toggleRefinement(facet, value) {
      return this.toggleFacetRefinement(facet, value);
    },
    /**
     * Generic toggle refinement method to use with facet, disjunctive facets
     * and hierarchical facets
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     * @return {SearchParameters}
     * @throws will throw an error if the facet is not declared in the settings of the helper
     */
    toggleFacetRefinement: function toggleFacetRefinement(facet, value) {
      if (this.isHierarchicalFacet(facet)) {
        return this.toggleHierarchicalFacetRefinement(facet, value);
      } else if (this.isConjunctiveFacet(facet)) {
        return this.toggleConjunctiveFacetRefinement(facet, value);
      } else if (this.isDisjunctiveFacet(facet)) {
        return this.toggleDisjunctiveFacetRefinement(facet, value);
      }

      throw new Error('Cannot refine the undeclared facet ' + facet +
        '; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets');
    },
    /**
     * Switch the refinement applied over a facet/value
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {SearchParameters}
     */
    toggleConjunctiveFacetRefinement: function toggleConjunctiveFacetRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }

      return this.setQueryParameters({
        facetsRefinements: RefinementList.toggleRefinement(this.facetsRefinements, facet, value)
      });
    },
    /**
     * Switch the refinement applied over a facet/value
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {SearchParameters}
     */
    toggleExcludeFacetRefinement: function toggleExcludeFacetRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }

      return this.setQueryParameters({
        facetsExcludes: RefinementList.toggleRefinement(this.facetsExcludes, facet, value)
      });
    },
    /**
     * Switch the refinement applied over a facet/value
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {SearchParameters}
     */
    toggleDisjunctiveFacetRefinement: function toggleDisjunctiveFacetRefinement(facet, value) {
      if (!this.isDisjunctiveFacet(facet)) {
        throw new Error(
          facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
      }

      return this.setQueryParameters({
        disjunctiveFacetsRefinements: RefinementList.toggleRefinement(
          this.disjunctiveFacetsRefinements, facet, value)
      });
    },
    /**
     * Switch the refinement applied over a facet/value
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {SearchParameters}
     */
    toggleHierarchicalFacetRefinement: function toggleHierarchicalFacetRefinement(facet, value) {
      if (!this.isHierarchicalFacet(facet)) {
        throw new Error(
          facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration');
      }

      var separator = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(facet));

      var mod = {};

      var upOneOrMultipleLevel = this.hierarchicalFacetsRefinements[facet] !== undefined &&
        this.hierarchicalFacetsRefinements[facet].length > 0 && (
        // remove current refinement:
        // refinement was 'beer > IPA', call is toggleRefine('beer > IPA'), refinement should be `beer`
        this.hierarchicalFacetsRefinements[facet][0] === value ||
        // remove a parent refinement of the current refinement:
        //  - refinement was 'beer > IPA > Flying dog'
        //  - call is toggleRefine('beer > IPA')
        //  - refinement should be `beer`
        this.hierarchicalFacetsRefinements[facet][0].indexOf(value + separator) === 0
      );

      if (upOneOrMultipleLevel) {
        if (value.indexOf(separator) === -1) {
          // go back to root level
          mod[facet] = [];
        } else {
          mod[facet] = [value.slice(0, value.lastIndexOf(separator))];
        }
      } else {
        mod[facet] = [value];
      }

      return this.setQueryParameters({
        hierarchicalFacetsRefinements: defaultsPure({}, mod, this.hierarchicalFacetsRefinements)
      });
    },

    /**
     * Adds a refinement on a hierarchical facet.
     * @param {string} facet the facet name
     * @param {string} path the hierarchical facet path
     * @return {SearchParameter} the new state
     * @throws Error if the facet is not defined or if the facet is refined
     */
    addHierarchicalFacetRefinement: function(facet, path) {
      if (this.isHierarchicalFacetRefined(facet)) {
        throw new Error(facet + ' is already refined.');
      }
      if (!this.isHierarchicalFacet(facet)) {
        throw new Error(facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration.');
      }
      var mod = {};
      mod[facet] = [path];
      return this.setQueryParameters({
        hierarchicalFacetsRefinements: defaultsPure({}, mod, this.hierarchicalFacetsRefinements)
      });
    },

    /**
     * Removes the refinement set on a hierarchical facet.
     * @param {string} facet the facet name
     * @return {SearchParameter} the new state
     * @throws Error if the facet is not defined or if the facet is not refined
     */
    removeHierarchicalFacetRefinement: function(facet) {
      if (!this.isHierarchicalFacetRefined(facet)) {
        return this;
      }
      var mod = {};
      mod[facet] = [];
      return this.setQueryParameters({
        hierarchicalFacetsRefinements: defaultsPure({}, mod, this.hierarchicalFacetsRefinements)
      });
    },
    /**
     * Switch the tag refinement
     * @method
     * @param {string} tag the tag to remove or add
     * @return {SearchParameters}
     */
    toggleTagRefinement: function toggleTagRefinement(tag) {
      if (this.isTagRefined(tag)) {
        return this.removeTagRefinement(tag);
      }

      return this.addTagRefinement(tag);
    },
    /**
     * Test if the facet name is from one of the disjunctive facets
     * @method
     * @param {string} facet facet name to test
     * @return {boolean}
     */
    isDisjunctiveFacet: function(facet) {
      return this.disjunctiveFacets.indexOf(facet) > -1;
    },
    /**
     * Test if the facet name is from one of the hierarchical facets
     * @method
     * @param {string} facetName facet name to test
     * @return {boolean}
     */
    isHierarchicalFacet: function(facetName) {
      return this.getHierarchicalFacetByName(facetName) !== undefined;
    },
    /**
     * Test if the facet name is from one of the conjunctive/normal facets
     * @method
     * @param {string} facet facet name to test
     * @return {boolean}
     */
    isConjunctiveFacet: function(facet) {
      return this.facets.indexOf(facet) > -1;
    },
    /**
     * Returns true if the facet is refined, either for a specific value or in
     * general.
     * @method
     * @param {string} facet name of the attribute for used for faceting
     * @param {string} value, optional value. If passed will test that this value
     * is filtering the given facet.
     * @return {boolean} returns true if refined
     */
    isFacetRefined: function isFacetRefined(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        return false;
      }
      return RefinementList.isRefined(this.facetsRefinements, facet, value);
    },
    /**
     * Returns true if the facet contains exclusions or if a specific value is
     * excluded.
     *
     * @method
     * @param {string} facet name of the attribute for used for faceting
     * @param {string} [value] optional value. If passed will test that this value
     * is filtering the given facet.
     * @return {boolean} returns true if refined
     */
    isExcludeRefined: function isExcludeRefined(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        return false;
      }
      return RefinementList.isRefined(this.facetsExcludes, facet, value);
    },
    /**
     * Returns true if the facet contains a refinement, or if a value passed is a
     * refinement for the facet.
     * @method
     * @param {string} facet name of the attribute for used for faceting
     * @param {string} value optional, will test if the value is used for refinement
     * if there is one, otherwise will test if the facet contains any refinement
     * @return {boolean}
     */
    isDisjunctiveFacetRefined: function isDisjunctiveFacetRefined(facet, value) {
      if (!this.isDisjunctiveFacet(facet)) {
        return false;
      }
      return RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value);
    },
    /**
     * Returns true if the facet contains a refinement, or if a value passed is a
     * refinement for the facet.
     * @method
     * @param {string} facet name of the attribute for used for faceting
     * @param {string} value optional, will test if the value is used for refinement
     * if there is one, otherwise will test if the facet contains any refinement
     * @return {boolean}
     */
    isHierarchicalFacetRefined: function isHierarchicalFacetRefined(facet, value) {
      if (!this.isHierarchicalFacet(facet)) {
        return false;
      }

      var refinements = this.getHierarchicalRefinement(facet);

      if (!value) {
        return refinements.length > 0;
      }

      return refinements.indexOf(value) !== -1;
    },
    /**
     * Test if the triple (attribute, operator, value) is already refined.
     * If only the attribute and the operator are provided, it tests if the
     * contains any refinement value.
     * @method
     * @param {string} attribute attribute for which the refinement is applied
     * @param {string} [operator] operator of the refinement
     * @param {string} [value] value of the refinement
     * @return {boolean} true if it is refined
     */
    isNumericRefined: function isNumericRefined(attribute, operator, value) {
      if (value === undefined && operator === undefined) {
        return !!this.numericRefinements[attribute];
      }

      var isOperatorDefined =
        this.numericRefinements[attribute] &&
        this.numericRefinements[attribute][operator] !== undefined;

      if (value === undefined || !isOperatorDefined) {
        return isOperatorDefined;
      }

      var parsedValue = valToNumber_1(value);
      var isAttributeValueDefined =
        findArray(this.numericRefinements[attribute][operator], parsedValue) !==
        undefined;

      return isOperatorDefined && isAttributeValueDefined;
    },
    /**
     * Returns true if the tag refined, false otherwise
     * @method
     * @param {string} tag the tag to check
     * @return {boolean}
     */
    isTagRefined: function isTagRefined(tag) {
      return this.tagRefinements.indexOf(tag) !== -1;
    },
    /**
     * Returns the list of all disjunctive facets refined
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {string[]}
     */
    getRefinedDisjunctiveFacets: function getRefinedDisjunctiveFacets() {
      var self = this;

      // attributes used for numeric filter can also be disjunctive
      var disjunctiveNumericRefinedFacets = intersection_1(
        Object.keys(this.numericRefinements).filter(function(facet) {
          return Object.keys(self.numericRefinements[facet]).length > 0;
        }),
        this.disjunctiveFacets
      );

      return Object.keys(this.disjunctiveFacetsRefinements).filter(function(facet) {
        return self.disjunctiveFacetsRefinements[facet].length > 0;
      })
        .concat(disjunctiveNumericRefinedFacets)
        .concat(this.getRefinedHierarchicalFacets());
    },
    /**
     * Returns the list of all disjunctive facets refined
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {string[]}
     */
    getRefinedHierarchicalFacets: function getRefinedHierarchicalFacets() {
      var self = this;
      return intersection_1(
        // enforce the order between the two arrays,
        // so that refinement name index === hierarchical facet index
        this.hierarchicalFacets.map(function(facet) { return facet.name; }),
        Object.keys(this.hierarchicalFacetsRefinements).filter(function(facet) {
          return self.hierarchicalFacetsRefinements[facet].length > 0;
        })
      );
    },
    /**
     * Returned the list of all disjunctive facets not refined
     * @method
     * @return {string[]}
     */
    getUnrefinedDisjunctiveFacets: function() {
      var refinedFacets = this.getRefinedDisjunctiveFacets();

      return this.disjunctiveFacets.filter(function(f) {
        return refinedFacets.indexOf(f) === -1;
      });
    },

    managedParameters: [
      'index',

      'facets',
      'disjunctiveFacets',
      'facetsRefinements',
      'hierarchicalFacets',
      'facetsExcludes',

      'disjunctiveFacetsRefinements',
      'numericRefinements',
      'tagRefinements',
      'hierarchicalFacetsRefinements'
    ],
    getQueryParams: function getQueryParams() {
      var managedParameters = this.managedParameters;

      var queryParams = {};

      var self = this;
      Object.keys(this).forEach(function(paramName) {
        var paramValue = self[paramName];
        if (managedParameters.indexOf(paramName) === -1 && paramValue !== undefined) {
          queryParams[paramName] = paramValue;
        }
      });

      return queryParams;
    },
    /**
     * Let the user set a specific value for a given parameter. Will return the
     * same instance if the parameter is invalid or if the value is the same as the
     * previous one.
     * @method
     * @param {string} parameter the parameter name
     * @param {any} value the value to be set, must be compliant with the definition
     * of the attribute on the object
     * @return {SearchParameters} the updated state
     */
    setQueryParameter: function setParameter(parameter, value) {
      if (this[parameter] === value) return this;

      var modification = {};

      modification[parameter] = value;

      return this.setQueryParameters(modification);
    },
    /**
     * Let the user set any of the parameters with a plain object.
     * @method
     * @param {object} params all the keys and the values to be updated
     * @return {SearchParameters} a new updated instance
     */
    setQueryParameters: function setQueryParameters(params) {
      if (!params) return this;

      var error = SearchParameters.validate(this, params);

      if (error) {
        throw error;
      }

      var self = this;
      var nextWithNumbers = SearchParameters._parseNumbers(params);
      var previousPlainObject = Object.keys(this).reduce(function(acc, key) {
        acc[key] = self[key];
        return acc;
      }, {});

      var nextPlainObject = Object.keys(nextWithNumbers).reduce(
        function(previous, key) {
          var isPreviousValueDefined = previous[key] !== undefined;
          var isNextValueDefined = nextWithNumbers[key] !== undefined;

          if (isPreviousValueDefined && !isNextValueDefined) {
            return omit$1(previous, [key]);
          }

          if (isNextValueDefined) {
            previous[key] = nextWithNumbers[key];
          }

          return previous;
        },
        previousPlainObject
      );

      return new this.constructor(nextPlainObject);
    },

    /**
     * Returns a new instance with the page reset. Two scenarios possible:
     * the page is omitted -> return the given instance
     * the page is set -> return a new instance with a page of 0
     * @return {SearchParameters} a new updated instance
     */
    resetPage: function() {
      if (this.page === undefined) {
        return this;
      }

      return this.setPage(0);
    },

    /**
     * Helper function to get the hierarchicalFacet separator or the default one (`>`)
     * @param  {object} hierarchicalFacet
     * @return {string} returns the hierarchicalFacet.separator or `>` as default
     */
    _getHierarchicalFacetSortBy: function(hierarchicalFacet) {
      return hierarchicalFacet.sortBy || ['isRefined:desc', 'name:asc'];
    },

    /**
     * Helper function to get the hierarchicalFacet separator or the default one (`>`)
     * @private
     * @param  {object} hierarchicalFacet
     * @return {string} returns the hierarchicalFacet.separator or `>` as default
     */
    _getHierarchicalFacetSeparator: function(hierarchicalFacet) {
      return hierarchicalFacet.separator || ' > ';
    },

    /**
     * Helper function to get the hierarchicalFacet prefix path or null
     * @private
     * @param  {object} hierarchicalFacet
     * @return {string} returns the hierarchicalFacet.rootPath or null as default
     */
    _getHierarchicalRootPath: function(hierarchicalFacet) {
      return hierarchicalFacet.rootPath || null;
    },

    /**
     * Helper function to check if we show the parent level of the hierarchicalFacet
     * @private
     * @param  {object} hierarchicalFacet
     * @return {string} returns the hierarchicalFacet.showParentLevel or true as default
     */
    _getHierarchicalShowParentLevel: function(hierarchicalFacet) {
      if (typeof hierarchicalFacet.showParentLevel === 'boolean') {
        return hierarchicalFacet.showParentLevel;
      }
      return true;
    },

    /**
     * Helper function to get the hierarchicalFacet by it's name
     * @param  {string} hierarchicalFacetName
     * @return {object} a hierarchicalFacet
     */
    getHierarchicalFacetByName: function(hierarchicalFacetName) {
      return find$1(
        this.hierarchicalFacets,
        function(f) {
          return f.name === hierarchicalFacetName;
        }
      );
    },

    /**
     * Get the current breadcrumb for a hierarchical facet, as an array
     * @param  {string} facetName Hierarchical facet name
     * @return {array.<string>} the path as an array of string
     */
    getHierarchicalFacetBreadcrumb: function(facetName) {
      if (!this.isHierarchicalFacet(facetName)) {
        return [];
      }

      var refinement = this.getHierarchicalRefinement(facetName)[0];
      if (!refinement) return [];

      var separator = this._getHierarchicalFacetSeparator(
        this.getHierarchicalFacetByName(facetName)
      );
      var path = refinement.split(separator);
      return path.map(function(part) {
        return part.trim();
      });
    },

    toString: function() {
      return JSON.stringify(this, null, 2);
    }
  };

  /**
   * Callback used for clearRefinement method
   * @callback SearchParameters.clearCallback
   * @param {OperatorList|FacetList} value the value of the filter
   * @param {string} key the current attribute name
   * @param {string} type `numeric`, `disjunctiveFacet`, `conjunctiveFacet`, `hierarchicalFacet` or `exclude`
   * depending on the type of facet
   * @return {boolean} `true` if the element should be removed. `false` otherwise.
   */
  var SearchParameters_1 = SearchParameters;

  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== undefined;
      var valIsNull = value === null;

      var othIsDefined = other !== undefined;
      var othIsNull = other === null;

      if (
        (!othIsNull && value > other) ||
        (valIsNull && othIsDefined) ||
        !valIsDefined
      ) {
        return 1;
      }
      if (
        (!valIsNull && value < other) ||
        (othIsNull && valIsDefined) ||
        !othIsDefined
      ) {
        return -1;
      }
    }
    return 0;
  }

  /**
   * @param {Array<object>} collection object with keys in attributes
   * @param {Array<string>} iteratees attributes
   * @param {Array<string>} orders asc | desc
   */
  function orderBy(collection, iteratees, orders) {
    if (!Array.isArray(collection)) {
      return [];
    }

    if (!Array.isArray(orders)) {
      orders = [];
    }

    var result = collection.map(function(value, index) {
      return {
        criteria: iteratees.map(function(iteratee) {
          return value[iteratee];
        }),
        index: index,
        value: value
      };
    });

    result.sort(function comparer(object, other) {
      var index = -1;

      while (++index < object.criteria.length) {
        var res = compareAscending(object.criteria[index], other.criteria[index]);
        if (res) {
          if (index >= orders.length) {
            return res;
          }
          if (orders[index] === 'desc') {
            return -res;
          }
          return res;
        }
      }

      // This ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    });

    return result.map(function(res) {
      return res.value;
    });
  }

  var orderBy_1 = orderBy;

  var compact = function compact(array) {
    if (!Array.isArray(array)) {
      return [];
    }

    return array.filter(Boolean);
  };

  // @MAJOR can be replaced by native Array#findIndex when we change support
  var findIndex$1 = function find(array, comparator) {
    if (!Array.isArray(array)) {
      return -1;
    }

    for (var i = 0; i < array.length; i++) {
      if (comparator(array[i])) {
        return i;
      }
    }
    return -1;
  };

  /**
   * Transform sort format from user friendly notation to lodash format
   * @param {string[]} sortBy array of predicate of the form "attribute:order"
   * @param {string[]} [defaults] array of predicate of the form "attribute:order"
   * @return {array.<string[]>} array containing 2 elements : attributes, orders
   */
  var formatSort = function formatSort(sortBy, defaults) {
    var defaultInstructions = (defaults || []).map(function(sort) {
      return sort.split(':');
    });

    return sortBy.reduce(
      function preparePredicate(out, sort) {
        var sortInstruction = sort.split(':');

        var matchingDefault = find$1(defaultInstructions, function(
          defaultInstruction
        ) {
          return defaultInstruction[0] === sortInstruction[0];
        });

        if (sortInstruction.length > 1 || !matchingDefault) {
          out[0].push(sortInstruction[0]);
          out[1].push(sortInstruction[1]);
          return out;
        }

        out[0].push(matchingDefault[0]);
        out[1].push(matchingDefault[1]);
        return out;
      },
      [[], []]
    );
  };

  /**
   * Replaces a leading - with \-
   * @private
   * @param {any} value the facet value to replace
   * @returns any
   */
  function escapeFacetValue$1(value) {
    if (typeof value !== 'string') return value;

    return String(value).replace(/^-/, '\\-');
  }

  /**
   * Replaces a leading \- with -
   * @private
   * @param {any} value the escaped facet value
   * @returns any
   */
  function unescapeFacetValue$1(value) {
    if (typeof value !== 'string') return value;

    return value.replace(/^\\-/, '-');
  }

  var escapeFacetValue_1 = {
    escapeFacetValue: escapeFacetValue$1,
    unescapeFacetValue: unescapeFacetValue$1
  };

  var generateHierarchicalTree_1 = generateTrees;





  var escapeFacetValue$2 = escapeFacetValue_1.escapeFacetValue;
  var unescapeFacetValue$2 = escapeFacetValue_1.unescapeFacetValue;

  function generateTrees(state) {
    return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
      var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
      var hierarchicalFacetRefinement =
        (state.hierarchicalFacetsRefinements[hierarchicalFacet.name] &&
          state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0]) ||
        '';
      var hierarchicalSeparator = state._getHierarchicalFacetSeparator(
        hierarchicalFacet
      );
      var hierarchicalRootPath = state._getHierarchicalRootPath(
        hierarchicalFacet
      );
      var hierarchicalShowParentLevel = state._getHierarchicalShowParentLevel(
        hierarchicalFacet
      );
      var sortBy = formatSort(
        state._getHierarchicalFacetSortBy(hierarchicalFacet)
      );

      var rootExhaustive = hierarchicalFacetResult.every(function(facetResult) {
        return facetResult.exhaustive;
      });

      var generateTreeFn = generateHierarchicalTree(
        sortBy,
        hierarchicalSeparator,
        hierarchicalRootPath,
        hierarchicalShowParentLevel,
        hierarchicalFacetRefinement
      );

      var results = hierarchicalFacetResult;

      if (hierarchicalRootPath) {
        results = hierarchicalFacetResult.slice(
          hierarchicalRootPath.split(hierarchicalSeparator).length
        );
      }

      return results.reduce(generateTreeFn, {
        name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
        count: null, // root level, no count
        isRefined: true, // root level, always refined
        path: null, // root level, no path
        escapedValue: null,
        exhaustive: rootExhaustive,
        data: null
      });
    };
  }

  function generateHierarchicalTree(
    sortBy,
    hierarchicalSeparator,
    hierarchicalRootPath,
    hierarchicalShowParentLevel,
    currentRefinement
  ) {
    return function generateTree(
      hierarchicalTree,
      hierarchicalFacetResult,
      currentHierarchicalLevel
    ) {
      var parent = hierarchicalTree;

      if (currentHierarchicalLevel > 0) {
        var level = 0;

        parent = hierarchicalTree;

        while (level < currentHierarchicalLevel) {
          /**
           * @type {object[]]} hierarchical data
           */
          var data = parent && Array.isArray(parent.data) ? parent.data : [];
          parent = find$1(data, function(subtree) {
            return subtree.isRefined;
          });
          level++;
        }
      }

      // we found a refined parent, let's add current level data under it
      if (parent) {
        // filter values in case an object has multiple categories:
        //   {
        //     categories: {
        //       level0: ['beers', 'bières'],
        //       level1: ['beers > IPA', 'bières > Belges']
        //     }
        //   }
        //
        // If parent refinement is `beers`, then we do not want to have `bières > Belges`
        // showing up

        var picked = Object.keys(hierarchicalFacetResult.data)
          .map(function(facetValue) {
            return [facetValue, hierarchicalFacetResult.data[facetValue]];
          })
          .filter(function(tuple) {
            var facetValue = tuple[0];
            return onlyMatchingTree(
              facetValue,
              parent.path || hierarchicalRootPath,
              currentRefinement,
              hierarchicalSeparator,
              hierarchicalRootPath,
              hierarchicalShowParentLevel
            );
          });

        parent.data = orderBy_1(
          picked.map(function(tuple) {
            var facetValue = tuple[0];
            var facetCount = tuple[1];

            return format(
              facetCount,
              facetValue,
              hierarchicalSeparator,
              unescapeFacetValue$2(currentRefinement),
              hierarchicalFacetResult.exhaustive
            );
          }),
          sortBy[0],
          sortBy[1]
        );
      }

      return hierarchicalTree;
    };
  }

  function onlyMatchingTree(
    facetValue,
    parentPath,
    currentRefinement,
    hierarchicalSeparator,
    hierarchicalRootPath,
    hierarchicalShowParentLevel
  ) {
    // we want the facetValue is a child of hierarchicalRootPath
    if (
      hierarchicalRootPath &&
      (facetValue.indexOf(hierarchicalRootPath) !== 0 ||
        hierarchicalRootPath === facetValue)
    ) {
      return false;
    }

    // we always want root levels (only when there is no prefix path)
    return (
      (!hierarchicalRootPath &&
        facetValue.indexOf(hierarchicalSeparator) === -1) ||
      // if there is a rootPath, being root level mean 1 level under rootPath
      (hierarchicalRootPath &&
        facetValue.split(hierarchicalSeparator).length -
          hierarchicalRootPath.split(hierarchicalSeparator).length ===
          1) ||
      // if current refinement is a root level and current facetValue is a root level,
      // keep the facetValue
      (facetValue.indexOf(hierarchicalSeparator) === -1 &&
        currentRefinement.indexOf(hierarchicalSeparator) === -1) ||
      // currentRefinement is a child of the facet value
      currentRefinement.indexOf(facetValue) === 0 ||
      // facetValue is a child of the current parent, add it
      (facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 &&
        (hierarchicalShowParentLevel ||
          facetValue.indexOf(currentRefinement) === 0))
    );
  }

  function format(
    facetCount,
    facetValue,
    hierarchicalSeparator,
    currentRefinement,
    exhaustive
  ) {
    var parts = facetValue.split(hierarchicalSeparator);
    return {
      name: parts[parts.length - 1].trim(),
      path: facetValue,
      escapedValue: escapeFacetValue$2(facetValue),
      count: facetCount,
      isRefined:
        currentRefinement === facetValue ||
        currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
      exhaustive: exhaustive,
      data: null
    };
  }

  var escapeFacetValue$3 = escapeFacetValue_1.escapeFacetValue;
  var unescapeFacetValue$3 = escapeFacetValue_1.unescapeFacetValue;



  /**
   * @typedef SearchResults.Facet
   * @type {object}
   * @property {string} name name of the attribute in the record
   * @property {object} data the faceting data: value, number of entries
   * @property {object} stats undefined unless facet_stats is retrieved from algolia
   */

  /**
   * @typedef SearchResults.HierarchicalFacet
   * @type {object}
   * @property {string} name name of the current value given the hierarchical level, trimmed.
   * If root node, you get the facet name
   * @property {number} count number of objects matching this hierarchical value
   * @property {string} path the current hierarchical value full path
   * @property {boolean} isRefined `true` if the current value was refined, `false` otherwise
   * @property {HierarchicalFacet[]} data sub values for the current level
   */

  /**
   * @typedef SearchResults.FacetValue
   * @type {object}
   * @property {string} name the facet value itself
   * @property {number} count times this facet appears in the results
   * @property {boolean} isRefined is the facet currently selected
   * @property {boolean} isExcluded is the facet currently excluded (only for conjunctive facets)
   */

  /**
   * @typedef Refinement
   * @type {object}
   * @property {string} type the type of filter used:
   * `numeric`, `facet`, `exclude`, `disjunctive`, `hierarchical`
   * @property {string} attributeName name of the attribute used for filtering
   * @property {string} name the value of the filter
   * @property {number} numericValue the value as a number. Only for numeric filters.
   * @property {string} operator the operator used. Only for numeric filters.
   * @property {number} count the number of computed hits for this filter. Only on facets.
   * @property {boolean} exhaustive if the count is exhaustive
   */

  /**
   * @param {string[]} attributes
   */
  function getIndices(attributes) {
    var indices = {};

    attributes.forEach(function(val, idx) {
      indices[val] = idx;
    });

    return indices;
  }

  function assignFacetStats(dest, facetStats, key) {
    if (facetStats && facetStats[key]) {
      dest.stats = facetStats[key];
    }
  }

  /**
   * @typedef {Object} HierarchicalFacet
   * @property {string} name
   * @property {string[]} attributes
   */

  /**
   * @param {HierarchicalFacet[]} hierarchicalFacets
   * @param {string} hierarchicalAttributeName
   */
  function findMatchingHierarchicalFacetFromAttributeName(
    hierarchicalFacets,
    hierarchicalAttributeName
  ) {
    return find$1(hierarchicalFacets, function facetKeyMatchesAttribute(
      hierarchicalFacet
    ) {
      var facetNames = hierarchicalFacet.attributes || [];
      return facetNames.indexOf(hierarchicalAttributeName) > -1;
    });
  }

  /*eslint-disable */
  /**
   * Constructor for SearchResults
   * @class
   * @classdesc SearchResults contains the results of a query to Algolia using the
   * {@link AlgoliaSearchHelper}.
   * @param {SearchParameters} state state that led to the response
   * @param {array.<object>} results the results from algolia client
   * @example <caption>SearchResults of the first query in
   * <a href="http://demos.algolia.com/instant-search-demo">the instant search demo</a></caption>
  {
     "hitsPerPage": 10,
     "processingTimeMS": 2,
     "facets": [
        {
           "name": "type",
           "data": {
              "HardGood": 6627,
              "BlackTie": 550,
              "Music": 665,
              "Software": 131,
              "Game": 456,
              "Movie": 1571
           },
           "exhaustive": false
        },
        {
           "exhaustive": false,
           "data": {
              "Free shipping": 5507
           },
           "name": "shipping"
        }
    ],
     "hits": [
        {
           "thumbnailImage": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_54x108_s.gif",
           "_highlightResult": {
              "shortDescription": {
                 "matchLevel": "none",
                 "value": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
                 "matchedWords": []
              },
              "category": {
                 "matchLevel": "none",
                 "value": "Computer Security Software",
                 "matchedWords": []
              },
              "manufacturer": {
                 "matchedWords": [],
                 "value": "Webroot",
                 "matchLevel": "none"
              },
              "name": {
                 "value": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
                 "matchedWords": [],
                 "matchLevel": "none"
              }
           },
           "image": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_105x210_sc.jpg",
           "shipping": "Free shipping",
           "bestSellingRank": 4,
           "shortDescription": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
           "url": "http://www.bestbuy.com/site/webroot-secureanywhere-internet-security-3-devi…d=1219060687969&skuId=1688832&cmp=RMX&ky=2d3GfEmNIzjA0vkzveHdZEBgpPCyMnLTJ",
           "name": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
           "category": "Computer Security Software",
           "salePrice_range": "1 - 50",
           "objectID": "1688832",
           "type": "Software",
           "customerReviewCount": 5980,
           "salePrice": 49.99,
           "manufacturer": "Webroot"
        },
        ....
    ],
     "nbHits": 10000,
     "disjunctiveFacets": [
        {
           "exhaustive": false,
           "data": {
              "5": 183,
              "12": 112,
              "7": 149,
              ...
           },
           "name": "customerReviewCount",
           "stats": {
              "max": 7461,
              "avg": 157.939,
              "min": 1
           }
        },
        {
           "data": {
              "Printer Ink": 142,
              "Wireless Speakers": 60,
              "Point & Shoot Cameras": 48,
              ...
           },
           "name": "category",
           "exhaustive": false
        },
        {
           "exhaustive": false,
           "data": {
              "> 5000": 2,
              "1 - 50": 6524,
              "501 - 2000": 566,
              "201 - 500": 1501,
              "101 - 200": 1360,
              "2001 - 5000": 47
           },
           "name": "salePrice_range"
        },
        {
           "data": {
              "Dynex™": 202,
              "Insignia™": 230,
              "PNY": 72,
              ...
           },
           "name": "manufacturer",
           "exhaustive": false
        }
    ],
     "query": "",
     "nbPages": 100,
     "page": 0,
     "index": "bestbuy"
  }
   **/
  /*eslint-enable */
  function SearchResults(state, results, options) {
    var mainSubResponse = results[0];

    this._rawResults = results;

    var self = this;

    // https://www.algolia.com/doc/api-reference/api-methods/search/#response
    Object.keys(mainSubResponse).forEach(function(key) {
      self[key] = mainSubResponse[key];
    });

    // Make every key of the result options reachable from the instance
    Object.keys(options || {}).forEach(function(key) {
      self[key] = options[key];
    });

    /**
     * query used to generate the results
     * @name query
     * @member {string}
     * @memberof SearchResults
     * @instance
     */
    /**
     * The query as parsed by the engine given all the rules.
     * @name parsedQuery
     * @member {string}
     * @memberof SearchResults
     * @instance
     */
    /**
     * all the records that match the search parameters. Each record is
     * augmented with a new attribute `_highlightResult`
     * which is an object keyed by attribute and with the following properties:
     *  - `value` : the value of the facet highlighted (html)
     *  - `matchLevel`: full, partial or none depending on how the query terms match
     * @name hits
     * @member {object[]}
     * @memberof SearchResults
     * @instance
     */
    /**
     * index where the results come from
     * @name index
     * @member {string}
     * @memberof SearchResults
     * @instance
     */
    /**
     * number of hits per page requested
     * @name hitsPerPage
     * @member {number}
     * @memberof SearchResults
     * @instance
     */
    /**
     * total number of hits of this query on the index
     * @name nbHits
     * @member {number}
     * @memberof SearchResults
     * @instance
     */
    /**
     * total number of pages with respect to the number of hits per page and the total number of hits
     * @name nbPages
     * @member {number}
     * @memberof SearchResults
     * @instance
     */
    /**
     * current page
     * @name page
     * @member {number}
     * @memberof SearchResults
     * @instance
     */
    /**
     * The position if the position was guessed by IP.
     * @name aroundLatLng
     * @member {string}
     * @memberof SearchResults
     * @instance
     * @example "48.8637,2.3615",
     */
    /**
     * The radius computed by Algolia.
     * @name automaticRadius
     * @member {string}
     * @memberof SearchResults
     * @instance
     * @example "126792922",
     */
    /**
     * String identifying the server used to serve this request.
     *
     * getRankingInfo needs to be set to `true` for this to be returned
     *
     * @name serverUsed
     * @member {string}
     * @memberof SearchResults
     * @instance
     * @example "c7-use-2.algolia.net",
     */
    /**
     * Boolean that indicates if the computation of the counts did time out.
     * @deprecated
     * @name timeoutCounts
     * @member {boolean}
     * @memberof SearchResults
     * @instance
     */
    /**
     * Boolean that indicates if the computation of the hits did time out.
     * @deprecated
     * @name timeoutHits
     * @member {boolean}
     * @memberof SearchResults
     * @instance
     */
    /**
     * True if the counts of the facets is exhaustive
     * @name exhaustiveFacetsCount
     * @member {boolean}
     * @memberof SearchResults
     * @instance
     */
    /**
     * True if the number of hits is exhaustive
     * @name exhaustiveNbHits
     * @member {boolean}
     * @memberof SearchResults
     * @instance
     */
    /**
     * Contains the userData if they are set by a [query rule](https://www.algolia.com/doc/guides/query-rules/query-rules-overview/).
     * @name userData
     * @member {object[]}
     * @memberof SearchResults
     * @instance
     */
    /**
     * queryID is the unique identifier of the query used to generate the current search results.
     * This value is only available if the `clickAnalytics` search parameter is set to `true`.
     * @name queryID
     * @member {string}
     * @memberof SearchResults
     * @instance
     */

    /**
     * sum of the processing time of all the queries
     * @member {number}
     */
    this.processingTimeMS = results.reduce(function(sum, result) {
      return result.processingTimeMS === undefined
        ? sum
        : sum + result.processingTimeMS;
    }, 0);

    /**
     * disjunctive facets results
     * @member {SearchResults.Facet[]}
     */
    this.disjunctiveFacets = [];
    /**
     * disjunctive facets results
     * @member {SearchResults.HierarchicalFacet[]}
     */
    this.hierarchicalFacets = state.hierarchicalFacets.map(function initFutureTree() {
      return [];
    });
    /**
     * other facets results
     * @member {SearchResults.Facet[]}
     */
    this.facets = [];

    var disjunctiveFacets = state.getRefinedDisjunctiveFacets();

    var facetsIndices = getIndices(state.facets);
    var disjunctiveFacetsIndices = getIndices(state.disjunctiveFacets);
    var nextDisjunctiveResult = 1;

    // Since we send request only for disjunctive facets that have been refined,
    // we get the facets information from the first, general, response.

    var mainFacets = mainSubResponse.facets || {};

    Object.keys(mainFacets).forEach(function(facetKey) {
      var facetValueObject = mainFacets[facetKey];

      var hierarchicalFacet = findMatchingHierarchicalFacetFromAttributeName(
        state.hierarchicalFacets,
        facetKey
      );

      if (hierarchicalFacet) {
        // Place the hierarchicalFacet data at the correct index depending on
        // the attributes order that was defined at the helper initialization
        var facetIndex = hierarchicalFacet.attributes.indexOf(facetKey);
        var idxAttributeName = findIndex$1(state.hierarchicalFacets, function(f) {
          return f.name === hierarchicalFacet.name;
        });
        self.hierarchicalFacets[idxAttributeName][facetIndex] = {
          attribute: facetKey,
          data: facetValueObject,
          exhaustive: mainSubResponse.exhaustiveFacetsCount
        };
      } else {
        var isFacetDisjunctive = state.disjunctiveFacets.indexOf(facetKey) !== -1;
        var isFacetConjunctive = state.facets.indexOf(facetKey) !== -1;
        var position;

        if (isFacetDisjunctive) {
          position = disjunctiveFacetsIndices[facetKey];
          self.disjunctiveFacets[position] = {
            name: facetKey,
            data: facetValueObject,
            exhaustive: mainSubResponse.exhaustiveFacetsCount
          };
          assignFacetStats(self.disjunctiveFacets[position], mainSubResponse.facets_stats, facetKey);
        }
        if (isFacetConjunctive) {
          position = facetsIndices[facetKey];
          self.facets[position] = {
            name: facetKey,
            data: facetValueObject,
            exhaustive: mainSubResponse.exhaustiveFacetsCount
          };
          assignFacetStats(self.facets[position], mainSubResponse.facets_stats, facetKey);
        }
      }
    });

    // Make sure we do not keep holes within the hierarchical facets
    this.hierarchicalFacets = compact(this.hierarchicalFacets);

    // aggregate the refined disjunctive facets
    disjunctiveFacets.forEach(function(disjunctiveFacet) {
      var result = results[nextDisjunctiveResult];
      var facets = result && result.facets ? result.facets : {};
      var hierarchicalFacet = state.getHierarchicalFacetByName(disjunctiveFacet);

      // There should be only item in facets.
      Object.keys(facets).forEach(function(dfacet) {
        var facetResults = facets[dfacet];

        var position;

        if (hierarchicalFacet) {
          position = findIndex$1(state.hierarchicalFacets, function(f) {
            return f.name === hierarchicalFacet.name;
          });
          var attributeIndex = findIndex$1(self.hierarchicalFacets[position], function(f) {
            return f.attribute === dfacet;
          });

          // previous refinements and no results so not able to find it
          if (attributeIndex === -1) {
            return;
          }

          self.hierarchicalFacets[position][attributeIndex].data = merge_1(
            {},
            self.hierarchicalFacets[position][attributeIndex].data,
            facetResults
          );
        } else {
          position = disjunctiveFacetsIndices[dfacet];

          var dataFromMainRequest = mainSubResponse.facets && mainSubResponse.facets[dfacet] || {};

          self.disjunctiveFacets[position] = {
            name: dfacet,
            data: defaultsPure({}, facetResults, dataFromMainRequest),
            exhaustive: result.exhaustiveFacetsCount
          };
          assignFacetStats(self.disjunctiveFacets[position], result.facets_stats, dfacet);

          if (state.disjunctiveFacetsRefinements[dfacet]) {
            state.disjunctiveFacetsRefinements[dfacet].forEach(function(refinementValue) {
              // add the disjunctive refinements if it is no more retrieved
              if (!self.disjunctiveFacets[position].data[refinementValue] &&
                state.disjunctiveFacetsRefinements[dfacet].indexOf(unescapeFacetValue$3(refinementValue)) > -1) {
                self.disjunctiveFacets[position].data[refinementValue] = 0;
              }
            });
          }
        }
      });
      nextDisjunctiveResult++;
    });

    // if we have some parent level values for hierarchical facets, merge them
    state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
      var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
      var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);

      var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
      // if we are already at a root refinement (or no refinement at all), there is no
      // root level values request
      if (currentRefinement.length === 0 || currentRefinement[0].split(separator).length < 2) {
        return;
      }

      results.slice(nextDisjunctiveResult).forEach(function(result) {
        var facets = result && result.facets
          ? result.facets
          : {};

        Object.keys(facets).forEach(function(dfacet) {
          var facetResults = facets[dfacet];
          var position = findIndex$1(state.hierarchicalFacets, function(f) {
            return f.name === hierarchicalFacet.name;
          });
          var attributeIndex = findIndex$1(self.hierarchicalFacets[position], function(f) {
            return f.attribute === dfacet;
          });

          // previous refinements and no results so not able to find it
          if (attributeIndex === -1) {
            return;
          }

          // when we always get root levels, if the hits refinement is `beers > IPA` (count: 5),
          // then the disjunctive values will be `beers` (count: 100),
          // but we do not want to display
          //   | beers (100)
          //     > IPA (5)
          // We want
          //   | beers (5)
          //     > IPA (5)
          var defaultData = {};

          if (currentRefinement.length > 0) {
            var root = currentRefinement[0].split(separator)[0];
            defaultData[root] = self.hierarchicalFacets[position][attributeIndex].data[root];
          }

          self.hierarchicalFacets[position][attributeIndex].data = defaultsPure(
            defaultData,
            facetResults,
            self.hierarchicalFacets[position][attributeIndex].data
          );
        });

        nextDisjunctiveResult++;
      });
    });

    // add the excludes
    Object.keys(state.facetsExcludes).forEach(function(facetName) {
      var excludes = state.facetsExcludes[facetName];
      var position = facetsIndices[facetName];

      self.facets[position] = {
        name: facetName,
        data: mainSubResponse.facets[facetName],
        exhaustive: mainSubResponse.exhaustiveFacetsCount
      };
      excludes.forEach(function(facetValue) {
        self.facets[position] = self.facets[position] || {name: facetName};
        self.facets[position].data = self.facets[position].data || {};
        self.facets[position].data[facetValue] = 0;
      });
    });

    /**
     * @type {Array}
     */
    this.hierarchicalFacets = this.hierarchicalFacets.map(generateHierarchicalTree_1(state));

    /**
     * @type {Array}
     */
    this.facets = compact(this.facets);
    /**
     * @type {Array}
     */
    this.disjunctiveFacets = compact(this.disjunctiveFacets);

    this._state = state;
  }

  /**
   * Get a facet object with its name
   * @deprecated
   * @param {string} name name of the faceted attribute
   * @return {SearchResults.Facet} the facet object
   */
  SearchResults.prototype.getFacetByName = function(name) {
    function predicate(facet) {
      return facet.name === name;
    }

    return find$1(this.facets, predicate) ||
      find$1(this.disjunctiveFacets, predicate) ||
      find$1(this.hierarchicalFacets, predicate);
  };

  /**
   * Get the facet values of a specified attribute from a SearchResults object.
   * @private
   * @param {SearchResults} results the search results to search in
   * @param {string} attribute name of the faceted attribute to search for
   * @return {array|object} facet values. For the hierarchical facets it is an object.
   */
  function extractNormalizedFacetValues(results, attribute) {
    function predicate(facet) {
      return facet.name === attribute;
    }

    if (results._state.isConjunctiveFacet(attribute)) {
      var facet = find$1(results.facets, predicate);
      if (!facet) return [];

      return Object.keys(facet.data).map(function(name) {
        var value = escapeFacetValue$3(name);
        return {
          name: name,
          escapedValue: value,
          count: facet.data[name],
          isRefined: results._state.isFacetRefined(attribute, value),
          isExcluded: results._state.isExcludeRefined(attribute, name)
        };
      });
    } else if (results._state.isDisjunctiveFacet(attribute)) {
      var disjunctiveFacet = find$1(results.disjunctiveFacets, predicate);
      if (!disjunctiveFacet) return [];

      return Object.keys(disjunctiveFacet.data).map(function(name) {
        var value = escapeFacetValue$3(name);
        return {
          name: name,
          escapedValue: value,
          count: disjunctiveFacet.data[name],
          isRefined: results._state.isDisjunctiveFacetRefined(attribute, value)
        };
      });
    } else if (results._state.isHierarchicalFacet(attribute)) {
      var hierarchicalFacetValues = find$1(results.hierarchicalFacets, predicate);
      if (!hierarchicalFacetValues) return hierarchicalFacetValues;

      var hierarchicalFacet = results._state.getHierarchicalFacetByName(attribute);
      var currentRefinementSplit = unescapeFacetValue$3(
        results._state.getHierarchicalRefinement(attribute)[0] || ''
      ).split(results._state._getHierarchicalFacetSeparator(hierarchicalFacet));
      currentRefinementSplit.unshift(attribute);

      setIsRefined(hierarchicalFacetValues, currentRefinementSplit, 0);

      return hierarchicalFacetValues;
    }
  }

  /**
   * Set the isRefined of a hierarchical facet result based on the current state.
   * @param {SearchResults.HierarchicalFacet} item Hierarchical facet to fix
   * @param {string[]} currentRefinementSplit array of parts of the current hierarchical refinement
   * @param {number} depth recursion depth in the currentRefinement
   */
  function setIsRefined(item, currentRefinement, depth) {
    item.isRefined = item.name === currentRefinement[depth];
    if (item.data) {
      item.data.forEach(function(child) {
        setIsRefined(child, currentRefinement, depth + 1);
      });
    }
  }

  /**
   * Sort nodes of a hierarchical or disjunctive facet results
   * @private
   * @param {function} sortFn
   * @param {HierarchicalFacet|Array} node node upon which we want to apply the sort
   * @param {string[]} names attribute names
   * @param {number} [level=0] current index in the names array
   */
  function recSort(sortFn, node, names, level) {
    level = level || 0;

    if (Array.isArray(node)) {
      return sortFn(node, names[level]);
    }

    if (!node.data || node.data.length === 0) {
      return node;
    }

    var children = node.data.map(function(childNode) {
      return recSort(sortFn, childNode, names, level + 1);
    });
    var sortedChildren = sortFn(children, names[level]);
    var newNode = defaultsPure({data: sortedChildren}, node);
    return newNode;
  }

  SearchResults.DEFAULT_SORT = ['isRefined:desc', 'count:desc', 'name:asc'];

  function vanillaSortFn(order, data) {
    return data.sort(order);
  }

  /**
   * @typedef FacetOrdering
   * @type {Object}
   * @property {string[]} [order]
   * @property {'count' | 'alpha' | 'hidden'} [sortRemainingBy]
   */

  /**
   * Sorts facet arrays via their facet ordering
   * @param {Array} facetValues the values
   * @param {FacetOrdering} facetOrdering the ordering
   * @returns {Array}
   */
  function sortViaFacetOrdering(facetValues, facetOrdering) {
    var orderedFacets = [];
    var remainingFacets = [];

    var order = facetOrdering.order || [];
    /**
     * an object with the keys being the values in order, the values their index:
     * ['one', 'two'] -> { one: 0, two: 1 }
     */
    var reverseOrder = order.reduce(function(acc, name, i) {
      acc[name] = i;
      return acc;
    }, {});

    facetValues.forEach(function(item) {
      // hierarchical facets get sorted using their raw name
      var name = item.path || item.name;
      if (reverseOrder[name] !== undefined) {
        orderedFacets[reverseOrder[name]] = item;
      } else {
        remainingFacets.push(item);
      }
    });

    orderedFacets = orderedFacets.filter(function(facet) {
      return facet;
    });

    var sortRemainingBy = facetOrdering.sortRemainingBy;
    var ordering;
    if (sortRemainingBy === 'hidden') {
      return orderedFacets;
    } else if (sortRemainingBy === 'alpha') {
      ordering = [['path', 'name'], ['asc', 'asc']];
    } else {
      ordering = [['count'], ['desc']];
    }

    return orderedFacets.concat(
      orderBy_1(remainingFacets, ordering[0], ordering[1])
    );
  }

  /**
   * @param {SearchResults} results the search results class
   * @param {string} attribute the attribute to retrieve ordering of
   * @returns {FacetOrdering=}
   */
  function getFacetOrdering(results, attribute) {
    return (
      results.renderingContent &&
      results.renderingContent.facetOrdering &&
      results.renderingContent.facetOrdering.values &&
      results.renderingContent.facetOrdering.values[attribute]
    );
  }

  /**
   * Get a the list of values for a given facet attribute. Those values are sorted
   * refinement first, descending count (bigger value on top), and name ascending
   * (alphabetical order). The sort formula can overridden using either string based
   * predicates or a function.
   *
   * This method will return all the values returned by the Algolia engine plus all
   * the values already refined. This means that it can happen that the
   * `maxValuesPerFacet` [configuration](https://www.algolia.com/doc/rest-api/search#param-maxValuesPerFacet)
   * might not be respected if you have facet values that are already refined.
   * @param {string} attribute attribute name
   * @param {object} opts configuration options.
   * @param {boolean} [opts.facetOrdering]
   * Force the use of facetOrdering from the result if a sortBy is present. If
   * sortBy isn't present, facetOrdering will be used automatically.
   * @param {Array.<string> | function} opts.sortBy
   * When using strings, it consists of
   * the name of the [FacetValue](#SearchResults.FacetValue) or the
   * [HierarchicalFacet](#SearchResults.HierarchicalFacet) attributes with the
   * order (`asc` or `desc`). For example to order the value by count, the
   * argument would be `['count:asc']`.
   *
   * If only the attribute name is specified, the ordering defaults to the one
   * specified in the default value for this attribute.
   *
   * When not specified, the order is
   * ascending.  This parameter can also be a function which takes two facet
   * values and should return a number, 0 if equal, 1 if the first argument is
   * bigger or -1 otherwise.
   *
   * The default value for this attribute `['isRefined:desc', 'count:desc', 'name:asc']`
   * @return {FacetValue[]|HierarchicalFacet|undefined} depending on the type of facet of
   * the attribute requested (hierarchical, disjunctive or conjunctive)
   * @example
   * helper.on('result', function(event){
   *   //get values ordered only by name ascending using the string predicate
   *   event.results.getFacetValues('city', {sortBy: ['name:asc']});
   *   //get values  ordered only by count ascending using a function
   *   event.results.getFacetValues('city', {
   *     // this is equivalent to ['count:asc']
   *     sortBy: function(a, b) {
   *       if (a.count === b.count) return 0;
   *       if (a.count > b.count)   return 1;
   *       if (b.count > a.count)   return -1;
   *     }
   *   });
   * });
   */
  SearchResults.prototype.getFacetValues = function(attribute, opts) {
    var facetValues = extractNormalizedFacetValues(this, attribute);
    if (!facetValues) {
      return undefined;
    }

    var options = defaultsPure({}, opts, {
      sortBy: SearchResults.DEFAULT_SORT,
      // if no sortBy is given, attempt to sort based on facetOrdering
      // if it is given, we still allow to sort via facet ordering first
      facetOrdering: !(opts && opts.sortBy)
    });

    var results = this;
    var attributes;
    if (Array.isArray(facetValues)) {
      attributes = [attribute];
    } else {
      var config = results._state.getHierarchicalFacetByName(facetValues.name);
      attributes = config.attributes;
    }

    return recSort(function(data, facetName) {
      if (options.facetOrdering) {
        var facetOrdering = getFacetOrdering(results, facetName);
        if (Boolean(facetOrdering)) {
          return sortViaFacetOrdering(data, facetOrdering);
        }
      }

      if (Array.isArray(options.sortBy)) {
        var order = formatSort(options.sortBy, SearchResults.DEFAULT_SORT);
        return orderBy_1(data, order[0], order[1]);
      } else if (typeof options.sortBy === 'function') {
        return vanillaSortFn(options.sortBy, data);
      }
      throw new Error(
        'options.sortBy is optional but if defined it must be ' +
          'either an array of string (predicates) or a sorting function'
      );
    }, facetValues, attributes);
  };

  /**
   * Returns the facet stats if attribute is defined and the facet contains some.
   * Otherwise returns undefined.
   * @param {string} attribute name of the faceted attribute
   * @return {object} The stats of the facet
   */
  SearchResults.prototype.getFacetStats = function(attribute) {
    if (this._state.isConjunctiveFacet(attribute)) {
      return getFacetStatsIfAvailable(this.facets, attribute);
    } else if (this._state.isDisjunctiveFacet(attribute)) {
      return getFacetStatsIfAvailable(this.disjunctiveFacets, attribute);
    }

    return undefined;
  };

  /**
   * @typedef {Object} FacetListItem
   * @property {string} name
   */

  /**
   * @param {FacetListItem[]} facetList (has more items, but enough for here)
   * @param {string} facetName
   */
  function getFacetStatsIfAvailable(facetList, facetName) {
    var data = find$1(facetList, function(facet) {
      return facet.name === facetName;
    });
    return data && data.stats;
  }

  /**
   * Returns all refinements for all filters + tags. It also provides
   * additional information: count and exhaustiveness for each filter.
   *
   * See the [refinement type](#Refinement) for an exhaustive view of the available
   * data.
   *
   * Note that for a numeric refinement, results are grouped per operator, this
   * means that it will return responses for operators which are empty.
   *
   * @return {Array.<Refinement>} all the refinements
   */
  SearchResults.prototype.getRefinements = function() {
    var state = this._state;
    var results = this;
    var res = [];

    Object.keys(state.facetsRefinements).forEach(function(attributeName) {
      state.facetsRefinements[attributeName].forEach(function(name) {
        res.push(getRefinement$1(state, 'facet', attributeName, name, results.facets));
      });
    });

    Object.keys(state.facetsExcludes).forEach(function(attributeName) {
      state.facetsExcludes[attributeName].forEach(function(name) {
        res.push(getRefinement$1(state, 'exclude', attributeName, name, results.facets));
      });
    });

    Object.keys(state.disjunctiveFacetsRefinements).forEach(function(attributeName) {
      state.disjunctiveFacetsRefinements[attributeName].forEach(function(name) {
        res.push(getRefinement$1(state, 'disjunctive', attributeName, name, results.disjunctiveFacets));
      });
    });

    Object.keys(state.hierarchicalFacetsRefinements).forEach(function(attributeName) {
      state.hierarchicalFacetsRefinements[attributeName].forEach(function(name) {
        res.push(getHierarchicalRefinement(state, attributeName, name, results.hierarchicalFacets));
      });
    });


    Object.keys(state.numericRefinements).forEach(function(attributeName) {
      var operators = state.numericRefinements[attributeName];
      Object.keys(operators).forEach(function(operator) {
        operators[operator].forEach(function(value) {
          res.push({
            type: 'numeric',
            attributeName: attributeName,
            name: value,
            numericValue: value,
            operator: operator
          });
        });
      });
    });

    state.tagRefinements.forEach(function(name) {
      res.push({type: 'tag', attributeName: '_tags', name: name});
    });

    return res;
  };

  /**
   * @typedef {Object} Facet
   * @property {string} name
   * @property {Object} data
   * @property {boolean} exhaustive
   */

  /**
   * @param {*} state
   * @param {*} type
   * @param {string} attributeName
   * @param {*} name
   * @param {Facet[]} resultsFacets
   */
  function getRefinement$1(state, type, attributeName, name, resultsFacets) {
    var facet = find$1(resultsFacets, function(f) {
      return f.name === attributeName;
    });
    var count = facet && facet.data && facet.data[name] ? facet.data[name] : 0;
    var exhaustive = (facet && facet.exhaustive) || false;

    return {
      type: type,
      attributeName: attributeName,
      name: name,
      count: count,
      exhaustive: exhaustive
    };
  }

  /**
   * @param {*} state
   * @param {string} attributeName
   * @param {*} name
   * @param {Facet[]} resultsFacets
   */
  function getHierarchicalRefinement(state, attributeName, name, resultsFacets) {
    var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
    var separator = state._getHierarchicalFacetSeparator(facetDeclaration);
    var split = name.split(separator);
    var rootFacet = find$1(resultsFacets, function(facet) {
      return facet.name === attributeName;
    });

    var facet = split.reduce(function(intermediateFacet, part) {
      var newFacet =
        intermediateFacet && find$1(intermediateFacet.data, function(f) {
          return f.name === part;
        });
      return newFacet !== undefined ? newFacet : intermediateFacet;
    }, rootFacet);

    var count = (facet && facet.count) || 0;
    var exhaustive = (facet && facet.exhaustive) || false;
    var path = (facet && facet.path) || '';

    return {
      type: 'hierarchical',
      attributeName: attributeName,
      name: path,
      count: count,
      exhaustive: exhaustive
    };
  }

  var SearchResults_1 = SearchResults;

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || undefined;
  }
  var events = EventEmitter;

  // Backwards-compat with node 0.10.x
  // EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function(n) {
    if (!isNumber(n) || n < 0 || isNaN(n))
      throw TypeError('n must be a positive number');
    this._maxListeners = n;
    return this;
  };

  EventEmitter.prototype.emit = function(type) {
    var er, handler, len, args, i, listeners;

    if (!this._events)
      this._events = {};

    // If there is no 'error' event listener then throw.
    if (type === 'error') {
      if (!this._events.error ||
          (isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          // At least give some kind of context to the user
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }
      }
    }

    handler = this._events[type];

    if (isUndefined(handler))
      return false;

    if (isFunction(handler)) {
      switch (arguments.length) {
        // fast cases
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        // slower
        default:
          args = Array.prototype.slice.call(arguments, 1);
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      args = Array.prototype.slice.call(arguments, 1);
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }

    return true;
  };

  EventEmitter.prototype.addListener = function(type, listener) {
    var m;

    if (!isFunction(listener))
      throw TypeError('listener must be a function');

    if (!this._events)
      this._events = {};

    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (this._events.newListener)
      this.emit('newListener', type,
                isFunction(listener.listener) ?
                listener.listener : listener);

    if (!this._events[type])
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    else if (isObject(this._events[type]))
      // If we've already got an array, just append.
      this._events[type].push(listener);
    else
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];

    // Check for listener leak
    if (isObject(this._events[type]) && !this._events[type].warned) {
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        if (typeof console.trace === 'function') {
          // not supported in IE 10
          console.trace();
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.once = function(type, listener) {
    if (!isFunction(listener))
      throw TypeError('listener must be a function');

    var fired = false;

    function g() {
      this.removeListener(type, g);

      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }

    g.listener = listener;
    this.on(type, g);

    return this;
  };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener = function(type, listener) {
    var list, position, length, i;

    if (!isFunction(listener))
      throw TypeError('listener must be a function');

    if (!this._events || !this._events[type])
      return this;

    list = this._events[type];
    length = list.length;
    position = -1;

    if (list === listener ||
        (isFunction(list.listener) && list.listener === listener)) {
      delete this._events[type];
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);

    } else if (isObject(list)) {
      for (i = length; i-- > 0;) {
        if (list[i] === listener ||
            (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }

      if (position < 0)
        return this;

      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }

      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function(type) {
    var key, listeners;

    if (!this._events)
      return this;

    // not listening for removeListener, no need to emit
    if (!this._events.removeListener) {
      if (arguments.length === 0)
        this._events = {};
      else if (this._events[type])
        delete this._events[type];
      return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = {};
      return this;
    }

    listeners = this._events[type];

    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      while (listeners.length)
        this.removeListener(type, listeners[listeners.length - 1]);
    }
    delete this._events[type];

    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    var ret;
    if (!this._events || !this._events[type])
      ret = [];
    else if (isFunction(this._events[type]))
      ret = [this._events[type]];
    else
      ret = this._events[type].slice();
    return ret;
  };

  EventEmitter.prototype.listenerCount = function(type) {
    if (this._events) {
      var evlistener = this._events[type];

      if (isFunction(evlistener))
        return 1;
      else if (evlistener)
        return evlistener.length;
    }
    return 0;
  };

  EventEmitter.listenerCount = function(emitter, type) {
    return emitter.listenerCount(type);
  };

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  function isUndefined(arg) {
    return arg === void 0;
  }

  function inherits(ctor, superCtor) {
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }

  var inherits_1 = inherits;

  /**
   * A DerivedHelper is a way to create sub requests to
   * Algolia from a main helper.
   * @class
   * @classdesc The DerivedHelper provides an event based interface for search callbacks:
   *  - search: when a search is triggered using the `search()` method.
   *  - result: when the response is retrieved from Algolia and is processed.
   *    This event contains a {@link SearchResults} object and the
   *    {@link SearchParameters} corresponding to this answer.
   */
  function DerivedHelper(mainHelper, fn) {
    this.main = mainHelper;
    this.fn = fn;
    this.lastResults = null;
  }

  inherits_1(DerivedHelper, events);

  /**
   * Detach this helper from the main helper
   * @return {undefined}
   * @throws Error if the derived helper is already detached
   */
  DerivedHelper.prototype.detach = function() {
    this.removeAllListeners();
    this.main.detachDerivedHelper(this);
  };

  DerivedHelper.prototype.getModifiedState = function(parameters) {
    return this.fn(parameters);
  };

  var DerivedHelper_1 = DerivedHelper;

  function sortObject(obj) {
    return Object.keys(obj)
      .sort(function(a, b) {
        return a.localeCompare(b);
      })
      .reduce(function(acc, curr) {
        acc[curr] = obj[curr];
        return acc;
      }, {});
  }

  var requestBuilder = {
    /**
     * Get all the queries to send to the client, those queries can used directly
     * with the Algolia client.
     * @private
     * @return {object[]} The queries
     */
    _getQueries: function getQueries(index, state) {
      var queries = [];

      // One query for the hits
      queries.push({
        indexName: index,
        params: requestBuilder._getHitsSearchParams(state)
      });

      // One for each disjunctive facets
      state.getRefinedDisjunctiveFacets().forEach(function(refinedFacet) {
        queries.push({
          indexName: index,
          params: requestBuilder._getDisjunctiveFacetSearchParams(state, refinedFacet)
        });
      });

      // More to get the parent levels of the hierarchical facets when refined
      state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
        var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
        var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);

        // If we are deeper than level 0 (starting from `beer > IPA`)
        // we want to get all parent values
        if (currentRefinement.length > 0 && currentRefinement[0].split(separator).length > 1) {
          // We generate a map of the filters we will use for our facet values queries
          var filtersMap = currentRefinement[0].split(separator).slice(0, -1).reduce(
            function createFiltersMap(map, segment, level) {
              return map.concat({
                attribute: hierarchicalFacet.attributes[level],
                value: level === 0
                  ? segment
                  : [map[map.length - 1].value, segment].join(separator)
              });
            }
          , []);

          filtersMap.forEach(function(filter, level) {
            var params = requestBuilder._getDisjunctiveFacetSearchParams(
              state,
              filter.attribute,
              level === 0
            );

            // Keep facet filters unrelated to current hierarchical attributes
            function hasHierarchicalFacetFilter(value) {
              return hierarchicalFacet.attributes.some(function(attribute) {
                return attribute === value.split(':')[0];
              });
            }

            var filteredFacetFilters = (params.facetFilters || []).reduce(function(acc, facetFilter) {
              if (Array.isArray(facetFilter)) {
                var filtered = facetFilter.filter(function(filterValue) {
                  return !hasHierarchicalFacetFilter(filterValue);
                });

                if (filtered.length > 0) {
                  acc.push(filtered);
                }
              }

              if (typeof facetFilter === 'string' && !hasHierarchicalFacetFilter(facetFilter)) {
                acc.push(facetFilter);
              }

              return acc;
            }, []);

            var parent = filtersMap[level - 1];
            if (level > 0) {
              params.facetFilters = filteredFacetFilters.concat(parent.attribute + ':' + parent.value);
            } else {
              params.facetFilters = filteredFacetFilters.length > 0 ? filteredFacetFilters : undefined;
            }

            queries.push({indexName: index, params: params});
          });
        }
      });

      return queries;
    },

    /**
     * Build search parameters used to fetch hits
     * @private
     * @return {object.<string, any>}
     */
    _getHitsSearchParams: function(state) {
      var facets = state.facets
        .concat(state.disjunctiveFacets)
        .concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state));


      var facetFilters = requestBuilder._getFacetFilters(state);
      var numericFilters = requestBuilder._getNumericFilters(state);
      var tagFilters = requestBuilder._getTagFilters(state);
      var additionalParams = {
        facets: facets.indexOf('*') > -1 ? ['*'] : facets,
        tagFilters: tagFilters
      };

      if (facetFilters.length > 0) {
        additionalParams.facetFilters = facetFilters;
      }

      if (numericFilters.length > 0) {
        additionalParams.numericFilters = numericFilters;
      }

      return sortObject(merge_1({}, state.getQueryParams(), additionalParams));
    },

    /**
     * Build search parameters used to fetch a disjunctive facet
     * @private
     * @param  {string} facet the associated facet name
     * @param  {boolean} hierarchicalRootLevel ?? FIXME
     * @return {object}
     */
    _getDisjunctiveFacetSearchParams: function(state, facet, hierarchicalRootLevel) {
      var facetFilters = requestBuilder._getFacetFilters(state, facet, hierarchicalRootLevel);
      var numericFilters = requestBuilder._getNumericFilters(state, facet);
      var tagFilters = requestBuilder._getTagFilters(state);
      var additionalParams = {
        hitsPerPage: 0,
        page: 0,
        analytics: false,
        clickAnalytics: false
      };

      if (tagFilters.length > 0) {
        additionalParams.tagFilters = tagFilters;
      }

      var hierarchicalFacet = state.getHierarchicalFacetByName(facet);

      if (hierarchicalFacet) {
        additionalParams.facets = requestBuilder._getDisjunctiveHierarchicalFacetAttribute(
          state,
          hierarchicalFacet,
          hierarchicalRootLevel
        );
      } else {
        additionalParams.facets = facet;
      }

      if (numericFilters.length > 0) {
        additionalParams.numericFilters = numericFilters;
      }

      if (facetFilters.length > 0) {
        additionalParams.facetFilters = facetFilters;
      }

      return sortObject(merge_1({}, state.getQueryParams(), additionalParams));
    },

    /**
     * Return the numeric filters in an algolia request fashion
     * @private
     * @param {string} [facetName] the name of the attribute for which the filters should be excluded
     * @return {string[]} the numeric filters in the algolia format
     */
    _getNumericFilters: function(state, facetName) {
      if (state.numericFilters) {
        return state.numericFilters;
      }

      var numericFilters = [];

      Object.keys(state.numericRefinements).forEach(function(attribute) {
        var operators = state.numericRefinements[attribute] || {};
        Object.keys(operators).forEach(function(operator) {
          var values = operators[operator] || [];
          if (facetName !== attribute) {
            values.forEach(function(value) {
              if (Array.isArray(value)) {
                var vs = value.map(function(v) {
                  return attribute + operator + v;
                });
                numericFilters.push(vs);
              } else {
                numericFilters.push(attribute + operator + value);
              }
            });
          }
        });
      });

      return numericFilters;
    },

    /**
     * Return the tags filters depending
     * @private
     * @return {string}
     */
    _getTagFilters: function(state) {
      if (state.tagFilters) {
        return state.tagFilters;
      }

      return state.tagRefinements.join(',');
    },


    /**
     * Build facetFilters parameter based on current refinements. The array returned
     * contains strings representing the facet filters in the algolia format.
     * @private
     * @param  {string} [facet] if set, the current disjunctive facet
     * @return {array.<string>}
     */
    _getFacetFilters: function(state, facet, hierarchicalRootLevel) {
      var facetFilters = [];

      var facetsRefinements = state.facetsRefinements || {};
      Object.keys(facetsRefinements).forEach(function(facetName) {
        var facetValues = facetsRefinements[facetName] || [];
        facetValues.forEach(function(facetValue) {
          facetFilters.push(facetName + ':' + facetValue);
        });
      });

      var facetsExcludes = state.facetsExcludes || {};
      Object.keys(facetsExcludes).forEach(function(facetName) {
        var facetValues = facetsExcludes[facetName] || [];
        facetValues.forEach(function(facetValue) {
          facetFilters.push(facetName + ':-' + facetValue);
        });
      });

      var disjunctiveFacetsRefinements = state.disjunctiveFacetsRefinements || {};
      Object.keys(disjunctiveFacetsRefinements).forEach(function(facetName) {
        var facetValues = disjunctiveFacetsRefinements[facetName] || [];
        if (facetName === facet || !facetValues || facetValues.length === 0) {
          return;
        }
        var orFilters = [];

        facetValues.forEach(function(facetValue) {
          orFilters.push(facetName + ':' + facetValue);
        });

        facetFilters.push(orFilters);
      });

      var hierarchicalFacetsRefinements = state.hierarchicalFacetsRefinements || {};
      Object.keys(hierarchicalFacetsRefinements).forEach(function(facetName) {
        var facetValues = hierarchicalFacetsRefinements[facetName] || [];
        var facetValue = facetValues[0];

        if (facetValue === undefined) {
          return;
        }

        var hierarchicalFacet = state.getHierarchicalFacetByName(facetName);
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
        var attributeToRefine;
        var attributesIndex;

        // we ask for parent facet values only when the `facet` is the current hierarchical facet
        if (facet === facetName) {
          // if we are at the root level already, no need to ask for facet values, we get them from
          // the hits query
          if (facetValue.indexOf(separator) === -1 || (!rootPath && hierarchicalRootLevel === true) ||
            (rootPath && rootPath.split(separator).length === facetValue.split(separator).length)) {
            return;
          }

          if (!rootPath) {
            attributesIndex = facetValue.split(separator).length - 2;
            facetValue = facetValue.slice(0, facetValue.lastIndexOf(separator));
          } else {
            attributesIndex = rootPath.split(separator).length - 1;
            facetValue = rootPath;
          }

          attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
        } else {
          attributesIndex = facetValue.split(separator).length - 1;

          attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
        }

        if (attributeToRefine) {
          facetFilters.push([attributeToRefine + ':' + facetValue]);
        }
      });

      return facetFilters;
    },

    _getHitsHierarchicalFacetsAttributes: function(state) {
      var out = [];

      return state.hierarchicalFacets.reduce(
        // ask for as much levels as there's hierarchical refinements
        function getHitsAttributesForHierarchicalFacet(allAttributes, hierarchicalFacet) {
          var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0];

          // if no refinement, ask for root level
          if (!hierarchicalRefinement) {
            allAttributes.push(hierarchicalFacet.attributes[0]);
            return allAttributes;
          }

          var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
          var level = hierarchicalRefinement.split(separator).length;
          var newAttributes = hierarchicalFacet.attributes.slice(0, level + 1);

          return allAttributes.concat(newAttributes);
        }, out);
    },

    _getDisjunctiveHierarchicalFacetAttribute: function(state, hierarchicalFacet, rootLevel) {
      var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
      if (rootLevel === true) {
        var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
        var attributeIndex = 0;

        if (rootPath) {
          attributeIndex = rootPath.split(separator).length;
        }
        return [hierarchicalFacet.attributes[attributeIndex]];
      }

      var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0] || '';
      // if refinement is 'beers > IPA > Flying dog',
      // then we want `facets: ['beers > IPA']` as disjunctive facet (parent level values)

      var parentLevel = hierarchicalRefinement.split(separator).length - 1;
      return hierarchicalFacet.attributes.slice(0, parentLevel + 1);
    },

    getSearchForFacetQuery: function(facetName, query, maxFacetHits, state) {
      var stateForSearchForFacetValues = state.isDisjunctiveFacet(facetName) ?
        state.clearRefinements(facetName) :
        state;
      var searchForFacetSearchParameters = {
        facetQuery: query,
        facetName: facetName
      };
      if (typeof maxFacetHits === 'number') {
        searchForFacetSearchParameters.maxFacetHits = maxFacetHits;
      }
      return sortObject(merge_1(
        {},
        requestBuilder._getHitsSearchParams(stateForSearchForFacetValues),
        searchForFacetSearchParameters
      ));
    }
  };

  var requestBuilder_1 = requestBuilder;

  var version = '3.11.3';

  var escapeFacetValue$4 = escapeFacetValue_1.escapeFacetValue;

  /**
   * Event triggered when a parameter is set or updated
   * @event AlgoliaSearchHelper#event:change
   * @property {object} event
   * @property {SearchParameters} event.state the current parameters with the latest changes applied
   * @property {SearchResults} event.results the previous results received from Algolia. `null` before the first request
   * @example
   * helper.on('change', function(event) {
   *   console.log('The parameters have changed');
   * });
   */

  /**
   * Event triggered when a main search is sent to Algolia
   * @event AlgoliaSearchHelper#event:search
   * @property {object} event
   * @property {SearchParameters} event.state the parameters used for this search
   * @property {SearchResults} event.results the results from the previous search. `null` if it is the first search.
   * @example
   * helper.on('search', function(event) {
   *   console.log('Search sent');
   * });
   */

  /**
   * Event triggered when a search using `searchForFacetValues` is sent to Algolia
   * @event AlgoliaSearchHelper#event:searchForFacetValues
   * @property {object} event
   * @property {SearchParameters} event.state the parameters used for this search it is the first search.
   * @property {string} event.facet the facet searched into
   * @property {string} event.query the query used to search in the facets
   * @example
   * helper.on('searchForFacetValues', function(event) {
   *   console.log('searchForFacetValues sent');
   * });
   */

  /**
   * Event triggered when a search using `searchOnce` is sent to Algolia
   * @event AlgoliaSearchHelper#event:searchOnce
   * @property {object} event
   * @property {SearchParameters} event.state the parameters used for this search it is the first search.
   * @example
   * helper.on('searchOnce', function(event) {
   *   console.log('searchOnce sent');
   * });
   */

  /**
   * Event triggered when the results are retrieved from Algolia
   * @event AlgoliaSearchHelper#event:result
   * @property {object} event
   * @property {SearchResults} event.results the results received from Algolia
   * @property {SearchParameters} event.state the parameters used to query Algolia. Those might be different from the one in the helper instance (for example if the network is unreliable).
   * @example
   * helper.on('result', function(event) {
   *   console.log('Search results received');
   * });
   */

  /**
   * Event triggered when Algolia sends back an error. For example, if an unknown parameter is
   * used, the error can be caught using this event.
   * @event AlgoliaSearchHelper#event:error
   * @property {object} event
   * @property {Error} event.error the error returned by the Algolia.
   * @example
   * helper.on('error', function(event) {
   *   console.log('Houston we got a problem.');
   * });
   */

  /**
   * Event triggered when the queue of queries have been depleted (with any result or outdated queries)
   * @event AlgoliaSearchHelper#event:searchQueueEmpty
   * @example
   * helper.on('searchQueueEmpty', function() {
   *   console.log('No more search pending');
   *   // This is received before the result event if we're not expecting new results
   * });
   *
   * helper.search();
   */

  /**
   * Initialize a new AlgoliaSearchHelper
   * @class
   * @classdesc The AlgoliaSearchHelper is a class that ease the management of the
   * search. It provides an event based interface for search callbacks:
   *  - change: when the internal search state is changed.
   *    This event contains a {@link SearchParameters} object and the
   *    {@link SearchResults} of the last result if any.
   *  - search: when a search is triggered using the `search()` method.
   *  - result: when the response is retrieved from Algolia and is processed.
   *    This event contains a {@link SearchResults} object and the
   *    {@link SearchParameters} corresponding to this answer.
   *  - error: when the response is an error. This event contains the error returned by the server.
   * @param  {AlgoliaSearch} client an AlgoliaSearch client
   * @param  {string} index the index name to query
   * @param  {SearchParameters | object} options an object defining the initial
   * config of the search. It doesn't have to be a {SearchParameters},
   * just an object containing the properties you need from it.
   */
  function AlgoliaSearchHelper(client, index, options) {
    if (typeof client.addAlgoliaAgent === 'function') {
      client.addAlgoliaAgent('JS Helper (' + version + ')');
    }

    this.setClient(client);
    var opts = options || {};
    opts.index = index;
    this.state = SearchParameters_1.make(opts);
    this.lastResults = null;
    this._queryId = 0;
    this._lastQueryIdReceived = -1;
    this.derivedHelpers = [];
    this._currentNbQueries = 0;
  }

  inherits_1(AlgoliaSearchHelper, events);

  /**
   * Start the search with the parameters set in the state. When the
   * method is called, it triggers a `search` event. The results will
   * be available through the `result` event. If an error occurs, an
   * `error` will be fired instead.
   * @return {AlgoliaSearchHelper}
   * @fires search
   * @fires result
   * @fires error
   * @chainable
   */
  AlgoliaSearchHelper.prototype.search = function() {
    this._search({onlyWithDerivedHelpers: false});
    return this;
  };

  AlgoliaSearchHelper.prototype.searchOnlyWithDerivedHelpers = function() {
    this._search({onlyWithDerivedHelpers: true});
    return this;
  };

  /**
   * Gets the search query parameters that would be sent to the Algolia Client
   * for the hits
   * @return {object} Query Parameters
   */
  AlgoliaSearchHelper.prototype.getQuery = function() {
    var state = this.state;
    return requestBuilder_1._getHitsSearchParams(state);
  };

  /**
   * Start a search using a modified version of the current state. This method does
   * not trigger the helper lifecycle and does not modify the state kept internally
   * by the helper. This second aspect means that the next search call will be the
   * same as a search call before calling searchOnce.
   * @param {object} options can contain all the parameters that can be set to SearchParameters
   * plus the index
   * @param {function} [callback] optional callback executed when the response from the
   * server is back.
   * @return {promise|undefined} if a callback is passed the method returns undefined
   * otherwise it returns a promise containing an object with two keys :
   *  - content with a SearchResults
   *  - state with the state used for the query as a SearchParameters
   * @example
   * // Changing the number of records returned per page to 1
   * // This example uses the callback API
   * var state = helper.searchOnce({hitsPerPage: 1},
   *   function(error, content, state) {
   *     // if an error occurred it will be passed in error, otherwise its value is null
   *     // content contains the results formatted as a SearchResults
   *     // state is the instance of SearchParameters used for this search
   *   });
   * @example
   * // Changing the number of records returned per page to 1
   * // This example uses the promise API
   * var state1 = helper.searchOnce({hitsPerPage: 1})
   *                 .then(promiseHandler);
   *
   * function promiseHandler(res) {
   *   // res contains
   *   // {
   *   //   content : SearchResults
   *   //   state   : SearchParameters (the one used for this specific search)
   *   // }
   * }
   */
  AlgoliaSearchHelper.prototype.searchOnce = function(options, cb) {
    var tempState = !options ? this.state : this.state.setQueryParameters(options);
    var queries = requestBuilder_1._getQueries(tempState.index, tempState);
    var self = this;

    this._currentNbQueries++;

    this.emit('searchOnce', {
      state: tempState
    });

    if (cb) {
      this.client
        .search(queries)
        .then(function(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit('searchQueueEmpty');
          }

          cb(null, new SearchResults_1(tempState, content.results), tempState);
        })
        .catch(function(err) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit('searchQueueEmpty');
          }

          cb(err, null, tempState);
        });

      return undefined;
    }

    return this.client.search(queries).then(function(content) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
      return {
        content: new SearchResults_1(tempState, content.results),
        state: tempState,
        _originalResponse: content
      };
    }, function(e) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
      throw e;
    });
  };

   /**
   * Start the search for answers with the parameters set in the state.
   * This method returns a promise.
   * @param {Object} options - the options for answers API call
   * @param {string[]} options.attributesForPrediction - Attributes to use for predictions. If empty, `searchableAttributes` is used instead.
   * @param {string[]} options.queryLanguages - The languages in the query. Currently only supports ['en'].
   * @param {number} options.nbHits - Maximum number of answers to retrieve from the Answers Engine. Cannot be greater than 1000.
   *
   * @return {promise} the answer results
   * @deprecated answers is deprecated and will be replaced with new initiatives
   */
  AlgoliaSearchHelper.prototype.findAnswers = function(options) {
    console.warn('[algoliasearch-helper] answers is no longer supported');
    var state = this.state;
    var derivedHelper = this.derivedHelpers[0];
    if (!derivedHelper) {
      return Promise.resolve([]);
    }
    var derivedState = derivedHelper.getModifiedState(state);
    var data = merge_1(
      {
        attributesForPrediction: options.attributesForPrediction,
        nbHits: options.nbHits
      },
      {
        params: omit$1(requestBuilder_1._getHitsSearchParams(derivedState), [
          'attributesToSnippet',
          'hitsPerPage',
          'restrictSearchableAttributes',
          'snippetEllipsisText' // FIXME remove this line once the engine is fixed.
        ])
      }
    );

    var errorMessage = 'search for answers was called, but this client does not have a function client.initIndex(index).findAnswers';
    if (typeof this.client.initIndex !== 'function') {
      throw new Error(errorMessage);
    }
    var index = this.client.initIndex(derivedState.index);
    if (typeof index.findAnswers !== 'function') {
      throw new Error(errorMessage);
    }
    return index.findAnswers(derivedState.query, options.queryLanguages, data);
  };

  /**
   * Structure of each result when using
   * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
   * @typedef FacetSearchHit
   * @type {object}
   * @property {string} value the facet value
   * @property {string} highlighted the facet value highlighted with the query string
   * @property {number} count number of occurrence of this facet value
   * @property {boolean} isRefined true if the value is already refined
   */

  /**
   * Structure of the data resolved by the
   * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
   * promise.
   * @typedef FacetSearchResult
   * @type {object}
   * @property {FacetSearchHit} facetHits the results for this search for facet values
   * @property {number} processingTimeMS time taken by the query inside the engine
   */

  /**
   * Search for facet values based on an query and the name of a faceted attribute. This
   * triggers a search and will return a promise. On top of using the query, it also sends
   * the parameters from the state so that the search is narrowed down to only the possible values.
   *
   * See the description of [FacetSearchResult](reference.html#FacetSearchResult)
   * @param {string} facet the name of the faceted attribute
   * @param {string} query the string query for the search
   * @param {number} [maxFacetHits] the maximum number values returned. Should be > 0 and <= 100
   * @param {object} [userState] the set of custom parameters to use on top of the current state. Setting a property to `undefined` removes
   * it in the generated query.
   * @return {promise.<FacetSearchResult>} the results of the search
   */
  AlgoliaSearchHelper.prototype.searchForFacetValues = function(facet, query, maxFacetHits, userState) {
    var clientHasSFFV = typeof this.client.searchForFacetValues === 'function';
    var clientHasInitIndex = typeof this.client.initIndex === 'function';
    if (
      !clientHasSFFV &&
      !clientHasInitIndex &&
      typeof this.client.search !== 'function'
    ) {
      throw new Error(
        'search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues'
      );
    }

    var state = this.state.setQueryParameters(userState || {});
    var isDisjunctive = state.isDisjunctiveFacet(facet);
    var algoliaQuery = requestBuilder_1.getSearchForFacetQuery(facet, query, maxFacetHits, state);

    this._currentNbQueries++;
    var self = this;
    var searchForFacetValuesPromise;
    // newer algoliasearch ^3.27.1 - ~4.0.0
    if (clientHasSFFV) {
      searchForFacetValuesPromise = this.client.searchForFacetValues([
        {indexName: state.index, params: algoliaQuery}
      ]);
      // algoliasearch < 3.27.1
    } else if (clientHasInitIndex) {
      searchForFacetValuesPromise = this.client
        .initIndex(state.index)
        .searchForFacetValues(algoliaQuery);
      // algoliasearch ~5.0.0
    } else {
      // @MAJOR only use client.search
      delete algoliaQuery.facetName;
      searchForFacetValuesPromise = this.client
        .search([
          {
            type: 'facet',
            facet: facet,
            indexName: state.index,
            params: algoliaQuery
          }
        ])
        .then(function processResponse(response) {
          return response.results[0];
        });
    }

    this.emit('searchForFacetValues', {
      state: state,
      facet: facet,
      query: query
    });

    return searchForFacetValuesPromise.then(function addIsRefined(content) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');

      content = Array.isArray(content) ? content[0] : content;

      content.facetHits.forEach(function(f) {
        f.escapedValue = escapeFacetValue$4(f.value);
        f.isRefined = isDisjunctive
          ? state.isDisjunctiveFacetRefined(facet, f.escapedValue)
          : state.isFacetRefined(facet, f.escapedValue);
      });

      return content;
    }, function(e) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
      throw e;
    });
  };

  /**
   * Sets the text query used for the search.
   *
   * This method resets the current page to 0.
   * @param  {string} q the user query
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setQuery = function(q) {
    this._change({
      state: this.state.resetPage().setQuery(q),
      isPageReset: true
    });

    return this;
  };

  /**
   * Remove all the types of refinements except tags. A string can be provided to remove
   * only the refinements of a specific attribute. For more advanced use case, you can
   * provide a function instead. This function should follow the
   * [clearCallback definition](#SearchParameters.clearCallback).
   *
   * This method resets the current page to 0.
   * @param {string} [name] optional name of the facet / attribute on which we want to remove all refinements
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   * @example
   * // Removing all the refinements
   * helper.clearRefinements().search();
   * @example
   * // Removing all the filters on a the category attribute.
   * helper.clearRefinements('category').search();
   * @example
   * // Removing only the exclude filters on the category facet.
   * helper.clearRefinements(function(value, attribute, type) {
   *   return type === 'exclude' && attribute === 'category';
   * }).search();
   */
  AlgoliaSearchHelper.prototype.clearRefinements = function(name) {
    this._change({
      state: this.state.resetPage().clearRefinements(name),
      isPageReset: true
    });

    return this;
  };

  /**
   * Remove all the tag filters.
   *
   * This method resets the current page to 0.
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.clearTags = function() {
    this._change({
      state: this.state.resetPage().clearTags(),
      isPageReset: true
    });

    return this;
  };

  /**
   * Adds a disjunctive filter to a faceted attribute with the `value` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value (will be converted to string)
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addDisjunctiveFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().addDisjunctiveFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addDisjunctiveFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function() {
    return this.addDisjunctiveFacetRefinement.apply(this, arguments);
  };

  /**
   * Adds a refinement on a hierarchical facet. It will throw
   * an exception if the facet is not defined or if the facet
   * is already refined.
   *
   * This method resets the current page to 0.
   * @param {string} facet the facet name
   * @param {string} path the hierarchical facet path
   * @return {AlgoliaSearchHelper}
   * @throws Error if the facet is not defined or if the facet is refined
   * @chainable
   * @fires change
   */
  AlgoliaSearchHelper.prototype.addHierarchicalFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().addHierarchicalFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * Adds a an numeric filter to an attribute with the `operator` and `value` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param  {string} attribute the attribute on which the numeric filter applies
   * @param  {string} operator the operator of the filter
   * @param  {number} value the value of the filter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addNumericRefinement = function(attribute, operator, value) {
    this._change({
      state: this.state.resetPage().addNumericRefinement(attribute, operator, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * Adds a filter to a faceted attribute with the `value` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value (will be converted to string)
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().addFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.addRefine = function() {
    return this.addFacetRefinement.apply(this, arguments);
  };


  /**
   * Adds a an exclusion filter to a faceted attribute with the `value` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value (will be converted to string)
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addFacetExclusion = function(facet, value) {
    this._change({
      state: this.state.resetPage().addExcludeRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetExclusion}
   */
  AlgoliaSearchHelper.prototype.addExclude = function() {
    return this.addFacetExclusion.apply(this, arguments);
  };

  /**
   * Adds a tag filter with the `tag` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param {string} tag the tag to add to the filter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addTag = function(tag) {
    this._change({
      state: this.state.resetPage().addTagRefinement(tag),
      isPageReset: true
    });

    return this;
  };

  /**
   * Removes an numeric filter to an attribute with the `operator` and `value` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * Some parameters are optional, triggering different behavior:
   *  - if the value is not provided, then all the numeric value will be removed for the
   *  specified attribute/operator couple.
   *  - if the operator is not provided either, then all the numeric filter on this attribute
   *  will be removed.
   *
   * This method resets the current page to 0.
   * @param  {string} attribute the attribute on which the numeric filter applies
   * @param  {string} [operator] the operator of the filter
   * @param  {number} [value] the value of the filter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeNumericRefinement = function(attribute, operator, value) {
    this._change({
      state: this.state.resetPage().removeNumericRefinement(attribute, operator, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * Removes a disjunctive filter to a faceted attribute with the `value` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * If the value is omitted, then this method will remove all the filters for the
   * attribute.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} [value] the associated value
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeDisjunctiveFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().removeDisjunctiveFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeDisjunctiveFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function() {
    return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
  };

  /**
   * Removes the refinement set on a hierarchical facet.
   * @param {string} facet the facet name
   * @return {AlgoliaSearchHelper}
   * @throws Error if the facet is not defined or if the facet is not refined
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeHierarchicalFacetRefinement = function(facet) {
    this._change({
      state: this.state.resetPage().removeHierarchicalFacetRefinement(facet),
      isPageReset: true
    });

    return this;
  };

  /**
   * Removes a filter to a faceted attribute with the `value` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * If the value is omitted, then this method will remove all the filters for the
   * attribute.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} [value] the associated value
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().removeFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.removeRefine = function() {
    return this.removeFacetRefinement.apply(this, arguments);
  };

  /**
   * Removes an exclusion filter to a faceted attribute with the `value` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * If the value is omitted, then this method will remove all the filters for the
   * attribute.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} [value] the associated value
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeFacetExclusion = function(facet, value) {
    this._change({
      state: this.state.resetPage().removeExcludeRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetExclusion}
   */
  AlgoliaSearchHelper.prototype.removeExclude = function() {
    return this.removeFacetExclusion.apply(this, arguments);
  };

  /**
   * Removes a tag filter with the `tag` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param {string} tag tag to remove from the filter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeTag = function(tag) {
    this._change({
      state: this.state.resetPage().removeTagRefinement(tag),
      isPageReset: true
    });

    return this;
  };

  /**
   * Adds or removes an exclusion filter to a faceted attribute with the `value` provided. If
   * the value is set then it removes it, otherwise it adds the filter.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.toggleFacetExclusion = function(facet, value) {
    this._change({
      state: this.state.resetPage().toggleExcludeFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetExclusion}
   */
  AlgoliaSearchHelper.prototype.toggleExclude = function() {
    return this.toggleFacetExclusion.apply(this, arguments);
  };

  /**
   * Adds or removes a filter to a faceted attribute with the `value` provided. If
   * the value is set then it removes it, otherwise it adds the filter.
   *
   * This method can be used for conjunctive, disjunctive and hierarchical filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {AlgoliaSearchHelper}
   * @throws Error will throw an error if the facet is not declared in the settings of the helper
   * @fires change
   * @chainable
   * @deprecated since version 2.19.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.toggleRefinement = function(facet, value) {
    return this.toggleFacetRefinement(facet, value);
  };

  /**
   * Adds or removes a filter to a faceted attribute with the `value` provided. If
   * the value is set then it removes it, otherwise it adds the filter.
   *
   * This method can be used for conjunctive, disjunctive and hierarchical filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {AlgoliaSearchHelper}
   * @throws Error will throw an error if the facet is not declared in the settings of the helper
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.toggleFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().toggleFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.toggleRefine = function() {
    return this.toggleFacetRefinement.apply(this, arguments);
  };

  /**
   * Adds or removes a tag filter with the `value` provided. If
   * the value is set then it removes it, otherwise it adds the filter.
   *
   * This method resets the current page to 0.
   * @param {string} tag tag to remove or add
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.toggleTag = function(tag) {
    this._change({
      state: this.state.resetPage().toggleTagRefinement(tag),
      isPageReset: true
    });

    return this;
  };

  /**
   * Increments the page number by one.
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   * @example
   * helper.setPage(0).nextPage().getPage();
   * // returns 1
   */
  AlgoliaSearchHelper.prototype.nextPage = function() {
    var page = this.state.page || 0;
    return this.setPage(page + 1);
  };

  /**
   * Decrements the page number by one.
   * @fires change
   * @return {AlgoliaSearchHelper}
   * @chainable
   * @example
   * helper.setPage(1).previousPage().getPage();
   * // returns 0
   */
  AlgoliaSearchHelper.prototype.previousPage = function() {
    var page = this.state.page || 0;
    return this.setPage(page - 1);
  };

  /**
   * @private
   */
  function setCurrentPage(page) {
    if (page < 0) throw new Error('Page requested below 0.');

    this._change({
      state: this.state.setPage(page),
      isPageReset: false
    });

    return this;
  }

  /**
   * Change the current page
   * @deprecated
   * @param  {number} page The page number
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setCurrentPage = setCurrentPage;

  /**
   * Updates the current page.
   * @function
   * @param  {number} page The page number
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setPage = setCurrentPage;

  /**
   * Updates the name of the index that will be targeted by the query.
   *
   * This method resets the current page to 0.
   * @param {string} name the index name
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setIndex = function(name) {
    this._change({
      state: this.state.resetPage().setIndex(name),
      isPageReset: true
    });

    return this;
  };

  /**
   * Update a parameter of the search. This method reset the page
   *
   * The complete list of parameters is available on the
   * [Algolia website](https://www.algolia.com/doc/rest#query-an-index).
   * The most commonly used parameters have their own [shortcuts](#query-parameters-shortcuts)
   * or benefit from higher-level APIs (all the kind of filters and facets have their own API)
   *
   * This method resets the current page to 0.
   * @param {string} parameter name of the parameter to update
   * @param {any} value new value of the parameter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   * @example
   * helper.setQueryParameter('hitsPerPage', 20).search();
   */
  AlgoliaSearchHelper.prototype.setQueryParameter = function(parameter, value) {
    this._change({
      state: this.state.resetPage().setQueryParameter(parameter, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * Set the whole state (warning: will erase previous state)
   * @param {SearchParameters} newState the whole new state
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setState = function(newState) {
    this._change({
      state: SearchParameters_1.make(newState),
      isPageReset: false
    });

    return this;
  };

  /**
   * Override the current state without triggering a change event.
   * Do not use this method unless you know what you are doing. (see the example
   * for a legit use case)
   * @param {SearchParameters} newState the whole new state
   * @return {AlgoliaSearchHelper}
   * @example
   *  helper.on('change', function(state){
   *    // In this function you might want to find a way to store the state in the url/history
   *    updateYourURL(state)
   *  })
   *  window.onpopstate = function(event){
   *    // This is naive though as you should check if the state is really defined etc.
   *    helper.overrideStateWithoutTriggeringChangeEvent(event.state).search()
   *  }
   * @chainable
   */
  AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent = function(newState) {
    this.state = new SearchParameters_1(newState);
    return this;
  };

  /**
   * Check if an attribute has any numeric, conjunctive, disjunctive or hierarchical filters.
   * @param {string} attribute the name of the attribute
   * @return {boolean} true if the attribute is filtered by at least one value
   * @example
   * // hasRefinements works with numeric, conjunctive, disjunctive and hierarchical filters
   * helper.hasRefinements('price'); // false
   * helper.addNumericRefinement('price', '>', 100);
   * helper.hasRefinements('price'); // true
   *
   * helper.hasRefinements('color'); // false
   * helper.addFacetRefinement('color', 'blue');
   * helper.hasRefinements('color'); // true
   *
   * helper.hasRefinements('material'); // false
   * helper.addDisjunctiveFacetRefinement('material', 'plastic');
   * helper.hasRefinements('material'); // true
   *
   * helper.hasRefinements('categories'); // false
   * helper.toggleFacetRefinement('categories', 'kitchen > knife');
   * helper.hasRefinements('categories'); // true
   *
   */
  AlgoliaSearchHelper.prototype.hasRefinements = function(attribute) {
    if (objectHasKeys_1(this.state.getNumericRefinements(attribute))) {
      return true;
    } else if (this.state.isConjunctiveFacet(attribute)) {
      return this.state.isFacetRefined(attribute);
    } else if (this.state.isDisjunctiveFacet(attribute)) {
      return this.state.isDisjunctiveFacetRefined(attribute);
    } else if (this.state.isHierarchicalFacet(attribute)) {
      return this.state.isHierarchicalFacetRefined(attribute);
    }

    // there's currently no way to know that the user did call `addNumericRefinement` at some point
    // thus we cannot distinguish if there once was a numeric refinement that was cleared
    // so we will return false in every other situations to be consistent
    // while what we should do here is throw because we did not find the attribute in any type
    // of refinement
    return false;
  };

  /**
   * Check if a value is excluded for a specific faceted attribute. If the value
   * is omitted then the function checks if there is any excluding refinements.
   *
   * @param  {string}  facet name of the attribute for used for faceting
   * @param  {string}  [value] optional value. If passed will test that this value
     * is filtering the given facet.
   * @return {boolean} true if refined
   * @example
   * helper.isExcludeRefined('color'); // false
   * helper.isExcludeRefined('color', 'blue') // false
   * helper.isExcludeRefined('color', 'red') // false
   *
   * helper.addFacetExclusion('color', 'red');
   *
   * helper.isExcludeRefined('color'); // true
   * helper.isExcludeRefined('color', 'blue') // false
   * helper.isExcludeRefined('color', 'red') // true
   */
  AlgoliaSearchHelper.prototype.isExcluded = function(facet, value) {
    return this.state.isExcludeRefined(facet, value);
  };

  /**
   * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasRefinements}
   */
  AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function(facet, value) {
    return this.state.isDisjunctiveFacetRefined(facet, value);
  };

  /**
   * Check if the string is a currently filtering tag.
   * @param {string} tag tag to check
   * @return {boolean}
   */
  AlgoliaSearchHelper.prototype.hasTag = function(tag) {
    return this.state.isTagRefined(tag);
  };

  /**
   * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasTag}
   */
  AlgoliaSearchHelper.prototype.isTagRefined = function() {
    return this.hasTagRefinements.apply(this, arguments);
  };


  /**
   * Get the name of the currently used index.
   * @return {string}
   * @example
   * helper.setIndex('highestPrice_products').getIndex();
   * // returns 'highestPrice_products'
   */
  AlgoliaSearchHelper.prototype.getIndex = function() {
    return this.state.index;
  };

  function getCurrentPage() {
    return this.state.page;
  }

  /**
   * Get the currently selected page
   * @deprecated
   * @return {number} the current page
   */
  AlgoliaSearchHelper.prototype.getCurrentPage = getCurrentPage;
  /**
   * Get the currently selected page
   * @function
   * @return {number} the current page
   */
  AlgoliaSearchHelper.prototype.getPage = getCurrentPage;

  /**
   * Get all the tags currently set to filters the results.
   *
   * @return {string[]} The list of tags currently set.
   */
  AlgoliaSearchHelper.prototype.getTags = function() {
    return this.state.tagRefinements;
  };

  /**
   * Get the list of refinements for a given attribute. This method works with
   * conjunctive, disjunctive, excluding and numerical filters.
   *
   * See also SearchResults#getRefinements
   *
   * @param {string} facetName attribute name used for faceting
   * @return {Array.<FacetRefinement|NumericRefinement>} All Refinement are objects that contain a value, and
   * a type. Numeric also contains an operator.
   * @example
   * helper.addNumericRefinement('price', '>', 100);
   * helper.getRefinements('price');
   * // [
   * //   {
   * //     "value": [
   * //       100
   * //     ],
   * //     "operator": ">",
   * //     "type": "numeric"
   * //   }
   * // ]
   * @example
   * helper.addFacetRefinement('color', 'blue');
   * helper.addFacetExclusion('color', 'red');
   * helper.getRefinements('color');
   * // [
   * //   {
   * //     "value": "blue",
   * //     "type": "conjunctive"
   * //   },
   * //   {
   * //     "value": "red",
   * //     "type": "exclude"
   * //   }
   * // ]
   * @example
   * helper.addDisjunctiveFacetRefinement('material', 'plastic');
   * // [
   * //   {
   * //     "value": "plastic",
   * //     "type": "disjunctive"
   * //   }
   * // ]
   */
  AlgoliaSearchHelper.prototype.getRefinements = function(facetName) {
    var refinements = [];

    if (this.state.isConjunctiveFacet(facetName)) {
      var conjRefinements = this.state.getConjunctiveRefinements(facetName);

      conjRefinements.forEach(function(r) {
        refinements.push({
          value: r,
          type: 'conjunctive'
        });
      });

      var excludeRefinements = this.state.getExcludeRefinements(facetName);

      excludeRefinements.forEach(function(r) {
        refinements.push({
          value: r,
          type: 'exclude'
        });
      });
    } else if (this.state.isDisjunctiveFacet(facetName)) {
      var disjRefinements = this.state.getDisjunctiveRefinements(facetName);

      disjRefinements.forEach(function(r) {
        refinements.push({
          value: r,
          type: 'disjunctive'
        });
      });
    }

    var numericRefinements = this.state.getNumericRefinements(facetName);

    Object.keys(numericRefinements).forEach(function(operator) {
      var value = numericRefinements[operator];

      refinements.push({
        value: value,
        operator: operator,
        type: 'numeric'
      });
    });

    return refinements;
  };

  /**
   * Return the current refinement for the (attribute, operator)
   * @param {string} attribute attribute in the record
   * @param {string} operator operator applied on the refined values
   * @return {Array.<number|number[]>} refined values
   */
  AlgoliaSearchHelper.prototype.getNumericRefinement = function(attribute, operator) {
    return this.state.getNumericRefinement(attribute, operator);
  };

  /**
   * Get the current breadcrumb for a hierarchical facet, as an array
   * @param  {string} facetName Hierarchical facet name
   * @return {array.<string>} the path as an array of string
   */
  AlgoliaSearchHelper.prototype.getHierarchicalFacetBreadcrumb = function(facetName) {
    return this.state.getHierarchicalFacetBreadcrumb(facetName);
  };

  // /////////// PRIVATE

  /**
   * Perform the underlying queries
   * @private
   * @return {undefined}
   * @fires search
   * @fires result
   * @fires error
   */
  AlgoliaSearchHelper.prototype._search = function(options) {
    var state = this.state;
    var states = [];
    var mainQueries = [];

    if (!options.onlyWithDerivedHelpers) {
      mainQueries = requestBuilder_1._getQueries(state.index, state);

      states.push({
        state: state,
        queriesCount: mainQueries.length,
        helper: this
      });

      this.emit('search', {
        state: state,
        results: this.lastResults
      });
    }

    var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
      var derivedState = derivedHelper.getModifiedState(state);
      var derivedStateQueries = requestBuilder_1._getQueries(derivedState.index, derivedState);

      states.push({
        state: derivedState,
        queriesCount: derivedStateQueries.length,
        helper: derivedHelper
      });

      derivedHelper.emit('search', {
        state: derivedState,
        results: derivedHelper.lastResults
      });

      return derivedStateQueries;
    });

    var queries = Array.prototype.concat.apply(mainQueries, derivedQueries);
    var queryId = this._queryId++;

    this._currentNbQueries++;

    try {
      this.client.search(queries)
        .then(this._dispatchAlgoliaResponse.bind(this, states, queryId))
        .catch(this._dispatchAlgoliaError.bind(this, queryId));
    } catch (error) {
      // If we reach this part, we're in an internal error state
      this.emit('error', {
        error: error
      });
    }
  };

  /**
   * Transform the responses as sent by the server and transform them into a user
   * usable object that merge the results of all the batch requests. It will dispatch
   * over the different helper + derived helpers (when there are some).
   * @private
   * @param {array.<{SearchParameters, AlgoliaQueries, AlgoliaSearchHelper}>}
   *  state state used for to generate the request
   * @param {number} queryId id of the current request
   * @param {object} content content of the response
   * @return {undefined}
   */
  AlgoliaSearchHelper.prototype._dispatchAlgoliaResponse = function(states, queryId, content) {
    // FIXME remove the number of outdated queries discarded instead of just one

    if (queryId < this._lastQueryIdReceived) {
      // Outdated answer
      return;
    }

    this._currentNbQueries -= (queryId - this._lastQueryIdReceived);
    this._lastQueryIdReceived = queryId;

    if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');

    var results = content.results.slice();

    states.forEach(function(s) {
      var state = s.state;
      var queriesCount = s.queriesCount;
      var helper = s.helper;
      var specificResults = results.splice(0, queriesCount);

      var formattedResponse = helper.lastResults = new SearchResults_1(state, specificResults);

      helper.emit('result', {
        results: formattedResponse,
        state: state
      });
    });
  };

  AlgoliaSearchHelper.prototype._dispatchAlgoliaError = function(queryId, error) {
    if (queryId < this._lastQueryIdReceived) {
      // Outdated answer
      return;
    }

    this._currentNbQueries -= queryId - this._lastQueryIdReceived;
    this._lastQueryIdReceived = queryId;

    this.emit('error', {
      error: error
    });

    if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');
  };

  AlgoliaSearchHelper.prototype.containsRefinement = function(query, facetFilters, numericFilters, tagFilters) {
    return query ||
      facetFilters.length !== 0 ||
      numericFilters.length !== 0 ||
      tagFilters.length !== 0;
  };

  /**
   * Test if there are some disjunctive refinements on the facet
   * @private
   * @param {string} facet the attribute to test
   * @return {boolean}
   */
  AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function(facet) {
    return this.state.disjunctiveRefinements[facet] &&
      this.state.disjunctiveRefinements[facet].length > 0;
  };

  AlgoliaSearchHelper.prototype._change = function(event) {
    var state = event.state;
    var isPageReset = event.isPageReset;

    if (state !== this.state) {
      this.state = state;

      this.emit('change', {
        state: this.state,
        results: this.lastResults,
        isPageReset: isPageReset
      });
    }
  };

  /**
   * Clears the cache of the underlying Algolia client.
   * @return {AlgoliaSearchHelper}
   */
  AlgoliaSearchHelper.prototype.clearCache = function() {
    this.client.clearCache && this.client.clearCache();
    return this;
  };

  /**
   * Updates the internal client instance. If the reference of the clients
   * are equal then no update is actually done.
   * @param  {AlgoliaSearch} newClient an AlgoliaSearch client
   * @return {AlgoliaSearchHelper}
   */
  AlgoliaSearchHelper.prototype.setClient = function(newClient) {
    if (this.client === newClient) return this;

    if (typeof newClient.addAlgoliaAgent === 'function') {
      newClient.addAlgoliaAgent('JS Helper (' + version + ')');
    }
    this.client = newClient;

    return this;
  };

  /**
   * Gets the instance of the currently used client.
   * @return {AlgoliaSearch}
   */
  AlgoliaSearchHelper.prototype.getClient = function() {
    return this.client;
  };

  /**
   * Creates an derived instance of the Helper. A derived helper
   * is a way to request other indices synchronised with the lifecycle
   * of the main Helper. This mechanism uses the multiqueries feature
   * of Algolia to aggregate all the requests in a single network call.
   *
   * This method takes a function that is used to create a new SearchParameter
   * that will be used to create requests to Algolia. Those new requests
   * are created just before the `search` event. The signature of the function
   * is `SearchParameters -> SearchParameters`.
   *
   * This method returns a new DerivedHelper which is an EventEmitter
   * that fires the same `search`, `result` and `error` events. Those
   * events, however, will receive data specific to this DerivedHelper
   * and the SearchParameters that is returned by the call of the
   * parameter function.
   * @param {function} fn SearchParameters -> SearchParameters
   * @return {DerivedHelper}
   */
  AlgoliaSearchHelper.prototype.derive = function(fn) {
    var derivedHelper = new DerivedHelper_1(this, fn);
    this.derivedHelpers.push(derivedHelper);
    return derivedHelper;
  };

  /**
   * This method detaches a derived Helper from the main one. Prefer using the one from the
   * derived helper itself, to remove the event listeners too.
   * @private
   * @return {undefined}
   * @throws Error
   */
  AlgoliaSearchHelper.prototype.detachDerivedHelper = function(derivedHelper) {
    var pos = this.derivedHelpers.indexOf(derivedHelper);
    if (pos === -1) throw new Error('Derived helper already detached');
    this.derivedHelpers.splice(pos, 1);
  };

  /**
   * This method returns true if there is currently at least one on-going search.
   * @return {boolean} true if there is a search pending
   */
  AlgoliaSearchHelper.prototype.hasPendingRequests = function() {
    return this._currentNbQueries > 0;
  };

  /**
   * @typedef AlgoliaSearchHelper.NumericRefinement
   * @type {object}
   * @property {number[]} value the numbers that are used for filtering this attribute with
   * the operator specified.
   * @property {string} operator the faceting data: value, number of entries
   * @property {string} type will be 'numeric'
   */

  /**
   * @typedef AlgoliaSearchHelper.FacetRefinement
   * @type {object}
   * @property {string} value the string use to filter the attribute
   * @property {string} type the type of filter: 'conjunctive', 'disjunctive', 'exclude'
   */

  var algoliasearch_helper = AlgoliaSearchHelper;

  /**
   * The algoliasearchHelper module is the function that will let its
   * contains everything needed to use the Algoliasearch
   * Helper. It is a also a function that instanciate the helper.
   * To use the helper, you also need the Algolia JS client v3.
   * @example
   * //using the UMD build
   * var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
   * var helper = algoliasearchHelper(client, 'bestbuy', {
   *   facets: ['shipping'],
   *   disjunctiveFacets: ['category']
   * });
   * helper.on('result', function(event) {
   *   console.log(event.results);
   * });
   * helper
   *   .toggleFacetRefinement('category', 'Movies & TV Shows')
   *   .toggleFacetRefinement('shipping', 'Free shipping')
   *   .search();
   * @example
   * // The helper is an event emitter using the node API
   * helper.on('result', updateTheResults);
   * helper.once('result', updateTheResults);
   * helper.removeListener('result', updateTheResults);
   * helper.removeAllListeners('result');
   * @module algoliasearchHelper
   * @param  {AlgoliaSearch} client an AlgoliaSearch client
   * @param  {string} index the name of the index to query
   * @param  {SearchParameters|object} opts an object defining the initial config of the search. It doesn't have to be a {SearchParameters}, just an object containing the properties you need from it.
   * @return {AlgoliaSearchHelper}
   */
  function algoliasearchHelper(client, index, opts) {
    return new algoliasearch_helper(client, index, opts);
  }

  /**
   * The version currently used
   * @member module:algoliasearchHelper.version
   * @type {number}
   */
  algoliasearchHelper.version = version;

  /**
   * Constructor for the Helper.
   * @member module:algoliasearchHelper.AlgoliaSearchHelper
   * @type {AlgoliaSearchHelper}
   */
  algoliasearchHelper.AlgoliaSearchHelper = algoliasearch_helper;

  /**
   * Constructor for the object containing all the parameters of the search.
   * @member module:algoliasearchHelper.SearchParameters
   * @type {SearchParameters}
   */
  algoliasearchHelper.SearchParameters = SearchParameters_1;

  /**
   * Constructor for the object containing the results of the search.
   * @member module:algoliasearchHelper.SearchResults
   * @type {SearchResults}
   */
  algoliasearchHelper.SearchResults = SearchResults_1;

  var algoliasearchHelper_1 = algoliasearchHelper;

  var withUsage$l = createDocumentationMessageGenerator({
    name: 'configure',
    connector: true
  });
  function getInitialSearchParameters(state, widgetParams) {
    // We leverage the helper internals to remove the `widgetParams` from
    // the state. The function `setQueryParameters` omits the values that
    // are `undefined` on the next state.
    return state.setQueryParameters(Object.keys(widgetParams.searchParameters).reduce(function (acc, key) {
      return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, undefined));
    }, {}));
  }
  var connectConfigure = function connectConfigure() {
    var renderFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    return function (widgetParams) {
      if (!widgetParams || !isPlainObject(widgetParams.searchParameters)) {
        throw new Error(withUsage$l('The `searchParameters` option expects an object.'));
      }
      var connectorState = {};
      function refine(helper) {
        return function (searchParameters) {
          // Merge new `searchParameters` with the ones set from other widgets
          var actualState = getInitialSearchParameters(helper.state, widgetParams);
          var nextSearchParameters = mergeSearchParameters(actualState, new algoliasearchHelper_1.SearchParameters(searchParameters));

          // Update original `widgetParams.searchParameters` to the new refined one
          widgetParams.searchParameters = searchParameters;

          // Trigger a search with the resolved search parameters
          helper.setState(nextSearchParameters).search();
        };
      }
      return {
        $$type: 'ais.configure',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref) {
          var state = _ref.state;
          unmountFn();
          return getInitialSearchParameters(state, widgetParams);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          var _renderState$configur;
          var widgetRenderState = this.getWidgetRenderState(renderOptions);
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            configure: _objectSpread2(_objectSpread2({}, widgetRenderState), {}, {
              widgetParams: _objectSpread2(_objectSpread2({}, widgetRenderState.widgetParams), {}, {
                searchParameters: mergeSearchParameters(new algoliasearchHelper_1.SearchParameters((_renderState$configur = renderState.configure) === null || _renderState$configur === void 0 ? void 0 : _renderState$configur.widgetParams.searchParameters), new algoliasearchHelper_1.SearchParameters(widgetRenderState.widgetParams.searchParameters)).getQueryParams()
              })
            })
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref2) {
          var helper = _ref2.helper;
          if (!connectorState.refine) {
            connectorState.refine = refine(helper);
          }
          return {
            refine: connectorState.refine,
            widgetParams: widgetParams
          };
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref3) {
          var uiState = _ref3.uiState;
          return mergeSearchParameters(state, new algoliasearchHelper_1.SearchParameters(_objectSpread2(_objectSpread2({}, uiState.configure), widgetParams.searchParameters)));
        },
        getWidgetUiState: function getWidgetUiState(uiState) {
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            configure: _objectSpread2(_objectSpread2({}, uiState.configure), widgetParams.searchParameters)
          });
        }
      };
    };
  };

  var withUsage$m = createDocumentationMessageGenerator({
    name: 'configure-related-items',
    connector: true
  });
  function createOptionalFilter(_ref) {
    var attributeName = _ref.attributeName,
      attributeValue = _ref.attributeValue,
      attributeScore = _ref.attributeScore;
    return "".concat(attributeName, ":").concat(attributeValue, "<score=").concat(attributeScore || 1, ">");
  }
  var connectConfigureRelatedItems = function connectConfigureRelatedItems(renderFn, unmountFn) {
    return function (widgetParams) {
      var _ref2 = widgetParams || {},
        hit = _ref2.hit,
        matchingPatterns = _ref2.matchingPatterns,
        _ref2$transformSearch = _ref2.transformSearchParameters,
        transformSearchParameters = _ref2$transformSearch === void 0 ? function (x) {
          return x;
        } : _ref2$transformSearch;
      if (!hit) {
        throw new Error(withUsage$m('The `hit` option is required.'));
      }
      if (!matchingPatterns) {
        throw new Error(withUsage$m('The `matchingPatterns` option is required.'));
      }
      var optionalFilters = Object.keys(matchingPatterns).reduce(function (acc, attributeName) {
        var attribute = matchingPatterns[attributeName];
        var attributeValue = getPropertyByPath(hit, attributeName);
        var attributeScore = attribute.score;
        if (Array.isArray(attributeValue)) {
          return [].concat(_toConsumableArray(acc), [attributeValue.map(function (attributeSubValue) {
            return createOptionalFilter({
              attributeName: attributeName,
              attributeValue: attributeSubValue,
              attributeScore: attributeScore
            });
          })]);
        }
        if (typeof attributeValue === 'string') {
          return [].concat(_toConsumableArray(acc), [createOptionalFilter({
            attributeName: attributeName,
            attributeValue: attributeValue,
            attributeScore: attributeScore
          })]);
        }
         _warning(false, "\nThe `matchingPatterns` option returned a value of type ".concat(getObjectType(attributeValue), " for the \"").concat(attributeName, "\" key. This value was not sent to Algolia because `optionalFilters` only supports strings and array of strings.\n\nYou can remove the \"").concat(attributeName, "\" key from the `matchingPatterns` option.\n\nSee https://www.algolia.com/doc/api-reference/api-parameters/optionalFilters/\n            ")) ;
        return acc;
      }, []);
      var searchParameters = _objectSpread2({}, transformSearchParameters(new algoliasearchHelper_1.SearchParameters({
        sumOrFiltersScores: true,
        facetFilters: ["objectID:-".concat(hit.objectID)],
        optionalFilters: optionalFilters
      })));
      var makeWidget = connectConfigure(renderFn, unmountFn);
      return _objectSpread2(_objectSpread2({}, makeWidget({
        searchParameters: searchParameters
      })), {}, {
        $$type: 'ais.configureRelatedItems'
      });
    };
  };

  var withUsage$n = createDocumentationMessageGenerator({
    name: 'autocomplete',
    connector: true
  });
  var connectAutocomplete = function connectAutocomplete(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$n());
    return function (widgetParams) {
      var _ref = widgetParams || {},
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML;
       _warning(!widgetParams.indices, "\nThe option `indices` has been removed from the Autocomplete connector.\n\nThe indices to target are now inferred from the widgets tree.\n".concat(Array.isArray(widgetParams.indices) ? "\nAn alternative would be:\n\nconst autocomplete = connectAutocomplete(renderer);\n\nsearch.addWidgets([\n  ".concat(widgetParams.indices.map(function (_ref2) {
        var value = _ref2.value;
        return "index({ indexName: '".concat(value, "' }),");
      }).join('\n  '), "\n  autocomplete()\n]);\n") : '', "\n      ")) ;
      var connectorState = {};
      return {
        $$type: 'ais.autocomplete',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          var renderState = this.getWidgetRenderState(renderOptions);
          renderState.indices.forEach(function (_ref3) {
            var sendEvent = _ref3.sendEvent,
              hits = _ref3.hits;
            sendEvent('view', hits);
          });
          renderFn(_objectSpread2(_objectSpread2({}, renderState), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            autocomplete: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref4) {
          var _this = this;
          var helper = _ref4.helper,
            state = _ref4.state,
            scopedResults = _ref4.scopedResults,
            instantSearchInstance = _ref4.instantSearchInstance;
          if (!connectorState.refine) {
            connectorState.refine = function (query) {
              helper.setQuery(query).search();
            };
          }
          var indices = scopedResults.map(function (scopedResult) {
            // We need to escape the hits because highlighting
            // exposes HTML tags to the end-user.
            scopedResult.results.hits = escapeHTML ? escapeHits(scopedResult.results.hits) : scopedResult.results.hits;
            var sendEvent = createSendEventForHits({
              instantSearchInstance: instantSearchInstance,
              index: scopedResult.results.index,
              widgetType: _this.$$type
            });
            return {
              indexId: scopedResult.indexId,
              indexName: scopedResult.results.index,
              hits: scopedResult.results.hits,
              results: scopedResult.results,
              sendEvent: sendEvent
            };
          });
          return {
            currentRefinement: state.query || '',
            indices: indices,
            refine: connectorState.refine,
            widgetParams: widgetParams
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
          var searchParameters = _ref5.searchParameters;
          var query = searchParameters.query || '';
          if (query === '' || uiState && uiState.query === query) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            query: query
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
          var uiState = _ref6.uiState;
          var parameters = {
            query: uiState.query || ''
          };
          if (!escapeHTML) {
            return searchParameters.setQueryParameters(parameters);
          }
          return searchParameters.setQueryParameters(_objectSpread2(_objectSpread2({}, parameters), TAG_PLACEHOLDER));
        },
        dispose: function dispose(_ref7) {
          var state = _ref7.state;
          unmountFn();
          var stateWithoutQuery = state.setQueryParameter('query', undefined);
          if (!escapeHTML) {
            return stateWithoutQuery;
          }
          return stateWithoutQuery.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function (acc, key) {
            return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, undefined));
          }, {}));
        }
      };
    };
  };

  var withUsage$o = createDocumentationMessageGenerator({
    name: 'query-rules',
    connector: true
  });
  function hasStateRefinements(state) {
    return [state.disjunctiveFacetsRefinements, state.facetsRefinements, state.hierarchicalFacetsRefinements, state.numericRefinements].some(function (refinement) {
      return Boolean(refinement && Object.keys(refinement).length > 0);
    });
  }

  // A context rule must consist only of alphanumeric characters, hyphens, and underscores.
  // See https://www.algolia.com/doc/guides/managing-results/refine-results/merchandising-and-promoting/in-depth/implementing-query-rules/#context
  function escapeRuleContext(ruleName) {
    return ruleName.replace(/[^a-z0-9-_]+/gi, '_');
  }
  function getRuleContextsFromTrackedFilters(_ref) {
    var helper = _ref.helper,
      sharedHelperState = _ref.sharedHelperState,
      trackedFilters = _ref.trackedFilters;
    var ruleContexts = Object.keys(trackedFilters).reduce(function (facets, facetName) {
      var facetRefinements = getRefinements(helper.lastResults || {}, sharedHelperState, true).filter(function (refinement) {
        return refinement.attribute === facetName;
      }).map(function (refinement) {
        return refinement.numericValue || refinement.name;
      });
      var getTrackedFacetValues = trackedFilters[facetName];
      var trackedFacetValues = getTrackedFacetValues(facetRefinements);
      return [].concat(_toConsumableArray(facets), _toConsumableArray(facetRefinements.filter(function (facetRefinement) {
        return trackedFacetValues.includes(facetRefinement);
      }).map(function (facetValue) {
        return escapeRuleContext("ais-".concat(facetName, "-").concat(facetValue));
      })));
    }, []);
    return ruleContexts;
  }
  function applyRuleContexts(event) {
    var helper = this.helper,
      initialRuleContexts = this.initialRuleContexts,
      trackedFilters = this.trackedFilters,
      transformRuleContexts = this.transformRuleContexts;
    var sharedHelperState = event.state;
    var previousRuleContexts = sharedHelperState.ruleContexts || [];
    var newRuleContexts = getRuleContextsFromTrackedFilters({
      helper: helper,
      sharedHelperState: sharedHelperState,
      trackedFilters: trackedFilters
    });
    var nextRuleContexts = [].concat(_toConsumableArray(initialRuleContexts), _toConsumableArray(newRuleContexts));
     _warning(nextRuleContexts.length <= 10, "\nThe maximum number of `ruleContexts` is 10. They have been sliced to that limit.\nConsider using `transformRuleContexts` to minimize the number of rules sent to Algolia.\n") ;
    var ruleContexts = transformRuleContexts(nextRuleContexts).slice(0, 10);
    if (!isEqual(previousRuleContexts, ruleContexts)) {
      helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread2(_objectSpread2({}, sharedHelperState), {}, {
        ruleContexts: ruleContexts
      }));
    }
  }
  var connectQueryRules = function connectQueryRules(_render) {
    var unmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(_render, withUsage$o());
    return function (widgetParams) {
      var _ref2 = widgetParams || {},
        _ref2$trackedFilters = _ref2.trackedFilters,
        trackedFilters = _ref2$trackedFilters === void 0 ? {} : _ref2$trackedFilters,
        _ref2$transformRuleCo = _ref2.transformRuleContexts,
        transformRuleContexts = _ref2$transformRuleCo === void 0 ? function (rules) {
          return rules;
        } : _ref2$transformRuleCo,
        _ref2$transformItems = _ref2.transformItems,
        transformItems = _ref2$transformItems === void 0 ? function (items) {
          return items;
        } : _ref2$transformItems;
      Object.keys(trackedFilters).forEach(function (facetName) {
        if (typeof trackedFilters[facetName] !== 'function') {
          throw new Error(withUsage$o("'The \"".concat(facetName, "\" filter value in the `trackedFilters` option expects a function.")));
        }
      });
      var hasTrackedFilters = Object.keys(trackedFilters).length > 0;

      // We store the initial rule contexts applied before creating the widget
      // so that we do not override them with the rules created from `trackedFilters`.
      var initialRuleContexts = [];
      var onHelperChange;
      return {
        $$type: 'ais.queryRules',
        init: function init(initOptions) {
          var helper = initOptions.helper,
            state = initOptions.state,
            instantSearchInstance = initOptions.instantSearchInstance;
          initialRuleContexts = state.ruleContexts || [];
          onHelperChange = applyRuleContexts.bind({
            helper: helper,
            initialRuleContexts: initialRuleContexts,
            trackedFilters: trackedFilters,
            transformRuleContexts: transformRuleContexts
          });
          if (hasTrackedFilters) {
            // We need to apply the `ruleContexts` based on the `trackedFilters`
            // before the helper changes state in some cases:
            //   - Some filters are applied on the first load (e.g. using `configure`)
            //   - The `transformRuleContexts` option sets initial `ruleContexts`.
            if (hasStateRefinements(state) || Boolean(widgetParams.transformRuleContexts)) {
              onHelperChange({
                state: state
              });
            }

            // We track every change in the helper to override its state and add
            // any `ruleContexts` needed based on the `trackedFilters`.
            helper.on('change', onHelperChange);
          }
          _render(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          _render(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        getWidgetRenderState: function getWidgetRenderState(_ref3) {
          var results = _ref3.results;
          var _ref4 = results || {},
            _ref4$userData = _ref4.userData,
            userData = _ref4$userData === void 0 ? [] : _ref4$userData;
          var items = transformItems(userData, {
            results: results
          });
          return {
            items: items,
            widgetParams: widgetParams
          };
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            queryRules: this.getWidgetRenderState(renderOptions)
          });
        },
        dispose: function dispose(_ref5) {
          var helper = _ref5.helper,
            state = _ref5.state;
          unmount();
          if (hasTrackedFilters) {
            helper.removeListener('change', onHelperChange);
            return state.setQueryParameter('ruleContexts', initialRuleContexts);
          }
          return state;
        }
      };
    };
  };

  // `SpeechRecognition` is an API used on the browser so we can safely disable
  // the `window` check.
  /* eslint-disable no-restricted-globals */
  /* global SpeechRecognition SpeechRecognitionEvent */

  var createVoiceSearchHelper = function createVoiceSearchHelper(_ref) {
    var searchAsYouSpeak = _ref.searchAsYouSpeak,
      language = _ref.language,
      onQueryChange = _ref.onQueryChange,
      onStateChange = _ref.onStateChange;
    var SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
    var getDefaultState = function getDefaultState(status) {
      return {
        status: status,
        transcript: '',
        isSpeechFinal: false,
        errorCode: undefined
      };
    };
    var state = getDefaultState('initial');
    var recognition;
    var isBrowserSupported = function isBrowserSupported() {
      return Boolean(SpeechRecognitionAPI);
    };
    var isListening = function isListening() {
      return state.status === 'askingPermission' || state.status === 'waiting' || state.status === 'recognizing';
    };
    var setState = function setState() {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      state = _objectSpread2(_objectSpread2({}, state), newState);
      onStateChange();
    };
    var getState = function getState() {
      return state;
    };
    var resetState = function resetState() {
      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';
      setState(getDefaultState(status));
    };
    var onStart = function onStart() {
      setState({
        status: 'waiting'
      });
    };
    var onError = function onError(event) {
      setState({
        status: 'error',
        errorCode: event.error
      });
    };
    var onResult = function onResult(event) {
      setState({
        status: 'recognizing',
        transcript: event.results[0] && event.results[0][0] && event.results[0][0].transcript || '',
        isSpeechFinal: event.results[0] && event.results[0].isFinal
      });
      if (searchAsYouSpeak && state.transcript) {
        onQueryChange(state.transcript);
      }
    };
    var onEnd = function onEnd() {
      if (!state.errorCode && state.transcript && !searchAsYouSpeak) {
        onQueryChange(state.transcript);
      }
      if (state.status !== 'error') {
        setState({
          status: 'finished'
        });
      }
    };
    var startListening = function startListening() {
      recognition = new SpeechRecognitionAPI();
      if (!recognition) {
        return;
      }
      resetState('askingPermission');
      recognition.interimResults = true;
      if (language) {
        recognition.lang = language;
      }
      recognition.addEventListener('start', onStart);
      recognition.addEventListener('error', onError);
      recognition.addEventListener('result', onResult);
      recognition.addEventListener('end', onEnd);
      recognition.start();
    };
    var dispose = function dispose() {
      if (!recognition) {
        return;
      }
      recognition.stop();
      recognition.removeEventListener('start', onStart);
      recognition.removeEventListener('error', onError);
      recognition.removeEventListener('result', onResult);
      recognition.removeEventListener('end', onEnd);
      recognition = undefined;
    };
    var stopListening = function stopListening() {
      dispose();
      // Because `dispose` removes event listeners, `end` listener is not called.
      // So we're setting the `status` as `finished` here.
      // If we don't do it, it will be still `waiting` or `recognizing`.
      resetState('finished');
    };
    return {
      getState: getState,
      isBrowserSupported: isBrowserSupported,
      isListening: isListening,
      startListening: startListening,
      stopListening: stopListening,
      dispose: dispose
    };
  };

  var withUsage$p = createDocumentationMessageGenerator({
    name: 'voice-search',
    connector: true
  });
  var connectVoiceSearch = function connectVoiceSearch(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$p());
    return function (widgetParams) {
      var _widgetParams$searchA = widgetParams.searchAsYouSpeak,
        searchAsYouSpeak = _widgetParams$searchA === void 0 ? false : _widgetParams$searchA,
        language = widgetParams.language,
        additionalQueryParameters = widgetParams.additionalQueryParameters,
        _widgetParams$createV = widgetParams.createVoiceSearchHelper,
        createVoiceSearchHelper$1 = _widgetParams$createV === void 0 ? createVoiceSearchHelper : _widgetParams$createV;
      return {
        $$type: 'ais.voiceSearch',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            voiceSearch: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(renderOptions) {
          var _this = this;
          var helper = renderOptions.helper,
            instantSearchInstance = renderOptions.instantSearchInstance;
          if (!this._refine) {
            this._refine = function (query) {
              if (query !== helper.state.query) {
                var queryLanguages = language ? [language.split('-')[0]] : undefined;
                helper.setQueryParameter('queryLanguages', queryLanguages);
                if (typeof additionalQueryParameters === 'function') {
                  helper.setState(helper.state.setQueryParameters(_objectSpread2({
                    ignorePlurals: true,
                    removeStopWords: true,
                    // @ts-ignore (optionalWords only allows array in v3, while string is also valid)
                    optionalWords: query
                  }, additionalQueryParameters({
                    query: query
                  }))));
                }
                helper.setQuery(query).search();
              }
            };
          }
          if (!this._voiceSearchHelper) {
            this._voiceSearchHelper = createVoiceSearchHelper$1({
              searchAsYouSpeak: searchAsYouSpeak,
              language: language,
              onQueryChange: function onQueryChange(query) {
                return _this._refine(query);
              },
              onStateChange: function onStateChange() {
                renderFn(_objectSpread2(_objectSpread2({}, _this.getWidgetRenderState(renderOptions)), {}, {
                  instantSearchInstance: instantSearchInstance
                }), false);
              }
            });
          }
          var _voiceSearchHelper = this._voiceSearchHelper,
            isBrowserSupported = _voiceSearchHelper.isBrowserSupported,
            isListening = _voiceSearchHelper.isListening,
            startListening = _voiceSearchHelper.startListening,
            stopListening = _voiceSearchHelper.stopListening,
            getState = _voiceSearchHelper.getState;
          return {
            isBrowserSupported: isBrowserSupported(),
            isListening: isListening(),
            toggleListening: function toggleListening() {
              if (!isBrowserSupported()) {
                return;
              }
              if (isListening()) {
                stopListening();
              } else {
                startListening();
              }
            },
            voiceListeningState: getState(),
            widgetParams: widgetParams
          };
        },
        dispose: function dispose(_ref) {
          var state = _ref.state;
          this._voiceSearchHelper.dispose();
          unmountFn();
          var newState = state;
          if (typeof additionalQueryParameters === 'function') {
            var additional = additionalQueryParameters({
              query: ''
            });
            var toReset = additional ? Object.keys(additional).reduce(function (acc, current) {
              // @ts-ignore search parameters is typed as readonly in v4
              acc[current] = undefined;
              return acc;
            }, {}) : {};
            newState = state.setQueryParameters(_objectSpread2({
              // @ts-ignore (queryLanguages is not added to algoliasearch v3)
              queryLanguages: undefined,
              ignorePlurals: undefined,
              removeStopWords: undefined,
              optionalWords: undefined
            }, toReset));
          }
          return newState.setQueryParameter('query', undefined);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref2) {
          var searchParameters = _ref2.searchParameters;
          var query = searchParameters.query || '';
          if (!query) {
            return uiState;
          }
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            query: query
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref3) {
          var uiState = _ref3.uiState;
          return searchParameters.setQueryParameter('query', uiState.query || '');
        }
      };
    };
  };

  var connectRelevantSort = function connectRelevantSort() {
    var renderFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    return function (widgetParams) {
      var connectorState = {};
      return {
        $$type: 'ais.relevantSort',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread2(_objectSpread2({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref) {
          var state = _ref.state;
          unmountFn();
          return state.setQueryParameter('relevancyStrictness', undefined);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread2(_objectSpread2({}, renderState), {}, {
            relevantSort: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref2) {
          var results = _ref2.results,
            helper = _ref2.helper;
          if (!connectorState.refine) {
            connectorState.refine = function (relevancyStrictness) {
              helper.setQueryParameter('relevancyStrictness', relevancyStrictness).search();
            };
          }
          var _ref3 = results || {},
            appliedRelevancyStrictness = _ref3.appliedRelevancyStrictness;
          var isVirtualReplica = appliedRelevancyStrictness !== undefined;
          return {
            isRelevantSorted: typeof appliedRelevancyStrictness !== 'undefined' && appliedRelevancyStrictness > 0,
            isVirtualReplica: isVirtualReplica,
            canRefine: isVirtualReplica,
            refine: connectorState.refine,
            widgetParams: widgetParams
          };
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref4) {
          var _uiState$relevantSort;
          var uiState = _ref4.uiState;
          return state.setQueryParameter('relevancyStrictness', (_uiState$relevantSort = uiState.relevantSort) !== null && _uiState$relevantSort !== void 0 ? _uiState$relevantSort : state.relevancyStrictness);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
          var searchParameters = _ref5.searchParameters;
          return _objectSpread2(_objectSpread2({}, uiState), {}, {
            relevantSort: searchParameters.relevancyStrictness || uiState.relevantSort
          });
        }
      };
    };
  };

  /** @deprecated answers is no longer supported */
  var EXPERIMENTAL_connectAnswers = deprecate(connectAnswers, 'answers is no longer supported');

  /** @deprecated use connectDynamicWidgets */
  var EXPERIMENTAL_connectDynamicWidgets = deprecate(connectDynamicWidgets, 'use connectDynamicWidgets');

  var connectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    EXPERIMENTAL_connectAnswers: EXPERIMENTAL_connectAnswers,
    EXPERIMENTAL_connectDynamicWidgets: EXPERIMENTAL_connectDynamicWidgets,
    connectDynamicWidgets: connectDynamicWidgets,
    connectClearRefinements: connectClearRefinements,
    connectCurrentRefinements: connectCurrentRefinements,
    connectHierarchicalMenu: connectHierarchicalMenu,
    connectHits: connectHits,
    connectHitsWithInsights: connectHitsWithInsights,
    connectHitsPerPage: connectHitsPerPage,
    connectInfiniteHits: connectInfiniteHits,
    connectInfiniteHitsWithInsights: connectInfiniteHitsWithInsights,
    connectMenu: connectMenu,
    connectNumericMenu: connectNumericMenu,
    connectPagination: connectPagination,
    connectRange: connectRange,
    connectRefinementList: connectRefinementList,
    connectSearchBox: connectSearchBox,
    connectSortBy: connectSortBy,
    connectRatingMenu: connectRatingMenu,
    connectStats: connectStats,
    connectToggleRefinement: connectToggleRefinement,
    connectBreadcrumb: connectBreadcrumb,
    connectGeoSearch: connectGeoSearch,
    connectPoweredBy: connectPoweredBy,
    connectConfigure: connectConfigure,
    EXPERIMENTAL_connectConfigureRelatedItems: connectConfigureRelatedItems,
    connectAutocomplete: connectAutocomplete,
    connectQueryRules: connectQueryRules,
    connectVoiceSearch: connectVoiceSearch,
    connectRelevantSort: connectRelevantSort
  });

  var NAMESPACE = 'ais';
  var component = function component(componentName) {
    return function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        descendantName = _ref.descendantName,
        modifierName = _ref.modifierName;
      var descendent = descendantName ? "-".concat(descendantName) : '';
      var modifier = modifierName ? "--".concat(modifierName) : '';
      return "".concat(NAMESPACE, "-").concat(componentName).concat(descendent).concat(modifier);
    };
  };

  var suit = component('Highlight');
  function highlight(_ref) {
    var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
    var highlightAttributeResult = getPropertyByPath(hit._highlightResult, attribute);

    // @MAJOR fallback to attribute value if highlight is not found
     _warning(highlightAttributeResult, "Could not enable highlight for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n")) ;
    var _ref2 = highlightAttributeResult || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value;

    // cx is not used, since it would be bundled as a dependency for Vue & Angular
    var className = suit({
      descendantName: 'highlighted'
    }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
    return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
  }

  var suit$1 = component('ReverseHighlight');
  function reverseHighlight(_ref) {
    var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
    var highlightAttributeResult = getPropertyByPath(hit._highlightResult, attribute);

    // @MAJOR fallback to attribute value if highlight is not found
     _warning(highlightAttributeResult, "Could not enable reverse highlight for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n")) ;
    var _ref2 = highlightAttributeResult || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value;

    // cx is not used, since it would be bundled as a dependency for Vue & Angular
    var className = suit$1({
      descendantName: 'highlighted'
    }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
    var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
    return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
  }

  var suit$2 = component('Snippet');
  function snippet(_ref) {
    var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
    var snippetAttributeResult = getPropertyByPath(hit._snippetResult, attribute);

    // @MAJOR fallback to attribute value if snippet is not found
     _warning(snippetAttributeResult, "Could not enable snippet for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) ;
    var _ref2 = snippetAttributeResult || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value;

    // cx is not used, since it would be bundled as a dependency for Vue & Angular
    var className = suit$2({
      descendantName: 'highlighted'
    }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
    return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
  }

  var suit$3 = component('ReverseSnippet');
  function reverseSnippet(_ref) {
    var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
    var snippetAttributeResult = getPropertyByPath(hit._snippetResult, attribute);

    // @MAJOR fallback to attribute value if snippet is not found
     _warning(snippetAttributeResult, "Could not enable reverse snippet for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) ;
    var _ref2 = snippetAttributeResult || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value;

    // cx is not used, since it would be bundled as a dependency for Vue & Angular
    var className = suit$3({
      descendantName: 'highlighted'
    }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
    var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
    return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
  }

  var ANONYMOUS_TOKEN_COOKIE_KEY = '_ALGOLIA';
  function getCookie(name) {
    if ((typeof document === "undefined" ? "undefined" : _typeof(document)) !== 'object' || typeof document.cookie !== 'string') {
      return undefined;
    }
    var prefix = "".concat(name, "=");
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(prefix) === 0) {
        return cookie.substring(prefix.length, cookie.length);
      }
    }
    return undefined;
  }
  function getInsightsAnonymousUserTokenInternal() {
    return getCookie(ANONYMOUS_TOKEN_COOKIE_KEY);
  }

  var _excluded$5 = ["page"];
  function getStateWithoutPage$1(state) {
    var _ref = state || {},
      page = _ref.page,
      rest = _objectWithoutProperties(_ref, _excluded$5);
    return rest;
  }
  var KEY = 'ais.infiniteHits';
  function createInfiniteHitsSessionStorageCache() {
    return {
      read: function read(_ref2) {
        var state = _ref2.state;
        var sessionStorage = safelyRunOnBrowser(function (_ref3) {
          var window = _ref3.window;
          return window.sessionStorage;
        });
        if (!sessionStorage) {
          return null;
        }
        try {
          var cache = JSON.parse(
          // @ts-expect-error JSON.parse() requires a string, but it actually accepts null, too.
          sessionStorage.getItem(KEY));
          return cache && isEqual(cache.state, getStateWithoutPage$1(state)) ? cache.hits : null;
        } catch (error) {
          if (error instanceof SyntaxError) {
            try {
              sessionStorage.removeItem(KEY);
            } catch (err) {
              // do nothing
            }
          }
          return null;
        }
      },
      write: function write(_ref4) {
        var state = _ref4.state,
          hits = _ref4.hits;
        var sessionStorage = safelyRunOnBrowser(function (_ref5) {
          var window = _ref5.window;
          return window.sessionStorage;
        });
        if (!sessionStorage) {
          return;
        }
        try {
          sessionStorage.setItem(KEY, JSON.stringify({
            state: getStateWithoutPage$1(state),
            hits: hits
          }));
        } catch (error) {
          // do nothing
        }
      }
    };
  }

  function extractPayload(widgets, instantSearchInstance, payload) {
    var initOptions = createInitArgs(instantSearchInstance, instantSearchInstance.mainIndex, instantSearchInstance._initialUiState);
    widgets.forEach(function (widget) {
      var widgetParams = {};
      if (widget.getWidgetRenderState) {
        var renderState = widget.getWidgetRenderState(initOptions);
        if (renderState && renderState.widgetParams) {
          // casting, as we just earlier checked widgetParams exists, and thus an object
          widgetParams = renderState.widgetParams;
        }
      }

      // since we destructure in all widgets, the parameters with defaults are set to "undefined"
      var params = Object.keys(widgetParams).filter(function (key) {
        return widgetParams[key] !== undefined;
      });
      payload.widgets.push({
        type: widget.$$type,
        widgetType: widget.$$widgetType,
        params: params
      });
      if (widget.$$type === 'ais.index') {
        extractPayload(widget.getWidgets(), instantSearchInstance, payload);
      }
    });
  }
  function isMetadataEnabled() {
    return safelyRunOnBrowser(function (_ref) {
      var _window$navigator, _window$navigator$use;
      var window = _ref.window;
      return ((_window$navigator = window.navigator) === null || _window$navigator === void 0 ? void 0 : (_window$navigator$use = _window$navigator.userAgent) === null || _window$navigator$use === void 0 ? void 0 : _window$navigator$use.indexOf('Algolia Crawler')) > -1;
    }, {
      fallback: function fallback() {
        return false;
      }
    });
  }

  /**
   * Exposes the metadata of mounted widgets in a custom
   * `<meta name="instantsearch:widgets" />` tag. The metadata per widget is:
   * - applied parameters
   * - widget name
   * - connector name
   */
  function createMetadataMiddleware() {
    return function (_ref2) {
      var instantSearchInstance = _ref2.instantSearchInstance;
      var payload = {
        widgets: []
      };
      var payloadContainer = document.createElement('meta');
      var refNode = document.querySelector('head');
      payloadContainer.name = 'instantsearch:widgets';
      return {
        onStateChange: function onStateChange() {},
        subscribe: function subscribe() {
          // using setTimeout here to delay extraction until widgets have been added in a tick (e.g. Vue)
          setTimeout(function () {
            var client = instantSearchInstance.client;
            payload.ua = client.transporter && client.transporter.userAgent ? client.transporter.userAgent.value : client._ua;
            extractPayload(instantSearchInstance.mainIndex.getWidgets(), instantSearchInstance, payload);
            payloadContainer.content = JSON.stringify(payload);
            refNode.appendChild(payloadContainer);
          }, 0);
        },
        started: function started() {},
        unsubscribe: function unsubscribe() {
          payloadContainer.remove();
        }
      };
    };
  }

  var replace = String.prototype.replace;
  var percentTwenties = /%20/g;

  var Format = {
      RFC1738: 'RFC1738',
      RFC3986: 'RFC3986'
  };

  var formats = {
      'default': Format.RFC3986,
      formatters: {
          RFC1738: function (value) {
              return replace.call(value, percentTwenties, '+');
          },
          RFC3986: function (value) {
              return String(value);
          }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
  };

  var has = Object.prototype.hasOwnProperty;
  var isArray = Array.isArray;

  var hexTable = (function () {
      var array = [];
      for (var i = 0; i < 256; ++i) {
          array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
      }

      return array;
  }());

  var compactQueue = function compactQueue(queue) {
      while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];

          if (isArray(obj)) {
              var compacted = [];

              for (var j = 0; j < obj.length; ++j) {
                  if (typeof obj[j] !== 'undefined') {
                      compacted.push(obj[j]);
                  }
              }

              item.obj[item.prop] = compacted;
          }
      }
  };

  var arrayToObject = function arrayToObject(source, options) {
      var obj = options && options.plainObjects ? Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== 'undefined') {
              obj[i] = source[i];
          }
      }

      return obj;
  };

  var merge$1 = function merge(target, source, options) {
      /* eslint no-param-reassign: 0 */
      if (!source) {
          return target;
      }

      if (typeof source !== 'object') {
          if (isArray(target)) {
              target.push(source);
          } else if (target && typeof target === 'object') {
              if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                  target[source] = true;
              }
          } else {
              return [target, source];
          }

          return target;
      }

      if (!target || typeof target !== 'object') {
          return [target].concat(source);
      }

      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
          mergeTarget = arrayToObject(target, options);
      }

      if (isArray(target) && isArray(source)) {
          source.forEach(function (item, i) {
              if (has.call(target, i)) {
                  var targetItem = target[i];
                  if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                      target[i] = merge(targetItem, item, options);
                  } else {
                      target.push(item);
                  }
              } else {
                  target[i] = item;
              }
          });
          return target;
      }

      return Object.keys(source).reduce(function (acc, key) {
          var value = source[key];

          if (has.call(acc, key)) {
              acc[key] = merge(acc[key], value, options);
          } else {
              acc[key] = value;
          }
          return acc;
      }, mergeTarget);
  };

  var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function (acc, key) {
          acc[key] = source[key];
          return acc;
      }, target);
  };

  var decode = function (str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, ' ');
      if (charset === 'iso-8859-1') {
          // unescape never throws, no try...catch needed:
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      // utf-8
      try {
          return decodeURIComponent(strWithoutPlus);
      } catch (e) {
          return strWithoutPlus;
      }
  };

  var encode = function encode(str, defaultEncoder, charset, kind, format) {
      // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
      // It has been adapted here for stricter adherence to RFC 3986
      if (str.length === 0) {
          return str;
      }

      var string = str;
      if (typeof str === 'symbol') {
          string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== 'string') {
          string = String(str);
      }

      if (charset === 'iso-8859-1') {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
              return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
          });
      }

      var out = '';
      for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);

          if (
              c === 0x2D // -
              || c === 0x2E // .
              || c === 0x5F // _
              || c === 0x7E // ~
              || (c >= 0x30 && c <= 0x39) // 0-9
              || (c >= 0x41 && c <= 0x5A) // a-z
              || (c >= 0x61 && c <= 0x7A) // A-Z
              || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
          ) {
              out += string.charAt(i);
              continue;
          }

          if (c < 0x80) {
              out = out + hexTable[c];
              continue;
          }

          if (c < 0x800) {
              out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          if (c < 0xD800 || c >= 0xE000) {
              out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          i += 1;
          c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
          /* eslint operator-linebreak: [2, "before"] */
          out += hexTable[0xF0 | (c >> 18)]
              + hexTable[0x80 | ((c >> 12) & 0x3F)]
              + hexTable[0x80 | ((c >> 6) & 0x3F)]
              + hexTable[0x80 | (c & 0x3F)];
      }

      return out;
  };

  var compact$1 = function compact(value) {
      var queue = [{ obj: { o: value }, prop: 'o' }];
      var refs = [];

      for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];

          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
              var key = keys[j];
              var val = obj[key];
              if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                  queue.push({ obj: obj, prop: key });
                  refs.push(val);
              }
          }
      }

      compactQueue(queue);

      return value;
  };

  var isRegExp = function isRegExp(obj) {
      return Object.prototype.toString.call(obj) === '[object RegExp]';
  };

  var isBuffer = function isBuffer(obj) {
      if (!obj || typeof obj !== 'object') {
          return false;
      }

      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };

  var combine = function combine(a, b) {
      return [].concat(a, b);
  };

  var maybeMap = function maybeMap(val, fn) {
      if (isArray(val)) {
          var mapped = [];
          for (var i = 0; i < val.length; i += 1) {
              mapped.push(fn(val[i]));
          }
          return mapped;
      }
      return fn(val);
  };

  var utils = {
      arrayToObject: arrayToObject,
      assign: assign,
      combine: combine,
      compact: compact$1,
      decode: decode,
      encode: encode,
      isBuffer: isBuffer,
      isRegExp: isRegExp,
      maybeMap: maybeMap,
      merge: merge$1
  };

  var has$1 = Object.prototype.hasOwnProperty;

  var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
          return prefix + '[]';
      },
      comma: 'comma',
      indices: function indices(prefix, key) {
          return prefix + '[' + key + ']';
      },
      repeat: function repeat(prefix) {
          return prefix;
      }
  };

  var isArray$1 = Array.isArray;
  var split = String.prototype.split;
  var push = Array.prototype.push;
  var pushToArray = function (arr, valueOrArray) {
      push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
  };

  var toISO = Date.prototype.toISOString;

  var defaultFormat = formats['default'];
  var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: 'utf-8',
      charsetSentinel: false,
      delimiter: '&',
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
          return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
  };

  var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
      return typeof v === 'string'
          || typeof v === 'number'
          || typeof v === 'boolean'
          || typeof v === 'symbol'
          || typeof v === 'bigint';
  };

  var stringify = function stringify(
      object,
      prefix,
      generateArrayPrefix,
      strictNullHandling,
      skipNulls,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset
  ) {
      var obj = object;
      if (typeof filter === 'function') {
          obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
          obj = serializeDate(obj);
      } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
          obj = utils.maybeMap(obj, function (value) {
              if (value instanceof Date) {
                  return serializeDate(value);
              }
              return value;
          });
      }

      if (obj === null) {
          if (strictNullHandling) {
              return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
          }

          obj = '';
      }

      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
          if (encoder) {
              var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
              if (generateArrayPrefix === 'comma' && encodeValuesOnly) {
                  var valuesArray = split.call(String(obj), ',');
                  var valuesJoined = '';
                  for (var i = 0; i < valuesArray.length; ++i) {
                      valuesJoined += (i === 0 ? '' : ',') + formatter(encoder(valuesArray[i], defaults.encoder, charset, 'value', format));
                  }
                  return [formatter(keyValue) + '=' + valuesJoined];
              }
              return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
          }
          return [formatter(prefix) + '=' + formatter(String(obj))];
      }

      var values = [];

      if (typeof obj === 'undefined') {
          return values;
      }

      var objKeys;
      if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
          // we need to join elements in
          objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
      } else if (isArray$1(filter)) {
          objKeys = filter;
      } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
      }

      for (var j = 0; j < objKeys.length; ++j) {
          var key = objKeys[j];
          var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

          if (skipNulls && value === null) {
              continue;
          }

          var keyPrefix = isArray$1(obj)
              ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
              : prefix + (allowDots ? '.' + key : '[' + key + ']');

          pushToArray(values, stringify(
              value,
              keyPrefix,
              generateArrayPrefix,
              strictNullHandling,
              skipNulls,
              encoder,
              filter,
              sort,
              allowDots,
              serializeDate,
              format,
              formatter,
              encodeValuesOnly,
              charset
          ));
      }

      return values;
  };

  var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
      if (!opts) {
          return defaults;
      }

      if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
          throw new TypeError('Encoder has to be a function.');
      }

      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }

      var format = formats['default'];
      if (typeof opts.format !== 'undefined') {
          if (!has$1.call(formats.formatters, opts.format)) {
              throw new TypeError('Unknown format option provided.');
          }
          format = opts.format;
      }
      var formatter = formats.formatters[format];

      var filter = defaults.filter;
      if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
          filter = opts.filter;
      }

      return {
          addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
          allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
          delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
          encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
          encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
          filter: filter,
          format: format,
          formatter: formatter,
          serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
          skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
          sort: typeof opts.sort === 'function' ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
      };
  };

  var stringify_1 = function (object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);

      var objKeys;
      var filter;

      if (typeof options.filter === 'function') {
          filter = options.filter;
          obj = filter('', obj);
      } else if (isArray$1(options.filter)) {
          filter = options.filter;
          objKeys = filter;
      }

      var keys = [];

      if (typeof obj !== 'object' || obj === null) {
          return '';
      }

      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
      } else if (opts && 'indices' in opts) {
          arrayFormat = opts.indices ? 'indices' : 'repeat';
      } else {
          arrayFormat = 'indices';
      }

      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

      if (!objKeys) {
          objKeys = Object.keys(obj);
      }

      if (options.sort) {
          objKeys.sort(options.sort);
      }

      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (options.skipNulls && obj[key] === null) {
              continue;
          }
          pushToArray(keys, stringify(
              obj[key],
              key,
              generateArrayPrefix,
              options.strictNullHandling,
              options.skipNulls,
              options.encode ? options.encoder : null,
              options.filter,
              options.sort,
              options.allowDots,
              options.serializeDate,
              options.format,
              options.formatter,
              options.encodeValuesOnly,
              options.charset
          ));
      }

      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? '?' : '';

      if (options.charsetSentinel) {
          if (options.charset === 'iso-8859-1') {
              // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
              prefix += 'utf8=%26%2310003%3B&';
          } else {
              // encodeURIComponent('✓')
              prefix += 'utf8=%E2%9C%93&';
          }
      }

      return joined.length > 0 ? prefix + joined : '';
  };

  var has$2 = Object.prototype.hasOwnProperty;
  var isArray$2 = Array.isArray;

  var defaults$1 = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      charset: 'utf-8',
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: '&',
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1000,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
  };

  var interpretNumericEntities = function (str) {
      return str.replace(/&#(\d+);/g, function ($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
      });
  };

  var parseArrayValue = function (val, options) {
      if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
          return val.split(',');
      }

      return val;
  };

  // This is what browsers will submit when the ✓ character occurs in an
  // application/x-www-form-urlencoded body and the encoding of the page containing
  // the form is iso-8859-1, or when the submitted form has an accept-charset
  // attribute of iso-8859-1. Presumably also with other charsets that do not contain
  // the ✓ character, such as us-ascii.
  var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

  // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
  var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

  var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
      var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1; // Keep track of where the utf8 sentinel was found
      var i;

      var charset = options.charset;
      if (options.charsetSentinel) {
          for (i = 0; i < parts.length; ++i) {
              if (parts[i].indexOf('utf8=') === 0) {
                  if (parts[i] === charsetSentinel) {
                      charset = 'utf-8';
                  } else if (parts[i] === isoSentinel) {
                      charset = 'iso-8859-1';
                  }
                  skipIndex = i;
                  i = parts.length; // The eslint settings do not allow break;
              }
          }
      }

      for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) {
              continue;
          }
          var part = parts[i];

          var bracketEqualsPos = part.indexOf(']=');
          var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

          var key, val;
          if (pos === -1) {
              key = options.decoder(part, defaults$1.decoder, charset, 'key');
              val = options.strictNullHandling ? null : '';
          } else {
              key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
              val = utils.maybeMap(
                  parseArrayValue(part.slice(pos + 1), options),
                  function (encodedVal) {
                      return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
                  }
              );
          }

          if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
              val = interpretNumericEntities(val);
          }

          if (part.indexOf('[]=') > -1) {
              val = isArray$2(val) ? [val] : val;
          }

          if (has$2.call(obj, key)) {
              obj[key] = utils.combine(obj[key], val);
          } else {
              obj[key] = val;
          }
      }

      return obj;
  };

  var parseObject = function (chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);

      for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];

          if (root === '[]' && options.parseArrays) {
              obj = [].concat(leaf);
          } else {
              obj = options.plainObjects ? Object.create(null) : {};
              var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
              var index = parseInt(cleanRoot, 10);
              if (!options.parseArrays && cleanRoot === '') {
                  obj = { 0: leaf };
              } else if (
                  !isNaN(index)
                  && root !== cleanRoot
                  && String(index) === cleanRoot
                  && index >= 0
                  && (options.parseArrays && index <= options.arrayLimit)
              ) {
                  obj = [];
                  obj[index] = leaf;
              } else if (cleanRoot !== '__proto__') {
                  obj[cleanRoot] = leaf;
              }
          }

          leaf = obj;
      }

      return leaf;
  };

  var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
          return;
      }

      // Transform dot notation to bracket notation
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

      // The regex chunks

      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;

      // Get the parent

      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;

      // Stash the parent if it exists

      var keys = [];
      if (parent) {
          // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
          if (!options.plainObjects && has$2.call(Object.prototype, parent)) {
              if (!options.allowPrototypes) {
                  return;
              }
          }

          keys.push(parent);
      }

      // Loop through children appending to the array until we hit depth

      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has$2.call(Object.prototype, segment[1].slice(1, -1))) {
              if (!options.allowPrototypes) {
                  return;
              }
          }
          keys.push(segment[1]);
      }

      // If there's a remainder, just add whatever is left

      if (segment) {
          keys.push('[' + key.slice(segment.index) + ']');
      }

      return parseObject(keys, val, options, valuesParsed);
  };

  var normalizeParseOptions = function normalizeParseOptions(opts) {
      if (!opts) {
          return defaults$1;
      }

      if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
          throw new TypeError('Decoder has to be a function.');
      }

      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }
      var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;

      return {
          allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
          allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
          arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
          comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
          decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
          delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
          // eslint-disable-next-line no-implicit-coercion, no-extra-parens
          depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults$1.depth,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
      };
  };

  var parse = function (str, opts) {
      var options = normalizeParseOptions(opts);

      if (str === '' || str === null || typeof str === 'undefined') {
          return options.plainObjects ? Object.create(null) : {};
      }

      var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
      var obj = options.plainObjects ? Object.create(null) : {};

      // Iterate over the keys and setup the new object

      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
          obj = utils.merge(obj, newObj, options);
      }

      return utils.compact(obj);
  };

  var lib$1 = {
      formats: formats,
      parse: parse,
      stringify: stringify_1
  };

  var setWindowTitle = function setWindowTitle(title) {
    if (title) {
      // This function is only executed on browsers so we can disable this check.
      // eslint-disable-next-line no-restricted-globals
      window.document.title = title;
    }
  };
  var BrowserHistory = /*#__PURE__*/function () {
    /**
     * Initializes a new storage provider that syncs the search state to the URL
     * using web APIs (`window.location.pushState` and `onpopstate` event).
     */
    function BrowserHistory(_ref) {
      var _this = this;
      var windowTitle = _ref.windowTitle,
        _ref$writeDelay = _ref.writeDelay,
        writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay,
        createURL = _ref.createURL,
        parseURL = _ref.parseURL,
        getLocation = _ref.getLocation,
        start = _ref.start,
        dispose = _ref.dispose,
        push = _ref.push;
      _classCallCheck(this, BrowserHistory);
      _defineProperty(this, "windowTitle", void 0);
      _defineProperty(this, "writeDelay", void 0);
      _defineProperty(this, "_createURL", void 0);
      _defineProperty(this, "parseURL", void 0);
      _defineProperty(this, "getLocation", void 0);
      _defineProperty(this, "writeTimer", void 0);
      _defineProperty(this, "inPopState", false);
      _defineProperty(this, "isDisposed", false);
      _defineProperty(this, "latestAcknowledgedHistory", 0);
      _defineProperty(this, "_start", void 0);
      _defineProperty(this, "_dispose", void 0);
      _defineProperty(this, "_push", void 0);
      this.windowTitle = windowTitle;
      this.writeTimer = undefined;
      this.writeDelay = writeDelay;
      this._createURL = createURL;
      this.parseURL = parseURL;
      this.getLocation = getLocation;
      this._start = start;
      this._dispose = dispose;
      this._push = push;
      safelyRunOnBrowser(function (_ref2) {
        var window = _ref2.window;
        var title = _this.windowTitle && _this.windowTitle(_this.read());
        setWindowTitle(title);
        _this.latestAcknowledgedHistory = window.history.length;
      });
    }

    /**
     * Reads the URL and returns a syncable UI search state.
     */
    _createClass(BrowserHistory, [{
      key: "read",
      value: function read() {
        return this.parseURL({
          qsModule: lib$1,
          location: this.getLocation()
        });
      }

      /**
       * Pushes a search state into the URL.
       */
    }, {
      key: "write",
      value: function write(routeState) {
        var _this2 = this;
        safelyRunOnBrowser(function (_ref3) {
          var window = _ref3.window;
          var url = _this2.createURL(routeState);
          var title = _this2.windowTitle && _this2.windowTitle(routeState);
          if (_this2.writeTimer) {
            clearTimeout(_this2.writeTimer);
          }
          _this2.writeTimer = setTimeout(function () {
            setWindowTitle(title);
            if (_this2.shouldWrite(url)) {
              if (_this2._push) {
                _this2._push(url);
              } else {
                window.history.pushState(routeState, title || '', url);
              }
              _this2.latestAcknowledgedHistory = window.history.length;
            }
            _this2.inPopState = false;
            _this2.writeTimer = undefined;
          }, _this2.writeDelay);
        });
      }

      /**
       * Sets a callback on the `onpopstate` event of the history API of the current page.
       * It enables the URL sync to keep track of the changes.
       */
    }, {
      key: "onUpdate",
      value: function onUpdate(callback) {
        var _this3 = this;
        if (this._start) {
          this._start(function () {
            callback(_this3.read());
          });
        }
        this._onPopState = function () {
          if (_this3.writeTimer) {
            clearTimeout(_this3.writeTimer);
            _this3.writeTimer = undefined;
          }
          _this3.inPopState = true;

          // We always read the state from the URL because the state of the history
          // can be incorect in some cases (e.g. using React Router).
          callback(_this3.read());
        };
        safelyRunOnBrowser(function (_ref4) {
          var window = _ref4.window;
          window.addEventListener('popstate', _this3._onPopState);
        });
      }

      /**
       * Creates a complete URL from a given syncable UI state.
       *
       * It always generates the full URL, not a relative one.
       * This allows to handle cases like using a <base href>.
       * See: https://github.com/algolia/instantsearch.js/issues/790
       */
    }, {
      key: "createURL",
      value: function createURL(routeState) {
        return this._createURL({
          qsModule: lib$1,
          routeState: routeState,
          location: this.getLocation()
        });
      }

      /**
       * Removes the event listener and cleans up the URL.
       */
    }, {
      key: "dispose",
      value: function dispose() {
        var _this4 = this;
        if (this._dispose) {
          this._dispose();
        }
        this.isDisposed = true;
        safelyRunOnBrowser(function (_ref5) {
          var window = _ref5.window;
          if (_this4._onPopState) {
            window.removeEventListener('popstate', _this4._onPopState);
          }
        });
        if (this.writeTimer) {
          clearTimeout(this.writeTimer);
        }
        this.write({});
      }
    }, {
      key: "start",
      value: function start() {
        this.isDisposed = false;
      }
    }, {
      key: "shouldWrite",
      value: function shouldWrite(url) {
        var _this5 = this;
        return safelyRunOnBrowser(function (_ref6) {
          var window = _ref6.window;
          // We do want to `pushState` if:
          // - the router is not disposed, IS.js needs to update the URL
          // OR
          // - the last write was from InstantSearch.js
          // (unlike a SPA, where it would have last written)
          var lastPushWasByISAfterDispose = !(_this5.isDisposed && _this5.latestAcknowledgedHistory !== window.history.length);
          return (
            // When the last state change was through popstate, the IS.js state changes,
            // but that should not write the URL.
            !_this5.inPopState &&
            // When the previous pushState after dispose was by IS.js, we want to write the URL.
            lastPushWasByISAfterDispose &&
            // When the URL is the same as the current one, we do not want to write it.
            url !== window.location.href
          );
        });
      }
    }]);
    return BrowserHistory;
  }();
  function historyRouter() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref7$createURL = _ref7.createURL,
      createURL = _ref7$createURL === void 0 ? function (_ref8) {
        var qsModule = _ref8.qsModule,
          routeState = _ref8.routeState,
          location = _ref8.location;
        var protocol = location.protocol,
          hostname = location.hostname,
          _location$port = location.port,
          port = _location$port === void 0 ? '' : _location$port,
          pathname = location.pathname,
          hash = location.hash;
        var queryString = qsModule.stringify(routeState);
        var portWithPrefix = port === '' ? '' : ":".concat(port);

        // IE <= 11 has no proper `location.origin` so we cannot rely on it.
        if (!queryString) {
          return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname).concat(hash);
        }
        return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname, "?").concat(queryString).concat(hash);
      } : _ref7$createURL,
      _ref7$parseURL = _ref7.parseURL,
      parseURL = _ref7$parseURL === void 0 ? function (_ref9) {
        var qsModule = _ref9.qsModule,
          location = _ref9.location;
        // `qs` by default converts arrays with more than 20 items to an object.
        // We want to avoid this because the data structure manipulated can therefore vary.
        // Setting the limit to `100` seems a good number because the engine's default is 100
        // (it can go up to 1000 but it is very unlikely to select more than 100 items in the UI).
        //
        // Using an `arrayLimit` of `n` allows `n + 1` items.
        //
        // See:
        //   - https://github.com/ljharb/qs#parsing-arrays
        //   - https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/
        return qsModule.parse(location.search.slice(1), {
          arrayLimit: 99
        });
      } : _ref7$parseURL,
      _ref7$writeDelay = _ref7.writeDelay,
      writeDelay = _ref7$writeDelay === void 0 ? 400 : _ref7$writeDelay,
      windowTitle = _ref7.windowTitle,
      _ref7$getLocation = _ref7.getLocation,
      getLocation = _ref7$getLocation === void 0 ? function () {
        return safelyRunOnBrowser(function (_ref10) {
          var window = _ref10.window;
          return window.location;
        }, {
          fallback: function fallback() {
            throw new Error('You need to provide `getLocation` to the `history` router in environments where `window` does not exist.');
          }
        });
      } : _ref7$getLocation,
      start = _ref7.start,
      dispose = _ref7.dispose,
      push = _ref7.push;
    return new BrowserHistory({
      createURL: createURL,
      parseURL: parseURL,
      writeDelay: writeDelay,
      windowTitle: windowTitle,
      getLocation: getLocation,
      start: start,
      dispose: dispose,
      push: push
    });
  }

  var _excluded$6 = ["configure"];
  function getIndexStateWithoutConfigure(uiState) {
    var configure = uiState.configure,
      trackedUiState = _objectWithoutProperties(uiState, _excluded$6);
    return trackedUiState;
  }

  // technically a URL could contain any key, since users provide it,
  // which is why the input to this function is UiState, not something
  // which excludes "configure" as this function does.
  function simpleStateMapping() {
    return {
      stateToRoute: function stateToRoute(uiState) {
        return Object.keys(uiState).reduce(function (state, indexId) {
          return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, indexId, getIndexStateWithoutConfigure(uiState[indexId])));
        }, {});
      },
      routeToState: function routeToState() {
        var routeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return Object.keys(routeState).reduce(function (state, indexId) {
          return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, indexId, getIndexStateWithoutConfigure(routeState[indexId])));
        }, {});
      }
    };
  }

  var createRouterMiddleware = function createRouterMiddleware() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _props$router = props.router,
      router = _props$router === void 0 ? historyRouter() : _props$router,
      _props$stateMapping = props.stateMapping,
      stateMapping = _props$stateMapping === void 0 ? simpleStateMapping() : _props$stateMapping;
    return function (_ref) {
      var instantSearchInstance = _ref.instantSearchInstance;
      function topLevelCreateURL(nextState) {
        var uiState = Object.keys(nextState).reduce(function (acc, indexId) {
          return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, indexId, nextState[indexId]));
        }, instantSearchInstance.mainIndex.getWidgetUiState({}));
        var route = stateMapping.stateToRoute(uiState);
        return router.createURL(route);
      }

      // casting to UiState here to keep createURL unaware of custom UiState
      // (as long as it's an object, it's ok)
      instantSearchInstance._createURL = topLevelCreateURL;
      var lastRouteState = undefined;
      var initialUiState = instantSearchInstance._initialUiState;
      return {
        onStateChange: function onStateChange(_ref2) {
          var uiState = _ref2.uiState;
          var routeState = stateMapping.stateToRoute(uiState);
          if (lastRouteState === undefined || !isEqual(lastRouteState, routeState)) {
            router.write(routeState);
            lastRouteState = routeState;
          }
        },
        subscribe: function subscribe() {
          instantSearchInstance._initialUiState = _objectSpread2(_objectSpread2({}, initialUiState), stateMapping.routeToState(router.read()));
          router.onUpdate(function (route) {
            instantSearchInstance.setUiState(stateMapping.routeToState(route));
          });
        },
        started: function started() {
          var _router$start;
          (_router$start = router.start) === null || _router$start === void 0 ? void 0 : _router$start.call(router);
        },
        unsubscribe: function unsubscribe() {
          router.dispose();
        }
      };
    };
  };

  var _excluded$7 = ["initialSearchParameters"];
  var withUsage$q = createDocumentationMessageGenerator({
    name: 'index-widget'
  });
  /**
   * This is the same content as helper._change / setState, but allowing for extra
   * UiState to be synchronized.
   * see: https://github.com/algolia/algoliasearch-helper-js/blob/6b835ffd07742f2d6b314022cce6848f5cfecd4a/src/algoliasearch.helper.js#L1311-L1324
   */
  function privateHelperSetState(helper, _ref) {
    var state = _ref.state,
      isPageReset = _ref.isPageReset,
      _uiState = _ref._uiState;
    if (state !== helper.state) {
      helper.state = state;
      helper.emit('change', {
        state: helper.state,
        results: helper.lastResults,
        isPageReset: isPageReset,
        _uiState: _uiState
      });
    }
  }
  function getLocalWidgetsUiState(widgets, widgetStateOptions) {
    var initialUiState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return widgets.reduce(function (uiState, widget) {
      if (isIndexWidget(widget)) {
        return uiState;
      }
      if (!widget.getWidgetUiState && !widget.getWidgetState) {
        return uiState;
      }
      if (widget.getWidgetUiState) {
        return widget.getWidgetUiState(uiState, widgetStateOptions);
      }
      return widget.getWidgetState(uiState, widgetStateOptions);
    }, initialUiState);
  }
  function getLocalWidgetsSearchParameters(widgets, widgetSearchParametersOptions) {
    var initialSearchParameters = widgetSearchParametersOptions.initialSearchParameters,
      rest = _objectWithoutProperties(widgetSearchParametersOptions, _excluded$7);
    return widgets.filter(function (widget) {
      return !isIndexWidget(widget);
    }).reduce(function (state, widget) {
      if (!widget.getWidgetSearchParameters) {
        return state;
      }
      return widget.getWidgetSearchParameters(state, rest);
    }, initialSearchParameters);
  }
  function resetPageFromWidgets(widgets) {
    var indexWidgets = widgets.filter(isIndexWidget);
    if (indexWidgets.length === 0) {
      return;
    }
    indexWidgets.forEach(function (widget) {
      var widgetHelper = widget.getHelper();
      privateHelperSetState(widgetHelper, {
        state: widgetHelper.state.resetPage(),
        isPageReset: true
      });
      resetPageFromWidgets(widget.getWidgets());
    });
  }
  function resolveScopedResultsFromWidgets(widgets) {
    var indexWidgets = widgets.filter(isIndexWidget);
    return indexWidgets.reduce(function (scopedResults, current) {
      return scopedResults.concat.apply(scopedResults, [{
        indexId: current.getIndexId(),
        results: current.getResults(),
        helper: current.getHelper()
      }].concat(_toConsumableArray(resolveScopedResultsFromWidgets(current.getWidgets()))));
    }, []);
  }
  var index = function index(widgetParams) {
    if (widgetParams === undefined || widgetParams.indexName === undefined) {
      throw new Error(withUsage$q('The `indexName` option is required.'));
    }
    var indexName = widgetParams.indexName,
      _widgetParams$indexId = widgetParams.indexId,
      indexId = _widgetParams$indexId === void 0 ? indexName : _widgetParams$indexId;
    var localWidgets = [];
    var localUiState = {};
    var localInstantSearchInstance = null;
    var localParent = null;
    var helper = null;
    var derivedHelper = null;
    var lastValidSearchParameters = null;
    return {
      $$type: 'ais.index',
      $$widgetType: 'ais.index',
      getIndexName: function getIndexName() {
        return indexName;
      },
      getIndexId: function getIndexId() {
        return indexId;
      },
      getHelper: function getHelper() {
        return helper;
      },
      getResults: function getResults() {
        var _derivedHelper;
        if (!((_derivedHelper = derivedHelper) !== null && _derivedHelper !== void 0 && _derivedHelper.lastResults)) return null;

        // To make the UI optimistic, we patch the state to display to the current
        // one instead of the one associated with the latest results.
        // This means user-driven UI changes (e.g., checked checkbox) are reflected
        // immediately instead of waiting for Algolia to respond, regardless of
        // the status of the network request.
        derivedHelper.lastResults._state = helper.state;
        return derivedHelper.lastResults;
      },
      getPreviousState: function getPreviousState() {
        return lastValidSearchParameters;
      },
      getScopedResults: function getScopedResults() {
        var widgetParent = this.getParent();

        // If the widget is the root, we consider itself as the only sibling.
        var widgetSiblings = widgetParent ? widgetParent.getWidgets() : [this];
        return resolveScopedResultsFromWidgets(widgetSiblings);
      },
      getParent: function getParent() {
        return localParent;
      },
      createURL: function createURL(nextState) {
        return localInstantSearchInstance._createURL(_defineProperty({}, indexId, getLocalWidgetsUiState(localWidgets, {
          searchParameters: nextState,
          helper: helper
        })));
      },
      getWidgets: function getWidgets() {
        return localWidgets;
      },
      addWidgets: function addWidgets(widgets) {
        var _this = this;
        if (!Array.isArray(widgets)) {
          throw new Error(withUsage$q('The `addWidgets` method expects an array of widgets.'));
        }
        if (widgets.some(function (widget) {
          return typeof widget.init !== 'function' && typeof widget.render !== 'function';
        })) {
          throw new Error(withUsage$q('The widget definition expects a `render` and/or an `init` method.'));
        }
        localWidgets = localWidgets.concat(widgets);
        if (localInstantSearchInstance && Boolean(widgets.length)) {
          privateHelperSetState(helper, {
            state: getLocalWidgetsSearchParameters(localWidgets, {
              uiState: localUiState,
              initialSearchParameters: helper.state
            }),
            _uiState: localUiState
          });

          // We compute the render state before calling `init` in a separate loop
          // to construct the whole render state object that is then passed to
          // `init`.
          widgets.forEach(function (widget) {
            if (widget.getRenderState) {
              var renderState = widget.getRenderState(localInstantSearchInstance.renderState[_this.getIndexId()] || {}, createInitArgs(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
              storeRenderState({
                renderState: renderState,
                instantSearchInstance: localInstantSearchInstance,
                parent: _this
              });
            }
          });
          widgets.forEach(function (widget) {
            if (widget.init) {
              widget.init(createInitArgs(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
            }
          });
          localInstantSearchInstance.scheduleSearch();
        }
        return this;
      },
      removeWidgets: function removeWidgets(widgets) {
        var _this2 = this;
        if (!Array.isArray(widgets)) {
          throw new Error(withUsage$q('The `removeWidgets` method expects an array of widgets.'));
        }
        if (widgets.some(function (widget) {
          return typeof widget.dispose !== 'function';
        })) {
          throw new Error(withUsage$q('The widget definition expects a `dispose` method.'));
        }
        localWidgets = localWidgets.filter(function (widget) {
          return widgets.indexOf(widget) === -1;
        });
        if (localInstantSearchInstance && Boolean(widgets.length)) {
          var nextState = widgets.reduce(function (state, widget) {
            // the `dispose` method exists at this point we already assert it
            var next = widget.dispose({
              helper: helper,
              state: state,
              parent: _this2
            });
            return next || state;
          }, helper.state);
          localUiState = getLocalWidgetsUiState(localWidgets, {
            searchParameters: nextState,
            helper: helper
          });
          helper.setState(getLocalWidgetsSearchParameters(localWidgets, {
            uiState: localUiState,
            initialSearchParameters: nextState
          }));
          if (localWidgets.length) {
            localInstantSearchInstance.scheduleSearch();
          }
        }
        return this;
      },
      init: function init(_ref2) {
        var _this3 = this,
          _instantSearchInstanc;
        var instantSearchInstance = _ref2.instantSearchInstance,
          parent = _ref2.parent,
          uiState = _ref2.uiState;
        if (helper !== null) {
          // helper is already initialized, therefore we do not need to set up
          // any listeners
          return;
        }
        localInstantSearchInstance = instantSearchInstance;
        localParent = parent;
        localUiState = uiState[indexId] || {};

        // The `mainHelper` is already defined at this point. The instance is created
        // inside InstantSearch at the `start` method, which occurs before the `init`
        // step.
        var mainHelper = instantSearchInstance.mainHelper;
        var parameters = getLocalWidgetsSearchParameters(localWidgets, {
          uiState: localUiState,
          initialSearchParameters: new algoliasearchHelper_1.SearchParameters({
            index: indexName
          })
        });

        // This Helper is only used for state management we do not care about the
        // `searchClient`. Only the "main" Helper created at the `InstantSearch`
        // level is aware of the client.
        helper = algoliasearchHelper_1({}, parameters.index, parameters);

        // We forward the call to `search` to the "main" instance of the Helper
        // which is responsible for managing the queries (it's the only one that is
        // aware of the `searchClient`).
        helper.search = function () {
          if (instantSearchInstance.onStateChange) {
            instantSearchInstance.onStateChange({
              uiState: instantSearchInstance.mainIndex.getWidgetUiState({}),
              setUiState: function setUiState(nextState) {
                return instantSearchInstance.setUiState(nextState, false);
              }
            });

            // We don't trigger a search when controlled because it becomes the
            // responsibility of `setUiState`.
            return mainHelper;
          }
          return mainHelper.search();
        };
        helper.searchWithoutTriggeringOnStateChange = function () {
          return mainHelper.search();
        };

        // We use the same pattern for the `searchForFacetValues`.
        helper.searchForFacetValues = function (facetName, facetValue, maxFacetHits, userState) {
          var state = helper.state.setQueryParameters(userState);
          return mainHelper.searchForFacetValues(facetName, facetValue, maxFacetHits, state);
        };
        derivedHelper = mainHelper.derive(function () {
          return mergeSearchParameters.apply(void 0, _toConsumableArray(resolveSearchParameters(_this3)));
        });
        var indexInitialResults = (_instantSearchInstanc = instantSearchInstance._initialResults) === null || _instantSearchInstanc === void 0 ? void 0 : _instantSearchInstanc[this.getIndexId()];
        if (indexInitialResults) {
          // We restore the shape of the results provided to the instance to respect
          // the helper's structure.
          var results = new algoliasearchHelper_1.SearchResults(new algoliasearchHelper_1.SearchParameters(indexInitialResults.state), indexInitialResults.results);
          derivedHelper.lastResults = results;
          helper.lastResults = results;
        }

        // Subscribe to the Helper state changes for the page before widgets
        // are initialized. This behavior mimics the original one of the Helper.
        // It makes sense to replicate it at the `init` step. We have another
        // listener on `change` below, once `init` is done.
        helper.on('change', function (_ref3) {
          var isPageReset = _ref3.isPageReset;
          if (isPageReset) {
            resetPageFromWidgets(localWidgets);
          }
        });
        derivedHelper.on('search', function () {
          // The index does not manage the "staleness" of the search. This is the
          // responsibility of the main instance. It does not make sense to manage
          // it at the index level because it's either: all of them or none of them
          // that are stalled. The queries are performed into a single network request.
          instantSearchInstance.scheduleStalledRender();
          {
            checkIndexUiState({
              index: _this3,
              indexUiState: localUiState
            });
          }
        });
        derivedHelper.on('result', function (_ref4) {
          var results = _ref4.results;
          // The index does not render the results it schedules a new render
          // to let all the other indices emit their own results. It allows us to
          // run the render process in one pass.
          instantSearchInstance.scheduleRender();

          // the derived helper is the one which actually searches, but the helper
          // which is exposed e.g. via instance.helper, doesn't search, and thus
          // does not have access to lastResults, which it used to in pre-federated
          // search behavior.
          helper.lastResults = results;
          lastValidSearchParameters = results._state;
        });

        // We compute the render state before calling `init` in a separate loop
        // to construct the whole render state object that is then passed to
        // `init`.
        localWidgets.forEach(function (widget) {
          if (widget.getRenderState) {
            var renderState = widget.getRenderState(instantSearchInstance.renderState[_this3.getIndexId()] || {}, createInitArgs(instantSearchInstance, _this3, uiState));
            storeRenderState({
              renderState: renderState,
              instantSearchInstance: instantSearchInstance,
              parent: _this3
            });
          }
        });
        localWidgets.forEach(function (widget) {
           _warning(
          // if it has NO getWidgetState or if it has getWidgetUiState, we don't warn
          // aka we warn if there's _only_ getWidgetState
          !widget.getWidgetState || Boolean(widget.getWidgetUiState), 'The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead.') ;
          if (widget.init) {
            widget.init(createInitArgs(instantSearchInstance, _this3, uiState));
          }
        });

        // Subscribe to the Helper state changes for the `uiState` once widgets
        // are initialized. Until the first render, state changes are part of the
        // configuration step. This is mainly for backward compatibility with custom
        // widgets. When the subscription happens before the `init` step, the (static)
        // configuration of the widget is pushed in the URL. That's what we want to avoid.
        // https://github.com/algolia/instantsearch.js/pull/994/commits/4a672ae3fd78809e213de0368549ef12e9dc9454
        helper.on('change', function (event) {
          var state = event.state;
          var _uiState = event._uiState;
          localUiState = getLocalWidgetsUiState(localWidgets, {
            searchParameters: state,
            helper: helper
          }, _uiState || {});

          // We don't trigger an internal change when controlled because it
          // becomes the responsibility of `setUiState`.
          if (!instantSearchInstance.onStateChange) {
            instantSearchInstance.onInternalStateChange();
          }
        });
        if (indexInitialResults) {
          // If there are initial results, we're not notified of the next results
          // because we don't trigger an initial search. We therefore need to directly
          // schedule a render that will render the results injected on the helper.
          instantSearchInstance.scheduleRender();
        }
      },
      render: function render(_ref5) {
        var _this4 = this;
        var instantSearchInstance = _ref5.instantSearchInstance;
        if (!this.getResults()) {
          return;
        }

        // we can't attach a listener to the error event of search, as the error
        // then would no longer be thrown for global handlers.
        if (instantSearchInstance.status === 'error' && !instantSearchInstance.mainHelper.hasPendingRequests()) {
          helper.setState(lastValidSearchParameters);
        }
        localWidgets.forEach(function (widget) {
          if (widget.getRenderState) {
            var renderState = widget.getRenderState(instantSearchInstance.renderState[_this4.getIndexId()] || {}, createRenderArgs(instantSearchInstance, _this4));
            storeRenderState({
              renderState: renderState,
              instantSearchInstance: instantSearchInstance,
              parent: _this4
            });
          }
        });
        localWidgets.forEach(function (widget) {
          // At this point, all the variables used below are set. Both `helper`
          // and `derivedHelper` have been created at the `init` step. The attribute
          // `lastResults` might be `null` though. It's possible that a stalled render
          // happens before the result e.g with a dynamically added index the request might
          // be delayed. The render is triggered for the complete tree but some parts do
          // not have results yet.

          if (widget.render) {
            widget.render(createRenderArgs(instantSearchInstance, _this4));
          }
        });
      },
      dispose: function dispose() {
        var _this5 = this,
          _helper,
          _derivedHelper2;
        localWidgets.forEach(function (widget) {
          if (widget.dispose) {
            // The dispose function is always called once the instance is started
            // (it's an effect of `removeWidgets`). The index is initialized and
            // the Helper is available. We don't care about the return value of
            // `dispose` because the index is removed. We can't call `removeWidgets`
            // because we want to keep the widgets on the instance, to allow idempotent
            // operations on `add` & `remove`.
            widget.dispose({
              helper: helper,
              state: helper.state,
              parent: _this5
            });
          }
        });
        localInstantSearchInstance = null;
        localParent = null;
        (_helper = helper) === null || _helper === void 0 ? void 0 : _helper.removeAllListeners();
        helper = null;
        (_derivedHelper2 = derivedHelper) === null || _derivedHelper2 === void 0 ? void 0 : _derivedHelper2.detach();
        derivedHelper = null;
      },
      getWidgetUiState: function getWidgetUiState(uiState) {
        return localWidgets.filter(isIndexWidget).reduce(function (previousUiState, innerIndex) {
          return innerIndex.getWidgetUiState(previousUiState);
        }, _objectSpread2(_objectSpread2({}, uiState), {}, _defineProperty({}, indexId, _objectSpread2(_objectSpread2({}, uiState[indexId]), localUiState))));
      },
      getWidgetState: function getWidgetState(uiState) {
         _warning(false, 'The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead.') ;
        return this.getWidgetUiState(uiState);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        return getLocalWidgetsSearchParameters(localWidgets, {
          uiState: uiState,
          initialSearchParameters: searchParameters
        });
      },
      refreshUiState: function refreshUiState() {
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: this.getHelper().state,
          helper: this.getHelper()
        }, localUiState);
      },
      setIndexUiState: function setIndexUiState(indexUiState) {
        var nextIndexUiState = typeof indexUiState === 'function' ? indexUiState(localUiState) : indexUiState;
        localInstantSearchInstance.setUiState(function (state) {
          return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, indexId, nextIndexUiState));
        });
      }
    };
  };
  function storeRenderState(_ref7) {
    var renderState = _ref7.renderState,
      instantSearchInstance = _ref7.instantSearchInstance,
      parent = _ref7.parent;
    var parentIndexName = parent ? parent.getIndexId() : instantSearchInstance.mainIndex.getIndexId();
    instantSearchInstance.renderState = _objectSpread2(_objectSpread2({}, instantSearchInstance.renderState), {}, _defineProperty({}, parentIndexName, _objectSpread2(_objectSpread2({}, instantSearchInstance.renderState[parentIndexName]), renderState)));
  }

  function formatNumber(value, numberLocale) {
    return value.toLocaleString(numberLocale);
  }

  function hoganHelpers(_ref) {
    var numberLocale = _ref.numberLocale;
    return {
      formatNumber: function formatNumber$1(value, render) {
        return formatNumber(Number(render(value)), numberLocale);
      },
      highlight: function highlight$1(options, render) {
        try {
          var highlightOptions = JSON.parse(options);
          return render(highlight(_objectSpread2(_objectSpread2({}, highlightOptions), {}, {
            hit: this
          })));
        } catch (error) {
          throw new Error("\nThe highlight helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
        }
      },
      reverseHighlight: function reverseHighlight$1(options, render) {
        try {
          var reverseHighlightOptions = JSON.parse(options);
          return render(reverseHighlight(_objectSpread2(_objectSpread2({}, reverseHighlightOptions), {}, {
            hit: this
          })));
        } catch (error) {
          throw new Error("\n  The reverseHighlight helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
        }
      },
      snippet: function snippet$1(options, render) {
        try {
          var snippetOptions = JSON.parse(options);
          return render(snippet(_objectSpread2(_objectSpread2({}, snippetOptions), {}, {
            hit: this
          })));
        } catch (error) {
          throw new Error("\nThe snippet helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
        }
      },
      reverseSnippet: function reverseSnippet$1(options, render) {
        try {
          var reverseSnippetOptions = JSON.parse(options);
          return render(reverseSnippet(_objectSpread2(_objectSpread2({}, reverseSnippetOptions), {}, {
            hit: this
          })));
        } catch (error) {
          throw new Error("\n  The reverseSnippet helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
        }
      },
      insights: function insights$1(options, render) {
        try {
          var _JSON$parse = JSON.parse(options),
            method = _JSON$parse.method,
            payload = _JSON$parse.payload;
          return render(insights(method, _objectSpread2({
            objectIDs: [this.objectID]
          }, payload)));
        } catch (error) {
          throw new Error("\nThe insights helper expects a JSON object of the format:\n{ \"method\": \"method-name\", \"payload\": { \"eventName\": \"name of the event\" } }");
        }
      }
    };
  }

  var version$1 = '4.54.0';

  var withUsage$r = createDocumentationMessageGenerator({
    name: 'instantsearch'
  });
  function defaultCreateURL() {
    return '#';
  }

  // this purposely breaks typescript's type inference to ensure it's not used
  // as it's used for a default parameter for example
  // source: https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-504042546
  /**
   * The actual implementation of the InstantSearch. This is
   * created using the `instantsearch` factory function.
   * It emits the 'render' event every time a search is done
   */
  var InstantSearch = /*#__PURE__*/function (_EventEmitter) {
    _inherits(InstantSearch, _EventEmitter);
    var _super = _createSuper(InstantSearch);
    function InstantSearch(options) {
      var _this;
      _classCallCheck(this, InstantSearch);
      _this = _super.call(this);

      // prevent `render` event listening from causing a warning
      _defineProperty(_assertThisInitialized(_this), "client", void 0);
      _defineProperty(_assertThisInitialized(_this), "indexName", void 0);
      _defineProperty(_assertThisInitialized(_this), "insightsClient", void 0);
      _defineProperty(_assertThisInitialized(_this), "onStateChange", null);
      _defineProperty(_assertThisInitialized(_this), "helper", void 0);
      _defineProperty(_assertThisInitialized(_this), "mainHelper", void 0);
      _defineProperty(_assertThisInitialized(_this), "mainIndex", void 0);
      _defineProperty(_assertThisInitialized(_this), "started", void 0);
      _defineProperty(_assertThisInitialized(_this), "templatesConfig", void 0);
      _defineProperty(_assertThisInitialized(_this), "renderState", {});
      _defineProperty(_assertThisInitialized(_this), "_stalledSearchDelay", void 0);
      _defineProperty(_assertThisInitialized(_this), "_searchStalledTimer", void 0);
      _defineProperty(_assertThisInitialized(_this), "_initialUiState", void 0);
      _defineProperty(_assertThisInitialized(_this), "_initialResults", void 0);
      _defineProperty(_assertThisInitialized(_this), "_createURL", void 0);
      _defineProperty(_assertThisInitialized(_this), "_searchFunction", void 0);
      _defineProperty(_assertThisInitialized(_this), "_mainHelperSearch", void 0);
      _defineProperty(_assertThisInitialized(_this), "middleware", []);
      _defineProperty(_assertThisInitialized(_this), "sendEventToInsights", void 0);
      _defineProperty(_assertThisInitialized(_this), "status", 'idle');
      _defineProperty(_assertThisInitialized(_this), "error", undefined);
      _defineProperty(_assertThisInitialized(_this), "scheduleSearch", defer(function () {
        if (_this.started) {
          _this.mainHelper.search();
        }
      }));
      _defineProperty(_assertThisInitialized(_this), "scheduleRender", defer(function () {
        var _this$mainHelper;
        var shouldResetStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (!((_this$mainHelper = _this.mainHelper) !== null && _this$mainHelper !== void 0 && _this$mainHelper.hasPendingRequests())) {
          clearTimeout(_this._searchStalledTimer);
          _this._searchStalledTimer = null;
          if (shouldResetStatus) {
            _this.status = 'idle';
            _this.error = undefined;
          }
        }
        _this.mainIndex.render({
          instantSearchInstance: _assertThisInitialized(_this)
        });
        _this.emit('render');
      }));
      _defineProperty(_assertThisInitialized(_this), "onInternalStateChange", defer(function () {
        var nextUiState = _this.mainIndex.getWidgetUiState({});
        _this.middleware.forEach(function (_ref) {
          var instance = _ref.instance;
          instance.onStateChange({
            uiState: nextUiState
          });
        });
      }));
      _this.setMaxListeners(100);
      var _options$indexName = options.indexName,
        indexName = _options$indexName === void 0 ? null : _options$indexName,
        numberLocale = options.numberLocale,
        _options$initialUiSta = options.initialUiState,
        initialUiState = _options$initialUiSta === void 0 ? {} : _options$initialUiSta,
        _options$routing = options.routing,
        routing = _options$routing === void 0 ? null : _options$routing,
        searchFunction = options.searchFunction,
        _options$stalledSearc = options.stalledSearchDelay,
        stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc,
        _options$searchClient = options.searchClient,
        searchClient = _options$searchClient === void 0 ? null : _options$searchClient,
        _options$insightsClie = options.insightsClient,
        insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie,
        _options$onStateChang = options.onStateChange,
        onStateChange = _options$onStateChang === void 0 ? null : _options$onStateChang;
      if (indexName === null) {
        throw new Error(withUsage$r('The `indexName` option is required.'));
      }
      if (searchClient === null) {
        throw new Error(withUsage$r('The `searchClient` option is required.'));
      }
      if (typeof searchClient.search !== 'function') {
        throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
      }
      if (typeof searchClient.addAlgoliaAgent === 'function') {
        searchClient.addAlgoliaAgent("instantsearch.js (".concat(version$1, ")"));
      }
       _warning(insightsClient === null, "`insightsClient` property has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") ;
      if (insightsClient && typeof insightsClient !== 'function') {
        throw new Error(withUsage$r('The `insightsClient` option should be a function.'));
      }
       _warning(!options.searchParameters, "The `searchParameters` option is deprecated and will not be supported in InstantSearch.js 4.x.\n\nYou can replace it with the `configure` widget:\n\n```\nsearch.addWidgets([\n  configure(".concat(JSON.stringify(options.searchParameters, null, 2), ")\n]);\n```\n\nSee ").concat(createDocumentationLink({
        name: 'configure'
      }))) ;
      _this.client = searchClient;
      _this.insightsClient = insightsClient;
      _this.indexName = indexName;
      _this.helper = null;
      _this.mainHelper = null;
      _this.mainIndex = index({
        indexName: indexName
      });
      _this.onStateChange = onStateChange;
      _this.started = false;
      _this.templatesConfig = {
        helpers: hoganHelpers({
          numberLocale: numberLocale
        }),
        compileOptions: {}
      };
      _this._stalledSearchDelay = stalledSearchDelay;
      _this._searchStalledTimer = null;
      _this._createURL = defaultCreateURL;
      _this._initialUiState = initialUiState;
      _this._initialResults = null;
      if (searchFunction) {
         _warning(false, "The `searchFunction` option is deprecated. Use `onStateChange` instead.") ;
        _this._searchFunction = searchFunction;
      }
      _this.sendEventToInsights = noop;
      if (routing) {
        var routerOptions = typeof routing === 'boolean' ? undefined : routing;
        _this.use(createRouterMiddleware(routerOptions));
      }
      if (isMetadataEnabled()) {
        _this.use(createMetadataMiddleware());
      }
      return _this;
    }

    /**
     * Hooks a middleware into the InstantSearch lifecycle.
     */
    _createClass(InstantSearch, [{
      key: "_isSearchStalled",
      get:
      /**
       * The status of the search. Can be "idle", "loading", "stalled", or "error".
       */

      /**
       * The last returned error from the Search API.
       * The error gets cleared when the next valid search response is rendered.
       */

      /**
       * @deprecated use `status === 'stalled'` instead
       */
      function get() {
         _warning(false, "`InstantSearch._isSearchStalled` is deprecated and will be removed in InstantSearch.js 5.0.\n\nUse `InstantSearch.status === \"stalled\"` instead.") ;
        return this.status === 'stalled';
      }
    }, {
      key: "use",
      value: function use() {
        var _this2 = this;
        for (var _len = arguments.length, middleware = new Array(_len), _key = 0; _key < _len; _key++) {
          middleware[_key] = arguments[_key];
        }
        var newMiddlewareList = middleware.map(function (fn) {
          var newMiddleware = _objectSpread2({
            subscribe: noop,
            started: noop,
            unsubscribe: noop,
            onStateChange: noop
          }, fn({
            instantSearchInstance: _this2
          }));
          _this2.middleware.push({
            creator: fn,
            instance: newMiddleware
          });
          return newMiddleware;
        });

        // If the instance has already started, we directly subscribe the
        // middleware so they're notified of changes.
        if (this.started) {
          newMiddlewareList.forEach(function (m) {
            m.subscribe();
            m.started();
          });
        }
        return this;
      }

      /**
       * Removes a middleware from the InstantSearch lifecycle.
       */
    }, {
      key: "unuse",
      value: function unuse() {
        for (var _len2 = arguments.length, middlewareToUnuse = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          middlewareToUnuse[_key2] = arguments[_key2];
        }
        this.middleware.filter(function (m) {
          return middlewareToUnuse.includes(m.creator);
        }).forEach(function (m) {
          return m.instance.unsubscribe();
        });
        this.middleware = this.middleware.filter(function (m) {
          return !middlewareToUnuse.includes(m.creator);
        });
        return this;
      }

      // @major we shipped with EXPERIMENTAL_use, but have changed that to just `use` now
    }, {
      key: "EXPERIMENTAL_use",
      value: function EXPERIMENTAL_use() {
         _warning(false, 'The middleware API is now considered stable, so we recommend replacing `EXPERIMENTAL_use` with `use` before upgrading to the next major version.') ;
        return this.use.apply(this, arguments);
      }

      /**
       * Adds a widget to the search instance.
       * A widget can be added either before or after InstantSearch has started.
       * @param widget The widget to add to InstantSearch.
       *
       * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
       */
    }, {
      key: "addWidget",
      value: function addWidget(widget) {
         _warning(false, 'addWidget will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`') ;
        return this.addWidgets([widget]);
      }

      /**
       * Adds multiple widgets to the search instance.
       * Widgets can be added either before or after InstantSearch has started.
       * @param widgets The array of widgets to add to InstantSearch.
       */
    }, {
      key: "addWidgets",
      value: function addWidgets(widgets) {
        if (!Array.isArray(widgets)) {
          throw new Error(withUsage$r('The `addWidgets` method expects an array of widgets. Please use `addWidget`.'));
        }
        if (widgets.some(function (widget) {
          return typeof widget.init !== 'function' && typeof widget.render !== 'function';
        })) {
          throw new Error(withUsage$r('The widget definition expects a `render` and/or an `init` method.'));
        }
        this.mainIndex.addWidgets(widgets);
        return this;
      }

      /**
       * Removes a widget from the search instance.
       * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
       * @param widget The widget instance to remove from InstantSearch.
       *
       * The widget must implement a `dispose()` method to clear its state.
       */
    }, {
      key: "removeWidget",
      value: function removeWidget(widget) {
         _warning(false, 'removeWidget will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`') ;
        return this.removeWidgets([widget]);
      }

      /**
       * Removes multiple widgets from the search instance.
       * @param widgets Array of widgets instances to remove from InstantSearch.
       *
       * The widgets must implement a `dispose()` method to clear their states.
       */
    }, {
      key: "removeWidgets",
      value: function removeWidgets(widgets) {
        if (!Array.isArray(widgets)) {
          throw new Error(withUsage$r('The `removeWidgets` method expects an array of widgets. Please use `removeWidget`.'));
        }
        if (widgets.some(function (widget) {
          return typeof widget.dispose !== 'function';
        })) {
          throw new Error(withUsage$r('The widget definition expects a `dispose` method.'));
        }
        this.mainIndex.removeWidgets(widgets);
        return this;
      }

      /**
       * Ends the initialization of InstantSearch.js and triggers the
       * first search. This method should be called after all widgets have been added
       * to the instance of InstantSearch.js. InstantSearch.js also supports adding and removing
       * widgets after the start as an **EXPERIMENTAL** feature.
       */
    }, {
      key: "start",
      value: function start() {
        var _this3 = this;
        if (this.started) {
          throw new Error(withUsage$r('The `start` method has already been called once.'));
        }

        // This Helper is used for the queries, we don't care about its state. The
        // states are managed at the `index` level. We use this Helper to create
        // DerivedHelper scoped into the `index` widgets.
        // In Vue InstantSearch' hydrate, a main helper gets set before start, so
        // we need to respect this helper as a way to keep all listeners correct.
        var mainHelper = this.mainHelper || algoliasearchHelper_1(this.client, this.indexName);
        mainHelper.search = function () {
          _this3.status = 'loading';
          _this3.scheduleRender(false);

          // This solution allows us to keep the exact same API for the users but
          // under the hood, we have a different implementation. It should be
          // completely transparent for the rest of the codebase. Only this module
          // is impacted.
          return mainHelper.searchOnlyWithDerivedHelpers();
        };
        if (this._searchFunction) {
          // this client isn't used to actually search, but required for the helper
          // to not throw errors
          var fakeClient = {
            search: function search() {
              return new Promise(noop);
            }
          };
          this._mainHelperSearch = mainHelper.search.bind(mainHelper);
          mainHelper.search = function () {
            var mainIndexHelper = _this3.mainIndex.getHelper();
            var searchFunctionHelper = algoliasearchHelper_1(fakeClient, mainIndexHelper.state.index, mainIndexHelper.state);
            searchFunctionHelper.once('search', function (_ref2) {
              var state = _ref2.state;
              mainIndexHelper.overrideStateWithoutTriggeringChangeEvent(state);
              _this3._mainHelperSearch();
            });
            // Forward state changes from `searchFunctionHelper` to `mainIndexHelper`
            searchFunctionHelper.on('change', function (_ref3) {
              var state = _ref3.state;
              mainIndexHelper.setState(state);
            });
            _this3._searchFunction(searchFunctionHelper);
            return mainHelper;
          };
        }

        // Only the "main" Helper emits the `error` event vs the one for `search`
        // and `results` that are also emitted on the derived one.
        mainHelper.on('error', function (_ref4) {
          var error = _ref4.error;
          if (!(error instanceof Error)) {
            // typescript lies here, error is in some cases { name: string, message: string }
            var err = error;
            error = Object.keys(err).reduce(function (acc, key) {
              acc[key] = err[key];
              return acc;
            }, new Error(err.message));
          }
          // If an error is emitted, it is re-thrown by events. In previous versions
          // we emitted {error}, which is thrown as:
          // "Uncaught, unspecified \"error\" event. ([object Object])"
          // To avoid breaking changes, we make the error available in both
          // `error` and `error.error`
          // @MAJOR emit only error
          error.error = error;
          _this3.error = error;
          _this3.status = 'error';
          _this3.scheduleRender(false);

          // This needs to execute last because it throws the error.
          _this3.emit('error', error);
        });
        this.mainHelper = mainHelper;
        this.middleware.forEach(function (_ref5) {
          var instance = _ref5.instance;
          instance.subscribe();
        });
        this.mainIndex.init({
          instantSearchInstance: this,
          parent: null,
          uiState: this._initialUiState
        });
        if (this._initialResults) {
          var originalScheduleSearch = this.scheduleSearch;
          // We don't schedule a first search when initial results are provided
          // because we already have the results to render. This skips the initial
          // network request on the browser on `start`.
          this.scheduleSearch = defer(noop);
          // We also skip the initial network request when widgets are dynamically
          // added in the first tick (that's the case in all the framework-based flavors).
          // When we add a widget to `index`, it calls `scheduleSearch`. We can rely
          // on our `defer` util to restore the original `scheduleSearch` value once
          // widgets are added to hook back to the regular lifecycle.
          defer(function () {
            _this3.scheduleSearch = originalScheduleSearch;
          })();
        }
        // We only schedule a search when widgets have been added before `start()`
        // because there are listeners that can use these results.
        // This is especially useful in framework-based flavors that wait for
        // dynamically-added widgets to trigger a network request. It avoids
        // having to batch this initial network request with the one coming from
        // `addWidgets()`.
        // Later, we could also skip `index()` widgets and widgets that don't read
        // the results, but this is an optimization that has a very low impact for now.
        else if (this.mainIndex.getWidgets().length > 0) {
          this.scheduleSearch();
        }

        // Keep the previous reference for legacy purpose, some pattern use
        // the direct Helper access `search.helper` (e.g multi-index).
        this.helper = this.mainIndex.getHelper();

        // track we started the search if we add more widgets,
        // to init them directly after add
        this.started = true;
        this.middleware.forEach(function (_ref6) {
          var instance = _ref6.instance;
          instance.started();
        });
      }

      /**
       * Removes all widgets without triggering a search afterwards. This is an **EXPERIMENTAL** feature,
       * if you find an issue with it, please
       * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20dispose).
       * @return {undefined} This method does not return anything
       */
    }, {
      key: "dispose",
      value: function dispose() {
        var _this$mainHelper2;
        this.scheduleSearch.cancel();
        this.scheduleRender.cancel();
        clearTimeout(this._searchStalledTimer);
        this.removeWidgets(this.mainIndex.getWidgets());
        this.mainIndex.dispose();

        // You can not start an instance two times, therefore a disposed instance
        // needs to set started as false otherwise this can not be restarted at a
        // later point.
        this.started = false;

        // The helper needs to be reset to perform the next search from a fresh state.
        // If not reset, it would use the state stored before calling `dispose()`.
        this.removeAllListeners();
        (_this$mainHelper2 = this.mainHelper) === null || _this$mainHelper2 === void 0 ? void 0 : _this$mainHelper2.removeAllListeners();
        this.mainHelper = null;
        this.helper = null;
        this.middleware.forEach(function (_ref7) {
          var instance = _ref7.instance;
          instance.unsubscribe();
        });
      }
    }, {
      key: "scheduleStalledRender",
      value: function scheduleStalledRender() {
        var _this4 = this;
        if (!this._searchStalledTimer) {
          this._searchStalledTimer = setTimeout(function () {
            _this4.status = 'stalled';
            _this4.scheduleRender();
          }, this._stalledSearchDelay);
        }
      }

      /**
       * Set the UI state and trigger a search.
       * @param uiState The next UI state or a function computing it from the current state
       * @param callOnStateChange private parameter used to know if the method is called from a state change
       */
    }, {
      key: "setUiState",
      value: function setUiState(uiState) {
        var _this5 = this;
        var callOnStateChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (!this.mainHelper) {
          throw new Error(withUsage$r('The `start` method needs to be called before `setUiState`.'));
        }

        // We refresh the index UI state to update the local UI state that the
        // main index passes to the function form of `setUiState`.
        this.mainIndex.refreshUiState();
        var nextUiState = typeof uiState === 'function' ? uiState(this.mainIndex.getWidgetUiState({})) : uiState;
        if (this.onStateChange && callOnStateChange) {
          this.onStateChange({
            uiState: nextUiState,
            setUiState: function setUiState(finalUiState) {
              setIndexHelperState(typeof finalUiState === 'function' ? finalUiState(nextUiState) : finalUiState, _this5.mainIndex);
              _this5.scheduleSearch();
              _this5.onInternalStateChange();
            }
          });
        } else {
          setIndexHelperState(nextUiState, this.mainIndex);
          this.scheduleSearch();
          this.onInternalStateChange();
        }
      }
    }, {
      key: "getUiState",
      value: function getUiState() {
        if (this.started) {
          // We refresh the index UI state to make sure changes from `refine` are taken in account
          this.mainIndex.refreshUiState();
        }
        return this.mainIndex.getWidgetUiState({});
      }
    }, {
      key: "createURL",
      value: function createURL() {
        var nextState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (!this.started) {
          throw new Error(withUsage$r('The `start` method needs to be called before `createURL`.'));
        }
        return this._createURL(nextState);
      }
    }, {
      key: "refresh",
      value: function refresh() {
        if (!this.mainHelper) {
          throw new Error(withUsage$r('The `start` method needs to be called before `refresh`.'));
        }
        this.mainHelper.clearCache().search();
      }
    }]);
    return InstantSearch;
  }(events);



  var routers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    history: historyRouter
  });

  var _excluded$8 = ["configure"];
  function getIndexStateWithoutConfigure$1(uiState) {
    var configure = uiState.configure,
      trackedUiState = _objectWithoutProperties(uiState, _excluded$8);
    return trackedUiState;
  }
  function singleIndexStateMapping(indexName) {
    return {
      stateToRoute: function stateToRoute(uiState) {
        return getIndexStateWithoutConfigure$1(uiState[indexName] || {});
      },
      routeToState: function routeToState() {
        var routeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _defineProperty({}, indexName, getIndexStateWithoutConfigure$1(routeState));
      }
    };
  }



  var stateMappings = /*#__PURE__*/Object.freeze({
    __proto__: null,
    simple: simpleStateMapping,
    singleIndex: singleIndexStateMapping
  });

  function createInsightsMiddleware(props) {
    var _ref = props || {},
      _insightsClient = _ref.insightsClient,
      insightsInitParams = _ref.insightsInitParams,
      onEvent = _ref.onEvent;
    if (_insightsClient !== null && !_insightsClient) {
      {
        throw new Error("The `insightsClient` option is required if you want userToken to be automatically set in search calls. If you don't want this behaviour, set it to `null`.");
      }
    }
    var hasInsightsClient = Boolean(_insightsClient);
    var insightsClient = _insightsClient === null ? noop : _insightsClient;
    return function (_ref2) {
      var instantSearchInstance = _ref2.instantSearchInstance;
      var _getAppIdAndApiKey = getAppIdAndApiKey(instantSearchInstance.client),
        _getAppIdAndApiKey2 = _slicedToArray(_getAppIdAndApiKey, 2),
        appId = _getAppIdAndApiKey2[0],
        apiKey = _getAppIdAndApiKey2[1];

      // search-insights.js also throws an error so dev-only clarification is sufficient
      if ( !(appId && apiKey)) {
        throw new Error('[insights middleware]: could not extract Algolia credentials from searchClient');
      }
      var queuedUserToken = undefined;
      var userTokenBeforeInit = undefined;
      if (Array.isArray(insightsClient.queue)) {
        // Context: The umd build of search-insights is asynchronously loaded by the snippet.
        //
        // When user calls `aa('setUserToken', 'my-user-token')` before `search-insights` is loaded,
        // ['setUserToken', 'my-user-token'] gets stored in `aa.queue`.
        // Whenever `search-insights` is finally loaded, it will process the queue.
        //
        // But here's the reason why we handle it here:
        // At this point, even though `search-insights` is not loaded yet,
        // we still want to read the token from the queue.
        // Otherwise, the first search call will be fired without the token.
        var _ref3 = find(insightsClient.queue.slice().reverse(), function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 1),
            method = _ref6[0];
          return method === 'setUserToken';
        }) || [];
        var _ref4 = _slicedToArray(_ref3, 2);
        queuedUserToken = _ref4[1];
      }
      insightsClient('getUserToken', null, function (_error, userToken) {
        // If user has called `aa('setUserToken', 'my-user-token')` before creating
        // the `insights` middleware, we store them temporarily and
        // set it later on.
        //
        // Otherwise, the `init` call might override it with anonymous user token.
        userTokenBeforeInit = userToken;
      });
      insightsClient('init', _objectSpread2({
        appId: appId,
        apiKey: apiKey
      }, insightsInitParams));
      var initialParameters;
      var helper;
      return {
        onStateChange: function onStateChange() {},
        subscribe: function subscribe() {},
        started: function started() {
          insightsClient('addAlgoliaAgent', 'insights-middleware');
          helper = instantSearchInstance.helper;
          initialParameters = {
            userToken: helper.state.userToken,
            clickAnalytics: helper.state.clickAnalytics
          };
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread2(_objectSpread2({}, helper.state), {}, {
            clickAnalytics: true
          }));
          instantSearchInstance.scheduleSearch();
          var setUserTokenToSearch = function setUserTokenToSearch(userToken) {
            helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread2(_objectSpread2({}, helper.state), {}, {
              userToken: userToken
            }));
            instantSearchInstance.scheduleSearch();
          };
          var anonymousUserToken = getInsightsAnonymousUserTokenInternal();
          if (hasInsightsClient && anonymousUserToken) {
            // When `aa('init', { ... })` is called, it creates an anonymous user token in cookie.
            // We can set it as userToken.
            setUserTokenToSearch(anonymousUserToken);
          }

          // We consider the `userToken` coming from a `init` call to have a higher
          // importance than the one coming from the queue.
          if (userTokenBeforeInit) {
            insightsClient('setUserToken', userTokenBeforeInit);
          } else if (queuedUserToken) {
            insightsClient('setUserToken', queuedUserToken);
          }

          // This updates userToken which is set explicitly by `aa('setUserToken', userToken)`
          insightsClient('onUserTokenChange', setUserTokenToSearch, {
            immediate: true
          });
          instantSearchInstance.sendEventToInsights = function (event) {
            if (onEvent) {
              onEvent(event, _insightsClient);
            } else if (event.insightsMethod) {
              var hasUserToken = Boolean(helper.state.userToken);
              if (hasUserToken) {
                insightsClient(event.insightsMethod, event.payload);
              } else {
                 _warning(false, "\nCannot send event to Algolia Insights because `userToken` is not set.\n\nSee documentation: https://www.algolia.com/doc/guides/building-search-ui/going-further/send-insights-events/js/#setting-the-usertoken\n") ;
              }
            } else {
               _warning(false, 'Cannot send event to Algolia Insights because `insightsMethod` option is missing.') ;
            }
          };
        },
        unsubscribe: function unsubscribe() {
          insightsClient('onUserTokenChange', undefined);
          instantSearchInstance.sendEventToInsights = noop;
          if (helper && initialParameters) {
            helper.setState(_objectSpread2(_objectSpread2({}, helper.state), initialParameters));
            instantSearchInstance.scheduleSearch();
          }
        }
      };
    };
  }



  var middlewares = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createInsightsMiddleware: createInsightsMiddleware,
    createRouterMiddleware: createRouterMiddleware,
    isMetadataEnabled: isMetadataEnabled,
    createMetadataMiddleware: createMetadataMiddleware
  });

  function cx() {
    for (var _len = arguments.length, cssClasses = new Array(_len), _key = 0; _key < _len; _key++) {
      cssClasses[_key] = arguments[_key];
    }

    return cssClasses.reduce(function (acc, className) {
      if (Array.isArray(className)) {
        return acc.concat(className);
      }

      return acc.concat([className]);
    }, []).filter(Boolean).join(' ');
  }

  function prepareTemplates(
  // can not use = {} here, since the template could have different constraints
  defaultTemplates) {
    var templates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var allKeys = uniq([].concat(_toConsumableArray(Object.keys(defaultTemplates || {})), _toConsumableArray(Object.keys(templates))));
    return allKeys.reduce(function (config, key) {
      var defaultTemplate = defaultTemplates ? defaultTemplates[key] : undefined;
      var customTemplate = templates[key];
      var isCustomTemplate = customTemplate !== undefined && customTemplate !== defaultTemplate;
      config.templates[key] = isCustomTemplate ? customTemplate : defaultTemplate;
      config.useCustomCompileOptions[key] = isCustomTemplate;
      return config;
    }, {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      templates: {},
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      useCustomCompileOptions: {}
    });
  }

  /**
   * Prepares an object to be passed to the Template widget
   */
  function prepareTemplateProps(_ref) {
    var defaultTemplates = _ref.defaultTemplates,
      templates = _ref.templates,
      templatesConfig = _ref.templatesConfig;
    var preparedTemplates = prepareTemplates(defaultTemplates, templates);
    return _objectSpread2({
      templatesConfig: templatesConfig
    }, preparedTemplates);
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var compiler = createCommonjsModule(function (module, exports) {
  /*
   *  Copyright 2011 Twitter, Inc.
   *  Licensed under the Apache License, Version 2.0 (the "License");
   *  you may not use this file except in compliance with the License.
   *  You may obtain a copy of the License at
   *
   *  http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   */

  (function (Hogan) {
    // Setup regex  assignments
    // remove whitespace according to Mustache spec
    var rIsWhitespace = /\S/,
        rQuot = /\"/g,
        rNewline =  /\n/g,
        rCr = /\r/g,
        rSlash = /\\/g,
        rLineSep = /\u2028/,
        rParagraphSep = /\u2029/;

    Hogan.tags = {
      '#': 1, '^': 2, '<': 3, '$': 4,
      '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
      '{': 10, '&': 11, '_t': 12
    };

    Hogan.scan = function scan(text, delimiters) {
      var len = text.length,
          IN_TEXT = 0,
          IN_TAG_TYPE = 1,
          IN_TAG = 2,
          state = IN_TEXT,
          tagType = null,
          tag = null,
          buf = '',
          tokens = [],
          seenTag = false,
          i = 0,
          lineStart = 0,
          otag = '{{',
          ctag = '}}';

      function addBuf() {
        if (buf.length > 0) {
          tokens.push({tag: '_t', text: new String(buf)});
          buf = '';
        }
      }

      function lineIsWhitespace() {
        var isAllWhitespace = true;
        for (var j = lineStart; j < tokens.length; j++) {
          isAllWhitespace =
            (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
            (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
          if (!isAllWhitespace) {
            return false;
          }
        }

        return isAllWhitespace;
      }

      function filterLine(haveSeenTag, noNewLine) {
        addBuf();

        if (haveSeenTag && lineIsWhitespace()) {
          for (var j = lineStart, next; j < tokens.length; j++) {
            if (tokens[j].text) {
              if ((next = tokens[j+1]) && next.tag == '>') {
                // set indent to token value
                next.indent = tokens[j].text.toString();
              }
              tokens.splice(j, 1);
            }
          }
        } else if (!noNewLine) {
          tokens.push({tag:'\n'});
        }

        seenTag = false;
        lineStart = tokens.length;
      }

      function changeDelimiters(text, index) {
        var close = '=' + ctag,
            closeIndex = text.indexOf(close, index),
            delimiters = trim(
              text.substring(text.indexOf('=', index) + 1, closeIndex)
            ).split(' ');

        otag = delimiters[0];
        ctag = delimiters[delimiters.length - 1];

        return closeIndex + close.length - 1;
      }

      if (delimiters) {
        delimiters = delimiters.split(' ');
        otag = delimiters[0];
        ctag = delimiters[1];
      }

      for (i = 0; i < len; i++) {
        if (state == IN_TEXT) {
          if (tagChange(otag, text, i)) {
            --i;
            addBuf();
            state = IN_TAG_TYPE;
          } else {
            if (text.charAt(i) == '\n') {
              filterLine(seenTag);
            } else {
              buf += text.charAt(i);
            }
          }
        } else if (state == IN_TAG_TYPE) {
          i += otag.length - 1;
          tag = Hogan.tags[text.charAt(i + 1)];
          tagType = tag ? text.charAt(i + 1) : '_v';
          if (tagType == '=') {
            i = changeDelimiters(text, i);
            state = IN_TEXT;
          } else {
            if (tag) {
              i++;
            }
            state = IN_TAG;
          }
          seenTag = i;
        } else {
          if (tagChange(ctag, text, i)) {
            tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                         i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
            buf = '';
            i += ctag.length - 1;
            state = IN_TEXT;
            if (tagType == '{') {
              if (ctag == '}}') {
                i++;
              } else {
                cleanTripleStache(tokens[tokens.length - 1]);
              }
            }
          } else {
            buf += text.charAt(i);
          }
        }
      }

      filterLine(seenTag, true);

      return tokens;
    };

    function cleanTripleStache(token) {
      if (token.n.substr(token.n.length - 1) === '}') {
        token.n = token.n.substring(0, token.n.length - 1);
      }
    }

    function trim(s) {
      if (s.trim) {
        return s.trim();
      }

      return s.replace(/^\s*|\s*$/g, '');
    }

    function tagChange(tag, text, index) {
      if (text.charAt(index) != tag.charAt(0)) {
        return false;
      }

      for (var i = 1, l = tag.length; i < l; i++) {
        if (text.charAt(index + i) != tag.charAt(i)) {
          return false;
        }
      }

      return true;
    }

    // the tags allowed inside super templates
    var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

    function buildTree(tokens, kind, stack, customTags) {
      var instructions = [],
          opener = null,
          tail = null,
          token = null;

      tail = stack[stack.length - 1];

      while (tokens.length > 0) {
        token = tokens.shift();

        if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
          throw new Error('Illegal content in < super tag.');
        }

        if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
          stack.push(token);
          token.nodes = buildTree(tokens, token.tag, stack, customTags);
        } else if (token.tag == '/') {
          if (stack.length === 0) {
            throw new Error('Closing tag without opener: /' + token.n);
          }
          opener = stack.pop();
          if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
            throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
          }
          opener.end = token.i;
          return instructions;
        } else if (token.tag == '\n') {
          token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
        }

        instructions.push(token);
      }

      if (stack.length > 0) {
        throw new Error('missing closing tag: ' + stack.pop().n);
      }

      return instructions;
    }

    function isOpener(token, tags) {
      for (var i = 0, l = tags.length; i < l; i++) {
        if (tags[i].o == token.n) {
          token.tag = '#';
          return true;
        }
      }
    }

    function isCloser(close, open, tags) {
      for (var i = 0, l = tags.length; i < l; i++) {
        if (tags[i].c == close && tags[i].o == open) {
          return true;
        }
      }
    }

    function stringifySubstitutions(obj) {
      var items = [];
      for (var key in obj) {
        items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
      }
      return "{ " + items.join(",") + " }";
    }

    function stringifyPartials(codeObj) {
      var partials = [];
      for (var key in codeObj.partials) {
        partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
      }
      return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
    }

    Hogan.stringify = function(codeObj, text, options) {
      return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
    };

    var serialNo = 0;
    Hogan.generate = function(tree, text, options) {
      serialNo = 0;
      var context = { code: '', subs: {}, partials: {} };
      Hogan.walk(tree, context);

      if (options.asString) {
        return this.stringify(context, text, options);
      }

      return this.makeTemplate(context, text, options);
    };

    Hogan.wrapMain = function(code) {
      return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
    };

    Hogan.template = Hogan.Template;

    Hogan.makeTemplate = function(codeObj, text, options) {
      var template = this.makePartials(codeObj);
      template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
      return new this.template(template, text, this, options);
    };

    Hogan.makePartials = function(codeObj) {
      var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
      for (key in template.partials) {
        template.partials[key] = this.makePartials(template.partials[key]);
      }
      for (key in codeObj.subs) {
        template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
      }
      return template;
    };

    function esc(s) {
      return s.replace(rSlash, '\\\\')
              .replace(rQuot, '\\\"')
              .replace(rNewline, '\\n')
              .replace(rCr, '\\r')
              .replace(rLineSep, '\\u2028')
              .replace(rParagraphSep, '\\u2029');
    }

    function chooseMethod(s) {
      return (~s.indexOf('.')) ? 'd' : 'f';
    }

    function createPartial(node, context) {
      var prefix = "<" + (context.prefix || "");
      var sym = prefix + node.n + serialNo++;
      context.partials[sym] = {name: node.n, partials: {}};
      context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
      return sym;
    }

    Hogan.codegen = {
      '#': function(node, context) {
        context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                        'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                        't.rs(c,p,' + 'function(c,p,t){';
        Hogan.walk(node.nodes, context);
        context.code += '});c.pop();}';
      },

      '^': function(node, context) {
        context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
        Hogan.walk(node.nodes, context);
        context.code += '};';
      },

      '>': createPartial,
      '<': function(node, context) {
        var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
        Hogan.walk(node.nodes, ctx);
        var template = context.partials[createPartial(node, context)];
        template.subs = ctx.subs;
        template.partials = ctx.partials;
      },

      '$': function(node, context) {
        var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
        Hogan.walk(node.nodes, ctx);
        context.subs[node.n] = ctx.code;
        if (!context.inPartial) {
          context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
        }
      },

      '\n': function(node, context) {
        context.code += write('"\\n"' + (node.last ? '' : ' + i'));
      },

      '_v': function(node, context) {
        context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
      },

      '_t': function(node, context) {
        context.code += write('"' + esc(node.text) + '"');
      },

      '{': tripleStache,

      '&': tripleStache
    };

    function tripleStache(node, context) {
      context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    }

    function write(s) {
      return 't.b(' + s + ');';
    }

    Hogan.walk = function(nodelist, context) {
      var func;
      for (var i = 0, l = nodelist.length; i < l; i++) {
        func = Hogan.codegen[nodelist[i].tag];
        func && func(nodelist[i], context);
      }
      return context;
    };

    Hogan.parse = function(tokens, text, options) {
      options = options || {};
      return buildTree(tokens, '', [], options.sectionTags || []);
    };

    Hogan.cache = {};

    Hogan.cacheKey = function(text, options) {
      return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
    };

    Hogan.compile = function(text, options) {
      options = options || {};
      var key = Hogan.cacheKey(text, options);
      var template = this.cache[key];

      if (template) {
        var partials = template.partials;
        for (var name in partials) {
          delete partials[name].instance;
        }
        return template;
      }

      template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
      return this.cache[key] = template;
    };
  })( exports );
  });

  var template = createCommonjsModule(function (module, exports) {

  (function (Hogan) {
    Hogan.Template = function (codeObj, text, compiler, options) {
      codeObj = codeObj || {};
      this.r = codeObj.code || this.r;
      this.c = compiler;
      this.options = options || {};
      this.text = text || '';
      this.partials = codeObj.partials || {};
      this.subs = codeObj.subs || {};
      this.buf = '';
    };

    Hogan.Template.prototype = {
      // render: replaced by generated code.
      r: function (context, partials, indent) { return ''; },

      // variable escaping
      v: hoganEscape,

      // triple stache
      t: coerceToString,

      render: function render(context, partials, indent) {
        return this.ri([context], partials || {}, indent);
      },

      // render internal -- a hook for overrides that catches partials too
      ri: function (context, partials, indent) {
        return this.r(context, partials, indent);
      },

      // ensurePartial
      ep: function(symbol, partials) {
        var partial = this.partials[symbol];

        // check to see that if we've instantiated this partial before
        var template = partials[partial.name];
        if (partial.instance && partial.base == template) {
          return partial.instance;
        }

        if (typeof template == 'string') {
          if (!this.c) {
            throw new Error("No compiler available.");
          }
          template = this.c.compile(template, this.options);
        }

        if (!template) {
          return null;
        }

        // We use this to check whether the partials dictionary has changed
        this.partials[symbol].base = template;

        if (partial.subs) {
          // Make sure we consider parent template now
          if (!partials.stackText) partials.stackText = {};
          for (key in partial.subs) {
            if (!partials.stackText[key]) {
              partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
            }
          }
          template = createSpecializedPartial(template, partial.subs, partial.partials,
            this.stackSubs, this.stackPartials, partials.stackText);
        }
        this.partials[symbol].instance = template;

        return template;
      },

      // tries to find a partial in the current scope and render it
      rp: function(symbol, context, partials, indent) {
        var partial = this.ep(symbol, partials);
        if (!partial) {
          return '';
        }

        return partial.ri(context, partials, indent);
      },

      // render a section
      rs: function(context, partials, section) {
        var tail = context[context.length - 1];

        if (!isArray(tail)) {
          section(context, partials, this);
          return;
        }

        for (var i = 0; i < tail.length; i++) {
          context.push(tail[i]);
          section(context, partials, this);
          context.pop();
        }
      },

      // maybe start a section
      s: function(val, ctx, partials, inverted, start, end, tags) {
        var pass;

        if (isArray(val) && val.length === 0) {
          return false;
        }

        if (typeof val == 'function') {
          val = this.ms(val, ctx, partials, inverted, start, end, tags);
        }

        pass = !!val;

        if (!inverted && pass && ctx) {
          ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
        }

        return pass;
      },

      // find values with dotted names
      d: function(key, ctx, partials, returnFound) {
        var found,
            names = key.split('.'),
            val = this.f(names[0], ctx, partials, returnFound),
            doModelGet = this.options.modelGet,
            cx = null;

        if (key === '.' && isArray(ctx[ctx.length - 2])) {
          val = ctx[ctx.length - 1];
        } else {
          for (var i = 1; i < names.length; i++) {
            found = findInScope(names[i], val, doModelGet);
            if (found !== undefined) {
              cx = val;
              val = found;
            } else {
              val = '';
            }
          }
        }

        if (returnFound && !val) {
          return false;
        }

        if (!returnFound && typeof val == 'function') {
          ctx.push(cx);
          val = this.mv(val, ctx, partials);
          ctx.pop();
        }

        return val;
      },

      // find values with normal names
      f: function(key, ctx, partials, returnFound) {
        var val = false,
            v = null,
            found = false,
            doModelGet = this.options.modelGet;

        for (var i = ctx.length - 1; i >= 0; i--) {
          v = ctx[i];
          val = findInScope(key, v, doModelGet);
          if (val !== undefined) {
            found = true;
            break;
          }
        }

        if (!found) {
          return (returnFound) ? false : "";
        }

        if (!returnFound && typeof val == 'function') {
          val = this.mv(val, ctx, partials);
        }

        return val;
      },

      // higher order templates
      ls: function(func, cx, partials, text, tags) {
        var oldTags = this.options.delimiters;

        this.options.delimiters = tags;
        this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
        this.options.delimiters = oldTags;

        return false;
      },

      // compile text
      ct: function(text, cx, partials) {
        if (this.options.disableLambda) {
          throw new Error('Lambda features disabled.');
        }
        return this.c.compile(text, this.options).render(cx, partials);
      },

      // template result buffering
      b: function(s) { this.buf += s; },

      fl: function() { var r = this.buf; this.buf = ''; return r; },

      // method replace section
      ms: function(func, ctx, partials, inverted, start, end, tags) {
        var textSource,
            cx = ctx[ctx.length - 1],
            result = func.call(cx);

        if (typeof result == 'function') {
          if (inverted) {
            return true;
          } else {
            textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
            return this.ls(result, cx, partials, textSource.substring(start, end), tags);
          }
        }

        return result;
      },

      // method replace variable
      mv: function(func, ctx, partials) {
        var cx = ctx[ctx.length - 1];
        var result = func.call(cx);

        if (typeof result == 'function') {
          return this.ct(coerceToString(result.call(cx)), cx, partials);
        }

        return result;
      },

      sub: function(name, context, partials, indent) {
        var f = this.subs[name];
        if (f) {
          this.activeSub = name;
          f(context, partials, this, indent);
          this.activeSub = false;
        }
      }

    };

    //Find a key in an object
    function findInScope(key, scope, doModelGet) {
      var val;

      if (scope && typeof scope == 'object') {

        if (scope[key] !== undefined) {
          val = scope[key];

        // try lookup with get for backbone or similar model data
        } else if (doModelGet && scope.get && typeof scope.get == 'function') {
          val = scope.get(key);
        }
      }

      return val;
    }

    function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
      function PartialTemplate() {}    PartialTemplate.prototype = instance;
      function Substitutions() {}    Substitutions.prototype = instance.subs;
      var key;
      var partial = new PartialTemplate();
      partial.subs = new Substitutions();
      partial.subsText = {};  //hehe. substext.
      partial.buf = '';

      stackSubs = stackSubs || {};
      partial.stackSubs = stackSubs;
      partial.subsText = stackText;
      for (key in subs) {
        if (!stackSubs[key]) stackSubs[key] = subs[key];
      }
      for (key in stackSubs) {
        partial.subs[key] = stackSubs[key];
      }

      stackPartials = stackPartials || {};
      partial.stackPartials = stackPartials;
      for (key in partials) {
        if (!stackPartials[key]) stackPartials[key] = partials[key];
      }
      for (key in stackPartials) {
        partial.partials[key] = stackPartials[key];
      }

      return partial;
    }

    var rAmp = /&/g,
        rLt = /</g,
        rGt = />/g,
        rApos = /\'/g,
        rQuot = /\"/g,
        hChars = /[&<>\"\']/;

    function coerceToString(val) {
      return String((val === null || val === undefined) ? '' : val);
    }

    function hoganEscape(str) {
      str = coerceToString(str);
      return hChars.test(str) ?
        str
          .replace(rAmp, '&amp;')
          .replace(rLt, '&lt;')
          .replace(rGt, '&gt;')
          .replace(rApos, '&#39;')
          .replace(rQuot, '&quot;') :
        str;
    }

    var isArray = Array.isArray || function(a) {
      return Object.prototype.toString.call(a) === '[object Array]';
    };

  })( exports );
  });

  /*
   *  Copyright 2011 Twitter, Inc.
   *  Licensed under the Apache License, Version 2.0 (the "License");
   *  you may not use this file except in compliance with the License.
   *  You may obtain a copy of the License at
   *
   *  http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   */

  // This file is for use with Node.js. See dist/ for browser files.


  compiler.Template = template.Template;
  compiler.template = compiler.Template;
  var hogan = compiler;

  var n$1=function(t,s,r,e){var u;s[0]=0;for(var h=1;h<s.length;h++){var p=s[h++],a=s[h]?(s[0]|=p?1:2,r[s[h++]]):s[++h];3===p?e[0]=a:4===p?e[1]=Object.assign(e[1]||{},a):5===p?(e[1]=e[1]||{})[s[++h]]=a:6===p?e[1][s[++h]]+=a+"":p?(u=t.apply(a,n$1(t,a,r,["",null])),e.push(u),a[0]?s[0]|=2:(s[h-2]=0,s[h]=u)):e.push(a);}return e},t$1=new Map;function e$1(s){var r=t$1.get(this);return r||(r=new Map,t$1.set(this,r)),(r=n$1(this,r.get(s)||(r.set(s,r=function(n){for(var t,s,r=1,e="",u="",h=[0],p=function(n){1===r&&(n||(e=e.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?h.push(0,n,e):3===r&&(n||e)?(h.push(3,n,e),r=2):2===r&&"..."===e&&n?h.push(4,n,0):2===r&&e&&!n?h.push(5,0,!0,e):r>=5&&((e||!n&&5===r)&&(h.push(r,0,e,s),r=6),n&&(h.push(r,n,0,s),r=6)),e="";},a=0;a<n.length;a++){a&&(1===r&&p(),p(a));for(var l=0;l<n[a].length;l++)t=n[a][l],1===r?"<"===t?(p(),h=[h],r=3):e+=t:4===r?"--"===e&&">"===t?(r=1,e=""):e=t+e[0]:u?t===u?u="":e+=t:'"'===t||"'"===t?u=t:">"===t?(p(),r=1):r&&("="===t?(r=5,s=e,e=""):"/"===t&&(r<5||">"===n[a][l+1])?(p(),3===r&&(h=h[0]),r=h,(h=h[0]).push(2,0,r),r=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(p(),r=2):e+=t),3===r&&"!--"===e&&(r=4,h=h[0]);}return p(),h}(s)),r),arguments,[])).length>1?r:r[0]}

  var m$1=e$1.bind(h);

  var _extends_1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _extends.apply(this, arguments);
  }
  module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  var _extends$1 = unwrapExports(_extends_1);

  var objectWithoutPropertiesLoose = createCommonjsModule(function (module) {
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(objectWithoutPropertiesLoose);

  var objectWithoutProperties = createCommonjsModule(function (module) {
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  var _objectWithoutProperties$1 = unwrapExports(objectWithoutProperties);

  var _excluded$9 = ["parts", "highlightedTagName", "nonHighlightedTagName", "separator", "className", "classNames"];
  // This is a minimal subset of the actual types from the `JSX` namespace.

  function createHighlightPartComponent(_ref) {
    var createElement = _ref.createElement;
    return function HighlightPart(_ref2) {
      var classNames = _ref2.classNames,
          children = _ref2.children,
          highlightedTagName = _ref2.highlightedTagName,
          isHighlighted = _ref2.isHighlighted,
          nonHighlightedTagName = _ref2.nonHighlightedTagName;
      var TagName = isHighlighted ? highlightedTagName : nonHighlightedTagName;
      return createElement(TagName, {
        className: isHighlighted ? classNames.highlighted : classNames.nonHighlighted
      }, children);
    };
  }

  function createHighlightComponent(_ref3) {
    var createElement = _ref3.createElement,
        Fragment = _ref3.Fragment;
    var HighlightPart = createHighlightPartComponent({
      createElement: createElement,
      Fragment: Fragment
    });
    return function Highlight(_ref4) {
      var parts = _ref4.parts,
          _ref4$highlightedTagN = _ref4.highlightedTagName,
          highlightedTagName = _ref4$highlightedTagN === void 0 ? 'mark' : _ref4$highlightedTagN,
          _ref4$nonHighlightedT = _ref4.nonHighlightedTagName,
          nonHighlightedTagName = _ref4$nonHighlightedT === void 0 ? 'span' : _ref4$nonHighlightedT,
          _ref4$separator = _ref4.separator,
          separator = _ref4$separator === void 0 ? ', ' : _ref4$separator,
          className = _ref4.className,
          _ref4$classNames = _ref4.classNames,
          classNames = _ref4$classNames === void 0 ? {} : _ref4$classNames,
          props = _objectWithoutProperties$1(_ref4, _excluded$9);

      return createElement("span", _extends$1({}, props, {
        className: cx(classNames.root, className)
      }), parts.map(function (part, partIndex) {
        var isLastPart = partIndex === parts.length - 1;
        return createElement(Fragment, {
          key: partIndex
        }, part.map(function (subPart, subPartIndex) {
          return createElement(HighlightPart, {
            key: subPartIndex,
            classNames: classNames,
            highlightedTagName: highlightedTagName,
            nonHighlightedTagName: nonHighlightedTagName,
            isHighlighted: subPart.isHighlighted
          }, subPart.value);
        }), !isLastPart && createElement("span", {
          className: classNames.separator
        }, separator));
      }));
    };
  }

  var InternalHighlight = createHighlightComponent({
    createElement: h,
    Fragment: p
  });

  var _excluded$a = ["classNames"];
  function Highlight(_ref) {
    var _ref$classNames = _ref.classNames,
      classNames = _ref$classNames === void 0 ? {} : _ref$classNames,
      props = _objectWithoutProperties(_ref, _excluded$a);
    return h(InternalHighlight, _extends({
      classNames: {
        root: cx('ais-Highlight', classNames.root),
        highlighted: cx('ais-Highlight-highlighted', classNames.highlighted),
        nonHighlighted: cx('ais-Highlight-nonHighlighted', classNames.nonHighlighted),
        separator: cx('ais-Highlight-separator', classNames.separator)
      }
    }, props));
  }

  var _excluded$b = ["hit", "attribute", "cssClasses"];
  function Highlight$1(_ref) {
    var hit = _ref.hit,
      attribute = _ref.attribute,
      cssClasses = _ref.cssClasses,
      props = _objectWithoutProperties(_ref, _excluded$b);
    var property = getPropertyByPath(hit._highlightResult, attribute) || [];
    var properties = toArray(property);
     _warning(Boolean(properties.length), "Could not enable highlight for \"".concat(attribute.toString(), "\", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n")) ;
    var parts = properties.map(function (_ref2) {
      var value = _ref2.value;
      return getHighlightedParts(unescape$1(value || ''));
    });
    return h(Highlight, _extends({}, props, {
      parts: parts,
      classNames: cssClasses
    }));
  }

  var _excluded$c = ["classNames"];
  function ReverseHighlight(_ref) {
    var _ref$classNames = _ref.classNames,
      classNames = _ref$classNames === void 0 ? {} : _ref$classNames,
      props = _objectWithoutProperties(_ref, _excluded$c);
    return h(InternalHighlight, _extends({
      classNames: {
        root: cx('ais-ReverseHighlight', classNames.root),
        highlighted: cx('ais-ReverseHighlight-highlighted', classNames.highlighted),
        nonHighlighted: cx('ais-ReverseHighlight-nonHighlighted', classNames.nonHighlighted),
        separator: cx('ais-ReverseHighlight-separator', classNames.separator)
      }
    }, props));
  }

  var _excluded$d = ["hit", "attribute", "cssClasses"],
    _excluded2$1 = ["isHighlighted"];
  function ReverseHighlight$1(_ref) {
    var hit = _ref.hit,
      attribute = _ref.attribute,
      cssClasses = _ref.cssClasses,
      props = _objectWithoutProperties(_ref, _excluded$d);
    var property = getPropertyByPath(hit._highlightResult, attribute) || [];
    var properties = toArray(property);
     _warning(Boolean(properties.length), "Could not enable highlight for \"".concat(attribute.toString(), "\", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n")) ;
    var parts = properties.map(function (_ref2) {
      var value = _ref2.value;
      return getHighlightedParts(unescape$1(value || '')).map(function (_ref3) {
        var isHighlighted = _ref3.isHighlighted,
          rest = _objectWithoutProperties(_ref3, _excluded2$1);
        return _objectSpread2(_objectSpread2({}, rest), {}, {
          isHighlighted: !isHighlighted
        });
      });
    });
    return h(ReverseHighlight, _extends({}, props, {
      parts: parts,
      classNames: cssClasses
    }));
  }

  var _excluded$e = ["classNames"];
  function ReverseSnippet(_ref) {
    var _ref$classNames = _ref.classNames,
      classNames = _ref$classNames === void 0 ? {} : _ref$classNames,
      props = _objectWithoutProperties(_ref, _excluded$e);
    return h(InternalHighlight, _extends({
      classNames: {
        root: cx('ais-ReverseSnippet', classNames.root),
        highlighted: cx('ais-ReverseSnippet-highlighted', classNames.highlighted),
        nonHighlighted: cx('ais-ReverseSnippet-nonHighlighted', classNames.nonHighlighted),
        separator: cx('ais-ReverseSnippet-separator', classNames.separator)
      }
    }, props));
  }

  var _excluded$f = ["hit", "attribute", "cssClasses"],
    _excluded2$2 = ["isHighlighted"];
  function ReverseSnippet$1(_ref) {
    var hit = _ref.hit,
      attribute = _ref.attribute,
      cssClasses = _ref.cssClasses,
      props = _objectWithoutProperties(_ref, _excluded$f);
    var property = getPropertyByPath(hit._snippetResult, attribute) || [];
    var properties = toArray(property);
     _warning(Boolean(properties.length), "Could not enable snippet for \"".concat(attribute.toString(), "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) ;
    var parts = properties.map(function (_ref2) {
      var value = _ref2.value;
      return getHighlightedParts(unescape$1(value || '')).map(function (_ref3) {
        var isHighlighted = _ref3.isHighlighted,
          rest = _objectWithoutProperties(_ref3, _excluded2$2);
        return _objectSpread2(_objectSpread2({}, rest), {}, {
          isHighlighted: !isHighlighted
        });
      });
    });
    return h(ReverseSnippet, _extends({}, props, {
      parts: parts,
      classNames: cssClasses
    }));
  }

  var _excluded$g = ["classNames"];
  function Snippet(_ref) {
    var _ref$classNames = _ref.classNames,
      classNames = _ref$classNames === void 0 ? {} : _ref$classNames,
      props = _objectWithoutProperties(_ref, _excluded$g);
    return h(InternalHighlight, _extends({
      classNames: {
        root: cx('ais-Snippet', classNames.root),
        highlighted: cx('ais-Snippet-highlighted', classNames.highlighted),
        nonHighlighted: cx('ais-Snippet-nonHighlighted', classNames.nonHighlighted),
        separator: cx('ais-Snippet-separator', classNames.separator)
      }
    }, props));
  }

  var _excluded$h = ["hit", "attribute", "cssClasses"];
  function Snippet$1(_ref) {
    var hit = _ref.hit,
      attribute = _ref.attribute,
      cssClasses = _ref.cssClasses,
      props = _objectWithoutProperties(_ref, _excluded$h);
    var property = getPropertyByPath(hit._snippetResult, attribute) || [];
    var properties = toArray(property);
     _warning(Boolean(properties.length), "Could not enable snippet for \"".concat(attribute.toString(), "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) ;
    var parts = properties.map(function (_ref2) {
      var value = _ref2.value;
      return getHighlightedParts(unescape$1(value || ''));
    });
    return h(Snippet, _extends({}, props, {
      parts: parts,
      classNames: cssClasses
    }));
  }

  // We add all our template helper methods to the template as lambdas. Note
  // that lambdas in Mustache are supposed to accept a second argument of
  // `render` to get the rendered value, not the literal `{{value}}`. But
  // this is currently broken (see https://github.com/twitter/hogan.js/issues/222).
  function transformHelpersToHogan() {
    var helpers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var compileOptions = arguments.length > 1 ? arguments[1] : undefined;
    var data = arguments.length > 2 ? arguments[2] : undefined;
    return Object.keys(helpers).reduce(function (acc, helperKey) {
      return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, helperKey, function () {
        var _this = this;
        return function (text) {
          var render = function render(value) {
            return hogan.compile(value, compileOptions).render(_this);
          };
          return helpers[helperKey].call(data, text, render);
        };
      }));
    }, {});
  }
  function renderTemplate(_ref) {
    var templates = _ref.templates,
      templateKey = _ref.templateKey,
      compileOptions = _ref.compileOptions,
      helpers = _ref.helpers,
      data = _ref.data,
      bindEvent = _ref.bindEvent,
      sendEvent = _ref.sendEvent;
    var template = templates[templateKey];
    if (typeof template !== 'string' && typeof template !== 'function') {
      throw new Error("Template must be 'string' or 'function', was '".concat(_typeof(template), "' (key: ").concat(templateKey, ")"));
    }
    if (typeof template === 'function') {
      // @MAJOR no longer pass bindEvent when string templates are removed
      var params = bindEvent || {};
      params.html = m$1;
      params.sendEvent = sendEvent;
      params.components = {
        Highlight: Highlight$1,
        ReverseHighlight: ReverseHighlight$1,
        Snippet: Snippet$1,
        ReverseSnippet: ReverseSnippet$1
      };

      // @MAJOR remove the `as any` when string templates are removed
      // needed because not every template receives sendEvent
      return template(data, params);
    }
    var transformedHelpers = transformHelpersToHogan(helpers, compileOptions, data);
    return hogan.compile(template, compileOptions).render(_objectSpread2(_objectSpread2({}, data), {}, {
      helpers: transformedHelpers
    })).replace(/[ \n\r\t\f\xA0]+/g, function (spaces) {
      return spaces.replace(/(^|\xA0+)[^\xA0]+/g, '$1 ');
    }).trim();
  }

  var defaultProps = {
    data: {},
    rootTagName: 'div',
    useCustomCompileOptions: {},
    templates: {},
    templatesConfig: {}
  };
  // @TODO: Template should be a generic and receive TData to pass to Templates (to avoid TTemplateData to be set as `any`)
  var Template = /*#__PURE__*/function (_Component) {
    _inherits(Template, _Component);
    var _super = _createSuper(Template);
    function Template() {
      _classCallCheck(this, Template);
      return _super.apply(this, arguments);
    }
    _createClass(Template, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return !isEqual(this.props.data, nextProps.data) || this.props.templateKey !== nextProps.templateKey || !isEqual(this.props.rootProps, nextProps.rootProps);
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;
         _warning(Object.keys(this.props.templates).every(function (key) {
          return typeof _this.props.templates[key] === 'function';
        }), "Hogan.js and string-based templates are deprecated and will not be supported in InstantSearch.js 5.x.\n\nYou can replace them with function-form templates and use either the provided `html` function or JSX templates.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/#upgrade-templates") ;
        var RootTagName = this.props.rootTagName;
        var useCustomCompileOptions = this.props.useCustomCompileOptions[this.props.templateKey];
        var compileOptions = useCustomCompileOptions ? this.props.templatesConfig.compileOptions : {};
        var content = renderTemplate({
          templates: this.props.templates,
          templateKey: this.props.templateKey,
          compileOptions: compileOptions,
          helpers: this.props.templatesConfig.helpers,
          data: this.props.data,
          bindEvent: this.props.bindEvent,
          sendEvent: this.props.sendEvent
        });
        if (content === null) {
          // Adds a noscript to the DOM but virtual DOM is null
          // See http://facebook.github.io/react/docs/component-specs.html#render
          return null;
        }
        if (_typeof(content) === 'object') {
          return h(RootTagName, this.props.rootProps, content);
        }
        return h(RootTagName, _extends({}, this.props.rootProps, {
          dangerouslySetInnerHTML: {
            __html: content
          }
        }));
      }
    }]);
    return Template;
  }(d);
  _defineProperty(Template, "defaultProps", defaultProps);

  var Answers = function Answers(_ref) {
    var hits = _ref.hits,
      isLoading = _ref.isLoading,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
    return h("div", {
      className: cx(cssClasses.root, hits.length === 0 && cssClasses.emptyRoot)
    }, h(Template, _extends({}, templateProps, {
      templateKey: "header",
      rootProps: {
        className: cssClasses.header
      },
      data: {
        hits: hits,
        isLoading: isLoading
      }
    })), isLoading ? h(Template, _extends({}, templateProps, {
      templateKey: "loader",
      rootProps: {
        className: cssClasses.loader
      }
    })) : h("ul", {
      className: cssClasses.list
    }, hits.map(function (hit, index) {
      return h(Template, _extends({}, templateProps, {
        templateKey: "item",
        rootTagName: "li",
        rootProps: {
          className: cssClasses.item
        },
        key: hit.objectID,
        data: _objectSpread2(_objectSpread2({}, hit), {}, {
          get __hitIndex() {
             _warning(false, 'The `__hitIndex` property is deprecated. Use the absolute `__position` instead.') ;
            return index;
          }
        })
      }));
    })));
  };

  var defaultTemplates = {
    header: function header() {
      return '';
    },
    loader: function loader() {
      return '';
    },
    item: function item(_item) {
      return JSON.stringify(_item);
    }
  };

  var withUsage$s = createDocumentationMessageGenerator({
    name: 'answers'
  });
  var suit$4 = component('Answers');
  var renderer = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
    return function (_ref2, isFirstRendering) {
      var hits = _ref2.hits,
        isLoading = _ref2.isLoading,
        instantSearchInstance = _ref2.instantSearchInstance;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(Answers, {
        cssClasses: cssClasses,
        hits: hits,
        isLoading: isLoading,
        templateProps: renderState.templateProps
      }), containerNode);
    };
  };
  var answersWidget = function answersWidget(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attributesForPrediction = _ref3.attributesForPrediction,
      queryLanguages = _ref3.queryLanguages,
      nbHits = _ref3.nbHits,
      searchDebounceTime = _ref3.searchDebounceTime,
      renderDebounceTime = _ref3.renderDebounceTime,
      escapeHTML = _ref3.escapeHTML,
      extraParameters = _ref3.extraParameters,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;
    if (!container) {
      throw new Error(withUsage$s('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$4(), userCssClasses.root),
      emptyRoot: cx(suit$4({
        modifierName: 'empty'
      }), userCssClasses.emptyRoot),
      header: cx(suit$4({
        descendantName: 'header'
      }), userCssClasses.header),
      loader: cx(suit$4({
        descendantName: 'loader'
      }), userCssClasses.loader),
      list: cx(suit$4({
        descendantName: 'list'
      }), userCssClasses.list),
      item: cx(suit$4({
        descendantName: 'item'
      }), userCssClasses.item)
    };
    var specializedRenderer = renderer({
      containerNode: containerNode,
      cssClasses: cssClasses,
      templates: templates,
      renderState: {}
    });
    var makeWidget = connectAnswers(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attributesForPrediction: attributesForPrediction,
      queryLanguages: queryLanguages,
      nbHits: nbHits,
      searchDebounceTime: searchDebounceTime,
      renderDebounceTime: renderDebounceTime,
      escapeHTML: escapeHTML,
      extraParameters: extraParameters
    })), {}, {
      $$widgetType: 'ais.answers'
    });
  };

  var _excluded$i = ["container", "widgets", "fallbackWidget"];
  var withUsage$t = createDocumentationMessageGenerator({
    name: 'dynamic-widgets'
  });
  var suit$5 = component('DynamicWidgets');
  function createContainer(rootContainer) {
    var container = document.createElement('div');
    container.className = suit$5({
      descendantName: 'widget'
    });
    rootContainer.appendChild(container);
    return container;
  }
  var dynamicWidgets = function dynamicWidgets(widgetParams) {
    var _ref = widgetParams || {},
      containerSelector = _ref.container,
      widgets = _ref.widgets,
      fallbackWidget = _ref.fallbackWidget,
      otherWidgetParams = _objectWithoutProperties(_ref, _excluded$i);
    if (!containerSelector) {
      throw new Error(withUsage$t('The `container` option is required.'));
    }
    if (!(widgets && Array.isArray(widgets) && widgets.every(function (widget) {
      return typeof widget === 'function';
    }))) {
      throw new Error(withUsage$t('The `widgets` option expects an array of callbacks.'));
    }
    var userContainer = getContainerNode(containerSelector);
    var rootContainer = document.createElement('div');
    rootContainer.className = suit$5();
    var containers = new Map();
    var connectorWidgets = [];
    var makeWidget = connectDynamicWidgets(function (_ref2, isFirstRender) {
      var attributesToRender = _ref2.attributesToRender;
      if (isFirstRender) {
        userContainer.appendChild(rootContainer);
      }
      attributesToRender.forEach(function (attribute) {
        if (!containers.has(attribute)) {
          return;
        }
        var container = containers.get(attribute);
        rootContainer.appendChild(container);
      });
    }, function () {
      userContainer.removeChild(rootContainer);
    });
    var widget = makeWidget(_objectSpread2(_objectSpread2({}, otherWidgetParams), {}, {
      widgets: connectorWidgets,
      fallbackWidget: typeof fallbackWidget === 'function' ? function (_ref3) {
        var attribute = _ref3.attribute;
        var container = createContainer(rootContainer);
        containers.set(attribute, container);
        return fallbackWidget({
          attribute: attribute,
          container: container
        });
      } : undefined
    }));
    return _objectSpread2(_objectSpread2({}, widget), {}, {
      init: function init(initOptions) {
        widgets.forEach(function (cb) {
          var container = createContainer(rootContainer);
          var childWidget = cb(container);
          var attribute = getWidgetAttribute(childWidget, initOptions);
          containers.set(attribute, container);
          connectorWidgets.push(childWidget);
        });
        widget.init(initOptions);
      },
      $$widgetType: 'ais.dynamicWidgets'
    });
  };

  var withUsage$u = createDocumentationMessageGenerator({
    name: 'analytics'
  });
  // @major this widget will be removed from the next major version.
  var analytics = function analytics(widgetParams) {
    var _ref = widgetParams || {},
      pushFunction = _ref.pushFunction,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 3000 : _ref$delay,
      _ref$triggerOnUIInter = _ref.triggerOnUIInteraction,
      triggerOnUIInteraction = _ref$triggerOnUIInter === void 0 ? false : _ref$triggerOnUIInter,
      _ref$pushInitialSearc = _ref.pushInitialSearch,
      pushInitialSearch = _ref$pushInitialSearc === void 0 ? true : _ref$pushInitialSearc,
      _ref$pushPagination = _ref.pushPagination,
      pushPagination = _ref$pushPagination === void 0 ? false : _ref$pushPagination;
    if (!pushFunction) {
      throw new Error(withUsage$u('The `pushFunction` option is required.'));
    }
     _warning(false, "`analytics` widget has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor the migration, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/#analytics-widget") ;
    var cachedState = null;
    var serializeRefinements = function serializeRefinements(parameters) {
      var refinements = [];

      // eslint-disable-next-line no-restricted-syntax
      for (var parameter in parameters) {
        if (parameters.hasOwnProperty(parameter)) {
          var values = parameters[parameter].join('+');
          refinements.push("".concat(encodeURIComponent(parameter), "=").concat(encodeURIComponent(parameter), "_").concat(encodeURIComponent(values)));
        }
      }
      return refinements.join('&');
    };
    var serializeNumericRefinements = function serializeNumericRefinements(numericRefinements) {
      var refinements = [];

      // eslint-disable-next-line no-restricted-syntax
      for (var attribute in numericRefinements) {
        if (numericRefinements.hasOwnProperty(attribute)) {
          var filter = numericRefinements[attribute];
          if (filter.hasOwnProperty('>=') && filter.hasOwnProperty('<=')) {
            if (filter['>='] && filter['>='][0] === filter['<='] && filter['<='][0]) {
              refinements.push("".concat(attribute, "=").concat(attribute, "_").concat(filter['>=']));
            } else {
              refinements.push("".concat(attribute, "=").concat(attribute, "_").concat(filter['>='], "to").concat(filter['<=']));
            }
          } else if (filter.hasOwnProperty('>=')) {
            refinements.push("".concat(attribute, "=").concat(attribute, "_from").concat(filter['>=']));
          } else if (filter.hasOwnProperty('<=')) {
            refinements.push("".concat(attribute, "=").concat(attribute, "_to").concat(filter['<=']));
          } else if (filter.hasOwnProperty('=')) {
            var equals = [];

            // eslint-disable-next-line no-restricted-syntax
            for (var equal in filter['=']) {
              // eslint-disable-next-line max-depth
              if (filter['='].hasOwnProperty(equal)) {
                // @ts-ignore somehow 'equal' is a string, even though it's a number?
                equals.push(filter['='][equal]);
              }
            }
            refinements.push("".concat(attribute, "=").concat(attribute, "_").concat(equals.join('-')));
          }
        }
      }
      return refinements.join('&');
    };
    var lastSentData = '';
    var sendAnalytics = function sendAnalytics(analyticsState) {
      if (analyticsState === null) {
        return;
      }
      var serializedParams = [];
      var serializedRefinements = serializeRefinements(_objectSpread2(_objectSpread2(_objectSpread2({}, analyticsState.state.disjunctiveFacetsRefinements), analyticsState.state.facetsRefinements), analyticsState.state.hierarchicalFacetsRefinements));
      var serializedNumericRefinements = serializeNumericRefinements(analyticsState.state.numericRefinements);
      if (serializedRefinements !== '') {
        serializedParams.push(serializedRefinements);
      }
      if (serializedNumericRefinements !== '') {
        serializedParams.push(serializedNumericRefinements);
      }
      var stringifiedParams = serializedParams.join('&');
      var dataToSend = "Query: ".concat(analyticsState.state.query || '', ", ").concat(stringifiedParams);
      if (pushPagination === true) {
        dataToSend += ", Page: ".concat(analyticsState.state.page || 0);
      }
      if (lastSentData !== dataToSend) {
        pushFunction(stringifiedParams, analyticsState.state, analyticsState.results);
        lastSentData = dataToSend;
      }
    };
    var pushTimeout;
    var isInitialSearch = true;
    if (pushInitialSearch === true) {
      isInitialSearch = false;
    }
    var onClick = function onClick() {
      sendAnalytics(cachedState);
    };
    var onUnload = function onUnload() {
      sendAnalytics(cachedState);
    };
    return {
      $$type: 'ais.analytics',
      $$widgetType: 'ais.analytics',
      init: function init() {
        if (triggerOnUIInteraction === true) {
          document.addEventListener('click', onClick);
          window.addEventListener('beforeunload', onUnload);
        }
      },
      render: function render(_ref2) {
        var results = _ref2.results,
          state = _ref2.state;
        if (isInitialSearch === true) {
          isInitialSearch = false;
          return;
        }
        cachedState = {
          results: results,
          state: state
        };
        if (pushTimeout) {
          clearTimeout(pushTimeout);
        }
        pushTimeout = window.setTimeout(function () {
          return sendAnalytics(cachedState);
        }, delay);
      },
      dispose: function dispose() {
        if (triggerOnUIInteraction === true) {
          document.removeEventListener('click', onClick);
          window.removeEventListener('beforeunload', onUnload);
        }
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread2(_objectSpread2({}, renderState), {}, {
          analytics: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState() {
        return {
          widgetParams: widgetParams
        };
      }
    };
  };

  var Breadcrumb = function Breadcrumb(_ref) {
    var items = _ref.items,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps,
      createURL = _ref.createURL,
      refine = _ref.refine;
    return h("div", {
      className: cx(cssClasses.root, items.length === 0 && cssClasses.noRefinementRoot)
    }, h("ul", {
      className: cssClasses.list
    }, h("li", {
      className: cx(cssClasses.item, items.length === 0 && cssClasses.selectedItem)
    }, h(Template, _extends({}, templateProps, {
      templateKey: "home",
      rootTagName: "a",
      rootProps: {
        className: cssClasses.link,
        href: createURL(undefined),
        onClick: function onClick(event) {
          event.preventDefault();
          refine(undefined);
        }
      }
    }))), items.map(function (item, idx) {
      var isLast = idx === items.length - 1;
      return h("li", {
        key: item.label + idx,
        className: cx(cssClasses.item, isLast && cssClasses.selectedItem)
      }, h(Template, _extends({}, templateProps, {
        templateKey: "separator",
        rootTagName: "span",
        rootProps: {
          className: cssClasses.separator,
          'aria-hidden': true
        }
      })), isLast ? item.label : h("a", {
        className: cssClasses.link,
        href: createURL(item.value),
        onClick: function onClick(event) {
          event.preventDefault();
          refine(item.value);
        }
      }, item.label));
    })));
  };

  var defaultTemplates$1 = {
    home: function home() {
      return 'Home';
    },
    separator: function separator() {
      return '>';
    }
  };

  var withUsage$v = createDocumentationMessageGenerator({
    name: 'breadcrumb'
  });
  var suit$6 = component('Breadcrumb');
  var renderer$1 = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
    return function (_ref2, isFirstRendering) {
      var canRefine = _ref2.canRefine,
        createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        items = _ref2.items,
        refine = _ref2.refine;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$1,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(Breadcrumb, {
        canRefine: canRefine,
        cssClasses: cssClasses,
        createURL: createURL,
        items: items,
        refine: refine,
        templateProps: renderState.templateProps
      }), containerNode);
    };
  };
  var breadcrumb = function breadcrumb(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attributes = _ref3.attributes,
      separator = _ref3.separator,
      rootPath = _ref3.rootPath,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;
    if (!container) {
      throw new Error(withUsage$v('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$6(), userCssClasses.root),
      noRefinementRoot: cx(suit$6({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      list: cx(suit$6({
        descendantName: 'list'
      }), userCssClasses.list),
      item: cx(suit$6({
        descendantName: 'item'
      }), userCssClasses.item),
      selectedItem: cx(suit$6({
        descendantName: 'item',
        modifierName: 'selected'
      }), userCssClasses.selectedItem),
      separator: cx(suit$6({
        descendantName: 'separator'
      }), userCssClasses.separator),
      link: cx(suit$6({
        descendantName: 'link'
      }), userCssClasses.link)
    };
    var specializedRenderer = renderer$1({
      containerNode: containerNode,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates
    });
    var makeWidget = connectBreadcrumb(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attributes: attributes,
      separator: separator,
      rootPath: rootPath,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.breadcrumb'
    });
  };

  var ClearRefinements = function ClearRefinements(_ref) {
    var hasRefinements = _ref.hasRefinements,
      refine = _ref.refine,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
    return h("div", {
      className: cssClasses.root
    }, h(Template, _extends({}, templateProps, {
      templateKey: "resetLabel",
      rootTagName: "button",
      rootProps: {
        className: cx(cssClasses.button, !hasRefinements && cssClasses.disabledButton),
        onClick: refine,
        disabled: !hasRefinements
      },
      data: {
        hasRefinements: hasRefinements
      }
    })));
  };

  var defaultTemplates$2 = {
    resetLabel: function resetLabel() {
      return 'Clear refinements';
    }
  };

  var withUsage$w = createDocumentationMessageGenerator({
    name: 'clear-refinements'
  });
  var suit$7 = component('ClearRefinements');
  var renderer$2 = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
    return function (_ref2, isFirstRendering) {
      var refine = _ref2.refine,
        canRefine = _ref2.canRefine,
        instantSearchInstance = _ref2.instantSearchInstance;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$2,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(ClearRefinements, {
        refine: refine,
        cssClasses: cssClasses,
        hasRefinements: canRefine,
        templateProps: renderState.templateProps
      }), containerNode);
    };
  };
  var clearRefinements$1 = function clearRefinements(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      includedAttributes = _ref3.includedAttributes,
      excludedAttributes = _ref3.excludedAttributes,
      transformItems = _ref3.transformItems,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;
    if (!container) {
      throw new Error(withUsage$w('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$7(), userCssClasses.root),
      button: cx(suit$7({
        descendantName: 'button'
      }), userCssClasses.button),
      disabledButton: cx(suit$7({
        descendantName: 'button',
        modifierName: 'disabled'
      }), userCssClasses.disabledButton)
    };
    var specializedRenderer = renderer$2({
      containerNode: containerNode,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates
    });
    var makeWidget = connectClearRefinements(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      includedAttributes: includedAttributes,
      excludedAttributes: excludedAttributes,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.clearRefinements'
    });
  };

  var configure = function configure(widgetParams) {
    // This is a renderless widget that falls back to the connector's
    // noop render and unmount functions.
    var makeWidget = connectConfigure(noop);
    return _objectSpread2(_objectSpread2({}, makeWidget({
      searchParameters: widgetParams
    })), {}, {
      $$widgetType: 'ais.configure'
    });
  };

  var createItemKey = function createItemKey(_ref) {
    var attribute = _ref.attribute,
      value = _ref.value,
      type = _ref.type,
      operator = _ref.operator;
    return [attribute, type, value, operator].map(function (key) {
      return key;
    }).filter(Boolean).join(':');
  };
  var handleClick = function handleClick(callback) {
    return function (event) {
      if (isSpecialClick(event)) {
        return;
      }
      event.preventDefault();
      callback();
    };
  };
  var CurrentRefinements = function CurrentRefinements(_ref2) {
    var items = _ref2.items,
      cssClasses = _ref2.cssClasses,
      canRefine = _ref2.canRefine;
    return h("div", {
      className: cx(cssClasses.root, !canRefine && cssClasses.noRefinementRoot)
    }, h("ul", {
      className: cssClasses.list
    }, items.map(function (item, index) {
      return h("li", {
        key: "".concat(item.indexName, "-").concat(item.attribute, "-").concat(index),
        className: cssClasses.item
      }, h("span", {
        className: cssClasses.label
      }, capitalize(item.label), ":"), item.refinements.map(function (refinement) {
        return h("span", {
          key: createItemKey(refinement),
          className: cssClasses.category
        }, h("span", {
          className: cssClasses.categoryLabel
        }, refinement.attribute === 'query' ? h("q", null, refinement.label) : refinement.label), h("button", {
          className: cssClasses.delete,
          onClick: handleClick(item.refine.bind(null, refinement))
        }, "\u2715"));
      }));
    })));
  };

  var withUsage$x = createDocumentationMessageGenerator({
    name: 'current-refinements'
  });
  var suit$8 = component('CurrentRefinements');
  var renderer$3 = function renderer(_ref, isFirstRender) {
    var items = _ref.items,
      widgetParams = _ref.widgetParams,
      canRefine = _ref.canRefine;
    if (isFirstRender) {
      return;
    }
    var _ref2 = widgetParams,
      container = _ref2.container,
      cssClasses = _ref2.cssClasses;
    P(h(CurrentRefinements, {
      cssClasses: cssClasses,
      items: items,
      canRefine: canRefine
    }), container);
  };
  var currentRefinements = function currentRefinements(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      includedAttributes = _ref3.includedAttributes,
      excludedAttributes = _ref3.excludedAttributes,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      transformItems = _ref3.transformItems;
    if (!container) {
      throw new Error(withUsage$x('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$8(), userCssClasses.root),
      noRefinementRoot: cx(suit$8({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      list: cx(suit$8({
        descendantName: 'list'
      }), userCssClasses.list),
      item: cx(suit$8({
        descendantName: 'item'
      }), userCssClasses.item),
      label: cx(suit$8({
        descendantName: 'label'
      }), userCssClasses.label),
      category: cx(suit$8({
        descendantName: 'category'
      }), userCssClasses.category),
      categoryLabel: cx(suit$8({
        descendantName: 'categoryLabel'
      }), userCssClasses.categoryLabel),
      delete: cx(suit$8({
        descendantName: 'delete'
      }), userCssClasses.delete)
    };
    var makeWidget = connectCurrentRefinements(renderer$3, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      container: containerNode,
      cssClasses: cssClasses,
      includedAttributes: includedAttributes,
      excludedAttributes: excludedAttributes,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.currentRefinements'
    });
  };

  var configureRelatedItems = function configureRelatedItems(widgetParams) {
    var makeWidget = connectConfigureRelatedItems(noop);
    return _objectSpread2(_objectSpread2({}, makeWidget(widgetParams)), {}, {
      $$widgetType: 'ais.configureRelatedItems'
    });
  };

  var createHTMLMarker = function createHTMLMarker(googleReference) {
    var HTMLMarker = /*#__PURE__*/function (_googleReference$maps) {
      _inherits(HTMLMarker, _googleReference$maps);
      var _super = _createSuper(HTMLMarker);
      function HTMLMarker(_ref) {
        var _this;
        var __id = _ref.__id,
          position = _ref.position,
          map = _ref.map,
          template = _ref.template,
          className = _ref.className,
          _ref$anchor = _ref.anchor,
          anchor = _ref$anchor === void 0 ? {
            x: 0,
            y: 0
          } : _ref$anchor;
        _classCallCheck(this, HTMLMarker);
        _this = _super.call(this);
        _defineProperty(_assertThisInitialized(_this), "__id", void 0);
        _defineProperty(_assertThisInitialized(_this), "anchor", void 0);
        _defineProperty(_assertThisInitialized(_this), "offset", void 0);
        _defineProperty(_assertThisInitialized(_this), "listeners", void 0);
        _defineProperty(_assertThisInitialized(_this), "latLng", void 0);
        _defineProperty(_assertThisInitialized(_this), "element", void 0);
        _this.__id = __id;
        _this.anchor = anchor;
        _this.listeners = {};
        _this.latLng = new googleReference.maps.LatLng(position);
        _this.element = document.createElement('div');
        _this.element.className = className;
        _this.element.style.position = 'absolute';
        if (_typeof(template) === 'object') {
          P(template, _this.element);
        } else {
          _this.element.innerHTML = template;
        }
        _this.setMap(map);
        return _this;
      }
      _createClass(HTMLMarker, [{
        key: "onAdd",
        value: function onAdd() {
          // Append the element to the map
          this.getPanes().overlayMouseTarget.appendChild(this.element);

          // Compute the offset onAdd & cache it because afterwards
          // it won't retrieve the correct values, we also avoid
          // to read the values on every draw
          var bbBox = this.element.getBoundingClientRect();
          this.offset = {
            x: this.anchor.x + bbBox.width / 2,
            y: this.anchor.y + bbBox.height
          };

          // Force the width of the element will avoid the
          // content to collapse when we move the map
          this.element.style.width = "".concat(bbBox.width, "px");
        }
      }, {
        key: "draw",
        value: function draw() {
          var position = this.getProjection().fromLatLngToDivPixel(this.latLng);
          this.element.style.left = "".concat(Math.round(position.x - this.offset.x), "px");
          this.element.style.top = "".concat(Math.round(position.y - this.offset.y), "px");

          // Markers to the south are in front of markers to the north
          // This is the default behaviour of Google Maps
          this.element.style.zIndex = String(parseInt(this.element.style.top, 10));
        }
      }, {
        key: "onRemove",
        value: function onRemove() {
          var _this2 = this;
          if (this.element) {
            this.element.parentNode.removeChild(this.element);
            Object.keys(this.listeners).forEach(function (eventName) {
              _this2.element.removeEventListener(eventName, _this2.listeners[eventName]);
            });

            // after onRemove the class is no longer used, thus it can be deleted
            // @ts-expect-error
            delete this.element;
            // @ts-expect-error
            delete this.listeners;
          }
        }
      }, {
        key: "addListener",
        value: function addListener(eventName, listener) {
          this.listeners[eventName] = listener;
          var element = this.element;
          element.addEventListener(eventName, listener);
          return {
            remove: function remove() {
              return element.removeEventListener(eventName, listener);
            }
          };
        }
      }, {
        key: "getPosition",
        value: function getPosition() {
          return this.latLng;
        }
      }]);
      return HTMLMarker;
    }(googleReference.maps.OverlayView);
    return HTMLMarker;
  };

  var _ref = h("p", null, "Your custom HTML Marker");
  var defaultTemplates$3 = {
    HTMLMarker: function HTMLMarker() {
      return _ref;
    },
    reset: function reset() {
      return 'Clear the map refinement';
    },
    toggle: function toggle() {
      return 'Search as I move the map';
    },
    redo: function redo() {
      return 'Redo search here';
    }
  };

  var GeoSearchButton = function GeoSearchButton(_ref) {
    var className = _ref.className,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      onClick = _ref.onClick,
      children = _ref.children;
    return h("button", {
      className: className,
      onClick: onClick,
      disabled: disabled
    }, children);
  };

  var GeoSearchToggle = function GeoSearchToggle(_ref) {
    var classNameLabel = _ref.classNameLabel,
      classNameInput = _ref.classNameInput,
      checked = _ref.checked,
      onToggle = _ref.onToggle,
      children = _ref.children;
    return h("label", {
      className: classNameLabel
    }, h("input", {
      className: classNameInput,
      type: "checkbox",
      checked: checked,
      onChange: onToggle
    }), children);
  };

  var GeoSearchControls = function GeoSearchControls(_ref) {
    var cssClasses = _ref.cssClasses,
      enableRefine = _ref.enableRefine,
      enableRefineControl = _ref.enableRefineControl,
      enableClearMapRefinement = _ref.enableClearMapRefinement,
      isRefineOnMapMove = _ref.isRefineOnMapMove,
      isRefinedWithMap = _ref.isRefinedWithMap,
      hasMapMoveSinceLastRefine = _ref.hasMapMoveSinceLastRefine,
      onRefineToggle = _ref.onRefineToggle,
      onRefineClick = _ref.onRefineClick,
      onClearClick = _ref.onClearClick,
      templateProps = _ref.templateProps;
    return h(p, null, enableRefine && h("div", null, enableRefineControl && h("div", {
      className: cssClasses.control
    }, isRefineOnMapMove || !hasMapMoveSinceLastRefine ? h(GeoSearchToggle, {
      classNameLabel: cx(cssClasses.label, isRefineOnMapMove && cssClasses.selectedLabel),
      classNameInput: cssClasses.input,
      checked: isRefineOnMapMove,
      onToggle: onRefineToggle
    }, h(Template, _extends({}, templateProps, {
      templateKey: "toggle",
      rootTagName: "span"
    }))) : h(GeoSearchButton, {
      className: cssClasses.redo,
      disabled: !hasMapMoveSinceLastRefine,
      onClick: onRefineClick
    }, h(Template, _extends({}, templateProps, {
      templateKey: "redo",
      rootTagName: "span"
    })))), !enableRefineControl && !isRefineOnMapMove && h("div", {
      className: cssClasses.control
    }, h(GeoSearchButton, {
      className: cx(cssClasses.redo, !hasMapMoveSinceLastRefine && cssClasses.disabledRedo),
      disabled: !hasMapMoveSinceLastRefine,
      onClick: onRefineClick
    }, h(Template, _extends({}, templateProps, {
      templateKey: "redo",
      rootTagName: "span"
    })))), enableClearMapRefinement && isRefinedWithMap && h(GeoSearchButton, {
      className: cssClasses.reset,
      onClick: onClearClick
    }, h(Template, _extends({}, templateProps, {
      templateKey: "reset",
      rootTagName: "span"
    })))));
  };

  var refineWithMap = function refineWithMap(_ref) {
    var refine = _ref.refine,
      mapInstance = _ref.mapInstance;
    return refine({
      northEast: mapInstance.getBounds().getNorthEast().toJSON(),
      southWest: mapInstance.getBounds().getSouthWest().toJSON()
    });
  };
  var collectMarkersForNextRender = function collectMarkersForNextRender(markers, nextIds) {
    return markers.reduce(function (_ref2, marker) {
      var _ref3 = _slicedToArray(_ref2, 2),
        update = _ref3[0],
        exit = _ref3[1];
      var persist = nextIds.includes(marker.__id);
      return persist ? [update.concat(marker), exit] : [update, exit.concat(marker)];
    }, [[], []]);
  };
  var createBoundingBoxFromMarkers = function createBoundingBoxFromMarkers(google, markers) {
    var latLngBounds = markers.reduce(function (acc, marker) {
      return acc.extend(marker.getPosition());
    }, new google.maps.LatLngBounds());
    return {
      northEast: latLngBounds.getNorthEast().toJSON(),
      southWest: latLngBounds.getSouthWest().toJSON()
    };
  };
  var lockUserInteraction = function lockUserInteraction(renderState, functionThatAltersTheMapPosition) {
    renderState.isUserInteraction = false;
    functionThatAltersTheMapPosition();
    renderState.isUserInteraction = true;
  };
  var renderer$4 = function renderer(_ref4, isFirstRendering) {
    var items = _ref4.items,
      position = _ref4.position,
      currentRefinement = _ref4.currentRefinement,
      refine = _ref4.refine,
      clearMapRefinement = _ref4.clearMapRefinement,
      toggleRefineOnMapMove = _ref4.toggleRefineOnMapMove,
      isRefineOnMapMove = _ref4.isRefineOnMapMove,
      setMapMoveSinceLastRefine = _ref4.setMapMoveSinceLastRefine,
      hasMapMoveSinceLastRefine = _ref4.hasMapMoveSinceLastRefine,
      isRefinedWithMap = _ref4.isRefinedWithMap,
      widgetParams = _ref4.widgetParams,
      instantSearchInstance = _ref4.instantSearchInstance;
    var container = widgetParams.container,
      googleReference = widgetParams.googleReference,
      cssClasses = widgetParams.cssClasses,
      templates = widgetParams.templates,
      initialZoom = widgetParams.initialZoom,
      initialPosition = widgetParams.initialPosition,
      enableRefine = widgetParams.enableRefine,
      enableClearMapRefinement = widgetParams.enableClearMapRefinement,
      enableRefineControl = widgetParams.enableRefineControl,
      mapOptions = widgetParams.mapOptions,
      createMarker = widgetParams.createMarker,
      markerOptions = widgetParams.markerOptions,
      renderState = widgetParams.renderState;
    if (isFirstRendering) {
      renderState.isUserInteraction = true;
      renderState.isPendingRefine = false;
      renderState.markers = [];
      var rootElement = document.createElement('div');
      rootElement.className = cssClasses.root;
      container.appendChild(rootElement);
      var mapElement = document.createElement('div');
      mapElement.className = cssClasses.map;
      rootElement.appendChild(mapElement);
      var treeElement = document.createElement('div');
      treeElement.className = cssClasses.tree;
      rootElement.appendChild(treeElement);
      renderState.mapInstance = new googleReference.maps.Map(mapElement, _objectSpread2({
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        clickableIcons: false,
        zoomControlOptions: {
          position: googleReference.maps.ControlPosition.LEFT_TOP
        }
      }, mapOptions));
      var setupListenersWhenMapIsReady = function setupListenersWhenMapIsReady() {
        var onChange = function onChange() {
          if (renderState.isUserInteraction && enableRefine) {
            setMapMoveSinceLastRefine();
            if (isRefineOnMapMove()) {
              renderState.isPendingRefine = true;
            }
          }
        };
        renderState.mapInstance.addListener('center_changed', onChange);
        renderState.mapInstance.addListener('zoom_changed', onChange);
        renderState.mapInstance.addListener('dragstart', onChange);
        renderState.mapInstance.addListener('idle', function () {
          if (renderState.isUserInteraction && renderState.isPendingRefine) {
            renderState.isPendingRefine = false;
            refineWithMap({
              mapInstance: renderState.mapInstance,
              refine: refine
            });
          }
        });
      };
      googleReference.maps.event.addListenerOnce(renderState.mapInstance, 'idle', setupListenersWhenMapIsReady);
      renderState.templateProps = prepareTemplateProps({
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    // Collect markers that need to be updated or removed
    var nextItemsIds = items.map(function (_) {
      return _.objectID;
    });
    var _collectMarkersForNex = collectMarkersForNextRender(renderState.markers, nextItemsIds),
      _collectMarkersForNex2 = _slicedToArray(_collectMarkersForNex, 2),
      updateMarkers = _collectMarkersForNex2[0],
      exitMarkers = _collectMarkersForNex2[1];

    // Collect items that will be added
    var updateMarkerIds = updateMarkers.map(function (_) {
      return _.__id;
    });
    var nextPendingItems = items.filter(function (item) {
      return !updateMarkerIds.includes(item.objectID);
    });

    // Remove all markers that need to be removed
    exitMarkers.forEach(function (marker) {
      return marker.setMap(null);
    });

    // Create the markers from the items
    renderState.markers = updateMarkers.concat(nextPendingItems.map(function (item) {
      var marker = createMarker({
        map: renderState.mapInstance,
        item: item
      });
      Object.keys(markerOptions.events).forEach(function (eventName) {
        marker.addListener(eventName, function (event) {
          markerOptions.events[eventName]({
            map: renderState.mapInstance,
            event: event,
            item: item,
            marker: marker
          });
        });
      });
      return marker;
    }));
    var shouldUpdate = !hasMapMoveSinceLastRefine();

    // We use this value for differentiate the padding to apply during
    // fitBounds. When we don't have a currenRefinement (boundingBox)
    // we let Google Maps compute the automatic padding. But when we
    // provide the currentRefinement we explicitly set the padding
    // to `0` otherwise the map will decrease the zoom on each refine.
    var boundingBoxPadding = currentRefinement ? 0 : null;
    var boundingBox = !currentRefinement && Boolean(renderState.markers.length) ? createBoundingBoxFromMarkers(googleReference, renderState.markers) : currentRefinement;
    if (boundingBox && shouldUpdate) {
      lockUserInteraction(renderState, function () {
        renderState.mapInstance.fitBounds(new googleReference.maps.LatLngBounds(boundingBox.southWest, boundingBox.northEast), boundingBoxPadding);
      });
    } else if (shouldUpdate) {
      lockUserInteraction(renderState, function () {
        renderState.mapInstance.setCenter(position || initialPosition);
        renderState.mapInstance.setZoom(initialZoom);
      });
    }
    P(h(GeoSearchControls, {
      cssClasses: cssClasses,
      enableRefine: enableRefine,
      enableRefineControl: enableRefineControl,
      enableClearMapRefinement: enableClearMapRefinement,
      isRefineOnMapMove: isRefineOnMapMove(),
      isRefinedWithMap: isRefinedWithMap(),
      hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine(),
      onRefineToggle: toggleRefineOnMapMove,
      onRefineClick: function onRefineClick() {
        return refineWithMap({
          mapInstance: renderState.mapInstance,
          refine: refine
        });
      },
      onClearClick: clearMapRefinement,
      templateProps: renderState.templateProps
    }), container.querySelector(".".concat(cssClasses.tree)));
  };

  var _excluded$j = ["initialZoom", "initialPosition", "templates", "cssClasses", "builtInMarker", "customHTMLMarker", "enableRefine", "enableClearMapRefinement", "enableRefineControl", "container", "googleReference"],
    _excluded2$3 = ["item"],
    _excluded3 = ["item"];
  var withUsage$y = createDocumentationMessageGenerator({
    name: 'geo-search'
  });
  var suit$9 = component('GeoSearch');
  /**
   * The **GeoSearch** widget displays the list of results from the search on a Google Maps. It also provides a way to search for results based on their position. The widget also provide some of the common GeoSearch patterns like search on map interaction.
   *
   * @requirements
   *
   * Note that the GeoSearch widget uses the [geosearch](https://www.algolia.com/doc/guides/searching/geo-search) capabilities of Algolia. Your hits **must** have a `_geoloc` attribute in order to be displayed on the map.
   *
   * Currently, the feature is not compatible with multiple values in the _geoloc attribute.
   *
   * You are also responsible for loading the Google Maps library, it's not shipped with InstantSearch. You need to load the Google Maps library and pass a reference to the widget. You can find more information about how to install the library in [the Google Maps documentation](https://developers.google.com/maps/documentation/javascript/tutorial).
   *
   * Don't forget to explicitly set the `height` of the map container (default class `.ais-geo-search--map`), otherwise it won't be shown (it's a requirement of Google Maps).
   */
  var geoSearch = function geoSearch(widgetParams) {
    var _ref = widgetParams || {},
      _ref$initialZoom = _ref.initialZoom,
      initialZoom = _ref$initialZoom === void 0 ? 1 : _ref$initialZoom,
      _ref$initialPosition = _ref.initialPosition,
      initialPosition = _ref$initialPosition === void 0 ? {
        lat: 0,
        lng: 0
      } : _ref$initialPosition,
      _ref$templates = _ref.templates,
      userTemplates = _ref$templates === void 0 ? {} : _ref$templates,
      _ref$cssClasses = _ref.cssClasses,
      userCssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses,
      _ref$builtInMarker = _ref.builtInMarker,
      userBuiltInMarker = _ref$builtInMarker === void 0 ? {} : _ref$builtInMarker,
      userCustomHTMLMarker = _ref.customHTMLMarker,
      _ref$enableRefine = _ref.enableRefine,
      enableRefine = _ref$enableRefine === void 0 ? true : _ref$enableRefine,
      _ref$enableClearMapRe = _ref.enableClearMapRefinement,
      enableClearMapRefinement = _ref$enableClearMapRe === void 0 ? true : _ref$enableClearMapRe,
      _ref$enableRefineCont = _ref.enableRefineControl,
      enableRefineControl = _ref$enableRefineCont === void 0 ? true : _ref$enableRefineCont,
      container = _ref.container,
      googleReference = _ref.googleReference,
      otherWidgetParams = _objectWithoutProperties(_ref, _excluded$j);
    var defaultBuiltInMarker = {
      createOptions: function createOptions() {
        return {};
      },
      events: {}
    };
    var defaultCustomHTMLMarker = {
      createOptions: function createOptions() {
        return {};
      },
      events: {}
    };
    if (!container) {
      throw new Error(withUsage$y('The `container` option is required.'));
    }
    if (!googleReference) {
      throw new Error(withUsage$y('The `googleReference` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$9(), userCssClasses.root),
      // Required only to mount / unmount the Preact tree
      tree: suit$9({
        descendantName: 'tree'
      }),
      map: cx(suit$9({
        descendantName: 'map'
      }), userCssClasses.map),
      control: cx(suit$9({
        descendantName: 'control'
      }), userCssClasses.control),
      label: cx(suit$9({
        descendantName: 'label'
      }), userCssClasses.label),
      selectedLabel: cx(suit$9({
        descendantName: 'label',
        modifierName: 'selected'
      }), userCssClasses.selectedLabel),
      input: cx(suit$9({
        descendantName: 'input'
      }), userCssClasses.input),
      redo: cx(suit$9({
        descendantName: 'redo'
      }), userCssClasses.redo),
      disabledRedo: cx(suit$9({
        descendantName: 'redo',
        modifierName: 'disabled'
      }), userCssClasses.disabledRedo),
      reset: cx(suit$9({
        descendantName: 'reset'
      }), userCssClasses.reset)
    };
    var templates = _objectSpread2(_objectSpread2({}, defaultTemplates$3), userTemplates);
    var builtInMarker = _objectSpread2(_objectSpread2({}, defaultBuiltInMarker), userBuiltInMarker);
    var isCustomHTMLMarker = Boolean(userCustomHTMLMarker) || Boolean(userTemplates.HTMLMarker);
    var customHTMLMarker = isCustomHTMLMarker && _objectSpread2(_objectSpread2({}, defaultCustomHTMLMarker), userCustomHTMLMarker);
    var createBuiltInMarker = function createBuiltInMarker(_ref2) {
      var item = _ref2.item,
        rest = _objectWithoutProperties(_ref2, _excluded2$3);
      return new googleReference.maps.Marker(_objectSpread2(_objectSpread2(_objectSpread2({}, builtInMarker.createOptions(item)), rest), {}, {
        // @ts-expect-error @types/googlemaps doesn't document this
        __id: item.objectID,
        position: item._geoloc
      }));
    };
    var HTMLMarker = createHTMLMarker(googleReference);
    var createCustomHTMLMarker = function createCustomHTMLMarker(_ref3) {
      var item = _ref3.item,
        rest = _objectWithoutProperties(_ref3, _excluded3);
      return new HTMLMarker(_objectSpread2(_objectSpread2(_objectSpread2({}, customHTMLMarker.createOptions(item)), rest), {}, {
        __id: item.objectID,
        position: item._geoloc,
        className: cx(suit$9({
          descendantName: 'marker'
        })),
        template: renderTemplate({
          templateKey: 'HTMLMarker',
          templates: templates,
          data: item
        })
      }));
    };
    var createMarker = !customHTMLMarker ? createBuiltInMarker : createCustomHTMLMarker;
    var markerOptions = !customHTMLMarker ? builtInMarker : customHTMLMarker;
    var makeWidget = connectGeoSearch(renderer$4, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget(_objectSpread2(_objectSpread2({}, otherWidgetParams), {}, {
      renderState: {},
      container: containerNode,
      googleReference: googleReference,
      initialZoom: initialZoom,
      initialPosition: initialPosition,
      templates: templates,
      cssClasses: cssClasses,
      createMarker: createMarker,
      markerOptions: markerOptions,
      enableRefine: enableRefine,
      enableClearMapRefinement: enableClearMapRefinement,
      enableRefineControl: enableRefineControl
    }))), {}, {
      $$widgetType: 'ais.geoSearch'
    });
  };

  var defaultProps$1 = {
    query: '',
    showSubmit: true,
    showReset: true,
    showLoadingIndicator: true,
    autofocus: false,
    searchAsYouType: true,
    isSearchStalled: false,
    disabled: false,
    onChange: noop,
    onSubmit: noop,
    onReset: noop,
    refine: noop
  };
  var SearchBox = /*#__PURE__*/function (_Component) {
    _inherits(SearchBox, _Component);
    var _super = _createSuper(SearchBox);
    function SearchBox() {
      var _this;
      _classCallCheck(this, SearchBox);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty(_assertThisInitialized(_this), "state", {
        query: _this.props.query,
        focused: false
      });
      _defineProperty(_assertThisInitialized(_this), "input", y());
      _defineProperty(_assertThisInitialized(_this), "onInput", function (event) {
        var _this$props = _this.props,
          searchAsYouType = _this$props.searchAsYouType,
          refine = _this$props.refine,
          onChange = _this$props.onChange;
        var query = event.target.value;
        if (searchAsYouType) {
          refine(query);
        }
        _this.setState({
          query: query
        });
        onChange(event);
      });
      _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
        var _this$props2 = _this.props,
          searchAsYouType = _this$props2.searchAsYouType,
          refine = _this$props2.refine,
          onSubmit = _this$props2.onSubmit;
        event.preventDefault();
        event.stopPropagation();
        if (_this.input.current) {
          _this.input.current.blur();
        }
        if (!searchAsYouType) {
          refine(_this.state.query);
        }
        onSubmit(event);
        return false;
      });
      _defineProperty(_assertThisInitialized(_this), "onReset", function (event) {
        var _this$props3 = _this.props,
          refine = _this$props3.refine,
          onReset = _this$props3.onReset;
        var query = '';
        if (_this.input.current) {
          _this.input.current.focus();
        }
        refine(query);
        _this.setState({
          query: query
        });
        onReset(event);
      });
      _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
        _this.setState({
          focused: false
        });
      });
      _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
        _this.setState({
          focused: true
        });
      });
      return _this;
    }
    _createClass(SearchBox, [{
      key: "resetInput",
      value:
      /**
       * This public method is used in the RefinementList SFFV search box
       * to reset the input state when an item is selected.
       *
       * @see RefinementList#componentWillReceiveProps
       * @return {undefined}
       */
      function resetInput() {
        this.setState({
          query: ''
        });
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        /**
         * when the user is typing, we don't want to replace the query typed
         * by the user (state.query) with the query exposed by the connector (props.query)
         * see: https://github.com/algolia/instantsearch.js/issues/4141
         */
        if (!this.state.focused && nextProps.query !== this.state.query) {
          this.setState({
            query: nextProps.query
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
          cssClasses = _this$props4.cssClasses,
          placeholder = _this$props4.placeholder,
          autofocus = _this$props4.autofocus,
          showSubmit = _this$props4.showSubmit,
          showReset = _this$props4.showReset,
          showLoadingIndicator = _this$props4.showLoadingIndicator,
          templates = _this$props4.templates,
          isSearchStalled = _this$props4.isSearchStalled;
        return h("div", {
          className: cssClasses.root
        }, h("form", {
          action: "",
          role: "search",
          className: cssClasses.form,
          noValidate: true,
          onSubmit: this.onSubmit,
          onReset: this.onReset
        }, h("input", {
          ref: this.input,
          value: this.state.query,
          disabled: this.props.disabled,
          className: cssClasses.input,
          type: "search",
          placeholder: placeholder,
          autoFocus: autofocus,
          autoComplete: "off",
          autoCorrect: "off",
          autoCapitalize: "off"
          // @ts-expect-error `spellCheck` attribute is missing in preact JSX types
          ,
          spellCheck: "false",
          maxLength: 512,
          onInput: this.onInput,
          onBlur: this.onBlur,
          onFocus: this.onFocus
        }), h(Template, {
          templateKey: "submit",
          rootTagName: "button",
          rootProps: {
            className: cssClasses.submit,
            type: 'submit',
            title: 'Submit the search query.',
            hidden: !showSubmit
          },
          templates: templates,
          data: {
            cssClasses: cssClasses
          }
        }), h(Template, {
          templateKey: "reset",
          rootTagName: "button",
          rootProps: {
            className: cssClasses.reset,
            type: 'reset',
            title: 'Clear the search query.',
            hidden: !(showReset && this.state.query.trim() && !isSearchStalled)
          },
          templates: templates,
          data: {
            cssClasses: cssClasses
          }
        }), showLoadingIndicator && h(Template, {
          templateKey: "loadingIndicator",
          rootTagName: "span",
          rootProps: {
            className: cssClasses.loadingIndicator,
            hidden: !isSearchStalled
          },
          templates: templates,
          data: {
            cssClasses: cssClasses
          }
        })));
      }
    }]);
    return SearchBox;
  }(d);
  _defineProperty(SearchBox, "defaultProps", defaultProps$1);

  function RefinementListItem(_ref) {
    var className = _ref.className,
      handleClick = _ref.handleClick,
      facetValueToRefine = _ref.facetValueToRefine,
      isRefined = _ref.isRefined,
      templateProps = _ref.templateProps,
      templateKey = _ref.templateKey,
      templateData = _ref.templateData,
      subItems = _ref.subItems;
    return h("li", {
      className: className,
      onClick: function onClick(originalEvent) {
        handleClick({
          facetValueToRefine: facetValueToRefine,
          isRefined: isRefined,
          originalEvent: originalEvent
        });
      }
    }, h(Template, _extends({}, templateProps, {
      templateKey: templateKey,
      data: templateData
    })), subItems);
  }

  var _excluded$k = ["root"];
  var defaultProps$2 = {
    cssClasses: {},
    depth: 0
  };
  function isHierarchicalMenuItem(facetValue) {
    return facetValue.data !== undefined;
  }
  var RefinementList$1 = /*#__PURE__*/function (_Component) {
    _inherits(RefinementList, _Component);
    var _super = _createSuper(RefinementList);
    function RefinementList(props) {
      var _this;
      _classCallCheck(this, RefinementList);
      _this = _super.call(this, props);
      _defineProperty(_assertThisInitialized(_this), "searchBox", y());
      _this.handleItemClick = _this.handleItemClick.bind(_assertThisInitialized(_this));
      return _this;
    }
    _createClass(RefinementList, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        var areFacetValuesDifferent = !isEqual(this.props.facetValues, nextProps.facetValues);
        return areFacetValuesDifferent;
      }
    }, {
      key: "refine",
      value: function refine(facetValueToRefine) {
        this.props.toggleRefinement(facetValueToRefine);
      }
    }, {
      key: "_generateFacetItem",
      value: function _generateFacetItem(facetValue) {
        var subItems;
        if (isHierarchicalMenuItem(facetValue) && Array.isArray(facetValue.data) && facetValue.data.length > 0) {
          var _this$props$cssClasse = this.props.cssClasses,
            root = _this$props$cssClasse.root,
            cssClasses = _objectWithoutProperties(_this$props$cssClasse, _excluded$k);
          subItems = h(RefinementList, _extends({}, this.props, {
            // We want to keep `root` required for external usage but not for the
            // sub items.
            cssClasses: cssClasses,
            depth: this.props.depth + 1,
            facetValues: facetValue.data,
            showMore: false,
            className: this.props.cssClasses.childList
          }));
        }
        var url = this.props.createURL(facetValue.value);
        var templateData = _objectSpread2(_objectSpread2({}, facetValue), {}, {
          url: url,
          attribute: this.props.attribute,
          cssClasses: this.props.cssClasses,
          isFromSearch: this.props.isFromSearch
        });
        var key = facetValue.value;
        if (facetValue.isRefined !== undefined) {
          key += "/".concat(facetValue.isRefined);
        }
        if (facetValue.count !== undefined) {
          key += "/".concat(facetValue.count);
        }
        var refinementListItemClassName = cx(this.props.cssClasses.item, facetValue.isRefined && this.props.cssClasses.selectedItem, !facetValue.count && this.props.cssClasses.disabledItem, Boolean(isHierarchicalMenuItem(facetValue) && Array.isArray(facetValue.data) && facetValue.data.length > 0) && this.props.cssClasses.parentItem);
        return h(RefinementListItem, {
          templateKey: "item",
          key: key,
          facetValueToRefine: facetValue.value,
          handleClick: this.handleItemClick,
          isRefined: facetValue.isRefined,
          className: refinementListItemClassName,
          subItems: subItems,
          templateData: templateData,
          templateProps: this.props.templateProps
        });
      }

      // Click events on DOM tree like LABEL > INPUT will result in two click events
      // instead of one.
      // No matter the framework, see https://www.google.com/search?q=click+label+twice
      //
      // Thus making it hard to distinguish activation from deactivation because both click events
      // are very close. Debounce is a solution but hacky.
      //
      // So the code here checks if the click was done on or in a LABEL. If this LABEL
      // has a checkbox inside, we ignore the first click event because we will get another one.
      //
      // We also check if the click was done inside a link and then e.preventDefault() because we already
      // handle the url
      //
      // Finally, we always stop propagation of the event to avoid multiple levels RefinementLists to fail: click
      // on child would click on parent also
    }, {
      key: "handleItemClick",
      value: function handleItemClick(_ref) {
        var facetValueToRefine = _ref.facetValueToRefine,
          isRefined = _ref.isRefined,
          originalEvent = _ref.originalEvent;
        if (isSpecialClick(originalEvent)) {
          // do not alter the default browser behavior
          // if one special key is down
          return;
        }
        if (!(originalEvent.target instanceof HTMLElement) || !(originalEvent.target.parentNode instanceof HTMLElement)) {
          return;
        }
        if (isRefined && originalEvent.target.parentNode.querySelector('input[type="radio"]:checked')) {
          // Prevent refinement for being reset if the user clicks on an already checked radio button
          return;
        }
        if (originalEvent.target.tagName === 'INPUT') {
          this.refine(facetValueToRefine);
          return;
        }
        var parent = originalEvent.target;
        while (parent !== originalEvent.currentTarget) {
          if (parent.tagName === 'LABEL' && (parent.querySelector('input[type="checkbox"]') || parent.querySelector('input[type="radio"]'))) {
            return;
          }
          if (parent.tagName === 'A' && parent.href) {
            originalEvent.preventDefault();
          }
          parent = parent.parentNode;
        }
        originalEvent.stopPropagation();
        this.refine(facetValueToRefine);
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (this.searchBox.current && !nextProps.isFromSearch) {
          this.searchBox.current.resetInput();
        }
      }
    }, {
      key: "refineFirstValue",
      value: function refineFirstValue() {
        var firstValue = this.props.facetValues && this.props.facetValues[0];
        if (firstValue) {
          var actualValue = firstValue.value;
          this.props.toggleRefinement(actualValue);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var showMoreButtonClassName = cx(this.props.cssClasses.showMore, !(this.props.showMore === true && this.props.canToggleShowMore) && this.props.cssClasses.disabledShowMore);
        var showMoreButton = this.props.showMore === true && h(Template, _extends({}, this.props.templateProps, {
          templateKey: "showMoreText",
          rootTagName: "button",
          rootProps: {
            className: showMoreButtonClassName,
            disabled: !this.props.canToggleShowMore,
            onClick: this.props.toggleShowMore
          },
          data: {
            isShowingMore: this.props.isShowingMore
          }
        }));
        var shouldDisableSearchBox = this.props.searchIsAlwaysActive !== true && !(this.props.isFromSearch || !this.props.hasExhaustiveItems);
        var searchBox = this.props.searchFacetValues && h("div", {
          className: this.props.cssClasses.searchBox
        }, h(SearchBox, {
          ref: this.searchBox,
          placeholder: this.props.searchPlaceholder,
          disabled: shouldDisableSearchBox,
          cssClasses: this.props.cssClasses.searchable,
          templates: this.props.searchBoxTemplateProps.templates,
          onChange: function onChange(event) {
            return _this2.props.searchFacetValues(event.target.value);
          },
          onReset: function onReset() {
            return _this2.props.searchFacetValues('');
          },
          onSubmit: function onSubmit() {
            return _this2.refineFirstValue();
          }
          // This sets the search box to a controlled state because
          // we don't rely on the `refine` prop but on `onChange`.
          ,
          searchAsYouType: false
        }));
        var facetValues = this.props.facetValues && this.props.facetValues.length > 0 && h("ul", {
          className: this.props.cssClasses.list
        }, this.props.facetValues.map(this._generateFacetItem, this));
        var noResults = this.props.searchFacetValues && this.props.isFromSearch && (!this.props.facetValues || this.props.facetValues.length === 0) && h(Template, _extends({}, this.props.templateProps, {
          templateKey: "searchableNoResults",
          rootProps: {
            className: this.props.cssClasses.noResults
          }
        }));
        var rootClassName = cx(this.props.cssClasses.root, (!this.props.facetValues || this.props.facetValues.length === 0) && this.props.cssClasses.noRefinementRoot, this.props.className);
        return h("div", {
          className: rootClassName
        }, this.props.children, searchBox, facetValues, noResults, showMoreButton);
      }
    }]);
    return RefinementList;
  }(d);
  _defineProperty(RefinementList$1, "defaultProps", defaultProps$2);

  var defaultTemplates$4 = {
    item: function item(_ref) {
      var url = _ref.url,
        label = _ref.label,
        count = _ref.count,
        cssClasses = _ref.cssClasses,
        isRefined = _ref.isRefined;
      return h("a", {
        className: cx(cx(cssClasses.link), cx(isRefined ? cssClasses.selectedItemLink : undefined)),
        href: url
      }, h("span", {
        className: cx(cssClasses.label)
      }, label), h("span", {
        className: cx(cssClasses.count)
      }, formatNumber(count)));
    },
    showMoreText: function showMoreText(_ref2) {
      var isShowingMore = _ref2.isShowingMore;
      return isShowingMore ? 'Show less' : 'Show more';
    }
  };

  var withUsage$z = createDocumentationMessageGenerator({
    name: 'hierarchical-menu'
  });
  var suit$a = component('HierarchicalMenu');
  var renderer$5 = function renderer(_ref) {
    var cssClasses = _ref.cssClasses,
      containerNode = _ref.containerNode,
      showMore = _ref.showMore,
      templates = _ref.templates,
      renderState = _ref.renderState;
    return function (_ref2, isFirstRendering) {
      var createURL = _ref2.createURL,
        items = _ref2.items,
        refine = _ref2.refine,
        instantSearchInstance = _ref2.instantSearchInstance,
        isShowingMore = _ref2.isShowingMore,
        toggleShowMore = _ref2.toggleShowMore,
        canToggleShowMore = _ref2.canToggleShowMore;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$4,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(RefinementList$1, {
        createURL: createURL,
        cssClasses: cssClasses,
        facetValues: items,
        templateProps: renderState.templateProps,
        toggleRefinement: refine,
        showMore: showMore,
        toggleShowMore: toggleShowMore,
        isShowingMore: isShowingMore,
        canToggleShowMore: canToggleShowMore
      }), containerNode);
    };
  };

  /**
   * The hierarchical menu widget is used to create a navigation based on a hierarchy of facet attributes.
   *
   * It is commonly used for categories with subcategories.
   *
   * All attributes (lvl0, lvl1 here) must be declared as [attributes for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting) in your
   * Algolia settings.
   *
   * By default, the separator we expect is ` > ` (with spaces) but you can use
   * a different one by using the `separator` option.
   * @requirements
   * Your objects must be formatted in a specific way to be
   * able to display hierarchical menus. Here's an example:
   *
   * ```javascript
   * {
   *   "objectID": "123",
   *   "name": "orange",
   *   "categories": {
   *     "lvl0": "fruits",
   *     "lvl1": "fruits > citrus"
   *   }
   * }
   * ```
   *
   * Every level must be specified entirely.
   * It's also possible to have multiple values per level, for example:
   *
   * ```javascript
   * {
   *   "objectID": "123",
   *   "name": "orange",
   *   "categories": {
   *     "lvl0": ["fruits", "vitamins"],
   *     "lvl1": ["fruits > citrus", "vitamins > C"]
   *   }
   * }
   * ```
   * @type {WidgetFactory}
   * @devNovel HierarchicalMenu
   * @category filter
   * @param {HierarchicalMenuWidgetParams} widgetParams The HierarchicalMenu widget options.
   * @return {Widget} A new HierarchicalMenu widget instance.
   * @example
   * search.addWidgets([
   *   instantsearch.widgets.hierarchicalMenu({
   *     container: '#hierarchical-categories',
   *     attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
   *   })
   * ]);
   */

  var hierarchicalMenu = function hierarchicalMenu(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attributes = _ref3.attributes,
      separator = _ref3.separator,
      rootPath = _ref3.rootPath,
      showParentLevel = _ref3.showParentLevel,
      limit = _ref3.limit,
      _ref3$showMore = _ref3.showMore,
      showMore = _ref3$showMore === void 0 ? false : _ref3$showMore,
      showMoreLimit = _ref3.showMoreLimit,
      sortBy = _ref3.sortBy,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;
    if (!container) {
      throw new Error(withUsage$z('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$a(), userCssClasses.root),
      noRefinementRoot: cx(suit$a({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      list: cx(suit$a({
        descendantName: 'list'
      }), userCssClasses.list),
      childList: cx(suit$a({
        descendantName: 'list',
        modifierName: 'child'
      }), userCssClasses.childList),
      item: cx(suit$a({
        descendantName: 'item'
      }), userCssClasses.item),
      selectedItem: cx(suit$a({
        descendantName: 'item',
        modifierName: 'selected'
      }), userCssClasses.selectedItem),
      parentItem: cx(suit$a({
        descendantName: 'item',
        modifierName: 'parent'
      }), userCssClasses.parentItem),
      link: cx(suit$a({
        descendantName: 'link'
      }), userCssClasses.link),
      selectedItemLink: cx(suit$a({
        descendantName: 'link',
        modifierName: 'selected'
      }), userCssClasses.selectedItemLink),
      label: cx(suit$a({
        descendantName: 'label'
      }), userCssClasses.label),
      count: cx(suit$a({
        descendantName: 'count'
      }), userCssClasses.count),
      showMore: cx(suit$a({
        descendantName: 'showMore'
      }), userCssClasses.showMore),
      disabledShowMore: cx(suit$a({
        descendantName: 'showMore',
        modifierName: 'disabled'
      }), userCssClasses.disabledShowMore)
    };
    var specializedRenderer = renderer$5({
      cssClasses: cssClasses,
      containerNode: containerNode,
      templates: templates,
      showMore: showMore,
      renderState: {}
    });
    var makeWidget = connectHierarchicalMenu(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attributes: attributes,
      separator: separator,
      rootPath: rootPath,
      showParentLevel: showParentLevel,
      limit: limit,
      showMore: showMore,
      showMoreLimit: showMoreLimit,
      sortBy: sortBy,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.hierarchicalMenu'
    });
  };

  var Hits = function Hits(_ref) {
    var results = _ref.results,
      hits = _ref.hits,
      bindEvent = _ref.bindEvent,
      sendEvent = _ref.sendEvent,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
    if (results.hits.length === 0) {
      return h(Template, _extends({}, templateProps, {
        templateKey: "empty",
        rootProps: {
          className: cx(cssClasses.root, cssClasses.emptyRoot)
        },
        data: results
      }));
    }
    return h("div", {
      className: cssClasses.root
    }, h("ol", {
      className: cssClasses.list
    }, hits.map(function (hit, index) {
      return h(Template, _extends({}, templateProps, {
        templateKey: "item",
        rootTagName: "li",
        rootProps: {
          className: cssClasses.item
        },
        key: hit.objectID,
        data: _objectSpread2(_objectSpread2({}, hit), {}, {
          get __hitIndex() {
             _warning(false, 'The `__hitIndex` property is deprecated. Use the absolute `__position` instead.') ;
            return index;
          }
        }),
        bindEvent: bindEvent,
        sendEvent: sendEvent
      }));
    })));
  };

  var defaultTemplates$5 = {
    empty: function empty() {
      return 'No results';
    },
    item: function item(data) {
      return JSON.stringify(omit(data, ['__hitIndex']), null, 2);
    }
  };

  var withUsage$A = createDocumentationMessageGenerator({
    name: 'hits'
  });
  var suit$b = component('Hits');
  var HitsWithInsightsListener = insightsListener(Hits);
  var renderer$6 = function renderer(_ref) {
    var renderState = _ref.renderState,
      cssClasses = _ref.cssClasses,
      containerNode = _ref.containerNode,
      templates = _ref.templates;
    return function (_ref2, isFirstRendering) {
      var receivedHits = _ref2.hits,
        results = _ref2.results,
        instantSearchInstance = _ref2.instantSearchInstance,
        insights = _ref2.insights,
        bindEvent = _ref2.bindEvent,
        sendEvent = _ref2.sendEvent;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$5,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(HitsWithInsightsListener, {
        cssClasses: cssClasses,
        hits: receivedHits,
        results: results,
        templateProps: renderState.templateProps,
        insights: insights,
        sendEvent: sendEvent,
        bindEvent: bindEvent
      }), containerNode);
    };
  };
  var hits = function hits(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      escapeHTML = _ref3.escapeHTML,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;
    if (!container) {
      throw new Error(withUsage$A('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$b(), userCssClasses.root),
      emptyRoot: cx(suit$b({
        modifierName: 'empty'
      }), userCssClasses.emptyRoot),
      list: cx(suit$b({
        descendantName: 'list'
      }), userCssClasses.list),
      item: cx(suit$b({
        descendantName: 'item'
      }), userCssClasses.item)
    };
    var specializedRenderer = renderer$6({
      containerNode: containerNode,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates
    });
    var makeWidget = withInsights(connectHits)(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      escapeHTML: escapeHTML,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.hits'
    });
  };

  function Selector(_ref) {
    var currentValue = _ref.currentValue,
      options = _ref.options,
      cssClasses = _ref.cssClasses,
      setValue = _ref.setValue;
    return h("select", {
      className: cx(cssClasses.select),
      onChange: function onChange(event) {
        return setValue(event.target.value);
      },
      value: "".concat(currentValue)
    }, options.map(function (option) {
      return h("option", {
        className: cx(cssClasses.option),
        key: option.label + option.value,
        value: "".concat(option.value)
      }, option.label);
    }));
  }

  var withUsage$B = createDocumentationMessageGenerator({
    name: 'hits-per-page'
  });
  var suit$c = component('HitsPerPage');
  var renderer$7 = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
    return function (_ref2, isFirstRendering) {
      var items = _ref2.items,
        refine = _ref2.refine;
      if (isFirstRendering) return;
      var _ref3 = find(items, function (_ref4) {
          var isRefined = _ref4.isRefined;
          return isRefined;
        }) || {},
        currentValue = _ref3.value;
      P(h("div", {
        className: cssClasses.root
      }, h(Selector, {
        cssClasses: cssClasses,
        currentValue: currentValue,
        options: items,
        setValue: refine
      })), containerNode);
    };
  };
  var hitsPerPage = function hitsPerPage(widgetParams) {
    var _ref5 = widgetParams || {},
      container = _ref5.container,
      items = _ref5.items,
      _ref5$cssClasses = _ref5.cssClasses,
      userCssClasses = _ref5$cssClasses === void 0 ? {} : _ref5$cssClasses,
      transformItems = _ref5.transformItems;
    if (!container) {
      throw new Error(withUsage$B('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$c(), userCssClasses.root),
      select: cx(suit$c({
        descendantName: 'select'
      }), userCssClasses.select),
      option: cx(suit$c({
        descendantName: 'option'
      }), userCssClasses.option)
    };
    var specializedRenderer = renderer$7({
      containerNode: containerNode,
      cssClasses: cssClasses
    });
    var makeWidget = connectHitsPerPage(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      items: items,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.hitsPerPage'
    });
  };

  var InfiniteHits = function InfiniteHits(_ref) {
    var results = _ref.results,
      hits = _ref.hits,
      bindEvent = _ref.bindEvent,
      sendEvent = _ref.sendEvent,
      hasShowPrevious = _ref.hasShowPrevious,
      showPrevious = _ref.showPrevious,
      showMore = _ref.showMore,
      isFirstPage = _ref.isFirstPage,
      isLastPage = _ref.isLastPage,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
    if (results.hits.length === 0) {
      return h(Template, _extends({}, templateProps, {
        templateKey: "empty",
        rootProps: {
          className: cx(cssClasses.root, cssClasses.emptyRoot)
        },
        data: results
      }));
    }
    return h("div", {
      className: cssClasses.root
    }, hasShowPrevious && h(Template, _extends({}, templateProps, {
      templateKey: "showPreviousText",
      rootTagName: "button",
      rootProps: {
        className: cx(cssClasses.loadPrevious, isFirstPage && cssClasses.disabledLoadPrevious),
        disabled: isFirstPage,
        onClick: showPrevious
      }
    })), h("ol", {
      className: cssClasses.list
    }, hits.map(function (hit, index) {
      return h(Template, _extends({}, templateProps, {
        templateKey: "item",
        rootTagName: "li",
        rootProps: {
          className: cssClasses.item
        },
        key: hit.objectID,
        data: _objectSpread2(_objectSpread2({}, hit), {}, {
          get __hitIndex() {
             _warning(false, 'The `__hitIndex` property is deprecated. Use the absolute `__position` instead.') ;
            return index;
          }
        }),
        bindEvent: bindEvent,
        sendEvent: sendEvent
      }));
    })), h(Template, _extends({}, templateProps, {
      templateKey: "showMoreText",
      rootTagName: "button",
      rootProps: {
        className: cx(cssClasses.loadMore, isLastPage && cssClasses.disabledLoadMore),
        disabled: isLastPage,
        onClick: showMore
      }
    })));
  };

  var defaultTemplates$6 = {
    empty: function empty() {
      return 'No results';
    },
    showPreviousText: function showPreviousText() {
      return 'Show previous results';
    },
    showMoreText: function showMoreText() {
      return 'Show more results';
    },
    item: function item(data) {
      return JSON.stringify(omit(data, ['__hitIndex']), null, 2);
    }
  };

  var withUsage$C = createDocumentationMessageGenerator({
    name: 'infinite-hits'
  });
  var suit$d = component('InfiniteHits');
  var InfiniteHitsWithInsightsListener = insightsListener(InfiniteHits);
  var renderer$8 = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates,
      hasShowPrevious = _ref.showPrevious;
    return function (_ref2, isFirstRendering) {
      var hits = _ref2.hits,
        results = _ref2.results,
        showMore = _ref2.showMore,
        showPrevious = _ref2.showPrevious,
        isFirstPage = _ref2.isFirstPage,
        isLastPage = _ref2.isLastPage,
        instantSearchInstance = _ref2.instantSearchInstance,
        insights = _ref2.insights,
        bindEvent = _ref2.bindEvent,
        sendEvent = _ref2.sendEvent;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$6,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(InfiniteHitsWithInsightsListener, {
        cssClasses: cssClasses,
        hits: hits,
        results: results,
        hasShowPrevious: hasShowPrevious,
        showPrevious: showPrevious,
        showMore: showMore,
        templateProps: renderState.templateProps,
        isFirstPage: isFirstPage,
        isLastPage: isLastPage,
        insights: insights,
        sendEvent: sendEvent,
        bindEvent: bindEvent
      }), containerNode);
    };
  };
  var infiniteHits = function infiniteHits(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      escapeHTML = _ref3.escapeHTML,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      showPrevious = _ref3.showPrevious,
      cache = _ref3.cache;
    if (!container) {
      throw new Error(withUsage$C('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$d(), userCssClasses.root),
      emptyRoot: cx(suit$d({
        modifierName: 'empty'
      }), userCssClasses.emptyRoot),
      item: cx(suit$d({
        descendantName: 'item'
      }), userCssClasses.item),
      list: cx(suit$d({
        descendantName: 'list'
      }), userCssClasses.list),
      loadPrevious: cx(suit$d({
        descendantName: 'loadPrevious'
      }), userCssClasses.loadPrevious),
      disabledLoadPrevious: cx(suit$d({
        descendantName: 'loadPrevious',
        modifierName: 'disabled'
      }), userCssClasses.disabledLoadPrevious),
      loadMore: cx(suit$d({
        descendantName: 'loadMore'
      }), userCssClasses.loadMore),
      disabledLoadMore: cx(suit$d({
        descendantName: 'loadMore',
        modifierName: 'disabled'
      }), userCssClasses.disabledLoadMore)
    };
    var specializedRenderer = renderer$8({
      containerNode: containerNode,
      cssClasses: cssClasses,
      templates: templates,
      showPrevious: showPrevious,
      renderState: {}
    });
    var makeWidget = withInsights(connectInfiniteHits)(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      escapeHTML: escapeHTML,
      transformItems: transformItems,
      showPrevious: showPrevious,
      cache: cache
    })), {}, {
      $$widgetType: 'ais.infiniteHits'
    });
  };

  var defaultTemplates$7 = {
    item: function item(_ref) {
      var cssClasses = _ref.cssClasses,
        url = _ref.url,
        label = _ref.label,
        count = _ref.count;
      return h("a", {
        className: cx(cssClasses.link),
        href: url
      }, h("span", {
        className: cx(cssClasses.label)
      }, label), h("span", {
        className: cx(cssClasses.count)
      }, formatNumber(count)));
    },
    showMoreText: function showMoreText(_ref2) {
      var isShowingMore = _ref2.isShowingMore;
      return isShowingMore ? 'Show less' : 'Show more';
    }
  };

  var withUsage$D = createDocumentationMessageGenerator({
    name: 'menu'
  });
  var suit$e = component('Menu');
  var renderer$9 = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates,
      showMore = _ref.showMore;
    return function (_ref2, isFirstRendering) {
      var refine = _ref2.refine,
        items = _ref2.items,
        createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        isShowingMore = _ref2.isShowingMore,
        toggleShowMore = _ref2.toggleShowMore,
        canToggleShowMore = _ref2.canToggleShowMore;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$7,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      var facetValues = items.map(function (facetValue) {
        return _objectSpread2(_objectSpread2({}, facetValue), {}, {
          url: createURL(facetValue.value)
        });
      });
      P(h(RefinementList$1, {
        createURL: createURL,
        cssClasses: cssClasses,
        facetValues: facetValues,
        showMore: showMore,
        templateProps: renderState.templateProps,
        toggleRefinement: refine,
        toggleShowMore: toggleShowMore,
        isShowingMore: isShowingMore,
        canToggleShowMore: canToggleShowMore
      }), containerNode);
    };
  };
  var menu = function menu(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      sortBy = _ref3.sortBy,
      limit = _ref3.limit,
      showMore = _ref3.showMore,
      showMoreLimit = _ref3.showMoreLimit,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      transformItems = _ref3.transformItems;
    if (!container) {
      throw new Error(withUsage$D('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$e(), userCssClasses.root),
      noRefinementRoot: cx(suit$e({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      list: cx(suit$e({
        descendantName: 'list'
      }), userCssClasses.list),
      item: cx(suit$e({
        descendantName: 'item'
      }), userCssClasses.item),
      selectedItem: cx(suit$e({
        descendantName: 'item',
        modifierName: 'selected'
      }), userCssClasses.selectedItem),
      link: cx(suit$e({
        descendantName: 'link'
      }), userCssClasses.link),
      label: cx(suit$e({
        descendantName: 'label'
      }), userCssClasses.label),
      count: cx(suit$e({
        descendantName: 'count'
      }), userCssClasses.count),
      showMore: cx(suit$e({
        descendantName: 'showMore'
      }), userCssClasses.showMore),
      disabledShowMore: cx(suit$e({
        descendantName: 'showMore',
        modifierName: 'disabled'
      }), userCssClasses.disabledShowMore)
    };
    var specializedRenderer = renderer$9({
      containerNode: containerNode,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates,
      showMore: showMore
    });
    var makeWidget = connectMenu(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attribute: attribute,
      limit: limit,
      showMore: showMore,
      showMoreLimit: showMoreLimit,
      sortBy: sortBy,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.menu'
    });
  };

  function MenuSelect(_ref) {
    var cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps,
      items = _ref.items,
      refine = _ref.refine;
    var _ref2 = find(items, function (item) {
        return item.isRefined;
      }) || {
        value: ''
      },
      selectedValue = _ref2.value;
    return h("div", {
      className: cx(cssClasses.root, items.length === 0 && cssClasses.noRefinementRoot)
    }, h("select", {
      className: cssClasses.select,
      value: selectedValue,
      onChange: function onChange(event) {
        refine(event.target.value);
      }
    }, h(Template, _extends({}, templateProps, {
      templateKey: "defaultOption",
      rootTagName: "option",
      rootProps: {
        value: '',
        className: cssClasses.option
      }
    })), items.map(function (item) {
      return h(Template, _extends({}, templateProps, {
        templateKey: "item",
        rootTagName: "option",
        rootProps: {
          value: item.value,
          className: cssClasses.option
        },
        key: item.value,
        data: item
      }));
    })));
  }

  var defaultTemplates$8 = {
    item: function item(_ref) {
      var label = _ref.label,
        count = _ref.count;
      return "".concat(label, " (").concat(formatNumber(count), ")");
    },
    defaultOption: function defaultOption() {
      return 'See all';
    }
  };

  var withUsage$E = createDocumentationMessageGenerator({
    name: 'menu-select'
  });
  var suit$f = component('MenuSelect');
  var renderer$a = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
    return function (_ref2, isFirstRendering) {
      var refine = _ref2.refine,
        items = _ref2.items,
        instantSearchInstance = _ref2.instantSearchInstance;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$8,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(MenuSelect, {
        cssClasses: cssClasses,
        items: items,
        refine: refine,
        templateProps: renderState.templateProps
      }), containerNode);
    };
  };
  var menuSelect = function menuSelect(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      _ref3$sortBy = _ref3.sortBy,
      sortBy = _ref3$sortBy === void 0 ? ['name:asc'] : _ref3$sortBy,
      _ref3$limit = _ref3.limit,
      limit = _ref3$limit === void 0 ? 10 : _ref3$limit,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      transformItems = _ref3.transformItems;
    if (!container) {
      throw new Error(withUsage$E('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$f(), userCssClasses.root),
      noRefinementRoot: cx(suit$f({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      select: cx(suit$f({
        descendantName: 'select'
      }), userCssClasses.select),
      option: cx(suit$f({
        descendantName: 'option'
      }), userCssClasses.option)
    };
    var specializedRenderer = renderer$a({
      containerNode: containerNode,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates
    });
    var makeWidget = connectMenu(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attribute: attribute,
      limit: limit,
      sortBy: sortBy,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.menuSelect'
    });
  };

  var defaultTemplates$9 = {
    item: function item(_ref) {
      var cssClasses = _ref.cssClasses,
        attribute = _ref.attribute,
        label = _ref.label,
        isRefined = _ref.isRefined;
      return h("label", {
        className: cssClasses.label
      }, h("input", {
        type: "radio",
        className: cssClasses.radio,
        name: attribute,
        defaultChecked: isRefined
      }), h("span", {
        className: cssClasses.labelText
      }, label));
    }
  };

  var withUsage$F = createDocumentationMessageGenerator({
    name: 'numeric-menu'
  });
  var suit$g = component('NumericMenu');
  var renderer$b = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      attribute = _ref.attribute,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
    return function (_ref2, isFirstRendering) {
      var createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        refine = _ref2.refine,
        items = _ref2.items;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$9,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(RefinementList$1, {
        createURL: createURL,
        cssClasses: cssClasses,
        facetValues: items,
        templateProps: renderState.templateProps,
        toggleRefinement: refine,
        attribute: attribute
      }), containerNode);
    };
  };
  var numericMenu = function numericMenu(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      items = _ref3.items,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      transformItems = _ref3.transformItems;
    if (!container) {
      throw new Error(withUsage$F('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$g(), userCssClasses.root),
      noRefinementRoot: cx(suit$g({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      list: cx(suit$g({
        descendantName: 'list'
      }), userCssClasses.list),
      item: cx(suit$g({
        descendantName: 'item'
      }), userCssClasses.item),
      selectedItem: cx(suit$g({
        descendantName: 'item',
        modifierName: 'selected'
      }), userCssClasses.selectedItem),
      label: cx(suit$g({
        descendantName: 'label'
      }), userCssClasses.label),
      radio: cx(suit$g({
        descendantName: 'radio'
      }), userCssClasses.radio),
      labelText: cx(suit$g({
        descendantName: 'labelText'
      }), userCssClasses.labelText)
    };
    var specializedRenderer = renderer$b({
      containerNode: containerNode,
      attribute: attribute,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates
    });
    var makeWidget = connectNumericMenu(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attribute: attribute,
      items: items,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.numericMenu'
    });
  };

  function Pagination(props) {
    function createClickHandler(pageNumber) {
      return function (event) {
        if (isSpecialClick(event)) {
          // do not alter the default browser behavior
          // if one special key is down
          return;
        }
        event.preventDefault();
        props.setCurrentPage(pageNumber);
      };
    }
    return h("div", {
      className: cx(props.cssClasses.root, props.nbPages <= 1 && props.cssClasses.noRefinementRoot)
    }, h("ul", {
      className: props.cssClasses.list
    }, props.showFirst && h(PaginationLink, {
      ariaLabel: "First",
      className: props.cssClasses.firstPageItem,
      isDisabled: props.isFirstPage,
      label: props.templates.first,
      pageNumber: 0,
      createURL: props.createURL,
      cssClasses: props.cssClasses,
      createClickHandler: createClickHandler
    }), props.showPrevious && h(PaginationLink, {
      ariaLabel: "Previous",
      className: props.cssClasses.previousPageItem,
      isDisabled: props.isFirstPage,
      label: props.templates.previous,
      pageNumber: props.currentPage - 1,
      createURL: props.createURL,
      cssClasses: props.cssClasses,
      createClickHandler: createClickHandler
    }), props.pages.map(function (pageNumber) {
      return h(PaginationLink, {
        key: pageNumber,
        ariaLabel: "Page ".concat(pageNumber + 1),
        className: props.cssClasses.pageItem,
        isSelected: pageNumber === props.currentPage,
        label: "".concat(pageNumber + 1),
        pageNumber: pageNumber,
        createURL: props.createURL,
        cssClasses: props.cssClasses,
        createClickHandler: createClickHandler
      });
    }), props.showNext && h(PaginationLink, {
      ariaLabel: "Next",
      className: props.cssClasses.nextPageItem,
      isDisabled: props.isLastPage,
      label: props.templates.next,
      pageNumber: props.currentPage + 1,
      createURL: props.createURL,
      cssClasses: props.cssClasses,
      createClickHandler: createClickHandler
    }), props.showLast && h(PaginationLink, {
      ariaLabel: "Last",
      className: props.cssClasses.lastPageItem,
      isDisabled: props.isLastPage,
      label: props.templates.last,
      pageNumber: props.nbPages - 1,
      createURL: props.createURL,
      cssClasses: props.cssClasses,
      createClickHandler: createClickHandler
    })));
  }
  function PaginationLink(_ref) {
    var label = _ref.label,
      ariaLabel = _ref.ariaLabel,
      pageNumber = _ref.pageNumber,
      className = _ref.className,
      _ref$isDisabled = _ref.isDisabled,
      isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled,
      _ref$isSelected = _ref.isSelected,
      isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
      cssClasses = _ref.cssClasses,
      createURL = _ref.createURL,
      createClickHandler = _ref.createClickHandler;
    return h("li", {
      className: cx(cssClasses.item, className, isDisabled && cssClasses.disabledItem, isSelected && cssClasses.selectedItem)
    }, isDisabled ? h("span", {
      className: cssClasses.link,
      dangerouslySetInnerHTML: {
        __html: label
      }
    }) : h("a", {
      className: cssClasses.link,
      "aria-label": ariaLabel,
      href: createURL(pageNumber),
      onClick: createClickHandler(pageNumber),
      dangerouslySetInnerHTML: {
        __html: label
      }
    }));
  }

  var suit$h = component('Pagination');
  var withUsage$G = createDocumentationMessageGenerator({
    name: 'pagination'
  });
  var defaultTemplates$a = {
    previous: '‹',
    next: '›',
    first: '«',
    last: '»'
  };
  var renderer$c = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      showFirst = _ref.showFirst,
      showLast = _ref.showLast,
      showPrevious = _ref.showPrevious,
      showNext = _ref.showNext,
      scrollToNode = _ref.scrollToNode;
    return function (_ref2, isFirstRendering) {
      var createURL = _ref2.createURL,
        currentRefinement = _ref2.currentRefinement,
        nbPages = _ref2.nbPages,
        pages = _ref2.pages,
        isFirstPage = _ref2.isFirstPage,
        isLastPage = _ref2.isLastPage,
        refine = _ref2.refine;
      if (isFirstRendering) return;
      var setCurrentPage = function setCurrentPage(pageNumber) {
        refine(pageNumber);
        if (scrollToNode !== false) {
          scrollToNode.scrollIntoView();
        }
      };
      P(h(Pagination, {
        createURL: createURL,
        cssClasses: cssClasses,
        currentPage: currentRefinement,
        templates: templates,
        nbPages: nbPages,
        pages: pages,
        isFirstPage: isFirstPage,
        isLastPage: isLastPage,
        setCurrentPage: setCurrentPage,
        showFirst: showFirst,
        showLast: showLast,
        showPrevious: showPrevious,
        showNext: showNext
      }), containerNode);
    };
  };
  var pagination = function pagination(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      totalPages = _ref3.totalPages,
      padding = _ref3.padding,
      _ref3$showFirst = _ref3.showFirst,
      showFirst = _ref3$showFirst === void 0 ? true : _ref3$showFirst,
      _ref3$showLast = _ref3.showLast,
      showLast = _ref3$showLast === void 0 ? true : _ref3$showLast,
      _ref3$showPrevious = _ref3.showPrevious,
      showPrevious = _ref3$showPrevious === void 0 ? true : _ref3$showPrevious,
      _ref3$showNext = _ref3.showNext,
      showNext = _ref3$showNext === void 0 ? true : _ref3$showNext,
      _ref3$scrollTo = _ref3.scrollTo,
      userScrollTo = _ref3$scrollTo === void 0 ? 'body' : _ref3$scrollTo;
    if (!container) {
      throw new Error(withUsage$G('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var scrollTo = userScrollTo === true ? 'body' : userScrollTo;
    var scrollToNode = scrollTo !== false ? getContainerNode(scrollTo) : false;
    var cssClasses = {
      root: cx(suit$h(), userCssClasses.root),
      noRefinementRoot: cx(suit$h({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      list: cx(suit$h({
        descendantName: 'list'
      }), userCssClasses.list),
      item: cx(suit$h({
        descendantName: 'item'
      }), userCssClasses.item),
      firstPageItem: cx(suit$h({
        descendantName: 'item',
        modifierName: 'firstPage'
      }), userCssClasses.firstPageItem),
      lastPageItem: cx(suit$h({
        descendantName: 'item',
        modifierName: 'lastPage'
      }), userCssClasses.lastPageItem),
      previousPageItem: cx(suit$h({
        descendantName: 'item',
        modifierName: 'previousPage'
      }), userCssClasses.previousPageItem),
      nextPageItem: cx(suit$h({
        descendantName: 'item',
        modifierName: 'nextPage'
      }), userCssClasses.nextPageItem),
      pageItem: cx(suit$h({
        descendantName: 'item',
        modifierName: 'page'
      }), userCssClasses.pageItem),
      selectedItem: cx(suit$h({
        descendantName: 'item',
        modifierName: 'selected'
      }), userCssClasses.selectedItem),
      disabledItem: cx(suit$h({
        descendantName: 'item',
        modifierName: 'disabled'
      }), userCssClasses.disabledItem),
      link: cx(suit$h({
        descendantName: 'link'
      }), userCssClasses.link)
    };
    var templates = _objectSpread2(_objectSpread2({}, defaultTemplates$a), userTemplates);
    var specializedRenderer = renderer$c({
      containerNode: containerNode,
      cssClasses: cssClasses,
      templates: templates,
      showFirst: showFirst,
      showLast: showLast,
      showPrevious: showPrevious,
      showNext: showNext,
      scrollToNode: scrollToNode
    });
    var makeWidget = connectPagination(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      totalPages: totalPages,
      padding: padding
    })), {}, {
      $$widgetType: 'ais.pagination'
    });
  };

  var r$1,u$1,i,o$1,f$1=0,c$1=[],e$2=[],a$1=l.__b,v$1=l.__r,l$1=l.diffed,m$2=l.__c,d$1=l.unmount;function p$1(t,r){l.__h&&l.__h(u$1,t,f$1||r),f$1=0;var i=u$1.__H||(u$1.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({__V:e$2}),i.__[t]}function y$1(n){return f$1=1,h$1(C$1,n)}function h$1(n,t,i){var o=p$1(r$1++,2);if(o.t=n,!o.__c&&(o.__=[i?i(t):C$1(void 0,t),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}));}],o.__c=u$1,!u$1.u)){u$1.u=!0;var f=u$1.shouldComponentUpdate;u$1.shouldComponentUpdate=function(n,t,r){if(!o.__c.__H)return !0;var u=o.__c.__H.__.filter(function(n){return n.__c});if(u.every(function(n){return !n.__N}))return !f||f.call(this,n,t,r);var i=!1;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0);}}),!!i&&(!f||f.call(this,n,t,r))};}return o.__N||o.__}function s$1(t,i){var o=p$1(r$1++,3);!l.__s&&B(o.__H,i)&&(o.__=t,o.i=i,u$1.__H.__h.push(o));}function A$1(n){return f$1=5,T$1(function(){return {current:n}},[])}function T$1(n,t){var u=p$1(r$1++,7);return B(u.__H,t)?(u.__V=n(),u.i=t,u.__h=n,u.__V):u.__}function g$1(){for(var t;t=c$1.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(w$1),t.__H.__h.forEach(z$1),t.__H.__h=[];}catch(r){t.__H.__h=[],l.__e(r,t.__v);}}l.__b=function(n){"function"!=typeof n.type||n.o||n.type===p?n.o||(n.o=n.__&&n.__.o?n.__.o:""):n.o=(n.__&&n.__.o?n.__.o:"")+(n.__&&n.__.__k?n.__.__k.indexOf(n):0),u$1=null,a$1&&a$1(n);},l.__r=function(n){v$1&&v$1(n),r$1=0;var t=(u$1=n.__c).__H;t&&(i===u$1?(t.__h=[],u$1.__h=[],t.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=e$2,n.__N=n.i=void 0;})):(t.__h.forEach(w$1),t.__h.forEach(z$1),t.__h=[])),i=u$1;},l.diffed=function(t){l$1&&l$1(t);var r=t.__c;r&&r.__H&&(r.__H.__h.length&&(1!==c$1.push(r)&&o$1===l.requestAnimationFrame||((o$1=l.requestAnimationFrame)||k$1)(g$1)),r.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==e$2&&(n.__=n.__V),n.i=void 0,n.__V=e$2;})),i=u$1=null;},l.__c=function(t,r){r.some(function(t){try{t.__h.forEach(w$1),t.__h=t.__h.filter(function(n){return !n.__||z$1(n)});}catch(u){r.some(function(n){n.__h&&(n.__h=[]);}),r=[],l.__e(u,t.__v);}}),m$2&&m$2(t,r);},l.unmount=function(t){d$1&&d$1(t);var r,u=t.__c;u&&u.__H&&(u.__H.__.forEach(function(n){try{w$1(n);}catch(n){r=n;}}),u.__H=void 0,r&&l.__e(r,u.__v));};var j$1="function"==typeof requestAnimationFrame;function k$1(n){var t,r=function(){clearTimeout(u),j$1&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,100);j$1&&(t=requestAnimationFrame(r));}function w$1(n){var t=u$1,r=n.__c;"function"==typeof r&&(n.__c=void 0,r()),u$1=t;}function z$1(n){var t=u$1;n.__c=n.__(),u$1=t;}function B(n,t){return !n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function C$1(n,t){return "function"==typeof t?t(n):t}

  function Panel(props) {
    var _useState = y$1(props.isCollapsed),
      _useState2 = _slicedToArray(_useState, 2),
      isCollapsed = _useState2[0],
      setIsCollapsed = _useState2[1];
    var _useState3 = y$1(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isControlled = _useState4[0],
      setIsControlled = _useState4[1];
    var bodyRef = A$1(null);
    s$1(function () {
      var node = bodyRef.current;
      if (!node) {
        return undefined;
      }
      node.appendChild(props.bodyElement);
      return function () {
        node.removeChild(props.bodyElement);
      };
    }, [bodyRef, props.bodyElement]);
    if (!isControlled && props.isCollapsed !== isCollapsed) {
      setIsCollapsed(props.isCollapsed);
    }
    return h("div", {
      className: cx(props.cssClasses.root, props.hidden && props.cssClasses.noRefinementRoot, props.collapsible && props.cssClasses.collapsibleRoot, isCollapsed && props.cssClasses.collapsedRoot),
      hidden: props.hidden
    }, props.templates.header && h("div", {
      className: props.cssClasses.header
    }, h(Template, {
      templates: props.templates,
      templateKey: "header",
      rootTagName: "span",
      data: props.data
    }), props.collapsible && h("button", {
      className: props.cssClasses.collapseButton,
      "aria-expanded": !isCollapsed,
      onClick: function onClick(event) {
        event.preventDefault();
        setIsControlled(true);
        setIsCollapsed(function (prevIsCollapsed) {
          return !prevIsCollapsed;
        });
      }
    }, h(Template, {
      templates: props.templates,
      templateKey: "collapseButtonText",
      rootTagName: "span",
      data: {
        collapsed: isCollapsed
      }
    }))), h("div", {
      className: props.cssClasses.body,
      ref: bodyRef
    }), props.templates.footer && h(Template, {
      templates: props.templates,
      templateKey: "footer",
      rootProps: {
        className: props.cssClasses.footer
      },
      data: props.data
    }));
  }

  var withUsage$H = createDocumentationMessageGenerator({
    name: 'panel'
  });
  var suit$i = component('Panel');
  var renderer$d = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      bodyContainerNode = _ref.bodyContainerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates;
    return function (_ref2) {
      var options = _ref2.options,
        hidden = _ref2.hidden,
        collapsible = _ref2.collapsible,
        collapsed = _ref2.collapsed;
      P(h(Panel, {
        cssClasses: cssClasses,
        hidden: hidden,
        collapsible: collapsible,
        isCollapsed: collapsed,
        templates: templates,
        data: options,
        bodyElement: bodyContainerNode
      }), containerNode);
    };
  };
  /**
   * The panel widget wraps other widgets in a consistent panel design.
   * It also reacts, indicates and sets CSS classes when widgets are no longer relevant for refining.
   */
  var panel = function panel(panelWidgetParams) {
    var _ref3 = panelWidgetParams || {},
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$hidden = _ref3.hidden,
      hidden = _ref3$hidden === void 0 ? function () {
        return false;
      } : _ref3$hidden,
      collapsed = _ref3.collapsed,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;
     _warning(typeof hidden === 'function', "The `hidden` option in the \"panel\" widget expects a function returning a boolean (received type ".concat(getObjectType(hidden), ").")) ;
     _warning(typeof collapsed === 'undefined' || typeof collapsed === 'function', "The `collapsed` option in the \"panel\" widget expects a function returning a boolean (received type ".concat(getObjectType(collapsed), ").")) ;
    var bodyContainerNode = document.createElement('div');
    var collapsible = Boolean(collapsed);
    var collapsedFn = typeof collapsed === 'function' ? collapsed : function () {
      return false;
    };
    var cssClasses = {
      root: cx(suit$i(), userCssClasses.root),
      noRefinementRoot: cx(suit$i({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      collapsibleRoot: cx(suit$i({
        modifierName: 'collapsible'
      }), userCssClasses.collapsibleRoot),
      collapsedRoot: cx(suit$i({
        modifierName: 'collapsed'
      }), userCssClasses.collapsedRoot),
      collapseButton: cx(suit$i({
        descendantName: 'collapseButton'
      }), userCssClasses.collapseButton),
      collapseIcon: cx(suit$i({
        descendantName: 'collapseIcon'
      }), userCssClasses.collapseIcon),
      body: cx(suit$i({
        descendantName: 'body'
      }), userCssClasses.body),
      header: cx(suit$i({
        descendantName: 'header'
      }), userCssClasses.header),
      footer: cx(suit$i({
        descendantName: 'footer'
      }), userCssClasses.footer)
    };
    return function (widgetFactory) {
      return function (widgetParams) {
        if (!(widgetParams && widgetParams.container)) {
          throw new Error(withUsage$H("The `container` option is required in the widget within the panel."));
        }
        var containerNode = getContainerNode(widgetParams.container);
        var defaultTemplates = {
          header: '',
          footer: '',
          collapseButtonText: function collapseButtonText(_ref4) {
            var isCollapsed = _ref4.collapsed;
            return "<svg\n          class=\"".concat(cssClasses.collapseIcon, "\"\n          style=\"width: 1em; height: 1em;\"\n          viewBox=\"0 0 500 500\"\n        >\n        <path d=\"").concat(isCollapsed ? 'M100 250l300-150v300z' : 'M250 400l150-300H100z', "\" fill=\"currentColor\" />\n        </svg>");
          }
        };
        var renderPanel = renderer$d({
          containerNode: containerNode,
          bodyContainerNode: bodyContainerNode,
          cssClasses: cssClasses,
          templates: _objectSpread2(_objectSpread2({}, defaultTemplates), templates)
        });
        var widget = widgetFactory(_objectSpread2(_objectSpread2({}, widgetParams), {}, {
          container: bodyContainerNode
        }));

        // TypeScript somehow loses track of the ...widget type, since it's
        // not directly returned. Eventually the "as AugmentedWidget<typeof widgetFactory>"
        // will not be needed anymore.
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return _objectSpread2(_objectSpread2({}, widget), {}, {
          init: function init() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            var renderOptions = args[0];
            var options = _objectSpread2(_objectSpread2({}, widget.getWidgetRenderState ? widget.getWidgetRenderState(renderOptions) : {}), renderOptions);
            renderPanel({
              options: options,
              hidden: true,
              collapsible: collapsible,
              collapsed: false
            });
            if (typeof widget.init === 'function') {
              var _widget$init;
              (_widget$init = widget.init).call.apply(_widget$init, [this].concat(args));
            }
          },
          render: function render() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            var renderOptions = args[0];
            var options = _objectSpread2(_objectSpread2({}, widget.getWidgetRenderState ? widget.getWidgetRenderState(renderOptions) : {}), renderOptions);
            renderPanel({
              options: options,
              hidden: Boolean(hidden(options)),
              collapsible: collapsible,
              collapsed: Boolean(collapsedFn(options))
            });
            if (typeof widget.render === 'function') {
              var _widget$render;
              (_widget$render = widget.render).call.apply(_widget$render, [this].concat(args));
            }
          },
          dispose: function dispose() {
            P(null, containerNode);
            if (typeof widget.dispose === 'function') {
              var _widget$dispose;
              for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
              }
              return (_widget$dispose = widget.dispose).call.apply(_widget$dispose, [this].concat(args));
            }
            return undefined;
          }
        });
      };
    };
  };

  var _excluded$l = ["placesReference", "defaultPosition"],
    _excluded2$4 = ["places"];
  /* Places.js is an optional dependency, no error should be reported if the package is missing */
  /** @ts-ignore */

  // using the type like this requires only one ts-ignore

  /**
   * This widget sets the geolocation value for the search based on the selected
   * result in the Algolia Places autocomplete.
   */
  var placesWidget = function placesWidget(widgetParams) {
    var _ref = widgetParams || {},
      placesReference = _ref.placesReference,
      _ref$defaultPosition = _ref.defaultPosition,
      defaultPosition = _ref$defaultPosition === void 0 ? [] : _ref$defaultPosition,
      placesOptions = _objectWithoutProperties(_ref, _excluded$l);
    if (typeof placesReference !== 'function') {
      throw new Error('The `placesReference` option requires a valid Places.js reference.');
    }
    var placesAutocomplete = placesReference(placesOptions);
    var state = {
      query: '',
      initialLatLngViaIP: undefined,
      isInitialLatLngViaIPSet: false
    };
    return {
      $$type: 'ais.places',
      $$widgetType: 'ais.places',
      init: function init(_ref2) {
        var helper = _ref2.helper;
        placesAutocomplete.on('change', function (eventOptions) {
          var _eventOptions$suggest = eventOptions.suggestion,
            value = _eventOptions$suggest.value,
            _eventOptions$suggest2 = _eventOptions$suggest.latlng,
            lat = _eventOptions$suggest2.lat,
            lng = _eventOptions$suggest2.lng;
          state.query = value;
          helper.setQueryParameter('insideBoundingBox', undefined).setQueryParameter('aroundLatLngViaIP', false).setQueryParameter('aroundLatLng', "".concat(lat, ",").concat(lng)).search();
        });
        placesAutocomplete.on('clear', function () {
          state.query = '';
          helper.setQueryParameter('insideBoundingBox', undefined);
          if (defaultPosition.length > 1) {
            helper.setQueryParameter('aroundLatLngViaIP', false).setQueryParameter('aroundLatLng', defaultPosition.join(','));
          } else {
            helper.setQueryParameter('aroundLatLngViaIP', state.initialLatLngViaIP).setQueryParameter('aroundLatLng', undefined);
          }
          helper.search();
        });
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref3) {
        var searchParameters = _ref3.searchParameters;
        var position = searchParameters.aroundLatLng || defaultPosition.join(',');
        var hasPositionSet = position !== defaultPosition.join(',');
        if (!hasPositionSet && !state.query) {
          var places = uiState.places,
            uiStateWithoutPlaces = _objectWithoutProperties(uiState, _excluded2$4);
          return uiStateWithoutPlaces;
        }
        return _objectSpread2(_objectSpread2({}, uiState), {}, {
          places: {
            query: state.query,
            position: position
          }
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref4) {
        var uiState = _ref4.uiState;
        var _ref5 = uiState.places || {},
          _ref5$query = _ref5.query,
          query = _ref5$query === void 0 ? '' : _ref5$query,
          _ref5$position = _ref5.position,
          position = _ref5$position === void 0 ? defaultPosition.join(',') : _ref5$position;
        state.query = query;
        if (!state.isInitialLatLngViaIPSet) {
          state.isInitialLatLngViaIPSet = true;
          state.initialLatLngViaIP = searchParameters.aroundLatLngViaIP;
        }
        placesAutocomplete.setVal(query);
        placesAutocomplete.close();
        return searchParameters.setQueryParameter('insideBoundingBox', undefined).setQueryParameter('aroundLatLngViaIP', false).setQueryParameter('aroundLatLng', position || undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread2(_objectSpread2({}, renderState), {}, {
          places: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState() {
        return {
          widgetParams: widgetParams
        };
      }
    };
  };

  var PoweredBy = function PoweredBy(_ref) {
    var url = _ref.url,
      theme = _ref.theme,
      cssClasses = _ref.cssClasses;
    return h("div", {
      className: cssClasses.root
    }, h("a", {
      href: url,
      target: "_blank",
      className: cssClasses.link,
      "aria-label": "Search by Algolia",
      rel: "noopener noreferrer"
    }, h("svg", {
      height: "1.2em",
      className: cssClasses.logo,
      viewBox: "0 0 572 64"
      // This style is necessary as long as it's not included in InstantSearch.css.
      // For now, InstantSearch.css sets a maximum width of 70px.
      ,
      style: {
        width: 'auto'
      }
    }, h("path", {
      fill: theme === 'dark' ? '#FFF' : '#36395A',
      d: "M16 48.3c-3.4 0-6.3-.6-8.7-1.7A12.4 12.4 0 0 1 1.9 42C.6 40 0 38 0 35.4h6.5a6.7 6.7 0 0 0 3.9 6c1.4.7 3.3 1.1 5.6 1.1 2.2 0 4-.3 5.4-1a7 7 0 0 0 3-2.4 6 6 0 0 0 1-3.4c0-1.5-.6-2.8-1.9-3.7-1.3-1-3.3-1.6-5.9-1.8l-4-.4c-3.7-.3-6.6-1.4-8.8-3.4a10 10 0 0 1-3.3-7.9c0-2.4.6-4.6 1.8-6.4a12 12 0 0 1 5-4.3c2.2-1 4.7-1.6 7.5-1.6s5.5.5 7.6 1.6a12 12 0 0 1 5 4.4c1.2 1.8 1.8 4 1.8 6.7h-6.5a6.4 6.4 0 0 0-3.5-5.9c-1-.6-2.6-1-4.4-1s-3.2.3-4.4 1c-1.1.6-2 1.4-2.6 2.4-.5 1-.8 2-.8 3.1a5 5 0 0 0 1.5 3.6c1 1 2.6 1.7 4.7 1.9l4 .3c2.8.2 5.2.8 7.2 1.8 2.1 1 3.7 2.2 4.9 3.8a9.7 9.7 0 0 1 1.7 5.8c0 2.5-.7 4.7-2 6.6a13 13 0 0 1-5.6 4.4c-2.4 1-5.2 1.6-8.4 1.6Zm35.6 0c-2.6 0-4.8-.4-6.7-1.3a13 13 0 0 1-4.7-3.5 17.1 17.1 0 0 1-3.6-10.4v-1c0-2 .3-3.8 1-5.6a13 13 0 0 1 7.3-8.3 15 15 0 0 1 6.3-1.4A13.2 13.2 0 0 1 64 24.3c1 2.2 1.6 4.6 1.6 7.2V34H39.4v-4.3h21.8l-1.8 2.2c0-2-.3-3.7-.9-5.1a7.3 7.3 0 0 0-2.7-3.4c-1.2-.7-2.7-1.1-4.6-1.1s-3.4.4-4.7 1.3a8 8 0 0 0-2.9 3.6c-.6 1.5-.9 3.3-.9 5.4 0 2 .3 3.7 1 5.3a7.9 7.9 0 0 0 2.8 3.7c1.3.8 3 1.3 5 1.3s3.8-.5 5.1-1.3c1.3-1 2.1-2 2.4-3.2h6a11.8 11.8 0 0 1-7 8.7 16 16 0 0 1-6.4 1.2ZM80 48c-2.2 0-4-.3-5.7-1a8.4 8.4 0 0 1-3.7-3.3 9.7 9.7 0 0 1-1.3-5.2c0-2 .5-3.8 1.5-5.2a9 9 0 0 1 4.3-3.1c1.8-.7 4-1 6.7-1H89v4.1h-7.5c-2 0-3.4.5-4.4 1.4-1 1-1.6 2.1-1.6 3.6s.5 2.7 1.6 3.6c1 1 2.5 1.4 4.4 1.4 1.1 0 2.2-.2 3.2-.7 1-.4 1.9-1 2.6-2 .6-1 1-2.4 1-4.2l1.7 2.1c-.2 2-.7 3.8-1.5 5.2a9 9 0 0 1-3.4 3.3 12 12 0 0 1-5.3 1Zm9.5-.7v-8.8h-1v-10c0-1.8-.5-3.2-1.4-4.1-1-1-2.4-1.4-4.2-1.4a142.9 142.9 0 0 0-10.2.4v-5.6a74.8 74.8 0 0 1 8.6-.4c3 0 5.5.4 7.5 1.2s3.4 2 4.4 3.6c1 1.7 1.4 4 1.4 6.7v18.4h-5Zm12.9 0V17.8h5v12.3h-.2c0-4.2 1-7.4 2.8-9.5a11 11 0 0 1 8.3-3.1h1v5.6h-2a9 9 0 0 0-6.3 2.2c-1.5 1.5-2.2 3.6-2.2 6.4v15.6h-6.4Zm34.4 1a15 15 0 0 1-6.6-1.3c-1.9-.9-3.4-2-4.7-3.5a15.5 15.5 0 0 1-2.7-5c-.6-1.7-1-3.6-1-5.4v-1c0-2 .4-3.8 1-5.6a15 15 0 0 1 2.8-4.9c1.3-1.5 2.8-2.6 4.6-3.5a16.4 16.4 0 0 1 13.3.2c2 1 3.5 2.3 4.8 4a12 12 0 0 1 2 6H144c-.2-1.6-1-3-2.2-4.1a7.5 7.5 0 0 0-5.2-1.7 8 8 0 0 0-4.7 1.3 8 8 0 0 0-2.8 3.6 13.8 13.8 0 0 0 0 10.3c.6 1.5 1.5 2.7 2.8 3.6s2.8 1.3 4.8 1.3c1.5 0 2.7-.2 3.8-.8a7 7 0 0 0 2.6-2c.7-1 1-2 1.2-3.2h6.2a11 11 0 0 1-2 6.2 15.1 15.1 0 0 1-11.8 5.5Zm19.7-1v-40h6.4V31h-1.3c0-3 .4-5.5 1.1-7.6a9.7 9.7 0 0 1 3.5-4.8A9.9 9.9 0 0 1 172 17h.3c3.5 0 6 1.1 7.9 3.5 1.7 2.3 2.6 5.7 2.6 10v16.8h-6.4V29.6c0-2.1-.6-3.8-1.8-5a6.4 6.4 0 0 0-4.8-1.8c-2 0-3.7.7-5 2a7.8 7.8 0 0 0-1.9 5.5v17h-6.4Zm63.8 1a12.2 12.2 0 0 1-10.9-6.2 19 19 0 0 1-1.8-7.3h1.4v12.5h-5.1v-40h6.4v19.8l-2 3.5c.2-3.1.8-5.7 1.9-7.7a11 11 0 0 1 4.4-4.5c1.8-1 3.9-1.5 6.1-1.5a13.4 13.4 0 0 1 12.8 9.1c.7 1.9 1 3.8 1 6v1c0 2.2-.3 4.1-1 6a13.6 13.6 0 0 1-13.2 9.4Zm-1.2-5.5a8.4 8.4 0 0 0 7.9-5c.7-1.5 1.1-3.3 1.1-5.3s-.4-3.8-1.1-5.3a8.7 8.7 0 0 0-3.2-3.6 9.6 9.6 0 0 0-9.2-.2 8.5 8.5 0 0 0-3.3 3.2c-.8 1.4-1.3 3-1.3 5v2.3a9 9 0 0 0 1.3 4.8 9 9 0 0 0 3.4 3c1.4.7 2.8 1 4.4 1Zm27.3 3.9-10-28.9h6.5l9.5 28.9h-6Zm-7.5 12.2v-5.7h4.9c1 0 2-.1 2.9-.4a4 4 0 0 0 2-1.4c.4-.7.9-1.6 1.2-2.7l8.6-30.9h6.2l-9.3 32.4a14 14 0 0 1-2.5 5 8.9 8.9 0 0 1-4 2.8c-1.5.6-3.4.9-5.6.9h-4.4Zm9-12.2v-5.2h6.4v5.2H248Z"
    }), h("path", {
      fill: theme === 'dark' ? '#FFF' : '#003DFF',
      d: "M534.4 9.1H528a.8.8 0 0 1-.7-.7V1.8c0-.4.2-.7.6-.8l6.5-1c.4 0 .8.2.9.6v7.8c0 .4-.4.7-.8.7zM428 35.2V.8c0-.5-.3-.8-.7-.8h-.2l-6.4 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.5 0 .8-.4.8-.8V43c0-.4-.3-.7-.6-.8-4.5-.5-4.5-6-4.5-7zm106.5-21.8H528c-.4 0-.7.4-.7.8v34c0 .4.3.8.7.8h6.5c.4 0 .8-.4.8-.8v-34c0-.5-.4-.8-.8-.8zm-17.7 21.8V.8c0-.5-.3-.8-.8-.8l-6.5 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.4 0 .8-.4.8-.8V43c0-.4-.3-.7-.7-.8-4.4-.5-4.4-6-4.4-7zm-22.2-20.6a16.5 16.5 0 0 1 8.6 9.3c.8 2.2 1.3 4.8 1.3 7.5a19.4 19.4 0 0 1-4.6 12.6 14.8 14.8 0 0 1-5.2 3.6c-2 .9-5.2 1.4-6.8 1.4a21 21 0 0 1-6.7-1.4 15.4 15.4 0 0 1-8.6-9.3 21.3 21.3 0 0 1 0-14.4 15.2 15.2 0 0 1 8.6-9.3c2-.8 4.3-1.2 6.7-1.2s4.6.4 6.7 1.2zm-6.7 27.6c2.7 0 4.7-1 6.2-3s2.2-4.3 2.2-7.8-.7-6.3-2.2-8.3-3.5-3-6.2-3-4.7 1-6.1 3c-1.5 2-2.2 4.8-2.2 8.3s.7 5.8 2.2 7.8 3.5 3 6.2 3zm-88.8-28.8c-6.2 0-11.7 3.3-14.8 8.2a18.6 18.6 0 0 0 4.8 25.2c1.8 1.2 4 1.8 6.2 1.7s.1 0 .1 0h.9c4.2-.7 8-4 9.1-8.1v7.4c0 .4.3.7.8.7h6.4a.7.7 0 0 0 .7-.7V14.2c0-.5-.3-.8-.7-.8h-13.5zm6.3 26.5a9.8 9.8 0 0 1-5.7 2h-.5a10 10 0 0 1-9.2-14c1.4-3.7 5-6.3 9-6.3h6.4v18.3zm152.3-26.5h13.5c.5 0 .8.3.8.7v33.7c0 .4-.3.7-.8.7h-6.4a.7.7 0 0 1-.8-.7v-7.4c-1.2 4-4.8 7.4-9 8h-.1a4.2 4.2 0 0 1-.5.1h-.9a10.3 10.3 0 0 1-7-2.6c-4-3.3-6.5-8.4-6.5-14.2 0-3.7 1-7.2 3-10 3-5 8.5-8.3 14.7-8.3zm.6 28.4c2.2-.1 4.2-.6 5.7-2V21.7h-6.3a9.8 9.8 0 0 0-9 6.4 10.2 10.2 0 0 0 9.1 13.9h.5zM452.8 13.4c-6.2 0-11.7 3.3-14.8 8.2a18.5 18.5 0 0 0 3.6 24.3 10.4 10.4 0 0 0 13 .6c2.2-1.5 3.8-3.7 4.5-6.1v7.8c0 2.8-.8 5-2.2 6.3-1.5 1.5-4 2.2-7.5 2.2l-6-.3c-.3 0-.7.2-.8.5l-1.6 5.5c-.1.4.1.8.5 1h.1c2.8.4 5.5.6 7 .6 6.3 0 11-1.4 14-4.1 2.7-2.5 4.2-6.3 4.5-11.4V14.2c0-.5-.4-.8-.8-.8h-13.5zm6.3 8.2v18.3a9.6 9.6 0 0 1-5.6 2h-1a10.3 10.3 0 0 1-8.8-14c1.4-3.7 5-6.3 9-6.3h6.4zM291 31.5A32 32 0 0 1 322.8 0h30.8c.6 0 1.2.5 1.2 1.2v61.5c0 1.1-1.3 1.7-2.2 1l-19.2-17a18 18 0 0 1-11 3.4 18.1 18.1 0 1 1 18.2-14.8c-.1.4-.5.7-.9.6-.1 0-.3 0-.4-.2l-3.8-3.4c-.4-.3-.6-.8-.7-1.4a12 12 0 1 0-2.4 8.3c.4-.4 1-.5 1.6-.2l14.7 13.1v-46H323a26 26 0 1 0 10 49.7c.8-.4 1.6-.2 2.3.3l3 2.7c.3.2.3.7 0 1l-.2.2a32 32 0 0 1-47.2-28.6z"
    }))));
  };

  var suit$j = component('PoweredBy');
  var withUsage$I = createDocumentationMessageGenerator({
    name: 'powered-by'
  });
  var renderer$e = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
    return function (_ref2, isFirstRendering) {
      var url = _ref2.url,
        widgetParams = _ref2.widgetParams;
      if (isFirstRendering) {
        var _widgetParams$theme = widgetParams.theme,
          theme = _widgetParams$theme === void 0 ? 'light' : _widgetParams$theme;
        P(h(PoweredBy, {
          cssClasses: cssClasses,
          url: url,
          theme: theme
        }), containerNode);
        return;
      }
    };
  };
  var poweredBy = function poweredBy(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$theme = _ref3.theme,
      theme = _ref3$theme === void 0 ? 'light' : _ref3$theme;
    if (!container) {
      throw new Error(withUsage$I('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$j(), suit$j({
        modifierName: theme === 'dark' ? 'dark' : 'light'
      }), userCssClasses.root),
      link: cx(suit$j({
        descendantName: 'link'
      }), userCssClasses.link),
      logo: cx(suit$j({
        descendantName: 'logo'
      }), userCssClasses.logo)
    };
    var specializedRenderer = renderer$e({
      containerNode: containerNode,
      cssClasses: cssClasses
    });
    var makeWidget = connectPoweredBy(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      theme: theme
    })), {}, {
      $$widgetType: 'ais.poweredBy'
    });
  };

  var withUsage$J = createDocumentationMessageGenerator({
    name: 'query-rule-context'
  });
  var queryRuleContext = function queryRuleContext() {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!widgetParams.trackedFilters) {
      throw new Error(withUsage$J('The `trackedFilters` option is required.'));
    }
    return _objectSpread2(_objectSpread2({}, connectQueryRules(noop)(widgetParams)), {}, {
      $$widgetType: 'ais.queryRuleContext'
    });
  };

  var QueryRuleCustomData = function QueryRuleCustomData(_ref) {
    var cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      items = _ref.items;
    return h(Template, {
      templateKey: "default",
      templates: templates,
      rootProps: {
        className: cssClasses.root
      },
      data: {
        items: items
      }
    });
  };

  var defaultTemplates$b = {
    default: function _default(_ref) {
      var items = _ref.items;
      return JSON.stringify(items, null, 2);
    }
  };
  var withUsage$K = createDocumentationMessageGenerator({
    name: 'query-rule-custom-data'
  });
  var suit$k = component('QueryRuleCustomData');
  var renderer$f = function renderer(_ref2) {
    var containerNode = _ref2.containerNode,
      cssClasses = _ref2.cssClasses,
      templates = _ref2.templates;
    return function (_ref3) {
      var items = _ref3.items;
      P(h(QueryRuleCustomData, {
        cssClasses: cssClasses,
        templates: templates,
        items: items
      }), containerNode);
    };
  };
  var queryRuleCustomData = function queryRuleCustomData(widgetParams) {
    var _ref4 = widgetParams || {},
      container = _ref4.container,
      _ref4$cssClasses = _ref4.cssClasses,
      userCssClasses = _ref4$cssClasses === void 0 ? {} : _ref4$cssClasses,
      _ref4$templates = _ref4.templates,
      userTemplates = _ref4$templates === void 0 ? {} : _ref4$templates,
      _ref4$transformItems = _ref4.transformItems,
      transformItems = _ref4$transformItems === void 0 ? function (items) {
        return items;
      } : _ref4$transformItems;
    if (!container) {
      throw new Error(withUsage$K('The `container` option is required.'));
    }
    var cssClasses = {
      root: cx(suit$k(), userCssClasses.root)
    };
    var containerNode = getContainerNode(container);
    var templates = _objectSpread2(_objectSpread2({}, defaultTemplates$b), userTemplates);
    var specializedRenderer = renderer$f({
      containerNode: containerNode,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates
    });
    var makeWidget = connectQueryRules(specializedRenderer, function () {
      P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.queryRuleCustomData'
    });
  };

  var RangeInput = /*#__PURE__*/function (_Component) {
    _inherits(RangeInput, _Component);
    var _super = _createSuper(RangeInput);
    function RangeInput() {
      var _this;
      _classCallCheck(this, RangeInput);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty(_assertThisInitialized(_this), "state", {
        min: _this.props.values.min,
        max: _this.props.values.max
      });
      _defineProperty(_assertThisInitialized(_this), "onInput", function (key) {
        return function (event) {
          var _ref = event.currentTarget,
            value = _ref.value;
          _this.setState(_defineProperty({}, key, Number(value)));
        };
      });
      _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
        event.preventDefault();
        _this.props.refine([_this.state.min, _this.state.max]);
      });
      return _this;
    }
    _createClass(RangeInput, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        this.setState({
          min: nextProps.values.min,
          max: nextProps.values.max
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$state = this.state,
          minValue = _this$state.min,
          maxValue = _this$state.max;
        var _this$props = this.props,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step,
          cssClasses = _this$props.cssClasses,
          templateProps = _this$props.templateProps;
        var isDisabled = min && max ? min >= max : false;
        var hasRefinements = Boolean(minValue || maxValue);
        var rootClassNames = cx(cssClasses.root, !hasRefinements && cssClasses.noRefinement);
        return h("div", {
          className: rootClassNames
        }, h("form", {
          className: cssClasses.form,
          onSubmit: this.onSubmit
        }, h("label", {
          className: cssClasses.label
        }, h("input", {
          className: cx(cssClasses.input, cssClasses.inputMin),
          type: "number",
          min: min,
          max: max,
          step: step,
          value: minValue !== null && minValue !== void 0 ? minValue : '',
          onInput: this.onInput('min'),
          placeholder: min === null || min === void 0 ? void 0 : min.toString(),
          disabled: isDisabled
        })), h(Template, _extends({}, templateProps, {
          templateKey: "separatorText",
          rootTagName: "span",
          rootProps: {
            className: cssClasses.separator
          }
        })), h("label", {
          className: cssClasses.label
        }, h("input", {
          className: cx(cssClasses.input, cssClasses.inputMax),
          type: "number",
          min: min,
          max: max,
          step: step,
          value: maxValue !== null && maxValue !== void 0 ? maxValue : '',
          onInput: this.onInput('max'),
          placeholder: max === null || max === void 0 ? void 0 : max.toString(),
          disabled: isDisabled
        })), h(Template, _extends({}, templateProps, {
          templateKey: "submitText",
          rootTagName: "button",
          rootProps: {
            type: 'submit',
            className: cssClasses.submit,
            disabled: isDisabled
          }
        }))));
      }
    }]);
    return RangeInput;
  }(d);

  var withUsage$L = createDocumentationMessageGenerator({
    name: 'range-input'
  });
  var suit$l = component('RangeInput');
  var defaultTemplates$c = {
    separatorText: function separatorText() {
      return 'to';
    },
    submitText: function submitText() {
      return 'Go';
    }
  };
  var renderer$g = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
    return function (_ref2, isFirstRendering) {
      var refine = _ref2.refine,
        range = _ref2.range,
        start = _ref2.start,
        widgetParams = _ref2.widgetParams,
        instantSearchInstance = _ref2.instantSearchInstance;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$c,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      var rangeMin = range.min,
        rangeMax = range.max;
      var _start = _slicedToArray(start, 2),
        minValue = _start[0],
        maxValue = _start[1];
      var step = 1 / Math.pow(10, widgetParams.precision || 0);
      var values = {
        min: minValue !== -Infinity && minValue !== rangeMin ? minValue : undefined,
        max: maxValue !== Infinity && maxValue !== rangeMax ? maxValue : undefined
      };
      P(h(RangeInput, {
        min: rangeMin,
        max: rangeMax,
        step: step,
        values: values,
        cssClasses: cssClasses,
        refine: refine,
        templateProps: renderState.templateProps
      }), containerNode);
    };
  };
  var rangeInput = function rangeInput(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      min = _ref3.min,
      max = _ref3.max,
      _ref3$precision = _ref3.precision,
      precision = _ref3$precision === void 0 ? 0 : _ref3$precision,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates;
    if (!container) {
      throw new Error(withUsage$L('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$l(), userCssClasses.root),
      noRefinement: cx(suit$l({
        modifierName: 'noRefinement'
      })),
      form: cx(suit$l({
        descendantName: 'form'
      }), userCssClasses.form),
      label: cx(suit$l({
        descendantName: 'label'
      }), userCssClasses.label),
      input: cx(suit$l({
        descendantName: 'input'
      }), userCssClasses.input),
      inputMin: cx(suit$l({
        descendantName: 'input',
        modifierName: 'min'
      }), userCssClasses.inputMin),
      inputMax: cx(suit$l({
        descendantName: 'input',
        modifierName: 'max'
      }), userCssClasses.inputMax),
      separator: cx(suit$l({
        descendantName: 'separator'
      }), userCssClasses.separator),
      submit: cx(suit$l({
        descendantName: 'submit'
      }), userCssClasses.submit)
    };
    var specializedRenderer = renderer$g({
      containerNode: containerNode,
      cssClasses: cssClasses,
      templates: templates,
      renderState: {}
    });
    var makeWidget = connectRange(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attribute: attribute,
      min: min,
      max: max,
      precision: precision
    })), {}, {
      $$type: 'ais.rangeInput',
      $$widgetType: 'ais.rangeInput'
    });
  };

  var Pit = function Pit(_ref) {
    var style = _ref.style,
      children = _ref.children;
    // first, end & middle
    var positionValue = Math.round(parseFloat(style.left));
    var shouldDisplayValue = [0, 50, 100].includes(positionValue);
    var value = children;
    var pitValue = Math.round(parseInt(value, 10) * 100) / 100;
    return h("div", {
      style: _objectSpread2(_objectSpread2({}, style), {}, {
        marginLeft: positionValue === 100 ? '-2px' : 0
      }),
      className: cx('rheostat-marker', 'rheostat-marker-horizontal', shouldDisplayValue && 'rheostat-marker-large')
    }, shouldDisplayValue && h("div", {
      className: 'rheostat-value'
    }, pitValue));
  };

  var KEYS = {
    DOWN: 40,
    END: 35,
    ESC: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    RIGHT: 39,
    UP: 38
  };
  var PERCENT_EMPTY = 0;
  var PERCENT_FULL = 100;
  function getPosition(value, min, max) {
    return (value - min) / (max - min) * 100;
  }
  function getValue$1(pos, min, max) {
    var decimal = pos / 100;
    if (pos === 0) {
      return min;
    } else if (pos === 100) {
      return max;
    }
    return Math.round((max - min) * decimal + min);
  }
  function getClassName(props) {
    var orientation = props.orientation === 'vertical' ? 'rheostat-vertical' : 'rheostat-horizontal';
    return ['rheostat', orientation].concat(props.className.split(' ')).join(' ');
  }
  function getHandleFor(ev) {
    return Number(ev.currentTarget.getAttribute('data-handle-key'));
  }
  function killEvent(ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }
  function Button(props) {
    return h("button", _extends({}, props, {
      type: "button"
    }));
  }

  // Preact doesn't have builtin types for Style, JSX.HTMLAttributes['style'] is just object
  // maybe migrate to csstype later?
  var _ref6 = h("div", {
    className: "rheostat-background"
  });
  var Rheostat = /*#__PURE__*/function (_Component) {
    _inherits(Rheostat, _Component);
    var _super = _createSuper(Rheostat);
    function Rheostat(props) {
      var _this;
      _classCallCheck(this, Rheostat);
      _this = _super.call(this, props);
      _defineProperty(_assertThisInitialized(_this), "state", {
        className: getClassName(_this.props),
        // non-null thanks to defaultProps
        handlePos: _this.props.values.map(function (value) {
          return getPosition(value, _this.props.min, _this.props.max);
        }),
        handleDimensions: 0,
        mousePos: null,
        sliderBox: {},
        slidingIndex: null,
        // non-null thanks to defaultProps
        values: _this.props.values
      });
      _defineProperty(_assertThisInitialized(_this), "rheostat", y());
      _this.getPublicState = _this.getPublicState.bind(_assertThisInitialized(_this));
      _this.getSliderBoundingBox = _this.getSliderBoundingBox.bind(_assertThisInitialized(_this));
      _this.getProgressStyle = _this.getProgressStyle.bind(_assertThisInitialized(_this));
      _this.getMinValue = _this.getMinValue.bind(_assertThisInitialized(_this));
      _this.getMaxValue = _this.getMaxValue.bind(_assertThisInitialized(_this));
      _this.getHandleDimensions = _this.getHandleDimensions.bind(_assertThisInitialized(_this));
      _this.getClosestSnapPoint = _this.getClosestSnapPoint.bind(_assertThisInitialized(_this));
      _this.getSnapPosition = _this.getSnapPosition.bind(_assertThisInitialized(_this));
      _this.getNextPositionForKey = _this.getNextPositionForKey.bind(_assertThisInitialized(_this));
      _this.getNextState = _this.getNextState.bind(_assertThisInitialized(_this));
      _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
      _this.getClosestHandle = _this.getClosestHandle.bind(_assertThisInitialized(_this));
      _this.setStartSlide = _this.setStartSlide.bind(_assertThisInitialized(_this));
      _this.startMouseSlide = _this.startMouseSlide.bind(_assertThisInitialized(_this));
      _this.startTouchSlide = _this.startTouchSlide.bind(_assertThisInitialized(_this));
      _this.handleMouseSlide = _this.handleMouseSlide.bind(_assertThisInitialized(_this));
      _this.handleTouchSlide = _this.handleTouchSlide.bind(_assertThisInitialized(_this));
      _this.handleSlide = _this.handleSlide.bind(_assertThisInitialized(_this));
      _this.endSlide = _this.endSlide.bind(_assertThisInitialized(_this));
      _this.handleKeydown = _this.handleKeydown.bind(_assertThisInitialized(_this));
      _this.validatePosition = _this.validatePosition.bind(_assertThisInitialized(_this));
      _this.validateValues = _this.validateValues.bind(_assertThisInitialized(_this));
      _this.canMove = _this.canMove.bind(_assertThisInitialized(_this));
      _this.fireChangeEvent = _this.fireChangeEvent.bind(_assertThisInitialized(_this));
      _this.slideTo = _this.slideTo.bind(_assertThisInitialized(_this));
      _this.updateNewValues = _this.updateNewValues.bind(_assertThisInitialized(_this));
      return _this;
    }
    _createClass(Rheostat, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var _this$props = this.props,
          className = _this$props.className,
          disabled = _this$props.disabled,
          min = _this$props.min,
          max = _this$props.max,
          orientation = _this$props.orientation;
        var _this$state = this.state,
          values = _this$state.values,
          slidingIndex = _this$state.slidingIndex;
        var minMaxChanged = nextProps.min !== min || nextProps.max !== max;
        var valuesChanged = values.length !== nextProps.values.length || values.some(function (value, idx) {
          return nextProps.values[idx] !== value;
        });
        var orientationChanged = nextProps.className !== className || nextProps.orientation !== orientation;
        var willBeDisabled = nextProps.disabled && !disabled;
        if (orientationChanged) {
          this.setState({
            className: getClassName(nextProps)
          });
        }
        if (minMaxChanged || valuesChanged) this.updateNewValues(nextProps);
        if (willBeDisabled && slidingIndex !== null) {
          this.endSlide();
        }
      }
    }, {
      key: "getPublicState",
      value: function getPublicState() {
        var _this$props2 = this.props,
          min = _this$props2.min,
          max = _this$props2.max;
        var values = this.state.values;
        return {
          max: max,
          min: min,
          values: values
        };
      }
    }, {
      key: "getSliderBoundingBox",
      value: function getSliderBoundingBox() {
        // only gets called after render, so it will always be defined
        var node = this.rheostat.current;
        var rect = node.getBoundingClientRect();
        return {
          height: rect.height || node.clientHeight,
          left: rect.left,
          top: rect.top,
          width: rect.width || node.clientWidth
        };
      }
    }, {
      key: "getProgressStyle",
      value: function getProgressStyle(idx) {
        var handlePos = this.state.handlePos;
        var value = handlePos[idx];
        if (idx === 0) {
          return this.props.orientation === 'vertical' ? {
            height: "".concat(value, "%"),
            top: 0
          } : {
            left: 0,
            width: "".concat(value, "%")
          };
        }
        var prevValue = handlePos[idx - 1];
        var diffValue = value - prevValue;
        return this.props.orientation === 'vertical' ? {
          height: "".concat(diffValue, "%"),
          top: "".concat(prevValue, "%")
        } : {
          left: "".concat(prevValue, "%"),
          width: "".concat(diffValue, "%")
        };
      }
    }, {
      key: "getMinValue",
      value: function getMinValue(idx) {
        return this.state.values[idx - 1] ? Math.max(this.props.min, this.state.values[idx - 1]) : this.props.min;
      }
    }, {
      key: "getMaxValue",
      value: function getMaxValue(idx) {
        return this.state.values[idx + 1] ? Math.min(this.props.max, this.state.values[idx + 1]) : this.props.max;
      }
    }, {
      key: "getHandleDimensions",
      value: function getHandleDimensions(ev, sliderBox) {
        var handleNode = ev.currentTarget || null;
        if (!handleNode) return 0;
        return this.props.orientation === 'vertical' ? handleNode.clientHeight / sliderBox.height * PERCENT_FULL / 2 : handleNode.clientWidth / sliderBox.width * PERCENT_FULL / 2;
      }
    }, {
      key: "getClosestSnapPoint",
      value: function getClosestSnapPoint(value) {
        // non-null thanks to defaultProps
        if (!this.props.snapPoints.length) return value;
        return this.props.snapPoints.reduce(function (snapTo, snap) {
          return Math.abs(snapTo - value) < Math.abs(snap - value) ? snapTo : snap;
        });
      }
    }, {
      key: "getSnapPosition",
      value: function getSnapPosition(positionPercent) {
        if (!this.props.snap) return positionPercent;
        var _ref = this.props,
          max = _ref.max,
          min = _ref.min;
        var value = getValue$1(positionPercent, min, max);
        var snapValue = this.getClosestSnapPoint(value);
        return getPosition(snapValue, min, max);
      }
    }, {
      key: "getNextPositionForKey",
      value: function getNextPositionForKey(idx, keyCode) {
        var _stepMultiplier;
        var _this$state2 = this.state,
          handlePos = _this$state2.handlePos,
          values = _this$state2.values;
        var _ref2 = this.props,
          max = _ref2.max,
          min = _ref2.min,
          snapPoints = _ref2.snapPoints;
        var shouldSnap = this.props.snap;
        var proposedValue = values[idx];
        var proposedPercentage = handlePos[idx];
        var originalPercentage = proposedPercentage;
        var stepValue = 1;
        if (max >= 100) {
          proposedPercentage = Math.round(proposedPercentage);
        } else {
          stepValue = 100 / (max - min);
        }
        var currentIndex = null;
        if (shouldSnap) {
          currentIndex = snapPoints.indexOf(this.getClosestSnapPoint(values[idx]));
        }
        var stepMultiplier = (_stepMultiplier = {}, _defineProperty(_stepMultiplier, KEYS.LEFT, function (v) {
          return v * -1;
        }), _defineProperty(_stepMultiplier, KEYS.RIGHT, function (v) {
          return v;
        }), _defineProperty(_stepMultiplier, KEYS.UP, function (v) {
          return v;
        }), _defineProperty(_stepMultiplier, KEYS.DOWN, function (v) {
          return v * -1;
        }), _defineProperty(_stepMultiplier, KEYS.PAGE_DOWN, function (v) {
          return v > 1 ? -v : v * -10;
        }), _defineProperty(_stepMultiplier, KEYS.PAGE_UP, function (v) {
          return v > 1 ? v : v * 10;
        }), _stepMultiplier);
        if (Object.prototype.hasOwnProperty.call(stepMultiplier, keyCode)) {
          proposedPercentage += stepMultiplier[keyCode](stepValue);
          if (shouldSnap) {
            if (!currentIndex) ; else if (proposedPercentage > originalPercentage) {
              // move cursor right unless overflow
              if (currentIndex < snapPoints.length - 1) {
                proposedValue = snapPoints[currentIndex + 1];
              }
              // move cursor left unless there is overflow
            } else if (currentIndex > 0) {
              proposedValue = snapPoints[currentIndex - 1];
            }
          }
        } else if (keyCode === KEYS.HOME) {
          proposedPercentage = PERCENT_EMPTY;
          if (shouldSnap) {
            proposedValue = snapPoints[0];
          }
        } else if (keyCode === KEYS.END) {
          proposedPercentage = PERCENT_FULL;
          if (shouldSnap) {
            proposedValue = snapPoints[snapPoints.length - 1];
          }
        } else {
          return null;
        }
        return shouldSnap ? getPosition(proposedValue, min, max) : proposedPercentage;
      }
    }, {
      key: "getNextState",
      value: function getNextState(idx, proposedPosition) {
        var handlePos = this.state.handlePos;
        var _ref3 = this.props,
          max = _ref3.max,
          min = _ref3.min;
        var actualPosition = this.validatePosition(idx, proposedPosition);
        var nextHandlePos = handlePos.map(function (pos, index) {
          return index === idx ? actualPosition : pos;
        });
        return {
          handlePos: nextHandlePos,
          values: nextHandlePos.map(function (pos) {
            return getValue$1(pos, min, max);
          })
        };
      }
    }, {
      key: "getClosestHandle",
      value: function getClosestHandle(positionPercent) {
        var handlePos = this.state.handlePos;
        return handlePos.reduce(function (closestIdx, _node, idx) {
          var challenger = Math.abs(handlePos[idx] - positionPercent);
          var current = Math.abs(handlePos[closestIdx] - positionPercent);
          return challenger < current ? idx : closestIdx;
        }, 0);
      }
    }, {
      key: "setStartSlide",
      value: function setStartSlide(ev, x, y) {
        var sliderBox = this.getSliderBoundingBox();
        this.setState({
          handleDimensions: this.getHandleDimensions(ev, sliderBox),
          mousePos: {
            x: x,
            y: y
          },
          sliderBox: sliderBox,
          slidingIndex: getHandleFor(ev)
        });
      }
    }, {
      key: "startMouseSlide",
      value: function startMouseSlide(ev) {
        this.setStartSlide(ev, ev.clientX, ev.clientY);
        document.addEventListener('mousemove', this.handleMouseSlide, false);
        document.addEventListener('mouseup', this.endSlide, false);
        killEvent(ev);
      }
    }, {
      key: "startTouchSlide",
      value: function startTouchSlide(ev) {
        if (ev.changedTouches.length > 1) return;
        var touch = ev.changedTouches[0];
        this.setStartSlide(ev, touch.clientX, touch.clientY);
        document.addEventListener('touchmove', this.handleTouchSlide, false);
        document.addEventListener('touchend', this.endSlide, false);
        if (this.props.onSliderDragStart) this.props.onSliderDragStart();
        killEvent(ev);
      }
    }, {
      key: "handleMouseSlide",
      value: function handleMouseSlide(ev) {
        if (this.state.slidingIndex === null) return;
        this.handleSlide(ev.clientX, ev.clientY);
        killEvent(ev);
      }
    }, {
      key: "handleTouchSlide",
      value: function handleTouchSlide(ev) {
        if (this.state.slidingIndex === null) return;
        if (ev.changedTouches.length > 1) {
          this.endSlide();
          return;
        }
        var touch = ev.changedTouches[0];
        this.handleSlide(touch.clientX, touch.clientY);
        killEvent(ev);
      }
    }, {
      key: "handleSlide",
      value: function handleSlide(x, y) {
        var _this$state3 = this.state,
          idx = _this$state3.slidingIndex,
          sliderBox = _this$state3.sliderBox;
        var positionPercent = this.props.orientation === 'vertical' ? (y - sliderBox.top) / sliderBox.height * PERCENT_FULL : (x - sliderBox.left) / sliderBox.width * PERCENT_FULL;
        this.slideTo(idx, positionPercent);
        if (this.canMove(idx, positionPercent)) {
          // update mouse positions
          this.setState({
            mousePos: {
              x: x,
              y: y
            }
          });
          if (this.props.onSliderDragMove) this.props.onSliderDragMove();
        }
      }
    }, {
      key: "endSlide",
      value: function endSlide() {
        var _this2 = this;
        var idx = this.state.slidingIndex;
        this.setState({
          slidingIndex: null
        });
        document.removeEventListener('mouseup', this.endSlide, false);
        document.removeEventListener('touchend', this.endSlide, false);
        document.removeEventListener('touchmove', this.handleTouchSlide, false);
        document.removeEventListener('mousemove', this.handleMouseSlide, false);
        if (this.props.onSliderDragEnd) this.props.onSliderDragEnd();
        if (this.props.snap) {
          var positionPercent = this.getSnapPosition(this.state.handlePos[idx]);
          this.slideTo(idx, positionPercent, function () {
            return _this2.fireChangeEvent();
          });
        } else {
          this.fireChangeEvent();
        }
      }
    }, {
      key: "handleClick",
      value: function handleClick(ev) {
        var _this3 = this;
        if (ev.target.getAttribute('data-handle-key')) {
          return;
        }

        // Calculate the position of the slider on the page so we can determine
        // the position where you click in relativity.
        var sliderBox = this.getSliderBoundingBox();
        var positionDecimal = this.props.orientation === 'vertical' ? (ev.clientY - sliderBox.top) / sliderBox.height : (ev.clientX - sliderBox.left) / sliderBox.width;
        var positionPercent = positionDecimal * PERCENT_FULL;
        var handleId = this.getClosestHandle(positionPercent);
        var validPositionPercent = this.getSnapPosition(positionPercent);

        // Move the handle there
        this.slideTo(handleId, validPositionPercent, function () {
          return _this3.fireChangeEvent();
        });
        if (this.props.onClick) this.props.onClick();
      }
    }, {
      key: "handleKeydown",
      value: function handleKeydown(ev) {
        var _this4 = this;
        var idx = getHandleFor(ev);
        if (ev.keyCode === KEYS.ESC) {
          ev.currentTarget.blur();
          return;
        }
        var proposedPercentage = this.getNextPositionForKey(idx, ev.keyCode);
        if (proposedPercentage === null) return;
        if (this.canMove(idx, proposedPercentage)) {
          this.slideTo(idx, proposedPercentage, function () {
            return _this4.fireChangeEvent();
          });
          if (this.props.onKeyPress) this.props.onKeyPress();
        }
        killEvent(ev);
      }

      // Make sure the proposed position respects the bounds and
      // does not collide with other handles too much.
    }, {
      key: "validatePosition",
      value: function validatePosition(idx, proposedPosition) {
        var _this$state4 = this.state,
          handlePos = _this$state4.handlePos,
          handleDimensions = _this$state4.handleDimensions;
        return Math.max(Math.min(proposedPosition, handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handleDimensions : PERCENT_FULL // 100% is the highest value
        ), handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handleDimensions : PERCENT_EMPTY // 0% is the lowest value
        );
      }
    }, {
      key: "validateValues",
      value: function validateValues(proposedValues, props) {
        var _ref4 = props || this.props,
          max = _ref4.max,
          min = _ref4.min;
        return proposedValues.map(function (value, idx, values) {
          var realValue = Math.max(Math.min(value, max), min);
          if (values.length && realValue < values[idx - 1]) {
            return values[idx - 1];
          }
          return realValue;
        });
      }
    }, {
      key: "canMove",
      value: function canMove(idx, proposedPosition) {
        var _this$state5 = this.state,
          handlePos = _this$state5.handlePos,
          handleDimensions = _this$state5.handleDimensions;
        if (proposedPosition < PERCENT_EMPTY) return false;
        if (proposedPosition > PERCENT_FULL) return false;
        var nextHandlePosition = handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handleDimensions : Infinity;
        if (proposedPosition > nextHandlePosition) return false;
        var prevHandlePosition = handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handleDimensions : -Infinity;
        if (proposedPosition < prevHandlePosition) return false;
        return true;
      }
    }, {
      key: "fireChangeEvent",
      value: function fireChangeEvent() {
        var onChange = this.props.onChange;
        if (onChange) onChange(this.getPublicState());
      }
    }, {
      key: "slideTo",
      value: function slideTo(idx, proposedPosition, onAfterSet) {
        var _this5 = this;
        var nextState = this.getNextState(idx, proposedPosition);
        this.setState(nextState, function () {
          var onValuesUpdated = _this5.props.onValuesUpdated;
          if (onValuesUpdated) onValuesUpdated(_this5.getPublicState());
          if (onAfterSet) onAfterSet();
        });
      }
    }, {
      key: "updateNewValues",
      value: function updateNewValues(nextProps) {
        var _this6 = this;
        var slidingIndex = this.state.slidingIndex;

        // Don't update while the slider is sliding
        if (slidingIndex !== null) {
          return;
        }
        var max = nextProps.max,
          min = nextProps.min,
          values = nextProps.values;
        var nextValues = this.validateValues(values, nextProps);
        this.setState({
          handlePos: nextValues.map(function (value) {
            return getPosition(value, min, max);
          }),
          values: nextValues
        }, function () {
          return _this6.fireChangeEvent();
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this7 = this;
        var _ref5 = this.props,
          children = _ref5.children,
          disabled = _ref5.disabled,
          Handle = _ref5.handle,
          max = _ref5.max,
          min = _ref5.min,
          orientation = _ref5.orientation,
          PitComponent = _ref5.pitComponent,
          pitPoints = _ref5.pitPoints,
          ProgressBar = _ref5.progressBar; // all required thanks to defaultProps
        var _this$state6 = this.state,
          className = _this$state6.className,
          handlePos = _this$state6.handlePos,
          values = _this$state6.values;
        return h("div", {
          className: className,
          ref: this.rheostat,
          onClick: disabled ? undefined : this.handleClick,
          style: {
            position: 'relative'
          }
        }, _ref6, handlePos.map(function (pos, idx) {
          var handleStyle = orientation === 'vertical' ? {
            top: "".concat(pos, "%"),
            position: 'absolute'
          } : {
            left: "".concat(pos, "%"),
            position: 'absolute'
          };
          return h(Handle, {
            "aria-valuemax": _this7.getMaxValue(idx),
            "aria-valuemin": _this7.getMinValue(idx),
            "aria-valuenow": values[idx],
            "aria-disabled": disabled,
            "data-handle-key": idx,
            className: "rheostat-handle",
            key: "handle-".concat(idx),
            onClick: killEvent,
            onKeyDown: disabled ? undefined : _this7.handleKeydown,
            onMouseDown: disabled ? undefined : _this7.startMouseSlide,
            onTouchStart: disabled ? undefined : _this7.startTouchSlide,
            role: "slider",
            style: handleStyle,
            tabIndex: 0
          });
        }), handlePos.map(function (_node, idx, arr) {
          if (idx === 0 && arr.length > 1) {
            return null;
          }
          return h(ProgressBar, {
            className: "rheostat-progress",
            key: "progress-bar-".concat(idx),
            style: _this7.getProgressStyle(idx)
          });
        }), PitComponent && pitPoints.map(function (n) {
          var pos = getPosition(n, min, max);
          var pitStyle = orientation === 'vertical' ? {
            top: "".concat(pos, "%"),
            position: 'absolute'
          } : {
            left: "".concat(pos, "%"),
            position: 'absolute'
          };
          return h(PitComponent, {
            key: "pit-".concat(n),
            style: pitStyle
          }, n);
        }), children);
      }
    }]);
    return Rheostat;
  }(d);
  _defineProperty(Rheostat, "defaultProps", {
    className: '',
    children: null,
    disabled: false,
    handle: Button,
    max: PERCENT_FULL,
    min: PERCENT_EMPTY,
    onClick: null,
    onChange: null,
    onKeyPress: null,
    onSliderDragEnd: null,
    onSliderDragMove: null,
    onSliderDragStart: null,
    onValuesUpdated: null,
    orientation: 'horizontal',
    pitComponent: null,
    pitPoints: [],
    progressBar: 'div',
    snap: false,
    snapPoints: [],
    values: [PERCENT_EMPTY]
  });

  var Slider = /*#__PURE__*/function (_Component) {
    _inherits(Slider, _Component);
    var _super = _createSuper(Slider);
    function Slider() {
      var _this;
      _classCallCheck(this, Slider);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty(_assertThisInitialized(_this), "handleChange", function (_ref) {
        var values = _ref.values;
        if (!_this.isDisabled) {
          _this.props.refine(values);
        }
      });
      _defineProperty(_assertThisInitialized(_this), "createHandleComponent", function (tooltips) {
        return function (props) {
          // display only two decimals after comma,
          // and apply `tooltips.format()` if any
          var roundedValue = Math.round(
          // have to cast as a string, as the value given to the prop is a number, but becomes a string when read
          parseFloat(props['aria-valuenow']) * 100) / 100;
          var value = _typeof(tooltips) === 'object' && tooltips.format ? tooltips.format(roundedValue) : roundedValue;
          var className = cx(props.className, props['data-handle-key'] === 0 && 'rheostat-handle-lower', props['data-handle-key'] === 1 && 'rheostat-handle-upper');
          return h("div", _extends({}, props, {
            className: className
          }), tooltips && h("div", {
            className: "rheostat-tooltip"
          }, value));
        };
      });
      return _this;
    }
    _createClass(Slider, [{
      key: "isDisabled",
      get: function get() {
        return this.props.min >= this.props.max;
      }
    }, {
      key: "computeDefaultPitPoints",
      value:
      // creates an array number where to display a pit point on the slider
      function computeDefaultPitPoints(_ref2) {
        var min = _ref2.min,
          max = _ref2.max;
        var totalLength = max - min;
        var steps = 34;
        var stepsLength = totalLength / steps;
        var pitPoints = [min].concat(_toConsumableArray(range({
          end: steps - 1
        }).map(function (step) {
          return min + stepsLength * (step + 1);
        })), [max]);
        return pitPoints;
      }

      // creates an array of values where the slider should snap to
    }, {
      key: "computeSnapPoints",
      value: function computeSnapPoints(_ref3) {
        var min = _ref3.min,
          max = _ref3.max,
          step = _ref3.step;
        if (!step) return undefined;
        return [].concat(_toConsumableArray(range({
          start: min,
          end: max,
          step: step
        })), [max]);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
          tooltips = _this$props.tooltips,
          step = _this$props.step,
          pips = _this$props.pips,
          values = _this$props.values,
          cssClasses = _this$props.cssClasses;

        // @TODO: figure out why this.props needs to be non-null asserted
        var _ref4 = this.isDisabled ? {
            min: this.props.min,
            max: this.props.max + 0.001
          } : this.props,
          min = _ref4.min,
          max = _ref4.max;
        var snapPoints = this.computeSnapPoints({
          min: min,
          max: max,
          step: step
        });
        var pitPoints = pips === false ? [] : this.computeDefaultPitPoints({
          min: min,
          max: max
        });
        return h("div", {
          className: cx(cssClasses.root, this.isDisabled && cssClasses.disabledRoot)
        }, h(Rheostat, {
          handle: this.createHandleComponent(tooltips),
          onChange: this.handleChange,
          min: min,
          max: max,
          pitComponent: Pit,
          pitPoints: pitPoints,
          snap: true,
          snapPoints: snapPoints,
          values: this.isDisabled ? [min, max] : values,
          disabled: this.isDisabled
        }));
      }
    }]);
    return Slider;
  }(d);

  var withUsage$M = createDocumentationMessageGenerator({
    name: 'range-slider'
  });
  var suit$m = component('RangeSlider');
  var renderer$h = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      pips = _ref.pips,
      step = _ref.step,
      tooltips = _ref.tooltips;
    return function (_ref2, isFirstRendering) {
      var refine = _ref2.refine,
        range = _ref2.range,
        start = _ref2.start;
      if (isFirstRendering) {
        // There's no information at this point, let's render nothing.
        return;
      }
      var minRange = range.min,
        maxRange = range.max;
      var _start = _slicedToArray(start, 2),
        minStart = _start[0],
        maxStart = _start[1];
      var minFinite = minStart === -Infinity ? minRange : minStart;
      var maxFinite = maxStart === Infinity ? maxRange : maxStart;

      // Clamp values to the range for avoid extra rendering & refinement
      // Should probably be done on the connector side, but we need to stay
      // backward compatible so we still need to pass [-Infinity, Infinity]
      var values = [minFinite > maxRange ? maxRange : minFinite, maxFinite < minRange ? minRange : maxFinite];
      P(h(Slider, {
        cssClasses: cssClasses,
        refine: refine,
        min: minRange,
        max: maxRange,
        values: values,
        tooltips: tooltips,
        step: step,
        pips: pips
      }), containerNode);
    };
  };
  /**
   * The range slider is a widget which provides a user-friendly way to filter the
   * results based on a single numeric range.
   *
   * @requirements
   * The attribute passed to `attribute` must be declared as an
   * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
   * in your Algolia settings.
   *
   * The values inside this attribute must be JavaScript numbers (not strings).
   */
  var rangeSlider = function rangeSlider(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      min = _ref3.min,
      max = _ref3.max,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      step = _ref3.step,
      _ref3$pips = _ref3.pips,
      pips = _ref3$pips === void 0 ? true : _ref3$pips,
      _ref3$precision = _ref3.precision,
      precision = _ref3$precision === void 0 ? 0 : _ref3$precision,
      _ref3$tooltips = _ref3.tooltips,
      tooltips = _ref3$tooltips === void 0 ? true : _ref3$tooltips;
    if (!container) {
      throw new Error(withUsage$M('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$m(), userCssClasses.root),
      disabledRoot: cx(suit$m({
        modifierName: 'disabled'
      }), userCssClasses.disabledRoot)
    };
    var specializedRenderer = renderer$h({
      containerNode: containerNode,
      step: step,
      pips: pips,
      tooltips: tooltips,
      cssClasses: cssClasses
    });
    var makeWidget = connectRange(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attribute: attribute,
      min: min,
      max: max,
      precision: precision
    })), {}, {
      $$type: 'ais.rangeSlider',
      $$widgetType: 'ais.rangeSlider'
    });
  };

  function ItemWrapper(_ref) {
    var children = _ref.children,
      count = _ref.count,
      value = _ref.value,
      url = _ref.url,
      cssClasses = _ref.cssClasses;
    if (count) {
      return h("a", {
        className: cx(cssClasses.link),
        "aria-label": "".concat(value, " & up"),
        href: url
      }, children);
    }
    return h("div", {
      className: cx(cssClasses.link),
      "aria-label": "".concat(value, " & up"),
      disabled: true
    }, children);
  }
  var defaultTemplates$d = {
    item: function item(_ref2) {
      var count = _ref2.count,
        value = _ref2.value,
        url = _ref2.url,
        stars = _ref2.stars,
        cssClasses = _ref2.cssClasses;
      return h(ItemWrapper, {
        count: count,
        value: value,
        url: url,
        cssClasses: cssClasses
      }, stars.map(function (isFull, index) {
        return h("svg", {
          key: index,
          className: cx(cssClasses.starIcon, isFull ? cssClasses.fullStarIcon : cssClasses.emptyStarIcon),
          "aria-hidden": "true",
          width: "24",
          height: "24"
        }, h("use", {
          xlinkHref: isFull ? '#ais-RatingMenu-starSymbol' : '#ais-RatingMenu-starEmptySymbol'
        }));
      }), h("span", {
        className: cx(cssClasses.label)
      }, "& Up"), count && h("span", {
        className: cx(cssClasses.count)
      }, formatNumber(count)));
    }
  };

  var withUsage$N = createDocumentationMessageGenerator({
    name: 'rating-menu'
  });
  var suit$n = component('RatingMenu');
  var _ref3 = h("path", {
    d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
  });
  var _ref4 = h("path", {
    d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"
  });
  var renderer$i = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      renderState = _ref.renderState;
    return function (_ref2, isFirstRendering) {
      var refine = _ref2.refine,
        items = _ref2.items,
        createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$d,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(RefinementList$1, {
        createURL: createURL,
        cssClasses: cssClasses,
        facetValues: items,
        templateProps: renderState.templateProps,
        toggleRefinement: refine
      }, h("svg", {
        style: "display:none;"
      }, h("symbol", {
        id: suit$n({
          descendantName: 'starSymbol'
        }),
        viewBox: "0 0 24 24"
      }, _ref3), h("symbol", {
        id: suit$n({
          descendantName: 'starEmptySymbol'
        }),
        viewBox: "0 0 24 24"
      }, _ref4))), containerNode);
    };
  };

  /**
   * Rating menu is used for displaying grade like filters. The values are normalized within boundaries.
   *
   * The maximum value can be set (with `max`), the minimum is always 0.
   *
   * @requirements
   * The attribute passed to `attribute` must be declared as an
   * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
   * in your Algolia settings.
   *
   * The values inside this attribute must be JavaScript numbers (not strings).
   *
   * @type {WidgetFactory}
   * @devNovel RatingMenu
   * @category filter
   * @param {RatingMenuWidgetParams} widgetParams RatingMenu widget options.
   * @return {Widget} A new RatingMenu widget instance.
   * @example
   * search.addWidgets([
   *   instantsearch.widgets.ratingMenu({
   *     container: '#stars',
   *     attribute: 'rating',
   *     max: 5,
   *   })
   * ]);
   */

  var ratingMenu = function ratingMenu(widgetParams) {
    var _ref5 = widgetParams || {},
      container = _ref5.container,
      attribute = _ref5.attribute,
      _ref5$max = _ref5.max,
      max = _ref5$max === void 0 ? 5 : _ref5$max,
      _ref5$cssClasses = _ref5.cssClasses,
      userCssClasses = _ref5$cssClasses === void 0 ? {} : _ref5$cssClasses,
      _ref5$templates = _ref5.templates,
      templates = _ref5$templates === void 0 ? {} : _ref5$templates;
    if (!container) {
      throw new Error(withUsage$N('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$n(), userCssClasses.root),
      noRefinementRoot: cx(suit$n({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      list: cx(suit$n({
        descendantName: 'list'
      }), userCssClasses.list),
      item: cx(suit$n({
        descendantName: 'item'
      }), userCssClasses.item),
      selectedItem: cx(suit$n({
        descendantName: 'item',
        modifierName: 'selected'
      }), userCssClasses.selectedItem),
      disabledItem: cx(suit$n({
        descendantName: 'item',
        modifierName: 'disabled'
      }), userCssClasses.disabledItem),
      link: cx(suit$n({
        descendantName: 'link'
      }), userCssClasses.link),
      starIcon: cx(suit$n({
        descendantName: 'starIcon'
      }), userCssClasses.starIcon),
      fullStarIcon: cx(suit$n({
        descendantName: 'starIcon',
        modifierName: 'full'
      }), userCssClasses.fullStarIcon),
      emptyStarIcon: cx(suit$n({
        descendantName: 'starIcon',
        modifierName: 'empty'
      }), userCssClasses.emptyStarIcon),
      label: cx(suit$n({
        descendantName: 'label'
      }), userCssClasses.label),
      count: cx(suit$n({
        descendantName: 'count'
      }), userCssClasses.count)
    };
    var specializedRenderer = renderer$i({
      containerNode: containerNode,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates
    });
    var makeWidget = connectRatingMenu(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attribute: attribute,
      max: max
    })), {}, {
      $$widgetType: 'ais.ratingMenu'
    });
  };

  var _ref2 = h("path", {
    d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
  });
  var _ref4$1 = h("path", {
    d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
  });
  var _ref6$1 = h("g", {
    fill: "none",
    fillRule: "evenodd"
  }, h("g", {
    transform: "translate(1 1)",
    strokeWidth: "2"
  }, h("circle", {
    strokeOpacity: ".5",
    cx: "18",
    cy: "18",
    r: "18"
  }), h("path", {
    d: "M36 18c0-9.94-8.06-18-18-18"
  }, h("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    from: "0 18 18",
    to: "360 18 18",
    dur: "1s",
    repeatCount: "indefinite"
  }))));
  var defaultTemplate = {
    reset: function reset(_ref) {
      var cssClasses = _ref.cssClasses;
      return h("svg", {
        className: cssClasses.resetIcon,
        viewBox: "0 0 20 20",
        width: "10",
        height: "10",
        "aria-hidden": "true"
      }, _ref2);
    },
    submit: function submit(_ref3) {
      var cssClasses = _ref3.cssClasses;
      return h("svg", {
        className: cssClasses.submitIcon,
        width: "10",
        height: "10",
        viewBox: "0 0 40 40",
        "aria-hidden": "true"
      }, _ref4$1);
    },
    loadingIndicator: function loadingIndicator(_ref5) {
      var cssClasses = _ref5.cssClasses;
      return h("svg", {
        className: cssClasses.loadingIcon,
        width: "16",
        height: "16",
        viewBox: "0 0 38 38",
        stroke: "#444",
        "aria-hidden": "true"
      }, _ref6$1);
    }
  };

  var defaultTemplates$e = {
    item: function item(_ref) {
      var cssClasses = _ref.cssClasses,
        count = _ref.count,
        value = _ref.value,
        highlighted = _ref.highlighted,
        isRefined = _ref.isRefined,
        isFromSearch = _ref.isFromSearch;
      return h("label", {
        className: cx(cssClasses.label)
      }, h("input", {
        type: "checkbox",
        className: cx(cssClasses.checkbox),
        value: value,
        defaultChecked: isRefined
      }), h("span", {
        className: cx(cssClasses.labelText),
        dangerouslySetInnerHTML: isFromSearch ? {
          __html: highlighted
        } : undefined
      }, !isFromSearch && highlighted), h("span", {
        className: cx(cssClasses.count)
      }, formatNumber(count)));
    },
    showMoreText: function showMoreText(_ref2) {
      var isShowingMore = _ref2.isShowingMore;
      return isShowingMore ? 'Show less' : 'Show more';
    },
    searchableNoResults: function searchableNoResults() {
      return 'No results';
    }
  };

  var withUsage$O = createDocumentationMessageGenerator({
    name: 'refinement-list'
  });
  var suit$o = component('RefinementList');
  var searchBoxSuit = component('SearchBox');
  var renderer$j = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      searchBoxTemplates = _ref.searchBoxTemplates,
      renderState = _ref.renderState,
      showMore = _ref.showMore,
      searchable = _ref.searchable,
      searchablePlaceholder = _ref.searchablePlaceholder,
      searchableIsAlwaysActive = _ref.searchableIsAlwaysActive;
    return function (_ref2, isFirstRendering) {
      var refine = _ref2.refine,
        items = _ref2.items,
        createURL = _ref2.createURL,
        searchForItems = _ref2.searchForItems,
        isFromSearch = _ref2.isFromSearch,
        instantSearchInstance = _ref2.instantSearchInstance,
        toggleShowMore = _ref2.toggleShowMore,
        isShowingMore = _ref2.isShowingMore,
        hasExhaustiveItems = _ref2.hasExhaustiveItems,
        canToggleShowMore = _ref2.canToggleShowMore;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$e,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        renderState.searchBoxTemplateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplate,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: searchBoxTemplates
        });
        return;
      }
      P(h(RefinementList$1, {
        createURL: createURL,
        cssClasses: cssClasses,
        facetValues: items,
        templateProps: renderState.templateProps,
        searchBoxTemplateProps: renderState.searchBoxTemplateProps,
        toggleRefinement: refine,
        searchFacetValues: searchable ? searchForItems : undefined,
        searchPlaceholder: searchablePlaceholder,
        searchIsAlwaysActive: searchableIsAlwaysActive,
        isFromSearch: isFromSearch,
        showMore: showMore && !isFromSearch && items.length > 0,
        toggleShowMore: toggleShowMore,
        isShowingMore: isShowingMore,
        hasExhaustiveItems: hasExhaustiveItems,
        canToggleShowMore: canToggleShowMore
      }), containerNode);
    };
  };
  /**
   * The refinement list widget is one of the most common widget that you can find
   * in a search UI. With this widget, the user can filter the dataset based on facets.
   *
   * The refinement list displays only the most relevant facets for the current search
   * context. The sort option only affects the facet that are returned by the engine,
   * not which facets are returned.
   *
   * This widget also implements search for facet values, which is a mini search inside the
   * values of the facets. This makes easy to deal with uncommon facet values.
   *
   * @requirements
   *
   * The attribute passed to `attribute` must be declared as an
   * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
   * in your Algolia settings.
   *
   * If you also want to use search for facet values on this attribute, you need to make it searchable using the [dashboard](https://www.algolia.com/explorer/display/) or using the [API](https://www.algolia.com/doc/guides/searching/faceting/#search-for-facet-values).
   */
  var refinementList = function refinementList(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      operator = _ref3.operator,
      sortBy = _ref3.sortBy,
      limit = _ref3.limit,
      showMore = _ref3.showMore,
      showMoreLimit = _ref3.showMoreLimit,
      _ref3$searchable = _ref3.searchable,
      searchable = _ref3$searchable === void 0 ? false : _ref3$searchable,
      _ref3$searchablePlace = _ref3.searchablePlaceholder,
      searchablePlaceholder = _ref3$searchablePlace === void 0 ? 'Search...' : _ref3$searchablePlace,
      _ref3$searchableEscap = _ref3.searchableEscapeFacetValues,
      searchableEscapeFacetValues = _ref3$searchableEscap === void 0 ? true : _ref3$searchableEscap,
      _ref3$searchableIsAlw = _ref3.searchableIsAlwaysActive,
      searchableIsAlwaysActive = _ref3$searchableIsAlw === void 0 ? true : _ref3$searchableIsAlw,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      transformItems = _ref3.transformItems;
    if (!container) {
      throw new Error(withUsage$O('The `container` option is required.'));
    }
    var escapeFacetValues = searchable ? Boolean(searchableEscapeFacetValues) : false;
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$o(), userCssClasses.root),
      noRefinementRoot: cx(suit$o({
        modifierName: 'noRefinement'
      }), userCssClasses.noRefinementRoot),
      list: cx(suit$o({
        descendantName: 'list'
      }), userCssClasses.list),
      item: cx(suit$o({
        descendantName: 'item'
      }), userCssClasses.item),
      selectedItem: cx(suit$o({
        descendantName: 'item',
        modifierName: 'selected'
      }), userCssClasses.selectedItem),
      searchBox: cx(suit$o({
        descendantName: 'searchBox'
      }), userCssClasses.searchBox),
      label: cx(suit$o({
        descendantName: 'label'
      }), userCssClasses.label),
      checkbox: cx(suit$o({
        descendantName: 'checkbox'
      }), userCssClasses.checkbox),
      labelText: cx(suit$o({
        descendantName: 'labelText'
      }), userCssClasses.labelText),
      count: cx(suit$o({
        descendantName: 'count'
      }), userCssClasses.count),
      noResults: cx(suit$o({
        descendantName: 'noResults'
      }), userCssClasses.noResults),
      showMore: cx(suit$o({
        descendantName: 'showMore'
      }), userCssClasses.showMore),
      disabledShowMore: cx(suit$o({
        descendantName: 'showMore',
        modifierName: 'disabled'
      }), userCssClasses.disabledShowMore),
      searchable: {
        root: cx(searchBoxSuit(), userCssClasses.searchableRoot),
        form: cx(searchBoxSuit({
          descendantName: 'form'
        }), userCssClasses.searchableForm),
        input: cx(searchBoxSuit({
          descendantName: 'input'
        }), userCssClasses.searchableInput),
        submit: cx(searchBoxSuit({
          descendantName: 'submit'
        }), userCssClasses.searchableSubmit),
        submitIcon: cx(searchBoxSuit({
          descendantName: 'submitIcon'
        }), userCssClasses.searchableSubmitIcon),
        reset: cx(searchBoxSuit({
          descendantName: 'reset'
        }), userCssClasses.searchableReset),
        resetIcon: cx(searchBoxSuit({
          descendantName: 'resetIcon'
        }), userCssClasses.searchableResetIcon),
        loadingIndicator: cx(searchBoxSuit({
          descendantName: 'loadingIndicator'
        }), userCssClasses.searchableLoadingIndicator),
        loadingIcon: cx(searchBoxSuit({
          descendantName: 'loadingIcon'
        }), userCssClasses.searchableLoadingIcon)
      }
    };
    var specializedRenderer = renderer$j({
      containerNode: containerNode,
      cssClasses: cssClasses,
      templates: templates,
      searchBoxTemplates: {
        submit: templates.searchableSubmit,
        reset: templates.searchableReset,
        loadingIndicator: templates.searchableLoadingIndicator
      },
      renderState: {},
      searchable: searchable,
      searchablePlaceholder: searchablePlaceholder,
      searchableIsAlwaysActive: searchableIsAlwaysActive,
      showMore: showMore
    });
    var makeWidget = connectRefinementList(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attribute: attribute,
      operator: operator,
      limit: limit,
      showMore: showMore,
      showMoreLimit: showMoreLimit,
      sortBy: sortBy,
      escapeFacetValues: escapeFacetValues,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.refinementList'
    });
  };

  var RelevantSort = function RelevantSort(_ref) {
    var cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      isRelevantSorted = _ref.isRelevantSorted,
      isVirtualReplica = _ref.isVirtualReplica,
      refine = _ref.refine;
    return isVirtualReplica ? h("div", {
      className: cssClasses.root
    }, h(Template, {
      templateKey: "text",
      templates: templates,
      rootProps: {
        className: cssClasses.text
      },
      data: {
        isRelevantSorted: isRelevantSorted
      }
    }), h("button", {
      type: "button",
      className: cssClasses.button,
      onClick: function onClick() {
        if (isRelevantSorted) {
          refine(0);
        } else {
          refine(undefined);
        }
      }
    }, h(Template, {
      rootTagName: "span",
      templateKey: "button",
      templates: templates,
      data: {
        isRelevantSorted: isRelevantSorted
      }
    }))) : null;
  };

  var defaultTemplates$f = {
    text: function text() {
      return '';
    },
    button: function button(_ref) {
      var isRelevantSorted = _ref.isRelevantSorted;
      return isRelevantSorted ? 'See all results' : 'See relevant results';
    }
  };

  var withUsage$P = createDocumentationMessageGenerator({
    name: 'relevant-sort'
  });
  var suit$p = component('RelevantSort');
  var renderer$k = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates;
    return function (_ref2) {
      var isRelevantSorted = _ref2.isRelevantSorted,
        isVirtualReplica = _ref2.isVirtualReplica,
        refine = _ref2.refine;
      P(h(RelevantSort, {
        cssClasses: cssClasses,
        templates: templates,
        isRelevantSorted: isRelevantSorted,
        isVirtualReplica: isVirtualReplica,
        refine: refine
      }), containerNode);
    };
  };
  var relevantSort = function relevantSort(widgetParams) {
    var container = widgetParams.container,
      _widgetParams$templat = widgetParams.templates,
      userTemplates = _widgetParams$templat === void 0 ? {} : _widgetParams$templat,
      _widgetParams$cssClas = widgetParams.cssClasses,
      userCssClasses = _widgetParams$cssClas === void 0 ? {} : _widgetParams$cssClas;
    if (!container) {
      throw new Error(withUsage$P('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$p(), userCssClasses.root),
      text: cx(suit$p({
        descendantName: 'text'
      }), userCssClasses.text),
      button: cx(suit$p({
        descendantName: 'button'
      }), userCssClasses.button)
    };
    var templates = _objectSpread2(_objectSpread2({}, defaultTemplates$f), userTemplates);
    var specializedRenderer = renderer$k({
      containerNode: containerNode,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates
    });
    var makeWidget = connectRelevantSort(specializedRenderer, function () {
      P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({})), {}, {
      $$widgetType: 'ais.relevantSort'
    });
  };

  var withUsage$Q = createDocumentationMessageGenerator({
    name: 'search-box'
  });
  var suit$q = component('SearchBox');
  var renderer$l = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      placeholder = _ref.placeholder,
      templates = _ref.templates,
      autofocus = _ref.autofocus,
      searchAsYouType = _ref.searchAsYouType,
      showReset = _ref.showReset,
      showSubmit = _ref.showSubmit,
      showLoadingIndicator = _ref.showLoadingIndicator;
    return function (_ref2) {
      var refine = _ref2.refine,
        query = _ref2.query,
        isSearchStalled = _ref2.isSearchStalled;
      P(h(SearchBox, {
        query: query,
        placeholder: placeholder,
        autofocus: autofocus,
        refine: refine,
        searchAsYouType: searchAsYouType,
        templates: templates,
        showSubmit: showSubmit,
        showReset: showReset,
        showLoadingIndicator: showLoadingIndicator,
        isSearchStalled: isSearchStalled,
        cssClasses: cssClasses
      }), containerNode);
    };
  };

  /**
   * The searchbox widget is used to let the user set a text based query.
   *
   * This is usually the  main entry point to start the search in an instantsearch context. For that
   * reason is usually placed on top, and not hidden so that the user can start searching right
   * away.
   *
   */

  var searchBox = function searchBox(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$placeholder = _ref3.placeholder,
      placeholder = _ref3$placeholder === void 0 ? '' : _ref3$placeholder,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$autofocus = _ref3.autofocus,
      autofocus = _ref3$autofocus === void 0 ? false : _ref3$autofocus,
      _ref3$searchAsYouType = _ref3.searchAsYouType,
      searchAsYouType = _ref3$searchAsYouType === void 0 ? true : _ref3$searchAsYouType,
      _ref3$showReset = _ref3.showReset,
      showReset = _ref3$showReset === void 0 ? true : _ref3$showReset,
      _ref3$showSubmit = _ref3.showSubmit,
      showSubmit = _ref3$showSubmit === void 0 ? true : _ref3$showSubmit,
      _ref3$showLoadingIndi = _ref3.showLoadingIndicator,
      showLoadingIndicator = _ref3$showLoadingIndi === void 0 ? true : _ref3$showLoadingIndi,
      queryHook = _ref3.queryHook,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? {} : _ref3$templates;
    if (!container) {
      throw new Error(withUsage$Q('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$q(), userCssClasses.root),
      form: cx(suit$q({
        descendantName: 'form'
      }), userCssClasses.form),
      input: cx(suit$q({
        descendantName: 'input'
      }), userCssClasses.input),
      submit: cx(suit$q({
        descendantName: 'submit'
      }), userCssClasses.submit),
      submitIcon: cx(suit$q({
        descendantName: 'submitIcon'
      }), userCssClasses.submitIcon),
      reset: cx(suit$q({
        descendantName: 'reset'
      }), userCssClasses.reset),
      resetIcon: cx(suit$q({
        descendantName: 'resetIcon'
      }), userCssClasses.resetIcon),
      loadingIndicator: cx(suit$q({
        descendantName: 'loadingIndicator'
      }), userCssClasses.loadingIndicator),
      loadingIcon: cx(suit$q({
        descendantName: 'loadingIcon'
      }), userCssClasses.loadingIcon)
    };
    var templates = _objectSpread2(_objectSpread2({}, defaultTemplate), userTemplates);
    var specializedRenderer = renderer$l({
      containerNode: containerNode,
      cssClasses: cssClasses,
      placeholder: placeholder,
      templates: templates,
      autofocus: autofocus,
      searchAsYouType: searchAsYouType,
      showReset: showReset,
      showSubmit: showSubmit,
      showLoadingIndicator: showLoadingIndicator
    });
    var makeWidget = connectSearchBox(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      queryHook: queryHook
    })), {}, {
      $$widgetType: 'ais.searchBox'
    });
  };

  var withUsage$R = createDocumentationMessageGenerator({
    name: 'sort-by'
  });
  var suit$r = component('SortBy');
  var renderer$m = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
    return function (_ref2, isFirstRendering) {
      var currentRefinement = _ref2.currentRefinement,
        options = _ref2.options,
        refine = _ref2.refine;
      if (isFirstRendering) {
        return;
      }
      P(h("div", {
        className: cssClasses.root
      }, h(Selector, {
        cssClasses: cssClasses,
        currentValue: currentRefinement,
        options: options,
        setValue: refine
      })), containerNode);
    };
  };

  /**
   * Sort by selector is a widget used for letting the user choose between different
   * indices that contains the same data with a different order / ranking formula.
   */
  var sortBy = function sortBy(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      items = _ref3.items,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      transformItems = _ref3.transformItems;
    if (!container) {
      throw new Error(withUsage$R('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$r(), userCssClasses.root),
      select: cx(suit$r({
        descendantName: 'select'
      }), userCssClasses.select),
      option: cx(suit$r({
        descendantName: 'option'
      }), userCssClasses.option)
    };
    var specializedRenderer = renderer$m({
      containerNode: containerNode,
      cssClasses: cssClasses
    });
    var makeWidget = connectSortBy(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      container: containerNode,
      items: items,
      transformItems: transformItems
    })), {}, {
      $$widgetType: 'ais.sortBy'
    });
  };

  var _excluded$m = ["nbHits", "nbSortedHits", "cssClasses", "templateProps"];
  var Stats = function Stats(_ref) {
    var nbHits = _ref.nbHits,
      nbSortedHits = _ref.nbSortedHits,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps,
      rest = _objectWithoutProperties(_ref, _excluded$m);
    return h("div", {
      className: cx(cssClasses.root)
    }, h(Template, _extends({}, templateProps, {
      templateKey: "text",
      rootTagName: "span",
      rootProps: {
        className: cssClasses.text
      },
      data: _objectSpread2({
        hasManySortedResults: nbSortedHits && nbSortedHits > 1,
        hasNoSortedResults: nbSortedHits === 0,
        hasOneSortedResults: nbSortedHits === 1,
        hasManyResults: nbHits > 1,
        hasNoResults: nbHits === 0,
        hasOneResult: nbHits === 1,
        nbHits: nbHits,
        nbSortedHits: nbSortedHits,
        cssClasses: cssClasses
      }, rest)
    })));
  };

  var withUsage$S = createDocumentationMessageGenerator({
    name: 'stats'
  });
  var suit$s = component('Stats');
  var defaultTemplates$g = {
    text: function text(props) {
      return "".concat(props.areHitsSorted ? getSortedResultsSentence(props) : getResultsSentence(props), " found in ").concat(props.processingTimeMS, "ms");
    }
  };
  function getSortedResultsSentence(_ref) {
    var nbHits = _ref.nbHits,
      hasNoSortedResults = _ref.hasNoSortedResults,
      hasOneSortedResults = _ref.hasOneSortedResults,
      hasManySortedResults = _ref.hasManySortedResults,
      nbSortedHits = _ref.nbSortedHits;
    var suffix = "sorted out of ".concat(formatNumber(nbHits));
    if (hasNoSortedResults) {
      return "No relevant results ".concat(suffix);
    }
    if (hasOneSortedResults) {
      return "1 relevant result ".concat(suffix);
    }
    if (hasManySortedResults) {
      return "".concat(formatNumber(nbSortedHits || 0), " relevant results ").concat(suffix);
    }
    return '';
  }
  function getResultsSentence(_ref2) {
    var nbHits = _ref2.nbHits,
      hasNoResults = _ref2.hasNoResults,
      hasOneResult = _ref2.hasOneResult,
      hasManyResults = _ref2.hasManyResults;
    if (hasNoResults) {
      return 'No results';
    }
    if (hasOneResult) {
      return '1 result';
    }
    if (hasManyResults) {
      return "".concat(formatNumber(nbHits), " results");
    }
    return '';
  }
  var renderer$n = function renderer(_ref3) {
    var renderState = _ref3.renderState,
      cssClasses = _ref3.cssClasses,
      containerNode = _ref3.containerNode,
      templates = _ref3.templates;
    return function (_ref4, isFirstRendering) {
      var hitsPerPage = _ref4.hitsPerPage,
        nbHits = _ref4.nbHits,
        nbSortedHits = _ref4.nbSortedHits,
        areHitsSorted = _ref4.areHitsSorted,
        nbPages = _ref4.nbPages,
        page = _ref4.page,
        processingTimeMS = _ref4.processingTimeMS,
        query = _ref4.query,
        instantSearchInstance = _ref4.instantSearchInstance;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$g,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(Stats, {
        cssClasses: cssClasses,
        hitsPerPage: hitsPerPage,
        nbHits: nbHits,
        nbSortedHits: nbSortedHits,
        areHitsSorted: areHitsSorted,
        nbPages: nbPages,
        page: page,
        processingTimeMS: processingTimeMS,
        query: query,
        templateProps: renderState.templateProps
      }), containerNode);
    };
  };

  /**
   * The `stats` widget is used to display useful insights about the current results.
   *
   * By default, it will display the **number of hits** and the time taken to compute the
   * results inside the engine.
   */
  var stats = function stats(widgetParams) {
    var _ref5 = widgetParams || {},
      container = _ref5.container,
      _ref5$cssClasses = _ref5.cssClasses,
      userCssClasses = _ref5$cssClasses === void 0 ? {} : _ref5$cssClasses,
      _ref5$templates = _ref5.templates,
      templates = _ref5$templates === void 0 ? {} : _ref5$templates;
    if (!container) {
      throw new Error(withUsage$S('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$s(), userCssClasses.root),
      text: cx(suit$s({
        descendantName: 'text'
      }), userCssClasses.text)
    };
    var specializedRenderer = renderer$n({
      containerNode: containerNode,
      cssClasses: cssClasses,
      templates: templates,
      renderState: {}
    });
    var makeWidget = connectStats(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({})), {}, {
      $$widgetType: 'ais.stats'
    });
  };

  var ToggleRefinement = function ToggleRefinement(_ref) {
    var currentRefinement = _ref.currentRefinement,
      refine = _ref.refine,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
    return h("div", {
      className: cssClasses.root
    }, h("label", {
      className: cssClasses.label
    }, h("input", {
      className: cssClasses.checkbox,
      type: "checkbox",
      checked: currentRefinement.isRefined,
      onChange: function onChange(event) {
        return refine({
          isRefined: !event.target.checked
        });
      }
    }), h(Template, _extends({}, templateProps, {
      rootTagName: "span",
      rootProps: {
        className: cssClasses.labelText
      },
      templateKey: "labelText",
      data: currentRefinement
    }))));
  };

  var defaultTemplates$h = {
    labelText: function labelText(_ref) {
      var name = _ref.name;
      return name;
    }
  };

  var withUsage$T = createDocumentationMessageGenerator({
    name: 'toggle-refinement'
  });
  var suit$t = component('ToggleRefinement');
  var renderer$o = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
    return function (_ref2, isFirstRendering) {
      var value = _ref2.value,
        refine = _ref2.refine,
        instantSearchInstance = _ref2.instantSearchInstance;
      if (isFirstRendering) {
        renderState.templateProps = prepareTemplateProps({
          defaultTemplates: defaultTemplates$h,
          templatesConfig: instantSearchInstance.templatesConfig,
          templates: templates
        });
        return;
      }
      P(h(ToggleRefinement, {
        cssClasses: cssClasses,
        currentRefinement: value,
        templateProps: renderState.templateProps,
        refine: refine
      }), containerNode);
    };
  };
  /**
   * The toggleRefinement widget lets the user either:
   *  - switch between two values for a single facetted attribute (free_shipping / not_free_shipping)
   *  - toggleRefinement a faceted value on and off (only 'canon' for brands)
   *
   * This widget is particularly useful if you have a boolean value in the records.
   *
   * @requirements
   * The attribute passed to `attribute` must be declared as an
   * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
   * in your Algolia settings.
   */
  var toggleRefinement = function toggleRefinement(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$on = _ref3.on,
      on = _ref3$on === void 0 ? true : _ref3$on,
      off = _ref3.off;
    if (!container) {
      throw new Error(withUsage$T('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$t(), userCssClasses.root),
      label: cx(suit$t({
        descendantName: 'label'
      }), userCssClasses.label),
      checkbox: cx(suit$t({
        descendantName: 'checkbox'
      }), userCssClasses.checkbox),
      labelText: cx(suit$t({
        descendantName: 'labelText'
      }), userCssClasses.labelText)
    };
    var specializedRenderer = renderer$o({
      containerNode: containerNode,
      cssClasses: cssClasses,
      renderState: {},
      templates: templates
    });
    var makeWidget = connectToggleRefinement(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      attribute: attribute,
      on: on,
      off: off
    })), {}, {
      $$widgetType: 'ais.toggleRefinement'
    });
  };

  var VoiceSearch = function VoiceSearch(_ref) {
    var cssClasses = _ref.cssClasses,
      isBrowserSupported = _ref.isBrowserSupported,
      isListening = _ref.isListening,
      toggleListening = _ref.toggleListening,
      voiceListeningState = _ref.voiceListeningState,
      templates = _ref.templates;
    var handleClick = function handleClick(event) {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      toggleListening();
    };
    var status = voiceListeningState.status,
      transcript = voiceListeningState.transcript,
      isSpeechFinal = voiceListeningState.isSpeechFinal,
      errorCode = voiceListeningState.errorCode;
    return h("div", {
      className: cssClasses.root
    }, h(Template, {
      templateKey: "buttonText",
      rootTagName: "button",
      rootProps: {
        className: cssClasses.button,
        type: 'button',
        title: "Search by voice".concat(isBrowserSupported ? '' : ' (not supported on this browser)'),
        onClick: handleClick,
        disabled: !isBrowserSupported
      },
      data: {
        status: status,
        errorCode: errorCode,
        isListening: isListening,
        transcript: transcript,
        isSpeechFinal: isSpeechFinal,
        isBrowserSupported: isBrowserSupported
      },
      templates: templates
    }), h(Template, {
      templateKey: "status",
      rootProps: {
        className: cssClasses.status
      },
      data: {
        status: status,
        errorCode: errorCode,
        isListening: isListening,
        transcript: transcript,
        isSpeechFinal: isSpeechFinal,
        isBrowserSupported: isBrowserSupported
      },
      templates: templates
    }));
  };

  var _ref2$1 = h(p, null, h("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }), h("path", {
    d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"
  }), h("path", {
    d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"
  }), h("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "23"
  }), h("line", {
    x1: "8",
    y1: "23",
    x2: "16",
    y2: "23"
  }));
  var _ref3$1 = h("path", {
    d: "M19 10v2a7 7 0 0 1-14 0v-2"
  });
  var _ref4$2 = h("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "23"
  });
  var _ref5 = h("line", {
    x1: "8",
    y1: "23",
    x2: "16",
    y2: "23"
  });
  var ButtonInnerElement = function ButtonInnerElement(_ref) {
    var status = _ref.status,
      errorCode = _ref.errorCode,
      isListening = _ref.isListening;
    if (status === 'error' && errorCode === 'not-allowed') {
      return _ref2$1;
    }
    return h(p, null, h("path", {
      d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z",
      fill: isListening ? 'currentColor' : 'none'
    }), _ref3$1, _ref4$2, _ref5);
  };
  var defaultTemplates$i = {
    buttonText: function buttonText(_ref6) {
      var status = _ref6.status,
        errorCode = _ref6.errorCode,
        isListening = _ref6.isListening;
      return h("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor"
        /* eslint-disable react/no-unknown-property */
        // Preact supports kebab case attributes, and using camel case would
        // require using `preact/compat`.
        // @TODO: reconsider using the `react` ESLint preset
        ,
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
        /* eslint-enable react/no-unknown-property */
      }, h(ButtonInnerElement, {
        status: status,
        errorCode: errorCode,
        isListening: isListening
      }));
    },
    status: function status(_ref7) {
      var transcript = _ref7.transcript;
      return h("p", null, transcript);
    }
  };

  var withUsage$U = createDocumentationMessageGenerator({
    name: 'voice-search'
  });
  var suit$u = component('VoiceSearch');
  var renderer$p = function renderer(_ref) {
    var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates;
    return function (_ref2) {
      var isBrowserSupported = _ref2.isBrowserSupported,
        isListening = _ref2.isListening,
        toggleListening = _ref2.toggleListening,
        voiceListeningState = _ref2.voiceListeningState;
      P(h(VoiceSearch, {
        cssClasses: cssClasses,
        templates: templates,
        isBrowserSupported: isBrowserSupported,
        isListening: isListening,
        toggleListening: toggleListening,
        voiceListeningState: voiceListeningState
      }), containerNode);
    };
  };
  var voiceSearch = function voiceSearch(widgetParams) {
    var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$searchAsYouSpea = _ref3.searchAsYouSpeak,
      searchAsYouSpeak = _ref3$searchAsYouSpea === void 0 ? false : _ref3$searchAsYouSpea,
      language = _ref3.language,
      additionalQueryParameters = _ref3.additionalQueryParameters,
      createVoiceSearchHelper = _ref3.createVoiceSearchHelper;
    if (!container) {
      throw new Error(withUsage$U('The `container` option is required.'));
    }
    var containerNode = getContainerNode(container);
    var cssClasses = {
      root: cx(suit$u(), userCssClasses.root),
      button: cx(suit$u({
        descendantName: 'button'
      }), userCssClasses.button),
      status: cx(suit$u({
        descendantName: 'status'
      }), userCssClasses.status)
    };
    var templates = _objectSpread2(_objectSpread2({}, defaultTemplates$i), userTemplates);
    var specializedRenderer = renderer$p({
      containerNode: containerNode,
      cssClasses: cssClasses,
      templates: templates
    });
    var makeWidget = connectVoiceSearch(specializedRenderer, function () {
      return P(null, containerNode);
    });
    return _objectSpread2(_objectSpread2({}, makeWidget({
      container: containerNode,
      cssClasses: cssClasses,
      templates: templates,
      searchAsYouSpeak: searchAsYouSpeak,
      language: language,
      additionalQueryParameters: additionalQueryParameters,
      createVoiceSearchHelper: createVoiceSearchHelper
    })), {}, {
      $$widgetType: 'ais.voiceSearch'
    });
  };

  /** @deprecated answers is no longer supported */
  var EXPERIMENTAL_answers = deprecate(answersWidget, 'answers is no longer supported');

  /** @deprecated use dynamicWidgets */
  var EXPERIMENTAL_dynamicWidgets = deprecate(dynamicWidgets, 'use dynamicWidgets');

  var widgets = /*#__PURE__*/Object.freeze({
    __proto__: null,
    EXPERIMENTAL_answers: EXPERIMENTAL_answers,
    EXPERIMENTAL_dynamicWidgets: EXPERIMENTAL_dynamicWidgets,
    dynamicWidgets: dynamicWidgets,
    analytics: analytics,
    breadcrumb: breadcrumb,
    clearRefinements: clearRefinements$1,
    configure: configure,
    currentRefinements: currentRefinements,
    EXPERIMENTAL_configureRelatedItems: configureRelatedItems,
    geoSearch: geoSearch,
    hierarchicalMenu: hierarchicalMenu,
    hits: hits,
    hitsPerPage: hitsPerPage,
    index: index,
    infiniteHits: infiniteHits,
    menu: menu,
    menuSelect: menuSelect,
    numericMenu: numericMenu,
    pagination: pagination,
    panel: panel,
    places: placesWidget,
    poweredBy: poweredBy,
    queryRuleContext: queryRuleContext,
    queryRuleCustomData: queryRuleCustomData,
    rangeInput: rangeInput,
    rangeSlider: rangeSlider,
    ratingMenu: ratingMenu,
    refinementList: refinementList,
    relevantSort: relevantSort,
    searchBox: searchBox,
    sortBy: sortBy,
    stats: stats,
    toggleRefinement: toggleRefinement,
    voiceSearch: voiceSearch
  });

  /**
   * InstantSearch is the main component of InstantSearch.js. This object
   * manages the widget and lets you add new ones.
   *
   * Two parameters are required to get you started with InstantSearch.js:
   *  - `indexName`: the main index that you will use for your new search UI
   *  - `searchClient`: the search client to plug to InstantSearch.js
   *
   * The [search client provided by Algolia](algolia.com/doc/api-client/getting-started/what-is-the-api-client/javascript/)
   * needs an `appId` and an `apiKey`. Those parameters can be found in your
   * [Algolia dashboard](https://www.algolia.com/api-keys).
   *
   * If you want to get up and running quickly with InstantSearch.js, have a
   * look at the [getting started](https://www.algolia.com/doc/guides/building-search-ui/getting-started/js/).
   */
  var instantsearch = function instantsearch(options) {
    return new InstantSearch(options);
  };
  instantsearch.version = version$1;
  instantsearch.connectors = connectors;
  instantsearch.widgets = widgets;
  instantsearch.middlewares = middlewares;
  instantsearch.routers = routers;
  instantsearch.stateMappings = stateMappings;
  instantsearch.createInfiniteHitsSessionStorageCache = createInfiniteHitsSessionStorageCache;
  instantsearch.highlight = highlight;
  instantsearch.reverseHighlight = reverseHighlight;
  instantsearch.snippet = snippet;
  instantsearch.reverseSnippet = reverseSnippet;
  instantsearch.insights = insights;

  return instantsearch;

})));
//# sourceMappingURL=instantsearch.development.js.map
