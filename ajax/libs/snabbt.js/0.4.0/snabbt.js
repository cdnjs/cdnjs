(function (root, factory) {
  var snabbtjs = factory();
  // Expose Matrix class and some other things that could be useful
  snabbtjs.snabbt.Matrix = snabbtjs.Matrix;
  snabbtjs.snabbt.setElementTransform = snabbtjs.updateElementTransform;

  if (typeof exports === 'object') {
    // CommonJS
    module.exports = snabbtjs.snabbt;
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function () {
      return (root.returnExportsGlobal = snabbtjs.snabbt);
    });
  } else {
    // Global Variables

    root.snabbt = snabbtjs.snabbt;
  }
}(this, function () {

;var snabbtjs = snabbtjs || {};

// ------------------------------
// Time animation
// ------------------------------

snabbtjs.Animation = function(options) {
  var optionOrDefault = snabbtjs.optionOrDefault;
  this.startState = options.startState;
  this.endState = options.endState;
  this.duration = optionOrDefault(options.duration, 500);
  this.delay = optionOrDefault(options.delay, 0);
  this.perspective = options.perspective;
  this.easing = snabbtjs.createEaser(optionOrDefault(options.easing, 'linear'), options);
  this.currentState = this.startState.clone();
  this.transformOrigin = options.transformOrigin;
  this.currentState.transformOrigin = options.transformOrigin;

  this.startTime = 0;
  this.currentTime = 0;
  this.stopped = false;

  // Manual related
  this.manual = options.manual;
  this.manualValue = 0;
  this.manualDelayFactor = this.delay / this.duration;

  // Setup tweener
  if(options.valueFeeder) {
    this.tweener = new snabbtjs.ValueFeederTweener(options.valueFeeder,
                                                   this.startState,
                                                   this.endState,
                                                   this.currentState);
  } else {
    this.tweener = new snabbtjs.StateTweener(this.startState, this.endState, this.currentState);
  }
};

snabbtjs.Animation.prototype.stop = function() {
  this.stopped = true;
};

snabbtjs.Animation.prototype.isStopped = function() {
  return this.stopped;
};

snabbtjs.Animation.prototype.finish = function(callback) {
  this.manual = false;
  var duration = this.duration * this.manualValue;
  this.startTime = this.currentTime - duration;
  this.manualCallback = callback;
  this.easing.resetFrom = this.manualValue;
};

snabbtjs.Animation.prototype.rollback = function(callback) {
  this.manual = false;
  this.tweener.setReverse();
  var duration = this.duration * (1 - this.manualValue);
  this.startTime = this.currentTime - duration;
  this.manualCallback = callback;
  this.easing.resetFrom = this.manualValue;
};

snabbtjs.Animation.prototype.restart = function() {
  // Restart timer
  this.startTime = undefined;
  this.easing.resetFrom(0);
};

snabbtjs.Animation.prototype.tick = function(time) {
  if(this.stopped)
    return;
  if(this.manual) {
    var delayFactor = this.delay / this.duration;

    this.currentTime = time;
    if(this.manualValue > delayFactor) {
      this.updateCurrentTransform();
    }
    return;
  }

  // If first tick, set start_time
  if(!this.startTime) {
    this.startTime = time;
  }
  if(time - this.startTime > this.delay)
    this.currentTime = time - this.delay;

  var curr = Math.min(Math.max(0.0, this.currentTime - this.startTime), this.duration);
  this.easing.tick(curr/this.duration);
  this.updateCurrentTransform();
  if(this.completed() && this.manualCallback) {
    this.manualCallback();
  }
};

snabbtjs.Animation.prototype.getCurrentState = function() {
  return this.currentState;
};

snabbtjs.Animation.prototype.setValue = function(manualValue) {
  this.manualValue = Math.min(Math.max(manualValue, 0), 1 + this.manualDelayFactor);
};

snabbtjs.Animation.prototype.updateCurrentTransform = function() {
  var tweenValue = this.easing.value();
  if(this.manual)
    tweenValue = this.manualValue;
  this.tweener.tween(tweenValue);
};

snabbtjs.Animation.prototype.completed = function() {
  if(this.stopped)
    return true;
  if(this.startTime === 0) {
    return false;
  }
  return this.easing.completed();
};

snabbtjs.Animation.prototype.updateElement = function(element) {
  var matrix = this.tweener.asMatrix();
  var properties = this.tweener.getProperties();
  snabbtjs.updateElementTransform(element, matrix, this.perspective);
  snabbtjs.updateElementProperties(element, properties);
};

// ------------------------------
// End Time animation
// ------------------------------

// ------------------------
// -- AttentionAnimation --
// ------------------------

snabbtjs.AttentionAnimation = function(options) {
  this.movement = options.movement;
  this.currentMovement = new snabbtjs.State({});
  options.initialVelocity = 0.1;
  options.equilibriumPosition = 0;
  this.spring = new snabbtjs.SpringEasing(options);
  this.stopped = false;
  this.options = options;
};

snabbtjs.AttentionAnimation.prototype.stop = function() {
  this.stopped = true;
};

snabbtjs.AttentionAnimation.prototype.isStopped = function(time) {
  return this.stopped;
};

snabbtjs.AttentionAnimation.prototype.tick = function(time) {
  var spring = this.spring;
  if(this.stopped)
    return;
  if(spring.equilibrium)
    return;
  spring.tick();

  this.updateMovement();
};

snabbtjs.AttentionAnimation.prototype.updateMovement = function() {
  var currentMovement = this.currentMovement;
  var movement = this.movement;
  var position = this.spring.position;
  currentMovement.position[0] = movement.position[0] * position;
  currentMovement.position[1] = movement.position[1] * position;
  currentMovement.position[2] = movement.position[2] * position;
  currentMovement.rotation[0] = movement.rotation[0] * position;
  currentMovement.rotation[1] = movement.rotation[1] * position;
  currentMovement.rotation[2] = movement.rotation[2] * position;
  currentMovement.rotationPost[0] = movement.rotationPost[0] * position;
  currentMovement.rotationPost[1] = movement.rotationPost[1] * position;
  currentMovement.rotationPost[2] = movement.rotationPost[2] * position;
  if(movement.scale[0] !== 1 && movement.scale[1] !== 1) {
    currentMovement.scale[0] = 1 + movement.scale[0] * position;
    currentMovement.scale[1] = 1 + movement.scale[1] * position;
  }

  currentMovement.skew[0] = movement.skew[0] * position;
  currentMovement.skew[1] = movement.skew[1] * position;
};

snabbtjs.AttentionAnimation.prototype.updateElement = function(element) {
  var currentMovement = this.currentMovement;
  var matrix = currentMovement.asMatrix();
  var properties = currentMovement.getProperties();
  snabbtjs.updateElementTransform(element, matrix);
  snabbtjs.updateElementProperties(element, properties);
};

snabbtjs.AttentionAnimation.prototype.getCurrentState = function() {
  return this.currentMovement;
};

snabbtjs.AttentionAnimation.prototype.completed = function() {
  return this.spring.equilibrium || this.stopped;
};

snabbtjs.AttentionAnimation.prototype.restart = function() {
  // Restart spring
  this.spring = new snabbtjs.SpringEasing(this.options);
};

// Returns animation constructors based on options
snabbtjs.createAnimation = function(options) {
  return new snabbtjs.Animation(options);
};
;// Steppers

var snabbtjs = snabbtjs || {};

snabbtjs.linearEasing = function(value) {
  return value;
};

snabbtjs.ease = function(value) {
  return (Math.cos(value*Math.PI + Math.PI) + 1)/2;
};

snabbtjs.easeIn = function(value) {
  return value*value;
};

snabbtjs.easeOut = function(value) {
  return -Math.pow(value - 1, 2) + 1;
};

snabbtjs.SpringEasing = function(options) {
  var optionOrDefault = snabbtjs.optionOrDefault;
  this.position = optionOrDefault(options.startPosition, 0);
  this.equilibriumPosition = optionOrDefault(options.equilibriumPosition, 1);
  this.velocity = optionOrDefault(options.initialVelocity, 0);
  this.springConstant = optionOrDefault(options.springConstant, 0.8);
  this.deceleration = optionOrDefault(options.springDeceleration, 0.9);
  this.mass = optionOrDefault(options.springMass, 10);

  this.equilibrium = false;
};

snabbtjs.SpringEasing.prototype.tick = function(value) {
  if(value === 0.0)
    return;
  if(this.equilibrium)
    return;
  var springForce = -(this.position - this.equilibriumPosition) * this.springConstant;
  // f = m * a
  // a = f / m
  var a = springForce / this.mass;
  // s = v * t
  // t = 1 ( for now )
  this.velocity += a;
  this.position += this.velocity;

  // Deceleration
  this.velocity *= this.deceleration;

  if(Math.abs(this.position - this.equilibriumPosition) < 0.001 && Math.abs(this.velocity) < 0.001) {
    this.equilibrium = true;
  }
};

snabbtjs.SpringEasing.prototype.resetFrom = function(value) {
  this.position = value;
  this.velocity = 0;
};


snabbtjs.SpringEasing.prototype.value = function() {
  if(this.equilibrium)
    return this.equilibriumPosition;
  return this.position;
};

snabbtjs.SpringEasing.prototype.completed = function() {
  return this.equilibrium;
};

snabbtjs.EASING_FUNCS = {
  'linear': snabbtjs.linearEasing,
  'ease': snabbtjs.ease,
  'easeIn': snabbtjs.easeIn,
  'easeOut': snabbtjs.easeOut,
};

snabbtjs.Easer = function(easer) {
  this.easer = easer;
  this._value = 0;
};

snabbtjs.Easer.prototype.tick = function(value) {
  this._value = this.easer(value);
  this.lastValue = value;
};

snabbtjs.Easer.prototype.resetFrom = function(value) {
  this.lastValue = 0;
};

snabbtjs.Easer.prototype.value = function() {
  return this._value;
};

snabbtjs.Easer.prototype.completed = function() {
  if(this.lastValue >= 1) {
    return this.lastValue;
  }
  return false;
};

snabbtjs.createEaser = function(easerName, options) {
  if(easerName == 'spring') {
    return new snabbtjs.SpringEasing(options);
  }
  var easeFunction;
  if(snabbtjs.isFunction(easerName)) {
    easeFunction = easerName;
  } else {
    easeFunction = snabbtjs.EASING_FUNCS[easerName];
  }
  return new snabbtjs.Easer(easeFunction);
};
;if(window.jQuery) {
  (function ( $ ) {
    $.fn.snabbt = function(arg1, arg2) {
      return snabbtjs.snabbt(this.get(), arg1, arg2);
    };
  }( jQuery ));
}
;var snabbtjs = snabbtjs || {};

/* Entry point, only function to be called by user */
snabbtjs.snabbt = function(arg1, arg2, arg3) {

  var elements = arg1;

  // If argument is an Array or a NodeList or other list type that can be iterable.
  // Loop through and start one animation for each element.
  if(elements.hasOwnProperty('length')) {
    var aggregateChainer = {
      chainers: [],
      then: function(opts) {
        var len = this.chainers.length;
        this.chainers.forEach(function(chainer, index) {
          chainer.then(snabbtjs.preprocessOptions(opts, index, len));
        });
        return aggregateChainer;
      },
      setValue: function(value) {
        this.chainers.forEach(function(chainer) {
          chainer.setValue(value);
        });
        return aggregateChainer;
      },
      finish: function() {
        this.chainers.forEach(function(chainer) {
          chainer.finish();
        });
        return aggregateChainer;
      },
      rollback: function() {
        this.chainers.forEach(function(chainer) {
          chainer.rollback();
        });
        return aggregateChainer;
      }
    };

    for(var i=0, len=elements.length;i<len;++i) {
      if(typeof arg2 == 'string')
        aggregateChainer.chainers.push(snabbtjs.snabbtSingleElement(elements[i], arg2, snabbtjs.preprocessOptions(arg3, i, len)));
      else
        aggregateChainer.chainers.push(snabbtjs.snabbtSingleElement(elements[i], snabbtjs.preprocessOptions(arg2, i, len), arg3));
    }
    return aggregateChainer;
  } else {
    if(typeof arg2 == 'string')
      return snabbtjs.snabbtSingleElement(elements, arg2, snabbtjs.preprocessOptions(arg3, 0, 1));
    else
      return snabbtjs.snabbtSingleElement(elements, snabbtjs.preprocessOptions(arg2, 0, 1), arg3);
  }
};

snabbtjs.preprocessOptions = function(options, index, len) {
  if(!options)
    return options;
  var clone = snabbtjs.cloneObject(options);
  if(snabbtjs.isFunction(options.delay)) {
    clone.delay = options.delay(index, len);
  }
  if(snabbtjs.isFunction(options.callback)) {
    clone.callback = function() {
      options.callback(index, len);
    };
  }
  if(snabbtjs.isFunction(options.valueFeeder)) {
    clone.valueFeeder = function(i, matrix) {
      return options.valueFeeder(i, matrix, index, len);
    };
  }
  if(snabbtjs.isFunction(options.easing)) {
    clone.easing = function(i) {
      return options.easing(i, index, len);
    };
  }

  var properties = [
    'position',
    'rotation',
    'skew',
    'rotationPost',
    'scale',
    'width',
    'height',
    'opacity',
    'fromPosition',
    'fromRotation',
    'fromSkew',
    'fromRotationPost',
    'fromScale',
    'fromWidth',
    'fromHeight',
    'fromOpacity',
    'transformOrigin',
    'duration',
    'delay'
  ];

  properties.forEach(function(property) {
    if(snabbtjs.isFunction(options[property])) {
      clone[property] = options[property](index, len);
    }
  });

  return clone;
};

snabbtjs.snabbtSingleElement = function(element, arg2, arg3) {
  if(arg2 === 'attention')
    return snabbtjs.setupAttentionAnimation(element, arg3);
  if(arg2 === 'stop')
    return snabbtjs.stopAnimation(element);
  var options = arg2;

  // Remove orphaned end states
  snabbtjs.clearOphanedEndStates();

  // If there is a running or past completed animation with element, use that end state as start state
  var currentState = snabbtjs.currentAnimationState(element);
  var start = currentState;
  // from has precendance over current animation state
  start = snabbtjs.stateFromOptions(options, start, true);
  var end = snabbtjs.cloneObject(currentState);
  end = snabbtjs.stateFromOptions(options, end);

  var animOptions = snabbtjs.setupAnimationOptions(start, end, options);
  var animation = snabbtjs.createAnimation(animOptions);

  snabbtjs.runningAnimations.push([element, animation]);

  animation.updateElement(element);
  var queue = [];
  var chainer = {
    then: function(opts) {
      queue.unshift(snabbtjs.preprocessOptions(opts, 0, 1));
      return chainer;
    }
  };

  function tick(time) {
    animation.tick(time);
    animation.updateElement(element);
    if(animation.isStopped())
      return;

    if(!animation.completed())
      return snabbtjs.requestAnimationFrame(tick);


    if(options.loop > 1 && !animation.isStopped()) {
      // Loop current animation
      options.loop -= 1;
      animation.restart();
      snabbtjs.requestAnimationFrame(tick);
    } else {
      if(options.callback) {
        options.callback(element);
      }

      // Start next animation in queue
      if(queue.length) {
        options = queue.pop();

        start = snabbtjs.stateFromOptions(options, end, true);
        end = snabbtjs.stateFromOptions(options, snabbtjs.cloneObject(end));
        options = snabbtjs.setupAnimationOptions(start, end, options);

        animation = new snabbtjs.Animation(options);
        snabbtjs.runningAnimations.push([element, animation]);

        animation.tick(time);
        snabbtjs.requestAnimationFrame(tick);
      }
    }
  }

  snabbtjs.requestAnimationFrame(tick);
  // Manual animations are not chainable, instead an animation controller object is returned
  // with setValue, finish and rollback methods
  if(options.manual)
    return animation;
  return chainer;
};

snabbtjs.setupAttentionAnimation = function(element,  options) {
  var movement = snabbtjs.stateFromOptions(options);
  options.movement = movement;
  var animation = new snabbtjs.AttentionAnimation(options);

  snabbtjs.runningAnimations.push([element, animation]);
  function tick(time) {
    animation.tick(time);
    animation.updateElement(element);
    if(!animation.completed()) {
      snabbtjs.requestAnimationFrame(tick);
    } else {
      if(options.callback) {
        options.callback(element);
      }
      if(options.loop && options.loop > 1) {
        options.loop--;
        animation.restart();
        snabbtjs.requestAnimationFrame(tick);
      }
    }
  }
  snabbtjs.requestAnimationFrame(tick);
};

snabbtjs.stopAnimation = function(element) {
  var runningAnimations = snabbtjs.runningAnimations;
  for(var i= 0,len=runningAnimations.length;i<len;++i) {
    var currentAnimation = runningAnimations[i];
    var animatedElement = currentAnimation[0];
    var animation = currentAnimation[1];

    if(animatedElement === element) {
      animation.stop();
    }
  }
};

snabbtjs.findAnimationState = function(animationList, element) {
  for(var i=0,len=animationList.length;i<len;++i) {
    var currentAnimation = animationList[i];
    var animatedElement = currentAnimation[0];
    var animation = currentAnimation[1];

    if(animatedElement === element) {
      var state = animation.getCurrentState();
      animation.stop();
      return state;
    }
  }
};

/**
 * Returns the current state of element if there is an ongoing or previously finished
 * animation releated to it. Will also call stop on the animation.
 * TODO: The stopping of the animation is better put somewhere else
 */
snabbtjs.currentAnimationState = function(element) {
  // Check if a completed animation is stored for this element
  var state = snabbtjs.findAnimationState(snabbtjs.runningAnimations, element);
  if(state)
    return state;
 
  return snabbtjs.findAnimationState(snabbtjs.completedAnimations, element);
};

/**
 * Parses an animation configuration object and returns a snabbtjs.State instance
 */
snabbtjs.stateFromOptions = function(options, state, useFromPrefix) {
  if (!state)
    state = new snabbtjs.State({});
  var position = 'position';
  var rotation = 'rotation';
  var skew = 'skew';
  var rotationPost = 'rotationPost';
  var scale = 'scale';
  var width = 'width';
  var height = 'height';
  var opacity = 'opacity';

  if(useFromPrefix) {
    position = 'fromPosition';
    rotation = 'fromRotation';
    skew = 'fromSkew';
    rotationPost = 'fromRotationPost';
    scale = 'fromScale';
    width = 'fromWidth';
    height = 'fromHeight';
    opacity = 'fromOpacity';
  }

  var optionOrDefault = snabbtjs.optionOrDefault;
  state.position = optionOrDefault(options[position], state.position);
  state.rotation = optionOrDefault(options[rotation], state.rotation);
  state.rotationPost = optionOrDefault(options[rotationPost], state.rotationPost);
  state.skew = optionOrDefault(options[skew], state.skew);
  state.scale = optionOrDefault(options[scale], state.scale);
  state.opacity = options[opacity];
  state.width = options[width];
  state.height = options[height];

  return state;
};

snabbtjs.setupAnimationOptions = function(start, end, options) {
  options.startState = start;
  options.endState = end;
  return options;
};

snabbtjs.tickRequests = [];
snabbtjs.runningAnimations = [];
snabbtjs.completedAnimations = [];

snabbtjs.requestAnimationFrame = function(func) {
  if(snabbtjs.tickRequests.length === 0)
    window.requestAnimationFrame(snabbtjs.tickAnimations);
  snabbtjs.tickRequests.push(func);
};

snabbtjs.tickAnimations = function(time) {
  var tickRequests = snabbtjs.tickRequests;
  var len = tickRequests.length;
  for(var i=0;i<len;++i) {
    tickRequests[i](time);
  }
  tickRequests.splice(0, len);

  var completedAnimations = snabbtjs.runningAnimations.filter(function(animation) {
    return animation[1].completed();
  });

  // See if there are any previously completed animations on the same element, if so, remove it before merging
  snabbtjs.completedAnimations = snabbtjs.completedAnimations.filter(function(animation) {
    for(var i=0,len=completedAnimations.length;i<len;++i) {
      if(animation[0] === completedAnimations[i][0]) {
        return false;
      }
    }
    return true;
  });

  snabbtjs.completedAnimations = snabbtjs.completedAnimations.concat(completedAnimations);

  snabbtjs.runningAnimations = snabbtjs.runningAnimations.filter(function(animation) {
    return !animation[1].completed();
  });

  if(tickRequests.length !== 0)
    window.requestAnimationFrame(snabbtjs.tickAnimations);
};

snabbtjs.clearOphanedEndStates = function() {
  snabbtjs.completedAnimations = snabbtjs.completedAnimations.filter(function(animation) {
    return (snabbtjs.findUltimateAncestor(animation[0]).body);
  });
};

snabbtjs.findUltimateAncestor = function(node) {
  var ancestor = node;
  while(ancestor.parentNode) {
    ancestor = ancestor.parentNode;
  }
  return ancestor;
};
;var snabbtjs = snabbtjs || {};

snabbtjs.assignTranslate = function(matrix, x, y, z) {
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
};

snabbtjs.assignRotateX = function(matrix, rad) {
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
};


snabbtjs.assignRotateY = function(matrix, rad) {
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

snabbtjs.assignRotateZ = function(matrix, rad) {
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
};

snabbtjs.assignSkew = function(matrix, ax, ay) {
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
};


snabbtjs.assignScale = function(matrix, x, y) {
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
};

snabbtjs.assignIdentity = function(matrix) {
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
};

snabbtjs.copyArray = function(a, b) {
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
};

snabbtjs.Matrix = function() {
  this.data = new Float32Array(16);
  this.a = new Float32Array(16);
  this.b = new Float32Array(16);
  snabbtjs.assignIdentity(this.data);
};

snabbtjs.Matrix.prototype.asCSS = function() {
  var css = 'matrix3d(';
  for(var i=0;i<15;++i) {
    if(Math.abs(this.data[i]) < 0.0001)
      css += '0,';
    else
      css += this.data[i].toFixed(10) + ',';
  }
  if(Math.abs(this.data[15]) < 0.0001)
    css += '0)';
  else
    css += this.data[15].toFixed(10) + ')';
  return css;
};

snabbtjs.Matrix.prototype.clear = function() {
  snabbtjs.assignIdentity(this.data);
};

snabbtjs.Matrix.prototype.translate = function(x, y, z) {
  snabbtjs.copyArray(this.data, this.a);
  snabbtjs.assignTranslate(this.b, x, y, z);
  snabbtjs.assignedMatrixMultiplication(this.a, this.b, this.data);
  return this;
};

snabbtjs.Matrix.prototype.rotateX = function(radians) {
  snabbtjs.copyArray(this.data, this.a);
  snabbtjs.assignRotateX(this.b, radians);
  snabbtjs.assignedMatrixMultiplication(this.a, this.b, this.data);
  return this;
};

snabbtjs.Matrix.prototype.rotateY = function(radians) {
  snabbtjs.copyArray(this.data, this.a);
  snabbtjs.assignRotateY(this.b, radians);
  snabbtjs.assignedMatrixMultiplication(this.a, this.b, this.data);
  return this;
};

snabbtjs.Matrix.prototype.rotateZ = function(radians) {
  snabbtjs.copyArray(this.data, this.a);
  snabbtjs.assignRotateZ(this.b, radians);
  snabbtjs.assignedMatrixMultiplication(this.a, this.b, this.data);
  return this;
};

snabbtjs.Matrix.prototype.scale = function(x, y) {
  snabbtjs.copyArray(this.data, this.a);
  snabbtjs.assignScale(this.b, x, y);
  snabbtjs.assignedMatrixMultiplication(this.a, this.b, this.data);
  return this;
};

snabbtjs.Matrix.prototype.skew = function(ax, ay) {
  snabbtjs.copyArray(this.data, this.a);
  snabbtjs.assignSkew(this.b, ax, ay);
  snabbtjs.assignedMatrixMultiplication(this.a, this.b, this.data);
  return this;
};

snabbtjs.assignedMatrixMultiplication = function(a, b, res) {
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
};
;snabbtjs.State = function(config) {
  var optionOrDefault = snabbtjs.optionOrDefault;
  this.position = optionOrDefault(config.position, [0, 0, 0]);
  this.rotation = optionOrDefault(config.rotation, [0, 0, 0]);
  this.rotationPost = optionOrDefault(config.rotationPost, [0, 0, 0]);
  this.skew = optionOrDefault(config.skew, [0, 0]);
  this.scale = optionOrDefault(config.scale, [1, 1]);
  this.opacity = config.opacity;
  this.width = config.width;
  this.height = config.height;

  // Caching of matrix and properties so we don't have to create new ones everytime they are needed
  this.matrix = new snabbtjs.Matrix();
  this.properties = {
    opacity: undefined,
    width: undefined,
    height: undefined
  };
};

snabbtjs.State.prototype.clone = function() {
  var p = new snabbtjs.State({
    position: this.position.slice(0),
    rotation: this.rotation.slice(0),
    rotationPost: this.rotationPost.slice(0),
    skew: this.skew.slice(0),
    scale: this.scale.slice(0),
    height: this.height,
    width: this.width,
    opacity: this.opacity
  });
  return p;
};

snabbtjs.State.prototype.asMatrix = function() {
  var m = this.matrix;
  m.clear();

  if(this.transformOrigin)
    m.translate(-this.transformOrigin[0], -this.transformOrigin[1], -this.transformOrigin[2]);

  if(this.scale[0] !== 1 || this.scale[1] !== 1) {
    m.scale(this.scale[0], this.scale[1]);
  }

  if(this.skew[0] !== 0 || this.skew[1] !== 0) {
    m.skew(this.skew[0], this.skew[1]);
  }

  if(this.rotation[0] !== 0 || this.rotation[1] !== 0 || this.rotation[2] !== 0) {
    m.rotateX(this.rotation[0]);
    m.rotateY(this.rotation[1]);
    m.rotateZ(this.rotation[2]);
  }

  if(this.position[0] !== 0 || this.position[1] !== 0 || this.position[2] !== 0) {
    m.translate(this.position[0], this.position[1], this.position[2]);
  }

  if(this.rotationPost[0] !== 0 || this.rotationPost[1] !== 0 || this.rotationPost[2] !== 0) {
    m.rotateX(this.rotationPost[0]);
    m.rotateY(this.rotationPost[1]);
    m.rotateZ(this.rotationPost[2]);
  }

  if(this.transformOrigin)
    m.translate(this.transformOrigin[0], this.transformOrigin[1], this.transformOrigin[2]);
  return m;
};

snabbtjs.State.prototype.getProperties = function() {
  this.properties.opacity = this.opacity;
  this.properties.width = this.width + 'px';
  this.properties.height = this.height + 'px';
  return this.properties;
};
;var snabbtjs = snabbtjs || {};

// ------------------
// -- StateTweener -- 
// -------------------

snabbtjs.StateTweener = function(startState, endState, resultState) {
  this.start = startState;
  this.end = endState;
  this.result = resultState;
};

snabbtjs.StateTweener.prototype.tween = function(tweenValue) {
  var dX = (this.end.position[0] - this.start.position[0]);
  var dY = (this.end.position[1] - this.start.position[1]);
  var dZ = (this.end.position[2] - this.start.position[2]);
  var dAX = (this.end.rotation[0] - this.start.rotation[0]);
  var dAY = (this.end.rotation[1] - this.start.rotation[1]);
  var dAZ = (this.end.rotation[2] - this.start.rotation[2]);
  var dBX = (this.end.rotationPost[0] - this.start.rotationPost[0]);
  var dBY = (this.end.rotationPost[1] - this.start.rotationPost[1]);
  var dBZ = (this.end.rotationPost[2] - this.start.rotationPost[2]);
  var dSX = (this.end.scale[0] - this.start.scale[0]);
  var dSY = (this.end.scale[1] - this.start.scale[1]);
  var dSkewX = (this.end.skew[0] - this.start.skew[0]);
  var dSkewY = (this.end.skew[1] - this.start.skew[1]);
  var dWidth = (this.end.width - this.start.width);
  var dHeight = (this.end.height - this.start.height);
  var dOpacity = (this.end.opacity - this.start.opacity);

  this.result.position[0] = this.start.position[0] + tweenValue*dX;
  this.result.position[1] = this.start.position[1] + tweenValue*dY;
  this.result.position[2] = this.start.position[2] + tweenValue*dZ;
  this.result.rotation[0] = this.start.rotation[0] + tweenValue*dAX;
  this.result.rotation[1] = this.start.rotation[1] + tweenValue*dAY;
  this.result.rotation[2] = this.start.rotation[2] + tweenValue*dAZ;
  this.result.rotationPost[0] = this.start.rotationPost[0] + tweenValue*dBX;
  this.result.rotationPost[1] = this.start.rotationPost[1] + tweenValue*dBY;
  this.result.rotationPost[2] = this.start.rotationPost[2] + tweenValue*dBZ;
  this.result.skew[0] = this.start.skew[0] + tweenValue*dSkewX;
  this.result.skew[1] = this.start.skew[1] + tweenValue*dSkewY;
  this.result.scale[0] = this.start.scale[0] + tweenValue*dSX;
  this.result.scale[1] = this.start.scale[1] + tweenValue*dSY;

  if(this.end.width !== undefined)
    this.result.width = this.start.width + tweenValue*dWidth;
  if(this.end.height !== undefined)
    this.result.height = this.start.height + tweenValue*dHeight;
  if(this.end.opacity !== undefined)
    this.result.opacity = this.start.opacity + tweenValue*dOpacity;
};

snabbtjs.StateTweener.prototype.asMatrix = function() {
  return this.result.asMatrix();
};

snabbtjs.StateTweener.prototype.getProperties = function() {
  return this.result.getProperties();
};

snabbtjs.StateTweener.prototype.setReverse = function() {
  var oldStart = this.start;
  this.start = this.end;
  this.end = oldStart;
};

// ------------------------
// -- ValueFeederTweener -- 
// ------------------------

snabbtjs.ValueFeederTweener = function(valueFeeder, startState, endState, resultState) {
  this.currentMatrix = valueFeeder(0, new snabbtjs.Matrix());
  this.valueFeeder = valueFeeder;
  this.start = startState;
  this.end = endState;
  this.result = resultState;
};

snabbtjs.ValueFeederTweener.prototype.tween = function(tweenValue) {
  if(this.reverse)
    tweenValue = 1 - tweenValue;
  this.currentMatrix.clear();
  this.currentMatrix = this.valueFeeder(tweenValue, this.currentMatrix);

  var dWidth = (this.end.width - this.start.width);
  var dHeight = (this.end.height - this.start.height);
  var dOpacity = (this.end.opacity - this.start.opacity);

  if(this.end.width !== undefined)
    this.result.width = this.start.width + tweenValue*dWidth;
  if(this.end.height !== undefined)
    this.result.height = this.start.height + tweenValue*dHeight;
  if(this.end.opacity !== undefined)
    this.result.opacity = this.start.opacity + tweenValue*dOpacity;
};

snabbtjs.ValueFeederTweener.prototype.asMatrix = function() {
  return this.currentMatrix;
};

snabbtjs.ValueFeederTweener.prototype.getProperties = function() {
  return this.result.getProperties();
};

snabbtjs.ValueFeederTweener.prototype.setReverse = function() {
  this.reverse = true;
};
;var snabbtjs = snabbtjs || {};

snabbtjs.optionOrDefault = function(option, def) {
  if(typeof option == 'undefined') {
    return def;
  }
  return option;
};

snabbtjs.updateElementTransform = function(element, matrix, perspective) {
  var cssPerspective = '';
  if(perspective) {
    cssPerspective = 'perspective(' + perspective + 'px) ';
  }
  var cssMatrix = matrix.asCSS();
  element.style.webkitTransform = cssPerspective + cssMatrix;
  element.style.transform = cssPerspective + cssMatrix;
};

snabbtjs.updateElementProperties = function(element, properties) {
  for(var key in properties) {
    element.style[key] = properties[key];
  }
};

snabbtjs.isFunction = function(object) {
  return (typeof object === "function");
};

snabbtjs.cloneObject = function(object) {
  if(!object)
    return object;
  var clone = {};
  for(var key in object) {
    clone[key] = object[key];
  }
  return clone;
};
;
  // Your actual module
  return snabbtjs;
}));
