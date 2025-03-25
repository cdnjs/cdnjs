"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EllipsisText", {
    enumerable: true,
    get: function() {
        return EllipsisText;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _vkjs = require("@vkontakte/vkjs");
const _useIsomorphicLayoutEffect = require("../../../lib/useIsomorphicLayoutEffect");
/** Компонент ограничивает текстовый контент убирая его в многоточие.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/EllipsisText
 */ const EllipsisText = (_param)=>{
    var { className, getRootRef, children, maxWidth, maxLines = 1 } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "getRootRef",
        "children",
        "maxWidth",
        "maxLines"
    ]);
    const contentRef = (0, _react.useRef)(null);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (contentRef && contentRef.current) {
            contentRef.current.style.setProperty('-webkit-line-clamp', maxLines > 1 ? `${maxLines}` : '');
        }
    }, [
        contentRef,
        maxLines
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("span", _object_spread_props._(_object_spread._({
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiEllipsisText", className)
    }, restProps), {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
            style: {
                maxWidth
            },
            ref: contentRef,
            className: (0, _vkjs.classNames)("vkuiEllipsisText__content", maxLines > 1 && "vkuiEllipsisText__content--multiline"),
            children: children
        })
    }));
};

//# sourceMappingURL=EllipsisText.js.map