"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useKeyboard", {
    enumerable: true,
    get: function() {
        return useKeyboard;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _accessibility = require("../../lib/accessibility");
function useKeyboard() {
    function onKeyDown(e) {
        var // @ts-expect-error: TS2339 У элемента должен быть клик
        _e_target_click, _e_target;
        if (!(0, _accessibility.shouldTriggerClickOnEnterOrSpace)(e)) {
            return;
        }
        e.preventDefault();
        (_e_target_click = (_e_target = e.target).click) === null || _e_target_click === void 0 ? void 0 : _e_target_click.call(_e_target);
    }
    return {
        onKeyDown
    };
}

//# sourceMappingURL=useKeyboard.js.map