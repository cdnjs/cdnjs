"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * @class VanillaModal
 * @version 0.3.5
 * @author Ben Ceglowski
 */
var VanillaModal = (function () {
  /**
   * @param {Object} [userSettings]
   */
  function VanillaModal(userSettings) {
    this.$$ = {
      modal: ".modal",
      modalInner: ".modal-inner",
      modalContent: ".modal-content",
      open: "[rel=\"modal:open\"]",
      close: "[rel=\"modal:close\"]",
      page: "body",
      "class": "modal-visible",
      loadClass: "vanilla-modal",
      clickOutside: true,
      closeKey: 27,
      transitions: true,
      transitionEnd: null,
      onBeforeOpen: function () {},
      onBeforeClose: function () {},
      onOpen: function () {},
      onClose: function () {}
    };

    this._applyUserSettings(userSettings);

    this.isOpen = false;
    this.current = null;

    this.open = this._open.bind(this);
    this.close = this._close.bind(this);

    this.$ = this._setupDomNodes();
    this.$$.transitionEnd = this._transitionEndVendorSniff();
    this.destroy = this._events().remove;

    this._addLoadedCssClass();
    this._events().add();
  }

  _prototypeProperties(VanillaModal, null, {
    _applyUserSettings: {

      /**
       * @param {Object} userSettings
       */
      value: function ApplyUserSettings(userSettings) {
        if (typeof userSettings === "object") {
          for (var i in userSettings) {
            if (userSettings.hasOwnProperty(i)) {
              this.$$[i] = userSettings[i];
            }
          }
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _transitionEndVendorSniff: {
      value: function TransitionEndVendorSniff() {
        if (this.$$.transitions === false) return;
        var el = document.createElement("div");
        var transitions = {
          transition: "transitionend",
          OTransition: "otransitionend",
          MozTransition: "transitionend",
          WebkitTransition: "webkitTransitionEnd"
        };
        for (var i in transitions) {
          if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
          }
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getNode: {

      /**
       * @param {String} selector
       * @param {Node} parent
       */
      value: function GetNode(selector, parent) {
        var targetNode = parent || document;
        var node = targetNode.querySelector(selector);
        if (!node) return console.error("Element \"" + selector + "\" does not exist in context.");
        return node;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getNodeList: {

      /**
       * @param {String} selector
       * @param {Node} parent
       */
      value: function GetNodeList(selector, parent) {
        var targetNode = parent || document;
        var nodes = targetNode.querySelectorAll(selector);
        if (!nodes.length) return console.error("Element \"" + selector + "\" does not exist in context.");
        return nodes;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _setupDomNodes: {
      value: function SetupDomNodes() {
        var $ = {};
        $.modal = this._getNode(this.$$.modal);
        $.page = this._getNode(this.$$.page);
        $.modalInner = this._getNode(this.$$.modalInner, this.modal);
        $.modalContent = this._getNode(this.$$.modalContent, this.modal);
        $.open = this._getNodeList(this.$$.open);
        $.close = this._getNodeList(this.$$.close);
        return $;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _addLoadedCssClass: {
      value: function AddLoadedCssClass() {
        this._addClass(this.$.page, this.$$.loadClass);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _addClass: {

      /**
       * @param {Node} el
       * @param {String} className
       */
      value: function AddClass(el, className) {
        if (!el instanceof HTMLElement) return;
        var cssClasses = el.className.split(" ");
        if (cssClasses.indexOf(className) === -1) {
          cssClasses.push(className);
        }
        el.className = cssClasses.join(" ");
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _removeClass: {

      /**
       * @param {Node} el
       * @param {String} className
       */
      value: function RemoveClass(el, className) {
        if (!el instanceof HTMLElement) return;
        var cssClasses = el.className.split(" ");
        if (cssClasses.indexOf(className) > -1) {
          cssClasses.splice(cssClasses.indexOf(className), 1);
        }
        el.className = cssClasses.join(" ");
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _setOpenId: {
      value: function SetOpenId() {
        var id = this.current.id || "anonymous";
        this.$.page.setAttribute("data-current-modal", id);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _removeOpenId: {
      value: function RemoveOpenId() {
        this.$.page.removeAttribute("data-current-modal");
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getElementContext: {

      /**
       * @param {mixed} e
       */
      value: function GetElementContext(e) {
        if (e && e.currentTarget && typeof e.currentTarget.hash === "string") {
          return document.querySelector(e.currentTarget.hash);
        } else if (typeof e === "string") {
          return document.querySelector(e);
        } else {
          return console.error("No selector supplied to open()");
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _open: {

      /**
       * @param {Event} e
       */
      value: function Open(e) {
        this.current = this._getElementContext(e);
        if (this.current instanceof HTMLElement === false) return console.error("Element \"" + this.current + "\" does not exist in context.");
        if (typeof this.$$.onBeforeOpen === "function") this.$$.onBeforeOpen.bind(this);
        this._captureNode();
        this._addClass(this.$.page, this.$$["class"]);
        this._setOpenId();
        this.isOpen = true;
        if (typeof this.$$.onOpen === "function") this.$$.onOpen.bind(this);
        if (e && typeof e.preventDefault === "function") e.preventDefault();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _close: {

      /**
       * @param {Event} e
       */
      value: function Close(e) {
        if (typeof this.$$.onBeforeClose === "function") this.$$.onBeforeClose.bind(this);
        this._removeClass(this.$.page, this.$$["class"]);
        if (this.$$.transitions && this.$$.transitionEnd) {
          this._closeModalWithTransition();
        } else {
          this._closeModal();
        }
        if (e && typeof e.preventDefault === "function") e.preventDefault();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _closeModal: {
      value: function CloseModal() {
        this._removeOpenId(this.$.page);
        this._releaseNode();
        this.isOpen = false;
        this.current = null;
        if (typeof this.$$.onClose === "function") this.$$.onClose.bind(this);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _closeModalWithTransition: {
      value: function CloseModalWithTransition() {
        var _closeTransitionHandler = (function () {
          this.$.modal.removeEventListener(this.$$.transitionEnd, _closeTransitionHandler);
          this._closeModal();
        }).bind(this);
        this.$.modal.addEventListener(this.$$.transitionEnd, _closeTransitionHandler);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _captureNode: {
      value: function CaptureNode() {
        try {
          while (this.current.childNodes.length > 0) {
            this.$.modalContent.appendChild(this.current.childNodes[0]);
          }
        } catch (e) {
          return console.error("The target modal has no child elements.");
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _releaseNode: {
      value: function ReleaseNode() {
        try {
          while (this.$.modalContent.childNodes.length > 0) {
            this.current.appendChild(this.$.modalContent.childNodes[0]);
          }
        } catch (e) {
          return console.error("The modal's original container no longer exists.");
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _addEvent: {

      /**
       * @param {NodeList} nodes
       * @param {String} event
       * @param {Function} fn
       */
      value: function AddEvent(nodes, event, fn) {
        if (!nodes.length) nodes = [nodes];
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].addEventListener(event, fn);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _removeEvent: {

      /**
       * @param {NodeList} nodes
       * @param {String} event
       * @param {Function} fn
       */
      value: function RemoveEvent(nodes, event, fn) {
        if (!nodes.length) nodes = [nodes];
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].removeEventListener(event, fn);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _closeKeyHandler: {

      /**
       * @param {Event} e
       */
      value: function CloseKeyHandler(e) {
        if (e.which === this.$$.closeKey && this.isOpen === true) {
          e.preventDefault();
          this.close();
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _outsideClickHandler: {

      /**
       * @param {Event} e
       */
      value: function OutsideClickHandler(e) {
        var node = e.target;
        while (node != document.body) {
          if (node === this.$.modalInner) return;
          node = node.parentNode;
        }
        this.close();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _events: {
      value: function Events() {
        var _closeKeyHandler = this._closeKeyHandler.bind(this);
        var _outsideClickHandler = this._outsideClickHandler.bind(this);

        var add = function () {
          this._addEvent(this.$.open, "click", this.open);
          this._addEvent(this.$.close, "click", this.close);
          if (typeof this.$$.closeKey === "number") this._addEvent(document, "keydown", _closeKeyHandler);
          if (this.$$.clickOutside === true) this._addEvent(this.$.modal, "click", _outsideClickHandler);
        };

        var remove = function () {
          this.close();
          this._removeEvent(this.$.open, "click", this.open);
          this._removeEvent(this.$.close, "click", this.close);
          if (typeof this.$$.closeKey === "number") this._removeEvent(document, "keydown", _closeKeyHandler);
          if (this.$$.clickOutside === true) this._removeEvent(this.$.modal, "click", _outsideClickHandler);
        };

        return {
          add: add.bind(this),
          remove: remove.bind(this)
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return VanillaModal;
})();

(function () {
  if (typeof define === "function" && define.amd) {
    define("VanillaModal", function () {
      return VanillaModal;
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = VanillaModal;
  } else {
    window.VanillaModal = VanillaModal;
  }
})();