/**
    * @name ityped
    * @description Dead simple Animated Typing with no dependencies
    * @author Luis Vinícius
    * @email luisviniciusbarreto@gmail.com
    */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ityped = {})));
}(this, (function (exports) { 'use strict';

/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
var setProps = function setProps(_ref) {
  var _ref$strings = _ref.strings,
      strings = _ref$strings === undefined ? ['Put your strings here...', 'and Enjoy!'] : _ref$strings,
      _ref$typeSpeed = _ref.typeSpeed,
      typeSpeed = _ref$typeSpeed === undefined ? 100 : _ref$typeSpeed,
      _ref$backSpeed = _ref.backSpeed,
      backSpeed = _ref$backSpeed === undefined ? 50 : _ref$backSpeed,
      _ref$backDelay = _ref.backDelay,
      backDelay = _ref$backDelay === undefined ? 500 : _ref$backDelay,
      _ref$startDelay = _ref.startDelay,
      startDelay = _ref$startDelay === undefined ? 500 : _ref$startDelay,
      _ref$cursorChar = _ref.cursorChar,
      cursorChar = _ref$cursorChar === undefined ? '|' : _ref$cursorChar,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? false : _ref$placeholder,
      _ref$showCursor = _ref.showCursor,
      showCursor = _ref$showCursor === undefined ? true : _ref$showCursor,
      _ref$disableBackTypin = _ref.disableBackTyping,
      disableBackTyping = _ref$disableBackTypin === undefined ? false : _ref$disableBackTypin,
      _ref$onFinished = _ref.onFinished,
      onFinished = _ref$onFinished === undefined ? function () {} : _ref$onFinished,
      _ref$loop = _ref.loop,
      loop = _ref$loop === undefined ? true : _ref$loop;
  return {
    strings: strings,
    typeSpeed: typeSpeed,
    backSpeed: backSpeed,
    cursorChar: cursorChar,
    backDelay: backDelay,
    placeholder: placeholder,
    startDelay: startDelay,
    showCursor: showCursor,
    loop: loop,
    disableBackTyping: disableBackTyping,
    onFinished: onFinished
  };
};

var init = function init(element, properties) {
  var i = 0,
      l = void 0,
      STRINGS_TO_ITERATE = void 0;

  var typewrite = function typewrite(strings, props) {
    if (i === l) if (props.loop) i = 0;
    setTimeout(function () {
      typeString(strings[i], props);
    }, props.startDelay);
  };

  var typeString = function typeString(str, props) {
    var index = 0,
        strLen = str.length;
    var intervalID = setInterval(function () {
      props.placeholder ? element.placeholder += str[index] : element.textContent += str[index];
      if (++index === strLen) return onStringTyped(intervalID, props);
    }, props.typeSpeed);
  };

  var onStringTyped = function onStringTyped(id, props) {
    clearInterval(id);
    if (props.disableBackTyping && i === l - 1) {
      return props.onFinished();
    }
    if (!props.loop && i === l - 1) {
      return props.onFinished();
    }
    setTimeout(function () {
      return eraseString(props);
    }, props.backDelay);
  };

  var eraseString = function eraseString(props) {
    var str = props.placeholder ? element.placeholder : element.textContent,
        strLen = str.length;
    var intervalID = setInterval(function () {
      props.placeholder ? element.placeholder = element.placeholder.substr(0, --strLen) : element.textContent = str.substr(0, --strLen);
      if (strLen === 0) return onStringErased(intervalID, props);
    }, props.backSpeed);
  };

  var onStringErased = function onStringErased(id, props) {
    clearInterval(id);
    ++i;
    typewrite(STRINGS_TO_ITERATE, props);
  };

  var setCursor = function setCursor(element, props) {
    var cursorSpan = document.createElement('span');
    cursorSpan.classList.add('ityped-cursor');
    cursorSpan.textContent = '|';
    cursorSpan.textContent = props.cursorChar;
    element.insertAdjacentElement('afterend', cursorSpan);
  };

  var startTyping = function startTyping(prop) {
    var props = setProps(prop || {});
    var strings = props.strings;
    STRINGS_TO_ITERATE = strings;
    l = strings.length;
    if (typeof element === "string") element = document.querySelector(element);
    if (props.showCursor) setCursor(element, props);
    typewrite(strings, props);
  };

  return startTyping(properties);
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
