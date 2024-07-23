'use strict';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _assertClassBrand(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _classPrivateFieldGet2(s, a) {
  return s.get(_assertClassBrand(s, a));
}
function _classPrivateFieldInitSpec(e, t, a) {
  _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _classPrivateFieldSet2(s, a, r) {
  return s.set(_assertClassBrand(s, a), r), r;
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var Listener = /*#__PURE__*/_createClass(function Listener(id, event, handler) {
  _classCallCheck(this, Listener);
  /*
   Listener class holds the event,
   handler and a unique id
   */
  _defineProperty(this, "id", void 0);
  _defineProperty(this, "event", void 0);
  _defineProperty(this, "handler", void 0);
  this.id = id;
  this.event = event;
  this.handler = handler;
});

var _idCounter = /*#__PURE__*/new WeakMap();
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
    /*
        array of emitter
        emitter: takes in an event and handler
        handler: is the function it calls
    */
    _defineProperty(this, "listeners", void 0);
    _classPrivateFieldInitSpec(this, _idCounter, void 0);
    this.listeners = [];
    _classPrivateFieldSet2(_idCounter, this, 0);
  }
  return _createClass(EventEmitter, [{
    key: "removeListener",
    value: function removeListener(id) {
      var i = this.listeners.findIndex(function (listener) {
        return listener.id === id;
      });
      if (i !== -1) {
        this.listeners.splice(i, 1);
        return true;
      }
      return false;
    }
  }, {
    key: "addListener",
    value: function addListener(event, handler) {
      var _this$idCounter, _this$idCounter2;
      var id = (_classPrivateFieldSet2(_idCounter, this, (_this$idCounter = _classPrivateFieldGet2(_idCounter, this), _this$idCounter2 = _this$idCounter++, _this$idCounter)), _this$idCounter2);
      this.listeners.push(new Listener(id, event, handler));
      return id;
    }
  }, {
    key: "emit",
    value: function emit(event, payload) {
      var _iterator = _createForOfIteratorHelper(this.listeners),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          if (listener.event === event) {
            listener.handler(payload);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
}();

/**
 * @author emmanuelolaojo
 * @since 11/11/18
 */

/**
 * Validates the configuration object.
 *
 * @param config - configuration object
 */
var checkParams = function checkParams(config) {
  var DEFAULT_GUTTER = 25;
  var booleanProps = ["useTransform", "center"];
  if (!config) {
    throw new Error("No config object has been provided.");
  }
  for (var _i = 0, _booleanProps = booleanProps; _i < _booleanProps.length; _i++) {
    var prop = _booleanProps[_i];
    if (typeof config[prop] !== "boolean") {
      config[prop] = true;
    }
  }
  if (typeof config.gutter !== "number") {
    config.gutter = DEFAULT_GUTTER;
  }
  if (!config.container) error("container");
  if (!config.items && !config["static"]) error("items or static");
};

/**
 * Handles invalid configuration object
 * errors.
 *
 * @param prop - a property with a missing value
 */
var error = function error(prop) {
  throw new Error("Missing property '".concat(prop, "' in MagicGrid config"));
};

/**
 * Finds the shortest column in
 * a column list.
 *
 * @param cols - list of columns
 *
 * @return shortest column
 */
var getMin = function getMin(cols) {
  var min = cols[0];
  var _iterator = _createForOfIteratorHelper(cols),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var col = _step.value;
      if (col.height < min.height) min = col;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return min;
};

var POSITIONING_COMPLETE_EVENT = "positionComplete";
var REPOSITIONING_DELAY = 200;

var MagicGrid = /*#__PURE__*/function (_EventEmitter) {
  /**
   * Initializes the necessary variables
   * for a magic grid.
   *
   * @param config - configuration object
   */
  function MagicGrid(config) {
    var _this;
    _classCallCheck(this, MagicGrid);
    _this = _callSuper(this, MagicGrid);
    checkParams(config);
    if (config.container instanceof HTMLElement) {
      _this.container = config.container;
      _this.containerClass = config.container.className;
    } else {
      _this.containerClass = config.container;
      _this.container = document.querySelector(config.container);
    }
    _this["static"] = config["static"] || false;
    _this.size = config.items;
    _this.gutter = config.gutter;
    _this.maxColumns = config.maxColumns || false;
    _this.useMin = config.useMin || false;
    _this.useTransform = config.useTransform;
    _this.animate = config.animate || false;
    _this.center = config.center;
    _this.styledItems = new Set();
    _this.resizeObserver = null;
    _this.isPositioning = false;
    return _this;
  }

  /**
   * Initializes styles
   *
   * @private
   */
  _inherits(MagicGrid, _EventEmitter);
  return _createClass(MagicGrid, [{
    key: "initStyles",
    value: function initStyles() {
      if (!this.ready()) return;
      this.container.style.position = "relative";
      var items = this.items();
      for (var i = 0; i < items.length; i++) {
        if (this.styledItems.has(items[i])) continue;
        var style = items[i].style;
        style.position = "absolute";
        if (this.animate) {
          style.transition = "".concat(this.useTransform ? "transform" : "top, left", " 0.2s ease");
        }
        this.styledItems.add(items[i]);
      }
    }

    /**
     * Gets a collection of all items in a grid.
     *
     * @return {HTMLCollection}
     * @private
     */
  }, {
    key: "items",
    value: function items() {
      return this.container.children;
    }

    /**
     * Calculates the width of a column.
     *
     * @return width of a column in the grid
     * @private
     */
  }, {
    key: "colWidth",
    value: function colWidth() {
      return this.items()[0].getBoundingClientRect().width + this.gutter;
    }

    /**
     * Initializes an array of empty columns
     * and calculates the leftover whitespace.
     *
     * @return {{cols: Array, wSpace: number}}
     * @private
     */
  }, {
    key: "setup",
    value: function setup() {
      var width = this.container.getBoundingClientRect().width;
      var colWidth = this.colWidth();
      var numCols = Math.floor(width / colWidth) || 1;
      var cols = [];
      if (this.maxColumns && numCols > this.maxColumns) {
        numCols = this.maxColumns;
      }
      for (var i = 0; i < numCols; i++) {
        cols[i] = {
          height: 0,
          index: i
        };
      }
      var wSpace = width - numCols * colWidth + this.gutter;
      return {
        cols: cols,
        wSpace: wSpace
      };
    }

    /**
     * Gets the next available column.
     *
     * @param cols list of columns
     * @param i index of dom element
     *
     * @return {*} next available column
     * @private
     */
  }, {
    key: "nextCol",
    value: function nextCol(cols, i) {
      if (this.useMin) {
        return getMin(cols);
      }
      return cols[i % cols.length];
    }

    /**
     * Positions each item in the grid, based
     * on their corresponding column's height
     * and index then stretches the container to
     * the height of the grid.
     */
  }, {
    key: "positionItems",
    value: function positionItems() {
      if (this.isPositioning) {
        return;
      }
      this.isPositioning = true;
      var _this$setup = this.setup(),
        cols = _this$setup.cols,
        wSpace = _this$setup.wSpace;
      var maxHeight = 0;
      var colWidth = this.colWidth();
      var items = this.items();
      wSpace = this.center ? Math.floor(wSpace / 2) : 0;
      this.initStyles();
      for (var i = 0; i < items.length; i++) {
        var col = this.nextCol(cols, i);
        var item = items[i];
        var topGutter = col.height ? this.gutter : 0;
        var left = col.index * colWidth + wSpace + "px";
        var top = col.height + topGutter + "px";
        if (this.useTransform) {
          item.style.transform = "translate(".concat(left, ", ").concat(top, ")");
        } else {
          item.style.top = top;
          item.style.left = left;
        }
        col.height += item.getBoundingClientRect().height + topGutter;
        if (col.height > maxHeight) {
          maxHeight = col.height;
        }
      }
      this.container.style.height = maxHeight + this.gutter + "px";
      this.isPositioning = false;
      this.emit(POSITIONING_COMPLETE_EVENT);
    }

    /**
     * Checks if every item has been loaded
     * in the dom.
     *
     * @return {Boolean} true if every item is present
     */
  }, {
    key: "ready",
    value: function ready() {
      if (this["static"]) return true;
      return this.items().length >= this.size;
    }

    /**
     * Periodically checks that all items
     * have been loaded in the dom. Calls
     * this.listen() once all the items are
     * present.
     *
     * @private
     */
  }, {
    key: "getReady",
    value: function getReady() {
      var _this2 = this;
      var interval = setInterval(function () {
        _this2.container = document.querySelector(_this2.containerClass);
        if (_this2.ready()) {
          clearInterval(interval);
          _this2.listen();
        }
      }, 100);
    }
  }, {
    key: "observeContainerResize",
    value: function observeContainerResize() {
      var _this3 = this;
      if (this.resizeObserver) return;
      this.resizeObserver = new ResizeObserver(function () {
        setTimeout(function () {
          _this3.positionItems();
        }, REPOSITIONING_DELAY);
      });
      this.resizeObserver.observe(this.container);
    }

    /**
     * Positions all the items and
     * repositions them whenever the
     * window size changes.
     */
  }, {
    key: "listen",
    value: function listen() {
      var _this4 = this;
      if (this.ready()) {
        window.addEventListener("resize", function () {
          setTimeout(function () {
            _this4.positionItems();
          }, REPOSITIONING_DELAY);
        });
        this.observeContainerResize();
        this.positionItems();
      } else this.getReady();
    }
  }, {
    key: "onPositionComplete",
    value: function onPositionComplete(callback) {
      return this.addListener(POSITIONING_COMPLETE_EVENT, callback);
    }
  }]);
}(EventEmitter);

module.exports = MagicGrid;
