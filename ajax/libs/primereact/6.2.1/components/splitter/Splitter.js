"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Splitter = exports.SplitterPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SplitterPanel = /*#__PURE__*/function (_Component) {
  _inherits(SplitterPanel, _Component);

  var _super = _createSuper(SplitterPanel);

  function SplitterPanel() {
    _classCallCheck(this, SplitterPanel);

    return _super.apply(this, arguments);
  }

  return SplitterPanel;
}(_react.Component);

exports.SplitterPanel = SplitterPanel;

_defineProperty(SplitterPanel, "defaultProps", {
  size: null,
  minSize: null,
  style: null,
  className: null
});

_defineProperty(SplitterPanel, "propTypes", {
  header: _propTypes.default.number,
  minSize: _propTypes.default.number,
  style: _propTypes.default.object,
  className: _propTypes.default.string
});

var Splitter = /*#__PURE__*/function (_Component2) {
  _inherits(Splitter, _Component2);

  var _super2 = _createSuper(Splitter);

  function Splitter(props) {
    var _this;

    _classCallCheck(this, Splitter);

    _this = _super2.call(this, props);
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    return _this;
  }

  _createClass(Splitter, [{
    key: "bindMouseListeners",
    value: function bindMouseListeners() {
      var _this2 = this;

      if (!this.mouseMoveListener) {
        this.mouseMoveListener = function (event) {
          return _this2.onResize(event);
        };

        document.addEventListener('mousemove', this.mouseMoveListener);
      }

      if (!this.mouseUpListener) {
        this.mouseUpListener = function (event) {
          _this2.onResizeEnd(event);

          _this2.unbindMouseListeners();
        };

        document.addEventListener('mouseup', this.mouseUpListener);
      }
    }
  }, {
    key: "validateResize",
    value: function validateResize(newPrevPanelSize, newNextPanelSize) {
      if (this.props.children[0].props && this.props.children[0].props.minSize && this.props.children[0].props.minSize > newPrevPanelSize) {
        return false;
      }

      if (this.props.children[1].props && this.props.children[1].props.minSize && this.props.children[1].props.minSize > newNextPanelSize) {
        return false;
      }

      return true;
    }
  }, {
    key: "unbindMouseListeners",
    value: function unbindMouseListeners() {
      if (this.mouseMoveListener) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        this.mouseMoveListener = null;
      }

      if (this.mouseUpListener) {
        document.removeEventListener('mouseup', this.mouseUpListener);
        this.mouseUpListener = null;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.dragging = false;
      this.size = null;
      this.startPos = null;
      this.prevPanelElement = null;
      this.nextPanelElement = null;
      this.prevPanelSize = null;
      this.nextPanelSize = null;
      this.gutterElement = null;
      this.prevPanelIndex = null;
    }
  }, {
    key: "isStateful",
    value: function isStateful() {
      return this.props.stateKey != null;
    }
  }, {
    key: "getStorage",
    value: function getStorage() {
      switch (this.props.stateStorage) {
        case 'local':
          return window.localStorage;

        case 'session':
          return window.sessionStorage;

        default:
          throw new Error(this.props.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
      }
    }
  }, {
    key: "saveState",
    value: function saveState() {
      this.getStorage().setItem(this.props.stateKey, JSON.stringify(this.panelSizes));
    }
  }, {
    key: "restoreState",
    value: function restoreState() {
      var _this3 = this;

      var storage = this.getStorage();
      var stateString = storage.getItem(this.props.stateKey);

      if (stateString) {
        this.panelSizes = JSON.parse(stateString);

        var children = _toConsumableArray(this.container.children).filter(function (child) {
          return _DomHandler.default.hasClass(child, 'p-splitter-panel');
        });

        children.forEach(function (child, i) {
          child.style.flexBasis = 'calc(' + _this3.panelSizes[i] + '% - ' + (_this3.props.children.length - 1) * _this3.props.gutterSize + 'px)';
        });
        return true;
      }

      return false;
    }
  }, {
    key: "onResizeStart",
    value: function onResizeStart(event, index) {
      this.gutterElement = event.currentTarget;
      this.size = this.horizontal ? _DomHandler.default.getWidth(this.container) : _DomHandler.default.getHeight(this.container);
      this.dragging = true;
      this.startPos = this.props.layout === 'horizontal' ? event.pageX : event.pageY;
      this.prevPanelElement = this.gutterElement.previousElementSibling;
      this.nextPanelElement = this.gutterElement.nextElementSibling;
      this.prevPanelSize = 100 * (this.props.layout === 'horizontal' ? _DomHandler.default.getOuterWidth(this.prevPanelElement, true) : _DomHandler.default.getOuterHeight(this.prevPanelElement, true)) / this.size;
      this.nextPanelSize = 100 * (this.props.layout === 'horizontal' ? _DomHandler.default.getOuterWidth(this.nextPanelElement, true) : _DomHandler.default.getOuterHeight(this.nextPanelElement, true)) / this.size;
      this.prevPanelIndex = index;

      _DomHandler.default.addClass(this.gutterElement, 'p-splitter-gutter-resizing');

      _DomHandler.default.addClass(this.container, 'p-splitter-resizing');
    }
  }, {
    key: "onResize",
    value: function onResize(event) {
      var newPos;
      if (this.props.layout === 'horizontal') newPos = event.pageX * 100 / this.size - this.startPos * 100 / this.size;else newPos = event.pageY * 100 / this.size - this.startPos * 100 / this.size;
      var newPrevPanelSize = this.prevPanelSize + newPos;
      var newNextPanelSize = this.nextPanelSize - newPos;

      if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
        this.prevPanelElement.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (this.props.children.length - 1) * this.props.gutterSize + 'px)';
        this.nextPanelElement.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (this.props.children.length - 1) * this.props.gutterSize + 'px)';
        this.panelSizes[this.prevPanelIndex] = newPrevPanelSize;
        this.panelSizes[this.prevPanelIndex + 1] = newNextPanelSize;
      }
    }
  }, {
    key: "onResizeEnd",
    value: function onResizeEnd(event) {
      if (this.isStateful()) {
        this.saveState();
      }

      if (this.props.onResizeEnd) {
        this.props.onResizeEnd({
          originalEvent: event,
          sizes: this.panelSizes
        });
      }

      _DomHandler.default.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');

      _DomHandler.default.removeClass(this.container, 'p-splitter-resizing');

      this.clear();
    }
  }, {
    key: "onGutterMouseDown",
    value: function onGutterMouseDown(event, index) {
      this.onResizeStart(event, index);
      this.bindMouseListeners();
    }
  }, {
    key: "onGutterTouchStart",
    value: function onGutterTouchStart(event, index) {
      this.onResizeStart(event, index);
      this.windowTouchMoveListener = this.onGutterTouchMove.bind(this);
      this.windowTouchEndListener = this.onGutterTouchEnd.bind(this);
      window.addEventListener('touchmove', this.windowTouchMoveListener, {
        passive: false,
        cancelable: false
      });
      window.addEventListener('touchend', this.windowTouchEndListener);
    }
  }, {
    key: "onGutterTouchMove",
    value: function onGutterTouchMove(event) {
      this.onResize(event);
    }
  }, {
    key: "onGutterTouchEnd",
    value: function onGutterTouchEnd(event) {
      this.onResizeEnd(event);
      window.removeEventListener('touchmove', this.windowTouchMoveListener);
      window.removeEventListener('touchend', this.windowTouchEndListener);
      this.windowTouchMoveListener = null;
      this.windowTouchEndListener = null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      if (this.panelElement) {
        if (this.panelElement.childNodes && _DomHandler.default.find(this.panelElement, '.p-splitter')) {
          _DomHandler.default.addClass(this.panelElement, 'p-splitter-panel-nested');
        }
      }

      if (this.props.children && this.props.children.length) {
        var initialized = false;

        if (this.isStateful()) {
          initialized = this.restoreState();
        }

        if (!initialized) {
          var children = _toConsumableArray(this.container.children).filter(function (child) {
            return _DomHandler.default.hasClass(child, 'p-splitter-panel');
          });

          var _panelSizes = [];
          this.props.children.map(function (panel, i) {
            var panelInitialSize = panel.props && panel.props.size ? panel.props.size : null;
            var panelSize = panelInitialSize || 100 / _this4.props.children.length;
            _panelSizes[i] = panelSize;
            children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (_this4.props.children.length - 1) * _this4.props.gutterSize + 'px)';
            return _panelSizes;
          });
          this.panelSizes = _panelSizes;
        }
      }
    }
  }, {
    key: "renderPanel",
    value: function renderPanel(panel, index) {
      var _this5 = this;

      var panelClassName = (0, _ClassNames.classNames)('p-splitter-panel', panel.props.className);
      var gutterStyle = this.props.layout === 'horizontal' ? {
        width: this.props.gutterSize + 'px'
      } : {
        height: this.props.gutterSize + 'px'
      };

      var gutter = index !== this.props.children.length - 1 && /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.gutterElement = el;
        },
        className: 'p-splitter-gutter',
        style: gutterStyle,
        onMouseDown: function onMouseDown(event) {
          return _this5.onGutterMouseDown(event, index);
        },
        onTouchStart: function onTouchStart(event) {
          return _this5.onGutterTouchStart(event, index);
        },
        onTouchMove: function onTouchMove(event) {
          return _this5.onGutterTouchMove(event);
        },
        onTouchEnd: function onTouchEnd(event) {
          return _this5.onGutterTouchEnd(event);
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-splitter-gutter-handle"
      }));

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.panelElement = el;
        },
        key: index,
        className: panelClassName,
        style: panel.props.style
      }, panel.props.children), gutter);
    }
  }, {
    key: "renderPanels",
    value: function renderPanels() {
      var _this6 = this;

      return _react.default.Children.map(this.props.children, function (panel, index) {
        return _this6.renderPanel(panel, index);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var className = (0, _ClassNames.classNames)("p-splitter p-component p-splitter-".concat(this.props.layout), this.props.className);
      var panels = this.renderPanels();
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this7.container = el;
        },
        id: this.id,
        className: className,
        style: this.props.style
      }, panels);
    }
  }]);

  return Splitter;
}(_react.Component);

exports.Splitter = Splitter;

_defineProperty(Splitter, "defaultProps", {
  id: null,
  className: null,
  style: null,
  layout: 'horizontal',
  gutterSize: 4,
  stateKey: null,
  stateStorage: 'session',
  onResizeEnd: null
});

_defineProperty(Splitter, "propTypes", {
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  layout: _propTypes.default.string,
  gutterSize: _propTypes.default.number,
  stateKey: _propTypes.default.string,
  stateStorage: _propTypes.default.string,
  onResizeEnd: _propTypes.default.func
});