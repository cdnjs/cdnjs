"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _unstyled = require("@material-ui/unstyled");

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _colorManipulator = require("../styles/colorManipulator");

var _MoreHoriz = _interopRequireDefault(require("../internal/svg-icons/MoreHoriz"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _breadcrumbCollapsedClasses = require("./breadcrumbCollapsedClasses");

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    button: ['button'],
    icon: ['icon']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _breadcrumbCollapsedClasses.getBreadcrumbCollapsedUtilityClass, classes);
};

const BreadcrumbCollapsedButton = (0, _experimentalStyled.default)(_ButtonBase.default, {}, {
  name: 'PrivateBreadcrumbCollapsed',
  slot: 'Button'
})(({
  theme
}) => (0, _extends2.default)({
  display: 'flex',
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5)
}, theme.palette.mode === 'light' ? {
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[700]
} : {
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.grey[100]
}, {
  borderRadius: 2,
  '&:hover, &:focus': (0, _extends2.default)({}, theme.palette.mode === 'light' ? {
    backgroundColor: theme.palette.grey[200]
  } : {
    backgroundColor: theme.palette.grey[600]
  }),
  '&:active': (0, _extends2.default)({
    boxShadow: theme.shadows[0]
  }, theme.palette.mode === 'light' ? {
    backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.grey[200], 0.12)
  } : {
    backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.grey[600], 0.12)
  })
}));
const BreadcrumbCollapsedIcon = (0, _experimentalStyled.default)(_MoreHoriz.default, {}, {
  name: 'PrivateBreadcrumbCollapsed',
  slot: 'Icon'
})({
  width: 24,
  height: 16
});
/**
 * @ignore - internal component.
 */

function BreadcrumbCollapsed(props) {
  const styleProps = props;
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(BreadcrumbCollapsedButton, (0, _extends2.default)({
    className: classes.button,
    focusRipple: true
  }, props, {
    styleProps: styleProps
  }), /*#__PURE__*/React.createElement(BreadcrumbCollapsedIcon, {
    className: classes.icon,
    styleProps: styleProps
  })));
}

process.env.NODE_ENV !== "production" ? BreadcrumbCollapsed.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = BreadcrumbCollapsed;
exports.default = _default;