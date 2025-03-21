'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { ObjectUtils, classNames } from 'primereact/utils';

var classes = {
  root: 'p-float-label'
};
var styles = "\n@layer primereact {\n    .p-float-label {\n        display: block;\n        position: relative;\n    }\n    \n    .p-float-label label {\n        position: absolute;\n        pointer-events: none;\n        top: 50%;\n        margin-top: -.5rem;\n        transition-property: all;\n        transition-timing-function: ease;\n        line-height: 1;\n    }\n    \n    .p-float-label:has(textarea) label {\n        top: 1rem;\n    }\n    \n    .p-float-label:has(input:focus) label,\n    .p-float-label:has(input.p-filled) label,\n    .p-float-label:has(input:-webkit-autofill) label,\n    .p-float-label:has(textarea:focus) label,\n    .p-float-label:has(textarea.p-filled) label,\n    .p-float-label:has(.p-inputwrapper-focus) label,\n    .p-float-label:has(.p-inputwrapper-filled) label {\n        top: -.75rem;\n        font-size: 12px;\n    }\n    \n    .p-float-label .p-placeholder,\n    .p-float-label input::placeholder,\n    .p-float-label .p-inputtext::placeholder {\n        opacity: 0;\n        transition-property: all;\n        transition-timing-function: ease;\n    }\n    \n    .p-float-label .p-focus .p-placeholder,\n    .p-float-label input:focus::placeholder,\n    .p-float-label .p-inputtext:focus::placeholder {\n        opacity: 1;\n        transition-property: all;\n        transition-timing-function: ease;\n    }\n}";
var FloatLabelBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'FloatLabel',
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

var FloatLabel = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = FloatLabelBase.getProps(inProps, context);
  var elementRef = React.useRef(ref);
  var _FloatLabelBase$setMe = FloatLabelBase.setMetaData({
      props: props
    }),
    ptm = _FloatLabelBase$setMe.ptm,
    cx = _FloatLabelBase$setMe.cx,
    isUnstyled = _FloatLabelBase$setMe.isUnstyled;
  useHandleStyle(FloatLabelBase.css.styles, isUnstyled, {
    name: 'floatlabel'
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  var rootProps = mergeProps({
    ref: elementRef,
    className: classNames(cx('root'))
  }, FloatLabelBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("span", rootProps, props.children);
}));
FloatLabel.displayName = 'FloatLabel';

export { FloatLabel };
