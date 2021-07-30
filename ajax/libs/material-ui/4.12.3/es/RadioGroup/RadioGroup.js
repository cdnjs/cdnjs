import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';
import useForkRef from '../utils/useForkRef';
import useControlled from '../utils/useControlled';
import RadioGroupContext from './RadioGroupContext';
import useId from '../utils/unstable_useId';
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
        other = _objectWithoutPropertiesLoose(props, ["actions", "children", "name", "value", "onChange"]);

  const rootRef = React.useRef(null);
  const [value, setValue] = useControlled({
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
  const handleRef = useForkRef(ref, rootRef);

  const handleChange = event => {
    setValue(event.target.value);

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  const name = useId(nameProp);
  return /*#__PURE__*/React.createElement(RadioGroupContext.Provider, {
    value: {
      name,
      onChange: handleChange,
      value
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