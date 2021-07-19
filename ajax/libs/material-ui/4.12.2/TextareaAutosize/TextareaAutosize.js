"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debounce = _interopRequireDefault(require("../utils/debounce"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _deprecatedPropType = _interopRequireDefault(require("../utils/deprecatedPropType"));

function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}

var useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
var styles = {
  /* Styles applied to the shadow textarea element. */
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: 'translateZ(0)'
  }
};
var TextareaAutosize = /*#__PURE__*/React.forwardRef(function TextareaAutosize(props, ref) {
  var onChange = props.onChange,
      rows = props.rows,
      rowsMax = props.rowsMax,
      rowsMinProp = props.rowsMin,
      maxRowsProp = props.maxRows,
      _props$minRows = props.minRows,
      minRowsProp = _props$minRows === void 0 ? 1 : _props$minRows,
      style = props.style,
      value = props.value,
      other = (0, _objectWithoutProperties2.default)(props, ["onChange", "rows", "rowsMax", "rowsMin", "maxRows", "minRows", "style", "value"]);
  var maxRows = maxRowsProp || rowsMax;
  var minRows = rows || rowsMinProp || minRowsProp;

  var _React$useRef = React.useRef(value != null),
      isControlled = _React$useRef.current;

  var inputRef = React.useRef(null);
  var handleRef = (0, _useForkRef.default)(ref, inputRef);
  var shadowRef = React.useRef(null);
  var renders = React.useRef(0);

  var _React$useState = React.useState({}),
      state = _React$useState[0],
      setState = _React$useState[1];

  var syncHeight = React.useCallback(function () {
    var input = inputRef.current;
    var computedStyle = window.getComputedStyle(input);
    var inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || 'x';

    if (inputShallow.value.slice(-1) === '\n') {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      inputShallow.value += ' ';
    }

    var boxSizing = computedStyle['box-sizing'];
    var padding = getStyleValue(computedStyle, 'padding-bottom') + getStyleValue(computedStyle, 'padding-top');
    var border = getStyleValue(computedStyle, 'border-bottom-width') + getStyleValue(computedStyle, 'border-top-width'); // The height of the inner content

    var innerHeight = inputShallow.scrollHeight - padding; // Measure height of a textarea with a single row

    inputShallow.value = 'x';
    var singleRowHeight = inputShallow.scrollHeight - padding; // The height of the outer content

    var outerHeight = innerHeight;

    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }

    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }

    outerHeight = Math.max(outerHeight, singleRowHeight); // Take the box sizing into account for applying this value as a style.

    var outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    var overflow = Math.abs(outerHeight - innerHeight) <= 1;
    setState(function (prevState) {
      // Need a large enough difference to update the height.
      // This prevents infinite rendering loop.
      if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow)) {
        renders.current += 1;
        return {
          overflow: overflow,
          outerHeightStyle: outerHeightStyle
        };
      }

      if (process.env.NODE_ENV !== 'production') {
        if (renders.current === 20) {
          console.error(['Material-UI: Too many re-renders. The layout is unstable.', 'TextareaAutosize limits the number of renders to prevent an infinite loop.'].join('\n'));
        }
      }

      return prevState;
    });
  }, [maxRows, minRows, props.placeholder]);
  React.useEffect(function () {
    var handleResize = (0, _debounce.default)(function () {
      renders.current = 0;
      syncHeight();
    });
    window.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [syncHeight]);
  useEnhancedEffect(function () {
    syncHeight();
  });
  React.useEffect(function () {
    renders.current = 0;
  }, [value]);

  var handleChange = function handleChange(event) {
    renders.current = 0;

    if (!isControlled) {
      syncHeight();
    }

    if (onChange) {
      onChange(event);
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", (0, _extends2.default)({
    value: value,
    onChange: handleChange,
    ref: handleRef // Apply the rows prop to get a "correct" first SSR paint
    ,
    rows: minRows,
    style: (0, _extends2.default)({
      height: state.outerHeightStyle,
      // Need a large enough difference to allow scrolling.
      // This prevents infinite rendering loop.
      overflow: state.overflow ? 'hidden' : null
    }, style)
  }, other)), /*#__PURE__*/React.createElement("textarea", {
    "aria-hidden": true,
    className: props.className,
    readOnly: true,
    ref: shadowRef,
    tabIndex: -1,
    style: (0, _extends2.default)({}, styles.shadow, style)
  }));
});
process.env.NODE_ENV !== "production" ? TextareaAutosize.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Maximum number of rows to display.
   */
  maxRows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Minimum number of rows to display.
   */
  minRows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * @ignore
   */
  onChange: _propTypes.default.func,

  /**
   * @ignore
   */
  placeholder: _propTypes.default.string,

  /**
   * Minimum number of rows to display.
   * @deprecated Use `rowsMin` instead.
   */
  rows: (0, _deprecatedPropType.default)(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]), 'Use `rowsMin` instead.'),

  /**
   * Maximum number of rows to display.
   * @deprecated Use `maxRows` instead.
   */
  rowsMax: (0, _deprecatedPropType.default)(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]), 'Use `maxRows` instead.'),

  /**
   * Minimum number of rows to display.
   * @deprecated Use `minRows` instead.
   */
  rowsMin: (0, _deprecatedPropType.default)(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]), 'Use `minRows` instead.'),

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * @ignore
   */
  value: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.number, _propTypes.default.string])
} : void 0;
var _default = TextareaAutosize;
exports.default = _default;