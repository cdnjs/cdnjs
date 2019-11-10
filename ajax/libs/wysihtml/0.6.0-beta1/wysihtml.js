/**
 * @license wysihtml v0.6.0-beta1
 * https://github.com/Voog/wysihtml
 *
 * Author: Christopher Blum (https://github.com/tiff)
 * Secondary author of extended features: Oliver Pulges (https://github.com/pulges)
 *
 * Copyright (C) 2012 XING AG
 * Licensed under the MIT license (MIT)
 *
 */
var wysihtml = {
  version: '0.6.0-beta1',

  // namespaces
  commands:   {},
  dom:        {},
  quirks:     {},
  toolbar:    {},
  lang:       {},
  selection:  {},
  views:      {},

  editorExtenders: [],
  extendEditor: function(extender) {
    this.editorExtenders.push(extender);
  },

  INVISIBLE_SPACE: '\uFEFF',
  INVISIBLE_SPACE_REG_EXP: /\uFEFF/g,

  VOID_ELEMENTS: 'area, base, br, col, embed, hr, img, input, keygen, link, meta, param, source, track, wbr',
  PERMITTED_PHRASING_CONTENT_ONLY: 'h1, h2, h3, h4, h5, h6, p, pre',

  EMPTY_FUNCTION: function() {},

  ELEMENT_NODE: 1,
  TEXT_NODE:    3,

  BACKSPACE_KEY:  8,
  ENTER_KEY:      13,
  ESCAPE_KEY:     27,
  SPACE_KEY:      32,
  TAB_KEY:        9,
  DELETE_KEY:     46
};

wysihtml.polyfills = function(win, doc) {

  var methods = {

    // Safary has a bug of not restoring selection after node.normalize correctly.
    // Detects the misbegaviour and patches it
    normalizeHasCaretError: function() {
      if ("createRange" in doc && "getSelection" in win) {
        var originalTarget,
            scrollTop = window.pageYOffset,
            scrollLeft = window.pageXOffset,
            e = doc.createElement('div'),
            t1 = doc.createTextNode('a'),
            t2 = doc.createTextNode('a'),
            t3 = doc.createTextNode('a'),
            r = doc.createRange(),
            s, ret;

        if (document.activeElement) {
          if (document.activeElement.nodeType === 1 && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].indexOf(document.activeElement.nodeName) > -1) {
            originalTarget = {
              type: 'form',
              node: document.activeElement,
              start: document.activeElement.selectionStart,
              end: document.activeElement.selectionEnd,
            };
          } else {
            s = win.getSelection();
            if (s && s.anchorNode) {
              originalTarget = {
                type: 'range',
                anchorNode: s.anchorNode,
                anchorOffset: s.anchorOffset,
                focusNode: s.focusNode,
                focusOffset: s.focusOffset
              };
            }
          }
        }

        e.setAttribute('contenteditable', 'true');
        e.appendChild(t1);
        e.appendChild(t2);
        e.appendChild(t3);
        doc.body.appendChild(e);
        r.setStart(t2, 1);
        r.setEnd(t2, 1);

        s = win.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        e.normalize();
        s = win.getSelection();

        ret = (e.childNodes.length !== 1 || s.anchorNode !== e.firstChild || s.anchorOffset !== 2);
        e.parentNode.removeChild(e);
        s.removeAllRanges();

        if (originalTarget) {
          if (originalTarget.type === 'form') {
            // The selection parameters are not present for all form elements
            if (typeof originalTarget.start !== 'undefined' && typeof originalTarget.end !== 'undefined') {
              originalTarget.node.setSelectionRange(originalTarget.start, originalTarget.end);
            }
            originalTarget.node.focus();
          } else if (originalTarget.type === 'range') {
            r = doc.createRange();
            r.setStart(originalTarget.anchorNode, originalTarget.anchorOffset);
            r.setEnd(originalTarget.focusNode, originalTarget.focusOffset);
            s.addRange(r);
          }
        }

        if (scrollTop !== window.pageYOffset || scrollLeft !== window.pageXOffset) {
          win.scrollTo(scrollLeft, scrollTop);
        }

        return ret;
      }
    },

    apply: function() {
      // closest, matches, and remove polyfill
      // https://github.com/jonathantneal/closest
      (function (ELEMENT) {
        ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector || function matches(selector) {
          var
          element = this,
          elements = (element.document || element.ownerDocument).querySelectorAll(selector),
          index = 0;

          while (elements[index] && elements[index] !== element) {
            ++index;
          }

          return elements[index] ? true : false;
        };

        ELEMENT.closest = ELEMENT.closest || function closest(selector) {
          var element = this;

          while (element) {
            if (element.matches(selector)) {
              break;
            }

            element = element.parentElement;
          }

          return element;
        };

        ELEMENT.remove = ELEMENT.remove || function remove() {
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        };

      }(win.Element.prototype));

      if (!('classList' in doc.documentElement) && win.Object.defineProperty && typeof win.HTMLElement !== 'undefined') {
        win.Object.defineProperty(win.HTMLElement.prototype, 'classList', {
          get: function() {
            var self = this;
            function update(fn) {
              return function(value) {
                var classes = self.className.split(/\s+/),
                    index = classes.indexOf(value);

                fn(classes, index, value);
                self.className = classes.join(' ');
              };
            }

            var ret = {
                add: update(function(classes, index, value) {
                  ~index || classes.push(value);
                }),

                remove: update(function(classes, index) {
                  ~index && classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                  ~index ? classes.splice(index, 1) : classes.push(value);
                }),

                contains: function(value) {
                  return !!~self.className.split(/\s+/).indexOf(value);
                },

                item: function(i) {
                  return self.className.split(/\s+/)[i] || null;
                }
              };

            win.Object.defineProperty(ret, 'length', {
              get: function() {
                return self.className.split(/\s+/).length;
              }
            });

            return ret;
          }
        });
      }

      var getTextNodes = function(node){
        var all = [];
        for (node=node.firstChild;node;node=node.nextSibling){
          if (node.nodeType == 3) {
              all.push(node);
          } else {
            all = all.concat(getTextNodes(node));
          }
        }
        return all;
      };

      var isInDom = function(node) {
        var doc = node.ownerDocument,
            n = node;

        do {
          if (n === doc) {
            return true;
          }
          n = n.parentNode;
        } while(n);

        return false;
      };

      var normalizeFix = function() {
        var f = win.Node.prototype.normalize;
        var nf = function() {
          var texts = getTextNodes(this),
              s = this.ownerDocument.defaultView.getSelection(),
              anode = s.anchorNode,
              aoffset = s.anchorOffset,
              aelement = anode && anode.nodeType === 1 && anode.childNodes.length > 0 ? anode.childNodes[aoffset] : undefined,
              fnode = s.focusNode,
              foffset = s.focusOffset,
              felement = fnode && fnode.nodeType === 1 && foffset > 0 ? fnode.childNodes[foffset -1] : undefined,
              r = this.ownerDocument.createRange(),
              prevTxt = texts.shift(),
              curText = prevTxt ? texts.shift() : null;

          if (felement && felement.nodeType === 3) {
            fnode = felement;
            foffset = felement.nodeValue.length;
            felement = undefined;
          }

          if (aelement && aelement.nodeType === 3) {
            anode = aelement;
            aoffset = 0;
            aelement = undefined;
          }

          if ((anode === fnode && foffset < aoffset) || (anode !== fnode && (anode.compareDocumentPosition(fnode) & win.Node.DOCUMENT_POSITION_PRECEDING) && !(anode.compareDocumentPosition(fnode) & win.Node.DOCUMENT_POSITION_CONTAINS))) {
            fnode = [anode, anode = fnode][0];
            foffset = [aoffset, aoffset = foffset][0];
          }

          while(prevTxt && curText) {
            if (curText.previousSibling && curText.previousSibling === prevTxt) {
              if (anode === curText) {
                anode = prevTxt;
                aoffset = prevTxt.nodeValue.length +  aoffset;
              }
              if (fnode === curText) {
                fnode = prevTxt;
                foffset = prevTxt.nodeValue.length +  foffset;
              }
              prevTxt.nodeValue = prevTxt.nodeValue + curText.nodeValue;
              curText.parentNode.removeChild(curText);
              curText = texts.shift();
            } else {
              prevTxt = curText;
              curText = texts.shift();
            }
          }

          if (felement) {
            foffset = Array.prototype.indexOf.call(felement.parentNode.childNodes, felement) + 1;
          }

          if (aelement) {
            aoffset = Array.prototype.indexOf.call(aelement.parentNode.childNodes, aelement);
          }

          if (isInDom(this) && anode && anode.parentNode && fnode && fnode.parentNode) {
            r.setStart(anode, aoffset);
            r.setEnd(fnode, foffset);
            s.removeAllRanges();
            s.addRange(r);
          }
        };
        win.Node.prototype.normalize = nf;
      };

      var F = function() {
        win.removeEventListener("load", F);
        if ("Node" in win && "normalize" in win.Node.prototype && methods.normalizeHasCaretError()) {
          normalizeFix();
        }
      };

      if (doc.readyState !== "complete") {
        win.addEventListener("load", F);
      } else {
        F();
      }

      // CustomEvent for ie9 and up
      function nativeCustomEventSupported() {
        try {
          var p = new win.CustomEvent('cat', {detail: {foo: 'bar'}});
          return  'cat' === p.type && 'bar' === p.detail.foo;
        } catch (e) {}
        return false;
      }

      // Polyfills CustomEvent object for IE9 and up
      (function() {
        if (!nativeCustomEventSupported() && "CustomEvent" in win) {
          function CustomEvent(event, params) {
            params = params || {bubbles: false, cancelable: false, detail: undefined};
            var evt = doc.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
          }
          CustomEvent.prototype = win.Event.prototype;
          win.CustomEvent = CustomEvent;
        }
      })();
    }
  }

  return methods;
};

wysihtml.polyfills(window, document).apply();

/*
	Base.js, version 1.1a
	Copyright 2006-2010, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
	// dummy
};

Base.extend = function(_instance, _static) { // subclass
	var extend = Base.prototype.extend;
	
	// build the prototype
	Base._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
  proto.base = function() {
    // call this method from any other method to invoke that method's ancestor
  };
	delete Base._prototyping;
	
	// create the wrapper for the constructor function
	//var constructor = proto.constructor.valueOf(); //-dean
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Base._prototyping) {
			if (this._constructing || this.constructor == klass) { // instantiation
				this._constructing = true;
				constructor.apply(this, arguments);
				delete this._constructing;
			} else if (arguments[0] != null) { // casting
				return (arguments[0].extend || extend).call(arguments[0], proto);
			}
		}
	};
	
	// build the class interface
	klass.ancestor = this;
	klass.extend = this.extend;
	klass.forEach = this.forEach;
	klass.implement = this.implement;
	klass.prototype = proto;
	klass.toString = this.toString;
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
		return (type == "object") ? klass : constructor.valueOf();
	};
	extend.call(klass, _static);
	// class initialisation
	if (typeof klass.init == "function") klass.init();
	return klass;
};

Base.prototype = {	
	extend: function(source, value) {
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			if (ancestor && (typeof value == "function") && // overriding a method?
				// the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
				// get the underlying method
				var method = value.valueOf();
				// override
				value = function() {
					var previous = this.base || Base.prototype.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function(type) {
					return (type == "object") ? value : method;
				};
				value.toString = Base.toString;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Base.prototype.extend;
			// if this object has a customised extend method then use it
			if (!Base._prototyping && typeof this != "function") {
				extend = this.extend || extend;
			}
			var proto = {toSource: null};
			// do the "toString" and other methods manually
			var hidden = ["constructor", "toString", "valueOf"];
			// if we are prototyping then include the constructor
			var i = Base._prototyping ? 0 : 1;
			while (key = hidden[i++]) {
				if (source[key] != proto[key]) {
					extend.call(this, key, source[key]);

				}
			}
			// copy each of the source object's properties to this object
			for (var key in source) {
				if (!proto[key]) extend.call(this, key, source[key]);
			}
		}
		return this;
	}
};

// initialise
Base = Base.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}
}, {
	ancestor: Object,
	version: "1.1",
	
	forEach: function(object, block, context) {
		for (var key in object) {
			if (this.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	},
		
	implement: function() {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "function") {
				// if it's a function, call it
				arguments[i](this.prototype);
			} else {
				// add the interface using the extend method
				this.prototype.extend(arguments[i]);
			}
		}
		return this;
	},
	
	toString: function() {
		return String(this.valueOf());
	}
});
/**
 * Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Copyright 2015, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.1-dev
 * Build date: 20 May 2015
 *
 * NOTE: UMD wrapper removed manually for bundling (Oliver Pulges)
 */
var rangy;

(function() {
    var OBJECT = "object", FUNCTION = "function", UNDEFINED = "undefined";

    // Minimal set of properties required for DOM Level 2 Range compliance. Comparison constants such as START_TO_START
    // are omitted because ranges in KHTML do not have them but otherwise work perfectly well. See issue 113.
    var domRangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
        "commonAncestorContainer"];

    // Minimal set of methods required for DOM Level 2 Range compliance
    var domRangeMethods = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore",
        "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents",
        "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"];

    var textRangeProperties = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"];

    // Subset of TextRange's full set of methods that we're interested in
    var textRangeMethods = ["collapse", "compareEndPoints", "duplicate", "moveToElementText", "parentElement", "select",
        "setEndPoint", "getBoundingClientRect"];

    /*----------------------------------------------------------------------------------------------------------------*/

    // Trio of functions taken from Peter Michaux's article:
    // http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
    function isHostMethod(o, p) {
        var t = typeof o[p];
        return t == FUNCTION || (!!(t == OBJECT && o[p])) || t == "unknown";
    }

    function isHostObject(o, p) {
        return !!(typeof o[p] == OBJECT && o[p]);
    }

    function isHostProperty(o, p) {
        return typeof o[p] != UNDEFINED;
    }

    // Creates a convenience function to save verbose repeated calls to tests functions
    function createMultiplePropertyTest(testFunc) {
        return function(o, props) {
            var i = props.length;
            while (i--) {
                if (!testFunc(o, props[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    // Next trio of functions are a convenience to save verbose repeated calls to previous two functions
    var areHostMethods = createMultiplePropertyTest(isHostMethod);
    var areHostObjects = createMultiplePropertyTest(isHostObject);
    var areHostProperties = createMultiplePropertyTest(isHostProperty);

    function isTextRange(range) {
        return range && areHostMethods(range, textRangeMethods) && areHostProperties(range, textRangeProperties);
    }

    function getBody(doc) {
        return isHostObject(doc, "body") ? doc.body : doc.getElementsByTagName("body")[0];
    }

    var forEach = [].forEach ?
        function(arr, func) {
            arr.forEach(func);
        } :
        function(arr, func) {
            for (var i = 0, len = arr.length; i < len; ++i) {
                func(arr[i], i);
            }
        };

    var modules = {};

    var isBrowser = (typeof window != UNDEFINED && typeof document != UNDEFINED);

    var util = {
        isHostMethod: isHostMethod,
        isHostObject: isHostObject,
        isHostProperty: isHostProperty,
        areHostMethods: areHostMethods,
        areHostObjects: areHostObjects,
        areHostProperties: areHostProperties,
        isTextRange: isTextRange,
        getBody: getBody,
        forEach: forEach
    };

    var api = {
        version: "1.3.1-dev",
        initialized: false,
        isBrowser: isBrowser,
        supported: true,
        util: util,
        features: {},
        modules: modules,
        config: {
            alertOnFail: false,
            alertOnWarn: false,
            preferTextRange: false,
            autoInitialize: (typeof rangyAutoInitialize == UNDEFINED) ? true : rangyAutoInitialize
        }
    };

    function consoleLog(msg) {
        if (typeof console != UNDEFINED && isHostMethod(console, "log")) {
            console.log(msg);
        }
    }

    function alertOrLog(msg, shouldAlert) {
        if (isBrowser && shouldAlert) {
            alert(msg);
        } else  {
            consoleLog(msg);
        }
    }

    function fail(reason) {
        api.initialized = true;
        api.supported = false;
        alertOrLog("Rangy is not supported in this environment. Reason: " + reason, api.config.alertOnFail);
    }

    api.fail = fail;

    function warn(msg) {
        alertOrLog("Rangy warning: " + msg, api.config.alertOnWarn);
    }

    api.warn = warn;

    // Add utility extend() method
    var extend;
    if ({}.hasOwnProperty) {
        util.extend = extend = function(obj, props, deep) {
            var o, p;
            for (var i in props) {
                if (props.hasOwnProperty(i)) {
                    o = obj[i];
                    p = props[i];
                    if (deep && o !== null && typeof o == "object" && p !== null && typeof p == "object") {
                        extend(o, p, true);
                    }
                    obj[i] = p;
                }
            }
            // Special case for toString, which does not show up in for...in loops in IE <= 8
            if (props.hasOwnProperty("toString")) {
                obj.toString = props.toString;
            }
            return obj;
        };

        util.createOptions = function(optionsParam, defaults) {
            var options = {};
            extend(options, defaults);
            if (optionsParam) {
                extend(options, optionsParam);
            }
            return options;
        };
    } else {
        fail("hasOwnProperty not supported");
    }

    // Test whether we're in a browser and bail out if not
    if (!isBrowser) {
        fail("Rangy can only run in a browser");
    }

    // Test whether Array.prototype.slice can be relied on for NodeLists and use an alternative toArray() if not
    (function() {
        var toArray;

        if (isBrowser) {
            var el = document.createElement("div");
            el.appendChild(document.createElement("span"));
            var slice = [].slice;
            try {
                if (slice.call(el.childNodes, 0)[0].nodeType == 1) {
                    toArray = function(arrayLike) {
                        return slice.call(arrayLike, 0);
                    };
                }
            } catch (e) {}
        }

        if (!toArray) {
            toArray = function(arrayLike) {
                var arr = [];
                for (var i = 0, len = arrayLike.length; i < len; ++i) {
                    arr[i] = arrayLike[i];
                }
                return arr;
            };
        }

        util.toArray = toArray;
    })();

    // Very simple event handler wrapper function that doesn't attempt to solve issues such as "this" handling or
    // normalization of event properties
    var addListener;
    if (isBrowser) {
        if (isHostMethod(document, "addEventListener")) {
            addListener = function(obj, eventType, listener) {
                obj.addEventListener(eventType, listener, false);
            };
        } else if (isHostMethod(document, "attachEvent")) {
            addListener = function(obj, eventType, listener) {
                obj.attachEvent("on" + eventType, listener);
            };
        } else {
            fail("Document does not have required addEventListener or attachEvent method");
        }

        util.addListener = addListener;
    }

    var initListeners = [];

    function getErrorDesc(ex) {
        return ex.message || ex.description || String(ex);
    }

    // Initialization
    function init() {
        if (!isBrowser || api.initialized) {
            return;
        }
        var testRange;
        var implementsDomRange = false, implementsTextRange = false;

        // First, perform basic feature tests

        if (isHostMethod(document, "createRange")) {
            testRange = document.createRange();
            if (areHostMethods(testRange, domRangeMethods) && areHostProperties(testRange, domRangeProperties)) {
                implementsDomRange = true;
            }
        }

        var body = getBody(document);
        if (!body || body.nodeName.toLowerCase() != "body") {
            fail("No body element found");
            return;
        }

        if (body && isHostMethod(body, "createTextRange")) {
            testRange = body.createTextRange();
            if (isTextRange(testRange)) {
                implementsTextRange = true;
            }
        }

        if (!implementsDomRange && !implementsTextRange) {
            fail("Neither Range nor TextRange are available");
            return;
        }

        api.initialized = true;
        api.features = {
            implementsDomRange: implementsDomRange,
            implementsTextRange: implementsTextRange
        };

        // Initialize modules
        var module, errorMessage;
        for (var moduleName in modules) {
            if ( (module = modules[moduleName]) instanceof Module ) {
                module.init(module, api);
            }
        }

        // Call init listeners
        for (var i = 0, len = initListeners.length; i < len; ++i) {
            try {
                initListeners[i](api);
            } catch (ex) {
                errorMessage = "Rangy init listener threw an exception. Continuing. Detail: " + getErrorDesc(ex);
                consoleLog(errorMessage);
            }
        }
    }

    function deprecationNotice(deprecated, replacement, module) {
        if (module) {
            deprecated += " in module " + module.name;
        }
        api.warn("DEPRECATED: " + deprecated + " is deprecated. Please use " +
        replacement + " instead.");
    }

    function createAliasForDeprecatedMethod(owner, deprecated, replacement, module) {
        owner[deprecated] = function() {
            deprecationNotice(deprecated, replacement, module);
            return owner[replacement].apply(owner, util.toArray(arguments));
        };
    }

    util.deprecationNotice = deprecationNotice;
    util.createAliasForDeprecatedMethod = createAliasForDeprecatedMethod;

    // Allow external scripts to initialize this library in case it's loaded after the document has loaded
    api.init = init;

    // Execute listener immediately if already initialized
    api.addInitListener = function(listener) {
        if (api.initialized) {
            listener(api);
        } else {
            initListeners.push(listener);
        }
    };

    var shimListeners = [];

    api.addShimListener = function(listener) {
        shimListeners.push(listener);
    };

    function shim(win) {
        win = win || window;
        init();

        // Notify listeners
        for (var i = 0, len = shimListeners.length; i < len; ++i) {
            shimListeners[i](win);
        }
    }

    if (isBrowser) {
        api.shim = api.createMissingNativeApi = shim;
        createAliasForDeprecatedMethod(api, "createMissingNativeApi", "shim");
    }

    function Module(name, dependencies, initializer) {
        this.name = name;
        this.dependencies = dependencies;
        this.initialized = false;
        this.supported = false;
        this.initializer = initializer;
    }

    Module.prototype = {
        init: function() {
            var requiredModuleNames = this.dependencies || [];
            for (var i = 0, len = requiredModuleNames.length, requiredModule, moduleName; i < len; ++i) {
                moduleName = requiredModuleNames[i];

                requiredModule = modules[moduleName];
                if (!requiredModule || !(requiredModule instanceof Module)) {
                    throw new Error("required module '" + moduleName + "' not found");
                }

                requiredModule.init();

                if (!requiredModule.supported) {
                    throw new Error("required module '" + moduleName + "' not supported");
                }
            }

            // Now run initializer
            this.initializer(this);
        },

        fail: function(reason) {
            this.initialized = true;
            this.supported = false;
            throw new Error(reason);
        },

        warn: function(msg) {
            api.warn("Module " + this.name + ": " + msg);
        },

        deprecationNotice: function(deprecated, replacement) {
            api.warn("DEPRECATED: " + deprecated + " in module " + this.name + " is deprecated. Please use " +
                replacement + " instead");
        },

        createError: function(msg) {
            return new Error("Error in Rangy " + this.name + " module: " + msg);
        }
    };

    function createModule(name, dependencies, initFunc) {
        var newModule = new Module(name, dependencies, function(module) {
            if (!module.initialized) {
                module.initialized = true;
                try {
                    initFunc(api, module);
                    module.supported = true;
                } catch (ex) {
                    var errorMessage = "Module '" + name + "' failed to load: " + getErrorDesc(ex);
                    consoleLog(errorMessage);
                    if (ex.stack) {
                        consoleLog(ex.stack);
                    }
                }
            }
        });
        modules[name] = newModule;
        return newModule;
    }

    api.createModule = function(name) {
        // Allow 2 or 3 arguments (second argument is an optional array of dependencies)
        var initFunc, dependencies;
        if (arguments.length == 2) {
            initFunc = arguments[1];
            dependencies = [];
        } else {
            initFunc = arguments[2];
            dependencies = arguments[1];
        }

        var module = createModule(name, dependencies, initFunc);

        // Initialize the module immediately if the core is already initialized
        if (api.initialized && api.supported) {
            module.init();
        }
    };

    api.createCoreModule = function(name, dependencies, initFunc) {
        createModule(name, dependencies, initFunc);
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    // Ensure rangy.rangePrototype and rangy.selectionPrototype are available immediately

    function RangePrototype() {}
    api.RangePrototype = RangePrototype;
    api.rangePrototype = new RangePrototype();

    function SelectionPrototype() {}
    api.selectionPrototype = new SelectionPrototype();

    /*----------------------------------------------------------------------------------------------------------------*/

    // DOM utility methods used by Rangy
    api.createCoreModule("DomUtil", [], function(api, module) {
        var UNDEF = "undefined";
        var util = api.util;
        var getBody = util.getBody;

        // Perform feature tests
        if (!util.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"])) {
            module.fail("document missing a Node creation method");
        }

        if (!util.isHostMethod(document, "getElementsByTagName")) {
            module.fail("document missing getElementsByTagName method");
        }

        var el = document.createElement("div");
        if (!util.areHostMethods(el, ["insertBefore", "appendChild", "cloneNode"] ||
                !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]))) {
            module.fail("Incomplete Element implementation");
        }

        // innerHTML is required for Range's createContextualFragment method
        if (!util.isHostProperty(el, "innerHTML")) {
            module.fail("Element is missing innerHTML property");
        }

        var textNode = document.createTextNode("test");
        if (!util.areHostMethods(textNode, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] ||
                !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]) ||
                !util.areHostProperties(textNode, ["data"]))) {
            module.fail("Incomplete Text Node implementation");
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Removed use of indexOf because of a bizarre bug in Opera that is thrown in one of the Acid3 tests. I haven't been
        // able to replicate it outside of the test. The bug is that indexOf returns -1 when called on an Array that
        // contains just the document as a single element and the value searched for is the document.
        var arrayContains = /*Array.prototype.indexOf ?
            function(arr, val) {
                return arr.indexOf(val) > -1;
            }:*/

            function(arr, val) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === val) {
                        return true;
                    }
                }
                return false;
            };

        // Opera 11 puts HTML elements in the null namespace, it seems, and IE 7 has undefined namespaceURI
        function isHtmlNamespace(node) {
            var ns;
            return typeof node.namespaceURI == UNDEF || ((ns = node.namespaceURI) === null || ns == "http://www.w3.org/1999/xhtml");
        }

        function parentElement(node) {
            var parent = node.parentNode;
            return (parent.nodeType == 1) ? parent : null;
        }

        function getNodeIndex(node) {
            var i = 0;
            while( (node = node.previousSibling) ) {
                ++i;
            }
            return i;
        }

        function getNodeLength(node) {
            switch (node.nodeType) {
                case 7:
                case 10:
                    return 0;
                case 3:
                case 8:
                    return node.length;
                default:
                    return node.childNodes.length;
            }
        }

        function getCommonAncestor(node1, node2) {
            var ancestors = [], n;
            for (n = node1; n; n = n.parentNode) {
                ancestors.push(n);
            }

            for (n = node2; n; n = n.parentNode) {
                if (arrayContains(ancestors, n)) {
                    return n;
                }
            }

            return null;
        }

        function isAncestorOf(ancestor, descendant, selfIsAncestor) {
            var n = selfIsAncestor ? descendant : descendant.parentNode;
            while (n) {
                if (n === ancestor) {
                    return true;
                } else {
                    n = n.parentNode;
                }
            }
            return false;
        }

        function isOrIsAncestorOf(ancestor, descendant) {
            return isAncestorOf(ancestor, descendant, true);
        }

        function getClosestAncestorIn(node, ancestor, selfIsAncestor) {
            var p, n = selfIsAncestor ? node : node.parentNode;
            while (n) {
                p = n.parentNode;
                if (p === ancestor) {
                    return n;
                }
                n = p;
            }
            return null;
        }

        function isCharacterDataNode(node) {
            var t = node.nodeType;
            return t == 3 || t == 4 || t == 8 ; // Text, CDataSection or Comment
        }

        function isTextOrCommentNode(node) {
            if (!node) {
                return false;
            }
            var t = node.nodeType;
            return t == 3 || t == 8 ; // Text or Comment
        }

        function insertAfter(node, precedingNode) {
            var nextNode = precedingNode.nextSibling, parent = precedingNode.parentNode;
            if (nextNode) {
                parent.insertBefore(node, nextNode);
            } else {
                parent.appendChild(node);
            }
            return node;
        }

        // Note that we cannot use splitText() because it is bugridden in IE 9.
        function splitDataNode(node, index, positionsToPreserve) {
            var newNode = node.cloneNode(false);
            newNode.deleteData(0, index);
            node.deleteData(index, node.length - index);
            insertAfter(newNode, node);

            // Preserve positions
            if (positionsToPreserve) {
                for (var i = 0, position; position = positionsToPreserve[i++]; ) {
                    // Handle case where position was inside the portion of node after the split point
                    if (position.node == node && position.offset > index) {
                        position.node = newNode;
                        position.offset -= index;
                    }
                    // Handle the case where the position is a node offset within node's parent
                    else if (position.node == node.parentNode && position.offset > getNodeIndex(node)) {
                        ++position.offset;
                    }
                }
            }
            return newNode;
        }

        function getDocument(node) {
            if (node.nodeType == 9) {
                return node;
            } else if (typeof node.ownerDocument != UNDEF) {
                return node.ownerDocument;
            } else if (typeof node.document != UNDEF) {
                return node.document;
            } else if (node.parentNode) {
                return getDocument(node.parentNode);
            } else {
                throw module.createError("getDocument: no document found for node");
            }
        }

        function getWindow(node) {
            var doc = getDocument(node);
            if (typeof doc.defaultView != UNDEF) {
                return doc.defaultView;
            } else if (typeof doc.parentWindow != UNDEF) {
                return doc.parentWindow;
            } else {
                throw module.createError("Cannot get a window object for node");
            }
        }

        function getIframeDocument(iframeEl) {
            if (typeof iframeEl.contentDocument != UNDEF) {
                return iframeEl.contentDocument;
            } else if (typeof iframeEl.contentWindow != UNDEF) {
                return iframeEl.contentWindow.document;
            } else {
                throw module.createError("getIframeDocument: No Document object found for iframe element");
            }
        }

        function getIframeWindow(iframeEl) {
            if (typeof iframeEl.contentWindow != UNDEF) {
                return iframeEl.contentWindow;
            } else if (typeof iframeEl.contentDocument != UNDEF) {
                return iframeEl.contentDocument.defaultView;
            } else {
                throw module.createError("getIframeWindow: No Window object found for iframe element");
            }
        }

        // This looks bad. Is it worth it?
        function isWindow(obj) {
            return obj && util.isHostMethod(obj, "setTimeout") && util.isHostObject(obj, "document");
        }

        function getContentDocument(obj, module, methodName) {
            var doc;

            if (!obj) {
                doc = document;
            }

            // Test if a DOM node has been passed and obtain a document object for it if so
            else if (util.isHostProperty(obj, "nodeType")) {
                doc = (obj.nodeType == 1 && obj.tagName.toLowerCase() == "iframe") ?
                    getIframeDocument(obj) : getDocument(obj);
            }

            // Test if the doc parameter appears to be a Window object
            else if (isWindow(obj)) {
                doc = obj.document;
            }

            if (!doc) {
                throw module.createError(methodName + "(): Parameter must be a Window object or DOM node");
            }

            return doc;
        }

        function getRootContainer(node) {
            var parent;
            while ( (parent = node.parentNode) ) {
                node = parent;
            }
            return node;
        }

        function comparePoints(nodeA, offsetA, nodeB, offsetB) {
            // See http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Comparing
            var nodeC, root, childA, childB, n;
            if (nodeA == nodeB) {
                // Case 1: nodes are the same
                return offsetA === offsetB ? 0 : (offsetA < offsetB) ? -1 : 1;
            } else if ( (nodeC = getClosestAncestorIn(nodeB, nodeA, true)) ) {
                // Case 2: node C (container B or an ancestor) is a child node of A
                return offsetA <= getNodeIndex(nodeC) ? -1 : 1;
            } else if ( (nodeC = getClosestAncestorIn(nodeA, nodeB, true)) ) {
                // Case 3: node C (container A or an ancestor) is a child node of B
                return getNodeIndex(nodeC) < offsetB  ? -1 : 1;
            } else {
                root = getCommonAncestor(nodeA, nodeB);
                if (!root) {
                    throw new Error("comparePoints error: nodes have no common ancestor");
                }

                // Case 4: containers are siblings or descendants of siblings
                childA = (nodeA === root) ? root : getClosestAncestorIn(nodeA, root, true);
                childB = (nodeB === root) ? root : getClosestAncestorIn(nodeB, root, true);

                if (childA === childB) {
                    // This shouldn't be possible
                    throw module.createError("comparePoints got to case 4 and childA and childB are the same!");
                } else {
                    n = root.firstChild;
                    while (n) {
                        if (n === childA) {
                            return -1;
                        } else if (n === childB) {
                            return 1;
                        }
                        n = n.nextSibling;
                    }
                }
            }
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Test for IE's crash (IE 6/7) or exception (IE >= 8) when a reference to garbage-collected text node is queried
        var crashyTextNodes = false;

        function isBrokenNode(node) {
            var n;
            try {
                n = node.parentNode;
                return false;
            } catch (e) {
                return true;
            }
        }

        (function() {
            var el = document.createElement("b");
            el.innerHTML = "1";
            var textNode = el.firstChild;
            el.innerHTML = "<br />";
            crashyTextNodes = isBrokenNode(textNode);

            api.features.crashyTextNodes = crashyTextNodes;
        })();

        /*----------------------------------------------------------------------------------------------------------------*/

        function inspectNode(node) {
            if (!node) {
                return "[No node]";
            }
            if (crashyTextNodes && isBrokenNode(node)) {
                return "[Broken node]";
            }
            if (isCharacterDataNode(node)) {
                return '"' + node.data + '"';
            }
            if (node.nodeType == 1) {
                var idAttr = node.id ? ' id="' + node.id + '"' : "";
                return "<" + node.nodeName + idAttr + ">[index:" + getNodeIndex(node) + ",length:" + node.childNodes.length + "][" + (node.innerHTML || "[innerHTML not supported]").slice(0, 25) + "]";
            }
            return node.nodeName;
        }

        function fragmentFromNodeChildren(node) {
            var fragment = getDocument(node).createDocumentFragment(), child;
            while ( (child = node.firstChild) ) {
                fragment.appendChild(child);
            }
            return fragment;
        }

        var getComputedStyleProperty;
        if (typeof window.getComputedStyle != UNDEF) {
            getComputedStyleProperty = function(el, propName) {
                return getWindow(el).getComputedStyle(el, null)[propName];
            };
        } else if (typeof document.documentElement.currentStyle != UNDEF) {
            getComputedStyleProperty = function(el, propName) {
                return el.currentStyle ? el.currentStyle[propName] : "";
            };
        } else {
            module.fail("No means of obtaining computed style properties found");
        }

        function createTestElement(doc, html, contentEditable) {
            var body = getBody(doc);
            var el = doc.createElement("div");
            el.contentEditable = "" + !!contentEditable;
            if (html) {
                el.innerHTML = html;
            }

            // Insert the test element at the start of the body to prevent scrolling to the bottom in iOS (issue #292)
            var bodyFirstChild = body.firstChild;
            if (bodyFirstChild) {
                body.insertBefore(el, bodyFirstChild);
            } else {
                body.appendChild(el);
            }

            return el;
        }

        function removeNode(node) {
            return node.parentNode.removeChild(node);
        }

        function NodeIterator(root) {
            this.root = root;
            this._next = root;
        }

        NodeIterator.prototype = {
            _current: null,

            hasNext: function() {
                return !!this._next;
            },

            next: function() {
                var n = this._current = this._next;
                var child, next;
                if (this._current) {
                    child = n.firstChild;
                    if (child) {
                        this._next = child;
                    } else {
                        next = null;
                        while ((n !== this.root) && !(next = n.nextSibling)) {
                            n = n.parentNode;
                        }
                        this._next = next;
                    }
                }
                return this._current;
            },

            detach: function() {
                this._current = this._next = this.root = null;
            }
        };

        function createIterator(root) {
            return new NodeIterator(root);
        }

        function DomPosition(node, offset) {
            this.node = node;
            this.offset = offset;
        }

        DomPosition.prototype = {
            equals: function(pos) {
                return !!pos && this.node === pos.node && this.offset == pos.offset;
            },

            inspect: function() {
                return "[DomPosition(" + inspectNode(this.node) + ":" + this.offset + ")]";
            },

            toString: function() {
                return this.inspect();
            }
        };

        function DOMException(codeName) {
            this.code = this[codeName];
            this.codeName = codeName;
            this.message = "DOMException: " + this.codeName;
        }

        DOMException.prototype = {
            INDEX_SIZE_ERR: 1,
            HIERARCHY_REQUEST_ERR: 3,
            WRONG_DOCUMENT_ERR: 4,
            NO_MODIFICATION_ALLOWED_ERR: 7,
            NOT_FOUND_ERR: 8,
            NOT_SUPPORTED_ERR: 9,
            INVALID_STATE_ERR: 11,
            INVALID_NODE_TYPE_ERR: 24
        };

        DOMException.prototype.toString = function() {
            return this.message;
        };

        api.dom = {
            arrayContains: arrayContains,
            isHtmlNamespace: isHtmlNamespace,
            parentElement: parentElement,
            getNodeIndex: getNodeIndex,
            getNodeLength: getNodeLength,
            getCommonAncestor: getCommonAncestor,
            isAncestorOf: isAncestorOf,
            isOrIsAncestorOf: isOrIsAncestorOf,
            getClosestAncestorIn: getClosestAncestorIn,
            isCharacterDataNode: isCharacterDataNode,
            isTextOrCommentNode: isTextOrCommentNode,
            insertAfter: insertAfter,
            splitDataNode: splitDataNode,
            getDocument: getDocument,
            getWindow: getWindow,
            getIframeWindow: getIframeWindow,
            getIframeDocument: getIframeDocument,
            getBody: getBody,
            isWindow: isWindow,
            getContentDocument: getContentDocument,
            getRootContainer: getRootContainer,
            comparePoints: comparePoints,
            isBrokenNode: isBrokenNode,
            inspectNode: inspectNode,
            getComputedStyleProperty: getComputedStyleProperty,
            createTestElement: createTestElement,
            removeNode: removeNode,
            fragmentFromNodeChildren: fragmentFromNodeChildren,
            createIterator: createIterator,
            DomPosition: DomPosition
        };

        api.DOMException = DOMException;
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Pure JavaScript implementation of DOM Range
    api.createCoreModule("DomRange", ["DomUtil"], function(api, module) {
        var dom = api.dom;
        var util = api.util;
        var DomPosition = dom.DomPosition;
        var DOMException = api.DOMException;

        var isCharacterDataNode = dom.isCharacterDataNode;
        var getNodeIndex = dom.getNodeIndex;
        var isOrIsAncestorOf = dom.isOrIsAncestorOf;
        var getDocument = dom.getDocument;
        var comparePoints = dom.comparePoints;
        var splitDataNode = dom.splitDataNode;
        var getClosestAncestorIn = dom.getClosestAncestorIn;
        var getNodeLength = dom.getNodeLength;
        var arrayContains = dom.arrayContains;
        var getRootContainer = dom.getRootContainer;
        var crashyTextNodes = api.features.crashyTextNodes;

        var removeNode = dom.removeNode;

        /*----------------------------------------------------------------------------------------------------------------*/

        // Utility functions

        function isNonTextPartiallySelected(node, range) {
            return (node.nodeType != 3) &&
                   (isOrIsAncestorOf(node, range.startContainer) || isOrIsAncestorOf(node, range.endContainer));
        }

        function getRangeDocument(range) {
            return range.document || getDocument(range.startContainer);
        }

        function getRangeRoot(range) {
            return getRootContainer(range.startContainer);
        }

        function getBoundaryBeforeNode(node) {
            return new DomPosition(node.parentNode, getNodeIndex(node));
        }

        function getBoundaryAfterNode(node) {
            return new DomPosition(node.parentNode, getNodeIndex(node) + 1);
        }

        function insertNodeAtPosition(node, n, o) {
            var firstNodeInserted = node.nodeType == 11 ? node.firstChild : node;
            if (isCharacterDataNode(n)) {
                if (o == n.length) {
                    dom.insertAfter(node, n);
                } else {
                    n.parentNode.insertBefore(node, o == 0 ? n : splitDataNode(n, o));
                }
            } else if (o >= n.childNodes.length) {
                n.appendChild(node);
            } else {
                n.insertBefore(node, n.childNodes[o]);
            }
            return firstNodeInserted;
        }

        function rangesIntersect(rangeA, rangeB, touchingIsIntersecting) {
            assertRangeValid(rangeA);
            assertRangeValid(rangeB);

            if (getRangeDocument(rangeB) != getRangeDocument(rangeA)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }

            var startComparison = comparePoints(rangeA.startContainer, rangeA.startOffset, rangeB.endContainer, rangeB.endOffset),
                endComparison = comparePoints(rangeA.endContainer, rangeA.endOffset, rangeB.startContainer, rangeB.startOffset);

            return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
        }

        function cloneSubtree(iterator) {
            var partiallySelected;
            for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {
                partiallySelected = iterator.isPartiallySelectedSubtree();
                node = node.cloneNode(!partiallySelected);
                if (partiallySelected) {
                    subIterator = iterator.getSubtreeIterator();
                    node.appendChild(cloneSubtree(subIterator));
                    subIterator.detach();
                }

                if (node.nodeType == 10) { // DocumentType
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }
                frag.appendChild(node);
            }
            return frag;
        }

        function iterateSubtree(rangeIterator, func, iteratorState) {
            var it, n;
            iteratorState = iteratorState || { stop: false };
            for (var node, subRangeIterator; node = rangeIterator.next(); ) {
                if (rangeIterator.isPartiallySelectedSubtree()) {
                    if (func(node) === false) {
                        iteratorState.stop = true;
                        return;
                    } else {
                        // The node is partially selected by the Range, so we can use a new RangeIterator on the portion of
                        // the node selected by the Range.
                        subRangeIterator = rangeIterator.getSubtreeIterator();
                        iterateSubtree(subRangeIterator, func, iteratorState);
                        subRangeIterator.detach();
                        if (iteratorState.stop) {
                            return;
                        }
                    }
                } else {
                    // The whole node is selected, so we can use efficient DOM iteration to iterate over the node and its
                    // descendants
                    it = dom.createIterator(node);
                    while ( (n = it.next()) ) {
                        if (func(n) === false) {
                            iteratorState.stop = true;
                            return;
                        }
                    }
                }
            }
        }

        function deleteSubtree(iterator) {
            var subIterator;
            while (iterator.next()) {
                if (iterator.isPartiallySelectedSubtree()) {
                    subIterator = iterator.getSubtreeIterator();
                    deleteSubtree(subIterator);
                    subIterator.detach();
                } else {
                    iterator.remove();
                }
            }
        }

        function extractSubtree(iterator) {
            for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {

                if (iterator.isPartiallySelectedSubtree()) {
                    node = node.cloneNode(false);
                    subIterator = iterator.getSubtreeIterator();
                    node.appendChild(extractSubtree(subIterator));
                    subIterator.detach();
                } else {
                    iterator.remove();
                }
                if (node.nodeType == 10) { // DocumentType
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }
                frag.appendChild(node);
            }
            return frag;
        }

        function getNodesInRange(range, nodeTypes, filter) {
            var filterNodeTypes = !!(nodeTypes && nodeTypes.length), regex;
            var filterExists = !!filter;
            if (filterNodeTypes) {
                regex = new RegExp("^(" + nodeTypes.join("|") + ")$");
            }

            var nodes = [];
            iterateSubtree(new RangeIterator(range, false), function(node) {
                if (filterNodeTypes && !regex.test(node.nodeType)) {
                    return;
                }
                if (filterExists && !filter(node)) {
                    return;
                }
                // Don't include a boundary container if it is a character data node and the range does not contain any
                // of its character data. See issue 190.
                var sc = range.startContainer;
                if (node == sc && isCharacterDataNode(sc) && range.startOffset == sc.length) {
                    return;
                }

                var ec = range.endContainer;
                if (node == ec && isCharacterDataNode(ec) && range.endOffset == 0) {
                    return;
                }

                nodes.push(node);
            });
            return nodes;
        }

        function inspect(range) {
            var name = (typeof range.getName == "undefined") ? "Range" : range.getName();
            return "[" + name + "(" + dom.inspectNode(range.startContainer) + ":" + range.startOffset + ", " +
                    dom.inspectNode(range.endContainer) + ":" + range.endOffset + ")]";
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // RangeIterator code partially borrows from IERange by Tim Ryan (http://github.com/timcameronryan/IERange)

        function RangeIterator(range, clonePartiallySelectedTextNodes) {
            this.range = range;
            this.clonePartiallySelectedTextNodes = clonePartiallySelectedTextNodes;


            if (!range.collapsed) {
                this.sc = range.startContainer;
                this.so = range.startOffset;
                this.ec = range.endContainer;
                this.eo = range.endOffset;
                var root = range.commonAncestorContainer;

                if (this.sc === this.ec && isCharacterDataNode(this.sc)) {
                    this.isSingleCharacterDataNode = true;
                    this._first = this._last = this._next = this.sc;
                } else {
                    this._first = this._next = (this.sc === root && !isCharacterDataNode(this.sc)) ?
                        this.sc.childNodes[this.so] : getClosestAncestorIn(this.sc, root, true);
                    this._last = (this.ec === root && !isCharacterDataNode(this.ec)) ?
                        this.ec.childNodes[this.eo - 1] : getClosestAncestorIn(this.ec, root, true);
                }
            }
        }

        RangeIterator.prototype = {
            _current: null,
            _next: null,
            _first: null,
            _last: null,
            isSingleCharacterDataNode: false,

            reset: function() {
                this._current = null;
                this._next = this._first;
            },

            hasNext: function() {
                return !!this._next;
            },

            next: function() {
                // Move to next node
                var current = this._current = this._next;
                if (current) {
                    this._next = (current !== this._last) ? current.nextSibling : null;

                    // Check for partially selected text nodes
                    if (isCharacterDataNode(current) && this.clonePartiallySelectedTextNodes) {
                        if (current === this.ec) {
                            (current = current.cloneNode(true)).deleteData(this.eo, current.length - this.eo);
                        }
                        if (this._current === this.sc) {
                            (current = current.cloneNode(true)).deleteData(0, this.so);
                        }
                    }
                }

                return current;
            },

            remove: function() {
                var current = this._current, start, end;

                if (isCharacterDataNode(current) && (current === this.sc || current === this.ec)) {
                    start = (current === this.sc) ? this.so : 0;
                    end = (current === this.ec) ? this.eo : current.length;
                    if (start != end) {
                        current.deleteData(start, end - start);
                    }
                } else {
                    if (current.parentNode) {
                        removeNode(current);
                    } else {
                    }
                }
            },

            // Checks if the current node is partially selected
            isPartiallySelectedSubtree: function() {
                var current = this._current;
                return isNonTextPartiallySelected(current, this.range);
            },

            getSubtreeIterator: function() {
                var subRange;
                if (this.isSingleCharacterDataNode) {
                    subRange = this.range.cloneRange();
                    subRange.collapse(false);
                } else {
                    subRange = new Range(getRangeDocument(this.range));
                    var current = this._current;
                    var startContainer = current, startOffset = 0, endContainer = current, endOffset = getNodeLength(current);

                    if (isOrIsAncestorOf(current, this.sc)) {
                        startContainer = this.sc;
                        startOffset = this.so;
                    }
                    if (isOrIsAncestorOf(current, this.ec)) {
                        endContainer = this.ec;
                        endOffset = this.eo;
                    }

                    updateBoundaries(subRange, startContainer, startOffset, endContainer, endOffset);
                }
                return new RangeIterator(subRange, this.clonePartiallySelectedTextNodes);
            },

            detach: function() {
                this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
            }
        };

        /*----------------------------------------------------------------------------------------------------------------*/

        var beforeAfterNodeTypes = [1, 3, 4, 5, 7, 8, 10];
        var rootContainerNodeTypes = [2, 9, 11];
        var readonlyNodeTypes = [5, 6, 10, 12];
        var insertableNodeTypes = [1, 3, 4, 5, 7, 8, 10, 11];
        var surroundNodeTypes = [1, 3, 4, 5, 7, 8];

        function createAncestorFinder(nodeTypes) {
            return function(node, selfIsAncestor) {
                var t, n = selfIsAncestor ? node : node.parentNode;
                while (n) {
                    t = n.nodeType;
                    if (arrayContains(nodeTypes, t)) {
                        return n;
                    }
                    n = n.parentNode;
                }
                return null;
            };
        }

        var getDocumentOrFragmentContainer = createAncestorFinder( [9, 11] );
        var getReadonlyAncestor = createAncestorFinder(readonlyNodeTypes);
        var getDocTypeNotationEntityAncestor = createAncestorFinder( [6, 10, 12] );

        function assertNoDocTypeNotationEntityAncestor(node, allowSelf) {
            if (getDocTypeNotationEntityAncestor(node, allowSelf)) {
                throw new DOMException("INVALID_NODE_TYPE_ERR");
            }
        }

        function assertValidNodeType(node, invalidTypes) {
            if (!arrayContains(invalidTypes, node.nodeType)) {
                throw new DOMException("INVALID_NODE_TYPE_ERR");
            }
        }

        function assertValidOffset(node, offset) {
            if (offset < 0 || offset > (isCharacterDataNode(node) ? node.length : node.childNodes.length)) {
                throw new DOMException("INDEX_SIZE_ERR");
            }
        }

        function assertSameDocumentOrFragment(node1, node2) {
            if (getDocumentOrFragmentContainer(node1, true) !== getDocumentOrFragmentContainer(node2, true)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }
        }

        function assertNodeNotReadOnly(node) {
            if (getReadonlyAncestor(node, true)) {
                throw new DOMException("NO_MODIFICATION_ALLOWED_ERR");
            }
        }

        function assertNode(node, codeName) {
            if (!node) {
                throw new DOMException(codeName);
            }
        }

        function isValidOffset(node, offset) {
            return offset <= (isCharacterDataNode(node) ? node.length : node.childNodes.length);
        }

        function isRangeValid(range) {
            return (!!range.startContainer && !!range.endContainer &&
                    !(crashyTextNodes && (dom.isBrokenNode(range.startContainer) || dom.isBrokenNode(range.endContainer))) &&
                    getRootContainer(range.startContainer) == getRootContainer(range.endContainer) &&
                    isValidOffset(range.startContainer, range.startOffset) &&
                    isValidOffset(range.endContainer, range.endOffset));
        }

        function assertRangeValid(range) {
            if (!isRangeValid(range)) {
                throw new Error("Range error: Range is not valid. This usually happens after DOM mutation. Range: (" + range.inspect() + ")");
            }
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Test the browser's innerHTML support to decide how to implement createContextualFragment
        var styleEl = document.createElement("style");
        var htmlParsingConforms = false;
        try {
            styleEl.innerHTML = "<b>x</b>";
            htmlParsingConforms = (styleEl.firstChild.nodeType == 3); // Opera incorrectly creates an element node
        } catch (e) {
            // IE 6 and 7 throw
        }

        api.features.htmlParsingConforms = htmlParsingConforms;

        var createContextualFragment = htmlParsingConforms ?

            // Implementation as per HTML parsing spec, trusting in the browser's implementation of innerHTML. See
            // discussion and base code for this implementation at issue 67.
            // Spec: http://html5.org/specs/dom-parsing.html#extensions-to-the-range-interface
            // Thanks to Aleks Williams.
            function(fragmentStr) {
                // "Let node the context object's start's node."
                var node = this.startContainer;
                var doc = getDocument(node);

                // "If the context object's start's node is null, raise an INVALID_STATE_ERR
                // exception and abort these steps."
                if (!node) {
                    throw new DOMException("INVALID_STATE_ERR");
                }

                // "Let element be as follows, depending on node's interface:"
                // Document, Document Fragment: null
                var el = null;

                // "Element: node"
                if (node.nodeType == 1) {
                    el = node;

                // "Text, Comment: node's parentElement"
                } else if (isCharacterDataNode(node)) {
                    el = dom.parentElement(node);
                }

                // "If either element is null or element's ownerDocument is an HTML document
                // and element's local name is "html" and element's namespace is the HTML
                // namespace"
                if (el === null || (
                    el.nodeName == "HTML" &&
                    dom.isHtmlNamespace(getDocument(el).documentElement) &&
                    dom.isHtmlNamespace(el)
                )) {

                // "let element be a new Element with "body" as its local name and the HTML
                // namespace as its namespace.""
                    el = doc.createElement("body");
                } else {
                    el = el.cloneNode(false);
                }

                // "If the node's document is an HTML document: Invoke the HTML fragment parsing algorithm."
                // "If the node's document is an XML document: Invoke the XML fragment parsing algorithm."
                // "In either case, the algorithm must be invoked with fragment as the input
                // and element as the context element."
                el.innerHTML = fragmentStr;

                // "If this raises an exception, then abort these steps. Otherwise, let new
                // children be the nodes returned."

                // "Let fragment be a new DocumentFragment."
                // "Append all new children to fragment."
                // "Return fragment."
                return dom.fragmentFromNodeChildren(el);
            } :

            // In this case, innerHTML cannot be trusted, so fall back to a simpler, non-conformant implementation that
            // previous versions of Rangy used (with the exception of using a body element rather than a div)
            function(fragmentStr) {
                var doc = getRangeDocument(this);
                var el = doc.createElement("body");
                el.innerHTML = fragmentStr;

                return dom.fragmentFromNodeChildren(el);
            };

        function splitRangeBoundaries(range, positionsToPreserve) {
            assertRangeValid(range);

            var sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset;
            var startEndSame = (sc === ec);

            if (isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
                splitDataNode(ec, eo, positionsToPreserve);
            }

            if (isCharacterDataNode(sc) && so > 0 && so < sc.length) {
                sc = splitDataNode(sc, so, positionsToPreserve);
                if (startEndSame) {
                    eo -= so;
                    ec = sc;
                } else if (ec == sc.parentNode && eo >= getNodeIndex(sc)) {
                    eo++;
                }
                so = 0;
            }
            range.setStartAndEnd(sc, so, ec, eo);
        }

        function rangeToHtml(range) {
            assertRangeValid(range);
            var container = range.commonAncestorContainer.parentNode.cloneNode(false);
            container.appendChild( range.cloneContents() );
            return container.innerHTML;
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        var rangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
            "commonAncestorContainer"];

        var s2s = 0, s2e = 1, e2e = 2, e2s = 3;
        var n_b = 0, n_a = 1, n_b_a = 2, n_i = 3;

        util.extend(api.rangePrototype, {
            compareBoundaryPoints: function(how, range) {
                assertRangeValid(this);
                assertSameDocumentOrFragment(this.startContainer, range.startContainer);

                var nodeA, offsetA, nodeB, offsetB;
                var prefixA = (how == e2s || how == s2s) ? "start" : "end";
                var prefixB = (how == s2e || how == s2s) ? "start" : "end";
                nodeA = this[prefixA + "Container"];
                offsetA = this[prefixA + "Offset"];
                nodeB = range[prefixB + "Container"];
                offsetB = range[prefixB + "Offset"];
                return comparePoints(nodeA, offsetA, nodeB, offsetB);
            },

            insertNode: function(node) {
                assertRangeValid(this);
                assertValidNodeType(node, insertableNodeTypes);
                assertNodeNotReadOnly(this.startContainer);

                if (isOrIsAncestorOf(node, this.startContainer)) {
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }

                // No check for whether the container of the start of the Range is of a type that does not allow
                // children of the type of node: the browser's DOM implementation should do this for us when we attempt
                // to add the node

                var firstNodeInserted = insertNodeAtPosition(node, this.startContainer, this.startOffset);
                this.setStartBefore(firstNodeInserted);
            },

            cloneContents: function() {
                assertRangeValid(this);

                var clone, frag;
                if (this.collapsed) {
                    return getRangeDocument(this).createDocumentFragment();
                } else {
                    if (this.startContainer === this.endContainer && isCharacterDataNode(this.startContainer)) {
                        clone = this.startContainer.cloneNode(true);
                        clone.data = clone.data.slice(this.startOffset, this.endOffset);
                        frag = getRangeDocument(this).createDocumentFragment();
                        frag.appendChild(clone);
                        return frag;
                    } else {
                        var iterator = new RangeIterator(this, true);
                        clone = cloneSubtree(iterator);
                        iterator.detach();
                    }
                    return clone;
                }
            },

            canSurroundContents: function() {
                assertRangeValid(this);
                assertNodeNotReadOnly(this.startContainer);
                assertNodeNotReadOnly(this.endContainer);

                // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                // no non-text nodes.
                var iterator = new RangeIterator(this, true);
                var boundariesInvalid = (iterator._first && (isNonTextPartiallySelected(iterator._first, this)) ||
                        (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
                iterator.detach();
                return !boundariesInvalid;
            },

            surroundContents: function(node) {
                assertValidNodeType(node, surroundNodeTypes);

                if (!this.canSurroundContents()) {
                    throw new DOMException("INVALID_STATE_ERR");
                }

                // Extract the contents
                var content = this.extractContents();

                // Clear the children of the node
                if (node.hasChildNodes()) {
                    while (node.lastChild) {
                        node.removeChild(node.lastChild);
                    }
                }

                // Insert the new node and add the extracted contents
                insertNodeAtPosition(node, this.startContainer, this.startOffset);
                node.appendChild(content);

                this.selectNode(node);
            },

            cloneRange: function() {
                assertRangeValid(this);
                var range = new Range(getRangeDocument(this));
                var i = rangeProperties.length, prop;
                while (i--) {
                    prop = rangeProperties[i];
                    range[prop] = this[prop];
                }
                return range;
            },

            toString: function() {
                assertRangeValid(this);
                var sc = this.startContainer;
                if (sc === this.endContainer && isCharacterDataNode(sc)) {
                    return (sc.nodeType == 3 || sc.nodeType == 4) ? sc.data.slice(this.startOffset, this.endOffset) : "";
                } else {
                    var textParts = [], iterator = new RangeIterator(this, true);
                    iterateSubtree(iterator, function(node) {
                        // Accept only text or CDATA nodes, not comments
                        if (node.nodeType == 3 || node.nodeType == 4) {
                            textParts.push(node.data);
                        }
                    });
                    iterator.detach();
                    return textParts.join("");
                }
            },

            // The methods below are all non-standard. The following batch were introduced by Mozilla but have since
            // been removed from Mozilla.

            compareNode: function(node) {
                assertRangeValid(this);

                var parent = node.parentNode;
                var nodeIndex = getNodeIndex(node);

                if (!parent) {
                    throw new DOMException("NOT_FOUND_ERR");
                }

                var startComparison = this.comparePoint(parent, nodeIndex),
                    endComparison = this.comparePoint(parent, nodeIndex + 1);

                if (startComparison < 0) { // Node starts before
                    return (endComparison > 0) ? n_b_a : n_b;
                } else {
                    return (endComparison > 0) ? n_a : n_i;
                }
            },

            comparePoint: function(node, offset) {
                assertRangeValid(this);
                assertNode(node, "HIERARCHY_REQUEST_ERR");
                assertSameDocumentOrFragment(node, this.startContainer);

                if (comparePoints(node, offset, this.startContainer, this.startOffset) < 0) {
                    return -1;
                } else if (comparePoints(node, offset, this.endContainer, this.endOffset) > 0) {
                    return 1;
                }
                return 0;
            },

            createContextualFragment: createContextualFragment,

            toHtml: function() {
                return rangeToHtml(this);
            },

            // touchingIsIntersecting determines whether this method considers a node that borders a range intersects
            // with it (as in WebKit) or not (as in Gecko pre-1.9, and the default)
            intersectsNode: function(node, touchingIsIntersecting) {
                assertRangeValid(this);
                if (getRootContainer(node) != getRangeRoot(this)) {
                    return false;
                }

                var parent = node.parentNode, offset = getNodeIndex(node);
                if (!parent) {
                    return true;
                }

                var startComparison = comparePoints(parent, offset, this.endContainer, this.endOffset),
                    endComparison = comparePoints(parent, offset + 1, this.startContainer, this.startOffset);

                return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
            },

            isPointInRange: function(node, offset) {
                assertRangeValid(this);
                assertNode(node, "HIERARCHY_REQUEST_ERR");
                assertSameDocumentOrFragment(node, this.startContainer);

                return (comparePoints(node, offset, this.startContainer, this.startOffset) >= 0) &&
                       (comparePoints(node, offset, this.endContainer, this.endOffset) <= 0);
            },

            // The methods below are non-standard and invented by me.

            // Sharing a boundary start-to-end or end-to-start does not count as intersection.
            intersectsRange: function(range) {
                return rangesIntersect(this, range, false);
            },

            // Sharing a boundary start-to-end or end-to-start does count as intersection.
            intersectsOrTouchesRange: function(range) {
                return rangesIntersect(this, range, true);
            },

            intersection: function(range) {
                if (this.intersectsRange(range)) {
                    var startComparison = comparePoints(this.startContainer, this.startOffset, range.startContainer, range.startOffset),
                        endComparison = comparePoints(this.endContainer, this.endOffset, range.endContainer, range.endOffset);

                    var intersectionRange = this.cloneRange();
                    if (startComparison == -1) {
                        intersectionRange.setStart(range.startContainer, range.startOffset);
                    }
                    if (endComparison == 1) {
                        intersectionRange.setEnd(range.endContainer, range.endOffset);
                    }
                    return intersectionRange;
                }
                return null;
            },

            union: function(range) {
                if (this.intersectsOrTouchesRange(range)) {
                    var unionRange = this.cloneRange();
                    if (comparePoints(range.startContainer, range.startOffset, this.startContainer, this.startOffset) == -1) {
                        unionRange.setStart(range.startContainer, range.startOffset);
                    }
                    if (comparePoints(range.endContainer, range.endOffset, this.endContainer, this.endOffset) == 1) {
                        unionRange.setEnd(range.endContainer, range.endOffset);
                    }
                    return unionRange;
                } else {
                    throw new DOMException("Ranges do not intersect");
                }
            },

            containsNode: function(node, allowPartial) {
                if (allowPartial) {
                    return this.intersectsNode(node, false);
                } else {
                    return this.compareNode(node) == n_i;
                }
            },

            containsNodeContents: function(node) {
                return this.comparePoint(node, 0) >= 0 && this.comparePoint(node, getNodeLength(node)) <= 0;
            },

            containsRange: function(range) {
                var intersection = this.intersection(range);
                return intersection !== null && range.equals(intersection);
            },

            containsNodeText: function(node) {
                var nodeRange = this.cloneRange();
                nodeRange.selectNode(node);
                var textNodes = nodeRange.getNodes([3]);
                if (textNodes.length > 0) {
                    nodeRange.setStart(textNodes[0], 0);
                    var lastTextNode = textNodes.pop();
                    nodeRange.setEnd(lastTextNode, lastTextNode.length);
                    return this.containsRange(nodeRange);
                } else {
                    return this.containsNodeContents(node);
                }
            },

            getNodes: function(nodeTypes, filter) {
                assertRangeValid(this);
                return getNodesInRange(this, nodeTypes, filter);
            },

            getDocument: function() {
                return getRangeDocument(this);
            },

            collapseBefore: function(node) {
                this.setEndBefore(node);
                this.collapse(false);
            },

            collapseAfter: function(node) {
                this.setStartAfter(node);
                this.collapse(true);
            },

            getBookmark: function(containerNode) {
                var doc = getRangeDocument(this);
                var preSelectionRange = api.createRange(doc);
                containerNode = containerNode || dom.getBody(doc);
                preSelectionRange.selectNodeContents(containerNode);
                var range = this.intersection(preSelectionRange);
                var start = 0, end = 0;
                if (range) {
                    preSelectionRange.setEnd(range.startContainer, range.startOffset);
                    start = preSelectionRange.toString().length;
                    end = start + range.toString().length;
                }

                return {
                    start: start,
                    end: end,
                    containerNode: containerNode
                };
            },

            moveToBookmark: function(bookmark) {
                var containerNode = bookmark.containerNode;
                var charIndex = 0;
                this.setStart(containerNode, 0);
                this.collapse(true);
                var nodeStack = [containerNode], node, foundStart = false, stop = false;
                var nextCharIndex, i, childNodes;

                while (!stop && (node = nodeStack.pop())) {
                    if (node.nodeType == 3) {
                        nextCharIndex = charIndex + node.length;
                        if (!foundStart && bookmark.start >= charIndex && bookmark.start <= nextCharIndex) {
                            this.setStart(node, bookmark.start - charIndex);
                            foundStart = true;
                        }
                        if (foundStart && bookmark.end >= charIndex && bookmark.end <= nextCharIndex) {
                            this.setEnd(node, bookmark.end - charIndex);
                            stop = true;
                        }
                        charIndex = nextCharIndex;
                    } else {
                        childNodes = node.childNodes;
                        i = childNodes.length;
                        while (i--) {
                            nodeStack.push(childNodes[i]);
                        }
                    }
                }
            },

            getName: function() {
                return "DomRange";
            },

            equals: function(range) {
                return Range.rangesEqual(this, range);
            },

            isValid: function() {
                return isRangeValid(this);
            },

            inspect: function() {
                return inspect(this);
            },

            detach: function() {
                // In DOM4, detach() is now a no-op.
            }
        });

        function copyComparisonConstantsToObject(obj) {
            obj.START_TO_START = s2s;
            obj.START_TO_END = s2e;
            obj.END_TO_END = e2e;
            obj.END_TO_START = e2s;

            obj.NODE_BEFORE = n_b;
            obj.NODE_AFTER = n_a;
            obj.NODE_BEFORE_AND_AFTER = n_b_a;
            obj.NODE_INSIDE = n_i;
        }

        function copyComparisonConstants(constructor) {
            copyComparisonConstantsToObject(constructor);
            copyComparisonConstantsToObject(constructor.prototype);
        }

        function createRangeContentRemover(remover, boundaryUpdater) {
            return function() {
                assertRangeValid(this);

                var sc = this.startContainer, so = this.startOffset, root = this.commonAncestorContainer;

                var iterator = new RangeIterator(this, true);

                // Work out where to position the range after content removal
                var node, boundary;
                if (sc !== root) {
                    node = getClosestAncestorIn(sc, root, true);
                    boundary = getBoundaryAfterNode(node);
                    sc = boundary.node;
                    so = boundary.offset;
                }

                // Check none of the range is read-only
                iterateSubtree(iterator, assertNodeNotReadOnly);

                iterator.reset();

                // Remove the content
                var returnValue = remover(iterator);
                iterator.detach();

                // Move to the new position
                boundaryUpdater(this, sc, so, sc, so);

                return returnValue;
            };
        }

        function createPrototypeRange(constructor, boundaryUpdater) {
            function createBeforeAfterNodeSetter(isBefore, isStart) {
                return function(node) {
                    assertValidNodeType(node, beforeAfterNodeTypes);
                    assertValidNodeType(getRootContainer(node), rootContainerNodeTypes);

                    var boundary = (isBefore ? getBoundaryBeforeNode : getBoundaryAfterNode)(node);
                    (isStart ? setRangeStart : setRangeEnd)(this, boundary.node, boundary.offset);
                };
            }

            function setRangeStart(range, node, offset) {
                var ec = range.endContainer, eo = range.endOffset;
                if (node !== range.startContainer || offset !== range.startOffset) {
                    // Check the root containers of the range and the new boundary, and also check whether the new boundary
                    // is after the current end. In either case, collapse the range to the new position
                    if (getRootContainer(node) != getRootContainer(ec) || comparePoints(node, offset, ec, eo) == 1) {
                        ec = node;
                        eo = offset;
                    }
                    boundaryUpdater(range, node, offset, ec, eo);
                }
            }

            function setRangeEnd(range, node, offset) {
                var sc = range.startContainer, so = range.startOffset;
                if (node !== range.endContainer || offset !== range.endOffset) {
                    // Check the root containers of the range and the new boundary, and also check whether the new boundary
                    // is after the current end. In either case, collapse the range to the new position
                    if (getRootContainer(node) != getRootContainer(sc) || comparePoints(node, offset, sc, so) == -1) {
                        sc = node;
                        so = offset;
                    }
                    boundaryUpdater(range, sc, so, node, offset);
                }
            }

            // Set up inheritance
            var F = function() {};
            F.prototype = api.rangePrototype;
            constructor.prototype = new F();

            util.extend(constructor.prototype, {
                setStart: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);

                    setRangeStart(this, node, offset);
                },

                setEnd: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);

                    setRangeEnd(this, node, offset);
                },

                /**
                 * Convenience method to set a range's start and end boundaries. Overloaded as follows:
                 * - Two parameters (node, offset) creates a collapsed range at that position
                 * - Three parameters (node, startOffset, endOffset) creates a range contained with node starting at
                 *   startOffset and ending at endOffset
                 * - Four parameters (startNode, startOffset, endNode, endOffset) creates a range starting at startOffset in
                 *   startNode and ending at endOffset in endNode
                 */
                setStartAndEnd: function() {
                    var args = arguments;
                    var sc = args[0], so = args[1], ec = sc, eo = so;

                    switch (args.length) {
                        case 3:
                            eo = args[2];
                            break;
                        case 4:
                            ec = args[2];
                            eo = args[3];
                            break;
                    }

                    boundaryUpdater(this, sc, so, ec, eo);
                },

                setBoundary: function(node, offset, isStart) {
                    this["set" + (isStart ? "Start" : "End")](node, offset);
                },

                setStartBefore: createBeforeAfterNodeSetter(true, true),
                setStartAfter: createBeforeAfterNodeSetter(false, true),
                setEndBefore: createBeforeAfterNodeSetter(true, false),
                setEndAfter: createBeforeAfterNodeSetter(false, false),

                collapse: function(isStart) {
                    assertRangeValid(this);
                    if (isStart) {
                        boundaryUpdater(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset);
                    } else {
                        boundaryUpdater(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
                    }
                },

                selectNodeContents: function(node) {
                    assertNoDocTypeNotationEntityAncestor(node, true);

                    boundaryUpdater(this, node, 0, node, getNodeLength(node));
                },

                selectNode: function(node) {
                    assertNoDocTypeNotationEntityAncestor(node, false);
                    assertValidNodeType(node, beforeAfterNodeTypes);

                    var start = getBoundaryBeforeNode(node), end = getBoundaryAfterNode(node);
                    boundaryUpdater(this, start.node, start.offset, end.node, end.offset);
                },

                extractContents: createRangeContentRemover(extractSubtree, boundaryUpdater),

                deleteContents: createRangeContentRemover(deleteSubtree, boundaryUpdater),

                canSurroundContents: function() {
                    assertRangeValid(this);
                    assertNodeNotReadOnly(this.startContainer);
                    assertNodeNotReadOnly(this.endContainer);

                    // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                    // no non-text nodes.
                    var iterator = new RangeIterator(this, true);
                    var boundariesInvalid = (iterator._first && isNonTextPartiallySelected(iterator._first, this) ||
                            (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
                    iterator.detach();
                    return !boundariesInvalid;
                },

                splitBoundaries: function() {
                    splitRangeBoundaries(this);
                },

                splitBoundariesPreservingPositions: function(positionsToPreserve) {
                    splitRangeBoundaries(this, positionsToPreserve);
                },

                normalizeBoundaries: function() {
                    assertRangeValid(this);

                    var sc = this.startContainer, so = this.startOffset, ec = this.endContainer, eo = this.endOffset;

                    var mergeForward = function(node) {
                        var sibling = node.nextSibling;
                        if (sibling && sibling.nodeType == node.nodeType) {
                            ec = node;
                            eo = node.length;
                            node.appendData(sibling.data);
                            removeNode(sibling);
                        }
                    };

                    var mergeBackward = function(node) {
                        var sibling = node.previousSibling;
                        if (sibling && sibling.nodeType == node.nodeType) {
                            sc = node;
                            var nodeLength = node.length;
                            so = sibling.length;
                            node.insertData(0, sibling.data);
                            removeNode(sibling);
                            if (sc == ec) {
                                eo += so;
                                ec = sc;
                            } else if (ec == node.parentNode) {
                                var nodeIndex = getNodeIndex(node);
                                if (eo == nodeIndex) {
                                    ec = node;
                                    eo = nodeLength;
                                } else if (eo > nodeIndex) {
                                    eo--;
                                }
                            }
                        }
                    };

                    var normalizeStart = true;
                    var sibling;

                    if (isCharacterDataNode(ec)) {
                        if (eo == ec.length) {
                            mergeForward(ec);
                        } else if (eo == 0) {
                            sibling = ec.previousSibling;
                            if (sibling && sibling.nodeType == ec.nodeType) {
                                eo = sibling.length;
                                if (sc == ec) {
                                    normalizeStart = false;
                                }
                                sibling.appendData(ec.data);
                                removeNode(ec);
                                ec = sibling;
                            }
                        }
                    } else {
                        if (eo > 0) {
                            var endNode = ec.childNodes[eo - 1];
                            if (endNode && isCharacterDataNode(endNode)) {
                                mergeForward(endNode);
                            }
                        }
                        normalizeStart = !this.collapsed;
                    }

                    if (normalizeStart) {
                        if (isCharacterDataNode(sc)) {
                            if (so == 0) {
                                mergeBackward(sc);
                            } else if (so == sc.length) {
                                sibling = sc.nextSibling;
                                if (sibling && sibling.nodeType == sc.nodeType) {
                                    if (ec == sibling) {
                                        ec = sc;
                                        eo += sc.length;
                                    }
                                    sc.appendData(sibling.data);
                                    removeNode(sibling);
                                }
                            }
                        } else {
                            if (so < sc.childNodes.length) {
                                var startNode = sc.childNodes[so];
                                if (startNode && isCharacterDataNode(startNode)) {
                                    mergeBackward(startNode);
                                }
                            }
                        }
                    } else {
                        sc = ec;
                        so = eo;
                    }

                    boundaryUpdater(this, sc, so, ec, eo);
                },

                collapseToPoint: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);
                    this.setStartAndEnd(node, offset);
                }
            });

            copyComparisonConstants(constructor);
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Updates commonAncestorContainer and collapsed after boundary change
        function updateCollapsedAndCommonAncestor(range) {
            range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
            range.commonAncestorContainer = range.collapsed ?
                range.startContainer : dom.getCommonAncestor(range.startContainer, range.endContainer);
        }

        function updateBoundaries(range, startContainer, startOffset, endContainer, endOffset) {
            range.startContainer = startContainer;
            range.startOffset = startOffset;
            range.endContainer = endContainer;
            range.endOffset = endOffset;
            range.document = dom.getDocument(startContainer);

            updateCollapsedAndCommonAncestor(range);
        }

        function Range(doc) {
            this.startContainer = doc;
            this.startOffset = 0;
            this.endContainer = doc;
            this.endOffset = 0;
            this.document = doc;
            updateCollapsedAndCommonAncestor(this);
        }

        createPrototypeRange(Range, updateBoundaries);

        util.extend(Range, {
            rangeProperties: rangeProperties,
            RangeIterator: RangeIterator,
            copyComparisonConstants: copyComparisonConstants,
            createPrototypeRange: createPrototypeRange,
            inspect: inspect,
            toHtml: rangeToHtml,
            getRangeDocument: getRangeDocument,
            rangesEqual: function(r1, r2) {
                return r1.startContainer === r2.startContainer &&
                    r1.startOffset === r2.startOffset &&
                    r1.endContainer === r2.endContainer &&
                    r1.endOffset === r2.endOffset;
            }
        });

        api.DomRange = Range;
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Wrappers for the browser's native DOM Range and/or TextRange implementation
    api.createCoreModule("WrappedRange", ["DomRange"], function(api, module) {
        var WrappedRange, WrappedTextRange;
        var dom = api.dom;
        var util = api.util;
        var DomPosition = dom.DomPosition;
        var DomRange = api.DomRange;
        var getBody = dom.getBody;
        var getContentDocument = dom.getContentDocument;
        var isCharacterDataNode = dom.isCharacterDataNode;


        /*----------------------------------------------------------------------------------------------------------------*/

        if (api.features.implementsDomRange) {
            // This is a wrapper around the browser's native DOM Range. It has two aims:
            // - Provide workarounds for specific browser bugs
            // - provide convenient extensions, which are inherited from Rangy's DomRange

            (function() {
                var rangeProto;
                var rangeProperties = DomRange.rangeProperties;

                function updateRangeProperties(range) {
                    var i = rangeProperties.length, prop;
                    while (i--) {
                        prop = rangeProperties[i];
                        range[prop] = range.nativeRange[prop];
                    }
                    // Fix for broken collapsed property in IE 9.
                    range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
                }

                function updateNativeRange(range, startContainer, startOffset, endContainer, endOffset) {
                    var startMoved = (range.startContainer !== startContainer || range.startOffset != startOffset);
                    var endMoved = (range.endContainer !== endContainer || range.endOffset != endOffset);
                    var nativeRangeDifferent = !range.equals(range.nativeRange);

                    // Always set both boundaries for the benefit of IE9 (see issue 35)
                    if (startMoved || endMoved || nativeRangeDifferent) {
                        range.setEnd(endContainer, endOffset);
                        range.setStart(startContainer, startOffset);
                    }
                }

                var createBeforeAfterNodeSetter;

                WrappedRange = function(range) {
                    if (!range) {
                        throw module.createError("WrappedRange: Range must be specified");
                    }
                    this.nativeRange = range;
                    updateRangeProperties(this);
                };

                DomRange.createPrototypeRange(WrappedRange, updateNativeRange);

                rangeProto = WrappedRange.prototype;

                rangeProto.selectNode = function(node) {
                    this.nativeRange.selectNode(node);
                    updateRangeProperties(this);
                };

                rangeProto.cloneContents = function() {
                    return this.nativeRange.cloneContents();
                };

                // Due to a long-standing Firefox bug that I have not been able to find a reliable way to detect,
                // insertNode() is never delegated to the native range.

                rangeProto.surroundContents = function(node) {
                    this.nativeRange.surroundContents(node);
                    updateRangeProperties(this);
                };

                rangeProto.collapse = function(isStart) {
                    this.nativeRange.collapse(isStart);
                    updateRangeProperties(this);
                };

                rangeProto.cloneRange = function() {
                    return new WrappedRange(this.nativeRange.cloneRange());
                };

                rangeProto.refresh = function() {
                    updateRangeProperties(this);
                };

                rangeProto.toString = function() {
                    return this.nativeRange.toString();
                };

                // Create test range and node for feature detection

                var testTextNode = document.createTextNode("test");
                getBody(document).appendChild(testTextNode);
                var range = document.createRange();

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for Firefox 2 bug that prevents moving the start of a Range to a point after its current end and
                // correct for it

                range.setStart(testTextNode, 0);
                range.setEnd(testTextNode, 0);

                try {
                    range.setStart(testTextNode, 1);

                    rangeProto.setStart = function(node, offset) {
                        this.nativeRange.setStart(node, offset);
                        updateRangeProperties(this);
                    };

                    rangeProto.setEnd = function(node, offset) {
                        this.nativeRange.setEnd(node, offset);
                        updateRangeProperties(this);
                    };

                    createBeforeAfterNodeSetter = function(name) {
                        return function(node) {
                            this.nativeRange[name](node);
                            updateRangeProperties(this);
                        };
                    };

                } catch(ex) {

                    rangeProto.setStart = function(node, offset) {
                        try {
                            this.nativeRange.setStart(node, offset);
                        } catch (ex) {
                            this.nativeRange.setEnd(node, offset);
                            this.nativeRange.setStart(node, offset);
                        }
                        updateRangeProperties(this);
                    };

                    rangeProto.setEnd = function(node, offset) {
                        try {
                            this.nativeRange.setEnd(node, offset);
                        } catch (ex) {
                            this.nativeRange.setStart(node, offset);
                            this.nativeRange.setEnd(node, offset);
                        }
                        updateRangeProperties(this);
                    };

                    createBeforeAfterNodeSetter = function(name, oppositeName) {
                        return function(node) {
                            try {
                                this.nativeRange[name](node);
                            } catch (ex) {
                                this.nativeRange[oppositeName](node);
                                this.nativeRange[name](node);
                            }
                            updateRangeProperties(this);
                        };
                    };
                }

                rangeProto.setStartBefore = createBeforeAfterNodeSetter("setStartBefore", "setEndBefore");
                rangeProto.setStartAfter = createBeforeAfterNodeSetter("setStartAfter", "setEndAfter");
                rangeProto.setEndBefore = createBeforeAfterNodeSetter("setEndBefore", "setStartBefore");
                rangeProto.setEndAfter = createBeforeAfterNodeSetter("setEndAfter", "setStartAfter");

                /*--------------------------------------------------------------------------------------------------------*/

                // Always use DOM4-compliant selectNodeContents implementation: it's simpler and less code than testing
                // whether the native implementation can be trusted
                rangeProto.selectNodeContents = function(node) {
                    this.setStartAndEnd(node, 0, dom.getNodeLength(node));
                };

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for and correct WebKit bug that has the behaviour of compareBoundaryPoints round the wrong way for
                // constants START_TO_END and END_TO_START: https://bugs.webkit.org/show_bug.cgi?id=20738

                range.selectNodeContents(testTextNode);
                range.setEnd(testTextNode, 3);

                var range2 = document.createRange();
                range2.selectNodeContents(testTextNode);
                range2.setEnd(testTextNode, 4);
                range2.setStart(testTextNode, 2);

                if (range.compareBoundaryPoints(range.START_TO_END, range2) == -1 &&
                        range.compareBoundaryPoints(range.END_TO_START, range2) == 1) {
                    // This is the wrong way round, so correct for it

                    rangeProto.compareBoundaryPoints = function(type, range) {
                        range = range.nativeRange || range;
                        if (type == range.START_TO_END) {
                            type = range.END_TO_START;
                        } else if (type == range.END_TO_START) {
                            type = range.START_TO_END;
                        }
                        return this.nativeRange.compareBoundaryPoints(type, range);
                    };
                } else {
                    rangeProto.compareBoundaryPoints = function(type, range) {
                        return this.nativeRange.compareBoundaryPoints(type, range.nativeRange || range);
                    };
                }

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for IE deleteContents() and extractContents() bug and correct it. See issue 107.

                var el = document.createElement("div");
                el.innerHTML = "123";
                var textNode = el.firstChild;
                var body = getBody(document);
                body.appendChild(el);

                range.setStart(textNode, 1);
                range.setEnd(textNode, 2);
                range.deleteContents();

                if (textNode.data == "13") {
                    // Behaviour is correct per DOM4 Range so wrap the browser's implementation of deleteContents() and
                    // extractContents()
                    rangeProto.deleteContents = function() {
                        this.nativeRange.deleteContents();
                        updateRangeProperties(this);
                    };

                    rangeProto.extractContents = function() {
                        var frag = this.nativeRange.extractContents();
                        updateRangeProperties(this);
                        return frag;
                    };
                } else {
                }

                body.removeChild(el);
                body = null;

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for existence of createContextualFragment and delegate to it if it exists
                if (util.isHostMethod(range, "createContextualFragment")) {
                    rangeProto.createContextualFragment = function(fragmentStr) {
                        return this.nativeRange.createContextualFragment(fragmentStr);
                    };
                }

                /*--------------------------------------------------------------------------------------------------------*/

                // Clean up
                getBody(document).removeChild(testTextNode);

                rangeProto.getName = function() {
                    return "WrappedRange";
                };

                api.WrappedRange = WrappedRange;

                api.createNativeRange = function(doc) {
                    doc = getContentDocument(doc, module, "createNativeRange");
                    return doc.createRange();
                };
            })();
        }

        if (api.features.implementsTextRange) {
            /*
            This is a workaround for a bug where IE returns the wrong container element from the TextRange's parentElement()
            method. For example, in the following (where pipes denote the selection boundaries):

            <ul id="ul"><li id="a">| a </li><li id="b"> b |</li></ul>

            var range = document.selection.createRange();
            alert(range.parentElement().id); // Should alert "ul" but alerts "b"

            This method returns the common ancestor node of the following:
            - the parentElement() of the textRange
            - the parentElement() of the textRange after calling collapse(true)
            - the parentElement() of the textRange after calling collapse(false)
            */
            var getTextRangeContainerElement = function(textRange) {
                var parentEl = textRange.parentElement();
                var range = textRange.duplicate();
                range.collapse(true);
                var startEl = range.parentElement();
                range = textRange.duplicate();
                range.collapse(false);
                var endEl = range.parentElement();
                var startEndContainer = (startEl == endEl) ? startEl : dom.getCommonAncestor(startEl, endEl);

                return startEndContainer == parentEl ? startEndContainer : dom.getCommonAncestor(parentEl, startEndContainer);
            };

            var textRangeIsCollapsed = function(textRange) {
                return textRange.compareEndPoints("StartToEnd", textRange) == 0;
            };

            // Gets the boundary of a TextRange expressed as a node and an offset within that node. This function started
            // out as an improved version of code found in Tim Cameron Ryan's IERange (http://code.google.com/p/ierange/)
            // but has grown, fixing problems with line breaks in preformatted text, adding workaround for IE TextRange
            // bugs, handling for inputs and images, plus optimizations.
            var getTextRangeBoundaryPosition = function(textRange, wholeRangeContainerElement, isStart, isCollapsed, startInfo) {
                var workingRange = textRange.duplicate();
                workingRange.collapse(isStart);
                var containerElement = workingRange.parentElement();

                // Sometimes collapsing a TextRange that's at the start of a text node can move it into the previous node, so
                // check for that
                if (!dom.isOrIsAncestorOf(wholeRangeContainerElement, containerElement)) {
                    containerElement = wholeRangeContainerElement;
                }


                // Deal with nodes that cannot "contain rich HTML markup". In practice, this means form inputs, images and
                // similar. See http://msdn.microsoft.com/en-us/library/aa703950%28VS.85%29.aspx
                if (!containerElement.canHaveHTML) {
                    var pos = new DomPosition(containerElement.parentNode, dom.getNodeIndex(containerElement));
                    return {
                        boundaryPosition: pos,
                        nodeInfo: {
                            nodeIndex: pos.offset,
                            containerElement: pos.node
                        }
                    };
                }

                var workingNode = dom.getDocument(containerElement).createElement("span");

                // Workaround for HTML5 Shiv's insane violation of document.createElement(). See Rangy issue 104 and HTML5
                // Shiv issue 64: https://github.com/aFarkas/html5shiv/issues/64
                if (workingNode.parentNode) {
                    dom.removeNode(workingNode);
                }

                var comparison, workingComparisonType = isStart ? "StartToStart" : "StartToEnd";
                var previousNode, nextNode, boundaryPosition, boundaryNode;
                var start = (startInfo && startInfo.containerElement == containerElement) ? startInfo.nodeIndex : 0;
                var childNodeCount = containerElement.childNodes.length;
                var end = childNodeCount;

                // Check end first. Code within the loop assumes that the endth child node of the container is definitely
                // after the range boundary.
                var nodeIndex = end;

                while (true) {
                    if (nodeIndex == childNodeCount) {
                        containerElement.appendChild(workingNode);
                    } else {
                        containerElement.insertBefore(workingNode, containerElement.childNodes[nodeIndex]);
                    }
                    workingRange.moveToElementText(workingNode);
                    comparison = workingRange.compareEndPoints(workingComparisonType, textRange);
                    if (comparison == 0 || start == end) {
                        break;
                    } else if (comparison == -1) {
                        if (end == start + 1) {
                            // We know the endth child node is after the range boundary, so we must be done.
                            break;
                        } else {
                            start = nodeIndex;
                        }
                    } else {
                        end = (end == start + 1) ? start : nodeIndex;
                    }
                    nodeIndex = Math.floor((start + end) / 2);
                    containerElement.removeChild(workingNode);
                }


                // We've now reached or gone past the boundary of the text range we're interested in
                // so have identified the node we want
                boundaryNode = workingNode.nextSibling;

                if (comparison == -1 && boundaryNode && isCharacterDataNode(boundaryNode)) {
                    // This is a character data node (text, comment, cdata). The working range is collapsed at the start of
                    // the node containing the text range's boundary, so we move the end of the working range to the
                    // boundary point and measure the length of its text to get the boundary's offset within the node.
                    workingRange.setEndPoint(isStart ? "EndToStart" : "EndToEnd", textRange);

                    var offset;

                    if (/[\r\n]/.test(boundaryNode.data)) {
                        /*
                        For the particular case of a boundary within a text node containing rendered line breaks (within a
                        <pre> element, for example), we need a slightly complicated approach to get the boundary's offset in
                        IE. The facts:

                        - Each line break is represented as \r in the text node's data/nodeValue properties
                        - Each line break is represented as \r\n in the TextRange's 'text' property
                        - The 'text' property of the TextRange does not contain trailing line breaks

                        To get round the problem presented by the final fact above, we can use the fact that TextRange's
                        moveStart() and moveEnd() methods return the actual number of characters moved, which is not
                        necessarily the same as the number of characters it was instructed to move. The simplest approach is
                        to use this to store the characters moved when moving both the start and end of the range to the
                        start of the document body and subtracting the start offset from the end offset (the
                        "move-negative-gazillion" method). However, this is extremely slow when the document is large and
                        the range is near the end of it. Clearly doing the mirror image (i.e. moving the range boundaries to
                        the end of the document) has the same problem.

                        Another approach that works is to use moveStart() to move the start boundary of the range up to the
                        end boundary one character at a time and incrementing a counter with the value returned by the
                        moveStart() call. However, the check for whether the start boundary has reached the end boundary is
                        expensive, so this method is slow (although unlike "move-negative-gazillion" is largely unaffected
                        by the location of the range within the document).

                        The approach used below is a hybrid of the two methods above. It uses the fact that a string
                        containing the TextRange's 'text' property with each \r\n converted to a single \r character cannot
                        be longer than the text of the TextRange, so the start of the range is moved that length initially
                        and then a character at a time to make up for any trailing line breaks not contained in the 'text'
                        property. This has good performance in most situations compared to the previous two methods.
                        */
                        var tempRange = workingRange.duplicate();
                        var rangeLength = tempRange.text.replace(/\r\n/g, "\r").length;

                        offset = tempRange.moveStart("character", rangeLength);
                        while ( (comparison = tempRange.compareEndPoints("StartToEnd", tempRange)) == -1) {
                            offset++;
                            tempRange.moveStart("character", 1);
                        }
                    } else {
                        offset = workingRange.text.length;
                    }
                    boundaryPosition = new DomPosition(boundaryNode, offset);
                } else {

                    // If the boundary immediately follows a character data node and this is the end boundary, we should favour
                    // a position within that, and likewise for a start boundary preceding a character data node
                    previousNode = (isCollapsed || !isStart) && workingNode.previousSibling;
                    nextNode = (isCollapsed || isStart) && workingNode.nextSibling;
                    if (nextNode && isCharacterDataNode(nextNode)) {
                        boundaryPosition = new DomPosition(nextNode, 0);
                    } else if (previousNode && isCharacterDataNode(previousNode)) {
                        boundaryPosition = new DomPosition(previousNode, previousNode.data.length);
                    } else {
                        boundaryPosition = new DomPosition(containerElement, dom.getNodeIndex(workingNode));
                    }
                }

                // Clean up
                dom.removeNode(workingNode);

                return {
                    boundaryPosition: boundaryPosition,
                    nodeInfo: {
                        nodeIndex: nodeIndex,
                        containerElement: containerElement
                    }
                };
            };

            // Returns a TextRange representing the boundary of a TextRange expressed as a node and an offset within that
            // node. This function started out as an optimized version of code found in Tim Cameron Ryan's IERange
            // (http://code.google.com/p/ierange/)
            var createBoundaryTextRange = function(boundaryPosition, isStart) {
                var boundaryNode, boundaryParent, boundaryOffset = boundaryPosition.offset;
                var doc = dom.getDocument(boundaryPosition.node);
                var workingNode, childNodes, workingRange = getBody(doc).createTextRange();
                var nodeIsDataNode = isCharacterDataNode(boundaryPosition.node);

                if (nodeIsDataNode) {
                    boundaryNode = boundaryPosition.node;
                    boundaryParent = boundaryNode.parentNode;
                } else {
                    childNodes = boundaryPosition.node.childNodes;
                    boundaryNode = (boundaryOffset < childNodes.length) ? childNodes[boundaryOffset] : null;
                    boundaryParent = boundaryPosition.node;
                }

                // Position the range immediately before the node containing the boundary
                workingNode = doc.createElement("span");

                // Making the working element non-empty element persuades IE to consider the TextRange boundary to be within
                // the element rather than immediately before or after it
                workingNode.innerHTML = "&#feff;";

                // insertBefore is supposed to work like appendChild if the second parameter is null. However, a bug report
                // for IERange suggests that it can crash the browser: http://code.google.com/p/ierange/issues/detail?id=12
                if (boundaryNode) {
                    boundaryParent.insertBefore(workingNode, boundaryNode);
                } else {
                    boundaryParent.appendChild(workingNode);
                }

                workingRange.moveToElementText(workingNode);
                workingRange.collapse(!isStart);

                // Clean up
                boundaryParent.removeChild(workingNode);

                // Move the working range to the text offset, if required
                if (nodeIsDataNode) {
                    workingRange[isStart ? "moveStart" : "moveEnd"]("character", boundaryOffset);
                }

                return workingRange;
            };

            /*------------------------------------------------------------------------------------------------------------*/

            // This is a wrapper around a TextRange, providing full DOM Range functionality using rangy's DomRange as a
            // prototype

            WrappedTextRange = function(textRange) {
                this.textRange = textRange;
                this.refresh();
            };

            WrappedTextRange.prototype = new DomRange(document);

            WrappedTextRange.prototype.refresh = function() {
                var start, end, startBoundary;

                // TextRange's parentElement() method cannot be trusted. getTextRangeContainerElement() works around that.
                var rangeContainerElement = getTextRangeContainerElement(this.textRange);

                if (textRangeIsCollapsed(this.textRange)) {
                    end = start = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true,
                        true).boundaryPosition;
                } else {
                    startBoundary = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true, false);
                    start = startBoundary.boundaryPosition;

                    // An optimization used here is that if the start and end boundaries have the same parent element, the
                    // search scope for the end boundary can be limited to exclude the portion of the element that precedes
                    // the start boundary
                    end = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, false, false,
                        startBoundary.nodeInfo).boundaryPosition;
                }

                this.setStart(start.node, start.offset);
                this.setEnd(end.node, end.offset);
            };

            WrappedTextRange.prototype.getName = function() {
                return "WrappedTextRange";
            };

            DomRange.copyComparisonConstants(WrappedTextRange);

            var rangeToTextRange = function(range) {
                if (range.collapsed) {
                    return createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                } else {
                    var startRange = createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                    var endRange = createBoundaryTextRange(new DomPosition(range.endContainer, range.endOffset), false);
                    var textRange = getBody( DomRange.getRangeDocument(range) ).createTextRange();
                    textRange.setEndPoint("StartToStart", startRange);
                    textRange.setEndPoint("EndToEnd", endRange);
                    return textRange;
                }
            };

            WrappedTextRange.rangeToTextRange = rangeToTextRange;

            WrappedTextRange.prototype.toTextRange = function() {
                return rangeToTextRange(this);
            };

            api.WrappedTextRange = WrappedTextRange;

            // IE 9 and above have both implementations and Rangy makes both available. The next few lines sets which
            // implementation to use by default.
            if (!api.features.implementsDomRange || api.config.preferTextRange) {
                // Add WrappedTextRange as the Range property of the global object to allow expression like Range.END_TO_END to work
                var globalObj = (function(f) { return f("return this;")(); })(Function);
                if (typeof globalObj.Range == "undefined") {
                    globalObj.Range = WrappedTextRange;
                }

                api.createNativeRange = function(doc) {
                    doc = getContentDocument(doc, module, "createNativeRange");
                    return getBody(doc).createTextRange();
                };

                api.WrappedRange = WrappedTextRange;
            }
        }

        api.createRange = function(doc) {
            doc = getContentDocument(doc, module, "createRange");
            return new api.WrappedRange(api.createNativeRange(doc));
        };

        api.createRangyRange = function(doc) {
            doc = getContentDocument(doc, module, "createRangyRange");
            return new DomRange(doc);
        };

        util.createAliasForDeprecatedMethod(api, "createIframeRange", "createRange");
        util.createAliasForDeprecatedMethod(api, "createIframeRangyRange", "createRangyRange");

        api.addShimListener(function(win) {
            var doc = win.document;
            if (typeof doc.createRange == "undefined") {
                doc.createRange = function() {
                    return api.createRange(doc);
                };
            }
            doc = win = null;
        });
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // This module creates a selection object wrapper that conforms as closely as possible to the Selection specification
    // in the HTML Editing spec (http://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#selections)
    api.createCoreModule("WrappedSelection", ["DomRange", "WrappedRange"], function(api, module) {
        api.config.checkSelectionRanges = true;

        var BOOLEAN = "boolean";
        var NUMBER = "number";
        var dom = api.dom;
        var util = api.util;
        var isHostMethod = util.isHostMethod;
        var DomRange = api.DomRange;
        var WrappedRange = api.WrappedRange;
        var DOMException = api.DOMException;
        var DomPosition = dom.DomPosition;
        var getNativeSelection;
        var selectionIsCollapsed;
        var features = api.features;
        var CONTROL = "Control";
        var getDocument = dom.getDocument;
        var getBody = dom.getBody;
        var rangesEqual = DomRange.rangesEqual;


        // Utility function to support direction parameters in the API that may be a string ("backward", "backwards",
        // "forward" or "forwards") or a Boolean (true for backwards).
        function isDirectionBackward(dir) {
            return (typeof dir == "string") ? /^backward(s)?$/i.test(dir) : !!dir;
        }

        function getWindow(win, methodName) {
            if (!win) {
                return window;
            } else if (dom.isWindow(win)) {
                return win;
            } else if (win instanceof WrappedSelection) {
                return win.win;
            } else {
                var doc = dom.getContentDocument(win, module, methodName);
                return dom.getWindow(doc);
            }
        }

        function getWinSelection(winParam) {
            return getWindow(winParam, "getWinSelection").getSelection();
        }

        function getDocSelection(winParam) {
            return getWindow(winParam, "getDocSelection").document.selection;
        }

        function winSelectionIsBackward(sel) {
            var backward = false;
            if (sel.anchorNode) {
                backward = (dom.comparePoints(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset) == 1);
            }
            return backward;
        }

        // Test for the Range/TextRange and Selection features required
        // Test for ability to retrieve selection
        var implementsWinGetSelection = isHostMethod(window, "getSelection"),
            implementsDocSelection = util.isHostObject(document, "selection");

        features.implementsWinGetSelection = implementsWinGetSelection;
        features.implementsDocSelection = implementsDocSelection;

        var useDocumentSelection = implementsDocSelection && (!implementsWinGetSelection || api.config.preferTextRange);

        if (useDocumentSelection) {
            getNativeSelection = getDocSelection;
            api.isSelectionValid = function(winParam) {
                var doc = getWindow(winParam, "isSelectionValid").document, nativeSel = doc.selection;

                // Check whether the selection TextRange is actually contained within the correct document
                return (nativeSel.type != "None" || getDocument(nativeSel.createRange().parentElement()) == doc);
            };
        } else if (implementsWinGetSelection) {
            getNativeSelection = getWinSelection;
            api.isSelectionValid = function() {
                return true;
            };
        } else {
            module.fail("Neither document.selection or window.getSelection() detected.");
            return false;
        }

        api.getNativeSelection = getNativeSelection;

        var testSelection = getNativeSelection();

        // In Firefox, the selection is null in an iframe with display: none. See issue #138.
        if (!testSelection) {
            module.fail("Native selection was null (possibly issue 138?)");
            return false;
        }

        var testRange = api.createNativeRange(document);
        var body = getBody(document);

        // Obtaining a range from a selection
        var selectionHasAnchorAndFocus = util.areHostProperties(testSelection,
            ["anchorNode", "focusNode", "anchorOffset", "focusOffset"]);

        features.selectionHasAnchorAndFocus = selectionHasAnchorAndFocus;

        // Test for existence of native selection extend() method
        var selectionHasExtend = isHostMethod(testSelection, "extend");
        features.selectionHasExtend = selectionHasExtend;

        // Test if rangeCount exists
        var selectionHasRangeCount = (typeof testSelection.rangeCount == NUMBER);
        features.selectionHasRangeCount = selectionHasRangeCount;

        var selectionSupportsMultipleRanges = false;
        var collapsedNonEditableSelectionsSupported = true;

        var addRangeBackwardToNative = selectionHasExtend ?
            function(nativeSelection, range) {
                var doc = DomRange.getRangeDocument(range);
                var endRange = api.createRange(doc);
                endRange.collapseToPoint(range.endContainer, range.endOffset);
                nativeSelection.addRange(getNativeRange(endRange));
                nativeSelection.extend(range.startContainer, range.startOffset);
            } : null;

        if (util.areHostMethods(testSelection, ["addRange", "getRangeAt", "removeAllRanges"]) &&
                typeof testSelection.rangeCount == NUMBER && features.implementsDomRange) {

            (function() {
                // Previously an iframe was used but this caused problems in some circumstances in IE, so tests are
                // performed on the current document's selection. See issue 109.

                // Note also that if a selection previously existed, it is wiped and later restored by these tests. This
                // will result in the selection direction begin reversed if the original selection was backwards and the
                // browser does not support setting backwards selections (Internet Explorer, I'm looking at you).
                var sel = window.getSelection();
                if (sel) {
                    // Store the current selection
                    var originalSelectionRangeCount = sel.rangeCount;
                    var selectionHasMultipleRanges = (originalSelectionRangeCount > 1);
                    var originalSelectionRanges = [];
                    var originalSelectionBackward = winSelectionIsBackward(sel);
                    for (var i = 0; i < originalSelectionRangeCount; ++i) {
                        originalSelectionRanges[i] = sel.getRangeAt(i);
                    }

                    // Create some test elements
                    var testEl = dom.createTestElement(document, "", false);
                    var textNode = testEl.appendChild( document.createTextNode("\u00a0\u00a0\u00a0") );

                    // Test whether the native selection will allow a collapsed selection within a non-editable element
                    var r1 = document.createRange();

                    r1.setStart(textNode, 1);
                    r1.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(r1);
                    collapsedNonEditableSelectionsSupported = (sel.rangeCount == 1);
                    sel.removeAllRanges();

                    // Test whether the native selection is capable of supporting multiple ranges.
                    if (!selectionHasMultipleRanges) {
                        // Doing the original feature test here in Chrome 36 (and presumably later versions) prints a
                        // console error of "Discontiguous selection is not supported." that cannot be suppressed. There's
                        // nothing we can do about this while retaining the feature test so we have to resort to a browser
                        // sniff. I'm not happy about it. See
                        // https://code.google.com/p/chromium/issues/detail?id=399791
                        var chromeMatch = window.navigator.appVersion.match(/Chrome\/(.*?) /);
                        if (chromeMatch && parseInt(chromeMatch[1]) >= 36) {
                            selectionSupportsMultipleRanges = false;
                        } else {
                            var r2 = r1.cloneRange();
                            r1.setStart(textNode, 0);
                            r2.setEnd(textNode, 3);
                            r2.setStart(textNode, 2);
                            sel.addRange(r1);
                            sel.addRange(r2);
                            selectionSupportsMultipleRanges = (sel.rangeCount == 2);
                        }
                    }

                    // Clean up
                    dom.removeNode(testEl);
                    sel.removeAllRanges();

                    for (i = 0; i < originalSelectionRangeCount; ++i) {
                        if (i == 0 && originalSelectionBackward) {
                            if (addRangeBackwardToNative) {
                                addRangeBackwardToNative(sel, originalSelectionRanges[i]);
                            } else {
                                api.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend");
                                sel.addRange(originalSelectionRanges[i]);
                            }
                        } else {
                            sel.addRange(originalSelectionRanges[i]);
                        }
                    }
                }
            })();
        }

        features.selectionSupportsMultipleRanges = selectionSupportsMultipleRanges;
        features.collapsedNonEditableSelectionsSupported = collapsedNonEditableSelectionsSupported;

        // ControlRanges
        var implementsControlRange = false, testControlRange;

        if (body && isHostMethod(body, "createControlRange")) {
            testControlRange = body.createControlRange();
            if (util.areHostProperties(testControlRange, ["item", "add"])) {
                implementsControlRange = true;
            }
        }
        features.implementsControlRange = implementsControlRange;

        // Selection collapsedness
        if (selectionHasAnchorAndFocus) {
            selectionIsCollapsed = function(sel) {
                return sel.anchorNode === sel.focusNode && sel.anchorOffset === sel.focusOffset;
            };
        } else {
            selectionIsCollapsed = function(sel) {
                return sel.rangeCount ? sel.getRangeAt(sel.rangeCount - 1).collapsed : false;
            };
        }

        function updateAnchorAndFocusFromRange(sel, range, backward) {
            var anchorPrefix = backward ? "end" : "start", focusPrefix = backward ? "start" : "end";
            sel.anchorNode = range[anchorPrefix + "Container"];
            sel.anchorOffset = range[anchorPrefix + "Offset"];
            sel.focusNode = range[focusPrefix + "Container"];
            sel.focusOffset = range[focusPrefix + "Offset"];
        }

        function updateAnchorAndFocusFromNativeSelection(sel) {
            var nativeSel = sel.nativeSelection;
            sel.anchorNode = nativeSel.anchorNode;
            sel.anchorOffset = nativeSel.anchorOffset;
            sel.focusNode = nativeSel.focusNode;
            sel.focusOffset = nativeSel.focusOffset;
        }

        function updateEmptySelection(sel) {
            sel.anchorNode = sel.focusNode = null;
            sel.anchorOffset = sel.focusOffset = 0;
            sel.rangeCount = 0;
            sel.isCollapsed = true;
            sel._ranges.length = 0;
        }

        function getNativeRange(range) {
            var nativeRange;
            if (range instanceof DomRange) {
                nativeRange = api.createNativeRange(range.getDocument());
                nativeRange.setEnd(range.endContainer, range.endOffset);
                nativeRange.setStart(range.startContainer, range.startOffset);
            } else if (range instanceof WrappedRange) {
                nativeRange = range.nativeRange;
            } else if (features.implementsDomRange && (range instanceof dom.getWindow(range.startContainer).Range)) {
                nativeRange = range;
            }
            return nativeRange;
        }

        function rangeContainsSingleElement(rangeNodes) {
            if (!rangeNodes.length || rangeNodes[0].nodeType != 1) {
                return false;
            }
            for (var i = 1, len = rangeNodes.length; i < len; ++i) {
                if (!dom.isAncestorOf(rangeNodes[0], rangeNodes[i])) {
                    return false;
                }
            }
            return true;
        }

        function getSingleElementFromRange(range) {
            var nodes = range.getNodes();
            if (!rangeContainsSingleElement(nodes)) {
                throw module.createError("getSingleElementFromRange: range " + range.inspect() + " did not consist of a single element");
            }
            return nodes[0];
        }

        // Simple, quick test which only needs to distinguish between a TextRange and a ControlRange
        function isTextRange(range) {
            return !!range && typeof range.text != "undefined";
        }

        function updateFromTextRange(sel, range) {
            // Create a Range from the selected TextRange
            var wrappedRange = new WrappedRange(range);
            sel._ranges = [wrappedRange];

            updateAnchorAndFocusFromRange(sel, wrappedRange, false);
            sel.rangeCount = 1;
            sel.isCollapsed = wrappedRange.collapsed;
        }

        function updateControlSelection(sel) {
            // Update the wrapped selection based on what's now in the native selection
            sel._ranges.length = 0;
            if (sel.docSelection.type == "None") {
                updateEmptySelection(sel);
            } else {
                var controlRange = sel.docSelection.createRange();
                if (isTextRange(controlRange)) {
                    // This case (where the selection type is "Control" and calling createRange() on the selection returns
                    // a TextRange) can happen in IE 9. It happens, for example, when all elements in the selected
                    // ControlRange have been removed from the ControlRange and removed from the document.
                    updateFromTextRange(sel, controlRange);
                } else {
                    sel.rangeCount = controlRange.length;
                    var range, doc = getDocument(controlRange.item(0));
                    for (var i = 0; i < sel.rangeCount; ++i) {
                        range = api.createRange(doc);
                        range.selectNode(controlRange.item(i));
                        sel._ranges.push(range);
                    }
                    sel.isCollapsed = sel.rangeCount == 1 && sel._ranges[0].collapsed;
                    updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
                }
            }
        }

        function addRangeToControlSelection(sel, range) {
            var controlRange = sel.docSelection.createRange();
            var rangeElement = getSingleElementFromRange(range);

            // Create a new ControlRange containing all the elements in the selected ControlRange plus the element
            // contained by the supplied range
            var doc = getDocument(controlRange.item(0));
            var newControlRange = getBody(doc).createControlRange();
            for (var i = 0, len = controlRange.length; i < len; ++i) {
                newControlRange.add(controlRange.item(i));
            }
            try {
                newControlRange.add(rangeElement);
            } catch (ex) {
                throw module.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
            }
            newControlRange.select();

            // Update the wrapped selection based on what's now in the native selection
            updateControlSelection(sel);
        }

        var getSelectionRangeAt;

        if (isHostMethod(testSelection, "getRangeAt")) {
            // try/catch is present because getRangeAt() must have thrown an error in some browser and some situation.
            // Unfortunately, I didn't write a comment about the specifics and am now scared to take it out. Let that be a
            // lesson to us all, especially me.
            getSelectionRangeAt = function(sel, index) {
                try {
                    return sel.getRangeAt(index);
                } catch (ex) {
                    return null;
                }
            };
        } else if (selectionHasAnchorAndFocus) {
            getSelectionRangeAt = function(sel) {
                var doc = getDocument(sel.anchorNode);
                var range = api.createRange(doc);
                range.setStartAndEnd(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset);

                // Handle the case when the selection was selected backwards (from the end to the start in the
                // document)
                if (range.collapsed !== this.isCollapsed) {
                    range.setStartAndEnd(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset);
                }

                return range;
            };
        }

        function WrappedSelection(selection, docSelection, win) {
            this.nativeSelection = selection;
            this.docSelection = docSelection;
            this._ranges = [];
            this.win = win;
            this.refresh();
        }

        WrappedSelection.prototype = api.selectionPrototype;

        function deleteProperties(sel) {
            sel.win = sel.anchorNode = sel.focusNode = sel._ranges = null;
            sel.rangeCount = sel.anchorOffset = sel.focusOffset = 0;
            sel.detached = true;
        }

        var cachedRangySelections = [];

        function actOnCachedSelection(win, action) {
            var i = cachedRangySelections.length, cached, sel;
            while (i--) {
                cached = cachedRangySelections[i];
                sel = cached.selection;
                if (action == "deleteAll") {
                    deleteProperties(sel);
                } else if (cached.win == win) {
                    if (action == "delete") {
                        cachedRangySelections.splice(i, 1);
                        return true;
                    } else {
                        return sel;
                    }
                }
            }
            if (action == "deleteAll") {
                cachedRangySelections.length = 0;
            }
            return null;
        }

        var getSelection = function(win) {
            // Check if the parameter is a Rangy Selection object
            if (win && win instanceof WrappedSelection) {
                win.refresh();
                return win;
            }

            win = getWindow(win, "getNativeSelection");

            var sel = actOnCachedSelection(win);
            var nativeSel = getNativeSelection(win), docSel = implementsDocSelection ? getDocSelection(win) : null;
            if (sel) {
                sel.nativeSelection = nativeSel;
                sel.docSelection = docSel;
                sel.refresh();
            } else {
                sel = new WrappedSelection(nativeSel, docSel, win);
                cachedRangySelections.push( { win: win, selection: sel } );
            }
            return sel;
        };

        api.getSelection = getSelection;

        util.createAliasForDeprecatedMethod(api, "getIframeSelection", "getSelection");

        var selProto = WrappedSelection.prototype;

        function createControlSelection(sel, ranges) {
            // Ensure that the selection becomes of type "Control"
            var doc = getDocument(ranges[0].startContainer);
            var controlRange = getBody(doc).createControlRange();
            for (var i = 0, el, len = ranges.length; i < len; ++i) {
                el = getSingleElementFromRange(ranges[i]);
                try {
                    controlRange.add(el);
                } catch (ex) {
                    throw module.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)");
                }
            }
            controlRange.select();

            // Update the wrapped selection based on what's now in the native selection
            updateControlSelection(sel);
        }

        // Selecting a range
        if (!useDocumentSelection && selectionHasAnchorAndFocus && util.areHostMethods(testSelection, ["removeAllRanges", "addRange"])) {
            selProto.removeAllRanges = function() {
                this.nativeSelection.removeAllRanges();
                updateEmptySelection(this);
            };

            var addRangeBackward = function(sel, range) {
                addRangeBackwardToNative(sel.nativeSelection, range);
                sel.refresh();
            };

            if (selectionHasRangeCount) {
                selProto.addRange = function(range, direction) {
                    if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                        addRangeToControlSelection(this, range);
                    } else {
                        if (isDirectionBackward(direction) && selectionHasExtend) {
                            addRangeBackward(this, range);
                        } else {
                            var previousRangeCount;
                            if (selectionSupportsMultipleRanges) {
                                previousRangeCount = this.rangeCount;
                            } else {
                                this.removeAllRanges();
                                previousRangeCount = 0;
                            }
                            // Clone the native range so that changing the selected range does not affect the selection.
                            // This is contrary to the spec but is the only way to achieve consistency between browsers. See
                            // issue 80.
                            var clonedNativeRange = getNativeRange(range).cloneRange();
                            try {
                                this.nativeSelection.addRange(clonedNativeRange);
                            } catch (ex) {
                            }

                            // Check whether adding the range was successful
                            this.rangeCount = this.nativeSelection.rangeCount;

                            if (this.rangeCount == previousRangeCount + 1) {
                                // The range was added successfully

                                // Check whether the range that we added to the selection is reflected in the last range extracted from
                                // the selection
                                if (api.config.checkSelectionRanges) {
                                    var nativeRange = getSelectionRangeAt(this.nativeSelection, this.rangeCount - 1);
                                    if (nativeRange && !rangesEqual(nativeRange, range)) {
                                        // Happens in WebKit with, for example, a selection placed at the start of a text node
                                        range = new WrappedRange(nativeRange);
                                    }
                                }
                                this._ranges[this.rangeCount - 1] = range;
                                updateAnchorAndFocusFromRange(this, range, selectionIsBackward(this.nativeSelection));
                                this.isCollapsed = selectionIsCollapsed(this);
                            } else {
                                // The range was not added successfully. The simplest thing is to refresh
                                this.refresh();
                            }
                        }
                    }
                };
            } else {
                selProto.addRange = function(range, direction) {
                    if (isDirectionBackward(direction) && selectionHasExtend) {
                        addRangeBackward(this, range);
                    } else {
                        this.nativeSelection.addRange(getNativeRange(range));
                        this.refresh();
                    }
                };
            }

            selProto.setRanges = function(ranges) {
                if (implementsControlRange && implementsDocSelection && ranges.length > 1) {
                    createControlSelection(this, ranges);
                } else {
                    this.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        this.addRange(ranges[i]);
                    }
                }
            };
        } else if (isHostMethod(testSelection, "empty") && isHostMethod(testRange, "select") &&
                   implementsControlRange && useDocumentSelection) {

            selProto.removeAllRanges = function() {
                // Added try/catch as fix for issue #21
                try {
                    this.docSelection.empty();

                    // Check for empty() not working (issue #24)
                    if (this.docSelection.type != "None") {
                        // Work around failure to empty a control selection by instead selecting a TextRange and then
                        // calling empty()
                        var doc;
                        if (this.anchorNode) {
                            doc = getDocument(this.anchorNode);
                        } else if (this.docSelection.type == CONTROL) {
                            var controlRange = this.docSelection.createRange();
                            if (controlRange.length) {
                                doc = getDocument( controlRange.item(0) );
                            }
                        }
                        if (doc) {
                            var textRange = getBody(doc).createTextRange();
                            textRange.select();
                            this.docSelection.empty();
                        }
                    }
                } catch(ex) {}
                updateEmptySelection(this);
            };

            selProto.addRange = function(range) {
                if (this.docSelection.type == CONTROL) {
                    addRangeToControlSelection(this, range);
                } else {
                    api.WrappedTextRange.rangeToTextRange(range).select();
                    this._ranges[0] = range;
                    this.rangeCount = 1;
                    this.isCollapsed = this._ranges[0].collapsed;
                    updateAnchorAndFocusFromRange(this, range, false);
                }
            };

            selProto.setRanges = function(ranges) {
                this.removeAllRanges();
                var rangeCount = ranges.length;
                if (rangeCount > 1) {
                    createControlSelection(this, ranges);
                } else if (rangeCount) {
                    this.addRange(ranges[0]);
                }
            };
        } else {
            module.fail("No means of selecting a Range or TextRange was found");
            return false;
        }

        selProto.getRangeAt = function(index) {
            if (index < 0 || index >= this.rangeCount) {
                throw new DOMException("INDEX_SIZE_ERR");
            } else {
                // Clone the range to preserve selection-range independence. See issue 80.
                return this._ranges[index].cloneRange();
            }
        };

        var refreshSelection;

        if (useDocumentSelection) {
            refreshSelection = function(sel) {
                var range;
                if (api.isSelectionValid(sel.win)) {
                    range = sel.docSelection.createRange();
                } else {
                    range = getBody(sel.win.document).createTextRange();
                    range.collapse(true);
                }

                if (sel.docSelection.type == CONTROL) {
                    updateControlSelection(sel);
                } else if (isTextRange(range)) {
                    updateFromTextRange(sel, range);
                } else {
                    updateEmptySelection(sel);
                }
            };
        } else if (isHostMethod(testSelection, "getRangeAt") && typeof testSelection.rangeCount == NUMBER) {
            refreshSelection = function(sel) {
                if (implementsControlRange && implementsDocSelection && sel.docSelection.type == CONTROL) {
                    updateControlSelection(sel);
                } else {
                    sel._ranges.length = sel.rangeCount = sel.nativeSelection.rangeCount;
                    if (sel.rangeCount) {
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            sel._ranges[i] = new api.WrappedRange(sel.nativeSelection.getRangeAt(i));
                        }
                        updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], selectionIsBackward(sel.nativeSelection));
                        sel.isCollapsed = selectionIsCollapsed(sel);
                    } else {
                        updateEmptySelection(sel);
                    }
                }
            };
        } else if (selectionHasAnchorAndFocus && typeof testSelection.isCollapsed == BOOLEAN && typeof testRange.collapsed == BOOLEAN && features.implementsDomRange) {
            refreshSelection = function(sel) {
                var range, nativeSel = sel.nativeSelection;
                if (nativeSel.anchorNode) {
                    range = getSelectionRangeAt(nativeSel, 0);
                    sel._ranges = [range];
                    sel.rangeCount = 1;
                    updateAnchorAndFocusFromNativeSelection(sel);
                    sel.isCollapsed = selectionIsCollapsed(sel);
                } else {
                    updateEmptySelection(sel);
                }
            };
        } else {
            module.fail("No means of obtaining a Range or TextRange from the user's selection was found");
            return false;
        }

        selProto.refresh = function(checkForChanges) {
            var oldRanges = checkForChanges ? this._ranges.slice(0) : null;
            var oldAnchorNode = this.anchorNode, oldAnchorOffset = this.anchorOffset;

            refreshSelection(this);
            if (checkForChanges) {
                // Check the range count first
                var i = oldRanges.length;
                if (i != this._ranges.length) {
                    return true;
                }

                // Now check the direction. Checking the anchor position is the same is enough since we're checking all the
                // ranges after this
                if (this.anchorNode != oldAnchorNode || this.anchorOffset != oldAnchorOffset) {
                    return true;
                }

                // Finally, compare each range in turn
                while (i--) {
                    if (!rangesEqual(oldRanges[i], this._ranges[i])) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Removal of a single range
        var removeRangeManually = function(sel, range) {
            var ranges = sel.getAllRanges();
            sel.removeAllRanges();
            for (var i = 0, len = ranges.length; i < len; ++i) {
                if (!rangesEqual(range, ranges[i])) {
                    sel.addRange(ranges[i]);
                }
            }
            if (!sel.rangeCount) {
                updateEmptySelection(sel);
            }
        };

        if (implementsControlRange && implementsDocSelection) {
            selProto.removeRange = function(range) {
                if (this.docSelection.type == CONTROL) {
                    var controlRange = this.docSelection.createRange();
                    var rangeElement = getSingleElementFromRange(range);

                    // Create a new ControlRange containing all the elements in the selected ControlRange minus the
                    // element contained by the supplied range
                    var doc = getDocument(controlRange.item(0));
                    var newControlRange = getBody(doc).createControlRange();
                    var el, removed = false;
                    for (var i = 0, len = controlRange.length; i < len; ++i) {
                        el = controlRange.item(i);
                        if (el !== rangeElement || removed) {
                            newControlRange.add(controlRange.item(i));
                        } else {
                            removed = true;
                        }
                    }
                    newControlRange.select();

                    // Update the wrapped selection based on what's now in the native selection
                    updateControlSelection(this);
                } else {
                    removeRangeManually(this, range);
                }
            };
        } else {
            selProto.removeRange = function(range) {
                removeRangeManually(this, range);
            };
        }

        // Detecting if a selection is backward
        var selectionIsBackward;
        if (!useDocumentSelection && selectionHasAnchorAndFocus && features.implementsDomRange) {
            selectionIsBackward = winSelectionIsBackward;

            selProto.isBackward = function() {
                return selectionIsBackward(this);
            };
        } else {
            selectionIsBackward = selProto.isBackward = function() {
                return false;
            };
        }

        // Create an alias for backwards compatibility. From 1.3, everything is "backward" rather than "backwards"
        selProto.isBackwards = selProto.isBackward;

        // Selection stringifier
        // This is conformant to the old HTML5 selections draft spec but differs from WebKit and Mozilla's implementation.
        // The current spec does not yet define this method.
        selProto.toString = function() {
            var rangeTexts = [];
            for (var i = 0, len = this.rangeCount; i < len; ++i) {
                rangeTexts[i] = "" + this._ranges[i];
            }
            return rangeTexts.join("");
        };

        function assertNodeInSameDocument(sel, node) {
            if (sel.win.document != getDocument(node)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }
        }

        // No current browser conforms fully to the spec for this method, so Rangy's own method is always used
        selProto.collapse = function(node, offset) {
            assertNodeInSameDocument(this, node);
            var range = api.createRange(node);
            range.collapseToPoint(node, offset);
            this.setSingleRange(range);
            this.isCollapsed = true;
        };

        selProto.collapseToStart = function() {
            if (this.rangeCount) {
                var range = this._ranges[0];
                this.collapse(range.startContainer, range.startOffset);
            } else {
                throw new DOMException("INVALID_STATE_ERR");
            }
        };

        selProto.collapseToEnd = function() {
            if (this.rangeCount) {
                var range = this._ranges[this.rangeCount - 1];
                this.collapse(range.endContainer, range.endOffset);
            } else {
                throw new DOMException("INVALID_STATE_ERR");
            }
        };

        // The spec is very specific on how selectAllChildren should be implemented and not all browsers implement it as
        // specified so the native implementation is never used by Rangy.
        selProto.selectAllChildren = function(node) {
            assertNodeInSameDocument(this, node);
            var range = api.createRange(node);
            range.selectNodeContents(node);
            this.setSingleRange(range);
        };

        selProto.deleteFromDocument = function() {
            // Sepcial behaviour required for IE's control selections
            if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                var controlRange = this.docSelection.createRange();
                var element;
                while (controlRange.length) {
                    element = controlRange.item(0);
                    controlRange.remove(element);
                    dom.removeNode(element);
                }
                this.refresh();
            } else if (this.rangeCount) {
                var ranges = this.getAllRanges();
                if (ranges.length) {
                    this.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        ranges[i].deleteContents();
                    }
                    // The spec says nothing about what the selection should contain after calling deleteContents on each
                    // range. Firefox moves the selection to where the final selected range was, so we emulate that
                    this.addRange(ranges[len - 1]);
                }
            }
        };

        // The following are non-standard extensions
        selProto.eachRange = function(func, returnValue) {
            for (var i = 0, len = this._ranges.length; i < len; ++i) {
                if ( func( this.getRangeAt(i) ) ) {
                    return returnValue;
                }
            }
        };

        selProto.getAllRanges = function() {
            var ranges = [];
            this.eachRange(function(range) {
                ranges.push(range);
            });
            return ranges;
        };

        selProto.setSingleRange = function(range, direction) {
            this.removeAllRanges();
            this.addRange(range, direction);
        };

        selProto.callMethodOnEachRange = function(methodName, params) {
            var results = [];
            this.eachRange( function(range) {
                results.push( range[methodName].apply(range, params || []) );
            } );
            return results;
        };

        function createStartOrEndSetter(isStart) {
            return function(node, offset) {
                var range;
                if (this.rangeCount) {
                    range = this.getRangeAt(0);
                    range["set" + (isStart ? "Start" : "End")](node, offset);
                } else {
                    range = api.createRange(this.win.document);
                    range.setStartAndEnd(node, offset);
                }
                this.setSingleRange(range, this.isBackward());
            };
        }

        selProto.setStart = createStartOrEndSetter(true);
        selProto.setEnd = createStartOrEndSetter(false);

        // Add select() method to Range prototype. Any existing selection will be removed.
        api.rangePrototype.select = function(direction) {
            getSelection( this.getDocument() ).setSingleRange(this, direction);
        };

        selProto.changeEachRange = function(func) {
            var ranges = [];
            var backward = this.isBackward();

            this.eachRange(function(range) {
                func(range);
                ranges.push(range);
            });

            this.removeAllRanges();
            if (backward && ranges.length == 1) {
                this.addRange(ranges[0], "backward");
            } else {
                this.setRanges(ranges);
            }
        };

        selProto.containsNode = function(node, allowPartial) {
            return this.eachRange( function(range) {
                return range.containsNode(node, allowPartial);
            }, true ) || false;
        };

        selProto.getBookmark = function(containerNode) {
            return {
                backward: this.isBackward(),
                rangeBookmarks: this.callMethodOnEachRange("getBookmark", [containerNode])
            };
        };

        selProto.moveToBookmark = function(bookmark) {
            var selRanges = [];
            for (var i = 0, rangeBookmark, range; rangeBookmark = bookmark.rangeBookmarks[i++]; ) {
                range = api.createRange(this.win);
                range.moveToBookmark(rangeBookmark);
                selRanges.push(range);
            }
            if (bookmark.backward) {
                this.setSingleRange(selRanges[0], "backward");
            } else {
                this.setRanges(selRanges);
            }
        };

        selProto.saveRanges = function() {
            return {
                backward: this.isBackward(),
                ranges: this.callMethodOnEachRange("cloneRange")
            };
        };

        selProto.restoreRanges = function(selRanges) {
            this.removeAllRanges();
            for (var i = 0, range; range = selRanges.ranges[i]; ++i) {
                this.addRange(range, (selRanges.backward && i == 0));
            }
        };

        selProto.toHtml = function() {
            var rangeHtmls = [];
            this.eachRange(function(range) {
                rangeHtmls.push( DomRange.toHtml(range) );
            });
            return rangeHtmls.join("");
        };

        if (features.implementsTextRange) {
            selProto.getNativeTextRange = function() {
                var sel, textRange;
                if ( (sel = this.docSelection) ) {
                    var range = sel.createRange();
                    if (isTextRange(range)) {
                        return range;
                    } else {
                        throw module.createError("getNativeTextRange: selection is a control selection");
                    }
                } else if (this.rangeCount > 0) {
                    return api.WrappedTextRange.rangeToTextRange( this.getRangeAt(0) );
                } else {
                    throw module.createError("getNativeTextRange: selection contains no range");
                }
            };
        }

        function inspect(sel) {
            var rangeInspects = [];
            var anchor = new DomPosition(sel.anchorNode, sel.anchorOffset);
            var focus = new DomPosition(sel.focusNode, sel.focusOffset);
            var name = (typeof sel.getName == "function") ? sel.getName() : "Selection";

            if (typeof sel.rangeCount != "undefined") {
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    rangeInspects[i] = DomRange.inspect(sel.getRangeAt(i));
                }
            }
            return "[" + name + "(Ranges: " + rangeInspects.join(", ") +
                    ")(anchor: " + anchor.inspect() + ", focus: " + focus.inspect() + "]";
        }

        selProto.getName = function() {
            return "WrappedSelection";
        };

        selProto.inspect = function() {
            return inspect(this);
        };

        selProto.detach = function() {
            actOnCachedSelection(this.win, "delete");
            deleteProperties(this);
        };

        WrappedSelection.detachAll = function() {
            actOnCachedSelection(null, "deleteAll");
        };

        WrappedSelection.inspect = inspect;
        WrappedSelection.isDirectionBackward = isDirectionBackward;

        api.Selection = WrappedSelection;

        api.selectionPrototype = selProto;

        api.addShimListener(function(win) {
            if (typeof win.getSelection == "undefined") {
                win.getSelection = function() {
                    return getSelection(win);
                };
            }
            win = null;
        });
    });
    

    /*----------------------------------------------------------------------------------------------------------------*/

    // Wait for document to load before initializing
    var docReady = false;

    var loadHandler = function(e) {
        if (!docReady) {
            docReady = true;
            if (!api.initialized && api.config.autoInitialize) {
                init();
            }
        }
    };

    if (isBrowser) {
        // Test whether the document has already been loaded and initialize immediately if so
        if (document.readyState == "complete") {
            loadHandler();
        } else {
            if (isHostMethod(document, "addEventListener")) {
                document.addEventListener("DOMContentLoaded", loadHandler, false);
            }

            // Add a fallback in case the DOMContentLoaded event isn't supported
            addListener(window, "load", loadHandler);
        }
    }

    rangy = api;
})();

/**
 * Selection save and restore module for Rangy.
 * Saves and restores user selections using marker invisible elements in the DOM.
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Depends on Rangy core.
 *
 * Copyright 2015, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.1-dev
 * Build date: 20 May 2015
 *
* NOTE: UMD wrapper removed manually for bundling (Oliver Pulges)
*/
rangy.createModule("SaveRestore", ["WrappedRange"], function(api, module) {
    var dom = api.dom;
    var removeNode = dom.removeNode;
    var isDirectionBackward = api.Selection.isDirectionBackward;
    var markerTextChar = "\ufeff";

    function gEBI(id, doc) {
        return (doc || document).getElementById(id);
    }

    function insertRangeBoundaryMarker(range, atStart) {
        var markerId = "selectionBoundary_" + (+new Date()) + "_" + ("" + Math.random()).slice(2);
        var markerEl;
        var doc = dom.getDocument(range.startContainer);

        // Clone the Range and collapse to the appropriate boundary point
        var boundaryRange = range.cloneRange();
        boundaryRange.collapse(atStart);

        // Create the marker element containing a single invisible character using DOM methods and insert it
        markerEl = doc.createElement("span");
        markerEl.id = markerId;
        markerEl.style.lineHeight = "0";
        markerEl.style.display = "none";
        markerEl.className = "rangySelectionBoundary";
        markerEl.appendChild(doc.createTextNode(markerTextChar));

        boundaryRange.insertNode(markerEl);
        return markerEl;
    }

    function setRangeBoundary(doc, range, markerId, atStart) {
        var markerEl = gEBI(markerId, doc);
        if (markerEl) {
            range[atStart ? "setStartBefore" : "setEndBefore"](markerEl);
            removeNode(markerEl);
        } else {
            module.warn("Marker element has been removed. Cannot restore selection.");
        }
    }

    function compareRanges(r1, r2) {
        return r2.compareBoundaryPoints(r1.START_TO_START, r1);
    }

    function saveRange(range, direction) {
        var startEl, endEl, doc = api.DomRange.getRangeDocument(range), text = range.toString();
        var backward = isDirectionBackward(direction);

        if (range.collapsed) {
            endEl = insertRangeBoundaryMarker(range, false);
            return {
                document: doc,
                markerId: endEl.id,
                collapsed: true
            };
        } else {
            endEl = insertRangeBoundaryMarker(range, false);
            startEl = insertRangeBoundaryMarker(range, true);

            return {
                document: doc,
                startMarkerId: startEl.id,
                endMarkerId: endEl.id,
                collapsed: false,
                backward: backward,
                toString: function() {
                    return "original text: '" + text + "', new text: '" + range.toString() + "'";
                }
            };
        }
    }

    function restoreRange(rangeInfo, normalize) {
        var doc = rangeInfo.document;
        if (typeof normalize == "undefined") {
            normalize = true;
        }
        var range = api.createRange(doc);
        if (rangeInfo.collapsed) {
            var markerEl = gEBI(rangeInfo.markerId, doc);
            if (markerEl) {
                markerEl.style.display = "inline";
                var previousNode = markerEl.previousSibling;

                // Workaround for issue 17
                if (previousNode && previousNode.nodeType == 3) {
                    removeNode(markerEl);
                    range.collapseToPoint(previousNode, previousNode.length);
                } else {
                    range.collapseBefore(markerEl);
                    removeNode(markerEl);
                }
            } else {
                module.warn("Marker element has been removed. Cannot restore selection.");
            }
        } else {
            setRangeBoundary(doc, range, rangeInfo.startMarkerId, true);
            setRangeBoundary(doc, range, rangeInfo.endMarkerId, false);
        }

        if (normalize) {
            range.normalizeBoundaries();
        }

        return range;
    }

    function saveRanges(ranges, direction) {
        var rangeInfos = [], range, doc;
        var backward = isDirectionBackward(direction);

        // Order the ranges by position within the DOM, latest first, cloning the array to leave the original untouched
        ranges = ranges.slice(0);
        ranges.sort(compareRanges);

        for (var i = 0, len = ranges.length; i < len; ++i) {
            rangeInfos[i] = saveRange(ranges[i], backward);
        }

        // Now that all the markers are in place and DOM manipulation over, adjust each range's boundaries to lie
        // between its markers
        for (i = len - 1; i >= 0; --i) {
            range = ranges[i];
            doc = api.DomRange.getRangeDocument(range);
            if (range.collapsed) {
                range.collapseAfter(gEBI(rangeInfos[i].markerId, doc));
            } else {
                range.setEndBefore(gEBI(rangeInfos[i].endMarkerId, doc));
                range.setStartAfter(gEBI(rangeInfos[i].startMarkerId, doc));
            }
        }

        return rangeInfos;
    }

    function saveSelection(win) {
        if (!api.isSelectionValid(win)) {
            module.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus.");
            return null;
        }
        var sel = api.getSelection(win);
        var ranges = sel.getAllRanges();
        var backward = (ranges.length == 1 && sel.isBackward());

        var rangeInfos = saveRanges(ranges, backward);

        // Ensure current selection is unaffected
        if (backward) {
            sel.setSingleRange(ranges[0], backward);
        } else {
            sel.setRanges(ranges);
        }

        return {
            win: win,
            rangeInfos: rangeInfos,
            restored: false
        };
    }

    function restoreRanges(rangeInfos) {
        var ranges = [];

        // Ranges are in reverse order of appearance in the DOM. We want to restore earliest first to avoid
        // normalization affecting previously restored ranges.
        var rangeCount = rangeInfos.length;

        for (var i = rangeCount - 1; i >= 0; i--) {
            ranges[i] = restoreRange(rangeInfos[i], true);
        }

        return ranges;
    }

    function restoreSelection(savedSelection, preserveDirection) {
        if (!savedSelection.restored) {
            var rangeInfos = savedSelection.rangeInfos;
            var sel = api.getSelection(savedSelection.win);
            var ranges = restoreRanges(rangeInfos), rangeCount = rangeInfos.length;

            if (rangeCount == 1 && preserveDirection && api.features.selectionHasExtend && rangeInfos[0].backward) {
                sel.removeAllRanges();
                sel.addRange(ranges[0], true);
            } else {
                sel.setRanges(ranges);
            }

            savedSelection.restored = true;
        }
    }

    function removeMarkerElement(doc, markerId) {
        var markerEl = gEBI(markerId, doc);
        if (markerEl) {
            removeNode(markerEl);
        }
    }

    function removeMarkers(savedSelection) {
        var rangeInfos = savedSelection.rangeInfos;
        for (var i = 0, len = rangeInfos.length, rangeInfo; i < len; ++i) {
            rangeInfo = rangeInfos[i];
            if (rangeInfo.collapsed) {
                removeMarkerElement(savedSelection.doc, rangeInfo.markerId);
            } else {
                removeMarkerElement(savedSelection.doc, rangeInfo.startMarkerId);
                removeMarkerElement(savedSelection.doc, rangeInfo.endMarkerId);
            }
        }
    }

    api.util.extend(api, {
        saveRange: saveRange,
        restoreRange: restoreRange,
        saveRanges: saveRanges,
        restoreRanges: restoreRanges,
        saveSelection: saveSelection,
        restoreSelection: restoreSelection,
        removeMarkerElement: removeMarkerElement,
        removeMarkers: removeMarkers
    });
});

/**
 * Text range module for Rangy.
 * Text-based manipulation and searching of ranges and selections.
 *
 * Features
 *
 * - Ability to move range boundaries by character or word offsets
 * - Customizable word tokenizer
 * - Ignores text nodes inside <script> or <style> elements or those hidden by CSS display and visibility properties
 * - Range findText method to search for text or regex within the page or within a range. Flags for whole words and case
 *   sensitivity
 * - Selection and range save/restore as text offsets within a node
 * - Methods to return visible text within a range or selection
 * - innerText method for elements
 *
 * References
 *
 * https://www.w3.org/Bugs/Public/show_bug.cgi?id=13145
 * http://aryeh.name/spec/innertext/innertext.html
 * http://dvcs.w3.org/hg/editing/raw-file/tip/editing.html
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Depends on Rangy core.
 *
 * Copyright 2015, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.1-dev
 * Build date: 20 May 2015
 */

/**
 * Problem: handling of trailing spaces before line breaks is handled inconsistently between browsers.
 *
 * First, a <br>: this is relatively simple. For the following HTML:
 *
 * 1 <br>2
 *
 * - IE and WebKit render the space, include it in the selection (i.e. when the content is selected and pasted into a
 *   textarea, the space is present) and allow the caret to be placed after it.
 * - Firefox does not acknowledge the space in the selection but it is possible to place the caret after it.
 * - Opera does not render the space but has two separate caret positions on either side of the space (left and right
 *   arrow keys show this) and includes the space in the selection.
 *
 * The other case is the line break or breaks implied by block elements. For the following HTML:
 *
 * <p>1 </p><p>2<p>
 *
 * - WebKit does not acknowledge the space in any way
 * - Firefox, IE and Opera as per <br>
 *
 * One more case is trailing spaces before line breaks in elements with white-space: pre-line. For the following HTML:
 *
 * <p style="white-space: pre-line">1
 * 2</p>
 *
 * - Firefox and WebKit include the space in caret positions
 * - IE does not support pre-line up to and including version 9
 * - Opera ignores the space
 * - Trailing space only renders if there is a non-collapsed character in the line
 *
 * Problem is whether Rangy should ever acknowledge the space and if so, when. Another problem is whether this can be
 * feature-tested
 *
 * NOTE: UMD wrapper removed manually for bundling (Oliver Pulges)
*/
rangy.createModule("TextRange", ["WrappedSelection"], function(api, module) {
    var UNDEF = "undefined";
    var CHARACTER = "character", WORD = "word";
    var dom = api.dom, util = api.util;
    var extend = util.extend;
    var createOptions = util.createOptions;
    var getBody = dom.getBody;


    var spacesRegex = /^[ \t\f\r\n]+$/;
    var spacesMinusLineBreaksRegex = /^[ \t\f\r]+$/;
    var allWhiteSpaceRegex = /^[\t-\r \u0085\u00A0\u1680\u180E\u2000-\u200B\u2028\u2029\u202F\u205F\u3000]+$/;
    var nonLineBreakWhiteSpaceRegex = /^[\t \u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000]+$/;
    var lineBreakRegex = /^[\n-\r\u0085\u2028\u2029]$/;

    var defaultLanguage = "en";

    var isDirectionBackward = api.Selection.isDirectionBackward;

    // Properties representing whether trailing spaces inside blocks are completely collapsed (as they are in WebKit,
    // but not other browsers). Also test whether trailing spaces before <br> elements are collapsed.
    var trailingSpaceInBlockCollapses = false;
    var trailingSpaceBeforeBrCollapses = false;
    var trailingSpaceBeforeBlockCollapses = false;
    var trailingSpaceBeforeLineBreakInPreLineCollapses = true;

    (function() {
        var el = dom.createTestElement(document, "<p>1 </p><p></p>", true);
        var p = el.firstChild;
        var sel = api.getSelection();
        sel.collapse(p.lastChild, 2);
        sel.setStart(p.firstChild, 0);
        trailingSpaceInBlockCollapses = ("" + sel).length == 1;

        el.innerHTML = "1 <br />";
        sel.collapse(el, 2);
        sel.setStart(el.firstChild, 0);
        trailingSpaceBeforeBrCollapses = ("" + sel).length == 1;

        el.innerHTML = "1 <p>1</p>";
        sel.collapse(el, 2);
        sel.setStart(el.firstChild, 0);
        trailingSpaceBeforeBlockCollapses = ("" + sel).length == 1;

        dom.removeNode(el);
        sel.removeAllRanges();
    })();

    /*----------------------------------------------------------------------------------------------------------------*/

    // This function must create word and non-word tokens for the whole of the text supplied to it
    function defaultTokenizer(chars, wordOptions) {
        var word = chars.join(""), result, tokenRanges = [];

        function createTokenRange(start, end, isWord) {
            tokenRanges.push( { start: start, end: end, isWord: isWord } );
        }

        // Match words and mark characters
        var lastWordEnd = 0, wordStart, wordEnd;
        while ( (result = wordOptions.wordRegex.exec(word)) ) {
            wordStart = result.index;
            wordEnd = wordStart + result[0].length;

            // Create token for non-word characters preceding this word
            if (wordStart > lastWordEnd) {
                createTokenRange(lastWordEnd, wordStart, false);
            }

            // Get trailing space characters for word
            if (wordOptions.includeTrailingSpace) {
                while ( nonLineBreakWhiteSpaceRegex.test(chars[wordEnd]) ) {
                    ++wordEnd;
                }
            }
            createTokenRange(wordStart, wordEnd, true);
            lastWordEnd = wordEnd;
        }

        // Create token for trailing non-word characters, if any exist
        if (lastWordEnd < chars.length) {
            createTokenRange(lastWordEnd, chars.length, false);
        }

        return tokenRanges;
    }

    function convertCharRangeToToken(chars, tokenRange) {
        var tokenChars = chars.slice(tokenRange.start, tokenRange.end);
        var token = {
            isWord: tokenRange.isWord,
            chars: tokenChars,
            toString: function() {
                return tokenChars.join("");
            }
        };
        for (var i = 0, len = tokenChars.length; i < len; ++i) {
            tokenChars[i].token = token;
        }
        return token;
    }

    function tokenize(chars, wordOptions, tokenizer) {
        var tokenRanges = tokenizer(chars, wordOptions);
        var tokens = [];
        for (var i = 0, tokenRange; tokenRange = tokenRanges[i++]; ) {
            tokens.push( convertCharRangeToToken(chars, tokenRange) );
        }
        return tokens;
    }

    var defaultCharacterOptions = {
        includeBlockContentTrailingSpace: true,
        includeSpaceBeforeBr: true,
        includeSpaceBeforeBlock: true,
        includePreLineTrailingSpace: true,
        ignoreCharacters: ""
    };

    function normalizeIgnoredCharacters(ignoredCharacters) {
        // Check if character is ignored
        var ignoredChars = ignoredCharacters || "";

        // Normalize ignored characters into a string consisting of characters in ascending order of character code
        var ignoredCharsArray = (typeof ignoredChars == "string") ? ignoredChars.split("") : ignoredChars;
        ignoredCharsArray.sort(function(char1, char2) {
            return char1.charCodeAt(0) - char2.charCodeAt(0);
        });

        /// Convert back to a string and remove duplicates
        return ignoredCharsArray.join("").replace(/(.)\1+/g, "$1");
    }

    var defaultCaretCharacterOptions = {
        includeBlockContentTrailingSpace: !trailingSpaceBeforeLineBreakInPreLineCollapses,
        includeSpaceBeforeBr: !trailingSpaceBeforeBrCollapses,
        includeSpaceBeforeBlock: !trailingSpaceBeforeBlockCollapses,
        includePreLineTrailingSpace: true
    };

    var defaultWordOptions = {
        "en": {
            wordRegex: /[a-z0-9]+('[a-z0-9]+)*/gi,
            includeTrailingSpace: false,
            tokenizer: defaultTokenizer
        }
    };

    var defaultFindOptions = {
        caseSensitive: false,
        withinRange: null,
        wholeWordsOnly: false,
        wrap: false,
        direction: "forward",
        wordOptions: null,
        characterOptions: null
    };

    var defaultMoveOptions = {
        wordOptions: null,
        characterOptions: null
    };

    var defaultExpandOptions = {
        wordOptions: null,
        characterOptions: null,
        trim: false,
        trimStart: true,
        trimEnd: true
    };

    var defaultWordIteratorOptions = {
        wordOptions: null,
        characterOptions: null,
        direction: "forward"
    };

    function createWordOptions(options) {
        var lang, defaults;
        if (!options) {
            return defaultWordOptions[defaultLanguage];
        } else {
            lang = options.language || defaultLanguage;
            defaults = {};
            extend(defaults, defaultWordOptions[lang] || defaultWordOptions[defaultLanguage]);
            extend(defaults, options);
            return defaults;
        }
    }

    function createNestedOptions(optionsParam, defaults) {
        var options = createOptions(optionsParam, defaults);
        if (defaults.hasOwnProperty("wordOptions")) {
            options.wordOptions = createWordOptions(options.wordOptions);
        }
        if (defaults.hasOwnProperty("characterOptions")) {
            options.characterOptions = createOptions(options.characterOptions, defaultCharacterOptions);
        }
        return options;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /* DOM utility functions */
    var getComputedStyleProperty = dom.getComputedStyleProperty;

    // Create cachable versions of DOM functions

    // Test for old IE's incorrect display properties
    var tableCssDisplayBlock;
    (function() {
        var table = document.createElement("table");
        var body = getBody(document);
        body.appendChild(table);
        tableCssDisplayBlock = (getComputedStyleProperty(table, "display") == "block");
        body.removeChild(table);
    })();

    var defaultDisplayValueForTag = {
        table: "table",
        caption: "table-caption",
        colgroup: "table-column-group",
        col: "table-column",
        thead: "table-header-group",
        tbody: "table-row-group",
        tfoot: "table-footer-group",
        tr: "table-row",
        td: "table-cell",
        th: "table-cell"
    };

    // Corrects IE's "block" value for table-related elements
    function getComputedDisplay(el, win) {
        var display = getComputedStyleProperty(el, "display", win);
        var tagName = el.tagName.toLowerCase();
        return (display == "block" &&
                tableCssDisplayBlock &&
                defaultDisplayValueForTag.hasOwnProperty(tagName)) ?
            defaultDisplayValueForTag[tagName] : display;
    }

    function isHidden(node) {
        var ancestors = getAncestorsAndSelf(node);
        for (var i = 0, len = ancestors.length; i < len; ++i) {
            if (ancestors[i].nodeType == 1 && getComputedDisplay(ancestors[i]) == "none") {
                return true;
            }
        }

        return false;
    }

    function isVisibilityHiddenTextNode(textNode) {
        var el;
        return textNode.nodeType == 3 &&
            (el = textNode.parentNode) &&
            getComputedStyleProperty(el, "visibility") == "hidden";
    }

    /*----------------------------------------------------------------------------------------------------------------*/


    // "A block node is either an Element whose "display" property does not have
    // resolved value "inline" or "inline-block" or "inline-table" or "none", or a
    // Document, or a DocumentFragment."
    function isBlockNode(node) {
        return node &&
            ((node.nodeType == 1 && !/^(inline(-block|-table)?|none)$/.test(getComputedDisplay(node))) ||
            node.nodeType == 9 || node.nodeType == 11);
    }

    function getLastDescendantOrSelf(node) {
        var lastChild = node.lastChild;
        return lastChild ? getLastDescendantOrSelf(lastChild) : node;
    }

    function containsPositions(node) {
        return dom.isCharacterDataNode(node) ||
            !/^(area|base|basefont|br|col|frame|hr|img|input|isindex|link|meta|param)$/i.test(node.nodeName);
    }

    function getAncestors(node) {
        var ancestors = [];
        while (node.parentNode) {
            ancestors.unshift(node.parentNode);
            node = node.parentNode;
        }
        return ancestors;
    }

    function getAncestorsAndSelf(node) {
        return getAncestors(node).concat([node]);
    }

    function nextNodeDescendants(node) {
        while (node && !node.nextSibling) {
            node = node.parentNode;
        }
        if (!node) {
            return null;
        }
        return node.nextSibling;
    }

    function nextNode(node, excludeChildren) {
        if (!excludeChildren && node.hasChildNodes()) {
            return node.firstChild;
        }
        return nextNodeDescendants(node);
    }

    function previousNode(node) {
        var previous = node.previousSibling;
        if (previous) {
            node = previous;
            while (node.hasChildNodes()) {
                node = node.lastChild;
            }
            return node;
        }
        var parent = node.parentNode;
        if (parent && parent.nodeType == 1) {
            return parent;
        }
        return null;
    }

    // Adpated from Aryeh's code.
    // "A whitespace node is either a Text node whose data is the empty string; or
    // a Text node whose data consists only of one or more tabs (0x0009), line
    // feeds (0x000A), carriage returns (0x000D), and/or spaces (0x0020), and whose
    // parent is an Element whose resolved value for "white-space" is "normal" or
    // "nowrap"; or a Text node whose data consists only of one or more tabs
    // (0x0009), carriage returns (0x000D), and/or spaces (0x0020), and whose
    // parent is an Element whose resolved value for "white-space" is "pre-line"."
    function isWhitespaceNode(node) {
        if (!node || node.nodeType != 3) {
            return false;
        }
        var text = node.data;
        if (text === "") {
            return true;
        }
        var parent = node.parentNode;
        if (!parent || parent.nodeType != 1) {
            return false;
        }
        var computedWhiteSpace = getComputedStyleProperty(node.parentNode, "whiteSpace");

        return (/^[\t\n\r ]+$/.test(text) && /^(normal|nowrap)$/.test(computedWhiteSpace)) ||
            (/^[\t\r ]+$/.test(text) && computedWhiteSpace == "pre-line");
    }

    // Adpated from Aryeh's code.
    // "node is a collapsed whitespace node if the following algorithm returns
    // true:"
    function isCollapsedWhitespaceNode(node) {
        // "If node's data is the empty string, return true."
        if (node.data === "") {
            return true;
        }

        // "If node is not a whitespace node, return false."
        if (!isWhitespaceNode(node)) {
            return false;
        }

        // "Let ancestor be node's parent."
        var ancestor = node.parentNode;

        // "If ancestor is null, return true."
        if (!ancestor) {
            return true;
        }

        // "If the "display" property of some ancestor of node has resolved value "none", return true."
        if (isHidden(node)) {
            return true;
        }

        return false;
    }

    function isCollapsedNode(node) {
        var type = node.nodeType;
        return type == 7 /* PROCESSING_INSTRUCTION */ ||
            type == 8 /* COMMENT */ ||
            isHidden(node) ||
            /^(script|style)$/i.test(node.nodeName) ||
            isVisibilityHiddenTextNode(node) ||
            isCollapsedWhitespaceNode(node);
    }

    function isIgnoredNode(node, win) {
        var type = node.nodeType;
        return type == 7 /* PROCESSING_INSTRUCTION */ ||
            type == 8 /* COMMENT */ ||
            (type == 1 && getComputedDisplay(node, win) == "none");
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    // Possibly overengineered caching system to prevent repeated DOM calls slowing everything down

    function Cache() {
        this.store = {};
    }

    Cache.prototype = {
        get: function(key) {
            return this.store.hasOwnProperty(key) ? this.store[key] : null;
        },

        set: function(key, value) {
            return this.store[key] = value;
        }
    };

    var cachedCount = 0, uncachedCount = 0;

    function createCachingGetter(methodName, func, objProperty) {
        return function(args) {
            var cache = this.cache;
            if (cache.hasOwnProperty(methodName)) {
                cachedCount++;
                return cache[methodName];
            } else {
                uncachedCount++;
                var value = func.call(this, objProperty ? this[objProperty] : this, args);
                cache[methodName] = value;
                return value;
            }
        };
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    function NodeWrapper(node, session) {
        this.node = node;
        this.session = session;
        this.cache = new Cache();
        this.positions = new Cache();
    }

    var nodeProto = {
        getPosition: function(offset) {
            var positions = this.positions;
            return positions.get(offset) || positions.set(offset, new Position(this, offset));
        },

        toString: function() {
            return "[NodeWrapper(" + dom.inspectNode(this.node) + ")]";
        }
    };

    NodeWrapper.prototype = nodeProto;

    var EMPTY = "EMPTY",
        NON_SPACE = "NON_SPACE",
        UNCOLLAPSIBLE_SPACE = "UNCOLLAPSIBLE_SPACE",
        COLLAPSIBLE_SPACE = "COLLAPSIBLE_SPACE",
        TRAILING_SPACE_BEFORE_BLOCK = "TRAILING_SPACE_BEFORE_BLOCK",
        TRAILING_SPACE_IN_BLOCK = "TRAILING_SPACE_IN_BLOCK",
        TRAILING_SPACE_BEFORE_BR = "TRAILING_SPACE_BEFORE_BR",
        PRE_LINE_TRAILING_SPACE_BEFORE_LINE_BREAK = "PRE_LINE_TRAILING_SPACE_BEFORE_LINE_BREAK",
        TRAILING_LINE_BREAK_AFTER_BR = "TRAILING_LINE_BREAK_AFTER_BR",
        INCLUDED_TRAILING_LINE_BREAK_AFTER_BR = "INCLUDED_TRAILING_LINE_BREAK_AFTER_BR";

    extend(nodeProto, {
        isCharacterDataNode: createCachingGetter("isCharacterDataNode", dom.isCharacterDataNode, "node"),
        getNodeIndex: createCachingGetter("nodeIndex", dom.getNodeIndex, "node"),
        getLength: createCachingGetter("nodeLength", dom.getNodeLength, "node"),
        containsPositions: createCachingGetter("containsPositions", containsPositions, "node"),
        isWhitespace: createCachingGetter("isWhitespace", isWhitespaceNode, "node"),
        isCollapsedWhitespace: createCachingGetter("isCollapsedWhitespace", isCollapsedWhitespaceNode, "node"),
        getComputedDisplay: createCachingGetter("computedDisplay", getComputedDisplay, "node"),
        isCollapsed: createCachingGetter("collapsed", isCollapsedNode, "node"),
        isIgnored: createCachingGetter("ignored", isIgnoredNode, "node"),
        next: createCachingGetter("nextPos", nextNode, "node"),
        previous: createCachingGetter("previous", previousNode, "node"),

        getTextNodeInfo: createCachingGetter("textNodeInfo", function(textNode) {
            var spaceRegex = null, collapseSpaces = false;
            var cssWhitespace = getComputedStyleProperty(textNode.parentNode, "whiteSpace");
            var preLine = (cssWhitespace == "pre-line");
            if (preLine) {
                spaceRegex = spacesMinusLineBreaksRegex;
                collapseSpaces = true;
            } else if (cssWhitespace == "normal" || cssWhitespace == "nowrap") {
                spaceRegex = spacesRegex;
                collapseSpaces = true;
            }

            return {
                node: textNode,
                text: textNode.data,
                spaceRegex: spaceRegex,
                collapseSpaces: collapseSpaces,
                preLine: preLine
            };
        }, "node"),

        hasInnerText: createCachingGetter("hasInnerText", function(el, backward) {
            var session = this.session;
            var posAfterEl = session.getPosition(el.parentNode, this.getNodeIndex() + 1);
            var firstPosInEl = session.getPosition(el, 0);

            var pos = backward ? posAfterEl : firstPosInEl;
            var endPos = backward ? firstPosInEl : posAfterEl;

            /*
             <body><p>X  </p><p>Y</p></body>

             Positions:

             body:0:""
             p:0:""
             text:0:""
             text:1:"X"
             text:2:TRAILING_SPACE_IN_BLOCK
             text:3:COLLAPSED_SPACE
             p:1:""
             body:1:"\n"
             p:0:""
             text:0:""
             text:1:"Y"

             A character is a TRAILING_SPACE_IN_BLOCK iff:

             - There is no uncollapsed character after it within the visible containing block element

             A character is a TRAILING_SPACE_BEFORE_BR iff:

             - There is no uncollapsed character after it preceding a <br> element

             An element has inner text iff

             - It is not hidden
             - It contains an uncollapsed character

             All trailing spaces (pre-line, before <br>, end of block) require definite non-empty characters to render.
             */

            while (pos !== endPos) {
                pos.prepopulateChar();
                if (pos.isDefinitelyNonEmpty()) {
                    return true;
                }
                pos = backward ? pos.previousVisible() : pos.nextVisible();
            }

            return false;
        }, "node"),

        isRenderedBlock: createCachingGetter("isRenderedBlock", function(el) {
            // Ensure that a block element containing a <br> is considered to have inner text
            var brs = el.getElementsByTagName("br");
            for (var i = 0, len = brs.length; i < len; ++i) {
                if (!isCollapsedNode(brs[i])) {
                    return true;
                }
            }
            return this.hasInnerText();
        }, "node"),

        getTrailingSpace: createCachingGetter("trailingSpace", function(el) {
            if (el.tagName.toLowerCase() == "br") {
                return "";
            } else {
                switch (this.getComputedDisplay()) {
                    case "inline":
                        var child = el.lastChild;
                        while (child) {
                            if (!isIgnoredNode(child)) {
                                return (child.nodeType == 1) ? this.session.getNodeWrapper(child).getTrailingSpace() : "";
                            }
                            child = child.previousSibling;
                        }
                        break;
                    case "inline-block":
                    case "inline-table":
                    case "none":
                    case "table-column":
                    case "table-column-group":
                        break;
                    case "table-cell":
                        return "\t";
                    default:
                        return this.isRenderedBlock(true) ? "\n" : "";
                }
            }
            return "";
        }, "node"),

        getLeadingSpace: createCachingGetter("leadingSpace", function(el) {
            switch (this.getComputedDisplay()) {
                case "inline":
                case "inline-block":
                case "inline-table":
                case "none":
                case "table-column":
                case "table-column-group":
                case "table-cell":
                    break;
                default:
                    return this.isRenderedBlock(false) ? "\n" : "";
            }
            return "";
        }, "node")
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    function Position(nodeWrapper, offset) {
        this.offset = offset;
        this.nodeWrapper = nodeWrapper;
        this.node = nodeWrapper.node;
        this.session = nodeWrapper.session;
        this.cache = new Cache();
    }

    function inspectPosition() {
        return "[Position(" + dom.inspectNode(this.node) + ":" + this.offset + ")]";
    }

    var positionProto = {
        character: "",
        characterType: EMPTY,
        isBr: false,

        /*
        This method:
        - Fully populates positions that have characters that can be determined independently of any other characters.
        - Populates most types of space positions with a provisional character. The character is finalized later.
         */
        prepopulateChar: function() {
            var pos = this;
            if (!pos.prepopulatedChar) {
                var node = pos.node, offset = pos.offset;
                var visibleChar = "", charType = EMPTY;
                var finalizedChar = false;
                if (offset > 0) {
                    if (node.nodeType == 3) {
                        var text = node.data;
                        var textChar = text.charAt(offset - 1);

                        var nodeInfo = pos.nodeWrapper.getTextNodeInfo();
                        var spaceRegex = nodeInfo.spaceRegex;
                        if (nodeInfo.collapseSpaces) {
                            if (spaceRegex.test(textChar)) {
                                // "If the character at position is from set, append a single space (U+0020) to newdata and advance
                                // position until the character at position is not from set."

                                // We also need to check for the case where we're in a pre-line and we have a space preceding a
                                // line break, because such spaces are collapsed in some browsers
                                if (offset > 1 && spaceRegex.test(text.charAt(offset - 2))) {
                                } else if (nodeInfo.preLine && text.charAt(offset) === "\n") {
                                    visibleChar = " ";
                                    charType = PRE_LINE_TRAILING_SPACE_BEFORE_LINE_BREAK;
                                } else {
                                    visibleChar = " ";
                                    //pos.checkForFollowingLineBreak = true;
                                    charType = COLLAPSIBLE_SPACE;
                                }
                            } else {
                                visibleChar = textChar;
                                charType = NON_SPACE;
                                finalizedChar = true;
                            }
                        } else {
                            visibleChar = textChar;
                            charType = UNCOLLAPSIBLE_SPACE;
                            finalizedChar = true;
                        }
                    } else {
                        var nodePassed = node.childNodes[offset - 1];
                        if (nodePassed && nodePassed.nodeType == 1 && !isCollapsedNode(nodePassed)) {
                            if (nodePassed.tagName.toLowerCase() == "br") {
                                visibleChar = "\n";
                                pos.isBr = true;
                                charType = COLLAPSIBLE_SPACE;
                                finalizedChar = false;
                            } else {
                                pos.checkForTrailingSpace = true;
                            }
                        }

                        // Check the leading space of the next node for the case when a block element follows an inline
                        // element or text node. In that case, there is an implied line break between the two nodes.
                        if (!visibleChar) {
                            var nextNode = node.childNodes[offset];
                            if (nextNode && nextNode.nodeType == 1 && !isCollapsedNode(nextNode)) {
                                pos.checkForLeadingSpace = true;
                            }
                        }
                    }
                }

                pos.prepopulatedChar = true;
                pos.character = visibleChar;
                pos.characterType = charType;
                pos.isCharInvariant = finalizedChar;
            }
        },

        isDefinitelyNonEmpty: function() {
            var charType = this.characterType;
            return charType == NON_SPACE || charType == UNCOLLAPSIBLE_SPACE;
        },

        // Resolve leading and trailing spaces, which may involve prepopulating other positions
        resolveLeadingAndTrailingSpaces: function() {
            if (!this.prepopulatedChar) {
                this.prepopulateChar();
            }
            if (this.checkForTrailingSpace) {
                var trailingSpace = this.session.getNodeWrapper(this.node.childNodes[this.offset - 1]).getTrailingSpace();
                if (trailingSpace) {
                    this.isTrailingSpace = true;
                    this.character = trailingSpace;
                    this.characterType = COLLAPSIBLE_SPACE;
                }
                this.checkForTrailingSpace = false;
            }
            if (this.checkForLeadingSpace) {
                var leadingSpace = this.session.getNodeWrapper(this.node.childNodes[this.offset]).getLeadingSpace();
                if (leadingSpace) {
                    this.isLeadingSpace = true;
                    this.character = leadingSpace;
                    this.characterType = COLLAPSIBLE_SPACE;
                }
                this.checkForLeadingSpace = false;
            }
        },

        getPrecedingUncollapsedPosition: function(characterOptions) {
            var pos = this, character;
            while ( (pos = pos.previousVisible()) ) {
                character = pos.getCharacter(characterOptions);
                if (character !== "") {
                    return pos;
                }
            }

            return null;
        },

        getCharacter: function(characterOptions) {
            this.resolveLeadingAndTrailingSpaces();

            var thisChar = this.character, returnChar;

            // Check if character is ignored
            var ignoredChars = normalizeIgnoredCharacters(characterOptions.ignoreCharacters);
            var isIgnoredCharacter = (thisChar !== "" && ignoredChars.indexOf(thisChar) > -1);

            // Check if this position's  character is invariant (i.e. not dependent on character options) and return it
            // if so
            if (this.isCharInvariant) {
                returnChar = isIgnoredCharacter ? "" : thisChar;
                return returnChar;
            }

            var cacheKey = ["character", characterOptions.includeSpaceBeforeBr, characterOptions.includeBlockContentTrailingSpace, characterOptions.includePreLineTrailingSpace, ignoredChars].join("_");
            var cachedChar = this.cache.get(cacheKey);
            if (cachedChar !== null) {
                return cachedChar;
            }

            // We need to actually get the character now
            var character = "";
            var collapsible = (this.characterType == COLLAPSIBLE_SPACE);

            var nextPos, previousPos;
            var gotPreviousPos = false;
            var pos = this;

            function getPreviousPos() {
                if (!gotPreviousPos) {
                    previousPos = pos.getPrecedingUncollapsedPosition(characterOptions);
                    gotPreviousPos = true;
                }
                return previousPos;
            }

            // Disallow a collapsible space that is followed by a line break or is the last character
            if (collapsible) {
                // Allow a trailing space that we've previously determined should be included
                if (this.type == INCLUDED_TRAILING_LINE_BREAK_AFTER_BR) {
                    character = "\n";
                }
                // Disallow a collapsible space that follows a trailing space or line break, or is the first character,
                // or follows a collapsible included space
                else if (thisChar == " " &&
                        (!getPreviousPos() || previousPos.isTrailingSpace || previousPos.character == "\n" || (previousPos.character == " " && previousPos.characterType == COLLAPSIBLE_SPACE))) {
                }
                // Allow a leading line break unless it follows a line break
                else if (thisChar == "\n" && this.isLeadingSpace) {
                    if (getPreviousPos() && previousPos.character != "\n") {
                        character = "\n";
                    } else {
                    }
                } else {
                    nextPos = this.nextUncollapsed();
                    if (nextPos) {
                        if (nextPos.isBr) {
                            this.type = TRAILING_SPACE_BEFORE_BR;
                        } else if (nextPos.isTrailingSpace && nextPos.character == "\n") {
                            this.type = TRAILING_SPACE_IN_BLOCK;
                        } else if (nextPos.isLeadingSpace && nextPos.character == "\n") {
                            this.type = TRAILING_SPACE_BEFORE_BLOCK;
                        }

                        if (nextPos.character == "\n") {
                            if (this.type == TRAILING_SPACE_BEFORE_BR && !characterOptions.includeSpaceBeforeBr) {
                            } else if (this.type == TRAILING_SPACE_BEFORE_BLOCK && !characterOptions.includeSpaceBeforeBlock) {
                            } else if (this.type == TRAILING_SPACE_IN_BLOCK && nextPos.isTrailingSpace && !characterOptions.includeBlockContentTrailingSpace) {
                            } else if (this.type == PRE_LINE_TRAILING_SPACE_BEFORE_LINE_BREAK && nextPos.type == NON_SPACE && !characterOptions.includePreLineTrailingSpace) {
                            } else if (thisChar == "\n") {
                                if (nextPos.isTrailingSpace) {
                                    if (this.isTrailingSpace) {
                                    } else if (this.isBr) {
                                        nextPos.type = TRAILING_LINE_BREAK_AFTER_BR;

                                        if (getPreviousPos() && previousPos.isLeadingSpace && !previousPos.isTrailingSpace && previousPos.character == "\n") {
                                            nextPos.character = "";
                                        } else {
                                            nextPos.type = INCLUDED_TRAILING_LINE_BREAK_AFTER_BR;
                                        }
                                    }
                                } else {
                                    character = "\n";
                                }
                            } else if (thisChar == " ") {
                                character = " ";
                            } else {
                            }
                        } else {
                            character = thisChar;
                        }
                    } else {
                    }
                }
            }

            if (ignoredChars.indexOf(character) > -1) {
                character = "";
            }


            this.cache.set(cacheKey, character);

            return character;
        },

        equals: function(pos) {
            return !!pos && this.node === pos.node && this.offset === pos.offset;
        },

        inspect: inspectPosition,

        toString: function() {
            return this.character;
        }
    };

    Position.prototype = positionProto;

    extend(positionProto, {
        next: createCachingGetter("nextPos", function(pos) {
            var nodeWrapper = pos.nodeWrapper, node = pos.node, offset = pos.offset, session = nodeWrapper.session;
            if (!node) {
                return null;
            }
            var nextNode, nextOffset, child;
            if (offset == nodeWrapper.getLength()) {
                // Move onto the next node
                nextNode = node.parentNode;
                nextOffset = nextNode ? nodeWrapper.getNodeIndex() + 1 : 0;
            } else {
                if (nodeWrapper.isCharacterDataNode()) {
                    nextNode = node;
                    nextOffset = offset + 1;
                } else {
                    child = node.childNodes[offset];
                    // Go into the children next, if children there are
                    if (session.getNodeWrapper(child).containsPositions()) {
                        nextNode = child;
                        nextOffset = 0;
                    } else {
                        nextNode = node;
                        nextOffset = offset + 1;
                    }
                }
            }

            return nextNode ? session.getPosition(nextNode, nextOffset) : null;
        }),

        previous: createCachingGetter("previous", function(pos) {
            var nodeWrapper = pos.nodeWrapper, node = pos.node, offset = pos.offset, session = nodeWrapper.session;
            var previousNode, previousOffset, child;
            if (offset == 0) {
                previousNode = node.parentNode;
                previousOffset = previousNode ? nodeWrapper.getNodeIndex() : 0;
            } else {
                if (nodeWrapper.isCharacterDataNode()) {
                    previousNode = node;
                    previousOffset = offset - 1;
                } else {
                    child = node.childNodes[offset - 1];
                    // Go into the children next, if children there are
                    if (session.getNodeWrapper(child).containsPositions()) {
                        previousNode = child;
                        previousOffset = dom.getNodeLength(child);
                    } else {
                        previousNode = node;
                        previousOffset = offset - 1;
                    }
                }
            }
            return previousNode ? session.getPosition(previousNode, previousOffset) : null;
        }),

        /*
         Next and previous position moving functions that filter out

         - Hidden (CSS visibility/display) elements
         - Script and style elements
         */
        nextVisible: createCachingGetter("nextVisible", function(pos) {
            var next = pos.next();
            if (!next) {
                return null;
            }
            var nodeWrapper = next.nodeWrapper, node = next.node;
            var newPos = next;
            if (nodeWrapper.isCollapsed()) {
                // We're skipping this node and all its descendants
                newPos = nodeWrapper.session.getPosition(node.parentNode, nodeWrapper.getNodeIndex() + 1);
            }
            return newPos;
        }),

        nextUncollapsed: createCachingGetter("nextUncollapsed", function(pos) {
            var nextPos = pos;
            while ( (nextPos = nextPos.nextVisible()) ) {
                nextPos.resolveLeadingAndTrailingSpaces();
                if (nextPos.character !== "") {
                    return nextPos;
                }
            }
            return null;
        }),

        previousVisible: createCachingGetter("previousVisible", function(pos) {
            var previous = pos.previous();
            if (!previous) {
                return null;
            }
            var nodeWrapper = previous.nodeWrapper, node = previous.node;
            var newPos = previous;
            if (nodeWrapper.isCollapsed()) {
                // We're skipping this node and all its descendants
                newPos = nodeWrapper.session.getPosition(node.parentNode, nodeWrapper.getNodeIndex());
            }
            return newPos;
        })
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    var currentSession = null;

    var Session = (function() {
        function createWrapperCache(nodeProperty) {
            var cache = new Cache();

            return {
                get: function(node) {
                    var wrappersByProperty = cache.get(node[nodeProperty]);
                    if (wrappersByProperty) {
                        for (var i = 0, wrapper; wrapper = wrappersByProperty[i++]; ) {
                            if (wrapper.node === node) {
                                return wrapper;
                            }
                        }
                    }
                    return null;
                },

                set: function(nodeWrapper) {
                    var property = nodeWrapper.node[nodeProperty];
                    var wrappersByProperty = cache.get(property) || cache.set(property, []);
                    wrappersByProperty.push(nodeWrapper);
                }
            };
        }

        var uniqueIDSupported = util.isHostProperty(document.documentElement, "uniqueID");

        function Session() {
            this.initCaches();
        }

        Session.prototype = {
            initCaches: function() {
                this.elementCache = uniqueIDSupported ? (function() {
                    var elementsCache = new Cache();

                    return {
                        get: function(el) {
                            return elementsCache.get(el.uniqueID);
                        },

                        set: function(elWrapper) {
                            elementsCache.set(elWrapper.node.uniqueID, elWrapper);
                        }
                    };
                })() : createWrapperCache("tagName");

                // Store text nodes keyed by data, although we may need to truncate this
                this.textNodeCache = createWrapperCache("data");
                this.otherNodeCache = createWrapperCache("nodeName");
            },

            getNodeWrapper: function(node) {
                var wrapperCache;
                switch (node.nodeType) {
                    case 1:
                        wrapperCache = this.elementCache;
                        break;
                    case 3:
                        wrapperCache = this.textNodeCache;
                        break;
                    default:
                        wrapperCache = this.otherNodeCache;
                        break;
                }

                var wrapper = wrapperCache.get(node);
                if (!wrapper) {
                    wrapper = new NodeWrapper(node, this);
                    wrapperCache.set(wrapper);
                }
                return wrapper;
            },

            getPosition: function(node, offset) {
                return this.getNodeWrapper(node).getPosition(offset);
            },

            getRangeBoundaryPosition: function(range, isStart) {
                var prefix = isStart ? "start" : "end";
                return this.getPosition(range[prefix + "Container"], range[prefix + "Offset"]);
            },

            detach: function() {
                this.elementCache = this.textNodeCache = this.otherNodeCache = null;
            }
        };

        return Session;
    })();

    /*----------------------------------------------------------------------------------------------------------------*/

    function startSession() {
        endSession();
        return (currentSession = new Session());
    }

    function getSession() {
        return currentSession || startSession();
    }

    function endSession() {
        if (currentSession) {
            currentSession.detach();
        }
        currentSession = null;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    // Extensions to the rangy.dom utility object

    extend(dom, {
        nextNode: nextNode,
        previousNode: previousNode
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    function createCharacterIterator(startPos, backward, endPos, characterOptions) {

        // Adjust the end position to ensure that it is actually reached
        if (endPos) {
            if (backward) {
                if (isCollapsedNode(endPos.node)) {
                    endPos = startPos.previousVisible();
                }
            } else {
                if (isCollapsedNode(endPos.node)) {
                    endPos = endPos.nextVisible();
                }
            }
        }

        var pos = startPos, finished = false;

        function next() {
            var charPos = null;
            if (backward) {
                charPos = pos;
                if (!finished) {
                    pos = pos.previousVisible();
                    finished = !pos || (endPos && pos.equals(endPos));
                }
            } else {
                if (!finished) {
                    charPos = pos = pos.nextVisible();
                    finished = !pos || (endPos && pos.equals(endPos));
                }
            }
            if (finished) {
                pos = null;
            }
            return charPos;
        }

        var previousTextPos, returnPreviousTextPos = false;

        return {
            next: function() {
                if (returnPreviousTextPos) {
                    returnPreviousTextPos = false;
                    return previousTextPos;
                } else {
                    var pos, character;
                    while ( (pos = next()) ) {
                        character = pos.getCharacter(characterOptions);
                        if (character) {
                            previousTextPos = pos;
                            return pos;
                        }
                    }
                    return null;
                }
            },

            rewind: function() {
                if (previousTextPos) {
                    returnPreviousTextPos = true;
                } else {
                    throw module.createError("createCharacterIterator: cannot rewind. Only one position can be rewound.");
                }
            },

            dispose: function() {
                startPos = endPos = null;
            }
        };
    }

    var arrayIndexOf = Array.prototype.indexOf ?
        function(arr, val) {
            return arr.indexOf(val);
        } :
        function(arr, val) {
            for (var i = 0, len = arr.length; i < len; ++i) {
                if (arr[i] === val) {
                    return i;
                }
            }
            return -1;
        };

    // Provides a pair of iterators over text positions, tokenized. Transparently requests more text when next()
    // is called and there is no more tokenized text
    function createTokenizedTextProvider(pos, characterOptions, wordOptions) {
        var forwardIterator = createCharacterIterator(pos, false, null, characterOptions);
        var backwardIterator = createCharacterIterator(pos, true, null, characterOptions);
        var tokenizer = wordOptions.tokenizer;

        // Consumes a word and the whitespace beyond it
        function consumeWord(forward) {
            var pos, textChar;
            var newChars = [], it = forward ? forwardIterator : backwardIterator;

            var passedWordBoundary = false, insideWord = false;

            while ( (pos = it.next()) ) {
                textChar = pos.character;


                if (allWhiteSpaceRegex.test(textChar)) {
                    if (insideWord) {
                        insideWord = false;
                        passedWordBoundary = true;
                    }
                } else {
                    if (passedWordBoundary) {
                        it.rewind();
                        break;
                    } else {
                        insideWord = true;
                    }
                }
                newChars.push(pos);
            }


            return newChars;
        }

        // Get initial word surrounding initial position and tokenize it
        var forwardChars = consumeWord(true);
        var backwardChars = consumeWord(false).reverse();
        var tokens = tokenize(backwardChars.concat(forwardChars), wordOptions, tokenizer);

        // Create initial token buffers
        var forwardTokensBuffer = forwardChars.length ?
            tokens.slice(arrayIndexOf(tokens, forwardChars[0].token)) : [];

        var backwardTokensBuffer = backwardChars.length ?
            tokens.slice(0, arrayIndexOf(tokens, backwardChars.pop().token) + 1) : [];

        function inspectBuffer(buffer) {
            var textPositions = ["[" + buffer.length + "]"];
            for (var i = 0; i < buffer.length; ++i) {
                textPositions.push("(word: " + buffer[i] + ", is word: " + buffer[i].isWord + ")");
            }
            return textPositions;
        }


        return {
            nextEndToken: function() {
                var lastToken, forwardChars;

                // If we're down to the last token, consume character chunks until we have a word or run out of
                // characters to consume
                while ( forwardTokensBuffer.length == 1 &&
                    !(lastToken = forwardTokensBuffer[0]).isWord &&
                    (forwardChars = consumeWord(true)).length > 0) {

                    // Merge trailing non-word into next word and tokenize
                    forwardTokensBuffer = tokenize(lastToken.chars.concat(forwardChars), wordOptions, tokenizer);
                }

                return forwardTokensBuffer.shift();
            },

            previousStartToken: function() {
                var lastToken, backwardChars;

                // If we're down to the last token, consume character chunks until we have a word or run out of
                // characters to consume
                while ( backwardTokensBuffer.length == 1 &&
                    !(lastToken = backwardTokensBuffer[0]).isWord &&
                    (backwardChars = consumeWord(false)).length > 0) {

                    // Merge leading non-word into next word and tokenize
                    backwardTokensBuffer = tokenize(backwardChars.reverse().concat(lastToken.chars), wordOptions, tokenizer);
                }

                return backwardTokensBuffer.pop();
            },

            dispose: function() {
                forwardIterator.dispose();
                backwardIterator.dispose();
                forwardTokensBuffer = backwardTokensBuffer = null;
            }
        };
    }

    function movePositionBy(pos, unit, count, characterOptions, wordOptions) {
        var unitsMoved = 0, currentPos, newPos = pos, charIterator, nextPos, absCount = Math.abs(count), token;
        if (count !== 0) {
            var backward = (count < 0);

            switch (unit) {
                case CHARACTER:
                    charIterator = createCharacterIterator(pos, backward, null, characterOptions);
                    while ( (currentPos = charIterator.next()) && unitsMoved < absCount ) {
                        ++unitsMoved;
                        newPos = currentPos;
                    }
                    nextPos = currentPos;
                    charIterator.dispose();
                    break;
                case WORD:
                    var tokenizedTextProvider = createTokenizedTextProvider(pos, characterOptions, wordOptions);
                    var next = backward ? tokenizedTextProvider.previousStartToken : tokenizedTextProvider.nextEndToken;

                    while ( (token = next()) && unitsMoved < absCount ) {
                        if (token.isWord) {
                            ++unitsMoved;
                            newPos = backward ? token.chars[0] : token.chars[token.chars.length - 1];
                        }
                    }
                    break;
                default:
                    throw new Error("movePositionBy: unit '" + unit + "' not implemented");
            }

            // Perform any necessary position tweaks
            if (backward) {
                newPos = newPos.previousVisible();
                unitsMoved = -unitsMoved;
            } else if (newPos && newPos.isLeadingSpace && !newPos.isTrailingSpace) {
                // Tweak the position for the case of a leading space. The problem is that an uncollapsed leading space
                // before a block element (for example, the line break between "1" and "2" in the following HTML:
                // "1<p>2</p>") is considered to be attached to the position immediately before the block element, which
                // corresponds with a different selection position in most browsers from the one we want (i.e. at the
                // start of the contents of the block element). We get round this by advancing the position returned to
                // the last possible equivalent visible position.
                if (unit == WORD) {
                    charIterator = createCharacterIterator(pos, false, null, characterOptions);
                    nextPos = charIterator.next();
                    charIterator.dispose();
                }
                if (nextPos) {
                    newPos = nextPos.previousVisible();
                }
            }
        }


        return {
            position: newPos,
            unitsMoved: unitsMoved
        };
    }

    function createRangeCharacterIterator(session, range, characterOptions, backward) {
        var rangeStart = session.getRangeBoundaryPosition(range, true);
        var rangeEnd = session.getRangeBoundaryPosition(range, false);
        var itStart = backward ? rangeEnd : rangeStart;
        var itEnd = backward ? rangeStart : rangeEnd;

        return createCharacterIterator(itStart, !!backward, itEnd, characterOptions);
    }

    function getRangeCharacters(session, range, characterOptions) {

        var chars = [], it = createRangeCharacterIterator(session, range, characterOptions), pos;
        while ( (pos = it.next()) ) {
            chars.push(pos);
        }

        it.dispose();
        return chars;
    }

    function isWholeWord(startPos, endPos, wordOptions) {
        var range = api.createRange(startPos.node);
        range.setStartAndEnd(startPos.node, startPos.offset, endPos.node, endPos.offset);
        return !range.expand("word", { wordOptions: wordOptions });
    }

    function findTextFromPosition(initialPos, searchTerm, isRegex, searchScopeRange, findOptions) {
        var backward = isDirectionBackward(findOptions.direction);
        var it = createCharacterIterator(
            initialPos,
            backward,
            initialPos.session.getRangeBoundaryPosition(searchScopeRange, backward),
            findOptions.characterOptions
        );
        var text = "", chars = [], pos, currentChar, matchStartIndex, matchEndIndex;
        var result, insideRegexMatch;
        var returnValue = null;

        function handleMatch(startIndex, endIndex) {
            var startPos = chars[startIndex].previousVisible();
            var endPos = chars[endIndex - 1];
            var valid = (!findOptions.wholeWordsOnly || isWholeWord(startPos, endPos, findOptions.wordOptions));

            return {
                startPos: startPos,
                endPos: endPos,
                valid: valid
            };
        }

        while ( (pos = it.next()) ) {
            currentChar = pos.character;
            if (!isRegex && !findOptions.caseSensitive) {
                currentChar = currentChar.toLowerCase();
            }

            if (backward) {
                chars.unshift(pos);
                text = currentChar + text;
            } else {
                chars.push(pos);
                text += currentChar;
            }

            if (isRegex) {
                result = searchTerm.exec(text);
                if (result) {
                    matchStartIndex = result.index;
                    matchEndIndex = matchStartIndex + result[0].length;
                    if (insideRegexMatch) {
                        // Check whether the match is now over
                        if ((!backward && matchEndIndex < text.length) || (backward && matchStartIndex > 0)) {
                            returnValue = handleMatch(matchStartIndex, matchEndIndex);
                            break;
                        }
                    } else {
                        insideRegexMatch = true;
                    }
                }
            } else if ( (matchStartIndex = text.indexOf(searchTerm)) != -1 ) {
                returnValue = handleMatch(matchStartIndex, matchStartIndex + searchTerm.length);
                break;
            }
        }

        // Check whether regex match extends to the end of the range
        if (insideRegexMatch) {
            returnValue = handleMatch(matchStartIndex, matchEndIndex);
        }
        it.dispose();

        return returnValue;
    }

    function createEntryPointFunction(func) {
        return function() {
            var sessionRunning = !!currentSession;
            var session = getSession();
            var args = [session].concat( util.toArray(arguments) );
            var returnValue = func.apply(this, args);
            if (!sessionRunning) {
                endSession();
            }
            return returnValue;
        };
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    // Extensions to the Rangy Range object

    function createRangeBoundaryMover(isStart, collapse) {
        /*
         Unit can be "character" or "word"
         Options:

         - includeTrailingSpace
         - wordRegex
         - tokenizer
         - collapseSpaceBeforeLineBreak
         */
        return createEntryPointFunction(
            function(session, unit, count, moveOptions) {
                if (typeof count == UNDEF) {
                    count = unit;
                    unit = CHARACTER;
                }
                moveOptions = createNestedOptions(moveOptions, defaultMoveOptions);

                var boundaryIsStart = isStart;
                if (collapse) {
                    boundaryIsStart = (count >= 0);
                    this.collapse(!boundaryIsStart);
                }
                var moveResult = movePositionBy(session.getRangeBoundaryPosition(this, boundaryIsStart), unit, count, moveOptions.characterOptions, moveOptions.wordOptions);
                var newPos = moveResult.position;
                this[boundaryIsStart ? "setStart" : "setEnd"](newPos.node, newPos.offset);
                return moveResult.unitsMoved;
            }
        );
    }

    function createRangeTrimmer(isStart) {
        return createEntryPointFunction(
            function(session, characterOptions) {
                characterOptions = createOptions(characterOptions, defaultCharacterOptions);
                var pos;
                var it = createRangeCharacterIterator(session, this, characterOptions, !isStart);
                var trimCharCount = 0;
                while ( (pos = it.next()) && allWhiteSpaceRegex.test(pos.character) ) {
                    ++trimCharCount;
                }
                it.dispose();
                var trimmed = (trimCharCount > 0);
                if (trimmed) {
                    this[isStart ? "moveStart" : "moveEnd"](
                        "character",
                        isStart ? trimCharCount : -trimCharCount,
                        { characterOptions: characterOptions }
                    );
                }
                return trimmed;
            }
        );
    }

    extend(api.rangePrototype, {
        moveStart: createRangeBoundaryMover(true, false),

        moveEnd: createRangeBoundaryMover(false, false),

        move: createRangeBoundaryMover(true, true),

        trimStart: createRangeTrimmer(true),

        trimEnd: createRangeTrimmer(false),

        trim: createEntryPointFunction(
            function(session, characterOptions) {
                var startTrimmed = this.trimStart(characterOptions), endTrimmed = this.trimEnd(characterOptions);
                return startTrimmed || endTrimmed;
            }
        ),

        expand: createEntryPointFunction(
            function(session, unit, expandOptions) {
                var moved = false;
                expandOptions = createNestedOptions(expandOptions, defaultExpandOptions);
                var characterOptions = expandOptions.characterOptions;
                if (!unit) {
                    unit = CHARACTER;
                }
                if (unit == WORD) {
                    var wordOptions = expandOptions.wordOptions;
                    var startPos = session.getRangeBoundaryPosition(this, true);
                    var endPos = session.getRangeBoundaryPosition(this, false);

                    var startTokenizedTextProvider = createTokenizedTextProvider(startPos, characterOptions, wordOptions);
                    var startToken = startTokenizedTextProvider.nextEndToken();
                    var newStartPos = startToken.chars[0].previousVisible();
                    var endToken, newEndPos;

                    if (this.collapsed) {
                        endToken = startToken;
                    } else {
                        var endTokenizedTextProvider = createTokenizedTextProvider(endPos, characterOptions, wordOptions);
                        endToken = endTokenizedTextProvider.previousStartToken();
                    }
                    newEndPos = endToken.chars[endToken.chars.length - 1];

                    if (!newStartPos.equals(startPos)) {
                        this.setStart(newStartPos.node, newStartPos.offset);
                        moved = true;
                    }
                    if (newEndPos && !newEndPos.equals(endPos)) {
                        this.setEnd(newEndPos.node, newEndPos.offset);
                        moved = true;
                    }

                    if (expandOptions.trim) {
                        if (expandOptions.trimStart) {
                            moved = this.trimStart(characterOptions) || moved;
                        }
                        if (expandOptions.trimEnd) {
                            moved = this.trimEnd(characterOptions) || moved;
                        }
                    }

                    return moved;
                } else {
                    return this.moveEnd(CHARACTER, 1, expandOptions);
                }
            }
        ),

        text: createEntryPointFunction(
            function(session, characterOptions) {
                return this.collapsed ?
                    "" : getRangeCharacters(session, this, createOptions(characterOptions, defaultCharacterOptions)).join("");
            }
        ),

        selectCharacters: createEntryPointFunction(
            function(session, containerNode, startIndex, endIndex, characterOptions) {
                var moveOptions = { characterOptions: characterOptions };
                if (!containerNode) {
                    containerNode = getBody( this.getDocument() );
                }
                this.selectNodeContents(containerNode);
                this.collapse(true);
                this.moveStart("character", startIndex, moveOptions);
                this.collapse(true);
                this.moveEnd("character", endIndex - startIndex, moveOptions);
            }
        ),

        // Character indexes are relative to the start of node
        toCharacterRange: createEntryPointFunction(
            function(session, containerNode, characterOptions) {
                if (!containerNode) {
                    containerNode = getBody( this.getDocument() );
                }
                var parent = containerNode.parentNode, nodeIndex = dom.getNodeIndex(containerNode);
                var rangeStartsBeforeNode = (dom.comparePoints(this.startContainer, this.endContainer, parent, nodeIndex) == -1);
                var rangeBetween = this.cloneRange();
                var startIndex, endIndex;
                if (rangeStartsBeforeNode) {
                    rangeBetween.setStartAndEnd(this.startContainer, this.startOffset, parent, nodeIndex);
                    startIndex = -rangeBetween.text(characterOptions).length;
                } else {
                    rangeBetween.setStartAndEnd(parent, nodeIndex, this.startContainer, this.startOffset);
                    startIndex = rangeBetween.text(characterOptions).length;
                }
                endIndex = startIndex + this.text(characterOptions).length;

                return {
                    start: startIndex,
                    end: endIndex
                };
            }
        ),

        findText: createEntryPointFunction(
            function(session, searchTermParam, findOptions) {
                // Set up options
                findOptions = createNestedOptions(findOptions, defaultFindOptions);

                // Create word options if we're matching whole words only
                if (findOptions.wholeWordsOnly) {
                    // We don't ever want trailing spaces for search results
                    findOptions.wordOptions.includeTrailingSpace = false;
                }

                var backward = isDirectionBackward(findOptions.direction);

                // Create a range representing the search scope if none was provided
                var searchScopeRange = findOptions.withinRange;
                if (!searchScopeRange) {
                    searchScopeRange = api.createRange();
                    searchScopeRange.selectNodeContents(this.getDocument());
                }

                // Examine and prepare the search term
                var searchTerm = searchTermParam, isRegex = false;
                if (typeof searchTerm == "string") {
                    if (!findOptions.caseSensitive) {
                        searchTerm = searchTerm.toLowerCase();
                    }
                } else {
                    isRegex = true;
                }

                var initialPos = session.getRangeBoundaryPosition(this, !backward);

                // Adjust initial position if it lies outside the search scope
                var comparison = searchScopeRange.comparePoint(initialPos.node, initialPos.offset);

                if (comparison === -1) {
                    initialPos = session.getRangeBoundaryPosition(searchScopeRange, true);
                } else if (comparison === 1) {
                    initialPos = session.getRangeBoundaryPosition(searchScopeRange, false);
                }

                var pos = initialPos;
                var wrappedAround = false;

                // Try to find a match and ignore invalid ones
                var findResult;
                while (true) {
                    findResult = findTextFromPosition(pos, searchTerm, isRegex, searchScopeRange, findOptions);

                    if (findResult) {
                        if (findResult.valid) {
                            this.setStartAndEnd(findResult.startPos.node, findResult.startPos.offset, findResult.endPos.node, findResult.endPos.offset);
                            return true;
                        } else {
                            // We've found a match that is not a whole word, so we carry on searching from the point immediately
                            // after the match
                            pos = backward ? findResult.startPos : findResult.endPos;
                        }
                    } else if (findOptions.wrap && !wrappedAround) {
                        // No result found but we're wrapping around and limiting the scope to the unsearched part of the range
                        searchScopeRange = searchScopeRange.cloneRange();
                        pos = session.getRangeBoundaryPosition(searchScopeRange, !backward);
                        searchScopeRange.setBoundary(initialPos.node, initialPos.offset, backward);
                        wrappedAround = true;
                    } else {
                        // Nothing found and we can't wrap around, so we're done
                        return false;
                    }
                }
            }
        ),

        pasteHtml: function(html) {
            this.deleteContents();
            if (html) {
                var frag = this.createContextualFragment(html);
                var lastChild = frag.lastChild;
                this.insertNode(frag);
                this.collapseAfter(lastChild);
            }
        }
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Extensions to the Rangy Selection object

    function createSelectionTrimmer(methodName) {
        return createEntryPointFunction(
            function(session, characterOptions) {
                var trimmed = false;
                this.changeEachRange(function(range) {
                    trimmed = range[methodName](characterOptions) || trimmed;
                });
                return trimmed;
            }
        );
    }

    extend(api.selectionPrototype, {
        expand: createEntryPointFunction(
            function(session, unit, expandOptions) {
                this.changeEachRange(function(range) {
                    range.expand(unit, expandOptions);
                });
            }
        ),

        move: createEntryPointFunction(
            function(session, unit, count, options) {
                var unitsMoved = 0;
                if (this.focusNode) {
                    this.collapse(this.focusNode, this.focusOffset);
                    var range = this.getRangeAt(0);
                    if (!options) {
                        options = {};
                    }
                    options.characterOptions = createOptions(options.characterOptions, defaultCaretCharacterOptions);
                    unitsMoved = range.move(unit, count, options);
                    this.setSingleRange(range);
                }
                return unitsMoved;
            }
        ),

        trimStart: createSelectionTrimmer("trimStart"),
        trimEnd: createSelectionTrimmer("trimEnd"),
        trim: createSelectionTrimmer("trim"),

        selectCharacters: createEntryPointFunction(
            function(session, containerNode, startIndex, endIndex, direction, characterOptions) {
                var range = api.createRange(containerNode);
                range.selectCharacters(containerNode, startIndex, endIndex, characterOptions);
                this.setSingleRange(range, direction);
            }
        ),

        saveCharacterRanges: createEntryPointFunction(
            function(session, containerNode, characterOptions) {
                var ranges = this.getAllRanges(), rangeCount = ranges.length;
                var rangeInfos = [];

                var backward = rangeCount == 1 && this.isBackward();

                for (var i = 0, len = ranges.length; i < len; ++i) {
                    rangeInfos[i] = {
                        characterRange: ranges[i].toCharacterRange(containerNode, characterOptions),
                        backward: backward,
                        characterOptions: characterOptions
                    };
                }

                return rangeInfos;
            }
        ),

        restoreCharacterRanges: createEntryPointFunction(
            function(session, containerNode, saved) {
                this.removeAllRanges();
                for (var i = 0, len = saved.length, range, rangeInfo, characterRange; i < len; ++i) {
                    rangeInfo = saved[i];
                    characterRange = rangeInfo.characterRange;
                    range = api.createRange(containerNode);
                    range.selectCharacters(containerNode, characterRange.start, characterRange.end, rangeInfo.characterOptions);
                    this.addRange(range, rangeInfo.backward);
                }
            }
        ),

        text: createEntryPointFunction(
            function(session, characterOptions) {
                var rangeTexts = [];
                for (var i = 0, len = this.rangeCount; i < len; ++i) {
                    rangeTexts[i] = this.getRangeAt(i).text(characterOptions);
                }
                return rangeTexts.join("");
            }
        )
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Extensions to the core rangy object

    api.innerText = function(el, characterOptions) {
        var range = api.createRange(el);
        range.selectNodeContents(el);
        var text = range.text(characterOptions);
        return text;
    };

    api.createWordIterator = function(startNode, startOffset, iteratorOptions) {
        var session = getSession();
        iteratorOptions = createNestedOptions(iteratorOptions, defaultWordIteratorOptions);
        var startPos = session.getPosition(startNode, startOffset);
        var tokenizedTextProvider = createTokenizedTextProvider(startPos, iteratorOptions.characterOptions, iteratorOptions.wordOptions);
        var backward = isDirectionBackward(iteratorOptions.direction);

        return {
            next: function() {
                return backward ? tokenizedTextProvider.previousStartToken() : tokenizedTextProvider.nextEndToken();
            },

            dispose: function() {
                tokenizedTextProvider.dispose();
                this.next = function() {};
            }
        };
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    api.noMutation = function(func) {
        var session = getSession();
        func(session);
        endSession();
    };

    api.noMutation.createEntryPointFunction = createEntryPointFunction;

    api.textRange = {
        isBlockNode: isBlockNode,
        isCollapsedWhitespaceNode: isCollapsedWhitespaceNode,

        createPosition: createEntryPointFunction(
            function(session, node, offset) {
                return session.getPosition(node, offset);
            }
        )
    };
});

/**
 * Detect browser support for specific features
 */
wysihtml.browser = (function() {
  var userAgent   = navigator.userAgent,
      testElement = document.createElement("div"),
      // Browser sniffing is unfortunately needed since some behaviors are impossible to feature detect
      // We need to be extra careful about Microsoft as it shows increasing tendency of tainting its userAgent strings with false feathers
      isGecko     = userAgent.indexOf("Gecko")        !== -1 && userAgent.indexOf("KHTML") === -1 && !isIE(),
      isWebKit    = userAgent.indexOf("AppleWebKit/") !== -1 && !isIE(),
      isChrome    = userAgent.indexOf("Chrome/")      !== -1 && !isIE(),
      isOpera     = userAgent.indexOf("Opera/")       !== -1 && !isIE();

  function iosVersion(userAgent) {
    return +((/ipad|iphone|ipod/.test(userAgent) && userAgent.match(/ os (\d+).+? like mac os x/)) || [undefined, 0])[1];
  }

  function androidVersion(userAgent) {
    return +(userAgent.match(/android (\d+)/) || [undefined, 0])[1];
  }

  function isIE(version, equation) {
    var rv = -1,
        re;

    if (navigator.appName == 'Microsoft Internet Explorer') {
      re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    } else if (navigator.appName == 'Netscape') {
      if (navigator.userAgent.indexOf("Trident") > -1) {
        re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      } else if ((/Edge\/(\d+)./i).test(navigator.userAgent)) {
        re = /Edge\/(\d+)./i;
      }
    }

    if (re && re.exec(navigator.userAgent) != null) {
      rv = parseFloat(RegExp.$1);
    }

    if (rv === -1) { return false; }
    if (!version) { return true; }
    if (!equation) { return version === rv; }
    if (equation === "<") { return version < rv; }
    if (equation === ">") { return version > rv; }
    if (equation === "<=") { return version <= rv; }
    if (equation === ">=") { return version >= rv; }
  }

  return {
    // Static variable needed, publicly accessible, to be able override it in unit tests
    USER_AGENT: userAgent,

    /**
     * Exclude browsers that are not capable of displaying and handling
     * contentEditable as desired:
     *    - iPhone, iPad (tested iOS 4.2.2) and Android (tested 2.2) refuse to make contentEditables focusable
     *    - IE < 8 create invalid markup and crash randomly from time to time
     *
     * @return {Boolean}
     */
    supported: function() {
      var userAgent                   = this.USER_AGENT.toLowerCase(),
          // Essential for making html elements editable
          hasContentEditableSupport   = "contentEditable" in testElement,
          // Following methods are needed in order to interact with the contentEditable area
          hasEditingApiSupport        = document.execCommand && document.queryCommandSupported && document.queryCommandState,
          // document selector apis are only supported by IE 8+, Safari 4+, Chrome and Firefox 3.5+
          hasQuerySelectorSupport     = document.querySelector && document.querySelectorAll,
          // contentEditable is unusable in mobile browsers (tested iOS 4.2.2, Android 2.2, Opera Mobile, WebOS 3.05)
          isIncompatibleMobileBrowser = (this.isIos() && iosVersion(userAgent) < 5) || (this.isAndroid() && androidVersion(userAgent) < 4) || userAgent.indexOf("opera mobi") !== -1 || userAgent.indexOf("hpwos/") !== -1;
      return hasContentEditableSupport
        && hasEditingApiSupport
        && hasQuerySelectorSupport
        && !isIncompatibleMobileBrowser;
    },

    isTouchDevice: function() {
      return this.supportsEvent("touchmove");
    },

    isIos: function() {
      return (/ipad|iphone|ipod/i).test(this.USER_AGENT);
    },

    isAndroid: function() {
      return this.USER_AGENT.indexOf("Android") !== -1;
    },

    /**
     * Whether the browser supports sandboxed iframes
     * Currently only IE 6+ offers such feature <iframe security="restricted">
     *
     * http://msdn.microsoft.com/en-us/library/ms534622(v=vs.85).aspx
     * http://blogs.msdn.com/b/ie/archive/2008/01/18/using-frames-more-securely.aspx
     *
     * HTML5 sandboxed iframes are still buggy and their DOM is not reachable from the outside (except when using postMessage)
     */
    supportsSandboxedIframes: function() {
      return isIE();
    },

    /**
     * IE6+7 throw a mixed content warning when the src of an iframe
     * is empty/unset or about:blank
     * window.querySelector is implemented as of IE8
     */
    throwsMixedContentWarningWhenIframeSrcIsEmpty: function() {
      return !("querySelector" in document);
    },

    /**
     * Whether the caret is correctly displayed in contentEditable elements
     * Firefox sometimes shows a huge caret in the beginning after focusing
     */
    displaysCaretInEmptyContentEditableCorrectly: function() {
      return isIE(12, ">");
    },

    /**
     * Opera and IE are the only browsers who offer the css value
     * in the original unit, thx to the currentStyle object
     * All other browsers provide the computed style in px via window.getComputedStyle
     */
    hasCurrentStyleProperty: function() {
      return "currentStyle" in testElement;
    },

    /**
     * Whether the browser inserts a <br> when pressing enter in a contentEditable element
     */
    insertsLineBreaksOnReturn: function() {
      return isGecko;
    },

    supportsPlaceholderAttributeOn: function(element) {
      return "placeholder" in element;
    },

    supportsEvent: function(eventName) {
      return "on" + eventName in testElement || (function() {
        testElement.setAttribute("on" + eventName, "return;");
        return typeof(testElement["on" + eventName]) === "function";
      })();
    },

    /**
     * Opera doesn't correctly fire focus/blur events when clicking in- and outside of iframe
     */
    supportsEventsInIframeCorrectly: function() {
      return !isOpera;
    },

    /**
     * Everything below IE9 doesn't know how to treat HTML5 tags
     *
     * @param {Object} context The document object on which to check HTML5 support
     *
     * @example
     *    wysihtml.browser.supportsHTML5Tags(document);
     */
    supportsHTML5Tags: function(context) {
      var element = context.createElement("div"),
          html5   = "<article>foo</article>";
      element.innerHTML = html5;
      return element.innerHTML.toLowerCase() === html5;
    },

    /**
     * Checks whether a document supports a certain queryCommand
     * In particular, Opera needs a reference to a document that has a contentEditable in it's dom tree
     * in oder to report correct results
     *
     * @param {Object} doc Document object on which to check for a query command
     * @param {String} command The query command to check for
     * @return {Boolean}
     *
     * @example
     *    wysihtml.browser.supportsCommand(document, "bold");
     */
    supportsCommand: (function() {
      // Following commands are supported but contain bugs in some browsers
      // TODO: investigate if some of these bugs can be tested without altering selection on page, instead of targeting browsers and versions directly
      var buggyCommands = {
        // formatBlock fails with some tags (eg. <blockquote>)
        "formatBlock":          isIE(10, "<="),
         // When inserting unordered or ordered lists in Firefox, Chrome or Safari, the current selection or line gets
         // converted into a list (<ul><li>...</li></ul>, <ol><li>...</li></ol>)
         // IE and Opera act a bit different here as they convert the entire content of the current block element into a list
        "insertUnorderedList":  isIE(),
        "insertOrderedList":    isIE()
      };

      // Firefox throws errors for queryCommandSupported, so we have to build up our own object of supported commands
      var supported = {
        "insertHTML": isGecko
      };

      return function(doc, command) {
        var isBuggy = buggyCommands[command];
        if (!isBuggy) {
          // Firefox throws errors when invoking queryCommandSupported or queryCommandEnabled
          try {
            return doc.queryCommandSupported(command);
          } catch(e1) {}

          try {
            return doc.queryCommandEnabled(command);
          } catch(e2) {
            return !!supported[command];
          }
        }
        return false;
      };
    })(),

    /**
     * IE: URLs starting with:
     *    www., http://, https://, ftp://, gopher://, mailto:, new:, snews:, telnet:, wasis:, file://,
     *    nntp://, newsrc:, ldap://, ldaps://, outlook:, mic:// and url:
     * will automatically be auto-linked when either the user inserts them via copy&paste or presses the
     * space bar when the caret is directly after such an url.
     * This behavior cannot easily be avoided in IE < 9 since the logic is hardcoded in the mshtml.dll
     * (related blog post on msdn
     * http://blogs.msdn.com/b/ieinternals/archive/2009/09/17/prevent-automatic-hyperlinking-in-contenteditable-html.aspx).
     */
    doesAutoLinkingInContentEditable: function() {
      return isIE();
    },

    /**
     * As stated above, IE auto links urls typed into contentEditable elements
     * Since IE9 it's possible to prevent this behavior
     */
    canDisableAutoLinking: function() {
      return this.supportsCommand(document, "AutoUrlDetect");
    },

    /**
     * IE leaves an empty paragraph in the contentEditable element after clearing it
     * Chrome/Safari sometimes an empty <div>
     */
    clearsContentEditableCorrectly: function() {
      return isGecko || isOpera || isWebKit;
    },

    /**
     * IE gives wrong results for getAttribute
     */
    supportsGetAttributeCorrectly: function() {
      var td = document.createElement("td");
      return td.getAttribute("rowspan") != "1";
    },

    /**
     * When clicking on images in IE, Opera and Firefox, they are selected, which makes it easy to interact with them.
     * Chrome and Safari both don't support this
     */
    canSelectImagesInContentEditable: function() {
      return isGecko || isIE() || isOpera;
    },

    /**
     * All browsers except Safari and Chrome automatically scroll the range/caret position into view
     */
    autoScrollsToCaret: function() {
      return !isWebKit;
    },

    /**
     * Check whether the browser automatically closes tags that don't need to be opened
     */
    autoClosesUnclosedTags: function() {
      var clonedTestElement = testElement.cloneNode(false),
          returnValue,
          innerHTML;

      clonedTestElement.innerHTML = "<p><div></div>";
      innerHTML                   = clonedTestElement.innerHTML.toLowerCase();
      returnValue                 = innerHTML === "<p></p><div></div>" || innerHTML === "<p><div></div></p>";

      // Cache result by overwriting current function
      this.autoClosesUnclosedTags = function() { return returnValue; };

      return returnValue;
    },

    /**
     * Whether the browser supports the native document.getElementsByClassName which returns live NodeLists
     */
    supportsNativeGetElementsByClassName: function() {
      return String(document.getElementsByClassName).indexOf("[native code]") !== -1;
    },

    /**
     * As of now (19.04.2011) only supported by Firefox 4 and Chrome
     * See https://developer.mozilla.org/en/DOM/Selection/modify
     */
    supportsSelectionModify: function() {
      return "getSelection" in window && "modify" in window.getSelection();
    },

    /**
     * Opera needs a white space after a <br> in order to position the caret correctly
     */
    needsSpaceAfterLineBreak: function() {
      return isOpera;
    },

    /**
     * Whether the browser supports the speech api on the given element
     * See http://mikepultz.com/2011/03/accessing-google-speech-api-chrome-11/
     *
     * @example
     *    var input = document.createElement("input");
     *    if (wysihtml.browser.supportsSpeechApiOn(input)) {
     *      // ...
     *    }
     */
    supportsSpeechApiOn: function(input) {
      var chromeVersion = userAgent.match(/Chrome\/(\d+)/) || [undefined, 0];
      return chromeVersion[1] >= 11 && ("onwebkitspeechchange" in input || "speech" in input);
    },

    /**
     * IE9 crashes when setting a getter via Object.defineProperty on XMLHttpRequest or XDomainRequest
     * See https://connect.microsoft.com/ie/feedback/details/650112
     * or try the POC http://tifftiff.de/ie9_crash/
     */
    crashesWhenDefineProperty: function(property) {
      return isIE(9) && (property === "XMLHttpRequest" || property === "XDomainRequest");
    },

    /**
     * IE is the only browser who fires the "focus" event not immediately when .focus() is called on an element
     */
    doesAsyncFocus: function() {
      return isIE(12, ">");
    },

    /**
     * In IE it's impssible for the user and for the selection library to set the caret after an <img> when it's the lastChild in the document
     */
    hasProblemsSettingCaretAfterImg: function() {
      return isIE();
    },

    /* In IE when deleting with caret at the begining of LI, List get broken into half instead of merging the LI with previous */
    hasLiDeletingProblem: function() {
      return isIE();
    },

    hasUndoInContextMenu: function() {
      return isGecko || isChrome || isOpera;
    },

    /**
     * Opera sometimes doesn't insert the node at the right position when range.insertNode(someNode)
     * is used (regardless if rangy or native)
     * This especially happens when the caret is positioned right after a <br> because then
     * insertNode() will insert the node right before the <br>
     */
    hasInsertNodeIssue: function() {
      return isOpera;
    },

    /**
     * IE 8+9 don't fire the focus event of the <body> when the iframe gets focused (even though the caret gets set into the <body>)
     */
    hasIframeFocusIssue: function() {
      return isIE();
    },

    /**
     * Chrome + Safari create invalid nested markup after paste
     *
     *  <p>
     *    foo
     *    <p>bar</p> <!-- BOO! -->
     *  </p>
     */
    createsNestedInvalidMarkupAfterPaste: function() {
      return isWebKit;
    },

    // In all webkit browsers there are some places where caret can not be placed at the end of blocks and directly before block level element
    //   when startContainer is element.
    hasCaretBlockElementIssue: function() {
      return isWebKit;
    },

    supportsMutationEvents: function() {
      return ("MutationEvent" in window);
    },

    /**
      IE (at least up to 11) does not support clipboardData on event.
      It is on window but cannot return text/html
      Should actually check for clipboardData on paste event, but cannot in firefox
    */
    supportsModernPaste: function () {
      return !isIE();
    },

    // Unifies the property names of element.style by returning the suitable property name for current browser
    // Input property key must be the standard
    fixStyleKey: function(key) {
      if (key === "cssFloat") {
        return ("styleFloat" in document.createElement("div").style) ? "styleFloat" : "cssFloat";
      }
      return key;
    },

    usesControlRanges: function() {
      return document.body && "createControlRange" in document.body;
    },

    // Webkit browsers have an issue that when caret is at the end of link it is moved outside of link while inserting new characters,
    // so all inserted content will be after link. Selection before inserion is reported to be in link though.
    // This makes changing link texts from problematic to impossible (if link is just 1 characer long) for the user.
    // TODO: needs to be tested better than just browser as it some day might get fixed
    hasCaretAtLinkEndInsertionProblems: function() {
      return isWebKit;
    }
  };
})();

wysihtml.lang.array = function(arr) {
  return {
    /**
     * Check whether a given object exists in an array
     *
     * @example
     *    wysihtml.lang.array([1, 2]).contains(1);
     *    // => true
     *
     * Can be used to match array with array. If intersection is found true is returned
     */
    contains: function(needle) {
      if (Array.isArray(needle)) {
        for (var i = needle.length; i--;) {
          if (wysihtml.lang.array(arr).indexOf(needle[i]) !== -1) {
            return true;
          }
        }
        return false;
      } else {
        return wysihtml.lang.array(arr).indexOf(needle) !== -1;
      }
    },

    /**
     * Check whether a given object exists in an array and return index
     * If no elelemt found returns -1
     *
     * @example
     *    wysihtml.lang.array([1, 2]).indexOf(2);
     *    // => 1
     */
    indexOf: function(needle) {
        if (arr.indexOf) {
          return arr.indexOf(needle);
        } else {
          for (var i=0, length=arr.length; i<length; i++) {
            if (arr[i] === needle) { return i; }
          }
          return -1;
        }
    },

    /**
     * Substract one array from another
     *
     * @example
     *    wysihtml.lang.array([1, 2, 3, 4]).without([3, 4]);
     *    // => [1, 2]
     */
    without: function(arrayToSubstract) {
      arrayToSubstract = wysihtml.lang.array(arrayToSubstract);
      var newArr  = [],
          i       = 0,
          length  = arr.length;
      for (; i<length; i++) {
        if (!arrayToSubstract.contains(arr[i])) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },

    /**
     * Return a clean native array
     *
     * Following will convert a Live NodeList to a proper Array
     * @example
     *    var childNodes = wysihtml.lang.array(document.body.childNodes).get();
     */
    get: function() {
      var i        = 0,
          length   = arr.length,
          newArray = [];
      for (; i<length; i++) {
        newArray.push(arr[i]);
      }
      return newArray;
    },

    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     * optionally this can be provided as second argument
     *
     * @example
     *    var childNodes = wysihtml.lang.array([1,2,3,4]).map(function (value, index, array) {
            return value * 2;
     *    });
     *    // => [2,4,6,8]
     */
    map: function(callback, thisArg) {
      if (Array.prototype.map) {
        return arr.map(callback, thisArg);
      } else {
        var len = arr.length >>> 0,
            A = new Array(len),
            i = 0;
        for (; i < len; i++) {
           A[i] = callback.call(thisArg, arr[i], i, arr);
        }
        return A;
      }
    },

    /* ReturnS new array without duplicate entries
     *
     * @example
     *    var uniq = wysihtml.lang.array([1,2,3,2,1,4]).unique();
     *    // => [1,2,3,4]
     */
    unique: function() {
      var vals = [],
          max = arr.length,
          idx = 0;

      while (idx < max) {
        if (!wysihtml.lang.array(vals).contains(arr[idx])) {
          vals.push(arr[idx]);
        }
        idx++;
      }
      return vals;
    }

  };
};

wysihtml.lang.Dispatcher = Base.extend(
  /** @scope wysihtml.lang.Dialog.prototype */ {
  on: function(eventName, handler) {
    this.events = this.events || {};
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(handler);
    return this;
  },

  off: function(eventName, handler) {
    this.events = this.events || {};
    var i = 0,
        handlers,
        newHandlers;
    if (eventName) {
      handlers    = this.events[eventName] || [],
      newHandlers = [];
      for (; i<handlers.length; i++) {
        if (handlers[i] !== handler && handler) {
          newHandlers.push(handlers[i]);
        }
      }
      this.events[eventName] = newHandlers;
    } else {
      // Clean up all events
      this.events = {};
    }
    return this;
  },

  fire: function(eventName, payload) {
    this.events = this.events || {};
    var handlers = this.events[eventName] || [],
        i        = 0;
    for (; i<handlers.length; i++) {
      handlers[i].call(this, payload);
    }
    return this;
  },

  // deprecated, use .on()
  observe: function() {
    return this.on.apply(this, arguments);
  },

  // deprecated, use .off()
  stopObserving: function() {
    return this.off.apply(this, arguments);
  }
});

wysihtml.lang.object = function(obj) {
  return {
    /**
     * @example
     *    wysihtml.lang.object({ foo: 1, bar: 1 }).merge({ bar: 2, baz: 3 }).get();
     *    // => { foo: 1, bar: 2, baz: 3 }
     */
    merge: function(otherObj, deep) {
      for (var i in otherObj) {
        if (deep && wysihtml.lang.object(otherObj[i]).isPlainObject() && (typeof obj[i] === "undefined" || wysihtml.lang.object(obj[i]).isPlainObject())) {
          if (typeof obj[i] === "undefined") {
            obj[i] = wysihtml.lang.object(otherObj[i]).clone(true);
          } else {
            wysihtml.lang.object(obj[i]).merge(wysihtml.lang.object(otherObj[i]).clone(true));
          }
        } else {
          obj[i] = wysihtml.lang.object(otherObj[i]).isPlainObject() ? wysihtml.lang.object(otherObj[i]).clone(true) : otherObj[i];
        }
      }
      return this;
    },

    difference: function (otherObj) {
      var diffObj = {};

      // Get old values not in comparing object
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (!otherObj.hasOwnProperty(i)) {
            diffObj[i] = obj[i];
          }
        }
      }

      // Get new and different values in comparing object
      for (var o in otherObj) {
        if (otherObj.hasOwnProperty(o)) {
          if (!obj.hasOwnProperty(o) || obj[o] !== otherObj[o]) {
            diffObj[0] = obj[0];
          }
        }
      }
      return diffObj;
    },

    get: function() {
      return obj;
    },

    /**
     * @example
     *    wysihtml.lang.object({ foo: 1 }).clone();
     *    // => { foo: 1 }
     *
     *    v0.4.14 adds options for deep clone : wysihtml.lang.object({ foo: 1 }).clone(true);
     */
    clone: function(deep) {
      var newObj = {},
          i;

      if (obj === null || !wysihtml.lang.object(obj).isPlainObject()) {
        return obj;
      }

      for (i in obj) {
        if(obj.hasOwnProperty(i)) {
          if (deep) {
            newObj[i] = wysihtml.lang.object(obj[i]).clone(deep);
          } else {
            newObj[i] = obj[i];
          }
        }
      }
      return newObj;
    },

    /**
     * @example
     *    wysihtml.lang.object([]).isArray();
     *    // => true
     */
    isArray: function() {
      return Object.prototype.toString.call(obj) === "[object Array]";
    },

    /**
     * @example
     *    wysihtml.lang.object(function() {}).isFunction();
     *    // => true
     */
    isFunction: function() {
      return Object.prototype.toString.call(obj) === '[object Function]';
    },

    isPlainObject: function () {
      return obj && Object.prototype.toString.call(obj) === '[object Object]' && !(("Node" in window) ? obj instanceof Node : obj instanceof Element || obj instanceof Text);
    },

    /**
     * @example
     *    wysihtml.lang.object({}).isEmpty();
     *    // => true
     */
    isEmpty: function() {
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          return false;
        }
      }
      return true;
    }
  };
};

(function() {
  var WHITE_SPACE_START = /^\s+/,
      WHITE_SPACE_END   = /\s+$/,
      ENTITY_REG_EXP    = /[&<>\t"]/g,
      ENTITY_MAP = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': "&quot;",
        '\t':"&nbsp; "
      };
  wysihtml.lang.string = function(str) {
    str = String(str);
    return {
      /**
       * @example
       *    wysihtml.lang.string("   foo   ").trim();
       *    // => "foo"
       */
      trim: function() {
        return str.replace(WHITE_SPACE_START, "").replace(WHITE_SPACE_END, "");
      },

      /**
       * @example
       *    wysihtml.lang.string("Hello #{name}").interpolate({ name: "Christopher" });
       *    // => "Hello Christopher"
       */
      interpolate: function(vars) {
        for (var i in vars) {
          str = this.replace("#{" + i + "}").by(vars[i]);
        }
        return str;
      },

      /**
       * @example
       *    wysihtml.lang.string("Hello Tom").replace("Tom").with("Hans");
       *    // => "Hello Hans"
       */
      replace: function(search) {
        return {
          by: function(replace) {
            return str.split(search).join(replace);
          }
        };
      },

      /**
       * @example
       *    wysihtml.lang.string("hello<br>").escapeHTML();
       *    // => "hello&lt;br&gt;"
       */
      escapeHTML: function(linebreaks, convertSpaces) {
        var html = str.replace(ENTITY_REG_EXP, function(c) { return ENTITY_MAP[c]; });
        if (linebreaks) {
          html = html.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        if (convertSpaces) {
          html = html.replace(/  /gi, "&nbsp; ");
        }
        return html;
      }
    };
  };
})();

/**
 * Find urls in descendant text nodes of an element and auto-links them
 * Inspired by http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/
 *
 * @param {Element} element Container element in which to search for urls
 *
 * @example
 *    <div id="text-container">Please click here: www.google.com</div>
 *    <script>wysihtml.dom.autoLink(document.getElementById("text-container"));</script>
 */
(function(wysihtml) {
  var /**
       * Don't auto-link urls that are contained in the following elements:
       */
      IGNORE_URLS_IN        = wysihtml.lang.array(["CODE", "PRE", "A", "SCRIPT", "HEAD", "TITLE", "STYLE"]),
      /**
       * revision 1:
       *    /(\S+\.{1}[^\s\,\.\!]+)/g
       *
       * revision 2:
       *    /(\b(((https?|ftp):\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;\[\]]*[-A-Z0-9+&@#\/%=~_|])/gim
       *
       * put this in the beginning if you don't wan't to match within a word
       *    (^|[\>\(\{\[\s\>])
       */
      URL_REG_EXP           = /((https?:\/\/|www\.)[^\s<]{3,})/gi,
      TRAILING_CHAR_REG_EXP = /([^\w\/\-](,?))$/i,
      MAX_DISPLAY_LENGTH    = 100,
      BRACKETS              = { ")": "(", "]": "[", "}": "{" };

  function autoLink(element, ignoreInClasses) {
    if (_hasParentThatShouldBeIgnored(element, ignoreInClasses)) {
      return element;
    }

    if (element === element.ownerDocument.documentElement) {
      element = element.ownerDocument.body;
    }

    return _parseNode(element, ignoreInClasses);
  }

  /**
   * This is basically a rebuild of
   * the rails auto_link_urls text helper
   */
  function _convertUrlsToLinks(str) {
    return str.replace(URL_REG_EXP, function(match, url) {
      var punctuation = (url.match(TRAILING_CHAR_REG_EXP) || [])[1] || "",
          opening     = BRACKETS[punctuation];
      url = url.replace(TRAILING_CHAR_REG_EXP, "");

      if (url.split(opening).length > url.split(punctuation).length) {
        url = url + punctuation;
        punctuation = "";
      }
      var realUrl    = url,
          displayUrl = url;
      if (url.length > MAX_DISPLAY_LENGTH) {
        displayUrl = displayUrl.substr(0, MAX_DISPLAY_LENGTH) + "...";
      }
      // Add http prefix if necessary
      if (realUrl.substr(0, 4) === "www.") {
        realUrl = "http://" + realUrl;
      }

      return '<a href="' + realUrl + '">' + displayUrl + '</a>' + punctuation;
    });
  }

  /**
   * Creates or (if already cached) returns a temp element
   * for the given document object
   */
  function _getTempElement(context) {
    var tempElement = context._wysihtml_tempElement;
    if (!tempElement) {
      tempElement = context._wysihtml_tempElement = context.createElement("div");
    }
    return tempElement;
  }

  /**
   * Replaces the original text nodes with the newly auto-linked dom tree
   */
  function _wrapMatchesInNode(textNode) {
    var parentNode  = textNode.parentNode,
        nodeValue   = wysihtml.lang.string(textNode.data).escapeHTML(),
        tempElement = _getTempElement(parentNode.ownerDocument);

    // We need to insert an empty/temporary <span /> to fix IE quirks
    // Elsewise IE would strip white space in the beginning
    tempElement.innerHTML = "<span></span>" + _convertUrlsToLinks(nodeValue);
    tempElement.removeChild(tempElement.firstChild);

    while (tempElement.firstChild) {
      // inserts tempElement.firstChild before textNode
      parentNode.insertBefore(tempElement.firstChild, textNode);
    }
    parentNode.removeChild(textNode);
  }

  function _hasParentThatShouldBeIgnored(node, ignoreInClasses) {
    var nodeName;
    while (node.parentNode) {
      node = node.parentNode;
      nodeName = node.nodeName;
      if (node.className && wysihtml.lang.array(node.className.split(' ')).contains(ignoreInClasses)) {
        return true;
      }
      if (IGNORE_URLS_IN.contains(nodeName)) {
        return true;
      } else if (nodeName === "body") {
        return false;
      }
    }
    return false;
  }

  function _parseNode(element, ignoreInClasses) {
    if (IGNORE_URLS_IN.contains(element.nodeName)) {
      return;
    }

    if (element.className && wysihtml.lang.array(element.className.split(' ')).contains(ignoreInClasses)) {
      return;
    }

    if (element.nodeType === wysihtml.TEXT_NODE && element.data.match(URL_REG_EXP)) {
      _wrapMatchesInNode(element);
      return;
    }

    var childNodes        = wysihtml.lang.array(element.childNodes).get(),
        childNodesLength  = childNodes.length,
        i                 = 0;

    for (; i<childNodesLength; i++) {
      _parseNode(childNodes[i], ignoreInClasses);
    }

    return element;
  }

  wysihtml.dom.autoLink = autoLink;

  // Reveal url reg exp to the outside
  wysihtml.dom.autoLink.URL_REG_EXP = URL_REG_EXP;
})(wysihtml);

(function(wysihtml) {
  var api = wysihtml.dom;

  api.addClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.add(className);
    }
    if (api.hasClass(element, className)) {
      return;
    }
    element.className += " " + className;
  };

  api.removeClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.remove(className);
    }

    element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ");
  };

  api.hasClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.contains(className);
    }

    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  };
})(wysihtml);

wysihtml.dom.compareDocumentPosition = (function() {
  var documentElement = document.documentElement;
  if (documentElement.compareDocumentPosition) {
    return function(container, element) {
      return container.compareDocumentPosition(element);
    };
  } else {
    return function( container, element ) {
      // implementation borrowed from https://github.com/tmpvar/jsdom/blob/681a8524b663281a0f58348c6129c8c184efc62c/lib/jsdom/level3/core.js // MIT license
      var thisOwner, otherOwner;

      if( container.nodeType === 9) // Node.DOCUMENT_NODE
        thisOwner = container;
      else
        thisOwner = container.ownerDocument;

      if( element.nodeType === 9) // Node.DOCUMENT_NODE
        otherOwner = element;
      else
        otherOwner = element.ownerDocument;

      if( container === element ) return 0;
      if( container === element.ownerDocument ) return 4 + 16; //Node.DOCUMENT_POSITION_FOLLOWING + Node.DOCUMENT_POSITION_CONTAINED_BY;
      if( container.ownerDocument === element ) return 2 + 8;  //Node.DOCUMENT_POSITION_PRECEDING + Node.DOCUMENT_POSITION_CONTAINS;
      if( thisOwner !== otherOwner ) return 1; // Node.DOCUMENT_POSITION_DISCONNECTED;

      // Text nodes for attributes does not have a _parentNode. So we need to find them as attribute child.
      if( container.nodeType === 2 /*Node.ATTRIBUTE_NODE*/ && container.childNodes && wysihtml.lang.array(container.childNodes).indexOf( element ) !== -1)
        return 4 + 16; //Node.DOCUMENT_POSITION_FOLLOWING + Node.DOCUMENT_POSITION_CONTAINED_BY;

      if( element.nodeType === 2 /*Node.ATTRIBUTE_NODE*/ && element.childNodes && wysihtml.lang.array(element.childNodes).indexOf( container ) !== -1)
        return 2 + 8; //Node.DOCUMENT_POSITION_PRECEDING + Node.DOCUMENT_POSITION_CONTAINS;

      var point = container;
      var parents = [ ];
      var previous = null;
      while( point ) {
        if( point == element ) return 2 + 8; //Node.DOCUMENT_POSITION_PRECEDING + Node.DOCUMENT_POSITION_CONTAINS;
        parents.push( point );
        point = point.parentNode;
      }
      point = element;
      previous = null;
      while( point ) {
        if( point == container ) return 4 + 16; //Node.DOCUMENT_POSITION_FOLLOWING + Node.DOCUMENT_POSITION_CONTAINED_BY;
        var location_index = wysihtml.lang.array(parents).indexOf( point );
        if( location_index !== -1) {
         var smallest_common_ancestor = parents[ location_index ];
         var this_index = wysihtml.lang.array(smallest_common_ancestor.childNodes).indexOf( parents[location_index - 1]);//smallest_common_ancestor.childNodes.toArray().indexOf( parents[location_index - 1] );
         var other_index = wysihtml.lang.array(smallest_common_ancestor.childNodes).indexOf( previous ); //smallest_common_ancestor.childNodes.toArray().indexOf( previous );
         if( this_index > other_index ) {
               return 2; //Node.DOCUMENT_POSITION_PRECEDING;
         }
         else {
           return 4; //Node.DOCUMENT_POSITION_FOLLOWING;
         }
        }
        previous = point;
        point = point.parentNode;
      }
      return 1; //Node.DOCUMENT_POSITION_DISCONNECTED;
    };
  }
})();

wysihtml.dom.contains = (function() {
  var documentElement = document.documentElement;
  if (documentElement.contains) {
    return function(container, element) {
      if (element.nodeType !== wysihtml.ELEMENT_NODE) {
        if (element.parentNode === container) {
          return true;
        }
        element = element.parentNode;
      }
      return container !== element && container.contains(element);
    };
  } else if (documentElement.compareDocumentPosition) {
    return function(container, element) {
      // https://developer.mozilla.org/en/DOM/Node.compareDocumentPosition
      return !!(container.compareDocumentPosition(element) & 16);
    };
  }
})();

(function(wysihtml) {
  var doc = document;
  wysihtml.dom.ContentEditableArea = Base.extend({
      getContentEditable: function() {
        return this.element;
      },

      getWindow: function() {
        return this.element.ownerDocument.defaultView || this.element.ownerDocument.parentWindow;
      },

      getDocument: function() {
        return this.element.ownerDocument;
      },

      constructor: function(readyCallback, config, contentEditable) {
        this.callback = readyCallback || wysihtml.EMPTY_FUNCTION;
        this.config   = wysihtml.lang.object({}).merge(config).get();
        if (!this.config.className) {
          this.config.className = "wysihtml-sandbox";
        }
        if (contentEditable) {
            this.element = this._bindElement(contentEditable);
        } else {
            this.element = this._createElement();
        }
      },

      destroy: function() {

      },

      // creates a new contenteditable and initiates it
      _createElement: function() {
        var element = doc.createElement("div");
        element.className = this.config.className;
        this._loadElement(element);
        return element;
      },

      // initiates an allready existent contenteditable
      _bindElement: function(contentEditable) {
        contentEditable.className = contentEditable.className ? contentEditable.className + " wysihtml-sandbox" : "wysihtml-sandbox";
        this._loadElement(contentEditable, true);
        return contentEditable;
      },

      _loadElement: function(element, contentExists) {
        var that = this;

        if (!contentExists) {
            var innerHtml = this._getHtml();
            element.innerHTML = innerHtml;
        }

        this.loaded = true;
        // Trigger the callback
        setTimeout(function() { that.callback(that); }, 0);
      },

      _getHtml: function(templateVars) {
        return '';
      }

  });
})(wysihtml);

/**
 * Converts an HTML fragment/element into a unordered/ordered list
 *
 * @param {Element} element The element which should be turned into a list
 * @param {String} listType The list type in which to convert the tree (either "ul" or "ol")
 * @return {Element} The created list
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <span id="pseudo-list">
 *      eminem<br>
 *      dr. dre
 *      <div>50 Cent</div>
 *    </span>
 *
 *    <script>
 *      wysihtml.dom.convertToList(document.getElementById("pseudo-list"), "ul");
 *    </script>
 *
 *    <!-- Will result in: -->
 *    <ul>
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 */
wysihtml.dom.convertToList = (function() {
  function _createListItem(doc, list) {
    var listItem = doc.createElement("li");
    list.appendChild(listItem);
    return listItem;
  }

  function _createList(doc, type) {
    return doc.createElement(type);
  }

  function convertToList(element, listType, uneditableClass) {
    if (element.nodeName === "UL" || element.nodeName === "OL" || element.nodeName === "MENU") {
      // Already a list
      return element;
    }

    var doc               = element.ownerDocument,
        list              = _createList(doc, listType),
        lineBreaks        = element.querySelectorAll("br"),
        lineBreaksLength  = lineBreaks.length,
        childNodes,
        childNodesLength,
        childNode,
        lineBreak,
        parentNode,
        isBlockElement,
        isLineBreak,
        currentListItem,
        i;

    // First find <br> at the end of inline elements and move them behind them
    for (i=0; i<lineBreaksLength; i++) {
      lineBreak = lineBreaks[i];
      while ((parentNode = lineBreak.parentNode) && parentNode !== element && parentNode.lastChild === lineBreak) {
        if (wysihtml.dom.getStyle("display").from(parentNode) === "block") {
          parentNode.removeChild(lineBreak);
          break;
        }
        wysihtml.dom.insert(lineBreak).after(lineBreak.parentNode);
      }
    }

    childNodes        = wysihtml.lang.array(element.childNodes).get();
    childNodesLength  = childNodes.length;

    for (i=0; i<childNodesLength; i++) {
      currentListItem   = currentListItem || _createListItem(doc, list);
      childNode         = childNodes[i];
      isBlockElement    = wysihtml.dom.getStyle("display").from(childNode) === "block";
      isLineBreak       = childNode.nodeName === "BR";

      // consider uneditable as an inline element
      if (isBlockElement && (!uneditableClass || !wysihtml.dom.hasClass(childNode, uneditableClass))) {
        // Append blockElement to current <li> if empty, otherwise create a new one
        currentListItem = currentListItem.firstChild ? _createListItem(doc, list) : currentListItem;
        currentListItem.appendChild(childNode);
        currentListItem = null;
        continue;
      }

      if (isLineBreak) {
        // Only create a new list item in the next iteration when the current one has already content
        currentListItem = currentListItem.firstChild ? null : currentListItem;
        continue;
      }

      currentListItem.appendChild(childNode);
    }

    if (childNodes.length === 0) {
      _createListItem(doc, list);
    }

    element.parentNode.replaceChild(list, element);
    return list;
  }

  return convertToList;
})();

/**
 * Copy a set of attributes from one element to another
 *
 * @param {Array} attributesToCopy List of attributes which should be copied
 * @return {Object} Returns an object which offers the "from" method which can be invoked with the element where to
 *    copy the attributes from., this again returns an object which provides a method named "to" which can be invoked
 *    with the element where to copy the attributes to (see example)
 *
 * @example
 *    var textarea    = document.querySelector("textarea"),
 *        div         = document.querySelector("div[contenteditable=true]"),
 *        anotherDiv  = document.querySelector("div.preview");
 *    wysihtml.dom.copyAttributes(["spellcheck", "value", "placeholder"]).from(textarea).to(div).andTo(anotherDiv);
 *
 */
wysihtml.dom.copyAttributes = function(attributesToCopy) {
  return {
    from: function(elementToCopyFrom) {
      return {
        to: function pasteElementAttributesTo(elementToCopyTo) {
          var attribute,
              i         = 0,
              length    = attributesToCopy.length;
          for (; i<length; i++) {
            attribute = attributesToCopy[i];
            if (typeof(elementToCopyFrom[attribute]) !== "undefined" && elementToCopyFrom[attribute] !== "") {
              elementToCopyTo[attribute] = elementToCopyFrom[attribute];
            }
          }
          return { andTo: pasteElementAttributesTo };
        }
      };
    }
  };
};

/**
 * Copy a set of styles from one element to another
 * Please note that this only works properly across browsers when the element from which to copy the styles
 * is in the dom
 *
 * Interesting article on how to copy styles
 *
 * @param {Array} stylesToCopy List of styles which should be copied
 * @return {Object} Returns an object which offers the "from" method which can be invoked with the element where to
 *    copy the styles from., this again returns an object which provides a method named "to" which can be invoked
 *    with the element where to copy the styles to (see example)
 *
 * @example
 *    var textarea    = document.querySelector("textarea"),
 *        div         = document.querySelector("div[contenteditable=true]"),
 *        anotherDiv  = document.querySelector("div.preview");
 *    wysihtml.dom.copyStyles(["overflow-y", "width", "height"]).from(textarea).to(div).andTo(anotherDiv);
 *
 */
(function(dom) {

  /**
   * Mozilla, WebKit and Opera recalculate the computed width when box-sizing: boder-box; is set
   * So if an element has "width: 200px; -moz-box-sizing: border-box; border: 1px;" then
   * its computed css width will be 198px
   *
   * See https://bugzilla.mozilla.org/show_bug.cgi?id=520992
   */
  var BOX_SIZING_PROPERTIES = ["-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing"];

  var shouldIgnoreBoxSizingBorderBox = function(element) {
    if (hasBoxSizingBorderBox(element)) {
       return parseInt(dom.getStyle("width").from(element), 10) < element.offsetWidth;
    }
    return false;
  };

  var hasBoxSizingBorderBox = function(element) {
    var i       = 0,
        length  = BOX_SIZING_PROPERTIES.length;
    for (; i<length; i++) {
      if (dom.getStyle(BOX_SIZING_PROPERTIES[i]).from(element) === "border-box") {
        return BOX_SIZING_PROPERTIES[i];
      }
    }
  };

  dom.copyStyles = function(stylesToCopy) {
    return {
      from: function(element) {
        if (shouldIgnoreBoxSizingBorderBox(element)) {
          stylesToCopy = wysihtml.lang.array(stylesToCopy).without(BOX_SIZING_PROPERTIES);
        }

        var cssText = "",
            length  = stylesToCopy.length,
            i       = 0,
            property;
        for (; i<length; i++) {
          property = stylesToCopy[i];
          cssText += property + ":" + dom.getStyle(property).from(element) + ";";
        }

        return {
          to: function pasteStylesTo(element) {
            dom.setStyles(cssText).on(element);
            return { andTo: pasteStylesTo };
          }
        };
      }
    };
  };
})(wysihtml.dom);

/**
 * Event Delegation
 *
 * @example
 *    wysihtml.dom.delegate(document.body, "a", "click", function() {
 *      // foo
 *    });
 */
(function(wysihtml) {
  wysihtml.dom.delegate = function(container, selector, eventName, handler) {
    var callback = function(event) {
      var target = event.target,
          element = (target.nodeType === 3) ? target.parentNode : target, // IE has .contains only seeing elements not textnodes
          matches  = container.querySelectorAll(selector);

      for (var i = 0, max = matches.length; i < max; i++) {
        if (matches[i].contains(element)) {
          handler.call(matches[i], event);
        }
      }
    };

    container.addEventListener(eventName, callback, false);
    return {
      stop: function() {
        container.removeEventListener(eventName, callback, false);
      }
    };
  };
})(wysihtml);

// TODO: Refactor dom tree traversing here
(function(wysihtml) {

  // Finds parents of a node, returning the outermost node first in Array
  // if contain node is given parents search is stopped at the container
  function parents(node, container) {
    var nodes = [node], n = node;

    // iterate parents while parent exists and it is not container element
    while((container && n && n !== container) || (!container && n)) {
      nodes.unshift(n);
      n = n.parentNode;
    }
    return nodes;
  }

  wysihtml.dom.domNode = function(node) {
    var defaultNodeTypes = [wysihtml.ELEMENT_NODE, wysihtml.TEXT_NODE];

    return {

      is: {
        emptyTextNode: function(ignoreWhitespace) {
          var regx = ignoreWhitespace ? (/^\s*$/g) : (/^[\r\n]*$/g);
          return node && node.nodeType === wysihtml.TEXT_NODE && (regx).test(node.data);
        },

        // Returns if node is the rangy selection bookmark element (that must not be taken into account in most situatons and is removed on selection restoring)
        rangyBookmark: function() {
          return node && node.nodeType === 1 && node.classList.contains('rangySelectionBoundary');
        },

        visible: function() {
          var isVisible = !(/^\s*$/g).test(wysihtml.dom.getTextContent(node));

          if (!isVisible) {
            if (node.nodeType === 1 && node.querySelector('img, br, hr, object, embed, canvas, input, textarea')) {
              isVisible = true;
            }
          }
          return isVisible;
        },
        lineBreak: function() {
          return node && node.nodeType === 1 && node.nodeName === "BR";
        },
        block: function() {
          return node && node.nodeType === 1 && node.ownerDocument.defaultView.getComputedStyle(node).display === "block";
        },
        // Void elements are elemens that can not have content
        // In most cases browsers should solve the cases for you when you try to insert content into those,
        //    but IE does not and it is not nice to do so anyway.
        voidElement: function() {
          return wysihtml.dom.domNode(node).test({
            query: wysihtml.VOID_ELEMENTS
          });
        }
      },

      // var node = wysihtml.dom.domNode(element).prev({nodeTypes: [1,3], ignoreBlankTexts: true});
      prev: function(options) {
        var prevNode = node.previousSibling,
            types = (options && options.nodeTypes) ? options.nodeTypes : defaultNodeTypes;
        
        if (!prevNode) {
          return null;
        }

        if (
          wysihtml.dom.domNode(prevNode).is.rangyBookmark() || // is Rangy temporary boomark element (bypass)
          (!wysihtml.lang.array(types).contains(prevNode.nodeType)) || // nodeTypes check.
          (options && options.ignoreBlankTexts && wysihtml.dom.domNode(prevNode).is.emptyTextNode(true)) // Blank text nodes bypassed if set
        ) {
          return wysihtml.dom.domNode(prevNode).prev(options);
        }
        
        return prevNode;
      },

      // var node = wysihtml.dom.domNode(element).next({nodeTypes: [1,3], ignoreBlankTexts: true});
      next: function(options) {
        var nextNode = node.nextSibling,
            types = (options && options.nodeTypes) ? options.nodeTypes : defaultNodeTypes;
        
        if (!nextNode) {
          return null;
        }

        if (
          wysihtml.dom.domNode(nextNode).is.rangyBookmark() || // is Rangy temporary boomark element (bypass)
          (!wysihtml.lang.array(types).contains(nextNode.nodeType)) || // nodeTypes check.
          (options && options.ignoreBlankTexts && wysihtml.dom.domNode(nextNode).is.emptyTextNode(true)) // blank text nodes bypassed if set
        ) {
          return wysihtml.dom.domNode(nextNode).next(options);
        }
        
        return nextNode;
      },

      // Finds the common acnestor container of two nodes
      // If container given stops search at the container
      // If no common ancestor found returns null
      // var node = wysihtml.dom.domNode(element).commonAncestor(node2, container);
      commonAncestor: function(node2, container) {
        var parents1 = parents(node, container),
            parents2 = parents(node2, container);

        // Ensure we have found a common ancestor, which will be the first one if anything
        if (parents1[0] != parents2[0]) {
          return null;
        }

        // Traverse up the hierarchy of parents until we reach where they're no longer
        // the same. Then return previous which was the common ancestor.
        for (var i = 0; i < parents1.length; i++) {
          if (parents1[i] != parents2[i]) {
            return parents1[i - 1];
          }
        }

        return null;
      },

      // Traverses a node for last children and their chidren (including itself), and finds the last node that has no children.
      // Array of classes for forced last-leaves (ex: uneditable-container) can be defined (options = {leafClasses: [...]})
      // Useful for finding the actually visible element before cursor
      lastLeafNode: function(options) {
        var lastChild;

        // Returns non-element nodes
        if (node.nodeType !== 1) {
          return node;
        }

        // Returns if element is leaf
        lastChild = node.lastChild;
        if (!lastChild) {
          return node;
        }

        // Returns if element is of of options.leafClasses leaf
        if (options && options.leafClasses) {
          for (var i = options.leafClasses.length; i--;) {
            if (wysihtml.dom.hasClass(node, options.leafClasses[i])) {
              return node;
            }
          }
        }

        return wysihtml.dom.domNode(lastChild).lastLeafNode(options);
      },

      // Splits element at childnode and extracts the childNode out of the element context
      // Example:
      //   var node = wysihtml.dom.domNode(node).escapeParent(parentNode);
      escapeParent: function(element, newWrapper) {
        var parent, split2, nodeWrap,
            curNode = node;
        
        // Stop if node is not a descendant of element
        if (!wysihtml.dom.contains(element, node)) {
          throw new Error("Child is not a descendant of node.");
        }

        // Climb up the node tree untill node is reached
        do {
          // Get current parent of node
          parent = curNode.parentNode;

          // Move after nodes to new clone wrapper
          split2 = parent.cloneNode(false);
          while (parent.lastChild && parent.lastChild !== curNode) {
            split2.insertBefore(parent.lastChild, split2.firstChild);
          }

          // Move node up a level. If parent is not yet the container to escape, clone the parent around node, so inner nodes are escaped out too
          if (parent !== element) {
            nodeWrap = parent.cloneNode(false);
            nodeWrap.appendChild(curNode);
            curNode = nodeWrap;
          }
          parent.parentNode.insertBefore(curNode, parent.nextSibling);

          // Add after nodes (unless empty)
          if (split2.innerHTML !== '') {
            // if contents are empty insert without wrap
            if ((/^\s+$/).test(split2.innerHTML)) {
              while (split2.lastChild) {
                parent.parentNode.insertBefore(split2.lastChild, curNode.nextSibling);
              }
            } else {
              parent.parentNode.insertBefore(split2, curNode.nextSibling);
            }
          }

          // If the node left behind before the split (parent) is now empty then remove
          if (parent.innerHTML === '') {
            parent.parentNode.removeChild(parent);
          } else if ((/^\s+$/).test(parent.innerHTML)) {
            while (parent.firstChild) {
              parent.parentNode.insertBefore(parent.firstChild, parent);
            }
            parent.parentNode.removeChild(parent);
          }

        } while (parent && parent !== element);

        if (newWrapper && curNode) {
          curNode.parentNode.insertBefore(newWrapper, curNode);
          newWrapper.appendChild(curNode);
        }
      },

      transferContentTo: function(targetNode, removeOldWrapper) {
        if (node.nodeType === 1) {
          if (wysihtml.dom.domNode(targetNode).is.voidElement() || targetNode.nodeType === 3) {
            while (node.lastChild) {
              targetNode.parentNode.insertBefore(node.lastChild, targetNode.nextSibling);
            }
          } else {
            while (node.firstChild) {
              targetNode.appendChild(node.firstChild);
            }
          }
          if (removeOldWrapper) {
            node.parentNode.removeChild(node);
          }
        } else if (node.nodeType === 3 || node.nodeType === 8){
          if (wysihtml.dom.domNode(targetNode).is.voidElement()) {
            targetNode.parentNode.insertBefore(node, targetNode.nextSibling);
          } else {
            targetNode.appendChild(node);
          }
        }
      },

      /*
        Tests a node against properties, and returns true if matches.
        Tests on principle that all properties defined must have at least one match.
        styleValue parameter works in context of styleProperty and has no effect otherwise.
        Returns true if element matches and false if it does not.
        
        Properties for filtering element:
        {
          query: selector string,
          nodeName: string (uppercase),
          className: string,
          classRegExp: regex,
          styleProperty: string or [],
          styleValue: string, [] or regex
        }

        Example:
        var node = wysihtml.dom.domNode(element).test({})
      */
      test: function(properties) {
        var prop;

        // return false if properties object is not defined
        if (!properties) {
          return false;
        }

        // Only element nodes can be tested for these properties
        if (node.nodeType !== 1) {
          return false;
        }

        if (properties.query) {
          if (!node.matches(properties.query)) {
            return false;
          }
        }

        if (properties.nodeName && node.nodeName.toLowerCase() !== properties.nodeName.toLowerCase()) {
          return false;
        }

        if (properties.className && !node.classList.contains(properties.className)) {
          return false;
        }

        // classRegExp check (useful for classname begins with logic)
        if (properties.classRegExp) {
          var matches = (node.className || "").match(properties.classRegExp) || [];
          if (matches.length === 0) {
            return false;
          }
        }

        // styleProperty check
        if (properties.styleProperty && properties.styleProperty.length > 0) {
          var hasOneStyle = false,
              styles = (Array.isArray(properties.styleProperty)) ? properties.styleProperty : [properties.styleProperty];
          for (var j = 0, maxStyleP = styles.length; j < maxStyleP; j++) {
            // Some old IE-s have different property name for cssFloat
            prop = wysihtml.browser.fixStyleKey(styles[j]);
            if (node.style[prop]) {
              if (properties.styleValue) {
                // Style value as additional parameter
                if (properties.styleValue instanceof RegExp) {
                  // style value as Regexp
                  if (node.style[prop].trim().match(properties.styleValue).length > 0) {
                    hasOneStyle = true;
                    break;
                  }
                } else if (Array.isArray(properties.styleValue)) {
                  // style value as array
                  if (properties.styleValue.indexOf(node.style[prop].trim())) {
                    hasOneStyle = true;
                    break;
                  }
                } else {
                  // style value as string
                  if (properties.styleValue === node.style[prop].trim().replace(/, /g, ",")) {
                    hasOneStyle = true;
                    break;
                  }
                }
              } else {
                hasOneStyle = true;
                break;
              }
            }
            if (!hasOneStyle) {
              return false;
            }
          }
        }

        if (properties.attribute) {
          var attr = wysihtml.dom.getAttributes(node),
              attrList = [],
              hasOneAttribute = false;

          if (Array.isArray(properties.attribute)) {
            attrList = properties.attribute;
          } else {
            attrList[properties.attribute] = properties.attributeValue;
          }

          for (var a in attrList) {
            if (attrList.hasOwnProperty(a)) {
              if (typeof attrList[a] === "undefined") {
                if (typeof attr[a] !== "undefined") {
                  hasOneAttribute = true;
                  break;
                }
              } else if (attr[a] === attrList[a]) {
                hasOneAttribute = true;
                break;
              }
            }
          }

          if (!hasOneAttribute) {
            return false;
          }

        }

        return true;
      }

    };
  };
})(wysihtml);

/**
 * Returns the given html wrapped in a div element
 *
 * Fixing IE's inability to treat unknown elements (HTML5 section, article, ...) correctly
 * when inserted via innerHTML
 *
 * @param {String} html The html which should be wrapped in a dom element
 * @param {Obejct} [context] Document object of the context the html belongs to
 *
 * @example
 *    wysihtml.dom.getAsDom("<article>foo</article>");
 */
wysihtml.dom.getAsDom = (function() {

  var _innerHTMLShiv = function(html, context) {
    var tempElement = context.createElement("div");
    tempElement.style.display = "none";
    context.body.appendChild(tempElement);
    // IE throws an exception when trying to insert <frameset></frameset> via innerHTML
    try { tempElement.innerHTML = html; } catch(e) {}
    context.body.removeChild(tempElement);
    return tempElement;
  };

  /**
   * Make sure IE supports HTML5 tags, which is accomplished by simply creating one instance of each element
   */
  var _ensureHTML5Compatibility = function(context) {
    if (context._wysihtml_supportsHTML5Tags) {
      return;
    }
    for (var i=0, length=HTML5_ELEMENTS.length; i<length; i++) {
      context.createElement(HTML5_ELEMENTS[i]);
    }
    context._wysihtml_supportsHTML5Tags = true;
  };


  /**
   * List of html5 tags
   * taken from http://simon.html5.org/html5-elements
   */
  var HTML5_ELEMENTS = [
    "abbr", "article", "aside", "audio", "bdi", "canvas", "command", "datalist", "details", "figcaption",
    "figure", "footer", "header", "hgroup", "keygen", "mark", "meter", "nav", "output", "progress",
    "rp", "rt", "ruby", "svg", "section", "source", "summary", "time", "track", "video", "wbr"
  ];

  return function(html, context) {
    context = context || document;
    var tempElement;
    if (typeof(html) === "object" && html.nodeType) {
      tempElement = context.createElement("div");
      tempElement.appendChild(html);
    } else if (wysihtml.browser.supportsHTML5Tags(context)) {
      tempElement = context.createElement("div");
      tempElement.innerHTML = html;
    } else {
      _ensureHTML5Compatibility(context);
      tempElement = _innerHTMLShiv(html, context);
    }
    return tempElement;
  };
})();

/**
 * Get a set of attribute from one element
 *
 * IE gives wrong results for hasAttribute/getAttribute, for example:
 *    var td = document.createElement("td");
 *    td.getAttribute("rowspan"); // => "1" in IE
 *
 * Therefore we have to check the element's outerHTML for the attribute
*/

wysihtml.dom.getAttribute = function(node, attributeName) {
  var HAS_GET_ATTRIBUTE_BUG = !wysihtml.browser.supportsGetAttributeCorrectly();
  attributeName = attributeName.toLowerCase();
  var nodeName = node.nodeName;
  if (nodeName == "IMG" && attributeName == "src" && wysihtml.dom.isLoadedImage(node) === true) {
    // Get 'src' attribute value via object property since this will always contain the
    // full absolute url (http://...)
    // this fixes a very annoying bug in firefox (ver 3.6 & 4) and IE 8 where images copied from the same host
    // will have relative paths, which the sanitizer strips out (see attributeCheckMethods.url)
    return node.src;
  } else if (HAS_GET_ATTRIBUTE_BUG && "outerHTML" in node) {
    // Don't trust getAttribute/hasAttribute in IE 6-8, instead check the element's outerHTML
    var outerHTML      = node.outerHTML.toLowerCase(),
        // TODO: This might not work for attributes without value: <input disabled>
        hasAttribute   = outerHTML.indexOf(" " + attributeName +  "=") != -1;

    return hasAttribute ? node.getAttribute(attributeName) : null;
  } else{
    return node.getAttribute(attributeName);
  }
};

/**
 * Get all attributes of an element
 *
 * IE gives wrong results for hasAttribute/getAttribute, for example:
 *    var td = document.createElement("td");
 *    td.getAttribute("rowspan"); // => "1" in IE
 *
 * Therefore we have to check the element's outerHTML for the attribute
*/

wysihtml.dom.getAttributes = function(node) {
  var HAS_GET_ATTRIBUTE_BUG = !wysihtml.browser.supportsGetAttributeCorrectly(),
      nodeName = node.nodeName,
      attributes = [],
      attr;

  for (attr in node.attributes) {
    if ((node.attributes.hasOwnProperty && node.attributes.hasOwnProperty(attr)) || (!node.attributes.hasOwnProperty && Object.prototype.hasOwnProperty.call(node.attributes, attr)))  {
      if (node.attributes[attr].specified) {
        if (nodeName == "IMG" && node.attributes[attr].name.toLowerCase() == "src" && wysihtml.dom.isLoadedImage(node) === true) {
          attributes['src'] = node.src;
        } else if (wysihtml.lang.array(['rowspan', 'colspan']).contains(node.attributes[attr].name.toLowerCase()) && HAS_GET_ATTRIBUTE_BUG) {
          if (node.attributes[attr].value !== 1) {
            attributes[node.attributes[attr].name] = node.attributes[attr].value;
          }
        } else {
          attributes[node.attributes[attr].name] = node.attributes[attr].value;
        }
      }
    }
  }
  return attributes;
};

/**
 * Walks the dom tree from the given node up until it finds a match
 *
 * @param {Element} node The from which to check the parent nodes
 * @param {Object} matchingSet Object to match against, Properties for filtering element:
 *   {
 *     query: selector string,
 *     classRegExp: regex,
 *     styleProperty: string or [],
 *     styleValue: string, [] or regex
 *   }
 * @param {Number} [levels] How many parents should the function check up from the current node (defaults to 50)
 * @param {Element} Optional, defines the container that limits the search
 *
 * @return {null|Element} Returns the first element that matched the desiredNodeName(s)
*/

wysihtml.dom.getParentElement = (function() {

  return function(node, properties, levels, container) {
    levels = levels || 50;
    while (levels-- && node && node.nodeName !== "BODY" && (!container || node !== container)) {
      if (wysihtml.dom.domNode(node).test(properties)) {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  };

})();

/* 
 * Methods for fetching pasted html before it gets inserted into content
**/

/* Modern event.clipboardData driven approach.
 * Advantage is that it does not have to loose selection or modify dom to catch the data. 
 * IE does not support though.
**/
wysihtml.dom.getPastedHtml = function(event) {
  var html;
  if (wysihtml.browser.supportsModernPaste() && event.clipboardData) {
    if (wysihtml.lang.array(event.clipboardData.types).contains('text/html')) {
      html = event.clipboardData.getData('text/html');
    } else if (wysihtml.lang.array(event.clipboardData.types).contains('text/plain')) {
      html = wysihtml.lang.string(event.clipboardData.getData('text/plain')).escapeHTML(true, true);
    }
  }
  return html;
};

/* Older temprorary contenteditable as paste source catcher method for fallbacks */
wysihtml.dom.getPastedHtmlWithDiv = function (composer, f) {
  var selBookmark = composer.selection.getBookmark(),
      doc = composer.element.ownerDocument,
      cleanerDiv = doc.createElement('DIV'),
      scrollPos = composer.getScrollPos();
  
  doc.body.appendChild(cleanerDiv);

  cleanerDiv.style.width = "1px";
  cleanerDiv.style.height = "1px";
  cleanerDiv.style.overflow = "hidden";
  cleanerDiv.style.position = "absolute";
  cleanerDiv.style.top = scrollPos.y + "px";
  cleanerDiv.style.left = scrollPos.x + "px";

  cleanerDiv.setAttribute('contenteditable', 'true');
  cleanerDiv.focus();

  setTimeout(function () {
    var html;

    composer.selection.setBookmark(selBookmark);
    html = cleanerDiv.innerHTML;
    if (html && (/^<br\/?>$/i).test(html.trim())) {
      html = false;
    }
    f(html);
    cleanerDiv.parentNode.removeChild(cleanerDiv);
  }, 0);
};

/**
 * Get element's style for a specific css property
 *
 * @param {Element} element The element on which to retrieve the style
 * @param {String} property The CSS property to retrieve ("float", "display", "text-align", ...)
 *
 * @example
 *    wysihtml.dom.getStyle("display").from(document.body);
 *    // => "block"
 */
wysihtml.dom.getStyle = (function() {
  var stylePropertyMapping = {
        "float": ("styleFloat" in document.createElement("div").style) ? "styleFloat" : "cssFloat"
      },
      REG_EXP_CAMELIZE = /\-[a-z]/g;

  function camelize(str) {
    return str.replace(REG_EXP_CAMELIZE, function(match) {
      return match.charAt(1).toUpperCase();
    });
  }

  return function(property) {
    return {
      from: function(element) {
        if (element.nodeType !== wysihtml.ELEMENT_NODE) {
          return;
        }

        var doc               = element.ownerDocument,
            camelizedProperty = stylePropertyMapping[property] || camelize(property),
            style             = element.style,
            currentStyle      = element.currentStyle,
            styleValue        = style[camelizedProperty];
        if (styleValue) {
          return styleValue;
        }

        // currentStyle is no standard and only supported by Opera and IE but it has one important advantage over the standard-compliant
        // window.getComputedStyle, since it returns css property values in their original unit:
        // If you set an elements width to "50%", window.getComputedStyle will give you it's current width in px while currentStyle
        // gives you the original "50%".
        // Opera supports both, currentStyle and window.getComputedStyle, that's why checking for currentStyle should have higher prio
        if (currentStyle) {
          try {
            return currentStyle[camelizedProperty];
          } catch(e) {
            //ie will occasionally fail for unknown reasons. swallowing exception
          }
        }

        var win                 = doc.defaultView || doc.parentWindow,
            needsOverflowReset  = (property === "height" || property === "width") && element.nodeName === "TEXTAREA",
            originalOverflow,
            returnValue;

        if (win.getComputedStyle) {
          // Chrome and Safari both calculate a wrong width and height for textareas when they have scroll bars
          // therfore we remove and restore the scrollbar and calculate the value in between
          if (needsOverflowReset) {
            originalOverflow = style.overflow;
            style.overflow = "hidden";
          }
          returnValue = win.getComputedStyle(element, null).getPropertyValue(property);
          if (needsOverflowReset) {
            style.overflow = originalOverflow || "";
          }
          return returnValue;
        }
      }
    };
  };
})();

wysihtml.dom.getTextNodes = function(node, ingoreEmpty){
  var all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType == 3) {
      if (!ingoreEmpty || !(/^\s*$/).test(node.innerText || node.textContent)) {
        all.push(node);
      }
    } else {
      all = all.concat(wysihtml.dom.getTextNodes(node, ingoreEmpty));
    }
  }
  return all;
};

/**
 * High performant way to check whether an element with a specific class name is in the given document
 * Optimized for being heavily executed
 * Unleashes the power of live node lists
 *
 * @param {Object} doc The document object of the context where to check
 * @param {String} tagName Upper cased tag name
 * @example
 *    wysihtml.dom.hasElementWithClassName(document, "foobar");
 */
(function(wysihtml) {
  var LIVE_CACHE          = {},
      DOCUMENT_IDENTIFIER = 1;

  function _getDocumentIdentifier(doc) {
    return doc._wysihtml_identifier || (doc._wysihtml_identifier = DOCUMENT_IDENTIFIER++);
  }

  wysihtml.dom.hasElementWithClassName = function(doc, className) {
    // getElementsByClassName is not supported by IE<9
    // but is sometimes mocked via library code (which then doesn't return live node lists)
    if (!wysihtml.browser.supportsNativeGetElementsByClassName()) {
      return !!doc.querySelector("." + className);
    }

    var key         = _getDocumentIdentifier(doc) + ":" + className,
        cacheEntry  = LIVE_CACHE[key];
    if (!cacheEntry) {
      cacheEntry = LIVE_CACHE[key] = doc.getElementsByClassName(className);
    }

    return cacheEntry.length > 0;
  };
})(wysihtml);

/**
 * High performant way to check whether an element with a specific tag name is in the given document
 * Optimized for being heavily executed
 * Unleashes the power of live node lists
 *
 * @param {Object} doc The document object of the context where to check
 * @param {String} tagName Upper cased tag name
 * @example
 *    wysihtml.dom.hasElementWithTagName(document, "IMG");
 */
wysihtml.dom.hasElementWithTagName = (function() {
  var LIVE_CACHE          = {},
      DOCUMENT_IDENTIFIER = 1;

  function _getDocumentIdentifier(doc) {
    return doc._wysihtml_identifier || (doc._wysihtml_identifier = DOCUMENT_IDENTIFIER++);
  }

  return function(doc, tagName) {
    var key         = _getDocumentIdentifier(doc) + ":" + tagName,
        cacheEntry  = LIVE_CACHE[key];
    if (!cacheEntry) {
      cacheEntry = LIVE_CACHE[key] = doc.getElementsByTagName(tagName);
    }

    return cacheEntry.length > 0;
  };
})();

wysihtml.dom.insert = function(elementToInsert) {
  return {
    after: function(element) {
      element.parentNode.insertBefore(elementToInsert, element.nextSibling);
    },

    before: function(element) {
      element.parentNode.insertBefore(elementToInsert, element);
    },

    into: function(element) {
      element.appendChild(elementToInsert);
    }
  };
};

wysihtml.dom.insertCSS = function(rules) {
  rules = rules.join("\n");

  return {
    into: function(doc) {
      var styleElement = doc.createElement("style");
      styleElement.type = "text/css";

      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = rules;
      } else {
        styleElement.appendChild(doc.createTextNode(rules));
      }

      var link = doc.querySelector("head link");
      if (link) {
        link.parentNode.insertBefore(styleElement, link);
        return;
      } else {
        var head = doc.querySelector("head");
        if (head) {
          head.appendChild(styleElement);
        }
      }
    }
  };
};

/**
   * Check whether the given node is a proper loaded image
   * FIXME: Returns undefined when unknown (Chrome, Safari)
*/

wysihtml.dom.isLoadedImage = function (node) {
  try {
    return node.complete && !node.mozMatchesSelector(":-moz-broken");
  } catch(e) {
    if (node.complete && node.readyState === "complete") {
      return true;
    }
  }
};

// TODO: Refactor dom tree traversing here
(function(wysihtml) {
  wysihtml.dom.lineBreaks = function(node) {

    function _isLineBreak(n) {
      return n.nodeName === "BR";
    }

    /**
     * Checks whether the elment causes a visual line break
     * (<br> or block elements)
     */
    function _isLineBreakOrBlockElement(element) {
      if (_isLineBreak(element)) {
        return true;
      }

      if (wysihtml.dom.getStyle("display").from(element) === "block") {
        return true;
      }

      return false;
    }

    return {

      /* wysihtml.dom.lineBreaks(element).add();
       *
       * Adds line breaks before and after the given node if the previous and next siblings
       * aren't already causing a visual line break (block element or <br>)
       */
      add: function(options) {
        var doc             = node.ownerDocument,
          nextSibling     = wysihtml.dom.domNode(node).next({ignoreBlankTexts: true}),
          previousSibling = wysihtml.dom.domNode(node).prev({ignoreBlankTexts: true});

        if (nextSibling && !_isLineBreakOrBlockElement(nextSibling)) {
          wysihtml.dom.insert(doc.createElement("br")).after(node);
        }
        if (previousSibling && !_isLineBreakOrBlockElement(previousSibling)) {
          wysihtml.dom.insert(doc.createElement("br")).before(node);
        }
      },

      /* wysihtml.dom.lineBreaks(element).remove();
       *
       * Removes line breaks before and after the given node
       */
      remove: function(options) {
        var nextSibling     = wysihtml.dom.domNode(node).next({ignoreBlankTexts: true}),
            previousSibling = wysihtml.dom.domNode(node).prev({ignoreBlankTexts: true});

        if (nextSibling && _isLineBreak(nextSibling)) {
          nextSibling.parentNode.removeChild(nextSibling);
        }
        if (previousSibling && _isLineBreak(previousSibling)) {
          previousSibling.parentNode.removeChild(previousSibling);
        }
      }
    };
  };
})(wysihtml);
/**
 * Method to set dom events
 *
 * @example
 *    wysihtml.dom.observe(iframe.contentWindow.document.body, ["focus", "blur"], function() { ... });
 */
wysihtml.dom.observe = function(element, eventNames, handler) {
  eventNames = typeof(eventNames) === "string" ? [eventNames] : eventNames;

  var handlerWrapper,
      eventName,
      i       = 0,
      length  = eventNames.length;

  for (; i<length; i++) {
    eventName = eventNames[i];
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, false);
    } else {
      handlerWrapper = function(event) {
        if (!("target" in event)) {
          event.target = event.srcElement;
        }
        event.preventDefault = event.preventDefault || function() {
          this.returnValue = false;
        };
        event.stopPropagation = event.stopPropagation || function() {
          this.cancelBubble = true;
        };
        handler.call(element, event);
      };
      element.attachEvent("on" + eventName, handlerWrapper);
    }
  }

  return {
    stop: function() {
      var eventName,
          i       = 0,
          length  = eventNames.length;
      for (; i<length; i++) {
        eventName = eventNames[i];
        if (element.removeEventListener) {
          element.removeEventListener(eventName, handler, false);
        } else {
          element.detachEvent("on" + eventName, handlerWrapper);
        }
      }
    }
  };
};

/**
 * HTML Sanitizer
 * Rewrites the HTML based on given rules
 *
 * @param {Element|String} elementOrHtml HTML String to be sanitized OR element whose content should be sanitized
 * @param {Object} [rules] List of rules for rewriting the HTML, if there's no rule for an element it will
 *    be converted to a "span". Each rule is a key/value pair where key is the tag to convert, and value the
 *    desired substitution.
 * @param {Object} context Document object in which to parse the html, needed to sandbox the parsing
 *
 * @return {Element|String} Depends on the elementOrHtml parameter. When html then the sanitized html as string elsewise the element.
 *
 * @example
 *    var userHTML = '<div id="foo" onclick="alert(1);"><p><font color="red">foo</font><script>alert(1);</script></p></div>';
 *    wysihtml.dom.parse(userHTML, {
 *      tags {
 *        p:      "div",      // Rename p tags to div tags
 *        font:   "span"      // Rename font tags to span tags
 *        div:    true,       // Keep them, also possible (same result when passing: "div" or true)
 *        script: undefined   // Remove script elements
 *      }
 *    });
 *    // => <div><div><span>foo bar</span></div></div>
 *
 *    var userHTML = '<table><tbody><tr><td>I'm a table!</td></tr></tbody></table>';
 *    wysihtml.dom.parse(userHTML);
 *    // => '<span><span><span><span>I'm a table!</span></span></span></span>'
 *
 *    var userHTML = '<div>foobar<br>foobar</div>';
 *    wysihtml.dom.parse(userHTML, {
 *      tags: {
 *        div: undefined,
 *        br:  true
 *      }
 *    });
 *    // => ''
 *
 *    var userHTML = '<div class="red">foo</div><div class="pink">bar</div>';
 *    wysihtml.dom.parse(userHTML, {
 *      classes: {
 *        red:    1,
 *        green:  1
 *      },
 *      tags: {
 *        div: {
 *          rename_tag:     "p"
 *        }
 *      }
 *    });
 *    // => '<p class="red">foo</p><p>bar</p>'
 */

wysihtml.dom.parse = function(elementOrHtml_current, config_current) {
  /* TODO: Currently escaped module pattern as otherwise folloowing default swill be shared among multiple editors.
   * Refactor whole code as this method while workind is kind of awkward too */

  /**
   * It's not possible to use a XMLParser/DOMParser as HTML5 is not always well-formed XML
   * new DOMParser().parseFromString('<img src="foo.gif">') will cause a parseError since the
   * node isn't closed
   *
   * Therefore we've to use the browser's ordinary HTML parser invoked by setting innerHTML.
   */
  var NODE_TYPE_MAPPING = {
        "1": _handleElement,
        "3": _handleText,
        "8": _handleComment
      },
      // Rename unknown tags to this
      DEFAULT_NODE_NAME   = "span",
      WHITE_SPACE_REG_EXP = /\s+/,
      defaultRules        = { tags: {}, classes: {} },
      currentRules        = {},
      blockElements       = ["ADDRESS" ,"BLOCKQUOTE" ,"CENTER" ,"DIR" ,"DIV" ,"DL" ,"FIELDSET" ,
                             "FORM", "H1" ,"H2" ,"H3" ,"H4" ,"H5" ,"H6" ,"ISINDEX" ,"MENU",
                             "NOFRAMES", "NOSCRIPT" ,"OL" ,"P" ,"PRE","TABLE", "UL"];

  /**
   * Iterates over all childs of the element, recreates them, appends them into a document fragment
   * which later replaces the entire body content
   */
   function parse(elementOrHtml, config) {
    wysihtml.lang.object(currentRules).merge(defaultRules).merge(config.rules).get();

    var context       = config.context || elementOrHtml.ownerDocument || document,
        fragment      = context.createDocumentFragment(),
        isString      = typeof(elementOrHtml) === "string",
        clearInternals = false,
        element,
        newNode,
        firstChild;

    if (config.clearInternals === true) {
      clearInternals = true;
    }

    if (isString) {
      element = wysihtml.dom.getAsDom(elementOrHtml, context);
    } else {
      element = elementOrHtml;
    }

    if (currentRules.selectors) {
      _applySelectorRules(element, currentRules.selectors);
    }

    while (element.firstChild) {
      firstChild = element.firstChild;
      newNode = _convert(firstChild, config.cleanUp, clearInternals, config.uneditableClass);
      if (newNode) {
        fragment.appendChild(newNode);
      }
      if (firstChild !== newNode) {
        element.removeChild(firstChild);
      }
    }

    if (config.unjoinNbsps) {
      // replace joined non-breakable spaces with unjoined
      var txtnodes = wysihtml.dom.getTextNodes(fragment);
      for (var n = txtnodes.length; n--;) {
        txtnodes[n].nodeValue = txtnodes[n].nodeValue.replace(/([\S\u00A0])\u00A0/gi, "$1 ");
      }
    }

    // Clear element contents
    element.innerHTML = "";

    // Insert new DOM tree
    element.appendChild(fragment);

    return isString ? wysihtml.quirks.getCorrectInnerHTML(element) : element;
  }

  function _convert(oldNode, cleanUp, clearInternals, uneditableClass) {
    var oldNodeType     = oldNode.nodeType,
        oldChilds       = oldNode.childNodes,
        oldChildsLength = oldChilds.length,
        method          = NODE_TYPE_MAPPING[oldNodeType],
        i               = 0,
        fragment,
        newNode,
        newChild,
        nodeDisplay;

    // Passes directly elemets with uneditable class
    if (uneditableClass && oldNodeType === 1 && wysihtml.dom.hasClass(oldNode, uneditableClass)) {
        return oldNode;
    }

    newNode = method && method(oldNode, clearInternals);

    // Remove or unwrap node in case of return value null or false
    if (!newNode) {
        if (newNode === false) {
            // false defines that tag should be removed but contents should remain (unwrap)
            fragment = oldNode.ownerDocument.createDocumentFragment();

            for (i = oldChildsLength; i--;) {
              if (oldChilds[i]) {
                newChild = _convert(oldChilds[i], cleanUp, clearInternals, uneditableClass);
                if (newChild) {
                  if (oldChilds[i] === newChild) {
                    i--;
                  }
                  fragment.insertBefore(newChild, fragment.firstChild);
                }
              }
            }

            nodeDisplay = wysihtml.dom.getStyle("display").from(oldNode);

            if (nodeDisplay === '') {
              // Handle display style when element not in dom
              nodeDisplay = wysihtml.lang.array(blockElements).contains(oldNode.tagName) ? "block" : "";
            }
            if (wysihtml.lang.array(["block", "flex", "table"]).contains(nodeDisplay)) {
              fragment.appendChild(oldNode.ownerDocument.createElement("br"));
            }

            // TODO: try to minimize surplus spaces
            if (wysihtml.lang.array([
                "div", "pre", "p",
                "table", "td", "th",
                "ul", "ol", "li",
                "dd", "dl",
                "footer", "header", "section",
                "h1", "h2", "h3", "h4", "h5", "h6"
            ]).contains(oldNode.nodeName.toLowerCase()) && oldNode.parentNode.lastChild !== oldNode) {
                // add space at first when unwraping non-textflow elements
                if (!oldNode.nextSibling || oldNode.nextSibling.nodeType !== 3 || !(/^\s/).test(oldNode.nextSibling.nodeValue)) {
                  fragment.appendChild(oldNode.ownerDocument.createTextNode(" "));
                }
            }

            if (fragment.normalize) {
              fragment.normalize();
            }
            return fragment;
        } else {
          // Remove
          return null;
        }
    }

    // Converts all childnodes
    for (i=0; i<oldChildsLength; i++) {
      if (oldChilds[i]) {
        newChild = _convert(oldChilds[i], cleanUp, clearInternals, uneditableClass);
        if (newChild) {
          if (oldChilds[i] === newChild) {
            i--;
          }
          newNode.appendChild(newChild);
        }
      }
    }

    // Cleanup senseless <span> elements
    if (cleanUp &&
        newNode.nodeName.toLowerCase() === DEFAULT_NODE_NAME &&
        (!newNode.childNodes.length ||
         ((/^\s*$/gi).test(newNode.innerHTML) && (clearInternals || (oldNode.className !== "_wysihtml-temp-placeholder" && oldNode.className !== "rangySelectionBoundary"))) ||
         !newNode.attributes.length)
        ) {
      fragment = newNode.ownerDocument.createDocumentFragment();
      while (newNode.firstChild) {
        fragment.appendChild(newNode.firstChild);
      }
      if (fragment.normalize) {
        fragment.normalize();
      }
      return fragment;
    }

    if (newNode.normalize) {
      newNode.normalize();
    }
    return newNode;
  }

  function _applySelectorRules (element, selectorRules) {
    var sel, method, els;

    for (sel in selectorRules) {
      if (selectorRules.hasOwnProperty(sel)) {
        if (wysihtml.lang.object(selectorRules[sel]).isFunction()) {
          method = selectorRules[sel];
        } else if (typeof(selectorRules[sel]) === "string" && elementHandlingMethods[selectorRules[sel]]) {
          method = elementHandlingMethods[selectorRules[sel]];
        }
        els = element.querySelectorAll(sel);
        for (var i = els.length; i--;) {
          method(els[i]);
        }
      }
    }
  }

  function _handleElement(oldNode, clearInternals) {
    var rule,
        newNode,
        tagRules    = currentRules.tags,
        nodeName    = oldNode.nodeName.toLowerCase(),
        scopeName   = oldNode.scopeName,
        renameTag;

    /**
     * We already parsed that element
     * ignore it! (yes, this sometimes happens in IE8 when the html is invalid)
     */
    if (oldNode._wysihtml) {
      return null;
    }
    oldNode._wysihtml = 1;

    if (oldNode.className === "wysihtml-temp") {
      return null;
    }

    /**
     * IE is the only browser who doesn't include the namespace in the
     * nodeName, that's why we have to prepend it by ourselves
     * scopeName is a proprietary IE feature
     * read more here http://msdn.microsoft.com/en-us/library/ms534388(v=vs.85).aspx
     */
    if (scopeName && scopeName != "HTML") {
      nodeName = scopeName + ":" + nodeName;
    }
    /**
     * Repair node
     * IE is a bit bitchy when it comes to invalid nested markup which includes unclosed tags
     * A <p> doesn't need to be closed according HTML4-5 spec, we simply replace it with a <div> to preserve its content and layout
     */
    if ("outerHTML" in oldNode) {
      if (!wysihtml.browser.autoClosesUnclosedTags() &&
          oldNode.nodeName === "P" &&
          oldNode.outerHTML.slice(-4).toLowerCase() !== "</p>") {
        nodeName = "div";
      }
    }

    if (nodeName in tagRules) {
      rule = tagRules[nodeName];
      if (!rule || rule.remove) {
        return null;
      } else if (rule.unwrap) {
        return false;
      }
      rule = typeof(rule) === "string" ? { rename_tag: rule } : rule;
    } else if (oldNode.firstChild) {
      rule = { rename_tag: DEFAULT_NODE_NAME };
    } else {
      // Remove empty unknown elements
      return null;
    }

    // tests if type condition is met or node should be removed/unwrapped/renamed
    if (rule.one_of_type && !_testTypes(oldNode, currentRules, rule.one_of_type, clearInternals)) {
      if (rule.remove_action) {
        if (rule.remove_action === "unwrap") {
          return false;
        } else if (rule.remove_action === "rename") {
          renameTag = rule.remove_action_rename_to || DEFAULT_NODE_NAME;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    newNode = oldNode.ownerDocument.createElement(renameTag || rule.rename_tag || nodeName);
    _handleAttributes(oldNode, newNode, rule, clearInternals);
    _handleStyles(oldNode, newNode, rule);

    oldNode = null;

    if (newNode.normalize) { newNode.normalize(); }
    return newNode;
  }

  function _testTypes(oldNode, rules, types, clearInternals) {
    var definition, type;

    // do not interfere with placeholder span or pasting caret position is not maintained
    if (oldNode.nodeName === "SPAN" && !clearInternals && (oldNode.className === "_wysihtml-temp-placeholder" || oldNode.className === "rangySelectionBoundary")) {
      return true;
    }

    for (type in types) {
      if (types.hasOwnProperty(type) && rules.type_definitions && rules.type_definitions[type]) {
        definition = rules.type_definitions[type];
        if (_testType(oldNode, definition)) {
          return true;
        }
      }
    }
    return false;
  }

  function array_contains(a, obj) {
      var i = a.length;
      while (i--) {
         if (a[i] === obj) {
             return true;
         }
      }
      return false;
  }

  function _testType(oldNode, definition) {

    var nodeClasses = oldNode.getAttribute("class"),
        nodeStyles =  oldNode.getAttribute("style"),
        classesLength, s, s_corrected, a, attr, currentClass, styleProp;

    // test for methods
    if (definition.methods) {
      for (var m in definition.methods) {
        if (definition.methods.hasOwnProperty(m) && typeCeckMethods[m]) {

          if (typeCeckMethods[m](oldNode)) {
            return true;
          }
        }
      }
    }

    // test for classes, if one found return true
    if (nodeClasses && definition.classes) {
      nodeClasses = nodeClasses.replace(/^\s+/g, '').replace(/\s+$/g, '').split(WHITE_SPACE_REG_EXP);
      classesLength = nodeClasses.length;
      for (var i = 0; i < classesLength; i++) {
        if (definition.classes[nodeClasses[i]]) {
          return true;
        }
      }
    }

    // test for styles, if one found return true
    if (nodeStyles && definition.styles) {

      nodeStyles = nodeStyles.split(';');
      for (s in definition.styles) {
        if (definition.styles.hasOwnProperty(s)) {
          for (var sp = nodeStyles.length; sp--;) {
            styleProp = nodeStyles[sp].split(':');

            if (styleProp[0].replace(/\s/g, '').toLowerCase() === s) {
              if (definition.styles[s] === true || definition.styles[s] === 1 || wysihtml.lang.array(definition.styles[s]).contains(styleProp[1].replace(/\s/g, '').toLowerCase()) ) {
                return true;
              }
            }
          }
        }
      }
    }

    // test for attributes in general against regex match
    if (definition.attrs) {
        for (a in definition.attrs) {
            if (definition.attrs.hasOwnProperty(a)) {
                attr = wysihtml.dom.getAttribute(oldNode, a);
                if (typeof(attr) === "string") {
                    if (attr.search(definition.attrs[a]) > -1) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
  }

  function _handleStyles(oldNode, newNode, rule) {
    var s, v;
    if(rule && rule.keep_styles) {
      for (s in rule.keep_styles) {
        if (rule.keep_styles.hasOwnProperty(s)) {
          v = (s === "float") ? oldNode.style.styleFloat || oldNode.style.cssFloat : oldNode.style[s];
          // value can be regex and if so should match or style skipped
          if (rule.keep_styles[s] instanceof RegExp && !(rule.keep_styles[s].test(v))) {
            continue;
          }
          if (s === "float") {
            // IE compability
            newNode.style[(oldNode.style.styleFloat) ? 'styleFloat': 'cssFloat'] = v;
           } else if (oldNode.style[s]) {
             newNode.style[s] = v;
           }
        }
      }
    }
  };

  function _getAttributesBeginningWith(beginning, attributes) {
    var returnAttributes = [];
    for (var attr in attributes) {
      if (attributes.hasOwnProperty(attr) && attr.indexOf(beginning) === 0) {
        returnAttributes.push(attr);
      }
    }
    return returnAttributes;
  }

  function _checkAttribute(attributeName, attributeValue, methodName, nodeName) {
    var method = wysihtml.lang.object(methodName).isFunction() ? methodName : attributeCheckMethods[methodName],
        newAttributeValue;

    if (method) {
      newAttributeValue = method(attributeValue, nodeName);
      if (typeof(newAttributeValue) === "string") {
        return newAttributeValue;
      }
    }

    return false;
  }

  function _checkAttributes(oldNode, local_attributes) {
    var globalAttributes  = wysihtml.lang.object(currentRules.attributes || {}).clone(), // global values for check/convert values of attributes
        checkAttributes   = wysihtml.lang.object(globalAttributes).merge( wysihtml.lang.object(local_attributes || {}).clone()).get(),
        attributes        = {},
        oldAttributes     = wysihtml.dom.getAttributes(oldNode),
        attributeName, newValue, matchingAttributes;

    for (attributeName in checkAttributes) {
      if ((/\*$/).test(attributeName)) {

        matchingAttributes = _getAttributesBeginningWith(attributeName.slice(0,-1), oldAttributes);
        for (var i = 0, imax = matchingAttributes.length; i < imax; i++) {

          newValue = _checkAttribute(matchingAttributes[i], oldAttributes[matchingAttributes[i]], checkAttributes[attributeName], oldNode.nodeName);
          if (newValue !== false) {
            attributes[matchingAttributes[i]] = newValue;
          }
        }
      } else {
        newValue = _checkAttribute(attributeName, oldAttributes[attributeName], checkAttributes[attributeName], oldNode.nodeName);
        if (newValue !== false) {
          attributes[attributeName] = newValue;
        }
      }
    }

    return attributes;
  }

  // TODO: refactor. Too long to read
  function _handleAttributes(oldNode, newNode, rule, clearInternals) {
    var attributes          = {},                         // fresh new set of attributes to set on newNode
        setClass            = rule.set_class,             // classes to set
        addClass            = rule.add_class,             // add classes based on existing attributes
        addStyle            = rule.add_style,             // add styles based on existing attributes
        setAttributes       = rule.set_attributes,        // attributes to set on the current node
        allowedClasses      = currentRules.classes,
        i                   = 0,
        classes             = [],
        styles              = [],
        newClasses          = [],
        oldClasses          = [],
        classesLength,
        newClassesLength,
        currentClass,
        newClass,
        attributeName,
        method;

    if (setAttributes) {
      attributes = wysihtml.lang.object(setAttributes).clone();
    }

    // check/convert values of attributes
    attributes = wysihtml.lang.object(attributes).merge(_checkAttributes(oldNode,  rule.check_attributes)).get();

    if (setClass) {
      classes.push(setClass);
    }

    if (addClass) {
      for (attributeName in addClass) {
        method = addClassMethods[addClass[attributeName]];
        if (!method) {
          continue;
        }
        newClass = method(wysihtml.dom.getAttribute(oldNode, attributeName));
        if (typeof(newClass) === "string") {
          classes.push(newClass);
        }
      }
    }

    if (addStyle) {
      for (attributeName in addStyle) {
        method = addStyleMethods[addStyle[attributeName]];
        if (!method) {
          continue;
        }

        newStyle = method(wysihtml.dom.getAttribute(oldNode, attributeName));
        if (typeof(newStyle) === "string") {
          styles.push(newStyle);
        }
      }
    }


    if (typeof(allowedClasses) === "string" && allowedClasses === "any") {
      if (oldNode.getAttribute("class")) {
        if (currentRules.classes_blacklist) {
          oldClasses = oldNode.getAttribute("class");
          if (oldClasses) {
            classes = classes.concat(oldClasses.split(WHITE_SPACE_REG_EXP));
          }

          classesLength = classes.length;
          for (; i<classesLength; i++) {
            currentClass = classes[i];
            if (!currentRules.classes_blacklist[currentClass]) {
              newClasses.push(currentClass);
            }
          }

          if (newClasses.length) {
            attributes["class"] = wysihtml.lang.array(newClasses).unique().join(" ");
          }

        } else {
          attributes["class"] = oldNode.getAttribute("class");
        }
      } else {
        if(classes && classes.length > 0) {
          attributes["class"] = wysihtml.lang.array(classes).unique().join(" ");
        }
      }
    } else {
      // make sure that wysihtml temp class doesn't get stripped out
      if (!clearInternals) {
        allowedClasses["_wysihtml-temp-placeholder"] = 1;
        allowedClasses["_rangySelectionBoundary"] = 1;
        allowedClasses["wysiwyg-tmp-selected-cell"] = 1;
      }

      // add old classes last
      oldClasses = oldNode.getAttribute("class");
      if (oldClasses) {
        classes = classes.concat(oldClasses.split(WHITE_SPACE_REG_EXP));
      }
      classesLength = classes.length;
      for (; i<classesLength; i++) {
        currentClass = classes[i];
        if (allowedClasses[currentClass]) {
          newClasses.push(currentClass);
        }
      }

      if (newClasses.length) {
        attributes["class"] = wysihtml.lang.array(newClasses).unique().join(" ");
      }
    }

    // remove table selection class if present
    if (attributes["class"] && clearInternals) {
      attributes["class"] = attributes["class"].replace("wysiwyg-tmp-selected-cell", "");
      if ((/^\s*$/g).test(attributes["class"])) {
        delete attributes["class"];
      }
    }

    if (styles.length) {
      attributes["style"] = wysihtml.lang.array(styles).unique().join(" ");
    }

    // set attributes on newNode
    for (attributeName in attributes) {
      // Setting attributes can cause a js error in IE under certain circumstances
      // eg. on a <img> under https when it's new attribute value is non-https
      // TODO: Investigate this further and check for smarter handling
      try {
        newNode.setAttribute(attributeName, attributes[attributeName]);
      } catch(e) {}
    }

    // IE8 sometimes loses the width/height attributes when those are set before the "src"
    // so we make sure to set them again
    if (attributes.src) {
      if (typeof(attributes.width) !== "undefined") {
        newNode.setAttribute("width", attributes.width);
      }
      if (typeof(attributes.height) !== "undefined") {
        newNode.setAttribute("height", attributes.height);
      }
    }
  }

  function _handleText(oldNode) {
    var nextSibling = oldNode.nextSibling;
    if (nextSibling && nextSibling.nodeType === wysihtml.TEXT_NODE) {
      // Concatenate text nodes
      nextSibling.data = oldNode.data.replace(wysihtml.INVISIBLE_SPACE_REG_EXP, "") + nextSibling.data.replace(wysihtml.INVISIBLE_SPACE_REG_EXP, "");
    } else {
      // \uFEFF = wysihtml.INVISIBLE_SPACE (used as a hack in certain rich text editing situations)
      var data = oldNode.data.replace(wysihtml.INVISIBLE_SPACE_REG_EXP, "");
      return oldNode.ownerDocument.createTextNode(data);
    }
  }

  function _handleComment(oldNode) {
    if (currentRules.comments) {
      return oldNode.ownerDocument.createComment(oldNode.nodeValue);
    }
  }

  // ------------ attribute checks ------------ \\
  var attributeCheckMethods = {
    url: (function() {
      var REG_EXP = /^https?:\/\//i;
      return function(attributeValue) {
        if (!attributeValue || !attributeValue.match(REG_EXP)) {
          return null;
        }
        return attributeValue.replace(REG_EXP, function(match) {
          return match.toLowerCase();
        });
      };
    })(),

    src: (function() {
      var REG_EXP = /^(\/|https?:\/\/)/i;
      return function(attributeValue) {
        if (!attributeValue || !attributeValue.match(REG_EXP)) {
          return null;
        }
        return attributeValue.replace(REG_EXP, function(match) {
          return match.toLowerCase();
        });
      };
    })(),

    href: (function() {
      var REG_EXP = /^(#|\/|https?:\/\/|mailto:|tel:)/i;
      return function(attributeValue) {
        if (!attributeValue || !attributeValue.match(REG_EXP)) {
          return null;
        }
        return attributeValue.replace(REG_EXP, function(match) {
          return match.toLowerCase();
        });
      };
    })(),

    alt: (function() {
      var REG_EXP = /[^ a-z0-9_\-]/gi;
      return function(attributeValue, nodeName) {
        if (!attributeValue) {
          if (nodeName === "IMG") {
            return "";
          } else {
            return null;
          }
        }
        return attributeValue.replace(REG_EXP, "");
      };
    })(),

    // Integers. Does not work with floating point numbers and units
    numbers: (function() {
      var REG_EXP = /\D/g;
      return function(attributeValue) {
        attributeValue = (attributeValue || "").replace(REG_EXP, "");
        return attributeValue || null;
      };
    })(),

    // Useful for with/height attributes where floating points and percentages are allowed
    dimension: (function() {
      var REG_EXP = /\D*(\d+)(\.\d+)?\s?(%)?\D*/;
      return function(attributeValue) {
        attributeValue = (attributeValue || "").replace(REG_EXP, "$1$2$3");
        return attributeValue || null;
      };
    })(),

    any: (function() {
      return function(attributeValue) {
        if (!attributeValue) {
          return null;
        }
        return attributeValue;
      };
    })()
  };

  // ------------ style converter (converts an html attribute to a style) ------------ \\
  var addStyleMethods = {
    align_text: (function() {
      var mapping = {
        left:     "text-align: left;",
        right:    "text-align: right;",
        center:   "text-align: center;"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),
  };

  // ------------ class converter (converts an html attribute to a class name) ------------ \\
  var addClassMethods = {
    align_img: (function() {
      var mapping = {
        left:   "wysiwyg-float-left",
        right:  "wysiwyg-float-right"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),

    align_text: (function() {
      var mapping = {
        left:     "wysiwyg-text-align-left",
        right:    "wysiwyg-text-align-right",
        center:   "wysiwyg-text-align-center",
        justify:  "wysiwyg-text-align-justify"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),

    clear_br: (function() {
      var mapping = {
        left:   "wysiwyg-clear-left",
        right:  "wysiwyg-clear-right",
        both:   "wysiwyg-clear-both",
        all:    "wysiwyg-clear-both"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),

    size_font: (function() {
      var mapping = {
        "1": "wysiwyg-font-size-xx-small",
        "2": "wysiwyg-font-size-small",
        "3": "wysiwyg-font-size-medium",
        "4": "wysiwyg-font-size-large",
        "5": "wysiwyg-font-size-x-large",
        "6": "wysiwyg-font-size-xx-large",
        "7": "wysiwyg-font-size-xx-large",
        "-": "wysiwyg-font-size-smaller",
        "+": "wysiwyg-font-size-larger"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).charAt(0)];
      };
    })()
  };

  // checks if element is possibly visible
  var typeCeckMethods = {
    has_visible_contet: (function() {
      var txt,
          isVisible = false,
          visibleElements = ['img', 'video', 'picture', 'br', 'script', 'noscript',
                             'style', 'table', 'iframe', 'object', 'embed', 'audio',
                             'svg', 'input', 'button', 'select','textarea', 'canvas'];

      return function(el) {

        // has visible innertext. so is visible
        txt = (el.innerText || el.textContent).replace(/\s/g, '');
        if (txt && txt.length > 0) {
          return true;
        }

        // matches list of visible dimensioned elements
        for (var i = visibleElements.length; i--;) {
          if (el.querySelector(visibleElements[i])) {
            return true;
          }
        }

        // try to measure dimesions in last resort. (can find only of elements in dom)
        if (el.offsetWidth && el.offsetWidth > 0 && el.offsetHeight && el.offsetHeight > 0) {
          return true;
        }

        return false;
      };
    })()
  };

  var elementHandlingMethods = {
    unwrap: function (element) {
      wysihtml.dom.unwrap(element);
    },

    remove: function (element) {
      element.parentNode.removeChild(element);
    }
  };

  return parse(elementOrHtml_current, config_current);
};

// does a selector query on element or array of elements
wysihtml.dom.query = function(elements, query) {
    var ret = [],
        q;

    if (elements.nodeType) {
        elements = [elements];
    }

    for (var e = 0, len = elements.length; e < len; e++) {
        q = elements[e].querySelectorAll(query);
        if (q) {
            for(var i = q.length; i--; ret.unshift(q[i]));
        }
    }
    return ret;
};

/**
 * Checks for empty text node childs and removes them
 *
 * @param {Element} node The element in which to cleanup
 * @example
 *    wysihtml.dom.removeEmptyTextNodes(element);
 */
wysihtml.dom.removeEmptyTextNodes = function(node) {
  var childNode,
      childNodes        = wysihtml.lang.array(node.childNodes).get(),
      childNodesLength  = childNodes.length,
      i                 = 0;

  for (; i<childNodesLength; i++) {
    childNode = childNodes[i];
    if (childNode.nodeType === wysihtml.TEXT_NODE && (/^[\n\r]*$/).test(childNode.data)) {
      childNode.parentNode.removeChild(childNode);
    }
  }
};

wysihtml.dom.removeInvisibleSpaces = function(node) {
  var textNodes = wysihtml.dom.getTextNodes(node);
  for (var n = textNodes.length; n--;) {
    textNodes[n].nodeValue = textNodes[n].nodeValue.replace(wysihtml.INVISIBLE_SPACE_REG_EXP, "");
  }
};

/**
 * Renames an element (eg. a <div> to a <p>) and keeps its childs
 *
 * @param {Element} element The list element which should be renamed
 * @param {Element} newNodeName The desired tag name
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <ul id="list">
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 *
 *    <script>
 *      wysihtml.dom.renameElement(document.getElementById("list"), "ol");
 *    </script>
 *
 *    <!-- Will result in: -->
 *    <ol>
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ol>
 */
wysihtml.dom.renameElement = function(element, newNodeName) {
  var newElement = element.ownerDocument.createElement(newNodeName),
      firstChild;
  while (firstChild = element.firstChild) {
    newElement.appendChild(firstChild);
  }
  wysihtml.dom.copyAttributes(["align", "className"]).from(element).to(newElement);
  
  if (element.parentNode) {
    element.parentNode.replaceChild(newElement, element);
  }

  return newElement;
};

/**
 * Takes an element, removes it and replaces it with it's childs
 *
 * @param {Object} node The node which to replace with it's child nodes
 * @example
 *    <div id="foo">
 *      <span>hello</span>
 *    </div>
 *    <script>
 *      // Remove #foo and replace with it's children
 *      wysihtml.dom.replaceWithChildNodes(document.getElementById("foo"));
 *    </script>
 */
wysihtml.dom.replaceWithChildNodes = function(node) {
  if (!node.parentNode) {
    return;
  }

  while (node.firstChild) {
    node.parentNode.insertBefore(node.firstChild, node);
  }
  node.parentNode.removeChild(node);
};

/**
 * Unwraps an unordered/ordered list
 *
 * @param {Element} element The list element which should be unwrapped
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <ul id="list">
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 *
 *    <script>
 *      wysihtml.dom.resolveList(document.getElementById("list"));
 *    </script>
 *
 *    <!-- Will result in: -->
 *    eminem<br>
 *    dr. dre<br>
 *    50 Cent<br>
 */
(function(dom) {
  function _isBlockElement(node) {
    return dom.getStyle("display").from(node) === "block";
  }

  function _isLineBreak(node) {
    return node.nodeName === "BR";
  }

  function _appendLineBreak(element) {
    var lineBreak = element.ownerDocument.createElement("br");
    element.appendChild(lineBreak);
  }

  function resolveList(list, useLineBreaks) {
    if (!list.nodeName.match(/^(MENU|UL|OL)$/)) {
      return;
    }

    var doc             = list.ownerDocument,
        fragment        = doc.createDocumentFragment(),
        previousSibling = wysihtml.dom.domNode(list).prev({ignoreBlankTexts: true}),
        nextSibling = wysihtml.dom.domNode(list).next({ignoreBlankTexts: true}),
        firstChild,
        lastChild,
        isLastChild,
        shouldAppendLineBreak,
        paragraph,
        listItem,
        lastListItem = list.lastElementChild || list.lastChild,
        isLastItem;

    if (useLineBreaks) {
      // Insert line break if list is after a non-block element
      if (previousSibling && !_isBlockElement(previousSibling) && !_isLineBreak(previousSibling)) {
        _appendLineBreak(fragment);
      }

      while (listItem = (list.firstElementChild || list.firstChild)) {
        lastChild = listItem.lastChild;
        isLastItem = listItem === lastListItem;
        while (firstChild = listItem.firstChild) {
          isLastChild           = firstChild === lastChild;
          // This needs to be done before appending it to the fragment, as it otherwise will lose style information
          shouldAppendLineBreak = (!isLastItem || (nextSibling && !_isBlockElement(nextSibling))) && isLastChild && !_isBlockElement(firstChild) && !_isLineBreak(firstChild);
          fragment.appendChild(firstChild);
          if (shouldAppendLineBreak) {
            _appendLineBreak(fragment);
          }
        }

        listItem.parentNode.removeChild(listItem);
      }
    } else {
      while (listItem = (list.firstElementChild || list.firstChild)) {
        if (listItem.querySelector && listItem.querySelector("div, p, ul, ol, menu, blockquote, h1, h2, h3, h4, h5, h6")) {
          while (firstChild = listItem.firstChild) {
            fragment.appendChild(firstChild);
          }
        } else {
          paragraph = doc.createElement("p");
          while (firstChild = listItem.firstChild) {
            paragraph.appendChild(firstChild);
          }
          fragment.appendChild(paragraph);
        }
        listItem.parentNode.removeChild(listItem);
      }
    }

    list.parentNode.replaceChild(fragment, list);
  }

  dom.resolveList = resolveList;
})(wysihtml.dom);

/**
 * Sandbox for executing javascript, parsing css styles and doing dom operations in a secure way
 *
 * Browser Compatibility:
 *  - Secure in MSIE 6+, but only when the user hasn't made changes to his security level "restricted"
 *  - Partially secure in other browsers (Firefox, Opera, Safari, Chrome, ...)
 *
 * Please note that this class can't benefit from the HTML5 sandbox attribute for the following reasons:
 *    - sandboxing doesn't work correctly with inlined content (src="javascript:'<html>...</html>'")
 *    - sandboxing of physical documents causes that the dom isn't accessible anymore from the outside (iframe.contentWindow, ...)
 *    - setting the "allow-same-origin" flag would fix that, but then still javascript and dom events refuse to fire
 *    - therefore the "allow-scripts" flag is needed, which then would deactivate any security, as the js executed inside the iframe
 *      can do anything as if the sandbox attribute wasn't set
 *
 * @param {Function} [readyCallback] Method that gets invoked when the sandbox is ready
 * @param {Object} [config] Optional parameters
 *
 * @example
 *    new wysihtml.dom.Sandbox(function(sandbox) {
 *      sandbox.getWindow().document.body.innerHTML = '<img src=foo.gif onerror="alert(document.cookie)">';
 *    });
 */
(function(wysihtml) {
  var /**
       * Default configuration
       */
      doc                 = document,
      /**
       * Properties to unset/protect on the window object
       */
      windowProperties    = [
        "parent", "top", "opener", "frameElement", "frames",
        "localStorage", "globalStorage", "sessionStorage", "indexedDB"
      ],
      /**
       * Properties on the window object which are set to an empty function
       */
      windowProperties2   = [
        "open", "close", "openDialog", "showModalDialog",
        "alert", "confirm", "prompt",
        "openDatabase", "postMessage",
        "XMLHttpRequest", "XDomainRequest"
      ],
      /**
       * Properties to unset/protect on the document object
       */
      documentProperties  = [
        "referrer",
        "write", "open", "close"
      ];

  wysihtml.dom.Sandbox = Base.extend(
    /** @scope wysihtml.dom.Sandbox.prototype */ {

    constructor: function(readyCallback, config) {
      this.callback = readyCallback || wysihtml.EMPTY_FUNCTION;
      this.config   = wysihtml.lang.object({}).merge(config).get();
      if (!this.config.className) {
        this.config.className = "wysihtml-sandbox";
      }
      this.editableArea   = this._createIframe();
    },

    insertInto: function(element) {
      if (typeof(element) === "string") {
        element = doc.getElementById(element);
      }

      element.appendChild(this.editableArea);
    },

    getIframe: function() {
      return this.editableArea;
    },

    getWindow: function() {
      this._readyError();
    },

    getDocument: function() {
      this._readyError();
    },

    destroy: function() {
      var iframe = this.getIframe();
      iframe.parentNode.removeChild(iframe);
    },

    _readyError: function() {
      throw new Error("wysihtml.Sandbox: Sandbox iframe isn't loaded yet");
    },

    /**
     * Creates the sandbox iframe
     *
     * Some important notes:
     *  - We can't use HTML5 sandbox for now:
     *    setting it causes that the iframe's dom can't be accessed from the outside
     *    Therefore we need to set the "allow-same-origin" flag which enables accessing the iframe's dom
     *    But then there's another problem, DOM events (focus, blur, change, keypress, ...) aren't fired.
     *    In order to make this happen we need to set the "allow-scripts" flag.
     *    A combination of allow-scripts and allow-same-origin is almost the same as setting no sandbox attribute at all.
     *  - Chrome & Safari, doesn't seem to support sandboxing correctly when the iframe's html is inlined (no physical document)
     *  - IE needs to have the security="restricted" attribute set before the iframe is
     *    inserted into the dom tree
     *  - Believe it or not but in IE "security" in document.createElement("iframe") is false, even
     *    though it supports it
     *  - When an iframe has security="restricted", in IE eval() & execScript() don't work anymore
     *  - IE doesn't fire the onload event when the content is inlined in the src attribute, therefore we rely
     *    on the onreadystatechange event
     */
    _createIframe: function() {
      var that   = this,
          iframe = doc.createElement("iframe");
      iframe.className = this.config.className;
      wysihtml.dom.setAttributes({
        "security":           "restricted",
        "allowtransparency":  "true",
        "frameborder":        0,
        "width":              0,
        "height":             0,
        "marginwidth":        0,
        "marginheight":       0
      }).on(iframe);

      // Setting the src like this prevents ssl warnings in IE6
      if (wysihtml.browser.throwsMixedContentWarningWhenIframeSrcIsEmpty()) {
        iframe.src = "javascript:'<html></html>'";
      }

      iframe.onload = function() {
        iframe.onreadystatechange = iframe.onload = null;
        that._onLoadIframe(iframe);
      };

      iframe.onreadystatechange = function() {
        if (/loaded|complete/.test(iframe.readyState)) {
          iframe.onreadystatechange = iframe.onload = null;
          that._onLoadIframe(iframe);
        }
      };

      return iframe;
    },

    /**
     * Callback for when the iframe has finished loading
     */
    _onLoadIframe: function(iframe) {
      // don't resume when the iframe got unloaded (eg. by removing it from the dom)
      if (!wysihtml.dom.contains(doc.documentElement, iframe)) {
        return;
      }

      var that           = this,
          iframeWindow   = iframe.contentWindow,
          iframeDocument = iframe.contentWindow.document,
          charset        = doc.characterSet || doc.charset || "utf-8",
          sandboxHtml    = this._getHtml({
            charset:      charset,
            stylesheets:  this.config.stylesheets
          });

      // Create the basic dom tree including proper DOCTYPE and charset
      iframeDocument.open("text/html", "replace");
      iframeDocument.write(sandboxHtml);
      iframeDocument.close();

      this.getWindow = function() { return iframe.contentWindow; };
      this.getDocument = function() { return iframe.contentWindow.document; };

      // Catch js errors and pass them to the parent's onerror event
      // addEventListener("error") doesn't work properly in some browsers
      // TODO: apparently this doesn't work in IE9!
      iframeWindow.onerror = function(errorMessage, fileName, lineNumber) {
        throw new Error("wysihtml.Sandbox: " + errorMessage, fileName, lineNumber);
      };

      if (!wysihtml.browser.supportsSandboxedIframes()) {
        // Unset a bunch of sensitive variables
        // Please note: This isn't hack safe!
        // It more or less just takes care of basic attacks and prevents accidental theft of sensitive information
        // IE is secure though, which is the most important thing, since IE is the only browser, who
        // takes over scripts & styles into contentEditable elements when copied from external websites
        // or applications (Microsoft Word, ...)
        var i, length;
        for (i=0, length=windowProperties.length; i<length; i++) {
          this._unset(iframeWindow, windowProperties[i]);
        }
        for (i=0, length=windowProperties2.length; i<length; i++) {
          this._unset(iframeWindow, windowProperties2[i], wysihtml.EMPTY_FUNCTION);
        }
        for (i=0, length=documentProperties.length; i<length; i++) {
          this._unset(iframeDocument, documentProperties[i]);
        }
        // This doesn't work in Safari 5
        // See http://stackoverflow.com/questions/992461/is-it-possible-to-override-document-cookie-in-webkit
        this._unset(iframeDocument, "cookie", "", true);
      }

      if (wysihtml.polyfills) {
        wysihtml.polyfills(iframeWindow, iframeDocument).apply();
      }

      this.loaded = true;

      // Trigger the callback
      setTimeout(function() { that.callback(that); }, 0);
    },

    _getHtml: function(templateVars) {
      var stylesheets = templateVars.stylesheets,
          html        = "",
          i           = 0,
          length;
      stylesheets = typeof(stylesheets) === "string" ? [stylesheets] : stylesheets;
      if (stylesheets) {
        length = stylesheets.length;
        for (; i<length; i++) {
          html += '<link rel="stylesheet" href="' + stylesheets[i] + '">';
        }
      }
      templateVars.stylesheets = html;

      return wysihtml.lang.string(
        '<!DOCTYPE html><html><head>'
        + '<meta charset="#{charset}">#{stylesheets}</head>'
        + '<body></body></html>'
      ).interpolate(templateVars);
    },

    /**
     * Method to unset/override existing variables
     * @example
     *    // Make cookie unreadable and unwritable
     *    this._unset(document, "cookie", "", true);
     */
    _unset: function(object, property, value, setter) {
      try { object[property] = value; } catch(e) {}

      try { object.__defineGetter__(property, function() { return value; }); } catch(e) {}
      if (setter) {
        try { object.__defineSetter__(property, function() {}); } catch(e) {}
      }

      if (!wysihtml.browser.crashesWhenDefineProperty(property)) {
        try {
          var config = {
            get: function() { return value; }
          };
          if (setter) {
            config.set = function() {};
          }
          Object.defineProperty(object, property, config);
        } catch(e) {}
      }
    }
  });
})(wysihtml);

(function() {
  var mapping = {
    "className": "class"
  };
  wysihtml.dom.setAttributes = function(attributes) {
    return {
      on: function(element) {
        for (var i in attributes) {
          element.setAttribute(mapping[i] || i, attributes[i]);
        }
      }
    };
  };
})();

wysihtml.dom.setStyles = function(styles) {
  return {
    on: function(element) {
      var style = element.style;
      if (typeof(styles) === "string") {
        style.cssText += ";" + styles;
        return;
      }
      for (var i in styles) {
        if (i === "float") {
          style.cssFloat = styles[i];
          style.styleFloat = styles[i];
        } else {
          style[i] = styles[i];
        }
      }
    }
  };
};

/**
 * Simulate HTML5 placeholder attribute
 *
 * Needed since
 *    - div[contentEditable] elements don't support it
 *    - older browsers (such as IE8 and Firefox 3.6) don't support it at all
 *
 * @param {Object} parent Instance of main wysihtml.Editor class
 * @param {Element} view Instance of wysihtml.views.* class
 * @param {String} placeholderText
 *
 * @example
 *    wysihtml.dom.simulatePlaceholder(this, composer, "Foobar");
 */
(function(dom) {
  dom.simulatePlaceholder = function(editor, view, placeholderText, placeholderClassName) {
    var CLASS_NAME = placeholderClassName || "wysihtml-placeholder",
        unset = function() {
          var composerIsVisible   = view.element.offsetWidth > 0 && view.element.offsetHeight > 0;
          if (view.hasPlaceholderSet()) {
            view.clear();
            view.element.focus();
            if (composerIsVisible ) {
              setTimeout(function() {
                var sel = view.selection.getSelection();
                if (!sel.focusNode || !sel.anchorNode) {
                  view.selection.selectNode(view.element.firstChild || view.element);
                }
              }, 0);
            }
          }
          view.placeholderSet = false;
          dom.removeClass(view.element, CLASS_NAME);
        },
        set = function() {
          if (view.isEmpty() && !view.placeholderSet) {
            view.placeholderSet = true;
            view.setValue(placeholderText, false);
            dom.addClass(view.element, CLASS_NAME);
          }
        };

    editor
      .on("set_placeholder", set)
      .on("unset_placeholder", unset)
      .on("focus:composer", unset)
      .on("paste:composer", unset)
      .on("blur:composer", set);

    set();
  };
})(wysihtml.dom);

(function(dom) {
  var documentElement = document.documentElement;
  if ("textContent" in documentElement) {
    dom.setTextContent = function(element, text) {
      element.textContent = text;
    };

    dom.getTextContent = function(element) {
      return element.textContent;
    };
  } else if ("innerText" in documentElement) {
    dom.setTextContent = function(element, text) {
      element.innerText = text;
    };

    dom.getTextContent = function(element) {
      return element.innerText;
    };
  } else {
    dom.setTextContent = function(element, text) {
      element.nodeValue = text;
    };

    dom.getTextContent = function(element) {
      return element.nodeValue;
    };
  }
})(wysihtml.dom);

/* Unwraps element and returns list of childNodes that the node contained.
 *
 * Example:
 *    var childnodes = wysihtml.dom.unwrap(document.querySelector('.unwrap-me'));
*/

wysihtml.dom.unwrap = function(node) {
  var children = [];
  if (node.parentNode) {
    while (node.lastChild) {
      children.unshift(node.lastChild);
      wysihtml.dom.insert(node.lastChild).after(node);
    }
    node.parentNode.removeChild(node);
  }
  return children;
};

/**
 * Fix most common html formatting misbehaviors of browsers implementation when inserting
 * content via copy & paste contentEditable
 *
 * @author Christopher Blum
 */
wysihtml.quirks.cleanPastedHTML = (function() {

  var styleToRegex = function (styleStr) {
    var trimmedStr = wysihtml.lang.string(styleStr).trim(),
        escapedStr = trimmedStr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

    return new RegExp("^((?!^" + escapedStr + "$).)*$", "i");
  };

  var extendRulesWithStyleExceptions = function (rules, exceptStyles) {
    var newRules = wysihtml.lang.object(rules).clone(true),
        tag, style;

    for (tag in newRules.tags) {

      if (newRules.tags.hasOwnProperty(tag)) {
        if (newRules.tags[tag].keep_styles) {
          for (style in newRules.tags[tag].keep_styles) {
            if (newRules.tags[tag].keep_styles.hasOwnProperty(style)) {
              if (exceptStyles[style]) {
                newRules.tags[tag].keep_styles[style] = styleToRegex(exceptStyles[style]);
              }
            }
          }
        }
      }
    }

    return newRules;
  };

  var pickRuleset = function(ruleset, html) {
    var pickedSet, defaultSet;

    if (!ruleset) {
      return null;
    }

    for (var i = 0, max = ruleset.length; i < max; i++) {
      if (!ruleset[i].condition) {
        defaultSet = ruleset[i].set;
      }
      if (ruleset[i].condition && ruleset[i].condition.test(html)) {
        return ruleset[i].set;
      }
    }

    return defaultSet;
  };

  return function(html, options) {
    var exceptStyles = {
          'color': wysihtml.dom.getStyle("color").from(options.referenceNode),
          'fontSize': wysihtml.dom.getStyle("font-size").from(options.referenceNode)
        },
        rules = extendRulesWithStyleExceptions(pickRuleset(options.rules, html) || {}, exceptStyles),
        newHtml;

    newHtml = wysihtml.dom.parse(html, {
      "rules": rules,
      "cleanUp": true, // <span> elements, empty or without attributes, should be removed/replaced with their content
      "context": options.referenceNode.ownerDocument,
      "uneditableClass": options.uneditableClass,
      "clearInternals" : true, // don't paste temprorary selection and other markings
      "unjoinNbsps" : true
    });

    return newHtml;
  };

})();

/**
 * IE and Opera leave an empty paragraph in the contentEditable element after clearing it
 *
 * @param {Object} contentEditableElement The contentEditable element to observe for clearing events
 * @exaple
 *    wysihtml.quirks.ensureProperClearing(myContentEditableElement);
 */
wysihtml.quirks.ensureProperClearing = (function() {
  var clearIfNecessary = function() {
    var element = this;
    setTimeout(function() {
      var innerHTML = element.innerHTML.toLowerCase();
      if (innerHTML == "<p>&nbsp;</p>" ||
          innerHTML == "<p>&nbsp;</p><p>&nbsp;</p>") {
        element.innerHTML = "";
      }
    }, 0);
  };

  return function(composer) {
    wysihtml.dom.observe(composer.element, ["cut", "keydown"], clearIfNecessary);
  };
})();

// See https://bugzilla.mozilla.org/show_bug.cgi?id=664398
//
// In Firefox this:
//      var d = document.createElement("div");
//      d.innerHTML ='<a href="~"></a>';
//      d.innerHTML;
// will result in:
//      <a href="%7E"></a>
// which is wrong
(function(wysihtml) {
  var TILDE_ESCAPED = "%7E";
  wysihtml.quirks.getCorrectInnerHTML = function(element) {
    var innerHTML = element.innerHTML;
    if (innerHTML.indexOf(TILDE_ESCAPED) === -1) {
      return innerHTML;
    }

    var elementsWithTilde = element.querySelectorAll("[href*='~'], [src*='~']"),
        url,
        urlToSearch,
        length,
        i;
    for (i=0, length=elementsWithTilde.length; i<length; i++) {
      url         = elementsWithTilde[i].href || elementsWithTilde[i].src;
      urlToSearch = wysihtml.lang.string(url).replace("~").by(TILDE_ESCAPED);
      innerHTML   = wysihtml.lang.string(innerHTML).replace(urlToSearch).by(url);
    }
    return innerHTML;
  };
})(wysihtml);

/**
 * Force rerendering of a given element
 * Needed to fix display misbehaviors of IE
 *
 * @param {Element} element The element object which needs to be rerendered
 * @example
 *    wysihtml.quirks.redraw(document.body);
 */
(function(wysihtml) {
  var CLASS_NAME = "wysihtml-quirks-redraw";

  wysihtml.quirks.redraw = function(element) {
    wysihtml.dom.addClass(element, CLASS_NAME);
    wysihtml.dom.removeClass(element, CLASS_NAME);

    // Following hack is needed for firefox to make sure that image resize handles are properly removed
    try {
      var doc = element.ownerDocument;
      doc.execCommand("italic", false, null);
      doc.execCommand("italic", false, null);
    } catch(e) {}
  };
})(wysihtml);

(function(wysihtml) {
  
  // List of supported color format parsing methods
  // If radix is not defined 10 is expected as default
  var colorParseMethods = {
        rgba : {
          regex: /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d\.]+)\s*\)/i,
          name: "rgba"
        },
        rgb : {
          regex: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i,
          name: "rgb"
        },
        hex6 : {
          regex: /^#([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])/i,
          name: "hex",
          radix: 16
        },
        hex3 : {
          regex: /^#([0-9a-f])([0-9a-f])([0-9a-f])/i,
          name: "hex",
          radix: 16
        }
      },
      // Takes a style key name as an argument and makes a regex that can be used to the match key:value pair from style string
      makeParamRegExp = function (p) {
        return new RegExp("(^|\\s|;)" + p + "\\s*:\\s*[^;$]+", "gi");
      };

  // Takes color string value ("#abc", "rgb(1,2,3)", ...) as an argument and returns suitable parsing method for it
  function getColorParseMethod (colorStr) {
    var prop, colorTypeConf;

    for (prop in colorParseMethods) {
      if (!colorParseMethods.hasOwnProperty(prop)) { continue; }

      colorTypeConf = colorParseMethods[prop];

      if (colorTypeConf.regex.test(colorStr)) {
        return colorTypeConf;
      }
    }
  }

  // Takes color string value ("#abc", "rgb(1,2,3)", ...) as an argument and returns the type of that color format "hex", "rgb", "rgba". 
  function getColorFormat (colorStr) {
    var type = getColorParseMethod(colorStr);

    return type ? type.name : undefined;
  }

  // Public API functions for styleParser
  wysihtml.quirks.styleParser = {

    // Takes color string value as an argument and returns suitable parsing method for it
    getColorParseMethod : getColorParseMethod,

    // Takes color string value as an argument and returns the type of that color format "hex", "rgb", "rgba". 
    getColorFormat : getColorFormat,
    
    /* Parses a color string to and array of [red, green, blue, alpha].
     * paramName: optional argument to parse color value directly from style string parameter
     *
     * Examples:
     *    var colorArray = wysihtml.quirks.styleParser.parseColor("#ABC");            // [170, 187, 204, 1]
     *    var colorArray = wysihtml.quirks.styleParser.parseColor("#AABBCC");         // [170, 187, 204, 1]
     *    var colorArray = wysihtml.quirks.styleParser.parseColor("rgb(1,2,3)");      // [1, 2, 3, 1]
     *    var colorArray = wysihtml.quirks.styleParser.parseColor("rgba(1,2,3,0.5)"); // [1, 2, 3, 0.5]
     *
     *    var colorArray = wysihtml.quirks.styleParser.parseColor("background-color: #ABC; color: #000;", "background-color"); // [170, 187, 204, 1]
     *    var colorArray = wysihtml.quirks.styleParser.parseColor("background-color: #ABC; color: #000;", "color");            // [0, 0, 0, 1]
     */
    parseColor : function (stylesStr, paramName) {
      var paramsRegex, params, colorType, colorMatch, radix,
          colorStr = stylesStr;

      if (paramName) {
        paramsRegex = makeParamRegExp(paramName);

        if (!(params = stylesStr.match(paramsRegex))) { return false; }

        params = params.pop().split(":")[1];
        colorStr = wysihtml.lang.string(params).trim();
      }

      if (!(colorType = getColorParseMethod(colorStr))) { return false; }
      if (!(colorMatch = colorStr.match(colorType.regex))) { return false; }

      radix = colorType.radix || 10;

      if (colorType === colorParseMethods.hex3) {
        colorMatch.shift();
        colorMatch.push(1);
        return wysihtml.lang.array(colorMatch).map(function(d, idx) {
          return (idx < 3) ? (parseInt(d, radix) * radix) + parseInt(d, radix): parseFloat(d);
        });
      }

      colorMatch.shift();

      if (!colorMatch[3]) {
        colorMatch.push(1);
      }

      return wysihtml.lang.array(colorMatch).map(function(d, idx) {
        return (idx < 3) ? parseInt(d, radix): parseFloat(d);
      });
    },

    /* Takes rgba color array [r,g,b,a] as a value and formats it to color string with given format type
     * If no format is given, rgba/rgb is returned based on alpha value
     *
     * Example:
     *    var colorStr = wysihtml.quirks.styleParser.unparseColor([170, 187, 204, 1], "hash");  // "#AABBCC"
     *    var colorStr = wysihtml.quirks.styleParser.unparseColor([170, 187, 204, 1], "hex");  // "AABBCC"
     *    var colorStr = wysihtml.quirks.styleParser.unparseColor([170, 187, 204, 1], "csv");  // "170, 187, 204, 1"
     *    var colorStr = wysihtml.quirks.styleParser.unparseColor([170, 187, 204, 1], "rgba");  // "rgba(170,187,204,1)"
     *    var colorStr = wysihtml.quirks.styleParser.unparseColor([170, 187, 204, 1], "rgb");  // "rgb(170,187,204)"
     *
     *    var colorStr = wysihtml.quirks.styleParser.unparseColor([170, 187, 204, 0.5]);  // "rgba(170,187,204,0.5)"
     *    var colorStr = wysihtml.quirks.styleParser.unparseColor([170, 187, 204, 1]);  // "rgb(170,187,204)"
     */
    unparseColor: function(val, colorFormat) {
      var hexRadix = 16;

      if (colorFormat === "hex") {
        return (val[0].toString(hexRadix) + val[1].toString(hexRadix) + val[2].toString(hexRadix)).toUpperCase();
      } else if (colorFormat === "hash") {
        return "#" + (val[0].toString(hexRadix) + val[1].toString(hexRadix) + val[2].toString(hexRadix)).toUpperCase();
      } else if (colorFormat === "rgb") {
        return "rgb(" + val[0] + "," + val[1] + "," + val[2] + ")";
      } else if (colorFormat === "rgba") {
        return "rgba(" + val[0] + "," + val[1] + "," + val[2] + "," + val[3] + ")";
      } else if (colorFormat === "csv") {
        return  val[0] + "," + val[1] + "," + val[2] + "," + val[3];
      }

      if (val[3] && val[3] !== 1) {
        return "rgba(" + val[0] + "," + val[1] + "," + val[2] + "," + val[3] + ")";
      } else {
        return "rgb(" + val[0] + "," + val[1] + "," + val[2] + ")";
      }
    },

    // Parses font size value from style string
    parseFontSize: function(stylesStr) {
      var params = stylesStr.match(makeParamRegExp("font-size"));
      if (params) {
        return wysihtml.lang.string(params[params.length - 1].split(":")[1]).trim();
      }
      return false;
    }
  };

})(wysihtml);

/**
 * Selection API
 *
 * @example
 *    var selection = new wysihtml.Selection(editor);
 */
(function(wysihtml) {
  var dom = wysihtml.dom;

  function _getCumulativeOffsetTop(element) {
    var top = 0;
    if (element.parentNode) {
      do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
      } while (element);
    }
    return top;
  }

  // Provides the depth of ``descendant`` relative to ``ancestor``
  function getDepth(ancestor, descendant) {
      var ret = 0;
      while (descendant !== ancestor) {
          ret++;
          descendant = descendant.parentNode;
          if (!descendant)
              throw new Error("not a descendant of ancestor!");
      }
      return ret;
  }

  function getRangeNode(node, offset) {
    if (node.nodeType === 3) {
      return node;
    } else {
      return node.childNodes[offset] || node;
    }
  }

  function getWebkitSelectionFixNode(container) {
    var blankNode = document.createElement('span');

    var placeholderRemover = function(event) {
      // Self-destructs the caret and keeps the text inserted into it by user
      var lastChild;

      container.removeEventListener('mouseup', placeholderRemover);
      container.removeEventListener('keydown', placeholderRemover);
      container.removeEventListener('touchstart', placeholderRemover);
      container.removeEventListener('focus', placeholderRemover);
      container.removeEventListener('blur', placeholderRemover);
      container.removeEventListener('paste', delayedPlaceholderRemover);
      container.removeEventListener('drop', delayedPlaceholderRemover);
      container.removeEventListener('beforepaste', delayedPlaceholderRemover);

      if (blankNode && blankNode.parentNode) {
        blankNode.parentNode.removeChild(blankNode);
      }
    },
    delayedPlaceholderRemover = function (event) {
      if (blankNode && blankNode.parentNode) {
        setTimeout(placeholderRemover, 0);
      }
    };

    blankNode.appendChild(container.ownerDocument.createTextNode(wysihtml.INVISIBLE_SPACE));
    blankNode.className = '_wysihtml-temp-caret-fix';
    blankNode.style.display = 'block';
    blankNode.style.minWidth = '1px';
    blankNode.style.height = '0px';

    container.addEventListener('mouseup', placeholderRemover);
    container.addEventListener('keydown', placeholderRemover);
    container.addEventListener('touchstart', placeholderRemover);
    container.addEventListener('focus', placeholderRemover);
    container.addEventListener('blur', placeholderRemover);
    container.addEventListener('paste', delayedPlaceholderRemover);
    container.addEventListener('drop', delayedPlaceholderRemover);
    container.addEventListener('beforepaste', delayedPlaceholderRemover);

    return blankNode;
  }

  // Should fix the obtained ranges that cannot surrond contents normally to apply changes upon
  // Being considerate to firefox that sets range start start out of span and end inside on doubleclick initiated selection
  function expandRangeToSurround(range) {
      if (range.canSurroundContents()) return;

      var common = range.commonAncestorContainer,
          start_depth = getDepth(common, range.startContainer),
          end_depth = getDepth(common, range.endContainer);

      while(!range.canSurroundContents()) {
        // In the following branches, we cannot just decrement the depth variables because the setStartBefore/setEndAfter may move the start or end of the range more than one level relative to ``common``. So we need to recompute the depth.
        if (start_depth > end_depth) {
            range.setStartBefore(range.startContainer);
            start_depth = getDepth(common, range.startContainer);
        }
        else {
            range.setEndAfter(range.endContainer);
            end_depth = getDepth(common, range.endContainer);
        }
      }
  }

  wysihtml.Selection = Base.extend(
    /** @scope wysihtml.Selection.prototype */ {
    constructor: function(editor, contain, unselectableClass) {
      // Make sure that our external range library is initialized
      rangy.init();

      this.editor   = editor;
      this.composer = editor.composer;
      this.doc      = this.composer.doc;
      this.win      = this.composer.win;
      this.contain = contain;
      this.unselectableClass = unselectableClass || false;
    },

    /**
     * Get the current selection as a bookmark to be able to later restore it
     *
     * @return {Object} An object that represents the current selection
     */
    getBookmark: function() {
      var range = this.getRange();
      return range && range.cloneRange();
    },

    /**
     * Restore a selection retrieved via wysihtml.Selection.prototype.getBookmark
     *
     * @param {Object} bookmark An object that represents the current selection
     */
    setBookmark: function(bookmark) {
      if (!bookmark) {
        return;
      }

      this.setSelection(bookmark);
    },

    /**
     * Set the caret in front of the given node
     *
     * @param {Object} node The element or text node where to position the caret in front of
     * @example
     *    selection.setBefore(myElement);
     */
    setBefore: function(node) {
      var range = rangy.createRange(this.doc);
      range.setStartBefore(node);
      range.setEndBefore(node);
      return this.setSelection(range);
    },

    // Constructs a self removing whitespace (ain absolute positioned span) for placing selection caret when normal methods fail.
    // Webkit has an issue with placing caret into places where there are no textnodes near by.
    createTemporaryCaretSpaceAfter: function (node) {
      var caretPlaceholder = this.doc.createElement('span'),
          caretPlaceholderText = this.doc.createTextNode(wysihtml.INVISIBLE_SPACE),
          placeholderRemover = (function(event) {
            // Self-destructs the caret and keeps the text inserted into it by user
            var lastChild;

            this.contain.removeEventListener('mouseup', placeholderRemover);
            this.contain.removeEventListener('keydown', keyDownHandler);
            this.contain.removeEventListener('touchstart', placeholderRemover);
            this.contain.removeEventListener('focus', placeholderRemover);
            this.contain.removeEventListener('blur', placeholderRemover);
            this.contain.removeEventListener('paste', delayedPlaceholderRemover);
            this.contain.removeEventListener('drop', delayedPlaceholderRemover);
            this.contain.removeEventListener('beforepaste', delayedPlaceholderRemover);

            // If user inserted sth it is in the placeholder and sgould be unwrapped and stripped of invisible whitespace hack
            // Otherwise the wrapper can just be removed
            if (caretPlaceholder && caretPlaceholder.parentNode) {
              caretPlaceholder.innerHTML = caretPlaceholder.innerHTML.replace(wysihtml.INVISIBLE_SPACE_REG_EXP, "");
              if ((/[^\s]+/).test(caretPlaceholder.innerHTML)) {
                lastChild = caretPlaceholder.lastChild;
                wysihtml.dom.unwrap(caretPlaceholder);
                this.setAfter(lastChild);
              } else {
                caretPlaceholder.parentNode.removeChild(caretPlaceholder);
              }

            }
          }).bind(this),
          delayedPlaceholderRemover = function (event) {
            if (caretPlaceholder && caretPlaceholder.parentNode) {
              setTimeout(placeholderRemover, 0);
            }
          },
          keyDownHandler = function(event) {
            if (event.which !== 8 && event.which !== 91 && event.which !== 17 && (event.which !== 86 || (!event.ctrlKey && !event.metaKey))) {
              placeholderRemover();
            }
          };

      caretPlaceholder.className = '_wysihtml-temp-caret-fix';
      caretPlaceholder.style.position = 'absolute';
      caretPlaceholder.style.display = 'block';
      caretPlaceholder.style.minWidth = '1px';
      caretPlaceholder.style.zIndex = '99999';
      caretPlaceholder.appendChild(caretPlaceholderText);

      node.parentNode.insertBefore(caretPlaceholder, node.nextSibling);
      this.setBefore(caretPlaceholderText);

      // Remove the caret fix on any of the following events (some are delayed as content change happens after event)
      this.contain.addEventListener('mouseup', placeholderRemover);
      this.contain.addEventListener('keydown', keyDownHandler);
      this.contain.addEventListener('touchstart', placeholderRemover);
      this.contain.addEventListener('focus', placeholderRemover);
      this.contain.addEventListener('blur', placeholderRemover);
      this.contain.addEventListener('paste', delayedPlaceholderRemover);
      this.contain.addEventListener('drop', delayedPlaceholderRemover);
      this.contain.addEventListener('beforepaste', delayedPlaceholderRemover);

      return caretPlaceholder;
    },

    /**
     * Set the caret after the given node
     *
     * @param {Object} node The element or text node where to position the caret in front of
     * @example
     *    selection.setBefore(myElement);
     * callback is an optional parameter accepting a function to execute when selection ahs been set
     */
    setAfter: function(node, notVisual, callback) {
      var win = this.win,
          range = rangy.createRange(this.doc),
          fixWebkitSelection = function() {
            // Webkit fails to add selection if there are no textnodes in that region
            // (like an uneditable container at the end of content).
            var parent = node.parentNode,
                lastSibling = parent ? parent.childNodes[parent.childNodes.length - 1] : null;

            if (!sel || (lastSibling === node && node.nodeType === 1 && win.getComputedStyle(node).display === "block")) {
              if (notVisual) {
                // If setAfter is used as internal between actions, self-removing caretPlaceholder has simpler implementation
                // and remove itself in call stack end instead on user interaction
                var caretPlaceholder = this.doc.createTextNode(wysihtml.INVISIBLE_SPACE);
                node.parentNode.insertBefore(caretPlaceholder, node.nextSibling);
                this.selectNode(caretPlaceholder);
                setTimeout(function() {
                  if (caretPlaceholder && caretPlaceholder.parentNode) {
                    caretPlaceholder.parentNode.removeChild(caretPlaceholder);
                  }
                }, 0);
              } else {
                this.createTemporaryCaretSpaceAfter(node);
              }
            }
          }.bind(this),
          sel;

      range.setStartAfter(node);
      range.setEndAfter(node);

      // In IE contenteditable must be focused before we can set selection
      // thus setting the focus if activeElement is not this composer
      if (!document.activeElement || document.activeElement !== this.composer.element) {
        var scrollPos = this.composer.getScrollPos();
        this.composer.element.focus();
        this.composer.setScrollPos(scrollPos);
        setTimeout(function() {
          sel = this.setSelection(range);
          fixWebkitSelection();
          if (callback) {
            callback(sel);
          }
        }.bind(this), 0);
      } else {
        sel = this.setSelection(range);
        fixWebkitSelection();
        if (callback) {
          callback(sel);
        }
      }
    },

    /**
     * Ability to select/mark nodes
     *
     * @param {Element} node The node/element to select
     * @example
     *    selection.selectNode(document.getElementById("my-image"));
     */
    selectNode: function(node, avoidInvisibleSpace) {
      var range           = rangy.createRange(this.doc),
          isElement       = node.nodeType === wysihtml.ELEMENT_NODE,
          canHaveHTML     = "canHaveHTML" in node ? node.canHaveHTML : (node.nodeName !== "IMG"),
          content         = isElement ? node.innerHTML : node.data,
          isEmpty         = (content === "" || content === wysihtml.INVISIBLE_SPACE),
          displayStyle    = dom.getStyle("display").from(node),
          isBlockElement  = (displayStyle === "block" || displayStyle === "list-item");

      if (isEmpty && isElement && canHaveHTML && !avoidInvisibleSpace) {
        // Make sure that caret is visible in node by inserting a zero width no breaking space
        try { node.innerHTML = wysihtml.INVISIBLE_SPACE; } catch(e) {}
      }
      if (canHaveHTML) {
        range.selectNodeContents(node);
      } else {
        range.selectNode(node);
      }

      if (canHaveHTML && isEmpty && isElement) {
        range.collapse(isBlockElement);
      } else if (canHaveHTML && isEmpty) {
        range.setStartAfter(node);
        range.setEndAfter(node);
      }

      this.setSelection(range);
    },

    /**
     * Get the node which contains the selection
     *
     * @param {Boolean} [controlRange] (only IE) Whether it should return the selected ControlRange element when the selection type is a "ControlRange"
     * @return {Object} The node that contains the caret
     * @example
     *    var nodeThatContainsCaret = selection.getSelectedNode();
     */
    getSelectedNode: function(controlRange) {
      var selection,
          range;

      if (controlRange && this.doc.selection && this.doc.selection.type === "Control") {
        range = this.doc.selection.createRange();
        if (range && range.length) {
          return range.item(0);
        }
      }

      selection = this.getSelection(this.doc);
      if (selection.focusNode === selection.anchorNode) {
        return selection.focusNode;
      } else {
        range = this.getRange(this.doc);
        return range ? range.commonAncestorContainer : this.doc.body;
      }
    },

    fixSelBorders: function() {
      var range = this.getRange();
      expandRangeToSurround(range);
      this.setSelection(range);
    },

    getSelectedOwnNodes: function(controlRange) {
      var selection,
          ranges = this.getOwnRanges(),
          ownNodes = [];

      for (var i = 0, maxi = ranges.length; i < maxi; i++) {
          ownNodes.push(ranges[i].commonAncestorContainer || this.doc.body);
      }
      return ownNodes;
    },

    findNodesInSelection: function(nodeTypes) {
      var ranges = this.getOwnRanges(),
          nodes = [], curNodes;
      for (var i = 0, maxi = ranges.length; i < maxi; i++) {
        curNodes = ranges[i].getNodes([1], function(node) {
            return wysihtml.lang.array(nodeTypes).contains(node.nodeName);
        });
        nodes = nodes.concat(curNodes);
      }
      return nodes;
    },

    filterElements: function(filter) {
      var ranges = this.getOwnRanges(),
          nodes = [], curNodes;

      for (var i = 0, maxi = ranges.length; i < maxi; i++) {
        curNodes = ranges[i].getNodes([1], function(element){
          return filter(element, ranges[i]);
        });
        nodes = nodes.concat(curNodes);
      }
      return nodes;
    },

    containsUneditable: function() {
      var uneditables = this.getOwnUneditables(),
          selection = this.getSelection();

      for (var i = 0, maxi = uneditables.length; i < maxi; i++) {
        if (selection.containsNode(uneditables[i])) {
          return true;
        }
      }

      return false;
    },

    // Deletes selection contents making sure uneditables/unselectables are not partially deleted
    // Triggers wysihtml:uneditable:delete custom event on all deleted uneditables if customevents suppoorted
    deleteContents: function()  {
      var range = this.getRange();
      this.deleteRangeContents(range);
      this.setSelection(range);
    },

    // Makes sure all uneditable sare notified before deleting contents
    deleteRangeContents: function (range) {
      var startParent, endParent, uneditables, ev;

      if (this.unselectableClass) {
        if ((startParent = wysihtml.dom.getParentElement(range.startContainer, { query: "." + this.unselectableClass }, false, this.contain))) {
          range.setStartBefore(startParent);
        }
        if ((endParent = wysihtml.dom.getParentElement(range.endContainer, { query: "." + this.unselectableClass }, false, this.contain))) {
          range.setEndAfter(endParent);
        }

        // If customevents present notify uneditable elements of being deleted
        uneditables = range.getNodes([1], (function (node) {
          return wysihtml.dom.hasClass(node, this.unselectableClass);
        }).bind(this));
        for (var i = uneditables.length; i--;) {
          try {
            ev = new CustomEvent("wysihtml:uneditable:delete");
            uneditables[i].dispatchEvent(ev);
          } catch (err) {}
        }
      }
      range.deleteContents();
    },

    getCaretNode: function () {
      var selection = this.getSelection();
      return (selection && selection.anchorNode) ? getRangeNode(selection.anchorNode, selection.anchorOffset) : null;
    },

    getPreviousNode: function(node, ignoreEmpty) {
      var displayStyle;
      if (!node) {
        var selection = this.getSelection();
        node = (selection && selection.anchorNode) ? getRangeNode(selection.anchorNode, selection.anchorOffset) : null;
      }

      if (node === this.contain) {
          return false;
      }

      var ret = node.previousSibling,
          parent;

      if (ret === this.contain) {
          return false;
      }

      if (ret && ret.nodeType !== 3 && ret.nodeType !== 1) {
         // do not count comments and other node types
         ret = this.getPreviousNode(ret, ignoreEmpty);
      } else if (ret && ret.nodeType === 3 && (/^\s*$/).test(ret.textContent)) {
        // do not count empty textnodes as previous nodes
        ret = this.getPreviousNode(ret, ignoreEmpty);
      } else if (ignoreEmpty && ret && ret.nodeType === 1) {
        // Do not count empty nodes if param set.
        // Contenteditable tends to bypass and delete these silently when deleting with caret when element is inline-like
        displayStyle = wysihtml.dom.getStyle("display").from(ret);
        if (
            !wysihtml.lang.array(["BR", "HR", "IMG"]).contains(ret.nodeName) &&
            !wysihtml.lang.array(["block", "inline-block", "flex", "list-item", "table"]).contains(displayStyle) &&
            (/^[\s]*$/).test(ret.innerHTML)
          ) {
            ret = this.getPreviousNode(ret, ignoreEmpty);
          }
      } else if (!ret && node !== this.contain) {
        parent = node.parentNode;
        if (parent !== this.contain) {
            ret = this.getPreviousNode(parent, ignoreEmpty);
        }
      }

      return (ret !== this.contain) ? ret : false;
    },

    // Gather info about caret location (caret node, previous and next node)
    getNodesNearCaret: function() {
      if (!this.isCollapsed()) {
        throw "Selection must be caret when using selection.getNodesNearCaret()";
      }

      var r = this.getOwnRanges(),
          caretNode, prevNode, nextNode, offset;

      if (r && r.length > 0) {
        if (r[0].startContainer.nodeType === 1) {
          caretNode = r[0].startContainer.childNodes[r[0].startOffset - 1];
          if (!caretNode && r[0].startOffset === 0) {
            // Is first position before all nodes
            nextNode = r[0].startContainer.childNodes[0];
          } else if (caretNode) {
            prevNode = caretNode.previousSibling;
            nextNode = caretNode.nextSibling;
          }
        } else {
          if (r[0].startOffset === 0 && r[0].startContainer.previousSibling) {
            caretNode = r[0].startContainer.previousSibling;
            if (caretNode.nodeType === 3) {
              offset = caretNode.data.length;
            }
          } else {
            caretNode = r[0].startContainer;
            offset = r[0].startOffset;
          }
          prevNode = caretNode.previousSibling;
          nextNode = caretNode.nextSibling;
        }

        return {
          "caretNode": caretNode,
          "prevNode": prevNode,
          "nextNode": nextNode,
          "textOffset": offset
        };
      }

      return null;
    },

    getSelectionParentsByTag: function(tagName) {
      var nodes = this.getSelectedOwnNodes(),
          curEl, parents = [];

      for (var i = 0, maxi = nodes.length; i < maxi; i++) {
        curEl = (nodes[i].nodeName &&  nodes[i].nodeName === 'LI') ? nodes[i] : wysihtml.dom.getParentElement(nodes[i], { query: 'li'}, false, this.contain);
        if (curEl) {
          parents.push(curEl);
        }
      }
      return (parents.length) ? parents : null;
    },

    getRangeToNodeEnd: function() {
      if (this.isCollapsed()) {
        var range = this.getRange(),
            sNode, pos, lastR;
        if (range) {
          sNode = range.startContainer;
          pos = range.startOffset;
          lastR = rangy.createRange(this.doc);

          lastR.selectNodeContents(sNode);
          lastR.setStart(sNode, pos);
          return lastR;
        }
      }
    },

    getRangeToNodeBeginning: function() {
      if (this.isCollapsed()) {
        var range = this.getRange(),
            sNode = range.startContainer,
            pos = range.startOffset,
            lastR = rangy.createRange(this.doc);

        lastR.selectNodeContents(sNode);
        lastR.setEnd(sNode, pos);
        return lastR;
      }
    },

    // This function returns if caret is last in a node (no textual visible content follows)
    caretIsInTheEndOfNode: function(ignoreIfSpaceIsBeforeCaret) {
      var r = rangy.createRange(this.doc),
          s = this.getSelection(),
          rangeToNodeEnd = this.getRangeToNodeEnd(),
          endc, endtxt, beginc, begintxt;

      if (rangeToNodeEnd) {
        endc = rangeToNodeEnd.cloneContents();
        endtxt = endc.textContent;

        if ((/^\s*$/).test(endtxt)) {
          if (ignoreIfSpaceIsBeforeCaret) {
            beginc = this.getRangeToNodeBeginning().cloneContents();
            begintxt = beginc.textContent;
            return !(/[\u00A0 ][\s\uFEFF]*$/).test(begintxt);
          } else {
            return true;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    caretIsFirstInSelection: function(includeLineBreaks) {
      var r = rangy.createRange(this.doc),
          s = this.getSelection(),
          range = this.getRange(),
          startNode = getRangeNode(range.startContainer, range.startOffset);

      if (startNode) {
        if (startNode.nodeType === wysihtml.TEXT_NODE) {
          if (!startNode.parentNode) {
            return false;
          }
          if (!this.isCollapsed() || (startNode.parentNode.firstChild !== startNode && !wysihtml.dom.domNode(startNode.previousSibling).is.block())) {
            return false;
          }
          var ws = this.win.getComputedStyle(startNode.parentNode).whiteSpace;
          return (ws === "pre" || ws === "pre-wrap") ? range.startOffset === 0 : (/^\s*$/).test(startNode.data.substr(0,range.startOffset));
        } else if (includeLineBreaks && wysihtml.dom.domNode(startNode).is.lineBreak()) {
          return true;
        } else {
          r.selectNodeContents(this.getRange().commonAncestorContainer);
          r.collapse(true);
          return (this.isCollapsed() && (r.startContainer === s.anchorNode || r.endContainer === s.anchorNode) && r.startOffset === s.anchorOffset);
        }
      }
    },

    caretIsInTheBeginnig: function(ofNode) {
        var selection = this.getSelection(),
            node = selection.anchorNode,
            offset = selection.anchorOffset;
        if (ofNode && node) {
          return (offset === 0 && (node.nodeName && node.nodeName === ofNode.toUpperCase() || wysihtml.dom.getParentElement(node.parentNode, { query: ofNode }, 1)));
        } else if (node) {
          return (offset === 0 && !this.getPreviousNode(node, true));
        }
    },

    // Returns object describing node/text before selection
    // If includePrevLeaves is true returns  also previous last leaf child if selection is in the beginning of current node
    getBeforeSelection: function(includePrevLeaves) {
      var sel = this.getSelection(),
          startNode = (sel.isBackwards()) ? sel.focusNode : sel.anchorNode,
          startOffset = (sel.isBackwards()) ? sel.focusOffset : sel.anchorOffset,
          rng = this.createRange(), endNode, inTmpCaret;

      // If start is textnode and all is whitespace before caret. Set start offset to 0
      if (startNode && startNode.nodeType === 3 && (/^\s*$/).test(startNode.data.slice(0, startOffset))) {
        startOffset = 0;
      }

      // Escape temproray helper nodes if selection in them
      inTmpCaret = wysihtml.dom.getParentElement(startNode, { query: '._wysihtml-temp-caret-fix' }, 1);
      if (inTmpCaret) {
        startNode = inTmpCaret.parentNode;
        startOffset = Array.prototype.indexOf.call(startNode.childNodes, inTmpCaret);
      }

      if (startNode) {
        if (startOffset > 0) {
          if (startNode.nodeType === 3) {
            rng.setStart(startNode, 0);
            rng.setEnd(startNode, startOffset);
            return {
              type: "text",
              range: rng,
              offset : startOffset,
              node: startNode
            };
          } else {
            rng.setStartBefore(startNode.childNodes[0]);
            endNode = startNode.childNodes[startOffset - 1];
            rng.setEndAfter(endNode);
            return {
              type: "element",
              range: rng,
              offset : startOffset,
              node: endNode
            };
          }
        } else {
          rng.setStartAndEnd(startNode, 0);

          if (includePrevLeaves) {
            var prevNode = this.getPreviousNode(startNode, true),
                prevLeaf = null;

            if(prevNode) {
              if (prevNode.nodeType === 1 && wysihtml.dom.hasClass(prevNode, this.unselectableClass)) {
                prevLeaf = prevNode;
              } else {
                prevLeaf = wysihtml.dom.domNode(prevNode).lastLeafNode();
              }
            }

            if (prevLeaf) {
              return {
                type: "leafnode",
                range: rng,
                offset : startOffset,
                node: prevLeaf
              };
            }
          }

          return {
            type: "none",
            range: rng,
            offset : startOffset,
            node: startNode
          };
        }
      }
      return null;
    },

    // TODO: Figure out a method from following 2 that would work universally
    executeAndRestoreRangy: function(method, restoreScrollPosition) {
      var sel = rangy.saveSelection(this.win);
      if (!sel) {
        method();
      } else {
        try {
          method();
        } catch(e) {
          setTimeout(function() { throw e; }, 0);
        }
      }
      rangy.restoreSelection(sel);
    },

    // TODO: has problems in chrome 12. investigate block level and uneditable area inbetween
    executeAndRestore: function(method, restoreScrollPosition) {
      var body                  = this.doc.body,
          oldScrollTop          = restoreScrollPosition && body.scrollTop,
          oldScrollLeft         = restoreScrollPosition && body.scrollLeft,
          className             = "_wysihtml-temp-placeholder",
          placeholderHtml       = '<span class="' + className + '">' + wysihtml.INVISIBLE_SPACE + '</span>',
          range                 = this.getRange(true),
          caretPlaceholder,
          newCaretPlaceholder,
          nextSibling, prevSibling,
          node, node2, range2,
          newRange;

      // Nothing selected, execute and say goodbye
      if (!range) {
        method(body, body);
        return;
      }

      if (!range.collapsed) {
        range2 = range.cloneRange();
        node2 = range2.createContextualFragment(placeholderHtml);
        range2.collapse(false);
        range2.insertNode(node2);
        range2.detach();
      }

      node = range.createContextualFragment(placeholderHtml);
      range.insertNode(node);

      if (node2) {
        caretPlaceholder = this.contain.querySelectorAll("." + className);
        range.setStartBefore(caretPlaceholder[0]);
        range.setEndAfter(caretPlaceholder[caretPlaceholder.length -1]);
      }
      this.setSelection(range);

      // Make sure that a potential error doesn't cause our placeholder element to be left as a placeholder
      try {
        method(range.startContainer, range.endContainer);
      } catch(e) {
        setTimeout(function() { throw e; }, 0);
      }
      caretPlaceholder = this.contain.querySelectorAll("." + className);
      if (caretPlaceholder && caretPlaceholder.length) {
        newRange = rangy.createRange(this.doc);
        nextSibling = caretPlaceholder[0].nextSibling;
        if (caretPlaceholder.length > 1) {
          prevSibling = caretPlaceholder[caretPlaceholder.length -1].previousSibling;
        }
        if (prevSibling && nextSibling) {
          newRange.setStartBefore(nextSibling);
          newRange.setEndAfter(prevSibling);
        } else {
          newCaretPlaceholder = this.doc.createTextNode(wysihtml.INVISIBLE_SPACE);
          dom.insert(newCaretPlaceholder).after(caretPlaceholder[0]);
          newRange.setStartBefore(newCaretPlaceholder);
          newRange.setEndAfter(newCaretPlaceholder);
        }
        this.setSelection(newRange);
        for (var i = caretPlaceholder.length; i--;) {
          caretPlaceholder[i].parentNode.removeChild(caretPlaceholder[i]);
        }

      } else {
        // fallback for when all hell breaks loose
        this.contain.focus();
      }

      if (restoreScrollPosition) {
        body.scrollTop  = oldScrollTop;
        body.scrollLeft = oldScrollLeft;
      }

      // Remove it again, just to make sure that the placeholder is definitely out of the dom tree
      try {
        caretPlaceholder.parentNode.removeChild(caretPlaceholder);
      } catch(e2) {}
    },

    set: function(node, offset) {
      var newRange = rangy.createRange(this.doc);
      newRange.setStart(node, offset || 0);
      this.setSelection(newRange);
    },

    /**
     * Insert html at the caret or selection position and move the cursor after the inserted html
     * Replaces selection content if present
     *
     * @param {String} html HTML string to insert
     * @example
     *    selection.insertHTML("<p>foobar</p>");
     */
    insertHTML: function(html) {
      var range     = this.getRange(),
          node = this.doc.createElement('DIV'),
          fragment = this.doc.createDocumentFragment(),
          lastChild, lastEditorElement;

      if (range) {
        range.deleteContents();
        node.innerHTML = html;
        lastChild = node.lastChild;

        while (node.firstChild) {
          fragment.appendChild(node.firstChild);
        }
        range.insertNode(fragment);

        lastEditorElement = this.contain.lastChild;
        while (lastEditorElement && lastEditorElement.nodeType === 3 && lastEditorElement.previousSibling && (/^\s*$/).test(lastEditorElement.data)) {
          lastEditorElement = lastEditorElement.previousSibling;
        }

        if (lastChild) {
          // fixes some pad cases mostly on webkit where last nr is needed
          if (lastEditorElement && lastChild === lastEditorElement && lastChild.nodeType === 1) {
            this.contain.appendChild(this.doc.createElement('br'));
          }
          this.setAfter(lastChild);
        }
      }
    },

    /**
     * Insert a node at the caret position and move the cursor behind it
     *
     * @param {Object} node HTML string to insert
     * @example
     *    selection.insertNode(document.createTextNode("foobar"));
     */
    insertNode: function(node) {
      var range = this.getRange();
      if (range) {
        range.deleteContents();
        range.insertNode(node);
      }
    },

    canAppendChild: function (node) {
      var anchorNode, anchorNodeTagNameLower,
          voidElements = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"],
          range = this.getRange();

      anchorNode = node || range.startContainer;

      if (anchorNode) {
        anchorNodeTagNameLower = (anchorNode.tagName || anchorNode.nodeName).toLowerCase();
      }

      return voidElements.indexOf(anchorNodeTagNameLower) === -1;
    },

    splitElementAtCaret: function (element, insertNode) {
      var sel = this.getSelection(),
          range, contentAfterRangeStart,
          firstChild, lastChild, childNodes;

      if (sel.rangeCount > 0) {
        range = sel.getRangeAt(0).cloneRange(); // Create a copy of the selection range to work with

        range.setEndAfter(element); // Place the end of the range after the element
        contentAfterRangeStart = range.extractContents(); // Extract the contents of the element after the caret into a fragment

        childNodes = contentAfterRangeStart.childNodes;

        // Empty elements are cleaned up from extracted content
        for (var i = childNodes.length; i --;) {
          if (!wysihtml.dom.domNode(childNodes[i]).is.visible()) {
            contentAfterRangeStart.removeChild(childNodes[i]);
          }
        }

        element.parentNode.insertBefore(contentAfterRangeStart, element.nextSibling);

        if (insertNode) {
          firstChild = insertNode.firstChild || insertNode;
          lastChild = insertNode.lastChild || insertNode;

          element.parentNode.insertBefore(insertNode, element.nextSibling);

          // Select inserted node contents
          if (firstChild && lastChild) {
             range.setStartBefore(firstChild);
             range.setEndAfter(lastChild);
             this.setSelection(range);
          }
        } else {
          range.setStartAfter(element);
          range.setEndAfter(element);
        }

        if (!wysihtml.dom.domNode(element).is.visible()) {
          if (wysihtml.dom.getTextContent(element) === '') {
            element.parentNode.removeChild(element);
          } else {
            element.parentNode.replaceChild(this.doc.createTextNode(" "), element);
          }
        }


      }
    },

    /**
     * Wraps current selection with the given node
     *
     * @param {Object} node The node to surround the selected elements with
     */
    surround: function(nodeOptions) {
      var ranges = this.getOwnRanges(),
          node, nodes = [];
      if (ranges.length == 0) {
        return nodes;
      }

      for (var i = ranges.length; i--;) {
        node = this.doc.createElement(nodeOptions.nodeName);
        nodes.push(node);
        if (nodeOptions.className) {
          node.className = nodeOptions.className;
        }
        if (nodeOptions.cssStyle) {
          node.setAttribute('style', nodeOptions.cssStyle);
        }
        try {
          // This only works when the range boundaries are not overlapping other elements
          ranges[i].surroundContents(node);
          this.selectNode(node);
        } catch(e) {
          // fallback
          node.appendChild(ranges[i].extractContents());
          ranges[i].insertNode(node);
        }
      }
      return nodes;
    },

    /**
     * Scroll the current caret position into the view
     * FIXME: This is a bit hacky, there might be a smarter way of doing this
     *
     * @example
     *    selection.scrollIntoView();
     */
    scrollIntoView: function() {
      var doc           = this.doc,
          tolerance     = 5, // px
          hasScrollBars = doc.documentElement.scrollHeight > doc.documentElement.offsetHeight,
          tempElement   = doc._wysihtmlScrollIntoViewElement = doc._wysihtmlScrollIntoViewElement || (function() {
            var element = doc.createElement("span");
            // The element needs content in order to be able to calculate it's position properly
            element.innerHTML = wysihtml.INVISIBLE_SPACE;
            return element;
          })(),
          offsetTop;

      if (hasScrollBars) {
        this.insertNode(tempElement);
        offsetTop = _getCumulativeOffsetTop(tempElement);
        tempElement.parentNode.removeChild(tempElement);
        if (offsetTop >= (doc.body.scrollTop + doc.documentElement.offsetHeight - tolerance)) {
          doc.body.scrollTop = offsetTop;
        }
      }
    },

    /**
     * Select line where the caret is in
     */
    selectLine: function() {
      var r = rangy.createRange();
      if (wysihtml.browser.supportsSelectionModify()) {
        this._selectLine_W3C();
      } else if (r.nativeRange && r.nativeRange.getBoundingClientRect) {
        // For IE Edge as it ditched the old api and did not fully implement the new one (as expected)
        this._selectLineUniversal();
      }
    },

    includeRangyRangeHelpers: function() {
      var s = this.getSelection(),
          r = s.getRangeAt(0),
          isHelperNode = function(node) {
            return (node && node.nodeType === 1 && node.classList.contains('rangySelectionBoundary'));
          },
          getNodeLength = function (node) {
            if (node.nodeType === 1) {
              return node.childNodes && node.childNodes.length || 0;
            } else {
              return node.data && node.data.length || 0;
            }
          },
          anode = s.anchorNode.nodeType === 1 ? s.anchorNode.childNodes[s.anchorOffset] : s.anchorNode,
          fnode = s.focusNode.nodeType === 1 ? s.focusNode.childNodes[s.focusOffset] : s.focusNode;

      if (fnode && s.focusOffset === getNodeLength(fnode) && fnode.nextSibling && isHelperNode(fnode.nextSibling)) {
        r.setEndAfter(fnode.nextSibling);
      }
      if (anode && s.anchorOffset === 0 && anode.previousSibling && isHelperNode(anode.previousSibling)) {
        r.setStartBefore(anode.previousSibling);
      }
      r.select();
    },

    /**
     * See https://developer.mozilla.org/en/DOM/Selection/modify
     */
    _selectLine_W3C: function() {
      var selection = this.win.getSelection(),
          initialBoundry = [selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset];

      selection.modify("move", "left", "lineboundary");
      selection.modify("extend", "right", "lineboundary");

      // IF lineboundary extending did not change selection try universal fallback (FF fails sometimes without a reason)
      if (selection.anchorNode === initialBoundry[0] &&
          selection.anchorOffset === initialBoundry[1] &&
          selection.focusNode === initialBoundry[2] &&
          selection.focusOffset === initialBoundry[3]
      ) {
        this._selectLineUniversal();
      } else {
        this.includeRangyRangeHelpers();
      }
    },

    // collapses selection to current line beginning or end
    toLineBoundary: function (location, collapse) {
      collapse = (typeof collapse === 'undefined') ? false : collapse;
      if (wysihtml.browser.supportsSelectionModify()) {
        var selection = this.win.getSelection();

        selection.modify("extend", location, "lineboundary");
        if (collapse) {
          if (location === "left") {
            selection.collapseToStart();
          } else if (location === "right") {
            selection.collapseToEnd();
          }
        }
      }
    },

    getRangeRect: function(r) {
      var textNode = this.doc.createTextNode("i"),
          testNode = this.doc.createTextNode("i"),
          rect, cr;

      /*testNode.style.visibility = "hidden";
      testNode.style.width = "0px";
      testNode.style.display = "inline-block";
      testNode.style.overflow = "hidden";
      testNode.appendChild(textNode);*/

      if (r.collapsed) {
        r.insertNode(testNode);
        r.selectNode(testNode);
        rect = r.nativeRange.getBoundingClientRect();
        r.deleteContents();

      } else {
        rect = r.nativeRange.getBoundingClientRect();
      }

      return rect;

    },

    _selectLineUniversal: function() {
      var s = this.getSelection(),
          r = s.getRangeAt(0),
          rect,
          startRange, endRange, testRange,
          count = 0,
          amount, testRect, found,
          that = this,
          isLineBreakingElement = function(el) {
            return el && el.nodeType === 1 && (that.win.getComputedStyle(el).display === "block" || wysihtml.lang.array(['BR', 'HR']).contains(el.nodeName));
          },
          prevNode = function(node) {
            var pnode = node;
            if (pnode) {
              while (pnode && ((pnode.nodeType === 1 && pnode.classList.contains('rangySelectionBoundary')) || (pnode.nodeType === 3 && (/^\s*$/).test(pnode.data)))) {
                pnode = pnode.previousSibling;
              }
            }
            return pnode;
          };

      startRange = r.cloneRange();
      endRange = r.cloneRange();

      if (r.collapsed) {
        // Collapsed state can not have a bounding rect. Thus need to expand it at least by 1 character first while not crossing line boundary
        // TODO: figure out a shorter and more readable way
        if (r.startContainer.nodeType === 3 && r.startOffset < r.startContainer.data.length) {
          r.moveEnd('character', 1);
        } else if (r.startContainer.nodeType === 1 && r.startContainer.childNodes[r.startOffset] && r.startContainer.childNodes[r.startOffset].nodeType === 3 && r.startContainer.childNodes[r.startOffset].data.length > 0) {
          r.moveEnd('character', 1);
        } else if (
          r.startOffset > 0 &&
          (
            r.startContainer.nodeType === 3 ||
            (
              r.startContainer.nodeType === 1 &&
              !isLineBreakingElement(prevNode(r.startContainer.childNodes[r.startOffset - 1]))
            )
          )
        ) {
          r.moveStart('character', -1);
        }
      }
      if (!r.collapsed) {
        r.insertNode(this.doc.createTextNode(wysihtml.INVISIBLE_SPACE));
      }

      // Is probably just empty line as can not be expanded
      rect = r.nativeRange.getBoundingClientRect();
      // If startnode is not line break allready move the start position of range by -1 character until clientRect top changes;
      do {
        amount = r.moveStart('character', -1);
        testRect =  r.nativeRange.getBoundingClientRect();

        if (!testRect || Math.floor(testRect.top) !== Math.floor(rect.top)) {
          r.moveStart('character', 1);
          found = true;
        }
        count++;
      } while (amount !== 0 && !found && count < 2000);
      count = 0;
      found = false;
      rect = r.nativeRange.getBoundingClientRect();

      if (r.endContainer !== this.contain || (this.contain.lastChild && this.contain.childNodes[r.endOffset] !== this.contain.lastChild)) {
        do {
          amount = r.moveEnd('character', 1);
          testRect =  r.nativeRange.getBoundingClientRect();
          if (!testRect || Math.floor(testRect.bottom) !== Math.floor(rect.bottom)) {
            r.moveEnd('character', -1);

            // Fix a IE line end marked by linebreak element although caret is before it
            // If causes problems should be changed to be applied only to IE
            if (r.endContainer && r.endContainer.nodeType === 1 && r.endContainer.childNodes[r.endOffset] && r.endContainer.childNodes[r.endOffset].nodeType === 1 && r.endContainer.childNodes[r.endOffset].nodeName === "BR" && r.endContainer.childNodes[r.endOffset].previousSibling) {
              if (r.endContainer.childNodes[r.endOffset].previousSibling.nodeType === 1) {
                r.setEnd(r.endContainer.childNodes[r.endOffset].previousSibling, r.endContainer.childNodes[r.endOffset].previousSibling.childNodes.length);
              } else if (r.endContainer.childNodes[r.endOffset].previousSibling.nodeType === 3) {
                r.setEnd(r.endContainer.childNodes[r.endOffset].previousSibling, r.endContainer.childNodes[r.endOffset].previousSibling.data.length);
              }
            }
            found = true;
          }
          count++;
        } while (amount !== 0 && !found && count < 2000);
      }
      r.select();
      this.includeRangyRangeHelpers();
    },

    getText: function() {
      var selection = this.getSelection();
      return selection ? selection.toString() : "";
    },

    getNodes: function(nodeType, filter) {
      var range = this.getRange();
      if (range) {
        return range.getNodes(Array.isArray(nodeType) ? nodeType : [nodeType], filter);
      } else {
        return [];
      }
    },

    // Gets all the elements in selection with nodeType
    // Ignores the elements not belonging to current editable area
    // If filter is defined nodes must pass the filter function with true to be included in list
    getOwnNodes: function(nodeType, filter, splitBounds) {
      var ranges = this.getOwnRanges(),
          nodes = [];
      for (var r = 0, rmax = ranges.length; r < rmax; r++) {
        if (ranges[r]) {
          if (splitBounds) {
            ranges[r].splitBoundaries();
          }
          nodes = nodes.concat(ranges[r].getNodes(Array.isArray(nodeType) ? nodeType : [nodeType], filter));
        }
      }

      return nodes;
    },

    fixRangeOverflow: function(range) {
      if (this.contain && this.contain.firstChild && range) {
        var containment = range.compareNode(this.contain);
        if (containment !== 2) {
          if (containment === 1) {
            range.setStartBefore(this.contain.firstChild);
          }
          if (containment === 0) {
            range.setEndAfter(this.contain.lastChild);
          }
          if (containment === 3) {
            range.setStartBefore(this.contain.firstChild);
            range.setEndAfter(this.contain.lastChild);
          }
        } else if (this._detectInlineRangeProblems(range)) {
          var previousElementSibling = range.endContainer.previousElementSibling;
          if (previousElementSibling) {
            range.setEnd(previousElementSibling, this._endOffsetForNode(previousElementSibling));
          }
        }
      }
    },

    _endOffsetForNode: function(node) {
      var range = document.createRange();
      range.selectNodeContents(node);
      return range.endOffset;
    },

    _detectInlineRangeProblems: function(range) {
      var position = dom.compareDocumentPosition(range.startContainer, range.endContainer);
      return (
        range.endOffset == 0 &&
        position & 4 //Node.DOCUMENT_POSITION_FOLLOWING
      );
    },

    getRange: function(dontFix) {
      var selection = this.getSelection(),
          range = selection && selection.rangeCount && selection.getRangeAt(0);

      if (dontFix !== true) {
        this.fixRangeOverflow(range);
      }

      return range;
    },

    getOwnUneditables: function() {
      var allUneditables = dom.query(this.contain, '.' + this.unselectableClass),
          deepUneditables = dom.query(allUneditables, '.' + this.unselectableClass);

      return wysihtml.lang.array(allUneditables).without(deepUneditables);
    },

    // Returns an array of ranges that belong only to this editable
    // Needed as uneditable block in contenteditabel can split range into pieces
    // If manipulating content reverse loop is usually needed as manipulation can shift subsequent ranges
    getOwnRanges: function()  {
      var ranges = [],
          r = this.getRange(),
          tmpRanges;

      if (r) { ranges.push(r); }

      if (this.unselectableClass && this.contain && r) {
        var uneditables = this.getOwnUneditables(),
            tmpRange;
        if (uneditables.length > 0) {
          for (var i = 0, imax = uneditables.length; i < imax; i++) {
            tmpRanges = [];
            for (var j = 0, jmax = ranges.length; j < jmax; j++) {
              if (ranges[j]) {
                switch (ranges[j].compareNode(uneditables[i])) {
                  case 2:
                    // all selection inside uneditable. remove
                  break;
                  case 3:
                    //section begins before and ends after uneditable. spilt
                    tmpRange = ranges[j].cloneRange();
                    tmpRange.setEndBefore(uneditables[i]);
                    tmpRanges.push(tmpRange);

                    tmpRange = ranges[j].cloneRange();
                    tmpRange.setStartAfter(uneditables[i]);
                    tmpRanges.push(tmpRange);
                  break;
                  default:
                    // in all other cases uneditable does not touch selection. dont modify
                    tmpRanges.push(ranges[j]);
                }
              }
              ranges = tmpRanges;
            }
          }
        }
      }
      return ranges;
    },

    getSelection: function() {
      return rangy.getSelection(this.win);
    },

    // Sets selection in document to a given range
    // Set selection method detects if it fails to set any selection in document and returns null on fail
    // (especially needed in webkit where some ranges just can not create selection for no reason)
    setSelection: function(range) {
      var selection = rangy.getSelection(this.win);
      selection.setSingleRange(range);
      return (selection && selection.anchorNode && selection.focusNode) ? selection : null;
    },



    // Webkit has an ancient error of not selecting all contents when uneditable block element is first or last in editable area
    selectAll: function() {
      var range = this.createRange(),
          composer = this.composer,
          that = this,
          blankEndNode = getWebkitSelectionFixNode(this.composer.element),
          blankStartNode = getWebkitSelectionFixNode(this.composer.element),
          s;

      var doSelect = function() {
        range.setStart(composer.element, 0);
        range.setEnd(composer.element, composer.element.childNodes.length);
        s = that.setSelection(range);
      };

      var notSelected = function() {
        return !s || (s.nativeSelection && s.nativeSelection.type && (s.nativeSelection.type === "Caret" || s.nativeSelection.type === "None"));
      }

      wysihtml.dom.removeInvisibleSpaces(this.composer.element);
      doSelect();

      if (this.composer.element.firstChild && notSelected())  {
        // Try fixing end
        this.composer.element.appendChild(blankEndNode);
        doSelect();

        if (notSelected()) {
          // Remove end fix
          blankEndNode.parentNode.removeChild(blankEndNode);

          // Try fixing beginning
          this.composer.element.insertBefore(blankStartNode, this.composer.element.firstChild);
          doSelect();

          if (notSelected()) {
            // Try fixing both
            this.composer.element.appendChild(blankEndNode);
            doSelect();
          }
        }
      }
    },

    createRange: function() {
      return rangy.createRange(this.doc);
    },

    isCollapsed: function() {
        return this.getSelection().isCollapsed;
    },

    getHtml: function() {
      return this.getSelection().toHtml();
    },

    getPlainText: function () {
      return this.getSelection().toString();
    },

    isEndToEndInNode: function(nodeNames) {
      var range = this.getRange(),
          parentElement = range.commonAncestorContainer,
          startNode = range.startContainer,
          endNode = range.endContainer;


        if (parentElement.nodeType === wysihtml.TEXT_NODE) {
          parentElement = parentElement.parentNode;
        }

        if (startNode.nodeType === wysihtml.TEXT_NODE && !(/^\s*$/).test(startNode.data.substr(range.startOffset))) {
          return false;
        }

        if (endNode.nodeType === wysihtml.TEXT_NODE && !(/^\s*$/).test(endNode.data.substr(range.endOffset))) {
          return false;
        }

        while (startNode && startNode !== parentElement) {
          if (startNode.nodeType !== wysihtml.TEXT_NODE && !wysihtml.dom.contains(parentElement, startNode)) {
            return false;
          }
          if (wysihtml.dom.domNode(startNode).prev({ignoreBlankTexts: true})) {
            return false;
          }
          startNode = startNode.parentNode;
        }

        while (endNode && endNode !== parentElement) {
          if (endNode.nodeType !== wysihtml.TEXT_NODE && !wysihtml.dom.contains(parentElement, endNode)) {
            return false;
          }
          if (wysihtml.dom.domNode(endNode).next({ignoreBlankTexts: true})) {
            return false;
          }
          endNode = endNode.parentNode;
        }

        return (wysihtml.lang.array(nodeNames).contains(parentElement.nodeName)) ? parentElement : false;
    },

    isInThisEditable: function() {
      var sel = this.getSelection(),
          fnode = sel.focusNode,
          anode = sel.anchorNode;

      // In IE node contains will not work for textnodes, thus taking parentNode
      if (fnode && fnode.nodeType !== 1) {
        fnode = fnode.parentNode;
      }

      if (anode && anode.nodeType !== 1) {
        anode = anode.parentNode;
      }

      return anode && fnode &&
             (wysihtml.dom.contains(this.composer.element, fnode) || this.composer.element === fnode) &&
             (wysihtml.dom.contains(this.composer.element, anode) || this.composer.element === anode);
    },

    deselect: function() {
      var sel = this.getSelection();
      sel && sel.removeAllRanges();
    }
  });

})(wysihtml);

/**
 * Rich Text Query/Formatting Commands
 *
 * @example
 *    var commands = new wysihtml.Commands(editor);
 */
wysihtml.Commands = Base.extend(
  /** @scope wysihtml.Commands.prototype */ {
  constructor: function(editor) {
    this.editor   = editor;
    this.composer = editor.composer;
    this.doc      = this.composer.doc;
  },

  /**
   * Check whether the browser supports the given command
   *
   * @param {String} command The command string which to check (eg. "bold", "italic", "insertUnorderedList")
   * @example
   *    commands.supports("createLink");
   */
  support: function(command) {
    return wysihtml.browser.supportsCommand(this.doc, command);
  },

  /**
   * Check whether the browser supports the given command
   *
   * @param {String} command The command string which to execute (eg. "bold", "italic", "insertUnorderedList")
   * @param {String} [value] The command value parameter, needed for some commands ("createLink", "insertImage", ...), optional for commands that don't require one ("bold", "underline", ...)
   * @example
   *    commands.exec("insertImage", "http://a1.twimg.com/profile_images/113868655/schrei_twitter_reasonably_small.jpg");
   */
  exec: function(command, value) {
    var obj     = wysihtml.commands[command],
        args    = wysihtml.lang.array(arguments).get(),
        method  = obj && obj.exec,
        result  = null;

    // If composer ahs placeholder unset it before command
    // Do not apply on commands that are behavioral 
    if (this.composer.hasPlaceholderSet() && !wysihtml.lang.array(['styleWithCSS', 'enableObjectResizing', 'enableInlineTableEditing']).contains(command)) {
      this.composer.element.innerHTML = "";
      this.composer.selection.selectNode(this.composer.element);
    }

    this.editor.fire("beforecommand:composer");

    if (method) {
      args.unshift(this.composer);
      result = method.apply(obj, args);
    } else {
      try {
        // try/catch for buggy firefox
        result = this.doc.execCommand(command, false, value);
      } catch(e) {}
    }

    this.editor.fire("aftercommand:composer");
    return result;
  },

  remove: function(command, commandValue) {
    var obj     = wysihtml.commands[command],
        args    = wysihtml.lang.array(arguments).get(),
        method  = obj && obj.remove;
    if (method) {
      args.unshift(this.composer);
      return method.apply(obj, args);
    }
  },

  /**
   * Check whether the current command is active
   * If the caret is within a bold text, then calling this with command "bold" should return true
   *
   * @param {String} command The command string which to check (eg. "bold", "italic", "insertUnorderedList")
   * @param {String} [commandValue] The command value parameter (eg. for "insertImage" the image src)
   * @return {Boolean} Whether the command is active
   * @example
   *    var isCurrentSelectionBold = commands.state("bold");
   */
  state: function(command, commandValue) {
    var obj     = wysihtml.commands[command],
        args    = wysihtml.lang.array(arguments).get(),
        method  = obj && obj.state;
    if (method) {
      args.unshift(this.composer);
      return method.apply(obj, args);
    } else {
      try {
        // try/catch for buggy firefox
        return this.doc.queryCommandState(command);
      } catch(e) {
        return false;
      }
    }
  },

  /* Get command state parsed value if command has stateValue parsing function */
  stateValue: function(command) {
    var obj     = wysihtml.commands[command],
        args    = wysihtml.lang.array(arguments).get(),
        method  = obj && obj.stateValue;
    if (method) {
      args.unshift(this.composer);
      return method.apply(obj, args);
    } else {
      return false;
    }
  }
});

(function(wysihtml) {

  var nodeOptions = {
    nodeName: "A",
    toggle: false
  };

  function getOptions(value) {
    var options = typeof value === 'object' ? value : {'href': value};
    return wysihtml.lang.object({}).merge(nodeOptions).merge({'attribute': value}).get();
  }

  wysihtml.commands.createLink  = {
    exec: function(composer, command, value) {
      var opts = getOptions(value);

      if (composer.selection.isCollapsed() && !this.state(composer, command)) {
        var textNode = composer.doc.createTextNode(opts.attribute.href);
        composer.selection.insertNode(textNode);
        composer.selection.selectNode(textNode);
      }
      wysihtml.commands.formatInline.exec(composer, command, opts);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatInline.state(composer, command, nodeOptions);
    }
  };

})(wysihtml);

/* Formatblock
 * Is used to insert block level elements 
 * It tries to solve the case that some block elements should not contain other block level elements (h1-6, p, ...)
 * 
*/
(function(wysihtml) {

  var dom = wysihtml.dom,
      // When the caret is within a H1 and the H4 is invoked, the H1 should turn into H4
      // instead of creating a H4 within a H1 which would result in semantically invalid html
      UNNESTABLE_BLOCK_ELEMENTS = "h1, h2, h3, h4, h5, h6, p, pre",
      BLOCK_ELEMENTS = "h1, h2, h3, h4, h5, h6, p, pre, div, blockquote",
      INLINE_ELEMENTS = "b, big, i, small, tt, abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var, a, bdo, br, q, span, sub, sup, button, label, textarea, input, select, u";

  function correctOptionsForSimilarityCheck(options) {
    return {
      nodeName: options.nodeName || null,
      className: (!options.classRegExp) ? options.className || null : null,
      classRegExp: options.classRegExp || null,
      styleProperty: options.styleProperty || null
    };
  }

  function getRangeNode(node, offset) {
    if (node.nodeType === 3) {
      return node;
    } else {
      return node.childNodes[offset] || node;
    }
  }

  // Returns if node is a line break
  function isBr(n) {
    return n && n.nodeType === 1 && n.nodeName === "BR";
  }

  // Is block level element
  function isBlock(n, composer) {
    return n && n.nodeType === 1 && composer.win.getComputedStyle(n).display === "block";
  }

  // Returns if node is the rangy selection bookmark element (that must not be taken into account in most situatons and is removed on selection restoring)
  function isBookmark(n) {
    return n && n.nodeType === 1 && n.classList.contains('rangySelectionBoundary');
  }

  // Is line breaking node
  function isLineBreaking(n, composer) {
    return isBr(n) || isBlock(n, composer);
  }

  // Removes empty block level elements
  function cleanup(composer, newBlockElements) {
    wysihtml.dom.removeInvisibleSpaces(composer.element);
    var container = composer.element,
        allElements = container.querySelectorAll(BLOCK_ELEMENTS),
        noEditQuery = composer.config.classNames.uneditableContainer + ([""]).concat(BLOCK_ELEMENTS.split(',')).join(", " + composer.config.classNames.uneditableContainer + ' '),
        uneditables = container.querySelectorAll(noEditQuery),
        elements = wysihtml.lang.array(allElements).without(uneditables), // Lets not touch uneditable elements and their contents
        nbIdx;

    for (var i = elements.length; i--;) {
      if (elements[i].innerHTML.replace(/[\uFEFF]/g, '') === "" && (newBlockElements.length === 0 || elements[i] !== newBlockElements[newBlockElements.length - 1])) {
        // If cleanup removes some new block elements. remove them from newblocks array too
        nbIdx = wysihtml.lang.array(newBlockElements).indexOf(elements[i]);
        if (nbIdx > -1) {
          newBlockElements.splice(nbIdx, 1);
        }
        elements[i].parentNode.removeChild(elements[i]);
      }
    }
    
    return newBlockElements;
  }

  function defaultNodeName(composer) {
    return composer.config.useLineBreaks ? "DIV" : "P";
  }

  // The outermost un-nestable block element parent of from node
  function findOuterBlock(node, container, allBlocks) {
    var n = node,
        block = null;
        
    while (n && container && n !== container) {
      if (n.nodeType === 1 && n.matches(allBlocks ? BLOCK_ELEMENTS : UNNESTABLE_BLOCK_ELEMENTS)) {
        block = n;
      }
      n = n.parentNode;
    }

    return block;
  }

  // Clone for splitting the inner inline element out of its parent inline elements context
  // For example if selection is in bold and italic, clone the outer nodes and wrap these around content and return
  function cloneOuterInlines(node, container) {
    var n = node,
        innerNode,
        parentNode,
        el = null,
        el2;

    while (n && container && n !== container) {
      if (n.nodeType === 1 && n.matches(INLINE_ELEMENTS)) {
        parentNode = n;
        if (el === null) {
          el = n.cloneNode(false);
          innerNode = el;
        } else {
          el2 = n.cloneNode(false);
          el2.appendChild(el);
          el = el2;
        }
      }
      n = n.parentNode;
    }

    return {
      parent: parentNode,
      outerNode: el,
      innerNode: innerNode
    };
  }

  // Formats an element according to options nodeName, className, styleProperty, styleValue
  // If element is not defined, creates new element
  // if opotions is null, remove format instead
  function applyOptionsToElement(element, options, composer) {

    if (!element) {
      element = composer.doc.createElement(options.nodeName || defaultNodeName(composer));
      // Add invisible space as otherwise webkit cannot set selection or range to it correctly
      element.appendChild(composer.doc.createTextNode(wysihtml.INVISIBLE_SPACE));
    }

    if (options.nodeName && element.nodeName !== options.nodeName) {
      element = dom.renameElement(element, options.nodeName);
    }

    // Remove similar classes before applying className
    if (options.classRegExp) {
      element.className = element.className.replace(options.classRegExp, "");
    }
    if (options.className) {
      element.classList.add(options.className);
    }

    if (options.styleProperty && typeof options.styleValue !== "undefined") {
      element.style[wysihtml.browser.fixStyleKey(options.styleProperty)] = options.styleValue;
    }

    return element;
  }

  // Unsets element properties by options
  // If nodename given and matches current element, element is unwrapped or converted to default node (depending on presence of class and style attributes)
  function removeOptionsFromElement(element, options, composer) {
    var style, classes,
        prevNode = element.previousSibling,
        nextNode = element.nextSibling,
        unwrapped = false;

    if (options.styleProperty) {
      element.style[wysihtml.browser.fixStyleKey(options.styleProperty)] = '';
    }
    if (options.className) {
      element.classList.remove(options.className);
    }

    if (options.classRegExp) {
      element.className = element.className.replace(options.classRegExp, "");
    }

    // Clean up blank class attribute
    if (element.getAttribute('class') !== null && element.getAttribute('class').trim() === "") {
      element.removeAttribute('class');
    }

    if (options.nodeName && element.nodeName.toLowerCase() === options.nodeName.toLowerCase()) {
      style = element.getAttribute('style');
      if (!style || style.trim() === '') {
        dom.unwrap(element);
        unwrapped = true;
      } else {
        element = dom.renameElement(element, defaultNodeName(composer));
      }
    }

    // Clean up blank style attribute
    if (element.getAttribute('style') !== null && element.getAttribute('style').trim() === "") {
      element.removeAttribute('style');
    }

    if (unwrapped) {
      applySurroundingLineBreaks(prevNode, nextNode, composer);
    }
  }

  // Unwraps block level elements from inside content
  // Useful as not all block level elements can contain other block-levels
  function unwrapBlocksFromContent(element) {
    var blocks = element.querySelectorAll(BLOCK_ELEMENTS) || [], // Find unnestable block elements in extracted contents
        nextEl, prevEl;

    for (var i = blocks.length; i--;) {
      nextEl = wysihtml.dom.domNode(blocks[i]).next({nodeTypes: [1,3], ignoreBlankTexts: true}),
      prevEl = wysihtml.dom.domNode(blocks[i]).prev({nodeTypes: [1,3], ignoreBlankTexts: true});
      
      if (nextEl && nextEl.nodeType !== 1 && nextEl.nodeName !== 'BR') {
        if ((blocks[i].innerHTML || blocks[i].nodeValue || '').trim() !== '') {
          blocks[i].parentNode.insertBefore(blocks[i].ownerDocument.createElement('BR'), nextEl);
        }
      }
      if (nextEl && nextEl.nodeType !== 1 && nextEl.nodeName !== 'BR') {
        if ((blocks[i].innerHTML || blocks[i].nodeValue || '').trim() !== '') {
          blocks[i].parentNode.insertBefore(blocks[i].ownerDocument.createElement('BR'), nextEl);
        }
      }
      wysihtml.dom.unwrap(blocks[i]);
    }
  }

  // Fix ranges that visually cover whole block element to actually cover the block
  function fixRangeCoverage(range, composer) {
    var node,
        start = range.startContainer,
        end = range.endContainer;

    // If range has only one childNode and it is end to end the range, extend the range to contain the container element too
    // This ensures the wrapper node is modified and optios added to it
    if (start && start.nodeType === 1 && start === end) {
      if (start.firstChild === start.lastChild && range.endOffset === 1) {
        if (start !== composer.element && start.nodeName !== 'LI' && start.nodeName !== 'TD') {
          range.setStartBefore(start);
          range.setEndAfter(end);
        }
      }
      return;
    }

    // If range starts outside of node and ends inside at textrange and covers the whole node visually, extend end to cover the node end too
    if (start && start.nodeType === 1 && end.nodeType === 3) {
      if (start.firstChild === end && range.endOffset === end.data.length) {
        if (start !== composer.element && start.nodeName !== 'LI' && start.nodeName !== 'TD') {
          range.setEndAfter(start);
        }
      }
      return;
    }
    
    // If range ends outside of node and starts inside at textrange and covers the whole node visually, extend start to cover the node start too
    if (end && end.nodeType === 1 && start.nodeType === 3) {
      if (end.firstChild === start && range.startOffset === 0) {
        if (end !== composer.element && end.nodeName !== 'LI' && end.nodeName !== 'TD') {
          range.setStartBefore(end);
        }
      }
      return;
    }

    // If range covers a whole textnode and the textnode is the only child of node, extend range to node 
    if (start && start.nodeType === 3 && start === end && start.parentNode.childNodes.length === 1) {
      if (range.endOffset == end.data.length && range.startOffset === 0) {
        node = start.parentNode;
        if (node !== composer.element && node.nodeName !== 'LI' && node.nodeName !== 'TD') {
          range.setStartBefore(node);
          range.setEndAfter(node);
        }
      }
      return;
    }
  }
  
  // Scans ranges array for insertion points that are not allowed to insert block tags fixes/splits illegal ranges
  // Some places do not allow block level elements inbetween (inside ul and outside li)
  // TODO: might need extending for other nodes besides li (maybe dd,dl,dt)
  function fixNotPermittedInsertionPoints(ranges) {
    var newRanges = [],
        lis, j, maxj, tmpRange, rangePos, closestLI;
        
    for (var i = 0, maxi = ranges.length; i < maxi; i++) {
      
      // Fixes range start and end positions if inside UL or OL element (outside of LI)
      if (ranges[i].startContainer.nodeType === 1 && ranges[i].startContainer.matches('ul, ol')) {
        ranges[i].setStart(ranges[i].startContainer.childNodes[ranges[i].startOffset], 0);
      }
      if (ranges[i].endContainer.nodeType === 1 && ranges[i].endContainer.matches('ul, ol')) {
        closestLI = ranges[i].endContainer.childNodes[Math.max(ranges[i].endOffset - 1, 0)];
        if (closestLI.childNodes) {
          ranges[i].setEnd(closestLI, closestLI.childNodes.length);
        }
      }

      // Get all LI eleemnts in selection (fully or partially covered)
      // And make sure ranges are either inside LI or outside UL/OL
      // Split and add new ranges as needed to cover same range content
      // TODO: Needs improvement to accept DL, DD, DT
      lis = ranges[i].getNodes([1], function(node) {
        return node.nodeName === "LI";
      });
      if (lis.length > 0) {
      
        for (j = 0, maxj = lis.length; j < maxj; j++) {
          rangePos = ranges[i].compareNode(lis[j]);

          // Fixes start of range that crosses LI border
          if (rangePos === ranges[i].NODE_AFTER || rangePos === ranges[i].NODE_INSIDE) {
            // Range starts before and ends inside the node

            tmpRange = ranges[i].cloneRange();
            closestLI = wysihtml.dom.domNode(lis[j]).prev({nodeTypes: [1]});
            
            if (closestLI) {
              tmpRange.setEnd(closestLI, closestLI.childNodes.length);
            } else if (lis[j].closest('ul, ol')) {
              tmpRange.setEndBefore(lis[j].closest('ul, ol'));
            } else {
              tmpRange.setEndBefore(lis[j]);
            }
            newRanges.push(tmpRange);
            ranges[i].setStart(lis[j], 0);
          }
          
          // Fixes end of range that crosses li border
          if (rangePos === ranges[i].NODE_BEFORE || rangePos === ranges[i].NODE_INSIDE) {
            // Range starts inside the node and ends after node
            
            tmpRange = ranges[i].cloneRange();
            tmpRange.setEnd(lis[j], lis[j].childNodes.length);
            newRanges.push(tmpRange);
            
            // Find next LI in list and if present set range to it, else 
            closestLI = wysihtml.dom.domNode(lis[j]).next({nodeTypes: [1]});
            if (closestLI) {
              ranges[i].setStart(closestLI, 0);
            } else if (lis[j].closest('ul, ol')) {
              ranges[i].setStartAfter(lis[j].closest('ul, ol'));
            } else {
              ranges[i].setStartAfter(lis[j]);
            } 
          }
        }
        newRanges.push(ranges[i]);
      } else {
        newRanges.push(ranges[i]);
      }
    }
    return newRanges;
  }
  
  // Return options object with nodeName set if original did not have any
  // Node name is set to local or global default
  function getOptionsWithNodename(options, defaultName, composer) {
    var correctedOptions = (options) ? wysihtml.lang.object(options).clone(true) : null;
    if (correctedOptions) {  
      correctedOptions.nodeName = correctedOptions.nodeName || defaultName || defaultNodeName(composer);
    }
    return correctedOptions;
  }
  
  // Injects document fragment to range ensuring outer elements are split to a place where block elements are allowed to be inserted
  // Also wraps empty clones of split parent tags around fragment to keep formatting
  // If firstOuterBlock is given assume that instead of finding outer (useful for solving cases of some blocks are allowed into others while others are not)
  function injectFragmentToRange(fragment, range, composer, firstOuterBlock) {
    var rangeStartContainer = range.startContainer,
        firstOuterBlock = firstOuterBlock || findOuterBlock(rangeStartContainer, composer.element, true),
        outerInlines, first, last, prev, next;
    
    if (firstOuterBlock) {
      // If selection starts inside un-nestable block, split-escape the unnestable point and insert node between
      first = fragment.firstChild;
      last = fragment.lastChild;

      composer.selection.splitElementAtCaret(firstOuterBlock, fragment);

      next = wysihtml.dom.domNode(last).next({nodeTypes: [1,3], ignoreBlankTexts: true});
      prev = wysihtml.dom.domNode(first).prev({nodeTypes: [1,3], ignoreBlankTexts: true});

      if (first && !isLineBreaking(first, composer) && prev && !isLineBreaking(prev, composer)) {
        first.parentNode.insertBefore(composer.doc.createElement('br'), first);
      }

      if (last && !isLineBreaking(last, composer) && next && !isLineBreaking(next, composer)) {
        next.parentNode.insertBefore(composer.doc.createElement('br'), next);
      }

    } else {
      // Ensure node does not get inserted into an inline where it is not allowed
      outerInlines = cloneOuterInlines(rangeStartContainer, composer.element);
      if (outerInlines.outerNode && outerInlines.innerNode && outerInlines.parent) {
        if (fragment.childNodes.length === 1) {
          while(fragment.firstChild.firstChild) {
            outerInlines.innerNode.appendChild(fragment.firstChild.firstChild);
          }
          fragment.firstChild.appendChild(outerInlines.outerNode);
        }
        composer.selection.splitElementAtCaret(outerInlines.parent, fragment);
      } else {
        var fc = fragment.firstChild,
            lc = fragment.lastChild;

        range.insertNode(fragment);
        // restore range position as it might get lost in webkit sometimes
        range.setStartBefore(fc);
        range.setEndAfter(lc);
      }
    }
  }
  
  // Removes all block formatting from range
  function clearRangeBlockFromating(range, closestBlockName, composer) {
    var r = range.cloneRange(),
        prevNode = getRangeNode(r.startContainer, r.startOffset).previousSibling,
        nextNode = getRangeNode(r.endContainer, r.endOffset).nextSibling,
        content = r.extractContents(),
        fragment = composer.doc.createDocumentFragment(),
        children, blocks,
        first = true;
        
    while(content.firstChild) {
      // Iterate over all selection content first level childNodes
      if (content.firstChild.nodeType === 1 && content.firstChild.matches(BLOCK_ELEMENTS)) {
        // If node is a block element
        // Split block formating and add new block to wrap caret
        
        unwrapBlocksFromContent(content.firstChild);
        children = wysihtml.dom.unwrap(content.firstChild);
        
        // Add line break before if needed
        if (children.length > 0) {
          if (
            (fragment.lastChild && (fragment.lastChild.nodeType !== 1 || !isLineBreaking(fragment.lastChild, composer))) ||
            (!fragment.lastChild && prevNode && (prevNode.nodeType !== 1 || isLineBreaking(prevNode, composer)))
          ){
            fragment.appendChild(composer.doc.createElement('BR'));
          }
        }
        
        for (var c = 0, cmax = children.length; c < cmax; c++) {
          fragment.appendChild(children[c]);
        }
        
        // Add line break after if needed
        if (children.length > 0) {
          if (fragment.lastChild.nodeType !== 1 || !isLineBreaking(fragment.lastChild, composer)) {
            if (nextNode || fragment.lastChild !== content.lastChild) {
              fragment.appendChild(composer.doc.createElement('BR'));
            }
          }
        }
        
      } else {
        fragment.appendChild(content.firstChild);
      }
      
      first = false;
    }
    blocks = wysihtml.lang.array(fragment.childNodes).get();
    injectFragmentToRange(fragment, r, composer);
    return blocks;
  }
  
  // When block node is inserted, look surrounding nodes and remove surplous linebreak tags (as block format breaks line itself)
  function removeSurroundingLineBreaks(prevNode, nextNode, composer) {
    var prevPrev = prevNode && wysihtml.dom.domNode(prevNode).prev({nodeTypes: [1,3], ignoreBlankTexts: true});
    if (isBr(nextNode)) {
      nextNode.parentNode.removeChild(nextNode);
    }
    if (isBr(prevNode) && (!prevPrev || prevPrev.nodeType !== 1 || composer.win.getComputedStyle(prevPrev).display !== "block")) {
      prevNode.parentNode.removeChild(prevNode);
    }
  }

  function applySurroundingLineBreaks(prevNode, nextNode, composer) {
    var prevPrev;

    if (prevNode && isBookmark(prevNode)) {
      prevNode = prevNode.previousSibling;
    }
    if (nextNode && isBookmark(nextNode)) {
      nextNode = nextNode.nextSibling;
    }

    prevPrev = prevNode && prevNode.previousSibling;

    if (prevNode && (prevNode.nodeType !== 1 || (composer.win.getComputedStyle(prevNode).display !== "block" && !isBr(prevNode))) && prevNode.parentNode) {
      prevNode.parentNode.insertBefore(composer.doc.createElement('br'), prevNode.nextSibling);
    }

    if (nextNode && (nextNode.nodeType !== 1 || composer.win.getComputedStyle(nextNode).display !== "block") && nextNode.parentNode) {
      nextNode.parentNode.insertBefore(composer.doc.createElement('br'), nextNode);
    }
  }

  var isWhitespaceBefore = function (textNode, offset) {
    var str = textNode.data ? textNode.data.slice(0, offset) : "";
    return (/^\s*$/).test(str);
  }

  var isWhitespaceAfter = function (textNode, offset) {
    var str = textNode.data ? textNode.data.slice(offset) : "";
    return (/^\s*$/).test(str);
  }

  var trimBlankTextsAndBreaks = function(fragment) {
    if (fragment) {
      while (fragment.firstChild && fragment.firstChild.nodeType === 3 && (/^\s*$/).test(fragment.firstChild.data) && fragment.lastChild !== fragment.firstChild) {
        fragment.removeChild(fragment.firstChild);
      }

      while (fragment.lastChild && fragment.lastChild.nodeType === 3 && (/^\s*$/).test(fragment.lastChild.data) && fragment.lastChild !== fragment.firstChild) {
        fragment.removeChild(fragment.lastChild);
      }

      if (fragment.firstChild && fragment.firstChild.nodeType === 1 && fragment.firstChild.nodeName === "BR" && fragment.lastChild !== fragment.firstChild) {
        fragment.removeChild(fragment.firstChild);
      }

      if (fragment.lastChild && fragment.lastChild.nodeType === 1 && fragment.lastChild.nodeName === "BR" && fragment.lastChild !== fragment.firstChild) {
        fragment.removeChild(fragment.lastChild);
      }
    }
  }

  // Wrap the range with a block level element
  // If element is one of unnestable block elements (ex: h2 inside h1), split nodes and insert between so nesting does not occur
  function wrapRangeWithElement(range, options, closestBlockName, composer) {
    var similarOptions = options ? correctOptionsForSimilarityCheck(options) : null,
        r = range.cloneRange(),
        rangeStartContainer = r.startContainer,
        startNode = getRangeNode(r.startContainer, r.startOffset),
        endNode = getRangeNode(r.endContainer, r.endOffset),
        prevNode = (r.startContainer === startNode && startNode.nodeType === 3 && !isWhitespaceBefore(startNode, r.startOffset)) ? startNode :  wysihtml.dom.domNode(startNode).prev({nodeTypes: [1,3], ignoreBlankTexts: true}),
        nextNode = (
          (
            r.endContainer.nodeType === 1 &&
            r.endContainer.childNodes[r.endOffset] === endNode &&
            (
              endNode.nodeType === 1 ||
              !isWhitespaceAfter(endNode, r.endOffset) &&
              !wysihtml.dom.domNode(endNode).is.rangyBookmark()
            )
          ) || (
            r.endContainer === endNode &&
            endNode.nodeType === 3 &&
            !isWhitespaceAfter(endNode, r.endOffset)
          )
        ) ? endNode : wysihtml.dom.domNode(endNode).next({nodeTypes: [1,3], ignoreBlankTexts: true}),
        content = r.extractContents(),
        fragment = composer.doc.createDocumentFragment(),
        similarOuterBlock = similarOptions ? wysihtml.dom.getParentElement(rangeStartContainer, similarOptions, null, composer.element) : null,
        splitAllBlocks = !closestBlockName || !options || (options.nodeName === "BLOCKQUOTE" && closestBlockName === "BLOCKQUOTE"),
        firstOuterBlock = similarOuterBlock || findOuterBlock(rangeStartContainer, composer.element, splitAllBlocks), // The outermost un-nestable block element parent of selection start
        wrapper, blocks, children,
        firstc, lastC;

    if (wysihtml.dom.domNode(nextNode).is.rangyBookmark()) {
      endNode = nextNode;
      nextNode = endNode.nextSibling;
    }

    trimBlankTextsAndBreaks(content);

    if (options && options.nodeName === "BLOCKQUOTE") {
      
      // If blockquote is to be inserted no quessing just add it as outermost block on line or selection
      var tmpEl = applyOptionsToElement(null, options, composer);
      tmpEl.appendChild(content);
      fragment.appendChild(tmpEl);
      blocks = [tmpEl];
      
    } else {

      if (!content.firstChild) {
        // IF selection is caret (can happen if line is empty) add format around tag 
        fragment.appendChild(applyOptionsToElement(null, options, composer));
      } else {

        while(content.firstChild) {
          // Iterate over all selection content first level childNodes
          
          if (content.firstChild.nodeType == 1 && content.firstChild.matches(BLOCK_ELEMENTS)) {
            
            // If node is a block element
            // Escape(split) block formatting at caret
            applyOptionsToElement(content.firstChild, options, composer);
            if (content.firstChild.matches(UNNESTABLE_BLOCK_ELEMENTS)) {
              unwrapBlocksFromContent(content.firstChild);
            }
            fragment.appendChild(content.firstChild);
            
          } else {
            
            // Wrap subsequent non-block nodes inside new block element
            wrapper = applyOptionsToElement(null, getOptionsWithNodename(options, closestBlockName, composer), composer);
            while(content.firstChild && (content.firstChild.nodeType !== 1 || !content.firstChild.matches(BLOCK_ELEMENTS))) {
              if (content.firstChild.nodeType == 1 && wrapper.matches(UNNESTABLE_BLOCK_ELEMENTS)) {
                unwrapBlocksFromContent(content.firstChild);
              }
              wrapper.appendChild(content.firstChild);
            }
            fragment.appendChild(wrapper);
          }
        }
      }

      blocks = wysihtml.lang.array(fragment.childNodes).get();
    }
    injectFragmentToRange(fragment, r, composer, firstOuterBlock);
    removeSurroundingLineBreaks(prevNode, nextNode, composer);

    // Fix webkit madness by inserting linebreak rangy after cursor marker to blank last block
    // (if it contains rangy bookmark, so selection can be restored later correctly)
    if (blocks.length > 0 &&
      (
        typeof blocks[blocks.length - 1].lastChild === "undefined" || wysihtml.dom.domNode(blocks[blocks.length - 1].lastChild).is.rangyBookmark()
      )
    ) {
      blocks[blocks.length - 1].appendChild(composer.doc.createElement('br'));
    }
    return blocks;
  }

  // Find closest block level element
  function getParentBlockNodeName(element, composer) {
    var parentNode = wysihtml.dom.getParentElement(element, {
          query: BLOCK_ELEMENTS
        }, null, composer.element);

    return (parentNode) ? parentNode.nodeName : null;
  }
  
  // Expands caret to cover the closest block that:
  //   * cannot contain other block level elements (h1-6,p, etc)
  //   * Has the same nodeName that is to be inserted
  //   * has insertingNodeName
  //   * is DIV if insertingNodeName is not present
  //
  // If nothing found selects the current line
  function expandCaretToBlock(composer, insertingNodeName) {
    var parent = wysihtml.dom.getParentElement(composer.selection.getOwnRanges()[0].startContainer, {
          query: UNNESTABLE_BLOCK_ELEMENTS + ', ' + (insertingNodeName ? insertingNodeName.toLowerCase() : 'div'),
        }, null, composer.element),
        range;

    if (parent) {
      range = composer.selection.createRange();
      range.selectNode(parent);
      composer.selection.setSelection(range);
    } else if (!composer.isEmpty()) {
      composer.selection.selectLine();
    }
  }
  
  // Set selection to begin inside first created block element (beginning of it) and end inside (and after content) of last block element
  // TODO: Checking nodetype might be unnescescary as nodes inserted by formatBlock are nodetype 1 anyway
  function selectElements(newBlockElements, composer) {
    var range = composer.selection.createRange(),
        lastEl = newBlockElements[newBlockElements.length - 1],
        lastOffset = (lastEl.nodeType === 1 && lastEl.childNodes) ? lastEl.childNodes.length | 0 :  lastEl.length || 0;

    range.setStart(newBlockElements[0], 0);
    range.setEnd(lastEl, lastOffset);
    range.select();
  }
  
  // Get all ranges from selection (takes out uneditables and out of editor parts) and apply format to each
  // Return created/modified block level elements 
  // Method can be either "apply" or "remove"
  function formatSelection(method, composer, options) {
    var ranges = composer.selection.getOwnRanges(),
        newBlockElements = [],
        closestBlockName;
        
    // Some places do not allow block level elements inbetween (inside ul and outside li, inside table and outside of td/th)
    ranges = fixNotPermittedInsertionPoints(ranges);
        
    for (var i = ranges.length; i--;) {
      fixRangeCoverage(ranges[i], composer);
      closestBlockName = getParentBlockNodeName(ranges[i].startContainer, composer);
      if (method === "remove") {
        newBlockElements = newBlockElements.concat(clearRangeBlockFromating(ranges[i], closestBlockName, composer));
      } else {
        newBlockElements = newBlockElements.concat(wrapRangeWithElement(ranges[i], options, closestBlockName, composer));
      }
    }
    return newBlockElements;
  }
  
  // If properties is passed as a string, look for tag with that tagName/query 
  function parseOptions(options) {
    if (typeof options === "string") {
      options = {
        nodeName: options.toUpperCase()
      };
    }
    return options;
  }

  function caretIsOnEmptyLine(composer) {
    var caretInfo;
    if (composer.selection.isCollapsed()) {
      caretInfo = composer.selection.getNodesNearCaret();
      if (caretInfo && caretInfo.caretNode) {
        if (
          // caret is allready breaknode
          wysihtml.dom.domNode(caretInfo.caretNode).is.lineBreak() ||
          // caret is textnode
          (caretInfo.caretNode.nodeType === 3 && caretInfo.textOffset === 0 && (!caretInfo.prevNode || wysihtml.dom.domNode(caretInfo.prevNode).is.lineBreak())) ||
          // Caret is temprorary rangy selection marker
          (caretInfo.caretNode.nodeType === 1 && caretInfo.caretNode.classList.contains('rangySelectionBoundary') &&
            (!caretInfo.prevNode || wysihtml.dom.domNode(caretInfo.prevNode).is.lineBreak() || wysihtml.dom.domNode(caretInfo.prevNode).is.block()) &&
            (!caretInfo.nextNode || wysihtml.dom.domNode(caretInfo.nextNode).is.lineBreak() || wysihtml.dom.domNode(caretInfo.nextNode).is.block())
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  wysihtml.commands.formatBlock = {
    exec: function(composer, command, options) {
      options = parseOptions(options);
      var newBlockElements = [],
          ranges, range, bookmark, state, closestBlockName;

      // Find if current format state is active if options.toggle is set as true
      // In toggle case active state elemets are formatted instead of working directly on selection
      if (options && options.toggle) {
        state = this.state(composer, command, options);
      }
      if (state) {
        // Remove format from state nodes if toggle set and state on and selection is collapsed
        bookmark = rangy.saveSelection(composer.win);
        for (var j = 0, jmax = state.length; j < jmax; j++) {
          removeOptionsFromElement(state[j], options, composer);
        }

      } else {
        // If selection is caret expand it to cover nearest suitable block element or row if none found
        if (composer.selection.isCollapsed()) {
          bookmark = rangy.saveSelection(composer.win);
          if (caretIsOnEmptyLine(composer)) {
            composer.selection.selectLine();
          } else {
            expandCaretToBlock(composer, options && options.nodeName ? options.nodeName.toUpperCase() : undefined);
          }
        }
        if (options) {
          newBlockElements = formatSelection("apply", composer, options);
        } else {
          // Options == null means block formatting should be removed from selection
          newBlockElements = formatSelection("remove", composer);
        }
        
      }

      // Remove empty block elements that may be left behind
      // Also remove them from new blocks list
      newBlockElements = cleanup(composer, newBlockElements);
      
      // Restore selection
      if (bookmark) {
        rangy.restoreSelection(bookmark);
      } else {
        selectElements(newBlockElements, composer);
      }
    },
    
    // Removes all block formatting from selection
    remove: function(composer, command, options) {
      options = parseOptions(options);
      var newBlockElements, bookmark;
      
      // If selection is caret expand it to cover nearest suitable block element or row if none found
      if (composer.selection.isCollapsed()) {
        bookmark = rangy.saveSelection(composer.win);
        expandCaretToBlock(composer, options && options.nodeName ? options.nodeName.toUpperCase() : undefined);
      }
      
      newBlockElements = formatSelection("remove", composer);
      newBlockElements = cleanup(composer, newBlockElements);
      
      // Restore selection
      if (bookmark) {
        rangy.restoreSelection(bookmark);
      } else {
        selectElements(newBlockElements, composer);
      }
    },

    // If options as null is passed returns status describing all block level elements
    state: function(composer, command, options) {
      options = parseOptions(options);

      var nodes = composer.selection.filterElements((function (element) { // Finds matching elements inside selection
            return wysihtml.dom.domNode(element).test(options || { query: BLOCK_ELEMENTS });
          }).bind(this)),
          parentNodes = composer.selection.getSelectedOwnNodes(),
          parent;

      // Finds matching elements that are parents of selection and adds to nodes list
      for (var i = 0, maxi = parentNodes.length; i < maxi; i++) {
        parent = dom.getParentElement(parentNodes[i], options || { query: BLOCK_ELEMENTS }, null, composer.element);
        if (parent && nodes.indexOf(parent) === -1) {
          nodes.push(parent);
        }
      }

      return (nodes.length === 0) ? false : nodes;
    }

  };
})(wysihtml);

/**
 * Unifies all inline tags additions and removals
 * See https://github.com/Voog/wysihtml/pull/169 for specification of action
 */

(function(wysihtml) {

  var defaultTag = "SPAN",
      INLINE_ELEMENTS = "b, big, i, small, tt, abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var, a, bdo, br, q, span, sub, sup, button, label, textarea, input, select, u",
      queryAliasMap = {
        "b": "b, strong",
        "strong": "b, strong",
        "em": "em, i",
        "i": "em, i"
      };

  function hasNoClass(element) {
    return (/^\s*$/).test(element.className);
  }

  function hasNoStyle(element) {
    return !element.getAttribute('style') || (/^\s*$/).test(element.getAttribute('style'));
  }

  // Associative arrays in javascript are really objects and do not have length defined
  // Thus have to check emptyness in a different way
  function hasNoAttributes(element) {
    var attr = wysihtml.dom.getAttributes(element);
    return wysihtml.lang.object(attr).isEmpty();
  }

  // compares two nodes if they are semantically the same
  // Used in cleanup to find consequent semantically similar elements for merge
  function isSameNode(element1, element2) {
    var classes1, classes2,
        attr1, attr2;

    if (element1.nodeType !== 1 || element2.nodeType !== 1) {
      return false;
    }

    if (element1.nodeName !== element2.nodeName) {
      return false;
    }

    classes1 = element1.className.trim().replace(/\s+/g, ' ').split(' ');
    classes2 = element2.className.trim().replace(/\s+/g, ' ').split(' ');
    if (wysihtml.lang.array(classes1).without(classes2).length > 0) {
      return false;
    }

    attr1 = wysihtml.dom.getAttributes(element1);
    attr2 = wysihtml.dom.getAttributes(element2);

    if (attr1.length !== attr2.length || !wysihtml.lang.object(wysihtml.lang.object(attr1).difference(attr2)).isEmpty()) {
      return false;
    }

    return true;
  }

  function createWrapNode(textNode, options) {
    var nodeName = options && options.nodeName || defaultTag,
        element = textNode.ownerDocument.createElement(nodeName);

    // Remove similar classes before applying className
    if (options.classRegExp) {
      element.className = element.className.replace(options.classRegExp, "");
    }

    if (options.className) {
      element.classList.add(options.className);
    }

    if (options.styleProperty && typeof options.styleValue !== "undefined") {
      element.style[wysihtml.browser.fixStyleKey(options.styleProperty)] = options.styleValue;
    }

    if (options.attribute) {
      if (typeof options.attribute === "object") {
        for (var a in options.attribute) {
          if (options.attribute.hasOwnProperty(a)) {
            element.setAttribute(a, options.attribute[a]);
          }
        }
      } else if (typeof options.attributeValue !== "undefined") {
        element.setAttribute(options.attribute, options.attributeValue);
      }
    }

    return element;
  }

  // Tests if attr2 list contains all attributes present in attr1
  // Note: attr 1 can have more attributes than attr2
  function containsSameAttributes(attr1, attr2) {
    for (var a in attr1) {
      if (attr1.hasOwnProperty(a)) {
        if (typeof attr2[a] === undefined || attr2[a] !== attr1[a]) {
          return false;
        }
      }
    }
    return true;
  }

  // If attrbutes and values are the same > remove
  // if attributes or values 
  function updateElementAttributes(element, newAttributes, toggle) {
    var attr = wysihtml.dom.getAttributes(element),
        fullContain = containsSameAttributes(newAttributes, attr),
        attrDifference = wysihtml.lang.object(attr).difference(newAttributes),
        a, b;

    if (fullContain && toggle !== false) {
      for (a in newAttributes) {
        if (newAttributes.hasOwnProperty(a)) {
          element.removeAttribute(a);
        }
      }
    } else {

      /*if (!wysihtml.lang.object(attrDifference).isEmpty()) {
        for (b in attrDifference) {
          if (attrDifference.hasOwnProperty(b)) {
            element.removeAttribute(b);
          }
        }
      }*/

      for (a in newAttributes) {
        if (newAttributes.hasOwnProperty(a)) {
          element.setAttribute(a, newAttributes[a]);
        }
      }
    }
  }

  function updateFormatOfElement(element, options) {
    var attr, newNode, a, newAttributes, nodeNameQuery, nodeQueryMatch;

    if (options.className) {
      if (options.toggle !== false && element.classList.contains(options.className)) {
        element.classList.remove(options.className);
      } else {
        if (options.classRegExp) {
          element.className = element.className.replace(options.classRegExp, '');
        }
        element.classList.add(options.className);
      }
      if (hasNoClass(element)) {
        element.removeAttribute('class');
      }
    }

    // change/remove style
    if (options.styleProperty) {
      if (options.toggle !== false && element.style[wysihtml.browser.fixStyleKey(options.styleProperty)].trim().replace(/, /g, ",") === options.styleValue) {
        element.style[wysihtml.browser.fixStyleKey(options.styleProperty)] = '';
      } else {
        element.style[wysihtml.browser.fixStyleKey(options.styleProperty)] = options.styleValue;
      }
    }
    if (hasNoStyle(element)) {
      element.removeAttribute('style');
    }

    if (options.attribute) {
      if (typeof options.attribute === "object") {
        newAttributes =  options.attribute;
      } else {
        newAttributes = {};
        newAttributes[options.attribute] = options.attributeValue || '';
      }
      updateElementAttributes(element, newAttributes, options.toggle);
    }


    // Handle similar semantically same elements (queryAliasMap)
    nodeNameQuery = options.nodeName ? queryAliasMap[options.nodeName.toLowerCase()] || options.nodeName.toLowerCase() : null;
    nodeQueryMatch = nodeNameQuery ? wysihtml.dom.domNode(element).test({ query: nodeNameQuery }) : false;
    
    // Unwrap element if no attributes present and node name given
    // or no attributes and if no nodename set but node is the default
    if (!options.nodeName || options.nodeName === defaultTag || nodeQueryMatch) {
      if (
        ((options.toggle !== false && nodeQueryMatch) || (!options.nodeName && element.nodeName === defaultTag)) &&
        hasNoClass(element) && hasNoStyle(element) && hasNoAttributes(element)
      ) {
        wysihtml.dom.unwrap(element);
      }

    }
  }

  // Fetch all textnodes in selection
  // Empty textnodes are ignored except the one containing text caret
  function getSelectedTextNodes(selection, splitBounds) {
    var textNodes = [];

    if (!selection.isCollapsed()) {
      textNodes = textNodes.concat(selection.getOwnNodes([3], function(node) {
        // Exclude empty nodes except caret node
        return (!wysihtml.dom.domNode(node).is.emptyTextNode());
      }, splitBounds));
    }

    return textNodes;
  }

  function findSimilarTextNodeWrapper(textNode, options, container, exact) {
    var node = textNode,
        similarOptions = exact ? options : correctOptionsForSimilarityCheck(options);

    do {
      if (node.nodeType === 1 && isSimilarNode(node, similarOptions)) {
        return node;
      }
      node = node.parentNode;
    } while (node && node !== container);

    return null;
  }

  function correctOptionsForSimilarityCheck(options) {
    return {
      nodeName: options.nodeName || null,
      className: (!options.classRegExp) ? options.className || null : null,
      classRegExp: options.classRegExp || null,
      styleProperty: options.styleProperty || null
    };
  }

  // Finds inline node with similar nodeName/style/className
  // If nodeName is specified inline node with the same (or alias) nodeName is expected to prove similar regardless of attributes
  function isSimilarNode(node, options) {
    var o;
    if (options.nodeName) {
      var query = queryAliasMap[options.nodeName.toLowerCase()] || options.nodeName.toLowerCase();
      return wysihtml.dom.domNode(node).test({ query: query });
    } else {
      o = wysihtml.lang.object(options).clone();
      o.query = INLINE_ELEMENTS; // make sure only inline elements with styles and classes are counted
      return wysihtml.dom.domNode(node).test(o);
    }
  }

  function selectRange(composer, range) {
    var d = document.documentElement || document.body,
        oldScrollTop  = d.scrollTop,
        oldScrollLeft = d.scrollLeft,
        selection = rangy.getSelection(composer.win);

    rangy.getSelection(composer.win).removeAllRanges();
    
    // IE looses focus of contenteditable on removeallranges and can not set new selection unless contenteditable is focused again
    try {
      rangy.getSelection(composer.win).addRange(range);
    } catch (e) {}
    if (!composer.doc.activeElement || !wysihtml.dom.contains(composer.element, composer.doc.activeElement)) {
      composer.element.focus();
      d.scrollTop  = oldScrollTop;
      d.scrollLeft = oldScrollLeft;
      rangy.getSelection(composer.win).addRange(range);
    }
  }

  function selectTextNodes(textNodes, composer) {
    var range = rangy.createRange(composer.doc),
        lastText = textNodes[textNodes.length - 1];

    if (textNodes[0] && lastText) {
      range.setStart(textNodes[0], 0);
      range.setEnd(lastText, lastText.length);
      selectRange(composer, range);
    }
    
  }

  function selectTextNode(composer, node, start, end) {
    var range = rangy.createRange(composer.doc);
    if (node) {
      range.setStart(node, start);
      range.setEnd(node, typeof end !== 'undefined' ? end : start);
      selectRange(composer, range);
    }
  }

  function getState(composer, options, exact) {
    var searchNodes = getSelectedTextNodes(composer.selection),
        nodes = [],
        partial = false,
        node, range, caretNode;

    if (composer.selection.isInThisEditable()) {

      if (searchNodes.length === 0 && composer.selection.isCollapsed()) {
        caretNode = composer.selection.getSelection().anchorNode;
        if (!caretNode) {
          // selection not in editor
          return {
              nodes: [],
              partial: false
          };
        }
        if (caretNode.nodeType === 3) {
          searchNodes = [caretNode];
        }
      }

      // Handle collapsed selection caret
      if (!searchNodes.length) {
        range = composer.selection.getOwnRanges()[0];
        if (range) {
          searchNodes = [range.endContainer];
        }
      }

      for (var i = 0, maxi = searchNodes.length; i < maxi; i++) {
        node = findSimilarTextNodeWrapper(searchNodes[i], options, composer.element, exact);
        if (node) {
          nodes.push(node);
        } else {
          partial = true;
        }
      }

    }
    
    return {
      nodes: nodes,
      partial: partial
    };
  }

  // Returns if caret is inside a word in textnode (not on boundary)
  // If selection anchornode is not text node, returns false
  function caretIsInsideWord(selection) {
    var anchor, offset, beforeChar, afterChar;
    if (selection) {
      anchor = selection.anchorNode;
      offset = selection.anchorOffset;
      if (anchor && anchor.nodeType === 3 && offset > 0 && offset < anchor.data.length) {
        beforeChar = anchor.data[offset - 1];
        afterChar = anchor.data[offset];
        return (/\w/).test(beforeChar) && (/\w/).test(afterChar);
      }
    }
    return false;
  }

  // Returns a range and textnode containing object from caret position covering a whole word
  // wordOffsety describes the original position of caret in the new textNode 
  // Caret has to be inside a textNode.
  function getRangeForWord(selection) {
    var anchor, offset, doc, range, offsetStart, offsetEnd, beforeChar, afterChar,
        txtNodes = [];
    if (selection) {
      anchor = selection.anchorNode;
      offset = offsetStart = offsetEnd = selection.anchorOffset;
      doc = anchor.ownerDocument;
      range = rangy.createRange(doc);

      if (anchor && anchor.nodeType === 3) {

        while (offsetStart > 0 && (/\w/).test(anchor.data[offsetStart - 1])) {
          offsetStart--;
        }

        while (offsetEnd < anchor.data.length && (/\w/).test(anchor.data[offsetEnd])) {
          offsetEnd++;
        }

        range.setStartAndEnd(anchor, offsetStart, offsetEnd);
        range.splitBoundaries();
        txtNodes = range.getNodes([3], function(node) {
          return (!wysihtml.dom.domNode(node).is.emptyTextNode());
        });

        return {
          wordOffset: offset - offsetStart,
          range: range,
          textNode: txtNodes[0]
        };

      }
    }
    return false;
  }

  // Contents of 2 elements are merged to fitst element. second element is removed as consequence
  function mergeContents(element1, element2) {
    while (element2.firstChild) {
      element1.appendChild(element2.firstChild);
    }
    element2.parentNode.removeChild(element2);
  }

  function mergeConsequentSimilarElements(elements) {
    for (var i = elements.length; i--;) {
      
      if (elements[i] && elements[i].parentNode) { // Test if node is not allready removed in cleanup

        if (elements[i].nextSibling && isSameNode(elements[i], elements[i].nextSibling)) {
          mergeContents(elements[i], elements[i].nextSibling);
        }

        if (elements[i].previousSibling && isSameNode(elements[i]  , elements[i].previousSibling)) {
          mergeContents(elements[i].previousSibling, elements[i]);
        }

      }
    }
  }

  function cleanupAndSetSelection(composer, textNodes, options) {
    if (textNodes.length > 0) {
      selectTextNodes(textNodes, composer);
    }
    mergeConsequentSimilarElements(getState(composer, options).nodes);
    if (textNodes.length > 0) {
      selectTextNodes(textNodes, composer);
    }
  }

  function cleanupAndSetCaret(composer, textNode, offset, options) {
    selectTextNode(composer, textNode, offset);
    mergeConsequentSimilarElements(getState(composer, options).nodes);
    selectTextNode(composer, textNode, offset);
  }

  // Formats a textnode with given options
  function formatTextNode(textNode, options) {
    var wrapNode = createWrapNode(textNode, options);

    textNode.parentNode.insertBefore(wrapNode, textNode);
    wrapNode.appendChild(textNode);
  }

  // Changes/toggles format of a textnode
  function unformatTextNode(textNode, composer, options) {
    var container = composer.element,
        wrapNode = findSimilarTextNodeWrapper(textNode, options, container),
        newWrapNode;

    if (wrapNode) {
      newWrapNode = wrapNode.cloneNode(false);

      wysihtml.dom.domNode(textNode).escapeParent(wrapNode, newWrapNode);
      updateFormatOfElement(newWrapNode, options);
    }
  }

  // Removes the format around textnode
  function removeFormatFromTextNode(textNode, composer, options) {
    var container = composer.element,
        wrapNode = findSimilarTextNodeWrapper(textNode, options, container);

    if (wrapNode) {
      wysihtml.dom.domNode(textNode).escapeParent(wrapNode);
    }
  }

  // Creates node around caret formated with options
  function formatTextRange(range, composer, options) {
    var wrapNode = createWrapNode(range.endContainer, options);

    range.surroundContents(wrapNode);
    composer.selection.selectNode(wrapNode);
  }

  // Changes/toggles format of whole selection
  function updateFormat(composer, textNodes, state, options) {
    var exactState = getState(composer, options, true),
        selection = composer.selection.getSelection(),
        wordObj, textNode, newNode, i;

    if (!textNodes.length) {
      // Selection is caret


      if (options.toggle !== false) {
        if (caretIsInsideWord(selection)) {

          // Unformat whole word 
          wordObj = getRangeForWord(selection);
          textNode = wordObj.textNode;
          unformatTextNode(wordObj.textNode, composer, options);
          cleanupAndSetCaret(composer, wordObj.textNode, wordObj.wordOffset, options);

        } else {

          // Escape caret out of format
          textNode = composer.doc.createTextNode(wysihtml.INVISIBLE_SPACE);
          newNode = state.nodes[0].cloneNode(false);
          newNode.appendChild(textNode);
          composer.selection.splitElementAtCaret(state.nodes[0], newNode);
          updateFormatOfElement(newNode, options);
          cleanupAndSetSelection(composer, [textNode], options);
          var s = composer.selection.getSelection();
          if (s.anchorNode && s.focusNode) {
            // Has an error in IE when collapsing selection. probably from rangy
            try {
              s.collapseToEnd();
            } catch (e) {}
          }
        }
      } else {
        // In non-toggle mode the closest state element has to be found and the state updated differently
        for (i = state.nodes.length; i--;) {
          updateFormatOfElement(state.nodes[i], options);
        }
      }

    } else {

      if (!exactState.partial && options.toggle !== false) {

        // If whole selection (all textnodes) are in the applied format
        // remove the format from selection
        // Non-toggle mode never removes. Remove has to be called explicitly
        for (i = textNodes.length; i--;) {
          unformatTextNode(textNodes[i], composer, options);
        }

      } else {
        
        // Selection is partially in format
        // change it to new if format if textnode allreafy in similar state
        // else just apply
        
        for (i = textNodes.length; i--;) {
          
          if (findSimilarTextNodeWrapper(textNodes[i], options, composer.element)) {
            unformatTextNode(textNodes[i], composer, options);
          }

          if (!findSimilarTextNodeWrapper(textNodes[i], options, composer.element)) {
            formatTextNode(textNodes[i], options);
          }
        }

      }

      cleanupAndSetSelection(composer, textNodes, options);
    }
  }

  // Removes format from selection
  function removeFormat(composer, textNodes, state, options) {
    var textNode, textOffset, newNode, i,
        selection = composer.selection.getSelection();

    if (!textNodes.length) {    
      textNode = selection.anchorNode;
      textOffset = selection.anchorOffset;

      for (i = state.nodes.length; i--;) {
        wysihtml.dom.unwrap(state.nodes[i]);
      }

      cleanupAndSetCaret(composer, textNode, textOffset, options);
    } else {
      for (i = textNodes.length; i--;) {
        removeFormatFromTextNode(textNodes[i], composer, options);
      }
      cleanupAndSetSelection(composer, textNodes, options);
    }
  }

  // Adds format to selection
  function applyFormat(composer, textNodes, options) {
    var wordObj, i,
        selection = composer.selection.getSelection();
 
    if (!textNodes.length) {
      // Handle collapsed selection caret and return
      if (caretIsInsideWord(selection)) {

        wordObj = getRangeForWord(selection);
        formatTextNode(wordObj.textNode, options);
        cleanupAndSetCaret(composer, wordObj.textNode, wordObj.wordOffset, options);

      } else {
        var r = composer.selection.getOwnRanges()[0];
        if (r) {
          formatTextRange(r, composer, options);
        }
      }
      
    } else {
      // Handle textnodes in selection and apply format
      for (i = textNodes.length; i--;) {
        formatTextNode(textNodes[i], options);
      }
      cleanupAndSetSelection(composer, textNodes, options);
    }
  }
  
  // If properties is passed as a string, correct options with that nodeName
  function fixOptions(options) {
    options = (typeof options === "string") ? { nodeName: options } : options;
    if (options.nodeName) { options.nodeName = options.nodeName.toUpperCase(); }
    return options;
  }

  wysihtml.commands.formatInline = {

    // Basics:
    // In case of plain text or inline state not set wrap all non-empty textnodes with
    // In case a similar inline wrapper node is detected on one of textnodes, the wrapper node is changed (if fully contained) or split and changed (partially contained)
    //    In case of changing mode every textnode is addressed separatly
    exec: function(composer, command, options) {
      options = fixOptions(options);

      // Join adjactent textnodes first
      composer.element.normalize();

      var textNodes = getSelectedTextNodes(composer.selection, true),
          state = getState(composer, options);
      if (state.nodes.length > 0) {
        // Text allready has the format applied
        updateFormat(composer, textNodes, state, options);
      } else {
        // Selection is not in the applied format
        applyFormat(composer, textNodes, options);
      }
      composer.element.normalize();
    },

    remove: function(composer, command, options) {
      options = fixOptions(options);
      composer.element.normalize();

      var textNodes = getSelectedTextNodes(composer.selection, true),
          state = getState(composer, options);

      if (state.nodes.length > 0) {
        // Text allready has the format applied
        removeFormat(composer, textNodes, state, options);
      }
      
      composer.element.normalize();
    },

    state: function(composer, command, options) {
      options = fixOptions(options);
      var nodes = getState(composer, options, true).nodes;
      return (nodes.length === 0) ? false : nodes;
    }
  };

})(wysihtml);

(function(wysihtml){
  wysihtml.commands.indentList = {
    exec: function(composer, command, value) {
      var listEls = composer.selection.getSelectionParentsByTag('LI');
      if (listEls) {
        return this.tryToPushLiLevel(listEls, composer.selection);
      }
      return false;
    },

    state: function(composer, command) {
        return false;
    },

    tryToPushLiLevel: function(liNodes, selection) {
      var listTag, list, prevLi, liNode, prevLiList,
          found = false;

      selection.executeAndRestoreRangy(function() {

        for (var i = liNodes.length; i--;) {
          liNode = liNodes[i];
          listTag = (liNode.parentNode.nodeName === 'OL') ? 'OL' : 'UL';
          list = liNode.ownerDocument.createElement(listTag);
          prevLi = wysihtml.dom.domNode(liNode).prev({nodeTypes: [wysihtml.ELEMENT_NODE]});
          prevLiList = (prevLi) ? prevLi.querySelector('ul, ol') : null;

          if (prevLi) {
            if (prevLiList) {
              prevLiList.appendChild(liNode);
            } else {
              list.appendChild(liNode);
              prevLi.appendChild(list);
            }
            found = true;
          }
        }

      });
      return found;
    }
  };
}(wysihtml));

(function(wysihtml){
  wysihtml.commands.insertHTML = {
    exec: function(composer, command, html) {
        composer.selection.insertHTML(html);
    },

    state: function() {
      return false;
    }
  };
}(wysihtml));

(function(wysihtml) {
  var LINE_BREAK = "<br>" + (wysihtml.browser.needsSpaceAfterLineBreak() ? " " : "");

  wysihtml.commands.insertLineBreak = {
    exec: function(composer, command) {
      composer.selection.insertHTML(LINE_BREAK);
    },

    state: function() {
      return false;
    }
  };
})(wysihtml);

wysihtml.commands.insertList = (function(wysihtml) {

  var isNode = function(node, name) {
    if (node && node.nodeName) {
      if (typeof name === 'string') {
        name = [name];
      }
      for (var n = name.length; n--;) {
        if (node.nodeName === name[n]) {
          return true;
        }
      }
    }
    return false;
  };

  var findListEl = function(node, nodeName, composer) {
    var ret = {
          el: null,
          other: false
        };

    if (node) {
      var parentLi = wysihtml.dom.getParentElement(node, { query: "li" }, false, composer.element),
          otherNodeName = (nodeName === "UL") ? "OL" : "UL";

      if (isNode(node, nodeName)) {
        ret.el = node;
      } else if (isNode(node, otherNodeName)) {
        ret = {
          el: node,
          other: true
        };
      } else if (parentLi) {
        if (isNode(parentLi.parentNode, nodeName)) {
          ret.el = parentLi.parentNode;
        } else if (isNode(parentLi.parentNode, otherNodeName)) {
          ret = {
            el : parentLi.parentNode,
            other: true
          };
        }
      }
    }

    // do not count list elements outside of composer
    if (ret.el && !composer.element.contains(ret.el)) {
      ret.el = null;
    }

    return ret;
  };

  var handleSameTypeList = function(el, nodeName, composer) {
    var otherNodeName = (nodeName === "UL") ? "OL" : "UL",
        otherLists, innerLists;
    // Unwrap list
    // <ul><li>foo</li><li>bar</li></ul>
    // becomes:
    // foo<br>bar<br>

    composer.selection.executeAndRestoreRangy(function() {
      otherLists = getListsInSelection(otherNodeName, composer);
      if (otherLists.length) {
        for (var l = otherLists.length; l--;) {
          wysihtml.dom.renameElement(otherLists[l], nodeName.toLowerCase());
        }
      } else {
        innerLists = getListsInSelection(['OL', 'UL'], composer);
        for (var i = innerLists.length; i--;) {
          wysihtml.dom.resolveList(innerLists[i], composer.config.useLineBreaks);
        }
        if (innerLists.length === 0) {
          wysihtml.dom.resolveList(el, composer.config.useLineBreaks);
        }
      }
    });
  };

  var handleOtherTypeList =  function(el, nodeName, composer) {
    var otherNodeName = (nodeName === "UL") ? "OL" : "UL";
    // Turn an ordered list into an unordered list
    // <ol><li>foo</li><li>bar</li></ol>
    // becomes:
    // <ul><li>foo</li><li>bar</li></ul>
    // Also rename other lists in selection
    composer.selection.executeAndRestoreRangy(function() {
      var renameLists = [el].concat(getListsInSelection(otherNodeName, composer));

      // All selection inner lists get renamed too
      for (var l = renameLists.length; l--;) {
        wysihtml.dom.renameElement(renameLists[l], nodeName.toLowerCase());
      }
    });
  };

  var getListsInSelection = function(nodeName, composer) {
      var ranges = composer.selection.getOwnRanges(),
          renameLists = [];

      for (var r = ranges.length; r--;) {
        renameLists = renameLists.concat(ranges[r].getNodes([1], function(node) {
          return isNode(node, nodeName);
        }));
      }

      return renameLists;
  };

  var createListFallback = function(nodeName, composer) {
    var sel = rangy.saveSelection(composer.win);

    // Fallback for Create list
    var tempClassName =  "_wysihtml-temp-" + new Date().getTime(),
        isEmpty, list;

    composer.commands.exec("formatBlock", {
      "nodeName": "div",
      "className": tempClassName
    });

    var tempElement = composer.element.querySelector("." + tempClassName);

    // This space causes new lists to never break on enter
    var INVISIBLE_SPACE_REG_EXP = /\uFEFF/g;
    tempElement.innerHTML = tempElement.innerHTML.replace(wysihtml.INVISIBLE_SPACE_REG_EXP, "");
    if (tempElement) {
      isEmpty = (/^(\s|(<br>))+$/i).test(tempElement.innerHTML);
      list = wysihtml.dom.convertToList(tempElement, nodeName.toLowerCase(), composer.parent.config.classNames.uneditableContainer);
      if (sel) {
        rangy.restoreSelection(sel);
      }
      if (isEmpty) {
        composer.selection.selectNode(list.querySelector("li"), true);
      }
    }
  };

  return {
    exec: function(composer, command, nodeName) {
      var doc           = composer.doc,
          cmd           = (nodeName === "OL") ? "insertOrderedList" : "insertUnorderedList",
          s = composer.selection.getSelection(),
          anode = s.anchorNode.nodeType === 1 && s.anchorNode.firstChild ? s.anchorNode.childNodes[s.anchorOffset] : s.anchorNode,
          fnode = s.focusNode.nodeType === 1 && s.focusNode.firstChild ? s.focusNode.childNodes[s.focusOffset] || s.focusNode.lastChild : s.focusNode,
          selectedNode, list;

      if (s.isBackwards()) {
        // swap variables
        anode = [fnode, fnode = anode][0];
      }

      if (wysihtml.dom.domNode(fnode).is.emptyTextNode(true) && fnode) {
        fnode = wysihtml.dom.domNode(fnode).prev({nodeTypes: [1,3], ignoreBlankTexts: true});
      }
      if (wysihtml.dom.domNode(anode).is.emptyTextNode(true) && anode) {
        anode = wysihtml.dom.domNode(anode).next({nodeTypes: [1,3], ignoreBlankTexts: true});
      }

      if (anode && fnode) {
        if (anode === fnode) {
          selectedNode = anode;
        } else {
          selectedNode = wysihtml.dom.domNode(anode).commonAncestor(fnode, composer.element);
        }
      } else {
        selectedNode  = composer.selection.getSelectedNode();
      }

      list = findListEl(selectedNode, nodeName, composer);

      if (!list.el) {
        if (composer.commands.support(cmd)) {
          doc.execCommand(cmd, false, null);
        } else {
          createListFallback(nodeName, composer);
        }
      } else if (list.other) {
        handleOtherTypeList(list.el, nodeName, composer);
      } else {
        handleSameTypeList(list.el, nodeName, composer);
      }
    },

    state: function(composer, command, nodeName) {
      var selectedNode = composer.selection.getSelectedNode(),
          list         = findListEl(selectedNode, nodeName, composer);

      return (list.el && !list.other) ? list.el : false;
    }
  };

})(wysihtml);

(function(wysihtml){

  wysihtml.commands.outdentList = {
    exec: function(composer, command, value) {
      var listEls = composer.selection.getSelectionParentsByTag('LI');
      if (listEls) {
        return this.tryToPullLiLevel(listEls, composer);
      }
      return false;
    },

    state: function(composer, command) {
        return false;
    },

    tryToPullLiLevel: function(liNodes, composer) {
      var listNode, outerListNode, outerLiNode, list, prevLi, liNode, afterList,
          found = false,
          that = this;

      composer.selection.executeAndRestoreRangy(function() {

        for (var i = liNodes.length; i--;) {
          liNode = liNodes[i];
          if (liNode.parentNode) {
            listNode = liNode.parentNode;

            if (listNode.tagName === 'OL' || listNode.tagName === 'UL') {
              found = true;

              outerListNode = wysihtml.dom.getParentElement(listNode.parentNode, { query: 'ol, ul' }, false, composer.element);
              outerLiNode = wysihtml.dom.getParentElement(listNode.parentNode, { query: 'li' }, false, composer.element);

              if (outerListNode && outerLiNode) {

                if (liNode.nextSibling) {
                  afterList = that.getAfterList(listNode, liNode);
                  liNode.appendChild(afterList);
                }
                outerListNode.insertBefore(liNode, outerLiNode.nextSibling);

              } else {

                if (liNode.nextSibling) {
                  afterList = that.getAfterList(listNode, liNode);
                  liNode.appendChild(afterList);
                }

                for (var j = liNode.childNodes.length; j--;) {
                  listNode.parentNode.insertBefore(liNode.childNodes[j], listNode.nextSibling);
                }

                listNode.parentNode.insertBefore(document.createElement('br'), listNode.nextSibling);
                liNode.parentNode.removeChild(liNode);

              }

              // cleanup
              if (listNode.childNodes.length === 0) {
                  listNode.parentNode.removeChild(listNode);
              }
            }
          }
        }

      });
      return found;
    },

    getAfterList: function(listNode, liNode) {
      var nodeName = listNode.nodeName,
          newList = document.createElement(nodeName);

      while (liNode.nextSibling) {
        newList.appendChild(liNode.nextSibling);
      }
      return newList;
    }

  };
}(wysihtml));

(function(wysihtml){
  wysihtml.commands.redo = {
    exec: function(composer) {
      return composer.undoManager.redo();
    },

    state: function(composer) {
      return false;
    }
  };
}(wysihtml));

(function(wysihtml) {

  var nodeOptions = {
    nodeName: "A"
  };

  wysihtml.commands.removeLink = {
    exec: function(composer, command) {
      wysihtml.commands.formatInline.remove(composer, command, nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatInline.state(composer, command, nodeOptions);
    }
  };

})(wysihtml);

(function(wysihtml){
  wysihtml.commands.undo = {
    exec: function(composer) {
      return composer.undoManager.undo();
    },

    state: function(composer) {
      return false;
    }
  };
}(wysihtml));

/**
 * Undo Manager for wysihtml
 * slightly inspired by http://rniwa.com/editing/undomanager.html#the-undomanager-interface
 */
(function(wysihtml) {
  var Z_KEY               = 90,
      Y_KEY               = 89,
      BACKSPACE_KEY       = 8,
      DELETE_KEY          = 46,
      MAX_HISTORY_ENTRIES = 25,
      DATA_ATTR_NODE      = "data-wysihtml-selection-node",
      DATA_ATTR_OFFSET    = "data-wysihtml-selection-offset",
      UNDO_HTML           = '<span id="_wysihtml-undo" class="_wysihtml-temp">' + wysihtml.INVISIBLE_SPACE + '</span>',
      REDO_HTML           = '<span id="_wysihtml-redo" class="_wysihtml-temp">' + wysihtml.INVISIBLE_SPACE + '</span>',
      dom                 = wysihtml.dom;

  function cleanTempElements(doc) {
    var tempElement;
    while (tempElement = doc.querySelector("._wysihtml-temp")) {
      tempElement.parentNode.removeChild(tempElement);
    }
  }

  wysihtml.UndoManager = wysihtml.lang.Dispatcher.extend(
    /** @scope wysihtml.UndoManager.prototype */ {
    constructor: function(editor) {
      this.editor = editor;
      this.composer = editor.composer;
      this.element = this.composer.element;

      this.position = 0;
      this.historyStr = [];
      this.historyDom = [];

      this.transact();

      this._observe();
    },

    _observe: function() {
      var that      = this,
          doc       = this.composer.sandbox.getDocument(),
          lastKey;

      // Catch CTRL+Z and CTRL+Y
      dom.observe(this.element, "keydown", function(event) {
        if (event.altKey || (!event.ctrlKey && !event.metaKey)) {
          return;
        }

        var keyCode = event.keyCode,
            isUndo = keyCode === Z_KEY && !event.shiftKey,
            isRedo = (keyCode === Z_KEY && event.shiftKey) || (keyCode === Y_KEY);

        if (isUndo) {
          that.undo();
          event.preventDefault();
        } else if (isRedo) {
          that.redo();
          event.preventDefault();
        }
      });

      // Catch delete and backspace
      dom.observe(this.element, "keydown", function(event) {
        var keyCode = event.keyCode;
        if (keyCode === lastKey) {
          return;
        }

        lastKey = keyCode;

        if (keyCode === BACKSPACE_KEY || keyCode === DELETE_KEY) {
          that.transact();
        }
      });

      this.editor
        .on("newword:composer", function() {
          that.transact();
        })

        .on("beforecommand:composer", function() {
          that.transact();
        });
    },

    transact: function() {
      var previousHtml      = this.historyStr[this.position - 1],
          currentHtml       = this.composer.getValue(false, false),
          composerIsVisible   = this.element.offsetWidth > 0 && this.element.offsetHeight > 0,
          range, node, offset, element, position;

      if (currentHtml === previousHtml) {
        return;
      }

      var length = this.historyStr.length = this.historyDom.length = this.position;
      if (length > MAX_HISTORY_ENTRIES) {
        this.historyStr.shift();
        this.historyDom.shift();
        this.position--;
      }

      this.position++;

      if (composerIsVisible) {
        // Do not start saving selection if composer is not visible
        range   = this.composer.selection.getRange();
        node    = (range && range.startContainer) ? range.startContainer : this.element;
        offset  = (range && range.startOffset) ? range.startOffset : 0;

        if (node.nodeType === wysihtml.ELEMENT_NODE) {
          element = node;
        } else {
          element  = node.parentNode;
          position = this.getChildNodeIndex(element, node);
        }

        element.setAttribute(DATA_ATTR_OFFSET, offset);
        if (typeof(position) !== "undefined") {
          element.setAttribute(DATA_ATTR_NODE, position);
        }
      }

      var clone = this.element.cloneNode(!!currentHtml);
      this.historyDom.push(clone);
      this.historyStr.push(currentHtml);

      if (element) {
        element.removeAttribute(DATA_ATTR_OFFSET);
        element.removeAttribute(DATA_ATTR_NODE);
      }

    },

    undo: function() {
      this.transact();

      if (!this.undoPossible()) {
        return;
      }

      this.set(this.historyDom[--this.position - 1]);
      this.editor.fire("undo:composer");
    },

    redo: function() {
      if (!this.redoPossible()) {
        return;
      }

      this.set(this.historyDom[++this.position - 1]);
      this.editor.fire("redo:composer");
    },

    undoPossible: function() {
      return this.position > 1;
    },

    redoPossible: function() {
      return this.position < this.historyStr.length;
    },

    set: function(historyEntry) {
      this.element.innerHTML = "";

      var i = 0,
          childNodes = historyEntry.childNodes,
          length = historyEntry.childNodes.length;

      for (; i<length; i++) {
        this.element.appendChild(childNodes[i].cloneNode(true));
      }

      // Restore selection
      var offset,
          node,
          position;

      if (historyEntry.hasAttribute(DATA_ATTR_OFFSET)) {
        offset    = historyEntry.getAttribute(DATA_ATTR_OFFSET);
        position  = historyEntry.getAttribute(DATA_ATTR_NODE);
        node      = this.element;
      } else {
        node      = this.element.querySelector("[" + DATA_ATTR_OFFSET + "]") || this.element;
        offset    = node.getAttribute(DATA_ATTR_OFFSET);
        position  = node.getAttribute(DATA_ATTR_NODE);
        node.removeAttribute(DATA_ATTR_OFFSET);
        node.removeAttribute(DATA_ATTR_NODE);
      }

      if (position !== null) {
        node = this.getChildNodeByIndex(node, +position);
      }

      this.composer.selection.set(node, offset);
    },

    getChildNodeIndex: function(parent, child) {
      var i           = 0,
          childNodes  = parent.childNodes,
          length      = childNodes.length;
      for (; i<length; i++) {
        if (childNodes[i] === child) {
          return i;
        }
      }
    },

    getChildNodeByIndex: function(parent, index) {
      return parent.childNodes[index];
    }
  });
})(wysihtml);

/**
 * TODO: the following methods still need unit test coverage
 */
wysihtml.views.View = Base.extend(
  /** @scope wysihtml.views.View.prototype */ {
  constructor: function(parent, textareaElement, config) {
    this.parent   = parent;
    this.element  = textareaElement;
    this.config   = config;
    if (!this.config.noTextarea) {
        this._observeViewChange();
    }
  },

  _observeViewChange: function() {
    var that = this;
    this.parent.on("beforeload", function() {
      that.parent.on("change_view", function(view) {
        if (view === that.name) {
          that.parent.currentView = that;
          that.show();
          // Using tiny delay here to make sure that the placeholder is set before focusing
          setTimeout(function() { that.focus(); }, 0);
        } else {
          that.hide();
        }
      });
    });
  },

  focus: function() {
    if (this.element && this.element.ownerDocument && this.element.ownerDocument.querySelector(":focus") === this.element) {
      return;
    }

    try { if(this.element) { this.element.focus(); } } catch(e) {}
  },

  hide: function() {
    this.element.style.display = "none";
  },

  show: function() {
    this.element.style.display = "";
  },

  disable: function() {
    this.element.setAttribute("disabled", "disabled");
  },

  enable: function() {
    this.element.removeAttribute("disabled");
  }
});

(function(wysihtml) {
  var dom       = wysihtml.dom,
      browser   = wysihtml.browser;

  wysihtml.views.Composer = wysihtml.views.View.extend(
    /** @scope wysihtml.views.Composer.prototype */ {
    name: "composer",

    constructor: function(parent, editableElement, config) {
      this.base(parent, editableElement, config);
      if (!this.config.noTextarea) {
          this.textarea = this.parent.textarea;
      } else {
          this.editableArea = editableElement;
      }
      if (this.config.contentEditableMode) {
          this._initContentEditableArea();
      } else {
          this._initSandbox();
      }
    },

    clear: function() {
      this.element.innerHTML = browser.displaysCaretInEmptyContentEditableCorrectly() ? "" : "<br>";
    },

    getValue: function(parse, clearInternals) {
      var value = this.isEmpty() ? "" : wysihtml.quirks.getCorrectInnerHTML(this.element);
      if (parse !== false) {
        value = this.parent.parse(value, (clearInternals === false) ? false : true);
      }
      return value;
    },

    setValue: function(html, parse) {
      if (parse !== false) {
        html = this.parent.parse(html);
      }

      try {
        this.element.innerHTML = html;
      } catch (e) {
        this.element.innerText = html;
      }
    },

    cleanUp: function(rules) {
      var bookmark;
      if (this.selection && this.selection.isInThisEditable()) {
        bookmark = rangy.saveSelection(this.win);
      }
      this.parent.parse(this.element, undefined, rules);
      if (bookmark) {
        rangy.restoreSelection(bookmark);
      }
    },

    show: function() {
      this.editableArea.style.display = this._displayStyle || "";

      if (!this.config.noTextarea && !this.textarea.element.disabled) {
        // Firefox needs this, otherwise contentEditable becomes uneditable
        this.disable();
        this.enable();
      }
    },

    hide: function() {
      this._displayStyle = dom.getStyle("display").from(this.editableArea);
      if (this._displayStyle === "none") {
        this._displayStyle = null;
      }
      this.editableArea.style.display = "none";
    },

    disable: function() {
      this.parent.fire("disable:composer");
      this.element.removeAttribute("contentEditable");
    },

    enable: function() {
      this.parent.fire("enable:composer");
      this.element.setAttribute("contentEditable", "true");
    },

    focus: function(setToEnd) {
      // IE 8 fires the focus event after .focus()
      // This is needed by our simulate_placeholder.js to work
      // therefore we clear it ourselves this time
      if (wysihtml.browser.doesAsyncFocus() && this.hasPlaceholderSet()) {
        this.clear();
      }

      this.base();

      var lastChild = this.element.lastChild;
      if (setToEnd && lastChild && this.selection) {
        if (lastChild.nodeName === "BR") {
          this.selection.setBefore(this.element.lastChild);
        } else {
          this.selection.setAfter(this.element.lastChild);
        }
      }
    },

    getScrollPos: function() {
      if (this.doc && this.win) {
        var pos = {};

        if (typeof this.win.pageYOffset !== "undefined") {
          pos.y = this.win.pageYOffset;
        } else {
          pos.y = (this.doc.documentElement || this.doc.body.parentNode || this.doc.body).scrollTop;
        }

        if (typeof this.win.pageXOffset !== "undefined") {
          pos.x = this.win.pageXOffset;
        } else {
          pos.x = (this.doc.documentElement || this.doc.body.parentNode || this.doc.body).scrollLeft;
        }

        return pos;
      }
    },

    setScrollPos: function(pos) {
      if (pos && typeof pos.x !== "undefined" && typeof pos.y !== "undefined") {
        this.win.scrollTo(pos.x, pos.y);
      }
    },

    getTextContent: function() {
      return dom.getTextContent(this.element);
    },

    hasPlaceholderSet: function() {
      return this.getTextContent() == ((this.config.noTextarea) ? this.editableArea.getAttribute("data-placeholder") : this.textarea.element.getAttribute("placeholder")) && this.placeholderSet;
    },

    isEmpty: function() {
      var innerHTML = this.element.innerHTML.toLowerCase();
      return (/^(\s|<br>|<\/br>|<p>|<\/p>)*$/i).test(innerHTML)  ||
             innerHTML === ""            ||
             innerHTML === "<br>"        ||
             innerHTML === "<p></p>"     ||
             innerHTML === "<p><br></p>" ||
             this.hasPlaceholderSet();
    },

    _initContentEditableArea: function() {
        var that = this;
        if (this.config.noTextarea) {
            this.sandbox = new dom.ContentEditableArea(function() {
                that._create();
            }, {
              className: this.config.classNames.sandbox
            }, this.editableArea);
        } else {
            this.sandbox = new dom.ContentEditableArea(function() {
                that._create();
            }, {
              className: this.config.classNames.sandbox
            });
            this.editableArea = this.sandbox.getContentEditable();
            dom.insert(this.editableArea).after(this.textarea.element);
            this._createWysiwygFormField();
        }
    },

    _initSandbox: function() {
      var that = this;
      this.sandbox = new dom.Sandbox(function() {
        that._create();
      }, {
        stylesheets:  this.config.stylesheets,
        className: this.config.classNames.sandbox
      });
      this.editableArea  = this.sandbox.getIframe();

      var textareaElement = this.textarea.element;
      dom.insert(this.editableArea).after(textareaElement);

      this._createWysiwygFormField();
    },

    // Creates hidden field which tells the server after submit, that the user used an wysiwyg editor
    _createWysiwygFormField: function() {
        if (this.textarea.element.form) {
          var hiddenField = document.createElement("input");
          hiddenField.type   = "hidden";
          hiddenField.name   = "_wysihtml_mode";
          hiddenField.value  = 1;
          dom.insert(hiddenField).after(this.textarea.element);
        }
    },

    _create: function() {
      var that = this;
      this.doc                = this.sandbox.getDocument();
      this.win                = this.sandbox.getWindow();
      this.element            = (this.config.contentEditableMode) ? this.sandbox.getContentEditable() : this.doc.body;
      if (!this.config.noTextarea) {
          this.textarea           = this.parent.textarea;
          this.element.innerHTML  = this.textarea.getValue(true, false);
      } else {
          this.cleanUp(); // cleans contenteditable on initiation as it may contain html
      }

      // Make sure our selection handler is ready
      this.selection = new wysihtml.Selection(this.parent, this.element, this.config.classNames.uneditableContainer);

      // Make sure commands dispatcher is ready
      this.commands  = new wysihtml.Commands(this.parent);

      if (!this.config.noTextarea) {
          dom.copyAttributes([
              "className", "spellcheck", "title", "lang", "dir", "accessKey"
          ]).from(this.textarea.element).to(this.element);
      }

      this._initAutoLinking();

      dom.addClass(this.element, this.config.classNames.composer);
      //
      // Make the editor look like the original textarea, by syncing styles
      if (this.config.style && !this.config.contentEditableMode) {
        this.style();
      }

      this.observe();

      var name = this.config.name;
      if (name) {
        dom.addClass(this.element, name);
        if (!this.config.contentEditableMode) { dom.addClass(this.editableArea, name); }
      }

      this.enable();

      if (!this.config.noTextarea && this.textarea.element.disabled) {
        this.disable();
      }

      // Simulate html5 placeholder attribute on contentEditable element
      var placeholderText = typeof(this.config.placeholder) === "string"
        ? this.config.placeholder
        : ((this.config.noTextarea) ? this.editableArea.getAttribute("data-placeholder") : this.textarea.element.getAttribute("placeholder"));
      if (placeholderText) {
        dom.simulatePlaceholder(this.parent, this, placeholderText, this.config.classNames.placeholder);
      }

      // Make sure that the browser avoids using inline styles whenever possible
      this.commands.exec("styleWithCSS", false);

      this._initObjectResizing();
      this._initUndoManager();
      this._initLineBreaking();

      // Simulate html5 autofocus on contentEditable element
      // This doesn't work on IOS (5.1.1)
      if (!this.config.noTextarea && (this.textarea.element.hasAttribute("autofocus") || document.querySelector(":focus") == this.textarea.element) && !browser.isIos()) {
        setTimeout(function() { that.focus(true); }, 100);
      }

      // IE sometimes leaves a single paragraph, which can't be removed by the user
      if (!browser.clearsContentEditableCorrectly()) {
        wysihtml.quirks.ensureProperClearing(this);
      }

      // Set up a sync that makes sure that textarea and editor have the same content
      if (this.initSync && this.config.sync) {
        this.initSync();
      }

      // Okay hide the textarea, we are ready to go
      if (!this.config.noTextarea) { this.textarea.hide(); }

      // Fire global (before-)load event
      this.parent.fire("beforeload").fire("load");
    },

    _initAutoLinking: function() {
      var that                           = this,
          supportsDisablingOfAutoLinking = browser.canDisableAutoLinking(),
          supportsAutoLinking            = browser.doesAutoLinkingInContentEditable();

      if (supportsDisablingOfAutoLinking) {
        this.commands.exec("AutoUrlDetect", false, false);
      }

      if (!this.config.autoLink) {
        return;
      }

      // Only do the auto linking by ourselves when the browser doesn't support auto linking
      // OR when he supports auto linking but we were able to turn it off (IE9+)
      if (!supportsAutoLinking || (supportsAutoLinking && supportsDisablingOfAutoLinking)) {
        this.parent.on("newword:composer", function() {
          if (dom.getTextContent(that.element).match(dom.autoLink.URL_REG_EXP)) {
            var nodeWithSelection = that.selection.getSelectedNode(),
                uneditables = that.element.querySelectorAll("." + that.config.classNames.uneditableContainer),
                isInUneditable = false;

            for (var i = uneditables.length; i--;) {
              if (wysihtml.dom.contains(uneditables[i], nodeWithSelection)) {
                isInUneditable = true;
              }
            }

            if (!isInUneditable) dom.autoLink(nodeWithSelection, [that.config.classNames.uneditableContainer]);
          }
        });

        dom.observe(this.element, "blur", function() {
          dom.autoLink(that.element, [that.config.classNames.uneditableContainer]);
        });
      }

      // Assuming we have the following:
      //  <a href="http://www.google.de">http://www.google.de</a>
      // If a user now changes the url in the innerHTML we want to make sure that
      // it's synchronized with the href attribute (as long as the innerHTML is still a url)
      var // Use a live NodeList to check whether there are any links in the document
          links           = this.sandbox.getDocument().getElementsByTagName("a"),
          // The autoLink helper method reveals a reg exp to detect correct urls
          urlRegExp       = dom.autoLink.URL_REG_EXP,
          getTextContent  = function(element) {
            var textContent = wysihtml.lang.string(dom.getTextContent(element)).trim();
            if (textContent.substr(0, 4) === "www.") {
              textContent = "http://" + textContent;
            }
            return textContent;
          };

      dom.observe(this.element, "keydown", function(event) {
        if (!links.length) {
          return;
        }

        var selectedNode = that.selection.getSelectedNode(event.target.ownerDocument),
            link         = dom.getParentElement(selectedNode, { query: "a" }, 4),
            textContent;

        if (!link) {
          return;
        }

        textContent = getTextContent(link);
        // keydown is fired before the actual content is changed
        // therefore we set a timeout to change the href
        setTimeout(function() {
          var newTextContent = getTextContent(link);
          if (newTextContent === textContent) {
            return;
          }

          // Only set href when new href looks like a valid url
          if (newTextContent.match(urlRegExp)) {
            link.setAttribute("href", newTextContent);
          }
        }, 0);
      });
    },

    _initObjectResizing: function() {
      this.commands.exec("enableObjectResizing", true);

      // IE sets inline styles after resizing objects
      // The following lines make sure that the width/height css properties
      // are copied over to the width/height attributes
      if (browser.supportsEvent("resizeend")) {
        var properties        = ["width", "height"],
            propertiesLength  = properties.length,
            element           = this.element;

        dom.observe(element, "resizeend", function(event) {
          var target = event.target || event.srcElement,
              style  = target.style,
              i      = 0,
              property;

          if (target.nodeName !== "IMG") {
            return;
          }

          for (; i<propertiesLength; i++) {
            property = properties[i];
            if (style[property]) {
              target.setAttribute(property, parseInt(style[property], 10));
              style[property] = "";
            }
          }

          // After resizing IE sometimes forgets to remove the old resize handles
          wysihtml.quirks.redraw(element);
        });
      }
    },

    _initUndoManager: function() {
      this.undoManager = new wysihtml.UndoManager(this.parent);
    },

    _initLineBreaking: function() {
      var that                              = this,
          USE_NATIVE_LINE_BREAK_INSIDE_TAGS = "li, p, h1, h2, h3, h4, h5, h6",
          LIST_TAGS                         = "ul, ol, menu";

      function adjust(selectedNode) {
        var parentElement = dom.getParentElement(selectedNode, { query: "p, div" }, 2);
        if (parentElement && dom.contains(that.element, parentElement)) {
          that.selection.executeAndRestoreRangy(function() {
            if (that.config.useLineBreaks) {
              if (!parentElement.firstChild || (parentElement.firstChild === parentElement.lastChild && parentElement.firstChild.nodeType === 1 && parentElement.firstChild.classList.contains('rangySelectionBoundary'))) {
                parentElement.appendChild(that.doc.createElement('br'));
              }
              dom.replaceWithChildNodes(parentElement);
            } else if (parentElement.nodeName !== "P") {
              dom.renameElement(parentElement, "p");
            }
          });
        }
      }

      // Ensures when editor is empty and not line breaks mode, the inital state has a paragraph in it on focus with caret inside paragraph
      if (!this.config.useLineBreaks) {
        dom.observe(this.element, ["focus"], function() {
          if (that.isEmpty()) {
            setTimeout(function() {
              var paragraph = that.doc.createElement("P");
              that.element.innerHTML = "";
              that.element.appendChild(paragraph);
              if (!browser.displaysCaretInEmptyContentEditableCorrectly()) {
                paragraph.innerHTML = "<br>";
                that.selection.setBefore(paragraph.firstChild);
              } else {
                that.selection.selectNode(paragraph, true);
              }
            }, 0);
          }
        });
      }

      dom.observe(this.element, "keydown", function(event) {
        var keyCode = event.keyCode;

        if (event.shiftKey || event.ctrlKey || event.defaultPrevented) {
          return;
        }

        if (keyCode !== wysihtml.ENTER_KEY && keyCode !== wysihtml.BACKSPACE_KEY) {
          return;
        }
        var blockElement = dom.getParentElement(that.selection.getSelectedNode(), { query: USE_NATIVE_LINE_BREAK_INSIDE_TAGS }, 4);
        if (blockElement) {
          setTimeout(function() {
            // Unwrap paragraph after leaving a list or a H1-6
            var selectedNode = that.selection.getSelectedNode(),
                list;

            if (blockElement.nodeName === "LI") {
              if (!selectedNode) {
                return;
              }

              list = dom.getParentElement(selectedNode, { query: LIST_TAGS }, 2);

              if (!list) {
                adjust(selectedNode);
              }
            }

            if (keyCode === wysihtml.ENTER_KEY && blockElement.nodeName.match(/^H[1-6]$/)) {
              adjust(selectedNode);
            }
          }, 0);
          return;
        }
        if (that.config.useLineBreaks && keyCode === wysihtml.ENTER_KEY && !wysihtml.browser.insertsLineBreaksOnReturn()) {
          event.preventDefault();
          that.commands.exec("insertLineBreak");
        }
      });
    }
  });
})(wysihtml);

(function(wysihtml) {
  var dom             = wysihtml.dom,
      doc             = document,
      win             = window,
      HOST_TEMPLATE   = doc.createElement("div"),
      /**
       * Styles to copy from textarea to the composer element
       */
      TEXT_FORMATTING = [
        "background-color",
        "color", "cursor",
        "font-family", "font-size", "font-style", "font-variant", "font-weight",
        "line-height", "letter-spacing",
        "text-align", "text-decoration", "text-indent", "text-rendering",
        "word-break", "word-wrap", "word-spacing"
      ],
      /**
       * Styles to copy from textarea to the iframe
       */
      BOX_FORMATTING = [
        "background-color",
        "border-collapse",
        "border-bottom-color", "border-bottom-style", "border-bottom-width",
        "border-left-color", "border-left-style", "border-left-width",
        "border-right-color", "border-right-style", "border-right-width",
        "border-top-color", "border-top-style", "border-top-width",
        "clear", "display", "float",
        "margin-bottom", "margin-left", "margin-right", "margin-top",
        "outline-color", "outline-offset", "outline-width", "outline-style",
        "padding-left", "padding-right", "padding-top", "padding-bottom",
        "position", "top", "left", "right", "bottom", "z-index",
        "vertical-align", "text-align",
        "-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing",
        "-webkit-box-shadow", "-moz-box-shadow", "-ms-box-shadow","box-shadow",
        "-webkit-border-top-right-radius", "-moz-border-radius-topright", "border-top-right-radius",
        "-webkit-border-bottom-right-radius", "-moz-border-radius-bottomright", "border-bottom-right-radius",
        "-webkit-border-bottom-left-radius", "-moz-border-radius-bottomleft", "border-bottom-left-radius",
        "-webkit-border-top-left-radius", "-moz-border-radius-topleft", "border-top-left-radius",
        "width", "height"
      ],
      ADDITIONAL_CSS_RULES = [
        "html                 { height: 100%; }",
        "body                 { height: 100%; padding: 1px 0 0 0; margin: -1px 0 0 0; }",
        "body > p:first-child { margin-top: 0; }",
        "._wysihtml-temp     { display: none; }",
        wysihtml.browser.isGecko ?
          "body.placeholder { color: graytext !important; }" :
          "body.placeholder { color: #a9a9a9 !important; }",
        // Ensure that user see's broken images and can delete them
        "img:-moz-broken      { -moz-force-broken-image-icon: 1; height: 24px; width: 24px; }"
      ];

  /**
   * With "setActive" IE offers a smart way of focusing elements without scrolling them into view:
   * http://msdn.microsoft.com/en-us/library/ms536738(v=vs.85).aspx
   *
   * Other browsers need a more hacky way: (pssst don't tell my mama)
   * In order to prevent the element being scrolled into view when focusing it, we simply
   * move it out of the scrollable area, focus it, and reset it's position
   */
  var focusWithoutScrolling = function(element) {
    if (element.setActive) {
      // Following line could cause a js error when the textarea is invisible
      // See https://github.com/xing/wysihtml5/issues/9
      try { element.setActive(); } catch(e) {}
    } else {
      var elementStyle = element.style,
          originalScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop,
          originalScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft,
          originalStyles = {
            position:         elementStyle.position,
            top:              elementStyle.top,
            left:             elementStyle.left,
            WebkitUserSelect: elementStyle.WebkitUserSelect
          };

      dom.setStyles({
        position:         "absolute",
        top:              "-99999px",
        left:             "-99999px",
        // Don't ask why but temporarily setting -webkit-user-select to none makes the whole thing performing smoother
        WebkitUserSelect: "none"
      }).on(element);

      element.focus();

      dom.setStyles(originalStyles).on(element);

      if (win.scrollTo) {
        // Some browser extensions unset this method to prevent annoyances
        // "Better PopUp Blocker" for Chrome http://code.google.com/p/betterpopupblocker/source/browse/trunk/blockStart.js#100
        // Issue: http://code.google.com/p/betterpopupblocker/issues/detail?id=1
        win.scrollTo(originalScrollLeft, originalScrollTop);
      }
    }
  };


  wysihtml.views.Composer.prototype.style = function() {
    var that                  = this,
        originalActiveElement = doc.querySelector(":focus"),
        textareaElement       = this.textarea.element,
        hasPlaceholder        = textareaElement.hasAttribute("placeholder"),
        originalPlaceholder   = hasPlaceholder && textareaElement.getAttribute("placeholder"),
        originalDisplayValue  = textareaElement.style.display,
        originalDisabled      = textareaElement.disabled,
        displayValueForCopying;

    this.focusStylesHost      = HOST_TEMPLATE.cloneNode(false);
    this.blurStylesHost       = HOST_TEMPLATE.cloneNode(false);
    this.disabledStylesHost   = HOST_TEMPLATE.cloneNode(false);

    // Remove placeholder before copying (as the placeholder has an affect on the computed style)
    if (hasPlaceholder) {
      textareaElement.removeAttribute("placeholder");
    }

    if (textareaElement === originalActiveElement) {
      textareaElement.blur();
    }

    // enable for copying styles
    textareaElement.disabled = false;

    // set textarea to display="none" to get cascaded styles via getComputedStyle
    textareaElement.style.display = displayValueForCopying = "none";

    if ((textareaElement.getAttribute("rows") && dom.getStyle("height").from(textareaElement) === "auto") ||
        (textareaElement.getAttribute("cols") && dom.getStyle("width").from(textareaElement) === "auto")) {
      textareaElement.style.display = displayValueForCopying = originalDisplayValue;
    }

    // --------- iframe styles (has to be set before editor styles, otherwise IE9 sets wrong fontFamily on blurStylesHost) ---------
    dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.editableArea).andTo(this.blurStylesHost);

    // --------- editor styles ---------
    dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.element).andTo(this.blurStylesHost);

    // --------- apply standard rules ---------
    dom.insertCSS(ADDITIONAL_CSS_RULES).into(this.element.ownerDocument);

    // --------- :disabled styles ---------
    textareaElement.disabled = true;
    dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.disabledStylesHost);
    dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.disabledStylesHost);
    textareaElement.disabled = originalDisabled;

    // --------- :focus styles ---------
    textareaElement.style.display = originalDisplayValue;
    focusWithoutScrolling(textareaElement);
    textareaElement.style.display = displayValueForCopying;

    dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.focusStylesHost);
    dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.focusStylesHost);

    // reset textarea
    textareaElement.style.display = originalDisplayValue;

    dom.copyStyles(["display"]).from(textareaElement).to(this.editableArea);

    // Make sure that we don't change the display style of the iframe when copying styles oblur/onfocus
    // this is needed for when the change_view event is fired where the iframe is hidden and then
    // the blur event fires and re-displays it
    var boxFormattingStyles = wysihtml.lang.array(BOX_FORMATTING).without(["display"]);

    // --------- restore focus ---------
    if (originalActiveElement) {
      focusWithoutScrolling(originalActiveElement);
    } else {
      textareaElement.blur();
    }

    // --------- restore placeholder ---------
    if (hasPlaceholder) {
      textareaElement.setAttribute("placeholder", originalPlaceholder);
    }

    // --------- Sync focus/blur styles ---------
    this.parent.on("focus:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.focusStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.focusStylesHost).to(that.element);
    });

    this.parent.on("blur:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.blurStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.blurStylesHost).to(that.element);
    });

    this.parent.observe("disable:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.disabledStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.disabledStylesHost).to(that.element);
    });

    this.parent.observe("enable:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.blurStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.blurStylesHost).to(that.element);
    });

    return this;
  };
})(wysihtml);

/**
 * Taking care of events
 *  - Simulating 'change' event on contentEditable element
 *  - Handling drag & drop logic
 *  - Catch paste events
 *  - Dispatch proprietary newword:composer event
 *  - Keyboard shortcuts
 */
(function(wysihtml) {
  var dom       = wysihtml.dom,
      domNode = dom.domNode,
      browser   = wysihtml.browser,
      /**
       * Map keyCodes to query commands
       */
      shortcuts = {
        "66": "bold",     // B
        "73": "italic",   // I
        "85": "underline" // U
      };

  var actions = {

    // Adds multiple eventlisteners to target, bound to one callback
    // TODO: If needed elsewhere make it part of wysihtml.dom or sth
    addListeners: function (target, events, callback) {
      for(var i = 0, max = events.length; i < max; i++) {
        target.addEventListener(events[i], callback, false);
      }
    },

    // Removes multiple eventlisteners from target, bound to one callback
    // TODO: If needed elsewhere make it part of wysihtml.dom or sth
    removeListeners: function (target, events, callback) {
      for(var i = 0, max = events.length; i < max; i++) {
        target.removeEventListener(events[i], callback, false);
      }
    },

    // Override for giving user ability to delete last line break in table cell
    fixLastBrDeletionInTable: function(composer, force) {
      if (composer.selection.caretIsInTheEndOfNode()) {
        var sel = composer.selection.getSelection(),
            aNode = sel.anchorNode;
        if (aNode && aNode.nodeType === 1 && (wysihtml.dom.getParentElement(aNode, {query: 'td, th'}, false, composer.element) || force)) {
          var nextNode = aNode.childNodes[sel.anchorOffset];
          if (nextNode && nextNode.nodeType === 1 & nextNode.nodeName === "BR") {
            nextNode.parentNode.removeChild(nextNode);
            return true;
          }
        }
      }
      return false;
    },

    // If found an uneditable before caret then notify it before deletion
    handleUneditableDeletion: function(composer) {
      var before = composer.selection.getBeforeSelection(true);
      if (before && (before.type === "element" || before.type === "leafnode") && before.node.nodeType === 1 && before.node.classList.contains(composer.config.classNames.uneditableContainer)) {
        if (actions.fixLastBrDeletionInTable(composer, true)) {
          return true;
        }
        try {
          var ev = new CustomEvent("wysihtml:uneditable:delete", {bubbles: true, cancelable: false});
          before.node.dispatchEvent(ev);
        } catch (err) {}
        before.node.parentNode.removeChild(before.node);
        return true;
      }
      return false;
    },

    // Deletion with caret in the beginning of headings and other block elvel elements needs special attention
    // Not allways does it concate text to previous block node correctly (browsers do unexpected miracles here especially webkit)
    fixDeleteInTheBeginningOfBlock: function(composer) {
      var selection = composer.selection,
          prevNode = selection.getPreviousNode();

      if (selection.caretIsFirstInSelection(wysihtml.browser.usesControlRanges()) && prevNode) {
        if (prevNode.nodeType === 1 &&
            wysihtml.dom.domNode(prevNode).is.block() &&
            !domNode(prevNode).test({
              query: "ol, ul, table, tr, dl"
            })
        ) {
          if ((/^\s*$/).test(prevNode.textContent || prevNode.innerText)) {
            // If heading is empty remove the heading node
            prevNode.parentNode.removeChild(prevNode);
            return true;
          } else {
            if (prevNode.lastChild) {
              var selNode = prevNode.lastChild,
                  selectedNode = selection.getSelectedNode(),
                  commonAncestorNode = domNode(prevNode).commonAncestor(selectedNode, composer.element),
                  curNode = wysihtml.dom.getParentElement(selectedNode, {
                    query: "h1, h2, h3, h4, h5, h6, p, pre, div, blockquote"
                  }, false, commonAncestorNode || composer.element);

              if (curNode) {
                domNode(curNode).transferContentTo(prevNode, true);
                selection.setAfter(selNode);
                return true;
              } else if (wysihtml.browser.usesControlRanges()) {
                selectedNode = selection.getCaretNode();
                domNode(selectedNode).transferContentTo(prevNode, true);
                selection.setAfter(selNode);
                return true;
              }
            }
          }
        }
      }
      return false;
    },

    /* In IE when deleting with caret at the begining of LI, list gets broken into half instead of merging the LI with previous */
    /* This does not match other browsers an is less intuitive from UI standpoint, thus has to be fixed */
    fixDeleteInTheBeginningOfLi: function(composer) {
      if (wysihtml.browser.hasLiDeletingProblem()) {
        var selection = composer.selection.getSelection(),
            aNode = selection.anchorNode,
            listNode, prevNode, firstNode,
            isInBeginnig = composer.selection.caretIsFirstInSelection(),
            prevNode,
            intermediaryNode;

        // Fix caret at the beginnig of first textNode in LI
        if (aNode.nodeType === 3 && selection.anchorOffset === 0 && aNode === aNode.parentNode.firstChild) {
          aNode = aNode.parentNode;
          isInBeginnig = true;
        }

        if (isInBeginnig && aNode && aNode.nodeType === 1 && aNode.nodeName === "LI") {
          prevNode = domNode(aNode).prev({nodeTypes: [1,3], ignoreBlankTexts: true});
          if (!prevNode && aNode.parentNode && (aNode.parentNode.nodeName === "UL" || aNode.parentNode.nodeName === "OL")) {
            prevNode = domNode(aNode.parentNode).prev({nodeTypes: [1,3], ignoreBlankTexts: true});
            intermediaryNode = aNode.parentNode;
          }
          if (prevNode) {
            firstNode = aNode.firstChild;
            domNode(aNode).transferContentTo(prevNode, true);

            if (intermediaryNode && intermediaryNode.children.length === 0){
              intermediaryNode.remove();
            }

            if (firstNode) {
              composer.selection.setBefore(firstNode);
            } else if (prevNode) {
              if (prevNode.nodeType === 1) {
                if (prevNode.lastChild) {
                  composer.selection.setAfter(prevNode.lastChild);
                } else {
                  composer.selection.selectNode(prevNode);
                }
              } else {
                composer.selection.setAfter(prevNode);
              }
            }
            return true;
          }
        }
      }
      return false;
    },

    fixDeleteInTheBeginningOfControlSelection: function(composer) {
      var selection = composer.selection,
          prevNode = selection.getPreviousNode(),
          selectedNode = selection.getSelectedNode(),
          afterCaretNode;

      if (selection.caretIsFirstInSelection()) {
        if (selectedNode.nodeType === 3) {
          selectedNode = selectedNode.parentNode;
        }
        afterCaretNode = selectedNode.firstChild;
        domNode(selectedNode).transferContentTo(prevNode, true);
        if (afterCaretNode) {
          composer.selection.setBefore(afterCaretNode);
        }
        return true;
      }
      return false;
    },

    // Fixes some misbehaviours of enters in linebreaks mode (natively a bit unsupported feature)
    // Returns true if some corrections is applied so events know when to prevent default
    doLineBreaksModeEnterWithCaret: function(composer) {
      var breakNodes = "p, pre, div, blockquote",
          caretInfo, parent, txtNode,
          ret = false;

      caretInfo = composer.selection.getNodesNearCaret();
      if (caretInfo) {

        if (caretInfo.caretNode || caretInfo.nextNode) {
          parent = dom.getParentElement(caretInfo.caretNode || caretInfo.nextNode, { query: breakNodes }, 2);
          if (parent === composer.element) {
            parent = undefined;
          }
        }

        if (parent && caretInfo.caretNode) {
          if (domNode(caretInfo.caretNode).is.lineBreak()) {

            if (composer.config.doubleLineBreakEscapesBlock) {
              // Double enter (enter on blank line) exits block element in useLineBreaks mode.
              ret = true;
              caretInfo.caretNode.parentNode.removeChild(caretInfo.caretNode);

              // Ensure surplous line breaks are not added to preceding element
              if (domNode(caretInfo.nextNode).is.lineBreak()) {
                caretInfo.nextNode.parentNode.removeChild(caretInfo.nextNode);
              }

              var brNode = composer.doc.createElement('br');
              if (domNode(caretInfo.nextNode).is.lineBreak() && caretInfo.nextNode === parent.lastChild) {
                parent.parentNode.insertBefore(brNode, parent.nextSibling);
              } else {
                composer.selection.splitElementAtCaret(parent, brNode);
              }

              // Ensure surplous blank lines are not added to preceding element
              if (caretInfo.nextNode && caretInfo.nextNode.nodeType === 3) {
                // Replaces blank lines at the beginning of textnode
                caretInfo.nextNode.data = caretInfo.nextNode.data.replace(/^ *[\r\n]+/, '');
              }
              composer.selection.setBefore(brNode);
            }

          } else if (caretInfo.caretNode.nodeType === 3 && wysihtml.browser.hasCaretBlockElementIssue() && caretInfo.textOffset === caretInfo.caretNode.data.length && !caretInfo.nextNode) {

            // This fixes annoying webkit issue when you press enter at the end of a block then seemingly nothing happens.
            // in reality one line break is generated and cursor is reported after it, but when entering something cursor jumps before the br
            ret = true;
            var br1 = composer.doc.createElement('br'),
                br2 = composer.doc.createElement('br'),
                f = composer.doc.createDocumentFragment();
            f.appendChild(br1);
            f.appendChild(br2);
            composer.selection.insertNode(f);
            composer.selection.setBefore(br2);

          }
        }
      }
      return ret;
    }
  };

  var handleDeleteKeyPress = function(event, composer) {
    var selection = composer.selection,
        element = composer.element;

    if (selection.isCollapsed()) {
      /**
       * when the editor is empty in useLineBreaks = false mode, preserve
       * the default value in it which is <p><br></p>
       */
      if (composer.isEmpty() && !composer.config.useLineBreaks) {
        event.preventDefault();
        return;
      }
      if (actions.handleUneditableDeletion(composer)) {
        event.preventDefault();
        return;
      }
      if (actions.fixDeleteInTheBeginningOfLi(composer)) {
        event.preventDefault();
        return;
      }
      if (actions.fixDeleteInTheBeginningOfBlock(composer)) {
        event.preventDefault();
        return;
      }
      if (actions.fixLastBrDeletionInTable(composer)) {
        event.preventDefault();
        return;
      }
      if (wysihtml.browser.usesControlRanges()) {
        if (actions.fixDeleteInTheBeginningOfControlSelection(composer)) {
          event.preventDefault();
          return;
        }
      }
    } else {
      if (selection.containsUneditable()) {
        event.preventDefault();
        selection.deleteContents();
      }
    }
  };

  var handleEnterKeyPress = function(event, composer) {
    if (composer.config.useLineBreaks && !event.shiftKey && !event.ctrlKey) {
      // Fixes some misbehaviours of enters in linebreaks mode (natively a bit unsupported feature)

      var breakNodes = "p, pre, div, blockquote",
          caretInfo, parent, txtNode;

      if (composer.selection.isCollapsed()) {
        if (actions.doLineBreaksModeEnterWithCaret(composer)) {
          event.preventDefault();
        }
      }
    }

    if (browser.hasCaretAtLinkEndInsertionProblems() && composer.selection.caretIsInTheEndOfNode()) {
      var target = composer.selection.getSelectedNode(true),
          targetEl = (target && target.nodeType === 3) ? target.parentNode : target, // target guaranteed to be an Element
          invisibleSpace, space;

      if (targetEl && targetEl.closest('a') && target.nodeType === 3 && target === targetEl.lastChild) {
        // Seems like enter was pressed and caret was at the end of link node
        // This means user wants to escape the link now (caret is last in link node too).
        composer.selection.setAfter(targetEl);
      }
    }
  };

  var handleTabKeyDown = function(composer, element, shiftKey) {
    if (!composer.selection.isCollapsed()) {
      composer.selection.deleteContents();
    } else if (composer.selection.caretIsInTheBeginnig('li')) {
      if (shiftKey) {
        if (composer.commands.exec('outdentList')) return;
      } else {
        if (composer.commands.exec('indentList')) return;
      }
    }

    // Is &emsp; close enough to tab. Could not find enough counter arguments for now.
    composer.commands.exec("insertHTML", "&emsp;");
  };

  var handleDomNodeRemoved = function(event) {
      if (this.domNodeRemovedInterval) {
        clearInterval(domNodeRemovedInterval);
      }
      this.parent.fire("destroy:composer");
  };

  // Listens to "drop", "paste", "mouseup", "focus", "keyup" events and fires
  var handleUserInteraction = function (event) {
    this.parent.fire("beforeinteraction", event).fire("beforeinteraction:composer", event);
    setTimeout((function() {
      this.parent.fire("interaction", event).fire("interaction:composer", event);
    }).bind(this), 0);
  };

  var handleFocus = function(event) {
    this.parent.fire("focus", event).fire("focus:composer", event);

    // Delay storing of state until all focus handler are fired
    // especially the one which resets the placeholder
    setTimeout((function() {
      this.focusState = this.getValue(false, false);
    }).bind(this), 0);
  };

  var handleBlur = function(event) {
    if (this.focusState !== this.getValue(false, false)) {
      //create change event if supported (all except IE8)
      var changeevent = event;
      if(typeof Object.create == 'function') {
        changeevent = Object.create(event, { type: { value: 'change' } });
      }
      this.parent.fire("change", changeevent).fire("change:composer", changeevent);
    }
    this.parent.fire("blur", event).fire("blur:composer", event);
  };

  var handlePaste = function(event) {
    this.parent.fire(event.type, event).fire(event.type + ":composer", event);
    if (event.type === "paste") {
      setTimeout((function() {
        this.parent.fire("newword:composer");
      }).bind(this), 0);
    }
  };

  var handleCopy = function(event) {
    if (this.config.copyedFromMarking) {
      // If supported the copied source can be based directly on selection
      // Very useful for webkit based browsers where copy will otherwise contain a lot of code and styles based on whatever and not actually in selection.
      if (wysihtml.browser.supportsModernPaste()) {
        event.clipboardData.setData("text/html", this.config.copyedFromMarking + this.selection.getHtml());
        event.clipboardData.setData("text/plain", this.selection.getPlainText());
        event.preventDefault();
      }
      this.parent.fire(event.type, event).fire(event.type + ":composer", event);
    }
  };

  var handleKeyUp = function(event) {
    var keyCode = event.keyCode;
    if (keyCode === wysihtml.SPACE_KEY || keyCode === wysihtml.ENTER_KEY) {
      this.parent.fire("newword:composer");
    }
  };

  var handleMouseDown = function(event) {
    if (!browser.canSelectImagesInContentEditable()) {
      // Make sure that images are selected when clicking on them
      var target = event.target,
          allImages = this.element.querySelectorAll('img'),
          notMyImages = this.element.querySelectorAll('.' + this.config.classNames.uneditableContainer + ' img'),
          myImages = wysihtml.lang.array(allImages).without(notMyImages);

      if (target.nodeName === "IMG" && wysihtml.lang.array(myImages).contains(target)) {
        this.selection.selectNode(target);
      }
    }

    // Saves mousedown position for IE controlSelect fix
    if (wysihtml.browser.usesControlRanges()) {
      this.selection.lastMouseDownPos = {x: event.clientX, y: event.clientY};
      setTimeout(function() {
        delete this.selection.lastMouseDownPos;
      }.bind(this), 0);
    }
  };

  // IE has this madness of control selects of overflowed and some other elements (weird box around element on selection and second click selects text)
  // This fix handles the second click problem by adding cursor to the right position under cursor inside when controlSelection is made
  var handleIEControlSelect = function(event) {
    var target = event.target,
        pos = this.selection.lastMouseDownPos;
    if (pos) {
      var caretPosition = document.body.createTextRange();
        setTimeout(function() {
          try {
            caretPosition.moveToPoint(pos.x, pos.y);
            caretPosition.select();
          } catch (e) {}
        }.bind(this), 0);
    }
  };

  var handleClick = function(event) {
    if (this.config.classNames.uneditableContainer) {
      // If uneditables is configured, makes clicking on uneditable move caret after clicked element (so it can be deleted like text)
      // If uneditable needs text selection itself event.stopPropagation can be used to prevent this behaviour
      var uneditable = wysihtml.dom.getParentElement(event.target, { query: "." + this.config.classNames.uneditableContainer }, false, this.element);
      if (uneditable) {
        this.selection.setAfter(uneditable);
      }
    }
  };

  var handleDrop = function(event) {
    if (!browser.canSelectImagesInContentEditable()) {
      // TODO: if I knew how to get dropped elements list from event I could limit it to only IMG element case
      setTimeout((function() {
        this.selection.getSelection().removeAllRanges();
      }).bind(this), 0);
    }
  };

  var handleKeyDown = function(event) {
    var keyCode = event.keyCode,
        command = shortcuts[keyCode],
        target = this.selection.getSelectedNode(true),
        targetEl = (target && target.nodeType === 3) ? target.parentNode : target, // target guaranteed to be an Element
        parent;

    // Select all (meta/ctrl + a)
    if ((event.ctrlKey || event.metaKey) && !event.altKey && keyCode === 65) {
      this.selection.selectAll();
      event.preventDefault();
      return;
    }

    // Shortcut logic
    if ((event.ctrlKey || event.metaKey) && !event.altKey && command) {
      this.commands.exec(command);
      event.preventDefault();
    }

    if (keyCode === wysihtml.BACKSPACE_KEY) {
      // Delete key override for special cases
      handleDeleteKeyPress(event, this);
    }

    // Make sure that when pressing backspace/delete on selected images deletes the image and it's anchor
    if (keyCode === wysihtml.BACKSPACE_KEY || keyCode === wysihtml.DELETE_KEY) {
      if (target && target.nodeName === "IMG") {
        event.preventDefault();
        parent = target.parentNode;
        parent.removeChild(target);// delete the <img>
        // And it's parent <a> too if it hasn't got any other child nodes
        if (parent.nodeName === "A" && !parent.firstChild) {
          parent.parentNode.removeChild(parent);
        }
        setTimeout((function() {
          wysihtml.quirks.redraw(this.element);
        }).bind(this), 0);
      }
    }

    if (this.config.handleTabKey && keyCode === wysihtml.TAB_KEY) {
      // TAB key handling
      event.preventDefault();
      handleTabKeyDown(this, this.element, event.shiftKey);
    }

    if (keyCode === wysihtml.ENTER_KEY) {
      handleEnterKeyPress(event, this);
    }

  };

  var handleKeyPress = function(event) {

    // This block should run only if some character is inserted (nor command keys like delete, backspace, enter, etc.)
    if (event.which !== 0) {

      // Test if caret is last in a link in webkit and try to fix webkit problem,
      // that all inserted content is added outside of link.
      // This issue was added as a not thought through fix for getting caret after link in contenteditable if it is last in editable area.
      // Allthough it fixes this minor case it actually introduces a cascade of problems when editing links.
      // The standard approachi in other wysiwygs seems as a step backwards - introducing a separate modal for managing links content text.
      // I find it to be too big of a tradeoff in terms of expected simple UI flow, thus trying to fight against it.
      // Also adds link escaping by double space with caret at the end of link for all browsers

      if (this.selection.caretIsInTheEndOfNode()) {
        var target = this.selection.getSelectedNode(true),
            targetEl = (target && target.nodeType === 3) ? target.parentNode : target, // target guaranteed to be an Element
            invisibleSpace, space;

        if (targetEl && targetEl.closest('a') && target === targetEl.lastChild) {

          if (event.which !== 32 || this.selection.caretIsInTheEndOfNode(true) && browser.hasCaretAtLinkEndInsertionProblems()) {
            // Executed if there is no whitespace before caret in textnode in case of pressing space.
            // Whitespace before marks that user wants to escape the node by pressing double space.
            // Otherwise insert the character in the link not out as it would like to go natively

            invisibleSpace = this.doc.createTextNode(wysihtml.INVISIBLE_SPACE);
            this.selection.insertNode(invisibleSpace);
            this.selection.setBefore(invisibleSpace);
            setTimeout(function() {

              if (invisibleSpace.textContent.length > 1) {
                invisibleSpace.textContent = invisibleSpace.textContent.replace(wysihtml.INVISIBLE_SPACE_REG_EXP, '');
                this.selection.setAfter(invisibleSpace);
              } else {
                invisibleSpace.remove();
              }

            }.bind(this), 0);
          } else if (event.which === 32) {
            // Seems like space was pressed and there was a space before the caret allready
            // This means user wants to escape the link now (caret is last in link node too) so we let the native browser do it-s job and escape.
            // But lets move the trailing space too out of link if present

            if (target.nodeType === 3 && (/[\u00A0 ]$/).test(target.textContent)) {

              target.textContent = target.textContent.replace(/[\u00A0 ]$/, '');
              space = this.doc.createTextNode(' ');
              targetEl.parentNode.insertBefore(space, targetEl.nextSibling);
              this.selection.setAfter(space, false);
              event.preventDefault();

            }
          }
        }
      }
    }
  }

  var handleIframeFocus = function(event) {
    setTimeout((function() {
      if (this.doc.querySelector(":focus") !== this.element) {
        this.focus();
      }
    }).bind(this), 0);
  };

  var handleIframeBlur = function(event) {
    setTimeout((function() {
      this.selection.getSelection().removeAllRanges();
    }).bind(this), 0);
  };

  // Testing requires actions to be accessible from out of scope
  wysihtml.views.Composer.prototype.observeActions = actions;

  wysihtml.views.Composer.prototype.observe = function() {
    var that                = this,
        container           = (this.sandbox.getIframe) ? this.sandbox.getIframe() : this.sandbox.getContentEditable(),
        element             = this.element,
        focusBlurElement    = (browser.supportsEventsInIframeCorrectly() || this.sandbox.getContentEditable) ? this.element : this.sandbox.getWindow();

    this.focusState = this.getValue(false, false);
    this.actions = actions;

    // --------- destroy:composer event ---------
    container.addEventListener(["DOMNodeRemoved"], handleDomNodeRemoved.bind(this), false);

    // DOMNodeRemoved event is not supported in IE 8
    // TODO: try to figure out a polyfill style fix, so it could be transferred to polyfills and removed if ie8 is not needed
    if (!browser.supportsMutationEvents()) {
      this.domNodeRemovedInterval = setInterval(function() {
        if (!dom.contains(document.documentElement, container)) {
          handleDomNodeRemoved.call(this);
        }
      }, 250);
    }

    actions.addListeners(focusBlurElement, ['drop', 'paste', 'mouseup', 'focus', 'keyup'], handleUserInteraction.bind(this));
    focusBlurElement.addEventListener('focus', handleFocus.bind(this), false);
    focusBlurElement.addEventListener('blur',  handleBlur.bind(this), false);

    actions.addListeners(this.element, ['drop', 'paste', 'beforepaste'], handlePaste.bind(this), false);
    this.element.addEventListener('copy',       handleCopy.bind(this), false);
    this.element.addEventListener('mousedown',  handleMouseDown.bind(this), false);
    this.element.addEventListener('click',      handleClick.bind(this), false);
    this.element.addEventListener('drop',       handleDrop.bind(this), false);
    this.element.addEventListener('keyup',      handleKeyUp.bind(this), false);
    this.element.addEventListener('keydown',    handleKeyDown.bind(this), false);
    this.element.addEventListener('keypress',   handleKeyPress.bind(this), false);

    // IE controlselect madness fix
    if (wysihtml.browser.usesControlRanges()) {
      this.element.addEventListener('mscontrolselect', handleIEControlSelect.bind(this), false);
    }

    this.element.addEventListener("dragenter", (function() {
      this.parent.fire("unset_placeholder");
    }).bind(this), false);

  };
})(wysihtml);

/**
 * Class that takes care that the value of the composer and the textarea is always in sync
 */
(function(wysihtml) {
  var INTERVAL = 400;

  wysihtml.views.Synchronizer = Base.extend(
    /** @scope wysihtml.views.Synchronizer.prototype */ {

    constructor: function(editor, textarea, composer) {
      this.editor   = editor;
      this.textarea = textarea;
      this.composer = composer;

      this._observe();
    },

    /**
     * Sync html from composer to textarea
     * Takes care of placeholders
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the textarea
     */
    fromComposerToTextarea: function(shouldParseHtml) {
      this.textarea.setValue(wysihtml.lang.string(this.composer.getValue(false, false)).trim(), shouldParseHtml);
    },

    /**
     * Sync value of textarea to composer
     * Takes care of placeholders
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer
     */
    fromTextareaToComposer: function(shouldParseHtml) {
      var textareaValue = this.textarea.getValue(false, false);
      if (textareaValue) {
        this.composer.setValue(textareaValue, shouldParseHtml);
      } else {
        this.composer.clear();
        this.editor.fire("set_placeholder");
      }
    },

    /**
     * Invoke syncing based on view state
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer/textarea
     */
    sync: function(shouldParseHtml) {
      if (this.editor.currentView.name === "textarea") {
        this.fromTextareaToComposer(shouldParseHtml);
      } else {
        this.fromComposerToTextarea(shouldParseHtml);
      }
    },

    /**
     * Initializes interval-based syncing
     * also makes sure that on-submit the composer's content is synced with the textarea
     * immediately when the form gets submitted
     */
    _observe: function() {
      var interval,
          that          = this,
          form          = this.textarea.element.form,
          startInterval = function() {
            interval = setInterval(function() { that.fromComposerToTextarea(); }, INTERVAL);
          },
          stopInterval  = function() {
            clearInterval(interval);
            interval = null;
          };

      startInterval();

      if (form) {
        // If the textarea is in a form make sure that after onreset and onsubmit the composer
        // has the correct state
        wysihtml.dom.observe(form, "submit", function() {
          that.sync(true);
        });
        wysihtml.dom.observe(form, "reset", function() {
          setTimeout(function() { that.fromTextareaToComposer(); }, 0);
        });
      }

      this.editor.on("change_view", function(view) {
        if (view === "composer" && !interval) {
          that.fromTextareaToComposer(true);
          startInterval();
        } else if (view === "textarea") {
          that.fromComposerToTextarea(true);
          stopInterval();
        }
      });

      this.editor.on("destroy:composer", stopInterval);
    }
  });
})(wysihtml);

(function(wysihtml) {

  wysihtml.views.SourceView = Base.extend(
    /** @scope wysihtml.views.SourceView.prototype */ {

    constructor: function(editor, composer) {
      this.editor   = editor;
      this.composer = composer;

      this._observe();
    },

    switchToTextarea: function(shouldParseHtml) {
      var composerStyles = this.composer.win.getComputedStyle(this.composer.element),
          width = parseFloat(composerStyles.width),
          height = Math.max(parseFloat(composerStyles.height), 100);

      if (!this.textarea) {
        this.textarea = this.composer.doc.createElement('textarea');
        this.textarea.className = "wysihtml-source-view";
      }
      this.textarea.style.width = width + 'px';
      this.textarea.style.height = height + 'px';
      this.textarea.value = this.editor.getValue(shouldParseHtml, true);
      this.composer.element.parentNode.insertBefore(this.textarea, this.composer.element);
      this.editor.currentView = "source";
      this.composer.element.style.display = 'none';
    },

    switchToComposer: function(shouldParseHtml) {
      var textareaValue = this.textarea.value;
      if (textareaValue) {
        this.composer.setValue(textareaValue, shouldParseHtml);
      } else {
        this.composer.clear();
        this.editor.fire("set_placeholder");
      }
      this.textarea.parentNode.removeChild(this.textarea);
      this.editor.currentView = this.composer;
      this.composer.element.style.display = '';
    },

    _observe: function() {
      this.editor.on("change_view", function(view) {
        if (view === "composer") {
          this.switchToComposer(true);
        } else if (view === "textarea") {
          this.switchToTextarea(true);
        }
      }.bind(this));
    }

  });

})(wysihtml);

wysihtml.views.Textarea = wysihtml.views.View.extend(
  /** @scope wysihtml.views.Textarea.prototype */ {
  name: "textarea",

  constructor: function(parent, textareaElement, config) {
    this.base(parent, textareaElement, config);

    this._observe();
  },

  clear: function() {
    this.element.value = "";
  },

  getValue: function(parse) {
    var value = this.isEmpty() ? "" : this.element.value;
    if (parse !== false) {
      value = this.parent.parse(value);
    }
    return value;
  },

  setValue: function(html, parse) {
    if (parse !== false) {
      html = this.parent.parse(html);
    }
    this.element.value = html;
  },

  cleanUp: function(rules) {
      var html = this.parent.parse(this.element.value, undefined, rules);
      this.element.value = html;
  },

  hasPlaceholderSet: function() {
    var supportsPlaceholder = wysihtml.browser.supportsPlaceholderAttributeOn(this.element),
        placeholderText     = this.element.getAttribute("placeholder") || null,
        value               = this.element.value,
        isEmpty             = !value;
    return (supportsPlaceholder && isEmpty) || (value === placeholderText);
  },

  isEmpty: function() {
    return !wysihtml.lang.string(this.element.value).trim() || this.hasPlaceholderSet();
  },

  _observe: function() {
    var element = this.element,
        parent  = this.parent,
        eventMapping = {
          focusin:  "focus",
          focusout: "blur"
        },
        /**
         * Calling focus() or blur() on an element doesn't synchronously trigger the attached focus/blur events
         * This is the case for focusin and focusout, so let's use them whenever possible, kkthxbai
         */
        events = wysihtml.browser.supportsEvent("focusin") ? ["focusin", "focusout", "change"] : ["focus", "blur", "change"];

    parent.on("beforeload", function() {
      wysihtml.dom.observe(element, events, function(event) {
        var eventName = eventMapping[event.type] || event.type;
        parent.fire(eventName).fire(eventName + ":textarea");
      });

      wysihtml.dom.observe(element, ["paste", "drop"], function() {
        setTimeout(function() { parent.fire("paste").fire("paste:textarea"); }, 0);
      });
    });
  }
});

/**
 * WYSIHTML Editor
 *
 * @param {Element} editableElement Reference to the textarea which should be turned into a rich text interface
 * @param {Object} [config] See defaults object below for explanation of each individual config option
 *
 * @events
 *    load
 *    beforeload (for internal use only)
 *    focus
 *    focus:composer
 *    focus:textarea
 *    blur
 *    blur:composer
 *    blur:textarea
 *    change
 *    change:composer
 *    change:textarea
 *    paste
 *    paste:composer
 *    paste:textarea
 *    newword:composer
 *    destroy:composer
 *    undo:composer
 *    redo:composer
 *    beforecommand:composer
 *    aftercommand:composer
 *    enable:composer
 *    disable:composer
 *    change_view
 */
(function(wysihtml) {
  var undef;

  wysihtml.Editor = wysihtml.lang.Dispatcher.extend({
    /** @scope wysihtml.Editor.prototype */
    defaults: {
      // Give the editor a name, the name will also be set as class name on the iframe and on the iframe's body
      name:                 undef,
      // Whether the editor should look like the textarea (by adopting styles)
      style:                true,
      // Whether urls, entered by the user should automatically become clickable-links
      autoLink:             true,
      // Tab key inserts tab into text as default behaviour. It can be disabled to regain keyboard navigation
      handleTabKey:         true,
      // Object which includes parser rules to apply when html gets cleaned
      // See parser_rules/*.js for examples
      parserRules:          { tags: { br: {}, span: {}, div: {}, p: {}, b: {}, i: {}, u: {} }, classes: {} },
      // Object which includes parser when the user inserts content via copy & paste. If null parserRules will be used instead
      pasteParserRulesets: null,
      // Parser method to use when the user inserts content
      parser:               wysihtml.dom.parse,
      // By default wysihtml will insert a <br> for line breaks, set this to false to use <p>
      useLineBreaks:        true,
      // Double enter (enter on blank line) exits block element in useLineBreaks mode.
      // It enables a way of escaping out of block elements and splitting block elements
      doubleLineBreakEscapesBlock: true,
      // Array (or single string) of stylesheet urls to be loaded in the editor's iframe
      stylesheets:          [],
      // Placeholder text to use, defaults to the placeholder attribute on the textarea element
      placeholderText:      undef,
      // Whether the rich text editor should be rendered on touch devices (wysihtml >= 0.3.0 comes with basic support for iOS 5)
      supportTouchDevices:  true,
      // Whether senseless <span> elements (empty or without attributes) should be removed/replaced with their content
      cleanUp:              true,
      // Whether to use div instead of secure iframe
      contentEditableMode: false,
      classNames: {
        // Class name which should be set on the contentEditable element in the created sandbox iframe, can be styled via the 'stylesheets' option
        composer: "wysihtml-editor",
        // Class name to add to the body when the wysihtml editor is supported
        body: "wysihtml-supported",
        // classname added to editable area element (iframe/div) on creation
        sandbox: "wysihtml-sandbox",
        // class on editable area with placeholder
        placeholder: "wysihtml-placeholder",
        // Classname of container that editor should not touch and pass through
        uneditableContainer: "wysihtml-uneditable-container"
      },
      // Browsers that support copied source handling will get a marking of the origin of the copied source (for determinig code cleanup rules on paste)
      // Also copied source is based directly on selection - 
      // (very useful for webkit based browsers where copy will otherwise contain a lot of code and styles based on whatever and not actually in selection).
      // If falsy value is passed source override is also disabled
      copyedFromMarking: '<meta name="copied-from" content="wysihtml">'
    },
    
    constructor: function(editableElement, config) {
      this.editableElement  = typeof(editableElement) === "string" ? document.getElementById(editableElement) : editableElement;
      this.config           = wysihtml.lang.object({}).merge(this.defaults).merge(config).get();
      this._isCompatible    = wysihtml.browser.supported();

      // merge classNames
      if (config && config.classNames) {
        wysihtml.lang.object(this.config.classNames).merge(config.classNames);
      }

      if (this.editableElement.nodeName.toLowerCase() != "textarea") {
          this.config.contentEditableMode = true;
          this.config.noTextarea = true;
      }
      if (!this.config.noTextarea) {
          this.textarea         = new wysihtml.views.Textarea(this, this.editableElement, this.config);
          this.currentView      = this.textarea;
      }

      // Sort out unsupported/unwanted browsers here
      if (!this._isCompatible || (!this.config.supportTouchDevices && wysihtml.browser.isTouchDevice())) {
        var that = this;
        setTimeout(function() { that.fire("beforeload").fire("load"); }, 0);
        return;
      }

      // Add class name to body, to indicate that the editor is supported
      wysihtml.dom.addClass(document.body, this.config.classNames.body);

      this.composer = new wysihtml.views.Composer(this, this.editableElement, this.config);
      this.currentView = this.composer;

      if (typeof(this.config.parser) === "function") {
        this._initParser();
      }

      this.on("beforeload", this.handleBeforeLoad);
    },

    handleBeforeLoad: function() {
        if (!this.config.noTextarea) {
          this.synchronizer = new wysihtml.views.Synchronizer(this, this.textarea, this.composer);
        } else {
          this.sourceView = new wysihtml.views.SourceView(this, this.composer);
        }
        this.runEditorExtenders();
    },
    
    runEditorExtenders: function() {
      wysihtml.editorExtenders.forEach(function(extender) {
        extender(this);
      }.bind(this));
    },

    isCompatible: function() {
      return this._isCompatible;
    },

    clear: function() {
      this.currentView.clear();
      return this;
    },

    getValue: function(parse, clearInternals) {
      return this.currentView.getValue(parse, clearInternals);
    },

    setValue: function(html, parse) {
      this.fire("unset_placeholder");

      if (!html) {
        return this.clear();
      }

      this.currentView.setValue(html, parse);
      return this;
    },

    cleanUp: function(rules) {
        this.currentView.cleanUp(rules);
    },

    focus: function(setToEnd) {
      this.currentView.focus(setToEnd);
      return this;
    },

    /**
     * Deactivate editor (make it readonly)
     */
    disable: function() {
      this.currentView.disable();
      return this;
    },

    /**
     * Activate editor
     */
    enable: function() {
      this.currentView.enable();
      return this;
    },

    isEmpty: function() {
      return this.currentView.isEmpty();
    },

    hasPlaceholderSet: function() {
      return this.currentView.hasPlaceholderSet();
    },

    destroy: function() {
      if (this.composer && this.composer.sandbox) {
        this.composer.sandbox.destroy();
      }
      this.fire("destroy:composer");
      this.off();
    },

    parse: function(htmlOrElement, clearInternals, customRules) {
      var parseContext = (this.config.contentEditableMode) ? document : ((this.composer) ? this.composer.sandbox.getDocument() : null);
      var returnValue = this.config.parser(htmlOrElement, {
        "rules": customRules || this.config.parserRules,
        "cleanUp": this.config.cleanUp,
        "context": parseContext,
        "uneditableClass": this.config.classNames.uneditableContainer,
        "clearInternals" : clearInternals
      });
      if (typeof(htmlOrElement) === "object") {
        wysihtml.quirks.redraw(htmlOrElement);
      }
      return returnValue;
    },

    /**
     * Prepare html parser logic
     *  - Observes for paste and drop
     */
    _initParser: function() {
      var oldHtml;

      if (wysihtml.browser.supportsModernPaste()) {
        this.on("paste:composer", function(event) {
          event.preventDefault();
          oldHtml = wysihtml.dom.getPastedHtml(event);
          if (oldHtml) {
            this._cleanAndPaste(oldHtml);
          }
        }.bind(this));

      } else {
        this.on("beforepaste:composer", function(event) {
          event.preventDefault();
          var scrollPos = this.composer.getScrollPos();

          wysihtml.dom.getPastedHtmlWithDiv(this.composer, function(pastedHTML) {
            if (pastedHTML) {
              this._cleanAndPaste(pastedHTML);
            }
            this.composer.setScrollPos(scrollPos);
          }.bind(this));

        }.bind(this));
      }
    },

    _cleanAndPaste: function (oldHtml) {
      var cleanHtml = wysihtml.quirks.cleanPastedHTML(oldHtml, {
        "referenceNode": this.composer.element,
        "rules": this.config.pasteParserRulesets || [{"set": this.config.parserRules}],
        "uneditableClass": this.config.classNames.uneditableContainer
      });
      this.composer.selection.deleteContents();
      this.composer.selection.insertHTML(cleanHtml);
    }
  });
})(wysihtml);
