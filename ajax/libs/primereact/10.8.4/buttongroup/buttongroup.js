this.primereact = this.primereact || {};
this.primereact.buttongroup = (function (exports, React, api, componentbase, hooks, utils) {
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
      root: 'p-button-group p-component'
    };
    var ButtonGroupBase = componentbase.ComponentBase.extend({
      defaultProps: {
        __TYPE: 'ButtonGroup',
        children: undefined
      },
      css: {
        classes: classes
      }
    });

    var ButtonGroup = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var mergeProps = hooks.useMergeProps();
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = ButtonGroupBase.getProps(inProps, context);
      var elementRef = React__namespace.useRef(ref);
      var _ButtonGroupBase$setM = ButtonGroupBase.setMetaData({
          props: props
        }),
        ptm = _ButtonGroupBase$setM.ptm,
        cx = _ButtonGroupBase$setM.cx,
        isUnstyled = _ButtonGroupBase$setM.isUnstyled;
      componentbase.useHandleStyle(ButtonGroupBase.css.styles, isUnstyled, {
        name: 'buttongroup'
      });
      React__namespace.useEffect(function () {
        utils.ObjectUtils.combinedRefs(elementRef, ref);
      }, [elementRef, ref]);
      var rootProps = mergeProps({
        ref: elementRef,
        className: utils.classNames(cx('root')),
        role: 'group'
      }, ButtonGroupBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("span", rootProps, props.children);
    }));
    ButtonGroup.displayName = 'ButtonGroup';

    exports.ButtonGroup = ButtonGroup;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
