/*!
  * Native JavaScript for Bootstrap v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BSN = factory());
}(this, (function () { 'use strict';

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

  /* Native JavaScript for Bootstrap 4 | Alert
  -------------------------------------------- */

  // ALERT DEFINITION
  // ================

  function Alert(elem) {
    var element;

    // bind
    var self = this;

    // the target alert
    var alert;

    // custom events
    var closeCustomEvent = bootstrapCustomEvent('close', 'alert');
    var closedCustomEvent = bootstrapCustomEvent('closed', 'alert');

    // private methods
    function triggerHandler() {
      if (alert.classList.contains('fade')) { emulateTransitionEnd(alert, transitionEndHandler); }
      else { transitionEndHandler(); }
    }
    function toggleEvents(add) {
      var action = add ? 'addEventListener' : 'removeEventListener';
      element[action]('click', clickHandler, false);
    }

    // event handlers
    function clickHandler(e) {
      alert = e && e.target.closest('.alert');
      element = queryElement('[data-dismiss="alert"]', alert);
      if (element && alert && (element === e.target || element.contains(e.target))) { self.close(); }
    }
    function transitionEndHandler() {
      toggleEvents();
      alert.parentNode.removeChild(alert);
      dispatchCustomEvent.call(alert, closedCustomEvent);
    }

    // PUBLIC METHODS
    self.close = function () {
      if (alert && element && alert.classList.contains('show')) {
        dispatchCustomEvent.call(alert, closeCustomEvent);
        if (closeCustomEvent.defaultPrevented) { return; }
        self.dispose();
        alert.classList.remove('show');
        triggerHandler();
      }
    };

    self.dispose = function () {
      toggleEvents();
      delete element.Alert;
    };

    // INIT
    // initialization element
    element = queryElement(elem);

    // find the target alert
    alert = element.closest('.alert');

    // reset on re-init
    if (element.Alert) { element.Alert.dispose(); }

    // prevent adding event handlers twice
    if (!element.Alert) { toggleEvents(1); }

    // store init object within target element
    self.element = element;
    element.Alert = self;
  }

  /* Native JavaScript for Bootstrap 4 | Button
  ---------------------------------------------*/

  // BUTTON DEFINITION
  // =================

  function Button(elem) {
    var element;

    // bind and labels
    var self = this;
    var labels;

    // changeEvent
    var changeCustomEvent = bootstrapCustomEvent('change', 'button');

    // private methods
    function toggle(e) {
      var eTarget = e.target;
      var parentLabel = eTarget.closest('LABEL'); // the .btn label
      var label = null;

      if (eTarget.tagName === 'LABEL') {
        label = eTarget;
      } else if (parentLabel) {
        label = parentLabel;
      }

      // current input
      var input = label && label.getElementsByTagName('INPUT')[0];

      // invalidate if no input
      if (!input) { return; }

      dispatchCustomEvent.call(input, changeCustomEvent); // trigger the change for the input
      dispatchCustomEvent.call(element, changeCustomEvent); // trigger the change for the btn-group

      // manage the dom manipulation
      if (input.type === 'checkbox') { // checkboxes
        if (changeCustomEvent.defaultPrevented) { return; } // discontinue when defaultPrevented is true

        if (!input.checked) {
          label.classList.add('active');
          input.getAttribute('checked');
          input.setAttribute('checked', 'checked');
          input.checked = true;
        } else {
          label.classList.remove('active');
          input.getAttribute('checked');
          input.removeAttribute('checked');
          input.checked = false;
        }

        if (!element.toggled) { // prevent triggering the event twice
          element.toggled = true;
        }
      }

      if (input.type === 'radio' && !element.toggled) { // radio buttons
        if (changeCustomEvent.defaultPrevented) { return; }
        // don't trigger if already active
        // (the OR condition is a hack to check if the buttons were selected
        // with key press and NOT mouse click)
        if (!input.checked || (e.screenX === 0 && e.screenY === 0)) {
          label.classList.add('active');
          label.classList.add('focus');
          input.setAttribute('checked', 'checked');
          input.checked = true;

          element.toggled = true;
          Array.from(labels).forEach(function (otherLabel) {
            var otherInput = otherLabel.getElementsByTagName('INPUT')[0];
            if (otherLabel !== label && otherLabel.classList.contains('active')) {
              dispatchCustomEvent.call(otherInput, changeCustomEvent); // trigger the change
              otherLabel.classList.remove('active');
              otherInput.removeAttribute('checked');
              otherInput.checked = false;
            }
          });
        }
      }
      setTimeout(function () { element.toggled = false; }, 50);
    }

    // handlers
    function keyHandler(e) {
      var key = e.which || e.keyCode;
      if (key === 32 && e.target === document.activeElement) { toggle(e); }
    }
    function preventScroll(e) {
      var key = e.which || e.keyCode;
      if (key === 32) { e.preventDefault(); }
    }
    function focusToggle(e) {
      if (e.target.tagName === 'INPUT') {
        var action = e.type === 'focusin' ? 'add' : 'remove';
        e.target.closest('.btn').classList[action]('focus');
      }
    }
    function toggleEvents(add) {
      var action = add ? 'addEventListener' : 'removeEventListener';
      element[action]('click', toggle, false);
      element[action]('keyup', keyHandler, false);
      element[action]('keydown', preventScroll, false);
      element[action]('focusin', focusToggle, false);
      element[action]('focusout', focusToggle, false);
    }

    // public method
    self.dispose = function () {
      toggleEvents();
      delete element.Button;
    };

    // init
    // initialization element
    element = queryElement(elem);

    // reset on re-init
    if (element.Button) { element.Button.dispose(); }

    labels = element.getElementsByClassName('btn');

    // invalidate
    if (!labels.length) { return; }

    // prevent adding event handlers twice
    if (!element.Button) { toggleEvents(1); }

    // set initial toggled state
    // toggled makes sure to prevent triggering twice the change.bs.button events
    element.toggled = false;

    // associate target with init object
    element.Button = self;

    // activate items on load
    Array.from(labels).forEach(function (btn) {
      var hasChecked = queryElement('input:checked', btn);
      if (!btn.classList.contains('active') && hasChecked) {
        btn.classList.add('active');
      }
      if (btn.classList.contains('active') && !hasChecked) {
        btn.classList.remove('active');
      }
    });
  }

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

  function isElementInScrollRange(element) {
    var bcr = element.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return bcr.top <= viewportHeight && bcr.bottom >= 0; // bottom && top
  }

  function reflow(element) {
    return element.offsetHeight;
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

  /* Native JavaScript for Bootstrap 4 | Collapse
  ----------------------------------------------- */

  // COLLAPSE DEFINITION
  // ===================

  function Collapse(elem, opsInput) {
    var element;
    // set options
    var options = opsInput || {};

    // bind
    var self = this;

    // target practice
    var accordion = null;
    var collapse = null;
    var activeCollapse;
    var activeElement;
    // custom events
    var showCustomEvent;
    var shownCustomEvent;
    var hideCustomEvent;
    var hiddenCustomEvent;

    // private methods
    function openAction(collapseElement, toggle) {
      dispatchCustomEvent.call(collapseElement, showCustomEvent);
      if (showCustomEvent.defaultPrevented) { return; }
      collapseElement.isAnimating = true;
      collapseElement.classList.add('collapsing');
      collapseElement.classList.remove('collapse');
      collapseElement.style.height = (collapseElement.scrollHeight) + "px";

      emulateTransitionEnd(collapseElement, function () {
        collapseElement.isAnimating = false;
        collapseElement.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-expanded', 'true');
        collapseElement.classList.remove('collapsing');
        collapseElement.classList.add('collapse');
        collapseElement.classList.add('show');
        collapseElement.style.height = '';
        dispatchCustomEvent.call(collapseElement, shownCustomEvent);
      });
    }
    function closeAction(collapseElement, toggle) {
      dispatchCustomEvent.call(collapseElement, hideCustomEvent);
      if (hideCustomEvent.defaultPrevented) { return; }
      collapseElement.isAnimating = true;
      collapseElement.style.height = (collapseElement.scrollHeight) + "px"; // set height first
      collapseElement.classList.remove('collapse');
      collapseElement.classList.remove('show');
      collapseElement.classList.add('collapsing');
      reflow(collapseElement); // force reflow to enable transition
      collapseElement.style.height = '0px';

      emulateTransitionEnd(collapseElement, function () {
        collapseElement.isAnimating = false;
        collapseElement.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        collapseElement.classList.remove('collapsing');
        collapseElement.classList.add('collapse');
        collapseElement.style.height = '';
        dispatchCustomEvent.call(collapseElement, hiddenCustomEvent);
      });
    }

    // public methods
    self.toggle = function (e) {
      if ((e && e.target.tagName === 'A') || element.tagName === 'A') { e.preventDefault(); }
      if (element.contains(e.target) || e.target === element) {
        if (!collapse.classList.contains('show')) { self.show(); }
        else { self.hide(); }
      }
    };
    self.hide = function () {
      if (collapse.isAnimating) { return; }
      closeAction(collapse, element);
      element.classList.add('collapsed');
    };
    self.show = function () {
      var assign;

      if (accordion) {
        (assign = accordion.getElementsByClassName('collapse show'), activeCollapse = assign[0]);
        activeElement = activeCollapse && (queryElement(("[data-target=\"#" + (activeCollapse.id) + "\"]"), accordion)
                      || queryElement(("[href=\"#" + (activeCollapse.id) + "\"]"), accordion));
      }

      if (!collapse.isAnimating) {
        if (activeElement && activeCollapse !== collapse) {
          closeAction(activeCollapse, activeElement);
          activeElement.classList.add('collapsed');
        }
        openAction(collapse, element);
        element.classList.remove('collapsed');
      }
    };
    self.dispose = function () {
      element.removeEventListener('click', self.toggle, false);
      delete element.Collapse;
    };

    // init

    // initialization element
    element = queryElement(elem);

    // reset on re-init
    if (element.Collapse) { element.Collapse.dispose(); }

    // DATA API
    var accordionData = element.getAttribute('data-parent');

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'collapse');
    shownCustomEvent = bootstrapCustomEvent('shown', 'collapse');
    hideCustomEvent = bootstrapCustomEvent('hide', 'collapse');
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'collapse');

    // determine targets
    collapse = queryElement(options.target || element.getAttribute('data-target') || element.getAttribute('href'));

    if (collapse !== null) { collapse.isAnimating = false; }
    accordion = element.closest(options.parent || accordionData);

    // prevent adding event handlers twice
    if (!element.Collapse) {
      element.addEventListener('click', self.toggle, false);
    }

    // associate target to init object
    element.Collapse = self;
  }

  function setFocus(element) {
    element.focus();
  }

  /* Native JavaScript for Bootstrap 4 | Dropdown
  ----------------------------------------------- */

  // DROPDOWN DEFINITION
  // ===================

  function Dropdown(elem, option) {
    var element;

    // bind
    var self = this;

    // custom events
    var showCustomEvent;
    var shownCustomEvent;
    var hideCustomEvent;
    var hiddenCustomEvent;
    // targets
    var relatedTarget = null;
    var parent; var menu; var menuItems = [];
    // option
    var persist;

    // preventDefault on empty anchor links
    function preventEmptyAnchor(anchor) {
      if ((anchor.href && anchor.href.slice(-1) === '#') || (anchor.parentNode && anchor.parentNode.href
        && anchor.parentNode.href.slice(-1) === '#')) { this.preventDefault(); }
    }
    // toggle dismissible events
    function toggleDismiss() {
      var action = element.open ? 'addEventListener' : 'removeEventListener';
      document[action]('click', dismissHandler, false);
      document[action]('keydown', preventScroll, false);
      document[action]('keyup', keyHandler, false);
      document[action]('focus', dismissHandler, false);
    }
    // handlers
    function dismissHandler(e) {
      var eventTarget = e.target;
      if (!eventTarget.getAttribute) { return; } // some weird FF bug #409
      var hasData = ((eventTarget && (eventTarget.getAttribute('data-toggle')))
                                  || (eventTarget.parentNode && eventTarget.parentNode.getAttribute
                                  && eventTarget.parentNode.getAttribute('data-toggle')));
      if (e.type === 'focus' && (eventTarget === element || eventTarget === menu || menu.contains(eventTarget))) {
        return;
      }
      if ((eventTarget === menu || menu.contains(eventTarget)) && (persist || hasData)) { return; }

      relatedTarget = eventTarget === element || element.contains(eventTarget) ? element : null;
      self.hide();

      preventEmptyAnchor.call(e, eventTarget);
    }
    function clickHandler(e) {
      relatedTarget = element;
      self.show();
      preventEmptyAnchor.call(e, e.target);
    }
    function preventScroll(e) {
      var key = e.which || e.keyCode;
      if (key === 38 || key === 40) { e.preventDefault(); }
    }
    function keyHandler(e) {
      var key = e.which || e.keyCode;
      var activeItem = document.activeElement;
      var isSameElement = activeItem === element;
      var isInsideMenu = menu.contains(activeItem);
      var isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;
      var idx = menuItems.indexOf(activeItem);

      if (isMenuItem) { // navigate up | down
        if (isSameElement) {
          idx = 0;
        } else if (key === 38) {
          idx = idx > 1 ? idx - 1 : 0;
        } else if (key === 40) {
          idx = idx < menuItems.length - 1 ? idx + 1 : idx;
        }

        if (menuItems[idx]) { setFocus(menuItems[idx]); }
      }
      if (((menuItems.length && isMenuItem) // menu has items
            || (!menuItems.length && (isInsideMenu || isSameElement)) // menu might be a form
            || !isInsideMenu) // or the focused element is not in the menu at all
            && element.open && key === 27 // menu must be open
      ) {
        self.toggle();
        relatedTarget = null;
      }
    }

    // public methods
    self.show = function () {
      showCustomEvent = bootstrapCustomEvent('show', 'dropdown', { relatedTarget: relatedTarget });
      dispatchCustomEvent.call(parent, showCustomEvent);
      if (showCustomEvent.defaultPrevented) { return; }

      menu.classList.add('show');
      parent.classList.add('show');
      element.setAttribute('aria-expanded', true);
      element.open = true;
      element.removeEventListener('click', clickHandler, false);
      setTimeout(function () {
        setFocus(menu.getElementsByTagName('INPUT')[0] || element); // focus the first input item | element
        toggleDismiss();
        shownCustomEvent = bootstrapCustomEvent('shown', 'dropdown', { relatedTarget: relatedTarget });
        dispatchCustomEvent.call(parent, shownCustomEvent);
      }, 1);
    };
    self.hide = function () {
      hideCustomEvent = bootstrapCustomEvent('hide', 'dropdown', { relatedTarget: relatedTarget });
      dispatchCustomEvent.call(parent, hideCustomEvent);
      if (hideCustomEvent.defaultPrevented) { return; }

      menu.classList.remove('show');
      parent.classList.remove('show');
      element.setAttribute('aria-expanded', false);
      element.open = false;
      toggleDismiss();
      setFocus(element);
      setTimeout(function () {
        // only re-attach handler if the init is not disposed
        if (element.Dropdown) { element.addEventListener('click', clickHandler, false); }
      }, 1);

      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'dropdown', { relatedTarget: relatedTarget });
      dispatchCustomEvent.call(parent, hiddenCustomEvent);
    };
    self.toggle = function () {
      if (parent.classList.contains('show') && element.open) { self.hide(); } else { self.show(); }
    };
    self.dispose = function () {
      if (parent.classList.contains('show') && element.open) { self.hide(); }
      element.removeEventListener('click', clickHandler, false);
      delete element.Dropdown;
    };

    // init

    // initialization element
    element = queryElement(elem);

    // reset on re-init
    if (element.Dropdown) { element.Dropdown.dispose(); }

    // set  targets
    parent = element.parentNode;
    menu = queryElement('.dropdown-menu', parent);

    Array.from(menu.children).forEach(function (child) {
      if (child.children.length && child.children[0].tagName === 'A') {
        menuItems.push(child.children[0]);
      }
      if (child.tagName === 'A') { menuItems.push(child); }
    });

    // prevent adding event handlers twice
    if (!element.Dropdown) {
      if (!('tabindex' in menu)) { menu.setAttribute('tabindex', '0'); } // Fix onblur on Chrome | Safari
      element.addEventListener('click', clickHandler, false);
    }

    // set option
    persist = option === true || element.getAttribute('data-persist') === 'true' || false;

    // set initial state to closed
    element.open = false;

    // associate element with init object
    element.Dropdown = self;
  }

  /* Native JavaScript for Bootstrap 4 | Modal
  -------------------------------------------- */

  // MODAL DEFINITION
  // ================

  function Modal(elem, opsInput) { // element can be the modal/triggering button
    var element;

    // set options
    var options = opsInput || {};

    // bind, modal
    var self = this;
    var modal;

    // custom events
    var showCustomEvent;
    var shownCustomEvent;
    var hideCustomEvent;
    var hiddenCustomEvent;
    // event targets and other
    var relatedTarget = null;
    var scrollBarWidth;
    var overlay;
    var overlayDelay;

    // also find fixed-top / fixed-bottom items
    var fixedItems;
    var ops = {};

    // private methods
    function setScrollbar() {
      var bodyClassList = document.body.classList;
      var openModal = bodyClassList.contains('modal-open');
      var bodyPad = parseInt(getComputedStyle(document.body).paddingRight, 10);
      var docClientHeight = document.documentElement.clientHeight;
      var docScrollHeight = document.documentElement.scrollHeight;
      var bodyClientHeight = document.body.clientHeight;
      var bodyScrollHeight = document.body.scrollHeight;
      var bodyOverflow = docClientHeight !== docScrollHeight
                      || bodyClientHeight !== bodyScrollHeight;
      var modalOverflow = modal.clientHeight !== modal.scrollHeight;

      scrollBarWidth = measureScrollbar();

      modal.style.paddingRight = !modalOverflow && scrollBarWidth ? (scrollBarWidth + "px") : '';
      document.body.style.paddingRight = modalOverflow || bodyOverflow
        ? ((bodyPad + (openModal ? 0 : scrollBarWidth)) + "px") : '';

      if (fixedItems.length) {
        fixedItems.forEach(function (fixed) {
          var itemPad = getComputedStyle(fixed).paddingRight;
          fixed.style.paddingRight = modalOverflow || bodyOverflow
            ? ((parseInt(itemPad, 10) + (openModal ? 0 : scrollBarWidth)) + "px")
            : ((parseInt(itemPad, 10)) + "px");
        });
      }
    }
    function resetScrollbar() {
      document.body.style.paddingRight = '';
      modal.style.paddingRight = '';
      if (fixedItems.length) {
        fixedItems.forEach(function (fixed) {
          fixed.style.paddingRight = '';
        });
      }
    }
    function measureScrollbar() {
      var scrollDiv = document.createElement('div');
      scrollDiv.className = 'modal-scrollbar-measure'; // this is here to stay
      document.body.appendChild(scrollDiv);
      var widthValue = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return widthValue;
    }
    function createOverlay() {
      var newOverlay = document.createElement('div');
      overlay = queryElement('.modal-backdrop');

      if (overlay === null) {
        newOverlay.setAttribute('class', ("modal-backdrop" + (ops.animation ? ' fade' : '')));
        overlay = newOverlay;
        document.body.appendChild(overlay);
      }
      return overlay;
    }
    function removeOverlay() {
      overlay = queryElement('.modal-backdrop');
      if (overlay && !document.getElementsByClassName('modal show')[0]) {
        document.body.removeChild(overlay); overlay = null;
      }
      if (overlay === null) {
        document.body.classList.remove('modal-open');
        resetScrollbar();
      }
    }
    function toggleEvents(add) {
      var action = add ? 'addEventListener' : 'removeEventListener';
      window[action]('resize', self.update, passiveHandler);
      modal[action]('click', dismissHandler, false);
      document[action]('keydown', keyHandler, false);
    }
    // triggers
    function beforeShow() {
      modal.style.display = 'block';

      setScrollbar();
      if (!document.getElementsByClassName('modal show')[0]) { document.body.classList.add('modal-open'); }

      modal.classList.add('show');
      modal.setAttribute('aria-hidden', false);

      if (modal.classList.contains('fade')) { emulateTransitionEnd(modal, triggerShow); }
      else { triggerShow(); }
    }
    function triggerShow() {
      setFocus(modal);
      modal.isAnimating = false;

      toggleEvents(1);

      shownCustomEvent = bootstrapCustomEvent('shown', 'modal', { relatedTarget: relatedTarget });
      dispatchCustomEvent.call(modal, shownCustomEvent);
    }
    function triggerHide(force) {
      modal.style.display = '';
      if (element) { setFocus(element); }

      overlay = queryElement('.modal-backdrop');

      // force can also be the transitionEvent object, we wanna make sure it's not
      if (force !== 1 && overlay && overlay.classList.contains('show') && !document.getElementsByClassName('modal show')[0]) {
        overlay.classList.remove('show');
        emulateTransitionEnd(overlay, removeOverlay);
      } else {
        removeOverlay();
      }

      toggleEvents();

      modal.isAnimating = false;

      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'modal');
      dispatchCustomEvent.call(modal, hiddenCustomEvent);
    }
    // handlers
    function clickHandler(e) {
      if (modal.isAnimating) { return; }
      var clickTarget = e.target;
      var modalID = "#" + (modal.getAttribute('id'));
      var targetAttrValue = clickTarget.getAttribute('data-target') || clickTarget.getAttribute('href');
      var elemAttrValue = element.getAttribute('data-target') || element.getAttribute('href');

      if (!modal.classList.contains('show')
          && ((clickTarget === element && targetAttrValue === modalID)
          || (element.contains(clickTarget) && elemAttrValue === modalID))) {
        modal.modalTrigger = element;
        relatedTarget = element;
        self.show();
        e.preventDefault();
      }
    }
    function keyHandler(ref) {
      var which = ref.which;

      if (!modal.isAnimating && ops.keyboard && which === 27 && modal.classList.contains('show')) {
        self.hide();
      }
    }
    function dismissHandler(e) {
      if (modal.isAnimating) { return; }
      var clickTarget = e.target;
      var hasData = clickTarget.getAttribute('data-dismiss') === 'modal';
      var parentWithData = clickTarget.closest('[data-dismiss="modal"]');

      if (modal.classList.contains('show') && (parentWithData || hasData
          || (clickTarget === modal && ops.backdrop !== 'static'))) {
        self.hide(); relatedTarget = null;
        e.preventDefault();
      }
    }

    // public methods
    self.toggle = function () {
      if (modal.classList.contains('show')) { self.hide(); } else { self.show(); }
    };
    self.show = function () {
      if (modal.classList.contains('show') && !!modal.isAnimating) { return; }

      showCustomEvent = bootstrapCustomEvent('show', 'modal', { relatedTarget: relatedTarget });
      dispatchCustomEvent.call(modal, showCustomEvent);

      if (showCustomEvent.defaultPrevented) { return; }

      modal.isAnimating = true;

      // we elegantly hide any opened modal
      var currentOpen = document.getElementsByClassName('modal show')[0];
      if (currentOpen && currentOpen !== modal) {
        if (currentOpen.modalTrigger) { currentOpen.modalTrigger.Modal.hide(); }
        if (currentOpen.Modal) { currentOpen.Modal.hide(); }
      }

      if (ops.backdrop) { overlay = createOverlay(); }

      if (overlay && !currentOpen && !overlay.classList.contains('show')) {
        reflow(overlay);
        overlayDelay = getElementTransitionDuration(overlay);
        overlay.classList.add('show');
      }

      if (!currentOpen) { setTimeout(beforeShow, overlay && overlayDelay ? overlayDelay : 0); }
      else { beforeShow(); }
    };
    self.hide = function (force) {
      if (!modal.classList.contains('show')) { return; }

      hideCustomEvent = bootstrapCustomEvent('hide', 'modal');
      dispatchCustomEvent.call(modal, hideCustomEvent);
      if (hideCustomEvent.defaultPrevented) { return; }

      modal.isAnimating = true;

      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', true);

      if (modal.classList.contains('fade') && force !== 1) { emulateTransitionEnd(modal, triggerHide); }
      else { triggerHide(); }
    };
    self.setContent = function (content) {
      queryElement('.modal-content', modal).innerHTML = content;
    };
    self.update = function () {
      if (modal.classList.contains('show')) {
        setScrollbar();
      }
    };
    self.dispose = function () {
      self.hide(1);
      if (element) { element.removeEventListener('click', clickHandler, false); delete element.Modal; } else { delete modal.Modal; }
    };

    // init

    // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
    element = queryElement(elem);

    // determine modal, triggering element
    var checkModal = queryElement(element.getAttribute('data-target') || element.getAttribute('href'));
    modal = element.classList.contains('modal') ? element : checkModal;

    // set fixed items
    fixedItems = Array.from(document.getElementsByClassName('fixed-top'))
      .concat(Array.from(document.getElementsByClassName('fixed-bottom')));

    if (element.classList.contains('modal')) { element = null; } // modal is now independent of it's triggering element

    // reset on re-init
    if (element && element.Modal) { element.Modal.dispose(); }
    if (modal && modal.Modal) { modal.Modal.dispose(); }

    // set options
    ops.keyboard = !(options.keyboard === false || modal.getAttribute('data-keyboard') === 'false');
    ops.backdrop = options.backdrop === 'static' || modal.getAttribute('data-backdrop') === 'static' ? 'static' : true;
    ops.backdrop = options.backdrop === false || modal.getAttribute('data-backdrop') === 'false' ? false : ops.backdrop;
    ops.animation = !!modal.classList.contains('fade');
    ops.content = options.content; // JavaScript only

    // set an initial state of the modal
    modal.isAnimating = false;

    // prevent adding event handlers over and over
    // modal is independent of a triggering element
    if (element && !element.Modal) {
      element.addEventListener('click', clickHandler, false);
    }

    if (ops.content) {
      self.setContent(ops.content.trim());
    }

    // set associations
    if (element) {
      modal.modalTrigger = element;
      element.Modal = self;
    } else {
      modal.Modal = self;
    }
  }

  var mouseClickEvents = { down: 'mousedown', up: 'mouseup' };

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

  /* Native JavaScript for Bootstrap 5 | ScrollSpy
  ------------------------------------------------ */

  // SCROLLSPY DEFINITION
  // ====================

  function ScrollSpy(elem, opsInput) {
    var element;

    // set options
    var options = opsInput || {};

    // bind
    var self = this;

    // GC internals
    var vars;
    var links;

    // targets
    var spyTarget;
    // determine which is the real scrollTarget
    var scrollTarget;
    // options
    var ops = {};

    // private methods
    // populate items and targets
    function updateTargets() {
      links = spyTarget.getElementsByTagName('A');

      vars.scrollTop = vars.isWindow ? getScroll().y : element.scrollTop;

      // only update vars once or with each mutation
      if (vars.length !== links.length || getScrollHeight() !== vars.scrollHeight) {
        var href;
        var targetItem;
        var rect;

        // reset arrays & update
        vars.items = [];
        vars.offsets = [];
        vars.scrollHeight = getScrollHeight();
        vars.maxScroll = vars.scrollHeight - getOffsetHeight();

        Array.from(links).forEach(function (link) {
          href = link.getAttribute('href');
          targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);

          if (targetItem) {
            vars.items.push(link);
            rect = targetItem.getBoundingClientRect();
            vars.offsets.push((vars.isWindow
              ? rect.top + vars.scrollTop
              : targetItem.offsetTop) - ops.offset);
          }
        });
        vars.length = vars.items.length;
      }
    }
    // item update
    function toggleEvents(add) {
      var action = add ? 'addEventListener' : 'removeEventListener';
      scrollTarget[action]('scroll', self.refresh, passiveHandler);
      window[action]('resize', self.refresh, passiveHandler);
    }
    function getScrollHeight() {
      return scrollTarget.scrollHeight || Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
    }
    function getOffsetHeight() {
      return !vars.isWindow ? element.getBoundingClientRect().height : window.innerHeight;
    }
    function clear() {
      Array.from(links).map(function (item) { return item.classList.contains('active') && item.classList.remove('active'); });
    }
    function activate(input) {
      var item = input;
      var itemClassList;
      clear();
      vars.activeItem = item;
      item.classList.add('active');

      // activate all parents
      var parents = [];
      while (item.parentNode !== document.body) {
        item = item.parentNode;
        itemClassList = item.classList;

        if (itemClassList.contains('dropdown-menu') || itemClassList.contains('nav')) { parents.push(item); }
      }

      parents.forEach(function (menuItem) {
        var parentLink = menuItem.previousElementSibling;

        if (parentLink && !parentLink.classList.contains('active')) {
          parentLink.classList.add('active');
        }
      });

      dispatchCustomEvent.call(element, bootstrapCustomEvent('activate', 'scrollspy', { relatedTarget: vars.activeItem }));
    }

    // public method
    self.refresh = function () {
      updateTargets();

      if (vars.scrollTop >= vars.maxScroll) {
        var newActiveItem = vars.items[vars.length - 1];

        if (vars.activeItem !== newActiveItem) {
          activate(newActiveItem);
        }

        return;
      }

      if (vars.activeItem && vars.scrollTop < vars.offsets[0] && vars.offsets[0] > 0) {
        vars.activeItem = null;
        clear();
        return;
      }

      var i = vars.length;
      while (i > -1) {
        if (vars.activeItem !== vars.items[i] && vars.scrollTop >= vars.offsets[i]
          && (typeof vars.offsets[i + 1] === 'undefined' || vars.scrollTop < vars.offsets[i + 1])) {
          activate(vars.items[i]);
        }
        i -= 1;
      }
    };
    self.dispose = function () {
      toggleEvents();
      delete element.ScrollSpy;
    };

    // init
    // initialization element, the element we spy on
    element = queryElement(elem);

    // reset on re-init
    if (element.ScrollSpy) { element.ScrollSpy.dispose(); }

    // event targets, constants
    // DATA API
    var targetData = element.getAttribute('data-target');
    var offsetData = element.getAttribute('data-offset');

    // targets
    spyTarget = queryElement(options.target || targetData);

    // determine which is the real scrollTarget
    scrollTarget = element.clientHeight < element.scrollHeight ? element : window;

    if (!spyTarget) { return; }

    // set instance option
    ops.offset = +(options.offset || offsetData) || 10;

    // set instance priority variables
    vars = {};
    vars.length = 0;
    vars.items = [];
    vars.offsets = [];
    vars.isWindow = scrollTarget === window;
    vars.activeItem = null;
    vars.scrollHeight = 0;
    vars.maxScroll = 0;

    // prevent adding event handlers twice
    if (!element.ScrollSpy) { toggleEvents(1); }

    self.refresh();

    // associate target with init object
    element.ScrollSpy = self;
  }

  /* Native JavaScript for Bootstrap 4 | Tab
  ------------------------------------------ */

  // TAB DEFINITION
  // ==============

  function Tab(elem, opsInput) {
    var element;
    // set options
    var options = opsInput || {};

    // bind
    var self = this;

    // event targets
    var tabs;
    var dropdown;

    // custom events
    var showCustomEvent;
    var shownCustomEvent;
    var hideCustomEvent;
    var hiddenCustomEvent;

    // more GC material
    var next;
    var tabsContentContainer = false;
    var activeTab;
    var activeContent;
    var nextContent;
    var containerHeight;
    var equalContents;
    var nextHeight;

    // triggers
    function triggerEnd() {
      tabsContentContainer.style.height = '';
      tabsContentContainer.classList.remove('collapsing');
      tabs.isAnimating = false;
    }
    function triggerShow() {
      if (tabsContentContainer) { // height animation
        if (equalContents) {
          triggerEnd();
        } else {
          setTimeout(function () { // enables height animation
            tabsContentContainer.style.height = nextHeight + "px"; // height animation
            reflow(tabsContentContainer);
            emulateTransitionEnd(tabsContentContainer, triggerEnd);
          }, 50);
        }
      } else {
        tabs.isAnimating = false;
      }
      shownCustomEvent = bootstrapCustomEvent('shown', 'tab', { relatedTarget: activeTab });
      dispatchCustomEvent.call(next, shownCustomEvent);
    }
    function triggerHide() {
      if (tabsContentContainer) {
        activeContent.style.float = 'left';
        nextContent.style.float = 'left';
        containerHeight = activeContent.scrollHeight;
      }

      showCustomEvent = bootstrapCustomEvent('show', 'tab', { relatedTarget: activeTab });
      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'tab', { relatedTarget: next });

      dispatchCustomEvent.call(next, showCustomEvent);
      if (showCustomEvent.defaultPrevented) { return; }

      nextContent.classList.add('active');

      activeContent.classList.remove('active');

      if (tabsContentContainer) {
        nextHeight = nextContent.scrollHeight;
        equalContents = nextHeight === containerHeight;
        tabsContentContainer.classList.add('collapsing');
        tabsContentContainer.style.height = containerHeight + "px"; // height animation
        reflow(tabsContentContainer);
        activeContent.style.float = '';
        nextContent.style.float = '';
      }

      if (nextContent.classList.contains('fade')) {
        setTimeout(function () {
          nextContent.classList.add('show');
          emulateTransitionEnd(nextContent, triggerShow);
        }, 20);
      } else { triggerShow(); }

      dispatchCustomEvent.call(activeTab, hiddenCustomEvent);
    }
    // private methods
    function getActiveTab() {
      var assign;

      var activeTabs = tabs.getElementsByClassName('active');

      if (activeTabs.length === 1 && !activeTabs[0].parentNode.classList.contains('dropdown')) {
        (assign = activeTabs, activeTab = assign[0]);
      } else if (activeTabs.length > 1) {
        activeTab = activeTabs[activeTabs.length - 1];
      }
      return activeTab;
    }
    function getActiveContent() { return queryElement(getActiveTab().getAttribute('href')); }
    // handler
    function clickHandler(e) {
      e.preventDefault();
      next = e.currentTarget;
      if (!tabs.isAnimating) { self.show(); }
    }

    // public method
    self.show = function () { // the tab we clicked is now the next tab
      next = next || element;

      if (!next.classList.contains('active')) {
        nextContent = queryElement(next.getAttribute('href')); // this is the actual object, the next tab content to activate
        activeTab = getActiveTab();
        activeContent = getActiveContent();

        hideCustomEvent = bootstrapCustomEvent('hide', 'tab', { relatedTarget: next });
        dispatchCustomEvent.call(activeTab, hideCustomEvent);
        if (hideCustomEvent.defaultPrevented) { return; }

        tabs.isAnimating = true;
        activeTab.classList.remove('active');
        activeTab.setAttribute('aria-selected', 'false');
        next.classList.add('active');
        next.setAttribute('aria-selected', 'true');

        if (dropdown) {
          if (!element.parentNode.classList.contains('dropdown-menu')) {
            if (dropdown.classList.contains('active')) { dropdown.classList.remove('active'); }
          } else if (!dropdown.classList.contains('active')) { dropdown.classList.add('active'); }
        }

        if (activeContent.classList.contains('fade')) {
          activeContent.classList.remove('show');
          emulateTransitionEnd(activeContent, triggerHide);
        } else { triggerHide(); }
      }
    };
    self.dispose = function () {
      element.removeEventListener('click', clickHandler, false);
      delete element.Tab;
    };

    // INIT
    // initialization element
    element = queryElement(elem);

    // reset on re-init
    if (element.Tab) { element.Tab.dispose(); }

    // DATA API
    var heightData = element.getAttribute('data-height');
    // event targets
    tabs = element.closest('.nav');
    dropdown = tabs && queryElement('.dropdown-toggle', tabs);

    // instance options
    var animateHeight = !(!supportTransition || (options.height === false || heightData === 'false'));

    // set default animation state
    tabs.isAnimating = false;

    // init
    if (!element.Tab) { // prevent adding event handlers twice
      element.addEventListener('click', clickHandler, false);
    }

    if (animateHeight) { tabsContentContainer = getActiveContent().parentNode; }

    // associate target with init object
    element.Tab = self;
  }

  /* Native JavaScript for Bootstrap 4 | Toast
  -------------------------------------------- */

  // TOAST DEFINITION
  // ==================

  function Toast(elem, opsInput) {
    var element;

    // set options
    var options = opsInput || {};

    // bind
    var self = this;

    // toast, timer
    var toast;
    var timer = 0;

    // custom events
    var showCustomEvent;
    var hideCustomEvent;
    var shownCustomEvent;
    var hiddenCustomEvent;
    var ops = {};

    // private methods
    function showComplete() {
      toast.classList.remove('showing');
      toast.classList.add('show');
      dispatchCustomEvent.call(toast, shownCustomEvent);
      if (ops.autohide) { self.hide(); }
    }
    function hideComplete() {
      toast.classList.add('hide');
      dispatchCustomEvent.call(toast, hiddenCustomEvent);
    }
    function close() {
      toast.classList.remove('show');
      if (ops.animation) { emulateTransitionEnd(toast, hideComplete); }
      else { hideComplete(); }
    }
    function disposeComplete() {
      clearTimeout(timer);
      element.removeEventListener('click', self.hide, false);

      delete element.Toast;
    }

    // public methods
    self.show = function () {
      if (toast && !toast.classList.contains('show')) {
        dispatchCustomEvent.call(toast, showCustomEvent);
        if (showCustomEvent.defaultPrevented) { return; }
        if (ops.animation) { toast.classList.add('fade'); }
        toast.classList.remove('hide');
        reflow(toast); // force reflow
        toast.classList.add('showing');

        if (ops.animation) { emulateTransitionEnd(toast, showComplete); }
        else { showComplete(); }
      }
    };
    self.hide = function (noTimer) {
      if (toast && toast.classList.contains('show')) {
        dispatchCustomEvent.call(toast, hideCustomEvent);
        if (hideCustomEvent.defaultPrevented) { return; }

        if (noTimer) { close(); }
        else { timer = setTimeout(close, ops.delay); }
      }
    };
    self.dispose = function () {
      if (ops.animation) { emulateTransitionEnd(toast, disposeComplete); }
      else { disposeComplete(); }
    };

    // init

    // initialization element
    element = queryElement(elem);

    // reset on re-init
    if (element.Toast) { element.Toast.dispose(); }

    // toast, timer
    toast = element.closest('.toast');

    // DATA API
    var animationData = element.getAttribute('data-animation');
    var autohideData = element.getAttribute('data-autohide');
    var delayData = element.getAttribute('data-delay');

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'toast');
    hideCustomEvent = bootstrapCustomEvent('hide', 'toast');
    shownCustomEvent = bootstrapCustomEvent('shown', 'toast');
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'toast');

    // set instance options
    ops.animation = options.animation === false || animationData === 'false' ? 0 : 1; // true by default
    ops.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1; // true by default
    ops.delay = parseInt((options.delay || delayData), 10) || 500; // 500ms default

    if (!element.Toast) { // prevent adding event handlers twice
      element.addEventListener('click', self.hide, false);
    }

    // associate targets to init object
    element.Toast = self;
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

  var componentsInit = {};

  /* Native JavaScript for Bootstrap | Initialize Data API
  -------------------------------------------------------- */
  function initializeDataAPI(Constructor, collection) {
    Array.from(collection).map(function (x) { return new Constructor(x); });
  }
  function initCallback(context) {
    var lookUp = context instanceof Element ? context : document;
    Object.keys(componentsInit).forEach(function (component) {
      initializeDataAPI(componentsInit[component][0],
        lookUp.querySelectorAll(componentsInit[component][1]));
    });
  }

  componentsInit.Alert = [Alert, '[data-dismiss="alert"]'];
  componentsInit.Button = [Button, '[data-toggle="buttons"]'];
  componentsInit.Carousel = [Carousel, '[data-ride="carousel"]'];
  componentsInit.Collapse = [Collapse, '[data-toggle="collapse"]'];
  componentsInit.Dropdown = [Dropdown, '[data-toggle="dropdown"]'];
  componentsInit.Modal = [Modal, '[data-toggle="modal"]'];
  componentsInit.Popover = [Popover, '[data-toggle="popover"],[data-tip="popover"]'];
  componentsInit.ScrollSpy = [ScrollSpy, '[data-spy="scroll"]'];
  componentsInit.Tab = [Tab, '[data-toggle="tab"]'];
  componentsInit.Toast = [Toast, '[data-dismiss="toast"]'];
  componentsInit.Tooltip = [Tooltip, '[data-toggle="tooltip"],[data-tip="tooltip"]'];

  // bulk initialize all components
  if (document.body) { initCallback(); }
  else {
    document.addEventListener('DOMContentLoaded', function initWrapper() {
      initCallback();
      document.removeEventListener('DOMContentLoaded', initWrapper, false);
    }, false);
  }

  /* Native JavaScript for Bootstrap | Remove Data API
  ---------------------------------------------------- */
  function removeElementDataAPI(ConstructorName, collection) {
    Array.from(collection).map(function (x) { return x[ConstructorName].dispose(); });
  }
  function removeDataAPI(context) {
    var lookUp = context instanceof Element ? context : document;
    Object.keys(componentsInit).forEach(function (component) {
      removeElementDataAPI(component, lookUp.querySelectorAll(componentsInit[component][1]));
    });
  }

  var version = "3.0.15";

  var indexV4 = {
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Toast: Toast,
    Tooltip: Tooltip,

    initCallback: initCallback,
    removeDataAPI: removeDataAPI,
    componentsInit: componentsInit,
    Version: version,
  };

  return indexV4;

})));
