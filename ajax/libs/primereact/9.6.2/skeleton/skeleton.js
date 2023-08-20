this.primereact = this.primereact || {};
this.primereact.skeleton = (function (exports, React, utils, componentbase, api) {
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

    var SkeletonBase = componentbase.ComponentBase.extend({
      defaultProps: {
        __TYPE: 'Skeleton',
        shape: 'rectangle',
        size: null,
        width: '100%',
        height: '1rem',
        borderRadius: null,
        animation: 'wave',
        style: null,
        className: null
      }
    });

    var Skeleton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = SkeletonBase.getProps(inProps, context);
      var _SkeletonBase$setMeta = SkeletonBase.setMetaData({
          props: props
        }),
        ptm = _SkeletonBase$setMeta.ptm;
      var elementRef = React__namespace.useRef(null);
      var style = props.size ? {
        width: props.size,
        height: props.size,
        borderRadius: props.borderRadius
      } : {
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius
      };
      var className = utils.classNames('p-skeleton p-component', {
        'p-skeleton-circle': props.shape === 'circle',
        'p-skeleton-none': props.animation === 'none'
      }, props.className);
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
        className: className,
        style: style
      }, SkeletonBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps);
    }));
    Skeleton.displayName = 'Skeleton';

    exports.Skeleton = Skeleton;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.utils, primereact.componentbase, primereact.api);
