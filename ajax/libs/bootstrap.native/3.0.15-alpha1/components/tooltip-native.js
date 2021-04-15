/*!
  * Native JavaScript for Bootstrap Tooltip v3.0.15-alpha1 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tooltip = factory());
}(this, (function () { 'use strict';

  var mouseHoverEvents = ('onmouseleave' in document) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'];

  var mouseClickEvents = { down: 'mousedown', up: 'mouseup' };

  var addEventListener = 'addEventListener';

  var removeEventListener = 'removeEventListener';

  var supportPassive = (function () {
    var result = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
          result = true;
          return result;
        },
      });
      document[addEventListener]('DOMContentLoaded', function wrap() {
        document[removeEventListener]('DOMContentLoaded', wrap, opts);
      }, opts);
    } catch (e) {
      throw Error('Passive events are not supported');
    }

    return result;
  })();

  // general event options

  var passiveHandler = supportPassive ? { passive: true } : false;

  var transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

  var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

  var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

  function getElementTransitionDuration(element) {
    var computedStyle = getComputedStyle(element);
    var propertyValue = computedStyle[transitionProperty];
    var durationValue = computedStyle[transitionDuration];
    var durationScale = durationValue.includes('ms') ? 1 : 1000;
    var duration = supportTransition && propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  function emulateTransitionEnd(element, handler) {
    var called = 0;
    var endEvent = new Event(transitionEndEvent);
    var duration = getElementTransitionDuration(element);

    if (duration) {
      element.addEventListener(transitionEndEvent, function transitionEndWrapper(e) {
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      });
      setTimeout(function () {
        if (!called) { element.dispatchEvent(endEvent); }
      }, duration + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  function queryElement(selector, parent) {
    var lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function bootstrapCustomEvent(eventType, componentName, eventProperties) {
    var OriginalCustomEvent = new CustomEvent((eventType + ".bs." + componentName), { cancelable: true });

    if (typeof eventProperties !== 'undefined') {
      Object.keys(eventProperties).forEach(function (key) {
        Object.defineProperty(OriginalCustomEvent, key, {
          value: eventProperties[key],
        });
      });
    }
    return OriginalCustomEvent;
  }

  function dispatchCustomEvent(customEvent) {
    if (this) { this.dispatchEvent(customEvent); }
  }

  // Popover, Tooltip & ScrollSpy
  function getScroll() {
    return {
      y: window.pageYOffset || document.documentElement.scrollTop,
      x: window.pageXOffset || document.documentElement.scrollLeft,
    };
  }

  // both popovers and tooltips (target,tooltip,placement,elementToAppendTo)
  function styleTip(link, element, originalPosition, parent) {
    var tipPositions = /\b(top|bottom|left|right)+/;
    var elementDimensions = { w: element.offsetWidth, h: element.offsetHeight };
    var windowWidth = (document.documentElement.clientWidth || document.body.clientWidth);
    var windowHeight = (document.documentElement.clientHeight || document.body.clientHeight);
    var rect = link.getBoundingClientRect();
    var scroll = parent === document.body
      ? getScroll()
      : { x: parent.offsetLeft + parent.scrollLeft, y: parent.offsetTop + parent.scrollTop };
    var linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top };
    var isPopover = element.classList.contains('popover');
    var arrow = element.getElementsByClassName('arrow')[0];
    var halfTopExceed = rect.top + linkDimensions.h / 2 - elementDimensions.h / 2 < 0;
    var halfLeftExceed = rect.left + linkDimensions.w / 2 - elementDimensions.w / 2 < 0;
    var halfRightExceed = rect.left + elementDimensions.w / 2
      + linkDimensions.w / 2 >= windowWidth;
    var halfBottomExceed = rect.top + elementDimensions.h / 2
      + linkDimensions.h / 2 >= windowHeight;
    var topExceed = rect.top - elementDimensions.h < 0;
    var leftExceed = rect.left - elementDimensions.w < 0;
    var bottomExceed = rect.top + elementDimensions.h + linkDimensions.h >= windowHeight;
    var rightExceed = rect.left + elementDimensions.w + linkDimensions.w >= windowWidth;
    var position = originalPosition;

    // recompute position
    // first, when both left and right limits are exceeded, we fall back to top|bottom
    position = (position === 'left' || position === 'right') && leftExceed && rightExceed ? 'top' : position;
    position = position === 'top' && topExceed ? 'bottom' : position;
    position = position === 'bottom' && bottomExceed ? 'top' : position;
    position = position === 'left' && leftExceed ? 'right' : position;
    position = position === 'right' && rightExceed ? 'left' : position;

    var topPosition;
    var leftPosition;
    var arrowTop;
    var arrowLeft;

    // update tooltip/popover class
    if (element.className.indexOf(position) === -1) {
      element.className = element.className.replace(tipPositions, position);
    }

    // we check the computed width & height and update here
    var arrowWidth = arrow.offsetWidth;
    var arrowHeight = arrow.offsetHeight;

    // apply styling to tooltip or popover
    // secondary|side positions
    if (position === 'left' || position === 'right') {
      if (position === 'left') { // LEFT
        leftPosition = rect.left + scroll.x - elementDimensions.w - (isPopover ? arrowWidth : 0);
      } else { // RIGHT
        leftPosition = rect.left + scroll.x + linkDimensions.w;
      }

      // adjust top and arrow
      if (halfTopExceed) {
        topPosition = rect.top + scroll.y;
        arrowTop = linkDimensions.h / 2 - arrowWidth;
      } else if (halfBottomExceed) {
        topPosition = rect.top + scroll.y - elementDimensions.h + linkDimensions.h;
        arrowTop = elementDimensions.h - linkDimensions.h / 2 - arrowWidth;
      } else {
        topPosition = rect.top + scroll.y - elementDimensions.h / 2 + linkDimensions.h / 2;
        arrowTop = elementDimensions.h / 2 - (isPopover ? arrowHeight * 0.9 : arrowHeight / 2);
      }
    // primary|vertical positions
    } else if (position === 'top' || position === 'bottom') {
      if (position === 'top') { // TOP
        topPosition = rect.top + scroll.y - elementDimensions.h - (isPopover ? arrowHeight : 0);
      } else { // BOTTOM
        topPosition = rect.top + scroll.y + linkDimensions.h;
      }
      // adjust left | right and also the arrow
      if (halfLeftExceed) {
        leftPosition = 0;
        arrowLeft = rect.left + linkDimensions.w / 2 - arrowWidth;
      } else if (halfRightExceed) {
        leftPosition = windowWidth - elementDimensions.w * 1.01;
        arrowLeft = elementDimensions.w - (windowWidth - rect.left)
          + linkDimensions.w / 2 - arrowWidth / 2;
      } else {
        leftPosition = rect.left + scroll.x - elementDimensions.w / 2 + linkDimensions.w / 2;
        arrowLeft = elementDimensions.w / 2 - (isPopover ? arrowWidth : arrowWidth / 2);
      }
    }

    // apply style to tooltip/popover and its arrow
    element.style.top = topPosition + "px";
    element.style.left = leftPosition + "px";

    if (arrowTop) { arrow.style.top = arrowTop + "px"; }
    if (arrowLeft) { arrow.style.left = arrowLeft + "px"; }
  }

  /* Native JavaScript for Bootstrap 4 | Tooltip
  ---------------------------------------------- */

  // TOOLTIP DEFINITION
  // ==================

  function Tooltip(elem, opsInput) {
    var element;
    // set options
    var options = opsInput || {};

    // bind
    var self = this;

    // tooltip, timer, and title
    var tooltip = null;
    var timer = 0;
    var titleString;
    var placementClass;

    // custom events
    var showCustomEvent;
    var shownCustomEvent;
    var hideCustomEvent;
    var hiddenCustomEvent;

    var ops = {};

    // private methods
    function getTitle() {
      return element.getAttribute('title')
          || element.getAttribute('data-title')
          || element.getAttribute('data-original-title');
    }
    function removeToolTip() {
      ops.container.removeChild(tooltip);
      tooltip = null; timer = null;
    }
    function createToolTip() {
      titleString = getTitle(); // read the title again
      if (titleString) { // invalidate, maybe markup changed
        // create tooltip
        tooltip = document.createElement('div');

        // set markup
        if (ops.template) {
          var tooltipMarkup = document.createElement('div');
          tooltipMarkup.innerHTML = ops.template.trim();

          tooltip.className = tooltipMarkup.firstChild.className;
          tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML;

          queryElement('.tooltip-inner', tooltip).innerHTML = titleString.trim();
        } else {
          // tooltip arrow
          var tooltipArrow = document.createElement('div');
          tooltipArrow.classList.add('arrow');
          tooltip.appendChild(tooltipArrow);
          // tooltip inner
          var tooltipInner = document.createElement('div');
          tooltipInner.classList.add('tooltip-inner');
          tooltip.appendChild(tooltipInner);
          tooltipInner.innerHTML = titleString;
        }
        // reset position
        tooltip.style.left = '0';
        tooltip.style.top = '0';
        // set class and role attribute
        tooltip.setAttribute('role', 'tooltip');
        if (!tooltip.classList.contains('tooltip')) { tooltip.classList.add('tooltip'); }
        if (!tooltip.classList.contains(ops.animation)) { tooltip.classList.add(ops.animation); }
        if (!tooltip.classList.contains(placementClass)) { tooltip.classList.add(placementClass); }
        // append to container
        ops.container.appendChild(tooltip);
      }
    }
    function updateTooltip() {
      styleTip(element, tooltip, ops.placement, ops.container);
    }
    function showTooltip() {
      if (!tooltip.classList.contains('show')) { tooltip.classList.add('show'); }
    }
    function touchHandler(e) {
      if ((tooltip && tooltip.contains(e.target))
        || e.target === element || element.contains(e.target)) ; else {
        self.hide();
      }
    }
    // triggers
    function toggleAction(add) {
      var action = add ? 'addEventListener' : 'removeEventListener';
      document[action]('touchstart', touchHandler, passiveHandler);
      window[action]('resize', self.hide, passiveHandler);
    }
    function showAction() {
      toggleAction(1);
      dispatchCustomEvent.call(element, shownCustomEvent);
    }
    function hideAction() {
      toggleAction();
      removeToolTip();
      dispatchCustomEvent.call(element, hiddenCustomEvent);
    }
    function toggleEvents(add) {
      var action = add ? 'addEventListener' : 'removeEventListener';
      element[action](mouseClickEvents.down, self.show, false);
      element[action](mouseHoverEvents[0], self.show, false);
      element[action](mouseHoverEvents[1], self.hide, false);
    }

    // public methods
    self.show = function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (tooltip === null) {
          dispatchCustomEvent.call(element, showCustomEvent);
          if (showCustomEvent.defaultPrevented) { return; }
          // if(createToolTip() == false) return;
          if (createToolTip() !== false) {
            updateTooltip();
            showTooltip();
            if (ops.animation) { emulateTransitionEnd(tooltip, showAction); }
            else { showAction(); }
          }
        }
      }, 20);
    };
    self.hide = function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (tooltip && tooltip.classList.contains('show')) {
          dispatchCustomEvent.call(element, hideCustomEvent);
          if (hideCustomEvent.defaultPrevented) { return; }
          tooltip.classList.remove('show');
          if (ops.animation) { emulateTransitionEnd(tooltip, hideAction); }
          else { hideAction(); }
        }
      }, ops.delay);
    };
    self.toggle = function () {
      if (!tooltip) { self.show(); }
      else { self.hide(); }
    };
    self.dispose = function () {
      toggleEvents();
      self.hide();
      element.setAttribute('title', element.getAttribute('data-original-title'));
      element.removeAttribute('data-original-title');
      delete element.Tooltip;
    };

    // init
    // initialization element
    element = queryElement(elem);

    // reset on re-init
    if (element.Tooltip) { element.Tooltip.dispose(); }

    // DATA API
    var animationData = element.getAttribute('data-animation');
    var placementData = element.getAttribute('data-placement');
    var delayData = element.getAttribute('data-delay');
    var containerData = element.getAttribute('data-container');

    // check container
    var containerElement = queryElement(options.container);
    var containerDataElement = queryElement(containerData);

    // maybe the element is inside a modal
    var modal = element.closest('.modal');

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'tooltip');
    shownCustomEvent = bootstrapCustomEvent('shown', 'tooltip');
    hideCustomEvent = bootstrapCustomEvent('hide', 'tooltip');
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'tooltip');

    // maybe the element is inside a fixed navbar
    var navbarFixedTop = element.closest('.fixed-top');
    var navbarFixedBottom = element.closest('.fixed-bottom');

    // set instance options
    ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
    ops.placement = options.placement ? options.placement : placementData || 'top';
    ops.template = options.template ? options.template : null; // JavaScript only
    ops.delay = parseInt((options.delay || delayData), 10) || 200;
    ops.container = containerElement
      || (containerDataElement
        || (navbarFixedTop || (navbarFixedBottom || (modal || document.body))));

    // set placement class
    placementClass = "bs-tooltip-" + (ops.placement);

    // set tooltip content
    titleString = getTitle();

    // invalidate
    if (!titleString) { return; }

    // prevent adding event handlers twice
    if (!element.Tooltip) {
      element.setAttribute('data-original-title', titleString);
      element.removeAttribute('title');
      toggleEvents(1);
    }

    // associate target to init object
    element.Tooltip = self;
  }

  return Tooltip;

})));
