/*
Copyright 2014, modulex-event-dom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:30:50 GMT
*/
modulex.add("event-dom/base", ["dom","event-base","modulex-util","ua"], function(require, exports, module) {
var dom = require("dom");
var eventBase = require("event-base");
var modulexUtil = require("modulex-util");
var ua = require("ua");
/*
combined modules:
event-dom/base
event-dom/base/dom-event
event-dom/base/utils
event-dom/base/special
event-dom/base/observable
event-dom/base/observer
event-dom/base/object
event-dom/base/key-codes
event-dom/base/special-events
event-dom/base/mouseenter
*/
var eventDomBaseUtils, eventDomBaseSpecial, eventDomBaseObserver, eventDomBaseObject, eventDomBaseKeyCodes, eventDomBaseMouseenter, eventDomBaseObservable, eventDomBaseDomEvent, eventDomBaseSpecialEvents, eventDomBase;
eventDomBaseUtils = function (exports) {
  exports = {};
  /**
   * @ignore
   * utils for event
   * @author yiminghe@gmail.com
   */
  var Dom = dom;
  var EVENT_GUID = 'ksEventTargetId_' + +new Date(), doc = document, simpleAdd = doc && doc.addEventListener ? function (el, type, fn, capture) {
      if (el.addEventListener) {
        el.addEventListener(type, fn, !!capture);
      }
    } : function (el, type, fn) {
      if (el.attachEvent) {
        el.attachEvent('on' + type, fn);
      }
    }, simpleRemove = doc && doc.removeEventListener ? function (el, type, fn, capture) {
      if (el.removeEventListener) {
        el.removeEventListener(type, fn, !!capture);
      }
    } : function (el, type, fn) {
      if (el.detachEvent) {
        el.detachEvent('on' + type, fn);
      }
    };
  exports = {
    simpleAdd: simpleAdd,
    simpleRemove: simpleRemove,
    data: function (elem, v) {
      return Dom.data(elem, EVENT_GUID, v);
    },
    removeData: function (elem) {
      return Dom.removeData(elem, EVENT_GUID);
    }
  };
  return exports;
}();
eventDomBaseSpecial = function (exports) {
  exports = {};
  /**
   * @ignore
   * special house for special events
   * @author yiminghe@gmail.com
   */
  exports = {};
  return exports;
}();
eventDomBaseObserver = function (exports) {
  exports = {};
  /**
   * @ignore
   * observer for dom event.
   * @author yiminghe@gmail.com
   */
  var BaseEvent = eventBase;
  var Special = eventDomBaseSpecial;
  var util = modulexUtil;
  /**
   * observer for dom event
   * @class Event.DomEvent.Observer
   * @extends Event.Observer
   * @private
   */
  function DomEventObserver(cfg) {
    DomEventObserver.superclass.constructor.call(this, cfg);
  }
  util.extend(DomEventObserver, BaseEvent.Observer, {
    keys: [
      'fn',
      'filter',
      'data',
      'context',
      'originalType',
      'groups',
      'last'
    ],
    notifyInternal: function (event, ce) {
      var self = this, s, t, ret, type = event.type, originalType;
      if (originalType = self.config.originalType) {
        event.type = originalType;
      } else {
        originalType = type;
      }
      // context undefined 时不能写死在 listener 中，否则不能保证 clone 时的 this
      if ((s = Special[originalType]) && s.handle) {
        t = s.handle(event, self, ce);
        // can handle
        if (t && t.length > 0) {
          ret = t[0];
        }
      } else {
        ret = self.simpleNotify(event, ce);
      }
      if (ret === false) {
        event.halt();
      }
      // notify other mousemove listener
      event.type = type;
      return ret;
    }
  });
  exports = DomEventObserver;
  return exports;
}();
eventDomBaseObject = function (exports) {
  exports = {};
  /**
   * @ignore
   * event object for dom
   * @author yiminghe@gmail.com
   */
  var BaseEvent = eventBase;
  var util = modulexUtil;
  var DOCUMENT = document, TRUE = true, FALSE = false, commonProps = [
      'altKey',
      'bubbles',
      'cancelable',
      'ctrlKey',
      'currentTarget',
      'eventPhase',
      'metaKey',
      'shiftKey',
      'target',
      'timeStamp',
      'view',
      'type'
    ], eventNormalizers = [
      {
        reg: /^key/,
        props: [
          'char',
          'charCode',
          'key',
          'keyCode',
          'which'
        ],
        fix: function (event, originalEvent) {
          if (event.which == null) {
            event.which = originalEvent.charCode != null ? originalEvent.charCode : originalEvent.keyCode;
          }
          // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
          if (event.metaKey === undefined) {
            event.metaKey = event.ctrlKey;
          }
        }
      },
      {
        reg: /^touch/,
        props: [
          'touches',
          'changedTouches',
          'targetTouches'
        ]
      },
      {
        reg: /^hashchange$/,
        props: [
          'newURL',
          'oldURL'
        ]
      },
      {
        reg: /^gesturechange$/i,
        props: [
          'rotation',
          'scale'
        ]
      },
      {
        reg: /^(mousewheel|DOMMouseScroll)$/,
        props: [],
        fix: function (event, originalEvent) {
          var deltaX, deltaY, delta, wheelDelta = originalEvent.wheelDelta, axis = originalEvent.axis, wheelDeltaY = originalEvent.wheelDeltaY, wheelDeltaX = originalEvent.wheelDeltaX, detail = originalEvent.detail;
          // ie/webkit
          if (wheelDelta) {
            delta = wheelDelta / 120;
          }
          // gecko
          if (detail) {
            // press control e.detail == 1 else e.detail == 3
            delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
          }
          // Gecko
          if (axis !== undefined) {
            if (axis === event.HORIZONTAL_AXIS) {
              deltaY = 0;
              deltaX = 0 - delta;
            } else if (axis === event.VERTICAL_AXIS) {
              deltaX = 0;
              deltaY = delta;
            }
          }
          // Webkit
          if (wheelDeltaY !== undefined) {
            deltaY = wheelDeltaY / 120;
          }
          if (wheelDeltaX !== undefined) {
            deltaX = -1 * wheelDeltaX / 120;
          }
          // 默认 deltaY (ie)
          if (!deltaX && !deltaY) {
            deltaY = delta;
          }
          if (deltaX !== undefined) {
            /**
             * deltaX of mousewheel event
             * @property deltaX
             * @member Event.DomEvent.Object
             */
            event.deltaX = deltaX;
          }
          if (deltaY !== undefined) {
            /**
             * deltaY of mousewheel event
             * @property deltaY
             * @member Event.DomEvent.Object
             */
            event.deltaY = deltaY;
          }
          if (delta !== undefined) {
            /**
             * delta of mousewheel event
             * @property delta
             * @member Event.DomEvent.Object
             */
            event.delta = delta;
          }
        }
      },
      {
        reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
        props: [
          'buttons',
          'clientX',
          'clientY',
          'button',
          'offsetX',
          'relatedTarget',
          'which',
          'fromElement',
          'toElement',
          'offsetY',
          'pageX',
          'pageY',
          'screenX',
          'screenY'
        ],
        fix: function (event, originalEvent) {
          var eventDoc, doc, body, target = event.target, button = originalEvent.button;
          // Calculate pageX/Y if missing and clientX/Y available
          if (target && event.pageX == null && originalEvent.clientX != null) {
            eventDoc = target.ownerDocument || DOCUMENT;
            doc = eventDoc.documentElement;
            body = eventDoc.body;
            event.pageX = originalEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = originalEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
          }
          // which for click: 1 === left; 2 === middle; 3 === right
          // do not use button
          if (!event.which && button !== undefined) {
            event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
          }
          // add relatedTarget, if necessary
          if (!event.relatedTarget && event.fromElement) {
            event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
          }
          return event;
        }
      }
    ];
  function retTrue() {
    return TRUE;
  }
  function retFalse() {
    return FALSE;
  }
  /**
   * Do not new by yourself.
   *
   * KISSY 's dom event system normalizes the event object according to
   * W3C standards.
   *
   * The event object is guaranteed to be passed to
   * the event handler.
   *
   * Most properties from the original event are
   * copied over and normalized to the new event object
   * according to [W3C standards](http://www.w3.org/TR/dom/#event).
   *
   * @class Event.DomEvent.Object
   * @extends Event.Object
   * @private
   * @param originalEvent native dom event
   */
  function DomEventObject(originalEvent) {
    var self = this, type = originalEvent.type;
    var isNative = typeof originalEvent.stopPropagation === 'function' || typeof originalEvent.cancelBubble === 'boolean';
    /**
     * altKey
     * @property altKey
     */
    /**
     * attrChange
     * @property attrChange
     */
    /**
     * attrName
     * @property attrName
     */
    /**
     * bubbles
     * @property bubbles
     */
    /**
     * button
     * @property button
     */
    /**
     * cancelable
     * @property cancelable
     */
    /**
     * charCode
     * @property charCode
     */
    /**
     * clientX
     * @property clientX
     */
    /**
     * clientY
     * @property clientY
     */
    /**
     * ctrlKey
     * @property ctrlKey
     */
    /**
     * data
     * @property data
     */
    /**
     * detail
     * @property detail
     */
    /**
     * eventPhase
     * @property eventPhase
     */
    /**
     * fromElement
     * @property fromElement
     */
    /**
     * handler
     * @property handler
     */
    /**
     * keyCode
     * @property keyCode
     */
    /**
     * metaKey
     * @property metaKey
     */
    /**
     * newValue
     * @property newValue
     */
    /**
     * offsetX
     * @property offsetX
     */
    /**
     * offsetY
     * @property offsetY
     */
    /**
     * pageX
     * @property pageX
     */
    /**
     * pageY
     * @property pageY
     */
    /**
     * prevValue
     * @property prevValue
     */
    /**
     * relatedNode
     * @property relatedNode
     */
    /**
     * relatedTarget
     * @property relatedTarget
     */
    /**
     * screenX
     * @property screenX
     */
    /**
     * screenY
     * @property screenY
     */
    /**
     * shiftKey
     * @property shiftKey
     */
    /**
     * srcElement
     * @property srcElement
     */
    /**
     * toElement
     * @property toElement
     */
    /**
     * view
     * @property view
     */
    /**
     * wheelDelta
     * @property wheelDelta
     */
    /**
     * which
     * @property which
     */
    /**
     * changedTouches
     * @property changedTouches
     */
    /**
     * touches
     * @property touches
     */
    /**
     * targetTouches
     * @property targetTouches
     */
    /**
     * rotation
     * @property rotation
     */
    /**
     * scale
     * @property scale
     */
    /**
     * source html node of current event
     * @property target
     * @type {HTMLElement}
     */
    /**
     * current htm node which processes current event
     * @property currentTarget
     * @type {HTMLElement}
     */
    DomEventObject.superclass.constructor.call(self);
    self.originalEvent = originalEvent;
    // in case dom event has been mark as default prevented by lower dom node
    var isDefaultPrevented = retFalse;
    if ('defaultPrevented' in originalEvent) {
      isDefaultPrevented = originalEvent.defaultPrevented ? retTrue : retFalse;
    } else if ('getPreventDefault' in originalEvent) {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
      isDefaultPrevented = originalEvent.getPreventDefault() ? retTrue : retFalse;
    } else if ('returnValue' in originalEvent) {
      isDefaultPrevented = originalEvent.returnValue === FALSE ? retTrue : retFalse;
    }
    self.isDefaultPrevented = isDefaultPrevented;
    var fixFns = [], fixFn, l, prop, props = commonProps.concat();
    util.each(eventNormalizers, function (normalizer) {
      if (type.match(normalizer.reg)) {
        props = props.concat(normalizer.props);
        if (normalizer.fix) {
          fixFns.push(normalizer.fix);
        }
      }
      return undefined;
    });
    l = props.length;
    // clone properties of the original event object
    while (l) {
      prop = props[--l];
      self[prop] = originalEvent[prop];
    }
    // fix target property, if necessary
    if (!self.target && isNative) {
      self.target = originalEvent.srcElement || DOCUMENT;
    }
    // check if target is a text node (safari)
    if (self.target && self.target.nodeType === 3) {
      self.target = self.target.parentNode;
    }
    l = fixFns.length;
    while (l) {
      fixFn = fixFns[--l];
      fixFn(self, originalEvent);
    }
    self.timeStamp = originalEvent.timeStamp || util.now();
  }
  util.extend(DomEventObject, BaseEvent.Object, {
    constructor: DomEventObject,
    preventDefault: function () {
      var self = this, e = self.originalEvent;
      // if preventDefault exists run it on the original event
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        // otherwise set the returnValue property of the original event to FALSE (IE)
        e.returnValue = FALSE;
      }
      DomEventObject.superclass.preventDefault.call(self);
    },
    stopPropagation: function () {
      var self = this, e = self.originalEvent;
      // if stopPropagation exists run it on the original event
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        // otherwise set the cancelBubble property of the original event to TRUE (IE)
        e.cancelBubble = TRUE;
      }
      DomEventObject.superclass.stopPropagation.call(self);
    }
  });
  exports = DomEventObject;
  return exports;
}();
eventDomBaseKeyCodes = function (exports) {
  exports = {};
  var KeyCode = {
    MAC_ENTER: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    QUESTION_MARK: 63,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    WIN_KEY_RIGHT: 92,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    WIN_KEY: 224,
    MAC_FF_META: 224,
    WIN_IME: 229
  };
  KeyCode.isTextModifyingKeyEvent = function (e) {
    var keyCode = e.keyCode;
    if (e.altKey && !e.ctrlKey || e.metaKey || keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false;
    }
    switch (keyCode) {
    case KeyCode.ALT:
    case KeyCode.CAPS_LOCK:
    case KeyCode.CONTEXT_MENU:
    case KeyCode.CTRL:
    case KeyCode.DOWN:
    case KeyCode.END:
    case KeyCode.ESC:
    case KeyCode.HOME:
    case KeyCode.INSERT:
    case KeyCode.LEFT:
    case KeyCode.MAC_FF_META:
    case KeyCode.META:
    case KeyCode.NUMLOCK:
    case KeyCode.NUM_CENTER:
    case KeyCode.PAGE_DOWN:
    case KeyCode.PAGE_UP:
    case KeyCode.PAUSE:
    case KeyCode.PRINT_SCREEN:
    case KeyCode.RIGHT:
    case KeyCode.SHIFT:
    case KeyCode.UP:
    case KeyCode.WIN_KEY:
    case KeyCode.WIN_KEY_RIGHT:
      return false;
    default:
      return true;
    }
  };
  KeyCode.isCharacterKey = function (keyCode) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }
    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }
    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    }
    if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
      return true;
    }
    switch (keyCode) {
    case KeyCode.SPACE:
    case KeyCode.QUESTION_MARK:
    case KeyCode.NUM_PLUS:
    case KeyCode.NUM_MINUS:
    case KeyCode.NUM_PERIOD:
    case KeyCode.NUM_DIVISION:
    case KeyCode.SEMICOLON:
    case KeyCode.DASH:
    case KeyCode.EQUALS:
    case KeyCode.COMMA:
    case KeyCode.PERIOD:
    case KeyCode.SLASH:
    case KeyCode.APOSTROPHE:
    case KeyCode.SINGLE_QUOTE:
    case KeyCode.OPEN_SQUARE_BRACKET:
    case KeyCode.BACKSLASH:
    case KeyCode.CLOSE_SQUARE_BRACKET:
      return true;
    default:
      return false;
    }
  };
  exports = KeyCode;
  return exports;
}();
eventDomBaseMouseenter = function (exports) {
  exports = {};
  var Dom = dom;
  var Special = eventDomBaseSpecial;
  var util = modulexUtil;
  util.each([
    {
      name: 'mouseenter',
      fix: 'mouseover'
    },
    {
      name: 'mouseleave',
      fix: 'mouseout'
    }
  ], function (o) {
    Special[o.name] = {
      typeFix: o.fix,
      handle: function (event, observer, ce) {
        var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
        if (!relatedTarget || relatedTarget !== currentTarget && !Dom.contains(currentTarget, relatedTarget)) {
          return [observer.simpleNotify(event, ce)];
        }
      }
    };
  });
  return exports;
}();
eventDomBaseObservable = function (exports) {
  exports = {};
  var util = modulexUtil;
  var BaseEvent = eventBase;
  var Dom = dom;
  var Special = eventDomBaseSpecial;
  var DomEventUtils = eventDomBaseUtils;
  var DomEventObserver = eventDomBaseObserver;
  var DomEventObject = eventDomBaseObject;
  var BaseUtils = BaseEvent.Utils;
  function DomEventObservable(cfg) {
    var self = this;
    util.mix(self, cfg);
    self.reset();
  }
  util.extend(DomEventObservable, BaseEvent.Observable, {
    constructor: DomEventObservable,
    setup: function () {
      var self = this, type = self.type, s = Special[type] || {}, currentTarget = self.currentTarget, eventDesc = DomEventUtils.data(currentTarget), handle = eventDesc.handle;
      if (!s.setup || s.setup.call(currentTarget, type) === false) {
        DomEventUtils.simpleAdd(currentTarget, type, handle);
      }
    },
    reset: function () {
      var self = this;
      DomEventObservable.superclass.reset.call(self);
      self.delegateCount = 0;
      self.lastCount = 0;
    },
    notify: function (event) {
      var target = event.target, eventType = event.type, self = this, currentTarget = self.currentTarget, observers = self.observers, allObservers = [], currentTarget0, ret, gRet, observerObj, i, j, len, delegateCount = self.delegateCount || 0, currentTargetObservers, currentTargetObserver, observer;
      if (delegateCount && target.nodeType) {
        while (target !== currentTarget) {
          if (target.disabled !== true || eventType !== 'click') {
            var cachedMatch = {}, matched, key, filter;
            currentTargetObservers = [];
            for (i = 0; i < delegateCount; i++) {
              observer = observers[i];
              filter = observer.config.filter;
              key = filter + '';
              matched = cachedMatch[key];
              if (matched === undefined) {
                matched = cachedMatch[key] = Dom.test(target, filter);
              }
              if (matched) {
                currentTargetObservers.push(observer);
              }
            }
            if (currentTargetObservers.length) {
              allObservers.push({
                currentTarget: target,
                currentTargetObservers: currentTargetObservers
              });
            }
          }
          target = target.parentNode || currentTarget;
        }
      }
      if (delegateCount < observers.length) {
        allObservers.push({
          currentTarget: currentTarget,
          currentTargetObservers: observers.slice(delegateCount)
        });
      }
      for (i = 0, len = allObservers.length; !event.isPropagationStopped() && i < len; ++i) {
        observerObj = allObservers[i];
        currentTargetObservers = observerObj.currentTargetObservers;
        currentTarget0 = observerObj.currentTarget;
        event.currentTarget = currentTarget0;
        for (j = 0; !event.isImmediatePropagationStopped() && j < currentTargetObservers.length; j++) {
          currentTargetObserver = currentTargetObservers[j];
          ret = currentTargetObserver.notify(event, self);
          if (gRet !== false && ret !== undefined) {
            gRet = ret;
          }
        }
      }
      return gRet;
    },
    fire: function (event, onlyHandlers) {
      event = event || {};
      var self = this, eventType = String(self.type), domEventObservable, eventData, specialEvent = Special[eventType] || {}, bubbles = specialEvent.bubbles !== false, currentTarget = self.currentTarget;
      if (specialEvent.fire && specialEvent.fire.call(currentTarget, onlyHandlers) === false) {
        return;
      }
      if (!event.isEventObject) {
        eventData = event;
        event = new DomEventObject({ type: eventType });
        util.mix(event, eventData);
      }
      event.currentTarget = currentTarget;
      event.target = event.target || currentTarget;
      if (specialEvent.preFire && specialEvent.preFire.call(currentTarget, event, onlyHandlers) === false) {
        return;
      }
      var cur = currentTarget, win = Dom.getWindow(cur), curDocument = win.document, eventPath = [], gret, ret, ontype = 'on' + eventType, eventPathIndex = 0;
      do {
        eventPath.push(cur);
        cur = cur.parentNode || cur.ownerDocument || cur === curDocument && win;
      } while (!onlyHandlers && cur && bubbles);
      cur = eventPath[eventPathIndex];
      do {
        event.currentTarget = cur;
        domEventObservable = DomEventObservable.getDomEventObservable(cur, eventType);
        if (domEventObservable) {
          ret = domEventObservable.notify(event);
          if (ret !== undefined && gret !== false) {
            gret = ret;
          }
        }
        if (cur[ontype] && cur[ontype].call(cur) === false) {
          event.preventDefault();
        }
        cur = eventPath[++eventPathIndex];
      } while (!onlyHandlers && cur && !event.isPropagationStopped());
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        try {
          if (currentTarget[eventType] && !util.isWindow(currentTarget)) {
            DomEventObservable.triggeredEvent = eventType;
            currentTarget[eventType]();
          }
        } catch (eError) {
          console.error('event-dom: trigger action error: ' + eError);
        }
        DomEventObservable.triggeredEvent = '';
      }
      return gret;
    },
    on: function (cfg) {
      var self = this, observers = self.observers, s = Special[self.type] || {}, observer = cfg instanceof DomEventObserver ? cfg : new DomEventObserver(cfg);
      if (self.findObserver(observer) === -1) {
        if (observer.config.filter) {
          observers.splice(self.delegateCount, 0, observer);
          self.delegateCount++;
        } else {
          if (observer.config.last) {
            observers.push(observer);
            self.lastCount++;
          } else {
            observers.splice(observers.length - self.lastCount, 0, observer);
          }
        }
        if (s.add) {
          s.add.call(self.currentTarget, observer);
        }
      }
    },
    detach: function (cfg) {
      var groupsRe, self = this, s = Special[self.type] || {}, hasFilter = 'filter' in cfg, filter = cfg.filter, context = cfg.context, fn = cfg.fn, currentTarget = self.currentTarget, observers = self.observers, groups = cfg.groups;
      if (!observers.length) {
        return;
      }
      if (groups) {
        groupsRe = BaseUtils.getGroupsRe(groups);
      }
      var i, j, t, observer, observerContext, len = observers.length;
      if (fn || hasFilter || groupsRe) {
        context = context || currentTarget;
        for (i = 0, j = 0, t = []; i < len; ++i) {
          observer = observers[i];
          var observerConfig = observer.config;
          observerContext = observerConfig.context || currentTarget;
          if (context !== observerContext || fn && fn !== observerConfig.fn || hasFilter && (filter && filter !== observerConfig.filter || !filter && !observerConfig.filter) || groupsRe && !observerConfig.groups.match(groupsRe)) {
            t[j++] = observer;
          } else {
            if (observerConfig.filter && self.delegateCount) {
              self.delegateCount--;
            }
            if (observerConfig.last && self.lastCount) {
              self.lastCount--;
            }
            if (s.remove) {
              s.remove.call(currentTarget, observer);
            }
          }
        }
        self.observers = t;
      } else {
        self.reset();
      }
      self.checkMemory();
    },
    checkMemory: function () {
      var self = this, type = self.type, domEventObservables, handle, s = Special[type] || {}, currentTarget = self.currentTarget, eventDesc = DomEventUtils.data(currentTarget);
      if (eventDesc) {
        domEventObservables = eventDesc.observables;
        if (!self.hasObserver()) {
          handle = eventDesc.handle;
          if (!s.tearDown || s.tearDown.call(currentTarget, type) === false) {
            DomEventUtils.simpleRemove(currentTarget, type, handle);
          }
          delete domEventObservables[type];
        }
        if (util.isEmptyObject(domEventObservables)) {
          eventDesc.handle = null;
          DomEventUtils.removeData(currentTarget);
        }
      }
    }
  });
  DomEventObservable.triggeredEvent = '';
  DomEventObservable.getDomEventObservable = function (node, type) {
    var domEventObservablesHolder = DomEventUtils.data(node), domEventObservables;
    if (domEventObservablesHolder) {
      domEventObservables = domEventObservablesHolder.observables;
    }
    if (domEventObservables) {
      return domEventObservables[type];
    }
    return null;
  };
  DomEventObservable.getDomEventObservablesHolder = function (node, create) {
    var domEventObservables = DomEventUtils.data(node);
    if (!domEventObservables && create) {
      DomEventUtils.data(node, domEventObservables = {});
    }
    return domEventObservables;
  };
  exports = DomEventObservable;
  return exports;
}();
eventDomBaseDomEvent = function (exports) {
  exports = {};
  var BaseEvent = eventBase;
  var DomEventUtils = eventDomBaseUtils;
  var Dom = dom;
  var Special = eventDomBaseSpecial;
  var DomEventObservable = eventDomBaseObservable;
  var DomEventObject = eventDomBaseObject;
  var util = modulexUtil;
  var BaseUtils = BaseEvent.Utils;
  function fixType(cfg, type) {
    var s = Special[type] || {}, typeFix;
    if (!cfg.originalType && (typeFix = s.typeFix)) {
      cfg.originalType = type;
      type = typeFix;
    }
    return type;
  }
  function addInternal(currentTarget, type, cfg) {
    var domEventObservablesHolder, domEventObservable, domEventObservables, handle;
    cfg = util.merge(cfg);
    type = fixType(cfg, type);
    domEventObservablesHolder = DomEventObservable.getDomEventObservablesHolder(currentTarget, 1);
    if (!(handle = domEventObservablesHolder.handle)) {
      handle = domEventObservablesHolder.handle = function (event) {
        var type = event.type, domEventObservable, currentTarget = handle.currentTarget;
        if (DomEventObservable.triggeredEvent === type) {
          return undefined;
        }
        domEventObservable = DomEventObservable.getDomEventObservable(currentTarget, type);
        if (domEventObservable) {
          event.currentTarget = currentTarget;
          event = new DomEventObject(event);
          return domEventObservable.notify(event);
        }
        return undefined;
      };
      handle.currentTarget = currentTarget;
    }
    if (!(domEventObservables = domEventObservablesHolder.observables)) {
      domEventObservables = domEventObservablesHolder.observables = {};
    }
    domEventObservable = domEventObservables[type];
    if (!domEventObservable) {
      domEventObservable = domEventObservables[type] = new DomEventObservable({
        type: type,
        currentTarget: currentTarget
      });
      domEventObservable.setup();
    }
    domEventObservable.on(cfg);
    currentTarget = null;
  }
  function removeInternal(currentTarget, type, cfg) {
    cfg = util.merge(cfg);
    var customEvent;
    type = fixType(cfg, type);
    var domEventObservablesHolder = DomEventObservable.getDomEventObservablesHolder(currentTarget), domEventObservables = (domEventObservablesHolder || {}).observables;
    if (!domEventObservablesHolder || !domEventObservables) {
      return;
    }
    if (!type) {
      for (type in domEventObservables) {
        domEventObservables[type].detach(cfg);
      }
      return;
    }
    customEvent = domEventObservables[type];
    if (customEvent) {
      customEvent.detach(cfg);
    }
  }
  var DomEvent = {
    on: function (targets, type, fn, context) {
      targets = Dom.query(targets);
      BaseUtils.batchForType(function (targets, type, fn, context) {
        var cfg = BaseUtils.normalizeParam(type, fn, context), i, t;
        type = cfg.type;
        for (i = targets.length - 1; i >= 0; i--) {
          t = targets[i];
          addInternal(t, type, cfg);
        }
      }, 1, targets, type, fn, context);
      return targets;
    },
    detach: function (targets, type, fn, context) {
      targets = Dom.query(targets);
      BaseUtils.batchForType(function (targets, singleType, fn, context) {
        var cfg = BaseUtils.normalizeParam(singleType, fn, context), i, j, elChildren, t;
        singleType = cfg.type;
        for (i = targets.length - 1; i >= 0; i--) {
          t = targets[i];
          removeInternal(t, singleType, cfg);
          if (cfg.deep && t.getElementsByTagName) {
            elChildren = t.getElementsByTagName('*');
            for (j = elChildren.length - 1; j >= 0; j--) {
              removeInternal(elChildren[j], singleType, cfg);
            }
          }
        }
      }, 1, targets, type, fn, context);
      return targets;
    },
    delegate: function (targets, eventType, filter, fn, context) {
      return DomEvent.on(targets, eventType, {
        fn: fn,
        context: context,
        filter: filter
      });
    },
    undelegate: function (targets, eventType, filter, fn, context) {
      return DomEvent.detach(targets, eventType, {
        fn: fn,
        context: context,
        filter: filter
      });
    },
    fire: function (targets, eventType, eventData, onlyHandlers) {
      var ret;
      if (eventType.isEventObject) {
        eventData = eventType;
        eventType = eventType.type;
      }
      eventData = eventData || {};
      eventData.synthetic = 1;
      BaseUtils.splitAndRun(eventType, function (eventType) {
        var r, i, target, domEventObservable;
        BaseUtils.fillGroupsForEvent(eventType, eventData);
        eventType = eventData.type;
        var s = Special[eventType];
        var originalType = eventType;
        if (s && s.typeFix) {
          originalType = s.typeFix;
        }
        targets = Dom.query(targets);
        for (i = targets.length - 1; i >= 0; i--) {
          target = targets[i];
          domEventObservable = DomEventObservable.getDomEventObservable(target, originalType);
          if (!onlyHandlers && !domEventObservable) {
            domEventObservable = new DomEventObservable({
              type: originalType,
              currentTarget: target
            });
          }
          if (domEventObservable) {
            r = domEventObservable.fire(eventData, onlyHandlers);
            if (ret !== false && r !== undefined) {
              ret = r;
            }
          }
        }
      });
      return ret;
    },
    fireHandler: function (targets, eventType, eventData) {
      return DomEvent.fire(targets, eventType, eventData, 1);
    },
    clone: function (src, dest) {
      var domEventObservablesHolder, domEventObservables;
      if (!(domEventObservablesHolder = DomEventObservable.getDomEventObservablesHolder(src))) {
        return;
      }
      var srcData = DomEventUtils.data(src);
      if (srcData && srcData === DomEventUtils.data(dest)) {
        DomEventUtils.removeData(dest);
      }
      domEventObservables = domEventObservablesHolder.observables;
      util.each(domEventObservables, function (customEvent, type) {
        util.each(customEvent.observers, function (observer) {
          addInternal(dest, type, observer.config);
        });
      });
    },
    getEventListeners: function (target, type) {
      var observables = (DomEventObservable.getDomEventObservablesHolder(target) || { observables: {} }).observables;
      return type ? observables[type] : observables;
    }
  };
  exports = DomEvent;
  return exports;
}();
eventDomBaseSpecialEvents = function (exports) {
  exports = {};
  var DomEvent = eventDomBaseDomEvent;
  var Special = eventDomBaseSpecial;
  var util = modulexUtil;
  var UA = ua, MOUSE_WHEEL = UA.gecko ? 'DOMMouseScroll' : 'mousewheel';
  exports = util.mix(Special, {
    mousewheel: { typeFix: MOUSE_WHEEL },
    load: { bubbles: false },
    click: {
      fire: function (onlyHandlers) {
        var self = this;
        if (!onlyHandlers && String(self.type) === 'checkbox' && self.click && self.nodeName.toLowerCase() === 'input') {
          self.click();
          return false;
        }
        return undefined;
      }
    },
    focus: {
      bubbles: false,
      preFire: function (event, onlyHandlers) {
        if (!onlyHandlers) {
          return DomEvent.fire(this, 'focusin');
        }
      },
      fire: function (onlyHandlers) {
        var self = this;
        if (!onlyHandlers && self.ownerDocument) {
          if (self !== self.ownerDocument.activeElement && self.focus) {
            self.focus();
            return false;
          }
        }
        return undefined;
      }
    },
    blur: {
      bubbles: false,
      preFire: function (event, onlyHandlers) {
        if (!onlyHandlers) {
          return DomEvent.fire(this, 'focusout');
        }
      },
      fire: function (onlyHandlers) {
        var self = this;
        if (!onlyHandlers && self.ownerDocument) {
          if (self === self.ownerDocument.activeElement && self.blur) {
            self.blur();
            return false;
          }
        }
        return undefined;
      }
    }
  });
  return exports;
}();
eventDomBase = function (exports) {
  exports = {};
  var DomEvent = eventDomBaseDomEvent;
  var DomEventObject = eventDomBaseObject;
  var KeyCode = eventDomBaseKeyCodes;
  var Special = eventDomBaseSpecialEvents;
  var Utils = eventDomBaseUtils;
  eventDomBaseMouseenter;
  var util = modulexUtil;
  exports = util.merge({
    version: '1.0.1',
    add: DomEvent.on,
    remove: DomEvent.detach,
    KeyCode: KeyCode,
    Observable: eventDomBaseObservable,
    Special: Special,
    Object: DomEventObject,
    Utils: Utils
  }, DomEvent);
  return exports;
}();
module.exports = eventDomBase;
});