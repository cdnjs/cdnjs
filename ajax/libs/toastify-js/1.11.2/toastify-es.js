/*!
 * Toastify js 1.11.2
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */

/**
 * Options used for Toastify
 * @typedef {Object} ToastifyConfigurationObject
 * @property {string} text - Message to be displayed in the toast
 * @property {Element} node - Provide a node to be mounted inside the toast. node takes higher precedence over text
 * @property {number} duration - Duration for which the toast should be displayed. -1 for permanent toast
 * @property {string|Element} selector - CSS ID Selector on which the toast should be added
 * @property {url} destination - URL to which the browser should be navigated on click of the toast
 * @property {boolean} newWindow - Decides whether the destination should be opened in a new window or not
 * @property {boolean} close - To show the close icon or not
 * @property {string} gravity - To show the toast from top or bottom
 * @property {string} position - To show the toast on left or right
 * @property {string} backgroundColor - Deprecated: Sets the background color of the toast
 * @property {url} avatar - Image/icon to be shown before text
 * @property {string} className - Ability to provide custom class name for further customization
 * @property {boolean} stopOnFocus - To stop timer when hovered over the toast (Only if duration is set)
 * @property {Function} callback - Invoked when the toast is dismissed
 * @property {Function} onClick - Invoked when the toast is clicked
 * @property {Object} offset - Ability to add some offset to axis
 * @property {boolean} escapeMarkup - Toggle the default behavior of escaping HTML markup
 * @property {Object} style - Use the HTML DOM style property to add styles to toast
 */


class Toastify {

    defaults = {
      oldestFirst: true,
      text: "Toastify is awesome!",
      node: undefined,
      duration: 3000,
      selector: undefined,
      callback: function() {},
      destination: undefined,
      newWindow: false,
      close: false,
      gravity: "toastify-top",
      positionLeft: false,
      position: "",
      backgroundColor: "",
      avatar: "",
      className: "",
      stopOnFocus: true,
      onClick: function() {},
      offset: { x: 0, y: 0 },
      escapeMarkup: true,
      style: { background: "" },
    };

    constructor(options) {
      /**
       * The version of Toastify
       * @type {string}
       * @public
       */
      this.version = "1.11.2";

      /**
       * The configuration object to configure Toastify
       * @type {ToastifyConfigurationObject}
       * @public
       */
      this.options = {};

      /**
       * The element that is the Toast
       * @type {Element}
       * @public
       */
      this.toastElement = null;

      /**
       * The root element that contains all the toasts
       * @type {Element}
       * @private
       */
      this._rootElement = document.body;

      this._init(options);
    }

    /**
     * Display the toast
     * @public
     */
    showToast() {
      // Creating the DOM object for the toast
      this.toastElement = this._buildToast();

      // Getting the root element to with the toast needs to be added
      if (typeof this.options.selector === "string") {
        this._rootElement = document.getElementById(this.options.selector);
      } else if (this.options.selector instanceof HTMLElement || this.options.selector instanceof ShadowRoot) {
        this._rootElement = this.options.selector;
      } else {
        this._rootElement = document.body;
      }

      // Validating if root element is present in DOM
      if (!this._rootElement) {
        throw "Root element is not defined";
      }

      // Adding the DOM element
      this._rootElement.insertBefore(this.toastElement, this._rootElement.firstChild);

      // Repositioning the toasts in case multiple toasts are present
      this._reposition();

      if (this.options.duration > 0) {
        this.toastElement.timeOutValue = window.setTimeout(
          () => {
            // Remove the toast from DOM
            this._removeElement(this.toastElement);
          },
          this.options.duration
        ); // Binding `this` for function invocation
      }

      // Supporting function chaining
      return this;
    }

    /**
     * Hide the toast
     * @public
     */
    hideToast() {
      if (this.toastElement.timeOutValue) {
        clearTimeout(this.toastElement.timeOutValue);
      }
      this._removeElement(this.toastElement);
    }

    /**
     * Init the Toastify class
     * @param {ToastifyConfigurationObject} options - The configuration object to configure Toastify
     * @param {string} [options.text=Hi there!] - Message to be displayed in the toast
     * @param {Element} [options.node] - Provide a node to be mounted inside the toast. node takes higher precedence over text
     * @param {number} [options.duration=3000] - Duration for which the toast should be displayed. -1 for permanent toast
     * @param {string} [options.selector] - CSS Selector on which the toast should be added
     * @param {url} [options.destination] - URL to which the browser should be navigated on click of the toast
     * @param {boolean} [options.newWindow=false] - Decides whether the destination should be opened in a new window or not
     * @param {boolean} [options.close=false] - To show the close icon or not
     * @param {string} [options.gravity=toastify-top] - To show the toast from top or bottom
     * @param {string} [options.position=right] - To show the toast on left or right
     * @param {string} [options.backgroundColor] - Sets the background color of the toast (To be deprecated)
     * @param {url} [options.avatar] - Image/icon to be shown before text
     * @param {string} [options.className] - Ability to provide custom class name for further customization
     * @param {boolean} [options.stopOnFocus] - To stop timer when hovered over the toast (Only if duration is set)
     * @param {Function} [options.callback] - Invoked when the toast is dismissed
     * @param {Function} [options.onClick] - Invoked when the toast is clicked
     * @param {Object} [options.offset] - Ability to add some offset to axis
     * @param {boolean} [options.escapeMarkup=true] - Toggle the default behavior of escaping HTML markup
     * @param {Object} [options.style] - Use the HTML DOM style property to add styles to toast
     * @private
     */
    _init(options) {

      // Setting defaults
      this.options = Object.assign(this.defaults, options);

      if (this.options.backgroundColor) {
        // This is being deprecated in favor of using the style HTML DOM property
        console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
      }

      this.toastElement = null;

      this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : "toastify-top"; // toast position - top or bottom
      this.options.stopOnFocus = options.stopOnFocus === undefined ? true : options.stopOnFocus; // stop timeout on focus
      if(options.backgroundColor) {
        this.options.style.background = options.backgroundColor;
      }
    }

    /**
     * Build the Toastify element
     * @returns {Element}
     * @private
     */
    _buildToast() {
      // Validating if the options are defined
      if (!this.options) {
        throw "Toastify is not initialized";
      }

      // Creating the DOM object
      let divElement = document.createElement("div");
      divElement.className = `toastify on ${this.options.className}`;

      // Positioning toast to left or right or center (default right)
      divElement.className += ` toastify-${this.options.position}`;

      // Assigning gravity of element
      divElement.className += ` ${this.options.gravity}`;

      // Loop through our style object and apply styles to divElement
      for (const property in this.options.style) {
        divElement.style[property] = this.options.style[property];
      }

      // Adding the toast message/node
      if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
        // If we have a valid node, we insert it
        divElement.appendChild(this.options.node)
      } else {
        if (this.options.escapeMarkup) {
          divElement.innerText = this.options.text;
        } else {
          divElement.innerHTML = this.options.text;
        }

        if (this.options.avatar !== "") {
          let avatarElement = document.createElement("img");
          avatarElement.src = this.options.avatar;

          avatarElement.className = "toastify-avatar";

          if (this.options.position == "left") {
            // Adding close icon on the left of content
            divElement.appendChild(avatarElement);
          } else {
            // Adding close icon on the right of content
            divElement.insertAdjacentElement("afterbegin", avatarElement);
          }
        }
      }

      // Adding a close icon to the toast
      if (this.options.close === true) {
        // Create a span for close element
        let closeElement = document.createElement("span");
        closeElement.innerHTML = "&#10006;";

        closeElement.className = "toast-close";

        // Triggering the removal of toast from DOM on close click
        closeElement.addEventListener(
          "click",
          (event) => {
            event.stopPropagation();
            this._removeElement(this.toastElement);
            window.clearTimeout(this.toastElement.timeOutValue);
          }
        );

        //Calculating screen width
        const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

        // Adding the close icon to the toast element
        // Display on the right if screen width is less than or equal to 360px
        if ((this.options.position == "left") && width > 360) {
          // Adding close icon on the left of content
          divElement.insertAdjacentElement("afterbegin", closeElement);
        } else {
          // Adding close icon on the right of content
          divElement.appendChild(closeElement);
        }
      }

      // Clear timeout while toast is focused
      if (this.options.stopOnFocus && this.options.duration > 0) {
        // stop countdown
        divElement.addEventListener(
          "mouseover",
          (event) => {
            window.clearTimeout(divElement.timeOutValue);
          }
        )
        // add back the timeout
        divElement.addEventListener(
          "mouseleave",
          () => {
            divElement.timeOutValue = window.setTimeout(
              () => {
                // Remove the toast from DOM
                this._removeElement(divElement);
              },
              this.options.duration
            )
          }
        )
      }

      // Adding an on-click destination path
      if (typeof this.options.destination !== "undefined") {
        divElement.addEventListener(
          "click",
          (event) => {
            event.stopPropagation();
            if (this.options.newWindow === true) {
              window.open(this.options.destination, "_blank");
            } else {
              window.location = this.options.destination;
            }
          }
        );
      }

      if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
        divElement.addEventListener(
          "click",
          (event) => {
            event.stopPropagation();
            this.options.onClick();
          }
        );
      }

      // Adding offset
      if (typeof this.options.offset === "object") {

        const x = this._getAxisOffsetAValue("x", this.options);
        const y = this._getAxisOffsetAValue("y", this.options);

        const xOffset = this.options.position == "left" ? x : `-${x}`;
        const yOffset = this.options.gravity == "toastify-top" ? y : `-${y}`;

        divElement.style.transform = `translate(${xOffset},${yOffset})`;

      }

      // Returning the generated element
      return divElement;
    }

    /**
     * Remove the toast from the DOM
     * @param {Element} toastElement
     */
    _removeElement(toastElement) {
      // Hiding the element
      toastElement.className = toastElement.className.replace(" on", "");

      // Removing the element from DOM after transition end
      window.setTimeout(
        () => {
          // remove options node if any
          if (this.options.node && this.options.node.parentNode) {
            this.options.node.parentNode.removeChild(this.options.node);
          }

          // Remove the element from the DOM, only when the parent node was not removed before.
          if (toastElement.parentNode) {
            toastElement.parentNode.removeChild(toastElement);
          }

          // Calling the callback function
          this.options.callback.call(toastElement);

          // Repositioning the toasts again
          this._reposition();
        },
        400
      ); // Binding `this` for function invocation
    }

    /**
     * Position the toast on the DOM
     * @private
     */
    _reposition() {

      // Top margins with gravity
      let topLeftOffsetSize = {
        top: 15,
        bottom: 15,
      };
      let topRightOffsetSize = {
        top: 15,
        bottom: 15,
      };
      let offsetSize = {
        top: 15,
        bottom: 15,
      };

      // Get all toast messages that have been added to the container (selector)
      let allToasts = this._rootElement.querySelectorAll(".toastify");

      let classUsed;

      // Modifying the position of each toast element
      for (let i = 0; i < allToasts.length; i++) {
        // Getting the applied gravity
        if (allToasts[i].classList.contains("toastify-top") === true) {
          classUsed = "toastify-top";
        } else {
          classUsed = "toastify-bottom";
        }

        let height = allToasts[i].offsetHeight;
        classUsed = classUsed.substr(9, classUsed.length - 1)
        // Spacing between toasts
        let offset = 15;

        let width = window.innerWidth > 0 ? window.innerWidth : screen.width;

        // Show toast in center if screen with less than or equal to 360px
        if (width <= 360) {
          // Setting the position
          allToasts[i].style[classUsed] = `${offsetSize[classUsed]}px`;

          offsetSize[classUsed] += height + offset;
        } else {
          if (allToasts[i].classList.contains("toastify-left") === true) {
            // Setting the position
            allToasts[i].style[classUsed] = `${topLeftOffsetSize[classUsed]}px`;

            topLeftOffsetSize[classUsed] += height + offset;
          } else {
            // Setting the position
            allToasts[i].style[classUsed] = `${topRightOffsetSize[classUsed]}px`;

            topRightOffsetSize[classUsed] += height + offset;
          }
        }
      }
    }

    /**
     * Helper function to get offset
     * @param {string} axis - 'x' or 'y'
     * @param {ToastifyConfigurationObject} options - The options object containing the offset object
     */
    _getAxisOffsetAValue(axis, options) {

      if (options.offset[axis]) {
        if (isNaN(options.offset[axis])) {
          return options.offset[axis];
        } else {
          return `${options.offset[axis]}px`;
        }
      }

      return '0px';

    }

  }


  // Returning the Toastify function to be assigned to the window object/module
  function StartToastifyInstance(options) {
    return new Toastify(options);
  }

  export default StartToastifyInstance;
