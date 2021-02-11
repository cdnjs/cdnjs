"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _colorManipulator = require("../styles/colorManipulator");

var _Fab = _interopRequireDefault(require("../Fab"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

// @inheritedComponent Tooltip
const styles = theme => ({
  /* Styles applied to the Fab component. */
  fab: {
    margin: 8,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.background.paper, 0.15)
    },
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter
    })}, opacity 0.8s`,
    opacity: 1
  },

  /* Styles applied to the Fab component if `open={false}`. */
  fabClosed: {
    opacity: 0,
    transform: 'scale(0)'
  },

  /* Styles applied to the root element if `tooltipOpen={true}`. */
  staticTooltip: {
    position: 'relative',
    display: 'flex',
    '& $staticTooltipLabel': {
      transition: theme.transitions.create(['transform', 'opacity'], {
        duration: theme.transitions.duration.shorter
      }),
      opacity: 1
    }
  },

  /* Styles applied to the root element if `tooltipOpen={true}` and `open={false}`. */
  staticTooltipClosed: {
    '& $staticTooltipLabel': {
      opacity: 0,
      transform: 'scale(0.5)'
    }
  },

  /* Styles applied to the static tooltip label if `tooltipOpen={true}`. */
  staticTooltipLabel: (0, _extends2.default)({
    position: 'absolute'
  }, theme.typography.body1, {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    color: theme.palette.text.secondary,
    padding: '4px 16px',
    wordBreak: 'keep-all'
  }),

  /* Styles applied to the root element if `tooltipOpen={true}` and `tooltipPlacement="left"`` */
  tooltipPlacementLeft: {
    alignItems: 'center',
    '& $staticTooltipLabel': {
      transformOrigin: '100% 50%',
      right: '100%',
      marginRight: 8
    }
  },

  /* Styles applied to the root element if `tooltipOpen={true}` and `tooltipPlacement="right"`` */
  tooltipPlacementRight: {
    alignItems: 'center',
    '& $staticTooltipLabel': {
      transformOrigin: '0% 50%',
      left: '100%',
      marginLeft: 8
    }
  }
});

exports.styles = styles;
const SpeedDialAction = /*#__PURE__*/React.forwardRef(function SpeedDialAction(props, ref) {
  const {
    classes,
    className,
    delay = 0,
    FabProps = {},
    icon,
    id,
    open,
    TooltipClasses,
    tooltipOpen: tooltipOpenProp = false,
    tooltipPlacement = 'left',
    tooltipTitle
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "className", "delay", "FabProps", "icon", "id", "open", "TooltipClasses", "tooltipOpen", "tooltipPlacement", "tooltipTitle"]);
  const [tooltipOpen, setTooltipOpen] = React.useState(tooltipOpenProp);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const transitionStyle = {
    transitionDelay: `${delay}ms`
  };
  const fab = /*#__PURE__*/React.createElement(_Fab.default, (0, _extends2.default)({
    size: "small",
    className: (0, _clsx.default)(classes.fab, className, !open && classes.fabClosed),
    tabIndex: -1,
    role: "menuitem",
    "aria-describedby": `${id}-label`
  }, FabProps, {
    style: (0, _extends2.default)({}, transitionStyle, FabProps.style)
  }), icon);

  if (tooltipOpenProp) {
    return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
      id: id,
      ref: ref,
      className: (0, _clsx.default)(classes.staticTooltip, classes[`tooltipPlacement${(0, _capitalize.default)(tooltipPlacement)}`], !open && classes.staticTooltipClosed)
    }, other), /*#__PURE__*/React.createElement("span", {
      style: transitionStyle,
      id: `${id}-label`,
      className: classes.staticTooltipLabel
    }, tooltipTitle), fab);
  }

  return /*#__PURE__*/React.createElement(_Tooltip.default, (0, _extends2.default)({
    id: id,
    ref: ref,
    title: tooltipTitle,
    placement: tooltipPlacement,
    onClose: handleTooltipClose,
    onOpen: handleTooltipOpen,
    open: open && tooltipOpen,
    classes: TooltipClasses
  }, other), fab);
});
process.env.NODE_ENV !== "production" ? SpeedDialAction.propTypes = {
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
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay: _propTypes.default.number,

  /**
   * Props applied to the [`Fab`](/api/fab/) component.
   * @default {}
   */
  FabProps: _propTypes.default.object,

  /**
   * The icon to display in the SpeedDial Fab.
   */
  icon: _propTypes.default.node,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: _propTypes.default.string,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,

  /**
   * `classes` prop applied to the [`Tooltip`](/api/tooltip/) element.
   */
  TooltipClasses: _propTypes.default.object,

  /**
   * Make the tooltip always visible when the SpeedDial is open.
   * @default false
   */
  tooltipOpen: _propTypes.default.bool,

  /**
   * Placement of the tooltip.
   * @default 'left'
   */
  tooltipPlacement: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: _propTypes.default.node
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiSpeedDialAction'
})(SpeedDialAction);

exports.default = _default;