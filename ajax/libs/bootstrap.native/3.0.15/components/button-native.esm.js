/*!
  * Native JavaScript for Bootstrap Button v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
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

const activeClass = 'active';

const dataBsToggle = 'data-bs-toggle';

function queryElement(selector, parent) {
  const lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
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

/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/

// BUTTON PRIVATE GC
// =================
const buttonString = 'button';
const buttonComponent = 'Button';
const buttonSelector = `[${dataBsToggle}="${buttonString}"]`;
const ariaPressed = 'aria-pressed';

// BUTTON PRIVATE METHOD
// =====================
function toggleButtonHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.element[action]('click', self.toggle);
}

// BUTTON DEFINITION
// =================
class Button extends BaseComponent {
  constructor(target) {
    super(buttonComponent, target);
    const self = this;

    // initialization element
    const { element } = self;

    // set initial state
    self.isActive = hasClass(element, activeClass);
    element.setAttribute(ariaPressed, !!self.isActive);

    // add event listener
    toggleButtonHandler(self, 1);
  }

  // BUTTON PUBLIC METHODS
  // =====================
  toggle(e) {
    if (e) e.preventDefault();
    const self = e ? this[buttonComponent] : this;
    const { element } = self;

    if (hasClass(element, 'disabled')) return;

    self.isActive = hasClass(element, activeClass);
    const { isActive } = self;

    const action = isActive ? removeClass : addClass;
    const ariaValue = isActive ? 'false' : 'true';

    action(element, activeClass);
    element.setAttribute(ariaPressed, ariaValue);
  }

  dispose() {
    toggleButtonHandler(this);
    super.dispose(buttonComponent);
  }
}

Button.init = {
  component: buttonComponent,
  selector: buttonSelector,
  constructor: Button,
};

export default Button;
