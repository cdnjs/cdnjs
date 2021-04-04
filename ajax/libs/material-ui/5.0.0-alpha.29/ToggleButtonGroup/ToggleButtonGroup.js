import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import isValueSelected from './isValueSelected';
import toggleButtonGroupClasses, { getToggleButtonGroupUtilityClass } from './toggleButtonGroupClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(_extends({}, styleProps.orientation === 'vertical' && styles.vertical, {
    [`& .${toggleButtonGroupClasses.grouped}`]: _extends({}, styles.grouped, styles[`grouped${capitalize(styleProps.orientation)}`])
  }), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation
  } = styleProps;
  const slots = {
    root: ['root', orientation === 'vertical' && 'vertical'],
    grouped: ['grouped', `grouped${capitalize(orientation)}`]
  };
  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};

const ToggleButtonGroupRoot = experimentalStyled('div', {}, {
  name: 'MuiToggleButtonGroup',
  slot: 'Root',
  overridesResolver
})(({
  styleProps,
  theme
}) => _extends({
  /* Styles applied to the root element. */
  display: 'inline-flex',
  borderRadius: theme.shape.borderRadius
}, styleProps.orientation === 'vertical' && {
  flexDirection: 'column'
}, {
  /* Styles applied to the children. */
  [`& .${toggleButtonGroupClasses.grouped}`]: _extends({}, styleProps.orientation === 'horizontal' ? {
    '&:not(:first-of-type)': {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    '&:not(:last-of-type)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.Mui-selected + .${toggleButtonGroupClasses.grouped}.Mui-selected`]: {
      borderLeft: 0,
      marginLeft: 0
    }
  } : {
    /* Styles applied to the children if `orientation="vertical"`. */
    '&:not(:first-of-type)': {
      marginTop: -1,
      borderTop: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    '&:not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.Mui-selected + .${toggleButtonGroupClasses.grouped}.Mui-selected`]: {
      borderTop: 0,
      marginTop: 0
    }
  })
}));
const ToggleButtonGroup = /*#__PURE__*/React.forwardRef(function ToggleButtonGroup(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiToggleButtonGroup'
  });

  const {
    children,
    className,
    color = 'standard',
    exclusive = false,
    onChange,
    orientation = 'horizontal',
    size = 'medium',
    value
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "className", "color", "exclusive", "onChange", "orientation", "size", "value"]);

  const styleProps = _extends({}, props, {
    orientation,
    size
  });

  const classes = useUtilityClasses(styleProps);

  const handleChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }

    const index = value && value.indexOf(buttonValue);
    let newValue;

    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }

    onChange(event, newValue);
  };

  const handleExclusiveChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }

    onChange(event, value === buttonValue ? null : buttonValue);
  };

  return /*#__PURE__*/_jsx(ToggleButtonGroupRoot, _extends({
    role: "group",
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: React.Children.map(children, child => {
      if (! /*#__PURE__*/React.isValidElement(child)) {
        return null;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (isFragment(child)) {
          console.error(["Material-UI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
        }
      }

      return /*#__PURE__*/React.cloneElement(child, {
        className: clsx(classes.grouped, child.props.className),
        onChange: exclusive ? handleExclusiveChange : handleChange,
        selected: child.props.selected === undefined ? isValueSelected(child.props.value, value) : child.props.selected,
        size: child.props.size || size,
        color: child.props.color || color
      });
    })
  }));
});
process.env.NODE_ENV !== "production" ? ToggleButtonGroup.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of a button when it is selected.
   * @default 'standard'
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'standard']),

  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive: PropTypes.bool,

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: PropTypes.any
} : void 0;
export default ToggleButtonGroup;