/*
Copyright 2014, modulex-combobox@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:42:37 GMT
*/
modulex.add("combobox/multi-word", ["combobox"], function(require, exports, module) {
var combobox = require("combobox");
/*
combined modules:
combobox/multi-word
combobox/multi-word/cursor
*/
var comboboxMultiWordCursor, comboboxMultiWord;
comboboxMultiWordCursor = function (exports) {
  /**
   * @ignore
   * get cursor position of input
   * @author yiminghe@gmail.com
   */
  // from mentio
  function getTextAreaOrInputUnderlinePosition(element, position) {
    var properties = [
      'direction',
      'boxSizing',
      'width',
      'height',
      'overflowX',
      'overflowY',
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'fontStyle',
      'fontVariant',
      'fontWeight',
      'fontStretch',
      'fontSize',
      'fontSizeAdjust',
      'lineHeight',
      'fontFamily',
      'textAlign',
      'textTransform',
      'textIndent',
      'textDecoration',
      'letterSpacing',
      'wordSpacing'
    ];
    var isFirefox = window.mozInnerScreenX !== null;
    var div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);
    var style = div.style;
    var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
    style.whiteSpace = 'pre-wrap';
    if (element.nodeName !== 'INPUT') {
      style.wordWrap = 'break-word';
    }
    // position off-screen
    style.position = 'absolute';
    style.visibility = 'hidden';
    // transfer the element's properties to the div
    for (var i = 0; i < properties.length; i++) {
      var prop = properties[i];
      style[prop] = computed[prop];
    }
    if (isFirefox) {
      style.width = parseInt(computed.width) - 2 + 'px';
      if (element.scrollHeight > parseInt(computed.height)) {
        style.overflowY = 'scroll';
      }
    } else {
      style.overflow = 'hidden';
    }
    div.textContent = element.value.substring(0, position);
    if (element.nodeName === 'INPUT') {
      div.textContent = div.textContent.replace(/\s/g, '\xA0');
    }
    var span = document.createElement('span');
    span.textContent = element.value.substring(position) || '.';
    div.appendChild(span);
    var coordinates = {
      top: span.offsetTop + parseInt(computed.borderTopWidth) + span.offsetHeight,
      left: span.offsetLeft + parseInt(computed.borderLeftWidth)
    };
    var obj = element;
    do {
      coordinates.left += obj.offsetLeft;
      coordinates.top += obj.offsetTop;
    } while (obj = obj.offsetParent);
    document.body.removeChild(div);
    return coordinates;
  }
  exports = getTextAreaOrInputUnderlinePosition;
  return exports;
}();
comboboxMultiWord = function (exports) {
  var SUFFIX = 'suffix', rWhitespace = /\s|\xa0/;
  var getCursor = comboboxMultiWordCursor;
  var ComboBox = combobox;
  function strContainsChar(str, c) {
    return c && str.indexOf(c) !== -1;
  }
  function beforeVisibleChange(e) {
    if (e.newVal && e.target === this.get('menu')) {
      this.alignWithCursor();
    }
  }
  exports = ComboBox.extend({
    syncUI: function () {
      var self = this, menu;
      if (self.get('alignWithCursor')) {
        menu = self.get('menu');
        menu.setInternal('align', null);
        menu.on('beforeVisibleChange', beforeVisibleChange, this);
      }
    },
    getCurrentValue: function () {
      var self = this;
      var inputDesc = getInputDesc(self);
      var tokens = inputDesc.tokens, tokenIndex = inputDesc.tokenIndex, separator = self.get('separator'), separatorType = self.get('separatorType'), token = tokens[tokenIndex], l = token.length - 1;
      if (separatorType !== SUFFIX) {
        if (strContainsChar(separator, token.charAt(0))) {
          token = token.slice(1);
        } else {
          return undefined;
        }
      } else if (separatorType === SUFFIX && strContainsChar(separator, token.charAt(l))) {
        token = token.slice(0, l);
      }
      return token;
    },
    setCurrentValue: function (value, setCfg) {
      var self = this, input = self.get('input'), inputDesc = getInputDesc(self), tokens = inputDesc.tokens, tokenIndex = Math.max(0, inputDesc.tokenIndex), separator = self.get('separator'), cursorPosition, l, separatorType = self.get('separatorType'), nextToken = tokens[tokenIndex + 1] || '', token = tokens[tokenIndex];
      if (separatorType !== SUFFIX) {
        tokens[tokenIndex] = token.charAt(0) + value;
        if (value && !(nextToken && rWhitespace.test(nextToken.charAt(0)))) {
          tokens[tokenIndex] += ' ';
        }
      } else {
        tokens[tokenIndex] = value;
        l = token.length - 1;
        if (strContainsChar(separator, token.charAt(l))) {
          tokens[tokenIndex] += token.charAt(l);
        } else if (separator.length === 1) {
          tokens[tokenIndex] += separator;
        }
      }
      cursorPosition = tokens.slice(0, tokenIndex + 1).join('').length;
      self.set('value', tokens.join(''), setCfg);
      input.prop('selectionStart', cursorPosition);
      input.prop('selectionEnd', cursorPosition);
    },
    alignWithCursor: function () {
      var self = this;
      var menu = self.get('menu');
      var input = self.get('input');
      var inputDesc = getInputDesc(self);
      var cursorOffset = getCursor(input[0], inputDesc.tokens.slice(0, inputDesc.tokenIndex).join('').length + 1);
      menu.move(cursorOffset.left, cursorOffset.top);
    }
  }, {
    ATTRS: {
      separator: { value: ',;' },
      updateInputOnDownUp: { value: false },
      separatorType: { value: SUFFIX },
      literal: { value: '"' },
      alignWithCursor: {}
    },
    xclass: 'multi-value-combobox'
  });
  function getInputDesc(self) {
    var input = self.get('input'), inputVal = self.get('value'), tokens = [], cache = [], literal = self.get('literal'), separator = self.get('separator'), separatorType = self.get('separatorType'), inLiteral = false, allowWhitespaceAsStandaloneToken = separatorType !== SUFFIX, cursorPosition = input.prop('selectionStart'), i, c, tokenIndex = -1;
    for (i = 0; i < inputVal.length; i++) {
      c = inputVal.charAt(i);
      if (literal) {
        if (c === literal) {
          inLiteral = !inLiteral;
        }
      }
      if (inLiteral) {
        cache.push(c);
        continue;
      }
      if (i === cursorPosition) {
        tokenIndex = tokens.length;
      }
      if (allowWhitespaceAsStandaloneToken && rWhitespace.test(c)) {
        if (cache.length) {
          tokens.push(cache.join(''));
        }
        cache = [];
        cache.push(c);
      } else if (strContainsChar(separator, c)) {
        if (separatorType === SUFFIX) {
          cache.push(c);
          if (cache.length) {
            tokens.push(cache.join(''));
          }
          cache = [];
        } else {
          if (cache.length) {
            tokens.push(cache.join(''));
          }
          cache = [];
          cache.push(c);
        }
      } else {
        cache.push(c);
      }
    }
    if (cache.length) {
      tokens.push(cache.join(''));
    }
    if (!tokens.length) {
      tokens.push('');
    }
    if (tokenIndex === -1) {
      if (separatorType === SUFFIX && strContainsChar(separator, c)) {
        tokens.push('');
      }
      tokenIndex = tokens.length - 1;
    }
    return {
      tokens: tokens,
      cursorPosition: cursorPosition,
      tokenIndex: tokenIndex
    };
  }
  return exports;
}();
module.exports = comboboxMultiWord;
});