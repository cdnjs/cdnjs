import * as React from 'react';
import { classNames, mergeProps } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

var ProgressSpinnerBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ProgressSpinner',
    id: null,
    style: null,
    className: null,
    strokeWidth: '2',
    fill: 'none',
    animationDuration: '2s',
    children: undefined
  }
});

var ProgressSpinner = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = ProgressSpinnerBase.getProps(inProps, context);
  var elementRef = React.useRef(null);
  var className = classNames('p-progress-spinner', props.className);
  var _ProgressSpinnerBase$ = ProgressSpinnerBase.setMetaData({
      props: props
    }),
    ptm = _ProgressSpinnerBase$.ptm;
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: className,
    role: 'alert',
    'aria-busy': true
  }, ptm('spinner'));
  var spinnerProps = mergeProps({
    className: 'p-progress-spinner-svg',
    viewBox: '25 25 50 50',
    style: {
      animationDuration: props.animationDuration
    }
  }, ptm('spinner'));
  var circleProps = mergeProps({
    className: 'p-progress-spinner-circle',
    cx: '50',
    cy: '50',
    r: '20',
    fill: props.fill,
    strokeWidth: props.strokeWidth,
    strokeMiterlimit: '10'
  }, ptm('circle'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("svg", spinnerProps, /*#__PURE__*/React.createElement("circle", circleProps)));
}));
ProgressSpinner.displayName = 'ProgressSpinner';

export { ProgressSpinner };
