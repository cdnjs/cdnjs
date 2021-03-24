/**
* Tom Select v1.1.0
* Licensed under the Apache License, Version 2.0 (the "License");
*/

const KEY_A = 65;
const KEY_RETURN = 13;
const KEY_ESC = 27;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_TAB = 9;
const IS_MAC = /Mac/.test(navigator.userAgent);
const KEY_SHORTCUT = IS_MAC ? 'metaKey' : 'ctrlKey'; // ctrl key or apple key for ma

export { IS_MAC, KEY_A, KEY_BACKSPACE, KEY_DELETE, KEY_DOWN, KEY_ESC, KEY_LEFT, KEY_RETURN, KEY_RIGHT, KEY_SHORTCUT, KEY_TAB, KEY_UP };
//# sourceMappingURL=constants.js.map
