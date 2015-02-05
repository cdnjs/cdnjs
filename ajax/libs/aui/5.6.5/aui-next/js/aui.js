;
(function () {

  'use strict';


  // The rules used to hide elements during the ready lifecycle callback.
  var hiddenRules = document.createElement('style');


  // Observers
  // ---------

  // Normalise the mutaiton observer constructor.
  var MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;

  if (!MutationObserver) {
    MutationObserver = function (callback) {
      this.callback = callback;
      this.elements = [];
    };

    MutationObserver.prototype = {
      observe: function (target, options) {
        var that = this;
        var attributeOldValueCache = {};
        var item = {
          target: target,
          options: options,
          insertHandler: function (e) {
            if (!canTriggerInsertOrRemove(e)) {
              return;
            }

            that.callback([
              mutationRecord(e, {
                addedNodes: [e.target]
              })
            ]);
          },
          removeHandler: function (e) {
            if (!canTriggerInsertOrRemove(e)) {
              return;
            }

            that.callback([
              mutationRecord(e, {
                removedNodes: [e.target]
              })
            ]);
          },
          attributeHandler: function (e) {
            if (!canTriggerAttributeModification(e)) {
              return;
            }

            that.callback([
              mutationRecord(e, {
                attributeName: e.attrName,
                oldValue: options.attributeOldValue ? (attributeOldValueCache[e.attrName] || e.prevValue || null) : null,
                type: 'attributes'
              })
            ]);

            // We keep track of old values so that when IE incorrectly reports the old value we can ensure it is
            // actually correct.
            if (options.attributeOldValue) {
              attributeOldValueCache[e.attrName] = e.newValue;
            }
          }
        };

        this.elements.push(item);

        if (options.childList) {
          target.addEventListener('DOMSubtreeModified', item.insertHandler);
          target.addEventListener('DOMNodeRemoved', item.removeHandler);
        }

        if (options.attributes) {
          target.addEventListener('DOMAttrModified', item.attributeHandler);
        }

        return this;

        function canTriggerInsertOrRemove (e) {
          return options.childList && (options.subtree || e.target.parentNode === target);
        }

        function canTriggerAttributeModification (e) {
          return e.target === target;
        }

        function mutationRecord (e, merge) {
          return inherit(merge, {
            addedNodes: null,
            attributeName: null,
            attributeNamespace: null,
            nextSibling: e.target.nextSibling,
            oldValue: null,
            previousSibling: e.target.previousSibling,
            removedNodes: null,
            target: e.target,
            type: 'childList'
          });
        }
      },

      disconnect: function () {
        for (var a in this.elements) {
          var item = this.elements[a];
          item.target.removeEventListener('DOMSubtreeModified', item.insertHandler);
          item.target.removeEventListener('DOMNodeRemoved', item.removeHandler);
          item.target.removeEventListener('DOMAttrModified', item.attributeHandler);
        }
      }
    };
  }


  // Public API
  // ----------

  var documentObserver;
  var skateComponents = {};

  /**
   * Creates a listener for the specified component.
   *
   * @param {String} id The ID of the component.
   * @param {Object | Function} component The component definition.
   *
   * @return {Function} Function or constructor that creates a custom-element for the component.
   */
  function skate (id, component) {
    if (!documentObserver) {
      documentObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          skate.init(mutation.addedNodes);
          triggerRemoveAll(mutation.removedNodes);
        });
      });

      documentObserver.observe(document, {
        childList: true,
        subtree: true
      });
    }

    if (!component) {
      component = {};
    }

    if (typeof component === 'function') {
      component = {
        insert: component
      };
    }

    inherit(component, skate.defaults);

    var Element = makeElementConstructor(id, component);

    if (component.ready) {
      hiddenRules.sheet.insertRule(
        id + ':not(.' + component.classname + '),' +
        '[' + id + ']:not(.' + component.classname + '),' +
        '.' + id + ':not(.' + component.classname + '){display:none}',
        hiddenRules.sheet.cssRules.length
      );
    }

    var existing = Element.existing();

    for (var a = 0; a < existing.length; a++) {
      triggerLifecycle(id, component, existing[a]);
    }

    skateComponents[id] = component;

    return Element;
  }

  // Restriction type constants.
  skate.types = {
    ANY: 'act',
    ATTR: 'a',
    CLASS: 'c',
    NOATTR: 'ct',
    NOCLASS: 'at',
    NOTAG: 'ac',
    TAG: 't'
  };

  // Default configuration.
  skate.defaults = {
    // Set to `{...}` of `attrName: `{ init: ..., update: ..., remove: ... }` to listen to specific attributes.
    attributes: false,

    // The classname to use when showing this component.
    classname: '__skate',

    // Whether or not to start listening right away.
    listen: true,

    // Properties and methods to add to each element.
    prototype: {},

    // The type of bindings to allow.
    type: skate.types.ANY
  };

  /**
   * Ensures the passed element or elements aren't initialised.
   *
   * @param {Element | Traversable} elements The element or elements to blacklist.
   * @param {Boolean} andDescendants Whether or not to blacklist element descendants.
   *
   * @return {skate}
   */
  skate.blacklist = function (elements, andDescendants) {
    if (andDescendants === undefined) {
      andDescendants = true;
    }

    eachElement(elements, function (element) {
      data(element, 'blacklisted', true);

      if (andDescendants) {
        skate.blacklist(element.children, true);
      }
    });

    return skate;
  };

  /**
   * Stops listening.
   *
   * @return {skate}
   */
  skate.destroy = function () {
    documentObserver.disconnect();
    documentObserver = undefined;
    skateComponents = {};
    return skate;
  };

  /**
   * Synchronously initialises the specified element or elements.
   *
   * @param {Element | Traversable} elements The element or elements to init.
   *
   * @return {skate}
   */
  skate.init = function (elements) {
    eachElement(elements, function (element) {
      for (var possibleId in possibleIds(element)) {
        if (possibleId in skateComponents) {
          triggerLifecycle(possibleId, skateComponents[possibleId], element);
        }
      }

      skate.init(element.children);
    });

    return skate;
  };

  /**
   * Creates a new mutation observer for the specified element.
   *
   * @param {Function} callback The callback to execute for the observer.
   *
   * @return {MutationObserver}
   */
  skate.watch = function (callback) {
    return new MutationObserver(callback);
  };

  /**
   * Ensures the passed element or elements aren't blacklisted.
   *
   * @param {Element | Traversable} elements The element or elements to blacklist.
   * @param {Boolean} andDescendants Whether or not to whitelist element descendants.
   *
   * @return {skate}
   */
  skate.whitelist = function (elements, andDescendants) {
    if (andDescendants === undefined) {
      andDescendants = true;
    }

    eachElement(elements, function (element) {
      data(element, 'blacklisted', undefined);

      if (andDescendants) {
        skate.whitelist(element.children, true);
      }
    });

    return skate;
  };


  // Lifecycle Triggers
  // ------------------

  // Triggers the entire lifecycle.
  function triggerLifecycle (id, component, target) {
    if (data(target, 'blacklisted')) {
      return;
    }

    triggerReady(id, component, target, function (replaceWith) {
      if (!replaceWith) {
        return triggerInsert(id, component, target);
      }

      if (replaceWith === target || !target.parentNode) {
        return;
      }

      // A placeholder for replacing the current element.
      var comment = document.createComment('placeholder');

      // Replace the target with the placeholder.
      target.parentNode.insertBefore(comment, target);
      target.parentNode.removeChild(target);

      // Handle HTML.
      if (typeof replaceWith === 'string') {
        var div = document.createElement('div');
        div.innerHTML = replaceWith;
        replaceWith = div.children;
      }

      // Place each item before the comment in sequence.
      eachElement(replaceWith, function (element) {
        comment.parentNode.insertBefore(element, comment);
      });

      // Cleanup.
      comment.parentNode.removeChild(comment);
    });
  }

  // Triggers the ready callback and continues execution to the insert callback.
  function triggerReady (id, component, target, done) {
    var definedMultipleArgs = /^[^(]+\([^,)]+,/;
    var readyFn = component.ready;
    done = done || function () {};

    if (data(target, id + '.ready-called')) {
      return done();
    }

    data(target, id + '.ready-called', true);
    inherit(target, component.prototype);

    if (readyFn && definedMultipleArgs.test(readyFn)) {
      readyFn(target, done);
    } else if (readyFn) {
      done(readyFn(target));
    } else {
      done();
    }
  }

  // Triggers insert on the target.
  function triggerInsert (id, component, target) {
    var insertFn = component.insert;

    if (data(target, id + '.insert-called')) {
      return;
    }

    if (!target.parentNode) {
      return;
    }

    data(target, id + '.insert-called', true);
    triggerAttributes(id, component, target);
    addClass(target, component.classname);

    if (insertFn) {
      insertFn(target);
    }
  }

  // Triggers remove on the target.
  function triggerRemove (id, component, target) {
    if (component.remove && !data(target, 'blacklisted') && !data(target, id + '.remove-called')) {
      data(target, id + '.remove-called', true);
      component.remove(target);
    }
  }

  // Triggers the remove callbacks of the specified elements and their descendants.
  function triggerRemoveAll (elements) {
    eachElement(elements, function (element) {
      triggerRemoveAll(element.children);
      for (var possibleId in possibleIds(element)) {
        if (possibleId in skateComponents) {
          triggerRemove(possibleId, skateComponents[possibleId], element);
        }
      }
    });
  }

  // Initialises and binds attribute handlers.
  function triggerAttributes (id, component, target) {
    if (!component.attributes || data(target, id + '.attributes-called')) {
      return;
    }

    data(target, id + '.attributes-called', true);

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var name = mutation.attributeName;
        var attr = target.attributes[name];
        var lifecycle = component.attributes[name];

        if (!lifecycle) {
          return;
        }

        if (attr && mutation.oldValue === null && (lifecycle.insert || lifecycle.update || lifecycle)) {
          insert(lifecycle, target, attr.nodeValue);
        } else if (attr && mutation.oldValue !== null && (lifecycle.update || lifecycle)) {
          update(lifecycle, target, attr.nodeValue, mutation.oldValue);
        } else if (!attr && lifecycle.remove) {
          remove(lifecycle, target, mutation.oldValue);
        }
      });
    });

    observer.observe(target, {
      attributes: true,
      attributeOldValue: true
    });

    // Now trigger init on each attribute.
    for (var a = 0; a < target.attributes.length; a++) {
      var attribute = target.attributes[a];
      var lifecycle = component.attributes[attribute.nodeName];

      if (lifecycle) {
        insert(lifecycle, target, attribute.nodeValue);
      }
    }

    function insert (lifecycle, element, newValue) {
      (lifecycle.insert || lifecycle.update || lifecycle)(element, newValue);
    }

    function update (lifecycle, element, newValue, oldValue) {
      (lifecycle.update || lifecycle)(element, newValue, oldValue);
    }

    function remove (lifecycle, element, oldValue) {
      lifecycle.remove(element, oldValue);
    }
  }


  // Utilities
  // ---------

  function data (element, name, value) {
    if (value === undefined) {
      return element.__SKATE_DATA && element.__SKATE_DATA[name];
    }

    if (!element.__SKATE_DATA) {
      element.__SKATE_DATA = {};
    }

    element.__SKATE_DATA[name] = value;

    return element;
  }

  // Adds the specified class to the element.
  function addClass (element, classname) {
    if (element.classList) {
      element.classList.add(classname);
    } else {
      element.className += element.className ? ' ' + classname : classname;
    }
  }

  // Calls the specified callback for each element.
  function eachElement (elements, callback) {
    if (!elements) {
      return;
    }

    if (elements.nodeType) {
      if (elements.nodeType === 1) {
        elements = [elements];
      } else {
        return;
      }
    }

    if (!elements.length) {
      return;
    }

    for (var a = 0; a < elements.length; a++) {
      if (elements[a] && elements[a].nodeType === 1) {
        callback(elements[a], a);
      }
    }
  }

  // Returns the possible ids from an element.
  function possibleIds (element) {
    var ids = data(element, 'possible-ids');

    if (ids) {
      return ids;
    }

    var tag = element.tagName.toLowerCase();

    ids = {};
    ids[tag] = tag;

    for (var a = 0; a < element.attributes.length; a++) {
      var name = element.attributes[a].nodeName;
      ids[name] = name;
    }

    element.className.split(' ').forEach(function (id) {
      if (id) {
        ids[id] = id;
      }
    });

    data(element, 'possible-ids', ids);

    return ids;
  }

  // Merges the second argument into the first.
  function inherit (child, parent) {
    for (var prop in parent) {
      if (child[prop] === undefined) {
        child[prop] = parent[prop];
      }
    }

    return child;
  }

  // Creates a constructor for the specified component.
  function makeElementConstructor (id, component) {
    var isTag = component.type.indexOf(skate.types.TAG) > -1;
    var isAttr = component.type.indexOf(skate.types.ATTR) > -1;
    var isClass = component.type.indexOf(skate.types.CLASS) > -1;
    var selector = (function () {
        var selectors = [];

        if (isTag) {
          selectors.push(id);
        }

        if (isAttr) {
          selectors.push('[' + id + ']');
        }

        if (isClass) {
          selectors.push('.' + id);
        }

        return selectors.join(', ');
      }());
    var ctor = function () {
        if (!isTag) {
          throw new Error('Cannot construct "' + id + '" as a custom element.');
        }

        var element = document.createElement(id);
        triggerReady(id, component, element);
        return element;
      };

    ctor.existing = function (within) {
      return (within || document).querySelectorAll(ctor.selector());
    };

    ctor.selector = function () {
      return selector;
    };

    return ctor;
  }


  // Global Setup
  // ------------

  // Rules that hide elements as they're inserted so that elements are hidden
  // prior to calling the ready callback to prevent FOUC if the component
  // modifies the element in which it is bound.
  document.getElementsByTagName('head')[0].appendChild(hiddenRules);


  // Exporting
  // ---------

  if (typeof define === 'function' && define.amd) {
    define('skate', [], function () {
      return skate;
    });
  } else {
    window.skate = skate;
  }

})();

jQuery.os = {};
var jQueryOSplatform = navigator.platform.toLowerCase();
jQuery.os.windows = (jQueryOSplatform.indexOf("win") != -1);
jQuery.os.mac = (jQueryOSplatform.indexOf("mac") != -1);
jQuery.os.linux = (jQueryOSplatform.indexOf("linux") != -1);
/**
 *
 * @module Controls
 * @requires AJS, jQuery
 */

/**
 * If not visible, moves the scroll position of the screen to the element
 *
 * <pre>
 * <strong>Usage:</strong>
 * jQuery("li.item").moveTo();
 * </pre>
 *
 * This plugin also supports options as an argument.  The options
 * that can be defined are:
 * <ul>
 * <li>transition - if set to true will cause a smooth scrolling transition (false by default)</li>
 * <li>scrollOffset - defines an offset to scroll past the element to view in pixels such that
 * all of it can be viewed (35 pixels by default)</li>
 * </ul>
 *
 * @class moveTo
 * @constuctor moveTo
 * @namespace jQuery.fn
 * @param {Object} options
 */
jQuery.fn.moveTo = function (options) {
    var defaults = {
        transition: false,
        scrollOffset: 35
    };

    var opts = jQuery.extend(defaults, options),
        instance = this,
        topOffset = instance.offset().top,
        scrollTarget;

    if ((jQuery(window).scrollTop() + jQuery(window).height() - this.outerHeight() < topOffset ||
            jQuery(window).scrollTop() + opts.scrollOffset > topOffset) &&
            jQuery(window).height() > opts.scrollOffset) {

        if(jQuery(window).scrollTop() + opts.scrollOffset > topOffset) {
            //move up
            scrollTarget = topOffset - (jQuery(window).height() - this.outerHeight()) + opts.scrollOffset;
        } else {
            //move down
            scrollTarget = topOffset - opts.scrollOffset;
        }

        if (!jQuery.fn.moveTo.animating && opts.transition) {
            jQuery(document).trigger("moveToStarted", this);
            jQuery.fn.moveTo.animating = true;
            jQuery("html,body").animate({
                scrollTop: scrollTarget
            }, 1000, function () {
                jQuery(document).trigger("moveToFinished", instance);
                delete jQuery.fn.moveTo.animating;
            });
            return this;
        } else {
            var jQueryCache =  jQuery('html, body');
            if (jQueryCache.is(":animated")) {
                jQueryCache.stop();
                delete jQuery.fn.moveTo.animating;
            }

            jQuery(document).trigger("moveToStarted");
            jQuery(window).scrollTop(scrollTarget);
            //need to put a slight timeout for the moveToFinished event such that recipients of this event
            //have time to act on it.
            setTimeout(function() {
                jQuery(document).trigger("moveToFinished", instance);
            }, 100);
            return this;
        }
    }
    jQuery(document).trigger("moveToFinished", this);
    return this;
};
(function() {

    if (window.CustomEvent) {
        return;
    }

    function CustomEvent (event, params) {
        params = params || {};

        var evt = document.createEvent('CustomEvent');

        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

        return evt;
    };

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;

}());

/*! Atlassian UI and the Atlassian Design Guidelines are created by Atlassian. See https://developer.atlassian.com/display/AUI/ for API documentation and https://developer.atlassian.com/design/ for license details. */

/**
 * A collection of Atlassian JavaScript UI components.
 *
 * AUI components/functions should be assumed Private unless included in the API documentation at http://developer.atlassian.com/display/AUI
 *
 * @module AJS
 * @requires jQuery
 */
(function () {

    'use strict';

    if (!window.jQuery && !window.Zepto) {
        throw new Error('either jQuery or Zepto is required for AJS to function.');
    }

    if (typeof window.console === 'undefined') {
        window.console = {
            messages: [],

            log: function (text) {
                this.messages.push(text);
            },

            show: function () {
                alert(this.messages.join('\n'));
                this.messages = [];
            }
        };
    } else {
        // Firebug console - show not required to do anything.
        console.show = function () {};
    }

    /**
     * AJS contains utility methods, used by various components. It also provides the namespacing for all AUI components.
     *
     * @class AJS
     * @requires jQuery
     */
    window.AJS = (function () {
        var included = [];
        var uniqueID;
        var uniqueIDstring;
        var uniqueIDcounter = 0;

        function escapeHtmlReplacement(str) {
            var special = {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '\'': '&#39;',
                '`': '&#96;'
            };

            if (typeof special[str] === 'string') {
                return special[str];
            }

            return '&quot;';
        }

        var ESCAPE_HTML_SPECIAL_CHARS = /[&"'<>`]/g;
        var res = {
            /**
             * Version number to allow for rough backwards compatibility via conditionals
             * NOTE: Don't change. Generated by the Maven at build.
             * @property version
             */
            version: '5.6.5',

            /**
             * Parameters are loaded from the DOM on page load.
             * @property params
             */
            params: {},

            /**
             * Returns an HTMLElement reference.
             * @method $
             * @param {String | HTMLElement |Array} el Accepts a string to use as an ID for getting a DOM reference, an actual DOM reference, or an Array of IDs and/or HTMLElements.
             * @return {HTMLElement | Array} A DOM reference to an HTML element or an array of HTMLElements.
             */
            $: window.jQuery || window.Zepto,

            /**
             * Logs the given object to the console.
             * @param obj object to log
             */
            log: (function () {
                if (typeof console !== 'undefined' && console.log) {
                    if (Function.prototype.bind) {
                        return Function.prototype.bind.call(console.log, console);
                    } else {
                        return function() {
                            Function.prototype.apply.call(console.log, console, arguments);
                        }
                    }
                }

                return function() {};
            }()),

            /**
             * Logs the given object to the console as a warning.
             * @param obj object to log
             */
            warn: function () {
                if (typeof console !== 'undefined' && console.warn) {
                    Function.prototype.apply.apply(console.warn, [console, arguments]);
                }
            },

            /**
             * Logs the given object to the console as an error.
             * @param obj object to log
             */
            error: function () {
                if (typeof console !== 'undefined' && console.error) {
                    Function.prototype.apply.apply(console.error, [console, arguments]);
                }
            },

            /**
             * Calls e.preventDefault. This is designed for event handlers that only need to prevent the default browser
             * action, eg:
             * AJS.$(".my-class").click(AJS.preventDefault)
             * @param e jQuery event
             */
            preventDefault: function (e) {
                e.preventDefault();
            },

            /**
             * Prevent further handling of an event. Returns false, which you should use as the return value of your event handler:
             * return AJS.stopEvent(e);
             * @param e jQuery event
             * @deprecated use AJS.preventDefault() instead
             */
            stopEvent: function (e) {
                e.stopPropagation();
                return false; // required for JWebUnit pop-up links to work properly
            },

            include: function (url) {
                if (!this.contains(included, url)) {
                    included.push(url);
                    var s = document.createElement('script');
                    s.src = url;
                    this.$('body').append(s);
                }
            },

            /**
             * Shortcut function to toggle class name of an element.
             * @method toggleClassName
             * @param {String | HTMLElement} element The HTMLElement or an ID to toggle class name on.
             * @param {String} className The class name to remove or add.
             */
            toggleClassName: function (element, className) {
                if (!(element = this.$(element))) {
                    return;
                }

                element.toggleClass(className);
            },

            /**
             * Shortcut function adds or removes 'hidden' classname to an element based on a passed boolean.
             * @method setVisible
             * @param {String | HTMLElement} element The HTMLElement or an ID to show or hide.
             * @param {boolean} show true to show, false to hide
             */
            setVisible: function (element, show) {
                if (!(element = this.$(element))) {
                    return;
                }
                // aliased for use inside function below
                var $ = this.$;

                $(element).each(function () {
                    var isHidden = $(this).hasClass('hidden');

                    if (isHidden && show) {
                        $(this).removeClass('hidden');
                    } else if (!isHidden && !show) {
                        $(this).addClass('hidden');
                    }
                });
            },

            /**
             * Shortcut function adds or removes 'current' classname to an element based on a passed boolean.
             * @param {String | HTMLElement} element The HTMLElement or an ID to show or hide.
             * @param {boolean} show true to add 'current' class, false to remove
             */
            setCurrent: function (element, current) {
                if (!(element = this.$(element))) {
                    return;
                }

                if (current) {
                    element.addClass('current');
                }
                else {
                    element.removeClass('current');
                }
            },

            /**
             * Shortcut function to see if passed element is currently visible on screen.
             * @method isVisible
             * @param {String | HTMLElement} element The HTMLElement or an jQuery selector to check.
             */
            isVisible: function (element) {
                return !this.$(element).hasClass('hidden');
            },

            /**
             * Shortcut function to see if passed element is truncated/clipped, eg. with text-overflow: ellipsis
             * @method isClipped
             * @param {String | HTMLElement} element The HTMLElement or an jQuery selector to check.
             */
            isClipped: function (el) {
                el = AJS.$(el);
                return (el.prop('scrollWidth') > el.prop('clientWidth'));
            },

            /**
             * Find parameters in the DOM and store them in the provided object, or the ajs.params object if parameter is not present.
             */
            populateParameters: function (parameters) {
                if (!parameters) {
                    parameters = this.params;
                }

                var ajs = this;

                this.$('.parameters input').each(function () {
                    var value = this.value,
                        id = this.title || this.id;
                    if (ajs.$(this).hasClass('list')) {
                        if (parameters[id]) {
                            parameters[id].push(value);
                        } else {
                            parameters[id] = [value];
                        }
                    } else {
                        parameters[id] = (value.match(/^(tru|fals)e$/i) ? value.toLowerCase() === 'true' : value);
                    }
                });
            },

            /**
             * Adds functions to the list of methods to be run on initialisation. Wraps
             * error handling around the provided function so its failure won't prevent
             * other init functions running.
             * @method toInit
             * @param {Function} func Function to be call on initialisation.
             * @return AJS object.
             */
            toInit: function (func) {
                var ajs = this;

                this.$(function () {
                    try {
                        func.apply(this, arguments);
                    } catch (ex) {
                        ajs.log('Failed to run init function: ' + ex + '\n' + func.toString());
                    }
                });

                return this;
            },

            /**
             * Finds the index of an element in the array.
             * @method indexOf
             * @param item Array element which will be searched.
             * @param fromIndex (optional) the index from which the item will be searched. Negative values will search from the
             * end of the array.
             * @return a zero based index of the element.
             */
            indexOf: function (array, item, fromIndex) {
                var length = array.length;

                if (!fromIndex) {
                    fromIndex = 0;
                } else if (fromIndex < 0) {
                    fromIndex = Math.max(0, length + fromIndex);
                }

                for (var i = fromIndex; i < length; i++) {
                    if (array[i] === item) {
                        return i;
                    }
                }

                return -1;
            },

            /**
             * Looks for an element inside the array.
             * @method contains
             * @param item Array element which will be searched.
             * @return {Boolean} Is element in array.
             */
            contains: function (array, item) {
                return this.indexOf(array, item) > -1;
            },

            /**
             * Includes firebug lite for debugging in IE. Especially in IE.
             * @method firebug
             * @usage Type in addressbar "javascript:alert(AJS.firebug());"
             * @deprecated
             */
            firebug: function () {
                // Deprecated in 5.1
                AJS.log('DEPRECATED: AJS.firebug should no longer be used.');
                var script = this.$(document.createElement('script'));
                script.attr('src', 'https://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');
                this.$('head').append(script);
                (function () {
                    if (window.firebug) {
                        firebug.init();
                    } else {
                        setTimeout(AJS.firebug, 0);
                    }
                })();
            },

            /**
             * Clones the element specified by the selector and removes the id attribute
             * @param selector a jQuery selector
             */
            clone : function (selector) {
                return AJS.$(selector).clone().removeAttr('id');
            },

            /**
             * Compare two strings in alphanumeric way
             * @method alphanum
             * @param {String} a first string to compare
             * @param {String} b second string to compare
             * @return {Number(-1|0|1)} -1 if a < b, 0 if a = b, 1 if a > b
             * @usage a.sort(AJS.alphanum)
             */
            alphanum: function (a, b) {
                a = (a + '').toLowerCase();
                b = (b + '').toLowerCase();

                var chunks = /(\d+|\D+)/g;
                var am = a.match(chunks);
                var bm = b.match(chunks);
                var len = Math.max(am.length, bm.length);

                for (var i = 0; i < len; i++) {
                    if (i === am.length) {
                        return -1;
                    }

                    if (i === bm.length) {
                        return 1;
                    }

                    var ad = parseInt(am[i], 10) + '';
                    var bd = parseInt(bm[i], 10) + '';

                    if (ad === am[i] && bd === bm[i] && ad !== bd) {
                        return (ad - bd) / Math.abs(ad - bd);
                    }

                    if ((ad !== am[i] || bd !== bm[i]) && am[i] !== bm[i]) {
                        return am[i] < bm[i] ? -1 : 1;
                    }
                }
                return 0;
            },

            onTextResize: function (f) {
                if (typeof f === 'function') {
                    if (AJS.onTextResize['on-text-resize']) {
                        AJS.onTextResize['on-text-resize'].push(function (emsize) {
                            f(emsize);
                        });
                    } else {
                        var em = AJS('div');

                        em.css({
                            width: '1em',
                            height: '1em',
                            position: 'absolute',
                            top: '-9999em',
                            left: '-9999em'
                        });

                        this.$('body').append(em);
                        em.size = em.width();

                        setInterval(function () {
                            if (em.size !== em.width()) {
                                em.size = em.width();

                                for (var i = 0, ii = AJS.onTextResize['on-text-resize'].length; i < ii; i++) {
                                    AJS.onTextResize['on-text-resize'][i](em.size);
                                }
                            }
                        }, 0);
                        AJS.onTextResize.em = em;
                        AJS.onTextResize['on-text-resize'] = [function (emsize) {
                            f(emsize);
                        }];
                    }
                }
            },

            unbindTextResize: function (f) {
                for (var i = 0, ii = AJS.onTextResize['on-text-resize'].length; i < ii; i++) {
                    if (AJS.onTextResize['on-text-resize'][i] === f) {
                        return AJS.onTextResize['on-text-resize'].splice(i, 1);
                    }
                }
            },

            /**
             * Similar to Javascript's in-built escape() function, but where the built-in escape()
             * might encode unicode charaters as %uHHHH, this function will leave them as-is.
             *
             * NOTE: this function does not do html-escaping, see AJS.escapeHtml()
             */
            escape: function (string) {
                return escape(string).replace(/%u\w{4}/gi, function (w) {
                    return unescape(w);
                });
            },

            /**
             * Sanitise a string for use with innerHTML or as an attribute.
             *
             * @param {String} str
             */
            escapeHtml: function (str) {
                return str.replace(ESCAPE_HTML_SPECIAL_CHARS, escapeHtmlReplacement);
            },

            /**
             * Filters a list of entries by a passed search term.
             *
             * Options :
             *   - "keywordsField" - name of entry field containing keywords, default "keywords"
             *   - "ignoreForCamelCase" - ignore search case for camel case, e.g. CB matches Code Block *and* Code block
             *   - "matchBoundary" - match words only at boundary, e.g. link matches "linking" but not "hyperlinks"
             *   - "splitRegex" - regex to split search words, instead of on whitespace
             *
             * @param entries an index array of objects with a "keywords" property
             * @param search one or more words to search on, which may include camel-casing.
             * @param options - optional - specifiy to override default behaviour
             */
            filterBySearch : function (entries, search, options) {
                // search for nothing, get nothing - up to calling code to handle.
                if (!search) {
                    return [];
                }

                var $ = this.$;
                var keywordsField = (options && options.keywordsField) || 'keywords';
                var camelCaseFlags = (options && options.ignoreForCamelCase) ? 'i' : '';
                var boundaryFlag  = (options && options.matchBoundary) ? '\\b' : '';
                var splitRegex = (options && options.splitRegex) || (/\s+/);

                // each word in the input is considered a distinct filter that has to match a keyword in the record
                var filterWords = search.split(splitRegex);
                var filters = [];

                filterWords.forEach(function(word) {
                    // anchor on word boundaries
                    var subfilters = [new RegExp(boundaryFlag + word, 'i')];

                    // split camel-case into separate words
                    if (/^([A-Z][a-z]*) {2,}$/.test(this)) {
                        var camelRegexStr = this.replace(/([A-Z][a-z]*)/g, '\\b$1[^,]*');

                        subfilters.push(new RegExp(camelRegexStr, camelCaseFlags));
                    }

                    filters.push(subfilters);
                });

                var result = [];

                entries.forEach(function(entry) {
                    for (var i = 0; i < filters.length; i++) {
                        var somethingMatches = false;

                        for (var j = 0; j < filters[i].length; j++) {
                            if (filters[i][j].test(entry[keywordsField])) {
                                somethingMatches = true;
                                break;
                            }
                        }

                        if (!somethingMatches) {
                            return;
                        }
                    }

                    result.push(entry);
                });

                return result;
            },

            /**
             * Draws an AUI logo with SVG.
             * @deprecated
             */
            drawLogo : function (options) {
                // Deprecated in 5.1
                AJS.log('DEPRECATED: AJS.drawLogo should no longer be used.');

                var scale = options.scaleFactor || 1;
                var fill = options.fill || '#fff';
                var stroke = options.stroke || '#000';
                var width = 400 * scale;
                var height = 40 * scale;
                var strokeWidth = options.strokeWidth || 1;
                var containerID = options.containerID || '.aui-logo';

                if (!AJS.$('.aui-logo').length) {
                    AJS.$('body').append('<div id="aui-logo" class="aui-logo"><div>');
                }

                var logoCanvas = Raphael(containerID, width + 50 * scale, height + 100 * scale);
                var logo = logoCanvas.path('M 0,0 c 3.5433333,-4.7243333 7.0866667,-9.4486667 10.63,-14.173 -14.173,0 -28.346,0 -42.519,0 C -35.432667,-9.4486667 -38.976333,-4.7243333 -42.52,0 -28.346667,0 -14.173333,0 0,0 z m 277.031,28.346 c -14.17367,0 -28.34733,0 -42.521,0 C 245.14,14.173 255.77,0 266.4,-14.173 c -14.17267,0 -28.34533,0 -42.518,0 C 213.25167,0 202.62133,14.173 191.991,28.346 c -14.17333,0 -28.34667,0 -42.52,0 14.17333,-18.8976667 28.34667,-37.7953333 42.52,-56.693 -7.08667,-9.448667 -14.17333,-18.897333 -21.26,-28.346 -14.173,0 -28.346,0 -42.519,0 7.08667,9.448667 14.17333,18.897333 21.26,28.346 -14.17333,18.8976667 -28.34667,37.7953333 -42.52,56.693 -14.173333,0 -28.346667,0 -42.52,0 10.63,-14.173 21.26,-28.346 31.89,-42.519 -14.390333,0 -28.780667,0 -43.171,0 C 42.520733,1.330715e-4 31.889933,14.174867 21.26,28.347 c -42.520624,6.24e-4 -85.039187,-8.13e-4 -127.559,-0.001 11.220667,-14.961 22.441333,-29.922 33.662,-44.883 -6.496,-8.661 -12.992,-17.322 -19.488,-25.983 5.905333,0 11.810667,0 17.716,0 -10.63,-14.173333 -21.26,-28.346667 -31.89,-42.52 14.173333,0 28.346667,0 42.52,0 10.63,14.173333 21.26,28.346667 31.89,42.52 14.173333,0 28.3466667,0 42.52,0 -10.63,-14.173333 -21.26,-28.346667 -31.89,-42.52 14.1733333,0 28.3466667,0 42.52,0 10.63,14.173333 21.26,28.346667 31.89,42.52 14.390333,0 28.780667,0 43.171,0 -10.63,-14.173333 -21.26,-28.346667 -31.89,-42.52 42.51967,0 85.03933,0 127.559,0 10.63033,14.173333 21.26067,28.346667 31.891,42.52 14.17267,0 28.34533,0 42.518,0 -10.63,-14.173333 -21.26,-28.346667 -31.89,-42.52 14.17367,0 28.34733,0 42.521,0 14.17333,18.897667 28.34667,37.795333 42.52,56.693 -14.17333,18.8976667 -28.34667,37.7953333 -42.52,56.693 z');

                logo.scale(scale, -scale, 0, 0);
                logo.translate(120 * scale, height);
                logo.attr('fill', fill);
                logo.attr('stroke', stroke);
                logo.attr('stroke-width', strokeWidth);
            },

            /**
             * Debounce a function to avoid performance problems.
             */
            debounce: function (func, wait) {
                var timeout;
                var result;
                return function () {
                    var args = arguments;
                    var context = this;
                    var debounced = function () {
                        result = func.apply(context, args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(debounced, wait);
                    return result;
                };
            },

            /**
             * Generate a unique ID string, checking the ID is not present in the DOM before returning.
             * Note uniqueID, uniqueIDstring, uniqueIDcounter = 0; set at top of file.
             * @param {string} prefix Optional. String to prepend to ID instead of default AUI prefix.
             */
            id: function (prefix) {
                uniqueID = uniqueIDcounter++ + '';
                uniqueIDstring = prefix ? prefix + uniqueID : 'aui-uid-' + uniqueID;

                if (!document.getElementById(uniqueIDstring)) {
                    return uniqueIDstring;
                } else {
                    uniqueIDstring = uniqueIDstring + '-' + new Date().getTime();

                    if (!document.getElementById(uniqueIDstring)) {
                        return uniqueIDstring;
                    } else {
                        // if we still have a clash, something is deeply weird and needs attention.
                        throw new Error('ERROR: timestamped fallback ID ' + uniqueIDstring + ' exists. AJS.id stopped.');
                    }
                }
            },

            /**
             * Apply a unique ID to the element. Preserves ID if the element already has one.
             * @private
             * @param {HTMLElement} el Selector to find target element.
             * @param {string} prefix Optional. String to prepend to ID instead of default AUI prefix.
             */
            _addID: function (el, prefix) {
                var element = AJS.$(el);
                var addprefix = prefix || false;

                element.each(function () {
                    var $el = AJS.$(this);

                    if (!$el.attr('id')) {
                        $el.attr('id', AJS.id(addprefix));
                    }
                });
            },

            /**
             * Enables or disables any matching elements.
             */
            enable: function (el, b) {
                var $el = AJS.$(el);

                if (typeof b === 'undefined') {
                    b = true;
                }

                return $el.each(function () {
                    this.disabled = !b;
                });
            }
        };

        if (typeof AJS !== 'undefined') {
            for (var i in AJS) {
                res[i] = AJS[i];
            }
        }

        /**
         * Creates DOM object
         * @method AJS
         * @param {String} element tag name
         * @return {jQuery object}
         * @usage var a = AJS("div");
         */
        var result = function () {
            var res = null;

            if (arguments.length && typeof arguments[0] === 'string') {
                res = AJS.$(document.createElement(arguments[0]));

                if (arguments.length === 2) {
                    res.html(arguments[1]);
                }
            }

            return res;
        };

        for (var j in res) {
            result[j] = res[j];
        }

        return result;
    })();

    AJS.$(function () {
        //add version data to the body
        var $body = AJS.$('body');

        if (!$body.data('auiVersion')) {
            $body.attr('data-aui-version', AJS.version);
        }

        AJS.populateParameters();
    });

    // Setting Traditional to handle our default param serialisation
    // See http://api.jquery.com/jQuery.param/ for more
    AJS.$.ajaxSettings.traditional = true;

})();

/**
 * Replaces tokens in a string with arguments, similar to Java's MessageFormat.
 * Tokens are in the form {0}, {1}, {2}, etc.
 *
 * This version also provides support for simple choice formats (excluding floating point numbers) of the form
 * {0,choice,0#0 issues|1#1 issue|1<{0,number} issues}
 *
 * Number format is currently not implemented, tokens of the form {0,number} will simply be printed as {0}
 *
 * @method format
 * @param message the message to replace tokens in
 * @param arg (optional) replacement value for token {0}, with subsequent arguments being {1}, etc.
 * @return {String} the message with the tokens replaced
 * @usage AJS.format("This is a {0} test", "simple");
 */
AJS.format = function (message) {
    var apos = /'(?!')/g, // founds "'", but not "''"
        simpleFormat = /^\d+$/,
        numberFormat = /^(\d+),number$/, // TODO: incomplete, as doesn't support floating point numbers
        choiceFormat = /^(\d+)\,choice\,(.+)/,
        choicePart = /^(\d+)([#<])(.+)/; // TODO: does not work for floating point numbers!
    // we are caching RegExps, so will not spend time on recreating them on each call

    // formats a value, currently choice and simple replacement are implemented, proper
    var getParamValue = function(format, args) {
        // simple substitute
        /*jshint boss:true */
        var res = '', match;
        if (match = format.match(simpleFormat)) { // TODO: heavy guns for checking whether format is a simple number...
            res = args.length > ++format ? args[format] : ''; // use the argument as is, or use '' if not found
        }

        // number format
        else if (match = format.match(numberFormat)) {
            // TODO: doesn't actually format the number...
            res = args.length > ++match[1] ? args[match[1]] : '';
        }

        // choice format
        else if (match = format.match(choiceFormat)) {
            // format: "0,choice,0#0 issues|1#1 issue|1<{0,number} issues"
            // match[0]: "0,choice,0#0 issues|1#1 issue|1<{0,number} issues"
            // match[1]: "0"
            // match[2]: "0#0 issues|1#1 issue|1<{0,number} issues"

            // get the argument value we base the choice on
            var value = (args.length > ++match[1] ? args[match[1]] : null);
            if (value !== null) {
                // go through all options, checking against the number, according to following formula,
                // if X < the first entry then the first entry is returned, if X > last entry, the last entry is returned
                //
                //    X matches j if and only if limit[j] <= X < limit[j+1]
                //
                var options = match[2].split('|');

                var prevOptionValue = null; // holds last passed option
                for (var i=0; i < options.length; i++) {
                    // option: "0#0 issues"
                    // part[0]: "0#0 issues"
                    // part[1]: "0"
                    // part[2]: "#"
                    // part[3]" "0 issues";
                    var parts = options[i].match(choicePart);

                    // if value is smaller, we take the previous value, or the current if no previous exists
                    var argValue = parseInt(parts[1], 10);
                    if (value < argValue) {
                        if (prevOptionValue) {
                            res = prevOptionValue;
                            break;
                        } else {
                            res = parts[3];
                            break;
                        }
                    }
                    // if value is equal the condition, and the match is equality match we accept it
                    if (value == argValue && parts[2] == '#') {
                        res = parts[3];
                        break;
                    }
                    else {
                        // value is greater the condition, fall through to next iteration
                    }

                    // check whether we are the last option, in which case accept it even if the option does not match
                    if (i == options.length - 1) {
                        res = parts[3];
                    }

                    // retain current option
                    prevOptionValue = parts[3];
                }

                // run result through format, as the parts might contain substitutes themselves
                var formatArgs = [res].concat(Array.prototype.slice.call(args, 1));
                res = AJS.format.apply(AJS, formatArgs);
            }
        }
        return res;
    };

    // drop in replacement for the token regex
    // splits the message to return the next accurance of a i18n placeholder.
    // Does not use regexps as we need to support nested placeholders
    // text between single ticks ' are ignored
    var _performTokenRegex = function(message) {
        var tick=false, openIndex=-1, openCount=0;
        for (var i=0; i < message.length; i++) {
            // handle ticks
            var c = message.charAt(i);
            if (c == "'") {
                // toggle
                tick = !tick;
            }
            // skip if we are between ticks
            if (tick) {
                continue;
            }
            // check open brackets
            if (c === '{') {
                if (openCount === 0) {
                    openIndex = i;
                }
                openCount++;
            }
            else if (c === '}') {
                if (openCount > 0) {
                    openCount--;
                    if (openCount === 0) {
                        // we found a bracket match - generate the result array (
                        var match = [];
                        match.push(message.substring(0, i+1)); // from begin to match
                        match.push(message.substring(0, openIndex)); // everything until match start
                        match.push(message.substring(openIndex+1, i)); // matched content
                        return match;
                    }
                }
            }
        }
        return null;
    };

    var _format = function (message) {
        var args = arguments,
            res = "",
            match = _performTokenRegex(message); //message.match(token);
        while (match) {
            // reduce message to string after match
            message = message.substring(match[0].length);

            // add value before match to result
            res += match[1].replace(apos, "");

            // add formatted parameter
            res += getParamValue(match[2], args);

            // check for next match
            match = _performTokenRegex(message); //message.match(token);
        }
        // add remaining message to result
        res += message.replace(apos, "");
        return res;
    };
    return _format.apply(AJS, arguments);
};


/**
 * Returns the value defined in AJS.I18n.keys for the given key. If AJS.I18n.keys does not exist, or if the given key does not exist,
 * the key is returned - this could occur in plugin mode if the I18n transform is not performed;
 * or in flatpack mode if the i18n JS file is not loaded.
 */
AJS.I18n = {
    getText: function(key) {
        var params = Array.prototype.slice.call(arguments, 1);
        if (AJS.I18n.keys && Object.prototype.hasOwnProperty.call(AJS.I18n.keys, key)) {
            return AJS.format.apply(null, [ AJS.I18n.keys[key] ].concat(params));
        }
        return key;
    }
};
(function($) {
    AJS._internal = AJS._internal || {};

    /**
     * @param {string} name The name of the widget to use in any messaging.
     * @param {function(new:{ $el: jQuery }, ?jQuery, ?Object)} Ctor
     *     A constructor which will only ever be called with "new". It must take a JQuery object as the first
     *     parameter, or generate one if not provided. The second parameter will be a configuration object.
     *     The returned object must have an $el property and a setOptions function.
     */
    AJS._internal.widget = function(name, Ctor) {
        var dataAttr = '_aui-widget-' + name;
        return function(selectorOrOptions, maybeOptions) {
            var selector;
            var options;
            if ($.isPlainObject(selectorOrOptions)) {
                options = selectorOrOptions;
            } else {
                selector = selectorOrOptions;
                options = maybeOptions;
            }

            var $el = selector && $(selector);
            
            var widget;
            if (!$el || !$el.data(dataAttr)) {
                widget = new Ctor($el, options || {});
                $el = widget.$el;
                $el.data(dataAttr, widget);
            } else {
                widget = $el.data(dataAttr);
                // options are discarded if $el has already been constructed
            }

            return widget;
        };
    };
}(AJS.$));
AJS._internal || ( AJS._internal = {});
(function($) {
    AJS._internal.browser = {};

    var supportsCalc = null;

    AJS._internal.browser.supportsCalc = function() {
        if (supportsCalc === null) {
            var $d = $('<div style="height: 10px; height: -webkit-calc(20px + 0); height: calc(20px);"></div>');
            supportsCalc = (20 === $d.appendTo(document.documentElement).height());
            $d.remove();
        }
        return supportsCalc;
    };
}(AJS.$));
AJS.I18n.keys = {};
AJS.I18n.keys["aui.words.add"] = "Add";
AJS.I18n.keys["aui.words.update"] = "Update";
AJS.I18n.keys["aui.words.delete"] = "Delete";
AJS.I18n.keys["aui.words.remove"] = "Remove";
AJS.I18n.keys["aui.words.cancel"] = "Cancel";
AJS.I18n.keys["aui.words.loading"] = "Loading";
AJS.I18n.keys["aui.words.close"] = "Close";
AJS.I18n.keys["aui.enter.value"] = "Enter value";
AJS.I18n.keys["aui.keyboard.shortcut.type.x"] = "Type ''{0}''";
AJS.I18n.keys["aui.keyboard.shortcut.then.x"] = "then ''{0}''";
AJS.I18n.keys["aui.keyboard.shortcut.or.x"] = "OR ''{0}''";
AJS.I18n.keys["aui.sidebar.expand.tooltip"] = "Expand sidebar ( [ )";
AJS.I18n.keys["aui.sidebar.collapse.tooltip"] = "Collapse sidebar ( [ )";
AJS.I18n.keys["aui.words.more"] = "More";
AJS.I18n.keys["aui.validation.message.maxlength"] = "Must be fewer than {0} characters";
AJS.I18n.keys["aui.validation.message.minlength"] = "Must be greater than {0} characters";
AJS.I18n.keys["aui.validation.message.matchingfield"] = "{0} and {1} do not match.";
AJS.I18n.keys["aui.validation.message.doesnotcontain"] = "Do not include the phrase {0} in this field";
AJS.I18n.keys["aui.validation.message.pattern"] = "This field does not match the required format";
AJS.I18n.keys["aui.validation.message.required"] = "This is a required field";
AJS.I18n.keys["aui.validation.message.validnumber"] = "Please enter a valid number";
AJS.I18n.keys["aui.validation.message.min"] = "Enter a value greater than {0}";
AJS.I18n.keys["aui.validation.message.max"] = "Enter a value less than {0}";
AJS.I18n.keys["aui.validation.message.dateformat"] = "Enter a valid date";
AJS.I18n.keys["aui.validation.message.minchecked"] = "Tick at least {0} checkboxes.";
AJS.I18n.keys["aui.validation.message.maxchecked"] = "Tick at most {0} checkboxes.";

(function($) {
    
    var $overflowEl;

    /**
     *
     * Dims the screen using a blanket div
     * @param useShim deprecated, it is calculated by dim() now
     */
    AJS.dim = function (useShim, zIndex) {

        if  (!$overflowEl) {
            $overflowEl = $(document.body);
        }

        if (useShim === true) {
            AJS.log("DEPRECATED: useShim is calculated by dim() now");
        }

        if (!AJS.dim.$dim) {
            AJS.dim.$dim = AJS("div").addClass("aui-blanket");
            AJS.dim.$dim.attr('tabindex', '0'); //required, or the last element's focusout event will go to the browser
            if (zIndex) {
                AJS.dim.$dim.css({zIndex: zIndex});
            }
            if ($.browser.msie) {
                AJS.dim.$dim.css({width: "200%", height: Math.max($(document).height(), $(window).height()) + "px"});
            }
            $("body").append(AJS.dim.$dim);
            
            AJS.dim.cachedOverflow = $overflowEl.css("overflow");
            $overflowEl.css("overflow", "hidden");
        }

        return AJS.dim.$dim;
    };

    /**
     * Removes semitransparent DIV
     * @see AJS.dim
     */
    AJS.undim = function() {
        if (AJS.dim.$dim) {
            AJS.dim.$dim.remove();
            AJS.dim.$dim = null;

            if (AJS.dim.$shim) {
                AJS.dim.$shim.remove();
                AJS.dim.$shim = null;
            }

            $overflowEl && $overflowEl.css("overflow",  AJS.dim.cachedOverflow);

            // Safari bug workaround
            if ($.browser.safari) {
                var top = $(window).scrollTop();
                $(window).scrollTop(10 + 5 * (top == 10)).scrollTop(top);
            }
        }
    };

}(AJS.$));
AJS.FocusManager = (function($) {

    (function initSelectors() {
        /*
         :tabbable and :focusable functions from jQuery UI v 1.10.4
         renamed to :aui-tabbable and :aui-focusable to not clash with jquery-ui if it's included.
         Code modified slightly to be compatible with jQuery < 1.8
            .addBack() replaced with .andSelf()
            $.curCSS() replaced with $.css()

         */
        function visible( element ) {
            return !$( element ).parents().andSelf().filter(function() {
                return $.css( this, "visibility" ) === "hidden" ||
                    $.expr.filters.hidden( this );
            }).length;
        }

        function focusable( element, isTabIndexNotNaN ) {
            var nodeName = element.nodeName.toLowerCase();

            if (nodeName === 'area') {
                var map = element.parentNode;
                var mapName = map.name;
                var imageMap = $('img[usemap=#' + mapName + ']').get();

                if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
                    return false;
                }
                return imageMap && visible(imageMap);
            }
            var isFormElement = /input|select|textarea|button|object/.test(nodeName);
            var isAnchor = nodeName === 'a';
            var isAnchorTabbable = (element.href || isTabIndexNotNaN);

            return (
                isFormElement ? !element.disabled :
                    (isAnchor ? isAnchorTabbable : isTabIndexNotNaN)
                ) && visible(element);
        }

        function tabbable( element ){
            var tabIndex = $.attr( element, "tabindex" ),
                isTabIndexNaN = isNaN( tabIndex );
            var hasTabIndex = ( isTabIndexNaN || tabIndex >= 0 );

            return hasTabIndex && focusable( element, !isTabIndexNaN );
        }

        $.extend( $.expr[ ":" ], {
            'aui-focusable': function( element ) {
                return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
            },

            'aui-tabbable': tabbable
        });
    }());

    var RESTORE_FOCUS_DATA_KEY = "_aui-focus-restore";
    function FocusManager() {
        this._focusTrapStack = [];
        $(document).on('focusout', {focusTrapStack: this._focusTrapStack},  focusTrapHandler);
    }
    FocusManager.defaultFocusSelector = ":aui-tabbable";
    FocusManager.prototype.enter = function($el) {
        // remember focus on old element
        $el.data(RESTORE_FOCUS_DATA_KEY, $(document.activeElement));

        // focus on new selector
        if ($el.attr("data-aui-focus") !== "false") {
            var focusSelector = $el.attr('data-aui-focus-selector') || FocusManager.defaultFocusSelector;
            var $focusEl = $el.is(focusSelector) ? $el : $el.find(focusSelector);
            $focusEl.first().focus();
        }

        if (elementTrapsFocus($el)) {
            trapFocus($el, this._focusTrapStack);
        }
    };

    function trapFocus($el, focusTrapStack) {
        focusTrapStack.push($el);
    }

    function untrapFocus(focusTrapStack) {
        focusTrapStack.pop();
    }

    function elementTrapsFocus($el) {
        return $el.is('.aui-dialog2');
    }

    FocusManager.prototype.exit = function($el) {
        if (elementTrapsFocus($el)) {
            untrapFocus(this._focusTrapStack);
        }

        // AUI-1059: remove focus from the active element when dialog is hidden
        var activeElement = document.activeElement;
        if ($el[0] === activeElement || $el.has(activeElement).length) {
            $(activeElement).blur();
        }

        var $restoreFocus = $el.data(RESTORE_FOCUS_DATA_KEY);
        if ($restoreFocus && $restoreFocus.length) {
            $el.removeData(RESTORE_FOCUS_DATA_KEY);
            $restoreFocus.focus();
        }
    };

    function focusTrapHandler(event) {
        var focusTrapStack = event.data.focusTrapStack;

        if (!event.relatedTarget) { //Does not work in firefox, see https://bugzilla.mozilla.org/show_bug.cgi?id=687787
            return;
        }

        if (focusTrapStack.length === 0) {
            return;
        }

        var $focusTrapElement = focusTrapStack[focusTrapStack.length - 1];

        var focusOrigin = event.target;
        var focusTo = event.relatedTarget;

        var $tabbableElements = $focusTrapElement.find(':aui-tabbable');
        var $firstTabbableElement = AJS.$($tabbableElements.first());
        var $lastTabbableElement = AJS.$($tabbableElements.last());

        var elementContainsOrigin = $focusTrapElement.has(focusTo).length === 0;
        var focusLeavingElement = elementContainsOrigin && focusTo;
        if (focusLeavingElement) {
            if ($firstTabbableElement.is(focusOrigin)) {
                $lastTabbableElement.focus();
            } else if ($lastTabbableElement.is(focusOrigin)) {
                $firstTabbableElement.focus();
            }
        }

    }

    FocusManager.global = new FocusManager();

    return FocusManager;
}(AJS.$));

(function($, skate, Tether) {

    var EVENT_PREFIX = "_aui-internal-layer-";
    var GLOBAL_EVENT_PREFIX = "_aui-internal-layer-global-";

    /*
    skate('.aui-layer', {
        insert: function() {
            if (this.getAttribute('data-aui-alignment')) {
                createTether(this);
            }
        }
    });
    */

    function Layer(selector) {
        this.$el = $(selector || '<div class="aui-layer" aria-hidden="true"></div>');
    }

    Layer.prototype.changeSize = function(width, height) {
        this.$el.css('width', width);
        this.$el.css('height', height === 'content' ? '' : height);
        return this;
    };

    Layer.prototype.on = function(event, fn) {
        this.$el.on(EVENT_PREFIX + event, fn);
        return this;
    };

    Layer.prototype.off = function(event, fn) {
        this.$el.off(EVENT_PREFIX + event, fn);
        return this;
    };

    Layer.prototype.show = function() {
        if (this.$el.is(':visible')) {
            return this;
        }
        var e = AJS.$.Event(EVENT_PREFIX + "beforeShow");
        this.$el.trigger(e);

        var e2 = AJS.$.Event(GLOBAL_EVENT_PREFIX + "beforeShow");
        $(document).trigger(e2,[this.$el]);
        if (!e.isDefaultPrevented() && !e2.isDefaultPrevented()) {
            AJS.LayerManager.global.push(this.$el);
            this.$el.attr('data-aui-alignment') && this.$el[0]._tether.enable();
        }
        return this;
    };

    Layer.prototype.hide = function() {
        if (!this.$el.is(':visible')) {
            return this;
        }
        var e = AJS.$.Event(EVENT_PREFIX + "beforeHide");
        this.$el.trigger(e);

        var e2 = AJS.$.Event(GLOBAL_EVENT_PREFIX + "beforeHide");
        $(document).trigger(e2,[this.$el]);
        if (!e.isDefaultPrevented() && !e2.isDefaultPrevented()) {
            AJS.LayerManager.global.popUntil(this.$el);
        }
        return this;
    };

    Layer.prototype.isVisible = function() {
        return this.$el.attr("aria-hidden") === "false";
    };

    Layer.prototype.remove = function() {
        this.hide();
        this.$el[0]._tether && this.$el[0]._tether.destroy();
        this.$el.remove();
        this.$el = null;
    };

    Layer.prototype._showLayer = function(zIndex) {
        if (!this.$el.parent().is('body')) {
            this.$el.appendTo(document.body);
        }
        // inverse order to hideLayer
        this.$el.data('_aui-layer-cached-z-index', this.$el.css('z-index'));
        this.$el.css("z-index", zIndex);
        this.$el.attr("aria-hidden", "false");
        AJS.FocusManager.global.enter(this.$el);
        this.$el.trigger(EVENT_PREFIX + "show");
        $(document).trigger(GLOBAL_EVENT_PREFIX + "show", [this.$el]);
    };

    Layer.prototype._hideLayer = function() {
        // inverse order to showLayer
        AJS.FocusManager.global.exit(this.$el);
        this.$el.attr("aria-hidden", "true");
        this.$el.css('z-index', this.$el.data('_aui-layer-cached-z-index') || '');
        this.$el.data('_aui-layer-cached-z-index', '');
        this.$el.trigger(EVENT_PREFIX + "hide");
        $(document).trigger(GLOBAL_EVENT_PREFIX + "hide", [this.$el]);
    };

    Layer.prototype.isBlanketed = function() {
        return this.$el.attr("data-aui-blanketed") === "true";
    };

    Layer.prototype.isModal = function() {
        return this.$el.attr("data-aui-modal") === "true";
    };

    AJS.layer = AJS._internal.widget('layer', Layer);

    AJS.layer.on = function(eventName, fn) {
        $(document).on(GLOBAL_EVENT_PREFIX + eventName, fn);
        return this;
    };

    AJS.layer.off = function(eventName, fn) {
        $(document).off(GLOBAL_EVENT_PREFIX + eventName, fn);
        return this;
    };

    /*
    var attachmentMap = {
        'top left': { el:'bottom left', target: 'top left' },
        'top center': { el: 'bottom center', target: 'top center' },
        'top right': { el: 'bottom right', target: 'top right' },
        'right top': { el: 'top left', target: 'top right' },
        'right middle': { el: 'middle left', target: 'middle right' },
        'right bottom': { el: 'bottom left', target: 'bottom right' },
        'bottom left': { el: 'top left', target: 'bottom left' },
        'bottom center': { el: 'top center', target: 'bottom center' },
        'bottom right': { el: 'top right', target: 'bottom right' },
        'left top': { el: 'top right', target: 'top left' },
        'left middle': { el: 'middle right', target: 'middle left' },
        'left bottom': { el: 'bottom right', target: 'bottom left' }
    }

    function createTether(layer) {
        var alignment = layer.getAttribute('data-aui-alignment');
        var attachment = attachmentMap[alignment] || { el: 'top center', target: 'bottom center' };
        layer._tether = new Tether({
            element: '#' + layer.id,
            target: '[aria-controls="' + layer.id + '"]',
            attachment: attachment.el,
            targetAttachment: attachment.target,
            enabled: false,
            constraints: [
                {
                    // Try and keep the element on page
                    to: 'window',
                    attachment: 'together',
                    pin: true
                }
            ]
        });
    }
    */
}(AJS.$));
//}(AJS.$, window.skate || require('skate'), window.Tether || require('tether')));

/**
 * Manages layers.
 *
 * There is a single global layer manager, AJS.LayerManager.global.
 * Additional instances can be created however this is rare.
 *
 * Layers are added by the push($el) method. Layers are removed by the
 * popUntil($el) method.
 *
 * popUntil's contract is that it pops all layers above & including the given
 * layer. This is used to support popping multiple layers.
 * Say we were showing a dropdown inside an inline dialog inside a dialog - we
 * have a stack of dialog layer, inline dialog layer, then dropdown layer. Calling
 * popUntil(dialog.$el) would hide all layers above & including the dialog.
 */
(function($) {

    function topIndexWhere(layerArr, fn) {
        var i = layerArr.length;
        while (i--) {
            if (fn(layerArr[i])) {
                return i;
            }
        }
        return -1;
    }

    function layerIndex(layerArr, $el) {
        return topIndexWhere(layerArr, function($layer) {
            return $layer[0] === $el[0];
        });
    }

    function topBlanketedIndex(layerArr) {
        return topIndexWhere(layerArr, function($layer) {
            return AJS.layer($layer).isBlanketed();
        });
    }

    function nextZIndex(layerArr) {
        var _nextZIndex;
        if (layerArr.length) {
            var $topEl = layerArr[layerArr.length - 1];
            var zIndex = parseInt($topEl.css("z-index"), 10);
            _nextZIndex = (isNaN(zIndex) ? 0 : zIndex) + 100;
        }
        else {
            _nextZIndex = 0;
        }
        return Math.max(3000, _nextZIndex);
    }

    function LayerManager() {
        this._stack = [];
    }

    /**
     * Pushes a layer onto the stack.
     * The same element cannot be opened as a layer multiple times - if the
     * given element is already an open layer, this method throws an exception.
     * @param {jQuery} $el  Element to push
     */
    LayerManager.prototype.push = function($el) {

        if (layerIndex(this._stack, $el) >= 0) {
            throw new Error("The given element is already an active layer");
        }

        var layer = AJS.layer($el);

        var zIndex = nextZIndex(this._stack);
        layer._showLayer(zIndex);

        if (layer.isBlanketed()) {
            if (topBlanketedIndex(this._stack) >= 0) {
                AJS.undim(); // remove blanket at old level
            }
            AJS.dim(false, zIndex - 20);
        }

        this._stack.push($el);
    };
    /**
     * Removes all layers above & including the given element.
     * If the given element is not an active layer, this method is a no-op.
     * @param {jQuery} $el layer to pop.
     * @return The last layer that was popped, or null if no layer matching the given $el was found.
     */
    LayerManager.prototype.popUntil = function($el) {
        var index = layerIndex(this._stack, $el);
        if (index < 0) {
            // layer not found
            return null;
        }

        // Pop from the top until the given layer is removed
        var removed = this._stack.slice(index);
        this._stack = this._stack.slice(0, index);
        
        var removedBlanketIndex = topBlanketedIndex(removed); // >=0 if the removed layers had a blanket
        if (removedBlanketIndex >= 0) {
            AJS.undim();
            var newTopBlanketedIndex = topBlanketedIndex(this._stack);
            if (newTopBlanketedIndex >= 0) {
                AJS.dim(false, this._stack[newTopBlanketedIndex].css("z-index") - 20);
            }
        }

        var $layer;
        while (removed.length) {
            $layer = removed.pop();
            AJS.layer($layer)._hideLayer();
        }
        return $layer;
    };

    /**
     * Gets the top layer, if it exists
     * @return The layer on top of the stack, if it exists, otherwise null.
     */
    LayerManager.prototype.getTopLayer = function() {
        if (!this._stack.length) {
            return null;
        }
        var $topLayer = this._stack[this._stack.length - 1];
        return $topLayer;
    };

    /**
     * Pops the top layer, if it exists and it is non modal.
     * @return The layer that was popped, if it exists and it is non modal, otherwise null.
     */
    LayerManager.prototype.popTopIfNonModal = function() {
        var $topLayer = this.getTopLayer();
        if(!$topLayer || AJS.layer($topLayer).isModal()){
            return null;
        }
        return this.popUntil($topLayer);
    };

    /**
     * Pops all layers above and including the top blanketed layer. If layers exist but none are blanketed,
     * this method does nothing.
     * @return The blanketed layer that was popped, if it exists, otherwise null.
     */
    LayerManager.prototype.popUntilTopBlanketed = function() {
        var i = topBlanketedIndex(this._stack);
        if (i < 0) {
            return null;
        }
        var $topBlanketedLayer = this._stack[i];
        if (AJS.layer($topBlanketedLayer).isModal()) {
            return null;
        }
        return this.popUntil($topBlanketedLayer);
    };

    AJS.LayerManager = LayerManager;

}(AJS.$));

/**
 * Copy of jQuery UI keycodes, without the weight of everything in jQuery UI
 */
(function($) {
    // Source: jQuery UI keycodes
    AJS.keyCode = {
        ALT: 18,
        BACKSPACE: 8,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91, // COMMAND
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93, // COMMAND_RIGHT
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91 // COMMAND
    };
}(AJS.$));

(function($) {

    /**
     * Singleton layerManager instance
     * @type {LayerManager}
     */
    AJS.LayerManager.global = new AJS.LayerManager();

    $(document).on('keydown', function(e) {
        if (e.keyCode === AJS.keyCode.ESCAPE) {
            var $popped = AJS.LayerManager.global.popTopIfNonModal();
            if ($popped) {
                e.preventDefault();
            }
        }
    }).on('click', '.aui-blanket', function(e) {
        var $popped = AJS.LayerManager.global.popUntilTopBlanketed();
        if ($popped) {
            e.preventDefault();
        }
    });


}(AJS.$));
(function($) {
    var defaults = {
        "aui-focus": "false", // do not focus by default as it's overridden below
        "aui-blanketed": "true"
    };

    function applyDefaults($el) {
        jQuery.each(defaults, function(key, value) {
            var dataKey = "data-" + key;
            if (!$el[0].hasAttribute(dataKey)) {
                $el.attr(dataKey, value);
            }
        });
    }

    function Dialog2(selector) {
        if (selector) {
            this.$el = $(selector);
        }
        else {
            this.$el = $(AJS.parseHtml($(aui.dialog.dialog2({}))));
        }
        applyDefaults(this.$el);
    }

    Dialog2.prototype.on = function(event, fn) {
        AJS.layer(this.$el).on(event, fn);
        return this;
    };

    Dialog2.prototype.off = function(event, fn) {
        AJS.layer(this.$el).off(event, fn);
        return this;
    };

    Dialog2.prototype.show = function() {
        var layer = AJS.layer(this.$el);
        layer.show();
        return this;
    };

    Dialog2.prototype.hide = function() {
        AJS.layer(this.$el).hide();
        return this;
    };

    Dialog2.prototype.remove = function() {
        AJS.layer(this.$el).remove();
        return this;
    };

    AJS.dialog2 = AJS._internal.widget('dialog2', Dialog2);

    var GLOBAL_EVENT_PREFIX = "_aui-internal-dialog2-global-";

    function bindToLayerEvent(eventName) {
        AJS.layer.on(eventName, function(e, $el) {
            if ($el.is('.aui-dialog2')) {
                var dialogEvent = AJS.$.Event(GLOBAL_EVENT_PREFIX + eventName);
                $(document).trigger(dialogEvent, [$el]);
                return !dialogEvent.isDefaultPrevented();
            }
            else {
                return true;
            }
        });
    }
    // wrap layer events
    var LAYER_EVENTS = ['show', 'hide', 'beforeShow', 'beforeHide'];
    for (var i = 0; i < LAYER_EVENTS.length; ++i) {
        bindToLayerEvent(LAYER_EVENTS[i]);
    }

    AJS.dialog2.on = function(eventName, fn) {
        $(document).on(GLOBAL_EVENT_PREFIX + eventName, fn);
        return this;
    };

    AJS.dialog2.off = function(eventName, fn) {
        $(document).off(GLOBAL_EVENT_PREFIX + eventName, fn);
        return this;
    };

    /* Live events */

    $(document).on('click', '.aui-dialog2-header-close', function(e) {
        e.preventDefault();
        AJS.dialog2($(this).closest('.aui-dialog2')).hide();
    });

    AJS.dialog2.on('show', function(e, $el) {
        var selectors = ['.aui-dialog2-content', '.aui-dialog2-footer', '.aui-dialog2-header'];
        var $selected;
        selectors.some(function(selector) {
            $selected = $el.find(selector + ' :aui-tabbable');
            return $selected.length;
        });
        $selected && $selected.first().focus();
    });

    AJS.dialog2.on('hide', function(e,$el) {
        var layer = AJS.layer($el);

        if ($el.data("aui-remove-on-hide")) {
            layer.remove();
        }
    });

})(AJS.$);
(function () {

    // Cookie handling functions

    var COOKIE_NAME = "AJS.conglomerate.cookie",
        UNESCAPE_COOKIE_REGEX = /(\\|^"|"$)/g,
        CONSECUTIVE_PIPE_CHARS_REGEX = /\|\|+/g,
        ANY_QUOTE_REGEX = /"/g,
        REGEX_SPECIAL_CHARS = /[.*+?|^$()[\]{\\]/g;

    function getValueFromConglomerate(name, cookieValue) {
        // a null cookieValue is just the first time through so create it
        cookieValue = cookieValue || "";
        var reg = new RegExp(regexEscape(name) + "=([^|]+)"),
            res = cookieValue.match(reg);
        return res && res[1];
    }

    //either append or replace the value in the cookie string
    function addOrAppendToValue(name, value, cookieValue) {
        //A cookie name follows after any amount of white space mixed with any amount of '|' characters
        //A cookie value is preceded by '=', then anything except for '|'
        var reg = new RegExp("(\\s|\\|)*\\b" + regexEscape(name) + "=[^|]*[|]*");

        cookieValue = cookieValue || "";
        cookieValue = cookieValue.replace(reg, "|");
        if (value !== "") {
            var pair = name + "=" + value;
            if (cookieValue.length + pair.length < 4020) {
                cookieValue += "|" + pair;
            }
        }
        return cookieValue.replace(CONSECUTIVE_PIPE_CHARS_REGEX, "|");
    }

    function unescapeCookieValue(name) {
        return name.replace(UNESCAPE_COOKIE_REGEX, "");
    }

    function getCookieValue(name) {
        var reg = new RegExp("\\b" + regexEscape(name) + "=((?:[^\\\\;]+|\\\\.)*)(?:;|$)"),
            res = document.cookie.match(reg);
        return res && unescapeCookieValue(res[1]);
    }

    function saveCookie(name, value, days) {
        var ex = "",
            d,
            quotedValue = '"' + value.replace(ANY_QUOTE_REGEX, '\\"') + '"';

        if (days) {
            d = new Date();
            d.setTime(+d + days * 24 * 60 * 60 * 1000);
            ex = "; expires=" + d.toGMTString();
        }
        document.cookie = name + "=" + quotedValue + ex + ";path=/";
    }

    function regexEscape(str) {
        return str.replace(REGEX_SPECIAL_CHARS, "\\$&");
    }

    /**
     * The Atlassian Conglomerate Cookie - to let us use cookies without running out.
     * @class Cookie
     * @namespace AJS
     */
    AJS.Cookie = {
        /**
         * Save a cookie.
         * @param name {String} name of cookie
         * @param value {String} value of cookie
         * @param expires {Number} number of days before cookie expires
         */
        save : function (name, value, expires) {
            var cookieValue = getCookieValue(COOKIE_NAME);
            cookieValue = addOrAppendToValue(name, value, cookieValue);
            saveCookie(COOKIE_NAME, cookieValue, expires || 365);
        },
        /**
         * Get the value of a cookie.
         * @param name {String} name of cookie to read
         * @param defaultValue {String} the default value of the cookie to return if not found
         */
        read : function(name, defaultValue) {
            var cookieValue = getCookieValue(COOKIE_NAME);
            var value = getValueFromConglomerate(name, cookieValue);
            if (value != null) {
                return value;
            }
            return defaultValue;
        },
        /**
         * Remove the given cookie.
         * @param name {String} the name of the cookie to remove
         */
        erase: function (name) {
            this.save(name, "");
        }
    };
    
})();


/**
 * Binds events to the window object. See jQuery bind documentation for more details.
 * <br>
 * Exceptions are caught and logged.
 *
 * @method bind
 * @namespace AJS
 * @for AJS
 */
AJS.bind = function (eventType, eventData, handler) {
    try {
        if (typeof handler === "function") {
            return AJS.$(window).bind(eventType, eventData, handler);
        } else {
            return AJS.$(window).bind(eventType, eventData);
        }
    } catch (e) {
        AJS.log("error while binding: " + e.message);
    }
};

/**
 * Unbinds event handlers from the window object. See jQuery unbind documentation for more details.
 * <br>
 * Exceptions are caught and logged.
 *
 * @method unbind
 * @namespace AJS
 * @for AJS
 */
AJS.unbind = function (eventType, handler) {
    try {
        return AJS.$(window).unbind(eventType, handler);
    } catch (e) {
        AJS.log("error while unbinding: " + e.message);
    }
};

/**
 * Triggers events on the window object. See jQuery trigger documentation for more details.
 * <br>
 * Exceptions are caught and logged.
 *
 * @method bind
 * @namespace AJS
 * @for AJS
 */
AJS.trigger = function(eventType, extraParameters) {
    try {
        return AJS.$(window).trigger(eventType, extraParameters);
    } catch (e) {
        AJS.log("error while triggering: " + e.message);
    }
};
/**
 * Creates a generic popup that will be displayed in the center of the screen with a
 * grey blanket in the background.
 * Usage:
 * <pre>
 * new AJS.popup({
 *     width: 800,
 *     height: 400,
 *     id: "my-dialog"
 * });
 * </pre>
 * @class popup
 * @constructor
 * @namespace AJS
 * @param options {object} [optional] Permitted options and defaults are as follows:
 * width (800), height (600), keypressListener (closes dialog on ESC).
*/
AJS.popup = function (options) {
    var defaults = {
        width: 800,
        height: 600,
        closeOnOutsideClick: false,
        keypressListener: function (e) {
            if (e.keyCode === 27 && popup.is(":visible")) {
                res.hide();
            }
        }
    };
    // for backwards-compatibility
    if (typeof options != "object") {
        options = {
            width: arguments[0],
            height: arguments[1],
            id: arguments[2]
        };
        options = AJS.$.extend({}, options, arguments[3]);
    }
    options = AJS.$.extend({}, defaults, options);
    var popup = AJS("div").addClass("aui-popup");

    if (options.id) {
        popup.attr("id", options.id);
    }
    //find the highest z-index on the page to ensure any new popup that is shown is shown on top
    var highestZIndex = 3000;
    AJS.$(".aui-dialog").each(function() {
        var currentPopup = AJS.$(this);
        highestZIndex = (currentPopup.css("z-index") > highestZIndex) ? currentPopup.css("z-index") : highestZIndex;
    });

    var applySize = (function (width, height) {
        options.width = (width = (width || options.width));
        options.height = (height = (height || options.height));

        popup.css({
            marginTop: - Math.round(height / 2) +"px",
            marginLeft: - Math.round(width / 2) + "px",
            width: width,
            height: height,
            "z-index": parseInt(highestZIndex,10) + 2  //+ 2 so that the shadow can be shown on +1 (underneath the popup but above everything else)
        });
        return arguments.callee;
    })(options.width, options.height);

    AJS.$("body").append(popup);

    popup.hide();

    AJS.enable(popup);
    /**
     * Popup object
     * @class Popup
     * @static
    */

    //blanket for reference further down
    var blanket = AJS.$(".aui-blanket"),
        focusItem = function(selector, element) {
            var item = AJS.$(selector, element);
            if (item.length) {
                item.focus();
                return true;
            }
            return false;
        },
        // we try and place focus, in the configured element or by looking for the first input
        // in page body, then button panel and finally page menu.
        focusDialog = function(element) {
            if (AJS.$(".dialog-page-body", element).find(":focus").length !== 0) {
                return;
            }
            if (options.focusSelector) {
                return focusItem(options.focusSelector, element);
            }
            var defaultFocusSelector = ":input:visible:enabled:first";
            if (focusItem(defaultFocusSelector, AJS.$(".dialog-page-body", element)))
                return;
            if (focusItem(defaultFocusSelector, AJS.$(".dialog-button-panel", element)))
                return;

            focusItem(defaultFocusSelector, AJS.$(".dialog-page-menu", element));
        };

    var res = {

        changeSize: function (w, h) {
            if ((w && w != options.width) || (h && h != options.height)) {
                applySize(w, h);
            }
            this.show();
        },

        /**
         * Shows the popup
         * @method show
        */
        show: function () {

            var show = function () {
                AJS.$(document)
                    .off("keydown", options.keypressListener)
                    .on("keydown", options.keypressListener);
                AJS.dim();
                blanket = AJS.$(".aui-blanket");
                if(blanket.size()!=0 && options.closeOnOutsideClick){
                    blanket.click( function(){
                        if(popup.is(":visible")){
                            res.hide();
                        }
                    });
                }
                popup.show();

                AJS.popup.current = this;
                focusDialog(popup);
                AJS.$(document).trigger("showLayer", ["popup", this]);
            };
            show.call(this);
            this.show = show;
        },
        /**
         * Hides the popup.
         * @method hide
        */
        hide: function () {
            AJS.$(document).unbind("keydown", options.keypressListener);
            blanket.unbind();
            this.element.hide();

            //only undim if no other dialogs are visible
            if (AJS.$(".aui-dialog:visible").size()==0) {
                AJS.undim();
            }

            // AUI-1059: remove focus from the active element when dialog is hidden
            var activeElement = document.activeElement;
            if (this.element.has(activeElement).length) {
                activeElement.blur();
            }

            AJS.$(document).trigger("hideLayer", ["popup", this]);
            AJS.popup.current = null;
            this.enable();
        },
        /**
         * jQuery object, representing popup DOM element
         * @property element
        */
        element: popup,
        /**
         * Removes popup elements from the DOM
         * @method remove
        */
        remove: function () {
            popup.remove();
            this.element = null;
        },
        /**
         * disables the popup
         * @method disable
        */
        disable: function() {
            if(!this.disabled){
                this.popupBlanket = AJS.$("<div class='dialog-blanket'> </div>").css({
                    height: popup.height(),
                    width: popup.width()
                });
                popup.append(this.popupBlanket);
                this.disabled = true;
            }
        },
        /**
         * enables the popup if it is disabled
         * @method enable
        */
        enable: function() {
            if(this.disabled) {
                this.disabled = false;
                this.popupBlanket.remove();
                this.popupBlanket=null;
            }
        }
    };

    return res;
};

// Scoping function
(function () {
    /**
     * @class Button
     * @constructor Button
     * @param page {number} page id
     * @param label {string} button label
     * @param onclick {function} [optional] click event handler
     * @param className {string} [optional] class name
     * @private
    */
    function Button(page, label, onclick, className) {
        if (!page.buttonpanel) {
            page.addButtonPanel();
        }
        this.page = page;
        this.onclick = onclick;
        this._onclick = function (e) {
            return onclick.call(this, page.dialog, page, e) === true;
        };
        this.item = AJS("button", label).addClass("button-panel-button");
        if (className) {
            this.item.addClass(className);
        }
        if (typeof onclick == "function") {
            this.item.click(this._onclick);
        }
        page.buttonpanel.append(this.item);
        this.id = page.button.length;
        page.button[this.id] = this;
    }

    /**
     * @class Link
     * @constructor Link
     * @param page {number} page id
     * @param label {string} button label
     * @param onclick {function} [optional] click event handler
     * @param className {string} [optional] class name
     * @private
    */
    function Link(page, label, onclick, className, url) {
        if (!page.buttonpanel) {
            page.addButtonPanel();
        }

        //if no url is given use # as default
        if(!url){
            url = "#";
        }

        this.page = page;
        this.onclick = onclick;
        this._onclick = function (e) {
            return onclick.call(this, page.dialog, page, e) === true;
        };
        this.item = AJS("a", label).attr("href", url).addClass("button-panel-link");
        if (className) {
            this.item.addClass(className);
        }
        if (typeof onclick == "function") {
            this.item.click(this._onclick);
        }
        page.buttonpanel.append(this.item);
        this.id = page.button.length;
        page.button[this.id] = this;
    }

    function itemMove (leftOrRight, target) {
        var dir = leftOrRight == "left"? -1 : 1;
        return function (step) {
            var dtarget = this.page[target];
            if (this.id != ((dir == 1) ? dtarget.length - 1 : 0)) {
                dir *= (step || 1);
                dtarget[this.id + dir].item[(dir < 0 ? "before" : "after")](this.item);
                dtarget.splice(this.id, 1);
                dtarget.splice(this.id + dir, 0, this);
                for (var i = 0, ii = dtarget.length; i < ii; i++) {
                    if (target == "panel" && this.page.curtab == dtarget[i].id) {
                        this.page.curtab = i;
                    }
                    dtarget[i].id = i;
                }
            }
            return this;
        };
    }
    function itemRemove(target) {
        return function () {
            this.page[target].splice(this.id, 1);
            for (var i = 0, ii = this.page[target].length; i < ii; i++) {
                this.page[target][i].id = i;
            }
            this.item.remove();
        };
    }
    /**
     * Moves item left in the hierarchy
     * @method moveUp
     * @method moveLeft
     * @param step {number} how many items to move, default is 1
     * @return {object} button
    */
    Button.prototype.moveUp = Button.prototype.moveLeft = itemMove("left", "button");
    /**
     * Moves item right in the hierarchy
     * @method moveDown
     * @method moveRight
     * @param step {number} how many items to move, default is 1
     * @return {object} button
    */
    Button.prototype.moveDown = Button.prototype.moveRight = itemMove("right", "button");
    /**
     * Removes item
     * @method remove
    */
    Button.prototype.remove = itemRemove("button");

    /**
     * Getter and setter for label
     * @method label
     * @param label {string} [optional] label of the button
     * @return {string} label, if nothing is passed in
     * @return {object} jQuery button object, if label is passed in
    */
    Button.prototype.html = function (label) {
        return this.item.html(label);
    };
    /**
     * Getter and setter of onclick event handler
     * @method onclick
     * @param onclick {function} [optional] new event handler, that is going to replace the old one
     * @return {function} existing event handler if new one is undefined
    */
    Button.prototype.onclick = function (onclick) {
        if (typeof onclick == "undefined") {
            return this.onclick;
        } else {
            this.item.unbind("click", this._onclick);
            this._onclick = function (e) {
                return onclick.call(this, page.dialog, page, e) === true;
            };
            if (typeof onclick == "function") {
                this.item.click(this._onclick);
            }
        }
    };

    var DEFAULT_PADDING = 20;

    /**
     * Class for panels
     * @class Panel
     * @constructor
     * @param page {number} page id
     * @param title {string} panel title
     * @param reference {string} or {object} jQuery object or selector for the contents of the Panel
     * @param className {string} [optional] HTML class name
     * @param panelButtonId {string} the unique id that will be put on the button element for this panel.
     * @private
    */
    var Panel = function (page, title, reference, className, panelButtonId) {
        if (!(reference instanceof AJS.$)) {
            reference = AJS.$(reference);
        }

        this.dialog = page.dialog;
        this.page = page;
        this.id = page.panel.length;
        this.button = AJS("button").html(title).addClass("item-button");

        if (panelButtonId) {
            this.button[0].id = panelButtonId;
        }

        this.item = AJS("li").append(this.button).addClass("page-menu-item");
        this.body = AJS("div").append(reference).addClass("dialog-panel-body").css("height", page.dialog.height + "px");
        this.padding = DEFAULT_PADDING;
        if (className) {
            this.body.addClass(className);
        }
        var i = page.panel.length,
            tab = this;
        page.menu.append(this.item);
        page.body.append(this.body);
        page.panel[i] = this;
        var onclick = function () {
            var cur;
            if (page.curtab + 1) {
                cur = page.panel[page.curtab];
                cur.body.hide();
                cur.item.removeClass("selected");
                (typeof cur.onblur == "function") && cur.onblur();
            }
            page.curtab = tab.id;
            tab.body.show();
            tab.item.addClass("selected");
            (typeof tab.onselect == "function") && tab.onselect();
            (typeof page.ontabchange == "function") && page.ontabchange(tab, cur);
        };
        if (!this.button.click) {
            AJS.log("atlassian-dialog:Panel:constructor - this.button.click false");
            this.button.onclick = onclick;
        }
        else {
            this.button.click(onclick);
        }
        onclick();
        if (i == 0) {
            page.menu.css("display", "none"); // don't use jQuery hide()
        } else {
            page.menu.show();
        }
    };
    /**
     * Selects current panel
     * @method select
    */
    Panel.prototype.select = function () {
        this.button.click();
    };
    /**
     * Moves item left in the hierarchy
     * @method moveUp
     * @method moveLeft
     * @param step {number} how many items to move, default is 1
     * @return {object} panel
    */
    Panel.prototype.moveUp = Panel.prototype.moveLeft = itemMove("left", "panel");
    /**
     * Moves item right in the hierarchy
     * @method moveDown
     * @method moveRight
     * @param step {number} how many items to move, default is 1
     * @return {object} panel
    */
    Panel.prototype.moveDown = Panel.prototype.moveRight = itemMove("right", "panel");
    /**
     * Removes item
     * @method remove
    */
    Panel.prototype.remove = itemRemove("panel");
    /**
     * Getter and setter of inner HTML of the panel
     * @method html
     * @param html {string} HTML source to set up
     * @return {object} panel
     * @return {string} current HTML source
    */
    Panel.prototype.html = function (html) {
        if (html) {
            this.body.html(html);
            return this;
        } else {
            return this.body.html();
        }
    };
    /**
     * This method gives you ability to overwrite default padding value. Use it with caution.
     * @method setPadding
     * @param padding {number} padding in pixels
     * @return {object} panel
     * @see DEFAULT_PADDING
    */
    Panel.prototype.setPadding = function (padding) {
        if (!isNaN(+padding)) {
            this.body.css("padding", +padding);
            this.padding = +padding;
            this.page.recalcSize();
        }
        return this;
    };

    var HEADER_HEIGHT = 56;
    var BUTTONS_HEIGHT = 51;
    var MIN_DIALOG_VERTICAL_BUFFER = 50;

    /**
     * Class for pages
     * @class Page
     * @constructor
     * @param dialog {object} dialog object
     * @param className {string} [optional] HTML class name
     * @private
    */
    var Page = function (dialog, className) {
        this.dialog = dialog;
        this.id = dialog.page.length;
        this.element = AJS("div").addClass("dialog-components");
        this.body = AJS("div").addClass("dialog-page-body");
        this.menu = AJS("ul").addClass("dialog-page-menu").css("height", dialog.height + "px");
        this.body.append(this.menu);
        this.curtab;
        this.panel = [];
        this.button = [];
        if (className) {
            this.body.addClass(className);
        }
        dialog.popup.element.append(this.element.append(this.menu).append(this.body));
        dialog.page[dialog.page.length] = this;
    };

    /**
     * Size updater for contents of the page. For internal use
     * @method recalcSize
    */
    Page.prototype.recalcSize = function () {
        var headerHeight = this.header ? HEADER_HEIGHT : 0;
        var buttonHeight = this.buttonpanel ? BUTTONS_HEIGHT : 0;
        for (var i = this.panel.length; i--;) {
            var dialogComponentsHeight = this.dialog.height - headerHeight - buttonHeight;
            this.panel[i].body.css("height", dialogComponentsHeight);
            this.menu.css("height", dialogComponentsHeight);
        }
    };

    /**
     * Adds a button panel to the bottom of dialog
     * @method addButtonPanel
     */
    Page.prototype.addButtonPanel = function () {
        this.buttonpanel = AJS("div").addClass("dialog-button-panel");
        this.element.append(this.buttonpanel);
    };

    /**
     * Method for adding new panel to the page
     * @method addPanel
     * @param title {string} panel title
     * @param reference {string} or {object} jQuery object or selector for the contents of the Panel
     * @param className {string} [optional] HTML class name
     * @param panelButtonId {string} [optional] The unique id for the panel's button.
     * @return {object} the page
    */
    Page.prototype.addPanel = function (title, reference, className, panelButtonId) {
        new Panel(this, title, reference, className, panelButtonId);
        this.recalcSize();
        return this;
    };
    /**
     * Method for adding header to the page
     * @method addHeader
     * @param title {string} panel title
     * @param className {string} [optional] CSS class name
     * @return {object} the page
    */
    Page.prototype.addHeader = function (title, className) {
        if (this.header) {
            this.header.remove();
        }
        this.header =  AJS("h2").text(title || '').addClass("dialog-title");
        className && this.header.addClass(className);
        this.element.prepend(this.header);
        this.recalcSize();
        return this;
    };
    /**
     * Method for adding new button to the page
     * @method addButton
     * @param label {string} button label
     * @param onclick {function} [optional] click event handler
     * @param className {string} [optional] class name
     * @return {object} the page
    */
    Page.prototype.addButton = function (label, onclick, className) {
        new Button(this, label, onclick, className);
        this.recalcSize();
        return this;
    };
    /**
     * Method for adding new link to the page
     * @method addLink
     * @param label {string} button label
     * @param onclick {function} [optional] click event handler
     * @param className {string} [optional] class name
     * @return {object} the page
    */
    Page.prototype.addLink = function (label, onclick, className, url) {
        new Link(this, label, onclick, className, url);
        this.recalcSize();
        return this;
    };

    /**
     * Selects corresponding panel
     * @method gotoPanel
     * @param panel {object} panel object
     * @param panel {number} id of the panel
    */
    Page.prototype.gotoPanel = function (panel) {
        this.panel[panel.id || panel].select();
    };
    /**
     * Returns current panel on the page
     * @method getCurrentPanel
     * @return panel {object} the panel
    */
    Page.prototype.getCurrentPanel = function () {
        return this.panel[this.curtab];
    };
    /**
     * Hides the page
     * @method hide
    */
    Page.prototype.hide = function () {
        this.element.hide();
    };
    /**
     * Shows the page, if it was hidden
     * @method show
    */
    Page.prototype.show = function () {
        this.element.show();
    };
    /**
     * Removes the page
     * @method remove
    */
    Page.prototype.remove = function () {
        this.element.remove();
    };



    /**
     * Constructor for a Dialog. A Dialog is a popup which consists of Pages, where each Page can consist of Panels,
     * Buttons and a Header. The dialog must be constructed in page order as it has a current page state. For example,
     * calling addButton() will add a button to the 'current' page.
     * <p>
     * By default, a new Dialog will have one page. If there are multiple Panels on a Page, a
     * menu is displayed on the left side of the dialog.
     * </p>
     * Usage:
     * <pre>
     * var dialog = new AJS.Dialog(860, 530);
     * dialog.addHeader("Insert Macro")
     * .addPanel("All", "&lt;p&gt;&lt;/p&gt;")
     * .addPanel("Some", "&lt;p&gt;&lt;/p&gt;")
     * .addButton("Next", function (dialog) {dialog.nextPage();})
     * .addButton("Cancel", function (dialog) {dialog.hide();});
     *
     * dialog.addPage()
     * .addButton("Cancel", function (dialog) {dialog.hide();});
     *
     * somebutton.click(function () {dialog.show();});
     * </pre>
     * @class Dialog
     * @namespace AJS
     * @constructor
     * @param width {number} dialog width in pixels, or an object containing the Dialog parameters
     * @param height {number} dialog height in pixels
     * @param id {number} [optional] dialog id
    */
    AJS.Dialog = function (width, height, id) {
        var options = {};
        if (!+width) {
            options = Object(width);
            width = options.width;
            height = options.height;
            id = options.id;
        }
        this.height = height || 480;
        this.width = width || 640;
        this.id = id;
        options = AJS.$.extend({}, options, {
            width: this.width,
            height: this.height,
            id: this.id
        });
        this.popup = AJS.popup(options);

        this.popup.element.addClass("aui-dialog");
        this.page = [];
        this.curpage = 0;

        new Page(this);
    };


    /**
     * Method for adding header to the current page
     * @method addHeader
     * @param title {string} panel title
     * @param className {string} [optional] HTML class name
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.addHeader = function (title, className) {
        this.page[this.curpage].addHeader(title, className);
        return this;
    };
    /**
     * Method for adding new button to the current page
     * @method addButton
     * @param label {string} button label
     * @param onclick {function} [optional] click event handler
     * @param className {string} [optional] class name
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.addButton = function (label, onclick, className) {
        this.page[this.curpage].addButton(label, onclick, className);
        return this;
    };

    /**
     * Method for adding new link to the current page
     * @method addButton
     * @param label {string} link label
     * @param onclick {function} [optional] click event handler
     * @param className {string} [optional] class name
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.addLink = function (label, onclick, className, url) {
        this.page[this.curpage].addLink(label, onclick, className, url);
        return this;
    };

    /**
    * Method for adding a submit button to the current page
    * @method addSubmit
    * @param label {string} link label
    * @param onclick {function} [optional] click event handler
    * @return {object} the dialog
    */
    AJS.Dialog.prototype.addSubmit = function (label, onclick) {
        this.page[this.curpage].addButton(label, onclick, "button-panel-submit-button");
        return this;
    };

    /**
    * Method for adding a cancel link to the current page
    * @method addCancel
    * @param label {string} link label
    * @param onclick {function} [optional] click event handler
    * @return {object} the dialog
    */
    AJS.Dialog.prototype.addCancel= function (label, onclick) {
        this.page[this.curpage].addLink(label, onclick, "button-panel-cancel-link");
        return this;
    };


    /**
     * Method for adding new button panel to the current page
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.addButtonPanel = function () {
        this.page[this.curpage].addButtonPanel();
        return this;
    };


    /**
     * Method for adding new panel to the current page.
     * @method addPanel
     * @param title {string} panel title
     * @param reference {string} or {object} jQuery object or selector for the contents of the Panel
     * @param className {string} [optional] HTML class name
     * @param panelButtonId {String} [optional] The unique id for the panel's button.
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.addPanel = function (title, reference, className, panelButtonId) {
        this.page[this.curpage].addPanel(title, reference, className, panelButtonId);
        return this;
    };
    /**
     * Adds a new page to the dialog and sets the new page as the current page
     * @method addPage
     * @param className {string} [optional] HTML class name
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.addPage = function (className) {
        new Page(this, className);
        this.page[this.curpage].hide();
        this.curpage = this.page.length - 1;
        return this;
    };
    /**
     * Making next page in hierarchy visible and active
     * @method nextPage
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.nextPage = function () {
        this.page[this.curpage++].hide();
        if (this.curpage >= this.page.length) {
            this.curpage = 0;
        }
        this.page[this.curpage].show();
        return this;
    };
    /**
     * Making previous page in hierarchy visible and active
     * @method prevPage
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.prevPage = function () {
        this.page[this.curpage--].hide();
        if (this.curpage < 0) {
            this.curpage = this.page.length - 1;
        }
        this.page[this.curpage].show();
        return this;
    };
    /**
     * Making specified page visible and active
     * @method gotoPage
     * @param num {number} page id
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.gotoPage = function (num) {
        this.page[this.curpage].hide();
        this.curpage = num;
        if (this.curpage < 0) {
            this.curpage = this.page.length - 1;
        } else if (this.curpage >= this.page.length) {
            this.curpage = 0;
        }
        this.page[this.curpage].show();
        return this;
    };
    /**
     * Returns specified panel at the current page
     * @method getPanel
     * @param pageorpanelId {number} page id or panel id
     * @param panelId {number} panel id
     * @return {object} the internal Panel object
    */
    AJS.Dialog.prototype.getPanel = function (pageorpanelId, panelId) {
        var pageid = (panelId == null) ? this.curpage : pageorpanelId;
        if (panelId == null) {
            panelId = pageorpanelId;
        }
        return this.page[pageid].panel[panelId];
    };
    /**
     * Returns specified page
     * @method getPage
     * @param pageid {number} page id
     * @return {object} the internal Page Object
    */
    AJS.Dialog.prototype.getPage = function (pageid) {
        return this.page[pageid];
    };
    /**
     * Returns current panel at the current page
     * @method getCurrentPanel
     * @return {object} the internal Panel object
    */
    AJS.Dialog.prototype.getCurrentPanel = function () {
        return this.page[this.curpage].getCurrentPanel();
    };

    /**
     * Selects corresponding panel
     * @method gotoPanel
     * @param pageorpanel {object} panel object or page object
     * @param panel {object} panel object
     * @param panel {number} id of the panel
    */
    AJS.Dialog.prototype.gotoPanel = function (pageorpanel, panel) {
        if (panel != null) {
            var pageid = pageorpanel.id || pageorpanel;
            this.gotoPage(pageid);
        }
        this.page[this.curpage].gotoPanel(typeof panel == "undefined" ? pageorpanel : panel);
    };

    /**
     * Shows the dialog, if it is not visible
     * @method show
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.show = function () {
        this.popup.show();
        AJS.trigger("show.dialog", {dialog: this});
        return this;
    };
    /**
     * Hides the dialog, if it was visible
     * @method hide
     * @return {object} the dialog
    */
    AJS.Dialog.prototype.hide = function () {
        this.popup.hide();
        AJS.trigger("hide.dialog", {dialog: this});
        return this;
    };
    /**
     * Removes the dialog elements from the DOM
     * @method remove
    */
    AJS.Dialog.prototype.remove = function () {
        this.popup.hide();
        this.popup.remove();
        AJS.trigger("remove.dialog", {dialog: this});
    };
    /**
     * Disables the dialog if enabled
     * @method disable
    */
    AJS.Dialog.prototype.disable = function () {
        this.popup.disable();
        return this;
    };
    /**
     * Enables the dialog if disabled
     * @method disable
    */
    AJS.Dialog.prototype.enable = function () {
        this.popup.enable();
        return this;
    };
    /**
     * Gets set of items depending on query
     * @method get
     * @param query {string} query to search for panels, pages, headers or buttons
     * e.g.
     *      '#Name' will find all dialog components with the given name such as panels and buttons, etc
     *      'panel#Name' will find only panels with the given name
     *      'panel#"Foo bar"' will find only panels with given name
     *      'panel:3' will find the third panel
     */
    AJS.Dialog.prototype.get = function (query) {
        var coll = [],
            dialog = this;
        var nameExp = '#([^"][^ ]*|"[^"]*")';     // a name is a hash followed by either a bare word or quoted string
        var indexExp = ":(\\d+)";                 // an index is a colon followed by some digits
        var typeExp = "page|panel|button|header"; // one of the allowed types
        var selectorExp = "(?:" +                 // a selector is either ...
            "(" + typeExp + ")(?:" + nameExp + "|" + indexExp + ")?" + // a type optionally followed by either #name or :index
            "|" + nameExp +                       // or just a #name
            ")";
        var queryRE = new RegExp("(?:^|,)" +      // a comma or at the start of the line
            "\\s*" + selectorExp +                // optional space and a selector
            "(?:\\s+" + selectorExp + ")?" +      // optionally, followed by some space and a second selector
            "\\s*(?=,|$)", "ig");                 // followed by, but not including, a comma or the end of the string
        (query + "").replace(queryRE, function (all, name, title, id, justtitle, name2, title2, id2, justtitle2) {
            name = name && name.toLowerCase();
            var pages = [];
            if (name == "page" && dialog.page[id]) {
                pages.push(dialog.page[id]);
                name = name2;
                name = name && name.toLowerCase();
                title = title2;
                id = id2;
                justtitle = justtitle2;
            } else {
                pages = dialog.page;
            }
            title = title && (title + "").replace(/"/g, "");
            title2 = title2 && (title2 + "").replace(/"/g, "");
            justtitle = justtitle && (justtitle + "").replace(/"/g, "");
            justtitle2 = justtitle2 && (justtitle2 + "").replace(/"/g, "");
            if (name || justtitle) {
                for (var i = pages.length; i--;) {
                    if (justtitle || (name == "panel" && (title || (!title && id == null)))) {
                        for (var j = pages[i].panel.length; j--;) {
                            if (pages[i].panel[j].button.html() == justtitle || pages[i].panel[j].button.html() == title || (name == "panel" && !title && id == null)) {
                                coll.push(pages[i].panel[j]);
                            }
                        }
                    }
                    if (justtitle || (name == "button" && (title || (!title && id == null)))) {
                        for (var j = pages[i].button.length; j--;) {
                            if (pages[i].button[j].item.html() == justtitle || pages[i].button[j].item.html() == title || (name == "button" && !title && id == null)) {
                                coll.push(pages[i].button[j]);
                            }
                        }
                    }
                    if (pages[i][name] && pages[i][name][id]) {
                        coll.push(pages[i][name][id]);
                    }
                    if (name == "header" && pages[i].header) {
                        coll.push(pages[i].header);
                    }
                }
            } else {
                coll = coll.concat(pages);
            }
        });
        var res = {
            length: coll.length
        };
        for (var i = coll.length; i--;) {
            res[i] = coll[i];
            for (var method in coll[i]) {
                if (!(method in res)) {
                    (function (m) {
                        res[m] = function () {
                            for (var j = this.length; j--;) {
                                if (typeof this[j][m] == "function") {
                                    this[j][m].apply(this[j], arguments);
                                }
                            }
                        };
                    })(method);
                }
            }
        }
        return res;
    };

    /**
     * Updates height of panels, to contain content without the need for scroll bars.
     *
     * @method updateHeight
     */
    AJS.Dialog.prototype.updateHeight = function () {
        var height = 0;
        var maxDialogHeight = AJS.$(window).height() - HEADER_HEIGHT - BUTTONS_HEIGHT - (MIN_DIALOG_VERTICAL_BUFFER * 2);
        for (var i=0; this.getPanel(i); i++) {
            if (this.getPanel(i).body.css({height: "auto", display: "block"}).outerHeight() > height) {
                height = Math.min(maxDialogHeight, this.getPanel(i).body.outerHeight());
            }
            if (i !== this.page[this.curpage].curtab) {
                this.getPanel(i).body.css({display:"none"});
            }
        }
        for (i=0; this.getPanel(i); i++) {
            this.getPanel(i).body.css({height: height || this.height});
        }
        this.page[0].menu.height(height);
        this.height = height + HEADER_HEIGHT + BUTTONS_HEIGHT + 1;
        this.popup.changeSize(undefined, this.height);
    };

    /**
     * Returns whether the dialog has been resized to it's maximum height (has been capped by the viewport height and vertical buffer).
     *
     * @method isMaximised
     */
    AJS.Dialog.prototype.isMaximised = function () {
        return this.popup.element.outerHeight() >= AJS.$(window).height() - (MIN_DIALOG_VERTICAL_BUFFER * 2);
    };

    /**
     * Returns the current panel.
     * @deprecated Since 3.0.1 Use getCurrentPanel() instead.
     */
    AJS.Dialog.prototype.getCurPanel = function () {
        return this.getPanel(this.page[this.curpage].curtab);
    };

    /**
     * Returns the current button panel.
     * @deprecated Since 3.0.1 Use get() instead.
     */
    AJS.Dialog.prototype.getCurPanelButton = function () {
        return this.getCurPanel().button;
    };

})();
/**
 * Dropdown 2
 */
(function ($) {

    var $document = $(document);

    // reference to currently active dropdown events object
    var activeDropdownEvents = null;

    function preventDefault(event) {
        event.preventDefault();
    }

    var BUTTON = (function () {
        var isMouseDown = false;

        function onmousedown(event) {
            if (!isMouseDown && event.which === 1) { // Left-click only
                isMouseDown = true;
                $document.bind("mouseup mouseleave", onmouseup);
                $(this).trigger("aui-button-invoke");
            }
        }

        function onmouseup() {
            $document.unbind("mouseup mouseleave", onmouseup);
            setTimeout(function () {
                isMouseDown = false;
            }, 0);
        }

        function onclick() {
            if (!isMouseDown) {
                $(this).trigger("aui-button-invoke");
            }
        }

        if (typeof document.addEventListener === "undefined") {
            return {
                "click":onclick,
                "click selectstart":preventDefault,
                "mousedown":function (event) {
                    var currentTarget = this;
                    var activeElement = document.activeElement;

                    function onbeforedeactivate(event) {
                        // Prevent this "mousedown" event from moving focus
                        // to currentTarget, or away from activeElement.
                        switch (event.toElement) {
                            case null:
                            case currentTarget:
                            case document.body:
                            case document.documentElement:
                                event.returnValue = false;
                        }
                    }

                    onmousedown.call(this, event);
                    if (activeElement !== null) {
                        activeElement.attachEvent("onbeforedeactivate", onbeforedeactivate);
                        setTimeout(function () {
                            activeElement.detachEvent("onbeforedeactivate", onbeforedeactivate);
                        }, 0);
                    }
                }
            };
        }
        return {
            "click":onclick,
            "click mousedown":preventDefault,
            "mousedown":onmousedown
        };
    })();

    var DROPDOWN_TRIGGER = {
        "aui-button-invoke": function (event, options) {
            options = $.extend({
                selectFirst: true
            }, options);

            var $dropdown = getDropdownForTrigger(this);
            var $trigger = $(this).addClass("active aui-dropdown2-active");
            var isSubmenu = $trigger.hasClass("aui-dropdown2-sub-trigger");

            //HIDE LOCATION
            var hideParent = $dropdown.parent()[0];  //remember the immediate parent of the dropdown before it was shown
            var hideSibling = $dropdown.next()[0];     //remeber the immediate next sibling of the dropdown before it was shown
            var hideLocation = $(this).attr("data-dropdown2-hide-location"); //set the hide location according to the data-dropdown2-hide-location attribute

            if (hideLocation) {
                var hideEl = document.getElementById(hideLocation);
                if (hideEl) {
                    hideParent = $(hideEl); //use the specified element to hide the dropdown
                    hideSibling = undefined;    //if there is a specified hide location don't use the sibling for hiding.
                } else {
                    throw new Error("The specified data-dropdown2-hide-location id doesn't exist");
                }
            }

            var $menu = options.$menu || $trigger.closest(".aui-dropdown2-trigger-group");

            if (isSubmenu) {
                var $parent = $trigger.closest(".aui-dropdown2");

                // inherit dropdown styles from the parent
                $dropdown.addClass($parent.attr("class")).addClass("aui-dropdown2-sub-menu");
            }

            var ITEM = {
                "click": function (e) {
                    var $this = $(this);
                    if (!isItemEnabled($this)) {
                        return;
                    }

                    if (!$this.hasClass("interactive") && !$this.hasClass("aui-dropdown2-interactive")) {
                        hideAll();
                    }

                    // potential support for mobile devices where submenus are opened
                    // by click instead of hover events
                    if (isSubmenuTrigger($this)) {
                        invokeItem($this, { selectFirst: false });
                        preventDefault(e);
                    }
                },
                "mousemove": function () {
                    var $this = $(this);
                    var newItemSelected = selectItem($this);

                    if (newItemSelected) {
                        invokeItem($this, { selectFirst: false });
                    }
                }
            };

            var DROPDOWN = {
                "click focusin mousedown": function (event) {
                    var target = event.target;
                    if (document === target && event.type === "focusin") {
                        return; // Firefox will trigger focusin on document when focus leaves an iframe.
                    }
                    if (!inside(target, $dropdown[0]) && !inside(target, $trigger[0])) {
                        hideAll();
                    }
                },
                "keydown": function (event) {
                    var $item;
                    if (event.shiftKey && event.keyCode == 9) {
                        selectNextItem(-1); // Shift tab
                    } else {
                        switch (event.keyCode) {
                            case 13: // Return
                                $item = activeItem();
                                if (isSubmenuTrigger($item)) {
                                    invokeItem($item);
                                } else {
                                    click($item[0]);
                                }

                                break;
                            case 27: // Escape
                                hide();
                                break;
                            case 37: // Left
                                $item = activeItem();
                                if (isSubmenuTrigger($item)) {
                                    var $submenu = getDropdownForTrigger($item);
                                    if ($submenu.is(":visible")) {
                                        $dropdown.trigger("aui-dropdown2-step-out");
                                        return;
                                    }
                                }

                                if (isSubmenu) {
                                    hide();
                                } else {
                                    selectNextMenu(-1);
                                }
                                break;
                            case 38: // Up
                                selectNextItem(-1);
                                break;
                            case 39: // Right
                                $item = activeItem();
                                if (isSubmenuTrigger($item)) {
                                    invokeItem($item);
                                } else {
                                    selectNextMenu(1);
                                }
                                break;
                            case 40: // Down
                                selectNextItem(1);
                                break;
                            case 9: // Tab
                                selectNextItem(1);
                                break;
                            default:
                                // Don't prevent the default action for other keys.
                                return;
                        }
                    }
                    preventDefault(event);
                }
            };

            // ARIA - sets item role (checkbox or radio)
            // for radio, also sets containing UL to role=radiogroup
            function dropdown2AriaMenus($elements, role) {
                $elements.each(function () {
                    var $el = $(this);
                    $el.attr("role", role);
                    if ($el.hasClass("checked") || $el.hasClass("aui-dropdown2-checked")) {
                        $el.attr("aria-checked", "true");
                        if (role == "radio") {
                            $el.closest("ul").attr("role", "radiogroup");
                        }
                    } else {
                        $el.attr("aria-checked", "false");
                    }
                });
            }

            $trigger.attr("aria-controls", $trigger.attr("aria-owns"));

            $dropdown.find(".disabled,.aui-dropdown2-disabled").attr("aria-disabled", "true");
            $dropdown.find("li.hidden > a,li.aui-dropdown2-hidden > a").addClass("disabled aui-dropdown2-disabled").attr("aria-disabled", "true");
            dropdown2AriaMenus($dropdown.find(".aui-dropdown2-checkbox"), "checkbox");
            dropdown2AriaMenus($dropdown.find(".aui-dropdown2-radio"), "radio");

            function setPosition() {
                var trOffset = $trigger.offset();
                var trWidth = $trigger.outerWidth();
                // If the dropdown is positioned on the far right of the screen and the contents
                // of the dropdown is larger than the min-width and the dropdown would be
                // partially offscreen if it were visible, the incorrect outerWidth() would
                // be calculated. As a result we zero out the top/left to ensure it is never
                // partially positioned offscreen
                $dropdown.css({ left: 0, top: 0 });
                var ddWidth = $dropdown.outerWidth();
                var docWidth = $("body").outerWidth(true); //use body width instead of document width because jQuery doesn't account for scrollbar in IE
                var minWidth = Math.max(parseInt($dropdown.css("min-width"), 10), trWidth);
                var ddContainer = $trigger.data("container") || false;
                var ddAlignment = "left";
                var horizontalBorderWidth;

                if (!isSubmenu) {
                    $dropdown.css("min-width", minWidth + "px");
                }

                var left = trOffset.left,
                    top  = trOffset.top + $trigger.outerHeight();

                if (isSubmenu) {
                    // submenus are aligned next to the trigger, not below it
                    // the offset pushes the submenu slightly to the left to overlap with the parent
                    var offset = 3;
                    left = trOffset.left + $parent.outerWidth() - offset;
                    top  = trOffset.top;
                }

                // If there isn't enough available space to left-align the dropdown,
                // make it right-aligned instead.
                if (docWidth < left + ddWidth && ddWidth <= left + trWidth) {
                    left = trOffset.left + trWidth - ddWidth;
                    if (isSubmenu) {
                        left = trOffset.left - ddWidth;
                    }
                    ddAlignment = "right";
                }

                // where dropdown declares a container element other than body,
                // check if it needs to flip to right-aligned
                // todo: rationalise this and the default logic
                // todo: rationalise this and the default logic
                if (ddContainer) {
                    var container = $trigger.closest(ddContainer),
                        triggerRight = $trigger.offset().left + $trigger.outerWidth(),
                        dropdownRight = triggerRight + ddWidth;

                    // first-load bug only seems to affect custom-boundary elements
                    if (minWidth >= ddWidth) {
                        ddWidth = minWidth;
                    }

                    // if the dropdown don't fit you must acquit. and align right.
                    if (dropdownRight > triggerRight) {
                        left = triggerRight - ddWidth;
                        ddAlignment = "right";
                    }
                }

                $dropdown.attr({
                    "data-dropdown2-alignment": ddAlignment,
                    "aria-hidden": "false"
                }).css({
                    display: "block",
                    left: left + "px",
                    top: top + "px"
                });

                // Ensure the dropdown element is always document.body.lastChild to
                // preserve z-axis stacking order.
                $dropdown.appendTo(document.body);
            }

            setPosition();

            // Integration with AUI Toolbar v1
            if ($trigger.hasClass("toolbar-trigger")) {
                $dropdown.addClass("aui-dropdown2-in-toolbar");
            }
            // Integration with AUI Buttons v1
            if ($trigger.parent().hasClass("aui-buttons")) {
                $dropdown.addClass("aui-dropdown2-in-buttons");
            }
            // Integration with AUI Header v1
            if ($trigger.parents().hasClass("aui-header")) {
                $dropdown.addClass("aui-dropdown2-in-header");
            }

            $dropdown.trigger("aui-dropdown2-show", options);

            if (options.selectFirst) {
                selectFirstItem();
            }

            setEvents("on");
            function hide() {
                disableDropdownEvents();
                setEvents("off");
                // Event handlers that are currently running may expect the dropdown
                // element to remain  within the document. Wait until these handlers
                // complete before removing the dropdown element.
                setTimeout(function () {
                    // Hide the dropdown element but don't remove it from the document
                    // so that its contents remains accessible to external code.
                    $dropdown.css("display", "none").css("min-width", "").insertAfter($trigger).attr("aria-hidden", "true");

                    if (!isSubmenu) {
                        $trigger.removeClass("active aui-dropdown2-active");
                    }

                    activeItem().removeClass("active aui-dropdown2-active");

                    $dropdown.removeClass("aui-dropdown2-in-toolbar");
                    // insert after the trigger breaks buttons; insert after buttons breaks toolbar2
                    // insert before buttons is ok!
                    $dropdown.removeClass("aui-dropdown2-in-buttons");

                    //If there is an original sibling for the dropdown insert it after that when hiding, otherwise use the hide parent.
                    if (hideSibling) {
                        $dropdown.insertBefore(hideSibling);
                    } else {
                        $dropdown.appendTo(hideParent);
                    }

                    $dropdown.trigger("aui-dropdown2-hide");
                }, 0);
            }

            /**
             * Hide this dropdown and then tell parent to hide as well.
             */
            function hideAll() {
                hide();
                if (isSubmenu) {
                    $parent.trigger("aui-dropdown2-hide-all");
                }
            }

            /**
             * Hide if event is triggered by parent.
             * @param event
             */
            function hideForParent(event) {
                if (isSubmenu && event.target === $parent[0]) {
                    hide();
                }
            }

            function isItemEnabled($item) {
                return !$item.is(".disabled, .aui-dropdown2-disabled, [aria-disabled=true]");
            }

            function isSubmenuTrigger($item) {
                return $item.hasClass("aui-dropdown2-sub-trigger");
            }

            /**
             * Invokes the item's submenu if it has one. If the submenu is still hidden then show it,
             * otherwise select the first item.
             *
             */
            function invokeItem($item, options) {
                if (!isSubmenuTrigger($item)) {
                    return;
                }

                options = $.extend({}, options, {
                    $menu: $menu
                });

                var $dropdown = getDropdownForTrigger($item);
                if ($dropdown.is(":visible")) {
                    $dropdown.trigger("aui-dropdown2-select-first");
                } else {
                    $item.trigger("aui-button-invoke", options);
                }
            }

            function activeItem() {
                return $dropdown.find("a.active,a.aui-dropdown2-active");
            }

            var $currentItem = null;
            function selectItem($next) {
                if ($currentItem && $currentItem[0] === $next[0]) {
                    return false;
                }
                $currentItem = $next;

                activeItem().removeClass("active aui-dropdown2-active");

                if (isItemEnabled($next)) {
                    $next.addClass("active aui-dropdown2-active");
                }

                $dropdown.trigger("aui-dropdown2-item-selected");

                // enable dropdown events once an item in this dropdown has been selected
                enableDropdownEvents();

                return true;
            }


            function selectFirstItem() {
                selectItem($dropdown.find("a:not(.disabled):not(.aui-dropdown2-disabled)").first());
            }

            function selectNextItem(offset) {
                // only find the first level of items (do not include items in submenus)
                var items = $dropdown.find("> ul > li > a, > .aui-dropdown2-section > ul > li > a").not(".disabled,.aui-dropdown2-disabled");
                selectItem(getByOffset(items, offset, true));
            }

            function selectMenu($next) {
                if ($next.length > 0) {
                    hideAll();
                    $next.trigger("aui-button-invoke");
                }
            }

            function selectNextMenu(offset) {
                selectMenu(getByOffset($menu.find(".aui-dropdown2-trigger").not(".disabled, .aui-dropdown2-disabled, [aria-disabled=true], .aui-dropdown2-sub-trigger"), offset, false));
            }

            function getByOffset($collection, offset, wrap) {
                var i = $collection.index($collection.filter(".active,.aui-dropdown2-active"));
                i += (i < 0 && offset < 0) ? 1 : 0; // Correct for case where i == -1.
                i += offset;
                if (wrap) {
                    i %= $collection.length;
                } else if (i < 0) {
                    i = $collection.length; // Out of bounds
                }
                return $collection.eq(i);
            }

            function replaceMenu() {
                selectMenu($(this));
            }

            function disableDropdownEvents() {
                // unbind dropdown events on hiding
                if (activeDropdownEvents === DROPDOWN) {
                    $document.unbind(DROPDOWN);
                    activeDropdownEvents = null;
                }
            }

            function enableDropdownEvents() {
                if (activeDropdownEvents === DROPDOWN) {
                    return;
                }

                $document.unbind(activeDropdownEvents);
                $document.bind(DROPDOWN);
                activeDropdownEvents = DROPDOWN;
            }

            function setEvents(state) {
                var bind = "bind";
                var delegate = "delegate";
                if (state !== "on") {
                    bind = "unbind";
                    delegate = "undelegate";
                }

                if (!isSubmenu) {
                    $menu[delegate](".aui-dropdown2-trigger:not(.active):not(.aui-dropdown2-active)", "mousemove", replaceMenu);
                    $trigger[bind]("aui-button-invoke", hide);
                } else {
                    // There are a few reasons why this dropdown should hide in response to an action on the parent:
                    // - the parent was hidden
                    // - a new item was selected in the parent
                    // - the dropdown was opened via hovering over an item in the parent and the left key was pressed
                    // In any case we hide this dropdown if the event was thrown by the direct parent.
                    $parent[bind]("aui-dropdown2-hide aui-dropdown2-item-selected aui-dropdown2-step-out", hideForParent);
                }

                // hide when children requested dropdown close
                $dropdown[bind]("aui-dropdown2-hide-all", hideAll);

                $dropdown[delegate]("a", ITEM);

                // activate current dropdown events when a child has been closed (and therefore threw its event)
                $dropdown[bind]("aui-dropdown2-hide", enableDropdownEvents);

                // listen for events to select the first item
                $dropdown[bind]("aui-dropdown2-select-first", selectFirstItem);
            }
        },
        "mousedown": function (event) {
            if (event.which === 1) { // Left-click only
                $(this).bind(SIMULATE_CLICK_ENABLE);
            }
        }
    };

    var SIMULATE_CLICK_ENABLE = {
        "mouseleave":function () {
            $document.bind(SIMULATE_CLICK);
        },
        "mouseup mouseleave":function () {
            $(this).unbind(SIMULATE_CLICK_ENABLE);
        }
    };

    var SIMULATE_CLICK = {
        "mouseup":function (event) {
            var target = $(event.target).closest(".aui-dropdown2 a, .aui-dropdown2-trigger")[0];
            if (target) {
                setTimeout(function () {
                    click(target);
                }, 0);
            }
        },
        "mouseup mouseleave":function () {
            $(this).unbind(SIMULATE_CLICK);
        }
    };

    function click(element) {
        if (element.click) {
            element.click();
        } else {
            var event = document.createEvent("MouseEvents");
            event.initMouseEvent("click",
                true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            element.dispatchEvent(event);
        }
    }

    function inside(target, container) {
        return (target === container) || $.contains(container, target);
    }

    function getDropdownForTrigger(triggerElement) {
        if (!(triggerElement instanceof AJS.$)) {
            triggerElement = $(triggerElement);
        }

        var id = triggerElement.attr("aria-owns"),
            haspopup = triggerElement.attr("aria-haspopup"),
            el = document.getElementById(id);
        if (el) {
            return $(el);
        } else {
            if (!id) {
                throw new Error("Dropdown 2 trigger required attribute not set: aria-owns");
            }
            if (!haspopup) {
                throw new Error("Dropdown 2 trigger required attribute not set: aria-haspopup");
            }
            if (!el) {
                throw new Error("Dropdown 2 trigger aria-owns attr set to nonexistent id: " + id);
            }
            throw new Error("Dropdown 2 trigger unknown error. I don't know what you did, but there's smoke everywhere. Consult the documentation.");
        }
    }

    // Initialise events for default dropdown className.
    $document.delegate(".aui-dropdown2-trigger", BUTTON);
    $document.delegate(".aui-dropdown2-trigger:not(.active):not(.aui-dropdown2-active):not([aria-disabled=true])," +
                       ".aui-dropdown2-sub-trigger:not([aria-disabled=true])", DROPDOWN_TRIGGER);

    // Checkboxes
    $document.delegate(".aui-dropdown2-checkbox:not(.disabled):not(.aui-dropdown2-disabled)", "click", function () {
        var $checkbox = $(this);
        if ($checkbox.hasClass("checked") || $checkbox.hasClass("aui-dropdown2-checked")) {
            $checkbox.removeClass("checked aui-dropdown2-checked").attr("aria-checked", "false");
            $checkbox.trigger("aui-dropdown2-item-uncheck");
        } else {
            $checkbox.addClass("checked aui-dropdown2-checked").attr("aria-checked", "true");
            $checkbox.trigger("aui-dropdown2-item-check");
        }
    });

    // Radio button groups
    $document.delegate(".aui-dropdown2-radio:not(.checked):not(.aui-dropdown2-checked):not(.disabled):not(.aui-dropdown2-disabled)", "click", function () {
        var $next = $(this);
        var $prev = $next.closest("ul").find(".checked,.aui-dropdown2-checked");
        $prev.removeClass("checked aui-dropdown2-checked").attr("aria-checked", "false").trigger("aui-dropdown2-item-uncheck");
        $next.addClass("checked aui-dropdown2-checked").attr("aria-checked", "true").trigger("aui-dropdown2-item-check");
    });

    // Disabled items
    $document.delegate(".aui-dropdown2 a.disabled,.aui-dropdown2 a.aui-dropdown2-disabled", "click", function (event) {
        preventDefault(event);
    });

})(AJS.$);

/**
 * Forms: Inline Help - toggles visibility of inline help content.
 *
 * @method inlineHelp
 * @namespace AJS
 * @for AJS
 */
AJS.inlineHelp = function () {
    AJS.$(".icon-inline-help").click(function(){
        var $t = AJS.$(this).siblings(".field-help");
        if ($t.hasClass("hidden")){
            $t.removeClass("hidden");
        } else {
            $t.addClass("hidden");
        }
    });
};
/* global Raphael: true */

(function($) {
    /**
     * Creates a new inline dialog.
     *
     * @class InlineDialog
     * @namespace AJS
     * @constructor
     * @param items jQuery object - the items that trigger the display of this popup when the user mouses over.
     * @param identifier A unique identifier for this popup. This should be unique across all popups on the page and a valid CSS class.
     * @param url The URL to retrieve popup contents.
     * @param options Custom options to change default behaviour. See AJS.InlineDialog.opts for default values and valid options.
     */
    AJS.InlineDialog = function (items, identifier, url, options) {
        if (options && options.getArrowAttributes) {
            AJS.log("DEPRECATED: getArrowAttributes - See https://ecosystem.atlassian.net/browse/AUI-1362");
        }

        if (options && options.getArrowPath) {
            AJS.log("DEPRECATED: getArrowPath - See https://ecosystem.atlassian.net/browse/AUI-1362");
            if (options.gravity !== undefined) {
                AJS.log("DEPRECATED: getArrowPath does not support gravity - See https://ecosystem.atlassian.net/browse/AUI-2197")
            }
        }

        if (options && options.onTop !== undefined) {
            AJS.log("DEPRECATED: onTop has been replaced with gravity - See https://ecosystem.atlassian.net/browse/AUI-2197");
            if (options.onTop && options.gravity === undefined) {
                options.gravity = 's';
            }
        }

        // attempt to generate a random identifier if it doesn't exist
        if (typeof identifier === 'undefined') {

            identifier = String(Math.random()).replace('.', '');

            // if the generated supplied identifier already exists when combined with the prefixes we'll be using, then bail
            if ($('#inline-dialog-' + identifier + ', #arrow-' + identifier + ', #inline-dialog-shim-' + identifier).length) {
                throw 'GENERATED_IDENTIFIER_NOT_UNIQUE';
            }

        }

        var opts = $.extend(false, AJS.InlineDialog.opts, options);
        if (opts.gravity === 'w') {
            // TODO Once support for gravity: 'e' is added, it should also
            //      transpose the defaults for offsetX and offsetY.
            opts.offsetX = options.offsetX === undefined ? 10 : options.offsetX;
            opts.offsetY = options.offsetY === undefined ? 0 : options.offsetY;
        }
        var renderAsSVG = function() {
            return window.Raphael && options && (options.getArrowPath || options.getArrowAttributes);
        };

        var hash;
        var hideDelayTimer;
        var showTimer;
        var beingShown = false;
        var shouldShow = false;
        var contentLoaded = false;
        var mousePosition;
        var targetPosition;
        var popup  = $('<div id="inline-dialog-' + identifier
            + '" class="aui-inline-dialog"><div class="aui-inline-dialog-contents contents"></div><div id="arrow-' +
            identifier + '" class="aui-inline-dialog-arrow arrow"></div></div>');

        var arrow = $("#arrow-" + identifier, popup);
        var contents = popup.find(".contents");

        if (!renderAsSVG()) {
            popup.find(".aui-inline-dialog-arrow").addClass("aui-css-arrow");
        }

        if (!opts.displayShadow) {
            contents.addClass('aui-inline-dialog-no-shadow');
        }
        
        if (opts.autoWidth) {
            contents.addClass('aui-inline-dialog-auto-width');
        } else {
            contents.css("width", opts.width + "px");
        }

        contents.mouseover(function(e) {
            clearTimeout(hideDelayTimer);
            popup.unbind("mouseover");
            //e.stopPropagation();
        }).mouseout(function() {
                hidePopup();
            });

        var getHash = function () {
            if (!hash) {
                hash = {
                    popup: popup,
                    hide: function(){
                        hidePopup(0);
                    },
                    id: identifier,
                    show: function(){
                        showPopup();
                    },
                    persistent: opts.persistent ? true : false,
                    reset: function () {

                        function drawPopup (popup, positions) {
                            //Position the popup using the left and right parameters
                            popup.css(positions.popupCss);

                            if (renderAsSVG()) {
                                //special adjustment for downards raphael arrow
                                if (positions.gravity === 's'){
                                    positions.arrowCss.top -= $.browser.msie ? 10 : 9;
                                }

                                if (!popup.arrowCanvas) {
                                    popup.arrowCanvas = Raphael("arrow-"+identifier, 16, 16);  //create canvas using arrow element
                                }
                                var getArrowPath = opts.getArrowPath,
                                    arrowPath = $.isFunction(getArrowPath) ?
                                        getArrowPath(positions) :
                                        getArrowPath;
                                //draw the arrow
                                popup.arrowCanvas
                                    .path(arrowPath)
                                    .attr(opts.getArrowAttributes());

                            } else {
                                arrow.removeClass('aui-bottom-arrow aui-left-arrow aui-right-arrow');
                                if (positions.gravity === 's' && !arrow.hasClass("aui-bottom-arrow")) {
                                    arrow.addClass("aui-bottom-arrow");
                                } else if (positions.gravity === 'n') {
                                    // Default styles are for 'n' gravity.
                                } else if (positions.gravity === 'w') {
                                    arrow.addClass('aui-left-arrow');
                                } else if (positions.gravity === 'e') {
                                    arrow.addClass('aui-right-arrow');
                                }
                            }


                            arrow.css(positions.arrowCss);
                        }

                        //DRAW POPUP
                        var viewportHeight = AJS.$(window).height();
                        var popupMaxHeight = Math.round(viewportHeight * 0.75);
                        popup.children('.aui-inline-dialog-contents')
                            .css('max-height', popupMaxHeight);

                        var positions = opts.calculatePositions(popup, targetPosition, mousePosition, opts);
                        if (positions.displayAbove !== undefined) {
                            AJS.log("DEPRECATED: displayAbove has been replaced with gravity - See https://ecosystem.atlassian.net/browse/AUI-2197");
                            positions.gravity = positions.displayAbove ? 's' : 'n';
                        }

                        drawPopup(popup, positions);

                        // reset position of popup box
                        popup.fadeIn(opts.fadeTime, function() {
                            // once the animation is complete, set the tracker variables
                            // beingShown = false; // is this necessary? Maybe only the shouldShow will have to be reset?
                        });

                        if ($.browser.msie && ~~($.browser.version) < 10) {
                            // iframeShim, prepend if it doesnt exist
                            var jQueryCache = $('#inline-dialog-shim-' + identifier);
                            if (!jQueryCache.length) {
                                $(popup).prepend($('<iframe class = "inline-dialog-shim" id="inline-dialog-shim-' + identifier + '" frameBorder="0" src="javascript:false;"></iframe>'));
                            }
                            // adjust height and width of shim according to the popup
                            jQueryCache.css({
                                width: contents.outerWidth(),
                                height: contents.outerHeight()
                            });
                        }
                    }
                };
            }
            return hash;
        };

        var showPopup = function() {
            if (popup.is(":visible")) {
                return;
            }
            showTimer = setTimeout(function() {
                if (!contentLoaded || !shouldShow) {
                    return;
                }
                opts.addActiveClass && $(items).addClass("active");
                beingShown = true;
                if (!opts.persistent) {
                    bindHideEvents();
                }
                AJS.InlineDialog.current = getHash();
                $(document).trigger("showLayer", ["inlineDialog", getHash()]);
                // retrieve the position of the click target. The offsets might be different for different types of targets and therefore
                // either have to be customisable or we will have to be smarter about calculating the padding and elements around it

                getHash().reset();

            }, opts.showDelay);
        };

        var hidePopup = function(delay) {
            // do not auto hide the popup if persistent is set as true
            if (typeof delay == 'undefined' && opts.persistent) {
                return;
            }

            shouldShow = false;
            // only exectute the below if the popup is currently being shown
            // and the arbitrator callback gives us the green light
            if (beingShown && opts.preHideCallback.call(popup[0].popup)) {
                delay = (delay == null) ? opts.hideDelay : delay;
                clearTimeout(hideDelayTimer);
                clearTimeout(showTimer);
                // store the timer so that it can be cleared in the mouseover if required
                //disable auto-hide if user passes null for hideDelay
                if (delay != null) {
                    hideDelayTimer = setTimeout(function() {
                        unbindHideEvents();
                        opts.addActiveClass && $(items).removeClass("active");
                        popup.fadeOut(opts.fadeTime, function() { opts.hideCallback.call(popup[0].popup); });
                        //If there's a raphael arrow remove it properly
                        if(popup.arrowCanvas){
                            popup.arrowCanvas.remove();
                            popup.arrowCanvas = null;
                        }
                        beingShown = false;
                        shouldShow = false;
                        $(document).trigger("hideLayer", ["inlineDialog", getHash()]);
                        AJS.InlineDialog.current = null;
                        if (!opts.cacheContent) {
                            //if not caching the content, then reset the
                            //flags to false so as to reload the content
                            //on next mouse hover.
                            contentLoaded = false;
                            contentLoading = false;
                        }

                    }, delay);
                }

            }
        };

        // the trigger is the jquery element that is triggering the popup (i.e., the element that the mousemove event is bound to)
        var initPopup = function(e, trigger) {
            var $trigger = $(trigger);

            opts.upfrontCallback.call({
                popup: popup,
                hide: function () {hidePopup(0);},
                id: identifier,
                show: function () {showPopup();}
            });

            popup.each(function() {
                if (typeof this.popup != "undefined") {
                    this.popup.hide();
                }
            });

            //Close all other popups if neccessary
            if (opts.closeOthers) {
                $(".aui-inline-dialog").each(function() {
                    !this.popup.persistent && this.popup.hide();
                });
            }

            //handle programmatic showing where there is no event
            targetPosition = {target: $trigger};
            if (!e) {
                mousePosition = { x: $trigger.offset().left, y: $trigger.offset().top };
            } else {
                mousePosition = { x: e.pageX, y: e.pageY };
            }



            if (!beingShown) {
                clearTimeout(showTimer);
            }
            shouldShow = true;
            var doShowPopup = function() {
                contentLoading = false;
                contentLoaded = true;
                opts.initCallback.call({
                    popup: popup,
                    hide: function () {hidePopup(0);},
                    id: identifier,
                    show: function () {showPopup();}
                });
                showPopup();
            };
            // lazy load popup contents
            if (!contentLoading) {
                contentLoading = true;
                if ($.isFunction(url)) {
                    // If the passed in URL is a function, execute it. Otherwise simply load the content.
                    url(contents, trigger, doShowPopup);
                } else {
                    //Retrive response from server
                    $.get(url, function (data, status, xhr) {
                        //Load HTML contents into the popup
                        contents.html(opts.responseHandler(data, status, xhr));
                        //Show the popup
                        contentLoaded = true;
                        opts.initCallback.call({
                            popup: popup,
                            hide: function () {hidePopup(0);},
                            id: identifier,
                            show: function () {showPopup();}
                        });
                        showPopup();
                    });
                }
            }
            // stops the hide event if we move from the trigger to the popup element
            clearTimeout(hideDelayTimer);
            // don't trigger the animation again if we're being shown
            if (!beingShown) {
                showPopup();
            }
            return false;
        };

        popup[0].popup = getHash();

        var contentLoading = false;
        var added  = false;
        var appendPopup = function () {
            if (!added) {
                $(opts.container).append(popup);
                added = true;
            }
        };
        var $items = $(items);

        if (opts.onHover) {
            if (opts.useLiveEvents) {
                // We're using .on() to emulate the behaviour of .live() here. on() requires the jQuery object to have
                // a selector - this is actually how .live() is implemented in jQuery 1.7+.
                // Note that .selector is deleted in jQuery 1.9+.
                // This means that jQuery objects created by selection eg $(".my-class-selector") will work, but
                // object created by DOM parsing eg $("<div class='.my-class'></div>") will not work.
                // Ideally we should throw an error if the $items has no selector but that is backwards incompatible,
                // so we warn and do a no-op - this emulates the behaviour of live() but has the added warning.
                if ($items.selector) {
                    $(document).on("mousemove", $items.selector, function(e) {
                        appendPopup();
                        initPopup(e, this);
                    }).on("mouseout", $items.selector, function() {
                            hidePopup();
                        });
                }
                else {
                    AJS.log("Warning: inline dialog trigger elements must have a jQuery selector when the useLiveEvents option is enabled.");
                }
            } else {
                $items.mousemove(function(e) {
                    appendPopup();
                    initPopup(e,this);
                }).mouseout(function() {
                        hidePopup();
                    });
            }
        } else {
            if (!opts.noBind) {   //Check if the noBind option is turned on
                if (opts.useLiveEvents) {
                    // See above for why we filter by .selector
                    if ($items.selector) {
                        $(document).on("click", $items.selector, function(e) {
                            appendPopup();
                            if (shouldCloseOnTriggerClick()) {
                                popup.hide();
                            } else {
                                initPopup(e,this);
                            }
                            return false;
                        }).on("mouseout", $items.selector, function() {
                                hidePopup();
                            });
                    }
                    else {
                        AJS.log("Warning: inline dialog trigger elements must have a jQuery selector when the useLiveEvents option is enabled.");
                    }
                } else {
                    $items.click(function(e) {
                        appendPopup();
                        if (shouldCloseOnTriggerClick()) {
                            popup.hide();
                        } else {
                            initPopup(e,this);
                        }
                        return false;
                    }).mouseout(function() {
                            hidePopup();
                        });
                }
            }
        }

        var shouldCloseOnTriggerClick = function() {
            return beingShown && opts.closeOnTriggerClick;
        }

        var bindHideEvents = function() {
            bindHideOnExternalClick();
            bindHideOnEscPressed();
        };

        var unbindHideEvents = function() {
            unbindHideOnExternalClick();
            unbindHideOnEscPressed();
        };

        // Be defensive and make sure that we haven't already bound the event
        var hasBoundOnExternalClick = false;
        var externalClickNamespace = identifier + ".inline-dialog-check";

        /**
         * Catch click events on the body to see if the click target occurs outside of this popup
         * If it does, the popup will be hidden
         */
        var bindHideOnExternalClick = function () {
            if (!hasBoundOnExternalClick) {
                $("body").bind("click." + externalClickNamespace, function(e) {
                    var $target = $(e.target);
                    // hide the popup if the target of the event is not in the dialog
                    if ($target.closest('#inline-dialog-' + identifier + ' .contents').length === 0) {
                        hidePopup(0);
                    }
                });
                hasBoundOnExternalClick = true;
            }
        };

        var unbindHideOnExternalClick = function () {
            if (hasBoundOnExternalClick) {
                $("body").unbind("click." + externalClickNamespace);
            }
            hasBoundOnExternalClick = false;
        };

        var onKeydown = function(e) {
            if (e.keyCode === 27) {
                hidePopup(0);
            }
        };

        var bindHideOnEscPressed = function() {
            $(document).on("keydown", onKeydown);
        };

        var unbindHideOnEscPressed = function() {
            $(document).off("keydown", onKeydown);
        };

        /**
         * Show the inline dialog.
         * @method show
         */
        popup.show = function (e, trigger) {
            if (e) {
                e.stopPropagation();
            }
            appendPopup();
            if (opts.noBind && !(items && items.length)) {
                initPopup(e, trigger === undefined ? e.target : trigger);
            } else {
                initPopup(e, items);
            }
        };
        /**
         * Hide the inline dialog.
         * @method hide
         */
        popup.hide = function () {
            hidePopup(0);
        };
        /**
         * Repositions the inline dialog if being shown.
         * @method refresh
         */
        popup.refresh = function () {
            if (beingShown) {
                getHash().reset();
            }
        };

        popup.getOptions = function(){
            return opts;
        };

        return popup;
    };

    function dimensionsOf(el) {
        var $el = $(el);
        var offset = $.extend({left: 0, top: 0}, $el.offset());
        return {
            left: offset.left,
            top: offset.top,
            width: $el.outerWidth(),
            height: $el.outerHeight()
        };
    }

    function getDimensions(popup, targetPosition, mousePosition, opts) {
        var offsetX = AJS.$.isFunction(opts.offsetX) ? opts.offsetX(popup, targetPosition, mousePosition, opts) : opts.offsetX;
        var offsetY = AJS.$.isFunction(opts.offsetY) ? opts.offsetY(popup, targetPosition, mousePosition, opts) : opts.offsetY;
        var arrowOffsetX = AJS.$.isFunction(opts.arrowOffsetX) ? opts.arrowOffsetX(popup, targetPosition, mousePosition, opts) : opts.arrowOffsetX;
        var arrowOffsetY = AJS.$.isFunction(opts.arrowOffsetY) ? opts.arrowOffsetY(popup, targetPosition, mousePosition, opts) : opts.arrowOffsetY;

        // Support positioning inside a scroll container other than <body>
        var isConstrainedScroll = opts.container.toLowerCase() !== 'body';
        var $scrollContainer = AJS.$(opts.container);
        var $scrollWindow = isConstrainedScroll ?
            AJS.$(opts.container).parent() :
            AJS.$(window);
        var scrollContainerOffset = isConstrainedScroll ?
            $scrollContainer.offset() : { left: 0, top: 0 };
        var scrollWindowOffset = isConstrainedScroll ?
            $scrollWindow.offset() : { left: 0, top: 0 };

        var trigger = targetPosition.target;
        var triggerOffset = trigger.offset();
        // Support SVG elements as triggers
        // TODO Should calculateNorthSouthPositions also try getBBox()?
        var triggerBBox = trigger[0].getBBox && trigger[0].getBBox();

        return {
            // determines how close to the edge the dialog needs to be before it is considered offscreen
            screenPadding: 10,
            // Min distance arrow needs to be from the edge of the dialog
            arrowMargin: 5,
            window: {
                top: scrollWindowOffset.top,
                left: scrollWindowOffset.left,
                scrollTop: $scrollWindow.scrollTop(),
                scrollLeft: $scrollWindow.scrollLeft(),
                width: $scrollWindow.width(),
                height: $scrollWindow.height()
            },
            scrollContainer: {
                width: $scrollContainer.width(),
                height: $scrollContainer.height()
            },
            // Position of the trigger is relative to the scroll container
            trigger: {
                top: triggerOffset.top - scrollContainerOffset.top,
                left: triggerOffset.left - scrollContainerOffset.left,
                width: triggerBBox ? triggerBBox.width : trigger.outerWidth(),
                height: triggerBBox ? triggerBBox.height : trigger.outerHeight()
            },
            dialog: {
                width: popup.width(),
                height: popup.height(),
                offset: {
                    top: offsetY,
                    left: offsetX
                }
            },
            arrow: {
                height: popup.find('.arrow').outerHeight(),
                offset: {
                    top: arrowOffsetY,
                    left: arrowOffsetX
                }
            }
        };
    }

    function calculateWestPositions(popup, targetPosition, mousePosition, opts) {
        var dimensions = getDimensions(popup, targetPosition, mousePosition, opts);
        var screenPadding = dimensions.screenPadding;
        var win = dimensions.window;
        var trigger = dimensions.trigger;
        var dialog = dimensions.dialog;
        var arrow = dimensions.arrow;
        var scrollContainer = dimensions.scrollContainer;

        var triggerScrollOffset = {
            top: trigger.top - win.scrollTop,
            left: trigger.left - win.scrollLeft
        };

        // Halves - because the browser doesn't do sub-pixel positioning, we need to consistently floor
        // all decimal values or you can get 1px jumps in arrow positioning when the dialog's height changes.
        var halfTriggerHeight = Math.floor(trigger.height / 2);
        var halfPopupHeight = Math.floor(dialog.height / 2);
        var halfArrowHeight = Math.floor(arrow.height / 2);

        // Figure out where to position the dialog, preferring the right (gravity: 'w').
        var spaceOnLeft = triggerScrollOffset.left - dialog.offset.left - screenPadding;

        // This implementation may not be suitable for horizontally scrolling containers
        var spaceOnRight = scrollContainer.width - triggerScrollOffset.left - trigger.width - dialog.offset.left - screenPadding;

        var enoughSpaceOnLeft = spaceOnLeft >= dialog.width;
        var enoughSpaceOnRight = spaceOnRight >= dialog.width;
        var gravity = !enoughSpaceOnRight && enoughSpaceOnLeft ? 'e' : 'w';

        // Screen padding needs to be adjusted if the arrow would extend into it
        var arrowScreenTop = triggerScrollOffset.top + halfTriggerHeight - halfArrowHeight;
        var arrowScreenBottom = win.height - arrowScreenTop - arrow.height;
        screenPadding = Math.min(screenPadding, arrowScreenTop - dimensions.arrowMargin);
        screenPadding = Math.min(screenPadding, arrowScreenBottom - dimensions.arrowMargin);

        // Figure out if the dialog needs to be adjusted up or down to fit on the screen
        var middleOfTrigger = triggerScrollOffset.top + halfTriggerHeight;
        var spaceAboveMiddleOfTrigger = Math.max(middleOfTrigger - screenPadding, 0);
        var spaceBelowMiddleOfTrigger = Math.max(win.height - middleOfTrigger - screenPadding, 0);

        var isOverflowingAbove = halfPopupHeight - dialog.offset.top > spaceAboveMiddleOfTrigger;
        var isOverflowingBelow = halfPopupHeight + dialog.offset.top > spaceBelowMiddleOfTrigger;

        var popupCss;
        var arrowCss;
        if (isOverflowingAbove) {
            popupCss = {
                top: win.scrollTop + screenPadding,
                left: gravity === 'w' ?
                    trigger.left + trigger.width + dialog.offset.left :
                    trigger.left - dialog.width - dialog.offset.left
            };
            arrowCss = {
                top: (trigger.top + halfTriggerHeight) - (popupCss.top + halfArrowHeight)
            };
        } else if (isOverflowingBelow) {
            popupCss = {
                top: win.scrollTop + win.height - dialog.height - screenPadding,
                left: gravity === 'w' ?
                    trigger.left + trigger.width + dialog.offset.left :
                    trigger.left - dialog.width - dialog.offset.left
            };
            arrowCss = {
                top: (trigger.top + halfTriggerHeight) - (popupCss.top + halfArrowHeight)
            };
        } else {
            popupCss = {
                top: trigger.top + halfTriggerHeight - halfPopupHeight + dialog.offset.top,
                left: gravity === 'w' ?
                    trigger.left + trigger.width + dialog.offset.left :
                    trigger.left - dialog.width - dialog.offset.left
            };
            arrowCss = {
                top: halfPopupHeight - halfArrowHeight + arrow.offset.top
            };
        }

        return {
            gravity: gravity,
            popupCss: popupCss,
            arrowCss: arrowCss
        };
    }

    function calculateNorthSouthPositions(popup, targetPosition, mousePosition, opts) {
        var offsetX = AJS.$.isFunction(opts.offsetX) ? opts.offsetX(popup, targetPosition, mousePosition, opts) : opts.offsetX;
        var offsetY = AJS.$.isFunction(opts.offsetY) ? opts.offsetY(popup, targetPosition, mousePosition, opts) : opts.offsetY;
        var arrowOffsetX = AJS.$.isFunction(opts.arrowOffsetX) ? opts.arrowOffsetX(popup, targetPosition, mousePosition, opts) : opts.arrowOffsetX;
        var arrowOffsetY = AJS.$.isFunction(opts.arrowOffsetY) ? opts.arrowOffsetY(popup, targetPosition, mousePosition, opts) : opts.arrowOffsetY;

        var viewportDimensions = dimensionsOf(window);
        var targetDimensions = dimensionsOf(targetPosition.target);
        var popupDimensions = dimensionsOf(popup);
        var arrowDimensions = dimensionsOf(popup.find(".aui-inline-dialog-arrow"));

        var middleOfTrigger = targetDimensions.left + targetDimensions.width/2; //The absolute x position of the middle of the Trigger
        var bottomOfViewablePage = (window.pageYOffset || document.documentElement.scrollTop) + viewportDimensions.height;
        var SCREEN_PADDING = 10; //determines how close to the edge the dialog needs to be before it is considered offscreen

        // Set popup's position (within the viewport)
        popupDimensions.top = targetDimensions.top + targetDimensions.height + ~~offsetY;
        popupDimensions.left = targetDimensions.left + ~~offsetX;

        // Calculate if the popup would render off the side of the viewport
        var diff = viewportDimensions.width - (popupDimensions.left + popupDimensions.width + SCREEN_PADDING);

        // Set arrow's position (within the popup)
        arrowDimensions.left = middleOfTrigger - popupDimensions.left + ~~arrowOffsetX;
        // TODO arrowDimensions.top should also use arrowOffsetY.
        arrowDimensions.top = -(arrowDimensions.height/2);

        // Check whether the popup should display above or below the trigger
        var enoughRoomAbove = targetDimensions.top > popupDimensions.height;
        var enoughRoomBelow = (popupDimensions.top + popupDimensions.height) < bottomOfViewablePage;
        var displayAbove = (!enoughRoomBelow && enoughRoomAbove) || (enoughRoomAbove && opts.gravity === 's');

        if (displayAbove) {
            popupDimensions.top = targetDimensions.top - popupDimensions.height - (arrowDimensions.height/2);
            arrowDimensions.top = popupDimensions.height;
        }

        // Check if the popup should show up relative to the mouse
        if(opts.isRelativeToMouse){
            if(diff < 0){
                popupDimensions.right = SCREEN_PADDING;
                popupDimensions.left = "auto";
                // TODO Why doesn't arrowDimentions.left here use arrowOffsetX?
                arrowDimensions.left = mousePosition.x - (viewportDimensions.width - popupDimensions.width);
            }else{
                popupDimensions.left = mousePosition.x - 20;
                // TODO Why doesn't arrowDimentions.left here use arrowOffsetX?
                arrowDimensions.left = mousePosition.x - popupDimensions.left;
            }
        }else{
            if(diff < 0){
                popupDimensions.right = SCREEN_PADDING;
                popupDimensions.left = "auto";

                var popupRightEdge = viewportDimensions.width - popupDimensions.right;
                var popupLeftEdge = popupRightEdge - popupDimensions.width;

                //arrow's position must be relative to the popup's position and not of the screen.
                arrowDimensions.right = "auto";
                // TODO Why doesn't arrowDimentions.left here use arrowOffsetX?
                arrowDimensions.left = middleOfTrigger - popupLeftEdge - arrowDimensions.width/2;
            } else if(popupDimensions.width <= targetDimensions.width/2){
                // TODO Why doesn't arrowDimentions.left here use arrowOffsetX?
                arrowDimensions.left = popupDimensions.width/2;
                popupDimensions.left = middleOfTrigger - popupDimensions.width/2;
            }
        }
        return {
            gravity: displayAbove ? 's' : 'n',
            displayAbove: displayAbove,  // Replaced with gravity but remains for backward compatibility.
            popupCss: {
                left: popupDimensions.left,
                top: popupDimensions.top,
                right: popupDimensions.right
            },
            arrowCss: {
                left: arrowDimensions.left,
                top: arrowDimensions.top,
                right: arrowDimensions.right
            }
        };
    }


    AJS.InlineDialog.opts = {
        onTop: false,
        responseHandler: function(data, status, xhr) {
            //assume data is html
            return data;
        },
        closeOthers: true,
        isRelativeToMouse: false,
        addActiveClass: true, // if false, signifies that the triggers should not have the "active" class applied
        onHover: false,
        useLiveEvents: false,
        noBind: false,
        fadeTime: 100,
        persistent: false,
        hideDelay: 10000,
        showDelay: 0,
        width: 300,
        offsetX: 0,
        offsetY: 10,
        arrowOffsetX: 0,
        arrowOffsetY: 0,
        container: "body",
        cacheContent : true,
        displayShadow: true,
        autoWidth: false,
        gravity: 'n',
        closeOnTriggerClick: false,
        preHideCallback: function () { return true; },
        hideCallback: function(){}, // if defined, this method will be exected after the popup has been faded out.
        initCallback: function(){}, // A function called after the popup contents are loaded. `this` will be the popup jQuery object, and the first argument is the popup identifier.
        upfrontCallback: function() {}, // A function called before the popup contents are loaded. `this` will be the popup jQuery object, and the first argument is the popup identifier.
        /**
         * Returns an object with the following attributes:
         *      popupCss css attributes to apply on the popup element
         *      arrowCss css attributes to apply on the arrow element
         *
         * @param popup
         * @param targetPosition position of the target element
         * @param mousePosition current mouse position
         * @param opts options
         */
        calculatePositions: function (popup, targetPosition, mousePosition, opts) {
            opts = opts || {};
            var algorithm = opts.gravity === 'w'? calculateWestPositions : calculateNorthSouthPositions;
            return algorithm(popup, targetPosition, mousePosition, opts)
        },
        getArrowPath : function (positions) {
            if (positions.gravity === 's') {
                return "M0,8L8,16,16,8";
            } else {
                return "M0,8L8,0,16,8";
            }
        },
        getArrowAttributes: function () {
            return {
                fill : "#fff",
                stroke : "#ccc"
            };
        }
    };
})(AJS.$);

/**
 * Creates an object with methods for template support.
 *
 * See <a href="http://confluence.atlassian.com/display/AUI/AJS.template">CAC Documentation</a>.
 *
 * @constructor
 * @class template
 * @namespace AJS
 */
AJS.template = (function ($) {
    var tokenRegex = /\{([^\}]+)\}/g, // matches "{xxxxx}"
        objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches ".xxxxx" or "["xxxxx"]" to run over object properties
        apos = /([^\\])'/g, // matches not escaped apostrophes.
        
        // internal function
        // parses "{xxxxx}" and returns actual value from the given object that matches the expression
        replacer = function (all, key, obj, isHTML) {
            var res = obj;
            key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                name = name || quotedName;
                if (res) {
                    if (name + ":html" in res) {
                        res = res[name + ":html"];
                        isHTML = true;
                    } else if (name in res) {
                        res = res[name];
                    }
                    if (isFunc && typeof res == "function") {
                        res = res();
                    }
                }
            });
            // if not found restore original value
            if (res == null || res == obj) {
                res = all;
            }
            res = String(res);
            if (!isHTML) {
                res = T.escape(res);
            }
            return res;
        },
        /**
         * Replaces tokens in the template with corresponding values without HTML escaping
         * @method fillHtml
         * @param obj {Object} to populate the template with
         * @return {Object} the template object
         */
        fillHtml = function (obj) {
            this.template = this.template.replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj, true);
            });
            return this;
        },
        /**
         * Replaces tokens in the template with corresponding values with HTML escaping
         * @method fill
         * @param obj {Object} to populate the template with
         * @return {Object} the template object
         */
        fill = function (obj) {
            this.template = this.template.replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj);
            });
            return this;
        },
        /**
         * Returns the current templated string.
         * @method toString
         * @return {String} the current template
         */
        toString = function () {
            return this.template;
        };

    // internal function
    var T = function (s) {
        function res() {
            return res.template;
        }

        /**
         * The current templated string
         * @property template
         */
        res.template = String(s);
        res.toString = res.valueOf = toString;
        res.fill = fill;
        res.fillHtml = fillHtml;
        return res;
    },
    cache = {},
    count = [];

    // returns template taken form the script tag with given title. Type agnostic, but better put type="text/x-template"
    T.load = function (title) {
        title = String(title);
        if (!cache.hasOwnProperty(title)) {
            count.length >= 1e3 && delete cache[count.shift()]; // enforce maximum cache size
            count.push(title);
            cache[title] = $("script[title='" + title.replace(apos, "$1\\'") + "']")[0].text;
        }
        return this(cache[title]);
    };
    // escape HTML dangerous characters
    T.escape = AJS.escapeHtml;
    return T;
})(AJS.$);

(function () {

    var DEFAULT_FADEOUT_DURATION = 500;
    var DEFAULT_FADEOUT_DELAY = 5000;
    var FADEOUT_RESTORE_DURATION = 100;

    /**
     * Utility methods to display different message types to the user.
     * Usage:
     * <pre>
     * AJS.messages.info("#container", {
     *   title: "Info",
     *   body: "You can choose to have messages without Close functionality.",
     *   closeable: false,
     *   shadowed: false
     * });
     * </pre>
     * @class messages
     * @namespace AJS
     * @requires AJS.keyCode
     */
    AJS.messages = {
        setup: function () {
            AJS.messages.createMessage("generic");
            AJS.messages.createMessage("error");
            AJS.messages.createMessage("warning");
            AJS.messages.createMessage("info");
            AJS.messages.createMessage("success");
            AJS.messages.createMessage("hint");
            AJS.messages.makeCloseable();
            AJS.messages.makeFadeout();
        },
        makeCloseable: function (message) {
            AJS.$(message || "div.aui-message.closeable").each(function () {
                var $this = AJS.$(this),
                    $icon = AJS.$('<span class="aui-icon icon-close" role="button" tabindex="0"></span>').click(function () {
                        $this.closeMessage();
                    }).keypress(function (event) {
                        if ((event.which === AJS.keyCode.ENTER) || (event.which === AJS.keyCode.SPACE)) {
                            $this.closeMessage();
                            event.preventDefault(); // this is especially important when handling the space bar, as we don't want to page down
                        }
                    });
                $this.append($icon);
            });
        },
        makeFadeout: function (message, delay, duration) {
            delay = (typeof delay != "undefined") ? delay : DEFAULT_FADEOUT_DELAY;
            duration = (typeof duration != "undefined") ? duration : DEFAULT_FADEOUT_DURATION;

            AJS.$(message || "div.aui-message.fadeout").each(function () {
                var $this = AJS.$(this);

                //Store the component state to avoid collisions between animations
                var hasFocus = false;
                var isHover = false;

                //Small functions to keep the code easier to read and avoid code duplication
                function fadeOut(){
                    //Algorithm:
                    //1. Stop all running animations (first arg), including any fade animation and delay
                    //   Do not jump to the end of the animation (second arg). This prevents the message to abruptly
                    //   jump to opacity:0 or opacity:1
                    //2. Wait <delay> ms before starting the fadeout
                    //3. Start the fadeout with a duration of <duration> ms
                    //4. Close the message at the end of the animation
                    $this.stop(true,false).delay(delay).fadeOut(duration, function(){
                        $this.closeMessage();
                    });
                }
                function resetFadeOut(){
                    //Algorithm:
                    //1. Stop all running animations (first arg), including any fade animation and delay
                    //   Do not jump to the end of the animation (second arg). This prevents the message to abruptly
                    //   jump to opacity:0 or opacity:1
                    //2. Fast animation to opacity:1
                    $this.stop(true,false).fadeTo(FADEOUT_RESTORE_DURATION, 1);
                }
                function shouldStartFadeOut(){
                    return !hasFocus && !isHover;
                }

                //Attach handlers for user interactions (focus and hover)
                $this
                    .focusin(function(){
                        hasFocus = true;
                        resetFadeOut();
                    })
                    .focusout(function(){
                        hasFocus = false;
                        if (shouldStartFadeOut()) {
                            fadeOut();
                        }
                    })
                    .hover(
                        function(){  //should be called .hoverin(), but jQuery does not implement that method
                            isHover = true;
                            resetFadeOut();
                        },
                        function(){ //should be called .hoverout(), but jQuery does not implement that method
                            isHover = false;
                            if (shouldStartFadeOut()) {
                                fadeOut();
                            }
                        }
                    );

                //Initial animation
                fadeOut();
            });
        },
        template: '<div class="aui-message {type} {closeable} {shadowed} {fadeout}"><p class="title"><strong>{title}</strong></p>{body}<!-- .aui-message --></div>',
        createMessage: function (type) {
            AJS.messages[type] = function (context, obj) {
                var template = this.template,
                    $message,
                    insertWhere;

                if (!obj) {
                    obj = context;
                    context = "#aui-message-bar";
                }

                // Set up our template options
                obj.closeable = (obj.closeable !== false);
                // shadowed no longer does anything but left in so it doesn't break
                obj.shadowed = (obj.shadowed !== false);

                // Append the message using template
                $message = AJS.$(AJS.template(template).fill({
                    type: "aui-message-" + type + " " + type,
                    closeable: obj.closeable ? "closeable" : "",
                    shadowed: obj.shadowed ? "shadowed" : "",
                    fadeout: obj.fadeout ? "fadeout" : "",
                    title: obj.title || "",
                    "body:html": obj.body || ""
                }).toString());
                
                // Add ID if supplied
                if (obj.id) {
                    if ( /[#\'\"\.\s]/g.test(obj.id) ) {
                        // reject IDs that don't comply with style guide (ie. they'll break stuff)
                        AJS.log("AJS.Messages error: ID rejected, must not include spaces, hashes, dots or quotes.");
                    } else {
                        $message.attr('id', obj.id);
                    }
                }

                // insertion option
                insertWhere = obj.insert || "append";

                // insert according to option or default
                if ( insertWhere === "prepend" ) {
                    $message.prependTo(context);
                } else {
                    $message.appendTo(context);
                }

                // Attach the optional extra behaviours
                obj.closeable && AJS.messages.makeCloseable($message);
                obj.fadeout && AJS.messages.makeFadeout($message, obj.delay, obj.duration);
                
                return $message;
            };
        }
    };

    AJS.$.fn.closeMessage = function () {
        var $message = AJS.$(this);
        if ($message.hasClass("aui-message", "closeable")) {
            $message.stop(true); //Stop any running animation
            $message.trigger("messageClose", [this]).remove();  //messageClose event Deprecated as of 5.3
            AJS.$(document).trigger("aui-message-close", [this]);  //must trigger on document since the element has been removed
        }
    };

    AJS.$(function () {AJS.messages.setup();});
})();

(function ($){

    'use strict';

    var REGEX = /#.*/;
    var ACTIVE_TAB = "active-tab";
    var ACTIVE_PANE = "active-pane";
    var ARIA_SELECTED = "aria-selected";
    var ARIA_HIDDEN = "aria-hidden";
    var DATA_TABS_PERSIST = "data-aui-persist";
    var STORAGE_PREFIX = "_internal-aui-tabs-";
    var RESPONSIVE_OPT_IN_SELECTOR = ".aui-tabs.horizontal-tabs[data-aui-responsive]:not([data-aui-responsive='false'])";

    function enhanceTabLink() {
        var thisLink = $(this);
        AJS._addID(thisLink); // ensure there's an id for later
        thisLink.attr("role","tab");
        var targetPane = thisLink.attr("href"); // remember href includes # for selector
        $(targetPane).attr("aria-labelledby", thisLink.attr("id"));

        if (thisLink.parent().hasClass(ACTIVE_TAB)) {
            thisLink.attr(ARIA_SELECTED,"true");
        } else {
            thisLink.attr(ARIA_SELECTED,"false");
        }
    }

    var ResponsiveAdapter = {

        totalTabsWidth: function($visibleTabs, $dropdown) {
            var totalVisibleTabsWidth = this.totalVisibleTabWidth($visibleTabs);
            var totalDropdownTabsWidth = 0;
            $dropdown.find('li').each(function(index, tab){
                totalDropdownTabsWidth += parseInt(tab.getAttribute('data-aui-tab-width'));
            });

            return totalVisibleTabsWidth + totalDropdownTabsWidth;
        },

        totalVisibleTabWidth: function($tabs) {
            var totalWidth = 0;
            $tabs.each(function(index, tab) {
                totalWidth += $(tab).outerWidth();
            });
            return totalWidth;
        },

        removeResponsiveDropdown: function($dropdown, $dropdownTriggerTab) {
            $dropdown.remove();
            $dropdownTriggerTab.remove();
        },

        createResponsiveDropdownTrigger: function($tabsMenu, id) {
            var triggerMarkup = '<li class="menu-item aui-tabs-responsive-trigger-item">' +
                '<a class="aui-dropdown2-trigger aui-tabs-responsive-trigger" id="aui-tabs-responsive-trigger-' + id + '" aria-haspopup="true" aria-owns="aui-tabs-responsive-dropdown-' + id + '" href="aui-tabs-responsive-dropdown-' + id + '">...</a>' +
                '</li>';
            $tabsMenu.append(triggerMarkup);
            var $trigger = $tabsMenu.find('.aui-tabs-responsive-trigger-item');
            return $trigger;
        },

        createResponsiveDropdown: function($tabsContainer, id) {
            var dropdownMarkup = '<div class="aui-dropdown2 aui-style-default aui-tabs-responsive-dropdown" id="aui-tabs-responsive-dropdown-' + id +'">' +
                '<ul>' +
                '</ul>' +
                '</div>'
            $tabsContainer.append(dropdownMarkup);
            var $dropdown = $tabsContainer.find('#aui-tabs-responsive-dropdown-' + id);
            return $dropdown;
        },

        findNewVisibleTabs: function(tabs, parentWidth, dropdownTriggerTabWidth) {
            function hasMoreSpace(currentTotalTabWidth, dropdownTriggerTabWidth, parentWidth) {
                return currentTotalTabWidth + dropdownTriggerTabWidth <= parentWidth;
            }

            var currentTotalTabWidth = 0;
            for(var i = 0; hasMoreSpace(currentTotalTabWidth, dropdownTriggerTabWidth, parentWidth) && i < tabs.length; i++) {
                var $tab = $(tabs[i]);
                var tabWidth = $tab.outerWidth(true);
                currentTotalTabWidth += tabWidth;
            }
            //i should now be at the tab index after the last visible tab because of the loop so we minus 1 to get the new visible tabs
            return tabs.slice(0, i - 1);
        },

        processVisibleTabs: function(oldVisibleTabs, $tabsParent, $dropdownTriggerTab) {
            var dropdownId = $dropdownTriggerTab.find('a').attr('aria-owns');
            var $dropdown = $('#' + dropdownId);
            var newVisibleTabs = this.findNewVisibleTabs(oldVisibleTabs, $tabsParent.outerWidth(), $dropdownTriggerTab.parent().outerWidth(true));
            var lastTabIndex = newVisibleTabs.length - 1;

            for(var j = oldVisibleTabs.length - 1; j >= lastTabIndex;  j--) {
                var $tab = $(oldVisibleTabs[j]);
                this.moveTabToResponsiveDropdown($tab, $dropdown, $dropdownTriggerTab);
            }

            return $(newVisibleTabs);
        },

        moveTabToResponsiveDropdown: function($tab, $dropdown, $dropdownTriggerTab) {
            var $tabLink = $tab.find('a');
            $tab.attr('data-aui-tab-width', $tab.outerWidth(true));
            $tabLink.addClass('aui-dropdown2-radio aui-tabs-responsive-item');
            if($tab.hasClass('active-tab')) {
                $tabLink.addClass('aui-dropdown2-checked');
                $dropdownTriggerTab.addClass('active-tab');
            }
            $dropdown.find('ul').prepend($tab);
        },

        processInvisibleTabs: function(tabsInDropdown, remainingSpace, $dropdownTriggerTab) {

            for(var i = 0; hasMoreSpace(remainingSpace) && i < tabsInDropdown.length; i++) {
                var $tab = $(tabsInDropdown[i]);
                var tabInDropdownWidth = parseInt($tab.attr('data-aui-tab-width'), 10);
                var shouldMoveTabOut = tabInDropdownWidth < remainingSpace;

                if(shouldMoveTabOut) {
                    this.moveTabOutOfDropdown($tab, $dropdownTriggerTab);
                }

                remainingSpace -= tabInDropdownWidth;
            }

            function hasMoreSpace(remainingSpace) {
                return remainingSpace > 0;
            }

        },
        moveTabOutOfDropdown: function($tab, $dropdownTriggerTab) {
            var isTabInDropdownActive = $tab.find('a').hasClass('aui-dropdown2-checked');
            if(isTabInDropdownActive){
                $tab.addClass('active-tab');
                $dropdownTriggerTab.removeClass('active-tab');
            };
            $tab.children('a').removeClass('aui-dropdown2-radio aui-tabs-responsive-item aui-dropdown2-checked');

            $dropdownTriggerTab.before($tab);
        }
    }


    function calculateResponsiveTabs(tabsContainer, index) {
        //this function is run by jquery .each() where 'this' is the current tabs container
        var $tabsContainer = $(tabsContainer);
        var $tabsParent = $tabsContainer.parent();
        var $tabsMenu = $tabsContainer.find('.tabs-menu').first();
        var $visibleTabs = $tabsMenu.find('li:not(.aui-tabs-responsive-trigger-item)');
        var $dropdownTriggerTab = $tabsMenu.find('.aui-tabs-responsive-trigger').parent();
        var $dropdownTrigger = $dropdownTriggerTab.find('a');
        var dropdownId =  $dropdownTrigger.attr('aria-owns');
        var $dropdown = $(document).find('#' + dropdownId).attr('aria-checked', false)

        var isResponsive = $dropdown.length > 0;
        var totalTabsWidth = ResponsiveAdapter.totalTabsWidth($visibleTabs, $dropdown);
        var needsResponsive = totalTabsWidth > $tabsParent.outerWidth();

        if(!isResponsive && needsResponsive) {
            $dropdownTriggerTab = ResponsiveAdapter.createResponsiveDropdownTrigger($tabsMenu, index);
            $dropdown = ResponsiveAdapter.createResponsiveDropdown($tabsContainer, index);
        }

        //reset id's in case tabs have changed DOM order
        $dropdownTrigger.attr('aria-owns', 'aui-tabs-responsive-dropdown-' + index);
        $dropdownTrigger.attr('id', 'aui-tabs-responsive-trigger-' + index);
        $dropdownTrigger.attr('href', 'aui-tabs-responsive-trigger-' + index);
        $dropdown.attr('id', 'aui-tabs-responsive-dropdown-' + index);

        if(needsResponsive) {
            var $newVisibleTabs = ResponsiveAdapter.processVisibleTabs($visibleTabs.toArray(), $tabsParent, $dropdownTriggerTab);
            var visibleTabWidth = ResponsiveAdapter.totalVisibleTabWidth($newVisibleTabs);
            var remainingSpace = $tabsParent.outerWidth() - visibleTabWidth  - $dropdownTriggerTab.outerWidth(true);
            var hasSpace = remainingSpace > 0;
            if(hasSpace) {
                var $tabsInDropdown = $dropdown.find('li');
                ResponsiveAdapter.processInvisibleTabs($tabsInDropdown.toArray(), remainingSpace, $dropdownTriggerTab);
            }
            $dropdown.on("click", "a", handleTabClick);
        }

        if(isResponsive && !needsResponsive) {
            $dropdown.find('li').each(function(){
                ResponsiveAdapter.moveTabOutOfDropdown($(this), $dropdownTriggerTab);
            });
            ResponsiveAdapter.removeResponsiveDropdown($dropdown, $dropdownTriggerTab);
        }
    }

    function switchToTab($tab) {
        //only switch panes if the click target wasn't the responsive trigger
        if(!$tab.hasClass('aui-tabs-responsive-trigger')) {
            var $pane = $($tab.attr("href").match(REGEX)[0]);
            $pane.addClass(ACTIVE_PANE).attr(ARIA_HIDDEN,"false")
                .siblings(".tabs-pane").removeClass(ACTIVE_PANE).attr(ARIA_HIDDEN,"true");
            //only clear the dropdown checked states if click was outside the dropdown
            var $dropdownTriggerTab = $tab.parents('.aui-tabs').find('.aui-tabs-responsive-trigger-item a');
            var dropdownId = $dropdownTriggerTab.attr('aria-owns');
            var $dropdown = $(document).find('#' + dropdownId);
            $dropdown.find('li a').attr('aria-checked', false).removeClass('checked aui-dropdown2-checked');
            $dropdown.find('li').removeClass('active-tab');
        }
        $tab.parent("li.menu-item").addClass(ACTIVE_TAB)
            .siblings(".menu-item").removeClass(ACTIVE_TAB);
        if($tab.hasClass('aui-tabs-responsive-item')) {
            var $visibleTabs = $pane.parent('.aui-tabs').find('li.menu-item:not(.aui-tabs-responsive-trigger-item)');
            $visibleTabs.removeClass(ACTIVE_TAB);
            $visibleTabs.find('a').removeClass("checked").removeAttr("aria-checked");
        }

        $tab.closest(".tabs-menu").find("a").attr(ARIA_SELECTED,"false");
        $tab.attr(ARIA_SELECTED,"true");
        $tab.trigger("tabSelect", {
            tab: $tab,
            pane: $pane
        });
    }

    function isPersistentTabGroup($tabGroup) {
        // Tab group persistent attribute exists and is not false
        return $tabGroup.attr(DATA_TABS_PERSIST) !== undefined && $tabGroup.attr(DATA_TABS_PERSIST) !== "false";
    }

    function createPersistentKey($tabGroup) {
        var tabGroupId = $tabGroup.attr("id");
        var value = $tabGroup.attr(DATA_TABS_PERSIST);

        return STORAGE_PREFIX + (tabGroupId ? tabGroupId : "") + (value && value !== "true" ? "-" + value : "");
    }

    function updateTabsFromLocalStorage($tabGroups) {
        for (var i=0, ii = $tabGroups.length; i < ii; i++) {
            var $tabGroup = $tabGroups.eq(i);
            if (isPersistentTabGroup($tabGroup)) {
                var tabGroupId = $tabGroup.attr("id");
                if (tabGroupId) {
                    var persistentTabId = window.localStorage.getItem(createPersistentKey($tabGroup));
                    if (persistentTabId) {
                        var $tabmatch = $tabGroup.find("#" + persistentTabId);

                        if ($tabmatch.length) {
                            switchToTab($tabmatch);
                        }
                    }
                } else {
                    AJS.warn("A tab group must specify an id attribute if it specifies data-aui-persist");
                }
            }
        }
    }

    function updateLocalStorageEntry($tab) {
        var $tabGroup = $tab.closest(".aui-tabs");

        var tabGroupId = $tabGroup.attr("id");
        if (tabGroupId){
            var tabId = $tab.attr("id");
            if (tabId) {
                window.localStorage.setItem(createPersistentKey($tabGroup),tabId);
            }
        } else {
            AJS.warn("A tab group must specify an id attribute if it specifies data-aui-persist");
        }
    }

    function handleTabClick(e) {
        AJS.tabs.change($(this), e);
        e && e.preventDefault();
    }

    AJS.tabs = {
        setup: function () {
            var $allTabs = $(".aui-tabs:not(.aui-tabs-disabled)");
            var allResponsiveTabs = $(RESPONSIVE_OPT_IN_SELECTOR).toArray();

            responsiveResizeHandler(allResponsiveTabs);

            function responsiveResizeHandler(tabs) {
                for(var i in tabs) {
                    calculateResponsiveTabs(tabs[i], i);
                }
            }

            var debouncedResponsiveResizeHandler = AJS.debounce(responsiveResizeHandler, 200);
            $(window).resize(function(){
                debouncedResponsiveResizeHandler(allResponsiveTabs);
            });

            // Non-menu ARIA setup
            $allTabs.attr("role","application");
            $allTabs.find(".tabs-pane").each( function() {
                var thisPane = $(this);
                thisPane.attr("role","tabpanel");
                if (thisPane.hasClass(ACTIVE_PANE)) {
                    thisPane.attr(ARIA_HIDDEN,"false");
                } else {
                    thisPane.attr(ARIA_HIDDEN,"true");
                }
            });

            // Menu setup
            for (var i=0, ii = $allTabs.length; i < ii; i++) {
                var $tab = $allTabs.eq(i);
                if (!$tab.data("aui-tab-events-bound")) {
                    var $tabMenu = $tab.children("ul.tabs-menu");

                    // ARIA setup
                    $tabMenu.attr("role","tablist");
                    $tabMenu.children("li").attr("role","presentation"); // ignore the LIs so tab count is announced correctly
                    $tabMenu.find("> .menu-item a").each(enhanceTabLink);

                    // Set up click event for tabs
                    $tabMenu.delegate("a", "click", handleTabClick);
                    $tab.data("aui-tab-events-bound", true);
                }
            }

            // Check for persistent tabs
            if (window.localStorage) {
                updateTabsFromLocalStorage($allTabs);
            }

            // Vertical tab truncation setup (adds title if clipped)
            $(".aui-tabs.vertical-tabs").find("a").each(function() {
                var thisTab = $(this);
                // don't override existing titles
                if ( !thisTab.attr("title") ) {
                    var strong = thisTab.children("strong:first");
                    // if text has been truncated, add title
                    if ( AJS.isClipped(strong) ) {
                        thisTab.attr("title", thisTab.text());
                    }
                }
            });
        },
        change: function ($a, e) {
            switchToTab($a);

            var $tabGroup = $a.closest(".aui-tabs");
            if (window.localStorage && isPersistentTabGroup($tabGroup)) {
                updateLocalStorageEntry($a);
            }
        }
    };
    $(AJS.tabs.setup);
})(AJS.$);

/**
* jQuery AOP - jQuery plugin to add features of aspect-oriented programming (AOP) to jQuery.
* http://jquery-aop.googlecode.com/
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Version: 1.3
*
* Cross-frame type detection based on Daniel Steigerwald's code (http://daniel.steigerwald.cz)
* http://gist.github.com/204554
*
*/

(function() {

	var _after			= 1;
	var _afterThrow		= 2;
	var _afterFinally	= 3;
	var _before			= 4;
	var _around			= 5;
	var _intro			= 6;
	var _regexEnabled = true;
	var _arguments = 'arguments';
	var _undef = 'undefined';

	var getType = (function() {

		var toString = Object.prototype.toString,
			toStrings = {},
			nodeTypes = { 1: 'element', 3: 'textnode', 9: 'document', 11: 'fragment' },
			types = 'Arguments Array Boolean Date Document Element Error Fragment Function NodeList Null Number Object RegExp String TextNode Undefined Window'.split(' ');

		for (var i = types.length; i--; ) {
			var type = types[i], constructor = window[type];
			if (constructor) {
				try { toStrings[toString.call(new constructor)] = type.toLowerCase(); }
				catch (e) { }
			}
		}

		return function(item) {
			return item == null && (item === undefined ? _undef : 'null') ||
				item.nodeType && nodeTypes[item.nodeType] ||
				typeof item.length == 'number' && (
					item.callee && _arguments ||
					item.alert && 'window' ||
					item.item && 'nodelist') ||
				toStrings[toString.call(item)];
		};

	})();

	var isFunc = function(obj) { return getType(obj) == 'function'; };

	/**
	 * Private weaving function.
	 */
	var weaveOne = function(source, method, advice) {

		var old = source[method];

		// Work-around IE6/7 behavior on some native method that return object instances
		if (advice.type != _intro && !isFunc(old)) {
			var oldObject = old;
			old = function() {
				var code = arguments.length > 0 ? _arguments + '[0]' : '';

				for (var i=1;i<arguments.length;i++) {
					code += ',' + _arguments + '[' + i + ']';
				}

				return eval('oldObject(' + code + ');');
			};
		}

		var aspect;
		if (advice.type == _after || advice.type == _afterThrow || advice.type == _afterFinally)
			aspect = function() {
				var returnValue, exceptionThrown = null;

				try {
					returnValue = old.apply(this, arguments);
				} catch (e) {
					exceptionThrown = e;
				}

				if (advice.type == _after)
					if (exceptionThrown == null)
						returnValue = advice.value.apply(this, [returnValue, method]);
					else
						throw exceptionThrown;
				else if (advice.type == _afterThrow && exceptionThrown != null)
					returnValue = advice.value.apply(this, [exceptionThrown, method]);
				else if (advice.type == _afterFinally)
					returnValue = advice.value.apply(this, [returnValue, exceptionThrown, method]);

				return returnValue;
			};
		else if (advice.type == _before)
			aspect = function() {
				advice.value.apply(this, [arguments, method]);
				return old.apply(this, arguments);
			};
		else if (advice.type == _intro)
			aspect = function() {
				return advice.value.apply(this, arguments);
			};
		else if (advice.type == _around) {
			aspect = function() {
				var invocation = { object: this, args: Array.prototype.slice.call(arguments) };
				return advice.value.apply(invocation.object, [{ arguments: invocation.args, method: method, proceed :
					function() {
						return old.apply(invocation.object, invocation.args);
					}
				}] );
			};
		}

		aspect.unweave = function() {
			source[method] = old;
			pointcut = source = aspect = old = null;
		};

		source[method] = aspect;

		return aspect;

	};

	/**
	 * Private method search
	 */
	var search = function(source, pointcut, advice) {

		var methods = [];

		for (var method in source) {

			var item = null;

			// Ignore exceptions during method retrival
			try {
				item = source[method];
			}
			catch (e) { }

			if (item != null && method.match(pointcut.method) && isFunc(item))
				methods[methods.length] = { source: source, method: method, advice: advice };

		}

		return methods;
	};

	/**
	 * Private weaver and pointcut parser.
	 */
	var weave = function(pointcut, advice) {

		var source = typeof(pointcut.target.prototype) != _undef ? pointcut.target.prototype : pointcut.target;
		var advices = [];

		// If it's not an introduction and no method was found, try with regex...
		if (advice.type != _intro && typeof(source[pointcut.method]) == _undef) {

			// First try directly on target
			var methods = search(pointcut.target, pointcut, advice);

			// No method found, re-try directly on prototype
			if (methods.length == 0)
				methods = search(source, pointcut, advice);

			for (var i in methods)
				advices[advices.length] = weaveOne(methods[i].source, methods[i].method, methods[i].advice);

		}
		else
		{
			// Return as an array of one element
			advices[0] = weaveOne(source, pointcut.method, advice);
		}

		return _regexEnabled ? advices : advices[0];

	};

	jQuery.aop =
	{
		/**
		 * Creates an advice after the defined point-cut. The advice will be executed after the point-cut method
		 * has completed execution successfully, and will receive one parameter with the result of the execution.
		 * This function returns an array of weaved aspects (Function).
		 *
		 * @example jQuery.aop.after( {target: window, method: 'MyGlobalMethod'}, function(result) {
		 *                alert('Returned: ' + result);
		 *                return result;
		 *          } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.after( {target: String, method: 'indexOf'}, function(index) {
		 *                alert('Result found at: ' + index + ' on:' + this);
		 *                return index;
		 *          } );
		 * @result Array<Function>
		 *
		 * @name after
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved. Regex are supported, but not on built-in objects.
		 * @param Function advice Function containing the code that will get called after the execution of the point-cut. It receives one parameter
		 *                        with the result of the point-cut's execution. The function can choose to return this same value or a different one.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		after : function(pointcut, advice)
		{
			return weave( pointcut, { type: _after, value: advice } );
		},

		/**
		 * Creates an advice after the defined point-cut only for unhandled exceptions. The advice will be executed
		 * after the point-cut method only if the execution failed and an exception has been thrown. It will receive one
		 * parameter with the exception thrown by the point-cut method.
		 * This function returns an array of weaved aspects (Function).
		 *
		 * @example jQuery.aop.afterThrow( {target: String, method: 'indexOf'}, function(exception) {
		 *                alert('Unhandled exception: ' + exception);
		 *                return -1;
		 *          } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.afterThrow( {target: calculator, method: 'Calculate'}, function(exception) {
		 *                console.log('Unhandled exception: ' + exception);
		 *                throw exception;
		 *          } );
		 * @result Array<Function>
		 *
		 * @name afterThrow
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved. Regex are supported, but not on built-in objects.
		 * @param Function advice Function containing the code that will get called after the execution of the point-cut. It receives one parameter
		 *                        with the exception thrown by the point-cut method.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		afterThrow : function(pointcut, advice)
		{
			return weave( pointcut, { type: _afterThrow, value: advice } );
		},

		/**
		 * Creates an advice after the defined point-cut. The advice will be executed after the point-cut method
		 * regardless of its success or failure, and it will receive two parameters: one with the
		 * result of a successful execution or null, and another one with the exception thrown or null.
		 * This function returns an array of weaved aspects (Function).
		 *
		 * @example jQuery.aop.afterFinally( {target: window, method: 'MyGlobalMethod'}, function(result, exception) {
		 *                if (exception == null)
		 *                    return 'Returned: ' + result;
		 *                else
		 *                    return 'Unhandled exception: ' + exception;
		 *          } );
		 * @result Array<Function>
		 *
		 * @name afterFinally
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved. Regex are supported, but not on built-in objects.
		 * @param Function advice Function containing the code that will get called after the execution of the point-cut regardless of its success or failure.
		 *                        It receives two parameters, the first one with the result of a successful execution or null, and the second one with the
		 *                        exception or null.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		afterFinally : function(pointcut, advice)
		{
			return weave( pointcut, { type: _afterFinally, value: advice } );
		},


		/**
		 * Creates an advice before the defined point-cut. The advice will be executed before the point-cut method
		 * but cannot modify the behavior of the method, or prevent its execution.
		 * This function returns an array of weaved aspects (Function).
		 *
		 * @example jQuery.aop.before( {target: window, method: 'MyGlobalMethod'}, function() {
		 *                alert('About to execute MyGlobalMethod');
		 *          } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.before( {target: String, method: 'indexOf'}, function(index) {
		 *                alert('About to execute String.indexOf on: ' + this);
		 *          } );
		 * @result Array<Function>
		 *
		 * @name before
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved. Regex are supported, but not on built-in objects.
		 * @param Function advice Function containing the code that will get called before the execution of the point-cut.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		before : function(pointcut, advice)
		{
			return weave( pointcut, { type: _before, value: advice } );
		},


		/**
		 * Creates an advice 'around' the defined point-cut. This type of advice can control the point-cut method execution by calling
		 * the functions '.proceed()' on the 'invocation' object, and also, can modify the arguments collection before sending them to the function call.
		 * This function returns an array of weaved aspects (Function).
		 *
		 * @example jQuery.aop.around( {target: window, method: 'MyGlobalMethod'}, function(invocation) {
		 *                alert('# of Arguments: ' + invocation.arguments.length);
		 *                return invocation.proceed();
		 *          } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.around( {target: String, method: 'indexOf'}, function(invocation) {
		 *                alert('Searching: ' + invocation.arguments[0] + ' on: ' + this);
		 *                return invocation.proceed();
		 *          } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.around( {target: window, method: /Get(\d+)/}, function(invocation) {
		 *                alert('Executing ' + invocation.method);
		 *                return invocation.proceed();
		 *          } );
		 * @desc Matches all global methods starting with 'Get' and followed by a number.
		 * @result Array<Function>
		 *
		 *
		 * @name around
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved. Regex are supported, but not on built-in objects.
		 * @param Function advice Function containing the code that will get called around the execution of the point-cut. This advice will be called with one
		 *                        argument containing one function '.proceed()', the collection of arguments '.arguments', and the matched method name '.method'.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		around : function(pointcut, advice)
		{
			return weave( pointcut, { type: _around, value: advice } );
		},

		/**
		 * Creates an introduction on the defined point-cut. This type of advice replaces any existing methods with the same
		 * name. To restore them, just unweave it.
		 * This function returns an array with only one weaved aspect (Function).
		 *
		 * @example jQuery.aop.introduction( {target: window, method: 'MyGlobalMethod'}, function(result) {
		 *                alert('Returned: ' + result);
		 *          } );
		 * @result Array<Function>
		 *
		 * @example jQuery.aop.introduction( {target: String, method: 'log'}, function() {
		 *                alert('Console: ' + this);
		 *          } );
		 * @result Array<Function>
		 *
		 * @name introduction
		 * @param Map pointcut Definition of the point-cut to apply the advice. A point-cut is the definition of the object/s and method/s to be weaved.
		 * @option Object target Target object to be weaved.
		 * @option String method Name of the function to be weaved.
		 * @param Function advice Function containing the code that will be executed on the point-cut.
		 *
		 * @type Array<Function>
		 * @cat Plugins/General
		 */
		introduction : function(pointcut, advice)
		{
			return weave( pointcut, { type: _intro, value: advice } );
		},

		/**
		 * Configures global options.
		 *
		 * @name setup
		 * @param Map settings Configuration options.
		 * @option Boolean regexMatch Enables/disables regex matching of method names.
		 *
		 * @example jQuery.aop.setup( { regexMatch: false } );
		 * @desc Disable regex matching.
		 *
		 * @type Void
		 * @cat Plugins/General
		 */
		setup: function(settings)
		{
			_regexEnabled = settings.regexMatch;
		}
	};

})();
/**->
 * Displays a drop down, typically used for menus.
 * 
 * @class dropDown
 * @namespace AJS
 * @constructor
 * @param obj {jQuery Object|String|Array} object to populate the drop down from.
 * @param usroptions optional dropdown configuration. Supported properties are:
 * <li>alignment - "left" or "right" alignment of the drop down</li>
 * <li>escapeHandler - function to handle on escape key presses</li>
 * <li>activeClass - class name to be added to drop down items when 'active' ie. hover over</li>
 * <li>selectionHandler - function to handle when drop down items are selected on</li>
 * <li>hideHandler - function to handle when the drop down is hidden</li>
 * When an object of type Array is passed in, you can also configure:
 * <li>isHiddenByDefault - set to true if you would like to hide the drop down on initialisation</li>
 * <li>displayHandler - function to display text in the drop down</li>
 * <li>useDisabled - If set to true, the dropdown will not appear if a class of disabled is added to aui-dd-parent</li>
 * @return {Array} an array of jQuery objects, referring to the drop down container elements
 */
 
AJS.dropDown = function (obj, usroptions) {
    var dd = null,
        result = [],
        moving = false,
        $doc = AJS.$(document),
        options = {
            item: "li:has(a)",
            activeClass: "active",
            alignment: "right",
            displayHandler: function(obj) {return obj.name;},
            escapeHandler: function () {
                this.hide("escape");
                return false;
            },
            hideHandler: function() {},
            moveHandler: function(selection,dir) {},
            useDisabled: false 
        };

    AJS.$.extend(options, usroptions);
    options.alignment = {left:"left",right:"right"}[options.alignment.toLowerCase()]  || "left";

    if (obj && obj.jquery) { // if AJS.$
        dd = obj;
    } else if (typeof obj == "string") { // if AJS.$ selector
        dd = AJS.$(obj);
    } else if (obj && obj.constructor == Array) { // if JSON
        dd = AJS("div").addClass("aui-dropdown").toggleClass("hidden", !!options.isHiddenByDefault);
        for (var i = 0, ii = obj.length; i < ii; i++) {
            var ol = AJS("ol");
            for (var j = 0, jj = obj[i].length; j < jj; j++) {
                var li = AJS("li");
                var properties = obj[i][j];
                if (properties.href) {
                    li.append(AJS("a")
                        .html("<span>" + options.displayHandler(properties) + "</span>")
                        .attr({href:  properties.href})
                        .addClass(properties.className));

                    // deprecated - use the properties on the li, not the span
                    AJS.$.data(AJS.$("a > span", li)[0], "properties", properties);
                } else {
                    li.html(properties.html).addClass(properties.className);
                }
                if (properties.icon) {
                    li.prepend(AJS("img").attr("src", properties.icon));
                }
                if (properties.insideSpanIcon){
                    li.children("a").prepend(AJS("span").attr("class","icon"));
                }

                AJS.$.data(li[0], "properties", properties);
                ol.append(li);
            }
            if (i == ii - 1) {
                ol.addClass("last");
            }
            dd.append(ol);
        }
        AJS.$("body").append(dd);
    } else {
        throw new Error("AJS.dropDown function was called with illegal parameter. Should be AJS.$ object, AJS.$ selector or array.");
    }

    var moveDown = function() {
        move(+1);
    };

     var moveUp = function() {
        move(-1);
    };

    var move = function(dir) {
        var trigger = !moving,
            cdd = AJS.dropDown.current.$[0],
            links = AJS.dropDown.current.links,
            oldFocus = cdd.focused;
        moving = true;

        if (links.length === 0) {
            // Nothing to move focus to. Abort.
            return;
        }

        cdd.focused = (typeof oldFocus === "number") ? oldFocus : -1;

        if (!AJS.dropDown.current) {
            AJS.log("move - not current, aborting");
            return true;
        }

        cdd.focused += dir;

        // Resolve out of bounds values:
        if (cdd.focused < 0) {
            cdd.focused = links.length - 1;
        } else if (cdd.focused >= links.length) {
            cdd.focused = 0;
        }

        options.moveHandler(AJS.$(links[cdd.focused]), dir < 0 ? "up" : "down");
        if (trigger && links.length) {
            AJS.$(links[cdd.focused]).addClass(options.activeClass);
            moving = false;
        } else if(!links.length) {
            moving = false;
        }
    };

    var moveFocus = function (e) {
        if (!AJS.dropDown.current) {
            return true;
        }
        var c = e.which,
            cdd = AJS.dropDown.current.$[0],
            links = AJS.dropDown.current.links;

        AJS.dropDown.current.cleanActive();
        switch (c) {
            case 40: {
                moveDown();
                break;
            }
            case 38:{
                moveUp();
                break;
            }
            case 27:{
                return options.escapeHandler.call(AJS.dropDown.current, e);
            }
            case 13:{
                if (cdd.focused >= 0) {
                    if(!options.selectionHandler){
                        if(AJS.$(links[cdd.focused]).attr("nodeName")!='a'){
                            return AJS.$("a", links[cdd.focused]).trigger("focus");    //focus on the "a" within the parent item elements
                        } else {
                            return AJS.$(links[cdd.focused]).trigger("focus");     //focus on the "a"
                        }
                    } else {
                        return options.selectionHandler.call(AJS.dropDown.current, e, AJS.$(links[cdd.focused]));   //call the selection handler
                    }
                }
                return true;
            }
            default:{
                if (links.length) {
                    AJS.$(links[cdd.focused]).addClass(options.activeClass);
                }
                return true;
            }
        }

        e.stopPropagation();
        e.preventDefault();
        return false;
    };

    var hider = function (e) {
        if (!((e && e.which && (e.which == 3)) || (e && e.button && (e.button == 2)) || false)) { // right click check
            if (AJS.dropDown.current) {
                AJS.dropDown.current.hide("click");
            }
        }
    };
    var active = function (i) {
        return function () {
            if (!AJS.dropDown.current) {
                return;
            }
            AJS.dropDown.current.cleanFocus();
            this.originalClass = this.className;
            AJS.$(this).addClass(options.activeClass);
            AJS.dropDown.current.$[0].focused = i;
        };
    };

    var handleClickSelection = function (e) {
        if (e.button || e.metaKey || e.ctrlKey || e.shiftKey) {
            return true;
        }
        if (AJS.dropDown.current && options.selectionHandler) {
            options.selectionHandler.call(AJS.dropDown.current, e, AJS.$(this));
        }
    };

    var isEventsBound = function (el) {
        var bound = false;
        if (el.data("events")) {
            AJS.$.each(el.data("events"), function(i, handler){
                AJS.$.each(handler, function (type, handler) {
                    if (handleClickSelection === handler) {
                        bound = true;
                        return false;
                    }
                });
            });
        }
        return bound;
    };

    dd.each(function () {
        var cdd = this, $cdd = AJS.$(this), res = {};
        var methods = {
            reset: function () {
                res = AJS.$.extend(res, {
                    $: $cdd,
                    links: AJS.$(options.item || "li:has(a)", cdd),
                    cleanActive: function () {
                        if (cdd.focused + 1 && res.links.length) {
                            AJS.$(res.links[cdd.focused]).removeClass(options.activeClass);
                        }
                    },
                    cleanFocus: function () {
                        res.cleanActive();
                        cdd.focused = -1;
                    },
                    moveDown: moveDown,
                    moveUp: moveUp,
                    moveFocus: moveFocus,
                    getFocusIndex: function () {
                        return (typeof cdd.focused == "number") ? cdd.focused : -1;
                    }
                });
                res.links.each(function (i) {
                    var $this = AJS.$(this);
                    if (!isEventsBound($this)) {
                        $this.hover(active(i), res.cleanFocus);
                        $this.click(handleClickSelection);
                    }
                });
            },
            appear: function (dir) {
                if (dir) {
                    $cdd.removeClass("hidden");
                    //handle left or right alignment
                    $cdd.addClass("aui-dropdown-" + options.alignment);
                } else {
                    $cdd.addClass("hidden");
                }
            },
            fade: function (dir) {
                if (dir) {
                    $cdd.fadeIn("fast");
                } else {
                    $cdd.fadeOut("fast");
                }
            },
            scroll: function (dir) {
                if (dir) {
                    $cdd.slideDown("fast");
                } else {
                    $cdd.slideUp("fast");
                }
            }
        };

        res.reset = methods.reset;
        res.reset();

        /**
         * Uses Aspect Oriented Programming (AOP) to wrap a method around another method 
         * Allows control of the execution of the wrapped method.
         * specified method has returned @see AJS.$.aop
         * @method addControlProcess
         * @param {String} methodName - Name of a public method
         * @param {Function} callback - Function to be executed
         * @return {Array} weaved aspect
         */
        res.addControlProcess = function(method, process) {
            AJS.$.aop.around({target: this, method: method}, process);
        };

        /**
         * Uses Aspect Oriented Programming (AOP) to insert callback <em>after</em> the
         * specified method has returned @see AJS.$.aop
         * @method addCallback
         * @param {String} methodName - Name of a public method
         * @param {Function} callback - Function to be executed
         * @return {Array} weaved aspect
         */
        res.addCallback = function (method, callback) {
            return AJS.$.aop.after({target: this, method: method}, callback);
        };

        res.show = function (method) {
            if(options.useDisabled && this.$.closest('.aui-dd-parent').hasClass('disabled')) {
                return
            }

            this.alignment = options.alignment;
            hider();
            AJS.dropDown.current = this;
            this.method = method || this.method || "appear";
            
            this.timer = setTimeout(function () {
                $doc.click(hider);
            }, 0);

            $doc.keydown(moveFocus);

            if (options.firstSelected && this.links[0]) {
                active(0).call(this.links[0]);
            }

            AJS.$(cdd.offsetParent).css({zIndex: 2000});
            methods[this.method](true);

            AJS.$(document).trigger("showLayer", ["dropdown", AJS.dropDown.current]);
        };

        res.hide = function (causer) {
            this.method = this.method || "appear";
            AJS.$($cdd.get(0).offsetParent).css({zIndex: ""});
            this.cleanFocus();
            methods[this.method](false);
            $doc.unbind("click", hider).unbind("keydown", moveFocus);
            AJS.$(document).trigger("hideLayer", ["dropdown", AJS.dropDown.current]);
            AJS.dropDown.current = null;
            return causer;
        };

        res.addCallback("reset", function () {
           if (options.firstSelected && this.links[0]) {
               active(0).call(this.links[0]);
           }
        });

        if (!AJS.dropDown.iframes) {
            AJS.dropDown.iframes = [];
        }

        AJS.dropDown.createShims = function () {
            AJS.$("iframe").each(function (idx) {
               var iframe = this;
                if (!iframe.shim) {
                    iframe.shim = AJS.$("<div />")
                                     .addClass("shim hidden")
                                     .appendTo("body");
                    AJS.dropDown.iframes.push(iframe);
                }
            });
            return arguments.callee;
        }();

        res.addCallback("show", function() {
            AJS.$(AJS.dropDown.iframes).each(function() {
                var $this = AJS.$(this);
              
                if ($this.is(":visible")) {
                   var offset = $this.offset();
                   offset.height = $this.height();
                   offset.width = $this.width();
                   this.shim.css({
                       left: offset.left + "px",
                       top: offset.top + "px",
                       height: offset.height + "px",
                       width: offset.width + "px"
                   }).removeClass("hidden");
                }
            });
        });

        res.addCallback("hide", function () {
            AJS.$(AJS.dropDown.iframes).each(function(){
                this.shim.addClass("hidden");
            });
            options.hideHandler();
        });
        result.push(res);
    });
    return result;
};

/**
 * For the given item in the drop down get the value of the named additional property. If there is no
 * property with the specified name then null will be returned.
 *
 * @method getAdditionalPropertyValue
 * @namespace AJS.dropDown
 * @param item {Object} jQuery Object of the drop down item. An LI element is expected.
 * @param name {String} name of the property to retrieve
 */
AJS.dropDown.getAdditionalPropertyValue = function (item, name) {
    var el = item[0];
    if ( !el || (typeof el.tagName != "string") || el.tagName.toLowerCase() != "li" ) {
        // we are moving the location of the properties and want to deprecate the attachment to the span
        // but are unsure where and how its being called so for now we just log
        AJS.log("AJS.dropDown.getAdditionalPropertyValue : item passed in should be an LI element wrapped by jQuery");
    }
    var properties = AJS.$.data(el, "properties");
    return properties ? properties[name] : null;
};

/**
 * Only here for backwards compatibility
 * @method removeAllAdditionalProperties
 * @namespace AJS.dropDown
 * @deprecated Since 3.0
 */
AJS.dropDown.removeAllAdditionalProperties = function (item) {
};

 /**
  * Base dropdown control. Enables you to identify triggers that when clicked, display dropdown.
  *
  * @class Standard
  * @constructor
  * @namespace AJS.dropDown
  * @param {Object} usroptions
  * @return {Object
  */
 AJS.dropDown.Standard = function (usroptions) {

    var res = [], dropdownParents, options = {
        selector: ".aui-dd-parent",
        dropDown: ".aui-dropdown",
        trigger: ".aui-dd-trigger"
    };

     // extend defaults with user options
    AJS.$.extend(options, usroptions);

    var hookUpDropDown = function($trigger, $parent, $dropdown, ddcontrol) {
        // extend to control to have any additional properties/methods
        AJS.$.extend(ddcontrol, {trigger: $trigger});

        // flag it to prevent additional dd controls being applied
        $parent.addClass("dd-allocated");

        //hide dropdown if not already hidden
        $dropdown.addClass("hidden");

        //show the dropdown if isHiddenByDefault is set to false
        if (options.isHiddenByDefault == false) {
            ddcontrol.show();
        }

        ddcontrol.addCallback("show", function () {
            $parent.addClass("active");
        });
        
        ddcontrol.addCallback("hide", function () {
            $parent.removeClass("active");
        });
    };

    var handleEvent = function(event, $trigger, $dropdown, ddcontrol) {
        if (ddcontrol != AJS.dropDown.current) {
            $dropdown.css({top: $trigger.outerHeight()});
            ddcontrol.show();
            event.stopImmediatePropagation();
        }
        event.preventDefault();
    };

    if (options.useLiveEvents) {
        // cache arrays so that we don't have to recalculate the dropdowns. Since we can't store objects as keys in a map,
        // we have two arrays: keysCache stores keys of dropdown triggers; valuesCache stores a map of internally used objects
        var keysCache = [];
        var valuesCache = [];

        AJS.$(options.trigger).live("click", function (event) {
            var $trigger = AJS.$(this);
            var $parent, $dropdown, ddcontrol;

            // if we're cached, don't recalculate the dropdown and do all that funny shite.
            var index;
            if ((index = AJS.$.inArray(this, keysCache)) >= 0) {
                var val = valuesCache[index];
                $parent = val['parent'];
                $dropdown = val['dropdown'];
                ddcontrol = val['ddcontrol'];
            } else {
                $parent = $trigger.closest(options.selector);
                $dropdown = $parent.find(options.dropDown);
                // Sanity checking
                if ($dropdown.length === 0) {
                    return;
                }

                ddcontrol =  AJS.dropDown($dropdown, options)[0];
                // Sanity checking
                if (!ddcontrol) {
                    return;
                }

                // cache
                keysCache.push(this);
                val = {
                    parent : $parent,
                    dropdown : $dropdown,
                    ddcontrol : ddcontrol
                };

                hookUpDropDown($trigger, $parent, $dropdown, ddcontrol);

                valuesCache.push(val);
            }

            handleEvent(event, $trigger, $dropdown, ddcontrol);
        });
    } else {
          // handling for jQuery collections
        if (this instanceof AJS.$) {
            dropdownParents = this;
        // handling for selectors
        } else {
            dropdownParents = AJS.$(options.selector);
        }

        // a series of checks to ensure we are dealing with valid dropdowns
        dropdownParents = dropdownParents
                .not(".dd-allocated")
                .filter(":has(" + options.dropDown + ")")
                .filter(":has(" + options.trigger + ")");

        dropdownParents.each(function () {
            var
            $parent = AJS.$(this),
            $dropdown = AJS.$(options.dropDown, this),
            $trigger = AJS.$(options.trigger, this),
            ddcontrol = AJS.dropDown($dropdown, options)[0];

            // extend to control to have any additional properties/methods
            AJS.$.extend(ddcontrol, {trigger: $trigger});

            hookUpDropDown($trigger, $parent, $dropdown, ddcontrol);

            $trigger.click(function (e) {
                handleEvent(e, $trigger, $dropdown, ddcontrol);
            });

            // add control to the response
            res.push(ddcontrol);

        });
    }
    return res;
};


/**
 * A NewStandard dropdown, however, with the ability to populate its content's via ajax.
 *
 * @class Ajax
 * @constructor
 * @namespace AJS.dropDown
 * @param {Object} options
 * @return {Object} dropDown instance
 */
AJS.dropDown.Ajax = function (usroptions) {

    var dropdowns, options = {cache: true};

     // extend defaults with user options
    AJS.$.extend(options, usroptions || {});

    // we call with "this" in case we are called in the context of a jQuery collection
    dropdowns = AJS.dropDown.Standard.call(this, options);

    AJS.$(dropdowns).each(function () {

        var ddcontrol = this;

        AJS.$.extend(ddcontrol, {
            getAjaxOptions: function (opts) {
                var success = function (response) {
                    if (options.formatResults) {
                        response = options.formatResults(response);
                    }
                    if (options.cache) {
                        ddcontrol.cache.set(ddcontrol.getAjaxOptions(), response);
                    }
                    ddcontrol.refreshSuccess(response);
                };
                if (options.ajaxOptions) {


                    if (AJS.$.isFunction(options.ajaxOptions)) {
                        return AJS.$.extend(options.ajaxOptions.call(ddcontrol), {success: success});
                    } else {
                        return AJS.$.extend(options.ajaxOptions, {success: success});
                    }
                }
                return AJS.$.extend(opts, {success: success});
            },

            refreshSuccess: function (response) {
                this.$.html(response);
            },

            cache: function () {
                var c = {};
                return {
                    get: function (ajaxOptions) {
                        var data = ajaxOptions.data || "";
                        return c[(ajaxOptions.url + data).replace(/[\?\&]/gi,"")];
                    },
                    set: function (ajaxOptions, responseData) {
                        var data = ajaxOptions.data || "";
                        c[(ajaxOptions.url + data).replace(/[\?\&]/gi,"")] = responseData;
                    },
                    reset: function () {
                        c = {};
                    }
                };
            }(),

            show: function (superMethod) {
                return function (opts) {
                    if (options.cache && !!ddcontrol.cache.get(ddcontrol.getAjaxOptions())) {
                        ddcontrol.refreshSuccess(ddcontrol.cache.get(ddcontrol.getAjaxOptions()));
                        superMethod.call(ddcontrol);
                    } else {
                        AJS.$(AJS.$.ajax(ddcontrol.getAjaxOptions())).throbber({target: ddcontrol.$,
                            end: function () {
                                ddcontrol.reset();
                            }
                        });
                        superMethod.call(ddcontrol);
                        if (ddcontrol.iframeShim) {
                            ddcontrol.iframeShim.hide();
                        }
                    }
                };
            }(ddcontrol.show),

            resetCache: function () {
                ddcontrol.cache.reset();
            }
        });
        ddcontrol.addCallback("refreshSuccess", function () {
            ddcontrol.reset();
        });
    });
    return dropdowns;
};


AJS.$.fn.dropDown = function (type, options) {
    type = (type || "Standard").replace(/^([a-z])/, function (match) {
        return match.toUpperCase();
    });
    return AJS.dropDown[type].call(this, options);
};


/*
 * Modified by Atlassian to allow chaining of keys
 *
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){

    jQuery.hotkeys = {
        version: "0.8",

        specialKeys: {
            8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
            20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
            37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
            91 : "meta",
            96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
            104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
            112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
            120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll",
            188: ",", 190: ".", 191: "/", 224: "meta", 219: '[', 221: ']'
        },

        // These only work under Mac Gecko when using keypress (see http://unixpapa.com/js/key.html).
        keypressKeys: [ "<", ">", "?" ],

        shiftNums: {
            "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
            "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ":", "'": "\"", ",": "<",
            ".": ">",  "/": "?",  "\\": "|"
        }
    };

    jQuery.each(jQuery.hotkeys.keypressKeys, function (_, key) {
        jQuery.hotkeys.shiftNums[ key ] = key;
    });

    function TimedNumber(timer) {
        this.num = 0;
        this.timer = timer > 0 ? timer : false;
    }
    TimedNumber.prototype.val = function () {
        return this.num;
    };
    TimedNumber.prototype.inc = function () {
        if (this.timer) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(jQuery.proxy(TimedNumber.prototype.reset, this), this.timer);
        }
        this.num++;
    };
    TimedNumber.prototype.reset = function () {
        if (this.timer) {
            clearTimeout(this.timeout);
        }
        this.num = 0;
    };

    function keyHandler( handleObj ) {
        // Only care when a possible input has been specified
        if ( !(jQuery.isPlainObject(handleObj.data) || jQuery.isArray(handleObj.data) || typeof handleObj.data === "string") ) {
            return;
        }

        var origHandler = handleObj.handler,
            options = {
                timer: 700
            };

        (function (data) {
            if (typeof data === 'string') {
                options.combo = [ data ];
            } else if (jQuery.isArray(data)) {
                options.combo = data;
            } else {
                jQuery.extend(options, data);
            }
            options.combo = jQuery.map(options.combo, function (key) {
                return key.toLowerCase();
            });
        })(handleObj.data);

        handleObj.index = new TimedNumber(options.timer);
        handleObj.handler = function( event ) {
            // Don't fire in text-accepting inputs that we didn't directly bind to
            if (this !== event.target && (/textarea|select|input/i.test(event.target.nodeName))){
                return;
            }

            // Keypress represents characters, not special keys
            var special = event.type !== 'keypress' ? jQuery.hotkeys.specialKeys[ event.which ] : null,
                character = String.fromCharCode( event.which ).toLowerCase(),
                key, modif = "", possible = {};

            // check combinations (alt|ctrl|shift+anything)
            if ( event.altKey && special !== "alt" ) {
                modif += "alt+";
            }

            if ( event.ctrlKey && special !== "ctrl" ) {
                modif += "ctrl+";
            }

            // TODO: Need to make sure this works consistently across platforms
            if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
                modif += "meta+";
            }

            if ( event.shiftKey && special !== "shift" ) {
                modif += "shift+";
            }

            // Under Chrome and Safari, meta's keycode == '['s charcode
            // Even if they did type this key combo we could not use it because it is browser back in Chrome/Safari on OS X
            if (event.metaKey && character === '[') {
                character = null;
            }

            if (special) {
                possible[ modif + special ] = true;
            }
            if (character) {
                possible[ modif + character ] = true;
            }
            
            // "$" can be specified as "shift+4" or "$"
            if ( /shift+/.test(modif) ) {
                possible [ modif.replace('shift+', '') + jQuery.hotkeys.shiftNums[ (special || character) ] ] = true;
            }

            var index = handleObj.index,
                combo = options.combo;

            if ( pressed(combo[index.val()], possible) ) {
                if ( index.val() === combo.length - 1 ) {
                    index.reset();
                    return origHandler.apply(this, arguments);
                } else {
                    index.inc();
                }
            } else {
                index.reset();
                // For mutli-key combinations, we might have restarted the key sequence.
                if ( pressed(combo[0], possible) ) {
                    index.inc();
                }
            }
        };
    }

    function pressed(key, possible) {
        var keys = key.split(' ');
        for (var i = 0, len = keys.length; i < len; i++) {
            if ( possible[keys[i]] ) {
                return true;
            }
        }
        return false;
    }

    jQuery.each([ "keydown", "keyup", "keypress" ], function() {
        jQuery.event.special[ this ] = { add: keyHandler };
    });

})( jQuery );


/**
 * A collection of common controls
 *
 * @module Controls
 * @requires AJS, jQuery
 */

/**
 * Keyboard commands with syntactic sugar.
 *
 * <strong>Usage:</strong>
 * <pre>
 * AJS.whenIType("gh").or("gd").goTo("/secure/Dashboard.jspa");
 * AJS.whenIType("c").click("#create_link");
 * </pre>
 *
 * @class whenIType
 * @constuctor whenIType
 * @namespace AJS
 * @param keys - Key combinations, modifier keys are "+" deliminated. e.g "ctrl+b"
 */

(function(exports, $) {

    var isMac = navigator.platform.indexOf('Mac') !== -1;

    //see jquery.hotkeys.js for accepted names.
    var multiCharRegex = /^(backspace|tab|r(ight|eturn)|s(hift|pace|croll)|c(trl|apslock)|alt|pa(use|ge(up|down))|e(sc|nd)|home|left|up|d(el|own)|insert|f\d\d?|numlock|meta)/i;


    exports.whenIType = function (keys) {

        var boundKeyCombos = [],
            executor = $.Callbacks();

        function keypressHandler(e) {
            if (!AJS.popup.current  && executor) {
                executor.fire(e);
            }
        }
        function defaultPreventionHandler(e) {
            e.preventDefault();
        }

        // Bind an arbitrary set of keys by calling bindKeyCombo on each triggering key combo.
        // A string like "abc 123" means (a then b then c) OR (1 then 2 then 3). abc is one key combo, 123 is another.
        function bindKeys(keys) {
            var keyCombos = keys && keys.split ? $.trim(keys).split(' ') : [ keys ];

            keyCombos.forEach(function(keyCombo) {
                bindKeyCombo(keyCombo);
            });
        }

        function hasUnprintables(keysArr) {
            // a bit of a heuristic, but works for everything we have. Only the unprintable characters are represented with > 1-character names.
            var i = keysArr.length;
            while(i--) {
                if (keysArr[i].length > 1 && keysArr[i] !== 'space') {
                    return true;
                }
            }
            return false;
        }

        // bind a single key combo to this handler
        // A string like "abc 123" means (a then b then c) OR (1 then 2 then 3). abc is one key combo, 123 is another.
        function bindKeyCombo(keyCombo) {
            var keysArr = keyCombo instanceof Array ?
                      keyCombo :
                      keyComboArrayFromString(keyCombo.toString());

            var eventType = hasUnprintables(keysArr) ? 'keydown' : 'keypress';

            boundKeyCombos.push(keysArr);

            $(document).bind(eventType, keysArr, keypressHandler);

            // Override browser/plugins
            $(document).bind(eventType + ' keyup', keysArr, defaultPreventionHandler);
        }

        // parse out an array of (modifier+key) presses from a single string
        // e.g. "12ctrl+3" becomes [ "1", "2", "ctrl+3" ]
        function keyComboArrayFromString(keyString) {

            var keysArr = [],
                currModifiers = '',
                modifierMatch,
                multiCharMatch;

            while(keyString.length) {
                if (modifierMatch = keyString.match(/^(ctrl|meta|shift|alt)\+/i)) {
                    currModifiers += modifierMatch[0];
                    keyString = keyString.substring(modifierMatch[0].length);

                } else if(multiCharMatch = keyString.match(multiCharRegex)) {
                    keysArr.push(currModifiers + multiCharMatch[0]);
                    keyString = keyString.substring(multiCharMatch[0].length);
                    currModifiers = '';

                } else {
                    keysArr.push(currModifiers + keyString[0]);
                    keyString = keyString.substring(1);
                    currModifiers = '';
                }
            }

            return keysArr;
        }

        function addShortcutsToTitle(selector) {
            var elem = $(selector),
                title = elem.attr("title") || "",
                keyCombos = boundKeyCombos.slice();

            var shortcutInstructions = elem.data("kbShortcutAppended") || '';

            var isFirst = !shortcutInstructions;
            var originalTitle = isFirst? title : title.substring(0, title.length - shortcutInstructions.length);

            while(keyCombos.length) {
                shortcutInstructions = appendKeyComboInstructions(keyCombos.shift().slice(), shortcutInstructions, isFirst);
                isFirst = false;
            }

            if (isMac) {
                shortcutInstructions = shortcutInstructions
                    .replace(/Meta/ig, '\u2318') //Apple cmd key
                    .replace(/Shift/ig, '\u21E7'); //Apple Shift symbol
            }

            elem.attr("title", originalTitle + shortcutInstructions);
            elem.data("kbShortcutAppended", shortcutInstructions);
        }

        function removeShortcutsFromTitle(selector) {
            var elem = $(selector);
            var shortcuts = elem.data("kbShortcutAppended");

            if (!shortcuts) {
                return;
            }

            var title = elem.attr("title");
            elem.attr('title', title.replace(shortcuts, ''));
            elem.removeData("kbShortcutAppended");
        }

        //
        function appendKeyComboInstructions(keyCombo, title, isFirst) {
            if (isFirst) {
                title += " (" + AJS.I18n.getText("aui.keyboard.shortcut.type.x", keyCombo.shift());
            } else {
                title = title.replace(/\)$/, "");
                title += AJS.I18n.getText("aui.keyboard.shortcut.or.x", keyCombo.shift());
            }

            keyCombo.forEach(function(key) {
                title += " " + AJS.I18n.getText("aui.keyboard.shortcut.then.x", key);
            });
            title += ")";

            return title;
        }

        bindKeys(keys);

        return exports.whenIType.makeShortcut({
            executor : executor,
            bindKeys : bindKeys,
            addShortcutsToTitle : addShortcutsToTitle,
            removeShortcutsFromTitle : removeShortcutsFromTitle,
            keypressHandler : keypressHandler,
            defaultPreventionHandler : defaultPreventionHandler
        });
    };

    exports.whenIType.makeShortcut = function(options) {

        var executor = options.executor;
        var bindKeys = options.bindKeys;
        var addShortcutsToTitle = options.addShortcutsToTitle;
        var removeShortcutsFromTitle = options.removeShortcutsFromTitle;
        var keypressHandler = options.keypressHandler;
        var defaultPreventionHandler = options.defaultPreventionHandler;

        var selectorsWithTitlesModified = [];

        function makeMoveToFunction(getNewFocus) {
            return function (selector, options) {
                options = options || {};
                var focusedClass = options.focusedClass || "focused";
                var wrapAround = options.hasOwnProperty("wrapAround") ? options.wrapAround : true;
                var escToCancel = options.hasOwnProperty("escToCancel") ? options.escToCancel : true;

                executor.add(function () {

                    var $items = $(selector),
                        $focusedElem = $items.filter("." + focusedClass),
                        moveToOptions = $focusedElem.length === 0 ? undefined : { transition : true };

                    if (escToCancel) {
                        $(document).one("keydown", function (e) {
                            if (e.keyCode === AJS.keyCode.ESCAPE && $focusedElem) {
                                $focusedElem.removeClass(focusedClass);
                            }
                        });
                    }

                    if ($focusedElem.length) {
                        $focusedElem.removeClass(focusedClass);
                    }

                    $focusedElem = getNewFocus($focusedElem, $items, wrapAround);

                    if ($focusedElem && $focusedElem.length > 0) {
                        $focusedElem.addClass(focusedClass);
                        $focusedElem.moveTo(moveToOptions);
                        if ($focusedElem.is('a')) {
                            $focusedElem.focus();
                        } else {
                            $focusedElem.find("a:first").focus();
                        }
                    }
                });
                return this;
            };
        }

        return {

            /**
             * Scrolls to and adds <em>focused</em> class to the next item in the jQuery collection
             *
             * @method moveToNextItem
             * @param selector
             * @param options
             * @return {Object}
             */
            moveToNextItem: makeMoveToFunction(function($focusedElem, $items, wrapAround) {
                var index;

                if (wrapAround && $focusedElem.length === 0) {
                    return $items.eq(0);

                } else {
                    index = $.inArray($focusedElem.get(0), $items);
                    if (index < $items.length-1) {
                        index = index +1;
                        return $items.eq(index);
                    } else if (wrapAround) {
                        return $items.eq(0);
                    }
                }

                return $focusedElem;
            }),
            /**
             * Scrolls to and adds <em>focused</em> class to the previous item in the jQuery collection
             *
             * @method moveToPrevItem
             * @param selector
             * @param focusedClass
             * @return {Object}
             */
            moveToPrevItem: makeMoveToFunction(function ($focusedElem, $items, wrapAround) {
                var index;
                if (wrapAround && $focusedElem.length === 0) {
                    return $items.filter(":last");

                } else {
                    index = $.inArray($focusedElem.get(0), $items);
                    if (index > 0) {
                        index = index -1;
                        return $items.eq(index);
                    } else if (wrapAround) {
                        return $items.filter(":last");
                    }
                }

                return $focusedElem;
            }),

            /**
             * Clicks the element specified by the <em>selector</em> argument.
             *
             * @method click
             * @param selector - jQuery selector for element
             * @return {Object}
             */
            click: function (selector) {
                selectorsWithTitlesModified.push(selector);
                addShortcutsToTitle(selector);

                executor.add(function () {
                    var elem = $(selector);
                    if (elem.length > 0) {
                        elem.click();
                    }
                });
                return this;
            },

            /**
             * Navigates to specified <em>location</em>
             *
             * @method goTo
             * @param {String} location - http location
             * @return {Object}
             */
            goTo: function (location) {
                executor.add(function () {
                    window.location.href = location;
                });
                return this;
            },

            /**
             * navigates browser window to link href
             *
             * @method followLink
             * @param selector - jQuery selector for element
             * @return {Object}
             */
            followLink: function (selector) {
                selectorsWithTitlesModified.push(selector);
                addShortcutsToTitle(selector);

                executor.add(function () {
                    var elem = $(selector)[0];
                    if (elem && { 'a' : true, 'link' : true }[ elem.nodeName.toLowerCase() ]) {
                        window.location.href = elem.href;
                    }
                });
                return this;
            },

            /**
             * Executes function
             *
             * @method execute
             * @param {function} func
             * @return {Object}
             */
            execute: function (func) {
                var self = this;
                executor.add(function () {
                    func.apply(self, arguments);
                });
                return this;
            },

            /**
             * @deprecated This implementation is uncool. Kept around to satisfy Confluence plugin devs in the short term.
             *
             * Executes the javascript provided by the shortcut plugin point _immediately_.
             *
             * @method evaluate
             * @param {Function} command - the function provided by the shortcut key plugin point
             */
            evaluate: function(command) {
                command.call(this);
            },

            /**
             * Scrolls to element if out of view, then clicks it.
             *
             * @method moveToAndClick
             * @param selector - jQuery selector for element
             * @return {Object}
             */
            moveToAndClick: function (selector) {
                selectorsWithTitlesModified.push(selector);
                addShortcutsToTitle(selector);

                executor.add(function () {
                    var elem = $(selector);
                    if (elem.length > 0) {
                        elem.click();
                        elem.moveTo();
                    }
                });
                return this;
            },

            /**
             * Scrolls to element if out of view, then focuses it
             *
             * @method moveToAndFocus
             * @param selector - jQuery selector for element
             * @return {Object}
             */
            moveToAndFocus: function (selector) {
                selectorsWithTitlesModified.push(selector);
                addShortcutsToTitle(selector);

                executor.add(function (e) {
                    var $elem = AJS.$(selector);
                    if ($elem.length > 0) {
                        $elem.focus();
                        $elem.moveTo && $elem.moveTo();
                        if ($elem.is(':input')) {
                            e.preventDefault();
                        }
                    }
                });
                return this;
            },

            /**
             * Binds additional keyboard controls
             *
             * @method or
             * @param {String} keys - keys to bind
             * @return {Object}
             */
            or: function (keys) {
                bindKeys(keys);
                return this;
            },

            /**
             * Unbinds shortcut keys
             *
             * @method unbind
             */
            unbind: function () {
                $(document)
                    .unbind('keydown keypress', keypressHandler)
                    .unbind('keydown keypress keyup', defaultPreventionHandler);

                for(var i = 0, len = selectorsWithTitlesModified.length; i < len; i++) {
                    removeShortcutsFromTitle(selectorsWithTitlesModified[i]);
                }
                selectorsWithTitlesModified = [];
            }
        };
    };

    /**
     * Creates keyboard commands and their actions from json data. Format looks like:
     *
     * <pre>
     * [
     *   {
     *        "keys":["gd"],
     *        "context":"global",
     *        "op":"followLink",
     *        "param":"#home_link"
     *    },
     *    {
     *        "keys":["gi"],
     *        "context":"global",
     *        "op":"followLink",
     *        "param":"#find_link"
     *    },
     *    {
     *        "keys":["/"],
     *        "context":"global",
     *        "op":"moveToAndFocus",
     *        "param":"#quickSearchInput"
     *    },
     *    {
     *        "keys":["c"],
     *        "context":"global",
     *        "op":"moveToAndClick",
     *        "param":"#create_link"
     *    }
     * ]
     * </pre>
     *
     * @method fromJSON
     * @static
     * @param json
     */
    exports.whenIType.fromJSON = function (json, switchCtrlToMetaOnMac) {
        var shortcuts = [];

        //AJS.keys is defined by the keyboard-shortcut plugin.
        if (json) {
            $.each(json, function (i,item) {
                var operation = item.op,
                    param = item.param,
                    params;

                if(operation === "execute" || operation === 'evaluate') {
                    // need to turn function string into function object
                    params = [ new Function(param) ];

                } else if (/^\[[^\]\[]*,[^\]\[]*\]$/.test(param)) {
                    // pass in an array to send multiple params
                    try {
                        params = JSON.parse(param);
                    } catch(e) {
                        AJS.error("When using a parameter array, array must be in strict JSON format: " + param);
                    }

                    if (!$.isArray(params)) {
                        AJS.error("Badly formatted shortcut parameter. String or JSON Array of parameters required: " + param);
                    }

                } else {
                    params = [ param ];
                }

                item.keys.forEach(function(keys) {
                    if (switchCtrlToMetaOnMac && isMac) {
                        keys = $.map(this, function(shortcutString) {
                            return shortcutString.replace(/ctrl/i, "meta");
                        });
                    }

                    var newShortcut = AJS.whenIType(keys);
                    newShortcut[operation].apply(newShortcut, params);
                    shortcuts.push(newShortcut);
                });
            });
        }

        return shortcuts;
    };

    // Trigger this event on an iframe if you want its keypress events to be propagated (Events to work in iframes).
    $(document).bind("iframeAppended", function (e, iframe) {
        $(iframe).load(function () {

            var target = $(iframe).contents();

            target.bind("keyup keydown keypress", function (e) {
                // safari propagates keypress events from iframes
                if ($.browser.safari && e.type === "keypress") {
                    return;
                }
                if (!$(e.target).is(":input")) {

                    $.event.trigger(
                        e,
                        arguments, // Preserve original event data.
                        document,  // Bubble this event from the iframe's document to its parent document.
                        true       // Use the capturing phase to preserve original event.target.
                    );
                }
            });
        });
    });
})(AJS, AJS.$);
//Self executing function so we can pass in jquery.
(function($) {
    AJS.responsiveheader = {};
    AJS.responsiveheader.setup = function() {
        var $headers = $('.aui-header');
        if (!$headers.length) {
            return;
        }

        $headers.each(function(index, element){
            processHeader($(element), index);
        });

        function processHeader($thisHeader, id){
            //HELPER FUNCTIONS
            //function that constructs the show more dropdown menu content
            function constructResponsiveDropdown(id) {
                var remaining;
                calculateAvailableWidth();
                if (availableWidth > totalWidth){
                    showAll(id);
                } else {
                    moreMenu.show();
                    remaining = availableWidth - moreMenuWidth;

                    // loop through menu items until no more remaining space
                    //i represents the index of the last item in the header
                    for (var i = 0; remaining >= 0; i++) {
                        remaining -= menuItems[i].itemWidth;
                    }
                    //Subtract one for fencepost
                    i = i-1;
                    //move everything after the last index into the show more dropdown
                    moveToResponsiveDropdown(i, id);

                    //move everything between the previous index and the current index out of the dropdown
                    moveOutOfResponsiveDropdown(i, previousIndex, id);

                    //return the index of the last last item in the header so we can remember it for next time
                    return i;
                }
            }

            //calculate widths based on the current state of the page
            function calculateAvailableWidth(){
                // if there is no secondary nav, use the right of the screen as the boundary instead
                var secondaryNavLeft = secondaryNav.length !== 0 ? secondaryNav.offset().left : $(window).width();

                //the right most side of the primary nav, this is assumed to exists if this code is running
                var primaryNavRight = applicationLogo.offset().left + applicationLogo.outerWidth(true) + primaryButtonsWidth;
                availableWidth = secondaryNavLeft - primaryNavRight;
            }

            //creates the trigger and content elements for the show more dropdown
            function createResponsiveDropdownTrigger(id){
                //create the trigger
                var $responsiveTrigger = $("<li>" + aui.dropdown2.trigger({
                    menu: {id: "aui-responsive-header-dropdown-content-" + id},
                    text: AJS.I18n.getText('aui.words.more'),
                    extraAttributes: {
                        href: "#"
                    },
                    id: "aui-responsive-header-dropdown-trigger-" + id
                }) + "</li>");

                //create the dropdown content container
                $responsiveTrigger.append(aui.dropdown2.contents({
                    id: "aui-responsive-header-dropdown-content-" + id,
                    extraClasses: "aui-style-default",
                    content: aui.dropdown2.section({content: "<ul id='aui-responsive-header-dropdown-list-" + id + "'></ul>"})
                }));

                //detect if buttons exist
                if (primaryButtonsWidth === 0) {
                    $responsiveTrigger.appendTo(inHeader(".aui-nav"));
                } else {
                    $responsiveTrigger.insertBefore(inHeader(".aui-nav > li > .aui-button")
                        .first().parent());
                }
                moreMenu = $responsiveTrigger;
                moreMenuWidth = moreMenu.outerWidth(true);
            }

            //function that handles moving items out of the show more menu into the app header
            function moveOutOfResponsiveDropdown (index, previousIndex, id) {
                if (index < 0 || previousIndex < 0 || index === previousIndex) {
                    return;
                }
                var $responsiveTrigger = $("#aui-responsive-header-dropdown-trigger-" + id);
                var $responsiveTriggerItem = $responsiveTrigger.parent();
                var current;
                var currentItem;

                if($responsiveTrigger.hasClass("active")) {
                    $responsiveTrigger.trigger("aui-button-invoke");
                }
                var menuItemElementsLength = inHeader(".aui-nav > li > a:not(.aui-button):not(#aui-responsive-header-dropdown-trigger-" + id + ")").length;
                while (index > previousIndex) {
                    current = menuItems[previousIndex];
                    //Make sure things exist before accessing them.
                    if (current && current.itemElement) {
                        currentItem = current.itemElement;
                        if (menuItemElementsLength === 0) {
                            //this path should only run once when there are no menu items left in the header
                            currentItem.prependTo(inHeader(".aui-nav"));
                        } else {
                            currentItem.insertBefore($responsiveTriggerItem);
                        }
                        currentItem.children("a")
                            .removeClass("aui-dropdown2-sub-trigger active");
                        previousIndex = previousIndex + 1;
                        menuItemElementsLength = menuItemElementsLength + 1;
                    }
                }
            }

            //function that handles moving itesm into the show more menu
            function moveToResponsiveDropdown(index, id) {
                if (index < 0) {
                    return;
                }
                var dropdownContainer = $("#aui-responsive-header-dropdown-list-" + id);

                for (var i = index; i < menuItems.length; i++) {
                    menuItems[i].itemElement.appendTo(dropdownContainer);
                    var $itemTrigger = menuItems[i].itemElement.children("a");
                    if ($itemTrigger.hasClass("aui-dropdown2-trigger")) {
                        $itemTrigger.addClass("aui-dropdown2-sub-trigger");
                    }
                }
            }

            //function that handles show everything
            function showAll(id) {
                moreMenu.hide();
                moveOutOfResponsiveDropdown(menuItems.length, previousIndex, id);
            }

            var secondaryNav = $thisHeader.find(".aui-header-secondary .aui-nav").first();
            $('.aui-header').attr('data-aui-responsive', 'true');
            var menuItems = [];
            var availableWidth = 0;
            var totalWidth = 0;
            var moreMenu;
            var previousIndex;
            var applicationLogo = $thisHeader.find("#logo");
            var moreMenuWidth = 0;
            //to cache the selector and give .find convenience
            var inHeader = (function(){
                var header = $thisHeader.find(".aui-header-primary").first();
                return function(selector){
                    return header.find(selector);
                };
            })();

            var primaryButtonsWidth = 0;
            inHeader(".aui-button").parent().each(function(index, element){
                primaryButtonsWidth += $(element).outerWidth(true);
            });
            //remember the widths of all the menu items
            inHeader(".aui-nav > li > a:not(.aui-button)").each(function(index, element){
                var $element = $(element).parent();
                var itemWidth = $element.outerWidth(true);
                menuItems.push({itemElement: $element, itemWidth: itemWidth});
                totalWidth += itemWidth;
            });

            previousIndex = menuItems.length;

            // attach resize handler
            $(window).resize(function(){
                previousIndex = constructResponsiveDropdown(id);
            });

            //create the elements for the show more menu

            createResponsiveDropdownTrigger(id);

            //So that the header logo doesn't mess things up. (size is unknown before the image loads)
            var $logoImg = applicationLogo.find("img");
            if($logoImg.length !== 0) {
                $logoImg.attr("data-aui-responsive-header-index", id);
                $logoImg.load(function(e){
                    previousIndex = constructResponsiveDropdown(id);
                });
            }

            //construct the show more dropdown
            previousIndex = constructResponsiveDropdown(id);

            //show the aui nav (hidden via css on load)
            inHeader('.aui-nav').css("width", "auto");
        }
    };
})(AJS.$);

AJS.$(AJS.responsiveheader.setup);
/*! jQuery Fancy File Input plugin - v0.2.0 - 2014-04-29
* http://seancurtis.com/experiments/fancy-file-input/
* Copyright (c) 2014 Sean Curtis <scurtis@atlassian.com>; Licensed http://www.apache.org/licenses/LICENSE-2.0 */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('fancy-file-input',['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var fakePathRegex = /^.*[\\\/]/;
    var multipleFileTextRegex = /\{0\}/gi;
    var ie = (function() {
        var v = 3;
        var div = document.createElement( 'div' );
        var all = div.getElementsByTagName( 'i' );

        do {
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
        } while (all[0]);

        return v > 4 ? v : document.documentMode;
    }());

    $.fn.fancyFileInput = function (options) {
        return this.each(function () {
            var ffi = new FancyFileInput(this, options);
            $(this).data('FancyFileInput', ffi);
        });
    };

    function FancyFileInput(el, options) {
        var instance = $(el).data('FancyFileInput');
        if (instance) {
            return instance;
        }
        options = $.extend({}, FancyFileInput.defaults, options);
        this.el = el;
        this.$el = $(el);
        this.$label = this.createLabel(options.buttonText);
        this._addLabelText();
        this.$clearButton = $('<button>', {
            text: (this.$label.attr('data-ffi-clearButtonText') || options.clearButtonText),
            'class': 'ffi-clear',
            type: 'button',
            'tabindex': '-1'
        });
        this.multipleFileTextPattern = this.$label.attr('data-ffi-multipleFileTextPattern') || options.multipleFileTextPattern;
        this._eventNamespace = '.ffi';
        this.CLASSES = {
            disabled: 'is-disabled',
            focused: 'is-focused',
            active: 'is-active',
            valid: 'is-valid',
            invalid: 'is-invalid'
        };
        this[this.isDisabled() ? 'disable' : 'enable']();
        this.isFocused = false;
    }

    FancyFileInput.defaults = {
        buttonText: 'Browse\u2026',
        clearButtonText: 'Clear',
        multipleFileTextPattern: '{0} files'
    };

    FancyFileInput.prototype._addLabelText = function attLabelText() {
        var $associatedLabel = $('label[for="' + this.el.id + '"]');
        if ($associatedLabel.length) {
            this.$el.attr('aria-label', $associatedLabel.text());
        }
    };

    FancyFileInput.prototype.createLabel = function (buttonText) {
        var $label = this.$el.parent('.ffi[data-ffi-button-text]');
        if (!$label.length) {
            $label = this.$el.wrap($('<label>', { 'class': 'ffi', 'data-ffi-button-text': buttonText })).parent();
        }
        return $label;
    };

    FancyFileInput.prototype.isDisabled = function () {
        return this.$el.is(':disabled');
    };

    FancyFileInput.prototype.formatMultipleFileText = function (numFiles) {
        return this.multipleFileTextPattern.replace(multipleFileTextRegex, numFiles);
    };

    FancyFileInput.prototype.bindEvents = function () {
        this.$el
            .on('invalid'   + this._eventNamespace, $.proxy(this.checkValidity, this))
            .on('change'    + this._eventNamespace, $.proxy(this.change, this))
            .on('keydown'   + this._eventNamespace, $.proxy(this.keydown, this))
            .on('mousedown' + this._eventNamespace, $.proxy(this.mousedown, this))
            .on('mouseup'   + this._eventNamespace, $.proxy(this.mouseup, this))
            .on('focus'     + this._eventNamespace, $.proxy(this.focus, this))
            .on('blur'      + this._eventNamespace, $.proxy(this.blur, this));
        this.$clearButton.on('click' + this._eventNamespace, $.proxy(this.clear, this));
    };

    FancyFileInput.prototype.unbindEvents = function () {
        this.$el.off(this._eventNamespace);
        this.$clearButton.off(this._eventNamespace);
    };

    FancyFileInput.prototype.fireEvent = function (event) {
        this.$el.trigger(event + this._eventNamespace);
    };

    FancyFileInput.prototype.enable = function () {
        this.bindEvents();
        this.$el.prop('disabled', false);
        this.$label.removeClass(this.CLASSES.disabled);
    };

    FancyFileInput.prototype.disable = function () {
        this.unbindEvents();
        this.$el.prop('disabled', true);
        this.$label.addClass(this.CLASSES.disabled);
    };

    FancyFileInput.prototype.clear = function () {
        this.el.value = '';
        this.cloneAndReplaceField();
        this.change();
        return false;
    };

    FancyFileInput.prototype.cloneAndReplaceField = function () {
        var $clone = this.$el.clone();
        this.$el.replaceWith($clone);
        this.unbindEvents();
        this.$el = $clone;
        this.el = $clone[0];
        this.bindEvents();
    };

    FancyFileInput.prototype.focus = function () {
        var instance = this;

        this.$label.addClass(this.CLASSES.focused);

        // toggle focus so that the cursor appears back in the field instead of on the button
        if (ie && !this.isFocused) {
            this.isFocused = true;

            setTimeout(function() {
                instance.$el.blur();
                instance.$el.focus();
            }, 0);
        }
    };

    FancyFileInput.prototype.blur = function () {
        if (!ie || !this.isFocused) {
            this.$label.removeClass(this.CLASSES.focused);
            this.isFocused = false;
        }
    };

    FancyFileInput.prototype.mousedown = function () {
        this.$label.addClass(this.CLASSES.active);
    };

    FancyFileInput.prototype.mouseup = function () {
        this.$label.removeClass(this.CLASSES.active);
    };

    FancyFileInput.prototype.keydown = function (e) {
        var keyCode = e.which;
        var BACKSPACE = 8;
        var TAB = 9;
        var DELETE = 46;

        // Add clear behaviour for all browsers
        if (keyCode === BACKSPACE || keyCode === DELETE) {
            this.clear();
            e.preventDefault();
        }

        // This works around the IE double tab-stop - no events or blur/change occur when moving between
        //  the field part of the input and the button part. This is dirty, but it works.
        if (ie && keyCode === TAB) {
            var instance = this;

            this.isFocused = false;
            this.$el.prop('disabled',true);

            setTimeout(function(){
                instance.$el.prop('disabled', false).blur();
            }, 0);
        }
    };

    FancyFileInput.prototype.checkValidity = function () {
        if (!this.el.required) {
            return;
        }
        var isInvalid = this.$el.is(':invalid');

        this.$label.toggleClass(this.CLASSES.invalid, isInvalid).toggleClass(this.CLASSES.valid, !isInvalid);
    };

    FancyFileInput.prototype.change = function () {
        var files;
        var val = '';

        this.checkValidity();

        // multiple file selection
        if (this.el.multiple && this.el.files.length > 1) {
            files = this.formatMultipleFileText(this.el.files.length); // '5 files'
        } else {
            files = this.el.value; // 'README.txt'
        }

        if (files.length) {
            val = files.replace(fakePathRegex, ''); // Strips off the C:\fakepath nonsense
            this.$clearButton.appendTo(this.$label);
        } else {
            this.$clearButton.detach();
        }

        this.$el.focus();
        this.setFieldText(val);
        this.fireEvent('value-changed');
    };

    FancyFileInput.prototype.setFieldText = function (text) {
        var dataAttribute = 'data-ffi-value';
        if (text.length) {
            this.$label.attr(dataAttribute, text);
            this.fireEvent('value-added');
        } else {
            this.$label.removeAttr(dataAttribute);
            this.fireEvent('value-cleared');
        }
    };

    return FancyFileInput;
}));
