"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormGroup = _interopRequireDefault(require("../FormGroup"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _useControlled = _interopRequireDefault(require("../utils/useControlled"));

var _RadioGroupContext = _interopRequireDefault(require("./RadioGroupContext"));

var _useId = _interopRequireDefault(require("../utils/useId"));

var _jsxRuntime = require("react/jsx-runtime");

const RadioGroup = /*#__PURE__*/React.forwardRef(function RadioGroup(props, ref) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions,
    children,
    name: nameProp,
    value: valueProp,
    onChange
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["actions", "children", "name", "value", "onChange"]);
  const rootRef = React.useRef(null);
  const [value, setValueState] = (0, _useControlled.default)({
    controlled: valueProp,
    default: props.defaultValue,
    name: 'RadioGroup'
  });
  React.useImperativeHandle(actions, () => ({
    focus: () => {
      let input = rootRef.current.querySelector('input:not(:disabled):checked');

      if (!input) {
        input = rootRef.current.querySelector('input:not(:disabled)');
      }

      if (input) {
        input.focus();
      }
    }
  }), []);
  const handleRef = (0, _useForkRef.default)(ref, rootRef);

  const handleChange = event => {
    setValueState(event.target.value);

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  const name = (0, _useId.default)(nameProp);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadioGroupContext.default.Provider, {
    value: {
      name,
      onChange: handleChange,
      value
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormGroup.default, (0, _extends2.default)({
      role: "radiogroup",
      ref: handleRef
    }, other, {
      children: children
    }))
  });
});
process.env.NODE_ENV !== "production" ? RadioGroup.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.number, _propTypes.default.string]),

  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,

  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: _propTypes.default.any
} : void 0;
var _default = RadioGroup;
exports.default = _default;