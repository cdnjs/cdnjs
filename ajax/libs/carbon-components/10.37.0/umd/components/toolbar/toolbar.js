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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles", "../../globals/js/misc/event-matches", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/event-matches"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.handles, global.eventMatches, global.on);
    global.toolbar = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _handles, _eventMatches, _on) {
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

  var Toolbar = /*#__PURE__*/function (_mixin) {
    _inherits(Toolbar, _mixin);

    var _super = _createSuper(Toolbar);
    /**
     * Toolbar.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as an toolbar.
     */


    /**
     * Toolbar.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as an toolbar.
     */
    function Toolbar(element, options) {
      var _this;

      _classCallCheck(this, Toolbar);

      _this = _super.call(this, element, options);

      if (!_this.element.dataset.tableTarget) {
        console.warn('There is no table bound to this toolbar!'); // eslint-disable-line no-console
      } else {
        var boundTable = _this.element.ownerDocument.querySelector(_this.element.dataset.tableTarget);

        var rowHeightBtns = _this.element.querySelector(_this.options.selectorRowHeight);

        if (rowHeightBtns) {
          _this.manage((0, _on.default)(rowHeightBtns, 'click', function (event) {
            _this._handleRowHeightChange(event, boundTable);
          })); // toArray(this.element.querySelectorAll(this.options.selectorRowHeight)).forEach((item) => {
          //   item.addEventListener('click', (event) => { this._handleRowHeightChange(event, boundTable); });
          // });

        }
      }

      _this.manage((0, _on.default)(_this.element.ownerDocument, 'keydown', function (evt) {
        _this._handleKeyDown(evt);
      }));

      _this.manage((0, _on.default)(_this.element.ownerDocument, 'click', function (evt) {
        _this._handleDocumentClick(evt);
      }));

      return _this;
    }
    /**
     * Handles toggling of active state of the toolbar search input
     * @param {Event} event The event triggering this method.
     */


    /**
     * Handles toggling of active state of the toolbar search input
     * @param {Event} event The event triggering this method.
     */
    _createClass(Toolbar, [{
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(event) {
        var _this2 = this;

        var searchInput = (0, _eventMatches.default)(event, this.options.selectorSearch);
        var isOfSelfSearchInput = searchInput && this.element.contains(searchInput);

        if (isOfSelfSearchInput) {
          var shouldBeOpen = isOfSelfSearchInput && !this.element.classList.contains(this.options.classSearchActive);
          searchInput.classList.toggle(this.options.classSearchActive, shouldBeOpen);

          if (shouldBeOpen) {
            searchInput.querySelector('input').focus();
          }
        }

        var targetComponentElement = (0, _eventMatches.default)(event, this.options.selectorInit);
        toArray(this.element.ownerDocument.querySelectorAll(this.options.selectorSearch)).forEach(function (item) {
          if (!targetComponentElement || !targetComponentElement.contains(item)) {
            item.classList.remove(_this2.options.classSearchActive);
          }
        });
      }
      /**
       * Handles toggling of active state of the toolbar search input via the keyboard
       * @param {Event} event The event triggering this method.
       */

    }, {
      key: "_handleKeyDown",
      value: function _handleKeyDown(event) {
        var searchInput = (0, _eventMatches.default)(event, this.options.selectorSearch);

        if (searchInput && event.which === 27) {
          searchInput.classList.remove(this.options.classSearchActive);
        }
      }
      /**
       * Handles toggling of the row height of the associated table
       * @param {Event} event The event triggering this method.
       * @param {HTMLElement} boundTable The table associated with the toolbar.
       */

    }, {
      key: "_handleRowHeightChange",
      value: function _handleRowHeightChange(event, boundTable) {
        var _event$currentTarget$ = event.currentTarget.querySelector('input:checked'),
            value = _event$currentTarget$.value;

        if (value === 'tall') {
          boundTable.classList.add(this.options.classTallRows);
        } else {
          boundTable.classList.remove(this.options.classTallRows);
        }
      }
      /**
       * The map associating DOM element and Toolbar UI instance.
       * @type {WeakMap}
       */

    }], [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor,
       * properties in this object are overriden for the instance being created.
       * @property {string} selectorInit The CSS selector to find toolbar instances.
       * @property {string} selectorSearch The CSS selector to find search inputs in a toolbar.
       * @property {string} selectorRowHeight The CSS selector to find the row height inputs in a toolbar.
       * @property {string} classTallRows The CSS class for making table rows into tall rows.
       * @property {string} classSearchActive The CSS class the active state of the search input.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-toolbar]',
          selectorSearch: '[data-toolbar-search]',
          selectorRowHeight: '[data-row-height]',
          classTallRows: "".concat(prefix, "--responsive-table--tall"),
          classSearchActive: "".concat(prefix, "--toolbar-search--active")
        };
      }
    }]);

    Toolbar.components = new WeakMap();
    return Toolbar;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = Toolbar;
  _exports.default = _default;
});