"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _SliderSwitchButton = _interopRequireDefault(require("./SliderSwitchButton"));

var _classNames2 = require("../../lib/classNames");

var _excluded = ["name", "options", "activeValue", "onSwitch"];

var SliderSwitch = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(SliderSwitch, _React$Component);

  var _super = (0, _createSuper2.default)(SliderSwitch);

  function SliderSwitch(props) {
    var _props$activeValue;

    var _this;

    (0, _classCallCheck2.default)(this, SliderSwitch);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "firstButton", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "secondButton", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSwitch", function (value) {
      var onSwitch = _this.props.onSwitch;

      _this.setState(function () {
        return {
          activeValue: value
        };
      }, function () {
        onSwitch && onSwitch(value);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleFirstClick", function () {
      var options = _this.props.options;
      var value = options[0].value;

      _this.onSwitch(value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleSecondClick", function () {
      var options = _this.props.options;
      var value = options[1].value;

      _this.onSwitch(value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleFirstHover", function () {
      _this.setState(function () {
        return {
          hoveredOptionId: 0
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleSecondHover", function () {
      _this.setState(function () {
        return {
          hoveredOptionId: 1
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetFocusedOption", function () {
      _this.setState(function () {
        return {
          hoveredOptionId: -1
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "switchByKey", function (event) {
      if (event.key !== 'Enter' && event.key !== 'Spacebar' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      var options = _this.props.options;
      var activeValue = _this.state.activeValue;

      var _options$find = options.find(function (option) {
        return option.value !== activeValue;
      }),
          value = _options$find.value;

      _this.onSwitch(value);

      if (options[0].value === value) {
        _this.firstButton.current.focus();
      } else {
        _this.secondButton.current.focus();
      }
    });
    _this.state = {
      activeValue: (_props$activeValue = props.activeValue) !== null && _props$activeValue !== void 0 ? _props$activeValue : '',
      hoveredOptionId: -1
    };
    _this.firstButton = /*#__PURE__*/React.createRef();
    _this.secondButton = /*#__PURE__*/React.createRef();
    return _this;
  }

  (0, _createClass2.default)(SliderSwitch, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          name = _this$props.name,
          options = _this$props.options,
          _activeValue = _this$props.activeValue,
          onSwitch = _this$props.onSwitch,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      var _this$state = this.state,
          activeValue = _this$state.activeValue,
          hoveredOptionId = _this$state.hoveredOptionId;

      var _options = (0, _slicedToArray2.default)(options, 2),
          firstOption = _options[0],
          secondOption = _options[1];

      var firstActive = firstOption.value === activeValue;
      var secondActive = secondOption.value === activeValue;
      return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
        vkuiClass: "SliderSwitch",
        onKeyDown: this.switchByKey,
        onMouseLeave: this.resetFocusedOption
      }), !firstActive && !secondActive && (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "SliderSwitch__border"
      }), (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: (0, _classNames2.classNames)('SliderSwitch__slider', (_classNames = {}, (0, _defineProperty2.default)(_classNames, 'SliderSwitch--firstActive', firstActive), (0, _defineProperty2.default)(_classNames, 'SliderSwitch--secondActive', secondActive), _classNames))
      }), (0, _jsxRuntime.createScopedElement)("input", {
        type: "hidden",
        name: name,
        value: activeValue
      }), (0, _jsxRuntime.createScopedElement)(_SliderSwitchButton.default, {
        active: firstActive,
        hovered: hoveredOptionId === 0,
        "aria-pressed": firstActive,
        onClick: this.handleFirstClick,
        onMouseEnter: this.handleFirstHover,
        getRootRef: this.firstButton
      }, firstOption.name), (0, _jsxRuntime.createScopedElement)(_SliderSwitchButton.default, {
        active: secondActive,
        hovered: hoveredOptionId === 1,
        onClick: this.handleSecondClick,
        onMouseEnter: this.handleSecondHover,
        getRootRef: this.secondButton
      }, secondOption.name));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.activeValue && nextProps.activeValue !== prevState.activeValue) {
        return {
          activeValue: nextProps.activeValue
        };
      }

      return null;
    }
  }]);
  return SliderSwitch;
}(React.Component);

exports.default = SliderSwitch;
(0, _defineProperty2.default)(SliderSwitch, "defaultProps", {
  options: [{
    name: '',
    value: ''
  }, {
    name: '',
    value: ''
  }]
});
//# sourceMappingURL=SliderSwitch.js.map