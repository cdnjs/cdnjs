/*!
 * HTMLLint (to be used in conjunction with HTMLMinifier)
 *
 * Copyright (c) 2010 Juriy "kangax" Zaytsev
 * Licensed under the MIT license.
 *
 */
 
(function(global){
  
  function isPresentationalElement(tag) {
    return (/^(?:b|i|big|small|hr|blink|marquee)$/).test(tag);
  }  
  function isDeprecatedElement(tag) {
    return (/^(?:applet|basefont|center|dir|font|isindex|menu|s|strike|u)$/).test(tag);
  }
  function isEventAttribute(attrName) {
    return (/^on[a-z]+/).test(attrName);
  }
  function isStyleAttribute(attrName) {
    return ('style' === attrName.toLowerCase());
  }
  function isDeprecatedAttribute(tag, attrName) {
    return (
      (attrName === 'align' && 
      (/^(?:caption|applet|iframe|img|imput|object|legend|table|hr|div|h[1-6]|p)$/).test(tag)) ||
      (attrName === 'alink' && tag === 'body') ||
      (attrName === 'alt' && tag === 'applet') ||
      (attrName === 'archive' && tag === 'applet') ||
      (attrName === 'background' && tag === 'body') ||
      (attrName === 'bgcolor' && (/^(?:table|t[rdh]|body)$/).test(tag)) ||
      (attrName === 'border' && (/^(?:img|object)$/).test(tag)) ||
      (attrName === 'clear' && tag === 'br') ||
      (attrName === 'code' && tag === 'applet') ||
      (attrName === 'codebase' && tag === 'applet') ||
      (attrName === 'color' && (/^(?:base(?:font)?)$/).test(tag)) ||
      (attrName === 'compact' && (/^(?:dir|[dou]l|menu)$/).test(tag)) ||
      (attrName === 'face' && (/^base(?:font)?$/).test(tag)) ||
      (attrName === 'height' && (/^(?:t[dh]|applet)$/).test(tag)) ||
      (attrName === 'hspace' && (/^(?:applet|img|object)$/).test(tag)) ||
      (attrName === 'language' && tag === 'script') ||
      (attrName === 'link' && tag === 'body') ||
      (attrName === 'name' && tag === 'applet') ||
      (attrName === 'noshade' && tag === 'hr') ||
      (attrName === 'nowrap' && (/^t[dh]$/).test(tag)) ||
      (attrName === 'object' && tag === 'applet') ||
      (attrName === 'prompt' && tag === 'isindex') ||
      (attrName === 'size' && (/^(?:hr|font|basefont)$/).test(tag)) ||
      (attrName === 'start' && tag === 'ol') ||
      (attrName === 'text' && tag === 'body') ||
      (attrName === 'type' && (/^(?:li|ol|ul)$/).test(tag)) ||
      (attrName === 'value' && tag === 'li') ||
      (attrName === 'version' && tag === 'html') ||
      (attrName === 'vlink' && tag === 'body') ||
      (attrName === 'vspace' && (/^(?:applet|img|object)$/).test(tag)) ||
      (attrName === 'width' && (/^(?:hr|td|th|applet|pre)$/).test(tag))
    );
  }
  function isInaccessibleAttribute(attrName, attrValue) {
    return (
      attrName === 'href' && 
      (/^\s*javascript\s*:\s*void\s*(\s+0|\(\s*0\s*\))\s*$/i).test(attrValue)
    );
  }
  
  function Lint() {
    this.log = [ ];
    this._lastElement = null;
    this._isElementRepeated = false;
  }
  
  Lint.prototype.testElement = function(tag) {
    if (isDeprecatedElement(tag)) {
      this.log.push(
        '<li>Found <span class="deprecated-element">deprecated</span> <strong><code>&lt;' + 
          tag + '&gt;</code></strong> element</li>');
    }
    else if (isPresentationalElement(tag)) {
      this.log.push(
        '<li>Found <span class="presentational-element">presentational</span> <strong><code>&lt;' + 
          tag + '&gt;</code></strong> element</li>');
    }
    else {
      this.checkRepeatingElement(tag);
    }
  };
  
  Lint.prototype.checkRepeatingElement = function(tag) {
    if (tag === 'br' && this._lastElement === 'br') {
      this._isElementRepeated = true;
    }
    else if (this._isElementRepeated) {
      this._reportRepeatingElement();
      this._isElementRepeated = false;
    }
    this._lastElement = tag;
  };
  
  Lint.prototype._reportRepeatingElement = function() {
    this.log.push('<li>Found <code>&lt;br></code> sequence. Try replacing it with styling.</li>');
  };
  
  Lint.prototype.testAttribute = function(tag, attrName, attrValue) {
    if (isEventAttribute(attrName)) {
      this.log.push(
        '<li>Found <span class="event-attribute">event attribute</span> (<strong>', 
        attrName, '</strong>) on <strong><code>&lt;' + tag + '&gt;</code></strong> element</li>');
    }
    else if (isDeprecatedAttribute(tag, attrName)) {
      this.log.push(
        '<li>Found <span class="deprecated-attribute">deprecated</span> <strong>' + 
          attrName + '</strong> attribute on <strong><code>&lt;', tag, '&gt;</code></strong> element</li>');
    }
    else if (isStyleAttribute(attrName)) {
      this.log.push(
        '<li>Found <span class="style-attribute">style attribute</span> on <strong><code>&lt;', tag, '&gt;</code></strong> element</li>');
    }
    else if (isInaccessibleAttribute(attrName, attrValue)) {
      this.log.push(
        '<li>Found <span class="inaccessible-attribute">inaccessible attribute</span> '+
          '(on <strong><code>&lt;', tag, '&gt;</code></strong> element)</li>');
    }
  };
  
  Lint.prototype.testChars = function(chars) {
    this._lastElement = '';
    if (/(&nbsp;\s*){2,}/.test(chars)) {
      this.log.push('<li>Found repeating <strong><code>&amp;nbsp;</code></strong> sequence. Try replacing it with styling.</li>');
    }
  };
  
  Lint.prototype.test = function(tag, attrName, attrValue) {
    this.testElement(tag);
    this.testAttribute(tag, attrName, attrValue);
  };
  
  Lint.prototype.populate = function(writeToElement) {
    if (this._isElementRepeated) {
      this._reportRepeatingElement();
    }
    var report;
    if (this.log.length && writeToElement) {
      report = '<ol>' + this.log.join('') + '</ol>';
      writeToElement.innerHTML = report;
    }
  };
  
  global.HTMLLint = Lint;
  
})(typeof exports === 'undefined' ? window : exports);