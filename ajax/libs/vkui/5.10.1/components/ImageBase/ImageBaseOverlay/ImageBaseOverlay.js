import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityHasPointer } from "../../../hooks/useAdaptivityHasPointer";
import { useAppearance } from "../../../hooks/useAppearance";
import { focusVisiblePresetModeClassNames } from "../../../hooks/useFocusVisibleClassName";
import { Tappable } from "../../Tappable/Tappable";
import { ImageBaseContext } from "../context";
import { validateOverlayIcon } from "../validators";
/**
 * Интерактивный оверлей над картинкой.
 */ export var ImageBaseOverlay = function(_param) {
    var className = _param.className, themeProp = _param.theme, visibilityProp = _param.visibility, children = _param.children, onClick = _param.onClick, restProps = _object_without_properties(_param, [
        "className",
        "theme",
        "visibility",
        "children",
        "onClick"
    ]);
    var appearance = useAppearance();
    var hasPointer = useAdaptivityHasPointer();
    var theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
    var visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasPointer ? "on-hover" : "always";
    if (process.env.NODE_ENV === "development") {
        if (children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            var size = React.useContext(ImageBaseContext).size;
            validateOverlayIcon(size, {
                name: "children",
                value: children
            });
        }
    }
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        type: "button",
        Component: "button",
        className: classNames("vkuiImageBaseOverlay", visibility === "always" && "vkuiImageBaseOverlay--visible", theme === "light" && "vkuiImageBaseOverlay--theme-light", theme === "dark" && "vkuiImageBaseOverlay--theme-dark", className),
        hasHover: visibility === "on-hover",
        hoverMode: visibility === "on-hover" ? "vkuiImageBaseOverlay--visible" : undefined,
        focusVisibleMode: classNames(focusVisiblePresetModeClassNames["inside"], "vkuiImageBaseOverlay--visible"),
        hasActive: false,
        onClick: onClick
    }), children);
};

//# sourceMappingURL=ImageBaseOverlay.js.map