this.primereact = this.primereact || {};
this.primereact.divider = (function (exports, React, utils, componentbase, api) {
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

    var DividerBase = componentbase.ComponentBase.extend({
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

    var Divider = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = DividerBase.getProps(inProps, context);
      var _DividerBase$setMetaD = DividerBase.setMetaData({
          props: props
        }),
        ptm = _DividerBase$setMetaD.ptm;
      var elementRef = React__namespace.useRef(null);
      var horizontal = props.layout === 'horizontal';
      var vertical = props.layout === 'vertical';
      React__namespace.useImperativeHandle(ref, function () {
        return {
          props: props,
          getElement: function getElement() {
            return elementRef.current;
          }
        };
      });
      var rootProps = utils.mergeProps({
        ref: elementRef,
        style: props.style,
        className: utils.classNames("p-divider p-component p-divider-".concat(props.layout, " p-divider-").concat(props.type), {
          'p-divider-left': horizontal && (!props.align || props.align === 'left'),
          'p-divider-right': horizontal && props.align === 'right',
          'p-divider-center': horizontal && props.align === 'center' || vertical && (!props.align || props.align === 'center'),
          'p-divider-top': vertical && props.align === 'top',
          'p-divider-bottom': vertical && props.align === 'bottom'
        }, props.className),
        role: 'separator'
      }, DividerBase.getOtherProps(props), ptm('root'));
      var contentProps = utils.mergeProps({
        className: 'p-divider-content'
      }, ptm('content'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, props.children));
    });
    Divider.displayName = 'Divider';

    exports.Divider = Divider;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.utils, primereact.componentbase, primereact.api);
