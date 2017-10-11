/*
* Moon 0.1.3
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
    var id = 0;
    
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
     * Converts attributes into key-value pairs
     * @param {Node} node
     * @return {Object} Key-Value pairs of Attributes
     */
    var extractAttrs = function (node) {
      var attrs = {};
      if (!node.attributes) return attrs;
      var rawAttrs = node.attributes;
      for (var i = 0; i < rawAttrs.length; i++) {
        attrs[rawAttrs[i].name] = rawAttrs[i].value;
      }
    
      return attrs;
    };
    
    /**
     * Gives Default Metadata for a VNode
     * @return {Object} metadata
     */
    var defaultMetadata = function () {
      return {
        shouldRender: true,
        component: false,
        eventListeners: {}
      };
    };
    
    /**
     * Compiles a Template
     * @param {String} template
     * @param {Boolean} isString
     * @return {String} compiled template
     */
    var compileTemplate = function (template, isString, customCode) {
      var TEMPLATE_RE = /{{([A-Za-z0-9_]+)([A-Za-z0-9_.()\[\]]+)?}}/gi;
      var compiled = template;
      template.replace(TEMPLATE_RE, function (match, key, modifiers) {
        if (!modifiers) {
          modifiers = '';
        }
        if (customCode) {
          compiled = customCode(compiled, match, key, modifiers);
        } else if (isString) {
          compiled = compiled.replace(match, "\" + instance.get(\"" + key + "\")" + modifiers + " + \"");
        } else {
          compiled = compiled.replace(match, "instance.get(\"" + key + "\")" + modifiers);
        }
      });
      return compiled;
    };
    
    /**
     * Creates an "h" Call for a VNode
     * @param {Object} vnode
     * @return {String} "h" call
     */
    var createCall = function (vnode) {
      return "h(\"" + vnode.type + "\", " + JSON.stringify(vnode.props) + ", " + JSON.stringify(vnode.meta) + ", " + (vnode.children.join(",") || null) + ")";
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
     * Compiles Arguments to a VNode
     * @param {String} tag
     * @param {Object} attrs
     * @param {Array} children
     * @return {String} Object usable in Virtual DOM (VNode)
     */
    var h = function () {
      var args = Array.prototype.slice.call(arguments);
      var tag = args.shift();
      var attrs = args.shift() || {};
      var meta = args.shift() || defaultMetadata();
      var children = [];
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (Array.isArray(arg)) {
          children = children.concat(arg);
        } else if (typeof args[i] === "string" || args[i] === null) {
          children.push(createElement("#text", args[i] || '', {}, [], meta));
        } else {
          children.push(arg);
        }
      }
    
      return createElement(tag, children.join(""), attrs, children, meta);
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
          if (method === "__MOON__MODEL__UPDATE__") {
            node.addEventListener("input", function (evt) {
              instance.set(vnode.props["m-model"], evt.target.value);
            });
            return;
          }
          if (instance.$events[type]) {
            instance.on(type, function () {
              instance.callMethod(method, [e]);
            });
          } else {
            node.addEventListener(type, function (e) {
              instance.callMethod(method, [e]);
            });
          }
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
        el = document.createTextNode(vnode.val);
      } else {
        el = document.createElement(vnode.type);
        var children = vnode.children.map(function (item) {
          return createNodeFromVNode(item, instance);
        });
        for (var i = 0; i < children.length; i++) {
          el.appendChild(children[i]);
        }
        addEventListeners(el, vnode, instance);
      }
      diffProps(el, {}, vnode.props, vnode);
      return el;
    };
    
    /**
     * Diffs Props of Node and a VNode, and apply Changes
     * @param {Object} node
     * @param {Object} nodeProps
     * @param {Object} vnodeProps
     * @param {Object} vnode
     */
    var diffProps = function (node, nodeProps, vnodeProps, vnode) {
      // Get object of all properties being compared
      var allProps = merge(nodeProps, vnodeProps);
    
      for (var propName in allProps) {
        // If not in VNode or is Directive, remove it
        if (!vnodeProps[propName] || directives[propName] || specialDirectives[propName]) {
          // If it is a directive, run the directive
          if (directives[propName]) {
            directives[propName](node, allProps[propName], vnode);
          }
          node.removeAttribute(propName);
        } else if (!nodeProps[propName] || nodeProps[propName] !== vnodeProps[propName]) {
          // It has changed or is not in the node in the first place
          node.setAttribute(propName, vnodeProps[propName]);
        }
      }
    };
    
    /**
     * Diffs Node and a VNode, and applies Changes
     * @param {Object} node
     * @param {Object} vnode
     * @param {Object} parent
     * @param {Object} instance
     */
    var diff = function (node, vnode, parent, instance) {
      var nodeName;
    
      if (node) {
        nodeName = node.nodeName.toLowerCase();
      }
    
      if (vnode && vnode.meta ? vnode.meta.shouldRender : true) {
    
        if (!node) {
          // No node, add it
          parent.appendChild(createNodeFromVNode(vnode, instance));
        } else if (!vnode) {
          // No VNode, remove the node
          parent.removeChild(node);
        } else if (nodeName !== vnode.type) {
          // Different types of Nodes, replace the node
          parent.replaceChild(createNodeFromVNode(vnode, instance), node);
        } else if (nodeName === "#text" && vnode.type === "#text") {
          // Both are text, set the text
          node.textContent = vnode.val;
        } else if (vnode.type) {
          // Diff properties
          var nodeProps = extractAttrs(node);
          diffProps(node, nodeProps, vnode.props, vnode);
    
          if (instance.$initialRender) {
            addEventListeners(node, vnode, instance);
          }
    
          // Diff children
          for (var i = 0; i < vnode.children.length || i < node.childNodes.length; i++) {
            diff(node.childNodes[i], vnode.children[i], node, instance);
          }
        }
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
    var lex = function (input, opts) {
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
      var startChar = input.charAt(state.current);
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
        if (char === ">" || char === "/") {
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
        var startContentIndex = state.current;
        // Make sure it has content and is closed
        if (token) {
          // Find Closing Tag, and push children recursively
          while (token.type !== "tagStart" || token.type === "tagStart" && !token.close) {
            // Push a child to the current node
            var parsedChildState = walk(state);
            if (parsedChildState) {
              node.children.push(parsedChildState);
            }
            increment(0);
    
            if (!token) {
              state.current = startContentIndex - 1;
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
    
    var generateEl = function (el) {
      var code = "";
      if (typeof el === "string") {
        code += "\"" + el + "\"";
      } else {
        // Recursively generate code for children
        el.children = el.children.map(generateEl);
        if (!el.meta) {
          el.meta = defaultMetadata();
        }
        var compiledCode = createCall(el);
        for (var prop in el.props) {
          if (specialDirectives[prop]) {
            compiledCode = specialDirectives[prop](el.props[prop], compiledCode, el);
          }
        }
        code += compiledCode;
      }
      return code;
    };
    
    var generate = function (ast) {
      var NEWLINE_RE = /\n/g;
      // Get root element
      var root = ast.children[0];
      // Begin Code
      var code = "var instance = this; return " + generateEl(root);
    
      // Compile Templates
      code = compileTemplate(code, true);
    
      // Escape Newlines
      code = code.replace(NEWLINE_RE, "\" + \"\\n\" + \"");
    
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
    
      var self = this;
    
      this.$id = id++;
    
      this.$name = this.$opts.name || "root";
      this.$parent = this.$opts.parent || null;
      this.$data = this.$opts.data || {};
      this.$render = this.$opts.render || noop;
      this.$hooks = this.$opts.hooks || {};
      this.$methods = this.$opts.methods || {};
      this.$events = {};
      this.$dom = {};
      this.$destroyed = false;
      this.$initialRender = true;
      this.$queued = false;
    
      /* ======= Default Directives ======= */
    
      specialDirectives[Moon.config.prefix + "if"] = function (value, code, vnode) {
        return "(" + compileTemplate(value, false) + ") ? " + code + " : ''";
      };
    
      specialDirectives[Moon.config.prefix + "for"] = function (value, code, vnode) {
        var parts = value.split(" in ");
        var aliases = parts[0].split(",");
    
        var iteratable = "instance.get(\"" + parts[1] + "\")";
    
        var params = aliases.join(",");
    
        var customCode = function (compiled, match, key, modifiers) {
          if (aliases.indexOf(key) === -1) {
            return compiled;
          }
          return compiled.replace(match, "\" + " + key + modifiers + " + \"");
        };
    
        return "instance.renderLoop(" + iteratable + ", function(" + params + ") { return " + compileTemplate(code, true, customCode) + "; })";
      };
    
      specialDirectives[Moon.config.prefix + "on"] = function (value, code, vnode) {
        var splitVal = value.split(":");
        var eventToCall = splitVal[0];
        var methodToCall = splitVal[1];
        if (!vnode.meta.eventListeners[eventToCall]) {
          vnode.meta.eventListeners[eventToCall] = [methodToCall];
        } else {
          vnode.meta.eventListeners[eventToCall].push(methodToCall);
        }
    
        return createCall(vnode);
      };
    
      specialDirectives[Moon.config.prefix + "model"] = function (value, code, vnode) {
        if (!vnode.meta.eventListeners["input"]) {
          vnode.meta.eventListeners["input"] = ["__MOON__MODEL__UPDATE__"];
        } else {
          vnode.meta.eventListeners["input"].push("__MOON__MODEL__UPDATE__");
        }
        return createCall(vnode);
      };
    
      specialDirectives[Moon.config.prefix + "once"] = function (value, code, vnode) {
        code = compileTemplate(code, false, function (compiled, match, key) {
          return compiled.replace(match, self.get(key));
        });
        return code;
      };
    
      directives[Moon.config.prefix + "model"] = function (el, val, vdom) {
        el.value = self.get(val);
      };
    
      directives[Moon.config.prefix + "show"] = function (el, val, vdom) {
        var evaluated = new Function("return " + val);
        if (!evaluated()) {
          el.style.display = 'none';
        } else {
          el.style.display = 'block';
        }
      };
    
      directives[Moon.config.prefix + "pre"] = function (el, val, vdom) {
        vdom.meta.shouldRender = false;
      };
    
      directives[Moon.config.prefix + "text"] = function (el, val, vdom) {
        el.textContent = val;
        for (var i = 0; i < vdom.children.length; i++) {
          vdom.children[i].meta.shouldRender = false;
        }
      };
    
      directives[Moon.config.prefix + "html"] = function (el, val, vdom) {
        el.innerHTML = val;
        for (var i = 0; i < vdom.children.length; i++) {
          vdom.children[i].meta.shouldRender = false;
        }
      };
    
      directives[Moon.config.prefix + "mask"] = function (el, val, vdom) {};
    
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
      var self = this;
      this.$data[key] = val;
      if (!this.$queued && !this.$destroyed) {
        this.$queued = true;
        setTimeout(function () {
          self.build();
          callHook(self, 'updated');
          self.$queued = false;
        }, 0);
      }
    };
    
    /**
     * Destroys Moon Instance
     */
    Moon.prototype.destroy = function () {
      this.removeEvents();
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
      diff(node, vnode, parent, this);
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
      callHook(this, 'created');
    
      if (this.$opts.el) {
        this.mount(this.$opts.el);
      }
    };
    
    /* ======= Global API ======= */
    
    /**
     * Configuration of Moon
     */
    Moon.config = {
      silent: false,
      prefix: "m-"
    };
    
    /**
     * Version of Moon
     */
    Moon.version = '0.1.3';
    
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
      opts.parent = parent;
    
      function MoonComponent() {
        Moon.call(this, opts);
      }
    
      MoonComponent.prototype = Object.create(Parent.prototype);
      MoonComponent.prototype.constructor = MoonComponent;
    
      MoonComponent.prototype.init = function () {
        this.$destroyed = false;
        this.$props = this.$opts.props || [];
    
        this.$template = this.$opts.template;
    
        if (this.$render === noop) {
          this.$render = Moon.compile(this.$template);
        }
      };
    
      MoonComponent.prototype.build = function () {
        this.$parent.build();
      };
    
      components[name] = MoonComponent;
      return MoonComponent;
    };
    return Moon;
}));
