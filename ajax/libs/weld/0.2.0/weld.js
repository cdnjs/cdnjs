
;(function(window) {

  /*  Returns an array of all own enumerable properties found upon a given object, 
   *  in the same order as that provided by a for-in loop (the difference being that 
   *  a for-in loop enumerates properties in the prototype chain as well).
   */

  if(!Object.keys) {
    Object.keys = function(o){
      var ret=[],p;
      for(p in o) {
        if(Object.prototype.hasOwnProperty.call(o,p)) {
         ret.push(p);
        }
      }
      return ret;
    };
  }
  
  /*  Since weld runs browser/server, ensure there is a console implementation.
   */

  window.console || (console = { log: function(){} });
  var color = { gray: '\033[37m', darkgray: '\033[40;30m', red: '\033[31m', green: '\033[32m', yellow: '\033[33m', 
                lightblue: '\033[1;34m', cyan: '\033[36m', white: '\033[1;37m' };

  /*  Weld!
   *  @param {HTMLElement} DOMTarget
   *    The target html node that will be used as the subject of data binding.
   *  @param {Object|Array} data
   *    The data that will be used.
   *  @param {Object} pconfig
   *    The configuration object.
   */
  window.weld = function(DOMTarget, data, pconfig) {

    var
    
    /*
     *  Configuration Object.
     *  @member {Object}
     *    Contains an explicit mapping of data-keys to element name/id/classes
     *  @member {Boolean}
     *    Determines if debugging will be enabled.
     *  @method {Boolean|Function}
     *    Determines the method of insertion, can be a functon or false.
     */
    
    config = {
      alias : {},
      debug : false,
      insert: false // Default to append
    },
    
    /*  The current depth of the traversal, used for debugging.
     */
    
    depth = 0,
    nodejs = navigator.userAgent.toLowerCase().indexOf('node.js') !== -1,
    successIndicator = nodejs ? (color.green + ' ✓' + color.gray) : ' Success',
    failureIndicator = nodejs ? (color.red + ' ✗' + color.gray) : ' Fail',
    
    /*  Generates padding used for indenting debugger statements.
     */
    
    pad = function() {
      var l = depth, ret = '';
      while(l--) {
        ret += nodejs ? ' │   ' : ' |   ';
      }
      return ret;
    },
    
    /*  Debugger statement, terse, accepts any number of arguments 
     *  that are passed to a console.log statement.
     */

    d = function() {
      if (config.debug) {
        var args = Array.prototype.slice.call(arguments);

        // This is done because on the browser you cannot call console.log.apply
        console.log(pad(), args.join(' '));
      }
    },

    colorize = function(val) {
      var sval = val+'', u='undefined';
      if(nodejs) {
        if(sval === 'false' || sval === 'null' || sval === '' || sval === u || typeof val === u || val === false) {
          if(sval === '') { sval = '(empty string)' };
          return color.red + sval + color.gray;
        }
        else {
          return color.yellow + sval + color.gray;
        }
      }
      return sval;
    },

    /*  An interface to the interal operations, implements common 
     *  debugging output based on a standard set of parameters.
     *  
     *  @param {Function} operation
     *    The function to call in "debug mode"
     */

    debuggable  = function(name, operation) {
      var label = name.toUpperCase();
      // All of the ops have the same signature, so this is sane.
      return function(parent, element, key, value) {
        console.log(pad(), 
          ((nodejs ? (color.gray + '┌ ') : '+ ') + label + ' -'),
            'parent:', colorize(parent) + ',', 
            'element:', colorize(element) + ',', 
            'key:', colorize(key) + ',', 
            'value:', colorize(value));
        depth+=1;


        if (operation) {

          var res = operation(parent, element, key, value);
          depth-=1;
          console.log(pad(), (nodejs ? '└ ' : '+ ') + element + '' + (res !== false ? successIndicator : failureIndicator));
          return res;
        }

        if (config.debug) {
          depth-=1;
          d('- OPERATION NOT FOUND: ', label);
        }
      };
    },
    ops = {
      siblings : function(parent, element, key, value) {
        var remove = [],
        sibling,
        classes,
        cc,
        match,
        siblings = parent.children;
        cs = siblings.length; // Current Sibling
        element.weld = {
          parent  : parent,
          classes : element.className.split(' ')
        };

        // Find all siblings that match the exact classes that exist in the originally
        // matched element node
        while (cs--) {
          sibling = siblings[cs];

          if (sibling === element) {
            // If this is not the last item in the list, store where new items should be inserted
            if (cs < siblings.length) {
              element.weld.insertBefore = siblings[cs+1];
            }

            // remove the element here because siblings is a live list.
            // which means, if you remove it before hand, the length will mismatch and cause problems
            d('- REMOVE - element:', colorize(element), 'class:', colorize(element.className), 'id:', colorize(element.id));

            parent.removeChild(element);

          // Check for the same class
          } else {
            classes      = sibling.className.split(' ');
            cc = classes.length;
            match        = true;
            while (cc--) {
              // TODO: optimize
              if (element.weld.classes.indexOf(classes[cc]) < 0) {
                match = false;
                break;
              }
            }

            // This element matched, you win a prize! DIE.
            if (match) {
              d('- REMOVE - element:', colorize(sibling), 'class:', colorize(sibling.className), 'id:', colorize(sibling.id));
              parent.removeChild(sibling);
            }
          }
        }
      },
      traverse : function(parent, element, key, value) {
        // LEAF
        if (typeof value === 'string' || (value && value.nodeType)) {
          ops.set(parent, element, key, value);
        // Object / Array-like
        } else {
          var
          target,
          i,
          keys, l,
          array = (value.length && value[0]),
          template = element,
          templateParent = element.parentNode;

          if (array && templateParent) {
            ops.siblings(templateParent, template, key, value);
          } else if (array && template.weld && template.weld.parent) {
            templateParent = template.weld.parent;
          } else {
            // TODO: we may need to do more checking with this
            templateParent = template;
          }

          if (array) {
            l = value.length;
          } else if (typeof value === 'object') {
            keys = Object.keys(value);
            l = keys.length;
          }

          for (i=0; i<l; i++) {
            key = (keys) ? keys[i] : i;
            
            if (array) {

              d('- CLONE - element:', colorize(element), 'class:', colorize(element.className), 'id:', colorize(element.id));
              target = element.cloneNode(true);
              target.weld = {};
              if (element.weld) {
                for (var weldParam in element.weld) {
                  if (element.weld.hasOwnProperty(weldParam)) {
                    target.weld[weldParam] = element.weld[weldParam];
                  }
                }
              }
              ops.traverse(templateParent, target, key, value[key]);
              ops.insert(templateParent, target);

            } else {
              target = ops.match(templateParent, element, key, value[key]);
              if (target) {
                ops.traverse(templateParent, target, key, value[key]);
              }
            }
          }
        }
      },
      insert      : function(parent, element) {
        if (element.weld && element.weld.insertBefore) {
          parent.insertBefore(element, element.weld.insertBefore);
        } else {
          parent.appendChild(element);
        }
      },
      elementType : function(parent, element, key, value) {
        if (element) {
          var nodeName = element.nodeName,
              input    = /input|select|textarea|option|button/i,
              image    = /img/i;

          if (typeof nodeName === "string") {
            if (input.test(nodeName)) {
              return 'input';
            }

            if (image.test(nodeName)) {
              return 'image';
            }
          }
        }
      },
      map : false, // this is a user-defined operation
      set : function(parent, element, key, value) {

        if(config.map && ops.map(parent, element, key, value) === false) {
          return false;
        }
        
        if(config.debug) {
          d('- SET: value is', value.tagName);
        }        

        var type = ops.elementType(parent, element, key, value), res = false;

        if (value && value.nodeType) { // imports.
          
          if (element.ownerDocument !== value.ownerDocument) {
            value = element.ownerDocument.importNode(value, true);
          } else if (value.parentNode) {
            value.parentNode.removeChild(value);
          }

          while (element.firstChild) { // clean first.
            element.removeChild(element.firstChild);
          }

          element.appendChild(value);
          res = true;
        }
        else if (type === 'input') { // special cases.
          element.setAttribute('value', value);
          res = true;
        }
        else if (type === 'image') {
          element.setAttribute('src', value);
          res = true;
        }
        else { // simple text assignment.
          // clean first.
          while (element.firstChild) { 
            element.removeChild(element.firstChild);
          }
          element.appendChild(document.createTextNode(value)); // Create a new text node with the new value
          res = true;
        }
        return res;
      },
      match : function(parent, element, key, value) {

        if(typeof config.alias[key] !== 'undefined') {
          if(typeof config.alias[key] === 'function') {
            key = config.alias[key](parent, element, key, value) || key;
          }
          else if(config.alias[key] === false) {
            return false;
          }
          else {
            key = config.alias[key];
          }
        }
        
        // Alias can be a node, for explicit binding. 
        // Alias can also be a method that returns a string or DOMElement
        if (key && key.nodeType) {
          return key;
        }

        if(element) {
          if(element.querySelectorAll) {
            selector = ['.' + key, '#' + key, '[name="' + key + '"]'].join(',');
            return element.querySelectorAll(selector)[0];
          }
          else {
            var els = element.getElementsByTagName('*'), l = els.length, e, i;
            // find the _first_ best match
            for (i=0; i<l; i++) {
              e = els[i];
              if(e.id === key || e.name === key || e.className.split(' ').indexOf(key) > -1) {
                return e;
              }
            }
          }
        }
      }
    },
    parent = DOMTarget.parentNode,
    opKeys = Object.keys(ops),
    currentOpKey = opKeys.length,
    currentOp;

    // Merge the user configuration over the existing config
    if(pconfig) {
      for(var p in pconfig) {
        if (pconfig.hasOwnProperty(p)) {
          config[p] = pconfig[p];
        }
      }
    }

    // Allow the caller to overwrite the internals of weld
    while(currentOpKey--) {
      currentOp = opKeys[currentOpKey];
      var fn = (config[currentOp]) ? 
                config[currentOp]  :
                ops[currentOp];

      if (config.debug) {
        fn = debuggable(currentOp, fn);
      }

      ops[currentOp] = fn;
    }

    // Kick it off
    ops.traverse(null, DOMTarget, null, data);

    if (config.debug) {
      console.log(parent.innerHTML);
    }
  };

})(window);