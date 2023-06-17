import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { SizeType } from "../../../lib/adaptivity";
var sizeYClassNames = _define_property({
    none: "vkuiText--sizeY-none"
}, SizeType.COMPACT, "vkuiText--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Text
 */ export var Text = function(_param) {
    var className = _param.className, children = _param.children, weight = _param.weight, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, getRootRef = _param.getRootRef, restProps = _object_without_properties(_param, [
        "className",
        "children",
        "weight",
        "Component",
        "getRootRef"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        ref: getRootRef,
        className: classNames(className, "vkuiText", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], weight && ({
            "1": "vkuiText--weight-1",
            "2": "vkuiText--weight-2",
            "3": "vkuiText--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Text.js.map