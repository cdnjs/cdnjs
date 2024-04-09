'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var utils = require('primereact/utils');

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

var styles = '';
var StepperPanelBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'StepperPanel',
    children: undefined,
    header: null
  },
  css: {
    styles: styles
  }
});

var StepperPanel = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = StepperPanelBase.getProps(inProps, context);
  var elementRef = React__namespace.useRef(ref);
  var _StepperPanelBase$set = StepperPanelBase.setMetaData({
      props: props
    }),
    isUnstyled = _StepperPanelBase$set.isUnstyled;
  componentbase.useHandleStyle(StepperPanelBase.css.styles, isUnstyled, {
    name: 'StepperPanel'
  });
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  return /*#__PURE__*/React__namespace.createElement("span", {
    ref: ref
  }, props.children);
}));
StepperPanel.displayName = 'StepperPanel';

exports.StepperPanel = StepperPanel;
