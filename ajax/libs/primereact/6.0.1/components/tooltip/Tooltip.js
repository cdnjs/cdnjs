"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tip = tip;
exports.Tooltip = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tip(props) {
  var appendTo = props.appendTo || document.body;
  var tooltipWrapper = document.createDocumentFragment();

  _DomHandler.default.appendChild(tooltipWrapper, appendTo);

  props = _objectSpread(_objectSpread({}, props), props.options);

  var tooltipEl = /*#__PURE__*/_react.default.createElement(Tooltip, props);

  _reactDom.default.render(tooltipEl, tooltipWrapper);

  var updateTooltip = function updateTooltip(newProps) {
    props = _objectSpread(_objectSpread({}, props), newProps);

    _reactDom.default.render( /*#__PURE__*/_react.default.cloneElement(tooltipEl, props), tooltipWrapper);
  };

  return {
    destroy: function destroy() {
      _reactDom.default.unmountComponentAtNode(tooltipWrapper);
    },
    updateContent: function updateContent(newContent) {
      updateTooltip({
        content: newContent
      });
    },
    update: function update(newProps) {
      updateTooltip(newProps);
    }
  };
}

var Tooltip = /*#__PURE__*/function (_Component) {
  _inherits(Tooltip, _Component);

  var _super = _createSuper(Tooltip);

  function Tooltip(props) {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _super.call(this, props);
    _this.state = {
      visible: false,
      position: _this.props.position
    };
    _this.appendTo = _this.props.appendTo || document.body;
    _this.show = _this.show.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Tooltip, [{
    key: "getEvents",
    value: function getEvents() {
      var _this$props = this.props,
          showEvent = _this$props.showEvent,
          hideEvent = _this$props.hideEvent;

      if (this.props.mouseTrack) {
        showEvent = 'mousemove';
        hideEvent = 'mouseleave';
      } else if (this.props.event === 'focus') {
        showEvent = 'focus';
        hideEvent = 'blur';
      }

      return {
        showEvent: showEvent,
        hideEvent: hideEvent
      };
    }
  }, {
    key: "updateText",
    value: function updateText(target, callback) {
      if (this.tooltipTextEl) {
        var content = this.props.content;

        if (target && target.hasAttribute('data-pr-tooltip')) {
          content = target.getAttribute('data-pr-tooltip');
        }

        if (content) {
          this.tooltipTextEl.innerHTML = ''; // remove children

          this.tooltipTextEl.appendChild(document.createTextNode(content));
          callback();
        } else if (this.props.children) {
          _reactDom.default.unmountComponentAtNode(this.tooltipTextEl);

          _reactDom.default.render(this.props.children, this.tooltipTextEl, callback);
        }
      }
    }
  }, {
    key: "show",
    value: function show(e) {
      var _this2 = this;

      this.currentTarget = e.currentTarget;

      if (this.isContentEmpty(this.currentTarget)) {
        return;
      }

      var updateTooltipState = function updateTooltipState() {
        _this2.updateText(_this2.currentTarget, function () {
          if (_this2.props.autoZIndex && !_this2.containerEl.style.zIndex) {
            _this2.containerEl.style.zIndex = String(_this2.props.baseZIndex + _DomHandler.default.generateZIndex());
          }

          _this2.containerEl.style.left = '';
          _this2.containerEl.style.top = '';

          _this2.align(_this2.currentTarget, {
            x: e.pageX,
            y: e.pageY
          });
        });
      };

      if (this.state.visible) {
        this.applyDelay('updateDelay', updateTooltipState);
      } else {
        this.sendCallback(this.props.onBeforeShow, {
          originalEvent: e,
          target: this.currentTarget
        });
        this.applyDelay('showDelay', function () {
          _this2.setState({
            visible: true
          }, function () {
            updateTooltipState();

            _this2.sendCallback(_this2.props.onShow, {
              originalEvent: e,
              target: _this2.currentTarget
            });
          });

          _this2.bindDocumentResizeListener();

          _this2.bindScrollListener();
        });
      }
    }
  }, {
    key: "hide",
    value: function hide(e) {
      var _this3 = this;

      this.clearTimeouts();

      if (this.state.visible) {
        this.sendCallback(this.props.onBeforeHide, {
          originalEvent: e,
          target: this.currentTarget
        });
        this.applyDelay('hideDelay', function () {
          _DomHandler.default.removeClass(_this3.containerEl, 'p-tooltip-active');

          _this3.setState({
            visible: false,
            position: _this3.props.position
          }, function () {
            if (_this3.tooltipTextEl) {
              _reactDom.default.unmountComponentAtNode(_this3.tooltipTextEl);
            }

            _this3.unbindDocumentResizeListener();

            _this3.unbindScrollListener();

            _this3.currentTarget = null;
            _this3.scrollHandler = null;

            _this3.sendCallback(_this3.props.onHide, {
              originalEvent: e,
              target: _this3.currentTarget
            });
          });
        });
      }
    }
  }, {
    key: "align",
    value: function align(target, coordinate) {
      var _this4 = this;

      var left = 0,
          top = 0;

      if (this.props.mouseTrack && coordinate) {
        var container = {
          width: _DomHandler.default.getOuterWidth(this.containerEl),
          height: _DomHandler.default.getOuterHeight(this.containerEl)
        };
        left = coordinate.x;
        top = coordinate.y;

        switch (this.state.position) {
          case 'left':
            left -= container.width + this.props.mouseTrackLeft;
            top -= container.height / 2 - this.props.mouseTrackTop;
            break;

          case 'right':
            left += this.props.mouseTrackLeft;
            top -= container.height / 2 - this.props.mouseTrackTop;
            break;

          case 'top':
            left -= container.width / 2 - this.props.mouseTrackLeft;
            top -= container.height + this.props.mouseTrackTop;
            break;

          case 'bottom':
            left -= container.width / 2 - this.props.mouseTrackLeft;
            top += this.props.mouseTrackTop;
            break;

          default:
            break;
        }

        this.containerEl.style.left = left + 'px';
        this.containerEl.style.top = top + 'px';

        _DomHandler.default.addClass(this.containerEl, 'p-tooltip-active');
      } else {
        var pos = _DomHandler.default.findCollisionPosition(this.state.position);

        var my = this.props.my || pos.my;
        var at = this.props.at || pos.at;

        _DomHandler.default.flipfitCollision(this.containerEl, target, my, at, function (currentPosition) {
          var _currentPosition$at = currentPosition.at,
              x = _currentPosition$at.x,
              y = _currentPosition$at.y;
          var position = _this4.props.at ? x !== 'center' ? x : y : currentPosition.at["".concat(pos.axis)];

          _this4.setState({
            position: position
          }, function () {
            return _DomHandler.default.addClass(_this4.containerEl, 'p-tooltip-active');
          });
        });
      }
    }
  }, {
    key: "bindDocumentResizeListener",
    value: function bindDocumentResizeListener() {
      var _this5 = this;

      this.documentResizeListener = function (e) {
        _this5.hide(e);
      };

      window.addEventListener('resize', this.documentResizeListener);
    }
  }, {
    key: "unbindDocumentResizeListener",
    value: function unbindDocumentResizeListener() {
      if (this.documentResizeListener) {
        window.removeEventListener('resize', this.documentResizeListener);
        this.documentResizeListener = null;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this6 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.currentTarget, function (e) {
          if (_this6.state.visible) {
            _this6.hide(e);
          }
        });
      }

      this.scrollHandler.bindScrollListener();
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    }
  }, {
    key: "bindTargetEvent",
    value: function bindTargetEvent(target) {
      if (target) {
        var _this$getEvents = this.getEvents(),
            showEvent = _this$getEvents.showEvent,
            hideEvent = _this$getEvents.hideEvent;

        target.addEventListener(showEvent, this.show);
        target.addEventListener(hideEvent, this.hide);
      }
    }
  }, {
    key: "unbindTargetEvent",
    value: function unbindTargetEvent(target) {
      if (target) {
        var _this$getEvents2 = this.getEvents(),
            showEvent = _this$getEvents2.showEvent,
            hideEvent = _this$getEvents2.hideEvent;

        target.removeEventListener(showEvent, this.show);
        target.removeEventListener(hideEvent, this.hide);
      }
    }
  }, {
    key: "applyDelay",
    value: function applyDelay(delayProp, callback) {
      this.clearTimeouts();
      var delay = this.props[delayProp];

      if (!!delay) {
        this["".concat(delayProp, "Timeout")] = setTimeout(function () {
          return callback();
        }, delay);
      } else {
        callback();
      }
    }
  }, {
    key: "sendCallback",
    value: function sendCallback(callback) {
      if (callback) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        callback.apply(void 0, params);
      }
    }
  }, {
    key: "clearTimeouts",
    value: function clearTimeouts() {
      clearTimeout(this.showDelayTimeout);
      clearTimeout(this.updateDelayTimeout);
      clearTimeout(this.hideDelayTimeout);
    }
  }, {
    key: "loadTargetEvents",
    value: function loadTargetEvents() {
      this.setTargetEventOperations(this.props.target, 'bindTargetEvent');
    }
  }, {
    key: "unloadTargetEvents",
    value: function unloadTargetEvents() {
      this.setTargetEventOperations(this.props.target, 'unbindTargetEvent');
    }
  }, {
    key: "setTargetEventOperations",
    value: function setTargetEventOperations(target, operation) {
      var _this7 = this;

      if (target) {
        if (_DomHandler.default.isElement(target)) {
          this[operation](target);
        } else {
          var setEvent = function setEvent(target) {
            var element = _DomHandler.default.find(document, target);

            element.forEach(function (el) {
              _this7[operation](el);
            });
          };

          if (target instanceof Array) {
            target.forEach(function (t) {
              setEvent(t);
            });
          } else {
            setEvent(target);
          }
        }
      }
    }
  }, {
    key: "isContentEmpty",
    value: function isContentEmpty(target) {
      return !(this.props.content || target && target.getAttribute('data-pr-tooltip') || this.props.children);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.target) {
        this.loadTargetEvents();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this8 = this;

      if (prevProps.target !== this.props.target) {
        this.loadTargetEvents();
      }

      if (this.state.visible && prevProps.content !== this.props.content) {
        this.applyDelay('updateDelay', function () {
          _this8.updateText(_this8.currentTarget, function () {
            _this8.align(_this8.currentTarget);
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearTimeouts();
      this.unbindDocumentResizeListener();
      this.unloadTargetEvents();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this9 = this;

      var tooltipClass = (0, _ClassNames.classNames)('p-tooltip p-component', _defineProperty({}, "p-tooltip-".concat(this.state.position), true), this.props.className);
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this9.containerEl = el;
        },
        className: tooltipClass,
        style: this.props.style
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-tooltip-arrow"
      }), /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this9.tooltipTextEl = el;
        },
        className: "p-tooltip-text"
      }));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.visible) {
        var element = this.renderElement();
        return /*#__PURE__*/_reactDom.default.createPortal(element, this.appendTo);
      }

      return null;
    }
  }]);

  return Tooltip;
}(_react.Component);

exports.Tooltip = Tooltip;

_defineProperty(Tooltip, "defaultProps", {
  target: null,
  content: null,
  className: null,
  style: null,
  appendTo: null,
  position: 'right',
  my: null,
  at: null,
  event: null,
  showEvent: 'mouseenter',
  hideEvent: 'mouseleave',
  autoZIndex: true,
  baseZIndex: 0,
  mouseTrack: false,
  mouseTrackTop: 5,
  mouseTrackLeft: 5,
  showDelay: 0,
  updateDelay: 0,
  hideDelay: 0,
  onBeforeShow: null,
  onBeforeHide: null,
  onShow: null,
  onHide: null
});

_defineProperty(Tooltip, "propTypes", {
  target: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string, _propTypes.default.array]),
  content: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  appendTo: _propTypes.default.object,
  position: _propTypes.default.string,
  my: _propTypes.default.string,
  at: _propTypes.default.string,
  event: _propTypes.default.string,
  showEvent: _propTypes.default.string,
  hideEvent: _propTypes.default.string,
  autoZIndex: _propTypes.default.bool,
  baseZIndex: _propTypes.default.number,
  mouseTrack: _propTypes.default.bool,
  mouseTrackTop: _propTypes.default.number,
  mouseTrackLeft: _propTypes.default.number,
  onBeforeShow: _propTypes.default.func,
  onBeforeHide: _propTypes.default.func,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func
});