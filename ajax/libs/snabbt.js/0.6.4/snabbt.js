/* snabbt.js Version: 0.6.4 Build date: 2015-12-27 (c) 2015 Daniel Lundin @license MIT */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.snabbt = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Array.prototype.find - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
// For all details and docs: https://github.com/paulmillr/array.prototype.find
// Fixes and tests supplied by Duncan Hall <http://duncanhall.net> 
(function(globals){
  if (Array.prototype.find) return;

  var find = function(predicate) {
    var list = Object(this);
    var length = list.length < 0 ? 0 : list.length >>> 0; // ES.ToUint32;
    if (length === 0) return undefined;
    if (typeof predicate !== 'function' || Object.prototype.toString.call(predicate) !== '[object Function]') {
      throw new TypeError('Array#find: predicate must be a function');
    }
    var thisArg = arguments[1];
    for (var i = 0, value; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) return value;
    }
    return undefined;
  };

  if (Object.defineProperty) {
    try {
      Object.defineProperty(Array.prototype, 'find', {
        value: find, configurable: true, enumerable: false, writable: true
      });
    } catch(e) {}
  }

  if (!Array.prototype.find) {
    Array.prototype.find = find;
  }
})(this);

},{}],2:[function(require,module,exports){
'use strict';
var utils = require('./utils.js');
var easing = require('./easing.js');
var tweeners = require('./tweeners');
var state = require('./state.js');

function createAnimation(startState, _endState, options, transformProperty) {
  var duration = utils.optionOrDefault(options.duration, 500);

  var delay = utils.optionOrDefault(options.delay, 0);
  var easer = easing.createEaser(utils.optionOrDefault(options.easing, 'linear'), options);
  var currentState = duration === 0 ? _endState.clone() : startState.clone();
  currentState.transformOrigin = options.transformOrigin;
  currentState.perspective = options.perspective;

  var startTime = -1;
  var currentTime = 0;
  var started = false;

  // Manual related
  var manualDelayFactor = delay / duration;
  var manual = options.manual;
  var manualValue = 0;
  var manualCallback = undefined;

  var tweener = undefined;
  // Setup tweener
  if (options.valueFeeder) {
    tweener = tweeners.createValueFeederTweener(options.valueFeeder, startState, _endState, currentState);
  } else {
    tweener = tweeners.createStateTweener(startState, _endState, currentState);
  }

  // Public api
  return {
    options: options,
    endState: function endState() {
      return _endState;
    },

    finish: function finish(callback) {
      manual = false;
      var manualDuration = duration * manualValue;
      startTime = currentTime - manualDuration;
      manualCallback = callback;
      easer.resetFrom(manualValue);
    },

    rollback: function rollback(callback) {
      manual = false;
      tweener.setReverse();
      var manualDuration = duration * (1 - manualValue);
      startTime = currentTime - manualDuration;
      manualCallback = callback;
      easer.resetFrom(manualValue);
    },

    tick: function tick(time) {
      if (manual) {
        currentTime = time;
        return this.updateCurrentTransform();
      }

      // If first tick, set startTime
      if (startTime === -1) {
        startTime = time;
      }

      if (time - startTime >= delay) {
        if (!started && options.start) {
          options.start();
        }
        started = true;
        currentTime = time - delay;

        var curr = Math.min(Math.max(0.0, currentTime - startTime), duration);
        easer.tick(duration === 0 ? 1 : curr / duration);
        this.updateCurrentTransform();
        if (options.update) {
          options.update(curr / duration);
        }
        if (this.completed() && manualCallback) {
          manualCallback();
        }
      }
    },

    getCurrentState: function getCurrentState() {
      return currentState;
    },

    setValue: function setValue(_manualValue) {
      started = true;
      manualValue = Math.min(Math.max(_manualValue, 0.0001), 0.9999 + manualDelayFactor);
    },

    updateCurrentTransform: function updateCurrentTransform() {
      var tweenValue = easer.getValue();
      if (manual) {
        var value = Math.max(0.00001, manualValue - manualDelayFactor);
        if (easer.isSpring) {
          tweenValue = value;
        } else {
          easer.tick(value, true);
          tweenValue = easer.getValue();
        }
      }
      tweener.tween(tweenValue);
    },

    completed: function completed() {
      if (startTime === 0) return false;
      return easer.completed();
    },

    updateElement: function updateElement(element, forceUpdate) {
      if (!started && !forceUpdate) return;
      var matrix = tweener.asMatrix();
      var properties = tweener.getProperties();
      utils.updateElementTransform(element, matrix, transformProperty, properties.perspective, options.staticTransform);
      utils.updateElementProperties(element, properties);
    }
  };
}

// ------------------------
// -- AttentionAnimation --
// ------------------------

function createAttentionAnimation(_options) {
  var movement = _options.movement;
  _options.initialVelocity = 0.1;
  _options.equilibriumPosition = 0;
  var spring = easing.createSpringEasing(_options);
  var tweenPosition = movement.position;
  var tweenRotation = movement.rotation;
  var tweenRotationPost = movement.rotationPost;
  var tweenScale = movement.scale;
  var tweenSkew = movement.skew;

  var currentMovement = state.createState({
    position: tweenPosition ? [0, 0, 0] : undefined,
    rotation: tweenRotation ? [0, 0, 0] : undefined,
    rotationPost: tweenRotationPost ? [0, 0, 0] : undefined,
    scale: tweenScale ? [1, 1] : undefined,
    skew: tweenSkew ? [0, 0] : undefined
  });

  // Public API
  return {
    options: function options() {
      return _options;
    },

    tick: function tick() {
      if (spring.equilibrium) return;
      spring.tick();

      this.updateMovement();
    },

    updateMovement: function updateMovement() {
      var value = spring.getValue();
      if (tweenPosition) {
        currentMovement.position[0] = movement.position[0] * value;
        currentMovement.position[1] = movement.position[1] * value;
        currentMovement.position[2] = movement.position[2] * value;
      }
      if (tweenRotation) {
        currentMovement.rotation[0] = movement.rotation[0] * value;
        currentMovement.rotation[1] = movement.rotation[1] * value;
        currentMovement.rotation[2] = movement.rotation[2] * value;
      }
      if (tweenRotationPost) {
        currentMovement.rotationPost[0] = movement.rotationPost[0] * value;
        currentMovement.rotationPost[1] = movement.rotationPost[1] * value;
        currentMovement.rotationPost[2] = movement.rotationPost[2] * value;
      }
      if (tweenScale) {
        currentMovement.scale[0] = 1 + movement.scale[0] * value;
        currentMovement.scale[1] = 1 + movement.scale[1] * value;
      }

      if (tweenSkew) {
        currentMovement.skew[0] = movement.skew[0] * value;
        currentMovement.skew[1] = movement.skew[1] * value;
      }
    },

    updateElement: function updateElement(element) {
      utils.updateElementTransform(element, currentMovement.asMatrix());
      utils.updateElementProperties(element, currentMovement.getProperties());
    },

    getCurrentState: function getCurrentState() {
      return currentMovement;
    },

    completed: function completed() {
      return spring.completed();
    }
  };
}

module.exports = {
  createAnimation: createAnimation,
  createAttentionAnimation: createAttentionAnimation
};

},{"./easing.js":3,"./state.js":8,"./tweeners":9,"./utils.js":10}],3:[function(require,module,exports){
'use strict';

var utils = require('./utils.js');

function linearEasing(value) {
  return value;
}

function ease(value) {
  return (Math.cos(value * Math.PI + Math.PI) + 1) / 2;
}

function easeIn(value) {
  return value * value;
}

function easeOut(value) {
  return -Math.pow(value - 1, 2) + 1;
}

var createSpringEasing = function createSpringEasing(options) {
  var position = utils.optionOrDefault(options.startPosition, 0);
  var equilibriumPosition = utils.optionOrDefault(options.equilibriumPosition, 1);
  var velocity = utils.optionOrDefault(options.initialVelocity, 0);
  var springConstant = utils.optionOrDefault(options.springConstant, 0.8);
  var deceleration = utils.optionOrDefault(options.springDeceleration, 0.9);
  var mass = utils.optionOrDefault(options.springMass, 10);

  var equilibrium = false;

  // Public API
  return {
    isSpring: true,
    tick: function tick(value, isManual) {
      if (value === 0.0 || isManual) return;
      if (equilibrium) return;
      var springForce = -(position - equilibriumPosition) * springConstant;
      // f = m * a
      // a = f / m
      var a = springForce / mass;
      // s = v * t
      // t = 1 ( for now )
      velocity += a;
      position += velocity;

      // Deceleration
      velocity *= deceleration;
      if (Math.abs(position - equilibriumPosition) < 0.001 && Math.abs(velocity) < 0.001) {
        equilibrium = true;
      }
    },

    resetFrom: function resetFrom(value) {
      position = value;
      velocity = 0;
    },

    getValue: function getValue() {
      if (equilibrium) return equilibriumPosition;
      return position;
    },

    completed: function completed() {
      return equilibrium;
    }
  };
};

var EASING_FUNCS = {
  'linear': linearEasing,
  'ease': ease,
  'easeIn': easeIn,
  'easeOut': easeOut
};

function createEaser(easerName, options) {
  if (easerName === 'spring') {
    return createSpringEasing(options);
  }
  var easeFunction = easerName;
  if (!utils.isFunction(easerName)) {
    easeFunction = EASING_FUNCS[easerName];
  }

  var easer = easeFunction;
  var value = 0;
  var lastValue;

  // Public API
  return {
    tick: function tick(v) {
      value = easer(v);
      lastValue = v;
    },

    resetFrom: function resetFrom() {
      lastValue = 0;
    },

    getValue: function getValue() {
      return value;
    },

    completed: function completed() {
      if (lastValue >= 1) {
        return lastValue;
      }
      return false;
    }
  };
}

module.exports = {
  createEaser: createEaser,
  createSpringEasing: createSpringEasing
};

},{"./utils.js":10}],4:[function(require,module,exports){
'use strict';
/* global document, window */
var stateFromOptions = require('./state.js').stateFromOptions;
var Animation = require('./animation.js');
var createState = require('./state.js').createState;
var utils = require('./utils.js');

var Engine = {
  runningAnimations: [],
  completedAnimations: [],
  transformProperty: 'transform',
  rAFScheduled: false,
  init: function init() {
    if (typeof window !== undefined) return;
    var styles = window.getComputedStyle(document.documentElement, '');
    var vendorPrefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
    if (vendorPrefix === 'webkit') this.transformProperty = 'webkitTransform';
  },

  scheduleNextFrame: function scheduleNextFrame() {
    var _this = this;

    if (this.rAFScheduled) return;
    this.rAFScheduled = true;

    window.requestAnimationFrame(function (time) {
      _this.rAFScheduled = false;
      _this.stepAnimations(time);
    });
  },

  stepAnimations: function stepAnimations(time) {
    var _this2 = this;

    this.runningAnimations.forEach(function (runningAnimation) {
      var element = runningAnimation[0];
      var animation = runningAnimation[1];
      _this2.stepAnimation(element, animation, time);
    });

    this.archiveCompletedAnimations();

    if (this.runningAnimations.length > 0) this.scheduleNextFrame();
  },

  stepAnimation: function stepAnimation(element, animation, time) {
    animation.tick(time);
    animation.updateElement(element);
  },

  archiveCompletedAnimations: function archiveCompletedAnimations() {
    var unFinished = this.runningAnimations.filter(function (animation) {
      return !animation[1].completed();
    });
    var finished = this.runningAnimations.filter(function (animation) {
      return animation[1].completed();
    });

    var queuedAnimations = this.createQueuedAnimations(finished);
    // Finished and not queued
    var completed = finished.filter(function (finishedAnimation) {
      return !queuedAnimations.find(function (queuedAnimation) {
        return queuedAnimation[0] !== finishedAnimation[0];
      });
    });

    Engine.runningAnimations = unFinished;

    // Filter out just finished animation from previously completed
    this.completedAnimations = this.completedAnimations.filter(function (animation) {
      return !completed.find(function (finishedAnimation) {
        return finishedAnimation[0] === animation[0];
      });
    });

    Array.prototype.push.apply(this.completedAnimations, completed);
    Array.prototype.push.apply(this.runningAnimations, queuedAnimations);

    // Call complete callback
    finished.forEach(function (animation) {
      var completeCallback = animation[1].options.complete;
      if (completeCallback) completeCallback();
    });
    this.clearOphanedEndStates();
  },

  createQueuedAnimations: function createQueuedAnimations(finished) {
    var _this3 = this;

    var newAnimations = finished.filter(function (animation) {
      var chainer = animation[2];
      return chainer.index < chainer.queue.length;
    }).map(function (animation) {
      var element = animation[0];
      var chainer = animation[2];
      var options = chainer.queue[chainer.index];
      chainer.index++;
      return [animation[0], _this3.createAnimation(element, options, animation[1].endState()), chainer];
    });

    return newAnimations;
  },

  createChainer: function createChainer() {
    var chainer = {
      index: 0,
      queue: [],
      snabbt: function snabbt(opts) {
        this.queue.push(opts);
        return chainer;
      }
    };
    return chainer;
  },

  createAnimation: function createAnimation(element, options, previousEndState) {
    var previousState = previousEndState || this.findCurrentState(element);
    var startState = stateFromOptions(options, previousState, true);
    var endState = stateFromOptions(options, previousState, false);

    this.runningAnimations = this.runningAnimations.filter(function (animation) {
      return element !== animation[0];
    });
    var animation = Animation.createAnimation(startState, endState, options, this.transformProperty);
    return animation;
  },

  createAttentionAnimation: function createAttentionAnimation(element, options) {
    var movement = stateFromOptions(options, createState({}, false));
    options.movement = movement;
    var animation = Animation.createAttentionAnimation(options);

    return animation;
  },

  stopAnimation: function stopAnimation(element) {
    var stoppedAnimation = this.runningAnimations.filter(function (animation) {
      return animation[0] === element;
    });
    this.runningAnimations = this.runningAnimations.filter(function (animation) {
      return animation[0] !== element;
    });
    Array.prototype.push.apply(this.completedAnimations, stoppedAnimation);
  },

  initializeAnimation: function initializeAnimation(element, arg2, arg3) {
    var animation = undefined;
    if (arg2 === 'attention') {
      animation = this.createAttentionAnimation(element, arg3);
    } else if (arg2 === 'stop') {
      return this.stopAnimation(element);
    } else {
      animation = this.createAnimation(element, arg2);
    }
    var chainer = this.createChainer();

    animation.updateElement(element, true);

    this.runningAnimations.push([element, animation, chainer]);
    this.scheduleNextFrame();

    return arg2.manual ? animation : chainer;
  },

  findCurrentState: function findCurrentState(element) {
    var match = this.runningAnimations.find(function (animation) {
      return element === animation[0];
    });
    if (match) {
      return match[1].getCurrentState();
    }
    match = this.completedAnimations.find(function (animation) {
      return element === animation[0];
    });
    if (match) {
      return match[1].getCurrentState();
    }
  },

  clearOphanedEndStates: function clearOphanedEndStates() {
    this.completedAnimations = this.completedAnimations.filter(function (animation) {
      return utils.findUltimateAncestor(animation[0]).body;
    });
  }
};

module.exports = Engine;

},{"./animation.js":2,"./state.js":8,"./utils.js":10}],5:[function(require,module,exports){
'use strict';
/* global window */

require('array.prototype.find');

var Engine = require('./engine.js');
var preprocessOptions = require('./properties.js').preprocessOptions;
var utils = require('./utils.js');
var createMatrix = require('./matrix.js');
var updateElementTransform = require('./utils.js').updateElementTransform;

function snabbt(elements, arg2, arg3) {
  if (!elements.length) {
    if (typeof arg2 === 'string') return Engine.initializeAnimation(elements, arg2, preprocessOptions(arg3, 0, 1));
    return Engine.initializeAnimation(elements, preprocessOptions(arg2, 0, 1), arg3);
  }

  var chainers = [];
  var aggregateChainer = {
    snabbt: function snabbt(opts) {
      var len = chainers.length;
      chainers.forEach(function (chainer, index) {
        chainer.snabbt(preprocessOptions(opts, index, len));
      });
      return aggregateChainer;
    },
    setValue: function setValue(value) {
      chainers.forEach(function (chainer) {
        chainer.setValue(value);
      });
      return aggregateChainer;
    },
    finish: function finish(callback) {
      chainers.forEach(function (chainer, index) {
        if (utils.isFunction(callback)) return chainer.finish(function () {
          callback(index, chainers.length);
        });
        chainer.finish();
      });
      return aggregateChainer;
    },
    rollback: function rollback(callback) {
      chainers.forEach(function (chainer, index) {
        if (utils.isFunction(callback)) return chainer.rollback(function () {
          callback(index, chainers.length);
        });
        chainer.rollback();
      });
      return aggregateChainer;
    }
  };

  for (var i = 0, len = elements.length; i < len; ++i) {
    if (typeof arg2 === 'string') chainers.push(Engine.initializeAnimation(elements[i], arg2, preprocessOptions(arg3, i, len)));else chainers.push(Engine.initializeAnimation(elements[i], preprocessOptions(arg2, i, len), arg3));
  }
  return aggregateChainer;
}

module.exports = function (element, arg2, arg3) {
  return snabbt(element, arg2, arg3);
};
module.exports.createMatrix = createMatrix;
module.exports.setElementTransform = updateElementTransform;
module.exports.sequence = function (queue) {
  var i = -1;

  var next = function next() {
    ++i;
    if (i > queue.length - 1) return;

    var element = queue[i][0];
    var options = queue[i][1];

    var previousAllDone = options.allDone;
    options.allDone = previousAllDone ? function () {
      previousAllDone();next();
    } : next;
    snabbt(element, options);
  };

  next();
};

if (typeof window !== 'undefined' && window.jQuery) {
  (function ($) {
    $.fn.snabbt = function (arg1, arg2) {
      return snabbt(this.get(), arg1, arg2);
    };
  })(window.jQuery);
}

Engine.init();

},{"./engine.js":4,"./matrix.js":6,"./properties.js":7,"./utils.js":10,"array.prototype.find":1}],6:[function(require,module,exports){
'use strict';

function assignedMatrixMultiplication(a, b, res) {
  // Unrolled loop
  res[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
  res[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
  res[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
  res[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

  res[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
  res[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
  res[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
  res[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

  res[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
  res[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
  res[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
  res[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

  res[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
  res[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
  res[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
  res[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

  return res;
}

function assignTranslate(matrix, x, y, z) {
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = x;
  matrix[13] = y;
  matrix[14] = z;
  matrix[15] = 1;
}

function assignRotateX(matrix, rad) {
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = Math.cos(rad);
  matrix[6] = -Math.sin(rad);
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = Math.sin(rad);
  matrix[10] = Math.cos(rad);
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

var assignRotateY = function assignRotateY(matrix, rad) {
  matrix[0] = Math.cos(rad);
  matrix[1] = 0;
  matrix[2] = Math.sin(rad);
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = -Math.sin(rad);
  matrix[9] = 0;
  matrix[10] = Math.cos(rad);
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
};

function assignRotateZ(matrix, rad) {
  matrix[0] = Math.cos(rad);
  matrix[1] = -Math.sin(rad);
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = Math.sin(rad);
  matrix[5] = Math.cos(rad);
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

function assignSkew(matrix, ax, ay) {
  matrix[0] = 1;
  matrix[1] = Math.tan(ax);
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = Math.tan(ay);
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

function assignScale(matrix, x, y) {
  matrix[0] = x;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = y;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

function assignIdentity(matrix) {
  matrix[0] = 1;
  matrix[1] = 0;
  matrix[2] = 0;
  matrix[3] = 0;
  matrix[4] = 0;
  matrix[5] = 1;
  matrix[6] = 0;
  matrix[7] = 0;
  matrix[8] = 0;
  matrix[9] = 0;
  matrix[10] = 1;
  matrix[11] = 0;
  matrix[12] = 0;
  matrix[13] = 0;
  matrix[14] = 0;
  matrix[15] = 1;
}

function copyArray(a, b) {
  b[0] = a[0];
  b[1] = a[1];
  b[2] = a[2];
  b[3] = a[3];
  b[4] = a[4];
  b[5] = a[5];
  b[6] = a[6];
  b[7] = a[7];
  b[8] = a[8];
  b[9] = a[9];
  b[10] = a[10];
  b[11] = a[11];
  b[12] = a[12];
  b[13] = a[13];
  b[14] = a[14];
  b[15] = a[15];
}

function createMatrix() {
  var data = new Float32Array(16);
  var a = new Float32Array(16);
  var b = new Float32Array(16);
  assignIdentity(data);

  return {
    data: data,

    asCSS: function asCSS() {
      var css = 'matrix3d(';
      for (var i = 0; i < 15; ++i) {
        if (Math.abs(data[i]) < 0.0001) {
          css += '0,';
        } else {
          css += data[i].toFixed(10) + ',';
        }
      }
      if (Math.abs(data[15]) < 0.0001) {
        css += '0)';
      } else {
        css += data[15].toFixed(10) + ')';
      }
      return css;
    },

    clear: function clear() {
      assignIdentity(data);
    },

    translate: function translate(x, y, z) {
      copyArray(data, a);
      assignTranslate(b, x, y, z);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    rotateX: function rotateX(radians) {
      copyArray(data, a);
      assignRotateX(b, radians);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    rotateY: function rotateY(radians) {
      copyArray(data, a);
      assignRotateY(b, radians);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    rotateZ: function rotateZ(radians) {
      copyArray(data, a);
      assignRotateZ(b, radians);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    scale: function scale(x, y) {
      copyArray(data, a);
      assignScale(b, x, y);
      assignedMatrixMultiplication(a, b, data);
      return this;
    },

    skew: function skew(ax, ay) {
      copyArray(data, a);
      assignSkew(b, ax, ay);
      assignedMatrixMultiplication(a, b, data);
      return this;
    }
  };
}

module.exports = createMatrix;

},{}],7:[function(require,module,exports){
'use strict';

var utils = require('./utils.js');

var SCALAR = 1;
var ARRAY_2 = 2;
var ARRAY_3 = 3;

function fromPrefixed(name) {
  return 'from' + name.charAt(0).toUpperCase() + name.slice(1);
}

var tweenableProperties = {
  position: [ARRAY_3, [0, 0, 0]],
  rotation: [ARRAY_3, [0, 0, 0]],
  rotationPost: [ARRAY_3, [0, 0, 0]],
  skew: [ARRAY_2, [0, 0]],
  scale: [ARRAY_2, [1, 1]],
  scalePost: [ARRAY_2, [1, 1]],
  opacity: [SCALAR],
  width: [SCALAR],
  height: [SCALAR]
};

function preprocessOptions(options, index, len) {
  if (!options) return options;
  var clone = utils.cloneObject(options);

  var hasAllDoneCallback = utils.isFunction(options.allDone);
  var hasCompleteCallback = utils.isFunction(options.complete);

  if (hasCompleteCallback || hasAllDoneCallback) {
    clone.complete = function () {
      if (hasCompleteCallback) {
        options.complete.call(this, index, len);
      }
      if (hasAllDoneCallback && index === len - 1) {
        options.allDone();
      }
    };
  }

  if (utils.isFunction(options.valueFeeder)) {
    clone.valueFeeder = function (i, matrix) {
      return options.valueFeeder(i, matrix, index, len);
    };
  }
  if (utils.isFunction(options.easing)) {
    clone.easing = function (i) {
      return options.easing(i, index, len);
    };
  }
  if (utils.isFunction(options.start)) {
    clone.start = function () {
      return options.start(index, len);
    };
  }
  if (utils.isFunction(options.update)) {
    clone.update = function (i) {
      return options.update(i, index, len);
    };
  }

  var properties = Object.keys(tweenableProperties).concat(['perspective', 'transformOrigin', 'duration', 'delay']);

  properties.forEach(function (property) {
    var fromProperty = fromPrefixed(property);
    if (utils.isFunction(options[property])) {
      clone[property] = options[property](index, len);
    }
    if (utils.isFunction(options[fromProperty])) {
      clone[fromProperty] = options[fromProperty](index, len);
    }
  });

  return clone;
}

module.exports = {
  tweenableProperties: tweenableProperties,
  fromPrefixed: fromPrefixed,
  preprocessOptions: preprocessOptions,
  types: {
    SCALAR: SCALAR,
    ARRAY_2: ARRAY_2,
    ARRAY_3: ARRAY_3
  }
};

},{"./utils.js":10}],8:[function(require,module,exports){
'use strict';

var createMatrix = require('./matrix.js');
var props = require('./properties.js').tweenableProperties;
var fromPrefixed = require('./properties.js').fromPrefixed;
var types = require('./properties.js').types;
var utils = require('./utils.js');

function createState(config, useDefault) {
  var matrix = createMatrix();
  var properties = {
    opacity: undefined,
    width: undefined,
    height: undefined,
    perspective: undefined
  };

  // Public API
  var API = {

    clone: function clone() {
      var _this = this;

      var clonedConfig = {};

      Object.keys(props).forEach(function (property) {
        var type = props[property][0];
        if (_this[property]) clonedConfig[property] = type === types.SCALAR ? _this[property] : _this[property].slice(0);
      });

      return createState(clonedConfig);
    },

    asMatrix: function asMatrix() {
      var m = matrix;
      m.clear();

      if (this.transformOrigin) m.translate(-this.transformOrigin[0], -this.transformOrigin[1], -this.transformOrigin[2]);

      if (this.scale) {
        m.scale(this.scale[0], this.scale[1]);
      }

      if (this.skew) {
        m.skew(this.skew[0], this.skew[1]);
      }

      if (this.rotation) {
        m.rotateX(this.rotation[0]);
        m.rotateY(this.rotation[1]);
        m.rotateZ(this.rotation[2]);
      }

      if (this.position) {
        m.translate(this.position[0], this.position[1], this.position[2]);
      }

      if (this.rotationPost) {
        m.rotateX(this.rotationPost[0]);
        m.rotateY(this.rotationPost[1]);
        m.rotateZ(this.rotationPost[2]);
      }

      if (this.scalePost) {
        m.scale(this.scalePost[0], this.scalePost[1]);
      }

      if (this.transformOrigin) m.translate(this.transformOrigin[0], this.transformOrigin[1], this.transformOrigin[2]);
      return m;
    },

    getProperties: function getProperties() {
      properties.opacity = this.opacity;
      properties.width = this.width + 'px';
      properties.height = this.height + 'px';
      properties.perspective = this.perspective;
      return properties;
    }
  };

  Object.keys(props).forEach(function (property) {
    if (useDefault) API[property] = utils.optionOrDefault(config[property], props[property][1]);else API[property] = config[property];
  });

  return API;
}

function stateFromOptions(options, previousState, useFromPrefix) {
  var state = previousState && previousState.clone() || createState({}, true);

  var propName = useFromPrefix ? fromPrefixed : function (p) {
    return p;
  };
  Object.keys(props).forEach(function (key) {
    state[key] = utils.optionOrDefault(options[propName(key)], state[key]);
    if (state[key] && state[key].slice) {
      state[key] = state[key].slice();
    }
  });

  return state;
}

module.exports = {
  createState: createState,
  stateFromOptions: stateFromOptions
};

},{"./matrix.js":6,"./properties.js":7,"./utils.js":10}],9:[function(require,module,exports){
'use strict';

var createMatrix = require('./matrix.js');
var props = require('./properties').tweenableProperties;
var types = require('./properties').types;

function createStateTweener(startState, endState, resultState) {
  var start = startState;
  var end = endState;
  var _result = resultState;

  var tweenProps = [];
  Object.keys(props).forEach(function (prop) {
    if (endState[prop] !== undefined) {
      tweenProps.push(prop);
    }
  });

  function tween3D(from, to, res, prop, tweenValue) {
    var dX = to[prop][0] - from[prop][0];
    var dY = to[prop][1] - from[prop][1];
    var dZ = to[prop][2] - from[prop][2];
    res[prop][0] = from[prop][0] + tweenValue * dX;
    res[prop][1] = from[prop][1] + tweenValue * dY;
    res[prop][2] = from[prop][2] + tweenValue * dZ;
  }

  function tween2D(from, to, res, prop, tweenValue) {
    var dX = to[prop][0] - from[prop][0];
    var dY = to[prop][1] - from[prop][1];
    res[prop][0] = from[prop][0] + tweenValue * dX;
    res[prop][1] = from[prop][1] + tweenValue * dY;
  }

  function tweenScalar(from, to, res, prop, tweenValue) {
    var dX = to[prop] - from[prop];
    res[prop] = from[prop] + tweenValue * dX;
  }
  // Public API
  return {

    tween: function tween(tweenValue) {

      tweenProps.forEach(function (prop) {
        var type = props[prop][0];
        if (type === types.ARRAY_3) {
          tween3D(start, end, _result, prop, tweenValue);
        } else if (type === types.ARRAY_2) {
          tween2D(start, end, _result, prop, tweenValue);
        } else {
          tweenScalar(start, end, _result, prop, tweenValue);
        }
      });
    },

    asMatrix: function asMatrix() {
      return _result.asMatrix();
    },

    getProperties: function getProperties() {
      return _result.getProperties();
    },

    result: function result() {
      return _result;
    },

    setReverse: function setReverse() {
      var oldStart = start;
      start = end;
      end = oldStart;
    }
  };
}

function createValueFeederTweener(valueFeeder, startState, endState, resultState) {
  var currentMatrix = valueFeeder(0, createMatrix());
  var start = startState;
  var end = endState;
  var result = resultState;
  var reverse = false;

  // Public API
  return {
    tween: function tween(tweenValue) {
      if (reverse) tweenValue = 1 - tweenValue;
      currentMatrix.clear();
      currentMatrix = valueFeeder(tweenValue, currentMatrix);

      var dWidth = end.width - start.width;
      var dHeight = end.height - start.height;
      var dOpacity = end.opacity - start.opacity;

      if (end.width !== undefined) result.width = start.width + tweenValue * dWidth;
      if (end.height !== undefined) result.height = start.height + tweenValue * dHeight;
      if (end.opacity !== undefined) result.opacity = start.opacity + tweenValue * dOpacity;
    },

    asMatrix: function asMatrix() {
      return currentMatrix;
    },

    getProperties: function getProperties() {
      return result.getProperties();
    },

    setReverse: function setReverse() {
      reverse = true;
    }
  };
}

module.exports = {
  createStateTweener: createStateTweener,
  createValueFeederTweener: createValueFeederTweener
};

},{"./matrix.js":6,"./properties":7}],10:[function(require,module,exports){
'use strict';

function isFunction(object) {
  return typeof object === 'function';
}

function optionOrDefault(option, def) {
  if (option === undefined) {
    return def;
  }
  return option;
}

function updateElementTransform(element, matrix, transformProperty, perspective, staticTransform) {
  var cssPerspective = perspective ? 'perspective(' + perspective + 'px) ' : '';
  var cssMatrix = matrix.asCSS();
  var cssStaticTransform = staticTransform ? staticTransform : '';
  if (transformProperty) element.style[transformProperty] = cssStaticTransform + cssPerspective + cssMatrix;else element.style.transform = cssStaticTransform + cssPerspective + cssMatrix;
}

var updateElementProperties = function updateElementProperties(element, properties) {
  for (var key in properties) {
    if (key === 'perspective') // TODO: Fix this
      continue;
    element.style[key] = properties[key];
  }
};

function cloneObject(object) {
  if (!object) return object;
  var clone = {};
  for (var key in object) {
    clone[key] = object[key];
  }
  return clone;
}

function findUltimateAncestor(node) {
  var ancestor = node;
  while (ancestor.parentNode) {
    ancestor = ancestor.parentNode;
  }
  return ancestor;
}

module.exports = {
  optionOrDefault: optionOrDefault,
  updateElementTransform: updateElementTransform,
  updateElementProperties: updateElementProperties,
  isFunction: isFunction,
  cloneObject: cloneObject,
  findUltimateAncestor: findUltimateAncestor
};

},{}]},{},[5])(5)
});