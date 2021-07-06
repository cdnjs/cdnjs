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

var _ArrowDownward = _interopRequireDefault(require("../internal/svg-icons/ArrowDownward"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'flex-start',
      flexDirection: 'inherit',
      alignItems: 'center',
      '&:focus': {
        color: theme.palette.text.secondary
      },
      '&:hover': {
        color: theme.palette.text.secondary,
        '& $icon': {
          opacity: 0.5
        }
      },
      '&$active': {
        color: theme.palette.text.primary,
        // && instead of & is a workaround for https://github.com/cssinjs/jss/issues/1045
        '&& $icon': {
          opacity: 1,
          color: theme.palette.text.secondary
        }
      }
    },

    /* Pseudo-class applied to the root element if `active={true}`. */
    active: {},

    /* Styles applied to the icon component. */
    icon: {
      fontSize: 18,
      marginRight: 4,
      marginLeft: 4,
      opacity: 0,
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter
      }),
      userSelect: 'none'
    },

    /* Styles applied to the icon component if `direction="desc"`. */
    iconDirectionDesc: {
      transform: 'rotate(0deg)'
    },

    /* Styles applied to the icon component if `direction="asc"`. */
    iconDirectionAsc: {
      transform: 'rotate(180deg)'
    }
  };
};
/**
 * A button based label for placing inside `TableCell` for column sorting.
 */


exports.styles = styles;
var TableSortLabel = /*#__PURE__*/React.forwardRef(function TableSortLabel(props, ref) {
  var _props$active = props.active,
      active = _props$active === void 0 ? false : _props$active,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'asc' : _props$direction,
      _props$hideSortIcon = props.hideSortIcon,
      hideSortIcon = _props$hideSortIcon === void 0 ? false : _props$hideSortIcon,
      _props$IconComponent = props.IconComponent,
      IconComponent = _props$IconComponent === void 0 ? _ArrowDownward.default : _props$IconComponent,
      other = (0, _objectWithoutProperties2.default)(props, ["active", "children", "classes", "className", "direction", "hideSortIcon", "IconComponent"]);
  return /*#__PURE__*/React.createElement(_ButtonBase.default, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, active && classes.active),
    component: "span",
    disableRipple: true,
    ref: ref
  }, other), children, hideSortIcon && !active ? null : /*#__PURE__*/React.createElement(IconComponent, {
    className: (0, _clsx.default)(classes.icon, classes["iconDirection".concat((0, _capitalize.default)(direction))])
  }));
});
process.env.NODE_ENV !== "production" ? TableSortLabel.propTypes = {
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   */
  active: _propTypes.default.bool,

  /**
   * Label contents, the arrow will be appended automatically.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The current sort direction.
   */
  direction: _propTypes.default.oneOf(['asc', 'desc']),

  /**
   * Hide sort icon when active is false.
   */
  hideSortIcon: _propTypes.default.bool,

  /**
   * Sort icon to use.
   */
  IconComponent: _propTypes.default.elementType
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTableSortLabel'
})(TableSortLabel);

exports.default = _default;