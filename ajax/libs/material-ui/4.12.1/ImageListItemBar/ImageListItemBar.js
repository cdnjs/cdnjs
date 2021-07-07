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

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _deprecatedPropType = _interopRequireDefault(require("../utils/deprecatedPropType"));

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 48,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily
    },

    /* Styles applied to the root element if `position="bottom"`. */
    positionBottom: {
      bottom: 0
    },

    /* Styles applied to the root element if `position="top"`. */
    positionTop: {
      top: 0
    },

    /* Styles applied to the root element if a `subtitle` is provided. */
    rootSubtitle: {
      height: 68
    },

    /* Styles applied to the title and subtitle container element. */
    titleWrap: {
      flexGrow: 1,
      marginLeft: 16,
      marginRight: 16,
      color: theme.palette.common.white,
      overflow: 'hidden'
    },

    /* Styles applied to the container element if `actionPosition="left"`. */
    titleWrapActionPosLeft: {
      marginLeft: 0
    },

    /* Styles applied to the container element if `actionPosition="right"`. */
    titleWrapActionPosRight: {
      marginRight: 0
    },

    /* Styles applied to the title container element. */
    title: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '24px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the subtitle container element. */
    subtitle: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the actionIcon if supplied. */
    actionIcon: {},

    /* Styles applied to the actionIcon if `actionPosition="left"`. */
    actionIconActionPosLeft: {
      order: -1
    }
  };
};

exports.styles = styles;
var ImageListItemBar = /*#__PURE__*/React.forwardRef(function ImageListItemBar(props, ref) {
  var actionIcon = props.actionIcon,
      _props$actionPosition = props.actionPosition,
      actionPosition = _props$actionPosition === void 0 ? 'right' : _props$actionPosition,
      classes = props.classes,
      className = props.className,
      subtitle = props.subtitle,
      title = props.title,
      _props$position = props.position,
      positionProp = _props$position === void 0 ? 'bottom' : _props$position,
      titlePosition = props.titlePosition,
      other = (0, _objectWithoutProperties2.default)(props, ["actionIcon", "actionPosition", "classes", "className", "subtitle", "title", "position", "titlePosition"]);
  var position = titlePosition || positionProp;
  var actionPos = actionIcon && actionPosition;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, subtitle && classes.rootSubtitle, {
      'bottom': classes.positionBottom,
      'top': classes.positionTop
    }[position]),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("div", {
    className: (0, _clsx.default)(classes.titleWrap, {
      'left': classes.titleWrapActionPosLeft,
      'right': classes.titleWrapActionPosRight
    }[actionPos])
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.title
  }, title), subtitle ? /*#__PURE__*/React.createElement("div", {
    className: classes.subtitle
  }, subtitle) : null), actionIcon ? /*#__PURE__*/React.createElement("div", {
    className: (0, _clsx.default)(classes.actionIcon, actionPos === 'left' && classes.actionIconActionPosLeft)
  }, actionIcon) : null);
});
process.env.NODE_ENV !== "production" ? ImageListItemBar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon: _propTypes.default.node,

  /**
   * Position of secondary action IconButton.
   */
  actionPosition: _propTypes.default.oneOf(['left', 'right']),

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
   * Position of the title bar.
   */
  position: _propTypes.default.oneOf(['bottom', 'top']),

  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: _propTypes.default.node,

  /**
   * Title to be displayed on item.
   */
  title: _propTypes.default.node,

  /**
   * Position of the title bar.
   * @deprecated Use position instead.
   */
  titlePosition: (0, _deprecatedPropType.default)(_propTypes.default.oneOf(['bottom', 'top']), 'Use the `position` prop instead.')
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiImageListItemBar'
})(ImageListItemBar);

exports.default = _default;