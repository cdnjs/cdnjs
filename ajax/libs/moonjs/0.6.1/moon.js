/*
* Moon v0.6.1
* Copyright 2016-2017, Kabir Shah
* https://github.com/KingPixil/moon/
* Free to use under the MIT license.
* https://kingpixil.github.io/license
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
      ctrl: 'if(!event.ctrlKey) {return;};',
      shift: 'if(!event.shiftKey) {return;};',
      alt: 'if(!event.altKey) {return;};',
      enter: 'if(event.keyCode !== 13) {return;};'
    };
    var id = 0;
    
    /* ======= Observer ======= */
    /**
     * Makes Computed Properties for an Instance
     * @param {Object} instance
     * @param {Object} computed
     */
    var initComputed = function (instance, computed) {
      var setComputedProperty = function (prop) {
        var properties = {
          get: function () {
            return computed[prop].get.call(instance);
          }
        };
        if (computed[prop].set) {
          properties.set = function (val) {
            return computed[prop].set.call(instance, val);
          };
        }
        Object.defineProperty(instance.$data, prop, properties);
      };
      for (var propName in computed) {
        setComputedProperty(propName);
      }
    };
    
    function Observer(instance) {
      this.instance = instance;
    }
    
    Observer.prototype.notify = function () {
      queueBuild(this.instance);
    };
    
    /* ======= Global Utilities ======= */
    
    /**
     * Logs a Message
     * @param {String} msg
     */
    var log = function (msg) {
      if (!Moon.config.silent) console.log(msg);
    };
    
    /**
     * Throws an Error
     * @param {String} msg
     */
    var error = function (msg) {
      console.error("[Moon] ERR: " + msg);
    };
    
    /**
     * Adds DOM Updates to Queue
     * @param {Object} instance
     */
    var queueBuild = function (instance) {
      if (!instance.$queued && !instance.$destroyed) {
        instance.$queued = true;
        setTimeout(function () {
          instance.build();
          callHook(instance, 'updated');
          instance.$queued = false;
        }, 0);
      }
    };
    
    /**
     * Converts attributes into key-value pairs
     * @param {Node} node
     * @return {Object} Key-Value pairs of Attributes
     */
    var extractAttrs = function (node) {
      var attrs = {};
      for (var rawAttrs = node.attributes, i = rawAttrs.length; i--;) {
        attrs[rawAttrs[i].name] = rawAttrs[i].value;
      }
      node.__moon__props__ = attrs;
      return attrs;
    };
    
    /**
     * Gives Default Metadata for a VNode
     * @return {Object} metadata
     */
    var defaultMetadata = function () {
      return {
        shouldRender: true,
        eventListeners: {}
      };
    };
    
    /**
     * Escapes a String
     * @param {String} str
     */
    var escapeString = function (str) {
      var NEWLINE_RE = /\n/g;
      var DOUBLE_QUOTE_RE = /"/g;
      var BACKSLASH_RE = /\\/g;
      return str.replace(BACKSLASH_RE, "\\\\").replace(DOUBLE_QUOTE_RE, "\\\"").replace(NEWLINE_RE, "\\n");
    };
    
    /**
     * Resolves an Object Keypath and Sets it
     * @param {Object} instance
     * @param {Object} obj
     * @param {String} keypath
     * @param {String} val
     * @return {Object} resolved object
     */
    var resolveKeyPath = function (instance, obj, keypath, val) {
      var i;
      keypath.replace(/\[(\w+)\]/g, function (match, index) {
        keypath = keypath.replace(match, '.' + index);
      });
      var path = keypath.split(".");
      for (i = 0; i < path.length - 1; i++) {
        var propName = path[i];
        obj = obj[propName];
      }
      obj[path[i]] = val;
      return obj;
    };
    
    /**
     * Compiles a Template
     * @param {String} template
     * @param {Boolean} isString
     * @return {String} compiled template
     */
    var compileTemplate = function (template, isString) {
      var TEMPLATE_RE = /{{([A-Za-z0-9_]+)([A-Za-z0-9_.()'"+\-*/\s\[\]]+)?}}/gi;
      var compiled = template;
      template.replace(TEMPLATE_RE, function (match, key, modifiers) {
        if (!modifiers) {
          modifiers = '';
        }
        if (isString) {
          compiled = compiled.replace(match, '" + instance.get("' + key + '")' + modifiers + ' + "');
        } else {
          compiled = compiled.replace(match, 'instance.get("' + key + '")' + modifiers);
        }
      });
      return compiled;
    };
    
    /**
     * Extracts the Slots From Component Children
     * @param {Array} children
     * @return {Object} extracted slots
     */
    var getSlots = function (children) {
      var slots = {};
    
      // No Children Means No Slots
      if (!children) {
        return slots;
      }
    
      var defaultSlotName = "default";
      slots[defaultSlotName] = [];
    
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var childProps = child.props.attrs;
        if (childProps.slot) {
          if (!slots[childProps.slot]) {
            slots[childProps.slot] = [child];
          } else {
            slots[childProps.slot].push(child);
          }
          delete childProps.slot;
        } else {
          slots[defaultSlotName].push(child);
        }
      }
    
      return slots;
    };
    
    /**
     * Creates a Virtual DOM Node
     * @param {String} type
     * @param {String} val
     * @param {Object} props
     * @param {Array} children
     * @param {Object} meta
     * @return {Object} Virtual DOM Node
     */
    var createElement = function (type, val, props, children, meta) {
      return {
        type: type,
        val: val,
        props: props,
        children: children,
        meta: meta || defaultMetadata()
      };
    };
    
    /**
     * Creates a Functional Component
     * @param {String} type
     * @param {Object} props
     * @param {Object} meta
     * @param {Array} children
     * @param {Object} functionalComponent
     * @return {Object} Virtual DOM Node
     */
    var createFunctionalComponent = function (type, props, meta, children, functionalComponent) {
      var data = functionalComponent.opts.data || {};
      // Merge data with provided props
      if (functionalComponent.opts.props) {
        for (var i = 0; i < functionalComponent.opts.props.length; i++) {
          var prop = functionalComponent.opts.props[i];
          data[prop] = props.attrs[prop];
        }
      }
      return functionalComponent.opts.render(h, {
        data: data,
        slots: getSlots(children)
      });
    };
    
    /**
     * Compiles Arguments to a VNode
     * @param {String} tag
     * @param {Object} attrs
     * @param {Object} meta
     * @param {...Object|String} children
     * @return {String} Object usable in Virtual DOM (VNode)
     */
    var h = function (tag, attrs, meta) {
      // Setup Children
      var children = [];
      var childrenLen = arguments.length - 3;
      for (var i = 0; i < childrenLen; i++) {
        var child = arguments[i + 3];
        if (Array.isArray(child)) {
          children = children.concat(child);
        } else if (typeof child === "string" || child === null) {
          children.push(createElement("#text", child || "", { attrs: {} }, [], defaultMetadata()));
        } else {
          children.push(child);
        }
      }
      // It's a Component
      if (components[tag]) {
        // Functional component
        if (components[tag].opts.functional) {
          return createFunctionalComponent(tag, attrs, meta, children, components[tag]);
        } else {
          // Provide the instance to diff engine
          meta.component = components[tag];
        }
      }
    
      // In the end, we have a VNode structure like:
      // {
      //  type: 'h1', <= nodename
      //  props: {
      //    attrs: {id: 'someId'}, <= regular attributes
      //    dom: {textContent: 'some text content'} <= only for DOM properties added by directives
      //  },
      //  meta: {}, <= metadata used internally
      //  children: [], <= any child nodes or text
      // }
    
      return createElement(tag, "", attrs, children, meta);
    };
    
    /**
     * Adds metadata Event Listeners to an Element
     * @param {Object} node
     * @param {Object} vnode
     * @param {Object} instance
     */
    var addEventListeners = function (node, vnode, instance) {
      var eventListeners = vnode.meta.eventListeners;
      for (var type in eventListeners) {
        for (var i = 0; i < eventListeners[type].length; i++) {
          var method = eventListeners[type][i];
          node.addEventListener(type, method);
        }
      }
    };
    
    /**
     * Creates DOM Node from VNode
     * @param {Object} vnode
     * @param {Object} instance
     * @return {Object} DOM Node
     */
    var createNodeFromVNode = function (vnode, instance) {
      var el;
    
      if (vnode.type === "#text") {
        // Create textnode
        el = document.createTextNode(vnode.val);
      } else {
        el = document.createElement(vnode.type);
        // Optimization: VNode only has one child that is text, and create it here
        if (vnode.children.length === 1 && vnode.children[0].type === "#text") {
          el.textContent = vnode.children[0].val;
        } else {
          // Add all children
          for (var i = 0; i < vnode.children.length; i++) {
            var childVNode = vnode.children[i];
            var childNode = createNodeFromVNode(vnode.children[i], instance);
            el.appendChild(childNode);
            // Component detected, mount it here
            if (childVNode.meta.component) {
              createComponentFromVNode(childNode, childVNode, childVNode.meta.component);
            }
          }
        }
        // Add all event listeners
        addEventListeners(el, vnode, instance);
      }
      // Setup Props (With Cache)
      el.__moon__props__ = extend({}, vnode.props.attrs);
      diffProps(el, {}, vnode, vnode.props.attrs);
    
      // Setup Cached NodeName
      el.__moon__nodeName__ = vnode.type;
      return el;
    };
    
    /**
     * Mounts a Component To The DOM
     * @param {Object} node
     * @param {Object} vnode
     * @param {Object} component
     * @return {Object} DOM Node
     */
    var createComponentFromVNode = function (node, vnode, component) {
      var componentInstance = new component.CTor();
      // Merge data with provided props
      for (var i = 0; i < componentInstance.$props.length; i++) {
        var prop = componentInstance.$props[i];
        componentInstance.$data[prop] = vnode.props.attrs[prop];
      }
      componentInstance.$slots = getSlots(vnode.children);
      componentInstance.$el = node;
      componentInstance.build();
      callHook(componentInstance, 'mounted');
      return componentInstance.$el;
    };
    
    /**
     * Diffs Props of Node and a VNode, and apply Changes
     * @param {Object} node
     * @param {Object} nodeProps
     * @param {Object} vnode
     * @param {Object} vnodeProps
     */
    var diffProps = function (node, nodeProps, vnode, vnodeProps) {
      // Get object of all properties being compared
      var allProps = merge(nodeProps, vnodeProps);
    
      for (var propName in allProps) {
        // If not in VNode or is a Directive, remove it
        if (!vnodeProps[propName] || directives[propName]) {
          // If it is a directive, run the directive
          if (directives[propName]) {
            directives[propName](node, allProps[propName], vnode);
          }
          node.removeAttribute(propName);
          delete node.__moon__props__[propName];
        } else if (!nodeProps[propName] || nodeProps[propName] !== vnodeProps[propName]) {
          // It has changed or is not in the node in the first place
          node.setAttribute(propName, vnodeProps[propName]);
          node.__moon__props__[propName] = vnodeProps[propName];
        }
      }
    
      if (vnode.props.dom) {
        for (var domProp in vnode.props.dom) {
          var domPropValue = vnode.props.dom[domProp];
          if (node[domProp] !== vnode.props.dom[domProp]) {
            node[domProp] = vnode.props.dom[domProp];
          }
        }
      }
    };
    
    /**
     * Diffs Node and a VNode, and applies Changes
     * @param {Object} node
     * @param {Object} vnode
     * @param {Object} parent
     * @param {Object} instance
     * @return {Object} adjusted node only if it was replaced
     */
    var diff = function (node, vnode, parent, instance) {
      var nodeName;
    
      if (node) {
        nodeName = node.__moon__nodeName__ || node.nodeName.toLowerCase();
      }
    
      if (!node && vnode) {
        // No Node, create a node
        var newNode = createNodeFromVNode(vnode, instance);
        parent.appendChild(newNode);
        if (vnode.meta.component) {
          // Detected parent component, build it here (parent node is available)
          createComponentFromVNode(newNode, vnode, vnode.meta.component);
        }
        return newNode;
      } else if (!vnode) {
        // No vnode, remove the node
        parent.removeChild(node);
        if (node.__moon__) {
          // Component was unmounted, destroy it here
          node.__moon__.destroy();
        }
        return null;
      } else if (nodeName !== vnode.type) {
        // Different types, replace it
        var newNode = createNodeFromVNode(vnode, instance);
        parent.replaceChild(newNode, node);
        if (node.__moon__) {
          // Component was unmounted, destroy it here
          node.__moon__.destroy();
        }
        if (vnode.meta.component) {
          // Detected parent component, build it here (parent node is available)
          createComponentFromVNode(newNode, vnode, vnode.meta.component);
        }
        return newNode;
      } else if (vnode.meta.shouldRender && vnode.type === "#text" && nodeName === "#text" && vnode.val !== node.textContent) {
        // Both are textnodes, update the node
        node.textContent = vnode.val;
        return node;
      } else if (vnode && vnode.type !== "#text" && vnode.meta.shouldRender) {
    
        if (vnode.meta.component) {
          if (!node.__moon__) {
            // Not mounted, create a new instance and mount it here
            createComponentFromVNode(node, vnode, vnode.meta.component);
          } else {
            // Mounted already, need to update
            var componentInstance = node.__moon__;
            var componentChanged = false;
            // Merge any properties that changed
            for (var prop in vnode.props.attrs) {
              if (componentInstance.$data[prop] !== vnode.props.attrs[prop]) {
                componentInstance.$data[prop] = vnode.props.attrs[prop];
                componentChanged = true;
              }
            }
            // If it has children, resolve any new slots
            if (vnode.children) {
              componentInstance.$slots = getSlots(vnode.children);
              componentChanged = true;
            }
            // If any changes were detected, build the component
            if (componentChanged) {
              componentInstance.build();
            }
          }
          // Skip diffing any children
          return node;
        }
    
        // Children May have Changed
    
        // Diff props
        var nodeProps = node.__moon__props__ || extractAttrs(node);
        diffProps(node, nodeProps, vnode, vnode.props.attrs);
    
        // Add initial event listeners (done once)
        if (instance.$initialRender) {
          addEventListeners(node, vnode, instance);
        }
    
        // Check if innerHTML was changed, don't diff children if so
        if (vnode.props.dom && vnode.props.dom.innerHTML) {
          return node;
        }
    
        // Diff Children
        var currentChildNode = node.firstChild;
        // Optimization:
        //  If the vnode contains just one text vnode, create it here
        if (vnode.children.length === 1 && vnode.children[0].type === "#text" && currentChildNode && !currentChildNode.nextSibling && currentChildNode.nodeName === "#text" && vnode.children[0].val !== currentChildNode.textContent) {
          currentChildNode.textContent = vnode.children[0].val;
        } else {
          // Iterate through all children
          for (var i = 0; i < vnode.children.length || currentChildNode; i++) {
            var next = currentChildNode ? currentChildNode.nextSibling : null;
            diff(currentChildNode, vnode.children[i], node, instance);
            currentChildNode = next;
          }
        }
    
        return node;
      } else {
        // Nothing Changed
        return node;
      }
    };
    
    /**
     * Extends an Object with another Object's properties
     * @param {Object} parent
     * @param {Object} child
     * @return {Object} Extended Parent
     */
    var extend = function (parent, child) {
      for (var key in child) {
        parent[key] = child[key];
      }
      return parent;
    };
    
    /**
     * Merges Two Objects Together
     * @param {Object} parent
     * @param {Object} child
     * @return {Object} Merged Object
     */
    var merge = function (parent, child) {
      var merged = {};
      for (var key in parent) {
        merged[key] = parent[key];
      }
      for (var key in child) {
        merged[key] = child[key];
      }
      return merged;
    };
    
    /**
     * Calls a Hook
     * @param {Object} instance
     * @param {String} name
     */
    var callHook = function (instance, name) {
      var hook = instance.$hooks[name];
      if (hook) {
        hook();
      }
    };
    
    /**
     * Does No Operation
     */
    var noop = function () {};
    
    /* ======= Compiler ======= */
    var lex = function (input) {
      var state = {
        input: input,
        current: 0,
        tokens: []
      };
      lexState(state);
      return state.tokens;
    };
    
    var lexState = function (state) {
      var input = state.input;
      var len = input.length;
      while (state.current < len) {
        // Check if it is text
        if (input.charAt(state.current) !== "<") {
          lexText(state);
          continue;
        }
    
        // Check if it is a comment
        if (input.substr(state.current, 4) === "<!--") {
          lexComment(state);
          continue;
        }
    
        // It's a tag
        lexTag(state);
      }
    };
    
    var lexText = function (state) {
      var input = state.input;
      var len = input.length;
      var endOfText = input.indexOf("<", state.current);
      // Only Text
      if (endOfText === -1) {
        state.tokens.push({
          type: "text",
          value: input.slice(state.current)
        });
        state.current = len;
        return;
      }
    
      // No Text at All
      if (endOfText === state.current) {
        return;
      }
    
      // End of Text Found
      state.tokens.push({
        type: "text",
        value: input.slice(state.current, endOfText)
      });
      state.current = endOfText;
    };
    
    var lexComment = function (state) {
      var input = state.input;
      var len = input.length;
      state.current += 4;
      var endOfComment = input.indexOf("-->", state.current);
    
      // Only an unclosed comment
      if (endOfComment === -1) {
        state.tokens.push({
          type: "comment",
          value: input.slice(state.current)
        });
        state.current = len;
        return;
      }
    
      // End of Comment Found
      state.tokens.push({
        type: "comment",
        value: input.slice(state.current, endOfComment)
      });
      state.current = endOfComment + 3;
    };
    
    var lexTag = function (state) {
      var input = state.input;
      var len = input.length;
    
      // Lex Starting of Tag
      var isClosingStart = input.charAt(state.current + 1) === "/";
      state.tokens.push({
        type: "tagStart",
        close: isClosingStart
      });
      state.current += isClosingStart ? 2 : 1;
    
      // Lex type and attributes
      var tagType = lexTagType(state);
      lexAttributes(state);
    
      // Lex ending tag
      var isClosingEnd = input.charAt(state.current) === "/";
      state.tokens.push({
        type: "tagEnd",
        close: false
      });
      state.current += isClosingEnd ? 2 : 1;
      if (isClosingEnd) {
        state.tokens.push({
          type: "tagStart",
          close: true
        });
        state.tokens.push({
          type: "tag",
          value: tagType
        });
        state.tokens.push({
          type: "attribute",
          value: {}
        });
        state.tokens.push({
          type: "tagEnd",
          close: false
        });
      }
    };
    
    var lexTagType = function (state) {
      var input = state.input;
      var len = input.length;
      var start = state.current;
      while (start < len) {
        var char = input.charAt(start);
        if (char === "/" || char === ">" || char === " ") {
          start++;
        } else {
          break;
        }
      }
    
      var end = start;
      while (end < len) {
        var char = input.charAt(end);
        if (char === "/" || char === ">" || char === " ") {
          break;
        } else {
          end++;
        }
      }
    
      var tagType = input.slice(start, end);
      state.tokens.push({
        type: "tag",
        value: tagType
      });
      state.current = end;
      return tagType;
    };
    
    var lexAttributes = function (state) {
      var input = state.input;
      var len = input.length;
      var end = state.current;
    
      var attrs = {};
      var rawAttrs = "";
    
      // Captures attributes
      var ATTRIBUTE_RE = /([^=\s]*)(=?)("[^"]*"|[^\s"]*)/gi;
    
      while (end < len) {
        var char = input.charAt(end);
        var nextChar = input.charAt(end + 1);
        if (char === ">" || char === "/" && nextChar === ">") {
          break;
        }
        rawAttrs += char;
        end++;
      }
    
      rawAttrs.replace(ATTRIBUTE_RE, function (match, key, equal, value) {
        var firstChar = value[0];
        var lastChar = value[value.length - 1];
        // Quotes were included in the value
        if (firstChar === "'" && lastChar === "'" || firstChar === "\"" && lastChar === "\"") {
          value = value.slice(1, -1);
        }
    
        // If there is no value provided
        if (!value) {
          value = key;
        }
        // Set attribute value
        if (key && value) {
          attrs[key] = value;
        }
      });
    
      state.current = end;
      state.tokens.push({
        type: "attribute",
        value: attrs
      });
    };
    
    var parse = function (tokens) {
      var root = {
        type: "ROOT",
        children: []
      };
    
      var state = {
        current: 0,
        tokens: tokens
      };
    
      while (state.current < tokens.length) {
        var child = walk(state);
        if (child) {
          root.children.push(child);
        }
      }
    
      return root;
    };
    
    var HTML_ELEMENTS = ["area", "base", "br", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
    
    var createParseNode = function (type, props, children) {
      return {
        type: type,
        props: props,
        children: children
      };
    };
    
    var walk = function (state) {
      var token = state.tokens[state.current];
      var previousToken = state.tokens[state.current - 1];
      var secondToken = state.tokens[state.current + 1];
      var thirdToken = state.tokens[state.current + 2];
      var fourthToken = state.tokens[state.current + 3];
    
      var increment = function (num) {
        state.current += num === undefined ? 1 : num;
        token = state.tokens[state.current];
        previousToken = state.tokens[state.current - 1];
        secondToken = state.tokens[state.current + 1];
        thirdToken = state.tokens[state.current + 2];
      };
    
      if (token.type === "text") {
        increment();
        return previousToken.value;
      }
    
      if (token.type === "comment") {
        increment();
        return;
      }
    
      // Start of new Tag
      if (token.type === "tagStart" && !token.close && !fourthToken.close) {
        var node = createParseNode(secondToken.value, thirdToken.value, []);
        var tagType = secondToken.value;
        // Exit Start Tag
        increment(4);
    
        // If it's self closing, return it here
        if (HTML_ELEMENTS.indexOf(node.type) !== -1) {
          return node;
        }
    
        var startContentIndex = state.current;
        // Make sure it has content and is closed
        if (token) {
          // Find Closing Tag, and push children recursively
          while (token.type !== "tagStart" || token.type === "tagStart" && !token.close) {
            // Push a parsed child to the current node
            var parsedChildState = walk(state);
            var lastKnown;
            if (parsedChildState) {
              node.children.push(parsedChildState);
            }
            increment(0);
            if (!token) {
              // No token means a tag was left unclosed
              error('The element "' + node.type + '" was left unclosed.');
              break;
            }
          }
          increment();
        }
    
        return node;
      }
    
      increment();
      return;
    };
    
    /**
     * Generates Code for Props
     * @param {Object} vnode
     * @return {String} generated code
     */
    var generateProps = function (vnode) {
      var attrs = vnode.props.attrs;
      var generatedObject = "{attrs: {";
    
      if (attrs) {
        for (var attr in attrs) {
          if (directives[attr]) {
            vnode.dynamic = true;
          }
          if (specialDirectives[attr]) {
            // Special directive found that generates code after initial generation, push it to its known special directives to run afterGenerate later
            if (specialDirectives[attr].afterGenerate) {
              if (!vnode.specialDirectivesAfter) {
                vnode.specialDirectivesAfter = {};
                vnode.specialDirectivesAfter[attr] = attrs[attr];
              } else {
                vnode.specialDirectivesAfter[attr] = attrs[attr];
              }
            }
            // Invoke any special directives that need to change values before code generation
            if (specialDirectives[attr].beforeGenerate) {
              specialDirectives[attr].beforeGenerate(attrs[attr], vnode);
            }
    
            // Invoke any special directives that need to change values of props during code generation
            if (specialDirectives[attr].duringPropGenerate) {
              generatedObject += specialDirectives[attr].duringPropGenerate(attrs[attr], vnode);
            }
    
            // Keep a flag to know to always rerender this
            vnode.dynamic = true;
    
            // Remove special directive
            delete attrs[attr];
          } else {
            var normalizedProp = JSON.stringify(attrs[attr]);
            var compiledProp = compileTemplate(normalizedProp, true);
            if (normalizedProp !== compiledProp) {
              vnode.dynamic = true;
            }
            generatedObject += '"' + attr + '": ' + compiledProp + ', ';
          }
        }
    
        if (Object.keys(attrs).length) {
          generatedObject = generatedObject.slice(0, -2) + "}";
        } else {
          generatedObject += "}";
        }
      }
    
      var dom = vnode.props.dom;
      if (dom) {
        vnode.dynamic = true;
        generatedObject += ", dom: {";
        for (var domProp in dom) {
          generatedObject += '"' + domProp + '": ' + dom[domProp] + ', ';
        }
        generatedObject = generatedObject.slice(0, -2) + "}";
      }
    
      // Close the generated object
      generatedObject += "}";
      return generatedObject;
    };
    
    /**
     * Generates Code for Event Listeners
     * @param {Object} listeners
     * @return {String} generated code
     */
    var generateEventListeners = function (listeners) {
      if (Object.keys(listeners).length === 0) {
        return "{}";
      }
      var generatedObject = "{";
    
      for (var type in listeners) {
        generatedObject += '"' + type + '": [' + generateArray(listeners[type]) + '], ';
      }
    
      generatedObject = generatedObject.slice(0, -2) + "}";
    
      return generatedObject;
    };
    
    /**
     * Generates Code for Metadata
     * @param {Object} meta
     * @return {String} generated code
     */
    var generateMeta = function (meta) {
      var generatedObject = "{";
    
      for (var key in meta) {
        if (key === 'eventListeners') {
          generatedObject += '"' + key + '": ' + generateEventListeners(meta[key]) + ', ';
        } else {
          generatedObject += '"' + key + '": ' + meta[key] + ', ';
        }
      }
    
      generatedObject = generatedObject.slice(0, -2) + "}";
    
      return generatedObject;
    };
    
    /**
     * Generates Code for an Array
     * @param {Array} arr
     * @return {String} generated array
     */
    var generateArray = function (arr) {
      var generatedArray = "";
    
      for (var i = 0; i < arr.length; i++) {
        generatedArray += arr[i] + ', ';
      }
    
      generatedArray = generatedArray.slice(0, -2);
    
      return generatedArray;
    };
    
    /**
     * Creates an "h" Call for a VNode
     * @param {Object} vnode
     * @param {Array} children
     * @return {String} "h" call
     */
    var createCall = function (vnode) {
      var call = 'h("' + vnode.type + '", ';
      call += generateProps(vnode) + ", ";
      // Generate code for children recursively here (in case modified by special directives)
      var children = vnode.children.map(generateEl);
      // Detected static vnode, tell diffing engine to skip it
      if (vnode.children.length === 1 && children.length === 1 && typeof vnode.children[0] === "string" && "\"" + vnode.children[0] + "\"" === children[0] && !vnode.dynamic) {
        vnode.meta.shouldRender = "instance.$initialRender";
      }
    
      call += generateMeta(vnode.meta);
      call += children.length ? ", " + generateArray(children) : "";
      call += ")";
      return call;
    };
    
    var generateEl = function (el) {
      var code = "";
    
      if (typeof el === "string") {
        // Escape newlines and double quotes, and compile the string
        code += '"' + compileTemplate(escapeString(el), true) + '"';
      } else {
        // Recursively generate code for children
        if (!el.meta) {
          el.meta = defaultMetadata();
        }
        el.props = {
          attrs: el.props
        };
        var compiledCode = el.type === "slot" ? 'instance.$slots[\'' + (el.props.attrs.name || "default") + '\']' : createCall(el);
        if (el.specialDirectivesAfter) {
          // There are special directives that need to change the value after code generation, so
          // run them now
          for (var specialDirectiveAfter in el.specialDirectivesAfter) {
            compiledCode = specialDirectives[specialDirectiveAfter].afterGenerate(el.specialDirectivesAfter[specialDirectiveAfter], compiledCode, el);
          }
        }
        code += compiledCode;
      }
      return code;
    };
    
    var generate = function (ast) {
      // Get root element
      var root = ast.children[0];
      // Begin Code
      var code = "var instance = this; return " + generateEl(root);
    
      try {
        return new Function("h", code);
      } catch (e) {
        error("Could not create render function");
        return noop;
      }
    };
    
    var compile = function (template) {
      var tokens = lex(template);
      var ast = parse(tokens);
      return generate(ast);
    };
    
    function Moon(opts) {
      /* ======= Initial Values ======= */
      this.$opts = opts || {};
    
      this.$id = id++;
    
      this.$name = this.$opts.name || "root";
      this.$data = this.$opts.data || {};
      this.$render = this.$opts.render || noop;
      this.$hooks = this.$opts.hooks || {};
      this.$methods = this.$opts.methods || {};
      this.$events = {};
      this.$dom = {};
      this.$observer = new Observer(this);
      this.$destroyed = false;
      this.$initialRender = true;
      this.$queued = false;
    
      // Setup Computed Properties
      if (this.$opts.computed) {
        initComputed(this, this.$opts.computed);
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
    Moon.prototype.get = function (key) {
      return this.$data[key];
    };
    
    /**
     * Sets Value in Data
     * @param {String} key
     * @param {String} val
     */
    Moon.prototype.set = function (key, val) {
      resolveKeyPath(this, this.$data, key, val);
      this.$observer.notify();
    };
    
    /**
     * Destroys Moon Instance
     */
    Moon.prototype.destroy = function () {
      this.removeEvents();
      this.$el = null;
      this.$destroyed = true;
      callHook(this, 'destroyed');
    };
    
    /**
     * Calls a method
     * @param {String} method
     */
    Moon.prototype.callMethod = function (method, args) {
      args = args || [];
      this.$methods[method].apply(this, args);
    };
    
    // Event Emitter, adapted from https://github.com/KingPixil/voke
    
    /**
     * Attaches an Event Listener
     * @param {String} eventName
     * @param {Function} action
     */
    Moon.prototype.on = function (eventName, action) {
      if (this.$events[eventName]) {
        this.$events[eventName].push(action);
      } else {
        this.$events[eventName] = [action];
      }
    };
    
    /**
     * Removes an Event Listener
     * @param {String} eventName
     * @param {Function} action
     */
    Moon.prototype.off = function (eventName, action) {
      var index = this.$events[eventName].indexOf(action);
      if (index !== -1) {
        this.$events[eventName].splice(index, 1);
      }
    };
    
    /**
     * Removes All Event Listeners
     * @param {String} eventName
     * @param {Function} action
     */
    Moon.prototype.removeEvents = function () {
      for (var evt in this.$events) {
        this.$events[evt] = [];
      }
    };
    
    /**
     * Emits an Event
     * @param {String} eventName
     * @param {Object} meta
     */
    Moon.prototype.emit = function (eventName, meta) {
      meta = meta || {};
      meta.type = eventName;
    
      if (this.$events["*"]) {
        for (var i = 0; i < this.$events["*"].length; i++) {
          var globalHandler = this.$events["*"][i];
          globalHandler(meta);
        }
      }
    
      for (var i = 0; i < this.$events[eventName].length; i++) {
        var handler = this.$events[eventName][i];
        handler(meta);
      }
    };
    
    /**
     * Renders "m-for" Directive Array
     * @param {Array} arr
     * @param {Function} item
     */
    Moon.prototype.renderLoop = function (arr, item) {
      var items = [];
      for (var i = 0; i < arr.length; i++) {
        items.push(item(arr[i], i));
      }
      return items;
    };
    
    /**
     * Mounts Moon Element
     * @param {Object} el
     */
    Moon.prototype.mount = function (el) {
      this.$el = document.querySelector(el);
      this.$destroyed = false;
    
      if (!this.$el) {
        error("Element " + this.$opts.el + " not found");
      }
    
      // Sync Element and Moon instance
      this.$el.__moon__ = this;
    
      // Setup template as provided `template` or outerHTML of the Element
      this.$template = this.$opts.template || this.$el.outerHTML;
    
      // Setup render Function
      if (this.$render === noop) {
        this.$render = Moon.compile(this.$template);
      }
    
      // Run First Build
      this.build();
      callHook(this, 'mounted');
    };
    
    /**
     * Renders Virtual DOM
     * @return Virtual DOM
     */
    Moon.prototype.render = function () {
      return this.$render(h);
    };
    
    /**
     * Diff then Patches Nodes With Data
     * @param {Object} node
     * @param {Object} vnode
     */
    Moon.prototype.patch = function (node, vnode, parent) {
      var newRootEl = diff(node, vnode, parent, this);
      if (node !== newRootEl) {
        // Root Node Changed, Apply Change in Instance
        this.$el = newRootEl;
        this.$el.__moon__ = this;
      }
      this.$initialRender = false;
    };
    
    /**
     * Render and Patches the DOM With Data
     */
    Moon.prototype.build = function () {
      this.$dom = this.render();
      this.patch(this.$el, this.$dom, this.$el.parentNode);
    };
    
    /**
     * Initializes Moon
     */
    Moon.prototype.init = function () {
      log("======= Moon =======");
      callHook(this, 'init');
    
      if (this.$opts.el) {
        this.mount(this.$opts.el);
      }
    };
    
    /* ======= Global API ======= */
    
    /**
     * Configuration of Moon
     */
    Moon.config = {
      silent: typeof console === 'undefined',
      prefix: "m-",
      keyCodes: function (keyCodes) {
        for (var keyCode in keyCodes) {
          eventModifiersCode[keyCode] = 'if(event.keyCode !== ' + keyCodes[keyCode] + ') {return;};';
        }
      }
    };
    
    /**
     * Version of Moon
     */
    Moon.version = '0.6.1';
    
    /**
     * Moon Utilities
     */
    Moon.util = {
      noop: noop,
      error: error,
      log: log,
      merge: merge,
      extend: extend
    };
    
    /**
     * Runs an external Plugin
     * @param {Object} plugin
     */
    Moon.use = function (plugin) {
      plugin.init(Moon);
    };
    
    /**
     * Compiles HTML to a Render Function
     * @param {String} template
     * @return {Function} render function
     */
    Moon.compile = function (template) {
      return compile(template);
    };
    
    /**
     * Runs a Task After Update Queue
     * @param {Function} task
     */
    Moon.nextTick = function (task) {
      setTimeout(task, 0);
    };
    
    /**
     * Creates a Directive
     * @param {String} name
     * @param {Function} action
     */
    Moon.directive = function (name, action) {
      directives[Moon.config.prefix + name] = action;
    };
    
    /**
     * Creates a Component
     * @param {String} name
     * @param {Function} action
     */
    Moon.component = function (name, opts) {
      var Parent = this;
      opts.name = name;
    
      function MoonComponent() {
        Moon.call(this, opts);
      }
    
      MoonComponent.prototype = Object.create(Parent.prototype);
      MoonComponent.prototype.constructor = MoonComponent;
    
      MoonComponent.prototype.init = function () {
        callHook(this, 'init');
        this.$destroyed = false;
        this.$props = this.$opts.props || [];
    
        this.$template = this.$opts.template;
    
        if (this.$render === noop) {
          this.$render = Moon.compile(this.$template);
        }
      };
    
      components[name] = {
        CTor: MoonComponent,
        opts: opts
      };
    
      return MoonComponent;
    };
    
    /* ======= Default Directives ======= */
    
    specialDirectives[Moon.config.prefix + "if"] = {
      afterGenerate: function (value, code, vnode) {
        return '(' + compileTemplate(value, false) + ') ? ' + code + ' : \'\'';
      }
    };
    
    specialDirectives[Moon.config.prefix + "for"] = {
      afterGenerate: function (value, code, vnode) {
        var parts = value.split(" in ");
        var aliases = parts[0].split(",");
    
        var iteratable = compileTemplate(parts[1], false);
    
        var params = aliases.join(",");
    
        code.replace(/instance\.get\("([^"]+)"\)/g, function (match, alias) {
          if (aliases.indexOf(alias) !== -1) {
            code = code.replace(new RegExp('instance.get\\("' + alias + '"\\)', "g"), alias);
          }
        });
    
        return 'instance.renderLoop(' + iteratable + ', function(' + params + ') { return ' + code + '; })';
      }
    };
    
    specialDirectives[Moon.config.prefix + "on"] = {
      beforeGenerate: function (value, vnode) {
        value = compileTemplate(value, false);
    
        var splitVal = value.split(":");
        // Extract modifiers and the event
        var rawModifiers = splitVal[0].split(".");
        var eventToCall = rawModifiers[0];
        var methodToCall = splitVal[1];
        var params = "event";
        var rawParams = methodToCall.split("(");
        if (rawParams.length > 1) {
          methodToCall = rawParams.shift();
          params = rawParams.join("(").slice(0, -1);
        }
        var modifiers = "";
    
        rawModifiers.shift();
    
        for (var i = 0; i < rawModifiers.length; i++) {
          modifiers += eventModifiersCode[rawModifiers[i]];
        }
    
        var code = 'function(event) {' + modifiers + 'instance.callMethod("' + methodToCall + '", [' + params + '])}';
        if (!vnode.meta.eventListeners[eventToCall]) {
          vnode.meta.eventListeners[eventToCall] = [code];
        } else {
          vnode.meta.eventListeners[eventToCall].push(code);
        }
      }
    };
    
    specialDirectives[Moon.config.prefix + "model"] = {
      beforeGenerate: function (value, vnode) {
        // Compile a string value for the keypath
        var compiledStringValue = compileTemplate(value, true);
        // Setup default event types and dom property to change
        var eventType = "input";
        var valueProp = "value";
    
        // If input type is checkbox, listen on 'change' and change the 'checked' dom property
        if (vnode.props.attrs.type === "checkbox") {
          eventType = "change";
          valueProp = "checked";
        }
    
        // Generate event listener code
        var code = 'function(event) {instance.set("' + compiledStringValue + '", event.target.' + valueProp + ')}';
    
        // Push the listener to it's event listeners
        if (!vnode.meta.eventListeners[eventType]) {
          vnode.meta.eventListeners[eventType] = [code];
        } else {
          vnode.meta.eventListeners[eventType].push(code);
        }
    
        // Setup a query used to get the value, and set the corresponding dom property
        var getQuery = compileTemplate('{{' + compileTemplate(value, false) + '}}', false);
        if (!vnode.props.dom) {
          vnode.props.dom = {};
        }
        vnode.props.dom[valueProp] = getQuery;
      }
    };
    
    specialDirectives[Moon.config.prefix + "literal"] = {
      duringPropGenerate: function (value, vnode) {
        var parts = value.split(":");
        var prop = parts.shift();
        var literal = parts.join(":");
        return '"' + prop + '": ' + compileTemplate(literal, false) + ', ';
      }
    };
    
    specialDirectives[Moon.config.prefix + "once"] = {
      beforeGenerate: function (value, vnode) {
        vnode.meta.shouldRender = "instance.$initialRender";
      }
    };
    
    specialDirectives[Moon.config.prefix + "pre"] = {
      beforeGenerate: function (value, vnode) {
        vnode.meta.shouldRender = false;
      }
    };
    
    specialDirectives[Moon.config.prefix + "html"] = {
      beforeGenerate: function (value, vnode) {
        if (!vnode.props.dom) {
          vnode.props.dom = {};
        }
        vnode.props.dom.innerHTML = '"' + compileTemplate(value, true) + '"';
      }
    };
    
    specialDirectives[Moon.config.prefix + "text"] = {
      beforeGenerate: function (value, vnode) {
        vnode.children = [value];
      }
    };
    
    directives[Moon.config.prefix + "show"] = function (el, val, vnode) {
      var evaluated = new Function("return " + val);
      if (!evaluated()) {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
      }
    };
    
    directives[Moon.config.prefix + "mask"] = function (el, val, vnode) {};
    return Moon;
}));
