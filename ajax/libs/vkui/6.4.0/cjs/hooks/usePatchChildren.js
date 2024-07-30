"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usePatchChildren", {
    enumerable: true,
    get: function() {
        return usePatchChildren;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _getMergedSameEventsByProps = require("../helpers/getMergedSameEventsByProps");
const _utils = require("../lib/utils");
const _warnOnce = require("../lib/warnOnce");
const _useEffectDev = require("./useEffectDev");
const _useExternRef = require("./useExternRef");
const warn = (0, _warnOnce.warnOnce)('usePatchChildrenRef');
const usePatchChildren = (children, injectProps, externRef)=>{
    const isValidElementResult = (0, _utils.isValidNotReactFragmentElement)(children);
    const isDOMTypeElementResult = isValidElementResult && (0, _utils.isDOMTypeElement)(children);
    const isForwardedRefElementResult = isValidElementResult && (0, _utils.isForwardRefElement)(children);
    const shouldUseRef = isDOMTypeElementResult || isForwardedRefElementResult;
    const childRef = (0, _useExternRef.useExternRef)(shouldUseRef ? children.ref : isValidElementResult ? children.props.getRootRef : undefined, externRef);
    const mergedEventsByInjectProps = (0, _getMergedSameEventsByProps.getMergedSameEventsByProps)(injectProps ? injectProps : {}, isValidElementResult ? children.props : {});
    const props = shouldUseRef ? _object_spread._({
        ref: childRef
    }, injectProps, mergedEventsByInjectProps) : isValidElementResult ? _object_spread._({
        getRootRef: childRef
    }, injectProps, mergedEventsByInjectProps) : undefined;
    (0, _useEffectDev.useEffectDev)(()=>{
        if (!childRef.current) {
            warn('Кажется, в children передан компонент, который не поддерживает свойство getRootRef. Мы не можем получить ссылку на корневой dom-элемент этого компонента', 'error');
        }
    }, [
        isValidElementResult ? children.type : null,
        childRef
    ]);
    return [
        childRef,
        isValidElementResult ? _react.cloneElement(children, props) : children
    ];
};

//# sourceMappingURL=usePatchChildren.js.map