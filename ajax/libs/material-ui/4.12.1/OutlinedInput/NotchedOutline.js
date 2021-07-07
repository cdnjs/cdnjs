"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      top: -5,
      left: 0,
      margin: 0,
      padding: '0 8px',
      pointerEvents: 'none',
      borderRadius: 'inherit',
      borderStyle: 'solid',
      borderWidth: 1,
      overflow: 'hidden'
    },

    /* Styles applied to the legend element when `labelWidth` is provided. */
    legend: {
      textAlign: 'left',
      padding: 0,
      lineHeight: '11px',
      // sync with `height` in `legend` styles
      transition: theme.transitions.create('width', {
        duration: 150,
        easing: theme.transitions.easing.easeOut
      })
    },

    /* Styles applied to the legend element. */
    legendLabelled: {
      display: 'block',
      width: 'auto',
      textAlign: 'left',
      padding: 0,
      height: 11,
      // sync with `lineHeight` in `legend` styles
      fontSize: '0.75em',
      visibility: 'hidden',
      maxWidth: 0.01,
      transition: theme.transitions.create('max-width', {
        duration: 50,
        easing: theme.transitions.easing.easeOut
      }),
      '& > span': {
        paddingLeft: 5,
        paddingRight: 5,
        display: 'inline-block'
      }
    },

    /* Styles applied to the legend element is notched. */
    legendNotched: {
      maxWidth: 1000,
      transition: theme.transitions.create('max-width', {
        duration: 100,
        easing: theme.transitions.easing.easeOut,
        delay: 50
      })
    }
  };
};
/**
 * @ignore - internal component.
 */


exports.styles = styles;
var NotchedOutline = /*#__PURE__*/React.forwardRef(function NotchedOutline(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      label = props.label,
      labelWidthProp = props.labelWidth,
      notched = props.notched,
      style = props.style,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "label", "labelWidth", "notched", "style"]);
  var theme = (0, _useTheme.default)();
  var align = theme.direction === 'rtl' ? 'right' : 'left';

  if (label !== undefined) {
    return /*#__PURE__*/React.createElement("fieldset", (0, _extends3.default)({
      "aria-hidden": true,
      className: (0, _clsx.default)(classes.root, className),
      ref: ref,
      style: style
    }, other), /*#__PURE__*/React.createElement("legend", {
      className: (0, _clsx.default)(classes.legendLabelled, notched && classes.legendNotched)
    }, label ? /*#__PURE__*/React.createElement("span", null, label) : /*#__PURE__*/React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: '&#8203;'
      }
    })));
  }

  var labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0.01;
  return /*#__PURE__*/React.createElement("fieldset", (0, _extends3.default)({
    "aria-hidden": true,
    style: (0, _extends3.default)((0, _defineProperty2.default)({}, "padding".concat((0, _capitalize.default)(align)), 8), style),
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("legend", {
    className: classes.legend,
    style: {
      // IE 11: fieldset with legend does not render
      // a border radius. This maintains consistency
      // by always having a legend rendered
      width: notched ? labelWidth : 0.01
    }
  }, /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: '&#8203;'
    }
  })));
});
process.env.NODE_ENV !== "production" ? NotchedOutline.propTypes = {
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

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
   * The label.
   */
  label: _propTypes.default.node,

  /**
   * The width of the label.
   */
  labelWidth: _propTypes.default.number.isRequired,

  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: _propTypes.default.bool.isRequired,

  /**
   * @ignore
   */
  style: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'PrivateNotchedOutline'
})(NotchedOutline);

exports.default = _default;