"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _debounce = _interopRequireDefault(require("../utils/debounce"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _isMuiElement = _interopRequireDefault(require("../utils/isMuiElement"));

var styles = {
  /* Styles applied to the root element. */
  root: {
    boxSizing: 'border-box',
    flexShrink: 0
  },

  /* Styles applied to the `div` element that wraps the children. */
  tile: {
    position: 'relative',
    display: 'block',
    // In case it's not rendered with a div.
    height: '100%',
    overflow: 'hidden'
  },

  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%'
  },

  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%'
  }
};
exports.styles = styles;

var fit = function fit(imgEl, classes) {
  if (!imgEl || !imgEl.complete) {
    return;
  }

  if (imgEl.width / imgEl.height > imgEl.parentElement.offsetWidth / imgEl.parentElement.offsetHeight) {
    var _imgEl$classList, _imgEl$classList2;

    (_imgEl$classList = imgEl.classList).remove.apply(_imgEl$classList, (0, _toConsumableArray2.default)(classes.imgFullWidth.split(' ')));

    (_imgEl$classList2 = imgEl.classList).add.apply(_imgEl$classList2, (0, _toConsumableArray2.default)(classes.imgFullHeight.split(' ')));
  } else {
    var _imgEl$classList3, _imgEl$classList4;

    (_imgEl$classList3 = imgEl.classList).remove.apply(_imgEl$classList3, (0, _toConsumableArray2.default)(classes.imgFullHeight.split(' ')));

    (_imgEl$classList4 = imgEl.classList).add.apply(_imgEl$classList4, (0, _toConsumableArray2.default)(classes.imgFullWidth.split(' ')));
  }
};

function ensureImageCover(imgEl, classes) {
  if (!imgEl) {
    return;
  }

  if (imgEl.complete) {
    fit(imgEl, classes);
  } else {
    imgEl.addEventListener('load', function () {
      fit(imgEl, classes);
    });
  }
}

var warnedOnce = false;
/**
 * ⚠️ The GridList component was renamed to ImageList to align with the current Material Design naming.
 *
 * You should use `import { ImageListTile } from '@material-ui/core'`
 * or `import ImageListTile from '@material-ui/core/ImageListTile'`.
 */

var GridListTile = /*#__PURE__*/React.forwardRef(function GridListTile(props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(['Material-UI: The GridListTile component was renamed to ImageListTile to align with the current Material Design naming.', '', "You should use `import { ImageListTile } from '@material-ui/core'`", "or `import ImageListTile from '@material-ui/core/ImageListTile'`."].join('\n'));
    }
  } // cols rows default values are for docs only


  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$cols = props.cols,
      cols = _props$cols === void 0 ? 1 : _props$cols,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'li' : _props$component,
      _props$rows = props.rows,
      rows = _props$rows === void 0 ? 1 : _props$rows,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "cols", "component", "rows"]);
  var imgRef = React.useRef(null);
  React.useEffect(function () {
    ensureImageCover(imgRef.current, classes);
  });
  React.useEffect(function () {
    var handleResize = (0, _debounce.default)(function () {
      fit(imgRef.current, classes);
    });
    window.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [classes]);
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("div", {
    className: classes.tile
  }, React.Children.map(children, function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    if (child.type === 'img' || (0, _isMuiElement.default)(child, ['Image'])) {
      return /*#__PURE__*/React.cloneElement(child, {
        ref: imgRef
      });
    }

    return child;
  })));
});
process.env.NODE_ENV !== "production" ? GridListTile.propTypes = {
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case GridListTile takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Width of the tile in number of grid cells.
   */
  cols: _propTypes.default.number,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * Height of the tile in number of grid cells.
   */
  rows: _propTypes.default.number
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiGridListTile'
})(GridListTile);

exports.default = _default;