"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccordionSummary", {
    enumerable: true,
    get: function() {
        return AccordionSummary;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _callMultiple = require("../../lib/callMultiple");
const _SimpleCell = require("../SimpleCell/SimpleCell");
const _AccordionContext = require("./AccordionContext");
const AccordionSummary = (_param)=>{
    var { after, before, ExpandIcon = _icons.Icon24ChevronDown, CollapseIcon = _icons.Icon24ChevronUp, iconPosition = 'after', onClick, children } = _param, restProps = _object_without_properties._(_param, [
        "after",
        "before",
        "ExpandIcon",
        "CollapseIcon",
        "iconPosition",
        "onClick",
        "children"
    ]);
    const { expanded, labelId, contentId, onChange } = _react.useContext(_AccordionContext.AccordionContext);
    const Icon = expanded ? CollapseIcon : ExpandIcon;
    const icon = // Обертка нужна для правильной работы с отступами в SimpleCell
    /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiIcon"
    }, /*#__PURE__*/ _react.createElement(Icon, {
        className: "vkuiAccordionSummary__icon"
    }));
    const toggle = ()=>onChange(!expanded);
    return /*#__PURE__*/ _react.createElement(_SimpleCell.SimpleCell, _object_spread._({
        id: labelId,
        "aria-expanded": expanded,
        "aria-controls": contentId,
        onClick: (0, _callMultiple.callMultiple)(toggle, onClick),
        before: /*#__PURE__*/ _react.createElement(_react.Fragment, null, iconPosition === 'before' && icon, before),
        after: /*#__PURE__*/ _react.createElement(_react.Fragment, null, after, iconPosition === 'after' && icon)
    }, restProps), children);
};

//# sourceMappingURL=AccordionSummary.js.map