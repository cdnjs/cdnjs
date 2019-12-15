/*
* Moon 0.1.1
* Copyright 2016, Kabir Shah
* https://github.com/KingPixil/moon/
* Free to use under the MIT license.
* https://kingpixil.github.io/license
*/

"use strict";
(function(window) {
    var config = {
      silent: false
    }
    var directives = {};
    var components = {};

    /**
    * Converts attributes into key-value pairs
    * @param {Node} node
    * @return {Object} Key-Value pairs of Attributes
    */
    var extractAttrs = function(node) {
      var attrs = {};
      if(!node.attributes) return attrs;
      var rawAttrs = node.attributes;
      for(var i = 0; i < rawAttrs.length; i++) {
        attrs[rawAttrs[i].name] = rawAttrs[i].value
      }

      return attrs;
    }

    /**
    * Compiles a template with given data
    * @param {String} template
    * @param {Object} data
    * @return {String} Template with data rendered
    */
    var compileTemplate = function(template, data) {
      var code = template,
          re = /{{([A-Za-z0-9_.\[\]]+)}}/gi;
      code.replace(re, function(match, p) {
        code = code.replace(match, "` + data." + p + " + `");
      });
      var compile = new Function("data", "var out = `" + code + "`; return out");
      var output = compile(data);
      return output;
    }

    /**
    * Gets Root Element
    * @param {String} html
    * @return {Node} Root Element
    */
    var getRootElement = function(html) {
      var dummy = document.createElement('div');
      dummy.innerHTML = html;
      return dummy.firstChild;
    }

    /**
    * Merges two Objects
    * @param {Object} obj
    * @param {Object} obj2
    * @return {Object} Merged Objects
    */
    function merge(obj, obj2) {
      for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) obj[key] = obj2[key];
      }
      return obj;
    }

    function Moon(opts) {
        var _el = opts.el;
        var _data = opts.data;
        var _methods = opts.methods;
        var _hooks = opts.hooks || {created: function() {}, mounted: function() {}, updated: function() {}, destroyed: function() {}};
        var _destroyed = false;
        var self = this;
        this.$el = document.querySelector(_el);
        this.$components = merge(opts.components || {}, components);
        this.$dom = {type: this.$el.nodeName, children: [], node: this.$el};

        // Change state when $data is changed
        Object.defineProperty(this, '$data', {
            get: function() {
                return _data;
            },
            set: function(value) {
                _data = value;
                this.build(this.$dom.children);
            },
            configurable: true
        });

        /**
        * Logs a Message
        * @param {String} msg
        */
        this.log = function(msg) {
          if(!config.silent) console.log(msg);
        }

        /**
        * Throws an Error
        * @param {String} msg
        */
        this.error = function(msg) {
          console.log("Moon ERR: " + msg);
        }

        /**
        * Creates an object to be used in a Virtual DOM
        * @param {String} type
        * @param {Array} children
        * @param {String} val
        * @param {Object} props
        * @param {Node} node
        * @return {Object} Object usable in Virtual DOM
        */
        this.createElement = function(type, children, val, props, node) {
          return {type: type, children: children, val: val, props: props, node: node};
        }

        /**
        * Create Elements Recursively For all Children
        * @param {Array} children
        * @return {Array} Array of elements usable in Virtual DOM
        */
        this.recursiveChildren = function(children) {
          var recursiveChildrenArr = [];
          for(var i = 0; i < children.length; i++) {
            var child = children[i];
            recursiveChildrenArr.push(this.createElement(child.nodeName, this.recursiveChildren(child.childNodes), child.textContent, extractAttrs(child), child));
          }
          return recursiveChildrenArr;
        }

        /**
        * Creates Virtual DOM
        * @param {Node} node
        */
        this.createVirtualDOM = function(node) {
          var vdom = this.createElement(node.nodeName, this.recursiveChildren(node.childNodes), node.textContent, extractAttrs(node), node);
          this.$dom = vdom;
        }

        /**
        * Turns Custom Components into their Corresponding Templates
        */
        this.componentsToHTML = function() {
          for(var component in this.$components) {
            var componentsFound = document.getElementsByTagName(component);
            componentsFound = Array.prototype.slice.call(componentsFound);
            for(var i = 0; i < componentsFound.length; i++) {
              var componentFound = componentsFound[i];
              var componentProps = extractAttrs(componentFound);
              var componentDummy = getRootElement(this.$components[component].template);
              for(var attr in componentProps) {
                componentDummy.setAttribute(attr, componentProps[attr]);
              }
              componentFound.outerHTML = componentDummy.outerHTML;
            }
          }
        }

        /**
        * Sets Value in Data
        * @param {String} key
        * @param {String} val
        */
        this.set = function(key, val) {
          this.$data[key] = val;
          if(!_destroyed) this.build(this.$dom.children);
          if(_hooks.updated) {
            _hooks.updated();
          }
        }

        /**
        * Gets Value in Data
        * @param {String} key
        * @return {String} Value of key in data
        */
        this.get = function(key) {
          return this.$data[key];
        }

        /**
        * Calls a method
        * @param {String} method
        */
        this.method = function(method) {
          _methods[method]();
        }


        this.destroy = function() {
          Object.defineProperty(this, '$data', {
            set: function(value) {
              _data = value;
            }
          });
          _destroyed = true;
          if(_hooks.destroyed) _hooks.destroyed();
        }

        // Default Directives
        directives["m-if"] = function(el, val, vdom) {
          var evaluated = new Function("return " + val);
          if(!evaluated()) {
            el.textContent = "";
          } else {
            el.textContent = compileTemplate(vdom.val, self.$data);
          }
        }

        directives["m-show"] = function(el, val, vdom) {
          var evaluated = new Function("return " + val);
          if(!evaluated()) {
            el.style.display = '';
          } else {
            el.style.display = 'block';
          }
        }

        directives["m-on"] = function(el, val, vdom) {
          var splitVal = val.split(":");
          var eventToCall = splitVal[0];
          var methodToCall = splitVal[1];
          el.addEventListener(eventToCall, function() {
            self.method(methodToCall);
          });
          el.removeAttribute("m-on");
          delete vdom.props["m-on"];
        }

        directives["m-model"] = function(el, val, vdom) {
          el.value = self.get(val);
          el.addEventListener("input", function() {
            self.set(val, el.value);
          });
          el.removeAttribute("m-model");
          delete vdom.props["m-model"];
        }

        directives["m-once"] = function(el, val, vdom) {
          vdom.val = el.textContent;
          for(var child in vdom.children) {
            vdom.children[child].val = compileTemplate(vdom.children[child].val, self.$data);
          }
        }

        directives["m-text"] = function(el, val, vdom) {
          el.textContent = val;
        }

        directives["m-html"] = function(el, val, vdom) {
          el.innerHTML = val;
        }

        directives["m-mask"] = function(el, val, vdom) {

        }

        // directives["m-for"] = function(el, val, vdom) {
        //   var splitVal = val.split(" in ");
        //   var alias = splitVal[0];
        //   var arr = self.get(splitVal[1]);
        //   var clone = el.cloneNode(true);
        //   var oldVal = vdom.val;
        //   var compilable = vdom.val.replace(new RegExp(alias, "gi"), splitVal[1] + '[0]');
        //   el.innerHTML = compileTemplate(compilable, self.$data);
        //   for(var i = 1; i < arr.length; i++) {
        //     var newClone = clone.cloneNode(true);
        //     var compilable = oldVal.replace(new RegExp(alias, "gi"), splitVal[1] + '[' + i + ']');
        //     newClone.innerHTML = compileTemplate(compilable, self.$data);
        //     var parent = el.parentNode;
        //     parent.appendChild(newClone);
        //   }
        //   vdom.val = el.textContent;
        //   delete vdom.props["m-for"];
        // }

        /**
        * Builds the DOM With Data
        * @param {Array} children
        */
        this.build = function(children) {
          for(var i = 0; i < children.length; i++) {
            var el = children[i];

            if(el.type === "#text") {
              el.node.textContent = compileTemplate(el.val, this.$data);
            } else if(el.props) {
              for(var prop in el.props) {
                var propVal = el.props[prop];
                var compiledProperty = compileTemplate(propVal, this.$data);
                var directive = directives[prop];
                if(directive) {
                  el.node.removeAttribute(prop);
                  directive(el.node, compiledProperty, el);
                }

                if(!directive) el.node.setAttribute(prop, compiledProperty);
              }
            }

            this.build(el.children);
          }
        }

        /**
        * Initializes Moon
        */
        this.init = function() {
          this.log("======= Moon =======");
          if(_hooks.created) {
            _hooks.created();
          }
          this.componentsToHTML();
          this.createVirtualDOM(this.$el);
          this.build(this.$dom.children);
          if(_hooks.mounted) {
            _hooks.mounted();
          }
        }

        // Initialize 🎉
        this.init();
    }

    /**
    * Sets the Configuration of Moon
    * @param {Object} opts
    */
    Moon.config = function(opts) {
      if(opts.silent) {
        config.silent = opts.silent;
      }
    }

    /**
    * Runs an external Plugin
    * @param {Object} plugin
    */
    Moon.use = function(plugin) {
      plugin.init(Moon);
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
    * @param {Function} action
    */
    Moon.component = function(name, action) {
      components[name] = action;
    }

    /**
    * Makes an AJAX Request
    * @param {String} method
    * @param {String} url
    * @param {Object} params
    * @param {Function} cb
    */
    Moon.ajax = function(method, url, params, cb) {
      var xmlHttp = new XMLHttpRequest();
      method = method.toUpperCase();
      if(typeof params === "function") {
        cb = params;
      }
      var urlParams = "?";
      if(method === "POST") {
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        for(var param in params) {
          urlParams += param + "=" + params[param] + "&";
        }
      }
      xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        cb(JSON.parse(xmlHttp.responseText));
      }
      xmlHttp.open(method, url, true);
      xmlHttp.send(method === "POST" ? urlParams : null);
    }

    window.Moon = Moon;
    window.$ = function(el) {
      el = document.querySelectorAll(el);
      return el.length === 1 ? el[0] : el;
    }

})(window);
