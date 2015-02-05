/*!
  * bean.js - copyright @dedfat
  * https://github.com/fat/bean
  * Follow our software http://twitter.com/dedfat
  * MIT License
  * special thanks to:
  * dean edwards: http://dean.edwards.name/
  * dperini: https://github.com/dperini/nwevents
  * the entire mootools team: github.com/mootools/mootools-core
  */
!function (context) {
  var __uid = 1, registry = {}, collected = {},
      overOut = /over|out/,
      namespace = /[^\.]*(?=\..*)\.|.*/,
      stripName = /\..*/,
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
  }

  function retrieveEvents(element) {
    var uid = retrieveUid(element);
    return (registry[uid] = registry[uid] || {});
  }

  function retrieveUid(obj, uid) {
    return (obj.__uid = uid || obj.__uid || __uid++);
  }

  function listener(element, type, fn, add, custom) {
    if (element[addEvent]) {
      element[add ? addEvent : removeEvent](type, fn, false);
    } else if (element[attachEvent]) {
      custom && add && (element['_on' + custom] = element['_on' + custom] || 0);
      element[add ? attachEvent : detachEvent]('on' + type, fn);
    }
  }

  function nativeHandler(element, fn, args) {
    return function (event) {
      event = fixEvent(event || ((this.ownerDocument || this.document || this).parentWindow || context).event);
      return fn.apply(element, [event].concat(args));
    };
  }

  function customHandler(element, fn, type, condition, args) {
    return function (event) {
      if (condition ? condition.call(this, event) : event && event.propertyName == '_on' + type || !event) {
        fn.apply(element, [event].concat(args));
      }
    };
  }

  function addListener(element, orgType, fn, args) {
    var type = orgType.replace(stripName, ''), events = retrieveEvents(element),
        handlers = events[type] || (events[type] = {}),
        uid = retrieveUid(fn, orgType.replace(namespace, ''));
    if (handlers[uid]) {
      return element;
    }
    var custom = customEvents[type];
    fn = custom && custom.condition ? customHandler(element, fn, type, custom.condition) : fn;
    type = custom && custom.base || type;
    var isNative = context[addEvent] || nativeEvents.indexOf(type) > -1;
    fn = isNative ? nativeHandler(element, fn, args) : customHandler(element, fn, type, false, args);
    if (type == 'unload') {
      var org = fn;
      fn = function () {
        removeListener(element, type, fn) && org();
      };
    }
    listener(element, isNative ? type : 'propertychange', fn, true, !isNative && true);
    handlers[uid] = fn;
    fn.__uid = uid;
    return type == 'unload' ? element : (collected[retrieveUid(element)] = element);
  }

  function removeListener(element, orgType, handler) {
    var uid, names, uids, i, events = retrieveEvents(element), type = orgType.replace(stripName, '');
    if (!events || !events[type]) {
      return element;
    }
    names = orgType.replace(namespace, '');
    uids = names ? names.split('.') : [handler.__uid];
    for (i = uids.length; i--;) {
      uid = uids[i];
      handler = events[type][uid];
      delete events[type][uid];
      type = customEvents[type] ? customEvents[type].base : type;
      var isNative = element[addEvent] || nativeEvents.indexOf(type) > -1;
      listener(element, isNative ? type : 'propertychange', handler, false, !isNative && type);
    }
    return element;
  }

  function del(selector, fn, $) {
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

  function add(element, events, fn, delfn, $) {
    if (typeof events == 'object' && !fn) {
      for (var type in events) {
        events.hasOwnProperty(type) && add(element, type, events[type]);
      }
    } else {
      var isDel = typeof fn == 'string', types = (isDel ? fn : events).split(' ');
      fn = isDel ? del(events, delfn, $) : fn;
      for (var i = types.length; i--;) {
        addListener(element, types[i], fn, Array.prototype.slice.call(arguments, isDel ? 4 : 3));
      }
    }
    return element;
  }

  function remove(element, orgEvents, fn) {
    var k, type, events,
        isString = typeof(orgEvents) == 'string',
        names = isString && orgEvents.replace(namespace, ''),
        rm = removeListener,
        attached = retrieveEvents(element);
    if (isString && /\s/.test(orgEvents)) {
      orgEvents = orgEvents.split(' ');
      var i = orgEvents.length - 1;
      while (remove(element, orgEvents[i]) && i--) {}
      return element;
    }
    events = isString ? orgEvents.replace(stripName, '') : orgEvents;
    if (!attached || (isString && !attached[events])) {
      return element;
    }
    if (typeof fn == 'function') {
      rm(element, events, fn);
    } else if (names) {
      rm(element, orgEvents);
    } else {
      rm = events ? rm : remove;
      type = isString && events;
      events = events ? (fn || attached[events] || events) : attached;
      for (k in events) {
        events.hasOwnProperty(k) && rm(element, type || k, events[k]);
      }
    }
    return element;
  }

  function fire(element, type) {
    var evt, k, i, types = type.split(' ');
    for (i = types.length; i--;) {
      type = types[i].replace(stripName, '');
      var isNative = nativeEvents.indexOf(type) > -1,
          isNamespace = types[i].replace(namespace, ''),
          handlers = retrieveEvents(element)[type];
      if (isNamespace) {
        isNamespace = isNamespace.split('.');
        for (k = isNamespace.length; k--;) {
          handlers[isNamespace[k]] && handlers[isNamespace[k]]();
        }
      } else if (element[addEvent]) {
        evt = document.createEvent(isNative ? "HTMLEvents" : "UIEvents");
        evt[isNative ? 'initEvent' : 'initUIEvent'](type, true, true, context, 1);
        element.dispatchEvent(evt);
      } else if (element[attachEvent]) {
        isNative ? element.fireEvent('on' + type, document.createEventObject()) : element['_on' + type]++;
      } else {
        for (k in handlers) {
          handlers.hasOwnProperty(k) && handlers[k]();
        }
      }
    }
    return element;
  }

  function clone(element, from, type) {
    var events = retrieveEvents(from), obj, k;
    obj = type ? events[type] : events;
    for (k in obj) {
      obj.hasOwnProperty(k) && (type ? add : clone)(element, type || from, type ? obj[k] : k);
    }
    return element;
  }

  function fixEvent(e) {
    if (!e) {
      return {};
    }
    var type = e.type, target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || fixEvent.preventDefault;
    e.stopPropagation = e.stopPropagation || fixEvent.stopPropagation;
    e.target = target && target.nodeType == 3 ? target.parentNode : target;
    if (type.indexOf('key') != -1) {
      e.keyCode = e.which || e.keyCode;
    } else if ((/click|mouse|menu/i).test(type)) {
      e.rightClick = e.which == 3 || e.button == 2;
      e.pos = { x: 0, y: 0 };
      if (e.pageX || e.pageY) {
        e.pos.x = e.pageX;
        e.pos.y = e.pageY;
      } else if (e.clientX || e.clientY) {
        e.pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        e.pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      overOut.test(type) && (e.relatedTarget = e.relatedTarget || e[(type == 'mouseover' ? 'from' : 'to') + 'Element']);
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
    if (!related) {
      return related == null;
    }
    return (related != this && related.prefix != 'xul' && !/document/.test(this.toString()) && !isDescendant(this, related));
  }

  var customEvents = {
    mouseenter: { base: 'mouseover', condition: check },
    mouseleave: { base: 'mouseout', condition: check },
    mousewheel: { base: /Firefox/.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel' }
  };

  var bean = { add: add, remove: remove, clone: clone, fire: fire };

  var clean = function (el) {
    var uid = remove(el).__uid;
    if (uid) {
      delete collected[uid];
      delete registry[uid];
    }
  };

  if (context[attachEvent]) {
    add(context, 'unload', function () {
      for (var k in collected) {
        collected.hasOwnProperty(k) && clean(collected[k]);
      }
      context.CollectGarbage && CollectGarbage();
    });
  }

  var oldBean = context.bean;
  bean.noConflict = function () {
    context.bean = oldBean;
    return this;
  };

  (typeof module !== 'undefined' && module.exports) ?
    (module.exports = bean) :
    (context.bean = bean);

}(this);