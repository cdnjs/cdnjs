"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _styles = require("../styles");

var _utils2 = require("../utils");

var _Star = _interopRequireDefault(require("../internal/svg-icons/Star"));

var _StarBorder = _interopRequireDefault(require("../internal/svg-icons/StarBorder"));

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
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  if (value == null) {
    return value;
  }

  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

const styles = theme => ({
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
  visuallyHidden: _utils.visuallyHidden,

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
});

exports.styles = styles;

function IconContainer(props) {
  const other = (0, _objectWithoutPropertiesLoose2.default)(props, ["value"]);
  return /*#__PURE__*/React.createElement("span", other);
}

process.env.NODE_ENV !== "production" ? IconContainer.propTypes = {
  value: _propTypes.default.number.isRequired
} : void 0;
const defaultIcon = /*#__PURE__*/React.createElement(_Star.default, {
  fontSize: "inherit"
});
const defaultEmptyIcon = /*#__PURE__*/React.createElement(_StarBorder.default, {
  fontSize: "inherit"
});

function defaultLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}`;
}

const Rating = /*#__PURE__*/React.forwardRef(function Rating(props, ref) {
  const {
    classes,
    className,
    defaultValue = null,
    disabled = false,
    emptyIcon = defaultEmptyIcon,
    emptyLabelText = 'Empty',
    getLabelText = defaultLabelText,
    icon = defaultIcon,
    IconContainerComponent = IconContainer,
    max = 5,
    name: nameProp,
    onChange,
    onChangeActive,
    onMouseLeave,
    onMouseMove,
    precision = 1,
    readOnly = false,
    size = 'medium',
    value: valueProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "className", "defaultValue", "disabled", "emptyIcon", "emptyLabelText", "getLabelText", "icon", "IconContainerComponent", "max", "name", "onChange", "onChangeActive", "onMouseLeave", "onMouseMove", "precision", "readOnly", "size", "value"]);
  const name = (0, _utils2.unstable_useId)(nameProp);
  const [valueDerived, setValueState] = (0, _utils2.useControlled)({
    controlled: valueProp,
    default: defaultValue,
    name: 'Rating'
  });
  const valueRounded = roundValueToPrecision(valueDerived, precision);
  const theme = (0, _styles.useTheme)();
  const [{
    hover,
    focus
  }, setState] = React.useState({
    hover: -1,
    focus: -1
  });
  let value = valueRounded;

  if (hover !== -1) {
    value = hover;
  }

  if (focus !== -1) {
    value = focus;
  }

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = (0, _utils2.useIsFocusVisible)();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const rootRef = React.useRef();
  const handleFocusRef = (0, _utils2.useForkRef)(focusVisibleRef, rootRef);
  const handleRef = (0, _utils2.useForkRef)(handleFocusRef, ref);

  const handleMouseMove = event => {
    if (onMouseMove) {
      onMouseMove(event);
    }

    const rootNode = rootRef.current;
    const {
      right,
      left
    } = rootNode.getBoundingClientRect();
    const {
      width
    } = rootNode.firstChild.getBoundingClientRect();
    let percent;

    if (theme.direction === 'rtl') {
      percent = (right - event.clientX) / (width * max);
    } else {
      percent = (event.clientX - left) / (width * max);
    }

    let newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);
    setState(prev => prev.hover === newHover && prev.focus === newHover ? prev : {
      hover: newHover,
      focus: newHover
    });
    setFocusVisible(false);

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  const handleMouseLeave = event => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    const newHover = -1;
    setState({
      hover: newHover,
      focus: newHover
    });

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  const handleChange = event => {
    let newValue = parseFloat(event.target.value); // Give mouse priority over keyboard
    // Fix https://github.com/mui-org/material-ui/issues/22827

    if (hover !== -1) {
      newValue = hover;
    }

    setValueState(newValue);

    if (onChange) {
      onChange(event, newValue);
    }
  };

  const handleClear = event => {
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

  const handleFocus = event => {
    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }

    const newFocus = parseFloat(event.target.value);
    setState(prev => ({
      hover: prev.hover,
      focus: newFocus
    }));

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  const handleBlur = event => {
    if (hover !== -1) {
      return;
    }

    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    const newFocus = -1;
    setState(prev => ({
      hover: prev.hover,
      focus: newFocus
    }));

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
  };

  const [emptyValueFocused, setEmptyValueFocused] = React.useState(false);

  const item = (state, labelProps) => {
    const id = `${name}-${String(state.value).replace('.', '-')}`;
    const container = /*#__PURE__*/React.createElement(IconContainerComponent, {
      value: state.value,
      className: (0, _clsx.default)(classes.icon, state.filled ? classes.iconFilled : classes.iconEmpty, state.hover && classes.iconHover, state.focus && classes.iconFocus, state.active && classes.iconActive)
    }, emptyIcon && !state.filled ? emptyIcon : icon);

    if (readOnly) {
      return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
        key: state.value
      }, labelProps), container);
    }

    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: state.value
    }, /*#__PURE__*/React.createElement("label", (0, _extends2.default)({
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

  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    ref: handleRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: (0, _clsx.default)(classes.root, className, size !== 'medium' && classes[`size${(0, _utils2.capitalize)(size)}`], disabled && classes.disabled, focusVisible && classes.focusVisible, readOnly && classes.readOnly),
    role: readOnly ? 'img' : null,
    "aria-label": readOnly ? getLabelText(value) : null
  }, other), Array.from(new Array(max)).map((_, index) => {
    const itemValue = index + 1;

    if (precision < 1) {
      const items = Array.from(new Array(1 / precision));
      return /*#__PURE__*/React.createElement("span", {
        key: itemValue,
        className: (0, _clsx.default)(classes.decimal, itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1) && classes.iconActive)
      }, items.map(($, indexDecimal) => {
        const itemDecimalValue = roundValueToPrecision(itemValue - 1 + (indexDecimal + 1) * precision, precision);
        return item({
          value: itemDecimalValue,
          filled: itemDecimalValue <= value,
          hover: itemDecimalValue <= hover,
          focus: itemDecimalValue <= focus,
          checked: itemDecimalValue === valueRounded
        }, {
          style: items.length - 1 === indexDecimal ? {} : {
            width: itemDecimalValue === value ? `${(indexDecimal + 1) * precision * 100}%` : '0%',
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
    className: (0, _clsx.default)(emptyValueFocused && classes.labelEmptyValueActive)
  }, /*#__PURE__*/React.createElement("input", {
    value: "",
    id: `${name}-empty`,
    type: "radio",
    name: name,
    defaultChecked: true,
    className: classes.visuallyHidden,
    onFocus: () => setEmptyValueFocused(true),
    onBlur: () => setEmptyValueFocused(false)
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
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The default value. Use when the component is not controlled.
   * @default null
   */
  defaultValue: _propTypes.default.number,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * The icon to display when empty.
   * @default <StarBorder fontSize="inherit" />
   */
  emptyIcon: _propTypes.default.node,

  /**
   * The label read when the rating input is empty.
   * @default 'Empty'
   */
  emptyLabelText: _propTypes.default.node,

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
  getLabelText: _propTypes.default.func,

  /**
   * The icon to display.
   * @default <Star fontSize="inherit" />
   */
  icon: _propTypes.default.node,

  /**
   * The component containing the icon.
   * @default function IconContainer(props) {
   *   const { value, ...other } = props;
   *   return <span {...other} />;
   * }
   */
  IconContainerComponent: _propTypes.default.elementType,

  /**
   * Maximum rating.
   * @default 5
   */
  max: _propTypes.default.number,

  /**
   * The name attribute of the radio `input` elements.
   * This input `name` should be unique within the page.
   * Being unique within a form is insufficient since the `name` is used to generated IDs.
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when the value changes.
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChange: _propTypes.default.func,

  /**
   * Callback function that is fired when the hover state changes.
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseMove: _propTypes.default.func,

  /**
   * The minimum increment value change allowed.
   * @default 1
   */
  precision: (0, _utils.chainPropTypes)(_propTypes.default.number, props => {
    if (props.precision < 0.1) {
      return new Error(['Material-UI: The prop `precision` should be above 0.1.', 'A value below this limit has an imperceptible impact.'].join('\n'));
    }

    return null;
  }),

  /**
   * Removes all hover effects and pointer events.
   * @default false
   */
  readOnly: _propTypes.default.bool,

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['large', 'medium', 'small']),

  /**
   * The rating value.
   */
  value: _propTypes.default.number
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiRating'
})(Rating);

exports.default = _default;