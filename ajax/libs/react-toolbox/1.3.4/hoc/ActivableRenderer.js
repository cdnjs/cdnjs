'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActivableRendererFactory = function ActivableRendererFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { delay: 500 };
  return function (ActivableComponent) {
    var _class, _temp2;

    return _temp2 = _class = function (_Component) {
      _inherits(ActivableRenderer, _Component);

      function ActivableRenderer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ActivableRenderer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActivableRenderer.__proto__ || Object.getPrototypeOf(ActivableRenderer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          active: _this.props.active,
          rendered: _this.props.active
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(ActivableRenderer, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (nextProps.active && !this.props.active) this.renderAndActivate();
          if (!nextProps.active && this.props.active) this.deactivateAndUnrender();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          clearTimeout(this.activateTimeout);
          clearTimeout(this.unrenderTimeout);
        }
      }, {
        key: 'renderAndActivate',
        value: function renderAndActivate() {
          var _this2 = this;

          if (this.unrenderTimeout) clearTimeout(this.unrenderTimeout);
          this.setState({ rendered: true, active: false }, function () {
            _this2.activateTimeout = setTimeout(function () {
              return _this2.setState({ active: true });
            }, 20);
          });
        }
      }, {
        key: 'deactivateAndUnrender',
        value: function deactivateAndUnrender() {
          var _this3 = this;

          this.setState({ rendered: true, active: false }, function () {
            _this3.unrenderTimeout = setTimeout(function () {
              _this3.setState({ rendered: false });
              _this3.unrenderTimeout = null;
            }, _this3.props.delay);
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props,
              delay = _props.delay,
              others = _objectWithoutProperties(_props, ['delay']); // eslint-disable-line no-unused-vars


          var _state = this.state,
              active = _state.active,
              rendered = _state.rendered;

          return rendered ? _react2.default.createElement(ActivableComponent, _extends({}, others, { active: active })) : null;
        }
      }]);

      return ActivableRenderer;
    }(_react.Component), _class.propTypes = {
      active: _react.PropTypes.bool.isRequired,
      children: _react.PropTypes.any,
      delay: _react.PropTypes.number
    }, _class.defaultProps = {
      delay: options.delay
    }, _temp2;
  };
};

exports.default = ActivableRendererFactory;