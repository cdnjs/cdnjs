(function() {
  var slice = [].slice;

  (function(root, factory) {
    if (typeof root.define === 'function' && root.define.amd) {
      return root.define([], factory);
    } else if (typeof module === 'object' && module.exports) {
      return module.exports = factory();
    } else {
      return root.Twine = factory();
    }
  })(this, function() {
    var Twine, arrayPointersForNode, attribute, bind, bindingOrder, childrenForNode, currentBindingCallbacks, defineArray, elements, eventName, findOrCreateElementForNode, fireCustomChangeEvent, getContext, getIndexesForElement, getValue, isDataAttribute, isKeypath, j, k, keyWithArrayIndex, keypathForKey, keypathRegex, len, len1, nodeArrayIndexes, nodeCount, preventDefaultForEvent, ref, ref1, refreshCallbacks, refreshElement, refreshQueued, registry, requiresRegistry, rootContext, rootNode, setValue, setupEventBinding, setupPropertyBinding, stringifyNodeAttributes, valuePropertyForNode, wrapFunctionString;
    Twine = {};
    Twine.shouldDiscardEvent = {};
    elements = {};
    registry = {};
    nodeCount = 0;
    rootContext = null;
    keypathRegex = /^[a-z]\w*(\.[a-z]\w*|\[\d+\])*$/i;
    refreshQueued = false;
    refreshCallbacks = [];
    rootNode = null;
    currentBindingCallbacks = null;
    Twine.getAttribute = function(node, attr) {
      return node.getAttribute("data-" + attr) || node.getAttribute(attr);
    };
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
      return bind(context, node, getIndexesForElement(node), true);
    };
    Twine.afterBound = function(callback) {
      if (currentBindingCallbacks) {
        return currentBindingCallbacks.push(callback);
      } else {
        return callback();
      }
    };
    bind = function(context, node, indexes, forceSaveContext) {
      var _, attribute, binding, bindingConstructors, callback, callbacks, childNode, constructor, defineArrayAttr, definition, element, j, k, key, keypath, l, len, len1, len2, len3, m, newContextKey, newIndexes, ref, ref1, ref2, ref3, ref4, type, value;
      currentBindingCallbacks = [];
      element = null;
      if (node.bindingId) {
        Twine.unbind(node);
      }
      if (defineArrayAttr = Twine.getAttribute(node, 'define-array')) {
        newIndexes = defineArray(node, context, defineArrayAttr);
        if (indexes == null) {
          indexes = {};
        }
        for (key in indexes) {
          value = indexes[key];
          if (!newIndexes.hasOwnProperty(key)) {
            newIndexes[key] = value;
          }
        }
        indexes = newIndexes;
        element = findOrCreateElementForNode(node);
        element.indexes = indexes;
      }
      bindingConstructors = null;
      ref = node.attributes;
      for (j = 0, len = ref.length; j < len; j++) {
        attribute = ref[j];
        type = attribute.name;
        if (isDataAttribute(type)) {
          type = type.slice(5);
        }
        constructor = Twine.bindingTypes[type];
        if (!constructor) {
          continue;
        }
        if (bindingConstructors == null) {
          bindingConstructors = [];
        }
        definition = attribute.value;
        bindingConstructors.push([type, constructor, definition]);
      }
      if (bindingConstructors) {
        if (element == null) {
          element = findOrCreateElementForNode(node);
        }
        if (element.bindings == null) {
          element.bindings = [];
        }
        if (element.indexes == null) {
          element.indexes = indexes;
        }
        ref1 = bindingConstructors.sort(bindingOrder);
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          ref2 = ref1[k], _ = ref2[0], constructor = ref2[1], definition = ref2[2];
          binding = constructor(node, context, definition, element);
          if (binding) {
            element.bindings.push(binding);
          }
        }
      }
      if (newContextKey = Twine.getAttribute(node, 'context')) {
        keypath = keypathForKey(node, newContextKey);
        if (keypath[0] === '$root') {
          context = rootContext;
          keypath = keypath.slice(1);
        }
        context = getValue(context, keypath) || setValue(context, keypath, {});
      }
      if (element || newContextKey || forceSaveContext) {
        if (element == null) {
          element = findOrCreateElementForNode(node);
        }
        element.childContext = context;
        if (indexes != null) {
          if (element.indexes == null) {
            element.indexes = indexes;
          }
        }
      }
      callbacks = currentBindingCallbacks;
      ref3 = childrenForNode(node);
      for (l = 0, len2 = ref3.length; l < len2; l++) {
        childNode = ref3[l];
        bind(context, childNode, newContextKey != null ? null : indexes);
      }
      Twine.count = nodeCount;
      ref4 = callbacks || [];
      for (m = 0, len3 = ref4.length; m < len3; m++) {
        callback = ref4[m];
        callback();
      }
      currentBindingCallbacks = null;
      return Twine;
    };
    childrenForNode = function(node) {
      if (node.children) {
        return Array.prototype.slice.call(node.children, 0);
      } else {
        return [];
      }
    };
    findOrCreateElementForNode = function(node) {
      var name1;
      if (node.bindingId == null) {
        node.bindingId = ++nodeCount;
      }
      return elements[name1 = node.bindingId] != null ? elements[name1] : elements[name1] = {};
    };
    Twine.refresh = function(callback) {
      if (callback) {
        refreshCallbacks.push(callback);
      }
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
      var callbacks, cb, element, j, key, len;
      refreshQueued = false;
      for (key in elements) {
        element = elements[key];
        refreshElement(element);
      }
      callbacks = refreshCallbacks;
      refreshCallbacks = [];
      for (j = 0, len = callbacks.length; j < len; j++) {
        cb = callbacks[j];
        cb();
      }
    };
    Twine.register = function(name, component) {
      if (registry[name]) {
        throw new Error("Twine error: '" + name + "' is already registered with Twine");
      } else {
        return registry[name] = component;
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
      ref1 = childrenForNode(node);
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
        if (!node) {
          console.warn("Unable to find context; please check that the node is attached to the DOM that Twine has bound, or that bindings have been initiated on this node's DOM");
          return null;
        }
        if ((id = node.bindingId) && (context = (ref = elements[id]) != null ? ref.childContext : void 0)) {
          return context;
        }
        if (child) {
          node = node.parentNode;
        }
      }
    };
    getIndexesForElement = function(node) {
      var firstContext, id, ref;
      firstContext = null;
      while (node) {
        if (id = node.bindingId) {
          return (ref = elements[id]) != null ? ref.indexes : void 0;
        }
        node = node.parentNode;
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
    valuePropertyForNode = function(node) {
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
    keypathForKey = function(node, key) {
      var end, i, j, keypath, len, ref, start;
      keypath = [];
      ref = key.split('.');
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        key = ref[i];
        if ((start = key.indexOf('[')) !== -1) {
          if (i === 0) {
            keypath.push.apply(keypath, keyWithArrayIndex(key.substr(0, start), node));
          } else {
            keypath.push(key.substr(0, start));
          }
          key = key.substr(start);
          while ((end = key.indexOf(']')) !== -1) {
            keypath.push(parseInt(key.substr(1, end), 10));
            key = key.substr(end + 1);
          }
        } else {
          if (i === 0) {
            keypath.push.apply(keypath, keyWithArrayIndex(key, node));
          } else {
            keypath.push(key);
          }
        }
      }
      return keypath;
    };
    keyWithArrayIndex = function(key, node) {
      var index, ref, ref1;
      index = (ref = elements[node.bindingId]) != null ? (ref1 = ref.indexes) != null ? ref1[key] : void 0 : void 0;
      if (index != null) {
        return [key, index];
      } else {
        return [key];
      }
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
      return [].map.call(node.attributes, function(attr) {
        return attr.name + "=" + (JSON.stringify(attr.value));
      }).join(' ');
    };
    wrapFunctionString = function(code, args, node) {
      var e, error, keypath;
      if (isKeypath(code) && (keypath = keypathForKey(node, code))) {
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
        code = "return " + code;
        if (nodeArrayIndexes(node)) {
          code = "with($arrayPointers) { " + code + " }";
        }
        if (requiresRegistry(args)) {
          code = "with($registry) { " + code + " }";
        }
        try {
          return new Function(args, "with($context) { " + code + " }");
        } catch (error) {
          e = error;
          throw "Twine error: Unable to create function on " + node.nodeName + " node with attributes " + (stringifyNodeAttributes(node));
        }
      }
    };
    requiresRegistry = function(args) {
      return /\$registry/.test(args);
    };
    nodeArrayIndexes = function(node) {
      var ref;
      return (node.bindingId != null) && ((ref = elements[node.bindingId]) != null ? ref.indexes : void 0);
    };
    arrayPointersForNode = function(node, context) {
      var index, indexes, key, result;
      indexes = nodeArrayIndexes(node);
      if (!indexes) {
        return {};
      }
      result = {};
      for (key in indexes) {
        index = indexes[key];
        result[key] = context[key][index];
      }
      return result;
    };
    isKeypath = function(value) {
      return (value !== 'true' && value !== 'false' && value !== 'null' && value !== 'undefined') && keypathRegex.test(value);
    };
    isDataAttribute = function(value) {
      return value[0] === 'd' && value[1] === 'a' && value[2] === 't' && value[3] === 'a' && value[4] === '-';
    };
    fireCustomChangeEvent = function(node) {
      var event;
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('bindings:change', true, false, {});
      return node.dispatchEvent(event);
    };
    bindingOrder = function(arg, arg1) {
      var ORDERED_BINDINGS, firstType, secondType;
      firstType = arg[0];
      secondType = arg1[0];
      ORDERED_BINDINGS = {
        define: 1,
        bind: 2,
        "eval": 3
      };
      if (!ORDERED_BINDINGS[firstType]) {
        return 1;
      }
      if (!ORDERED_BINDINGS[secondType]) {
        return -1;
      }
      return ORDERED_BINDINGS[firstType] - ORDERED_BINDINGS[secondType];
    };
    Twine.bindingTypes = {
      bind: function(node, context, definition) {
        var changeHandler, checkedValueType, eventName, events, fn, j, keypath, lastValue, len, oldValue, refresh, refreshContext, teardown, twoWayBinding, value, valueProp;
        valueProp = valuePropertyForNode(node);
        value = node[valueProp];
        lastValue = void 0;
        teardown = void 0;
        checkedValueType = node.getAttribute('type') === 'radio';
        fn = wrapFunctionString(definition, '$context,$root,$arrayPointers', node);
        refresh = function() {
          var newValue;
          newValue = fn.call(node, context, rootContext, arrayPointersForNode(node, context));
          if (newValue === lastValue) {
            return;
          }
          lastValue = newValue;
          if (newValue === node[valueProp]) {
            return;
          }
          node[valueProp] = checkedValueType ? newValue === node.value : newValue;
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
            return setValue(context, keypath, node[valueProp]);
          }
        };
        keypath = keypathForKey(node, definition);
        twoWayBinding = valueProp !== 'textContent' && node.type !== 'hidden';
        if (keypath[0] === '$root') {
          context = rootContext;
          keypath = keypath.slice(1);
        }
        if ((value != null) && (twoWayBinding || value !== '') && ((oldValue = getValue(context, keypath)) == null)) {
          refreshContext();
        }
        if (twoWayBinding) {
          events = ['input', 'keyup', 'change'];
          changeHandler = function() {
            if (getValue(context, keypath) === this[valueProp]) {
              return;
            }
            refreshContext();
            return Twine.refreshImmediately();
          };
          for (j = 0, len = events.length; j < len; j++) {
            eventName = events[j];
            node.addEventListener(eventName, changeHandler);
          }
          teardown = function() {
            var k, len1, results;
            results = [];
            for (k = 0, len1 = events.length; k < len1; k++) {
              eventName = events[k];
              results.push(node.removeEventListener(eventName, changeHandler));
            }
            return results;
          };
        }
        return {
          refresh: refresh,
          teardown: teardown
        };
      },
      'bind-show': function(node, context, definition) {
        var fn, lastValue;
        fn = wrapFunctionString(definition, '$context,$root,$arrayPointers', node);
        lastValue = void 0;
        return {
          refresh: function() {
            var newValue;
            newValue = !fn.call(node, context, rootContext, arrayPointersForNode(node, context));
            if (newValue === lastValue) {
              return;
            }
            return node.classList.toggle('hide', lastValue = newValue);
          }
        };
      },
      'bind-class': function(node, context, definition) {
        var fn, lastValues;
        fn = wrapFunctionString(definition, '$context,$root,$arrayPointers', node);
        lastValues = {};
        return {
          refresh: function() {
            var currValue, key, newValue, newValues, ref, value;
            newValues = fn.call(node, context, rootContext, arrayPointersForNode(node, context));
            for (key in newValues) {
              value = newValues[key];
              newValue = newValues[key] = !!newValues[key];
              currValue = (ref = lastValues[key]) != null ? ref : node.classList.contains(key);
              if (currValue !== newValue) {
                if (newValue) {
                  node.classList.add(key);
                } else {
                  node.classList.remove(key);
                }
              }
            }
            return lastValues = newValues;
          }
        };
      },
      'bind-attribute': function(node, context, definition) {
        var fn, lastValue;
        fn = wrapFunctionString(definition, '$context,$root,$arrayPointers', node);
        lastValue = {};
        return {
          refresh: function() {
            var key, newValue, value;
            newValue = fn.call(node, context, rootContext, arrayPointersForNode(node, context));
            for (key in newValue) {
              value = newValue[key];
              if (lastValue[key] !== value) {
                if (!value) {
                  node.removeAttribute(key);
                } else {
                  node.setAttribute(key, value);
                }
              }
            }
            return lastValue = newValue;
          }
        };
      },
      define: function(node, context, definition) {
        var fn, key, object, value;
        fn = wrapFunctionString(definition, '$context,$root,$registry,$arrayPointers', node);
        object = fn.call(node, context, rootContext, registry, arrayPointersForNode(node, context));
        for (key in object) {
          value = object[key];
          context[key] = value;
        }
      },
      "eval": function(node, context, definition) {
        var fn;
        fn = wrapFunctionString(definition, '$context,$root,$registry,$arrayPointers', node);
        fn.call(node, context, rootContext, registry, arrayPointersForNode(node, context));
      }
    };
    defineArray = function(node, context, definition) {
      var fn, indexes, key, object, value;
      fn = wrapFunctionString(definition, '$context,$root', node);
      object = fn.call(node, context, rootContext);
      indexes = {};
      for (key in object) {
        value = object[key];
        if (context[key] == null) {
          context[key] = [];
        }
        if (!(context[key] instanceof Array)) {
          throw "Twine error: expected '" + key + "' to be an array";
        }
        indexes[key] = context[key].length;
        context[key].push(value);
      }
      return indexes;
    };
    setupPropertyBinding = function(attributeName, bindingName) {
      var booleanProp;
      booleanProp = attributeName === 'checked' || attributeName === 'indeterminate' || attributeName === 'disabled' || attributeName === 'readOnly' || attributeName === 'draggable';
      return Twine.bindingTypes["bind-" + (bindingName.toLowerCase())] = function(node, context, definition) {
        var fn, lastValue;
        fn = wrapFunctionString(definition, '$context,$root,$arrayPointers', node);
        lastValue = void 0;
        return {
          refresh: function() {
            var newValue;
            newValue = fn.call(node, context, rootContext, arrayPointersForNode(node, context));
            if (booleanProp) {
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
    ref = ['placeholder', 'checked', 'indeterminate', 'disabled', 'href', 'title', 'readOnly', 'src', 'draggable'];
    for (j = 0, len = ref.length; j < len; j++) {
      attribute = ref[j];
      setupPropertyBinding(attribute, attribute);
    }
    setupPropertyBinding('innerHTML', 'unsafe-html');
    preventDefaultForEvent = function(event) {
      var ref1;
      return (event.type === 'submit' || event.currentTarget.nodeName.toLowerCase() === 'a') && ((ref1 = Twine.getAttribute(event.currentTarget, 'allow-default')) === 'false' || ref1 === false || ref1 === 0 || ref1 === (void 0) || ref1 === null);
    };
    setupEventBinding = function(eventName) {
      return Twine.bindingTypes["bind-event-" + eventName] = function(node, context, definition) {
        var onEventHandler;
        onEventHandler = function(event, data) {
          var base, discardEvent;
          if (data == null) {
            data = event.detail;
          }
          discardEvent = typeof (base = Twine.shouldDiscardEvent)[eventName] === "function" ? base[eventName](event) : void 0;
          if (discardEvent || preventDefaultForEvent(event)) {
            event.preventDefault();
          }
          if (discardEvent) {
            return;
          }
          wrapFunctionString(definition, '$context,$root,$arrayPointers,event,data', node).call(node, context, rootContext, arrayPointersForNode(node, context), event, data);
          return Twine.refreshImmediately();
        };
        node.addEventListener(eventName, onEventHandler);
        return {
          teardown: function() {
            return node.removeEventListener(eventName, onEventHandler);
          }
        };
      };
    };
    ref1 = ['click', 'dblclick', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'submit', 'dragenter', 'dragleave', 'dragover', 'drop', 'drag', 'change', 'keypress', 'keydown', 'keyup', 'input', 'error', 'done', 'success', 'fail', 'blur', 'focus', 'load', 'paste'];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      eventName = ref1[k];
      setupEventBinding(eventName);
    }
    return Twine;
  });

}).call(this);
