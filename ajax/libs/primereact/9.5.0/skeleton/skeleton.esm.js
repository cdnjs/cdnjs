import * as React from 'react';
import { classNames, mergeProps } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

var SkeletonBase = ComponentBase.extend({
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
  }
});

var Skeleton = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = SkeletonBase.getProps(inProps);
  var _SkeletonBase$setMeta = SkeletonBase.setMetaData({
      props: props
    }),
    ptm = _SkeletonBase$setMeta.ptm;
  var elementRef = React.useRef(null);
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
  var rootProps = mergeProps({
    ref: elementRef,
    className: className,
    style: style
  }, SkeletonBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps);
}));
Skeleton.displayName = 'Skeleton';

export { Skeleton };
