/**
 * Moon v0.11.0
 * Copyright 2016-2017 Kabir Shah
 * Released under the MIT License
 * http://moonjs.ga
 */

(function(root, factory) {
  /* ======= Global Moon ======= */
  (typeof module === "object" && module.exports) ? module.exports = factory() : root.Moon = factory();
}(this, function() {
    "use strict";
    
    /* ======= Global Variables ======= */
    var directives = {};
    var specialDirectives = {};
    var components = {};
    var eventModifiersCode = {
      stop: 'event.stopPropagation();',
      prevent: 'event.preventDefault();',
      ctrl: 'if(event.ctrlKey === false) {return null;};',
      shift: 'if(event.shiftKey === false) {return null;};',
      alt: 'if(event.altKey === false) {return null;};',
      enter: 'if(event.keyCode !== 13) {return null;};'
    };
    var eventModifiers = {};
    
    /* ======= Observer ======= */
    /**
     * Sets Up Methods
     * @param {Object} instance
     * @param {Array} methods
     */
    var initMethods = function(instance, methods) {
      var data = instance.$data;
    
      var initMethod = function(methodName, method) {
        data[methodName] = function() {
          return method.apply(instance, arguments);
        }
      }
    
      for(var method in methods) {
        initMethod(method, methods[method]);
      }
    }
    
    /**
     * Makes Computed Properties for an Instance
     * @param {Object} instance
     * @param {Object} computed
     */
    var initComputed = function(instance, computed) {
      var setComputedProperty = function(prop) {
        var observer = instance.$observer;
    
        // Flush Cache if Dependencies Change
        observer.observe(prop);
    
        // Add Getters
        Object.defineProperty(instance.$data, prop, {
          get: function() {
            // Property Cache
            var cache = null;
    
            // If no cache, create it
            if(observer.cache[prop] === undefined) {
              // Capture Dependencies
              observer.target = prop;
    
              // Invoke getter
              cache = computed[prop].get.call(instance);
    
              // Stop Capturing Dependencies
              observer.target = null;
    
              // Store value in cache
              observer.cache[prop] = cache;
            } else {
              // Cache found, use it
              cache = observer.cache[prop];
            }
    
            return cache;
          },
          set: noop
        });
    
        // Add Setters
        var setter = null;
        if((setter = computed[prop].set) !== undefined) {
          observer.setters[prop] = setter;
        }
      }
    
      // Set All Computed Properties
      for(var propName in computed) {
        setComputedProperty(propName);
      }
    }
    
    function Observer(instance) {
      // Associated Moon Instance
      this.instance = instance;
    
      // Computed Property Cache
      this.cache = {};
    
      // Computed Property Setters
      this.setters = {};
    
      // Set of events to clear cache when dependencies change
      this.clear = {};
    
      // Property Currently Being Observed for Dependencies
      this.target = null;
    
      // Dependency Map
      this.map = {};
    }
    
    Observer.prototype.observe = function(key) {
      var self = this;
      this.clear[key] = function() {
        self.cache[key] = undefined;
      }
    }
    
    Observer.prototype.notify = function(key, val) {
      var self = this;
    
      var depMap = null;
      if((depMap = this.map[key]) !== undefined) {
        for(var i = 0; i < depMap.length; i++) {
          self.notify(depMap[i]);
        }
      }
    
      var clear = null;
      if((clear = this.clear[key]) !== undefined) {
        clear();
      }
    }
    
    
    /* ======= Global Utilities ======= */
    
    var hashRE = /\[(\w+)\]/g;
    var newLineRE = /\n/g;
    var doubleQuoteRE = /"/g;
    var HTMLEscapeRE = /&(?:lt|gt|quot|amp);/;
    var escapeRE = /(?:(?:&(?:lt|gt|quot|amp);)|"|\\|\n)/g;
    var escapeMap = {
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": "\\\"",
      "&amp;": "&",
      "\\": "\\\\",
      "\"": "\\\"",
      "\n": "\\n"
    }
    
    /**
     * Logs a Message
     * @param {String} msg
     */
    var log = function(msg) {
      if(Moon.config.silent === false) {
        console.log(msg);
      }
    }
    
    /**
     * Throws an Error
     * @param {String} msg
     */
    var error = function(msg) {
      if(Moon.config.silent === false) {
        console.error("[Moon] ERROR: " + msg);
      }
    }
    
    /**
     * Adds DOM Updates to Queue
     * @param {Object} instance
     */
    var queueBuild = function(instance) {
      if(instance.$queued === false && instance.$destroyed === false) {
        instance.$queued = true;
        setTimeout(function() {
          instance.build();
          callHook(instance, 'updated');
          instance.$queued = false;
        }, 0);
      }
    }
    
    /**
     * Resolves an Object Keypath and Sets it
     * @param {Object} instance
     * @param {Object} obj
     * @param {String} keypath
     * @param {String} val
     * @return {Object} resolved object
     */
    var resolveKeyPath = function(instance, obj, keypath, val) {
      keypath = keypath.replace(hashRE, '.$1');
      var path = keypath.split(".");
      var i = 0;
      for(; i < path.length - 1; i++) {
        var propName = path[i];
        obj = obj[propName];
      }
      obj[path[i]] = val;
      return path[0];
    }
    
    /**
     * Calls a Hook
     * @param {Object} instance
     * @param {String} name
     */
    var callHook = function(instance, name) {
      var hook = instance.$hooks[name];
      if(hook !== undefined) {
        hook.call(instance);
      }
    }
    
    /**
     * Extracts the Slots From Component Children
     * @param {Array} children
     * @return {Object} extracted slots
     */
    var getSlots = function(children) {
      var slots = {};
    
      // Setup default slots
      var defaultSlotName = "default";
      slots[defaultSlotName] = [];
    
      // No Children Means No Slots
      if(children.length === 0) {
        return slots;
      }
    
      // Get rest of the slots
      for(var i = 0; i < children.length; i++) {
        var child = children[i];
        var childProps = child.props.attrs;
        var slotName = "";
        var slotValue = null;
    
        if((slotName = childProps.slot) !== undefined) {
          slotValue = slots[slotName];
          if(slotValue === undefined) {
            slots[slotName] = [child];
          } else {
            slotValue.push(child);
          }
          delete childProps.slot;
        } else {
          slots[defaultSlotName].push(child);
        }
      }
    
      return slots;
    }
    
    /**
     * Extends an Object with another Object's properties
     * @param {Object} parent
     * @param {Object} child
     * @return {Object} Extended Parent
     */
    var extend = function(parent, child) {
      for(var key in child) {
        parent[key] = child[key];
      }
    
      return parent;
    }
    
    /**
     * Defines a Property on an Object or a Default Value
     * @param {Object} obj
     * @param {String} prop
     * @param {Any} value
     * @param {Any} def
     */
    var defineProperty = function(obj, prop, value, def) {
      if(value === undefined) {
        obj[prop] = def;
      } else {
        obj[prop] = value;
      }
    }
    
    /**
     * Escapes a String
     * @param {String} str
     */
    var escapeString = function(str) {
      return str.replace(escapeRE, function(match) {
        return escapeMap[match];
      });
    }
    
    /**
     * Does No Operation
     */
    var noop = function() {
    
    }
    
    /**
     * Converts attributes into key-value pairs
     * @param {Node} node
     * @return {Object} Key-Value pairs of Attributes
     */
    var extractAttrs = function(node) {
      var attrs = {};
      for(var rawAttrs = node.attributes, i = rawAttrs.length; i--;) {
        attrs[rawAttrs[i].name] = rawAttrs[i].value;
      }
      return attrs;
    }
    
    /**
     * Adds metadata Event Listeners to an Element
     * @param {Object} node
     * @param {Object} eventListeners
     */
    var addEventListeners = function(node, eventListeners) {
      var addHandler = function(type) {
        // Create handle function
        var handle = function(evt) {
          var handlers = handle.handlers;
          for(var i = 0; i < handlers.length; i++) {
            handlers[i](evt);
          }
        }
    
        // Add handlers to handle
        handle.handlers = eventListeners[type];
    
        // Add handler to vnode
        eventListeners[type] = handle;
    
        // Add event listener
        node.addEventListener(type, handle);
      }
    
      for(var type in eventListeners) {
        addHandler(type);
      }
    }
    
    /**
     * Creates DOM Node from VNode
     * @param {Object} vnode
     * @return {Object} DOM Node
     */
    var createNodeFromVNode = function(vnode) {
      var el = null;
    
      if(vnode.type === "#text") {
        // Create textnode
        el = document.createTextNode(vnode.val);
      } else {
        el = vnode.meta.isSVG ? document.createElementNS("http://www.w3.org/2000/svg", vnode.type) : document.createElement(vnode.type);
        // Optimization: VNode only has one child that is text, and create it here
        if(vnode.children.length === 1 && vnode.children[0].type === "#text") {
          el.textContent = vnode.children[0].val;
          vnode.children[0].meta.el = el.firstChild;
        } else {
          // Add all children
          for(var i = 0; i < vnode.children.length; i++) {
            var vchild = vnode.children[i];
            appendChild(createNodeFromVNode(vchild), vchild, el);
          }
        }
        // Add all event listeners
        var eventListeners = null;
        if((eventListeners = vnode.meta.eventListeners) !== undefined) {
          addEventListeners(el, eventListeners);
        }
      }
    
      // Setup Props
      diffProps(el, {}, vnode, vnode.props.attrs);
    
      // Hydrate
      vnode.meta.el = el;
    
      return el;
    }
    
    /**
     * Appends a Child, Ensuring Components are Mounted
     * @param {Object} node
     * @param {Object} vnode
     * @param {Object} parent
     */
    var appendChild = function(node, vnode, parent) {
      // Remove the node
      parent.appendChild(node);
    
      // Check for Component
      var component = null;
      if((component = vnode.meta.component) !== undefined) {
        createComponentFromVNode(node, vnode, component);
      }
    }
    
    /**
     * Removes a Child, Ensuring Components are Unmounted
     * @param {Object} node
     * @param {Object} parent
     */
    var removeChild = function(node, parent) {
      // Check for Component
      var componentInstance = null;
      if((componentInstance = node.__moon__) !== undefined) {
        // Component was unmounted, destroy it here
        componentInstance.destroy();
      }
    
      // Remove the Node
      parent.removeChild(node);
    }
    
    /**
     * Replaces a Child, Ensuring Components are Unmounted/Mounted
     * @param {Object} oldNode
     * @param {Object} newNode
     * @param {Object} vnode
     * @param {Object} parent
     */
    var replaceChild = function(oldNode, newNode, vnode, parent) {
      // Check for Component
      var componentInstance = null;
      if((componentInstance = oldNode.__moon__) !== undefined) {
        // Component was unmounted, destroy it here
        componentInstance.destroy();
      }
    
      // Replace It
      parent.replaceChild(newNode, oldNode);
    
      // Check for Component
      var component = null;
      if((component = vnode.meta.component) !== undefined) {
        createComponentFromVNode(newNode, vnode, component);
      }
    }
    
    /**
     * Text VNode/Node Type
     */
    var TEXT_TYPE = "#text";
    
    /**
     * Patch Types
     */
    var PATCH = {
      SKIP: 0,
      APPEND: 1,
      REMOVE: 2,
      REPLACE: 3,
      TEXT: 4,
      CHILDREN: 5
    }
    
    /**
     * Gives Default Metadata for a VNode
     * @return {Object} metadata
     */
    var defaultMetadata = function() {
      return {
        shouldRender: false
      }
    }
    
    /**
     * Adds an Event Listener to a VNode
     * @param {String} name
     * @param {String} handler
     * @return {Object} vnode
     */
    var addEventListenerCodeToVNode = function(name, handler, vnode) {
      var meta = vnode.meta;
      var eventListeners = meta.eventListeners;
      if(eventListeners === undefined) {
        eventListeners = meta.eventListeners = {};
      }
      var eventHandlers = eventListeners[name];
      if(eventHandlers === undefined) {
        eventListeners[name] = [handler];
      } else {
        eventHandlers.push(handler);
      }
    }
    
    /**
     * Creates a Virtual DOM Node
     * @param {String} type
     * @param {String} val
     * @param {Object} props
     * @param {Object} meta
     * @param {Array} children
     * @return {Object} Virtual DOM Node
     */
    var createElement = function(type, val, props, meta, children) {
      return {
        type: type,
        val: val,
        props: props,
        children: children,
        meta: meta || defaultMetadata()
      };
    }
    
    /**
     * Creates a Functional Component
     * @param {Object} props
     * @param {Array} children
     * @param {Object} functionalComponent
     * @return {Object} Virtual DOM Node
     */
    var createFunctionalComponent = function(props, children, functionalComponent) {
      var options = functionalComponent.options;
      var attrs = props.attrs;
      var data = options.data;
    
      if(data === undefined) {
        data = {};
      }
    
      // Merge data with provided props
      var propNames = options.props;
      if(propNames === undefined) {
        data = attrs;
      } else {
        for(var i = 0; i < propNames.length; i++) {
          var prop = propNames[i];
          data[prop] = attrs[prop];
        }
      }
    
      // Call render function
      return functionalComponent.options.render(m, {
        data: data,
        slots: getSlots(children)
      });
    }
    
    /**
     * Compiles Arguments to a VNode
     * @param {String} tag
     * @param {Object} attrs
     * @param {Object} meta
     * @param {Object|String} children
     * @return {Object} Object usable in Virtual DOM (VNode)
     */
    var m = function(tag, attrs, meta, children) {
      var component = null;
    
      if(tag === TEXT_TYPE) {
        // Text Node
        // Tag => #text
        // Attrs => meta
        // Meta => val
        return createElement(TEXT_TYPE, meta, {attrs:{}}, attrs, []);
      } else if((component = components[tag]) !== undefined) {
        // Resolve Component
        if(component.options.functional === true) {
          return createFunctionalComponent(attrs, children, component);
        } else {
          meta.component = component;
        }
      }
    
      return createElement(tag, "", attrs, meta, children);
    
      // In the end, we have a VNode structure like:
      // {
      //  type: 'h1', <= nodename
      //  props: {
      //    attrs: {'id': 'someId'}, <= regular attributes
      //    dom: {'textContent': 'some text content'} <= only for DOM properties added by directives,
      //    directives: {'m-mask': ''} <= any directives
      //  },
      //  meta: {}, <= metadata used internally
      //  children: [], <= any child nodes
      // }
    };
    
    /**
     * Mounts a Component To The DOM
     * @param {Object} node
     * @param {Object} vnode
     * @param {Object} component
     * @return {Object} DOM Node
     */
    var createComponentFromVNode = function(node, vnode, component) {
      var componentInstance = new component.CTor();
      var props = componentInstance.$props;
      var data = componentInstance.$data;
      var attrs = vnode.props.attrs;
    
      // Merge data with provided props
      for(var i = 0; i < props.length; i++) {
        var prop = props[i];
        data[prop] = attrs[prop];
      }
    
      // Check for events
      var eventListeners = vnode.meta.eventListeners;
      if(eventListeners !== undefined) {
        extend(componentInstance.$events, eventListeners);
      }
    
      componentInstance.$slots = getSlots(vnode.children);
      componentInstance.$el = node;
      componentInstance.build();
      callHook(componentInstance, 'mounted');
    
      // Rehydrate
      vnode.meta.el = componentInstance.$el;
    
      return componentInstance.$el;
    }
    
    /**
     * Diffs Event Listeners of Two VNodes
     * @param {Object} node
     * @param {Object} eventListeners
     * @param {Object} oldEventListeners
     */
    var diffEventListeners = function(node, eventListeners, oldEventListeners) {
      for(var type in eventListeners) {
        var oldEventListener = oldEventListeners[type];
        if(oldEventListener === undefined) {
          node.removeEventListener(type, oldEventListener);
        } else {
          oldEventListeners[type].handlers = eventListeners[type];
        }
      }
    }
    
    /**
     * Diffs Props of Node and a VNode, and apply Changes
     * @param {Object} node
     * @param {Object} nodeProps
     * @param {Object} vnode
     */
    var diffProps = function(node, nodeProps, vnode) {
      // Get VNode Attributes
      var vnodeProps = vnode.props.attrs;
    
      // Diff VNode Props with Node Props
      for(var vnodePropName in vnodeProps) {
        var vnodePropValue = vnodeProps[vnodePropName];
        var nodePropValue = nodeProps[vnodePropName];
    
        if((vnodePropValue !== undefined && vnodePropValue !== false && vnodePropValue !== null) && ((nodePropValue === undefined || nodePropValue === false || nodePropValue === null) || vnodePropValue !== nodePropValue)) {
          if(vnodePropName.length === 10 && vnodePropName === "xlink:href") {
            node.setAttributeNS('http://www.w3.org/1999/xlink', "href", vnodePropValue);
          } else {
            node.setAttribute(vnodePropName, vnodePropValue === true ? '' : vnodePropValue);
          }
        }
      }
    
      // Diff Node Props with VNode Props
      for(var nodePropName in nodeProps) {
        var vnodePropValue$1 = vnodeProps[nodePropName];
        if(vnodePropValue$1 === undefined || vnodePropValue$1 === false || vnodePropValue$1 === null) {
          node.removeAttribute(nodePropName);
        }
      }
    
      // Execute any directives
      var vnodeDirectives = null;
      if((vnodeDirectives = vnode.props.directives) !== undefined) {
        for(var directive in vnodeDirectives) {
          var directiveFn = null;
          if((directiveFn = directives[directive]) !== undefined) {
            directiveFn(node, vnodeDirectives[directive], vnode);
          }
        }
      }
    
      // Add/Update any DOM Props
      var dom = null;
      if((dom = vnode.props.dom) !== undefined) {
        for(var domProp in dom) {
          var domPropValue = dom[domProp];
          if(node[domProp] !== domPropValue) {
            node[domProp] = domPropValue;
          }
        }
      }
    }
    
    /**
     * Diffs a Component
     * @param {Object} node
     * @param {Object} vnode
     * @return {Object} adjusted node only if it was replaced
     */
    var diffComponent = function(node, vnode) {
      if(node.__moon__ === undefined) {
        // Not mounted, create a new instance and mount it here
        createComponentFromVNode(node, vnode, vnode.meta.component);
      } else {
        // Mounted already, need to update
        var componentInstance = node.__moon__;
        var componentChanged = false;
    
        // Merge any properties that changed
        var props = componentInstance.$props;
        var data = componentInstance.$data;
        var attrs = vnode.props.attrs;
        for(var i = 0; i < props.length; i++) {
          var prop = props[i];
          if(data[prop] !== attrs[prop]) {
            data[prop] = attrs[prop];
            componentChanged = true;
          }
        }
    
        // If it has children, resolve any new slots
        if(vnode.children.length !== 0) {
          componentInstance.$slots = getSlots(vnode.children);
          componentChanged = true;
        }
    
        // If any changes were detected, build the component
        if(componentChanged === true) {
          componentInstance.build();
        }
      }
    }
    
    /**
     * Hydrates Node and a VNode
     * @param {Object} node
     * @param {Object} vnode
     * @param {Object} parent
     * @return {Object} adjusted node only if it was replaced
     */
    var hydrate = function(node, vnode, parent) {
      var nodeName = node !== null ? node.nodeName.toLowerCase() : null;
    
      if(node === null) {
        // No node, create one
        var newNode = createNodeFromVNode(vnode);
        appendChild(newNode, vnode, parent);
    
        return newNode;
      } else if(vnode === null) {
        removeChild(node, parent);
    
        return null;
      } else if(nodeName !== vnode.type) {
        var newNode$1 = createNodeFromVNode(vnode);
        replaceChild(node, newNode$1, vnode, parent);
        return newNode$1;
      } else if(vnode.type === TEXT_TYPE) {
        if(nodeName === TEXT_TYPE) {
          // Both are textnodes, update the node
          if(node.textContent !== vnode.val) {
            node.textContent = vnode.val;
          }
    
          // Hydrate
          vnode.meta.el = node;
        } else {
          // Node isn't text, replace with one
          replaceChild(node, createNodeFromVNode(vnode), vnode, parent);
        }
    
        return node;
      } else {
        // Hydrate
        vnode.meta.el = node;
    
        // Check for Component
        if(vnode.meta.component !== undefined) {
          // Diff the Component
          diffComponent(node, vnode);
    
          // Skip diffing any children
          return node;
        }
    
        // Diff props
        diffProps(node, extractAttrs(node), vnode);
    
        // Add event listeners
        var eventListeners = null;
        if((eventListeners = vnode.meta.eventListeners) !== undefined) {
          addEventListeners(node, eventListeners);
        }
    
        // Check if innerHTML was changed, and don't diff children if so
        var domProps = vnode.props.dom;
        if(domProps !== undefined && domProps.innerHTML !== undefined) {
          return node;
        }
    
        // Hydrate Children
        var children = vnode.children;
        var length = children.length;
    
        var i = 0;
        var currentChildNode = node.firstChild;
        var vchild = length !== 0 ? children[0] : null;
    
        while(vchild !== null || currentChildNode !== null) {
          var next = currentChildNode !== null ? currentChildNode.nextSibling : null;
          hydrate(currentChildNode, vchild, node);
          vchild = ++i < length ? children[i] : null;
          currentChildNode = next;
        }
    
        return node;
      }
    }
    
    /**
     * Diffs VNodes, and applies Changes
     * @param {Object} oldVNode
     * @param {Object} vnode
     * @param {Object} parent
     * @return {Number} patch type
     */
    var diff = function(oldVNode, vnode, parent) {
      if(oldVNode === null) {
        // No Node, append a node
        appendChild(createNodeFromVNode(vnode), vnode, parent);
    
        return PATCH.APPEND;
      } else if(vnode === null) {
        // No New VNode, remove Node
        removeChild(oldVNode.meta.el, parent);
    
        return PATCH.REMOVE;
      } else if(oldVNode === vnode) {
        // Both have the same reference, skip
        return PATCH.SKIP;
      } else if(oldVNode.type !== vnode.type) {
        // Different types, replace it
        replaceChild(oldVNode.meta.el, createNodeFromVNode(vnode), vnode, parent);
    
        return PATCH.REPLACE;
      } else if(vnode.meta.shouldRender === true && vnode.type === TEXT_TYPE) {
        var node = oldVNode.meta.el;
    
        if(oldVNode.type === TEXT_TYPE) {
          // Both are textnodes, update the node
          if(vnode.val !== oldVNode.val) {
            node.textContent = vnode.val;
          }
    
          return PATCH.TEXT;
        } else {
          // Node isn't text, replace with one
          replaceChild(node, createNodeFromVNode(vnode), vnode, parent);
          return PATCH.REPLACE;
        }
    
      } else if(vnode.meta.shouldRender === true) {
        var node$1 = oldVNode.meta.el;
    
        // Check for Component
        if(vnode.meta.component !== undefined) {
          // Diff Component
          diffComponent(node$1, vnode);
    
          // Skip diffing any children
          return PATCH.SKIP;
        }
    
        // Diff props
        diffProps(node$1, oldVNode.props.attrs, vnode);
        oldVNode.props.attrs = vnode.props.attrs;
    
        // Diff event listeners
        var eventListeners = null;
        if((eventListeners = vnode.meta.eventListeners) !== undefined) {
          diffEventListeners(node$1, eventListeners, oldVNode.meta.eventListeners);
        }
    
        // Check if innerHTML was changed, don't diff children
        var domProps = vnode.props.dom;
        if(domProps !== undefined && domProps.innerHTML !== undefined) {
          // Skip Children
          return PATCH.SKIP;
        }
    
        // Diff Children
        var children = vnode.children;
        var oldChildren = oldVNode.children;
        var newLength = children.length;
        var oldLength = oldChildren.length;
    
        if(newLength === 0) {
          // No Children, Remove all Children if not Already Removed
          if(oldLength !== 0) {
            var firstChild = null;
            while((firstChild = node$1.firstChild) !== null) {
              removeChild(firstChild, node$1);
            }
            oldVNode.children = [];
          }
        } else {
          // Traverse and Diff Children
          var totalLen = newLength > oldLength ? newLength : oldLength;
          for(var i = 0, j = 0; i < totalLen; i++, j++) {
            var oldChild = j < oldLength ? oldChildren[j] : null;
            var child = i < newLength ? children[i] : null;
    
            var action = diff(oldChild, child, node$1);
    
            // Update Children to Match Action
            switch (action) {
              case PATCH.APPEND:
                oldChildren[oldLength++] = child;
                break;
              case PATCH.REMOVE:
                oldChildren.splice(j--, 1);
                oldLength--;
                break;
              case PATCH.REPLACE:
                oldChildren[j] = children[i];
                break;
              case PATCH.TEXT:
                oldChild.val = child.val;
                break;
            }
          }
        }
    
        return PATCH.CHILDREN;
      } else {
        // Nothing Changed, Rehydrate and Exit
        vnode.meta.el = oldVNode.meta.el;
        return PATCH.SKIP;
      }
    }
    
    
    /* ======= Compiler ======= */
    var openRE = /\{\{/;
    var closeRE = /\s*\}\}/;
    var whitespaceRE = /\s/;
    var expressionRE = /"[^"]*"|'[^']*'|\.\w*[a-zA-Z$_]\w*|\w*[a-zA-Z$_]\w*:|(\w*[a-zA-Z$_]\w*)/g;
    var globals = ['true', 'false', 'undefined', 'null', 'NaN', 'typeof', 'in'];
    
    /**
     * Compiles a Template
     * @param {String} template
     * @param {Array} dependencies
     * @param {Boolean} isString
     * @return {String} compiled template
     */
    var compileTemplate = function(template, dependencies, isString) {
      var state = {
        current: 0,
        template: template,
        output: "",
        dependencies: dependencies
      };
    
      compileTemplateState(state, isString);
    
      return state.output;
    }
    
    var compileTemplateState = function(state, isString) {
      var template = state.template;
      var length = template.length;
      while(state.current < length) {
        // Match Text Between Templates
        var value = scanTemplateStateUntil(state, openRE);
    
        if(value.length !== 0) {
          state.output += escapeString(value);
        }
    
        // If we've reached the end, there are no more templates
        if(state.current === length) {
          break;
        }
    
        // Exit Opening Delimiter
        state.current += 2;
    
        // Consume whitespace
        scanTemplateStateForWhitespace(state);
    
        // Get the name of the opening tag
        var name = scanTemplateStateUntil(state, closeRE);
    
        // If we've reached the end, the tag was unclosed
        if(state.current === length) {
          if("development" !== "production") {
            error(("Expected closing delimiter \"}}\" after \"" + name + "\""));
          }
          break;
        }
    
        if(name.length !== 0) {
          // Extract Variable References
          compileTemplateExpression(name, state.dependencies);
    
          // Add quotes if string
          if(isString) {
            name = "\" + " + name + " + \"";
          }
    
          // Generate code
          state.output += name;
        }
    
        // Consume whitespace
        scanTemplateStateForWhitespace(state);
    
        // Exit closing delimiter
        state.current += 2;
      }
    }
    
    var compileTemplateExpression = function(expr, dependencies) {
      expr.replace(expressionRE, function(match, reference) {
        if(reference !== undefined && dependencies.indexOf(reference) === -1 && globals.indexOf(reference) === -1) {
          dependencies.push(reference);
        }
      });
    
      return dependencies;
    }
    
    var scanTemplateStateUntil = function(state, re) {
      var template = state.template;
      var tail = template.substring(state.current);
      var length = tail.length;
      var idx = tail.search(re);
    
      var match = "";
    
      switch (idx) {
        case -1:
          match = tail;
          break;
        case 0:
          match = '';
          break;
        default:
          match = tail.substring(0, idx);
      }
    
      state.current += match.length;
    
      return match;
    }
    
    var scanTemplateStateForWhitespace = function(state) {
      var template = state.template;
      var char = template[state.current];
      while(whitespaceRE.test(char)) {
        char = template[++state.current];
      }
    }
    
    var tagOrCommentStartRE = /<\/?(?:[A-Za-z]+\w*)|<!--/;
    
    var lex = function(input) {
      var state = {
        input: input,
        current: 0,
        tokens: []
      }
      lexState(state);
      return state.tokens;
    }
    
    var lexState = function(state) {
      var input = state.input;
      var len = input.length;
      while(state.current < len) {
        // Check if it is text
        if(input.charAt(state.current) !== "<") {
          lexText(state);
          continue;
        }
    
        // Check if it is a comment
        if(input.substr(state.current, 4) === "<!--") {
          lexComment(state);
          continue;
        }
    
        // It's a tag
        lexTag(state);
      }
    }
    
    var lexText = function(state) {
      var current = state.current;
      var input = state.input;
      var len = input.length;
    
      var endOfText = input.substring(current).search(tagOrCommentStartRE);
    
      if(endOfText === -1) {
        // Only Text
        state.tokens.push({
          type: "text",
          value: input.slice(current)
        });
        state.current = len;
        return;
      } else if(endOfText !== 0) {
        // End of Text Found
        endOfText += current;
        state.tokens.push({
          type: "text",
          value: input.slice(current, endOfText)
        });
        state.current = endOfText;
      }
    }
    
    var lexComment = function(state) {
      var current = state.current;
      var input = state.input;
      var len = input.length;
    
      current += 4;
    
      var endOfComment = input.indexOf("-->", current);
    
      if(endOfComment === -1) {
        // Only an unclosed comment
        state.tokens.push({
          type: "comment",
          value: input.slice(current)
        });
        state.current = len;
      } else {
        // End of Comment Found
        state.tokens.push({
          type: "comment",
          value: input.slice(current, endOfComment)
        });
        state.current = endOfComment + 3;
      }
    }
    
    var lexTag = function(state) {
      var input = state.input;
      var len = input.length;
    
      // Lex Starting of Tag
      var isClosingStart = input.charAt(state.current + 1) === "/";
      state.current += isClosingStart === true ? 2 : 1;
    
      // Lex type and attributes
      var tagToken = lexTagType(state);
      lexAttributes(tagToken, state);
    
      // Lex ending tag
      var isClosingEnd = input.charAt(state.current) === "/";
      state.current += isClosingEnd === true ? 2 : 1;
    
      // Check if Closing Start
      if(isClosingStart === true) {
        tagToken.closeStart = true;
      }
    
      // Check if Closing End
      if(isClosingEnd === true) {
        tagToken.closeEnd = true;
      }
    }
    
    var lexTagType = function(state) {
      var input = state.input;
      var len = input.length;
      var current = state.current;
      var tagType = "";
      while(current < len) {
        var char = input.charAt(current);
        if((char === "/") || (char === ">") || (char === " ")) {
          break;
        } else {
          tagType += char;
        }
        current++;
      }
    
      var tagToken = {
        type: "tag",
        value: tagType
      };
    
      state.tokens.push(tagToken);
    
      state.current = current;
      return tagToken;
    }
    
    var lexAttributes = function(tagToken, state) {
      var input = state.input;
      var len = input.length;
      var current = state.current;
      var char = input.charAt(current);
      var nextChar = input.charAt(current + 1);
    
      var incrementChar = function() {
        current++;
        char = input.charAt(current);
        nextChar = input.charAt(current + 1);
      }
    
      var attributes = {};
    
      while(current < len) {
        // If it is the end of a tag, exit
        if((char === ">") || (char === "/" && nextChar === ">")) {
          break;
        }
    
        // If there is a space, skip
        if(char === " ") {
          incrementChar();
          continue;
        }
    
        // Get the name of the attribute
        var attrName = "";
        var noValue = false;
    
        while(current < len && char !== "=") {
          if((char === " ") || (char === ">") || (char === "/" && nextChar === ">")) {
            noValue = true;
            break;
          } else {
            attrName += char;
          }
          incrementChar();
        }
    
        var attrValue = {
          name: attrName,
          value: "",
          meta: {}
        }
    
        if(noValue === true) {
          attributes[attrName] = attrValue;
          continue;
        }
    
        // Exit Equal Sign
        incrementChar();
    
        // Get the type of quote used
        var quoteType = " ";
        if(char === "'" || char === "\"") {
          quoteType = char;
    
          // Exit the quote
          incrementChar();
        }
    
        // Find the end of it
        while(current < len && char !== quoteType) {
          attrValue.value += char;
          incrementChar();
        }
    
        // Exit the end of it
        incrementChar();
    
        // Check for an Argument
        var argIndex = attrName.indexOf(":");
        if(argIndex !== -1) {
          var splitAttrName = attrName.split(":");
          attrValue.name = splitAttrName[0];
          attrValue.meta.arg = splitAttrName[1];
        }
    
        // Setup the Value
        attributes[attrName] = attrValue;
      }
    
      state.current = current;
      tagToken.attributes = attributes;
    }
    
    var parse = function(tokens) {
      var root = {
        type: "ROOT",
        children: []
      }
    
      var state = {
        current: 0,
        tokens: tokens
      }
    
      while(state.current < tokens.length) {
        var child = parseWalk(state);
        if(child) {
          root.children.push(child);
        }
      }
    
      return root;
    }
    
    var VOID_ELEMENTS = ["area","base","br","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];
    var SVG_ELEMENTS = ["svg","animate","circle","clippath","cursor","defs","desc","ellipse","filter","font-face","foreignObject","g","glyph","image","line","marker","mask","missing-glyph","path","pattern","polygon","polyline","rect","switch","symbol","text","textpath","tspan","use","view"];
    
    var createParseNode = function(type, props, children) {
      return {
        type: type,
        props: props,
        children: children
      }
    }
    
    var parseWalk = function(state) {
      var token = state.tokens[state.current];
      var previousToken = state.tokens[state.current - 1];
      var nextToken = state.tokens[state.current + 1];
    
      var move = function(num) {
        state.current += num === undefined ? 1 : num;
        token = state.tokens[state.current];
        previousToken = state.tokens[state.current - 1];
        nextToken = state.tokens[state.current + 1];
      }
    
      if(token.type === "text") {
        move();
        return previousToken.value;
      }
    
      if(token.type === "comment") {
        move();
        return null;
      }
    
      // Start of new Tag
      if(token.type === "tag") {
        var tagType = token.value;
        var closeStart = token.closeStart;
        var closeEnd = token.closeEnd;
    
        var isSVGElement = SVG_ELEMENTS.indexOf(tagType) !== -1;
        var isVoidElement = VOID_ELEMENTS.indexOf(tagType) !== -1 || closeEnd === true;
    
        var node = createParseNode(tagType, token.attributes, []);
    
        move();
    
        // If it is an svg element, let code generator know
        if(isSVGElement) {
          node.isSVG = true;
        }
    
        if(isVoidElement === true) {
          // Self closing, don't process further
          return node;
        } else if(closeStart === true) {
          // Unmatched closing tag on non void element
          if("development" !== "production") {
            error(("Could not locate opening tag for the element \"" + (node.type) + "\""));
          }
          return null;
        } else if(token !== undefined) {
          // Match all children
          var current = state.current;
          while((token.type !== "tag") || ((token.type === "tag") && ((token.closeStart === undefined && token.closeEnd === undefined) || (token.value !== tagType)))) {
            var parsedChildState = parseWalk(state);
            if(parsedChildState !== null) {
              node.children.push(parsedChildState);
            }
    
            move(0);
    
            if(token === undefined) {
              // No token means a tag was most likely left unclosed
              if("development" !== "production") {
                error(("The element \"" + (node.type) + "\" was left unclosed"));
              }
              break;
            }
          }
    
          move();
        }
    
        return node;
      }
    
      move();
      return;
    }
    
    var generateProps = function(node, parent, state) {
    	var props = node.props;
    	node.props = {
    		attrs: props
    	}
    
    	var hasDirectives = false;
    	var directiveProps = [];
    
    	var hasSpecialDirectivesAfter = false;
    	var specialDirectivesAfter = {};
    
    	var propKey = null;
    	var specialDirective = null;
    
    	var propsCode = "{attrs: {";
    
    	var beforeGenerate = null;
    	for(propKey in props) {
    		var prop = props[propKey];
    		var name = prop.name;
    		if((specialDirective = specialDirectives[name]) !== undefined && (beforeGenerate = specialDirective.beforeGenerate) !== undefined) {
    			beforeGenerate(prop, node, parent, state);
    		}
    	}
    
    	var afterGenerate = null;
    	var duringPropGenerate = null;
    	for(propKey in props) {
    		var prop$1 = props[propKey];
    		var name$1 = prop$1.name;
    
    		if((specialDirective = specialDirectives[name$1]) !== undefined) {
    			if((afterGenerate = specialDirective.afterGenerate) !== undefined) {
    				specialDirectivesAfter[name$1] = {
    					prop: prop$1,
    					afterGenerate: afterGenerate
    				};
    
    				hasSpecialDirectivesAfter = true;
    			}
    
    			if((duringPropGenerate = specialDirective.duringPropGenerate) !== undefined) {
    				propsCode += duringPropGenerate(prop$1, node, state);
    			}
    
    			node.meta.shouldRender = true;
    		} else if(name$1[0] === "m" && name$1[1] === "-") {
    			directiveProps.push(prop$1);
    			hasDirectives = true;
    			node.meta.shouldRender = true;
    		} else {
    			var value = prop$1.value;
    			var compiled = compileTemplate(value, state.dependencies, true);
    
    			if(value !== compiled) {
    				node.meta.shouldRender = true;
    			}
    
    			if(state.hasAttrs === false) {
    				state.hasAttrs = true;
    			}
    
    			propsCode += "\"" + propKey + "\": \"" + compiled + "\", ";
    		}
    	}
    
    	if(state.hasAttrs === true) {
    		propsCode = propsCode.substring(0, propsCode.length - 2) + "}";
    		state.hasAttrs = false;
    	} else {
    		propsCode += "}";
    	}
    
    	if(hasDirectives === true) {
    		propsCode += ", directives: {";
    
    		var directiveProp = null;
    		var directivePropValue = null;
    		for(var i = 0; i < directiveProps.length; i++) {
    			directiveProp = directiveProps[i];
    			directivePropValue = directiveProp.value;
    
    			compileTemplateExpression(directivePropValue, state.dependencies);
    			propsCode += "\"" + (directiveProp.name) + "\": " + (directivePropValue.length === 0 ? "\"\"" : directivePropValue) + ", ";
    		}
    
    		propsCode = propsCode.substring(0, propsCode.length - 2) + "}";
    	}
    
    	if(hasSpecialDirectivesAfter === true) {
    		state.specialDirectivesAfter = specialDirectivesAfter;
    	}
    
    	var domProps = node.props.dom;
    	if(domProps !== undefined) {
    		propsCode += ", dom: {";
    
    		for(var domProp in domProps) {
    			propsCode += "\"" + domProp + "\": " + (domProps[domProp]) + ", ";
    		}
    
    		propsCode = propsCode.substring(0, propsCode.length - 2) + "}";
    	}
    
    	propsCode += "}, ";
    
    	return propsCode;
    }
    
    var generateEventlisteners = function(eventListeners) {
    	var eventListenersCode = "\"eventListeners\": {";
    
    	for(var type in eventListeners) {
    		var handlers = eventListeners[type];
    		eventListenersCode += "\"" + type + "\": [";
    
    		for(var i = 0; i < handlers.length; i++) {
    			eventListenersCode += (handlers[i]) + ", ";
    		}
    
    		eventListenersCode = eventListenersCode.substring(0, eventListenersCode.length - 2) + "], ";
    	}
    
    	eventListenersCode = eventListenersCode.substring(0, eventListenersCode.length - 2) + "}, ";
    	return eventListenersCode;
    }
    
    var generateMeta = function(meta) {
    	var metaCode = "{";
    	for(var key in meta) {
    		if(key === "eventListeners") {
    			metaCode += generateEventlisteners(meta[key])
    		} else {
    			metaCode += "\"" + key + "\": " + (meta[key]) + ", ";
    		}
    	}
    
    	metaCode = metaCode.substring(0, metaCode.length - 2) + "}, ";
    	return metaCode;
    }
    
    var generateNode = function(node, parent, state) {
    	if(typeof node === "string") {
    		var compiled = compileTemplate(node, state.dependencies, true);
    		var meta = defaultMetadata();
    
    		if(node !== compiled) {
    			meta.shouldRender = true;
    			parent.meta.shouldRender = true;
    		}
    
    		return ("m(\"#text\", " + (generateMeta(meta)) + "\"" + compiled + "\")");
    	} else if(node.type === "slot") {
    		parent.meta.shouldRender = true;
    		parent.deep = true;
    
    		var slotName = node.props.name;
    		return ("instance.$slots[\"" + (slotName === undefined ? "default" : slotName.value) + "\"]");
    	} else {
    		var call = "m(\"" + (node.type) + "\", ";
    
    		var meta$1 = defaultMetadata();
    		node.meta = meta$1;
    
    		var propsCode = generateProps(node, parent, state);
    		var specialDirectivesAfter = state.specialDirectivesAfter;
    
    		if(specialDirectivesAfter !== null) {
    			state.specialDirectivesAfter = null;
    		}
    
    		var children = node.children;
    		var childrenLength = children.length;
    		var childrenCode = "[";
    
    		if(childrenLength === 0) {
    			childrenCode += "]";
    		} else {
    			for(var i = 0; i < children.length; i++) {
    				childrenCode += (generateNode(children[i], node, state)) + ", ";
    			}
    			childrenCode = childrenCode.substring(0, childrenCode.length - 2) + "]";
    		}
    
    		if(node.deep === true) {
    			childrenCode = "[].concat.apply([], " + childrenCode + ")";
    		}
    
    		if(node.meta.shouldRender === true && parent !== undefined) {
    			parent.meta.shouldRender = true;
    		}
    
    		call += propsCode;
    		call += generateMeta(meta$1);
    		call += childrenCode;
    		call += ")";
    
    		if(specialDirectivesAfter !== null) {
    			var specialDirectiveAfter;
    			for(var specialDirectiveKey in specialDirectivesAfter) {
    				specialDirectiveAfter = specialDirectivesAfter[specialDirectiveKey];
    				call = specialDirectiveAfter.afterGenerate(specialDirectiveAfter.prop, call, node, state);
    			}
    		}
    
    		return call;
    	}
    }
    
    var generate = function(tree) {
    	var root = tree.children[0];
    
    	var state = {
    		hasAttrs: false,
    		specialDirectivesAfter: null,
    		dependencies: []
    	};
    
    	var rootCode = generateNode(root, undefined, state);
    
    	var dependencies = state.dependencies;
    	var dependenciesCode = "";
    
    	for(var i = 0; i < dependencies.length; i++) {
    		var dependency = dependencies[i];
    		dependenciesCode += "var " + dependency + " = instance.get(\"" + dependency + "\"); ";
    	}
    
    	var code = "var instance = this; " + dependenciesCode + "return " + rootCode + ";";
    
    	try {
        return new Function("m", code);
      } catch(e) {
        error("Could not create render function");
        return noop;
      }
    }
    
    var compile = function(template) {
      var tokens = lex(template);
      var ast = parse(tokens);
      return generate(ast);
    }
    
    
    function Moon(options) {
        /* ======= Initial Values ======= */
    
        // Options
        if(options === undefined) {
          options = {};
        }
        this.$options = options;
    
        // Readable name (component name or "root")
        defineProperty(this, "$name", options.name, "root");
    
        // Custom Data
        var data = options.data;
        if(data === undefined) {
          this.$data = {};
        } else if(typeof data === "function") {
          this.$data = data();
        } else {
          this.$data = data;
        }
    
        // Render function
        defineProperty(this, "$render", options.render, noop);
    
        // Hooks
        defineProperty(this, "$hooks", options.hooks, {});
    
        // Custom Methods
        var methods = options.methods;
        if(methods !== undefined) {
          initMethods(this, methods);
        }
    
        // Events
        this.$events = {};
    
        // Virtual DOM
        this.$dom = {};
    
        // Observer
        this.$observer = new Observer(this);
    
        // Destroyed State
        this.$destroyed = true;
    
        // State of Queue
        this.$queued = false;
    
        // Setup Computed Properties
        var computed = options.computed;
        if(computed !== undefined) {
          initComputed(this, computed);
        }
    
        /* ======= Initialize 🎉 ======= */
        this.init();
    }
    
    /* ======= Instance Methods ======= */
    
    /**
     * Gets Value in Data
     * @param {String} key
     * @return {String} Value of key in data
     */
    Moon.prototype.get = function(key) {
      // Collect dependencies if currently collecting
      var observer = this.$observer;
      var target = null;
      if((target = observer.target) !== null) {
        if(observer.map[key] === undefined) {
          observer.map[key] = [target];
        } else if(observer.map[key].indexOf(target) === -1) {
          observer.map[key].push(target);
        }
      }
    
      // Return value found
      if("development" !== "production" && !(key in this.$data)) {
        error(("The item \"" + key + "\" was not defined but was referenced"));
      }
      return this.$data[key];
    }
    
    /**
     * Sets Value in Data
     * @param {String} key
     * @param {Any} val
     */
    Moon.prototype.set = function(key, val) {
      // Get observer
      var observer = this.$observer;
    
      // Get base of keypath
      var base = resolveKeyPath(this, this.$data, key, val);
    
      // Invoke custom setter
      var setter = null;
      if((setter = observer.setters[base]) !== undefined) {
        setter.call(this, val);
      }
    
      // Notify observer of change
      observer.notify(base, val);
    
      // Queue a build
      queueBuild(this);
    }
    
    /**
     * Destroys Moon Instance
     */
    Moon.prototype.destroy = function() {
      // Remove event listeners
      this.off();
    
      // Remove reference to element
      this.$el = null;
    
      // Setup destroyed state
      this.$destroyed = true;
    
      // Call destroyed hook
      callHook(this, 'destroyed');
    }
    
    /**
     * Calls a method
     * @param {String} method
     * @return {Any} output of method
     */
    Moon.prototype.callMethod = function(method, args) {
      // Get arguments
      args = args || [];
    
      // Call method in context of instance
      return this.$data[method].apply(this, args);
    }
    
    // Event Emitter, adapted from https://github.com/KingPixil/voke
    
    /**
     * Attaches an Event Listener
     * @param {String} eventName
     * @param {Function} handler
     */
    Moon.prototype.on = function(eventName, handler) {
      // Get list of handlers
      var handlers = this.$events[eventName];
    
      if(handlers === undefined) {
        // If no handlers, create them
        this.$events[eventName] = [handler];
      } else {
        // If there are already handlers, add it to the list of them
        handlers.push(handler);
      }
    }
    
    /**
     * Removes an Event Listener
     * @param {String} eventName
     * @param {Function} handler
     */
    Moon.prototype.off = function(eventName, handler) {
      if(eventName === undefined) {
        // No event name provided, remove all events
        this.$events = {};
      } else if(handler === undefined) {
        // No handler provided, remove all handlers for the event name
        this.$events[eventName] = [];
      } else {
        // Get handlers from event name
        var handlers = this.$events[eventName];
    
        // Get index of the handler to remove
        var index = handlers.indexOf(handler);
    
        // Remove the handler
        handlers.splice(index, 1);
      }
    }
    
    /**
     * Emits an Event
     * @param {String} eventName
     * @param {Object} customMeta
     */
    Moon.prototype.emit = function(eventName, customMeta) {
      // Setup metadata to pass to event
      var meta = customMeta || {};
      meta.type = eventName;
    
      // Get handlers and global handlers
      var handlers = this.$events[eventName];
      var globalHandlers = this.$events["*"];
    
      // Counter
      var i = 0;
    
      // Call all handlers for the event name
      if(handlers !== undefined) {
        for(i = 0; i < handlers.length; i++) {
          handlers[i](meta);
        }
      }
    
      if(globalHandlers !== undefined) {
        // Call all of the global handlers if present
        for(i = 0; i < globalHandlers.length; i++) {
          globalHandlers[i](meta);
        }
      }
    }
    
    /**
     * Mounts Moon Element
     * @param {String|Object} el
     */
    Moon.prototype.mount = function(el) {
      // Get element from the DOM
      this.$el = typeof el === 'string' ? document.querySelector(el) : el;
    
      // Remove destroyed state
      this.$destroyed = false;
    
      if("development" !== "production" && this.$el === null) {
        // Element not found
        error("Element " + this.$options.el + " not found");
      }
    
      // Sync Element and Moon instance
      this.$el.__moon__ = this;
    
      // Setup template as provided `template` or outerHTML of the Element
      defineProperty(this, "$template", this.$options.template, this.$el.outerHTML);
    
      // Setup render Function
      if(this.$render === noop) {
        this.$render = Moon.compile(this.$template);
      }
    
      // Run First Build
      this.build();
    
      // Call mounted hook
      callHook(this, 'mounted');
    }
    
    /**
     * Renders Virtual DOM
     * @return {Object} Virtual DOM
     */
    Moon.prototype.render = function() {
      // Call render function
      return this.$render(m);
    }
    
    /**
     * Diff then Patches Nodes With Data
     * @param {Object} old
     * @param {Object} vnode
     * @param {Object} parent
     */
    Moon.prototype.patch = function(old, vnode, parent) {
      if(old.meta !== undefined) {
        // If it is a VNode, then diff
        if(vnode.type !== old.type) {
          // Root Element Changed During Diff
          // Replace Root Element
          var newRoot = createNodeFromVNode(vnode);
          replaceChild(old.meta.el, newRoot, vnode, parent);
    
          // Update Bound Instance
          newRoot.__moon__ = this;
          this.$el = newRoot;
        } else {
          // Diff
          diff(old, vnode, parent);
        }
    
      } else if(old instanceof Node) {
        // Hydrate
        var newNode = hydrate(old, vnode, parent);
    
        if(newNode !== old) {
          // Root Element Changed During Hydration
          this.$el = vnode.meta.el;
          this.$el.__moon__ = this;
        }
      }
    }
    
    /**
     * Render and Patches the DOM With Data
     */
    Moon.prototype.build = function() {
      // Get new virtual DOM
      var dom = this.render();
    
      // Old item to patch
      var old = null;
    
      if(this.$dom.meta !== undefined) {
        // If old virtual dom exists, patch against it
        old = this.$dom;
      } else {
        // No virtual DOM, patch with actual DOM element, and setup virtual DOM
        old = this.$el;
        this.$dom = dom;
      }
    
      // Patch old and new
      this.patch(old, dom, this.$el.parentNode);
    }
    
    /**
     * Initializes Moon
     */
    Moon.prototype.init = function() {
      log("======= Moon =======");
      callHook(this, 'init');
    
      var el = this.$options.el;
      if(el !== undefined) {
        this.mount(el);
      }
    }
    
    
    /* ======= Global API ======= */
    
    /**
     * Configuration of Moon
     */
    Moon.config = {
      silent: ("development" === "production") || (typeof console === 'undefined'),
      keyCodes: function(keyCodes) {
        extend(eventModifiers, keyCodes);
      }
    }
    
    /**
     * Version of Moon
     */
    Moon.version = '0.11.0';
    
    /**
     * Moon Utilities
     */
    Moon.util = {
      noop: noop,
      error: error,
      log: log,
      extend: extend,
      m: m
    }
    
    /**
     * Runs an external Plugin
     * @param {Object} plugin
     * @param {Object} options
     */
    Moon.use = function(plugin, options) {
      plugin.init(Moon, options);
    }
    
    /**
     * Compiles HTML to a Render Function
     * @param {String} template
     * @return {Function} render function
     */
    Moon.compile = function(template) {
      return compile(template);
    }
    
    /**
     * Runs a Task After Update Queue
     * @param {Function} task
     */
    Moon.nextTick = function(task) {
      setTimeout(task, 0);
    }
    
    /**
     * Creates a Directive
     * @param {String} name
     * @param {Function} action
     */
    Moon.directive = function(name, action) {
      directives["m-" + name] = action;
    }
    
    /**
     * Creates a Component
     * @param {String} name
     * @param {Object} options
     */
    Moon.component = function(name, options) {
      var Parent = this;
    
      if(options.name !== undefined) {
        name = options.name;
      } else {
        options.name = name;
      }
    
      if(options.data !== undefined && typeof options.data !== "function") {
        error("In components, data must be a function returning an object");
      }
    
      function MoonComponent() {
        Moon.call(this, options);
      }
    
      MoonComponent.prototype = Object.create(Parent.prototype);
      MoonComponent.prototype.constructor = MoonComponent;
    
      MoonComponent.prototype.init = function() {
        callHook(this, 'init');
    
        var options = this.$options;
        this.$destroyed = false;
        defineProperty(this, "$props", options.props, []);
    
        var template = options.template;
        this.$template = template;
    
        if(this.$render === noop) {
          this.$render = Moon.compile(template);
        }
      }
    
      components[name] = {
        CTor: MoonComponent,
        options: options
      };
    
      return MoonComponent;
    }
    
    /**
     * Renders a Class in Array/Object Form
     * @param {Array|Object|String} classNames
     * @return {String} renderedClassNames
     */
    Moon.renderClass = function(classNames) {
      if(typeof classNames === "string") {
        // If they are a string, no need for any more processing
        return classNames;
      }
    
      var renderedClassNames = "";
      if(Array.isArray(classNames)) {
        // It's an array, so go through them all and generate a string
        for(var i = 0; i < classNames.length; i++) {
          renderedClassNames += (Moon.renderClass(classNames[i])) + " ";
        }
      } else if(typeof classNames === "object") {
        // It's an object, so to through and render them to a string if the corresponding condition is truthy
        for(var className in classNames) {
          if(classNames[className]) {
            renderedClassNames += className + " ";
          }
        }
      }
    
      // Remove trailing space and return
      renderedClassNames = renderedClassNames.slice(0, -1);
      return renderedClassNames;
    }
    
    /**
     * Renders "m-for" Directive Array
     * @param {Array|Object|Number} iteratable
     * @param {Function} item
     */
    Moon.renderLoop = function(iteratable, item) {
      var items = null;
    
      if(Array.isArray(iteratable)) {
        items = new Array(iteratable.length);
    
        // Iterate through the array
        for(var i = 0; i < iteratable.length; i++) {
          items[i] = item(iteratable[i], i);
        }
      } else if(typeof iteratable === "object") {
        items = [];
    
        // Iterate through the object
        for(var key in iteratable) {
          items.push(item(iteratable[key], key));
        }
      } else if(typeof iteratable === "number") {
        items = new Array(iteratable);
    
        // Repeat a certain amount of times
        for(var i$1 = 0; i$1 < iteratable; i$1++) {
          items[i$1] = item(i$1 + 1, i$1);
        }
      }
    
      return items;
    }
    
    /**
     * Renders an Event Modifier
     * @param {Number} keyCode
     * @param {String} modifier
     */
     Moon.renderEventModifier = function(keyCode, modifier) {
      return keyCode === eventModifiers[modifier];
     }
    
    
    /* ======= Default Directives ======= */
    
    var emptyVNode = "m(\"#text\", " + (generateMeta(defaultMetadata())) + "\"\")";
    
    specialDirectives["m-if"] = {
      afterGenerate: function(prop, code, vnode, state) {
        var value = prop.value;
        compileTemplateExpression(value, state.dependencies);
        return (value + " ? " + code + " : " + emptyVNode);
      }
    }
    
    specialDirectives["m-for"] = {
      beforeGenerate: function(prop, vnode, parentVNode, state) {
        // Setup Deep Flag to Flatten Array
        parentVNode.deep = true;
      },
      afterGenerate: function(prop, code, vnode, state) {
        // Get dependencies
        var dependencies = state.dependencies;
    
        // Get Parts
        var parts = prop.value.split(" in ");
    
        // Aliases
        var aliases = parts[0].split(",");
    
        // The Iteratable
        var iteratable = parts[1];
        compileTemplateExpression(iteratable, dependencies);
    
        // Get any parameters
        var params = aliases.join(",");
    
        // Add aliases to scope
        for(var i = 0; i < aliases.length; i++) {
          var aliasIndex = dependencies.indexOf(aliases[i]);
          if(aliasIndex !== -1) {
            dependencies.splice(aliasIndex, 1);
          }
        }
    
        // Use the renderLoop runtime helper
        return ("Moon.renderLoop(" + iteratable + ", function(" + params + ") { return " + code + "; })");
      }
    }
    
    specialDirectives["m-on"] = {
      beforeGenerate: function(prop, vnode, parentVNode, state) {
        // Extract Event, Modifiers, and Parameters
        var value = prop.value;
        var meta = prop.meta;
    
        var methodToCall = value;
    
        var rawModifiers = meta.arg.split(".");
        var eventType = rawModifiers.shift();
    
        var params = "event";
        var rawParams = methodToCall.split("(");
    
        if(rawParams.length > 1) {
          // Custom parameters detected, update method to call, and generated parameter code
          methodToCall = rawParams.shift();
          params = rawParams.join("(").slice(0, -1);
          compileTemplateExpression(params, state.dependencies);
        }
    
        // Generate any modifiers
        var modifiers = "";
        for(var i = 0; i < rawModifiers.length; i++) {
          var eventModifierCode = eventModifiersCode[rawModifiers[i]];
          if(eventModifierCode === undefined) {
            modifiers += "if(Moon.renderEventModifier(event.keyCode, \"" + (rawModifiers[i]) + "\") === false) {return null;};"
          } else {
            modifiers += eventModifierCode;
          }
        }
    
        // Final event listener code
        var code = "function(event) {" + modifiers + "instance.callMethod(\"" + methodToCall + "\", [" + params + "])}";
        addEventListenerCodeToVNode(eventType, code, vnode);
      }
    }
    
    specialDirectives["m-model"] = {
      beforeGenerate: function(prop, vnode, parentVNode, state) {
        // Get attributes
        var value = prop.value;
        var attrs = vnode.props.attrs;
    
        // Get dependencies
        var dependencies = state.dependencies;
    
        // Add dependencies for the getter and setter
        compileTemplateExpression(value, dependencies);
    
        // Setup default event type, keypath to set, value of setter, DOM property to change, and value of DOM property
        var eventType = "input";
        var domGetter = "value";
        var domSetter = value;
        var keypathGetter = value;
        var keypathSetter = "event.target." + domGetter;
    
        // If input type is checkbox, listen on 'change' and change the 'checked' DOM property
        var type = attrs.type;
        if(type !== undefined) {
          type = type.value;
          var radio = false;
          if(type === "checkbox" || (type === "radio" && (radio = true))) {
            eventType = "change";
            domGetter = "checked";
    
            if(radio === true) {
              var valueAttr = attrs.value;
              var literalValueAttr = null;
              var valueAttrValue = "null";
              if(valueAttr !== undefined) {
                valueAttrValue = "\"" + (compileTemplate(valueAttr.value, dependencies, true)) + "\"";
              } else if((literalValueAttr = attrs["m-literal:value"])) {
                valueAttrValue = "" + (compileTemplate(literalValueAttr.value, dependencies, true));
              }
              domSetter = domSetter + " === " + valueAttrValue;
              keypathSetter = valueAttrValue;
            } else {
              keypathSetter = "event.target." + domGetter;
            }
          }
        }
    
        // Compute getter base if dynamic
        var bracketIndex = keypathGetter.indexOf("[");
        var dotIndex = keypathGetter.indexOf(".");
        var base = null;
        var dynamicPath = null;
        var dynamicIndex = -1;
    
        if(bracketIndex !== -1 || dotIndex !== -1) {
          // Dynamic keypath found,
          // Extract base and dynamic path
          if(bracketIndex === -1) {
            dynamicIndex = dotIndex;
          } else if(dotIndex === -1) {
            dynamicIndex = bracketIndex;
          } else if(bracketIndex < dotIndex) {
            dynamicIndex = bracketIndex;
          } else {
            dynamicIndex = dotIndex;
          }
          base = value.substring(0, dynamicIndex);
          dynamicPath = value.substring(dynamicIndex);
    
          // Replace string references with actual references
          keypathGetter = base + dynamicPath.replace(expressionRE, function(match, reference) {
            if(reference !== undefined) {
              return ("\" + " + reference + " + \"");
            } else {
              return match;
            }
          });
        }
    
        // Generate the listener
        var code = "function(event) {instance.set(\"" + keypathGetter + "\", " + keypathSetter + ")}";
    
        // Push the listener to it's event listeners
        addEventListenerCodeToVNode(eventType, code, vnode);
    
        // Setup a query used to get the value, and set the corresponding dom property
        var dom = vnode.props.dom;
        if(dom === undefined) {
          vnode.props.dom = dom = {};
        }
        dom[domGetter] = domSetter;
      }
    };
    
    specialDirectives["m-literal"] = {
      duringPropGenerate: function(prop, vnode, state) {
        var propName = prop.meta.arg;
        var propValue = prop.value;
        compileTemplateExpression(propValue, state.dependencies);
    
        if(state.hasAttrs === false) {
          state.hasAttrs = true;
        }
    
        if(propName === "class") {
          // Detected class, use runtime class render helper
          return ("\"class\": Moon.renderClass(" + propValue + "), ");
        } else {
          // Default literal attribute
          return ("\"" + propName + "\": " + propValue + ", ");
        }
      }
    };
    
    specialDirectives["m-html"] = {
      beforeGenerate: function(prop, vnode, parentVNode, state) {
        var value = prop.value;
        var dom = vnode.props.dom;
        if(dom === undefined) {
          vnode.props.dom = dom = {};
        }
        compileTemplateExpression(value, state.dependencies);
        dom.innerHTML = "(\"\" + " + value + ")";
      }
    }
    
    specialDirectives["m-mask"] = {
    
    }
    
    directives["m-show"] = function(el, val, vnode) {
      el.style.display = (val ? '' : 'none');
    }
    
    
    return Moon;
}));
