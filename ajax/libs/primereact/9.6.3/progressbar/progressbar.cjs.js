'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var api = require('primereact/api');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var ProgressBarBase = componentbase.ComponentBase.extend({
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

var ProgressBar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = ProgressBarBase.getProps(inProps, context);
  var _ProgressBarBase$setM = ProgressBarBase.setMetaData({
      props: props
    }),
    ptm = _ProgressBarBase$setM.ptm;
  var elementRef = React__namespace.useRef(null);
  var createLabel = function createLabel() {
    if (props.showValue && props.value != null) {
      var label = props.displayValueTemplate ? props.displayValueTemplate(props.value) : props.value + props.unit;
      return label;
    }
    return null;
  };
  var createDeterminate = function createDeterminate() {
    var className = utils.classNames('p-progressbar p-component p-progressbar-determinate', props.className);
    var label = createLabel();
    var rootProps = utils.mergeProps({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style,
      role: 'progressbar',
      'aria-valuemin': '0',
      'aria-valuenow': props.value,
      'aria-valuemax': '100'
    }, ProgressBarBase.getOtherProps(props), ptm('root'));
    var valueProps = utils.mergeProps({
      className: 'p-progressbar-value p-progressbar-value-animate',
      style: {
        width: props.value + '%',
        display: 'flex',
        backgroundColor: props.color
      }
    }, ptm('value'));
    var labelProps = utils.mergeProps({
      className: 'p-progressbar-label'
    }, ptm('label'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", valueProps, props.value != null && props.value !== 0 && props.showValue && /*#__PURE__*/React__namespace.createElement("div", labelProps, label)));
  };
  var createIndeterminate = function createIndeterminate() {
    var className = utils.classNames('p-progressbar p-component p-progressbar-indeterminate', props.className);
    var rootProps = utils.mergeProps({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style,
      role: 'progressbar'
    }, ProgressBarBase.getOtherProps(props), ptm('root'));
    var indeterminateContainerProps = utils.mergeProps({
      className: 'p-progressbar-indeterminate-container'
    }, ptm('indeterminateContainer'));
    var valueProps = utils.mergeProps({
      className: 'p-progressbar-value p-progressbar-value-animate',
      style: {
        backgroundColor: props.color
      }
    }, ptm('value'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", indeterminateContainerProps, /*#__PURE__*/React__namespace.createElement("div", valueProps)));
  };
  React__namespace.useImperativeHandle(ref, function () {
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

exports.ProgressBar = ProgressBar;
