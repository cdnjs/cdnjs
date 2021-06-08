"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _RadioButtonUnchecked = _interopRequireDefault(require("../internal/svg-icons/RadioButtonUnchecked"));

var _RadioButtonChecked = _interopRequireDefault(require("../internal/svg-icons/RadioButtonChecked"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var styles = function styles(theme) {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      '&$checked $layer': {
        transform: 'scale(1)',
        transition: theme.transitions.create('transform', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.shortest
        })
      }
    },
    layer: {
      left: 0,
      position: 'absolute',
      transform: 'scale(0)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.shortest
      })
    },
    checked: {}
  };
};
/**
 * @ignore - internal component.
 */


exports.styles = styles;

function RadioButtonIcon(props) {
  var checked = props.checked,
      classes = props.classes,
      fontSize = props.fontSize;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _clsx.default)(classes.root, checked && classes.checked)
  }, /*#__PURE__*/React.createElement(_RadioButtonUnchecked.default, {
    fontSize: fontSize
  }), /*#__PURE__*/React.createElement(_RadioButtonChecked.default, {
    fontSize: fontSize,
    className: classes.layer
  }));
}

process.env.NODE_ENV !== "production" ? RadioButtonIcon.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: _propTypes.default.bool,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * The size of the radio.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: _propTypes.default.oneOf(['small', 'default'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'PrivateRadioButtonIcon'
})(RadioButtonIcon);

exports.default = _default;