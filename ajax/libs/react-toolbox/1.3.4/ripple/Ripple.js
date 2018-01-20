'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _prefixer = require('../utils/prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaults = {
  centered: false,
  className: '',
  multiple: true,
  spread: 2,
  theme: {}
};

var rippleFactory = function rippleFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _defaults$options = _extends({}, defaults, options),
      defaultCentered = _defaults$options.centered,
      defaultClassName = _defaults$options.className,
      defaultMultiple = _defaults$options.multiple,
      defaultSpread = _defaults$options.spread,
      defaultTheme = _defaults$options.theme,
      props = _objectWithoutProperties(_defaults$options, ['centered', 'className', 'multiple', 'spread', 'theme']);

  return function (ComposedComponent) {
    var RippledComponent = function (_Component) {
      _inherits(RippledComponent, _Component);

      function RippledComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RippledComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RippledComponent.__proto__ || Object.getPrototypeOf(RippledComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          ripples: {}
        }, _this.handleMouseDown = function (event) {
          if (_this.props.onMouseDown) _this.props.onMouseDown(event);
          if (!_this.props.disabled) {
            var _events$getMousePosit = _events2.default.getMousePosition(event),
                x = _events$getMousePosit.x,
                y = _events$getMousePosit.y;

            _this.animateRipple(x, y, false);
          }
        }, _this.handleTouchStart = function (event) {
          if (_this.props.onTouchStart) _this.props.onTouchStart(event);
          if (!_this.props.disabled) {
            var _events$getTouchPosit = _events2.default.getTouchPosition(event),
                x = _events$getTouchPosit.x,
                y = _events$getTouchPosit.y;

            _this.animateRipple(x, y, true);
          }
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(RippledComponent, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
          // If a new ripple was just added, add a remove event listener to its animation
          if (Object.keys(prevState.ripples).length < Object.keys(this.state.ripples).length) {
            this.addRippleRemoveEventListener(this.getLastKey());
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var _this2 = this;

          // Remove document event listeners for ripple if they still exists
          Object.keys(this.state.ripples).forEach(function (key) {
            _this2.state.ripples[key].endRipple();
          });
        }

        /**
         * Add an event listener to the reference with given key so when the animation transition
         * ends we can be sure that it finished and it can be safely removed from the state.
         * This function is called whenever a new ripple is added to the component.
         *
         * @param {String} rippleKey Is the key of the ripple to add the event.
         */

      }, {
        key: 'addRippleRemoveEventListener',
        value: function addRippleRemoveEventListener(rippleKey) {
          var self = this;
          _events2.default.addEventListenerOnTransitionEnded(this.refs[rippleKey], function onOpacityEnd(e) {
            if (e.propertyName === 'opacity') {
              if (self.props.onRippleEnded) self.props.onRippleEnded(e);
              _events2.default.removeEventListenerOnTransitionEnded(self.refs[rippleKey], onOpacityEnd);
              self.setState({ ripples: _utils2.default.removeObjectKey(rippleKey, self.state.ripples) });
            }
          });
        }

        /**
         * Start a ripple animation on an specific point with touch or mouse events. First
         * decides if the animation should trigger. If the ripple is multiple or there is no
         * ripple present, it creates a new key. If it's a simple ripple and already exists,
         * it just restarts the current ripple. The animation happens in two state changes
         * to allow triggering via css.
         *
         * @param {Number} x Coordinate X on the screen where animation should start
         * @param {Number} y Coordinate Y on the screen where animation should start
         * @param {Boolean} isTouch Use events from touch or mouse.
         */

      }, {
        key: 'animateRipple',
        value: function animateRipple(x, y, isTouch) {
          var _this3 = this;

          if (this.rippleShouldTrigger(isTouch)) {
            (function () {
              var _getDescriptor = _this3.getDescriptor(x, y),
                  top = _getDescriptor.top,
                  left = _getDescriptor.left,
                  width = _getDescriptor.width;

              var noRipplesActive = Object.keys(_this3.state.ripples).length === 0;
              var key = _this3.props.rippleMultiple || noRipplesActive ? _this3.getNextKey() : _this3.getLastKey();
              var endRipple = _this3.addRippleDeactivateEventListener(isTouch, key);
              var initialState = { active: false, restarting: true, top: top, left: left, width: width, endRipple: endRipple };
              var runningState = { active: true, restarting: false };
              _this3.setState((0, _immutabilityHelper2.default)(_this3.state, { ripples: _defineProperty({}, key, { $set: initialState }) }), function () {
                _this3.refs[key].offsetWidth; //eslint-disable-line no-unused-expressions
                _this3.setState((0, _immutabilityHelper2.default)(_this3.state, { ripples: _defineProperty({}, key, { $merge: runningState }) }));
              });
            })();
          }
        }

        /**
         * Determine if a ripple should start depending if its a touch event. For mobile both
         * touchStart and mouseDown are launched so in case is touch we should always trigger
         * but if its not we should check if a touch was already triggered to decide.
         *
         * @param {Boolean} isTouch True in case a touch event triggered the ripple false otherwise.
         * @return {Boolean} True in case the ripple should trigger or false if it shouldn't.
         */

      }, {
        key: 'rippleShouldTrigger',
        value: function rippleShouldTrigger(isTouch) {
          var shouldStart = isTouch ? true : !this.touchCache;
          this.touchCache = isTouch;
          return shouldStart;
        }

        /**
         * Find out a descriptor object for the ripple element being created depending on
         * the position where the it was triggered and the component's dimensions.
         *
         * @param {Number} x Coordinate x in the viewport where ripple was triggered
         * @param {Number} y Coordinate y in the viewport where ripple was triggered
         * @return {Object} Descriptor element including position and size of the element
         */

      }, {
        key: 'getDescriptor',
        value: function getDescriptor(x, y) {
          var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(this).getBoundingClientRect(),
              left = _ReactDOM$findDOMNode.left,
              top = _ReactDOM$findDOMNode.top,
              height = _ReactDOM$findDOMNode.height,
              width = _ReactDOM$findDOMNode.width;

          var _props = this.props,
              centered = _props.rippleCentered,
              spread = _props.rippleSpread;

          return {
            left: centered ? 0 : x - left - width / 2,
            top: centered ? 0 : y - top - height / 2,
            width: width * spread
          };
        }

        /**
         * Increments and internal counter and returns the next value as a string. It
         * is used to assign key references to new ripple elements.
         *
         * @return {String} Key to be assigned to a ripple.
         */

      }, {
        key: 'getNextKey',
        value: function getNextKey() {
          this.currentCount = this.currentCount ? this.currentCount + 1 : 1;
          return 'ripple' + this.currentCount;
        }

        /**
         * Return the last generated key for a ripple element. When there is only one ripple
         * and to get the reference when a ripple was just created.
         *
         * @return {String} The last generated ripple key.
         */

      }, {
        key: 'getLastKey',
        value: function getLastKey() {
          return 'ripple' + this.currentCount;
        }

        /**
         * Add an event listener to the document needed to deactivate a ripple and make it dissappear.
         * Deactivation can happen with a touchend or mouseup depending on the trigger type. The
         * ending function is created from a factory function and returned.
         *
         * @param {Boolean} isTouch True in case the trigger was a touch event false otherwise.
         * @param {String} rippleKey It's a key to identify the ripple that should be deactivated.
         * @return {Function} Callback function that deactivates the ripple and removes the event listener
         */

      }, {
        key: 'addRippleDeactivateEventListener',
        value: function addRippleDeactivateEventListener(isTouch, rippleKey) {
          var eventType = isTouch ? 'touchend' : 'mouseup';
          var endRipple = this.createRippleDeactivateCallback(eventType, rippleKey);
          document.addEventListener(eventType, endRipple);
          return endRipple;
        }

        /**
         * Generates a function that can be called to deactivate a given ripple and remove its finishing
         * event listener. If is generated because we need to store it to be called on unmount in case
         * the ripple is still running.
         *
         * @param {String} eventType Is the event type that can be touchend or mouseup
         * @param {String} rippleKey Is the key representing the ripple
         * @return {Function} Callback function that deactivates the ripple and removes the listener
         */

      }, {
        key: 'createRippleDeactivateCallback',
        value: function createRippleDeactivateCallback(eventType, rippleKey) {
          var self = this;
          return function endRipple() {
            document.removeEventListener(eventType, endRipple);
            self.setState({ ripples: (0, _immutabilityHelper2.default)(self.state.ripples, _defineProperty({}, rippleKey, { $merge: { active: false } })) });
          };
        }
      }, {
        key: 'renderRipple',
        value: function renderRipple(key, className, _ref2) {
          var _classnames;

          var active = _ref2.active,
              left = _ref2.left,
              restarting = _ref2.restarting,
              top = _ref2.top,
              width = _ref2.width;

          var scale = restarting ? 0 : 1;
          var transform = 'translate3d(' + (-width / 2 + left) + 'px, ' + (-width / 2 + top) + 'px, 0) scale(' + scale + ')';
          var _className = (0, _classnames3.default)(this.props.theme.ripple, (_classnames = {}, _defineProperty(_classnames, this.props.theme.rippleActive, active), _defineProperty(_classnames, this.props.theme.rippleRestarting, restarting), _classnames), className);
          return _react2.default.createElement(
            'span',
            _extends({ key: key, 'data-react-toolbox': 'ripple', className: this.props.theme.rippleWrapper }, props),
            _react2.default.createElement('span', {
              role: 'ripple',
              ref: key,
              className: _className,
              style: (0, _prefixer2.default)({ transform: transform }, { width: width, height: width })
            })
          );
        }
      }, {
        key: 'render',
        value: function render() {
          var _this4 = this;

          var ripples = this.state.ripples;

          var _props2 = this.props,
              onRippleEnded = _props2.onRippleEnded,
              rippleCentered = _props2.rippleCentered,
              rippleMultiple = _props2.rippleMultiple,
              rippleSpread = _props2.rippleSpread,
              children = _props2.children,
              ripple = _props2.ripple,
              rippleClassName = _props2.rippleClassName,
              other = _objectWithoutProperties(_props2, ['onRippleEnded', 'rippleCentered', 'rippleMultiple', 'rippleSpread', 'children', 'ripple', 'rippleClassName']);

          if (!ripple) return _react2.default.createElement(ComposedComponent, _extends({ children: children }, other));
          return _react2.default.createElement(
            ComposedComponent,
            _extends({}, other, { onMouseDown: this.handleMouseDown, onTouchStart: this.handleTouchStart }),
            children,
            Object.keys(ripples).map(function (key) {
              return _this4.renderRipple(key, rippleClassName, ripples[key]);
            })
          );
        }
      }]);

      return RippledComponent;
    }(_react.Component);

    RippledComponent.propTypes = {
      children: _react.PropTypes.any,
      disabled: _react.PropTypes.bool,
      onRippleEnded: _react.PropTypes.func,
      ripple: _react.PropTypes.bool,
      rippleCentered: _react.PropTypes.bool,
      rippleClassName: _react.PropTypes.string,
      rippleMultiple: _react.PropTypes.bool,
      rippleSpread: _react.PropTypes.number,
      theme: _react.PropTypes.shape({
        ripple: _react.PropTypes.string,
        rippleActive: _react.PropTypes.string,
        rippleRestarting: _react.PropTypes.string,
        rippleWrapper: _react.PropTypes.string
      })
    };
    RippledComponent.defaultProps = {
      disabled: false,
      ripple: true,
      rippleCentered: defaultCentered,
      rippleClassName: defaultClassName,
      rippleMultiple: defaultMultiple,
      rippleSpread: defaultSpread
    };


    return (0, _reactCssThemr.themr)(_identifiers.RIPPLE, defaultTheme)(RippledComponent);
  };
};

exports.default = rippleFactory;