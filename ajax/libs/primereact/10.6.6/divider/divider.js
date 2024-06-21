this.primereact = this.primereact || {};
this.primereact.divider = (function (exports, React, api, componentbase, hooks, utils) {
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
      root: function root(_ref) {
        var props = _ref.props,
          horizontal = _ref.horizontal,
          vertical = _ref.vertical;
        return utils.classNames("p-divider p-component p-divider-".concat(props.layout, " p-divider-").concat(props.type), {
          'p-divider-left': horizontal && (!props.align || props.align === 'left'),
          'p-divider-right': horizontal && props.align === 'right',
          'p-divider-center': horizontal && props.align === 'center' || vertical && (!props.align || props.align === 'center'),
          'p-divider-top': vertical && props.align === 'top',
          'p-divider-bottom': vertical && props.align === 'bottom'
        }, props.className);
      },
      content: 'p-divider-content'
    };
    var styles = "\n@layer primereact {\n    .p-divider-horizontal {\n        display: flex;\n        width: 100%;\n        position: relative;\n        align-items: center;\n    }\n    \n    .p-divider-horizontal:before {\n        position: absolute;\n        display: block;\n        top: 50%;\n        left: 0;\n        width: 100%;\n        content: \"\";\n    }\n    \n    .p-divider-horizontal.p-divider-left {\n        justify-content: flex-start;\n    }\n    \n    .p-divider-horizontal.p-divider-right {\n        justify-content: flex-end;\n    }\n    \n    .p-divider-horizontal.p-divider-center {\n        justify-content: center;\n    }\n    \n    .p-divider-content {\n        z-index: 1;\n    }\n    \n    .p-divider-vertical {\n        min-height: 100%;\n        margin: 0 1rem;\n        display: flex;\n        position: relative;\n        justify-content: center;\n    }\n    \n    .p-divider-vertical:before {\n        position: absolute;\n        display: block;\n        top: 0;\n        left: 50%;\n        height: 100%;\n        content: \"\";\n    }\n    \n    .p-divider-vertical.p-divider-top {\n        align-items: flex-start;\n    }\n    \n    .p-divider-vertical.p-divider-center {\n        align-items: center;\n    }\n    \n    .p-divider-vertical.p-divider-bottom {\n        align-items: flex-end;\n    }\n    \n    .p-divider-solid.p-divider-horizontal:before {\n        border-top-style: solid;\n    }\n    \n    .p-divider-solid.p-divider-vertical:before {\n        border-left-style: solid;\n    }\n    \n    .p-divider-dashed.p-divider-horizontal:before {\n        border-top-style: dashed;\n    }\n    \n    .p-divider-dashed.p-divider-vertical:before {\n        border-left-style: dashed;\n    }\n    \n    .p-divider-dotted.p-divider-horizontal:before {\n        border-top-style: dotted;\n    }\n    \n    .p-divider-dotted.p-divider-horizontal:before {\n        border-left-style: dotted;\n    }\n}\n";
    var inlineStyles = {
      root: function root(_ref2) {
        var props = _ref2.props;
        return {
          justifyContent: props.layout === 'horizontal' ? props.align === 'center' || props.align === null ? 'center' : props.align === 'left' ? 'flex-start' : props.align === 'right' ? 'flex-end' : null : null,
          alignItems: props.layout === 'vertical' ? props.align === 'center' || props.align === null ? 'center' : props.align === 'top' ? 'flex-start' : props.align === 'bottom' ? 'flex-end' : null : null
        };
      }
    };
    var DividerBase = componentbase.ComponentBase.extend({
      defaultProps: {
        __TYPE: 'Divider',
        align: null,
        layout: 'horizontal',
        type: 'solid',
        style: null,
        className: null,
        children: undefined
      },
      css: {
        classes: classes,
        styles: styles,
        inlineStyles: inlineStyles
      }
    });

    var Divider = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var mergeProps = hooks.useMergeProps();
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = DividerBase.getProps(inProps, context);
      var _DividerBase$setMetaD = DividerBase.setMetaData({
          props: props
        }),
        ptm = _DividerBase$setMetaD.ptm,
        cx = _DividerBase$setMetaD.cx,
        sx = _DividerBase$setMetaD.sx,
        isUnstyled = _DividerBase$setMetaD.isUnstyled;
      componentbase.useHandleStyle(DividerBase.css.styles, isUnstyled, {
        name: 'divider'
      });
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
      var rootProps = mergeProps({
        ref: elementRef,
        style: sx('root'),
        className: utils.classNames(props.className, cx('root', {
          horizontal: horizontal,
          vertical: vertical
        })),
        'aria-orientation': props.layout,
        role: 'separator'
      }, DividerBase.getOtherProps(props), ptm('root'));
      var contentProps = mergeProps({
        className: cx('content')
      }, ptm('content'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, props.children));
    });
    Divider.displayName = 'Divider';

    exports.Divider = Divider;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
