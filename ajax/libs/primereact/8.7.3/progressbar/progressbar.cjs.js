'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('primereact/utils');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var ProgressBar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var elementRef = React__namespace.useRef(null);
  var createLabel = function createLabel() {
    if (props.showValue && props.value != null) {
      var label = props.displayValueTemplate ? props.displayValueTemplate(props.value) : props.value + props.unit;
      return label;
    }
    return null;
  };
  var createDeterminate = function createDeterminate() {
    var otherProps = utils.ObjectUtils.findDiffKeys(props, ProgressBar.defaultProps);
    var className = utils.classNames('p-progressbar p-component p-progressbar-determinate', props.className);
    var label = createLabel();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      role: "progressbar",
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style,
      "aria-valuemin": "0",
      "aria-valuenow": props.value,
      "aria-valuemax": "100"
    }, otherProps), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-progressbar-value p-progressbar-value-animate",
      style: {
        width: props.value + '%',
        display: 'flex',
        backgroundColor: props.color
      }
    }, props.value != null && props.value !== 0 && props.showValue && /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-progressbar-label"
    }, label)));
  };
  var createIndeterminate = function createIndeterminate() {
    var otherProps = utils.ObjectUtils.findDiffKeys(props, ProgressBar.defaultProps);
    var className = utils.classNames('p-progressbar p-component p-progressbar-indeterminate', props.className);
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      role: "progressbar",
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, otherProps), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-progressbar-indeterminate-container"
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-progressbar-value p-progressbar-value-animate",
      style: {
        backgroundColor: props.color
      }
    })));
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  if (props.mode === 'determinate') return createDeterminate();else if (props.mode === 'indeterminate') return createIndeterminate();else throw new Error(props.mode + " is not a valid mode for the ProgressBar. Valid values are 'determinate' and 'indeterminate'");
}));
ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = {
  __TYPE: 'ProgressBar',
  id: null,
  value: null,
  showValue: true,
  unit: '%',
  style: null,
  className: null,
  mode: 'determinate',
  displayValueTemplate: null,
  color: null
};

exports.ProgressBar = ProgressBar;
