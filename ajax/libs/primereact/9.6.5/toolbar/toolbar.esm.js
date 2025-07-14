import * as React from 'react';
import { ObjectUtils, mergeProps, classNames } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

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
  }
});

var Toolbar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = ToolbarBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var start = ObjectUtils.getJSXElement(props.left || props.start, props);
  var center = ObjectUtils.getJSXElement(props.center, props);
  var end = ObjectUtils.getJSXElement(props.right || props.end, props);
  var _ToolbarBase$setMetaD = ToolbarBase.setMetaData({
      props: props
    }),
    ptm = _ToolbarBase$setMetaD.ptm;
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var startProps = mergeProps({
    className: 'p-toolbar-group-start p-toolbar-group-left'
  }, ptm('start'));
  var centerProps = mergeProps({
    className: 'p-toolbar-group-center'
  }, ptm('center'));
  var endProps = mergeProps({
    className: 'p-toolbar-group-end p-toolbar-group-right'
  }, ptm('end'));
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: classNames('p-toolbar p-component', props.className),
    role: 'toolbar'
  }, ToolbarBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", startProps, start), /*#__PURE__*/React.createElement("div", centerProps, center), /*#__PURE__*/React.createElement("div", endProps, end));
}));
Toolbar.displayName = 'Toolbar';

export { Toolbar };
