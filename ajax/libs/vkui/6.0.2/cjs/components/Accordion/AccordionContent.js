"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccordionContent", {
    enumerable: true,
    get: function() {
        return AccordionContent;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _AccordionContext = require("./AccordionContext");
/**
 * Функция расчета max-height, для скрытия или раскрытия контента.
 */ function calcMaxHeight(expanded, el) {
    if (!expanded) {
        return '0px';
    }
    // В первый рендеринг нельзя узнать высоту элемента
    if (el === null) {
        return 'inherit';
    }
    return `${el.scrollHeight}px`;
}
/**
 * Хук для отслеживания изменения высоты контента.
 */ function useResizeContent(expanded, inRef) {
    const resize = ()=>{
        inRef.current.style.maxHeight = calcMaxHeight(expanded, inRef.current);
    };
    const { window } = (0, _dom.useDOM)();
    (0, _useGlobalEventListener.useGlobalEventListener)(window, 'resize', resize);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(resize, []);
}
/**
 * Хук для скрывания или раскрывания контента. Возвращает стили для in элемента.
 */ function useAccordionContent(expanded, inRef) {
    const maxHeight = calcMaxHeight(expanded, inRef.current);
    useResizeContent(expanded, inRef);
    return {
        maxHeight
    };
}
const AccordionContent = (_param)=>{
    var { getRootRef, getRef, className, children } = _param, restProps = _object_without_properties._(_param, [
        "getRootRef",
        "getRef",
        "className",
        "children"
    ]);
    const inRef = (0, _useExternRef.useExternRef)(getRef);
    const { expanded, labelId, contentId } = _react.useContext(_AccordionContext.AccordionContext);
    const inStyle = useAccordionContent(expanded, inRef);
    return /*#__PURE__*/ _react.createElement("div", _object_spread._({
        ref: getRootRef,
        id: contentId,
        role: "region",
        "aria-labelledby": labelId,
        "aria-hidden": !expanded,
        className: (0, _vkjs.classNames)("vkuiAccordionContent", className)
    }, restProps), /*#__PURE__*/ _react.createElement("div", {
        ref: inRef,
        className: "vkuiAccordionContent__in",
        style: inStyle
    }, children));
};

//# sourceMappingURL=AccordionContent.js.map