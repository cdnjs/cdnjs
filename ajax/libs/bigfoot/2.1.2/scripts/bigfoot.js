(function() {
  var ATTR_ANCHOR_ID, ATTR_FOOTNOTE_IDENTIFIER, ATTR_FOOTNOTE_NUMBER, Bigfoot, CLASS_BUTTON, CLASS_FOOTNOTE_HIDE_WHEN_PRINTING, CLASS_POPOVER, CLASS_PRINT_ONLY, DEFAULTS, ORIGINAL_FOOTNOTE_ACTION_HIDE, ORIGINAL_FOOTNOTE_ACTION_IGNORE, ORIGINAL_FOOTNOTE_ACTION_REMOVE, Poptart, applyFootnoteIDsAndNumbers, cleanFootnoteContent, cleanSelector, createButtons, dom, getFootnoteAnchors, hideNodeAppropriately, init, obj, processFootnotes, removeEmptyFootnoteContainers, replaceTemplateVariable, replaceWithReferenceAttributes,
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
    dom.docDefer("." + CLASS_POPOVER, Poptart.EVENTS.STARTED_ACTIVATING, function(event) {
      var popover;
      popover = event.target;
      return console.log(popover);
    });
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
      footnote = document.querySelector("#" + anchor.footnoteID);
      if (footnote) {
        footnoteContent = cleanFootnoteContent(footnote.innerHTML, anchor.anchorID);
      }
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

}).call(this);
