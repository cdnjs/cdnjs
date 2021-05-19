/*!
  * Native JavaScript for Bootstrap Toast v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

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

function addClass(element, classNAME) {
  element.classList.add(classNAME);
}

function hasClass(element, classNAME) {
  return element.classList.contains(classNAME);
}

function removeClass(element, classNAME) {
  element.classList.remove(classNAME);
}

const addEventListener = 'addEventListener';

const removeEventListener = 'removeEventListener';

function queryElement(selector, parent) {
  const lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

function reflow(element) {
  return element.offsetHeight;
}

const fadeClass = 'fade';

const showClass = 'show';

const dataBsDismiss = 'data-bs-dismiss';

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

/* Native JavaScript for Bootstrap 5 | Toast
-------------------------------------------- */

// TOAST PRIVATE GC
// ================
const toastString = 'toast';
const toastComponent = 'Toast';
const toastSelector = `.${toastString}`;
const toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`;
const showingClass = 'showing';
const hideClass = 'hide';
const toastDefaultOptions = {
  animation: true,
  autohide: true,
  delay: 500,
};

// TOAST CUSTOM EVENTS
// ===================
const showToastEvent = bootstrapCustomEvent(`show.bs.${toastString}`);
const hideToastEvent = bootstrapCustomEvent(`hide.bs.${toastString}`);
const shownToastEvent = bootstrapCustomEvent(`shown.bs.${toastString}`);
const hiddenToastEvent = bootstrapCustomEvent(`hidden.bs.${toastString}`);

// TOAST PRIVATE METHODS
// =====================
function showToastComplete(self) {
  const { element, options } = self;
  if (!options.animation) {
    removeClass(element, showingClass);
    addClass(element, showClass);
  }

  element.dispatchEvent(shownToastEvent);
  if (options.autohide) self.hide();
}

function hideToastComplete(self) {
  const { element } = self;
  addClass(element, hideClass);
  element.dispatchEvent(hiddenToastEvent);
}

function closeToast(self) {
  const { element, options } = self;
  removeClass(element, showClass);

  if (options.animation) {
    reflow(element);
    emulateTransitionEnd(element, () => hideToastComplete(self));
  } else {
    hideToastComplete(self);
  }
}

function openToast(self) {
  const { element, options } = self;
  removeClass(element, hideClass);

  if (options.animation) {
    reflow(element);
    addClass(element, showingClass);
    addClass(element, showClass);

    emulateTransitionEnd(element, () => showToastComplete(self));
  } else {
    showToastComplete(self);
  }
}

function toggleToastHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  if (self.dismiss) {
    self.dismiss[action]('click', self.hide);
  }
}

// TOAST EVENT HANDLERS
// ====================
function completeDisposeToast(self) {
  clearTimeout(self.timer);
  toggleToastHandler(self);
}

// TOAST DEFINITION
// ================
class Toast extends BaseComponent {
  constructor(target, config) {
    super(toastComponent, target, toastDefaultOptions, config);
    // bind
    const self = this;

    // dismiss button
    self.dismiss = queryElement(toastDismissSelector, self.element);

    // bind
    self.show = self.show.bind(self);
    self.hide = self.hide.bind(self);

    // add event listener
    toggleToastHandler(self, 1);
  }

  // TOAST PUBLIC METHODS
  // ====================
  show() {
    const self = this;
    const { element } = self;
    if (element && hasClass(element, hideClass)) {
      element.dispatchEvent(showToastEvent);
      if (showToastEvent.defaultPrevented) return;

      addClass(element, fadeClass);
      clearTimeout(self.timer);
      self.timer = setTimeout(() => openToast(self), 10);
    }
  }

  hide(noTimer) {
    const self = this;
    const { element, options } = self;

    if (element && hasClass(element, showClass)) {
      element.dispatchEvent(hideToastEvent);
      if (hideToastEvent.defaultPrevented) return;

      clearTimeout(self.timer);
      self.timer = setTimeout(
        closeToast(self),
        noTimer ? 10 : options.delay,
      );
    }
  }

  dispose() {
    const self = this;
    const { element, options } = self;
    self.hide();

    if (options.animation) emulateTransitionEnd(element, () => completeDisposeToast(self));
    else completeDisposeToast(self);

    super.dispose(toastComponent);
  }
}

Toast.init = {
  component: toastComponent,
  selector: toastSelector,
  constructor: Toast,
};

export default Toast;
