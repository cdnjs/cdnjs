"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * @class VanillaModal
 * @version 0.3.1
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
      href: false,
      clickOutside: true,
      escapeKey: true,
      transitions: true,
      onBeforeOpen: function () {},
      onBeforeClose: function () {},
      onOpen: function () {},
      onClose: function () {}
    };

    this.isOpen = false;

    this.open = this._open.bind(this);
    this.close = this._close.bind(this);
    this.escapeKeyHandler = this._escapeKeyHandler.bind(this);
    this.outsideClickHandler = this._outsideClickHandler.bind(this);

    this.userSettings = this.applyUserSettings(userSettings);
    this.transitionEnd = this.transitionEndVendorSniff();
    this.$ = this._setupDomNodes();

    this._addLoadedCssClass();
    this._addEvents();
  }

  _prototypeProperties(VanillaModal, null, {
    applyUserSettings: {
      value: function applyUserSettings() {
        if (typeof this.userSettings === "object") {
          for (var i in this.userSettings) {
            if (userSettings.hasOwnProperty(i)) {
              this.$$[i] = this.userSettings[i];
            }
          }
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    transitionEndVendorSniff: {
      value: function transitionEndVendorSniff() {
        if (this.$$.transitions) return;
        var el = document.createElement("div");
        var transitions = {
          transition: "transitionend",
          OTransition: "otransitionend",
          MozTransition: "transitionend",
          WebkitTransition: "webkitTransitionEnd"
        };
        for (var i in transitions) {
          if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            this.transitionEnd = transitions[i];
            return;
          }
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getNode: {

      /**
       * @param {String} selector
       * @param {Node} parent
       */
      value: function getNode(selector, parent) {
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
        $.modal = this.getNode(this.$$.modal);
        $.page = this.getNode(this.$$.page);
        $.modalInner = this.getNode(this.$$.modalInner, this.modal);
        $.modalContent = this.getNode(this.$$.modalContent, this.modal);
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
        var id = this.$$.href.id || "anonymous";
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
      value: function GetElementContext(e) {
        if (e.currentTarget && typeof e.currentTarget.hash === "string") {
          return document.querySelector(e.currentTarget.hash);
        } else if (typeof e === "string") {
          return document.querySelector(e);
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
        this.$$.href = this._getElementContext(e);
        if (this.$$.href instanceof HTMLElement === false) return console.error("Element \"" + this.$$.href + "\" does not exist in context.");
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
        if (this.$$.transitions && this.transitionEnd) {
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
        if (typeof this.$$.onClose === "function") this.$$.onClose.bind(this);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _closeTransitionHandler: {
      value: function CloseTransitionHandler() {
        this.$.modal.removeEventListener(this.transitionEnd, this._closeTransitionHandler);
        this._closeModal();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _closeModalWithTransition: {
      value: function CloseModalWithTransition() {
        this.$.modal.addEventListener(this.transitionEnd, this._closeTransitionHandler);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _captureNode: {
      value: function CaptureNode() {
        try {
          while (this.$$.href.childNodes.length > 0) {
            this.$.modalContent.appendChild(this.$$.href.childNodes[0]);
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
            this.$$.href.appendChild(this.$.modalContent.childNodes[0]);
          }
        } catch (e) {
          return console.error("The modal's original container no longer exists.");
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _escapeKeyHandler: {

      /**
       * @param {Event} e
       */
      value: function EscapeKeyHandler(e) {
        if (e.keyCode === 27 && this.isOpen === true) {
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
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].removeEventListener(event, fn);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _addEvents: {
      value: function AddEvents() {
        this._addEvent(this.$.open, "click", this.open);
        this._addEvent(this.$.close, "click", this.close);
        if (this.$$.escapeKey === true) this._addEvent(document, "keydown", this.escapeKeyHandler);
        if (this.$$.clickOutside === true) this._addEvent(this.$.modal, "click", this.outsideClickHandler);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    destroy: {
      value: function destroy() {
        this.close();
        this._removeEvent(this.$.open, "click", this.open);
        this._removeEvent(this.$.close, "click", this.close);
        if (this.$$.escapeKey === true) this._removeEvent(document, "keydown", this.escapeKeyHandler);
        if (this.$$.clickOutside === true) this._removeEvent(this.$.modal, "click", this.outsideClickHandler);
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