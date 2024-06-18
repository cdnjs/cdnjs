"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersStack", {
    enumerable: true,
    get: function() {
        return UsersStack;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const _Caption = require("../Typography/Caption/Caption");
const _Footnote = require("../Typography/Footnote/Footnote");
const stylesSize = {
    s: "vkuiUsersStack--size-s",
    m: "vkuiUsersStack--size-m",
    l: "vkuiUsersStack--size-l"
};
const stylesDirection = {
    'row': "vkuiUsersStack--direction-row",
    'row-reverse': "vkuiUsersStack--direction-row-reverse",
    'column': "vkuiUsersStack--direction-column"
};
function PathElement(_param) {
    var { photoSize, direction } = _param, props = _object_without_properties._(_param, [
        "photoSize",
        "direction"
    ]);
    switch(direction){
        case 'circle':
            const radius = photoSize / 2;
            return /*#__PURE__*/ _react.createElement("circle", _object_spread._({
                cx: radius,
                cy: radius,
                r: radius
            }, props));
        case 'right':
            switch(photoSize){
                case 24:
                    return /*#__PURE__*/ _react.createElement("path", _object_spread._({
                        d: "M22,18.625A12 12 0 0 1 12 24A12 12 0 0 1 12 0A12 12 0 0 1 22 5.375A12 12 0 0 0 22,18.625"
                    }, props));
                default:
                    return /*#__PURE__*/ _react.createElement("path", _object_spread._({
                        d: "M30,23.75A16 16 0 0 1 16 32A16 16 0 0 1 16 0A16 16 0 0 1 30 8.25A16 16 0 0 0 30,23.75"
                    }, props));
            }
        default:
            switch(photoSize){
                case 16:
                    return /*#__PURE__*/ _react.createElement("path", _object_spread._({
                        d: "M2,13.285A8 8 0 0 0 8 16A8 8 0 0 0 8 0A8 8 0 0 0 2 2.715A8 8 0 0 1 2,13.285"
                    }, props));
                case 24:
                    return /*#__PURE__*/ _react.createElement("path", _object_spread._({
                        d: "M2,18.625A12 12 0 0 0 12 24A12 12 0 0 0 12 0A12 12 0 0 0 2 5.375A12 12 0 0 1 2,18.625"
                    }, props));
                default:
                    return /*#__PURE__*/ _react.createElement("path", _object_spread._({
                        d: "M2,23.75A16 16 0 0 0 16 32A16 16 0 0 0 16 0A16 16 0 0 0 2 8.25A16 16 0 0 1 2,23.75"
                    }, props));
            }
    }
}
const photoSizes = {
    s: 16,
    m: 24,
    l: 32
};
const UsersStack = (_param)=>{
    var { photos = [], visibleCount = 3, count = Math.max(0, photos.length - visibleCount), size = 'm', children, direction = 'row' } = _param, restProps = _object_without_properties._(_param, [
        "photos",
        "visibleCount",
        "count",
        "size",
        "children",
        "direction"
    ]);
    const cmpId = _react.useId();
    const canShowOthers = count > 0 && count < 100 && size !== 's';
    const CounterTypography = size === 'l' ? _Footnote.Footnote : _Caption.Caption;
    const photoSize = photoSizes[size];
    const directionClip = canShowOthers ? 'right' : 'left';
    const photosElements = photos.slice(0, visibleCount).map((photo, i)=>{
        const direction = i === 0 && !canShowOthers ? 'circle' : directionClip;
        const id = `UsersStackDefs${cmpId}${i}`;
        const hrefID = `#${id}`;
        const maskID = `UsersStackMask${cmpId}${i}`;
        return /*#__PURE__*/ _react.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: "vkuiUsersStack__photo",
            key: i,
            "aria-hidden": true
        }, /*#__PURE__*/ _react.createElement("defs", null, /*#__PURE__*/ _react.createElement(PathElement, {
            id: id,
            direction: direction,
            photoSize: photoSize
        })), /*#__PURE__*/ _react.createElement("clipPath", {
            id: maskID
        }, /*#__PURE__*/ _react.createElement("use", {
            href: hrefID
        })), /*#__PURE__*/ _react.createElement("g", {
            clipPath: `url(#${maskID})`
        }, /*#__PURE__*/ _react.createElement("use", {
            href: hrefID,
            className: "vkuiUsersStack__fill"
        }), /*#__PURE__*/ _react.createElement("image", {
            href: photo,
            width: photoSize,
            height: photoSize
        }), /*#__PURE__*/ _react.createElement("use", {
            href: hrefID,
            fill: "none",
            stroke: "rgba(0, 0, 0, 0.08)"
        })));
    });
    const othersElement = canShowOthers ? /*#__PURE__*/ _react.createElement(CounterTypography, {
        caps: true,
        weight: "1",
        className: (0, _vkjs.classNames)("vkuiUsersStack__photo", "vkuiUsersStack__photo--others")
    }, "+", count) : null;
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiUsersStack", stylesSize[size], stylesDirection[direction])
    }), (photosElements.length > 0 || othersElement) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiUsersStack__photos",
        "aria-hidden": true
    }, photosElements, othersElement), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiUsersStack__text"
    }, children));
};

//# sourceMappingURL=UsersStack.js.map