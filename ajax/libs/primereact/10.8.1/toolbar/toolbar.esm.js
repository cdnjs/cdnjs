'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { ObjectUtils, classNames } from 'primereact/utils';

var ToolbarBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Toolbar',
    id: null,
    style: null,
    className: null,
    left: null,
    right: null,
    start: null,
    center: null,
    end: null,
    children: undefined
  },
  css: {
    classes: {
      root: 'p-toolbar p-component',
      start: 'p-toolbar-group-start p-toolbar-group-left',
      center: 'p-toolbar-group-center',
      end: 'p-toolbar-group-end p-toolbar-group-right'
    },
    styles: "\n        @layer primereact {\n            .p-toolbar {\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                flex-wrap: wrap;\n            }\n            \n            .p-toolbar-group-start,\n            .p-toolbar-group-center,\n            .p-toolbar-group-end {\n                display: flex;\n                align-items: center;\n            }\n            \n            .p-toolbar-group-left,\n            .p-toolbar-group-right {\n                display: flex;\n                align-items: center;\n            }\n        }\n        "
  }
});

var Toolbar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ToolbarBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var start = ObjectUtils.getJSXElement(props.left || props.start, props);
  var center = ObjectUtils.getJSXElement(props.center, props);
  var end = ObjectUtils.getJSXElement(props.right || props.end, props);
  var _ToolbarBase$setMetaD = ToolbarBase.setMetaData({
      props: props
    }),
    ptm = _ToolbarBase$setMetaD.ptm,
    cx = _ToolbarBase$setMetaD.cx,
    isUnstyled = _ToolbarBase$setMetaD.isUnstyled;
  useHandleStyle(ToolbarBase.css.styles, isUnstyled, {
    name: 'toolbar'
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var startProps = mergeProps({
    className: cx('start')
  }, ptm('start'));
  var centerProps = mergeProps({
    className: cx('center')
  }, ptm('center'));
  var endProps = mergeProps({
    className: cx('end')
  }, ptm('end'));
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: classNames(props.className, cx('root')),
    role: 'toolbar'
  }, ToolbarBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", startProps, start), /*#__PURE__*/React.createElement("div", centerProps, center), /*#__PURE__*/React.createElement("div", endProps, end));
}));
Toolbar.displayName = 'Toolbar';

export { Toolbar };
