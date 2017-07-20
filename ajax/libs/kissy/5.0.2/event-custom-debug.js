/*
Copyright 2014, modulex-event-custom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:33:51 GMT
*/
modulex.add("event-custom", ["modulex-event-base","modulex-util"], function(require, exports, module) {
var modulexEventBase = require("modulex-event-base");
var modulexUtil = require("modulex-util");
/*
combined modules:
event-custom
event-custom/target
event-custom/observable
event-custom/observer
event-custom/object
*/
var eventCustomObserver, eventCustomObject, eventCustomObservable, eventCustomTarget, eventCustom;
eventCustomObserver = function (exports) {
  exports = {};
  /**
   * @ignore
   * Observer for custom event
   * @author yiminghe@gmail.com
   */
  var BaseEvent = modulexEventBase;
  var util = modulexUtil;
  /**
   * Observer for custom event
   * @class CustomEvent.Observer
   * @extends Event.Observer
   * @private
   */
  function CustomEventObserver() {
    CustomEventObserver.superclass.constructor.apply(this, arguments);
  }
  util.extend(CustomEventObserver, BaseEvent.Observer, {
    keys: [
      'fn',
      'context',
      'groups'
    ]
  });
  exports = CustomEventObserver;
  return exports;
}();
eventCustomObject = function (exports) {
  exports = {};
  /**
   * @ignore
   * simple custom event object for custom event mechanism.
   * @author yiminghe@gmail.com
   */
  var BaseEvent = modulexEventBase;
  var util = modulexUtil;
  /**
   * Do not new by yourself.
   *
   * Custom event object.
   * @private
   * @class CustomEvent.Object
   * @param {Object} data data which will be mixed into custom event instance
   * @extends Event.Object
   */
  function CustomEventObject(data) {
    CustomEventObject.superclass.constructor.call(this);
    util.mix(this, data);
  }
  util.extend(CustomEventObject, BaseEvent.Object);
  exports = CustomEventObject;
  return exports;
}();
eventCustomObservable = function (exports) {
  exports = {};
  var BaseEvent = modulexEventBase;
  var CustomEventObserver = eventCustomObserver;
  var CustomEventObject = eventCustomObject;
  var Utils = BaseEvent.Utils;
  var util = modulexUtil;
  function CustomEventObservable() {
    var self = this;
    CustomEventObservable.superclass.constructor.apply(self, arguments);
    self.defaultFn = null;
    self.defaultTargetOnly = false;
    self.bubbles = true;
  }
  util.extend(CustomEventObservable, BaseEvent.Observable, {
    on: function (cfg) {
      var observer = new CustomEventObserver(cfg);
      if (this.findObserver(observer) === -1) {
        this.observers.push(observer);
      }
    },
    fire: function (eventData) {
      eventData = eventData || {};
      var self = this, bubbles = self.bubbles, currentTarget = self.currentTarget, parents, parentsLen, type = self.type, defaultFn = self.defaultFn, i, customEventObject = eventData, gRet, ret;
      eventData.type = type;
      if (!customEventObject.isEventObject) {
        customEventObject = new CustomEventObject(customEventObject);
      }
      customEventObject.target = customEventObject.target || currentTarget;
      customEventObject.currentTarget = currentTarget;
      ret = self.notify(customEventObject);
      if (gRet !== false && ret !== undefined) {
        gRet = ret;
      }
      if (bubbles && !customEventObject.isPropagationStopped()) {
        parents = currentTarget.getTargets();
        parentsLen = parents && parents.length || 0;
        for (i = 0; i < parentsLen && !customEventObject.isPropagationStopped(); i++) {
          ret = parents[i].fire(type, customEventObject);
          if (gRet !== false && ret !== undefined) {
            gRet = ret;
          }
        }
      }
      if (defaultFn && !customEventObject.isDefaultPrevented()) {
        var target = customEventObject.target, lowestCustomEventObservable = target.getEventListeners(customEventObject.type);
        if (!self.defaultTargetOnly && (!lowestCustomEventObservable || !lowestCustomEventObservable.defaultTargetOnly) || currentTarget === target) {
          gRet = defaultFn.call(currentTarget, customEventObject);
        }
      }
      return gRet;
    },
    notify: function (event) {
      var observers = [].concat(this.observers), ret, gRet, len = observers.length, i;
      for (i = 0; i < len && !event.isImmediatePropagationStopped(); i++) {
        ret = observers[i].notify(event, this);
        if (gRet !== false && ret !== undefined) {
          gRet = ret;
        }
      }
      return gRet;
    },
    detach: function (cfg) {
      var groupsRe, self = this, fn = cfg.fn, context = cfg.context, currentTarget = self.currentTarget, observers = self.observers, groups = cfg.groups;
      if (!observers.length) {
        return;
      }
      if (groups) {
        groupsRe = Utils.getGroupsRe(groups);
      }
      var i, j, t, observer, observerContext, len = observers.length;
      if (fn || groupsRe) {
        context = context || currentTarget;
        for (i = 0, j = 0, t = []; i < len; ++i) {
          observer = observers[i];
          var observerConfig = observer.config;
          observerContext = observerConfig.context || currentTarget;
          if (context !== observerContext || fn && fn !== observerConfig.fn || groupsRe && !observerConfig.groups.match(groupsRe)) {
            t[j++] = observer;
          }
        }
        self.observers = t;
      } else {
        self.reset();
      }
    }
  });
  exports = CustomEventObservable;
  return exports;
}();
eventCustomTarget = function (exports) {
  exports = {};
  var BaseEvent = modulexEventBase;
  var CustomEventObservable = eventCustomObservable;
  var util = modulexUtil;
  var Utils = BaseEvent.Utils, splitAndRun = Utils.splitAndRun, KS_BUBBLE_TARGETS = '__~ks_bubble_targets';
  var KS_CUSTOM_EVENTS = '__~ks_custom_events';
  function getCustomEventObservable(self, type) {
    var customEvent = self.getEventListeners(type);
    if (!customEvent) {
      customEvent = self.getEventListeners()[type] = new CustomEventObservable({
        currentTarget: self,
        type: type
      });
    }
    return customEvent;
  }
  exports = {
    isTarget: 1,
    fire: function (type, eventData) {
      var self = this, ret, targets = self.getTargets(), hasTargets = targets && targets.length;
      if (type.isEventObject) {
        eventData = type;
        type = type.type;
      }
      eventData = eventData || {};
      splitAndRun(type, function (type) {
        var r2, customEventObservable;
        Utils.fillGroupsForEvent(type, eventData);
        type = eventData.type;
        customEventObservable = self.getEventListeners(type);
        if (!customEventObservable && !hasTargets) {
          return;
        }
        if (customEventObservable) {
          if (!customEventObservable.hasObserver() && !customEventObservable.defaultFn) {
            if (customEventObservable.bubbles && !hasTargets || !customEventObservable.bubbles) {
              return;
            }
          }
        } else {
          customEventObservable = new CustomEventObservable({
            currentTarget: self,
            type: type
          });
        }
        r2 = customEventObservable.fire(eventData);
        if (ret !== false && r2 !== undefined) {
          ret = r2;
        }
      });
      return ret;
    },
    publish: function (type, cfg) {
      var customEventObservable, self = this;
      splitAndRun(type, function (t) {
        customEventObservable = getCustomEventObservable(self, t);
        util.mix(customEventObservable, cfg);
      });
      return self;
    },
    addTarget: function (anotherTarget) {
      var self = this, targets = self.getTargets();
      if (!util.inArray(anotherTarget, targets)) {
        targets.push(anotherTarget);
      }
      return self;
    },
    removeTarget: function (anotherTarget) {
      var self = this, targets = self.getTargets(), index = util.indexOf(anotherTarget, targets);
      if (index !== -1) {
        targets.splice(index, 1);
      }
      return self;
    },
    getTargets: function () {
      return this[KS_BUBBLE_TARGETS] || (this[KS_BUBBLE_TARGETS] = []);
    },
    getEventListeners: function (type) {
      var observables = this[KS_CUSTOM_EVENTS] || (this[KS_CUSTOM_EVENTS] = {});
      return type ? observables[type] : observables;
    },
    on: function (type, fn, context) {
      var self = this;
      Utils.batchForType(function (type, fn, context) {
        var cfg = Utils.normalizeParam(type, fn, context);
        type = cfg.type;
        var customEvent = getCustomEventObservable(self, type);
        customEvent.on(cfg);
      }, 0, type, fn, context);
      return self;
    },
    detach: function (type, fn, context) {
      var self = this;
      Utils.batchForType(function (type, fn, context) {
        var cfg = Utils.normalizeParam(type, fn, context);
        type = cfg.type;
        if (type) {
          var customEvent = self.getEventListeners(type);
          if (customEvent) {
            customEvent.detach(cfg);
          }
        } else {
          util.each(self.getEventListeners(), function (customEvent) {
            customEvent.detach(cfg);
          });
        }
      }, 0, type, fn, context);
      return self;
    }
  };
  return exports;
}();
eventCustom = function (exports) {
  exports = {};
  var Target = eventCustomTarget;
  var util = modulexUtil;
  exports = {
    version: '1.0.1',
    Target: Target,
    Object: eventCustomObject,
    global: util.mix({}, Target)
  };
  return exports;
}();
module.exports = eventCustom;
});