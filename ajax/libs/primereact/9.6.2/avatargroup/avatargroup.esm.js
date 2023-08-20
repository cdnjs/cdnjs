import * as React from 'react';
import { classNames, mergeProps } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

var AvatarGroupBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'AvatarGroup',
    style: null,
    className: null,
    children: undefined
  }
});

var AvatarGroup = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = AvatarGroupBase.getProps(inProps, context);
  var _AvatarGroupBase$setM = AvatarGroupBase.setMetaData({
      props: props
    }),
    ptm = _AvatarGroupBase$setM.ptm;
  var elementRef = React.useRef(null);
  var className = classNames('p-avatar-group p-component', props.className);
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
    style: props.style,
    className: className
  }, AvatarGroupBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, props.children);
});
AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };
