this.primereact = this.primereact || {};
this.primereact.toolbar = (function (exports, React, api, componentbase, hooks, utils) {
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

    var ToolbarBase = componentbase.ComponentBase.extend({
      defaultProps: {
        __TYPE: 'Toolbar',
        id: null,
        style: null,
        className: null,
        left: null,
        right: null,
        start: null,
        center: null,
        end: null,
        children: undefined
      },
      css: {
        classes: {
          root: 'p-toolbar p-component',
          start: 'p-toolbar-group-start p-toolbar-group-left',
          center: 'p-toolbar-group-center',
          end: 'p-toolbar-group-end p-toolbar-group-right'
        },
        styles: "\n        @layer primereact {\n            .p-toolbar {\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                flex-wrap: wrap;\n            }\n            \n            .p-toolbar-group-start,\n            .p-toolbar-group-center,\n            .p-toolbar-group-end {\n                display: flex;\n                align-items: center;\n            }\n            \n            .p-toolbar-group-left,\n            .p-toolbar-group-right {\n                display: flex;\n                align-items: center;\n            }\n        }\n        "
      }
    });

    var Toolbar = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var mergeProps = hooks.useMergeProps();
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = ToolbarBase.getProps(inProps, context);
      var elementRef = React__namespace.useRef(null);
      var start = utils.ObjectUtils.getJSXElement(props.left || props.start, props);
      var center = utils.ObjectUtils.getJSXElement(props.center, props);
      var end = utils.ObjectUtils.getJSXElement(props.right || props.end, props);
      var _ToolbarBase$setMetaD = ToolbarBase.setMetaData({
          props: props
        }),
        ptm = _ToolbarBase$setMetaD.ptm,
        cx = _ToolbarBase$setMetaD.cx,
        isUnstyled = _ToolbarBase$setMetaD.isUnstyled;
      componentbase.useHandleStyle(ToolbarBase.css.styles, isUnstyled, {
        name: 'toolbar'
      });
      React__namespace.useImperativeHandle(ref, function () {
        return {
          props: props,
          getElement: function getElement() {
            return elementRef.current;
          }
        };
      });
      var startProps = mergeProps({
        className: cx('start')
      }, ptm('start'));
      var centerProps = mergeProps({
        className: cx('center')
      }, ptm('center'));
      var endProps = mergeProps({
        className: cx('end')
      }, ptm('end'));
      var rootProps = mergeProps({
        id: props.id,
        ref: elementRef,
        style: props.style,
        className: utils.classNames(props.className, cx('root')),
        role: 'toolbar'
      }, ToolbarBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", startProps, start), /*#__PURE__*/React__namespace.createElement("div", centerProps, center), /*#__PURE__*/React__namespace.createElement("div", endProps, end));
    }));
    Toolbar.displayName = 'Toolbar';

    exports.Toolbar = Toolbar;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
