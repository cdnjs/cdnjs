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
    define(["exports", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles", "../../globals/js/misc/event-matches", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/event-matches"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.mixin, global.createComponent, global.initComponentBySearch, global.handles, global.eventMatches, global.on);
    global.pagination = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _mixin2, _createComponent, _initComponentBySearch, _handles, _eventMatches, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
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

  var Pagination = /*#__PURE__*/function (_mixin) {
    _inherits(Pagination, _mixin);

    var _super = _createSuper(Pagination);
    /**
     * Pagination component.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a pagination component.
     * @param {object} [options] The component options.
     * @property {string} [selectorInit] The CSS selector to find pagination components.
     * @property {string} [selectorItemsPerPageInput]
     *   The CSS selector to find the input that determines the number of items per page.
     * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
     * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
     * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
     * @property {string} [eventItemsPerPage]
     *   The name of the custom event fired when a user changes the number of items per page.
     *   event.detail.value contains the number of items a user wishes to see.
     * @property {string} [eventPageNumber]
     *   The name of the custom event fired when a user inputs a specific page number.
     *   event.detail.value contains the value that the user input.
     * @property {string} [eventPageChange]
     *   The name of the custom event fired when a user goes forward or backward a page.
     *   event.detail.direction contains the direction a user wishes to go.
     */


    /**
     * Pagination component.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a pagination component.
     * @param {object} [options] The component options.
     * @property {string} [selectorInit] The CSS selector to find pagination components.
     * @property {string} [selectorItemsPerPageInput]
     *   The CSS selector to find the input that determines the number of items per page.
     * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
     * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
     * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
     * @property {string} [eventItemsPerPage]
     *   The name of the custom event fired when a user changes the number of items per page.
     *   event.detail.value contains the number of items a user wishes to see.
     * @property {string} [eventPageNumber]
     *   The name of the custom event fired when a user inputs a specific page number.
     *   event.detail.value contains the value that the user input.
     * @property {string} [eventPageChange]
     *   The name of the custom event fired when a user goes forward or backward a page.
     *   event.detail.direction contains the direction a user wishes to go.
     */
    function Pagination(element, options) {
      var _this;

      _classCallCheck(this, Pagination);

      _this = _super.call(this, element, options);

      _this._emitEvent = function (evtName, detail) {
        var event = new CustomEvent("".concat(evtName), {
          bubbles: true,
          cancelable: true,
          detail: detail
        });

        _this.element.dispatchEvent(event);
      };

      _this.manage((0, _on.default)(_this.element, 'click', function (evt) {
        if ((0, _eventMatches.default)(evt, _this.options.selectorPageBackward)) {
          var detail = {
            initialEvt: evt,
            element: evt.target,
            direction: 'backward'
          };

          _this._emitEvent(_this.options.eventPageChange, detail);
        } else if ((0, _eventMatches.default)(evt, _this.options.selectorPageForward)) {
          var _detail = {
            initialEvt: evt,
            element: evt.target,
            direction: 'forward'
          };

          _this._emitEvent(_this.options.eventPageChange, _detail);
        }
      }));

      _this.manage((0, _on.default)(_this.element, 'input', function (evt) {
        if ((0, _eventMatches.default)(evt, _this.options.selectorItemsPerPageInput)) {
          var detail = {
            initialEvt: evt,
            element: evt.target,
            value: evt.target.value
          };

          _this._emitEvent(_this.options.eventItemsPerPage, detail);
        } else if ((0, _eventMatches.default)(evt, _this.options.selectorPageNumberInput)) {
          var _detail2 = {
            initialEvt: evt,
            element: evt.target,
            value: evt.target.value
          };

          _this._emitEvent(_this.options.eventPageNumber, _detail2);
        }
      }));

      return _this;
    }
    /**
     * Dispatches a custom event
     * @param {string} evtName name of the event to be dispatched.
     * @param {object} detail contains the original event and any other necessary details.
     */


    Pagination.components = new WeakMap();
    Pagination.options = {
      selectorInit: '[data-pagination]',
      selectorItemsPerPageInput: '[data-items-per-page]',
      selectorPageNumberInput: '[data-page-number-input]',
      selectorPageBackward: '[data-page-backward]',
      selectorPageForward: '[data-page-forward]',
      eventItemsPerPage: 'itemsPerPage',
      eventPageNumber: 'pageNumber',
      eventPageChange: 'pageChange'
    };

    /**
     * Dispatches a custom event
     * @param {string} evtName name of the event to be dispatched.
     * @param {object} detail contains the original event and any other necessary details.
     */
    return Pagination;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = Pagination;
  _exports.default = _default;
});