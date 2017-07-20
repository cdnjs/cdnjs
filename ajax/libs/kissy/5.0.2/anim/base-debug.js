/*
Copyright 2014, modulex-anim@1.0.2
MIT Licensed
build time: Thu, 16 Oct 2014 06:46:47 GMT
*/
modulex.add("anim/base", ["dom","util","promise"], function(require, exports, module) {
var dom = require("dom");
var _util_ = require("util");
var promise = require("promise");
/*
combined modules:
anim/base
anim/base/utils
anim/base/queue
*/
var animBaseQueue, animBaseUtils, animBase;
animBaseQueue = function (exports) {
  /**
   * @ignore queue data structure
   * @author yiminghe@gmail.com
   */
  var Dom = dom;
  var util = _util_;
  var
    // 队列集合容器
    queueCollectionKey = util.guid('ks-queue-' + util.now() + '-'),
    // 默认队列
    queueKey = util.guid('ks-queue-' + util.now() + '-'), Q;
  function getQueue(node, name, readOnly) {
    name = name || queueKey;
    var qu, quCollection = Dom.data(node, queueCollectionKey);
    if (!quCollection && !readOnly) {
      Dom.data(node, queueCollectionKey, quCollection = {});
    }
    if (quCollection) {
      qu = quCollection[name];
      if (!qu && !readOnly) {
        qu = quCollection[name] = [];
      }
    }
    return qu;
  }
  Q = {
    queueCollectionKey: queueCollectionKey,
    queue: function (node, queue, item) {
      var qu = getQueue(node, queue);
      qu.push(item);
      return qu;
    },
    remove: function (node, queue, item) {
      var qu = getQueue(node, queue, 1), index;
      if (qu) {
        index = util.indexOf(item, qu);
        if (index > -1) {
          qu.splice(index, 1);
        }
      }
      if (qu && !qu.length) {
        // remove queue data
        Q.clearQueue(node, queue);
      }
      return qu;
    },
    clearQueues: function (node) {
      Dom.removeData(node, queueCollectionKey);
    },
    clearQueue: function clearQueue(node, queue) {
      queue = queue || queueKey;
      var quCollection = Dom.data(node, queueCollectionKey);
      if (quCollection) {
        delete quCollection[queue];
      }
      if (util.isEmptyObject(quCollection)) {
        Dom.removeData(node, queueCollectionKey);
      }
    },
    dequeue: function (node, queue) {
      var qu = getQueue(node, queue, 1);
      if (qu) {
        qu.shift();
        if (!qu.length) {
          // remove queue data
          Q.clearQueue(node, queue);
        }
      }
      return qu;
    }
  };
  exports = Q;
  return exports;
}();
animBaseUtils = function (exports) {
  var Q = animBaseQueue, util = _util_, Dom = dom;
  var runningKey = util.guid('ks-anim-unqueued-' + util.now() + '-');
  function saveRunningAnim(anim) {
    var node = anim.node, allRunning = Dom.data(node, runningKey);
    if (!allRunning) {
      Dom.data(node, runningKey, allRunning = {});
    }
    allRunning[util.stamp(anim)] = anim;
  }
  function removeRunningAnim(anim) {
    var node = anim.node, allRunning = Dom.data(node, runningKey);
    if (allRunning) {
      delete allRunning[util.stamp(anim)];
      if (util.isEmptyObject(allRunning)) {
        Dom.removeData(node, runningKey);
      }
    }
  }
  function isAnimRunning(anim) {
    var node = anim.node, allRunning = Dom.data(node, runningKey);
    if (allRunning) {
      return !!allRunning[util.stamp(anim)];
    }
    return 0;
  }
  var pausedKey = util.guid('ks-anim-paused-' + util.now() + '-');
  function savePausedAnim(anim) {
    var node = anim.node, paused = Dom.data(node, pausedKey);
    if (!paused) {
      Dom.data(node, pausedKey, paused = {});
    }
    paused[util.stamp(anim)] = anim;
  }
  function removePausedAnim(anim) {
    var node = anim.node, paused = Dom.data(node, pausedKey);
    if (paused) {
      delete paused[util.stamp(anim)];
      if (util.isEmptyObject(paused)) {
        Dom.removeData(node, pausedKey);
      }
    }
  }
  function isAnimPaused(anim) {
    var node = anim.node, paused = Dom.data(node, pausedKey);
    if (paused) {
      return !!paused[util.stamp(anim)];
    }
    return 0;
  }
  function pauseOrResumeQueue(node, queue, action) {
    var allAnims = Dom.data(node, action === 'resume' ? pausedKey : runningKey), anims = util.merge(allAnims);
    util.each(anims, function (anim) {
      if (queue === undefined || anim.config.queue === queue) {
        anim[action]();
      }
    });
  }
  exports = {
    saveRunningAnim: saveRunningAnim,
    removeRunningAnim: removeRunningAnim,
    isAnimPaused: isAnimPaused,
    removePausedAnim: removePausedAnim,
    savePausedAnim: savePausedAnim,
    isAnimRunning: isAnimRunning,
    isElPaused: function (node) {
      var paused = Dom.data(node, pausedKey);
      return paused && !util.isEmptyObject(paused);
    },
    isElRunning: function (node) {
      var allRunning = Dom.data(node, runningKey);
      return allRunning && !util.isEmptyObject(allRunning);
    },
    pauseOrResumeQueue: pauseOrResumeQueue,
    stopEl: function (node, end, clearQueue, queue) {
      if (clearQueue) {
        if (queue === undefined) {
          Q.clearQueues(node);
        } else if (queue !== false) {
          Q.clearQueue(node, queue);
        }
      }
      var allRunning = Dom.data(node, runningKey), anims = util.merge(allRunning);
      util.each(anims, function (anim) {
        if (queue === undefined || anim.config.queue === queue) {
          anim.stop(end);
        }
      });
    }
  };
  return exports;
}();
animBase = function (exports) {
  var Dom = dom, Utils = animBaseUtils, Q = animBaseQueue;
  var Promise = promise;
  var util = _util_, NodeType = Dom.NodeType, camelCase = util.camelCase, noop = util.noop, specialVals = {
      toggle: 1,
      hide: 1,
      show: 1
    };
  var undef;
  var defaultConfig = {
    duration: 1,
    easing: 'linear'
  };
  function syncComplete(self) {
    var _backupProps, complete = self.config.complete;
    if (!util.isEmptyObject(_backupProps = self._backupProps)) {
      Dom.css(self.node, _backupProps);
    }
    if (complete) {
      complete.call(self);
    }
  }
  function AnimBase(node, to, duration, easing, complete) {
    var self = this;
    var config;
    if (node.node) {
      config = node;
    } else {
      if (util.isPlainObject(duration)) {
        config = util.clone(duration);
      } else {
        config = { complete: complete };
        if (duration) {
          config.duration = duration;
        }
        if (easing) {
          config.easing = easing;
        }
      }
      config.node = node;
      config.to = to;
    }
    config = util.merge(defaultConfig, config);
    AnimBase.superclass.constructor.call(self);
    Promise.Defer(self);
    self.config = config;
    node = config.node;
    if (!util.isPlainObject(node)) {
      node = Dom.get(config.node);
    }
    self.node = self.el = node;
    self._backupProps = {};
    self._propsData = {};
    var newTo = {};
    to = config.to;
    for (var prop in to) {
      newTo[camelCase(prop)] = to[prop];
    }
    config.to = newTo;
  }
  util.extend(AnimBase, Promise, {
    prepareFx: noop,
    runInternal: function () {
      var self = this, config = self.config, node = self.node, val, _backupProps = self._backupProps, _propsData = self._propsData, to = config.to, defaultDelay = config.delay || 0, defaultDuration = config.duration;
      Utils.saveRunningAnim(self);
      util.each(to, function (val, prop) {
        if (!util.isPlainObject(val)) {
          val = { value: val };
        }
        _propsData[prop] = util.mix({
          delay: defaultDelay,
          easing: config.easing,
          frame: config.frame,
          duration: defaultDuration
        }, val);
      });
      if (node.nodeType === NodeType.ELEMENT_NODE) {
        if (to.width || to.height) {
          var elStyle = node.style;
          util.mix(_backupProps, {
            overflow: elStyle.overflow,
            'overflow-x': elStyle.overflowX,
            'overflow-y': elStyle.overflowY
          });
          elStyle.overflow = 'hidden';
        }
        var exit, hidden;
        util.each(_propsData, function (_propData, prop) {
          val = _propData.value;
          if (specialVals[val]) {
            if (hidden === undef) {
              hidden = Dom.css(node, 'display') === 'none';
            }
            if (val === 'hide' && hidden || val === 'show' && !hidden) {
              self.stop(true);
              exit = false;
              return exit;
            }
            _backupProps[prop] = Dom.style(node, prop);
            if (val === 'toggle') {
              val = hidden ? 'show' : 'hide';
            }
            if (val === 'hide') {
              _propData.value = 0;
              _backupProps.display = 'none';
            } else {
              _propData.value = Dom.css(node, prop);
              Dom.css(node, prop, 0);
              Dom.show(node);
            }
          }
          return undefined;
        });
        if (exit === false) {
          return;
        }
      }
      self.startTime = util.now();
      if (util.isEmptyObject(_propsData)) {
        self.__totalTime = defaultDuration * 1000;
        self.__waitTimeout = setTimeout(function () {
          self.stop(true);
        }, self.__totalTime);
      } else {
        self.prepareFx();
        self.doStart();
      }
    },
    isRunning: function () {
      return Utils.isAnimRunning(this);
    },
    isPaused: function () {
      return Utils.isAnimPaused(this);
    },
    pause: function () {
      var self = this;
      if (self.isRunning()) {
        self._runTime = util.now() - self.startTime;
        self.__totalTime -= self._runTime;
        Utils.removeRunningAnim(self);
        Utils.savePausedAnim(self);
        if (self.__waitTimeout) {
          clearTimeout(self.__waitTimeout);
        } else {
          self.doStop();
        }
      }
      return self;
    },
    doStop: noop,
    doStart: noop,
    resume: function () {
      var self = this;
      if (self.isPaused()) {
        self.startTime = util.now() - self._runTime;
        Utils.removePausedAnim(self);
        Utils.saveRunningAnim(self);
        if (self.__waitTimeout) {
          self.__waitTimeout = setTimeout(function () {
            self.stop(true);
          }, self.__totalTime);
        } else {
          self.beforeResume();
          self.doStart();
        }
      }
      return self;
    },
    beforeResume: noop,
    run: function () {
      var self = this, q, queue = self.config.queue;
      if (queue === false) {
        self.runInternal();
      } else {
        q = Q.queue(self.node, queue, self);
        if (q.length === 1) {
          self.runInternal();
        }
      }
      return self;
    },
    stop: function (finish) {
      var self = this, node = self.node, q, queue = self.config.queue;
      if (self.isResolved() || self.isRejected()) {
        return self;
      }
      if (self.__waitTimeout) {
        clearTimeout(self.__waitTimeout);
        self.__waitTimeout = 0;
      }
      if (!self.isRunning() && !self.isPaused()) {
        if (queue !== false) {
          Q.remove(node, queue, self);
        }
        return self;
      }
      self.doStop(finish);
      Utils.removeRunningAnim(self);
      Utils.removePausedAnim(self);
      var defer = self.defer;
      if (finish) {
        syncComplete(self);
        defer.resolve([self]);
      } else {
        defer.reject([self]);
      }
      if (queue !== false) {
        q = Q.dequeue(node, queue);
        if (q && q[0]) {
          q[0].runInternal();
        }
      }
      return self;
    }
  });
  var Statics = AnimBase.Statics = {
    isRunning: Utils.isElRunning,
    isPaused: Utils.isElPaused,
    stop: Utils.stopEl,
    Q: Q
  };
  util.each([
    'pause',
    'resume'
  ], function (action) {
    Statics[action] = function (node, queue) {
      if (queue === null || typeof queue === 'string' || queue === false) {
        return Utils.pauseOrResumeQueue(node, queue, action);
      }
      return Utils.pauseOrResumeQueue(node, undefined, action);
    };
  });
  exports = AnimBase;
  return exports;
}();
module.exports = animBase;
});