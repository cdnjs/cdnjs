"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _styles = require("../styles");

var _utils2 = require("../utils");

var _Star = _interopRequireDefault(require("../internal/svg-icons/Star"));

var _StarBorder = _interopRequireDefault(require("../internal/svg-icons/StarBorder"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _ratingClasses = _interopRequireWildcard(require("./ratingClasses"));

var _jsxRuntime = require("react/jsx-runtime");

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

const useUtilityClasses = styleProps => {
  const {
    classes,
    size,
    readOnly,
    disabled,
    emptyValueFocused,
    focusVisible
  } = styleProps;
  const slots = {
    root: ['root', `size${(0, _utils2.capitalize)(size)}`, disabled && 'disabled', focusVisible && 'focusVisible', readOnly && 'readyOnly'],
    label: ['label', 'pristine'],
    labelEmptyValue: [emptyValueFocused && 'labelEmptyValueActive'],
    icon: ['icon'],
    iconEmpty: ['iconEmpty'],
    iconFilled: ['iconFilled'],
    iconHover: ['iconHover'],
    iconFocus: ['iconFocus'],
    iconActive: ['iconActive'],
    decimal: ['decimal'],
    visuallyHidden: ['visuallyHidden']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _ratingClasses.getRatingUtilityClass, classes);
};

const RatingRoot = (0, _styled.default)('span', {
  name: 'MuiRating',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return (0, _extends2.default)({
      [`& .${_ratingClasses.default.visuallyHidden}`]: styles.visuallyHidden
    }, styles.root, styles[`size${(0, _utils2.capitalize)(styleProps.size)}`], styleProps.readOnly && styles.readOnly);
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  display: 'inline-flex',
  // Required to position the pristine input absolutely
  position: 'relative',
  fontSize: theme.typography.pxToRem(24),
  color: '#faaf00',
  cursor: 'pointer',
  textAlign: 'left',
  WebkitTapHighlightColor: 'transparent',
  [`&.${_ratingClasses.default.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity,
    pointerEvents: 'none'
  },
  [`&.${_ratingClasses.default.focusVisible} .${_ratingClasses.default.iconActive}`]: {
    outline: '1px solid #999'
  },
  [`& .${_ratingClasses.default.visuallyHidden}`]: _utils.visuallyHidden
}, styleProps.size === 'small' && {
  fontSize: theme.typography.pxToRem(18)
}, styleProps.size === 'large' && {
  fontSize: theme.typography.pxToRem(30)
}, styleProps.readOnly && {
  pointerEvents: 'none'
}));
const RatingLabel = (0, _styled.default)('label', {
  name: 'MuiRating',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label
})(({
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the label elements. */
  cursor: 'inherit'
}, styleProps.emptyValueFocused && {
  top: 0,
  bottom: 0,
  position: 'absolute',
  outline: '1px solid #999',
  width: '100%'
}));
const RatingIcon = (0, _styled.default)('span', {
  name: 'MuiRating',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return (0, _extends2.default)({}, styles.icon, styleProps.iconEmpty && styles.iconEmpty, styleProps.iconFilled && styles.iconFilled, styleProps.iconHover && styles.iconHover, styleProps.iconFocus && styles.iconFocus, styleProps.iconActive && styles.iconActive);
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the icon wrapping elements. */
  // Fit wrapper to actual icon size.
  display: 'flex',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  // Fix mouseLeave issue.
  // https://github.com/facebook/react/issues/4492
  pointerEvents: 'none'
}, styleProps.iconActive && {
  transform: 'scale(1.2)'
}, styleProps.iconEmpty && {
  color: theme.palette.action.disabled
}));
const RatingDecimal = (0, _styled.default)('span', {
  name: 'MuiRating',
  slot: 'Decimal',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return (0, _extends2.default)({}, styles.decimal, styleProps.iconActive && styles.iconActive);
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the icon wrapping elements when decimals are necessary. */
  position: 'relative'
}, styleProps.iconActive && {
  transform: 'scale(1.2)'
}));

function IconContainer(props) {
  const other = (0, _objectWithoutPropertiesLoose2.default)(props, ["value"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", (0, _extends2.default)({}, other));
}

process.env.NODE_ENV !== "production" ? IconContainer.propTypes = {
  value: _propTypes.default.number.isRequired
} : void 0;
const defaultIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Star.default, {
  fontSize: "inherit"
});
const defaultEmptyIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_StarBorder.default, {
  fontSize: "inherit"
});

function defaultLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}`;
}

const Rating = /*#__PURE__*/React.forwardRef(function Rating(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    name: 'MuiRating',
    props: inProps
  });
  const {
    className,
    defaultValue = null,
    disabled = false,
    emptyIcon = defaultEmptyIcon,
    emptyLabelText = 'Empty',
    getLabelText = defaultLabelText,
    highlightSelectedOnly = false,
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
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "defaultValue", "disabled", "emptyIcon", "emptyLabelText", "getLabelText", "highlightSelectedOnly", "icon", "IconContainerComponent", "max", "name", "onChange", "onChangeActive", "onMouseLeave", "onMouseMove", "precision", "readOnly", "size", "value"]);
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
    let newValue = event.target.value === '' ? null : parseFloat(event.target.value); // Give mouse priority over keyboard
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
  };

  const [emptyValueFocused, setEmptyValueFocused] = React.useState(false);
  const styleProps = (0, _extends2.default)({}, props, {
    defaultValue,
    disabled,
    emptyIcon,
    emptyLabelText,
    emptyValueFocused,
    focusVisible,
    getLabelText,
    icon,
    IconContainerComponent,
    max,
    precision,
    readOnly,
    size
  });
  const classes = useUtilityClasses(styleProps);

  const item = (state, labelProps) => {
    const id = `${name}-${String(state.value).replace('.', '-')}`;
    const container = /*#__PURE__*/(0, _jsxRuntime.jsx)(RatingIcon, {
      as: IconContainerComponent,
      value: state.value,
      className: (0, _clsx.default)(classes.icon, state.filled ? classes.iconFilled : classes.iconEmpty, state.hover && classes.iconHover, state.focus && classes.iconFocus, state.active && classes.iconActive),
      styleProps: (0, _extends2.default)({}, styleProps, {
        iconEmpty: !state.filled,
        iconFilled: state.filled,
        iconHover: state.hover,
        iconFocus: state.focus,
        iconActive: state.active
      }),
      children: emptyIcon && !state.filled ? emptyIcon : icon
    });

    if (readOnly) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", (0, _extends2.default)({}, labelProps, {
        children: container
      }), state.value);
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(RatingLabel, (0, _extends2.default)({
        styleProps: (0, _extends2.default)({}, styleProps, {
          emptyValueFocused: undefined
        }),
        htmlFor: id
      }, labelProps, {
        children: [container, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: classes.visuallyHidden,
          children: getLabelText(state.value)
        })]
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        className: classes.visuallyHidden,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
        onClick: handleClear,
        disabled: disabled,
        value: state.value,
        id: id,
        type: "radio",
        name: name,
        checked: state.checked
      })]
    }, state.value);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(RatingRoot, (0, _extends2.default)({
    ref: handleRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    role: readOnly ? 'img' : null,
    "aria-label": readOnly ? getLabelText(value) : null
  }, other, {
    children: [Array.from(new Array(max)).map((_, index) => {
      const itemValue = index + 1;

      if (precision < 1) {
        const items = Array.from(new Array(1 / precision));
        const iconActive = itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1);
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(RatingDecimal, {
          className: (0, _clsx.default)(classes.decimal, iconActive && classes.iconActive),
          styleProps: (0, _extends2.default)({}, styleProps, {
            iconActive
          }),
          children: items.map(($, indexDecimal) => {
            const itemDecimalValue = roundValueToPrecision(itemValue - 1 + (indexDecimal + 1) * precision, precision);
            return item({
              value: itemDecimalValue,
              filled: highlightSelectedOnly ? itemDecimalValue === value : itemDecimalValue <= value,
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
          })
        }, itemValue);
      }

      return item({
        value: itemValue,
        active: itemValue === value && (hover !== -1 || focus !== -1),
        filled: highlightSelectedOnly ? itemValue === value : itemValue <= value,
        hover: itemValue <= hover,
        focus: itemValue <= focus,
        checked: itemValue === valueRounded
      });
    }), !readOnly && !disabled && /*#__PURE__*/(0, _jsxRuntime.jsxs)(RatingLabel, {
      className: (0, _clsx.default)(classes.label, classes.labelEmptyValue),
      styleProps: styleProps,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        className: classes.visuallyHidden,
        value: "",
        id: `${name}-empty`,
        type: "radio",
        name: name,
        checked: valueRounded == null,
        onFocus: () => setEmptyValueFocused(true),
        onBlur: () => setEmptyValueFocused(false),
        onChange: handleChange
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: classes.visuallyHidden,
        children: emptyLabelText
      })]
    })]
  }));
});
process.env.NODE_ENV !== "production" ? Rating.propTypes
/* remove-proptypes */
= {
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
   * This is important for screen reader users.
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
   * If `true`, only the selected icon will be highlighted.
   * @default false
   */
  highlightSelectedOnly: _propTypes.default.bool,

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
   * @param {number|null} value The new value.
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
  size: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['large', 'medium', 'small']), _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The rating value.
   */
  value: _propTypes.default.number
} : void 0;
var _default = Rating;
exports.default = _default;