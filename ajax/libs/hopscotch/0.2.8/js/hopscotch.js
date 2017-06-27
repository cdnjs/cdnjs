/**! hopscotch - v0.2.8
*
* Copyright 2017 LinkedIn Corp. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function(context, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory();
  } else {
    var namespace = 'hopscotch';
    // Browser globals
    if (context[namespace]) {
      // Hopscotch already exists.
      return;
    }
    context[namespace] = factory();
  }
}(this, (function() {
  var Hopscotch,
      HopscotchBubble,
      HopscotchCalloutManager,
      HopscotchI18N,
      customI18N,
      customRenderer,
      customEscape,
      templateToUse = 'bubble_default',
      Sizzle = window.Sizzle || null,
      utils,
      callbacks,
      helpers,
      winLoadHandler,
      defaultOpts,
      winHopscotch,
      undefinedStr      = 'undefined',
      waitingToStart    = false, // is a tour waiting for the document to finish
                                 // loading so that it can start?
      hasJquery         = (typeof jQuery !== undefinedStr),
      hasSessionStorage = false,
      isStorageWritable = false,
      document          = window.document,
      validIdRegEx      = /^[a-zA-Z]+[a-zA-Z0-9_-]*$/,
      rtlMatches        = {
        left: 'right',
        right: 'left'
      };

  // If cookies are disabled, accessing sessionStorage can throw an error.
  // sessionStorage could also throw an error in Safari on write (even though it exists).
  // So, we'll try writing to sessionStorage to verify it's available.
  try {
    if(typeof window.sessionStorage !== undefinedStr){
      hasSessionStorage = true;
      sessionStorage.setItem('hopscotch.test.storage', 'ok');
      sessionStorage.removeItem('hopscotch.test.storage');
      isStorageWritable = true;
    }
  } catch (err) {}

  defaultOpts       = {
    smoothScroll:    true,
    scrollDuration:  1000,
    scrollTopMargin: 200,
    showCloseButton: true,
    showPrevButton:  false,
    showNextButton:  true,
    bubbleWidth:     280,
    bubblePadding:   15,
    arrowWidth:      20,
    skipIfNoElement: true,
    isRtl:           false,
    cookieName:      'hopscotch.tour.state'
  };

  if (!Array.isArray) {
    Array.isArray = function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  /**
   * Called when the page is done loading.
   *
   * @private
   */
  winLoadHandler = function() {
    if (waitingToStart) {
      winHopscotch.startTour();
    }
  };

  /**
   * utils
   * =====
   * A set of utility functions, mostly for standardizing to manipulate
   * and extract information from the DOM. Basically these are things I
   * would normally use jQuery for, but I don't want to require it for
   * this framework.
   *
   * @private
   */
  utils = {
    /**
     * addClass
     * ========
     * Adds one or more classes to a DOM element.
     *
     * @private
     */
    addClass: function(domEl, classToAdd) {
      var domClasses,
          classToAddArr,
          setClass,
          i,
          len;

      if (!domEl.className) {
        domEl.className = classToAdd;
      }
      else {
        classToAddArr = classToAdd.split(/\s+/);
        domClasses = ' ' + domEl.className + ' ';
        for (i = 0, len = classToAddArr.length; i < len; ++i) {
          if (domClasses.indexOf(' ' + classToAddArr[i] + ' ') < 0) {
            domClasses += classToAddArr[i] + ' ';
          }
        }
        domEl.className = domClasses.replace(/^\s+|\s+$/g,'');
      }
    },

    /**
     * removeClass
     * ===========
     * Remove one or more classes from a DOM element.
     *
     * @private
     */
    removeClass: function(domEl, classToRemove) {
      var domClasses,
          classToRemoveArr,
          currClass,
          i,
          len;

      classToRemoveArr = classToRemove.split(/\s+/);
      domClasses = ' ' + domEl.className + ' ';
      for (i = 0, len = classToRemoveArr.length; i < len; ++i) {
        domClasses = domClasses.replace(' ' + classToRemoveArr[i] + ' ', ' ');
      }
      domEl.className = domClasses.replace(/^\s+|\s+$/g,'');
    },

    /**
     * hasClass
     * ========
     * Determine if a given DOM element has a class.
     */
    hasClass: function(domEl, classToCheck){
      var classes;

      if(!domEl.className){ return false; }
      classes = ' ' + domEl.className + ' ';
      return (classes.indexOf(' ' + classToCheck + ' ') !== -1);
    },

    /**
     * @private
     */
    getPixelValue: function(val) {
      var valType = typeof val;
      if (valType === 'number') { return val; }
      if (valType === 'string') { return parseInt(val, 10); }
      return 0;
    },

    /**
     * Inspired by Python... returns val if it's defined, otherwise returns the default.
     *
     * @private
     */
    valOrDefault: function(val, valDefault) {
      return typeof val !== undefinedStr ? val : valDefault;
    },

    /**
     * Invokes a single callback represented by an array.
     * Example input: ["my_fn", "arg1", 2, "arg3"]
     * @private
     */
    invokeCallbackArrayHelper: function(arr) {
      // Logic for a single callback
      var fn;
      if (Array.isArray(arr)) {
        fn = helpers[arr[0]];
        if (typeof fn === 'function') {
          return fn.apply(this, arr.slice(1));
        }
      }
    },

    /**
     * Invokes one or more callbacks. Array should have at most one level of nesting.
     * Example input:
     * ["my_fn", "arg1", 2, "arg3"]
     * [["my_fn_1", "arg1", "arg2"], ["my_fn_2", "arg2-1", "arg2-2"]]
     * [["my_fn_1", "arg1", "arg2"], function() { ... }]
     * @private
     */
    invokeCallbackArray: function(arr) {
      var i, len;

      if (Array.isArray(arr)) {
        if (typeof arr[0] === 'string') {
          // Assume there are no nested arrays. This is the one and only callback.
          return utils.invokeCallbackArrayHelper(arr);
        }
        else { // assume an array
          for (i = 0, len = arr.length; i < len; ++i) {
            utils.invokeCallback(arr[i]);
          }
        }
      }
    },

    /**
     * Helper function for invoking a callback, whether defined as a function literal
     * or an array that references a registered helper function.
     * @private
     */
    invokeCallback: function(cb) {
      if (typeof cb === 'function') {
        return cb();
      }
      if (typeof cb === 'string' && helpers[cb]) { // name of a helper
        return helpers[cb]();
      }
      else { // assuming array
        return utils.invokeCallbackArray(cb);
      }
    },

    /**
     * If stepCb (the step-specific helper callback) is passed in, then invoke
     * it first. Then invoke tour-wide helper.
     *
     * @private
     */
    invokeEventCallbacks: function(evtType, stepCb) {
      var cbArr = callbacks[evtType],
          callback,
          fn,
          i,
          len;

      if (stepCb) {
        return this.invokeCallback(stepCb);
      }

      for (i=0, len=cbArr.length; i<len; ++i) {
        this.invokeCallback(cbArr[i].cb);
      }
    },

    /**
     * @private
     */
    getScrollTop: function() {
      var scrollTop;
      if (typeof window.pageYOffset !== undefinedStr) {
        scrollTop = window.pageYOffset;
      }
      else {
        // Most likely IE <=8, which doesn't support pageYOffset
        scrollTop = document.documentElement.scrollTop;
      }
      return scrollTop;
    },

    /**
     * @private
     */
    getScrollLeft: function() {
      var scrollLeft;
      if (typeof window.pageXOffset !== undefinedStr) {
        scrollLeft = window.pageXOffset;
      }
      else {
        // Most likely IE <=8, which doesn't support pageXOffset
        scrollLeft = document.documentElement.scrollLeft;
      }
      return scrollLeft;
    },

    /**
     * @private
     */
    getWindowHeight: function() {
      return window.innerHeight || document.documentElement.clientHeight;
    },

    /**
     * @private
     */
    addEvtListener: function(el, evtName, fn) {
      if(el) {
        return el.addEventListener ? el.addEventListener(evtName, fn, false) : el.attachEvent('on' + evtName, fn);
      }
    },

    /**
     * @private
     */
    removeEvtListener: function(el, evtName, fn) {
      if(el) {
        return el.removeEventListener ? el.removeEventListener(evtName, fn, false) : el.detachEvent('on' + evtName, fn);
      }
    },

    documentIsReady: function() {
      return document.readyState === 'complete';
    },

    /**
     * @private
     */
    evtPreventDefault: function(evt) {
      if (evt.preventDefault) {
        evt.preventDefault();
      }
      else if (event) {
        event.returnValue = false;
      }
    },

    /**
     * @private
     */
    extend: function(obj1, obj2) {
      var prop;
      for (prop in obj2) {
        if (obj2.hasOwnProperty(prop)) {
          obj1[prop] = obj2[prop];
        }
      }
    },

    /**
     * Helper function to get a single target DOM element. We will try to
     * locate the DOM element through several ways, in the following order:
     *
     * 1) Passing the string into document.querySelector
     * 2) Passing the string to jQuery, if it exists
     * 3) Passing the string to Sizzle, if it exists
     * 4) Calling document.getElementById if it is a plain id
     *
     * Default case is to assume the string is a plain id and call
     * document.getElementById on it.
     *
     * @private
     */
    getStepTargetHelper: function(target){
      var result = document.getElementById(target);

      //Backwards compatibility: assume the string is an id
      if (result) {
        return result;
      }
      if (hasJquery) {
        result = jQuery(target);
        return result.length ? result[0] : null;
      }
      if (Sizzle) {
        result = new Sizzle(target);
        return result.length ? result[0] : null;
      }
      if (document.querySelector) {
        try {
          return document.querySelector(target);
        } catch (err) {}
      }
      // Regex test for id. Following the HTML 4 spec for valid id formats.
      // (http://www.w3.org/TR/html4/types.html#type-id)
      if (/^#[a-zA-Z][\w-_:.]*$/.test(target)) {
        return document.getElementById(target.substring(1));
      }

      return null;
    },

    /**
     * Given a step, returns the target DOM element associated with it. It is
     * recommended to only assign one target per step. However, there are
     * some use cases which require multiple step targets to be supplied. In
     * this event, we will use the first target in the array that we can
     * locate on the page. See the comments for getStepTargetHelper for more
     * information.
     *
     * @private
     */
    getStepTarget: function(step) {
      var queriedTarget;

      if (!step || !step.target) {
        return null;
      }

      if (typeof step.target === 'string') {
        //Just one target to test. Check and return its results.
        return utils.getStepTargetHelper(step.target);
      }
      else if (Array.isArray(step.target)) {
        // Multiple items to check. Check each and return the first success.
        // Assuming they are all strings.
        var i,
            len;

        for (i = 0, len = step.target.length; i < len; i++){
          if (typeof step.target[i] === 'string') {
            queriedTarget = utils.getStepTargetHelper(step.target[i]);

            if (queriedTarget) {
              return queriedTarget;
            }
          }
        }
        return null;
      }

      // Assume that the step.target is a DOM element
      return step.target;
    },

    /**
     * Convenience method for getting an i18n string. Returns custom i18n value
     * or the default i18n value if no custom value exists.
     *
     * @private
     */
    getI18NString: function(key) {
      return customI18N[key] || HopscotchI18N[key];
    },

    // Tour session persistence for multi-page tours. Uses HTML5 sessionStorage if available, then
    // falls back to using cookies.
    //
    // The following cookie-related logic is borrowed from:
    // http://www.quirksmode.org/js/cookies.html

    /**
     * @private
     */
    setState: function(name,value,days) {
      var expires = '',
          date;

      if (hasSessionStorage && isStorageWritable) {
        try{
          sessionStorage.setItem(name, value);
        }
        catch(err){
          isStorageWritable = false;
          this.setState(name, value, days);
        }
      }
      else {
        if(hasSessionStorage){
          //Clear out existing sessionStorage key so the new value we set to cookie gets read.
          //(If we're here, we've run into an error while trying to write to sessionStorage).
          sessionStorage.removeItem(name);
        }
        if (days) {
          date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          expires = '; expires='+date.toGMTString();
        }
        document.cookie = name+'='+value+expires+'; path=/';
      }
    },

    /**
     * @private
     */
    getState: function(name) {
      var nameEQ = name + '=',
          ca = document.cookie.split(';'),
          i,
          c,
          state;

      //return value from session storage if we have it
      if (hasSessionStorage) {
        state = sessionStorage.getItem(name);
        if(state){
          return state;
        }
      }

      //else, try cookies
      for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)===' ') {c = c.substring(1,c.length);}
        if (c.indexOf(nameEQ) === 0) {
          state = c.substring(nameEQ.length,c.length);
          break;
        }
      }

      return state;
    },

    /**
     * @private
     */
    clearState: function(name) {
      if (hasSessionStorage) {
        sessionStorage.removeItem(name);
      }
      else {
        this.setState(name,'',-1);
      }
    },

    /**
     * Originally called it orientation, but placement is more intuitive.
     * Allowing both for now for backwards compatibility.
     * @private
     */
    normalizePlacement: function(step) {
      if (!step.placement && step.orientation) {
        step.placement = step.orientation;
      }
    },

    /**
     * If step is right-to-left enabled, flip the placement and xOffset, but only once.
     * @private
     */
    flipPlacement: function(step){
      if(step.isRtl && !step._isFlipped){
        var props = ['orientation', 'placement'], prop, i;
        if(step.xOffset){
          step.xOffset = -1 * this.getPixelValue(step.xOffset);
        }
        for(i in props){
          prop = props[i];
          if(step.hasOwnProperty(prop) && rtlMatches.hasOwnProperty(step[prop])) {
            step[prop] = rtlMatches[step[prop]];
          }
        }
        step._isFlipped = true;
      }
    }
  };

  utils.addEvtListener(window, 'load', winLoadHandler);

  callbacks = {
    next:  [],
    prev:  [],
    start: [],
    end:   [],
    show:  [],
    error: [],
    close: []
  };

  /**
   * helpers
   * =======
   * A map of functions to be used as callback listeners. Functions are
   * added to and removed from the map using the functions
   * Hopscotch.registerHelper() and Hopscotch.unregisterHelper().
   */
  helpers = {};

  HopscotchI18N = {
    stepNums: null,
    nextBtn: 'Next',
    prevBtn: 'Back',
    doneBtn: 'Done',
    skipBtn: 'Skip',
    closeTooltip: 'Close'
  };

  customI18N = {}; // Developer's custom i18n strings goes here.

  /**
   * HopscotchBubble
   *
   * @class The HopscotchBubble class represents the view of a bubble. This class is also used for Hopscotch callouts.
   */
  HopscotchBubble = function(opt) {
    this.init(opt);
  };

  HopscotchBubble.prototype = {
    isShowing: false,

    currStep: undefined,

    /**
     * setPosition
     *
     * Sets the position of the bubble using the bounding rectangle of the
     * target element and the orientation and offset information specified by
     * the JSON.
     */
    setPosition: function(step) {
      var bubbleBoundingHeight,
          bubbleBoundingWidth,
          boundingRect,
          top,
          left,
          arrowOffset,
          verticalLeftPosition,
          targetEl     = utils.getStepTarget(step),
          el           = this.element,
          arrowEl      = this.arrowEl,
          arrowPos     = step.isRtl ? 'right' : 'left';

      utils.flipPlacement(step);
      utils.normalizePlacement(step);

      bubbleBoundingWidth = el.offsetWidth;
      bubbleBoundingHeight = el.offsetHeight;
      utils.removeClass(el, 'fade-in-down fade-in-up fade-in-left fade-in-right');

      // SET POSITION
      boundingRect = targetEl.getBoundingClientRect();

      verticalLeftPosition = step.isRtl ? boundingRect.right - bubbleBoundingWidth : boundingRect.left;

      if (step.placement === 'top') {
        top = (boundingRect.top - bubbleBoundingHeight) - this.opt.arrowWidth;
        left = verticalLeftPosition;
      }
      else if (step.placement === 'bottom') {
        top = boundingRect.bottom + this.opt.arrowWidth;
        left = verticalLeftPosition;
      }
      else if (step.placement === 'left') {
        top = boundingRect.top;
        left = boundingRect.left - bubbleBoundingWidth - this.opt.arrowWidth;
      }
      else if (step.placement === 'right') {
        top = boundingRect.top;
        left = boundingRect.right + this.opt.arrowWidth;
      }
      else {
        throw new Error('Bubble placement failed because step.placement is invalid or undefined!');
      }

      // SET (OR RESET) ARROW OFFSETS
      if (step.arrowOffset !== 'center') {
        arrowOffset = utils.getPixelValue(step.arrowOffset);
      }
      else {
        arrowOffset = step.arrowOffset;
      }
      if (!arrowOffset) {
        arrowEl.style.top = '';
        arrowEl.style[arrowPos] = '';
      }
      else if (step.placement === 'top' || step.placement === 'bottom') {
        arrowEl.style.top = '';
        if (arrowOffset === 'center') {
          arrowEl.style[arrowPos] = Math.floor((bubbleBoundingWidth / 2) - arrowEl.offsetWidth/2) + 'px';
        }
        else {
          // Numeric pixel value
          arrowEl.style[arrowPos] = arrowOffset + 'px';
        }
      }
      else if (step.placement === 'left' || step.placement === 'right') {
        arrowEl.style[arrowPos] = '';
        if (arrowOffset === 'center') {
          arrowEl.style.top = Math.floor((bubbleBoundingHeight / 2) - arrowEl.offsetHeight/2) + 'px';
        }
        else {
          // Numeric pixel value
          arrowEl.style.top = arrowOffset + 'px';
        }
      }

      // HORIZONTAL OFFSET
      if (step.xOffset === 'center') {
        left = (boundingRect.left + targetEl.offsetWidth/2) - (bubbleBoundingWidth / 2);
      }
      else {
        left += utils.getPixelValue(step.xOffset);
      }
      // VERTICAL OFFSET
      if (step.yOffset === 'center') {
        top = (boundingRect.top + targetEl.offsetHeight/2) - (bubbleBoundingHeight / 2);
      }
      else {
        top += utils.getPixelValue(step.yOffset);
      }

      // ADJUST TOP FOR SCROLL POSITION
      if (!step.fixedElement) {
        top += utils.getScrollTop();
        left += utils.getScrollLeft();
      }

      // ACCOUNT FOR FIXED POSITION ELEMENTS
      el.style.position = (step.fixedElement ? 'fixed' : 'absolute');

      el.style.top = top + 'px';
      el.style.left = left + 'px';
    },

    /**
     * Renders the bubble according to the step JSON.
     *
     * @param {Object} step Information defining how the bubble should look.
     * @param {Number} idx The index of the step in the tour. Not used for callouts.
     * @param {Function} callback Function to be invoked after rendering is finished.
     */
    render: function(step, idx, callback) {
      var el = this.element,
          tourSpecificRenderer,
          customTourData,
          unsafe,
          currTour,
          totalSteps,
          totalStepsI18n,
          nextBtnText,
          isLast,
          i,
          opts;

      // Cache current step information.
      if (step) {
        this.currStep = step;
      }
      else if (this.currStep) {
        step = this.currStep;
      }

      // Check current tour for total number of steps and custom render data
      if(this.opt.isTourBubble){
        currTour = winHopscotch.getCurrTour();
        if(currTour){
          customTourData = currTour.customData;
          tourSpecificRenderer = currTour.customRenderer;
          step.isRtl = step.hasOwnProperty('isRtl') ? step.isRtl :
            (currTour.hasOwnProperty('isRtl') ? currTour.isRtl : this.opt.isRtl);
          unsafe = currTour.unsafe;
          if(Array.isArray(currTour.steps)){
            totalSteps = currTour.steps.length;
            totalStepsI18n = this._getStepI18nNum(this._getStepNum(totalSteps - 1));
            isLast = (this._getStepNum(idx) === this._getStepNum(totalSteps - 1));
          }
        }
      }else{
        customTourData = step.customData;
        tourSpecificRenderer = step.customRenderer;
        unsafe = step.unsafe;
        step.isRtl = step.hasOwnProperty('isRtl') ? step.isRtl : this.opt.isRtl;
      }

      // Determine label for next button
      if(isLast){
        nextBtnText = utils.getI18NString('doneBtn');
      } else if(step.showSkip) {
        nextBtnText = utils.getI18NString('skipBtn');
      } else {
        nextBtnText = utils.getI18NString('nextBtn');
      }

      utils.flipPlacement(step);
      utils.normalizePlacement(step);

      this.placement = step.placement;

      // Setup the configuration options we want to pass along to the template
      opts = {
        i18n: {
          prevBtn: utils.getI18NString('prevBtn'),
          nextBtn: nextBtnText,
          closeTooltip: utils.getI18NString('closeTooltip'),
          stepNum: this._getStepI18nNum(this._getStepNum(idx)),
          numSteps: totalStepsI18n
        },
        buttons:{
          showPrev: (utils.valOrDefault(step.showPrevButton, this.opt.showPrevButton) && (this._getStepNum(idx) > 0)),
          showNext: utils.valOrDefault(step.showNextButton, this.opt.showNextButton),
          showCTA: utils.valOrDefault((step.showCTAButton && step.ctaLabel), false),
          ctaLabel: step.ctaLabel,
          showClose: utils.valOrDefault(this.opt.showCloseButton, true)
        },
        step:{
          num: idx,
          isLast: utils.valOrDefault(isLast, false),
          title: (step.title || ''),
          content: (step.content || ''),
          isRtl: step.isRtl,
          placement: step.placement,
          padding: utils.valOrDefault(step.padding, this.opt.bubblePadding),
          width: utils.getPixelValue(step.width) || this.opt.bubbleWidth,
          customData: (step.customData || {})
        },
        tour:{
          isTour: this.opt.isTourBubble,
          numSteps: totalSteps,
          unsafe: utils.valOrDefault(unsafe, false),
          customData: (customTourData || {})
        }
      };

      // Render the bubble's content.
      // Use tour renderer if available, then the global customRenderer if defined.
      if(typeof tourSpecificRenderer === 'function'){
        el.innerHTML = tourSpecificRenderer(opts);
      }
      else if(typeof tourSpecificRenderer === 'string'){
        if(!winHopscotch.templates || (typeof winHopscotch.templates[tourSpecificRenderer] !== 'function')){
          throw new Error('Bubble rendering failed - template "' + tourSpecificRenderer + '" is not a function.');
        }
        el.innerHTML = winHopscotch.templates[tourSpecificRenderer](opts);
      }
      else if(customRenderer){
        el.innerHTML = customRenderer(opts);
      }
      else{
        if(!winHopscotch.templates || (typeof winHopscotch.templates[templateToUse] !== 'function')){
          throw new Error('Bubble rendering failed - template "' + templateToUse + '" is not a function.');
        }
        el.innerHTML = winHopscotch.templates[templateToUse](opts);
      }

      // Find arrow among new child elements.
      children = el.children;
      numChildren = children.length;
      for (i = 0; i < numChildren; i++){
        node = children[i];

        if(utils.hasClass(node, 'hopscotch-arrow')){
          this.arrowEl = node;
        }
      }

      // Set z-index and arrow placement
      el.style.zIndex = (typeof step.zindex === 'number') ? step.zindex : '';
      this._setArrow(step.placement);

      // Set bubble positioning
      // Make sure we're using visibility:hidden instead of display:none for height/width calculations.
      this.hide(false);
      this.setPosition(step);

      // only want to adjust window scroll for non-fixed elements
      if (callback) {
        callback(!step.fixedElement);
      }

      return this;
    },
    /**
     * Get step number considering steps that were skipped because their target wasn't found
     *
     * @private
     */
    _getStepNum: function(idx) {
      var skippedStepsCount = 0,
          stepIdx,
          skippedSteps = winHopscotch.getSkippedStepsIndexes(),
          i,
          len = skippedSteps.length;
      //count number of steps skipped before current step
      for(i = 0; i < len; i++) {
        stepIdx = skippedSteps[i];
        if(stepIdx<idx) {
          skippedStepsCount++;
        }
      }
      return idx - skippedStepsCount;
    },
    /**
     * Get the I18N step number for the current step.
     *
     * @private
     */
    _getStepI18nNum: function(idx) {
      var stepNumI18N = utils.getI18NString('stepNums');
      if (stepNumI18N && idx < stepNumI18N.length) {
        idx = stepNumI18N[idx];
      }
      else {
        idx = idx + 1;
      }
      return idx;
    },

    /**
     * Sets which side the arrow is on.
     *
     * @private
     */
    _setArrow: function(placement) {
      utils.removeClass(this.arrowEl, 'down up right left');

      // Whatever the orientation is, we want to arrow to appear
      // "opposite" of the orientation. E.g., a top orientation
      // requires a bottom arrow.
      if (placement === 'top') {
        utils.addClass(this.arrowEl, 'down');
      }
      else if (placement === 'bottom') {
        utils.addClass(this.arrowEl, 'up');
      }
      else if (placement === 'left') {
        utils.addClass(this.arrowEl, 'right');
      }
      else if (placement === 'right') {
        utils.addClass(this.arrowEl, 'left');
      }
    },

    /**
     * @private
     */
    _getArrowDirection: function() {
      if (this.placement === 'top') {
        return 'down';
      }
      if (this.placement === 'bottom') {
        return 'up';
      }
      if (this.placement === 'left') {
        return 'right';
      }
      if (this.placement === 'right') {
        return 'left';
      }
    },

    show: function() {
      var self      = this,
          fadeClass = 'fade-in-' + this._getArrowDirection(),
          fadeDur   = 1000;

      utils.removeClass(this.element, 'hide');
      utils.addClass(this.element, fadeClass);
      setTimeout(function() {
        utils.removeClass(self.element, 'invisible');
      }, 50);
      setTimeout(function() {
        utils.removeClass(self.element, fadeClass);
      }, fadeDur);
      this.isShowing = true;
      return this;
    },

    hide: function(remove) {
      var el = this.element;

      remove = utils.valOrDefault(remove, true);
      el.style.top = '';
      el.style.left = '';

      // display: none
      if (remove) {
        utils.addClass(el, 'hide');
        utils.removeClass(el, 'invisible');
      }
      // opacity: 0
      else {
        utils.removeClass(el, 'hide');
        utils.addClass(el, 'invisible');
      }
      utils.removeClass(el, 'animate fade-in-up fade-in-down fade-in-right fade-in-left');
      this.isShowing = false;
      return this;
    },

    destroy: function() {
      var el = this.element;

      if (el) {
        el.parentNode.removeChild(el);
      }
      utils.removeEvtListener(el, 'click', this.clickCb);
    },

    _handleBubbleClick: function(evt){
      var action;

      // Override evt for IE8 as IE8 doesn't pass event but binds it to window
      evt = evt || window.event; // get window.event if argument is falsy (in IE)

      // get srcElement if target is falsy (IE)
      var targetElement = evt.target || evt.srcElement;

      //Recursively look up the parent tree until we find a match
      //with one of the classes we're looking for, or the triggering element.
      function findMatchRecur(el){
        /* We're going to make the assumption that we're not binding
         * multiple event classes to the same element.
         * (next + previous = wait... err... what?)
         *
         * In the odd event we end up with an element with multiple
         * possible matches, the following priority order is applied:
         * hopscotch-cta, hopscotch-next, hopscotch-prev, hopscotch-close
         */
         if(el === evt.currentTarget){ return null; }
         if(utils.hasClass(el, 'hopscotch-cta')){ return 'cta'; }
         if(utils.hasClass(el, 'hopscotch-next')){ return 'next'; }
         if(utils.hasClass(el, 'hopscotch-prev')){ return 'prev'; }
         if(utils.hasClass(el, 'hopscotch-close')){ return 'close'; }
         /*else*/ return findMatchRecur(el.parentElement);
      }

      action = findMatchRecur(targetElement);

      //Now that we know what action we should take, let's take it.
      if (action === 'cta'){
        if (!this.opt.isTourBubble) {
          // This is a callout. Close the callout when CTA is clicked.
          winHopscotch.getCalloutManager().removeCallout(this.currStep.id);
        }
        // Call onCTA callback if one is provided
        if (this.currStep.onCTA) {
          utils.invokeCallback(this.currStep.onCTA);
        }
      }
      else if (action === 'next'){
        winHopscotch.nextStep(true);
      }
      else if (action === 'prev'){
        winHopscotch.prevStep(true);
      }
      else if (action === 'close'){
        if (this.opt.isTourBubble){
          var currStepNum   = winHopscotch.getCurrStepNum(),
              currTour      = winHopscotch.getCurrTour(),
              doEndCallback = (currStepNum === currTour.steps.length-1);

          utils.invokeEventCallbacks('close');

          winHopscotch.endTour(true, doEndCallback);
        } else {
          if (this.opt.onClose) {
            utils.invokeCallback(this.opt.onClose);
          }
          if (this.opt.id && !this.opt.isTourBubble) {
            // Remove via the HopscotchCalloutManager.
            // removeCallout() calls HopscotchBubble.destroy internally.
            winHopscotch.getCalloutManager().removeCallout(this.opt.id);
          }
          else {
            this.destroy();
          }
        }

        utils.evtPreventDefault(evt);
      }
      //Otherwise, do nothing. We didn't click on anything relevant.
    },

    init: function(initOpt) {
      var el              = document.createElement('div'),
          self            = this,
          resizeCooldown  = false, // for updating after window resize
          onWinResize,
          appendToBody,
          children,
          numChildren,
          node,
          i,
          currTour,
          opt;

      //Register DOM element for this bubble.
      this.element = el;

      //Merge bubble options with defaults.
      opt = {
        showPrevButton: defaultOpts.showPrevButton,
        showNextButton: defaultOpts.showNextButton,
        bubbleWidth:    defaultOpts.bubbleWidth,
        bubblePadding:  defaultOpts.bubblePadding,
        arrowWidth:     defaultOpts.arrowWidth,
        isRtl:          defaultOpts.isRtl,
        showNumber:     true,
        isTourBubble:   true
      };
      initOpt = (typeof initOpt === undefinedStr ? {} : initOpt);
      utils.extend(opt, initOpt);
      this.opt = opt;

      //Apply classes to bubble. Add "animated" for fade css animation
      el.className = 'hopscotch-bubble animated';
      if (!opt.isTourBubble) {
        utils.addClass(el, 'hopscotch-callout no-number');
      } else {
        currTour = winHopscotch.getCurrTour();
        if(currTour){
          utils.addClass(el, 'tour-' + currTour.id);
        }
      }

      /**
       * Not pretty, but IE8 doesn't support Function.bind(), so I'm
       * relying on closures to keep a handle of "this".
       * Reset position of bubble when window is resized
       *
       * @private
       */
      onWinResize = function() {
        if (resizeCooldown || !self.isShowing) {
          return;
        }

        resizeCooldown = true;
        setTimeout(function() {
          self.setPosition(self.currStep);
          resizeCooldown = false;
        }, 100);
      };

      //Add listener to reset bubble position on window resize
      utils.addEvtListener(window, 'resize', onWinResize);

      //Create our click callback handler and keep a
      //reference to it for later.
      this.clickCb = function(evt){
        self._handleBubbleClick(evt);
      };
      utils.addEvtListener(el, 'click', this.clickCb);

      //Hide the bubble by default
      this.hide();

      //Finally, append our new bubble to body once the DOM is ready.
      if (utils.documentIsReady()) {
        document.body.appendChild(el);
      }
      else {
        // Moz, webkit, Opera
        if (document.addEventListener) {
          appendToBody = function() {
            document.removeEventListener('DOMContentLoaded', appendToBody);
            window.removeEventListener('load', appendToBody);

            document.body.appendChild(el);
          };

          document.addEventListener('DOMContentLoaded', appendToBody, false);
        }
        // IE
        else {
          appendToBody = function() {
            if (document.readyState === 'complete') {
              document.detachEvent('onreadystatechange', appendToBody);
              window.detachEvent('onload', appendToBody);
              document.body.appendChild(el);
            }
          };

          document.attachEvent('onreadystatechange', appendToBody);
        }
        utils.addEvtListener(window, 'load', appendToBody);
      }
    }
  };

  /**
   * HopscotchCalloutManager
   *
   * @class Manages the creation and destruction of single callouts.
   * @constructor
   */
  HopscotchCalloutManager = function() {
    var callouts = {},
        calloutOpts = {};

    /**
     * createCallout
     *
     * Creates a standalone callout. This callout has the same API
     * as a Hopscotch tour bubble.
     *
     * @param {Object} opt The options for the callout. For the most
     * part, these are the same options as you would find in a tour
     * step.
     */
    this.createCallout = function(opt) {
      var callout;

      if (opt.id) {
        if(!validIdRegEx.test(opt.id)) {
          throw new Error('Callout ID is using an invalid format. Use alphanumeric, underscores, and/or hyphens only. First character must be a letter.');
        }
        if (callouts[opt.id]) {
          throw new Error('Callout by that id already exists. Please choose a unique id.');
        }
        if (!utils.getStepTarget(opt)) {
          throw new Error('Must specify existing target element via \'target\' option.');
        }
        opt.showNextButton = opt.showPrevButton = false;
        opt.isTourBubble = false;
        callout = new HopscotchBubble(opt);
        callouts[opt.id] = callout;
        calloutOpts[opt.id] = opt;
        callout.render(opt, null, function() {
          callout.show();
          if (opt.onShow) {
            utils.invokeCallback(opt.onShow);
          }
        });
      }
      else {
        throw new Error('Must specify a callout id.');
      }
      return callout;
    };

    /**
     * getCallout
     *
     * Returns a callout by its id.
     *
     * @param {String} id The id of the callout to fetch.
     * @returns {Object} HopscotchBubble
     */
    this.getCallout = function(id) {
      return callouts[id];
    };

    /**
     * removeAllCallouts
     *
     * Removes all existing callouts.
     */
    this.removeAllCallouts = function() {
      var calloutId;

      for (calloutId in callouts) {
        if (callouts.hasOwnProperty(calloutId)) {
          this.removeCallout(calloutId);
        }
      }
    };

    /**
     * removeCallout
     *
     * Removes an existing callout by id.
     *
     * @param {String} id The id of the callout to remove.
     */
    this.removeCallout = function(id) {
      var callout = callouts[id];

      callouts[id] = null;
      calloutOpts[id] = null;
      if (!callout) { return; }

      callout.destroy();
    };

    /**
     * refreshCalloutPositions
     *
     * Refresh the positions for all callouts known by the
     * callout manager. Typically you'll use
     * hopscotch.refreshBubblePosition() to refresh ALL
     * bubbles instead of calling this directly.
     */
    this.refreshCalloutPositions = function(){
      var calloutId,
          callout,
          opts;

      for (calloutId in callouts) {
        if (callouts.hasOwnProperty(calloutId) && calloutOpts.hasOwnProperty(calloutId)) {
          callout = callouts[calloutId];
          opts = calloutOpts[calloutId];
          if(callout && opts){
            callout.setPosition(opts);
          }
        }
      }
    };
  };

  /**
   * Hopscotch
   *
   * @class Creates the Hopscotch object. Used to manage tour progress and configurations.
   * @constructor
   * @param {Object} initOptions Options to be passed to `configure()`.
   */
  Hopscotch = function(initOptions) {
    var self       = this, // for targetClickNextFn
        bubble,
        calloutMgr,
        opt,
        currTour,
        currStepNum,
        skippedSteps = {},
        cookieTourId,
        cookieTourStep,
        cookieSkippedSteps = [],
        _configure,

    /**
     * getBubble
     *
     * Singleton accessor function for retrieving or creating bubble object.
     *
     * @private
     * @param setOptions {Boolean} when true, transfers configuration options to the bubble
     * @returns {Object} HopscotchBubble
     */
    getBubble = function(setOptions) {
      if (!bubble || !bubble.element || !bubble.element.parentNode) {
        bubble = new HopscotchBubble(opt);
      }
      if (setOptions) {
        utils.extend(bubble.opt, {
          bubblePadding:   getOption('bubblePadding'),
          bubbleWidth:     getOption('bubbleWidth'),
          showNextButton:  getOption('showNextButton'),
          showPrevButton:  getOption('showPrevButton'),
          showCloseButton: getOption('showCloseButton'),
          arrowWidth:      getOption('arrowWidth'),
          isRtl:           getOption('isRtl')
        });
      }
      return bubble;
    },

    /**
     * Destroy the bubble currently associated with Hopscotch.
     * This is done when we end the current tour.
     *
     * @private
     */
    destroyBubble = function() {
      if(bubble){
        bubble.destroy();
        bubble = null;
      }
    },

    /**
     * Convenience method for getting an option. Returns custom config option
     * or the default config option if no custom value exists.
     *
     * @private
     * @param name {String} config option name
     * @returns {Object} config option value
     */
    getOption = function(name) {
      if (typeof opt === 'undefined') {
        return defaultOpts[name];
      }
      return utils.valOrDefault(opt[name], defaultOpts[name]);
    },

    /**
     * getCurrStep
     *
     * @private
     * @returns {Object} the step object corresponding to the current value of currStepNum
     */
    getCurrStep = function() {
      var step;

      if (!currTour || currStepNum < 0 || currStepNum >= currTour.steps.length) {
        step = null;
      }
      else {
        step = currTour.steps[currStepNum];
      }

      return step;
    },

    /**
     * Used for nextOnTargetClick
     *
     * @private
     */
    targetClickNextFn = function() {
      self.nextStep();
    },

    /**
     * adjustWindowScroll
     *
     * Checks if the bubble or target element is partially or completely
     * outside of the viewport. If it is, adjust the window scroll position
     * to bring it back into the viewport.
     *
     * @private
     * @param {Function} cb Callback to invoke after done scrolling.
     */
    adjustWindowScroll = function(cb) {
      var bubble         = getBubble(),

          // Calculate the bubble element top and bottom position
          bubbleEl       = bubble.element,
          bubbleTop      = utils.getPixelValue(bubbleEl.style.top),
          bubbleBottom   = bubbleTop + utils.getPixelValue(bubbleEl.offsetHeight),

          // Calculate the target element top and bottom position
          targetEl       = utils.getStepTarget(getCurrStep()),
          targetBounds   = targetEl.getBoundingClientRect(),
          targetElTop    = targetBounds.top + utils.getScrollTop(),
          targetElBottom = targetBounds.bottom + utils.getScrollTop(),

          // The higher of the two: bubble or target
          targetTop      = (bubbleTop < targetElTop) ? bubbleTop : targetElTop,
          // The lower of the two: bubble or target
          targetBottom   = (bubbleBottom > targetElBottom) ? bubbleBottom : targetElBottom,

          // Calculate the current viewport top and bottom
          windowTop      = utils.getScrollTop(),
          windowBottom   = windowTop + utils.getWindowHeight(),

          // This is our final target scroll value.
          scrollToVal    = targetTop - getOption('scrollTopMargin'),

          scrollEl,
          yuiAnim,
          yuiEase,
          direction,
          scrollIncr,
          scrollTimeout,
          scrollTimeoutFn;

      // Target and bubble are both visible in viewport
      if (targetTop >= windowTop && (targetTop <= windowTop + getOption('scrollTopMargin') || targetBottom <= windowBottom)) {
        if (cb) { cb(); } // HopscotchBubble.show
      }

      // Abrupt scroll to scroll target
      else if (!getOption('smoothScroll')) {
        window.scrollTo(0, scrollToVal);

        if (cb) { cb(); } // HopscotchBubble.show
      }

      // Smooth scroll to scroll target
      else {
        // Use YUI if it exists
        if (typeof YAHOO             !== undefinedStr &&
            typeof YAHOO.env         !== undefinedStr &&
            typeof YAHOO.env.ua      !== undefinedStr &&
            typeof YAHOO.util        !== undefinedStr &&
            typeof YAHOO.util.Scroll !== undefinedStr) {
          scrollEl = YAHOO.env.ua.webkit ? document.body : document.documentElement;
          yuiEase = YAHOO.util.Easing ? YAHOO.util.Easing.easeOut : undefined;
          yuiAnim = new YAHOO.util.Scroll(scrollEl, {
            scroll: { to: [0, scrollToVal] }
          }, getOption('scrollDuration')/1000, yuiEase);
          yuiAnim.onComplete.subscribe(cb);
          yuiAnim.animate();
        }

        // Use jQuery if it exists
        else if (hasJquery) {
          jQuery('body, html').animate({ scrollTop: scrollToVal }, getOption('scrollDuration'), cb);
        }

        // Use my crummy setInterval scroll solution if we're using plain, vanilla Javascript.
        else {
          if (scrollToVal < 0) {
            scrollToVal = 0;
          }

          // 48 * 10 == 480ms scroll duration
          // make it slightly less than CSS transition duration because of
          // setInterval overhead.
          // To increase or decrease duration, change the divisor of scrollIncr.
          direction = (windowTop > targetTop) ? -1 : 1; // -1 means scrolling up, 1 means down
          scrollIncr = Math.abs(windowTop - scrollToVal) / (getOption('scrollDuration')/10);
          scrollTimeoutFn = function() {
            var scrollTop = utils.getScrollTop(),
                scrollTarget = scrollTop + (direction * scrollIncr);

            if ((direction > 0 && scrollTarget >= scrollToVal) ||
                (direction < 0 && scrollTarget <= scrollToVal)) {
              // Overshot our target. Just manually set to equal the target
              // and clear the interval
              scrollTarget = scrollToVal;
              if (cb) { cb(); } // HopscotchBubble.show
              window.scrollTo(0, scrollTarget);
              return;
            }

            window.scrollTo(0, scrollTarget);

            if (utils.getScrollTop() === scrollTop) {
              // Couldn't scroll any further.
              if (cb) { cb(); } // HopscotchBubble.show
              return;
            }

            // If we reached this point, that means there's still more to scroll.
            setTimeout(scrollTimeoutFn, 10);
          };

          scrollTimeoutFn();
        }
      }
    },

    /**
     * goToStepWithTarget
     *
     * Helper function to increment the step number until a step is found where
     * the step target exists or until we reach the end/beginning of the tour.
     *
     * @private
     * @param {Number} direction Either 1 for incrementing or -1 for decrementing
     * @param {Function} cb The callback function to be invoked when the step has been found
     */
    goToStepWithTarget = function(direction, cb) {
      var target,
          step,
          goToStepFn;

      if (currStepNum + direction >= 0 &&
          currStepNum + direction < currTour.steps.length) {

        currStepNum += direction;
        step = getCurrStep();

        goToStepFn = function() {
          target = utils.getStepTarget(step);

          if (target) {
            //this step was previously skipped, but now its target exists,
            //remove this step from skipped steps set
            if(skippedSteps[currStepNum]) {
              delete skippedSteps[currStepNum];
            }
            // We're done! Return the step number via the callback.
            cb(currStepNum);
          }
          else {
            //mark this step as skipped, since its target wasn't found
            skippedSteps[currStepNum] = true;
            // Haven't found a valid target yet. Recursively call
            // goToStepWithTarget.
            utils.invokeEventCallbacks('error');
            goToStepWithTarget(direction, cb);
          }
        };

        if (step.delay) {
          setTimeout(goToStepFn, step.delay);
        }
        else {
          goToStepFn();
        }
      }
      else {
        cb(-1); // signal that we didn't find any step with a valid target
      }
    },

    /**
     * changeStep
     *
     * Helper function to change step by going forwards or backwards 1.
     * nextStep and prevStep are publicly accessible wrappers for this function.
     *
     * @private
     * @param {Boolean} doCallbacks Flag for invoking onNext or onPrev callbacks
     * @param {Number} direction Either 1 for "next" or -1 for "prev"
     */
    changeStep = function(doCallbacks, direction) {
      var bubble = getBubble(),
          self = this,
          step,
          origStep,
          wasMultiPage,
          changeStepCb;

      bubble.hide();

      doCallbacks = utils.valOrDefault(doCallbacks, true);

      step = getCurrStep();

      if (step.nextOnTargetClick) {
        // Detach the listener when tour is moving to a different step
        utils.removeEvtListener(utils.getStepTarget(step), 'click', targetClickNextFn);
      }

      origStep = step;
      if (direction > 0) {
        wasMultiPage = origStep.multipage;
      }
      else {
        wasMultiPage = (currStepNum > 0 && currTour.steps[currStepNum-1].multipage);
      }

      /**
       * Callback for goToStepWithTarget
       *
       * @private
       */
      changeStepCb = function(stepNum) {
        var doShowFollowingStep;

        if (stepNum === -1) {
          // Wasn't able to find a step with an existing element. End tour.
          return this.endTour(true);
        }

        if (doCallbacks) {
          if (direction > 0) {
            doShowFollowingStep = utils.invokeEventCallbacks('next', origStep.onNext);
          }
          else {
            doShowFollowingStep = utils.invokeEventCallbacks('prev', origStep.onPrev);
          }
        }

        // If the state of the tour is updated in a callback, assume the client
        // doesn't want to go to next step since they specifically updated.
        if (stepNum !== currStepNum) {
          return;
        }

        if (wasMultiPage) {
          // Update state for the next page
           setStateHelper();

          // Next step is on a different page, so no need to attempt to render it.
          return;
        }

        doShowFollowingStep = utils.valOrDefault(doShowFollowingStep, true);

        // If the onNext/onPrev callback returned false, halt the tour and
        // don't show the next step.
        if (doShowFollowingStep) {
          this.showStep(stepNum);
        }
        else {
          // Halt tour (but don't clear state)
          this.endTour(false);
        }
      };

      if (!wasMultiPage && getOption('skipIfNoElement')) {
        goToStepWithTarget(direction, function(stepNum) {
          changeStepCb.call(self, stepNum);
        });
      }
      else if (currStepNum + direction >= 0 && currStepNum + direction < currTour.steps.length) {
        // only try incrementing once, and invoke error callback if no target is found
        currStepNum += direction;
        step = getCurrStep();
        if (!utils.getStepTarget(step) && !wasMultiPage) {
          utils.invokeEventCallbacks('error');
          return this.endTour(true, false);
        }
        changeStepCb.call(this, currStepNum);
      } else if (currStepNum + direction === currTour.steps.length) {
        return this.endTour();
      }

      return this;
    },

    /**
     * loadTour
     *
     * Loads, but does not display, tour.
     *
     * @private
     * @param tour The tour JSON object
     */
    loadTour = function(tour) {
      var tmpOpt = {},
          prop,
          tourState,
          tourStateValues;

      // Set tour-specific configurations
      for (prop in tour) {
        if (tour.hasOwnProperty(prop) &&
            prop !== 'id' &&
            prop !== 'steps') {
          tmpOpt[prop] = tour[prop];
        }
      }

      //this.resetDefaultOptions(); // reset all options so there are no surprises
      // TODO check number of config properties of tour
      _configure.call(this, tmpOpt, true);

      // Get existing tour state, if it exists.
      tourState = utils.getState(getOption('cookieName'));
      if (tourState) {
        tourStateValues     = tourState.split(':');
        cookieTourId        = tourStateValues[0]; // selecting tour is not supported by this framework.
        cookieTourStep      = tourStateValues[1];

        if(tourStateValues.length > 2) {
          cookieSkippedSteps = tourStateValues[2].split(',');
        }

        cookieTourStep    = parseInt(cookieTourStep, 10);
      }

      return this;
    },

    /**
     * Find the first step to show for a tour. (What is the first step with a
     * target on the page?)
     */
    findStartingStep = function(startStepNum, savedSkippedSteps, cb) {
      var step,
          target;

      currStepNum = startStepNum || 0;
      skippedSteps = savedSkippedSteps || {};
      step        = getCurrStep();
      target      = utils.getStepTarget(step);

      if (target) {
        // First step had an existing target.
        cb(currStepNum);
        return;
      }

      if (!target) {
        // Previous target doesn't exist either. The user may have just
        // clicked on a link that wasn't part of the tour. Another possibility is that
        // the user clicked on the correct link, but the target is just missing for
        // whatever reason. In either case, we should just advance until we find a step
        // that has a target on the page or end the tour if we can't find such a step.
        utils.invokeEventCallbacks('error');

        //this step was skipped, since its target does not exist
        skippedSteps[currStepNum] = true;

        if (getOption('skipIfNoElement')) {
          goToStepWithTarget(1, cb);
          return;
        }
        else {
          currStepNum = -1;
          cb(currStepNum);
        }
      }
    },

    showStepHelper = function(stepNum) {
      var step         = currTour.steps[stepNum],
          bubble       = getBubble(),
          targetEl     = utils.getStepTarget(step);

      function showBubble() {
        bubble.show();
        utils.invokeEventCallbacks('show', step.onShow);
      }

      if (currStepNum !== stepNum && getCurrStep().nextOnTargetClick) {
        // Detach the listener when tour is moving to a different step
        utils.removeEvtListener(utils.getStepTarget(getCurrStep()), 'click', targetClickNextFn);
      }

      // Update bubble for current step
      currStepNum = stepNum;

      bubble.hide(false);

      bubble.render(step, stepNum, function(adjustScroll) {
        // when done adjusting window scroll, call showBubble helper fn
        if (adjustScroll) {
          adjustWindowScroll(showBubble);
        }
        else {
          showBubble();
        }

        // If we want to advance to next step when user clicks on target.
        if (step.nextOnTargetClick) {
          utils.addEvtListener(targetEl, 'click', targetClickNextFn);
        }
      });

      setStateHelper();
    },

    setStateHelper = function() {
      var cookieVal = currTour.id + ':' + currStepNum,
        skipedStepIndexes = winHopscotch.getSkippedStepsIndexes();

      if(skipedStepIndexes && skipedStepIndexes.length > 0) {
        cookieVal += ':' + skipedStepIndexes.join(',');
      }

      utils.setState(getOption('cookieName'), cookieVal, 1);
    },

    /**
     * init
     *
     * Initializes the Hopscotch object.
     *
     * @private
     */
    init = function(initOptions) {
      if (initOptions) {
        //initOptions.cookieName = initOptions.cookieName || 'hopscotch.tour.state';
        this.configure(initOptions);
      }
    };

    /**
     * getCalloutManager
     *
     * Gets the callout manager.
     *
     * @returns {Object} HopscotchCalloutManager
     *
     */
    this.getCalloutManager = function() {
      if (typeof calloutMgr === undefinedStr) {
        calloutMgr = new HopscotchCalloutManager();
      }

      return calloutMgr;
    };

    /**
     * startTour
     *
     * Begins the tour.
     *
     * @param {Object} tour The tour JSON object
     * @stepNum {Number} stepNum __Optional__ The step number to start from
     * @returns {Object} Hopscotch
     *
     */
    this.startTour = function(tour, stepNum) {
      var bubble,
          currStepNum,
          skippedSteps = {},
          self = this;

      // loadTour if we are calling startTour directly. (When we call startTour
      // from window onLoad handler, we'll use currTour)
      if (!currTour) {
        
        // Sanity check! Is there a tour?
        if(!tour){
          throw new Error('Tour data is required for startTour.');
        }

        // Check validity of tour ID. If invalid, throw an error.
        if(!tour.id || !validIdRegEx.test(tour.id)) {
          throw new Error('Tour ID is using an invalid format. Use alphanumeric, underscores, and/or hyphens only. First character must be a letter.');
        }

        currTour = tour;
        loadTour.call(this, tour);

      }

      if (typeof stepNum !== undefinedStr) {
        if (stepNum >= currTour.steps.length) {
          throw new Error('Specified step number out of bounds.');
        }
        currStepNum = stepNum;
      }

      // If document isn't ready, wait for it to finish loading.
      // (so that we can calculate positioning accurately)
      if (!utils.documentIsReady()) {
        waitingToStart = true;
        return this;
      }

      if (typeof currStepNum === "undefined" && currTour.id === cookieTourId && typeof cookieTourStep !== undefinedStr) {
        currStepNum = cookieTourStep;
        if(cookieSkippedSteps.length > 0){
          for(var i = 0, len = cookieSkippedSteps.length; i < len; i++) {
            skippedSteps[cookieSkippedSteps[i]] = true;
          }
        }
      }
      else if (!currStepNum) {
        currStepNum = 0;
      }

      // Find the current step we should begin the tour on, and then actually start the tour.
      findStartingStep(currStepNum, skippedSteps, function(stepNum) {
        var target = (stepNum !== -1) && utils.getStepTarget(currTour.steps[stepNum]);

        if (!target) {
          // Should we trigger onEnd callback? Let's err on the side of caution
          // and not trigger it. Don't want weird stuff happening on a page that
          // wasn't meant for the tour. Up to the developer to fix their tour.
          self.endTour(false, false);
          return;
        }

        utils.invokeEventCallbacks('start');

        bubble = getBubble();
        // TODO: do we still need this call to .hide()? No longer using opt.animate...
        // Leaving it in for now to play it safe
        bubble.hide(false); // make invisible for boundingRect calculations when opt.animate == true

        self.isActive = true;

        if (!utils.getStepTarget(getCurrStep())) {
          // First step element doesn't exist
          utils.invokeEventCallbacks('error');
          if (getOption('skipIfNoElement')) {
            self.nextStep(false);
          }
        }
        else {
          self.showStep(stepNum);
        }
      });

      return this;
    };

    /**
     * showStep
     *
     * Skips to a specific step and renders the corresponding bubble.
     *
     * @stepNum {Number} stepNum The step number to show
     * @returns {Object} Hopscotch
     */
    this.showStep = function(stepNum) {
      var step = currTour.steps[stepNum],
          prevStepNum = currStepNum;
      if(!utils.getStepTarget(step)) {
        currStepNum = stepNum;
        utils.invokeEventCallbacks('error');
        currStepNum = prevStepNum;
        return;
      }

      if (step.delay) {
        setTimeout(function() {
          showStepHelper(stepNum);
        }, step.delay);
      }
      else {
        showStepHelper(stepNum);
      }
      return this;
    };

    /**
     * prevStep
     *
     * Jump to the previous step.
     *
     * @param {Boolean} doCallbacks Flag for invoking onPrev callback. Defaults to true.
     * @returns {Object} Hopscotch
     */
    this.prevStep = function(doCallbacks) {
      changeStep.call(this, doCallbacks, -1);
      return this;
    };

    /**
     * nextStep
     *
     * Jump to the next step.
     *
     * @param {Boolean} doCallbacks Flag for invoking onNext callback. Defaults to true.
     * @returns {Object} Hopscotch
     */
    this.nextStep = function(doCallbacks) {
      changeStep.call(this, doCallbacks, 1);
      return this;
    };

    /**
     * endTour
     *
     * Cancels out of an active tour.
     *
     * @param {Boolean} clearState Flag for clearing state. Defaults to true.
     * @param {Boolean} doCallbacks Flag for invoking 'onEnd' callbacks. Defaults to true.
     * @returns {Object} Hopscotch
     */
    this.endTour = function(clearState, doCallbacks) {
      var bubble     = getBubble(),
        currentStep;

      clearState     = utils.valOrDefault(clearState, true);
      doCallbacks    = utils.valOrDefault(doCallbacks, true);

      //remove event listener if current step had it added
      if(currTour) {
        currentStep = getCurrStep();
        if(currentStep && currentStep.nextOnTargetClick) {
          utils.removeEvtListener(utils.getStepTarget(currentStep), 'click', targetClickNextFn);
        }
      }

      currStepNum    = 0;
      cookieTourStep = undefined;

      bubble.hide();
      if (clearState) {
        utils.clearState(getOption('cookieName'));
      }
      if (this.isActive) {
        this.isActive = false;

        if (currTour && doCallbacks) {
          utils.invokeEventCallbacks('end');
        }
      }

      this.removeCallbacks(null, true);
      this.resetDefaultOptions();
      destroyBubble();

      currTour = null;

      return this;
    };

    /**
     * getCurrTour
     *
     * @return {Object} The currently loaded tour.
     */
    this.getCurrTour = function() {
      return currTour;
    };

    /**
     * getCurrTarget
     *
     * @return {Object} The currently visible target.
     */
    this.getCurrTarget = function() {
      return utils.getStepTarget(getCurrStep());
    };

    /**
     * getCurrStepNum
     *
     * @return {number} The current zero-based step number.
     */
    this.getCurrStepNum = function() {
      return currStepNum;
    };

    /**
     * getSkippedStepsIndexes
     *
     * @return {Array} Array of skipped step indexes
     */
    this.getSkippedStepsIndexes = function() {
      var skippedStepsIdxArray = [],
         stepIds;

      for(stepIds in skippedSteps){
        skippedStepsIdxArray.push(stepIds);
      }

      return skippedStepsIdxArray;
    };

    /**
     * refreshBubblePosition
     *
     * Tell hopscotch that the position of the current tour element changed
     * and the bubble therefore needs to be redrawn. Also refreshes position
     * of all Hopscotch Callouts on the page.
     *
     * @returns {Object} Hopscotch
     */
    this.refreshBubblePosition = function() {
      var currStep = getCurrStep();
      if(currStep){
        getBubble().setPosition(currStep);
      }
      this.getCalloutManager().refreshCalloutPositions();
      return this;
    };

    /**
     * listen
     *
     * Adds a callback for one of the event types. Valid event types are:
     *
     * @param {string} evtType "start", "end", "next", "prev", "show", "close", or "error"
     * @param {Function} cb The callback to add.
     * @param {Boolean} isTourCb Flag indicating callback is from a tour definition.
     *    For internal use only!
     * @returns {Object} Hopscotch
     */
    this.listen = function(evtType, cb, isTourCb) {
      if (evtType) {
        callbacks[evtType].push({ cb: cb, fromTour: isTourCb });
      }
      return this;
    };

    /**
     * unlisten
     *
     * Removes a callback for one of the event types, e.g. 'start', 'next', etc.
     *
     * @param {string} evtType "start", "end", "next", "prev", "show", "close", or "error"
     * @param {Function} cb The callback to remove.
     * @returns {Object} Hopscotch
     */
    this.unlisten = function(evtType, cb) {
      var evtCallbacks = callbacks[evtType],
          i,
          len;

      for (i = 0, len = evtCallbacks.length; i < len; ++i) {
        if (evtCallbacks[i].cb === cb) {
          evtCallbacks.splice(i, 1);
        }
      }
      return this;
    };

    /**
     * removeCallbacks
     *
     * Remove callbacks for hopscotch events. If tourOnly is set to true, only
     * removes callbacks specified by a tour (callbacks set by external calls
     * to hopscotch.configure or hopscotch.listen will not be removed). If
     * evtName is null or undefined, callbacks for all events will be removed.
     *
     * @param {string} evtName Optional Event name for which we should remove callbacks
     * @param {boolean} tourOnly Optional flag to indicate we should only remove callbacks added
     *    by a tour. Defaults to false.
     * @returns {Object} Hopscotch
     */
    this.removeCallbacks = function(evtName, tourOnly) {
      var cbArr,
          i,
          len,
          evt;

      // If evtName is null or undefined, remove callbacks for all events.
      for (evt in callbacks) {
        if (!evtName || evtName === evt) {
          if (tourOnly) {
            cbArr = callbacks[evt];
            for (i=0, len=cbArr.length; i < len; ++i) {
              if (cbArr[i].fromTour) {
                cbArr.splice(i--, 1);
                --len;
              }
            }
          }
          else {
            callbacks[evt] = [];
          }
        }
      }
      return this;
    };

    /**
     * registerHelper
     * ==============
     * Registers a helper function to be used as a callback function.
     *
     * @param {String} id The id of the function.
     * @param {Function} id The callback function.
     */
    this.registerHelper = function(id, fn) {
      if (typeof id === 'string' && typeof fn === 'function') {
        helpers[id] = fn;
      }
    };

    this.unregisterHelper = function(id) {
      helpers[id] = null;
    };

    this.invokeHelper = function(id) {
      var args = [],
          i,
          len;

      for (i = 1, len = arguments.length; i < len; ++i) {
        args.push(arguments[i]);
      }
      if (helpers[id]) {
        helpers[id].call(null, args);
      }
    };

    /**
     * setCookieName
     *
     * Sets the cookie name (or sessionStorage name, if supported) used for multi-page
     * tour persistence.
     *
     * @param {String} name The cookie name
     * @returns {Object} Hopscotch
     */
    this.setCookieName = function(name) {
      opt.cookieName = name;
      return this;
    };

    /**
     * resetDefaultOptions
     *
     * Resets all configuration options to default.
     *
     * @returns {Object} Hopscotch
     */
    this.resetDefaultOptions = function() {
      opt = {};
      return this;
    };

    /**
     * resetDefaultI18N
     *
     * Resets all i18n.
     *
     * @returns {Object} Hopscotch
     */
    this.resetDefaultI18N = function() {
      customI18N = {};
      return this;
    };

    /**
     * hasState
     *
     * Returns state from a previous tour run, if it exists.
     *
     * @returns {String} State of previous tour run, or empty string if none exists.
     */
    this.getState = function() {
      return utils.getState(getOption('cookieName'));
    };

    /**
     * _configure
     *
     * @see this.configure
     * @private
     * @param options
     * @param {Boolean} isTourOptions Should be set to true when setting options from a tour definition.
     */
    _configure = function(options, isTourOptions) {
      var bubble,
          events = ['next', 'prev', 'start', 'end', 'show', 'error', 'close'],
          eventPropName,
          callbackProp,
          i,
          len;

      if (!opt) {
        this.resetDefaultOptions();
      }

      utils.extend(opt, options);

      if (options) {
        utils.extend(customI18N, options.i18n);
      }

      for (i = 0, len = events.length; i < len; ++i) {
        // At this point, options[eventPropName] may have changed from an array
        // to a function.
        eventPropName = 'on' + events[i].charAt(0).toUpperCase() + events[i].substring(1);
        if (options[eventPropName]) {
          this.listen(events[i],
                      options[eventPropName],
                      isTourOptions);
        }
      }

      bubble = getBubble(true);

      return this;
    };

    /**
     * configure
     *
     * <pre>
     * VALID OPTIONS INCLUDE...
     *
     * - bubbleWidth:     Number   - Default bubble width. Defaults to 280.
     * - bubblePadding:   Number   - DEPRECATED. Default bubble padding. Defaults to 15.
     * - smoothScroll:    Boolean  - should the page scroll smoothly to the next
     *                               step? Defaults to TRUE.
     * - scrollDuration:  Number   - Duration of page scroll. Only relevant when
     *                               smoothScroll is set to true. Defaults to
     *                               1000ms.
     * - scrollTopMargin: NUMBER   - When the page scrolls, how much space should there
     *                               be between the bubble/targetElement and the top
     *                               of the viewport? Defaults to 200.
     * - showCloseButton: Boolean  - should the tour bubble show a close (X) button?
     *                               Defaults to TRUE.
     * - showPrevButton:  Boolean  - should the bubble have the Previous button?
     *                               Defaults to FALSE.
     * - showNextButton:  Boolean  - should the bubble have the Next button?
     *                               Defaults to TRUE.
     * - arrowWidth:      Number   - Default arrow width. (space between the bubble
     *                               and the targetEl) Used for bubble position
     *                               calculation. Only use this option if you are
     *                               using your own custom CSS. Defaults to 20.
     * - skipIfNoElement  Boolean  - If a specified target element is not found,
     *                               should we skip to the next step? Defaults to
     *                               TRUE.
     * - onNext:          Function - A callback to be invoked after every click on
     *                               a "Next" button.
     * - isRtl:           Boolean  - Set to true when instantiating in a right-to-left
     *                               language environment, or if mirrored positioning is
     *                               needed.
     *                               Defaults to FALSE.
     *
     * - i18n:            Object   - For i18n purposes. Allows you to change the
     *                               text of button labels and step numbers.
     * - i18n.stepNums:   Array\<String\> - Provide a list of strings to be shown as
     *                               the step number, based on index of array. Unicode
     *                               characters are supported. (e.g., ['&#x4e00;',
     *                               '&#x4e8c;', '&#x4e09;']) If there are more steps
     *                               than provided numbers, Arabic numerals
     *                               ('4', '5', '6', etc.) will be used as default.
     * // =========
     * // CALLBACKS
     * // =========
     * - onNext:          Function - Invoked after every click on a "Next" button.
     * - onPrev:          Function - Invoked after every click on a "Prev" button.
     * - onStart:         Function - Invoked when the tour is started.
     * - onEnd:           Function - Invoked when the tour ends.
     * - onClose:         Function - Invoked when the user closes the tour before finishing.
     * - onError:         Function - Invoked when the specified target element doesn't exist on the page.
     *
     * // ====
     * // I18N
     * // ====
     * i18n:              OBJECT      - For i18n purposes. Allows you to change the text
     *                                  of button labels and step numbers.
     * i18n.nextBtn:      STRING      - Label for next button
     * i18n.prevBtn:      STRING      - Label for prev button
     * i18n.doneBtn:      STRING      - Label for done button
     * i18n.skipBtn:      STRING      - Label for skip button
     * i18n.closeTooltip: STRING      - Text for close button tooltip
     * i18n.stepNums:   ARRAY<STRING> - Provide a list of strings to be shown as
     *                                  the step number, based on index of array. Unicode
     *                                  characters are supported. (e.g., ['&#x4e00;',
     *                                  '&#x4e8c;', '&#x4e09;']) If there are more steps
     *                                  than provided numbers, Arabic numerals
     *                                  ('4', '5', '6', etc.) will be used as default.
     * </pre>
     *
     * @example hopscotch.configure({ scrollDuration: 1000, scrollTopMargin: 150 });
     * @example
     * hopscotch.configure({
     *   scrollTopMargin: 150,
     *   onStart: function() {
     *     alert("Have fun!");
     *   },
     *   i18n: {
     *     nextBtn: 'Forward',
     *     prevBtn: 'Previous'
     *     closeTooltip: 'Quit'
     *   }
     * });
     *
     * @param {Object} options A hash of configuration options.
     * @returns {Object} Hopscotch
     */
    this.configure = function(options) {
      return _configure.call(this, options, false);
    };

    /**
     * Set the template that should be used for rendering Hopscotch bubbles.
     * If a string, it's assumed your template is available in the
     * hopscotch.templates namespace.
     *
     * @param {String|Function(obj)} The template to use for rendering.
     * @returns {Object} The Hopscotch object (for chaining).
     */
    this.setRenderer = function(render){
      var typeOfRender = typeof render;

      if(typeOfRender === 'string'){
        templateToUse = render;
        customRenderer = undefined;
      }
      else if(typeOfRender === 'function'){
        customRenderer = render;
      }
      return this;
    };

    /**
     * Sets the escaping method to be used by JST templates.
     *
     * @param {Function} - The escape method to use.
     * @returns {Object} The Hopscotch object (for chaining).
     */
    this.setEscaper = function(esc){
      if (typeof esc === 'function'){
        customEscape = esc;
      }
      return this;
    };

    init.call(this, initOptions);
  };

  winHopscotch = new Hopscotch();

// Template includes, placed inside a closure to ensure we don't
// end up declaring our shim globally.
(function(){
var _ = {};
/*
 * Adapted from the Underscore.js framework. Check it out at
 * https://github.com/jashkenas/underscore
 */
_.escape = function(str){
  if(customEscape){ return customEscape(str); }
  
  if(str == null) return '';
  return ('' + str).replace(new RegExp('[&<>"\']', 'g'), function(match){
    if(match == '&'){ return '&amp;' }
    if(match == '<'){ return '&lt;' }
    if(match == '>'){ return '&gt;' }
    if(match == '"'){ return '&quot;' }
    if(match == "'"){ return '&#x27;' }
  });
}

this["templates"] = this["templates"] || {};

this["templates"]["bubble_default"] = function(data) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }


  function optEscape(str, unsafe){
    if(unsafe){
      return _.escape(str);
    }
    return str;
  }
;
__p += '\n';

var i18n = data.i18n;
var buttons = data.buttons;
var step = data.step;
var tour = data.tour;
;
__p += '\n<div class="hopscotch-bubble-container" style="width: ' +
((__t = ( step.width )) == null ? '' : __t) +
'px; padding: ' +
((__t = ( step.padding )) == null ? '' : __t) +
'px;">\n  ';
 if(tour.isTour){ ;
__p += '<span class="hopscotch-bubble-number">' +
((__t = ( i18n.stepNum )) == null ? '' : __t) +
'</span>';
 } ;
__p += '\n  <div class="hopscotch-bubble-content">\n    ';
 if(step.title !== ''){ ;
__p += '<h3 class="hopscotch-title">' +
((__t = ( optEscape(step.title, tour.unsafe) )) == null ? '' : __t) +
'</h3>';
 } ;
__p += '\n    ';
 if(step.content  !== ''){ ;
__p += '<div class="hopscotch-content">' +
((__t = ( optEscape(step.content, tour.unsafe) )) == null ? '' : __t) +
'</div>';
 } ;
__p += '\n  </div>\n  <div class="hopscotch-actions">\n    ';
 if(buttons.showPrev){ ;
__p += '<button class="hopscotch-nav-button prev hopscotch-prev">' +
((__t = ( i18n.prevBtn )) == null ? '' : __t) +
'</button>';
 } ;
__p += '\n    ';
 if(buttons.showCTA){ ;
__p += '<button class="hopscotch-nav-button next hopscotch-cta">' +
((__t = ( buttons.ctaLabel )) == null ? '' : __t) +
'</button>';
 } ;
__p += '\n    ';
 if(buttons.showNext){ ;
__p += '<button class="hopscotch-nav-button next hopscotch-next">' +
((__t = ( i18n.nextBtn )) == null ? '' : __t) +
'</button>';
 } ;
__p += '\n  </div>\n  ';
 if(buttons.showClose){ ;
__p += '<button class="hopscotch-bubble-close hopscotch-close">' +
((__t = ( i18n.closeTooltip )) == null ? '' : __t) +
'</button>';
 } ;
__p += '\n</div>\n<div class="hopscotch-bubble-arrow-container hopscotch-arrow">\n  <div class="hopscotch-bubble-arrow-border"></div>\n  <div class="hopscotch-bubble-arrow"></div>\n</div>\n';
return __p
};
}.call(winHopscotch));

  return winHopscotch;

})));