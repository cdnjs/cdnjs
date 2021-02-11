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

var _Add = _interopRequireDefault(require("../internal/svg-icons/Add"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 24
  },

  /* Styles applied to the icon component. */
  icon: {
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    })
  },

  /* Styles applied to the icon component if `open={true}`. */
  iconOpen: {
    transform: 'rotate(45deg)'
  },

  /* Styles applied to the icon when an `openIcon` is provided and if `open={true}`. */
  iconWithOpenIconOpen: {
    opacity: 0
  },

  /* Styles applied to the `openIcon` if provided. */
  openIcon: {
    position: 'absolute',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    transform: 'rotate(-45deg)'
  },

  /* Styles applied to the `openIcon` if provided and if `open={true}`. */
  openIconOpen: {
    transform: 'rotate(0deg)',
    opacity: 1
  }
});

exports.styles = styles;
const SpeedDialIcon = /*#__PURE__*/React.forwardRef(function SpeedDialIcon(props, ref) {
  const {
    className,
    classes,
    icon: iconProp,
    open,
    openIcon: openIconProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "classes", "icon", "open", "openIcon"]);
  const iconClassName = (0, _clsx.default)(classes.icon, open && [classes.iconOpen, openIconProp && classes.iconWithOpenIconOpen]);
  const openIconClassName = (0, _clsx.default)(classes.openIcon, open && classes.openIconOpen);

  function formatIcon(icon, newClassName) {
    if ( /*#__PURE__*/React.isValidElement(icon)) {
      return /*#__PURE__*/React.cloneElement(icon, {
        className: newClassName
      });
    }

    return icon;
  }

  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other), openIconProp ? formatIcon(openIconProp, openIconClassName) : null, iconProp ? formatIcon(iconProp, iconClassName) : /*#__PURE__*/React.createElement(_Add.default, {
    className: iconClassName
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDialIcon.propTypes = {
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
   * The icon to display.
   */
  icon: _propTypes.default.node,

  /**
   * @ignore
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,

  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: _propTypes.default.node
} : void 0;
SpeedDialIcon.muiName = 'SpeedDialIcon';

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiSpeedDialIcon'
})(SpeedDialIcon);

exports.default = _default;