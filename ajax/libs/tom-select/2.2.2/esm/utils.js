/**
* Tom Select v2.2.2
* Licensed under the Apache License, Version 2.0 (the "License");
*/

/**
 * Converts a scalar to its best string representation
 * for hash keys and HTML attribute values.
 *
 * Transformations:
 *   'str'     -> 'str'
 *   null      -> ''
 *   undefined -> ''
 *   true      -> '1'
 *   false     -> '0'
 *   0         -> '0'
 *   1         -> '1'
 *
 */
const hash_key = value => {
  if (typeof value === 'undefined' || value === null) return null;
  return get_hash(value);
};
const get_hash = value => {
  if (typeof value === 'boolean') return value ? '1' : '0';
  return value + '';
};
/**
 * Escapes a string for use within HTML.
 *
 */

const escape_html = str => {
  return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
/**
 * Debounce the user provided load function
 *
 */

const loadDebounce = (fn, delay) => {
  var timeout;
  return function (value, callback) {
    var self = this;

    if (timeout) {
      self.loading = Math.max(self.loading - 1, 0);
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      timeout = null;
      self.loadedSearches[value] = true;
      fn.call(self, value, callback);
    }, delay);
  };
};
/**
 * Debounce all fired events types listed in `types`
 * while executing the provided `fn`.
 *
 */

const debounce_events = (self, types, fn) => {
  var type;
  var trigger = self.trigger;
  var event_args = {}; // override trigger method

  self.trigger = function () {
    var type = arguments[0];

    if (types.indexOf(type) !== -1) {
      event_args[type] = arguments;
    } else {
      return trigger.apply(self, arguments);
    }
  }; // invoke provided function


  fn.apply(self, []);
  self.trigger = trigger; // trigger queued events

  for (type of types) {
    if (type in event_args) {
      trigger.apply(self, event_args[type]);
    }
  }
};
/**
 * Determines the current selection within a text input control.
 * Returns an object containing:
 *   - start
 *   - length
 *
 */

const getSelection = input => {
  return {
    start: input.selectionStart || 0,
    length: (input.selectionEnd || 0) - (input.selectionStart || 0)
  };
};
/**
 * Prevent default
 *
 */

const preventDefault = (evt, stop = false) => {
  if (evt) {
    evt.preventDefault();

    if (stop) {
      evt.stopPropagation();
    }
  }
};
/**
 * Add event helper
 *
 */

const addEvent = (target, type, callback, options) => {
  target.addEventListener(type, callback, options);
};
/**
 * Return true if the requested key is down
 * Will return false if more than one control character is pressed ( when [ctrl+shift+a] != [ctrl+a] )
 * The current evt may not always set ( eg calling advanceSelection() )
 *
 */

const isKeyDown = (key_name, evt) => {
  if (!evt) {
    return false;
  }

  if (!evt[key_name]) {
    return false;
  }

  var count = (evt.altKey ? 1 : 0) + (evt.ctrlKey ? 1 : 0) + (evt.shiftKey ? 1 : 0) + (evt.metaKey ? 1 : 0);

  if (count === 1) {
    return true;
  }

  return false;
};
/**
 * Get the id of an element
 * If the id attribute is not set, set the attribute with the given id
 *
 */

const getId = (el, id) => {
  const existing_id = el.getAttribute('id');

  if (existing_id) {
    return existing_id;
  }

  el.setAttribute('id', id);
  return id;
};
/**
 * Returns a string with backslashes added before characters that need to be escaped.
 */

const addSlashes = str => {
  return str.replace(/[\\"']/g, '\\$&');
};
/**
 *
 */

const append = (parent, node) => {
  if (node) parent.append(node);
};

export { addEvent, addSlashes, append, debounce_events, escape_html, getId, getSelection, get_hash, hash_key, isKeyDown, loadDebounce, preventDefault };
//# sourceMappingURL=utils.js.map
