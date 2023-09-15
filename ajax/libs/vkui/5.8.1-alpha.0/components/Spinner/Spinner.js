import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from "@vkontakte/icons";
import { warnOnce } from "../../lib/warnOnce";
import { RootComponent } from "../RootComponent/RootComponent";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";
var warn = warnOnce("Spinner");
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */ export var Spinner = /*#__PURE__*/ React.memo(function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "regular" : _param_size, _param_children = _param.children, children = _param_children === void 0 ? "Загружается..." : _param_children, tmp = _param[// TODO [>=6]: Удалить автоматическое приведение aria-label
    "aria-label"], ariaLabel = tmp === void 0 ? "Загружается..." : tmp, disableAnimation = _param.disableAnimation, restProps = _object_without_properties(_param, [
        "size",
        "children",
        "aria-label",
        "disableAnimation"
    ]);
    var SpinnerIcon = {
        small: Icon16Spinner,
        regular: Icon24Spinner,
        medium: Icon32Spinner,
        large: Icon44Spinner
    }[size];
    var center = {
        small: 8,
        regular: 12,
        medium: 16,
        large: 22
    }[size];
    // TODO [>=6]: Удалить варнинг
    if (process.env.NODE_ENV === "development") {
        if (ariaLabel && !children) {
            warn("a11y: Пожалуйста, передавайте ваш текст для ассистивных технологий в children вместо aria-label.");
        }
    }
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        Component: "span",
        role: "status"
    }, restProps), {
        baseClassName: "vkuiSpinner"
    }), /*#__PURE__*/ React.createElement(SpinnerIcon, null, !disableAnimation && // TODO [a11y]: use reduced motion hook?
    //              https://github.com/VKCOM/VKUI/pull/4673
    /*#__PURE__*/ React.createElement("animateTransform", {
        attributeName: "transform",
        attributeType: "XML",
        type: "rotate",
        from: "0 ".concat(center, " ").concat(center),
        to: "360 ".concat(center, " ").concat(center),
        dur: "0.7s",
        repeatCount: "indefinite"
    })), /*#__PURE__*/ React.createElement(VisuallyHidden, null, children !== null && children !== void 0 ? children : ariaLabel));
});
Spinner.displayName = "Spinner";

//# sourceMappingURL=Spinner.js.map