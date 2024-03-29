'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { classNames } from 'primereact/utils';

var classes = {
  root: 'p-button-group p-component'
};
var ButtonGroupBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ButtonGroup',
    children: undefined
  },
  css: {
    classes: classes
  }
});

var ButtonGroup = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ButtonGroupBase.getProps(inProps, context);
  var _ButtonGroupBase$setM = ButtonGroupBase.setMetaData({
      props: props
    }),
    ptm = _ButtonGroupBase$setM.ptm,
    cx = _ButtonGroupBase$setM.cx,
    isUnstyled = _ButtonGroupBase$setM.isUnstyled;
  useHandleStyle(ButtonGroupBase.css.styles, isUnstyled, {
    name: 'buttongroup'
  });
  var rootProps = mergeProps({
    className: classNames(cx('root')),
    role: 'group'
  }, ButtonGroupBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("span", rootProps, props.children);
}));
ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
