this.primereact = this.primereact || {};
this.primereact.scrolltop = (function (exports, React, core) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var ScrollTop = /*#__PURE__*/function (_Component) {
    _inherits(ScrollTop, _Component);

    var _super = _createSuper(ScrollTop);

    function ScrollTop(props) {
      var _this;

      _classCallCheck(this, ScrollTop);

      _this = _super.call(this, props);
      _this.state = {
        visible: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
      _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
      _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
      _this.scrollElementRef = /*#__PURE__*/React__default['default'].createRef();
      return _this;
    }

    _createClass(ScrollTop, [{
      key: "onClick",
      value: function onClick() {
        var scrollElement = this.props.target === 'window' ? window : this.helper.parentElement;
        scrollElement.scroll({
          top: 0,
          behavior: this.props.behavior
        });
      }
    }, {
      key: "checkVisibility",
      value: function checkVisibility(scrollY) {
        this.setState({
          visible: scrollY > this.props.threshold
        });
      }
    }, {
      key: "bindParentScrollListener",
      value: function bindParentScrollListener() {
        var _this2 = this;

        this.scrollListener = function () {
          _this2.checkVisibility(_this2.helper.parentElement.scrollTop);
        };

        this.helper.parentElement.addEventListener('scroll', this.scrollListener);
      }
    }, {
      key: "bindDocumentScrollListener",
      value: function bindDocumentScrollListener() {
        var _this3 = this;

        this.scrollListener = function () {
          _this3.checkVisibility(core.DomHandler.getWindowScrollTop());
        };

        window.addEventListener('scroll', this.scrollListener);
      }
    }, {
      key: "unbindParentScrollListener",
      value: function unbindParentScrollListener() {
        if (this.scrollListener) {
          this.helper.parentElement.removeEventListener('scroll', this.scrollListener);
          this.scrollListener = null;
        }
      }
    }, {
      key: "unbindDocumentScrollListener",
      value: function unbindDocumentScrollListener() {
        if (this.scrollListener) {
          window.removeEventListener('scroll', this.scrollListener);
          this.scrollListener = null;
        }
      }
    }, {
      key: "onEnter",
      value: function onEnter() {
        core.ZIndexUtils.set('overlay', this.scrollElementRef.current);
      }
    }, {
      key: "onEntered",
      value: function onEntered() {
        this.props.onShow && this.props.onShow();
      }
    }, {
      key: "onExited",
      value: function onExited() {
        core.ZIndexUtils.clear(this.scrollElementRef.current);
        this.props.onHide && this.props.onHide();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.target === 'window') this.bindDocumentScrollListener();else if (this.props.target === 'parent') this.bindParentScrollListener();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.props.target === 'window') this.unbindDocumentScrollListener();else if (this.props.target === 'parent') this.unbindParentScrollListener();
        core.ZIndexUtils.clear(this.scrollElementRef.current);
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var className = core.classNames('p-scrolltop p-link p-component', {
          'p-scrolltop-sticky': this.props.target !== 'window'
        }, this.props.className);
        var iconClassName = core.classNames('p-scrolltop-icon', this.props.icon);
        var isTargetParent = this.props.target === 'parent';
        return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: this.scrollElementRef,
          classNames: "p-scrolltop",
          in: this.state.visible,
          timeout: {
            enter: 150,
            exit: 150
          },
          options: this.props.transitionOptions,
          unmountOnExit: true,
          onEnter: this.onEnter,
          onEntered: this.onEntered,
          onExited: this.onExited
        }, /*#__PURE__*/React__default['default'].createElement("button", {
          ref: this.scrollElementRef,
          type: "button",
          className: className,
          style: this.props.style,
          onClick: this.onClick
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null))), isTargetParent && /*#__PURE__*/React__default['default'].createElement("span", {
          ref: function ref(el) {
            return _this4.helper = el;
          },
          className: "p-scrolltop-helper"
        }));
      }
    }]);

    return ScrollTop;
  }(React.Component);

  _defineProperty(ScrollTop, "defaultProps", {
    target: 'window',
    threshold: 400,
    icon: 'pi pi-chevron-up',
    behavior: 'smooth',
    className: null,
    style: null,
    transitionOptions: null,
    onShow: null,
    onHide: null
  });

  exports.ScrollTop = ScrollTop;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
