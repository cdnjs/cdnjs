/*!
  * Util v2.0.0-alpha.1 (https://phonon-framework.github.io)
  * Copyright 2015-2019 qathom
  * Licensed under MIT (https://github.com/phonon-framework/phonon/blob/master/LICENSE.md)
  */
'use strict';

function elementEvent(domElement, eventName, moduleName, detail) {
  if (detail === void 0) {
    detail = {};
  }

  var fullEventName = eventName + ".ph." + moduleName;
  domElement.dispatchEvent(new CustomEvent(fullEventName, {
    detail: detail
  }));
}

function pageEvent(eventName, pageName, detail) {
  if (detail === void 0) {
    detail = {};
  }

  var fullEventName = pageName + "." + eventName;
  window.dispatchEvent(new CustomEvent(fullEventName, {
    detail: detail
  }));
  document.dispatchEvent(new CustomEvent(fullEventName, {
    detail: detail
  }));
}

function winDocEvent(eventName, moduleName, detail) {
  if (detail === void 0) {
    detail = {};
  }

  var fullEventName = eventName + ".ph." + moduleName;
  window.dispatchEvent(new CustomEvent(fullEventName, {
    detail: detail
  }));
  document.dispatchEvent(new CustomEvent(fullEventName, {
    detail: detail
  }));
}

var dispatch = {
  elementEvent: elementEvent,
  pageEvent: pageEvent,
  winDocEvent: winDocEvent
};

function onError() {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('error', function (event) {
    console.error('-- Phonon Error --');
    console.error('An error has occured!' + ' ' + 'You can pen an issue here: https://github.com/phonon-framework/phonon/issues');
    console.error(JSON.stringify(event));
  });
}

var availableEvents = ['mousedown', 'mousemove', 'mouseup'];
var touchScreen = false;

if (typeof window !== 'undefined') {
  if ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch) {
    touchScreen = true;
    availableEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
  }

  if (window.navigator.pointerEnabled) {
    availableEvents = ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'];
  } else if (window.navigator.msPointerEnabled) {
    availableEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel'];
  }
}

var transitions = [{
  name: 'transition',
  start: 'transitionstart',
  end: 'transitionend'
}, {
  name: 'MozTransition',
  start: 'transitionstart',
  end: 'transitionend'
}, {
  name: 'msTransition',
  start: 'msTransitionStart',
  end: 'msTransitionEnd'
}, {
  name: 'WebkitTransition',
  start: 'webkitTransitionStart',
  end: 'webkitTransitionEnd'
}];
var animations = [{
  name: 'animation',
  start: 'animationstart',
  end: 'animationend'
}, {
  name: 'MozAnimation',
  start: 'animationstart',
  end: 'animationend'
}, {
  name: 'msAnimation',
  start: 'msAnimationStart',
  end: 'msAnimationEnd'
}, {
  name: 'WebkitAnimation',
  start: 'webkitAnimationStart',
  end: 'webkitAnimationEnd'
}];
var el = window.document.createElement('div');
var transition = transitions.find(function (t) {
  return typeof el.style[t.name] !== 'undefined';
});
var animation = animations.find(function (t) {
  return typeof el.style[t.name] !== 'undefined';
});
var transitionStart = transition ? transition.start : 'transitionstart';
var transitionEnd = transition ? transition.end : 'transitionend';
var animationStart = animation ? animation.start : 'animationstart';
var animationEnd = animation ? animation.end : 'animationend';
var events = {
  TOUCH_SCREEN: touchScreen,
  NETWORK_ONLINE: 'online',
  NETWORK_OFFLINE: 'offline',
  NETWORK_RECONNECTING: 'reconnecting',
  NETWORK_RECONNECTING_SUCCESS: 'reconnect.success',
  NETWORK_RECONNECTING_FAILURE: 'reconnect.failure',
  SHOW: 'show',
  SHOWN: 'shown',
  HIDE: 'hide',
  HIDDEN: 'hidden',
  HASH: 'hash',
  START: availableEvents[0],
  MOVE: availableEvents[1],
  END: availableEvents[2],
  CANCEL: typeof availableEvents[3] === 'undefined' ? null : availableEvents[3],
  CLICK: 'click',
  TRANSITION_START: transitionStart,
  TRANSITION_END: transitionEnd,
  ANIMATION_START: animationStart,
  ANIMATION_END: animationEnd,
  ITEM_SELECTED: 'itemSelected'
};

function closest(element, selector) {
  if (!Element.prototype.matches) ;

  var el = element;

  do {
    if (el.matches(selector)) {
      return el;
    }

    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);

  return null;
}

function attrConfig(element) {
  if (!element) {
    return null;
  }

  var attr = element.getAttribute('data-config');

  if (!attr) {
    return null;
  }

  try {
    var config = JSON.parse(attr);
    return config;
  } catch (e) {}

  var keys = (attr.match(/(\w+)\s*:\s*(["'])?/igm) || []).map(function (e) {
    return e.replace(/(\w+)\s*:\s*(["'])?/igm, '$1');
  });
  var values = attr.match(/[^:]+(?=,|$)/igm) || [];
  var json = {};
  keys.forEach(function (key, i) {
    var value = values[i].replace(/ /g, '').replace(/\'|"/g, '');
    var convertedValue = '';

    if (value === 'true' || value === 'false') {
      convertedValue = value === 'true';
    } else if (!isNaN(value)) {
      convertedValue = parseFloat(value);
    } else {
      convertedValue = value;
    }

    json[key] = convertedValue;
  });
  return json;
}

function removeClasses(element, classList, prefix) {
  if (prefix === void 0) {
    prefix = null;
  }

  classList.forEach(function (className) {
    var cName = prefix ? prefix + "-" + className : className;

    if (element.classList.contains(cName)) {
      element.classList.remove(cName);
    }
  });
}

function isElement(node) {
  return node.nodeType === 1 && typeof node.className === 'string';
}
var selector = {
  attrConfig: attrConfig,
  removeClasses: removeClasses,
  closest: closest,
  isElement: isElement
};

var components = {};

function getName(component) {
  if (typeof component === 'string') {
    return component.toLowerCase();
  }

  return component.constructor.name.toLowerCase();
}

function addComponent(component) {
  var name = getName(component);

  if (!components[name]) {
    components[name] = [];
  }

  components[name].push(component);
}

function removeComponent(componentName, element) {
  var name = getName(componentName);
  var index = (components[name] || []).findIndex(function (c) {
    return c.getElement() === element;
  });

  if (index === -1) {
    return;
  }

  var component = components[name][index];
  component.destroy();
  components[name].splice(index, 1);
}

function getComponent(component, options) {
  var className = getName(component);
  var element = options.element;

  if (!element) {
    return null;
  }

  var selector = typeof element === 'string' ? document.querySelector(element) : element;
  var existingComponent = (components[className] || []).find(function (c) {
    return c.getElement() === selector;
  });

  if (!existingComponent) {
    return null;
  }

  if (options) {
    existingComponent.setProps(options);
  }

  return existingComponent;
}

var stack = {
  addComponent: addComponent,
  getComponent: getComponent,
  removeComponent: removeComponent
};

var mutatorSubscribers = [];

function subscribe(subscriber) {
  mutatorSubscribers.push(subscriber);

  if (document.body) {
    Array.from(document.body.querySelectorAll("." + subscriber.componentClass) || []).filter(function (component) {
      return component.getAttribute('data-no-boot') === null;
    }).forEach(function (component) {
      dispatchChangeEvent(subscriber, 'onAdded', component, stack.addComponent);
    });
  }
}

function dispatchChangeEvent(subscriber, eventName) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  var callback = subscriber[eventName];

  if (!callback) {
    return;
  }

  callback.apply(callback, args);
}

function nodeFn(element, added) {
  if (added === void 0) {
    added = true;
  }

  if (element.getAttribute('data-no-boot') !== null) {
    return;
  }

  var elementClasses = element.className.split(' ');
  var subscriber = mutatorSubscribers.find(function (l) {
    return elementClasses.indexOf(l.componentClass) > -1;
  });

  if (!subscriber) {
    return;
  }

  var eventName = added ? 'onAdded' : 'onRemoved';
  var args = added ? [element, stack.addComponent] : [element, stack.removeComponent];
  dispatchChangeEvent.apply(void 0, [subscriber, eventName].concat(args));
}

function apply(node, added) {
  if (added === void 0) {
    added = true;
  }

  nodeFn(node, added);
  var nextNode = node.firstElementChild;

  while (nextNode) {
    var next = nextNode.nextElementSibling;

    if (isElement(nextNode)) {
      apply(nextNode, added);
    }

    nextNode = next;
  }
}

function getElements(nodes) {
  return Array.from(nodes).filter(function (node) {
    return isElement(node);
  });
}

function observe() {
  new MutationObserver(function (mutations) {
    return mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes') {
        return;
      }

      var addedNodes = mutation.addedNodes,
          removedNodes = mutation.removedNodes;
      getElements(addedNodes).forEach(function (node) {
        return apply(node, true);
      });
      getElements(removedNodes).forEach(function (node) {
        return apply(node, false);
      });
    });
  }).observe(document, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true
  });
}

function boot() {
  if (!('MutationObserver' in window)) {
    return;
  }

  if (document.body) {
    observe();
  } else {
    var obs_1 = new MutationObserver(function () {
      if (document.body) {
        obs_1.disconnect();
        observe();
      }
    });
    obs_1.observe(document, {
      childList: true,
      subtree: true
    });
  }
}

boot();
var observer = {
  subscribe: subscribe,
  getComponent: stack.getComponent
};

var sleep = (function (timeout) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
});

onError();
var utils = {
  sleep: sleep,
  Event: events,
  Dispatch: dispatch,
  Selector: selector,
  Observer: observer
};

/*
 * Fix module resolution error with Typescript (for CommonJS components in dist/)
 * by creating util.js
 * Current fix is to add explicit .js extension in all components (accordion.ts, modal.ts, etc.)
 *
 * Resources:
 * https://www.typescriptlang.org/docs/handbook/module-resolution.html
 * https://github.com/Microsoft/TypeScript/issues/16577
 */

module.exports = utils;
//# sourceMappingURL=util.js.map
