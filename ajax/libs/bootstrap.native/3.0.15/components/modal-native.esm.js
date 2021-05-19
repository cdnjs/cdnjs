/*!
  * Native JavaScript for Bootstrap Modal v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
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

const ariaHidden = 'aria-hidden';

const dataBsToggle = 'data-bs-toggle';

const dataBsDismiss = 'data-bs-dismiss';

const fadeClass = 'fade';

const showClass = 'show';

const ariaModal = 'aria-modal';

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

const dataBsTarget = 'data-bs-target';

const dataBsParent = 'data-bs-parent';

const dataBsContainer = 'data-bs-container';

function getTargetElement(element) {
  return queryElement(element.getAttribute(dataBsTarget) || element.getAttribute('href'))
        || element.closest(element.getAttribute(dataBsParent))
        || queryElement(element.getAttribute(dataBsContainer));
}

const fixedTopClass = 'fixed-top';

const fixedBottomClass = 'fixed-bottom';

const stickyTopClass = 'sticky-top';

const fixedItems = Array.from(document.getElementsByClassName(fixedTopClass))
  .concat(Array.from(document.getElementsByClassName(fixedBottomClass)))
  .concat(Array.from(document.getElementsByClassName(stickyTopClass)))
  .concat(Array.from(document.getElementsByClassName('is-fixed')));

function resetScrollbar() {
  const bd = document.body;
  bd.style.paddingRight = '';
  bd.style.overflow = '';

  if (fixedItems.length) {
    fixedItems.forEach((fixed) => {
      fixed.style.paddingRight = '';
      fixed.style.marginRight = '';
    });
  }
}

function measureScrollbar() {
  const windowWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - windowWidth);
}

function setScrollbar(scrollbarWidth, overflow, isOpen) {
  const bd = document.body;
  const bodyPad = parseInt(getComputedStyle(bd).paddingRight, 10);
  const sbWidth = isOpen && bodyPad ? 0 : scrollbarWidth;

  if (overflow) {
    bd.style.paddingRight = `${bodyPad + sbWidth}px`;

    if (fixedItems.length) {
      fixedItems.forEach((fixed) => {
        const isSticky = hasClass(fixed, stickyTopClass);
        const itemPadValue = getComputedStyle(fixed).paddingRight;
        fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
        if (isSticky) {
          const itemMValue = getComputedStyle(fixed).marginRight;
          fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
        }
      });
    }
  }
}

function reflow(element) {
  return element.offsetHeight;
}

const modalOpenClass = 'modal-open';
const modalBackdropClass = 'modal-backdrop';
const modalActiveSelector = `.modal.${showClass}`;
const offcanvasActiveSelector = `.offcanvas.${showClass}`;

const overlay = document.createElement('div');
overlay.setAttribute('class', `${modalBackdropClass}`);

function getCurrentOpen() {
  return queryElement(`${modalActiveSelector},${offcanvasActiveSelector}`);
}

function appendOverlay(hasFade) {
  document.body.appendChild(overlay);
  if (hasFade) addClass(overlay, fadeClass);
}

function showOverlay() {
  addClass(overlay, showClass);
  reflow(overlay);
}

function hideOverlay() {
  removeClass(overlay, showClass);
}

function removeOverlay() {
  const bd = document.body;
  const currentOpen = getCurrentOpen();

  if (!currentOpen) {
    removeClass(overlay, fadeClass);
    removeClass(bd, modalOpenClass);
    bd.removeChild(overlay);
    resetScrollbar();
  }
}

function setFocus(element) {
  element.focus();
}

function isVisible(element) {
  return getComputedStyle(element).visibility !== 'hidden'
    && element.offsetParent !== null;
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

/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */

// MODAL PRIVATE GC
// ================
const modalString = 'modal';
const modalComponent = 'Modal';
const modalSelector = `.${modalString}`;
// const modalActiveSelector = `.${modalString}.${showClass}`;
const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
const modalStaticClass = `${modalString}-static`;
const modalDefaultOptions = {
  backdrop: true, // boolean|string
  keyboard: true, // boolean
};

// MODAL CUSTOM EVENTS
// ===================
const showModalEvent = bootstrapCustomEvent(`show.bs.${modalString}`);
const shownModalEvent = bootstrapCustomEvent(`shown.bs.${modalString}`);
const hideModalEvent = bootstrapCustomEvent(`hide.bs.${modalString}`);
const hiddenModalEvent = bootstrapCustomEvent(`hidden.bs.${modalString}`);

// MODAL PRIVATE METHODS
// =====================
function setModalScrollbar(self) {
  const { element, scrollbarWidth } = self;
  const bd = document.body;
  const html = document.documentElement;
  const openModal = hasClass(bd, modalOpenClass);
  const bodyOverflow = html.clientHeight !== html.scrollHeight
                    || bd.clientHeight !== bd.scrollHeight;
  const modalOverflow = element.clientHeight !== element.scrollHeight;

  if (!modalOverflow && scrollbarWidth) {
    element.style.paddingRight = `${scrollbarWidth}px`;
  }
  setScrollbar(scrollbarWidth, (modalOverflow || bodyOverflow), openModal);
}

function toggleModalDismiss(self, add) {
  const action = add ? addEventListener : removeEventListener;
  window[action]('resize', self.update, passiveHandler);
  self.element[action]('click', modalDismissHandler);
  document[action]('keydown', modalKeyHandler);
}

function toggleModalHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { triggers } = self;

  if (triggers.length) {
    triggers.forEach((btn) => btn[action]('click', modalClickHandler));
  }
}

function afterModalHide(self) {
  const { triggers } = self;
  removeOverlay();
  self.element.style.paddingRight = '';
  self.isAnimating = false;

  if (triggers.length) {
    const visibleTrigger = triggers.find((x) => isVisible(x));
    if (visibleTrigger) setFocus(visibleTrigger);
  }
}

function afterModalShow(self) {
  const { element, relatedTarget } = self;
  setFocus(element);
  self.isAnimating = false;

  toggleModalDismiss(self, 1);

  shownModalEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(shownModalEvent);
}

function beforeModalShow(self) {
  const { element, hasFade } = self;
  element.style.display = 'block';

  setModalScrollbar(self);
  if (!queryElement(modalActiveSelector)) {
    addClass(document.body, modalOpenClass);
  }

  addClass(element, showClass);
  element.removeAttribute(ariaHidden);
  element.setAttribute(ariaModal, true);

  if (hasFade) emulateTransitionEnd(element, () => afterModalShow(self));
  else afterModalShow(self);
}

function beforeModalHide(self, force) {
  const {
    element, relatedTarget, hasFade,
  } = self;
  const currentOpen = getCurrentOpen();

  element.style.display = '';

  // force can also be the transitionEvent object, we wanna make sure it's not
  // call is not forced and overlay is visible
  if (!force && hasFade && hasClass(overlay, showClass)
    && !currentOpen) { // AND no modal is visible
    hideOverlay();
    emulateTransitionEnd(overlay, () => afterModalHide(self));
  } else {
    afterModalHide(self);
  }

  toggleModalDismiss(self);

  hiddenModalEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(hiddenModalEvent);
}

// MODAL EVENT HANDLERS
// ====================
function modalClickHandler(e) {
  const { target } = e;
  const trigger = target.closest(modalToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && element[modalComponent];

  if (trigger.tagName === 'A') e.preventDefault();

  if (self.isAnimating) return;

  self.relatedTarget = trigger;

  self.toggle();
}

function modalKeyHandler({ which }) {
  const element = queryElement(modalActiveSelector);
  const self = element[modalComponent];
  const { options, isAnimating } = self;
  if (!isAnimating // modal has no animations running
    && options.keyboard && which === 27 // the keyboard option is enabled and the key is 27
    && hasClass(element, showClass)) { // the modal is not visible
    self.relatedTarget = null;
    self.hide();
  }
}

function modalDismissHandler(e) {
  const element = this;
  const self = element[modalComponent];

  if (self.isAnimating) return;

  const { isStatic, modalDialog } = self;
  const { target } = e;
  const selectedText = document.getSelection().toString().length;
  const targetInsideDialog = modalDialog.contains(target);
  const dismiss = target.closest(modalDismissSelector);

  if (isStatic && !targetInsideDialog) {
    addClass(element, modalStaticClass);
    self.isAnimating = true;
    emulateTransitionEnd(modalDialog, () => staticTransitionEnd(self));
  } else if (dismiss || (!selectedText && !isStatic && !targetInsideDialog)) {
    self.relatedTarget = dismiss || null;
    self.hide();
    e.preventDefault();
  }
}

function staticTransitionEnd(self) {
  const duration = getElementTransitionDuration(self.modalDialog) + 17;
  removeClass(self.element, modalStaticClass);
  // user must wait for zoom out transition
  setTimeout(() => { self.isAnimating = false; }, duration);
}

// MODAL DEFINITION
// ================
class Modal extends BaseComponent {
  constructor(target, config) {
    super(modalComponent, target, modalDefaultOptions, config);

    // bind
    const self = this;

    // the modal
    const { element } = self;

    // the modal-dialog
    self.modalDialog = queryElement(`.${modalString}-dialog`, element);

    // modal can have multiple triggering elements
    self.triggers = Array.from(document.querySelectorAll(modalToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // additional internals
    self.isStatic = self.options.backdrop === 'static';
    self.hasFade = hasClass(element, fadeClass);
    self.isAnimating = false;
    self.scrollbarWidth = measureScrollbar();
    self.relatedTarget = null;

    // attach event listeners
    toggleModalHandler(self, 1);

    // bind
    self.update = self.update.bind(self);
  }

  // MODAL PUBLIC METHODS
  // ====================
  toggle() {
    const self = this;
    if (hasClass(self.element, showClass)) self.hide();
    else self.show();
  }

  show() {
    const self = this;
    const {
      element, isAnimating, hasFade, relatedTarget,
    } = self;
    let overlayDelay = 0;

    if (hasClass(element, showClass) && !isAnimating) return;

    showModalEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(showModalEvent);
    if (showModalEvent.defaultPrevented) return;

    self.isAnimating = true;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen();
    if (currentOpen && currentOpen !== element) {
      const that = currentOpen[modalComponent]
        ? currentOpen[modalComponent]
        : currentOpen.Offcanvas;
      that.hide();
    }

    if (!queryElement(`.${modalBackdropClass}`)) {
      appendOverlay(hasFade);
    }
    overlayDelay = getElementTransitionDuration(overlay);

    if (!hasClass(overlay, showClass)) {
      showOverlay();
    }

    if (!currentOpen) {
      setTimeout(() => beforeModalShow(self), overlayDelay);
    } else beforeModalShow(self);
  }

  hide(force) {
    const self = this;
    const {
      element, isAnimating, hasFade, relatedTarget,
    } = self;
    if (!hasClass(element, showClass) && !isAnimating) return;

    hideModalEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(hideModalEvent);
    if (hideModalEvent.defaultPrevented) return;

    self.isAnimating = true;
    removeClass(element, showClass);
    element.setAttribute(ariaHidden, true);
    element.removeAttribute(ariaModal);

    if (hasFade && force !== 1) {
      emulateTransitionEnd(element, () => beforeModalHide(self));
    } else {
      beforeModalHide(self, force);
    }
  }

  update() {
    const self = this;

    if (hasClass(self.element, showClass)) setModalScrollbar(self);
  }

  dispose() {
    const self = this;
    self.hide(1); // forced call

    toggleModalHandler(self);

    super.dispose(modalComponent);
  }
}

Modal.init = {
  component: modalComponent,
  selector: modalSelector,
  constructor: Modal,
};

export default Modal;
