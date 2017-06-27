(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var dom;

  dom = {
    matches: function(node, selector) {
      return node.webkitMatchesSelector(selector);
    },
    all: function(selector, scope) {
      if (scope == null) {
        scope = document;
      }
      return Array.prototype.slice.apply(scope.querySelectorAll(selector));
    },
    one: function(selector, scope) {
      if (scope == null) {
        scope = document;
      }
      return scope.querySelector(selector);
    },
    closest: function(node, selector) {
      while (node !== document) {
        if (node.webkitMatchesSelector(selector)) {
          return node;
        }
        node = node.parentNode;
      }
    },
    children: function(node, selector) {
      if (selector == null) {
        selector = '*';
      }
      return Array.prototype.slice.apply(node.children).filter(function(child) {
        return child.webkitMatchesSelector(selector);
      });
    },
    find: function(node, selector) {
      return this.one(selector, node);
    },
    docDefer: function(selector, eventName, handler) {
      return document.addEventListener(eventName, function(event) {
        if (event.target.webkitMatchesSelector(selector)) {
          return handler(event);
        }
      });
    },
    trigger: function(eventName, node) {
      var event;
      event = new CustomEvent(eventName);
      console.log(event);
      return node.dispatchEvent(event);
    }
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = dom;
  } else {
    window.dom = dom;
  }

}).call(this);

},{}],2:[function(require,module,exports){
(function() {
  var obj;

  obj = {
    merge: function(dest, source) {
      var key, value;
      for (key in source) {
        value = source[key];
        Object.defineProperty(dest, key, {
          value: value,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
      return dest;
    },
    clone: function(obj) {
      var key, newObj, val;
      if ((typeof obj !== "object") || (obj instanceof RegExp)) {
        return obj;
      }
      newObj = {};
      for (key in obj) {
        val = obj[key];
        newObj[key] = this.clone(val);
      }
      return newObj;
    }
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = obj;
  } else {
    window.obj = obj;
  }

}).call(this);

},{}],3:[function(require,module,exports){
var ATTR_ANCHOR_ID, ATTR_FOOTNOTE_IDENTIFIER, ATTR_FOOTNOTE_NUMBER, Bigfoot, CLASS_BUTTON, CLASS_FOOTNOTE_HIDE_WHEN_PRINTING, CLASS_POPOVER, CLASS_PRINT_ONLY, DEFAULTS, ORIGINAL_FOOTNOTE_ACTION_HIDE, ORIGINAL_FOOTNOTE_ACTION_IGNORE, ORIGINAL_FOOTNOTE_ACTION_REMOVE, Poptart, applyFootnoteIDsAndNumbers, cleanFootnoteContent, cleanSelector, createButtons, dom, getFootnoteAnchors, hideNodeAppropriately, init, initPopover, obj, preventScroll, processFootnotes, removeEmptyFootnoteContainers, replaceTemplateVariable, replaceWithReferenceAttributes,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

obj = require("bigfoot-obj");

dom = require("bigfoot-dom");

Poptart = require("../../../poptart/src/coffee/poptart.coffee");

CLASS_PRINT_ONLY = "bigfoot-footnote__helper--print-only";

CLASS_FOOTNOTE_HIDE_WHEN_PRINTING = "bigfoot-footnote__helper--hide-when-printing";

CLASS_POPOVER = "bigfoot-footnote";

CLASS_BUTTON = "bigfoot-footnote__button";

ATTR_FOOTNOTE_IDENTIFIER = "data-footnote-id";

ATTR_FOOTNOTE_NUMBER = "data-footnote-number";

ATTR_ANCHOR_ID = "data-footnote-anchor-id";

ORIGINAL_FOOTNOTE_ACTION_HIDE = "hide";

ORIGINAL_FOOTNOTE_ACTION_REMOVE = "remove";

ORIGINAL_FOOTNOTE_ACTION_IGNORE = "ignore";

DEFAULTS = {
  actionOnOriginalFootnotes: ORIGINAL_FOOTNOTE_ACTION_HIDE,
  activateCallback: function() {},
  anchorPattern: /(?:fn|footnote|note)[:\-_\d]+/gi,
  anchorParentTagname: 'sup',
  breakpoints: {},
  footnoteParentClass: 'footnote',
  numberResetSelector: void 0,
  positionContent: true,
  preventPageScroll: true,
  scope: void 0,
  useFootnoteOnlyOnce: true,
  popoverMarkup: "<aside class=\"" + CLASS_POPOVER + " is-positioned-bottom\" data-footnote-number=\"{{FOOTNOTE_NUM}}\" data-footnote-identifier=\"{{FOOTNOTE_ID}}\" alt=\"Footnote {{FOOTNOTE_NUM}}\"> <div class=\"bigfoot-footnote__wrapper\"> <div class=\"bigfoot-footnote__content\"> {{FOOTNOTE_CONTENT}} </div></div> <div class=\"bigfoot-footnote__tooltip\"></div> </aside>",
  buttonMarkup: "<div class='bigfoot-footnote__container'> <button class=\"bigfoot-footnote__button\" id=\"{{ANCHOR::id}}\" " + ATTR_FOOTNOTE_NUMBER + "=\"{{FOOTNOTE_NUM}}\" " + ATTR_FOOTNOTE_IDENTIFIER + "=\"{{FOOTNOTE_ID}}\" alt=\"See Footnote {{FOOTNOTE_NUM}}\" rel=\"footnote\"> <svg class=\"bigfoot-footnote__button__circle\" viewbox=\"0 0 6 6\" preserveAspectRatio=\"xMinYMin\"><circle r=\"3\" cx=\"3\" cy=\"3\" fill=\"white\"></circle></svg> <svg class=\"bigfoot-footnote__button__circle\" viewbox=\"0 0 6 6\" preserveAspectRatio=\"xMinYMin\"><circle r=\"3\" cx=\"3\" cy=\"3\" fill=\"white\"></circle></svg> <svg class=\"bigfoot-footnote__button__circle\" viewbox=\"0 0 6 6\" preserveAspectRatio=\"xMinYMin\"><circle r=\"3\" cx=\"3\" cy=\"3\" fill=\"white\"></circle></svg> </button></div>"
};

replaceWithReferenceAttributes = function(string, referenceKeyword, reference) {
  var refRegex;
  refRegex = new RegExp("\\{\\{" + referenceKeyword + ":+\\s*([^\\}]*)\\}\\}", "g");
  return string.replace(refRegex, function(match, attr) {
    if (!reference.node) {
      return "";
    } else if (attr === "id" && referenceKeyword === "ANCHOR") {
      return reference.anchorID;
    } else {
      return reference.node.getAttribute(attr) || "";
    }
  });
};

removeEmptyFootnoteContainers = function(node, actionOnOriginalFootnotes) {
  var parentNode, unhiddenChildren, unhiddenRules;
  unhiddenChildren = dom.children(node, ":not(." + CLASS_PRINT_ONLY + ")");
  parentNode = node.parentNode;
  if (node.webkitMatchesSelector(":empty") || unhiddenChildren.length === 0) {
    hideNodeAppropriately(node, actionOnOriginalFootnotes);
    return removeEmptyFootnoteContainers(parentNode, actionOnOriginalFootnotes);
  } else {
    unhiddenRules = unhiddenChildren.filter(function(el) {
      return el.webkitMatchesSelector("hr:not(." + CLASS_PRINT_ONLY + ")");
    });
    if (unhiddenChildren.length === unhiddenRules.length) {
      hideNodeAppropriately(unhiddenRules, actionOnOriginalFootnotes);
      hideNodeAppropriately(node, actionOnOriginalFootnotes);
      return removeEmptyFootnoteContainers(parentNode, actionOnOriginalFootnotes);
    }
  }
};

hideNodeAppropriately = (function() {
  var hideAction;
  hideAction = function(node, actionOnOriginalFootnotes) {
    if (actionOnOriginalFootnotes === ORIGINAL_FOOTNOTE_ACTION_HIDE) {
      return node.classList.add(CLASS_PRINT_ONLY);
    } else if (actionOnOriginalFootnotes === ORIGINAL_FOOTNOTE_ACTION_REMOVE) {
      return node.parentNode.removeChild(node);
    }
  };
  return function(nodes, actionOnOriginalFootnotes) {
    if (nodes.forEach) {
      return nodes.forEach(function(node) {
        return hideAction(node, actionOnOriginalFootnotes);
      });
    } else {
      return hideAction(nodes, actionOnOriginalFootnotes);
    }
  };
})();

replaceTemplateVariable = function(string, variable, replacement) {
  return string.replace(new RegExp("\\{\\{" + variable + "\\}\\}", "g"), replacement);
};

cleanSelector = function(selector) {
  return selector.replace(/[:.+~*\]\[]/g, "\\$&");
};

cleanFootnoteContent = function(content, backlinkID) {
  var backlinkRegex;
  if (backlinkID.indexOf(' ') >= 0) {
    backlinkID = backlinkID.replace(/\s+/g, "|").replace(/(.*)/g, "($1)");
  }
  backlinkRegex = new RegExp("(\\s|&nbsp;)*<\\s*a[^#<]*#" + backlinkID + "[^>]*>(.*?)<\\s*/\\s*a>", "g");
  content = content.trim().replace(backlinkRegex, "").replace("[]", "");
  if (content.indexOf("<") !== 0) {
    content = "<p>" + content + "</p>";
  }
  return content;
};

getFootnoteAnchors = function(settings) {
  var footnoteAnchors, footnoteIDsClaimedByValidLinks;
  footnoteAnchors = settings.scope ? dom.all(settings.scope).reduce(function(anchors, scope) {
    return anchors.concat(dom.all("a[href*='#']", scope));
  }, []) : dom.all("a[href*='#']");
  footnoteIDsClaimedByValidLinks = [];
  footnoteAnchors = footnoteAnchors.filter(function(node) {
    var fnID, validAnchor;
    if (settings.useFootnoteOnlyOnce) {
      fnID = cleanSelector("" + (node.getAttribute("href").split("#")[1]));
    }
    validAnchor = !(node.getAttribute(ATTR_ANCHOR_ID)) && (node.getAttribute("href").match(settings.anchorPattern) || node.getAttribute("rel") === "footnote") && (!settings.useFootnoteOnlyOnce || footnoteIDsClaimedByValidLinks.indexOf(fnID) < 0) && !dom.closest(node, "[class*=" + settings.footnoteParentClass + "]:not(a):not(" + settings.anchorParentTagname + ")");
    if (validAnchor && settings.useFootnoteOnlyOnce) {
      footnoteIDsClaimedByValidLinks.push(fnID);
    }
    return validAnchor;
  });
  return footnoteAnchors.map(function(node) {
    var anchor, anchorID, child, fnID, footnote, parent;
    parent = dom.closest(node, settings.anchorParentTagname);
    child = dom.find(node, settings.anchorParentTagname);
    fnID = cleanSelector("" + (node.getAttribute("href").split("#")[1]));
    anchorID = ("" + ((parent && parent.id) || '') + " " + ((child && child.id) || '') + " " + (node.id || '')).trim().replace(/\s+/, ' ');
    node.setAttribute(ATTR_ANCHOR_ID, anchorID);
    [parent, node, child].forEach(function(el) {
      if (!el) {
        return;
      }
      return el.id = el.id.split(' ').map(function(id) {
        return "" + id + "--bigfoot-footnote-anchor";
      }).join(' ');
    });
    anchor = {
      insertBefore: parent || node,
      node: node,
      anchorID: anchorID,
      footnoteID: fnID
    };
    if (settings.actionOnOriginalFootnotes === ORIGINAL_FOOTNOTE_ACTION_REMOVE) {
      footnote = document.querySelector("#" + fnID);
      if (footnote) {
        anchor.content = cleanFootnoteContent(footnote.innerHTML, anchorID);
      }
    }
    return anchor;
  });
};

applyFootnoteIDsAndNumbers = function(anchors, numberResetSelector) {
  var closestResetElement, currentLastFootnoteLink, footnoteID, footnoteNumber, lastResetElement, _ref;
  closestResetElement = lastResetElement = void 0;
  currentLastFootnoteLink = dom.all("[" + ATTR_FOOTNOTE_IDENTIFIER + "]");
  currentLastFootnoteLink = currentLastFootnoteLink[currentLastFootnoteLink.length - 1];
  _ref = currentLastFootnoteLink ? [+currentLastFootnoteLink.getAttribute(ATTR_FOOTNOTE_IDENTIFIER), +currentLastFootnoteLink.getAttribute(ATTR_FOOTNOTE_NUMBER)] : [0, 0], footnoteID = _ref[0], footnoteNumber = _ref[1];
  return anchors.forEach(function(anchor) {
    footnoteID += 1;
    if (numberResetSelector) {
      closestResetElement = dom.closest(anchor.node, numberResetSelector);
      footnoteNumber = closestResetElement === lastResetElement ? footnoteNumber + 1 : 1;
      lastResetElement = closestResetElement;
    } else {
      footnoteNumber = footnoteID;
    }
    anchor.number = footnoteNumber;
    return anchor.id = footnoteID;
  });
};

createButtons = function(anchors, buttonTemplate) {
  return anchors.forEach(function(anchor) {
    var footnoteButton;
    footnoteButton = buttonTemplate;
    footnoteButton = replaceTemplateVariable(footnoteButton, "FOOTNOTE_NUM", anchor.number);
    footnoteButton = replaceTemplateVariable(footnoteButton, "FOOTNOTE_ID", anchor.id);
    footnoteButton = replaceWithReferenceAttributes(footnoteButton, "ANCHOR", anchor);
    footnoteButton = replaceWithReferenceAttributes(footnoteButton, "FOOTNOTE", {
      node: document.getElementById(anchor.footnoteID)
    });
    anchor.insertBefore.insertAdjacentHTML("beforebegin", footnoteButton);
    return anchor.button = anchor.insertBefore.previousSibling;
  });
};

processFootnotes = function(anchors, actionOnOriginalFootnotes) {
  return anchors.forEach(function(anchor) {
    var footnote, link, parentNode, _ref;
    _ref = [document.querySelector("#" + anchor.footnoteID), anchor.insertBefore], footnote = _ref[0], link = _ref[1];
    if (footnote != null) {
      parentNode = footnote.parentNode;
      hideNodeAppropriately(footnote, actionOnOriginalFootnotes);
      removeEmptyFootnoteContainers(parentNode, actionOnOriginalFootnotes);
    }
    link.classList.add(CLASS_PRINT_ONLY);
    return hideNodeAppropriately(link, actionOnOriginalFootnotes);
  });
};

preventScroll = function(event) {
  var content, delta, height, popover, prevent, scrollHeight, scrollTop, up, _ref;
  content = dom.closest(event.target, ".bigfoot-footnote__content");
  popover = dom.closest(content, "." + CLASS_POPOVER);
  _ref = [content.offsetHeight, content.scrollHeight, content.scrollTop], height = _ref[0], scrollHeight = _ref[1], scrollTop = _ref[2];
  if (scrollTop > 0 && scrollTop < 10) {
    popover.classList.add("is-scrollable");
  }
  if (!popover.classList.contains("is-scrollable")) {
    return;
  }
  delta = event.deltaY;
  up = delta < 0;
  prevent = function() {
    event.stopPropagation();
    event.preventDefault();
    event.returnValue = false;
    return false;
  };
  console.log(-delta, scrollHeight - height - scrollTop);
  if (!up && delta > scrollHeight - height - scrollTop) {
    content.scrollTop = scrollHeight;
    popover.classList.add("is-fully-scrolled");
    return prevent();
  } else if (up && -delta > scrollTop) {
    content.scrollTop = 0;
    popover.classList.remove("is-fully-scrolled");
    return prevent();
  } else {
    return popover.classList.remove("is-fully-scrolled");
  }
};

initPopover = function(popover, preventPageScroll) {
  var content;
  content = dom.find(popover, ".bigfoot-footnote__content");
  if (content.scrollHeight > content.offsetHeight) {
    popover.classList.add("is-scrollable");
  }
  if (preventPageScroll) {
    return content.addEventListener("wheel", preventScroll);
  }
};

init = function() {
  var options;
  this.footnoteAnchors = getFootnoteAnchors(this.settings);
  applyFootnoteIDsAndNumbers(this.footnoteAnchors, this.settings.numberResetSelector);
  createButtons(this.footnoteAnchors, this.settings.buttonMarkup);
  processFootnotes(this.footnoteAnchors, this.settings.actionOnOriginalFootnotes);
  options = {
    activeClass: "bigfoot-footnote--is-active",
    inactiveClass: null,
    activeSourceClass: "bigfoot-footnote__button--is-active",
    inactiveSourceClass: null,
    contentSelector: ".bigfoot-footnote__content",
    contentWrapperSelector: ".bigfoot-footnote__wrapper",
    tooltipSelector: ".bigfoot-footnote__tooltip"
  };
  Poptart.registerPopover("." + CLASS_BUTTON, options, this.popoverMarkupFor);
  dom.docDefer("." + CLASS_POPOVER, Poptart.EVENTS.STARTED_ACTIVATING, (function(_this) {
    return function(event) {
      return initPopover(event.target, _this.settings.preventPageScroll);
    };
  })(this));
};

Bigfoot = (function() {
  function Bigfoot(options) {
    this.popoverMarkupFor = __bind(this.popoverMarkupFor, this);
    var setup, _ref;
    this.settings = obj.merge(obj.clone(DEFAULTS), options);
    setup = init.bind(this);
    if ((_ref = document.readyState) === "complete" || _ref === "interactive") {
      setup();
    } else {
      document.addEventListener("DOMContentLoaded", setup);
    }
  }

  Bigfoot.prototype.popoverMarkupFor = function(target) {
    var anchor, button, footnote, footnoteContent, markup;
    anchor = this.footnoteAnchors[+target.getAttribute(ATTR_FOOTNOTE_IDENTIFIER) - 1];
    if (anchor.popoverMarkup != null) {
      return anchor.popoverMarkup;
    }
    footnoteContent = anchor.content ? anchor.content : (footnote = document.querySelector("#" + anchor.footnoteID), footnote ? cleanFootnoteContent(footnote.innerHTML, anchor.anchorID) : void 0);
    markup = replaceTemplateVariable(this.settings.popoverMarkup, "FOOTNOTE_NUM", anchor.number);
    markup = replaceTemplateVariable(markup, "FOOTNOTE_ID", anchor.id);
    markup = replaceTemplateVariable(markup, "FOOTNOTE_CONTENT", footnoteContent);
    button = anchor.button.classList.contains(CLASS_BUTTON) ? anchor.button : dom.find(anchor.button, "." + CLASS_BUTTON);
    markup = replaceWithReferenceAttributes(markup, "BUTTON", {
      node: button
    });
    anchor.popoverMarkup = markup;
    return markup;
  };

  Bigfoot.prototype.activatePopover = function(selector) {
    var button;
    button = typeof selector === "string" ? dom.one(selector) : selector instanceof HTMLElement ? selector : selector[0];
    return Poptart.triggerPopoverFor(button);
  };

  Bigfoot.prototype.teardown = function() {
    return this.footnoteAnchors.forEach(function(anchor) {
      var _ref;
      anchor.node.id = anchor.node.getAttribute(ATTR_ANCHOR_ID);
      anchor.node.setAttribute(ATTR_ANCHOR_ID, "");
      anchor.node.setAttribute(ATTR_FOOTNOTE_IDENTIFIER, "");
      anchor.node.setAttribute(ATTR_FOOTNOTE_NUMBER, "");
      anchor.node.classList.remove(CLASS_PRINT_ONLY);
      if ((_ref = document.querySelector("#" + anchor.footnoteID)) != null) {
        _ref.classList.remove(CLASS_PRINT_ONLY);
      }
      return anchor.insertBefore.parentNode.removeChild(anchor.insertBefore.previousSibling);
    });
  };

  return Bigfoot;

})();

Bigfoot.CLASSES = {
  PRINT_ONLY: CLASS_PRINT_ONLY,
  BUTTON: CLASS_BUTTON,
  POPOVER: CLASS_POPOVER
};

Bigfoot.STATES = {
  BUTTON: {
    IS_ACTIVE: "bigfoot-footnote__button--is-active"
  },
  POPOVER: {
    IS_ACTIVE: "bigfoot-footnote--is-active"
  }
};

Bigfoot.ATTR = {
  FOOTNOTE_ID: ATTR_FOOTNOTE_IDENTIFIER,
  FOOTNOTE_NUMBER: ATTR_FOOTNOTE_NUMBER,
  ANCHOR_ID: ATTR_ANCHOR_ID
};

Bigfoot.ORIGINAL_FOOTNOTE_ACTIONS = {
  HIDE: ORIGINAL_FOOTNOTE_ACTION_HIDE,
  REMOVE: ORIGINAL_FOOTNOTE_ACTION_REMOVE,
  IGNORE: ORIGINAL_FOOTNOTE_ACTION_IGNORE
};

module.exports = Bigfoot;



},{"../../../poptart/src/coffee/poptart.coffee":7,"bigfoot-dom":1,"bigfoot-obj":2}],4:[function(require,module,exports){
window.Bigfoot = require("./bigfoot.coffee");



},{"./bigfoot.coffee":3}],5:[function(require,module,exports){
(function() {
  var dom;

  dom = {
    matches: function(node, selector) {
      return node.webkitMatchesSelector(selector);
    },
    all: function(selector, scope) {
      if (scope == null) {
        scope = document;
      }
      return Array.prototype.slice.apply(scope.querySelectorAll(selector));
    },
    one: function(selector, scope) {
      if (scope == null) {
        scope = document;
      }
      return scope.querySelector(selector);
    },
    closest: function(node, selector) {
      while (node !== document) {
        if (node.webkitMatchesSelector(selector)) {
          return node;
        }
        node = node.parentNode;
      }
    },
    children: function(node, selector) {
      if (selector == null) {
        selector = '*';
      }
      return Array.prototype.slice.apply(node.children).filter(function(child) {
        return child.webkitMatchesSelector(selector);
      });
    },
    find: function(node, selector) {
      return this.one(selector, node);
    },
    docDefer: function(selector, eventName, handler) {
      return document.addEventListener(eventName, function(event) {
        if (event.target.webkitMatchesSelector(selector)) {
          return handler(event);
        }
      });
    },
    trigger: function(eventName, node) {
      var event;
      event = new CustomEvent(eventName, { bubbles: true });
      return node.dispatchEvent(event);
    }
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = dom;
  } else {
    window.dom = dom;
  }

}).call(this);

},{}],6:[function(require,module,exports){
module.exports=require(2)
},{"/Users/chris/Dropbox (Personal)/Code/web/bigfoot/bigfoot/node_modules/bigfoot-obj/dist/obj.js":2}],7:[function(require,module,exports){
var ATTR_CSS_MAX_HEIGHT, ATTR_CSS_MAX_WIDTH, DEFAULTS, EVENTS, POSITIONS, Poptart, activePopover, availableSpace, baseFontSize, calculateMaxWidthPixelDimension, calculatePixelDimension, clickHandler, dom, nodeIsDescendantOfNode, nodeIsPopoverDescendant, nodeIsSourceDescendant, obj, oppositeOf, popoverPositioner, positionPopovers, positionTooltip, registeredSelectors, removePopovers, setPopoverHeight, setPopoverWidth, triggerPopover;

obj = require("bigfoot-obj");

dom = require("bigfoot-dom");

ATTR_CSS_MAX_WIDTH = "data-poptart-max-width";

ATTR_CSS_MAX_HEIGHT = "data-poptart-max-height";

POSITIONS = {
  BOTTOM: "bottom",
  TOP: "top"
};

EVENTS = {
  STARTED_ACTIVATING: "poptart:popover-started-activating",
  FINISHED_ACTIVATING: "poptart:popover-finished-activating"
};

DEFAULTS = {
  preferredPosition: POSITIONS.BOTTOM,
  positionPopovers: true,
  debounce: false,
  preventPageScroll: true,
  activeClass: "is-active",
  inactiveClass: "is-inactive",
  activeSourceClass: "is-active",
  inactiveSourceClass: "is-inactive",
  contentWrapperSelector: null,
  contentSelector: null,
  tooltipSelector: null
};

registeredSelectors = {};

activePopover = {};

positionPopovers = void 0;

triggerPopover = function(source, settings) {
  var div, markup, popover;
  markup = settings.callback(source);
  div = document.createElement("div");
  div.innerHTML = markup;
  popover = div.firstChild;
  setTimeout(function() {
    var style, _base, _base1;
    style = window.getComputedStyle(popover);
    setTimeout(function() {
      var triggerEvent;
      popover.setAttribute(ATTR_CSS_MAX_WIDTH, calculateMaxWidthPixelDimension(style.maxWidth));
      popover.setAttribute(ATTR_CSS_MAX_HEIGHT, calculateMaxWidthPixelDimension(style.maxHeight));
      popover.style.maxWidth = "none";
      positionPopovers = popoverPositioner(settings);
      positionPopovers();
      triggerEvent = function() {
        dom.trigger(EVENTS.STARTED_ACTIVATING, popover);
        popover.removeEventListener("transitionend", triggerEvent);
        return popover.removeEventListener("webkitTransitionend", triggerEvent);
      };
      popover.addEventListener("transitionend", triggerEvent);
      popover.addEventListener("webkitTransitionend", triggerEvent);
      popover.classList.add(settings.activeClass);
      popover.classList.remove(settings.inactiveClass);
      source.classList.add(settings.activeSourceClass);
      return source.classList.remove(settings.inactiveSourceClass);
    }, 0);
    activePopover.popover = {
      main: popover,
      content: settings.contentSelector != null ? dom.find(popover, settings.contentSelector) : void 0,
      contentWrap: settings.contentWrapperSelector != null ? dom.find(popover, settings.contentWrapperSelector) : void 0,
      tooltip: settings.tooltipSelector != null ? dom.find(popover, settings.tooltipSelector) : void 0
    };
    if ((_base = activePopover.popover).content == null) {
      _base.content = popover;
    }
    if ((_base1 = activePopover.popover).contentWrap == null) {
      _base1.contentWrap = popover;
    }
    activePopover.settings = settings;
    activePopover.source = source;
    source.parentNode.appendChild(popover);
    window.addEventListener("resize", positionPopovers);
    return window.addEventListener("scroll", positionPopovers);
  }, 0);
  return popover;
};

removePopovers = function(settings) {
  var popover, posititionPopovers, remove, source;
  if (!activePopover.popover) {
    return;
  }
  popover = activePopover.popover.main;
  source = activePopover.source;
  settings = activePopover.settings;
  remove = function(event) {
    var _ref;
    if ((_ref = popover.parentNode) != null) {
      _ref.removeChild(popover);
    }
    popover.removeEventListener("transitionend", remove);
    return popover.removeEventListener("webkitTransitionend", remove);
  };
  popover.addEventListener("transitionend", remove);
  popover.addEventListener("webkitTransitionend", remove);
  popover.classList.remove(settings.activeClass);
  popover.classList.add(settings.inactiveClass);
  source.classList.remove(settings.activeSourceClass);
  source.classList.add(settings.inactiveSourceClass);
  activePopover = {};
  posititionPopovers = void 0;
  window.removeEventListener("resize", positionPopovers);
  return window.removeEventListener("scroll", positionPopovers);
};

nodeIsDescendantOfNode = function(node, ancestorNode) {
  if (!ancestorNode) {
    return false;
  }
  while (node !== document.body) {
    if (node === ancestorNode) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

nodeIsPopoverDescendant = function(node) {
  return nodeIsDescendantOfNode(node, activePopover.popover.main);
};

nodeIsSourceDescendant = function(node) {
  return nodeIsDescendantOfNode(node, activePopover.source);
};

clickHandler = function(event) {
  var popover, tryTriggering;
  tryTriggering = !nodeIsSourceDescendant(event.target);
  if (activePopover.popover && !nodeIsPopoverDescendant(event.target)) {
    removePopovers();
  }
  if (tryTriggering) {
    popover = Poptart.triggerPopoverFor(event.target);
    return !!popover;
  }
};

availableSpace = function(node) {
  var leftSpace, rect, source, topSpace, windowDimensions, _ref;
  rect = node.getBoundingClientRect();
  _ref = [rect.top + 0.5 * rect.height, rect.left + 0.5 * rect.width], topSpace = _ref[0], leftSpace = _ref[1];
  source = {
    height: rect.height,
    width: rect.width
  };
  windowDimensions = {
    height: window.innerHeight,
    width: window.innerWidth
  };
  return {
    top: topSpace,
    bottom: windowDimensions.height - topSpace,
    left: leftSpace,
    leftRelative: leftSpace / windowDimensions.width,
    right: windowDimensions.width - leftSpace,
    window: windowDimensions,
    source: source
  };
};

baseFontSize = function() {
  var el, size;
  el = document.createElement("div");
  el.style.cssText = "display:inline-block;padding:0;line-height:1;position:absolute;visibility:hidden;font-size:1em;";
  el.appendChild(document.createElement("M"));
  document.body.appendChild(el);
  size = el.offsetHeight;
  document.body.removeChild(el);
  return size;
};

calculateMaxWidthPixelDimension = function(dim, node) {
  return calculatePixelDimension(dim, node) || 10000;
};

calculatePixelDimension = function(dim, node, makeFFPercentageAdjustment) {
  if (makeFFPercentageAdjustment == null) {
    makeFFPercentageAdjustment = true;
  }
  if (dim === "none") {
    return 0;
  }
  if (dim.indexOf("rem") >= 0) {
    return parseFloat(dim) * baseFontSize();
  }
  if (dim.indexOf("em") >= 0) {
    return parseFloat(dim) * parseFloat(window.getComputedStyle(node).fontSize);
  }
  if (dim.indexOf("%") >= 0 || dim.indexOf("vw") >= 0) {
    return parseFloat(dim) / 100;
  }
  dim = parseFloat(dim);
  if (dim <= 60 && makeFFPercentageAdjustment) {
    dim = dim / parseFloat(node.parentNode.offsetWidth);
  }
  return dim;
};

oppositeOf = function(pos) {
  if (pos === POSITIONS.BOTTOM) {
    return POSITIONS.TOP;
  } else {
    return POSITIONS.BOTTOM;
  }
};

setPopoverWidth = function(maxWidthRelativeTo, preferredPosition) {
  var maxWidth, relativeToWidth, wrap;
  maxWidth = parseFloat(activePopover.popover.main.getAttribute(ATTR_CSS_MAX_WIDTH));
  wrap = activePopover.popover.contentWrap;
  if (maxWidth <= 1) {
    relativeToWidth = (function() {
      var el, userSpecifiedRelativeElWidth;
      userSpecifiedRelativeElWidth = 10000;
      if (maxWidthRelativeTo) {
        el = dom.one(maxWidthRelativeTo);
        if (el) {
          userSpecifiedRelativeElWidth = el.offsetWidth;
        }
      }
      return Math.min(window.innerWidth, userSpecifiedRelativeElWidth);
    })();
    maxWidth = relativeToWidth * maxWidth;
  }
  maxWidth = Math.min(maxWidth, activePopover.popover.content.offsetWidth + 1);
  return wrap.style.maxWidth = "" + maxWidth + "px";
};

setPopoverHeight = function(space, position) {
  var marginSize, maxHeight, opposite, popover, popoverHeight, popoverStyles, transformOrigin;
  popover = activePopover.popover.main;
  maxHeight = parseFloat(popover.getAttribute(ATTR_CSS_MAX_HEIGHT));
  popoverStyles = window.getComputedStyle(popover);
  marginSize = calculatePixelDimension(popoverStyles.marginTop, popover, false) + calculatePixelDimension(popoverStyles.marginBottom, popover, false);
  popoverHeight = popover.offsetHeight + marginSize;
  opposite = oppositeOf(position);
  if (space[position] < popoverHeight && space[position] < space[opposite]) {
    position = opposite;
  }
  transformOrigin = "" + (space.leftRelative * 100) + "% top 0";
  if (position === POSITIONS.TOP) {
    popover.classList.add("is-positioned-top");
    popover.classList.remove("is-positioned-bottom");
    maxHeight = Math.min(maxHeight, space.top - marginSize);
    transformOrigin = "" + (space.leftRelative * 100) + "% bottom 0";
  } else {
    popover.classList.add("is-positioned-bottom");
    popover.classList.remove("is-positioned-top");
    maxHeight = Math.min(maxHeight, space.bottom - marginSize);
  }
  popover.style.transformOrigin = transformOrigin;
  return activePopover.popover.content.style.maxHeight = "" + maxHeight + "px";
};

positionTooltip = function(space, popover) {
  var _ref;
  return (_ref = activePopover.popover.tooltip) != null ? _ref.style.left = "" + (popover.offsetWidth * space.leftRelative + 2) + "px" : void 0;
};

popoverPositioner = function(settings) {
  return function(event) {
    var popover, source, sourceStyles, space, type, _ref;
    type = (event != null ? event.type : void 0) || "resize";
    if (!(settings.positionPopovers && activePopover.popover)) {
      return;
    }
    _ref = [activePopover.popover.main, activePopover.source], popover = _ref[0], source = _ref[1];
    sourceStyles = window.getComputedStyle(source);
    space = availableSpace(source);
    setPopoverHeight(space, settings.preferredPosition);
    if (type === "resize") {
      setPopoverWidth(settings.maxWidthRelativeTo);
    }
    positionTooltip(space, popover);
    return popover.style.marginLeft = "" + (-1 * space.leftRelative * popover.offsetWidth + space.source.width / 2 + calculatePixelDimension(sourceStyles.marginLeft, source)) + "px";
  };
};

Poptart = (function() {
  function Poptart() {}

  Poptart.registerPopover = function(selector, options, callback) {
    var settings;
    if (typeof options === "function") {
      options = {
        callback: options
      };
    } else {
      options.callback = callback;
    }
    settings = obj.merge(obj.clone(DEFAULTS), options);
    return registeredSelectors[selector] = settings;
  };

  Poptart.triggerPopoverFor = function(node) {
    var selector, setting, settings;
    if (!(node != null ? node.webkitMatchesSelector : void 0)) {
      return;
    }
    settings = void 0;
    for (selector in registeredSelectors) {
      setting = registeredSelectors[selector];
      if (node.webkitMatchesSelector(selector)) {
        settings = setting;
        break;
      }
    }
    if (settings) {
      return triggerPopover(node, settings);
    }
  };

  return Poptart;

})();

Poptart.POSITIONS = POSITIONS;

Poptart.EVENTS = EVENTS;

document.addEventListener("click", clickHandler);

document.addEventListener("touchend", clickHandler);

module.exports = Poptart;



},{"bigfoot-dom":5,"bigfoot-obj":6}]},{},[4]);
