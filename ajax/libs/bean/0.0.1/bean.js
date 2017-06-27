/*!
  * event.js - copyright @dedfat
  * https://github.com/fat/bean
  * Follow our software http://twitter.com/dedfat
  * MIT License
  * cheers to the entire mootools team, dean edwards, and dperini
  */
!function (context) {
  var _uid = 1, registry = {}, collected = {},
      overOut = /over|out/,
      addEvent = 'addEventListener',
      attachEvent = 'attachEvent',
      removeEvent = 'removeEventListener',
      detachEvent = 'detachEvent';

  function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  function isElement(obj) {
    return !!obj.nodeName;
  }

  function retrieveEvents(element) {
    var uid = retrieveUid(element);
    return (registry[uid] = registry[uid] || {});
  }

  function retrieveUid(obj) {
    return (obj._uid = obj._uid || _uid++);
  }

  function listener(element, type, fn, add, custom) {
    if (!isElement(element)) {
      return;
    }
    if (element[addEvent]) {
      return element[add ? addEvent : removeEvent](type, fn, false);
    }
    if (custom && add) {
      element['_on' + custom] = element['_on' + custom] || 0;
    }
    element[add ? attachEvent : detachEvent]('on' + type, fn);
  }

  function nativeHandler(element, fn, args) {
    return function (event) {
      event = fixEvent(event || ((this.ownerDocument || this.document || this).parentWindow || window).event);
      if (fn.apply(element, [event].concat(args)) === false) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };
  }

  function customHandler(element, fn, type, condition, args) {
    return function (event) {
      if (condition ? condition.call(this, event) : event && event.propertyName == '_on' + type || !event) {
        fn.apply(element, [event].concat(args));
      }
      return true;
    };
  }

  function addListener(element, type, fn, args) {
    var events = retrieveEvents(element),
        handlers = events[type];
    if (!handlers) {
      handlers = events[type] = {};
      if (element["on" + type]) {
        handlers[0] = element["on" + type];
      }
    }
    var uid = retrieveUid(fn);
    if (handlers[uid]) {
      return element;
    }
    var custom = customEvents[type];
    if (custom) {
      if (custom.condition) {
        fn = customHandler(element, fn, type, custom.condition);
      }
      type = custom.base || type;
    }
    if (window[addEvent] || nativeEvents.indexOf(type) > -1) {
      fn = nativeHandler(element, fn, args);
      if (type == 'unload') { //unload only once
        var org = fn;
        fn = function () {
          removeListener(element, 'unload', fn);
          org();
        };
      }
      listener(element, type, fn, true);
    } else {
      fn = customHandler(element, fn, type, false, args);
      listener(element, 'propertychange', fn, true, type);
    }
    handlers[uid] = fn;
    fn._uid = uid;
    return type == 'unload' ? element : (collected[retrieveUid(element)] = element);
  }

  function removeListener(element, type, handler) {
    var events = retrieveEvents(element);
    if (!events || !events[type]) {
      return element;
    }
    handler = events[type][handler._uid];
    delete events[type][handler._uid];
    type = customEvents[type] ? customEvents[type].base : type;
    if (element[addEvent] || nativeEvents.indexOf(type) > -1) {
      listener(element, type, handler, false);
    } else {
      listener(element, 'propertychange', handler, false, type);
    }
    return element;
  }

  function processDelegates(selector, fn, $) {
    return function (e) {
      var array = typeof selector == 'string' ? $(selector, this) : selector;
      for (var target = e.target; target && target != this; target = target.parentNode) {
        for (var i = array.length; i--;) {
          if (array[i] == target) {
            return fn.apply(target, arguments);
          }
        }
      }
    };
  }

  function add(element, events, fn, delegatefn, $) {
    if (typeof events == 'object' && !fn) {
      for (var type in events) {
        if (events.hasOwnProperty(type)) {
          addListener(element, type, events[type]);
        }
      }
    } else {
      var isDelegation = typeof fn == 'string',
        types = (isDelegation ? fn : events).split(' ');
      for (var i = types.length; i--;) {
        addListener(
          element,
          types[i],
          isDelegation ? processDelegates(events, delegatefn, $) : fn,
          Array.prototype.slice.call(arguments, isDelegation ? 4 : 3)
        );
      }
    }
    return element;
  }

  function remove(element, events, fn) {
    var k, type, isString = typeof(events) == 'string', rm = removeListener, attached = retrieveEvents(element);
    if (isString && /\s/.test(events)) {
      events = events.split(' ');
      for (var i = events.length; i--;) {
        remove(element, events[i]);
      }
      return element;
    }
    if (!attached || (isString && !attached[events])) {
      return element;
    }
    if (typeof fn == 'function') {
      rm(element, events, fn);
    } else {
      if (!events) {
        events = attached;
        rm = remove;
      } else {
        type = isString && events;
        events = fn || attached[events] || events;
      }
      for (k in events) {
        if (events.hasOwnProperty(k)) {
          rm(element, type || k, events[k]);
        }
      }
    }
    return element;
  }

  function fire(element, type) {
    var evt, k, i, types = type.split(' ');
    for (i = types.length; i--;) {
      type = types[i];
      if (!isElement(element)) {
        var handlers = retrieveEvents(element)[type];
        for (k in handlers) {
          if (handlers.hasOwnProperty(k)) {
            handlers[k]();
          }
        }
      }
      if (nativeEvents.indexOf(type) > -1) {
        if (element[addEvent]) {
          evt = document.createEvent("HTMLEvents");
          evt.initEvent(type, true, true);
          element.dispatchEvent(evt);
        } else {
          evt = document.createEventObject();
          element.fireEvent('on' + type, evt);
        }
      } else {
        if (element[addEvent]) {
          evt = document.createEvent("UIEvents");
          evt.initUIEvent(type, true, true, window, 1);
          element.dispatchEvent(evt);
        } else {
          element['_on' + type]++;
        }
      }
    }
    return element;
  }

  function clone(element, from, type) {
    var events = retrieveEvents(from), uid, obj, method, k;
    if (!events) {
      return element;
    }
    obj = type ? events[type] : events;
    method = type ? add : clone;
    for (k in obj) {
      if (obj.hasOwnProperty(k)) {
        method(element, type || from, type ? obj[k] : k);
      }
    }

    return element;
  }

  function fixEvent(e) {
    if (!e) {
      return {};
    }
    var type = e.type;
    e.preventDefault = e.preventDefault || fixEvent.preventDefault;
    e.stopPropagation = e.stopPropagation || fixEvent.stopPropagation;
    e.target = e.target || e.srcElement;
    if (e.target.nodeType == 3) {
      e.target = e.target.parentNode;
    }
    if (type.indexOf('key') != -1) {
      if (e.which) {
        e.keyCode = e.which;
      }
    } else if ((/click|mouse|menu/i).test(type)) {
      e.rightClick = (e.which == 3) || (e.button == 2);
      e.pos = { x: 0, y: 0 };
      if (e.pageX || e.pageY) {
        e.pos.x = e.pageX;
        e.pos.y = e.pageY;
      } else if (e.clientX || e.clientY) {
        e.pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        e.pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      if ((overOut).test(type)) {
        e.relatedTarget = e.relatedTarget || e[(type == 'mouseover' ? 'from' : 'to') + 'Element'];
      }
    }
    return e;
  }
  fixEvent.preventDefault = function () {
    this.returnValue = false;
  };
  fixEvent.stopPropagation = function () {
    this.cancelBubble = true;
  };

  var nativeEvents = 'click,dblclick,mouseup,mousedown,contextmenu,' + //mouse buttons
    'mousewheel,DOMMouseScroll,' + //mouse wheel
    'mouseover,mouseout,mousemove,selectstart,selectend,' + //mouse movement
    'keydown,keypress,keyup,' + //keyboard
    'orientationchange,' + // mobile
    'touchstart,touchmove,touchend,touchcancel,' + // touch
    'gesturestart,gesturechange,gestureend,' + // gesture
    'focus,blur,change,reset,select,submit,' + //form elements
    'load,unload,beforeunload,resize,move,DOMContentLoaded,readystatechange,' + //window
    'error,abort,scroll'.split(','); //misc

  function check(event) {
    var related = event.relatedTarget;
    if (related == null) {
      return true;
    }
    if (!related) {
      return false;
    }
    return (related != this && related.prefix != 'xul' && !/document/.test(this.toString()) && !isDescendant(this, related));
  }

  var customEvents = {
    mouseenter: { base: 'mouseover', condition: check },
    mouseleave: { base: 'mouseout', condition: check }
  };

  var evnt = {
    add: add,
    remove: remove,
    clone: clone,
    fire: fire
  };

  var clean = function (el) {
    var uid = el._uid;
    remove(el); //remove all events
    if (uid) {
      delete collected[uid];
      delete registry[uid];
    }
  };

  if (window[attachEvent]) {
    add(window, 'unload', function () {
      for (var k in collected) {
        if (collected.hasOwnProperty(k)) {
          clean(collected[k]);
        }
      }
      if (window.CollectGarbage) {
        CollectGarbage();
      }
    });
  }

  var oldEvnt = context.evnt;
  evnt.noConflict = function () {
    context.evnt = oldEvnt;
    return this;
  };

  (typeof module !== 'undefined' && module.exports) ?
    (module.exports = evnt) :
    (context.evnt = evnt);

}(this);