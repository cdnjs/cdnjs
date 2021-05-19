/*!
  * Native JavaScript for Bootstrap Carousel v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Carousel = factory());
}(this, (function () { 'use strict';

  const addEventListener = 'addEventListener';

  const removeEventListener = 'removeEventListener';

  const supportPassive = (() => {
    let result = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
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

  const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  const transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

  const transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

  function getElementTransitionDuration(element) {
    const computedStyle = getComputedStyle(element);
    const propertyValue = computedStyle[transitionProperty];
    const durationValue = computedStyle[transitionDuration];
    const durationScale = durationValue.includes('ms') ? 1 : 1000;
    const duration = supportTransition && propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  function reflow(element) {
    return element.offsetHeight;
  }

  const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

  function emulateTransitionEnd(element, handler) {
    let called = 0;
    const endEvent = new Event(transitionEndEvent);
    const duration = getElementTransitionDuration(element);

    if (duration) {
      element.addEventListener(transitionEndEvent, function transitionEndWrapper(e) {
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      });
      setTimeout(() => {
        if (!called) element.dispatchEvent(endEvent);
      }, duration + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  function isElementInScrollRange(element) {
    const bcr = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return bcr.top <= viewportHeight && bcr.bottom >= 0; // bottom && top
  }

  function queryElement(selector, parent) {
    const lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  function bootstrapCustomEvent(namespacedEventType, eventProperties) {
    const OriginalCustomEvent = new CustomEvent(namespacedEventType, { cancelable: true });

    if (eventProperties instanceof Object) {
      Object.keys(eventProperties).forEach((key) => {
        Object.defineProperty(OriginalCustomEvent, key, {
          value: eventProperties[key],
        });
      });
    }
    return OriginalCustomEvent;
  }

  const activeClass = 'active';

  function normalizeValue(value) {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    if (!Number.isNaN(+value)) {
      return +value;
    }

    if (value === '' || value === 'null') {
      return null;
    }

    // string / function / Element / Object
    return value;
  }

  function normalizeOptions(element, defaultOps, inputOps, ns) {
    const normalOps = {};
    const dataOps = {};
    const data = { ...element.dataset };

    Object.keys(data)
      .forEach((k) => {
        const key = k.includes(ns)
          ? k.replace(ns, '').replace(/[A-Z]/, (match) => match.toLowerCase())
          : k;

        dataOps[key] = normalizeValue(data[k]);
      });

    Object.keys(inputOps)
      .forEach((k) => {
        inputOps[k] = normalizeValue(inputOps[k]);
      });

    Object.keys(defaultOps)
      .forEach((k) => {
        if (k in inputOps) {
          normalOps[k] = inputOps[k];
        } else if (k in dataOps) {
          normalOps[k] = dataOps[k];
        } else {
          normalOps[k] = defaultOps[k];
        }
      });

    return normalOps;
  }

  /* Native JavaScript for Bootstrap 5 | Base Component
  ----------------------------------------------------- */

  class BaseComponent {
    constructor(name, target, defaults, config) {
      const self = this;
      const element = queryElement(target);

      if (element[name]) element[name].dispose();
      self.element = element;

      if (defaults && Object.keys(defaults).length) {
        self.options = normalizeOptions(element, defaults, (config || {}), 'bs');
      }
      element[name] = self;
    }

    dispose(name) {
      const self = this;
      self.element[name] = null;
      Object.keys(self).forEach((prop) => { self[prop] = null; });
    }
  }

  /* Native JavaScript for Bootstrap 5 | Carousel
  ----------------------------------------------- */

  // CAROUSEL PRIVATE GC
  // ===================
  const carouselString = 'carousel';
  const carouselComponent = 'Carousel';
  const carouselSelector = `[data-bs-ride="${carouselString}"]`;
  const carouselControl = `${carouselString}-control`;
  const carouselItem = `${carouselString}-item`;
  const dataBsSlideTo = 'data-bs-slide-to';
  const pausedClass = 'paused';
  const defaultCarouselOptions = {
    pause: 'hover', // 'boolean|string'
    keyboard: false, // 'boolean'
    touch: true, // 'boolean'
    interval: 5000, // 'boolean|number'
  };
  let startX = 0;
  let currentX = 0;
  let endX = 0;

  // CAROUSEL CUSTOM EVENTS
  // ======================
  const carouselSlideEvent = bootstrapCustomEvent(`slide.bs.${carouselString}`);
  const carouselSlidEvent = bootstrapCustomEvent(`slid.bs.${carouselString}`);

  // CAROUSEL EVENT HANDLERS
  // =======================
  function carouselTransitionEndHandler(self) {
    const {
      index, direction, element, slides, options, isAnimating,
    } = self;

    // discontinue disposed instances
    if (isAnimating && element[carouselComponent]) {
      const activeItem = getActiveIndex(self);
      const orientation = direction === 'left' ? 'next' : 'prev';
      const directionClass = direction === 'left' ? 'start' : 'end';
      self.isAnimating = false;

      addClass(slides[index], activeClass);
      removeClass(slides[activeItem], activeClass);

      removeClass(slides[index], `${carouselItem}-${orientation}`);
      removeClass(slides[index], `${carouselItem}-${directionClass}`);
      removeClass(slides[activeItem], `${carouselItem}-${directionClass}`);

      element.dispatchEvent(carouselSlidEvent);

      // check for element, might have been disposed
      if (!document.hidden && options.interval
        && !hasClass(element, pausedClass)) {
        self.cycle();
      }
    }
  }

  function carouselPauseHandler(e) {
    const eventTarget = e.target;
    const self = eventTarget.closest(carouselSelector)[carouselComponent];
    const { element, isAnimating } = self;

    if (!hasClass(element, pausedClass)) {
      addClass(element, pausedClass);
      if (!isAnimating) {
        clearInterval(self.timer);
        self.timer = null;
      }
    }
  }

  function carouselResumeHandler(e) {
    const eventTarget = e.target;
    const self = eventTarget.closest(carouselSelector)[carouselComponent];
    const { isPaused, isAnimating, element } = self;

    if (!isPaused && hasClass(element, pausedClass)) {
      removeClass(element, pausedClass);

      if (!isAnimating) {
        clearInterval(self.timer);
        self.timer = null;
        self.cycle();
      }
    }
  }

  function carouselIndicatorHandler(e) {
    e.preventDefault();
    const { target } = e;
    const self = target.closest(carouselSelector)[carouselComponent];

    if (self.isAnimating) return;

    const newIndex = target.getAttribute(dataBsSlideTo);

    if (target && !hasClass(target, activeClass) // event target is not active
      && newIndex) { // AND has the specific attribute
      self.to(+newIndex); // do the slide
    }
  }

  function carouselControlsHandler(e) {
    e.preventDefault();
    const that = this;
    const self = that.closest(carouselSelector)[carouselComponent];
    const { controls } = self;

    if (controls[1] && that === controls[1]) {
      self.next();
    } else if (controls[1] && that === controls[0]) {
      self.prev();
    }
  }

  function carouselKeyHandler({ which }) {
    const [element] = Array.from(document.querySelectorAll(carouselSelector))
      .filter((x) => isElementInScrollRange(x));

    if (!element) return;
    const self = element[carouselComponent];

    switch (which) {
      case 39:
        self.next();
        break;
      case 37:
        self.prev();
        break;
    }
  }

  // CAROUSEL TOUCH HANDLERS
  // =======================
  function carouselTouchDownHandler(e) {
    const element = this;
    const self = element[carouselComponent];

    if (!self || self.isTouch) { return; }

    startX = e.changedTouches[0].pageX;

    if (element.contains(e.target)) {
      self.isTouch = true;
      toggleCarouselTouchHandlers(self, 1);
    }
  }

  function carouselTouchMoveHandler(e) {
    const { changedTouches, type } = e;
    const self = this[carouselComponent];

    if (!self || !self.isTouch) { return; }

    currentX = changedTouches[0].pageX;

    // cancel touch if more than one changedTouches detected
    if (type === 'touchmove' && changedTouches.length > 1) {
      e.preventDefault();
    }
  }

  function carouselTouchEndHandler(e) {
    const element = this;
    const self = element[carouselComponent];

    if (!self || !self.isTouch) { return; }

    endX = currentX || e.changedTouches[0].pageX;

    if (self.isTouch) {
      // the event target is outside the carousel OR carousel doens't include the related target
      if ((!element.contains(e.target) || !element.contains(e.relatedTarget))
        && Math.abs(startX - endX) < 75) { // AND swipe distance is less than 75px
        // when the above conditions are satisfied, no need to continue
        return;
      } // OR determine next index to slide to
      if (currentX < startX) {
        self.index += 1;
      } else if (currentX > startX) {
        self.index -= 1;
      }

      self.isTouch = false;
      self.to(self.index); // do the slide

      toggleCarouselTouchHandlers(self); // remove touch events handlers
    }
  }

  // CAROUSEL PRIVATE METHODS
  // ========================
  function activateCarouselIndicator(self, pageIndex) { // indicators
    const { indicators } = self;
    Array.from(indicators).forEach((x) => removeClass(x, activeClass));
    if (self.indicators[pageIndex]) addClass(indicators[pageIndex], activeClass);
  }

  function toggleCarouselTouchHandlers(self, add) {
    const { element } = self;
    const action = add ? addEventListener : removeEventListener;
    element[action]('touchmove', carouselTouchMoveHandler, passiveHandler);
    element[action]('touchend', carouselTouchEndHandler, passiveHandler);
  }

  function toggleCarouselHandlers(self, add) {
    const {
      element, options, slides, controls, indicator,
    } = self;
    const {
      touch, pause, interval, keyboard,
    } = options;
    const action = add ? addEventListener : removeEventListener;

    if (pause && interval) {
      element[action]('mouseenter', carouselPauseHandler);
      element[action]('mouseleave', carouselResumeHandler);
      element[action]('touchstart', carouselPauseHandler, passiveHandler);
      element[action]('touchend', carouselResumeHandler, passiveHandler);
    }

    if (touch && slides.length > 1) {
      element[action]('touchstart', carouselTouchDownHandler, passiveHandler);
    }

    controls.forEach((arrow) => {
      if (arrow) arrow[action]('click', carouselControlsHandler);
    });

    if (indicator) indicator[action]('click', carouselIndicatorHandler);
    if (keyboard) window[action]('keydown', carouselKeyHandler);
  }

  function getActiveIndex(self) {
    const { slides, element } = self;
    return Array.from(slides)
      .indexOf(element.getElementsByClassName(`${carouselItem} ${activeClass}`)[0]) || 0;
  }

  // CAROUSEL DEFINITION
  // ===================
  class Carousel extends BaseComponent {
    constructor(target, config) {
      super(carouselComponent, target, defaultCarouselOptions, config);
      // bind
      const self = this;

      // additional properties
      self.timer = null;
      self.direction = 'left';
      self.isPaused = false;
      self.isAnimating = false;
      self.index = 0;
      self.timer = null;
      self.isTouch = false;

      // initialization element
      const { element } = self;
      // carousel elements
      // a LIVE collection is prefferable
      self.slides = element.getElementsByClassName(carouselItem);
      const { slides } = self;

      // invalidate when not enough items
      // no need to go further
      if (slides.length < 2) { return; }

      self.controls = [
        queryElement(`.${carouselControl}-prev`, element),
        queryElement(`.${carouselControl}-next`, element),
      ];

      // a LIVE collection is prefferable
      self.indicator = queryElement('.carousel-indicators', element);
      self.indicators = (self.indicator && self.indicator.querySelectorAll(`[${dataBsSlideTo}]`)) || [];

      // set JavaScript and DATA API options
      const { options } = self;

      // don't use TRUE as interval, it's actually 0, use the default 5000ms better
      self.options.interval = options.interval === true
        ? defaultCarouselOptions.interval
        : options.interval;

      // set first slide active if none
      if (getActiveIndex(self) < 0) {
        if (slides.length) addClass(slides[0], activeClass);
        if (self.indicators.length) activateCarouselIndicator(self, 0);
      }

      // attach event handlers
      toggleCarouselHandlers(self, 1);

      // start to cycle if interval is set
      if (options.interval) self.cycle();
    }

    // CAROUSEL PUBLIC METHODS
    // =======================
    cycle() {
      const self = this;
      const { isPaused, element, options } = self;
      if (self.timer) {
        clearInterval(self.timer);
        self.timer = null;
      }

      if (isPaused) {
        removeClass(element, pausedClass);
        self.isPaused = !isPaused;
      }

      self.timer = setInterval(() => {
        if (isElementInScrollRange(element)) {
          self.index += 1;
          self.to(self.index);
        }
      }, options.interval);
    }

    pause() {
      const self = this;
      const { element, options, isPaused } = self;
      if (options.interval && !isPaused) {
        clearInterval(self.timer);
        self.timer = null;
        addClass(element, pausedClass);
        self.isPaused = !isPaused;
      }
    }

    next() {
      const self = this;
      if (!self.isAnimating) { self.index += 1; self.to(self.index); }
    }

    prev() {
      const self = this;
      if (!self.isAnimating) { self.index -= 1; self.to(self.index); }
    }

    to(idx) {
      const self = this;
      const {
        element, isAnimating, slides, options,
      } = self;
      const activeItem = getActiveIndex(self);
      let next = idx;

      // when controled via methods, make sure to check again
      // first return if we're on the same item #227
      if (isAnimating || activeItem === next) return;

      // determine transition direction
      if ((activeItem < next) || (activeItem === 0 && next === slides.length - 1)) {
        self.direction = 'left'; // next
      } else if ((activeItem > next) || (activeItem === slides.length - 1 && next === 0)) {
        self.direction = 'right'; // prev
      }
      const { direction } = self;

      // find the right next index
      if (next < 0) { next = slides.length - 1; } else if (next >= slides.length) { next = 0; }

      // orientation, class name, eventProperties
      const orientation = direction === 'left' ? 'next' : 'prev';
      const directionClass = direction === 'left' ? 'start' : 'end';
      const eventProperties = {
        relatedTarget: slides[next], direction, from: activeItem, to: next,
      };

      // update event properties
      Object.keys(eventProperties).forEach((k) => {
        carouselSlideEvent[k] = eventProperties[k];
        carouselSlidEvent[k] = eventProperties[k];
      });

      // discontinue when prevented
      element.dispatchEvent(carouselSlideEvent);
      if (carouselSlideEvent.defaultPrevented) return;

      // update index
      self.index = next;

      clearInterval(self.timer);
      self.timer = null;

      self.isAnimating = true;
      activateCarouselIndicator(self, next);

      if (getElementTransitionDuration(slides[next]) && hasClass(element, 'slide')) {
        addClass(slides[next], `${carouselItem}-${orientation}`);
        reflow(slides[next]);
        addClass(slides[next], `${carouselItem}-${directionClass}`);
        addClass(slides[activeItem], `${carouselItem}-${directionClass}`);

        emulateTransitionEnd(slides[next], () => carouselTransitionEndHandler(self));
      } else {
        addClass(slides[next], activeClass);
        removeClass(slides[activeItem], activeClass);

        setTimeout(() => {
          self.isAnimating = false;

          // check for element, might have been disposed
          if (element && options.interval && !hasClass(element, pausedClass)) {
            self.cycle();
          }

          element.dispatchEvent(carouselSlidEvent);
        }, 100);
      }
    }

    dispose() {
      const self = this;
      const { slides } = self;
      const itemClasses = ['start', 'end', 'prev', 'next'];

      Array.from(slides).forEach((slide, idx) => {
        if (hasClass(slide, activeClass)) activateCarouselIndicator(self, idx);
        itemClasses.forEach((c) => removeClass(slide, `${carouselItem}-${c}`));
      });

      toggleCarouselHandlers(self);
      clearInterval(self.timer);
      super.dispose(carouselComponent);
    }
  }

  Carousel.init = {
    component: carouselComponent,
    selector: carouselSelector,
    constructor: Carousel,
  };

  return Carousel;

})));
