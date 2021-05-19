/*!
  * Native JavaScript for Bootstrap Collapse v3.0.15 (https://thednp.github.io/bootstrap.native/)
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

function queryElement(selector, parent) {
  const lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

function reflow(element) {
  return element.offsetHeight;
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

const ariaExpanded = 'aria-expanded';

const dataBsToggle = 'data-bs-toggle';

// collapse / tab
const collapsingClass = 'collapsing';

const showClass = 'show';

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

/* Native JavaScript for Bootstrap 5 | Collapse
----------------------------------------------- */

// COLLAPSE GC
// ===========
const collapseString = 'collapse';
const collapseComponent = 'Collapse';
const collapseSelector = `.${collapseString}`;
const collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`;

// COLLAPSE CUSTOM EVENTS
// ======================
const showCollapseEvent = bootstrapCustomEvent(`show.bs.${collapseString}`);
const shownCollapseEvent = bootstrapCustomEvent(`shown.bs.${collapseString}`);
const hideCollapseEvent = bootstrapCustomEvent(`hide.bs.${collapseString}`);
const hiddenCollapseEvent = bootstrapCustomEvent(`hidden.bs.${collapseString}`);

// COLLAPSE PRIVATE METHODS
// ========================
function expandCollapse(self) {
  const {
    element, parent, triggers,
  } = self;

  element.dispatchEvent(showCollapseEvent);
  if (showCollapseEvent.defaultPrevented) return;

  self.isAnimating = true;
  if (parent) parent.isAnimating = true;

  addClass(element, collapsingClass);
  removeClass(element, collapseString);

  element.style.height = `${element.scrollHeight}px`;

  emulateTransitionEnd(element, () => {
    self.isAnimating = false;
    if (parent) parent.isAnimating = false;

    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'true'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);
    addClass(element, showClass);

    element.style.height = '';

    element.dispatchEvent(shownCollapseEvent);
  });
}

function collapseContent(self) {
  const {
    element, parent, triggers,
  } = self;

  element.dispatchEvent(hideCollapseEvent);

  if (hideCollapseEvent.defaultPrevented) return;

  self.isAnimating = true;
  if (parent) parent.isAnimating = true;

  element.style.height = `${element.scrollHeight}px`;

  removeClass(element, collapseString);
  removeClass(element, showClass);
  addClass(element, collapsingClass);

  reflow(element);
  element.style.height = '0px';

  emulateTransitionEnd(element, () => {
    self.isAnimating = false;
    if (parent) parent.isAnimating = false;

    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'false'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);

    element.style.height = '';

    element.dispatchEvent(hiddenCollapseEvent);
  });
}

function toggleCollapseHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { triggers } = self;

  if (triggers.length) {
    triggers.forEach((btn) => btn[action]('click', collapseClickHandler));
  }
}

// COLLAPSE EVENT HANDLER
// ======================
function collapseClickHandler(e) {
  const { target } = e;
  const trigger = target.closest(collapseToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && element[collapseComponent];
  if (self) self.toggle(target);

  // event target is anchor link #398
  if (trigger && trigger.tagName === 'A') e.preventDefault();
}

// COLLAPSE DEFINITION
// ===================
class Collapse extends BaseComponent {
  constructor(target, config) {
    super(collapseComponent, target, { parent: null }, config);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // set triggering elements
    self.triggers = Array.from(document.querySelectorAll(collapseToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // set parent accordion
    self.parent = queryElement(self.options.parent);
    const { parent } = self;

    // set initial state
    self.isAnimating = false;
    if (parent) parent.isAnimating = false;

    // add event listeners
    toggleCollapseHandler(self, 1);
  }

  // COLLAPSE PUBLIC METHODS
  // =======================
  toggle(related) {
    const self = this;
    if (!hasClass(self.element, showClass)) self.show(related);
    else self.hide(related);
  }

  hide() {
    const self = this;
    const { triggers, isAnimating } = self;
    if (isAnimating) return;

    collapseContent(self);
    if (triggers.length) {
      triggers.forEach((btn) => addClass(btn, `${collapseString}d`));
    }
  }

  show() {
    const self = this;
    const {
      element, parent, triggers, isAnimating,
    } = self;
    let activeCollapse;
    let activeCollapseInstance;

    if (parent) {
      activeCollapse = Array.from(parent.querySelectorAll(`.${collapseString}.${showClass}`))
        .find((i) => i[collapseComponent]);
      activeCollapseInstance = activeCollapse && activeCollapse[collapseComponent];
    }

    if ((!parent || (parent && !parent.isAnimating)) && !isAnimating) {
      if (activeCollapseInstance && activeCollapse !== element) {
        collapseContent(activeCollapseInstance);
        activeCollapseInstance.triggers.forEach((btn) => {
          addClass(btn, `${collapseString}d`);
        });
      }

      expandCollapse(self);
      if (triggers.length) {
        triggers.forEach((btn) => removeClass(btn, `${collapseString}d`));
      }
    }
  }

  dispose() {
    const self = this;
    const { parent } = self;
    toggleCollapseHandler(self);

    if (parent) delete parent.isAnimating;
    super.dispose(collapseComponent);
  }
}

Collapse.init = {
  component: collapseComponent,
  selector: collapseSelector,
  constructor: Collapse,
};

export default Collapse;
