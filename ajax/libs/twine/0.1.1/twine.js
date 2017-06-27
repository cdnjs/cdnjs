(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var attribute, bind, currentBindingCallbacks, elements, eventName, fireCustomChangeEvent, getContext, getValue, isKeypath, j, k, keypathForKey, keypathRegex, len, len1, nodeCount, preventDefaultForEvent, ref, ref1, refreshElement, refreshQueued, rootContext, rootNode, setValue, setupAttributeBinding, setupEventBinding, stringifyNodeAttributes, valueAttributeForNode, wrapFunctionString,
  slice = [].slice;

window.Twine = {};

Twine.shouldDiscardEvent = {};

elements = {};

nodeCount = 0;

rootContext = null;

keypathRegex = /^[a-z]\w*(\.[a-z]\w*|\[\d+\])*$/i;

refreshQueued = false;

rootNode = null;

currentBindingCallbacks = null;

Twine.reset = function(newContext, node) {
  var bindings, j, key, len, obj, ref;
  if (node == null) {
    node = document.documentElement;
  }
  for (key in elements) {
    if (bindings = (ref = elements[key]) != null ? ref.bindings : void 0) {
      for (j = 0, len = bindings.length; j < len; j++) {
        obj = bindings[j];
        if (obj.teardown) {
          obj.teardown();
        }
      }
    }
  }
  elements = {};
  rootContext = newContext;
  rootNode = node;
  rootNode.bindingId = nodeCount = 1;
  return this;
};

Twine.bind = function(node, context) {
  if (node == null) {
    node = rootNode;
  }
  if (context == null) {
    context = Twine.context(node);
  }
  return bind(context, node, true);
};

Twine.afterBound = function(callback) {
  if (currentBindingCallbacks) {
    return currentBindingCallbacks.push(callback);
  } else {
    return callback();
  }
};

bind = function(context, node, forceSaveContext) {
  var binding, callback, callbacks, childNode, definition, element, fn, j, k, keypath, len, len1, newContextKey, ref, ref1, ref2, type;
  currentBindingCallbacks = [];
  if (node.bindingId) {
    Twine.unbind(node);
  }
  ref = Twine.bindingTypes;
  for (type in ref) {
    binding = ref[type];
    if (!(definition = node.getAttribute(type))) {
      continue;
    }
    if (!element) {
      element = {
        bindings: []
      };
    }
    fn = binding(node, context, definition, element);
    if (fn) {
      element.bindings.push(fn);
    }
  }
  if (newContextKey = node.getAttribute('context')) {
    keypath = keypathForKey(newContextKey);
    if (keypath[0] === '$root') {
      context = rootContext;
      keypath = keypath.slice(1);
    }
    context = getValue(context, keypath) || setValue(context, keypath, {});
  }
  if (element || newContextKey || forceSaveContext) {
    (element != null ? element : element = {}).childContext = context;
    elements[node.bindingId != null ? node.bindingId : node.bindingId = ++nodeCount] = element;
  }
  callbacks = currentBindingCallbacks;
  ref1 = node.children || [];
  for (j = 0, len = ref1.length; j < len; j++) {
    childNode = ref1[j];
    bind(context, childNode);
  }
  Twine.count = nodeCount;
  ref2 = callbacks || [];
  for (k = 0, len1 = ref2.length; k < len1; k++) {
    callback = ref2[k];
    callback();
  }
  currentBindingCallbacks = null;
  return Twine;
};

Twine.refresh = function() {
  if (refreshQueued) {
    return;
  }
  refreshQueued = true;
  return setTimeout(Twine.refreshImmediately, 0);
};

refreshElement = function(element) {
  var j, len, obj, ref;
  if (element.bindings) {
    ref = element.bindings;
    for (j = 0, len = ref.length; j < len; j++) {
      obj = ref[j];
      if (obj.refresh != null) {
        obj.refresh();
      }
    }
  }
};

Twine.refreshImmediately = function() {
  var element, key;
  refreshQueued = false;
  for (key in elements) {
    element = elements[key];
    refreshElement(element);
  }
};

Twine.change = function(node, bubble) {
  var event;
  if (bubble == null) {
    bubble = false;
  }
  event = document.createEvent("HTMLEvents");
  event.initEvent('change', bubble, true);
  return node.dispatchEvent(event);
};

Twine.unbind = function(node) {
  var bindings, childNode, id, j, k, len, len1, obj, ref, ref1;
  if (id = node.bindingId) {
    if (bindings = (ref = elements[id]) != null ? ref.bindings : void 0) {
      for (j = 0, len = bindings.length; j < len; j++) {
        obj = bindings[j];
        if (obj.teardown) {
          obj.teardown();
        }
      }
    }
    delete elements[id];
    delete node.bindingId;
  }
  ref1 = node.children || [];
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    childNode = ref1[k];
    Twine.unbind(childNode);
  }
  return this;
};

Twine.context = function(node) {
  return getContext(node, false);
};

Twine.childContext = function(node) {
  return getContext(node, true);
};

getContext = function(node, child) {
  var context, id, ref;
  while (node) {
    if (node === rootNode) {
      return rootContext;
    }
    if (!child) {
      node = node.parentNode;
    }
    if ((id = node.bindingId) && (context = (ref = elements[id]) != null ? ref.childContext : void 0)) {
      return context;
    }
    if (child) {
      node = node.parentNode;
    }
  }
};

Twine.contextKey = function(node, lastContext) {
  var addKey, context, id, keys, ref;
  keys = [];
  addKey = function(context) {
    var key, val;
    for (key in context) {
      val = context[key];
      if (!(lastContext === val)) {
        continue;
      }
      keys.unshift(key);
      break;
    }
    return lastContext = context;
  };
  while (node && node !== rootNode && (node = node.parentNode)) {
    if ((id = node.bindingId) && (context = (ref = elements[id]) != null ? ref.childContext : void 0)) {
      addKey(context);
    }
  }
  if (node === rootNode) {
    addKey(rootContext);
  }
  return keys.join('.');
};

valueAttributeForNode = function(node) {
  var name, ref;
  name = node.nodeName.toLowerCase();
  if (name === 'input' || name === 'textarea' || name === 'select') {
    if ((ref = node.getAttribute('type')) === 'checkbox' || ref === 'radio') {
      return 'checked';
    } else {
      return 'value';
    }
  } else {
    return 'textContent';
  }
};

keypathForKey = function(key) {
  var end, j, keypath, len, ref, start;
  keypath = [];
  ref = key.split('.');
  for (j = 0, len = ref.length; j < len; j++) {
    key = ref[j];
    if ((start = key.indexOf('[')) !== -1) {
      keypath.push(key.substr(0, start));
      key = key.substr(start);
      while ((end = key.indexOf(']')) !== -1) {
        keypath.push(parseInt(key.substr(1, end), 10));
        key = key.substr(end + 1);
      }
    } else {
      keypath.push(key);
    }
  }
  return keypath;
};

getValue = function(object, keypath) {
  var j, key, len;
  for (j = 0, len = keypath.length; j < len; j++) {
    key = keypath[j];
    if (object != null) {
      object = object[key];
    }
  }
  return object;
};

setValue = function(object, keypath, value) {
  var j, k, key, lastKey, len, ref;
  ref = keypath, keypath = 2 <= ref.length ? slice.call(ref, 0, j = ref.length - 1) : (j = 0, []), lastKey = ref[j++];
  for (k = 0, len = keypath.length; k < len; k++) {
    key = keypath[k];
    object = object[key] != null ? object[key] : object[key] = {};
  }
  return object[lastKey] = value;
};

stringifyNodeAttributes = function(node) {
  var attr, i, nAttributes, result;
  nAttributes = node.attributes.length;
  i = 0;
  result = "";
  while (i < nAttributes) {
    attr = node.attributes.item(i);
    result += attr.nodeName + "='" + attr.textContent + "'";
    i += 1;
  }
  return result;
};

wrapFunctionString = function(code, args, node) {
  var e, keypath;
  if (isKeypath(code) && (keypath = keypathForKey(code))) {
    if (keypath[0] === '$root') {
      return function($context, $root) {
        return getValue($root, keypath);
      };
    } else {
      return function($context, $root) {
        return getValue($context, keypath);
      };
    }
  } else {
    try {
      return new Function(args, "with($context) { return " + code + " }");
    } catch (_error) {
      e = _error;
      throw "Twine error: Unable to create function on " + node.nodeName + " node with attributes " + (stringifyNodeAttributes(node));
    }
  }
};

isKeypath = function(value) {
  return (value !== 'true' && value !== 'false' && value !== 'null' && value !== 'undefined') && keypathRegex.test(value);
};

fireCustomChangeEvent = function(node) {
  var event;
  event = document.createEvent('CustomEvent');
  event.initCustomEvent('bindings:change', true, false, {});
  return node.dispatchEvent(event);
};

Twine.bindingTypes = {
  bind: function(node, context, definition) {
    var changeHandler, checkedValueType, fn, keypath, lastValue, oldValue, refresh, refreshContext, teardown, twoWayBinding, value, valueAttribute;
    valueAttribute = valueAttributeForNode(node);
    value = node[valueAttribute];
    lastValue = void 0;
    teardown = void 0;
    checkedValueType = node.getAttribute('type') === 'radio';
    fn = wrapFunctionString(definition, '$context,$root', node);
    refresh = function() {
      var newValue;
      newValue = fn.call(node, context, rootContext);
      if (newValue === lastValue) {
        return;
      }
      lastValue = newValue;
      if (newValue === node[valueAttribute]) {
        return;
      }
      node[valueAttribute] = checkedValueType ? newValue === node.value : newValue;
      return fireCustomChangeEvent(node);
    };
    if (!isKeypath(definition)) {
      return {
        refresh: refresh
      };
    }
    refreshContext = function() {
      if (checkedValueType) {
        if (!node.checked) {
          return;
        }
        return setValue(context, keypath, node.value);
      } else {
        return setValue(context, keypath, node[valueAttribute]);
      }
    };
    keypath = keypathForKey(definition);
    twoWayBinding = valueAttribute !== 'textContent' && node.type !== 'hidden';
    if (keypath[0] === '$root') {
      context = rootContext;
      keypath = keypath.slice(1);
    }
    if ((value != null) && (twoWayBinding || value !== '') && ((oldValue = getValue(context, keypath)) == null)) {
      refreshContext();
    }
    if (twoWayBinding) {
      changeHandler = function() {
        if (getValue(context, keypath) === this[valueAttribute]) {
          return;
        }
        refreshContext();
        return Twine.refreshImmediately();
      };
      $(node).on('input keyup change', changeHandler);
      teardown = function() {
        return $(node).off('input keyup change', changeHandler);
      };
    }
    return {
      refresh: refresh,
      teardown: teardown
    };
  },
  'bind-show': function(node, context, definition) {
    var fn, lastValue;
    fn = wrapFunctionString(definition, '$context,$root', node);
    lastValue = void 0;
    return {
      refresh: function() {
        var newValue;
        newValue = !fn.call(node, context, rootContext);
        if (newValue === lastValue) {
          return;
        }
        return $(node).toggleClass('hide', lastValue = newValue);
      }
    };
  },
  'bind-class': function(node, context, definition) {
    var fn, lastValue;
    fn = wrapFunctionString(definition, '$context,$root', node);
    lastValue = {};
    return {
      refresh: function() {
        var key, newValue, value;
        newValue = fn.call(node, context, rootContext);
        for (key in newValue) {
          value = newValue[key];
          if (!lastValue[key] !== !value) {
            $(node).toggleClass(key, !!value);
          }
        }
        return lastValue = newValue;
      }
    };
  },
  'bind-attribute': function(node, context, definition) {
    var fn, lastValue;
    fn = wrapFunctionString(definition, '$context,$root', node);
    lastValue = {};
    return {
      refresh: function() {
        var key, newValue, value;
        newValue = fn.call(node, context, rootContext);
        for (key in newValue) {
          value = newValue[key];
          if (lastValue[key] !== value) {
            $(node).attr(key, value || null);
          }
        }
        return lastValue = newValue;
      }
    };
  },
  define: function(node, context, definition) {
    var fn, key, object, value;
    fn = wrapFunctionString(definition, '$context,$root', node);
    object = fn.call(node, context, rootContext);
    for (key in object) {
      value = object[key];
      context[key] = value;
    }
  },
  "eval": function(node, context, definition) {
    var fn;
    fn = wrapFunctionString(definition, '$context,$root', node);
    fn.call(node, context, rootContext);
  }
};

setupAttributeBinding = function(attributeName, bindingName) {
  var booleanAttribute;
  booleanAttribute = attributeName === 'checked' || attributeName === 'disabled' || attributeName === 'readOnly';
  return Twine.bindingTypes["bind-" + bindingName] = function(node, context, definition) {
    var fn, lastValue;
    fn = wrapFunctionString(definition, '$context,$root', node);
    lastValue = void 0;
    return {
      refresh: function() {
        var newValue;
        newValue = fn.call(node, context, rootContext);
        if (booleanAttribute) {
          newValue = !!newValue;
        }
        if (newValue === lastValue) {
          return;
        }
        node[attributeName] = lastValue = newValue;
        if (attributeName === 'checked') {
          return fireCustomChangeEvent(node);
        }
      }
    };
  };
};

ref = ['placeholder', 'checked', 'disabled', 'href', 'title', 'readOnly', 'src'];
for (j = 0, len = ref.length; j < len; j++) {
  attribute = ref[j];
  setupAttributeBinding(attribute, attribute);
}

setupAttributeBinding('innerHTML', 'unsafe-html');

preventDefaultForEvent = function(event) {
  return (event.type === 'submit' || event.currentTarget.nodeName.toLowerCase() === 'a') && event.currentTarget.getAttribute('allow-default') !== '1';
};

setupEventBinding = function(eventName) {
  return Twine.bindingTypes["bind-event-" + eventName] = function(node, context, definition) {
    var onEventHandler;
    onEventHandler = function(event, data) {
      var base, discardEvent;
      discardEvent = typeof (base = Twine.shouldDiscardEvent)[eventName] === "function" ? base[eventName](event) : void 0;
      if (discardEvent || preventDefaultForEvent(event)) {
        event.preventDefault();
      }
      if (discardEvent) {
        return;
      }
      wrapFunctionString(definition, '$context,$root,event,data', node).call(node, context, rootContext, event, data);
      return Twine.refreshImmediately();
    };
    $(node).on(eventName, onEventHandler);
    return {
      teardown: function() {
        return $(node).off(eventName, onEventHandler);
      }
    };
  };
};

ref1 = ['click', 'dblclick', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'submit', 'dragenter', 'dragleave', 'dragover', 'drop', 'drag', 'change', 'keypress', 'keydown', 'keyup', 'input', 'error', 'done', 'success', 'fail', 'blur', 'focus', 'load'];
for (k = 0, len1 = ref1.length; k < len1; k++) {
  eventName = ref1[k];
  setupEventBinding(eventName);
}



},{}]},{},[1]);
