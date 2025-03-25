export const KEY_A = 65;
export const KEY_RETURN = 13;
export const KEY_ESC = 27;
export const KEY_LEFT = 37;
export const KEY_UP = 38;
export const KEY_RIGHT = 39;
export const KEY_DOWN = 40;
export const KEY_BACKSPACE = 8;
export const KEY_DELETE = 46;
export const KEY_TAB = 9;
export const IS_MAC = typeof navigator === 'undefined' ? false : /Mac/.test(navigator.userAgent);
export const KEY_SHORTCUT = IS_MAC ? 'metaKey' : 'ctrlKey'; // ctrl key or apple key for ma
//# sourceMappingURL=constants.js.map