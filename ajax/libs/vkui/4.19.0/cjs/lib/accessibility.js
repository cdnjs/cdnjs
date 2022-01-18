"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pressedKey = pressedKey;
exports.shouldTriggerClickOnEnterOrSpace = shouldTriggerClickOnEnterOrSpace;
exports.Keys = void 0;
var Keys;
exports.Keys = Keys;

(function (Keys) {
  Keys["ENTER"] = "Enter";
  Keys["SPACE"] = "Space";
  Keys["TAB"] = "Tab";
})(Keys || (exports.Keys = Keys = {}));

var ACCESSIBLE_KEYS = [{
  code: Keys.ENTER,
  key: ['Enter'],
  keyCode: 13
}, {
  code: Keys.SPACE,
  key: ['Space', 'Spacebar', ' '],
  keyCode: 32
}, {
  code: Keys.TAB,
  key: ['Tab'],
  keyCode: 9
}];

function pressedKey(e) {
  var _ACCESSIBLE_KEYS$find;

  return ((_ACCESSIBLE_KEYS$find = ACCESSIBLE_KEYS.find(function (_ref) {
    var key = _ref.key,
        keyCode = _ref.keyCode;
    return key.includes(e.key) || keyCode === e.keyCode;
  })) === null || _ACCESSIBLE_KEYS$find === void 0 ? void 0 : _ACCESSIBLE_KEYS$find.code) || null;
}

function shouldTriggerClickOnEnterOrSpace(e) {
  var el = e.target;
  var tagName = el.tagName;
  var role = el.getAttribute('role');
  var isValidKeyboardEventTarget = el.isContentEditable !== true && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && (role === 'button' || role === 'link');
  var isNativeAnchorEl = tagName === 'A' && el.hasAttribute('href');
  var keyPressed = pressedKey(e);
  return isValidKeyboardEventTarget && ( // trigger buttons on Space
  keyPressed === Keys.SPACE && role === 'button' || // trigger non-native links and buttons on Enter
  keyPressed === Keys.ENTER && !isNativeAnchorEl);
}
//# sourceMappingURL=accessibility.js.map