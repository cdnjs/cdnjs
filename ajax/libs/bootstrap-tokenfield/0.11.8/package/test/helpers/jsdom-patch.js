/**
 * Patch from zombie.js for jsdom https://github.com/assaf/zombie/blob/master/src/zombie/dom_focus.coffee
 *
 * Adds focus() and blur() methods and events to dom elements
 */

var FOCUS_ELEMENTS, HTML, elementType, setAttribute, setFocus, _i, _j, _len, _len1, _ref, _ref1;

HTML = require("jsdom").dom.level3.html;

FOCUS_ELEMENTS = ["INPUT", "SELECT", "TEXTAREA", "BUTTON", "ANCHOR"];

HTML.HTMLDocument.prototype.__defineGetter__("activeElement", function() {
  return this._inFocus || this.body;
});

setFocus = function(document, element) {
  var inFocus, onblur, onfocus;
  inFocus = document._inFocus;
  if (element !== inFocus) {
    if (inFocus) {
      onblur = document.createEvent("HTMLEvents");
      onblur.initEvent("blur", false, false);
      inFocus.dispatchEvent(onblur);
    }
    if (element) {
      onfocus = document.createEvent("HTMLEvents");
      onfocus.initEvent("focus", false, false);
      element.dispatchEvent(onfocus);
      document._inFocus = element;
    }
  }
};

HTML.HTMLElement.prototype.focus = function() {};

HTML.HTMLElement.prototype.blur = function() {};

_ref = [HTML.HTMLInputElement, HTML.HTMLSelectElement, HTML.HTMLTextAreaElement, HTML.HTMLButtonElement, HTML.HTMLAnchorElement];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  elementType = _ref[_i];
  elementType.prototype.focus = function() {
    return setFocus(this.ownerDocument, this);
  };
  elementType.prototype.blur = function() {
    return setFocus(this.ownerDocument, null);
  };
  setAttribute = elementType.prototype.setAttribute;
  elementType.prototype.setAttribute = function(name, value) {
    var document;
    setAttribute.call(this, name, value);
    if (name === "autofocus") {
      document = this.ownerDocument;
      if (~FOCUS_ELEMENTS.indexOf(this.tagName) && !document._inFocus) {
        return this.focus();
      }
    }
  };
}

_ref1 = [HTML.HTMLInputElement, HTML.HTMLTextAreaElement, HTML.HTMLSelectElement];
for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
  elementType = _ref1[_j];
  elementType.prototype._eventDefaults.focus = function(event) {
    var element;
    element = event.target;
    return element._focusValue = element.value || '';
  };
  elementType.prototype._eventDefaults.blur = function(event) {
    var change, element, focusValue;
    element = event.target;
    focusValue = element._focusValue;
    if (focusValue !== element.value) {
      change = element.ownerDocument.createEvent("HTMLEvents");
      change.initEvent("change", false, false);
      return element.dispatchEvent(change);
    }
  };
}
