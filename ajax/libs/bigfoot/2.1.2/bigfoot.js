(function() {
  (function($) {
    return $.bigfoot = function(options) {
      var addBreakpoint, baseFontSize, bigfoot, buttonHover, calculatePixelDimension, cleanFootnoteLinks, clickButton, createPopover, defaults, deleteEmptyOrHR, escapeKeypress, footnoteInit, getSetting, makeDefaultCallbacks, popoverStates, positionTooltip, removeBackLinks, removeBreakpoint, removePopovers, replaceWithReferenceAttributes, repositionFeet, roomCalc, settings, touchClick, unhoverFeet, updateSetting, viewportDetails;
      bigfoot = void 0;
      defaults = {
        actionOriginalFN: "hide",
        activateCallback: function() {},
        activateOnHover: false,
        allowMultipleFN: false,
        anchorPattern: /(fn|footnote|note)[:\-_\d]/gi,
        anchorParentTagname: 'sup',
        breakpoints: {},
        deleteOnUnhover: false,
        footnoteParentClass: 'footnote',
        footnoteTagname: 'li',
        hoverDelay: 250,
        numberResetSelector: void 0,
        popoverDeleteDelay: 300,
        popoverCreateDelay: 100,
        positionContent: true,
        preventPageScroll: true,
        scope: false,
        useFootnoteOnlyOnce: true,
        contentMarkup: "<aside class=\"bigfoot-footnote is-positioned-bottom\" data-footnote-number=\"{{FOOTNOTENUM}}\" data-footnote-identifier=\"{{FOOTNOTEID}}\" alt=\"Footnote {{FOOTNOTENUM}}\"> <div class=\"bigfoot-footnote__wrapper\"> <div class=\"bigfoot-footnote__content\"> {{FOOTNOTECONTENT}} </div></div> <div class=\"bigfoot-footnote__tooltip\"></div> </aside>",
        buttonMarkup: "<div class='bigfoot-footnote__container'> <button class=\"bigfoot-footnote__button\" id=\"{{SUP:data-footnote-backlink-ref}}\" data-footnote-number=\"{{FOOTNOTENUM}}\" data-footnote-identifier=\"{{FOOTNOTEID}}\" alt=\"See Footnote {{FOOTNOTENUM}}\" rel=\"footnote\" data-bigfoot-footnote=\"{{FOOTNOTECONTENT}}\"> <svg class=\"bigfoot-footnote__button__circle\" viewbox=\"0 0 6 6\" preserveAspectRatio=\"xMinYMin\"><circle r=\"3\" cx=\"3\" cy=\"3\" fill=\"white\"></circle></svg> <svg class=\"bigfoot-footnote__button__circle\" viewbox=\"0 0 6 6\" preserveAspectRatio=\"xMinYMin\"><circle r=\"3\" cx=\"3\" cy=\"3\" fill=\"white\"></circle></svg> <svg class=\"bigfoot-footnote__button__circle\" viewbox=\"0 0 6 6\" preserveAspectRatio=\"xMinYMin\"><circle r=\"3\" cx=\"3\" cy=\"3\" fill=\"white\"></circle></svg> </button></div>"
      };
      settings = $.extend(defaults, options);
      popoverStates = {};
      footnoteInit = function() {
        var $curResetElement, $currentLastFootnoteLink, $footnoteAnchors, $footnoteButton, $lastResetElement, $parent, $relevantFNLink, $relevantFootnote, finalFNLinks, footnoteButton, footnoteButtonSearchQuery, footnoteContent, footnoteIDNum, footnoteLinks, footnoteNum, footnotes, i, _i, _ref, _results;
        footnoteButtonSearchQuery = settings.scope ? "" + settings.scope + " a[href*=\"#\"]" : "a[href*=\"#\"]";
        $footnoteAnchors = $(footnoteButtonSearchQuery).filter(function() {
          var $this, relAttr;
          $this = $(this);
          relAttr = $this.attr("rel");
          if (relAttr === "null" || (relAttr == null)) {
            relAttr = "";
          }
          return ("" + ($this.attr("href")) + relAttr).match(settings.anchorPattern) && $this.closest("[class*=" + settings.footnoteParentClass + "]:not(a):not(" + settings.anchorParentTagname + ")").length < 1;
        });
        footnotes = [];
        footnoteLinks = [];
        finalFNLinks = [];
        cleanFootnoteLinks($footnoteAnchors, footnoteLinks);
        $(footnoteLinks).each(function() {
          var $closestFootnoteEl, relatedFN;
          relatedFN = $(this).data("footnote-ref").replace(/[:.+~*\]\[]/g, "\\$&");
          if (settings.useFootnoteOnlyOnce) {
            relatedFN = "" + relatedFN + ":not(.footnote-processed)";
          }
          $closestFootnoteEl = $(relatedFN).closest(settings.footnoteTagname);
          if ($closestFootnoteEl.length > 0) {
            footnotes.push($closestFootnoteEl.first().addClass("footnote-processed"));
            return finalFNLinks.push(this);
          }
        });
        $currentLastFootnoteLink = $("[data-footnote-identifier]:last");
        footnoteIDNum = $currentLastFootnoteLink.length < 1 ? 0 : +$currentLastFootnoteLink.data("footnote-identifier");
        _results = [];
        for (i = _i = 0, _ref = footnotes.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          footnoteContent = removeBackLinks($(footnotes[i]).html().trim(), $(finalFNLinks[i]).data("footnote-backlink-ref"));
          footnoteContent = footnoteContent.replace(/"/g, "&quot;").replace(/&lt;/g, "&ltsym;").replace(/&gt;/g, "&gtsym;");
          footnoteIDNum += 1;
          footnoteButton = "";
          $relevantFNLink = $(finalFNLinks[i]);
          $relevantFootnote = $(footnotes[i]);
          if (settings.numberResetSelector != null) {
            $curResetElement = $relevantFNLink.closest(settings.numberResetSelector);
            if ($curResetElement.is($lastResetElement)) {
              footnoteNum += 1;
            } else {
              footnoteNum = 1;
            }
            $lastResetElement = $curResetElement;
          } else {
            footnoteNum = footnoteIDNum;
          }
          if (footnoteContent.indexOf("<") !== 0) {
            footnoteContent = "<p>" + footnoteContent + "</p>";
          }
          footnoteButton = settings.buttonMarkup.replace(/\{\{FOOTNOTENUM\}\}/g, footnoteNum).replace(/\{\{FOOTNOTEID\}\}/g, footnoteIDNum).replace(/\{\{FOOTNOTECONTENT\}\}/g, footnoteContent);
          footnoteButton = replaceWithReferenceAttributes(footnoteButton, "SUP", $relevantFNLink);
          footnoteButton = replaceWithReferenceAttributes(footnoteButton, "FN", $relevantFootnote);
          $footnoteButton = $(footnoteButton).insertBefore($relevantFNLink);
          $parent = $relevantFootnote.parent();
          switch (settings.actionOriginalFN.toLowerCase()) {
            case "hide":
              $relevantFNLink.addClass("footnote-print-only");
              $relevantFootnote.addClass("footnote-print-only");
              _results.push(deleteEmptyOrHR($parent));
              break;
            case "delete":
              $relevantFNLink.remove();
              $relevantFootnote.remove();
              _results.push(deleteEmptyOrHR($parent));
              break;
            default:
              _results.push($relevantFNLink.addClass("footnote-print-only"));
          }
        }
        return _results;
      };
      cleanFootnoteLinks = function($footnoteAnchors, footnoteLinks) {
        var $parent, $supChild, linkHREF, linkID;
        if (footnoteLinks == null) {
          footnoteLinks = [];
        }
        $parent = void 0;
        $supChild = void 0;
        linkHREF = void 0;
        linkID = void 0;
        $footnoteAnchors.each(function() {
          var $child, $this;
          $this = $(this);
          linkHREF = "#" + ($this.attr("href")).split("#")[1];
          $parent = $this.closest(settings.anchorParentTagname);
          $child = $this.find(settings.anchorParentTagname);
          if ($parent.length > 0) {
            linkID = ($parent.attr("id") || "") + ($this.attr("id") || "");
            return footnoteLinks.push($parent.attr({
              "data-footnote-backlink-ref": linkID,
              "data-footnote-ref": linkHREF
            }));
          } else if ($child.length > 0) {
            linkID = ($child.attr("id") || "") + ($this.attr("id") || "");
            return footnoteLinks.push($this.attr({
              "data-footnote-backlink-ref": linkID,
              "data-footnote-ref": linkHREF
            }));
          } else {
            linkID = $this.attr("id") || "";
            return footnoteLinks.push($this.attr({
              "data-footnote-backlink-ref": linkID,
              "data-footnote-ref": linkHREF
            }));
          }
        });
      };
      deleteEmptyOrHR = function($el) {
        var $parent;
        $parent = void 0;
        if ($el.is(":empty") || $el.children(":not(.footnote-print-only)").length === 0) {
          $parent = $el.parent();
          if (settings.actionOriginalFN.toLowerCase() === "delete") {
            $el.remove();
          } else {
            $el.addClass("footnote-print-only");
          }
          return deleteEmptyOrHR($parent);
        } else if ($el.children(":not(.footnote-print-only)").length === $el.children("hr:not(.footnote-print-only)").length) {
          $parent = $el.parent();
          if (settings.actionOriginalFN.toLowerCase() === "delete") {
            $el.remove();
          } else {
            $el.children("hr").addClass("footnote-print-only");
            $el.addClass("footnote-print-only");
          }
          return deleteEmptyOrHR($parent);
        }
      };
      removeBackLinks = function(footnoteHTML, backlinkID) {
        var regex;
        if (backlinkID.indexOf(' ') >= 0) {
          backlinkID = backlinkID.trim().replace(/\s+/g, "|").replace(/(.*)/g, "($1)");
        }
        regex = new RegExp("(\\s|&nbsp;)*<\\s*a[^#<]*#" + backlinkID + "[^>]*>(.*?)<\\s*/\\s*a>", "g");
        return footnoteHTML.replace(regex, "").replace("[]", "");
      };
      replaceWithReferenceAttributes = function(string, referenceKeyword, $referenceElement) {
        var refMatches, refRegex, refReplaceRegex, refReplaceText;
        refRegex = new RegExp("\\{\\{" + referenceKeyword + ":([^\\}]*)\\}\\}", "g");
        refMatches = void 0;
        refReplaceText = void 0;
        refReplaceRegex = void 0;
        refMatches = refRegex.exec(string);
        while (refMatches) {
          if (refMatches[1]) {
            refReplaceText = $referenceElement.attr(refMatches[1]) || "";
            string = string.replace("{{" + referenceKeyword + ":" + refMatches[1] + "}}", refReplaceText);
          }
          refMatches = refRegex.exec(string);
        }
        return string;
      };
      buttonHover = function(event) {
        var $buttonHovered, dataIdentifier, otherPopoverSelector;
        if (settings.activateOnHover) {
          $buttonHovered = $(event.target).closest(".bigfoot-footnote__button");
          dataIdentifier = "[data-footnote-identifier=\"" + ($buttonHovered.attr("data-footnote-identifier")) + "\"]";
          if ($buttonHovered.hasClass("is-active")) {
            return;
          }
          $buttonHovered.addClass("is-hover-instantiated");
          if (!settings.allowMultipleFN) {
            otherPopoverSelector = ".bigfoot-footnote:not(" + dataIdentifier + ")";
            removePopovers(otherPopoverSelector);
          }
          createPopover(".bigfoot-footnote__button" + dataIdentifier).addClass("is-hover-instantiated");
        }
      };
      touchClick = function(event) {
        var $nearButton, $nearFootnote, $target;
        $target = $(event.target);
        $nearButton = $target.closest(".bigfoot-footnote__button");
        $nearFootnote = $target.closest(".bigfoot-footnote");
        if ($nearButton.length > 0) {
          event.preventDefault();
          clickButton($nearButton);
        } else if ($nearFootnote.length < 1) {
          if ($(".bigfoot-footnote").length > 0) {
            removePopovers();
          }
        }
      };
      clickButton = function($button) {
        var dataIdentifier;
        $button.blur();
        dataIdentifier = "data-footnote-identifier=\"" + ($button.attr("data-footnote-identifier")) + "\"";
        if ($button.hasClass("changing")) {
          return;
        } else if (!$button.hasClass("is-active")) {
          $button.addClass("changing");
          setTimeout((function() {
            return $button.removeClass("changing");
          }), settings.popoverCreateDelay);
          createPopover(".bigfoot-footnote__button[" + dataIdentifier + "]");
          $button.addClass("is-click-instantiated");
          if (!settings.allowMultipleFN) {
            removePopovers(".bigfoot-footnote:not([" + dataIdentifier + "])");
          }
        } else {
          if (!settings.allowMultipleFN) {
            removePopovers();
          } else {
            removePopovers(".bigfoot-footnote[" + dataIdentifier + "]");
          }
        }
      };
      createPopover = function(selector) {
        var $buttons, $popoversCreated;
        $buttons = void 0;
        if (typeof selector !== "string" && settings.allowMultipleFN) {
          $buttons = selector;
        } else if (typeof selector !== "string") {
          $buttons = selector.first();
        } else if (settings.allowMultipleFN) {
          $buttons = $(selector).closest(".bigfoot-footnote__button");
        } else {
          $buttons = $(selector + ":first").closest(".bigfoot-footnote__button");
        }
        $popoversCreated = $();
        $buttons.each(function() {
          var $content, $contentContainer, $this, content;
          $this = $(this);
          content = void 0;
          try {
            content = settings.contentMarkup.replace(/\{\{FOOTNOTENUM\}\}/g, $this.attr("data-footnote-number")).replace(/\{\{FOOTNOTEID\}\}/g, $this.attr("data-footnote-identifier")).replace(/\{\{FOOTNOTECONTENT\}\}/g, $this.attr("data-bigfoot-footnote")).replace(/\&gtsym\;/g, "&gt;").replace(/\&ltsym\;/g, "&lt;");
            return content = replaceWithReferenceAttributes(content, "BUTTON", $this);
          } finally {
            $content = $(content);
            try {
              settings.activateCallback($content, $this);
            } catch (_error) {}
            $content.insertAfter($buttons);
            popoverStates[$this.attr("data-footnote-identifier")] = "init";
            $content.attr("bigfoot-max-width", calculatePixelDimension($content.css("max-width"), $content));
            $content.css("max-width", 10000);
            $contentContainer = $content.find(".bigfoot-footnote__content");
            $content.attr("data-bigfoot-max-height", calculatePixelDimension($contentContainer.css("max-height"), $contentContainer));
            repositionFeet();
            $this.addClass("is-active");
            $content.find(".bigfoot-footnote__content").bindScrollHandler();
            $popoversCreated = $popoversCreated.add($content);
          }
        });
        setTimeout((function() {
          return $popoversCreated.addClass("is-active");
        }), settings.popoverCreateDelay);
        return $popoversCreated;
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
      calculatePixelDimension = function(dim, $el) {
        if (dim === "none") {
          dim = 10000;
        } else if (dim.indexOf("rem") >= 0) {
          dim = parseFloat(dim) * baseFontSize();
        } else if (dim.indexOf("em") >= 0) {
          dim = parseFloat(dim) * parseFloat($el.css("font-size"));
        } else if (dim.indexOf("px") >= 0) {
          dim = parseFloat(dim);
          if (dim <= 60) {
            dim = dim / parseFloat($el.parent().css("width"));
          }
        } else if (dim.indexOf("%") >= 0) {
          dim = parseFloat(dim) / 100;
        }
        return dim;
      };
      $.fn.bindScrollHandler = function() {
        if (!settings.preventPageScroll) {
          return $(this);
        }
        $(this).on("DOMMouseScroll mousewheel", function(event) {
          var $popover, $this, delta, height, prevent, scrollHeight, scrollTop, up;
          $this = $(this);
          scrollTop = $this.scrollTop();
          scrollHeight = $this[0].scrollHeight;
          height = parseInt($this.css("height"));
          $popover = $this.closest(".bigfoot-footnote");
          if ($this.scrollTop() > 0 && $this.scrollTop() < 10) {
            $popover.addClass("is-scrollable");
          }
          if (!$popover.hasClass("is-scrollable")) {
            return;
          }
          delta = event.type === "DOMMouseScroll" ? event.originalEvent.detail * -40 : event.originalEvent.wheelDelta;
          up = delta > 0;
          prevent = function() {
            event.stopPropagation();
            event.preventDefault();
            event.returnValue = false;
            return false;
          };
          if (!up && -delta > scrollHeight - height - scrollTop) {
            $this.scrollTop(scrollHeight);
            $popover.addClass("is-fully-scrolled");
            return prevent();
          } else if (up && delta > scrollTop) {
            $this.scrollTop(0);
            $popover.removeClass("is-fully-scrolled");
            return prevent();
          } else {
            return $popover.removeClass("is-fully-scrolled");
          }
        });
        return $(this);
      };
      unhoverFeet = function(e) {
        if (settings.deleteOnUnhover && settings.activateOnHover) {
          return setTimeout((function() {
            var $target;
            $target = $(e.target).closest(".bigfoot-footnote, .bigfoot-footnote__button");
            if ($(".bigfoot-footnote__button:hover, .bigfoot-footnote:hover").length < 1) {
              return removePopovers();
            }
          }), settings.hoverDelay);
        }
      };
      escapeKeypress = function(event) {
        if (event.keyCode === 27) {
          return removePopovers();
        }
      };
      removePopovers = function(footnotes, timeout) {
        var $buttonsClosed, $linkedButton, $this, footnoteID;
        if (footnotes == null) {
          footnotes = ".bigfoot-footnote";
        }
        if (timeout == null) {
          timeout = settings.popoverDeleteDelay;
        }
        $buttonsClosed = $();
        footnoteID = void 0;
        $linkedButton = void 0;
        $this = void 0;
        $(footnotes).each(function() {
          $this = $(this);
          footnoteID = $this.attr("data-footnote-identifier");
          $linkedButton = $(".bigfoot-footnote__button[data-footnote-identifier=\"" + footnoteID + "\"]");
          if (!$linkedButton.hasClass("changing")) {
            $buttonsClosed = $buttonsClosed.add($linkedButton);
            $linkedButton.removeClass("is-active is-hover-instantiated is-click-instantiated").addClass("changing");
            $this.removeClass("is-active").addClass("disapearing");
            return setTimeout((function() {
              $this.remove();
              delete popoverStates[footnoteID];
              return $linkedButton.removeClass("changing");
            }), timeout);
          }
        });
        return $buttonsClosed;
      };
      repositionFeet = function(e) {
        var type;
        if (settings.positionContent) {
          type = e ? e.type : "resize";
          $(".bigfoot-footnote").each(function() {
            var $button, $contentWrapper, $mainWrap, $this, dataIdentifier, identifier, lastState, marginSize, maxHeightInCSS, maxHeightOnScreen, maxWidth, maxWidthInCSS, positionOnTop, relativeToWidth, roomLeft, totalHeight;
            $this = $(this);
            identifier = $this.attr("data-footnote-identifier");
            dataIdentifier = "data-footnote-identifier=\"" + identifier + "\"";
            $contentWrapper = $this.find(".bigfoot-footnote__content");
            $button = $this.siblings(".bigfoot-footnote__button");
            roomLeft = roomCalc($button);
            marginSize = parseFloat($this.css("margin-top"));
            maxHeightInCSS = +($this.attr("data-bigfoot-max-height"));
            totalHeight = 2 * marginSize + $this.outerHeight();
            maxHeightOnScreen = 10000;
            positionOnTop = roomLeft.bottomRoom < totalHeight && roomLeft.topRoom > roomLeft.bottomRoom;
            lastState = popoverStates[identifier];
            if (positionOnTop) {
              if (lastState !== "top") {
                popoverStates[identifier] = "top";
                $this.addClass("is-positioned-top").removeClass("is-positioned-bottom");
                $this.css("transform-origin", (roomLeft.leftRelative * 100) + "% 100%");
              }
              maxHeightOnScreen = roomLeft.topRoom - marginSize - 15;
            } else {
              if (lastState !== "bottom" || lastState === "init") {
                popoverStates[identifier] = "bottom";
                $this.removeClass("is-positioned-top").addClass("is-positioned-bottom");
                $this.css("transform-origin", (roomLeft.leftRelative * 100) + "% 0%");
              }
              maxHeightOnScreen = roomLeft.bottomRoom - marginSize - 15;
            }
            $this.find(".bigfoot-footnote__content").css({
              "max-height": Math.min(maxHeightOnScreen, maxHeightInCSS) + "px"
            });
            if (type === "resize") {
              maxWidthInCSS = parseFloat($this.attr("bigfoot-max-width"));
              $mainWrap = $this.find(".bigfoot-footnote__wrapper");
              maxWidth = maxWidthInCSS;
              if (maxWidthInCSS <= 1) {
                relativeToWidth = (function() {
                  var jq, userSpecifiedRelativeElWidth;
                  userSpecifiedRelativeElWidth = 10000;
                  if (settings.maxWidthRelativeTo) {
                    jq = $(settings.maxWidthRelativeTo);
                    if (jq.length > 0) {
                      userSpecifiedRelativeElWidth = jq.outerWidth();
                    }
                  }
                  return Math.min(window.innerWidth, userSpecifiedRelativeElWidth);
                })();
                maxWidth = relativeToWidth * maxWidthInCSS;
              }
              maxWidth = Math.min(maxWidth, $this.find(".bigfoot-footnote__content").outerWidth() + 1);
              $mainWrap.css("max-width", maxWidth + "px");
              $this.css({
                left: (-roomLeft.leftRelative * maxWidth + parseFloat($button.css("margin-left")) + $button.outerWidth() / 2) + "px"
              });
              positionTooltip($this, roomLeft.leftRelative);
            }
            if (parseInt($this.outerHeight()) < $this.find(".bigfoot-footnote__content")[0].scrollHeight) {
              return $this.addClass("is-scrollable");
            }
          });
        }
      };
      positionTooltip = function($popover, leftRelative) {
        var $tooltip;
        if (leftRelative == null) {
          leftRelative = 0.5;
        }
        $tooltip = $popover.find(".bigfoot-footnote__tooltip");
        if ($tooltip.length > 0) {
          $tooltip.css("left", "" + (leftRelative * 100) + "%");
        }
      };
      roomCalc = function($el) {
        var elHeight, elLeftMargin, elWidth, leftRoom, topRoom, w;
        elLeftMargin = parseFloat($el.css("margin-left"));
        elWidth = parseFloat($el.outerWidth()) - elLeftMargin;
        elHeight = parseFloat($el.outerHeight());
        w = viewportDetails();
        topRoom = $el.offset().top - w.scrollY + elHeight / 2;
        leftRoom = $el.offset().left - w.scrollX + elWidth / 2;
        return {
          topRoom: topRoom,
          bottomRoom: w.height - topRoom,
          leftRoom: leftRoom,
          rightRoom: w.width - leftRoom,
          leftRelative: leftRoom / w.width,
          topRelative: topRoom / w.height
        };
      };
      viewportDetails = function() {
        var $window;
        $window = $(window);
        return {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollX: $window.scrollLeft(),
          scrollY: $window.scrollTop()
        };
      };
      addBreakpoint = function(size, trueCallback, falseCallback, deleteDelay, removeOpen) {
        var falseDefaultPositionSetting, minMax, mqListener, mql, query, s, trueDefaultPositionSetting;
        if (deleteDelay == null) {
          deleteDelay = settings.popoverDeleteDelay;
        }
        if (removeOpen == null) {
          removeOpen = true;
        }
        mql = void 0;
        minMax = void 0;
        s = void 0;
        if (typeof size === "string") {
          s = size.toLowerCase() === "iphone" ? "<320px" : size.toLowerCase() === "ipad" ? "<768px" : size;
          minMax = s.charAt(0) === ">" ? "min" : s.charAt(0) === "<" ? "max" : null;
          query = minMax ? "(" + minMax + "-width: " + (s.substring(1)) + ")" : s;
          mql = window.matchMedia(query);
        } else {
          mql = size;
        }
        if (mql.media && mql.media === "invalid") {
          return {
            added: false,
            mq: mql,
            listener: null
          };
        }
        trueDefaultPositionSetting = minMax === "min";
        falseDefaultPositionSetting = minMax === "max";
        trueCallback = trueCallback || makeDefaultCallbacks(removeOpen, deleteDelay, trueDefaultPositionSetting, function($popover) {
          return $popover.addClass("is-bottom-fixed");
        });
        falseCallback = falseCallback || makeDefaultCallbacks(removeOpen, deleteDelay, falseDefaultPositionSetting, function() {});
        mqListener = function(mq) {
          if (mq.matches) {
            trueCallback(removeOpen, bigfoot);
          } else {
            falseCallback(removeOpen, bigfoot);
          }
        };
        mql.addListener(mqListener);
        mqListener(mql);
        settings.breakpoints[size] = {
          added: true,
          mq: mql,
          listener: mqListener
        };
        return settings.breakpoints[size];
      };
      makeDefaultCallbacks = function(removeOpen, deleteDelay, position, callback) {
        return function(removeOpen, bigfoot) {
          var $closedPopovers;
          $closedPopovers = void 0;
          if (removeOpen) {
            $closedPopovers = bigfoot.close();
            bigfoot.updateSetting("activateCallback", callback);
          }
          return setTimeout((function() {
            bigfoot.updateSetting("positionContent", position);
            if (removeOpen) {
              return bigfoot.activate($closedPopovers);
            }
          }), deleteDelay);
        };
      };
      removeBreakpoint = function(target, callback) {
        var b, breakpoint, mq, mqFound;
        mq = null;
        b = void 0;
        mqFound = false;
        if (typeof target === "string") {
          mqFound = settings.breakpoints[target] !== undefined;
        } else {
          for (b in settings.breakpoints) {
            if (settings.breakpoints.hasOwnProperty(b) && settings.breakpoints[b].mq === target) {
              mqFound = true;
            }
          }
        }
        if (mqFound) {
          breakpoint = settings.breakpoints[b || target];
          if (callback) {
            callback({
              matches: false
            });
          } else {
            breakpoint.listener({
              matches: false
            });
          }
          breakpoint.mq.removeListener(breakpoint.listener);
          delete settings.breakpoints[b || target];
        }
        return mqFound;
      };
      updateSetting = function(newSettings, value) {
        var oldValue, prop;
        oldValue = void 0;
        if (typeof newSettings === "string") {
          oldValue = settings[newSettings];
          settings[newSettings] = value;
        } else {
          oldValue = {};
          for (prop in newSettings) {
            if (newSettings.hasOwnProperty(prop)) {
              oldValue[prop] = settings[prop];
              settings[prop] = newSettings[prop];
            }
          }
        }
        return oldValue;
      };
      getSetting = function(setting) {
        return settings[setting];
      };
      $(document).ready(function() {
        footnoteInit();
        $(document).on("mouseenter", ".bigfoot-footnote__button", buttonHover);
        $(document).on("touchend click", touchClick);
        $(document).on("mouseout", ".is-hover-instantiated", unhoverFeet);
        $(document).on("keyup", escapeKeypress);
        $(window).on("scroll resize", repositionFeet);
        return $(document).on("gestureend", function() {
          return repositionFeet();
        });
      });
      bigfoot = {
        removePopovers: removePopovers,
        close: removePopovers,
        createPopover: createPopover,
        activate: createPopover,
        repositionFeet: repositionFeet,
        reposition: repositionFeet,
        addBreakpoint: addBreakpoint,
        removeBreakpoint: removeBreakpoint,
        getSetting: getSetting,
        updateSetting: updateSetting
      };
      return bigfoot;
    };
  })(jQuery);

}).call(this);
