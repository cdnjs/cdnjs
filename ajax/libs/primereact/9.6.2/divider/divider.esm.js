import * as React from 'react';
import { mergeProps, classNames } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

var DividerBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Divider',
    align: null,
    layout: 'horizontal',
    type: 'solid',
    style: null,
    className: null,
    children: undefined
  }
});

var Divider = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = DividerBase.getProps(inProps, context);
  var _DividerBase$setMetaD = DividerBase.setMetaData({
      props: props
    }),
    ptm = _DividerBase$setMetaD.ptm;
  var elementRef = React.useRef(null);
  var horizontal = props.layout === 'horizontal';
  var vertical = props.layout === 'vertical';
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
    className: classNames("p-divider p-component p-divider-".concat(props.layout, " p-divider-").concat(props.type), {
      'p-divider-left': horizontal && (!props.align || props.align === 'left'),
      'p-divider-right': horizontal && props.align === 'right',
      'p-divider-center': horizontal && props.align === 'center' || vertical && (!props.align || props.align === 'center'),
      'p-divider-top': vertical && props.align === 'top',
      'p-divider-bottom': vertical && props.align === 'bottom'
    }, props.className),
    role: 'separator'
  }, DividerBase.getOtherProps(props), ptm('root'));
  var contentProps = mergeProps({
    className: 'p-divider-content'
  }, ptm('content'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", contentProps, props.children));
});
Divider.displayName = 'Divider';

export { Divider };
