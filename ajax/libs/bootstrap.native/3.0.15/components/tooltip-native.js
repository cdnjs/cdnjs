/*!
  * Native JavaScript for Bootstrap Tooltip v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tooltip = factory());
}(this, (function () { 'use strict';

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

  const dataBsToggle = 'data-bs-toggle';

  const dataOriginalTitle = 'data-original-title';

  const fadeClass = 'fade';

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

  var tipClassPositions = {
    top: 'top', bottom: 'bottom', left: 'start', right: 'end',
  };

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

  function isVisibleTip(tip, container) {
    return container.contains(tip);
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

  /* Native JavaScript for Bootstrap 5 | Tooltip
  ---------------------------------------------- */

  // TOOLTIP PRIVATE GC
  // ==================
  const tooltipString = 'tooltip';
  const tooltipComponent = 'Tooltip';
  const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;

  const titleAttr = 'title';
  const tooltipInnerClass = `${tooltipString}-inner`;
  const tooltipDefaultOptions = {
    title: null,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    placement: 'top',
    animation: true,
    customClass: null,
    delay: 200,
    sanitizeFn: null,
  };

  // TOOLTIP CUSTOM EVENTS
  // =====================
  const showTooltipEvent = bootstrapCustomEvent(`show.bs.${tooltipString}`);
  const shownTooltipEvent = bootstrapCustomEvent(`shown.bs.${tooltipString}`);
  const hideTooltipEvent = bootstrapCustomEvent(`hide.bs.${tooltipString}`);
  const hiddenTooltipEvent = bootstrapCustomEvent(`hidden.bs.${tooltipString}`);

  // TOOLTIP PRIVATE METHODS
  // =======================
  function createTooltip(self) {
    const { options, id } = self;
    const placementClass = `bs-${tooltipString}-${tipClassPositions[options.placement]}`;
    let titleString = options.title.trim();

    // sanitize stuff
    if (options.sanitizeFn) {
      titleString = options.sanitizeFn(titleString);
      options.template = options.sanitizeFn(options.template);
    }

    if (!titleString) return;

    // create tooltip
    self.tooltip = document.createElement('div');
    const { tooltip } = self;

    // set aria
    tooltip.setAttribute('id', id);

    // set markup
    const tooltipMarkup = document.createElement('div');
    tooltipMarkup.innerHTML = options.template.trim();

    tooltip.className = tooltipMarkup.firstChild.className;
    tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML;

    queryElement(`.${tooltipInnerClass}`, tooltip).innerHTML = titleString;

    // set arrow
    self.arrow = queryElement(`.${tooltipString}-arrow`, tooltip);

    // set class and role attribute
    tooltip.setAttribute('role', tooltipString);
    // set classes
    if (!hasClass(tooltip, tooltipString)) addClass(tooltip, tooltipString);
    if (options.animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
    if (options.customClass && !hasClass(tooltip, options.customClass)) {
      addClass(tooltip, options.customClass);
    }
    if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
  }

  function removeTooltip(self) {
    const { element, options, tooltip } = self;
    element.removeAttribute(ariaDescribedBy);
    options.container.removeChild(tooltip);
    self.timer = null;
  }

  function disposeTooltipComplete(self) {
    const { element } = self;
    toggleTooltipHandlers(self);
    if (element.hasAttribute(dataOriginalTitle)) toggleTooltipTitle(self);
  }
  function toggleTooltipAction(self, add) {
    const action = add ? addEventListener : removeEventListener;

    document[action]('touchstart', tooltipTouchHandler, passiveHandler);

    if (!isMedia(self.element)) {
      window[action]('scroll', self.update, passiveHandler);
      window[action]('resize', self.update, passiveHandler);
    }
  }
  function tooltipShownAction(self) {
    toggleTooltipAction(self, 1);
    self.element.dispatchEvent(shownTooltipEvent);
  }
  function tooltipHiddenAction(self) {
    toggleTooltipAction(self);
    removeTooltip(self);
    self.element.dispatchEvent(hiddenTooltipEvent);
  }
  function toggleTooltipHandlers(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { element } = self;

    if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
    element[action]('mousedown', self.show);
    element[action]('mouseenter', self.show);
    element[action]('mouseleave', self.hide);
  }

  function toggleTooltipTitle(self, content) {
    // [0 - add, 1 - remove] | [0 - remove, 1 - add]
    const titleAtt = [dataOriginalTitle, titleAttr];
    const { element } = self;

    element.setAttribute(titleAtt[content ? 0 : 1],
      (content || element.getAttribute(titleAtt[0])));
    element.removeAttribute(titleAtt[content ? 1 : 0]);
  }

  // TOOLTIP EVENT HANDLERS
  // ======================
  function tooltipTouchHandler({ target }) {
    const { tooltip, element } = this;
    if (tooltip.contains(target) || target === element || element.contains(target)) ; else {
      this.hide();
    }
  }

  // TOOLTIP DEFINITION
  // ==================
  class Tooltip extends BaseComponent {
    constructor(target, config) {
      // initialization element
      const element = queryElement(target);
      tooltipDefaultOptions.title = element.getAttribute(titleAttr);
      tooltipDefaultOptions.container = getTipContainer(element);
      super(tooltipComponent, element, tooltipDefaultOptions, config);

      // bind
      const self = this;

      // additional properties
      self.tooltip = null;
      self.arrow = null;
      self.timer = null;
      self.enabled = false;

      // instance options
      const { options } = self;

      // media elements only work with body as a container
      self.options.container = isMedia(element)
        ? tooltipDefaultOptions.container
        : queryElement(options.container);

      // reset default options
      tooltipDefaultOptions.container = null;
      tooltipDefaultOptions[titleAttr] = null;

      // invalidate
      if (!options.title) return;

      // all functions bind
      tooltipTouchHandler.bind(self);
      self.update = self.update.bind(self);

      // set title attributes and add event listeners
      if (element.hasAttribute(titleAttr)) toggleTooltipTitle(self, options.title);

      // create tooltip here
      self.id = `${tooltipString}-${getUID(element)}`;
      createTooltip(self);

      // attach events
      toggleTooltipHandlers(self, 1);
    }

    // TOOLTIP PUBLIC METHODS
    // ======================
    show(e) {
      const self = e ? this[tooltipComponent] : this;
      const {
        options, tooltip, element, id,
      } = self;
      clearTimeout(self.timer);
      self.timer = setTimeout(() => {
        if (!isVisibleTip(tooltip, options.container)) {
          element.dispatchEvent(showTooltipEvent);
          if (showTooltipEvent.defaultPrevented) return;

          // append to container
          options.container.appendChild(tooltip);
          element.setAttribute(ariaDescribedBy, id);

          self.update(e);
          if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
          if (options.animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(self));
          else tooltipShownAction(self);
        }
      }, 20);
    }

    hide(e) {
      const self = e ? this[tooltipComponent] : this;
      const { options, tooltip, element } = self;

      clearTimeout(self.timer);
      self.timer = setTimeout(() => {
        if (isVisibleTip(tooltip, options.container)) {
          element.dispatchEvent(hideTooltipEvent);
          if (hideTooltipEvent.defaultPrevented) return;

          removeClass(tooltip, showClass);
          if (options.animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(self));
          else tooltipHiddenAction(self);
        }
      }, options.delay);
    }

    update(e) {
      styleTip(this, e);
    }

    toggle() {
      const self = this;
      const { tooltip, options } = self;
      if (!isVisibleTip(tooltip, options.container)) self.show();
      else self.hide();
    }

    enable() {
      const self = this;
      const { enabled } = self;
      if (!enabled) {
        toggleTooltipHandlers(self, 1);
        self.enabled = !enabled;
      }
    }

    disable() {
      const self = this;
      const { tooltip, options, enabled } = self;
      if (enabled) {
        if (!isVisibleTip(tooltip, options.container) && options.animation) {
          self.hide();

          setTimeout(
            () => toggleTooltipHandlers(self),
            getElementTransitionDuration(tooltip) + options.delay + 17,
          );
        } else {
          toggleTooltipHandlers(self);
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
      const { tooltip, options } = self;

      if (options.animation && isVisibleTip(tooltip, options.container)) {
        options.delay = 0; // reset delay
        self.hide();
        emulateTransitionEnd(tooltip, () => disposeTooltipComplete(self));
      } else {
        disposeTooltipComplete(self);
      }
      super.dispose(tooltipComponent);
    }
  }

  Tooltip.init = {
    component: tooltipComponent,
    selector: tooltipSelector,
    constructor: Tooltip,
  };

  return Tooltip;

})));
