/*!
  * Native JavaScript for Bootstrap Popover v3.0.15-alpha2 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
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

/* Native JavaScript for Bootstrap 4 | Popover
---------------------------------------------- */

// POPOVER DEFINITION
// ==================

function Popover(elem, opsInput) {
  var assign;

  var element;
  // set instance options
  var options = opsInput || {};

  // bind
  var self = this;

  // popover and timer
  var popover = null;
  var timer = 0;
  var isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent);
  // title and content
  var titleString;
  var contentString;
  var placementClass;

  // options
  var ops = {};

  // close btn for dissmissible popover
  var closeBtn;

  // custom events
  var showCustomEvent;
  var shownCustomEvent;
  var hideCustomEvent;
  var hiddenCustomEvent;

  // handlers
  function dismissibleHandler(e) {
    if (popover !== null && e.target === queryElement('.close', popover)) {
      self.hide();
    }
  }
  // private methods
  function getContents() {
    return {
      0: options.title || element.getAttribute('data-title') || null,
      1: options.content || element.getAttribute('data-content') || null,
    };
  }
  function removePopover() {
    ops.container.removeChild(popover);
    timer = null; popover = null;
  }

  function createPopover() {
    var assign;

    (assign = getContents(), titleString = assign[0], contentString = assign[1]);
    // fixing https://github.com/thednp/bootstrap.native/issues/233
    contentString = contentString ? contentString.trim() : null;

    popover = document.createElement('div');

    // popover arrow
    var popoverArrow = document.createElement('div');
    popoverArrow.classList.add('arrow');
    popover.appendChild(popoverArrow);

    // create the popover from data attributes
    if (contentString !== null && ops.template === null) {
      popover.setAttribute('role', 'tooltip');

      if (titleString !== null) {
        var popoverTitle = document.createElement('h3');
        popoverTitle.classList.add('popover-header');
        popoverTitle.innerHTML = ops.dismissible ? titleString + closeBtn : titleString;
        popover.appendChild(popoverTitle);
      }

      // set popover content
      var popoverBodyMarkup = document.createElement('div');
      popoverBodyMarkup.classList.add('popover-body');
      popoverBodyMarkup.innerHTML = ops.dismissible && titleString === null
        ? contentString + closeBtn
        : contentString;
      popover.appendChild(popoverBodyMarkup);
    } else { // or create the popover from template
      var popoverTemplate = document.createElement('div');
      popoverTemplate.innerHTML = ops.template.trim();
      popover.className = popoverTemplate.firstChild.className;
      popover.innerHTML = popoverTemplate.firstChild.innerHTML;

      var popoverHeader = queryElement('.popover-header', popover);
      var popoverBody = queryElement('.popover-body', popover);

      // fill the template with content from data attributes
      if (titleString && popoverHeader) { popoverHeader.innerHTML = titleString.trim(); }
      if (contentString && popoverBody) { popoverBody.innerHTML = contentString.trim(); }
    }

    // append to the container
    ops.container.appendChild(popover);
    popover.style.display = 'block';
    if (!popover.classList.contains('popover')) { popover.classList.add('popover'); }
    if (!popover.classList.contains(ops.animation)) { popover.classList.add(ops.animation); }
    if (!popover.classList.contains(placementClass)) { popover.classList.add(placementClass); }
  }
  function showPopover() {
    if (!popover.classList.contains('show')) { popover.classList.add('show'); }
  }
  function updatePopover() {
    styleTip(element, popover, ops.placement, ops.container);
  }
  function forceFocus() {
    if (popover === null) { element.focus(); }
  }
  function toggleEvents(add) {
    var action = add ? 'addEventListener' : 'removeEventListener';
    if (ops.trigger === 'hover') {
      element[action](mouseClickEvents.down, self.show);
      element[action](mouseHoverEvents[0], self.show);
      // mouseHover = ('onmouseleave' in document)
      //   ? [ 'mouseenter', 'mouseleave']
      //   : [ 'mouseover', 'mouseout' ]
      if (!ops.dismissible) { element[action](mouseHoverEvents[1], self.hide); }
    } else if (ops.trigger === 'click') {
      element[action](ops.trigger, self.toggle);
    } else if (ops.trigger === 'focus') {
      if (isIphone) { element[action]('click', forceFocus, false); }
      element[action](ops.trigger, self.toggle);
    }
  }
  function touchHandler(e) {
    if ((popover && popover.contains(e.target))
      || e.target === element || element.contains(e.target)) ; else {
      self.hide();
    }
  }
  // event toggle
  function dismissHandlerToggle(add) {
    var action = add ? 'addEventListener' : 'removeEventListener';
    if (ops.dismissible) {
      document[action]('click', dismissibleHandler, false);
    } else {
      if (ops.trigger === 'focus') { element[action]('blur', self.hide); }
      if (ops.trigger === 'hover') { document[action]('touchstart', touchHandler, passiveHandler); }
    }
    window[action]('resize', self.hide, passiveHandler);
  }
  // triggers
  function showTrigger() {
    dismissHandlerToggle(1);
    dispatchCustomEvent.call(element, shownCustomEvent);
  }
  function hideTrigger() {
    dismissHandlerToggle();
    removePopover();
    dispatchCustomEvent.call(element, hiddenCustomEvent);
  }

  // public methods / handlers
  self.toggle = function () {
    if (popover === null) { self.show(); }
    else { self.hide(); }
  };
  self.show = function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (popover === null) {
        dispatchCustomEvent.call(element, showCustomEvent);
        if (showCustomEvent.defaultPrevented) { return; }

        createPopover();
        updatePopover();
        showPopover();
        if (ops.animation) { emulateTransitionEnd(popover, showTrigger); }
        else { showTrigger(); }
      }
    }, 20);
  };
  self.hide = function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (popover && popover !== null && popover.classList.contains('show')) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if (hideCustomEvent.defaultPrevented) { return; }
        popover.classList.remove('show');
        if (ops.animation) { emulateTransitionEnd(popover, hideTrigger); }
        else { hideTrigger(); }
      }
    }, ops.delay);
  };
  self.dispose = function () {
    self.hide();
    toggleEvents();
    delete element.Popover;
  };

  // INIT
  // initialization element
  element = queryElement(elem);

  // reset on re-init
  if (element.Popover) { element.Popover.dispose(); }

  // DATA API
  var triggerData = element.getAttribute('data-trigger'); // click / hover / focus
  var animationData = element.getAttribute('data-animation'); // true / false

  var placementData = element.getAttribute('data-placement');
  var dismissibleData = element.getAttribute('data-dismissible');
  var delayData = element.getAttribute('data-delay');
  var containerData = element.getAttribute('data-container');

  // close btn for dissmissible popover
  closeBtn = '<button type="button" class="close">×</button>';

  // custom events
  showCustomEvent = bootstrapCustomEvent('show', 'popover');
  shownCustomEvent = bootstrapCustomEvent('shown', 'popover');
  hideCustomEvent = bootstrapCustomEvent('hide', 'popover');
  hiddenCustomEvent = bootstrapCustomEvent('hidden', 'popover');

  // check container
  var containerElement = queryElement(options.container);
  var containerDataElement = queryElement(containerData);

  // maybe the element is inside a modal
  var modal = element.closest('.modal');

  // maybe the element is inside a fixed navbar
  var navbarFixedTop = element.closest('.fixed-top');
  var navbarFixedBottom = element.closest('.fixed-bottom');

  // set instance options
  ops.template = options.template ? options.template : null; // JavaScript only
  ops.trigger = options.trigger ? options.trigger : triggerData || 'hover';
  ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
  ops.placement = options.placement ? options.placement : placementData || 'top';
  ops.delay = parseInt((options.delay || delayData), 10) || 200;
  ops.dismissible = !!(options.dismissible || dismissibleData === 'true');
  ops.container = containerElement
    || (containerDataElement
      || (navbarFixedTop || (navbarFixedBottom || (modal || document.body))));

  placementClass = "bs-popover-" + (ops.placement);

  // invalidate
  (assign = getContents(), titleString = assign[0], contentString = assign[1]);

  if (!contentString && !ops.template) { return; }

  // init
  if (!element.Popover) { // prevent adding event handlers twice
    toggleEvents(1);
  }

  // associate target to init object
  element.Popover = self;
}

export default Popover;
