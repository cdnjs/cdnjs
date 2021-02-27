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

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("../Step/StepContext"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto'
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    marginLeft: 12 // half icon

  },

  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)'
  },

  /* Pseudo-class applied to the root element if `active={true}`. */
  active: {},

  /* Pseudo-class applied to the root element if `completed={true}`. */
  completed: {},

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},

  /* Styles applied to the line element. */
  line: {
    display: 'block',
    borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  lineHorizontal: {
    borderTopStyle: 'solid',
    borderTopWidth: 1
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  lineVertical: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24
  }
});

exports.styles = styles;
const StepConnector = /*#__PURE__*/React.forwardRef(function StepConnector(props, ref) {
  const {
    classes,
    className
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "className"]);
  const {
    alternativeLabel,
    orientation
  } = React.useContext(_StepperContext.default);
  const {
    active,
    disabled,
    completed
  } = React.useContext(_StepContext.default);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, classes[orientation], className, alternativeLabel && classes.alternativeLabel, active && classes.active, completed && classes.completed, disabled && classes.disabled),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("span", {
    className: (0, _clsx.default)(classes.line, {
      'horizontal': classes.lineHorizontal,
      'vertical': classes.lineVertical
    }[orientation])
  }));
});
process.env.NODE_ENV !== "production" ? StepConnector.propTypes = {
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
  className: _propTypes.default.string
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStepConnector'
})(StepConnector);

exports.default = _default;