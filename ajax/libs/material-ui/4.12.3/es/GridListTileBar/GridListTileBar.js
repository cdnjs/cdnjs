import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
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

  /* Styles applied to the root element if `titlePosition="bottom"`. */
  titlePositionBottom: {
    bottom: 0
  },

  /* Styles applied to the root element if `titlePosition="top"`. */
  titlePositionTop: {
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
});
let warnedOnce = false;
/**
 * ⚠️ The GridListTileBar component was renamed to ImageListItemBar to align with the current Material Design naming.
 *
 * You should use `import { ImageListItemBar } from '@material-ui/core'`
 * or `import ImageListItemBar from '@material-ui/core/ImageListItemBar'`.
 */

const GridListTileBar = /*#__PURE__*/React.forwardRef(function GridListTileBar(props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(['Material-UI: The GridListTileBar component was renamed to ImageListItemBar to align with the current Material Design naming.', '', "You should use `import { ImageListItemBar } from '@material-ui/core'`", "or `import ImageListItemBar from '@material-ui/core/ImageListItemBar'`."].join('\n'));
    }
  }

  const {
    actionIcon,
    actionPosition = 'right',
    classes,
    className,
    subtitle,
    title,
    titlePosition = 'bottom'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["actionIcon", "actionPosition", "classes", "className", "subtitle", "title", "titlePosition"]);

  const actionPos = actionIcon && actionPosition;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx(classes.root, className, titlePosition === 'top' ? classes.titlePositionTop : classes.titlePositionBottom, subtitle && classes.rootSubtitle),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.titleWrap, {
      'left': classes.titleWrapActionPosLeft,
      'right': classes.titleWrapActionPosRight
    }[actionPos])
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.title
  }, title), subtitle ? /*#__PURE__*/React.createElement("div", {
    className: classes.subtitle
  }, subtitle) : null), actionIcon ? /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.actionIcon, actionPos === 'left' && classes.actionIconActionPosLeft)
  }, actionIcon) : null);
});
process.env.NODE_ENV !== "production" ? GridListTileBar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon: PropTypes.node,

  /**
   * Position of secondary action IconButton.
   */
  actionPosition: PropTypes.oneOf(['left', 'right']),

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
   * String or element serving as subtitle (support text).
   */
  subtitle: PropTypes.node,

  /**
   * Title to be displayed on tile.
   */
  title: PropTypes.node,

  /**
   * Position of the title bar.
   */
  titlePosition: PropTypes.oneOf(['bottom', 'top'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiGridListTileBar'
})(GridListTileBar);