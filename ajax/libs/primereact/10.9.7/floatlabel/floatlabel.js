this.primereact = this.primereact || {};
this.primereact.floatlabel = (function (exports, React, api, componentbase, hooks, utils) {
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

    var classes = {
      root: 'p-float-label'
    };
    var styles = "\n@layer primereact {\n    .p-float-label {\n        display: block;\n        position: relative;\n    }\n    \n    .p-float-label label {\n        position: absolute;\n        pointer-events: none;\n        top: 50%;\n        margin-top: -.5rem;\n        transition-property: all;\n        transition-timing-function: ease;\n        line-height: 1;\n    }\n    \n    .p-float-label:has(textarea) label {\n        top: 1rem;\n    }\n    \n    .p-float-label:has(input:focus) label,\n    .p-float-label:has(input.p-filled) label,\n    .p-float-label:has(input:-webkit-autofill) label,\n    .p-float-label:has(textarea:focus) label,\n    .p-float-label:has(textarea.p-filled) label,\n    .p-float-label:has(.p-inputwrapper-focus) label,\n    .p-float-label:has(.p-inputwrapper-filled) label {\n        top: -.75rem;\n        font-size: 12px;\n    }\n    \n    .p-float-label .p-placeholder,\n    .p-float-label input::placeholder,\n    .p-float-label .p-inputtext::placeholder {\n        opacity: 0;\n        transition-property: all;\n        transition-timing-function: ease;\n    }\n    \n    .p-float-label .p-focus .p-placeholder,\n    .p-float-label input:focus::placeholder,\n    .p-float-label .p-inputtext:focus::placeholder {\n        opacity: 1;\n        transition-property: all;\n        transition-timing-function: ease;\n    }\n}";
    var FloatLabelBase = componentbase.ComponentBase.extend({
      defaultProps: {
        __TYPE: 'FloatLabel',
        children: undefined
      },
      css: {
        classes: classes,
        styles: styles
      }
    });

    var FloatLabel = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var mergeProps = hooks.useMergeProps();
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = FloatLabelBase.getProps(inProps, context);
      var elementRef = React__namespace.useRef(ref);
      var _FloatLabelBase$setMe = FloatLabelBase.setMetaData({
          props: props
        }),
        ptm = _FloatLabelBase$setMe.ptm,
        cx = _FloatLabelBase$setMe.cx,
        isUnstyled = _FloatLabelBase$setMe.isUnstyled;
      componentbase.useHandleStyle(FloatLabelBase.css.styles, isUnstyled, {
        name: 'floatlabel'
      });
      React__namespace.useEffect(function () {
        utils.ObjectUtils.combinedRefs(elementRef, ref);
      }, [elementRef, ref]);
      var rootProps = mergeProps({
        ref: elementRef,
        className: utils.classNames(cx('root'))
      }, FloatLabelBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("span", rootProps, props.children);
    }));
    FloatLabel.displayName = 'FloatLabel';

    exports.FloatLabel = FloatLabel;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
