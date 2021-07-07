import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import useTheme from '../styles/useTheme';
import capitalize from '../utils/capitalize';
export const styles = theme => {
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

const NotchedOutline = /*#__PURE__*/React.forwardRef(function NotchedOutline(props, ref) {
  const {
    classes,
    className,
    label,
    labelWidth: labelWidthProp,
    notched,
    style
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "label", "labelWidth", "notched", "style"]);

  const theme = useTheme();
  const align = theme.direction === 'rtl' ? 'right' : 'left';

  if (label !== undefined) {
    return /*#__PURE__*/React.createElement("fieldset", _extends({
      "aria-hidden": true,
      className: clsx(classes.root, className),
      ref: ref,
      style: style
    }, other), /*#__PURE__*/React.createElement("legend", {
      className: clsx(classes.legendLabelled, notched && classes.legendNotched)
    }, label ? /*#__PURE__*/React.createElement("span", null, label) : /*#__PURE__*/React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: '&#8203;'
      }
    })));
  }

  const labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0.01;
  return /*#__PURE__*/React.createElement("fieldset", _extends({
    "aria-hidden": true,
    style: _extends({
      [`padding${capitalize(align)}`]: 8
    }, style),
    className: clsx(classes.root, className),
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
export default withStyles(styles, {
  name: 'PrivateNotchedOutline'
})(NotchedOutline);