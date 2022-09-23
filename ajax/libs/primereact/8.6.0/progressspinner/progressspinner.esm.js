import * as React from 'react';
import { ObjectUtils, classNames } from 'primereact/utils';

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

var ProgressSpinner = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);
  var otherProps = ObjectUtils.findDiffKeys(props, ProgressSpinner.defaultProps);
  var className = classNames('p-progress-spinner', props.className);
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: className,
    role: "alert",
    "aria-busy": true
  }, otherProps), /*#__PURE__*/React.createElement("svg", {
    className: "p-progress-spinner-svg",
    viewBox: "25 25 50 50",
    style: {
      animationDuration: props.animationDuration
    }
  }, /*#__PURE__*/React.createElement("circle", {
    className: "p-progress-spinner-circle",
    cx: "50",
    cy: "50",
    r: "20",
    fill: props.fill,
    strokeWidth: props.strokeWidth,
    strokeMiterlimit: "10"
  })));
}));
ProgressSpinner.displayName = 'ProgressSpinner';
ProgressSpinner.defaultProps = {
  __TYPE: 'ProgressSpinner',
  id: null,
  style: null,
  className: null,
  strokeWidth: '2',
  fill: 'none',
  animationDuration: '2s'
};

export { ProgressSpinner };
