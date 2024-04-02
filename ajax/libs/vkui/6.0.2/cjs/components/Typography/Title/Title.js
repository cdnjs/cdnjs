"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Title", {
    enumerable: true,
    get: function() {
        return Title;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Typography = require("../Typography");
const stylesLevel = {
    '1': "vkuiTitle--level-1",
    '2': "vkuiTitle--level-2",
    '3': "vkuiTitle--level-3"
};
const Title = (_param)=>{
    var { className, level = '1', Component = 'span', normalize = true } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "level",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ _react.createElement(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        className: (0, _vkjs.classNames)(className, stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Title.js.map