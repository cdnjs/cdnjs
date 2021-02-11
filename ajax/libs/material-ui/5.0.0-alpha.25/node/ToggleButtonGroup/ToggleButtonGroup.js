"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _reactIs = require("react-is");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("../styles");

var _utils = require("../utils");

var _isValueSelected = _interopRequireDefault(require("./isValueSelected"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    borderRadius: theme.shape.borderRadius
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    flexDirection: 'column'
  },

  /* Styles applied to the children. */
  grouped: {},

  /* Styles applied to the children if `orientation="horizontal"`. */
  groupedHorizontal: {
    '&:not(:first-child)': {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    '&:not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    '&.Mui-selected + &.Mui-selected': {
      borderLeft: 0,
      marginLeft: 0
    }
  },

  /* Styles applied to the children if `orientation="vertical"`. */
  groupedVertical: {
    '&:not(:first-child)': {
      marginTop: -1,
      borderTop: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    '&:not(:last-child)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    '&.Mui-selected + &.Mui-selected': {
      borderTop: 0,
      marginTop: 0
    }
  }
});

exports.styles = styles;
const ToggleButtonGroup = /*#__PURE__*/React.forwardRef(function ToggleButtonGroup(props, ref) {
  const {
    children,
    classes,
    className,
    exclusive = false,
    onChange,
    orientation = 'horizontal',
    size = 'medium',
    value
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classes", "className", "exclusive", "onChange", "orientation", "size", "value"]);

  const handleChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }

    const index = value && value.indexOf(buttonValue);
    let newValue;

    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }

    onChange(event, newValue);
  };

  const handleExclusiveChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }

    onChange(event, value === buttonValue ? null : buttonValue);
  };

  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    role: "group",
    className: (0, _clsx.default)(classes.root, className, orientation === 'vertical' && classes.vertical),
    ref: ref
  }, other), React.Children.map(children, child => {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if ((0, _reactIs.isFragment)(child)) {
        console.error(["Material-UI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.cloneElement(child, {
      className: (0, _clsx.default)(classes.grouped, classes[`grouped${(0, _utils.capitalize)(orientation)}`], child.props.className),
      onChange: exclusive ? handleExclusiveChange : handleChange,
      selected: child.props.selected === undefined ? (0, _isValueSelected.default)(child.props.value, value) : child.props.selected,
      size: child.props.size || size
    });
  }));
});
process.env.NODE_ENV !== "production" ? ToggleButtonGroup.propTypes = {
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
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive: _propTypes.default.bool,

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: _propTypes.default.func,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['large', 'medium', 'small']),

  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: _propTypes.default.any
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiToggleButtonGroup'
})(ToggleButtonGroup);

exports.default = _default;