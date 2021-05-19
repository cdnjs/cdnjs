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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles", "../../globals/js/misc/on"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"), require("../../globals/js/misc/on"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.handles, global.on);
    global.paginationNav = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _handles, _on) {
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

  var PaginationNav = /*#__PURE__*/function (_mixin) {
    _inherits(PaginationNav, _mixin);

    var _super = _createSuper(PaginationNav);
    /**
     * Pagination Nav component
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a pagination nav.
     */


    /**
     * Pagination Nav component
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a pagination nav.
     */
    function PaginationNav(element, options) {
      var _this;

      _classCallCheck(this, PaginationNav);

      _this = _super.call(this, element, options);

      _this.getActivePageNumber = function () {
        var pageNum;

        var activePageElement = _this.element.querySelector(_this.options.selectorPageActive);

        if (activePageElement) {
          pageNum = Number(activePageElement.getAttribute(_this.options.attribPage));
        }

        return pageNum;
      };

      _this.clearActivePage = function (evt) {
        var pageButtonNodeList = _this.element.querySelectorAll(_this.options.selectorPageButton);

        var pageSelectElement = _this.element.querySelector(_this.options.selectorPageSelect);

        Array.prototype.forEach.call(pageButtonNodeList, function (el) {
          el.classList.remove(_this.options.classActive, _this.options.classDisabled);
          el.removeAttribute(_this.options.attribActive);
          el.removeAttribute('aria-disabled');
          el.removeAttribute('aria-current');
        });

        if (pageSelectElement) {
          pageSelectElement.removeAttribute('aria-current');
          var pageSelectElementOptions = pageSelectElement.options;
          Array.prototype.forEach.call(pageSelectElementOptions, function (el) {
            el.removeAttribute(_this.options.attribActive);
          });

          if (!evt.target.matches(_this.options.selectorPageSelect)) {
            pageSelectElement.classList.remove(_this.options.classActive);
            pageSelectElement.value = '';
          }
        }
      };

      _this.handleClick = function (evt) {
        if (!evt.target.getAttribute('aria-disabled') === true) {
          var nextActivePageNumber = _this.getActivePageNumber();

          var pageElementNodeList = _this.element.querySelectorAll(_this.options.selectorPageElement);

          var pageSelectElement = _this.element.querySelector(_this.options.selectorPageSelect);

          _this.clearActivePage(evt);

          if (evt.target.matches(_this.options.selectorPageButton)) {
            nextActivePageNumber = Number(evt.target.getAttribute(_this.options.attribPage));
          }

          if (evt.target.matches(_this.options.selectorPagePrevious)) {
            nextActivePageNumber -= 1;
          }

          if (evt.target.matches(_this.options.selectorPageNext)) {
            nextActivePageNumber += 1;
          }

          var pageTargetElement = pageElementNodeList[nextActivePageNumber - 1];
          pageTargetElement.setAttribute(_this.options.attribActive, true);

          if (pageTargetElement.tagName === 'OPTION') {
            pageSelectElement.value = _this.getActivePageNumber();
            pageSelectElement.classList.add(_this.options.classActive);
            pageSelectElement.setAttribute('aria-current', 'page');
          } else {
            pageTargetElement.classList.add(_this.options.classActive, _this.options.classDisabled);
            pageTargetElement.setAttribute('aria-disabled', true);
            pageTargetElement.setAttribute('aria-current', 'page');
          }

          _this.setPrevNextStates();
        }
      };

      _this.handleSelectChange = function (evt) {
        _this.clearActivePage(evt);

        var pageSelectElement = _this.element.querySelector(_this.options.selectorPageSelect);

        var pageSelectElementOptions = pageSelectElement.options;
        pageSelectElementOptions[pageSelectElementOptions.selectedIndex].setAttribute(_this.options.attribActive, true);
        evt.target.setAttribute('aria-current', 'page');
        evt.target.classList.add(_this.options.classActive);

        _this.setPrevNextStates();
      };

      _this.setPrevNextStates = function () {
        var pageElementNodeList = _this.element.querySelectorAll(_this.options.selectorPageElement);

        var totalPages = pageElementNodeList.length;

        var pageDirectionElementPrevious = _this.element.querySelector(_this.options.selectorPagePrevious);

        var pageDirectionElementNext = _this.element.querySelector(_this.options.selectorPageNext);

        if (pageDirectionElementPrevious) {
          if (_this.getActivePageNumber() <= 1) {
            pageDirectionElementPrevious.setAttribute('aria-disabled', true);
            pageDirectionElementPrevious.classList.add(_this.options.classDisabled);
          } else {
            pageDirectionElementPrevious.removeAttribute('aria-disabled');
            pageDirectionElementPrevious.classList.remove(_this.options.classDisabled);
          }
        }

        if (pageDirectionElementNext) {
          if (_this.getActivePageNumber() >= totalPages) {
            pageDirectionElementNext.setAttribute('aria-disabled', true);
            pageDirectionElementNext.classList.add(_this.options.classDisabled);
          } else {
            pageDirectionElementNext.removeAttribute('aria-disabled');
            pageDirectionElementNext.classList.remove(_this.options.classDisabled);
          }
        }
      };

      _this.manage((0, _on.default)(_this.element, 'click', function (evt) {
        return _this.handleClick(evt);
      }));

      _this.manage((0, _on.default)(_this.element, 'change', function (evt) {
        if (evt.target.matches(_this.options.selectorPageSelect)) {
          _this.handleSelectChange(evt);
        }
      }));

      return _this;
    }
    /**
     * Get active page number
     */


    /**
     * Get active page number
     */
    _createClass(PaginationNav, null, [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor, {@linkcode PaginationNav.create .create()},
       * or {@linkcode PaginationNav.init .init()},
       * properties in this object are overriden for the instance being create and how {@linkcode PaginationNav.init .init()} works.
       * @member PaginationNav.options
       * @type {object}
       * @property {string} selectorInit The data attribute to find pagination nav.
       * @property {string} selectorPageElement The data attribute to find page element.
       * @property {string} selectorPageButton The data attribute to find page interactive element.
       * @property {string} selectorPageDirection The data attribute to find page change element.
       * @property {string} selectorPageSelect The data attribute to find page select element.
       * @property {string} selectorPageActive The data attribute to find active page element.
       * @property {string} [classActive] The CSS class for page's selected state.
       * @property {string} [classDisabled] The CSS class for page's disabled state.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-pagination-nav]',
          selectorPageElement: '[data-page]',
          selectorPageButton: '[data-page-button]',
          selectorPagePrevious: '[data-page-previous]',
          selectorPageNext: '[data-page-next]',
          selectorPageSelect: '[data-page-select]',
          selectorPageActive: '[data-page-active="true"]',
          attribPage: 'data-page',
          attribActive: 'data-page-active',
          classActive: "".concat(prefix, "--pagination-nav__page--active"),
          classDisabled: "".concat(prefix, "--pagination-nav__page--disabled")
        };
      }
    }]);

    PaginationNav.components = new WeakMap();
    return PaginationNav;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = PaginationNav;
  _exports.default = _default;
});