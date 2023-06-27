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

var SkeletonBase = {
  defaultProps: {
    __TYPE: 'Skeleton',
    shape: 'rectangle',
    size: null,
    width: '100%',
    height: '1rem',
    borderRadius: null,
    animation: 'wave',
    style: null,
    className: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, SkeletonBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, SkeletonBase.defaultProps);
  }
};

var Skeleton = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = SkeletonBase.getProps(inProps);
  var elementRef = React.useRef(null);
  var otherProps = SkeletonBase.getOtherProps(props);
  var style = props.size ? {
    width: props.size,
    height: props.size,
    borderRadius: props.borderRadius
  } : {
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius
  };
  var className = classNames('p-skeleton p-component', {
    'p-skeleton-circle': props.shape === 'circle',
    'p-skeleton-none': props.animation === 'none'
  }, props.className);
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    style: style,
    className: className
  }, otherProps));
}));
Skeleton.displayName = 'Skeleton';

export { Skeleton };
