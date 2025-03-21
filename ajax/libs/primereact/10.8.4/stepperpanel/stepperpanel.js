this.primereact = this.primereact || {};
this.primereact.stepperpanel = (function (exports, React, api, componentbase) {
    'use strict';

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

    var StepperPanel = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = StepperPanelBase.getProps(inProps, context);
      var _StepperPanelBase$set = StepperPanelBase.setMetaData({
          props: props
        }),
        isUnstyled = _StepperPanelBase$set.isUnstyled;
      componentbase.useHandleStyle(StepperPanelBase.css.styles, isUnstyled, {
        name: 'StepperPanel'
      });
      return /*#__PURE__*/React__namespace.createElement("span", {
        ref: ref
      }, props.children);
    }));
    StepperPanel.displayName = 'StepperPanel';

    exports.StepperPanel = StepperPanel;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.componentbase);
