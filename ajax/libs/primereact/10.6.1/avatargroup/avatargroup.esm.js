'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { classNames } from 'primereact/utils';

var classes = {
  root: 'p-avatar-group p-component'
};
var styles = "\n@layer primereact {\n    .p-avatar-group .p-avatar + .p-avatar {\n        margin-left: -1rem;\n    }\n    \n    .p-avatar-group {\n        display: flex;\n        align-items: center;\n    }\n}\n";
var AvatarGroupBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'AvatarGroup',
    style: null,
    className: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

var AvatarGroup = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = AvatarGroupBase.getProps(inProps, context);
  var _AvatarGroupBase$setM = AvatarGroupBase.setMetaData({
      props: props
    }),
    ptm = _AvatarGroupBase$setM.ptm,
    cx = _AvatarGroupBase$setM.cx,
    isUnstyled = _AvatarGroupBase$setM.isUnstyled;
  useHandleStyle(AvatarGroupBase.css.styles, isUnstyled, {
    name: 'avatargroup'
  });
  var elementRef = React.useRef(null);
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
    className: classNames(props.className, cx('root'))
  }, AvatarGroupBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, props.children);
});
AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };
