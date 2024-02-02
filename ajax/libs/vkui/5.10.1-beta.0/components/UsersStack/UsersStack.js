import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useId } from "../../hooks/useId";
import { warnOnce } from "../../lib/warnOnce";
import { RootComponent } from "../RootComponent/RootComponent";
import { Caption } from "../Typography/Caption/Caption";
import { Footnote } from "../Typography/Footnote/Footnote";
var stylesSize = {
    s: "vkuiUsersStack--size-s",
    m: "vkuiUsersStack--size-m",
    l: "vkuiUsersStack--size-l"
};
var stylesDirection = {
    "row": "vkuiUsersStack--direction-row",
    "row-reverse": "vkuiUsersStack--direction-row-reverse",
    "column": "vkuiUsersStack--direction-column"
};
function PathElement(_param) {
    var photoSize = _param.photoSize, direction = _param.direction, props = _object_without_properties(_param, [
        "photoSize",
        "direction"
    ]);
    switch(direction){
        case "circle":
            var radius = photoSize / 2;
            return /*#__PURE__*/ React.createElement("circle", _object_spread({
                cx: radius,
                cy: radius,
                r: radius
            }, props));
        case "right":
            switch(photoSize){
                case 24:
                    return /*#__PURE__*/ React.createElement("path", _object_spread({
                        d: "M22,18.625A12 12 0 0 1 12 24A12 12 0 0 1 12 0A12 12 0 0 1 22 5.375A12 12 0 0 0 22,18.625"
                    }, props));
                default:
                    return /*#__PURE__*/ React.createElement("path", _object_spread({
                        d: "M30,23.75A16 16 0 0 1 16 32A16 16 0 0 1 16 0A16 16 0 0 1 30 8.25A16 16 0 0 0 30,23.75"
                    }, props));
            }
        default:
            switch(photoSize){
                case 16:
                    return /*#__PURE__*/ React.createElement("path", _object_spread({
                        d: "M2,13.285A8 8 0 0 0 8 16A8 8 0 0 0 8 0A8 8 0 0 0 2 2.715A8 8 0 0 1 2,13.285"
                    }, props));
                case 24:
                    return /*#__PURE__*/ React.createElement("path", _object_spread({
                        d: "M2,18.625A12 12 0 0 0 12 24A12 12 0 0 0 12 0A12 12 0 0 0 2 5.375A12 12 0 0 1 2,18.625"
                    }, props));
                default:
                    return /*#__PURE__*/ React.createElement("path", _object_spread({
                        d: "M2,23.75A16 16 0 0 0 16 32A16 16 0 0 0 16 0A16 16 0 0 0 2 8.25A16 16 0 0 1 2,23.75"
                    }, props));
            }
    }
}
var photoSizes = {
    s: 16,
    m: 24,
    l: 32
};
var warn = warnOnce("UsersStack");
/**
 * @see https://vkcom.github.io/VKUI/#/UsersStack
 */ export var UsersStack = function(_param) {
    var _param_photos = _param.photos, photos = _param_photos === void 0 ? [] : _param_photos, _param_visibleCount = _param.visibleCount, visibleCount = _param_visibleCount === void 0 ? 3 : _param_visibleCount, _param_count = _param.count, count = _param_count === void 0 ? Math.max(0, photos.length - visibleCount) : _param_count, _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, layout = _param.layout, children = _param.children, tmp = _param.direction, directionProp = tmp === void 0 ? "row" : tmp, restProps = _object_without_properties(_param, [
        "photos",
        "visibleCount",
        "count",
        "size",
        "layout",
        "children",
        "direction"
    ]);
    var cmpId = useId();
    var canShowOthers = count > 0 && count < 100 && size !== "s";
    var CounterTypography = size === "l" ? Footnote : Caption;
    var photoSize = photoSizes[size];
    var directionClip = canShowOthers ? "right" : "left";
    var photosElements = photos.slice(0, visibleCount).map(function(photo, i) {
        var direction = i === 0 && !canShowOthers ? "circle" : directionClip;
        var id = "UsersStackDefs".concat(cmpId).concat(i);
        var hrefID = "#".concat(id);
        var maskID = "UsersStackMask".concat(cmpId).concat(i);
        return /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "vkuiUsersStack__photo",
            key: i,
            "aria-hidden": true
        }, /*#__PURE__*/ React.createElement("defs", null, /*#__PURE__*/ React.createElement(PathElement, {
            id: id,
            direction: direction,
            photoSize: photoSize
        })), /*#__PURE__*/ React.createElement("clipPath", {
            id: maskID
        }, /*#__PURE__*/ React.createElement("use", {
            href: hrefID
        })), /*#__PURE__*/ React.createElement("g", {
            clipPath: "url(#".concat(maskID, ")")
        }, /*#__PURE__*/ React.createElement("use", {
            href: hrefID,
            className: "vkuiUsersStack__fill"
        }), /*#__PURE__*/ React.createElement("image", {
            href: photo,
            width: photoSize,
            height: photoSize
        }), /*#__PURE__*/ React.createElement("use", {
            href: hrefID,
            fill: "none",
            stroke: "rgba(0, 0, 0, 0.08)"
        })));
    });
    var othersElement = canShowOthers ? /*#__PURE__*/ React.createElement(CounterTypography, {
        caps: true,
        weight: "1",
        className: classNames("vkuiUsersStack__photo", "vkuiUsersStack__photo--others")
    }, "+", count) : null;
    if (process.env.NODE_ENV === "development" && layout) {
        // TODO [>=6]: Удалить layout
        warn('Свойство "layout" будет удалено в v6. Используйте свойство "direction"');
    }
    var direction = layout && (layout === "vertical" ? "column" : "row") || directionProp;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiInternalUsersStack", "vkuiUsersStack", stylesSize[size], stylesDirection[direction])
    }), (photosElements.length > 0 || othersElement) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiUsersStack__photos",
        "aria-hidden": true
    }, photosElements, othersElement), hasReactNode(children) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiUsersStack__text"
    }, children));
};

//# sourceMappingURL=UsersStack.js.map