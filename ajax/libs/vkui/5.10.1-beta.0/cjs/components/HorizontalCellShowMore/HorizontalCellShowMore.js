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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../Tappable/Tappable");
var _Subhead = require("../Typography/Subhead/Subhead");
var sizeClassNames = {
    s: "vkuiHorizontalCellShowMore--size-s",
    m: "vkuiHorizontalCellShowMore--size-m",
    l: "vkuiHorizontalCellShowMore--size-l"
};
var HorizontalCellShowMore = function(_param) {
    var className = _param.className, style = _param.style, getRef = _param.getRef, getRootRef = _param.getRootRef, compensateLastCellIndent = _param.compensateLastCellIndent, height = _param.height, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_children = _param.children, children = _param_children === void 0 ? size === "s" ? "Все" : "Показать все" : _param_children, restProps = _object_without_properties._(_param, [
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
        style: size === "s" ? undefined : {
            height: height
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