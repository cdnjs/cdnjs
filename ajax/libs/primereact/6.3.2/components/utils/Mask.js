"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mask = mask;

var _DomHandler = _interopRequireDefault(require("./DomHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mask(el, options) {
  var defaultOptions = {
    mask: null,
    slotChar: '_',
    autoClear: true,
    unmask: false,
    readOnly: false,
    onComplete: null,
    onChange: null,
    onFocus: null,
    onBlur: null
  };
  options = _objectSpread(_objectSpread({}, defaultOptions), options);
  var tests, partialPosition, len, firstNonMaskPos, defs, androidChrome, lastRequiredNonMaskPos, oldVal, focusText, caretTimeoutId, buffer, defaultBuffer;

  var caret = function caret(first, last) {
    var range, begin, end;

    if (!el.offsetParent || el !== document.activeElement) {
      return;
    }

    if (typeof first === 'number') {
      begin = first;
      end = typeof last === 'number' ? last : begin;

      if (el.setSelectionRange) {
        el.setSelectionRange(begin, end);
      } else if (el['createTextRange']) {
        range = el['createTextRange']();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', begin);
        range.select();
      }
    } else {
      if (el.setSelectionRange) {
        begin = el.selectionStart;
        end = el.selectionEnd;
      } else if (document['selection'] && document['selection'].createRange) {
        range = document['selection'].createRange();
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
      }

      return {
        begin: begin,
        end: end
      };
    }
  };

  var isCompleted = function isCompleted() {
    for (var i = firstNonMaskPos; i <= lastRequiredNonMaskPos; i++) {
      if (tests[i] && buffer[i] === getPlaceholder(i)) {
        return false;
      }
    }

    return true;
  };

  var getPlaceholder = function getPlaceholder(i) {
    if (i < options.slotChar.length) {
      return options.slotChar.charAt(i);
    }

    return options.slotChar.charAt(0);
  };

  var getValue = function getValue() {
    return options.unmask ? getUnmaskedValue() : el && el.value;
  };

  var seekNext = function seekNext(pos) {
    while (++pos < len && !tests[pos]) {
      ;
    }

    return pos;
  };

  var seekPrev = function seekPrev(pos) {
    while (--pos >= 0 && !tests[pos]) {
      ;
    }

    return pos;
  };

  var shiftL = function shiftL(begin, end) {
    var i, j;

    if (begin < 0) {
      return;
    }

    for (i = begin, j = seekNext(end); i < len; i++) {
      if (tests[i]) {
        if (j < len && tests[i].test(buffer[j])) {
          buffer[i] = buffer[j];
          buffer[j] = getPlaceholder(j);
        } else {
          break;
        }

        j = seekNext(j);
      }
    }

    writeBuffer();
    caret(Math.max(firstNonMaskPos, begin));
  };

  var shiftR = function shiftR(pos) {
    var i, c, j, t;

    for (i = pos, c = getPlaceholder(pos); i < len; i++) {
      if (tests[i]) {
        j = seekNext(i);
        t = buffer[i];
        buffer[i] = c;

        if (j < len && tests[j].test(t)) {
          c = t;
        } else {
          break;
        }
      }
    }
  };

  var handleAndroidInput = function handleAndroidInput(e) {
    var curVal = el.value;
    var pos = caret();

    if (oldVal && oldVal.length && oldVal.length > curVal.length) {
      // a deletion or backspace happened
      checkVal(true);

      while (pos.begin > 0 && !tests[pos.begin - 1]) {
        pos.begin--;
      }

      if (pos.begin === 0) {
        while (pos.begin < firstNonMaskPos && !tests[pos.begin]) {
          pos.begin++;
        }
      }

      caret(pos.begin, pos.begin);
    } else {
      checkVal(true);

      while (pos.begin < len && !tests[pos.begin]) {
        pos.begin++;
      }

      caret(pos.begin, pos.begin);
    }

    if (options.onComplete && isCompleted()) {
      options.onComplete({
        originalEvent: e,
        value: getValue()
      });
    }
  };

  var onBlur = function onBlur(e) {
    checkVal();
    updateModel(e);

    if (options.onBlur) {
      options.onBlur(e);
    }

    if (el.value !== focusText) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, false);
      el.dispatchEvent(event);
    }
  };

  var onKeyDown = function onKeyDown(e) {
    if (options.readOnly) {
      return;
    }

    var k = e.which || e.keyCode,
        pos,
        begin,
        end;
    var iPhone = /iphone/i.test(_DomHandler.default.getUserAgent());
    oldVal = el.value; //backspace, delete, and escape get special treatment

    if (k === 8 || k === 46 || iPhone && k === 127) {
      pos = caret();
      begin = pos.begin;
      end = pos.end;

      if (end - begin === 0) {
        begin = k !== 46 ? seekPrev(begin) : end = seekNext(begin - 1);
        end = k === 46 ? seekNext(end) : end;
      }

      clearBuffer(begin, end);
      shiftL(begin, end - 1);
      updateModel(e);
      e.preventDefault();
    } else if (k === 13) {
      // enter
      onBlur(e);
      updateModel(e);
    } else if (k === 27) {
      // escape
      el.value = focusText;
      caret(0, checkVal());
      updateModel(e);
      e.preventDefault();
    }
  };

  var onKeyPress = function onKeyPress(e) {
    if (options.readOnly) {
      return;
    }

    var k = e.which || e.keyCode,
        pos = caret(),
        p,
        c,
        next,
        completed;

    if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
      //Ignore
      return;
    } else if (k && k !== 13) {
      if (pos.end - pos.begin !== 0) {
        clearBuffer(pos.begin, pos.end);
        shiftL(pos.begin, pos.end - 1);
      }

      p = seekNext(pos.begin - 1);

      if (p < len) {
        c = String.fromCharCode(k);

        if (tests[p].test(c)) {
          shiftR(p);
          buffer[p] = c;
          writeBuffer();
          next = seekNext(p);

          if (/android/i.test(_DomHandler.default.getUserAgent())) {
            //Path for CSP Violation on FireFox OS 1.1
            var proxy = function proxy() {
              caret(next);
            };

            setTimeout(proxy, 0);
          } else {
            caret(next);
          }

          if (pos.begin <= lastRequiredNonMaskPos) {
            completed = isCompleted();
          }
        }
      }

      e.preventDefault();
    }

    updateModel(e);

    if (options.onComplete && completed) {
      options.onComplete({
        originalEvent: e,
        value: getValue()
      });
    }
  };

  var clearBuffer = function clearBuffer(start, end) {
    var i;

    for (i = start; i < end && i < len; i++) {
      if (tests[i]) {
        buffer[i] = getPlaceholder(i);
      }
    }
  };

  var writeBuffer = function writeBuffer() {
    el.value = buffer.join('');
  };

  var checkVal = function checkVal(allow) {
    //try to place characters where they belong
    var test = el.value,
        lastMatch = -1,
        i,
        c,
        pos;

    for (i = 0, pos = 0; i < len; i++) {
      if (tests[i]) {
        buffer[i] = getPlaceholder(i);

        while (pos++ < test.length) {
          c = test.charAt(pos - 1);

          if (tests[i].test(c)) {
            buffer[i] = c;
            lastMatch = i;
            break;
          }
        }

        if (pos > test.length) {
          clearBuffer(i + 1, len);
          break;
        }
      } else {
        if (buffer[i] === test.charAt(pos)) {
          pos++;
        }

        if (i < partialPosition) {
          lastMatch = i;
        }
      }
    }

    if (allow) {
      writeBuffer();
    } else if (lastMatch + 1 < partialPosition) {
      if (options.autoClear || buffer.join('') === defaultBuffer) {
        // Invalid value. Remove it and replace it with the
        // mask, which is the default behavior.
        if (el.value) el.value = '';
        clearBuffer(0, len);
      } else {
        // Invalid value, but we opt to show the value to the
        // user and allow them to correct their mistake.
        writeBuffer();
      }
    } else {
      writeBuffer();
      el.value = el.value.substring(0, lastMatch + 1);
    }

    return partialPosition ? i : firstNonMaskPos;
  };

  var onFocus = function onFocus(e) {
    if (options.readOnly) {
      return;
    }

    clearTimeout(caretTimeoutId);
    var pos;
    focusText = el.value;
    pos = checkVal();
    caretTimeoutId = setTimeout(function () {
      if (el !== document.activeElement) {
        return;
      }

      writeBuffer();

      if (pos === options.mask.replace("?", "").length) {
        caret(0, pos);
      } else {
        caret(pos);
      }
    }, 10);

    if (options.onFocus) {
      options.onFocus(e);
    }
  };

  var onInput = function onInput(event) {
    if (androidChrome) handleAndroidInput(event);else handleInputChange(event);
  };

  var handleInputChange = function handleInputChange(e) {
    if (options.readOnly) {
      return;
    }

    var pos = checkVal(true);
    caret(pos);
    updateModel(e);

    if (options.onComplete && isCompleted()) {
      options.onComplete({
        originalEvent: e,
        value: getValue()
      });
    }
  };

  var getUnmaskedValue = function getUnmaskedValue() {
    var unmaskedBuffer = [];

    for (var i = 0; i < buffer.length; i++) {
      var c = buffer[i];

      if (tests[i] && c !== getPlaceholder(i)) {
        unmaskedBuffer.push(c);
      }
    }

    return unmaskedBuffer.join('');
  };

  var updateModel = function updateModel(e) {
    if (options.onChange) {
      var val = getValue().replace(options.slotChar, '');
      options.onChange({
        originalEvent: e,
        value: defaultBuffer !== val ? val : ''
      });
    }
  };

  var bindEvents = function bindEvents() {
    el.addEventListener('focus', onFocus);
    el.addEventListener('blur', onBlur);
    el.addEventListener('keydown', onKeyDown);
    el.addEventListener('keypress', onKeyPress);
    el.addEventListener('input', onInput);
    el.addEventListener('paste', handleInputChange);
  };

  var unbindEvents = function unbindEvents() {
    el.removeEventListener('focus', onFocus);
    el.removeEventListener('blur', onBlur);
    el.removeEventListener('keydown', onKeyDown);
    el.removeEventListener('keypress', onKeyPress);
    el.removeEventListener('input', onInput);
    el.removeEventListener('paste', handleInputChange);
  };

  var init = function init() {
    tests = [];
    partialPosition = options.mask.length;
    len = options.mask.length;
    firstNonMaskPos = null;
    defs = {
      '9': '[0-9]',
      'a': '[A-Za-z]',
      '*': '[A-Za-z0-9]'
    };

    var ua = _DomHandler.default.getUserAgent();

    androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
    var maskTokens = options.mask.split('');

    for (var i = 0; i < maskTokens.length; i++) {
      var c = maskTokens[i];

      if (c === '?') {
        len--;
        partialPosition = i;
      } else if (defs[c]) {
        tests.push(new RegExp(defs[c]));

        if (firstNonMaskPos === null) {
          firstNonMaskPos = tests.length - 1;
        }

        if (i < partialPosition) {
          lastRequiredNonMaskPos = tests.length - 1;
        }
      } else {
        tests.push(null);
      }
    }

    buffer = [];

    for (var _i = 0; _i < maskTokens.length; _i++) {
      var _c = maskTokens[_i];

      if (_c !== '?') {
        if (defs[_c]) buffer.push(getPlaceholder(_i));else buffer.push(_c);
      }
    }

    defaultBuffer = buffer.join('');
  };

  if (el && options.mask) {
    init();
    bindEvents();
  }

  return {
    init: init,
    bindEvents: bindEvents,
    unbindEvents: unbindEvents,
    updateModel: updateModel,
    getValue: getValue
  };
}