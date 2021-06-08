"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _colorManipulator = require("../styles/colorManipulator");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _SwitchBase = _interopRequireDefault(require("../internal/SwitchBase"));

// @inheritedComponent IconButton
var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
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
    },

    /* Styles applied to the root element if `edge="start"`. */
    edgeStart: {
      marginLeft: -8
    },

    /* Styles applied to the root element if `edge="end"`. */
    edgeEnd: {
      marginRight: -8
    },

    /* Styles applied to the internal `SwitchBase` component's `root` class. */
    switchBase: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      // Render above the focus ripple.
      color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
      transition: theme.transitions.create(['left', 'transform'], {
        duration: theme.transitions.duration.shortest
      }),
      '&$checked': {
        transform: 'translateX(20px)'
      },
      '&$disabled': {
        color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800]
      },
      '&$checked + $track': {
        opacity: 0.5
      },
      '&$disabled + $track': {
        opacity: theme.palette.type === 'light' ? 0.12 : 0.1
      }
    },

    /* Styles applied to the internal SwitchBase component's root element if `color="primary"`. */
    colorPrimary: {
      '&$checked': {
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: (0, _colorManipulator.fade)(theme.palette.primary.main, theme.palette.action.hoverOpacity),
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800]
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.primary.main
      },
      '&$disabled + $track': {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
      }
    },

    /* Styles applied to the internal SwitchBase component's root element if `color="secondary"`. */
    colorSecondary: {
      '&$checked': {
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: (0, _colorManipulator.fade)(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800]
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.secondary.main
      },
      '&$disabled + $track': {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
      }
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      width: 40,
      height: 24,
      padding: 7,
      '& $thumb': {
        width: 16,
        height: 16
      },
      '& $switchBase': {
        padding: 4,
        '&$checked': {
          transform: 'translateX(16px)'
        }
      }
    },

    /* Pseudo-class applied to the internal `SwitchBase` component's `checked` class. */
    checked: {},

    /* Pseudo-class applied to the internal SwitchBase component's disabled class. */
    disabled: {},

    /* Styles applied to the internal SwitchBase component's input element. */
    input: {
      left: '-100%',
      width: '300%'
    },

    /* Styles used to create the thumb passed to the internal `SwitchBase` component `icon` prop. */
    thumb: {
      boxShadow: theme.shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%'
    },

    /* Styles applied to the track element. */
    track: {
      height: '100%',
      width: '100%',
      borderRadius: 14 / 2,
      zIndex: -1,
      transition: theme.transitions.create(['opacity', 'background-color'], {
        duration: theme.transitions.duration.shortest
      }),
      backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
      opacity: theme.palette.type === 'light' ? 0.38 : 0.3
    }
  };
};

exports.styles = styles;
var Switch = /*#__PURE__*/React.forwardRef(function Switch(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      _props$edge = props.edge,
      edge = _props$edge === void 0 ? false : _props$edge,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "color", "edge", "size"]);
  var icon = /*#__PURE__*/React.createElement("span", {
    className: classes.thumb
  });
  return /*#__PURE__*/React.createElement("span", {
    className: (0, _clsx.default)(classes.root, className, {
      'start': classes.edgeStart,
      'end': classes.edgeEnd
    }[edge], size === "small" && classes["size".concat((0, _capitalize.default)(size))])
  }, /*#__PURE__*/React.createElement(_SwitchBase.default, (0, _extends2.default)({
    type: "checkbox",
    icon: icon,
    checkedIcon: icon,
    classes: {
      root: (0, _clsx.default)(classes.switchBase, classes["color".concat((0, _capitalize.default)(color))]),
      input: classes.input,
      checked: classes.checked,
      disabled: classes.disabled
    },
    ref: ref
  }, other)), /*#__PURE__*/React.createElement("span", {
    className: classes.track
  }));
});
process.env.NODE_ENV !== "production" ? Switch.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: _propTypes.default.bool,

  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: _propTypes.default.oneOf(['default', 'primary', 'secondary']),

  /**
   * @ignore
   */
  defaultChecked: _propTypes.default.bool,

  /**
   * If `true`, the switch will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: _propTypes.default.bool,

  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   */
  edge: _propTypes.default.oneOf(['end', 'start', false]),

  /**
   * The icon to display when the component is unchecked.
   */
  icon: _propTypes.default.node,

  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: _propTypes.default.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _utils.refType,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: _propTypes.default.func,

  /**
   * If `true`, the `input` element will be required.
   */
  required: _propTypes.default.bool,

  /**
   * The size of the switch.
   * `small` is equivalent to the dense switch styling.
   */
  size: _propTypes.default.oneOf(['medium', 'small']),

  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: _propTypes.default.any
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiSwitch'
})(Switch);

exports.default = _default;