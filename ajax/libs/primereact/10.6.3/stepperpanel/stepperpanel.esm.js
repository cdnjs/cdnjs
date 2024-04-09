'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { ObjectUtils } from 'primereact/utils';

var styles = '';
var StepperPanelBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'StepperPanel',
    children: undefined,
    header: null
  },
  css: {
    styles: styles
  }
});

var StepperPanel = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = StepperPanelBase.getProps(inProps, context);
  var elementRef = React.useRef(ref);
  var _StepperPanelBase$set = StepperPanelBase.setMetaData({
      props: props
    }),
    isUnstyled = _StepperPanelBase$set.isUnstyled;
  useHandleStyle(StepperPanelBase.css.styles, isUnstyled, {
    name: 'StepperPanel'
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref
  }, props.children);
}));
StepperPanel.displayName = 'StepperPanel';

export { StepperPanel };
