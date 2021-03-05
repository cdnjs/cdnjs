import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, visuallyHidden } from '@material-ui/utils';
import { useTheme, withStyles } from '../styles';
import { capitalize, useForkRef, useIsFocusVisible, useControlled, unstable_useId as useId } from '../utils';
import Star from '../internal/svg-icons/Star';
import StarBorder from '../internal/svg-icons/StarBorder';

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

function getDecimalPrecision(num) {
  var decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  if (value == null) {
    return value;
  }

  var nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'inline-flex',
      // Required to position the pristine input absolutely
      position: 'relative',
      fontSize: theme.typography.pxToRem(24),
      color: '#faaf00',
      cursor: 'pointer',
      textAlign: 'left',
      WebkitTapHighlightColor: 'transparent',
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity,
        pointerEvents: 'none'
      },
      '&$focusVisible $iconActive': {
        outline: '1px solid #999'
      }
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      fontSize: theme.typography.pxToRem(18)
    },

    /* Styles applied to the root element if `size="large"`. */
    sizeLarge: {
      fontSize: theme.typography.pxToRem(30)
    },

    /* Styles applied to the root element if `readOnly={true}`. */
    readOnly: {
      pointerEvents: 'none'
    },

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Pseudo-class applied to the root element if keyboard focused. */
    focusVisible: {},

    /* Visually hide an element. */
    visuallyHidden: visuallyHidden,

    /* Styles applied to the label elements. */
    label: {
      cursor: 'inherit'
    },

    /* Styles applied to the label of the "no value" input when it is active. */
    labelEmptyValueActive: {
      top: 0,
      bottom: 0,
      position: 'absolute',
      outline: '1px solid #999',
      width: '100%'
    },

    /* Styles applied to the icon wrapping elements. */
    icon: {
      // Fit wrapper to actual icon size.
      display: 'flex',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      }),
      // Fix mouseLeave issue.
      // https://github.com/facebook/react/issues/4492
      pointerEvents: 'none'
    },

    /* Styles applied to the icon wrapping elements when empty. */
    iconEmpty: {
      color: theme.palette.action.disabled
    },

    /* Styles applied to the icon wrapping elements when filled. */
    iconFilled: {},

    /* Styles applied to the icon wrapping elements when hover. */
    iconHover: {},

    /* Styles applied to the icon wrapping elements when focus. */
    iconFocus: {},

    /* Styles applied to the icon wrapping elements when active. */
    iconActive: {
      transform: 'scale(1.2)'
    },

    /* Styles applied to the icon wrapping elements when decimals are necessary. */
    decimal: {
      position: 'relative'
    }
  };
};

function IconContainer(props) {
  var value = props.value,
      other = _objectWithoutProperties(props, ["value"]);

  return /*#__PURE__*/React.createElement("span", other);
}

process.env.NODE_ENV !== "production" ? IconContainer.propTypes = {
  value: PropTypes.number.isRequired
} : void 0;
var defaultIcon = /*#__PURE__*/React.createElement(Star, {
  fontSize: "inherit"
});
var defaultEmptyIcon = /*#__PURE__*/React.createElement(StarBorder, {
  fontSize: "inherit"
});

function defaultLabelText(value) {
  return "".concat(value, " Star").concat(value !== 1 ? 's' : '');
}

var Rating = /*#__PURE__*/React.forwardRef(function Rating(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$defaultValue = props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? null : _props$defaultValue,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$emptyIcon = props.emptyIcon,
      emptyIcon = _props$emptyIcon === void 0 ? defaultEmptyIcon : _props$emptyIcon,
      _props$emptyLabelText = props.emptyLabelText,
      emptyLabelText = _props$emptyLabelText === void 0 ? 'Empty' : _props$emptyLabelText,
      _props$getLabelText = props.getLabelText,
      getLabelText = _props$getLabelText === void 0 ? defaultLabelText : _props$getLabelText,
      _props$icon = props.icon,
      icon = _props$icon === void 0 ? defaultIcon : _props$icon,
      _props$IconContainerC = props.IconContainerComponent,
      IconContainerComponent = _props$IconContainerC === void 0 ? IconContainer : _props$IconContainerC,
      _props$max = props.max,
      max = _props$max === void 0 ? 5 : _props$max,
      nameProp = props.name,
      onChange = props.onChange,
      onChangeActive = props.onChangeActive,
      onMouseLeave = props.onMouseLeave,
      onMouseMove = props.onMouseMove,
      _props$precision = props.precision,
      precision = _props$precision === void 0 ? 1 : _props$precision,
      _props$readOnly = props.readOnly,
      readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      valueProp = props.value,
      other = _objectWithoutProperties(props, ["classes", "className", "defaultValue", "disabled", "emptyIcon", "emptyLabelText", "getLabelText", "icon", "IconContainerComponent", "max", "name", "onChange", "onChangeActive", "onMouseLeave", "onMouseMove", "precision", "readOnly", "size", "value"]);

  var name = useId(nameProp);

  var _useControlled = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Rating'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      valueDerived = _useControlled2[0],
      setValueState = _useControlled2[1];

  var valueRounded = roundValueToPrecision(valueDerived, precision);
  var theme = useTheme();

  var _React$useState = React.useState({
    hover: -1,
    focus: -1
  }),
      _React$useState$ = _React$useState[0],
      hover = _React$useState$.hover,
      focus = _React$useState$.focus,
      setState = _React$useState[1];

  var value = valueRounded;

  if (hover !== -1) {
    value = hover;
  }

  if (focus !== -1) {
    value = focus;
  }

  var _useIsFocusVisible = useIsFocusVisible(),
      isFocusVisibleRef = _useIsFocusVisible.isFocusVisibleRef,
      handleBlurVisible = _useIsFocusVisible.onBlur,
      handleFocusVisible = _useIsFocusVisible.onFocus,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState2 = React.useState(false),
      focusVisible = _React$useState2[0],
      setFocusVisible = _React$useState2[1];

  var rootRef = React.useRef();
  var handleFocusRef = useForkRef(focusVisibleRef, rootRef);
  var handleRef = useForkRef(handleFocusRef, ref);

  var handleMouseMove = function handleMouseMove(event) {
    if (onMouseMove) {
      onMouseMove(event);
    }

    var rootNode = rootRef.current;

    var _rootNode$getBounding = rootNode.getBoundingClientRect(),
        right = _rootNode$getBounding.right,
        left = _rootNode$getBounding.left;

    var _rootNode$firstChild$ = rootNode.firstChild.getBoundingClientRect(),
        width = _rootNode$firstChild$.width;

    var percent;

    if (theme.direction === 'rtl') {
      percent = (right - event.clientX) / (width * max);
    } else {
      percent = (event.clientX - left) / (width * max);
    }

    var newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);
    setState(function (prev) {
      return prev.hover === newHover && prev.focus === newHover ? prev : {
        hover: newHover,
        focus: newHover
      };
    });
    setFocusVisible(false);

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  var handleMouseLeave = function handleMouseLeave(event) {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    var newHover = -1;
    setState({
      hover: newHover,
      focus: newHover
    });

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  var handleChange = function handleChange(event) {
    var newValue = parseFloat(event.target.value); // Give mouse priority over keyboard
    // Fix https://github.com/mui-org/material-ui/issues/22827

    if (hover !== -1) {
      newValue = hover;
    }

    setValueState(newValue);

    if (onChange) {
      onChange(event, newValue);
    }
  };

  var handleClear = function handleClear(event) {
    // Ignore keyboard events
    // https://github.com/facebook/react/issues/7407
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }

    setState({
      hover: -1,
      focus: -1
    });
    setValueState(null);

    if (onChange && parseFloat(event.target.value) === valueRounded) {
      onChange(event, null);
    }
  };

  var handleFocus = function handleFocus(event) {
    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }

    var newFocus = parseFloat(event.target.value);
    setState(function (prev) {
      return {
        hover: prev.hover,
        focus: newFocus
      };
    });

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  var handleBlur = function handleBlur(event) {
    if (hover !== -1) {
      return;
    }

    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    var newFocus = -1;
    setState(function (prev) {
      return {
        hover: prev.hover,
        focus: newFocus
      };
    });

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  var _React$useState3 = React.useState(false),
      emptyValueFocused = _React$useState3[0],
      setEmptyValueFocused = _React$useState3[1];

  var item = function item(state, labelProps) {
    var id = "".concat(name, "-").concat(String(state.value).replace('.', '-'));
    var container = /*#__PURE__*/React.createElement(IconContainerComponent, {
      value: state.value,
      className: clsx(classes.icon, state.filled ? classes.iconFilled : classes.iconEmpty, state.hover && classes.iconHover, state.focus && classes.iconFocus, state.active && classes.iconActive)
    }, emptyIcon && !state.filled ? emptyIcon : icon);

    if (readOnly) {
      return /*#__PURE__*/React.createElement("span", _extends({
        key: state.value
      }, labelProps), container);
    }

    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: state.value
    }, /*#__PURE__*/React.createElement("label", _extends({
      className: classes.label,
      htmlFor: id
    }, labelProps), container, /*#__PURE__*/React.createElement("span", {
      className: classes.visuallyHidden
    }, getLabelText(state.value))), /*#__PURE__*/React.createElement("input", {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange: handleChange,
      onClick: handleClear,
      disabled: disabled,
      value: state.value,
      id: id,
      type: "radio",
      name: name,
      checked: state.checked,
      className: classes.visuallyHidden
    }));
  };

  return /*#__PURE__*/React.createElement("span", _extends({
    ref: handleRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: clsx(classes.root, className, size !== 'medium' && classes["size".concat(capitalize(size))], disabled && classes.disabled, focusVisible && classes.focusVisible, readOnly && classes.readOnly),
    role: readOnly ? 'img' : null,
    "aria-label": readOnly ? getLabelText(value) : null
  }, other), Array.from(new Array(max)).map(function (_, index) {
    var itemValue = index + 1;

    if (precision < 1) {
      var items = Array.from(new Array(1 / precision));
      return /*#__PURE__*/React.createElement("span", {
        key: itemValue,
        className: clsx(classes.decimal, itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1) && classes.iconActive)
      }, items.map(function ($, indexDecimal) {
        var itemDecimalValue = roundValueToPrecision(itemValue - 1 + (indexDecimal + 1) * precision, precision);
        return item({
          value: itemDecimalValue,
          filled: itemDecimalValue <= value,
          hover: itemDecimalValue <= hover,
          focus: itemDecimalValue <= focus,
          checked: itemDecimalValue === valueRounded
        }, {
          style: items.length - 1 === indexDecimal ? {} : {
            width: itemDecimalValue === value ? "".concat((indexDecimal + 1) * precision * 100, "%") : '0%',
            overflow: 'hidden',
            zIndex: 1,
            position: 'absolute'
          }
        });
      }));
    }

    return item({
      value: itemValue,
      active: itemValue === value && (hover !== -1 || focus !== -1),
      filled: itemValue <= value,
      hover: itemValue <= hover,
      focus: itemValue <= focus,
      checked: itemValue === valueRounded
    });
  }), !readOnly && !disabled && valueRounded == null && /*#__PURE__*/React.createElement("label", {
    className: clsx(emptyValueFocused && classes.labelEmptyValueActive)
  }, /*#__PURE__*/React.createElement("input", {
    value: "",
    id: "".concat(name, "-empty"),
    type: "radio",
    name: name,
    defaultChecked: true,
    className: classes.visuallyHidden,
    onFocus: function onFocus() {
      return setEmptyValueFocused(true);
    },
    onBlur: function onBlur() {
      return setEmptyValueFocused(false);
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: classes.visuallyHidden
  }, emptyLabelText)));
});
process.env.NODE_ENV !== "production" ? Rating.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The default value. Use when the component is not controlled.
   * @default null
   */
  defaultValue: PropTypes.number,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * The icon to display when empty.
   * @default <StarBorder fontSize="inherit" />
   */
  emptyIcon: PropTypes.node,

  /**
   * The label read when the rating input is empty.
   * @default 'Empty'
   */
  emptyLabelText: PropTypes.node,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @param {number} value The rating label's value to format.
   * @returns {string}
   * @default function defaultLabelText(value) {
   *   return `${value} Star${value !== 1 ? 's' : ''}`;
   * }
   */
  getLabelText: PropTypes.func,

  /**
   * The icon to display.
   * @default <Star fontSize="inherit" />
   */
  icon: PropTypes.node,

  /**
   * The component containing the icon.
   * @default function IconContainer(props) {
   *   const { value, ...other } = props;
   *   return <span {...other} />;
   * }
   */
  IconContainerComponent: PropTypes.elementType,

  /**
   * Maximum rating.
   * @default 5
   */
  max: PropTypes.number,

  /**
   * The name attribute of the radio `input` elements.
   * This input `name` should be unique within the page.
   * Being unique within a form is insufficient since the `name` is used to generated IDs.
   */
  name: PropTypes.string,

  /**
   * Callback fired when the value changes.
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChange: PropTypes.func,

  /**
   * Callback function that is fired when the hover state changes.
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive: PropTypes.func,

  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,

  /**
   * @ignore
   */
  onMouseMove: PropTypes.func,

  /**
   * The minimum increment value change allowed.
   * @default 1
   */
  precision: chainPropTypes(PropTypes.number, function (props) {
    if (props.precision < 0.1) {
      return new Error(['Material-UI: The prop `precision` should be above 0.1.', 'A value below this limit has an imperceptible impact.'].join('\n'));
    }

    return null;
  }),

  /**
   * Removes all hover effects and pointer events.
   * @default false
   */
  readOnly: PropTypes.bool,

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),

  /**
   * The rating value.
   */
  value: PropTypes.number
} : void 0;
export default withStyles(styles, {
  name: 'MuiRating'
})(Rating);