"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'flex-end'
  },

  /* Styles applied to the root element if `disableSpacing={false}`. */
  spacing: {
    '& > :not(:first-child)': {
      marginLeft: 8
    }
  }
};
exports.styles = styles;
var warnedOnce = false;
/**
 * ⚠️ The ExpansionPanelActions component was renamed to AccordionActions to use a more common naming convention.
 *
 * You should use `import { AccordionActions } from '@material-ui/core'`
 * or `import AccordionActions from '@material-ui/core/AccordionActions'`.
 */

var ExpansionPanelActions = /*#__PURE__*/React.forwardRef(function ExpansionPanelActions(props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(['Material-UI: the ExpansionPanelActions component was renamed to AccordionActions to use a more common naming convention.', '', "You should use `import { AccordionActions } from '@material-ui/core'`", "or `import AccordionActions from '@material-ui/core/AccordionActions'`"].join('\n'));
    }
  }

  var classes = props.classes,
      className = props.className,
      _props$disableSpacing = props.disableSpacing,
      disableSpacing = _props$disableSpacing === void 0 ? false : _props$disableSpacing,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "disableSpacing"]);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, !disableSpacing && classes.spacing),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ExpansionPanelActions.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

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
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing: _propTypes.default.bool
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiExpansionPanelActions'
})(ExpansionPanelActions);

exports.default = _default;