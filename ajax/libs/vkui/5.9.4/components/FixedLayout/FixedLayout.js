import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePlatform } from "../../hooks/usePlatform";
import { useDOM } from "../../lib/dom";
import { Platform } from "../../lib/platform";
import { SplitColContext } from "../SplitCol/SplitColContext";
import { TooltipContainer } from "../Tooltip/TooltipContainer";
var stylesVertical = {
    top: "vkuiFixedLayout--vertical-top",
    bottom: classNames("vkuiFixedLayout--vertical-bottom", "vkuiInternalFixedLayout--vertical-bottom")
};
/**
 * @see https://vkcom.github.io/VKUI/#/FixedLayout
 */ export var FixedLayout = function(_param) {
    var children = _param.children, style = _param.style, vertical = _param.vertical, getRootRef = _param.getRootRef, getRef = _param.getRef, filled = _param.filled, className = _param.className, useParentWidth = _param.useParentWidth, restProps = _object_without_properties(_param, [
        "children",
        "style",
        "vertical",
        "getRootRef",
        "getRef",
        "filled",
        "className",
        "useParentWidth"
    ]);
    var platform = usePlatform();
    var ref = useExternRef(getRootRef, getRef); // TODO [>=6]: удалить getRef
    var _React_useState = _sliced_to_array(React.useState(undefined), 2), width = _React_useState[0], setWidth = _React_useState[1];
    var window = useDOM().window;
    var colRef = React.useContext(SplitColContext).colRef;
    var doResize = function() {
        if (useParentWidth && ref.current) {
            var _ref_current_parentElement;
            var parentWidth = (_ref_current_parentElement = ref.current.parentElement) === null || _ref_current_parentElement === void 0 ? void 0 : _ref_current_parentElement.getBoundingClientRect().width;
            setWidth(parentWidth ? "".concat(parentWidth, "px") : undefined);
        } else if (colRef === null || colRef === void 0 ? void 0 : colRef.current) {
            var computedStyle = getComputedStyle(colRef.current);
            setWidth("".concat(colRef.current.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight), "px"));
        } else {
            setWidth(undefined);
        }
    };
    React.useEffect(doResize, [
        colRef,
        platform,
        ref,
        useParentWidth
    ]);
    useGlobalEventListener(window, "resize", doResize);
    return /*#__PURE__*/ React.createElement(TooltipContainer, _object_spread_props(_object_spread({}, restProps), {
        fixed: true,
        ref: ref,
        className: classNames("vkuiFixedLayout", platform === Platform.IOS && "vkuiInternalFixedLayout--ios", filled && "vkuiFixedLayout--filled", vertical && stylesVertical[vertical], className),
        style: _object_spread_props(_object_spread({}, style), {
            width: width
        })
    }), children);
};

//# sourceMappingURL=FixedLayout.js.map