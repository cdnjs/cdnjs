import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon12Circle as Icon12CircleLib, Icon12OnlineMobile as Icon12OnlineMobileLib } from "@vkontakte/icons";
export var Icon12Circle = function(_param) {
    var _param_width = _param.width, width = _param_width === void 0 ? 12 : _param_width, _param_height = _param.height, height = _param_height === void 0 ? 12 : _param_height, restProps = _object_without_properties(_param, [
        "width",
        "height"
    ]);
    return /*#__PURE__*/ React.createElement(Icon12CircleLib, _object_spread_props(_object_spread({}, restProps), {
        width: width >= 24 ? 15 : 12,
        height: height >= 24 ? 15 : 12
    }));
};
export var Icon12OnlineMobile = function(_param) {
    var _param_width = _param.width, width = _param_width === void 0 ? 8 : _param_width, _param_height = _param.height, height = _param_height === void 0 ? 12 : _param_height, restProps = _object_without_properties(_param, [
        "width",
        "height"
    ]);
    return /*#__PURE__*/ React.createElement(Icon12OnlineMobileLib, _object_spread_props(_object_spread({}, restProps), {
        width: width >= 24 ? 9 : 8,
        height: height >= 24 ? 15 : 12
    }));
};

//# sourceMappingURL=icons.js.map