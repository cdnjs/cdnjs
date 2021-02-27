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

var _Typography = _interopRequireDefault(require("../Typography"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _FormControlContext = _interopRequireWildcard(require("../FormControl/FormControlContext"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    height: '0.01em',
    // Fix IE11 flexbox alignment. To remove at some point.
    maxHeight: '2em',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    color: theme.palette.action.active
  },

  /* Styles applied to the root element if `variant="filled"`. */
  filled: {
    '&$positionStart:not($hiddenLabel)': {
      marginTop: 16
    }
  },

  /* Styles applied to the root element if `position="start"`. */
  positionStart: {
    marginRight: 8
  },

  /* Styles applied to the root element if `position="end"`. */
  positionEnd: {
    marginLeft: 8
  },

  /* Styles applied to the root element if `disablePointerEvents={true}`. */
  disablePointerEvents: {
    pointerEvents: 'none'
  },

  /* Styles applied if the adornment is used inside <FormControl hiddenLabel />. */
  hiddenLabel: {},

  /* Styles applied if the adornment is used inside <FormControl size="small" />. */
  sizeSmall: {}
});

exports.styles = styles;
const InputAdornment = /*#__PURE__*/React.forwardRef(function InputAdornment(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'div',
    disablePointerEvents = false,
    disableTypography = false,
    position,
    variant: variantProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classes", "className", "component", "disablePointerEvents", "disableTypography", "position", "variant"]);
  const muiFormControl = (0, _FormControlContext.useFormControl)() || {};
  let variant = variantProp;

  if (variantProp && muiFormControl.variant) {
    if (process.env.NODE_ENV !== 'production') {
      if (variantProp === muiFormControl.variant) {
        console.error('Material-UI: The `InputAdornment` variant infers the variant prop ' + 'you do not have to provide one.');
      }
    }
  }

  if (muiFormControl && !variant) {
    variant = muiFormControl.variant;
  }

  return /*#__PURE__*/React.createElement(_FormControlContext.default.Provider, {
    value: null
  }, /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, disablePointerEvents && classes.disablePointerEvents, muiFormControl.hiddenLabel && classes.hiddenLabel, variant === 'filled' && classes.filled, {
      'start': classes.positionStart,
      'end': classes.positionEnd
    }[position], muiFormControl.size === 'small' && classes.sizeSmall),
    ref: ref
  }, other), typeof children === 'string' && !disableTypography ? /*#__PURE__*/React.createElement(_Typography.default, {
    color: "textSecondary"
  }, children) : /*#__PURE__*/React.createElement(React.Fragment, null, position === 'start' ?
  /*#__PURE__*/

  /* notranslate needed while Google Translate will not fix zero-width space issue */

  /* eslint-disable-next-line react/no-danger */
  React.createElement("span", {
    className: "notranslate",
    dangerouslySetInnerHTML: {
      __html: '&#8203;'
    }
  }) : null, children)));
});
process.env.NODE_ENV !== "production" ? InputAdornment.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the `input` on click.
   * @default false
   */
  disablePointerEvents: _propTypes.default.bool,

  /**
   * If children is a string then disable wrapping in a Typography component.
   * @default false
   */
  disableTypography: _propTypes.default.bool,

  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: _propTypes.default.oneOf(['end', 'start']),

  /**
   * The variant to use.
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant: _propTypes.default.oneOf(['filled', 'outlined', 'standard'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiInputAdornment'
})(InputAdornment);

exports.default = _default;