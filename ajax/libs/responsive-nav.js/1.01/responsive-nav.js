/*! responsive-nav.js v1.01
 * https://github.com/viljamis/responsive-nav.js
 * http://responsive-nav.com
 *
 * Copyright (c) 2013 @viljamis
 * Available under the MIT license
 */

/* jshint strict:false, forin:false, noarg:true, noempty:true, eqeqeq:true, boss:true,
bitwise:true, undef:true, unused:true, browser:true, devel:true, indent:2, expr:true */
/* exported responsiveNav */

var responsiveNav = (function (window, document) {

  var computed = !!window.getComputedStyle;

  // getComputedStyle polyfill
  if (!window.getComputedStyle) {
    window.getComputedStyle = function(el) {
      this.el = el;
      this.getPropertyValue = function(prop) {
        var re = /(\-([a-z]){1})/g;
        if (prop === "float") {
          prop = "styleFloat";
        }
        if (re.test(prop)) {
          prop = prop.replace(re, function () {
            return arguments[2].toUpperCase();
          });
        }
        return el.currentStyle[prop] ? el.currentStyle[prop] : null;
      };
      return this;
    };
  }

  var navToggle,
    aria = "aria-hidden",
    docEl = document.documentElement,
    head = document.getElementsByTagName("head")[0],
    styleElement = document.createElement("style"),
    navOpen = false,

    // fn arg can be an object or a function, thanks to handleEvent
    // read more at: http://www.thecssninja.com/javascript/handleevent
    addEvent = function (el, evt, fn, bubble) {
      if ("addEventListener" in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
          el.addEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.addEventListener(evt, function (e) {
              // Bind fn as this and set first arg as event object
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("attachEvent" in el) {
        // check if the callback is an object and contains handleEvent
        if (typeof fn === "object" && fn.handleEvent) {
          el.attachEvent("on" + evt, function () {
            // Bind fn as this
            fn.handleEvent.call(fn);
          });
        } else {
          el.attachEvent("on" + evt, fn);
        }
      }
    },

    removeEvent = function (el, evt, fn, bubble) {
      if ("removeEventListener" in el) {
        try {
          el.removeEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.removeEventListener(evt, function (e) {
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("detachEvent" in el) {
        if (typeof fn === "object" && fn.handleEvent) {
          el.detachEvent("on" + evt, function () {
            fn.handleEvent.call(fn);
          });
        } else {
          el.detachEvent("on" + evt, fn);
        }
      }
    },

    getFirstChild = function (e) {
      var firstChild = e.firstChild;
      // skip TextNodes
      while (firstChild !== null && firstChild.nodeType !== 1) {
        firstChild = firstChild.nextSibling;
      }
      return firstChild;
    },

    log = function () { },

    ResponsiveNav = function (el, options) {
      var i;

      // Adds "js" class for <html>
      docEl.className = docEl.className + " js ";

      // Default options
      this.options = {
        transition: 400,    // Integer: Speed of the transition, in milliseconds
        label: "Menu",      // String: Label for the navigation toggle
        insert: "after",    // String: Insert the toggle before or after the navigation
        customToggle: "",   // Selector: Specify the ID of a custom toggle
        debug: false        // Boolean: Log debug messages to console, true or false
      };

      // User defined options
      for (i in options) {
        this.options[i] = options[i];
      }

      // Debug logger
      if (this.options.debug) {
        log = function (s) {
          try {
            console.log(s);
          } catch (e) {
            alert(s);
          }
        };
      }

      // Wrapper
      this.wrapperEl = el.replace("#", "");
      if (document.getElementById(this.wrapperEl)) {
        this.wrapper = document.getElementById(this.wrapperEl);
      } else {
        // If el doesn't exists, stop here.
        log("The nav element you are trying to select doesn't exist");
        return;
      }

      // Inner wrapper
      this.wrapper.inner = getFirstChild(this.wrapper);

      // Init
      this.__init(this);
    };

  ResponsiveNav.prototype = {

    // Public methods
    destroy: function () {
      this.wrapper.className = this.wrapper.className.replace(/(^|\s)closed(\s|$)/, " ");
      this.wrapper.removeAttribute("style");
      this.wrapper.removeAttribute(aria);
      this.wrapper = null;
      __instance = null;

      removeEvent(window, "load", this, false);
      removeEvent(window, "resize", this, false);
      removeEvent(navToggle, "mousedown", this, false);
      removeEvent(navToggle, "touchstart", this, false);
      removeEvent(navToggle, "keyup", this, false);
      removeEvent(navToggle, "click", this, false);

      navToggle.parentNode.removeChild(navToggle);
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }

      log("Destroyed!");
    },

    toggle: function () {
      var navWrapper = this.wrapper;

      if (!navOpen) {
        navWrapper.className = navWrapper.className.replace(/(^|\s)closed(\s|$)/, " opened ");
        navWrapper.style.position = "relative";
        navWrapper.setAttribute(aria, false);

        navOpen = true;
        log("Opened nav");

      } else {
        navWrapper.className = navWrapper.className.replace(/(^|\s)opened(\s|$)/, " closed ");
        navWrapper.setAttribute(aria, true);

        setTimeout(function () {
          navWrapper.style.position = "absolute";
        }, this.options.transition + 10);

        navOpen = false;
        log("Closed nav");
      }
      return false;
    },

    handleEvent: function (e) {
      var evt = e || window.event;

      switch (evt.type) {
      case "mousedown":
        this.__onmousedown(evt);
        break;
      case "touchstart":
        this.__ontouchstart(evt);
        break;
      case "keyup":
        this.__onkeyup(evt);
        break;
      case "click":
        this.__onclick(evt);
        break;
      case "load":
      case "resize":
        this.__resize(evt);
        break;
      }
    },

    // Private methods
    __init: function () {
      log("Inited ResponsiveNav2.js");

      this.wrapper.className = this.wrapper.className + " closed";
      this.__createToggle();

      addEvent(window, "load", this, false);
      addEvent(window, "resize", this, false);
      addEvent(navToggle, "mousedown", this, false);
      addEvent(navToggle, "touchstart", this, false);
      addEvent(navToggle, "keyup", this, false);
      addEvent(navToggle, "click", this, false);
    },

    __createStyles: function () {
      if (!styleElement.parentNode) {
        head.appendChild(styleElement);
        log("Created 'styleElement' to <head>");
      }
    },

    __removeStyles: function () {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
        log("Removed 'styleElement' from <head>");
      }
    },

    __createToggle: function () {
      if (!this.options.customToggle) {
        var toggle = document.createElement("a");
        toggle.setAttribute("href", "#");
        toggle.setAttribute("id", "nav-toggle");
        toggle.setAttribute("tabindex", "1");
        toggle.innerHTML = this.options.label;

        if (this.options.insert === "after") {
          this.wrapper.parentNode.insertBefore(toggle, this.wrapper.nextSibling);
        } else {
          this.wrapper.parentNode.insertBefore(toggle, this.wrapper);
        }

        navToggle = document.getElementById("nav-toggle");
        log("Default nav toggle created");

      } else {
        var toggleEl = this.options.customToggle.replace("#", "");
        navToggle = document.getElementById(toggleEl);
        log("Custom nav toggle created");
      }
    },

    __onmousedown: function (e) {
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      this.toggle(e);
    },

    __ontouchstart: function (e) {
      // Touchstart event fires before the mousedown event and can wipe it
      navToggle.onmousedown = null;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      this.toggle(e);
    },

    __onkeyup: function (e) {
      var evt = e || window.event;
      if (evt.keyCode === 13) {
        this.toggle(e);
      }
    },

    __onclick: function (e) {
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    },

    __transitions: function () {
      var objStyle = this.wrapper.style,
        transition = "max-height " + this.options.transition + "ms";

      objStyle.WebkitTransition = transition;
      objStyle.MozTransition = transition;
      objStyle.OTransition = transition;
      objStyle.transition = transition;
    },

    __resize: function () {
      if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
        navToggle.setAttribute(aria, false);

        if (this.wrapper.className.match(/(^|\s)closed(\s|$)/)) {
          this.wrapper.setAttribute(aria, true);
          this.wrapper.style.position = "absolute";
        }

        this.__createStyles();
        this.__transitions();

        var savedHeight = this.wrapper.inner.offsetHeight,
          innerStyles = "#" + this.wrapperEl + ".opened{max-height:" + savedHeight + "px }";

        // Hide from old IE
        if (computed) {
          styleElement.innerHTML = innerStyles;
          innerStyles = "";
        }

        log("Calculated max-height of " + savedHeight + "px and updated 'styleElement'");

      } else {
        navToggle.setAttribute(aria, true);
        this.wrapper.setAttribute(aria, false);
        this.wrapper.style.position = "relative";
        this.__removeStyles();
      }
    }

  };

  var __instance;
  function rn (el, options) {
    if (!__instance) {
      __instance = new ResponsiveNav(el, options);
    }

    return __instance;
  }

  return rn;
})(window, document);
