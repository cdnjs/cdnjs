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
    Keys["ENTER"] = 'Enter';
    Keys["SPACE"] = 'Space';
    Keys["TAB"] = 'Tab';
    Keys["ESCAPE"] = 'Escape';
    Keys["HOME"] = 'Home';
    Keys["END"] = 'End';
    Keys["ARROW_LEFT"] = 'ArrowLeft';
    Keys["ARROW_RIGHT"] = 'ArrowRight';
    Keys["ARROW_UP"] = 'ArrowUp';
    Keys["ARROW_DOWN"] = 'ArrowDown';
    Keys["PAGE_UP"] = 'PageUp';
    Keys["PAGE_DOWN"] = 'PageDown';
})(Keys || (Keys = {}));
const ACCESSIBLE_KEYS = [
    {
        code: Keys.ENTER,
        key: [
            'Enter'
        ],
        keyCode: 13
    },
    {
        code: Keys.SPACE,
        key: [
            'Space',
            'Spacebar',
            ' '
        ],
        keyCode: 32
    },
    {
        code: Keys.TAB,
        key: [
            'Tab'
        ],
        keyCode: 9
    },
    {
        code: Keys.ESCAPE,
        key: [
            'Escape'
        ],
        keyCode: 27
    },
    {
        code: Keys.HOME,
        key: [
            'Home'
        ],
        keyCode: 36
    },
    {
        code: Keys.END,
        key: [
            'End'
        ],
        keyCode: 35
    },
    {
        code: Keys.ARROW_LEFT,
        key: [
            'ArrowLeft'
        ],
        keyCode: 37
    },
    {
        code: Keys.ARROW_RIGHT,
        key: [
            'ArrowRight'
        ],
        keyCode: 39
    },
    {
        code: Keys.ARROW_UP,
        key: [
            'ArrowUp'
        ],
        keyCode: 40
    },
    {
        code: Keys.ARROW_DOWN,
        key: [
            'ArrowDown'
        ],
        keyCode: 40
    },
    {
        code: Keys.PAGE_UP,
        key: [
            'PageUp'
        ],
        keyCode: 40
    },
    {
        code: Keys.PAGE_DOWN,
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
    (keyPressed === Keys.SPACE && role === 'button' || // trigger non-native links and buttons on Enter
    keyPressed === Keys.ENTER && !isNativeAnchorEl);
}

//# sourceMappingURL=accessibility.js.map