/*

#  EQCSS IE8 Polyfills
## version 1.7.1

This file contains optional polyfills to provide:
IE8 support to the EQCSS.js plugin

- github.com/eqcss/eqcss
- elementqueries.com

Authors: Tommy Hodgins, Maxime Euzière

License: MIT

*/

/*
 * addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
 * Forked from http://css-tricks.com/snippets/javascript/addeventlistner-polyfill/
 * Adds the native DOM2 function addEventListener on IE6 - 8.
 */

(function (win, doc) {

  // If the function already exists, no need to polyfill
  if (win.addEventListener) return;

  function docHijack(p) {
    var old = doc[p];
    doc[p] = function (v) {
      return addListen(old(v))
    }
  }
  function addEvent(on, fn, self) {
    return (self = this).attachEvent('on' + on, function(e) {
      var e = e || win.event;
      e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
      e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
      try {
        fn.call(self, e);
      }
      catch (e) {}
    });
  }
  function addListen(obj, i) {
    if (i = obj.length) while (i--) obj[i].addEventListener = addEvent;
    else obj.addEventListener = addEvent;
    return obj;
  }
  addListen([doc, win]);
  if ('Element' in win) win.Element.prototype.addEventListener = addEvent;      // IE8
  else{                                                                       // IE < 8
    doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});    // Make sure we also init at domReady
    docHijack('getElementsByTagName');
    docHijack('getElementById');
    docHijack('createElement');
    addListen(doc.all);
  }
})(window, document);

/*
 * getComputedStyle and getPropertyValue polyfill / Jonathan Neal / License CC0
 * Forked from: https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/getComputedStyle
 * Allows to measure a CSS property of any element on IE6-8.
 * Dimensions (width, height...) are converted and returned in pixels, like modern browsers do.
 */

(function(win) {

  // If the function already exists, no need to polyfill
  if (win.getComputedStyle) return;

  function getComputedStylePixel(element, property, fontSize) {
    // Internet Explorer sometimes struggles to read currentStyle until the element's document is accessed.
    var value = element.document && element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/) || [0, 0, ''],
        size = value[1],
        suffix = value[2],
        rootSize;

    fontSize = !fontSize ? fontSize : /%|em/.test(suffix) && element.parentElement ? getComputedStylePixel(element.parentElement, 'fontSize', null) : 16;
    rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

    return suffix == '%' ? size / 100 * rootSize :
           suffix == 'cm' ? size * 0.3937 * 96 :
           suffix == 'em' ? size * fontSize :
           suffix == 'in' ? size * 96 :
           suffix == 'mm' ? size * 0.3937 * 96 / 10 :
           suffix == 'pc' ? size * 12 * 96 / 72 :
           suffix == 'pt' ? size * 96 / 72 :
           size;
  }

  function setShortStyleProperty(style, property) {
    var borderSuffix = property == 'border' ? 'Width' : '',
        t = property + 'Top' + borderSuffix,
        r = property + 'Right' + borderSuffix,
        b = property + 'Bottom' + borderSuffix,
        l = property + 'Left' + borderSuffix;

    style[property] = (style[t] == style[r] && style[t] == style[b] && style[t] == style[l] ? [ style[t] ] :
                       style[t] == style[b] && style[l] == style[r] ? [ style[t], style[r] ] :
                       style[l] == style[r] ? [ style[t], style[r], style[b] ] :
                       [ style[t], style[r], style[b], style[l] ]).join(' ');
  }

  // <CSSStyleDeclaration>
  function CSSStyleDeclaration(element) {
    var style = this,
        currentStyle = element.currentStyle,
        fontSize = getComputedStylePixel(element, 'fontSize'),
        unCamelCase = function (match) {
          return '-' + match.toLowerCase();
        },
        property;

    for (property in currentStyle) {
      Array.prototype.push.call(style, property == 'styleFloat' ? 'float' : property.replace(/[A-Z]/, unCamelCase));

      if (property == 'width') {
        style[property] = element.offsetWidth + 'px';
      } else if (property == 'height') {
        style[property] = element.offsetHeight + 'px';
      } else if (property == 'styleFloat') {
        style.float = currentStyle[property];
      } else if (/margin.|padding.|border.+W/.test(property) && style[property] != 'auto') {
        style[property] = Math.round(getComputedStylePixel(element, property, fontSize)) + 'px';
      } else if (/^outline/.test(property)) {

        // errors on checking outline
        try {
          style[property] = currentStyle[property];
        } catch (error) {
          style.outlineColor = currentStyle.color;
          style.outlineStyle = style.outlineStyle || 'none';
          style.outlineWidth = style.outlineWidth || '0px';
          style.outline = [style.outlineColor, style.outlineWidth, style.outlineStyle].join(' ');
        }
      } else {
        style[property] = currentStyle[property];
      }
    }

    setShortStyleProperty(style, 'margin');
    setShortStyleProperty(style, 'padding');
    setShortStyleProperty(style, 'border');

    style.fontSize = Math.round(fontSize) + 'px';
  }

  CSSStyleDeclaration.prototype = {
    constructor: CSSStyleDeclaration,

    // <CSSStyleDeclaration>.getPropertyPriority
    getPropertyPriority: function () {
      throw new Error('NotSupportedError: DOM Exception 9');
    },

    // <CSSStyleDeclaration>.getPropertyValue
    getPropertyValue: function (property) {
      return this[property.replace(/-\w/g, function (match) {
        return match[1].toUpperCase();
      })];
    },

    // <CSSStyleDeclaration>.item
    item: function (index) {
      return this[index];
    },

    // <CSSStyleDeclaration>.removeProperty
    removeProperty: function () {
      throw new Error('NoModificationAllowedError: DOM Exception 7');
    },

    // <CSSStyleDeclaration>.setProperty
    setProperty: function () {
      throw new Error('NoModificationAllowedError: DOM Exception 7');
    },

    // <CSSStyleDeclaration>.getPropertyCSSValue
    getPropertyCSSValue: function () {
      throw new Error('NotSupportedError: DOM Exception 9');
    }
  };

  // <win>.getComputedStyle
  win.getComputedStyle = function getComputedStyle(element) {
    return new CSSStyleDeclaration(element);
  };
})(window);

/*
 * document.querySelector and querySelectorAll polyfill / Maxime Euzière / public domain
 * Forked from: http://xem.github.io/Lazy/
 * Adds basic DOM selection on IE6-8 (selection by tag, class or id only)
 */

(function(doc) {
  if (doc.querySelectorAll) return;

  doc.querySelectorAll = function(a) {
    if ("#" == a.charAt(0)) return [doc.getElementById(a.substr(1))];
    if ("." == a.charAt(0)) return doc.getElementsByClassName(a.substr(1));
    return doc.getElementsByTagName(a);
  }

  doc.querySelector = function(a) {
    return querySelectorAll(a)[0];
  }
})(document);

/*
 * textContent polyfill / Eli Grey / cc-by-nc 3.0 license
 * Forked from http://eligrey.com/blog/post/textcontent-in-ie8/
 * Adds textContent property to DOM elements in IE8
 */

(function() {
  if (Object.defineProperty
  && Object.getOwnPropertyDescriptor
  && Object.getOwnPropertyDescriptor(Element.prototype, "textContent")
  && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
    var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
    Object.defineProperty(Element.prototype, "textContent", {
      get: function() {
        return innerText.get.call(this)
      },
      set: function(x) {
        return innerText.set.call(this, x)
      }
    });
  }
})();