"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HorizontalCellShowMore", {
    enumerable: true,
    get: function() {
        return HorizontalCellShowMore;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _Tappable = require("../../Tappable/Tappable");
const _Subhead = require("../../Typography/Subhead/Subhead");
const sizeClassNames = {
    s: "vkuiHorizontalCellShowMore--size-s",
    m: "vkuiHorizontalCellShowMore--size-m",
    l: "vkuiHorizontalCellShowMore--size-l"
};
const HorizontalCellShowMore = (_param)=>{
    var { className, style, getRef, getRootRef, compensateLastCellIndent, height, size = 's', children = size === 's' ? 'Все' : 'Показать все' } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "style",
        "getRef",
        "getRootRef",
        "compensateLastCellIndent",
        "height",
        "size",
        "children"
    ]);
    return /*#__PURE__*/ _react.createElement("div", {
        style: style,
        className: (0, _vkjs.classNames)("vkuiHorizontalCellShowMore", compensateLastCellIndent && "vkuiHorizontalCellShowMore--compensate-last-cell-indent", sizeClassNames[size], className),
        ref: getRootRef
    }, /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        style: size === 's' ? undefined : {
            height
        },
        className: "vkuiHorizontalCellShowMore__body",
        getRootRef: getRef,
        activeMode: "opacity",
        hoverMode: "opacity"
    }, restProps), /*#__PURE__*/ _react.createElement(_icons.Icon28ChevronRightCircle, {
        className: "vkuiHorizontalCellShowMore__icon",
        fill: "currentColor"
    }), /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        className: "vkuiHorizontalCellShowMore__text",
        weight: "2"
    }, children)));
};

//# sourceMappingURL=HorizontalCellShowMore.js.map