/**
* Wallop.js
*
* @fileoverview Minimal Slider with CSS animation
*
* @author Pedro Duarte
* @author http://pedroduarte.me/wallop
*
*/
(function(global){

  function Wallop(selector, options) {
    if (!selector) {
      throw new Error('Selector missing, eg: new Wallop(".selector")');
    }

    for (var i = 0; i < selectorPool.length; i++) {
      if (selectorPool[i] === selector) {
        throw new Error('An instance of Wallop with this selector already exists.');
      }
    }

    this.options = {
      buttonPreviousClass: 'Wallop-buttonPrevious',
      buttonNextClass: 'Wallop-buttonNext',
      itemClass: 'Wallop-item',
      currentItemClass: 'Wallop-item--current',
      showPreviousClass: 'Wallop-item--showPrevious',
      showNextClass: 'Wallop-item--showNext',
      hidePreviousClass: 'Wallop-item--hidePrevious',
      hideNextClass: 'Wallop-item--hideNext',
      carousel: true
    };


    if (selector.length > 0) {
      throw new Error('Selector cannot be an array');
    } else {
      this.$selector = selector;
    }


    this.options = extend(this.options, options);
    this.event = null;

    // "Global vars"
    this.allItemsArray = Array.prototype.slice.call(this.$selector.querySelectorAll(' .' + this.options.itemClass));
    this.allItemsArrayLength = this.allItemsArray.length - 1; // otherwise starts from 1. weird?
    this.currentItemIndex = this.allItemsArray.indexOf(this.$selector.querySelector(' .' + this.options.currentItemClass));
    this.buttonPrevious = this.$selector.querySelector(' .' + this.options.buttonPreviousClass);
    this.buttonNext = this.$selector.querySelector(' .' + this.options.buttonNextClass);

    this.bindEvents();
    this.createCustomEvent();

    // If there is no active item, start at 0
    if (this.currentItemIndex < 0) {
      this.currentItemIndex = 0;
      addClass(this.allItemsArray[this.currentItemIndex], this.options.currentItemClass);
    }

    // Wrapped in timeout function so event can
    // be listened from outside at anytime
    var _this = this;
    setTimeout(function() {
      _this.event.detail.currentItemIndex = _this.currentItemIndex;
      _this.$selector.dispatchEvent(_this.event);
    }, 0);
  }

  var selectorPool = [];

  var WS = Wallop.prototype;

  // Update prev/next disabled attribute
  WS.updateButtonStates = function () {
    if (!this.buttonPrevious && !this.buttonNext) { return; }

    if (this.currentItemIndex === this.allItemsArrayLength && this.options.carousel !== true) {
      this.buttonNext.setAttribute('disabled', 'disabled');
    } else if (this.currentItemIndex === 0 && this.options.carousel !== true) {
      this.buttonPrevious.setAttribute('disabled', 'disabled');
    }
  };

  // Reset all settings by removing classes and attributes added by goTo() & updateButtonStates()
  WS.removeAllHelperSettings = function () {
    removeClass(this.allItemsArray[this.currentItemIndex], this.options.currentItemClass);
    removeClass($$(this.options.hidePreviousClass)[0], this.options.hidePreviousClass);
    removeClass($$(this.options.hideNextClass)[0], this.options.hideNextClass);
    removeClass($$(this.options.showPreviousClass)[0], this.options.showPreviousClass);
    removeClass($$(this.options.showNextClass)[0], this.options.showNextClass);

    if (!this.buttonPrevious && !this.buttonNext) { return; }

    this.buttonPrevious.removeAttribute('disabled');
    this.buttonNext.removeAttribute('disabled');
  };

  // Method to add classes to the right elements depending on the index passed
  WS.goTo = function (index) {
    // Check if it's a carousel and if so, change index to be last item when clicking previous on first item
    if (this.options.carousel && index === -1) { index = this.allItemsArrayLength - 1; }
    else if (index > this.allItemsArrayLength || index < 0) { return; }

    this.removeAllHelperSettings();

    addClass(this.allItemsArray[this.currentItemIndex], index > this.currentItemIndex ? this.options.hidePreviousClass : this.options.hideNextClass);
    addClass(this.allItemsArray[index], this.options.currentItemClass + ' ' + (index > this.currentItemIndex ? this.options.showNextClass : this.options.showPreviousClass));

    this.currentItemIndex = index;

    this.updateButtonStates();

    this.event.detail.currentItemIndex = this.currentItemIndex;
    this.$selector.dispatchEvent(this.event);
  };

  // Previous item handler
  WS.previous = function () {
    if (this.options.carousel && this.currentItemIndex === 0) {
      this.goTo(this.allItemsArrayLength);
    } else {
      this.goTo(this.currentItemIndex - 1);
    }
  };

  // Next item handler
  WS.next = function () {
    if (this.currentItemIndex >= this.allItemsArrayLength && this.options.carousel === true) {
      this.goTo(0);
    } else {
      this.goTo(this.currentItemIndex + 1);
    }
  };

  // Attach click handlers
  WS.bindEvents = function () {

    selectorPool.push(this.$selector);

    var _this = this;

    if (this.buttonPrevious) {
      this.buttonPrevious.addEventListener('click', function (event) {
        event.preventDefault();
        _this.previous();
      });
    }

    if (this.buttonNext) {
      this.buttonNext.addEventListener('click', function (event) {
        event.preventDefault();
        _this.next();
      });
    }

  };

  // Method so it is nicer for the user to use custom events
  WS.on = function (eventName, callback) {
    this.$selector.addEventListener(eventName, function(event) {
      return callback(event);
    }, false);
  };

  // Create custom Event
  WS.createCustomEvent = function () {
    var _this = this;
    this.event = new CustomEvent('change', {
      detail: {
        wallopEl: _this.$selector,
        currentItemIndex: Number(_this.currentItemIndex)
      },
      bubbles: true,
      cancelable: true
    });
  };



  /**
   * Helper functions
   */

  function $$(element) {
    if (!element) { return; }
    return document.querySelectorAll('.' + element);
  }

  function addClass(element, className) {
    if (!element) { return; }
    element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
  }

  function removeClass(element, className) {
    if (!element) { return; }
    element.className = element.className.replace(className, '');
  }

  function extend(origOptions, userOptions){
    var extendOptions = {}, attrname;
    for (attrname in origOptions) { extendOptions[attrname] = origOptions[attrname]; }
    for (attrname in userOptions) { extendOptions[attrname] = userOptions[attrname]; }
    return extendOptions;
  }

  // Pollyfill for CustomEvent() Constructor - thanks to Internet Explorer
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.CustomEvent.prototype;
  window.CustomEvent = CustomEvent;

  // Exports to multiple environments
  if(typeof define === 'function' && define.amd){ //AMD
    define(function () { return Wallop; });
  } else if (typeof module !== 'undefined' && module.exports){ //node
    module.exports = Wallop;
  } else { // browser
    // use string because of Google closure compiler ADVANCED_MODE
    /* jslint sub:true */
    global['Wallop'] = Wallop;
  }

}(this));
