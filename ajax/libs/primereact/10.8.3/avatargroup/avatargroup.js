this.primereact = this.primereact || {};
this.primereact.avatargroup = (function (exports, React, api, componentbase, hooks, utils) {
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
      root: 'p-avatar-group p-component'
    };
    var styles = "\n@layer primereact {\n    .p-avatar-group .p-avatar + .p-avatar {\n        margin-left: -1rem;\n    }\n    \n    .p-avatar-group {\n        display: flex;\n        align-items: center;\n    }\n}\n";
    var AvatarGroupBase = componentbase.ComponentBase.extend({
      defaultProps: {
        __TYPE: 'AvatarGroup',
        style: null,
        className: null,
        children: undefined
      },
      css: {
        classes: classes,
        styles: styles
      }
    });

    var AvatarGroup = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var mergeProps = hooks.useMergeProps();
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = AvatarGroupBase.getProps(inProps, context);
      var _AvatarGroupBase$setM = AvatarGroupBase.setMetaData({
          props: props
        }),
        ptm = _AvatarGroupBase$setM.ptm,
        cx = _AvatarGroupBase$setM.cx,
        isUnstyled = _AvatarGroupBase$setM.isUnstyled;
      componentbase.useHandleStyle(AvatarGroupBase.css.styles, isUnstyled, {
        name: 'avatargroup'
      });
      var elementRef = React__namespace.useRef(null);
      React__namespace.useImperativeHandle(ref, function () {
        return {
          props: props,
          getElement: function getElement() {
            return elementRef.current;
          }
        };
      });
      var rootProps = mergeProps({
        ref: elementRef,
        style: props.style,
        className: utils.classNames(props.className, cx('root'))
      }, AvatarGroupBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, props.children);
    });
    AvatarGroup.displayName = 'AvatarGroup';

    exports.AvatarGroup = AvatarGroup;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
