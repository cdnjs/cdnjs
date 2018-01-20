'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppBar = exports.appBarFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _IconButton = require('../button/IconButton.js');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(IconButton) {
  var AppBar = function (_React$Component) {
    _inherits(AppBar, _React$Component);

    function AppBar() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, AppBar);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AppBar.__proto__ || Object.getPrototypeOf(AppBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hidden: false, height: 0 }, _this.initializeScroll = function () {
        window.addEventListener('scroll', _this.handleScroll);

        var _this$rootNode$getBou = _this.rootNode.getBoundingClientRect(),
            height = _this$rootNode$getBou.height;

        _this.curScroll = window.scrollY;
        _this.setState({ height: height });
      }, _this.endScroll = function () {
        window.removeEventListener('scroll', _this.handleScroll);
      }, _this.handleScroll = function () {
        var scrollDiff = _this.curScroll - window.scrollY;
        var hidden = scrollDiff < 0 && window.scrollY !== undefined && window.scrollY > _this.state.height;
        _this.setState({ hidden: hidden });
        _this.curScroll = window.scrollY;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AppBar, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.scrollHide) {
          this.initializeScroll();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!this.props.scrollHide && nextProps.scrollHide) {
          this.initializeScroll();
        }

        if (this.props.scrollHide && !nextProps.scrollHide) {
          this.endScroll();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.props.scrollHide) {
          this.endScroll();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames,
            _this2 = this;

        var _props = this.props,
            children = _props.children,
            leftIcon = _props.leftIcon,
            onLeftIconClick = _props.onLeftIconClick,
            onRightIconClick = _props.onRightIconClick,
            rightIcon = _props.rightIcon,
            theme = _props.theme,
            title = _props.title;

        var className = (0, _classnames3.default)(theme.appBar, (_classnames = {}, _defineProperty(_classnames, theme.fixed, this.props.fixed), _defineProperty(_classnames, theme.flat, this.props.flat), _defineProperty(_classnames, theme.scrollHide, this.state.hidden), _classnames), this.props.className);

        return _react2.default.createElement(
          'header',
          {
            className: className,
            'data-react-toolbox': 'app-bar',
            ref: function ref(node) {
              _this2.rootNode = node;
            }
          },
          leftIcon && _react2.default.createElement(IconButton, {
            inverse: true,
            className: (0, _classnames3.default)(theme.leftIcon),
            onClick: onLeftIconClick,
            icon: leftIcon }),
          title && _react2.default.createElement(
            'h1',
            { className: (0, _classnames3.default)(theme.title) },
            title
          ),
          children,
          rightIcon && _react2.default.createElement(IconButton, {
            inverse: true,
            className: (0, _classnames3.default)(theme.rightIcon),
            onClick: onRightIconClick,
            icon: rightIcon })
        );
      }
    }]);

    return AppBar;
  }(_react2.default.Component);

  AppBar.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    fixed: _react.PropTypes.bool,
    flat: _react.PropTypes.bool,
    leftIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    onLeftIconClick: _react.PropTypes.func,
    onRightIconClick: _react.PropTypes.func,
    rightIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    scrollHide: _react.PropTypes.bool,
    theme: _react.PropTypes.shape({
      appBar: _react.PropTypes.string,
      fixed: _react.PropTypes.string,
      flat: _react.PropTypes.string,
      leftIcon: _react.PropTypes.string,
      rightIcon: _react.PropTypes.string,
      scrollHide: _react.PropTypes.string,
      title: _react.PropTypes.string
    }),
    title: _react.PropTypes.string
  };
  AppBar.defaultProps = {
    className: '',
    fixed: false,
    flat: false,
    scrollHide: false
  };


  return AppBar;
};

var AppBar = factory(_IconButton2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.APP_BAR)(AppBar);
exports.appBarFactory = factory;
exports.AppBar = AppBar;