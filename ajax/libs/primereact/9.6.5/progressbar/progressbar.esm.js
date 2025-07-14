import * as React from 'react';
import { classNames, mergeProps } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

var ProgressBarBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ProgressBar',
    id: null,
    value: null,
    showValue: true,
    unit: '%',
    style: null,
    className: null,
    mode: 'determinate',
    displayValueTemplate: null,
    color: null,
    children: undefined
  }
});

var ProgressBar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = ProgressBarBase.getProps(inProps, context);
  var _ProgressBarBase$setM = ProgressBarBase.setMetaData({
      props: props
    }),
    ptm = _ProgressBarBase$setM.ptm;
  var elementRef = React.useRef(null);
  var createLabel = function createLabel() {
    if (props.showValue && props.value != null) {
      var label = props.displayValueTemplate ? props.displayValueTemplate(props.value) : props.value + props.unit;
      return label;
    }
    return null;
  };
  var createDeterminate = function createDeterminate() {
    var className = classNames('p-progressbar p-component p-progressbar-determinate', props.className);
    var label = createLabel();
    var rootProps = mergeProps({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style,
      role: 'progressbar',
      'aria-valuemin': '0',
      'aria-valuenow': props.value,
      'aria-valuemax': '100'
    }, ProgressBarBase.getOtherProps(props), ptm('root'));
    var valueProps = mergeProps({
      className: 'p-progressbar-value p-progressbar-value-animate',
      style: {
        width: props.value + '%',
        display: 'flex',
        backgroundColor: props.color
      }
    }, ptm('value'));
    var labelProps = mergeProps({
      className: 'p-progressbar-label'
    }, ptm('label'));
    return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", valueProps, props.value != null && props.value !== 0 && props.showValue && /*#__PURE__*/React.createElement("div", labelProps, label)));
  };
  var createIndeterminate = function createIndeterminate() {
    var className = classNames('p-progressbar p-component p-progressbar-indeterminate', props.className);
    var rootProps = mergeProps({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style,
      role: 'progressbar'
    }, ProgressBarBase.getOtherProps(props), ptm('root'));
    var indeterminateContainerProps = mergeProps({
      className: 'p-progressbar-indeterminate-container'
    }, ptm('indeterminateContainer'));
    var valueProps = mergeProps({
      className: 'p-progressbar-value p-progressbar-value-animate',
      style: {
        backgroundColor: props.color
      }
    }, ptm('value'));
    return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", indeterminateContainerProps, /*#__PURE__*/React.createElement("div", valueProps)));
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  if (props.mode === 'determinate') return createDeterminate();else if (props.mode === 'indeterminate') return createIndeterminate();else throw new Error(props.mode + " is not a valid mode for the ProgressBar. Valid values are 'determinate' and 'indeterminate'");
}));
ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
