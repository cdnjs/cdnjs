"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NotchedOutline;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _jsxRuntime = require("react/jsx-runtime");

const NotchedOutlineRoot = (0, _experimentalStyled.default)('fieldset')({
  textAlign: 'left',
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
  overflow: 'hidden',
  minWidth: '0%'
});
const NotchedOutlineLegend = (0, _experimentalStyled.default)('legend')(({
  styleProps,
  theme
}) => (0, _extends2.default)({}, styleProps.label === undefined && {
  padding: 0,
  lineHeight: '11px',
  // sync with `height` in `legend` styles
  transition: theme.transitions.create('width', {
    duration: 150,
    easing: theme.transitions.easing.easeOut
  })
}, styleProps.label !== undefined && (0, _extends2.default)({
  display: 'block',
  width: 'auto',
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
}, styleProps.notched && {
  maxWidth: '100%',
  transition: theme.transitions.create('max-width', {
    duration: 100,
    easing: theme.transitions.easing.easeOut,
    delay: 50
  })
})));
/**
 * @ignore - internal component.
 */

function NotchedOutline(props) {
  const {
    className,
    label,
    labelWidth: labelWidthProp,
    notched,
    style
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classes", "className", "label", "labelWidth", "notched", "style"]);
  const theme = (0, _useTheme.default)();
  const align = theme.direction === 'rtl' ? 'right' : 'left';
  const styleProps = (0, _extends2.default)({}, props, {
    notched,
    label
  });

  if (label !== undefined) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(NotchedOutlineRoot, (0, _extends2.default)({
      "aria-hidden": true,
      className: className,
      style: style,
      styleProps: styleProps
    }, other, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(NotchedOutlineLegend, {
        styleProps: styleProps,
        children: label ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: label
        }) :
        /*#__PURE__*/
        // notranslate needed while Google Translate will not fix zero-width space issue
        // eslint-disable-next-line react/no-danger
        (0, _jsxRuntime.jsx)("span", {
          className: "notranslate",
          dangerouslySetInnerHTML: {
            __html: '&#8203;'
          }
        })
      })
    }));
  }

  const labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0.01; // TODO remove this branch

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(NotchedOutlineRoot, (0, _extends2.default)({
    "aria-hidden": true,
    style: (0, _extends2.default)({
      [`padding${(0, _capitalize.default)(align)}`]: 8
    }, style),
    className: className,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(NotchedOutlineLegend, {
      styleProps: styleProps,
      style: {
        // IE11: fieldset with legend does not render
        // a border radius. This maintains consistency
        // by always having a legend rendered
        width: notched ? labelWidth : 0.01
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "notranslate",
        dangerouslySetInnerHTML: {
          __html: '&#8203;'
        }
      })
    })
  }));
}

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