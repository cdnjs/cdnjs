import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';
import useForkRef from '../utils/useForkRef';
import useControlled from '../utils/useControlled';
import RadioGroupContext from './RadioGroupContext';
import useId from '../utils/unstable_useId';
var RadioGroup = /*#__PURE__*/React.forwardRef(function RadioGroup(props, ref) {
  var actions = props.actions,
      children = props.children,
      nameProp = props.name,
      valueProp = props.value,
      onChange = props.onChange,
      other = _objectWithoutProperties(props, ["actions", "children", "name", "value", "onChange"]);

  var rootRef = React.useRef(null);

  var _useControlled = useControlled({
    controlled: valueProp,
    default: props.defaultValue,
    name: 'RadioGroup'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      value = _useControlled2[0],
      setValue = _useControlled2[1];

  React.useImperativeHandle(actions, function () {
    return {
      focus: function focus() {
        var input = rootRef.current.querySelector('input:not(:disabled):checked');

        if (!input) {
          input = rootRef.current.querySelector('input:not(:disabled)');
        }

        if (input) {
          input.focus();
        }
      }
    };
  }, []);
  var handleRef = useForkRef(ref, rootRef);

  var handleChange = function handleChange(event) {
    setValue(event.target.value);

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  var name = useId(nameProp);
  return /*#__PURE__*/React.createElement(RadioGroupContext.Provider, {
    value: {
      name: name,
      onChange: handleChange,
      value: value
    }
  }, /*#__PURE__*/React.createElement(FormGroup, _extends({
    role: "radiogroup",
    ref: handleRef
  }, other), children));
});
process.env.NODE_ENV !== "production" ? RadioGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.number, PropTypes.string]),

  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name: PropTypes.string,

  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,

  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: PropTypes.any
} : void 0;
export default RadioGroup;