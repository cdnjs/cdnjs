import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon20ChevronUp, Icon20Dropdown, Icon24ChevronDown, Icon24ChevronUp } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender";
export var DropdownIcon = function(_param) {
    var _param_opened = _param.opened, opened = _param_opened === void 0 ? false : _param_opened, className = _param.className, restProps = _object_without_properties(_param, [
        "opened",
        "className"
    ]);
    var sizeY = useAdaptivityConditionalRender().sizeY;
    var IconCompact = opened ? Icon20ChevronUp : Icon20Dropdown;
    var IconRegular = opened ? Icon24ChevronUp : Icon24ChevronDown;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, sizeY.compact && /*#__PURE__*/ React.createElement(IconCompact, _object_spread({
        className: classNames(sizeY.compact.className, className)
    }, restProps)), sizeY.regular && /*#__PURE__*/ React.createElement(IconRegular, _object_spread({
        className: classNames(sizeY.regular.className, className)
    }, restProps)));
};

//# sourceMappingURL=DropdownIcon.js.map