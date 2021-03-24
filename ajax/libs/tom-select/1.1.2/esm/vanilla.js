/**
* Tom Select v1.1.2
* Licensed under the Apache License, Version 2.0 (the "License");
*/

/**
 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * param query should be {}
 */
function getDom(query) {
  if (query.jquery) {
    return query[0];
  }

  if (query instanceof HTMLElement) {
    return query;
  }

  if (query.indexOf('<') > -1) {
    let div = document.createElement('div');
    div.innerHTML = query.trim(); // Never return a text node of whitespace as the result

    return div.firstChild;
  }

  return document.querySelector(query);
}
function escapeQuery(query) {
  return query.replace(/['"\\]/g, '\\$&');
}
/**
 * Dispatch an event
 *
 */

function triggerEvent(dom_el, event_name) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(event_name, true, false);
  dom_el.dispatchEvent(event);
}
/**
 * Apply CSS rules to a dom element
 *
 */

function applyCSS(dom_el, css) {
  Object.keys(css).forEach(function (name) {
    dom_el.style[name] = css[name];
  });
}
/**
 * Add css classes
 *
 */

function addClasses(elmts, ...classes) {
  var norm_classes = classesArray(classes);
  elmts = castAsArray(elmts);
  elmts.map(el => {
    norm_classes.map(cls => {
      el.classList.add(cls);
    });
  });
}
/**
 * Remove css classes
 *
 */

function removeClasses(elmts, ...classes) {
  var norm_classes = classesArray(classes);
  elmts = castAsArray(elmts);
  elmts.map(el => {
    norm_classes.map(cls => {
      el.classList.remove(cls);
    });
  });
}
/**
 * Return arguments
 *
 */

function classesArray(args) {
  var classes = [];

  for (let i = 0; i < args.length; i++) {
    let _classes = args[i];

    if (typeof _classes === 'string') {
      _classes = _classes.trim().split(/[\11\12\14\15\40]/);
    }

    if (Array.isArray(_classes)) {
      classes = classes.concat(_classes);
    }
  }

  return classes.filter(Boolean);
}
/**
 * Create an array from arg if it's not already an array
 *
 */

function castAsArray(arg) {
  if (!Array.isArray(arg)) {
    arg = [arg];
  }

  return arg;
}
/**
 * Get the closest node to the evt.target matching the selector
 * Stops at wrapper
 *
 */

function parentMatch(target, selector, wrapper) {
  if (wrapper && !wrapper.contains(target)) {
    return;
  }

  while (target && target.matches) {
    if (target.matches(selector)) {
      return target;
    }

    target = target.parentNode;
  }
}
/**
 * Get the first or last item from an array
 *
 * > 0 - right (last)
 * < 0 - left (first)
 *
 */

function getTail(list, direction) {
  if (direction > 0) {
    return list[list.length - 1];
  }

  return list[0];
}
/**
 * Return true if an object is empty
 *
 */

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
/**
 * Get the index of an element amongst sibling nodes of the same type
 *
 */

function nodeIndex(el, amongst) {
  if (!el) return -1;
  amongst = amongst || el.nodeName;
  var i = 0;

  while (el = el.previousElementSibling) {
    if (el.matches(amongst)) {
      i++;
    }
  }

  return i;
}

export { addClasses, applyCSS, castAsArray, classesArray, escapeQuery, getDom, getTail, isEmptyObject, nodeIndex, parentMatch, removeClasses, triggerEvent };
//# sourceMappingURL=vanilla.js.map
