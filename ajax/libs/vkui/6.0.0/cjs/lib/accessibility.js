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
    FOCUS_ALLOW_LIST_KEYS: function() {
        return FOCUS_ALLOW_LIST_KEYS;
    },
    Keys: function() {
        return Keys;
    },
    getHorizontalFocusGoTo: function() {
        return getHorizontalFocusGoTo;
    },
    hasAccessibleName: function() {
        return hasAccessibleName;
    },
    injectAriaExpandedPropByRole: function() {
        return injectAriaExpandedPropByRole;
    },
    isKeyboardFocusingStarted: function() {
        return isKeyboardFocusingStarted;
    },
    pressedKey: function() {
        return pressedKey;
    },
    shouldTriggerClickOnEnterOrSpace: function() {
        return shouldTriggerClickOnEnterOrSpace;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _children = require("./children");
const FOCUSABLE_ELEMENTS_LIST = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([hidden]):not([type="hidden"]):not([aria-hidden])',
    'select:not([disabled]):not([hidden]):not([aria-hidden])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'audio',
    'video',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])'
];
const Keys = {
    ENTER: 'Enter',
    SPACE: 'Space',
    TAB: 'Tab',
    ESCAPE: 'Escape',
    HOME: 'Home',
    END: 'End',
    DELETE: 'Delete',
    BACKSPACE: 'Backspace',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown'
};
const EVENT_KEY_TO_COMMON_KEY_MAP = new Map([
    [
        'Enter',
        Keys.ENTER
    ],
    [
        'Space',
        Keys.SPACE
    ],
    [
        'Spacebar',
        Keys.SPACE
    ],
    [
        ' ',
        Keys.SPACE
    ],
    [
        'Tab',
        Keys.TAB
    ],
    [
        'Escape',
        Keys.ESCAPE
    ],
    [
        'Home',
        Keys.HOME
    ],
    [
        'End',
        Keys.END
    ],
    [
        'ArrowLeft',
        Keys.ARROW_LEFT
    ],
    [
        'ArrowRight',
        Keys.ARROW_RIGHT
    ],
    [
        'ArrowUp',
        Keys.ARROW_UP
    ],
    [
        'ArrowDown',
        Keys.ARROW_DOWN
    ],
    [
        'PageUp',
        Keys.PAGE_UP
    ],
    [
        'PageDown',
        Keys.PAGE_DOWN
    ]
]);
function pressedKey(event) {
    const foundKey = EVENT_KEY_TO_COMMON_KEY_MAP.get(event.key);
    return foundKey ? foundKey : null;
}
const FOCUS_ALLOW_LIST_KEYS = new Set([
    Keys.TAB,
    Keys.ARROW_LEFT,
    Keys.ARROW_RIGHT,
    Keys.ARROW_UP,
    Keys.ARROW_DOWN,
    Keys.BACKSPACE,
    Keys.DELETE
]);
function isKeyboardFocusingStarted(event) {
    return FOCUS_ALLOW_LIST_KEYS.has(event.key);
}
function shouldTriggerClickOnEnterOrSpace(e) {
    const el = e.target;
    const { tagName } = el;
    const role = el.getAttribute('role');
    const isValidKeyboardEventTarget = el.isContentEditable !== true && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && (role === 'button' || role === 'link' || role === 'menuitem');
    const isNativeAnchorEl = tagName === 'A' && el.hasAttribute('href');
    const keyPressed = pressedKey(e);
    return isValidKeyboardEventTarget && // trigger buttons on Space
    (keyPressed === Keys.SPACE && role === 'button' || // trigger non-native links and buttons on Enter
    keyPressed === Keys.ENTER && !isNativeAnchorEl);
}
const injectAriaExpandedPropByRole = (props, state, role)=>{
    switch(role){
        case 'menu':
        case 'application':
        case 'tab':
        case 'menuitem':
        case 'treeitem':
        case 'gridcell':
            props['aria-expanded'] = state;
            return props;
        default:
            return props;
    }
};
function hasAccessibleName({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, title, children }) {
    if (ariaLabel || ariaLabelledBy || title) {
        return true;
    }
    const accessibleLabel = (0, _children.getTextFromChildren)(children);
    if (accessibleLabel.trim() !== '') {
        return true;
    }
    return false;
}
const getHorizontalFocusGoTo = (keys)=>{
    switch(keys){
        case Keys.ARROW_UP:
        case Keys.ARROW_LEFT:
            return 'prev';
        case Keys.ARROW_DOWN:
        case Keys.ARROW_RIGHT:
            return 'next';
    }
};

//# sourceMappingURL=accessibility.js.map