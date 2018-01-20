'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Portal = require('../hoc/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITION = {
  BOTTOM: 'bottom',
  HORIZONTAL: 'horizontal',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  VERTICAL: 'vertical'
};

var defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  showOnClick: false,
  position: POSITION.VERTICAL,
  theme: {}
};

var tooltipFactory = function tooltipFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _defaults$options = _extends({}, defaults, options),
      defaultClassName = _defaults$options.className,
      defaultDelay = _defaults$options.delay,
      defaultHideOnClick = _defaults$options.hideOnClick,
      defaultShowOnClick = _defaults$options.showOnClick,
      defaultPosition = _defaults$options.position,
      defaultTheme = _defaults$options.theme;

  return function (ComposedComponent) {
    var TooltippedComponent = function (_Component) {
      _inherits(TooltippedComponent, _Component);

      function TooltippedComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TooltippedComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TooltippedComponent.__proto__ || Object.getPrototypeOf(TooltippedComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          active: false,
          position: _this.props.tooltipPosition,
          visible: false
        }, _this.onTransformEnd = function (e) {
          if (e.propertyName === 'transform') {
            _events2.default.removeEventListenerOnTransitionEnded(_this.refs.tooltip, _this.onTransformEnd);
            _this.setState({ visible: false });
          }
        }, _this.handleMouseEnter = function (event) {
          _this.activate(_this.calculatePosition(event.currentTarget));
          if (_this.props.onMouseEnter) _this.props.onMouseEnter(event);
        }, _this.handleMouseLeave = function (event) {
          _this.deactivate();
          if (_this.props.onMouseLeave) _this.props.onMouseLeave(event);
        }, _this.handleClick = function (event) {
          if (_this.props.tooltipHideOnClick && _this.state.active) {
            _this.deactivate();
          }

          if (_this.props.tooltipShowOnClick && !_this.state.active) {
            _this.activate(_this.calculatePosition(event.currentTarget));
          }

          if (_this.props.onClick) _this.props.onClick(event);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(TooltippedComponent, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.refs.tooltip) {
            _events2.default.removeEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
          }
        }
      }, {
        key: 'activate',
        value: function activate(_ref2) {
          var _this2 = this;

          var top = _ref2.top,
              left = _ref2.left,
              position = _ref2.position;

          if (this.timeout) clearTimeout(this.timeout);
          this.setState({ visible: true, position: position });
          this.timeout = setTimeout(function () {
            _this2.setState({ active: true, top: top, left: left });
          }, this.props.tooltipDelay);
        }
      }, {
        key: 'deactivate',
        value: function deactivate() {
          if (this.timeout) clearTimeout(this.timeout);
          if (this.state.active) {
            _events2.default.addEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
            this.setState({ active: false });
          } else if (this.state.visible) {
            this.setState({ visible: false });
          }
        }
      }, {
        key: 'getPosition',
        value: function getPosition(element) {
          var tooltipPosition = this.props.tooltipPosition;

          if (tooltipPosition === POSITION.HORIZONTAL) {
            var origin = element.getBoundingClientRect();

            var _utils$getViewport = _utils2.default.getViewport(),
                ww = _utils$getViewport.width;

            var toRight = origin.left < ww / 2 - origin.width / 2;
            return toRight ? POSITION.RIGHT : POSITION.LEFT;
          } else if (tooltipPosition === POSITION.VERTICAL) {
            var _origin = element.getBoundingClientRect();

            var _utils$getViewport2 = _utils2.default.getViewport(),
                wh = _utils$getViewport2.height;

            var toBottom = _origin.top < wh / 2 - _origin.height / 2;
            return toBottom ? POSITION.BOTTOM : POSITION.TOP;
          } else {
            return tooltipPosition;
          }
        }
      }, {
        key: 'calculatePosition',
        value: function calculatePosition(element) {
          var position = this.getPosition(element);

          var _element$getBoundingC = element.getBoundingClientRect(),
              top = _element$getBoundingC.top,
              left = _element$getBoundingC.left,
              height = _element$getBoundingC.height,
              width = _element$getBoundingC.width;

          var xOffset = window.scrollX || window.pageXOffset;
          var yOffset = window.scrollY || window.pageYOffset;
          if (position === POSITION.BOTTOM) {
            return {
              top: top + height + yOffset,
              left: left + width / 2 + xOffset,
              position: position
            };
          } else if (position === POSITION.TOP) {
            return {
              top: top + yOffset,
              left: left + width / 2 + xOffset,
              position: position
            };
          } else if (position === POSITION.LEFT) {
            return {
              top: top + height / 2 + yOffset,
              left: left + xOffset,
              position: position
            };
          } else if (position === POSITION.RIGHT) {
            return {
              top: top + height / 2 + yOffset,
              left: left + width + xOffset,
              position: position
            };
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _classnames;

          var _state = this.state,
              active = _state.active,
              left = _state.left,
              top = _state.top,
              position = _state.position,
              visible = _state.visible;

          var positionClass = 'tooltip' + (position.charAt(0).toUpperCase() + position.slice(1));

          var _props = this.props,
              children = _props.children,
              className = _props.className,
              theme = _props.theme,
              tooltip = _props.tooltip,
              tooltipDelay = _props.tooltipDelay,
              tooltipHideOnClick = _props.tooltipHideOnClick,
              tooltipPosition = _props.tooltipPosition,
              tooltipShowOnClick = _props.tooltipShowOnClick,
              other = _objectWithoutProperties(_props, ['children', 'className', 'theme', 'tooltip', 'tooltipDelay', 'tooltipHideOnClick', 'tooltipPosition', 'tooltipShowOnClick']);

          var _className = (0, _classnames3.default)(theme.tooltip, (_classnames = {}, _defineProperty(_classnames, theme.tooltipActive, active), _defineProperty(_classnames, theme[positionClass], theme[positionClass]), _classnames));

          var isNative = typeof ComposedComponent === 'string';

          return _react2.default.createElement(
            ComposedComponent,
            _extends({}, other, {
              className: className,
              onClick: this.handleClick,
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave
            }, isNative ? {} : { theme: theme }),
            children ? children : null,
            visible && _react2.default.createElement(
              _Portal2.default,
              null,
              _react2.default.createElement(
                'span',
                { ref: 'tooltip', className: _className, 'data-react-toolbox': 'tooltip', style: { top: top, left: left } },
                _react2.default.createElement(
                  'span',
                  { className: theme.tooltipInner },
                  tooltip
                )
              )
            )
          );
        }
      }]);

      return TooltippedComponent;
    }(_react.Component);

    TooltippedComponent.propTypes = {
      children: _react.PropTypes.any,
      className: _react.PropTypes.string,
      onClick: _react.PropTypes.func,
      onMouseEnter: _react.PropTypes.func,
      onMouseLeave: _react.PropTypes.func,
      theme: _react.PropTypes.shape({
        tooltip: _react.PropTypes.string,
        tooltipActive: _react.PropTypes.string,
        tooltipWrapper: _react.PropTypes.string
      }),
      tooltip: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
      tooltipDelay: _react.PropTypes.number,
      tooltipHideOnClick: _react.PropTypes.bool,
      tooltipPosition: _react.PropTypes.oneOf(Object.keys(POSITION).map(function (key) {
        return POSITION[key];
      })),
      tooltipShowOnClick: _react.PropTypes.bool
    };
    TooltippedComponent.defaultProps = {
      className: defaultClassName,
      tooltipDelay: defaultDelay,
      tooltipHideOnClick: defaultHideOnClick,
      tooltipPosition: defaultPosition,
      tooltipShowOnClick: defaultShowOnClick
    };


    return (0, _reactCssThemr.themr)(_identifiers.TOOLTIP, defaultTheme)(TooltippedComponent);
  };
};

exports.default = tooltipFactory;