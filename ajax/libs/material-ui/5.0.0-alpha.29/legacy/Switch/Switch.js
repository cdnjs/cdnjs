import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
// @inheritedComponent IconButton
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType, deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha, darken, lighten } from '../styles/colorManipulator';
import capitalize from '../utils/capitalize';
import SwitchBase from '../internal/SwitchBase';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled, { shouldForwardProp as _shouldForwardProp } from '../styles/experimentalStyled';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var _extends2;

  var styleProps = props.styleProps;
  return deepmerge(_extends({}, styleProps.edge && styles["edge".concat(capitalize(styleProps.edge))], styles["size".concat(capitalize(styleProps.size))], (_extends2 = {}, _defineProperty(_extends2, "& .".concat(switchClasses.switchBase), _extends({}, styles.switchBase, styles.input, styleProps.color !== 'default' && styles["color".concat(capitalize(styleProps.color))])), _defineProperty(_extends2, "& .".concat(switchClasses.thumb), styles.thumb), _defineProperty(_extends2, "& .".concat(switchClasses.track), styles.track), _extends2)), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      edge = styleProps.edge,
      size = styleProps.size,
      color = styleProps.color,
      checked = styleProps.checked,
      disabled = styleProps.disabled;
  var slots = {
    root: ['root', edge && "edge".concat(capitalize(edge)), "size".concat(capitalize(size))],
    switchBase: ['switchBase', "color".concat(capitalize(color)), checked && 'checked', disabled && 'disabled'],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input']
  };
  var composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};

var SwitchRoot = experimentalStyled('span', {}, {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var _ref2;

  var styleProps = _ref.styleProps;
  return _extends({
    /* Styles applied to the root element. */
    display: 'inline-flex',
    width: 34 + 12 * 2,
    height: 14 + 12 * 2,
    overflow: 'hidden',
    padding: 12,
    boxSizing: 'border-box',
    position: 'relative',
    flexShrink: 0,
    zIndex: 0,
    // Reset the stacking context.
    verticalAlign: 'middle',
    // For correct alignment with the text.
    '@media print': {
      colorAdjust: 'exact'
    }
  }, styleProps.edge === 'start' && {
    marginLeft: -8
  }, styleProps.edge === 'end' && {
    marginRight: -8
  }, styleProps.size === 'small' && (_ref2 = {
    width: 40,
    height: 24,
    padding: 7
  }, _defineProperty(_ref2, "& .".concat(switchClasses.thumb), {
    width: 16,
    height: 16
  }), _defineProperty(_ref2, "& .".concat(switchClasses.switchBase), {
    padding: 4,
    '&.Mui-checked': {
      transform: 'translateX(16px)'
    }
  }), _ref2));
});
var SwitchSwitchBase = experimentalStyled(SwitchBase, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return _shouldForwardProp(prop) || prop === 'classes';
  }
}, {
  name: 'MuiSwitch',
  slot: 'SwitchBase'
})(function (_ref3) {
  var _ref4;

  var theme = _ref3.theme;
  return _ref4 = {
    /* Styles applied to the internal `SwitchBase` component's `root` class. */
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    // Render above the focus ripple.
    color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300],
    transition: theme.transitions.create(['left', 'transform'], {
      duration: theme.transitions.duration.shortest
    }),
    '&.Mui-checked': {
      transform: 'translateX(20px)'
    },
    '&.Mui-disabled': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    }
  }, _defineProperty(_ref4, "&.Mui-checked + .".concat(switchClasses.track), {
    opacity: 0.5
  }), _defineProperty(_ref4, "&.Mui-disabled + .".concat(switchClasses.track), {
    opacity: theme.palette.mode === 'light' ? 0.12 : 0.2
  }), _defineProperty(_ref4, "& .".concat(switchClasses.input), {
    /* Styles applied to the internal SwitchBase component's input element. */
    left: '-100%',
    width: '300%'
  }), _ref4;
}, function (_ref5) {
  var theme = _ref5.theme,
      styleProps = _ref5.styleProps;
  return _extends({}, styleProps.color !== 'default' && _defineProperty({
    '&.Mui-checked': {
      color: theme.palette[styleProps.color].main,
      '&:hover': {
        backgroundColor: alpha(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&.Mui-disabled': {
        color: theme.palette.mode === 'light' ? lighten(theme.palette[styleProps.color].main, 0.62) : darken(theme.palette[styleProps.color].main, 0.55)
      }
    }
  }, "&.Mui-checked + .".concat(switchClasses.track), {
    backgroundColor: theme.palette[styleProps.color].main
  }));
});
var SwitchTrack = experimentalStyled('span', {}, {
  name: 'MuiSwitch',
  slot: 'Track'
})(function (_ref7) {
  var theme = _ref7.theme;
  return {
    /* Styles applied to the track element. */
    height: '100%',
    width: '100%',
    borderRadius: 14 / 2,
    zIndex: -1,
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest
    }),
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
    opacity: theme.palette.mode === 'light' ? 0.38 : 0.3
  };
});
var SwitchThumb = experimentalStyled('span', {}, {
  name: 'MuiSwitch',
  slot: 'Thumb'
})(function (_ref8) {
  var theme = _ref8.theme;
  return {
    /* Styles used to create the thumb passed to the internal `SwitchBase` component `icon` prop. */
    boxShadow: theme.shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%'
  };
});
var Switch = /*#__PURE__*/React.forwardRef(function Switch(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSwitch'
  });

  var className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      _props$edge = props.edge,
      edge = _props$edge === void 0 ? false : _props$edge,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      other = _objectWithoutProperties(props, ["className", "color", "edge", "size"]);

  var styleProps = _extends({}, props, {
    color: color,
    edge: edge,
    size: size
  });

  var classes = useUtilityClasses(styleProps);

  var icon = /*#__PURE__*/_jsx(SwitchThumb, {
    className: classes.thumb,
    styleProps: styleProps
  });

  return /*#__PURE__*/_jsxs(SwitchRoot, {
    className: clsx(classes.root, className),
    styleProps: styleProps,
    children: [/*#__PURE__*/_jsx(SwitchSwitchBase, _extends({
      className: classes.switchBase,
      type: "checkbox",
      icon: icon,
      checkedIcon: icon,
      ref: ref,
      styleProps: styleProps
    }, other, {
      classes: classes
    })), /*#__PURE__*/_jsx(SwitchTrack, {
      className: classes.track,
      styleProps: styleProps
    })]
  });
});
process.env.NODE_ENV !== "production" ? Switch.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,

  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'secondary'
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),

  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,

  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,

  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),

  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,

  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,

  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,

  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['medium', 'small']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any
} : void 0;
export default Switch;