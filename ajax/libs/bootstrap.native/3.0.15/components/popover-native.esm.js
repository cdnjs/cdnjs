/*!
  * Native JavaScript for Bootstrap Popover v3.0.15 (https://thednp.github.io/bootstrap.native/)
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

const ariaDescribedBy = 'aria-describedby';

const showClass = 'show';

const fadeClass = 'fade';

const dataBsToggle = 'data-bs-toggle';

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

var tipClassPositions = {
  top: 'top', bottom: 'bottom', left: 'start', right: 'end',
};

function isVisibleTip(tip, container) {
  return container.contains(tip);
}

function isMedia(element) {
  return [SVGElement, HTMLImageElement, HTMLVideoElement]
    .some((mediaType) => element instanceof mediaType);
}

function closestRelative(element) {
  let retval = null;
  let el = element;
  while (el !== document.body) {
    el = el.parentElement;
    if (getComputedStyle(el).position === 'relative') {
      retval = el;
      break;
    }
  }
  return retval;
}

// both popovers and tooltips (this, event)
function styleTip(self, e) {
  const tipClasses = /\b(top|bottom|start|end)+/;
  const tip = self.tooltip || self.popover;
  // reset tip style
  tip.style.top = '';
  tip.style.left = '';
  tip.style.right = '';
  // continue with metrics
  const isPopover = !!self.popover;
  let tipDimensions = { w: tip.offsetWidth, h: tip.offsetHeight };
  const windowWidth = (document.documentElement.clientWidth || document.body.clientWidth);
  const windowHeight = (document.documentElement.clientHeight || document.body.clientHeight);
  const { element, options, arrow } = self;
  let { container, placement } = options;
  let parentIsBody = container === document.body;
  const targetPosition = getComputedStyle(element).position;
  const parentPosition = getComputedStyle(container).position;
  const staticParent = !parentIsBody && parentPosition === 'static';
  let relativeParent = !parentIsBody && parentPosition === 'relative';
  const relContainer = staticParent && closestRelative(container);
  // static containers should refer to another relative container or the body
  container = relContainer || container;
  relativeParent = staticParent && relContainer ? 1 : relativeParent;
  parentIsBody = container === document.body;
  const parentRect = container.getBoundingClientRect();
  const leftBoundry = relativeParent ? parentRect.left : 0;
  const rightBoundry = relativeParent ? parentRect.right : windowWidth;
  // this case should not be possible
  // absoluteParent = !parentIsBody && parentPosition === 'absolute',
  // this case requires a container with placement: relative
  const absoluteTarget = targetPosition === 'absolute';
  const targetRect = element.getBoundingClientRect();
  const scroll = parentIsBody
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: container.scrollLeft, y: container.scrollTop };
  const elemDimensions = { w: element.offsetWidth, h: element.offsetHeight };
  const top = relativeParent ? element.offsetTop : targetRect.top;
  const left = relativeParent ? element.offsetLeft : targetRect.left;
  // reset arrow style
  arrow.style.top = '';
  arrow.style.left = '';
  arrow.style.right = '';
  let topPosition;
  let leftPosition;
  let rightPosition;
  let arrowTop;
  let arrowLeft;
  let arrowRight;

  // check placement
  let topExceed = targetRect.top - tipDimensions.h < 0;
  let bottomExceed = targetRect.top + tipDimensions.h + elemDimensions.h >= windowHeight;
  let leftExceed = targetRect.left - tipDimensions.w < leftBoundry;
  let rightExceed = targetRect.left + tipDimensions.w + elemDimensions.w >= rightBoundry;

  topExceed = ['left', 'right'].includes(placement)
    ? targetRect.top + elemDimensions.h / 2 - tipDimensions.h / 2 < 0
    : topExceed;
  bottomExceed = ['left', 'right'].includes(placement)
    ? targetRect.top + tipDimensions.h / 2 + elemDimensions.h / 2 >= windowHeight
    : bottomExceed;
  leftExceed = ['top', 'bottom'].includes(placement)
    ? targetRect.left + elemDimensions.w / 2 - tipDimensions.w / 2 < leftBoundry
    : leftExceed;
  rightExceed = ['top', 'bottom'].includes(placement)
    ? targetRect.left + tipDimensions.w / 2 + elemDimensions.w / 2 >= rightBoundry
    : rightExceed;

  // recompute placement
  // first, when both left and right limits are exceeded, we fall back to top|bottom
  placement = (['left', 'right'].includes(placement)) && leftExceed && rightExceed ? 'top' : placement;
  placement = placement === 'top' && topExceed ? 'bottom' : placement;
  placement = placement === 'bottom' && bottomExceed ? 'top' : placement;
  placement = placement === 'left' && leftExceed ? 'right' : placement;
  placement = placement === 'right' && rightExceed ? 'left' : placement;

  // update tooltip/popover class
  if (!tip.className.includes(placement)) {
    tip.className = tip.className.replace(tipClasses, tipClassPositions[placement]);
  }
  // if position has changed, update tip dimensions
  tipDimensions = { w: tip.offsetWidth, h: tip.offsetHeight };

  // we check the computed width & height and update here
  const arrowWidth = arrow.offsetWidth || 0;
  const arrowHeight = arrow.offsetHeight || 0;
  const arrowAdjust = arrowWidth / 2;

  // compute tooltip / popover coordinates
  if (['left', 'right'].includes(placement)) { // secondary|side positions
    if (placement === 'left') { // LEFT
      leftPosition = left + scroll.x - tipDimensions.w - (isPopover ? arrowWidth : 0);
    } else { // RIGHT
      leftPosition = left + scroll.x + elemDimensions.w + (isPopover ? arrowWidth : 0);
    }

    // adjust top and arrow
    if (topExceed) {
      topPosition = top + scroll.y;
      arrowTop = elemDimensions.h / 2 - arrowWidth;
    } else if (bottomExceed) {
      topPosition = top + scroll.y - tipDimensions.h + elemDimensions.h;
      arrowTop = tipDimensions.h - elemDimensions.h / 2 - arrowWidth;
    } else {
      topPosition = top + scroll.y - tipDimensions.h / 2 + elemDimensions.h / 2;
      arrowTop = tipDimensions.h / 2 - arrowHeight / 2;
    }
  } else if (['top', 'bottom'].includes(placement)) {
    if (e && isMedia(element)) {
      const eX = !relativeParent ? e.pageX : e.layerX + (absoluteTarget ? element.offsetLeft : 0);
      const eY = !relativeParent ? e.pageY : e.layerY + (absoluteTarget ? element.offsetTop : 0);

      if (placement === 'top') {
        topPosition = eY - tipDimensions.h - (isPopover ? arrowWidth : arrowHeight);
      } else {
        topPosition = eY + arrowHeight;
      }

      // adjust left | right and also the arrow
      if (e.clientX - tipDimensions.w / 2 < leftBoundry) { // when exceeds left
        leftPosition = 0;
        arrowLeft = eX - arrowAdjust;
      } else if (e.clientX + tipDimensions.w * 0.51 >= rightBoundry) { // when exceeds right
        leftPosition = 'auto';
        rightPosition = 0;
        arrowLeft = tipDimensions.w - (rightBoundry - eX) - arrowAdjust;
      } else { // normal top/bottom
        leftPosition = eX - tipDimensions.w / 2;
        arrowLeft = tipDimensions.w / 2 - arrowAdjust;
      }
    } else {
      if (placement === 'top') {
        topPosition = top + scroll.y - tipDimensions.h - (isPopover ? arrowHeight : 0);
      } else { // BOTTOM
        topPosition = top + scroll.y + elemDimensions.h + (isPopover ? arrowHeight : 0);
      }

      // adjust left | right and also the arrow
      if (leftExceed) {
        leftPosition = 0;
        arrowLeft = left + elemDimensions.w / 2 - arrowAdjust;
      } else if (rightExceed) {
        leftPosition = 'auto';
        rightPosition = 0;
        arrowRight = elemDimensions.w / 2 + (parentRect.right - targetRect.right) - arrowAdjust;
      } else {
        leftPosition = left + scroll.x - tipDimensions.w / 2 + elemDimensions.w / 2;
        arrowLeft = tipDimensions.w / 2 - arrowAdjust;
      }
    }
  }

  // apply style to tooltip/popover and its arrow
  tip.style.top = `${topPosition}px`;
  tip.style.left = leftPosition === 'auto' ? leftPosition : `${leftPosition}px`;
  tip.style.right = rightPosition !== undefined ? `${rightPosition}px` : '';
  // update arrow placement or clear side
  if (arrowTop !== undefined) {
    arrow.style.top = `${arrowTop}px`;
  }

  if (arrowLeft !== undefined) {
    arrow.style.left = `${arrowLeft}px`;
  } else if (arrowRight !== undefined) {
    arrow.style.right = `${arrowRight}px`;
  }
}

function setFocus(element) {
  element.focus();
}

let bsnUID = 1;

// popover, tooltip, scrollspy need a unique id
function getUID(element, key) {
  bsnUID += 1;
  return element[key] || bsnUID;
}

const fixedTopClass = 'fixed-top';

const fixedBottomClass = 'fixed-bottom';

function getTipContainer(element) {
  // maybe the element is inside a modal
  const modal = element.closest('.modal');

  // OR maybe the element is inside a fixed navbar
  const navbarFixed = element.closest(`.${fixedTopClass},.${fixedBottomClass}`);

  // set default container option appropriate for the context
  return modal || navbarFixed || document.body;
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

/* Native JavaScript for Bootstrap 5 | Popover
---------------------------------------------- */

// POPOVER PRIVATE GC
// ==================
const popoverString = 'popover';
const popoverComponent = 'Popover';
const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;
const popoverDefaultOptions = {
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', // string
  title: null, // string
  content: null, // string
  sanitizeFn: null, // function
  customClass: null, // string
  dismissible: false, // boolean
  animation: true, // boolean
  trigger: 'hover', // string
  placement: 'top', // string
  delay: 200, // number
};

// POPOVER PRIVATE GC
// ==================
const isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent);
// popoverArrowClass = `${popoverString}-arrow`,
const popoverHeaderClass = `${popoverString}-header`;
const popoverBodyClass = `${popoverString}-body`;
// close btn for dissmissible popover
let popoverCloseButton = '<button type="button" class="btn-close"></button>';

// POPOVER CUSTOM EVENTS
// =====================
const showPopoverEvent = bootstrapCustomEvent(`show.bs.${popoverString}`);
const shownPopoverEvent = bootstrapCustomEvent(`shown.bs.${popoverString}`);
const hidePopoverEvent = bootstrapCustomEvent(`hide.bs.${popoverString}`);
const hiddenPopoverEvent = bootstrapCustomEvent(`hidden.bs.${popoverString}`);

// POPOVER EVENT HANDLERS
// ======================
function popoverForceFocus() {
  setFocus(this);
}

function popoverTouchHandler({ target }) {
  const self = this;
  const { popover, element } = self;

  if ((popover && popover.contains(target)) // popover includes touch target
    || target === element // OR touch target is element
    || element.contains(target)) ; else {
    self.hide();
  }
}

// POPOVER PRIVATE METHODS
// =======================
function createPopover(self) {
  const { id, options } = self;
  const {
    animation, customClass, sanitizeFn, placement, dismissible,
  } = options;
  let { title, content, template } = options;

  // set initial popover class
  const placementClass = `bs-${popoverString}-${tipClassPositions[placement]}`;

  // fixing #233
  title = title ? title.trim() : null;
  content = content ? content.trim() : null;

  // sanitize title && content
  if (sanitizeFn) {
    title = title ? sanitizeFn(title) : null;
    content = content ? sanitizeFn(content) : null;
    template = template ? sanitizeFn(template) : null;
    popoverCloseButton = sanitizeFn(popoverCloseButton);
  }

  self.popover = document.createElement('div');
  const { popover } = self;

  // set id and aria-describedby
  popover.setAttribute('id', id);
  popover.setAttribute('role', 'tooltip');

  // load template
  const popoverTemplate = document.createElement('div');
  popoverTemplate.innerHTML = template.trim();
  popover.className = popoverTemplate.firstChild.className;
  popover.innerHTML = popoverTemplate.firstChild.innerHTML;

  const popoverHeader = queryElement(`.${popoverHeaderClass}`, popover);
  const popoverBody = queryElement(`.${popoverBodyClass}`, popover);

  // set arrow
  self.arrow = queryElement(`.${popoverString}-arrow`, popover);

  // set dismissible button
  if (dismissible) {
    title = title ? title + popoverCloseButton : title;
    content = title === null ? +popoverCloseButton : content;
  }

  // fill the template with content from data attributes
  if (title && popoverHeader) popoverHeader.innerHTML = title.trim();
  if (content && popoverBody) popoverBody.innerHTML = content.trim();

  // set popover animation and placement
  if (!hasClass(popover, popoverString)) addClass(popover, popoverString);
  if (animation && !hasClass(popover, fadeClass)) addClass(popover, fadeClass);
  if (customClass && !hasClass(popover, customClass)) {
    addClass(popover, customClass);
  }
  if (!hasClass(popover, placementClass)) addClass(popover, placementClass);
}

function removePopover(self) {
  const { element, popover, options } = self;
  element.removeAttribute(ariaDescribedBy);
  options.container.removeChild(popover);
  self.timer = null;
}

function togglePopoverHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { element, options } = self;
  const { trigger, dismissible } = options;
  self.enabled = !!add;

  if (trigger === 'hover') {
    element[action]('mousedown', self.show);
    element[action]('mouseenter', self.show);
    if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
    if (!dismissible) element[action]('mouseleave', self.hide);
  } else if (trigger === 'click') {
    element[action](trigger, self.toggle);
  } else if (trigger === 'focus') {
    if (isIphone) element[action]('click', popoverForceFocus);
    element[action]('focusin', self.show);
  }
}

function dismissHandlerToggle(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { options, element, popover } = self;
  const { trigger, dismissible } = options;

  if (dismissible) {
    const [btnClose] = popover.getElementsByClassName('btn-close');
    if (btnClose) btnClose[action]('click', self.hide);
  } else {
    if (trigger === 'focus') element[action]('focusout', self.hide);
    if (trigger === 'hover') document[action]('touchstart', popoverTouchHandler, passiveHandler);
  }

  if (!isMedia(element)) {
    window[action]('scroll', self.update, passiveHandler);
    window[action]('resize', self.update, passiveHandler);
  }
}

function popoverShowTrigger(self) {
  dismissHandlerToggle(self, 1);
  self.element.dispatchEvent(shownPopoverEvent);
}

function popoverHideTrigger(self) {
  dismissHandlerToggle(self);
  removePopover(self);
  self.element.dispatchEvent(hiddenPopoverEvent);
}

// POPOVER DEFINITION
// ==================
class Popover extends BaseComponent {
  constructor(target, config) {
    popoverDefaultOptions.container = getTipContainer(queryElement(target));
    super(popoverComponent, target, popoverDefaultOptions, config);

    // bind
    const self = this;

    // initialization element
    const { element } = self;
    // additional instance properties
    self.timer = null;
    self.popover = null;
    self.arrow = null;
    self.enabled = false;
    // set unique ID for aria-describedby
    self.id = `${popoverString}-${getUID(element)}`;

    // set instance options
    const { options } = self;

    // media elements only work with body as a container
    self.options.container = isMedia(element)
      ? popoverDefaultOptions.container
      : queryElement(options.container);

    // reset default container
    popoverDefaultOptions.container = null;

    // invalidate when no content is set
    if (!options.content) return;

    // crate popover
    createPopover(self);

    // bind
    self.update = self.update.bind(self);

    // attach event listeners
    togglePopoverHandlers(self, 1);
  }

  update(e) {
    styleTip(this, e);
  }

  // POPOVER PUBLIC METHODS
  // ======================
  toggle(e) {
    const self = e ? this[popoverComponent] : this;
    const { popover, options } = self;
    if (!isVisibleTip(popover, options.container)) self.show();
    else self.hide();
  }

  show(e) {
    const self = e ? this[popoverComponent] : this;
    const {
      element, popover, options, id,
    } = self;
    const { container } = options;

    clearTimeout(self.timer);

    self.timer = setTimeout(() => {
      if (!isVisibleTip(popover, container)) {
        element.dispatchEvent(showPopoverEvent);
        if (showPopoverEvent.defaultPrevented) return;

        // append to the container
        container.appendChild(popover);
        element.setAttribute(ariaDescribedBy, id);

        self.update(e);
        if (!hasClass(popover, showClass)) addClass(popover, showClass);

        if (options.animation) emulateTransitionEnd(popover, () => popoverShowTrigger(self));
        else popoverShowTrigger(self);
      }
    }, 17);
  }

  hide(e) {
    let self;
    if (e && this[popoverComponent]) {
      self = this[popoverComponent];
    } else if (e) { // dismissible popover
      const dPopover = this.closest(`.${popoverString}`);
      const dEl = dPopover && queryElement(`[${ariaDescribedBy}="${dPopover.id}"]`);
      self = dEl[popoverComponent];
    } else {
      self = this;
    }
    const { element, popover, options } = self;

    clearTimeout(self.timer);

    self.timer = setTimeout(() => {
      if (isVisibleTip(popover, options.container)) {
        element.dispatchEvent(hidePopoverEvent);
        if (hidePopoverEvent.defaultPrevented) return;

        removeClass(popover, showClass);

        if (options.animation) emulateTransitionEnd(popover, () => popoverHideTrigger(self));
        else popoverHideTrigger(self);
      }
    }, options.delay + 17);
  }

  enable() {
    const self = this;
    const { enabled } = self;
    if (!enabled) {
      togglePopoverHandlers(self, 1);
      self.enabled = !enabled;
    }
  }

  disable() {
    const self = this;
    const { enabled, popover, options } = self;
    if (enabled) {
      if (isVisibleTip(popover, options.container) && options.animation) {
        self.hide();

        setTimeout(
          () => togglePopoverHandlers(self),
          getElementTransitionDuration(popover) + options.delay + 17,
        );
      } else {
        togglePopoverHandlers(self);
      }
      self.enabled = !enabled;
    }
  }

  toggleEnabled() {
    const self = this;
    if (!self.enabled) self.enable();
    else self.disable();
  }

  dispose() {
    const self = this;
    const { popover, options } = self;
    const { container, animation } = options;
    if (animation && isVisibleTip(popover, container)) {
      options.delay = 0; // reset delay
      self.hide();
      emulateTransitionEnd(popover, () => togglePopoverHandlers(self));
    } else {
      togglePopoverHandlers(self);
    }
    super.dispose(popoverComponent);
  }
}

Popover.init = {
  component: popoverComponent,
  selector: popoverSelector,
  constructor: Popover,
};

export default Popover;
