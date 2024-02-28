import * as React from 'react';
export const FOCUSABLE_ELEMENTS_LIST = [
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
export var Keys;
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
const ACCESSIBLE_KEYS = [
    {
        code: "Enter",
        key: [
            'Enter'
        ],
        keyCode: 13
    },
    {
        code: "Space",
        key: [
            'Space',
            'Spacebar',
            ' '
        ],
        keyCode: 32
    },
    {
        code: "Tab",
        key: [
            'Tab'
        ],
        keyCode: 9
    },
    {
        code: "Escape",
        key: [
            'Escape'
        ],
        keyCode: 27
    },
    {
        code: "Home",
        key: [
            'Home'
        ],
        keyCode: 36
    },
    {
        code: "End",
        key: [
            'End'
        ],
        keyCode: 35
    },
    {
        code: "ArrowLeft",
        key: [
            'ArrowLeft'
        ],
        keyCode: 37
    },
    {
        code: "ArrowRight",
        key: [
            'ArrowRight'
        ],
        keyCode: 39
    },
    {
        code: "ArrowUp",
        key: [
            'ArrowUp'
        ],
        keyCode: 40
    },
    {
        code: "ArrowDown",
        key: [
            'ArrowDown'
        ],
        keyCode: 40
    },
    {
        code: "PageUp",
        key: [
            'PageUp'
        ],
        keyCode: 40
    },
    {
        code: "PageDown",
        key: [
            'PageDown'
        ],
        keyCode: 40
    }
];
export function pressedKey(e) {
    return ACCESSIBLE_KEYS.find(({ key, keyCode })=>key.includes(e.key) || keyCode === e.keyCode)?.code || null;
}
export function shouldTriggerClickOnEnterOrSpace(e) {
    const el = e.target;
    const { tagName } = el;
    const role = el.getAttribute('role');
    const isValidKeyboardEventTarget = el.isContentEditable !== true && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && (role === 'button' || role === 'link');
    const isNativeAnchorEl = tagName === 'A' && el.hasAttribute('href');
    const keyPressed = pressedKey(e);
    return isValidKeyboardEventTarget && // trigger buttons on Space
    (keyPressed === "Space" && role === 'button' || // trigger non-native links and buttons on Enter
    keyPressed === "Enter" && !isNativeAnchorEl);
}

//# sourceMappingURL=accessibility.js.map