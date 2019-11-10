"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * @class VanillaModal
 * @version 0.4.0
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
        if (e && typeof e.hash === "string") {
          return document.querySelector(e.hash);
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
        if (this.current instanceof HTMLElement === false) return console.error("VanillaModal target must exist on page.");
        if (typeof this.$$.onBeforeOpen === "function") this.$$.onBeforeOpen.call(this);
        this._captureNode();
        this._addClass(this.$.page, this.$$["class"]);
        this._setOpenId();
        this.isOpen = true;
        if (typeof this.$$.onOpen === "function") this.$$.onOpen.call(this);
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
        if (typeof this.$$.onBeforeClose === "function") this.$$.onBeforeClose.call(this);
        this._removeClass(this.$.page, this.$$["class"]);
        if (this.$$.transitions && this.$$.transitionEnd) {
          this._closeModalWithTransition();
        } else {
          this._closeModal();
        }
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
        if (typeof this.$$.onClose === "function") this.$$.onClose.call(this);
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
        while (this.current.childNodes.length > 0) {
          this.$.modalContent.appendChild(this.current.childNodes[0]);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _releaseNode: {
      value: function ReleaseNode() {
        while (this.$.modalContent.childNodes.length > 0) {
          this.current.appendChild(this.$.modalContent.childNodes[0]);
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
        if (typeof this.$$.closeKey !== "number") return;
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
        if (this.$$.clickOutside !== true) return;
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
    _matches: {

      /**
       * @param {Event} e
       * @param {String} selector
       */
      value: function Matches(e, selector) {
        var el = e.target;
        var matches = (el.document || el.ownerDocument).querySelectorAll(selector);
        for (var i = 0; i < matches.length; i++) {
          var child = el;
          while (child !== document.body) {
            if (child === matches[i]) return child;
            child = child.parentNode;
          }
        }
        return null;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _delegateOpen: {

      /**
       * @param {Event} e
       */
      value: function DelegateOpen(e) {
        e.preventDefault();
        var matches = this._matches(e, this.$$.open);
        if (matches) {
          return this.open(matches);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _delegateClose: {

      /**
       * @param {Event} e
       */
      value: function DelegateClose(e) {
        e.preventDefault();
        if (this._matches(e, this.$$.close)) {
          return this.close();
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _events: {

      /**
       * @private {Function} add
       */
      value: function Events() {
        var _closeKeyHandler = this._closeKeyHandler.bind(this);
        var _outsideClickHandler = this._outsideClickHandler.bind(this);
        var _delegateOpen = this._delegateOpen.bind(this);
        var _delegateClose = this._delegateClose.bind(this);

        var add = function () {
          this.$.modal.addEventListener("click", _outsideClickHandler);
          document.addEventListener("keydown", _closeKeyHandler);
          document.addEventListener("click", _delegateOpen);
          document.addEventListener("click", _delegateClose);
        };

        this.destroy = function () {
          this.close();
          this.$.modal.removeEventListener("click", _outsideClickHandler);
          document.removeEventListener("keydown", _closeKeyHandler);
          document.removeEventListener("click", _delegateOpen);
          document.removeEventListener("click", _delegateClose);
        };

        return {
          add: add.bind(this)
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