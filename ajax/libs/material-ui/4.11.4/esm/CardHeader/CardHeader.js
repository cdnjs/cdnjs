import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
export var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: 16
  },

  /* Styles applied to the avatar element. */
  avatar: {
    flex: '0 0 auto',
    marginRight: 16
  },

  /* Styles applied to the action element. */
  action: {
    flex: '0 0 auto',
    alignSelf: 'flex-start',
    marginTop: -8,
    marginRight: -8
  },

  /* Styles applied to the content wrapper element. */
  content: {
    flex: '1 1 auto'
  },

  /* Styles applied to the title Typography element. */
  title: {},

  /* Styles applied to the subheader Typography element. */
  subheader: {}
};
var CardHeader = /*#__PURE__*/React.forwardRef(function CardHeader(props, ref) {
  var action = props.action,
      avatar = props.avatar,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$disableTypogra = props.disableTypography,
      disableTypography = _props$disableTypogra === void 0 ? false : _props$disableTypogra,
      subheaderProp = props.subheader,
      subheaderTypographyProps = props.subheaderTypographyProps,
      titleProp = props.title,
      titleTypographyProps = props.titleTypographyProps,
      other = _objectWithoutProperties(props, ["action", "avatar", "classes", "className", "component", "disableTypography", "subheader", "subheaderTypographyProps", "title", "titleTypographyProps"]);

  var title = titleProp;

  if (title != null && title.type !== Typography && !disableTypography) {
    title = /*#__PURE__*/React.createElement(Typography, _extends({
      variant: avatar ? 'body2' : 'h5',
      className: classes.title,
      component: "span",
      display: "block"
    }, titleTypographyProps), title);
  }

  var subheader = subheaderProp;

  if (subheader != null && subheader.type !== Typography && !disableTypography) {
    subheader = /*#__PURE__*/React.createElement(Typography, _extends({
      variant: avatar ? 'body2' : 'body1',
      className: classes.subheader,
      color: "textSecondary",
      component: "span",
      display: "block"
    }, subheaderTypographyProps), subheader);
  }

  return /*#__PURE__*/React.createElement(Component, _extends({
    className: clsx(classes.root, className),
    ref: ref
  }, other), avatar && /*#__PURE__*/React.createElement("div", {
    className: classes.avatar
  }, avatar), /*#__PURE__*/React.createElement("div", {
    className: classes.content
  }, title, subheader), action && /*#__PURE__*/React.createElement("div", {
    className: classes.action
  }, action));
});
process.env.NODE_ENV !== "production" ? CardHeader.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display in the card header.
   */
  action: PropTypes.node,

  /**
   * The Avatar for the Card Header.
   */
  avatar: PropTypes.node,

  /**
   * @ignore
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `title` text, and optional `subheader` text
   * with the Typography component.
   */
  disableTypography: PropTypes.bool,

  /**
   * The content of the component.
   */
  subheader: PropTypes.node,

  /**
   * These props will be forwarded to the subheader
   * (as long as disableTypography is not `true`).
   */
  subheaderTypographyProps: PropTypes.object,

  /**
   * The content of the Card Title.
   */
  title: PropTypes.node,

  /**
   * These props will be forwarded to the title
   * (as long as disableTypography is not `true`).
   */
  titleTypographyProps: PropTypes.object
} : void 0;
export default withStyles(styles, {
  name: 'MuiCardHeader'
})(CardHeader);