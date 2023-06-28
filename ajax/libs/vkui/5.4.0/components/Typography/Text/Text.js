import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { SizeType } from "../../../lib/adaptivity";
import { Typography } from "../Typography";
var sizeYClassNames = _define_property({
    none: "vkuiText--sizeY-none"
}, SizeType.COMPACT, "vkuiText--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Text
 */ export var Text = function(_param) {
    var className = _param.className, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _object_without_properties(_param, [
        "className",
        "Component",
        "normalize"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        className: classNames(className, "vkuiText", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY])
    }, restProps));
};

//# sourceMappingURL=Text.js.map