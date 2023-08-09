import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePlatform } from "../../hooks/usePlatform";
import { useTimeout } from "../../hooks/useTimeout";
import { useDOM } from "../../lib/dom";
import { Platform } from "../../lib/platform";
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */ export var PopoutWrapper = function(_param) {
    var _param_alignY = _param.alignY, alignY = _param_alignY === void 0 ? "center" : _param_alignY, _param_alignX = _param.alignX, alignX = _param_alignX === void 0 ? "center" : _param_alignX, _param_closing = _param.closing, closing = _param_closing === void 0 ? false : _param_closing, _param_hasMask = _param.hasMask, hasMask = _param_hasMask === void 0 ? true : _param_hasMask, _param_fixed = _param.fixed, fixed = _param_fixed === void 0 ? true : _param_fixed, children = _param.children, onClick = _param.onClick, className = _param.className, restProps = _object_without_properties(_param, [
        "alignY",
        "alignX",
        "closing",
        "hasMask",
        "fixed",
        "children",
        "onClick",
        "className"
    ]);
    var platform = usePlatform();
    var _React_useState = _sliced_to_array(React.useState(!hasMask), 2), opened = _React_useState[0], setOpened = _React_useState[1];
    var elRef = React.useRef(null);
    var onFadeInEnd = function(e) {
        if (!e || e.animationName === "vkuivkui-animation-full-fade-in") {
            setOpened(true);
        }
    };
    var animationFinishFallback = useTimeout(onFadeInEnd, platform === Platform.IOS ? 300 : 200);
    React.useEffect(function() {
        !opened && animationFinishFallback.set();
    }, [
        animationFinishFallback,
        opened
    ]);
    var window = useDOM().window;
    useGlobalEventListener(window, "touchmove", function(e) {
        return e.preventDefault();
    }, {
        passive: false
    });
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiPopoutWrapper", {
            center: "vkuiPopoutWrapper--alignY-center",
            top: "vkuiPopoutWrapper--alignY-top",
            bottom: "vkuiPopoutWrapper--alignY-bottom"
        }[alignY], {
            center: "vkuiPopoutWrapper--alignX-center",
            left: "vkuiPopoutWrapper--alignX-left",
            right: "vkuiPopoutWrapper--alignX-right"
        }[alignX], closing && "vkuiPopoutWrapper--closing", opened && "vkuiPopoutWrapper--opened", fixed && "vkuiPopoutWrapper--fixed", hasMask && "vkuiPopoutWrapper--masked", className),
        onAnimationEnd: opened ? undefined : onFadeInEnd,
        ref: elRef
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPopoutWrapper__container"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPopoutWrapper__overlay",
        onClick: onClick
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPopoutWrapper__content"
    }, children)));
};

//# sourceMappingURL=PopoutWrapper.js.map