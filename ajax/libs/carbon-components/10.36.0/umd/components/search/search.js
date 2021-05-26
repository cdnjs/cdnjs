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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles", "../../globals/js/misc/event-matches", "../../globals/js/misc/on", "../../globals/js/misc/svg-toggle-class"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/event-matches"), require("../../globals/js/misc/on"), require("../../globals/js/misc/svg-toggle-class"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.handles, global.eventMatches, global.on, global.svgToggleClass);
    global.search = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _handles, _eventMatches, _on, _svgToggleClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  _mixin2 = _interopRequireDefault(_mixin2);
  _createComponent = _interopRequireDefault(_createComponent);
  _initComponentBySearch = _interopRequireDefault(_initComponentBySearch);
  _handles = _interopRequireDefault(_handles);
  _eventMatches = _interopRequireDefault(_eventMatches);
  _on = _interopRequireDefault(_on);
  _svgToggleClass = _interopRequireDefault(_svgToggleClass);

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

  var toArray = function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };

  var Search = /*#__PURE__*/function (_mixin) {
    _inherits(Search, _mixin);

    var _super = _createSuper(Search);
    /**
     * Search with Options.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as the search component.
     * @param {object} [options] The component options
     * @property {string} [options.selectorInit]
     *   The selector to find search UIs with options.
     * @property {string} [options.selectorSearchView]
     *   The selector to find the search view icon containers.
     * @property {string} [options.selectorSearchInput]
     *   The selector to find the search input.
     * @property {string} [options.selectorClearIcon]
     *   The selector for the clear icon that clears the search box.
     * @property {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
     * @property {string} [options.classClearHidden] The class used to hide the clear icon.
     * @property {string} [options.classLayoutHidden] The class used to hide nonselected layout view.
     */


    /**
     * Search with Options.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as the search component.
     * @param {object} [options] The component options
     * @property {string} [options.selectorInit]
     *   The selector to find search UIs with options.
     * @property {string} [options.selectorSearchView]
     *   The selector to find the search view icon containers.
     * @property {string} [options.selectorSearchInput]
     *   The selector to find the search input.
     * @property {string} [options.selectorClearIcon]
     *   The selector for the clear icon that clears the search box.
     * @property {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
     * @property {string} [options.classClearHidden] The class used to hide the clear icon.
     * @property {string} [options.classLayoutHidden] The class used to hide nonselected layout view.
     */
    function Search(element, options) {
      var _this;

      _classCallCheck(this, Search);

      _this = _super.call(this, element, options);

      var closeIcon = _this.element.querySelector(_this.options.selectorClearIcon);

      var input = _this.element.querySelector(_this.options.selectorSearchInput);

      if (!input) {
        throw new Error('Cannot find the search input.');
      }

      if (closeIcon) {
        _this.manage((0, _on.default)(closeIcon, 'click', function () {
          (0, _svgToggleClass.default)(closeIcon, _this.options.classClearHidden, true);
          input.value = '';
          input.focus();
        }));
      }

      _this.manage((0, _on.default)(_this.element, 'click', function (evt) {
        var toggleItem = (0, _eventMatches.default)(evt, _this.options.selectorIconContainer);
        if (toggleItem) _this.toggleLayout(toggleItem);
      }));

      _this.manage((0, _on.default)(input, 'input', function (evt) {
        if (closeIcon) _this.showClear(evt.target.value, closeIcon);
      }));

      return _this;
    }
    /**
     * Toggles between the grid and list layout.
     * @param {HTMLElement} element The element contining the layout toggle.
     */


    /**
     * Toggles between the grid and list layout.
     * @param {HTMLElement} element The element contining the layout toggle.
     */
    _createClass(Search, [{
      key: "toggleLayout",
      value: function toggleLayout(element) {
        var _this2 = this;

        toArray(element.querySelectorAll(this.options.selectorSearchView)).forEach(function (item) {
          item.classList.toggle(_this2.options.classLayoutHidden);
        });
      }
      /**
       * Toggles the clear icon visibility
       * @param {HTMLElement} value The element serving as the search input.
       * @param {HTMLElement} icon The element serving as close icon.
       */

    }, {
      key: "showClear",
      value: function showClear(value, icon) {
        (0, _svgToggleClass.default)(icon, this.options.classClearHidden, value.length === 0);
      }
      /**
       * The component options.
       * If `options` is specified in the constructor,
       * {@linkcode Search.create .create()}, or {@linkcode Search.init .init()},
       * properties in this object are overriden for the instance being created
       * and how {@linkcode Search.init .init()} works.
       * @member Search.options
       * @type {object}
       * @property {string} [options.selectorInit]
       *   The selector to find search UIs with options.
       * @property {string} [options.selectorSearchView]
       *   The selector to find the search view icon containers.
       * @property {string} [options.selectorSearchInput]
       *   The selector to find the search input.
       * @property {string} [options.selectorClearIcon]
       *   The selector for the clear icon that clears the search box.
       * @property {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
       * @property {string} [options.classClearHidden] The class used to hide the clear icon.
       * @property {string} [options.classLayoutHidden] The class used to hide nonselected layout view.
       */

    }], [{
      key: "options",
      get: function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-search]',
          selectorSearchView: '[data-search-view]',
          selectorSearchInput: ".".concat(prefix, "--search-input"),
          selectorClearIcon: ".".concat(prefix, "--search-close"),
          selectorIconContainer: ".".concat(prefix, "--search-button[data-search-toggle]"),
          classClearHidden: "".concat(prefix, "--search-close--hidden"),
          classLayoutHidden: "".concat(prefix, "--search-view--hidden")
        };
      }
      /**
       * The map associating DOM element and search instance.
       * @member Search.components
       * @type {WeakMap}
       */

    }]);

    Search.components = new WeakMap();
    return Search;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = Search;
  _exports.default = _default;
});