/*!
  * Native JavaScript for Bootstrap Carousel v3.0.15-alpha2 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
var mouseHoverEvents = ('onmouseleave' in document) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'];

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

var transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

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

function isElementInScrollRange(element) {
  var bcr = element.getBoundingClientRect();
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return bcr.top <= viewportHeight && bcr.bottom >= 0; // bottom && top
}

function queryElement(selector, parent) {
  var lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

function reflow(element) {
  return element.offsetHeight;
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

/* Native JavaScript for Bootstrap 4 | Carousel
----------------------------------------------- */

// CAROUSEL DEFINITION
// ===================

function Carousel(elem, opsInput) {
  var assign, assign$1, assign$2;

  var element;

  // set options
  var options = opsInput || {};

  // bind
  var self = this;

  // internal variables
  var vars;
  var ops;

  // custom events
  var slideCustomEvent;
  var slidCustomEvent;

  // carousel elements
  var slides;
  var leftArrow;
  var rightArrow;
  var indicator;
  var indicators;

  // handlers
  function pauseHandler() {
    if (ops.interval !== false && !element.classList.contains('paused')) {
      element.classList.add('paused');
      if (!vars.isSliding) {
        clearInterval(vars.timer);
        vars.timer = null;
      }
    }
  }
  function resumeHandler() {
    if (ops.interval !== false && element.classList.contains('paused')) {
      element.classList.remove('paused');
      if (!vars.isSliding) {
        clearInterval(vars.timer);
        vars.timer = null;
        self.cycle();
      }
    }
  }
  function indicatorHandler(e) {
    e.preventDefault();
    if (vars.isSliding) { return; }

    var eventTarget = e.target; // event target | the current active item

    if (eventTarget && !eventTarget.classList.contains('active') && eventTarget.getAttribute('data-slide-to')) {
      vars.index = +(eventTarget.getAttribute('data-slide-to'));
    } else { return; }

    self.slideTo(vars.index); // Do the slide
  }
  function controlsHandler(e) {
    e.preventDefault();
    if (vars.isSliding) { return; }

    var eventTarget = e.currentTarget || e.srcElement;

    if (eventTarget === rightArrow) {
      vars.index += 1;
    } else if (eventTarget === leftArrow) {
      vars.index -= 1;
    }

    self.slideTo(vars.index); // Do the slide
  }
  function keyHandler(ref) {
    var which = ref.which;

    if (vars.isSliding) { return; }
    switch (which) {
      case 39:
        vars.index += 1;
        break;
      case 37:
        vars.index -= 1;
        break;
      default: return;
    }
    self.slideTo(vars.index); // Do the slide
  }
  function toggleEvents(add) {
    var action = add ? 'addEventListener' : 'removeEventListener';
    if (ops.pause && ops.interval) {
      element[action](mouseHoverEvents[0], pauseHandler, false);
      element[action](mouseHoverEvents[1], resumeHandler, false);
      element[action]('touchstart', pauseHandler, passiveHandler);
      element[action]('touchend', resumeHandler, passiveHandler);
    }

    if (ops.touch && slides.length > 1) { element[action]('touchstart', touchDownHandler, passiveHandler); }

    if (rightArrow) { rightArrow[action]('click', controlsHandler, false); }
    if (leftArrow) { leftArrow[action]('click', controlsHandler, false); }

    if (indicator) { indicator[action]('click', indicatorHandler, false); }
    if (ops.keyboard) { window[action]('keydown', keyHandler, false); }
  }
  // touch events
  function toggleTouchEvents(add) {
    var action = add ? 'addEventListener' : 'removeEventListener';
    element[action]('touchmove', touchMoveHandler, passiveHandler);
    element[action]('touchend', touchEndHandler, passiveHandler);
  }
  function touchDownHandler(e) {
    if (vars.isTouch) { return; }

    vars.touchPosition.startX = e.changedTouches[0].pageX;

    if (element.contains(e.target)) {
      vars.isTouch = true;
      toggleTouchEvents(1);
    }
  }
  function touchMoveHandler(e) {
    if (!vars.isTouch) { e.preventDefault(); return; }

    vars.touchPosition.currentX = e.changedTouches[0].pageX;

    // cancel touch if more than one changedTouches detected
    if (e.type === 'touchmove' && e.changedTouches.length > 1) {
      e.preventDefault();
    }
  }
  function touchEndHandler(e) {
    if (!vars.isTouch || vars.isSliding) { return; }

    vars.touchPosition.endX = vars.touchPosition.currentX || e.changedTouches[0].pageX;

    if (vars.isTouch) {
      if ((!element.contains(e.target) || !element.contains(e.relatedTarget))
          && Math.abs(vars.touchPosition.startX - vars.touchPosition.endX) < 75) {
        return;
      }
      if (vars.touchPosition.currentX < vars.touchPosition.startX) {
        vars.index += 1;
      } else if (vars.touchPosition.currentX > vars.touchPosition.startX) {
        vars.index -= 1;
      }
      vars.isTouch = false;
      self.slideTo(vars.index);

      toggleTouchEvents(); // remove
    }
  }
  // private methods
  function setActivePage(pageIndex) { // indicators
    Array.from(indicators).forEach(function (x) { return x.classList.remove('active'); });
    if (indicators[pageIndex]) { indicators[pageIndex].classList.add('active'); }
  }
  function transitionEndHandler(e) {
    if (vars.touchPosition) {
      var next = vars.index;
      var timeout = e && e.target !== slides[next] ? e.elapsedTime * 1000 + 100 : 20;
      var activeItem = self.getActiveIndex();
      var orientation = vars.direction === 'left' ? 'next' : 'prev';

      if (vars.isSliding) {
        setTimeout(function () {
          if (vars.touchPosition) {
            vars.isSliding = false;

            slides[next].classList.add('active');
            slides[activeItem].classList.remove('active');

            slides[next].classList.remove(("carousel-item-" + orientation));
            slides[next].classList.remove(("carousel-item-" + (vars.direction)));
            slides[activeItem].classList.remove(("carousel-item-" + (vars.direction)));

            dispatchCustomEvent.call(element, slidCustomEvent);
            // check for element, might have been disposed
            if (!document.hidden && ops.interval && !element.classList.contains('paused')) {
              self.cycle();
            }
          }
        }, timeout);
      }
    }
  }

  // public methods
  self.cycle = function () {
    if (vars.timer) {
      clearInterval(vars.timer);
      vars.timer = null;
    }

    vars.timer = setInterval(function () {
      var idx = vars.index || self.getActiveIndex();
      if (isElementInScrollRange(element)) {
        idx += 1;
        self.slideTo(idx);
      }
    }, ops.interval);
  };
  self.slideTo = function (idx) {
    if (vars.isSliding) { return; } // when controled via methods, make sure to check again

    // the current active, orientation, event eventProperties
    var activeItem = self.getActiveIndex();
    var next = idx;

    // first return if we're on the same item #227
    if (activeItem === next) {
      return;
    // or determine slide direction
    } if ((activeItem < next) || (activeItem === 0 && next === slides.length - 1)) {
      vars.direction = 'left'; // next
    } else if ((activeItem > next) || (activeItem === slides.length - 1 && next === 0)) {
      vars.direction = 'right'; // prev
    }

    // find the right next index
    if (next < 0) { next = slides.length - 1; }
    else if (next >= slides.length) { next = 0; }

    var orientation = vars.direction === 'left' ? 'next' : 'prev'; // determine type

    var eventProperties = {
      relatedTarget: slides[next], direction: vars.direction, from: activeItem, to: next,
    };
    slideCustomEvent = bootstrapCustomEvent('slide', 'carousel', eventProperties);
    slidCustomEvent = bootstrapCustomEvent('slid', 'carousel', eventProperties);
    dispatchCustomEvent.call(element, slideCustomEvent); // here we go with the slide
    if (slideCustomEvent.defaultPrevented) { return; } // discontinue when prevented

    // update index
    vars.index = next;

    vars.isSliding = true;
    clearInterval(vars.timer);
    vars.timer = null;
    setActivePage(next);

    if (getElementTransitionDuration(slides[next]) && element.classList.contains('slide')) {
      slides[next].classList.add(("carousel-item-" + orientation));
      reflow(slides[next]);
      slides[next].classList.add(("carousel-item-" + (vars.direction)));
      slides[activeItem].classList.add(("carousel-item-" + (vars.direction)));

      emulateTransitionEnd(slides[next], transitionEndHandler);
    } else {
      slides[next].classList.add('active');
      reflow(slides[next]);
      slides[activeItem].classList.remove('active');
      setTimeout(function () {
        vars.isSliding = false;
        // check for element, might have been disposed
        if (ops.interval && element && !element.classList.contains('paused')) {
          self.cycle();
        }
        dispatchCustomEvent.call(element, slidCustomEvent);
      }, 100);
    }
  };

  self.getActiveIndex = function () { return Array.from(slides).indexOf(element.getElementsByClassName('carousel-item active')[0]) || 0; };

  self.dispose = function () {
    var itemClasses = ['left', 'right', 'prev', 'next'];

    Array.from(slides).forEach(function (slide, idx) {
      if (slide.classList.contains('active')) { setActivePage(idx); }
      itemClasses.forEach(function (cls) { return slide.classList.remove(("carousel-item-" + cls)); });
    });
    clearInterval(vars.timer);

    toggleEvents();
    vars = {};
    ops = {};
    delete element.Carousel;
  };

  // init

  // initialization element
  element = queryElement(elem);

  // reset on re-init
  if (element.Carousel) { element.Carousel.dispose(); }

  // carousel elements
  slides = element.getElementsByClassName('carousel-item');
  (assign = element.getElementsByClassName('carousel-control-prev'), leftArrow = assign[0]);
  (assign$1 = element.getElementsByClassName('carousel-control-next'), rightArrow = assign$1[0]);
  (assign$2 = element.getElementsByClassName('carousel-indicators'), indicator = assign$2[0]);
  indicators = (indicator && indicator.getElementsByTagName('LI')) || [];

  // invalidate when not enough items
  if (slides.length < 2) { return; }

  // check options
  // DATA API
  var intervalAttribute = element.getAttribute('data-interval');
  var intervalData = intervalAttribute === 'false' ? 0 : +(intervalAttribute);
  var touchData = element.getAttribute('data-touch') === 'false' ? 0 : 1;
  var pauseData = element.getAttribute('data-pause') === 'hover' || false;
  var keyboardData = element.getAttribute('data-keyboard') === 'true' || false;

  // JS options
  var intervalOption = options.interval;
  var touchOption = options.touch;

  // set instance options
  ops = {};
  ops.keyboard = options.keyboard === true || keyboardData;
  ops.pause = (options.pause === 'hover' || pauseData) ? 'hover' : false; // false / hover
  ops.touch = touchOption || touchData;

  ops.interval = 5000; // bootstrap carousel default interval

  if (typeof intervalOption === 'number') { ops.interval = intervalOption; }
  else if (intervalOption === false || intervalData === 0 || intervalData === false) {
    ops.interval = 0;
  } else if (!Number.isNaN(intervalData)) { ops.interval = intervalData; }

  // set first slide active if none
  if (self.getActiveIndex() < 0) {
    if (slides.length) { slides[0].classList.add('active'); }
    if (indicators.length) { setActivePage(0); }
  }

  // set initial state
  vars = {};
  vars.direction = 'left';
  vars.index = 0;
  vars.timer = null;
  vars.isSliding = false;
  vars.isTouch = false;
  vars.touchPosition = {
    startX: 0,
    currentX: 0,
    endX: 0,
  };

  // attach event handlers
  toggleEvents(1);

  // start to cycle if interval is set
  if (ops.interval) { self.cycle(); }

  // associate init object to target
  element.Carousel = self;
}

export default Carousel;
