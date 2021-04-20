import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge } from '@material-ui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import imageListItemBarClasses, { getImageListItemBarUtilityClass } from './imageListItemBarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(_extends({}, styles[`position${capitalize(styleProps.position)}`], {
    [`& .${imageListItemBarClasses.titleWrap}`]: _extends({}, styles.titleWrap, styles[`titleWrap${capitalize(styleProps.position)}`], styleProps.actionIcon && styles[`titleWrapActionPos${capitalize(styleProps.actionPosition)}`]),
    [`& .${imageListItemBarClasses.title}`]: styles.title,
    [`& .${imageListItemBarClasses.subtitle}`]: styles.subtitle,
    [`& .${imageListItemBarClasses.actionIcon}`]: _extends({}, styles.actionIcon, styles[`actionIconActionPos${capitalize(styleProps.actionPosition)}`])
  }), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    position,
    actionIcon,
    actionPosition
  } = styleProps;
  const slots = {
    root: ['root', `position${capitalize(position)}`],
    titleWrap: ['titleWrap', `titleWrap${capitalize(position)}`, actionIcon && `titleWrapActionPos${capitalize(actionPosition)}`],
    title: ['title'],
    subtitle: ['subtitle'],
    actionIcon: ['actionIcon', `actionIconActionPos${capitalize(actionPosition)}`]
  };
  return composeClasses(slots, getImageListItemBarUtilityClass, classes);
};

const ImageListItemBarRoot = experimentalStyled('div', {}, {
  name: 'MuiImageListItemBar',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => {
  return _extends({
    /* Styles applied to the root element. */
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily
  }, styleProps.position === 'bottom' && {
    bottom: 0
  }, styleProps.position === 'top' && {
    top: 0
  }, styleProps.position === 'below' && {
    position: 'relative',
    background: 'transparent',
    alignItems: 'normal'
  });
});
const ImageListItemBarTitleWrap = experimentalStyled('div', {}, {
  name: 'MuiImageListItemBar',
  slot: 'TitleWrap'
})(({
  theme,
  styleProps
}) => {
  return _extends({
    /* Styles applied to the title and subtitle container element. */
    flexGrow: 1,
    padding: '12px 16px',
    color: theme.palette.common.white,
    overflow: 'hidden'
  }, styleProps.position === 'below' && {
    padding: '6px 0 12px',
    color: 'inherit'
  }, styleProps.actionIcon && styleProps.actionPosition === 'left' && {
    paddingLeft: 0
  }, styleProps.actionIcon && styleProps.actionPosition === 'right' && {
    paddingRight: 0
  });
});
const ImageListItemBarTitle = experimentalStyled('div', {}, {
  name: 'MuiImageListItemBar',
  slot: 'Title'
})(({
  theme
}) => {
  return {
    /* Styles applied to the title container element. */
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
});
const ImageListItemBarSubtitle = experimentalStyled('div', {}, {
  name: 'MuiImageListItemBar',
  slot: 'Subtitle'
})(({
  theme
}) => {
  return {
    /* Styles applied to the subtitle container element. */
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
});
const ImageListItemBarActionIcon = experimentalStyled('div', {}, {
  name: 'MuiImageListItemBar',
  slot: 'ActionIcon'
})(({
  styleProps
}) => {
  return _extends({}, styleProps.actionPosition === 'left' && {
    order: -1
  });
});
const ImageListItemBar = /*#__PURE__*/React.forwardRef(function ImageListItemBar(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiImageListItemBar'
  });

  const {
    actionIcon,
    actionPosition = 'right',
    className,
    subtitle,
    title,
    position = 'bottom'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["actionIcon", "actionPosition", "className", "subtitle", "title", "position"]);

  const styleProps = _extends({}, props, {
    position,
    actionPosition
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(ImageListItemBarRoot, _extends({
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: [/*#__PURE__*/_jsxs(ImageListItemBarTitleWrap, {
      styleProps: styleProps,
      className: classes.titleWrap,
      children: [/*#__PURE__*/_jsx(ImageListItemBarTitle, {
        className: classes.title,
        children: title
      }), subtitle ? /*#__PURE__*/_jsx(ImageListItemBarSubtitle, {
        className: classes.subtitle,
        children: subtitle
      }) : null]
    }), actionIcon ? /*#__PURE__*/_jsx(ImageListItemBarActionIcon, {
      styleProps: styleProps,
      className: classes.actionIcon,
      children: actionIcon
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? ImageListItemBar.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon: PropTypes.node,

  /**
   * Position of secondary action IconButton.
   * @default 'right'
   */
  actionPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Position of the title bar.
   * @default 'bottom'
   */
  position: PropTypes.oneOf(['below', 'bottom', 'top']),

  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * Title to be displayed.
   */
  title: PropTypes.node
} : void 0;
export default ImageListItemBar;