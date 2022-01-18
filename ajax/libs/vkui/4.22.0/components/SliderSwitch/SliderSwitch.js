import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["name", "options", "activeValue", "onSwitch"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import SliderSwitchButton from "./SliderSwitchButton";
import { classNames } from "../../lib/classNames";

var SliderSwitch = /*#__PURE__*/function (_React$Component) {
  _inherits(SliderSwitch, _React$Component);

  var _super = _createSuper(SliderSwitch);

  function SliderSwitch(props) {
    var _props$activeValue;

    var _this;

    _classCallCheck(this, SliderSwitch);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "firstButton", void 0);

    _defineProperty(_assertThisInitialized(_this), "secondButton", void 0);

    _defineProperty(_assertThisInitialized(_this), "onSwitch", function (value) {
      var onSwitch = _this.props.onSwitch;

      _this.setState(function () {
        return {
          activeValue: value
        };
      }, function () {
        onSwitch && onSwitch(value);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleFirstClick", function () {
      var options = _this.props.options;
      var value = options[0].value;

      _this.onSwitch(value);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSecondClick", function () {
      var options = _this.props.options;
      var value = options[1].value;

      _this.onSwitch(value);
    });

    _defineProperty(_assertThisInitialized(_this), "handleFirstHover", function () {
      _this.setState(function () {
        return {
          hoveredOptionId: 0
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSecondHover", function () {
      _this.setState(function () {
        return {
          hoveredOptionId: 1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "resetFocusedOption", function () {
      _this.setState(function () {
        return {
          hoveredOptionId: -1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "switchByKey", function (event) {
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

  _createClass(SliderSwitch, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          name = _this$props.name,
          options = _this$props.options,
          _activeValue = _this$props.activeValue,
          onSwitch = _this$props.onSwitch,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      var _this$state = this.state,
          activeValue = _this$state.activeValue,
          hoveredOptionId = _this$state.hoveredOptionId;

      var _options = _slicedToArray(options, 2),
          firstOption = _options[0],
          secondOption = _options[1];

      var firstActive = firstOption.value === activeValue;
      var secondActive = secondOption.value === activeValue;
      return createScopedElement("div", _extends({}, restProps, {
        vkuiClass: "SliderSwitch",
        onKeyDown: this.switchByKey,
        onMouseLeave: this.resetFocusedOption
      }), !firstActive && !secondActive && createScopedElement("div", {
        vkuiClass: "SliderSwitch__border"
      }), createScopedElement("div", {
        vkuiClass: classNames('SliderSwitch__slider', (_classNames = {}, _defineProperty(_classNames, 'SliderSwitch--firstActive', firstActive), _defineProperty(_classNames, 'SliderSwitch--secondActive', secondActive), _classNames))
      }), createScopedElement("input", {
        type: "hidden",
        name: name,
        value: activeValue
      }), createScopedElement(SliderSwitchButton, {
        active: firstActive,
        hovered: hoveredOptionId === 0,
        "aria-pressed": firstActive,
        onClick: this.handleFirstClick,
        onMouseEnter: this.handleFirstHover,
        getRootRef: this.firstButton
      }, firstOption.name), createScopedElement(SliderSwitchButton, {
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

_defineProperty(SliderSwitch, "defaultProps", {
  options: [{
    name: '',
    value: ''
  }, {
    name: '',
    value: ''
  }]
});

export { SliderSwitch as default };
//# sourceMappingURL=SliderSwitch.js.map