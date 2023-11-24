"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    FOCUSABLE_ELEMENTS_LIST: function() {
        return FOCUSABLE_ELEMENTS_LIST;
    },
    Keys: function() {
        return Keys;
    },
    pressedKey: function() {
        return pressedKey;
    },
    shouldTriggerClickOnEnterOrSpace: function() {
        return shouldTriggerClickOnEnterOrSpace;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var FOCUSABLE_ELEMENTS_LIST = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([hidden]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([hidden]):not([aria-hidden])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "iframe",
    "audio",
    "video",
    "[contenteditable]",
    '[tabindex]:not([tabindex="-1"])'
];
var Keys;
(function(Keys) {
    Keys["ENTER"] = "Enter";
    Keys["SPACE"] = "Space";
    Keys["TAB"] = "Tab";
    Keys["ESCAPE"] = "Escape";
    Keys["HOME"] = "Home";
    Keys["END"] = "End";
    Keys["ARROW_LEFT"] = "ArrowLeft";
    Keys["ARROW_RIGHT"] = "ArrowRight";
    Keys["ARROW_UP"] = "ArrowUp";
    Keys["ARROW_DOWN"] = "ArrowDown";
    Keys["PAGE_UP"] = "PageUp";
    Keys["PAGE_DOWN"] = "PageDown";
})(Keys || (Keys = {}));
var ACCESSIBLE_KEYS = [
    {
        code: "Enter",
        key: [
            "Enter"
        ],
        keyCode: 13
    },
    {
        code: "Space",
        key: [
            "Space",
            "Spacebar",
            " "
        ],
        keyCode: 32
    },
    {
        code: "Tab",
        key: [
            "Tab"
        ],
        keyCode: 9
    },
    {
        code: "Escape",
        key: [
            "Escape"
        ],
        keyCode: 27
    },
    {
        code: "Home",
        key: [
            "Home"
        ],
        keyCode: 36
    },
    {
        code: "End",
        key: [
            "End"
        ],
        keyCode: 35
    },
    {
        code: "ArrowLeft",
        key: [
            "ArrowLeft"
        ],
        keyCode: 37
    },
    {
        code: "ArrowRight",
        key: [
            "ArrowRight"
        ],
        keyCode: 39
    },
    {
        code: "ArrowUp",
        key: [
            "ArrowUp"
        ],
        keyCode: 40
    },
    {
        code: "ArrowDown",
        key: [
            "ArrowDown"
        ],
        keyCode: 40
    },
    {
        code: "PageUp",
        key: [
            "PageUp"
        ],
        keyCode: 40
    },
    {
        code: "PageDown",
        key: [
            "PageDown"
        ],
        keyCode: 40
    }
];
function pressedKey(e) {
    var _ACCESSIBLE_KEYS_find;
    return ((_ACCESSIBLE_KEYS_find = ACCESSIBLE_KEYS.find(function(param) {
        var key = param.key, keyCode = param.keyCode;
        return key.includes(e.key) || keyCode === e.keyCode;
    })) === null || _ACCESSIBLE_KEYS_find === void 0 ? void 0 : _ACCESSIBLE_KEYS_find.code) || null;
}
function shouldTriggerClickOnEnterOrSpace(e) {
    var el = e.target;
    var tagName = el.tagName;
    var role = el.getAttribute("role");
    var isValidKeyboardEventTarget = el.isContentEditable !== true && tagName !== "INPUT" && tagName !== "TEXTAREA" && (role === "button" || role === "link");
    var isNativeAnchorEl = tagName === "A" && el.hasAttribute("href");
    var keyPressed = pressedKey(e);
    return isValidKeyboardEventTarget && // trigger buttons on Space
    (keyPressed === "Space" && role === "button" || // trigger non-native links and buttons on Enter
    keyPressed === "Enter" && !isNativeAnchorEl);
}

//# sourceMappingURL=accessibility.js.map