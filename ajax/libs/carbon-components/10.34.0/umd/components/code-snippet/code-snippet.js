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
    define(["exports", "../../globals/js/settings", "../../globals/js/misc/mixin", "../../globals/js/mixins/create-component", "../../globals/js/mixins/init-component-by-search", "../../globals/js/mixins/handles"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../globals/js/settings"), require("../../globals/js/misc/mixin"), require("../../globals/js/mixins/create-component"), require("../../globals/js/mixins/init-component-by-search"), require("../../globals/js/mixins/handles"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.mixin, global.createComponent, global.initComponentBySearch, global.handles);
    global.codeSnippet = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, _mixin2, _createComponent, _initComponentBySearch, _handles) {
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

  var CodeSnippet = /*#__PURE__*/function (_mixin) {
    _inherits(CodeSnippet, _mixin);

    var _super = _createSuper(CodeSnippet);
    /**
     * CodeSnippet UI.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a CodeSnippet UI.
     */


    /**
     * CodeSnippet UI.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends Handles
     * @param {HTMLElement} element The element working as a CodeSnippet UI.
     */
    function CodeSnippet(element, options) {
      var _this;

      _classCallCheck(this, CodeSnippet);

      _this = _super.call(this, element, options);

      _this._initCodeSnippet();

      _this.element.querySelector(_this.options.classExpandBtn).addEventListener('click', function (evt) {
        return _this._handleClick(evt);
      });

      return _this;
    }

    _createClass(CodeSnippet, [{
      key: "_handleClick",
      value: function _handleClick() {
        var expandBtn = this.element.querySelector(this.options.classExpandText);
        this.element.classList.toggle(this.options.classExpanded);

        if (this.element.classList.contains(this.options.classExpanded)) {
          expandBtn.textContent = expandBtn.getAttribute(this.options.attribShowLessText);
        } else {
          expandBtn.textContent = expandBtn.getAttribute(this.options.attribShowMoreText);
        }
      }
    }, {
      key: "_initCodeSnippet",
      value: function _initCodeSnippet() {
        var expandBtn = this.element.querySelector(this.options.classExpandText);

        if (!expandBtn) {
          throw new TypeError('Cannot find the expand button.');
        }

        expandBtn.textContent = expandBtn.getAttribute(this.options.attribShowMoreText);

        if (this.element.offsetHeight < this.options.minHeight) {
          this.element.classList.add(this.options.classHideExpand);
        }
      }
      /**
       * The map associating DOM element and code snippet UI instance.
       * @member CodeSnippet.components
       * @type {WeakMap}
       */

    }], [{
      key: "options",
      get:
      /**
       * The component options.
       * If `options` is specified in the constructor, {@linkcode CodeSnippet.create .create()},
       * or {@linkcode CodeSnippet.init .init()},
       * properties in this object are overriden for the instance being create and how {@linkcode CodeSnippet.init .init()} works.
       * @member CodeSnippet.options
       * @type {object}
       * @property {string} selectorInit The data attribute to find code snippet UIs.
       */
      function get() {
        var prefix = _settings.default.prefix;
        return {
          selectorInit: '[data-code-snippet]',
          attribShowMoreText: 'data-show-more-text',
          attribShowLessText: 'data-show-less-text',
          minHeight: 288,
          classExpanded: "".concat(prefix, "--snippet--expand"),
          classExpandBtn: ".".concat(prefix, "--snippet-btn--expand"),
          classExpandText: ".".concat(prefix, "--snippet-btn--text"),
          classHideExpand: "".concat(prefix, "--snippet-btn--expand--hide")
        };
      }
    }]);

    CodeSnippet.components = new WeakMap();
    return CodeSnippet;
  }((0, _mixin2.default)(_createComponent.default, _initComponentBySearch.default, _handles.default));

  var _default = CodeSnippet;
  _exports.default = _default;
});