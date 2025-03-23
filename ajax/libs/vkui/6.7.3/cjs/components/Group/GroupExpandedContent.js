"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GroupExpandedContent", {
    enumerable: true,
    get: function() {
        return GroupExpandedContent;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const stylesDirection = {
    inline: "vkuiGroup__expanded-content--inline",
    block: "vkuiGroup__expanded-content--block"
};
const GroupExpandedContent = (_param)=>{
    var { direction = 'inline' } = _param, restProps = _object_without_properties._(_param, [
        "direction"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "div"
    }, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiGroup__expanded-content", stylesDirection[direction])
    }));
};

//# sourceMappingURL=GroupExpandedContent.js.map