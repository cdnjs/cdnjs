import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import useTheme from '../styles/useTheme';
import capitalize from '../utils/capitalize';
import experimentalStyled from '../styles/experimentalStyled';
import { jsx as _jsx } from "react/jsx-runtime";
var NotchedOutlineRoot = experimentalStyled('fieldset')({
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
var NotchedOutlineLegend = experimentalStyled('legend')(function (_ref) {
  var styleProps = _ref.styleProps,
      theme = _ref.theme;
  return _extends({}, styleProps.label === undefined && {
    padding: 0,
    lineHeight: '11px',
    // sync with `height` in `legend` styles
    transition: theme.transitions.create('width', {
      duration: 150,
      easing: theme.transitions.easing.easeOut
    })
  }, styleProps.label !== undefined && _extends({
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
  }));
});
/**
 * @ignore - internal component.
 */

export default function NotchedOutline(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      label = props.label,
      labelWidthProp = props.labelWidth,
      notched = props.notched,
      style = props.style,
      other = _objectWithoutProperties(props, ["children", "classes", "className", "label", "labelWidth", "notched", "style"]);

  var theme = useTheme();
  var align = theme.direction === 'rtl' ? 'right' : 'left';

  var styleProps = _extends({}, props, {
    notched: notched,
    label: label
  });

  if (label !== undefined) {
    return /*#__PURE__*/_jsx(NotchedOutlineRoot, _extends({
      "aria-hidden": true,
      className: className,
      style: style,
      styleProps: styleProps
    }, other, {
      children: /*#__PURE__*/_jsx(NotchedOutlineLegend, {
        styleProps: styleProps,
        children: label ? /*#__PURE__*/_jsx("span", {
          children: label
        }) :
        /*#__PURE__*/
        // notranslate needed while Google Translate will not fix zero-width space issue
        // eslint-disable-next-line react/no-danger
        _jsx("span", {
          className: "notranslate",
          dangerouslySetInnerHTML: {
            __html: '&#8203;'
          }
        })
      })
    }));
  }

  var labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0.01; // TODO remove this branch

  return /*#__PURE__*/_jsx(NotchedOutlineRoot, _extends({
    "aria-hidden": true,
    style: _extends(_defineProperty({}, "padding".concat(capitalize(align)), 8), style),
    className: className,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/_jsx(NotchedOutlineLegend, {
      styleProps: styleProps,
      style: {
        // IE11: fieldset with legend does not render
        // a border radius. This maintains consistency
        // by always having a legend rendered
        width: notched ? labelWidth : 0.01
      },
      children: /*#__PURE__*/_jsx("span", {
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
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The label.
   */
  label: PropTypes.node,

  /**
   * The width of the label.
   */
  labelWidth: PropTypes.number.isRequired,

  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: PropTypes.bool.isRequired,

  /**
   * @ignore
   */
  style: PropTypes.object
} : void 0;