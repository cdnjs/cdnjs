"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ClassNames = require("../utils/ClassNames");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScrollPanel = /*#__PURE__*/function (_Component) {
  _inherits(ScrollPanel, _Component);

  var _super = _createSuper(ScrollPanel);

  function ScrollPanel(props) {
    var _this;

    _classCallCheck(this, ScrollPanel);

    _this = _super.call(this, props);
    _this.moveBar = _this.moveBar.bind(_assertThisInitialized(_this));
    _this.onXBarMouseDown = _this.onXBarMouseDown.bind(_assertThisInitialized(_this));
    _this.onYBarMouseDown = _this.onYBarMouseDown.bind(_assertThisInitialized(_this));
    _this.onDocumentMouseMove = _this.onDocumentMouseMove.bind(_assertThisInitialized(_this));
    _this.onDocumentMouseUp = _this.onDocumentMouseUp.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ScrollPanel, [{
    key: "calculateContainerHeight",
    value: function calculateContainerHeight() {
      var containerStyles = getComputedStyle(this.container),
          xBarStyles = getComputedStyle(this.xBar),
          pureContainerHeight = _DomHandler.default.getHeight(this.container) - parseInt(xBarStyles['height'], 10);

      if (containerStyles['max-height'] !== "none" && pureContainerHeight === 0) {
        if (this.content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
          this.container.style.height = containerStyles['max-height'];
        } else {
          this.container.style.height = this.content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
        }
      }
    }
  }, {
    key: "moveBar",
    value: function moveBar() {
      var _this2 = this;

      /* horizontal scroll */
      var totalWidth = this.content.scrollWidth;
      var ownWidth = this.content.clientWidth;
      var bottom = (this.container.clientHeight - this.xBar.clientHeight) * -1;
      this.scrollXRatio = ownWidth / totalWidth;
      /* vertical scroll */

      var totalHeight = this.content.scrollHeight;
      var ownHeight = this.content.clientHeight;
      var right = (this.container.clientWidth - this.yBar.clientWidth) * -1;
      this.scrollYRatio = ownHeight / totalHeight;
      this.frame = this.requestAnimationFrame(function () {
        if (_this2.scrollXRatio >= 1) {
          _DomHandler.default.addClass(_this2.xBar, 'p-scrollpanel-hidden');
        } else {
          _DomHandler.default.removeClass(_this2.xBar, 'p-scrollpanel-hidden');

          _this2.xBar.style.cssText = 'width:' + Math.max(_this2.scrollXRatio * 100, 10) + '%; left:' + _this2.content.scrollLeft / totalWidth * 100 + '%;bottom:' + bottom + 'px;';
        }

        if (_this2.scrollYRatio >= 1) {
          _DomHandler.default.addClass(_this2.yBar, 'p-scrollpanel-hidden');
        } else {
          _DomHandler.default.removeClass(_this2.yBar, 'p-scrollpanel-hidden');

          _this2.yBar.style.cssText = 'height:' + Math.max(_this2.scrollYRatio * 100, 10) + '%; top: calc(' + _this2.content.scrollTop / totalHeight * 100 + '% - ' + _this2.xBar.clientHeight + 'px);right:' + right + 'px;';
        }
      });
    }
  }, {
    key: "onYBarMouseDown",
    value: function onYBarMouseDown(e) {
      this.isYBarClicked = true;
      this.lastPageY = e.pageY;

      _DomHandler.default.addClass(this.yBar, 'p-scrollpanel-grabbed');

      _DomHandler.default.addClass(document.body, 'p-scrollpanel-grabbed');

      document.addEventListener('mousemove', this.onDocumentMouseMove);
      document.addEventListener('mouseup', this.onDocumentMouseUp);
      e.preventDefault();
    }
  }, {
    key: "onXBarMouseDown",
    value: function onXBarMouseDown(e) {
      this.isXBarClicked = true;
      this.lastPageX = e.pageX;

      _DomHandler.default.addClass(this.xBar, 'p-scrollpanel-grabbed');

      _DomHandler.default.addClass(document.body, 'p-scrollpanel-grabbed');

      document.addEventListener('mousemove', this.onDocumentMouseMove);
      document.addEventListener('mouseup', this.onDocumentMouseUp);
      e.preventDefault();
    }
  }, {
    key: "onDocumentMouseMove",
    value: function onDocumentMouseMove(e) {
      if (this.isXBarClicked) {
        this.onMouseMoveForXBar(e);
      } else if (this.isYBarClicked) {
        this.onMouseMoveForYBar(e);
      } else {
        this.onMouseMoveForXBar(e);
        this.onMouseMoveForYBar(e);
      }
    }
  }, {
    key: "onMouseMoveForXBar",
    value: function onMouseMoveForXBar(e) {
      var _this3 = this;

      var deltaX = e.pageX - this.lastPageX;
      this.lastPageX = e.pageX;
      this.frame = this.requestAnimationFrame(function () {
        _this3.content.scrollLeft += deltaX / _this3.scrollXRatio;
      });
    }
  }, {
    key: "onMouseMoveForYBar",
    value: function onMouseMoveForYBar(e) {
      var _this4 = this;

      var deltaY = e.pageY - this.lastPageY;
      this.lastPageY = e.pageY;
      this.frame = this.requestAnimationFrame(function () {
        _this4.content.scrollTop += deltaY / _this4.scrollYRatio;
      });
    }
  }, {
    key: "onDocumentMouseUp",
    value: function onDocumentMouseUp(e) {
      _DomHandler.default.removeClass(this.yBar, 'p-scrollpanel-grabbed');

      _DomHandler.default.removeClass(this.xBar, 'p-scrollpanel-grabbed');

      _DomHandler.default.removeClass(document.body, 'p-scrollpanel-grabbed');

      document.removeEventListener('mousemove', this.onDocumentMouseMove);
      document.removeEventListener('mouseup', this.onDocumentMouseUp);
      this.isXBarClicked = false;
      this.isYBarClicked = false;
    }
  }, {
    key: "requestAnimationFrame",
    value: function requestAnimationFrame(f) {
      var frame = window.requestAnimationFrame || this.timeoutFrame;
      return frame(f);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.moveBar();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.moveBar();
      this.moveBar = this.moveBar.bind(this);
      window.addEventListener('resize', this.moveBar);
      this.calculateContainerHeight();
      this.initialized = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.initialized) {
        window.removeEventListener('resize', this.moveBar);
      }

      if (this.frame) {
        window.cancelAnimationFrame(this.frame);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var className = (0, _ClassNames.classNames)('p-scrollpanel p-component', this.props.className);
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.container = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-scrollpanel-wrapper"
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.content = el;
        },
        className: "p-scrollpanel-content",
        onScroll: this.moveBar,
        onMouseEnter: this.moveBar
      }, this.props.children)), /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.xBar = el;
        },
        className: "p-scrollpanel-bar p-scrollpanel-bar-x",
        onMouseDown: this.onXBarMouseDown
      }), /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.yBar = el;
        },
        className: "p-scrollpanel-bar p-scrollpanel-bar-y",
        onMouseDown: this.onYBarMouseDown
      }));
    }
  }]);

  return ScrollPanel;
}(_react.Component);

exports.ScrollPanel = ScrollPanel;

_defineProperty(ScrollPanel, "defaultProps", {
  id: null,
  style: null,
  className: null
});

_defineProperty(ScrollPanel, "propTypes", {
  id: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string
});