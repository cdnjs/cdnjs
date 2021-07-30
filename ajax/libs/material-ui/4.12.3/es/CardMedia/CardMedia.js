import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { chainPropTypes } from '@material-ui/utils';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  /* Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. */
  media: {
    width: '100%'
  },

  /* Styles applied to the root element if `component="picture or img"`. */
  img: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover'
  }
};
const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];
const CardMedia = /*#__PURE__*/React.forwardRef(function CardMedia(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'div',
    image,
    src,
    style
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "component", "image", "src", "style"]);

  const isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1;
  const composedStyle = !isMediaComponent && image ? _extends({
    backgroundImage: `url("${image}")`
  }, style) : style;
  return /*#__PURE__*/React.createElement(Component, _extends({
    className: clsx(classes.root, className, isMediaComponent && classes.media, "picture img".indexOf(Component) !== -1 && classes.img),
    ref: ref,
    style: composedStyle,
    src: isMediaComponent ? image || src : undefined
  }, other), children);
});
process.env.NODE_ENV !== "production" ? CardMedia.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node, props => {
    if (!props.children && !props.image && !props.src && !props.component) {
      return new Error('Material-UI: Either `children`, `image`, `src` or `component` prop must be specified.');
    }

    return null;
  }),

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
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: PropTypes.string,

  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: PropTypes.string,

  /**
   * @ignore
   */
  style: PropTypes.object
} : void 0;
export default withStyles(styles, {
  name: 'MuiCardMedia'
})(CardMedia);