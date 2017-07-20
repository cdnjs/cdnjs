/*
Copyright 2014, modulex-event-base@1.0.2
MIT Licensed
build time: Thu, 16 Oct 2014 04:19:33 GMT
*/
modulex.add("event-base", ["modulex-util"], function(require, exports, module) {
var modulexUtil = require("modulex-util");
/*
combined modules:
event-base
event-base/utils
event-base/observer
event-base/observable
event-base/object
*/
var eventBaseUtils, eventBaseObserver, eventBaseObservable, eventBaseObject, eventBase;
eventBaseUtils = function (exports) {
  exports = {};
  /**
   * @ignore
   * utils for event
   * @author yiminghe@gmail.com
   */
  var splitAndRun, getGroupsRe;
  var util = modulexUtil;
  function getTypedGroups(type) {
    if (type.indexOf('.') < 0) {
      return [
        type,
        ''
      ];
    }
    var m = type.match(/([^.]+)?(\..+)?$/), t = m[1], ret = [t], gs = m[2];
    if (gs) {
      gs = gs.split('.').sort();
      ret.push(gs.join('.'));
    } else {
      ret.push('');
    }
    return ret;
  }
  exports = {
    splitAndRun: splitAndRun = function (type, fn) {
      if (util.isArray(type)) {
        util.each(type, fn);
        return;
      }
      type = util.trim(type);
      if (type.indexOf(' ') === -1) {
        fn(type);
      } else {
        util.each(type.split(/\s+/), fn);
      }
    },
    normalizeParam: function (type, fn, context) {
      var cfg = fn || {};
      if (typeof fn === 'function') {
        cfg = {
          fn: fn,
          context: context
        };
      } else {
        cfg = util.merge(cfg);
      }
      var typedGroups = getTypedGroups(type);
      type = typedGroups[0];
      cfg.groups = typedGroups[1];
      cfg.type = type;
      return cfg;
    },
    batchForType: function (fn, num) {
      var args = util.makeArray(arguments), types = args[2 + num];
      if (types && util.isObject(types)) {
        util.each(types, function (value, type) {
          var args2 = [].concat(args);
          args2.splice(0, 2);
          args2[num] = type;
          args2[num + 1] = value;
          fn.apply(null, args2);
        });
      } else {
        splitAndRun(types, function (type) {
          var args2 = [].concat(args);
          args2.splice(0, 2);
          args2[num] = type;
          fn.apply(null, args2);
        });
      }
    },
    fillGroupsForEvent: function (type, eventData) {
      var typedGroups = getTypedGroups(type), _ksGroups = typedGroups[1];
      if (_ksGroups) {
        _ksGroups = getGroupsRe(_ksGroups);
        eventData._ksGroups = _ksGroups;
      }
      eventData.type = typedGroups[0];
    },
    getGroupsRe: getGroupsRe = function (groups) {
      return new RegExp(groups.split('.').join('.*\\.') + '(?:\\.|$)');
    }
  };
  return exports;
}();
eventBaseObserver = function (exports) {
  exports = {};
  var undef;
  var util = modulexUtil;
  function Observer(cfg) {
    this.config = cfg || {};
  }
  Observer.prototype = {
    constructor: Observer,
    equals: function (s2) {
      var self = this;
      return !!util.reduce(self.keys, function (v, k) {
        return v && self.config[k] === s2.config[k];
      }, 1);
    },
    simpleNotify: function (event, ce) {
      var ret, self = this, config = self.config;
      ret = config.fn.call(config.context || ce.currentTarget, event, config.data);
      if (config.once) {
        ce.removeObserver(self);
      }
      return ret;
    },
    notifyInternal: function (event, ce) {
      var ret = this.simpleNotify(event, ce);
      if (ret === false) {
        event.halt();
      }
      return ret;
    },
    notify: function (event, ce) {
      var self = this, config = self.config, _ksGroups = event._ksGroups;
      if (_ksGroups && (!config.groups || !config.groups.match(_ksGroups))) {
        return undef;
      }
      return self.notifyInternal(event, ce);
    }
  };
  exports = Observer;
  return exports;
}();
eventBaseObservable = function (exports) {
  exports = {};
  var util = modulexUtil;
  function Observable(cfg) {
    var self = this;
    self.currentTarget = null;
    util.mix(self, cfg);
    self.reset();
  }
  Observable.prototype = {
    constructor: Observable,
    hasObserver: function () {
      return !!this.observers.length;
    },
    reset: function () {
      var self = this;
      self.observers = [];
    },
    removeObserver: function (observer) {
      var self = this, i, observers = self.observers, len = observers.length;
      for (i = 0; i < len; i++) {
        if (observers[i] === observer) {
          observers.splice(i, 1);
          break;
        }
      }
      self.checkMemory();
    },
    checkMemory: function () {
    },
    findObserver: function (observer) {
      var observers = this.observers, i;
      for (i = observers.length - 1; i >= 0; --i) {
        if (observer.equals(observers[i])) {
          return i;
        }
      }
      return -1;
    }
  };
  exports = Observable;
  return exports;
}();
eventBaseObject = function (exports) {
  exports = {};
  var returnFalse = function () {
      return false;
    }, returnTrue = function () {
      return true;
    }, undef;
  var util = modulexUtil;
  function EventObject() {
    var self = this;
    self.timeStamp = util.now();
    self.target = undef;
    self.currentTarget = undef;
  }
  EventObject.prototype = {
    isEventObject: 1,
    constructor: EventObject,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function () {
      this.isDefaultPrevented = returnTrue;
    },
    stopPropagation: function () {
      this.isPropagationStopped = returnTrue;
    },
    stopImmediatePropagation: function () {
      var self = this;
      self.isImmediatePropagationStopped = returnTrue;
      self.stopPropagation();
    },
    halt: function (immediate) {
      var self = this;
      if (immediate) {
        self.stopImmediatePropagation();
      } else {
        self.stopPropagation();
      }
      self.preventDefault();
    }
  };
  exports = EventObject;
  return exports;
}();
eventBase = function (exports) {
  exports = {};
  var Utils = eventBaseUtils;
  var Observer = eventBaseObserver;
  var Observable = eventBaseObservable;
  exports = {
    version: '1.0.2',
    Utils: Utils,
    Object: eventBaseObject,
    Observer: Observer,
    Observable: Observable
  };
  return exports;
}();
module.exports = eventBase;
});