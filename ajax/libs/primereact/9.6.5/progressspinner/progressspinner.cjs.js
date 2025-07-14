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

var ProgressSpinnerBase = componentbase.ComponentBase.extend({
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

var ProgressSpinner = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = ProgressSpinnerBase.getProps(inProps, context);
  var elementRef = React__namespace.useRef(null);
  var className = utils.classNames('p-progress-spinner', props.className);
  var _ProgressSpinnerBase$ = ProgressSpinnerBase.setMetaData({
      props: props
    }),
    ptm = _ProgressSpinnerBase$.ptm;
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = utils.mergeProps({
    id: props.id,
    ref: elementRef,
    style: props.style,
    className: className,
    role: 'alert',
    'aria-busy': true
  }, ptm('spinner'));
  var spinnerProps = utils.mergeProps({
    className: 'p-progress-spinner-svg',
    viewBox: '25 25 50 50',
    style: {
      animationDuration: props.animationDuration
    }
  }, ptm('spinner'));
  var circleProps = utils.mergeProps({
    className: 'p-progress-spinner-circle',
    cx: '50',
    cy: '50',
    r: '20',
    fill: props.fill,
    strokeWidth: props.strokeWidth,
    strokeMiterlimit: '10'
  }, ptm('circle'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("svg", spinnerProps, /*#__PURE__*/React__namespace.createElement("circle", circleProps)));
}));
ProgressSpinner.displayName = 'ProgressSpinner';

exports.ProgressSpinner = ProgressSpinner;
