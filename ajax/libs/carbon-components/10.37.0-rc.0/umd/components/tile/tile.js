function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/misc/event-matches"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/misc/event-matches"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.eventMatches);
    global.tile = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _eventMatches) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
  _eventMatches = _interopRequireDefault(_eventMatches);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
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

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var Tile = /*#__PURE__*/function (_mixin) {
    _inherits(Tile, _mixin);

    var _super = _createSuper(Tile);
    /**
     * Tile.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as an Tile.
     */


    /**
     * Tile.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as an Tile.
     */
    function Tile(element, options) {
      var _this;

      _classCallCheck(this, Tile);

      _this = _super.call(this, element, options);

      _this._getClass = function (type) {
        var typeObj = {
          expandable: _this.options.classExpandedTile,
          clickable: _this.options.classClickableTile,
          selectable: _this.options.classSelectableTile
        };
        return typeObj[type];
      };

      _this._hookActions = function (tileClass) {
        var isExpandable = _this.tileType === 'expandable';

        if (isExpandable) {
          var aboveTheFold = _this.element.querySelector(_this.options.selectorAboveTheFold);

          var getStyle = _this.element.ownerDocument.defaultView.getComputedStyle(_this.element, null);

          var tilePaddingTop = parseInt(getStyle.getPropertyValue('padding-top'), 10);
          var tilePaddingBottom = parseInt(getStyle.getPropertyValue('padding-bottom'), 10);
          var tilePadding = tilePaddingTop + tilePaddingBottom;

          if (aboveTheFold) {
            _this.tileHeight = _this.element.getBoundingClientRect().height;
            _this.atfHeight = aboveTheFold.getBoundingClientRect().height + tilePadding;
            _this.element.style.maxHeight = "".concat(_this.atfHeight, "px");
          }

          if (_this.element.classList.contains(_this.options.classExpandedTile)) {
            _this._setTileHeight();
          }
        }

        _this.element.addEventListener('click', function (evt) {
          var input = (0, _eventMatches.default)(evt, _this.options.selectorTileInput);

          if (!input) {
            _this.element.classList.toggle(tileClass);
          }

          if (isExpandable) {
            _this._setTileHeight();
          }
        });

        _this.element.addEventListener('keydown', function (evt) {
          var input = _this.element.querySelector(_this.options.selectorTileInput);

          if (input) {
            if (evt.which === 13 || evt.which === 32) {
              if (!isExpandable) {
                _this.element.classList.toggle(tileClass);

                input.checked = !input.checked;
              }
            }
          }
        });
      };

      _this._setTileHeight = function () {
        var isExpanded = _this.element.classList.contains(_this.options.classExpandedTile);

        _this.element.style.maxHeight = isExpanded ? "".concat(_this.tileHeight, "px") : "".concat(_this.atfHeight, "px");
      };

      _this.tileType = _this.element.dataset.tile;
      _this.tileHeight = 0; // Tracks expandable tile height

      // Tracks expandable tile height
      _this.atfHeight = 0; // Tracks above the fold height

      // Tracks above the fold height
      _this._hookActions(_this._getClass(_this.tileType));

      return _this;
    }

    _createClass(Tile, [{
      key: "release",
      value: function release() {
        _get(_getPrototypeOf(Tile.prototype), "release", this).call(this);
      }
      /**
       * The map associating DOM element and Tile UI instance.
       * @type {WeakMap}
       */

    }], [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor,
       * properties in this object are overriden for the instance being created.
       * @property {string} selectorInit The CSS selector to find Tile instances.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-tile]',
          selectorAboveTheFold: '[data-tile-atf]',
          selectorTileInput: '[data-tile-input]',
          classExpandedTile: "".concat(prefix, "--tile--is-expanded"),
          classClickableTile: "".concat(prefix, "--tile--is-clicked"),
          classSelectableTile: "".concat(prefix, "--tile--is-selected")
        };
      }
    }]);

    Tile.components = new WeakMap();
    return Tile;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default));

  var _default = Tile;
  _exports.default = _default;
});